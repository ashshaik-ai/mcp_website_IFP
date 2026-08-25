"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { SceneProps } from "../Simulator";
import { CREAM, disposeStage, fitRenderer, GOLD, GOLD_DIM, lerp, mountStage } from "./stage3d";

/* The pilgrimage as one continuous shot.

   Every station of the hajj stands in the same scene: the Kaaba with the
   tawaf turning around it, the run between Safa and Marwa, the tents at Mina,
   the mount at Arafah, the open ground of Muzdalifah, the three pillars. A
   step does not cut to a new picture; the camera flies to that station while
   the crowd keeps moving, which is what the rite actually is, a journey with
   an order to it.

   The stations are laid out close together rather than to scale. Mina is five
   kilometres from the Haram and Arafah twenty; at true spacing the camera
   would spend the whole simulation crossing empty ground. What is kept true
   is the sequence and the shape of each act.

   No orbit control here, unlike the salah and wudu scenes. The camera is
   telling a story in order, and a viewer who drags it away mid-flight is left
   looking at desert while the caption talks about the tawaf. */

const STONE = 0x1d3a2a;
/* Sunlit ground, not sanctuary stone. The mount at Arafah and the pillars at
   the Jamarat were built from the same dark green as the colonnade, and at
   the distances the camera sees them from they read as black holes in the
   frame rather than as land. */
const SAND = 0x6f6a4a;
const MARBLE = 0xd8d2c0;
const KISWAH = 0x14140f;

/* Where each station stands on the plain, and how the camera frames it: an
   offset from the station and the point it looks at. */
type Station = {
  at: [number, number];
  /** Camera offset from the station, in scene units. */
  eye: [number, number, number];
  /** Height above the station the camera aims at. */
  aimY: number;
  /** Degrees per second the camera swings around the station while held. */
  swing: number;
};

const STATIONS: Record<string, Station> = {
  kaabaWide: { at: [0, 0], eye: [9, 7.5, 11], aimY: 1.6, swing: 0.6 },
  kaabaClose: { at: [0, 0], eye: [5.2, 3.4, 6.4], aimY: 1.7, swing: 2.4 },
  kaabaFar: { at: [0, 0], eye: [12, 10, 15], aimY: 1.4, swing: 0.4 },
  /* Down the length of the colonnade rather than across it: an arcade
     seen end-on recedes, and seen side-on it is a row of hoops. */
  sai: { at: [19, 2], eye: [1.2, 2.6, 11], aimY: 1.4, swing: 0.5 },
  mina: { at: [-2, 22], eye: [2, 2.6, 8.5], aimY: 1, swing: 0.9 },
  /* High and well back: from close and low the mount fills the frame as
     one dark mass with a pole coming out of it. */
  arafah: { at: [-19, 14], eye: [-3, 8.5, 17], aimY: 2.6, swing: 0.8 },
  muzdalifah: { at: [-11, 24], eye: [0, 3.4, 11], aimY: 0.9, swing: 0.7 },
  jamarat: { at: [9, 23], eye: [0.5, 3.4, 10], aimY: 1.8, swing: 1.0 },
};

const STEP_STATION: Record<string, keyof typeof STATIONS> = {
  ihram: "kaabaWide",
  tawaf: "kaabaClose",
  sai: "sai",
  mina: "mina",
  arafah: "arafah",
  muzdalifah: "muzdalifah",
  rami: "jamarat",
  /* The sacrifice and the shaving both happen at Mina, on the same day as
     the stoning. */
  sacrifice: "mina",
  halq: "mina",
  "tawaf-ifadah": "kaabaClose",
  /* The farewell circuit, and then the camera pulls away. */
  "tawaf-wida": "kaabaFar",
};

/* A fixed scatter. No Math.random anywhere: the same build has to render the
   same crowd every time. */
