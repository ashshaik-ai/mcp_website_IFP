"use client";

import { useEffect, useState } from "react";

/* Which of a page's sections is currently being read.

   The navbar's underline was fixed at whatever was clicked last, defaulting to
   the first item, so on a homepage of thirteen sections it sat under "Victory"
   no matter how far down you scrolled.

   A section counts as current once its top has passed under the header and
   before it has left through it. rootMargin does that: the top inset matches
   the sticky header so a section becomes current as it clears it, and the
   large bottom inset keeps the band narrow, so only the section actually near
   the top of the viewport qualifies rather than every tall one on screen.

   Returns the index of the current section, or -1 when the page is above the
   first one. */
export function useScrollSpy(ids: readonly string[], headerHeight = 64): number {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const seen = new Map<string, boolean>();
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const pick = () => {
      /* Last match wins: when the band holds two sections, the lower one is
         the one being scrolled into. */
      let next = -1;
      ids.forEach((id, i) => {
        if (seen.get(id)) next = i;
      });
      setActive(next);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        pick();
      },
      { rootMargin: `-${headerHeight + 8}px 0px -75% 0px`, threshold: 0 },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [ids, headerHeight]);

  return active;
}
