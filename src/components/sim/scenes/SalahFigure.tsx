"use client";

import type { SceneProps } from "../Simulator";

/* A praying figure, side on, facing the qibla (left).

   Each posture is drawn, not computed. The first version was a jointed
   skeleton -- one set of joint angles per posture, CSS interpolating between
   them -- and while the motion was free, the drawing never read as a person:
   in ruku a horizontal bar on two legs with a circle at one end is a table.

   So every posture is its own set of shapes, with the weight where a body's
   weight would be: a robe with a hem that falls, a back that curves, hands
   that arrive somewhere they belong. The Simulator re-mounts the scene on
   every step, so the change between postures is the shell's own entrance and
   nothing here has to animate. */

type Pt = [number, number];

type Pose = {
  head: Pt;
  /** Degrees the head is turned; positive turns it back toward the viewer. */
  turn?: number;
  robe: string;
  armNear: Pt[];
  armFar: Pt[];
  legNear: Pt[];
  legFar: Pt[];
  footNear?: string;
  footFar?: string;
  /** Body close to the mat: the shadow spreads and the mat lamp dims. */
  low?: boolean;
};

const STAND_LEGS: Pick<Pose, "legNear" | "legFar" | "footNear" | "footFar"> = {
  legFar: [[208, 198], [210, 244], [208, 288]],
  legNear: [[192, 198], [194, 244], [192, 288]],
  footFar: "M210 282 L180 282 Q171 282 171 289 Q171 295 180 295 L212 295 Z",
  footNear: "M194 282 L162 282 Q152 282 152 289 Q152 296 162 296 L196 296 Z",
};

const STAND_ROBE = "M176 128 Q168 202 158 284 L240 284 Q230 202 222 128 Q200 118 176 128 Z";

const POSES: Record<string, Pose> = {
  /* Standing, hands folded below the chest. */
  qiyam: {
    ...STAND_LEGS,
    robe: STAND_ROBE,
    head: [193, 100],
    armFar: [[212, 140], [206, 180], [186, 188]],
    armNear: [[188, 140], [184, 182], [166, 188]],
  },
  /* Hands raised beside the ears. */
  takbeer: {
    ...STAND_LEGS,
    robe: STAND_ROBE,
    head: [193, 100],
    armFar: [[212, 140], [204, 166], [208, 122]],
    armNear: [[188, 140], [176, 164], [180, 118]],
  },
  /* Standing again after the bow, arms at the sides. */
  itidal: {
    ...STAND_LEGS,
    robe: STAND_ROBE,
    head: [193, 100],
    armFar: [[212, 140], [210, 182], [208, 216]],
    armNear: [[188, 140], [184, 184], [182, 218]],
  },
  /* Bowing: back level, hands on the knees. */
  ruku: {
    legFar: [[228, 200], [228, 246], [226, 288]],
    legNear: [[212, 200], [212, 246], [210, 288]],
    footFar: "M228 282 L198 282 Q189 282 189 289 Q189 295 198 295 L230 295 Z",
    footNear: "M212 282 L180 282 Q170 282 170 289 Q170 296 180 296 L214 296 Z",
    robe: "M220 148 Q184 138 148 152 Q138 168 146 186 Q186 200 224 192 Q232 168 220 148 Z",
    head: [122, 168],
    armFar: [[160, 184], [180, 214], [204, 240]],
    armNear: [[150, 180], [172, 212], [198, 240]],
  },
  /* Prostration: forehead, hands, knees and toes on the mat. */
  sujud: {
    low: true,
    legFar: [[252, 240], [240, 278], [246, 292]],
    legNear: [[244, 242], [232, 280], [238, 293]],
    footFar: "M246 288 L276 288 Q286 288 286 293 Q286 297 276 297 L246 297 Z",
    robe: "M256 214 Q222 212 190 240 Q170 256 160 274 L198 290 Q224 264 248 250 Q268 238 256 214 Z",
    head: [138, 276],
    armFar: [[176, 268], [158, 282], [140, 292]],
    armNear: [[170, 272], [152, 285], [134, 294]],
  },
  /* Sitting back on the heels. */
  julus: {
    low: true,
    legFar: [[224, 246], [166, 260], [252, 286]],
    legNear: [[218, 250], [158, 264], [246, 290]],
    robe:
      "M190 190 Q182 226 180 250 Q140 256 140 272 Q142 284 158 286 L248 292 Q262 288 256 274 Q244 258 236 250 Q234 220 228 190 Q210 182 190 190 Z",
    head: [196, 162],
    armFar: [[214, 200], [204, 228], [180, 250]],
    armNear: [[192, 200], [182, 230], [160, 252]],
  },
};

/* Salam turns the head without moving anything else. */
POSES.salamR = { ...POSES.julus, turn: 36 };
POSES.salamL = { ...POSES.julus, turn: -30 };

/* Map step ids from any portal onto a posture. Unknown ids stand. */
const POSE_FOR: Record<string, keyof typeof POSES> = {
  niyyah: "qiyam", takbeer: "takbeer", qiyam: "qiyam", fatiha: "qiyam", surah: "qiyam",
  /* The funeral prayer's later takbirs, all made standing. */
  takbeer2: "takbeer", takbeer3: "takbeer", takbeer4: "takbeer", durood: "qiyam", dua: "qiyam",
  ruku: "ruku", itidal: "itidal", sujud: "sujud", sujud1: "sujud", sujud2: "sujud",
  julus: "julus", jalsa: "julus", tashahhud: "julus", salam: "salamR", salam2: "salamL",
  standing: "qiyam", sitting: "julus", bowing: "ruku", prostration: "sujud",
};

