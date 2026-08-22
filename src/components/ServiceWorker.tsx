"use client";

import { useEffect } from "react";

/* Registered after load so it never competes with the first paint.
   Development is excluded: a worker caching a dev build is only ever a
   source of confusing stale pages. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* Unsupported, blocked, or insecure origin — the site works regardless. */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
