import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Islamic Front",
    description:
      "Community welfare, Islamic learning and student guidance for Mangalagiri.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#0d3b1e",
    lang: "te",
    dir: "ltr",
    categories: ["education", "lifestyle"],
    icons: [
      { src: "/assets/logo-emblem.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
