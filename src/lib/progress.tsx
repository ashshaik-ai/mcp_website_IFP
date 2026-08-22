"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* Lesson progress, kept in localStorage. No account, no server, nothing to
   sign up for — this is a community site and a learner should not have to
   register to be told which lessons they have already read.

   Storage key is namespaced and versioned so a future shape change can be
   migrated rather than silently misread. */
const KEY = "if-progress-v1";

type State = Record<string, number>; // "portal/slug" -> completion timestamp

type ProgressApi = {
  /** Null until read from storage after mount, so SSR and first paint agree. */
  ready: boolean;
  isDone: (portal: string, slug: string) => boolean;
  toggle: (portal: string, slug: string) => void;
  countFor: (portal: string) => number;
  total: number;
};

const Ctx = createContext<ProgressApi | null>(null);

function read(): State {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as State) : {};
  } catch {
    // Private mode, quota, or corrupted value — progress is a nicety, not
    // something worth breaking the page over.
    return {};
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  // Keep tabs in step: finishing a lesson in one should update the other.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setState(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: State) => {
    setState(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* Storage unavailable; the in-memory state still works for this session. */
    }
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      ready,
      isDone: (portal, slug) => Boolean(state[`${portal}/${slug}`]),
      toggle: (portal, slug) => {
        const k = `${portal}/${slug}`;
        const next = { ...state };
        if (next[k]) delete next[k];
        else next[k] = Date.now();
        persist(next);
      },
      countFor: (portal) =>
        Object.keys(state).filter((k) => k.startsWith(`${portal}/`)).length,
      total: Object.keys(state).length,
    }),
    [state, ready, persist],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
