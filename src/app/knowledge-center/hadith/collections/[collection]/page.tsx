import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { hadithCollections } from "@/content/hadith-index";
import { collectionById } from "@/lib/hadith";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HadithCollectionJsonLd } from "@/components/JsonLd";

type Params = { collection: string };

export function generateStaticParams(): Params[] {
  return hadithCollections.map((c) => ({ collection: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { collection } = await params;
  const c = collectionById.get(collection);
  if (!c) return {};
  const url = `${SITE_URL}/knowledge-center/hadith/collections/${c.id}`;
  return {
    title: `${c.te} | ${c.en} — ${SITE_NAME}`.slice(0, 60),
    description: `${c.en} — ${c.count.toLocaleString()} narrations across ${c.books.length} books, in Arabic and English with grades shown.`.slice(0, 155),
    alternates: { canonical: url },
    openGraph: { title: `${c.te} — ${c.en}`, url, siteName: SITE_NAME, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { collection } = await params;
  const c = collectionById.get(collection);
  if (!c) notFound();

  return (
    <PageShell>
      <HadithCollectionJsonLd id={c.id} te={c.te} en={c.en} arabic={c.arabic} count={c.count} />
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--if-green-mid)] to-[var(--if-green)] px-4 py-12 text-[var(--if-gold-pale)]">
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/knowledge-center/hadith/collections"
            className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--if-gold-light)] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            సంకలనాలు
          </Link>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{c.te}</h1>
            <p className="font-arabic text-2xl text-[var(--if-gold-light)] sm:text-3xl" lang="ar" dir="rtl">
              {c.arabic}
            </p>
          </div>
          <p className="mt-2 text-sm text-[var(--if-gold-pale)]/80">
            {c.en} · <span className="tabular-nums">{c.count.toLocaleString()}</span> ఉల్లేఖనలు ·{" "}
            <span className="tabular-nums">{c.books.length}</span> అధ్యాయాలు
          </p>
        </div>
      </section>

      <section className="bg-[var(--if-cream-light)] px-4 py-10">
        <ul className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-2">
          {c.books.map((b) => (
            <li key={b.n}>
              <Link
                href={`/knowledge-center/hadith/collections/${c.id}/${b.n}`}
                className="group flex min-h-11 items-center gap-3 rounded-lg border border-[var(--if-gold)]/20 bg-white p-3 transition-colors hover:border-[var(--if-gold)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--if-cream)] text-xs font-bold tabular-nums text-[var(--if-gold-ink)]">
                  {b.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[var(--if-green)]">{b.name}</span>
                  <span className="block text-xs tabular-nums text-[var(--if-text-muted)]">
                    {b.count} ఉల్లేఖనలు
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[var(--if-text-muted)] transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
