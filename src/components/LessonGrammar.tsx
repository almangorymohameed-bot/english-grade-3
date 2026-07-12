import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Info, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Star 
} from "lucide-react";
import { Lesson, UnitItem } from "../types";
import { GRAMMAR_DATABASE, GrammarRule, GrammarQuizQuestion } from "../grammarData";

interface LessonGrammarProps {
  unit: UnitItem;
  lesson: Lesson;
  speakText: (text: string, voice?: string) => void;
  addPoints?: (amount: number) => void;
}

// Simple rule template dictionary to automatically handle all other lessons elegantly
const DYNAMIC_RULES_BY_TYPE: Record<string, { rule: GrammarRule; quiz: GrammarQuizQuestion[] }> = {
  "conversation": {
    rule: {
      title: "Saying Hello and Making Friends",
      titleAr: "",
      explanation: "We say 'Hello!' or 'Hi!' when we see friends, and ask 'What's your name?' to be kind and friendly.",
      explanationAr: "",
      formula: "Hello, I'm [Name] • What's your name?",
      examples: [
        { en: "Hello, I'm Ahmed.", ar: "" },
        { en: "What's your name?", ar: "" }
      ]
    },
    quiz: [
      {
        question: "Badr greets Ahmed: 'Hello, _______ Badr.'",
        questionAr: "",
        options: ["I'm", "is", "are", "you"],
        correctAnswer: "I'm",
        explanation: "We use 'I'm' (I am) to introduce ourselves.",
        explanationAr: ""
      },
      {
        question: "To ask a friend's name: 'What's your _______?'",
        questionAr: "",
        options: ["name", "bag", "book", "cap"],
        correctAnswer: "name",
        explanation: "We use 'What's your name?' to ask for someone's name.",
        explanationAr: ""
      }
    ]
  },
  "song": {
    rule: {
      title: "Counting Fun and Saying Numbers",
      titleAr: "",
      explanation: "We use numbers 1 to 10 to count our toys, books, and fruits. We add 's' when we have more than one!",
      explanationAr: "",
      formula: "1 book vs. 2/3/4 books 📚",
      examples: [
        { en: "One red apple.", ar: "" },
        { en: "Two green books.", ar: "" }
      ]
    },
    quiz: [
      {
        question: "Count the bags: 'Two _______.'",
        questionAr: "",
        options: ["bags", "bag", "a bag", "bagged"],
        correctAnswer: "bags",
        explanation: "Since 'two' is more than one, we use the plural form 'bags' with an 's'!",
        explanationAr: ""
      },
      {
        question: "Complete the counting order: '1, 2, 3, _______, 5.'",
        questionAr: "",
        options: ["four", "ten", "zero", "six"],
        correctAnswer: "four",
        explanation: "Four (4) comes directly after three (3).",
        explanationAr: ""
      }
    ]
  },
  "vocab": {
    rule: {
      title: "Colours and Classroom Objects",
      titleAr: "",
      explanation: "We describe classroom things by saying their color first, like 'a blue pen' or 'a green board'.",
      explanationAr: "",
      formula: "Color Name + Classroom Object",
      examples: [
        { en: "A red pencil.", ar: "" },
        { en: "A green board.", ar: "" }
      ]
    },
    quiz: [
      {
        question: "What colour is the beautiful grass? 'It is _______.'",
        questionAr: "",
        options: ["green", "red", "black", "white"],
        correctAnswer: "green",
        explanation: "Grass is green in nature.",
        explanationAr: ""
      },
      {
        question: "Point to the school board: 'This is a _______ board.'",
        questionAr: "",
        options: ["green", "yellow", "orange", "pink"],
        correctAnswer: "green",
        explanation: "The school board is green.",
        explanationAr: ""
      }
    ]
  }
};

