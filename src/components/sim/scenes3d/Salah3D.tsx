"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { SceneProps } from "../Simulator";
import {
  applyArm, applyPose, breathe, buildFigure, camState, CREAM, D, disposeStage,
  driftCamera, easePose, fitRenderer, GOLD, GOLD_DIM, mountStage, orbit,
  placeCamera, pose, solveArm, sym,
  type CamState, type Joints, type Pose, type Stage,
} from "./stage3d";

/* The praying figure in three dimensions.

   The SVG figure draws each posture; this one is a body, a jointed rig of
   capsules the camera can walk around. Drag turns the scene, the wheel or a
   pinch moves closer, and each step of the prayer eases the joints from one
   posture into the next, so ruku is not a picture of bowing but the act of it.

   The scene stays mounted for the whole prayer. It used to be torn down and
   rebuilt at every step, which reset the camera, threw away the shadow map,
   and made the sequence read as a deck of cards.

   All rotation targets are in radians. The rig is a hierarchy, root(pelvis)
   to torso to head and arms, root to legs, so a posture is one set of joint
   angles and the tween interpolates the whole body at once. The figure, the
   lights and the camera rig now live in stage3d, shared with every other 3D
   scene in the simulator. */

/* The postures, as the portal's own Steps tab teaches them. That tab is the
   authority here, and it is Hanafi: hands to the ears for the takbir, right
   over left on the chest standing, hands gripping the knees with the back
   parallel to the ground in ruku, seven limbs down in sujud, sitting on the
   left foot with the right foot upright, head right then left for the salam.
   A figure that shows something else contradicts the page it stands on.

   Where a posture is defined by where the hands END UP rather than by joint
   angles -- the knees, the ground, the thighs -- the pose names a target and
   the arms are solved to reach it. See REACH below. */
