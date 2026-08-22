"use client";

import { Check, Circle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useProgress } from "@/lib/progress";

const copy = {
  mark: { te: "పూర్తయినట్టు గుర్తించండి", en: "Mark as complete" },
  done: { te: "పూర్తయింది", en: "Completed" },
  undo: { te: "గుర్తు తీసివేయండి", en: "Mark as not complete" },
  saved: { te: "ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతుంది", en: "Saved in this browser only" },
} as const;

export function LessonComplete({ portal, slug }: { portal: string; slug: string }) {
  const { lang } = useI18n();
  const { ready, isDone, toggle } = useProgress();
  const done = isDone(portal, slug);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => toggle(portal, slug)}
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
      <span className="text-xs text-[var(--if-text-muted)]">{copy.saved[lang]}</span>
    </div>
  );
}
