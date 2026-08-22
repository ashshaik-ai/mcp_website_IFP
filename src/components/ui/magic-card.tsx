"use client"

import React, { useCallback, useEffect, useRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  /** Diameter of the radial highlight, in px. */
  gradientSize?: number
  /** Tint of the soft wash over the card face on hover. */
  gradientColor?: string
  /** Inner colour of the border highlight. */
  gradientFrom?: string
  /** Outer colour of the border highlight. */
  gradientTo?: string
}

/* A pointer-tracked border highlight. This was 200 lines built on motion
   springs, with an unused "orb" mode; both call sites only ever wanted the
   gradient. Two CSS custom properties updated on pointermove do the same job,
   and the card no longer drags the animation library onto the page. */
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const park = useCallback(() => {
    // Sit the highlight off the card so it is invisible until pointed at.
    const el = ref.current
    if (!el) return
    el.style.setProperty("--mc-x", -gradientSize + "px")
    el.style.setProperty("--mc-y", -gradientSize + "px")
  }, [gradientSize])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mc-x", e.clientX - rect.left + "px")
    el.style.setProperty("--mc-y", e.clientY - rect.top + "px")
  }, [])

  useEffect(() => {
    park()
    /* A pointer can leave the window without firing pointerleave on the card
       (drag out, tab away), which would strand the highlight mid-card. */
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) park()
    }
    const onHidden = () => {
      if (document.visibilityState !== "visible") park()
    }
    window.addEventListener("pointerout", onOut)
    window.addEventListener("blur", park)
    document.addEventListener("visibilitychange", onHidden)
    return () => {
      window.removeEventListener("pointerout", onOut)
      window.removeEventListener("blur", park)
      document.removeEventListener("visibilitychange", onHidden)
    }
  }, [park])

  return (
    <div
      ref={ref}
      className={cn("if-magic-card group relative isolate overflow-hidden rounded-[inherit]", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={park}
      style={
        {
          "--mc-size": gradientSize + "px",
          "--mc-from": gradientFrom,
          "--mc-to": gradientTo,
          "--mc-wash": gradientColor,
        } as CSSProperties
      }
    >
      <div className="if-magic-card-wash" aria-hidden="true" />
      <div className="relative z-40">{children}</div>
    </div>
  )
}
