"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Letter } from "@/content/alphabets";
import type { LetterExtra } from "@/content/arabic-extras";

/* Combining marks removed, so a letter matches its extras entry whichever
   hamza form the source happened to use. */
const baseGlyph = (g: string) => g.normalize("NFD").replace(/[ً-ٰٟۖ-ۭ]/g, "");

const copy = {
  tapToHear: { te: "వినడానికి అక్షరాన్ని నొక్కండి", en: "Tap a letter to hear it" },
  play: { te: "ఉచ్చారణ వినండి", en: "Play pronunciation" },
  noAudio: { te: "ఈ అక్షరానికి ఆడియో లేదు", en: "No recording for this letter" },
  forms: { te: "పదంలో స్థానాన్ని బట్టి రూపాలు", en: "Forms by position in a word" },
  isolated: { te: "ఒంటరిగా", en: "Isolated" },
  initial: { te: "మొదట", en: "Initial" },
  medial: { te: "మధ్యలో", en: "Medial" },
  final: { te: "చివర", en: "Final" },
  close: { te: "మూసివేయండి", en: "Close" },
  letters: { te: "అక్షరాలు", en: "letters" },
  withAudio: { te: "ఆడియోతో", en: "with audio" },
  sun: { te: "సూర్య అక్షరం", en: "Sun letter" },
  moon: { te: "చంద్ర అక్షరం", en: "Moon letter" },
  example: { te: "ఉదాహరణ:", en: "Example:" },
} as const;

const FORM_KEYS = ["isolated", "initial", "medial", "final"] as const;

export function AlphabetGrid({
  letters,
  script,
  extras,
}: {
  letters: Letter[];
  /** Drives the font and reading direction of the glyphs. */
  script: "arabic" | "urdu";
  /** Sun-letter flags and example words, keyed by base glyph. Arabic only. */
  extras?: Record<string, LetterExtra>;
}) {
  const { lang } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const glyphFont = script === "urdu" ? "font-urdu" : "font-arabic";

  const play = useCallback((src: string | null) => {
    if (!src) return;
    audioRef.current?.pause();
    const a = new Audio(src);
    audioRef.current = a;
    setPlaying(src);
    a.addEventListener("ended", () => setPlaying(null));
    // Autoplay can be refused before a gesture; failing silently is correct here.
    a.play().catch(() => setPlaying(null));
  }, []);

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  // Escape closes the detail panel, matching every other dismissible surface.
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  const open = openIdx === null ? null : letters[openIdx];
  const audioCount = letters.filter((l) => l.audio).length;

  return (
    <div>
      <p className="text-sm text-[var(--if-text-muted)] mb-4">
        {letters.length} {copy.letters[lang]} · {audioCount} {copy.withAudio[lang]} ·{" "}
        {copy.tapToHear[lang]}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {letters.map((l, i) => {
          const isOpen = openIdx === i;
          return (
            <button
              key={`${l.glyph}-${i}`}
              type="button"
              onClick={() => {
                setOpenIdx(isOpen ? null : i);
                play(l.audio);
              }}
              aria-expanded={isOpen}
              aria-label={`${l.name[lang]} — ${l.translit}`}
              className={`group relative flex flex-col items-center justify-center gap-1 min-h-24 rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)] ${
                isOpen
                  ? "border-[var(--if-gold)] bg-[var(--if-gold)]/10"
                  : "border-[var(--if-gold)]/20 bg-white hover:border-[var(--if-gold)]/60 hover:bg-[var(--if-gold)]/5"
              }`}
            >
              {l.audio && (
                <Volume2
                  aria-hidden="true"
                  className={`absolute top-1.5 right-1.5 h-3.5 w-3.5 transition-opacity ${
                    playing === l.audio
                      ? "opacity-100 text-[var(--if-gold-ink)]"
                      : "opacity-0 group-hover:opacity-60 text-[var(--if-text-muted)]"
                  }`}
                />
              )}
              <span
                dir="rtl"
                lang={script === "urdu" ? "ur" : "ar"}
                className={`${glyphFont} text-3xl leading-none text-[var(--if-green)]`}
              >
                {l.glyph}
              </span>
              <span className="text-xs text-[var(--if-text-muted)] text-center leading-snug px-1">
                {l.name[lang]}
              </span>
            </button>
          );
        })}
      </div>

      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="region"
          aria-label={open.name[lang]}
          className="mt-4 rounded-2xl border border-[var(--if-gold)]/30 bg-white p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
        >
          <div className="flex items-start gap-4">
            <span
              dir="rtl"
              lang={script === "urdu" ? "ur" : "ar"}
              className={`${glyphFont} text-5xl leading-none text-[var(--if-green)]`}
            >
              {open.glyph}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold text-[var(--if-green)]">
                {open.name[lang]}
              </h3>
              <p className="text-sm text-[var(--if-text-muted)] font-mono">{open.translit}</p>
            </div>

            {open.audio ? (
              <button
                type="button"
                onClick={() => play(open.audio)}
                aria-label={copy.play[lang]}
                className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full bg-[var(--if-green)] text-[var(--if-gold-light)] text-sm font-semibold hover:bg-[var(--if-green)]/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <Volume2 aria-hidden="true" className="h-4 w-4" />
                {copy.play[lang]}
              </button>
            ) : (
              <span className="text-xs text-[var(--if-text-muted)] self-center">
                {copy.noAudio[lang]}
              </span>
            )}

            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              aria-label={copy.close[lang]}
              className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full hover:bg-[var(--if-gold)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
            >
              <X aria-hidden="true" className="h-4 w-4 text-[var(--if-text-muted)]" />
            </button>
          </div>

          {open.note[lang] && (
            <p className="mt-4 text-sm text-[var(--if-text)] text-pretty">{open.note[lang]}</p>
          )}

          {(() => {
            const x = extras?.[baseGlyph(open.glyph)];
            if (!x) return null;
            return (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center min-h-9 px-2.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
                    x.sunLetter
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  {x.sunLetter ? copy.sun[lang] : copy.moon[lang]}
                </span>
                <span className="inline-flex items-baseline gap-2 text-sm">
                  <span className="text-[var(--if-text-muted)]">{copy.example[lang]}</span>
                  <span
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl text-[var(--if-green)]"
                  >
                    {x.example.glyph}
                  </span>
                  <span className="text-[var(--if-text)]">{x.example.meaning[lang]}</span>
                </span>
              </div>
            );
          })()}

          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--if-green)] mb-2">
              {copy.forms[lang]}
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FORM_KEYS.map((k) => (
                <div
                  key={k}
                  className="rounded-xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/15 px-3 py-3 text-center"
                >
                  <dt className="text-[10px] uppercase tracking-wide text-[var(--if-text-muted)] mb-1">
                    {copy[k][lang]}
                  </dt>
                  <dd
                    dir="rtl"
                    lang={script === "urdu" ? "ur" : "ar"}
                    className={`${glyphFont} text-2xl text-[var(--if-green)] leading-none`}
                  >
                    {open.forms[k] || open.glyph}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
