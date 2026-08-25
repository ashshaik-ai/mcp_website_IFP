"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* What the reader got right, kept per lesson.

   Five questions sat at the foot of every lesson and nothing was done with the
   answers: no score, no record, wiped on reload. A learner could answer all of
   them correctly, come back the next day, and the page would greet them as if
   they had never opened it — while the only thing that counted as progress was
   a button they had to remember to press.

   Held apart from lesson progress rather than folded into it: that store is a
   flat map of booleans that has been in people's browsers for a while, and a
   shape change would either lose it or need a migration for something that can
   just as well live beside it. */

const KEY = "ifp-quiz-v1";

/** Per lesson: the indices of the questions answered correctly. */
type State = Record<string, number[]>;

type QuizApi = {
  ready: boolean;
  /** How many of this lesson's questions have been answered correctly. */
  scoreFor: (portal: string, slug: string) => number;
  /** Which question indices were answered correctly. */
  answeredFor: (portal: string, slug: string) => number[];
  record: (portal: string, slug: string, question: number) => void;
};

const Ctx = createContext<QuizApi | null>(null);

function read(): State {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as State) : {};
  } catch {
    /* Private mode, quota, or a corrupted value. A score is a nicety. */
    return {};
  }
}

export function QuizResultsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setState(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo<QuizApi>(
    () => ({
      ready,
      scoreFor: (portal, slug) => (state[`${portal}/${slug}`] ?? []).length,
      answeredFor: (portal, slug) => state[`${portal}/${slug}`] ?? [],
      record: (portal, slug, question) => {
        const k = `${portal}/${slug}`;
        setState((current) => {
          const had = current[k] ?? [];
          if (had.includes(question)) return current;
          const next = { ...current, [k]: [...had, question].sort((a, b) => a - b) };
          try {
            localStorage.setItem(KEY, JSON.stringify(next));
          } catch {
            /* Storage unavailable; the score still holds for this session. */
          }
          return next;
        });
      },
    }),
    [ready, state],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useQuizResults(): QuizApi {
  const ctx = useContext(Ctx);
  /* Usable outside the provider: the lesson pages have it, a preview or a test
     rendering one card in isolation might not, and a missing score should not
     throw. */
  return (
    ctx ?? {
      ready: false,
      scoreFor: () => 0,
      answeredFor: () => [],
      record: () => {},
    }
  );
}
