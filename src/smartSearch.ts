import { SMILE_UNITS } from "./smileData";
import { UnitItem, Lesson, WordItem } from "./types";

export interface SearchResult {
  reply: string;
  voiceText: string;
  matchedWords: WordItem[];
  matchedLessons: { lesson: Lesson; unitId: number; unitTitle: string }[];
  matchedUnits: UnitItem[];
  suggestions: string[];
}

function normalizeArabic(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u0652]/g, "") // Remove harakat (tashkeel)
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .toLowerCase()
    .trim();
}

export function searchSMILECurriculum(query: string): SearchResult {
  const normQuery = query.toLowerCase().trim();
  const normQueryAr = normalizeArabic(query);
  
  const result: SearchResult = {
    reply: "",
    voiceText: "",
    matchedWords: [],
    matchedLessons: [],
    matchedUnits: [],
    suggestions: [
      "Who is Little Ali? 👦",
      "Tell me about the Sudanese flag 🇸🇩",
      "Explain 'Have Got' 📝",
      "What is Unit 5 about? 🏫",
      "Who is Gonfooth? 🦔"
    ]
  };

  if (!normQuery) {
    result.reply = "Hello there! Ask me any question about vocabulary, grammar rules, characters, or lessons in your Grade 1 Sudanese English syllabus (SMILE Starter 1) and I will help you instantly! 🧠✨";
    result.voiceText = "Hello! Ask me any question about vocabulary, grammar rules, characters, or lessons in your Grade 1 Sudanese English syllabus.";
    return result;
  }

  // 1. UNIT MATCHING
  const unitKeywords = ["unit", "chapter", "module", "lesson", "وحده", "الوحده"];
  const isUnitQuery = unitKeywords.some(k => normQuery.includes(k) || normQueryAr.includes(k));
  
  let targetUnitNum = 0;
  if (normQuery.includes("first") || normQuery.includes("one") || normQuery.includes("1") || normQueryAr.includes("اول")) targetUnitNum = 1;
  else if (normQuery.includes("second") || normQuery.includes("two") || normQuery.includes("2") || normQueryAr.includes("ثان")) targetUnitNum = 2;
  else if (normQuery.includes("third") || normQuery.includes("three") || normQuery.includes("3") || normQueryAr.includes("ثالع")) targetUnitNum = 3;
  else if (normQuery.includes("fourth") || normQuery.includes("four") || normQuery.includes("4") || normQueryAr.includes("رابع")) targetUnitNum = 4;
  else if (normQuery.includes("fifth") || normQuery.includes("five") || normQuery.includes("5") || normQueryAr.includes("خامس")) targetUnitNum = 5;

  if (isUnitQuery && targetUnitNum > 0) {
    const matchedUnit = SMILE_UNITS.find(u => u.id === targetUnitNum);
    if (matchedUnit) {
      result.matchedUnits.push(matchedUnit);
      result.reply = `✨ **Unit ${matchedUnit.id}: ${matchedUnit.title}**\n\nThis unit contains wonderful lessons for Grade 1 pupils! Here are the lessons:\n` + 
        matchedUnit.lessons.map(l => `• **${l.title}**`).join("\n") + 
        `\n\n💡 You can click any of these lessons in the book view list on the left to read and learn!`;
      result.voiceText = `Unit ${matchedUnit.id} is about ${matchedUnit.title}. It has ${matchedUnit.lessons.length} lessons.`;
      
      result.suggestions = matchedUnit.lessons.slice(0, 3).map(l => l.title);
      return result;
    }
  }

  // 2. GRAMMAR MATCHING
  const grammarKeywords = ["rule", "grammar", "have got", "has got", "preposition", "plural", "singular", "pronoun", "qawaid", "قواعد", "قاعده"];
  const isGrammarQuery = grammarKeywords.some(k => normQuery.includes(k) || normQueryAr.includes(normalizeArabic(k)));

  if (isGrammarQuery) {
    if (normQuery.includes("have got") || normQuery.includes("has got") || normQuery.includes("possession") || normQueryAr.includes("ملك")) {
      result.reply = `📝 **'Have Got' and 'Has Got' in SMILE Starter 1:**\n\n` +
        `We use these to show ownership of objects or physical features:\n\n` +
        `**1. I / You / We / They + Have Got ('ve got):**\n` +
        `• *I've got a yellow lemon.*\n` +
        `• *I've got two arms and two legs.*\n\n` +
        `**2. He / She / It + Has Got ('s got):**\n` +
        `• *Fatma's got a yellow lemon.*\n` +
        `• *Sukkar the monkey has got a long tail.*\n` +
        `• *Mr Fox has got big teeth.*`;
      result.voiceText = "We use have got for I, and has got for he or she. For example, I have got a lemon, and Fatma has got a lemon.";
      result.suggestions = ["Explain Prepositions", "Singular and Plural"];
      return result;
    }

    if (normQuery.includes("preposition") || normQuery.includes("where") || normQuery.includes("in") || normQuery.includes("on") || normQuery.includes("under") || normQueryAr.includes("مكان")) {
      result.reply = `📝 **Prepositions of Place in SMILE Starter 1:**\n\n` +
        `We use these words to show where something is:\n\n` +
        `1. **In**:\n` +
        `   • *The book is in my bag.*\n` +
        `2. **On**:\n` +
        `   • *The monkey's on the chair.*\n` +
        `3. **Under**:\n` +
        `   • *The ruler is under the table.*\n` +
        `4. **Next to**:\n` +
        `   • *The red pencil is next to the book.*\n` +
        `5. **Behind**:\n` +
        `   • *Is the ruler behind the door?*`;
      result.voiceText = "Prepositions are in, on, under, next to, and behind. The monkey is on the chair, and the ruler is under the table.";
      result.suggestions = ["Explain 'Have Got'", "Singular and Plural"];
      return result;
    }

    if (normQuery.includes("plural") || normQuery.includes("singular") || normQuery.includes("s") || normQueryAr.includes("جمع")) {
      result.reply = `📝 **Singular and Plural Nouns:**\n\n` +
        `We add an '**s**' to make a word plural when there is more than one:\n\n` +
        `• **Singular:** *a bag*, *an apple*, *a frog*\n` +
        `• **Plural:** *two bags*, *three frogs*, *ten cats*\n\n` +
        `**Examples:**\n` +
        `• *A bag. Two bags.*\n` +
        `• *There are ten cats.*`;
      result.voiceText = "We add an S to make a word plural. A bag, two bags.";
      result.suggestions = ["Explain 'Have Got'", "Explain Prepositions"];
      return result;
    }

    // General Grammar overview
    result.reply = `📚 **Grammar Guide for SMILE Grade 1 (Starter 1):**\n\nHere are the core grammar concepts in your textbook:\n\n` +
    `1. **Greetings and Introduction** (Unit 1 - Hello! I'm Badr)\n` +
    `2. **Singular & Plural Nouns** (Unit 1 & 2 - A bag, two bags)\n` +
    `3. **How Old Are You?** (Unit 2 - I'm 8)\n` +
    `4. **Asking about Colours** (Unit 3 - What colour is it? Is it red?)\n` +
    `5. **Possession with Have Got** (Unit 4 - I've got a body, he's got big teeth)\n` +
    `6. **Prepositions of Place** (Unit 5 - The book is in my bag)\n\n` +
    `💡 Ask about any rule (e.g. "Explain 'Have Got'") to see detailed explanations!`;
    result.voiceText = "Your grade 1 syllabus includes Greetings, Plural nouns, Age, Colours, Have Got, and Prepositions. Ask me about any of them!";
    result.suggestions = ["Explain 'Have Got'", "Explain Prepositions", "Singular and Plural"];
    return result;
  }

  // 3. CHARACTERS MATCHING
  const characters = [
    {
      names: ["ali", "علي", "lost", "ضائع"],
      title: "Little Ali 👦",
      bioText: "Little Ali is a sweet five-year-old boy. In Unit 2, he gets lost and walks around saying hello to hens, monkeys, and frogs. He is wearing a red t-shirt, has brown eyes, and black hair. He successfully finds his house and mother Amna with the help of friendly frogs who say 'This way, Ali!'.",
      englishText: "Little Ali is five years old, wears a red t-shirt, and gets lost but finds his mother.",
      unit: 2, lessonId: 5
    },
    {
      names: ["badr", "بدر"],
      title: "Badr 👋",
      bioText: "Badr is an active Sudanese school pupil. In Unit 1, Lesson 1, he introduces himself: 'Hi, I'm Badr.' He is eight years old, is best friends with Ahmed, and is a key character who asks questions about names, ages, and colours.",
      englishText: "Badr is an eight-year-old schoolboy who introduces himself by saying: Hi, I'm Badr.",
      unit: 1, lessonId: 1
    },
    {
      names: ["ahmed", "أحمد", "احمد"],
      title: "Ahmed 🎒",
      bioText: "Ahmed is a friendly Sudanese schoolboy. He is eight years old and is Badr's best friend. He has got a green bag containing a school book and a sweet red apple. He welcomes Eddie, the English boy, and introduces him to his school and country.",
      englishText: "Ahmed is Badr's best friend. He has got a green bag with a book and red apple.",
      unit: 1, lessonId: 1
    },
    {
      names: ["eddie", "إيدي", "ايدي", "english"],
      title: "Eddie ✈️",
      bioText: "Eddie is an English boy visiting Sudan. He is eight years old and in Class 3. In Unit 1, Lesson 5, he meets Mr Gamar. In Unit 4, he answers Hamad's questions and describes his age and class.",
      englishText: "Eddie is an English boy in Class 3 who is visiting Sudan.",
      unit: 1, lessonId: 5
    },
    {
      names: ["gonfooth", "hedgehog", "قنفذ", "fox", "ثعلب"],
      title: "Gonfooth the Hedgehog 🦔",
      bioText: "Gonfooth is a small hedgehog with a tiny body, big eyes, and long sharp spines. He meets Mrs Hen, Mrs Rabbit, and Mr Monkey, describing their features. At the end, he meets a hungry Mr Fox with big teeth, but Gonfooth's long spines protect him safely!",
      englishText: "Gonfooth is a clever little hedgehog who protects himself from the hungry fox using his sharp spines.",
      unit: 4, lessonId: 6
    },
    {
      names: ["hind", "teacher", "هند", "معلمة", "معلمه"],
      title: "Mrs Hind 👩‍🏫",
      bioText: "Mrs Hind is the kind and supportive classroom teacher in Unit 5. She teaches the pupils english, writes on the school board, and helps them learn the names of school objects.",
      englishText: "Mrs Hind is the helpful school teacher in the classroom next to the board.",
      unit: 5, lessonId: 3
    }
  ];

  for (const char of characters) {
    if (char.names.some(name => normQuery.includes(name) || normQueryAr.includes(normalizeArabic(name)))) {
      result.reply = `👤 **Character Spotlight: ${char.title}**\n\n` +
        `**Overview:**\n${char.bioText}\n\n` +
        `**Key Quote / Sentence:**\n*"${char.englishText}"*\n\n` +
        `💡 This character is introduced in **Unit ${char.unit}, Lesson ${char.lessonId}**!`;
      result.voiceText = char.englishText;
      result.suggestions = ["Who is Little Ali? 👦", "Who is Gonfooth? 🦔", "What is Unit 5 about? 🏫"];
      
      const unit = SMILE_UNITS.find(u => u.id === char.unit);
      const lesson = unit?.lessons.find(l => l.id === char.lessonId);
      if (lesson && unit) {
        result.matchedLessons.push({ lesson, unitId: unit.id, unitTitle: unit.title });
      }
      return result;
    }
  }

  // 4. LESSON FACT MATCHING
  const facts = [
    {
      names: ["flag", "sudan flag", "علم", "العلم"],
      title: "The Sudanese Flag 🇸🇩",
      description: "Our Sudanese flag represents national identity and pride. It has four colours: green (agriculture and prosperity), red (sacrifice and courage), white (peace and light), and black (historical legacy of Sudan).",
      englishText: "The Sudanese flag has got four colours: green, red, white and black.",
      unit: 3, lessonId: 5
    },
    {
      names: ["traffic", "light", "policeman", "اشارة", "مرور"],
      title: "Traffic Lights & Road Safety 🛑",
      description: "Traffic lights help keep roads safe. Red means 'Stop', Yellow means 'Wait', and Green means 'Go'. Policemen ensure drivers and pupils follow these safety rules.",
      englishText: "Red is for Stop. Yellow is for Wait. Green is for Go.",
      unit: 3, lessonId: 3
    },
    {
      names: ["fasher", "hassan", "الفاشر", "museum", "well", "بئر"],
      title: "Al Fasher and Sultan's History 🕌",
      description: "Al Fasher is a famous city in western Sudan. Hassan is a nine-year-old boy from Al Fasher. He shares photos of Al Fasher's historic museum, the old Sultan's table and chair, and a deep traditional water well.",
      englishText: "Al Fasher has got a historic museum, a Sultan's old table and chair, and a water well.",
      unit: 5, lessonId: 8
    }
  ];

  for (const fact of facts) {
    if (fact.names.some(name => normQuery.includes(name) || normQueryAr.includes(normalizeArabic(name)))) {
      result.reply = `🌿 **Curriculum Fact: ${fact.title}**\n\n` +
        `**Description:**\n${fact.description}\n\n` +
        `**From the Textbook:**\n*"${fact.englishText}"*\n\n` +
        `💡 This is covered in **Unit ${fact.unit}, Lesson ${fact.lessonId}**!`;
      result.voiceText = fact.englishText;
      result.suggestions = ["Tell me about the Sudanese flag 🇸🇩", "Who is Mrs Hind? 👩‍🏫", "Who is Little Ali? 👦"];
      
      const unit = SMILE_UNITS.find(u => u.id === fact.unit);
      const lesson = unit?.lessons.find(l => l.id === fact.lessonId);
      if (lesson && unit) {
        result.matchedLessons.push({ lesson, unitId: unit.id, unitTitle: unit.title });
      }
      return result;
    }
  }

  // 5. VOCABULARY WORD MATCHING
  let bestWordMatch: WordItem | null = null;
  let wordUnit: UnitItem | null = null;
  
  for (const unit of SMILE_UNITS) {
    for (const w of unit.words) {
      if (
        w.word.toLowerCase() === normQuery || 
        normalizeArabic(w.arabic) === normQueryAr ||
        w.word.toLowerCase().includes(normQuery) && normQuery.length > 3 ||
        normalizeArabic(w.arabic).includes(normQueryAr) && normQueryAr.length > 2
      ) {
        bestWordMatch = w;
        wordUnit = unit;
        break;
      }
    }
    if (bestWordMatch) break;
  }

  if (bestWordMatch && wordUnit) {
    result.matchedWords.push(bestWordMatch);
    result.reply = `✨ **Dictionary Entry: ${bestWordMatch.image} ${bestWordMatch.word}**\n\n` +
      `• **Example Sentence:**\n` +
      `  *"${bestWordMatch.example}"*\n\n` +
      `💡 This vocabulary item is a key word in **Unit ${bestWordMatch.unit}: ${wordUnit.title}**!`;
    result.voiceText = `${bestWordMatch.word}. For example: ${bestWordMatch.example}`;
    
    result.suggestions = wordUnit.words.filter(w => w.id !== bestWordMatch?.id).slice(0, 3).map(w => `${w.word}`);
    return result;
  }

  // 6. LESSON TEXT COMPREHENSIVE SEARCH
  let foundLessonMatch = false;
  for (const unit of SMILE_UNITS) {
    for (const lesson of unit.lessons) {
      const titleMatch = lesson.title.toLowerCase().includes(normQuery) || normalizeArabic(lesson.title).includes(normQueryAr);
      const songTextMatch = lesson.content.songText?.toLowerCase().includes(normQuery) || normalizeArabic(lesson.content.songText || "").includes(normQueryAr);
      
      let dialogueMatch = false;
      if (lesson.content.dialogue) {
        dialogueMatch = lesson.content.dialogue.some(d => 
          d.text.toLowerCase().includes(normQuery) || 
          normalizeArabic(d.text).includes(normQueryAr) ||
          d.speaker.toLowerCase().includes(normQuery)
        );
      }

      if (titleMatch || songTextMatch || dialogueMatch) {
        result.matchedLessons.push({ lesson, unitId: unit.id, unitTitle: unit.title });
        foundLessonMatch = true;
      }
    }
  }

  if (foundLessonMatch) {
    const primary = result.matchedLessons[0];
    let excerpt = "";
    if (primary.lesson.content.songText) {
      const lines = primary.lesson.content.songText.split("\n");
      const matchedLine = lines.find(l => l.toLowerCase().includes(normQuery) || normalizeArabic(l).includes(normQueryAr));
      if (matchedLine) {
        excerpt = `\n\n📖 **Excerpt from lesson:**\n> *"${matchedLine.trim()}"*`;
      }
    }

    result.reply = `🔍 **I found "${query}" in these lessons in your book:**\n\n` +
      result.matchedLessons.slice(0, 3).map(ml => `• **${ml.lesson.title}** (Unit ${ml.unitId}: ${ml.unitTitle})`).join("\n") +
      excerpt + 
      `\n\n💡 You can click these lessons in the book view list to read and listen to them!`;
    
    result.voiceText = `I found matches for ${query} in ${primary.lesson.title}.`;
    result.suggestions = ["Who is Little Ali? 👦", "Tell me about the Sudanese flag 🇸🇩", "What is Unit 5 about? 🏫"];
    return result;
  }

  // 7. DEFAULT FALLBACK
  result.reply = `😊 Sorry! I couldn't find an exact match for **"${query}"** in your Grade 1 SMILE Starter 1 textbook content.\n\n**But don't worry! Try searching for one of these fun topics:**\n` +
    `• Type **Ali** or **Badr** to learn about characters in the book.\n` +
    `• Type **Flag** or **Al Fasher** to explore interesting local symbols and culture.\n` +
    `• Type **'Have Got'** or **Preposition** to learn grammar rules.\n` +
    `• Type **Apple** or **Monkey** to find vocabulary definitions.`;
  result.voiceText = "I couldn't find an exact match, but you can search for Ali, Badr, or the Sudanese Flag!";
  result.suggestions = ["Who is Little Ali? 👦", "Tell me about the Sudanese flag 🇸🇩", "Explain 'Have Got' 📝", "Who is Gonfooth? 🦔"];

  return result;
}
