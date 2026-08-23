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
  return text
    .toLowerCase()
    .replace(MARKS, "")
    .replace(/[آأإ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}
