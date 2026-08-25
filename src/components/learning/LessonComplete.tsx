"use client";

import { useEffect, useRef } from "react";
import { Check, Circle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useProgress } from "@/lib/progress";
import { celebrate } from "@/lib/celebrate";

const copy = {
  mark: { te: "పూర్తయినట్టు గుర్తించండి", en: "Mark as complete" },
  done: { te: "పూర్తయింది", en: "Completed" },
  undo: { te: "గుర్తు తీసివేయండి", en: "Mark as not complete" },
  allRight: { te: "సరైనవి", en: "right" },
  saved: { te: "ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతుంది", en: "Saved in this browser only" },
} as const;

export function LessonComplete({
  portal,
  slug,
  quizScore = 0,
  quizTotal = 0,
}: {
  portal: string;
  slug: string;
  quizScore?: number;
  quizTotal?: number;
}) {
  const { lang } = useI18n();
  const { ready, isDone, toggle } = useProgress();
  const done = isDone(portal, slug);
  /* An accidental double-tap marked the lesson done and silently un-marked it
     again. Un-marking within half a second of marking is never intended. */
  const lastToggle = useRef(0);
  /* Un-marking a lesson you had aced used to be a dead control: the effect
     below saw an unfinished, fully-scored lesson and immediately marked it
     again, so the button flipped back under the reader's finger. An explicit
     un-mark is remembered for the rest of the visit. */
  const unmarked = useRef(false);
  const guardedToggle = () => {
    const now = Date.now();
    if (done && now - lastToggle.current < 500) return;
    lastToggle.current = now;
    if (done) unmarked.current = true;
    toggle(portal, slug);
  };
  const aced = quizTotal > 0 && quizScore >= quizTotal;

  /* Answering every question correctly is finishing the lesson. Until now the
     only thing that counted was this button: a reader could work through the
     whole page, get all five right, and the portal would still show nothing
     against their name. */
  useEffect(() => {
    if (ready && aced && !done && !unmarked.current) {
      toggle(portal, slug);
      celebrate();
    }
  }, [ready, aced, done, toggle, portal, slug]);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={guardedToggle}
        aria-pressed={done}
        aria-label={done ? copy.undo[lang] : copy.mark[lang]}
        /* Invisible until storage has been read, so the button never flips
           from unchecked to checked in front of the reader. */
        style={{ visibility: ready ? "visible" : "hidden" }}
        className={`inline-flex items-center gap-2 min-h-11 px-5 rounded-full font-semibold text-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
          done
            ? "bg-[var(--if-green)] text-[var(--if-gold-light)] border-transparent"
            : "bg-white text-[var(--if-green)] border-[var(--if-gold)]/40 hover:border-[var(--if-gold)]"
        }`}
      >
        {done ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Circle aria-hidden="true" className="h-4 w-4" />
        )}
        {done ? copy.done[lang] : copy.mark[lang]}
      </button>
      {aced && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--if-gold)]/15 px-3 py-1 text-xs font-bold text-[var(--if-gold-ink)]">
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
          {quizScore} / {quizTotal} {copy.allRight[lang]}
        </span>
      )}
      <span className="text-xs text-[var(--if-text-muted)]">{copy.saved[lang]}</span>
    </div>
  );
}
