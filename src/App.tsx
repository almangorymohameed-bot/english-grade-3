import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Volume2, 
  Music, 
  Gamepad2, 
  Sparkles, 
  CheckCircle, 
  XSquare, 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  User, 
  Send, 
  Check, 
  VolumeX, 
  Clock, 
  Star, 
  Compass, 
  Smile, 
  SmilePlus, 
  Activity, 
  Grid,
  Play,
  Square,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Printer,
  Lock,
  Unlock,
  FileText,
  ChevronDown,
  ChevronUp,
  Settings,
  Smartphone,
  PenTool
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem, ChatMessage } from "./types";
import { generateQuiz } from "./quizGenerator";
import { generateSudanExams, ExamPaper } from "./examGenerator";
import SmartSearchBot from "./components/SmartSearchBot";
import { getCachedAudioUrl, saveAudioToCache } from "./utils/audioCache";
import OfflineManager from "./components/OfflineManager";
import InteractiveFlashcards from "./components/InteractiveFlashcards";
import WordSearchGame from "./components/WordSearchGame";
import EducationalGames from "./components/EducationalGames";
import DictationGame from "./components/DictationGame";
import LessonGrammar from "./components/LessonGrammar";
import InteractiveWord from "./components/InteractiveWord";
import LessonIllustration from "./components/LessonIllustration";
import LessonComicStrip from "./components/LessonComicStrip";
import { getLessonImageUrl, getLessonCartoonDesc } from "./utils/lessonImages";
import APKInstallPrompt from "./components/APKInstallPrompt";
import UnitActivities from "./components/UnitActivities";
import ClassroomInteractive from "./components/ClassroomInteractive";
import LessonFlipBook from "./components/LessonFlipBook";

interface SudaneseCharacter {
  avatar: string;
  bgClass: string;
  textColor: string;
}

