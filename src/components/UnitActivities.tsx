import React, { useState, useEffect, useRef } from "react";
import { 
  Check, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  PenTool, 
  Paintbrush, 
  Trophy, 
  HelpCircle,
  Eye,
  Type,
  Move,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UnitActivitiesProps {
  unitId: number;
  unitTitle: string;
  speakText: (text: string, voice?: string) => void;
  addPoints: (points: number) => void;
  activeActivity?: number;
  setActiveActivity?: (index: number) => void;
}

// Complete Stroke Guides for letters with precise Arabic and English steps
const strokeGuides: Record<string, {
  capital: string[];
  small: string[];
}> = {
  a: {
    capital: ["① Draw a slanted line up-right ↗", "② Draw a slanted line down-right ↘", "③ Draw a cross bar in the middle ➔"],
    small: ["① Draw a round circle counterclockwise ↺", "② Draw a short line down on the right with a tiny tail ↓"]
  },
  b: {
    capital: ["① Draw a straight line down ⬇", "② Draw two rounded curves on the right ⤾"],
    small: ["① Draw a tall straight line down ⬇", "② Draw a neat circle on the lower right ↺"]
  },
  c: {
    capital: ["① Draw a big open curve to the left ↺"],
    small: ["① Draw a small open curve to the left between middle and base lines ↺"]
  },
  d: {
    capital: ["① Draw a straight line down ⬇", "② Draw a big half-circle on the right ⤿"],
    small: ["① Draw a round circle counterclockwise ↺", "② Draw a tall straight line down on the right ⬇"]
  },
  e: {
    capital: ["① Straight line down ⬇", "② Top line right ➔", "③ Middle line right ➔", "④ Bottom line right ➔"],
    small: ["① Straight line right ➔", "② Loop up and curve around to the left ⤿"]
  },
  f: {
    capital: ["① Straight line down ⬇", "② Top line right ➔", "③ Middle line right ➔"],
    small: ["① Curve at the top and draw down ⬇", "② Draw a small cross line in the middle ➔"]
  },
  g: {
    capital: ["① Draw a big curve left ↺", "② Make a small horizontal line in ⬅"],
    small: ["① Draw a small circle ↺", "② Draw a tail down to the bottom line, curving left ⤾"]
  },
  h: {
    capital: ["① Left line down ⬇", "② Right line down ⬇", "③ Draw a cross line in the middle ➔"],
    small: ["① Tall line down ⬇", "② Draw a nice curved hill to the right and down ⤿"]
  },
  i: {
    capital: ["① Top horizontal bar ➔", "② Straight line down ⬇", "③ Bottom horizontal bar ➔"],
    small: ["① Short line down between middle and base lines ⬇", "② Add a neat dot on top •"]
  },
  j: {
    capital: ["① Straight line down, curling left ⬇", "② Add a top horizontal bar ➔"],
    small: ["① Short line down past the baseline, curling left ⬇", "② Add a neat dot on top •"]
  },
  k: {
    capital: ["① Tall straight line down ⬇", "② Slanted line down-left to the center ↙", "③ Slanted line down-right to the baseline ↘"],
    small: ["① Tall straight line down ⬇", "② Short slanted line down-left ↙", "③ Short slanted line down-right ↘"]
  },
  l: {
    capital: ["① Tall line down ⬇", "② Small baseline right ➔"],
    small: ["① Tall straight line down ⬇"]
  },
  m: {
    capital: ["① Line up ⬆", "② Slide down-right ↘", "③ Slide up-right ↗", "④ Line down ⬇"],
    small: ["① Short line down ⬇", "② Two curved hills to the right ⤿ ⤿"]
  },
  n: {
    capital: ["① Line up ⬆", "② Slide down-right ↘", "③ Line up ⬆"],
    small: ["① Short line down ⬇", "② One curved hill to the right ⤿"]
  },
  o: {
    capital: ["① Big neat circle counterclockwise ↺"],
    small: ["① Small neat circle counterclockwise between middle and base lines ↺"]
  },
  p: {
    capital: ["① Straight line down ⬇", "② Round curve on the upper right ⤾"],
    small: ["① Straight line down past the baseline ⬇", "② Round curve on the right between middle and base lines ⤾"]
  },
  q: {
    capital: ["① Big neat circle counterclockwise ↺", "② Small diagonal tail on the bottom-right ↘"],
    small: ["① Small circle counterclockwise ↺", "② Tall line down past the baseline, with a small hook up-right ↗"]
  },
  r: {
    capital: ["① Straight line down ⬇", "② Round curve on the upper right ⤾", "③ Slanted line down-right to the baseline ↘"],
    small: ["① Short line down ⬇", "② Small curved hook to the upper-right ↗"]
  },
  s: {
    capital: ["① Curve left, then slide right, and curve left again ⤿"],
    small: ["① Make a small s-curve between the middle and baseline ⤿"]
  },
  t: {
    capital: ["① Horizontal top line ➔", "② Straight line down from the center ⬇"],
    small: ["① Tall line down ⬇", "② Cross line in the upper middle ➔"]
  },
  u: {
    capital: ["① Go down, curve right, and go up ⤿", "② Straight line down to the baseline ⬇"],
    small: ["① Go down, curve right, and go up ⤿", "② Short tail down ⬇"]
  },
  v: {
    capital: ["① Slide down-right ↘", "② Slide up-right ↗"],
    small: ["① Small slide down-right ↘", "② Small slide up-right ↗"]
  },
  w: {
    capital: ["① Slide down ↘", "② Slide up ↗", "③ Slide down ↘", "④ Slide up ↗"],
    small: ["① Small slide down ↘", "② Small slide up ↗", "③ Small slide down ↘", "④ Small slide up ↗"]
  },
  x: {
    capital: ["① Diagonal line down-right ↘", "② Diagonal line down-left ↙"],
    small: ["① Small diagonal down-right ↘", "② Small diagonal down-left ↙"]
  },
  y: {
    capital: ["① V-shape down-right and up-right ↘ ↗", "② Straight line down from the center ⬇"],
    small: ["① Small u-shape ⤿", "② Tail line going down-left to the bottom line ↙"]
  },
  z: {
    capital: ["① Top line right ➔", "② Diagonal line down-left ↙", "③ Bottom line right ➔"],
    small: ["① Small top line right ➔", "② Small diagonal down-left ↙", "③ Small bottom line right ➔"]
  }
};

// Interactive Canvas and Four-Line Notebook Tracing Board
function HandwritingCanvas({
  letter,
  uppercase,
  lowercase,
  phonicsWord,
  arabicPhonics,
  emoji,
  speakText,
  playSuccessSound,
  isCompleted,
  onVerifySuccess
}: {
  key?: string;
  letter: string;
  uppercase: string;
  lowercase: string;
  phonicsWord: string;
  arabicPhonics: string;
  emoji: string;
  speakText: (text: string, voice?: string) => void;
  playSuccessSound: () => void;
  isCompleted: boolean;
  onVerifySuccess: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [pencilColor, setPencilColor] = useState("#2563eb"); // Classic blue ink
  const [hasDrawn, setHasDrawn] = useState(false);
  const [typedVal, setTypedVal] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showGuides, setShowGuides] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    lastPosRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
    setHasDrawn(true);
  };

  const draw = (e: any) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);

    if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 18;
    } else {
      ctx.strokeStyle = pencilColor;
      ctx.lineWidth = 5;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
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
      startDrawingRef.current(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      drawRef.current(e);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      // Only set and draw if size actually changed to avoid unnecessary clears
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

        // Restore content
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, rect.width, rect.height);
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 150);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [letter, isFullScreen]);

  const guides = strokeGuides[lowercase] || {
    capital: ["Start from bottom-left up ↗"],
    small: ["Draw circular shape ↺"]
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm text-center">
      {/* Phonics & Audio Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
        <div className="flex items-center gap-3 justify-center sm:justify-start w-full sm:w-auto">
          <span className="text-4xl">{emoji}</span>
          <div className="text-left">
            <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">
              Phonics Sound
            </h4>
            <p className="text-xs text-slate-500 font-bold">
              {uppercase} {lowercase} is for <span className="text-amber-500 font-black">{phonicsWord}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => speakText(`${uppercase}, ${lowercase}. ${phonicsWord}`, "Kore")}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs cursor-pointer transition-all active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen</span>
        </button>
      </div>

      {/* Main Handwriting Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT PANEL: STUDY BOOK MODEL */}
        <div className="flex flex-col gap-4 p-5 bg-gradient-to-br from-indigo-50/40 to-sky-50/40 rounded-2xl border border-indigo-100">
          <h5 className="font-black text-xs uppercase tracking-wider text-indigo-950 flex justify-between items-center">
            <span>Workbook Model 📖</span>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-100/50 px-2.5 py-0.5 rounded-full">Letter Model</span>
          </h5>
          <p className="text-[11px] text-slate-500 font-bold text-center">
            See how the letter is written by hand on the four lines:
          </p>

          {/* 4-ruled model canvas */}
          <div className="relative w-full h-36 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-around px-4 overflow-hidden">
            {/* 4 horizontal lines background */}
            <div className="absolute inset-x-0 h-full flex flex-col justify-between py-6 pointer-events-none">
              <div className="border-t border-rose-300 w-full"></div>
              <div className="border-t border-dashed border-sky-300 w-full"></div>
              <div className="border-t-2 border-indigo-400 w-full"></div>
              <div className="border-t border-rose-300 w-full"></div>
            </div>

            {/* Upper Model */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="text-7xl font-cursive text-indigo-900 select-none pb-4 drop-shadow-xs">
                {uppercase}
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold absolute bottom-2">Capital</span>
            </div>

            {/* Lower Model */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="text-7xl font-cursive text-indigo-800 select-none pb-4 drop-shadow-xs">
                {lowercase}
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold absolute bottom-2">Small</span>
            </div>
          </div>

          {/* Stroke instructions */}
          <div className="flex flex-col gap-2 mt-2 text-left">
            <span className="text-[10px] font-black uppercase text-indigo-950 tracking-wider">How to write:</span>
            
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-indigo-900 font-black">Capital {uppercase}:</span>
              {guides.capital.map((step, idx) => (
                <span key={idx} className="text-xs text-slate-600 font-semibold pl-2">
                  {step}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1 text-left mt-1.5">
              <span className="text-[10px] text-indigo-900 font-black">Small {lowercase}:</span>
              {guides.small.map((step, idx) => (
                <span key={idx} className="text-xs text-slate-600 font-semibold pl-2">
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PRACTICE PENCIL BOARD */}
        <div className={isFullScreen 
          ? "fixed inset-0 z-50 bg-[#fffcf5] p-6 flex flex-col gap-5 overflow-hidden" 
          : "flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200"
        }>
          <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-dashed border-slate-200/60">
            <h5 className="font-black text-xs uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
              <span>Pencil Practice Board ✏️</span>
              {isFullScreen && (
                <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2.5 py-0.5 rounded-full font-black animate-pulse">
                  Full Screen • وضع ملء الشاشة 📺
                </span>
              )}
            </h5>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTool("pencil")}
                className={`p-2 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  tool === "pencil" 
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-xs" 
                    : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
                title="Pencil • قلم رصاص"
              >
                <span>✏️ Pencil</span>
              </button>
              <button
                onClick={() => setTool("eraser")}
                className={`p-2 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  tool === "eraser" 
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs" 
                    : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
                title="Eraser"
              >
                <span>🧽 Eraser</span>
              </button>
              <button
                onClick={clearCanvas}
                className="p-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 rounded-xl text-[11px] font-bold cursor-pointer transition-all"
                title="Clear All"
              >
                <span>🧹 Clear</span>
              </button>
              <button
                onClick={() => setShowGuides(!showGuides)}
                className={`p-2 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  showGuides 
                    ? "bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900 shadow-xs" 
                    : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                }`}
                title="Writing Directions • اتجاهات الكتابة"
              >
                <span>💡 {showGuides ? "Hide Guides • إخفاء الإرشادات" : "Show Guides • الإرشادات"}</span>
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className={`p-2 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isFullScreen 
                    ? "bg-rose-500 text-white border-rose-600 hover:bg-rose-600 shadow-xs" 
                    : "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700"
                }`}
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullScreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>🗜️ Exit • خروج</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>📺 Full Screen • ملء الشاشة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Kid-friendly Writing Direction Guides Bar (Now positioned outside of the drawing canvas to prevent blocking!) */}
          {showGuides && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100 text-left relative"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1.5 mb-1.5">
                  <span className="bg-indigo-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] border border-indigo-400">A</span>
                  <span>Capital Letter ({uppercase}):</span>
                </span>
                <div className="flex flex-col gap-1">
                  {guides.capital.map((step, idx) => {
                    const arrow = step.match(/[⬇➔↙↗↘⬆⬅↺⤾⤿]/)?.[0] || "➔";
                    return (
                      <div key={idx} className="flex items-center gap-2 bg-white/90 border border-indigo-100 px-2.5 py-1 rounded-xl text-[10px] font-extrabold text-slate-700 shadow-2xs">
                        <span className="w-4.5 h-4.5 rounded-full bg-indigo-500 border border-indigo-400 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-3xs animate-bounce" style={{ animationDelay: `${idx * 200}ms` }}>
                          {arrow}
                        </span>
                        <span className="text-indigo-900 font-bold text-[9px] uppercase tracking-wider bg-indigo-50 px-1 py-0.5 rounded">#{idx+1}</span>
                        <span className="leading-tight">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-pink-800 flex items-center gap-1.5 mb-1.5">
                  <span className="bg-pink-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] border border-pink-400">a</span>
                  <span>Small Letter ({lowercase}):</span>
                </span>
                <div className="flex flex-col gap-1">
                  {guides.small.map((step, idx) => {
                    const arrow = step.match(/[⬇➔↙↗↘⬆⬅↺⤾⤿]/)?.[0] || "➔";
                    return (
                      <div key={idx} className="flex items-center gap-2 bg-white/90 border border-pink-100 px-2.5 py-1 rounded-xl text-[10px] font-extrabold text-slate-700 shadow-2xs">
                        <span className="w-4.5 h-4.5 rounded-full bg-pink-500 border border-pink-400 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-3xs animate-bounce" style={{ animationDelay: `${(idx + guides.capital.length) * 200}ms` }}>
                          {arrow}
                        </span>
                        <span className="text-pink-900 font-bold text-[9px] uppercase tracking-wider bg-pink-50 px-1 py-0.5 rounded">#{idx+1}</span>
                        <span className="leading-tight">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Interactive drawing area with 4 lines & faint trace guideline in background */}
          <div className={`relative w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-inner cursor-crosshair transition-all ${
            isFullScreen ? "flex-1 min-h-[250px]" : "h-44"
          }`}>
            
            {/* 4 lines background inside drawing board */}
            <div className={`absolute inset-x-0 h-full flex flex-col justify-center pointer-events-none ${
              isFullScreen ? "gap-12" : "gap-6"
            }`}>
              <div className="border-t border-rose-200 w-full"></div>
              <div className="border-t border-dashed border-sky-200 w-full"></div>
              <div className="border-t-2 border-indigo-300 w-full"></div>
              <div className="border-t border-rose-200 w-full"></div>
            </div>

            {/* Faint Trace Letters in Background (With higher opacity 25% so the student can see them extremely clearly!) */}
            <div className="absolute inset-0 flex items-center justify-center gap-14 pointer-events-none select-none opacity-25">
              <span className={`font-cursive text-slate-500 transition-all ${isFullScreen ? "text-[14rem]" : "text-8xl"}`}>{uppercase}</span>
              <span className={`font-cursive text-slate-500 transition-all ${isFullScreen ? "text-[14rem]" : "text-8xl"}`}>{lowercase}</span>
            </div>

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="absolute inset-0 w-full h-full z-10"
            />

            {/* Brush Colors Choice Panel when Pencil is selected */}
            {tool === "pencil" && (
              <div className="absolute bottom-2 left-2 z-20 flex gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-100 shadow-xs">
                {[
                  { color: "#2563eb", name: "blue", label: "🔵" },
                  { color: "#475569", name: "pencil", label: "✏️" },
                  { color: "#dc2626", name: "red", label: "🔴" }
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => setPencilColor(item.color)}
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs border cursor-pointer transition-all hover:scale-110 ${
                      pencilColor === item.color 
                        ? "border-slate-800 scale-105 bg-slate-100" 
                        : "border-transparent"
                    }`}
                    title={item.name}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validation & Typing to Verify */}
          <div className="flex flex-col gap-2 mt-1 text-left">
            <label className="text-[11px] font-black uppercase text-indigo-950 flex justify-between">
              <span>Write and Type to confirm:</span>
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={1}
                disabled={isCompleted}
                placeholder={lowercase}
                value={isCompleted ? lowercase : typedVal}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setTypedVal(val);
                  if (val.toLowerCase() === lowercase) {
                    onVerifySuccess();
                    setTypedVal("");
                  }
                }}
                className={`flex-1 px-4 py-2.5 rounded-xl border text-center font-black text-lg transition-all focus:outline-none focus:ring-2 ${
                  isCompleted 
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 focus:ring-emerald-400" 
                    : "bg-white border-slate-200 text-indigo-950 focus:ring-indigo-400"
                }`}
              />
              <div className={`px-4 flex items-center justify-center rounded-xl font-bold text-xs border ${
                isCompleted 
                  ? "bg-emerald-500 border-emerald-600 text-white" 
                  : "bg-slate-100 border-slate-200 text-slate-400"
              }`}>
                {isCompleted ? "✓ Correct!" : "⏳ Waiting"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>🎉 Excellent Handwriting Practice! +15 Points Added!</span>
        </motion.div>
      )}
    </div>
  );
}

export default function UnitActivities({ 
  unitId, 
  unitTitle, 
  speakText, 
  addPoints,
  activeActivity: externalActiveActivity,
  setActiveActivity: externalSetActiveActivity
}: UnitActivitiesProps) {
  const [internalActiveActivity, setInternalActiveActivity] = useState<number>(0);
  
  const activeActivity = externalActiveActivity !== undefined ? externalActiveActivity : internalActiveActivity;
  
  const setActiveActivity = (idx: number) => {
    if (externalSetActiveActivity) {
      externalSetActiveActivity(idx);
    } else {
      setInternalActiveActivity(idx);
    }
  };
  const [feedback, setFeedback] = useState<{ isCorrect: boolean | null; text: string }>({ isCorrect: null, text: "" });
  
  // Dynamic interactive states for various exercises
  const [completedTracks, setCompletedTracks] = useState<Record<string, boolean>>({});
  const [sliderVal, setSliderVal] = useState<Record<string, number>>({ "line-1": 0, "line-2": 0, "line-3": 0 });
  const [userInputAnswers, setUserInputAnswers] = useState<Record<string, string>>({});
  const [selectedLetters, setSelectedLetters] = useState<Record<string, string>>({});
  const [matchingSelections, setMatchingSelections] = useState<{ wordId: string | null; picId: string | null }>({ wordId: null, picId: null });
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchedLettersList, setMatchedLettersList] = useState<string[]>([]);
  
  // Sudanese Flag Colors Game (Unit 3, Activity 5)
  const [activePaintColor, setActivePaintColor] = useState<string>("red");
  const [flagColors, setFlagColors] = useState<Record<string, string>>({
    top: "white",
    middle: "white",
    bottom: "white",
    triangle: "white"
  });
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  // Body Labelling Game (Unit 4, Activity 4)
  const [bodyLabels, setBodyLabels] = useState<Record<string, string>>({
    head: "",
    eye: "",
    ear: "",
    nose: "",
    mouth: "",
    hand: "",
    leg: "",
    feet: ""
  });
  const [activeBodyLabel, setActiveBodyLabel] = useState<string | null>(null);

  // Unscramble Game helper
  const getUnscrambleSentencesForUnit = (unit: number) => {
    if (unit === 5) {
      return [
        { id: "s1", words: ["in", "this", "What's", "English?"], correct: "What's this in English?", ar: "ما هذا بالإنجليزية؟" },
        { id: "s2", words: ["box.", "a", "It's"], correct: "It's a box.", ar: "إنه صندوق." },
        { id: "s3", words: ["a", "Is", "van?", "that"], correct: "Is that a van?", ar: "هل تلك شاحنة مغلقة؟" },
        { id: "s4", words: ["a", "it's", "car.", "No,"], correct: "No, it's a car.", ar: "لا، إنها سيارة." }
      ];
    }
    if (unit === 6) {
      return [
        { id: "u6s1", words: ["the", "Put", "fridge", "kitchen.", "in", "the"], correct: "Put the fridge in the kitchen.", ar: "ضع الثلاجة في المطبخ." },
        { id: "u6s2", words: ["live", "flat.", "in", "a", "I"], correct: "I live in a flat.", ar: "أنا أعيش في شقة." }
      ];
    }
    if (unit === 7) {
      return [
        { id: "u7s1", words: ["is", "mother.", "my", "This"], correct: "This is my mother.", ar: "هذه أمي." },
        { id: "u7s2", words: ["name", "Ibrahim.", "father's", "My", "is"], correct: "My father's name is Ibrahim.", ar: "اسم أبي هو إبراهيم." }
      ];
    }
    if (unit === 8) {
      return [
        { id: "u8s1", words: ["play", "game.", "a", "Let's"], correct: "Let's play a game.", ar: "دعونا نلعب لعبة." },
        { id: "u8s2", words: ["classroom.", "to", "Don't", "the", "go"], correct: "Don't go to the classroom.", ar: "لا تذهب إلى الصف الدراسي." }
      ];
    }
    if (unit === 10) {
      return [
        { id: "u10s1", words: ["melons", "picture.", "some", "There", "in", "the", "are"], correct: "There are some melons in the picture.", ar: "هناك بعض البطيخ في الصورة." },
        { id: "u10s2", words: ["favourite", "My", "is", "juice.", "mango", "drink"], correct: "My favourite drink is mango juice.", ar: "شرابي المفضل هو عصير المانجو." }
      ];
    }
    return [];
  };

  const unscrambleSentences = getUnscrambleSentencesForUnit(unitId);
  const [unscrambledAnswers, setUnscrambledAnswers] = useState<Record<string, string[]>>({});

  // Reset active state when changing units
  useEffect(() => {
    setActiveActivity(0);
    resetActivityStates();
  }, [unitId]);

  const resetActivityStates = () => {
    setFeedback({ isCorrect: null, text: "" });
    setCompletedTracks({});
    setSliderVal({ "line-1": 0, "line-2": 0, "line-3": 0 });
    setUserInputAnswers({});
    setSelectedLetters({});
    setMatchingSelections({ wordId: null, picId: null });
    setMatchedPairs([]);
    setMatchedLettersList([]);
    setFlagColors({ top: "white", middle: "white", bottom: "white", triangle: "white" });
    setBodyLabels({ head: "", eye: "", ear: "", nose: "", mouth: "", hand: "", leg: "", feet: "" });
    setUnscrambledAnswers({});
  };

  const playSuccessSound = () => {
    speakText("Excellent job! Very good!", "Zephyr");
  };

  const handleLineTrace = (lineId: string, val: number) => {
    setSliderVal(prev => ({ ...prev, [lineId]: val }));
    if (val >= 100 && !completedTracks[lineId]) {
      setCompletedTracks(prev => ({ ...prev, [lineId]: true }));
      addPoints(10);
      speakText("Well done! Line traced.");
    }
  };

  // Helper to render letter tracing/practice template using our high-fidelity HandwritingCanvas
  const renderLetterTracing = (letter: string, phonicsWord: string, arabicPhonics: string, emoji: string) => {
    const uppercase = letter.toUpperCase();
    const lowercase = letter.toLowerCase();
    const isCompleted = userInputAnswers[letter] === lowercase || userInputAnswers[letter] === uppercase;

    return (
      <HandwritingCanvas
        key={letter}
        letter={letter}
        uppercase={uppercase}
        lowercase={lowercase}
        phonicsWord={phonicsWord}
        arabicPhonics={arabicPhonics}
        emoji={emoji}
        speakText={speakText}
        playSuccessSound={playSuccessSound}
        isCompleted={isCompleted}
        onVerifySuccess={() => {
          setUserInputAnswers(prev => ({ ...prev, [letter]: lowercase }));
          addPoints(15);
          playSuccessSound();
          setFeedback({ isCorrect: true, text: `Wonderful! Correct answer and excellent writing of the letter ${uppercase} ${lowercase}.` });
        }}
      />
    );
  };

  // Helper for actual Read and Number matching (Workbook-style)
  const renderReadAndNumberInteractive = (
    words: { num: number; word: string; ar: string }[],
    pics: { id: string; correctNum: number; img: string; ar: string }[]
  ) => {
    const allCorrect = pics.every(p => parseInt(userInputAnswers[p.id]) === p.correctNum);

    return (
      <div className="flex flex-col gap-6 w-full">
        <p className="text-xs text-slate-500 font-bold text-center">
          Read the numbered words above, then write the matching number under each picture! 📖
        </p>

        {/* Numbered Word List */}
        <div className="flex flex-wrap gap-2.5 justify-center bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/30">
          {words.map((w) => (
            <div key={w.num} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-indigo-100/40 shadow-xs">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center font-black text-xs">{w.num}</span>
              <span className="text-xs font-black text-indigo-950 uppercase">{w.word}</span>
              <button 
                onClick={() => speakText(w.word)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Pictures Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {pics.map((p) => {
            const typedVal = userInputAnswers[p.id] || "";
            const isCorrect = parseInt(typedVal) === p.correctNum;

            return (
              <div key={p.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="text-5xl select-none">{p.img}</span>
                
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <input
                    type="text"
                    pattern="[1-9]*"
                    maxLength={1}
                    placeholder="?"
                    disabled={isCorrect}
                    value={typedVal}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setUserInputAnswers(prev => ({ ...prev, [p.id]: val }));
                      if (parseInt(val) === p.correctNum) {
                        addPoints(10);
                        playSuccessSound();
                        setFeedback({ isCorrect: true, text: `Well done! Correct answer.` });
                      } else if (val) {
                        setFeedback({ isCorrect: false, text: "Try again!" });
                      }
                    }}
                    className={`w-10 h-10 text-center text-lg font-black rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
                      isCorrect 
                        ? "bg-emerald-100 border-emerald-400 text-emerald-800" 
                        : "bg-white border-slate-300 text-slate-700"
                    }`}
                  />
                  {isCorrect && (
                    <span className="text-[9px] text-emerald-600 font-black flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Correct
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allCorrect && (
          <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-3xl text-center flex flex-col items-center gap-2 mt-2 w-full">
            <Trophy className="w-10 h-10 text-amber-500 animate-bounce" />
            <p className="font-black text-emerald-800 text-sm">
              Wonderful! You successfully matched all words with the correct pictures! 🎉
            </p>
            <p className="text-xs font-bold text-emerald-600">+50 Points Added</p>
          </div>
        )}
      </div>
    );
  };

  // Helper for actual Say, Spell & Write spelling game
  const renderSaySpellWrite = (
    items: { id: string; word: string; placeholder: string; missing: string; emoji: string; ar: string }[]
  ) => {
    const allCorrect = items.every(item => (userInputAnswers[item.id] || "").toLowerCase() === item.missing.toLowerCase());

    return (
      <div className="flex flex-col gap-6 items-center w-full">
        <p className="text-xs text-slate-500 font-bold text-center">
          Pronounce the word, then write the missing letter in the blank to complete the English word correctly! 🔤
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {items.map((item) => {
            const typed = (userInputAnswers[item.id] || "").toLowerCase();
            const isCorrect = typed === item.missing.toLowerCase();

            return (
              <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="text-5xl select-none">{item.emoji}</span>
                
                {/* Visual Underlined spelling pattern */}
                <div className="flex items-center gap-1 font-mono text-lg font-black text-indigo-950 uppercase">
                  {item.word.split("").map((char, index) => {
                    const isMissingChar = char.toLowerCase() === item.missing.toLowerCase();
                    // Avoid matching wrong indexes of duplicates
                    if (isMissingChar && item.word.toLowerCase().indexOf(item.missing.toLowerCase()) === index) {
                      return (
                        <span key={index} className={`underline underline-offset-4 decoration-2 ${isCorrect ? "text-emerald-600" : "text-amber-500 animate-pulse"}`}>
                          {isCorrect ? item.missing.toUpperCase() : "_"}
                        </span>
                      );
                    }
                    return <span key={index}>{char.toUpperCase()}</span>;
                  })}
                </div>

                <div className="flex flex-col items-center gap-1.5 w-full mt-1">
                  <input
                    type="text"
                    maxLength={1}
                    placeholder="?"
                    disabled={isCorrect}
                    value={userInputAnswers[item.id] || ""}
                    onChange={(e) => {
                      const val = e.target.value.trim().toLowerCase();
                      setUserInputAnswers(prev => ({ ...prev, [item.id]: val }));
                      if (val === item.missing.toLowerCase()) {
                        addPoints(15);
                        playSuccessSound();
                        setFeedback({ isCorrect: true, text: `Well done! The correct letter is "${item.missing.toUpperCase()}".` });
                        speakText(item.word);
                      } else if (val) {
                        setFeedback({ isCorrect: false, text: "Try again!" });
                      }
                    }}
                    className={`w-10 h-10 text-center text-lg font-black rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
                      isCorrect 
                        ? "bg-emerald-100 border-emerald-400 text-emerald-800" 
                        : "bg-white border-slate-300 text-slate-700"
                    }`}
                  />
                  {isCorrect && (
                    <span className="text-[9px] text-emerald-600 font-black flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Correct
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allCorrect && (
          <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl text-center flex items-center gap-2 mt-2 w-full justify-center">
            <Trophy className="w-6 h-6 text-amber-500 animate-bounce" />
            <span className="font-black text-emerald-800 text-xs">
              Well done! You completed spelling all words beautifully! 🎉 +40 extra points.
            </span>
          </div>
        )}
      </div>
    );
  };

  // Helper for actual Cursive Letter-Joining handwriting game
  const renderCursiveJoinPractice = (
    letter: string,
    combinations: string[],
    arabicMeaning: string,
    emoji: string
  ) => {
    const allFinished = combinations.every(comb => (userInputAnswers[`cursive-${comb}`] || "").trim().toLowerCase() === comb.toLowerCase());

    return (
      <div className="flex flex-col gap-6 p-5 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 rounded-3xl border border-indigo-100/50 items-center w-full">
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="text-4xl select-none">{emoji}</span>
            <div className="text-left">
              <h5 className="text-sm font-black text-indigo-950 uppercase">Cursive Handwriting Practice</h5>
              <p className="text-xs text-slate-500 font-bold mt-0.5">Learn to join letter <span className="text-indigo-600 font-black">"{letter.toUpperCase()}"</span></p>
            </div>
          </div>
          <button 
            onClick={() => speakText(`cursive join practice for letter ${letter}`)}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-indigo-600 cursor-pointer shadow-xs"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {combinations.map((comb) => {
            const typed = (userInputAnswers[`cursive-${comb}`] || "").trim().toLowerCase();
            const isCorrect = typed === comb.toLowerCase();

            return (
              <div key={comb} className={`bg-white p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                isCorrect ? "bg-emerald-50/40 border-emerald-300" : "border-slate-200 shadow-sm"
              }`}>
                {/* Calligraphy Model Box */}
                <div className="h-16 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                  <span className="font-serif italic text-3xl font-bold tracking-widest text-slate-300 select-none absolute">
                    {comb}
                  </span>
                  <span className="font-serif italic text-3xl font-black tracking-widest text-indigo-950 select-none animate-pulse">
                    {comb}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 items-center w-full">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Type joined letter:</label>
                  <input
                    type="text"
                    placeholder={comb}
                    disabled={isCorrect}
                    value={userInputAnswers[`cursive-${comb}`] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUserInputAnswers(prev => ({ ...prev, [`cursive-${comb}`]: val }));
                      if (val.trim().toLowerCase() === comb.toLowerCase()) {
                        addPoints(15);
                        playSuccessSound();
                        setFeedback({ isCorrect: true, text: "Great! Correct cursive writing." });
                      } else if (val) {
                        setFeedback({ isCorrect: false, text: "Write the letters accurately to match the model!" });
                      }
                    }}
                    className={`w-full max-w-[120px] px-3 py-2 text-center font-serif italic text-lg font-black rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
                      isCorrect 
                        ? "bg-emerald-100 border-emerald-400 text-emerald-800" 
                        : "bg-slate-50 border-slate-300 text-slate-700"
                    }`}
                  />
                  {isCorrect && (
                    <span className="text-[9px] text-emerald-600 font-black">Matched ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allFinished && (
          <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3.5 rounded-xl border border-emerald-200 flex items-center gap-2 justify-center w-full">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Excellent! You have mastered cursive writing successfully! +30 points.</span>
          </div>
        )}
      </div>
    );
  };

  // Helper for read and number matching games
  const renderReadAndNumber = (words: { id: string; word: string; ar: string; img: string }[]) => {
    return (
      <div className="flex flex-col gap-6">
        <p className="text-sm text-indigo-950 font-bold text-center bg-indigo-50/50 py-2 px-4 rounded-xl border border-indigo-100/40">
          Match the word with the shape
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {words.map((w, idx) => {
            const isMatched = matchedPairs.includes(w.id);
            const isSelectedWord = matchingSelections.wordId === w.id;

            return (
              <button
                key={`word-${w.id}`}
                disabled={isMatched}
                onClick={() => {
                  const currentPicId = matchingSelections.picId;
                  if (currentPicId) {
                    checkMatch(w.id, currentPicId);
                    setMatchingSelections({ wordId: null, picId: null });
                  } else {
                    setMatchingSelections(prev => ({ ...prev, wordId: w.id }));
                  }
                  speakText(w.word, "Kore");
                }}
                className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center gap-2 transition-all text-center cursor-pointer ${
                  isMatched
                    ? "bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60"
                    : isSelectedWord
                      ? "bg-sky-100 border-sky-400 text-sky-950 scale-102 ring-2 ring-sky-300"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <span className="text-xs font-black uppercase tracking-wider">{w.word}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          {/* Shuffled/Re-ordered list of pictures */}
          {[...words].reverse().map((w, idx) => {
            const isMatched = matchedPairs.includes(w.id);
            const isSelectedPic = matchingSelections.picId === w.id;

            return (
              <button
                key={`pic-${w.id}`}
                disabled={isMatched}
                onClick={() => {
                  const currentWordId = matchingSelections.wordId;
                  if (currentWordId) {
                    checkMatch(currentWordId, w.id);
                    setMatchingSelections({ wordId: null, picId: null });
                  } else {
                    setMatchingSelections(prev => ({ ...prev, picId: w.id }));
                  }
                  speakText(w.word);
                }}
                className={`p-5 rounded-3xl border-b-6 border-r-6 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                  isMatched
                    ? "bg-emerald-100 border-emerald-400 text-emerald-950 opacity-60"
                    : isSelectedPic
                      ? "bg-amber-100 border-amber-400 text-amber-950 scale-102 ring-2 ring-amber-300"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-300"
                }`}
              >
                {w.img === "board" ? (
                  <div className="w-16 h-10 bg-emerald-800 border-2 border-amber-800 rounded-sm shadow-xs flex items-center justify-center relative my-1">
                    <span className="text-[10px] font-mono font-bold text-white/90">ABC</span>
                  </div>
                ) : (
                  <span className="text-5xl">{w.img}</span>
                )}
                {isMatched && (
                  <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase">
                    Matched ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {matchedPairs.length === words.length && (
          <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-3xl text-center flex flex-col items-center gap-2 mt-4">
            <Trophy className="w-12 h-12 text-amber-500 animate-bounce" />
            <p className="font-black text-emerald-800 text-sm">
              Great! You have matched all the words perfectly! 🎉
            </p>
            <p className="text-xs font-bold text-emerald-600">+50 Points Added</p>
          </div>
        )}
      </div>
    );
  };

  const checkMatch = (wId: string, pId: string) => {
    if (wId === pId) {
      setMatchedPairs(prev => [...prev, wId]);
      addPoints(10);
      setFeedback({ isCorrect: true, text: "Great! Correct match." });
      speakText("Correct!", "Zephyr");
    } else {
      setFeedback({ isCorrect: false, text: "Try again! The word does not match." });
      speakText("Incorrect, try again.", "Zephyr");
    }
  };

  const handleSudanFlagColor = (section: "top" | "middle" | "bottom" | "triangle", color?: string) => {
    const colorToApply = color || activePaintColor;
    setFlagColors(prev => ({ ...prev, [section]: colorToApply }));
    speakText(`Painted ${section} stripe ${colorToApply}`);
  };

  const verifySudanFlag = () => {
    const isCorrect = 
      flagColors.top === "red" &&
      flagColors.middle === "white" &&
      flagColors.bottom === "black" &&
      flagColors.triangle === "green";

    if (isCorrect) {
      setFeedback({ isCorrect: true, text: "Congratulations! You have painted the Sudanese flag in its correct and beautiful colors! 🇸🇩" });
      addPoints(50);
      playSuccessSound();
    } else {
      setFeedback({ isCorrect: false, text: "Try again! The Sudanese flag colors are: red on top, white in the middle, black at the bottom, and a green triangle on the left." });
    }
  };

  const handleBodyLabelSelect = (part: string) => {
    if (activeBodyLabel) {
      setBodyLabels(prev => ({ ...prev, [part]: activeBodyLabel }));
      speakText(activeBodyLabel);
      setActiveBodyLabel(null);
    }
  };

  const verifyBodyLabels = () => {
    const isCorrect =
      bodyLabels.head === "head" &&
      bodyLabels.eye === "eye" &&
      bodyLabels.ear === "ear" &&
      bodyLabels.nose === "nose" &&
      bodyLabels.mouth === "mouth" &&
      bodyLabels.hand === "hand" &&
      bodyLabels.leg === "leg" &&
      bodyLabels.feet === "feet";

    if (isCorrect) {
      setFeedback({ isCorrect: true, text: "Great! You have labeled all body parts correctly and perfectly! 👤" });
      addPoints(60);
      playSuccessSound();
    } else {
      setFeedback({ isCorrect: false, text: "There are some incorrect labels, click on the label buttons to review and fix them." });
    }
  };

  // Unscramble drag/click word helper
  const handleWordUnscrambleClick = (sentenceId: string, word: string) => {
    setUnscrambledAnswers(prev => {
      const current = prev[sentenceId];
      if (current.includes(word)) {
        // Remove it
        return { ...prev, [sentenceId]: current.filter(w => w !== word) };
      } else {
        // Add it
        return { ...prev, [sentenceId]: [...current, word] };
      }
    });
  };

  const verifyUnscramble = (sentenceId: string, correctStr: string) => {
    const userStr = unscrambledAnswers[sentenceId].join(" ");
    if (userStr === correctStr) {
      addPoints(20);
      setFeedback({ isCorrect: true, text: `Correct and excellent! ${correctStr}` });
      playSuccessSound();
    } else {
      setFeedback({ isCorrect: false, text: "The order is incorrect, click to try again." });
    }
  };

  const renderUnscrambler = () => {
    if (unscrambleSentences.length === 0) return null;
    return (
      <div className="flex flex-col gap-6">
        <p className="text-xs text-slate-500 font-bold text-center">
          Arrange the scrambled words in the correct order to build sentences:
        </p>
        {unscrambleSentences.map((sentence) => {
          const currentWords = unscrambledAnswers[sentence.id] || [];
          const isCorrect = currentWords.join(" ") === sentence.correct;
          return (
            <div key={sentence.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Sentence {sentence.ar ? `• ${sentence.ar}` : ""}
                </span>
                {isCorrect && <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full">Correct ✓</span>}
              </div>
              <div className="bg-white p-3.5 rounded-xl border min-h-[50px] flex flex-wrap gap-2 items-center">
                {currentWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic font-semibold">Click words...</span>
                ) : (
                  currentWords.map((word, idx) => (
                    <span key={idx} onClick={() => handleWordUnscrambleClick(sentence.id, word)} className="bg-indigo-100 text-indigo-950 font-black text-xs px-3 py-1.5 rounded-lg cursor-pointer">{word}</span>
                  ))
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {sentence.words.map((word) => {
                  const isUsed = currentWords.includes(word);
                  return (
                    <button key={word} disabled={isUsed} onClick={() => handleWordUnscrambleClick(sentence.id, word)} className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${isUsed ? "bg-slate-200 text-slate-400 border border-slate-100 cursor-not-allowed opacity-40" : "bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-xs"}`}>{word}</button>
                  );
                })}
              </div>
              <div className="flex gap-2 justify-end mt-1">
                <button onClick={() => setUnscrambledAnswers(prev => ({ ...prev, [sentence.id]: [] }))} className="px-3 py-1.5 rounded-lg text-[10px] font-bold border hover:bg-slate-50 cursor-pointer">Clear</button>
                <button onClick={() => verifyUnscramble(sentence.id, sentence.correct)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-1.5 rounded-lg text-[11px] cursor-pointer">Verify</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTickCross = (questions: { id: string; text: string; ar: string; correct: "tick" | "cross" }[]) => {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-xs text-slate-500 font-bold text-center">
          Read the sentences and select Tick (✓) if correct, or Cross (X) if incorrect!
        </p>
        <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
          {questions.map((q) => {
            const ans = userInputAnswers[q.id];
            const isCorrect = ans === q.correct;
            return (
              <div key={q.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-center gap-3 transition-all ${
                ans ? (isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300") : "bg-slate-50 border-slate-200"
              }`}>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-black text-indigo-950">{q.text}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{q.ar}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setUserInputAnswers(prev => ({ ...prev, [q.id]: "tick" }));
                      if (q.correct === "tick") { addPoints(10); speakText("Correct!"); } else { speakText("No, try again!"); }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer ${ans === "tick" ? "bg-emerald-500 text-white shadow-xs" : "bg-white border text-emerald-600 hover:bg-emerald-50"}`}
                  >
                    ✓ True
                  </button>
                  <button
                    onClick={() => {
                      setUserInputAnswers(prev => ({ ...prev, [q.id]: "cross" }));
                      if (q.correct === "cross") { addPoints(10); speakText("Correct!"); } else { speakText("No, try again!"); }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer ${ans === "cross" ? "bg-rose-500 text-white shadow-xs" : "bg-white border text-rose-600 hover:bg-rose-50"}`}
                  >
                    ✗ False
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMultiChoice = (questions: { id: string; text: string; ar: string; correct: string; choices: string[]; emoji?: string }[]) => {
    return (
      <div className="flex flex-col gap-5 items-center">
        <p className="text-xs text-slate-500 font-bold text-center">
          Choose the correct answer to complete each exercise!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {questions.map((item) => {
            const ans = userInputAnswers[item.id];
            const isCorrect = ans === item.correct;
            return (
              <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
              }`}>
                {item.emoji && <span className="text-3xl">{item.emoji}</span>}
                <p className="text-xs font-black text-indigo-950 text-center leading-tight">{item.text}</p>
                <span className="text-[10px] text-slate-400 font-bold">{item.ar}</span>
                <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
                  {item.choices.map((choice) => (
                    <button
                      key={choice}
                      disabled={isCorrect}
                      onClick={() => {
                        setUserInputAnswers(prev => ({ ...prev, [item.id]: choice }));
                        if (choice === item.correct) { addPoints(10); speakText(`Correct!`); } else { speakText(`No, try again!`); }
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                        ans === choice
                          ? isCorrect ? "bg-emerald-400 border-emerald-600 text-white" : "bg-rose-400 border-rose-600 text-white"
                          : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getActivityTitle = (unit: number, act: number): string => {
    const titles: Record<number, string[]> = {
      1: [
        "Activity 1 (Lesson 1): Trace the Lines",
        "Activity 2 (Lesson 2): Write numbers 1 to 10",
        "Activity 3 (Lesson 3): Write letters A and a",
        "Activity 4 (Lesson 4): Write letters B and b",
        "Activity 5 (Lesson 5): Write letters C & D",
        "Activity 6 (Lesson 6): Alphabet Letters Review",
        "Activity 7 (Lesson 7): Interactive Matching Game",
        "Activity 8 (Lesson 8): Match the Word with the Image"
      ],
      2: [
        "Activity 1 (Lesson 1): Write E and e",
        "Activity 2 (Lesson 2): Match the Word with the Image",
        "Activity 3 (Lesson 3): Write F and f",
        "Activity 4 (Lesson 4): Say, Spell and Write",
        "Activity 5 (Lesson 5): Write G and g",
        "Activity 6 (Lesson 6): Match the Word with the Image",
        "Activity 7 (Lesson 7): Write H and h",
        "Activity 8 (Lesson 8): Word Spelling challenge"
      ],
      3: [
        "Activity 1 (Lesson 1): Write L and l",
        "Activity 2 (Lesson 2): Match the Word with the Image",
        "Activity 3 (Lesson 3): Write M and m",
        "Activity 4 (Lesson 4): Colours Spelling",
        "Activity 5 (Lesson 5): Paint Sudanese Flag",
        "Activity 6 (Lesson 6): Write N and n",
        "Activity 7 (Lesson 7): Traffic Lights",
        "Activity 8 (Lesson 8): Hair and Clothes Match"
      ],
      4: [
        "Activity 1 (Lesson 1): Write S and s",
        "Activity 2 (Lesson 2): Match the Word with the Image",
        "Activity 3 (Lesson 3): Write T & U",
        "Activity 4 (Lesson 4): Body Parts Labeling",
        "Activity 5 (Lesson 5): Write V and v",
        "Activity 6 (Lesson 6): Counting Body Parts",
        "Activity 7 (Lesson 7): Match the Clothes",
        "Activity 8 (Lesson 8): Fun Animals Match"
      ],
      5: [
        "Activity 1 (Lesson 1): Write and Join Letters",
        "Activity 2 (Lesson 2): Match the Word with the Image",
        "Activity 3 (Lesson 3): Sentence Unscramble",
        "Activity 4 (Lesson 4): Write X and x",
        "Activity 5 (Lesson 5): Classroom Hunt",
        "Activity 6 (Lesson 6): Write Y and y",
        "Activity 7 (Lesson 7): Preposition Fun",
        "Activity 8 (Lesson 8): Write Z and z"
      ],
      6: [
        "Activity 1 (Lesson 1): Trace & Join 'i' (Wordsearch)",
        "Activity 2 (Lesson 2): Match Town Places",
        "Activity 3 (Lesson 3): Sentence Unscramble",
        "Activity 4 (Lesson 4): Join 'l' (Pronunciation)",
        "Activity 5 (Lesson 5): Sentence Unscramble",
        "Activity 6 (Lesson 6): Read and check (✓) or cross (X)",
        "Activity 7 (Lesson 7): Say, Spell and Write",
        "Activity 8 (Lesson 8): Match words with images"
      ],
      7: [
        "Activity 1 (Lesson 1): Trace & Join 'q' (Unscramble)",
        "Activity 2 (Lesson 2): Match Family Words",
        "Activity 3 (Lesson 3): Match Extended Family",
        "Activity 4 (Lesson 4): Join 't' (Pronunciation)",
        "Activity 5 (Lesson 5): Sentence Unscramble",
        "Activity 6 (Lesson 6): Read and check (✓) or cross (X)",
        "Activity 7 (Lesson 7): Read and draw times",
        "Activity 8 (Lesson 8): Draw family in rooms"
      ],
      8: [
        "Activity 1 (Lesson 1): Join 'y' & Listen/Write",
        "Activity 2 (Lesson 2): Join 'z' & Match/Draw",
        "Activity 3 (Lesson 3): Sentence Writing & Questions",
        "Activity 4 (Lesson 4): Math Equations Addition",
        "Activity 5 (Lesson 5): Sentence Unscramble",
        "Activity 6 (Lesson 6): Read and check (✓) or cross (X)",
        "Activity 7 (Lesson 7): Read and draw wheels count",
        "Activity 8 (Lesson 8): Read and match commands"
      ],
      9: [
        "Activity 1 (Lesson 1): Trace & Write letters",
        "Activity 2 (Lesson 2): Nile Crocodile Facts",
        "Activity 3 (Lesson 3): Match Animal Emojis",
        "Activity 4 (Lesson 4): Read and Match Actions",
        "Activity 5 (Lesson 5): Write can/can't sentences",
        "Activity 6 (Lesson 6): Gapped Word Spellings",
        "Activity 7 (Lesson 7): Habitats Drag and Drop",
        "Activity 8 (Lesson 8): Read and check (✓) or cross (X)"
      ],
      10: [
        "Activity 1 (Lesson 1): Write there is/there are",
        "Activity 2 (Lesson 2): Listen and Match Baskets",
        "Activity 3 (Lesson 3): Listen and Write food",
        "Activity 4 (Lesson 4): Order Juice Making Steps",
        "Activity 5 (Lesson 5): Senses Check (✓) or Cross (X)",
        "Activity 6 (Lesson 6): Complete Food Spellings",
        "Activity 7 (Lesson 7): Sentence Unscramble",
        "Activity 8 (Lesson 8): Peanuts and Tomatoes matching"
      ],
      11: [
        "Activity 1 (Lesson 1): Tracing & Direction Match",
        "Activity 2 (Lesson 2): Write 'we can' sentences",
        "Activity 3 (Lesson 3): Read, draw and write",
        "Activity 4 (Lesson 4): Read and match rules",
        "Activity 5 (Lesson 5): Rubbish Sorting recycling",
        "Activity 6 (Lesson 6): Gapped spellings",
        "Activity 7 (Lesson 7): Lots of and No grammar",
        "Activity 8 (Lesson 8): Look and write animal count"
      ],
      12: [
        "Activity 1 (Lesson 1): Tracing & Eid Clothes colour",
        "Activity 2 (Lesson 2): Whose bag is this?",
        "Activity 3 (Lesson 3): Read, write and draw clothes",
        "Activity 4 (Lesson 4): Listen and write Eid food",
        "Activity 5 (Lesson 5): Dress-up puzzle Badr & Dalia",
        "Activity 6 (Lesson 6): Baking Steps Check (✓) or Cross (X)",
        "Activity 7 (Lesson 7): Read, Match and Number family",
        "Activity 8 (Lesson 8): Polite Expressions Writing"
      ]
    };
    return titles[unit]?.[act] || `Activity ${act + 1}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Horizontal Compact Activities Numbers Bar */}
      <div className="bg-amber-50 rounded-[28px] p-2 border border-amber-100 flex flex-col gap-2 shadow-xs">
        <div className="flex justify-between items-center px-3 pt-1">
          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
            Unit {unitId} Practice Activities
          </span>
          <span className="text-[10px] font-black bg-amber-200/60 text-amber-900 px-2.5 py-0.5 rounded-full">
            Page {(unitId - 1) * 8 + activeActivity + 1}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {Array.from({ length: 8 }).map((_, idx) => {
            const num = idx + 1;
            const isSelected = activeActivity === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveActivity(idx);
                  resetActivityStates();
                }}
                className={`py-1.5 px-1 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all border-b-4 text-center cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? "bg-amber-400 border-amber-600 text-white shadow-md transform -translate-y-0.5"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                <span>Act {num}</span>
                <span className={`text-[9px] font-extrabold block ${isSelected ? "text-amber-100" : "text-slate-400"}`}>(L{num})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Activity Interactive Card View */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border-2 border-dashed border-amber-300 flex flex-col gap-6 min-h-[380px] relative overflow-hidden">
        
        {/* Title Block with dynamic description */}
        <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest block mb-0.5">
              Activity {activeActivity + 1} (Lesson {activeActivity + 1})
            </span>
            <h4 className="text-md sm:text-lg font-black text-indigo-950 uppercase leading-snug">
              {getActivityTitle(unitId, activeActivity)}
            </h4>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-[10px] font-black bg-amber-100 text-amber-850 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span>📊 Linked to Lesson {activeActivity + 1}</span>
              </span>
              <span className="text-[10px] font-black bg-indigo-50 text-indigo-855 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span>📖 Workbook Page {(unitId - 1) * 8 + activeActivity + 1}</span>
              </span>
            </div>
          </div>
          <button
            onClick={resetActivityStates}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl cursor-pointer hover:rotate-180 transition-transform duration-350"
            title="Reset Exercise"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK POPUP MESSAGE */}
        {feedback.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl font-black text-xs text-center border-b-4 ${
              feedback.isCorrect
                ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                : "bg-rose-50 border-rose-400 text-rose-800"
            }`}
          >
            {feedback.isCorrect ? "🌟 " : "⚠️ "} {feedback.text}
          </motion.div>
        )}

        {/* RENDER DYNAMIC ACTIVITY VIEWS FOR UNIT 1: HELLO! */}
        {unitId === 1 && (
          <div className="w-full">
            {/* Activity 1: Trace the Lines (Page 41) */}
            {activeActivity === 0 && (
              <div className="flex flex-col gap-6">
                <style>{`
                  input[type="range"].custom-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    height: 56px;
                  }
                  input[type="range"].custom-slider:focus {
                    outline: none;
                  }
                  input[type="range"].custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #f59e0b;
                    border: 3px solid #ffffff;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                    cursor: grab;
                    transition: background-color 0.2s ease, transform 0.1s ease;
                  }
                  input[type="range"].custom-slider:active::-webkit-slider-thumb {
                    cursor: grabbing;
                    transform: scale(1.15);
                  }
                  input[type="range"].custom-slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #f59e0b;
                    border: 3px solid #ffffff;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                    cursor: grab;
                    transition: background-color 0.2s ease, transform 0.1s ease;
                  }
                  input[type="range"].custom-slider:active::-moz-range-thumb {
                    cursor: grabbing;
                    transform: scale(1.15);
                  }
                  input[type="range"].custom-slider-done::-webkit-slider-thumb {
                    background: #10b981 !important;
                    cursor: default;
                  }
                  input[type="range"].custom-slider-done::-moz-range-thumb {
                    background: #10b981 !important;
                    cursor: default;
                  }
                `}</style>

                <p className="text-xs text-slate-500 font-bold leading-relaxed text-center">
                  Move the sliders from left to right to help Badr and Ahmed reach their goals and trace the lines successfully! 🌊
                </p>

                {["line-1", "line-2", "line-3"].map((lineId, idx) => {
                  const lineNames = ["Wave Line 🌊", "Zigzag Line ⚡", "Straight Line 📏"];
                  const icons = ["👋", "🎒", "👦"];
                  const isDone = completedTracks[lineId];

                  // Beautiful SVG path definitions for Wave, Zigzag, and Straight lines
                  const pathDs = [
                    "M 0 30 C 25 5, 50 55, 75 30 C 100 5, 125 55, 150 30 C 175 5, 200 55, 225 30 C 250 5, 275 55, 300 30",
                    "M 0 30 L 15 5 L 45 55 L 75 5 L 105 55 L 135 5 L 165 55 L 195 5 L 225 55 L 255 5 L 285 55 L 300 30",
                    "M 0 30 L 300 30"
                  ];

                  return (
                    <div key={lineId} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                      <div className="flex justify-between text-xs font-black text-indigo-950">
                        <span>{lineNames[idx]}</span>
                        <span className={isDone ? "text-emerald-600 font-black animate-pulse" : "text-slate-400"}>
                          {isDone ? "Completed! ✓" : `${sliderVal[lineId]}%`}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-2xl select-none w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-xs border border-slate-100 transform hover:scale-110 transition-transform">
                          {icons[idx]}
                        </div>

                        <div className="flex-1 h-14 relative flex items-center bg-slate-100/50 rounded-2xl px-2 border border-slate-200/30 overflow-hidden">
                          <svg className="absolute inset-x-2 h-12 w-[calc(100%-16px)]" viewBox="0 0 300 60" preserveAspectRatio="none">
                            <defs>
                              <clipPath id={`clip-${lineId}`}>
                                <rect x="0" y="0" width={(sliderVal[lineId] / 100) * 300} height="60" />
                              </clipPath>
                            </defs>
                            
                            <path 
                              d={pathDs[idx]} 
                              fill="none" 
                              stroke="#cbd5e1" 
                              strokeWidth="4" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            
                            <path 
                              d={pathDs[idx]} 
                              fill="none" 
                              stroke={isDone ? "#10b981" : "#f59e0b"} 
                              strokeWidth="5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              clipPath={`url(#clip-${lineId})`} 
                            />
                          </svg>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderVal[lineId]}
                            disabled={isDone}
                            onChange={(e) => handleLineTrace(lineId, parseInt(e.target.value))}
                            className={`absolute inset-x-2 w-[calc(100%-16px)] h-14 appearance-none bg-transparent cursor-grab active:cursor-grabbing custom-slider ${
                              isDone ? "custom-slider-done" : ""
                            }`}
                          />
                        </div>

                        <div className={`text-2xl select-none w-10 h-10 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                          isDone 
                            ? "bg-emerald-100 border-emerald-400 scale-110 rotate-12 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-400"
                        }`}>
                          {isDone ? "🎉" : "🎯"}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {Object.keys(completedTracks).length === 3 && (
                  <div className="bg-emerald-50 text-emerald-800 font-bold p-4 rounded-2xl text-center border border-emerald-200 shadow-xs animate-bounce mt-2">
                    🎉 Well done! You have traced all wave, zigzag, and straight lines excellently! Congratulations on the extra points.
                  </div>
                )}
              </div>
            )}

            {/* Activity 2: Trace the lines - Waves, Loops, Spirals (Page 42) */}
            {activeActivity === 1 && (
              <div className="flex flex-col gap-6">
                <style>{`
                  input[type="range"].custom-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    height: 56px;
                  }
                  input[type="range"].custom-slider:focus {
                    outline: none;
                  }
                  input[type="range"].custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #6366f1;
                    border: 3px solid #ffffff;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    cursor: grab;
                  }
                  input[type="range"].custom-slider-done::-webkit-slider-thumb {
                    background: #10b981 !important;
                    cursor: default;
                  }
                `}</style>

                <p className="text-xs text-slate-500 font-bold leading-relaxed text-center">
                  Circular and spiral lines challenge! Trace the lines to help the bee and the butterfly! 🐝🦋
                </p>

                {["line-loop-1", "line-loop-2"].map((lineId, idx) => {
                  const lineNames = ["Loop Curls ➰", "Spiral Coils 🌀"];
                  const icons = ["🐝", "🦋"];
                  const isDone = completedTracks[lineId];

                  const pathDs = [
                    "M 0 30 C 20 0, 40 0, 50 30 C 60 60, 80 60, 100 30 C 120 0, 140 0, 150 30 C 160 60, 180 60, 200 30 C 220 0, 240 0, 250 30 C 260 60, 280 60, 300 30",
                    "M 0 30 C 15 10, 30 50, 45 30 C 60 10, 75 50, 90 30 C 105 10, 120 50, 135 30 C 150 10, 165 50, 180 30 C 195 10, 210 50, 225 30 C 240 10, 255 50, 300 30"
                  ];

                  return (
                    <div key={lineId} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3">
                      <div className="flex justify-between text-xs font-black text-indigo-950">
                        <span>{lineNames[idx]}</span>
                        <span className={isDone ? "text-emerald-600 font-black" : "text-slate-400"}>
                          {isDone ? "Completed! ✓" : `${sliderVal[lineId] || 0}%`}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-2xl select-none w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-xs border border-slate-100 transform hover:scale-110 transition-transform">
                          {icons[idx]}
                        </div>

                        <div className="flex-1 h-14 relative flex items-center bg-slate-100/50 rounded-2xl px-2 border border-slate-200/30 overflow-hidden">
                          <svg className="absolute inset-x-2 h-12 w-[calc(100%-16px)]" viewBox="0 0 300 60" preserveAspectRatio="none">
                            <defs>
                              <clipPath id={`clip-${lineId}`}>
                                <rect x="0" y="0" width={((sliderVal[lineId] || 0) / 100) * 300} height="60" />
                              </clipPath>
                            </defs>
                            
                            <path 
                              d={pathDs[idx]} 
                              fill="none" 
                              stroke="#cbd5e1" 
                              strokeWidth="4" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            
                            <path 
                              d={pathDs[idx]} 
                              fill="none" 
                              stroke={isDone ? "#10b981" : "#6366f1"} 
                              strokeWidth="5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              clipPath={`url(#clip-${lineId})`} 
                            />
                          </svg>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderVal[lineId] || 0}
                            disabled={isDone}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setSliderVal(prev => ({ ...prev, [lineId]: val }));
                              if (val >= 100 && !completedTracks[lineId]) {
                                setCompletedTracks(prev => ({ ...prev, [lineId]: true }));
                                addPoints(15);
                                playSuccessSound();
                              }
                            }}
                            className={`absolute inset-x-2 w-[calc(100%-16px)] h-14 appearance-none bg-transparent cursor-grab active:cursor-grabbing custom-slider ${
                              isDone ? "custom-slider-done" : ""
                            }`}
                          />
                        </div>

                        <div className={`text-2xl select-none w-10 h-10 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                          isDone 
                            ? "bg-emerald-100 border-emerald-400 scale-110" 
                            : "bg-white border-slate-200 text-slate-400"
                        }`}>
                          {isDone ? "🎉" : "🎯"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Activity 3: Write numbers 1 to 10 (Page 43) */}
            {activeActivity === 2 && (
              <div className="flex flex-col gap-6 items-center w-full">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Write the numbers from 1 to 10 in the correct boxes to learn how to write them correctly! 🔢
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const id = `u1l3-num-${num}`;
                    const val = userInputAnswers[id] || "";
                    const isCorrect = parseInt(val) === num;

                    return (
                      <div key={num} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                        isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-2xl text-slate-400 select-none">
                          {num}
                        </div>
                        <button 
                          onClick={() => speakText(num.toString())}
                          className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          maxLength={num === 10 ? 2 : 1}
                          placeholder="?"
                          disabled={isCorrect}
                          value={val}
                          onChange={(e) => {
                            const inputVal = e.target.value.trim();
                            setUserInputAnswers(prev => ({ ...prev, [id]: inputVal }));
                            if (parseInt(inputVal) === num) {
                              addPoints(10);
                              playSuccessSound();
                              setFeedback({ isCorrect: true, text: `Well done! The number is ${num}.` });
                            } else if (inputVal) {
                              setFeedback({ isCorrect: false, text: "Try again!" });
                            }
                          }}
                          className={`w-10 h-10 text-center text-lg font-black rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
                            isCorrect 
                              ? "bg-emerald-100 border-emerald-400 text-emerald-850" 
                              : "bg-white border-slate-300 text-slate-700"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity 4: Write A and a (Page 44) */}
            {activeActivity === 3 && renderLetterTracing("a", "Apple", "", "🍎")}

            {/* Activity 5: Write B and b (Page 45) */}
            {activeActivity === 4 && renderLetterTracing("b", "Bag", "", "🎒")}

            {/* Activity 6: Write C and c (Page 46) */}
            {activeActivity === 5 && renderLetterTracing("c", "Cap", "", "🧢")}

            {/* Activity 7: Write D and d (Page 47) */}
            {activeActivity === 6 && renderLetterTracing("d", "Desk", "", "✍️")}

            {/* Activity 8: Letters Review & Read and number (Page 48) */}
            {activeActivity === 7 && (
              <div className="flex flex-col gap-8 w-full">
                {/* Part A: Capital / Lowercase Letter Writing Review */}
                <div className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                    <h5 className="font-black text-xs uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                      <span>Part A: Capital to Small Match</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-bold">Complete lowercase letters</span>
                    </h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["A", "B", "C", "D"].map((cap) => {
                      const low = cap.toLowerCase();
                      const id = `u1l8-match-${cap}`;
                      const val = userInputAnswers[id] || "";
                      const isCorrect = val.trim().toLowerCase() === low;

                      return (
                        <div key={cap} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                          isCorrect ? "bg-emerald-50/50 border-emerald-300" : "bg-slate-50 border-slate-200"
                        }`}>
                          <div className="w-10 h-10 bg-white border rounded-xl flex items-center justify-center font-black text-lg text-indigo-950 select-none">
                            {cap}
                          </div>
                          <input
                            type="text"
                            maxLength={1}
                            placeholder="?"
                            disabled={isCorrect}
                            value={val}
                            onChange={(e) => {
                              const inputVal = e.target.value.trim().toLowerCase();
                              setUserInputAnswers(prev => ({ ...prev, [id]: inputVal }));
                              if (inputVal === low) {
                                addPoints(10);
                                playSuccessSound();
                              }
                            }}
                            className={`w-10 h-10 text-center font-black text-lg rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                              isCorrect ? "bg-emerald-100 border-emerald-400 text-emerald-800" : "bg-white border-slate-300"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Part B: Read and Number matching */}
                <div className="p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col gap-4">
                  <h5 className="font-black text-xs uppercase tracking-wider text-indigo-950 border-b pb-3 border-slate-100">
                    Part B: Read and number
                  </h5>
                  {renderReadAndNumberInteractive(
                    [
                      { num: 1, word: "bag", ar: "" },
                      { num: 2, word: "flag", ar: "" },
                      { num: 3, word: "egg", ar: "" },
                      { num: 4, word: "leg", ar: "" },
                      { num: 5, word: "bed", ar: "" }
                    ],
                    [
                      { id: "u1l8-egg", correctNum: 3, img: "🥚", ar: "" },
                      { id: "u1l8-flag", correctNum: 2, img: "🇸🇩", ar: "" },
                      { id: "u1l8-bed", correctNum: 5, img: "🛏️", ar: "" },
                      { id: "u1l8-bag", correctNum: 1, img: "🎒", ar: "" },
                      { id: "u1l8-leg", correctNum: 4, img: "🦵", ar: "" }
                    ]
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RENDER DYNAMIC ACTIVITY VIEWS FOR UNIT 2: NUMBERS */}
        {unitId === 2 && (
          <div className="w-full">
            {/* Activity 1 */}
            {activeActivity === 0 && renderLetterTracing("e", "Egg", "", "🥚")}

            {/* Activity 2 */}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un2-1", word: "sun", ar: "", img: "☀️" },
              { id: "un2-2", word: "man", ar: "", img: "👨" },
              { id: "un2-3", word: "van", ar: "", img: "🚐" },
              { id: "un2-4", word: "ten", ar: "", img: "🔟" }
            ])}

            {/* Activity 3 */}
            {activeActivity === 2 && renderLetterTracing("f", "Fan", "", "💨")}

            {/* Activity 4: Say, Spell & Write */}
            {activeActivity === 3 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Fill in the missing letter to form the English words correctly:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    { key: "sp1", hint: "b _ g", correct: "a", word: "bag", emoji: "🎒" },
                    { key: "sp2", hint: "h _ n", correct: "e", word: "hen", emoji: "🐔" },
                    { key: "sp3", hint: "f _ n", correct: "a", word: "fan", emoji: "💨" },
                    { key: "sp4", hint: "l _ g", correct: "e", word: "leg", emoji: "🦵" }
                  ].map((item) => (
                    <div key={item.key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-xs font-black text-slate-700">{item.hint}</span>
                      <input
                        type="text"
                        maxLength={1}
                        placeholder="_"
                        value={userInputAnswers[item.key] || ""}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase();
                          setUserInputAnswers(prev => ({ ...prev, [item.key]: val }));
                          if (val === item.correct) {
                            addPoints(15);
                            speakText(item.word);
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-black rounded-lg border border-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity 5 */}
            {activeActivity === 4 && renderLetterTracing("g", "Gate", "", "🚪")}

            {/* Activity 6 */}
            {activeActivity === 5 && renderReadAndNumber([
              { id: "un2-5", word: "pen", ar: "", img: "🖊️" },
              { id: "un2-6", word: "rabbit", ar: "", img: "🐇" },
              { id: "un2-7", word: "neck", ar: "", img: "🦒" },
              { id: "un2-8", word: "mosque", ar: "", img: "🕌" }
            ])}

            {/* Activity 7 */}
            {activeActivity === 6 && renderLetterTracing("h", "Hat", "", "👒")}

            {/* Activity 8 */}
            {activeActivity === 7 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Fill in the missing letter to form the English words:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    { key: "sp5", hint: "p _ n", correct: "e", word: "pen", emoji: "🖊️" },
                    { key: "sp6", hint: "c _ p", correct: "a", word: "cap", emoji: "🧢" },
                    { key: "sp7", hint: "f _ o g", correct: "r", word: "frog", emoji: "🐸" },
                    { key: "sp8", hint: "n _ c k", correct: "e", word: "neck", emoji: "🦒" }
                  ].map((item) => (
                    <div key={item.key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-xs font-black text-slate-700">{item.hint}</span>
                      <input
                        type="text"
                        maxLength={1}
                        placeholder="_"
                        value={userInputAnswers[item.key] || ""}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase();
                          setUserInputAnswers(prev => ({ ...prev, [item.key]: val }));
                          if (val === item.correct) {
                            addPoints(15);
                            speakText(item.word);
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-black rounded-lg border border-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RENDER DYNAMIC ACTIVITY VIEWS FOR UNIT 3: COLOURS */}
        {unitId === 3 && (
          <div className="w-full">
            {/* Activity 1 */}
            {activeActivity === 0 && renderLetterTracing("l", "Lamp", "", "💡")}

            {/* Activity 2 */}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un3-1", word: "blue", ar: "", img: "🔵" },
              { id: "un3-2", word: "green", ar: "", img: "🟢" },
              { id: "un3-3", word: "red", ar: "", img: "🔴" },
              { id: "un3-4", word: "white", ar: "", img: "⚪" }
            ])}

            {/* Activity 3 */}
            {activeActivity === 2 && renderLetterTracing("m", "Monkey", "", "🐒")}

            {/* Activity 4 */}
            {activeActivity === 3 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Spelling Challenge: What are the missing letters of the colors?
                </p>
                <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                  {[
                    { key: "un3sp1", hint: "r _ d", correct: "e", word: "red" },
                    { key: "un3sp2", hint: "b l _ e", correct: "u", word: "blue" },
                    { key: "un3sp3", hint: "g r e _ n", correct: "e", word: "green" }
                  ].map((item) => (
                    <div key={item.key} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center">
                      <span className="text-xs font-black mb-2">{item.hint}</span>
                      <input
                        type="text"
                        maxLength={1}
                        placeholder="?"
                        value={userInputAnswers[item.key] || ""}
                        onChange={(e) => {
                          const val = e.target.value.toLowerCase().trim();
                          setUserInputAnswers(prev => ({ ...prev, [item.key]: val }));
                          if (val === item.correct) {
                            addPoints(10);
                            speakText(item.word);
                          }
                        }}
                        className="w-10 h-10 text-center font-bold border rounded-lg bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity 5: Paint Sudanese Flag */}
            {activeActivity === 4 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Drag your favorite color and place it on the flag area to color it, or click the color and then click the area you want to paint! 🎨🇸🇩
                </p>

                {/* Color Palettes */}
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-[11px] font-black uppercase text-indigo-950 tracking-wider">
                    💡 Drag or Click to Select:
                  </span>
                  <div className="flex gap-3 justify-center">
                    {[
                      { name: "red", label: "Red 🔴", colorClass: "bg-red-500 text-white border border-red-600 shadow-xs" },
                      { name: "white", label: "White ⚪", colorClass: "bg-white text-slate-800 border border-slate-300 shadow-xs" },
                      { name: "black", label: "Black ⚫", colorClass: "bg-black text-white border border-slate-900 shadow-xs" },
                      { name: "green", label: "Green 🟢", colorClass: "bg-green-600 text-white border border-green-700 shadow-xs" }
                    ].map((color) => (
                      <button
                        key={color.name}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", color.name);
                          setActivePaintColor(color.name);
                        }}
                        onClick={() => setActivePaintColor(color.name)}
                        className={`px-4 py-2.5 rounded-full text-xs font-black transition-all cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 ${color.colorClass} ${
                          activePaintColor === color.name ? "ring-4 ring-sky-300 scale-105" : ""
                        }`}
                        title="Drag me!"
                      >
                        {color.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sudan Flag Wireframe */}
                <div className="w-full max-w-sm h-48 bg-slate-100 border-2 border-slate-300 rounded-xl relative overflow-hidden flex shadow-inner">
                  {/* Stripes container */}
                  <div className="flex-1 flex flex-col h-full pl-[70px]">
                    {/* Top stripe */}
                    <button
                      onClick={() => handleSudanFlagColor("top")}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => setDragOverZone("top")}
                      onDragLeave={() => setDragOverZone(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        const color = e.dataTransfer.getData("text/plain") || activePaintColor;
                        handleSudanFlagColor("top", color);
                        setDragOverZone(null);
                      }}
                      className={`w-full h-1/3 transition-all duration-300 border-b border-slate-100 cursor-pointer relative ${
                        dragOverZone === "top" ? "ring-4 ring-indigo-400 ring-inset z-10" : ""
                      }`}
                      style={{ backgroundColor: flagColors.top }}
                    >
                      {dragOverZone === "top" && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-950 pointer-events-none">
                          Drop here! ✨
                        </div>
                      )}
                    </button>

                    {/* Middle stripe */}
                    <button
                      onClick={() => handleSudanFlagColor("middle")}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => setDragOverZone("middle")}
                      onDragLeave={() => setDragOverZone(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        const color = e.dataTransfer.getData("text/plain") || activePaintColor;
                        handleSudanFlagColor("middle", color);
                        setDragOverZone(null);
                      }}
                      className={`w-full h-1/3 transition-all duration-300 border-b border-slate-100 cursor-pointer relative ${
                        dragOverZone === "middle" ? "ring-4 ring-indigo-400 ring-inset z-10" : ""
                      }`}
                      style={{ backgroundColor: flagColors.middle }}
                    >
                      {dragOverZone === "middle" && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-950 pointer-events-none">
                          Drop here! ✨
                        </div>
                      )}
                    </button>

                    {/* Bottom stripe */}
                    <button
                      onClick={() => handleSudanFlagColor("bottom")}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => setDragOverZone("bottom")}
                      onDragLeave={() => setDragOverZone(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        const color = e.dataTransfer.getData("text/plain") || activePaintColor;
                        handleSudanFlagColor("bottom", color);
                        setDragOverZone(null);
                      }}
                      className={`w-full h-1/3 transition-all duration-300 cursor-pointer relative ${
                        dragOverZone === "bottom" ? "ring-4 ring-indigo-400 ring-inset z-10" : ""
                      }`}
                      style={{ backgroundColor: flagColors.bottom }}
                    >
                      {dragOverZone === "bottom" && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-950 pointer-events-none">
                          Drop here! ✨
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Left triangle */}
                  <button
                    onClick={() => handleSudanFlagColor("triangle")}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setDragOverZone("triangle")}
                    onDragLeave={() => setDragOverZone(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      const color = e.dataTransfer.getData("text/plain") || activePaintColor;
                      handleSudanFlagColor("triangle", color);
                      setDragOverZone(null);
                    }}
                    className={`absolute left-0 top-0 bottom-0 w-[70px] cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      dragOverZone === "triangle" ? "scale-105 z-10 drop-shadow-md" : ""
                    }`}
                    style={{
                      backgroundColor: flagColors.triangle,
                      clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)"
                    }}
                  >
                    {dragOverZone === "triangle" && (
                      <div className="absolute left-1 text-[10px] font-black text-indigo-950 pointer-events-none bg-indigo-100/90 px-1 py-0.5 rounded shadow-xs animate-bounce">
                        Drop! ✨
                      </div>
                    )}
                  </button>
                </div>

                <button
                  onClick={verifySudanFlag}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-full border-b-4 border-emerald-700 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <Check className="w-5 h-5" />
                  <span>Check Flag</span>
                </button>
              </div>
            )}

            {/* Activity 6: Write N and n */}
            {activeActivity === 5 && renderLetterTracing("n", "Nose", "", "👃")}

            {/* Activity 7: Traffic Lights */}
            {activeActivity === 6 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Traffic Lights: Choose the correct color for each word! 🚦
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  {[
                    { id: "tl1", word: "STOP", ar: "", correct: "red", emoji: "🔴" },
                    { id: "tl2", word: "WAIT", ar: "", correct: "yellow", emoji: "🟡" },
                    { id: "tl3", word: "GO", ar: "", correct: "green", emoji: "🟢" }
                  ].map((item) => {
                    const selected = userInputAnswers[item.id];
                    const isCorrect = selected === item.correct;
                    return (
                      <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                        isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}>
                        {/* Realistic vertical traffic light container */}
                        <div className="w-14 py-3 px-2 bg-slate-800 rounded-2xl border border-slate-700 flex flex-col items-center gap-1.5 shadow-md">
                          {/* Red light */}
                          <div className={`w-5 h-5 rounded-full border border-black/40 transition-all ${
                            item.id === "tl1" ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)] scale-105" : "bg-red-950/70"
                          }`} />
                          {/* Yellow light */}
                          <div className={`w-5 h-5 rounded-full border border-black/40 transition-all ${
                            item.id === "tl2" ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] scale-105" : "bg-amber-950/70"
                          }`} />
                          {/* Green light */}
                          <div className={`w-5 h-5 rounded-full border border-black/40 transition-all ${
                            item.id === "tl3" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.9)] scale-105" : "bg-green-950/70"
                          }`} />
                        </div>

                        <span className="text-base font-black text-slate-800 uppercase tracking-wide">{item.word}</span>
                        <div className="flex gap-2">
                          {[
                            { color: "red", emoji: "🔴" },
                            { color: "yellow", emoji: "🟡" },
                            { color: "green", emoji: "🟢" }
                          ].map((choice) => (
                            <button
                              key={choice.color}
                              disabled={isCorrect}
                              onClick={() => {
                                setUserInputAnswers(prev => ({ ...prev, [item.id]: choice.color }));
                                if (choice.color === item.correct) {
                                  addPoints(10);
                                  speakText(`Correct! ${item.word} means ${choice.color}`);
                                } else {
                                  speakText(`Try again!`);
                                }
                              }}
                              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                                selected === choice.color
                                  ? isCorrect
                                    ? "bg-emerald-200 border-emerald-400 scale-105"
                                    : "bg-rose-200 border-rose-400"
                                  : "bg-white hover:bg-slate-100 border-slate-300"
                              }`}
                            >
                              <span className="text-xl">{choice.emoji}</span>
                            </button>
                          ))}
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-600 font-bold">Excellent! ✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity 8: Hair and Clothes Match */}
            {activeActivity === 7 && (
              <div className="flex flex-col gap-4">
                {renderReadAndNumber([
                  { id: "un3-5", word: "black hair", ar: "", img: "💇" },
                  { id: "un3-6", word: "brown t-shirt", ar: "", img: "👕" },
                  { id: "un3-7", word: "blue cap", ar: "", img: "🧢" },
                  { id: "un3-8", word: "white desk", ar: "", img: "🏫" }
                ])}
              </div>
            )}
          </div>
        )}

        {/* RENDER DYNAMIC ACTIVITY VIEWS FOR UNIT 4: ABOUT ME */}
        {unitId === 4 && (
          <div className="w-full">
            {/* Activity 1 */}
            {activeActivity === 0 && renderLetterTracing("s", "Sun", "", "☀️")}

            {/* Activity 2 */}
            {activeActivity === 1 && (
              <div className="flex flex-col gap-6 items-center w-full">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Read the following three descriptions, then write the correct number under each matching fruit:
                </p>

                {/* Descriptions list at the top */}
                <div className="w-full max-w-lg bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex flex-col gap-2.5 text-left font-sans">
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
                    <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-mono">1</span>
                    <span>a green melon 🍉</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
                    <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-mono">2</span>
                    <span>a red apple 🍎</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-950">
                    <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-mono">3</span>
                    <span>a yellow lemon 🍋</span>
                  </div>
                </div>

                {/* Fruit cards below */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mt-2">
                  {[
                    { id: "col2", label: "Apple", img: "🍎", correct: "2", text: "a red apple" },
                    { id: "col3", label: "Lemon", img: "🍋", correct: "3", text: "a yellow lemon" },
                    { id: "col1", label: "Melon", img: "🍉", correct: "1", text: "a green melon" }
                  ].map((item) => {
                    const isAnsweredCorrectly = userInputAnswers[item.id] === item.correct;
                    return (
                      <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                        isAnsweredCorrectly 
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-slate-50 border-slate-200"
                      }`}>
                        <span className="text-5xl animate-pulse">{item.img}</span>
                        <span className="text-xs font-black text-slate-700 text-center">{item.label}</span>
                        
                        <div className="flex flex-col gap-1.5 items-center w-full">
                          <input
                            type="text"
                            maxLength={1}
                            placeholder="#"
                            disabled={isAnsweredCorrectly}
                            value={userInputAnswers[item.id] || ""}
                            onChange={(e) => {
                              const val = e.target.value.trim();
                              setUserInputAnswers(prev => ({ ...prev, [item.id]: val }));
                              if (val === item.correct) {
                                addPoints(15);
                                speakText(`Correct! This is ${item.text}`);
                                setFeedback({ isCorrect: true, text: `Well done! The chosen number is correct and matches the description.` });
                              } else if (val) {
                                setFeedback({ isCorrect: false, text: "Incorrect number! Review the description list above." });
                              }
                            }}
                            className={`w-12 h-12 text-center text-xl font-black rounded-xl border transition-all ${
                              isAnsweredCorrectly
                                ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                                : "bg-white border-slate-300 focus:ring-2 focus:ring-indigo-400"
                            }`}
                          />
                          {isAnsweredCorrectly && (
                            <span className="text-[10px] text-emerald-600 font-bold">Correct ✓</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity 3 */}
            {activeActivity === 2 && (
              <div className="flex flex-col gap-10">
                {renderLetterTracing("t", "Ten", "", "🔟")}
                {renderLetterTracing("u", "Up", "", "⬆️")}
              </div>
            )}

            {/* Activity 4: Body Parts Labeling */}
            {activeActivity === 3 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Click on the word below, then click the button for the corresponding part of the body to place it! 👤
                </p>

                {/* Available Labels */}
                <div className="flex flex-wrap gap-2 justify-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {["head", "eye", "ear", "nose", "mouth", "hand", "leg", "feet"].map((label) => {
                    const isSelected = activeBodyLabel === label;
                    return (
                      <button
                        key={label}
                        onClick={() => {
                          setActiveBodyLabel(label);
                          speakText(label);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-black uppercase transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Body Drawing Representation */}
                <div className="w-full max-w-sm p-4 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex flex-col items-center gap-4 relative">
                  <span className="text-6xl animate-pulse">👦🏾</span>

                  {/* Positioning grids with inputs or labels */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { part: "head", labelAr: "Head 👤" },
                      { part: "eye", labelAr: "Eye 👁️" },
                      { part: "ear", labelAr: "Ear 👂" },
                      { part: "nose", labelAr: "Nose 👃" },
                      { part: "mouth", labelAr: "Mouth 👄" },
                      { part: "hand", labelAr: "Hand ✋" },
                      { part: "leg", labelAr: "Leg 🦵" },
                      { part: "feet", labelAr: "Feet 🦶" }
                    ].map((item) => (
                      <button
                        key={item.part}
                        onClick={() => handleBodyLabelSelect(item.part)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                          bodyLabels[item.part]
                            ? "bg-white border-indigo-400 text-indigo-950 font-black uppercase"
                            : "bg-white/40 hover:bg-white/80 border-dashed border-indigo-200 text-indigo-400 font-bold"
                        }`}
                      >
                        <span className="text-[10px] opacity-75">{item.labelAr}</span>
                        <span className="text-xs">{bodyLabels[item.part] || "[ Click to label ]"}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={verifyBodyLabels}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-full shadow-md flex items-center gap-2 cursor-pointer mt-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Check body parts</span>
                  </button>
                </div>
              </div>
            )}

            {/* Activities 5 to 8 for About Me */}
            {activeActivity === 4 && renderLetterTracing("v", "Van", "", "🚐")}

            {activeActivity === 5 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Count body parts: choose the correct number for each question! 🔢
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  {[
                    { id: "count1", question: "How many eyes?", ar: "", correct: "2", choices: ["1", "2", "10"] },
                    { id: "count2", question: "How many toes?", ar: "", correct: "10", choices: ["2", "5", "10"] },
                    { id: "count3", question: "How many noses?", ar: "", correct: "1", choices: ["1", "2", "5"] }
                  ].map((item) => {
                    const selected = userInputAnswers[item.id];
                    const isCorrect = selected === item.correct;
                    return (
                      <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                        isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}>
                        {/* Custom Drawing for counting questions */}
                        {item.id === "count1" && (
                          <div className="flex gap-2.5 items-center justify-center h-14 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100/50 my-1 animate-pulse">
                            <span className="text-3xl select-none">👁️</span>
                            <span className="text-3xl select-none">👁️</span>
                          </div>
                        )}
                        {item.id === "count2" && (
                          <div className="flex gap-2.5 items-center justify-center h-14 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100/50 my-1">
                            <span className="text-3xl select-none">🦶</span>
                            <span className="text-3xl select-none">🦶</span>
                          </div>
                        )}
                        {item.id === "count3" && (
                          <div className="flex gap-2.5 items-center justify-center h-14 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100/50 my-1">
                            <span className="text-3xl select-none">👃</span>
                          </div>
                        )}

                        <span className="text-base font-black text-slate-800">{item.question}</span>
                        <span className="text-[11px] text-slate-400 font-bold">{item.ar}</span>
                        <div className="flex gap-2">
                          {item.choices.map((choice) => (
                            <button
                              key={choice}
                              disabled={isCorrect}
                              onClick={() => {
                                setUserInputAnswers(prev => ({ ...prev, [item.id]: choice }));
                                if (choice === item.correct) {
                                  addPoints(10);
                                  speakText(`Correct! You have got ${choice}`);
                                } else {
                                  speakText(`Try again!`);
                                }
                              }}
                              className={`w-10 h-10 rounded-xl border font-black text-xs flex items-center justify-center transition-all cursor-pointer ${
                                selected === choice
                                  ? isCorrect
                                    ? "bg-emerald-200 border-emerald-400 scale-105"
                                    : "bg-rose-200 border-rose-400"
                                  : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700"
                              }`}
                            >
                              {choice}
                            </button>
                          ))}
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-600 font-bold">Great! ✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeActivity === 6 && renderLetterTracing("w", "Window", "", "🖼️")}

            {activeActivity === 7 && (
              <div className="flex flex-col gap-4">
                {renderReadAndNumber([
                  { id: "un4-7a", word: "hedgehog", ar: "", img: "🦔" },
                  { id: "un4-7b", word: "crocodile", ar: "", img: "🐊" },
                  { id: "un4-7c", word: "rabbit", ar: "", img: "🐰" },
                  { id: "un4-7d", word: "monkey", ar: "", img: "🐒" }
                ])}
              </div>
            )}
          </div>
        )}

        {/* RENDER DYNAMIC ACTIVITY VIEWS FOR UNIT 5: MY SCHOOL */}
        {unitId === 5 && (
          <div className="w-full">
            {/* Activity 1 */}
            {activeActivity === 0 && (
              <div className="flex flex-col gap-5 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Click on the letters to hear how to write and connect them in beautiful cursive style:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  {["a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => speakText(`Joined cursive writing helper for letter ${letter}`, "Zephyr")}
                      className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-black text-3xl text-indigo-600 transition-all flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <span>{letter}</span>
                      <span className="text-[10px] text-slate-400 font-bold italic font-sans leading-none">cursive guide</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Activity 2 */}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un5-1", word: "board", ar: "", img: "board" },
              { id: "un5-2", word: "chair", ar: "", img: "🪑" },
              { id: "un5-3", word: "teacher", ar: "", img: "👩‍🏫" },
              { id: "un5-4", word: "door", ar: "", img: "🚪" }
            ])}

            {/* Activity 3: Sentence Unscramble builder */}
            {activeActivity === 2 && (
              <div className="flex flex-col gap-6">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Arrange the scrambled words in the correct order to build meaningful sentences:
                </p>

                {unscrambleSentences.map((sentence) => {
                  const currentWords = unscrambledAnswers[sentence.id];
                  const isCorrect = currentWords.join(" ") === sentence.correct;

                  return (
                    <div key={sentence.id} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          Sentence {sentence.ar ? `• ${sentence.ar}` : ""}
                        </span>
                        {isCorrect && (
                          <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full">
                            Correct ✓
                          </span>
                        )}
                      </div>

                      {/* Display Current Construction */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 min-h-[50px] flex flex-wrap gap-2 items-center">
                        {currentWords.length === 0 ? (
                          <span className="text-xs text-slate-400 font-semibold italic">انقر على الكلمات بالترتيب لتركيب الجملة...</span>
                        ) : (
                          currentWords.map((word, idx) => (
                            <span
                              key={idx}
                              onClick={() => handleWordUnscrambleClick(sentence.id, word)}
                              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-black text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              {word}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Options Bank */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {sentence.words.map((word) => {
                          const isUsed = currentWords.includes(word);
                          return (
                            <button
                              key={word}
                              disabled={isUsed}
                              onClick={() => handleWordUnscrambleClick(sentence.id, word)}
                              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                isUsed
                                  ? "bg-slate-200 text-slate-400 border border-slate-100 cursor-not-allowed opacity-40"
                                  : "bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 shadow-xs"
                              }`}
                            >
                              {word}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-2 justify-end mt-1">
                        <button
                          onClick={() => {
                            setUnscrambledAnswers(prev => ({ ...prev, [sentence.id]: [] }));
                          }}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold border hover:bg-slate-50 cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => verifyUnscramble(sentence.id, sentence.correct)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-1.5 rounded-lg text-[11px] cursor-pointer"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Activity 4 */}
            {activeActivity === 3 && renderLetterTracing("x", "Box", "", "📦")}

            {/* Activity 5: Classroom Hunt */}
            {activeActivity === 4 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Classroom Hunt: Find the correct item! 🔍
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  {[
                    { id: "hunt1", target: "Teacher", ar: "", correct: "👩‍🏫", choices: ["👩‍🏫", "🪑", "🚪"] },
                    { id: "hunt2", target: "Desk", ar: "", correct: "desk", choices: ["desk", "🗑️", "💨"] },
                    { id: "hunt3", target: "Book", ar: "", correct: "📚", choices: ["📚", "📋", "👝"] }
                  ].map((item) => {
                    const selected = userInputAnswers[item.id];
                    const isCorrect = selected === item.correct;
                    return (
                      <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                        isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}>
                        <span className="text-base font-black text-indigo-600">{item.target}</span>
                        <span className="text-[11px] text-slate-400 font-bold">{item.ar}</span>
                        <div className="flex gap-2">
                          {item.choices.map((choice) => (
                            <button
                              key={choice}
                              disabled={isCorrect}
                              onClick={() => {
                                setUserInputAnswers(prev => ({ ...prev, [item.id]: choice }));
                                if (choice === item.correct) {
                                  addPoints(10);
                                  speakText(`Correct! This is the ${item.target}`);
                                } else {
                                  speakText(`No, try again!`);
                                }
                              }}
                              className={`w-12 h-12 rounded-xl border text-2xl flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                                selected === choice
                                  ? isCorrect
                                    ? "bg-emerald-200 border-emerald-400 scale-105"
                                    : "bg-rose-200 border-rose-400"
                                  : "bg-white hover:bg-slate-100 border-slate-300"
                              }`}
                            >
                              {choice === "desk" ? (
                                <div className="flex flex-col items-center justify-center relative w-8 h-8">
                                  {/* Desk top */}
                                  <div className="w-8 h-1.5 bg-amber-600 rounded-sm shadow-xs relative" />
                                  {/* Desk drawer body */}
                                  <div className="w-6 h-1.5 bg-amber-700 -mt-0.5" />
                                  {/* Desk legs */}
                                  <div className="flex justify-between w-6 px-1 h-3">
                                    <div className="w-0.5 h-full bg-amber-850 rounded-b-sm" />
                                    <div className="w-0.5 h-full bg-amber-850 rounded-b-sm" />
                                  </div>
                                </div>
                              ) : (
                                choice
                              )}
                            </button>
                          ))}
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-600 font-bold">Found it! ✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity 6 */}
            {activeActivity === 5 && renderLetterTracing("y", "Yellow", "", "🟡")}

            {/* Activity 7: Preposition Fun */}
            {activeActivity === 6 && (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-xs text-slate-500 font-bold text-center">
                  Where are the school items? Choose the correct preposition (in, on, under)! 🎒
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
                  {[
                    { id: "prep1", question: "The pencil is ____ the pencil case.", correct: "in", emoji: "👝", ar: "", choices: ["in", "on", "under"] },
                    { id: "prep2", question: "The book is ____ the desk.", correct: "on", emoji: "✍️", ar: "", choices: ["in", "on", "under"] },
                    { id: "prep3", question: "The ball is ____ the table.", correct: "under", emoji: "🪵", ar: "", choices: ["in", "on", "under"] }
                  ].map((item) => {
                    const selected = userInputAnswers[item.id];
                    const isCorrect = selected === item.correct;
                    return (
                      <div key={item.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 transition-all ${
                        isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}>
                        {/* Custom Drawing/Visual to match the preposition question */}
                        {item.id === "prep1" ? (
                          <div className="relative w-24 h-20 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl border border-indigo-100 flex items-center justify-center shadow-xs overflow-hidden">
                            {/* Pencil Case */}
                            <span className="text-4xl select-none z-10 transform translate-y-2">👝</span>
                            {/* Pencil inside */}
                            <span className="text-xl select-none absolute z-20 top-4 left-9 transform rotate-12 animate-pulse">✏️</span>
                          </div>
                        ) : item.id === "prep2" ? (
                          <div className="relative w-24 h-20 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center shadow-xs overflow-hidden">
                            {/* Book on top */}
                            <span className="text-2xl select-none z-20 transform translate-y-3 animate-bounce">📖</span>
                            {/* Wooden Board/Desk */}
                            <div className="w-12 h-1.5 bg-amber-600 rounded-sm z-10 transform translate-y-2" />
                            {/* Table legs */}
                            <div className="flex justify-between w-10 h-3 z-10 transform translate-y-2">
                              <div className="w-0.5 h-full bg-amber-850" />
                              <div className="w-0.5 h-full bg-amber-850" />
                            </div>
                          </div>
                        ) : item.id === "prep3" ? (
                          <div className="relative w-24 h-20 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center shadow-xs overflow-hidden">
                            {/* Wooden Board/Desk */}
                            <div className="w-12 h-1.5 bg-amber-600 rounded-sm z-10 transform translate-y-1" />
                            {/* Table legs */}
                            <div className="flex justify-between w-10 h-3 z-10 transform translate-y-1">
                              <div className="w-0.5 h-full bg-amber-850" />
                              <div className="w-0.5 h-full bg-amber-850" />
                            </div>
                            {/* Ball underneath */}
                            <span className="text-2xl select-none z-20 transform -translate-y-1.5 animate-pulse">⚽</span>
                          </div>
                        ) : (
                          <span className="text-4xl">{item.emoji}</span>
                        )}
                        <span className="text-xs font-black text-center text-slate-800 leading-tight min-h-[32px] flex items-center justify-center">{item.question}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{item.ar}</span>
                        <div className="flex gap-2">
                          {item.choices.map((choice) => (
                            <button
                              key={choice}
                              disabled={isCorrect}
                              onClick={() => {
                                setUserInputAnswers(prev => ({ ...prev, [item.id]: choice }));
                                if (choice === item.correct) {
                                  addPoints(10);
                                  speakText(`Correct! It is ${choice}`);
                                } else {
                                  speakText(`No, try again!`);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase transition-all cursor-pointer ${
                                selected === choice
                                  ? isCorrect
                                    ? "bg-emerald-200 border-emerald-400 text-emerald-800 scale-105"
                                    : "bg-rose-200 border-rose-400 text-rose-800"
                                  : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700"
                              }`}
                            >
                              {choice}
                            </button>
                          ))}
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-600 font-bold">Well done! ✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity 8 */}
            {activeActivity === 7 && renderLetterTracing("z", "Zoo", "", "🦁")}
          </div>
        )}

        {unitId === 6 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("i", "Ink", "", "✒️")}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs font-black text-indigo-900 mb-2">Can you find: KITCHEN, BEDROOM, FLAT?</p>
                  <div className="flex gap-2">
                    {["KITCHEN", "BEDROOM", "FLAT"].map(word => (
                      <button key={word} onClick={() => { speakText(word); addPoints(5); }} className="px-3 py-1 bg-white border rounded text-xs font-bold">{word}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un6-p1", word: "school", ar: "مدرسة", img: "🏫" },
              { id: "un6-p2", word: "mosque", ar: "مسجد", img: "🕌" },
              { id: "un6-p3", word: "hospital", ar: "مستشفى", img: "🏥" },
              { id: "un6-p4", word: "market", ar: "سوق", img: "🛍️" }
            ])}
            {activeActivity === 2 && renderUnscrambler()}
            {activeActivity === 3 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("l", "Lemon", "", "🍋")}
                <button onClick={() => { speakText("mosque school flat house"); addPoints(10); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2 rounded-xl">Hear Town Places 🗣️</button>
              </div>
            )}
            {activeActivity === 4 && renderUnscrambler()}
            {activeActivity === 5 && renderTickCross([
              { id: "u6q1", text: "Birds live in a tree.", correct: "tick", ar: "الطيور تعيش في الشجرة." },
              { id: "u6q2", text: "Frogs live in a well.", correct: "tick", ar: "الضفادع تعيش في البئر." },
              { id: "u6q3", text: "Camels have got a house.", correct: "cross", ar: "الجمال تمتلك بيتاً." }
            ])}
            {activeActivity === 6 && renderSaySpellWrite([
              { id: "u6w1", word: "house", placeholder: "h_use", missing: "o", emoji: "🏠", ar: "بيت" },
              { id: "u6w2", word: "flat", placeholder: "f_at", missing: "l", emoji: "🏢", ar: "شقة" }
            ])}
            {activeActivity === 7 && renderReadAndNumber([
              { id: "u6m1", word: "We pray here -> mosque", ar: "نصلي هنا", img: "🕌" },
              { id: "u6m2", word: "We study here -> school", ar: "ندرس هنا", img: "🏫" }
            ])}
          </div>
        )}

        {unitId === 7 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("q", "Queen", "", "👸")}
                {renderUnscrambler()}
              </div>
            )}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un7-f1", word: "mother", ar: "أمي", img: "👩🏾‍💼" },
              { id: "un7-f2", word: "father", ar: "أبي", img: "👨🏾‍💼" },
              { id: "un7-f3", word: "brother", ar: "أخي", img: "👦🏾" },
              { id: "un7-f4", word: "sister", ar: "أختي", img: "👧🏾" }
            ])}
            {activeActivity === 2 && renderReadAndNumber([
              { id: "un7-ef1", word: "grandmother", ar: "جدتي", img: "👵🏾" },
              { id: "un7-ef2", word: "grandfather", ar: "جدي", img: "👴🏾" },
              { id: "un7-ef3", word: "baby", ar: "طفل", img: "👶🏾" }
            ])}
            {activeActivity === 3 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("t", "Tree", "", "🌳")}
                <button onClick={() => { speakText("mother father grandfather grandmother"); addPoints(10); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2 rounded-xl">Hear Family Names 🗣️</button>
              </div>
            )}
            {activeActivity === 4 && renderUnscrambler()}
            {activeActivity === 5 && renderTickCross([
              { id: "u7q1", text: "Grandfather is tall.", correct: "tick", ar: "جدي طويل القامة." },
              { id: "u7q2", text: "The baby can walk and run.", correct: "cross", ar: "الرضيع يستطيع الجري." },
              { id: "u7q3", text: "Mother is in the kitchen.", correct: "tick", ar: "أمي في المطبخ." }
            ])}
            {activeActivity === 6 && renderMultiChoice([
              { id: "clock1", text: "six o'clock", correct: "6:00", choices: ["6:00", "7:00", "8:00"], ar: "السادسة تماماً", emoji: "⏰" },
              { id: "clock2", text: "seven o'clock", correct: "7:00", choices: ["6:00", "7:00", "8:00"], ar: "السابعة تماماً", emoji: "⏰" }
            ])}
            {activeActivity === 7 && renderMultiChoice([
              { id: "place1", text: "My mother is in the ____.", correct: "kitchen", choices: ["kitchen", "living room", "bedroom"], ar: "أمي في المطبخ", emoji: "👩🏾‍💼" },
              { id: "place2", text: "My father is in the ____.", correct: "living room", choices: ["kitchen", "living room", "bedroom"], ar: "أبي في الصالة", emoji: "👨🏾‍💼" }
            ])}
          </div>
        )}

        {unitId === 8 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("y", "Yellow", "", "🟡")}
                {renderSaySpellWrite([
                  { id: "u8w1", word: "game", placeholder: "g_me", missing: "a", emoji: "🎲", ar: "لعبة" },
                  { id: "u8w2", word: "toy", placeholder: "t_y", missing: "o", emoji: "🧸", ar: "لعبة أطفال" }
                ])}
              </div>
            )}
            {activeActivity === 1 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("z", "Zoo", "", "🦁")}
                {renderReadAndNumber([
                  { id: "u8cm1", word: "Stand up -> ⬆️", ar: "قف", img: "🧍‍♂️" },
                  { id: "u8cm2", word: "Sit down -> ⬇️", ar: "اجلس", img: "🧎‍♂️" }
                ])}
              </div>
            )}
            {activeActivity === 2 && renderMultiChoice([
              { id: "can1", text: "I can skip.", correct: "yes", choices: ["yes", "no"], ar: "أستطيع قفز الحبل", emoji: "🪢" },
              { id: "can2", text: "I can hop.", correct: "yes", choices: ["yes", "no"], ar: "أستطيع الحجل", emoji: "🦘" }
            ])}
            {activeActivity === 3 && renderMultiChoice([
              { id: "math1", text: "2 and 7 and 6 make...", correct: "15", choices: ["13", "14", "15"], ar: "٢ و ٧ و ٦", emoji: "🧮" },
              { id: "math2", text: "4 and 5 and 7 make...", correct: "16", choices: ["15", "16", "17"], ar: "٤ و ٥ و ٧", emoji: "🧮" }
            ])}
            {activeActivity === 4 && renderUnscrambler()}
            {activeActivity === 5 && renderTickCross([
              { id: "u8q1", text: "A car has got 4 wheels.", correct: "tick", ar: "السيارة لها ٤ عجلات." },
              { id: "u8q2", text: "A bicycle has got 3 wheels.", correct: "cross", ar: "الدراجة لها ٣ عجلات." }
            ])}
            {activeActivity === 6 && renderMultiChoice([
              { id: "wheel1", text: "A bus has got ____ wheels.", correct: "4", choices: ["2", "4", "6"], ar: "الحافلة لها ... عجلات", emoji: "🚌" },
              { id: "wheel2", text: "A bike has got ____ wheels.", correct: "2", choices: ["2", "3", "4"], ar: "الدراجة لها عجلتان", emoji: "🚲" }
            ])}
            {activeActivity === 7 && renderReadAndNumber([
              { id: "u8r1", word: "Don't go to the classroom.", ar: "لا تذهب للفصل", img: "🚫🏫" },
              { id: "u8r2", word: "Don't pick the flowers.", ar: "لا تقطف الزهور", img: "🚫🌸" }
            ])}
          </div>
        )}

        {unitId === 9 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("c", "Crocodile", "", "🐊")}
                {renderMultiChoice([
                  { id: "anini1", text: "Lion starts with...", correct: "l", choices: ["l", "e", "c"], ar: "الأسد يبدأ بحرف...", emoji: "🦁" },
                  { id: "anini2", text: "Elephant starts with...", correct: "e", choices: ["e", "c", "s"], ar: "الفيل يبدأ بحرف...", emoji: "🐘" }
                ])}
              </div>
            )}
            {activeActivity === 1 && renderMultiChoice([
              { id: "croc1", text: "Nile crocodiles have got a very long ____.", correct: "tail", choices: ["tail", "legs"], ar: "تماسيح النيل لها ذيل...", emoji: "🐊" },
              { id: "croc2", text: "They have got very short ____.", correct: "legs", choices: ["tail", "legs"], ar: "ولها أرجل قصيرة", emoji: "🐊" }
            ])}
            {activeActivity === 2 && renderReadAndNumber([
              { id: "un9-a1", word: "Hippo", ar: "فرس النهر", img: "🦛" },
              { id: "un9-a2", word: "Elephant", ar: "فيل", img: "🐘" }
            ])}
            {activeActivity === 3 && renderReadAndNumber([
              { id: "u9ac1", word: "Lions can walk", ar: "الأسود تمشي", img: "🦁" },
              { id: "u9ac2", word: "Parrots can fly", ar: "الببغاوات تطير", img: "🦜" }
            ])}
            {activeActivity === 4 && renderMultiChoice([
              { id: "cancant1", text: "Lions ____ fly.", correct: "can't", choices: ["can", "can't"], ar: "الأسود لا تطير", emoji: "🦁" },
              { id: "cancant2", text: "Birds ____ fly.", correct: "can", choices: ["can", "can't"], ar: "الطيور تطير", emoji: "🦜" }
            ])}
            {activeActivity === 5 && renderSaySpellWrite([
              { id: "u9sw1", word: "cow", placeholder: "c_w", missing: "o", emoji: "🐄", ar: "بقرة" },
              { id: "u9sw2", word: "goat", placeholder: "g_at", missing: "o", emoji: "🐐", ar: "ماعز" }
            ])}
            {activeActivity === 6 && renderMultiChoice([
              { id: "hab1", text: "Crocodiles live in the ____.", correct: "river", choices: ["river", "desert"], ar: "التماسيح تعيش في...", emoji: "🐊" },
              { id: "hab2", text: "Camels live in the ____.", correct: "desert", choices: ["river", "desert"], ar: "الجمال تعيش في...", emoji: "🐪" }
            ])}
            {activeActivity === 7 && renderTickCross([
              { id: "u9q1", text: "Hippos have got sharp teeth.", correct: "tick", ar: "أفراس النهر لها أسنان حادة." },
              { id: "u9q2", text: "Snakes can climb trees.", correct: "tick", ar: "الثعابين تتسلق الأشجار." }
            ])}
          </div>
        )}

        {unitId === 10 && (
          <div className="w-full">
            {activeActivity === 0 && renderMultiChoice([
              { id: "isare1", text: "____ a bottle of water.", correct: "There is", choices: ["There is", "There are"], ar: "زجاجة ماء", emoji: "🧴" },
              { id: "isare2", text: "____ some lemons.", correct: "There are", choices: ["There is", "There are"], ar: "بعض الليمون", emoji: "🍋" }
            ])}
            {activeActivity === 1 && renderReadAndNumber([
              { id: "un10-b1", word: "sugar -> sweet", ar: "سكر", img: "🍬" },
              { id: "un10-b2", word: "onion -> savory", ar: "بصل", img: "🧅" }
            ])}
            {activeActivity === 2 && renderSaySpellWrite([
              { id: "u10w1", word: "melon", placeholder: "m_lon", missing: "e", emoji: "🍉", ar: "بطيخ" },
              { id: "u10w2", word: "onion", placeholder: "o_ion", missing: "n", emoji: "🧅", ar: "بصل" }
            ])}
            {activeActivity === 3 && renderMultiChoice([
              { id: "juice1", text: "Step 1 to make juice is to ____.", correct: "Cut mangoes", choices: ["Cut mangoes", "Pour juice"], ar: "الخطوة ١ لصنع العصير", emoji: "🥭" },
              { id: "juice2", text: "Step 2 is to put them in the ____.", correct: "mixer", choices: ["mixer", "oven"], ar: "الخطوة ٢ هي وضعهم في...", emoji: "🥤" }
            ])}
            {activeActivity === 4 && renderTickCross([
              { id: "u10q1", text: "We see with our eyes.", correct: "tick", ar: "نرى بأعيننا." },
              { id: "u10q2", text: "We smell with our ears.", correct: "cross", ar: "نشم بآذاننا." }
            ])}
            {activeActivity === 5 && renderSaySpellWrite([
              { id: "u10sw1", word: "dates", placeholder: "d_tes", missing: "a", emoji: "🌴", ar: "بلح" },
              { id: "u10sw2", word: "figs", placeholder: "f_gs", missing: "i", emoji: "🫒", ar: "تين" }
            ])}
            {activeActivity === 6 && renderUnscrambler()}
            {activeActivity === 7 && renderReadAndNumber([
              { id: "u10m1", word: "peanuts", ar: "فول سوداني", img: "🥜" },
              { id: "u10m2", word: "tomatoes", ar: "طماطم", img: "🍅" }
            ])}
          </div>
        )}

        {unitId === 11 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("r", "Rubbish", "", "🗑️")}
                {renderReadAndNumber([
                  { id: "u11m1", word: "Excuse me, where's the hospital? -> past market", ar: "أين المستشفى؟", img: "🏥" }
                ])}
              </div>
            )}
            {activeActivity === 1 && renderMultiChoice([
              { id: "wecan1", text: "We can study at ____.", correct: "school", choices: ["school", "zoo", "market"], ar: "ندرس في...", emoji: "🏫" },
              { id: "wecan2", text: "We can read at the ____.", correct: "library", choices: ["library", "park", "zoo"], ar: "نقرأ في...", emoji: "📚" }
            ])}
            {activeActivity === 2 && renderMultiChoice([
              { id: "env_choice", text: "How do we keep Sudan beautiful?", correct: "Pick up rubbish", choices: ["Pick up rubbish", "Drop plastic bags"], ar: "كيف نحافظ على السودان جميلاً؟", emoji: "🇸🇩" }
            ])}
            {activeActivity === 3 && renderReadAndNumber([
              { id: "u11rule1", word: "Keep your room tidy.", ar: "رتب غرفتك.", img: "🧹" },
              { id: "u11rule2", word: "Don't pick the flowers.", ar: "لا تقطف الزهور.", img: "🌸" }
            ])}
            {activeActivity === 4 && renderMultiChoice([
              { id: "rub1", text: "Where do we throw a crushed can?", correct: "tidy bin", choices: ["tidy bin", "ground"], ar: "أين نرمي العلب؟", emoji: "🥫" },
              { id: "rub2", text: "Where do we throw a plastic bag?", correct: "tidy bin", choices: ["tidy bin", "ground"], ar: "أين نرمي الأكياس؟", emoji: "🛍️" }
            ])}
            {activeActivity === 5 && renderSaySpellWrite([
              { id: "u11sw1", word: "hospital", placeholder: "h_spital", missing: "o", emoji: "🏥", ar: "مستشفى" },
              { id: "u11sw2", word: "rubbish", placeholder: "r_bbish", missing: "u", emoji: "🗑️", ar: "أوساخ" }
            ])}
            {activeActivity === 6 && renderMultiChoice([
              { id: "lotsno1", text: "There are ____ goats in Sudan.", correct: "lots of", choices: ["lots of", "no"], ar: "الماعز في السودان", emoji: "🐐" },
              { id: "lotsno2", text: "There are ____ elephants in the classroom.", correct: "no", choices: ["lots of", "no"], ar: "الفيلة في الفصل", emoji: "🐘" }
            ])}
            {activeActivity === 7 && renderMultiChoice([
              { id: "count_hip", text: "We see 5 hippopotamuses. 🦛🦛🦛🦛🦛", correct: "5", choices: ["3", "4", "5"], ar: "كم عدد أفراس النهر؟", emoji: "🦛" },
              { id: "count_cam", text: "We see 3 camels. 🐫🐫🐫", correct: "3", choices: ["2", "3", "4"], ar: "كم عدد الجمال؟", emoji: "🐫" }
            ])}
          </div>
        )}

        {unitId === 12 && (
          <div className="w-full">
            {activeActivity === 0 && (
              <div className="flex flex-col gap-4">
                {renderLetterTracing("e", "Eid", "", "🎉")}
                {renderReadAndNumber([
                  { id: "u12cl1", word: "new dress", ar: "فستان جديد", img: "👗" },
                  { id: "u12cl2", word: "clean shirt", ar: "قميص نظيف", img: "👕" }
                ])}
              </div>
            )}
            {activeActivity === 1 && renderMultiChoice([
              { id: "poss1", text: "Whose cap is this? It's ____ cap.", correct: "Eddie's", choices: ["Eddie's", "Fatma's"], ar: "طاقية إيدي", emoji: "🧢" },
              { id: "poss2", text: "Whose bag is this? It's ____ bag.", correct: "Fatma's", choices: ["Eddie's", "Fatma's"], ar: "حقيبة فاطمة", emoji: "🛍️" }
            ])}
            {activeActivity === 2 && renderMultiChoice([
              { id: "eid_clothing", text: "What do you wear on Eid?", correct: "jalabiya", choices: ["jalabiya", "shorts"], ar: "ملابس العيد", emoji: "🇸🇩" }
            ])}
            {activeActivity === 3 && renderSaySpellWrite([
              { id: "u12w1", word: "cake", placeholder: "c_ke", missing: "a", emoji: "🍰", ar: "كعك" },
              { id: "u12w2", word: "dates", placeholder: "d_tes", missing: "a", emoji: "🌴", ar: "بلح" }
            ])}
            {activeActivity === 4 && renderMultiChoice([
              { id: "dress_badr", text: "Badr wears ____ for Eid.", correct: "jalabiya & imma", choices: ["jalabiya & imma", "t-shirt & shorts"], ar: "ماذا يرتدي بدر؟", emoji: "👦🏾" },
              { id: "dress_dalia", text: "Dalia wears a ____ for Eid.", correct: "beautiful dress", choices: ["beautiful dress", "shorts"], ar: "ماذا ترتدي داليا؟", emoji: "👧🏾" }
            ])}
            {activeActivity === 5 && renderTickCross([
              { id: "u12q1", text: "Add eggs and sugar to flour.", correct: "tick", ar: "أضف البيض والسكر للدقيق." },
              { id: "u12q2", text: "Cook the cake for 10 hours.", correct: "cross", ar: "اخبز كعك العيد لمدة ١٠ ساعات." }
            ])}
            {activeActivity === 6 && renderReadAndNumber([
              { id: "u12fam1", word: "grandfather", ar: "جدي", img: "👴🏾" },
              { id: "u12fam2", word: "grandmother", ar: "جدتي", img: "👵🏾" }
            ])}
            {activeActivity === 7 && renderMultiChoice([
              { id: "pol1", text: "I'd like coffee, please.", correct: "Here you are.", choices: ["Here you are.", "You're welcome."], ar: "أود القهوة من فضلك.", emoji: "☕" },
              { id: "pol2", text: "Thank you for the sweet.", correct: "You're welcome.", choices: ["Here you are.", "You're welcome."], ar: "شكراً لك على الحلوى.", emoji: "🍬" }
            ])}
          </div>
        )}

      </div>
    </div>
  );
}
