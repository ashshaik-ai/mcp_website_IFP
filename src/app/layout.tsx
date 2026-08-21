import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Noto_Sans_Telugu } from "next/font/google";
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
      className={`${dmSans.variable} ${playfair.variable} ${notoTelugu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
