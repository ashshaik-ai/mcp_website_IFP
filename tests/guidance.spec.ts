import { test, expect } from "@playwright/test";
import { guidanceCards } from "../src/content/student-guidance";

/* `stream` is a space-separated list for any pathway open to more than one
   stream. The filter compared it with === , so all four multi-stream cards
   were hidden from every filter — CUET-UG is open to all four streams and
   showed under none of them. */
test.describe("stream filter covers multi-stream cards", () => {
  const STREAMS = ["mpc", "bipc", "commerce", "arts"];
  const match = (cardStream: string, stream: string) => cardStream.split(" ").includes(stream);

  /* An empty stream means "not stream-specific" (Polytechnic after 10th, for
     instance) and belongs under All only. Anything that names a stream must
     show up under it. */
  test("every card that names a stream is reachable from that filter", () => {
    for (const c of guidanceCards.filter((c) => c.stream !== "")) {
      const reachable = STREAMS.some((s) => match(c.stream, s));
      expect(reachable, `"${c.title.en}" (stream="${c.stream}") is only reachable via All`).toBe(true);
    }
  });

  test("a card listing several streams appears under each of them", () => {
    const multi = guidanceCards.filter((c) => c.stream.includes(" "));
    expect(multi.length, "no multi-stream cards found — has the data shape changed?").toBeGreaterThan(0);
    for (const c of multi) {
      for (const s of c.stream.split(" ")) {
        expect(match(c.stream, s), `"${c.title.en}" missing from ${s}`).toBe(true);
      }
    }
  });
});
