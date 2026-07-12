import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Gamepad2, 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  Volume2, 
  Check, 
  Eye, 
  Smile, 
  Award,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UnitItem } from "../types";

interface WordSearchGameProps {
  currentUnit: UnitItem;
  speakText: (text: string, voiceName?: string) => void;
  addPoints: (amount: number) => void;
  addBadge: (badge: string) => void;
}

const GRID_SIZE = 12;

const DIRECTIONS = [
  { r: 0, c: 1, name: "horizontal" },   // Horizontal right
  { r: 1, c: 0, name: "vertical" },     // Vertical down
  { r: 1, c: 1, name: "diagonal" },     // Diagonal down-right
];

const HIGHLIGHT_COLORS = [
  "bg-emerald-200 text-emerald-950 ring-2 ring-emerald-300 border-emerald-400",
  "bg-amber-200 text-amber-950 ring-2 ring-amber-300 border-amber-400",
  "bg-rose-200 text-rose-950 ring-2 ring-rose-300 border-rose-400",
  "bg-sky-200 text-sky-950 ring-2 ring-sky-300 border-sky-400",
  "bg-purple-200 text-purple-950 ring-2 ring-purple-300 border-purple-400",
  "bg-teal-200 text-teal-950 ring-2 ring-teal-300 border-teal-400",
  "bg-orange-200 text-orange-950 ring-2 ring-orange-300 border-orange-400",
];

interface CellCoord {
  r: number;
  c: number;
}

interface PlacedWord {
  word: string;
  cells: CellCoord[];
  colorClass: string;
}