function getSudaneseCharacter(speaker: string): SudaneseCharacter {
  const norm = speaker.trim().toLowerCase();
  
  if (norm.includes("einas")) {
    return {
      avatar: "👩🏾‍🎓",
      bgClass: "from-sky-100 to-indigo-100 border-indigo-300 text-indigo-900",
      textColor: "text-indigo-950"
    };
  }
  if (norm.includes("zeinab")) {
    return {
      avatar: "👩🏾‍🦱",
      bgClass: "from-rose-100 to-pink-100 border-rose-300 text-rose-900",
      textColor: "text-rose-950"
    };
  }
  if (norm.includes("khalifa")) {
    return {
      avatar: "👳🏾‍♂️",
      bgClass: "from-amber-100 to-yellow-100 border-amber-300 text-amber-900",
      textColor: "text-amber-950"
    };
  }
  if (norm.includes("osman")) {
    return {
      avatar: "🧔🏾‍♂️",
      bgClass: "from-teal-100 to-emerald-100 border-teal-300 text-teal-900",
      textColor: "text-teal-950"
    };
  }
  if (norm.includes("architect") || norm.includes("معماري")) {
    return {
      avatar: "👷🏾‍♂️",
      bgClass: "from-blue-100 to-sky-100 border-blue-300 text-blue-900",
      textColor: "text-blue-950"
    };
  }
  if (norm.includes("engineer") || norm.includes("مهندس")) {
    return {
      avatar: "👨🏾‍💻",
      bgClass: "from-purple-100 to-violet-100 border-purple-300 text-purple-950",
      textColor: "text-purple-950"
    };
  }
  if (norm.includes("worker") || norm.includes("عامل")) {
    return {
      avatar: "👨🏾‍🔧",
      bgClass: "from-orange-100 to-amber-100 border-orange-300 text-orange-950",
      textColor: "text-orange-950"
    };
  }
  if (norm.includes("ali")) {
    return {
      avatar: "👦🏾",
      bgClass: "from-sky-100 to-teal-100 border-sky-300 text-sky-900",
      textColor: "text-sky-950"
    };
  }
  if (norm.includes("tariq")) {
    return {
      avatar: "👦🏾",
      bgClass: "from-indigo-100 to-blue-100 border-indigo-300 text-indigo-900",
      textColor: "text-indigo-950"
    };
  }
  if (norm.includes("yasir")) {
    return {
      avatar: "🧔🏾‍♂️",
      bgClass: "from-emerald-100 to-teal-100 border-emerald-300 text-emerald-900",
      textColor: "text-emerald-950"
    };
  }
  if (norm.includes("matthew")) {
    return {
      avatar: "🧔🏼",
      bgClass: "from-slate-100 to-slate-200 border-slate-300 text-slate-800",
      textColor: "text-slate-900"
    };
  }
  if (norm.includes("hind") || norm.includes("teacher") || norm.includes("أستاذة") || norm.includes("mrs")) {
    return {
      avatar: "👩🏾‍🏫",
      bgClass: "from-fuchsia-100 to-purple-100 border-fuchsia-300 text-fuchsia-900",
      textColor: "text-fuchsia-950"
    };
  }
  if (norm.includes("lion")) {
    return {
      avatar: "🦁",
      bgClass: "from-amber-100 to-orange-100 border-amber-300 text-amber-900",
      textColor: "text-amber-950"
    };
  }
  if (norm.includes("hyena")) {
    return {
      avatar: "🐺",
      bgClass: "from-slate-200 to-slate-300 border-slate-400 text-slate-700",
      textColor: "text-slate-800"
    };
  }
  if (norm.includes("fox")) {
    return {
      avatar: "🦊",
      bgClass: "from-orange-100 to-yellow-100 border-orange-300 text-orange-900",
      textColor: "text-orange-950"
    };
  }
  if (norm.includes("robinson")) {
    return {
      avatar: "🧔",
      bgClass: "from-cyan-100 to-sky-100 border-cyan-300 text-cyan-900",
      textColor: "text-cyan-950"
    };
  }
  if (norm.includes("ahmed")) {
    return {
      avatar: "👦🏾",
      bgClass: "from-indigo-100 to-cyan-100 border-indigo-300 text-indigo-900",
      textColor: "text-indigo-950"
    };
  }
  if (norm.includes("bdr") || norm.includes("badr")) {
    return {
      avatar: "👶🏾",
      bgClass: "from-amber-100 to-orange-100 border-amber-200 text-amber-900",
      textColor: "text-amber-950"
    };
  }
  if (norm.includes("cathy")) {
    return {
      avatar: "👧🏼",
      bgClass: "from-pink-100 to-rose-100 border-pink-200 text-pink-900",
      textColor: "text-pink-950"
    };
  }

  return {
    avatar: "👩🏾",
    bgClass: "from-slate-50 to-slate-100 border-slate-300 text-slate-700",
    textColor: "text-slate-800"
  };
}

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState<UnitItem>(SMILE_UNITS[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(SMILE_UNITS[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<"book" | "dictionary" | "quiz" | "adventure" | "syllabus" | "print" | "game" | "dictation">("book");
  const [bookSection, setBookSection] = useState<"lessons" | "activities" | "flipbook">("lessons");
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(0);
  const [vocabMode, setVocabMode] = useState<"dictionary" | "flashcards">("dictionary");
  const [showUnitsList, setShowUnitsList] = useState(false);
  const [showSoundSettings, setShowSoundSettings] = useState(false);
  
  // Back button interception & Exit confirm state
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isSearchBotOpen, setIsSearchBotOpen] = useState(false);
  const [showInstallDetails, setShowInstallDetails] = useState(false);

  // A4 Printable Worksheet / Exam states
  const [watermarkRemoved, setWatermarkRemoved] = useState(false);
  const [watermarkPassword, setWatermarkPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [examScope, setExamScope] = useState<"all" | "unit" | "lesson">("all");
  const [examUnitId, setExamUnitId] = useState<number>(SMILE_UNITS[0].id);
  const [examLessonId, setExamLessonId] = useState<number>(SMILE_UNITS[0].lessons[0].id);
  const [examPapers, setExamPapers] = useState<ExamPaper[]>([]);
  const [selectedExamPassageIndex, setSelectedExamPassageIndex] = useState(0);

  // Interactive exam/worksheet solving states
  const [userAnswers, setUserAnswers] = useState<Record<string, {
    q1: Record<number, string>;
    q2a: Record<number, string>;
    q2b: Record<number, string>;
    q3: Record<number, string>;
    q4: Record<number, string>;
  }>>({});
  const [gradedPapers, setGradedPapers] = useState<Record<string, boolean>>({});

  // Dynamic exams generator hook
  useEffect(() => {
    const papers = generateSudanExams(
      pageCount,
      examScope,
      examScope === "all" ? undefined : examUnitId,
      examScope === "lesson" ? examLessonId : undefined
    );
    setExamPapers(papers);
    setUserAnswers({});
    setGradedPapers({});
  }, [pageCount, examScope, examUnitId, examLessonId]);

  // Sync state selections on navigation history with a ref to avoid stale closure values
  const stateRef = useRef({
    activeTab,
    selectedUnit,
    selectedLesson,
    isSearchBotOpen,
    showUnitsList,
    showSoundSettings,
    showExitConfirm,
    showInstallDetails
  });

  useEffect(() => {
    stateRef.current = {
      activeTab,
      selectedUnit,
      selectedLesson,
      isSearchBotOpen,
      showUnitsList,
      showSoundSettings,
      showExitConfirm,
      showInstallDetails
    };
  }, [activeTab, selectedUnit, selectedLesson, isSearchBotOpen, showUnitsList, showSoundSettings, showExitConfirm, showInstallDetails]);

  useEffect(() => {
    // Check if initial state is set
    if (!window.history.state) {
      window.history.replaceState({ isInitial: true, tab: "book" }, "");
      window.history.pushState({ tab: "book", unitId: SMILE_UNITS[0].id, lessonId: SMILE_UNITS[0].lessons[0].id }, "");
    }

    const handlePopState = (event: PopStateEvent) => {
      const { 
        activeTab: curTab, 
        selectedUnit: curUnit, 
        selectedLesson: curLesson,
        isSearchBotOpen: curBotOpen,
        showUnitsList: curUnitsOpen,
        showSoundSettings: curSoundOpen,
        showExitConfirm: curExitOpen,
        showInstallDetails: curInstallOpen
      } = stateRef.current;

      // 0. If installation details modal is open, back button closes it
      if (curInstallOpen) {
        setShowInstallDetails(false);
        window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
        return;
      }

      // 1. If Exit confirmation modal is open, back button closes it
      if (curExitOpen) {
        setShowExitConfirm(false);
        window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
        return;
      }

      // 2. If Smart Search Bot is open, back button closes it
      if (curBotOpen) {
        setIsSearchBotOpen(false);
        window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
        return;
      }

      // 3. If Units accordion/list is open, back button closes it
      if (curUnitsOpen) {
        setShowUnitsList(false);
        window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
        return;
      }

      // 4. If Sound Settings popup is open, back button closes it
      if (curSoundOpen) {
        setShowSoundSettings(false);
        window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
        return;
      }

      // 5. Otherwise, navigate back in history
      if (event.state) {
        const state = event.state;
        if (state.isInitial) {
          // Re-push state so page doesn't exit right away, and show Arabic confirmation dialog
          window.history.pushState({ tab: curTab, unitId: curUnit.id, lessonId: curLesson.id }, "");
          setShowExitConfirm(true);
        } else {
          if (state.tab) {
            setActiveTab(state.tab);
          }
          if (state.unitId) {
            const unit = SMILE_UNITS.find((u) => u.id === state.unitId);
            if (unit) setSelectedUnit(unit);
          }
          if (state.lessonId) {
            const unit = SMILE_UNITS.find((u) => u.id === (state.unitId || curUnit.id));
            if (unit) {
              const lesson = unit.lessons.find((l) => l.id === state.lessonId);
              if (lesson) setSelectedLesson(lesson);
            }
          }
        }
      } else {
        setShowExitConfirm(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Intercept beforeunload for safety on refresh or site leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Your points and progress will be lost.";
      return "Are you sure you want to leave? Your points and progress will be lost.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const scrollToWorkspace = () => {
    setTimeout(() => {
      const workspace = document.getElementById("main-workspace");
      if (workspace) {
        workspace.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const navigateToTab = (tab: "book" | "dictionary" | "quiz" | "adventure" | "syllabus" | "print" | "game" | "dictation") => {
    setActiveTab(tab);
    window.history.pushState({ tab, unitId: selectedUnit.id, lessonId: selectedLesson.id }, "");
    scrollToWorkspace();
  };

  const navigateToUnit = (unit: UnitItem) => {
    setSelectedUnit(unit);
    setSelectedLesson(unit.lessons[0]);
    // reset quiz index
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
    window.history.pushState({ tab: activeTab, unitId: unit.id, lessonId: unit.lessons[0].id }, "");
    scrollToWorkspace();
  };

  const navigateToLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
    window.history.pushState({ tab: activeTab, unitId: selectedUnit.id, lessonId: lesson.id }, "");
    scrollToWorkspace();
  };

  const navigateFull = (
    tab: "book" | "dictionary" | "quiz" | "adventure" | "syllabus" | "print" | "game" | "dictation",
    unit: UnitItem,
    lesson: Lesson
  ) => {
    setActiveTab(tab);
    setSelectedUnit(unit);
    setSelectedLesson(lesson);
    
    // reset quiz index
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);

    window.history.pushState({ tab, unitId: unit.id, lessonId: lesson.id }, "");
    scrollToWorkspace();
  };

  const handleRemoveWatermark = () => {
    // Obfuscating '20302060' to hide it from plain source code
    if (watermarkPassword === atob("MjAzMDIwNjA=")) {
      setWatermarkRemoved(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect passcode! Please enter the correct passcode to remove the watermark.");
    }
  };

  const handleAnswerChange = (
    paperId: string,
    questionType: "q1" | "q2a" | "q2b" | "q3" | "q4",
    idx: number,
    value: string
  ) => {
    setUserAnswers(prev => {
      const paperAns = prev[paperId] || { q1: {}, q2a: {}, q2b: {}, q3: {}, q4: {} };
      return {
        ...prev,
        [paperId]: {
          ...paperAns,
          [questionType]: {
            ...paperAns[questionType],
            [idx]: value
          }
        }
      };
    });
  };

  const checkComprehensionAnswer = (userAns: string, correctAns: string): boolean => {
    const user = userAns.trim().toLowerCase();
    const correct = correctAns.trim().toLowerCase();
    if (!user) return false;
    
    // Exact or partial direct match
    if (user === correct || (correct.includes(user) && user.length > 3)) return true;
    
    // Check key numbers
    const numbersInCorrect: string[] = correct.match(/\d+/g) || [];
    const numbersInUser: string[] = user.match(/\d+/g) || [];
    if (numbersInCorrect.length > 0) {
      if (numbersInCorrect.some(num => numbersInUser.includes(num))) return true;
    }
    
    // Core content words (remove stop words)
    const stopWords = new Set(["the", "and", "for", "with", "about", "was", "she", "they", "them", "did", "does", "what", "where", "why", "who", "how", "much", "many", "has", "got", "her", "his", "their", "are", "were", "into", "from", "in", "it", "to", "of", "on", "as", "by", "that", "this", "he", "is", "a", "an"]);
    const correctWords = correct
      .split(/[\s,.\-()?!'"]+/)
      .map(w => w.trim())
      .filter(w => w.length > 2 && !stopWords.has(w));
      
    if (correctWords.length === 0) return true;
    
    const matchedWords = correctWords.filter(w => user.includes(w));
    // If at least one or two core content words match, or 50% of them
    return matchedWords.length >= Math.min(1, Math.ceil(correctWords.length * 0.5));
  };

  const checkWritingAnswer = (userAns: string, correctAns: string): boolean => {
    const cleanUser = userAns.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ");
    const cleanCorrect = correctAns.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ");
    return cleanUser === cleanCorrect;
  };

  const calculatePaperScore = (examPaper: ExamPaper) => {
    const paperAns = userAnswers[examPaper.id] || { q1: {}, q2a: {}, q2b: {}, q3: {}, q4: {} };
    let score = 0;
    
    // Q1 Comprehension: 4 questions, 2 Marks each = 8 Marks
    examPaper.passage.questions.forEach((q, idx) => {
      const ans = paperAns.q1[idx] || "";
      if (q.isTrueFalse) {
        if (ans.trim().toLowerCase() === q.correctTF?.toLowerCase()) {
          score += 2;
        }
      } else {
        if (checkComprehensionAnswer(ans, q.answer)) {
          score += 2;
        }
      }
    });
    
    // Q2 Part A Spelling: 4 questions, 1 Mark each = 4 Marks
    examPaper.spelling.forEach((s, idx) => {
      const ans = paperAns.q2a[idx] || "";
      if (ans.trim().toUpperCase() === s.word.toUpperCase()) {
        score += 1;
      }
    });
    
    // Q2 Part B Vocab Matching: 5 questions, 1 Mark each = 5 Marks
    const sortedSentences = [...examPaper.vocabMatching]
      .sort((a, b) => a.definitionOrSentence.length - b.definitionOrSentence.length);
    
    examPaper.vocabMatching.forEach((vm, idx) => {
      const ans = paperAns.q2b[idx] || "";
      const correctIndex = sortedSentences.findIndex(item => item.definitionOrSentence === vm.definitionOrSentence);
      const correctLetter = String.fromCharCode(65 + correctIndex);
      if (ans.trim().toUpperCase() === correctLetter) {
        score += 1;
      }
    });
    
    // Q3 Grammar: 5 questions, 1 Mark each = 5 Marks
    examPaper.grammar.forEach((g, idx) => {
      const ans = paperAns.q3[idx] || "";
      if (ans === g.correct) {
        score += 1;
      }
    });
    
    // Q4 Writing: 2 questions, 4 Marks each = 8 Marks
    examPaper.writing.forEach((w, idx) => {
      const ans = paperAns.q4[idx] || "";
      if (checkWritingAnswer(ans, w.ordered)) {
        score += 4;
      }
    });
    
    return score;
  };

  const handleGenerateNewExam = () => {
    const nextIndex = selectedExamPassageIndex + 1;
    setSelectedExamPassageIndex(nextIndex);
    const papers = generateSudanExams(
      pageCount,
      examScope,
      examScope === "all" ? undefined : examUnitId,
      examScope === "lesson" ? examLessonId : undefined
    );
    setExamPapers(papers);
    setUserAnswers({});
    setGradedPapers({});
  };
  
  // Voice selection mode (Vibrant server-side AI Voice with zero-config HTML5 audio fallbacks)
  const [voiceMode, setVoiceMode] = useState<"system" | "gemini">("gemini");

  // Reading speed (0.5 to 2.0, default 0.85 as requested / moderately slow for children)
  const [readingSpeed, setReadingSpeed] = useState<number>(0.85);

  // Fullscreen state and handlers
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen:", err);
      });
    }
  };

  // Game states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizScoreFinished] = useState(false);
  const [points, setPoints] = useState(10);
  const [badges, setBadges] = useState<string[]>(["⭐️ First Explorer"]);

  // Custom configurable exam state
  const [quizScope, setQuizScope] = useState<"all" | "unit" | "lesson">("unit");
  const [quizSelectedUnitId, setQuizSelectedUnitId] = useState<number>(SMILE_UNITS[0].id);
  const [quizSelectedLessonId, setQuizSelectedLessonId] = useState<number>(SMILE_UNITS[0].lessons[0].id);
  const [quizQuestionCount, setQuizQuestionCount] = useState<number>(10);
  const [quizActiveQuestions, setQuizActiveQuestions] = useState<Array<{ question: string; answers: string[]; correctAnswer: string; badge: string }>>([]);
  const [quizIsConfiguring, setQuizIsConfiguring] = useState<boolean>(true);

  // Sync state selections on user interactions
  useEffect(() => {
    if (selectedUnit) {
      setQuizSelectedUnitId(selectedUnit.id);
      if (selectedUnit.lessons && selectedUnit.lessons.length > 0) {
        setQuizSelectedLessonId(selectedUnit.lessons[0].id);
      }
    }
  }, [selectedUnit]);

  useEffect(() => {
    if (selectedLesson) {
      setQuizSelectedLessonId(selectedLesson.id);
    }
  }, [selectedLesson]);

  const startCustomQuiz = () => {
    const questions = generateQuiz(quizScope, quizSelectedUnitId, quizSelectedLessonId, quizQuestionCount);
    setQuizActiveQuestions(questions);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizScoreFinished(false);
    setQuizIsConfiguring(false);
  };

  // Audio state
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [audioPlaybackActive, setAudioPlaybackActive] = useState(false);
  const [spokenWordIndex, setSpokenWordIndex] = useState<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const lastSpeakTimeRef = useRef<number>(0);
  const lastSpeakTextRef = useRef<string>("");
  const speechTimeoutRef = useRef<any>(null);
  const speechRequestIdRef = useRef<number>(0);

  // Word highlighting simulation for HTML Audio playback (when not using system voice)
  useEffect(() => {
    let intervalId: any = null;
    
    if (audioPlaybackActive && speakingText && voiceMode !== "system") {
      const audio = audioPlayerRef.current;
      if (audio) {
        const words = speakingText.split(/(\s+)/).filter(w => !/^\s+$/.test(w) && w.trim().length > 0);
        
        const updateSimulation = () => {
          if (!audio.duration || audio.duration === Infinity || isNaN(audio.duration)) {
            return;
          }
          const progress = audio.currentTime / audio.duration;
          const rawWordIndex = Math.floor(progress * words.length);
          const wordIdx = Math.min(words.length - 1, Math.max(0, rawWordIndex));
          setSpokenWordIndex(wordIdx);
        };

        intervalId = setInterval(updateSimulation, 50);
      }
    } else {
      setSpokenWordIndex(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [audioPlaybackActive, speakingText, voiceMode]);

  // Warm up system voices queue
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      // Bind event for asynchronously loaded voices
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }, []);

  // Interactive Dialogue Builder state (completely AI-free textbook game)
  const allBookDialogueLessons = SMILE_UNITS.flatMap((unit) => 
    (unit.lessons || [])
      .filter((l) => l.type === "conversation" && l.content && l.content.dialogue)
      .map((l) => ({
        unitId: unit.id,
        unitTitle: unit.title,
        lessonId: l.id,
        title: l.title,
        dialogue: l.content.dialogue || []
      }))
  );

  const [selectedDialogueIndex, setSelectedDialogueIndex] = useState<number>(0);
  const [scrambledLines, setScrambledLines] = useState<{ id: string; speaker: string; text: string; voice: string }[]>([]);
  const [arrangedLines, setArrangedLines] = useState<{ id: string; speaker: string; text: string; voice: string }[]>([]);
  const [dialogueCompleted, setDialogueCompleted] = useState(false);
  const [builderWrongSelectionId, setBuilderWrongSelectionId] = useState<string | null>(null);
  const [showTextbookGuide, setShowTextbookGuide] = useState(false);
  const [isPlayingEntireDialogue, setIsPlayingEntireDialogue] = useState(false);
  const [activeSpeakingLineIndex, setActiveSpeakingLineIndex] = useState<number | null>(null);
  
  const initDialogueBuilder = (index: number) => {
    const dialogueItem = allBookDialogueLessons[index];
    if (!dialogueItem) return;
    
    // Add unique index keys to avoid keys clashing if lines are identical
    const linesWithIds = dialogueItem.dialogue.map((line, idx) => ({
      ...line,
      id: `${dialogueItem.unitId}-${dialogueItem.lessonId}-${idx}`
    }));
    
    // Shuffle the lines
    const scrambled = [...linesWithIds].sort(() => Math.random() - 0.5);
    
    setSelectedDialogueIndex(index);
    setScrambledLines(scrambled);
    setArrangedLines([]);
    setDialogueCompleted(false);
    setBuilderWrongSelectionId(null);
    setShowTextbookGuide(false);
    setIsPlayingEntireDialogue(false);
    setActiveSpeakingLineIndex(null);
  };

  // Run initialization on activeTab change to adventure
  useEffect(() => {
    if (activeTab === "adventure") {
      initDialogueBuilder(selectedDialogueIndex);
    }
  }, [activeTab]);

  const getSpeakerEmoji = (speaker: string): string => {
    const s = speaker.toLowerCase();
    if (s.includes("ahmed") || s.includes("adil") || s.includes("badr") || s.includes("boy") || s.includes("hamad") || s.includes("ali") || s.includes("bassel") || s.includes("babar") || s.includes("adam")) {
      return "👦";
    }
    if (s.includes("cathy") || s.includes("fatma") || s.includes("dalia") || s.includes("rayan") || s.includes("girl") || s.includes("riba") || s.includes("hiba") || s.includes("reem")) {
      return "👧";
    }
    if (s.includes("hind") || s.includes("grandmother") || s.includes("amna") || s.includes("mother") || s.includes("mum") || s.includes("hen") || s.includes("cow") || s.includes("grandma")) {
      return "👩";
    }
    if (s.includes("gamar") || s.includes("man") || s.includes("policeman") || s.includes("officer") || s.includes("teacher") || s.includes("un") || s.includes("mr") || s.includes("fox")) {
      return "👨";
    }
    if (s.includes("monkey") || s.includes("sukkar")) {
      return "🐒";
    }
    if (s.includes("gonfooth")) {
      return "🦔";
    }
    if (s.includes("crocodile")) {
      return "🐊";
    }
    if (s.includes("fish")) {
      return "🐟";
    }
    return "✨";
  };

  const handleLineTap = (line: { id: string; speaker: string; text: string; voice: string }) => {
    const dialogueItem = allBookDialogueLessons[selectedDialogueIndex];
    if (!dialogueItem) return;

    // The correct line we expect next is:
    const expectedLineIndex = arrangedLines.length;
    const expectedLine = dialogueItem.dialogue[expectedLineIndex];

    if (line.text === expectedLine.text && line.speaker === expectedLine.speaker) {
      // Correct!
      const newArranged = [...arrangedLines, line];
      setArrangedLines(newArranged);
      setScrambledLines(scrambledLines.filter(item => item.id !== line.id));
      setBuilderWrongSelectionId(null);

      // Play audio
      speakText(line.text, line.voice);

      // Check completion
      if (newArranged.length === dialogueItem.dialogue.length) {
        setDialogueCompleted(true);
        setPoints(prev => prev + 15);
        if (points + 15 >= 75 && !badges.includes("🗣 Master Speaker")) {
          setBadges(prev => [...prev, "🗣 Master Speaker"]);
        }
      }
    } else {
      // Wrong choice
      setBuilderWrongSelectionId(line.id);
      speakText("Try again!", "Kore");
      setTimeout(() => setBuilderWrongSelectionId(null), 800);
    }
  };

  const playEntireShow = async () => {
    if (isPlayingEntireDialogue) return;
    setIsPlayingEntireDialogue(true);
    
    const dialogueItem = allBookDialogueLessons[selectedDialogueIndex];
    if (!dialogueItem) return;
    
    for (let i = 0; i < dialogueItem.dialogue.length; i++) {
      const line = dialogueItem.dialogue[i];
      setActiveSpeakingLineIndex(i);
      
      speakText(line.text, line.voice);
      const speedFactor = 0.85 / readingSpeed;
      const approxDuration = Math.max(2500 * speedFactor, (line.text.split(" ").length * 450 + 1200) * speedFactor);
      await new Promise(resolve => setTimeout(resolve, approxDuration));
    }
    
    setActiveSpeakingLineIndex(null);
    setIsPlayingEntireDialogue(false);
  };

  // Synchronize first lesson whenever unit changes
  const handleUnitSelect = (unit: UnitItem) => {
    navigateToUnit(unit);
    
    // Switch to "book" tab if the current tab is not unit-based
    if (!["book", "quiz", "game", "dictation"].includes(activeTab)) {
      setActiveTab("book");
    }

    // Smoothly scroll down to the main interactive workspace to bring relevant content into view
    setTimeout(() => {
      const workspace = document.getElementById("main-workspace");
      if (workspace) {
        workspace.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    navigateToLesson(lesson);
  };

  // Text-To-Speech function using full-stack API or speech synthesis fallback
  const speakText = (text: string, voiceName: string = "Kore") => {
    const now = Date.now();
    const cleanText = text.trim();

    // Prevent double voice activation / stuttering from touch + click events within 450ms
    if (cleanText === lastSpeakTextRef.current && now - lastSpeakTimeRef.current < 450) {
      return;
    }
    lastSpeakTimeRef.current = now;
    lastSpeakTextRef.current = cleanText;

    // Increment request ID to cancel/invalidate any currently running cascades
    speechRequestIdRef.current += 1;
    const currentRequestId = speechRequestIdRef.current;

    // If the exact same text is playing (after debounce window), toggle pause
    if (speakingText === cleanText && audioPlaybackActive) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = "";
      }
      window.speechSynthesis.cancel();
      setAudioPlaybackActive(false);
      setSpeakingText(null);
      setSpokenWordIndex(null);
      return;
    }

    // Cancel any previous audio immediately (prevents overlapping/stuck sounds)
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.src = "";
    }
    
    // Clear any scheduled speech synthesis timeout to prevent overlapping voices
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
    
    window.speechSynthesis.cancel();
    setSpokenWordIndex(null);

    setSpeakingText(cleanText);
    setAudioPlaybackActive(true);

    // If System Voice mode is selected, speak synchronously to guarantee user-gesture context is kept intact
    if (voiceMode === "system") {
      fallbackSpeechSynthesis(cleanText, currentRequestId);
      return;
    }

    // List of premium, super fast free client-side and server-side TTS providers
    const sources = [
      `/api/tts?text=${encodeURIComponent(cleanText)}`, // Server proxy self-healing endpoint (100% reliable, CORS-free, and chunked)
      `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=2`, // US English (Highly resilient & clears iframe barriers)
      `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanText)}`, // Google Translate Direct client-use
      `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&type=1` // UK English
    ];

    let currentSourceIndex = 0;

    const playNextSource = async () => {
      // Abort if this request has been superceded by a newer click/tap
      if (currentRequestId !== speechRequestIdRef.current) {
        return;
      }

      if (!audioPlayerRef.current) {
        fallbackSpeechSynthesis(cleanText, currentRequestId);
        return;
      }

      if (currentSourceIndex >= sources.length) {
        console.warn("All direct stream providers failed or timed out. Defaulting to local System voice.");
        if (currentRequestId === speechRequestIdRef.current) {
          fallbackSpeechSynthesis(cleanText, currentRequestId);
        }
        return;
      }

      const activeUrl = sources[currentSourceIndex];
      
      try {
        // 1. Check if we have this audio cached in our local Cache Storage
        const cachedBlobUrl = await getCachedAudioUrl(activeUrl);
        if (currentRequestId !== speechRequestIdRef.current) return;

        if (cachedBlobUrl) {
          audioPlayerRef.current.src = cachedBlobUrl;
        } else {
          // 2. If not cached, play from network and cache it in the background
          audioPlayerRef.current.src = activeUrl;
          
          fetch(activeUrl)
            .then(res => {
              if (res.ok) {
                saveAudioToCache(activeUrl, res);
              }
            })
            .catch(err => {
              console.warn(`[Audio Cache background fail] ${activeUrl}:`, err);
            });
        }
      } catch (err) {
        console.warn("Offline cache check failed, falling back to direct network load", err);
        if (currentRequestId !== speechRequestIdRef.current) return;
        audioPlayerRef.current.src = activeUrl;
      }
      
      audioPlayerRef.current.load(); // Prepare media decoder
      
      // Set the playback rate according to selected reading speed
      audioPlayerRef.current.playbackRate = readingSpeed;
      audioPlayerRef.current.onplay = () => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        if (audioPlayerRef.current) {
          audioPlayerRef.current.playbackRate = readingSpeed;
        }
      };

      audioPlayerRef.current.onended = () => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        setAudioPlaybackActive(false);
        setSpeakingText(null);
        setSpokenWordIndex(null);
      };

      audioPlayerRef.current.onerror = (e) => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        console.warn(`Source #${currentSourceIndex} (${activeUrl}) failed to load. Trying next provider.`);
        currentSourceIndex++;
        playNextSource();
      };

      const playPromise = audioPlayerRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (currentRequestId !== speechRequestIdRef.current) return;
          console.warn(`Autoplay or play issue with provider #${currentSourceIndex}:`, err);
          // Auto cascade to next source
          currentSourceIndex++;
          playNextSource();
        });
      }
    };

    try {
      playNextSource();
    } catch (err) {
      console.warn("Audio element play sequence crashed, reverting to local voice synthesizer:", err);
      if (currentRequestId === speechRequestIdRef.current) {
        fallbackSpeechSynthesis(cleanText, currentRequestId);
      }
    }
  };

  // Helper to map speechSynthesis onboundary charIndex to word index
  const getWordIndexFromCharIndex = (text: string, charIndex: number): number => {
    let currentPos = 0;
    let wordCount = 0;
    
    const parts = text.split(/(\s+)/);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (currentPos >= charIndex) {
        return Math.max(0, wordCount - 1);
      }
      currentPos += part.length;
      if (!/^\s+$/.test(part) && part.trim().length > 0) {
        wordCount++;
      }
    }
    return Math.max(0, wordCount - 1);
  };

  // Helper to get the word offset for a given line index in a multiline text
  const getLineWordOffset = (fullText: string, lineIndex: number): number => {
    const lines = fullText.split("\n");
    let wordOffset = 0;
    for (let i = 0; i < lineIndex; i++) {
      const lineWords = lines[i].split(/(\s+)/).filter(w => !/^\s+$/.test(w) && w.trim().length > 0);
      wordOffset += lineWords.length;
    }
    return wordOffset;
  };

  const fallbackSpeechSynthesis = (text: string, targetRequestId?: number) => {
    const currentRequestId = targetRequestId ?? speechRequestIdRef.current;

    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    window.speechSynthesis.cancel();
    
    // Slight delay of 60ms allows the browser synthesis engine to fully clear and release audio channels, preventing stuttering or overlapping sounds
    speechTimeoutRef.current = setTimeout(() => {
      if (currentRequestId !== speechRequestIdRef.current) {
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Choose high quality English voices to avoid reading English text with Arabic or System voices
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith("en-") && v.name.includes("Google")) 
          || voices.find(v => v.lang.startsWith("en-") && (v.name.includes("Microsoft") || v.name.includes("Natural")))
          || voices.find(v => v.lang.startsWith("en-")) 
          || voices[0];
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.lang = "en-US";
      utterance.rate = readingSpeed; // Speak according to selected reading speed
      
      utterance.onboundary = (event) => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        if (event.name === "word") {
          const wordIdx = getWordIndexFromCharIndex(text, event.charIndex);
          setSpokenWordIndex(wordIdx);
        }
      };

      utterance.onend = () => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        setAudioPlaybackActive(false);
        setSpeakingText(null);
        setSpokenWordIndex(null);
        speechTimeoutRef.current = null;
      };
      utterance.onerror = () => {
        if (currentRequestId !== speechRequestIdRef.current) return;
        setAudioPlaybackActive(false);
        setSpeakingText(null);
        setSpokenWordIndex(null);
        speechTimeoutRef.current = null;
      };
      window.speechSynthesis.speak(utterance);
    }, 60);
  };

  // Helper to render interactive text where clicking a word pronounces it
  const renderInteractiveText = (text: string, voiceName: string = "Kore", startWordOffset: number = 0) => {
    // Split by whitespace while preserving it, keeping track of indices
    const words = text.split(/(\s+)/);
    let wordCounter = 0;

    return words.map((word, idx) => {
      // If it's pure whitespace, just render it as is
      if (/^\s+$/.test(word)) {
        return <span key={idx}>{word}</span>;
      }
      
      // Clean word from common punctuations to read it clearly
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'•]/g, "").trim();
      if (!cleanWord) {
        return <span key={idx}>{word}</span>;
      }

      const currentWordGlobalIdx = startWordOffset + wordCounter;
      wordCounter++;

      const isHighlighted = speakingText !== null && 
        audioPlaybackActive && 
        (
          speakingText === cleanWord || 
          (speakingText.includes(text) && spokenWordIndex === currentWordGlobalIdx)
        );
      
      return (
        <InteractiveWord
          key={idx}
          word={word}
          cleanWord={cleanWord}
          voiceName={voiceName}
          isHighlighted={isHighlighted}
          speakText={speakText}
        />
      );
    });
  };

  const handleSearchLessonSelect = (lesson: Lesson, unitId: number) => {
    const targetUnit = SMILE_UNITS.find(u => u.id === unitId);
    if (targetUnit) {
      navigateFull("book", targetUnit, lesson);
      
      // Auto scroll lesson content into view
      setTimeout(() => {
        const bookView = document.getElementById("book-content-view");
        if (bookView) {
          bookView.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Vocabulary & Phonics Matching Game state
  const handleQuizAnswerSubmit = (ans: string, index: number, totalQuestions: number, quizList: any[]) => {
    setSelectedAnswer(ans);
    const correct = ans === quizList[index].correctAnswer;
    if (correct) {
      setQuizScore(prev => prev + 1);
      setPoints(prev => prev + 10);
      // Give confetti / popup badges logic
      if (points + 10 >= 100 && !badges.includes("🏆 Master Pupil")) {
        setBadges(prev => [...prev, "🏆 Master Pupil"]);
      }
    }

    setTimeout(() => {
      if (index + 1 < totalQuestions) {
        setCurrentQuizIndex(index + 1);
        setSelectedAnswer(null);
      } else {
        setQuizScoreFinished(true);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col font-sans select-none antialiased p-3 sm:p-6">
      {/* Top Header section in Bento grid style */}
      <header className="max-w-6xl w-full mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl animate-spin-slow">☀️</div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-sky-800 tracking-tight leading-none uppercase">SMILE English</h1>
            <p className="text-sky-600 font-bold text-sm sm:text-lg">Grade 3 Primary • Grade 3 SMILE 1 Companion</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {/* APK/PWA Mobile Installation Icon */}
          <button
            id="trigger-app-install-btn"
            onClick={() => setShowInstallDetails(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white px-5 py-3 rounded-[24px] shadow-md border-b-4 border-indigo-900 font-extrabold hover:from-sky-700 hover:to-indigo-700 active:scale-95 transition-all cursor-pointer relative animate-pulse"
            title="Install App on Phone"
          >
            <Smartphone className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span className="hidden sm:inline text-sm font-black">Install App 📲</span>
            {/* Glowing Dot Badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-500"></span>
            </span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-[24px] shadow-sm border-b-4 border-gray-200 text-sky-800 font-extrabold hover:bg-sky-50 active:scale-95 transition-all cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-5 h-5 text-sky-600 animate-pulse" />
                <span className="hidden sm:inline text-sm">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-5 h-5 text-sky-600" />
                <span className="hidden sm:inline text-sm">Fullscreen</span>
              </>
            )}
          </button>

          <div className="bg-white px-6 py-3 rounded-[24px] shadow-sm border-b-4 border-gray-200 flex items-center gap-2">
            <span className="text-2xl">⭐️</span>
            <span className="text-lg sm:text-xl font-black text-amber-500">{points} Points</span>
          </div>
          <div className="w-14 h-14 bg-purple-500 rounded-2xl border-b-4 border-purple-700 flex items-center justify-center text-2xl text-white font-bold cursor-pointer hover:scale-105 transition-transform" onClick={() => setPoints(prev => prev + 5)}>👦</div>
        </div>
      </header>

      {/* APK & PWA Installation Section */}
      <APKInstallPrompt isOpen={showInstallDetails} onClose={() => setShowInstallDetails(false)} />

      {/* Main Container Grid */}
      <div className="max-w-6xl w-full mx-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Rail / Left bar - list of book units as beautiful compact Bento tiles */}
        <aside className="lg:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-8 border-r-8 border-sky-100 flex flex-col gap-4">
            <button
              onClick={() => setShowUnitsList(!showUnitsList)}
              className="w-full text-left flex items-center justify-between border-b border-slate-100 pb-2 cursor-pointer group select-none"
              id="units-list-toggle"
            >
              <h2 className="text-xs font-black text-sky-800 uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-500" />
                SMILE Units • Student Book Chapters
              </h2>
              <div className="flex items-center gap-1.5">
                {!showUnitsList && (
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Tap to view
                  </span>
                )}
                {showUnitsList ? (
                  <ChevronUp className="w-4 h-4 text-sky-500 transition-transform group-hover:scale-110" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-sky-500 transition-transform group-hover:scale-110" />
                )}
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {showUnitsList && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-3 max-h-[340px] lg:max-h-[none] overflow-y-auto pr-1 overflow-hidden"
                >
                  {SMILE_UNITS.map((u) => {
                    const isSelected = selectedUnit.id === u.id;
                    return (
                      <motion.button
                        key={u.id}
                        onClick={() => {
                          handleUnitSelect(u);
                          setShowUnitsList(false);
                        }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full text-left p-3.5 rounded-[24px] border-b-4 transition-all flex items-start gap-3 relative cursor-pointer ${
                          isSelected 
                            ? `${u.color} shadow-md border-amber-600 font-bold text-amber-950` 
                            : "bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700"
                        }`}
                      >
                        <span className="text-3xl pt-0.5">{u.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-75">Unit {u.id}</div>
                          <div className="text-[13px] truncate leading-tight font-black uppercase text-sky-950">{u.title}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sound & Pronunciation Settings Widget */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-8 border-r-8 border-indigo-100 flex flex-col gap-3">
            <button
              onClick={() => setShowSoundSettings(!showSoundSettings)}
              className="w-full text-left flex items-center justify-between border-b border-slate-100 pb-2 cursor-pointer group select-none"
              id="sound-settings-toggle"
            >
              <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5">
                <Settings className={`w-4 h-4 text-indigo-500 transition-transform duration-500 ${showSoundSettings ? "rotate-90" : ""}`} />
                Sound Settings • Voice Engine
              </h3>
              <div className="flex items-center gap-1.5">
                {!showSoundSettings && (
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    Tap to open
                  </span>
                )}
                {showSoundSettings ? (
                  <ChevronUp className="w-4 h-4 text-indigo-500 transition-transform group-hover:scale-110" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-indigo-500 transition-transform group-hover:scale-110" />
                )}
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {showSoundSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  <p className="text-[11px] font-extrabold text-slate-500 leading-snug">
                    The read-aloud voice system is fully integrated! If you experience any playback issues, you can switch between the sound modes below and test using the button:
                  </p>

                  <div className="flex flex-col gap-2 mt-1">
                    <button
                      onClick={() => setVoiceMode("gemini")}
                      className={`w-full text-left p-3 rounded-[16px] border-b-4 transition-all flex items-center justify-between cursor-pointer ${
                        voiceMode === "gemini"
                          ? "bg-indigo-600 border-indigo-800 text-white font-black"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-md">✨</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] leading-tight">Embedded Voice (Free & Fast)</span>
                          <span className="text-[10px] opacity-80 leading-tight">High Quality AI Voice (Recommended)</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setVoiceMode("system")}
                      className={`w-full text-left p-3 rounded-[16px] border-b-4 transition-all flex items-center justify-between cursor-pointer ${
                        voiceMode === "system"
                          ? "bg-indigo-600 border-indigo-800 text-white font-black"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-md">⚡</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] leading-tight">Device System Voice</span>
                          <span className="text-[10px] opacity-80 leading-tight">Standard Browser Voice (Offline Fallback)</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Reading Speed Controller */}
                  <div className="bg-slate-50 p-4 rounded-[20px] border border-slate-100 flex flex-col gap-2.5 mt-1">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1 text-indigo-950">
                        ⏱️ Reading Speed
                      </span>
                      <span className="text-xs font-black px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-lg">
                        {readingSpeed}x
                      </span>
                    </div>

                    {/* Preset Segmented Buttons */}
                    <div className="grid grid-cols-5 gap-1 bg-white p-1 rounded-xl border border-slate-100">
                      {[
                        { label: "Slow", value: 0.6 },
                        { label: "Calm", value: 0.75 },
                        { label: "Relaxed", value: 0.85 },
                        { label: "Normal", value: 1.0 },
                        { label: "Fast", value: 1.2 }
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => setReadingSpeed(preset.value)}
                          className={`py-1.5 px-0.5 rounded-lg text-[10px] font-black transition-all cursor-pointer text-center leading-none ${
                            readingSpeed === preset.value
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="block mb-0.5">{preset.value}x</span>
                          <span className="text-[8px] opacity-90">{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Fine-Tuning Slider */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-400">0.5x</span>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.05"
                        value={readingSpeed}
                        onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
                        className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-slate-400">1.5x</span>
                    </div>
                  </div>

                  <button
                    onClick={() => speakText("Welcome to SMILE English, Grade 3 primary student! As-salamu alaykum!", "Kore")}
                    className="mt-1 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase py-3 px-4 rounded-[16px] border-b-4 border-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer transform active:translate-y-0.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Test & Play Word Sounds</span>
                  </button>

                  {/* Offline pre-download & cache dashboard */}
                  <div className="mt-2 border-t border-slate-100 pt-3">
                    <OfflineManager currentUnit={selectedUnit} allUnits={SMILE_UNITS} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Award achievements section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-sm border border-amber-100/50">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2.5 flex items-center gap-1">
              🏆 My Badges ({badges.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((b, idx) => (
                <span 
                  key={idx} 
                  className="bg-white border border-amber-200 text-xs px-2.5 py-1 rounded-full text-amber-800 shadow-sm font-semibold flex items-center gap-1 animate-bounce"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Central interactive screen workspace */}
        <main id="main-workspace" className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Main Interactive Sub-tabs selection - Bento Style */}
          <div className="bg-white rounded-[32px] p-2 shadow-sm border-b-6 border-sky-100 flex flex-wrap gap-1.5 no-print">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("book")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "book"
                  ? "bg-sky-500 text-white border-b-4 border-sky-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-sky-900 font-bold"
              }`}
            >
              <BookOpen className="w-5 h-5 mb-0.5" />
              <span>Pupil's Book</span>
              <span className="text-[10px] opacity-80 font-bold">Study & Sing</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("dictionary")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "dictionary"
                  ? "bg-amber-400 text-white border-b-4 border-amber-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-amber-900 font-bold"
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span>Vocabulary</span>
              <span className="text-[10px] opacity-80 font-bold">Word Definitions</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("quiz")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "quiz"
                  ? "bg-emerald-400 text-white border-b-4 border-emerald-600 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-emerald-950 font-bold"
              }`}
            >
              <Gamepad2 className="w-5 h-5 mb-0.5" />
              <span>Quiz Games</span>
              <span className="text-[10px] opacity-80 font-bold">Play and Score</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("game")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "game"
                  ? "bg-violet-500 text-white border-b-4 border-violet-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-violet-950 font-bold"
              }`}
            >
              <Sparkles className="w-5 h-5 mb-0.5" />
              <span>Interactive Games</span>
              <span className="text-[10px] opacity-80 font-bold">SMILE Playroom</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("dictation")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "dictation"
                  ? "bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-indigo-950 font-bold"
              }`}
            >
              <PenTool className="w-5 h-5 mb-0.5" />
              <span>Spelling Dictation</span>
              <span className="text-[10px] opacity-80 font-bold">Interactive Spelling</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("adventure")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "adventure"
                  ? "bg-purple-500 text-white border-b-4 border-purple-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-purple-950 font-bold"
              }`}
            >
              <Smile className="w-5 h-5 mb-0.5" />
              <span>AI Chat Partner</span>
              <span className="text-[10px] opacity-80 font-bold">Speaking Area</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("syllabus")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "syllabus"
                  ? "bg-rose-500 text-white border-b-4 border-rose-700 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-rose-950 font-bold"
              }`}
            >
              <Grid className="w-5 h-5 mb-0.5" />
              <span>Syllabus Map</span>
              <span className="text-[10px] opacity-80 font-bold">Book Outline</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToTab("print")}
              className={`flex-1 min-w-[110px] py-4 px-3 rounded-[24px] font-black text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === "print"
                  ? "bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-md"
                  : "bg-transparent hover:bg-slate-100/85 text-indigo-950 font-bold"
              }`}
            >
              <Printer className="w-5 h-5 mb-0.5 text-indigo-500 group-hover:text-white" />
              <span>A4 Worksheets</span>
              <span className="text-[10px] opacity-80 font-bold">Sudan Exam</span>
            </motion.button>
          </div>

          {/* ACTIVE CONTENT WORKSPACE AREA WITH BENTO STYLING AND GRAPHICS */}
          <div className="bg-white rounded-[40px] p-6 sm:p-8 shadow-sm border-b-8 border-r-8 border-sky-100/80 flex-grow relative overflow-hidden min-h-[480px]">
            
            <AnimatePresence mode="wait">
              {/* TAB 1: PUPIL BOOK READER */}
              {activeTab === "book" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  {/* Lessons vs Activities Segmented Controller */}
                  <div className="flex justify-center w-full no-print">
                    <div className="flex bg-slate-100 p-1.5 rounded-[24px] w-full max-w-xl shadow-xs border border-slate-200/50">
                      <button
                        onClick={() => setBookSection("lessons")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-[18px] text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          bookSection === "lessons"
                            ? "bg-sky-500 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span>📖 Lessons</span>
                      </button>
                      <button
                        onClick={() => setBookSection("flipbook")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-[18px] text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          bookSection === "flipbook"
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span>📘 Flip Book</span>
                      </button>
                      <button
                        onClick={() => setBookSection("activities")}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-[18px] text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          bookSection === "activities"
                            ? "bg-amber-400 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <span>✏️ Activities</span>
                      </button>
                    </div>
                  </div>

                  {bookSection === "lessons" && (
                    <>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-sky-50/50 p-5 rounded-[32px] border-b-6 border-r-6 border-sky-100">
                        <div>
                          <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            Unit {selectedUnit.id} • {selectedUnit.title}
                          </span>
                          <h3 className="text-xl font-black text-sky-950 uppercase mt-1 tracking-tight">
                            Interactive Lesson Space
                          </h3>
                        </div>
                        {/* Lesson tabs list inside selected unit - Bento-style */}
                        <div className="flex flex-wrap gap-2">
                          {selectedUnit.lessons.map((l) => (
                            <button
                              key={l.id}
                              onClick={() => handleLessonSelect(l)}
                              className={`px-4 py-2.5 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all border-b-4 border-r-4 cursor-pointer transform hover:scale-[1.03] ${
                                selectedLesson.id === l.id
                                  ? "bg-sky-500 text-white border-sky-700"
                                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
                              }`}
                            >
                              Lesson {l.id}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-6 sm:p-8 rounded-[40px] border-b-8 border-r-8 border-indigo-100 flex flex-col gap-4 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-100">
                          <h4 className="text-lg font-black text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
                            {selectedLesson.type === "song" && <Music className="w-5 h-5 text-indigo-500" />}
                            {selectedLesson.type === "conversation" && <Volume2 className="w-5 h-5 text-indigo-500" />}
                            {selectedLesson.type === "phonics" && <Sparkles className="w-5 h-5 text-indigo-500" />}
                            {selectedLesson.title}
                          </h4>
                          <div className="flex items-center gap-3 flex-wrap">
                            {/* Compact Speed Selector */}
                            <div className="bg-indigo-50/60 border border-indigo-100 p-1.5 rounded-[16px] flex items-center gap-2 shadow-xs">
                              <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest pl-1 flex items-center gap-1">
                                ⏱️ Reading Speed:
                              </span>
                              <div className="flex gap-1">
                                {[
                                  { label: "Slow", value: 0.6 },
                                  { label: "Normal", value: 0.85 },
                                  { label: "Natural", value: 1.0 },
                                  { label: "Fast", value: 1.2 }
                                ].map((speedItem) => (
                                  <button
                                    key={speedItem.value}
                                    onClick={() => setReadingSpeed(speedItem.value)}
                                    className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                                      readingSpeed === speedItem.value
                                        ? "bg-indigo-600 text-white shadow-xs"
                                        : "text-indigo-950 bg-white hover:bg-indigo-100/50 border border-indigo-100/40"
                                    }`}
                                  >
                                    {speedItem.label} ({speedItem.value}x)
                                  </button>
                                ))}
                              </div>
                            </div>

                            <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                              {selectedLesson.type}
                            </span>
                          </div>
                        </div>

                        {selectedUnit.id === 5 && selectedLesson.id === 1 ? (
                          <ClassroomInteractive onSpeak={(t) => speakText(t)} readingSpeed={readingSpeed} />
                        ) : (
                          <>
                            {/* Interactive Cartoon Comic Strip (القصص المصورة) */}
                            <LessonComicStrip 
                              unitId={selectedUnit.id} 
                              lessonId={selectedLesson.id} 
                              selectedLesson={selectedLesson} 
                              onSpeak={(t, v) => speakText(t)} 
                              readingSpeed={readingSpeed} 
                            />

                            {/* Contextual Educational Lesson Cartoon Illustration Card */}
                            <div className="mt-6">
                              <LessonIllustration unitId={selectedUnit.id} lessonId={selectedLesson.id} title={selectedLesson.title} />
                            </div>

                        {/* Interactive Word Reader Guidance Banner */}
                        {(selectedLesson.type === "song" || selectedLesson.type === "vocab" || selectedLesson.type === "conversation" || selectedLesson.type === "phonics") && (
                          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-indigo-100 rounded-2xl p-3 flex items-center gap-2.5 text-xs font-bold text-indigo-900 justify-center shadow-sm">
                            <span className="text-base animate-pulse">🔊</span>
                            <span className="text-center">
                              <span className="text-sky-700">Click any word to hear its pronunciation!</span>
                            </span>
                          </div>
                        )}

                        {/* Lesson Song chant / Reading text layout */}
                        {(selectedLesson.type === "song" || selectedLesson.type === "vocab" || selectedLesson.type === "phonics") && selectedLesson.content.songText && (
                          <div className="bg-indigo-50 p-6 sm:p-8 rounded-[32px] border-b-4 border-r-4 border-indigo-200 flex flex-col items-center text-center gap-5">
                            <span className="text-5xl animate-bounce">
                              {selectedLesson.type === "song" ? "🎵" : selectedLesson.type === "phonics" ? "🗣️" : "📖"}
                            </span>
                            <div className="max-w-2xl mx-auto text-left w-full">
                              {selectedLesson.content.songText.split("\n").map((line, idx) => {
                                const offset = getLineWordOffset(selectedLesson.content.songText || "", idx);
                                if (line.trim().startsWith("•")) {
                                  return (
                                    <div key={idx} className="text-md sm:text-lg font-black text-indigo-950 leading-relaxed pl-4 border-l-4 border-indigo-400 my-2">
                                      {renderInteractiveText(line.trim(), "Kore", offset)}
                                    </div>
                                  );
                                }
                                return (
                                  <div key={idx} className={`text-md sm:text-lg font-black text-indigo-950 leading-relaxed ${selectedLesson.type === "song" ? "text-center italic" : "text-left"} my-2`}>
                                    {renderInteractiveText(line, "Kore", offset)}
                                  </div>
                                );
                              })}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => speakText(selectedLesson.content.songText || "")}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-4 px-8 rounded-[24px] shadow-[0_5px_0_0_#4338ca] hover:shadow-[0_2px_0_0_#4338ca] transition-all flex items-center justify-center gap-2 transform active:translate-y-1 cursor-pointer"
                            >
                              {speakingText === selectedLesson.content.songText && audioPlaybackActive ? (
                                <>
                                  <VolumeX className="w-5 h-5 animate-spin" />
                                  <span>{selectedLesson.type === "song" ? "Stop Singing" : "Stop Reading"}</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-5 h-5" />
                                  <span>{selectedLesson.type === "song" ? "Listen and Sing! 🎙" : "Listen & Read Aloud! 🔊"}</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        )}

                        {/* Lesson conversation dialogue layout */}
                        {selectedLesson.type === "conversation" && selectedLesson.content.dialogue && (
                          <div className="flex flex-col gap-4 max-w-xl mx-auto w-full mt-2">
                            {selectedLesson.content.dialogue.map((line, key) => {
                              const isSpecial = line.speaker === "Mrs. Hind" || line.speaker === "Mrs Hind" || line.speaker === "Teacher" || line.speaker === "Policeman";
                              const isPlaying = speakingText === line.text && audioPlaybackActive;
                              const sChar = getSudaneseCharacter(line.speaker);
                              return (
                                <div 
                                  key={key} 
                                  className={`flex items-start gap-3 w-full ${isSpecial ? "flex-row-reverse" : ""}`}
                                >
                                  <div className={`p-2.5 rounded-[22px] shadow-sm border-2 flex items-center justify-center select-none shrink-0 bg-gradient-to-br ${sChar.bgClass} w-16 h-16`}>
                                    <div className="text-3xl filter drop-shadow-sm">{sChar.avatar}</div>
                                  </div>
                                  <motion.div 
                                    onClick={() => speakText(line.text, line.voice)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 p-5 rounded-[24px] shadow-sm border-b-6 border-r-6 cursor-pointer transition-all ${
                                      isSpecial 
                                        ? isPlaying 
                                          ? "bg-amber-100/90 border-amber-400 text-amber-950" 
                                          : "bg-amber-50/60 border-amber-200 hover:border-amber-400 text-slate-800"
                                        : isPlaying 
                                          ? "bg-sky-100/90 border-sky-400 text-sky-950" 
                                          : "bg-slate-50/70 border-slate-200 hover:border-sky-400 text-slate-800"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <span>{line.speaker}</span>
                                      </span>
                                      <div className="text-slate-400 p-1">
                                        {isPlaying ? (
                                          <VolumeX className="w-5 h-5 text-red-500 animate-pulse" />
                                        ) : (
                                          <Volume2 className="w-5 h-5 text-slate-500 hover:scale-110 transition-transform" />
                                        )}
                                      </div>
                                    </div>
                                    <div 
                                      className="text-[16px] font-black leading-snug"
                                      onClick={(e) => e.stopPropagation()}
                                      onTouchStart={(e) => e.stopPropagation()}
                                      onTouchEnd={(e) => e.stopPropagation()}
                                    >
                                      {renderInteractiveText(line.text, line.voice)}
                                    </div>
                                  </motion.div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Lesson Phonics list */}
                        {selectedLesson.type === "phonics" && selectedLesson.content.letters && (
                          <div className="flex flex-col gap-6 text-center">
                            <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                              {selectedLesson.content.letters.map((l) => (
                                <motion.button
                                  key={l}
                                  onClick={() => speakText(`Letter ${l} says, /${l}/ pronunciation`, "Zephyr")}
                                  whileHover={{ scale: 1.1, rotate: 2 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-20 h-20 rounded-[24px] bg-white hover:bg-slate-50 border-b-6 border-r-6 border-slate-300 shadow-sm flex flex-col items-center justify-center transition-all cursor-pointer group"
                                >
                                  <span className="text-4xl font-black text-sky-500 uppercase group-hover:text-indigo-600 leading-none">{l}</span>
                                  <span className="text-[10px] text-slate-400 font-extrabold italic uppercase mt-1">say /{l}/</span>
                                </motion.button>
                              ))}
                            </div>

                            <p className="text-xs text-sky-700 font-bold bg-sky-50 inline-block py-2 px-4 rounded-full max-w-sm mx-auto">💡 Click each letter box to hear how it sounds in English phonics! 😊</p>

                            {selectedLesson.content.games && (
                              <div className="mt-4 p-6 bg-slate-50 rounded-[32px] border-b-4 border-r-4 border-slate-300 text-left">
                                <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-full uppercase tracking-wider">Mini Phonics Challenge</span>
                                <div className="mt-3">
                                  <p className="font-black text-slate-800 text-md">{selectedLesson.content.games[0].question}</p>
                                  <div className="grid grid-cols-2 gap-3 mt-4">
                                    {selectedLesson.content.games[0].answers.map((option) => (
                                      <motion.button
                                        key={option}
                                        whileHover={{ scale: 1.05, rotate: 1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleQuizAnswerSubmit(option, 0, 1, selectedLesson.content.games || [])}
                                        className={`py-3 px-4 rounded-[20px] border-b-4 border-r-4 font-black text-sm uppercase tracking-wider transition-all text-center cursor-pointer ${
                                          selectedAnswer === option
                                            ? option === selectedLesson.content.games?.[0].correctAnswer
                                              ? "bg-emerald-500 border-emerald-700 text-white"
                                              : "bg-rose-500 border-rose-700 text-white"
                                            : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                                        }`}
                                      >
                                        {option}
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                          </>
                        )}

                        {/* Dynamic Grammar rules extraction & interactive Quiz at the end of each lesson */}
                        <LessonGrammar
                          unit={selectedUnit}
                          lesson={selectedLesson}
                          speakText={speakText}
                          addPoints={(amt) => setPoints((p) => p + amt)}
                        />

                        {/* Beautiful context link to the Lesson Practice Activity */}
                        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-amber-50/60 p-5 rounded-3xl border border-amber-100/70">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">✏️</span>
                            <div className="text-left col-span-2">
                              <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider">Lesson Practice Activity</h5>
                              <p className="text-[11px] text-amber-700 font-bold mt-0.5">Solve the workbook activity for Lesson {selectedLesson.id} to test your knowledge!</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedActivityIndex(selectedLesson.id - 1);
                              setBookSection("activities");
                              speakText(`Let's solve the activity for Lesson ${selectedLesson.id}!`);
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-white font-black uppercase text-xs tracking-wider py-3 px-5 rounded-2xl border-b-4 border-amber-600 shadow-sm flex items-center gap-2 cursor-pointer transition-all self-stretch sm:self-auto justify-center"
                          >
                            <span>Go to Activity {selectedLesson.id}</span>
                            <span className="text-base">➡️</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Vocabulary words card section for quick study */}
                      <div>
                        <h3 className="text-xs font-black text-sky-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          📖 Unit {selectedUnit.id} Picture Cards • Interactive Word Cards
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {selectedUnit.words.map((w) => (
                            <motion.div
                              key={w.id}
                              onClick={() => speakText(w.word, "Kore")}
                              whileHover={{ scale: 1.04, y: -4, rotate: 1 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white border-b-6 border-r-6 border-slate-200 hover:border-sky-300 rounded-[24px] p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-1.5 relative group justify-between cursor-pointer"
                            >
                              <div className="absolute right-2 top-2">
                                <span
                                  className="text-slate-400 group-hover:text-blue-600 transition-colors p-2 block"
                                  title="Listen to Word"
                                >
                                  <Volume2 className="w-5 h-5" />
                                </span>
                              </div>
                              
                              <span className="text-5xl mt-3 group-hover:scale-110 transition-transform">{w.image}</span>
                              <div className="text-center mt-2 w-full">
                                <p className="font-extrabold text-[15px] text-sky-950 group-hover:text-sky-600 transition-colors uppercase leading-tight font-black mb-1.5">{w.word}</p>
                                <span className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-1 rounded-full inline-block font-bold leading-tight">
                                  {w.example}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {bookSection === "flipbook" && (
                    <LessonFlipBook 
                      onSpeak={(text) => speakText(text)} 
                      selectedUnitId={selectedUnit.id}
                      onSelectUnitId={(id) => {
                        const nextUnit = SMILE_UNITS.find(u => u.id === id);
                        if (nextUnit) {
                          setSelectedUnit(nextUnit);
                          setSelectedLesson(nextUnit.lessons[0]);
                        }
                      }}
                    />
                  )}

                  {bookSection === "activities" && (
                    <UnitActivities
                      unitId={selectedUnit.id}
                      unitTitle={selectedUnit.title}
                      speakText={speakText}
                      addPoints={(amt) => setPoints((p) => p + amt)}
                      activeActivity={selectedActivityIndex}
                      setActiveActivity={setSelectedActivityIndex}
                    />
                  )}
                </motion.div>
              )}

              {/* TAB 2: DETAILED INTERACTIVE VOCABULARY DICTIONARY */}
              {activeTab === "dictionary" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className={`p-6 rounded-[32px] border-b-6 border-r-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors duration-300 ${
                    vocabMode === "dictionary" 
                      ? "bg-teal-50 border-teal-200" 
                      : "bg-indigo-50 border-indigo-200"
                  }`}>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-black flex items-center gap-2 uppercase tracking-wide transition-colors duration-300 ${
                        vocabMode === "dictionary" ? "text-teal-955" : "text-indigo-950"
                      }`}>
                        {vocabMode === "dictionary" ? "🎒 Interactive Picture Dictionary" : "🎴 Memory-Boosting Flashcards"}
                      </h3>
                      <p className={`text-xs font-bold mt-1 transition-colors duration-300 ${
                        vocabMode === "dictionary" ? "text-teal-850" : "text-indigo-800"
                      }`}>
                        {vocabMode === "dictionary" 
                          ? "Learn new words from Sudan's Grade 3 primary book by clicking pronunciation options and hearing active examples!"
                          : "Flip cards to reveal example sentences, listen to pronunciation, and sort words into 'Know It' or 'Need Practice' for efficient memorization!"}
                      </p>
                    </div>

                    {/* Vocabulary Mode Toggle Buttons */}
                    <div className="flex gap-1.5 p-1 bg-white/80 rounded-2xl border border-slate-200 shadow-sm shrink-0">
                      <button
                        onClick={() => setVocabMode("dictionary")}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                          vocabMode === "dictionary"
                            ? "bg-teal-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        🎒 Dictionary List
                      </button>
                      <button
                        onClick={() => setVocabMode("flashcards")}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                          vocabMode === "flashcards"
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        🎴 Flashcard Game
                      </button>
                    </div>
                  </div>

                  {vocabMode === "dictionary" ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedUnit.words.map((w) => (
                          <motion.div 
                            key={w.id} 
                            onClick={() => speakText(w.word, "Kore")}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-[28px] p-5 shadow-sm border-b-6 border-r-6 border-slate-200/90 hover:border-teal-400 flex items-center gap-4 transition-all group cursor-pointer"
                          >
                            <div className="text-5xl p-3 bg-slate-50 border-2 border-slate-100 rounded-[20px] transition-transform group-hover:rotate-6">{w.image}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-black text-[16px] text-sky-950 uppercase">{w.word}</h4>
                                <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-full uppercase">Unit {w.unit}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 inline-block font-sans">
                                📝 {w.example}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(w.word, "Kore");
                                }}
                                className="bg-teal-50 hover:bg-teal-100 text-teal-700 p-3 rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center"
                                title="Hear individual word"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(w.soundText, "Zephyr");
                                }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] uppercase font-black px-2.5 py-1.5 rounded-[12px] border-b-4 border-emerald-700 transition-all cursor-pointer shadow-sm text-center"
                                title="Hear example sentence"
                              >
                                Sentence
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-[20px] text-center">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">💡 Tip: Switch the pupil book unit on the left column to explore more cute picture cards!</p>
                      </div>
                    </>
                  ) : (
                    <InteractiveFlashcards words={selectedUnit.words} speakText={speakText} />
                  )}
                </motion.div>
              )}

              {/* TAB 3: SUDANESE SMILE QUIZ GAME CORNER */}
              {activeTab === "quiz" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-amber-50 p-6 rounded-[32px] border-b-6 border-r-6 border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-2 uppercase tracking-wide">
                        🎮 Pupil SMILE Quiz Corner!
                      </h3>
                      <p className="text-xs font-bold text-amber-850 mt-1">Let's solve fun challenges from your book lessons and win yellow stars! 🌟</p>
                    </div>
                    <span className="text-xs font-black bg-amber-200 text-amber-900 px-4 py-1.5 rounded-full uppercase tracking-wider">
                      PLAY MODE
                    </span>
                  </div>

                  {/* Combined Dynamic Quiz Engine based on Configured Scope */}
                  {quizIsConfiguring ? (
                    <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-slate-200/90 shadow-sm flex flex-col gap-6 max-w-2xl mx-auto w-full">
                      <div className="border-b border-slate-100 pb-4 text-center">
                        <span className="text-4xl animate-bounce inline-block">📝🎒</span>
                        <h4 className="text-xl font-black text-slate-800 uppercase mt-2">Personalized Exam Setup</h4>
                        <p className="text-xs font-bold text-slate-500 mt-1">Practice and challenge yourself on Grade 3 English syllabus!</p>
                      </div>

                      {/* Scope Selectors */}
                      <div className="space-y-3">
                        <label className="text-xs font-black text-sky-800 uppercase tracking-wider block">
                          🎯 Questions Scope:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: "all", label: "Full Syllabus", ar: "All Units" },
                            { id: "unit", label: "Select Unit", ar: "By Unit" },
                            { id: "lesson", label: "Select Lesson", ar: "By Lesson" }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setQuizScope(opt.id as any)}
                              className={`p-3.5 rounded-[22px] border-b-4 border-r-4 transition-all text-center flex flex-col justify-center items-center cursor-pointer ${
                                quizScope === opt.id
                                  ? "bg-sky-500 border-sky-700 text-white font-black scale-102 shadow-sm"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span className="text-[13px] font-black uppercase">{opt.label}</span>
                              <span className="text-[10px] opacity-95 font-bold mt-0.5">{opt.ar}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dropdowns contingent on Choice */}
                      {quizScope !== "all" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-[26px] border border-slate-200/40">
                          {/* Unit selection */}
                          <div className="space-y-1.5 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Textbook Unit:</label>
                            <select
                              value={quizSelectedUnitId}
                              onChange={(e) => {
                                const uId = Number(e.target.value);
                                setQuizSelectedUnitId(uId);
                                const unit = SMILE_UNITS.find(u => u.id === uId);
                                if (unit && unit.lessons.length > 0) {
                                  setQuizSelectedLessonId(unit.lessons[0].id);
                                }
                              }}
                              className="w-full px-3 py-2.5 rounded-[16px] bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-sky-500 cursor-pointer"
                            >
                              {SMILE_UNITS.map(u => (
                                <option key={u.id} value={u.id}>Unit {u.id}: {u.title.toUpperCase()}</option>
                              ))}
                            </select>
                          </div>

                          {/* Lesson selection */}
                          {quizScope === "lesson" && (
                            <div className="space-y-1.5 text-left">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Lesson:</label>
                              <select
                                value={quizSelectedLessonId}
                                onChange={(e) => setQuizSelectedLessonId(Number(e.target.value))}
                                className="w-full px-3 py-2.5 rounded-[16px] bg-white border-2 border-slate-200 font-extrabold text-xs text-sky-950 focus:outline-none focus:border-sky-500 cursor-pointer"
                              >
                                {(SMILE_UNITS.find(u => u.id === quizSelectedUnitId)?.lessons || []).map(l => (
                                  <option key={l.id} value={l.id}>Lesson {l.id}: {l.title} ({l.type.toUpperCase()})</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Number of questions slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-wider">
                          <span>❓ Question Count:</span>
                          <span className="text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full text-sm font-black">{quizQuestionCount} Questions</span>
                        </div>

                        {/* Slide Selector */}
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[24px] border border-slate-200/40">
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="1"
                            value={quizQuestionCount}
                            onChange={(e) => setQuizQuestionCount(Number(e.target.value))}
                            className="flex-1 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>

                        {/* Hot Preset numbers */}
                        <div className="flex flex-wrap gap-2 justify-center pt-1">
                          {[5, 10, 15, 20, 25, 30].map(cnt => (
                            <button
                              key={cnt}
                              onClick={() => setQuizQuestionCount(cnt)}
                              className={`px-4 py-2 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                                quizQuestionCount === cnt
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {cnt} Questions
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action generator button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={startCustomQuiz}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black uppercase py-4 rounded-[24px] border-b-6 border-indigo-900 transition-all cursor-pointer text-center font-sans tracking-wide mt-2 shadow-sm"
                      >
                        🚀 Let's Start the Test!
                      </motion.button>
                    </div>
                  ) : (
                    (() => {
                      if (quizActiveQuestions.length === 0) {
                        return (
                          <div className="text-center py-12 bg-white rounded-[32px] border-2 border-dashed border-slate-300 max-w-md mx-auto w-full p-6">
                            <span className="text-4xl">⚠️</span>
                            <p className="text-md font-black text-slate-700 mt-2">No custom questions produced!</p>
                            <p className="text-xs font-extrabold text-slate-400 mt-1">Try to increase the questions setting or choose another unit.</p>
                            <button
                              onClick={() => setQuizIsConfiguring(true)}
                              className="mt-4 bg-slate-100 px-4 py-2 rounded-full font-black text-xs text-slate-700 uppercase"
                            >
                              Back to Setup
                            </button>
                          </div>
                        );
                      }

                      if (quizFinished) {
                        return (
                          <div className="bg-white border-b-8 border-r-8 border-slate-200 rounded-[40px] p-8 text-center flex flex-col items-center gap-5 max-w-md mx-auto w-full shadow-sm">
                            <span className="text-6xl animate-bounce">🏆⭐</span>
                            <h4 className="text-2xl font-black text-sky-950 uppercase tracking-tight">Well Done!</h4>
                            <p className="text-sm font-bold text-slate-600">
                              You scored <span className="font-extrabold text-indigo-600 text-lg">{quizScore} / {quizActiveQuestions.length}</span> correct answers! Great progress!
                            </p>
                            <div className="bg-amber-100 text-amber-900 font-extrabold px-6 py-2.5 rounded-[20px] text-sm shadow-sm border-2 border-amber-200 uppercase tracking-wider">
                              ⭐ Got +{quizScore * 10} Points!
                            </div>
                            <div className="flex flex-col gap-2 w-full mt-2">
                              <button
                                onClick={startCustomQuiz}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase py-3.5 px-8 rounded-[24px] border-b-4 border-indigo-800 transition-all cursor-pointer w-full text-xs tracking-wider"
                              >
                                Try Same settings again
                              </button>
                              <button
                                onClick={() => setQuizIsConfiguring(true)}
                                className="bg-slate-100 hover:bg-slate-250 text-slate-700 font-black uppercase py-3.5 px-8 rounded-[24px] border-b-4 border-slate-300 transition-all cursor-pointer w-full text-xs tracking-wider"
                              >
                                Configure New Test ⚙️
                              </button>
                            </div>
                          </div>
                        );
                      }

                      const currentQuestion = quizActiveQuestions[currentQuizIndex];

                      return (
                        <div className="bg-white p-6 sm:p-8 rounded-[36px] border-b-8 border-r-8 border-slate-200 shadow-sm flex flex-col gap-6 max-w-xl mx-auto w-full">
                          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 tracking-wider uppercase">
                            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
                              {currentQuestion.badge}
                            </span>
                            <span>Progress: {currentQuizIndex + 1} / {quizActiveQuestions.length}</span>
                            <span className="text-amber-500 font-extrabold">Correct: {quizScore}</span>
                          </div>

                          <div className="py-2">
                            <p className="text-lg sm:text-xl font-black text-slate-800 text-center leading-relaxed">
                              {currentQuestion.question}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                            {currentQuestion.answers.map((option) => {
                              const isSelected = selectedAnswer === option;
                              const isCorrect = option === currentQuestion.correctAnswer;
                              
                              let buttonStyle = "bg-white border-slate-300 hover:bg-slate-50 text-slate-700 border-b-4 border-r-4";
                              if (selectedAnswer) {
                                  if (isCorrect) {
                                    buttonStyle = "bg-emerald-500 border-emerald-700 text-white border-b-4 border-r-4 shadow-sm";
                                  } else if (isSelected) {
                                    buttonStyle = "bg-rose-500 border-rose-700 text-white border-b-4 border-r-4 shadow-sm";
                                  } else {
                                    buttonStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-400 border-b-4 border-r-4";
                                  }
                              }

                              return (
                                <motion.button
                                  key={option}
                                  disabled={selectedAnswer !== null}
                                  whileHover={{ scale: selectedAnswer ? 1 : 1.03 }}
                                  whileTap={{ scale: selectedAnswer ? 1 : 0.97 }}
                                  onClick={() => handleQuizAnswerSubmit(option, currentQuizIndex, quizActiveQuestions.length, quizActiveQuestions)}
                                  className={`py-4 px-5 rounded-[20px] text-center font-black text-[14px] transition-all cursor-pointer flex items-center justify-between uppercase tracking-wide ${buttonStyle}`}
                                >
                                  <span>{option}</span>
                                  {selectedAnswer && isCorrect && <Check className="w-5 h-5 text-white" />}
                                  {selectedAnswer && isSelected && !isCorrect && <span className="text-white text-xs font-black font-mono">X</span>}
                                </motion.button>
                              );
                            })}
                          </div>

                          {selectedAnswer && (
                            <div className="text-center text-xs font-black text-sky-950 uppercase tracking-wider animate-pulse pt-2 border-t border-slate-100">
                              {selectedAnswer === currentQuestion.correctAnswer 
                                ? "🎉 Brilliant answer! You got it right!" 
                                : `❌ Oops, matches: "${currentQuestion.correctAnswer}".`}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <button
                              onClick={() => {
                                if (confirm("Do you want to stop this test?")) {
                                  setQuizIsConfiguring(true);
                                }
                              }}
                              className="text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              Quit Test 👋
                            </button>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">SMILE Grade 3 Exam</span>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </motion.div>
              )}

              {/* TAB 4: ENGLISH CONVERSATION BUILDER & THEATER (100% AI-free Textbook Sequence Game) */}
              {activeTab === "adventure" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6 h-full"
                >
                  {/* Title Banner */}
                  <div className="bg-gradient-to-r from-purple-500 via-indigo-600 to-indigo-700 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-indigo-900 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative z-10">
                      <div className="bg-white/20 text-purple-100 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                        🎭 offline dialogue builder
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2 uppercase tracking-wide">
                        <span>Interactive Conversation Corner</span>
                      </h3>
                      <p className="text-xs text-indigo-100 font-bold mt-1">
                        Select a dialogue from your SMILE book, arrange the scrambled sentences, and listen to the real voices play back!
                      </p>
                    </div>
                    <div className="shrink-0 bg-white/10 px-4 py-2.5 rounded-[20px] backdrop-blur-md border border-white/20 flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <div className="text-left">
                        <div className="text-[10px] text-indigo-100 font-black uppercase">Points Score</div>
                        <div className="text-lg font-black leading-none text-yellow-300">{points} PTS</div>
                      </div>
                    </div>
                  </div>

                  {/* 1. Selecting the Book Dialogue block */}
                  <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-slate-100 flex flex-col gap-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      Step 1: Choose a Dialogue from your Textbook
                    </h4>

                    {/* Left & Right selection scroller wrapper or direct select bento grid */}
                    <div className="flex gap-2 overflow-x-auto pb-2 pr-1 scrollbar-thin">
                      {allBookDialogueLessons.map((dialogueItem, idx) => {
                        const isSelected = selectedDialogueIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => initDialogueBuilder(idx)}
                            className={`shrink-0 px-4 py-3 rounded-[20px] font-black text-xs uppercase tracking-wide transition-all cursor-pointer border-b-4 border-r-4 ${
                              isSelected
                                ? "bg-amber-400 border-amber-600 text-amber-950 scale-102 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="opacity-75 block text-[9px]">UNIT {dialogueItem.unitId}</span>
                            <span>{dialogueItem.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. MAIN BUILDING WORKSPACE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    
                    {/* Left Workspace Panel: Scrambled sentences */}
                    <div className="bg-white rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-indigo-50 flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-indigo-500 animate-spin-slow" />
                          Scrambled Pieces
                        </h4>
                        
                        {/* Cheat button */}
                        <button
                          onClick={() => setShowTextbookGuide(!showTextbookGuide)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        >
                          {showTextbookGuide ? <EyeOff className="w-3.1 h-3.1" /> : <Eye className="w-3.1 h-3.1" />}
                          <span>{showTextbookGuide ? "Hide textbook Guide" : "Show textbook Guide"}</span>
                        </button>
                      </div>

                      {/* Display Textbook Sequence Cheat Guide if activated */}
                      <AnimatePresence>
                        {showTextbookGuide && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] p-4 text-[11px] font-bold text-slate-600 space-y-1.5 overflow-hidden"
                          >
                            <span className="text-[10px] text-purple-600 font-extrabold uppercase block mb-1">📖 Textbook Dialogue Guide (SMILE Book):</span>
                            {allBookDialogueLessons[selectedDialogueIndex]?.dialogue.map((lin, idx) => (
                              <div key={idx} className="flex gap-2 items-start text-xs border-b border-slate-100/50 pb-1">
                                <span className="font-mono bg-indigo-100 text-indigo-800 rounded px-1.5 py-0.2 select-none shrink-0">{idx+1}</span>
                                <span>
                                  <strong>{lin.speaker}:</strong> "{lin.text}"
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* If Completed, show winning box */}
                      {dialogueCompleted ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-emerald-50 border-4 border-emerald-300 rounded-[30px] p-6 text-center flex flex-col items-center gap-4 py-8"
                        >
                          <span className="text-5xl animate-bounce">🏆🌟</span>
                          <h5 className="text-xl font-black text-sky-950 uppercase tracking-tight">Super Job!</h5>
                          <p className="text-xs font-bold text-emerald-800 max-w-sm">
                            You correctly placed and ordered all textbook dialogue sentences in sequence! You earned <strong className="text-md text-emerald-700">+15 PTS</strong>!
                          </p>

                          {/* Controls */}
                          <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                            <button
                              onClick={playEntireShow}
                              disabled={isPlayingEntireDialogue}
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white border-b-4 border-indigo-800 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                            >
                              {isPlayingEntireDialogue ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  <span>Playing Show...</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 fill-current" />
                                  <span>Play Entire Act 🎭</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => initDialogueBuilder(selectedDialogueIndex)}
                              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border-b-4 border-slate-300 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Try Again 🔄</span>
                            </button>
                            
                            {selectedDialogueIndex < allBookDialogueLessons.length - 1 && (
                              <button
                                onClick={() => initDialogueBuilder(selectedDialogueIndex + 1)}
                                className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-4 border-amber-600 h-[48px] rounded-[18px] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all active:translate-y-0.5"
                              >
                                <span>Next Dialogue</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p className="text-[11px] font-bold text-slate-500 leading-snug">
                            Tap the speech bubbles below in the correct order to piece together the conversation!
                          </p>

                          <div className="flex flex-col gap-2.5">
                            <AnimatePresence mode="popLayout">
                              {scrambledLines.map((line) => {
                                const isWrong = builderWrongSelectionId === line.id;
                                return (
                                  <motion.button
                                    key={line.id}
                                    layout
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                                    transition={isWrong ? { duration: 0.4 } : { type: "spring", stiffness: 350, damping: 25 }}
                                    onClick={() => handleLineTap(line)}
                                    className={`w-full text-left p-4 rounded-[22px] border-b-4 border-r-4 transition-all cursor-pointer flex gap-3.5 items-center relative active:translate-y-0.5 ${
                                      isWrong
                                        ? "bg-rose-100 border-rose-400 text-rose-950"
                                        : "bg-slate-50 border-slate-200 text-sky-950 hover:bg-indigo-50/70 hover:border-indigo-200"
                                    }`}
                                  >
                                    <span className="text-2xl pt-0.5 shrink-0 select-none">
                                      {getSpeakerEmoji(line.speaker)}
                                    </span>
                                    <div className="flex-1 min-w-0 pr-6 text-left">
                                      <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                        {line.speaker}
                                      </div>
                                      <p className="font-extrabold text-[14px] leading-tight text-slate-800 break-words">
                                        "{line.text}"
                                      </p>
                                    </div>
                                    <div className="absolute right-3 top-3 text-[9px] bg-slate-250 border border-slate-300/40 text-slate-400 font-extrabold uppercase px-1.5 py-0.5 rounded-full select-none">
                                      Tap
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </AnimatePresence>
                          </div>
                          
                          {scrambledLines.length === 0 && (
                            <div className="text-center text-xs font-black text-slate-400 py-6">
                              All lines are placed! Awesome!
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Workspace Panel: Arraged Conversation Stage */}
                    <div className="bg-slate-50 rounded-[32px] p-5 shadow-sm border-b-6 border-r-6 border-slate-200 flex flex-col gap-4 min-h-[360px] relative">
                      
                      {/* Playback overall status title bar */}
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Smile className="w-4 h-4 text-sky-500" />
                          Arranged Stage
                        </h4>
                        
                        <div className="text-[10px] bg-indigo-50 text-indigo-700 font-black px-3 py-1 rounded-full border border-indigo-200">
                          {arrangedLines.length} / {allBookDialogueLessons[selectedDialogueIndex]?.dialogue.length} Complete
                        </div>
                      </div>

                      {/* Progression stage log */}
                      <div className="flex-1 flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1">
                        <AnimatePresence mode="popLayout">
                          {arrangedLines.map((line, idx) => {
                            const isCurrentlyActiveSpeaker = isPlayingEntireDialogue && activeSpeakingLineIndex === idx;
                            return (
                              <motion.div
                                key={`arranged-${line.id}`}
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1, 
                                  y: 0,
                                  boxShadow: isCurrentlyActiveSpeaker ? "0 0 0 4px rgba(99, 102, 241, 0.45)" : "none"
                                }}
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                className={`p-4 rounded-[24px] border-b-4 border-r-4 transition-all relative flex gap-3 ${
                                  isCurrentlyActiveSpeaker 
                                    ? "bg-indigo-50 border-indigo-300 text-indigo-950 scale-102"
                                    : "bg-white border-slate-200 text-slate-800"
                                }`}
                              >
                                {/* Active speaker glowing tag */}
                                {isCurrentlyActiveSpeaker && (
                                  <span className="absolute -top-2 left-6 bg-indigo-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                                    Speaking...
                                  </span>
                                )}

                                <span className="text-3xl pt-0.5 select-none shrink-0">
                                  {getSpeakerEmoji(line.speaker)}
                                </span>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{line.speaker}</span>
                                    <span className="text-[8px] font-mono text-slate-300 bg-slate-100 rounded px-1">Seq {idx+1}</span>
                                  </div>
                                  <p className="font-extrabold text-[14px] leading-tight text-slate-900 pr-5 break-words">
                                    "{line.text}"
                                  </p>
                                </div>

                                {/* Hear again btn */}
                                <button
                                  onClick={() => speakText(line.text, line.voice)}
                                  className="self-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-2 border-indigo-200 rounded-full p-2 cursor-pointer transition-all active:scale-90"
                                  title="Listen again"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>

                        {/* Blank initial instructions */}
                        {arrangedLines.length === 0 && (
                          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 text-slate-400 gap-3">
                            <span className="text-5xl animate-pulse">🎭</span>
                            <div className="max-w-xs space-y-1">
                              <p className="text-xs font-black uppercase tracking-wider text-slate-500">Stage is Empty</p>
                              <p className="text-[11px] font-bold text-slate-400">
                                Click the scrambled sentence blocks on the left in the correct chronological order to seat the speakers on the stage!
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stage footer play show shortcut bar */}
                      {arrangedLines.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center gap-3">
                          <button
                            onClick={() => initDialogueBuilder(selectedDialogueIndex)}
                            className="bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-wider text-slate-500 cursor-pointer"
                          >
                            Reset Sequence
                          </button>

                          <button
                            onClick={playEntireShow}
                            disabled={isPlayingEntireDialogue || !dialogueCompleted}
                            className={`px-4 py-2 rounded-[16px] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border-b-4 border-r-4 ${
                              dialogueCompleted
                                ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white cursor-pointer active:translate-y-0.5"
                                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                            }`}
                          >
                            {isPlayingEntireDialogue ? (
                              <>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Playing act...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>Play show</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: SYLLABUS MAP (قسم المنهج بكتاب الطالب) */}
              {activeTab === "syllabus" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-rose-800/80">
                    <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wide">
                      📚 SMILE Grade 3 Syllabus Map
                    </h3>
                    <p className="text-xs text-rose-100 font-bold mt-1">
                      Explore the whole textbook here! Tap any unit to learn, play songs, and test your vocabulary instantly!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SMILE_UNITS.map((unit) => (
                      <motion.div
                        key={unit.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-5 rounded-[28px] border-2 bg-white flex flex-col justify-between gap-4 shadow-sm relative overflow-hidden transition-all ${
                          selectedUnit.id === unit.id ? "border-rose-400 ring-4 ring-rose-100" : "border-slate-100 hover:border-rose-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-3xl">{unit.icon}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2.5 py-1 rounded-full uppercase">
                              Unit {unit.id}
                            </span>
                          </div>
                          <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight leading-tight">
                            {unit.title}
                          </h4>
                          
                          {/* Book Map Info Summary for parents and kids */}
                          <div className="mt-3 flex flex-col gap-2">
                            <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-semibold text-slate-600">
                              <span className="font-extrabold text-slate-700 uppercase block mb-1">📖 Lessons Included:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {unit.lessons.map((l) => (
                                  <span
                                    key={l.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigateFull("book", unit, l);
                                    }}
                                    className="bg-white border border-slate-200/80 hover:border-rose-400 py-1 px-2 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer transition-colors"
                                  >
                                    L{l.id}: {l.title}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-rose-50/50 p-2.5 rounded-xl text-xs font-semibold text-rose-950">
                              <span className="font-extrabold text-rose-800 uppercase block mb-1">🔑 Core Vocabulary:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {unit.words.map((w) => (
                                  <span
                                    key={w.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigateFull("dictionary", unit, unit.lessons[0]);
                                    }}
                                    className="bg-white/80 border border-rose-100 hover:border-rose-400 py-0.5 px-1.5 rounded-md text-[10px] font-extrabold cursor-pointer transition-colors"
                                  >
                                    {w.word} {w.image}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            navigateFull("book", unit, unit.lessons[0]);
                          }}
                          className="w-full mt-2 bg-slate-900 hover:bg-rose-600 text-white py-2.5 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Open Chapter {unit.id}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB: EDUCATIONAL INTERACTIVE GAMES PLAYGROUND (مجموعة الألعاب التعليمية التفاعلية) */}
              {activeTab === "game" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <EducationalGames
                    currentUnit={selectedUnit}
                    speakText={speakText}
                    addPoints={(amt) => setPoints(p => p + amt)}
                    addBadge={(badge) => setBadges(b => b.includes(badge) ? b : [...b, badge])}
                    points={points}
                  />
                </motion.div>
              )}

              {/* TAB: INTERACTIVE SPELLING DICTATION GAME (لعبة الإملاء التفاعلي) */}
              {activeTab === "dictation" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <DictationGame
                    units={SMILE_UNITS}
                    speakText={speakText}
                    readingSpeed={readingSpeed}
                    addPoints={(amt) => setPoints(p => p + amt)}
                    addBadge={(badge) => setBadges(b => b.includes(badge) ? b : [...b, badge])}
                  />
                </motion.div>
              )}

              {/* TAB 6: PRINT WORKSHEET GENERATOR (صانع أوراق العمل A4) */}
              {activeTab === "print" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  {/* Style override to control clean A4 printing */}
                  <style dangerouslySetInnerHTML={{ __html: `
                    @media print {
                      @page {
                        size: A4 portrait;
                        margin: 0 !important;
                      }
                      body, html, #root {
                        background: white !important;
                        color: black !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 21cm !important;
                        height: auto !important;
                        overflow: visible !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                      }
                      header, footer, aside, .no-print, button, input, select, nav, [role="tablist"], iframe, .fixed, #smart-search-fab, #smart-search-chat-window, [id*="install"] {
                        display: none !important;
                      }
                      /* Force the layout containers to span the full page without flex or grid gaps or horizontal shifts */
                      #root > div, 
                      #root > div > div, 
                      #root > div > div > main, 
                      #root > div > div > main > div,
                      .printable-exams-wrapper,
                      .no-page-break-container {
                        display: block !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 21cm !important;
                        max-width: 21cm !important;
                        min-width: 21cm !important;
                        height: auto !important;
                        border: none !important;
                        box-shadow: none !important;
                        background: transparent !important;
                        overflow: visible !important;
                      }
                      .no-page-break-container > * {
                        margin-top: 0 !important;
                        margin-bottom: 0 !important;
                      }
                      .print-container {
                        border: none !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        padding: 0.9cm 1.0cm 0.9cm 1.0cm !important; /* Extremely precise margins to fit exactly on physical A4 pages */
                        width: 21cm !important;
                        height: 29.7cm !important;
                        max-width: 21cm !important;
                        max-height: 29.7cm !important;
                        box-sizing: border-box !important;
                        background: white !important;
                        page-break-after: always !important;
                        break-after: page !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                        position: relative !important;
                        overflow: hidden !important;
                        display: block !important;
                      }
                      /* Strict high-fidelity print compacting overrides for A4 bounds */
                      .print-container .border-b-4.border-double {
                        padding-bottom: 6px !important;
                        margin-bottom: 10px !important;
                      }
                      .print-container .border-b-4.border-double .mt-4 {
                        margin-top: 4px !important;
                      }
                      .print-container .border-b-4.border-double h1 {
                        font-size: 14px !important;
                        line-height: 1.15 !important;
                      }
                      .print-container .border-b-4.border-double h2 {
                        font-size: 11px !important;
                        line-height: 1.15 !important;
                      }
                      .print-container .border-b-4.border-double .text-xs {
                        font-size: 9px !important;
                      }
                      .print-container .grid-cols-1.md\:grid-cols-3 {
                        margin-top: 8px !important;
                        padding-top: 6px !important;
                        gap: 8px !important;
                      }
                      .print-container h3 {
                        font-size: 11px !important;
                        padding-bottom: 2px !important;
                        margin-bottom: 4px !important;
                        border-bottom-width: 1.5px !important;
                      }
                      .print-container h3 + p {
                        margin-bottom: 3px !important;
                        font-size: 9.5px !important;
                      }
                      .print-container .bg-slate-50.p-4.rounded-xl {
                        padding: 6px 10px !important;
                        margin-bottom: 4px !important;
                        font-size: 10px !important;
                        line-height: 1.3 !important;
                        border-radius: 8px !important;
                      }
                      .print-container .space-y-4 {
                        gap: 2px !important;
                      }
                      .print-container .space-y-4 > div {
                        margin-top: 3px !important;
                      }
                      .print-container .hidden.print\:flex {
                        margin-top: 1px !important;
                        gap: 12px !important;
                      }
                      .print-container .mt-2.ml-4.border-b {
                        margin-top: 2px !important;
                        height: 18px !important;
                      }
                      .print-container .mb-6 {
                        margin-bottom: 4px !important;
                      }
                      .print-container .grid-cols-1.sm\:grid-cols-2 {
                        gap: 4px !important;
                      }
                      .print-container .bg-slate-50\/40 {
                        padding: 5px 8px !important;
                        border-radius: 6px !important;
                      }
                      .print-container .flex.items-center.gap-3 {
                        margin-top: 2px !important;
                      }
                      .print-container .min-h-\[40px\] {
                        min-height: 26px !important;
                      }
                      .print-container .space-y-3 {
                        margin-top: 2px !important;
                      }
                      .print-container .space-y-3 > div {
                        margin-top: 2px !important;
                      }
                      .print-container .border-b.border-slate-300 {
                        padding-bottom: 4px !important;
                        margin-bottom: 8px !important;
                      }
                      .print-container .border-t.border-slate-300 {
                        padding-top: 6px !important;
                        margin-top: 8px !important;
                      }
                      .print-container .space-y-6 {
                        margin-top: 4px !important;
                      }
                      .print-container .space-y-6 > div {
                        margin-top: 3px !important;
                      }
                      .print-container .space-y-6 .mt-2 {
                        margin-top: 1px !important;
                      }
                      .print-container .space-y-6 .mt-1 {
                        margin-top: 1px !important;
                      }
                      .watermark {
                        position: absolute !important;
                        inset: 0 !important;
                        pointer-events: none !important;
                        user-select: none !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        transform: rotate(-25deg) !important;
                        font-family: 'Cairo', 'Tajawal', 'Inter', sans-serif !important;
                        font-weight: 900 !important;
                        font-size: 3.5rem !important;
                        letter-spacing: 0.1em !important;
                        text-align: center !important;
                        z-index: 50 !important;
                        color: #e2e8f0 !important; /* Solid light gray to ensure high-fidelity printing without transparency drop */
                        opacity: 0.85 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                      }
                    }
                    @media screen {
                      .print-container {
                        width: 21cm !important;
                        height: auto !important;
                        min-height: 29.7cm !important;
                        max-width: 100% !important;
                        margin: 0 auto 2rem auto !important;
                        padding: 1.5cm 1.2cm !important;
                        box-sizing: border-box !important;
                        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) !important;
                        background: white !important;
                        border: 1px solid #e2e8f0 !important;
                        border-radius: 24px !important;
                        position: relative !important;
                        overflow: visible !important;
                      }
                      .watermark {
                        position: absolute !important;
                        inset: 0 !important;
                        pointer-events: none !important;
                        user-select: none !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        transform: rotate(-25deg) !important;
                        font-family: 'Cairo', 'Tajawal', 'Inter', sans-serif !important;
                        font-weight: 900 !important;
                        font-size: 3.5rem !important;
                        letter-spacing: 0.1em !important;
                        text-align: center !important;
                        z-index: 50 !important;
                        color: #cbd5e1 !important; /* Elegant light slate color for preview screen */
                        opacity: 0.45 !important;
                      }
                      @media screen and (max-width: 22cm) {
                        .print-container {
                          height: auto !important;
                          padding: 1.2rem 1rem !important;
                          border-radius: 16px !important;
                          overflow: visible !important;
                        }
                        .watermark {
                          font-size: 2.2rem !important;
                        }
                      }
                      .page-break {
                        margin-bottom: 2rem;
                      }
                    }
                  `}} />

                  <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white p-6 rounded-[32px] border-b-6 border-r-6 border-indigo-900/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
                    <div className="flex-1">
                      <span className="text-[10px] bg-indigo-500 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        SMILE SERIES • PRIMARY 3
                      </span>
                      <h3 className="text-2xl font-black flex items-center gap-2 uppercase tracking-wide mt-1">
                        <Printer className="w-6 h-6 animate-pulse" />
                        A4 Print Worksheets & Exam Generator
                      </h3>
                      <p className="text-xs text-indigo-100 font-bold mt-1">
                        Generate interactive practice sheets and clean, print-ready A4 worksheets matching the Grade 3 SMILE English curriculum.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => window.print()}
                      className="bg-white hover:bg-indigo-50 text-indigo-700 font-black px-6 py-3.5 rounded-2xl border-b-4 border-slate-200 transition-all active:scale-95 flex items-center gap-2 cursor-pointer transform"
                    >
                      <Printer className="w-5 h-5" />
                      <span>Print Worksheets (A4)</span>
                    </button>
                  </div>

                  {/* Watermark Protection Management Panel */}
                  <div className="bg-slate-50 p-5 rounded-[28px] border-2 border-dashed border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${watermarkRemoved ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                        {watermarkRemoved ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-slate-800">Printed Worksheet Watermark</h4>
                        <p className="text-xs font-bold text-slate-500">
                          {watermarkRemoved 
                            ? "Watermark successfully removed! You can now print a clean sheet." 
                            : "Worksheet contains a faint watermark. Teachers can remove it using their custom teacher passcode."}
                        </p>
                      </div>
                    </div>

                    {!watermarkRemoved ? (
                      <div className="flex flex-col gap-1.5 w-full md:w-auto">
                        <div className="flex gap-2">
                          <input
                            type="password"
                            placeholder="Teacher Passcode"
                            value={watermarkPassword}
                            onChange={(e) => setWatermarkPassword(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleRemoveWatermark(); }}
                            className="bg-white px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-56 text-center"
                          />
                          <button
                            onClick={handleRemoveWatermark}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors whitespace-nowrap"
                          >
                            Remove 🔓
                          </button>
                        </div>
                        {passwordError && (
                          <span className="text-[11px] font-bold text-rose-600 text-left">{passwordError}</span>
                        )}
                      </div>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-4 py-2 rounded-xl border border-emerald-200">
                        ✅ Watermark Removed
                      </span>
                    )}
                  </div>

                  {/* Exam Settings / Regenerator */}
                  <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex flex-col gap-6 no-print">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">📝</span>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-slate-800">Worksheet Configuration & Generator</h4>
                        <p className="text-xs font-bold text-slate-500">
                          Choose your syllabus scope and number of pages to generate unique worksheets without duplicates!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                      
                      {/* Scope Selector */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-600 text-left">Syllabus Scope:</label>
                        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => setExamScope("all")}
                            className={`py-2 px-1 rounded-lg text-[11px] font-black transition-all ${
                              examScope === "all" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Full Syllabus
                          </button>
                          <button
                            onClick={() => {
                              setExamScope("unit");
                              setExamUnitId(selectedUnit.id);
                            }}
                            className={`py-2 px-1 rounded-lg text-[11px] font-black transition-all ${
                              examScope === "unit" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            By Unit
                          </button>
                          <button
                            onClick={() => {
                              setExamScope("lesson");
                              setExamUnitId(selectedUnit.id);
                              setExamLessonId(selectedUnit.lessons[0].id);
                            }}
                            className={`py-2 px-1 rounded-lg text-[11px] font-black transition-all ${
                              examScope === "lesson" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            By Lesson
                          </button>
                        </div>
                      </div>

                      {/* Unit Dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-600 text-left">Syllabus Unit:</label>
                        <select
                          disabled={examScope === "all"}
                          value={examUnitId}
                          onChange={(e) => {
                            const uid = Number(e.target.value);
                            setExamUnitId(uid);
                            const unitObj = SMILE_UNITS.find((u) => u.id === uid);
                            if (unitObj && unitObj.lessons.length > 0) {
                              setExamLessonId(unitObj.lessons[0].id);
                            }
                          }}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 text-left"
                        >
                          {SMILE_UNITS.map((u) => (
                            <option key={u.id} value={u.id}>
                              Unit {u.id}: {u.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Lesson Dropdown */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-600 text-left">Selected Lesson:</label>
                        <select
                          disabled={examScope !== "lesson"}
                          value={examLessonId}
                          onChange={(e) => setExamLessonId(Number(e.target.value))}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 text-left"
                        >
                          {SMILE_UNITS.find((u) => u.id === examUnitId)?.lessons.map((l) => (
                            <option key={l.id} value={l.id}>
                              Lesson {l.id}: {l.title}
                            </option>
                          )) || <option>No lessons available</option>}
                        </select>
                      </div>

                      {/* Number of Pages Selector */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-600 text-left">Number of Pages:</label>
                        <div className="flex items-center justify-between gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
                          <button
                            onClick={() => setPageCount(Math.min(5, pageCount + 1))}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center font-black border border-slate-200 shadow-sm transition-transform active:scale-95 text-slate-800"
                          >
                            +
                          </button>
                          <span className="font-extrabold text-sm text-indigo-950">{pageCount} {pageCount === 1 ? "Page" : "Pages"}</span>
                          <button
                            onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                            className="w-8 h-8 rounded-lg bg-white hover:bg-slate-100 flex items-center justify-center font-black border border-slate-200 shadow-sm transition-transform active:scale-95 text-slate-800"
                          >
                            -
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="no-print flex justify-between items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Fully optimized for clean browser A4 printing</span>
                      </div>
                      
                      <button
                        onClick={handleGenerateNewExam}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Generate New Random Content</span>
                      </button>
                    </div>
                  </div>

                  {/* RENDER PAGES LIST (A4 PRINT CONTAINERS) */}
                  <div className="flex flex-col gap-8 printable-exams-wrapper">
                    {examPapers.map((examPaper, paperIdx) => {
                      const paperAns = userAnswers[examPaper.id] || { q1: {}, q2a: {}, q2b: {}, q3: {}, q4: {} };
                      const isGraded = gradedPapers[examPaper.id];
                      const score = isGraded ? calculatePaperScore(examPaper) : 0;
                      
                      // Sort vocab matching sentences once for consistency
                      const sortedSentences = [...examPaper.vocabMatching]
                        .sort((a, b) => a.definitionOrSentence.length - b.definitionOrSentence.length);

                      return (
                        <div key={examPaper.id} className="space-y-6 pb-12 border-b-2 border-slate-200 last:border-0 no-page-break-container">

                          {/* ================= PAGE 1 ================= */}
                          <div 
                            className="print-container text-slate-800 text-left page-break relative"
                            style={{ direction: "ltr" }}
                          >
                            {/* Page indicator for preview screen */}
                            <div className="absolute top-4 right-4 bg-indigo-50/80 backdrop-blur-sm text-indigo-700 text-[10px] px-2.5 py-1 rounded-full font-black no-print">
                              Paper {paperIdx + 1} • Page 1
                            </div>

                            {/* WATERMARK LAYER (CONDITIONAL) */}
                            {!watermarkRemoved && (
                              <div className="watermark" style={{ direction: "rtl" }}>
                                نقلة للمناهج الالكترونية
                              </div>
                            )}

                          {/* Official Sudan School Header */}
                          <div className="border-b-4 border-double border-slate-800 pb-5 mb-6 text-center relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2 uppercase">
                              <div>Republic of Sudan<br />Ministry of Education</div>
                              <div className="text-2xl">🇸🇩</div>
                              <div className="text-right">SMILE Series Companion<br />National Exam Center</div>
                            </div>
                            
                            <div className="mt-4">
                              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                                National General Certificate Examination - Grade 3
                              </h1>
                              <h2 className="text-md font-extrabold text-slate-700 mt-1">
                                Subject: English Language (SMILE Series - Pupil's Book 3)
                              </h2>
                              <div className="text-xs font-bold text-slate-500 mt-1 flex justify-center gap-6">
                                <span>Time Allowed: 1 Hour 30 Minutes</span>
                                <span>•</span>
                                <span>Total Marks: 30 Marks</span>
                              </div>
                            </div>

                            {/* Pupil metadata spaces */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-xs font-extrabold text-left pt-4 border-t border-slate-200">
                              <div className="flex gap-2">
                                <span>Pupil's Name:</span>
                                <span className="flex-1 border-b border-dashed border-slate-400"></span>
                              </div>
                              <div className="flex gap-2">
                                <span>School Name:</span>
                                <span className="flex-1 border-b border-dashed border-slate-400"></span>
                              </div>
                              <div className="flex gap-2">
                                <span>Date:</span>
                                <span className="w-24 border-b border-dashed border-slate-400"></span>
                              </div>
                            </div>
                          </div>

                          {/* EXAM QUESTIONS SPACE */}
                          <div className="relative z-10 space-y-8 print:space-y-4" style={{ fontFamily: "Inter, sans-serif" }}>
                            
                            {/* QUESTION 1: COMPREHENSION PASSAGE */}
                            <div>
                              <h3 className="text-sm font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 flex justify-between">
                                <span>Question 1: Reading Comprehension</span>
                                <span className="font-bold text-xs lowercase text-slate-500">(8 Marks)</span>
                              </h3>
                              <p className="text-xs text-slate-500 font-bold mb-3 italic">
                                Read the following passage carefully, then answer the questions below:
                              </p>
                              
                              <div className="bg-slate-50 p-4 print:p-3 rounded-xl border border-slate-200 text-xs sm:text-sm print:text-xs leading-relaxed font-medium text-slate-800 mb-4 print:mb-2 text-justify">
                                <strong className="block text-slate-900 text-sm mb-1.5 uppercase tracking-wide underline">{examPaper.passage.title}</strong>
                                {examPaper.passage.text}
                              </div>

                              <div className="space-y-4 print:space-y-2">
                                {examPaper.passage.questions.map((q, idx) => {
                                  const currentVal = paperAns.q1[idx] || "";
                                  const isCorrectTF = q.isTrueFalse ? currentVal.trim().toLowerCase() === q.correctTF?.toLowerCase() : checkComprehensionAnswer(currentVal, q.answer);

                                  return (
                                    <div key={`q1-${idx}`} className="text-xs">
                                      <div className="flex items-start gap-1 font-extrabold text-slate-800 text-left">
                                        <span className="text-slate-500">{idx + 1}.</span>
                                        <p className="flex-1 text-left">{q.question}</p>
                                        <span className="font-bold text-slate-400 shrink-0 ml-1">
                                          {q.isTrueFalse ? "[ True / False ]" : "....................."}
                                        </span>
                                      </div>

                                      {/* Interactive True / False Choice */}
                                      {q.isTrueFalse ? (
                                        <>
                                          <div className="flex gap-3 mt-2 ml-4 font-bold text-slate-400 text-[11px] justify-start no-print">
                                            <button
                                              disabled={isGraded}
                                              onClick={() => handleAnswerChange(examPaper.id, "q1", idx, "True")}
                                              className={`px-3 py-1.5 border rounded-lg cursor-pointer transition-all ${
                                                currentVal === "True" 
                                                  ? "bg-indigo-600 text-white border-indigo-600 font-extrabold" 
                                                  : "bg-white text-slate-600 hover:bg-slate-50 border-slate-300"
                                              }`}
                                            >
                                              True
                                            </button>
                                            <button
                                              disabled={isGraded}
                                              onClick={() => handleAnswerChange(examPaper.id, "q1", idx, "False")}
                                              className={`px-3 py-1.5 border rounded-lg cursor-pointer transition-all ${
                                                currentVal === "False" 
                                                  ? "bg-indigo-600 text-white border-indigo-600 font-extrabold" 
                                                  : "bg-white text-slate-600 hover:bg-slate-50 border-slate-300"
                                              }`}
                                            >
                                              False
                                            </button>
                                          </div>

                                          {/* Print view display */}
                                          <div className="hidden print:flex gap-4 mt-1.5 ml-4 font-bold text-slate-500 text-[11px] justify-start">
                                            <span className={currentVal === "True" ? "underline font-black text-slate-900" : ""}>
                                              {currentVal === "True" ? "✓ True" : "O True"}
                                            </span>
                                            <span className={currentVal === "False" ? "underline font-black text-slate-900" : ""}>
                                              {currentVal === "False" ? "✓ False" : "O False"}
                                            </span>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {/* Interactive open text response */}
                                          <input
                                            type="text"
                                            placeholder="Write your answer..."
                                            disabled={isGraded}
                                            value={currentVal}
                                            onChange={(e) => handleAnswerChange(examPaper.id, "q1", idx, e.target.value)}
                                            className="mt-2 ml-4 w-full max-w-lg border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none no-print"
                                          />

                                          {/* Print view display */}
                                          <div className="mt-2.5 ml-4 border-b border-dashed border-slate-300 h-6 flex items-end">
                                            <span className="text-xs font-bold text-slate-900 bg-white px-2 italic">
                                              {currentVal || <span className="text-slate-200 select-none print:hidden">Answer: ..........................................................................</span>}
                                            </span>
                                          </div>
                                        </>
                                      )}

                                      {/* Grading corrections display */}
                                      {isGraded && (
                                        <div className="mt-1.5 ml-4 font-bold text-xs no-print">
                                          {isCorrectTF ? (
                                            <span className="text-emerald-600 flex items-center gap-1">✓ Correct (2/2 Marks)</span>
                                          ) : (
                                            <span className="text-rose-600 flex flex-col gap-0.5">
                                              <span>✗ Incorrect (0/2 Marks)</span>
                                              <span className="text-slate-500 font-medium">
                                                Correct answer: {q.isTrueFalse ? q.correctTF : `"${q.answer}"`}
                                              </span>
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* QUESTION 2: VOCABULARY & SPELLING */}
                            <div>
                              <h3 className="text-sm font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 flex justify-between">
                                <span>Question 2: Vocabulary & Spelling</span>
                                <span className="font-bold text-xs lowercase text-slate-500">(8 Marks)</span>
                              </h3>
                              
                              {/* Subpart A: Missing Letters */}
                              <div className="mb-6 print:mb-3">
                                <p className="text-xs text-slate-500 font-bold mb-3 print:mb-1.5 italic text-left">
                                  A) Complete the missing letters of the following words according to the given clues: (4 Marks)
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2 ml-2">
                                  {examPaper.spelling.map((s, idx) => {
                                    const currentVal = paperAns.q2a[idx] || "";
                                    const isCorrect = currentVal.trim().toUpperCase() === s.word.toUpperCase();

                                    return (
                                      <div key={`sp-${idx}`} className="text-xs flex flex-col gap-1 bg-slate-50/40 p-2.5 print:p-1.5 rounded-lg border border-slate-100">
                                        <span className="font-extrabold text-slate-800 text-left">
                                          {idx + 1}. Clue: <span className="font-medium text-slate-600">{s.clue}</span>
                                        </span>
                                        <div className="flex items-center gap-3 mt-1.5 print:mt-0.5 font-mono text-sm tracking-widest font-black text-left">
                                          <span className="text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded select-all uppercase shrink-0">
                                            {s.gapped}
                                          </span>
                                          
                                          {/* Interactive spelling input */}
                                          <input
                                            type="text"
                                            placeholder="Write word..."
                                            disabled={isGraded}
                                            value={currentVal}
                                            onChange={(e) => handleAnswerChange(examPaper.id, "q2a", idx, e.target.value.toUpperCase())}
                                            className="font-sans tracking-normal font-bold bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none w-28 uppercase no-print"
                                          />

                                          <span className="hidden print:inline text-[10px] text-slate-300 font-sans tracking-normal">
                                            Answer: <strong className="font-mono text-xs text-slate-900 border-b border-dashed border-slate-400 px-3">{currentVal || "......................"}</strong>
                                          </span>
                                        </div>

                                        {/* Spelling correction feedback */}
                                        {isGraded && (
                                          <div className="mt-1 font-bold text-xs no-print">
                                            {isCorrect ? (
                                              <span className="text-emerald-600 flex items-center gap-1">✓ Correct (1/1 Mark)</span>
                                            ) : (
                                              <span className="text-rose-600 flex flex-col gap-0.5">
                                                <span>✗ Incorrect (0/1 Mark)</span>
                                                <span className="text-slate-500 font-mono text-[11px] uppercase">Correct: {s.word}</span>
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Subpart B: Vocabulary Matching */}
                              <div>
                                <p className="text-xs text-slate-500 font-bold mb-3 print:mb-1.5 italic text-left">
                                  B) Match the English words in Column A with their correct example sentence context in Column B: (4 Marks)
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-6 print:gap-4 ml-4 text-xs font-extrabold">
                                  <div>
                                    <span className="block border-b border-slate-200 pb-1 mb-2 text-slate-400 uppercase text-[10px] text-left">Column A (Word)</span>
                                    <div className="space-y-3 print:space-y-1.5">
                                      {examPaper.vocabMatching.map((vm, idx) => {
                                        const currentVal = paperAns.q2b[idx] || "";
                                        
                                        const correctIndex = sortedSentences.findIndex(item => item.definitionOrSentence === vm.definitionOrSentence);
                                        const correctLetter = String.fromCharCode(65 + correctIndex);
                                        const isCorrect = currentVal.trim().toUpperCase() === correctLetter;

                                        return (
                                          <div key={`va-${idx}`} className="flex justify-between items-center min-h-[40px] print:min-h-[30px] border border-slate-200/50 bg-slate-50/50 px-3 print:px-2 rounded-lg text-left">
                                            <span>{idx + 1}. <strong className="text-indigo-900 uppercase">{vm.word}</strong></span>
                                            
                                            <div className="flex items-center gap-2">
                                              {/* Print letter indicator */}
                                              <span className="text-indigo-700 font-mono text-xs font-black">
                                                ( <span className="px-1 border-b border-dashed border-slate-400 font-extrabold min-w-[12px] inline-block text-center">{currentVal || "   "}</span> )
                                              </span>

                                              {/* Interactive matching dropdown */}
                                              <select
                                                disabled={isGraded}
                                                value={currentVal}
                                                onChange={(e) => handleAnswerChange(examPaper.id, "q2b", idx, e.target.value)}
                                                className="bg-white border border-slate-300 rounded-lg px-1.5 py-1 text-[11px] font-black focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center w-20 shrink-0 no-print"
                                              >
                                                <option value="">Select...</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                              </select>
                                            </div>

                                            {/* matching feedback */}
                                            {isGraded && (
                                              <div className="ml-2 font-bold text-[10px] no-print shrink-0">
                                                {isCorrect ? (
                                                  <span className="text-emerald-600">✓ (1/1)</span>
                                                ) : (
                                                  <span className="text-rose-600">✗ Ans: {correctLetter}</span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <span className="block border-b border-slate-200 pb-1 mb-2 text-slate-400 text-left uppercase text-[10px]">Column B (Sentence Context)</span>
                                    <div className="space-y-3 print:space-y-1.5">
                                      {sortedSentences.map((vm, idx) => {
                                        const letter = String.fromCharCode(65 + idx); // A, B, C, D, E
                                        return (
                                          <div key={`vb-${idx}`} className="flex justify-between items-center min-h-[40px] print:min-h-[30px] border border-slate-200/50 bg-slate-50/50 px-3 print:px-2 py-1 print:py-0.5 rounded-lg text-left">
                                            <span className="font-bold text-slate-700">
                                              <span className="text-indigo-600 mr-2">[{letter}]</span>
                                              {vm.definitionOrSentence}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                            {/* ================= PAGE 2 ================= */}
                            <div 
                              className="print-container text-slate-800 text-left page-break relative"
                              style={{ direction: "ltr" }}
                            >
                              {/* Page indicator for preview screen */}
                              <div className="absolute top-4 right-4 bg-indigo-50/80 backdrop-blur-sm text-indigo-700 text-[10px] px-2.5 py-1 rounded-full font-black no-print">
                                Paper {paperIdx + 1} • Page 2
                              </div>

                              {/* WATERMARK LAYER (CONDITIONAL) */}
                              {!watermarkRemoved && (
                                <div className="watermark" style={{ direction: "rtl" }}>
                                  نقلة للمناهج الالكترونية
                                </div>
                              )}

                              {/* Simple Page 2 Header */}
                              <div className="border-b border-slate-300 pb-3 mb-5 text-center relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
                                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase">
                                  <span>National Certificate Exam - Grade 3</span>
                                  <span className="font-extrabold text-indigo-900">ENGLISH LANGUAGE (PAGE 2)</span>
                                  <span>Republic of Sudan</span>
                                </div>
                                {/* Page 2 metadata identifier */}
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 text-[10px] font-bold text-slate-500">
                                  <div className="flex gap-1.5 w-1/2">
                                    <span>Pupil's Name:</span>
                                    <span className="flex-1 border-b border-dashed border-slate-300"></span>
                                  </div>
                                  <div className="flex gap-1.5 w-1/3">
                                    <span>Index No:</span>
                                    <span className="flex-1 border-b border-dashed border-slate-300"></span>
                                  </div>
                                </div>
                              </div>

                              {/* EXAM QUESTIONS SPACE - PART 2 */}
                              <div className="relative z-10 space-y-6 print:space-y-4" style={{ fontFamily: "Inter, sans-serif" }}>

                              {/* QUESTION 3: GRAMMAR & LANGUAGE STRUCTURES */}
                              <div>
                              <h3 className="text-sm font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 flex justify-between">
                                <span>Question 3: Grammar & Language Structures</span>
                                <span className="font-bold text-xs lowercase text-slate-500">(8 Marks)</span>
                              </h3>
                              <p className="text-xs text-slate-500 font-bold mb-3 italic">
                                Choose the correct option from the brackets to complete each sentence: (8 Marks)
                              </p>

                              <div className="space-y-4 print:space-y-2.5 ml-2">
                                {examPaper.grammar.map((g, idx) => {
                                  const currentVal = paperAns.q3[idx] || "";
                                  const isCorrect = currentVal === g.correct;

                                  return (
                                    <div key={`gm-${idx}`} className="text-xs">
                                      <div className="flex items-start gap-1 font-extrabold text-slate-800 text-left">
                                        <span className="text-slate-500">{idx + 1}.</span>
                                        <p className="flex-1 leading-relaxed text-left">
                                          {g.question.replace("________", "______________________")}
                                        </p>
                                      </div>

                                      {/* Interactive Grammar Pill Badges */}
                                      <div className="flex flex-wrap gap-2 mt-2 ml-4 no-print">
                                        {g.options.map((opt, oIdx) => {
                                          const isSelected = currentVal === opt;
                                          let btnClass = "border border-slate-200 rounded-xl bg-slate-50/50 px-3.5 py-1.5 cursor-pointer text-xs font-bold transition-all hover:bg-indigo-50 hover:text-indigo-900";
                                          if (isSelected) {
                                            btnClass = "border border-indigo-600 bg-indigo-600 text-white px-3.5 py-1.5 cursor-pointer text-xs font-bold transition-all shadow-sm";
                                          }
                                          if (isGraded) {
                                            if (opt === g.correct) {
                                              btnClass = "border border-emerald-500 bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-bold cursor-default shadow-sm";
                                            } else if (isSelected) {
                                              btnClass = "border border-rose-500 bg-rose-500 text-white px-3.5 py-1.5 text-xs font-bold cursor-default shadow-sm";
                                            } else {
                                              btnClass = "border border-slate-100 bg-slate-50/20 text-slate-400 px-3.5 py-1.5 text-xs font-bold cursor-default pointer-events-none";
                                            }
                                          }

                                          return (
                                            <button
                                              key={oIdx}
                                              disabled={isGraded}
                                              onClick={() => handleAnswerChange(examPaper.id, "q3", idx, opt)}
                                              className={btnClass}
                                            >
                                              {opt}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {/* Print view display */}
                                      <div className="hidden print:flex gap-4 mt-2 ml-4 font-semibold text-slate-500 text-[11px] justify-start">
                                        {g.options.map((opt, oIdx) => {
                                          const isSelected = currentVal === opt;
                                          return (
                                            <span key={oIdx} className={`border border-slate-200 rounded bg-slate-50/50 px-2.5 py-0.5 text-slate-700 ${isSelected ? "underline font-extrabold text-slate-900 bg-indigo-50/40" : ""}`}>
                                              {isSelected ? "[✓] " : "[ ] "} {opt}
                                            </span>
                                          );
                                        })}
                                      </div>

                                      {/* grammar correction label */}
                                      {isGraded && (
                                        <div className="mt-1.5 font-bold text-xs ml-4 no-print">
                                          {isCorrect ? (
                                            <span className="text-emerald-600">✓ Correct (1/1 Mark)</span>
                                          ) : (
                                            <span className="text-rose-600">
                                              ✗ Incorrect (0/1 Mark). Correct answer: <strong className="underline">{g.correct}</strong>
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* QUESTION 4: WRITING & REORDERING */}
                            <div>
                              <h3 className="text-sm font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-1 mb-3 flex justify-between">
                                <span>Question 4: Writing & Sentence Construction</span>
                                <span className="font-bold text-xs lowercase text-slate-500">(6 Marks)</span>
                              </h3>
                              <p className="text-xs text-slate-500 font-bold mb-3 italic text-left">
                                Reorder the following jumbled words to construct a chronologically correct, meaningful sentence: (6 Marks)
                              </p>

                              <div className="space-y-6 print:space-y-3 ml-2">
                                {examPaper.writing.map((w, idx) => {
                                  const currentVal = paperAns.q4[idx] || "";
                                  const isCorrect = checkWritingAnswer(currentVal, w.ordered);

                                  return (
                                    <div key={`wt-${idx}`} className="text-xs flex flex-col gap-2 print:gap-1">
                                      <div className="flex items-start gap-1 font-extrabold text-slate-800 text-left print:gap-0.5">
                                        <span className="text-slate-500">{idx + 1}. Words:</span>
                                        <span className="flex-1 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-mono text-slate-700 font-bold text-left">
                                          {w.jumbled}
                                        </span>
                                      </div>

                                      {/* Interactive text box */}
                                      <input
                                        type="text"
                                        placeholder="Write correct sentence..."
                                        disabled={isGraded}
                                        value={currentVal}
                                        onChange={(e) => handleAnswerChange(examPaper.id, "q4", idx, e.target.value)}
                                        className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none no-print"
                                      />

                                      {/* Print view display */}
                                      <div className="ml-4">
                                        <span className="text-[10px] text-slate-400 block mb-1 text-left print:block">Write your complete sentence here:</span>
                                        <div className="border-b border-dashed border-slate-400 h-6 flex items-end">
                                          <span className="text-xs font-bold text-slate-900 bg-white px-2 italic">
                                            {currentVal}
                                          </span>
                                        </div>
                                      </div>

                                      {/* writing correction label */}
                                      {isGraded && (
                                        <div className="mt-1 font-bold text-xs ml-4 no-print">
                                          {isCorrect ? (
                                            <span className="text-emerald-600 flex items-center gap-1">✓ Correct (4/4 Marks)</span>
                                          ) : (
                                            <span className="text-rose-600 flex flex-col gap-0.5">
                                              <span>✗ Incorrect (0/4 Marks)</span>
                                              <span className="text-slate-500 font-medium">Model Answer: "{w.ordered}"</span>
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Encouragement Footer */}
                            <div className="border-t border-slate-300 pt-6 mt-8 flex justify-between items-center text-xs font-bold text-slate-500">
                              <span>Sudanese Pupil Companion • Excellent Pupil Award</span>
                              <span className="italic text-slate-800 uppercase tracking-wider">🌟 Best of Luck & Outstanding Success 🌟</span>
                            </div>

                          </div>
                        </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* UNIFIED GRADING PANEL AT THE END OF ALL SHEETS (no-print) */}
                  {examPapers.length > 0 && (
                    <div className="bg-slate-50 border-2 border-indigo-100 rounded-[32px] p-6 mt-6 no-print text-left relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4 mb-6">
                        <div>
                          <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <span>📊</span>
                            <span className="text-indigo-600 font-extrabold">Unified Grading Dashboard for All Worksheets</span>
                          </h4>
                          <p className="text-xs text-slate-500 font-bold mt-1">
                            Answer the questions on all worksheets above, then click grade below to calculate your final comprehensive score.
                          </p>
                        </div>
                        
                        <div className="bg-indigo-100 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-black">
                          Active Pages: {examPapers.length} {examPapers.length === 1 ? "Page" : "Pages"} (30 marks per page)
                        </div>
                      </div>

                      {/* Score calculation logic */}
                      {(() => {
                        const allGraded = examPapers.every(p => gradedPapers[p.id]);
                        const totalScore = examPapers.reduce((sum, p) => sum + (gradedPapers[p.id] ? calculatePaperScore(p) : 0), 0);
                        const maxPossibleScore = examPapers.length * 30;
                        const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

                        return (
                          <div>
                            {!allGraded ? (
                              <div className="flex flex-col items-center justify-center py-6 text-center">
                                <span className="text-5xl mb-3 animate-bounce">📝</span>
                                <h5 className="font-black text-slate-700 text-sm mb-4">Are you finished answering all active worksheets?</h5>
                                <button
                                  onClick={() => {
                                    const nextGraded: Record<string, boolean> = {};
                                    examPapers.forEach(p => {
                                      nextGraded[p.id] = true;
                                    });
                                    setGradedPapers(nextGraded);
                                  }}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl border-b-4 border-emerald-800 shadow-md hover:shadow-lg transition-all active:scale-95 text-sm flex items-center gap-2 cursor-pointer"
                                >
                                  <span>Finish and Grade All Sheets Together 🏁</span>
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-6">
                                {/* Score Dashboard Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Big Score Card */}
                                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
                                    <span className="text-xs font-black uppercase tracking-wider opacity-90">Total Final Score</span>
                                    <span className="text-4xl font-black mt-2">{totalScore} <span className="text-lg opacity-80">/ {maxPossibleScore}</span></span>
                                    <span className="text-xs font-bold mt-1.5 bg-indigo-700/50 px-2.5 py-1 rounded-full">Completion: {percentage}%</span>
                                  </div>

                                  {/* Result / Appraisal Card */}
                                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
                                    <span className="text-2xl mb-1">
                                      {percentage >= 85 ? "👑" : percentage >= 65 ? "🌟" : percentage >= 50 ? "👍" : "📚"}
                                    </span>
                                    <h6 className="font-black text-slate-800 text-sm">Overall Student Level</h6>
                                    <p className="text-xs text-indigo-600 font-extrabold mt-1.5">
                                      {percentage >= 85 ? "Excellent! Future Doctor!" : 
                                       percentage >= 65 ? "Great job! Keep it up!" : 
                                       percentage >= 50 ? "Good, keep practicing!" : 
                                       "Needs more practice"}
                                    </p>
                                  </div>

                                  {/* Quick Actions Card */}
                                  <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col justify-center gap-2">
                                    <button
                                      onClick={() => {
                                        setGradedPapers({});
                                        setUserAnswers({});
                                      }}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-black py-2.5 px-4 rounded-xl text-xs border border-rose-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                      <span>Clear Answers & Start Over 🔄</span>
                                    </button>
                                    <button
                                      onClick={() => window.print()}
                                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black py-2.5 px-4 rounded-xl text-xs border border-emerald-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                      <span>Print Graded Report 🖨️</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Papers Breakdown List */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                                  <h6 className="text-xs font-black text-slate-700 mb-3 border-b border-slate-100 pb-2">Individual Worksheet Score Details:</h6>
                                  <div className="space-y-2">
                                    {examPapers.map((p, idx) => {
                                      const pScore = calculatePaperScore(p);
                                      return (
                                        <div key={p.id} className="flex justify-between items-center text-xs font-bold text-slate-600 bg-slate-50/50 hover:bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                          <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-[10px]">{idx + 1}</span>
                                            <span>Worksheet {idx + 1}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${pScore >= 25 ? "bg-emerald-100 text-emerald-700" : pScore >= 15 ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`}>
                                              {pScore >= 25 ? "Excellent ✨" : pScore >= 15 ? "Very Good 👍" : "Needs Support 📖"}
                                            </span>
                                            <span className="font-extrabold text-slate-800">{pScore} / 30 marks</span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </main>
      </div>

      {/* Hidden Audio Player for absolute compatibility in iframe sandbox contexts */}
      <audio ref={audioPlayerRef} className="hidden" aria-hidden="true" />

      {/* Exit Confirmation Dialog Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 text-center relative"
            >
              <span className="text-6xl mb-4 block">👋</span>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Are you sure you want to exit?</h3>
              <p className="text-slate-500 font-bold text-sm mb-6 leading-relaxed">
                You will lose all your points ({points} PTS) and progress! Stay with us for more fun games and activities in the SMILE English app!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 px-6 rounded-2xl border-b-4 border-emerald-700 active:scale-95 transition-transform cursor-pointer"
                >
                  No, Keep Playing 🎮
                </button>
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    // Force redirect or close if supported, otherwise go back
                    window.location.href = "about:blank";
                  }}
                  className="flex-1 bg-rose-100 hover:bg-rose-200 text-rose-700 font-extrabold py-3.5 px-6 rounded-2xl active:scale-95 transition-transform cursor-pointer"
                >
                  Yes, Exit 🚪
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Smart Search Helper Bot (الباحث المنهجي الذكي) */}
      <SmartSearchBot 
        onSelectLesson={handleSearchLessonSelect} 
        speakText={speakText} 
        isOpen={isSearchBotOpen} 
        setIsOpen={setIsSearchBotOpen} 
      />

      {/* Sudan Modern Learning Pupil English Footer Credits */}
      <footer className="max-w-6xl w-full mx-auto mt-8 py-6 text-center text-sky-700/60 font-semibold border-t border-sky-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs uppercase tracking-wider font-extrabold px-4">
          <p>© SMILE English • Grade 3 Interactive Companion</p>
          <div className="flex gap-3">
            <span className="text-sky-800">Pupil's Book 3</span>
            <span>•</span>
            <span className="text-sky-800">Sudan</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
