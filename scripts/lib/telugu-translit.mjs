/* Arabic scripture rendered in Telugu letters, so it can be recited by a
   reader who cannot read Arabic script.

   This is transliteration, not translation. The Telugu translation already on
   every ayah says what it means; this says how it sounds. A reader who knows
   only Telugu can now open a surah and actually say it.

   The convention is the one this site already used by hand in the twelve
   essential hadith (content/hadith.ts, translit_te), which in turn follows how
   Telugu Islamic publishing has always spelled Arabic -- the pronunciation an
   Urdu speaker would use, not an academic romanisation:

     హదీస్ (from ث)    జకాత్ (from ز)     రమదాన్ (from ض)
     ఖురాన్ (from ق)   తలబ్ (from ط)      యష్కురు (from ش)

   Several Arabic letters therefore land on one Telugu letter: ث ص س all give
   స, and ق خ both give ఖ. That loss is inherent to the script and is the
   accepted trade -- Telugu has no letters for those distinctions. The Arabic
   is shown alongside so nothing is lost from the page, and the reader carries
   a short note naming the letters that share a spelling.

   Everything below is driven by the diacritics in the IndoPak text rather than
   guessed from spelling: a lam carrying a jazm is pronounced, a lam carrying
   nothing is the silent lam of a sun letter, and the shadda that follows says
   to double the next consonant. Recitation is worth getting right, so the
   rules read the text. */

const SHADDA = "ّ";
const JAZM = "ۡ"; /* the IndoPak sukoon */
const SUKOON = "ْ";
const FATHA = "َ", KASRA = "ِ", DAMMA = "ُ";
const FATHATAN = "ً", DAMMATAN = "ٌ", KASRATAN = "ٍ";
const DAGGER = "ٰ"; /* superscript alef, a long a */
const SUB_ALEF = "ٖ"; /* subscript alef, a long i */
const INV_DAMMA = "ٗ"; /* inverted damma, a long u */
const MADDAH = "ٓ";
const HAMZA_ABOVE = "ٔ", HAMZA_BELOW = "ٕ";
const SILENT = "۠"; /* the letter beneath this is not sounded */
const TATWEEL = "ـ";

const ALEF = "ا", WAW = "و", YEH = "ي", MAKSURA = "ى";
const LAM = "ل", HAMZA = "ء", AIN = "ع", TEH_MARBUTA = "ة";

const HARAKAT = {
  [FATHA]: "a", [KASRA]: "i", [DAMMA]: "u",
  [FATHATAN]: "aN", [DAMMATAN]: "uN", [KASRATAN]: "iN",
};

/* Pause signs, ruku marks, sajda words, alternate-reading marks and the
   ornaments an IndoPak mushaf carries. Not one of them is a sound. */
const DROP = new Set([
  "ؕ", "ؗ", "ؔ", "ۖ", "ۗ", "ۘ", "ۙ", "ۚ",
  "ۛ", "ۜ", "۝", "٘", "ۨ", "ۭ", "‏",
  "‎", "ࣔ", "ࣕ", "ࣖ", "ࣗ", "ࣘ", "ࣙ", "ࣚ",
  "ࣛ", "ࣜ", "ࣝ", "ࣞ", "ࣟ", "࣠", "࣡", "࣢",
]);

/* Telugu letters carry an inherent "a", which is exactly what an Arabic
   consonant with fatha is, so the two scripts line up without a fight. */
const CONS = {
  "ب": "బ", "ت": "త", "ث": "స", "ج": "జ", "ح": "హ",
  "خ": "ఖ", "د": "ద", "ذ": "ద", "ر": "ర", "ز": "జ",
  "س": "స", "ش": "ష", "ص": "స", "ض": "ద", "ط": "త",
  "ظ": "జ", "غ": "గ", "ف": "ఫ", "ق": "ఖ", "ك": "క",
  "ل": "ల", "م": "మ", "ن": "న", "ه": "హ",
};

const VIRAMA = "్";
const ANUSVARA = "ం";
const MATRA = { a: "", A: "ా", i: "ి", I: "ీ", u: "ు", U: "ూ", ay: "ై", aw: "ౌ" };
const INDEP = { a: "అ", A: "ఆ", i: "ఇ", I: "ఈ", u: "ఉ", U: "ఊ", ay: "ఐ", aw: "ఔ" };

