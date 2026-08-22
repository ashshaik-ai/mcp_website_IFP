"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  /** Seconds to wait after the number scrolls into view. */
  delay?: number
  decimalPlaces?: number
}

const DURATION = 1400

/* Counts up once, when scrolled into view. Previously a motion spring, which
   was the only reason three quarters of the homepage pulled the library in. */
export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const from = direction === "down" ? value : startValue
    const to = direction === "down" ? startValue : value
    const format = (n: number) =>
      Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(n.toFixed(decimalPlaces)))

    // Respect a reduced-motion preference by landing on the final value.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(to)
      return
    }

    let frame = 0
    let timer: ReturnType<typeof setTimeout> | null = null

    const run = () => {
      const start = performance.now()
      // easeOutExpo, close to the settle of the spring this replaced.
      const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        el.textContent = format(from + (to - from) * ease(t))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        timer = setTimeout(run, delay * 1000)
      },
      { rootMargin: "0px" }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (timer !== null) clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [value, startValue, direction, delay, decimalPlaces])

  return (
    <span
      ref={ref}
      className={cn("inline-block tracking-wider tabular-nums", className)}
      {...props}
    >
      {startValue}
    </span>
  )
}
