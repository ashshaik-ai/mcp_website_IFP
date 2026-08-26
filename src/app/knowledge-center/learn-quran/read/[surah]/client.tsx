"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Type, Languages, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { SurahMeta } from "@/content/quran-index";
import type { Ayah } from "@/lib/quran";

/* One surah, read.

   The layout follows what a beginner needs in the order they need it: the
   Arabic first and large, the pronunciation under it while they still need
   it, and the Telugu under that. Quran.com puts the translation first and the
   Arabic small, which is right for a reader who already knows the script and
   backwards for someone learning it.

   Everything here is a preference, and preferences are remembered. Somebody
   who turns the transliteration off has said something about themselves;
   asking again next visit is just forgetting. */

const copy = {
  ayahs: { te: "ఆయతులు", en: "ayahs" },
  makkah: { te: "మక్కాలో అవతరించింది", en: "Revealed in Makkah" },
  madinah: { te: "మదీనాలో అవతరించింది", en: "Revealed in Madinah" },
  translit: { te: "ఉచ్చారణ", en: "Pronunciation" },
  meaning: { te: "తెలుగు అర్థం", en: "Telugu meaning" },
  script: { te: "లిపి", en: "Script" },
  indopak: { te: "ఇండో-పాక్", en: "Indo-Pak" },
  uthmani: { te: "ఉస్మానీ", en: "Uthmani" },
  size: { te: "అక్షర పరిమాణం", en: "Arabic size" },
  prev: { te: "మునుపటి సూరా", en: "Previous surah" },
  next: { te: "తదుపరి సూరా", en: "Next surah" },
  sajda: { te: "సజ్దా ఆయత్", en: "Verse of prostration" },
  loading: { te: "లోడ్ అవుతోంది…", en: "Loading…" },
  settings: { te: "చదివే ఎంపికలు", en: "Reading options" },
};

const KEY = "if-quran-reader-v1";
type Prefs = { translit: boolean; meaning: boolean; uthmani: boolean; size: number };
const DEFAULTS: Prefs = { translit: true, meaning: true, uthmani: false, size: 2 };

/* Reading preferences, as a store rather than as state loaded in an effect.

   The effect version is the obvious one and it is banned under src/app for a
   reason: it renders the defaults, then sets state, then renders again, on
   every mount. Here that meant every surah you opened flashed the default
   settings before showing yours.

   The one hazard is the snapshot. useSyncExternalStore compares by reference
   and calls getSnapshot on every render, so building a fresh object there
   loops forever. `cache` holds one object and only replaces it when a
   preference actually changes. */
let cache: Prefs | null = null;
const listeners = new Set<() => void>();

function snapshot(): Prefs {
  if (cache) return cache;
  let next: Prefs;
  try {
    const raw = localStorage.getItem(KEY);
    next = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    /* Private mode, or a value from an older shape. The defaults are fine. */
    next = DEFAULTS;
  }
  cache = next;
  return next;
}

/* The server has no localStorage, so it renders the defaults; the first
   client render corrects them. DEFAULTS is a constant, so its identity is
   stable across calls and hydration does not loop. */
const serverSnapshot = () => DEFAULTS;

function subscribe(fn: () => void) {
  listeners.add(fn);
  /* Two tabs open on two surahs should agree about the font size. */
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

function writePrefs(patch: Partial<Prefs>) {
  const next = { ...snapshot(), ...patch };
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Storage unavailable; the choice still holds for this session. */
  }
  for (const l of listeners) l();
}

/* Three steps, not a slider. A slider invites fiddling; a beginner wants the
   Arabic big and everyone else wants it out of the way. */
const SIZES = ["text-2xl sm:text-3xl", "text-3xl sm:text-4xl", "text-4xl sm:text-5xl"];
const LEADING = ["leading-[2.4]", "leading-[2.5]", "leading-[2.6]"];

