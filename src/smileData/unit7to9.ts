import { UnitItem } from "../types";

export const units7to9: UnitItem[] = [
  {
    id: 7,
    title: "My Family",
    arabicTitle: "عائلتي",
    color: "bg-teal-50 text-teal-950 border-teal-400",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { id: "w7-1", word: "Mother", arabic: "أم", image: "👩🏾‍💼", example: "This is my mother.", soundText: "This is my mother.", unit: 7 },
      { id: "w7-2", word: "Father", arabic: "أب", image: "👨🏾‍💼", example: "This is my father.", soundText: "This is my father.", unit: 7 },
      { id: "w7-3", word: "Brother", arabic: "أخ", image: "👦🏾", example: "He is my brother.", soundText: "He is my brother.", unit: 7 },
      { id: "w7-4", word: "Sister", arabic: "أخت", image: "👧🏾", example: "She is my sister.", soundText: "She is my sister.", unit: 7 },
      { id: "w7-5", word: "Grandmother", arabic: "جدة", image: "👵🏾", example: "My grandmother is kind.", soundText: "My grandmother is kind.", unit: 7 },
      { id: "w7-6", word: "Grandfather", arabic: "جد", image: "👴🏾", example: "My grandfather is tall.", soundText: "My grandfather is tall.", unit: 7 },
      { id: "w7-7", word: "Baby", arabic: "طفل رضيع", image: "👶🏾", example: "This is my baby sister.", soundText: "This is my baby sister.", unit: 7 },
      { id: "w7-8", word: "Twelve", arabic: "اثنا عشر", image: "1️⃣2️⃣", example: "I have twelve windows.", soundText: "I have twelve windows.", unit: 7 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: This is my mother",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "This is my mother Ibrahim.", voice: "Kore" },
            { speaker: "Badr", text: "Nice to meet her.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 2,
        title: "Lesson 2: Meet my Brother",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "My mother's name is Fatma. My father's name is Ibrahim.", voice: "Kore" },
            { speaker: "Badr", text: "My brother's name is Khalid.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 3,
        title: "Lesson 3: Family Portrait",
        type: "vocab",
        content: {
          songText: "Look at the family portrait:\ngrandmother, father, grandfather, baby, brother, sister, mother."
        }
      },
      {
        id: 4,
        title: "Lesson 4: How many brothers?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "How many brothers have you got?", voice: "Kore" },
            { speaker: "Hamad", text: "I have got two brothers.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 5,
        title: "Lesson 5: Stand next to your brother",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Teacher", text: "Stand next to your brother.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, Teacher. I am between father and mother.", voice: "Kore" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Activity Verbs",
        type: "vocab",
        content: {
          songText: "Verbs:\neat, sleep, stop, walk, stand, wake up."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Twelve Windows",
        type: "song",
        content: {
          songText: "Clock and times:\nI wake up at six o'clock.\nI eat breakfast at seven o'clock.\nI go to school at eight o'clock."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Family Revision",
        type: "vocab",
        content: {
          songText: "Draw your family in the rooms:\nliving room, kitchen, bedroom.\nMy father is in the living room.\nMy mother is in the kitchen."
        }
      }
    ]
  },
  {
    id: 8,
    title: "Toys and Games",
    arabicTitle: "الألعاب والدمى",
    color: "bg-rose-50 text-rose-950 border-rose-400",
    icon: "🧸",
    words: [
      { id: "w8-1", word: "Game", arabic: "لعبة", image: "🎮", example: "Let's play a game.", soundText: "Let's play a game.", unit: 8 },
      { id: "w8-2", word: "Toy", arabic: "دمية", image: "🧸", example: "I have a new yellow toy.", soundText: "I have a new yellow toy.", unit: 8 },
      { id: "w8-3", word: "Skip", arabic: "يقفز الحبل", image: "🦘", example: "I can skip very high.", soundText: "I can skip very high.", unit: 8 },
      { id: "w8-4", word: "Hop", arabic: "يحجل / يقفز على رجل واحدة", image: "🏃", example: "I can hop on one foot.", soundText: "I can hop on one foot.", unit: 8 },
      { id: "w8-5", word: "Teeth", arabic: "أسنان", image: "🦷", example: "Brush your teeth.", soundText: "Brush your teeth.", unit: 8 },
      { id: "w8-6", word: "Seeds", arabic: "بذور", image: "🫘", example: "Plant the seeds.", soundText: "Plant the seeds.", unit: 8 },
      { id: "w8-7", word: "Sand", arabic: "رمل", image: "🏜️", example: "I like the sand at the beach.", soundText: "I like the sand at the beach.", unit: 8 },
      { id: "w8-8", word: "Wheels", arabic: "عجلات", image: "🛞", example: "The wheels go round and round.", soundText: "The wheels go round and round.", unit: 8 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Let's play!",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "This is my yellow toy.", voice: "Kore" },
            { speaker: "Badr", text: "Nice! Let's play a game.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 2,
        title: "Lesson 2: Simple Commands",
        type: "vocab",
        content: {
          songText: "Instructions:\nPlay a game.\nStand up.\nCome here.\nGo to the desk.\nSit down."
        }
      },
      {
        id: 3,
        title: "Lesson 3: I can skip!",
        type: "song",
        content: {
          songText: "Action song:\nI can skip and I can hop.\nHow many feet can you see?\nI can see two feet.\nHow many keys can you see?\nI can see three keys."
        }
      },
      {
        id: 4,
        title: "Lesson 4: Number Math",
        type: "vocab",
        content: {
          songText: "Numbers addition:\n2 and 7 and 6 make 15.\nWords:\nthree, seeds, teeth, tree, sixteen, street."
        }
      },
      {
        id: 5,
        title: "Lesson 5: This isn't our tree",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "This isn't our tree. It's tall.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "This is Bulbul and Billi's nest.", voice: "Kore" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Sand and Sea",
        type: "vocab",
        content: {
          songText: "Chant:\nI like the sand and I like the sea.\nIs it a beach? No, it's a river."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Wheels Go Round",
        type: "song",
        content: {
          songText: "The wheels go round and round.\nIt's got 2 wheels (bicycle).\nIt's got 4 wheels (car).\nIt hasn't got wheels (camel)."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Toys Revision",
        type: "vocab",
        content: {
          songText: "Revision commands:\nCut it, plant it and water it.\nDon't go to the classroom."
        }
      }
    ]
  },
  {
    id: 9,
    title: "Animals",
    arabicTitle: "الحيوانات",
    color: "bg-emerald-50 text-emerald-950 border-emerald-400",
    icon: "🦁",
    words: [
      { id: "w9-1", word: "Crocodile", arabic: "تمساح", image: "🐊", example: "Nile crocodiles live in the river.", soundText: "Nile crocodiles live in the river.", unit: 9 },
      { id: "w9-2", word: "Hippo", arabic: "فرس النهر", image: "🦛", example: "The hippo is very big.", soundText: "The hippo is very big.", unit: 9 },
      { id: "w9-3", word: "Elephant", arabic: "فيل", image: "🐘", example: "The elephant has got a long nose.", soundText: "The elephant has got a long nose.", unit: 9 },
      { id: "w9-4", word: "Camel", arabic: "جمل", image: "🐪", example: "Camels have got long legs.", soundText: "Camels have got long legs.", unit: 9 },
      { id: "w9-5", word: "Snake", arabic: "ثعبان", image: "🐍", example: "The snake is long.", soundText: "The snake is long.", unit: 9 },
      { id: "w9-6", word: "Lion", arabic: "أسد", image: "🦁", example: "Lions can walk but they can't fly.", soundText: "Lions can walk but they can't fly.", unit: 9 },
      { id: "w9-7", word: "Parrot", arabic: "ببغاء", image: "🦜", example: "The parrot is colourful.", soundText: "The parrot is colourful.", unit: 9 },
      { id: "w9-8", word: "Cow", arabic: "بقرة", image: "🐄", example: "The cow eats grass.", soundText: "The cow eats grass.", unit: 9 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Three Little Cats",
        type: "song",
        content: {
          songText: "Three little cats are here to play.\nCats, rabbits, goats, frogs, cows, beetles."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Nile Crocodiles",
        type: "vocab",
        content: {
          songText: "Crocodile facts:\nWe are Nile crocodiles. We lay eggs.\nWe've got long tails and short legs.\nOur bodies are 5 metres long.\nOur teeth are big and sharp."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Mountains and Hills",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "There are mountains here.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Look at the animals! Hippo, camel, elephant, snake, crocodile.", voice: "Kore" }
          ]
        }
      },
      {
        id: 4,
        title: "Lesson 4: I can climb",
        type: "song",
        content: {
          songText: "Actions song:\nWe can climb and we can swing.\nI can swim in a river.\nI can fly in the air."
        }
      },
      {
        id: 5,
        title: "Lesson 5: What can hippos do?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "Lions can walk but they can't fly.", voice: "Kore" },
            { speaker: "Hamad", text: "Hippos can swim and run, but they can't climb trees.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Gapped Spellings",
        type: "vocab",
        content: {
          songText: "Spelling focus:\ncow, goat, bird, hippo, parrot, elephant."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Please be my friend",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Waheed", text: "I'm Waheed. Please be my friend.", voice: "Zephyr" },
            { speaker: "Badr", text: "Hello Waheed! I can play with you.", voice: "Kore" }
          ]
        }
      },
      {
        id: 8,
        title: "Lesson 8: Whales can swim",
        type: "vocab",
        content: {
          songText: "Review sentences:\nWhales can swim and sing.\nBirds can fly in the sky.\nLions like meat."
        }
      }
    ]
  }
];
