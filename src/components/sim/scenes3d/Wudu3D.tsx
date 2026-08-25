"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { SceneProps } from "../Simulator";
import {
  applyPose, buildFigure, camState, CREAM, D, disposeStage, driftCamera, fitRenderer,
  GOLD, GOLD_DIM, mountStage, orbit, placeCamera, pose, sym, tweenPose,
  type CamState, type Joints, type Pose, type Stage,
} from "./stage3d";

/* Wudu and ghusl in three dimensions.

   The same jointed figure that prays, at a basin. Each step moves it to the
   posture of that washing, water runs from the ewer to the part being washed,
   and a warm mark travels with that part so it is never in doubt which limb
   the caption is talking about.

   The drawn version cut from one still to the next. This one is a single
   take: the hands rise to the face, the right forearm turns under the water,
   the foot lifts, and the camera never stops moving. That continuity is the
   whole point, because wudu is an order, and an order is hard to read off a
   deck of cards.

   Water is a tapered cylinder from the spout to whatever is being washed,
   re-aimed every frame. It costs one mesh; a particle system for a stream
   this size would cost far more and look no wetter at this scale. */

const WATER = 0xdff1fb;
const STONE = 0x14522a;

/* One posture per step of the rite. Rotations in radians, positive swinging a
   limb toward the front. The left hand does the washing, so the steps that
   wash the right arm bring the left across the chest, which is a negative
   shoulderZ. */
const POSES: Record<string, Pose> = {
  /* Standing, hands at the sides, before anything is said. */
  niyyah: sym({ rootY: 0.94, torsoX: 2 * D, headX: 6 * D, shoulderX: 6 * D, elbowX: 12 * D, shoulderZ: 7 * D }),
  /* Both hands out over the basin. */
  hands: sym({ rootY: 0.92, torsoX: 16 * D, headX: 22 * D, shoulderX: 62 * D, elbowX: 62 * D, shoulderZ: 12 * D }),
  /* Right hand to the mouth; the left waits low. */
  mouth: pose({
    rootY: 0.93, torsoX: 8 * D, headX: 14 * D,
    shoulderXR: 96 * D, elbowXR: 92 * D, shoulderZR: -14 * D,
    shoulderXL: 30 * D, elbowXL: 40 * D, shoulderZL: 10 * D,
  }),
  /* Higher, and the head tips forward to meet it. */
  nose: pose({
    rootY: 0.93, torsoX: 6 * D, headX: 26 * D,
    shoulderXR: 104 * D, elbowXR: 96 * D, shoulderZR: -12 * D,
    shoulderXL: 30 * D, elbowXL: 40 * D, shoulderZL: 10 * D,
  }),
  /* Both hands over the face. */
  face: sym({ rootY: 0.93, torsoX: 4 * D, headX: 18 * D, shoulderX: 100 * D, elbowX: 96 * D, shoulderZ: -6 * D }),
  /* The right forearm held out; the left hand runs along it. */
  armR: pose({
    rootY: 0.93, torsoX: 6 * D, torsoY: -12 * D, headX: 20 * D,
    shoulderXR: 78 * D, elbowXR: 26 * D, shoulderZR: 18 * D,
    shoulderXL: 74 * D, elbowXL: 74 * D, shoulderZL: -34 * D,
  }),
  armL: pose({
    rootY: 0.93, torsoX: 6 * D, torsoY: 12 * D, headX: 20 * D,
    shoulderXL: 78 * D, elbowXL: 26 * D, shoulderZL: 18 * D,
    shoulderXR: 74 * D, elbowXR: 74 * D, shoulderZR: -34 * D,
  }),
  /* Both hands over the crown, drawn back. */
  head: sym({ rootY: 0.94, torsoX: 0, headX: 8 * D, shoulderX: 138 * D, elbowX: 66 * D, shoulderZ: 16 * D }),
  /* Out to the ears, elbows wide. */
  ears: sym({ rootY: 0.94, torsoX: 0, headX: 4 * D, shoulderX: 118 * D, elbowX: 76 * D, shoulderZ: 40 * D }),
  /* The foot comes up to the hands rather than the body folding to the
     floor, which is how it is actually done at a basin. */
  footR: pose({
    rootY: 0.9, torsoX: 24 * D, headX: 30 * D,
    hipXR: 62 * D, kneeXR: -74 * D,
    shoulderXR: 62 * D, elbowXR: 78 * D, shoulderZR: 6 * D,
    shoulderXL: 66 * D, elbowXL: 74 * D, shoulderZL: -18 * D,
  }),
  footL: pose({
    rootY: 0.9, torsoX: 24 * D, headX: 30 * D,
    hipXL: 62 * D, kneeXL: -74 * D,
    shoulderXL: 62 * D, elbowXL: 78 * D, shoulderZL: 6 * D,
    shoulderXR: 66 * D, elbowXR: 74 * D, shoulderZR: -18 * D,
  }),
  /* Palms up, the closing supplication. */
  dua: sym({ rootY: 0.94, torsoX: -4 * D, headX: -8 * D, shoulderX: 58 * D, elbowX: 54 * D, shoulderZ: 22 * D }),
  /* Ghusl: water over the whole body, arms clear of it. */
  whole: sym({ rootY: 0.94, torsoX: 2 * D, headX: -4 * D, shoulderX: 24 * D, elbowX: 18 * D, shoulderZ: 26 * D }),
  sideR: pose({
    rootY: 0.94, torsoY: -22 * D, headX: 6 * D,
    shoulderXR: 40 * D, elbowXR: 30 * D, shoulderZR: 34 * D,
    shoulderXL: 54 * D, elbowXL: 66 * D, shoulderZL: -24 * D,
  }),
  sideL: pose({
    rootY: 0.94, torsoY: 22 * D, headX: 6 * D,
    shoulderXL: 40 * D, elbowXL: 30 * D, shoulderZL: 34 * D,
    shoulderXR: 54 * D, elbowXR: 66 * D, shoulderZR: -24 * D,
  }),
};

