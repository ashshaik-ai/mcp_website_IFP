"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Type, Volume2, Play, Pause, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { SurahMeta } from "@/content/quran-index";
import type { Ayah } from "@/lib/quran";
import { teluguSurahAudio, TELUGU_RECITER } from "@/content/quran-audio-te";

/* One surah, read.

   The layout follows what a beginner needs in the order they need it: the
   Arabic first and large, the pronunciation under it while they still need
   it, and the meaning under that. Quran.com puts the translation first and the
   Arabic small, which is right for a reader who already knows the script and
   backwards for someone learning it.

   WHICH VERSION YOU GET IS YOURS TO DECIDE

   Four layers, each switched independently: Arabic, pronunciation, Telugu,
   English. That covers Arabic alone for someone who reads it, Telugu alone for
   someone who does not, both together for someone learning, and every other
   combination -- without a separate page per version.

   RECITATION

   Three voices. Mishary Rashid Alafasy recites the Arabic and Shamshad Ali
   Khan reads the Urdu, both verse by verse. Sheikh Sharif Hamidullah reads the
   Telugu, one recording per surah.

   The Telugu very nearly did not appear here at all. I checked one API's list
   of audio editions, found 176 Arabic and one Urdu and no Telugu, and wrote
   that Telugu recitation did not exist. It does: the Internet Archive carries
   two complete sets and teluguislam.net has published one since 2010. One
   list is not a search, and a community's own material is exactly what a
   general index is worst at holding.

   Voice is chosen separately from text on purpose. Telugu on the page with
   Urdu in the ear is a real combination -- plenty of older Telugu-speaking
   Muslims heard the Quran in Urdu long before they read it in anything -- and
   no single "version" of the page would offer it.

   Everything streams rather than being carried here: 6,236 ayah files and
   699 MB of Telugu do not belong in a repository, and a reader who never
   presses play should never pay for them. If it fails it fails silently and
   the page still reads. */

const copy = {
  translit: { te: "ఉచ్చారణ (ఇంగ్లీష్)", en: "Pronunciation (Latin)" },
  teScript: { te: "తెలుగు లిపిలో ఖురాన్", en: "Quran in Telugu letters" },
  ttNote: {
    te: "తెలుగు అక్షరాలతో అరబీ ఉచ్చారణ — ఉర్దూలో పలికే విధంగా. తెలుగులో కొన్ని అరబీ అక్షరాలకు వేర్వేరు అక్షరాలు లేవు: ث ص س అన్నీ 'స', ق خ రెండూ 'ఖ'. కచ్చితమైన ఉచ్చారణ కోసం పైన అరబిక్ కూడా ఆన్ చేసుకోండి.",
    en: "Arabic pronunciation in Telugu letters, spelled the way Urdu says it. Telugu has no separate letters for some Arabic sounds: ث ص س all become స, and ق خ both become ఖ. Switch the Arabic on above to see exactly what is being said.",
  },
  arabic: { te: "అరబిక్", en: "Arabic" },
  telugu: { te: "తెలుగు", en: "Telugu" },
  english: { te: "ఇంగ్లీష్", en: "English" },
  indopak: { te: "ఇండో-పాక్", en: "Indo-Pak" },
  uthmani: { te: "ఉస్మానీ", en: "Uthmani" },
  size: { te: "అక్షర పరిమాణం", en: "Arabic size" },
  prev: { te: "మునుపటి సూరా", en: "Previous surah" },
  next: { te: "తదుపరి సూరా", en: "Next surah" },
  sajda: { te: "సజ్దా ఆయత్", en: "Verse of prostration" },
  settings: { te: "చదివే ఎంపికలు", en: "Reading options" },
  show: { te: "చూపించు", en: "Show" },
  voice: { te: "వినండి", en: "Listen" },
  voiceOff: { te: "ఆఫ్", en: "Off" },
  voiceAr: { te: "అరబిక్ — అల్-అఫాసీ", en: "Arabic — Alafasy" },
  voiceUr: { te: "ఉర్దూ — షంషాద్ అలీ ఖాన్", en: "Urdu — Shamshad Ali Khan" },
  voiceTe: { te: "తెలుగు — హమీదుల్లాహ్ షరీఫ్", en: "Telugu — Sharif Hamidullah" },
  wholeSurah: {
    te: "తెలుగు పఠనం సూరా మొత్తానికి ఒకే ఫైల్ — ఆయత్ వారీగా లేదు.",
    en: "The Telugu recitation is one recording per surah, not per ayah.",
  },
  playSurah: { te: "సూరా మొత్తం వినండి", en: "Play the whole surah" },
  playAyah: { te: "ఈ ఆయత్ వినండి", en: "Play this ayah" },
  stop: { te: "ఆపండి", en: "Stop" },
  presets: { te: "ఏ రూపంలో చదవాలి?", en: "Choose your version" },
  vTe: { te: "తెలుగు", en: "Telugu" },
  vEn: { te: "ఇంగ్లీష్", en: "English" },
  vAr: { te: "అరబిక్", en: "Arabic" },
  vTeUr: { te: "తెలుగు లిపి + ఉర్దూ వాయిస్", en: "Telugu letters + Urdu voice" },
  vEnUr: { te: "ఇంగ్లీష్ + ఉర్దూ వాయిస్", en: "English + Urdu voice" },
  custom: { te: "మీ ఇష్టం", en: "Custom" },
  more: { te: "మరిన్ని ఎంపికలు", en: "Fine-tune" },
  nothingOn: {
    te: "అన్నీ ఆఫ్ చేశారు — కనీసం ఒకటి ఎంచుకోండి.",
    en: "Everything is switched off — turn at least one layer on.",
  },
};

