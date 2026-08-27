"use client";

import { useSyncExternalStore } from "react";
import { useI18n } from "@/lib/i18n/context";

/* Which version of a hadith page you get.

   The Quran reader offers Telugu, English and Arabic because all three exist
   as text. Hadith does not have that luxury and the page should not pretend
   otherwise: these collections are carried in Arabic and English only.

   Telugu hadith DOES exist -- Hadeesu Kiranaalu, the Telugu Riyad us-Saliheen,
   and Al-Lulu wal Marjan, published by Telugu Islam in Hyderabad. They are
   scanned books. I downloaded one and pulled zero characters of text out of
   it, because every page is an image. Running Telugu OCR over scripture and
   publishing the result would put words in the Prophet's mouth ﷺ with a
   machine's confidence and nobody's authority, so the collections page links
   to the books instead and says what they are.

   What this leaves is a genuine choice between Arabic, English, or both, which
   is the choice a reader of these pages actually has. */

const KEY = "if-hadith-view-v1";

type View = "both" | "ar" | "en";

const copy = {
  label: { te: "ఏ రూపంలో?", en: "Show" },
  both: { te: "అరబిక్ + ఇంగ్లీష్", en: "Arabic + English" },
  ar: { te: "అరబిక్ మాత్రమే", en: "Arabic only" },
  en: { te: "ఇంగ్లీష్ మాత్రమే", en: "English only" },
};

let cache: View | null = null;
const listeners = new Set<() => void>();

function snapshot(): View {
  if (cache) return cache;
  let v: View = "both";
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === "ar" || raw === "en" || raw === "both") v = raw;
  } catch {
    /* Private mode: "both" is a fine answer. */
  }
  cache = v;
  return v;
}

/* A string, so it is compared by value and a fresh return cannot loop. */
const serverSnapshot = (): View => "both";

function subscribe(fn: () => void) {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    for (const l of listeners) l();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function write(v: View) {
  cache = v;
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* The choice still holds for this session. */
  }
  for (const l of listeners) l();
}

export function useHadithView(): View {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

export function HadithVersionPicker() {
  const { lang } = useI18n();
  const view = useHadithView();
  const options: [View, string][] = [
    ["both", copy.both[lang]],
    ["ar", copy.ar[lang]],
    ["en", copy.en[lang]],
  ];

  return (
    <div
      role="group"
      aria-label={copy.label[lang]}
      className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--if-gold)]/20 bg-white p-2"
    >
      <span className="px-1 text-xs font-semibold uppercase tracking-wide text-[var(--if-text-muted)]">
        {copy.label[lang]}
      </span>
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => write(v)}
          aria-pressed={view === v}
          className={`min-h-11 rounded-full px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
            view === v
              ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
              : "border border-[var(--if-gold)]/30 text-[var(--if-text-mid)] hover:border-[var(--if-gold)] hover:bg-[var(--if-cream)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
