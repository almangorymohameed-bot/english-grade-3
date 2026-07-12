import React from "react";
import { motion } from "motion/react";
import { 
  Globe, Heart, Compass, PenTool, FlaskConical, Trophy, 
  DollarSign, Activity, Map, ShieldAlert, Users, Award, BookOpen 
} from "lucide-react";

interface LessonIllustrationProps {
  unitId: number;
  lessonId: number;
  title: string;
}

// 100% Complete, Kid-Friendly, and Unabridged Curriculum Illustrations Mapping
// For Sudanese SMILE Starter 1 (Grade 1 Primary Syllabus - Aged 6 Years)
const ILLUSTRATION_DETAILS: Record<string, { emoji: string; arabicDesc: string; bullets: string[] }> = {
  // UNIT 1: Hello!
  "1-1": {
    emoji: "👋",
    arabicDesc: "بدر وأحمد يتبادلان التحية الكرتونية الجميلة في بداية العام الدراسي الجديد.",
    bullets: ["Badr says: 'Hi, I'm Badr.'", "Ahmed says: 'Hello, I'm Ahmed.'", "Learning basic greetings for 6-year-old kids."]
  },
  "1-2": {
    emoji: "🎒",
    arabicDesc: "عد الحقائب الحمراء والزرقاء والتفاح اللذيذ من 1 إلى 4 مع رسوم ممتعة.",
    bullets: ["Counting bright school bags (1 to 4)", "Singing the numbers song together", "Point and say: 2 bags, 1 apple."]
  },
  "1-3": {
    emoji: "🔟",
    arabicDesc: "لوحة كرتونية لعد الأرقام من 5 إلى 10 مع وجوه مبتسمة وبالونات ملونة.",
    bullets: ["Counting numbers: 5, 6, 7, 8, 9, 10", "Finding numbers on colorful balloons", "Identifying numbers in sequence and group count."]
  },
  "1-4": {
    emoji: "👧",
    arabicDesc: "رسومات كرتونية لطيفة للأصدقاء كاثي وفاطمة وهما يتعرفان على أسماء بعضهما.",
    bullets: ["Asking: 'What's your name?'", "Replying politely: 'My name's Fatma.'", "Making new friends at school."]
  },
  "1-5": {
    emoji: "👨‍🏫",
    arabicDesc: "صديقنا الإنجليزي إيدي يتعرف على المعلم اللطيف الأستاذ قمر في المدرسة.",
    bullets: ["Ahmed introducing: 'This is Eddie, Mr Gamar.'", "He is English and loves visiting Sudan!", "Saying hello to teachers politely."]
  },
  "1-6": {
    emoji: "🇸🇩",
    arabicDesc: "إيدي وبدر يتحدثان عن بلدانهما، ويعلمنا كيف نقول هل أنت سوداني؟",
    bullets: ["Are you Sudanese, Eddie?", "Eddie says: 'No, I'm not. I'm English.'", "Learning about Sudan and England."]
  },
  "1-7": {
    emoji: "🤝",
    arabicDesc: "رسوم مبهجة للأطفال داليا وكاثي وهما يتبادلان التحية الطيبة والسؤال عن الحال.",
    bullets: ["How are you?", "Dalia says: 'I'm fine, thanks.'", "Saying hello to our school friends."]
  },
  "1-8": {
    emoji: "🔤",
    arabicDesc: "حفلة الحروف الكرتونية الملونة من حرف A إلى حرف L مع صور لطيفة.",
    bullets: ["a is in apple 🍎 and b is in bed 🛏️", "c is in cat 🐱 and d is in desk ✍️", "Beautiful letters for Grade 1 children."]
  },

  // UNIT 2: Numbers
  "2-1": {
    emoji: "🐊",
    arabicDesc: "أغنية التماسيح الخضراء المرحة وهي تسبح بسعادة في نهر النيل العظيم.",
    bullets: ["1 little, 2 little, 3 little crocodiles!", "10 crocodiles swimming in the River Nile", "Singing and counting with funny crocodiles."]
  },
  "2-2": {
    emoji: "🎂",
    arabicDesc: "أحمد وبدر يحتفلان ويخبراننا بأعمارهما السعيدة مع كعكة يوم الميلاد.",
    bullets: ["How old are you?", "Badr says: 'I'm 8.'", "Counting birthday candles from 1 to 9."]
  },
  "2-3": {
    emoji: "🐸",
    arabicDesc: "الضفادع الخضراء الظريفة تقفز بجانب النهر وتساعدنا في عد الأرقام 10 و 11 و 12.",
    bullets: ["How many frogs are there? 3!", "Counting new big numbers: 10, 11, 12", "Identifying green leaping frogs."]
  },
  "2-4": {
    emoji: "🐱",
    arabicDesc: "مجموعة من القطط الشقية والجميلة تساعدنا في عد الأرقام الكبيرة من 10 إلى 20.",
    bullets: ["How many cats are there? There are ten!", "Counting and playing with fluffy kittens", "Learning numbers 10 to 20 together."]
  },
  "2-5": {
    emoji: "🚶",
    arabicDesc: "قصة علي الصغير والقرود اللطيفة والدجاج في الغابة وهو يبحث عن طريقه.",
    bullets: ["Ali gets lost in the forest", "Meeting 3 monkeys and 4 chickens", "Ali is sad and wants to find his house."]
  },
  "2-6": {
    emoji: "🏡",
    arabicDesc: "الحيوانات الصديقة ترشد علي إلى بيته وأمه الحبيبة آمنة بكل سرور.",
    bullets: ["Frogs and monkeys say: 'This way, Ali!'", "Ali finding his mum Amna and feeling happy", "Hugging mother and getting home safely."]
  },
  "2-7": {
    emoji: "⏰",
    arabicDesc: "ساعة كرتونية ضاحكة تساعدنا في معرفة الوقت وقراءة الساعة بالإنجليزية.",
    bullets: ["What's the time? It's 9 o'clock.", "Asking and telling hours from 1 to 12", "Organizing our daily school time."]
  },
  "2-8": {
    emoji: "🔤",
    arabicDesc: "الجزء الثاني من قطار الحروف المصور من حرف M إلى حرف Z مع كلمات سهلة.",
    bullets: ["m is in man 👨 and n is in neck 🦒", "o is in on 💡 and p is in pen 🖊️", "Learning phonics sounds with cute objects."]
  },

  // UNIT 3: Colours
  "3-1": {
    emoji: "🎈",
    arabicDesc: "بالونات ملونة طائرة وأشكال مبهجة لتعليم الأطفال تمييز الألوان الرائعة.",
    bullets: ["Point to yellow, Point to red!", "Point to green, Point to blue!", "Point to black and point to your head!"]
  },
  "3-2": {
    emoji: "🎯",
    arabicDesc: "لعبة بينجو الألوان الكرتونية الممتعة مع الأصدقاء في غرفة الصف.",
    bullets: ["Playing 'Colour Bingo' with cards", "Calling out: Red, White, Yellow, Brown!", "Shouting 'Bingo!' when you win!"]
  },
  "3-3": {
    emoji: "🚦",
    arabicDesc: "شرطي المرور النشيط وإشارة المرور الضاحكة يعلموننا قواعد عبور الطريق بأمان.",
    bullets: ["Red light says: 'Stop!' 🛑", "Yellow light says: 'Wait!' ⚠️", "Green light says: 'Go! Go! Go!' 🟢"]
  },
  "3-4": {
    emoji: "🎨",
    arabicDesc: "علب الألوان المائية وتهجئة الكلمات من خلال تركيب أحرف اللون الأحمر.",
    bullets: ["What colour is it?", "Spelling letters: r, e, and d", "It's RED! Yes! 🔴"]
  },
  "3-5": {
    emoji: "🇸🇩",
    arabicDesc: "رسم وتلوين علم السودان الحبيب بألوانه الأربعة الجميلة والمعبرة.",
    bullets: ["This is the Sudanese flag. It's our flag!", "Green, red, white, and black", "Proudly coloring national symbols."]
  },
  "3-6": {
    emoji: "🖼️",
    arabicDesc: "معرض الصور المدرسي الجميل، والأطفال يتحدثون عن رسوماتهم المفضلة.",
    bullets: ["Badr's and Cathy's beautiful pictures", "This is Cathy's picture. It's a bag.", "It is blue! 🎒🔵"]
  },
  "3-7": {
    emoji: "🧕",
    arabicDesc: "الأم آمنة تخبر الشرطي بمواصفات ابنها المفقود علي لمساعدتها في البحث عنه.",
    bullets: ["Amna says: 'My son is lost. He's 5.'", "He has got black hair and brown eyes", "Learning description words in English."]
  },
  "3-8": {
    emoji: "👕",
    arabicDesc: "العثور على علي الصغير بفضل قميصه الأحمر الجميل ولم الشمل مع أمه الحبيبة آمنة.",
    bullets: ["What colour is Ali's t-shirt? Red!", "Officer says: 'This way, please!'", "Ali and Mum reunited and happy! 🎉"]
  },

  // UNIT 4: About Me
  "4-1": {
    emoji: "🍋",
    arabicDesc: "الليمون الأصفر الحامض والبطيخ الأخضر اللذيذ وصياغة جمل الامتلاك البسيطة.",
    bullets: ["I've got a lemon. My lemon is yellow.", "I've got a melon. My melon is green.", "Using 'have got' for fruits."]
  },
  "4-2": {
    emoji: "📖",
    arabicDesc: "بدر وأحمد يتحدثان عن أصدقائهما الجدد حمد وهبة وحقائبهم الملونة.",
    bullets: ["Who's that boy? He's got an apple.", "His name is Hamad and he is in Class 3.", "Who's that girl? Her name is Hiba."]
  },
  "4-3": {
    emoji: "👦",
    arabicDesc: "أنشودة تفاعلية رائعة للتعرف على أجزاء جسم الإنسان وتسميتها بالإنجليزية.",
    bullets: ["I've got a body, a neck and a head", "I've got two arms and two legs", "I've got ears, eyes, and ten toes!"]
  },
  "4-4": {
    emoji: "🏫",
    arabicDesc: "حمد وإيدي يتحدثان في الفصل الدراسي عن الصف والسن والجنسية.",
    bullets: ["How old are you? I'm 8.", "Are you Sudanese? Yes, I am.", "What class are you in? Class 3."]
  },
  "4-5": {
    emoji: "🦒",
    arabicDesc: "لوحة جميلة تعرض صفات الحيوانات: رقبة الزرافة الطويلة وعيون البومة الكبيرة.",
    bullets: ["This animal has got a long neck", "They've got big eyes and big teeth", "Learning descriptive animal features."]
  },
  "4-6": {
    emoji: "🦔",
    arabicDesc: "قصة القنفذ الصغير قنفذ وأشواكه الحادة التي تحميه من الثعلب الجائع.",
    bullets: ["Gonfooth the cute little hedgehog", "Meeting Mrs Rabbit, Mrs Hen, and Mr Monkey", "Escaping safely from Mr Fox!"]
  },
  "4-7": {
    emoji: "📸",
    arabicDesc: "صديقتنا كاثي تعرض على إيدي صوراً خلابة لنهر النيل العظيم وأهرامات البجراوية.",
    bullets: ["Cathy says: 'This is the River Nile.'", "Look! There are three pyramids.", "Discovering beautiful places in Sudan."]
  },
  "4-8": {
    emoji: "🗂️",
    arabicDesc: "الأعضاء يلعبون لعبة الصور التخمينية، ويصنفون أسماء الحروف المتشابهة.",
    bullets: ["Have you got the picture of Badr? Yes, I have!", "Sorting names starting with A and E", "Fun word group games in class."]
  },

  // UNIT 5: My School
  "5-1": {
    emoji: "🏫",
    arabicDesc: "أنشودة مدرسية جميلة للتعرف على محتويات الفصل المدرسي الرائع وتسميتها.",
    bullets: ["Point to the window. Point to the door.", "Point to the board. Point to the floor.", "Chanting classroom objects together."]
  },
  "5-2": {
    emoji: "🧸",
    arabicDesc: "لعبة التخمين للأشياء الغامضة في الحقيبة المدرسية باستخدام أسئلة نعم/لا.",
    bullets: ["What's this in the bag?", "Is it a toy? No, it isn't.", "Is it a pen? Yes, it is. Look!"]
  },
  "5-3": {
    emoji: "👩‍🏫",
    arabicDesc: "ألبوم صور المدرسة والمعلمة الطيبة السيدة هند والطلاب في الصف الدراسي.",
    bullets: ["Who is next to Mrs Hind? That's Marwa.", "Where is the red pencil? Next to the book.", "Learning the preposition 'next to'." ]
  },
  "5-4": {
    emoji: "🐒",
    arabicDesc: "القرد الشقي سكر يقفز فوق الكرسي ويعلمنا حروف الجر والصفات البسيطة.",
    bullets: ["The monkey is ON the chair!", "This cat is small. That cat is small.", "Look at them, they are big!"]
  },
  "5-5": {
    emoji: "🧸",
    arabicDesc: "قصة ريم التي تبحث عن لعبتها المفقودة في الفصل وفي المكتبة وتحت السرير.",
    bullets: ["Where is my toy? It isn't here.", "It isn't under the bed, it isn't in the library.", "Your toy is here! It's in your bag!"]
  },
  "5-6": {
    emoji: "🐒",
    arabicDesc: "قصة القرد الصغير سكر وهو يبحث عن ذيله الضائع ويجده تحت جسده بكل ضحك ومرح.",
    bullets: ["Where is my tail? Is it in your desk?", "Look, Sukkar! Your tail is there under your body!", "Laughing and playing with cute monkeys."]
  },
  "5-7": {
    emoji: "📏",
    arabicDesc: "أحمد وبدر يبحثان عن المسطرة الضائعة في الطاولة وخلف الباب وفي الحقيبة.",
    bullets: ["Is the ruler under the table? No!", "Is the ruler in the bag? Yes, it is!", "Phonics practice for /th/ sound: three, thanks."]
  },
  "5-8": {
    emoji: "🏛️",
    arabicDesc: "صديقنا حسن من الفاشر يعرفنا على مدينته ومتحف السلطان التقليدي الرائع وبئر المياه.",
    bullets: ["Hello, I'm Hassan from Al Fasher in Sudan.", "This is a photo of the Sultan's old table and chair.", "SMILE Starter 1 Pupil's Book complete! 🎉"]
  }
};