const POSES: Record<string, Pose> = {
  /* Standing before the takbir: arms at the sides. */
  niyyah: sym({ rootY: 0.94, torsoX: 1 * D, headX: 6 * D, shoulderX: 4 * D, elbowX: 8 * D, shoulderZ: 5 * D }),
  /* Takbir: hands up beside the head, thumbs at the earlobes, palms toward
     the qibla, elbows out. Not straight overhead, which is what the old pose
     showed, and not out in front. */
  takbeer: sym({ rootY: 0.94, headX: 2 * D, shoulderX: 148 * D, elbowX: 62 * D, shoulderZ: 26 * D }),
  /* Qiyam: right hand over left. The arms fold across the front and the hands
     meet at the midline, which is what the crossing shoulderZ does; the
     right sits a little higher so it reads as over rather than beside. */
  qiyam: pose({
    rootY: 0.94, torsoX: 2 * D, headX: 12 * D,
    shoulderXR: 62 * D, elbowXR: 98 * D, shoulderZR: -30 * D,
    shoulderXL: 58 * D, elbowXL: 96 * D, shoulderZL: -26 * D,
  }),
  /* Ruku: back parallel to the ground, legs straight, head in line with the
     back rather than raised or hanging. The hands are solved onto the knees,
     so the small hip flex here is only what lets the shins stay vertical
     while the pelvis carries back. */
  ruku: sym({ rootY: 0.93, torsoX: 88 * D, headX: -4 * D, hipX: 10 * D, kneeX: -10 * D, shoulderZ: 7 * D }),
  /* Qawm: upright again, still, hands at the sides. */
  itidal: sym({ rootY: 0.94, torsoX: 0, headX: 4 * D, shoulderX: 4 * D, elbowX: 8 * D, shoulderZ: 5 * D }),
  /* Sujud: knees on the mat, shins flat back with the toes tucked under and
     turned to the qibla, the pelvis low, the back steep enough to bring
     forehead and nose down. The palms are solved onto the mat level with the
     ears, which leaves the elbows raised and away from the sides. */
  sujud: sym({
    rootY: 0.44, rootZ: 0.1, torsoX: 112 * D, headX: 6 * D,
    hipX: 6 * D, kneeX: -96 * D, footX: -74 * D, shoulderZ: 16 * D,
  }),
  /* Sitting. The left shin folds flat and the pelvis rests on that foot; the
     right foot stands on its toes facing the qibla. The hands are solved onto
     the thighs. */
  julus: pose({
    /* Sitting on the heels: the thighs come round to horizontal so the knees
       rest on the mat in front, the shins fold back underneath, and the
       pelvis settles onto the left foot. The right ankle is pitched up so
       that foot stands on its toes facing the qibla, which is the difference
       between this sitting and simply kneeling. */
    rootY: 0.23, rootZ: 0.16, torsoX: 3 * D, headX: 10 * D,
    hipXL: 84 * D, kneeXL: -164 * D, footXL: 6 * D,
    hipXR: 84 * D, kneeXR: -158 * D, footXR: -62 * D,
    shoulderZL: 9 * D, shoulderZR: 9 * D,
  }),
  /* The salam turns the head and nothing else. */
  salamR: pose({
    rootY: 0.23, rootZ: 0.16, torsoX: 3 * D, headX: 3 * D, headY: -58 * D,
    hipXL: 84 * D, kneeXL: -164 * D, footXL: 6 * D,
    hipXR: 84 * D, kneeXR: -158 * D, footXR: -62 * D,
    shoulderZL: 9 * D, shoulderZR: 9 * D,
  }),
  salamL: pose({
    rootY: 0.23, rootZ: 0.16, torsoX: 3 * D, headX: 3 * D, headY: 58 * D,
    hipXL: 84 * D, kneeXL: -164 * D, footXL: 6 * D,
    hipXR: 84 * D, kneeXR: -158 * D, footXR: -62 * D,
    shoulderZL: 9 * D, shoulderZR: 9 * D,
  }),
  /* The funeral prayer is performed entirely standing, so its salam turns the
     head from qiyam rather than from the sitting the five daily prayers close
     in. Hands stay folded, as they are throughout it. */
  salamStandR: pose({
    rootY: 0.94, torsoX: 2 * D, headX: 3 * D, headY: -58 * D,
    shoulderXR: 62 * D, elbowXR: 98 * D, shoulderZR: -30 * D,
    shoulderXL: 58 * D, elbowXL: 96 * D, shoulderZL: -26 * D,
  }),
  salamStandL: pose({
    rootY: 0.94, torsoX: 2 * D, headX: 3 * D, headY: 58 * D,
    shoulderXR: 62 * D, elbowXR: 98 * D, shoulderZR: -30 * D,
    shoulderXL: 58 * D, elbowXL: 96 * D, shoulderZL: -26 * D,
  }),
};

/* Step ids from any portal onto a posture; unknown ids stand. */
const POSE_FOR: Record<string, keyof typeof POSES> = {
  niyyah: "niyyah", takbeer: "takbeer", qiyam: "qiyam", fatiha: "qiyam", surah: "qiyam",
  /* The funeral prayer's later takbirs, all made standing. */
  takbeer2: "takbeer", takbeer3: "takbeer", takbeer4: "takbeer", durood: "qiyam", dua: "qiyam",
  salamStand: "salamStandR", salamStand2: "salamStandL",
  ruku: "ruku", itidal: "itidal", sujud: "sujud", sujud1: "sujud", sujud2: "sujud",
  julus: "julus", jalsa: "julus", tashahhud: "julus", salam: "salamR", salam2: "salamL",
  standing: "qiyam", sitting: "julus", bowing: "ruku", prostration: "sujud",
};

/* Which postures place the hands on something, and where that something is.
   The target is computed from the body itself every frame, so it follows the
   tween: the hands travel onto the knees as the back comes down rather than
   arriving there afterwards. */
type ReachKind = "knees" | "ground" | "thighs" | "chest" | "ears";
/* Sujud raises the elbows clear of the ground; every other placement hangs
   them. */
const ELBOW_UP: ReachKind[] = ["ground"];

const REACH: Partial<Record<keyof typeof POSES, ReachKind>> = {
  takbeer: "ears",
  qiyam: "chest",
  ruku: "knees",
  sujud: "ground",
  julus: "thighs",
  salamR: "thighs",
  salamL: "thighs",
  salamStandR: "chest",
  salamStandL: "chest",
};