const POSE_FOR: Record<string, keyof typeof POSES> = {
  niyyah: "niyyah", bismillah: "hands", hands: "hands", mouth: "mouth", nose: "nose",
  face: "face", armR: "armR", armL: "armL", head: "head", ears: "ears",
  footR: "footR", footL: "footL", dua: "dua",
  "g-niyyah": "niyyah", "g-hands": "hands", "g-wudu": "face", "g-head": "head",
  "g-right": "sideR", "g-left": "sideL", "g-all": "whole",
};

/* Which anchor on the body the water is aimed at, and where the mark sits.
   Two anchors means the point between them, which is how both hands, or both
   ears, are washed at once. */
type AnchorId =
  | "handL" | "handR" | "face" | "mouth" | "crown" | "earL" | "earR"
  | "foreL" | "foreR" | "footL" | "footR" | "chest";

const AIM: Record<string, AnchorId[]> = {
  niyyah: [], bismillah: ["handL", "handR"], hands: ["handL", "handR"],
  mouth: ["mouth"], nose: ["face"], face: ["face"],
  armR: ["foreR"], armL: ["foreL"], head: ["crown"], ears: ["earL", "earR"],
  footR: ["footR"], footL: ["footL"], dua: [],
  "g-niyyah": [], "g-hands": ["handL", "handR"], "g-wudu": ["face"], "g-head": ["crown"],
  "g-right": ["foreR"], "g-left": ["foreL"], "g-all": ["chest"],
};

type Rig = {
  stage: Stage;
  joints: Joints;
  cam: CamState;
  current: Pose;
  target: Pose;
  anchors: Record<AnchorId, THREE.Object3D>;
  aim: AnchorId[];
  stream: THREE.Mesh;
  mark: THREE.Mesh;
  ewer: THREE.Group;
  ripples: THREE.Mesh[];
  /** Eased 0 to 1: how much water is running. */
  flow: number;
  wantFlow: number;
  raf: number;
};

/** Invisible points on the body the water can be aimed at. */
function buildAnchors(j: Joints): Record<AnchorId, THREE.Object3D> {
  const at = (parent: THREE.Object3D, x: number, y: number, z: number) => {
    const o = new THREE.Object3D();
    o.position.set(x, y, z);
    parent.add(o);
    return o;
  };
  return {
    handL: at(j.elbowL, 0, -0.31, 0),
    handR: at(j.elbowR, 0, -0.31, 0),
    foreL: at(j.elbowL, 0, -0.16, 0),
    foreR: at(j.elbowR, 0, -0.16, 0),
    face: at(j.head, 0, 0.09, -0.13),
    mouth: at(j.head, 0, 0.03, -0.14),
    crown: at(j.head, 0, 0.25, 0),
    earL: at(j.head, 0.14, 0.1, 0),
    earR: at(j.head, -0.14, 0.1, 0),
    footL: at(j.kneeL, 0, -0.42, -0.06),
    footR: at(j.kneeR, 0, -0.42, -0.06),
    chest: at(j.torso, 0, 0.5, -0.1),
  };
}

