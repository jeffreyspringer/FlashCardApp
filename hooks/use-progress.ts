"use client"

import { useEffect, useState } from "react"
import { getProgress, type Progress } from "@/lib/progress"

/** Subscribes to local progress changes and re-renders on update. */
export function useProgress(): Progress {
  const [progress, setProgress] = useState<Progress>({})

  useEffect(() => {
    const sync = () => setProgress(getProgress())
    sync()
    window.addEventListener("flashy-progress-change", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("flashy-progress-change", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return progress
}
