import { UnitItem } from "../types";

export const units4to6: UnitItem[] = [
  {
    id: 4,
    title: "About Me",
    arabicTitle: "عني / عن نفسي",
    color: "bg-purple-50 text-purple-950 border-purple-400",
    icon: "👤",
    words: [
      { id: "w4-1", word: "Lemon", arabic: "ليمون", image: "🍋", example: "My lemon is yellow.", soundText: "My lemon is yellow.", unit: 4 },
      { id: "w4-2", word: "Melon", arabic: "بطيخ", image: "🍉", example: "My melon is green.", soundText: "My melon is green.", unit: 4 },
      { id: "w4-3", word: "Book", arabic: "كتاب", image: "📖", example: "This is my English school book.", soundText: "This is my English school book.", unit: 4 },
      { id: "w4-4", word: "Boy", arabic: "ولد", image: "👦", example: "Who is that boy next to Ahmed?", soundText: "Who is that boy next to Ahmed?", unit: 4 },
      { id: "w4-5", word: "Class", arabic: "صف دراسي", image: "🏫", example: "We are in class three.", soundText: "We are in class three.", unit: 4 },
      { id: "w4-6", word: "Girl", arabic: "بنت", image: "👧", example: "She is a young Sudanese girl.", soundText: "She is a young Sudanese girl.", unit: 4 },
      { id: "w4-7", word: "Arm", arabic: "ذراع", image: "💪", example: "I have got two arms.", soundText: "I have got two arms.", unit: 4 },
      { id: "w4-8", word: "Body", arabic: "جسد", image: "🧍", example: "I have got a healthy body.", soundText: "I have got a healthy body.", unit: 4 },
      { id: "w4-9", word: "Feet", arabic: "أقدام", image: "🦶", example: "I stand on my two feet.", soundText: "I stand on my two feet.", unit: 4 },
      { id: "w4-10", word: "Hand", arabic: "يد", image: "✋", example: "Raise your right hand.", soundText: "Raise your right hand.", unit: 4 },
      { id: "w4-11", word: "Mouth", arabic: "فم", image: "👄", example: "Open your mouth.", soundText: "Open your mouth.", unit: 4 },
      { id: "w4-12", word: "Nose", arabic: "أنف", image: "👃", example: "The elephant has got a long nose.", soundText: "The elephant has got a long nose.", unit: 4 },
      { id: "w4-13", word: "Toes", arabic: "أصابع القدم", image: "🦶", example: "I have got ten toes.", soundText: "I have got ten toes.", unit: 4 },
      { id: "w4-14", word: "Ears", arabic: "آذان", image: "👂", example: "I hear with my two ears.", soundText: "I hear with my two ears.", unit: 4 },
      { id: "w4-15", word: "Eyes", arabic: "عيون", image: "👁️", example: "I see with my two eyes.", soundText: "I see with my two eyes.", unit: 4 },
      { id: "w4-16", word: "Head", arabic: "رأس", image: "👤", example: "My head is round.", soundText: "My head is round.", unit: 4 },
      { id: "w4-17", word: "Neck", arabic: "رقبة", image: "🦒", example: "The neck connects my head.", soundText: "The neck connects my head.", unit: 4 },
      { id: "w4-18", word: "Legs", arabic: "أرجل", image: "🦵", example: "I have got two strong legs.", soundText: "I have got two strong legs.", unit: 4 },
      { id: "w4-19", word: "Animal", arabic: "حيوان", image: "🦁", example: "The lion is a wild animal.", soundText: "The lion is a wild animal.", unit: 4 },
      { id: "w4-20", word: "Hedgehog", arabic: "قنفذ", image: "🦔", example: "The hedgehog has small spines.", soundText: "The hedgehog has small spines.", unit: 4 },
      { id: "w4-21", word: "Spine", arabic: "شوك القنفذ", image: "📍", example: "The spine of a hedgehog is sharp.", soundText: "The spine of a hedgehog is sharp.", unit: 4 },
      { id: "w4-22", word: "Hungry", arabic: "جائع", image: "🤤", example: "I am hungry and need food.", soundText: "I am hungry and need food.", unit: 4 },
      { id: "w4-23", word: "Photo", arabic: "صورة", image: "📸", example: "Look at my photos of Sudan.", soundText: "Look at my photos of Sudan.", unit: 4 },
      { id: "w4-24", word: "Pyramid", arabic: "هرم", image: "🔺", example: "This is a historic pyramid in Shendi.", soundText: "This is a historic pyramid in Shendi.", unit: 4 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Lemons and Melons",
        type: "vocab",
        content: {
          songText: "Fruits:\nI've got a lemon. My lemon is yellow.\nI've got a melon. My melon is green.\n\nFatma's got a lemon! Dalia's got a melon!\nA yellow lemon. A green melon.\nBadr's got a green apple."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Who is that boy?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Badr, who's that boy with Ahmed?", voice: "Zephyr" },
            { speaker: "Cathy", text: "He's got an apple and a book.", voice: "Kore" },
            { speaker: "Badr", text: "His name is Hamad.", voice: "Zephyr" },
            { speaker: "Dalia", text: "Dalia, who's that girl with Fatma?", voice: "Kore" },
            { speaker: "Cathy", text: "She's got a green bag and a blue book.", voice: "Zephyr" },
            { speaker: "Dalia", text: "Her name is Hiba.", voice: "Kore" }
          ],
          songText: "Who's that boy?\nHe's got a...\nHis name is...\nHe's in...\n\nTom: Class 3\nLisa: Class 5"
        }
      },
      {
        id: 3,
        title: "Lesson 3: My Body",
        type: "song",
        content: {
          songText: "Body Parts Song:\nI've got a body, a neck and a head.\nI've got two arms, I've got two legs.\nI've got feet, hands, a mouth, and a nose.\nI've got ears, eyes, and I've got ten toes."
        }
      },
      {
        id: 4,
        title: "Lesson 4: How old are you?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Hamad", text: "Hello, Hamad. I'm Eddie.", voice: "Kore" },
            { speaker: "Eddie", text: "Hello, Eddie. Are you Sudanese?", voice: "Zephyr" },
            { speaker: "Hamad", text: "Yes, I am.", voice: "Kore" },
            { speaker: "Hamad", text: "How old are you?", voice: "Kore" },
            { speaker: "Eddie", text: "I'm 8.", voice: "Zephyr" },
            { speaker: "Hamad", text: "What class are you in, Eddie?", voice: "Kore" },
            { speaker: "Eddie", text: "Class 3.", voice: "Zephyr" }
          ],
          songText: "Look, ask and answer:\nHiba: 9, Sudanese, Class 4\nTom: 8, English, Class 3"
        }
      },
      {
        id: 5,
        title: "Lesson 5: Animal Features",
        type: "vocab",
        content: {
          songText: "Match and Say:\nA: This animal has got a long neck.\nB: They've got big eyes.\nC: This animal has got long hair.\nD: They've got big teeth.\n\nAnimals: Giraffe, Owl, Lion, Crocodile"
        }
      },
      {
        id: 6,
        title: "Lesson 6: Gonfooth the Hedgehog",
        type: "song",
        content: {
          songText: "Story of Gonfooth:\nA: I'm Gonfooth. Hello, Mrs Hen.\nB: Hello, Mrs Hen. Hello, Gonfooth. You've got a big white body. Yes, I have.\nC: Hello, Mrs Rabbit. Hello, Gonfooth. You've got long grey ears. Yes, I have.\nD: Hello, Mr Monkey. Hello, Gonfooth. You've got big hands and big feet. Yes, I have.\nE: Hello, Mr Fox. Hello, Gonfooth. I've got big teeth. Yes, you have.\nF: And I'm hungry. Yes, Mr Fox. I've got long spines. Yes, you have. Grr."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Photos of Sudan",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Look at my photos of Sudan, Eddie.", voice: "Zephyr" },
            { speaker: "Eddie", text: "OK, Cathy.", voice: "Kore" },
            { speaker: "Cathy", text: "This is the River Nile.", voice: "Zephyr" },
            { speaker: "Eddie", text: "Yes. What's that? A school?", voice: "Kore" },
            { speaker: "Cathy", text: "No, it's the museum.", voice: "Zephyr" },
            { speaker: "Eddie", text: "Where's that?", voice: "Kore" },
            { speaker: "Cathy", text: "It's in Shendi. It's a market.", voice: "Zephyr" },
            { speaker: "Eddie", text: "What's that, Cathy? A pyramid?", voice: "Kore" },
            { speaker: "Cathy", text: "Yes. Look! There are three pyramids.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 8,
        title: "Lesson 8: Have you got a picture?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Have you got the picture of Mr Gamar?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No, I haven't.", voice: "Kore" },
            { speaker: "Badr", text: "Have you got the picture of Badr?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, I have!", voice: "Kore" }
          ],
          songText: "Names with A/a: Adam, Ahmed, Ali, Badr\nNames with E/e: Eddie, Helmi"
        }
      }
    ]
  },
  {
    id: 5,
    title: "My School",
    arabicTitle: "مدرستي",
    color: "bg-blue-50 text-blue-950 border-blue-400",
    icon: "🏫",
    words: [
      { id: "w5-1", word: "Board", arabic: "سبورة", image: "📋", example: "Look at the school board.", soundText: "Look at the school board.", unit: 5 },
      { id: "w5-2", word: "Chair", arabic: "كرسي", image: "🪑", example: "Sit down on your chair.", soundText: "Sit down on your chair.", unit: 5 },
      { id: "w5-3", word: "Floor", arabic: "أرضية", image: "🧱", example: "The pencil fell on the floor.", soundText: "The pencil fell on the floor.", unit: 5 },
      { id: "w5-4", word: "Teacher", arabic: "معلم", image: "👩‍🏫", example: "Mrs Hind is our kind teacher.", soundText: "Mrs Hind is our kind teacher.", unit: 5 },
      { id: "w5-5", word: "Door", arabic: "باب", image: "🚪", example: "Open the classroom door.", soundText: "Open the classroom door.", unit: 5 },
      { id: "w5-6", word: "Bin", arabic: "سلة مهملات", image: "🗑️", example: "Put the paper in the bin.", soundText: "Put the paper in the bin.", unit: 5 },
      { id: "w5-7", word: "Fan", arabic: "مروحة", image: "💨", example: "Turn on the school fan.", soundText: "Turn on the school fan.", unit: 5 },
      { id: "w5-8", word: "Book", arabic: "كتاب", image: "📚", example: "Read your English book.", soundText: "Read your English book.", unit: 5 },
      { id: "w5-9", word: "Desk", arabic: "مكتب", image: "✍️", example: "My book is on the desk.", soundText: "My book is on the desk.", unit: 5 },
      { id: "w5-10", word: "Bag", arabic: "حقيبة", image: "🎒", example: "I have got a green bag.", soundText: "I have got a green bag.", unit: 5 },
      { id: "w5-11", word: "Toy", arabic: "لعبة", image: "🧸", example: "This is a small hard toy.", soundText: "This is a small hard toy.", unit: 5 },
      { id: "w5-12", word: "Pencil", arabic: "قلم رصاص", image: "✏️", example: "The red pencil is next to the book.", soundText: "The red pencil is next to the book.", unit: 5 },
      { id: "w5-13", word: "Pencil Case", arabic: "مقلمة", image: "👝", example: "My pencils are in the pencil case.", soundText: "My pencils are in the pencil case.", unit: 5 },
      { id: "w5-14", word: "Ruler", arabic: "مسطرة", image: "📏", example: "The ruler is in the bag.", soundText: "The ruler is in the bag.", unit: 5 },
      { id: "w5-15", word: "Classroom", arabic: "فصل دراسي", image: "🏫", example: "Our classroom is bright.", soundText: "Our classroom is bright.", unit: 5 },
      { id: "w5-16", word: "Library", arabic: "مكتبة", image: "📚", example: "We read quietly in the library.", soundText: "We read quietly in the library.", unit: 5 },
      { id: "w5-17", word: "Tail", arabic: "ذيل", image: "🐒", example: "The monkey has got a long tail.", soundText: "The monkey has got a long tail.", unit: 5 },
      { id: "w5-18", word: "Table", arabic: "طاولة", image: "🪵", example: "The book is under the table.", soundText: "The book is under the table.", unit: 5 },
      { id: "w5-19", word: "Well", arabic: "بئر", image: "🕳️", example: "This is an old water well.", soundText: "This is an old water well.", unit: 5 },
      { id: "w5-20", word: "Market", arabic: "سوق", image: "🛍️", example: "Al Fasher has got a big market.", soundText: "Al Fasher has got a big market.", unit: 5 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Point to the Class",
        type: "song",
        content: {
          songText: "Classroom Chant:\nPoint to the window. Point to the door.\nPoint to the board and point to the floor.\nPoint to the teacher. Point to the man.\nPoint to the bin and point to the fan.\nPoint to the book, the desk and the chair.\nPoint to the bag and point to your hair."
        }
      },
      {
        id: 2,
        title: "Lesson 2: What's in the bag?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "What's this in the bag?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "It's small and hard.", voice: "Kore" },
            { speaker: "Badr", text: "Is it a toy?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No, it isn't.", voice: "Kore" },
            { speaker: "Badr", text: "Is it a pen?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, it is. Look!", voice: "Kore" }
          ],
          songText: "What's this in English?\nIt's a..."
        }
      },
      {
        id: 3,
        title: "Lesson 3: Photos from School",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Look at this photo from school, Eddie!", voice: "Zephyr" },
            { speaker: "Eddie", text: "Is that your teacher next to the board?", voice: "Kore" },
            { speaker: "Cathy", text: "Yes, that's Mrs Hind.", voice: "Zephyr" },
            { speaker: "Eddie", text: "And who's next to Mrs Hind?", voice: "Kore" },
            { speaker: "Cathy", text: "That's Marwa, and the girl next to the door is Dalia.", voice: "Zephyr" }
          ],
          songText: "Where is the red pencil?\nIt's next to the book."
        }
      },
      {
        id: 4,
        title: "Lesson 4: The Monkey on the Chair",
        type: "vocab",
        content: {
          songText: "Prepositions and Descriptions:\nThe monkey's on the chair.\n\nThis cat is small.\nThat cat is small.\nLook at them! They are big!"
        }
      },
      {
        id: 5,
        title: "Lesson 5: Where's my toy?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Reem", text: "Where's my toy?", voice: "Zephyr" },
            { speaker: "Mum", text: "My toy isn't here.", voice: "Kore" },
            { speaker: "Reem", text: "It isn't in the classroom.", voice: "Zephyr" },
            { speaker: "Mum", text: "It isn't in the library.", voice: "Kore" },
            { speaker: "Reem", text: "It isn't under my bed.", voice: "Zephyr" },
            { speaker: "Mum", text: "Your toy is here! It's in your bag.", voice: "Kore" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Sukkar's Tail",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Sukkar", text: "Where's my tail?", voice: "Kore" },
            { speaker: "Monkey2", text: "Is it under your chair?", voice: "Zephyr" },
            { speaker: "Sukkar", text: "No, it isn't.", voice: "Kore" },
            { speaker: "Monkey2", text: "Is it in your desk?", voice: "Zephyr" },
            { speaker: "Sukkar", text: "No, it isn't.", voice: "Kore" },
            { speaker: "Monkey2", text: "Look, Sukkar. Your tail is there.", voice: "Zephyr" },
            { speaker: "Sukkar", text: "Hello!", voice: "Kore" }
          ],
          songText: "Read, ask and answer:\nHow old are you? What's your name? Where are you from?"
        }
      },
      {
        id: 7,
        title: "Lesson 7: Where's the ruler?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "Where's the ruler? Is it here?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No!", voice: "Kore" },
            { speaker: "Badr", text: "Is it under the table?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No!", voice: "Kore" },
            { speaker: "Badr", text: "Is it behind the door?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No!", voice: "Kore" },
            { speaker: "Badr", text: "Is it in the bag?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes! Yes, it's here.", voice: "Kore" }
          ],
          songText: "Phonics focus:\nThree. Thanks. th. Look at the teeth!"
        }
      },
      {
        id: 8,
        title: "Lesson 8: Hello, I'm Hassan",
        type: "vocab",
        content: {
          songText: "Speech:\nHello, I'm Hassan. I'm from Al Fasher in Sudan and I'm nine years old.\nThis is a photo of the museum in Al Fasher.\nThis is a photo of the Sultan's old table and chair.\nThis is a well in Al Fasher. Al Fasher has got a market. This is a photo of it."
        }
      }
    ]
  },
  {
    id: 6,
    title: "Home",
    arabicTitle: "المنزل",
    color: "bg-fuchsia-50 text-fuchsia-950 border-fuchsia-400",
    icon: "🏠",
    words: [
      { id: "w6-1", word: "Kitchen", arabic: "مطبخ", image: "🍳", example: "Mother is in the kitchen.", soundText: "Mother is in the kitchen.", unit: 6 },
      { id: "w6-2", word: "Living room", arabic: "غرفة معيشة", image: "🛋️", example: "We sit in the living room.", soundText: "We sit in the living room.", unit: 6 },
      { id: "w6-3", word: "Bathroom", arabic: "حمام", image: "🚿", example: "Wash your hands in the bathroom.", soundText: "Wash your hands in the bathroom.", unit: 6 },
      { id: "w6-4", word: "Bedroom", arabic: "غرفة نوم", image: "🛏️", example: "I sleep in my bedroom.", soundText: "I sleep in my bedroom.", unit: 6 },
      { id: "w6-5", word: "House", arabic: "منزل", image: "🏠", example: "I live in a small house.", soundText: "I live in a small house.", unit: 6 },
      { id: "w6-6", word: "Flat", arabic: "شقة", image: "🏢", example: "They live in a beautiful flat.", soundText: "They live in a beautiful flat.", unit: 6 },
      { id: "w6-7", word: "School", arabic: "مدرسة", image: "🏫", example: "We go to school every morning.", soundText: "We go to school every morning.", unit: 6 },
      { id: "w6-8", word: "Mosque", arabic: "مسجد", image: "🕌", example: "People pray in the mosque.", soundText: "People pray in the mosque.", unit: 6 },
      { id: "w6-9", word: "Hospital", arabic: "مستشفى", image: "🏥", example: "Go to the hospital when sick.", soundText: "Go to the hospital when sick.", unit: 6 },
      { id: "w6-10", word: "Market", arabic: "سوق", image: "🛍️", example: "We buy food at the market.", soundText: "We buy food at the market.", unit: 6 },
      { id: "w6-11", word: "Museum", arabic: "متحف", image: "🏛️", example: "The museum is in Khartoum.", soundText: "The museum is in Khartoum.", unit: 6 },
      { id: "w6-12", word: "Park", arabic: "منتزه", image: "🌳", example: "We play in the green park.", soundText: "We play in the green park.", unit: 6 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: In the Kitchen",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Mum", text: "Put the fridge in the kitchen.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Okay, Mum. Put it in the kitchen.", voice: "Kore" }
          ]
        }
      },
      {
        id: 2,
        title: "Lesson 2: Town Places",
        type: "vocab",
        content: {
          songText: "Places in town:\nWhere are we going?\nTo the school, to the mosque, to the park!\nHospital, market, museum too.\nSo many places to show to you!"
        }
      },
      {
        id: 3,
        title: "Lesson 3: Where do you live?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "Where do you live, Hamad?", voice: "Kore" },
            { speaker: "Hamad", text: "I live in a house. Do you live in a house?", voice: "Zephyr" },
            { speaker: "Eddie", text: "No, I live in a flat.", voice: "Kore" }
          ]
        }
      },
      {
        id: 4,
        title: "Lesson 4: Look at the Tree",
        type: "vocab",
        content: {
          songText: "In the park:\nThere is a tree in the park.\nThere is a bird in the tree.\nThere is a mouse under the tree!"
        }
      },
      {
        id: 5,
        title: "Lesson 5: Animals and Homes",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "They live in a tree, Ahmed.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Yes, the birds live in a tree. But the animals haven't got a home.", voice: "Kore" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Frogs in the Well",
        type: "vocab",
        content: {
          songText: "Reading:\nThis is a lemon tree.\nThe man is cold.\nThe frogs live in a well.\nPlant the seeds and grow a new tree."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Near my Home",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Dalia", text: "My name is Dalia.", voice: "Kore" },
            { speaker: "Dalia", text: "I live in a flat.", voice: "Kore" },
            { speaker: "Dalia", text: "My home is near a shop and a school.", voice: "Kore" }
          ]
        }
      },
      {
        id: 8,
        title: "Lesson 8: Home Revision",
        type: "vocab",
        content: {
          songText: "Revision of places:\nfield, flat, house, river, sea, zoo.\nTrace and join p:\npen, open, play!"
        }
      }
    ]
  }
];
