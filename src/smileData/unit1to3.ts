import { UnitItem } from "../types";

export const units1to3: UnitItem[] = [
  {
    id: 1,
    title: "Hello!",
    arabicTitle: "مرحباً!",
    color: "bg-sky-50 text-sky-950 border-sky-400",
    icon: "👋",
    words: [
      { id: "w1-1", word: "Apple", arabic: "تفاحة", image: "🍎", example: "This is a red apple.", soundText: "This is a red apple.", unit: 1 },
      { id: "w1-2", word: "Bag", arabic: "حقيبة", image: "🎒", example: "I have a school bag.", soundText: "I have a school bag.", unit: 1 },
      { id: "w1-3", word: "Bed", arabic: "سرير", image: "🛏️", example: "I sleep on a comfortable bed.", soundText: "I sleep on a comfortable bed.", unit: 1 },
      { id: "w1-4", word: "Cap", arabic: "قبعة رأس", image: "🧢", example: "He has a blue cap.", soundText: "He has a blue cap.", unit: 1 },
      { id: "w1-5", word: "Desk", arabic: "مكتب دراسي", image: "✍️", example: "The book is on the desk.", soundText: "The book is on the desk.", unit: 1 },
      { id: "w1-6", word: "Egg", arabic: "بيضة", image: "🥚", example: "I eat an egg for breakfast.", soundText: "I eat an egg for breakfast.", unit: 1 },
      { id: "w1-7", word: "Fan", arabic: "مروحة", image: "💨", example: "The fan is spinning fast.", soundText: "The fan is spinning fast.", unit: 1 },
      { id: "w1-8", word: "Flag", arabic: "علم", image: "🇸🇩", example: "This is the Sudanese flag.", soundText: "This is the Sudanese flag.", unit: 1 },
      { id: "w1-9", word: "Gate", arabic: "بوابة", image: "🚪", example: "Go through the school gate.", soundText: "Go through the school gate.", unit: 1 },
      { id: "w1-10", word: "Hat", arabic: "قبعة", image: "👒", example: "She is wearing a beautiful hat.", soundText: "She is wearing a beautiful hat.", unit: 1 },
      { id: "w1-11", word: "Hen", arabic: "دجاجة", image: "🐔", example: "The hen is on the farm.", soundText: "The hen is on the farm.", unit: 1 },
      { id: "w1-12", word: "Insect", arabic: "حشرة", image: "🐜", example: "The insect is very small.", soundText: "The insect is very small.", unit: 1 },
      { id: "w1-13", word: "Jam", arabic: "مربى", image: "🍯", example: "I like sweet strawberry jam.", soundText: "I like sweet strawberry jam.", unit: 1 },
      { id: "w1-14", word: "Jug", arabic: "إبريق", image: "🍶", example: "Fill the water jug, please.", soundText: "Fill the water jug, please.", unit: 1 },
      { id: "w1-15", word: "Kick", arabic: "يركل", image: "⚽", example: "Kick the ball to Ahmed.", soundText: "Kick the ball to Ahmed.", unit: 1 },
      { id: "w1-16", word: "Lamp", arabic: "مصباح", image: "💡", example: "Turn on the desk lamp.", soundText: "Turn on the desk lamp.", unit: 1 },
      { id: "w1-17", word: "Leg", arabic: "ساق", image: "🦵", example: "This is my left leg.", soundText: "This is my left leg.", unit: 1 },
      { id: "w1-18", word: "Black", arabic: "أسود", image: "⬛", example: "The board in the class is black.", soundText: "The board in the class is black.", unit: 1 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Hello!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Hi, I'm Badr.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Hello, I'm Ahmed.", voice: "Kore" }
          ],
          songText: "Alphabet Chant:\na b c d e f g\nh i j k l m n\no p q r s t u\nv w x y z"
        }
      },
      {
        id: 2,
        title: "Lesson 2: Numbers 1 to 4",
        type: "vocab",
        content: {
          songText: "Numbers Count:\n1, 2, 3, 4.\nPoint and say:\nA bag. 2 bags.\n\nWords:\napple, bed"
        }
      },
      {
        id: 3,
        title: "Lesson 3: Numbers 5 to 10",
        type: "vocab",
        content: {
          songText: "Numbers Count:\n5, 6, 7, 8, 9, 10.\n\nWords:\ncap, desk"
        }
      },
      {
        id: 4,
        title: "Lesson 4: What's your name?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Hi, I'm Cathy.", voice: "Zephyr" },
            { speaker: "Fatma", text: "Hello, Cathy.", voice: "Kore" },
            { speaker: "Cathy", text: "What's your name?", voice: "Zephyr" },
            { speaker: "Fatma", text: "My name's Fatma.", voice: "Kore" }
          ],
          songText: "Words:\negg, fan, desk, flag"
        }
      },
      {
        id: 5,
        title: "Lesson 5: This is Eddie",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "Hi, Ahmed.", voice: "Kore" },
            { speaker: "Mr Gamar", text: "Hello, Mr Gamar.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "This is Eddie, Mr Gamar.", voice: "Kore" },
            { speaker: "Ahmed", text: "He's English.", voice: "Kore" },
            { speaker: "Mr Gamar", text: "Hello, Eddie.", voice: "Zephyr" }
          ],
          songText: "Words:\ngate, hat, frog, hen"
        }
      },
      {
        id: 6,
        title: "Lesson 6: Are you Sudanese?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Badr, this is Eddie.", voice: "Zephyr" },
            { speaker: "Eddie", text: "Hello, Eddie.", voice: "Kore" },
            { speaker: "Badr", text: "Hello.", voice: "Zephyr" },
            { speaker: "Badr", text: "Are you Sudanese, Eddie?", voice: "Zephyr" },
            { speaker: "Eddie", text: "No, I'm not. I'm English.", voice: "Kore" }
          ],
          songText: "Words:\ninsect, jam, six, jug"
        }
      },
      {
        id: 7,
        title: "Lesson 7: How are you?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Hello.", voice: "Zephyr" },
            { speaker: "Dalia", text: "Hi Cathy. This is Dalia.", voice: "Kore" },
            { speaker: "Cathy", text: "Dalia! How are you?", voice: "Zephyr" },
            { speaker: "Dalia", text: "I'm fine, thanks.", voice: "Kore" }
          ],
          songText: "Words:\nkick, lamp, black, leg"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Phonics Song",
        type: "phonics",
        content: {
          songText: "a is in apple. b is in bed.\nc is in cat. d is in desk.\ne is in egg. f is in flag.\ng is in gate. h is in hat.\ni is in insect. j is in jam.\nk is in kick. l is in lamp.",
          letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"],
          games: [
            {
              question: "Which letter makes the sound of /a/ in 'apple'?",
              answers: ["a", "b", "c", "d"],
              correctAnswer: "a"
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Numbers",
    arabicTitle: "الأرقام",
    color: "bg-emerald-50 text-emerald-950 border-emerald-400",
    icon: "🔢",
    words: [
      { id: "w2-1", word: "Crocodile", arabic: "تمساح", image: "🐊", example: "There is a crocodile in the Nile.", soundText: "There is a crocodile in the Nile.", unit: 2 },
      { id: "w2-2", word: "Man", arabic: "رجل", image: "👨", example: "He is a tall Sudanese man.", soundText: "He is a tall Sudanese man.", unit: 2 },
      { id: "w2-3", word: "Neck", arabic: "رقبة", image: "🦒", example: "The neck of the camel is long.", soundText: "The neck of the camel is long.", unit: 2 },
      { id: "w2-4", word: "Nile", arabic: "نهر النيل", image: "🌊", example: "The beautiful River Nile.", soundText: "The beautiful River Nile.", unit: 2 },
      { id: "w2-5", word: "Pen", arabic: "قلم جاف", image: "🖊️", example: "I have a blue pen.", soundText: "I have a blue pen.", unit: 2 },
      { id: "w2-6", word: "Quiet", arabic: "هادئ", image: "🤫", example: "Please be quiet in class.", soundText: "Please be quiet in class.", unit: 2 },
      { id: "w2-7", word: "Rabbit", arabic: "أرنب", image: "🐰", example: "The rabbit has grey ears.", soundText: "The rabbit has grey ears.", unit: 2 },
      { id: "w2-8", word: "Mosque", arabic: "مسجد", image: "🕌", example: "The mosque has a beautiful dome.", soundText: "The mosque has a beautiful dome.", unit: 2 },
      { id: "w2-9", word: "Red", arabic: "أحمر", image: "🔴", example: "The apple is sweet and red.", soundText: "The apple is sweet and red.", unit: 2 },
      { id: "w2-10", word: "Sun", arabic: "شمس", image: "☀️", example: "The sun is hot today.", soundText: "The sun is hot today.", unit: 2 },
      { id: "w2-11", word: "Ten", arabic: "عشرة", image: "🔟", example: "There are ten cats.", soundText: "There are ten cats.", unit: 2 },
      { id: "w2-12", word: "Up", arabic: "لأعلى", image: "⬆️", example: "Look up at the monkeys.", soundText: "Look up at the monkeys.", unit: 2 },
      { id: "w2-13", word: "Van", arabic: "شاحنة", image: "🚐", example: "The school van is here.", soundText: "The school van is here.", unit: 2 },
      { id: "w2-14", word: "Window", arabic: "نافذة", image: "🖼️", example: "Look out of the classroom window.", soundText: "Look out of the classroom window.", unit: 2 },
      { id: "w2-15", word: "Box", arabic: "صندوق", image: "📦", example: "The books are in the box.", soundText: "The books are in the box.", unit: 2 },
      { id: "w2-16", word: "Wall", arabic: "جدار", image: "🧱", example: "The map is on the wall.", soundText: "The map is on the wall.", unit: 2 },
      { id: "w2-17", word: "Yellow", arabic: "أصفر", image: "🟡", example: "My t-shirt is bright yellow.", soundText: "My t-shirt is bright yellow.", unit: 2 },
      { id: "w2-18", word: "Zero", arabic: "صفر", image: "0️⃣", example: "Zero is a small number.", soundText: "Zero is a small number.", unit: 2 },
      { id: "w2-19", word: "Zoo", arabic: "حديقة حيوان", image: "🦁", example: "We saw a lion at the zoo.", soundText: "We saw a lion at the zoo.", unit: 2 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Crocodile Chant",
        type: "song",
        content: {
          songText: "Crocodiles in the Nile:\n1 little, 2 little, 3 little crocodiles.\n4 little, 5 little, 6 little crocodiles.\n7 little, 8 little, 9 little crocodiles.\n10 crocodiles in the Nile.\n\n10 little, 9 little, 8 little crocodiles.\n7 little, 6 little, 5 little crocodiles.\n4 little, 3 little, 2 little crocodiles.\n1 crocodile in the Nile.\n\nWords: man, neck"
        }
      },
      {
        id: 2,
        title: "Lesson 2: How old are you?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "How old are you?", voice: "Kore" },
            { speaker: "Badr", text: "I'm 8.", voice: "Zephyr" }
          ],
          songText: "Numbers Count:\n1 2 3 4 5 6 7 8 9\n\nWords:\non, pen, off, lamp"
        }
      },
      {
        id: 3,
        title: "Lesson 3: How many frogs?",
        type: "vocab",
        content: {
          songText: "frogs count:\nHow many frogs are there? 3.\nNumbers Count:\n10 11 12\n\nWords:\nquiet, rabbit, mosque, red"
        }
      },
      {
        id: 4,
        title: "Lesson 4: Ten Cats",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "How many cats are there?", voice: "Kore" },
            { speaker: "Badr", text: "There are ten.", voice: "Zephyr" }
          ],
          songText: "Numbers Count:\n10 11 12 13 14 15 16 17 18 19 20\n\nWords:\nsix, ten, desk, rabbit"
        }
      },
      {
        id: 5,
        title: "Lesson 5: Little Ali is Lost",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ali", text: "Hello, hens!", voice: "Kore" },
            { speaker: "Hens", text: "Hello!", voice: "Zephyr" },
            { speaker: "Ali", text: "Hello, monkeys!", voice: "Kore" },
            { speaker: "Monkeys", text: "Hi, Ali!", voice: "Zephyr" },
            { speaker: "Ali", text: "I'm lost!", voice: "Kore" }
          ],
          songText: "A: This is Little Ali.\nB: This is Ali with 3 monkeys.\nC: This is Ali with 4 hens.\nD: This is Ali with 5 frogs.\nE: Ali is sad.\n\nWords:\nup, van, sun, seven"
        }
      },
      {
        id: 6,
        title: "Lesson 6: Ali Finds His Mum",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ali", text: "Where is my house, frogs?", voice: "Kore" },
            { speaker: "Frogs", text: "This way, Ali!", voice: "Zephyr" },
            { speaker: "Ali", text: "Where is my house, hens?", voice: "Kore" },
            { speaker: "Hens", text: "This way, Ali!", voice: "Zephyr" },
            { speaker: "Ali", text: "Where is my house, monkeys?", voice: "Kore" },
            { speaker: "Monkeys", text: "This way, Ali!", voice: "Zephyr" },
            { speaker: "Mum", text: "Hello, Ali!", voice: "Kore" },
            { speaker: "Ali", text: "Hello, mum!", voice: "Zephyr" }
          ],
          songText: "A: frogs\nB: This is Ali with the hens\nC: This is Ali with the monkeys\nD: This is Ali with his mum\n\nWords:\nwindow, box, wall, six"
        }
      },
      {
        id: 7,
        title: "Lesson 7: What's the time?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "What's the time?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's 9 o'clock.", voice: "Kore" }
          ],
          songText: "Ask and answer:\nA: 3 o'clock\nB: 7 o'clock\nC: 5 o'clock\nD: 11 o'clock\nE: 4 o'clock\nF: 10 o'clock\n\nWords:\nyellow, zero, you, zoo"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Phonics (m to z)",
        type: "phonics",
        content: {
          songText: "m is in man. n is in neck.\no is in on. p is in pen.\nq is in quiet. r is in red.\ns is in sun. t is in ten.\nu is in up. v is in van.\nw is in window. x is in box.\ny is in yellow. z is in zoo.",
          letters: ["m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
          games: [
            {
              question: "Which letter makes the sound of /m/ in 'man'?",
              answers: ["m", "n", "o", "p"],
              correctAnswer: "m"
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Colours",
    arabicTitle: "الألوان",
    color: "bg-amber-50 text-amber-950 border-amber-400",
    icon: "🎨",
    words: [
      { id: "w3-1", word: "Blue", arabic: "أزرق", image: "🔵", example: "The sky is clear blue.", soundText: "The sky is clear blue.", unit: 3 },
      { id: "w3-2", word: "Green", arabic: "أخضر", image: "🟢", example: "The farm is beautiful and green.", soundText: "The farm is beautiful and green.", unit: 3 },
      { id: "w3-3", word: "White", arabic: "أبيض", image: "⚪", example: "The clouds are white.", soundText: "The clouds are white.", unit: 3 },
      { id: "w3-4", word: "Brown", arabic: "بني", image: "🟫", example: "My desk is made of brown wood.", soundText: "My desk is made of brown wood.", unit: 3 },
      { id: "w3-5", word: "Black", arabic: "أسود", image: "⚫", example: "I have black hair.", soundText: "I have black hair.", unit: 3 },
      { id: "w3-6", word: "Red", arabic: "أحمر", image: "🔴", example: "The traffic light is red.", soundText: "The traffic light is red.", unit: 3 },
      { id: "w3-7", word: "Stop", arabic: "قف", image: "🛑", example: "Red means stop on the road.", soundText: "Red means stop on the road.", unit: 3 },
      { id: "w3-8", word: "Wait", arabic: "انتظر", image: "⏳", example: "Yellow means wait for the light.", soundText: "Yellow means wait for the light.", unit: 3 },
      { id: "w3-9", word: "Go", arabic: "انطلق", image: "🟢", example: "Green means go ahead.", soundText: "Green means go ahead.", unit: 3 },
      { id: "w3-10", word: "Eye", arabic: "عين", image: "👁️", example: "Look at my eye.", soundText: "Look at my eye.", unit: 3 },
      { id: "w3-11", word: "Hair", arabic: "شعر", image: "💇", example: "My hair is clean and black.", soundText: "My hair is clean and black.", unit: 3 },
      { id: "w3-12", word: "T-shirt", arabic: "قميص", image: "👕", example: "I have a new red t-shirt.", soundText: "I have a new red t-shirt.", unit: 3 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Point to Colours",
        type: "song",
        content: {
          songText: "Colours Song:\nPoint to yellow. Point to red.\nPoint to black and point to your head.\nPoint to green. Point to blue.\nPoint to white and point to you."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Colour Bingo",
        type: "game",
        content: {
          songText: "Let's play Bingo:\nred, white, yellow, brown, green, blue, black.\nIt's red!"
        }
      },
      {
        id: 3,
        title: "Lesson 3: Traffic Lights",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Policeman", text: "The light is red.", voice: "Zephyr" },
            { speaker: "Policeman", text: "Red is for 'Stop'.", voice: "Zephyr" },
            { speaker: "Policeman", text: "The light is yellow.", voice: "Zephyr" },
            { speaker: "Policeman", text: "Yellow is for 'Wait'.", voice: "Zephyr" },
            { speaker: "Policeman", text: "The light is green.", voice: "Zephyr" },
            { speaker: "Policeman", text: "Green is for 'Go'.", voice: "Zephyr" },
            { speaker: "Policeman", text: "Go! Go! Go!", voice: "Zephyr" }
          ],
          songText: "Draw, colour and say:\nThis light is..."
        }
      },
      {
        id: 4,
        title: "Lesson 4: What colour is it?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "What colour is it?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "How many letters are there?", voice: "Kore" },
            { speaker: "Badr", text: "There are 3.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "What are they?", voice: "Kore" },
            { speaker: "Badr", text: "r, e and d.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Is it red?", voice: "Kore" },
            { speaker: "Badr", text: "Yes!", voice: "Zephyr" }
          ],
          songText: "Play, ask and answer:\nred, white, brown, yellow, green, blue, black"
        }
      },
      {
        id: 5,
        title: "Lesson 5: Our Sudanese Flag",
        type: "vocab",
        content: {
          songText: "The Flag:\nThis is the Sudanese flag. It's our flag.\n\nQuestions:\nHow many colours are there? 4.\nWhat are they? Green, red, white and black.\n\nThere are 2 colours in this flag. They are..."
        }
      },
      {
        id: 6,
        title: "Lesson 6: Cathy's Picture",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "This is Cathy's picture.", voice: "Kore" },
            { speaker: "Badr", text: "It's a bag.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's blue.", voice: "Kore" }
          ],
          songText: "Pictures:\nBadr's picture, Ahmed's picture, Eddie's picture, Dalia's picture, Cathy's picture, Mrs Hind's picture."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Ali is Lost",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Amna", text: "Hello, I'm Amna. I'm Ali's mum.", voice: "Zephyr" },
            { speaker: "Officer", text: "Hello.", voice: "Kore" },
            { speaker: "Amna", text: "I'm sad. My son is lost.", voice: "Zephyr" },
            { speaker: "Officer", text: "How old is your son?", voice: "Kore" },
            { speaker: "Amna", text: "He's 5.", voice: "Zephyr" },
            { speaker: "Officer", text: "What's his name?", voice: "Kore" },
            { speaker: "Amna", text: "Ali.", voice: "Zephyr" },
            { speaker: "Officer", text: "What colour is his hair?", voice: "Kore" },
            { speaker: "Amna", text: "Black.", voice: "Zephyr" },
            { speaker: "Officer", text: "What colour are his eyes?", voice: "Kore" },
            { speaker: "Amna", text: "Brown.", voice: "Zephyr" }
          ],
          songText: "Look, ask and answer:\nWhat colour are her eyes? They are...\nWhat colour is his hair? It's..."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Finding Ali",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Officer", text: "What colour is Ali's t-shirt?", voice: "Kore" },
            { speaker: "Amna", text: "Red.", voice: "Zephyr" },
            { speaker: "Officer", text: "Red? This way, please.", voice: "Kore" },
            { speaker: "Officer", text: "Is this your son?", voice: "Kore" },
            { speaker: "Amna", text: "Yes!", voice: "Zephyr" },
            { speaker: "Amna", text: "Hello, Ali!", voice: "Zephyr" },
            { speaker: "Ali", text: "Hello, mum.", voice: "Kore" }
          ],
          songText: "Look, ask and answer:\nWhat colour is the...? It's...\nWhat colour are the...? They are..."
        }
      }
    ]
  }
];