export default function WordSearchGame({
  currentUnit,
  speakText,
  addPoints,
  addBadge
}: WordSearchGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<{ r: number; c: number; colorClass: string }[]>([]);
  
  // Selection states
  const [selectionStart, setSelectionStart] = useState<CellCoord | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<CellCoord | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Game control
  const [showSolution, setShowSolution] = useState(false);
  const [hintCell, setHintCell] = useState<CellCoord | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gamePointsAwarded, setGamePointsAwarded] = useState(false);

  // Initialize and generate puzzle
  useEffect(() => {
    generateNewPuzzle();
  }, [currentUnit]);

  const generateNewPuzzle = () => {
    const rawWords = currentUnit.words.map(w => w.word.toUpperCase().replace(/[^A-Z]/g, ""));
    const wordsToUse = rawWords.filter(w => w.length > 1 && w.length <= GRID_SIZE);
    
    setTargetWords(wordsToUse);
    setFoundWords([]);
    setFoundCells([]);
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsDragging(false);
    setShowSolution(false);
    setHintCell(null);
    setGameCompleted(false);
    setGamePointsAwarded(false);

    // Grid generator
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(""));
    const placed: PlacedWord[] = [];

    // Sort words descending
    const sortedWords = [...wordsToUse].sort((a, b) => b.length - a.length);

    sortedWords.forEach((word, idx) => {
      let isPlaced = false;
      const colorClass = HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length];

      // Try 150 times to place the word
      for (let attempt = 0; attempt < 150; attempt++) {
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        const startR = Math.floor(Math.random() * GRID_SIZE);
        const startC = Math.floor(Math.random() * GRID_SIZE);

        const endR = startR + dir.r * (word.length - 1);
        const endC = startC + dir.c * (word.length - 1);

        if (endR >= 0 && endR < GRID_SIZE && endC >= 0 && endC < GRID_SIZE) {
          let canPlace = true;
          const cells: CellCoord[] = [];

          for (let i = 0; i < word.length; i++) {
            const r = startR + dir.r * i;
            const c = startC + dir.c * i;
            if (newGrid[r][c] !== "" && newGrid[r][c] !== word[i]) {
              canPlace = false;
              break;
            }
            cells.push({ r, c });
          }

          if (canPlace) {
            for (let i = 0; i < word.length; i++) {
              newGrid[cells[i].r][cells[i].c] = word[i];
            }
            placed.push({ word, cells, colorClass });
            isPlaced = true;
            break;
          }
        }
      }
    });

    // Fill remaining spots with random alphabets
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        }
      }
    }

    setGrid(newGrid);
    setPlacedWords(placed);
  };

  // Check if a line from start to end is valid
  const getSelectedCells = (start: CellCoord | null, end: CellCoord | null): CellCoord[] => {
    if (!start || !end) return [];
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    if (steps === 0) return [start];

    const isHorizontal = dr === 0;
    const isVertical = dc === 0;
    const isDiagonal = Math.abs(dr) === Math.abs(dc);

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return [];
    }

    const rStep = dr === 0 ? 0 : dr / Math.abs(dr);
    const cStep = dc === 0 ? 0 : dc / Math.abs(dc);

    const cells: CellCoord[] = [];
    for (let i = 0; i <= steps; i++) {
      cells.push({
        r: start.r + rStep * i,
        c: start.c + cStep * i
      });
    }
    return cells;
  };

  const getSelectedString = (cells: CellCoord[]): string => {
    return cells.map(cell => grid[cell.r][cell.c]).join("");
  };

  // Handle cell press
  const handleCellStart = (r: number, c: number) => {
    if (gameCompleted) return;
    setSelectionStart({ r, c });
    setSelectionEnd({ r, c });
    setIsDragging(true);
    setHintCell(null);
  };

  // Handle cell hovering / enter
  const handleCellEnter = (r: number, c: number) => {
    if (!isDragging || !selectionStart || gameCompleted) return;
    const validCells = getSelectedCells(selectionStart, { r, c });
    if (validCells.length > 0) {
      setSelectionEnd({ r, c });
    }
  };

  // Handle selection end
  const handleCellEnd = () => {
    if (!isDragging || !selectionStart || !selectionEnd) return;
    setIsDragging(false);

    const selectedCells = getSelectedCells(selectionStart, selectionEnd);
    if (selectedCells.length > 0) {
      const selectedStr = getSelectedString(selectedCells);
      const reversedStr = selectedStr.split("").reverse().join("");

      // Find if this string matches an un-found placed word
      const matchingWordObj = placedWords.find(
        pw => !foundWords.includes(pw.word) && (pw.word === selectedStr || pw.word === reversedStr)
      );

      if (matchingWordObj) {
        const word = matchingWordObj.word;
        // Found a word!
        setFoundWords(prev => [...prev, word]);
        
        // Add cells to found list
        const newFoundCells = matchingWordObj.cells.map(cell => ({
          ...cell,
          colorClass: matchingWordObj.colorClass
        }));
        setFoundCells(prev => [...prev, ...newFoundCells]);

        // Pronounce the word for educational reinforcement
        speakText(word, "Kore");
        
        // Brief toast speech
        const arabicDef = currentUnit.words.find(w => w.word.toUpperCase() === word)?.arabic || "";
        speakText(`Superb! You found "${word}"! It means ${arabicDef}`, "Zephyr");
      }
    }

    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // Check game completion
  useEffect(() => {
    if (placedWords.length > 0 && foundWords.length === placedWords.length && !gameCompleted) {
      setGameCompleted(true);
      if (!gamePointsAwarded) {
        addPoints(50);
        addBadge(`🔍 ${currentUnit.title} Word Search Expert`);
        setGamePointsAwarded(true);
        speakText(`Mashallah! Incredible job! You found all ${placedWords.length} words in Unit ${currentUnit.id}! You earned fifty bonus points!`, "Kore");
      }
    }
  }, [foundWords, placedWords, gameCompleted]);

  // Handle hint action
  const handleHint = () => {
    if (gameCompleted) return;
    
    // Find uncompleted words
    const remainingWords = placedWords.filter(pw => !foundWords.includes(pw.word));
    if (remainingWords.length > 0) {
      const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      const startCell = randomWord.cells[0];
      setHintCell(startCell);

      // Speak out the meaning or first letter
      const englishWord = randomWord.word;
      const arabicDef = currentUnit.words.find(w => w.word.toUpperCase() === englishWord)?.arabic || "";
      speakText(`Hint: The word "${englishWord}" starts with letter ${englishWord[0]} and means ${arabicDef}!`, "Kore");
      
      // Clear hint highlight after 4 seconds
      setTimeout(() => {
        setHintCell(null);
      }, 4000);
    }
  };

  const activeSelectionCells = getSelectedCells(selectionStart, selectionEnd);

  const isCellSelected = (r: number, c: number) => {
    return activeSelectionCells.some(cell => cell.r === r && cell.c === c);
  };

  const getCellHighlightClass = (r: number, c: number) => {
    // 1. Is it currently selected?
    if (isCellSelected(r, c)) {
      return "bg-indigo-500 text-white ring-2 ring-indigo-400 scale-105 z-10 shadow-md font-black";
    }

    // 2. Is it in the permanently found cells?
    const found = foundCells.find(cell => cell.r === r && cell.c === c);
    if (found) {
      return found.colorClass + " font-black transform scale-100 transition-all duration-300";
    }

    // 3. Is it shown via Solution Mode?
    if (showSolution) {
      const solutionWord = placedWords.find(pw => pw.cells.some(cell => cell.r === r && cell.c === c));
      if (solutionWord) {
        return "bg-purple-100 text-purple-900 border-b-4 border-purple-300 ring-2 ring-purple-200 opacity-90 font-bold";
      }
    }

    // 4. Is it a hint cell?
    if (hintCell && hintCell.r === r && hintCell.c === c) {
      return "bg-amber-400 text-amber-950 ring-4 ring-amber-300 animate-bounce scale-110 font-black z-20 shadow-lg";
    }

    return "bg-white hover:bg-slate-50 border-b-4 border-r-2 border-slate-200 text-slate-800 font-extrabold";
  };

  return (
    <div className="flex flex-col gap-6" id="word-search-container">
      
      {/* Game Header with Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-50 to-sky-50 p-6 rounded-[32px] border-b-6 border-indigo-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center text-3xl shadow-md border-b-4 border-indigo-700 text-white">
            🔍
          </div>
          <div>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Educational Game
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
              Unit {currentUnit.id} Word Search
            </h3>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              Find vocabulary words by clicking and dragging on the grid, or click the first and last letter!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleHint}
            className="bg-white hover:bg-amber-50 text-amber-700 border-b-4 border-amber-200 px-4 py-2 rounded-[16px] text-xs font-black uppercase flex items-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer shadow-sm"
            disabled={gameCompleted}
          >
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Get Hint
          </button>
          
          <button
            onClick={() => setShowSolution(!showSolution)}
            className={`px-4 py-2 rounded-[16px] text-xs font-black uppercase flex items-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer shadow-sm ${
              showSolution 
                ? "bg-purple-600 border-b-4 border-purple-800 text-white" 
                : "bg-white hover:bg-purple-50 text-purple-700 border-b-4 border-purple-200"
            }`}
          >
            <Eye className="w-4 h-4 text-purple-500" />
            {showSolution ? "Hide Solution" : "Reveal All"}
          </button>

          <button
            onClick={generateNewPuzzle}
            className="bg-white hover:bg-slate-100 text-slate-700 border-b-4 border-slate-200 px-4 py-2 rounded-[16px] text-xs font-black uppercase flex items-center gap-1.5 active:translate-y-0.5 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            Reset Grid
          </button>
        </div>
      </div>

      {/* Main Grid and List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Word Search Grid container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div 
            className="relative bg-slate-100 p-3 rounded-[32px] border-b-8 border-r-8 border-slate-200 select-none max-w-full touch-none"
            onMouseLeave={handleCellEnd}
          >
            <div className="grid grid-cols-12 gap-1 sm:gap-1.5 max-w-[440px] aspect-square">
              {grid.map((row, rIdx) => 
                row.map((letter, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onMouseDown={() => handleCellStart(rIdx, cIdx)}
                    onMouseEnter={() => handleCellEnter(rIdx, cIdx)}
                    onMouseUp={handleCellEnd}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleCellStart(rIdx, cIdx);
                    }}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      const touch = e.touches[0];
                      const element = document.elementFromPoint(touch.clientX, touch.clientY);
                      if (element) {
                        const dataCoord = element.getAttribute("data-coord");
                        if (dataCoord) {
                          const [r, c] = dataCoord.split("-").map(Number);
                          handleCellEnter(r, c);
                        }
                      }
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleCellEnd();
                    }}
                    data-coord={`${rIdx}-${cIdx}`}
                    className={`w-7 h-7 sm:w-9 sm:h-9 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-xs sm:text-sm md:text-base font-black transition-all cursor-pointer select-none uppercase ${getCellHighlightClass(rIdx, cIdx)}`}
                  >
                    {letter}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Friendly assistance tip */}
          <p className="text-[10px] sm:text-xs font-black text-indigo-500 mt-4 text-center bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100">
            💡 Touch & drag over the letters, or click the first letter and then click the last letter!
          </p>
        </div>

        {/* Right Side: Words Checklist & Vocabulary Definitions */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white rounded-[32px] p-6 border-2 border-slate-100 shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <span>📖 WORDS TO FIND ({placedWords.length})</span>
            </h4>

            <div className="flex flex-col gap-2.5">
              {placedWords.map((pw, idx) => {
                const isFound = foundWords.includes(pw.word);
                const originalWordObj = currentUnit.words.find(w => w.word.toUpperCase() === pw.word);
                
                return (
                  <motion.div
                    key={idx}
                    onClick={() => speakText(pw.word, "Kore")}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-[20px] border flex items-center justify-between transition-all cursor-pointer group ${
                      isFound
                        ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                        : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                        isFound ? "bg-emerald-500 text-white" : "bg-indigo-50 text-indigo-600 group-hover:scale-115 transition-transform"
                      }`}>
                        {isFound ? <Check className="w-4 h-4" /> : <span>{originalWordObj?.image || "📝"}</span>}
                      </div>
                      
                      <div className="flex flex-col">
                        <span className={`text-sm font-black uppercase ${isFound ? "line-through opacity-60" : ""}`}>
                          {pw.word}
                        </span>
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          {originalWordObj?.arabic}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(pw.word, "Kore");
                        }}
                        className="p-1.5 bg-white hover:bg-indigo-50 text-indigo-500 hover:text-indigo-700 rounded-lg border border-slate-100 cursor-pointer shadow-sm active:scale-90"
                        title="Pronounce word"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Point Multiplier Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[32px] p-5 border border-amber-200/50 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">Completion Bonus</h4>
                <p className="text-[11px] text-amber-800 font-bold leading-tight mt-0.5">Find all words to earn +50 Points and a rare searcher badge!</p>
              </div>
            </div>
            <div className="bg-amber-400 text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-full border-b-2 border-amber-600 shadow-sm">
              +50 pts
            </div>
          </div>
        </div>
      </div>

      {/* Completion Overlay Ceremony */}
      <AnimatePresence>
        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-[40px] p-8 max-w-md w-full text-center border-b-8 border-emerald-500 shadow-2xl relative overflow-hidden"
            >
              {/* Confetti Sparkles Decorative Elements */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
              
              <div className="text-6xl my-4 animate-bounce">🏆</div>
              
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Mashallah! Awesome Job!
              </h2>
              
              <p className="text-sm font-semibold text-slate-500 mt-2 leading-relaxed">
                You successfully found all vocabulary words for <span className="text-indigo-600 font-extrabold">Unit {currentUnit.id}: {currentUnit.title}</span>!
              </p>

              {/* Award display */}
              <div className="my-6 bg-slate-50 rounded-[24px] p-4 border border-slate-100 flex flex-col gap-2.5 items-center">
                <div className="flex items-center gap-2 text-amber-600 font-black text-sm">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
                  <span>+50 Score Points Added!</span>
                </div>
                <div className="text-xs font-black text-slate-500 flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  <Award className="w-4 h-4 text-emerald-500" />
                  <span>New Badge: 🔍 {currentUnit.title} Word Search Expert</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={generateNewPuzzle}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-sm py-4 rounded-[20px] border-b-4 border-emerald-700 transition-all active:translate-y-0.5 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
                
                <button
                  onClick={() => setGameCompleted(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase text-xs py-3 rounded-[16px] transition-all cursor-pointer"
                >
                  Close & View Board
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
