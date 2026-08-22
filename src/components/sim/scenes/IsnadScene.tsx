"use client";

import type { SceneProps } from "../Simulator";

/* How a hadith reached us.

   A chain of narrators from the Prophet ﷺ down to the collector, each a lit
   node, each link drawing itself as the chain is followed. The step index is
   how far down the chain we are. The names are the ones any introduction to
   hadith teaches, for the most-quoted chain in Bukhari. */

const CHAIN = [
  { ar: "النبي ﷺ", te: "ప్రవక్త ﷺ", en: "The Prophet ﷺ" },
  { ar: "عمر بن الخطاب", te: "ఉమర్ ఇబ్న్ ఖత్తాబ్", en: "Umar ibn al-Khattab" },
  { ar: "علقمة بن وقاص", te: "అల్ఖమా ఇబ్న్ వఖ్ఖాస్", en: "Alqamah ibn Waqqas" },
  { ar: "محمد بن إبراهيم", te: "ముహమ్మద్ ఇబ్న్ ఇబ్రాహీమ్", en: "Muhammad ibn Ibrahim" },
  { ar: "يحيى بن سعيد", te: "యహ్యా ఇబ్న్ సఈద్", en: "Yahya ibn Sa'id" },
  { ar: "سفيان", te: "సుఫ్యాన్", en: "Sufyan" },
  { ar: "الحميدي", te: "అల్-హుమైదీ", en: "Al-Humaydi" },
  { ar: "البخاري", te: "అల్-బుఖారీ", en: "Al-Bukhari" },
];

export function IsnadScene({ index, lang }: SceneProps) {
  const reached = Math.min(index, CHAIN.length - 1);
  const y = (i: number) => 36 + i * 36;

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {CHAIN.map((n, i) => {
        const on = i <= reached;
        const now = i === reached;
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1="96" y1={y(i - 1) + 10} x2="96" y2={y(i) - 10}
                stroke="var(--if-gold-light)" strokeWidth="2.5" strokeLinecap="round"
                pathLength={1}
                className={on ? "if-draw" : undefined}
                style={{ opacity: on ? 1 : 0.18, strokeDasharray: on ? undefined : "2 4" }}
              />
            )}
            <circle cx="96" cy={y(i)} r={now ? 10 : 7} fill={on ? "var(--if-gold-light)" : "rgba(232,184,75,0.2)"} stroke={on ? "var(--if-green)" : "rgba(232,184,75,0.5)"} strokeWidth="2" style={{ transition: "r 0.3s, fill 0.4s" }} className={now ? "if-breathe" : undefined} />
            <text x="118" y={y(i) + 4} fontSize={now ? 14 : 12} fontWeight={now ? 700 : 500} fill={on ? "var(--if-gold-light)" : "rgba(245,230,192,0.45)"} style={{ transition: "fill 0.4s, font-size 0.3s" }}>
              {lang === "te" ? n.te : n.en}
            </text>
            <text x="344" y={y(i) + 4} textAnchor="end" fontSize="13" fill={on ? "rgba(245,230,192,0.85)" : "rgba(245,230,192,0.3)"} className="font-arabic" lang="ar" direction="rtl" style={{ transition: "fill 0.4s" }}>
              {n.ar}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
