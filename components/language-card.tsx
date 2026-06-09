"use client"

import { ChevronRight } from "lucide-react"
import type { Language } from "@/lib/languages"
import { useProgress } from "@/hooks/use-progress"
import { key } from "@/lib/progress"

const accentBg: Record<string, string> = {
  "lang-es": "bg-lang-es",
  "lang-fr": "bg-lang-fr",
  "lang-pt": "bg-lang-pt",
  "lang-de": "bg-lang-de",
  "lang-ja": "bg-lang-ja",
}

export function LanguageCard({ language }: { language: Language }) {
  const progress = useProgress()

  const totalDecks = language.decks.length
  const startedDecks = language.decks.filter((d) => progress[key(language.id, d.id)]).length

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all active:scale-[0.99] group-focus-visible:ring-2 group-focus-visible:ring-ring">
      <div
        aria-hidden="true"
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white ${accentBg[language.accent]}`}
      >
        {language.code}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-lg font-bold">{language.name}</h2>
          <span className="truncate text-sm text-muted-foreground">{language.nativeName}</span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {startedDecks > 0 ? `${startedDecks} of ${totalDecks} decks started` : `${totalDecks} decks to explore`}
        </p>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </div>
  )
}
