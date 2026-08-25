/* The parts every 3D scene in the simulator shares.

   One portal had a 3D scene and twelve had drawings, which made the salah
   simulator feel like a different product from the rest of the site. Pulling
   the renderer, the lights, the ground, the camera rig and the human figure
   out of Salah3D means a new 3D scene is the thing it shows plus a pose
   table, not six hundred lines of boilerplate again.

   Deliberately primitives: capsules, spheres, boxes. A glTF human would be
   several megabytes over the wire for an audience on 3G, and would need a
   licence, a rig and a retarget. These read as a figure at any size, cost
   nothing to ship, and recolour from the brand tokens. */

import * as THREE from "three";

export const GOLD = 0xe8b84b;
export const GOLD_DIM = 0xc8922a;
export const GREEN = 0x0d3b1e;
export const CREAM = 0xfff6df;

/* What the figure wears. It used to be gold capsules head to foot, which read
   as a mannequin rather than as someone at prayer: a person praying wears a
   thobe and a cap, and the parts that touch the ground in sujud are hands and
   feet, so those have to be skin for the posture to be legible at all.

   Never pure white. #ffffff on a lit surface clips to a flat silhouette and
   loses every fold; an off-white keeps the shading that says cloth. */
export const THOBE = 0xeceadf;
export const THOBE_SHADE = 0xdad6c7;
export const SKIN = 0xc08a5a;

export const D = Math.PI / 180;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function capsule(r: number, len: number, color: number): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.CapsuleGeometry(r, len, 4, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1 }),
  );
  m.castShadow = true;
  return m;
}

/* Posture.

   Sign convention, verified from the rendered profile: positive rotation
   swings a limb toward the qibla (forward), for arms and legs alike; the
   torso pitch is applied negated so a positive torsoX also leans forward. A
   negative shoulderZ brings that arm in across the chest, which is how one
   hand reaches the other forearm.

   Every joint is per-side, because the rites that are not prayer are not
   symmetric: wudu washes the right arm and then the left. Salah's postures
   are symmetric, so they are written through sym() and read as they always
   did. */
export type Pose = {
  /** Pelvis height above the floor, in scene units (figure is ~1.7 tall). */
  rootY: number;
  /** Pelvis slide forward, for sujud and sitting. */
  rootZ: number;
  torsoX: number;
  torsoY: number;
  headX: number;
  headY: number;
  shoulderXL: number;
  shoulderXR: number;
  shoulderZL: number;
  shoulderZR: number;
  elbowXL: number;
  elbowXR: number;
  hipXL: number;
  hipXR: number;
  kneeXL: number;
  kneeXR: number;
  /** Ankle pitch. The sitting stands the right foot on its toes. */
  footXL: number;
  footXR: number;
};

const ZERO: Pose = {
  rootY: 0.94, rootZ: 0, torsoX: 0, torsoY: 0, headX: 0, headY: 0,
  shoulderXL: 0, shoulderXR: 0, shoulderZL: 0, shoulderZR: 0,
  elbowXL: 0, elbowXR: 0, hipXL: 0, hipXR: 0, kneeXL: 0, kneeXR: 0,
  footXL: 0, footXR: 0,
};

export function pose(p: Partial<Pose>): Pose {
  /* Copied key by key, skipping the ones that were not given. A plain spread
     looks equivalent and is not: sym() below builds its object with every
     field present, so an unset joint arrives as an explicit undefined and a
     spread writes that OVER the default. The tween then lerps undefined into
     NaN, three.js drops any node with a NaN in its matrix, and the whole
     figure disappears from a scene that still renders its mat. */
  const out: Pose = { ...ZERO };
  for (const k of Object.keys(p) as (keyof Pose)[]) {
    const v = p[k];
    if (typeof v === "number") out[k] = v;
  }
  return out;
}

