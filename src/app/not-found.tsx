import type { Metadata } from "next";
import { NotFoundClient } from "@/components/NotFoundClient";

/* Without this file Next serves its own error markup: a bare white page with
   "404 — This page could not be found." in English, no header, no footer, and
   no link back into the site except the floating WhatsApp button. On a
   Telugu-first site that is a dead end for anyone who mistypes a URL or
   follows a stale link from the old static site. */
export const metadata: Metadata = {
  title: "పేజీ దొరకలేదు · Page not found | Islamic Front Mangalagiri",
  description: "The page you were looking for is not here. Find your way back to the homepage, the Knowledge Center, or Student Guidance.",
  alternates: { canonical: "/404" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