const UNIT_THEMES: Record<number, { gradient: string; icon: any }> = {
  1: { gradient: "from-sky-400 to-indigo-500", icon: Globe },
  2: { gradient: "from-rose-400 to-pink-500", icon: Heart },
  3: { gradient: "from-teal-400 to-emerald-500", icon: Compass },
  4: { gradient: "from-amber-400 to-orange-500", icon: PenTool },
  5: { gradient: "from-cyan-400 to-blue-500", icon: FlaskConical }
};

// Map each Unit and Lesson to a distinctive child-friendly category to render rich SVGs
function getLessonCategory(unitId: number, lessonId: number): string {
  if (unitId === 1) {
    if (lessonId === 1) return "hello";
    if (lessonId === 2) return "numbers";
    if (lessonId === 3) return "numbers";
    if (lessonId === 4) return "hello";
    if (lessonId === 5) return "hello";
    if (lessonId === 6) return "nature";
    if (lessonId === 7) return "hello";
    return "school"; // Lesson 8 is phonics
  }
  if (unitId === 2) {
    if (lessonId === 1) return "animals"; // Crocodiles
    if (lessonId === 2) return "numbers"; // Birthday
    if (lessonId === 3) return "animals"; // Frogs
    if (lessonId === 4) return "animals"; // Cats
    if (lessonId === 5) return "animals"; // Lost Ali
    if (lessonId === 6) return "hello"; // Found Mum
    if (lessonId === 7) return "school"; // Clock
    return "school"; // Lesson 8 is phonics
  }
  if (unitId === 3) {
    if (lessonId === 1) return "colours"; // Colours song
    if (lessonId === 2) return "colours"; // Bingo
    if (lessonId === 3) return "colours"; // Traffic lights
    if (lessonId === 4) return "colours"; // Spelling RED
    if (lessonId === 5) return "nature"; // Flag
    if (lessonId === 6) return "school"; // Drawing blue bag
    if (lessonId === 7) return "hello"; // Amna details
    return "hello"; // Reunited Ali
  }
  if (unitId === 4) {
    if (lessonId === 1) return "food"; // Lemons & Melons
    if (lessonId === 2) return "school"; // Boy/Girl details
    if (lessonId === 3) return "body"; // My Body
    if (lessonId === 4) return "school"; // Eddie/Hamad
    if (lessonId === 5) return "animals"; // Animal features
    if (lessonId === 6) return "animals"; // Gonfooth the Hedgehog
    if (lessonId === 7) return "nature"; // Photos of Sudan
    return "school"; // Have you got photo
  }
  if (unitId === 5) {
    if (lessonId === 1) return "school"; // Point to classroom
    if (lessonId === 2) return "school"; // What's in the bag
    if (lessonId === 3) return "school"; // Mrs Hind next to board
    if (lessonId === 4) return "animals"; // Monkey on chair
    if (lessonId === 5) return "school"; // Lost toy
    if (lessonId === 6) return "animals"; // Sukkar's tail
    if (lessonId === 7) return "school"; // Ruler search
    return "nature"; // Hassan from Al Fasher
  }
  return "school";
}

