"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { SceneProps } from "../Simulator";

/* The praying figure in three dimensions.

   The SVG figure draws each posture; this one *is* a body — a jointed rig of
   capsules the camera can walk around. Drag turns the scene, the wheel or a
   pinch moves closer, and each step of the prayer eases the joints from one
   posture into the next, so ruku is not a picture of bowing but the act of it.

   Built from primitives on purpose. A rigged glTF human would need a model we
   do not own, downloads measured in megabytes, and licensing questions; a
   figure assembled from capsules costs nothing to ship beyond three.js itself,
   which loads lazily and only on pages that show this scene. The look stays
   the site's: gold figure, deep green ground, the mihrab behind.

   All rotation targets are in radians. The rig is a hierarchy —
   root(pelvis) -> torso -> head/arms, root -> legs — so a posture is one set
   of joint angles and the tween interpolates the whole body at once, the same
   scheme the original SVG skeleton used. */

type Pose = {
  /** Pelvis height above the mat, in scene units (figure is ~1.7 tall). */
  rootY: number;
  /** Pelvis slide toward the qibla, for sujud and sitting. */
  rootZ: number;
  torsoX: number;
  headX: number;
  /** Head turn for the salam. */
  headY: number;
  shoulderX: number;
  elbowX: number;
  hipX: number;
  kneeX: number;
  /** Arms spread a little apart from the body. */
  shoulderZ: number;
};

const D = Math.PI / 180;

const POSES: Record<string, Pose> = {
  /* Sign convention, verified from the rendered profile: positive rotation
     swings a limb toward the qibla (forward), for arms and legs alike; the
     torso pitch is applied negated so a positive torsoX also leans forward.
     Kneeling geometry: the knee lands at rootY - 0.42*cos(hipX), so the
     seated poses drop the pelvis until that is the mat. */
  qiyam:   { rootY: 0.94, rootZ: 0, torsoX: 3 * D, headX: 8 * D, headY: 0, shoulderX: 15 * D, elbowX: 95 * D, hipX: 0, kneeX: 0, shoulderZ: 6 * D },
  takbeer: { rootY: 0.94, rootZ: 0, torsoX: 0, headX: 0, headY: 0, shoulderX: 125 * D, elbowX: 45 * D, hipX: 0, kneeX: 0, shoulderZ: 25 * D },
  ruku:    { rootY: 0.94, rootZ: 0, torsoX: 85 * D, headX: -12 * D, headY: 0, shoulderX: 80 * D, elbowX: 8 * D, hipX: 0, kneeX: 0, shoulderZ: 10 * D },
  itidal:  { rootY: 0.94, rootZ: 0, torsoX: 0, headX: 0, headY: 0, shoulderX: 5 * D, elbowX: 6 * D, hipX: 0, kneeX: 0, shoulderZ: 5 * D },
  /* Head to the mat, not hovering over it — the portal's own Mistakes tab
     teaches forehead and nose down, and an audit persona caught the figure
     contradicting it. Deeper torso pitch and head tuck than the first cut. */
  sujud:   { rootY: 0.32, rootZ: -0.08, torsoX: 104 * D, headX: 52 * D, headY: 0, shoulderX: 100 * D, elbowX: 12 * D, hipX: 35 * D, kneeX: -125 * D, shoulderZ: 14 * D },
  julus:   { rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 10 * D, headY: 0, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D },
  salamR:  { rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 4 * D, headY: -55 * D, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D },
  salamL:  { rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 4 * D, headY: 55 * D, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D },
  /* The funeral prayer is performed entirely standing, so its salam turns the
     head from qiyam rather than from the sitting posture the five daily
     prayers close in. */
  salamStandR: { rootY: 0.94, rootZ: 0, torsoX: 3 * D, headX: 4 * D, headY: -55 * D, shoulderX: 15 * D, elbowX: 95 * D, hipX: 0, kneeX: 0, shoulderZ: 6 * D },
  salamStandL: { rootY: 0.94, rootZ: 0, torsoX: 3 * D, headX: 4 * D, headY: 55 * D, shoulderX: 15 * D, elbowX: 95 * D, hipX: 0, kneeX: 0, shoulderZ: 6 * D },
};

/* Step ids from any portal onto a posture; unknown ids stand. */
const POSE_FOR: Record<string, keyof typeof POSES> = {
  niyyah: "qiyam", takbeer: "takbeer", qiyam: "qiyam", fatiha: "qiyam", surah: "qiyam",
  /* The funeral prayer's later takbirs, all made standing. */
  takbeer2: "takbeer", takbeer3: "takbeer", takbeer4: "takbeer", durood: "qiyam", dua: "qiyam",
  salamStand: "salamStandR", salamStand2: "salamStandL",
  ruku: "ruku", itidal: "itidal", sujud: "sujud", sujud1: "sujud", sujud2: "sujud",
  julus: "julus", jalsa: "julus", tashahhud: "julus", salam: "salamR", salam2: "salamL",
  standing: "qiyam", sitting: "julus", bowing: "ruku", prostration: "sujud",
};