const GOLD = "var(--if-gold-light)";
const FAR = "rgba(232, 184, 75, 0.42)";

const Limb = ({ pts, w, color }: { pts: Pt[]; w: number; color: string }) => (
  <polyline
    points={pts.map((p) => p.join(",")).join(" ")}
    fill="none"
    stroke={color}
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/* Head, drawn facing left: a kufi over the crown, a brow, and a beard along
   the jaw. `turn` swings the whole thing for the salam. */
const Head = ({ at, turn = 0 }: { at: Pt; turn?: number }) => (
  <g style={{ transform: `translate(${at[0]}px, ${at[1]}px) rotate(${turn}deg)` }}>
    <circle r="17" fill="rgba(232,184,75,0.2)" stroke={GOLD} strokeWidth="3" />
    <path d="M-18 -7 Q-17 -23 0 -23 Q17 -23 18 -7 Q0 -14 -18 -7 Z" fill={GOLD} />
    <path d="M-17 -3 Q-10 -7 -3 -4" fill="none" stroke="rgba(13,59,30,0.5)" strokeWidth="2" strokeLinecap="round" />
    <path d="M-18 4 Q-8 20 6 10 Q4 -2 -6 -4 Z" fill="rgba(232,184,75,0.55)" />
  </g>
);

export function SalahFigure({ step }: SceneProps) {
  const pose = POSES[POSE_FOR[step.id] ?? "qiyam"];

  return (
    <svg viewBox="0 0 576 324" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform="translate(108, 2)">
        <defs>
          <linearGradient id="rug" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c8922a" stopOpacity="0.1" />
            <stop offset="1" stopColor="#c8922a" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="robe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d8a0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#c8922a" stopOpacity="0.4" />
          </linearGradient>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* The niche the figure faces, set into the wall behind it. */}
        <path
          d="M-52 250 L-52 122 Q-52 56 2 56 Q56 56 56 122 L56 250 Z"
          fill="rgba(232,184,75,0.07)"
          stroke="rgba(232,184,75,0.3)"
          strokeWidth="2"
        />
        <path d="M-40 250 L-40 126 Q-40 70 2 70 Q44 70 44 126 L44 250" fill="none" stroke="rgba(232,184,75,0.18)" strokeWidth="1.5" />
        <line x1="2" y1="56" x2="2" y2="84" stroke="rgba(232,184,75,0.3)" strokeWidth="1.5" />
        <path d="M-12 84 Q2 106 16 84 Z" fill="rgba(232,184,75,0.35)" />
        <circle cx="2" cy="90" r="3" fill={GOLD} className="if-breathe" />

        {/* Prayer mat, in perspective, with a border, a fringe, and a mihrab
            woven into it pointing the way the figure faces. */}
        <path d="M-34 296 L72 234 L320 234 L430 296 Z" fill="url(#rug)" />
        <path d="M-34 296 L72 234 L320 234 L430 296 Z" fill="none" stroke="rgba(232,184,75,0.4)" strokeWidth="1.5" />
        <path d="M2 276 L92 248 L300 248 L396 276 Z" fill="none" stroke="rgba(232,184,75,0.25)" strokeWidth="1.2" />
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={-32 + i * 24} y1="296" x2={-34 + i * 24} y2="305" stroke="rgba(232,184,75,0.28)" strokeWidth="1.5" />
        ))}
        <path d="M118 234 Q122 210 150 210 Q178 210 182 234" fill="none" stroke="rgba(232,184,75,0.28)" strokeWidth="1.5" />

        {/* Contact shadow: wide and close when the body is down on the mat. */}
        <ellipse
          cx={pose.low ? 190 : 196}
          cy="292"
          rx={pose.low ? 96 : 42}
          ry="9"
          fill="#000"
          opacity="0.35"
          filter="url(#soft)"
        />

        {/* The figure, scaled about the point its feet meet the mat so it
            fills the frame without leaving the ground. */}
        <g transform="translate(196, 296) scale(1.18) translate(-196, -296)">
        {/* Far side first, then the robe over it, then the near side. */}
        <Limb pts={pose.legFar} w={13} color={FAR} />
        <Limb pts={pose.armFar} w={11} color={FAR} />
        {pose.footFar && <path d={pose.footFar} fill={FAR} />}

        <path d={pose.robe} fill="url(#robe)" stroke="rgba(232,184,75,0.55)" strokeWidth="2" strokeLinejoin="round" />

        <Limb pts={pose.legNear} w={13} color={GOLD} />
        {pose.footNear && <path d={pose.footNear} fill={GOLD} />}
        <Limb pts={pose.armNear} w={11} color={GOLD} />
        <circle cx={pose.armNear[2][0]} cy={pose.armNear[2][1]} r="6.5" fill={GOLD} />

        <Head at={pose.head} turn={pose.turn} />
        </g>
      </g>
    </svg>
  );
}
