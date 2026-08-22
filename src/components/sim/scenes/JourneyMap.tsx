"use client";

import type { SceneProps } from "../Simulator";

/* The Seerah as a journey across the Hijaz.

   A stylised map: the Red Sea running down the left, the interior fading to
   the right, and the places that matter as named points. The route draws
   itself from Makkah to Madinah and a glowing marker travels stage by stage.
   Only the current stage's name is lit, so the eye reads one word at a time.

   Every label carries the side it hangs on. They used to hang uniformly to
   the right, which stacked "Hudaybiyyah" straight over "Makkah" -- two places
   thirteen miles apart, and the words on top of each other. */

type Place = {
  id: string;
  x: number;
  y: number;
  te: string;
  en: string;
  /** Which side of the dot the name sits on. */
  side: "l" | "r";
  /** Vertical nudge, for the pairs that sit close together. */
  dy?: number;
};

const PLACES: Place[] = [
  { id: "uhud", x: 214, y: 62, te: "ఉహుద్", en: "Uhud", side: "r" },
  { id: "madinah", x: 196, y: 100, te: "మదీనా", en: "Madinah", side: "r" },
  { id: "badr", x: 96, y: 152, te: "బద్ర్", en: "Badr", side: "l" },
  { id: "hudaybiyyah", x: 104, y: 232, te: "హుదైబియా", en: "Hudaybiyyah", side: "l" },
  { id: "hira", x: 228, y: 214, te: "హిరా", en: "Hira", side: "r" },
  { id: "makkah", x: 172, y: 256, te: "మక్కా", en: "Makkah", side: "l", dy: 14 },
  { id: "taif", x: 276, y: 274, te: "తాయిఫ్", en: "Ta'if", side: "r" },
];

/* Which place each stage lights, and how far along the Makkah->Madinah route
   the marker sits (0 = Makkah, 1 = Madinah). */
const STAGE: Record<string, { at: string; t: number; night?: boolean }> = {
  birth: { at: "makkah", t: 0 },
  revelation: { at: "hira", t: 0, night: true },
  makkah: { at: "makkah", t: 0 },
  taif: { at: "taif", t: 0 },
  hijrah: { at: "madinah", t: 1 },
  badr: { at: "badr", t: 0.55 },
  uhud: { at: "uhud", t: 1 },
  hudaybiyyah: { at: "hudaybiyyah", t: 0.06 },
  conquest: { at: "makkah", t: 0 },
  farewell: { at: "makkah", t: 0 },
  legacy: { at: "madinah", t: 1 },
};

const ROUTE = "M172 256 C 128 214, 90 186, 96 152 S 164 130, 196 100";

export function JourneyMap({ step, lang, index }: SceneProps) {
  const s = STAGE[step.id] ?? { at: "makkah", t: 0 };
  const drawn = index >= 4 ? 1 : 0; // the route appears at the Hijrah

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
        <defs>
          <radialGradient id="mk" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8b84b" />
            <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sea" x1="0" x2="1">
            <stop offset="0" stopColor="#16405a" stopOpacity="0.75" />
            <stop offset="1" stopColor="#16405a" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8b84b" stopOpacity="0.08" />
            <stop offset="1" stopColor="#e8b84b" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Night, for the cave of Hira. */}
        <rect x="-120" y="-10" width="700" height="344" fill="#061a0d" opacity={s.night ? 0.5 : 0} style={{ transition: "opacity 0.8s" }} />
        {s.night &&
          [[-60, 40], [20, 22], [300, 30], [400, 64], [220, 16], [430, 22]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.6" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}

        {/* Land, then the Red Sea cut out of its western edge. */}
        <path d="M40 -10 Q14 76 52 158 Q84 244 40 334 L480 334 L480 -10 Z" fill="url(#land)" />
        <path d="M-120 -10 L40 -10 Q14 76 52 158 Q84 244 40 334 L-120 334 Z" fill="url(#sea)" />
        <path d="M40 -10 Q14 76 52 158 Q84 244 40 334" fill="none" stroke="rgba(232,184,75,0.4)" strokeWidth="2" />

        {/* Interior: dry contour lines and a scatter of low ranges. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${120 + i * 78} -10 Q ${146 + i * 78} 160 ${104 + i * 78} 334`}
            fill="none"
            stroke="rgba(232,184,75,0.06)"
            strokeWidth="1.5"
          />
        ))}
        {[[300, 120], [352, 190], [268, 44], [400, 268], [330, 300]].map(([x, y], i) => (
          <path key={i} d={`M${x - 20} ${y} L${x - 7} ${y - 13} L${x + 4} ${y} Z M${x + 1} ${y} L${x + 12} ${y - 10} L${x + 22} ${y} Z`} fill="rgba(232,184,75,0.12)" />
        ))}

        {/* Compass, north-up, in the empty east. */}
        <g transform="translate(430, 62)" opacity="0.45">
          <circle r="17" fill="none" stroke="rgba(232,184,75,0.4)" strokeWidth="1" />
          <path d="M0 -14 L4 0 L0 4 L-4 0 Z" fill="var(--if-gold-light)" />
          <path d="M0 14 L4 0 L0 -4 L-4 0 Z" fill="rgba(232,184,75,0.35)" />
          <text x="0" y="-21" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(245,230,192,0.8)">N</text>
        </g>

        {/* Route, drawn at the Hijrah. */}
        <path d={ROUTE} fill="none" stroke="rgba(232,184,75,0.25)" strokeWidth="2" strokeDasharray="4 6" />
        <path
          d={ROUTE}
          fill="none"
          stroke="var(--if-gold-light)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - drawn}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />

        {/* Places. */}
        {PLACES.map((p) => {
          const lit = p.id === s.at;
          const dx = p.side === "r" ? 10 : -10;
          return (
            <g key={p.id} style={{ transition: "opacity 0.5s", opacity: lit ? 1 : 0.5 }}>
              <circle
                cx={p.x}
                cy={p.y}
                r={lit ? 5 : 3}
                fill={lit ? "var(--if-gold-light)" : "rgba(232,184,75,0.7)"}
                style={{ transition: "r 0.4s" }}
              />
              <text
                x={p.x + dx}
                y={p.y + 4 + (p.dy ?? 0)}
                textAnchor={p.side === "r" ? "start" : "end"}
                fontSize={lit ? 13 : 10}
                fontWeight={lit ? 700 : 500}
                fill={lit ? "var(--if-gold-light)" : "rgba(245,230,192,0.7)"}
                style={{ transition: "font-size 0.3s" }}
              >
                {lang === "te" ? p.te : p.en}
              </text>
            </g>
          );
        })}

        {/* The travelling marker: a glow that moves along the route. */}
        <g
          style={
            {
              offsetPath: `path("${ROUTE}")`,
              offsetDistance: `${s.t * 100}%`,
              offsetRotate: "0deg",
              transition: "offset-distance 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
            } as React.CSSProperties
          }
        >
          <circle r="18" fill="url(#mk)" className="if-breathe" />
          <circle r="5" fill="var(--if-gold-light)" stroke="var(--if-green)" strokeWidth="2" />
        </g>

        {/* Year stamp, top right. */}
        <text x="462" y="126" textAnchor="end" fontSize="15" fontWeight="700" fill="rgba(245,230,192,0.85)" className="font-display">
          {step.caption ? step.caption[lang] : ""}
        </text>
      </g>
    </svg>
  );
}
