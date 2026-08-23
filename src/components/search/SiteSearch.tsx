"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { foldSearch } from "@/lib/search-text";

const copy = {
  open: { te: "వెతకండి", en: "Search" },
  placeholder: { te: "పాఠాలు, పదాలు, కెరీర్లు వెతకండి…", en: "Search lessons, words, careers…" },
  close: { te: "మూసివేయండి", en: "Close" },
  empty: { te: "ఏమీ దొరకలేదు.", en: "Nothing found." },
  failed: { te: "శోధన సూచీ లోడ్ కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.", en: "The search index could not be loaded. Please try again." },
  hint: { te: "వెతకడం మొదలుపెట్టండి", en: "Start typing to search" },
  loading: { te: "లోడ్ అవుతోంది…", en: "Loading…" },
  results: { te: "ఫలితాలు", en: "results" },
} as const;

const KIND_LABEL: Record<string, { te: string; en: string }> = {
  page: { te: "పేజీ", en: "Page" },
  lesson: { te: "పాఠం", en: "Lesson" },
  word: { te: "పదం", en: "Word" },
  phrase: { te: "వాక్యం", en: "Phrase" },
  letter: { te: "అక్షరం", en: "Letter" },
  topic: { te: "అంశం", en: "Topic" },
  career: { te: "కెరీర్", en: "Career" },
  tool: { te: "సాధనం", en: "Tool" },
};

type Entry = {
  kind: string;
  url: string;
  title: { te: string; en: string };
  body: { te: string; en: string };
  extra?: string;
};

/* Scored rather than filtered: a title match should beat a body mention, or
   searching "quran" buries the Quran portal under every lesson that says it. */
function score(e: Entry, q: string, lang: "te" | "en"): number {
  const title = foldSearch(e.title[lang] || e.title.en || "");
  const other = foldSearch((lang === "te" ? e.title.en : e.title.te) || "");
  const body = foldSearch(`${e.body.te} ${e.body.en}`);
  const extra = foldSearch(e.extra || "");

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (other.includes(q)) return 45;
  if (extra.includes(q)) return 35;
  if (body.includes(q)) return 20;
  return 0;
}

export function SiteSearch() {
  const { lang } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  /* A failed fetch used to store an empty array, which is truthy, so the
     dialog said "Nothing found" for every query for the rest of the session. */
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Fetched on first open, not on page load — it is 166 KB.
  useEffect(() => {
    if (!open || index) return;
    let live = true;
    fetch("/search-index.json")
      .then((r) => r.json())
      /* A shape we do not recognise means no results, not a thrown render:
         the index is fetched from the network and is not ours to trust. */
      .then((d: Entry[]) => live && setIndex(Array.isArray(d) ? d.filter((e) => e && e.title && e.body && e.url) : []))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [open, index]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const q = foldSearch(query.trim());
    if (!q || !index) return [];
    return index
      .map((e) => ({ e, s: score(e, q, lang) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((r) => r.e);
  }, [query, index, lang]);

  const go = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [router],
  );

  /* The dialog declared aria-modal="true" but did none of what that promises:
     Tab walked straight out into the page behind it on the first press, the
     background stayed scrollable, and closing dropped focus on <body> so the
     next Tab restarted from the top of the document. */
  /* Point at the trigger directly rather than reading document.activeElement
     when the dialog opens: the autofocus effect runs first, so activeElement
     is already the search input by then and closing restored focus to a node
     that no longer exists — which lands on <body>. */
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    /* The scroll container is the root element, not body, so locking body
       alone still let the page move behind the dialog. */
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || !dialogRef.current.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      document.documentElement.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [open]);

  // Ctrl/Cmd+K opens from anywhere, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].url);
    }
  };

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={copy.open[lang]}
        className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full text-[var(--if-gold-light)] hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
      >
        <Search aria-hidden="true" className="h-5 w-5" />
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={copy.open[lang]}
          className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[10vh] bg-black/50"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-xl rounded-2xl bg-[var(--if-cream-light)] border border-[var(--if-gold)]/30 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 border-b border-[var(--if-gold)]/20">
              <Search aria-hidden="true" className="h-4 w-4 text-[var(--if-text-muted)] shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder={copy.placeholder[lang]}
                aria-label={copy.open[lang]}
                /* Arrowing the highlight changed a background colour and
                   nothing else, so a screen reader was never told which result
                   Enter would open. */
                role="combobox"
                aria-expanded={results.length > 0}
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
                /* 16px minimum, or iOS Safari zooms the page on focus. */
                className="flex-1 min-h-14 bg-transparent text-base text-[var(--if-text)] placeholder:text-[var(--if-text-muted)] outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.close[lang]}
                className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full hover:bg-[var(--if-gold)]/10"
              >
                <X aria-hidden="true" className="h-4 w-4 text-[var(--if-text-muted)]" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <p className="px-4 py-8 text-center text-sm text-[var(--if-text-muted)]">
                  {failed ? copy.failed[lang] : index ? copy.hint[lang] : copy.loading[lang]}
                </p>
              ) : results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[var(--if-text-muted)]">
                  {failed ? copy.failed[lang] : index ? copy.empty[lang] : copy.loading[lang]}
                </p>
              ) : (
                <>
                  <p className="px-4 pt-3 text-xs text-[var(--if-text-muted)]" aria-live="polite">
                    {results.length} {copy.results[lang]}
                  </p>
                  {/* listbox/option, to match the combobox on the input. */}
                  <ul id="search-results" role="listbox" aria-label={copy.open[lang]} ref={listRef} className="p-2">
                    {results.map((r, i) => (
                      <li role="none" key={`${r.url}-${r.title.en}-${i}`}>
                        {/* An anchor, not a button: results are destinations, and a
                            button cannot be middle-clicked into a new tab or have
                            its address copied. role="option" keeps the combobox
                            pattern the input announces. A plain click is still a
                            client-side navigation; a modified click is left to the
                            browser. */}
                        <a
                          href={r.url}
                          onMouseEnter={() => setActive(i)}
                          onClick={(e) => {
                            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                            e.preventDefault();
                            go(r.url);
                          }}
                          id={`search-opt-${i}`}
                          role="option"
                          aria-selected={i === active}
                          className={`block w-full text-left rounded-xl px-3 py-2.5 min-h-11 transition-colors ${
                            i === active ? "bg-[var(--if-gold)]/15" : "hover:bg-[var(--if-gold)]/8"
                          }`}
                        >
                          <span className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-semibold text-[var(--if-green)] text-pretty">
                              {r.title[lang] || r.title.en}
                            </span>
                            <span className="text-[10px] uppercase tracking-wide font-bold text-[var(--if-gold-ink)]">
                              {(KIND_LABEL[r.kind] ?? KIND_LABEL.page)[lang]}
                            </span>
                          </span>
                          {(r.body[lang] || r.body.en) && (
                            <span className="mt-0.5 block text-xs text-[var(--if-text-muted)] line-clamp-1">
                              {r.body[lang] || r.body.en}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
