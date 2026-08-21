import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import LearnQuran from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/learn-quran");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/learn-quran" />
      <LearnQuran />
    </>
  );
}
