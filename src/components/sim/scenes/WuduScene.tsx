"use client";

import type { SceneProps } from "../Simulator";

/* Wudu, front on.

   A figure drawn as regions — hands, mouth, nose, face, each forearm, the
   crown of the head, the ears, each foot — so the part being washed can fill
   with light while the rest stays a quiet outline. Water falls from a tap on
   the right; the droplets are CSS keyframes, staggered, and they aim at the
   active region by moving the whole stream. */

const REGION: Record<string, string[]> = {
  niyyah: [], bismillah: ["handR", "handL"], hands: ["handR", "handL"], mouth: ["mouth"], nose: ["nose"],
  face: ["face"], armR: ["armR"], armL: ["armL"], head: ["crown"], ears: ["earR", "earL"],
  footR: ["footR"], footL: ["footL"], dua: [],
};

/* Where the water aims, per step: x/y in the viewBox. */
const AIM: Record<string, [number, number]> = {
  bismillah: [188, 232], hands: [188, 232], mouth: [180, 98], nose: [180, 84], face: [180, 86],
  armR: [118, 196], armL: [242, 196], head: [180, 40], ears: [180, 76], footR: [150, 296], footL: [210, 296],
};

export function WuduScene({ step, playing }: SceneProps) {
  const lit = new Set(REGION[step.id] ?? []);
  const aim = AIM[step.id];
  const on = (id: string) => ({
    fill: lit.has(id) ? "var(--if-gold-light)" : "rgba(232,184,75,0.10)",
    stroke: lit.has(id) ? "var(--if-gold-light)" : "rgba(232,184,75,0.55)",
    filter: lit.has(id) ? "url(#glow)" : undefined,
    transition: "fill 0.6s ease, stroke 0.6s ease",
  });

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Basin */}
      <path d="M60 306 Q180 330 300 306 L288 316 Q180 336 72 316 Z" fill="rgba(232,184,75,0.18)" />

      {/* Body outline */}
      <path d="M120 320 L122 212 Q124 176 150 166 L210 166 Q236 176 238 212 L240 320" fill="rgba(232,184,75,0.06)" stroke="rgba(232,184,75,0.35)" strokeWidth="3" strokeLinejoin="round" />

      {/* Arms (forearms are the washed regions) */}
      <path id="armR" d="M150 170 L106 206 L96 226 L116 232 L132 206 Z" style={on("armR")} strokeWidth="3" strokeLinejoin="round" />
      <path id="armL" d="M210 170 L254 206 L264 226 L244 232 L228 206 Z" style={on("armL")} strokeWidth="3" strokeLinejoin="round" />
      {/* Hands, cupped together in front */}
      <path id="handR" d="M158 224 Q146 240 160 252 L180 252 L180 224 Z" style={on("handR")} strokeWidth="3" strokeLinejoin="round" />
      <path id="handL" d="M202 224 Q214 240 200 252 L180 252 L180 224 Z" style={on("handL")} strokeWidth="3" strokeLinejoin="round" />

      {/* Head */}
      <ellipse cx="180" cy="96" rx="40" ry="50" fill="rgba(232,184,75,0.06)" stroke="rgba(232,184,75,0.55)" strokeWidth="3" />
      <path id="crown" d="M140 92 Q140 44 180 44 Q220 44 220 92 Q180 78 140 92 Z" style={on("crown")} strokeWidth="3" />
      <path id="face" d="M144 96 Q150 146 180 146 Q210 146 216 96 Q180 82 144 96 Z" style={on("face")} strokeWidth="3" />
      <ellipse id="earR" cx="138" cy="100" rx="7" ry="12" style={on("earR")} strokeWidth="3" />
      <ellipse id="earL" cx="222" cy="100" rx="7" ry="12" style={on("earL")} strokeWidth="3" />
      <path id="nose" d="M174 92 L180 112 L186 92" style={on("nose")} strokeWidth="3" strokeLinejoin="round" fill="none" />
      <path id="mouth" d="M166 126 Q180 136 194 126" style={on("mouth")} strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Feet */}
      <path id="footR" d="M126 320 L126 292 Q150 284 166 296 L166 320 Z" style={on("footR")} strokeWidth="3" strokeLinejoin="round" />
      <path id="footL" d="M234 320 L234 292 Q210 284 194 296 L194 320 Z" style={on("footL")} strokeWidth="3" strokeLinejoin="round" />

      {/* Tap and water. The stream moves to the region being washed. */}
      <g style={{ transform: `translate(${aim ? aim[0] + 44 : 300}px, ${aim ? aim[1] - 70 : 40}px)`, transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)", opacity: aim ? 1 : 0 }}>
        <path d="M0 0 L0 14 Q0 22 -8 22 L-14 22" fill="none" stroke="var(--if-gold-pale)" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx="-16"
            cy="28"
            r={i % 2 ? 3 : 2.4}
            fill="#bfe3ff"
            className="if-drop"
            style={{ animationDelay: `${i * 0.2}s`, animationPlayState: playing ? "running" : "paused", ["--dx" as string]: `${(i % 3) * 4 - 4}px` }}
          />
        ))}
      </g>

      {/* Ripples in the basin while water runs. */}
      {aim && [0, 1].map((i) => (
        <ellipse key={i} cx="180" cy="312" rx="20" ry="4" fill="none" stroke="#bfe3ff" strokeWidth="1.5" className="if-ripple" style={{ animationDelay: `${i * 0.8}s`, animationPlayState: playing ? "running" : "paused" }} />
      ))}
    </svg>
  );
}
