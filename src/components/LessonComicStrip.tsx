import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, Sparkles, Smile, ArrowRight, ArrowLeft, HelpCircle, 
  BookOpen, Star, RefreshCw, Layers, MapPin, Award
} from "lucide-react";

interface LessonComicStripProps {
  unitId: number;
  lessonId: number;
  selectedLesson: any;
  onSpeak?: (text: string, voice?: string) => void;
  readingSpeed?: number;
}

// Custom Character Avatars with specific colors matching the Sudanese book
const CHARACTERS: Record<string, { name: string; avatar: string; color: string; bg: string }> = {
  Badr: { name: "Badr", avatar: "👨🏾", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-300" },
  Ahmed: { name: "Ahmed", avatar: "👦🏾", color: "text-blue-700", bg: "bg-blue-50 border-blue-300" },
  Cathy: { name: "Cathy", avatar: "👧🏼", color: "text-rose-700", bg: "bg-rose-50 border-rose-300" },
  Fatma: { name: "Fatma", avatar: "🧕🏾", color: "text-amber-700", bg: "bg-amber-50 border-amber-300" },
  Dalia: { name: "Dalia", avatar: "👧🏽", color: "text-purple-700", bg: "bg-purple-50 border-purple-300" },
  Eddie: { name: "Eddie", avatar: "👦🏼", color: "text-sky-700", bg: "bg-sky-50 border-sky-300" },
  "Mr Gamar": { name: "Mr. Gamar", avatar: "👨🏾‍🏫", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-300" },
  Amna: { name: "Mother Amna", avatar: "👩🏾‍🦱", color: "text-pink-700", bg: "bg-pink-50 border-pink-300" },
  Hassan: { name: "Hassan", avatar: "👦🏾", color: "text-teal-700", bg: "bg-teal-50 border-teal-300" },
  Hiba: { name: "Hiba", avatar: "👧🏾", color: "text-orange-700", bg: "bg-orange-50 border-orange-300" },
  Hamad: { name: "Hamad", avatar: "👦🏾", color: "text-violet-700", bg: "bg-violet-50 border-violet-300" },
  Reem: { name: "Reem", avatar: "👧🏽", color: "text-fuchsia-700", bg: "bg-fuchsia-50 border-fuchsia-300" },
  Teacher: { name: "Teacher", avatar: "👩🏾‍🏫", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-300" },
  General: { name: "Narrator", avatar: "📖", color: "text-slate-700", bg: "bg-slate-50 border-slate-300" }
};

export default function LessonComicStrip({ 
  unitId, 
  lessonId, 
  selectedLesson, 
  onSpeak, 
  readingSpeed = 1.0 
}: LessonComicStripProps) {
  const [activeBubbleIdx, setActiveBubbleIdx] = useState<number | null>(null);
  const [interactiveScore, setInteractiveScore] = useState(0);
  const [clickedElements, setClickedElements] = useState<Record<string, boolean>>({});

  // Self-contained sound speak utility
  const speakText = (text: string, voiceName?: string) => {
    if (onSpeak) {
      onSpeak(text);
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = readingSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  const markClicked = (key: string, textToSpeak: string, points = 5) => {
    if (!clickedElements[key]) {
      setClickedElements(prev => ({ ...prev, [key]: true }));
      setInteractiveScore(prev => prev + points);
    }
    speakText(textToSpeak);
  };

  // Helper to get character info safely
  const getChar = (speakerName: string) => {
    const trimmed = speakerName.trim();
    return CHARACTERS[trimmed] || CHARACTERS["General"];
  };

  // Dynamic Dialogue Generator for Comic Stories
  const getLessonDialogue = () => {
    if (selectedLesson?.content?.dialogue && selectedLesson.content.dialogue.length > 0) {
      return selectedLesson.content.dialogue;
    }

    const title = (selectedLesson?.title || "").toUpperCase();
    const type = selectedLesson?.type || "vocab";
    const letters = selectedLesson?.content?.letters || [];
    const vocabulary = selectedLesson?.content?.vocabulary || [];

    if (title.includes("NUMBER") || title.includes("COUNT") || title.includes("1 TO 4") || title.includes("5 TO 10")) {
      return [
        { speaker: "Badr", text: "Look Ahmed! Let's play a counting game. I have 1 apple 🍎 and 2 bags 🎒!" },
        { speaker: "Ahmed", text: "Awesome, Badr! And I see 3 cute cats 🐱 and 4 doors 🚪! One, two, three, four!" },
        { speaker: "Fatma", text: "Excellent counting, boys! We can also count up to 10! Five, six, seven, eight, nine, ten! 🔢" }
      ];
    }

    if (type === "phonics" || letters.length > 0 || title.includes("SOUND") || title.includes("PHONICS") || title.includes("LETTER")) {
      const letterStr = letters.length > 0 ? letters.join(" and ") : "our letters";
      return [
        { speaker: "Cathy", text: `Hello Eddie! Do you know how to write the letters: ${letterStr}? 📝` },
        { speaker: "Eddie", text: `Yes, Cathy! We draw them on the four workbook lines. Follow the yellow and blue bounce arrows! ✏️` },
        { speaker: "Teacher", text: `Superb! Remember kids: B is for Bag, and A is for Apple! Let's chant their sounds! 🗣️` }
      ];
    }

    if (type === "song" || title.includes("SONG") || title.includes("CHANT") || title.includes("SING")) {
      return [
        { speaker: "Hiba", text: "I love singing! Let's clap our hands 👏 and sing this beautiful Smile song together!" },
        { speaker: "Hamad", text: "Yes! Sing along with us and point to the words! It makes our English super strong! 🎶" }
      ];
    }

    if (vocabulary.length > 0) {
      const firstWords = vocabulary.slice(0, 2).map((v: any) => v.word).join(" and ");
      return [
        { speaker: "Fatma", text: `Hey Cathy! Let's practice speaking our new lesson words today: ${firstWords || "Smile words"}! 🗣️` },
        { speaker: "Cathy", text: `I love learning words! Let's tap on the cards below to hear Badr, Ahmed and Mr Gamar say them! 🌟` }
      ];
    }

    // Default high-quality fallback
    return [
      { speaker: "Badr", text: "Welcome to our English Smile lesson! Let's explore together! 🌍" },
      { speaker: "Ahmed", text: "Yes, Badr! Let's read, speak, and complete the fun workbook drawing! 🎨" }
    ];
  };

  // RENDER SPEECH BUBBLE COMIC PANELS
  const renderComicDialogues = () => {
    const dialogue = getLessonDialogue();
    if (dialogue.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-4">
        {dialogue.map((item: any, idx: number) => {
          const char = getChar(item.speaker);
          const isSelected = activeBubbleIdx === idx;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setActiveBubbleIdx(idx);
                speakText(`${item.speaker} says: ${item.text}`);
              }}
              className={`p-5 rounded-[24px] border-3 shadow-md flex flex-col justify-between cursor-pointer transition-all ${
                isSelected 
                  ? "bg-yellow-50 border-yellow-400 ring-4 ring-yellow-200/50" 
                  : "bg-white border-slate-900/10 hover:border-indigo-400"
              }`}
              id={`comic-bubble-${idx}`}
            >
              <div className="flex items-start gap-3">
                {/* Character Avatar */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl shrink-0 shadow-inner ${char.bg}`}>
                  {char.avatar}
                </div>

                {/* Text content & balloon shape */}
                <div className="flex-grow text-left relative">
                  <span className={`block text-[11px] font-black uppercase tracking-wider ${char.color} mb-1`}>
                    {char.name}
                  </span>
                  
                  {/* Comic speech bubble container */}
                  <div className="bg-slate-50/50 px-3.5 py-2.5 rounded-2xl border border-slate-100 text-xs font-bold text-slate-800 leading-relaxed shadow-sm">
                    {item.text}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-2 border-t border-dashed border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Click to Hear
                </span>
                <span>Sudan Pupil Book</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // CUSTOM LESSON LAYOUTS (Based on screenshots)
  
  // Unit 1 Lesson 1: Dialogue + Alphabet Grid
  const renderU1L1 = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    return (
      <div className="flex flex-col gap-6">
        {/* Shaking Hands Comic Header */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-4 border-emerald-950/20 p-5 rounded-[32px] flex flex-col md:flex-row items-center gap-6 shadow-md">
          <div className="text-6xl animate-bounce">🤝</div>
          <div className="text-left flex-1">
            <h4 className="font-black text-emerald-950 text-base leading-none mb-1.5">Welcome Comic: Shaking Hands 🤝</h4>
            <p className="text-xs font-bold text-emerald-800/80 leading-relaxed">
              Badr and Ahmed are making friends! Click their comic dialogue boxes above to hear them introduce themselves!
            </p>
          </div>
        </div>

        {/* Listen, chant and point (Alphabet Grid) */}
        <div className="bg-white border-4 border-slate-900 rounded-[32px] p-5 sm:p-6 shadow-lg">
          <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 mb-2 text-left">
            <span className="bg-[#ffea00] text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-slate-900">1</span>
            <span>Listen, chant and point! 🗣️👇</span>
          </h4>
          <p className="text-xs font-bold text-slate-500 mb-4 text-left pl-9 mt-[-4px]">
            Tap any letter in the Pupil Book alphabet box to speak its sound and learn!
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {letters.map((letter, idx) => {
              // Custom colors matching page 1
              const colors = [
                "bg-sky-400 border-sky-600",
                "bg-slate-200 border-slate-400",
                "bg-purple-300 border-purple-500",
                "bg-yellow-400 border-yellow-600",
                "bg-green-400 border-green-600",
                "bg-blue-500 border-blue-700 text-white",
                "bg-rose-300 border-rose-500"
              ];
              const cClass = colors[idx % colors.length];
              const isClicked = clickedElements[`letter-${letter}`];

              return (
                <motion.button
                  key={letter}
                  whileHover={{ scale: 1.12, rotate: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => markClicked(`letter-${letter}`, `${letter}. letter sound. ${letter}`, 5)}
                  className={`h-11 sm:h-14 rounded-xl border-3 border-b-6 border-slate-950 font-black text-base sm:text-xl uppercase transition-all flex items-center justify-center relative cursor-pointer ${cClass}`}
                >
                  {letter}
                  {isClicked && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[8px] border border-white font-bold">
                      ✓
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Unit 1 Lesson 2: Numbers 1 to 4 and point-and-say bags
  const renderU1L2 = () => {
    const countingItems = [
      { num: "1", word: "apple", emoji: "🍎", arabic: "تفاحة", sound: "One. apple." },
      { num: "2", word: "bag", emoji: "🎒", arabic: "حقيبة", sound: "Two. school bags." },
      { num: "3", word: "cat", emoji: "🐱", arabic: "قطة", sound: "Three. lovely cats." },
      { num: "4", word: "door", emoji: "🚪", arabic: "باب", sound: "Four. study doors." }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {countingItems.map((item) => {
            const isClicked = clickedElements[`num-${item.num}`];
            return (
              <motion.div
                key={item.num}
                whileHover={{ scale: 1.05 }}
                onClick={() => markClicked(`num-${item.num}`, item.sound, 10)}
                className={`p-4 bg-white border-3 border-slate-950 rounded-[24px] shadow-md flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  isClicked ? "bg-amber-50 border-amber-500" : "hover:border-indigo-400"
                }`}
              >
                <span className="text-3xl font-black text-indigo-950">{item.num}</span>
                <div className="text-4xl bg-slate-50 w-16 h-16 rounded-2xl border-2 border-slate-100 flex items-center justify-center shadow-inner">
                  {item.emoji}
                </div>
                <div className="text-center">
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-800">{item.word}</span>
                  <span className="text-[10px] font-bold text-amber-600">{item.arabic}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Point and Say Section */}
        <div className="bg-amber-50 border-4 border-amber-950/20 p-5 rounded-[32px] flex flex-col md:flex-row items-center gap-6 shadow-md text-left">
          <div className="text-5xl shrink-0">🧕🏾👆</div>
          <div className="flex-grow">
            <h4 className="font-black text-amber-950 text-base leading-none mb-1.5">Point and say: Bags! 🎒</h4>
            <p className="text-xs font-bold text-slate-600 leading-relaxed mb-3">
              Fatma is pointing to school backpacks. Click the bags below to hear them spoken!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => speakText("A bag.")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 border-b-4 border-indigo-800 text-white rounded-xl text-xs font-black uppercase cursor-pointer"
              >
                🎒 A bag
              </button>
              <button
                onClick={() => speakText("Two bags.")}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 border-b-4 border-pink-800 text-white rounded-xl text-xs font-black uppercase cursor-pointer"
              >
                🎒🎒 2 bags
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Unit 1 Lesson 3: Numbers 5 to 10
  const renderU1L3 = () => {
    const items = [
      { num: "5", word: "egg", emoji: "🥚", arabic: "بيضة", sound: "Five. egg." },
      { num: "6", word: "desk", emoji: "✍️", arabic: "مكتب", sound: "Six. study desk." },
      { num: "7", word: "fan", emoji: "💨", arabic: "مروحة", sound: "Seven. fan." },
      { num: "8", word: "gate", emoji: "🚪", arabic: "بوابة", sound: "Eight. gate." },
      { num: "9", word: "frog", emoji: "🐸", arabic: "ضفدع", sound: "Nine. frog." },
      { num: "10", word: "pen", emoji: "🖊️", arabic: "قلم", sound: "Ten. pen." }
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {items.map((item) => {
            const isClicked = clickedElements[`num-${item.num}`];
            return (
              <motion.div
                key={item.num}
                whileHover={{ scale: 1.05 }}
                onClick={() => markClicked(`num-${item.num}`, item.sound, 10)}
                className={`p-3 bg-white border-3 border-slate-950 rounded-[20px] shadow-sm flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  isClicked ? "bg-indigo-50 border-indigo-500" : "hover:border-indigo-400"
                }`}
              >
                <span className="text-xl font-black text-indigo-950">{item.num}</span>
                <div className="text-3xl bg-slate-50 w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner">
                  {item.emoji}
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-800 leading-none mb-0.5">{item.word}</span>
                  <span className="text-[9px] font-bold text-amber-600 leading-none">{item.arabic}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Unit 2 Lesson 5: Little Ali Storybook (lost Ali)
  const renderU2L5 = () => {
    const panels = [
      { id: "A", title: "Panel A: Little Ali", desc: "This is Little Ali at his home.", dialogue: "Hello! This is Little Ali.", emoji: "🏡" },
      { id: "B", title: "Panel B: 3 Monkeys", desc: "Ali meets 3 monkeys in the tree.", dialogue: "Hello, monkeys! - Hi, Ali!", emoji: "🐒" },
      { id: "C", title: "Panel C: 4 Hens", desc: "Ali greets 4 hens.", dialogue: "Hello, hens! - Hi, Ali!", emoji: "🐔" },
      { id: "D", title: "Panel D: 5 Frogs", desc: "Ali meets 5 frogs near the pool.", dialogue: "Hello, frogs! - Hi, Ali!", emoji: "🐸" },
      { id: "E", title: "Panel E: Ali is Lost", desc: "Ali is lost and sad under the stars.", dialogue: "I'm lost!", emoji: "⭐" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <h4 className="text-base font-black text-slate-950 text-left">
          📖 Sequential Comic Story: Little Ali gets Lost
        </h4>
        <p className="text-xs font-bold text-slate-500 mt-[-4px] text-left">
          Ali meets many helpful animals but gets lost. Click each story card to read and hear the dialogue!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {panels.map((p) => {
            const isClicked = clickedElements[`ali-${p.id}`];
            return (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => markClicked(`ali-${p.id}`, `${p.title}. ${p.desc}. Dialogue: ${p.dialogue}`, 15)}
                className={`p-4 rounded-[24px] border-3 border-slate-950 shadow-md text-left flex flex-col justify-between min-h-[180px] cursor-pointer transition-all ${
                  isClicked ? "bg-amber-50/50 border-amber-500" : "bg-white hover:border-indigo-400"
                }`}
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow mb-2">
                    {p.id}
                  </span>
                  <div className="text-4xl my-2">{p.emoji}</div>
                  <h5 className="font-black text-[11px] text-slate-800 leading-tight mb-1">{p.title}</h5>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">{p.desc}</p>
                </div>
                
                <div className="bg-white border-2 border-dashed border-slate-200 px-2 py-1.5 rounded-lg text-[10px] font-extrabold text-slate-800 leading-tight mt-3">
                  💬 {p.dialogue}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Unit 2 Lesson 6: Ali finding his way home
  const renderU2L6 = () => {
    const panels = [
      { id: "A", title: "Panel A: Asking Frogs", desc: "Ali asks frogs for direction.", dialogue: "Where is my house, frogs? - This way, Ali!", emoji: "🐸" },
      { id: "B", title: "Panel B: Asking Hens", desc: "Ali asks chickens.", dialogue: "Where is my house, hens? - This way, Ali!", emoji: "🐔" },
      { id: "C", title: "Panel C: Asking Monkeys", desc: "Ali asks monkeys.", dialogue: "Where is my house, monkeys? - This way, Ali!", emoji: "🐒" },
      { id: "D", title: "Panel D: Back with Mum", desc: "Ali finds his mother and is happy.", dialogue: "Hello, Ali! - Hello, mum!", emoji: "🧕🏾" }
    ];

    return (
      <div className="flex flex-col gap-6">
        <h4 className="text-base font-black text-slate-950 text-left">
          📖 Sequential Comic Story: Ali finds his House
        </h4>
        <p className="text-xs font-bold text-slate-500 mt-[-4px] text-left">
          The friendly animals guide Ali back to his beloved mother! Tap each panel to listen!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {panels.map((p) => {
            const isClicked = clickedElements[`ali6-${p.id}`];
            return (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => markClicked(`ali6-${p.id}`, `${p.title}. ${p.desc}. Dialogue: ${p.dialogue}`, 15)}
                className={`p-4 rounded-[24px] border-3 border-slate-950 shadow-md text-left flex flex-col justify-between min-h-[180px] cursor-pointer transition-all ${
                  isClicked ? "bg-emerald-50/50 border-emerald-500" : "bg-white hover:border-indigo-400"
                }`}
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow mb-2">
                    {p.id}
                  </span>
                  <div className="text-4xl my-2">{p.emoji}</div>
                  <h5 className="font-black text-[11px] text-slate-800 leading-tight mb-1">{p.title}</h5>
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">{p.desc}</p>
                </div>
                
                <div className="bg-white border-2 border-dashed border-slate-200 px-2 py-1.5 rounded-lg text-[10px] font-extrabold text-slate-800 leading-tight mt-3">
                  💬 {p.dialogue}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Fallback visual illustration panel (or extra point-and-say cards)
  const renderFallback = () => {
    const vocab = selectedLesson?.content?.vocabulary || [];
    const letters = selectedLesson?.content?.letters || [];
    const songText = selectedLesson?.content?.songText || "";
    
    return (
      <div className="flex flex-col gap-6 w-full mt-2">
        {/* Focus Letters */}
        {letters.length > 0 && (
          <div className="bg-white border-4 border-slate-900 rounded-[32px] p-5 shadow-sm text-left">
            <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2 mb-3">
              <span className="bg-yellow-400 text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-slate-900">✏️</span>
              <span>Focus Letters • حروف الدرس:</span>
            </h4>
            <div className="flex gap-4 flex-wrap">
              {letters.map((letItem: string) => (
                <div key={letItem} className="flex items-center gap-3 bg-indigo-50 border-2 border-indigo-200 px-5 py-2.5 rounded-2xl shadow-xs">
                  <span className="text-3xl font-black text-indigo-950 uppercase">{letItem}</span>
                  <span className="text-2xl font-black text-indigo-500 lowercase">{letItem}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vocabulary Cards */}
        {vocab.length > 0 && (
          <div className="bg-white border-4 border-slate-900 rounded-[32px] p-5 shadow-sm text-left">
            <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2 mb-4">
              <span className="bg-pink-400 text-white w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-slate-900">🎒</span>
              <span>Lesson Vocabulary • كلمات الدرس المصورة:</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vocab.map((item: any, idx: number) => {
                const isClicked = clickedElements[`fallback-vocab-${item.id}`];
                return (
                  <motion.div
                    key={item.id || idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => markClicked(`fallback-vocab-${item.id}`, `Vocabulary word. ${item.word}`, 10)}
                    className={`p-4 bg-slate-50 border-3 border-slate-950 rounded-[24px] flex flex-col items-center gap-2 cursor-pointer transition-all ${
                      isClicked ? "bg-amber-50 border-amber-500 ring-2 ring-amber-200" : "hover:border-indigo-400"
                    }`}
                  >
                    <div className="text-4xl bg-white w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center shadow-inner select-none">
                      {item.image || "🍎"}
                    </div>
                    <div className="text-center">
                      <span className="block text-xs font-black uppercase tracking-wider text-slate-800 leading-tight">{item.word}</span>
                      <span className="text-[10px] font-black text-amber-600 leading-tight">{item.arabic}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Song/Chant Panel */}
        {songText && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-4 border-purple-950/20 p-5 rounded-[32px] text-left shadow-xs">
            <h4 className="text-xs sm:text-sm font-black text-purple-950 flex items-center gap-2 mb-3">
              <span className="bg-purple-400 text-white w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-slate-900">🎵</span>
              <span>Let's Chant! • أنشودة الدرس:</span>
            </h4>
            <div className="bg-white/90 border-2 border-purple-100 p-4 rounded-2xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line shadow-inner max-h-52 overflow-y-auto">
              {songText}
            </div>
            <button
              onClick={() => speakText(`Let's sing! ${songText}`)}
              className="mt-3 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95 w-fit"
            >
              <Volume2 className="w-4 h-4" />
              <span>Sing Aloud • استمع للأنشودة</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Check the lesson code to decide which custom rendering block to use
  const getCustomRenderBlock = () => {
    if (unitId === 1 && lessonId === 1) return renderU1L1();
    if (unitId === 1 && lessonId === 2) return renderU1L2();
    if (unitId === 1 && lessonId === 3) return renderU1L3();
    if (unitId === 2 && lessonId === 5) return renderU2L5();
    if (unitId === 2 && lessonId === 6) return renderU2L6();
    return renderFallback();
  };

  return (
    <div className="w-full bg-[#fffcf5] border-4 border-amber-950/20 rounded-[36px] p-4 sm:p-6 shadow-xl text-slate-800 font-sans" id="lesson-comic-strip-root">
      {/* Textbook Lesson Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-dashed border-amber-900/10 pb-6 mb-6">
        {/* Left Side: Unit Info */}
        <div className="flex items-center gap-3 bg-white/80 px-4 py-2.5 rounded-[20px] border-2 border-amber-950/20 shadow-sm shrink-0">
          <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl font-bold text-slate-900 shadow-inner">
            😊
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PRIMARY SMILE</span>
            <span className="text-lg font-black text-indigo-950">Unit <span className="text-blue-600 font-extrabold text-xl">{unitId}</span></span>
          </div>
        </div>

        {/* Center Title */}
        <div className="bg-[#ffea00] border-2 border-slate-900 px-6 py-2.5 rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-1 shrink-0">
          <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight uppercase px-4 text-center select-none">
            {selectedLesson.title}
          </h2>
        </div>

        {/* Right Side: Comic Score Ribbon */}
        <div className="relative bg-gradient-to-r from-orange-400 to-amber-400 text-slate-950 border-2 border-slate-900 px-5 py-2 rounded-[16px] shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-bold text-center shrink-0">
          <span className="text-xs font-black uppercase tracking-wider block">Comic Score</span>
          <span className="text-sm block font-black leading-none text-slate-900">{interactiveScore} pts ⭐️</span>
        </div>
      </div>

      {/* CORE CARTOON COMIC DIALOGUES */}
      <div className="flex flex-col gap-6 text-left">
        <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
          <span className="bg-amber-400 text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-slate-900">📖</span>
          <span>Interactive Cartoon Comic Dialogues (القصص المصورة):</span>
        </h3>
        
        <p className="text-xs font-bold text-slate-500 mt-[-4px] pl-9">
          Tap the characters or speech bubbles to hear them speak in clear school audio!
        </p>
        {renderComicDialogues()}

        {/* CUSTOM LAYOUT BLOCK */}
        {getCustomRenderBlock()}
      </div>
    </div>
  );
}
