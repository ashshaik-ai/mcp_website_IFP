import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { QURAN_SOURCES, surahIndex } from "@/content/quran-index";
import { QuranIndexJsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SurahList } from "./client";

export const metadata: Metadata = {
  title: `ఖురాన్ చదవండి | Read the Quran — ${SITE_NAME}`,
  description:
    "మొత్తం 114 సూరాలు, 6,236 ఆయతులు — అరబిక్ (ఇండో-పాక్ లిపి), తెలుగు అర్థం మరియు ఉచ్చారణతో. All 114 surahs with Telugu meaning.",
  alternates: { canonical: `${SITE_URL}/knowledge-center/learn-quran/read` },
  openGraph: {
    title: "ఖురాన్ చదవండి | Read the Quran",
    description: "All 114 surahs and 6,236 ayahs, with Telugu meaning and pronunciation.",
    url: `${SITE_URL}/knowledge-center/learn-quran/read`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function Page() {
  return (
    <PageShell>
      <QuranIndexJsonLd count={surahIndex.length} />
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-16 text-[var(--if-gold-pale)]">
        <div className="relative mx-auto max-w-5xl">
          <Link
            href="/knowledge-center/learn-quran"
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            ఖురాన్ నేర్చుకోండి
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">ఖురాన్ చదవండి</h1>
          <p className="mt-3 max-w-[60ch] text-[var(--if-gold-pale)]/85" style={{ textWrap: "pretty" }}>
            మొత్తం 114 సూరాలు, 6,236 ఆయతులు — అరబిక్, తెలుగు అర్థం మరియు ఉచ్చారణతో.
          </p>
        </div>
      </section>

      <section className="bg-[var(--if-cream-light)] px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <SurahList />

          {/* The licence requires attribution, and it belongs where the text
              is, not buried in a colophon. */}
          <p className="mt-10 border-t border-[var(--if-gold)]/20 pt-6 text-xs leading-relaxed text-[var(--if-text-muted)]">
            అరబిక్ మూలం: {QURAN_SOURCES.arabic} · తెలుగు అనువాదం: {QURAN_SOURCES.telugu} · English: {QURAN_SOURCES.english}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
