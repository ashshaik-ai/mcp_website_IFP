"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  DAILY_PRAYERS,
  countdown,
  formatTime,
  nextPrayer,
  nowInZone,
  prayerTimes,
  type PrayerKey,
} from "@/lib/prayer-times";

/* Bilingual copy for this file, hoisted out of the JSX so a translator
   can read and review it as one unit. */
const copy = {
  loading_prayer_times: { te: "నమాజ్ సమయాలు లోడ్ అవుతున్నాయి", en: "Loading prayer times" },
  next_prayer: { te: "తదుపరి నమాజ్", en: "Next prayer" },
  in: { te: "మిగిలిన సమయం", en: "in" },
  calculated_for_mangalagiri_karachi_method: { te: "మంగళగిరి కోసం లెక్కించబడింది (కరాచీ పద్ధతి, హనఫీ అస్ర్). మీ స్థానిక మసీదు సమయమే ప్రామాణికం.", en: "Calculated for Mangalagiri (Karachi method, Hanafi Asr). Your local masjid remains authoritative." },
} as const;

const LABELS: Record<PrayerKey, { te: string; en: string; ar: string }> = {
  fajr: { te: "ఫజ్ర్", en: "Fajr", ar: "الفجر" },
  sunrise: { te: "సూర్యోదయం", en: "Sunrise", ar: "الشروق" },
  dhuhr: { te: "జుహర్", en: "Dhuhr", ar: "الظهر" },
  asr: { te: "అస్ర్", en: "Asr", ar: "العصر" },
  maghrib: { te: "మగ్రిబ్", en: "Maghrib", ar: "المغرب" },
  isha: { te: "ఇషా", en: "Isha", ar: "العشاء" },
};

export function PrayerTimesCard() {
  const { lang } = useI18n();
  // Computed after mount: the times depend on "now", and a prerendered value
  // would be frozen at build time and mismatch on hydration.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(nowInZone());
    const id = setInterval(() => setNow(nowInZone()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div
        className="rounded-2xl border border-[var(--if-gold)]/20 bg-white p-6 min-h-[22rem]"
        aria-busy="true"
        aria-label={copy.loading_prayer_times[lang]}
      />
    );
  }

  const times = prayerTimes(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
  const nowHours = now.getUTCHours() + now.getUTCMinutes() / 60;
  const next = nextPrayer(times, nowHours);

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/20 bg-white overflow-hidden">
      <div className="bg-[var(--if-green)] px-6 py-5">
        <p className="text-[11px] uppercase tracking-widest text-[var(--if-gold-light)]">
          {copy.next_prayer[lang]}
        </p>
        <div className="flex items-baseline gap-3 mt-1 flex-wrap">
          <span className="font-display text-2xl font-bold text-[var(--if-gold-light)]">
            {LABELS[next.key][lang]}
          </span>
          <span className="font-mono tabular-nums text-lg text-[var(--if-gold-pale)]">
            {formatTime(next.at)}
          </span>
          <span
            className="ml-auto text-sm text-[var(--if-gold-pale)]/80 tabular-nums"
            aria-live="polite"
          >
            {copy.in[lang]} {countdown(next.inHours)}
          </span>
        </div>
      </div>

      <ul className="divide-y divide-[var(--if-gold)]/10">
        {DAILY_PRAYERS.map((key) => {
          const isNext = key === next.key;
          return (
            <li
              key={key}
              aria-current={isNext ? "true" : undefined}
              className={`flex items-center gap-3 px-6 py-3 ${isNext ? "bg-[var(--if-gold)]/8" : ""}`}
            >
              <span
                className={`font-semibold ${isNext ? "text-[var(--if-green)]" : "text-[var(--if-text)]"}`}
              >
                {LABELS[key][lang]}
              </span>
              <span className="font-arabic text-[var(--if-text-muted)]" dir="rtl" lang="ar">
                {LABELS[key].ar}
              </span>
              <span className="ml-auto font-mono tabular-nums text-[var(--if-text)]">
                {formatTime(times[key])}
              </span>
            </li>
          );
        })}
        <li className="flex items-center gap-3 px-6 py-3 text-[var(--if-text-muted)]">
          <span className="text-sm">{LABELS.sunrise[lang]}</span>
          <span className="ml-auto font-mono tabular-nums text-sm">{formatTime(times.sunrise)}</span>
        </li>
      </ul>

      <p className="px-6 py-4 text-xs text-[var(--if-text-muted)] bg-[var(--if-cream-light)] text-pretty">
        {copy.calculated_for_mangalagiri_karachi_method[lang]}
      </p>
    </div>
  );
}
