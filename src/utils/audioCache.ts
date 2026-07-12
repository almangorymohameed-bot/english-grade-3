/**
 * Utility for local client-side Cache Storage management of TTS audio.
 * This ensures audio playback is 100% reliable offline by fetching
 * and saving audio data as blob URLs, avoiding Range request limitations.
 */

const CACHE_NAME = "smile-audio-cache";

/**
 * Normalizes text to make keys more robust
 */
function normalizeTextKey(text: string): string {
  return text.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'•]/g, "");
}

/**
 * Attempts to retrieve a cached blob URL for a specific provider URL
 */
export async function getCachedAudioUrl(providerUrl: string): Promise<string | null> {
  if (typeof window === "undefined" || !("caches" in window)) return null;

  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(providerUrl);
    
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      // Only return a valid blob
      if (blob && blob.size > 100) {
        return URL.createObjectURL(blob);
      }
    }
  } catch (error) {
    console.warn("Error matching cached audio response:", error);
  }
  return null;
}

/**
 * Stores a Response blob in the cache for offline use
 */
export async function saveAudioToCache(providerUrl: string, response: Response): Promise<void> {
  if (typeof window === "undefined" || !("caches" in window)) return;

  try {
    const cache = await caches.open(CACHE_NAME);
    // Clone the response because a response body can only be read once
    await cache.put(providerUrl, response.clone());
  } catch (error) {
    console.warn("Error saving audio to cache:", error);
  }
}

/**
 * Fetches an audio file from a provider URL and caches it, returning its blob URL.
 */
export async function fetchAndCacheAudio(providerUrl: string): Promise<string | null> {
  try {
    const cachedUrl = await getCachedAudioUrl(providerUrl);
    if (cachedUrl) return cachedUrl;

    // Fetch fresh from network
    const response = await fetch(providerUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    // Save to cache
    await saveAudioToCache(providerUrl, response);
    
    // Re-query from cache to get the correct Blob URL
    return await getCachedAudioUrl(providerUrl);
  } catch (error) {
    console.warn(`Failed to fetch and cache audio from: ${providerUrl}`, error);
    return null;
  }
}

/**
 * Pre-fetches list of text phrases using the primary TTS engine and caches them
 */
export async function prefetchAudioList(
  phrases: string[],
  onProgress?: (index: number, total: number) => void
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (let i = 0; i < phrases.length; i++) {
    const phrase = phrases[i].trim();
    if (!phrase) continue;

    // Use the primary TTS provider (Youdao US English)
    const providerUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(phrase)}&type=2`;
    
    try {
      const cached = await getCachedAudioUrl(providerUrl);
      if (cached) {
        success++;
      } else {
        const response = await fetch(providerUrl);
        if (response.ok) {
          await saveAudioToCache(providerUrl, response);
          success++;
        } else {
          failed++;
        }
      }
    } catch (e) {
      failed++;
    }

    if (onProgress) {
      onProgress(i + 1, phrases.length);
    }
  }

  return { success, failed };
}

/**
 * Retrieves cache statistics (count and approximate size)
 */
export async function getCacheStats(): Promise<{ count: number; sizeMb: number }> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return { count: 0, sizeMb: 0 };
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    let totalBytes = 0;

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalBytes += blob.size;
      }
    }

    const sizeMb = parseFloat((totalBytes / (1024 * 1024)).toFixed(2));
    return { count: keys.length, sizeMb };
  } catch (error) {
    console.warn("Error getting cache stats:", error);
    return { count: 0, sizeMb: 0 };
  }
}

/**
 * Clears the entire audio cache
 */
export async function clearAudioCache(): Promise<boolean> {
  if (typeof window === "undefined" || !("caches" in window)) return false;

  try {
    return await caches.delete(CACHE_NAME);
  } catch (error) {
    console.warn("Error deleting old audio cache:", error);
    return false;
  }
}
