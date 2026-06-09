"use client"

import Link from "next/link"
import { Layers, Star } from "lucide-react"
import type { Deck } from "@/lib/languages"
import { useProgress } from "@/hooks/use-progress"
import { key } from "@/lib/progress"

const accentText: Record<string, string> = {
  "lang-es": "text-lang-es",
  "lang-fr": "text-lang-fr",
  "lang-pt": "text-lang-pt",
  "lang-de": "text-lang-de",
  "lang-ja": "text-lang-ja",
}

export function DeckCard({
  languageId,
  deck,
  accent,
}: {
  languageId: string
  deck: Deck
  accent: string
}) {
  const progress = useProgress()
  const stats = progress[key(languageId, deck.id)]

  return (
    <Link
      href={`/learn/${languageId}/${deck.id}`}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-ring/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
    >
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-secondary ${accentText[accent]}`}>
          <Layers className="h-5 w-5" />
        </span>
        {stats?.bestScore ? (
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
            <Star className="h-3.5 w-3.5 fill-current text-accent" />
            {stats.bestScore}%
          </span>
        ) : null}
      </div>

      <div>
        <h2 className="text-lg font-bold">{deck.name}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{deck.blurb}</p>
      </div>

      <p className="mt-auto text-xs font-medium text-muted-foreground">{deck.cards.length} cards</p>
    </Link>
  )
}
