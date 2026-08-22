"use client";

import type { SceneProps } from "../Simulator";

/* Recitation, word by word.

   The opening of Al-Fatiha laid out as a line of Arabic. Each step lights one
   word — a soft gold plate slides under it, the word brightens, the rest sit
   back — so the eye follows the recitation the way a finger follows a page.
   Where a word carries a tajweed rule, its letters that matter take the
   rule's colour, which is the only colour on the page that is not gold. */

const WORDS = [
  { ar: "بِسْمِ", tr: "Bismi" },
  { ar: "اللَّهِ", tr: "llāhi", rule: "lafz" },
  { ar: "الرَّحْمَٰنِ", tr: "r-Raḥmāni", rule: "madd" },
  { ar: "الرَّحِيمِ", tr: "r-Raḥīm", rule: "madd" },
];

const RULE_COLOR: Record<string, string> = { madd: "#6fd3ff", lafz: "#ffb3b3", ghunna: "#9be7a5", qalqala: "#f5a3ff" };

export function TajweedScene({ step, index }: SceneProps) {
  /* The step id names the lit word: w0..w3, or "all". */
  const lit = step.id === "all" ? -1 : Number(step.id.replace("w", "")) || 0;
  const rule = WORDS[lit]?.rule;

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* A page edge */}
      <rect x="24" y="40" width="312" height="240" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(232,184,75,0.25)" />
      <path d="M40 60 Q180 50 320 60" fill="none" stroke="rgba(232,184,75,0.3)" />

      {/* The ayah, right to left */}
      <g>
        {WORDS.map((w, i) => {
          const x = 312 - i * 76;
          const on = lit === i || lit === -1;
          return (
            <g key={i} style={{ transition: "opacity 0.5s", opacity: on ? 1 : 0.4 }}>
              <rect
                x={x - 36}
                y="118"
                width="72"
                height="56"
                rx="10"
                fill="var(--if-gold)"
                style={{ opacity: lit === i ? 0.22 : 0, transform: lit === i ? "scale(1)" : "scale(0.8)", transformBox: "fill-box", transformOrigin: "center", transition: "opacity 0.4s, transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <text
                x={x}
                y="158"
                textAnchor="middle"
                fontSize={lit === i ? 34 : 30}
                fill={lit === i && w.rule ? RULE_COLOR[w.rule] : lit === i ? "var(--if-gold-light)" : "rgba(245,230,192,0.85)"}
                className="font-arabic"
                style={{ transition: "font-size 0.4s, fill 0.4s" }}
                lang="ar"
                direction="rtl"
              >
                {w.ar}
              </text>
              <text x={x} y="196" textAnchor="middle" fontSize="11" fill="rgba(245,230,192,0.7)" fontStyle="italic">{w.tr}</text>
            </g>
          );
        })}
      </g>

      {/* Rule plate */}
      {rule && (
        <g key={`${index}-${rule}`} className="if-pop">
          <rect x="110" y="224" width="140" height="30" rx="15" fill={RULE_COLOR[rule]} opacity="0.18" stroke={RULE_COLOR[rule]} strokeWidth="1" />
          <text x="180" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill={RULE_COLOR[rule]}>
            {rule === "madd" ? "Madd — stretch" : rule === "lafz" ? "Lafz al-Jalalah" : rule}
          </text>
        </g>
      )}
    </svg>
  );
}