/** The basin, its water, and the ewer that fills it. */
function buildBasin(scene: THREE.Scene) {
  const stone = new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.85 });

  /* Open at the top: a capped cylinder is solid, so the water disc sat
     inside it and every visitor saw a bowl of green stone. */
  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.34, 0.26, 24, 1, true), stone);
  bowl.material.side = THREE.DoubleSide;
  bowl.position.set(0, 0.28, -0.72);
  bowl.receiveShadow = true;
  scene.add(bowl);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.2, 0.16, 16), stone);
  stem.position.set(0, 0.08, -0.72);
  scene.add(stem);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.028, 8, 28), new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.6, metalness: 0.25 }));
  rim.rotation.x = -Math.PI / 2;
  rim.position.set(0, 0.41, -0.72);
  scene.add(rim);

  /* Not metallic. A metal surface with nothing to reflect takes its colour
     from the environment, and in a scene lit green through and through the
     basin filled with green paint instead of water. A faint emissive keeps it
     pale on its own account. */
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(0.44, 28),
    new THREE.MeshStandardMaterial({
      color: WATER, roughness: 0.12, metalness: 0,
      emissive: WATER, emissiveIntensity: 0.28,
      transparent: true, opacity: 0.85,
    }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, 0.38, -0.72);
  scene.add(water);

  /* Rings that open and fade on the surface while water is falling. */
  const ripples: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.36, 24),
      new THREE.MeshBasicMaterial({ color: WATER, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    );
    r.rotation.x = -Math.PI / 2;
    r.position.set(0, 0.4, -0.72);
    scene.add(r);
    ripples.push(r);
  }

  return ripples;
}

function buildEwer(scene: THREE.Scene) {
  const brass = new THREE.MeshStandardMaterial({ color: GOLD_DIM, roughness: 0.35, metalness: 0.55 });
  const ewer = new THREE.Group();

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), brass);
  body.castShadow = true;
  ewer.add(body);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 0.18, 12), brass);
  neck.position.y = 0.19;
  ewer.add(neck);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.6 }));
  cap.position.y = 0.3;
  ewer.add(cap);
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.04, 0.3, 10), brass);
  spout.position.set(-0.14, 0.16, 0);
  spout.rotation.z = Math.PI / 3.1;
  ewer.add(spout);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 8, 18, Math.PI * 1.2), brass);
  handle.position.set(0.15, 0.1, 0);
  handle.rotation.z = -Math.PI / 2.4;
  ewer.add(handle);

  /* Where the water leaves. Kept as a child so the tilt carries it. */
  const tip = new THREE.Object3D();
  tip.position.set(-0.26, 0.26, 0);
  tip.name = "tip";
  ewer.add(tip);

  ewer.position.set(-0.86, 1.16, -0.62);
  scene.add(ewer);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.07, 1, 12),
    new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.9 }),
  );
  post.position.set(-0.86, 0.5, -0.62);
  scene.add(post);

  return ewer;
}

const V_A = new THREE.Vector3();
const V_B = new THREE.Vector3();
const V_MID = new THREE.Vector3();
const V_DIR = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

