import React, { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Trash2, 
  BookOpen, 
  HelpCircle,
  Award,
  BookMarked,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { searchSMILECurriculum, SearchResult } from "../smartSearch";
import { Lesson, UnitItem, WordItem } from "../types";

interface SmartSearchBotProps {
  onSelectLesson: (lesson: Lesson, unitId: number) => void;
  speakText: (text: string, voiceName?: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  result?: SearchResult;
  timestamp: Date;
}

export default function SmartSearchBot({ 
  onSelectLesson, 
  speakText, 
  isOpen: controlledIsOpen, 
  setIsOpen: controlledSetIsOpen 
}: SmartSearchBotProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setLocalIsOpen;
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to the **SMILE English Smart Search Assistant**! 🧠✨\n\nI can help you find word meanings, explain grammar rules, learn about famous historical figures, and explore textbook lessons instantly and for free!\n\nFeel free to type your question, or click the **microphone 🎙️** to ask using your voice!",
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [botSoundEnabled, setBotSoundEnabled] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check speech recognition support (configured to listen to English speech input)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US"; // Configured to listen to English voice search input
      
      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          handleSearch(transcript);
        }
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle English voice synthesis for the chatbot responses
  const speakBotResponse = (text: string, englishTextOnly?: string) => {
    if (!botSoundEnabled) return;
    window.speechSynthesis.cancel();

    // Stop any HTML5 audio playback (e.g. from the main reading aloud lesson/song)
    document.querySelectorAll("audio").forEach((audio) => {
      try {
        audio.pause();
        audio.src = "";
      } catch (e) {
        // ignore
      }
    });

    // Use clean voice text, removing markdown syntax
    const textToSpeak = englishTextOnly || text.replace(/[*#`_]/g, "");
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith("en-")) || voices[0];
    if (enVoice) {
      utterance.voice = enVoice;
    }
    
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: searchQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery("");

    // Simulate thinking/searching delay
    setTimeout(() => {
      const searchResult = searchSMILECurriculum(searchQuery);
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: searchResult.reply,
        result: searchResult,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);

      // Speak the response voice text
      if (botSoundEnabled) {
        speakBotResponse(searchResult.reply, searchResult.voiceText);
      }
    }, 450);
  };

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Sorry, your browser doesn't support speech input right now, or microphone permissions are required.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel(); // Stop speaking before listening
      recognitionRef.current.start();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Chat cleared successfully! 🧼\n\nI'm ready for your new questions about the SMILE Grade 1 English textbook. Ask me anything!",
        timestamp: new Date()
      }
    ]);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="no-print relative z-50">
      {/* 1. Floating Action Button (FAB) */}
      <motion.button
        id="smart-search-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 text-white p-4 sm:p-5 rounded-full shadow-[0_10px_30px_rgba(79,70,229,0.4)] cursor-pointer flex items-center justify-center border-4 border-white select-none transition-shadow hover:shadow-[0_15px_35px_rgba(79,70,229,0.6)] group"
        title="Smart Curriculum Assistant"
      >
        <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-md">
          NEW ⚡
        </span>
        
        {isOpen ? (
          <X className="w-6 sm:w-7 h-6 sm:h-7" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-6 sm:w-7 h-6 sm:h-7 animate-pulse group-hover:scale-105" />
            <Sparkles className="absolute -bottom-1 -right-2 w-3.5 h-3.5 text-yellow-300" />
          </div>
        )}
      </motion.button>

      {/* 2. Interactive Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="smart-search-chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[440px] h-[580px] max-h-[80vh] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.22)] border-4 border-indigo-600/90 flex flex-col overflow-hidden z-50"
            style={{ direction: "ltr" }} // Configured to standard LTR for the English assistant
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white p-4 flex items-center justify-between border-b-2 border-indigo-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="text-left">
                  <h3 className="font-black text-sm sm:text-base leading-tight flex items-center gap-1.5">
                    SMILE Smart Search
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold text-indigo-100/80">Grade 1 English Assistant</p>
                </div>
              </div>

              {/* Utility Header Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setBotSoundEnabled(!botSoundEnabled)}
                  className={`p-2 rounded-xl transition-all ${botSoundEnabled ? "bg-white/15 text-white" : "bg-red-500/30 text-red-200"}`}
                  title={botSoundEnabled ? "Mute Bot" : "Unmute Bot"}
                >
                  {botSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white/90 hover:text-white"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                  title="Close Dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 select-all">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}>
                    {/* Bot avatar */}
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow shrink-0 mt-1">
                        🤖
                      </div>
                    )}

                    {/* Speech bubble */}
                    <div className={`max-w-[82%] p-3.5 rounded-[22px] text-xs sm:text-sm font-medium leading-relaxed shadow-sm border ${
                      msg.sender === "user" 
                        ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none border-indigo-600" 
                        : "bg-white text-slate-800 rounded-tl-none border-slate-100"
                    }`}>
                      {/* Formatted body text supporting markdown bullets and bold labels */}
                      <div className="space-y-1.5 whitespace-pre-wrap text-left select-all">
                        {msg.text.split("\n").map((line, lIdx) => {
                          if (line.trim().startsWith("•") || line.trim().startsWith("*")) {
                            return (
                              <div key={lIdx} className="flex gap-1.5 pl-2">
                                <span className="text-indigo-500 font-bold">•</span>
                                <span className="flex-1">{line.replace(/^[•*]\s*/, "")}</span>
                              </div>
                            );
                          }
                          
                          // Handle simple bold parsing `**text**` and code text `*text*`
                          const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
                          return (
                            <p key={lIdx}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return <strong key={pIdx} className="font-extrabold text-indigo-950 underline">{part.slice(2, -2)}</strong>;
                                }
                                if (part.startsWith("*") && part.endsWith("*")) {
                                  return <em key={pIdx} className="font-black italic text-slate-900 bg-amber-50 px-1 rounded">{part.slice(1, -1)}</em>;
                                }
                                if (part.startsWith("`") && part.endsWith("`")) {
                                  return <code key={pIdx} className="font-mono text-[11px] bg-slate-100 border border-slate-200 px-1 py-0.5 rounded text-rose-600 font-bold select-all">{part.slice(1, -1)}</code>;
                                }
                                return part;
                              })}
                            </p>
                          );
                        })}
                      </div>

                      {/* Footer time and manual speech trigger */}
                      <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100 text-[9px] font-bold text-slate-400">
                        <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.sender === "bot" && (
                          <button
                            onClick={() => speakBotResponse(msg.text, msg.result?.voiceText)}
                            className="p-1 rounded bg-slate-50 hover:bg-slate-100 text-indigo-600 flex items-center gap-1 transition-all"
                            title="Listen to response"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. Rich Curriculum Result Cards */}
                  {msg.result && (
                    <div className="ml-10 space-y-2.5 animate-fadeIn">
                      {/* Matched Words Details */}
                      {msg.result.matchedWords.map((word) => (
                        <div key={word.id} className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-200/60 shadow-sm space-y-1.5 text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-xl">{word.image}</span>
                            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">Syllabus Dictionary 📖</span>
                          </div>
                          <h4 className="font-black text-sm text-indigo-950">
                            {word.word} = <span className="text-indigo-600 font-bold">{word.arabic}</span>
                          </h4>
                          <p className="text-xs text-slate-400 font-bold italic">Example Sentence:</p>
                          <p className="text-[11px] sm:text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-100 leading-normal font-bold">
                            "{word.example}"
                          </p>
                          <div className="flex justify-start gap-1.5 pt-1">
                            <button
                              onClick={() => speakText(word.word)}
                              className="text-[10px] font-extrabold text-indigo-700 bg-white hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200 flex items-center gap-1 transition-all"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Pronounce Word</span>
                            </button>
                            <button
                              onClick={() => speakText(word.example)}
                              className="text-[10px] font-extrabold text-indigo-700 bg-white hover:bg-indigo-100 px-3 py-1 rounded-lg border border-indigo-200 flex items-center gap-1 transition-all"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Pronounce Sentence</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Matched Lessons Navigation Buttons */}
                      {msg.result.matchedLessons.map(({ lesson, unitId }) => (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson, unitId);
                            setIsOpen(false); // Close chatbot to focus on the book page
                          }}
                          className="w-full text-left bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between hover:border-emerald-400 hover:bg-emerald-100/50 transition-all shadow-sm group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded-lg bg-emerald-500 text-white shrink-0 group-hover:scale-110 transition-transform">
                              <BookOpen className="w-4 h-4" />
                            </span>
                            <div className="text-left">
                              <p className="text-[10px] font-black text-emerald-800 uppercase">Click to open this lesson now</p>
                              <h5 className="font-extrabold text-xs text-emerald-950">{lesson.title}</h5>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length > 0 && messages[messages.length - 1].result?.suggestions && (
              <div className="bg-white px-4 py-2 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0 select-none">
                {messages[messages.length - 1].result?.suggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSearch(sug.replace(/[🧪🍎🌱🗺️]/g, "").trim())}
                    className="shrink-0 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Bar and voice controller */}
            <div className="p-3 bg-white border-t-2 border-slate-100 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(query);
                }}
                className="flex gap-2 items-center"
              >
                {/* Voice Search Microphone button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 border relative ${
                    isListening 
                      ? "bg-red-500 text-white border-red-500 animate-pulse" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                  title={isListening ? "Listening... click to stop" : "Ask with your voice"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-600" />}
                  {isListening && (
                    <span className="absolute -inset-1 rounded-2xl border-4 border-red-300 animate-ping opacity-60 pointer-events-none" />
                  )}
                </button>

                {/* Text input box */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isListening ? "Listening... Speak now! 🎙️" : "Ask about any word or lesson..."}
                  disabled={isListening}
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder:text-slate-400 select-all"
                />

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className={`p-3 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                    query.trim() 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 cursor-pointer shadow-md" 
                      : "bg-slate-100 text-slate-300 border border-slate-200 pointer-events-none"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="text-[9px] text-center text-slate-400 font-bold mt-1.5">
                {speechSupported 
                  ? "💡 Click the mic to search or ask questions using your voice!" 
                  : "💡 Voice search is not supported by your current browser, but you can type!"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
