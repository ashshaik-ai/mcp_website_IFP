"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { strings, type Lang, type StringKey } from "./strings";

interface I18nCtx {
  lang: Lang;
  t: (key: StringKey) => string;
  toggle: () => void;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("te");
  const toggle = useCallback(() => setLang((l) => (l === "te" ? "en" : "te")), []);
  const t = useCallback((key: StringKey) => strings[key][lang], [lang]);
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
