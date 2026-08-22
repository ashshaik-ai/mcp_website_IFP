import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Noto_Sans_Telugu, Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/* .font-arabic asked for Amiri but nothing loaded it, so Quranic and lesson
   Arabic fell back to a system serif on a site that teaches the script.

   Deliberately not preloaded: these are large faces and most pages show no
   Arabic at all. Preloading them put roughly 350 KB on the critical path of
   every page and pushed LCP past eight seconds. They load lazily and swap in,
   which is the right trade for script that appears part way down a page
   rather than in the hero.

   Weight 400 only — bold Nastaliq is not idiomatic, and bold Amiri was going
   unused while costing as much as the regular. */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

/* metadataBase makes every per-page canonical and og:url resolve absolute.
   Individual titles and descriptions come from the route catalog via
   pageMetadata(); this block only carries what is genuinely site-wide. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Islamic Front Mangalagiri | ఇస్లామిక్ ఫ్రంట్",
    template: "%s",
  },
  description:
    "Islamic Front Mangalagiri — serving the Muslim community of Mangalagiri since 2011. Community welfare, education, and civic participation.",
  keywords: "Islamic Front, Mangalagiri, Muslim community, Anjuman, welfare, Andhra Pradesh",
  applicationName: SITE_NAME,
  formatDetection: { telephone: true, address: false, email: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="te"
      className={`${dmSans.variable} ${playfair.variable} ${notoTelugu.variable} ${amiri.variable} ${nastaliq.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
