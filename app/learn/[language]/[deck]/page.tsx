import { notFound } from "next/navigation"
import { getLanguage, getDeck } from "@/lib/languages"
import { StudyScreen } from "@/components/study-screen"

export function generateStaticParams() {
  const params: { language: string; deck: string }[] = []
  for (const language of ["spanish", "french", "portuguese", "german", "japanese"]) {
    const lang = getLanguage(language)
    if (!lang) continue
    for (const deck of lang.decks) {
      params.push({ language, deck: deck.id })
    }
  }
  return params
}

export default async function DeckStudyPage({
  params,
}: {
  params: Promise<{ language: string; deck: string }>
}) {
  const { language: languageId, deck: deckId } = await params
  const result = getDeck(languageId, deckId)
  if (!result) notFound()

  return <StudyScreen language={result.language} deck={result.deck} />
}
