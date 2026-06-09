"use client"

import { useMemo, useState } from "react"
import { Check, X, Trophy } from "lucide-react"
import type { Language, Deck, Card } from "@/lib/languages"
import { recordQuiz } from "@/lib/progress"

type Question = {
  prompt: string
  romaji?: string
  options: { text: string; correct: boolean }[]
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function buildQuestions(cards: Card[]): Question[] {
  return shuffle(cards).map((card) => {
    const distractors = shuffle(cards.filter((c) => c.target !== card.target))
      .slice(0, 3)
      .map((c) => ({ text: c.target, correct: false }))
    const options = shuffle([{ text: card.target, correct: true }, ...distractors])
    return { prompt: card.en, romaji: card.romaji, options }
  })
}

export function QuizMode({ language, deck }: { language: Language; deck: Deck }) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(deck.cards))
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const total = questions.length
  const question = questions[current]
  const percent = useMemo(() => Math.round((score / total) * 100), [score, total])

  function selectAnswer(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (question.options[optionIndex].correct) {
      setScore((s) => s + 1)
    }
  }

  function next() {
    if (current + 1 >= total) {
      const finalScore = Math.round((score / total) * 100)
      recordQuiz(language.id, deck.id, finalScore)
      setFinished(true)
      return
    }
    setSelected(null)
    setCurrent((c) => c + 1)
  }

  function restart() {
    setQuestions(buildQuestions(deck.cards))
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Trophy className="h-8 w-8" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">
          {percent >= 80 ? "Great job!" : percent >= 50 ? "Nice work!" : "Keep practicing!"}
        </h2>
        <p className="mt-1 text-muted-foreground">
          You scored <span className="font-bold text-foreground">{score}</span> out of {total}
        </p>
        <p className="mt-4 text-5xl font-bold text-primary">{percent}%</p>
        <button
          onClick={restart}
          className="mt-8 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>Score {score}</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          How do you say
        </span>
        <p className="mt-2 text-balance text-3xl font-bold">{question.prompt}</p>
        <p className="mt-1 text-sm text-muted-foreground">in {language.name}?</p>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i
          const showCorrect = selected !== null && option.correct
          const showWrong = isSelected && !option.correct

          return (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              disabled={selected !== null}
              className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold transition-colors ${
                showCorrect
                  ? "border-success bg-success/10 text-foreground"
                  : showWrong
                    ? "border-destructive bg-destructive/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-ring/50 disabled:opacity-70"
              }`}
            >
              <span>{option.text}</span>
              {showCorrect ? (
                <Check className="h-5 w-5 shrink-0 text-success" />
              ) : showWrong ? (
                <X className="h-5 w-5 shrink-0 text-destructive" />
              ) : null}
            </button>
          )
        })}
      </div>

      {selected !== null ? (
        <button
          onClick={next}
          className="mt-6 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          {current + 1 >= total ? "See results" : "Next question"}
        </button>
      ) : null}
    </div>
  )
}
