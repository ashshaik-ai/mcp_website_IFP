"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  /** Milliseconds each word is held. */
  duration?: number
  className?: string
}

/* Swaps a word every few seconds. The enter animation is a CSS keyframe keyed
   off the word itself, so React remounts the node and the animation replays —
   the same effect AnimatePresence gave, without the library. */
export function WordRotate({ words, duration = 2500, className }: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    /* Only the enter keyframe was disabled under reduced motion; the swap
       itself kept going, so the hero line still changed under the reader
       every few seconds. Hold on the first word instead. */
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      duration
    )
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="overflow-hidden py-2">
      <p key={words[index]} className={cn("if-word-rotate", className)}>
        {words[index]}
      </p>
    </div>
  )
}
