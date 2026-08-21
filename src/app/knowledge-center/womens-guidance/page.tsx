import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import WomensGuidance from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/womens-guidance");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/womens-guidance" />
      <WomensGuidance />
    </>
  );
}
