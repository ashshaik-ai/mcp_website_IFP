"use client";

import type { SceneProps } from "../Simulator";

/* Wudu and ghusl, front on.

   A figure drawn as regions -- hands, mouth, nose, face, each forearm, the
   crown, the ears, each foot -- so the part being washed fills with light
   while the rest stays a quiet outline. An ewer tips over that region and
   pours; the water is a falling stream and a spreading sheen, both CSS
   keyframes.

   The figure is drawn between y=40 and y=286 of a 320-tall box. The previous
   one ran off the bottom edge, so its feet -- the last two steps of the rite
   -- were cut in half by the caption strip. Everything it needs to show now
   sits inside the frame. */

const REGION: Record<string, string[]> = {
  niyyah: [], bismillah: ["handR", "handL"], hands: ["handR", "handL"], mouth: ["mouth"], nose: ["nose"],
  face: ["face"], armR: ["armR"], armL: ["armL"], head: ["crown"], ears: ["earR", "earL"],
  footR: ["footR"], footL: ["footL"], dua: [],
  /* Ghusl: the same figure, whole regions at a time. */
  "g-niyyah": [], "g-hands": ["handR", "handL"], "g-wudu": ["handR", "handL", "mouth", "nose", "face", "armR", "armL"],
  "g-head": ["crown", "earR", "earL"], "g-right": ["bodyR", "armR", "footR"], "g-left": ["bodyL", "armL", "footL"],
  "g-all": ["crown", "face", "earR", "earL", "armR", "armL", "handR", "handL", "bodyR", "bodyL", "footR", "footL"],
};

/* Where the water lands, per step: x/y in the viewBox. */
const AIM: Record<string, [number, number]> = {
  bismillah: [180, 216], hands: [180, 216], mouth: [180, 102], nose: [180, 86], face: [180, 88],
  armR: [150, 198], armL: [210, 198], head: [180, 46], ears: [180, 78], footR: [158, 280], footL: [202, 280],
  "g-hands": [180, 216], "g-wudu": [180, 88], "g-head": [180, 46], "g-right": [156, 196], "g-left": [204, 196], "g-all": [180, 46],
};

const GOLD = "var(--if-gold-light)";
const DIM = "rgba(232,184,75,0.5)";
const FILL = "rgba(232,184,75,0.07)";