function rand(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type Crowd = {
  mesh: THREE.InstancedMesh;
  /** Heads, driven by the same matrices as the bodies. */
  heads: THREE.InstancedMesh;
  /** Per pilgrim: behaviour, and the numbers that behaviour needs. */
  kind: Uint8Array;
  a: Float32Array;
  b: Float32Array;
  c: Float32Array;
  /** Ground height under a standing pilgrim: Arafah is a hill, not a floor. */
  y: Float32Array;
};

const ORBIT = 0;
const SHUTTLE = 1;
const STAND = 2;

/* Three ways a pilgrim moves, which between them cover every station: turning
   around the Kaaba, running between two points, or standing in place. */
function buildCrowd(scene: THREE.Scene): Crowd {
  const n = 240;
  const geo = new THREE.CapsuleGeometry(0.075, 0.26, 3, 6);
  const mesh = new THREE.InstancedMesh(
    geo,
    new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.85 }),
    n,
  );
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.castShadow = true;
  scene.add(mesh);

  /* A head on each. One capsule alone reads as a grain of rice at any
     distance the camera actually stands at; a head is the cheapest thing that
     turns it into a person. Same matrix, offset up the body's own axis, so
     the two meshes can never drift apart. */
  const heads = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.062, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0xd8caa6, roughness: 0.8 }),
    n,
  );
  heads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  heads.castShadow = true;
  scene.add(heads);

  const kind = new Uint8Array(n);
  const a = new Float32Array(n);
  const b = new Float32Array(n);
  const c = new Float32Array(n);
  const y = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    y[i] = 0.28;
    if (i < 130) {
      /* The tawaf. Radius, starting angle, and a speed that falls off with
         distance from the stone, the way a real crowd moves. */
      kind[i] = ORBIT;
      a[i] = 2.6 + rand(i) * 5.2;
      b[i] = rand(i + 500) * Math.PI * 2;
      c[i] = 0.26 - (a[i] - 2.6) * 0.021;
    } else if (i < 168) {
      /* The sa'i: back and forth along the colonnade. */
      kind[i] = SHUTTLE;
      a[i] = rand(i) * Math.PI * 2;
      b[i] = 0.34 + rand(i + 90) * 0.22;
      c[i] = (rand(i + 700) - 0.5) * 1.5;
    } else {
      /* Standing: at Mina, at Arafah, at Muzdalifah, at the pillars. */
      kind[i] = STAND;
      const g = Math.floor((i - 168) / 18);
      const st =
        g === 0 ? STATIONS.mina.at :
        g === 1 ? STATIONS.arafah.at :
        g === 2 ? STATIONS.muzdalifah.at :
        STATIONS.jamarat.at;
      const ang = rand(i) * Math.PI * 2;
      /* Arafah's group spreads wider and climbs: the standing happens on the
         mount, and a ring packed inside its base put every pilgrim inside the
         hill where none of them could be seen. */
      const rad = g === 1 ? 1 + rand(i + 40) * 6.4 : 1.2 + rand(i + 40) * 3.4;
      a[i] = st[0] + Math.cos(ang) * rad;
      b[i] = st[1] + Math.sin(ang) * rad;
      c[i] = rand(i + 300) * Math.PI * 2;
      /* The cone at Arafah is 5.2 across the base and 3.4 tall, so anyone
         inside that radius stands on its slope. */
      if (g === 1 && rad < 5.2) y[i] = 0.28 + 3.4 * (1 - rad / 5.2);
    }
  }

  return { mesh, heads, kind, a, b, c, y };
}

