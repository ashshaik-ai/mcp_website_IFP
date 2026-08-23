"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { strings, type Lang, type StringKey } from "./strings";

interface I18nCtx {
  lang: Lang;
  t: (key: StringKey) => string;
  toggle: () => void;
}

const I18nContext = createContext<I18nCtx | null>(null);
const LANG_KEY = "ifp-lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const existing = useContext(I18nContext);

  // Always call hooks (Rules of Hooks) — values unused when nested
  const [lang, setLang] = useState<Lang>("te");

  useEffect(() => {
    if (existing) return;
    /* Reading localStorage throws, not returns null, when site data is
       blocked — a browser set to block all cookies, or an in-app WebView with
       DOM storage off. Unguarded, that threw inside the effect and React tore
       the whole tree down, so every page rendered blank. The language is a
       preference; it is not worth the site. */
    let stored: Lang | null = null;
    try {
      stored = localStorage.getItem(LANG_KEY) as Lang | null;
    } catch {
      stored = null;
    }
    if (stored === "te" || stored === "en") setLang(stored);
  }, [existing]);

  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === "te" ? "en" : "te";
      try {
        localStorage.setItem(LANG_KEY, next);
      } catch {
        /* Blocked or full: the choice still holds for this session. */
      }
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
