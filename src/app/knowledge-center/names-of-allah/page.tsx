import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import NamesOfAllah from "./client";

export const metadata: Metadata = pageMetadata("/knowledge-center/names-of-allah");

export default function Page() {
  return (
    <>
      <JsonLd path="/knowledge-center/names-of-allah" />
      <NamesOfAllah />
    </>
  );
}
