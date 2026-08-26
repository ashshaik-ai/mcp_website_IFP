"use client";

import { useSyncExternalStore } from "react";

/* Does this reader want motion?

   matchMedia is an external store in the exact sense React means: a value
   that lives outside React, changes on its own, and can be subscribed to. So
   it is read as one, rather than the usual shape of "useState(false), then an
   effect that sets it to the real answer" -- which renders twice on every
   mount and, on a page whose whole point is an animation, means the animation
   starts before we know whether it was wanted.

   The server has no matchMedia. It answers false, so the markup that ships
   assumes motion is fine and the first client render corrects it. That way a
   reader who has asked for less motion is not served an animation that then
   stops, and a reader who has not is not served a still frame that then
   starts moving. */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(fn: () => void) {
  const mq = window.matchMedia?.(QUERY);
  if (!mq) return () => {};
  mq.addEventListener("change", fn);
  return () => mq.removeEventListener("change", fn);
}

/* Booleans are compared by value, so returning a fresh one each call is safe
   here in a way that returning a fresh object would not be. */
const snapshot = () => window.matchMedia?.(QUERY).matches ?? false;
const serverSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
