import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2 } from "lucide-react";
import { SMILE_UNITS } from "../smileData";

interface InteractiveWordProps {
  word: string; // original word (might contain punctuation)
  cleanWord: string; // cleaned word
  voiceName: string;
  isHighlighted: boolean;
  speakText: any;
}

// Comprehensive lookup dictionary for Grade 1 SMILE book lessons
const ARABIC_GLOSSARY: Record<string, string> = {
  "famous": "مشهور",
  "scientists": "علماء",
  "scientist": "عالم",
  "history": "التاريخ",
  "mother": "أم",
  "wife": "زوجة",
  "deaf": "أصم",
  "interested": "مهتم",
  "sound": "صوت",
  "invented": "اخترع",
  "telephone": "الهاتف",
  "made": "صنع / قام بـ",
  "important": "هام",
  "discoveries": "اكتشافات",
  "discovery": "اكتشاف",
  "boiling": "غليان",
  "liquids": "سوائل",
  "liquid": "سائل",
  "milk": "حليب",
  "kill": "يقتل",
  "bacteria": "بكتيريا",
  "vaccinations": "لقاحات / تطعيمات",
  "vaccination": "لقاح",
  "first": "أول",
  "woman": "امرأة",
  "win": "يفوز",
  "nobel": "نوبل",
  "prize": "جائزة",
  "physics": "الفيزياء",
  "sadly": "للأسف",
  "killed": "قُتل",
  "radiation": "إشعاع",
  "discovered": "اكتشف",
  "gravity": "الجاذبية",
  "calculus": "حساب التفاضل والتكامل",
  "england": "إنجلترا",
  "years": "سنوات",
  "year": "سنة",
  "ago": "مضت",
  "answer": "أجب",
  "questions": "أسئلة",
  "question": "سؤال",
  "who": "من",
  "helped": "ساعد",
  "stop": "يوقف",
  "people": "الناس",
  "becoming": "يصبح",
  "ill": "مريض",
  "won": "فاز",
  "traditional": "تقليدي",
  "dress": "فستان / لباس",
  "loose": "فضفاض",
  "item": "قطعة / عنصر",
  "clothing": "ملابس",
  "usually": "عادة",
  "white": "أبيض",
  "novel": "رواية",
  "novelist": "روائي",
  "books": "كتب",
  "book": "كتاب",
  "comfortable": "مريح",
  "art": "فن",
  "writing": "الكتابة",
  "beach": "شاطئ",
  "sand": "رمل / رمال",
  "sculptures": "منحوتات / تماثيل",
  "sculpture": "تمثال",
  "women": "نساء",
  "india": "الهند",
  "borders": "حدود",
  "border": "حدود",
  "shares": "يشارك",
  "share": "يشارك",
  "countries": "دول / بلدان",
  "country": "دولة / بلد",
  "continent": "قارة",
  "island": "جزيرة",
  "peninsula": "شبه جزيرة",
  "hospitality": "كرم الضيافة",
  "generous": "كريم / سخي",
  "perform": "يؤدي",
  "hajj": "الحج",
  "explorer": "رحالة / مستكشف",
  "traveling": "السفر / الترحال",
  "apprentice": "متدرب مهني",
  "learns": "يتعلم",
  "learn": "يتعلم",
  "skill": "مهارة",
  "skills": "مهارات",
  "fixing": "تصليح / إصلاح",
  "cars": "سيارات",
  "car": "سيارة",
  "hobby": "هواية",
  "violin": "كمان",
  "convention": "اتفاقية",
  "protects": "يحمي",
  "protect": "يحمي",
  "children": "أطفال",
  "child": "طفل",
  "rights": "حقوق",
  "right": "حق",
  "play": "يلعب / يعزف",
  "pilot": "طيار",
  "engineer": "مهندس",
  "oil": "نفط / زيت",
  "refinery": "مصفاة",
  "work": "عمل / يعمل",
  "live": "يعيش",
  "extreme": "شديد / قاسي",
  "poverty": "فقر",
  "sorghum": "الذرة الرفيعة",
  "crop": "محصول",
  "crops": "محاصيل",
  "bread": "خبز",
  "dairy": "منتجات الألبان",
  "include": "يشمل / يتضمن",
  "cheese": "جبن",
  "yoghurt": "زبادي",
  "greenhouse": "الدفيئة (بيت زجاجي)",
  "glass": "زجاج",
  "structures": "هياكل / مباني",
  "structure": "هيكل",
  "trap": "يحتجز / يحبس",
  "warmth": "الدفء",
  "grow": "ينمو / يزرع",
  "food": "طعام",
  "beekeeper": "مربي النحل",
  "collects": "يجمع",
  "honey": "عسل",
  "beehives": "خلايا النحل",
  "beehive": "خلية نحل",
  "harvest": "حصاد",
  "harvesting": "حصد / يحصد",
  "weeding": "إزالة الأعشاب الضارة",
  "fasting": "الصيام",
  "praying": "الصلاة / الدعاء",
  "healthy": "صحي",
  "habits": "عادات",
  "brain": "الدماغ / المخ",
  "controls": "يتحكم",
  "everything": "كل شيء",
  "body": "جسم",
  "itself": "نفسه / حد ذاته",
  "myself": "بنفسي",
  "ourselves": "بأنفسنا",
  "himself": "بنفسه",
  "herself": "بنفسها",
  "themselves": "بأنفسهم",
  "yourself": "بنفسك",
  "penicillin": "بنسلين",
  "discover": "يكتشف",
  "fleming": "فلمنج",
  "ancient": "قديم / أثري",
  "cities": "مدن",
  "city": "مدينة",
  "built": "بُنيت / مبني",
  "along": "على طول",
  "river": "نهر",
  "nile": "النيل",
  "incredible": "لا يصدق / مذهل",
  "destroyed": "دُمرت",
  "strong": "قوي",
  "winds": "رياح",
  "wind": "ريح / رياح",
  "desert": "صحراء",
  "quran": "القرآن",
  "kufic": "الكوفي",
  "script": "خط / مخطوطة",
  "school": "مدرسة",
  "lessons": "دروس",
  "lesson": "درس",
  "teacher": "معلم / معلمة",
  "student": "طالب",
  "students": "طلاب",
  "classroom": "غرفة الصف",
  "walls": "جدران",
  "wall": "جدار",
  "painted": "طُليت / صُبغت",
  "during": "خلال",
  "summer": "الصيف",
  "break": "عطلة / استراحة",
  "robot": "إنسان آلي / روبوت",
  "turn": "يدور / يشغل",
  "off": "إيقاف",
  "battery": "بطارية",
  "low": "منخفضة",
  "phone": "هاتف / تليفون",
  "rang": "رنّ",
  "while": "بينما",
  "homework": "الواجب المنزلي",
  "staying": "الإقامة / البقاء",
  "house": "بيت / منزل",
  "walking": "المشي",
  "saw": "رأى",
  "tracks": "آثار / مسارات",
  "excuse": "عذر / اعذرني",
  "help": "مساعدة",
  "find": "يجد / يعثر على",
  "divided": "مُقسّم",
  "divide": "يقسم",
  "apples": "تفاح",
  "apple": "تفاحة",
  "draw": "يرسم",
  "fingers": "أصابع",
  "finger": "إصبع",
  "fine": "رقيق / جميل",
  "blows": "تهب / يطير",
  "away": "بعيداً",
  "oldest": "الأقدم",
  "difficult": "صعب",
  "artist": "فنان",
  "studied": "درس / تعلم",
  "painting": "الرسم / لوحة",
  "cairo": "القاهرة",
  "egyptian": "مصري",
  "father": "أب",
  "sudan": "السودان",
  "six": "ستة",
  "weeks": "أسابيع",
  "week": "أسبوع",
  "old": "عمر / قديم",
  "moved": "انتقل / تحرك",
  "khartoum": "الخرطوم",
  "lived": "عاش",
  "london": "لندن",
  "novels": "روايات",
  "two": "اثنين",
  "moving": "الانتقال",
  "scotland": "اسكتلندا",
  "lyrics": "كلمات الأغاني",
  "alley": "زقاق / ممر",
  "scottish": "اسكتلندي",
  "award": "جائزة",
  "university": "جامعة",
  "started": "بدأ",
  "science": "العلوم",
  "subjects": "مواد دراسية",
  "subject": "مادة دراسية",
  "consists": "يتكون",
  "chemistry": "الكيمياء",
  "biology": "الأحياء",
  "bones": "عظام",
  "bone": "عظمة",
  "calcium": "الكالسيوم",
  "thermometer": "ميزان حرارة",
  "measure": "يقيس",
  "temperature": "درجة الحرارة",
  "wise": "حكيم",
  "fox": "ثعلب",
  "knew": "عرف",
  "exactly": "بالضبط",
  "meals": "وجبات",
  "meal": "وجبة",
  "thobe": "ثوب",
  "worn": "مُرتدى / يلبس",
  "men": "رجال",
  "man": "رجل",
  "comfort": "راحة",
  "sari": "ساري",
  "beautiful": "جميل",
  "dresses": "فساتين / أثواب",
  "leila": "ليلى",
  "aboulela": "أبو العلا",
  "ibrahim": "إبراهيم",
  "el-salahi": "الصلاحي",
  "world-famous": "مشهور عالمياً",
  "tayeb": "الطيب",
  "salih": "صالح",
  "they": "هم",
  "we": "نحن",
  "you": "أنت / أنتم",
  "our": "خاصتنا / لنا",
  "their": "خاصتهم / لهم",
  "with": "مع / بـ",
  "without": "بدون",
  "from": "من",
  "about": "عن / حول",
  "under": "تحت",
  "above": "فوق",
  "between": "بين",
  "through": "من خلال / عبر",
  "before": "قبل",
  "after": "بعد",
  "when": "عندما",
  "then": "ثم",
  "there": "هناك",
  "here": "هنا",
  "this": "هذا / هذه",
  "that": "ذلك / تلك",
  "these": "هؤلاء",
  "those": "أولئك",
  "all": "الكل / جميع",
  "some": "بعض",
  "any": "أي",
  "many": "كثير (للمعدود)",
  "much": "كثير (لغير المعدود)",
  "few": "قليل",
  "little": "قليل / صغير",
  "more": "أكثر",
  "most": "معظم / الأكثر",
  "only": "فقط",
  "very": "جداً",
  "too": "أيضاً / جداً",
  "not": "ليس / لا",
  "no": "لا",
  "yes": "نعم",
  "but": "لكن",
  "or": "أو",
  "and": "و",
  "because": "بسبب / لأن",
  "so": "لذلك / لذا",
  "such": "مثل",
  "than": "من (للمقارنة)",
  "like": "مثل / يحب",
  "as": "مثل / كـ",
  "into": "إلى داخل",
  "out": "خارج",
  "up": "أعلى",
  "down": "أسفل",
  "over": "فوق / عبر",
  "again": "مرة أخرى",
  "once": "ذات مرة",
  "always": "دائماً",
  "never": "أبداً",
  "sometimes": "أحياناً",
  "often": "غالباً",
  "today": "اليوم",
  "now": "الآن",
  "will": "سوف",
  "would": "سوف (في الماضي) / يود",
  "can": "يستطيع",
  "could": "استطاع / يمكن",
  "should": "يجب",
  "must": "يجب حتماً",
  "may": "ربما / قد",
  "might": "ربما",
  "has": "لديه / يملك",
  "have": "لديهم / يملكون",
  "had": "كان لديه",
  "does": "يفعل",
  "do": "يفعل",
  "did": "فعل",
  "was": "كان",
  "were": "كانوا",
  "been": "كان (التصريف الثالث)",
  "being": "كونه / مستمر",
  "are": "يكونون",
  "is": "يكون",
  "am": "أكون",
  "be": "يكون",
  "seen": "مرئي / رأى",
  "went": "ذهب",
  "go": "يذهب",
  "goes": "يذهب",
  "going": "الذهاب",
  "come": "يأتي",
  "came": "جاء",
  "coming": "قادم",
  "take": "يأخذ",
  "took": "أخذ",
  "taken": "مأخوذ",
  "get": "يحصل على",
  "got": "حصل على",
  "give": "يعطي",
  "gave": "أعطى",
  "given": "مُعطى",
  "say": "يقول",
  "said": "قال",
  "tell": "يخبر",
  "told": "أخبر",
  "know": "يعرف",
  "known": "معروف",
  "think": "يفكر / يعتقد",
  "thought": "فكر / فكرة / اعتقاد",
  "see": "يرى",
  "look": "ينظر / يبدو",
  "looked": "نظر",
  "want": "يريد",
  "wanted": "أراد",
  "use": "يستخدم / استخدام",
  "used": "مُستخدَم / اعتاد على",
  "found": "وجد",
  "how": "كيف",
  "where": "أين",
  "why": "لماذا",
  "what": "ماذا / ما",
  "which": "أي / الذي",
  "whose": "لمن",
  "whom": "من (للمفعول به)",
  "great": "عظيم / رائع",
  "good": "جيد",
  "best": "الأفضل",
  "better": "أفضل",
  "bad": "سيء",
  "worst": "الأسوأ",
  "worse": "أسوأ",
  "new": "جديد",
  "large": "كبير / ضخم",
  "small": "صغير",
  "high": "مرتفع / عالٍ",
  "long": "طويل",
  "short": "قصير",
  "clean": "نظيف",
  "dirty": "متسخ",
  "easy": "سهل",
  "soft": "ناعم / طري",
  "hot": "حار / ساخن",
  "cool": "منعش / بارد قليلاً",
  "fast": "سريع",
  "heavy": "ثقيل",
  "light": "خفيف / ضوء",
  "dark": "مظلم / غامق",
  "early": "مبكراً",
  "late": "متأخراً",
  "happy": "سعيد",
  "sad": "حزين",
  "ugly": "قبيح",
  "weak": "ضعيف",
  "rich": "غني",
  "full": "ممتلئ / كامل",
  "empty": "فارغ",
  "same": "نفس الشيء",
  "different": "مختلف",
  "next": "التالي",
  "last": "الأخير / الماضي",
  "own": "يمتلك / خاص به",
  "other": "آخر",
  "another": "آخر (للمفرد)",
  "each": "كل",
  "every": "كل",
  "both": "كلاهما",
  "either": "إما",
  "neither": "ولا واحد",
  "speak": "يتحدث",
  "teach": "يعلّم",
  "remember": "يتذكر",
  "forget": "ينسى",
  "ask": "يسأل / يطلب",
  "keep": "يحتفظ / يستمر",
  "begin": "يبدأ",
  "end": "ينتهي / نهاية",
  "finish": "ينهي",
  "continue": "يستمر",
  "open": "يفتح / مفتوح",
  "die": "يموت",
  "feel": "يشعر",
  "appear": "يظهر",
  "stay": "يبقى / يقيم",
  "arrive": "يصل",
  "meet": "يقابل",
  "run": "يجري",
  "sit": "يجلس",
  "stand": "يقف",
  "bring": "يجلب",
  "carry": "يحمل",
  "hold": "يمسك / يعقد",
  "put": "يضع",
  "set": "يضبط / مجموعة",
  "send": "يرسل",
  "receive": "يستقبل",
  "pay": "يدفع",
  "buy": "يشتري",
  "sell": "يبيع",
  "spend": "يقضي / ينفق",
  "choose": "يختار",
  "decide": "يقرر",
  "agree": "يوافق",
  "refuse": "يرفض",
  "allow": "يسمح",
  "prevent": "يمنع",
  "lead": "يقود",
  "follow": "يتبع",
  "join": "ينضم",
  "part": "جزء",
  "member": "عضو",
  "group": "مجموعة",
  "class": "صف / فئة",
  "team": "فريق",
  "club": "نادي",
  "society": "مجتمع",
  "community": "مجتمع محلي",
  "public": "عام / الجمهور",
  "private": "خاص",
  "personal": "شخصي",
  "national": "وطني / قومي",
  "local": "محلي",
  "international": "دولي",
  "global": "عالمي",
  "world": "العالم",
  "earth": "الأرض",
  "sky": "السماء",
  "sun": "الشمس",
  "moon": "القمر",
  "star": "نجم",
  "water": "ماء",
  "fire": "نار",
  "air": "هواء",
  "stone": "حجر",
  "rock": "صخرة",
  "soil": "تربة",
  "land": "أرض",
  "sea": "البحر",
  "ocean": "المحيط",
  "lake": "بحيرة",
  "mountain": "جبل",
  "hill": "تلة",
  "valley": "وادٍ",
  "forest": "غابة",
  "wood": "خشب",
  "tree": "شجرة",
  "grass": "عشب",
  "leaf": "ورقة شجر",
  "animal": "حيوان",
  "bird": "طائر",
  "insect": "حشرة",
  "dog": "كلب",
  "cat": "قطة",
  "horse": "حصان",
  "cow": "بقرة",
  "sheep": "خروف",
  "goat": "ماعز",
  "camel": "جمل",
  "lion": "أسد",
  "tiger": "نمر",
  "bear": "دب",
  "elephant": "فيل",
  "monkey": "قرد",
  "eagle": "نسر",
  "falcon": "صقر",
  "bee": "نحلة",
  "ant": "نملة",
  "spider": "عنكبوت",
  "snake": "ثعبان",
  "fruit": "فاكهة",
  "vegetable": "خضار",
  "banana": "موز",
  "orange": "برتقال",
  "fig": "تين",
  "grape": "عنب",
  "lemon": "ليمون",
  "mango": "مانجو",
  "potato": "بطاطس",
  "tomato": "طماطم",
  "onion": "بصل",
  "garlic": "ثوم",
  "pea": "بازلاء",
  "corn": "ذرة",
  "wheat": "قمح",
  "rice": "أرز",
  "salt": "ملح",
  "pepper": "فلفل",
  "egg": "بيضة",
  "eggs": "بيض",
  "meat": "لحم",
  "chicken": "دجاج",
  "beef": "لحم بقري",
  "soup": "حساء",
  "cake": "كعكة",
  "tea": "شاي",
  "juice": "عصير",
  "sweet": "حلو",
  "sour": "حامض",
  "bitter": "مر",
  "salty": "مالح",
  "delicious": "لذيذ",
  "tasty": "شهي",
  "drink": "شراب",
  "breakfast": "الفطور",
  "dinner": "العشاء",
  "kitchen": "مطبخ",
  "plate": "صحن / طبق",
  "spoon": "ملعقة",
  "fork": "شوكة",
  "knife": "سكين",
  "pot": "وعاء / قدر",
  "pan": "مقلاة",
  "stove": "موقد",
  "refrigerator": "ثلاجة",
  "chair": "كرسي",
  "desk": "مكتب",
  "bed": "سرير",
  "door": "باب",
  "window": "نافذة",
  "roof": "سقف",
  "floor": "أرضية",
  "room": "غرفة",
  "building": "مبنى",
  "office": "مكتب",
  "shop": "محل / دكان",
  "market": "سوق",
  "hospital": "مستشفى",
  "clinic": "عيادة",
  "mosque": "مسجد",
  "church": "كنيسة",
  "temple": "معبد",
  "street": "شارع",
  "road": "طريق",
  "bridge": "جسر",
  "tunnel": "نفق",
  "park": "حديقة عامة",
  "garden": "حديقة",
  "farm": "مزرعة",
  "field": "حقل",
  "yard": "ساحة / فناء",
  "court": "ملعب",
  "station": "محطة",
  "airport": "مطار",
  "port": "ميناء",
  "hotel": "فندق",
  "restaurant": "مطعم",
  "cafe": "مقهى",
  "cinema": "سينما",
  "theater": "مسرح",
  "museum": "متحف",
  "library": "مكتبة",
  "bookshop": "مكتبة",
  "bank": "بنك",
  "post": "بريد",
  "police": "الشرطة",
  "army": "الجيش",
  "navy": "القوات البحرية",
  "airforce": "القوات الجوية",
  "soldier": "جندي",
  "officer": "ضابط",
  "judge": "قاضٍ",
  "lawyer": "محامٍ",
  "doctor": "طبيب",
  "nurse": "ممرضة",
  "patient": "مريض",
  "dentist": "طبيب أسنان",
  "pharmacist": "صيدلي",
  "vet": "طبيب بيطري",
  "professor": "أستاذ جامعي",
  "pupil": "تلميذ",
  "writer": "كاتب",
  "poet": "شاعر",
  "actor": "ممثل",
  "singer": "مغني",
  "dancer": "راقص",
  "musician": "موسيقار",
  "painter": "رسام",
  "sculptor": "نحات",
  "architect": "مهندس معماري",
  "builder": "بناء",
  "carpenter": "نجار",
  "plumber": "سباك",
  "electrician": "كهربائي",
  "mechanic": "ميكانيكي",
  "driver": "سائق",
  "captain": "كابتن",
  "sailor": "بحار",
  "farmer": "مزارع",
  "fisherman": "صياد سمك",
  "hunter": "صياد",
  "shepherd": "راعي غنم",
  "butcher": "جزار",
  "baker": "خباز",
  "cook": "طباخ",
  "waiter": "نادل",
  "tailor": "خياط",
  "barber": "حلاق",
  "shoemaker": "إسكافي",
  "weaver": "نسّاج",
  "potter": "خزّاف",
  "smith": "حداد",
  "shopkeeper": "صاحب دكان",
  "merchant": "تاجر",
  "trader": "تاجر",
  "businessman": "رجل أعمال",
  "boss": "رئيس العمل",
  "worker": "عامل",
  "employee": "موظف",
  "servant": "خادم",
  "guide": "مرشد",
  "guard": "حارس",
  "postman": "ساعي البريد",
  "clerk": "كاتب ملفات",
  "secretary": "سكرتير",
  "cashier": "أمين الصندوق",
  "accountant": "محاسب",
  "partner": "شريك",
  "colleague": "زميل عمل",
  "friend": "صديق",
  "enemy": "عدو",
  "neighbor": "جار",
  "stranger": "غريب",
  "guest": "ضيف",
  "host": "مضيف",
  "king": "ملك",
  "queen": "ملكة",
  "prince": "أمير",
  "princess": "أميرة",
  "president": "رئيس",
  "leader": "قائد",
  "hero": "بطل",
  "champion": "بطل",
  "loser": "خاسر",
  "player": "لاعب",
  "referee": "حكم",
  "spectator": "متفرج",
  "audience": "جمهور",
  "crowd": "حشد / جمع",
  "baby": "رضيع",
  "boy": "ولد",
  "girl": "بنت",
  "youth": "شباب",
  "adult": "بالغ",
  "elder": "كبير السن",
  "parent": "أحد الوالدين",
  "son": "ابن",
  "daughter": "ابنة",
  "brother": "أخ",
  "sister": "أخت",
  "uncle": "عم / خال",
  "aunt": "عمة / خالة",
  "nephew": "ابن الأخ / الأخت",
  "niece": "ابنة الأخ / الأخت",
  "cousin": "ابن العم",
  "grandfather": "جد",
  "grandmother": "جدة",
  "grandson": "حفيد",
  "granddaughter": "حفيدة",
  "husband": "زوج",
  "relative": "قريب",
  "ancestor": "سلف / جد قديم",
  "descendant": "نسل / سليل",
  "generation": "جيل",
  "wedding": "زفاف",
  "funeral": "جنازة",
  "celebration": "احتفال",
  "festival": "مهرجان",
  "vacation": "إجازة",
  "trip": "رحلة قصيرة",
  "journey": "رحلة طويلة",
  "voyage": "رحلة بحرية",
  "flight": "رحلة جوية",
  "tour": "جولة",
  "visit": "زيارة",
  "meeting": "اجتماع",
  "interview": "مقابلة شخصية",
  "conference": "مؤتمر",
  "event": "حدث",
  "party": "حفلة",
  "performance": "أداء",
  "sport": "رياضة",
  "match": "مباراة",
  "race": "سباق",
  "competition": "مسابقة",
  "contest": "مسابقة",
  "medal": "ميدالية",
  "trophy": "كأس تذكاري",
  "score": "نتيجة",
  "goal": "هدف",
  "point": "نقطة",
  "practice": "تدريب",
  "train": "يتدرب / قطار",
  "exercise": "تمرين",
  "workout": "تمرين رياضي",
  "fitness": "لياقة بدنية",
  "illness": "مرض",
  "disease": "داء / مرض",
  "pain": "ألم",
  "ache": "وجع",
  "hurt": "يؤلم",
  "wound": "جرح",
  "injury": "إصابة",
  "cure": "علاج",
  "medicine": "دواء",
  "drug": "عقار / دواء",
  "pill": "حبة دواء",
  "tablet": "قرص دواء",
  "dose": "جرعة",
  "injection": "حقنة",
  "operation": "عملية",
  "surgery": "جراحة",
  "first-aid": "إسعافات أولية",
  "bandaid": "ضمادة لاصقة",
  "bandage": "ضمادة",
  "cotton": "قطن",
  "alcohol": "كحول",
  "soap": "صابون",
  "hygiene": "النظافة الشخصية",
  "cleanliness": "النظافة",
  "head": "رأس",
  "hair": "شعر",
  "face": "وجه",
  "ear": "أذن",
  "ears": "آذان",
  "nose": "أنف",
  "mouth": "فم",
  "lip": "شفة",
  "lips": "شفاة",
  "tooth": "سن",
  "teeth": "أسنان",
  "tongue": "لسان",
  "throat": "حلق",
  "neck": "رقبة",
  "shoulder": "كتف",
  "arm": "ذراع",
  "elbow": "مرفق",
  "wrist": "معصم",
  "nail": "ظفر",
  "thumb": "إبهام",
  "chest": "صدر",
  "breast": "ثدي",
  "stomach": "معدة",
  "belly": "بطن",
  "back": "ظهر",
  "spine": "عمود فقري",
  "waist": "خصر",
  "hip": "ورك",
  "leg": "ساق",
  "knee": "ركبة",
  "ankle": "كاحل",
  "foot": "قدم",
  "toe": "إصبع القدم",
  "heel": "كعب",
  "skin": "جلد",
  "muscle": "عضلة",
  "blood": "دم",
  "heart": "قلب",
  "lung": "رئة",
  "lungs": "رئتين",
  "liver": "كبد",
  "kidney": "كلية",
  "intestine": "أمعاء",
  "vein": "وريد",
  "artery": "شريان",
  "nerve": "عصب",
  "cell": "خلية",
  "organ": "عضو جسدي",
  "system": "جهاز / نظام",
  "skeleton": "هيكل عظمي",
  "iron": "حديد",
  "vitamin": "فيتامين",
  "energy": "طاقة",
  "strength": "قوة",
  "growth": "نمو",
  "development": "تطور / تنمية"
};