/* One rig instance and everything needed to drive it. */
type Rig = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  joints: {
    root: THREE.Group;
    torso: THREE.Group;
    head: THREE.Group;
    shoulderL: THREE.Group;
    shoulderR: THREE.Group;
    elbowL: THREE.Group;
    elbowR: THREE.Group;
    hipL: THREE.Group;
    hipR: THREE.Group;
    kneeL: THREE.Group;
    kneeR: THREE.Group;
  };
  current: Pose;
  target: Pose;
  /** Camera spherical state, driven by the pointer. */
  azimuth: number;
  polar: number;
  dist: number;
  idle: number;
  /** Idle-drift direction; flips at the arc bounds. */
  dir: number;
  raf: number;
  dispose: () => void;
};

const GOLD = 0xe8b84b;
const GOLD_DIM = 0xc8922a;
const GREEN = 0x0d3b1e;
const CREAM = 0xfff6df;

function capsule(r: number, len: number, color: number): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.CapsuleGeometry(r, len, 4, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1 }),
  );
  m.castShadow = true;
  return m;
}

function buildRig(canvas: HTMLCanvasElement, reduced: boolean): Rig | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(GREEN, 8, 18);

  const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 40);

  /* Light: a warm key from the mihrab side, a soft fill, and a hemisphere so
     nothing goes black. */
  const key = new THREE.DirectionalLight(0xfff2d0, 2.2);
  key.position.set(-3, 5, 2.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -4;
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0x3a6b4a, 0x0a2313, 1.4));

  /* Ground and mat. */
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(9, 48),
    new THREE.MeshStandardMaterial({ color: 0x0a2f18, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const mat = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.02, 2.3),
    new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.85 }),
  );
  mat.position.set(0, 0.01, -0.15);
  mat.receiveShadow = true;
  scene.add(mat);
  const matBorder = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.012, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x8a6420, roughness: 0.9 }),
  );
  matBorder.position.set(0, 0.005, -0.15);
  matBorder.receiveShadow = true;
  scene.add(matBorder);

  /* The mihrab: two columns and an arch, standing where the figure faces. */
  const arch = new THREE.Group();
  const colGeom = new THREE.CylinderGeometry(0.09, 0.11, 2.2, 10);
  const colMat = new THREE.MeshStandardMaterial({ color: 0x1a5c30, roughness: 0.7 });
  const c1 = new THREE.Mesh(colGeom, colMat);
  c1.position.set(-0.85, 1.1, 0);
  const c2 = new THREE.Mesh(colGeom, colMat);
  c2.position.set(0.85, 1.1, 0);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.09, 10, 24, Math.PI),
    colMat,
  );
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

  /* ── The figure ─────────────────────────────────────────────────────── */
  const root = new THREE.Group();
  scene.add(root);

  const torso = new THREE.Group();
  root.add(torso);
  const trunk = capsule(0.17, 0.5, GOLD);
  trunk.position.y = 0.36;
  torso.add(trunk);
  /* The thawb: a soft cone from the hips down. On the ROOT, not the torso —
     cloth hangs from gravity, and parenting it to the spine turned ruku into
     a megaphone around the head. The SVG figure taught the same lesson. */
  const robe = new THREE.Mesh(
    new THREE.ConeGeometry(0.27, 0.5, 14, 1, true),
    new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.8, side: THREE.DoubleSide }),
  );
  /* Low enough that its apex stays inside the pelvis when the trunk pitches
     forward — in ruku it used to poke up behind like a tail. */
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
  /* A beard along the jaw, facing the qibla. The head was a sphere under a
     cap, so turning it 55 degrees for the salam changed nothing on screen and
     the two salam frames were indistinguishable from the sitting posture. An
     off-axis feature is what makes a yaw legible. */
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
    return { shoulder, elbow };
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

  const rig: Rig = {
    renderer,
    scene,
    camera,
    joints: {
      root,
      torso,
      head,
      shoulderL: armL.shoulder,
      shoulderR: armR.shoulder,
      elbowL: armL.elbow,
      elbowR: armR.elbow,
      hipL: legL.hip,
      hipR: legR.hip,
      kneeL: legL.knee,
      kneeR: legR.knee,
    },
    current: { ...POSES.qiyam },
    target: { ...POSES.qiyam },
    azimuth: 1.45,
    polar: 1.32,
    dist: 4.2,
    idle: reduced ? 0 : 1,
    dir: 1,
    raf: 0,
    dispose: () => {
      cancelAnimationFrame(rig.raf);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        for (const mm of mats) mm?.dispose?.();
      });
    },
  };
  return rig;
}