/** A posture the same on both sides, written once. */
export function sym(p: {
  rootY?: number; rootZ?: number; torsoX?: number; torsoY?: number;
  headX?: number; headY?: number; shoulderX?: number; shoulderZ?: number;
  elbowX?: number; hipX?: number; kneeX?: number; footX?: number;
}): Pose {
  return pose({
    rootY: p.rootY, rootZ: p.rootZ, torsoX: p.torsoX, torsoY: p.torsoY,
    headX: p.headX, headY: p.headY,
    shoulderXL: p.shoulderX, shoulderXR: p.shoulderX,
    shoulderZL: p.shoulderZ, shoulderZR: p.shoulderZ,
    elbowXL: p.elbowX, elbowXR: p.elbowX,
    hipXL: p.hipX, hipXR: p.hipX,
    kneeXL: p.kneeX, kneeXR: p.kneeX,
    footXL: p.footX, footXR: p.footX,
  });
}

export type Joints = {
  root: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  shoulderL: THREE.Group;
  shoulderR: THREE.Group;
  elbowL: THREE.Group;
  elbowR: THREE.Group;
  handL: THREE.Mesh;
  handR: THREE.Mesh;
  hipL: THREE.Group;
  hipR: THREE.Group;
  kneeL: THREE.Group;
  kneeR: THREE.Group;
  /** The ankle, so a pose can stand the right foot upright for the sitting. */
  footL: THREE.Group;
  footR: THREE.Group;
  robe: THREE.Mesh;
};

/** A fine woven lattice, for the cap. Baked once, shared by every figure. */
let capTex: THREE.CanvasTexture | null = null;
function kufiTexture(): THREE.CanvasTexture {
  if (capTex) return capTex;
  const n = 128;
  const c = document.createElement("canvas");
  c.width = n;
  c.height = n;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#f4f2ea";
  ctx.fillRect(0, 0, n, n);
  /* Crochet: two sets of diagonals with a stitch at each crossing. It reads as
     embroidery at the size the cap is ever seen, and costs one 128px canvas
     rather than a texture download. */
  ctx.strokeStyle = "rgba(190,184,166,0.85)";
  ctx.lineWidth = 1;
  for (let i = -n; i < n * 2; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + n, n);
    ctx.moveTo(i + n, 0);
    ctx.lineTo(i, n);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(168,160,140,0.7)";
  for (let y = 0; y < n; y += 8) {
    for (let x = 0; x < n; x += 8) ctx.fillRect(x, y, 1.5, 1.5);
  }
  capTex = new THREE.CanvasTexture(c);
  capTex.wrapS = THREE.RepeatWrapping;
  capTex.wrapT = THREE.RepeatWrapping;
  capTex.repeat.set(3, 2);
  return capTex;
}