export function Wudu3D({ step, playing, lang }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rigRef = useRef<Rig | null>(null);
  const stepId = POSE_FOR[step.id] ?? "niyyah";
  const aimKey = (AIM[step.id] ?? []).join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const stage = mountStage(canvas, { fog: [7, 17], key: 1.55, fill: 0.42 });
    if (!stage) return;

    /* The same light the prayer scene uses. The room key stands behind the
       figure, so without this the side the camera looks at is lit only by a
       green hemisphere and the white thobe comes out sage. */
    const front = new THREE.DirectionalLight(0xfff4e4, 1.65);
    front.position.set(3.4, 3.2, 4.6);
    stage.scene.add(front);
    stage.scene.add(new THREE.AmbientLight(0xfff1da, 0.42));

    const ripples = buildBasin(stage.scene);
    const ewer = buildEwer(stage.scene);
    const joints = buildFigure();
    stage.scene.add(joints.root);
    const anchors = buildAnchors(joints);

    /* The falling water. One tapered cylinder, re-aimed each frame from the
       spout to whatever is being washed. */
    const stream = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.016, 1, 8, 1, true),
      new THREE.MeshStandardMaterial({
        color: WATER, transparent: true, opacity: 0, roughness: 0.1,
        metalness: 0, emissive: WATER, emissiveIntensity: 0.6, side: THREE.DoubleSide,
      }),
    );
    stage.scene.add(stream);

    /* Where the water lands: a soft warm mark that rides the limb. */
    const mark = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 16, 14),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0 }),
    );
    stage.scene.add(mark);
    const markLight = new THREE.PointLight(GOLD, 0, 1.6);
    stage.scene.add(markLight);

    const rig: Rig = {
      stage,
      joints,
      /* Facing the camera rather than in profile: a washing is read from the
         front, where both hands are visible, unlike a prayer. */
      cam: camState({
        azimuth: 2.72, polar: 1.26, dist: 4.35,
        azimuthRange: [1.9, 4.3],
        distRange: [2.6, 6.4],
        driftArc: [2.55, 2.95],
        driftSpeed: 0.02,
      }),
      current: { ...POSES.niyyah },
      target: { ...POSES.niyyah },
      anchors,
      aim: [],
      stream,
      mark,
      ewer,
      ripples,
      flow: 0,
      wantFlow: 0,
      raf: 0,
    };
    if (reduced) rig.cam.idle = 0;
    rigRef.current = rig;

    const resize = () => fitRenderer(stage, host);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const releaseOrbit = orbit(canvas, rig.cam);

    const tip = ewer.getObjectByName("tip") as THREE.Object3D;
    const streamMat = stream.material as THREE.MeshStandardMaterial;
    const markMat = mark.material as THREE.MeshBasicMaterial;
    let t = 0;
    let last = performance.now();

    const loop = (now: number) => {
      rig.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      tweenPose(rig.current, rig.target, reduced ? 1 : 1 - Math.exp(-dt * 5.5));
      applyPose(rig.joints, rig.current);

      /* Water eases on and off rather than blinking, and the ewer tips as it
         pours. */
      rig.flow += (rig.wantFlow - rig.flow) * Math.min(1, dt * 4);
      ewer.rotation.z = -0.72 * rig.flow;

      if (rig.aim.length && rig.flow > 0.01) {
        V_B.set(0, 0, 0);
        for (const id of rig.aim) V_B.add(rig.anchors[id].getWorldPosition(V_A));
        V_B.divideScalar(rig.aim.length);
        tip.getWorldPosition(V_A);
        V_DIR.subVectors(V_B, V_A);
        const len = V_DIR.length();
        V_MID.addVectors(V_A, V_B).multiplyScalar(0.5);
        stream.position.copy(V_MID);
        stream.quaternion.setFromUnitVectors(UP, V_DIR.normalize());
        stream.scale.set(1, len, 1);
        streamMat.opacity = 0.5 * rig.flow;
        stream.visible = true;

        mark.position.copy(V_B);
        /* A slow pulse, so the mark reads as water moving over the limb. */
        const pulse = reduced ? 1 : 0.86 + Math.sin(t * 3.4) * 0.14;
        mark.scale.setScalar(pulse);
        markMat.opacity = 0.22 * rig.flow;
        markLight.position.copy(V_B);
        markLight.intensity = 1.5 * rig.flow;
      } else {
        stream.visible = false;
        markMat.opacity = 0;
        markLight.intensity = 0;
      }

      /* Rings opening on the surface, staggered by a third of a cycle. */
      rig.ripples.forEach((r, i) => {
        const p = ((t * 0.55 + i / 3) % 1);
        const s = 0.25 + p * 0.95;
        r.scale.setScalar(s);
        (r.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.4 * rig.flow;
      });

      driftCamera(rig.cam, dt, reduced);
      placeCamera(stage.camera, rig.cam, [0, 0.92, -0.28]);
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

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.target = { ...POSES[stepId] };
  }, [stepId]);

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.aim = aimKey ? (aimKey.split(",") as AnchorId[]) : [];
    rig.wantFlow = rig.aim.length ? 1 : 0;
  }, [aimKey]);

  useEffect(() => {
    const rig = rigRef.current;
    if (rig && !playing) rig.cam.idle = 0;
  }, [playing]);

  const resetView = () => {
    const rig = rigRef.current;
    if (rig) Object.assign(rig.cam, rig.cam.home);
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
