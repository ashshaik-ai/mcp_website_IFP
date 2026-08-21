import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import KnowledgeCenterPage from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center" />
      <KnowledgeCenterPage />
    </>
  );
}
