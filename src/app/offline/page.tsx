import type { Metadata } from "next";
import OfflineClient from "./client";

export const metadata: Metadata = {
  title: "Offline | ఆఫ్‌లైన్ — Islamic Front Mangalagiri",
  description: "You are offline. Pages you have already visited are still available.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OfflineClient />;
}
