import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Gamepad2, 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  Volume2, 
  Check, 
  Smile, 
  Award,
  ChevronRight,
  Music,
  ArrowRight,
  Play,
  Grid,
  TrendingUp,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle as HelpIcon,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UnitItem, WordItem } from "../types";
import WordSearchGame from "./WordSearchGame";

interface EducationalGamesProps {
  currentUnit: UnitItem;
  speakText: (text: string, voiceName?: string) => void;
  addPoints: (amount: number) => void;
  addBadge: (badge: string) => void;
  points: number;
}

type GameType = null | "balloon" | "train" | "search";

const BALLOON_COLORS = [
  "from-rose-400 to-rose-600 shadow-rose-300",
  "from-sky-400 to-sky-600 shadow-sky-300",
  "from-emerald-400 to-emerald-600 shadow-emerald-300",
  "from-amber-400 to-amber-600 shadow-amber-300",
  "from-purple-400 to-purple-600 shadow-purple-300",
  "from-pink-400 to-pink-600 shadow-pink-300",
];

export default function EducationalGames({
  currentUnit,
  speakText,
  addPoints,
  addBadge,
  points
}: EducationalGamesProps) {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  // ==========================================
  // GAME 1: Balloon Pop Game States & Logic
  // ==========================================
  const [balloonTarget, setBalloonTarget] = useState<WordItem | null>(null);
  const [balloonOptions, setBalloonOptions] = useState<Array<{ word: string; isCorrect: boolean; color: string }>>([]);
  const [balloonPoppedIdx, setBalloonPoppedIdx] = useState<number | null>(null);
  const [balloonSuccess, setBalloonSuccess] = useState<boolean | null>(null);
  const [balloonScore, setBalloonScore] = useState(0);
  const [balloonStreak, setBalloonStreak] = useState(0);
  const [balloonBurstParticles, setBalloonBurstParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  const initBalloonGame = () => {
    if (!currentUnit.words || currentUnit.words.length === 0) return;
    
    // Pick target word
    const target = currentUnit.words[Math.floor(Math.random() * currentUnit.words.length)];
    setBalloonTarget(target);
    setBalloonPoppedIdx(null);
    setBalloonSuccess(null);
    setBalloonBurstParticles([]);

    // Gather 3 wrong options from the current unit, or random placeholders
    let pool = currentUnit.words.filter(w => w.word !== target.word).map(w => w.word);
    if (pool.length < 3) {
      pool = [...pool, "HAPPY", "HELLO", "FRIEND", "SCHOOL", "BOOK"];
    }
    
    // Shuffle pool and take 3
    const wrongOptions = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Assemble options
    const options = [
      { word: target.word, isCorrect: true, color: BALLOON_COLORS[0] },
      ...wrongOptions.map((w, idx) => ({ 
        word: w, 
        isCorrect: false, 
        color: BALLOON_COLORS[(idx + 1) % BALLOON_COLORS.length] 
      }))
    ];

    // Shuffle options & assign random balloon colors
    const shuffledOptions = options
      .sort(() => 0.5 - Math.random())
      .map((opt, index) => ({
        ...opt,
        color: BALLOON_COLORS[index % BALLOON_COLORS.length]
      }));

    setBalloonOptions(shuffledOptions);

    // Speak the prompt
    setTimeout(() => {
      speakText(`Pop the balloon for: ${target.word}`, "Kore");
    }, 450);
  };

  const handleBalloonClick = (index: number, option: { word: string; isCorrect: boolean; color: string }) => {
    if (balloonSuccess !== null) return; // Wait until reset

    setBalloonPoppedIdx(index);
    
    // Generate pop explosion particles
    const particles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      color: option.color.split(" ")[0].replace("from-", "bg-")
    }));
    setBalloonBurstParticles(particles);

    if (option.isCorrect) {
      setBalloonSuccess(true);
      setBalloonScore(prev => prev + 1);
      setBalloonStreak(prev => prev + 1);
      addPoints(15);
      
      speakText("Pop! Correct spelling!", "Kore");
      
      if (balloonStreak + 1 >= 5) {
        addBadge(`🎈 Balloon Pop Streak Master - ${currentUnit.title}`);
      }

      setTimeout(() => {
        initBalloonGame();
      }, 1600);
    } else {
      setBalloonSuccess(false);
      setBalloonStreak(0);
      speakText("Aww, not quite! Try to listen again.", "Zephyr");
      
      setTimeout(() => {
        setBalloonPoppedIdx(null);
        setBalloonSuccess(null);
        setBalloonBurstParticles([]);
      }, 1500);
    }
  };

  const handleBalloonReplay = () => {
    if (balloonTarget) {
      speakText(balloonTarget.word, "Kore");
    }
  };


  // ==========================================
  // GAME 2: Sentence Train Game States & Logic
  // ==========================================
  const [trainTarget, setTrainTarget] = useState<{ original: string; scrambled: string[]; arabic: string; words: string[] } | null>(null);
  const [trainPlaced, setTrainPlaced] = useState<string[]>([]);
  const [trainSuccess, setTrainSuccess] = useState<boolean | null>(null);
  const [trainScore, setTrainScore] = useState(0);

  // Extract a suitable sentence from the active unit
  const initTrainGame = () => {
    if (!currentUnit.words || currentUnit.words.length === 0) return;

    // Find vocabulary words with simple examples
    const wordsWithShortExamples = currentUnit.words.filter(
      w => w.example && w.example.split(" ").length >= 3 && w.example.split(" ").length <= 7
    );

    let selectedWordObj = currentUnit.words[Math.floor(Math.random() * currentUnit.words.length)];
    if (wordsWithShortExamples.length > 0) {
      selectedWordObj = wordsWithShortExamples[Math.floor(Math.random() * wordsWithShortExamples.length)];
    }

    const rawSentence = selectedWordObj.example || `This is a ${selectedWordObj.word}`;
    
    // Clean sentence from ending periods, commas
    const cleanSentence = rawSentence.replace(/[.?!,]/g, "").trim();
    const sentenceWords = cleanSentence.split(/\s+/);
    
    // Scramble
    const scrambled = [...sentenceWords].sort(() => 0.5 - Math.random());

    setTrainTarget({
      original: cleanSentence,
      scrambled,
      arabic: selectedWordObj.arabic,
      words: sentenceWords
    });
    setTrainPlaced([]);
    setTrainSuccess(null);

    setTimeout(() => {
      speakText(`Build the sentence: ${cleanSentence}`, "Kore");
    }, 450);
  };

  const handleWordBlockTap = (word: string, index: number) => {
    if (trainSuccess !== null) return;
    setTrainPlaced(prev => [...prev, word]);
    // Remove from scrambled selection
    if (trainTarget) {
      const nextScrambled = [...trainTarget.scrambled];
      nextScrambled.splice(index, 1);
      setTrainTarget({ ...trainTarget, scrambled: nextScrambled });
    }
    speakText(word, "Kore");
  };

  const handleCarriageClick = (word: string, index: number) => {
    if (trainSuccess !== null) return;
    // Remove from placed carriage
    const nextPlaced = [...trainPlaced];
    nextPlaced.splice(index, 1);
    setTrainPlaced(nextPlaced);

    // Return to scrambled selection
    if (trainTarget) {
      setTrainTarget({
        ...trainTarget,
        scrambled: [...trainTarget.scrambled, word]
      });
    }
  };

  const verifySentenceTrain = () => {
    if (!trainTarget) return;
    
    const formed = trainPlaced.join(" ").toLowerCase();
    const target = trainTarget.words.join(" ").toLowerCase();

    if (formed === target) {
      setTrainSuccess(true);
      setTrainScore(prev => prev + 1);
      addPoints(25);
      addBadge(`🚂 Sentence Train Conductor - Unit ${currentUnit.id}`);
      speakText(`Chugga chugga choo choo! Fantastic! "${trainTarget.original}" is correct!`, "Kore");

      setTimeout(() => {
        initTrainGame();
      }, 3000);
    } else {
      setTrainSuccess(false);
      speakText("Oops, the train cars are in the wrong order. Let's try again!", "Zephyr");
      
      setTimeout(() => {
        // Return all words to scrambled pile
        setTrainTarget({
          ...trainTarget,
          scrambled: [...trainTarget.words].sort(() => 0.5 - Math.random())
        });
        setTrainPlaced([]);
        setTrainSuccess(null);
      }, 2500);
    }
  };

  // Launch games
  useEffect(() => {
    if (activeGame === "balloon") {
      initBalloonGame();
    } else if (activeGame === "train") {
      initTrainGame();
    }
  }, [activeGame, currentUnit]);

  return (
    <div className="flex flex-col gap-6" id="educational-games-container">
      
      {/* LOBBY / HERO HEADER SECTOR */}
      {activeGame === null && (
        <div className="flex flex-col gap-6 text-left">
          
          <div className="bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600 text-white p-8 rounded-[40px] border-b-8 border-r-8 border-purple-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-[10px] bg-white/20 text-purple-100 font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block">
                  SMILE English Playroom 🎪🎈🚂
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-3 uppercase tracking-tight">
                  Educational Games Hub
                </h2>
                <p className="text-xs sm:text-sm text-purple-150 font-bold mt-2 leading-relaxed max-w-xl">
                  Welcome to the playzone, Champion! Practise listening, reading, and spelling skills with these fun interactive visual games from your textbooks. Let's score points! 👦⭐️
                </p>
              </div>

              <div className="bg-white/15 px-6 py-4 rounded-[28px] border border-white/25 backdrop-blur-md flex items-center gap-3 shrink-0">
                <span className="text-3xl animate-bounce">🏆</span>
                <div>
                  <div className="text-[10px] text-purple-200 font-extrabold uppercase leading-none">Total Points</div>
                  <div className="text-xl font-black text-yellow-300 mt-1">{points} PTS</div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2">
            🎈 Select an Educational Game to Play:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* GAME 1 CARD: BALLOON POPPER */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveGame("balloon")}
              className="bg-white border-b-8 border-r-8 border-slate-200 hover:border-rose-400 rounded-[32px] p-6 flex flex-col justify-between items-start gap-4 cursor-pointer transition-all shadow-sm group min-h-[300px]"
            >
              <div>
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-rose-200 group-hover:scale-110 transition-transform">
                  🎈
                </div>
                <h4 className="text-lg font-black text-slate-800 mt-5 uppercase tracking-tight">
                  Balloon Pop Challenger
                </h4>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="text-[9px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-extrabold uppercase">👂 Listening</span>
                  <span className="text-[9px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-extrabold uppercase">📖 Reading</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed mt-3.5">
                  Listen to the English audio and tap the floating balloon with the correct spelling before it disappears!
                </p>
              </div>
              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase py-3 rounded-xl border-b-4 border-rose-700 flex items-center justify-center gap-1 cursor-pointer transition-all">
                <span>Play Balloon Pop</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* GAME 2 CARD: SENTENCE TRAIN */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveGame("train")}
              className="bg-white border-b-8 border-r-8 border-slate-200 hover:border-amber-400 rounded-[32px] p-6 flex flex-col justify-between items-start gap-4 cursor-pointer transition-all shadow-sm group min-h-[300px]"
            >
              <div>
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-amber-200 group-hover:scale-110 transition-transform">
                  🚂
                </div>
                <h4 className="text-lg font-black text-slate-800 mt-5 uppercase tracking-tight">
                  Sentence Train Builder
                </h4>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-extrabold uppercase">✍️ Writing</span>
                  <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-extrabold uppercase">📖 Reading</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed mt-3.5">
                  Arrange scrambled jumbled words in the right order to help load the train compartments and build beautiful English sentences.
                </p>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs uppercase py-3 rounded-xl border-b-4 border-amber-700 flex items-center justify-center gap-1 cursor-pointer transition-all">
                <span>Play Train Builder</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* GAME 3 CARD: WORD SEARCH */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setActiveGame("search")}
              className="bg-white border-b-8 border-r-8 border-slate-200 hover:border-violet-400 rounded-[32px] p-6 flex flex-col justify-between items-start gap-4 cursor-pointer transition-all shadow-sm group min-h-[300px]"
            >
              <div>
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-violet-200 group-hover:scale-110 transition-transform">
                  🔍
                </div>
                <h4 className="text-lg font-black text-slate-800 mt-5 uppercase tracking-tight">
                  Word Search Expert
                </h4>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="text-[9px] bg-violet-50 text-violet-700 px-2 py-0.5 rounded-md font-extrabold uppercase">🔍 Vocabulary</span>
                  <span className="text-[9px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md font-extrabold uppercase">📖 Reading</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed mt-3.5">
                  Find hidden English vocabulary words horizontally, vertically, or diagonally inside a grid of scrambled letters!
                </p>
              </div>
              <button className="w-full bg-violet-500 hover:bg-violet-600 text-white font-black text-xs uppercase py-3 rounded-xl border-b-4 border-violet-700 flex items-center justify-center gap-1 cursor-pointer transition-all">
                <span>Play Word Search</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* SUDANESE HERITAGE MOTIF / EXTRA EDUCATION FOOTER */}
          <div className="bg-sky-50 border border-sky-100/50 p-5 rounded-[28px] mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">☀️🇸🇩</span>
              <div className="text-left">
                <h5 className="text-xs font-black text-sky-900 uppercase">Sudanese Primary Education Companion</h5>
                <p className="text-[10px] text-sky-700 font-semibold mt-0.5">Designed specifically to align with children learning in Grade 3 English curriculum (SMILE Series).</p>
              </div>
            </div>
            <span className="text-[10px] bg-white text-sky-800 border border-sky-150 px-3.5 py-1.5 rounded-full font-black uppercase">SMILE Book 1</span>
          </div>

        </div>
      )}


      {/* ============================================================
          GAME INTERFACES
         ============================================================ */}

      {/* GAME 1: Balloon Pop Game screen */}
      {activeGame === "balloon" && (
        <div className="flex flex-col gap-6 text-left">
          
          {/* Sub-header controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-rose-50 p-5 rounded-[32px] border-b-4 border-rose-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎈</span>
              <div>
                <h3 className="text-lg font-black text-rose-950 uppercase tracking-tight leading-none">Balloon Pop Challenger</h3>
                <p className="text-xs font-bold text-rose-800 mt-1">👂 Listen carefully, then click the correct floating balloon!</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-white px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-black flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Streak: {balloonStreak} 🔥</span>
              </div>
              
              <button
                onClick={() => setActiveGame(null)}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:translate-y-0.5"
              >
                Exit Game 🚪
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Play/Listen sandbox (col-span-4) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-[32px] border-b-6 border-r-6 border-slate-200 flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-rose-500 font-bold text-xs select-none">UNIT {currentUnit.id}</div>
              
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <span className="text-5xl animate-bounce">🔈</span>
                <p className="text-sm font-black text-slate-700">Click the giant button to hear the English word pronunciation:</p>
                
                {/* Giants audio trigger */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBalloonReplay}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-md border-b-4 border-red-800 cursor-pointer flex items-center justify-center relative group"
                >
                  <Volume2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span className="absolute inset-0 rounded-full border-4 border-rose-300 animate-ping opacity-20 pointer-events-none" />
                </motion.button>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-1">Play Audio Word</span>
              </div>

              {/* Translation hint card */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h5 className="text-[10px] font-black text-rose-950 uppercase">Meaning Clue</h5>
                  <p className="text-xs font-bold text-rose-800 leading-tight mt-0.5">Translation: {balloonTarget?.arabic}</p>
                </div>
              </div>

              <button
                onClick={initBalloonGame}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase py-3 rounded-xl border-b-2 border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Skip Word</span>
              </button>
            </div>

            {/* Balloons floating area (col-span-8) */}
            <div className="lg:col-span-8 bg-sky-50 rounded-[32px] p-6 border-b-6 border-r-6 border-sky-100 relative min-h-[400px] flex items-center justify-center overflow-hidden">
              
              {/* Sky background clouds elements */}
              <div className="absolute top-8 left-10 text-white text-3xl opacity-30 select-none">☁️</div>
              <div className="absolute bottom-12 right-12 text-white text-4xl opacity-30 select-none">☁️</div>
              <div className="absolute top-1/2 right-1/4 text-white text-2xl opacity-20 select-none">☁️</div>

              {/* Balloon Grids */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-lg relative z-10">
                {balloonOptions.map((opt, idx) => {
                  const isPopped = balloonPoppedIdx === idx;
                  return (
                    <div key={idx} className="relative flex flex-col items-center">
                      <AnimatePresence>
                        {!isPopped ? (
                          <motion.button
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ 
                              y: [0, -10, 0],
                              opacity: 1,
                              transition: {
                                y: {
                                  repeat: Infinity,
                                  duration: 3 + idx * 0.5,
                                  ease: "easeInOut"
                                }
                              }
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => handleBalloonClick(idx, opt)}
                            className={`w-36 h-44 rounded-t-full rounded-b-[40%] bg-gradient-to-b ${opt.color} text-white font-black shadow-lg relative flex flex-col items-center justify-center p-3 cursor-pointer border border-white/20 active:scale-95 transition-all`}
                          >
                            {/* Balloon string */}
                            <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-0.5 h-16 bg-slate-400/60 pointer-events-none" />
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit border-b border-white/10 rotate-45 pointer-events-none" />

                            <span className="text-lg sm:text-xl font-black uppercase tracking-wide drop-shadow-md">{opt.word}</span>
                          </motion.button>
                        ) : (
                          // Explosive pop animation container
                          <div className="w-36 h-44 flex items-center justify-center relative">
                            {/* POP! Text overlay */}
                            <motion.span
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1.5, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`absolute text-2xl font-black uppercase tracking-wider ${
                                opt.isCorrect ? "text-emerald-600" : "text-rose-600"
                              }`}
                            >
                              {opt.isCorrect ? "🎉 POP! Correct!" : "💥 Oops!"}
                            </motion.span>

                            {/* Dispersing burst particles */}
                            {balloonBurstParticles.map((part) => (
                              <motion.div
                                key={part.id}
                                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                animate={{ 
                                  x: part.x, 
                                  y: part.y, 
                                  scale: 0.2, 
                                  opacity: 0 
                                }}
                                transition={{ duration: 0.5 }}
                                className={`absolute w-3 h-3 rounded-full ${part.color}`}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      )}


      {/* GAME 2: Sentence Train game screen */}
      {activeGame === "train" && (
        <div className="flex flex-col gap-6 text-left">
          
          {/* Header instructions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-50 p-5 rounded-[32px] border-b-4 border-amber-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚂</span>
              <div>
                <h3 className="text-lg font-black text-amber-950 uppercase tracking-tight leading-none">Sentence Train Builder</h3>
                <p className="text-xs font-bold text-amber-800 mt-1">✍️ load jumbled words into carriages in chronological order!</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-black flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Train Score: {trainScore} 🚂</span>
              </div>
              
              <button
                onClick={() => setActiveGame(null)}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:translate-y-0.5"
              >
                Exit Game 🚪
              </button>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-[40px] border-b-8 border-r-8 border-slate-100 flex flex-col gap-6 relative overflow-hidden">
            
            {/* Arabic Clue / Meaning Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-5 rounded-[24px] border border-amber-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3 text-left">
                <span className="text-3xl">🌍🇸🇩</span>
                <div>
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Arabic Clue Sentence:</h4>
                  <p className="text-sm font-black text-slate-800 mt-0.5">Arabic translation: {trainTarget?.arabic}</p>
                </div>
              </div>
              
              <button
                onClick={() => speakText(trainTarget?.original || "", "Kore")}
                className="bg-white hover:bg-amber-50 border border-amber-200 text-amber-700 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
              >
                <Volume2 className="w-4 h-4 text-amber-500" />
                <span>Listen target</span>
              </button>
            </div>

            {/* TRAIN STAGE REPRESENTATION */}
            <div className="bg-slate-100 p-6 rounded-[32px] border-2 border-slate-200 flex flex-col items-center justify-center relative min-h-[160px] overflow-x-auto">
              
              {/* Rails Tracks Graphic */}
              <div className="absolute bottom-6 left-0 right-0 h-4 bg-slate-300 border-t border-b border-slate-400 flex flex-around">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-full bg-slate-400/80" />
                ))}
              </div>

              {/* The Locomotive Train + Carriages */}
              <div className="flex items-end gap-3 pb-8 relative z-10">
                
                {/* 1. Giant Steam Locomotive Engine */}
                <motion.div
                  animate={trainSuccess === true ? { x: [0, 15, 0, 400], transition: { duration: 2.5, ease: "easeIn" } } : {}}
                  className="bg-slate-800 text-white px-5 py-4 rounded-t-2xl rounded-r-3xl border-b-6 border-slate-950 flex flex-col items-center justify-center min-w-[100px] h-20 relative shadow-md shrink-0"
                >
                  <span className="text-2xl animate-bounce">🚂</span>
                  <span className="text-[10px] font-black tracking-widest uppercase text-yellow-400 mt-1">SMILE</span>
                  
                  {/* Locomotive wheels */}
                  <div className="absolute bottom-[-14px] left-4 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 animate-spin-slow" />
                  <div className="absolute bottom-[-14px] right-4 w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 animate-spin-slow" />

                  {/* Smoke puff element */}
                  {trainSuccess === true && (
                    <motion.div 
                      animate={{ y: [-10, -40], x: [0, -10], opacity: [0.8, 0], scale: [1, 2] }}
                      transition={{ duration: 1.5, repeat: 3 }}
                      className="absolute top-[-15px] left-4 text-xl select-none"
                    >
                      💨
                    </motion.div>
                  )}
                </motion.div>

                {/* 2. Connected Train Carriages with Placed Words */}
                <AnimatePresence>
                  {trainPlaced.map((word, idx) => (
                    <motion.div
                      key={`${word}-${idx}`}
                      initial={{ scale: 0.8, x: -30, opacity: 0 }}
                      animate={trainSuccess === true ? { 
                        scale: 1, opacity: 1,
                        x: [0, 400], transition: { duration: 2.5, delay: 0.05 * idx, ease: "easeIn" }
                      } : { scale: 1, x: 0, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => handleCarriageClick(word, idx)}
                      className="bg-amber-400 hover:bg-amber-500 border-2 border-amber-500 hover:border-amber-600 text-amber-950 font-black text-xs uppercase px-4 py-3 rounded-xl border-b-6 border-amber-600 cursor-pointer shadow-md min-w-[70px] text-center h-14 flex items-center justify-center relative select-none shrink-0"
                    >
                      <span>{word}</span>
                      
                      {/* Carriage connector hook link */}
                      <div className="absolute left-[-10px] bottom-4 w-2 h-1 bg-slate-600" />
                      
                      {/* Carriage wheels */}
                      <div className="absolute bottom-[-10px] left-2 w-4 h-4 rounded-full bg-slate-900 border border-slate-600" />
                      <div className="absolute bottom-[-10px] right-2 w-4 h-4 rounded-full bg-slate-900 border border-slate-600" />
                      
                      {/* Close cross indicator */}
                      <span className="absolute top-0.5 right-1.5 text-[8px] text-amber-800 font-extrabold select-none opacity-50">x</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* 3. Empty carriages slot placeholders */}
                {trainTarget && Array.from({ length: Math.max(0, trainTarget.words.length - trainPlaced.length) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="border-2 border-dashed border-slate-300 bg-white/40 w-20 h-14 rounded-xl flex items-center justify-center text-slate-300 font-bold text-[10px] uppercase select-none shrink-0"
                  >
                    Slot {trainPlaced.length + i + 1}
                  </div>
                ))}

              </div>

            </div>

            {/* SELECTION WORD CRATES BANK */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left">
                🎁 Tap the boxes below in order to load them onto the train carriages:
              </h4>

              <div className="flex flex-wrap gap-2.5 justify-start">
                <AnimatePresence>
                  {trainTarget?.scrambled.map((word, idx) => (
                    <motion.button
                      key={`${word}-${idx}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWordBlockTap(word, idx)}
                      className="bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 text-slate-800 font-black text-sm uppercase px-5 py-3.5 rounded-[18px] border-b-4 border-slate-200 cursor-pointer shadow-sm active:translate-y-0.5 transition-all select-none"
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {trainTarget?.scrambled.length === 0 && (
                <p className="text-xs text-slate-400 font-bold italic py-2 text-left">
                  * All word blocks have been loaded onto the train. Click Verify to test! 😊
                </p>
              )}
            </div>

            {/* ACTION TRIGGERS */}
            <div className="grid grid-cols-2 gap-4 mt-2 border-t border-slate-100 pt-5">
              <button
                onClick={initTrainGame}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase py-3.5 rounded-xl border-b-4 border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Skip sentence</span>
              </button>

              <button
                onClick={verifySentenceTrain}
                disabled={trainPlaced.length !== trainTarget?.words.length}
                className={`py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-b-4 transition-all cursor-pointer ${
                  trainPlaced.length === trainTarget?.words.length
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 shadow-md transform active:translate-y-0.5"
                    : "bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed"
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Verify Train 🏁</span>
              </button>
            </div>

            {/* FEEDBACK STATUS BAR */}
            <AnimatePresence>
              {trainSuccess !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-left ${
                    trainSuccess
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : "bg-rose-50 border-rose-200 text-rose-950"
                  }`}
                >
                  <div className="shrink-0">
                    {trainSuccess ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-black text-sm">{trainSuccess ? "Brilliant Job!" : "Train alignment issue!"}</h5>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {trainSuccess 
                        ? `Loaded correctly! You constructed: "${trainTarget?.original}" and earned +25 points!` 
                        : "Words are placed incorrectly. Let's disassemble the cars and order them again."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      )}


      {/* GAME 3: Word Search Game screen */}
      {activeGame === "search" && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end no-print">
            <button
              onClick={() => setActiveGame(null)}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:translate-y-0.5 self-end flex items-center gap-1.5"
            >
              <span>Back to Lobby 🚪</span>
            </button>
          </div>
          
          <WordSearchGame
            currentUnit={currentUnit}
            speakText={speakText}
            addPoints={addPoints}
            addBadge={addBadge}
          />
        </div>
      )}

    </div>
  );
}
