import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getLanguage } from "@/lib/languages"
import { DeckCard } from "@/components/deck-card"

export function generateStaticParams() {
  return [
    { language: "spanish" },
    { language: "french" },
    { language: "portuguese" },
    { language: "german" },
    { language: "japanese" },
  ]
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>
}) {
  const { language: languageId } = await params
  const language = getLanguage(languageId)
  if (!language) notFound()

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-16 pt-[calc(env(safe-area-inset-top)+1rem)]">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Back to languages"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold leading-tight">{language.name}</h1>
          <p className="text-sm text-muted-foreground">{language.nativeName}</p>
        </div>
      </div>

      <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
        Choose a deck. Study with flippable cards, then test yourself with a quick quiz.
      </p>

      <section aria-label="Decks" className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {language.decks.map((deck) => (
          <DeckCard key={deck.id} languageId={language.id} deck={deck} accent={language.accent} />
        ))}
      </section>
    </main>
  )
}
