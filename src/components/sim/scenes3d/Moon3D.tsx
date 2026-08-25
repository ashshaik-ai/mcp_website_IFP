"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { SceneProps } from "../Simulator";
import { CREAM, disposeStage, fitRenderer, GOLD, lerp, mountStage } from "./stage3d";

/* The lunar month as the thing itself.

   The drawing slid a disc of sky colour across a disc of moon, which is a
   fair diagram and a poor explanation: it shows the shape without showing
   why. Here a real sphere hangs in real space and one light moves around it,
   so the crescent is a shadow rather than a cut-out, and the terminator bends
   across the surface the way it does in the sky.

   No orbit control on this one. There is exactly one instructive viewpoint of
   a moon phase, the one from Earth, and letting the camera leave it turns a
   lesson into a toy: from the side, every phase looks the same. */

const MOON_R = 1;

/* Sun angle for each step, measured from behind the viewer. 0 puts the light
   at our shoulder and the face is full; pi puts it behind the moon and the
   face is dark. Waxing and waning differ by which side the light comes from,
   which is the sign on the x term. */
const PHASE: Record<string, number> = {
  /* A hilal is thin. At 2.4 radians roughly a seventh of the face is lit,
     which renders as a fat half-moon and undersells the one phase the whole
     month is dated from. */
  new: 3.05, crescent: 2.72, "first-quarter": Math.PI / 2, gibbous: 0.9,
  full: 0, "last-quarter": Math.PI / 2, old: 2.72,
  /* The sequence closes where it opened. Without this the last step read as
     a crescent and the cycle never shut. */
  next: 3.05,
};
const WANING = new Set(["last-quarter", "old"]);

function sunFor(id: string): { angle: number; side: number } {
  if (id.startsWith("month")) return { angle: 0.55, side: 1 };
  /* Waxing moons are lit on the sun's side, which after sunset is the right
     limb; a waning moon is lit on the left. It was the wrong way round. */
  return { angle: PHASE[id] ?? 2.72, side: WANING.has(id) ? -1 : 1 };
}

type Rig = {
  raf: number;
  sun: THREE.DirectionalLight;
  moon: THREE.Mesh;
  glow: THREE.Sprite;
  stars: THREE.Points;
  /** Eased sun position, so a step change swings the light rather than cutting. */
  angle: number;
  spinning: boolean;
  side: number;
  wantAngle: number;
  wantSide: number;
};

