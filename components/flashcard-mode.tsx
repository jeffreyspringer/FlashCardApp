"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import type { Language, Deck } from "@/lib/languages"
import { recordStudy } from "@/lib/progress"

export function FlashcardMode({ language, deck }: { language: Language; deck: Deck }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const seen = useRef<Set<number>>(new Set([0]))

  const card = deck.cards[index]
  const isLast = index === deck.cards.length - 1
  const isFirst = index === 0

  // Record studied cards whenever the set of seen cards grows.
  useEffect(() => {
    recordStudy(language.id, deck.id, seen.current.size)
  }, [index, language.id, deck.id])

  function go(next: number) {
    const clamped = Math.max(0, Math.min(deck.cards.length - 1, next))
    seen.current.add(clamped)
    setFlipped(false)
    setIndex(clamped)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
        <span>
          Card {index + 1} of {deck.cards.length}
        </span>
        <span>{seen.current.size} studied</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((index + 1) / deck.cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="mt-6 flip-scene">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Show English" : "Reveal translation"}
          className="relative block h-72 w-full text-left"
        >
          <div className={`flip-card relative h-full w-full ${flipped ? "is-flipped" : ""}`}>
            {/* Front: English */}
            <div className="flip-face absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">English</span>
              <span className="mt-3 text-balance text-center text-4xl font-bold">{card.en}</span>
              <span className="mt-6 text-sm text-muted-foreground">Tap to reveal</span>
            </div>

            {/* Back: target language */}
            <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary p-6 text-primary-foreground shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                {language.name}
              </span>
              <span className="mt-3 text-balance text-center text-4xl font-bold leading-tight">{card.target}</span>
              {card.romaji ? (
                <span className="mt-2 text-lg text-primary-foreground/90">{card.romaji}</span>
              ) : null}
              <span className="mt-6 text-sm text-primary-foreground/80">Tap to flip back</span>
            </div>
          </div>
        </button>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => go(index - 1)}
          disabled={isFirst}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Previous card"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 font-semibold text-accent-foreground transition-transform active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          Flip
        </button>

        <button
          onClick={() => go(index + 1)}
          disabled={isLast}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Next card"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
