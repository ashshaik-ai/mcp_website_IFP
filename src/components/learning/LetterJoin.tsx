"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import { arabicLetters } from "@/content/alphabets";

/* How letters join.

   This is the wall almost every adult beginner hits, and almost nothing
   teaches it. Someone learns the alphabet, recognises ب on its own, opens a
   Quran, sees بِسْمِ, and cannot find the ب anywhere in it. They conclude they
   have forgotten the alphabet. They have not: the ب simply changed shape when
   it joined, and nobody told them that happens.

   So the word comes apart and goes back together, slowly, with each letter
   named as it lands. Seeing ب become بـ is the entire lesson, and it takes
   about four seconds.

   HOW THE SHAPING IS DONE

   Not with a table of glyphs. The browser already knows how to shape Arabic,
   so each letter is wrapped in zero-width joiners that tell the font which
   form to draw: a joiner on the right asks for a form that connects
   rightwards, one on each side asks for a medial. That means the forms are
   produced by the same engine that renders the real word, so the separated
   letters and the joined word can never disagree.

   Six letters -- ا د ذ ر ز و and their relatives -- join to the letter before
   them but never to the letter after. That is why الله has a visible gap in
   it, and it is the second thing a beginner needs to know. */

const ZWJ = "‍";

/* The letters that refuse to join to what follows them. */
const NON_CONNECTING = new Set([..."اأإآدذرزوؤةىءٱ"]);

type Word = {
  /** The word as it is actually written. */
  full: string;
  te: string;
  en: string;
  translit: string;
};

/* Words chosen because a beginner already says them, not because they are
   easy. Recognising a word you have recited all your life is what makes the
   lesson land. */
const WORDS: Word[] = [
  { full: "بِسْمِ", te: "బిస్మి — పేరుతో", en: "Bismi — in the name of", translit: "bismi" },
  { full: "الْحَمْدُ", te: "అల్-హమ్దు — స్తోత్రం", en: "Al-hamdu — all praise", translit: "al-ḥamdu" },
  { full: "رَبِّ", te: "రబ్బి — ప్రభువు", en: "Rabbi — Lord", translit: "rabbi" },
  { full: "قُلْ", te: "ఖుల్ — చెప్పు", en: "Qul — say", translit: "qul" },
  { full: "مَالِكِ", te: "మాలికి — యజమాని", en: "Maliki — master", translit: "māliki" },
];

/* Marks sit on a letter rather than beside it, so they travel with the letter
   they belong to instead of being pulled out as separate pieces. */
const isMark = (ch: string) => /[ً-ٰٟۖ-ۭ]/.test(ch);

type Piece = { base: string; marks: string; connectsBack: boolean; connectsOn: boolean };

/** Split a word into letters, each carrying its own marks. */
function split(word: string): Piece[] {
  const pieces: Piece[] = [];
  for (const ch of word) {
    if (isMark(ch) && pieces.length) {
      pieces[pieces.length - 1].marks += ch;
    } else if (!isMark(ch)) {
      pieces.push({ base: ch, marks: "", connectsBack: false, connectsOn: false });
    }
  }
  return pieces.map((p, i) => ({
    ...p,
    /* Joins to the letter before it, if that letter is willing. */
    connectsBack: i > 0 && !NON_CONNECTING.has(pieces[i - 1].base),
    /* Joins to the letter after it, if this letter is willing. */
    connectsOn: i < pieces.length - 1 && !NON_CONNECTING.has(p.base),
  }));
}

/** The letter, wrapped so the font draws the right form for its position. */
function form(p: Piece, joined: boolean): string {
  const body = p.base + p.marks;
  if (!joined) return body;
  return (p.connectsBack ? ZWJ : "") + body + (p.connectsOn ? ZWJ : "");
}

const nameOf = (ch: string) => arabicLetters.find((l) => l.glyph === ch || l.forms.isolated === ch);

const copy = {
  title: { te: "అక్షరాలు ఎలా కలుస్తాయి", en: "How letters join" },
  lead: {
    te: "ఒక్కొక్క అక్షరం విడిగా ఒక ఆకారం, కలిసినప్పుడు వేరే ఆకారం. అందుకే بـ ను بِسْمِ లో వెతికితే దొరకదు.",
    en: "A letter has one shape alone and another when it joins. That is why the ب in بِسْمِ looks nothing like the ب you learned.",
  },
  separate: { te: "విడిగా", en: "Separated" },
  joined: { te: "కలిసి", en: "Joined" },
  play: { te: "చూపించు", en: "Play" },
  pause: { te: "ఆపు", en: "Pause" },
  again: { te: "మళ్ళీ", en: "Again" },
  word: { te: "పదం", en: "Word" },
  noJoin: {
    te: "ఈ అక్షరం తర్వాతి అక్షరంతో కలవదు — అందుకే ఇక్కడ ఖాళీ కనిపిస్తుంది.",
    en: "This letter never joins to the next one — that is why there is a gap here.",
  },
  state: { te: "స్థితి", en: "State" },
};

