"use client";

import type { SceneProps } from "../Simulator";

/* The Seerah as a journey across the Hijaz.

   A stylised map: the Red Sea coast on the left, the peninsula's interior
   fading to the right, and the places that matter as named points. The route
   draws itself from Makkah to Madinah and a glowing marker travels stage by
   stage. Only the current stage's name is lit, so the eye reads one word at
   a time. */

type Place = { id: string; x: number; y: number; ar: string; te: string; en: string };

const PLACES: Place[] = [
  { id: "makkah", x: 150, y: 236, ar: "مكة", te: "మక్కా", en: "Makkah" },
  { id: "hira", x: 168, y: 214, ar: "حراء", te: "హిరా", en: "Hira" },
  { id: "taif", x: 206, y: 252, ar: "الطائف", te: "తాయిఫ్", en: "Ta'if" },
  { id: "badr", x: 122, y: 150, ar: "بدر", te: "బద్ర్", en: "Badr" },
  { id: "madinah", x: 164, y: 92, ar: "المدينة", te: "మదీనా", en: "Madinah" },
  { id: "uhud", x: 170, y: 74, ar: "أحد", te: "ఉహుద్", en: "Uhud" },
  { id: "hudaybiyyah", x: 130, y: 224, ar: "الحديبية", te: "హుదైబియా", en: "Hudaybiyyah" },
];

/* Which place each stage lights, and how far along the Makkah→Madinah route
   the marker sits (0 = Makkah, 1 = Madinah). */
const STAGE: Record<string, { at: string; t: number; night?: boolean }> = {
  birth: { at: "makkah", t: 0 },
  revelation: { at: "hira", t: 0, night: true },
  makkah: { at: "makkah", t: 0 },
  taif: { at: "taif", t: 0 },
  hijrah: { at: "madinah", t: 1 },
  badr: { at: "badr", t: 0.58 },
  uhud: { at: "uhud", t: 1 },
  hudaybiyyah: { at: "hudaybiyyah", t: 0.08 },
  conquest: { at: "makkah", t: 0 },
  farewell: { at: "makkah", t: 0 },
  legacy: { at: "madinah", t: 1 },
};

const ROUTE = "M150 236 C 120 200, 100 150, 122 150 S 160 120, 164 92";

export function JourneyMap({ step, lang, index }: SceneProps) {
  const s = STAGE[step.id] ?? { at: "makkah", t: 0 };
  const drawn = index >= 4 ? 1 : 0; // the route appears at the Hijrah

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="mk" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8b84b" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sea" x1="0" x2="1">
          <stop offset="0" stopColor="#1d4f6b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1d4f6b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sky / night */}
      <rect width="360" height="320" fill="#07240f" opacity={s.night ? 0.5 : 0} style={{ transition: "opacity 0.8s" }} />
      {s.night && [[40, 30], [90, 18], [300, 26], [330, 60], [250, 14]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* Red Sea, coastline, and the land mass */}
      <path d="M0 0 L90 0 Q70 80 96 160 Q120 240 80 320 L0 320 Z" fill="url(#sea)" />
      <path d="M90 0 Q70 80 96 160 Q120 240 80 320" fill="none" stroke="rgba(232,184,75,0.35)" strokeWidth="2" />
      {/* Contour hints */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${130 + i * 50} 0 Q ${150 + i * 50} 160 ${110 + i * 50} 320`} fill="none" stroke="rgba(232,184,75,0.08)" strokeWidth="1.5" />
      ))}

      {/* Route, drawn at the Hijrah */}
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

      {/* Places */}
      {PLACES.map((p) => {
        const lit = p.id === s.at;
        return (
          <g key={p.id} style={{ transition: "opacity 0.5s", opacity: lit ? 1 : 0.55 }}>
            <circle cx={p.x} cy={p.y} r={lit ? 5 : 3} fill={lit ? "var(--if-gold-light)" : "rgba(232,184,75,0.7)"} style={{ transition: "r 0.4s" }} />
            <text x={p.x + 9} y={p.y + 4} fontSize={lit ? 12 : 9} fontWeight={lit ? 700 : 500} fill={lit ? "var(--if-gold-light)" : "rgba(245,230,192,0.7)"} style={{ transition: "font-size 0.3s" }}>
              {lang === "te" ? p.te : p.en}
            </text>
          </g>
        );
      })}

      {/* The travelling marker: a glow that moves along the route. */}
      <g style={{ offsetPath: `path("${ROUTE}")`, offsetDistance: `${s.t * 100}%`, offsetRotate: "0deg", transition: "offset-distance 1.6s cubic-bezier(0.22, 1, 0.36, 1)" } as React.CSSProperties}>
        <circle r="18" fill="url(#mk)" className="if-breathe" />
        <circle r="5" fill="var(--if-gold-light)" stroke="var(--if-green)" strokeWidth="2" />
      </g>

      {/* Year stamp, top right */}
      <text x="346" y="30" textAnchor="end" fontSize="13" fontWeight="700" fill="rgba(245,230,192,0.85)" className="font-display">
        {step.caption ? step.caption[lang] : ""}
      </text>
    </svg>
  );
}
