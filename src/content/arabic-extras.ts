/* Sun/moon letter flags and example words for the Arabic alphabet.
   Authored in the premium build rather than the legacy site, so they live
   apart from the extracted letter data.

   Keyed by lowercased letter name, not glyph: the legacy site writes alif as
   the hamza form and the premium build writes the bare form, so a glyph key
   would silently miss it. */

export type LetterExtra = {
  /** Sun letters assimilate the "l" of al-; moon letters do not. */
  sunLetter: boolean;
  example: { glyph: string; meaning: { te: string; en: string } };
};

export const arabicExtras: Record<string, LetterExtra> = {
  "ا": { sunLetter: false, example: { glyph: "أَسَد", meaning: { te: "సింహం", en: "Lion" } } },
  "ب": { sunLetter: false, example: { glyph: "بَيْت", meaning: { te: "ఇల్లు", en: "House" } } },
  "ت": { sunLetter: true, example: { glyph: "تُفَّاح", meaning: { te: "ఆపిల్", en: "Apple" } } },
  "ث": { sunLetter: true, example: { glyph: "ثَلَاثَة", meaning: { te: "మూడు", en: "Three" } } },
  "ج": { sunLetter: false, example: { glyph: "جَمَل", meaning: { te: "ఒంటె", en: "Camel" } } },
  "ح": { sunLetter: false, example: { glyph: "حِمَار", meaning: { te: "గాడిద", en: "Donkey" } } },
  "خ": { sunLetter: false, example: { glyph: "خُبْز", meaning: { te: "రొట్టె", en: "Bread" } } },
  "د": { sunLetter: true, example: { glyph: "دَرْس", meaning: { te: "పాఠం", en: "Lesson" } } },
  "ذ": { sunLetter: true, example: { glyph: "ذِئْب", meaning: { te: "తోడేలు", en: "Wolf" } } },
  "ر": { sunLetter: true, example: { glyph: "رَجُل", meaning: { te: "పురుషుడు", en: "Man" } } },
  "ز": { sunLetter: true, example: { glyph: "زَهْرَة", meaning: { te: "పువ్వు", en: "Flower" } } },
  "س": { sunLetter: true, example: { glyph: "سَمَكَة", meaning: { te: "చేప", en: "Fish" } } },
  "ش": { sunLetter: true, example: { glyph: "شَجَرَة", meaning: { te: "చెట్టు", en: "Tree" } } },
  "ص": { sunLetter: true, example: { glyph: "صَبِيّ", meaning: { te: "అబ్బాయి", en: "Boy" } } },
  "ض": { sunLetter: true, example: { glyph: "ضَوْء", meaning: { te: "వెలుతురు", en: "Light" } } },
  "ط": { sunLetter: true, example: { glyph: "طَائِر", meaning: { te: "పక్షి", en: "Bird" } } },
  "ظ": { sunLetter: true, example: { glyph: "ظَبْي", meaning: { te: "జింక", en: "Gazelle" } } },
  "ع": { sunLetter: false, example: { glyph: "عَيْن", meaning: { te: "కన్ను", en: "Eye" } } },
  "غ": { sunLetter: false, example: { glyph: "غُرْفَة", meaning: { te: "గది", en: "Room" } } },
  "ف": { sunLetter: false, example: { glyph: "فِيل", meaning: { te: "ఏనుగు", en: "Elephant" } } },
  "ق": { sunLetter: false, example: { glyph: "قَمَر", meaning: { te: "చంద్రుడు", en: "Moon" } } },
  "ك": { sunLetter: false, example: { glyph: "كِتَاب", meaning: { te: "పుస్తకం", en: "Book" } } },
  "ل": { sunLetter: true, example: { glyph: "لَيْل", meaning: { te: "రాత్రి", en: "Night" } } },
  "م": { sunLetter: false, example: { glyph: "مَاء", meaning: { te: "నీరు", en: "Water" } } },
  "ن": { sunLetter: true, example: { glyph: "نُور", meaning: { te: "వెలుతురు", en: "Light" } } },
  "ه": { sunLetter: false, example: { glyph: "هِلَال", meaning: { te: "నెలవంక", en: "Crescent" } } },
  "و": { sunLetter: false, example: { glyph: "وَرْد", meaning: { te: "గులాబి", en: "Rose" } } },
  "ي": { sunLetter: false, example: { glyph: "يَد", meaning: { te: "చేయి", en: "Hand" } } },
};
