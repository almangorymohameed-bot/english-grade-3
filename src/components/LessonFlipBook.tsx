import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  BookOpen, 
  Volume2, 
  Home, 
  RotateCcw, 
  Maximize2, 
  Sparkles,
  Award,
  ZoomIn,
  ZoomOut
} from "lucide-react";

interface LessonFlipBookProps {
  onSpeak: (text: string) => void;
  selectedUnitId?: number;
  onSelectUnitId?: (id: number) => void;
}

export default function LessonFlipBook({ onSpeak, selectedUnitId, onSelectUnitId }: LessonFlipBookProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isSpreading, setIsSpreading] = useState<boolean>(true); // double page spread on desktop
  const bookContainerRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1.0);

  // Touch pinch-to-zoom states
  const touchStartRef = React.useRef<{ distance: number; initialZoom: number } | null>(null);

  // Touch and Mouse drag-to-flip states
  const dragStartRef = React.useRef<{ x: number; y: number; time: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Dropdown open/close state for Table of Contents
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Browse mode: "whole" (all 12 units together) vs "unit" (restrict to selectedUnitId)
  const [browseMode, setBrowseMode] = useState<"unit" | "whole">("whole");

  const isUnitFocused = browseMode === "unit" && selectedUnitId !== undefined;
  const totalPages = isUnitFocused ? 5 : 52;

  // Reset page to cover or unit start and zoom to 1.0 when selected unit or browseMode changes
  React.useEffect(() => {
    if (browseMode === "unit") {
      setCurrentPage(0);
    } else if (selectedUnitId !== undefined) {
      const targetPage = 3 + (selectedUnitId - 1) * 4;
      setCurrentPage(targetPage);
    }
    setZoom(1.0);
  }, [selectedUnitId, browseMode]);

  // Reset zoom to 1.0 when page changes
  React.useEffect(() => {
    setZoom(1.0);
  }, [currentPage]);

  // Touch Pinch-to-zoom handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { distance: dist, initialZoom: zoom };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartRef.current.distance;
      const newZoom = Math.min(2.5, Math.max(1.0, touchStartRef.current.initialZoom * ratio));
      setZoom(Number(newZoom.toFixed(2)));
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  // Drag page turn handlers
  const handleDragStart = (clientX: number, clientY: number, e?: React.MouseEvent | React.TouchEvent) => {
    if (zoom > 1.0) return; // ignore dragging for page turns if zoomed in
    dragStartRef.current = { x: clientX, y: clientY, time: Date.now() };
    setIsDragging(true);
    if (e && 'preventDefault' in e && e.type === 'mousedown') {
      e.preventDefault(); // Prevents default text/image selection dragging
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!dragStartRef.current || zoom > 1.0) return;
    const offset = clientX - dragStartRef.current.x;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!dragStartRef.current) return;
    const diffX = dragOffset;
    const duration = Date.now() - dragStartRef.current.time;

    // Threshold: 60px swipe OR fast flick (distance > 30px and time < 250ms)
    if (Math.abs(diffX) > 60 || (Math.abs(diffX) > 30 && duration < 250)) {
      if (diffX < -40) {
        nextPage();
      } else if (diffX > 40) {
        prevPage();
      }
    }

    dragStartRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!bookContainerRef.current) return;
    
    const isFullscreenEnabled = document.fullscreenEnabled || (document as any).webkitFullscreenEnabled || (document as any).mozFullScreenEnabled || (document as any).msFullscreenEnabled;
    
    if (isFullscreenEnabled) {
      if (!document.fullscreenElement) {
        const req = bookContainerRef.current.requestFullscreen || 
                    (bookContainerRef.current as any).webkitRequestFullscreen || 
                    (bookContainerRef.current as any).mozRequestFullScreen || 
                    (bookContainerRef.current as any).msRequestFullscreen;
        if (req) {
          req.call(bookContainerRef.current)
            .then(() => setIsFullscreen(true))
            .catch(() => {
              setIsFullscreen(!isFullscreen);
            });
        } else {
          setIsFullscreen(!isFullscreen);
        }
      } else {
        const exit = document.exitFullscreen || 
                     (document as any).webkitExitFullscreen || 
                     (document as any).mozCancelFullScreen || 
                     (document as any).msExitFullscreen;
        if (exit) {
          exit.call(document);
        }
        setIsFullscreen(false);
      }
    } else {
      setIsFullscreen(!isFullscreen);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      if (currentPage === 0) {
        setCurrentPage(1);
      } else {
        // In spreading mode, we flip by 2 pages, unless we hit the end
        const jump = isSpreading ? 2 : 1;
        setCurrentPage(Math.min(totalPages - 1, currentPage + jump));
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) {
        setCurrentPage(0);
      } else {
        const jump = isSpreading ? 2 : 1;
        setCurrentPage(Math.max(0, currentPage - jump));
      }
    }
  };

  const jumpToUnitPage = (unitId: number) => {
    // Page 2 is Table of Contents.
    // Unit 1 starts on page 3.
    // Each unit has 4 pages of spread.
    const targetPage = 3 + (unitId - 1) * 4;
    setCurrentPage(targetPage);
  };

  // Helper to render interactive words or text segments (generous sizes to fill the layout)
  const renderInteractiveLine = (text: string, translation?: string) => {
    return (
      <div 
        onClick={() => onSpeak(text)}
        className="group relative cursor-pointer hover:bg-indigo-50/60 p-3 sm:p-4 rounded-2xl transition-all border border-slate-100 hover:border-indigo-200/50 hover:shadow-sm flex items-center justify-between gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-slate-900 group-hover:text-indigo-950 leading-snug">
            {text}
          </p>
          {translation && (
            <p className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-slate-700 mt-1 sm:mt-1.5 leading-normal">
              {translation}
            </p>
          )}
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-indigo-100 group-hover:border-indigo-200 flex items-center justify-center shrink-0 transition-all shadow-3xs group-hover:shadow-2xs">
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
        </div>
      </div>
    );
  };

  const renderContentPage = (pageIdx: number) => {
    if (pageIdx === 0) {
      // FRONT COVER
      return (
        <div className="w-full h-full bg-red-600 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden select-none border-4 border-amber-300 rounded-xl shadow-inner h-full min-h-[500px]">
          {/* Subtle sun-ray pattern background */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 opacity-30 pointer-events-none" />
          
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-widest bg-amber-400 text-red-950 px-3.5 py-1.5 rounded-full uppercase self-start shadow-sm">
                Pupil's Book
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mt-2">
                Grade 3 - Basic Level
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wide">Republic of the Sudan</p>
              <p className="text-10px sm:text-xs font-bold opacity-80">Ministry of Education</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center my-auto text-center z-10 gap-4 sm:gap-6">
            {/* Smile Mascot and Logo */}
            <div className="bg-white text-red-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-lg border-4 border-amber-300 animate-pulse">
              😊
            </div>
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter uppercase text-amber-300 leading-none drop-shadow-2xl">
              SMILE
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-black tracking-widest text-white/95 uppercase bg-black/30 px-6 py-2 rounded-2xl">
              Series • Book 1
            </p>

            <div className="border-y-2 border-amber-300/40 py-4.5 w-full">
              <p className="text-sm sm:text-base md:text-lg font-black tracking-wider uppercase text-amber-200 px-4">
                Sudan Modern Integrated Learning of English
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 z-10">
            {/* Cover illustration of children waving */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-5 w-full border border-white/20 backdrop-blur-xs flex items-center justify-around gap-4 text-4xl sm:text-5xl">
              <span>🏫</span>
              <span>👦🏾</span>
              <span>👧🏼</span>
              <span>🇸🇩</span>
              <span>🎒</span>
            </div>
            <p className="text-[10px] sm:text-xs text-white/85 font-black uppercase tracking-widest text-center">
              National Centre for Curricula and Educational Research (NCCER)
            </p>
          </div>
        </div>
      );
    }

    if (pageIdx === 1) {
      // EDITORIAL INFO
      return (
        <div className="w-full h-full bg-slate-50 p-8 sm:p-12 flex flex-col justify-between text-slate-800 border-l-4 border-slate-300 rounded-r-xl h-full min-h-[500px]">
          <div className="text-center pb-6 border-b border-slate-200">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              Sudan Modern Integrated Learning of English
            </h2>
            <p className="text-sm font-black text-indigo-700 mt-2 uppercase tracking-wider">
              SMILE Series: Book 1 Pupil's Book
            </p>
          </div>

          <div className="my-auto space-y-5 text-sm font-bold text-slate-600 text-center max-w-md mx-auto py-6">
            <div className="bg-white p-4.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase mb-2">Lead Writer:</h3>
              <p className="text-indigo-900 font-extrabold text-base">Stephen Thompson</p>
            </div>

            <div className="bg-white p-4.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase mb-2">Written by:</h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                Ahazeej Abdellateef, Emtithal Alwasila, Lona Louise, <br />
                Mohammed Musaad, Omer El Sheikh, Salah Ahmed
              </p>
            </div>

            <div className="bg-white p-4.5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase mb-2">Technical & Editorial Supervision:</h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                Dr. Hamdan Ahmed Hamdan Abuanja<br />
                <span className="text-indigo-950 font-bold">Head of English Department, NCCER</span>
              </p>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-slate-200 text-xs text-slate-400 font-bold">
            <p>© Bakht-er-Rudha – Sudan (NCCER), all rights reserved.</p>
            <p className="mt-1 text-slate-500 font-black">Digital Flip Book Edition 2026</p>
          </div>
        </div>
      );
    }

    if (pageIdx === 2) {
      // TABLE OF CONTENTS
      const contents = [
        { id: 1, topic: "Welcome to English", page: "Page 1", color: "bg-sky-500" },
        { id: 2, topic: "Numbers", page: "Page 9", color: "bg-emerald-500" },
        { id: 3, topic: "Colours", page: "Page 17", color: "bg-indigo-500" },
        { id: 4, topic: "About Me", page: "Page 25", color: "bg-amber-500" },
        { id: 5, topic: "My School", page: "Page 33", color: "bg-pink-500" },
        { id: 6, topic: "Home", page: "Page 41", color: "bg-purple-500" },
        { id: 7, topic: "My Family", page: "Page 49", color: "bg-teal-500" },
        { id: 8, topic: "Toys and Games", page: "Page 57", color: "bg-red-500" },
        { id: 9, topic: "Animals", page: "Page 65", color: "bg-orange-500" },
        { id: 10, topic: "Food and Drink", page: "Page 73", color: "bg-lime-500" },
        { id: 11, topic: "Our Environment", page: "Page 81", color: "bg-rose-500" },
        { id: 12, topic: "Eid El Fitr", page: "Page 89", color: "bg-cyan-500" },
      ];

      return (
        <div className="w-full h-full bg-amber-50/20 p-6 sm:p-8 flex flex-col justify-between text-slate-800 border-l border-r border-slate-200 h-full min-h-[500px]">
          <div>
            <div className="flex items-center justify-center gap-2.5 mb-5 bg-amber-100/60 py-3 rounded-2xl border border-amber-200">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 uppercase tracking-tight">
                Table of Contents (الفهرس)
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-center font-bold text-amber-800 mb-5">
              💡 Click any Unit below to jump directly to its textbook pages!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contents.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => jumpToUnitPage(item.id)}
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white hover:bg-amber-50/40 border border-slate-200 hover:border-amber-300 rounded-2xl shadow-3xs hover:shadow-xs transition-all cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`w-8 h-8 rounded-xl ${item.color} text-white flex items-center justify-center text-sm font-black shadow-sm`}>
                      {item.id}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                      {item.topic}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-slate-400 italic bg-slate-50 px-2.5 py-1 rounded-lg">
                    {item.page}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-white border border-amber-200 rounded-2xl text-center shadow-3xs">
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider">Sudan Education Curriculum 🇸🇩</span>
          </div>
        </div>
      );
    }

    // DYNAMIC LESSON PAGES
    // 12 Units, 4 pages of spread each
    const actualPageIdx = isUnitFocused 
      ? (pageIdx === 0 ? 0 : (3 + (selectedUnitId - 1) * 4 + (pageIdx - 1))) 
      : pageIdx;

    if (isUnitFocused && pageIdx === 0) {
      // CUSTOM STUNNING UNIT COVER PAGE
      const unitCoverInfo = [
        { id: 1, title: "Welcome to English", color: "from-sky-500 to-indigo-600", icon: "👋", desc: "Start your journey into English! Learn greetings, alphabet sounds, numbers, and how to introduce yourself." },
        { id: 2, title: "Numbers", color: "from-emerald-500 to-teal-600", icon: "🔢", desc: "Learn to count from 1 to 10 in English, play number matching games, and ask about age." },
        { id: 3, title: "Colours", color: "from-indigo-500 to-purple-600", icon: "🎨", desc: "Discover primary colours, traffic light signals, and play the colour interactive matching games." },
        { id: 4, title: "About Me", color: "from-amber-500 to-orange-600", icon: "👤", desc: "Learn to describe yourself, talk about your face, arms, and legs, and practice body vocabulary." },
        { id: 5, title: "My School", color: "from-pink-500 to-rose-600", icon: "🏫", desc: "Explore the classroom, find hidden objects, and identify things like books, bags, and chairs." },
        { id: 6, title: "Home", color: "from-purple-500 to-indigo-700", icon: "🏠", desc: "Describe where animals live, talk about flats and houses, and explore basic household items." },
        { id: 7, title: "My Family", color: "from-teal-500 to-emerald-600", icon: "👨‍👩‍👧‍👦", desc: "Introduce your sisters, brothers, mother and father, and practice telling the time." },
        { id: 8, title: "Toys and Games", color: "from-red-500 to-orange-600", icon: "🧸", desc: "Learn about toys, express actions like skip, jump, and run, and follow classroom instructions." },
        { id: 9, title: "Animals", color: "from-orange-500 to-amber-600", icon: "🦁", desc: "Explore animals of Sudan: camels, lions, monkeys, crocodiles, and discuss their features." },
        { id: 10, title: "Food and Drink", color: "from-lime-500 to-emerald-500", icon: "🍉", desc: "Learn to ask for food and drink, name common fruits like lemons and melons, and describe meals." },
        { id: 11, title: "Our Environment", color: "from-rose-500 to-pink-600", icon: "🌳", desc: "Learn to protect nature, put rubbish in the bin, and keep Sudan clean and beautiful." },
        { id: 12, title: "Eid El Fitr", color: "from-cyan-500 to-blue-600", icon: "🎉", desc: "Celebrate Eid El Fitr in English! Learn to wish 'Eid Mubarak' to your family and friends." },
      ][selectedUnitId - 1] || { id: 1, title: "Welcome", color: "from-sky-500 to-indigo-600", icon: "👋", desc: "SMILE English Textbook Series" };

      return (
        <div className="w-full h-full bg-slate-50 p-8 sm:p-12 flex flex-col justify-between text-slate-800 border-l-4 border-indigo-600 rounded-r-xl select-none relative overflow-hidden h-full min-h-[500px]">
          {/* Decorative background element */}
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-indigo-100 rounded-full opacity-50 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-pink-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

          <div className="text-center pt-2">
            <span className="text-xs font-black tracking-widest bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full uppercase">
              SMILE 1 • Textbook Unit
            </span>
          </div>

          <div className="my-auto flex flex-col items-center text-center px-4 z-10 gap-4 sm:gap-6">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${unitCoverInfo.color} text-white flex items-center justify-center text-5xl sm:text-6xl shadow-lg mb-2 transform hover:scale-110 transition-transform`}>
              {unitCoverInfo.icon}
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                Unit {selectedUnitId}
              </h2>
              <h3 className="text-xl sm:text-2xl font-extrabold text-indigo-900 uppercase leading-tight">
                {unitCoverInfo.title}
              </h3>
            </div>

            <p className="text-sm text-slate-500 mt-2 max-w-sm font-semibold leading-relaxed">
              {unitCoverInfo.desc}
            </p>

            <div className="mt-4 sm:mt-6 flex flex-col gap-2.5 w-full max-w-sm">
              <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Included Textbook Spreads:</div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl font-black shadow-3xs text-slate-700">Lessons 1 - 2</div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl font-black shadow-3xs text-slate-700">Lessons 3 - 4</div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl font-black shadow-3xs text-slate-700">Lessons 5 - 6</div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl font-black shadow-3xs text-slate-700">Lessons 7 - 8</div>
              </div>
            </div>
          </div>

          <div className="text-center z-10 mt-4">
            <button
              onClick={nextPage}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer transition-all inline-flex items-center gap-2.5"
            >
              <span>Start Reading Unit {selectedUnitId}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold mt-4">Sudan Ministry of Education • Grade 3 Pupil's Book</p>
          </div>
        </div>
      );
    }

    const unitOffset = Math.floor((actualPageIdx - 3) / 4);
    const unitId = unitOffset + 1;
    const spreadIndex = (actualPageIdx - 3) % 4; // 0, 1, 2, or 3 for each unit

    const unitInfo = [
      { id: 1, title: "Welcome to English", color: "border-sky-400 bg-sky-50/20 text-sky-950", icon: "👋" },
      { id: 2, title: "Numbers", color: "border-emerald-400 bg-emerald-50/20 text-emerald-950", icon: "🔢" },
      { id: 3, title: "Colours", color: "border-indigo-400 bg-indigo-50/20 text-indigo-950", icon: "🎨" },
      { id: 4, title: "About Me", color: "border-amber-400 bg-amber-50/20 text-amber-950", icon: "👤" },
      { id: 5, title: "My School", color: "border-pink-400 bg-pink-50/20 text-pink-950", icon: "🏫" },
      { id: 6, title: "Home", color: "border-purple-400 bg-purple-50/20 text-purple-950", icon: "🏠" },
      { id: 7, title: "My Family", color: "border-teal-400 bg-teal-50/20 text-teal-950", icon: "👨‍👩‍👧‍👦" },
      { id: 8, title: "Toys and Games", color: "border-red-400 bg-red-50/20 text-red-950", icon: "🧸" },
      { id: 9, title: "Animals", color: "border-orange-400 bg-orange-50/20 text-orange-950", icon: "🦁" },
      { id: 10, title: "Food and Drink", color: "border-lime-400 bg-lime-50/20 text-lime-950", icon: "🍉" },
      { id: 11, title: "Our Environment", color: "border-rose-400 bg-rose-50/20 text-rose-950", icon: "🌳" },
      { id: 12, title: "Eid El Fitr", color: "border-cyan-400 bg-cyan-50/20 text-cyan-950", icon: "🎉" },
    ][unitOffset] || { id: 1, title: "Welcome", color: "border-sky-400 bg-sky-50/20", icon: "👋" };

    const lessonA_Id = spreadIndex * 2 + 1;
    const lessonB_Id = spreadIndex * 2 + 2;

    const renderLessonLayout = (lessonNum: number) => {
      // Content of each lesson based on standard Grade 3 English curriculum
      if (unitId === 1) {
        if (lessonNum === 1) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-sky-100/30 rounded-2xl border border-sky-200">
                <p className="text-xs sm:text-sm font-black uppercase text-sky-850 mb-2 leading-none">1. Listen, repeat and act (استمع، كرر ومثل):</p>
                <div className="space-y-2.5">
                  {renderInteractiveLine("Hi, I'm Badr.", "أهلاً، أنا بدر")}
                  {renderInteractiveLine("Hello, I'm Ahmed.", "مرحباً، أنا أحمد")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-indigo-100/20 rounded-2xl border border-indigo-150">
                <p className="text-xs sm:text-sm font-black uppercase text-indigo-900 mb-2.5 leading-none">2. Listen, chant and point (أنشودة الحروف):</p>
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 font-mono text-center">
                  {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(letter => (
                    <button 
                      key={letter} 
                      onClick={() => onSpeak(letter)}
                      className="aspect-square w-full bg-white border border-slate-200 rounded-xl hover:bg-indigo-50 font-black uppercase flex items-center justify-center text-slate-800 text-sm sm:text-base md:text-lg hover:text-indigo-600 cursor-pointer active:scale-90 transition-all p-1 shadow-3xs"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-amber-100/25 rounded-2xl border border-amber-200">
                <p className="text-xs sm:text-sm font-black uppercase text-amber-900 mb-2 leading-none">3. Goodbye, Mrs Hind (الوداع):</p>
                <div className="space-y-2.5">
                  {renderInteractiveLine("Goodbye, Mrs Hind.", "مع السلامة، أستاذة هند")}
                  {renderInteractiveLine("Goodbye.", "مع السلامة")}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 2) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-emerald-100/20 rounded-2xl border border-emerald-150">
                <p className="text-xs sm:text-sm font-black uppercase text-emerald-900 mb-2.5 leading-none">1. Numbers 1 to 4 (الأرقام):</p>
                <div className="grid grid-cols-4 gap-2 text-center font-black">
                  {[
                    { num: "1", word: "Apple", emoji: "🍏" },
                    { num: "2", word: "Bag", emoji: "🎒" },
                    { num: "3", word: "Cat", emoji: "🐈" },
                    { num: "4", word: "Door", emoji: "🚪" }
                  ].map(item => (
                    <div 
                      key={item.num} 
                      onClick={() => onSpeak(item.word)}
                      className="bg-white p-3 sm:p-4 border border-slate-200 rounded-2xl shadow-3xs cursor-pointer hover:bg-emerald-50 active:scale-95 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      <p className="text-2xl sm:text-3xl md:text-4xl text-emerald-600 font-black leading-none">{item.num}</p>
                      <span className="text-xl sm:text-2xl md:text-3xl leading-none">{item.emoji}</span>
                      <p className="text-[10px] sm:text-xs md:text-sm uppercase font-extrabold text-slate-600 leading-none tracking-tight truncate w-full">{item.word}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2 leading-none">2. Point and say (أشر وتحدث):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("A bag.", "حقيبة واحدة")}
                  {renderInteractiveLine("2 bags.", "حقيبتان")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-sky-100/25 rounded-2xl border border-sky-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-sky-900 mb-2 leading-none">3. Letters spelling a and b:</p>
                <div className="flex gap-2.5">
                  <span onClick={() => onSpeak("apple")} className="flex-1 bg-white border border-slate-200 hover:border-sky-300 px-3 py-2.5 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-black cursor-pointer hover:bg-sky-50 text-center shadow-3xs transition-colors">a is for apple</span>
                  <span onClick={() => onSpeak("bag")} className="flex-1 bg-white border border-slate-200 hover:border-sky-300 px-3 py-2.5 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-black cursor-pointer hover:bg-sky-50 text-center shadow-3xs transition-colors">b is for bag</span>
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 3) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-indigo-100/20 rounded-2xl border border-indigo-150">
                <p className="text-xs sm:text-sm font-black uppercase text-indigo-900 mb-2.5 leading-none">1. Numbers 5 to 10 (الأرقام من ٥ إلى ١٠):</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center font-black">
                  {[
                    { num: "5", word: "Egg", emoji: "🥚" },
                    { num: "6", word: "Desk", emoji: "💻" },
                    { num: "7", word: "Fan", emoji: "🪭" },
                    { num: "8", word: "Gate", emoji: "🚪" },
                    { num: "9", word: "Frog", emoji: "🐸" },
                    { num: "10", word: "Pen", emoji: "✏️" }
                  ].map(item => (
                    <div 
                      key={item.num} 
                      onClick={() => onSpeak(item.word)}
                      className="bg-white p-2.5 sm:p-3.5 border border-slate-200 rounded-2xl shadow-3xs cursor-pointer hover:bg-indigo-50 active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5"
                    >
                      <p className="text-xl sm:text-2xl text-indigo-600 font-black leading-none">{item.num}</p>
                      <span className="text-lg sm:text-xl leading-none">{item.emoji}</span>
                      <p className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-600 leading-none tracking-tight truncate w-full">{item.word}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2 leading-none">2. Point, read and say (أشر، اقرأ وقل):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("cap", "طاقية")}
                  {renderInteractiveLine("desk", "درج / طاولة")}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 4) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-purple-100/20 rounded-2xl border border-purple-150 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-purple-900 mb-2 leading-none">1. Introducing Yourself (التعريف بالنفس):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("Hi, I'm Cathy. What's your name?", "أهلاً، أنا كاثي. ما اسمك؟")}
                  {renderInteractiveLine("My name's Fatma.", "اسمي فاطمة")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-amber-100/25 rounded-2xl border border-amber-200">
                <p className="text-xs sm:text-sm font-black uppercase text-amber-900 mb-2.5 leading-none">2. Letters e and f:</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { eng: "egg", arb: "بيضة", emoji: "🥚" },
                    { eng: "fan", arb: "مروحة", emoji: "🪭" },
                    { eng: "flag", arb: "علم", emoji: "🇸🇩" }
                  ].map((item) => (
                    <button 
                      key={item.eng}
                      onClick={() => onSpeak(item.eng)} 
                      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 cursor-pointer active:scale-95 transition-all shadow-3xs gap-2"
                    >
                      <span className="text-xl sm:text-2xl">{item.emoji}</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 leading-none">{item.eng}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-0.5 leading-none">{item.arb}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 5) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-pink-100/20 rounded-2xl border border-pink-150 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-pink-900 mb-2">1. Greetings (التحيات والتقديم):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("Hello, Mr Gamar.", "مرحباً، أستاذ قمر")}
                  {renderInteractiveLine("This is Eddie, Mr Gamar. He's English.", "هذا إيدي، أستاذ قمر. إنه إنجليزي")}
                  {renderInteractiveLine("Hello, Eddie.", "مرحباً، إيدي")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2">2. Letters g and h:</p>
                <div className="space-y-2">
                  {renderInteractiveLine("gate", "بوابة")}
                  {renderInteractiveLine("hat", "قبعة")}
                  {renderInteractiveLine("hen", "دجاجة")}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 6) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-teal-100/20 rounded-2xl border border-teal-150 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-teal-900 mb-2">1. Dialogue (حوار):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("Are you Sudanese, Eddie?", "هل أنت سوداني يا إيدي؟")}
                  {renderInteractiveLine("No, I'm not. I'm English.", "لا، لست كذلك. أنا إنجليزي")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2">2. Letters i and j:</p>
                <div className="space-y-2">
                  {renderInteractiveLine("insect", "حشرة")}
                  {renderInteractiveLine("jam", "مربى")}
                  {renderInteractiveLine("jug", "إبريق")}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 7) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="p-3.5 sm:p-5 bg-orange-100/20 rounded-2xl border border-orange-150 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-orange-900 mb-2">1. Greeting Friends (السؤال عن الحال):</p>
                <div className="space-y-2">
                  {renderInteractiveLine("Dalia! How are you?", "داليا! كيف حالك؟")}
                  {renderInteractiveLine("I'm fine, thanks.", "أنا بخير، شكراً")}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="text-xs sm:text-sm font-black uppercase text-slate-900 mb-2">2. Letters k and l:</p>
                <div className="space-y-2">
                  {renderInteractiveLine("kick", "يركل")}
                  {renderInteractiveLine("lamp", "مصباح")}
                  {renderInteractiveLine("leg", "رجل / ساق")}
                </div>
              </div>
            </div>
          );
        }
        if (lessonNum === 8) {
          return (
            <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
              <div className="bg-indigo-600 text-white p-4.5 sm:p-6 rounded-3xl text-center shadow-md">
                <span className="text-3xl sm:text-4xl">🏆</span>
                <h4 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-wider mt-2">Revision Unit 1 (مراجعة الوحدة الأولى)</h4>
              </div>

              <div className="p-4 sm:p-6 bg-white border border-slate-200 rounded-2xl space-y-3.5 shadow-3xs">
                <p className="text-xs sm:text-sm font-black text-indigo-900 uppercase">A letter is in a word:</p>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <span onClick={() => onSpeak("a is in apple")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">a is in apple</span>
                  <span onClick={() => onSpeak("b is in bed")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">b is in bed</span>
                  <span onClick={() => onSpeak("c is in cat")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">c is in cat</span>
                  <span onClick={() => onSpeak("d is in desk")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">d is in desk</span>
                  <span onClick={() => onSpeak("e is in egg")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">e is in egg</span>
                  <span onClick={() => onSpeak("f is in flag")} className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors text-center shadow-3xs">f is in flag</span>
                </div>
              </div>
            </div>
          );
        }
      }

      // Default layout for other units to display actual curriculum points with beautiful styles (compact)
      return (
        <div className="space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left">
            <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase leading-none">Lesson {lessonNum} Focus (محتوى الدرس):</h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-2 leading-normal">
              🔊 Listen, repeat and practice the words below (استمع، كرر وتدرب):
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3.5 flex-grow flex flex-col justify-center">
            {unitId === 2 && lessonNum === 1 && (
              <>
                {renderInteractiveLine("1 little, 2 little, 3 little crocodiles!", "١، ٢، ٣ تمساح صغير!")}
                {renderInteractiveLine("10 crocodiles in the Nile.", "١٠ تماسيح في النيل")}
                {renderInteractiveLine("man", "رجل")}
                {renderInteractiveLine("neck", "رقبة")}
              </>
            )}
            {unitId === 2 && lessonNum === 2 && (
              <>
                {renderInteractiveLine("How old are you? I'm 8.", "كم عمرك؟ عمري ٨")}
                {renderInteractiveLine("pen", "قلم")}
                {renderInteractiveLine("lamp", "مصباح")}
              </>
            )}
            {unitId === 2 && lessonNum === 3 && (
              <>
                {renderInteractiveLine("How many frogs are there? 3.", "كم عدد الضفادع؟ ٣")}
                {renderInteractiveLine("quiet", "هادئ")}
                {renderInteractiveLine("rabbit", "أرنب")}
              </>
            )}
            {unitId === 3 && (
              <>
                {renderInteractiveLine("It's red!", "إنه أحمر!")}
                {renderInteractiveLine("What colour is it? Blue.", "ما هذا اللون؟ أزرق")}
                {renderInteractiveLine("Stop! Wait! Go!", "قف! انتظر! انطلق!")}
              </>
            )}
            {unitId === 4 && (
              <>
                {renderInteractiveLine("I've got a lemon. My lemon is yellow.", "أنا أملك ليمونة. ليمونتي صفراء")}
                {renderInteractiveLine("I've got a melon. My melon is green.", "أنا أملك بطيخة. بطيختي خضراء")}
                {renderInteractiveLine("head, arms, hands, legs, feet", "الرأس، الأذرع، الأيدي، الأرجل، الأقدام")}
              </>
            )}
            {unitId === 5 && (
              <>
                {renderInteractiveLine("Where is Mrs Hind?", "أين الأستاذة هند؟")}
                {renderInteractiveLine("It's next to the book.", "إنه بجانب الكتاب")}
                {renderInteractiveLine("The monkey's on the chair.", "القرد على الكرسي")}
              </>
            )}
            {unitId === 6 && (
              <>
                {renderInteractiveLine("I'm a cat. I live in a flat.", "أنا قطة. أعيش في شقة")}
                {renderInteractiveLine("I'm a bird. I live in a tree.", "أنا عصفور. أعيش في شجرة")}
                {renderInteractiveLine("Where's the library?", "أين المكتبة؟")}
              </>
            )}
            {unitId === 7 && (
              <>
                {renderInteractiveLine("This is me. I'm with my sister.", "هذا أنا. أنا مع أختي")}
                {renderInteractiveLine("This is me and this is my brother.", "هذا أنا وهذا أخي")}
                {renderInteractiveLine("What's the time? It's 9 o'clock.", "كم الساعة؟ إنها التاسعة تماماً")}
              </>
            )}
            {unitId === 8 && (
              <>
                {renderInteractiveLine("I can see a book.", "أستطيع أن أرى كتاباً")}
                {renderInteractiveLine("I can skip and I can hop.", "أستطيع نط الحبل وأستطيع الحجل")}
                {renderInteractiveLine("Stand up. Sit down. Thank you.", "قف. اجلس. شكراً لك")}
              </>
            )}
            {unitId === 9 && (
              <>
                {renderInteractiveLine("This is a map of Sudan.", "هذه خريطة السودان")}
                {renderInteractiveLine("There are deserts, mountains and forests.", "هناك صحاري وجبال وغابات")}
                {renderInteractiveLine("Camels have got long legs.", "الجمال تمتلك أرجلاً طويلة")}
              </>
            )}
            {unitId === 10 && (
              <>
                {renderInteractiveLine("Point to the lemons. Point to the eggs.", "أشر إلى الليمون. أشر إلى البيض")}
                {renderInteractiveLine("There is some milk in the fridge.", "هناك بعض الحليب في الثلاجة")}
                {renderInteractiveLine("I'd like coffee, please.", "أود تناول القهوة من فضلك")}
              </>
            )}
            {unitId === 11 && (
              <>
                {renderInteractiveLine("Excuse me, where's the museum?", "عذراً، أين المتحف؟")}
                {renderInteractiveLine("Don't drop rubbish. Put it in the bin.", "لا ترمي القمامة. ضعها في السلة")}
                {renderInteractiveLine("Keep Sudan clean.", "حافظ على السودان نظيفاً")}
              </>
            )}
            {unitId === 12 && (
              <>
                {renderInteractiveLine("Eid Mubarak everyone!", "عيد مبارك للجميع!")}
                {renderInteractiveLine("Whose flower is this? It's Cathy's flower.", "لمن هذه الزهرة؟ إنها زهرة كاثي")}
                {renderInteractiveLine("I say Eid Mubarak to my grandfather.", "أقول عيد مبارك لجدي")}
              </>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className={`w-full h-full p-6 sm:p-8 flex flex-col justify-between text-slate-800 border-l border-r border-slate-200 bg-linear-to-b from-white to-slate-50/70 rounded-xl shadow-inner select-none`}>
        {/* Page Top Header */}
        <div className={`flex justify-between items-center pb-3.5 mb-4 border-b-2 ${unitInfo.color.split(" ")[0]}`}>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{unitInfo.icon}</span>
            <span className="text-xs sm:text-sm md:text-base font-black uppercase text-indigo-950 tracking-wider">
              Unit {unitId}: {unitInfo.title}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs bg-indigo-950 text-white font-black px-2.5 py-1 rounded-lg uppercase tracking-wide">
            SMILE 1
          </span>
        </div>

        {/* Real content rendering for left/right textbook lessons */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-2 min-h-0">
          {/* Left Column: Lesson A */}
          <div className="bg-white p-4.5 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col h-full justify-between">
            <div className="mb-4">
              <span className="text-[10px] sm:text-xs bg-sky-600 text-white font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider inline-block shadow-sm">
                Lesson {lessonA_Id}
              </span>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-4 min-h-0">
              {renderLessonLayout(lessonA_Id)}
            </div>
          </div>

          {/* Right Column: Lesson B */}
          <div className="bg-white p-4.5 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col h-full justify-between">
            <div className="mb-4">
              <span className="text-[10px] sm:text-xs bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider inline-block shadow-sm">
                Lesson {lessonB_Id}
              </span>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-4 min-h-0">
              {renderLessonLayout(lessonB_Id)}
            </div>
          </div>
        </div>

        {/* Page footer and page index counter */}
        <div className="flex justify-between items-center pt-3.5 mt-4 border-t border-slate-200/60 text-xs font-bold text-slate-400">
          <span className="italic">Grade 3 English Pupil's Book</span>
          <span className="text-indigo-950 font-extrabold text-sm tracking-wider bg-slate-100 px-3 py-1 rounded-full">Pages {pageIdx * 2 - 4 + 1} - {pageIdx * 2 - 4 + 2}</span>
        </div>
      </div>
    );
  };

  const isSinglePage = currentPage === 0 || !isSpreading;

  return (
    <div 
      ref={bookContainerRef}
      className={`w-full flex flex-col gap-4 no-print select-none transition-all duration-300 ${
        isFullscreen 
          ? "fixed inset-0 z-50 bg-radial from-slate-900 via-indigo-950 to-slate-950 p-4 md:p-8 overflow-y-auto flex flex-col justify-center items-center" 
          : "relative"
      }`}
    >
      {/* Textbook Mode Controls Header */}
      <div className={`w-full ${isFullscreen ? "max-w-[92vw] mb-2" : "max-w-5xl"} flex flex-col sm:flex-row justify-between items-center gap-3 bg-gradient-to-r from-indigo-950 to-indigo-900 text-white p-4 rounded-3xl border-b-4 border-indigo-950 shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-800 rounded-2xl text-xl animate-bounce">📖</div>
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-amber-300">
              Flip Book Textbook Reader
            </h3>
            <p className="text-[10px] font-bold text-indigo-200">
              كتاب التلميذ الورقي التفاعلي - تصفح ككتاب حقيقي بصوت وصور
            </p>
          </div>
        </div>

        {/* Speed, layout, and fullscreen controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Zoom Control Slider */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-950/60 rounded-xl border border-indigo-800/40">
            <button 
              type="button"
              onClick={() => setZoom(prev => Math.max(1.0, Number((prev - 0.1).toFixed(1))))}
              disabled={zoom <= 1.0}
              className="p-1 text-indigo-200 hover:text-white disabled:opacity-40 transition-opacity cursor-pointer flex items-center justify-center"
              title="Zoom Out (تصغير)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <input 
              type="range" 
              min="1.0" 
              max="2.5" 
              step="0.1" 
              value={zoom} 
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-16 sm:w-24 h-1 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              title="Zoom Level"
            />
            <button 
              type="button"
              onClick={() => setZoom(prev => Math.min(2.5, Number((prev + 0.1).toFixed(1))))}
              disabled={zoom >= 2.5}
              className="p-1 text-indigo-200 hover:text-white disabled:opacity-40 transition-opacity cursor-pointer flex items-center justify-center"
              title="Zoom In (تكبير)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[9px] font-mono font-black text-amber-300 min-w-[28px] text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Browse Mode Selector Toggle */}
          <div className="flex bg-indigo-950/60 p-1 rounded-xl border border-indigo-800/40">
            <button
              onClick={() => {
                setBrowseMode("whole");
              }}
              className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer ${browseMode === "whole" ? "bg-indigo-600 text-white" : "text-indigo-200 hover:text-white"}`}
              title="Browse all 12 units of the textbook"
            >
              📚 Whole Book
            </button>
            <button
              onClick={() => {
                setBrowseMode("unit");
              }}
              className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer ${browseMode === "unit" ? "bg-indigo-600 text-white" : "text-indigo-200 hover:text-white"}`}
              title="Focus only on the selected Unit"
            >
              🎯 Unit Only
            </button>
          </div>

          <button
            onClick={() => setIsSpreading(!isSpreading)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-xs font-black rounded-xl border border-indigo-700 transition-all cursor-pointer"
          >
            <span>{isSpreading ? "📖 Double Spread" : "📄 Single Page"}</span>
          </button>
          
          {/* Table of Contents Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Table of Contents</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent cursor-default" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 scrollbar-thin text-slate-800"
                >
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black uppercase text-indigo-950 tracking-wider">
                      Book Pages • صفحات الكتاب
                    </p>
                  </div>
                  
                  {/* General Book Sections */}
                  <div className="space-y-0.5 mb-2">
                    <button
                      onClick={() => {
                        setCurrentPage(0);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-left rounded-xl transition-all text-xs font-bold hover:bg-slate-50 ${currentPage === 0 ? "bg-indigo-50 text-indigo-950 font-black" : "text-slate-700"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📕</span>
                        <span>Front Cover (الغلاف الرئيسي)</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">p. 0</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-left rounded-xl transition-all text-xs font-bold hover:bg-slate-50 ${currentPage === 1 ? "bg-indigo-50 text-indigo-950 font-black" : "text-slate-700"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📄</span>
                        <span>Editorial (اللجنة والمقدمة)</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">p. 1</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage(2);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-left rounded-xl transition-all text-xs font-bold hover:bg-slate-50 ${currentPage === 2 ? "bg-indigo-50 text-indigo-950 font-black" : "text-slate-700"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>📋</span>
                        <span>Table of Contents (الفهرس الشامل)</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">p. 2</span>
                    </button>
                  </div>

                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black uppercase text-indigo-950 tracking-wider">
                      Units • الفصول الدراسية
                    </p>
                  </div>

                  {/* Units List */}
                  <div className="space-y-0.5">
                    {[
                      { id: 1, topic: "Welcome to English", color: "bg-sky-500", icon: "👋" },
                      { id: 2, topic: "Numbers", color: "bg-emerald-500", icon: "🔢" },
                      { id: 3, topic: "Colours", color: "bg-indigo-500", icon: "🎨" },
                      { id: 4, topic: "About Me", color: "bg-amber-500", icon: "👤" },
                      { id: 5, topic: "My School", color: "bg-pink-500", icon: "🏫" },
                      { id: 6, topic: "Home", color: "bg-purple-500", icon: "🏠" },
                      { id: 7, topic: "My Family", color: "bg-teal-500", icon: "👨‍👩‍👧‍👦" },
                      { id: 8, topic: "Toys and Games", color: "bg-red-500", icon: "🧸" },
                      { id: 9, topic: "Animals", color: "bg-orange-500", icon: "🦁" },
                      { id: 10, topic: "Food and Drink", color: "bg-lime-500", icon: "🍉" },
                      { id: 11, topic: "Our Environment", color: "bg-rose-500", icon: "🌳" },
                      { id: 12, topic: "Eid El Fitr", color: "bg-cyan-500", icon: "🎉" },
                    ].map((item) => {
                      const unitStartPage = 3 + (item.id - 1) * 4;
                      const isCurrentUnit = selectedUnitId === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (onSelectUnitId) {
                              onSelectUnitId(item.id);
                            }
                            if (browseMode === "whole") {
                              setCurrentPage(unitStartPage);
                            } else {
                              setCurrentPage(0); // Jump to unit cover in focused mode
                            }
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 text-left rounded-xl transition-all text-xs font-bold hover:bg-slate-50 ${isCurrentUnit ? "bg-amber-50 text-amber-950 font-black border border-amber-200/50" : "text-slate-700"}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`w-5 h-5 rounded-md ${item.color} text-white flex items-center justify-center text-[10px] font-black shrink-0`}>
                              {item.id}
                            </span>
                            <span className="truncate">{item.icon} {item.topic}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 shrink-0">
                            p. {unitStartPage}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(0)} // Reset to Cover
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-xs font-bold rounded-xl border border-indigo-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Book</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl border border-indigo-500 transition-all cursor-pointer shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isFullscreen ? "Exit (تصغير)" : "Fullscreen (ملء الشاشة)"}</span>
          </button>
        </div>
      </div>

      {/* Actual Physical Open Book Spread Layout container */}
      <div className={`relative w-full flex flex-col items-center ${isFullscreen ? "max-w-[92vw] my-auto" : "max-w-5xl mx-auto"}`}>
        {/* Book spine back shadow block */}
        <div className="absolute inset-x-2 -bottom-2 h-4 bg-slate-900/10 rounded-full filter blur-md pointer-events-none" />

        <div 
          onTouchStart={(e) => {
            if (e.touches.length === 2) {
              handleTouchStart(e);
            } else if (e.touches.length === 1) {
              handleDragStart(e.touches[0].clientX, e.touches[0].clientY, e);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 2) {
              handleTouchMove(e);
            } else if (e.touches.length === 1) {
              handleDragMove(e.touches[0].clientX);
            }
          }}
          onTouchEnd={() => {
            handleTouchEnd();
            handleDragEnd();
          }}
          onMouseDown={(e) => {
            if ((e.target as HTMLElement).closest("button, select, input, a, .scrollbar-thin, [role='button'], .cursor-pointer")) return;
            handleDragStart(e.clientX, e.clientY, e);
          }}
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              handleDragMove(e.clientX);
            }
          }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`w-full flex flex-col md:flex-row items-stretch justify-center relative bg-slate-200/50 p-2 sm:p-4 rounded-3xl border border-slate-300/40 shadow-inner min-h-[300px] md:min-h-[460px] ${zoom > 1 ? "overflow-hidden" : ""} select-none cursor-grab active:cursor-grabbing`}
        >
          {/* Flip Left Button overlay */}
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 bg-white hover:bg-sky-50 text-indigo-950 rounded-full border-b-4 border-slate-300 shadow-md flex items-center justify-center transform active:translate-y-[-45%] active:border-b-0 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
          )}

          {/* Flip Right Button overlay */}
          {currentPage < totalPages - 1 && (
            <button
              onClick={nextPage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 bg-white hover:bg-sky-50 text-indigo-950 rounded-full border-b-4 border-slate-300 shadow-md flex items-center justify-center transform active:translate-y-[-45%] active:border-b-0 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>
          )}

          {/* Scrollable container to support Zoom/magnification panning */}
          <div className={`w-full overflow-auto p-1 flex ${zoom > 1 ? "justify-start" : "justify-center"} items-start scrollbar-thin`}>
            {/* SPREAD/PAGE VIEWER */}
            <div 
              style={{ 
                aspectRatio: isSinglePage ? "0.71 / 1" : "1.42 / 1",
                maxHeight: isFullscreen ? "85vh" : "620px",
                width: "100%",
                transform: zoom > 1 
                  ? `scale(${zoom})` 
                  : `translateX(${isDragging ? dragOffset * 0.45 : 0}px) rotateY(${isDragging ? (dragOffset / window.innerWidth) * 25 : 0}deg) scale(${isDragging ? 0.98 : 1})`,
                transformOrigin: zoom > 1 ? "top left" : "center center",
                transition: isDragging ? "none" : "transform 0.25s ease-out, margin 0.15s ease-out",
                marginRight: zoom > 1 ? `calc(${zoom - 1} * 100%)` : "0px",
                marginBottom: zoom > 1 ? `calc(${zoom - 1} * ${isFullscreen ? "85vh" : "620px"})` : "0px",
              }}
              className={`w-full mx-auto flex flex-col md:flex-row items-stretch justify-center gap-1 bg-white rounded-2xl shadow-xl overflow-hidden relative border-t-8 border-b-8 border-indigo-900/5 flex-shrink-0 ${
                isSinglePage 
                  ? (isFullscreen ? "max-w-[45vw]" : "max-w-md") 
                  : (isFullscreen ? "max-w-[92vw]" : "max-w-4xl")
              }`}
            >
              <AnimatePresence mode="wait">
                {currentPage === 0 || !isSpreading ? (
                  // Single Cover / Index Page
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, rotateY: 45 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -45 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-stretch min-h-0"
                  >
                    {renderContentPage(currentPage)}
                  </motion.div>
                ) : (
                  // Double Spread Layout (Left and Right pages open side-by-side)
                  <div className="w-full h-full min-h-0 grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-200 relative">
                    {/* Left Page (Page N) */}
                    <motion.div
                      key={`left-${currentPage}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="w-full h-full flex items-stretch min-h-0"
                    >
                      {renderContentPage(currentPage)}
                    </motion.div>

                    {/* Middle Book Spine binding visual effect */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-black/10 via-black/25 to-black/10 z-10 pointer-events-none" />

                    {/* Right Page (Page N+1) */}
                    <motion.div
                      key={`right-${currentPage + 1}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="w-full h-full flex items-stretch min-h-0"
                    >
                      {currentPage + 1 < totalPages 
                        ? renderContentPage(currentPage + 1)
                        : <div className="w-full h-full bg-slate-100 flex items-center justify-center border-l rounded-r-xl font-black text-xs text-slate-400">Back Cover</div>
                      }
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Corner Page Curl Visual Cue - Right Page (Bottom Right) */}
              {currentPage < totalPages - 1 && zoom === 1.0 && (
                <div 
                  onClick={(e) => { e.stopPropagation(); nextPage(); }}
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-40 group cursor-pointer pointer-events-auto"
                  title="Next Page (الصفحة التالية)"
                >
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 overflow-hidden rounded-bl-lg">
                    {/* Shadow behind fold */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] sm:border-t-[20px] border-t-indigo-950/40 border-r-[16px] sm:border-r-[20px] border-r-indigo-950/20 group-hover:border-t-[24px] sm:group-hover:border-t-[28px] group-hover:border-r-[24px] sm:group-hover:border-r-[28px] transition-all duration-300 rounded-bl shadow-lg" />
                    {/* Folding sheet part */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-b-[16px] sm:border-b-[20px] border-b-slate-100 border-l-[16px] sm:border-l-[20px] border-l-slate-200/80 group-hover:border-b-[24px] sm:group-hover:border-b-[28px] group-hover:border-l-[24px] sm:group-hover:border-l-[28px] transition-all duration-300 shadow-md" />
                  </div>
                </div>
              )}

              {/* Corner Page Curl Visual Cue - Left Page (Bottom Left) */}
              {currentPage > 0 && zoom === 1.0 && (
                <div 
                  onClick={(e) => { e.stopPropagation(); prevPage(); }}
                  className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-40 group cursor-pointer pointer-events-auto"
                  title="Previous Page (الصفحة السابقة)"
                >
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 overflow-hidden rounded-br-lg">
                    {/* Shadow behind fold */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] sm:border-t-[20px] border-t-indigo-950/40 border-l-[16px] sm:border-l-[20px] border-l-indigo-950/20 group-hover:border-t-[24px] sm:group-hover:border-t-[28px] group-hover:border-l-[24px] sm:group-hover:border-l-[28px] transition-all duration-300 rounded-br shadow-lg" />
                    {/* Folding sheet part */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-b-[16px] sm:border-b-[20px] border-b-slate-100 border-r-[16px] sm:border-r-[20px] border-r-slate-200/80 group-hover:border-b-[24px] sm:group-hover:border-b-[28px] group-hover:border-r-[24px] sm:group-hover:border-r-[28px] transition-all duration-300 shadow-md" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page navigator bar indicator */}
        <div className={`mt-4 flex flex-col items-center gap-1 ${isFullscreen ? "text-slate-300" : "text-slate-500"} font-bold text-xs`}>
          <p className={`uppercase text-[10px] tracking-widest ${isFullscreen ? "text-amber-400" : "text-indigo-900"} font-extrabold flex items-center gap-1`}>
            <Award className="w-3.5 h-3.5 text-amber-500" />
            {isUnitFocused 
              ? `Unit ${selectedUnitId} spread: Page ${currentPage === 0 ? "Cover" : currentPage} of 4`
              : `Active textbook spread: Page ${currentPage + 1} of ${totalPages}`
            }
          </p>
          <div className="flex gap-1.5 mt-2 max-w-full overflow-x-auto p-1 scrollbar-none">
            {Array.from({ length: isUnitFocused ? 3 : Math.ceil(totalPages / 2) }).map((_, spreadIdx) => {
              let pNum = 0;
              let isActive = false;
              if (isUnitFocused) {
                if (spreadIdx === 0) {
                  pNum = 0;
                  isActive = currentPage === 0;
                } else if (spreadIdx === 1) {
                  pNum = 1;
                  isActive = currentPage === 1 || currentPage === 2;
                } else {
                  pNum = 3;
                  isActive = currentPage === 3 || currentPage === 4;
                }
              } else {
                pNum = spreadIdx * 2;
                isActive = currentPage === pNum || currentPage === pNum + 1;
              }
              return (
                <button
                  key={spreadIdx}
                  onClick={() => setCurrentPage(pNum)}
                  className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all cursor-pointer ${
                    isActive 
                      ? "bg-amber-500 scale-125 ring-2 ring-indigo-900" 
                      : "bg-slate-300 hover:bg-indigo-300"
                  }`}
                  title={isUnitFocused 
                    ? (spreadIdx === 0 ? "Unit Cover" : `Lessons ${spreadIdx * 2 - 1}-${spreadIdx * 2}`)
                    : `Spread ${spreadIdx + 1}`
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
