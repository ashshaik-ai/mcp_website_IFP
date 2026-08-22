"use client";

import type { SceneProps } from "../Simulator";

/* The lunar month.

   A moon whose lit portion moves with the step: new, crescent, half, full,
   and back. The phase is drawn as a disc with a second disc of the sky's
   colour sliding across it, which is how the real thing works, more or
   less. Below it the twelve Hijri months form a ring, the current one lit. */

const MONTHS = ["محرم", "صفر", "ربيع ١", "ربيع ٢", "جمادى ١", "جمادى ٢", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];

export function MoonScene({ step }: SceneProps) {
  /* step ids: new, crescent, first-quarter, full, last-quarter, old — and
     month-N for the ring. */
  const phase: Record<string, number> = { new: 0, crescent: 0.12, "first-quarter": 0.5, gibbous: 0.75, full: 1, "last-quarter": 0.5, old: 0.12 };
  const p = phase[step.id] ?? (step.id.startsWith("month") ? 1 : 0.12);
  const waning = step.id === "last-quarter" || step.id === "old";
  const month = step.id.startsWith("month") ? Number(step.id.slice(6)) - 1 : -1;

  /* The shadow disc starts exactly over the moon (new) and slides off as
     the phase grows; by full it has cleared the disc. Waning slides the
     other way so the lit side swaps. */
  /* Waxing moons are lit on the sun's side, the right, after sunset. */
  const shift = (waning ? 1 : -1) * p * 84;

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id="moonclip"><circle cx="180" cy="120" r="42" /></clipPath>
        <radialGradient id="moonglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.6" stopColor="#fff6df" stopOpacity="0.25" />
          <stop offset="1" stopColor="#fff6df" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[[40, 30], [90, 70], [300, 40], [330, 90], [250, 24], [60, 150], [310, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <circle cx="180" cy="120" r="70" fill="url(#moonglow)" style={{ opacity: p, transition: "opacity 0.8s" }} />
      <circle cx="180" cy="120" r="42" fill="#fff6df" />
      <g clipPath="url(#moonclip)">
        <circle cx={180 + shift} cy="120" r="42" fill="#0c3018" style={{ transition: "cx 1s cubic-bezier(0.22,1,0.36,1)" }} />
      </g>
      <circle cx="180" cy="120" r="42" fill="none" stroke="rgba(245,230,192,0.35)" strokeWidth="1.5" />

      {/* Month ring */}
      {MONTHS.map((m, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = 180 + Math.cos(a) * 118;
        const y = 210 + Math.sin(a) * 42;
        const on = i === month;
        return (
          <g key={m} style={{ transition: "opacity 0.4s", opacity: month < 0 ? 0.55 : on ? 1 : 0.35 }}>
            <circle cx={x} cy={y} r={on ? 4 : 2.4} fill={on ? "var(--if-gold-light)" : "rgba(232,184,75,0.7)"} style={{ transition: "r 0.3s" }} />
            <text x={x} y={y + (y > 210 ? 16 : -9)} textAnchor="middle" fontSize={on ? 12 : 9} fill={on ? "var(--if-gold-light)" : "rgba(245,230,192,0.75)"} className="font-arabic" lang="ar" direction="rtl">{m}</text>
          </g>
        );
      })}
    </svg>
  );
}
