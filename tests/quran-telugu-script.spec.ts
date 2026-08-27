import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

/* The Quran written in Telugu letters.

   This layer is generated rather than fetched -- no published edition of the
   Quran transliterated into Telugu script exists to download -- so unlike the
   Arabic and the two translations, nothing upstream would catch a mistake in
   it. These are the ayahs whose Telugu spelling is not in doubt: the ones a
   Telugu-speaking Muslim recites from memory. If a rule change breaks one of
   them it has broken the recitation, and that is worth failing a build over.

   The Arabic is the authority for pronunciation and stays on the page beside
   this. What is checked here is that the aid does not mislead. */

type Ayah = { v: number; ar: string; tt: string };

const surah = (n: number): Ayah[] =>
  JSON.parse(readFileSync(`public/quran/${String(n).padStart(3, "0")}.json`, "utf8")).ayahs;

/* Al-Fatihah in full: recited in every unit of every prayer, so every line of
   it is known by heart. */
const FATIHAH = [
  "బిస్మిల్లాహిర్-రహ్మానిర్-రహీమ్",
  "అల్హమ్దు లిల్లాహి రబ్బిల్ ఆలమీన్",
  "అర్-రహ్మానిర్-రహీమ్",
  "మాలికి యౌమిద్-దీన్",
  "ఇయ్యాక నఅబుదు వఇయ్యాక నస్తఈన్",
  "ఇహ్దినస్-సిరాతల్ ముస్తఖీమ్",
  "సిరాతల్-లదీన అన్అమ్త అలైహిమ్ గైరిల్ మగ్దూబి అలైహిమ్ వలద్-దాల్లీన్",
];

test("Al-Fatihah reads correctly in Telugu letters", () => {
  const ayahs = surah(1);
  expect(ayahs).toHaveLength(7);
  expect(ayahs.map((a) => a.tt)).toEqual(FATIHAH);
});

test("the rules that were hardest to get right still hold", () => {
  const at = (s: number, v: number) => surah(s).find((a) => a.v === v)!.tt;

  /* The article. A lam with a jazm is sounded and a bare lam is silent, and
     reading the text rather than the spelling is what makes both work. */
  expect(at(112, 2)).toBe("అల్లాహుస్-సమద్"); /* not అల్ల్లాహు, on three lams */
  expect(at(114, 6)).toContain("వన్నాస్"); /* not వాల్న్నాస్ */
  expect(at(1, 7)).toContain("సిరాతల్-లదీన"); /* not సిరాతద్ దీన */

  /* Idgham across a word boundary, and nothing to assimilate into at the
     head of an ayah. */
  expect(at(112, 4)).toContain("యకుల్-లహూ");
  expect(at(18, 1)).toContain("యజ్అల్-లహూ"); /* not యజ్అల్ల్-లహూ */
  expect(at(88, 14)).toBe("వఅక్వాబుమ్-మౌదూఅహ్"); /* not వ్వఅక్వాబుమ్ */

  /* A carrier restarts the syllable instead of vowelling the letter before. */
  expect(at(1, 7)).toContain("అన్అమ్త"); /* not అనమ్త */

  /* ة is a t only while a vowel follows; stopping on it makes it an h. */
  expect(at(88, 5)).toContain("ఆనియహ్"); /* not ఆనియత్ */

  /* A hamza can be seated on a stretch mark, and reading the stretch as part
     of the letter before it loses that letter outright. */
  expect(at(2, 255)).toContain("యఊదుహూ"); /* not ఊదుహూ */

  /* Alef maksura is spelled with a plain yeh here, and is silent. */
  expect(at(94, 8)).toBe("వఇలా రబ్బిక ఫర్గబ్"); /* not వఇలాయ్ */

  /* The disconnected letters are recited as names, and 50:1 is one letter
     followed by an ordinary sentence. */
  expect(at(2, 1)).toBe("అలిఫ్ లామ్ మీమ్");
  expect(at(19, 1)).toBe("కాఫ్ హా యా ఐన్ సాద్");
  expect(at(50, 1)).toBe("ఖాఫ్ వల్ఖురానిల్ మజీద్");
});

test("every ayah has a Telugu reading, in Telugu letters only", () => {
  let n = 0;
  for (let s = 1; s <= 114; s++) {
    for (const a of surah(s)) {
      n++;
      expect(a.tt, `${s}:${a.v} has no Telugu reading`).toBeTruthy();
      /* Arabic left in the output means a letter fell through the rules. */
      expect(a.tt, `${s}:${a.v} leaked Arabic`).not.toMatch(/[؀-ۿࢠ-ࣿ]/);
      expect(a.tt, `${s}:${a.v} has a stray character`).toMatch(/^[ఀ-౿ \-]+$/);
    }
  }
  expect(n).toBe(6236);
});

test("a reader can turn the Telugu letters on and see them", async ({ page }) => {
  await page.goto("/knowledge-center/learn-quran/read/1", { waitUntil: "domcontentloaded" });

  /* The version is named for what it does, and one tap sets both the text and
     the voice. */
  await page.getByRole("button", { name: /Telugu letters \+ Urdu voice|తెలుగు లిపి \+ ఉర్దూ వాయిస్/ }).click();

  await expect(page.getByText(FATIHAH[0], { exact: false })).toBeVisible();
  /* The translation is not what this version shows. */
  await expect(page.getByText("అనంత కరుణామయుడు", { exact: false })).toHaveCount(0);
  /* And the reader is told which letters share a spelling. */
  await expect(page.getByText(/ث ص س|Telugu has no separate letters/)).toBeVisible();
});
