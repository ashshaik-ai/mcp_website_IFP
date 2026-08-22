"use client";

import type { SceneProps } from "../Simulator";

/* Hajj and Umrah, one scene per rite.

   Tawaf: the Kaaba from above with the mataf turning around it. Sa'i: the
   gallery between Safa and Marwa, walked back and forth. Mina: the tent city
   in three ranks. Arafah: one figure under a wide sky. Muzdalifah: night, and
   pebbles gathered. Rami: pebbles thrown at the pillar.

   Every scene stands on the same ground: a band that fades downward rather
   than the flat slab that used to run to the bottom edge, with a dim ridge
   behind it for depth. Everything is transform and opacity. */

/* Repeatable pseudo-randomness: the same index always gives the same value,
   so the server render and the client render agree. */
const jitter = (i: number, k: number) => {
  const v = Math.sin(i * 12.9898 + k * 4.1414) * 43758.5453;
  return v - Math.floor(v);
};

/* The horizon sits a third of the way down rather than near the foot, so the
   scenes have a sky over them instead of a wall of empty green. Three planes:
   a rocky skyline, a dim middle distance, and the ground the figures stand
   on. */
const Ground = ({ night = false }: { night?: boolean }) => (
  <g>
    <path
      d="M-120 196 L-60 150 L-16 182 L28 140 L86 186 L140 158 L188 190 L244 146 L300 188 L352 160 L404 192 L452 166 L480 190 L480 232 L-120 232 Z"
      fill="rgba(232,184,75,0.07)"
    />
    <path d="M-120 214 Q-30 194 40 208 Q130 226 210 204 Q300 180 380 202 Q440 218 480 208 L480 250 L-120 250 Z" fill="rgba(232,184,75,0.1)" />
    <path
      d="M-120 232 Q0 218 120 228 Q260 240 380 222 Q440 214 480 218 L480 330 L-120 330 Z"
      fill={night ? "url(#sandNight)" : "url(#sand)"}
    />
    <path d="M-120 232 Q0 218 120 228 Q260 240 380 222 Q440 214 480 218" fill="none" stroke="rgba(232,184,75,0.32)" strokeWidth="1.5" />
  </g>
);

/* One rank of the tent city. Rank 0 is the far edge of the valley; each rank
   after it is nearer, larger and brighter, which is what makes rows of domes
   read as distance rather than as a pattern. */
const TentRank = ({ y, w, n, o, lamps = false, ps = "paused" }: { y: number; w: number; n: number; o: number; lamps?: boolean; ps?: string }) => {
  const gap = 600 / n;
  return (
    <g opacity={o}>
      {Array.from({ length: n + 1 }).map((_, i) => {
        /* Deterministic jitter: a real camp is not a comb. Math.random would
           differ between the server render and the client one. */
        const j = jitter(i, y);
        const k = jitter(i, y + 31);
        if (k > 0.93) return null;
        const cx = -120 + i * gap + (j - 0.5) * gap * 0.5;
        const ww = w * (0.82 + k * 0.36);
        return (
          <g key={i}>
            <ellipse cx={cx} cy={y} rx={ww * 0.62} ry={ww * 0.1} fill="#000" opacity="0.22" />
            <path d={`M${cx - ww / 2} ${y} Q${cx} ${y - ww * 0.72} ${cx + ww / 2} ${y} Z`} fill="url(#tent)" />
            <path d={`M${cx - ww / 2} ${y} Q${cx} ${y - ww * 0.72} ${cx + ww / 2} ${y}`} fill="none" stroke="#8f7f5c" strokeOpacity="0.35" strokeWidth="0.8" />
            {lamps && (
              <circle
                cx={cx}
                cy={y - 7}
                r="2.2"
                fill="var(--if-gold-light)"
                className="if-twinkle"
                style={{ animationDelay: `${i * 0.4}s`, animationPlayState: ps }}
              />
            )}
          </g>
        );
      })}
    </g>
  );
};

const Kaaba = ({ x = 180, y = 148, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g style={{ transform: `translate(${x}px, ${y}px) scale(${s})` }}>
    <rect x="-27" y="-27" width="54" height="54" rx="2" fill="#0d0d0d" stroke="var(--if-gold)" strokeWidth="2.5" />
    <rect x="-27" y="-9" width="54" height="7" fill="var(--if-gold)" opacity="0.9" />
    <rect x="-27" y="-27" width="54" height="4" fill="var(--if-gold)" opacity="0.55" />
    {/* Hajar al-Aswad, at the corner tawaf starts from. */}
    <circle cx="-21" cy="13" r="3.4" fill="var(--if-gold-light)" />
  </g>
);

const Pilgrim = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <g className={className} style={style}>
    <circle r="6" fill="#fff6df" />
    <circle r="2.5" cy="-1" fill="var(--if-green)" />
  </g>
);

