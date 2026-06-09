export type Card = {
  /** English prompt */
  en: string
  /** Target-language translation */
  target: string
  /** Optional romanization (used for Japanese) */
  romaji?: string
}

export type Deck = {
  id: string
  name: string
  /** Short helper text shown on the deck card */
  blurb: string
  cards: Card[]
}

export type Level = {
  id: "beginner" | "intermediate" | "advanced"
  name: string
  /** Short description of the level */
  blurb: string
  /** When true the whole level is not yet available (content coming soon) */
  comingSoon?: boolean
  decks: Deck[]
}

export type Language = {
  id: string
  name: string
  /** Endonym (name in the language itself) */
  nativeName: string
  /** Emoji-free short code shown in the corner badge */
  code: string
  /** Background + accent color tokens for the language tile */
  accent: string
  levels: Level[]
}

/** Minimum quiz score (percent) required to "finish" a deck and unlock the next. */
export const PASS_THRESHOLD = 60

const greetings = (cards: Card[]): Deck => ({
  id: "greetings",
  name: "Greetings",
  blurb: "Say hello & be polite",
  cards,
})
const family = (cards: Card[]): Deck => ({
  id: "family",
  name: "Family",
  blurb: "Parents, siblings & relatives",
  cards,
})
const numbers = (cards: Card[]): Deck => ({
  id: "numbers",
  name: "Numbers",
  blurb: "Count from one to ten",
  cards,
})
const colors = (cards: Card[]): Deck => ({
  id: "colors",
  name: "Colors",
  blurb: "Everyday colors",
  cards,
})
const food = (cards: Card[]): Deck => ({
  id: "food",
  name: "Food",
  blurb: "Popular & local dishes",
  cards,
})

/** Assemble a standard Beginner level from the five starter decks (kept in study order). */
const beginner = (decks: Deck[]): Level => ({
  id: "beginner",
  name: "Beginner",
  blurb: "Finish each deck to unlock the next",
  decks,
})

/** Placeholder levels so the difficulty framework is visible. Content coming soon. */
const upcomingLevels: Level[] = [
  {
    id: "intermediate",
    name: "Intermediate",
    blurb: "Phrases, time & directions",
    comingSoon: true,
    decks: [],
  },
  {
    id: "advanced",
    name: "Advanced",
    blurb: "Conversation & grammar",
    comingSoon: true,
    decks: [],
  },
]

