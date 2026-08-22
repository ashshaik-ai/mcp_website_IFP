"use client";

import type { SceneProps } from "../Simulator";

/* A praying figure, side on, facing the qibla (left).

   Built as a jointed skeleton: hip → torso → head and arms; hip → thigh →
   shin → foot. Each joint is an SVG group positioned at the joint and
   rotated; children are drawn from the joint's origin, so a rotation turns
   the limb about the joint with nothing else to compute. A posture is one
   set of angles, and moving between postures is a CSS transition on
   transform — the browser interpolates the whole body at once.

   The proportions are stylised rather than anatomical: a round head, limbs
   as thick rounded strokes, a hint of a thawb. It reads as a person at
   prayer from across a room, which is the point. */

type Pose = {
  /** Hip height; positive moves the figure down toward the mat. */
  y: number;
  torso: number;
  head: number;
  armU: number;
  armL: number;
  thigh: number;
  shin: number;
  foot: number;
  /** Far arm, drawn lighter, may differ a little for depth. */
  farU?: number;
  farL?: number;
};

/* Angles in degrees. SVG rotate() is clockwise on screen. The torso is drawn
   pointing up, so a negative angle leans it forward (toward the qibla, left);
   limbs are drawn pointing down, so for them a positive angle swings forward.
   World direction of a limb = sum of the angles above it, which is how the
   poses below were derived: arms hang when torso + armU = 0, a shin lies
   back along the floor when thigh + shin = -90, and so on. Floor is y≈310. */
const POSES: Record<string, Pose> = {
  qiyam:   { y: 0,   torso: 0,    head: -6,  armU: 28,  armL: 108,  thigh: 0,   shin: 0,    foot: 0 },
  takbeer: { y: 0,   torso: 0,    head: 0,   armU: 120, armL: 60,   thigh: 0,   shin: 0,    foot: 0 },
  ruku:    { y: 0,   torso: -88,  head: 0,   armU: 88,  armL: 0,    thigh: 0,   shin: 0,    foot: 0 },
  itidal:  { y: 0,   torso: 0,    head: 0,   armU: 0,   armL: 0,    thigh: 0,   shin: 0,    foot: 0 },
  sujud:   { y: 50,  torso: -135, head: 0,   armU: 180, armL: -90,  thigh: 0,   shin: -90,  foot: 0 },
  julus:   { y: 99,  torso: 0,    head: -6,  armU: 20,  armL: 60,   thigh: 90,  shin: -180, foot: 0 },
  salamR:  { y: 99,  torso: 0,    head: 30,  armU: 20,  armL: 60,   thigh: 90,  shin: -180, foot: 0 },
  salamL:  { y: 99,  torso: 0,    head: -34, armU: 20,  armL: 60,   thigh: 90,  shin: -180, foot: 0 },
};

/* Map step ids from any portal onto a pose. Unknown ids stand. */
const POSE_FOR: Record<string, keyof typeof POSES> = {
  niyyah: "qiyam", takbeer: "takbeer", qiyam: "qiyam", fatiha: "qiyam", surah: "qiyam",
  ruku: "ruku", itidal: "itidal", sujud: "sujud", sujud1: "sujud", sujud2: "sujud",
  julus: "julus", jalsa: "julus", tashahhud: "julus", salam: "salamR", salam2: "salamL",
  standing: "qiyam", sitting: "julus", bowing: "ruku", prostration: "sujud",
};

const T = "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
const g = (x: number, y: number, a: number) => ({ transform: `translate(${x}px, ${y}px) rotate(${a}deg)`, transition: T });

