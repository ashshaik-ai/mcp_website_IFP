"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

/* How far through the lesson you are, and how much is left.

   A hairline of gold under the sticky header that fills as the article is
   read, with the minutes remaining recalculated from real position rather
   than restated from the card. Medium, and every serious reading platform
   since, keeps one for the same reason: on a long page the scrollbar answers
   "where am I in the document", not "how much of this lesson is left".

   Scroll-driven, passive, and writes nothing but two state values; hidden
   entirely under 2% so it never flickers at the top of the page. */
export function ReadingProgress({ minutes }: { minutes: number }) {
  const { lang } = useI18n();
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setRatio(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const left = Math.max(0, Math.ceil(minutes * (1 - ratio)));
  const show = ratio > 0.02;

  return (
    <div
      className="fixed inset-x-0 top-[64px] z-40 h-1"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-label={lang === "te" ? "పఠన పురోగతి" : "Reading progress"}
    >
      <div
        className="h-full origin-left bg-[var(--if-gold)] transition-opacity duration-300"
        style={{ transform: `scaleX(${ratio})`, opacity: show ? 1 : 0 }}
      />
      {minutes > 0 && (
        <span
          className={`absolute right-3 top-2 rounded-full bg-[var(--if-green)]/90 px-2.5 py-1 text-[11px] font-bold tabular-nums text-[var(--if-gold-light)] backdrop-blur-sm transition-opacity duration-300 ${
            show && ratio < 0.98 ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          {left} {lang === "te" ? "నిమి" : "min"}
        </span>
      )}
    </div>
  );
}
