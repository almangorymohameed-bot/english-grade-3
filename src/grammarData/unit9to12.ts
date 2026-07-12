import { GrammarRule, GrammarQuizQuestion } from "./unit1to4";

export const grammarUnit9to12: Record<string, { rule: GrammarRule; quiz: GrammarQuizQuestion[] }> = {
  // UNIT 9: Food & Drink
  "9-2": {
    rule: {
      title: "Asking and Expressing Likes with 'Do you like...?'",
      titleAr: "السؤال والتعبير عن التفضيلات بـ 'Do you like...؟'",
      explanation: "We ask 'Do you like [Food/Drink]?' to check if someone likes something. We reply with 'Yes, I do' or 'No, I don't'.",
      explanationAr: "نسأل بـ (Do you like...؟) لمعرفة ما إذا كان الشخص يحب طعاماً أو شراباً، ونجيب بـ (Yes, I do) للموافقة أو (No, I don't) للرفض.",
      formula: "Do you like + [Food]? -> Yes, I do. / No, I don't.",
      examples: [
        { en: "Do you like dates? Yes, I do.", ar: "هل تحب التمر؟ نعم، أحبه." },
        { en: "Do you like milk? No, I don't.", ar: "هل تحب الحليب؟ لا، لا أحبه." }
      ]
    },
    quiz: [
      {
        question: "Cathy asks: 'Do you like bananas?' Fatma replies: 'Yes, I _______.'",
        questionAr: "كاثي تسأل: 'هل تحبين الموز؟' وفاطمة تجيب: 'نعم، أنا _______.'",
        options: ["do", "don't", "like", "am"],
        correctAnswer: "do",
        explanation: "The positive short answer to 'Do you...?' is 'Yes, I do'.",
        explanationAr: "صيغة التوكيد المختصرة للإجابة عن السؤال بـ (Do you...؟) هي (Yes, I do)."
      },
      {
        question: "Ahmed asks: 'Do you like tea?' Eddie replies: 'No, I _______.'",
        questionAr: "أحمد يسأل: 'هل تحب الشاي؟' وإيدي يجيب: 'لا، أنا _______.'",
        options: ["don't", "do", "not", "am not"],
        correctAnswer: "don't",
        explanation: "The negative short answer to 'Do you...?' is 'No, I don't'.",
        explanationAr: "صيغة النفي المختصرة للإجابة عن السؤال بـ (Do you...؟) هي (No, I don't)."
      }
    ]
  },
  "9-3": {
    rule: {
      title: "Requesting Food/Drink Politely with 'Can I have...?'",
      titleAr: "طلب الطعام/الشراب بأدب باستخدام 'Can I have...؟'",
      explanation: "We request food or drink politely by saying 'Can I have some [Item], please?', and we reply with 'Yes, here you are'.",
      explanationAr: "نطلب الطعام أو الشراب بطريقة مهذبة باستخدام الصيغة (Can I have some... please؟)، وتكون الإجابة بـ (Yes, here you are) (تفضل).",
      formula: "Can I have some + [Item] + please? -> Yes, here you are.",
      examples: [
        { en: "Can I have some water, please? Yes, here you are.", ar: "هل يمكنني الحصول على بعض الماء من فضلك؟ نعم، تفضل." },
        { en: "Can I have some dates, please?", ar: "هل يمكنني الحصول على بعض التمر من فضلك؟" }
      ]
    },
    quiz: [
      {
        question: "To ask for water politely: 'Can I _______ some water, please?'",
        questionAr: "لطلب الماء بأدب: 'هل يمكنني _______ بعض الماء من فضلك؟'",
        options: ["have", "has", "do", "drink"],
        correctAnswer: "have",
        explanation: "We use the verb 'have' in the polite request formula 'Can I have...'.",
        explanationAr: "نستخدم الفعل (have) في التركيب اللغوي الخاص بالطلب المهذب (Can I have...)."
      }
    ]
  },

  // UNIT 10: Animals
  "10-2": {
    rule: {
      title: "Describing Animals with Has Got / Have Got",
      titleAr: "وصف الحيوانات باستخدام تركيب الملكية Has Got / Have Got",
      explanation: "We use 'has got' with singular subjects (like a camel) and 'have got' or contraction ''ve got' with plural subjects to describe features.",
      explanationAr: "نستخدم التعبير (has got) مع الأسماء المفردة (مثل الجمل)، والتعبير (have got) مع الجمع لوصف الميزات والخصائص الجسدية.",
      formula: "Singular Noun + has got + [Feature] vs. Plural Noun + have got + [Feature]",
      examples: [
        { en: "The camel has got a long neck.", ar: "الجمل يملك رقبة طويلة." },
        { en: "They have got big teeth.", ar: "هم يملكون أسناناً كبيرة." }
      ]
    },
    quiz: [
      {
        question: "The lion _______ got big teeth.",
        questionAr: "الأسد _______ يملك أسناناً كبيرة.",
        options: ["has", "have", "is", "are"],
        correctAnswer: "has",
        explanation: "Since 'the lion' is a singular noun, we use 'has got'.",
        explanationAr: "نظراً لأن الأسد اسم مفرد، نستخدم معه الفعل (has got)."
      },
      {
        question: "The birds _______ got small bodies.",
        questionAr: "الطيور _______ تملك أجساداً صغيرة.",
        options: ["have", "has", "is", "are"],
        correctAnswer: "have",
        explanation: "Since 'the birds' is a plural noun, we use 'have got'.",
        explanationAr: "نظراً لأن الطيور اسم جمع، نستخدم معها الفعل (have got)."
      }
    ]
  },

  // UNIT 11: Transport
  "11-2": {
    rule: {
      title: "Asking and Answering 'How do you go to...?'",
      titleAr: "السؤال والإجابة على 'كيف تذهب إلى...؟'",
      explanation: "We ask 'How do you go to [Place]?' to ask about transport, and reply with 'I go by [Vehicle]'. (Note: we say 'on foot' for walking).",
      explanationAr: "نسأل بـ (How do you go to...؟) للسؤال عن وسيلة النقل، ونجيب بـ (I go by...) متبوعاً بالمركبة (أو on foot للمشي).",
      formula: "How do you go to + [Place]? -> I go by + [Vehicle]",
      examples: [
        { en: "How do you go to school? I go by bus.", ar: "كيف تذهب إلى المدرسة؟ أذهب بالحافلة." },
        { en: "How do you go to the market? I go by car.", ar: "كيف تذهب إلى السوق؟ أذهب بالسيارة." }
      ]
    },
    quiz: [
      {
        question: "Badr asks: '_______ do you go to school?' Ahmed replies: 'I go by bus.'",
        questionAr: "بدر يسأل: '_______ تذهب إلى المدرسة؟' وأحمد يجيب: 'أذهب بالحافلة.'",
        options: ["How", "Who", "What", "Where"],
        correctAnswer: "How",
        explanation: "We use 'How' to ask about methods or means of transport.",
        explanationAr: "نستخدم أداة الاستفهام (How) للسؤال عن كيفية القيام بالشيء ووسائل النقل."
      },
      {
        question: "I go to school _______ bus.",
        questionAr: "أنا أذهب إلى المدرسة _______ الحافلة.",
        options: ["by", "on", "in", "at"],
        correctAnswer: "by",
        explanation: "We use the preposition 'by' before vehicles like bus, car, train.",
        explanationAr: "نستخدم حرف الجر (by) قبل وسائل النقل والمواصلات."
      }
    ]
  },

  // UNIT 12: Play Time
  "12-2": {
    rule: {
      title: "Asking and Expressing Ability with 'Can you...?'",
      titleAr: "السؤال والتعبير عن الاستطاعة والقدرة بـ 'Can you...؟'",
      explanation: "We ask 'Can you [Action]?' to ask if someone has the ability to do something. We reply with 'Yes, I can' or 'No, I can't'.",
      explanationAr: "نسأل عن المقدرة والقدرة بـ (Can you...؟)، ونجيب بـ (Yes, I can) للإثبات أو (No, I can't) للنفي.",
      formula: "Can you + [Verb]? -> Yes, I can. / No, I can't.",
      examples: [
        { en: "Can you swim? Yes, I can.", ar: "هل تستطيع السباحة؟ نعم، أستطيع." },
        { en: "Can you fly? No, I can't.", ar: "هل تستطيع الطيران؟ لا، لا أستطيع." }
      ]
    },
    quiz: [
      {
        question: "Eddie asks: 'Can you swim?' Ahmed replies: 'No, I _______.'",
        questionAr: "إيدي يسأل: 'هل تستطيع السباحة؟' وأحمد يجيب: 'لا، أنا _______.'",
        options: ["can't", "can", "am not", "don't"],
        correctAnswer: "can't",
        explanation: "The short negative answer for 'Can you...?' is 'No, I can't'.",
        explanationAr: "صيغة النفي للإجابة عن السؤال بـ (Can you...؟) هي (No, I can't)."
      },
      {
        question: "Cathy asks: 'Can you read?' Fatma replies: 'Yes, I _______.'",
        questionAr: "كاثي تسأل: 'هل تستطيعين القراءة؟' وفاطمة تجيب: 'نعم، أنا _______.'",
        options: ["can", "can't", "do", "am"],
        correctAnswer: "can",
        explanation: "The short positive answer for 'Can you...?' is 'Yes, I can'.",
        explanationAr: "صيغة الإيجاب للإجابة عن السؤال بـ (Can you...؟) هي (Yes, I can)."
      }
    ]
  }
};
