import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import HajjUmrah from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/hajj-umrah");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/hajj-umrah" />
      <HajjUmrah />
    </>
  );
}
