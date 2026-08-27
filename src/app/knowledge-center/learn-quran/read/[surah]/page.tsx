import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, BookOpen } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { surahIndex, QURAN_SOURCES } from "@/content/quran-index";
import { SurahJsonLd } from "@/components/JsonLd";
import { loadSurah, BISMILLAH, hasBismillah, firstGlobalAyah } from "@/lib/quran";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Reader } from "./client";

type Params = { surah: string };

/* All 114 are known, so every surah prerenders. The ayahs go into the HTML
   rather than being fetched: see the note in lib/quran.ts. */
export function generateStaticParams(): Params[] {
  return surahIndex.map((s) => ({ surah: String(s.n) }));
}

export const dynamicParams = false;

function resolve(param: string) {
  const n = Number(param);
  if (!Number.isInteger(n) || n < 1 || n > 114) return null;
  return surahIndex[n - 1] ?? null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { surah } = await params;
  const meta = resolve(surah);
  if (!meta) return {};

  /* Telugu leads and the whole thing stays inside 60 characters, the same
     rule the rest of the site's titles follow. */
  const title = `${meta.te} — ${meta.en} | ${SITE_NAME}`;
  const description = `సూరా ${meta.te} (${meta.en}) — ${meta.ayahs} ఆయతులు, తెలుగు అర్థంతో. Surah ${meta.en}, "${meta.meaning}", with Telugu meaning and pronunciation.`;
  const url = `${SITE_URL}/knowledge-center/learn-quran/read/${meta.n}`;

  return {
    title: title.length <= 60 ? title : `${meta.te} — ${meta.en}`,
    description: description.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.te} — ${meta.en}`,
      description: `${meta.ayahs} ayahs, with Telugu meaning and pronunciation.`,
      url,
      siteName: SITE_NAME,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { surah } = await params;
  const meta = resolve(surah);
  if (!meta) notFound();

  const { ayahs } = loadSurah(meta.n);
  const prev = meta.n > 1 ? surahIndex[meta.n - 2] : null;
  const next = meta.n < 114 ? surahIndex[meta.n] : null;

  return (
    <PageShell>
      <SurahJsonLd n={meta.n} te={meta.te} en={meta.en} ar={meta.ar} meaning={meta.meaning} ayahs={meta.ayahs} />
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-12 text-[var(--if-gold-pale)]">
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/knowledge-center/learn-quran/read"
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            114 సూరాలు
          </Link>

          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {meta.te}
              <span className="ml-2 text-lg font-semibold text-[var(--if-gold-pale)]/70">{meta.en}</span>
            </h1>
            <p className="font-arabic text-3xl text-[var(--if-gold-light)] sm:text-4xl" lang="ar" dir="rtl">
              {meta.ar}
            </p>
          </div>

          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--if-gold-pale)]/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {meta.revealed === "makkah" ? "మక్కాలో అవతరించింది" : "మదీనాలో అవతరించింది"}
            </span>
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
              {meta.ayahs} ఆయతులు
            </span>
            <span className="tabular-nums">జుజ్ {meta.juz}</span>
            <span className="italic">{meta.meaning}</span>
          </p>
        </div>
      </section>

      <section className="bg-[var(--if-cream-light)] py-10">
        <Reader
          meta={meta}
          ayahs={ayahs}
          bismillah={hasBismillah(meta.n) ? BISMILLAH : null}
          prev={prev}
          next={next}
          firstGlobal={firstGlobalAyah(meta.n)}
        />

        <p className="mx-auto mt-10 max-w-3xl border-t border-[var(--if-gold)]/20 px-4 pt-6 text-xs leading-relaxed text-[var(--if-text-muted)]">
          అరబిక్ మూలం: {QURAN_SOURCES.arabic} · తెలుగు అనువాదం: {QURAN_SOURCES.telugu} · English: {QURAN_SOURCES.english}
        </p>
      </section>
    </PageShell>
  );
}
