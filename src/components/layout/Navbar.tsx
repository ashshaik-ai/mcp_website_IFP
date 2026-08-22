"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";
import { useI18n } from "@/lib/i18n/context";
import { Menu } from "lucide-react";
import { homeSections, sectionHref } from "@/lib/nav";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import { SiteSearch } from "@/components/search/SiteSearch";

/* Stable identity: the hook keys an effect on this array, so rebuilding it
   every render would re-create the observer on every render. */
const SECTION_IDS = homeSections.map((s) => s.fragment.slice(1));

export function Navbar() {
  const { t, toggle, lang } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /* Only the homepage has these sections in the document; anywhere else the
     links point back at "/" and nothing should be marked current. */
  const spied = useScrollSpy(SECTION_IDS);
  const activeIndex = pathname === "/" ? spied : -1;
  const desktopNavItems: NavItem[] = homeSections.map(({ key, fragment }) => ({
    label: t(key),
    href: sectionHref(fragment, pathname),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--if-gold)]/20 bg-[var(--if-green)] text-[var(--if-gold-pale)]">
      {/* Three grid tracks with the outer two sharing the slack, so the nav
          sits on the page's centre line. It was a justify-between flex row,
          which centred it in the gap between a narrow brand and a wide action
          group — about 150px left of the page's own centre. */}
      {/* The three-track grid only at lg, where the centre nav exists. Below
          that it squeezed the brand into a column the width of the action
          group, wrapping "Islamic Front" onto two lines and clipping the
          tagline at 390px. */}
      <div className="relative mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 min-h-11 leading-tight group">
          <span className="if-mark" aria-hidden="true" />
          {/* Under 360px only the seal fits beside the three controls; the
              name is in the hero and the footer on every page. */}
          <span className="hidden min-[360px]:flex flex-col justify-center whitespace-nowrap">
            <span className="font-display text-[var(--if-gold-light)] font-bold text-lg tracking-tight leading-tight">
              Islamic Front
            </span>
            <span className="text-[10px] text-[var(--if-gold-light)] tracking-widest uppercase">
              Mangalagiri · Est. 2011
            </span>
          </span>
        </Link>

        {/* Desktop nav, pinned to the page's centre line regardless of how
            wide the brand and the action group happen to be. A 1fr/auto/1fr
            grid still sat 7.7px left, because the action group overran its
            share and pushed the middle track. */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <SpotlightNavbar
            className="pt-0"
            items={desktopNavItems}
            activeIndex={activeIndex}
            onItemClick={(item) => {
              window.location.assign(item.href);
            }}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/knowledge-center"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 min-h-11 text-xs font-semibold whitespace-nowrap shrink-0 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors"
          >
            {t("nav_kc")}
          </Link>
          <Link
            href="/student-guidance"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 min-h-11 text-xs font-semibold whitespace-nowrap shrink-0 rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors"
          >
            {t("nav_sg")}
          </Link>
          <SiteSearch />

          {/* The accessible name has to start with the visible label, or voice
              control users saying what they can see ("English") match nothing. */}
          <button
            type="button"
            onClick={toggle}
            aria-label={`${t("lang_toggle")} — ${lang === "te" ? "భాష మార్చండి" : "switch language"}`}
            className="min-h-11 px-4 text-xs font-semibold rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--if-gold)]"
          >
            {t("lang_toggle")}
          </button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label={t("nav_menu")}
                  title={t("nav_menu")}
                  className="lg:hidden inline-flex items-center justify-center size-11 rounded-md text-[var(--if-gold-light)] hover:bg-white/10 transition-colors"
                />
              }
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[var(--if-green)] border-[var(--if-gold)]/20 w-72"
              aria-label={t("nav_menu")}
              closeLabel={t("nav_close")}
            >
              <div className="flex flex-col gap-1 mt-8">
                {homeSections.map(({ key, fragment }) => (
                  <Link
                    key={key}
                    href={sectionHref(fragment, pathname)}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-[var(--if-gold-pale)]/80 hover:text-[var(--if-gold-light)] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {t(key)}
                  </Link>
                ))}
                <div className="border-t border-[var(--if-gold)]/20 my-2" />
                <Link href="/knowledge-center" onClick={() => setOpen(false)} className="px-4 py-3 text-[var(--if-gold-light)] font-semibold">
                  {t("nav_kc")}
                </Link>
                <Link href="/student-guidance" onClick={() => setOpen(false)} className="px-4 py-3 text-[var(--if-gold-light)] font-semibold">
                  {t("nav_sg")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
