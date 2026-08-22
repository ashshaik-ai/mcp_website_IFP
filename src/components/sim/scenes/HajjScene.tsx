"use client";

import type { SceneProps } from "../Simulator";

/* Hajj and Umrah, seen from above.

   One scene per rite. Tawaf: the Kaaba with a pilgrim circling it
   anticlockwise, a lap counter ticking to seven. Sa'i: the walk between Safa
   and Marwa, back and forth. Arafah: a single figure under a wide sky.
   Muzdalifah: night, with pebbles gathered. Rami: pebbles thrown at the
   pillar. Everything is transform and opacity. */

const Kaaba = ({ x = 180, y = 160, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g style={{ transform: `translate(${x}px, ${y}px) scale(${s})` }}>
    <rect x="-26" y="-26" width="52" height="52" fill="#0f0f0f" stroke="var(--if-gold)" strokeWidth="2.5" />
    <rect x="-26" y="-8" width="52" height="6" fill="var(--if-gold)" opacity="0.9" />
    <circle cx="-20" cy="12" r="3" fill="var(--if-gold-light)" />
  </g>
);

const Pilgrim = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <g className={className} style={style}>
    <circle r="6" fill="#fff6df" />
    <circle r="2.5" cy="-1" fill="var(--if-green)" />
  </g>
);

