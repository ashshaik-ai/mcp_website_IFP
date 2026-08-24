/* Text folding for every search box on the site.

   Arabic here is fully vowelled — اللَّهُ, not الله — because that is how the
   lessons teach it. Nobody types the harakat, so an Arabic query matched
   nothing anywhere: the site search, the ninety-nine names, and the lesson
   vocabulary lists all failed on الله, الرحيم and الملك.

   Folding both the stored text and the query costs one pass and makes the
   script searchable the way a reader actually writes it. The ranges are the
   Quranic annotation marks and the tatweel, plus the letter substitutions
   people make freely: the three alef forms for a bare alef, alef maqsura for
   ya, and ta marbuta for ha. */
const MARKS = /[ً-ٰٟۖ-ۭـ]/g;

export function foldSearch(text: string): string {
  return (
    text
      .toLowerCase()
      /* Scholarly transliteration got the same treatment the harakat did:
         the vocabulary lists store Ṣabr, Raḥmah and Īmān, readers type sabr,
         rahmah and iman on an ordinary keyboard, and nothing matched — the
         search box's own suggested example query returned no results. NFD
         splits the diacritic off its base letter so one range removes all of
         them; the two ligatures decompose to nothing and are mapped by hand. */
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/æ/g, "ae")
      .replace(/œ/g, "oe")
      .replace(MARKS, "")
      .replace(/[آأإ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
  );
}