function applyPose(rig: Rig, p: Pose) {
  const j = rig.joints;
  j.root.position.set(0, p.rootY, p.rootZ);
  /* The skirt shortens as the pelvis drops, so kneeling does not push the
     cloth through the mat. */
  const robe = j.root.children.find((c) => (c as THREE.Mesh).geometry?.type === "ConeGeometry");
  if (robe) robe.scale.y = Math.max(0.45, p.rootY / 0.94);
  j.torso.rotation.x = -p.torsoX;
  j.head.rotation.set(p.headX, p.headY, 0);
  j.shoulderL.rotation.set(p.shoulderX, 0, -p.shoulderZ);
  j.shoulderR.rotation.set(p.shoulderX, 0, p.shoulderZ);
  j.elbowL.rotation.x = p.elbowX;
  j.elbowR.rotation.x = p.elbowX;
  j.hipL.rotation.x = p.hipX;
  j.hipR.rotation.x = p.hipX;
  j.kneeL.rotation.x = p.kneeX;
  j.kneeR.rotation.x = p.kneeX;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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
    const rig = buildRig(canvas, reduced);
    if (!rig) return;
    rigRef.current = rig;

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      rig.renderer.setSize(w, h, false);
      rig.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rig.camera.aspect = w / h;
      rig.camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* Pointer orbit: drag turns, wheel and pinch zoom, all clamped so the
       camera can neither dive under the mat nor fly away. */
    let dragging = false;
    let px = 0;
    let py = 0;
    let pinch = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      rig.idle = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      /* Azimuth is clamped as well as polar now: it used to be free, so a
         short flick swung the camera behind the mihrab, where the columns
         stand between it and the figure and the scene reads as empty. The
         arc left here is wide — about 200 degrees — and still frames the
         prayer from the front. */
      rig.azimuth = Math.min(2.9, Math.max(-0.35, rig.azimuth - (e.clientX - px) * 0.008));
      rig.polar = Math.min(1.45, Math.max(0.5, rig.polar - (e.clientY - py) * 0.005));
      px = e.clientX;
      py = e.clientY;
    };
    const up = () => {
      dragging = false;
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      rig.dist = Math.min(7, Math.max(2.6, rig.dist + e.deltaY * 0.004));
      rig.idle = 0;
    };
    const touchmove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        if (pinch) rig.dist = Math.min(7, Math.max(2.6, rig.dist - (d - pinch) * 0.01));
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

    let last = performance.now();
    const loop = (now: number) => {
      rig.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* Ease the joints toward the target posture. Reduced motion jumps. */
      const k = reduced ? 1 : 1 - Math.exp(-dt * 6);
      const c = rig.current;
      const t = rig.target;
      for (const key of Object.keys(c) as (keyof Pose)[]) c[key] = lerp(c[key], t[key], k);
      applyPose(rig, c);

      /* A slow drift while nothing is being touched, so the scene reads as a
         place rather than a card. Never under reduced motion. */
      /* The drift used to circle without bound; behind the mihrab (azimuth
         near pi) the columns sat squarely between camera and figure, and at
         phone width one persona watched sujood happen behind a pillar. The
         camera now swings a front arc and turns back at its ends. */
      if (rig.idle && !reduced) {
        rig.azimuth += dt * 0.07 * rig.dir;
        if (rig.azimuth > 2.35) { rig.azimuth = 2.35; rig.dir = -1; }
        else if (rig.azimuth < 0.55) { rig.azimuth = 0.55; rig.dir = 1; }
      }

      const r = rig.dist;
      rig.camera.position.set(
        Math.sin(rig.azimuth) * Math.sin(rig.polar) * r,
        Math.cos(rig.polar) * r + 0.9,
        Math.cos(rig.azimuth) * Math.sin(rig.polar) * r,
      );
      rig.camera.lookAt(0, 0.72, -0.25);
      rig.renderer.render(rig.scene, rig.camera);
    };
    rig.raf = requestAnimationFrame(loop);

    /* Idle drift resumes a while after the last touch. */
    const idleTimer = setInterval(() => {
      if (!dragging) rig.idle = 1;
    }, 6000);

    return () => {
      clearInterval(idleTimer);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("wheel", wheel);
      canvas.removeEventListener("touchmove", touchmove);
      canvas.removeEventListener("touchend", touchend);
      rig.dispose();
      rigRef.current = null;
    };
  }, []);

  /* A new step retargets the tween; the loop above carries the body there. */
  useEffect(() => {
    const rig = rigRef.current;
    if (rig) rig.target = { ...POSES[stepId] };
  }, [stepId]);

  /* Keep drifting only while playing; a paused study pose holds still. */
  useEffect(() => {
    const rig = rigRef.current;
    if (rig && !playing) rig.idle = 0;
  }, [playing]);

  /* A way back to the framing the scene was designed in, for anyone who has
     spun it somewhere unhelpful. */
  const resetView = () => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.azimuth = 1.45;
    rig.polar = 1.32;
    rig.dist = 4.2;
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
