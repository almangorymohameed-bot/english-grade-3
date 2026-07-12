import { GrammarRule, GrammarQuizQuestion } from "./unit1to4";

export const grammarUnit5to8: Record<string, { rule: GrammarRule; quiz: GrammarQuizQuestion[] }> = {
  // UNIT 5: My School
  "5-2": {
    rule: {
      title: "Asking Yes/No Questions with 'Is it...?'",
      titleAr: "طرح أسئلة نعم/لا باستخدام 'Is it...؟'",
      explanation: "We ask 'Is it a [Item]?' to check if something is a specific object. We answer with 'Yes, it is' or 'No, it isn't'.",
      explanationAr: "نسأل بـ (Is it a...؟) للتأكد من ماهية الشيء، ونجيب بـ (Yes, it is) للتوكيد أو (No, it isn't) للنفي.",
      formula: "Is it a + [Noun]? -> Yes, it is. / No, it isn't.",
      examples: [
        { en: "Is it a toy? No, it isn't.", ar: "هل هذه لعبة؟ لا، ليست كذلك." },
        { en: "Is it a pen? Yes, it is.", ar: "هل هذا قلم؟ نعم، هو كذلك." }
      ]
    },
    quiz: [
      {
        question: "Badr asks: 'Is it a book?' Ahmed replies: 'No, it _______.'",
        questionAr: "بدر يسأل: 'هل هو كتاب؟' وأحمد يجيب: 'لا، ليس _______.'",
        options: ["isn't", "is", "not", "am not"],
        correctAnswer: "isn't",
        explanation: "The short negative answer for 'Is it...?' is 'No, it isn't'.",
        explanationAr: "صيغة النفي للإجابة عن (Is it...؟) هي (No, it isn't)."
      },
      {
        question: "Ahmed asks: 'Is it a desk?' Badr replies: 'Yes, it _______.'",
        questionAr: "أحمد يسأل: 'هل هو مكتب؟' وبدر يجيب: 'نعم، هو _______.'",
        options: ["is", "isn't", "am", "are"],
        correctAnswer: "is",
        explanation: "The short positive answer for 'Is it...?' is 'Yes, it is'.",
        explanationAr: "صيغة التوكيد للإجابة عن (Is it...؟) هي (Yes, it is)."
      }
    ]
  },
  "5-7": {
    rule: {
      title: "Prepositions of Place (in, on, under, next to, behind)",
      titleAr: "حروف الجر المكانية (في، على، تحت، بجانب، خلف)",
      explanation: "We use prepositions like 'in', 'on', 'under', 'next to', and 'behind' to describe where things are.",
      explanationAr: "نستخدم حروف الجر مثل 'in' (في)، 'on' (على)، 'under' (تحت)، 'next to' (بجانب)، و'behind' (خلف) لوصف موقع الأشياء.",
      formula: "It is + [Preposition] + the + [Noun]",
      examples: [
        { en: "The book is in my bag.", ar: "الكتاب في حقيبتي." },
        { en: "The monkey is on the chair.", ar: "القرد على الكرسي." },
        { en: "The ruler is under the table.", ar: "المسطرة تحت الطاولة." }
      ]
    },
    quiz: [
      {
        question: "The pencil fell to the floor, so it is _______ the table.",
        questionAr: "سقط القلم الرصاص على الأرض، فهو يتواجد _______ الطاولة.",
        options: ["under", "on", "in", "above"],
        correctAnswer: "under",
        explanation: "Something on the floor below a table is 'under' it.",
        explanationAr: "الأشياء التي على الأرض أسفل الطاولة تكون تحتها (under)."
      },
      {
        question: "Where is the book? It's _______ the bag.",
        questionAr: "أين الكتاب؟ إنه _______ الحقيبة.",
        options: ["in", "under", "behind", "next to"],
        correctAnswer: "in",
        explanation: "We put books inside our bags, so they are 'in' the bag.",
        explanationAr: "نضع الكتب بداخل الحقيبة، لذلك نستخدم حرف الجر (in)."
      }
    ]
  },

  // UNIT 6: My Family
  "6-2": {
    rule: {
      title: "Asking 'Who is this?' to Identify Family Members",
      titleAr: "السؤال بـ 'Who is this؟' للتعرف على أفراد العائلة",
      explanation: "We ask 'Who is this?' or 'Who's this?' to find out who someone is, and reply with 'This is my [Family Member]'.",
      explanationAr: "نسأل بـ (Who is this؟) أو صيغتها المختصرة (Who's this؟) لمعرفة هوية الشخص، ونجيب بـ (This is my...) متبوعاً بصلة القرابة.",
      formula: "Who's this? -> This is my + [Family Member]",
      examples: [
        { en: "Who's this? This is my father.", ar: "من هذا؟ هذا أبي." },
        { en: "Who's this? This is my grandmother.", ar: "من هذه؟ هذه جدتي." }
      ]
    },
    quiz: [
      {
        question: "Badr asks: '_______ is this?' Ahmed replies: 'This is my brother.'",
        questionAr: "بدر يسأل: '_______ هذا؟' وأحمد يجيب: 'هذا أخي.'",
        options: ["Who", "What", "How", "Is"],
        correctAnswer: "Who",
        explanation: "We use 'Who' to ask questions about people.",
        explanationAr: "نستخدم أداة الاستفهام (Who) للسؤال عن الأشخاص العاقلين."
      },
      {
        question: "To introduce your mother: 'This _______ my mother.'",
        questionAr: "لتقديم والدتك: 'هذه _______ والدتي.'",
        options: ["is", "am", "are", "isn't"],
        correctAnswer: "is",
        explanation: "We use the singular verb 'is' with 'This' to refer to one person.",
        explanationAr: "نستخدم الفعل المساعد للمفرد (is) مع اسم الإشارة (This)."
      }
    ]
  },
  "6-4": {
    rule: {
      title: "Describing People with He's and She's + Adjectives",
      titleAr: "وصف الأشخاص باستخدام He's و She's متبوعة بالصفات",
      explanation: "We use 'He's' (He is) for males and 'She's' (She is) for females, followed by describing words (tall, short, happy, sad).",
      explanationAr: "نستخدم الضمير (He's) للذكور والضمير (She's) للإناث متبوعاً بالصفات مثل طويل وقصير وسعيد وحزين.",
      formula: "He's / She's + [Adjective]",
      examples: [
        { en: "My father is tall. He's tall.", ar: "أبي طويل. هو طويل." },
        { en: "My grandmother is happy. She's happy.", ar: "جدتي سعيدة. هي سعيدة." }
      ]
    },
    quiz: [
      {
        question: "My sister is a girl. _______ is short.",
        questionAr: "أختي بنت. _______ تكون قصيرة.",
        options: ["She's", "He's", "I'm", "They're"],
        correctAnswer: "She's",
        explanation: "We use 'She's' to refer to a female.",
        explanationAr: "نستخدم الضمير المختصر (She's) للإشارة للأنثى المفردة."
      },
      {
        question: "My grandfather is laughing. He is _______.",
        questionAr: "جدي يضحك. هو يكون _______.",
        options: ["happy", "sad", "tall", "blue"],
        correctAnswer: "happy",
        explanation: "Laughing indicates that someone is 'happy'.",
        explanationAr: "الضحك يدل على السعادة والبهجة (happy)."
      }
    ]
  },

  // UNIT 7: Clothes
  "7-2": {
    rule: {
      title: "Present Continuous with Wear ('What are you wearing?')",
      titleAr: "زمن المضارع المستمر مع الفعل Wear (ماذا ترتدي؟)",
      explanation: "We ask 'What are you wearing?' and answer with 'I'm wearing a/an + [Coloured Item]'.",
      explanationAr: "نسأل عما يرتديه الشخص الآن بـ (What are you wearing؟) ونجيب بـ (I'm wearing...) متبوعاً بالملابس وألوانها.",
      formula: "What are you wearing? -> I'm wearing a/an + [Color] + [Clothes Noun]",
      examples: [
        { en: "What are you wearing? I'm wearing a blue shirt.", ar: "ماذا ترتدي؟ أنا أرتدي قميصاً أزرق." },
        { en: "I'm wearing white socks.", ar: "أنا أرتدي جوارب بيضاء." }
      ]
    },
    quiz: [
      {
        question: "Fatma asks: 'What are you _______?' Cathy replies: 'I'm wearing a yellow dress.'",
        questionAr: "فاطمة تسأل: 'ماذا _______؟' كاثي تجيب: 'أنا أرتدي فستاناً أصفر.'",
        options: ["wearing", "wear", "wears", "worn"],
        correctAnswer: "wearing",
        explanation: "In Present Continuous, we use the -ing form of the verb after 'are you'.",
        explanationAr: "في المضارع المستمر، نستخدم الفعل المضاف إليه -ing بعد التركيب (are you)."
      },
      {
        question: "To describe what you are wearing: 'I _______ wearing a red cap.'",
        questionAr: "لوصف ما ترتديه: 'أنا _______ أرتدي قبعة حمراء.'",
        options: ["'m", "'s", "'re", "is"],
        correctAnswer: "'m",
        explanation: "We use 'am' or contracting to ''m' with 'I' in Present Continuous.",
        explanationAr: "نستخدم الفعل المساعد (am) والمختصر بـ ('m) مع الضمير المتحدث I."
      }
    ]
  },
  "7-3": {
    rule: {
      title: "Are these / Are your... Yes/No Questions",
      titleAr: "أسئلة نعم/لا للجمع باستخدام 'Are these / Are your...'",
      explanation: "We ask 'Are these [Plural Noun]?' or 'Are your [Plural Noun] + [Adjective]?' to ask about plural items. We answer with 'Yes, they are' or 'No, they aren't'.",
      explanationAr: "نسأل عن الأشياء الجمع مثل الأحذية والجوارب بـ (Are your shoes...؟)، ونجيب بـ (Yes, they are) للتوكيد أو (No, they aren't) للنفي.",
      formula: "Are your + [Plural Noun] + [Adjective]? -> Yes, they are. / No, they aren't.",
      examples: [
        { en: "Are your shoes clean? Yes, they are.", ar: "هل حذاؤك نظيف؟ نعم، هو كذلك." },
        { en: "Are your socks dirty? No, they aren't.", ar: "هل جواربك متسخة؟ لا، ليست كذلك." }
      ]
    },
    quiz: [
      {
        question: "Badr asks: 'Are your shoes dirty?' Ahmed replies: 'No, they _______.'",
        questionAr: "بدر يسأل: 'هل حذاؤك متسخ؟' وأحمد يجيب: 'لا، ليس _______.'",
        options: ["aren't", "are", "isn't", "not"],
        correctAnswer: "aren't",
        explanation: "For plural questions with 'Are...', the short negative answer is 'No, they aren't'.",
        explanationAr: "الإجابة المختصرة بالنفي للجمع هي (No, they aren't)."
      }
    ]
  },

  // UNIT 8: My House
  "8-2": {
    rule: {
      title: "Asking Where Someone Is in the House",
      titleAr: "السؤال عن موقع شخص ما في المنزل",
      explanation: "We ask 'Where is [Person]?' and reply with 'He's / She's in the [Room]'.",
      explanationAr: "نسأل عن مكان شخص ما بـ (Where is...؟) ونجيب بـ (He's / She's in the...) متبوعاً باسم الغرفة.",
      formula: "Where is + [Name/Noun]? -> He's / She's + in + the + [Room]",
      examples: [
        { en: "Where is mother? She is in the kitchen.", ar: "أين أمي؟ هي في المطبخ." },
        { en: "Where is Badr? He's in the bedroom.", ar: "أين بدر؟ هو في غرفة النوم." }
      ]
    },
    quiz: [
      {
        question: "Ahmed asks: '_______ is father?' Mrs Hind replies: 'He is in the sitting room.'",
        questionAr: "أحمد يسأل: '_______ أبي؟' السيدة هند تجيب: 'هو في غرفة الجلوس.'",
        options: ["Where", "Who", "What", "Is"],
        correctAnswer: "Where",
        explanation: "We use 'Where' to ask questions about location or place.",
        explanationAr: "نستخدم أداة الاستفهام (Where) للسؤال عن الأماكن والمواقع."
      },
      {
        question: "Ali is a boy. _______'s in the bathroom.",
        questionAr: "علي ولد. _______ في الحمام.",
        options: ["He", "She", "I", "It"],
        correctAnswer: "He",
        explanation: "We use 'He' to refer to a male.",
        explanationAr: "نستخدم ضمير الغائب المفرد المذكر (He)."
      }
    ]
  }
};