export const LANGUAGES: Language[] = [
  {
    id: "spanish",
    name: "Spanish",
    nativeName: "Español",
    code: "ES",
    accent: "lang-es",
    levels: [
      beginner([
        greetings([
          { en: "Hello", target: "hola" },
          { en: "Good morning", target: "buenos días" },
          { en: "Good night", target: "buenas noches" },
          { en: "Goodbye", target: "adiós" },
          { en: "Please", target: "por favor" },
          { en: "Thank you", target: "gracias" },
          { en: "Yes", target: "sí" },
          { en: "No", target: "no" },
        ]),
        family([
          { en: "Family", target: "la familia" },
          { en: "Mother", target: "la madre" },
          { en: "Father", target: "el padre" },
          { en: "Brother", target: "el hermano" },
          { en: "Sister", target: "la hermana" },
          { en: "Aunt", target: "la tía" },
          { en: "Uncle", target: "el tío" },
          { en: "Grandfather", target: "el abuelo" },
          { en: "Grandmother", target: "la abuela" },
          { en: "Son", target: "el hijo" },
          { en: "Daughter", target: "la hija" },
        ]),
        numbers([
          { en: "One", target: "uno" },
          { en: "Two", target: "dos" },
          { en: "Three", target: "tres" },
          { en: "Four", target: "cuatro" },
          { en: "Five", target: "cinco" },
          { en: "Six", target: "seis" },
          { en: "Seven", target: "siete" },
          { en: "Eight", target: "ocho" },
          { en: "Nine", target: "nueve" },
          { en: "Ten", target: "diez" },
        ]),
        colors([
          { en: "Red", target: "rojo" },
          { en: "Blue", target: "azul" },
          { en: "Green", target: "verde" },
          { en: "Yellow", target: "amarillo" },
          { en: "Black", target: "negro" },
          { en: "White", target: "blanco" },
          { en: "Orange", target: "naranja" },
          { en: "Purple", target: "morado" },
        ]),
        food([
          // Shared common foods
          { en: "Water", target: "el agua" },
          { en: "Bread", target: "el pan" },
          { en: "Coffee", target: "el café" },
          { en: "Apple", target: "la manzana" },
          { en: "Rice", target: "el arroz" },
          // Iconic Spanish dishes
          { en: "Paella", target: "la paella" },
          { en: "Spanish omelette", target: "la tortilla" },
          { en: "Churros", target: "los churros" },
          { en: "Cured ham", target: "el jamón" },
          { en: "Cheese", target: "el queso" },
        ]),
      ]),
      ...upcomingLevels,
    ],
  },
  {
    id: "french",
    name: "French",
    nativeName: "Français",
    code: "FR",
    accent: "lang-fr",
    levels: [
      beginner([
        greetings([
          { en: "Hello", target: "bonjour" },
          { en: "Good evening", target: "bonsoir" },
          { en: "Good night", target: "bonne nuit" },
          { en: "Goodbye", target: "au revoir" },
          { en: "Please", target: "s'il vous plaît" },
          { en: "Thank you", target: "merci" },
          { en: "Yes", target: "oui" },
          { en: "No", target: "non" },
        ]),
        family([
          { en: "Family", target: "la famille" },
          { en: "Mother", target: "la mère" },
          { en: "Father", target: "le père" },
          { en: "Brother", target: "le frère" },
          { en: "Sister", target: "la sœur" },
          { en: "Aunt", target: "la tante" },
          { en: "Uncle", target: "l'oncle" },
          { en: "Grandfather", target: "le grand-père" },
          { en: "Grandmother", target: "la grand-mère" },
          { en: "Son", target: "le fils" },
          { en: "Daughter", target: "la fille" },
        ]),
        numbers([
          { en: "One", target: "un" },
          { en: "Two", target: "deux" },
          { en: "Three", target: "trois" },
          { en: "Four", target: "quatre" },
          { en: "Five", target: "cinq" },
          { en: "Six", target: "six" },
          { en: "Seven", target: "sept" },
          { en: "Eight", target: "huit" },
          { en: "Nine", target: "neuf" },
          { en: "Ten", target: "dix" },
        ]),
        colors([
          { en: "Red", target: "rouge" },
          { en: "Blue", target: "bleu" },
          { en: "Green", target: "vert" },
          { en: "Yellow", target: "jaune" },
          { en: "Black", target: "noir" },
          { en: "White", target: "blanc" },
          { en: "Orange", target: "orange" },
          { en: "Purple", target: "violet" },
        ]),
        food([
          { en: "Water", target: "l'eau" },
          { en: "Bread", target: "le pain" },
          { en: "Coffee", target: "le café" },
          { en: "Apple", target: "la pomme" },
          { en: "Egg", target: "l'œuf" },
          { en: "Croissant", target: "le croissant" },
          { en: "Baguette", target: "la baguette" },
          { en: "Cheese", target: "le fromage" },
          { en: "Crêpe", target: "la crêpe" },
          { en: "Soup", target: "la soupe" },
        ]),
      ]),
      ...upcomingLevels,
    ],
  },
  {
    id: "portuguese",
    name: "Portuguese",
    nativeName: "Português",
    code: "PT",
    accent: "lang-pt",
    levels: [
      beginner([
        greetings([
          { en: "Hello", target: "olá" },
          { en: "Good morning", target: "bom dia" },
          { en: "Good night", target: "boa noite" },
          { en: "Goodbye", target: "tchau" },
          { en: "Please", target: "por favor" },
          { en: "Thank you", target: "obrigado" },
          { en: "Yes", target: "sim" },
          { en: "No", target: "não" },
        ]),
        family([
          { en: "Family", target: "a família" },
          { en: "Mother", target: "a mãe" },
          { en: "Father", target: "o pai" },
          { en: "Brother", target: "o irmão" },
          { en: "Sister", target: "a irmã" },
          { en: "Aunt", target: "a tia" },
          { en: "Uncle", target: "o tio" },
          { en: "Grandfather", target: "o avô" },
          { en: "Grandmother", target: "a avó" },
          { en: "Son", target: "o filho" },
          { en: "Daughter", target: "a filha" },
        ]),
        numbers([
          { en: "One", target: "um" },
          { en: "Two", target: "dois" },
          { en: "Three", target: "três" },
          { en: "Four", target: "quatro" },
          { en: "Five", target: "cinco" },
          { en: "Six", target: "seis" },
          { en: "Seven", target: "sete" },
          { en: "Eight", target: "oito" },
          { en: "Nine", target: "nove" },
          { en: "Ten", target: "dez" },
        ]),
        colors([
          { en: "Red", target: "vermelho" },
          { en: "Blue", target: "azul" },
          { en: "Green", target: "verde" },
          { en: "Yellow", target: "amarelo" },
          { en: "Black", target: "preto" },
          { en: "White", target: "branco" },
          { en: "Orange", target: "laranja" },
          { en: "Purple", target: "roxo" },
        ]),
        food([
          { en: "Water", target: "a água" },
          { en: "Bread", target: "o pão" },
          { en: "Coffee", target: "o café" },
          { en: "Apple", target: "a maçã" },
          { en: "Rice", target: "o arroz" },
          { en: "Custard tart", target: "o pastel de nata" },
          { en: "Salted cod", target: "o bacalhau" },
          { en: "Cheese", target: "o queijo" },
          { en: "Grilled chicken", target: "o frango" },
          { en: "Milk", target: "o leite" },
        ]),
      ]),
      ...upcomingLevels,
    ],
  },
  {
    id: "german",
    name: "German",
    nativeName: "Deutsch",
    code: "DE",
    accent: "lang-de",
    levels: [
      beginner([
        greetings([
          { en: "Hello", target: "hallo" },
          { en: "Good morning", target: "guten Morgen" },
          { en: "Good night", target: "gute Nacht" },
          { en: "Goodbye", target: "auf Wiedersehen" },
          { en: "Please", target: "bitte" },
          { en: "Thank you", target: "danke" },
          { en: "Yes", target: "ja" },
          { en: "No", target: "nein" },
        ]),
        // Preserved & corrected from the original German "Family" quiz.
        family([
          { en: "Family", target: "die Familie" },
          { en: "Mother", target: "die Mutter" },
          { en: "Father", target: "der Vater" },
          { en: "Brother", target: "der Bruder" },
          { en: "Sister", target: "die Schwester" },
          { en: "Aunt", target: "die Tante" },
          { en: "Uncle", target: "der Onkel" },
          { en: "Grandfather", target: "der Opa" },
          { en: "Grandmother", target: "die Oma" },
          { en: "Son", target: "der Sohn" },
          { en: "Daughter", target: "die Tochter" },
        ]),
        numbers([
          { en: "One", target: "eins" },
          { en: "Two", target: "zwei" },
          { en: "Three", target: "drei" },
          { en: "Four", target: "vier" },
          { en: "Five", target: "fünf" },
          { en: "Six", target: "sechs" },
          { en: "Seven", target: "sieben" },
          { en: "Eight", target: "acht" },
          { en: "Nine", target: "neun" },
          { en: "Ten", target: "zehn" },
        ]),
        colors([
          { en: "Red", target: "rot" },
          { en: "Blue", target: "blau" },
          { en: "Green", target: "grün" },
          { en: "Yellow", target: "gelb" },
          { en: "Black", target: "schwarz" },
          { en: "White", target: "weiß" },
          { en: "Orange", target: "orange" },
          { en: "Purple", target: "lila" },
        ]),
        food([
          { en: "Water", target: "das Wasser" },
          { en: "Bread", target: "das Brot" },
          { en: "Coffee", target: "der Kaffee" },
          { en: "Apple", target: "der Apfel" },
          { en: "Egg", target: "das Ei" },
          { en: "Pretzel", target: "die Brezel" },
          { en: "Sausage", target: "die Wurst" },
          { en: "Schnitzel", target: "das Schnitzel" },
          { en: "Cheese", target: "der Käse" },
          { en: "Potato", target: "die Kartoffel" },
        ]),
      ]),
      ...upcomingLevels,
    ],
  },
  {
    id: "japanese",
    name: "Japanese",
    nativeName: "日本語",
    code: "JA",
    accent: "lang-ja",
    levels: [
      beginner([
        greetings([
          { en: "Hello", target: "こんにちは", romaji: "konnichiwa" },
          { en: "Good morning", target: "おはよう", romaji: "ohayō" },
          { en: "Good night", target: "おやすみ", romaji: "oyasumi" },
          { en: "Goodbye", target: "さようなら", romaji: "sayōnara" },
          { en: "Please", target: "お願いします", romaji: "onegaishimasu" },
          { en: "Thank you", target: "ありがとう", romaji: "arigatō" },
          { en: "Yes", target: "はい", romaji: "hai" },
          { en: "No", target: "いいえ", romaji: "iie" },
        ]),
        family([
          { en: "Family", target: "家族", romaji: "kazoku" },
          { en: "Mother", target: "お母さん", romaji: "okāsan" },
          { en: "Father", target: "お父さん", romaji: "otōsan" },
          { en: "Brother", target: "兄弟", romaji: "kyōdai" },
          { en: "Sister", target: "姉妹", romaji: "shimai" },
          { en: "Aunt", target: "おばさん", romaji: "obasan" },
          { en: "Uncle", target: "おじさん", romaji: "ojisan" },
          { en: "Grandfather", target: "おじいさん", romaji: "ojīsan" },
          { en: "Grandmother", target: "おばあさん", romaji: "obāsan" },
          { en: "Son", target: "息子", romaji: "musuko" },
          { en: "Daughter", target: "娘", romaji: "musume" },
        ]),
        numbers([
          { en: "One", target: "一", romaji: "ichi" },
          { en: "Two", target: "二", romaji: "ni" },
          { en: "Three", target: "三", romaji: "san" },
          { en: "Four", target: "四", romaji: "yon" },
          { en: "Five", target: "五", romaji: "go" },
          { en: "Six", target: "六", romaji: "roku" },
          { en: "Seven", target: "七", romaji: "nana" },
          { en: "Eight", target: "八", romaji: "hachi" },
          { en: "Nine", target: "九", romaji: "kyū" },
          { en: "Ten", target: "十", romaji: "jū" },
        ]),
        colors([
          { en: "Red", target: "赤", romaji: "aka" },
          { en: "Blue", target: "青", romaji: "ao" },
          { en: "Green", target: "緑", romaji: "midori" },
          { en: "Yellow", target: "黄色", romaji: "kiiro" },
          { en: "Black", target: "黒", romaji: "kuro" },
          { en: "White", target: "白", romaji: "shiro" },
          { en: "Orange", target: "オレンジ", romaji: "orenji" },
          { en: "Purple", target: "紫", romaji: "murasaki" },
        ]),
        food([
          { en: "Water", target: "水", romaji: "mizu" },
          { en: "Bread", target: "パン", romaji: "pan" },
          { en: "Coffee", target: "コーヒー", romaji: "kōhī" },
          { en: "Apple", target: "りんご", romaji: "ringo" },
          { en: "Rice", target: "ご飯", romaji: "gohan" },
          { en: "Sushi", target: "寿司", romaji: "sushi" },
          { en: "Ramen", target: "ラーメン", romaji: "rāmen" },
          { en: "Green tea", target: "お茶", romaji: "ocha" },
          { en: "Miso soup", target: "味噌汁", romaji: "misoshiru" },
          { en: "Egg", target: "卵", romaji: "tamago" },
        ]),
      ]),
      ...upcomingLevels,
    ],
  },
]

export function getLanguage(id: string): Language | undefined {
  return LANGUAGES.find((l) => l.id === id)
}

/** All decks for a language, flattened in level + study order. */
export function getAllDecks(language: Language): Deck[] {
  return language.levels.flatMap((l) => l.decks)
}

export function getDeck(languageId: string, deckId: string): { language: Language; deck: Deck } | undefined {
  const language = getLanguage(languageId)
  if (!language) return undefined
  const deck = getAllDecks(language).find((d) => d.id === deckId)
  if (!deck) return undefined
  return { language, deck }
}

/** The next deck in study order after the given deck, if any. */
export function getNextDeck(languageId: string, deckId: string): Deck | undefined {
  const language = getLanguage(languageId)
  if (!language) return undefined
  const all = getAllDecks(language)
  const index = all.findIndex((d) => d.id === deckId)
  if (index === -1) return undefined
  return all[index + 1]
}
