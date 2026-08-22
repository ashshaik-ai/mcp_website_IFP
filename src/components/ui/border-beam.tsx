import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  /** The size of the border beam. */
  size?: number
  /** Seconds for one full lap of the border. */
  duration?: number
  /** Seconds to offset the start of the lap by, so sibling beams desynchronise. */
  delay?: number
  /** The colour the beam fades in from. */
  colorFrom?: string
  /** The colour the beam fades out to. */
  colorTo?: string
  className?: string
  style?: CSSProperties
  /** Run the lap anticlockwise. */
  reverse?: boolean
  /** Where on the path the beam starts, 0-100. */
  initialOffset?: number
  /** The border width of the beam. */
  borderWidth?: number
}

/* `offset-distance` is a real animatable CSS property, so the lap runs as a
   plain keyframe on the compositor. This used to pull in motion purely to
   drive it from JS, which cost ~40 KB gzip on every page that renders a card. */
export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
      style={{ "--border-beam-width": borderWidth + "px" } as CSSProperties}
      aria-hidden="true"
    >
      <div
        className={cn(
          "if-border-beam absolute aspect-square",
          "bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          className
        )}
        style={
          {
            width: size,
            offsetPath: "rect(0 auto auto 0 round " + size + "px)",
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--beam-start": initialOffset + "%",
            animationDuration: duration + "s",
            animationDelay: -delay + "s",
            animationDirection: reverse ? "reverse" : "normal",
            ...style,
          } as CSSProperties
        }
      />
    </div>
  )
}