/* How long a change of posture takes. Long enough to read as a body moving
   and short enough to finish inside the shortest step the prayer has. */
const MOVE_SECONDS = 0.85;

const T_A = new THREE.Vector3();
const T_B = new THREE.Vector3();
/* Scratch for reachTarget alone. It cannot borrow T_A/T_B: those are the
   vectors it is asked to write into, so reading one as working space while
   writing the other silently returned the wrong point for one hand. */
const R_A = new THREE.Vector3();
const R_B = new THREE.Vector3();

/* Where the folded hands sit, in the torso's own frame. The right is a
   little higher and a little further forward than the left, which is what
   makes it read as right OVER left rather than as two hands side by side. */
const CHEST_L = new THREE.Vector3(0.055, 0.3, -0.2);
const CHEST_R = new THREE.Vector3(-0.015, 0.335, -0.235);

/** The world point one hand should be resting on, for a given posture. */
function reachTarget(joints: Joints, kind: ReachKind, side: "L" | "R", out: THREE.Vector3) {
  const s = side === "L" ? 1 : -1;
  if (kind === "chest") {
    out.copy(side === "L" ? CHEST_L : CHEST_R);
    joints.torso.localToWorld(out);
    return out;
  }
  if (kind === "ears") {
    /* Thumbs to the earlobes, palms toward the qibla. Solved from the ears
       themselves, so it stays right whatever the head is doing. */
    joints.head.getWorldPosition(R_A);
    out.set(R_A.x + 0.2 * s, R_A.y + 0.05, R_A.z + 0.02);
    return out;
  }
  if (kind === "knees") {
    /* The front of the kneecap, which is what a hand grips. */
    const knee = side === "L" ? joints.kneeL : joints.kneeR;
    knee.getWorldPosition(out);
    out.z -= 0.085;
    out.y += 0.015;
    out.x += 0.02 * s;
    return out;
  }
  if (kind === "ground") {
    /* On the mat, level with the ears and a little wider than the shoulders,
       which is where the Hanafi sujud puts the palms. */
    joints.head.getWorldPosition(R_A);
    out.set(R_A.x + 0.235 * s, 0.045, R_A.z + 0.055);
    return out;
  }
  /* Thighs: partway along the thigh toward the knee, on top of it. */
  const hip = side === "L" ? joints.hipL : joints.hipR;
  const knee = side === "L" ? joints.kneeL : joints.kneeR;
  hip.getWorldPosition(R_A);
  knee.getWorldPosition(R_B);
  out.lerpVectors(R_A, R_B, 0.72);
  out.y += 0.1;
  out.x += 0.03 * s;
  return out;
}

type Rig = {
  stage: Stage;
  joints: Joints;
  cam: CamState;
  current: Pose;
  target: Pose;
  /** The posture being left, held so the ease has something to leave from. */
  from: Pose;
  /** 0 to 1 across the transition. */
  u: number;
  /** The posture being eased toward, so the solver knows what to reach for. */
  reach: ReachKind | null;
  /** Eased 0 to 1, so the hands settle onto a knee rather than snapping. */
  reachW: number;
  raf: number;
};

/* The rug.

   A prayer mat is not a plain rectangle: it carries a mihrab arch woven into
   it, and the arch is what tells the person praying which end faces the
   qibla. Drawn into a canvas rather than downloaded, so it costs nothing over
   the wire and recolours with the brand.

   Deep green and gold rather than the reds a mat is often woven in, because
   every other surface in this simulator is built from the site's two colours
   and a red rug in the middle of it would read as a photograph pasted onto a
   drawing. */