export default function LessonGrammar({ 
  unit, 
  lesson, 
  speakText, 
  addPoints 
}: LessonGrammarProps) {
  const key = `${unit.id}-${lesson.id}`;
  
  // Decide which grammar structure to show (Handcrafted database or fallbacks by type)
  const data = GRAMMAR_DATABASE[key] || DYNAMIC_RULES_BY_TYPE[lesson.type] || DYNAMIC_RULES_BY_TYPE["vocab"];
  const { rule, quiz } = data;

  // Active step: "explain" (study grammar) or "quiz" (active practice)
  const [activeStep, setActiveStep] = useState<"explain" | "quiz">("explain");
  
  // Quiz specific states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersStatus, setAnswersStatus] = useState<boolean[]>([]);

  // Reset states when the selected lesson/unit changes
  useEffect(() => {
    setActiveStep("explain");
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersStatus([]);
  }, [unit.id, lesson.id]);

  const currentQuestion = quiz[currentQuestionIdx];

  const handleSelectOption = (option: string) => {
    if (hasSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || hasSubmitted) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setHasSubmitted(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnswersStatus(prev => [...prev, true]);
      if (addPoints) {
        addPoints(10); // Reward 10 points for a correct grammar answer
      }
      speakText("Correct! Well done!", "Kore");
    } else {
      setAnswersStatus(prev => [...prev, false]);
      speakText("Not quite right. Let's look at the correct rule.", "Zephyr");
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    
    if (currentQuestionIdx + 1 < quiz.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      speakText(`Congratulations! You finished the lesson quiz with score ${score} out of ${quiz.length}!`, "Kore");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersStatus([]);
    speakText("Let's try the grammar quiz again!", "Kore");
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50/40 to-white p-5 sm:p-7 rounded-[32px] border-2 border-indigo-100 flex flex-col gap-5 text-left w-full mt-6" dir="ltr">
      
      {/* Visual Header */}
      <div className="border-b-2 border-dashed border-indigo-100 pb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="text-md sm:text-lg font-black text-indigo-950 flex items-center gap-1.5 leading-tight">
              <span>Grammar Corner</span>
              <span className="text-[10px] bg-indigo-100 text-indigo-700 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Grammar Corner
              </span>
            </h4>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">
              Explore primary grammar rules from your Grade 1 textbook and test your understanding!
            </p>
          </div>
        </div>

        {/* Navigation Mode Selector */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              setActiveStep("explain");
              speakText("Grammar Explanation", "Kore");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              activeStep === "explain"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            📖 Rule Explanation
          </button>
          <button
            onClick={() => {
              setActiveStep("quiz");
              speakText("Grammar Quiz", "Kore");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              activeStep === "quiz"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            ✏️ Practice Quiz
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: GRAMMAR RULE EXPLANATION */}
        {activeStep === "explain" && (
          <motion.div
            key="explain"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 text-left"
          >
            {/* The Rule Card */}
            <div className="bg-white p-5 rounded-[24px] border border-indigo-100/60 shadow-xs flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-10">
                <Sparkles className="w-16 h-16 text-indigo-600" />
              </div>

              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Active Grammar Rule</span>
                  <h5 className="text-md sm:text-lg font-black text-indigo-950 mt-1 leading-snug">
                    {rule.title}
                  </h5>
                </div>
              </div>

              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/40 text-xs text-slate-700 leading-relaxed font-semibold mt-1">
                <p className="text-left font-black text-indigo-950 text-[13px] mb-1.5" dir="ltr">
                  💡 {rule.explanation}
                </p>
              </div>

              {/* Structural Formula if available */}
              {rule.formula && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center font-mono text-xs text-indigo-900 mt-1" dir="ltr">
                  <span className="text-[9px] block font-black text-slate-400 uppercase tracking-widest text-center mb-1">Structural Formula</span>
                  <pre className="font-extrabold whitespace-pre-wrap leading-tight select-all text-center">{rule.formula}</pre>
                </div>
              )}
            </div>

            {/* Sentence Examples section */}
            <div>
              <span className="text-xs font-black text-indigo-900 flex items-center gap-1 mb-2.5">
                🌟 Interactive Sentence Examples:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rule.examples.map((ex, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1 text-left"
                  >
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="text-[9px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase leading-none">Example {index + 1}</span>
                      <button
                        onClick={() => speakText(ex.en, "Kore")}
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                        title="Pronounce"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-extrabold text-indigo-950 text-left text-sm mt-1" dir="ltr">
                      {ex.en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action to proceed to quiz */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActiveStep("quiz");
                speakText("Let's start the quiz!", "Kore");
              }}
              className="mt-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transform transition-all"
            >
              <span>Start Grammar Quiz! ✏️</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2: GRAMMAR QUIZ */}
        {activeStep === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 text-left"
          >
            {/* If Quiz is in progress */}
            {!quizFinished ? (
              <div className="flex flex-col gap-4">
                {/* Score and Progress Meter */}
                <div className="flex justify-between items-center text-xs font-black text-indigo-950">
                  <span>Question {currentQuestionIdx + 1} of {quiz.length}</span>
                  <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                    Score: {score} / {quiz.length} 🌟
                  </span>
                </div>

                {/* Question Box */}
                <div className="bg-white p-5 rounded-[24px] border border-indigo-100 shadow-xs flex flex-col gap-2 text-center relative overflow-hidden">
                  <div className="absolute left-3 top-3 opacity-5">
                    <HelpCircle className="w-16 h-16 text-indigo-600" />
                  </div>

                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Choose the Correct Option</p>
                  
                  {/* English Question */}
                  <h5 className="text-[16px] sm:text-[18px] font-black text-indigo-950 text-left leading-snug mt-1" dir="ltr">
                    {currentQuestion.question}
                  </h5>
                </div>

                {/* Answer Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === currentQuestion.correctAnswer;
                    
                    let btnStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-700";
                    if (isSelected) {
                      btnStyle = "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-600/30";
                    }
                    if (hasSubmitted) {
                      if (isCorrectOption) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/20";
                      } else {
                        btnStyle = "bg-slate-50 border-slate-150 text-slate-400 cursor-not-allowed";
                      }
                    }

                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        disabled={hasSubmitted}
                        whileHover={{ scale: hasSubmitted ? 1 : 1.015 }}
                        whileTap={{ scale: hasSubmitted ? 1 : 0.985 }}
                        className={`py-3.5 px-5 rounded-xl border-2 font-black text-sm uppercase tracking-wide transition-all text-left cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                        dir="ltr"
                      >
                        <span>{option}</span>
                        {hasSubmitted && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {hasSubmitted && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Submission Action */}
                <div className="mt-1">
                  {!hasSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        selectedAnswer
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>Verify Grammar</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Explanation Banner when checked */}
                <AnimatePresence>
                  {hasSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={`p-4 rounded-xl border-2 flex flex-col gap-1 text-left mt-1 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                          : "bg-rose-50/50 border-rose-100 text-rose-950"
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-1">
                        <Info className="w-4 h-4" /> Grammar explanation:
                      </span>
                      <p className="text-xs font-black text-left mt-0.5" dir="ltr">
                        {currentQuestion.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* If Quiz is finished, show total results */
              <div className="bg-white p-6 rounded-[28px] border-2 border-indigo-100 text-center flex flex-col items-center gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 to-transparent pointer-events-none" />

                <motion.div
                  initial={{ scale: 0.5, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white mt-2"
                >
                  <Award className="w-10 h-10" />
                </motion.div>

                <div className="text-center">
                  <h5 className="text-lg font-black text-indigo-950 uppercase tracking-wide">Excellent! Quiz Completed</h5>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    Excellent Grammar Study! Keep up the brilliant progress.
                  </p>
                </div>

                {/* Score Counter Widget */}
                <div className="bg-indigo-50/50 py-3.5 px-6 rounded-2xl border border-indigo-100 flex flex-col items-center gap-0.5 min-w-[200px]">
                  <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Final Score</span>
                  <span className="text-2xl font-black text-indigo-950">{score} of {quiz.length}</span>
                  <span className="text-[11px] font-bold text-slate-500">({Math.round((score / quiz.length) * 100)}% correct answers)</span>
                </div>

                {/* Score breakdown visual indicator */}
                <div className="flex gap-2.5 my-1">
                  {answersStatus.map((status, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        status ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                      title={`Question ${index + 1}`}
                    >
                      {status ? (
                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                      ) : (
                        <span className="text-[8px] font-bold text-white">X</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="py-3 px-4 rounded-xl font-black text-xs uppercase bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStep("explain");
                      speakText("Let's review the grammar rules again", "Kore");
                    }}
                    className="py-3 px-4 rounded-xl font-black text-xs uppercase bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Review Rules</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
