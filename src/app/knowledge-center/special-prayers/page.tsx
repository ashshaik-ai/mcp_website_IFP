import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import SpecialPrayers from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/special-prayers");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/special-prayers" />
      <SpecialPrayers />
    </>
  );
}