// Returns translation of word if found in the hardcoded dictionary or unit vocab items
export const getArabicTranslation = (cleanWord: string): string | null => {
  const normalized = cleanWord.trim().toLowerCase();

  // 1. Direct dictionary match
  if (ARABIC_GLOSSARY[normalized]) {
    return ARABIC_GLOSSARY[normalized];
  }

  // 2. Singular/base fallback check
  if (normalized.endsWith("s") && ARABIC_GLOSSARY[normalized.slice(0, -1)]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -1)];
  }
  if (normalized.endsWith("es") && ARABIC_GLOSSARY[normalized.slice(0, -2)]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -2)];
  }
  if (normalized.endsWith("ed") && ARABIC_GLOSSARY[normalized.slice(0, -1)]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -1)];
  }
  if (normalized.endsWith("ed") && ARABIC_GLOSSARY[normalized.slice(0, -2)]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -2)];
  }
  if (normalized.endsWith("ing") && ARABIC_GLOSSARY[normalized.slice(0, -3)]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -3)];
  }
  if (normalized.endsWith("ing") && ARABIC_GLOSSARY[normalized.slice(0, -3) + "e"]) {
    return ARABIC_GLOSSARY[normalized.slice(0, -3) + "e"];
  }

  // 3. Fallback to searching inside SMILE_UNITS lists
  for (const unit of SMILE_UNITS) {
    if (unit.words) {
      const match = unit.words.find(w => w.word.toLowerCase() === normalized);
      if (match) {
        return match.arabic;
      }
    }
  }

  return null;
};

