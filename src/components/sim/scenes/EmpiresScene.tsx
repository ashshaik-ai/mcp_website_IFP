"use client";

import type { SceneProps } from "../Simulator";

/* Fourteen centuries on one map.

   The world from Cordoba to Delhi. A few cities as named points, and for each
   era the reach of Muslim rule as a soft extent that grows, shifts and fades
   from the one before it. The capital of the age is the lit point. The
   colonial era breaks the extent into pieces; the modern one scatters it into
   many small lights.

   Each city carries the side its name hangs on and how far above the dot it
   sits, because the extents pass straight over them -- Cordoba's name used to
   be swallowed by its own blob. */

type City = { id: string; x: number; y: number; te: string; en: string; side: "l" | "r"; dy?: number };

const CITIES: City[] = [
  { id: "cordoba", x: -34, y: 96, te: "కొర్డోబా", en: "Córdoba", side: "r", dy: -12 },
  { id: "istanbul", x: 104, y: 72, te: "ఇస్తాంబుల్", en: "Istanbul", side: "l", dy: -12 },
  { id: "cairo", x: 126, y: 158, te: "కైరో", en: "Cairo", side: "l", dy: 14 },
  { id: "damascus", x: 176, y: 112, te: "డమాస్కస్", en: "Damascus", side: "r", dy: -12 },
  { id: "madinah", x: 200, y: 196, te: "మదీనా", en: "Madinah", side: "l", dy: 16 },
  { id: "baghdad", x: 244, y: 124, te: "బగ్దాద్", en: "Baghdad", side: "r", dy: 16 },
  { id: "delhi", x: 392, y: 150, te: "ఢిల్లీ", en: "Delhi", side: "r", dy: -12 },
];

/* Extents as ellipses: centre, radii, and which city is the capital. */
type Era = { capital: string; blobs: [number, number, number, number][]; scatter?: boolean; broken?: boolean };

const ERAS: Record<string, Era> = {
  rashidun: { capital: "madinah", blobs: [[204, 172, 74, 54]] },
  umayyad:  { capital: "damascus", blobs: [[124, 140, 220, 62]] },
  abbasid:  { capital: "baghdad", blobs: [[248, 142, 132, 58], [-32, 98, 42, 26]] },
  andalus:  { capital: "cordoba", blobs: [[-32, 98, 50, 30], [248, 142, 120, 54]] },
  ottoman:  { capital: "istanbul", blobs: [[126, 118, 104, 60], [206, 196, 48, 34]] },
  mughal:   { capital: "delhi", blobs: [[382, 152, 68, 50], [126, 118, 104, 60]] },
  colonial: { capital: "istanbul", blobs: [[126, 118, 104, 60], [382, 152, 68, 50], [-32, 98, 42, 26]], broken: true },
  modern:   { capital: "madinah", blobs: [], scatter: true },
};

const SCATTER = [
  [-90, 120], [-40, 96], [10, 150], [60, 108], [110, 132], [156, 176], [200, 108], [250, 142],
  [292, 118], [336, 162], [372, 194], [408, 138], [440, 176], [76, 200], [22, 186], [-58, 168],
  [180, 60], [300, 74], [420, 96], [140, 232], [250, 236], [352, 244],
];

