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

/* Tajweed is taught in colour, so the rules keep their own hues -- but the
   neon versions of them sat outside the site's palette and read as a bug next
   to the gold. These are the same four hues held down to the warmth of the
   rest of the page. */
const RULE_COLOR: Record<string, string> = { madd: "#8fc6df", lafz: "#e2a08d", ghunna: "#a3c69a", qalqala: "#c3a2cd" };

export function TajweedScene({ step, index }: SceneProps) {
  /* The step id names the lit word: w0..w3, or "all". */
  const lit = step.id === "all" ? -1 : Number(step.id.replace("w", "")) || 0;
  const rule = WORDS[lit]?.rule;

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      {/* A page edge */}
      {/* The page, with the double rule a mushaf carries round its text. */}
      <rect x="-84" y="30" width="528" height="264" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(232,184,75,0.28)" />
      <rect x="-74" y="40" width="508" height="244" rx="9" fill="none" stroke="rgba(232,184,75,0.14)" />
      <path d="M-56 62 Q180 50 416 62" fill="none" stroke="rgba(232,184,75,0.28)" />
      <path d="M-56 268 Q180 280 416 268" fill="none" stroke="rgba(232,184,75,0.18)" />

      {/* The ayah, right to left */}
      <g>
        {WORDS.map((w, i) => {
          const x = 386 - i * 138;
          const on = lit === i || lit === -1;
          return (
            <g key={i} style={{ transition: "opacity 0.5s", opacity: on ? 1 : 0.4 }}>
              <rect
                x={x - 64}
                y="112"
                width="128"
                height="70"
                rx="10"
                fill="var(--if-gold)"
                style={{ opacity: lit === i ? 0.22 : 0, transform: lit === i ? "scale(1)" : "scale(0.8)", transformBox: "fill-box", transformOrigin: "center", transition: "opacity 0.4s, transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              />
              <text
                x={x}
                y="168"
                textAnchor="middle"
                fontSize={lit === i ? 54 : 46}
                fill={lit === i && w.rule ? RULE_COLOR[w.rule] : lit === i ? "var(--if-gold-light)" : "rgba(245,230,192,0.85)"}
                className="font-arabic"
                style={{ transition: "font-size 0.4s, fill 0.4s" }}
                lang="ar"
                direction="rtl"
              >
                {w.ar}
              </text>
              <text x={x} y="206" textAnchor="middle" fontSize="13" fill="rgba(245,230,192,0.7)" fontStyle="italic">{w.tr}</text>
            </g>
          );
        })}
      </g>

      {/* Rule plate */}
      {rule && (
        <g key={`${index}-${rule}`} className="if-pop">
          <rect x="94" y="234" width="172" height="34" rx="17" fill={RULE_COLOR[rule]} opacity="0.18" stroke={RULE_COLOR[rule]} strokeWidth="1" />
          <text x="180" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill={RULE_COLOR[rule]}>
            {rule === "madd" ? "Madd — stretch" : rule === "lafz" ? "Lafz al-Jalalah" : rule}
          </text>
        </g>
      )}
    </g>
    </svg>
  );
}

/* Marked continuous: the engine keeps one instance alive across steps so
   the scene tweens instead of cutting. The ayah stays on screen and the reading moves along it. Cutting
   between words lost the sense of a line being read. */
TajweedScene.continuous = true;