// Shared dynamic translation cache helper functions
const getPersistentTranslationCache = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem("smile_translation_cache");
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const savePersistentTranslation = (word: string, translation: string) => {
  try {
    const cache = getPersistentTranslationCache();
    cache[word.toLowerCase().trim()] = translation;
    localStorage.setItem("smile_translation_cache", JSON.stringify(cache));
  } catch (e) {
    console.error("Failed to save persistent translation:", e);
  }
};

// Shared dynamic dictionary definition cache helper functions
const getPersistentDefinitionCache = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem("smile_definition_cache");
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const savePersistentDefinition = (word: string, definition: string) => {
  try {
    const cache = getPersistentDefinitionCache();
    cache[word.toLowerCase().trim()] = definition;
    localStorage.setItem("smile_definition_cache", JSON.stringify(cache));
  } catch (e) {
    console.error("Failed to save persistent definition:", e);
  }
};

export default function InteractiveWord({
  word,
  cleanWord,
  voiceName,
  isHighlighted,
  speakText
}: any) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  
  const longPressTimerRef = React.useRef<any>(null);
  const hideTimerRef = React.useRef<any>(null);
  const touchStartPosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasTriggeredLongPressRef = React.useRef<boolean>(false);

  const normalized = cleanWord.trim().toLowerCase();
  const localTranslation = getArabicTranslation(cleanWord);
  
  const getInitialTranslation = () => {
    if (localTranslation) return localTranslation;
    const persistentCache = getPersistentTranslationCache();
    return persistentCache[normalized] || null;
  };

  const getInitialDefinition = () => {
    const persistentCache = getPersistentDefinitionCache();
    return persistentCache[normalized] || null;
  };

  const [translation, setTranslation] = useState<string | null>(getInitialTranslation());
  const [definition, setDefinition] = useState<string | null>(getInitialDefinition());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDefinition, setIsLoadingDefinition] = useState(false);

  // Check if touch device is active and clean up timers on unmount
  useEffect(() => {
    const handleTouch = () => {
      setIsTouchDevice(true);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Sync translation when cleanWord changes
  useEffect(() => {
    const local = getArabicTranslation(cleanWord);
    if (local) {
      setTranslation(local);
    } else {
      const cache = getPersistentTranslationCache();
      setTranslation(cache[normalized] || null);
    }
    const defCache = getPersistentDefinitionCache();
    setDefinition(defCache[normalized] || null);
  }, [cleanWord, normalized]);

  // Fetch translation if not available locally when tooltip is shown
  useEffect(() => {
    if (showTooltip && !translation && !isLoading) {
      setIsLoading(true);
      fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanWord }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Translation request failed");
          return res.json();
        })
        .then((data) => {
          if (data.translation) {
            savePersistentTranslation(normalized, data.translation);
            setTranslation(data.translation);
          }
        })
        .catch((err) => {
          console.error("Failed to translate word dynamically:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [showTooltip, translation, cleanWord, isLoading, normalized]);

  // Fetch definition from Free Dictionary API if not available locally when tooltip is shown
  useEffect(() => {
    if (showTooltip && !definition && !isLoadingDefinition) {
      setIsLoadingDefinition(true);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Definition request failed or word not found");
          return res.json();
        })
        .then((data) => {
          if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
            const firstMeaning = data[0].meanings[0];
            const partOfSpeech = firstMeaning.partOfSpeech || "";
            const defText = firstMeaning.definitions && firstMeaning.definitions[0]
              ? firstMeaning.definitions[0].definition
              : "";
            
            if (defText) {
              const fullDef = partOfSpeech ? `(${partOfSpeech}) ${defText}` : defText;
              savePersistentDefinition(normalized, fullDef);
              setDefinition(fullDef);
            } else {
              setDefinition("No definition available");
            }
          } else {
            setDefinition("No definition available");
          }
        })
        .catch((err) => {
          console.warn("Failed to retrieve dictionary definition:", err);
          setDefinition("No definition available");
        })
        .finally(() => {
          setIsLoadingDefinition(false);
        });
    }
  }, [showTooltip, definition, isLoadingDefinition, normalized]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouchDevice(true);
    setIsPressing(true);
    e.stopPropagation();

    // Clear any active timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hasTriggeredLongPressRef.current = false;

    // Record the starting touch coordinate to check for scrolls
    if (e.touches && e.touches[0]) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }

    // Set timer for long press activation (450ms is perfect)
    longPressTimerRef.current = setTimeout(() => {
      hasTriggeredLongPressRef.current = true;
      setShowTooltip(true);

      // Trigger standard touch vibration for responsive haptic feedback
      if (navigator.vibrate) {
        try {
          navigator.vibrate(40);
        } catch (err) {
          // ignore
        }
      }
    }, 450);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!longPressTimerRef.current) return;

    if (e.touches && e.touches[0]) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - touchStartPosRef.current.x);
      const diffY = Math.abs(currentY - touchStartPosRef.current.y);

      // Cancel long press if scrolled / dragged beyond 10px
      if (diffX > 10 || diffY > 10) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        setIsPressing(false);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    
    // Prevent the ghost/simulated click event to avoid double triggering on mobile devices
    e.preventDefault();
    
    setIsPressing(false);

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (hasTriggeredLongPressRef.current) {
      // Long press was successfully triggered. Keep tooltip open and auto-fade after 4.5 seconds
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 4500);
    } else {
      // Short tap: Pronounce/Speak the word
      speakText(cleanWord, voiceName);
    }
  };

  const handleTouchCancel = () => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setShowTooltip(false);
    }
  };

  return (
    <span 
      className={`relative inline-block ${isTouchDevice ? "select-none" : "select-all"}`}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: isTouchDevice ? "none" : "auto",
        userSelect: isTouchDevice ? "none" : "auto"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onContextMenu={(e) => {
        if (isTouchDevice) {
          // Prevent browser context-menu popup overlay on mobile long-press
          e.preventDefault();
        }
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation(); // Stop parent click/touch from speaking whole line
          speakText(cleanWord, voiceName);
        }}
        className={`inline-block cursor-pointer px-1 rounded transition-all duration-150 transform ${
          isHighlighted 
            ? "bg-amber-400 text-slate-900 font-extrabold scale-110 shadow-md ring-2 ring-amber-300" 
            : isPressing
              ? "bg-amber-100 text-amber-950 scale-95 font-extrabold ring-1 ring-amber-300 shadow-inner"
              : "hover:bg-yellow-200 active:bg-yellow-300 text-indigo-950 border-b border-dashed border-indigo-300 hover:border-yellow-600 font-extrabold hover:scale-105"
        }`}
        title={`Click to read: ${cleanWord}`}
      >
        {word}
      </span>

      <AnimatePresence>
        {showTooltip && (translation || isLoading || definition || isLoadingDefinition) && (
          <motion.span
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 23, mass: 0.8 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 px-3.5 py-2.5 bg-slate-950/95 text-white text-xs rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col gap-1.5 min-w-[150px] w-64 max-w-[280px] md:max-w-[320px] whitespace-normal text-right leading-normal"
            style={{ originX: 0.5, originY: 1 }}
            dir="rtl"
            // Stop touch and click events from bubbling up and triggering outer span's handlers
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Small down arrow indicator */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
            
            <span className="flex items-center justify-between gap-2 border-b border-slate-850 pb-1.5 mb-0.5 w-full" dir="ltr">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 font-sans font-black tracking-wide text-[13px]">
                  {cleanWord}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(cleanWord, voiceName);
                  }}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer border border-slate-800 flex items-center justify-center active:scale-90"
                  title="Pronounce word"
                  aria-label="Pronounce word"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800/80">
                Dictionary
              </span>
            </span>

            {/* Translation (Arabic) */}
            <span className="flex items-center justify-between gap-1 w-full" dir="rtl">
              <span className="text-slate-400 font-medium text-[10px]">الترجمة:</span>
              {isLoading ? (
                <span className="text-slate-400 text-[10px] animate-pulse flex items-center gap-1" dir="rtl">
                  <svg className="animate-spin h-2.5 w-2.5 text-amber-400 inline-block" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري الترجمة...
                </span>
              ) : (
                <span className="text-white font-black text-xs">
                  {translation || "غير متوفرة"}
                </span>
              )}
            </span>

            {/* Definition (English) */}
            <span className="flex flex-col gap-0.5 text-left border-t border-slate-900 pt-1.5 mt-0.5 w-full" dir="ltr">
              <span className="text-slate-400 font-medium text-[10px]">Definition:</span>
              {isLoadingDefinition ? (
                <span className="text-slate-500 text-[10px] animate-pulse flex items-center gap-1">
                  <svg className="animate-spin h-2.5 w-2.5 text-amber-400 inline-block" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading definition...
                </span>
              ) : definition && definition !== "No definition available" ? (
                <span className="text-slate-200 text-[10.5px] leading-relaxed font-sans font-medium">
                  {definition}
                </span>
              ) : (
                <span className="text-slate-500 text-[10px] italic">
                  No English definition found
                </span>
              )}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