export function EmpiresScene({ step, lang }: SceneProps) {
  const era = ERAS[step.id] ?? ERAS.rashidun;
  const T = "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease";

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
        <defs>
          <radialGradient id="ext" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e8b84b" stopOpacity="0.42" />
            <stop offset="0.7" stopColor="#e8b84b" stopOpacity="0.2" />
            <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="landmass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8b84b" stopOpacity="0.09" />
            <stop offset="1" stopColor="#e8b84b" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Graticule, across the whole frame rather than the old centre box. */}
        {[40, 100, 160, 220, 280].map((y) => (
          <line key={y} x1="-120" y1={y} x2="480" y2={y} stroke="rgba(232,184,75,0.06)" />
        ))}
        {[-60, 0, 60, 120, 180, 240, 300, 360, 420].map((x) => (
          <line key={x} x1={x} y1="-10" x2={x} y2="334" stroke="rgba(232,184,75,0.06)" />
        ))}

        {/* Land, suggested rather than surveyed: Europe above, Africa below,
            Asia to the east, with the Mediterranean cut between them. */}
        <path
          d="M-120 -10 L480 -10 L480 334 L-120 334 Z"
          fill="url(#landmass)"
        />
        {/* The Mediterranean, the Red Sea and the Gulf: three shapes of water
            are enough to tell a reader where they are. Loose coastal squiggles
            were not -- they read as noise laid over the map. */}
        <path
          d="M-120 94 Q-46 78 34 90 Q108 102 170 94 Q158 120 96 128 Q14 136 -60 126 Q-98 120 -120 122 Z"
          fill="rgba(22,64,90,0.3)"
          stroke="rgba(232,184,75,0.16)"
          strokeWidth="1.2"
        />
        <path
          d="M188 150 Q204 186 188 222 Q181 240 168 248 Q177 212 174 180 Q173 160 188 150 Z"
          fill="rgba(22,64,90,0.26)"
          stroke="rgba(232,184,75,0.12)"
          strokeWidth="1.2"
        />
        <path
          d="M258 160 Q288 178 300 196 Q278 192 256 179 Q246 172 258 160 Z"
          fill="rgba(22,64,90,0.26)"
          stroke="rgba(232,184,75,0.12)"
          strokeWidth="1.2"
        />
        {/* The southern shore, and the coast running east. */}
        <path d="M-120 218 Q-30 236 60 228 Q130 222 168 250" fill="none" stroke="rgba(232,184,75,0.16)" strokeWidth="1.5" />
        <path d="M300 196 Q348 214 372 246 Q404 282 470 276" fill="none" stroke="rgba(232,184,75,0.16)" strokeWidth="1.5" />

        {/* Three extent slots, so eras with fewer blobs fade the extras out. */}
        {[0, 1, 2].map((i) => {
          const b = era.blobs[i];
          const [cx, cy, rx, ry] = b ?? [180, 150, 20, 20];
          return (
            <g
              key={i}
              style={{
                transform: `translate(${cx}px, ${cy}px) scale(${b ? rx / 50 : 0}, ${b ? ry / 50 : 0})`,
                transition: T,
                opacity: b ? 1 : 0,
              }}
            >
              <ellipse rx="50" ry="50" fill="url(#ext)" />
              <ellipse
                rx="50"
                ry="50"
                fill="none"
                stroke="var(--if-gold-light)"
                strokeWidth={era.broken ? 1 : 1.5}
                strokeDasharray={era.broken ? "4 5" : undefined}
                opacity="0.7"
              />
            </g>
          );
        })}

        {/* The modern world: many small lights. */}
        {SCATTER.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="var(--if-gold-light)"
            className={era.scatter ? "if-twinkle" : undefined}
            style={{ opacity: era.scatter ? 0.9 : 0, transition: "opacity 0.8s", animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {CITIES.map((c) => {
          const lit = c.id === era.capital;
          const dx = c.side === "r" ? 9 : -9;
          return (
            <g key={c.id} style={{ transition: "opacity 0.5s", opacity: lit ? 1 : 0.6 }}>
              {lit && <circle cx={c.x} cy={c.y} r="15" fill="var(--if-gold-light)" opacity="0.22" className="if-breathe" />}
              <circle
                cx={c.x}
                cy={c.y}
                r={lit ? 5 : 3}
                fill={lit ? "var(--if-gold-light)" : "rgba(232,184,75,0.75)"}
                style={{ transition: "r 0.4s" }}
              />
              <text
                x={c.x + dx}
                y={c.y + (c.dy ?? -8)}
                textAnchor={c.side === "r" ? "start" : "end"}
                className={lit ? "if-map-label if-map-label-lit" : "if-map-label"}
                fontSize={lit ? 13 : 10}
                fontWeight={lit ? 700 : 500}
                fill={lit ? "var(--if-gold-light)" : "rgba(245,230,192,0.7)"}
                stroke="#0a2c16"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {lang === "te" ? c.te : c.en}
              </text>
            </g>
          );
        })}

        <text x="462" y="304" textAnchor="end" fontSize="14" fontWeight="700" fill="rgba(245,230,192,0.85)" className="font-display">
          {step.caption ? step.caption[lang] : ""}
        </text>
      </g>
    </svg>
  );
}
