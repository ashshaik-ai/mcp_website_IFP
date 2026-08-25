"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeftRight, CalendarDays } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

/* Today's Hijri date, and a converter both ways.

   The Knowledge Center card advertised "Hijri to Gregorian conversion" and the
   portal did not have it — twelve month cards and a table of festival dates,
   with no way to answer the question people actually arrive with: what is
   today's date, and when does Ramadan fall this year.

   No library. Every browser ships the Umm al-Qura calendar in Intl, which is
   the calendar Saudi Arabia prints and the one these festival dates are
   reckoned by. Forward conversion is a format call. Backward has no API, so it
   is a binary search over days — about fifteen format calls, instant, and
   exact by construction because it is checked against the same calendar it is
   inverting.

   Umm al-Qura is a calculated calendar. Local moon sighting can differ by a
   day, and saying so is part of the answer rather than a disclaimer. */
const MONTHS_TE = [
  "ముహర్రం", "సఫర్", "రబీ అల్-అవ్వల్", "రబీ అల్-సానీ", "జుమాద అల్-ఉలా", "జుమాద అల్-అఖిరా",
  "రజబ్", "షాబాన్", "రమజాన్", "షవ్వాల్", "జుల్ ఖాదా", "జుల్ హిజ్జా",
];
/* Spelled as the month grid on this same page spells them; the two lists
   disagreed on Jumada. */
const MONTHS_EN = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani",
  "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah",
];

const copy = {
  title: { te: "హిజ్రీ ↔ గ్రెగోరియన్ మార్పిడి", en: "Hijri ↔ Gregorian converter" },
  today: { te: "ఈ రోజు", en: "Today" },
  gToH: { te: "గ్రెగోరియన్ తేదీ", en: "Gregorian date" },
  hToG: { te: "హిజ్రీ తేదీ", en: "Hijri date" },
  day: { te: "రోజు", en: "Day" },
  month: { te: "నెల", en: "Month" },
  year: { te: "సంవత్సరం", en: "Year" },
  result: { te: "ఫలితం", en: "Result" },
  note: {
    te: "ఉమ్ముల్-ఖురా గణన ప్రకారం. స్థానిక చంద్ర దర్శనాన్ని బట్టి ఒక రోజు తేడా రావచ్చు — పండుగ తేదీలకు మీ స్థానిక మస్జిద్‌ను సంప్రదించండి.",
    en: "Reckoned by the Umm al-Qura calculation. Local moon sighting can differ by a day, so confirm festival dates with your masjid.",
  },
  swap: { te: "దిశ మార్చండి", en: "Swap direction" },
  outOfRange: {
    te: "ఈ తేదీ చెల్లదు — రోజు 1–30 మధ్య, సంవత్సరం 1300–1600 మధ్య ఉండాలి.",
    en: "That date is out of range — day 1 to 30, year 1300 to 1600.",
  },
} as const;

const FMT = () => new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric", year: "numeric" });

type Hijri = { y: number; m: number; d: number };

function hijriOf(date: Date): Hijri | null {
  try {
    const parts = FMT().formatToParts(date);
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    const y = get("year"), m = get("month"), d = get("day");
    return Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d) ? { y, m, d } : null;
  } catch {
    return null;
  }
}

const DAY = 86400000;
const rank = (h: Hijri) => h.y * 10000 + h.m * 100 + h.d;

/* The first Gregorian day whose Hijri date is not before the target. Days are
   monotonic in both calendars, so bisection lands exactly. */
function gregorianOf(hy: number, hm: number, hd: number): Date | null {
  const target = hy * 10000 + hm * 100 + hd;
  let lo = Date.UTC(1900, 0, 1);
  let hi = Date.UTC(2200, 0, 1);
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2 / DAY) * DAY;
    const h = hijriOf(new Date(mid));
    if (!h) return null;
    if (rank(h) < target) lo = mid + DAY;
    else hi = mid;
  }
  const out = new Date(lo);
  const back = hijriOf(out);
  return back && rank(back) === target ? out : null;
}

const hijriText = (h: Hijri, lang: "te" | "en") =>
  `${h.d} ${(lang === "te" ? MONTHS_TE : MONTHS_EN)[h.m - 1] ?? h.m} ${h.y} ${lang === "te" ? "హి." : "AH"}`;

/* Read the clock once, after mount: rendering today's date during the server
   pass would bake the build date into the page and mismatch on hydration.

   Local date parts, not toISOString: this site's readers are in IST, and a
   UTC day boundary would have shown them yesterday's Hijri date every night
   between midnight and half past five. */
