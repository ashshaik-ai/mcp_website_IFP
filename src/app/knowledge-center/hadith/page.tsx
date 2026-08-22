import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import Hadith from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/hadith");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/hadith" />
      <Hadith />
    </>
  );
}
