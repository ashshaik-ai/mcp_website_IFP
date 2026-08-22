import type { CSSProperties } from "react";

/* Entrance animation, done in CSS rather than JavaScript.

   This was a motion component: it rendered opacity:0 and animated to 1 once
   React hydrated. With 193 of them on the site, that meant roughly a hundred
   elements per page sat invisible in the prerendered HTML until the bundle
   loaded and ran — the content was present but unpainted, which held LCP near
   six seconds while CLS stayed at a perfect zero.

   A CSS animation starts at first paint instead, so the browser reveals
   content on its own schedule and never waits for JavaScript. The effect is
   unchanged. It is no longer a client component either, which takes the
   animation off the hydration path entirely.

   Only `delay` and `className` were ever passed at any of the 193 call sites,
   but the rest of the old API is accepted so nothing has to change to adopt
   this. `inView` was never used — every instance animated on mount — so
   scroll triggering is deliberately not reimplemented. */

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Seconds the animation runs for. */
  duration?: number;
  /** Pixels travelled. */
  offset?: number;
  blur?: string;
  /** Accepted for compatibility; every call site animates on mount. */
  inView?: boolean;
  direction?: "up" | "down" | "left" | "right";
};

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  offset = 6,
  blur = "6px",
}: BlurFadeProps) {
  const style = {
    "--bf-delay": `${(0.04 + delay).toFixed(3)}s`,
    "--bf-duration": `${duration}s`,
    "--bf-offset": `${-offset}px`,
    "--bf-blur": blur,
  } as CSSProperties;

  return (
    <div className={className ? `if-blur-fade ${className}` : "if-blur-fade"} style={style}>
      {children}
    </div>
  );
}
