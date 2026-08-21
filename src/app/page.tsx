import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { HomepageClient } from "@/components/home/HomepageClient";

export const metadata: Metadata = pageMetadata("/");

export default function Page() {
  return (
    <>
      <JsonLd path="/" />
      <HomepageClient />
    </>
  );
}
