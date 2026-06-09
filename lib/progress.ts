"use client"

// Local progress store. Structured so it can later be swapped for a
// database-backed implementation without changing component code.

const STORAGE_KEY = "flashy-progress-v1"

export type DeckProgress = {
  /** Best quiz score recorded for this deck (0-100) */
  bestScore: number
  /** Number of times the deck quiz has been completed */
  timesCompleted: number
  /** Number of cards studied at least once in flashcard mode */
  cardsStudied: number
  /** ISO timestamp of the last study session */
  lastStudied: string
}

export type Progress = {
  // keyed by `${languageId}:${deckId}`
  [key: string]: DeckProgress
}

function read(): Progress {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Progress) : {}
  } catch {
    return {}
  }
}

function write(progress: Progress) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    window.dispatchEvent(new Event("flashy-progress-change"))
  } catch {
    // ignore quota / serialization errors
  }
}

export function key(languageId: string, deckId: string) {
  return `${languageId}:${deckId}`
}

export function getProgress(): Progress {
  return read()
}

export function getDeckProgress(languageId: string, deckId: string): DeckProgress | undefined {
  return read()[key(languageId, deckId)]
}

export function recordQuiz(languageId: string, deckId: string, scorePercent: number) {
  const progress = read()
  const k = key(languageId, deckId)
  const existing = progress[k]
  progress[k] = {
    bestScore: Math.max(existing?.bestScore ?? 0, scorePercent),
    timesCompleted: (existing?.timesCompleted ?? 0) + 1,
    cardsStudied: existing?.cardsStudied ?? 0,
    lastStudied: new Date().toISOString(),
  }
  write(progress)
}

export function recordStudy(languageId: string, deckId: string, cardsStudied: number) {
  const progress = read()
  const k = key(languageId, deckId)
  const existing = progress[k]
  progress[k] = {
    bestScore: existing?.bestScore ?? 0,
    timesCompleted: existing?.timesCompleted ?? 0,
    cardsStudied: Math.max(existing?.cardsStudied ?? 0, cardsStudied),
    lastStudied: new Date().toISOString(),
  }
  write(progress)
}