// Gorgeous, high-fidelity, kid-friendly vector illustrations
function LessonSVG({ category, emoji }: { category: string; emoji: string }) {
  const getCategoryPaths = () => {
    switch (category) {
      case "hello":
        return (
          <>
            {/* Colorful background stars */}
            <circle cx="40" cy="50" r="3" fill="#fef08a" />
            <circle cx="160" cy="40" r="4" fill="#fef08a" />
            <circle cx="150" cy="150" r="3" fill="#fef08a" />
            {/* Smiling sun with happy eyes */}
            <circle cx="100" cy="90" r="40" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
            <circle cx="100" cy="90" r="34" fill="#fbbf24" />
            {/* Happy cartoon eyes */}
            <circle cx="86" cy="82" r="4.5" fill="#0f172a" />
            <circle cx="88" cy="80" r="1.5" fill="#ffffff" />
            <circle cx="114" cy="82" r="4.5" fill="#0f172a" />
            <circle cx="116" cy="80" r="1.5" fill="#ffffff" />
            {/* Pink blushing cheeks */}
            <ellipse cx="78" cy="92" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="122" cy="92" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
            {/* Cute smile */}
            <path d="M 90 98 Q 100 110 110 98" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            {/* Sun rays */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI) / 4;
              const x1 = 100 + Math.cos(angle) * 44;
              const y1 = 90 + Math.sin(angle) * 44;
              const x2 = 100 + Math.cos(angle) * 54;
              const y2 = 90 + Math.sin(angle) * 54;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
              );
            })}
          </>
        );
      case "numbers":
        return (
          <>
            {/* Floating colorful numbers with faces! */}
            {/* Number 1 in red */}
            <g transform="translate(35, 50)">
              <path d="M 10 30 L 20 10 L 20 50 M 12 50 L 28 50" fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="18" r="1.5" fill="#0f172a" />
              <path d="M 15 23 Q 17 25 19 23" fill="none" stroke="#0f172a" strokeWidth="1" />
            </g>
            {/* Number 2 in amber */}
            <g transform="translate(125, 45)">
              <path d="M 10 18 C 10 8, 30 8, 30 18 C 30 28, 10 38, 10 44 L 30 44" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="14" r="1.5" fill="#0f172a" />
              <path d="M 15 18 Q 17 20 19 18" fill="none" stroke="#0f172a" strokeWidth="1" />
            </g>
            {/* Number 3 in green */}
            <g transform="translate(40, 110)">
              <path d="M 10 10 C 25 10, 25 25, 12 25 C 27 25, 27 42, 10 42" fill="none" stroke="#10b981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="15" cy="16" r="1.5" fill="#0f172a" />
              <path d="M 13 20 Q 15 22 17 20" fill="none" stroke="#0f172a" strokeWidth="1" />
            </g>
            {/* Number 4 in sky blue */}
            <g transform="translate(120, 105)">
              <path d="M 25 42 L 25 10 L 10 30 L 32 30" fill="none" stroke="#06b6d4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="22" r="1.5" fill="#0f172a" />
              <path d="M 16 26 Q 18 28 20 26" fill="none" stroke="#0f172a" strokeWidth="1" />
            </g>
            {/* Sparkles */}
            <circle cx="95" cy="40" r="2" fill="#fff" />
            <circle cx="90" cy="145" r="3" fill="#fff" />
          </>
        );
      case "colours":
        return (
          <>
            {/* Vibrant Rainbow */}
            <path d="M 20 150 A 80 80 0 0 1 180 150" fill="none" stroke="#ef4444" strokeWidth="10" />
            <path d="M 30 150 A 70 70 0 0 1 170 150" fill="none" stroke="#f59e0b" strokeWidth="10" />
            <path d="M 40 150 A 60 60 0 0 1 160 150" fill="none" stroke="#ec4899" strokeWidth="10" />
            <path d="M 50 150 A 50 50 0 0 1 150 150" fill="none" stroke="#10b981" strokeWidth="10" />
            <path d="M 60 150 A 40 40 0 0 1 140 150" fill="none" stroke="#3b82f6" strokeWidth="10" />
            {/* Fluffy clouds at bottom of rainbow */}
            <circle cx="25" cy="145" r="16" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="40" cy="150" r="14" fill="#fff" />
            <circle cx="160" cy="150" r="14" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="175" cy="145" r="16" fill="#fff" />
            {/* Floating colourful balloons */}
            <g transform="translate(100, 45)">
              <circle cx="0" cy="0" r="14" fill="#f43f5e" />
              <path d="M 0 14 L -2 18 L 2 18 Z" fill="#f43f5e" />
              <path d="M 0 18 Q -5 35 3 50" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <g transform="translate(68, 55)">
              <circle cx="0" cy="0" r="12" fill="#3b82f6" />
              <path d="M 0 12 L -2 15 L 2 15 Z" fill="#3b82f6" />
              <path d="M 0 15 Q 5 30 -2 45" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </>
        );
      case "body":
        return (
          <>
            {/* Kid's face pointing to parts */}
            <circle cx="100" cy="95" r="50" fill="#ffedd5" stroke="#f97316" strokeWidth="3" />
            {/* Hair */}
            <path d="M 50 95 C 45 40, 155 40, 150 95 C 130 65, 70 65, 50 95 Z" fill="#1e293b" />
            {/* Big cute eyes */}
            <circle cx="80" cy="90" r="9" fill="#fff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="80" cy="90" r="4.5" fill="#3b82f6" />
            <circle cx="78" cy="88" r="1.5" fill="#fff" />
            
            <circle cx="120" cy="90" r="9" fill="#fff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="120" cy="90" r="4.5" fill="#3b82f6" />
            <circle cx="118" cy="88" r="1.5" fill="#fff" />
            {/* Cute blushing cheeks */}
            <ellipse cx="65" cy="104" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="135" cy="104" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
            {/* Little button nose */}
            <circle cx="100" cy="101" r="3.5" fill="#f97316" />
            {/* Smiling mouth */}
            <path d="M 85 112 Q 100 126 115 112" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            {/* Ears */}
            <circle cx="47" cy="95" r="10" fill="#ffedd5" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="47" cy="95" r="5" fill="#fdbaf8" />
            <circle cx="153" cy="95" r="10" fill="#ffedd5" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="153" cy="95" r="5" fill="#fdbaf8" />
          </>
        );
      case "school":
        return (
          <>
            {/* Cute cartoon school bag with big eyes */}
            <rect x="55" y="65" width="90" height="90" rx="20" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
            {/* Front pocket */}
            <rect x="67" y="105" width="66" height="40" rx="10" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
            {/* Top handle */}
            <path d="M 80 65 Q 100 45 120 65" fill="none" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" />
            {/* Straps */}
            <rect x="45" y="80" width="12" height="60" rx="6" fill="#1d4ed8" />
            <rect x="143" y="80" width="12" height="60" rx="6" fill="#1d4ed8" />
            {/* Cute eyes on bag */}
            <circle cx="85" cy="88" r="6" fill="#fff" />
            <circle cx="85" cy="88" r="2.5" fill="#0f172a" />
            <circle cx="115" cy="88" r="6" fill="#fff" />
            <circle cx="115" cy="88" r="2.5" fill="#0f172a" />
            {/* Cute smile on bag pocket */}
            <path d="M 94 122 Q 100 128 106 122" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            {/* Pencil sticking out */}
            <path d="M 132 50 L 140 65 L 128 65 Z" fill="#f59e0b" />
            <rect x="128" y="65" width="12" height="15" fill="#34d399" />
          </>
        );
      case "animals":
        return (
          <>
            {/* Cute green cartoon frog sitting on a leaf */}
            <ellipse cx="100" cy="140" rx="65" ry="15" fill="#15803d" /> {/* Lillypad */}
            <path d="M 75 140 Q 100 132 125 140" fill="none" stroke="#166534" strokeWidth="2" />
            {/* Frog body */}
            <ellipse cx="100" cy="105" rx="36" ry="26" fill="#4ade80" stroke="#166534" strokeWidth="3" />
            {/* Frog eyes */}
            <circle cx="80" cy="78" r="11" fill="#4ade80" stroke="#166534" strokeWidth="3" />
            <circle cx="80" cy="78" r="7.5" fill="#fff" />
            <circle cx="82" cy="78" r="3.5" fill="#0f172a" />
            <circle cx="120" cy="78" r="11" fill="#4ade80" stroke="#166534" strokeWidth="3" />
            <circle cx="120" cy="78" r="7.5" fill="#fff" />
            <circle cx="118" cy="78" r="3.5" fill="#0f172a" />
            {/* Big frog smile */}
            <path d="M 80 108 Q 100 125 120 108" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
            {/* Rosy cheeks */}
            <ellipse cx="72" cy="104" rx="4" ry="2" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="128" cy="104" rx="4" ry="2" fill="#f43f5e" opacity="0.6" />
            {/* Frog legs */}
            <ellipse cx="64" cy="120" rx="10" ry="14" fill="#22c55e" stroke="#166534" strokeWidth="2.5" />
            <ellipse cx="136" cy="120" rx="10" ry="14" fill="#22c55e" stroke="#166534" strokeWidth="2.5" />
          </>
        );
      case "food":
        return (
          <>
            {/* Cute shiny red apple and yellow lemon */}
            {/* Red Apple */}
            <g transform="translate(65, 100)">
              <path d="M -25 -5 C -25 -25, -2 -25, -2 -12 C -2 -25, 21 -25, 21 -5 C 21 15, 5 30, -2 30 C -9 30, -25 15, -25 -5 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" />
              {/* Apple leaf & stem */}
              <path d="M -2 -14 Q -2 -26 -10 -26" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <path d="M -2 -20 Q 8 -26 12 -18 Q 4 -14 -2 -20 Z" fill="#22c55e" />
              {/* Shine highlight */}
              <ellipse cx="-10" cy="-5" rx="4" ry="7" fill="#fff" opacity="0.5" transform="rotate(-15, -10, -5)" />
            </g>
            {/* Yellow Lemon */}
            <g transform="translate(135, 100)">
              <ellipse cx="0" cy="0" rx="25" ry="18" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
              {/* Lemon tips */}
              <circle cx="-25" cy="0" r="3.5" fill="#ca8a04" />
              <circle cx="25" cy="0" r="3.5" fill="#ca8a04" />
              {/* Little green leaf */}
              <path d="M 0 -18 Q 8 -26 4 -32 Q -4 -26 0 -18 Z" fill="#10b981" />
            </g>
          </>
        );
      case "nature":
        return (
          <>
            {/* Sudanese landscape: River Nile, sun, pyramids & waving flag */}
            {/* Warm yellow sunset sun */}
            <circle cx="100" cy="65" r="28" fill="#facc15" opacity="0.95" />
            {/* Golden Pyramids */}
            <polygon points="65,115 30,150 100,150" fill="#d97706" stroke="#7c2d12" strokeWidth="2" />
            <polygon points="65,115 65,150 100,150" fill="#b45309" />
            {/* River Nile (flowing waves at bottom) */}
            <path d="M10,148 Q50,138 100,148 T190,148 L190,190 L10,190 Z" fill="#3b82f6" />
            <path d="M15,160 Q55,150 105,160 T185,160" fill="none" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
            {/* Waving Sudanese Flag */}
            <g transform="translate(135, 60)">
              {/* Flagpole */}
              <line x1="0" y1="0" x2="0" y2="70" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="3.5" fill="#94a3b8" />
              {/* Waving flag canvas */}
              <g transform="translate(1.5, 3)">
                {/* Red strip */}
                <rect x="0" y="0" width="36" height="8" fill="#ef4444" />
                {/* White strip */}
                <rect x="0" y="8" width="36" height="8" fill="#fff" />
                {/* Black strip */}
                <rect x="0" y="16" width="36" height="8" fill="#0f172a" />
                {/* Green triangle */}
                <polygon points="0,0 12,12 0,24" fill="#15803d" />
                {/* Border around flag */}
                <rect x="0" y="0" width="36" height="24" fill="none" stroke="#0f172a" strokeWidth="1" />
              </g>
            </g>
          </>
        );
      default:
        return (
          <>
            <circle cx="100" cy="100" r="50" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
            <text x="100" y="115" fontSize="50" textAnchor="middle">{emoji}</text>
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[150px] max-h-[150px] md:max-w-[180px] md:max-h-[180px] drop-shadow-md select-none">
      <defs>
        <radialGradient id="cardBg" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      {/* Visual background circle frame */}
      <circle cx="100" cy="100" r="92" fill="url(#cardBg)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Category-specific vector drawings */}
      {getCategoryPaths()}

      {/* Floating active emoji emblem in corner */}
      <g transform="translate(145, 145)">
        <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#fff" strokeWidth="2" />
        <text x="0" y="7" fontSize="20" textAnchor="middle">{emoji}</text>
      </g>
    </svg>
  );
}

