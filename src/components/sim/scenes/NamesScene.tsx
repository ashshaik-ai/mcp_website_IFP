"use client";

import type { SceneProps } from "../Simulator";

/* The Beautiful Names, one at a time.

   A string of ninety-nine beads around the stage, the current one lit and a
   little larger, the name in calligraphy at the centre breathing as it is
   held. Nothing else: the meaning is the caption. The index is the bead —
   the first twelve names are the steps, and the rest of the string stays
   dim so the whole is always in view. */

export function NamesScene({ step, index }: SceneProps) {
  const N = 99;
  const cx = 180, cy = 150, RX = 236, RY = 118;

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      <defs>
        <radialGradient id="nameglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8b84b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The thread */}
      <ellipse cx={cx} cy={cy} rx={RX} ry={RY} fill="none" stroke="rgba(232,184,75,0.16)" strokeWidth="1" />

      {/* Beads */}
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * RX;
        const y = cy + Math.sin(a) * RY;
        const on = i === index;
        const done = i < index;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={on ? 6 : 2.2}
            fill={on ? "var(--if-gold-light)" : done ? "rgba(232,184,75,0.75)" : "rgba(232,184,75,0.3)"}
            style={{ transition: "r 0.4s cubic-bezier(0.22,1,0.36,1), fill 0.4s" }}
          />
        );
      })}

      {/* The name */}
      <circle cx={cx} cy={cy} r="118" fill="url(#nameglow)" className="if-breathe" />
      <g key={step.id} className="if-pop">
        <text x={cx} y={cy + 24} textAnchor="middle" fontSize="82" fill="var(--if-gold-light)" className="font-arabic" lang="ar" direction="rtl">
          {step.arabic}
        </text>
      </g>
      <text x={cx} y={cy + 66} textAnchor="middle" fontSize="15" fill="rgba(245,230,192,0.75)" fontStyle="italic">{step.translit}</text>
      <text x="462" y="304" textAnchor="end" fontSize="13" fill="rgba(245,230,192,0.55)" fontWeight="700">{index + 1} / {N}</text>
    </g>
    </svg>
  );
}