const KEY = "if-quran-reader-v2";

type Voice = "none" | "ar" | "ur" | "te";

/* Undefined means "not chosen", which is not the same as false. The Telugu and
   English layers follow whichever language the reader is browsing in until a
   deliberate tap pins them. */
type Prefs = {
  ar?: boolean;
  tr?: boolean;
  tt?: boolean;
  te?: boolean;
  en?: boolean;
  uthmani: boolean;
  size: number;
  voice: Voice;
};

const DEFAULTS: Prefs = { uthmani: false, size: 2, voice: "none" };

/* Stored prefs as an external store rather than state loaded in an effect: an
   effect renders the defaults first and the reader's own settings second, so
   every surah opened would flash somebody else's layout. getSnapshot is
   compared by reference and called on every render, so `cache` holds one
   object and only changes identity when a preference does. */
let cache: Prefs | null = null;
const listeners = new Set<() => void>();

function snapshot(): Prefs {
  if (cache) return cache;
  let next: Prefs;
  try {
    const raw = localStorage.getItem(KEY);
    next = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    next = DEFAULTS;
  }
  cache = next;
  return next;
}

const serverSnapshot = () => DEFAULTS;

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

function write(patch: Partial<Prefs>) {
  const next = { ...snapshot(), ...patch };
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Storage unavailable; the choice still holds for this session. */
  }
  for (const l of listeners) l();
}

const SIZES = ["text-2xl sm:text-3xl", "text-3xl sm:text-4xl", "text-4xl sm:text-5xl"];
const LEADING = ["leading-[2.4]", "leading-[2.5]", "leading-[2.6]"];

/* Where each recitation lives. The Urdu is published at 64 kbps and the Arabic
   at 128; asking for the wrong bitrate returns 403, which is how this was
   found rather than assumed. */
const AYAH_AUDIO: Record<"ar" | "ur", (n: number) => string> = {
  ar: (n) => `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${n}.mp3`,
  ur: (n) => `https://cdn.islamic.network/quran/audio/64/ur.khan/${n}.mp3`,
};

