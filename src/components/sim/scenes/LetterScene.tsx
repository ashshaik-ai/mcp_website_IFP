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
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      <defs>
        <clipPath id={`wipe-${index}`}>
          <rect className="if-wipe" x="-100" y="10" width="560" height="212" />
        </clipPath>
      </defs>
      {/* Baseline */}
      <line x1="-70" y1="182" x2="430" y2="182" stroke="rgba(232,184,75,0.25)" strokeWidth="1.5" strokeDasharray="3 5" />

      <g key={index} clipPath={`url(#wipe-${index})`}>
        <text x="180" y="164" textAnchor="middle" fontSize={urdu ? 130 : 150} fill="var(--if-gold-light)" className={urdu ? "font-urdu" : "font-arabic"} lang={urdu ? "ur" : "ar"} direction="rtl">
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
              <rect x={-2 + i * 94} y="228" width="80" height="68" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(232,184,75,0.25)" />
              <text x={38 + i * 94} y="278" textAnchor="middle" fontSize="36" fill="var(--if-gold-pale)" className={urdu ? "font-urdu" : "font-arabic"} lang={urdu ? "ur" : "ar"} direction="rtl">{f}</text>
            </g>
          ))}
        </g>
      )}
    </g>
    </svg>
  );
}

/* Marked continuous: the engine keeps one instance alive across steps so
   the scene tweens instead of cutting. The sheet and the baseline stay; only the letter is rewritten,
   and that has its own keyed wipe. */
LetterScene.continuous = true;
