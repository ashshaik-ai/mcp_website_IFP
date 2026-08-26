import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, BookOpen, ShieldCheck, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { hadithCollections, TOTAL_HADITH } from "@/content/hadith-index";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HadithIndexJsonLd } from "@/components/JsonLd";

/* The nine collections.

   Ordered with the two forties first, because they are where someone should
   start and the six canonical books are not: Nawawi's forty is the collection
   a student is traditionally handed first, and forty-two narrations can be
   finished. Bukhari's 7,580 cannot, and putting it at the top of the page
   tells a beginner to start somewhere they will not get through. */

export const metadata: Metadata = {
  title: `హదీసు సంకలనాలు | Hadith collections — ${SITE_NAME}`,
  description:
    "తొమ్మిది హదీసు సంకలనాలు, 36,000కి పైగా ఉల్లేఖనలు — అరబిక్ మరియు ఇంగ్లీష్‌లో, ప్రతిదానికీ దాని శ్రేణి. Nine collections with grades shown.",
  alternates: { canonical: `${SITE_URL}/knowledge-center/hadith/collections` },
  openGraph: {
    title: "హదీసు సంకలనాలు | Hadith collections",
    description: "Nine collections, over 36,000 narrations, every grade shown.",
    url: `${SITE_URL}/knowledge-center/hadith/collections`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function Page() {
  const beginner = hadithCollections.filter((c) => c.beginner);
  const full = hadithCollections.filter((c) => !c.beginner);

  return (
    <PageShell>
      <HadithIndexJsonLd count={hadithCollections.length} total={TOTAL_HADITH} />
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-16 text-[var(--if-gold-pale)]">
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/knowledge-center/hadith"
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            హదీస్ పోర్టల్
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">హదీసు సంకలనాలు</h1>
          <p className="mt-3 max-w-[62ch] leading-relaxed text-[var(--if-gold-pale)]/85" style={{ textWrap: "pretty" }}>
            తొమ్మిది సంకలనాలు, {TOTAL_HADITH.toLocaleString()} ఉల్లేఖనలు. ప్రతి ఉల్లేఖనతో పాటు దాని శ్రేణి
            (సహీహ్, హసన్, దయీఫ్) చూపబడుతుంది — ఎందుకంటే అన్నీ ఒకే స్థాయివి కావు.
          </p>
        </div>
      </section>

      <section className="bg-[var(--if-cream-light)] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-xl font-bold text-[var(--if-green)]">ఇక్కడ మొదలుపెట్టండి</h2>
          <p className="mt-1 text-sm text-[var(--if-text-muted)]">
            చిన్నవి, పూర్తి చేయగలిగేవి — సాంప్రదాయకంగా విద్యార్థికి మొదట ఇచ్చేవి ఇవే.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {beginner.map((c) => (
              <li key={c.id}>
                <CollectionCard c={c} />
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl font-bold text-[var(--if-green)]">పూర్తి సంకలనాలు</h2>
          <p className="mt-1 text-sm text-[var(--if-text-muted)]">
            కుతుబ్ అస్-సిత్తా — ఆరు ప్రామాణిక గ్రంథాలు — మరియు ముఅత్తా.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {full.map((c) => (
              <li key={c.id}>
                <CollectionCard c={c} />
              </li>
            ))}
          </ul>

          <p className="mt-10 border-t border-[var(--if-gold)]/20 pt-6 text-xs leading-relaxed text-[var(--if-text-muted)]">
            ఉల్లేఖనలు అరబిక్ మరియు ఇంగ్లీష్‌లో ఉన్నాయి. తెలుగు అనువాదం ఇంకా అందుబాటులో లేదు — యంత్ర అనువాదం
            వాడలేదు, ఎందుకంటే ప్రవక్త ﷺ మాటలను తప్పుగా అనువదించడం తేలికైన విషయం కాదు.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function CollectionCard({ c }: { c: (typeof hadithCollections)[number] }) {
  const weak = c.books.reduce((n, b) => n + b.ungraded, 0);
  return (
    <Link
      href={`/knowledge-center/hadith/collections/${c.id}`}
      className="group flex h-full flex-col rounded-xl border border-[var(--if-gold)]/25 bg-white p-4 transition-colors hover:border-[var(--if-gold)]/70 hover:bg-[color-mix(in_srgb,var(--if-gold)_5%,white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
    >
      <span className="flex items-baseline justify-between gap-2">
        <span className="font-display font-bold text-[var(--if-green)]">{c.te}</span>
        <span className="font-arabic shrink-0 text-lg text-[var(--if-gold-ink)]" lang="ar" dir="rtl">
          {c.arabic}
        </span>
      </span>
      <span className="mt-0.5 text-sm text-[var(--if-text-muted)]">{c.en}</span>
      <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--if-text-muted)]">
        <span className="inline-flex items-center gap-1 tabular-nums">
          <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
          {c.count.toLocaleString()} ఉల్లేఖనలు
        </span>
        <span className="tabular-nums">{c.books.length} అధ్యాయాలు</span>
        {c.sahihThroughout ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--if-green)]/10 px-2 py-0.5 font-semibold text-[var(--if-green)]">
            <ShieldCheck aria-hidden="true" className="h-3 w-3" />
            సహీహ్
          </span>
        ) : (
          weak > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--if-gold)]/15 px-2 py-0.5 font-semibold text-[var(--if-gold-ink)]">
              <AlertTriangle aria-hidden="true" className="h-3 w-3" />
              శ్రేణులు వేరువేరు
            </span>
          )
        )}
      </span>
    </Link>
  );
}