/* Telugu writes a nasal before a stop as the anusvara: న్+ద reads ంద. Before a
   vowel it stays a full న్ -- అన్అమ్త, never అంఅమ్త. */
const STOPS = "కఖగఘచఛజఝటఠడఢతథదధపఫబభమ";

const C = (te) => ({ t: "c", te });
const V = (v) => ({ t: "v", v });

/* One Arabic letter together with every mark sitting on it. */
function cluster(ch, i) {
  const m = { shadda: false, vowel: null, jazm: false, long: null, madd: false, hamza: false, silent: false };
  let j = i + 1;
  for (; j < ch.length; j++) {
    const c = ch[j];
    if (c === SHADDA) m.shadda = true;
    else if (HARAKAT[c]) m.vowel = HARAKAT[c];
    else if (c === JAZM || c === SUKOON) m.jazm = true;
    else if (c === DAGGER) m.long = "A";
    else if (c === SUB_ALEF) m.long = "I";
    else if (c === INV_DAMMA) m.long = "U";
    else if (c === MADDAH) m.madd = true;
    else if (c === HAMZA_ABOVE || c === HAMZA_BELOW) m.hamza = true;
    else if (c === SILENT) m.silent = true;
    else if (c === TATWEEL) break; /* a seat of its own, not a mark on this letter */
    else if (DROP.has(c)) continue;
    else break;
  }
  return [m, j];
}

/* A vowel that came with tanween is a vowel plus a closing n. The n is marked,
   because at a stop a tanween falls away while a real noon stays: عَلِيمٌ is
   read అలీమ్, but مِنْ is مిన్ and keeps its letter. */
function pushVowel(out, v, indep = false) {
  const vowel = v.endsWith("N") ? v[0] : v;
  out.push({ t: "v", v: vowel, indep });
  if (v.endsWith("N")) out.push({ t: "c", te: "న", tanween: true });
}

