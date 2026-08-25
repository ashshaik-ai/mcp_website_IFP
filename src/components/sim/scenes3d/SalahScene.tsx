"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SceneProps } from "../Simulator";
import { SalahFigure } from "../scenes/SalahFigure";

/* The praying figure, in 3D where the device can and as the SVG where it
   cannot.

   three.js is ~160 KB gzipped, which is why it never loads until a page that
   actually shows this scene mounts — and even then only after a cheap WebGL
   probe. A device that fails the probe, or a browser with WebGL switched off,
   gets the drawn SVG figure, which is not a degraded state: it is what every
   visitor got until now. */
const Salah3D = dynamic(() => import("./Salah3D").then((m) => m.Salah3D), {
  ssr: false,
  loading: () => <SalahFigure3DPlaceholder />,
});

function SalahFigure3DPlaceholder() {
  return <div className="absolute inset-0" aria-hidden="true" />;
}

let cached: boolean | null = null;

function webglAvailable(): boolean {
  if (cached !== null) return cached;
  try {
    const c = document.createElement("canvas");
    cached = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

export function SalahScene(props: SceneProps) {
  const [mode, setMode] = useState<"pending" | "3d" | "svg">("pending");

  useEffect(() => {
    setMode(webglAvailable() ? "3d" : "svg");
  }, []);

  if (mode === "3d") return <Salah3D {...props} />;
  /* Pending renders the SVG too: it is correct at first paint, and the 3D
     canvas replaces it in the same frame the probe resolves. */
  return <SalahFigure {...props} />;
}

/* Marked continuous: the 3D rig eases between postures, so the engine keeps
   one instance alive rather than rebuilding it on every step. */
SalahScene.continuous = true;
