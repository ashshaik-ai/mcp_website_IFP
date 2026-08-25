"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* The way back up.

   These pages are long: on a phone the kids portal runs to about 21,000px and
   Student Guidance to 16,000, which is twenty-odd screens of dragging to reach
   the header again. Nothing on the site offered a shortcut.

   It appears only once there is something to go back to — two screens down —
   and sits above the WhatsApp button rather than beside it, so the two never
   fight for the same corner. */
const copy = {
  top: { te: "పైకి వెళ్ళండి", en: "Back to top" },
} as const;

export function BackToTop() {
  const { lang } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      aria-label={copy.top[lang]}
      title={copy.top[lang]}
      /* Stacked above the WhatsApp button, which owns bottom-4/bottom-6. */
      className={`fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-[var(--if-gold)]/40 bg-[var(--if-green)] text-[var(--if-gold-light)] shadow-lg transition-all duration-300 hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] sm:bottom-24 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
