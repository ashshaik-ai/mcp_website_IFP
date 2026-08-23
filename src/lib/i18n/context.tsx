"use client";

import { createContext, useContext, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { strings, type Lang, type StringKey } from "./strings";

interface I18nCtx {
  lang: Lang;
  t: (key: StringKey) => string;
  toggle: () => void;
}

const I18nContext = createContext<I18nCtx | null>(null);
export const LANG_KEY = "ifp-lang";

/* The pre-paint script in the layout writes the stored choice here before the
   page is painted, so the very first client render can use it rather than
   rendering Telugu and correcting itself a beat later.

   The routes are prerendered in Telugu, so an English reader still sees Telugu
   in the static HTML until React takes over. That part is bounded by hydration
   and cannot be removed without shipping a second, English copy of every
   route. What this removes is the second wait: the swap now lands in the
   hydration render rather than in a passive effect after it. */
declare global {
  interface Window {
    __ifpLang?: Lang;
  }
}

const readPreferred = (): Lang => {
  if (typeof window === "undefined") return "te";
  if (window.__ifpLang === "en" || window.__ifpLang === "te") return window.__ifpLang;
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "en" ? "en" : "te";
  } catch {
    /* Site data blocked: reading it throws rather than returning null, and an
       unguarded throw here took the whole tree down with it. */
    return "te";
  }
};

/* Subscribing to nothing: the stored value only changes through toggle(),
   which keeps its own state. useSyncExternalStore is here for its server
   snapshot — it lets the server render Telugu and the client read the stored
   choice on the first render, with no setState inside an effect. */
const subscribe = () => () => {};
const serverSnapshot = (): Lang => "te";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const existing = useContext(I18nContext);
  const preferred = useSyncExternalStore(subscribe, readPreferred, serverSnapshot);

  const [override, setOverride] = useState<Lang | null>(null);
  const lang = override ?? preferred;

  const toggle = useCallback(() => {
    setOverride((current) => {
      const next = (current ?? readPreferred()) === "te" ? "en" : "te";
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        /* Blocked or full: the choice still holds for this session. */
      }
      if (typeof window !== "undefined") window.__ifpLang = next;
      return next;
    });
  }, []);

  /* Keep <html lang> in step with the content. It was hardcoded "te" in the
     layout and nothing ever changed it, so an English page was announced by a
     Telugu speech synthesiser — the attribute was well-formed, which is all
     axe and Lighthouse check, so both still scored 100. WCAG 3.1.1/3.1.2. */
  useEffect(() => {
    if (existing) return;
    document.documentElement.lang = lang;
  }, [existing, lang]);

  const t = useCallback((key: StringKey) => strings[key][lang], [lang]);

  // When already inside a root provider, pass through — children use parent context
  if (existing) return <>{children}</>;

  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
