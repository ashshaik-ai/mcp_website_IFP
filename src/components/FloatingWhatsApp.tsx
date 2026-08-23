"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";

/* The one always-available way to reach the organisation.

   It is fixed, so it sits over whatever is underneath it — on a phone that
   meant it permanently covered the bottom-right of every page and swallowed
   taps meant for the card link beneath it. It now steps out of the way while
   you are reading down the page and comes back the moment you scroll up or
   stop, which is where a reader looks for it anyway. */
export function FloatingWhatsApp() {
  const { lang } = useI18n();
  const [scrolledAway, setScrolledAway] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const hidden = scrolledAway || fieldFocused;

  /* It also steps aside while a field has focus: at rest it sits over the
     bottom-right of the page, which on a phone is the right edge of the last
     row of any form — the Zakat calculator's Debts field among them. */
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.matches?.("input, textarea, select")) setFieldFocused(true);
    };
    const onBlur = () => setFieldFocused(false);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let idle: number | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      /* Ignore the small jitter a momentum scroll produces at the ends. */
      if (Math.abs(y - last) > 8) {
        setScrolledAway(y > last && y > 240);
        last = y;
      }
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setScrolledAway(false), 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <a
      href="https://wa.me/919032906677"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "te" ? "వాట్సాప్‌లో సందేశం పంపండి" : "Chat on WhatsApp"}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl transition-[transform,opacity] duration-300 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
        hidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      style={{ background: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" width="26" height="26" fill="white" aria-hidden="true" className="sm:w-[30px] sm:h-[30px]">
        <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.54.676 4.964 1.952 7.08L2 30l7.16-1.876A13.92 13.92 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.44a11.6 11.6 0 0 1-5.904-1.608l-.424-.252-4.256 1.116 1.132-4.14-.276-.44a11.6 11.6 0 0 1-1.82-6.112C4.456 9.664 9.664 4.456 16.004 4.456c3.08 0 5.972 1.2 8.148 3.376a11.48 11.48 0 0 1 3.392 8.172c0 6.34-5.196 11.436-11.54 11.436zm6.32-8.56c-.348-.176-2.064-1.02-2.384-1.136-.32-.116-.552-.176-.784.176-.232.348-.9 1.136-1.104 1.368-.2.232-.404.26-.752.088a9.52 9.52 0 0 1-2.8-1.728 10.52 10.52 0 0 1-1.936-2.412c-.204-.348-.024-.536.152-.708.16-.156.348-.404.524-.608.176-.2.232-.348.348-.58.116-.232.06-.44-.028-.616-.088-.176-.784-1.892-1.076-2.592-.28-.68-.568-.584-.784-.596l-.668-.012c-.232 0-.608.088-.928.44-.32.348-1.216 1.188-1.216 2.896s1.244 3.36 1.42 3.592c.176.232 2.448 3.736 5.932 5.24.828.356 1.476.568 1.98.728.832.264 1.588.228 2.184.14.668-.1 2.064-.844 2.356-1.66.288-.82.288-1.52.2-1.664-.088-.144-.316-.232-.664-.408z"/>
      </svg>
    </a>
  );
}