let rugTex: THREE.CanvasTexture | null = null;
function prayerRug(): THREE.CanvasTexture {
  if (rugTex) return rugTex;
  const w = 320;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#12522a";
  ctx.fillRect(0, 0, w, h);

  /* The weave: fine vertical threads, so the pile catches light along the
     length of the mat the way a real one does. */
  for (let x = 0; x < w; x += 2) {
    ctx.fillStyle = x % 4 === 0 ? "rgba(255,246,223,0.045)" : "rgba(6,28,14,0.06)";
    ctx.fillRect(x, 0, 1, h);
  }

  const gold = "#c8922a";
  const goldLight = "#e8b84b";
  const cream = "#f5e6c0";

  /* Borders, one inside the other. */
  ctx.strokeStyle = gold;
  ctx.lineWidth = 7;
  ctx.strokeRect(15, 15, w - 30, h - 30);
  ctx.strokeStyle = goldLight;
  ctx.lineWidth = 2;
  ctx.strokeRect(27, 27, w - 54, h - 54);
  ctx.strokeRect(37, 37, w - 74, h - 74);

  /* A chain of lozenges down each side border. */
  ctx.fillStyle = "rgba(232,184,75,0.5)";
  for (let y = 46; y < h - 46; y += 26) {
    for (const x of [21, w - 21]) {
      ctx.beginPath();
      ctx.moveTo(x, y - 7);
      ctx.lineTo(x + 6, y);
      ctx.lineTo(x, y + 7);
      ctx.lineTo(x - 6, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  /* The mihrab: a pointed arch on two columns, at the qibla end. */
  const cx = w / 2;
  const base = h - 96;
  const top = 150;
  ctx.strokeStyle = goldLight;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 86, base);
  ctx.lineTo(cx - 86, top + 66);
  ctx.quadraticCurveTo(cx - 86, top, cx, top - 34);
  ctx.quadraticCurveTo(cx + 86, top, cx + 86, top + 66);
  ctx.lineTo(cx + 86, base);
  ctx.stroke();

  ctx.strokeStyle = "rgba(232,184,75,0.45)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 72, base);
  ctx.lineTo(cx - 72, top + 74);
  ctx.quadraticCurveTo(cx - 72, top + 18, cx, top - 14);
  ctx.quadraticCurveTo(cx + 72, top + 18, cx + 72, top + 74);
  ctx.lineTo(cx + 72, base);
  ctx.stroke();

  /* A lamp hanging in the niche, which is the motif almost every prayer mat
     carries, and an eight-point star under it. */
  ctx.strokeStyle = goldLight;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, top - 14);
  ctx.lineTo(cx, top + 44);
  ctx.stroke();
  ctx.fillStyle = cream;
  ctx.beginPath();
  ctx.ellipse(cx, top + 62, 19, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = gold;
  ctx.beginPath();
  ctx.ellipse(cx, top + 62, 12, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(245,230,192,0.55)";
  ctx.lineWidth = 2;
  const sx = cx;
  const sy = top + 150;
  const r1 = 40;
  const r2 = 17;
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? r1 : r2;
    const px = sx + Math.cos(a) * r;
    const py = sy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  /* Fringes at both ends. */
  ctx.strokeStyle = "rgba(245,230,192,0.4)";
  ctx.lineWidth = 2;
  for (let x = 12; x < w - 10; x += 7) {
    ctx.beginPath();
    ctx.moveTo(x, 2);
    ctx.lineTo(x, 12);
    ctx.moveTo(x, h - 12);
    ctx.lineTo(x, h - 2);
    ctx.stroke();
  }

  rugTex = new THREE.CanvasTexture(c);
  rugTex.anisotropy = 8;
  return rugTex;
}

/* The floor of the hall.

   A mosque is carpeted in rows, and the rows are not decoration: each arch
   woven into the carpet marks one person's place in the line, which is how a
   congregation forms straight ranks without anyone measuring. The figure
   stands in one of those places.

   The scene used to sit on a plain dark disc, so the prayer happened nowhere
   in particular. */
let hallTex: THREE.CanvasTexture | null = null;
function hallCarpet(): THREE.CanvasTexture {
  if (hallTex) return hallTex;
  const w = 256;
  const h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  /* Darker than the prayer rug laid on it, so the rug reads as a separate
     thing on the floor rather than as a patch of the same carpet. */
  ctx.fillStyle = "#0a3218";
  ctx.fillRect(0, 0, w, h);
  /* Pile, running with the rows. */
  for (let y = 0; y < h; y += 2) {
    ctx.fillStyle = y % 4 === 0 ? "rgba(255,246,223,0.03)" : "rgba(4,22,11,0.05)";
    ctx.fillRect(0, y, w, 1);
  }

  /* One place-marker: a pointed arch, repeated across the tile. */
  ctx.strokeStyle = "rgba(232,184,75,0.34)";
  ctx.lineWidth = 2;
  const cx = w / 2;
  ctx.beginPath();
  ctx.moveTo(cx - 62, h - 24);
  ctx.lineTo(cx - 62, 128);
  ctx.quadraticCurveTo(cx - 62, 62, cx, 34);
  ctx.quadraticCurveTo(cx + 62, 62, cx + 62, 128);
  ctx.lineTo(cx + 62, h - 24);
  ctx.stroke();

  /* The band between the rows. */
  ctx.strokeStyle = "rgba(232,184,75,0.22)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, h - 12);
  ctx.lineTo(w, h - 12);
  ctx.stroke();
  ctx.fillStyle = "rgba(232,184,75,0.2)";
  for (let x = 8; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, h - 12 - 5);
    ctx.lineTo(x + 5, h - 12);
    ctx.lineTo(x, h - 12 + 5);
    ctx.lineTo(x - 5, h - 12);
    ctx.closePath();
    ctx.fill();
  }

  hallTex = new THREE.CanvasTexture(c);
  hallTex.wrapS = THREE.RepeatWrapping;
  hallTex.wrapT = THREE.RepeatWrapping;
  /* One arch per place, and a place is about two feet across. At 14 repeats
     over a floor 32 units wide each arch came out the size of a doorway. */
  hallTex.repeat.set(38, 38);
  hallTex.anisotropy = 8;
  return hallTex;
}

/** The hall: a carpeted floor, and an arcade closing the space behind. */
function buildHall(scene: THREE.Scene) {
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(16, 56),
    new THREE.MeshStandardMaterial({ map: hallCarpet(), roughness: 0.98 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  /* An arcade behind the camera side, so turning the view finds a room
     rather than an edge. Instanced: it is the same pier eighteen times. */
  const stone = new THREE.MeshStandardMaterial({ color: 0x14522a, roughness: 0.88 });
  const N = 18;
  const R = 9.2;
  const piers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.3, 3.4, 0.3), stone, N);
  const arcs = new THREE.InstancedMesh(new THREE.TorusGeometry(0.78, 0.1, 6, 12, Math.PI), stone, N);
  const d = new THREE.Object3D();
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    d.position.set(Math.cos(a) * R, 1.7, Math.sin(a) * R);
    d.rotation.set(0, -a, 0);
    d.updateMatrix();
    piers.setMatrixAt(i, d.matrix);
    const mid = a + Math.PI / N;
    d.position.set(Math.cos(mid) * R, 3.4, Math.sin(mid) * R);
    d.rotation.set(0, -mid + Math.PI / 2, 0);
    d.updateMatrix();
    arcs.setMatrixAt(i, d.matrix);
  }
  scene.add(piers, arcs);
}

/** The mat, and the niche the prayer faces. */
function buildRoom(scene: THREE.Scene) {
  /* The pile is a plane and the body of the rug a thin box under it. A box
     face was the obvious choice and the wrong one: the top face's UVs run
     along X, so the woven mihrab came out lying on its side, pointing across
     the mat instead of at the qibla. A plane laid flat has v running to -Z,
     which is the qibla, so the arch points where it is drawn to point. */
  const pile = new THREE.Mesh(
    new THREE.PlaneGeometry(1.24, 2.3),
    new THREE.MeshStandardMaterial({ map: prayerRug(), roughness: 0.96 }),
  );
  pile.rotation.x = -Math.PI / 2;
  /* Pulled forward so the whole prayer happens on it: standing, the feet are
     at the near end; in sujud the forehead reaches almost a metre ahead. */
  pile.position.set(0, 0.024, -0.5);
  pile.receiveShadow = true;
  scene.add(pile);

  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(1.26, 0.022, 2.32),
    new THREE.MeshStandardMaterial({ color: 0x0a3419, roughness: 0.95 }),
  );
  backing.position.set(0, 0.012, -0.5);
  backing.receiveShadow = true;
  scene.add(backing);

  const arch = new THREE.Group();
  const colGeom = new THREE.CylinderGeometry(0.09, 0.11, 2.2, 10);
  const colMat = new THREE.MeshStandardMaterial({ color: 0x1a5c30, roughness: 0.7 });
  const c1 = new THREE.Mesh(colGeom, colMat);
  c1.position.set(-0.85, 1.1, 0);
  const c2 = new THREE.Mesh(colGeom, colMat);
  c2.position.set(0.85, 1.1, 0);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.09, 10, 24, Math.PI), colMat);
  ring.position.set(0, 2.2, 0);
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 12, 12),
    new THREE.MeshStandardMaterial({ color: CREAM, emissive: GOLD, emissiveIntensity: 1.6 }),
  );
  lamp.position.set(0, 1.9, 0);
  const lampLight = new THREE.PointLight(GOLD, 1.2, 5);
  lampLight.position.copy(lamp.position);
  /* Plinths and a step: the columns end at y=0, but at this depth the bare
     ground reads as haze and the shafts looked cut off in mid-air. A base
     under each and a low platform between give them something to stand on. */
  const plinthGeom = new THREE.BoxGeometry(0.34, 0.14, 0.34);
  const p1 = new THREE.Mesh(plinthGeom, colMat);
  p1.position.set(-0.85, 0.07, 0);
  const p2 = new THREE.Mesh(plinthGeom, colMat);
  p2.position.set(0.85, 0.07, 0);
  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 0.06, 0.7),
    new THREE.MeshStandardMaterial({ color: 0x14522a, roughness: 0.85 }),
  );
  platform.position.set(0, 0.03, 0);
  platform.receiveShadow = true;
  arch.add(c1, c2, ring, lamp, lampLight, p1, p2, platform);
  arch.position.set(0, 0, -2.6);
  scene.add(arch);
}

