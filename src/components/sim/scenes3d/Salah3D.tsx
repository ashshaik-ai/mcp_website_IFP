"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { SceneProps } from "../Simulator";
import {
  applyPose, buildFigure, camState, CREAM, D, disposeStage, driftCamera, fitRenderer,
  GOLD, GOLD_DIM, mountStage, orbit, placeCamera, sym, tweenPose,
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

const POSES: Record<string, Pose> = {
  qiyam:   sym({ rootY: 0.94, torsoX: 3 * D, headX: 8 * D, shoulderX: 15 * D, elbowX: 95 * D, shoulderZ: 6 * D }),
  takbeer: sym({ rootY: 0.94, shoulderX: 125 * D, elbowX: 45 * D, shoulderZ: 25 * D }),
  ruku:    sym({ rootY: 0.94, torsoX: 85 * D, headX: -12 * D, shoulderX: 80 * D, elbowX: 8 * D, shoulderZ: 10 * D }),
  itidal:  sym({ rootY: 0.94, shoulderX: 5 * D, elbowX: 6 * D, shoulderZ: 5 * D }),
  /* Head to the mat, not hovering over it: the portal's own Mistakes tab
     teaches forehead and nose down, and an audit persona caught the figure
     contradicting it. Kneeling geometry: the knee lands at
     rootY - 0.42*cos(hipX), so the seated poses drop the pelvis until that is
     the mat. */
  sujud:   sym({ rootY: 0.32, rootZ: -0.08, torsoX: 104 * D, headX: 52 * D, shoulderX: 100 * D, elbowX: 12 * D, hipX: 35 * D, kneeX: -125 * D, shoulderZ: 14 * D }),
  julus:   sym({ rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 10 * D, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D }),
  salamR:  sym({ rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 4 * D, headY: -55 * D, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D }),
  salamL:  sym({ rootY: 0.3, rootZ: -0.02, torsoX: 8 * D, headX: 4 * D, headY: 55 * D, shoulderX: 52 * D, elbowX: 28 * D, hipX: 45 * D, kneeX: -135 * D, shoulderZ: 8 * D }),
  /* The funeral prayer is performed entirely standing, so its salam turns the
     head from qiyam rather than from the sitting posture the five daily
     prayers close in. */
  salamStandR: sym({ rootY: 0.94, torsoX: 3 * D, headX: 4 * D, headY: -55 * D, shoulderX: 15 * D, elbowX: 95 * D, shoulderZ: 6 * D }),
  salamStandL: sym({ rootY: 0.94, torsoX: 3 * D, headX: 4 * D, headY: 55 * D, shoulderX: 15 * D, elbowX: 95 * D, shoulderZ: 6 * D }),
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

type Rig = {
  stage: Stage;
  joints: Joints;
  cam: CamState;
  current: Pose;
  target: Pose;
  raf: number;
};

/** The mat, and the niche the prayer faces. */
function buildRoom(scene: THREE.Scene) {
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
    const stage = mountStage(canvas);
    if (!stage) return;

    buildRoom(stage.scene);
    const joints = buildFigure();
    stage.scene.add(joints.root);

    const rig: Rig = {
      stage,
      joints,
      cam: camState({
        azimuth: 1.45,
        polar: 1.32,
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
        driftArc: [1.22, 1.68],
      }),
      current: { ...POSES.qiyam },
      target: { ...POSES.qiyam },
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

      /* Ease the joints toward the target posture. Reduced motion jumps. */
      tweenPose(rig.current, rig.target, reduced ? 1 : 1 - Math.exp(-dt * 6));
      applyPose(rig.joints, rig.current);
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
    if (rig) rig.target = { ...POSES[stepId] };
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