/* One word to a flat list of consonant and vowel tokens. */
function parseWord(word) {
  const ch = [...word];
  const out = [];
  let i = 0;

  while (i < ch.length) {
    const c = ch[i];
    if (DROP.has(c)) { i++; continue; }
    const [m, next] = cluster(ch, i);
    if (m.silent) { i = next; continue; }

    /* A carrier wearing a hamza is a glottal onset, not its own letter. A
       tatweel can be that carrier: يَـُٔوۡدُهٗ seats the hamza on a stretch mark,
       and reading the stretch as part of the yeh loses the yeh outright --
       Ayat al-Kursi came out వలా ఊదుహూ instead of వలా యఊదుహూ. */
    if (c === TATWEEL) {
      if (m.hamza || m.vowel) pushVowel(out, m.vowel ?? "a", true);
      i = next;
      continue;
    }
    const isHamza = m.hamza || c === HAMZA;

    if (isHamza || c === AIN) {
      /* Always an independent vowel: the onset restarts the syllable. This is
         why it is మర్ఇ and యఅనీహ్ rather than a matra on the letter before. */
      let v = m.vowel ?? "a";
      if (m.madd || m.long === "A") v = v.endsWith("N") ? "AN" : "A";
      pushVowel(out, v, true);
      i = next;
      continue;
    }

    if (c === ALEF || c === MAKSURA) {
      if (m.long === "A" || m.madd) {
        /* آ after a consonant only lengthens that consonant's fatha; standing
           alone at the head of a word it is a full ఆ. */
        const prev = out[out.length - 1];
        if (prev && prev.t === "v" && prev.v === "a") prev.v = "A";
        else out.push(V("A"));
        i = next;
        continue;
      }
      if (m.vowel) { pushVowel(out, m.vowel, true); i = next; continue; }
      /* A bare alef sitting in front of an article's lam is a hamzat wasl and
         says nothing at all. Treating it as a lengthener turns وَالنَّاسِ into
         వాల్న్నాస్ instead of వన్నాస్. A lam that carries its own vowel is an
         ordinary letter, so قَالَ and مَالِكِ still lengthen correctly. */
      if (next < ch.length) {
        const [after] = cluster(ch, next);
        /* An alef of prolongation is a vowel, so it cannot be followed
           immediately by a silent or doubled consonant. Where it is, the alef
           is a hamzat wasl carrying the next syllable and says nothing:
           وَانۡحَرۡ is వన్హర్, وَالنَّاسِ is వన్నాస్. A lam with its own vowel is
           an ordinary letter, so قَالَ and مَالِكِ still lengthen. */
        if (after.jazm || after.shadda || (ch[next] === LAM && !after.vowel)) { i = next; continue; }
      }
      /* Otherwise it lengthens a preceding fatha, or -- after tanween fath --
         is only a seat and says nothing. */
      const last = out[out.length - 1];
      if (last && last.t === "v" && last.v === "a") last.v = "A";
      i = next;
      continue;
    }

    if (c === WAW || c === YEH) {
      const long = c === WAW ? "U" : "I";
      const diph = c === WAW ? "aw" : "ay";
      const short = c === WAW ? "u" : "i";
      const last = out[out.length - 1];
      if (!m.vowel && !m.shadda && !m.long && last && last.t === "v" && last.v === short) {
        last.v = long; i = next; continue;              /* بُو -> ూ , بِي -> ీ */
      }
      if (m.jazm && !m.shadda && last && last.t === "v" && last.v === "a") {
        last.v = diph; i = next; continue;              /* بَوْ -> ౌ , بَيْ -> ై */
      }
      /* A yeh or waw carrying no mark at all is never a sounded consonant in
         vowelled text; it is the seat of a long vowel already written. The
         IndoPak text spells alef maksura with a plain yeh, so اِلٰي is ఇలా and
         عَلٰي is అలా -- not ఇలాయ్ and అలాయ్. */
      if (!m.vowel && !m.jazm && !m.shadda && !m.long && !m.madd) { i = next; continue; }

      const te = c === WAW ? "వ" : "య";
      if (m.shadda) out.push(C(te));
      out.push(C(te));
      if (m.long) out.push(V(m.long));
      else if (m.vowel) pushVowel(out, m.vowel);
      i = next;
      continue;
    }

    if (c === TEH_MARBUTA) {
      /* Sounded t when a vowel follows, a soft h when the word stops there:
         ఫరీదతున్ but సురఅహ్. */
      if (m.vowel) {
        if (m.shadda) out.push(C("త"));
        /* Marked, because whether it stays a t depends on where the reciter
           stops, which is not known until the ayah is laid out. */
        out.push({ t: "c", te: "త", marbuta: true });
        pushVowel(out, m.vowel);
      } else out.push(C("హ"));
      i = next;
      continue;
    }

    /* A lam wearing nothing at all is the article's lam before a sun letter:
       silent, with the letter after it doubled. In fully vowelled text every
       sounded consonant carries a harakat or a jazm, so a bare lam is never
       anything else. Without this اَللّٰهُ comes out అల్ల్లాహు, on three lams. */
    if (c === LAM && !m.vowel && !m.jazm && !m.shadda) {
      const [after] = cluster(ch, next);
      if (after.shadda) { i = next; continue; }
    }

    const te = CONS[c];
    if (!te) { i = next; continue; }
    if (m.shadda) out.push(C(te));
    out.push(C(te));
    if (m.long) out.push(V(m.long));
    else if (m.vowel) pushVowel(out, m.vowel);
    i = next;
  }
  return out;
}

function render(tokens) {
  let s = "";
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.t === "v") { s += INDEP[t.v] ?? ""; continue; }
    s += t.te;
    const nx = tokens[i + 1];
    /* A vowel carried by hamza, ain or a standalone alef restarts the
       syllable, so it never becomes a matra on the letter in front of it.
       Without this أَنۡعَمۡتَ reads అనమ్త instead of అన్అమ్త. */
    if (nx && nx.t === "v" && !nx.indep) { s += MATRA[nx.v] ?? ""; i++; }
    else s += VIRAMA;
  }
  return s.replace(new RegExp("న" + VIRAMA + "(?=[" + STOPS + "])", "g"), ANUSVARA);
}

/* The definite article. A word opening with a bare alef is a hamzat wasl:
   after the first word of an ayah its vowel is not sounded, and the article's
   consonant closes the word in front of it. That is why it is బిస్మిల్లాహి and
   not బిస్మి అల్లాహి, and ఇహ్దినస్ సిరాత and not ఇహ్దినా అస్సిరాత. */