/** The figure, on a root the caller adds to its own scene. */
export function buildFigure(): Joints {
  const root = new THREE.Group();
  const cloth = new THREE.MeshStandardMaterial({ color: THOBE, roughness: 0.88 });
  const clothDeep = new THREE.MeshStandardMaterial({ color: THOBE_SHADE, roughness: 0.9 });
  const skin = new THREE.MeshStandardMaterial({ color: SKIN, roughness: 0.62 });

  const torso = new THREE.Group();
  root.add(torso);
  const trunk = new THREE.Mesh(new THREE.CapsuleGeometry(0.175, 0.44, 4, 14), cloth);
  trunk.position.y = 0.32;
  trunk.castShadow = true;
  torso.add(trunk);

  /* The placket: the short row of buttons at the throat of a thobe. Small, and
     the one detail that stops the chest reading as a blank cylinder. */
  const placket = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.26, 0.02), clothDeep);
  placket.position.set(0, 0.42, -0.168);
  torso.add(placket);
  for (let i = 0; i < 3; i++) {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), clothDeep);
    btn.position.set(0, 0.5 - i * 0.075, -0.182);
    torso.add(btn);
  }

  /* The skirt of the thobe, to the ankle. On the ROOT, not the torso: cloth
     hangs from gravity, and parenting it to the spine turned ruku into a
     megaphone around the head. */
  /* To just above the knee, and no lower. A thobe reaches the ankle, and a
     full-length one modelled as a rigid cone swallowed the legs entirely: in
     ruku the figure became a traffic cone with a back, and the knees the
     hands are supposed to be gripping could not be seen at all. The legs
     below are cloth too, so what it reads as is a thobe over the loose
     trousers worn under one. */
  const robe = new THREE.Mesh(
    new THREE.ConeGeometry(0.215, 0.5, 18, 1, true),
    new THREE.MeshStandardMaterial({ color: THOBE, roughness: 0.88, side: THREE.DoubleSide }),
  );
  robe.position.y = -0.12;
  robe.castShadow = true;
  root.add(robe);

  const head = new THREE.Group();
  /* The shoulder sits 0.52 above the pelvis, not 0.6. The old figure had a
     torso longer than its arms, and in ruku, with the back parallel to the
     ground, the hands then fell a hand's width short of the knees whatever the
     joint angles were: the posture the portal teaches was not reachable by the
     body meant to show it. */
  head.position.y = 0.6;
  torso.add(head);
  /* The head, and how much of it the cap is allowed to have.

     The kufi used to be a hemisphere 0.52pi deep sitting almost on the brow:
     its rim fell at y=0.106 with the eyes at 0.128, so the cap covered the
     forehead and everything above the eyes, and what was left of the face was
     a band. A kufi sits ON the crown. Rim at 0.185, top third of the head,
     forehead clear. */
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.142, 20, 18), skin);
  skull.position.y = 0.1;
  skull.castShadow = true;
  head.add(skull);

  const kufi = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.328),
    new THREE.MeshStandardMaterial({ map: kufiTexture(), roughness: 0.85 }),
  );
  kufi.position.y = 0.108;
  kufi.castShadow = true;
  head.add(kufi);
  /* The rolled band round its edge, on the circle where the cap meets the
     head rather than floating at some other height. */
  const capBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.129, 0.011, 8, 26),
    new THREE.MeshStandardMaterial({ color: 0xe4e0d2, roughness: 0.85 }),
  );
  capBand.rotation.x = Math.PI / 2;
  capBand.position.y = 0.185;
  head.add(capBand);

  /* A face.

     There was a beard here and it covered the whole of one. The shell began
     at y=0.087 and the cap ended at 0.106, so the skin between them was two
     millimetres: not a bearded man but a head wrapped in two bands.

     Eyes lowered, which is where they belong in salah -- the gaze rests on
     the place of sujud. Two flattened lenses give that without a texture, a
     UV unwrap or a decal, and they turn with the head, so the salam reads
     from any angle. */
  const dark = new THREE.MeshStandardMaterial({ color: 0x241f1a, roughness: 0.5 });
  for (const side of [1, -1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 10), dark);
    eye.position.set(0.055 * side, 0.115, -0.125);
    eye.scale.set(1.05, 0.3, 0.32);
    head.add(eye);

    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.01, 0.012), dark);
    brow.position.set(0.056 * side, 0.152, -0.115);
    brow.rotation.z = -0.14 * side;
    head.add(brow);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), skin);
  nose.position.set(0, 0.082, -0.132);
  nose.scale.set(0.75, 1.05, 1.25);
  head.add(nose);

  for (const side of [1, -1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.034, 10, 8), skin);
    ear.position.set(0.134 * side, 0.098, 0.005);
    ear.scale.set(0.4, 1, 0.85);
    head.add(ear);
  }

  /* A trimmed beard along the jaw and under the chin. It starts well below
     the nose, so it frames the face instead of replacing it. */
  const beard = new THREE.Mesh(
    new THREE.SphereGeometry(0.136, 18, 12, 0, Math.PI * 2, Math.PI * 0.68, Math.PI * 0.32),
    new THREE.MeshStandardMaterial({ color: 0x413a32, roughness: 0.95 }),
  );
  beard.position.set(0, 0.1, -0.006);
  beard.scale.set(0.97, 0.9, 1);
  head.add(beard);

  const mkArm = (side: 1 | -1) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.215 * side, 0.52, 0);
    torso.add(shoulder);
    /* Sleeve, not limb: a thobe's sleeve is wide and reaches the wrist, so the
       arm is cloth the whole way down and only the hand is skin. */
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.072, 0.24, 4, 12), cloth);
    upper.position.y = -0.16;
    upper.castShadow = true;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.33;
    shoulder.add(elbow);
    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.064, 0.22, 4, 12), cloth);
    fore.position.y = -0.14;
    fore.castShadow = true;
    elbow.add(fore);
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.055, 0.035, 12), clothDeep);
    cuff.position.y = -0.262;
    elbow.add(cuff);
    /* A palm, not a ball: flattened and a little long, so laid on a knee or on
       the ground it reads as a hand resting rather than a knob. */
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.062, 12, 10), skin);
    hand.position.y = -0.31;
    hand.scale.set(0.86, 1.18, 0.5);
    hand.castShadow = true;
    elbow.add(hand);
    return { shoulder, elbow, hand };
  };
  const armL = mkArm(1);
  const armR = mkArm(-1);

  const mkLeg = (side: 1 | -1) => {
    const hip = new THREE.Group();
    hip.position.set(0.11 * side, 0, 0);
    root.add(hip);
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.28, 4, 12), cloth);
    thigh.position.y = -0.2;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    hip.add(knee);
    const shin = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.28, 4, 12), cloth);
    shin.position.y = -0.2;
    shin.castShadow = true;
    knee.add(shin);
    /* Bare feet on an ankle joint of their own, so the sitting can stand the
       right foot upright on its toes the way the sunnah describes. */
    const foot = new THREE.Group();
    foot.position.y = -0.42;
    knee.add(foot);
    /* Rounded, and smaller. A box foot is fine standing and reads as a plank
       the moment the leg folds under for the sitting, which is exactly when
       the foot matters most: the sunnah sits on the left foot with the right
       stood on its toes, and a slab cannot show that. */
    const sole = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.13, 4, 10), skin);
    sole.rotation.x = Math.PI / 2;
    sole.position.set(0, -0.035, -0.075);
    sole.scale.set(1, 1, 0.62);
    sole.castShadow = true;
    foot.add(sole);
    const toes = new THREE.Mesh(new THREE.SphereGeometry(0.046, 10, 8), skin);
    toes.position.set(0, -0.035, -0.15);
    toes.scale.set(1, 0.72, 0.64);
    foot.add(toes);
    return { hip, knee, foot };
  };
  const legL = mkLeg(1);
  const legR = mkLeg(-1);

  return {
    root, torso, head, robe,
    shoulderL: armL.shoulder, shoulderR: armR.shoulder,
    elbowL: armL.elbow, elbowR: armR.elbow,
    handL: armL.hand, handR: armR.hand,
    hipL: legL.hip, hipR: legR.hip,
    kneeL: legL.knee, kneeR: legR.knee,
    footL: legL.foot, footR: legR.foot,
  };
}

