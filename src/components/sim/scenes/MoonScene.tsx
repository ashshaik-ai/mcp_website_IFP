"use client";

import type { SceneProps } from "../Simulator";

/* The lunar month.

   A moon whose lit portion moves with the step: new, crescent, half, full,
   and back. The phase is drawn as a disc with a second disc of the sky's
   colour sliding across it, which is how the real thing works, more or
   less. Around it the twelve Hijri months sit on a dial, the current one lit.

   The ring used to sit below the moon on a radius that crossed it, so half
   the month names were written over the moon's face. It is now a dial the
   moon sits at the centre of, wide enough that nothing overlaps. */

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
  const shift = (waning ? 1 : -1) * p * 104;

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      <defs>
        <clipPath id="moonclip"><circle cx="180" cy="150" r="52" /></clipPath>
        <radialGradient id="moonglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.68" stopColor="#fff6df" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff6df" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[[-80, 30], [-20, 70], [400, 40], [440, 96], [300, 18], [-40, 250], [420, 250], [120, 14], [250, 300]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <circle cx="180" cy="150" r="74" fill="url(#moonglow)" style={{ opacity: p, transition: "opacity 0.8s" }} />
      <circle cx="180" cy="150" r="52" fill="#f6ecd4" />
      {/* Maria. A full moon drawn as a plain disc reads as a lamp. */}
      <g clipPath="url(#moonclip)" opacity="0.5">
        <circle cx="164" cy="132" r="15" fill="#d9c9a6" />
        <circle cx="196" cy="122" r="8" fill="#d9c9a6" />
        <circle cx="200" cy="166" r="17" fill="#d9c9a6" />
        <circle cx="158" cy="174" r="9" fill="#d9c9a6" />
        <circle cx="176" cy="150" r="5" fill="#cfbe98" />
        <circle cx="212" cy="142" r="4" fill="#cfbe98" />
      </g>
      <g clipPath="url(#moonclip)">
        <circle cx={180 + shift} cy="150" r="52" fill="#0c3018" style={{ transition: "cx 1s cubic-bezier(0.22,1,0.36,1)" }} />
      </g>
      <circle cx="180" cy="150" r="52" fill="none" stroke="rgba(245,230,192,0.35)" strokeWidth="1.5" />
      {/* The dial the months sit on. */}
      <ellipse cx="180" cy="150" rx="228" ry="116" fill="none" stroke="rgba(232,184,75,0.14)" strokeWidth="1" />

      {/* Month ring */}
      {MONTHS.map((m, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = 180 + Math.cos(a) * 228;
        const y = 150 + Math.sin(a) * 116;
        const on = i === month;
        /* Names hang outside the dial, on the side the point faces. */
        const lx = 180 + Math.cos(a) * 250;
        const ly = 150 + Math.sin(a) * 134;
        const anchor = Math.abs(Math.cos(a)) < 0.25 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
        return (
          <g key={m} style={{ transition: "opacity 0.4s", opacity: month < 0 ? 0.55 : on ? 1 : 0.32 }}>
            <circle cx={x} cy={y} r={on ? 5 : 2.6} fill={on ? "var(--if-gold-light)" : "rgba(232,184,75,0.7)"} style={{ transition: "r 0.3s" }} />
            <text
              x={lx}
              y={ly + 4}
              textAnchor={anchor}
              fontSize={on ? 14 : 11}
              fill={on ? "var(--if-gold-light)" : "rgba(245,230,192,0.7)"}
              className="font-arabic"
              lang="ar"
              direction="rtl"
            >
              {m}
            </text>
          </g>
        );
      })}
    </g>
    </svg>
  );
}