function buildKaaba(scene: THREE.Scene) {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 2.9, 2.4),
    new THREE.MeshStandardMaterial({ color: KISWAH, roughness: 0.92 }),
  );
  cube.position.y = 1.45;
  cube.castShadow = true;
  scene.add(cube);

  /* The hizam: the embroidered gold band two-thirds of the way up. */
  const band = new THREE.Mesh(
    new THREE.BoxGeometry(2.43, 0.34, 2.43),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.4, metalness: 0.55 }),
  );
  band.position.y = 2.05;
  scene.add(band);

  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.1, 0.06),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.35, metalness: 0.6 }),
  );
  door.position.set(0.5, 1.55, 1.22);
  scene.add(door);

  /* The Hijr Ismail: the low semicircular wall off the north face, its two
     ends returning to the Kaaba. Built as blocks on a computed arc rather
     than as a rotated torus, which put a stray white loop through the cube:
     an arc laid out in code is read the same way it is drawn. */
  const hijr = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.34, 0.62, 0.2),
    new THREE.MeshStandardMaterial({ color: MARBLE, roughness: 0.85 }),
    18,
  );
  hijr.castShadow = true;
  hijr.receiveShadow = true;
  const hd = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    /* A half turn from one end of the north face round to the other. */
    const ang = Math.PI + (i / 17) * Math.PI;
    hd.position.set(Math.cos(ang) * 1.2, 0.31, -1.2 + Math.sin(ang) * 1.55);
    hd.rotation.set(0, -ang, 0);
    hd.updateMatrix();
    hijr.setMatrixAt(i, hd.matrix);
  }
  scene.add(hijr);

  /* The mataf: the polished floor the tawaf turns on. */
  const mataf = new THREE.Mesh(
    new THREE.CircleGeometry(9.5, 56),
    new THREE.MeshStandardMaterial({ color: MARBLE, roughness: 0.45, metalness: 0.08 }),
  );
  mataf.rotation.x = -Math.PI / 2;
  mataf.position.y = 0.02;
  mataf.receiveShadow = true;
  scene.add(mataf);

  /* The colonnade around it. Pillars alone read as a ring of poles, so each
     carries an arch to its neighbour and stands on a base, which is what says
     building rather than fence. */
  const stoneMat = new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.85 });
  const N_COL = 28;
  const R_COL = 12.6;
  const cols = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.22, 3.8, 8), stoneMat, N_COL);
  const bases = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.34, 0.4, 0.26, 8), stoneMat, N_COL);
  const arches = new THREE.InstancedMesh(
    new THREE.TorusGeometry(1.36, 0.13, 6, 12, Math.PI),
    stoneMat,
    N_COL,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < N_COL; i++) {
    const ang = (i / N_COL) * Math.PI * 2;
    const x = Math.cos(ang) * R_COL;
    const z = Math.sin(ang) * R_COL;
    dummy.position.set(x, 1.9, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    cols.setMatrixAt(i, dummy.matrix);
    dummy.position.set(x, 0.13, z);
    dummy.updateMatrix();
    bases.setMatrixAt(i, dummy.matrix);
    /* The arch spans to the next pillar, so it sits on the midpoint and
       faces along the ring. */
    const mid = ang + Math.PI / N_COL;
    dummy.position.set(Math.cos(mid) * R_COL, 3.8, Math.sin(mid) * R_COL);
    dummy.rotation.set(0, -mid, 0);
    dummy.updateMatrix();
    arches.setMatrixAt(i, dummy.matrix);
  }
  scene.add(cols, bases, arches);

  /* Lamps between the arches, the way the Haram is lit at night. */
  const lamps = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.13, 10, 8),
    new THREE.MeshStandardMaterial({ color: CREAM, emissive: GOLD, emissiveIntensity: 1.5 }),
    N_COL,
  );
  for (let i = 0; i < N_COL; i++) {
    const ang = (i / N_COL) * Math.PI * 2;
    dummy.position.set(Math.cos(ang) * (R_COL - 0.5), 3.3, Math.sin(ang) * (R_COL - 0.5));
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    lamps.setMatrixAt(i, dummy.matrix);
  }
  scene.add(lamps);

  const lamp = new THREE.PointLight(GOLD, 3.4, 22);
  lamp.position.set(0, 6.4, 0);
  scene.add(lamp);
}