export function applyPose(j: Joints, p: Pose) {
  j.root.position.set(0, p.rootY, p.rootZ);
  /* The skirt shortens as the pelvis drops, so kneeling does not push the
     cloth through the floor. */
  j.robe.scale.y = Math.max(0.55, p.rootY / 0.94);
  j.torso.rotation.set(-p.torsoX, p.torsoY, 0);
  j.head.rotation.set(p.headX, p.headY, 0);
  j.shoulderL.rotation.set(p.shoulderXL, 0, -p.shoulderZL);
  j.shoulderR.rotation.set(p.shoulderXR, 0, p.shoulderZR);
  j.elbowL.rotation.x = p.elbowXL;
  j.elbowR.rotation.x = p.elbowXR;
  j.hipL.rotation.x = p.hipXL;
  j.hipR.rotation.x = p.hipXR;
  j.kneeL.rotation.x = p.kneeXL;
  j.kneeR.rotation.x = p.kneeXR;
  j.footL.rotation.x = p.footXL;
  j.footR.rotation.x = p.footXR;
}

/* Putting a hand somewhere exactly.

   Some postures are defined by where the hands END UP, not by joint angles:
   the portal teaches ruku as "hands gripping the knees" and sujud as seven
   limbs on the ground. Angles that look right for one set of proportions miss
   by a hand's width when anything changes, and a hand floating beside a knee
   is precisely the kind of thing this simulator exists to get right.

   So those poses name a target and this solves the two-bone chain to hit it.
   Both elbow branches are tried and the one that lands nearer wins, which
   makes the solver immune to a sign error in the geometry rather than
   dependent on my getting one right. */