export function WuduScene({ step, playing }: SceneProps) {
  const lit = new Set(REGION[step.id] ?? []);
  const aim = AIM[step.id];
  const ps = playing ? "running" : "paused";
  const on = (id: string) => ({
    fill: lit.has(id) ? "rgba(232,184,75,0.85)" : FILL,
    stroke: lit.has(id) ? GOLD : DIM,
    filter: lit.has(id) ? "url(#wglow)" : undefined,
    transition: "fill 0.55s ease, stroke 0.55s ease",
  });
  const line = (id: string) => ({ ...on(id), fill: "none" });

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
      <defs>
        <filter id="wglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="wstream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dff1fb" stopOpacity="0.15" />
          <stop offset="0.45" stopColor="#dff1fb" stopOpacity="0.65" />
          <stop offset="1" stopColor="#dff1fb" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wfloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8b84b" stopOpacity="0.14" />
          <stop offset="1" stopColor="#e8b84b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wjug" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5e6c0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8922a" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="wrobe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d8a0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c8922a" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="wsheen" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#eaf7ff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#eaf7ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Floor and basin, drawn first so the figure stands on them. */}
      <path d="M-120 288 L480 288" stroke="rgba(232,184,75,0.22)" strokeWidth="1.5" />
      <path d="M-120 288 L480 288 L480 330 L-120 330 Z" fill="url(#wfloor)" />
      <ellipse cx="180" cy="294" rx="76" ry="8" fill="#000" opacity="0.28" />
      <path d="M118 288 Q180 306 242 288 L236 297 Q180 313 124 297 Z" fill="rgba(232,184,75,0.18)" />

      {/* Feet, below the hem, on the floor line. */}
      <path d="M170 288 L170 274 Q152 268 145 279 L145 288 Z" style={on("footR")} strokeWidth="2" strokeLinejoin="round" />
      <path d="M190 288 L190 274 Q208 268 215 279 L215 288 Z" style={on("footL")} strokeWidth="2" strokeLinejoin="round" />

      {/* The thawb. Two halves, so ghusl can light one side at a time, with
          the seam between them doubling as the fall of the cloth. */}
      <path d="M180 126 Q152 130 148 142 L138 274 L180 274 Z" style={on("bodyR")} strokeWidth="0" />
      <path d="M180 126 Q208 130 212 142 L222 274 L180 274 Z" style={on("bodyL")} strokeWidth="0" />
      <path
        d="M180 126 Q152 130 148 142 L138 274 L222 274 L212 142 Q208 130 180 126 Z"
        fill="url(#wrobe)"
        stroke="rgba(232,184,75,0.5)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="180" y1="132" x2="180" y2="272" stroke="rgba(232,184,75,0.22)" strokeWidth="1.5" />
      {/* Folds. */}
      <path d="M162 150 L156 268 M198 150 L204 268" fill="none" stroke="rgba(232,184,75,0.16)" strokeWidth="1.5" />

      {/* Arms: the upper arm hangs, the forearm turns in and is the region
          that gets washed, ending in a cupped hand. */}
      <path d="M156 140 L138 186" fill="none" stroke="rgba(232,184,75,0.45)" strokeWidth="11" strokeLinecap="round" />
      <path d="M204 140 L222 186" fill="none" stroke="rgba(232,184,75,0.45)" strokeWidth="11" strokeLinecap="round" />
      <path d="M138 186 L164 212" fill="none" style={line("armR")} strokeWidth="11" strokeLinecap="round" />
      <path d="M222 186 L196 212" fill="none" style={line("armL")} strokeWidth="11" strokeLinecap="round" />
      <path d="M164 210 Q158 228 176 230 L180 230 L180 210 Z" style={on("handR")} strokeWidth="2" strokeLinejoin="round" />
      <path d="M196 210 Q202 228 184 230 L180 230 L180 210 Z" style={on("handL")} strokeWidth="2" strokeLinejoin="round" />

      {/* Neck and head. */}
      <path d="M170 104 L170 128 M190 104 L190 128" stroke="rgba(232,184,75,0.45)" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="180" cy="76" rx="29" ry="34" fill={FILL} stroke="rgba(232,184,75,0.45)" strokeWidth="2.5" />
      <path d="M151 70 Q151 38 180 38 Q209 38 209 70 Q180 60 151 70 Z" style={on("crown")} strokeWidth="2" />
      <path d="M153 76 Q158 110 180 110 Q202 110 207 76 Q180 66 153 76 Z" style={on("face")} strokeWidth="2" />
      <ellipse cx="149" cy="78" rx="6" ry="10" style={on("earR")} strokeWidth="2" />
      <ellipse cx="211" cy="78" rx="6" ry="10" style={on("earL")} strokeWidth="2" />
      {/* Brows, so the face has somewhere to look from. */}
      <path d="M166 72 Q172 68 178 71 M182 71 Q188 68 194 72" fill="none" stroke="rgba(232,184,75,0.55)" strokeWidth="2" strokeLinecap="round" />
      <path d="M180 78 L180 90 Q180 94 175 94" style={line("nose")} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M170 100 Q180 107 190 100" style={line("mouth")} strokeWidth="3" strokeLinecap="round" />
      {/* Beard along the jaw. */}
      <path d="M155 84 Q160 116 180 116 Q200 116 205 84 Q194 106 180 106 Q166 106 155 84 Z" fill="rgba(232,184,75,0.3)" />

      {/* The ewer tips over whatever is being washed and pours. It and the
          stream ride one transform, so the water meets the region rather than
          being aimed at it. */}
      {aim && (
        <g
          style={{
            /* Clamped: aimed at the crown, the unclamped offset put the ewer
               above the top edge and half of it was cut off. */
            transform: `translate(${aim[0] + 92}px, ${Math.max(aim[1] - 72, 26)}px)`,
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Ibriq, tipped to pour: body, rim, spout, handle, foot. The first
              one was a thin outline and read as a ring floating beside the
              head rather than as a jug. */}
          <g transform="rotate(-22)">
            <path
              d="M-13 4 Q-23 15 -21 27 Q-19 41 -2 43 Q15 43 17 29 Q19 15 8 4 Z"
              fill="url(#wjug)"
              stroke={GOLD}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M-14 4 L9 4 L7 -5 L-12 -5 Z" fill="url(#wjug)" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
            <path d="M-12 -5 Q-26 -8 -35 5 L-28 11 Q-21 1 -10 3 Z" fill="url(#wjug)" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
            <path d="M15 10 Q30 16 25 32" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
            <path d="M-9 45 L8 45" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
            <path d="M-14 20 Q-2 24 12 20" fill="none" stroke="rgba(13,59,30,0.35)" strokeWidth="2" />
          </g>

          {/* Stream: a tapering ribbon from the spout down to the region. */}
          <path d="M-31 -8 Q-50 30 -78 68" fill="none" stroke="url(#wstream)" strokeWidth="5" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx="-33"
              cy="-4"
              r={i % 2 ? 2.6 : 2}
              fill="#dff1fb"
              className="if-drop"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationPlayState: ps,
                ["--dx" as string]: `${-26 - (i % 3) * 5}px`,
              }}
            />
          ))}
        </g>
      )}

      {/* Where the water lands: a sheen, and rings spreading out of it. */}
      {aim && (
        <g style={{ transform: `translate(${aim[0]}px, ${aim[1]}px)`, transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)" }}>
          <circle r="32" fill="url(#wsheen)" className="if-breathe" style={{ animationPlayState: ps }} />
          {[0, 1].map((i) => (
            <circle
              key={i}
              r="13"
              fill="none"
              stroke="#dff1fb"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              className="if-spread"
              style={{ animationDelay: `${i * 0.9}s`, animationPlayState: ps }}
            />
          ))}
        </g>
      )}
    </g>
    </svg>
  );
}
