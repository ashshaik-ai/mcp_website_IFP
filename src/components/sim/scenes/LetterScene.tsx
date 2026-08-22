"use client";

import type { SceneProps } from "../Simulator";

/* A letter, written.

   Script letters are revealed the way a pen would lay them down — from the
   right, since both Arabic and Urdu run that way — with a nib that travels
   ahead of the ink. The reveal is a clip rectangle widening on a transition,
   so a new letter wipes in and the previous one is gone. Under it, the same
   letter in its four positional forms, the current one lit. */

export function LetterScene({ step, index }: SceneProps) {
  /* Step id is the letter itself. The four positional forms come in meta as
     "isolated initial medial final". */
  const letter = step.id;
  const parts = (step.meta ?? "").split(" ");
  const urdu = parts[4] === "ur";
  const forms = parts.slice(0, 4);

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={`wipe-${index}`}>
          <rect className="if-wipe" x="40" y="20" width="280" height="200" />
        </clipPath>
      </defs>
      {/* Baseline */}
      <line x1="70" y1="178" x2="290" y2="178" stroke="rgba(232,184,75,0.25)" strokeWidth="1.5" strokeDasharray="3 5" />

      <g key={index} clipPath={`url(#wipe-${index})`}>
        <text x="180" y="160" textAnchor="middle" fontSize={urdu ? 118 : 136} fill="var(--if-gold-light)" className={urdu ? "font-urdu" : "font-arabic"} lang={urdu ? "ur" : "ar"} direction="rtl">
          {letter}
        </text>
      </g>
      {/* The nib */}
      <g key={`nib-${index}`} className="if-nib">
        <path d="M0 0 L-6 -18 L6 -18 Z" fill="var(--if-gold)" />
        <rect x="-4" y="-40" width="8" height="22" rx="2" fill="rgba(245,230,192,0.8)" />
      </g>

      {forms.length === 4 && (
        <g>
          {forms.map((f, i) => (
            <g key={i} style={{ opacity: 0.85 }}>
              <rect x={40 + i * 72} y="226" width="60" height="60" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(232,184,75,0.25)" />
              <text x={70 + i * 72} y="268" textAnchor="middle" fontSize="30" fill="var(--if-gold-pale)" className={urdu ? "font-urdu" : "font-arabic"} lang={urdu ? "ur" : "ar"} direction="rtl">{f}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
