import React, { useState, useEffect } from "react";
import { 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle, 
  Trash2, 
  RefreshCw, 
  AlertTriangle,
  Play,
  Database
} from "lucide-react";
import { getCacheStats, clearAudioCache, prefetchAudioList } from "../utils/audioCache";
import { UnitItem } from "../types";

interface OfflineManagerProps {
  currentUnit: UnitItem;
  allUnits: UnitItem[];
}

export default function OfflineManager({ currentUnit, allUnits }: OfflineManagerProps) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [stats, setStats] = useState({ count: 0, sizeMb: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  const [downloadSuccessCount, setDownloadSuccessCount] = useState(0);
  const [lastDownloadType, setLastDownloadType] = useState<string | null>(null);

  // Monitor network connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Update stats on load and after modifications
  const updateStats = async () => {
    const freshStats = await getCacheStats();
    setStats(freshStats);
  };

  useEffect(() => {
    updateStats();
  }, [currentUnit]);

  // Clears all cache
  const handleClearCache = async () => {
    if (window.confirm("Are you sure you want to clear your offline voice cache to free up storage?")) {
      const success = await clearAudioCache();
      if (success) {
        setStats({ count: 0, sizeMb: 0 });
        setLastDownloadType(null);
      }
    }
  };

  // Helper to extract speakable phrases from a Unit
  const getUnitPhrases = (unit: UnitItem): string[] => {
    const phrases: string[] = [];
    
    // 1. Vocabulary words and examples
    unit.words.forEach(w => {
      phrases.push(w.word);
      if (w.example) phrases.push(w.example);
    });

    // 2. Lessons content
    unit.lessons.forEach(l => {
      // Dialogues
      if (l.content.dialogue) {
        l.content.dialogue.forEach(d => {
          if (d.text) phrases.push(d.text);
        });
      }
      // Song or body texts
      if (l.content.songText) {
        const lines = l.content.songText
          .split("\n")
          .map(line => line.trim())
          .filter(line => line.length > 8 && !line.startsWith("•") && !line.startsWith("📖") && !line.startsWith("🧩") && !line.startsWith("🏝️") && !line.startsWith("🇸🇩") && !line.startsWith("🇸🇦") && !line.startsWith("🌾") && !line.startsWith("👥") && !line.startsWith("💀") && !line.startsWith("📏") && !line.startsWith("🌱") && !line.startsWith("🎨") && !line.startsWith("✍️") && !line.startsWith("👗") && !line.startsWith("🦊") && !line.startsWith("🔬"));
        
        phrases.push(...lines);
      }
    });

    // De-duplicate phrases
    return Array.from(new Set(phrases));
  };

  // Helper to extract speakable phrases from the whole syllabus
  const getAllSyllabusPhrases = (): string[] => {
    const phrases: string[] = [];
    allUnits.forEach(unit => {
      phrases.push(...getUnitPhrases(unit));
    });
    return Array.from(new Set(phrases));
  };

  // Helper to prefetch Arabic translations for all phrases/words
  const prefetchTranslations = async (phrasesList: string[]) => {
    // 1. Get words (only words / short phrases, length < 25)
    const wordsToFetch = phrasesList
      .map(p => p.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ""))
      .filter(p => p.length > 1 && p.length < 25 && !/\s{2,}/.test(p));
    
    // De-duplicate
    const uniqueWords = Array.from(new Set(wordsToFetch));
    
    // 2. Filter out words that are already cached
    let cachedTranslations: Record<string, string> = {};
    try {
      const cached = localStorage.getItem("smile_translation_cache");
      if (cached) cachedTranslations = JSON.parse(cached);
    } catch (e) {}

    const pendingWords = uniqueWords.filter(w => !cachedTranslations[w]);
    if (pendingWords.length === 0) return;

    // Fetch them in small batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < pendingWords.length; i += batchSize) {
      const batch = pendingWords.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (word) => {
          try {
            const res = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: word }),
            });
            if (res.ok) {
              const data = await res.json();
              if (data.translation) {
                cachedTranslations[word] = data.translation;
              }
            }
          } catch (err) {
            console.error(`Failed to prefetch translation for "${word}":`, err);
          }
        })
      );
      // Save progress to localStorage after each batch
      try {
        localStorage.setItem("smile_translation_cache", JSON.stringify(cachedTranslations));
      } catch (e) {}
    }
  };

  // Triggers background pre-downloading and caching
  const handlePreDownload = async (type: "unit" | "syllabus") => {
    if (isDownloading) return;
    if (!isOnline) {
      alert("You need a temporary internet connection to pre-download the offline audio files!");
      return;
    }

    setIsDownloading(true);
    setLastDownloadType(type);
    
    const phrases = type === "unit" ? getUnitPhrases(currentUnit) : getAllSyllabusPhrases();
    setDownloadProgress({ current: 0, total: phrases.length });
    setDownloadSuccessCount(0);

    try {
      const result = await prefetchAudioList(phrases, (current, total) => {
        setDownloadProgress({ current, total });
      });
      setDownloadSuccessCount(result.success);

      // Pre-download all Arabic translations for words
      await prefetchTranslations(phrases);
    } catch (err) {
      console.error("Pre-download error:", err);
    } finally {
      setIsDownloading(false);
      updateStats();
    }
  };

  const percentComplete = downloadProgress.total > 0 
    ? Math.round((downloadProgress.current / downloadProgress.total) * 100) 
    : 0;

  return (
    <div id="offline-manager-card" className="bg-slate-50 border border-slate-200/80 rounded-[22px] p-4.5 space-y-4 shadow-inner" dir="ltr">
      {/* 1. Header & Connection Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Database className="w-4 h-4 text-indigo-600 animate-pulse" />
          <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-wide">
            Offline Learning Assistant
          </h4>
        </div>

        {isOnline ? (
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
            <Wifi className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            Online
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-600 uppercase animate-pulse">
            <WifiOff className="w-3.5 h-3.5 text-white" />
            Offline
          </span>
        )}
      </div>

      {/* 2. Cache status and sizes */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Cached Audios</p>
          <p className="text-xl font-black text-indigo-950 mt-0.5">{stats.count}</p>
          <p className="text-[9px] text-indigo-500 font-bold">Voice files cached</p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Storage Used</p>
          <p className="text-xl font-black text-indigo-950 mt-0.5">{stats.sizeMb} <span className="text-xs">MB</span></p>
          <p className="text-[9px] text-slate-500 font-bold">On device storage</p>
        </div>
      </div>

      {/* 3. Progress Bar for Pre-downloading */}
      {isDownloading && (
        <div className="bg-white p-3.5 rounded-2xl border border-indigo-100 space-y-2 shadow-sm animate-pulse" dir="ltr">
          <div className="flex justify-between items-center text-[11px] font-black">
            <span className="text-indigo-950 flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-indigo-600 animate-spin" />
              Caching audios & translations...
            </span>
            <span className="text-indigo-600 font-mono text-xs">{percentComplete}%</span>
          </div>
          
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          
          <div className="text-[9px] font-extrabold text-slate-400 text-left leading-tight">
            Saved {downloadProgress.current} of {downloadProgress.total} phrases & interactive words
          </div>
        </div>
      )}

      {/* 4. Action buttons */}
      <div className="space-y-2">
        {!isDownloading ? (
          <>
            <button
              onClick={() => handlePreDownload("unit")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] py-2.5 px-3 rounded-xl border-b-4 border-indigo-800 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Cache Unit {currentUnit.id} Audios & Translations 📥</span>
            </button>

            <button
              onClick={() => handlePreDownload("syllabus")}
              className="w-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-800 text-slate-700 border border-slate-300 border-b-4 hover:border-indigo-300 font-bold text-[10px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Cache Entire Sudan Grade 1 Textbook 🇸🇩</span>
            </button>
          </>
        ) : null}

        {/* Caching feedback alerts */}
        {downloadSuccessCount > 0 && !isDownloading && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-2.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 animate-fadeIn" dir="ltr">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span>Successfully cached <strong>{downloadSuccessCount}</strong> assets for Unit {currentUnit.id}. Ready to run 100% offline!</span>
            </div>
          </div>
        )}

        {/* Quick Offline Note */}
        {!isOnline && (
          <div className="bg-amber-50 text-amber-900 border border-amber-200 p-2.5 rounded-xl text-[10px] leading-relaxed font-bold flex items-start gap-1.5 animate-fadeIn" dir="ltr">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span>You are browsing offline! All interactive features, dictation, search, lessons, and cached audio files are 100% functional.</span>
            </div>
          </div>
        )}

        {/* Maintenance */}
        {stats.count > 0 && (
          <button
            onClick={handleClearCache}
            className="w-full text-center text-[10px] font-bold text-rose-500/80 hover:text-rose-600 hover:underline flex items-center justify-center gap-1.5 pt-1.5 cursor-pointer border-t border-slate-200 mt-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear offline cache to free up space
          </button>
        )}
      </div>
    </div>
  );
}