export default function LessonIllustration({ unitId, lessonId, title }: LessonIllustrationProps) {
  const key = `${unitId}-${lessonId}`;
  const details = ILLUSTRATION_DETAILS[key] || {
    emoji: "📖",
    arabicDesc: "رسم توضيحي تفاعلي لطلاب السودان بلمسات تعليمية مبهجة ومميزة.",
    bullets: ["Exploring SMILE Book 1 curriculum lessons", "Interactive language exercises and activities", "Polished lesson summaries with vocabulary guides"]
  };

  const theme = UNIT_THEMES[unitId] || { gradient: "from-indigo-500 to-purple-600", icon: BookOpen };
  const IconComponent = theme.icon;
  const category = getLessonCategory(unitId, lessonId);

  const containerStyle = "relative w-full min-h-[280px] md:min-h-[220px] rounded-[32px] overflow-hidden border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-stretch justify-between p-4 sm:p-6 gap-5 bg-gradient-to-br";

  return (
    <div className="w-full relative">
      <div className={`${containerStyle} ${theme.gradient} text-white`}>
        {/* Decorative ambient radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent)] pointer-events-none" />
        
        {/* Left Side: Lesson details, text description, Arabic notes */}
        <div className="flex-1 flex flex-col justify-between gap-4 z-10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/15 rounded-2xl border border-white/20 backdrop-blur-xs shrink-0">
              <IconComponent className="w-6 sm:w-8 h-6 sm:h-8 text-white stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/70 block">
                Unit {unitId} • Lesson {lessonId}
              </span>
              <h3 className="text-sm sm:text-base font-black text-white line-clamp-2">
                {title.replace(/^Lesson \d+:\s*/i, "")}
              </h3>
            </div>
          </div>

          {/* Quick summary bullets */}
          <div className="flex flex-col gap-1 sm:gap-1.5 text-left pl-1 sm:pl-2">
            {details.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px] sm:text-xs text-white/90 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0" />
                <span className="line-clamp-2">{bullet}</span>
              </div>
            ))}
          </div>


        </div>

        {/* Right Side: High-fidelity Vector SVG Illustration Canvas */}
        <div className="w-full md:w-56 shrink-0 flex items-center justify-center bg-slate-950/20 border-2 border-white/10 rounded-[24px] relative overflow-hidden p-3 min-h-[160px] md:min-h-0 z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            <LessonSVG category={category} emoji={details.emoji} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