function wasl(word) {
  const ch = [...word];
  if (ch[0] !== ALEF) return null;
  const [first, afterAlef] = cluster(ch, 0);
  if (first.vowel || first.long || first.madd || first.hamza) return null;
  if (ch[afterAlef] !== LAM) return null; /* a wasl with no article; read it plainly */

  const [lam, afterLam] = cluster(ch, afterAlef);

  /* اللّٰه, the name itself. Its second lam belongs to the word rather than to
     an article, and every reader expects బిస్మిల్లాహి in one piece, so this
     one joins with nothing between. */
  if (ch[afterLam] === LAM) return { carry: "ల", rest: word.slice(afterLam), sun: true, sep: "" };

  /* A lam with a jazm is sounded, and a moon letter follows: తలబుల్ ఇల్మి. */
  if (lam.jazm) return { carry: "ల", rest: word.slice(afterLam), sep: " " };

  /* A lam carrying a shadda is itself the sun letter, as in الَّذِينَ. Read
     naively this doubles the ذ instead and gives సిరాతద్ దీన for what should
     be సిరాతల్-లదీన. */
  if (lam.shadda) return { carry: "ల", rest: word.slice(afterAlef), sun: true, sep: "-" };

  /* Otherwise the silent lam of a sun letter: the letter after it is doubled,
     one of the pair closing the word before, the other opening this one. */
  const letter = ch[afterLam];
  const sun = CONS[letter] ?? (letter === WAW ? "వ" : letter === YEH ? "య" : null);
  if (!sun) return { carry: "ల", rest: word.slice(afterLam), sep: " " };
  return { carry: sun, rest: word.slice(afterLam), sun: true, sep: "-" };
}

/* The shadda already produced the doubled pair, and the join has taken one of
   them onto the previous word. */
function articleRest(article) {
  const rest = parseWord(article.rest);
  if (article.sun && rest.length > 1 && rest[0].t === "c" && rest[1].t === "c" && rest[0].te === rest[1].te) {
    return rest.slice(1);
  }
  return rest;
}

const SHORTEN = { A: "a", I: "i", U: "u" };

/* At a stop the final short vowel is not pronounced: ముస్తఖీమ, as written,
   is recited ముస్తఖీమ్. Tanween goes the same way, except that -an leaves a
   long ā behind. This is why an ayah ends on a consonant. */
function pausal(parts) {
  for (let k = parts.length - 1; k >= 0; k--) {
    const t = parts[k].tokens;
    if (!t.length) continue;
    const last = t[t.length - 1];
    const before = t[t.length - 2];
    if (last.t === "c" && last.tanween && before && before.t === "v") {
      if (before.v === "a") { before.v = "A"; t.pop(); } else { t.pop(); t.pop(); }
    } else if (last.t === "v" && (last.v === "a" || last.v === "i" || last.v === "u")) {
      t.pop();
    }
    /* ة is sounded as a t only while a vowel follows it. Stopping on it turns
       it into a soft h: مَوۡضُوۡنَةٍ is మౌదూనహ్, never మౌదూనత్. */
    const end = t[t.length - 1];
    if (end && end.t === "c" && end.marbuta) t[t.length - 1] = C("హ");
    return;
  }
}

/* A word that opens on a shadda is idgham: the final consonant of the word
   before it merges into this one. مِنْ رَّبِّهِمْ is మిర్-రబ్బిహిమ్, and
   وَلَمْ يَكُنْ لَّهُ is వలమ్ యకుల్-లహూ. */
function leadShadda(word) {
  const ch = [...word];
  const te = CONS[ch[0]] ?? (ch[0] === WAW ? "వ" : ch[0] === YEH ? "య" : null);
  if (!te) return null;
  const [m] = cluster(ch, 0);
  return m.shadda ? te : null;
}

const stripMarks = (w) => [...w].filter((c) => !DROP.has(c)).join("");

