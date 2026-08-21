import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import KidsIslam from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/kids-islam");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/kids-islam" />
      <KidsIslam />
    </>
  );
}
