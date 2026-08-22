"use client";

import type { SceneProps } from "../Simulator";

/* Fourteen centuries on one map.

   The world from Córdoba to Delhi, drawn the way the Seerah map is drawn:
   a few cities as named points, and for each era the reach of Muslim rule
   as a soft extent that grows, shifts and fades from the one before it. The
   capital of the age is the lit point. The colonial era breaks the extent
   into pieces; the modern one scatters it into many small lights. */

type City = { id: string; x: number; y: number; te: string; en: string };

const CITIES: City[] = [
  { id: "cordoba", x: 54, y: 112, te: "కొర్డోబా", en: "Córdoba" },
  { id: "istanbul", x: 154, y: 88, te: "ఇస్తాంబుల్", en: "Istanbul" },
  { id: "cairo", x: 166, y: 146, te: "కైరో", en: "Cairo" },
  { id: "damascus", x: 196, y: 118, te: "డమాస్కస్", en: "Damascus" },
  { id: "madinah", x: 206, y: 176, te: "మదీనా", en: "Madinah" },
  { id: "baghdad", x: 234, y: 126, te: "బగ్దాద్", en: "Baghdad" },
  { id: "delhi", x: 312, y: 150, te: "ఢిల్లీ", en: "Delhi" },
];

/* Extents as ellipses: centre, radii, and which city is the capital. */
type Era = { capital: string; blobs: [number, number, number, number][]; scatter?: boolean; broken?: boolean };

const ERAS: Record<string, Era> = {
  rashidun: { capital: "madinah", blobs: [[210, 150, 60, 44]] },
  umayyad:  { capital: "damascus", blobs: [[180, 136, 150, 52]] },
  abbasid:  { capital: "baghdad", blobs: [[230, 136, 100, 50], [64, 116, 30, 18]] },
  andalus:  { capital: "cordoba", blobs: [[64, 116, 36, 22], [230, 136, 90, 46]] },
  ottoman:  { capital: "istanbul", blobs: [[170, 120, 70, 52], [210, 176, 40, 30]] },
  mughal:   { capital: "delhi", blobs: [[300, 150, 46, 40], [170, 120, 70, 52]] },
  colonial: { capital: "istanbul", blobs: [[170, 120, 70, 52], [300, 150, 46, 40], [64, 116, 30, 18]], broken: true },
  modern:   { capital: "madinah", blobs: [], scatter: true },
};

const SCATTER = [[40, 120], [70, 100], [110, 150], [140, 110], [170, 130], [200, 160], [230, 110], [260, 140], [290, 120], [320, 160], [300, 190], [250, 200], [180, 200], [120, 190], [90, 170], [340, 130], [215, 90], [150, 175]];

export function EmpiresScene({ step, lang }: SceneProps) {
  const era = ERAS[step.id] ?? ERAS.rashidun;
  const T = "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease";

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="ext" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8b84b" stopOpacity="0.45" />
          <stop offset="0.7" stopColor="#e8b84b" stopOpacity="0.22" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Graticule and coastlines, suggested */}
      {[60, 120, 180, 240].map((y) => <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(232,184,75,0.07)" />)}
      {[60, 120, 180, 240, 300].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="320" stroke="rgba(232,184,75,0.07)" />)}
      <path d="M0 80 Q60 60 110 96 Q150 120 140 160 Q130 200 170 210 Q220 220 250 190 Q290 170 340 200" fill="none" stroke="rgba(232,184,75,0.22)" strokeWidth="1.5" />
      <path d="M20 180 Q60 170 90 200 Q120 240 160 250 Q220 262 270 230 Q300 220 360 240" fill="none" stroke="rgba(232,184,75,0.18)" strokeWidth="1.5" />

      {/* Three extent slots, so eras with fewer blobs fade the extras out. */}
      {[0, 1, 2].map((i) => {
        const b = era.blobs[i];
        const [cx, cy, rx, ry] = b ?? [180, 150, 20, 20];
        return (
          <g key={i} style={{ transform: `translate(${cx}px, ${cy}px) scale(${b ? rx / 50 : 0}, ${b ? ry / 50 : 0})`, transition: T, opacity: b ? 1 : 0 }}>
            <ellipse rx="50" ry="50" fill="url(#ext)" />
            <ellipse rx="50" ry="50" fill="none" stroke="var(--if-gold-light)" strokeWidth={era.broken ? 1 : 1.5} strokeDasharray={era.broken ? "4 5" : undefined} opacity="0.7" />
          </g>
        );
      })}

      {/* The modern world: many small lights */}
      {SCATTER.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--if-gold-light)" className={era.scatter ? "if-twinkle" : undefined} style={{ opacity: era.scatter ? 0.9 : 0, transition: "opacity 0.8s", animationDelay: `${i * 0.15}s` }} />
      ))}

      {CITIES.map((c) => {
        const lit = c.id === era.capital;
        return (
          <g key={c.id} style={{ transition: "opacity 0.5s", opacity: lit ? 1 : 0.6 }}>
            {lit && <circle cx={c.x} cy={c.y} r="14" fill="var(--if-gold-light)" opacity="0.25" className="if-breathe" />}
            <circle cx={c.x} cy={c.y} r={lit ? 5 : 3} fill={lit ? "var(--if-gold-light)" : "rgba(232,184,75,0.75)"} style={{ transition: "r 0.4s" }} />
            <text x={c.x + 8} y={c.y - 6} fontSize={lit ? 12 : 9} fontWeight={lit ? 700 : 500} fill={lit ? "var(--if-gold-light)" : "rgba(245,230,192,0.7)"}>
              {lang === "te" ? c.te : c.en}
            </text>
          </g>
        );
      })}

      <text x="346" y="300" textAnchor="end" fontSize="13" fontWeight="700" fill="rgba(245,230,192,0.85)">
        {step.caption ? step.caption[lang] : ""}
      </text>
    </svg>
  );
}