export function Salah3D({ step, playing, lang }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rigRef = useRef<Rig | null>(null);
  const stepId = POSE_FOR[step.id] ?? "qiyam";

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    /* A strong warm key and a fill turned well down. The room light was a
       green hemisphere at full strength, which is right for gold capsules on
       a green ground and wrong for a white thobe: it came out sage. */
    const stage = mountStage(canvas, { key: 1.55, fill: 0.42, floor: null, fog: [11, 26] });
    if (!stage) return;

    /* The key stands behind and to the mihrab side, which rims the figure
       beautifully and leaves the whole of the side the camera actually looks
       at to a green hemisphere: white cloth came out sage. This is the light
       that makes the thobe read as white. */
    const front = new THREE.DirectionalLight(0xfff4e4, 1.65);
    front.position.set(5.2, 3.4, 2.6);
    stage.scene.add(front);
    stage.scene.add(new THREE.AmbientLight(0xfff1da, 0.42));

    buildHall(stage.scene);
    buildRoom(stage.scene);
    const joints = buildFigure();
    stage.scene.add(joints.root);

    const rig: Rig = {
      stage,
      joints,
      cam: camState({
        /* Three-quarter, not profile. A pure side view is the clearest angle
           for the shape of ruku and sujud and the worst for everything the
           hands do, and the hands are half of what this teaches: folded on
           the chest, raised to the ears, gripping the knees. This turns far
           enough toward the front to show them while keeping the mihrab in
           frame behind. */
        azimuth: 1.98,
        polar: 1.3,
        /* 5.1, not 4.2: the scene used to be rebuilt at every step, which
           reset the camera each time and hid how tight the framing was. Now
           that one rig plays the whole prayer, a standing figure has to fit
           with headroom and a prostrating one has to stay off the bottom
           edge. */
        dist: 5.1,
        /* The azimuth is clamped as well as the polar: it used to be free, so
           a short flick swung the camera behind the mihrab, where the columns
           stand between it and the figure and the scene reads as empty. The
           arc left here is about 200 degrees and still frames the prayer from
           the front. */
        azimuthRange: [-0.35, 2.9],
        /* A narrow, slow arc around the framing the scene was composed in. A
           wide swing was tolerable when every step snapped the camera back;
           across a whole prayer it wanders somewhere unflattering and stays
           there. */
        driftArc: [1.82, 2.16],
      }),
      current: { ...POSES.qiyam },
      target: { ...POSES.qiyam },
      from: { ...POSES.qiyam },
      u: 1,
      reach: null,
      reachW: 0,
      raf: 0,
    };
    if (reduced) rig.cam.idle = 0;
    rigRef.current = rig;

    const resize = () => fitRenderer(stage, host);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const releaseOrbit = orbit(canvas, rig.cam);

    let last = performance.now();
    const loop = (now: number) => {
      rig.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* Ease the joints from the posture left behind into the one arriving,
         over a fixed span rather than by chasing. Reduced motion jumps. */
      rig.u = reduced ? 1 : Math.min(1, rig.u + dt / MOVE_SECONDS);
      easePose(rig.current, rig.from, rig.target, rig.u);
      applyPose(rig.joints, rig.current);
      /* Breath, once the posture has arrived. Not during the move, where it
         would fight the ease. */
      if (!reduced) breathe(rig.joints, now / 1000, rig.u);

      /* Then put the hands where the posture says they go. The angles above
         carry the body; this carries the hands the last few centimetres onto
         the knees, the mat or the thighs, and holds them there however the
         rest of the figure moves. */
      const want = rig.reach ? 1 : 0;
      rig.reachW += (want - rig.reachW) * (reduced ? 1 : Math.min(1, dt * 5));
      if (rig.reachW > 0.002 && rig.reach) {
        rig.joints.root.updateMatrixWorld(true);
        for (const side of ["L", "R"] as const) {
          reachTarget(rig.joints, rig.reach, side, side === "L" ? T_A : T_B);
          const aim = side === "L" ? T_A : T_B;
          const bend = ELBOW_UP.includes(rig.reach) ? "up" : "down";
          applyArm(rig.joints, side, solveArm(rig.joints, side, aim, bend), rig.reachW);
        }
      }
      driftCamera(rig.cam, dt, reduced);
      /* Aimed a little higher than the pelvis: the standing postures are the
         tall ones and they were losing their heads off the top. */
      placeCamera(stage.camera, rig.cam, [0, 0.86, -0.25]);
      stage.renderer.render(stage.scene, stage.camera);
    };
    rig.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rig.raf);
      ro.disconnect();
      releaseOrbit();
      disposeStage(stage);
      rigRef.current = null;
    };
  }, []);

  /* A new step retargets the tween; the loop above carries the body there. */
  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.from = { ...rig.current };
    rig.u = 0;
    rig.target = { ...POSES[stepId] };
    rig.reach = REACH[stepId] ?? null;
  }, [stepId]);

  /* Keep drifting only while playing; a paused study pose holds still. */
  useEffect(() => {
    const rig = rigRef.current;
    if (rig && !playing) rig.cam.idle = 0;
  }, [playing]);

  /* A way back to the framing the scene was designed in, for anyone who has
     spun it somewhere unhelpful. It used to restore a distance of 4.2, the
     framing from before the camera was pulled back, so the reset button
     cropped the figure it was meant to rescue. */
  const resetView = () => {
    const rig = rigRef.current;
    if (!rig) return;
    Object.assign(rig.cam, rig.cam.home);
  };

  return (
    <div ref={wrap} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <button
        type="button"
        onClick={resetView}
        aria-label={lang === "te" ? "వీక్షణను రీసెట్ చేయండి" : "Reset the view"}
        title={lang === "te" ? "వీక్షణను రీసెట్ చేయండి" : "Reset the view"}
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/25 text-[var(--if-gold-light)] backdrop-blur-sm transition-colors hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </svg>
      </button>
    </div>
  );
}