/** Safa and Marwa, and the covered way between them. */
function buildSai(scene: THREE.Scene) {
  const [sx, sz] = STATIONS.sai.at;
  const wall = new THREE.MeshStandardMaterial({ color: MARBLE, roughness: 0.75 });
  const trim = new THREE.MeshStandardMaterial({ color: STONE, roughness: 0.9 });

  const floor = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 13), wall);
  floor.position.set(sx, 0.04, sz);
  floor.receiveShadow = true;
  scene.add(floor);

  /* Safa and Marwa: the two rises the run is between. */
  for (const end of [-6.2, 6.2]) {
    const mound = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: SAND, roughness: 1 }),
    );
    mound.position.set(sx, 0.05, sz + end);
    mound.scale.y = 0.75;
    mound.receiveShadow = true;
    scene.add(mound);
  }

  /* Piers down both sides carrying arches, and a roof slab over them: an
     arcade, not a line of croquet hoops. */
  const piers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.28, 2.5, 0.28), wall, 20);
  const arcs = new THREE.InstancedMesh(new THREE.TorusGeometry(0.62, 0.09, 6, 12, Math.PI), wall, 18);
  const d = new THREE.Object3D();
  let pi = 0;
  let ai = 0;
  for (let i = 0; i < 10; i++) {
    const z = sz - 5.4 + i * 1.2;
    for (const side of [-1.72, 1.72]) {
      d.position.set(sx + side, 1.3, z);
      d.rotation.set(0, 0, 0);
      d.updateMatrix();
      piers.setMatrixAt(pi++, d.matrix);
      if (i < 9) {
        d.position.set(sx + side, 2.55, z + 0.6);
        d.rotation.set(0, Math.PI / 2, 0);
        d.updateMatrix();
        arcs.setMatrixAt(ai++, d.matrix);
      }
    }
  }
  piers.castShadow = true;
  arcs.castShadow = true;
  scene.add(piers, arcs);

  for (const side of [-1.72, 1.72]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.34, 12), trim);
    beam.position.set(sx + side, 3.3, sz);
    beam.castShadow = true;
    scene.add(beam);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.16, 12), trim);
  roof.position.set(sx, 3.55, sz);
  roof.castShadow = true;
  scene.add(roof);
}

/** The tents of Mina, the mount at Arafah, and the three pillars. */
function buildPlain(scene: THREE.Scene) {
  const dummy = new THREE.Object3D();

  const [mx, mz] = STATIONS.mina.at;
  const tents = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.72, 0.8, 4),
    new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.95 }),
    36,
  );
  tents.castShadow = true;
  for (let i = 0; i < 36; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    dummy.position.set(mx - 4.5 + col * 1.8, 0.4, mz - 4 + row * 1.7);
    dummy.rotation.y = Math.PI / 4;
    dummy.updateMatrix();
    tents.setMatrixAt(i, dummy.matrix);
  }
  scene.add(tents);

  const [ax, az] = STATIONS.arafah.at;
  const mount = new THREE.Mesh(
    new THREE.ConeGeometry(5.2, 3.4, 22),
    new THREE.MeshStandardMaterial({ color: SAND, roughness: 1 }),
  );
  mount.position.set(ax, 1.7, az);
  mount.receiveShadow = true;
  scene.add(mount);
  /* The pillar on the Mount of Mercy. */
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 2, 10),
    new THREE.MeshStandardMaterial({ color: MARBLE, roughness: 0.7 }),
  );
  pillar.position.set(ax, 4.3, az);
  scene.add(pillar);

  const [jx, jz] = STATIONS.jamarat.at;
  const wallMat = new THREE.MeshStandardMaterial({ color: SAND, roughness: 0.95 });
  [-3, 0, 3].forEach((off, i) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.6 + i * 0.3, 2.2), wallMat);
    wall.position.set(jx + off, 1.3 + i * 0.15, jz);
    wall.castShadow = true;
    scene.add(wall);
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.6, 0.2, 18), wallMat);
    basin.position.set(jx + off, 0.1, jz);
    basin.receiveShadow = true;
    scene.add(basin);
  });
}

type Rig = {
  raf: number;
  crowd: Crowd;
  /** Eased camera state; the station gives it a target. */
  cx: number; cy: number; cz: number;
  tx: number; ty: number; tz: number;
  station: Station;
  /** Swing angle around the current station. */
  swing: number;
  moving: boolean;
};

const DUMMY = new THREE.Object3D();

