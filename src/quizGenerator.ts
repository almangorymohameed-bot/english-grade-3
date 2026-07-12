import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem } from "./types";

export interface ConfiguredQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
  unitId: number;
  lessonId: number | null; // null means general unit question
  type: "trivia" | "vocabulary" | "spelling" | "phonics";
}

const HANDCRAFTED_TRIVIA: ConfiguredQuestion[] = [
  // --- UNIT 1 ---
  {
    question: "Who introduces themselves by saying 'Hi, I'm Badr' in Lesson 1?",
    answers: ["Badr", "Ahmed", "Eddie", "Cathy"],
    correctAnswer: "Badr",
    unitId: 1,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "What country is Eddie from originally?",
    answers: ["England", "Sudan", "Egypt", "Saudi Arabia"],
    correctAnswer: "England",
    unitId: 1,
    lessonId: 5,
    type: "trivia"
  },
  {
    question: "Who is Eddie's Sudanese friend that introduces him to Mr Gamar?",
    answers: ["Ahmed", "Badr", "Hassan", "Ali"],
    correctAnswer: "Ahmed",
    unitId: 1,
    lessonId: 5,
    type: "trivia"
  },
  {
    question: "In the alphabet chant, which letter comes right after 'c'?",
    answers: ["d", "e", "f", "g"],
    correctAnswer: "d",
    unitId: 1,
    lessonId: 1,
    type: "trivia"
  },

  // --- UNIT 2 ---
  {
    question: "How many crocodiles are swimming in the Nile River in the chant?",
    answers: ["10", "5", "3", "20"],
    correctAnswer: "10",
    unitId: 2,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "How old is Badr when Ahmed asks him 'How old are you?'?",
    answers: ["8", "5", "6", "10"],
    correctAnswer: "8",
    unitId: 2,
    lessonId: 2,
    type: "trivia"
  },
  {
    question: "Who is the sad little boy who gets lost in Lesson 5?",
    answers: ["Ali", "Ahmed", "Badr", "Hassan"],
    correctAnswer: "Ali",
    unitId: 2,
    lessonId: 5,
    type: "trivia"
  },
  {
    question: "Which helpful animals say 'This way, Ali!' to guide him home?",
    answers: ["Frogs", "Crocodiles", "Lions", "Giraffes"],
    correctAnswer: "Frogs",
    unitId: 2,
    lessonId: 6,
    type: "trivia"
  },

  // --- UNIT 3 ---
  {
    question: "Complete the song: 'Point to yellow. Point to red. Point to black and point to your _______.'",
    answers: ["head", "hand", "foot", "arm"],
    correctAnswer: "head",
    unitId: 3,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "What action does the Red light represent in the traffic lights lesson?",
    answers: ["Stop", "Wait", "Go", "Turn"],
    correctAnswer: "Stop",
    unitId: 3,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "How many colours make up our beautiful Sudanese flag?",
    answers: ["Four", "Three", "Five", "Two"],
    correctAnswer: "Four",
    unitId: 3,
    lessonId: 5,
    type: "trivia"
  },
  {
    question: "What colour is lost Ali's t-shirt, which helps the officer find him?",
    answers: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Red",
    unitId: 3,
    lessonId: 8,
    type: "trivia"
  },

  // --- UNIT 4 ---
  {
    question: "Who has got a yellow lemon in Unit 4, Lesson 1?",
    answers: ["Fatma", "Dalia", "Cathy", "Badr"],
    correctAnswer: "Fatma",
    unitId: 4,
    lessonId: 1,
    type: "trivia"
  },
  {
    question: "What class is Hamad in when Eddie asks him?",
    answers: ["Class 3", "Class 1", "Class 5", "Class 4"],
    correctAnswer: "Class 3",
    unitId: 4,
    lessonId: 4,
    type: "trivia"
  },
  {
    question: "Which small animal has got a small body and long sharp spines?",
    answers: ["Hedgehog", "Rabbit", "Hen", "Monkey"],
    correctAnswer: "Hedgehog",
    unitId: 4,
    lessonId: 6,
    type: "trivia"
  },
  {
    question: "Where are the three historical pyramids located in Cathy's photos of Sudan?",
    answers: ["Shendi", "Al Fasher", "Suakin", "Khartoum"],
    correctAnswer: "Shendi",
    unitId: 4,
    lessonId: 7,
    type: "trivia"
  },

  // --- UNIT 5 ---
  {
    question: "Who is the kind teacher next to the board in Cathy's school photo?",
    answers: ["Mrs Hind", "Mrs Amna", "Mr Gamar", "Mrs Fatma"],
    correctAnswer: "Mrs Hind",
    unitId: 5,
    lessonId: 3,
    type: "trivia"
  },
  {
    question: "Where is the monkey sitting in the school prepositions lesson?",
    answers: ["on the chair", "under the desk", "behind the door", "in the bag"],
    correctAnswer: "on the chair",
    unitId: 5,
    lessonId: 4,
    type: "trivia"
  },
  {
    question: "Where is Reem's toy finally found at the end of the story?",
    answers: ["in her bag", "under her bed", "in the library", "on the floor"],
    correctAnswer: "in her bag",
    unitId: 5,
    lessonId: 5,
    type: "trivia"
  },
  {
    question: "Whose historical old table and chair can be seen in Al Fasher museum photos?",
    answers: ["Sultan's table and chair", "Teacher's chair", "Badr's desk", "Eddie's chair"],
    correctAnswer: "Sultan's table and chair",
    unitId: 5,
    lessonId: 8,
    type: "trivia"
  }
];