function transliterate(arabic, { pause = true } = {}) {
  /* Pause signs are stripped before anything else looks at the word: a waqf
     mark can sit in front of the alef and hide the article behind it. */
  const words = String(arabic).split(/\s+/).map(stripMarks).filter(Boolean);
  /* Each part carries the separator that goes in front of it, because a sun
     letter is written with a hyphen to show the doubling and a moon letter
     with a plain space. */
  const parts = [];

  for (const word of words) {
    const article = wasl(word);

    if (article && !parts.length) {
      /* Nothing precedes it at the head of an ayah, so the article keeps its
         own vowel and stands alone: అర్-రహ్మాన్. */
      parts.push({ tokens: [V("a"), C(article.carry)], sep: "" });
      parts.push({ tokens: articleRest(article), sep: article.sep });
      continue;
    }

    if (article) {
      const prev = parts[parts.length - 1].tokens;
      const last = prev[prev.length - 1];
      /* A long vowel in front of a hamzat wasl is shortened, which is why it
         is ఇహ్దినస్ సిరాత and not ఇహ్దినాస్. */
      if (last && last.t === "v" && SHORTEN[last.v]) last.v = SHORTEN[last.v];
      prev.push(C(article.carry));
      parts.push({ tokens: articleRest(article), sep: article.sep });
      continue;
    }

    const lead = leadShadda(word);
    if (lead && !parts.length) {
      /* An ayah opening on a shadda is carrying idgham from the ayah before
         it, and here there is nothing for the doubling to land on. Keeping it
         gave వ్వఅక్వాబుమ్ for what is simply వఅక్వాబుమ్. */
      let toks = parseWord(word);
      if (toks.length > 1 && toks[0].t === "c" && toks[1].t === "c" && toks[0].te === toks[1].te) toks = toks.slice(1);
      parts.push({ tokens: toks, sep: " " });
      continue;
    }
    if (lead && parts.length) {
      const prev = parts[parts.length - 1].tokens;
      const last = prev[prev.length - 1];
      /* The assimilating noon is replaced outright. A word already ending on
         the same consonant needs nothing: يَجۡعَلْ لَّهٗ is యజ్అల్-లహూ, and
         pushing another lam gave యజ్అల్ల్-లహూ. */
      if (last && last.t === "c" && last.te === "న" && !last.tanween) prev[prev.length - 1] = C(lead);
      else if (last && last.t === "c" && last.te === lead) { /* already there */ }
      else if (last && last.t === "c" && last.tanween) prev[prev.length - 1] = C(lead);
      else prev.push(C(lead));
      let toks = parseWord(word);
      if (toks.length > 1 && toks[0].t === "c" && toks[1].t === "c" && toks[0].te === toks[1].te) toks = toks.slice(1);
      parts.push({ tokens: toks, sep: "-" });
      continue;
    }

    parts.push({ tokens: parseWord(word), sep: " " });
  }

  if (pause) pausal(parts);

  let out = "";
  for (const p of parts) {
    const s = render(p.tokens);
    if (!s) continue;
    out += (out ? p.sep : "") + s;
  }
  return out.replace(/ +/g, " ").trim();
}

/* The disconnected letters that open twenty-nine surahs are recited as the
   names of the letters, never as a word, and no letter-by-letter rule could
   know that. They are spelled out by hand. */
const LETTER_NAMES = {
  "ا": "అలిఫ్", "ل": "లామ్", "م": "మీమ్", "ص": "సాద్",
  "ر": "రా", "ك": "కాఫ్", "ه": "హా", "ي": "యా",
  "ع": "ఐన్", "ط": "తా", "س": "సీన్", "ح": "హా",
  "ق": "ఖాఫ్", "ن": "నూన్",
};

/* The thirty ayahs that are nothing but disconnected letters. Hard-coded
   because no rule over the letters themselves can tell them from a word. */
const MUQATTAAT = new Set([
  "2:1", "3:1", "7:1", "10:1", "11:1", "12:1", "13:1", "14:1", "15:1", "19:1",
  "20:1", "26:1", "27:1", "28:1", "29:1", "30:1", "31:1", "32:1", "36:1", "38:1",
  "40:1", "41:1", "42:1", "42:2", "43:1", "44:1", "45:1", "46:1", "50:1", "68:1",
]);

/** The transliteration for one ayah, knowing where in the Quran it sits. */
export function transliterateAyah(surah, verse, arabic) {
  if (!MUQATTAAT.has(surah + ":" + verse)) return transliterate(arabic);
  /* Only the opening token is letters. ق and ن are each followed by an
     ordinary sentence, and spelling the whole ayah out turned 50:1 into
     ఖాఫ్ అలిఫ్ లామ్ ఖాఫ్ రా... instead of ఖాఫ్ వల్ఖురానిల్ మజీద్. */
  const words = String(arabic).split(/\s+/).map(stripMarks).filter(Boolean);
  const head = spellLetters(words[0]);
  if (!head) return transliterate(arabic);
  const tail = words.slice(1).join(" ");
  return tail ? head + " " + transliterate(tail) : head;
}

function spellLetters(arabic) {
  const letters = [...String(arabic)].filter((c) => LETTER_NAMES[c]);
  if (!letters.length) return null;
  return letters.map((c) => LETTER_NAMES[c]).join(" ");
}
