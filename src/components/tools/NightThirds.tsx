"use client";

import { useSyncExternalStore } from "react";
import { Moon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { MANGALAGIRI, formatTime, nowInZone, prayerTimes } from "@/lib/prayer-times";

/* When the last third of the night begins.

   The tahajjud lesson says to pray in the last third and every rival app
   answers the obvious next question — when is that tonight — while this
   portal left the reader to work it out. It is arithmetic on times the site
   already computes: the night runs from maghrib to the next day's fajr, and
   the thirds divide it.

   Reading the clock happens after mount through useSyncExternalStore. Doing it
   during render would bake the build time into a static page and hand every
   visitor a stale answer. */
const copy = {
  title: { te: "రాత్రి చివరి మూడో భాగం", en: "The last third of the night" },
  sub: { te: "మంగళగిరి · ఈ రాత్రి", en: "Mangalagiri · tonight" },
  night: { te: "రాత్రి మొత్తం", en: "The night" },
  first: { te: "మొదటి భాగం", en: "First third" },
  middle: { te: "మధ్య భాగం", en: "Middle third" },
  last: { te: "చివరి భాగం — తహజ్జుద్", en: "Last third — tahajjud" },
  best: { te: "ఉత్తమ సమయం", en: "Best time" },
  from: { te: "నుండి", en: "from" },
  to: { te: "వరకు", en: "to" },
  note: {
    te: "మగ్రిబ్ నుండి ఫజ్ర్ వరకు ఉన్న సమయాన్ని మూడు సమాన భాగాలుగా విభజించారు. ఇవి గణించిన సమయాలు — మీ స్థానిక మస్జిద్ సమయాలతో సరిచూసుకోండి.",
    en: "The span from maghrib to fajr, divided in three. These are calculated times; check them against your masjid.",
  },
} as const;

const subscribeNever = () => () => {};
const readNow = () => {
  const n = nowInZone();
  return `${n.getUTCFullYear()}-${n.getUTCMonth()}-${n.getUTCDate()}`;
};

export function NightThirds() {
  const { lang } = useI18n();
  const stamp = useSyncExternalStore(subscribeNever, readNow, () => "");

  /* The card renders whole on the server; only the times wait for the clock.
     Returning a blank placeholder until mount, as a first cut did, left a
     reader without JavaScript — and a crawler — looking at an empty box where
     the tool should be. */
  let bounds: number[] | null = null;
  if (stamp) {
    const [y, m, d] = stamp.split("-").map(Number);
    const tonight = prayerTimes(y, m + 1, d, MANGALAGIRI);
    const tomorrow = new Date(Date.UTC(y, m, d + 1));
    const nextFajr = prayerTimes(
      tomorrow.getUTCFullYear(),
      tomorrow.getUTCMonth() + 1,
      tomorrow.getUTCDate(),
      MANGALAGIRI,
    ).fajr;
    /* Maghrib tonight to fajr tomorrow, crossing midnight. */
    const nightLength = 24 - tonight.maghrib + nextFajr;
    const third = nightLength / 3;
    const wrap = (h: number) => h % 24;
    bounds = [
      tonight.maghrib,
      wrap(tonight.maghrib + third),
      wrap(tonight.maghrib + third * 2),
      wrap(tonight.maghrib + nightLength),
    ];
  }

  const span = (a: number, b: number) => (bounds ? `${formatTime(bounds[a])} — ${formatTime(bounds[b])}` : "—");

  const rows = [
    { label: copy.first[lang], span: span(0, 1), lit: false },
    { label: copy.middle[lang], span: span(1, 2), lit: false },
    { label: copy.last[lang], span: span(2, 3), lit: true },
  ];

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--if-green)]">
          <Moon aria-hidden="true" className="h-5 w-5 text-[var(--if-gold-ink)]" />
          {copy.title[lang]}
        </p>
        <p className="text-sm text-[var(--if-text-muted)]">{copy.sub[lang]}</p>
      </div>

      <p className="mt-4 text-sm text-[var(--if-text-muted)]">
        <span className="font-semibold text-[var(--if-gold-ink)]">{copy.best[lang]}:</span>{" "}
        <span className="tabular-nums font-semibold text-[var(--if-green)]">{span(2, 3)}</span>
      </p>

      <ul className="mt-4 grid gap-2">
        {rows.map((r) => (
          <li
            key={r.label}
            className={`flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-xl px-4 py-3 ${
              r.lit
                ? "bg-[color-mix(in_srgb,var(--if-gold)_14%,white)] ring-1 ring-[var(--if-gold)]/40"
                : "bg-[var(--if-cream-light)]"
            }`}
          >
            <span className={`text-sm ${r.lit ? "font-bold text-[var(--if-green)]" : "text-[var(--if-text)]"}`}>
              {r.label}
            </span>
            <span className="text-sm tabular-nums text-[var(--if-text-muted)]">{r.span}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-[var(--if-text-muted)] text-pretty">{copy.note[lang]}</p>
    </div>
  );
}
