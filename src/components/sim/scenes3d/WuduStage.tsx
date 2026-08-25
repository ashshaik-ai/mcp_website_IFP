"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { SceneProps } from "../Simulator";
import { WuduScene } from "../scenes/WuduScene";
import { webglAvailable } from "./webgl";

/* The washing, in 3D where the device can and as the drawing where it cannot.

   three.js is ~160 KB gzipped, which is why it never loads until a page that
   actually shows this scene mounts, and even then only after a cheap WebGL
   probe. A device that fails the probe, or a browser with WebGL switched off,
   gets the drawn figure, which is not a degraded state: it is what every
   visitor got until now. */
const Wudu3D = dynamic(() => import("./Wudu3D").then((m) => m.Wudu3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden="true" />,
});

/* The probe is a device capability, not React state: reading it through a
   store keeps it out of an effect, so the first client render already knows
   the answer instead of painting the drawing and then replacing it. The
   server snapshot is false, so the markup that ships is the drawn scene. */
const noSubscribe = () => () => {};
const server3D = () => false;

export function WuduStage(props: SceneProps) {
  const use3D = useSyncExternalStore(noSubscribe, webglAvailable, server3D);

  if (use3D) return <Wudu3D {...props} />;
  /* Until the probe answers, the drawing renders: it is correct at first
     paint, and the 3D canvas replaces it in the same frame. */
  return <WuduScene {...props} />;
}

/* Marked continuous: the rig eases from one washing to the next, so the
   engine keeps one instance alive rather than rebuilding it every step. */
WuduStage.continuous = true;
