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
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored === "te" || stored === "en") setLang(stored);
  }, [existing]);

  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === "te" ? "en" : "te";
      localStorage.setItem(LANG_KEY, next);
      return next;
    });
  }, []);

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
