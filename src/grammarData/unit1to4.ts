export interface GrammarRule {
  title: string;
  titleAr: string;
  explanation: string;
  explanationAr: string;
  formula?: string;
  examples: Array<{ en: string; ar: string }>;
}

export interface GrammarQuizQuestion {
  question: string;
  questionAr: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationAr: string;
}

export const grammarUnit1to4: Record<string, { rule: GrammarRule; quiz: GrammarQuizQuestion[] }> = {
  // UNIT 1: Hello!
  "1-1": {
    rule: {
      title: "Greetings: Saying Hello and Introducing Yourself",
      titleAr: "التحيات: قول مرحباً والتعريف بنفسك",
      explanation: "We use 'Hi' or 'Hello' to greet someone, and 'I'm [Name]' to say our name.",
      explanationAr: "نستخدم (Hi) أو (Hello) للترحيب بشخص ما، والتعبير (I'm) متبوعاً بالاسم للتعريف بالنفس.",
      formula: "Hi / Hello, I'm + [Name]",
      examples: [
        { en: "Hi, I'm Badr.", ar: "مرحباً، أنا بدر." },
        { en: "Hello, I'm Ahmed.", ar: "أهلاً، أنا أحمد." }
      ]
    },
    quiz: [
      {
        question: "Ahmed greets Badr: 'Hello, _______ Ahmed.'",
        questionAr: "أحمد يرحب ببدر: 'أهلاً، _______ أحمد.'",
        options: ["I'm", "is", "are", "you"],
        correctAnswer: "I'm",
        explanation: "We use 'I'm' (I am) to introduce our own name.",
        explanationAr: "نستخدم التعبير (I'm) للتعريف بالاسم الشخصي."
      },
      {
        question: "When we see a friend, we can say: '_______, I'm Badr.'",
        questionAr: "عندما نرى صديقاً، يمكننا القول: '_______، أنا بدر.'",
        options: ["Hi", "Goodbye", "Thanks", "Fine"],
        correctAnswer: "Hi",
        explanation: "We use 'Hi' to greet friends warmly.",
        explanationAr: "نستخدم كلمة الترحيب (Hi) لقول مرحباً للأصدقاء."
      }
    ]
  },
  "1-2": {
    rule: {
      title: "Singular and Plural Nouns with Numbers",
      titleAr: "الأسماء المفردة والجمع مع الأرقام",
      explanation: "We add an 's' to the end of a word when there is more than one item.",
      explanationAr: "نضيف حرف (s) إلى نهاية الاسم المفرد عندما يكون لدينا أكثر من شيء واحد (صيغة الجمع).",
      formula: "1 + [Noun] (singular) vs. 2/3/4 + [Noun] + s (plural)",
      examples: [
        { en: "A bag.", ar: "حقيبة واحدة." },
        { en: "Two bags.", ar: "حقيبتان." }
      ]
    },
    quiz: [
      {
        question: "Complete the plural form: 'Three _______.'",
        questionAr: "أكمل صيغة الجمع: 'ثلاثة _______.'",
        options: ["bags", "bag", "a bag", "bagging"],
        correctAnswer: "bags",
        explanation: "Since 'three' is more than one, we add 's' to 'bag' to make 'bags'.",
        explanationAr: "بما أن الرقم ثلاثة أكبر من واحد، يجب استخدام صيغة الجمع بإضافة s."
      }
    ]
  },
  "1-4": {
    rule: {
      title: "Asking and Telling Names",
      titleAr: "السؤال عن الاسم والإجابة عليه",
      explanation: "We ask 'What's your name?' and reply with 'My name's [Name]'.",
      explanationAr: "نسأل عن الاسم باستخدام (What's your name؟) ونجيب بـ (My name's) متبوعاً بالاسم.",
      formula: "What's your name? -> My name's + [Name]",
      examples: [
        { en: "What's your name?", ar: "ما اسمك؟" },
        { en: "My name's Fatma.", ar: "اسمي فاطمة." }
      ]
    },
    quiz: [
      {
        question: "Cathy asks Fatma: '_______ your name?'",
        questionAr: "كاثي تسأل فاطمة: '_______ اسمكِ؟'",
        options: ["What's", "How's", "Are", "Is"],
        correctAnswer: "What's",
        explanation: "We use 'What's' (What is) to ask about someone's name.",
        explanationAr: "نستخدم (What's) للسؤال عن الأشياء والأسماء."
      },
      {
        question: "To tell someone your name: '_______ name's Badr.'",
        questionAr: "لإخبار شخص ما باسمك: '_______ اسمي بدر.'",
        options: ["My", "Your", "He's", "She's"],
        correctAnswer: "My",
        explanation: "We use 'My' to talk about something belonging to ourselves.",
        explanationAr: "نستخدم ضمير الملكية المتكلم (My) للحديث عن اسمنا الخاص."
      }
    ]
  },
  "1-6": {
    rule: {
      title: "Asking about Nationalities with Yes/No Answers",
      titleAr: "السؤال عن الجنسية والإجابة بنعم أو لا",
      explanation: "We ask 'Are you Sudanese?' and reply with 'Yes, I am' or 'No, I'm not'.",
      explanationAr: "نسأل 'هل أنت سوداني؟' ونجيب بـ 'نعم، أنا كذلك' أو 'لا، لست كذلك'.",
      formula: "Are you + [Nationality]? -> Yes, I am / No, I'm not.",
      examples: [
        { en: "Are you Sudanese, Eddie?", ar: "هل أنت سوداني يا إيدي؟" },
        { en: "No, I'm not. I'm English.", ar: "لا، لست كذلك. أنا إنجليزي." }
      ]
    },
    quiz: [
      {
        question: "Complete the question: '_______ you Sudanese, Badr?'",
        questionAr: "أكمل السؤال: '_______ أنت سوداني يا بدر؟'",
        options: ["Are", "Is", "Am", "Do"],
        correctAnswer: "Are",
        explanation: "We use 'Are' with 'you' to ask yes/no questions in present Be form.",
        explanationAr: "نستخدم الفعل المساعد (Are) مع ضمير المخاطب (you)."
      },
      {
        question: "Eddie is from England, so he says: 'I'm _______.'",
        questionAr: "إيدي من إنجلترا، لذلك يقول: 'أنا _______.'",
        options: ["English", "Sudanese", "Egyptian", "Arabic"],
        correctAnswer: "English",
        explanation: "A person from England is English.",
        explanationAr: "الجنسية من إنجلترا هي (English) إنجليزي."
      }
    ]
  },

  // UNIT 2: Numbers
  "2-2": {
    rule: {
      title: "Asking and Telling Age",
      titleAr: "السؤال عن العمر والإخبار به",
      explanation: "We ask 'How old are you?' and reply with 'I'm [Number]'.",
      explanationAr: "نسأل عن العمر بـ (How old are you؟) ونجيب بالتعبير (I'm) متبوعاً بالرقم.",
      formula: "How old are you? -> I'm + [Number]",
      examples: [
        { en: "How old are you?", ar: "كم عمرك؟" },
        { en: "I'm 8.", ar: "عمري 8 سنوات." }
      ]
    },
    quiz: [
      {
        question: "To ask someone their age, we say: '_______ old are you?'",
        questionAr: "للسؤال عن عمر شخص ما، نقول: '_______ عمرك؟'",
        options: ["How", "What", "Who", "Where"],
        correctAnswer: "How",
        explanation: "We use 'How old' to ask about age.",
        explanationAr: "نستخدم الأداة (How) مع (old) للسؤال عن العمر."
      }
    ]
  },
  "2-3": {
    rule: {
      title: "Asking about Quantity with 'How many'",
      titleAr: "السؤال عن العدد باستخدام 'How many'",
      explanation: "We use 'How many + [Plural Noun] + are there?' to count items.",
      explanationAr: "نستخدم الأداة (How many) متبوعة باسم جمع للسؤال عن عدد الأشياء المتواجدة.",
      formula: "How many + [Plural Noun] + are there?",
      examples: [
        { en: "How many frogs are there?", ar: "كم عدد الضفادع الموجودة؟" },
        { en: "There are three.", ar: "يوجد ثلاثة." }
      ]
    },
    quiz: [
      {
        question: "Choose the correct question: 'How many _______ are there?'",
        questionAr: "اختر السؤال الصحيح: 'كم عدد _______ الموجودة؟'",
        options: ["frogs", "frog", "a frog", "frogging"],
        correctAnswer: "frogs",
        explanation: "After 'How many', we must always use a plural noun.",
        explanationAr: "بعد التعبير (How many)، يجب أن يتبع الاسم بصيغة الجمع دائماً."
      }
    ]
  },

  // UNIT 3: Colours
  "3-4": {
    rule: {
      title: "Asking and Confirming Colours",
      titleAr: "السؤال عن الألوان وتأكيدها",
      explanation: "We ask 'What colour is it?' and ask confirmation with 'Is it [Colour]?'",
      explanationAr: "نسأل عن اللون بـ (What colour is it؟) ونطلب التأكيد بـ (Is it [اللون]؟) لنجيب بنعم أو لا.",
      formula: "What colour is it? -> Is it + [Colour]? -> Yes / No.",
      examples: [
        { en: "What colour is it?", ar: "ما لونه؟" },
        { en: "Is it red? Yes!", ar: "هل هو أحمر؟ نعم!" }
      ]
    },
    quiz: [
      {
        question: "To ask about the colour of a bag: '_______ colour is it?'",
        questionAr: "للسؤال عن لون حقيبة: '_______ لونها؟'",
        options: ["What", "How", "Who", "Where"],
        correctAnswer: "What",
        explanation: "We use 'What colour' to ask about colours.",
        explanationAr: "نستخدم أداة الاستفهام (What) مع كلمة (colour) للسؤال عن اللون."
      },
      {
        question: "Is the grass red? No, it _______.",
        questionAr: "هل العشب أحمر؟ لا، ليس _______.",
        options: ["isn't", "is", "not", "am not"],
        correctAnswer: "isn't",
        explanation: "The short negative response for 'Is it...?' is 'No, it isn't'.",
        explanationAr: "النفي لـ (it is) في الإجابات القصيرة هو (it isn't)."
      }
    ]
  },
  "3-7": {
    rule: {
      title: "Describing Features: Hair and Eyes",
      titleAr: "وصف الملامح: لون الشعر والعيون",
      explanation: "We use 'What colour is his hair? It's [Colour]' and 'What colour are her eyes? They are [Colour]'.",
      explanationAr: "نستخدم (his hair) للشعر المفرد المذكر، و(her eyes) للعيون الجمع المؤنث.",
      formula: "What colour is his hair? -> It's + [Colour]\nWhat colour are her eyes? -> They are + [Colour]",
      examples: [
        { en: "What colour is his hair? It's black.", ar: "ما لون شعره؟ إنه أسود." },
        { en: "What colour are her eyes? They are brown.", ar: "ما لون عينيها؟ لونهما بني." }
      ]
    },
    quiz: [
      {
        question: "To describe eyes (plural), we say: 'They _______ brown.'",
        questionAr: "لوصف العيون (صيغة الجمع)، نقول: 'إنها _______ بنية.'",
        options: ["are", "is", "am", "be"],
        correctAnswer: "are",
        explanation: "Since 'eyes' is plural, we use the plural verb 'are'.",
        explanationAr: "لأن العيون اسم جمع، نستخدم الفعل المساعد للجمع (are)."
      },
      {
        question: "To ask about Badr's hair (males): 'What colour is _______ hair?'",
        questionAr: "للسؤال عن شعر بدر (مذكر): 'ما لون _______ شعره؟'",
        options: ["his", "her", "my", "your"],
        correctAnswer: "his",
        explanation: "We use the possessive adjective 'his' for males.",
        explanationAr: "نستخدم ضمير الملكية للمذكر الغائب (his)."
      }
    ]
  },

  // UNIT 4: About Me
  "4-1": {
    rule: {
      title: "Expressing Possession with 'Have Got'",
      titleAr: "التعبير عن الملكية باستخدام 'Have Got'",
      explanation: "We use 'I've got...' (I have got) to say what we have.",
      explanationAr: "نستخدم التعبير (I've got) وهي اختصار لـ (I have got) للحديث عن الأشياء التي نملكها.",
      formula: "I've got + a/an + [Noun]",
      examples: [
        { en: "I've got a lemon.", ar: "لدي ليمونة." },
        { en: "I've got a melon.", ar: "لدي بطيخة." }
      ]
    },
    quiz: [
      {
        question: "Complete the sentence: 'I _______ got a yellow lemon.'",
        questionAr: "أكمل الجملة: 'أنا _______ لدي ليمونة صفراء.'",
        options: ["'ve", "'s", "is", "am"],
        correctAnswer: "'ve",
        explanation: "We use 'I've' as a contraction of 'I have' with 'got'.",
        explanationAr: "نستخدم الاختصار (I've) مع (got) للتعبير عن ملكيتي لشيء."
      },
      {
        question: "Complete the third-person possession: 'Fatma _______ got a melon.'",
        questionAr: "أكمل الملكية للغائب المفرد: 'فاطمة _______ لديها بطيخة.'",
        options: ["'s", "'ve", "is", "are"],
        correctAnswer: "'s",
        explanation: "With singular third-person (she/he), we use 's (has got) instead of 've (have got).",
        explanationAr: "مع المفرد الغائب (Fatma / She)، نستخدم الاختصار 's (has got)."
      }
    ]
  },
  "4-3": {
    rule: {
      title: "Describing Plural Body Parts",
      titleAr: "وصف أعضاء الجسد المزدوجة (الجمع)",
      explanation: "We say 'I've got a nose' (singular) but 'I've got two arms' (plural).",
      explanationAr: "نقول (I've got a nose) للأنف المفرد، ولكن (I've got two arms) للذراعين بصيغة الجمع المزدوج.",
      formula: "I've got two + [Plural Body Part]",
      examples: [
        { en: "I've got two ears.", ar: "لدي أذنان." },
        { en: "I've got ten toes.", ar: "لدي عشرة أصابع في قدمي." }
      ]
    },
    quiz: [
      {
        question: "Complete with the correct body part: 'I've got two _______.'",
        questionAr: "أكمل بعضو الجسد الصحيح: 'لدي _______.'",
        options: ["eyes", "nose", "head", "mouth"],
        correctAnswer: "eyes",
        explanation: "Since 'two' is plural, we must choose a plural body part like 'eyes'.",
        explanationAr: "بما أن الرقم 'اثنان' جمع، يجب اختيار اسم عضو جسد جمع وهو (eyes)."
      }
    ]
  }
};
