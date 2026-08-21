"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";
import { useI18n } from "@/lib/i18n/context";
import { Menu } from "lucide-react";

const navLinks = [
  { key: "nav_victory",      href: "#victory" },
  { key: "nav_achievements", href: "#achievements" },
  { key: "nav_manifesto",    href: "#manifesto" },
  { key: "nav_schemes",      href: "#schemes" },
  { key: "nav_about",        href: "#about" },
  { key: "nav_contact",      href: "#contact" },
] as const;

export function Navbar() {
  const { t, toggle } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const desktopNavItems: NavItem[] = navLinks.map(({ key, href }) => ({
    label: t(key),
    href: isHome ? href : `/${href}`,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--if-gold)]/20 bg-[var(--if-green)] text-[var(--if-gold-pale)]">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-[var(--if-gold-light)] font-bold text-lg tracking-tight">
            Islamic Front
          </span>
          <span className="text-[10px] text-[var(--if-gold)]/80 tracking-widest uppercase">
            Mangalagiri · Est. 2011
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:block">
          <SpotlightNavbar
            className="pt-0"
            items={desktopNavItems}
            onItemClick={(item) => {
              window.location.assign(item.href);
            }}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/knowledge-center"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors"
          >
            {t("nav_kc")}
          </Link>
          <Link
            href="/student-guidance"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors"
          >
            {t("nav_sg")}
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--if-gold)]/40 text-[var(--if-gold-light)] hover:bg-[var(--if-gold)]/10 transition-colors"
          >
            {t("lang_toggle")}
          </button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  title="Open menu"
                  className="lg:hidden p-2 rounded-md text-[var(--if-gold-light)] hover:bg-white/10 transition-colors"
                />
              }
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--if-green)] border-[var(--if-gold)]/20 w-72">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={isHome ? href : `/${href}`}
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
