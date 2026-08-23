import type { Metadata } from "next";
import OfflineClient from "./client";

export const metadata: Metadata = {
  title: "Offline | ఆఫ్‌లైన్ — Islamic Front Mangalagiri",
  description: "You are offline. Pages you have already visited are still available.",
  /* It is a real, addressable page the service worker serves by name, so it
     gets a canonical like every other route — noindex is what keeps it out of
     search, not the absence of one. */
  alternates: { canonical: "/offline" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OfflineClient />;
}
