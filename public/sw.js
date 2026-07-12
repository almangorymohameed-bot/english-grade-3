const CACHE_NAME = "smile-grade9-offline-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "https://fav.farm/🇸🇩"
];

// Install Event: Cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== "smile-audio-cache") {
            console.log("[Service Worker] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache-First / Network-Falling-Back-to-Cache Strategy
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests or chrome extension schemes
  if (event.request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Handle caching for static/local assets and external TTS audio/resources
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // If response is invalid, return it directly
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // Dynamically cache static files (js, css, png, svg, etc.) or TTS API requests
          const isAudio = url.pathname.includes("/dictvoice") || 
                          url.pathname.includes("/translate_tts") || 
                          url.pathname.includes("/api/tts") ||
                          event.request.destination === "audio";

          const isAsset = event.request.destination === "document" ||
                          event.request.destination === "script" ||
                          event.request.destination === "style" ||
                          event.request.destination === "font" ||
                          event.request.destination === "image";

          if (isAudio || isAsset) {
            const cacheToUse = isAudio ? "smile-audio-cache" : CACHE_NAME;
            const responseToCache = networkResponse.clone();
            
            caches.open(cacheToUse).then((cache) => {
              // Only cache successful GET responses
              if (event.request.method === "GET") {
                cache.put(event.request, responseToCache);
              }
            }).catch(err => {
              console.warn("[Service Worker] Failed to save to cache:", err);
            });
          }

          return networkResponse;
        })
        .catch((error) => {
          console.error("[Service Worker] Fetch failed offline fallback:", error);
          
          // Audio fallback or generic offline experience
          if (event.request.destination === "audio") {
            return new Response("", { status: 404, statusText: "Offline Audio Not Cached" });
          }
          
          // Return cached index.html for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});
