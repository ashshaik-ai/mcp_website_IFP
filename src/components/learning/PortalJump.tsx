"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ChevronRight, Clock, Flame, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { summariesByPortal } from "@/content/lesson-index";
import { useProgress } from "@/lib/progress";
import { useEffect, useState } from "react";
import { touchStreak } from "@/lib/streak";

/* The course bar: what this portal is, how far through it you are, and the one
   thing to do next.

   It started as a shortcut — a portal's lessons sat between seven and
   twenty-two phone screens below the fold, behind the timeline, the explorer,
   the dashboard and the simulator, so this said how many there were and took
   you to them.

   It does the rest of the job now. Every platform this was measured against —
   Coursera, Udemy, edX, LinkedIn Learning, Khan Academy — leads a returning
   learner with one control that says where they were, and none of them make
   you find your place again. Here you had to remember which lesson you were on
   and go looking for it in a list at the foot of the page. So: the length of
   the course, a bar for how much of it is behind you, and a button that reads
   Start, Continue or Review depending on where you are. */
const copy = {
  lessons: { te: "పాఠాలు", en: "lessons" },
  min: { te: "నిమి", en: "min" },
  go: { te: "పాఠాలకు వెళ్ళండి", en: "Go to lessons" },
  start: { te: "మొదలుపెట్టండి", en: "Start" },
  resume: { te: "కొనసాగించండి", en: "Continue" },
  complete: { te: "పోర్టల్ పూర్తయింది", en: "Portal complete" },
  review: { te: "మళ్ళీ చూడండి", en: "Review" },
  progress: { te: "పురోగతి", en: "Progress" },
  home: { te: "హోమ్", en: "Home" },
  kc: { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  breadcrumb: { te: "మార్గం", en: "Breadcrumb" },
} as const;

export function PortalJump({ portal, sticky = true }: { portal: string; sticky?: boolean }) {
  const { lang } = useI18n();
  const { ready, isDone, countFor } = useProgress();
  /* Opening any portal keeps the flame lit; two days and up earn the chip. */
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    setStreak(touchStreak());
  }, []);
  const items = summariesByPortal(portal);
  if (!items.length) return null;

  const slugs = items.map((l) => l.slug);
  const done = ready ? countFor(portal, slugs) : 0;
  const finished = ready && done === items.length;
  const totalMinutes = items.reduce((n, l) => n + (l.minutes ?? 0), 0);

  /* The first lesson not yet finished — where a returning learner left off,
     not merely the next one in the list. */
  const nextUp = ready ? items.find((l) => !isDone(portal, l.slug)) : undefined;
  const target = finished || !nextUp ? "#lessons" : `/knowledge-center/${portal}/${nextUp.slug}`;
  const actionLabel = !ready
    ? copy.go[lang]
    : finished
      ? copy.review[lang]
      : done > 0
        ? copy.resume[lang]
        : copy.start[lang];
  const Icon = !ready || finished ? ArrowDown : ArrowRight;

  return (
    /* Four portals already carry their own sticky tab bar under the header.
       A second sticky bar there would stack two of them down the screen, so on
       those this one stays in flow: still the first thing on the page, still a
       one-tap route to the lessons, just not pinned. */
    <div
      className={`z-30 border-b border-[var(--if-gold)]/20 bg-[var(--if-cream-light)]/95 backdrop-blur-sm ${
        sticky ? "sticky top-[65px]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2 text-xs sm:text-sm">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* The way back. A portal offered none: the logo goes home but never
              says so, and the hero's back-link scrolls out of sight the moment
              you start reading. This is in the bar that follows you down the
              page. */}
          {/* One type scale and one gap rhythm across the whole row. The
              breadcrumb used to be text-xs beside counts that stepped up to
              text-sm, and the links carried their own horizontal padding on
              top of the row's gap, so the spacing read as uneven. */}
          <nav aria-label={copy.breadcrumb[lang]} className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              title={copy.home[lang]}
              /* Below sm only the icon shows, and with the padding removed for the
                 spacing rhythm that left a 16px-wide tap target. A minimum
                 width keeps the icon-only state on the right side of the
                 24px floor without widening the labelled state. */
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 font-semibold text-[var(--if-text-muted)] transition-colors hover:text-[var(--if-green)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] sm:min-w-0 sm:justify-start"
            >
              <Home aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="sr-only sm:not-sr-only">{copy.home[lang]}</span>
            </Link>
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[var(--if-text-muted)]/50" />
            <Link
              href="/knowledge-center"
              className="inline-flex min-h-11 max-w-[8rem] items-center truncate font-semibold text-[var(--if-text-muted)] transition-colors hover:text-[var(--if-green)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] sm:max-w-none"
            >
              {copy.kc[lang]}
            </Link>
          </nav>
          <span aria-hidden="true" className="hidden h-5 w-px shrink-0 bg-[var(--if-gold)]/30 min-[480px]:block" />
          {/* The counts step down rather than being squeezed: the minutes go
              first, then the whole line, so the breadcrumb and the action
              always keep their room on a narrow phone. */}
          {finished ? (
            <p className="hidden min-w-0 shrink-0 items-center gap-1.5 truncate font-semibold text-[var(--if-green)] min-[480px]:inline-flex">
              <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
              {copy.complete[lang]}
            </p>
          ) : (
            <p className="hidden shrink-0 whitespace-nowrap font-semibold text-[var(--if-text-mid)] min-[480px]:block">
              <span className="tabular-nums">{items.length}</span> {copy.lessons[lang]}
              {totalMinutes > 0 && (
                <span className="ml-2 hidden items-center gap-1 text-[var(--if-text-muted)] sm:inline-flex">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="tabular-nums">{totalMinutes}</span> {copy.min[lang]}
                </span>
              )}
            </p>
          )}

          {streak >= 2 && (
            <span
              className="hidden shrink-0 items-center gap-1 rounded-full bg-[var(--if-gold)]/15 px-2.5 py-1 text-xs font-bold text-[var(--if-gold-ink)] tabular-nums min-[420px]:inline-flex"
              title={lang === "te" ? `${streak} రోజుల వరుస` : `${streak}-day streak`}
            >
              <Flame aria-hidden="true" className="h-3.5 w-3.5" />
              {streak}
            </span>
          )}

          {/* Hidden until storage has been read, so the bar never animates from
              empty to full in front of a returning learner. */}
          {/* Phones used to hide this entirely, which defeated the bar's whole
              purpose for the audience most of the site serves; it now shows a
              narrower track instead. */}
          <div
            className="flex items-center gap-2"
            style={{ visibility: ready && done > 0 ? "visible" : "hidden" }}
          >
            <div
              className="h-1.5 w-10 overflow-hidden rounded-full bg-[var(--if-gold)]/20 sm:w-24"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={items.length}
              aria-valuenow={done}
              aria-label={copy.progress[lang]}
            >
              <div
                className="h-full rounded-full bg-[var(--if-gold)] transition-[width] duration-500"
                style={{ width: `${(done / items.length) * 100}%` }}
              />
            </div>
            <span className="tabular-nums text-xs text-[var(--if-gold-ink)]">
              {done}/{items.length}
            </span>
          </div>
        </div>

        <Link
          href={target}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--if-gold)]/40 bg-white px-3.5 min-h-11 text-xs font-bold text-[var(--if-green)] transition-colors hover:border-[var(--if-gold)] hover:bg-[color-mix(in_srgb,var(--if-gold)_10%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <span className="max-w-[10rem] truncate sm:max-w-none">
            {actionLabel}
            {nextUp && !finished && done > 0 && (
              /* From sm rather than md: a returning learner should see which
                 lesson Continue leads to as early as the width allows. Below
                 that the bar is too tight for a title that would only be
                 truncated to a stub. */
              <span className="hidden font-semibold text-[var(--if-text-muted)] sm:inline">
                {" — "}
                {nextUp.title[lang]}
              </span>
            )}
          </span>
          <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
