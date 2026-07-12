import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, Sparkles, Check, CheckCircle, RotateCcw, 
  Trash2, PenTool, Eraser, Lightbulb, Star, RefreshCw,
  Trophy, BookOpen, Smile, Award, Maximize2, Minimize2
} from "lucide-react";

interface ClassroomInteractiveProps {
  onSpeak?: (text: string, voice?: string) => void;
  readingSpeed?: number;
}

interface ClassroomItem {
  id: string;
  word: string;
  spelling: string;
  arabic: string;
  letter: string;
  desc: string;
  emoji: string;
  // Relative position in percent for positioning the clickable elements
  x: number; 
  y: number;
}

export default function ClassroomInteractive({ onSpeak, readingSpeed = 1.0 }: ClassroomInteractiveProps) {
  // 1. Point and Say game state
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [foundItems, setFoundItems] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFanSpinning, setIsFanSpinning] = useState(true);

  // 2. Draw and Spell activity state
  const [currentSpellWord, setCurrentSpellWord] = useState<string>("desk");
  const [spellInput, setSpellInput] = useState<string>("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasColor, setCanvasColor] = useState("#4f46e5");
  const [canvasTool, setCanvasTool] = useState<"pencil" | "eraser">("pencil");
  const [isCanvasFullScreen, setIsCanvasFullScreen] = useState(false);
  const [showGuidesClassroom, setShowGuidesClassroom] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const items: ClassroomItem[] = [
    { id: "fan", word: "Fan", spelling: "f-a-n", arabic: "مروحة", letter: "f", desc: "The fan on the ceiling keeping the class cool", emoji: "💨", x: 28, y: 15 },
    { id: "window", word: "Window", spelling: "w-i-n-d-o-w", arabic: "نافذة", letter: "w", desc: "The bright school window next to the garden", emoji: "🪟", x: 21, y: 28 },
    { id: "man", word: "Man", spelling: "m-a-n", arabic: "رجل", letter: "m", desc: "The portrait of Mr. Gamar on the board", emoji: "👨", x: 44, y: 27 },
    { id: "board", word: "Board", spelling: "b-o-a-r-d", arabic: "سبورة", letter: "b", desc: "The green classroom chalkboard with letters", emoji: "📋", x: 55, y: 28 },
    { id: "teacher", word: "Teacher", spelling: "t-e-a-c-h-e-r", arabic: "معلمة", letter: "t", desc: "Our kind teacher wearing a lovely white hijab", emoji: "👩‍🏫", x: 45, y: 41 },
    { id: "door", word: "Door", spelling: "d-o-o-r", arabic: "باب", letter: "d", desc: "The classroom door leading to the hallway", emoji: "🚪", x: 82, y: 30 },
    { id: "desk", word: "Desk", spelling: "d-e-s-k", arabic: "مكتب", letter: "p", desc: "The solid yellow wooden study desk in class", emoji: "✍️", x: 49, y: 62 },
    { id: "chair", word: "Chair", spelling: "c-h-a-i-r", arabic: "كرسي", letter: "ch", desc: "The small wooden school chair with a backrest", emoji: "🪑", x: 13, y: 61 },
    { id: "book", word: "Book", spelling: "b-o-o-k", arabic: "كتاب", letter: "b", desc: "The English book we read and study together", emoji: "📚", x: 34, y: 57 },
    { id: "bag", word: "Bag", spelling: "b-a-g", arabic: "حقيبة", letter: "b", desc: "The pink and purple backpack to carry books", emoji: "🎒", x: 59, y: 61 },
    { id: "floor", word: "Floor", spelling: "f-l-o-o-r", arabic: "أرضية", letter: "f", desc: "The clean classroom floor we stand on", emoji: "🧱", x: 45, y: 76 },
    { id: "bin", word: "Bin", spelling: "b-i-n", arabic: "سلة مهملات", letter: "b", desc: "The tidy classroom waste bin for rubbish", emoji: "🗑️", x: 87, y: 74 },
  ];

  const spellWords = [
    { word: "desk", spelling: "d-e-s-k", arabic: "مكتب" },
    { word: "chair", spelling: "c-h-a-i-r", arabic: "كرسي" },
    { word: "door", spelling: "d-o-o-r", arabic: "باب" },
    { word: "bag", spelling: "b-a-g", arabic: "حقيبة" },
    { word: "book", spelling: "b-o-o-k", arabic: "كتاب" },
    { word: "fan", spelling: "f-a-n", arabic: "مروحة" },
    { word: "bin", spelling: "b-i-n", arabic: "سلة مهملات" }
  ];

  // Self-contained speak utility in case parent is not provided
  const speakText = (text: string) => {
    if (onSpeak) {
      onSpeak(text);
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = readingSpeed;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith("en-")) || voices[0];
      if (enVoice) utterance.voice = enVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak spelling letter-by-letter, then whole word
  const speakSpelling = (wordObj: typeof spellWords[0]) => {
    const spellStr = wordObj.spelling.replace(/-/g, ", ");
    speakText(`${wordObj.word}. spelled. ${spellStr}. ${wordObj.word}`);
  };

  const handleItemClick = (item: ClassroomItem) => {
    setSelectedItemId(item.id);
    speakText(item.word);
    
    // Track found item
    if (!foundItems[item.id]) {
      const newFound = { ...foundItems, [item.id]: true };
      setFoundItems(newFound);
      setScore(prev => prev + 10);
      
      // If all items found, show celebration
      if (Object.keys(newFound).length === items.length) {
        setShowCelebration(true);
        speakText("Fantastic job! You found everything in our school classroom!");
      }
    }
  };

  const resetGame = () => {
    setFoundItems({});
    setSelectedItemId(null);
    setScore(0);
    setShowCelebration(false);
    speakText("Let's play again! Point to the fan!");
  };

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas based on client rect
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        // Save current canvas content
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
        }

        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Initialize context
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = canvasTool === "eraser" ? "#ffffff" : canvasColor;
          ctx.lineWidth = canvasTool === "eraser" ? 24 : 6;
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, rect.width, rect.height);
          contextRef.current = ctx;
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Trigger tiny timeout to let container render fully
    const timer = setTimeout(resizeCanvas, 150);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(timer);
    };
  }, [isCanvasFullScreen]);

  // Update canvas properties on tool or color change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = canvasTool === "eraser" ? "#ffffff" : canvasColor;
      contextRef.current.lineWidth = canvasTool === "eraser" ? 24 : 6;
    }
  }, [canvasColor, canvasTool]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    lastPosRef.current = { x, y };
    setIsDrawing(true);

    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ("touches" in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    lastPosRef.current = { x, y };

    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startDrawingRef = useRef(startDrawing);
  const drawRef = useRef(draw);
  const stopDrawingRef = useRef(stopDrawing);

  useEffect(() => {
    startDrawingRef.current = startDrawing;
    drawRef.current = draw;
    stopDrawingRef.current = stopDrawing;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      startDrawingRef.current(e as any);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      drawRef.current(e as any);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      stopDrawingRef.current();
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    speakText("Board cleared");
  };

  const checkSpelling = () => {
    const currentWordObj = spellWords.find(w => w.word === currentSpellWord);
    if (!currentWordObj) return;

    if (spellInput.trim().toLowerCase() === currentSpellWord) {
      speakText(`Excellent! ${currentSpellWord} is spelled correctly!`);
      // Add visual success or sparks
      setScore(prev => prev + 25);
      setSpellInput("");
      // select next word randomly or next in order
      const currentIndex = spellWords.findIndex(w => w.word === currentSpellWord);
      const nextIndex = (currentIndex + 1) % spellWords.length;
      setCurrentSpellWord(spellWords[nextIndex].word);
    } else {
      speakText(`Try again! Listen closely to the spelling.`);
      speakSpelling(currentWordObj);
    }
  };

  return (
    <div className="w-full bg-[#fffdf6] border-4 border-amber-950/20 rounded-[36px] p-4 sm:p-6 shadow-xl text-slate-800 font-sans" id="lesson-interactive-root">
      
      {/* 1. TEXTBOOK HEADER LAYOUT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-dashed border-amber-900/10 pb-6 mb-6">
        {/* Left Side: Unit 5 Happy Face */}
        <div className="flex items-center gap-3 bg-white/80 px-4 py-2.5 rounded-[20px] border-2 border-amber-950/20 shadow-sm shrink-0">
          <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl font-bold text-slate-900 shadow-inner">
            😊
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PRIMARY SMILE</span>
            <span className="text-lg font-black text-indigo-950">Unit <span className="text-blue-600 font-extrabold text-xl">5</span></span>
          </div>
        </div>

        {/* Center: My School Textbook Sign */}
        <div className="bg-[#ffea00] border-2 border-slate-900 px-8 py-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-1 shrink-0">
          <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight uppercase px-4 text-center select-none">
            My School 🏫
          </h2>
        </div>

        {/* Right Side: Lesson 1 Ticket */}
        <div className="relative bg-gradient-to-r from-orange-400 to-amber-400 text-slate-950 border-2 border-slate-900 px-6 py-2.5 rounded-[16px] shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-bold text-center shrink-0">
          <span className="text-sm font-black uppercase tracking-wider block">Lesson 1</span>
          <span className="text-[10px] opacity-90 block font-black leading-none text-slate-900/80">Classroom Point</span>
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#fffdf6] rounded-full border-r-2 border-slate-900"></div>
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#fffdf6] rounded-full border-l-2 border-slate-900"></div>
        </div>
      </div>

      {/* SCORE & REWARDS RIBBON */}
      <div className="mb-6 flex flex-wrap justify-between items-center bg-white p-3.5 rounded-2xl border-2 border-amber-950/10 shadow-inner gap-3">
        <div className="flex items-center gap-2.5 text-xs font-black text-slate-500 uppercase tracking-wider">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            💡
          </div>
          <span>Points Gained: <span className="text-emerald-600 text-sm font-extrabold">{score} pts</span></span>
        </div>
        
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <div 
              key={item.id}
              className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black border transition-all ${
                foundItems[item.id] 
                  ? "bg-amber-400 border-amber-600 text-slate-900 scale-105" 
                  : "bg-slate-50 border-slate-200 text-slate-300"
              }`}
              title={item.word}
            >
              {item.letter}
            </div>
          ))}
        </div>
      </div>

      {/* TWO SECTIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT/TOP: CLASSROOM INTERACTIVE PICTURE (Part 1) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-md sm:text-lg flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm border-2 border-slate-900">1</span>
              <span>Listen, point and say 🗣️</span>
            </h3>
            <button 
              onClick={() => speakText("Point to the window. Point to the door. Point to the board and point to the floor.")}
              className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Listen Song</span>
            </button>
          </div>

          <p className="text-xs font-bold text-slate-500 mt-[-4px] pl-9">
            Tap the labels (f, w, b, d...) in the picture to hear and find the classroom items!
          </p>

          {/* THE CLASSROOM GRAPHIC AREA */}
          <div className="relative w-full aspect-[4/3] rounded-[32px] border-4 border-amber-950/30 overflow-hidden shadow-lg bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd]">
            {/* Ambient Background Grid pattern representing floor tiles */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(45deg,#d97706_25%,transparent_25%,transparent_75%,#d97706_75%),linear-gradient(45deg,#d97706_25%,transparent_25%,transparent_75%,#d97706_75%)] bg-[size:32px_32px] opacity-10" />
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-amber-800/20 border-t-4 border-amber-950/40" />

            {/* CEILING FAN */}
            <div className="absolute top-[3%] left-[28%] -translate-x-1/2 flex flex-col items-center">
              <div className="w-1.5 h-10 bg-slate-400" />
              {/* Fan Blades Spinning */}
              <div className={`relative w-28 h-6 flex items-center justify-center transition-transform ${isFanSpinning ? "animate-[spin_2s_linear_infinite]" : ""}`}>
                <div className="absolute w-28 h-1.5 bg-slate-300 rounded-full border border-slate-400" />
                <div className="absolute w-1.5 h-14 bg-slate-300 rounded-full border border-slate-400 rotate-90" />
                <div className="w-4 h-4 rounded-full bg-slate-500 border border-slate-600 z-10" />
              </div>
            </div>

            {/* CLASSROOM WINDOW */}
            <div className="absolute top-[20%] left-[8%] w-[25%] h-[35%] bg-sky-200 border-4 border-amber-800 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between">
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 bg-sky-200/50 p-1">
                <div className="border border-sky-400/35 bg-sky-100/50" />
                <div className="border border-sky-400/35 bg-sky-100/50" />
                <div className="border border-sky-400/35 bg-sky-100/50" />
                <div className="border border-sky-400/35 bg-sky-100/50" />
              </div>
              <div className="h-2 bg-amber-800" />
            </div>

            {/* BLACKBOARD / CHALKBOARD */}
            <div className="absolute top-[16%] left-[38%] w-[42%] h-[28%] bg-[#1e293b] border-4 border-amber-800 rounded-md shadow-lg p-2 flex gap-4">
              {/* Portrait picture on board (Mr Gamar) */}
              <div className="w-12 h-14 bg-amber-50 border border-amber-200/80 rounded-sm flex flex-col items-center p-0.5 justify-between">
                <span className="text-[14px]">👨‍🏫</span>
                <span className="text-[6px] text-amber-950 font-bold tracking-widest leading-none">Mr. Gamar</span>
              </div>
              {/* Board Letter writing */}
              <div className="flex-1 flex items-center justify-center border border-dashed border-slate-700/80 rounded p-1">
                <div className="text-white font-serif text-sm font-bold text-center leading-tight">
                  <p className="text-[9px] text-indigo-200 uppercase tracking-widest font-black">SMILE Book 1</p>
                  <p className="text-[11px] text-yellow-300 font-bold">Unit 5: My School</p>
                </div>
              </div>
            </div>

            {/* DOOR */}
            <div className="absolute top-[15%] right-[6%] w-[16%] h-[55%] bg-amber-100 border-4 border-amber-800 rounded-t-lg shadow-md flex items-center pl-1.5 relative">
              <div className="w-1 h-20 bg-amber-200 border-r border-amber-800/30 rounded" />
              {/* Doorknob */}
              <div className="absolute right-1 top-[55%] w-3 h-3 rounded-full bg-slate-600 border border-slate-800 shadow" />
            </div>

            {/* TEACHER CHARACTERS */}
            {/* Sudanese Teacher in White Hijab */}
            <div className="absolute bottom-[28%] left-[45%] -translate-x-1/2 w-[22%] h-[45%] flex flex-col items-center">
              {/* Speech bubble */}
              <div className="absolute -top-10 bg-white border-2 border-slate-800 px-3 py-1 rounded-full text-[9px] font-black text-slate-900 shadow-sm animate-bounce whitespace-nowrap">
                Point to the... 🔊
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-slate-800 rotate-45" />
              </div>
              {/* Hijab/Head */}
              <div className="w-11 h-14 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center relative">
                {/* Face */}
                <div className="w-8 h-9 bg-[#fcd34d] rounded-full flex flex-col items-center justify-center relative">
                  <div className="flex gap-1.5 mb-1 mt-1">
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                  </div>
                  <div className="w-3 h-1.5 border-b-2 border-slate-950 rounded-full" />
                </div>
              </div>
              {/* Body dressed in traditional white robe */}
              <div className="w-16 h-28 bg-white border-x-2 border-b-2 border-slate-100 rounded-t-3xl shadow-md flex items-start justify-center relative pt-1">
                {/* Pointing hand stick */}
                <div className="absolute left-[80%] top-[30%] w-10 h-1 bg-amber-700 rounded-full transform rotate-[-15deg] origin-left border border-amber-900" />
              </div>
            </div>

            {/* SITTING PUPIL (Left) */}
            <div className="absolute bottom-[10%] left-[10%] w-[24%] h-[45%] flex flex-col items-center justify-end">
              {/* Head with white hijab */}
              <div className="w-10 h-12 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center z-10">
                <div className="w-7 h-8 bg-[#fcd34d] rounded-full flex flex-col items-center justify-center">
                  <div className="flex gap-1 mb-1">
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                    <div className="w-1 h-1 bg-slate-950 rounded-full" />
                  </div>
                  <div className="w-2.5 h-1 border-b border-slate-950 rounded-full" />
                </div>
              </div>
              {/* Body dressed in yellow uniform */}
              <div className="w-14 h-20 bg-yellow-100 border-2 border-yellow-200 rounded-t-2xl shadow-sm flex flex-col items-center justify-start p-1 relative">
                {/* Reading book in hand */}
                <div className="absolute -right-2 top-2 w-11 h-8 bg-white border-2 border-blue-500 rounded-sm transform rotate-[15deg] shadow-sm flex items-center justify-center text-[7px] font-bold text-blue-950">
                  📖 English
                </div>
              </div>
              {/* Wooden Chair underneath */}
              <div className="absolute bottom-0 w-16 h-12 flex flex-col items-center justify-end">
                <div className="w-16 h-1 bg-amber-800 rounded-full" /> {/* Seat */}
                <div className="flex justify-between w-12 h-10 px-1">
                  <div className="w-1 bg-amber-800" />
                  <div className="w-1 bg-amber-800" />
                </div>
              </div>
            </div>

            {/* STANDING PUPIL (Right) */}
            <div className="absolute bottom-[10%] right-[22%] w-[22%] h-[50%] flex flex-col items-center justify-end z-10">
              {/* Head with white hijab */}
              <div className="w-10 h-12 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center">
                <div className="w-7 h-8 bg-[#fcd34d] rounded-full flex flex-col items-center justify-center">
                  <div className="flex gap-1 mb-1">
                    <div className="w-0.5 h-0.5 bg-slate-950 rounded-full" />
                    <div className="w-0.5 h-0.5 bg-slate-950 rounded-full" />
                  </div>
                  <div className="w-2.5 h-1 border-b border-slate-950 rounded-full" />
                </div>
              </div>
              {/* Body in yellow school robe */}
              <div className="w-14 h-26 bg-yellow-100 border-2 border-yellow-200 rounded-t-3xl shadow-sm relative">
                {/* Pink Bag pack on shoulder */}
                <div className="absolute -left-3 top-2 w-7 h-11 bg-pink-500 border border-pink-600 rounded-lg flex flex-col justify-between p-0.5">
                  <div className="h-1.5 bg-purple-500 rounded-sm" />
                  <span className="text-[6px] text-white font-bold text-center">BAG</span>
                </div>
              </div>
            </div>

            {/* WASTE PAPER BIN (Bottom Right) */}
            <div className="absolute bottom-[10%] right-[6%] w-[10%] h-[16%] bg-slate-200/90 border-2 border-slate-400 rounded-b-md shadow flex flex-col p-0.5 gap-0.5 justify-start">
              <div className="h-1 bg-slate-400 rounded-sm" />
              <div className="flex-grow flex flex-col justify-end">
                <div className="h-1.5 bg-slate-300 rounded" />
              </div>
            </div>

            {/* STUDY WOODEN DESK */}
            <div className="absolute bottom-[12%] left-[38%] w-[26%] h-[18%] bg-yellow-600 border-2 border-yellow-700 rounded-t-lg shadow-md flex flex-col p-1 relative justify-start">
              {/* Desk drawer slice */}
              <div className="h-1 bg-yellow-800 rounded-full mb-1" />
              <div className="flex justify-between px-2">
                <div className="w-2 h-1 bg-yellow-800" />
              </div>
              {/* Paper on desk */}
              <div className="absolute -top-3 left-4 w-9 h-4 bg-white border border-slate-300 transform -rotate-[5deg] shadow-sm flex items-center justify-center">
                <span className="text-[6px] font-bold text-slate-500">PAPER</span>
              </div>
            </div>

            {/* FLOATING INTERACTIVE ALPHABET LABELS */}
            {items.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isFound = foundItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer`}
                >
                  {/* Outer active highlight wave */}
                  {isSelected && (
                    <span className="absolute w-12 h-12 rounded-full bg-indigo-500/30 animate-ping" />
                  )}

                  {/* Textbook Labeled Paper Badge */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg border-2 border-slate-900 font-extrabold flex items-center justify-center text-xs shadow-md transition-all ${
                      isSelected 
                        ? "bg-indigo-600 text-white border-indigo-900 scale-110" 
                        : isFound 
                          ? "bg-amber-300 text-amber-950 border-amber-500" 
                          : "bg-white text-slate-900 hover:bg-yellow-50"
                    }`}
                  >
                    {item.letter}
                  </motion.div>

                  {/* Subtle dot indicating the exact target point */}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-white mt-0.5" />
                </button>
              );
            })}
          </div>

          {/* ITEM INFORMATION POPUP */}
          <div className="min-h-[80px]">
            <AnimatePresence mode="wait">
              {selectedItemId ? (
                (() => {
                  const item = items.find(i => i.id === selectedItemId);
                  if (!item) return null;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-indigo-50 border-2 border-indigo-100 p-4 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl bg-white p-2 rounded-xl border-2 border-indigo-200 shadow-sm flex items-center justify-center shrink-0">
                          {item.emoji}
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-black px-2 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-1">
                            FOUND IT! ({item.letter})
                          </span>
                          <h4 className="text-base font-black text-indigo-950 leading-none mb-1">
                            {item.word} • <span className="font-bold text-amber-600">{item.arabic}</span>
                          </h4>
                          <p className="text-[10px] text-indigo-900/80 font-bold leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => speakText(item.word)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase rounded-lg shadow-sm flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Say Word</span>
                        </button>
                        <button
                          onClick={() => {
                            const spellStr = item.spelling.replace(/-/g, ", ");
                            speakText(`${item.word}. spelled. ${spellStr}`);
                          }}
                          className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-800 text-[10px] font-black uppercase rounded-lg shadow-sm hover:bg-indigo-100/30 flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Spell It</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-5 rounded-2xl text-center text-xs font-black text-slate-400 flex items-center justify-center gap-2">
                  <span>👈 Tap any letter label in the classroom to point, say, and learn spelling!</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT/BOTTOM: DRAW & SPELL ACTIVITY (Part 2) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-md sm:text-lg flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm border-2 border-slate-900">2</span>
              <span>Draw and spell ✍️</span>
            </h3>
            
            <div className="flex gap-1">
              <button 
                onClick={() => setIsFanSpinning(!isFanSpinning)}
                className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-black cursor-pointer text-slate-600 transition-colors"
                title="Toggle Ceiling Fan"
              >
                {isFanSpinning ? "⏸️ Fan Off" : "▶️ Fan On"}
              </button>
              <button 
                onClick={resetGame}
                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restart Game</span>
              </button>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-500 mt-[-4px]">
            Draw letters on the board below, and spell them! Cathy drawn the letter <span className="text-indigo-600 font-extrabold font-mono">d</span> on her friend's back!
          </p>

          {/* TWO GIRLS SKETCH CARTOON DECOR */}
          <div className="bg-[#f0f9ff] border-2 border-sky-100 p-3 rounded-2xl flex items-center gap-3">
            <div className="text-2xl bg-white w-10 h-10 rounded-full border border-sky-200 flex items-center justify-center shrink-0 shadow-sm">
              👭
            </div>
            <div className="text-left text-[11px] font-bold text-sky-900 leading-tight">
              <span className="font-extrabold text-sky-950">Textbook Tip:</span> Cathy says: <span className="italic">"d - e - s - k. Desk."</span> while drawing the letter on her friend's back with her finger!
            </div>
          </div>

          {/* WORD CHOOSER BUTTONS */}
          <div className="flex flex-wrap gap-1.5">
            {spellWords.map((wordObj) => (
              <button
                key={wordObj.word}
                onClick={() => {
                  setCurrentSpellWord(wordObj.word);
                  speakText(wordObj.word);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-b-4 border-r-4 cursor-pointer ${
                  currentSpellWord === wordObj.word
                    ? "bg-indigo-600 text-white border-indigo-800"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {wordObj.word}
              </button>
            ))}
          </div>

          {/* DRAWING BOARD CANVAS */}
          <div className={isCanvasFullScreen 
            ? "fixed inset-0 z-50 bg-slate-950 p-6 flex flex-col gap-4 overflow-hidden text-white" 
            : "flex flex-col gap-2.5 bg-slate-900 p-3 sm:p-4 rounded-[28px] border-4 border-slate-950 shadow-inner text-white"
          }>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 flex-wrap gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>Pencil Writing Board</span>
                {isCanvasFullScreen && (
                  <span className="bg-indigo-950 text-indigo-300 text-[10px] px-2.5 py-0.5 rounded-full font-black animate-pulse border border-indigo-800/40">
                    Full Screen • وضع ملء الشاشة 📺
                  </span>
                )}
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                {/* Pencil tool */}
                <button
                  onClick={() => setCanvasTool("pencil")}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    canvasTool === "pencil"
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Write</span>
                </button>
                {/* Eraser tool */}
                <button
                  onClick={() => setCanvasTool("eraser")}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    canvasTool === "eraser"
                      ? "bg-amber-500 text-white border-amber-400"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
                {/* Clear tool */}
                <button
                  onClick={clearCanvas}
                  className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-900/30 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
                {/* Guide toggle button */}
                <button
                  onClick={() => setShowGuidesClassroom(!showGuidesClassroom)}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    showGuidesClassroom
                      ? "bg-amber-500/20 text-amber-300 border-amber-900/30"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                  }`}
                  title="Toggle Direction Guides • اتجاهات الكتابة"
                >
                  <span>💡 {showGuidesClassroom ? "Hide Guides" : "Show Guides"}</span>
                </button>
                {/* Full-screen Toggle */}
                <button
                  onClick={() => setIsCanvasFullScreen(!isCanvasFullScreen)}
                  className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    isCanvasFullScreen 
                      ? "bg-rose-500 text-white border-rose-600 hover:bg-rose-600 shadow-xs" 
                      : "bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700"
                  }`}
                >
                  {isCanvasFullScreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>🗜️ Exit • خروج</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>📺 Full Screen</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Canvas Body */}
            <div className={`relative w-full bg-white rounded-2xl border border-slate-950 overflow-hidden cursor-crosshair ${
              isCanvasFullScreen ? "flex-1 min-h-[250px]" : "h-36"
            }`}>
              {/* Trace Guide Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                <span className={`font-serif text-slate-950 font-black capitalize select-none transition-all ${
                  isCanvasFullScreen ? "text-[16rem]" : "text-8xl"
                }`}>
                  {currentSpellWord[0]}
                </span>
              </div>

              {/* Kid-friendly Writing Direction Arrow Guides Overlay */}
              {showGuidesClassroom && (
                <div className="absolute bottom-2 right-2 pointer-events-none select-none z-10 flex flex-col items-center gap-1 bg-slate-900/80 text-white px-2 py-1.5 rounded-xl border border-slate-700/60 shadow-md">
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Direction Guides</span>
                  <div className="flex gap-1">
                    {(() => {
                      const char = currentSpellWord[0] || "A";
                      const c = char.toLowerCase();
                      const dict: Record<string, string[]> = {
                        a: ["↺", "↓"],
                        b: ["⬇", "⤾"],
                        c: ["↺"],
                        d: ["↺", "⬇"],
                        e: ["➔", "⤿"],
                        f: ["⬇", "➔"],
                        g: ["↺", "⤾"],
                        h: ["⬇", "⤿"],
                        i: ["⬇"],
                        j: ["⬇", "↺"],
                        k: ["⬇", "↙", "↘"],
                        l: ["⬇"],
                        m: ["⬇", "⤿", "⤿"],
                        n: ["⬇", "⤿"],
                        o: ["↺"],
                        p: ["⬇", "⤾"],
                        q: ["↺", "⬇"],
                        r: ["⬇", "⤾"],
                        s: ["⤿"],
                        t: ["⬇", "➔"],
                        u: ["⤿", "⬇"],
                        v: ["↘", "↗"],
                        w: ["↘", "↗", "↘", "↗"],
                        x: ["↘", "↙"],
                        y: ["↘", "↙"],
                        z: ["➔", "↙", "➔"]
                      };
                      const arrows = dict[c] || ["➔"];
                      return arrows.map((arrow, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-[7px] font-bold text-indigo-300 leading-none">#{idx+1}</span>
                          <span className="w-5 h-5 rounded-full bg-indigo-500 border border-indigo-400 text-white flex items-center justify-center text-[10px] font-black shadow-xs animate-bounce" style={{ animationDelay: `${idx * 200}ms` }}>
                            {arrow}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full block"
              />
            </div>

            {/* Chalk Color Palette */}
            <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400">Pencil Color:</span>
              <div className="flex gap-2">
                {[
                  { name: "indigo", hex: "#4f46e5" },
                  { name: "sky", hex: "#0ea5e9" },
                  { name: "green", hex: "#22c55e" },
                  { name: "yellow", hex: "#f59e0b" },
                  { name: "rose", hex: "#ec4899" }
                ].map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => {
                      setCanvasColor(col.hex);
                      setCanvasTool("pencil");
                    }}
                    style={{ backgroundColor: col.hex }}
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      canvasColor === col.hex && canvasTool === "pencil"
                        ? "border-white scale-125 shadow-md"
                        : "border-transparent hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SPELLING INPUT BOX CARD */}
          <div className="bg-white border-2 border-amber-950/10 p-4 rounded-3xl shadow-sm flex flex-col gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block text-left">
              Confirm Spelling Test
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                value={spellInput}
                onChange={(e) => setSpellInput(e.target.value)}
                placeholder={`Type "${currentSpellWord}" spelling here`}
                className="flex-1 border-2 border-slate-200 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs font-black tracking-wide outline-none placeholder:text-slate-300 placeholder:font-semibold"
                onKeyDown={(e) => e.key === "Enter" && checkSpelling()}
              />
              <button
                onClick={checkSpelling}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 border-b-4 border-emerald-700 hover:border-emerald-800 text-white text-xs font-black uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer transform active:translate-y-0.5"
              >
                <span>Check</span>
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-2.5">
              <button
                onClick={() => {
                  const currentWordObj = spellWords.find(w => w.word === currentSpellWord);
                  if (currentWordObj) speakSpelling(currentWordObj);
                }}
                className="text-[11px] font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span>Hear Spelling Helper</span>
              </button>
              
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-full">
                {currentSpellWord.length} letters
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ALL COMPLETED CONGRATULATIONS OVERLAY */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] border-4 border-amber-400 p-8 sm:p-10 max-w-md w-full text-center relative overflow-hidden shadow-2xl flex flex-col items-center gap-5"
            >
              {/* Confetti sparkle background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15),transparent)] pointer-events-none" />
              
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-300 text-5xl shadow-inner animate-bounce">
                🎉
              </div>

              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight mb-2">
                  Unit 5 Lesson 1 Master!
                </h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                  All Classroom Items Discovered!
                </p>
                <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
                  Excellent reading and pointing performance, pupil! You have successfully matched all primary classroom objects in Sudan book Grade 1.
                </p>
              </div>

              {/* Reward stats */}
              <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="text-left">
                  <span className="block text-[10px] font-black text-slate-400 uppercase">BONUS REWARD:</span>
                  <span className="text-emerald-600 text-lg font-black">+100 Game Points</span>
                </div>
                <div className="text-3xl">⭐️🏆</div>
              </div>

              <button
                onClick={() => {
                  setScore(prev => prev + 100);
                  setShowCelebration(false);
                }}
                className="w-full bg-[#ffea00] hover:bg-yellow-400 border-b-4 border-yellow-600 text-slate-950 text-xs font-black uppercase py-4 px-6 rounded-[20px] shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Claim Points & Continue! 👍
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