const IK_TMP = new THREE.Vector3();
const IK_TARGET = new THREE.Vector3();
const IK_DIR = new THREE.Vector3();
const IK_E = new THREE.Euler();
const IK_Q = new THREE.Quaternion();
const IK_Q2 = new THREE.Quaternion();
const IK_UP = new THREE.Vector3(0, -1, 0);
const IK_X = new THREE.Vector3(1, 0, 0);

/** Where the hand lands, in the torso's frame, for a candidate solution. */
function handAt(
  out: THREE.Vector3, shoulderPos: THREE.Vector3,
  sx: number, sz: number, ex: number, upper: number, fore: number,
) {
  IK_E.set(sx, 0, sz, "XYZ");
  IK_Q.setFromEuler(IK_E);
  out.copy(IK_UP).applyQuaternion(IK_Q).multiplyScalar(upper).add(shoulderPos);
  IK_E.set(ex, 0, 0, "XYZ");
  IK_Q2.setFromEuler(IK_E);
  IK_Q2.premultiply(IK_Q);
  IK_TMP.copy(IK_UP).applyQuaternion(IK_Q2).multiplyScalar(fore);
  out.add(IK_TMP);
}

/**
 * Aim one arm at a point given in world space. Returns the joint angles rather
 * than writing them, so a caller can blend into the solution instead of
 * snapping to it.
 */
export function solveArm(
  joints: Joints,
  side: "L" | "R",
  targetWorld: THREE.Vector3,
  /* Which way the elbow should break when both solutions reach. A two-bone
     chain has two answers for almost every target and they look nothing
     alike: hands folded on the chest with the elbows hanging is a man at
     prayer, and the same hands with the elbows winged up behind him is not.
     Sujud is the one posture that wants them up, because the sunnah raises
     the elbows clear of the ground. */
  elbow: "down" | "up" = "down",
  upper = 0.33,
  fore = 0.31,
): { sx: number; sz: number; ex: number } {
  const shoulder = side === "L" ? joints.shoulderL : joints.shoulderR;
  /* Work in the torso's frame: that is the space the shoulder's own rotation
     is expressed in, so the answer can be written straight back. */
  /* Its own vector, not the one handAt() scribbles on: the target has to
     survive the two forward checks that follow. */
  const t = joints.torso.worldToLocal(IK_TARGET.copy(targetWorld));
  const P = shoulder.position;
  IK_DIR.subVectors(t, P);
  const reach = upper + fore;
  const d = Math.min(reach - 0.004, Math.max(0.06, IK_DIR.length()));
  IK_DIR.normalize();

  /* Elbow flexion from the law of cosines. */
  const interior = Math.acos(Math.min(1, Math.max(-1, (upper * upper + fore * fore - d * d) / (2 * upper * fore))));
  const bend = Math.PI - interior;
  /* How far the upper arm sits off the straight shoulder-to-target line. */
  const off = Math.acos(Math.min(1, Math.max(-1, (upper * upper + d * d - fore * fore) / (2 * upper * d))));

  let best = { sx: 0, sz: 0, ex: 0 };
  let bestScore = Infinity;
  const cand = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const elbowPos = new THREE.Vector3();
  for (const sign of [1, -1]) {
    dir.copy(IK_DIR).applyAxisAngle(IK_X, off * sign);
    /* The arm rests along -Y and is rotated Rx(sx)Rz(sz), so a direction
       (x, y, z) inverts to these two angles. */
    const sz = Math.asin(Math.min(1, Math.max(-1, dir.x)));
    const sx = Math.atan2(-dir.z, -dir.y);
    const ex = bend * -sign;
    handAt(cand, P, sx, sz, ex, upper, fore);
    const err = cand.distanceToSquared(t);
    /* Where this branch puts the elbow, which is what breaks the tie when
       both of them land the hand on the target. */
    elbowPos.copy(IK_UP).applyEuler(IK_E.set(sx, 0, sz, "XYZ")).multiplyScalar(upper).add(P);
    const score = err * 1000 + (elbow === "down" ? elbowPos.y : -elbowPos.y);
    if (score < bestScore) {
      bestScore = score;
      best = { sx, sz, ex };
    }
  }
  return best;
}

