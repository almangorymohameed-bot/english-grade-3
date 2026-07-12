import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem } from "./types";

export interface ExamPassage {
  title: string;
  text: string;
  unitId: number;
  questions: Array<{
    question: string;
    answer: string;
    options?: string[];
    isTrueFalse?: boolean;
    correctTF?: "True" | "False";
  }>;
}

export interface SpellingQuestion {
  word: string;
  clue: string;
  gapped: string; // e.g. "c h _ m _ s t r y"
  unitId: number;
}

export interface GrammarQuestion {
  question: string;
  options: string[];
  correct: string;
  unitId: number;
}

export interface WritingQuestion {
  jumbled: string;
  ordered: string;
  unitId: number;
}

export interface ExamPaper {
  id: string;
  passage: ExamPassage;
  spelling: SpellingQuestion[];
  vocabMatching: Array<{ word: string; definitionOrSentence: string }>;
  grammar: GrammarQuestion[];
  writing: WritingQuestion[];
}

// Pre-defined exam passages based on Grade 3 curriculum (SMILE 1)
const PASSAGES: ExamPassage[] = [
  {
    title: "My Name is Ahmed",
    text: "Hello! My name is Ahmed. I am Sudanese. I am eight years old. My best friend is Badr. We play together every day. Ahmed has got a green school bag with an apple and a book inside.",
    unitId: 1,
    questions: [
      { question: "What is the boy's name?", answer: "His name is Ahmed." },
      { question: "How old is Ahmed?", answer: "He is eight years old." },
      { question: "Ahmed is from England.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Ahmed has got a green bag.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "Little Ali is Lost",
    text: "Little Ali is lost. He is five years old. He has got a red t-shirt, brown eyes, and black hair. Ali sees four hens and five frogs near the trees. The friendly frogs say, 'This way, Ali!' to show him the house. Ali finds his mother Amna and is very happy.",
    unitId: 2,
    questions: [
      { question: "How old is Little Ali?", answer: "He is five years old." },
      { question: "What animal shows Ali his house?", answer: "The frogs." },
      { question: "Ali has got a blue t-shirt.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Ali's mother is named Amna.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "Our Sudanese Flag",
    text: "This is our beautiful Sudanese flag. It has got four colours. The colours are red, green, white and black. Badr can draw the flag in his blue school book. We love our flag very much.",
    unitId: 3,
    questions: [
      { question: "How many colours are there in the Sudanese flag?", answer: "Four colours." },
      { question: "What are the colours of our flag?", answer: "Red, green, white and black." },
      { question: "The flag has blue colour.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Badr can draw the flag.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "Gonfooth the Small Hedgehog",
    text: "Gonfooth is a small hedgehog. He has got a small body and long sharp spines. Gonfooth walks through the grass and sees Mrs Rabbit and Mr Monkey. Mr Fox is hungry and has got big teeth, but he cannot catch Gonfooth.",
    unitId: 4,
    questions: [
      { question: "What animal is Gonfooth?", answer: "He is a hedgehog." },
      { question: "Who has got big teeth?", answer: "Mr Fox." },
      { question: "Gonfooth has got a big body.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Mr Fox is hungry.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "Our Bright Classroom",
    text: "This is our school classroom. It is very clean and bright. Our teacher is Mrs Hind. We sit on wooden chairs next to our desks. There is a blackboard and a big fan on the wall. Reem's toy is in her school bag under her desk.",
    unitId: 5,
    questions: [
      { question: "Who is the teacher in the classroom?", answer: "Mrs Hind." },
      { question: "Where is Reem's toy?", answer: "In her school bag under her desk." },
      { question: "The classroom has got a fan.", answer: "", isTrueFalse: true, correctTF: "True" },
      { question: "The children sit on the floor.", answer: "", isTrueFalse: true, correctTF: "False" }
    ]
  },
  {
    title: "My Happy Family",
    text: "I have got a very happy family in Khartoum. My father's name is Ibrahim. He is tall and very kind. My mother's name is Amna. She cooks delicious rice and chicken. I have got a baby brother, Omar, and a grandfather who tells us stories.",
    unitId: 6,
    questions: [
      { question: "What is Ahmed's father's name?", answer: "His name is Ibrahim." },
      { question: "What does his mother cook?", answer: "She cooks delicious rice and chicken." },
      { question: "Ahmed's family is sad.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Ahmed's baby brother is named Omar.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "What are they wearing?",
    text: "Today is a beautiful warm day. Cathy is wearing a clean blue shirt and white trousers. Fatma is wearing a green dress and clean black shoes with white socks. Ahmed has got a red cap on his head.",
    unitId: 7,
    questions: [
      { question: "What is Cathy wearing?", answer: "She is wearing a blue shirt and white trousers." },
      { question: "What colour is Ahmed's cap?", answer: "It is red." },
      { question: "Fatma's dress is yellow.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Fatma's shoes are clean.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "Our House in Omdurman",
    text: "Our house in Omdurman is big and clean. It has got four bedrooms, a kitchen, a bathroom, and a sitting room. Father is in the kitchen making hot tea. Ali is reading a book on his bed, and mother is sitting on a chair in the sitting room.",
    unitId: 8,
    questions: [
      { question: "Where is Ahmed's house?", answer: "His house is in Omdurman." },
      { question: "Who is in the kitchen?", answer: "His father is in the kitchen." },
      { question: "The house has got ten bedrooms.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Ali is reading in the sitting room.", answer: "", isTrueFalse: true, correctTF: "False" }
    ]
  },
  {
    title: "Healthy Food and Drinks",
    text: "Healthy food makes us grow strong. For breakfast, Badr likes fresh cheese and bread with dates. Dates are very sweet and red. Badr drinks a glass of milk every morning. Eddie likes yellow bananas and oranges, but he does not like tea.",
    unitId: 9,
    questions: [
      { question: "What does Badr eat for breakfast?", answer: "He eats cheese, bread, and dates." },
      { question: "What drink does Badr have every morning?", answer: "He drinks a glass of milk." },
      { question: "Sudanese dates are bitter.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Eddie likes tea.", answer: "", isTrueFalse: true, correctTF: "False" }
    ]
  },
  {
    title: "Animals on the Farm",
    text: "My grandfather has got a green farm near the Nile. He has got many animals. There is a tall camel with a long neck, and three sheep eating grass. A brown horse runs very fast in the yard. We also see funny little monkeys playing in the trees.",
    unitId: 10,
    questions: [
      { question: "Where is the grandfather's farm?", answer: "It is near the River Nile." },
      { question: "Which animal runs very fast?", answer: "The horse." },
      { question: "The camel has got a short neck.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Monkeys are playing in the trees.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  },
  {
    title: "How We Travel",
    text: "People in Sudan use different ways to travel. Ahmed goes to school by the yellow school bus. Badr goes on foot because his house is next to the school gate. Planes fly very fast in the sky. Small boats swim slowly on the River Nile.",
    unitId: 11,
    questions: [
      { question: "How does Ahmed go to school?", answer: "He goes by the yellow school bus." },
      { question: "What flies fast in the sky?", answer: "Planes." },
      { question: "Badr goes to school by train.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Boats on the Nile are very fast.", answer: "", isTrueFalse: true, correctTF: "False" }
    ]
  },
  {
    title: "Play Time in the Afternoon",
    text: "We are primary school students in grade three. In the afternoon, we have got play time. Ahmed and Badr are best friends. They can run fast in the playground. Cathy and Fatma like to play educational games together on their tablets. Learning is so much fun!",
    unitId: 12,
    questions: [
      { question: "What grade are the students in?", answer: "They are in grade three." },
      { question: "Who are best friends?", answer: "Ahmed and Badr." },
      { question: "Ahmed and Badr can swim in the Nile.", answer: "", isTrueFalse: true, correctTF: "False" },
      { question: "Cathy and Fatma play games on tablets.", answer: "", isTrueFalse: true, correctTF: "True" }
    ]
  }
];

const SPELLING_POOL: SpellingQuestion[] = [
  { word: "APPLE", clue: "A round sweet red or green fruit", gapped: "a p _ l e", unitId: 1 },
  { word: "BAG", clue: "You carry books to school in this", gapped: "b _ g", unitId: 1 },
  { word: "BED", clue: "You sleep on this at night", gapped: "b _ d", unitId: 1 },
  { word: "DESK", clue: "A school table for writing", gapped: "d _ s k", unitId: 1 },
  { word: "NILE", clue: "The great river that flows through Sudan", gapped: "n i _ e", unitId: 2 },
  { word: "SUN", clue: "It shines hot in the sky", gapped: "s _ n", unitId: 2 },
  { word: "RED", clue: "The colour of a tomato or stop light", gapped: "r _ d", unitId: 3 },
  { word: "BLUE", clue: "The colour of the clear sky", gapped: "b l _ e", unitId: 3 },
  { word: "BODY", clue: "It has a head, neck, arms, and legs", gapped: "b o _ y", unitId: 4 },
  { word: "EYES", clue: "You see things with these", gapped: "e y _ s", unitId: 4 },
  { word: "DOOR", clue: "You open this to enter the classroom", gapped: "d o _ r", unitId: 5 },
  { word: "BOARD", clue: "The teacher writes on this in class", gapped: "b o _ r d", unitId: 5 },
  { word: "FATHER", clue: "The male parent of a family", gapped: "f a _ h e r", unitId: 6 },
  { word: "MOTHER", clue: "The female parent of a family", gapped: "m o _ h e r", unitId: 6 },
  { word: "SHIRT", clue: "You wear this on your body", gapped: "s h _ r t", unitId: 7 },
  { word: "DRESS", clue: "Girls wear this beautiful clothing", gapped: "d r _ s s", unitId: 7 },
  { word: "HOUSE", clue: "The building where a family lives", gapped: "h o _ s e", unitId: 8 },
  { word: "KITCHEN", clue: "Where mother cooks food and makes tea", gapped: "k i _ c h e n", unitId: 8 },
  { word: "MILK", clue: "White healthy drink from cows", gapped: "m _ l k", unitId: 9 },
  { word: "DATES", clue: "Sweet brown fruit from palm trees", gapped: "d a _ e s", unitId: 9 },
  { word: "CAMEL", clue: "A strong desert animal with a long neck", gapped: "c a _ e l", unitId: 10 },
  { word: "LION", clue: "The wild king of the forest with big teeth", gapped: "l _ o n", unitId: 10 },
  { word: "BUS", clue: "Large vehicle that carries students to school", gapped: "b _ s", unitId: 11 },
  { word: "PLANE", clue: "It flies fast high in the sky", gapped: "p l _ n e", unitId: 11 },
  { word: "RUN", clue: "To move very fast on your feet", gapped: "r _ n", unitId: 12 },
  { word: "PLAY", clue: "To have fun doing games with friends", gapped: "p _ a y", unitId: 12 }
];

const GRAMMAR_POOL: GrammarQuestion[] = [
  { question: "Hello! I ________ Ahmed. What's your name?", options: ["am", "is", "are"], correct: "am", unitId: 1 },
  { question: "I have got two ________.", options: ["bags", "bag", "a bag"], correct: "bags", unitId: 1 },
  { question: "How old ________ you, Badr?", options: ["are", "is", "am"], correct: "are", unitId: 2 },
  { question: "How ________ frogs are there in the Nile?", options: ["many", "much", "old"], correct: "many", unitId: 2 },
  { question: "What colour ________ his hair?", options: ["is", "are", "be"], correct: "is", unitId: 3 },
  { question: "What colour are her eyes? They ________ brown.", options: ["are", "is", "am"], correct: "are", unitId: 3 },
  { question: "I ________ got a yellow lemon.", options: ["have", "has", "am"], correct: "have", unitId: 4 },
  { question: "Fatma ________ got a green melon.", options: ["has", "have", "is"], correct: "has", unitId: 4 },
  { question: "Where is the book? It's ________ the bag.", options: ["in", "on", "under"], correct: "in", unitId: 5 },
  { question: "Is it a pen? Yes, it ________.", options: ["is", "isn't", "not"], correct: "is", unitId: 5 },
  { question: "Who is that man? This is ________ father.", options: ["my", "you", "he"], correct: "my", unitId: 6 },
  { question: "My sister is short. ________ is happy.", options: ["She", "He", "It"], correct: "She", unitId: 6 },
  { question: "What are you wearing? I ________ wearing a blue shirt.", options: ["am", "is", "are"], correct: "am", unitId: 7 },
  { question: "Are your shoes clean? Yes, they ________.", options: ["are", "aren't", "is"], correct: "are", unitId: 7 },
  { question: "Where is mother? She is ________ the kitchen.", options: ["in", "on", "under"], correct: "in", unitId: 8 },
  { question: "Is there a fridge in the sitting room? No, there ________.", options: ["isn't", "is", "not"], correct: "isn't", unitId: 8 },
  { question: "Do you ________ dates? Yes, I do.", options: ["like", "likes", "liking"], correct: "like", unitId: 9 },
  { question: "Can I have ________ water, please?", options: ["some", "a", "an"], correct: "some", unitId: 9 },
  { question: "The camel ________ got a long neck.", options: ["has", "have", "is"], correct: "has", unitId: 10 },
  { question: "How do you ________ to school?", options: ["go", "goes", "going"], correct: "go", unitId: 11 },
  { question: "I go to school ________ bus.", options: ["by", "on", "in"], correct: "by", unitId: 11 },
  { question: "Can you ________? Yes, I can.", options: ["swim", "swimming", "swims"], correct: "swim", unitId: 12 }
];

const WRITING_POOL: WritingQuestion[] = [
  { jumbled: "Badr / is / name / My / .", ordered: "My name is Badr.", unitId: 1 },
  { jumbled: "old / are / How / you / ?", ordered: "How old are you?", unitId: 2 },
  { jumbled: "is / Sudanese / the / flag / red / .", ordered: "The Sudanese flag is red.", unitId: 3 },
  { jumbled: "got / a / I / melon / have / .", ordered: "I have got a melon.", unitId: 4 },
  { jumbled: "under / table / is / the / book / The / .", ordered: "The book is under the table.", unitId: 5 },
  { jumbled: "is / father / my / This / .", ordered: "This is my father.", unitId: 6 },
  { jumbled: "am / white / I / socks / wearing / .", ordered: "I am wearing white socks.", unitId: 7 },
  { jumbled: "is / kitchen / in / the / Mother / .", ordered: "Mother is in the kitchen.", unitId: 8 },
  { jumbled: "dates / like / sweet / I / .", ordered: "I like sweet dates.", unitId: 9 },
  { jumbled: "camel / long / has / a / neck / The / .", ordered: "The camel has a long neck.", unitId: 10 },
  { jumbled: "to / go / by / I / school / bus / .", ordered: "I go to school by bus.", unitId: 11 },
  { jumbled: "run / can / We / fast / .", ordered: "We can run fast.", unitId: 12 }
];

/**
 * Generic helper to select a list of unique items from a pool,
 * ensuring no duplicate keys within the same selection,
 * and preferring items that have not been globally used.
 */
function getUniqueSelection<T>(
  pool: T[],
  countNeeded: number,
  getKey: (item: T) => string,
  globalUsedKeys: Set<string>
): T[] {
  let available = pool.filter(item => !globalUsedKeys.has(getKey(item)));
  
  if (available.length < countNeeded) {
    available = [...pool];
  }
  
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  
  const selection: T[] = [];
  const selectionKeys = new Set<string>();
  
  for (const item of shuffled) {
    const key = getKey(item);
    if (!selectionKeys.has(key)) {
      selectionKeys.add(key);
      selection.push(item);
      if (selection.length === countNeeded) {
        break;
      }
    }
  }
  
  selection.forEach(item => globalUsedKeys.add(getKey(item)));
  
  return selection;
}

/**
 * Generates an array of non-overlapping A4 exam papers
 */
export function generateSudanExams(
  count: number,
  scope: "all" | "unit" | "lesson",
  targetUnitId?: number,
  targetLessonId?: number
): ExamPaper[] {
  const papers: ExamPaper[] = [];

  const usedPassageTitles = new Set<string>();
  const usedSpellingWords = new Set<string>();
  const usedVocabWords = new Set<string>();
  const usedGrammarQuestions = new Set<string>();
  const usedWritingJumbled = new Set<string>();

  for (let i = 0; i < count; i++) {
    // 1. FILTER PASSAGES
    let passagePool = [...PASSAGES];
    if (scope === "unit" && targetUnitId !== undefined) {
      passagePool = passagePool.filter((p) => p.unitId === targetUnitId);
    }
    if (passagePool.length === 0) {
      passagePool = [...PASSAGES];
    }
    const selectedPassages = getUniqueSelection(
      passagePool,
      1,
      (p) => p.title,
      usedPassageTitles
    );
    const passage = selectedPassages[0] || PASSAGES[0];

    // 2. FILTER SPELLING
    let spellingPool = [...SPELLING_POOL];
    if (scope === "unit" && targetUnitId !== undefined) {
      spellingPool = spellingPool.filter((s) => s.unitId === targetUnitId);
    }
    if (spellingPool.length === 0) {
      spellingPool = [...SPELLING_POOL];
    }
    const spellingShuffled = getUniqueSelection(
      spellingPool,
      Math.min(spellingPool.length, 4),
      (s) => s.word,
      usedSpellingWords
    );

    // 3. FILTER VOCABULARY MATCHING
    let vocabWordsPool: WordItem[] = [];
    if (scope === "unit" && targetUnitId !== undefined) {
      const selectedUnit = SMILE_UNITS.find((u) => u.id === targetUnitId);
      if (selectedUnit) {
        vocabWordsPool = [...selectedUnit.words];
      }
    } else {
      SMILE_UNITS.forEach((unit) => {
        vocabWordsPool.push(...unit.words);
      });
    }

    if (vocabWordsPool.length === 0) {
      SMILE_UNITS.forEach((unit) => {
        vocabWordsPool.push(...unit.words);
      });
    }

    const vocabSelection = getUniqueSelection(
      vocabWordsPool,
      Math.min(vocabWordsPool.length, 5),
      (v) => v.word.toLowerCase().trim(),
      usedVocabWords
    );

    const vocabMatching = vocabSelection.map((item) => {
      const regex = new RegExp(`\\b${item.word}\\b`, "gi");
      let sentence = item.example;
      if (regex.test(sentence)) {
        sentence = sentence.replace(regex, "________");
      } else {
        sentence = sentence.replace(item.word, "________");
        sentence = sentence.replace(item.word.toLowerCase(), "________");
      }
      return {
        word: item.word.toUpperCase(),
        definitionOrSentence: sentence
      };
    });

    // 4. FILTER GRAMMAR
    let grammarPool = [...GRAMMAR_POOL];
    if (scope === "unit" && targetUnitId !== undefined) {
      grammarPool = grammarPool.filter((g) => g.unitId === targetUnitId);
    }
    if (grammarPool.length === 0) {
      grammarPool = [...GRAMMAR_POOL];
    }
    const grammarShuffled = getUniqueSelection(
      grammarPool,
      Math.min(grammarPool.length, 5),
      (g) => g.question.trim().toLowerCase(),
      usedGrammarQuestions
    );

    // 5. FILTER WRITING
    let writingPool = [...WRITING_POOL];
    if (scope === "unit" && targetUnitId !== undefined) {
      writingPool = writingPool.filter((w) => w.unitId === targetUnitId);
    }
    if (writingPool.length === 0) {
      writingPool = [...WRITING_POOL];
    }
    const writingShuffled = getUniqueSelection(
      writingPool,
      Math.min(writingPool.length, 2),
      (w) => w.jumbled.trim().toLowerCase(),
      usedWritingJumbled
    );

    papers.push({
      id: `paper-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      passage,
      spelling: spellingShuffled,
      vocabMatching,
      grammar: grammarShuffled,
      writing: writingShuffled
    });
  }

  return papers;
}