/* Telugu is published per surah, so it cannot answer a request for one ayah.
   Rather than pretend otherwise, the reader gets one player for the surah and
   is told why. */
const isPerAyah = (v: Voice): v is "ar" | "ur" => v === "ar" || v === "ur";

export function Reader({
  meta,
  ayahs,
  bismillah,
  prev,
  next,
  firstGlobal,
}: {
  meta: SurahMeta;
  ayahs: Ayah[];
  bismillah: string | null;
  prev: SurahMeta | null;
  next: SurahMeta | null;
  /** Global number (1–6236) of this surah's first ayah, which is how the
      audio files are keyed. */
  firstGlobal: number;
}) {
  const { lang } = useI18n();
  const prefs = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [uthmaniText, setUthmaniText] = useState<Record<number, string> | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [loading, setLoading] = useState<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const showAr = prefs.ar ?? true;
  const showTr = prefs.tr ?? true;
  const showTt = prefs.tt ?? false;
  const showTe = prefs.te ?? lang === "te";
  const showEn = prefs.en ?? lang === "en";
  const nothingOn = !showAr && !showTr && !showTt && !showTe && !showEn;

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

  /* Nothing should keep reciting after the reader has moved on. */
  useEffect(
    () => () => {
      audio.current?.pause();
      audio.current = null;
    },
    [],
  );

  const stop = useCallback(() => {
    audio.current?.pause();
    audio.current = null;
    setPlaying(null);
    setLoading(null);
  }, []);

  const play = useCallback(
    (v: number) => {
      if (!isPerAyah(prefs.voice)) return;
      if (playing === v) {
        stop();
        return;
      }
      audio.current?.pause();
      const el = new Audio(AYAH_AUDIO[prefs.voice](firstGlobal + v - 1));
      audio.current = el;
      setLoading(v);
      el.addEventListener("playing", () => setLoading(null));
      el.addEventListener("ended", () => {
        setPlaying(null);
        setLoading(null);
      });
      el.addEventListener("error", () => {
        /* A missing file, or a reader with no connection: say nothing. */
        setPlaying(null);
        setLoading(null);
      });
      el.play()
        .then(() => setPlaying(v))
        .catch(() => {
          setPlaying(null);
          setLoading(null);
        });
    },
    [prefs.voice, playing, stop, firstGlobal],
  );

  const playSurah = useCallback(() => {
    if (playing === 0) {
      stop();
      return;
    }
    audio.current?.pause();
    const el = new Audio(teluguSurahAudio[meta.n - 1]);
    audio.current = el;
    setLoading(0);
    el.addEventListener("playing", () => setLoading(null));
    el.addEventListener("ended", () => {
      setPlaying(null);
      setLoading(null);
    });
    el.addEventListener("error", () => {
      setPlaying(null);
      setLoading(null);
    });
    el.play()
      .then(() => setPlaying(0))
      .catch(() => {
        setPlaying(null);
        setLoading(null);
      });
  }, [playing, stop, meta.n]);

  const arabicOf = (a: Ayah) => (prefs.uthmani && uthmaniText?.[a.v]) || a.ar;

  /* The five versions, each a single tap.

     Assembling one out of four switches and a voice menu is two or three
     decisions to reach something a reader could have named in one breath:
     "Telugu with the Urdu voice". So each of these sets the layers AND the
     voice together, and the one you are currently in is marked. The
     switches below still exist for anything these five do not cover. */
  const versions: { id: string; label: string; apply: Partial<Prefs> }[] = [
    { id: "te", label: copy.vTe[lang], apply: { ar: false, tr: false, tt: false, te: true, en: false, voice: "none" } },
    { id: "en", label: copy.vEn[lang], apply: { ar: false, tr: false, tt: false, te: false, en: true, voice: "none" } },
    { id: "ar", label: copy.vAr[lang], apply: { ar: true, tr: false, tt: false, te: false, en: false, voice: "ar" } },
    /* Telugu letters, not the Telugu translation. This version is for
       reciting: the reader sounds the Arabic out of their own script while
       the Urdu recitation carries the tune. Showing the meaning here would
       be a different thing entirely, and the Telugu version above is it. */
    { id: "te-ur", label: copy.vTeUr[lang], apply: { ar: false, tr: false, tt: true, te: false, en: false, voice: "ur" } },
    { id: "en-ur", label: copy.vEnUr[lang], apply: { ar: false, tr: false, tt: false, te: false, en: true, voice: "ur" } },
  ];

  /* Which of the five, if any, the reader is currently in. Compared against
     the resolved layers rather than the stored ones, so an untouched reader
     still lights up the version they are actually looking at. */
  const activeVersion =
    versions.find(
      (v) =>
        (v.apply.ar ?? false) === showAr &&
        (v.apply.tr ?? false) === showTr &&
        (v.apply.tt ?? false) === showTt &&
        (v.apply.te ?? false) === showTe &&
        (v.apply.en ?? false) === showEn &&
        v.apply.voice === prefs.voice,
    )?.id ?? null;

  const voices: [Voice, string][] = [
    ["none", copy.voiceOff[lang]],
    ["ar", copy.voiceAr[lang]],
    ["ur", copy.voiceUr[lang]],
    ["te", copy.voiceTe[lang]],
  ];

  return (
    <>
      <div className="mx-auto max-w-3xl px-4">
        <div
          role="group"
          aria-label={copy.settings[lang]}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-[var(--if-gold)]/20 bg-white p-3"
        >
          {/* The five versions. First thing on the page, because choosing one
              is the first thing a reader does. */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-full text-xs font-semibold uppercase tracking-wide text-[var(--if-text-muted)] sm:w-auto">
              {copy.presets[lang]}
            </span>
            {versions.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => write(v.apply)}
                aria-pressed={activeVersion === v.id}
                className={`min-h-11 rounded-full px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                  activeVersion === v.id
                    ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                    : "border border-[var(--if-gold)]/30 text-[var(--if-text-mid)] hover:border-[var(--if-gold)] hover:bg-[var(--if-cream)]"
                }`}
              >
                {v.label}
              </button>
            ))}
            {activeVersion === null && (
              <span className="rounded-full bg-[var(--if-cream)] px-3 py-1 text-xs font-semibold text-[var(--if-text-muted)]">
                {copy.custom[lang]}
              </span>
            )}
          </div>

          {/* Everything below is for a reader who wants something the five
              versions do not cover. Folded away because three rows of chips
              pushed the Quran itself off a phone screen, and the point of the
              page is the Quran. */}
          <details className="group border-t border-[var(--if-gold)]/15 pt-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--if-text-muted)] transition-colors hover:text-[var(--if-text-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]">
              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-open:rotate-90"
              />
              {copy.more[lang]}
            </summary>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Toggle on={showAr} onClick={() => write({ ar: !showAr })} label={copy.arabic[lang]} />
            <Toggle
              on={showTr}
              onClick={() => write({ tr: !showTr })}
              icon={<Volume2 aria-hidden="true" className="h-3.5 w-3.5" />}
              label={copy.translit[lang]}
            />
            <Toggle on={showTt} onClick={() => write({ tt: !showTt })} label={copy.teScript[lang]} />
            <Toggle on={showTe} onClick={() => write({ te: !showTe })} label={copy.telugu[lang]} />
            <Toggle on={showEn} onClick={() => write({ en: !showEn })} label={copy.english[lang]} />

            <div className="ml-auto flex items-center gap-1">
              <Toggle
                on={prefs.uthmani}
                onClick={() => write({ uthmani: !prefs.uthmani })}
                icon={<Type aria-hidden="true" className="h-3.5 w-3.5" />}
                label={prefs.uthmani ? copy.uthmani[lang] : copy.indopak[lang]}
              />
              {SIZES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => write({ size: i })}
                  aria-pressed={prefs.size === i}
                  aria-label={`${copy.size[lang]} ${i + 1}`}
                  className={`font-arabic min-h-11 min-w-11 rounded-lg transition-colors ${
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

          {/* The voice is chosen apart from the text, which is why the two
              "+ Urdu voice" versions are possible at all. */}
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--if-gold)]/15 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--if-text-muted)]">
              {copy.voice[lang]}
            </span>
            {voices.map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  stop();
                  write({ voice: v });
                }}
                aria-pressed={prefs.voice === v}
                className={`min-h-11 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                  prefs.voice === v
                    ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                    : "border border-[var(--if-gold)]/30 text-[var(--if-text-mid)] hover:border-[var(--if-gold)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          </details>
        </div>

        {/* Said plainly rather than left for a reader to discover: some Arabic
            letters share one Telugu letter, so this line gets you reciting but
            is not a substitute for the script itself. */}
        {showTt && (
          <p className="mb-6 rounded-lg border border-[var(--if-gold)]/25 bg-[var(--if-cream)] px-4 py-3 text-sm leading-relaxed text-[var(--if-text-mid)]">
            {copy.ttNote[lang]}
          </p>
        )}

        {nothingOn && (
          <p className="mb-6 rounded-lg bg-[var(--if-gold)]/10 px-4 py-3 text-center text-sm text-[var(--if-gold-ink)]">
            {copy.nothingOn[lang]}
          </p>
        )}

        {prefs.voice === "te" && (
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl bg-[var(--if-green)] px-4 py-3 text-[var(--if-gold-pale)]">
            <button
              type="button"
              onClick={playSurah}
              aria-label={playing === 0 ? copy.stop[lang] : copy.playSurah[lang]}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--if-gold-light)] text-[var(--if-green)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
            >
              {loading === 0 ? (
                <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
              ) : playing === 0 ? (
                <Pause aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Play aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{copy.playSurah[lang]}</span>
              <span className="block text-xs text-[var(--if-gold-pale)]/75">
                {TELUGU_RECITER[lang]} · {copy.wholeSurah[lang]}
              </span>
            </span>
          </div>
        )}

        {bismillah && showAr && (
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
                {isPerAyah(prefs.voice) && (
                  <button
                    type="button"
                    onClick={() => play(a.v)}
                    aria-label={playing === a.v ? copy.stop[lang] : copy.playAyah[lang]}
                    className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-[var(--if-gold-ink)] transition-colors hover:bg-[var(--if-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
                  >
                    {loading === a.v ? (
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    ) : playing === a.v ? (
                      <Pause aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Play aria-hidden="true" className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {showAr && (
                <p
                  className={`font-arabic text-right text-[var(--if-text)] ${SIZES[prefs.size]} ${LEADING[prefs.size]}`}
                  lang="ar"
                  dir="rtl"
                >
                  {arabicOf(a)}
                </p>
              )}

              {showTr && (
                <p className="mt-3 text-sm italic leading-relaxed text-[var(--if-text-muted)]">{a.tr}</p>
              )}

              {/* Telugu letters carrying the Arabic. Set a little larger and
                  darker than a translation because this line is meant to be
                  read aloud, not skimmed. */}
              {showTt && (
                <p
                  className="mt-3 text-lg leading-[2] font-medium text-[var(--if-text)]"
                  style={{ textWrap: "pretty" }}
                  lang="te"
                >
                  {a.tt}
                </p>
              )}

              {showTe && (
                <p
                  className="mt-3 leading-relaxed text-[var(--if-text-mid)]"
                  style={{ textWrap: "pretty" }}
                  lang="te"
                >
                  {a.te}
                </p>
              )}

              {showEn && (
                <p
                  className="mt-3 leading-relaxed text-[var(--if-text-mid)]"
                  style={{ textWrap: "pretty" }}
                  lang="en"
                >
                  {a.en}
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
  icon?: React.ReactNode;
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
