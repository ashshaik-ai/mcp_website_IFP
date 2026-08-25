"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { SceneProps } from "../Simulator";
import { MoonScene } from "../scenes/MoonScene";
import { webglAvailable } from "./webgl";

/* The moon, as a lit sphere where the device can render one.

   The month steps keep the drawing. Those steps teach the names on the Hijri
   dial, not the phases, and a dial of Arabic month names is a diagram: it
   belongs in SVG, where the text stays crisp and selectable-looking at any
   size. The phase steps get the sphere, because a crescent is a shadow and a
   shadow wants a light. */
const Moon3D = dynamic(() => import("./Moon3D").then((m) => m.Moon3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden="true" />,
});

const noSubscribe = () => () => {};
const server3D = () => false;

export function MoonStage(props: SceneProps) {
  const use3D = useSyncExternalStore(noSubscribe, webglAvailable, server3D);

  if (use3D && !props.step.id.startsWith("month")) return <Moon3D {...props} />;
  return <MoonScene {...props} />;
}

/* Marked continuous: the sun swings around the moon from one phase to the
   next, and that swing is the month passing. */
MoonStage.continuous = true;