/** Write a solved arm onto the rig, easing in by weight so nothing snaps. */
export function applyArm(
  joints: Joints,
  side: "L" | "R",
  sol: { sx: number; sz: number; ex: number },
  weight: number,
) {
  const shoulder = side === "L" ? joints.shoulderL : joints.shoulderR;
  const elbow = side === "L" ? joints.elbowL : joints.elbowR;
  shoulder.rotation.x = lerp(shoulder.rotation.x, sol.sx, weight);
  shoulder.rotation.z = lerp(shoulder.rotation.z, sol.sz, weight);
  elbow.rotation.x = lerp(elbow.rotation.x, sol.ex, weight);
}

export function tweenPose(current: Pose, target: Pose, k: number) {
  for (const key of Object.keys(current) as (keyof Pose)[]) {
    current[key] = lerp(current[key], target[key], k);
  }
}

/* Eased over a fixed span, from the posture left behind to the one arriving.

   The rig used to chase its target exponentially: current += (target-current)
   * k every frame. That is the cheap way and it always looks like software.
   It leaves at full speed, decelerates the whole way, and never actually
   arrives, so a body going down into sujud lurches at the top and creeps at
   the bottom. Real animation eases out of the old pose AND into the new one,
   over a length of time somebody chose. This does that. */
export const smoothstep = (u: number) => u * u * (3 - 2 * u);

export function easePose(out: Pose, from: Pose, to: Pose, u: number) {
  const k = smoothstep(Math.min(1, Math.max(0, u)));
  for (const key of Object.keys(out) as (keyof Pose)[]) {
    out[key] = lerp(from[key], to[key], k);
  }
}

/* The stage: renderer, lights, floor. */

export type Stage = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
};

/** Returns null where WebGL is unavailable, so the caller can fall back. */
export function mountStage(
  canvas: HTMLCanvasElement,
  opts: {
    floor?: number | null;
    fog?: [number, number];
    far?: number;
    /** Half-width of the shadow camera, in scene units. The default suits a
        figure on a mat; a scene the size of a plain has to say so, or
        everything past a couple of metres falls outside the shadow map and
        the whole thing renders flat. */
    lit?: number;
    /** Multiplier on the fill light, for scenes with no walls to bounce off. */
    fill?: number;
    /** Multiplier on the key. White cloth needs a key that can actually make
        it read as white rather than as the green bounced off everything. */
    key?: number;
  } = {},
): Stage | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const fog = opts.fog ?? [8, 18];
  scene.fog = new THREE.Fog(GREEN, fog[0], fog[1]);

  const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, opts.far ?? 60);

  const lit = opts.lit ?? 4;
  const key = new THREE.DirectionalLight(0xfff2d0, 2.2 * (opts.key ?? 1));
  key.position.set(-3 * (lit / 4), 5 * (lit / 4), 2.5 * (lit / 4));
  key.castShadow = true;
  key.shadow.mapSize.set(lit > 8 ? 2048 : 1024, lit > 8 ? 2048 : 1024);
  key.shadow.camera.left = -lit;
  key.shadow.camera.right = lit;
  key.shadow.camera.top = lit;
  key.shadow.camera.bottom = -lit;
  key.shadow.camera.far = lit * 4;
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0x3a6b4a, 0x0a2313, 1.4 * (opts.fill ?? 1)));

  const floor = opts.floor === undefined ? 0x0a2f18 : opts.floor;
  if (floor !== null) {
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshStandardMaterial({ color: floor, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  return { renderer, scene, camera };
}

export function disposeStage(stage: Stage) {
  stage.renderer.dispose();
  stage.scene.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose?.();
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    for (const mm of mats) mm?.dispose?.();
  });
}

/* The camera rig. */

export type CamState = {
  azimuth: number;
  polar: number;
  dist: number;
  /** Non-zero while the drift is allowed to run. */
  idle: number;
  /** Drift direction; flips at the arc bounds. */
  dir: number;
  home: { azimuth: number; polar: number; dist: number };
  limits: { azimuth: [number, number]; polar: [number, number]; dist: [number, number] };
  drift: { speed: number; arc: [number, number] };
};

