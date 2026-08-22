"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { schedule, type Deck, type Grade } from "./srs";

/* Review decks, stored per deck in localStorage alongside lesson progress.
   Versioned so a future shape change can migrate rather than misread. */
const KEY = "if-decks-v1";

type Store = Record<string, Deck>;

type DecksApi = {
  /** False until storage is read, so SSR and first paint agree. */
  ready: boolean;
  deck: (name: string) => Deck;
  grade: (name: string, cardId: string, g: Grade) => void;
  reset: (name: string) => void;
};

const Ctx = createContext<DecksApi | null>(null);
const EMPTY: Deck = {};

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

export function DecksProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStore(read());
    setReady(true);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setStore(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: Store) => {
    setStore(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* Private mode or quota — reviews still work for this session. */
    }
  }, []);

  const api = useMemo<DecksApi>(
    () => ({
      ready,
      deck: (name) => store[name] ?? EMPTY,
      grade: (name, cardId, g) => {
        const current = store[name] ?? {};
        persist({
          ...store,
          [name]: { ...current, [cardId]: schedule(current[cardId], g) },
        });
      },
      reset: (name) => {
        const next = { ...store };
        delete next[name];
        persist(next);
      },
    }),
    [store, ready, persist],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useDecks(): DecksApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDecks must be used inside DecksProvider");
  return ctx;
}
