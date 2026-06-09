"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Language, Deck } from "@/lib/languages"
import { FlashcardMode } from "@/components/flashcard-mode"
import { QuizMode } from "@/components/quiz-mode"

type Mode = "flashcards" | "quiz"

export function StudyScreen({ language, deck }: { language: Language; deck: Deck }) {
  const [mode, setMode] = useState<Mode>("flashcards")

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-10 pt-[calc(env(safe-area-inset-top)+1rem)]">
      <div className="flex items-center gap-3">
        <Link
          href={`/learn/${language.id}`}
          aria-label={`Back to ${language.name} decks`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold leading-tight">{deck.name}</h1>
          <p className="text-sm text-muted-foreground">
            {language.name} · {deck.cards.length} cards
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Study mode"
        className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1"
      >
        <ModeTab label="Flashcards" active={mode === "flashcards"} onClick={() => setMode("flashcards")} />
        <ModeTab label="Quiz" active={mode === "quiz"} onClick={() => setMode("quiz")} />
      </div>

      <div className="mt-6 flex-1">
        {mode === "flashcards" ? (
          <FlashcardMode language={language} deck={deck} />
        ) : (
          <QuizMode language={language} deck={deck} />
        )}
      </div>
    </main>
  )
}

function ModeTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
        active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  )
}
