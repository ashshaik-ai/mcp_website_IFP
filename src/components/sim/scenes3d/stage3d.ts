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
};

const ZERO: Pose = {
  rootY: 0.94, rootZ: 0, torsoX: 0, torsoY: 0, headX: 0, headY: 0,
  shoulderXL: 0, shoulderXR: 0, shoulderZL: 0, shoulderZR: 0,
  elbowXL: 0, elbowXR: 0, hipXL: 0, hipXR: 0, kneeXL: 0, kneeXR: 0,
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
  elbowX?: number; hipX?: number; kneeX?: number;
}): Pose {
  return pose({
    rootY: p.rootY, rootZ: p.rootZ, torsoX: p.torsoX, torsoY: p.torsoY,
    headX: p.headX, headY: p.headY,
    shoulderXL: p.shoulderX, shoulderXR: p.shoulderX,
    shoulderZL: p.shoulderZ, shoulderZR: p.shoulderZ,
    elbowXL: p.elbowX, elbowXR: p.elbowX,
    hipXL: p.hipX, hipXR: p.hipX,
    kneeXL: p.kneeX, kneeXR: p.kneeX,
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
  robe: THREE.Mesh;
};

/** The figure, on a root the caller adds to its own scene. */
export function buildFigure(): Joints {
  const root = new THREE.Group();

  const torso = new THREE.Group();
  root.add(torso);
  const trunk = capsule(0.17, 0.5, GOLD);
  trunk.position.y = 0.36;
  torso.add(trunk);

  /* The thawb: a soft cone from the hips down. On the ROOT, not the torso.
     Cloth hangs from gravity, and parenting it to the spine turned ruku into
     a megaphone around the head. */
  const robe = new THREE.Mesh(
    new THREE.ConeGeometry(0.27, 0.5, 14, 1, true),
    new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.8, side: THREE.DoubleSide }),
  );
  robe.position.y = -0.16;
  robe.castShadow = true;
  root.add(robe);

  const head = new THREE.Group();
  head.position.y = 0.72;
  torso.add(head);
  const skull = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 16, 16),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.5 }),
  );
  skull.position.y = 0.1;
  skull.castShadow = true;
  head.add(skull);
  const kufi = new THREE.Mesh(
    new THREE.SphereGeometry(0.145, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.45),
    new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.7 }),
  );
  kufi.position.y = 0.12;
  head.add(kufi);
  /* A beard along the jaw, facing the qibla. Without an off-axis feature a
     head turn of 55 degrees changes nothing on screen. */
  const beard = new THREE.Mesh(
    new THREE.SphereGeometry(0.105, 14, 10, 0, Math.PI * 2, Math.PI * 0.42, Math.PI * 0.58),
    new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.85 }),
  );
  beard.position.set(0, 0.07, -0.045);
  head.add(beard);

  const mkArm = (side: 1 | -1) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(0.22 * side, 0.6, 0);
    torso.add(shoulder);
    const upper = capsule(0.055, 0.26, GOLD);
    upper.position.y = -0.16;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.33;
    shoulder.add(elbow);
    const fore = capsule(0.05, 0.24, GOLD);
    fore.position.y = -0.15;
    elbow.add(fore);
    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 10, 10),
      new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.5 }),
    );
    hand.position.y = -0.31;
    elbow.add(hand);
    return { shoulder, elbow, hand };
  };
  const armL = mkArm(1);
  const armR = mkArm(-1);

  const mkLeg = (side: 1 | -1) => {
    const hip = new THREE.Group();
    hip.position.set(0.11 * side, 0, 0);
    root.add(hip);
    const thigh = capsule(0.08, 0.3, GOLD_DIM);
    thigh.position.y = -0.2;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    hip.add(knee);
    const shin = capsule(0.065, 0.3, GOLD_DIM);
    shin.position.y = -0.2;
    knee.add(shin);
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.07, 0.24),
      new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.6 }),
    );
    foot.position.set(0, -0.42, -0.06);
    foot.castShadow = true;
    knee.add(foot);
    return { hip, knee };
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
  };
}

export function applyPose(j: Joints, p: Pose) {
  j.root.position.set(0, p.rootY, p.rootZ);
  /* The skirt shortens as the pelvis drops, so kneeling does not push the
     cloth through the floor. */
  j.robe.scale.y = Math.max(0.45, p.rootY / 0.94);
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
}

export function tweenPose(current: Pose, target: Pose, k: number) {
  for (const key of Object.keys(current) as (keyof Pose)[]) {
    current[key] = lerp(current[key], target[key], k);
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
  const key = new THREE.DirectionalLight(0xfff2d0, 2.2);
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