export function SalahFigure({ step }: SceneProps) {
  const pose = POSES[POSE_FOR[step.id] ?? "qiyam"];
  const stroke = "var(--if-gold-light)";
  const far = "rgba(232, 184, 75, 0.45)";
  const lw = 11;
  const farU = pose.farU ?? pose.armU;
  const farL = pose.farL ?? pose.armL;

  return (
    <svg viewBox="0 0 360 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mat" x1="0" x2="1">
          <stop offset="0" stopColor="#c8922a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#c8922a" stopOpacity="0.12" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Prayer mat, in perspective, and the mihrab arch it points to. */}
      <path d="M40 316 L110 236 L300 236 L338 316 Z" fill="url(#mat)" />
      <path d="M24 130 Q24 60 60 60 Q96 60 96 130" fill="none" stroke="rgba(232,184,75,0.25)" strokeWidth="3" />

      {/* Shadow under the body: wider and closer when low to the ground. */}
      <ellipse
        cx={pose.y > 40 ? 150 : 190}
        cy="312"
        rx={pose.y > 40 ? 80 : 34}
        ry="8"
        fill="#000"
        opacity="0.35"
        filter="url(#soft)"
        style={{ transition: "cx 0.9s, rx 0.9s" }}
      />

      {/* Hip is the root. */}
      <g style={g(190, 186 + pose.y, 0)}>
        {/* Far leg */}
        <g style={g(6, 0, pose.thigh)}>
          <line x1="0" y1="0" x2="0" y2="62" stroke={far} strokeWidth={lw} strokeLinecap="round" />
          <g style={g(0, 62, pose.shin)}>
            <line x1="0" y1="0" x2="0" y2="64" stroke={far} strokeWidth={lw} strokeLinecap="round" />
            <g style={g(0, 64, pose.foot)}>
              <line x1="0" y1="0" x2="-22" y2="0" stroke={far} strokeWidth={lw - 1} strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* Torso, with a hint of the thawb as a wider translucent stroke. */}
        <g style={g(0, 0, pose.torso)}>
          <line x1="0" y1="4" x2="0" y2="-82" stroke="rgba(232,184,75,0.18)" strokeWidth={lw + 16} strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="-82" stroke={stroke} strokeWidth={lw + 2} strokeLinecap="round" />

          {/* Far arm */}
          <g style={g(2, -74, farU)}>
            <line x1="0" y1="0" x2="0" y2="44" stroke={far} strokeWidth={lw - 2} strokeLinecap="round" />
            <g style={g(0, 44, farL)}>
              <line x1="0" y1="0" x2="0" y2="40" stroke={far} strokeWidth={lw - 2} strokeLinecap="round" />
            </g>
          </g>

          {/* Head: neck, cap, face. */}
          <g style={g(0, -82, pose.head)}>
            <line x1="0" y1="0" x2="0" y2="-12" stroke={stroke} strokeWidth={lw - 2} strokeLinecap="round" />
            <circle cx="-2" cy="-30" r="17" fill="var(--if-green)" stroke={stroke} strokeWidth="4" />
            <path d="M-19 -36 Q-2 -52 15 -36" fill="var(--if-gold-light)" />
          </g>

          {/* Near arm */}
          <g style={g(-2, -74, pose.armU)}>
            <line x1="0" y1="0" x2="0" y2="44" stroke={stroke} strokeWidth={lw} strokeLinecap="round" />
            <g style={g(0, 44, pose.armL)}>
              <line x1="0" y1="0" x2="0" y2="40" stroke={stroke} strokeWidth={lw} strokeLinecap="round" />
              <circle cx="0" cy="44" r="6" fill={stroke} />
            </g>
          </g>
        </g>

        {/* Near leg */}
        <g style={g(-6, 0, pose.thigh)}>
          <line x1="0" y1="0" x2="0" y2="62" stroke={stroke} strokeWidth={lw} strokeLinecap="round" />
          <g style={g(0, 62, pose.shin)}>
            <line x1="0" y1="0" x2="0" y2="64" stroke={stroke} strokeWidth={lw} strokeLinecap="round" />
            <g style={g(0, 64, pose.foot)}>
              <line x1="0" y1="0" x2="-22" y2="0" stroke={stroke} strokeWidth={lw - 1} strokeLinecap="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
