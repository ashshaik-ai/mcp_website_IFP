"use client";

import { useEffect } from "react";

/* Scroll-triggered reveals, done once for the whole page.

   BlurFade runs as a CSS animation from first paint, which is right for the
   hero but wrong for everything under it: a section twelve screens down
   finished its entrance before anyone scrolled to it, so the page read as
   static the moment you left the top. This marks each deferred element
   `if-in` as it enters the viewport, and the CSS holds its animation paused
   until then.

   Only elements inside `.if-defer` sections are held (see globals.css). The
   hero is not one, so it still paints its entrance without waiting for
   JavaScript, and with scripting disabled nothing is held at all — the `js`
   class on <html> is the switch. One observer for every element, and a
   MutationObserver so content that mounts later (a language switch re-keys
   some lists) is picked up too. */
/* Headings carry their own rule and sit inside a BlurFade wrapper, so they
   have to be observed in their own right or the rule never draws. */
const SELECTOR = ".if-blur-fade, .if-reveal, .if-heading";

export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    if (typeof IntersectionObserver === "undefined") {
      root.classList.remove("js");
      return;
    }

    /* Anything already on screen when the observer first runs shows at once,
       with no entrance. An entrance the page plays late, after hydration, on
       content the reader is already looking at is the pop-in it was meant to
       avoid — and audits that measure the first screen without scrolling were
       catching that text mid-fade at four-fifths of its contrast. */
    let initial = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (initial) e.target.classList.add("if-instant");
          e.target.classList.add("if-in");
          io.unobserve(e.target);
        }
        initial = false;
      },
      /* Fire a little before the element's top clears the bottom edge, so the
         motion is already under way as it comes into view rather than
         starting from a standstill on the fold line. */
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("if-in")) io.observe(el);
      });
    };
    watch(document);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const n of m.addedNodes) {
          if (n.nodeType !== 1) continue;
          const el = n as HTMLElement;
          if (el.matches?.(SELECTOR)) io.observe(el);
          watch(el);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("js");
    };
  }, []);

  return null;
}
