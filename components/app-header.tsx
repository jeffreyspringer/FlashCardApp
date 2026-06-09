import { Sparkles } from "lucide-react"

export function AppHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
        >
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="text-xl font-bold tracking-tight">Flashy</span>
      </div>
      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        English
      </span>
    </header>
  )
}