/** A cratered surface, cheaply: value noise baked once into a canvas. */
function moonTexture(): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#efe4cb";
  ctx.fillRect(0, 0, size, size);
  /* Maria and craters. A plain sphere reads as a lamp; these give the light
     something to fall across. Positions are fixed, not random, so the moon
     looks the same on every visit and in every build. */
  const spots: [number, number, number, number][] = [
    [70, 82, 34, 0.16], [104, 60, 18, 0.12], [150, 96, 26, 0.14], [56, 132, 22, 0.1],
    [186, 148, 30, 0.13], [122, 170, 20, 0.11], [206, 60, 14, 0.1], [30, 190, 16, 0.09],
    [160, 214, 24, 0.12], [96, 118, 10, 0.08], [222, 190, 12, 0.09], [16, 54, 12, 0.08],
  ];
  for (const [x, y, r, a] of spots) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(120,104,74,${a + 0.06})`);
    g.addColorStop(1, "rgba(120,104,74,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** A halo that only shows where the moon is lit. */
function glowSprite(): THREE.Sprite {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.32, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,246,223,0.5)");
  g.addColorStop(1, "rgba(255,246,223,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
  );
  sprite.scale.setScalar(5.2);
  return sprite;
}

function starField(): THREE.Points {
  /* Fixed positions on a shell behind the moon: a deterministic scatter, so
     no Math.random reaches a build that has to be reproducible. */
  const n = 160;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    /* Golden-angle spiral: even coverage without randomness. */
    const t = (i + 0.5) / n;
    const y = 1 - 2 * t;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const a = i * 2.399963;
    pos[i * 3] = Math.cos(a) * r * 18;
    pos[i * 3 + 1] = y * 12;
    pos[i * 3 + 2] = Math.sin(a) * r * 18 - 6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: CREAM, size: 0.11, transparent: true, opacity: 0.75, sizeAttenuation: true }),
  );
}

export function Moon3D({ step, playing }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rigRef = useRef<Rig | null>(null);
  const want = sunFor(step.id);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    /* No floor and no fog: this is a sky. */
    const stage = mountStage(canvas, { floor: null, fog: [40, 90], far: 120 });
    if (!stage) return;

    /* mountStage lights a room. A moon is lit by one sun and nothing else,
       so everything but a faint fill comes off. */
    stage.scene.traverse((o) => {
      const l = o as THREE.Light;
      if (l.isLight) l.intensity = l.type === "HemisphereLight" ? 0.16 : 0;
    });

    const tex = moonTexture();
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(MOON_R, 48, 32),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.94, metalness: 0 }),
    );
    stage.scene.add(moon);

    const sun = new THREE.DirectionalLight(0xfff6df, 3.1);
    sun.position.set(0, 0, 6);
    stage.scene.add(sun);

    const glow = glowSprite();
    stage.scene.add(glow);

    const stars = starField();
    stage.scene.add(stars);

    /* A ring the moon sits inside, so the frame reads as an instrument
       rather than a photograph. */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.012, 6, 96),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 }),
    );
    ring.position.z = -0.6;
    stage.scene.add(ring);

    stage.camera.position.set(0, 0, 5.4);
    stage.camera.lookAt(0, 0, 0);

    const rig: Rig = {
      raf: 0, sun, moon, glow, stars,
      angle: 2.72, side: 1, wantAngle: 2.72, wantSide: 1, spinning: true,
    };
    rigRef.current = rig;

    const resize = () => {
      fitRenderer(stage, host);
      /* Keep the moon a constant share of the frame's height however wide the
         stage gets, so a phone and a desktop see the same composition. */
      const aspect = stage.camera.aspect;
      stage.camera.position.z = aspect < 1.4 ? 6.6 : 5.4;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let last = performance.now();
    const loop = (now: number) => {
      rig.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* The light swings around the moon toward the target angle: that swing
         IS the month passing, and it is the reason this scene stays mounted
         from one step to the next. */
      const k = reduced ? 1 : 1 - Math.exp(-dt * 2.2);
      rig.angle = lerp(rig.angle, rig.wantAngle, k);
      rig.side = lerp(rig.side, rig.wantSide, k);
      const x = Math.sin(rig.angle) * rig.side;
      const z = Math.cos(rig.angle);
      sun.position.set(x * 8, 1.6, z * 8);

      /* The halo belongs to the lit limb, and fades with how much of the face
         is lit: a new moon should not glow. */
      const litness = (Math.cos(rig.angle) + 1) / 2;
      glow.position.set(x * 0.55, 0, z * 0.2 - 0.2);
      (glow.material as THREE.SpriteMaterial).opacity = 0.22 + litness * 0.6;
      glow.scale.setScalar(4.6 + litness * 1.4);

      if (!reduced && rig.spinning) {
        /* A slow turn, so the surface is never a frozen picture. It stops
           when the sequence is paused: a still frame should be still. */
        rig.moon.rotation.y += dt * 0.045;
        rig.stars.rotation.y += dt * 0.006;
      }

      stage.renderer.render(stage.scene, stage.camera);
    };
    rig.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rig.raf);
      ro.disconnect();
      tex.dispose();
      disposeStage(stage);
      rigRef.current = null;
    };
  }, []);

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.wantAngle = want.angle;
    rig.wantSide = want.side;
  }, [want.angle, want.side]);

  /* Paused, the surface holds still. The phase itself still eases to where
     the step put it, because that is the thing being taught. */
  useEffect(() => {
    const rig = rigRef.current;
    if (rig) rig.spinning = playing;
  }, [playing]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
