import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  ListFilter,
  Sparkles,
  RefreshCw,
  BookOpen,
  Check,
  X
} from "lucide-react";
import { WordItem } from "../types";

interface InteractiveFlashcardsProps {
  words: WordItem[];
  speakText: (text: string, voiceName?: string) => void;
}

type CardStatus = "unstudied" | "need-practice" | "know-it";

export default function InteractiveFlashcards({ words, speakText }: InteractiveFlashcardsProps) {
  // Save card status in local storage key-value: { wordId: "unstudied" | "need-practice" | "know-it" }
  const [cardStatuses, setCardStatuses] = useState<Record<string, CardStatus>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<"all" | CardStatus>("all");
  
  // Load status from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("smile_flashcard_statuses");
      if (stored) {
        setCardStatuses(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to read flashcard progress from localStorage", e);
    }
  }, []);

  // Sync state to local storage when changed
  const updateCardStatus = (wordId: string, status: CardStatus) => {
    const updated = { ...cardStatuses, [wordId]: status };
    setCardStatuses(updated);
    try {
      localStorage.setItem("smile_flashcard_statuses", JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to save flashcard progress to localStorage", e);
    }
  };

  // Filtered list of words
  const filteredWords = words.filter((w) => {
    if (filter === "all") return true;
    const status = cardStatuses[w.id] || "unstudied";
    return status === filter;
  });

  // Keep index within range if words change or filter changes
  useEffect(() => {
    setIsFlipped(false);
    setCurrentIndex(0);
  }, [filter, words]);

  const activeWord = filteredWords[currentIndex];

  // Handler for next / prev
  const handleNext = () => {
    if (filteredWords.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
    }, 150);
  };

  const handlePrev = () => {
    if (filteredWords.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
    }, 150);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredWords.length === 0) return;
      
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.code === "KeyK") {
        // Know it
        if (activeWord) updateCardStatus(activeWord.id, "know-it");
        handleNext();
      } else if (e.code === "KeyP") {
        // Need practice
        if (activeWord) updateCardStatus(activeWord.id, "need-practice");
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredWords, activeWord]);

  // Statistics counters
  const stats = words.reduce(
    (acc, w) => {
      const status = cardStatuses[w.id] || "unstudied";
      acc[status]++;
      return acc;
    },
    { "unstudied": 0, "need-practice": 0, "know-it": 0 }
  );

  const totalInUnit = words.length;
  const percentKnowIt = Math.round((stats["know-it"] / totalInUnit) * 100) || 0;
  const percentNeedPractice = Math.round((stats["need-practice"] / totalInUnit) * 100) || 0;

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your practice progress for this Unit's words?")) {
      const updated = { ...cardStatuses };
      words.forEach((w) => {
        delete updated[w.id];
      });
      setCardStatuses(updated);
      try {
        localStorage.setItem("smile_flashcard_statuses", JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const currentStatus = activeWord ? (cardStatuses[activeWord.id] || "unstudied") : "unstudied";

  return (
    <div className="flex flex-col gap-6" id="interactive-flashcards-container">
      {/* 1. Statistics & Progress Bar Card */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-[28px] p-5 shadow-inner space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-wide">
              Your Memory Progress for Unit {words[0]?.unit || ""}
            </h4>
          </div>
          <button
            onClick={handleResetProgress}
            className="text-[10px] text-slate-500 hover:text-rose-600 font-extrabold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Progress
          </button>
        </div>

        {/* Triple Color Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-black text-slate-600">
            <span className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> Know It ({stats["know-it"]})
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <HelpCircle className="w-3.5 h-3.5" /> Need Practice ({stats["need-practice"]})
            </span>
            <span className="text-slate-400">
              Unstudied ({stats["unstudied"]})
            </span>
          </div>

          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex border border-slate-300/60 shadow-sm">
            <div 
              className="bg-emerald-500 h-full transition-all duration-500" 
              style={{ width: `${(stats["know-it"] / totalInUnit) * 100}%` }}
              title={`Know It: ${percentKnowIt}%`}
            />
            <div 
              className="bg-amber-400 h-full transition-all duration-500" 
              style={{ width: `${(stats["need-practice"] / totalInUnit) * 100}%` }}
              title={`Need Practice: ${percentNeedPractice}%`}
            />
            <div 
              className="bg-slate-300 h-full transition-all duration-500 flex-1" 
              title={`Unstudied: ${100 - percentKnowIt - percentNeedPractice}%`}
            />
          </div>
        </div>
      </div>

      {/* 2. Mode Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              filter === "all" 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({totalInUnit})
          </button>
          <button
            onClick={() => setFilter("unstudied")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
              filter === "unstudied" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            Unstudied ({stats["unstudied"]})
          </button>
          <button
            onClick={() => setFilter("know-it")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
              filter === "know-it" 
                ? "bg-emerald-600 text-white shadow-sm" 
                : "text-slate-600 hover:text-emerald-600"
            }`}
          >
            Know It ({stats["know-it"]})
          </button>
          <button
            onClick={() => setFilter("need-practice")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
              filter === "need-practice" 
                ? "bg-rose-500 text-white shadow-sm" 
                : "text-slate-600 hover:text-rose-500"
            }`}
          >
            Practice ({stats["need-practice"]})
          </button>
        </div>

        <div className="text-[11px] font-black text-slate-400 flex items-center gap-1">
          <ListFilter className="w-3.5 h-3.5" />
          <span>Active cards in this list: {filteredWords.length}</span>
        </div>
      </div>

      {/* 3. Main Flashcard Area */}
      {filteredWords.length > 0 && activeWord ? (
        <div className="flex flex-col items-center gap-6 py-4">
          
          {/* Card Frame with 3D perspective */}
          <div className="w-full max-w-[420px] h-[280px] perspective-1000 group">
            
            {/* Inner flipping div */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              
              {/* FRONT SIDE (WORD) */}
              <div className="absolute w-full h-full backface-hidden bg-white border-b-8 border-r-8 border-indigo-200 rounded-[32px] p-6 flex flex-col justify-between items-center text-center shadow-lg hover:shadow-xl hover:border-indigo-400 transition-all duration-300">
                {/* Status Tag */}
                <div className="absolute top-4 left-4 flex gap-1.5 items-center">
                  {currentStatus === "know-it" && (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-500 stroke-[3px]" /> Know It
                    </span>
                  )}
                  {currentStatus === "need-practice" && (
                    <span className="bg-rose-50 text-rose-600 text-[9px] font-black px-2.5 py-1 rounded-full border border-rose-200 uppercase flex items-center gap-1">
                      <X className="w-3 h-3 text-rose-500 stroke-[3px]" /> Need Practice
                    </span>
                  )}
                  {currentStatus === "unstudied" && (
                    <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2.5 py-1 rounded-full border border-slate-200 uppercase">
                      Unstudied
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 text-[10px] font-black text-slate-400 font-mono">
                  {currentIndex + 1} / {filteredWords.length}
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center flex-1 mt-6 space-y-3">
                  <div className="text-6xl p-3 bg-slate-50 border-2 border-slate-100 rounded-2xl group-hover:scale-110 transition-transform">
                    {activeWord.image}
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-sans">
                      {activeWord.word}
                    </h2>
                    <p className="text-sm font-bold text-slate-400">
                      {activeWord.arabic}
                    </p>
                  </div>
                </div>

                {/* Footer instructions */}
                <div className="text-[10px] font-extrabold text-indigo-500 flex items-center gap-1 bg-indigo-50/50 px-3 py-1 rounded-full uppercase">
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  <span>Click card to reveal example sentence</span>
                </div>
              </div>

              {/* BACK SIDE (EXAMPLE SENTENCE) */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[32px] p-6 flex flex-col justify-between shadow-xl border-b-8 border-r-8 border-indigo-950">
                {/* Top indicator */}
                <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{activeWord.image}</span>
                    <span className="font-extrabold text-[13px] tracking-wide uppercase text-indigo-300">
                      {activeWord.word}
                    </span>
                  </div>
                  <span className="text-[9px] bg-indigo-500/30 text-indigo-300 font-black px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase">
                    English Sentence
                  </span>
                </div>

                {/* Sentence main visual */}
                <div className="flex-1 flex flex-col justify-center items-center py-4 space-y-3.5 text-center px-2">
                  <p className="text-[15px] sm:text-[17px] font-extrabold leading-relaxed text-indigo-50 select-text">
                    "{activeWord.example}"
                  </p>
                  
                  <div className="flex gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(activeWord.word, "Kore");
                      }}
                      className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-[10px] font-black px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-300" />
                      <span>Word</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(activeWord.soundText, "Zephyr");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-[10px] font-black px-3.5 py-1.5 rounded-xl border-b-4 border-indigo-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-white" />
                      <span>Hear Sentence</span>
                    </button>
                  </div>
                </div>

                {/* Footer action instruction */}
                <div className="text-center text-[9px] font-bold text-indigo-300/70 border-t border-white/5 pt-2 flex items-center justify-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Click again to view word card</span>
                </div>
              </div>

            </div>
          </div>

          {/* 4. Active sorting controls (Know it / Need Practice) */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[420px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Do you know this word? Rate to sort:
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => {
                  updateCardStatus(activeWord.id, "need-practice");
                  handleNext();
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 border-b-4 hover:border-rose-300 py-3 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <X className="w-4 h-4 text-rose-500 stroke-[3px]" />
                <span>Need Practice (Left)</span>
              </button>

              <button
                onClick={() => {
                  updateCardStatus(activeWord.id, "know-it");
                  handleNext();
                }}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 border-b-4 hover:border-emerald-300 py-3 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                <Check className="w-4 h-4 text-emerald-500 stroke-[3px]" />
                <span>Know It (Right)</span>
              </button>
            </div>
          </div>

          {/* 5. Deck controls (Prev, Flip, Next) */}
          <div className="flex items-center gap-4 w-full max-w-[420px] justify-between border-t border-slate-100 pt-4">
            <button
              onClick={handlePrev}
              className="bg-white border-2 border-slate-200 hover:border-indigo-400 text-slate-600 p-3 rounded-2xl transition-all cursor-pointer shadow-sm active:scale-90"
              title="Previous Word"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs uppercase px-5 py-3 rounded-2xl border border-indigo-200 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
              <span>Flip Card [Space]</span>
            </button>

            <button
              onClick={handleNext}
              className="bg-white border-2 border-slate-200 hover:border-indigo-400 text-slate-600 p-3 rounded-2xl transition-all cursor-pointer shadow-sm active:scale-90"
              title="Next Word"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Keyboard tip */}
          <p className="text-[10px] font-bold text-slate-400 hidden sm:block uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            ⌨️ Keyboard shortcuts: <strong className="text-slate-600">Left Arrow</strong> (Prev) / <strong className="text-slate-600">Right Arrow</strong> (Next) / <strong className="text-slate-600">Spacebar</strong> (Flip)
          </p>

        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-[32px] p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="text-5xl">🎯</div>
          <div className="space-y-1 max-w-sm">
            <h4 className="font-black text-slate-800 text-[15px] uppercase">
              No words match your filter!
            </h4>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              {filter === "know-it" && "You haven't marked any words as 'Know It' yet. Keep practicing!"}
              {filter === "need-practice" && "Amazing! You don't have any words that need practice right now. Great job!"}
              {filter === "unstudied" && "Wow! You have studied all the words in this unit. Check out other units or filters!"}
              {filter === "all" && "This unit doesn't have any words. Switch the unit on the left column to view more."}
            </p>
          </div>
          <button
            onClick={() => setFilter("all")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] px-5 py-2.5 rounded-xl border-b-4 border-indigo-800 transition-all cursor-pointer"
          >
            Show All Words
          </button>
        </div>
      )}
    </div>
  );
}