export function HajjScene({ step, playing }: SceneProps) {
  const ps = playing ? "running" : "paused";
  const id = step.id;

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="0.4" stopColor="#e8b84b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {(id === "ihram" || id === "tawaf" || id === "tawaf-ifadah" || id === "tawaf-wida") && (
        <g>
          {/* Mataf rings */}
          {[54, 80, 106].map((r, i) => (
            <circle key={r} cx="180" cy="160" r={r} fill="none" stroke="rgba(232,184,75,0.18)" strokeWidth={i === 0 ? 2 : 1} />
          ))}
          <Kaaba />
          {/* Crowd: many faint pilgrims orbiting at different radii and speeds */}
          {[66, 92, 118].map((r, ring) =>
            Array.from({ length: 8 + ring * 4 }).map((_, i) => (
              <g key={`${ring}-${i}`} className="if-orbit" style={{ transformOrigin: "180px 160px", animationDuration: `${18 + ring * 8}s`, animationDelay: `-${(i / (8 + ring * 4)) * (18 + ring * 8)}s`, animationPlayState: ps, opacity: 0.35 }}>
                <circle cx={180 + r} cy="160" r="2.6" fill="#fff6df" />
              </g>
            )),
          )}
          {/* Our pilgrim, the bright one, when the rite is tawaf */}
          {id !== "ihram" && (
            <g className="if-orbit" style={{ transformOrigin: "180px 160px", animationDuration: "6s", animationPlayState: ps }}>
              <Pilgrim style={{ transform: "translate(246px, 160px)" }} />
            </g>
          )}
          {id === "ihram" && (
            <g style={{ transform: "translate(180px, 262px)" }}>
              <Pilgrim />
              <path d="M-14 6 Q0 -4 14 6 L12 26 L-12 26 Z" fill="#fff6df" opacity="0.95" />
            </g>
          )}
        </g>
      )}

      {id === "sai" && (
        <g>
          {/* Safa (left) and Marwa (right) as two low hills, a lit path between */}
          <path d="M20 230 Q60 180 100 230 Z" fill="rgba(232,184,75,0.25)" />
          <path d="M260 230 Q300 180 340 230 Z" fill="rgba(232,184,75,0.25)" />
          <line x1="60" y1="236" x2="300" y2="236" stroke="rgba(232,184,75,0.3)" strokeWidth="10" strokeLinecap="round" />
          <line x1="150" y1="236" x2="210" y2="236" stroke="var(--if-gold)" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
          <text x="60" y="262" textAnchor="middle" fontSize="12" fill="rgba(245,230,192,0.8)" fontWeight="700">صفا</text>
          <text x="300" y="262" textAnchor="middle" fontSize="12" fill="rgba(245,230,192,0.8)" fontWeight="700">مروة</text>
          <g className="if-shuttle" style={{ animationPlayState: ps }}>
            <Pilgrim style={{ transform: "translate(60px, 224px)" }} />
          </g>
        </g>
      )}

      {id === "arafah" && (
        <g>
          <circle cx="290" cy="70" r="60" fill="url(#sun)" className="if-breathe" />
          <path d="M0 250 Q90 200 180 240 Q270 280 360 230 L360 320 L0 320 Z" fill="rgba(232,184,75,0.18)" />
          {/* Jabal ar-Rahmah */}
          <path d="M120 246 Q180 170 240 246 Z" fill="rgba(232,184,75,0.35)" />
          <g style={{ transform: "translate(180px, 236px)" }}>
            <Pilgrim />
            <path d="M-10 -2 Q0 -12 10 -2" fill="none" stroke="#fff6df" strokeWidth="2.5" className="if-breathe" />
          </g>
        </g>
      )}

      {id === "muzdalifah" && (
        <g>
          <rect width="360" height="320" fill="#07240f" opacity="0.55" />
          {[[30, 40], [70, 22], [120, 50], [200, 18], [260, 44], [320, 30], [340, 80], [20, 90]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.7" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
          <circle cx="300" cy="60" r="16" fill="#fff6df" opacity="0.9" />
          <circle cx="308" cy="54" r="14" fill="#0c3018" />
          <path d="M0 260 Q180 230 360 260 L360 320 L0 320 Z" fill="rgba(232,184,75,0.15)" />
          <g style={{ transform: "translate(180px, 250px)" }}>
            <Pilgrim />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={i} cx={-24 + i * 8} cy="18" r="2.4" fill="var(--if-gold-light)" className="if-pop" style={{ animationDelay: `${0.3 + i * 0.25}s`, animationPlayState: ps }} />
            ))}
          </g>
        </g>
      )}

      {id === "rami" && (
        <g>
          {/* Jamarat pillar */}
          <rect x="246" y="90" width="18" height="150" rx="4" fill="rgba(232,184,75,0.35)" stroke="var(--if-gold)" strokeWidth="2" />
          <ellipse cx="255" cy="240" rx="48" ry="9" fill="none" stroke="rgba(232,184,75,0.4)" strokeWidth="2" />
          <g style={{ transform: "translate(110px, 232px)" }}>
            <Pilgrim />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={i} r="2.6" fill="var(--if-gold-light)" className="if-throw" style={{ animationDelay: `${i * 0.45}s`, animationPlayState: ps }} />
            ))}
          </g>
        </g>
      )}

      {(id === "sacrifice" || id === "halq") && (
        <g>
          <path d="M0 250 Q180 220 360 250 L360 320 L0 320 Z" fill="rgba(232,184,75,0.15)" />
          <g style={{ transform: "translate(180px, 232px)" }}>
            <Pilgrim />
            {id === "halq" && <path d="M-9 -12 Q0 -20 9 -12" fill="none" stroke="var(--if-gold-light)" strokeWidth="2.5" className="if-breathe" />}
            {id === "sacrifice" && <circle cx="40" cy="10" r="9" fill="rgba(245,230,192,0.7)" />}
          </g>
        </g>
      )}

      {id === "mina" && (
        <g>
          <path d="M0 250 Q180 230 360 250 L360 320 L0 320 Z" fill="rgba(232,184,75,0.15)" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M${40 + i * 36} 244 L${58 + i * 36} 214 L${76 + i * 36} 244 Z`} fill="#fff6df" opacity={0.85 - (i % 3) * 0.15} />
          ))}
          <g style={{ transform: "translate(180px, 268px)" }}><Pilgrim /></g>
        </g>
      )}
    </svg>
  );
}