/* A standing pilgrim in ihram, seen side on: two cloths, no stitching. */
const Standing = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g style={{ transform: `translate(${x}px, ${y}px) scale(${s})` }}>
    <ellipse cx="0" cy="2" rx="14" ry="4" fill="#000" opacity="0.3" />
    <path d="M-9 0 L-6 -26 L6 -26 L9 0 Z" fill="#fff6df" opacity="0.92" />
    <path d="M-8 -26 L8 -26 L5 -42 L-5 -42 Z" fill="#fff6df" opacity="0.75" />
    <circle cx="0" cy="-49" r="7" fill="#fff6df" />
  </g>
);

/* One pointed arch of the sa'i gallery. */
const Arch = ({ x, w = 26, h = 40, o = 0.22 }: { x: number; w?: number; h?: number; o?: number }) => (
  <path
    d={`M${x - w / 2} 250 L${x - w / 2} ${250 - h + w / 2} Q${x - w / 2} ${250 - h} ${x} ${250 - h - 6} Q${x + w / 2} ${250 - h} ${x + w / 2} ${250 - h + w / 2} L${x + w / 2} 250 Z`}
    fill="none"
    stroke="var(--if-gold)"
    strokeOpacity={o}
    strokeWidth="2"
  />
);

export function HajjScene({ step, playing }: SceneProps) {
  const ps = playing ? "running" : "paused";
  const id = step.id;

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      <defs>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="0.4" stopColor="#e8b84b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8b84b" stopOpacity="0.26" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="sandNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fc6ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#9fc6ff" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e8b84b" stopOpacity="0.22" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="1" stopColor="#cbbb95" />
        </linearGradient>
      </defs>

      {(id === "ihram" || id === "tawaf" || id === "tawaf-ifadah" || id === "tawaf-wida") && (
        <g>
          {/* Mataf: the floor the crowd turns on. */}
          <circle cx="180" cy="148" r="122" fill="rgba(232,184,75,0.05)" />
          {[56, 84, 112].map((r, i) => (
            <circle key={r} cx="180" cy="148" r={r} fill="none" stroke="rgba(232,184,75,0.16)" strokeWidth={i === 0 ? 2 : 1} />
          ))}
          <Kaaba />
          {/* Crowd: rings at different radii and speeds, all anticlockwise. */}
          {[68, 94, 118].map((r, ring) =>
            Array.from({ length: 8 + ring * 5 }).map((_, i) => (
              <g
                key={`${ring}-${i}`}
                className="if-orbit"
                style={{
                  transformOrigin: "180px 148px",
                  animationDuration: `${18 + ring * 8}s`,
                  animationDelay: `-${(i / (8 + ring * 5)) * (18 + ring * 8)}s`,
                  animationPlayState: ps,
                  opacity: 0.3 + ring * 0.06,
                }}
              >
                <circle cx={180 + r} cy="148" r="2.6" fill="#fff6df" />
              </g>
            )),
          )}
          {id !== "ihram" && (
            <g className="if-orbit" style={{ transformOrigin: "180px 148px", animationDuration: "7s", animationPlayState: ps }}>
              <Pilgrim style={{ transform: "translate(248px, 148px)" }} />
            </g>
          )}
          {id === "ihram" && <Standing x={180} y={292} s={1.5} />}
        </g>
      )}

      {id === "sai" && (
        <g>
          {/* The gallery: a run of arches between the two hills. */}
          {Array.from({ length: 15 }).map((_, i) => (
            <Arch key={i} x={-102 + i * 42} o={0.13 + (i % 2) * 0.05} />
          ))}
          {/* Safa and Marwa, one at each end, raised above the walk. */}
          <path d="M-116 250 Q-84 196 -52 250 Z" fill="rgba(232,184,75,0.3)" />
          <path d="M412 250 Q444 196 476 250 Z" fill="rgba(232,184,75,0.3)" />
          <Ground />
          <line x1="-88" y1="286" x2="448" y2="286" stroke="rgba(232,184,75,0.22)" strokeWidth="12" strokeLinecap="round" />
          <line x1="140" y1="286" x2="220" y2="286" stroke="var(--if-gold)" strokeWidth="12" strokeLinecap="round" opacity="0.55" />
          <text x="-84" y="236" textAnchor="middle" fontSize="13" fill="rgba(245,230,192,0.85)" fontWeight="700" className="font-arabic">صفا</text>
          <text x="444" y="236" textAnchor="middle" fontSize="13" fill="rgba(245,230,192,0.85)" fontWeight="700" className="font-arabic">مروة</text>
          <g className="if-shuttle" style={{ animationPlayState: ps }}>
            <Standing x={-84} y={286} s={1.05} />
          </g>
        </g>
      )}

      {id === "mina" && (
        <g>
          {/* A low sun behind the ridge, and the haze it throws along it. */}
          <circle cx="404" cy="150" r="46" fill="url(#sun)" opacity="0.7" className="if-breathe" style={{ animationPlayState: ps }} />
          <ellipse cx="230" cy="216" rx="330" ry="34" fill="url(#haze)" />
          <Ground />
          {/* Four ranks, each nearer and brighter than the one behind it. */}
          <TentRank y={224} w={20} n={24} o={0.24} />
          <TentRank y={244} w={30} n={16} o={0.42} />
          <TentRank y={270} w={42} n={12} o={0.66} />
          <TentRank y={300} w={56} n={9} o={0.95} lamps ps={ps} />
          {/* Two pilgrims walking the lane between the near ranks. */}
          <Standing x={126} y={286} s={0.6} />
          <Standing x={252} y={288} s={0.66} />
        </g>
      )}

      {id === "arafah" && (
        <g>
          <circle cx="292" cy="66" r="58" fill="url(#sun)" className="if-breathe" style={{ animationPlayState: ps }} />
          {/* Jabal ar-Rahmah, with the pillar on its crown. */}
          <path d="M104 264 Q180 168 256 264 Z" fill="rgba(232,184,75,0.28)" />
          <path d="M104 264 Q180 168 256 264" fill="none" stroke="rgba(232,184,75,0.5)" strokeWidth="2" />
          <rect x="177" y="150" width="6" height="24" rx="2" fill="var(--if-gold-light)" opacity="0.85" />
          <Ground />
          {/* A scatter of pilgrims standing on the plain. */}
          {[[86, 288], [126, 292], [232, 292], [274, 288]].map(([x, y], i) => (
            <Standing key={i} x={x} y={y} s={0.55} />
          ))}
          <Standing x={180} y={290} s={1.15} />
        </g>
      )}

      {id === "muzdalifah" && (
        <g>
          <rect x="-120" y="-10" width="700" height="344" fill="#061a0d" opacity="0.5" />
          {[[30, 40], [70, 22], [120, 50], [200, 18], [260, 44], [320, 30], [340, 80], [20, 90], [156, 36], [292, 96]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.7" fill="#fff6df" className="if-twinkle" style={{ animationDelay: `${i * 0.35}s`, animationPlayState: ps }} />
          ))}
          <circle cx="300" cy="58" r="17" fill="#fff6df" opacity="0.92" />
          <circle cx="309" cy="52" r="15" fill="#0a2a14" />
          <Ground night />
          <Standing x={180} y={290} s={1.15} />
          {/* Pebbles, gathered one by one. */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle
              key={i}
              cx={156 + i * 8}
              cy="292"
              r="2.6"
              fill="var(--if-gold-light)"
              className="if-pop"
              style={{ animationDelay: `${0.3 + i * 0.25}s`, animationPlayState: ps }}
            />
          ))}
        </g>
      )}

      {id === "rami" && (
        <g>
          <Ground />
          {/* Jamarat: the wall, the pillar, and the basin at its foot. */}
          <rect x="238" y="118" width="20" height="150" rx="4" fill="rgba(232,184,75,0.32)" stroke="var(--if-gold)" strokeWidth="2" />
          <rect x="214" y="152" width="68" height="8" rx="3" fill="rgba(232,184,75,0.22)" />
          <ellipse cx="248" cy="270" rx="52" ry="10" fill="none" stroke="rgba(232,184,75,0.4)" strokeWidth="2" />
          <Standing x={104} y={284} s={0.95} />
          <g style={{ transform: "translate(118px, 250px)" }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={i} r="2.6" fill="var(--if-gold-light)" className="if-throw" style={{ animationDelay: `${i * 0.45}s`, animationPlayState: ps }} />
            ))}
          </g>
        </g>
      )}

      {(id === "sacrifice" || id === "halq") && (
        <g>
          <Ground />
          <Standing x={180} y={290} s={1.2} />
          {id === "halq" && (
            /* Locks of hair falling from the crown. */
            <g>
              <path d="M168 232 Q180 222 192 232" fill="none" stroke="var(--if-gold-light)" strokeWidth="2.5" className="if-breathe" style={{ animationPlayState: ps }} />
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={172 + i * 8}
                  cy="240"
                  r="1.8"
                  fill="var(--if-gold-light)"
                  className="if-drop"
                  style={{ animationDelay: `${i * 0.4}s`, animationPlayState: ps, ["--dx" as string]: `${i * 3 - 3}px` }}
                />
              ))}
            </g>
          )}
          {id === "sacrifice" && (
            /* The animal, standing beside the pilgrim. */
            <g style={{ transform: "translate(246px, 284px)" }}>
              <ellipse cx="0" cy="2" rx="24" ry="4" fill="#000" opacity="0.28" />
              <path d="M-20 0 L-20 -16 Q-20 -26 -8 -26 L12 -26 Q22 -26 22 -16 L22 0" fill="rgba(245,230,192,0.75)" />
              <path d="M22 -26 Q30 -30 30 -38 L26 -40 Q20 -34 18 -28 Z" fill="rgba(245,230,192,0.75)" />
              <path d="M-18 0 L-18 -8 M-8 0 L-8 -8 M10 0 L10 -8 M18 0 L18 -8" stroke="rgba(245,230,192,0.6)" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}
    </g>
    </svg>
  );
}