const subscribeNever = () => () => {};
const readToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function HijriConverter() {
  const { lang } = useI18n();
  const today = useSyncExternalStore(subscribeNever, readToday, () => "");
  const [dir, setDir] = useState<"g2h" | "h2g">("g2h");
  const [greg, setGreg] = useState("");
  const [hij, setHij] = useState<{ d: string; m: string; y: string }>({ d: "", m: "1", y: "" });

  const todayHijri = useMemo(() => (today ? hijriOf(new Date(`${today}T12:00:00Z`)) : null), [today]);

  /* Defaults follow today once the clock is known, so both directions open on
     a real date rather than an empty form. */
  const gregValue = greg || today;
  const hijValue = {
    d: hij.d || String(todayHijri?.d ?? ""),
    m: hij.m,
    y: hij.y || String(todayHijri?.y ?? ""),
  };

  const gOut = useMemo(() => {
    if (dir !== "g2h" || !gregValue) return null;
    const d = new Date(`${gregValue}T12:00:00Z`);
    return Number.isNaN(d.getTime()) ? null : hijriOf(d);
  }, [dir, gregValue]);

  const hBad = useMemo(() => {
    if (dir !== "h2g") return false;
    const d = Number(hijValue.d), m = Number(hijValue.m), y = Number(hijValue.y);
    if (!hijValue.d || !hijValue.y) return false;
    return !d || !m || !y || d < 1 || d > 30 || m < 1 || m > 12 || y < 1300 || y > 1600;
  }, [dir, hijValue.d, hijValue.m, hijValue.y]);

  const hOut = useMemo(() => {
    if (dir !== "h2g" || hBad) return null;
    const d = Number(hijValue.d), m = Number(hijValue.m), y = Number(hijValue.y);
    if (!d || !m || !y) return null;
    return gregorianOf(y, m, d);
  }, [dir, hBad, hijValue.d, hijValue.m, hijValue.y]);

  const dateFmt = new Intl.DateTimeFormat(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

  const field = "w-full min-h-11 rounded-xl border border-[var(--if-gold)]/40 bg-white px-3 text-base text-[var(--if-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]";
  const label = "mb-1 block text-xs font-bold uppercase tracking-wide text-[var(--if-green)]";

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-[var(--if-green)]">
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-[var(--if-gold-ink)]" />
          {copy.title[lang]}
        </p>
        {todayHijri && (
          <p className="text-sm text-[var(--if-text-muted)]">
            <span className="font-semibold text-[var(--if-gold-ink)]">{copy.today[lang]}:</span>{" "}
            <span className="tabular-nums">{hijriText(todayHijri, lang)}</span>
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        {dir === "g2h" ? (
          <label className="min-w-0">
            <span className={label}>{copy.gToH[lang]}</span>
            <input type="date" value={gregValue} onChange={(e) => setGreg(e.target.value)} className={field} />
          </label>
        ) : (
          <div className="grid min-w-0 grid-cols-[1fr_1.6fr_1fr] gap-2">
            <label className="min-w-0">
              <span className={label}>{copy.day[lang]}</span>
              <input
                type="number" min={1} max={30} inputMode="numeric" value={hijValue.d}
                onChange={(e) => setHij((h) => ({ ...h, d: e.target.value }))} className={field}
              />
            </label>
            <label className="min-w-0">
              <span className={label}>{copy.month[lang]}</span>
              <select value={hijValue.m} onChange={(e) => setHij((h) => ({ ...h, m: e.target.value }))} className={field}>
                {(lang === "te" ? MONTHS_TE : MONTHS_EN).map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </label>
            <label className="min-w-0">
              <span className={label}>{copy.year[lang]}</span>
              <input
                type="number" min={1300} max={1600} inputMode="numeric" value={hijValue.y}
                onChange={(e) => setHij((h) => ({ ...h, y: e.target.value }))} className={field}
              />
            </label>
          </div>
        )}

        <button
          type="button"
          onClick={() => setDir((d) => (d === "g2h" ? "h2g" : "g2h"))}
          aria-label={copy.swap[lang]}
          title={copy.swap[lang]}
          className="flex h-11 w-11 shrink-0 items-center justify-center justify-self-start rounded-full border border-[var(--if-gold)]/40 text-[var(--if-green)] transition-colors hover:border-[var(--if-gold)] hover:bg-[var(--if-cream-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] sm:justify-self-center"
        >
          <ArrowLeftRight aria-hidden="true" className="h-4 w-4" />
        </button>

        <div className="min-w-0 rounded-xl bg-[var(--if-cream-light)] px-4 py-3">
          <span className={label}>{copy.result[lang]}</span>
          <p className="font-display text-lg font-bold text-[var(--if-green)] text-pretty" aria-live="polite">
            {dir === "g2h"
              ? gOut
                ? hijriText(gOut, lang)
                : "—"
              : hOut
                ? dateFmt.format(hOut)
                : "—"}
          </p>
        </div>
      </div>

      {/* A bare em dash left the reader guessing which field was wrong. */}
      {hBad && (
        <p className="mt-3 text-sm font-semibold text-[var(--if-gold-ink)] text-pretty" role="alert">
          {copy.outOfRange[lang]}
        </p>
      )}

      <p className="mt-4 text-xs text-[var(--if-text-muted)] text-pretty">{copy.note[lang]}</p>
    </div>
  );
}