export function Reader({
  meta,
  ayahs,
  bismillah,
  prev,
  next,
}: {
  meta: SurahMeta;
  ayahs: Ayah[];
  bismillah: string | null;
  prev: SurahMeta | null;
  next: SurahMeta | null;
}) {
  const { lang } = useI18n();
  const prefs = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [uthmaniText, setUthmaniText] = useState<Record<number, string> | null>(null);
  const update = writePrefs;

  /* The Uthmani text is a second file, fetched only if somebody asks for it.
     Most of this audience never will, and they should not pay for it. */
  useEffect(() => {
    if (!prefs.uthmani || uthmaniText) return;
    let alive = true;
    const pad = String(meta.n).padStart(3, "0");
    fetch(`/quran/${pad}-uthmani.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        const map: Record<number, string> = {};
        for (const a of d.ayahs) map[a.v] = a.ar;
        setUthmaniText(map);
      })
      .catch(() => {
        /* Fall back to the Indo-Pak text already on the page. */
      });
    return () => {
      alive = false;
    };
  }, [prefs.uthmani, uthmaniText, meta.n]);

  const arabicOf = (a: Ayah) => (prefs.uthmani && uthmaniText?.[a.v]) || a.ar;

  return (
    <>
      <div className="mx-auto max-w-3xl px-4">
        {/* Reading options. A row of toggles, not a settings page. */}
        <div
          role="group"
          aria-label={copy.settings[lang]}
          className="mb-8 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--if-gold)]/20 bg-white p-2"
        >
          <Toggle
            on={prefs.translit}
            onClick={() => update({ translit: !prefs.translit })}
            icon={<Volume2 aria-hidden="true" className="h-4 w-4" />}
            label={copy.translit[lang]}
          />
          <Toggle
            on={prefs.meaning}
            onClick={() => update({ meaning: !prefs.meaning })}
            icon={<Languages aria-hidden="true" className="h-4 w-4" />}
            label={copy.meaning[lang]}
          />
          <Toggle
            on={prefs.uthmani}
            onClick={() => update({ uthmani: !prefs.uthmani })}
            icon={<Type aria-hidden="true" className="h-4 w-4" />}
            label={prefs.uthmani ? copy.uthmani[lang] : copy.indopak[lang]}
          />
          <div className="ml-auto flex items-center gap-1">
            <span className="sr-only" id="size-label">
              {copy.size[lang]}
            </span>
            {SIZES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => update({ size: i })}
                aria-pressed={prefs.size === i}
                aria-describedby="size-label"
                aria-label={`${copy.size[lang]} ${i + 1}`}
                className={`min-h-11 min-w-11 rounded-lg font-arabic transition-colors ${
                  prefs.size === i
                    ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                    : "text-[var(--if-text-muted)] hover:bg-[var(--if-cream)]"
                }`}
                style={{ fontSize: `${0.85 + i * 0.3}rem` }}
              >
                ا
              </button>
            ))}
          </div>
        </div>

        {bismillah && (
          <p
            className="font-arabic mb-8 text-center text-2xl text-[var(--if-gold-ink)] sm:text-3xl"
            lang="ar"
            dir="rtl"
          >
            {bismillah}
          </p>
        )}

        <ol className="flex flex-col gap-6">
          {ayahs.map((a) => (
            <li
              key={a.v}
              id={`a${a.v}`}
              className="scroll-mt-[120px] border-b border-[var(--if-gold)]/15 pb-6 last:border-0"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--if-cream)] px-2 text-xs font-bold tabular-nums text-[var(--if-gold-ink)]">
                  {meta.n}:{a.v}
                </span>
                {a.sajda && (
                  <span className="rounded-full bg-[var(--if-green)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--if-green)]">
                    ۩ {copy.sajda[lang]}
                  </span>
                )}
              </div>

              <p
                className={`font-arabic text-right text-[var(--if-text)] ${SIZES[prefs.size]} ${LEADING[prefs.size]}`}
                lang="ar"
                dir="rtl"
              >
                {arabicOf(a)}
              </p>

              {prefs.translit && (
                <p className="mt-3 text-sm italic leading-relaxed text-[var(--if-text-muted)]">{a.tr}</p>
              )}

              {prefs.meaning && (
                <p className="mt-3 leading-relaxed text-[var(--if-text-mid)]" style={{ textWrap: "pretty" }}>
                  {a.te}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>

      <nav
        aria-label={lang === "te" ? "సూరాల మధ్య" : "Between surahs"}
        className="mx-auto mt-12 flex max-w-3xl items-stretch gap-3 px-4"
      >
        {prev ? (
          <Link
            href={`/knowledge-center/learn-quran/read/${prev.n}`}
            className="flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-[var(--if-gold)]/25 bg-white p-3 text-sm transition-colors hover:border-[var(--if-gold)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
            <span className="min-w-0">
              <span className="block text-xs text-[var(--if-text-muted)]">{copy.prev[lang]}</span>
              <span className="block truncate font-semibold text-[var(--if-green)]">
                {lang === "te" ? prev.te : prev.en}
              </span>
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/knowledge-center/learn-quran/read/${next.n}`}
            className="flex min-h-11 flex-1 items-center justify-end gap-2 rounded-xl border border-[var(--if-gold)]/25 bg-white p-3 text-right text-sm transition-colors hover:border-[var(--if-gold)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <span className="min-w-0">
              <span className="block text-xs text-[var(--if-text-muted)]">{copy.next[lang]}</span>
              <span className="block truncate font-semibold text-[var(--if-green)]">
                {lang === "te" ? next.te : next.en}
              </span>
            </span>
            <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--if-gold-ink)]" />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </>
  );
}

function Toggle({
  on,
  onClick,
  icon,
  label,
}: {
  on: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
        on
          ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
          : "text-[var(--if-text-muted)] hover:bg-[var(--if-cream)]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