export function camState(o: {
  azimuth: number; polar: number; dist: number;
  azimuthRange?: [number, number]; polarRange?: [number, number]; distRange?: [number, number];
  driftSpeed?: number; driftArc?: [number, number];
}): CamState {
  return {
    azimuth: o.azimuth,
    polar: o.polar,
    dist: o.dist,
    idle: 1,
    dir: 1,
    home: { azimuth: o.azimuth, polar: o.polar, dist: o.dist },
    limits: {
      azimuth: o.azimuthRange ?? [-0.35, 2.9],
      polar: o.polarRange ?? [0.5, 1.45],
      dist: o.distRange ?? [2.6, 7],
    },
    drift: {
      speed: o.driftSpeed ?? 0.022,
      arc: o.driftArc ?? [o.azimuth - 0.23, o.azimuth + 0.23],
    },
  };
}

/** Drag to turn, wheel and pinch to zoom, all clamped. Returns a cleanup. */
export function orbit(canvas: HTMLCanvasElement, cam: CamState): () => void {
  let dragging = false;
  let px = 0;
  let py = 0;
  let pinch = 0;
  const clamp = (v: number, r: [number, number]) => Math.min(r[1], Math.max(r[0], v));

  const down = (e: PointerEvent) => {
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    cam.idle = 0;
    canvas.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    cam.azimuth = clamp(cam.azimuth - (e.clientX - px) * 0.008, cam.limits.azimuth);
    cam.polar = clamp(cam.polar - (e.clientY - py) * 0.005, cam.limits.polar);
    px = e.clientX;
    py = e.clientY;
  };
  const up = () => {
    dragging = false;
  };
  const wheel = (e: WheelEvent) => {
    e.preventDefault();
    cam.dist = clamp(cam.dist + e.deltaY * 0.004, cam.limits.dist);
    cam.idle = 0;
  };
  const touchmove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      if (pinch) cam.dist = clamp(cam.dist - (d - pinch) * 0.01, cam.limits.dist);
      pinch = d;
      e.preventDefault();
    }
  };
  const touchend = () => {
    pinch = 0;
  };

  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("wheel", wheel, { passive: false });
  canvas.addEventListener("touchmove", touchmove, { passive: false });
  canvas.addEventListener("touchend", touchend);

  /* The drift resumes a while after the last touch. */
  const idleTimer = setInterval(() => {
    if (!dragging) cam.idle = 1;
  }, 6000);

  return () => {
    clearInterval(idleTimer);
    canvas.removeEventListener("pointerdown", down);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", up);
    canvas.removeEventListener("pointercancel", up);
    canvas.removeEventListener("wheel", wheel);
    canvas.removeEventListener("touchmove", touchmove);
    canvas.removeEventListener("touchend", touchend);
  };
}

/** Swing a narrow arc either side of the framing the scene was composed in. */
export function driftCamera(cam: CamState, dt: number, reduced: boolean) {
  if (!cam.idle || reduced) return;
  cam.azimuth += dt * cam.drift.speed * cam.dir;
  const lo = cam.drift.arc[0];
  const hi = cam.drift.arc[1];
  if (cam.azimuth > hi) {
    cam.azimuth = hi;
    cam.dir = -1;
  } else if (cam.azimuth < lo) {
    cam.azimuth = lo;
    cam.dir = 1;
  }
}

export function placeCamera(
  camera: THREE.PerspectiveCamera,
  cam: CamState,
  target: [number, number, number],
  lift = 0.9,
) {
  const r = cam.dist;
  camera.position.set(
    Math.sin(cam.azimuth) * Math.sin(cam.polar) * r,
    Math.cos(cam.polar) * r + lift,
    Math.cos(cam.azimuth) * Math.sin(cam.polar) * r,
  );
  camera.lookAt(target[0], target[1], target[2]);
}

export function fitRenderer(stage: Stage, host: HTMLElement) {
  const w = host.clientWidth;
  const h = host.clientHeight;
  if (!w || !h) return;
  stage.renderer.setSize(w, h, false);
  stage.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  stage.camera.aspect = w / h;
  stage.camera.updateProjectionMatrix();
}
