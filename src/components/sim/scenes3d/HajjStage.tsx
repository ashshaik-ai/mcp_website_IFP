"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { SceneProps } from "../Simulator";
import { HajjScene } from "../scenes/HajjScene";
import { webglAvailable } from "./webgl";

/* The pilgrimage in 3D where the device can, as the drawing where it cannot. */
const Kaaba3D = dynamic(() => import("./Kaaba3D").then((m) => m.Kaaba3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden="true" />,
});

const noSubscribe = () => () => {};
const server3D = () => false;

export function HajjStage(props: SceneProps) {
  const use3D = useSyncExternalStore(noSubscribe, webglAvailable, server3D);

  if (use3D) return <Kaaba3D {...props} />;
  return <HajjScene {...props} />;
}

/* Marked continuous: the camera flies from one station to the next while the
   tawaf keeps turning, which is the whole point of it. */
HajjStage.continuous = true;
