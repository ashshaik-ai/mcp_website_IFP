import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import Seerah from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/seerah");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/seerah" />
      <Seerah />
    </>
  );
}
