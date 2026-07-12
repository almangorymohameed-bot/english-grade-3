import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  RefreshCw, 
  Play, 
  ArrowRight, 
  BookOpen, 
  Keyboard, 
  Trophy, 
  Flame, 
  RotateCcw, 
  Check, 
  Eye, 
  FileText,
  AlertCircle
} from "lucide-react";
import { UnitItem, WordItem } from "../types";

interface DictationGameProps {
  units: UnitItem[];
  speakText: (text: string, voiceName?: string) => void;
  readingSpeed?: number;
  addPoints?: (amount: number) => void;
  addBadge?: (badgeName: string) => void;
}

export default function DictationGame({ 
  units, 
  speakText, 
  readingSpeed = 0.85, 
  addPoints, 
  addBadge 
}: DictationGameProps) {
  // Select which unit to practice
  const [selectedUnitId, setSelectedUnitId] = useState<number | "all">("all");
  
  // Available words pool
  const [wordPool, setWordPool] = useState<WordItem[]>([]);
  const [activeWord, setActiveWord] = useState<WordItem | null>(null);
  
  // User input and validation state
  const [userAnswer, setUserAnswer] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Hints state
  const [showArabicHint, setShowArabicHint] = useState(false);
  const [showExampleHint, setShowExampleHint] = useState(false);
  const [revealedLettersCount, setRevealedLettersCount] = useState(0);
  
  // Scoring & Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // History of completed words in this session
  const [history, setHistory] = useState<Array<{ word: WordItem; answeredCorrectly: boolean; userAttempt: string }>>([]);
  
  // Feedback message
  const [feedback, setFeedback] = useState("");

  // Input ref to automatically focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Load High Score from localStorage
  useEffect(() => {
    try {
      const storedHighScore = localStorage.getItem("smile_dictation_highscore");
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    } catch (e) {
      console.warn("Failed to load highscore from localStorage", e);
    }
  }, []);

  // Sync high score
  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        localStorage.setItem("smile_dictation_highscore", newScore.toString());
      } catch (e) {
        console.warn("Failed to save highscore to localStorage", e);
      }
      
      // Award badge if high score reached certain milestone
      if (newScore >= 5 && addBadge) {
        addBadge("Dictation Master 🎙️");
      }
      if (newScore >= 10 && addBadge) {
        addBadge("Spelling Bee Champion 🐝");
      }
    }
  };

  // Build the word pool when selectedUnitId or units changes
  useEffect(() => {
    let pool: WordItem[] = [];
    if (selectedUnitId === "all") {
      units.forEach(u => {
        if (u.words && u.words.length > 0) {
          pool = [...pool, ...u.words];
        }
      });
    } else {
      const unit = units.find(u => u.id === selectedUnitId);
      if (unit && unit.words) {
        pool = [...unit.words];
      }
    }
    
    // Sort pool randomly or keep it
    setWordPool(pool);
    
    // Pick the first word
    if (pool.length > 0) {
      pickRandomWord(pool);
    } else {
      setActiveWord(null);
    }
    
    // Reset session stats when unit selection changes
    setScore(0);
    setStreak(0);
    setHistory([]);
  }, [selectedUnitId, units]);

  // Pick a random word from the pool
  const pickRandomWord = (currentPool: WordItem[] = wordPool) => {
    if (currentPool.length === 0) return;
    
    // Avoid picking the exact same word as activeWord if pool size > 1
    let wordToPlay = activeWord;
    const maxRetries = 10;
    let retries = 0;
    
    while ((wordToPlay === activeWord || !wordToPlay) && retries < maxRetries) {
      const randomIndex = Math.floor(Math.random() * currentPool.length);
      wordToPlay = currentPool[randomIndex];
      retries++;
    }
    
    setActiveWord(wordToPlay);
    setUserAnswer("");
    setHasChecked(false);
    setIsCorrect(null);
    setShowArabicHint(false);
    setShowExampleHint(false);
    setRevealedLettersCount(0);
    setFeedback("");
    
    // Automatically speak the word after a short delay
    if (wordToPlay) {
      setTimeout(() => {
        speakText(wordToPlay!.word, "Kore");
      }, 400);
    }

    // Refocus input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 600);
  };

  // Speaks the current active word
  const handleListen = () => {
    if (activeWord) {
      speakText(activeWord.word, "Kore");
    }
  };

  // Speaks the word very slowly or letter by letter
  const handleListenSlowly = () => {
    if (!activeWord) return;
    // Speak slow: insert spaces between letters or speak them individually
    const spacedWord = activeWord.word.split("").join(" . ");
    speakText(spacedWord, "Zephyr");
  };

  // Speaks the example sentence
  const handleListenExample = () => {
    if (activeWord) {
      speakText(activeWord.example, "Kore");
    }
  };

  // Check the student's spelling
  const handleCheckSpelling = () => {
    if (!activeWord || hasChecked) return;

    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    const normalizedTarget = activeWord.word.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

    const isAnswerCorrect = normalizedUser === normalizedTarget;
    setIsCorrect(isAnswerCorrect);
    setHasChecked(true);

    if (isAnswerCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      updateHighScore(newScore);
      
      // Award points
      if (addPoints) {
        addPoints(15); // 15 points for spelling correctly!
      }

      // Random encouraging English feedback
      const praises = [
        "Excellent! ✨",
        "Amazing spelling! 🎉",
        "Perfect spelling! 🌟",
        "Great job, you are a champion! 💪",
        "Outstanding! 🏆"
      ];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      setFeedback(randomPraise);

      // Play victory sound via fallback or celebrate
      speakText("Correct! " + activeWord.word, "Kore");

      // Add to session history
      setHistory(prev => [
        { word: activeWord, answeredCorrectly: true, userAttempt: userAnswer },
        ...prev
      ]);
    } else {
      setStreak(0);
      const errors = [
        "Not quite right! Try again! 💪",
        "Check your spelling and try again! ✍️",
        "Almost there! Try one more time!"
      ];
      setFeedback(errors[Math.floor(Math.random() * errors.length)]);
      speakText("Try again", "Zephyr");

      // Add to session history
      setHistory(prev => [
        { word: activeWord, answeredCorrectly: false, userAttempt: userAnswer },
        ...prev
      ]);
    }
  };

  // Reveal letters as hint
  const handleRevealLetter = () => {
    if (!activeWord) return;
    if (revealedLettersCount < activeWord.word.length) {
      setRevealedLettersCount(prev => prev + 1);
      // Give a tiny penalty or just help
      if (addPoints) addPoints(-2); // small cost for hint
    }
  };

  // Skip word
  const handleSkip = () => {
    pickRandomWord();
  };

  // Input keypress handler (Enter to check or next)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (hasChecked) {
        pickRandomWord();
      } else {
        handleCheckSpelling();
      }
    }
  };

  // Replace target word in example sentence with blanks
  const getMaskedExample = (word: WordItem) => {
    if (!word) return "";
    const regex = new RegExp(word.word, "gi");
    return word.example.replace(regex, "________");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-violet-100 shadow-sm flex flex-col gap-6 max-w-3xl mx-auto w-full text-left" dir="ltr">
      
      {/* English Title Banner */}
      <div className="border-b-4 border-dashed border-violet-100 pb-5 text-center">
        <span className="text-5xl animate-bounce inline-block mb-2">🎙️🐝</span>
        <h3 className="text-2xl font-black text-violet-950 uppercase tracking-wide flex justify-center items-center gap-2">
          Interactive Dictation Challenge 
          <span className="text-sm bg-violet-150 text-violet-700 px-3 py-1 rounded-full font-black border border-violet-200">
            SMILE Spelling Bee
          </span>
        </h3>
        <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed">
          Listen to English audio words from the Grade 1 textbook and type them correctly to earn stars and rewards! 🌟
        </p>
      </div>

      {/* Grid containing Config options & Scoreboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Unit Selector (Left/Right adaptive grid span 7) */}
        <div className="md:col-span-7 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
          <label className="text-xs font-black text-slate-700 flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-violet-600" />
            Select Unit to Practice:
          </label>
          <div className="grid grid-cols-3 gap-1.5 mt-1 text-center">
            <button
              onClick={() => setSelectedUnitId("all")}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedUnitId === "all"
                  ? "bg-violet-600 text-white shadow-md border-b-4 border-violet-800"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Units
            </button>
            {units.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUnitId(u.id)}
                className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer truncate ${
                  selectedUnitId === u.id
                    ? "bg-violet-600 text-white shadow-md border-b-4 border-violet-800"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
                title={`Unit ${u.id}: ${u.title}`}
              >
                Unit {u.id}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-1">
            * Only vocabulary words from the selected unit will be played.
          </p>
        </div>

        {/* Live Score/Streak Panel (Grid span 5) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 p-4 rounded-2xl border border-violet-100">
          
          <div className="bg-white p-3 rounded-xl border border-violet-100 text-center flex flex-col justify-center items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
            <span className="text-[10px] font-black text-slate-500 uppercase">Total Stars</span>
            <span className="text-lg font-black text-violet-950">{score} 🌟</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-violet-100 text-center flex flex-col justify-center items-center">
            <Flame className="w-6 h-6 text-orange-500 mb-1" />
            <span className="text-[10px] font-black text-slate-500 uppercase">Current Streak</span>
            <span className="text-lg font-black text-orange-600">{streak} 🔥</span>
          </div>

          <div className="col-span-2 bg-white/80 py-2 px-4 rounded-xl border border-violet-100 text-center flex justify-between items-center text-xs">
            <span className="font-bold text-slate-500">🏆 High Score:</span>
            <span className="font-black text-violet-950">{highScore} Stars</span>
          </div>

        </div>

      </div>

      {/* Main Dictation Area */}
      {activeWord ? (
        <div className="bg-violet-50/40 p-6 rounded-[28px] border-2 border-violet-100 flex flex-col items-center gap-6 relative overflow-hidden text-center">
          
          {/* Subtle unit badge */}
          <div className="absolute top-3 right-4 bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Level {activeWord.unit} • Unit {activeWord.unit}
          </div>

          {/* Spoken Word Launcher & Waveform illustration */}
          <div className="flex flex-col items-center gap-3 mt-2">
            
            {/* Pulsing Audio Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleListen}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg flex flex-col items-center justify-center border-b-6 border-indigo-800 transition-all cursor-pointer relative"
            >
              <Volume2 className="w-10 h-10 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider mt-1.5">Pronounce</span>
              
              {/* Double wave rings for visual polish */}
              <span className="absolute inset-0 rounded-full border-4 border-violet-400 animate-ping opacity-25 pointer-events-none" />
            </motion.button>

            {/* Slower audio helper / Spelling Helper */}
            <div className="flex gap-2">
              <button
                onClick={handleListenSlowly}
                className="bg-white hover:bg-violet-100 text-violet-700 font-bold text-xs py-1.5 px-3.5 rounded-full border border-violet-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="Slower voice"
              >
                🐢 Spell Letters (Slow)
              </button>

              <button
                onClick={handleListenExample}
                className="bg-white hover:bg-violet-100 text-violet-750 font-bold text-xs py-1.5 px-3.5 rounded-full border border-violet-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="Example sentence"
              >
                📖 Listen Sentence
              </button>
            </div>

          </div>

          {/* Letter Slots/Spaces Hint */}
          <div className="flex flex-wrap justify-center gap-2 my-2" dir="ltr">
            {activeWord.word.split("").map((char, index) => {
              // Hide letters except space or punctuation, OR if the letter falls under the revealed count
              const isPunctuation = /[^a-zA-Z]/.test(char);
              const shouldShow = isPunctuation || index < revealedLettersCount || hasChecked;
              return (
                <div
                  key={index}
                  className={`w-8 h-10 sm:w-10 sm:h-12 border-2 rounded-xl flex items-center justify-center font-black text-lg transition-all ${
                    shouldShow 
                      ? "border-violet-500 bg-violet-100 text-violet-950 scale-105" 
                      : "border-slate-300 bg-white text-transparent"
                  }`}
                >
                  {shouldShow ? char : ""}
                </div>
              );
            })}
          </div>

          {/* User Input & Submit Field */}
          <div className="w-full max-w-md flex flex-col gap-2.5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={hasChecked && isCorrect === true}
                placeholder="Type the English word here... (e.g. Science)"
                dir="ltr"
                className="w-full text-center py-3.5 px-6 rounded-2xl border-3 border-slate-300 focus:border-violet-600 focus:ring-0 outline-none font-extrabold text-xl tracking-wide placeholder:text-slate-400 placeholder:text-sm bg-white transition-all shadow-inner uppercase"
              />
              <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
            </div>

            {/* Check spelling vs Next actions */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              {!hasChecked ? (
                <button
                  onClick={handleCheckSpelling}
                  disabled={userAnswer.trim().length === 0}
                  className={`col-span-2 py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 transition-all cursor-pointer ${
                    userAnswer.trim().length > 0
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 shadow-md transform active:translate-y-0.5"
                      : "bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Check className="w-5 h-5" />
                  <span>Verify Spelling</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => pickRandomWord()}
                    className="col-span-2 py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white border-b-4 border-violet-800 shadow-md transform active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span>Next Word</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Feedback & Corrections Banner */}
          <AnimatePresence>
            {hasChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className={`w-full max-w-md p-4 rounded-2xl border-2 flex flex-col gap-1.5 text-left ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-rose-50 border-rose-200 text-rose-950"
                }`}
              >
                <div className="flex items-center gap-2 font-black text-sm">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <span>{isCorrect ? "Correct spelling! Excellent!" : "Spelling error found!"}</span>
                </div>
                
                <p className="text-xs font-bold text-slate-600 leading-relaxed mt-1">
                  {feedback}
                </p>

                {/* Show the correct spelling if they fail */}
                {!isCorrect && (
                  <div className="bg-white p-2.5 rounded-xl border border-rose-100 mt-2 text-center" dir="ltr">
                    <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Correct Spelling:</span>
                    <span className="text-lg font-black text-rose-600 tracking-wider uppercase">{activeWord.word}</span>
                    <span className="text-xs block font-bold text-slate-500 mt-1">Translation: {activeWord.arabic}</span>
                  </div>
                )}

                {isCorrect && (
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 mt-2 text-center" dir="ltr">
                    <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest">Translation & Meaning:</span>
                    <span className="text-xs font-black text-emerald-700">{activeWord.arabic}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Hints Sandbox */}
          <div className="w-full border-t border-dashed border-violet-200 pt-5 flex flex-col gap-3">
            <span className="text-xs font-black text-violet-950 self-start">💡 Available Hints:</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full text-center">
              
              {/* Hint 1: Show Arabic */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col justify-between items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Arabic Translation</span>
                {showArabicHint ? (
                  <span className="text-sm font-black text-violet-950 bg-violet-50 px-3 py-1 rounded-lg">
                    {activeWord.arabic}
                  </span>
                ) : (
                  <button
                    onClick={() => setShowArabicHint(true)}
                    className="text-xs font-bold text-violet-600 hover:text-white bg-violet-50 hover:bg-violet-600 py-1 px-3 rounded-full transition-all cursor-pointer border border-violet-100"
                  >
                    Reveal Translation 👁️
                  </button>
                )}
              </div>

              {/* Hint 2: Show example sentence with target word blanked */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col justify-between items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Example Sentence</span>
                {showExampleHint ? (
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed text-center" dir="ltr">
                    {getMaskedExample(activeWord)}
                  </p>
                ) : (
                  <button
                    onClick={() => setShowExampleHint(true)}
                    className="text-xs font-bold text-violet-600 hover:text-white bg-violet-50 hover:bg-violet-600 py-1 px-3 rounded-full transition-all cursor-pointer border border-violet-100"
                  >
                    Show Example 📝
                  </button>
                )}
              </div>

              {/* Hint 3: Reveal one letter */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col justify-between items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Reveal Helper Letters</span>
                <button
                  onClick={handleRevealLetter}
                  disabled={revealedLettersCount >= activeWord.word.length}
                  className={`text-xs font-bold py-1 px-3 rounded-full transition-all cursor-pointer border ${
                    revealedLettersCount >= activeWord.word.length
                      ? "text-slate-300 bg-slate-50 border-slate-100 cursor-not-allowed"
                      : "text-violet-600 hover:text-white bg-violet-50 hover:bg-violet-600 border-violet-100"
                  }`}
                >
                  Reveal Letter ({revealedLettersCount}/{activeWord.word.length}) 🔍
                </button>
              </div>

            </div>
          </div>

        </div>
      ) : (
        <div className="bg-slate-50 p-12 rounded-[32px] text-center border-2 border-dashed border-slate-200">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-black text-slate-700">No spelling words available!</h4>
          <p className="text-xs font-bold text-slate-500 mt-1">Please check if the selected unit contains vocabulary words.</p>
        </div>
      )}

      {/* Session History Scoreboard */}
      {history.length > 0 && (
        <div className="border-t border-dashed border-violet-150 pt-5 mt-2">
          <h4 className="text-sm font-black text-violet-950 mb-3 flex items-center gap-1.5 self-start">
            📊 Words Practiced Today (Session History):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  item.answeredCorrectly
                    ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                    : "bg-rose-50/50 border-rose-100 text-rose-950"
                }`}
                dir="ltr"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-black uppercase tracking-wide">{item.word.word}</span>
                  <span className="text-[10px] text-slate-500 font-bold mt-0.5">{item.word.arabic}</span>
                  {!item.answeredCorrectly && (
                    <span className="text-[9px] text-rose-600 font-semibold line-through mt-0.5">Attempt: {item.userAttempt || "Empty"}</span>
                  )}
                </div>
                <div className="shrink-0">
                  {item.answeredCorrectly ? (
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> OK
                    </span>
                  ) : (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      Wrong
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