export function generateQuiz(
  scope: "all" | "unit" | "lesson",
  targetUnitId: number,
  targetLessonId: number,
  limit: number
): { question: string; answers: string[]; correctAnswer: string; badge: string }[] {
  
  let pool: ConfiguredQuestion[] = [];

  if (scope === "all") {
    pool = HANDCRAFTED_TRIVIA.filter((t) => SMILE_UNITS.some(u => u.id === t.unitId));
  } else if (scope === "unit") {
    pool = HANDCRAFTED_TRIVIA.filter((t) => t.unitId === targetUnitId);
  } else if (scope === "lesson") {
    pool = HANDCRAFTED_TRIVIA.filter(
      (t) => t.unitId === targetUnitId && (t.lessonId === targetLessonId || t.lessonId === null)
    );
  }

  const finalQuestions: { question: string; answers: string[]; correctAnswer: string; badge: string }[] = pool.map((item) => ({
    question: item.question,
    answers: item.answers,
    correctAnswer: item.correctAnswer,
    badge: `UNIT ${item.unitId} • LESSON ${item.lessonId || "Book"}`
  }));

  const activeUnitIds = scope === "all" 
    ? SMILE_UNITS.map(u => u.id) 
    : [targetUnitId];

  const targetWords = SMILE_UNITS
    .filter(u => activeUnitIds.includes(u.id))
    .flatMap(u => u.words);

  // Dynamic Generator Type A: Image emoji matching
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 60) return;
    
    const allDistractors = targetWords
      .filter((w) => w.word !== wordObj.word)
      .map((w) => w.word);
    
    const uniqueDistractors = Array.from(new Set(allDistractors));
    const randomDistractors = uniqueDistractors.sort(() => Math.random() - 0.5).slice(0, 3);
    
    const answers = [wordObj.word, ...randomDistractors].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Which basic vocabulary word matches this emoji: ${wordObj.image}?`,
        answers,
        correctAnswer: wordObj.word,
        badge: `VOCAB • UNIT ${wordObj.unit}`
      });
    }
  });

  // Dynamic Generator Type B: First letter spelling match
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 100) return;

    const firstLetter = wordObj.word.charAt(0).toUpperCase();
    const otherWordsWithDifferentStarts = targetWords
      .filter((w) => w.word.charAt(0).toUpperCase() !== firstLetter)
      .map((w) => w.word);

    const uniqueOthers = Array.from(new Set(otherWordsWithDifferentStarts));
    const randomOthers = uniqueOthers.sort(() => Math.random() - 0.5).slice(0, 3);

    const answers = [wordObj.word, ...randomOthers].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Identify the textbook word starting with letter '${firstLetter}' (hint: ${wordObj.image}):`,
        answers,
        correctAnswer: wordObj.word,
        badge: `SPELLING • UNIT ${wordObj.unit}`
      });
    }
  });

  // Dynamic Generator Type C: Example sentence matching
  targetWords.forEach((wordObj) => {
    if (finalQuestions.length >= 140) return;

    const sentenceHint = wordObj.example;
    const allOtherExamples = targetWords
      .filter((w) => w.word !== wordObj.word)
      .map((w) => w.word);

    const uniqueOthers = Array.from(new Set(allOtherExamples));
    const randomOthers = uniqueOthers.sort(() => Math.random() - 0.5).slice(0, 3);

    const answers = [wordObj.word, ...randomOthers].sort(() => Math.random() - 0.5);

    if (answers.length === 4) {
      finalQuestions.push({
        question: `Which textbook term fits correctly in this context sentence: "${sentenceHint}"?`,
        answers,
        correctAnswer: wordObj.word,
        badge: `EXAMPLE • UNIT ${wordObj.unit}`
      });
    }
  });

  // De-duplicate final questions by question text to ensure no repetition
  const uniqueQuestionsMap = new Map<string, typeof finalQuestions[0]>();
  finalQuestions.forEach(q => {
    const key = q.question.trim().toLowerCase();
    if (!uniqueQuestionsMap.has(key)) {
      uniqueQuestionsMap.set(key, q);
    }
  });

  const randomizedSubset = Array.from(uniqueQuestionsMap.values())
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(limit, 30));

  return randomizedSubset;
}