export function LetterJoin() {
  const { lang } = useI18n();
  const [wordIndex, setWordIndex] = useState(0);
  const [joined, setJoined] = useState(false);
  const [playing, setPlaying] = useState(true);
  const reduced = usePrefersReducedMotion();
  const [focus, setFocus] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  const word = WORDS[wordIndex];
  const shown = joined || reduced;
  const pieces = split(word.full);

  /* Apart, together, apart. Slow enough to watch a shape change, which is the
     one thing the viewer is here for. */
  useEffect(() => {
    /* Reduced motion gets the answer without the journey: the word stays
       joined and nothing cycles. Derived rather than assigned, so there is no
       first frame showing the wrong state. */
    if (!playing || reduced) return;
    timer.current = window.setInterval(() => setJoined((j) => !j), 2600);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, reduced]);

  const reset = useCallback(() => {
    setJoined(false);
    setFocus(null);
  }, []);

  return (
    <div className="rounded-2xl border border-[var(--if-gold)]/25 bg-white p-5 sm:p-8">
      <h2 className="font-display text-xl font-bold text-[var(--if-green)] sm:text-2xl">
        {copy.title[lang]}
      </h2>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[var(--if-text-mid)]" style={{ textWrap: "pretty" }}>
        {copy.lead[lang]}
      </p>

      {/* The word itself. */}
      <div className="my-8 flex min-h-[9rem] items-center justify-center rounded-xl bg-[var(--if-cream)] px-4 py-6">
        <p
          className="font-arabic flex flex-row-reverse items-center text-5xl text-[var(--if-green)] sm:text-6xl"
          lang="ar"
          dir="rtl"
          style={{
            /* The gap closing IS the animation: the letters walk together and
               change shape as they arrive. */
            gap: shown ? "0px" : "0.55em",
            transition: "gap 900ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-label={`${word.translit} — ${shown ? copy.joined[lang] : copy.separate[lang]}`}
        >
          {pieces.map((p, i) => (
            <span
              key={i}
              onMouseEnter={() => setFocus(i)}
              onMouseLeave={() => setFocus(null)}
              className="transition-colors duration-300"
              style={{
                color: focus === i ? "var(--if-gold-ink)" : undefined,
                /* A letter that will not join to the next keeps a sliver of
                   space even when joined, because that gap is real. */
                marginInlineStart: shown && !p.connectsOn && i < pieces.length - 1 ? "0.12em" : undefined,
              }}
            >
              {form(p, shown)}
            </span>
          ))}
        </p>
      </div>

      {/* One row per letter: what it is called, and what it turned into. */}
      <ul className="mb-6 flex flex-row-reverse flex-wrap justify-center gap-2" dir="rtl">
        {pieces.map((p, i) => {
          const meta = nameOf(p.base);
          return (
            <li key={i}>
              <button
                type="button"
                onMouseEnter={() => setFocus(i)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(null)}
                className={`flex min-h-11 flex-col items-center rounded-lg border px-3 py-1.5 transition-colors ${
                  focus === i
                    ? "border-[var(--if-gold)] bg-[color-mix(in_srgb,var(--if-gold)_10%,white)]"
                    : "border-[var(--if-gold)]/20 hover:border-[var(--if-gold)]/50"
                }`}
              >
                <span className="font-arabic text-2xl text-[var(--if-green)]" lang="ar">
                  {form(p, shown)}
                </span>
                <span className="mt-0.5 text-[11px] text-[var(--if-text-muted)]" dir="ltr">
                  {meta ? (lang === "te" ? meta.name.te : meta.name.en) : p.base}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {focus !== null && !pieces[focus].connectsOn && focus < pieces.length - 1 && (
        <p className="mb-4 rounded-lg bg-[var(--if-green)]/8 px-3 py-2 text-center text-xs text-[var(--if-green)]">
          {copy.noJoin[lang]}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? copy.pause[lang] : copy.play[lang]}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--if-green)] px-4 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:bg-[var(--if-green-mid)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
            {playing ? copy.pause[lang] : copy.play[lang]}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label={copy.again[lang]}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--if-gold)]/30 text-[var(--if-text-mid)] transition-colors hover:border-[var(--if-gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold text-[var(--if-text-muted)]" aria-live="polite">
            {shown ? copy.joined[lang] : copy.separate[lang]}
          </span>
        </div>

        <div className="if-tabstrip flex gap-1.5 overflow-x-auto">
          {WORDS.map((w, i) => (
            <button
              key={w.full}
              type="button"
              onClick={() => {
                setWordIndex(i);
                reset();
              }}
              aria-pressed={i === wordIndex}
              className={`font-arabic min-h-11 shrink-0 rounded-lg px-3 text-lg transition-colors ${
                i === wordIndex
                  ? "bg-[var(--if-green)] text-[var(--if-gold-light)]"
                  : "text-[var(--if-text-mid)] hover:bg-[var(--if-cream)]"
              }`}
              lang="ar"
            >
              {w.full}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-[var(--if-text-muted)]">
        {lang === "te" ? word.te : word.en}
      </p>
    </div>
  );
}
