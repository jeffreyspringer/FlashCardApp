import Link from "next/link"
import { LANGUAGES } from "@/lib/languages"
import { LanguageCard } from "@/components/language-card"
import { AppHeader } from "@/components/app-header"

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-16 pt-[calc(env(safe-area-inset-top)+1rem)]">
      <AppHeader />

      <section className="mt-6">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          What do you want to learn today?
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          Pick a language to start studying. You speak English — choose your target language below.
        </p>
      </section>

      <section aria-label="Choose a language" className="mt-7 flex flex-col gap-4">
        {LANGUAGES.map((language) => (
          <Link key={language.id} href={`/learn/${language.id}`} className="block focus:outline-none">
            <LanguageCard language={language} />
          </Link>
        ))}
      </section>

      <footer className="mt-auto pt-10 text-center text-sm text-muted-foreground">
        Made for curious minds. Keep a daily streak going.
      </footer>
    </main>
  )
}
