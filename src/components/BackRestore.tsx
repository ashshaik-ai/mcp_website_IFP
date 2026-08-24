"use client";

import { useEffect } from "react";

/* Back/forward should land where the user left, and with .if-defer sections
   the browser could not: content-visibility keeps below-fold sections at
   their 600px placeholder height, so on a back-navigation remount the page
   lays out shorter than when the user left it and the restored pixel offset
   overshoots into the footer (seen independently by five audit personas).

   During a history traversal the deferral is switched off, the full page
   lays out before the browser restores scroll, and after things settle it
   switches back on. contain-intrinsic-size's `auto` keyword then reuses the
   now-remembered true heights, so re-enabling shifts nothing. */
export function BackRestore() {
  useEffect(() => {
    let t: number | undefined;
    const onPop = () => {
      document.documentElement.classList.add("if-back-nav");
      window.clearTimeout(t);
      t = window.setTimeout(() => document.documentElement.classList.remove("if-back-nav"), 1600);
    };
    window.addEventListener("popstate", onPop);

    /* Same disease on a hard load with a hash: the browser jumps to the
       anchor before the deferred sections above it have laid out, so
       /#schemes landed short with the heading at the bottom edge. One
       corrective scroll after hydration, when the heights are real. */
    if (location.hash) {
      try {
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
          const fix = window.setTimeout(() => el.scrollIntoView({ behavior: "auto", block: "start" }), 350);
          return () => {
            window.clearTimeout(fix);
            window.clearTimeout(t);
            window.removeEventListener("popstate", onPop);
          };
        }
      } catch {
        /* Malformed hash; nothing to correct. */
      }
    }
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
  return null;
}
