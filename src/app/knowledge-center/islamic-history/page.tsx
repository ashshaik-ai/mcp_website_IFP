import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import IslamicHistory from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/islamic-history");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/islamic-history" />
      <IslamicHistory />
    </>
  );
}
