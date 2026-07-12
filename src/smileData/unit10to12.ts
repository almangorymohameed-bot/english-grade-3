import { UnitItem } from "../types";

export const units10to12: UnitItem[] = [
  {
    id: 10,
    title: "Food and Drink",
    arabicTitle: "الطعام والشراب",
    color: "bg-amber-50 text-amber-950 border-amber-400",
    icon: "🍎",
    words: [
      { id: "w10-1", word: "Melon", arabic: "بطيخ", image: "🍉", example: "There are some melons in the picture.", soundText: "There are some melons in the picture.", unit: 10 },
      { id: "w10-2", word: "Banana", arabic: "موز", image: "🍌", example: "I have got a yellow banana.", soundText: "I have got a yellow banana.", unit: 10 },
      { id: "w10-3", word: "Onion", arabic: "بصل", image: "🧅", example: "Onions are healthy vegetables.", soundText: "Onions are healthy vegetables.", unit: 10 },
      { id: "w10-4", word: "Carrot", arabic: "جزر", image: "🥕", example: "Carrots are sweet orange vegetables.", soundText: "Carrots are sweet orange vegetables.", unit: 10 },
      { id: "w10-5", word: "Peanuts", arabic: "فول سوداني", image: "🥜", example: "I like roasted peanuts.", soundText: "I like roasted peanuts.", unit: 10 },
      { id: "w10-6", word: "Tomatoes", arabic: "طماطم", image: "🍅", example: "Tomatoes are red and juicy.", soundText: "Tomatoes are red and juicy.", unit: 10 },
      { id: "w10-7", word: "Sugar", arabic: "سكر", image: "🧂", example: "There is some sugar and jam on the table.", soundText: "There is some sugar and jam on the table.", unit: 10 },
      { id: "w10-8", word: "Orange", arabic: "برتقال", image: "🍊", example: "Oranges are sweet fruits.", soundText: "Oranges are sweet fruits.", unit: 10 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: In the Picture",
        type: "vocab",
        content: {
          songText: "In the basket:\nThere are some lemons in the picture.\nThere are some melons in the picture.\nThere are some bananas in the picture.\nThere is a bottle of water."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Sugar and Jam",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "There is some sugar and jam in my basket.", voice: "Kore" },
            { speaker: "Dalia", text: "I have some dates and water.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 3,
        title: "Lesson 3: Is it an apple?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Is it an apple?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "No, it isn't. It's a tomato.", voice: "Kore" }
          ]
        }
      },
      {
        id: 4,
        title: "Lesson 4: Mix the Mangoes",
        type: "vocab",
        content: {
          songText: "Making Juice:\nMix the mangoes, sugar and water.\nDon't cut up the fruit.\nPut the juice in a glass."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Favourite Drink",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "What's your favourite drink?", voice: "Zephyr" },
            { speaker: "Ahmed", text: "My favourite drink is mango juice.", voice: "Kore" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Onions and Carrots",
        type: "vocab",
        content: {
          songText: "Vegetables:\nOnions and carrots are vegetables.\napple, milk, onion, melon, carrot, lemon."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Eat Breakfast",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Mum", text: "Come in and eat breakfast.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "Would you like juice or water? There are eggs for breakfast.", voice: "Kore" }
          ]
        }
      },
      {
        id: 8,
        title: "Lesson 8: Food Revision",
        type: "vocab",
        content: {
          songText: "Revision:\nBread isn't a vegetable.\nWhat is your favourite food? My favourite food is porridge."
        }
      }
    ]
  },
  {
    id: 11,
    title: "Our Environment",
    arabicTitle: "بيئتنا",
    color: "bg-sky-50 text-sky-950 border-sky-400",
    icon: "🌳",
    words: [
      { id: "w11-1", word: "Hospital", arabic: "مستشفى", image: "🏥", example: "Excuse me, where's the hospital?", soundText: "Excuse me, where's the hospital?", unit: 11 },
      { id: "w11-2", word: "Sweets", arabic: "حلويات", image: "🍬", example: "Can we buy sweets there?", soundText: "Can we buy sweets there?", unit: 11 },
      { id: "w11-3", word: "Park", arabic: "منتزه", image: "🌳", example: "There are trees in the park.", soundText: "There are trees in the park.", unit: 11 },
      { id: "w11-4", word: "Rubbish", arabic: "قمامة", image: "🗑️", example: "Don't drop rubbish on the floor.", soundText: "Don't drop rubbish on the floor.", unit: 11 },
      { id: "w11-5", word: "Tidy", arabic: "مرتب", image: "🧹", example: "Keep the room tidy.", soundText: "Keep the room tidy.", unit: 11 },
      { id: "w11-6", word: "Flowers", arabic: "زهور", image: "🌸", example: "Please don't pick the flowers.", soundText: "Please don't pick the flowers.", unit: 11 },
      { id: "w11-7", word: "Clean", arabic: "نظيف", image: "🧼", example: "The air is clean.", soundText: "The air is clean.", unit: 11 },
      { id: "w11-8", word: "Happy", arabic: "سعيد", image: "😊", example: "This tree is happy.", soundText: "This tree is happy.", unit: 11 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Where is the hospital?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Eddie", text: "Excuse me, where's the hospital?", voice: "Kore" },
            { speaker: "Hamad", text: "Go past the market. It is next to the school.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 2,
        title: "Lesson 2: We can study",
        type: "vocab",
        content: {
          songText: "At school:\nWe can study at school.\nWe can read at the library.\nWe can see animals at the zoo."
        }
      },
      {
        id: 3,
        title: "Lesson 3: In the Park",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badr", text: "There are trees in the park.", voice: "Zephyr" },
            { speaker: "Ahmed", text: "We can play in the park. But we can't drop rubbish.", voice: "Kore" }
          ]
        }
      },
      {
        id: 4,
        title: "Lesson 4: Keep Tidy",
        type: "vocab",
        content: {
          songText: "Rules:\nKeep the room tidy.\nDon't pick the flowers.\nDon't drop rubbish here."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Rubbish on the floor",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Ahmed", text: "There's lots of rubbish on the floor.", voice: "Kore" },
            { speaker: "Badr", text: "Let's pick it up and keep our room tidy.", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 6,
        title: "Lesson 6: Don't hurt animals",
        type: "vocab",
        content: {
          songText: "Conservation:\nDon't hurt animals.\nWhat can you make from this plastic bottle? I can make a toy."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Clean Air",
        type: "song",
        content: {
          songText: "Happy trees:\nThis tree is happy. The air is clean.\nThere are lots of goats. There are no elephants."
        }
      },
      {
        id: 8,
        title: "Lesson 8: Environment Revision",
        type: "vocab",
        content: {
          songText: "Review rules:\nPlease don't pick the flowers.\nAli can see two little birds."
        }
      }
    ]
  },
  {
    id: 12,
    title: "Eid El Fitr",
    arabicTitle: "عيد الفطر",
    color: "bg-rose-50 text-rose-950 border-rose-400",
    icon: "🌙",
    words: [
      { id: "w12-1", word: "Shorts", arabic: "سروال قصير", image: "🩳", example: "There are shorts on the clothes line.", soundText: "There are shorts on the clothes line.", unit: 12 },
      { id: "w12-2", word: "Cap", arabic: "قبعة رأس", image: "🧢", example: "Whose cap is this? It's Eddie's cap.", soundText: "Whose cap is this? It's Eddie's cap.", unit: 12 },
      { id: "w12-3", word: "Dress", arabic: "فستان", image: "👗", example: "She has got a new dress.", soundText: "She has got a new dress.", unit: 12 },
      { id: "w12-4", word: "Skirt", arabic: "تنورة", image: "👗", example: "She is wearing a beautiful skirt.", soundText: "She is wearing a beautiful skirt.", unit: 12 },
      { id: "w12-5", word: "Shirt", arabic: "قميص", image: "👕", example: "This is a clean shirt.", soundText: "This is a clean shirt.", unit: 12 },
      { id: "w12-6", word: "Trousers", arabic: "بنطال", image: "👖", example: "Put on your new trousers.", soundText: "Put on your new trousers.", unit: 12 },
      { id: "w12-7", word: "Grandmother", arabic: "جدة", image: "👵🏾", example: "Eid Mubarak, Grandmother!", soundText: "Eid Mubarak, Grandmother!", unit: 12 },
      { id: "w12-8", word: "Grandfather", arabic: "جد", image: "👴🏾", example: "Eid Mubarak, Grandfather!", soundText: "Eid Mubarak, Grandfather!", unit: 12 }
    ],
    lessons: [
      {
        id: 1,
        title: "Lesson 1: Eid Clothes",
        type: "song",
        content: {
          songText: "Clothes line:\nThere are shorts on the clothes line.\nAhmed, Fatma, Eddie, Hassan are wearing new Eid clothes."
        }
      },
      {
        id: 2,
        title: "Lesson 2: Whose bag is this?",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Cathy", text: "Whose bag is this?", voice: "Zephyr" },
            { speaker: "Fatma", text: "It's Fatma's bag.", voice: "Kore" }
          ]
        }
      },
      {
        id: 3,
        title: "Lesson 3: New Dress",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Fatma", text: "She has got a new dress.", voice: "Kore" },
            { speaker: "Cathy", text: "What are your favourite Eid clothes?", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 4,
        title: "Lesson 4: Animals at the Zoo",
        type: "vocab",
        content: {
          songText: "At the zoo:\nThere are lots of animals at the zoo.\nmonkey, hippo, crocodile, camel, parrot, lion."
        }
      },
      {
        id: 5,
        title: "Lesson 5: Go past the shop",
        type: "vocab",
        content: {
          songText: "Directions:\nGo past the shop. Don't stop.\nLook out of the kitchen window.\nDon't walk past the new market."
        }
      },
      {
        id: 6,
        title: "Lesson 6: Bake an Eid Cake",
        type: "vocab",
        content: {
          songText: "Eid Cake Recipe:\nAdd eggs to the flour and oil.\nMix the flour, salt and oil.\nCook the cake for an hour."
        }
      },
      {
        id: 7,
        title: "Lesson 7: Eid Morning",
        type: "conversation",
        content: {
          dialogue: [
            { speaker: "Badria", text: "It's Eid El Fitr morning.", voice: "Zephyr" },
            { speaker: "Badria", text: "How many brothers and sisters have you got?", voice: "Zephyr" }
          ]
        }
      },
      {
        id: 8,
        title: "Lesson 8: Friends and Family",
        type: "vocab",
        content: {
          songText: "Greeting:\nIt's good to see friends and family.\nI'd like coffee and cake, please. I don't want banana, thank you."
        }
      }
    ]
  }
];
