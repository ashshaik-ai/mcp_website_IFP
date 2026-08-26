import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { DotFamilies } from "@/components/learning/DotFamilies";
import { LetterJoin } from "@/components/learning/LetterJoin";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { QaidaJsonLd } from "@/components/JsonLd";

/* The two things that stop an adult beginner, on one page.

   The order is the Qaida's order and it is not arbitrary. The dots come first
   because they turn 28 shapes into nine, which makes the alphabet learnable
   at all. Joining comes second because it is what defeats someone who has
   already learned the alphabet and cannot find those letters in a word.

   Neither of these is taught in Telugu anywhere I could find. */

export const metadata: Metadata = {
  title: `ఖురాన్ చదవడం నేర్చుకోండి | Learn to read — ${SITE_NAME}`,
  description:
    "అరబిక్ అక్షరాలు: చుక్కలే తేడా, అక్షరాలు ఎలా కలుస్తాయి. తెలుగులో, యానిమేషన్‌తో. Arabic letters for absolute beginners, in Telugu.",
  alternates: { canonical: `${SITE_URL}/knowledge-center/learn-quran/qaida` },
  openGraph: {
    title: "ఖురాన్ చదవడం నేర్చుకోండి | Learn to read the Quran",
    description: "The dots, and how letters join — the two things that stop a beginner. In Telugu.",
    url: `${SITE_URL}/knowledge-center/learn-quran/qaida`,
    siteName: SITE_NAME,
    type: "article",
  },
};

export default function Page() {
  return (
    <PageShell>
      <QaidaJsonLd />

      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-16 text-[var(--if-gold-pale)]">
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/knowledge-center/learn-quran"
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            ఖురాన్ నేర్చుకోండి
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">ఖురాన్ చదవడం నేర్చుకోండి</h1>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-[var(--if-gold-pale)]/85" style={{ textWrap: "pretty" }}>
            అక్షరాలు తెలిసినా ఖురాన్ తెరిస్తే చదవలేకపోతున్నారా? రెండు కారణాలు ఉంటాయి — చుక్కలు, మరియు అక్షరాలు కలిసే
            విధానం. రెండూ ఇక్కడ చూడండి.
          </p>
        </div>
      </section>

      <section className="bg-[var(--if-cream-light)] px-4 py-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <DotFamilies />
          <LetterJoin />

          <Link
            href="/knowledge-center/learn-quran/read/1"
            className="group flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-[var(--if-gold)]/30 bg-white p-5 transition-colors hover:border-[var(--if-gold)] hover:bg-[color-mix(in_srgb,var(--if-gold)_6%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <span>
              <span className="block font-display font-bold text-[var(--if-green)]">
                ఇప్పుడు సూరా అల్-ఫాతిహా చదవండి
              </span>
              <span className="mt-0.5 block text-sm text-[var(--if-text-muted)]">
                7 ఆయతులు — మీరు ప్రతి నమాజ్‌లో చదివేది
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-[var(--if-gold-ink)] transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
