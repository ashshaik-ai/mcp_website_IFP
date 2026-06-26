import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Noto_Sans_Telugu } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
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

export const metadata: Metadata = {
  title: "Islamic Front Mangalagiri | ఇస్లామిక్ ఫ్రంట్",
  description:
    "Islamic Front Mangalagiri — serving the Muslim community of Mangalagiri since 2011. Community welfare, education, and civic participation.",
  keywords: "Islamic Front, Mangalagiri, Muslim community, Anjuman, welfare, Andhra Pradesh",
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