export function Kaaba3D({ step, playing }: SceneProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rigRef = useRef<Rig | null>(null);
  const stationId = STEP_STATION[step.id] ?? "kaabaWide";

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    /* A plain, not a room: the shadow camera has to cover it or everything
       past a couple of metres renders unlit and flat, and the fill has to
       carry the parts no lamp reaches. */
    const stage = mountStage(canvas, { floor: null, fog: [34, 78], far: 160, lit: 22, fill: 1.5 });
    if (!stage) return;

    /* The plain the whole thing stands on, wide enough that no station sits
       at its edge. */
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(58, 56),
      new THREE.MeshStandardMaterial({ color: 0x14401f, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    stage.scene.add(ground);

    buildKaaba(stage.scene);
    buildSai(stage.scene);
    buildPlain(stage.scene);
    const crowd = buildCrowd(stage.scene);

    const first = STATIONS[STEP_STATION[step.id] ?? "kaabaWide"];
    const rig: Rig = {
      raf: 0,
      crowd,
      cx: first.at[0] + first.eye[0],
      cy: first.eye[1],
      cz: first.at[1] + first.eye[2],
      tx: first.at[0],
      ty: first.aimY,
      tz: first.at[1],
      station: first,
      swing: 0,
      moving: true,
    };
    rigRef.current = rig;

    const resize = () => fitRenderer(stage, host);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let t = 0;
    let last = performance.now();
    const loop = (now: number) => {
      rig.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (rig.moving) t += dt;

      const st = rig.station;
      /* A slow swing around whatever is being watched, so even a held shot
         is a moving one. */
      if (!reduced) rig.swing += dt * st.swing * 0.06;
      const cos = Math.cos(rig.swing);
      const sin = Math.sin(rig.swing);
      const ex = st.eye[0] * cos - st.eye[2] * sin;
      const ez = st.eye[0] * sin + st.eye[2] * cos;

      /* The flight between stations. Slow enough to read as travel, quick
         enough not to eat the step it belongs to. */
      const k = reduced ? 1 : 1 - Math.exp(-dt * 1.5);
      rig.cx = lerp(rig.cx, st.at[0] + ex, k);
      rig.cy = lerp(rig.cy, st.eye[1], k);
      rig.cz = lerp(rig.cz, st.at[1] + ez, k);
      rig.tx = lerp(rig.tx, st.at[0], k);
      rig.ty = lerp(rig.ty, st.aimY, k);
      rig.tz = lerp(rig.tz, st.at[1], k);
      stage.camera.position.set(rig.cx, rig.cy, rig.cz);
      stage.camera.lookAt(rig.tx, rig.ty, rig.tz);

      /* The crowd. The tawaf never stops, at any station: it is the one part
         of the scene that is true around the clock. */
      const { mesh, heads, kind, a, b, c, y } = rig.crowd;
      const [sx, sz] = STATIONS.sai.at;
      for (let i = 0; i < kind.length; i++) {
        if (kind[i] === ORBIT) {
          /* Counter-clockwise seen from above, which is the direction of the
             tawaf: the Kaaba stays on the pilgrim's left. */
          const ang = b[i] + t * c[i];
          DUMMY.position.set(Math.cos(ang) * a[i], 0.28, Math.sin(ang) * a[i]);
          DUMMY.rotation.set(0, -ang, 0);
        } else if (kind[i] === SHUTTLE) {
          const p = Math.sin(t * b[i] + a[i]);
          DUMMY.position.set(sx + c[i], 0.3, sz + p * 4.6);
          DUMMY.rotation.set(0, p > 0 ? 0 : Math.PI, 0);
        } else {
          /* Standing still is not standing frozen: a slow sway keeps a group
             from reading as a row of posts. */
          const sway = Math.sin(t * 0.9 + c[i]) * 0.05;
          DUMMY.position.set(a[i], y[i], b[i]);
          DUMMY.rotation.set(sway, c[i], 0);
        }
        DUMMY.updateMatrix();
        mesh.setMatrixAt(i, DUMMY.matrix);
        DUMMY.position.y += 0.24;
        DUMMY.updateMatrix();
        heads.setMatrixAt(i, DUMMY.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      heads.instanceMatrix.needsUpdate = true;

      stage.renderer.render(stage.scene, stage.camera);
    };
    rig.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rig.raf);
      ro.disconnect();
      disposeStage(stage);
      rigRef.current = null;
    };
    /* Mount once. The step drives the camera through the effects below. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rig = rigRef.current;
    if (rig) rig.station = STATIONS[stationId];
  }, [stationId]);

  useEffect(() => {
    const rig = rigRef.current;
    if (rig) rig.moving = playing;
  }, [playing]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
