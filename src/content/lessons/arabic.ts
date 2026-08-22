/* Learn Arabic — replacements for the six extracted lessons.

   The extracted versions ran to one sentence per section and a median of 77
   English words, which is a table of contents rather than a lesson. These use
   the same slugs, so all-lessons.ts substitutes them in place: the reader's
   sequence and their saved progress are unaffected.

   House rules are in ../lessons-authored.ts and apply here too. */
import type { Lesson } from "../lessons.ts";

export const arabicLessons: Lesson[] = [
  {
    slug: "alphabet",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 1 — అరబిక్ అక్షరమాల",
      en: "Level 1 — The Arabic alphabet",
    },
    intro: {
      te: "అరబిక్ 28 అక్షరాలతో, కుడి నుండి ఎడమకు, అక్షరాలు ఒకదానితో ఒకటి కలుస్తూ రాయబడుతుంది. ఈ పాఠం అక్షరాల ఆకారాలు ఎందుకు మారతాయో, ఏవి కలవవో, చుక్కలు ఎందుకు అంత ముఖ్యమో వివరిస్తుంది.",
      en: "Arabic is written with 28 letters, right to left, with the letters joined to one another. This lesson explains why letter shapes change, which letters refuse to join, and why the dots matter so much.",
    },
    sections: [
      {
        heading: { te: "ఒకే అస్థిపంజరం, నాలుగు ఆకారాలు", en: "One skeleton, four shapes" },
        body: {
          te: "ప్రతి అక్షరానికి ఒక ప్రాథమిక ఆకారం ఉంది, కానీ పదంలో దాని స్థానాన్ని బట్టి అది నాలుగు రూపాల్లో కనిపిస్తుంది: ఒంటరిగా, పదం మొదట, మధ్యలో, చివర. ఇది కొత్తవారికి భయపెడుతుంది, కానీ నిజానికి ఇది ఇంగ్లిష్ అక్షరం ముద్రణలో ఒకలా, చేతిరాతలో మరొకలా కనిపించడం లాంటిదే. అస్థిపంజరం ఒకటే; అది ఇరుపక్కల కలిసేలా సాగుతుంది.",
          en: "Every letter has one basic shape but appears in up to four forms depending on where it sits in a word: alone, at the start, in the middle, or at the end. This alarms beginners, though it is no stranger than a letter looking different in print and in handwriting. The skeleton is the same; it simply stretches to join on either side.",
        },
        check: {
          question: { te: "ఒక అరబిక్ అక్షరానికి ఎన్ని ఆకారాలు ఉండవచ్చు?", en: "How many shapes can one Arabic letter have?" },
          options: [
            { te: "నాలుగు వరకు", en: "Up to four" },
            { te: "ఒక్కటే", en: "Only one" },
            { te: "ఇరవై ఎనిమిది", en: "Twenty-eight" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కలవని ఆరు అక్షరాలు", en: "The six letters that will not join forward" },
        body: {
          te: "ఇది కొత్తవారు తప్పక తెలుసుకోవలసిన నియమం. ఆరు అక్షరాలు — అలిఫ్, దాల్, ధాల్, రా, జాయ్, వావ్ — తమకు ముందున్న అక్షరంతో కలుస్తాయి, కానీ తర్వాతి అక్షరంతో కలవవు. అందుకే ఒక పదం మధ్యలోనే విరిగినట్లు కనిపిస్తుంది; అది ఖాళీ కాదు. ఈ ఆరు గుర్తుంటే చదవడం చాలా సులభమవుతుంది; లేకపోతే ఒక పదం రెండు పదాలుగా కనిపిస్తుంది.",
          en: "This is the rule beginners most need. Six letters — alif, dal, dhal, ra, zay and waw — join to the letter before them but never to the letter after. That is why a word can look as though it breaks in the middle; the gap is not a space. Learn these six and reading gets much easier. Miss them and one word looks like two.",
        },
        check: {
          question: { te: "కలవని ఆరు అక్షరాలలో ఏది ఉంది?", en: "Which of these is one of the six non-joining letters?" },
          options: [
            { te: "రా", en: "Ra" },
            { te: "బా", en: "Ba" },
            { te: "సీన్", en: "Seen" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "చుక్కలే అక్షరాన్ని నిర్ణయిస్తాయి", en: "The dots are the letter" },
        body: {
          te: "అరబిక్‌లో చాలా అక్షరాలు ఒకే అస్థిపంజరాన్ని పంచుకుంటాయి; వాటిని వేరు చేసేది చుక్కల సంఖ్య, స్థానం మాత్రమే. బా కింద ఒక చుక్క, తా పైన రెండు, థా పైన మూడు — మూడూ ఒకే ఆకారం. అలాగే జీమ్, హా, ఖా ఒకే ఆకారం; చుక్క లేకపోవడం, కింద ఉండటం, పైన ఉండటం అనేదే తేడా. అందుకే చేతిరాతలో చుక్కలను జాగ్రత్తగా పెట్టాలి — చుక్క తప్పితే పదం అర్థమే మారిపోతుంది.",
          en: "Many Arabic letters share one skeleton and are told apart only by how many dots they carry and where. Ba has one dot below, ta two above, tha three above, and they are otherwise identical. The same holds for jeem, ha and kha, separated by no dot, a dot below, and a dot above. This is why dots must be written carefully: a misplaced dot changes the word.",
        },
      },
      {
        heading: { te: "సూర్య, చంద్ర అక్షరాలు", en: "Sun and moon letters" },
        body: {
          te: "అరబిక్‌లో 'అల్' అంటే ఇంగ్లిష్ 'the'. కానీ దాని 'ల' ఎప్పుడూ వినిపించదు. పద్నాలుగు సూర్య అక్షరాల ముందు ల మౌనమై, తర్వాతి అక్షరం రెట్టింపు అవుతుంది: 'అష్-షమ్స్', 'అల్-షమ్స్' కాదు. మిగిలిన పద్నాలుగు చంద్ర అక్షరాల ముందు ల స్పష్టంగా వినిపిస్తుంది: 'అల్-ఖమర్'. ఈ రెండు ఉదాహరణలే — షమ్స్ అంటే సూర్యుడు, ఖమర్ అంటే చంద్రుడు — ఈ పేర్లకు మూలం.",
          en: "The Arabic al is the equivalent of the, but its laam is not always heard. Before the fourteen sun letters the laam falls silent and the next letter doubles: ash-shams, not al-shams. Before the fourteen moon letters it is pronounced clearly: al-qamar. Those two words, shams for sun and qamar for moon, are where the names come from.",
        },
      },
      {
        heading: { te: "కుడి నుండి ఎడమకు — కానీ సంఖ్యలు కాదు", en: "Right to left, except the numbers" },
        body: {
          te: "అక్షరాలు కుడి నుండి ఎడమకు వెళతాయి, పుస్తకం మనం వెనుక అనుకునే వైపు నుండి తెరుచుకుంటుంది. కానీ సంఖ్యలు ఎడమ నుండి కుడికే రాయబడతాయి — నూట ఇరవై మూడు అనే సంఖ్యలో వందల స్థానం ఎడమవైపే ఉంటుంది. ఇది మొదట గందరగోళంగా అనిపిస్తుంది, త్వరగా అలవాటవుతుంది. ఇంగ్లిష్‌లో వాడే అంకెలు కూడా అరబ్బుల ద్వారానే వచ్చాయి; అందుకే వాటిని అరబిక్ అంకెలు అంటారు.",
          en: "Letters run right to left and a book opens from what we would call the back. Numbers, though, still run left to right, with the hundreds column on the left as usual. It feels odd at first and becomes natural quickly. The digits used in English came through the Arabs in the first place, which is why they are called Arabic numerals.",
        },
      },
    ],
    takeaways: [
      { te: "28 అక్షరాలు, ఒక్కొక్కటి నాలుగు ఆకారాల వరకు.", en: "Twenty-eight letters, each with up to four shapes." },
      { te: "అలిఫ్, దాల్, ధాల్, రా, జాయ్, వావ్ — ఈ ఆరు తర్వాతి అక్షరంతో కలవవు.", en: "Alif, dal, dhal, ra, zay and waw do not join to the letter that follows." },
      { te: "చుక్కల సంఖ్య, స్థానమే అక్షరాన్ని నిర్ణయిస్తాయి.", en: "The number and position of the dots decide which letter it is." },
    ],
    didYouKnow: [
      { te: "అరబిక్ లిపి నుండే ఉర్దూ, పర్షియన్, పష్తో, కుర్దిష్ లిపులు వచ్చాయి — ప్రతి భాష తన శబ్దాలకు అదనపు అక్షరాలు చేర్చుకుంది.", en: "Urdu, Persian, Pashto and Kurdish all use scripts derived from Arabic, each adding letters for sounds Arabic does not have." },
      { te: "తొలి ఖురాన్ ప్రతుల్లో చుక్కలు, హరకాత్ లేవు — పాఠకులు కంఠస్థం నుండే చదివేవారు.", en: "The earliest Quran manuscripts had neither dots nor vowel marks; readers relied on what they had memorised." },
    ],
    reflect: [
      { te: "మీకు తెలిసిన అరబిక్ పదం ఒకటి రాసి, అందులో కలవని అక్షరాలు ఎక్కడ ఉన్నాయో గుర్తించండి.", en: "Write one Arabic word you know and mark where the non-joining letters fall." },
    ],
    mistakes: [
      { te: "పదం మధ్యలో కనిపించే విరుపును ఖాళీగా భావించి రెండు పదాలుగా చదవడం.", en: "Reading the break after a non-joining letter as a space, and so reading one word as two." },
      { te: "చుక్కలను నిర్లక్ష్యంగా రాయడం — బా, తా, థా ఒకే ఆకారం కాబట్టి అర్థం మారిపోతుంది.", en: "Writing dots carelessly, when ba, ta and tha share a shape and the meaning turns on them." },
      { te: "సూర్య అక్షరాల ముందు 'ల'ను పలకడం — అది మౌనం.", en: "Pronouncing the laam before a sun letter, when it is silent." },
    ],
    faqs: [
      {
        question: { te: "28 అక్షరాలు నేర్చుకోవడానికి ఎంత సమయం పడుతుంది?", en: "How long does it take to learn the 28 letters?" },
        answer: {
          te: "గుర్తుపట్టడం చాలామందికి ఒకటి రెండు వారాల్లో వస్తుంది — రోజుకు పదిహేను నిమిషాలు చాలు. కలిపి రాయడం, చదవడం మరో కొన్ని వారాలు. ముఖ్యమైనది వేగం కాదు, ప్రతిరోజూ కొంచెం చేయడం.",
          en: "Most people recognise them within a week or two at fifteen minutes a day. Joining them and reading fluently takes a few weeks more. What matters is not speed but doing a little every day.",
        },
      },
      {
        question: { te: "అరబిక్ భాష నేర్చుకోకుండా ఖురాన్ చదవవచ్చా?", en: "Can I read the Quran without learning the Arabic language?" },
        answer: {
          te: "అనువాదం చదవడం విలువైనది, దాన్ని ఎప్పుడూ ఆపవద్దు. కానీ పఠనం అరబిక్ లిపిలోనే. అక్షరాలు నేర్చుకోవడం అంటే భాష నేర్చుకోవడం కాదు — అది కేవలం చదవగలగడం, అదే మొదటి అడుగు.",
          en: "Reading a translation is valuable and you should never stop. But recitation itself is in the Arabic script. Learning the letters is not the same as learning the language; it is simply being able to read, and that is the first step.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "అరబిక్‌లో ఎన్ని అక్షరాలు?", en: "How many letters are in the Arabic alphabet?" },
        options: [
          { te: "28", en: "28" },
          { te: "26", en: "26" },
          { te: "32", en: "32" },
        ],
        answer: 0,
      },
      {
        question: { te: "సూర్య అక్షరం ముందు 'అల్' లోని ల ఏమవుతుంది?", en: "What happens to the laam of al before a sun letter?" },
        options: [
          { te: "మౌనమై తర్వాతి అక్షరం రెట్టింపు అవుతుంది", en: "It goes silent and the next letter doubles" },
          { te: "స్పష్టంగా వినిపిస్తుంది", en: "It is pronounced clearly" },
          { te: "అది పూర్తిగా తొలగిపోతుంది", en: "It is dropped from the writing" },
        ],
        answer: 0,
      },
      {
        question: { te: "అరబిక్‌లో సంఖ్యలు ఏ దిశలో రాస్తారు?", en: "In which direction are numbers written in Arabic?" },
        options: [
          { te: "ఎడమ నుండి కుడికి", en: "Left to right" },
          { te: "కుడి నుండి ఎడమకు", en: "Right to left" },
          { te: "పై నుండి కిందికి", en: "Top to bottom" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "28 అక్షరాలు; నాలుగు ఆకారాలు; కుడి నుండి ఎడమకు.", en: "28 letters, four shapes, right to left." },
      { te: "కలవనివి: అలిఫ్, దాల్, ధాల్, రా, జాయ్, వావ్.", en: "Non-joiners: alif, dal, dhal, ra, zay, waw." },
      { te: "సూర్య అక్షరాల ముందు ల మౌనం; చంద్ర అక్షరాల ముందు స్పష్టం.", en: "Laam is silent before sun letters, pronounced before moon letters." },
    ],
    summary: {
      te: "అరబిక్ 28 అక్షరాలు, కుడి నుండి ఎడమకు, కలుపుతూ రాస్తారు. ప్రతి అక్షరానికి నాలుగు ఆకారాల వరకు; ఆరు అక్షరాలు తర్వాతివాటితో కలవవు; చుక్కలే అక్షరాన్ని నిర్ణయిస్తాయి; 'అల్' లోని ల సూర్య అక్షరాల ముందు మౌనమవుతుంది.",
      en: "Arabic has 28 letters written right to left and joined. Each has up to four shapes, six never join forward, the dots decide which letter you are looking at, and the laam of al goes silent before a sun letter.",
    },
    apply: {
      te: "ఆచరణ: అక్షరమాల పేజీలో ప్రతి అక్షరాన్ని విని, కలవని ఆరింటిని ఒక కాగితంపై రాసుకోండి.",
      en: "Apply it: listen to each letter on the alphabet page and write the six non-joiners on a card.",
    },
    reading: [
      { label: "Arabic alphabet with audio", url: "/knowledge-center/learn-arabic" },
      { label: "Harakat and vowels", url: "/knowledge-center/learn-arabic/harakat" },
    ],
  },

  {
    slug: "harakat",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 2 — హరకాత్ మరియు స్వరాలు",
      en: "Level 2 — Harakat and vowels",
    },
    intro: {
      te: "అరబిక్ అక్షరాలు హల్లులు మాత్రమే. ఏ స్వరం రావాలో చెప్పేవి హరకాత్ — అక్షరం పైన కింద పెట్టే చిన్న గుర్తులు. ఇవి లేకపోతే ఒకే మూడు అక్షరాల పదాన్ని 'కతబ', 'కుతుబ', 'కుతిబ' — ఎలాగైనా చదవవచ్చు.",
      en: "Arabic letters are consonants. What tells you which vowel follows are the harakat, small marks placed above and below. Without them the same three letters could be read kataba, kutub or kutiba, and you would not know which.",
    },
    sections: [
      {
        heading: { te: "మూడు చిన్న స్వరాలు", en: "The three short vowels" },
        body: {
          te: "ఫత్‌హా అనేది అక్షరం పైన వాలుగా ఉండే చిన్న గీత; అది 'అ' శబ్దం ఇస్తుంది. కస్రా అదే గీత అక్షరం కింద; అది 'ఇ'. దమ్మా అక్షరం పైన చిన్న వావ్ లాంటి గుర్తు; అది 'ఉ'. అరబిక్‌లో ఉన్నవి ఈ మూడు స్వరాలే. తెలుగులో 'ఎ', 'ఒ' ఉన్నట్లు ప్రామాణిక అరబిక్‌లో లేవు — అందుకే ఆ శబ్దాలు అరబిక్ పదాల్లో రావు.",
          en: "Fatha is a small slanted stroke above the letter giving an a sound. Kasra is the same stroke below, giving i. Damma is a small waw-like mark above, giving u. Those three are the whole set of Arabic vowels. Classical Arabic has no e or o, which is why those sounds do not appear in Arabic words.",
        },
        check: {
          question: { te: "కస్రా ఏ శబ్దం ఇస్తుంది?", en: "What sound does kasra give?" },
          options: [
            { te: "ఇ", en: "i" },
            { te: "అ", en: "a" },
            { te: "ఉ", en: "u" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "పొడవాటి స్వరాలు — రెట్టింపు నిడివి", en: "Long vowels: twice the length" },
        body: {
          te: "చిన్న స్వరాన్ని పొడిగించడానికి మూడు అక్షరాలు వాడతారు: అలిఫ్ ఫత్‌హాను పొడిగిస్తుంది, వావ్ దమ్మాను, యా కస్రాను. అలా 'బ' → 'బా', 'బు' → 'బూ', 'బి' → 'బీ'. నిడివి తేడా అర్థాన్నే మారుస్తుంది కాబట్టి ఇది చాలా ముఖ్యం. తజ్వీద్‌లో ఈ పొడవును కచ్చితంగా పాటించడం ఒక ప్రధాన నియమం — పొడవాటిది రెండు కౌంట్‌ల నిడివి.",
          en: "Three letters lengthen a short vowel: alif lengthens fatha, waw lengthens damma, and ya lengthens kasra. So ba becomes baa, bu becomes buu, and bi becomes bii. Length changes meaning, so this matters. Holding these correctly is one of the main rules of tajweed; a long vowel is held for two counts.",
        },
        check: {
          question: { te: "దమ్మాను ఏ అక్షరం పొడిగిస్తుంది?", en: "Which letter lengthens damma?" },
          options: [
            { te: "వావ్", en: "Waw" },
            { te: "అలిఫ్", en: "Alif" },
            { te: "యా", en: "Ya" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సుకూన్ మరియు షద్దా", en: "Sukun and shadda" },
        body: {
          te: "సుకూన్ అనేది అక్షరం పైన చిన్న వృత్తం; అది 'ఈ అక్షరానికి స్వరం లేదు' అని చెబుతుంది — అది హల్లుగానే ఆగిపోతుంది. షద్దా అనేది చిన్న గుర్తు; అది అక్షరం రెట్టింపు అని చెబుతుంది — ఆ అక్షరాన్ని రెండుసార్లు పలికినట్లు, కొంచెం నొక్కి ఉచ్చరించాలి. 'రబ్బనా' లోని 'బ' పై షద్దా ఉంది. షద్దాను విస్మరించడం సాధారణ తప్పు, మరియు అది అర్థాన్ని మార్చగలదు.",
          en: "Sukun is a small circle above a letter meaning it carries no vowel; the letter simply closes. Shadda is a small mark meaning the letter is doubled and must be held with slight pressure, as though said twice. The ba in rabbana carries a shadda. Ignoring a shadda is a common error and it can change the meaning.",
        },
      },
      {
        heading: { te: "తన్వీన్ — చివర 'న్' శబ్దం", en: "Tanween: the n at the end" },
        body: {
          te: "ఒక పదం చివర హరకాను రెట్టింపుగా రాస్తే దాన్ని తన్వీన్ అంటారు, మరియు అది 'న్' శబ్దాన్ని చేరుస్తుంది: 'కితాబున్', 'కితాబన్', 'కితాబిన్'. వ్యాకరణంలో ఇది పదం అనిర్దిష్టం అని సూచిస్తుంది; ఇంగ్లిష్ 'a book' లాంటిది. 'అల్' చేరిస్తే తన్వీన్ పోతుంది: 'అల్-కితాబు' — 'the book'. అందుకే ఒకే పదంపై 'అల్', తన్వీన్ రెండూ ఉండవు.",
          en: "A doubled vowel mark at the end of a word is tanween, and it adds an n sound: kitaabun, kitaaban, kitaabin. Grammatically it marks the word as indefinite, the equivalent of a book. Adding al removes it: al-kitaabu, the book. This is why al and tanween never appear on the same word.",
        },
      },
      {
        heading: { te: "ఖురాన్ ప్రతుల్లో ఎందుకు ఇవన్నీ ఉంటాయి", en: "Why the Quran carries all of them" },
        body: {
          te: "ఆధునిక అరబిక్ వార్తాపత్రికల్లో, పుస్తకాల్లో హరకాత్ ఉండవు — అరబిక్ మాట్లాడేవారు సందర్భాన్ని బట్టి ఊహిస్తారు. కానీ ఖురాన్ ప్రతుల్లో ప్రతి గుర్తూ ఉంటుంది. కారణం స్పష్టం: ఒక్క స్వరం మారితే అర్థం మారవచ్చు, మరియు పఠనంలో అలాంటి పొరపాటుకు చోటు లేదు. అందుకే కొత్తవారు ముందుగా హరకాత్‌తో ఉన్న పాఠం నుండే నేర్చుకుంటారు.",
          en: "Modern Arabic newspapers and books leave the harakat out, because a fluent reader supplies them from context. Quran copies mark every one. The reason is straightforward: a single changed vowel can change the meaning, and recitation leaves no room for that. This is why beginners always start from fully marked text.",
        },
      },
    ],
    takeaways: [
      { te: "మూడు చిన్న స్వరాలు: ఫత్‌హా అ, కస్రా ఇ, దమ్మా ఉ.", en: "Three short vowels: fatha a, kasra i, damma u." },
      { te: "అలిఫ్, వావ్, యా వాటిని పొడిగిస్తాయి — రెండు కౌంట్‌ల నిడివి.", en: "Alif, waw and ya lengthen them, held for two counts." },
      { te: "సుకూన్ అంటే స్వరం లేదు. షద్దా అంటే అక్షరం రెట్టింపు.", en: "Sukun means no vowel; shadda means the letter is doubled." },
    ],
    didYouKnow: [
      { te: "హరకాత్ వ్యవస్థను ప్రవక్త ﷺ కాలం తర్వాత అభివృద్ధి చేశారు — అరబ్బేతరులు ఖురాన్ చదివేటప్పుడు పొరపాట్లు రాకుండా ఉండటానికి.", en: "The harakat system was developed after the Prophet's time, specifically so that non-Arabs could recite the Quran without error." },
      { te: "అరబిక్‌లో 'ఎ', 'ఒ' స్వరాలు లేవు — అందుకే ఇంగ్లిష్‌లో 'Omar' అని రాసినా అరబిక్‌లో అది 'ఉమర్'.", en: "Arabic has no e or o vowel, which is why a name written Omar in English is Umar in Arabic." },
    ],
    reflect: [
      { te: "మీ ఖురాన్ ప్రతిలో ఒక చిన్న ఆయతును తీసుకుని, అందులో ఎన్ని షద్దాలు ఉన్నాయో లెక్కపెట్టండి.", en: "Take one short verse from your Quran and count how many shaddas it contains." },
    ],
    mistakes: [
      { te: "షద్దాను విస్మరించి అక్షరాన్ని ఒకసారే పలకడం.", en: "Ignoring a shadda and saying the letter once." },
      { te: "పొడవాటి స్వరాన్ని చిన్నదిగా పలకడం — తజ్వీద్‌లో ఇది స్పష్టమైన లోపం.", en: "Shortening a long vowel, which is a clear fault in tajweed." },
      { te: "తన్వీన్‌ను, 'అల్'ను ఒకే పదంలో కలపడం — అవి కలిసి రావు.", en: "Putting tanween and al on the same word, when the two never combine." },
    ],
    faqs: [
      {
        question: { te: "హరకాత్ లేని అరబిక్ ఎప్పుడు చదవగలను?", en: "When will I be able to read Arabic without harakat?" },
        answer: {
          te: "పదజాలం, వ్యాకరణ నమూనాలు తెలిసినకొద్దీ. మీకు ఒక పదం తెలిస్తే దాని స్వరాలు ఊహించగలరు. కొత్తవారు ఆ దశకు తొందరపడకూడదు — ఖురాన్ ఎప్పుడూ హరకాత్‌తోనే చదవండి.",
          en: "As your vocabulary and sense of the patterns grow: if you know a word, you can supply its vowels. Beginners should not rush that stage, and the Quran should always be read from marked text.",
        },
      },
      {
        question: { te: "తెలుగు అక్షరాలతో అరబిక్ రాసుకుని చదవవచ్చా?", en: "Can I write Arabic in Telugu letters and read from that?" },
        answer: {
          te: "మొదట్లో సహాయకరంగా అనిపించవచ్చు, కానీ అది అలవాటుగా మారితే హాని. తెలుగులో అరబిక్‌లోని కొన్ని శబ్దాలకు సమానమైనవి లేవు — ఐన్, హా, ఖాఫ్, దాద్ వంటివి. లిప్యంతరీకరణపై ఆధారపడితే ఆ శబ్దాలు ఎప్పటికీ సరిగ్గా రావు. ఇది తాత్కాలిక ఊతకర్రగా మాత్రమే ఉండాలి.",
          en: "It can help at the very start but does harm as a habit. Telugu has no equivalent for several Arabic sounds, ayn, ha, qaf and dad among them, and relying on transliteration means never producing them correctly. Treat it as a temporary crutch only.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సుకూన్ దేన్ని సూచిస్తుంది?", en: "What does sukun indicate?" },
        options: [
          { te: "ఆ అక్షరానికి స్వరం లేదు", en: "The letter carries no vowel" },
          { te: "అక్షరం రెట్టింపు", en: "The letter is doubled" },
          { te: "పదం ముగిసింది", en: "The word has ended" },
        ],
        answer: 0,
      },
      {
        question: { te: "తన్వీన్ ఏమి చేరుస్తుంది?", en: "What does tanween add?" },
        options: [
          { te: "చివర 'న్' శబ్దం", en: "An n sound at the end" },
          { te: "అక్షరాన్ని రెట్టింపు చేస్తుంది", en: "It doubles the letter" },
          { te: "స్వరాన్ని తొలగిస్తుంది", en: "It removes the vowel" },
        ],
        answer: 0,
      },
      {
        question: { te: "అరబిక్‌లో ఎన్ని చిన్న స్వరాలు ఉన్నాయి?", en: "How many short vowels does Arabic have?" },
        options: [
          { te: "మూడు", en: "Three" },
          { te: "ఐదు", en: "Five" },
          { te: "ఏడు", en: "Seven" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఫత్‌హా అ · కస్రా ఇ · దమ్మా ఉ.", en: "Fatha a, kasra i, damma u." },
      { te: "అలిఫ్, వావ్, యా = పొడవాటి స్వరాలు, రెండు కౌంట్‌లు.", en: "Alif, waw and ya make long vowels, two counts." },
      { te: "సుకూన్ ఆపు · షద్దా రెట్టింపు · తన్వీన్ 'న్'.", en: "Sukun stops, shadda doubles, tanween adds n." },
    ],
    summary: {
      te: "హరకాత్ అరబిక్ హల్లులకు స్వరాలను ఇచ్చే గుర్తులు: ఫత్‌హా, కస్రా, దమ్మా. అలిఫ్, వావ్, యా వాటిని రెట్టింపు నిడివికి పొడిగిస్తాయి. సుకూన్ స్వరం లేదని, షద్దా అక్షరం రెట్టింపని, తన్వీన్ చివర 'న్' శబ్దమని సూచిస్తాయి.",
      en: "The harakat give Arabic consonants their vowels: fatha, kasra and damma. Alif, waw and ya stretch them to double length. Sukun marks no vowel, shadda marks a doubled letter, and tanween adds a final n.",
    },
    apply: {
      te: "ఆచరణ: సూరా అల్-ఫాతిహా మొదటి ఆయతులో ప్రతి హరకాను గుర్తించి పేరు చెప్పండి.",
      en: "Apply it: name every haraka in the first verse of Surah al-Fatihah.",
    },
    reading: [
      { label: "The Arabic alphabet", url: "/knowledge-center/learn-arabic/alphabet" },
      { label: "Tajweed rules", url: "/knowledge-center/learn-quran/tajweed" },
    ],
  },

  {
    slug: "vocabulary",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 3 — మూలాలు మరియు పదజాలం",
      en: "Level 3 — Roots and vocabulary",
    },
    intro: {
      te: "అరబిక్ పదజాలం యాదృచ్ఛికం కాదు. దాదాపు ప్రతి పదం మూడు హల్లుల మూలం నుండి పుడుతుంది, మరియు ఆ మూలం ఒక నిర్దిష్ట నమూనాలో పెడితే ఊహించదగిన అర్థం వస్తుంది. ఇది తెలిస్తే ఒక పదం నేర్చుకుంటే పది వస్తాయి.",
      en: "Arabic vocabulary is not arbitrary. Almost every word grows from a root of three consonants, and putting that root into a given pattern yields a predictable meaning. Once you see this, learning one word gives you ten.",
    },
    sections: [
      {
        heading: { te: "మూడు హల్లుల మూలం", en: "The three-consonant root" },
        body: {
          te: "క-త-బ అనే మూలం 'రాయడం' అనే భావనను మోస్తుంది. దాని నుండి: కతబ (అతను రాశాడు), కితాబ్ (పుస్తకం), కాతిబ్ (రాసేవాడు), మక్తబ్ (కార్యాలయం, రాసే చోటు), మక్తూబ్ (రాయబడినది). ఐదు వేర్వేరు పదాలు, ఒకే మూడు హల్లులు, అన్నీ ఒకే భావనకు సంబంధించినవి. ఇది అరబిక్ నిర్మాణం మొత్తానికి పునాది.",
          en: "The root k-t-b carries the idea of writing. From it: kataba, he wrote; kitaab, a book; kaatib, a writer; maktab, an office, the place of writing; maktoob, something written. Five different words from the same three consonants, all circling one idea. This is the foundation of how Arabic is built.",
        },
        check: {
          question: { te: "'మక్తబ్' అంటే ఏమిటి?", en: "What does maktab mean?" },
          options: [
            { te: "కార్యాలయం — రాసే చోటు", en: "An office, the place of writing" },
            { te: "రాసేవాడు", en: "A writer" },
            { te: "పుస్తకం", en: "A book" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నమూనాలు అర్థాన్ని ఇస్తాయి", en: "The patterns carry meaning" },
        body: {
          te: "నమూనా (వజ్న్) అంటే మూలానికి చుట్టూ వచ్చే స్వరాలు, అదనపు అక్షరాలు. కొన్ని నమూనాలు స్థిరమైన అర్థాలను మోస్తాయి. 'ఫాఇల్' నమూనా చేసేవాడిని సూచిస్తుంది: కాతిబ్ (రాసేవాడు), ఆలిమ్ (తెలిసినవాడు), ముస్లిమ్ (సమర్పించేవాడు). 'మఫ్అల్' నమూనా స్థలాన్ని సూచిస్తుంది: మస్జిద్ (సజ్దా చేసే చోటు), మక్తబ్ (రాసే చోటు), మత్బఖ్ (వండే చోటు). నమూనా తెలిస్తే కొత్త పదం అర్థం ఊహించవచ్చు.",
          en: "A pattern is the vowels and extra letters wrapped around a root, and certain patterns carry fixed meanings. The faa'il pattern gives the doer: kaatib a writer, aalim one who knows, muslim one who submits. The maf'al pattern gives the place: masjid the place of prostration, maktab the place of writing, matbakh the place of cooking. Know the pattern and you can guess a new word.",
        },
        check: {
          question: { te: "'మస్జిద్' అనే పదం ఏ నమూనాకు చెందుతుంది?", en: "Which pattern does the word masjid belong to?" },
          options: [
            { te: "స్థలాన్ని సూచించే నమూనా", en: "The pattern that gives a place" },
            { te: "చేసేవాడిని సూచించే నమూనా", en: "The pattern that gives a doer" },
            { te: "ఏ నమూనాకూ కాదు", en: "No pattern at all" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇది ఖురాన్ చదవడంలో ఎలా సహాయపడుతుంది", en: "How this helps when reading the Quran" },
        body: {
          te: "ఒక ఆయతులో మీకు తెలియని పదం వచ్చినప్పుడు, దాని మూడు హల్లులను గుర్తించండి. ఆ మూలం మీకు వేరే పదం ద్వారా తెలిసి ఉండవచ్చు. ఉదాహరణకు 'రహ్మాన్', 'రహీమ్', 'రహ్మత్', 'మర్‌హూమ్' — అన్నీ ర-హ-మ్ మూలం నుండి, అన్నీ కారుణ్యానికి సంబంధించినవి. అనువాదం చూడకముందే మీరు దిశను పట్టుకోగలరు. ఇది కంఠస్థానికి కూడా సహాయపడుతుంది — పదాలు వేరుగా కాక కుటుంబాలుగా గుర్తుంటాయి.",
          en: "When an unfamiliar word appears in a verse, find its three consonants. You may already know that root through another word. Rahman, Raheem, rahmah and marhoom all come from r-h-m and all concern mercy. You can catch the direction before you reach for a translation. It helps memorisation too, because words stick as families rather than as isolated items.",
        },
      },
      {
        heading: { te: "ఎక్కడ మొదలుపెట్టాలి", en: "Where to start" },
        body: {
          te: "అన్ని పదాలూ ఒకేసారి కాదు. ఖురాన్‌లో అత్యధికంగా వచ్చే మూలాలతో మొదలుపెట్టండి: క-త-బ (రాయడం), ఎ-ల-మ్ (తెలియడం), ర-హ-మ్ (కారుణ్యం), ఎ-బ-ద్ (సేవ), స-ల-మ్ (శాంతి, సమర్పణ), హ-మ్-ద్ (స్తుతి). ప్రతి మూలానికి మీకు తెలిసిన పదాలను ఒక పేజీలో రాసుకోండి — 'ఇబాదత్', 'అబ్ద్', 'ఆబిద్' ఒకే కుటుంబం. ఈ ఆరు మూలాలే ఖురాన్‌లో వందలసార్లు వస్తాయి.",
          en: "Not all words at once. Start with the roots that recur most in the Quran: k-t-b writing, a-l-m knowing, r-h-m mercy, a-b-d worship and service, s-l-m peace and submission, h-m-d praise. Give each root a page and write under it the words you already know: ibaadah, abd and aabid are one family. These six roots alone appear hundreds of times.",
        },
      },
    ],
    takeaways: [
      { te: "దాదాపు ప్రతి అరబిక్ పదం మూడు హల్లుల మూలం నుండి పుడుతుంది.", en: "Almost every Arabic word grows from a root of three consonants." },
      { te: "నమూనాలు స్థిరమైన అర్థాలను మోస్తాయి — చేసేవాడు, స్థలం, మొదలైనవి.", en: "Patterns carry fixed meanings: the doer, the place, and so on." },
      { te: "పదాలను కుటుంబాలుగా నేర్చుకుంటే ఒకటికి పది వస్తాయి.", en: "Learning words in families turns one word into ten." },
    ],
    didYouKnow: [
      { te: "'ముస్లిమ్', 'ఇస్లామ్', 'సలామ్' మూడూ ఒకే మూలం స-ల-మ్ నుండి — శాంతి, సమర్పణ.", en: "Muslim, Islam and salam all come from the one root s-l-m, carrying peace and submission." },
      { te: "సాంప్రదాయ అరబిక్ నిఘంటువులు పదాలను అక్షరక్రమంలో కాక మూలం ప్రకారం అమర్చుతాయి.", en: "Traditional Arabic dictionaries are arranged by root rather than alphabetically." },
    ],
    reflect: [
      { te: "మీకు తెలిసిన ఇస్లామిక్ పదాలను తీసుకుని, ఏవి ఒకే మూలం నుండి వచ్చాయో గుర్తించండి.", en: "Take the Islamic words you already know and work out which share a root." },
    ],
    mistakes: [
      { te: "పదాలను జాబితాగా బట్టీ పట్టడం, మూలాలను గమనించకపోవడం — ఇది పదిరెట్లు కష్టం.", en: "Memorising words as a list without noticing the roots, which is ten times the work." },
      { te: "అదనపు అక్షరాలను మూలంలో భాగంగా భావించడం — 'మ' తరచూ నమూనాలో భాగం, మూలంలో కాదు.", en: "Mistaking pattern letters for root letters; an initial m is usually part of the pattern, not the root." },
    ],
    faqs: [
      {
        question: { te: "అన్ని మూలాలూ మూడు అక్షరాలేనా?", en: "Are all roots three letters?" },
        answer: {
          te: "అత్యధికం మూడు. కొన్ని నాలుగు అక్షరాల మూలాలు ఉన్నాయి — 'తర్జమ' (అనువదించు), 'జల్జల' (కదిలించు) వంటివి. కానీ మొదట మూడు అక్షరాల మూలాలపైనే దృష్టి పెట్టండి; అవే అధిక భాగం.",
          en: "The great majority are. A few have four, such as tarjama, to translate, and zalzala, to shake. Focus on the three-letter roots first; they make up most of the language.",
        },
      },
      {
        question: { te: "ఒక పదం మూలాన్ని ఎలా కనుక్కోవాలి?", en: "How do I find a word's root?" },
        answer: {
          te: "అదనపు అక్షరాలను తీసివేయండి. మొదట్లో 'మ', 'త', చివర 'ఆత్', 'ఊన్' వంటివి సాధారణంగా నమూనాలో భాగం. మిగిలిన మూడు హల్లులే మూలం. 'మక్తూబ్' నుండి 'మ', 'ఊ' తీసేస్తే క-త-బ మిగులుతుంది.",
          en: "Strip the pattern letters. An initial m or t, and endings like -aat or -oon, are usually pattern. The three consonants left are the root: take the m and the long u out of maktoob and k-t-b remains.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "క-త-బ మూలం ఏ భావనను మోస్తుంది?", en: "What idea does the root k-t-b carry?" },
        options: [
          { te: "రాయడం", en: "Writing" },
          { te: "చదవడం", en: "Reading" },
          { te: "నడవడం", en: "Walking" },
        ],
        answer: 0,
      },
      {
        question: { te: "'రహ్మాన్' ఏ మూలం నుండి వచ్చింది?", en: "Which root does Rahman come from?" },
        options: [
          { te: "ర-హ-మ్", en: "r-h-m" },
          { te: "ర-హ-న్", en: "r-h-n" },
          { te: "ర-మ్-హ్", en: "r-m-h" },
        ],
        answer: 0,
      },
      {
        question: { te: "'ముస్లిమ్', 'ఇస్లామ్', 'సలామ్' మధ్య సంబంధం ఏమిటి?", en: "What connects Muslim, Islam and salam?" },
        options: [
          { te: "ఒకే మూలం స-ల-మ్", en: "The shared root s-l-m" },
          { te: "ఏ సంబంధమూ లేదు", en: "Nothing at all" },
          { te: "అవి ఒకే పదం", en: "They are the same word" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "మూలం = మూడు హల్లులు. నమూనా = చుట్టూ ఉన్న స్వరాలు, అక్షరాలు.", en: "Root is three consonants; pattern is the vowels and letters around it." },
      { te: "ఫాఇల్ = చేసేవాడు. మఫ్అల్ = స్థలం.", en: "Faa'il gives the doer; maf'al gives the place." },
      { te: "మొదటి ఆరు మూలాలు: క-త-బ, ఎ-ల-మ్, ర-హ-మ్, ఎ-బ-ద్, స-ల-మ్, హ-మ్-ద్.", en: "First six roots: k-t-b, a-l-m, r-h-m, a-b-d, s-l-m, h-m-d." },
    ],
    summary: {
      te: "అరబిక్ పదజాలం మూడు హల్లుల మూలాలపై నిర్మితమైంది. మూలం భావనను ఇస్తుంది, నమూనా దాన్ని ఒక నిర్దిష్ట అర్థంగా మారుస్తుంది — చేసేవాడు, స్థలం, ఫలితం. పదాలను కుటుంబాలుగా నేర్చుకోవడమే వేగవంతమైన మార్గం.",
      en: "Arabic vocabulary is built on three-consonant roots. The root supplies the idea and the pattern turns it into a specific meaning: the doer, the place, the result. Learning words in families is the fastest route.",
    },
    apply: {
      te: "ఆచరణ: ర-హ-మ్ మూలం నుండి మీకు తెలిసిన పదాలన్నీ ఒక పేజీలో రాయండి.",
      en: "Apply it: write down every word you know from the root r-h-m on one page.",
    },
    reading: [
      { label: "Arabic vocabulary list", url: "/knowledge-center/learn-arabic" },
      { label: "Quranic Arabic", url: "/knowledge-center/learn-arabic/quranic" },
    ],
  },

  {
    slug: "grammar",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 4 — వ్యాకరణ ప్రాథమికాలు",
      en: "Level 4 — Grammar basics",
    },
    intro: {
      te: "అరబిక్ వ్యాకరణం భయపెట్టేదిగా అనిపిస్తుంది, కానీ దాని పునాది చాలా చిన్నది: ప్రతి పదం మూడు రకాల్లో ఒకటి, మరియు ప్రతి వాక్యం రెండు ఆకారాల్లో ఒకటి. ఇంతే తెలిస్తే ఖురాన్‌లో మీరు చూసేది చాలావరకు అర్థమవుతుంది.",
      en: "Arabic grammar sounds forbidding, but its foundation is small: every word is one of three kinds, and every sentence is one of two shapes. Knowing only that much makes a great deal of what you see in the Quran legible.",
    },
    sections: [
      {
        heading: { te: "ప్రతి పదం మూడింటిలో ఒకటి", en: "Every word is one of three" },
        body: {
          te: "ఇస్మ్ (నామవాచకం): వ్యక్తి, వస్తువు, గుణం, భావన — 'కితాబ్', 'రజుల్', 'కబీర్'. ఫిఅల్ (క్రియ): జరిగే పని, మరియు అది కాలాన్ని మోస్తుంది — 'కతబ' (రాశాడు), 'యక్తుబు' (రాస్తాడు). హర్ఫ్ (అవ్యయం): తనంతట తాను అర్థం లేనిది, ఇతర పదాలను కలిపేది — 'ఫీ' (లో), 'మిన్' (నుండి), 'అలా' (పై). అంతే, నాలుగోది లేదు. ఏ అరబిక్ పదాన్నైనా చూసినప్పుడు మొదటి ప్రశ్న: ఇది ఏ రకం?",
          en: "Ism, a noun: a person, thing, quality or idea, such as kitaab, rajul, kabeer. Fi'l, a verb: an action, and it carries tense, such as kataba he wrote and yaktubu he writes. Harf, a particle: no meaning standing alone, joining other words, such as fi in, min from, alaa on. That is the whole list; there is no fourth. Faced with any Arabic word, the first question is which of the three it is.",
        },
        check: {
          question: { te: "అరబిక్‌లో ఎన్ని రకాల పదాలు ఉన్నాయి?", en: "How many kinds of word are there in Arabic?" },
          options: [
            { te: "మూడు", en: "Three" },
            { te: "ఎనిమిది", en: "Eight" },
            { te: "ఐదు", en: "Five" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నిర్దిష్టం, అనిర్దిష్టం", en: "Definite and indefinite" },
        body: {
          te: "ఇంగ్లిష్‌లో 'a book' మరియు 'the book' అన్నట్లు అరబిక్‌లోనూ ఉంది, కానీ గుర్తులు వేరు. తన్వీన్ (చివర 'న్' శబ్దం) అంటే అనిర్దిష్టం: 'కితాబున్' = ఒక పుస్తకం. 'అల్' చేరిస్తే నిర్దిష్టం, తన్వీన్ పోతుంది: 'అల్-కితాబు' = ఆ పుస్తకం. ఈ ఒక్క నియమం తెలిస్తే ఖురాన్‌లో ప్రతి నామవాచకం గురించి ఒక విషయం వెంటనే తెలుస్తుంది.",
          en: "Arabic makes the same distinction as a book and the book, but marks it differently. Tanween, the final n, means indefinite: kitaabun is a book. Adding al makes it definite and the tanween drops: al-kitaabu is the book. This single rule tells you something immediately about every noun in the Quran.",
        },
        check: {
          question: { te: "'కితాబున్' అంటే ఏమిటి?", en: "What does kitaabun mean?" },
          options: [
            { te: "ఒక పుస్తకం (అనిర్దిష్టం)", en: "A book, indefinite" },
            { te: "ఆ పుస్తకం (నిర్దిష్టం)", en: "The book, definite" },
            { te: "పుస్తకాలు", en: "Books" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "రెండు కాదు, మూడు సంఖ్యలు", en: "Three numbers, not two" },
        body: {
          te: "ఇంగ్లిష్, తెలుగులో ఏకవచనం, బహువచనం మాత్రమే. అరబిక్‌లో మధ్యలో ఒకటి ఉంది — ద్వివచనం, సరిగ్గా ఇద్దరికి. 'ముస్లిమ్' ఒకరు, 'ముస్లిమాన్' ఇద్దరు, 'ముస్లిమూన్' ముగ్గురు లేదా అంతకంటే ఎక్కువ. ఇది ఖురాన్‌లో తరచూ కనిపిస్తుంది — 'రబ్బుల్ మష్రిఖైన్' అంటే 'రెండు తూర్పుల ప్రభువు'. అలాగే ప్రతి నామవాచకం పుంలింగమో స్త్రీలింగమో; స్త్రీలింగానికి సాధారణ గుర్తు చివర 'తా మర్బూతా'.",
          en: "English and Telugu have singular and plural. Arabic has one in between: the dual, for exactly two. Muslim is one, muslimaan is two, muslimoon is three or more. It appears often in the Quran, as in rabb al-mashriqayn, Lord of the two easts. Every noun is also masculine or feminine, the usual feminine marker being a ta marbuta at the end.",
        },
      },
      {
        heading: { te: "రెండు రకాల వాక్యాలు", en: "Two kinds of sentence" },
        body: {
          te: "నామ వాక్యం (జుమ్లా ఇస్మియ్యా) నామవాచకంతో మొదలవుతుంది, స్థితిని చెబుతుంది, మరియు 'ఉంది' అనే క్రియ అవసరం లేదు: 'అల్-బైతు కబీరున్' = 'ఇల్లు పెద్దది'. క్రియా వాక్యం (జుమ్లా ఫిఅలియ్యా) క్రియతో మొదలవుతుంది, పనిని చెబుతుంది: 'కతబ అల్-వలదు' = 'పిల్లవాడు రాశాడు' — అక్షరాలా 'రాశాడు పిల్లవాడు'. ఇంగ్లిష్ కంటే క్రియ ముందు రావడం అరబిక్‌లో సాధారణం.",
          en: "A nominal sentence begins with a noun, states a condition, and needs no verb for is: al-baytu kabeerun, the house is big. A verbal sentence begins with the verb and states an action: kataba al-waladu, the boy wrote, literally wrote the boy. Putting the verb first is normal in Arabic in a way it is not in English.",
        },
      },
    ],
    takeaways: [
      { te: "ప్రతి పదం ఇస్మ్, ఫిఅల్, లేదా హర్ఫ్.", en: "Every word is an ism, a fi'l or a harf." },
      { te: "తన్వీన్ = అనిర్దిష్టం. 'అల్' = నిర్దిష్టం.", en: "Tanween means indefinite; al means definite." },
      { te: "అరబిక్‌లో ఏక, ద్వి, బహువచనాలు — మూడు సంఖ్యలు.", en: "Arabic has three numbers: singular, dual and plural." },
    ],
    didYouKnow: [
      { te: "అరబిక్ నామ వాక్యాలకు 'ఉంది' అనే క్రియ అవసరం లేదు — 'అల్లాహు అక్బర్' లో క్రియ లేదు, అయినా అది పూర్తి వాక్యం.", en: "Arabic nominal sentences need no verb for is: Allahu akbar contains no verb yet is a complete sentence." },
      { te: "సీబవైహ్ అనే పండితుడు ఎనిమిదవ శతాబ్దంలో రాసిన 'అల్-కితాబ్' నేటికీ అరబిక్ వ్యాకరణానికి ప్రామాణిక గ్రంథం.", en: "Sibawayh's Al-Kitab, written in the eighth century, is still the reference work for Arabic grammar." },
    ],
    reflect: [
      { te: "'అల్లాహు అక్బర్' ఏ రకమైన వాక్యం? అందులో ప్రతి పదం ఏ రకం?", en: "What kind of sentence is Allahu akbar, and what kind of word is each part?" },
    ],
    mistakes: [
      { te: "నామ వాక్యంలో 'ఉంది' అనే క్రియను వెతకడం — అరబిక్‌లో అది ఉండదు.", en: "Looking for a verb meaning is in a nominal sentence, when Arabic has none." },
      { te: "ద్వివచనాన్ని బహువచనంగా చదవడం — 'ఇద్దరు' అనే అర్థం పోతుంది.", en: "Reading a dual as a plural and losing the sense of exactly two." },
      { te: "వ్యాకరణాన్ని మొదట పూర్తిగా నేర్చుకోవాలని అనుకోవడం — పదజాలంతో పాటు కొంచెం కొంచెంగా నేర్చుకోవడమే పనిచేస్తుంది.", en: "Trying to finish grammar before anything else, when it works best learned in small pieces alongside vocabulary." },
    ],
    faqs: [
      {
        question: { te: "ఇఅరాబ్ (పదాంత స్వరాలు) ఎందుకు మారుతాయి?", en: "Why do the vowels at the end of words change?" },
        answer: {
          te: "అవి వాక్యంలో పదం పాత్రను చూపుతాయి. కర్త అయితే దమ్మా ('అల్-వలదు'), కర్మ అయితే ఫత్‌హా ('అల్-వలద'), అవ్యయం తర్వాత కస్రా ('అల్-వలది'). ఇంగ్లిష్‌లో పదక్రమం చేసే పనిని అరబిక్‌లో ఈ స్వరాలు చేస్తాయి — అందుకే అరబిక్‌లో పదక్రమం సరళంగా ఉండగలదు.",
          en: "They show the word's role in the sentence: damma for the subject, fatha for the object, kasra after a particle. These endings do the work that word order does in English, which is why Arabic word order can be freer.",
        },
      },
      {
        question: { te: "ఖురాన్ అర్థం చేసుకోవడానికి ఎంత వ్యాకరణం అవసరం?", en: "How much grammar do I need to understand the Quran?" },
        answer: {
          te: "అనువాదాన్ని అనుసరించడానికి ఏమీ అక్కరలేదు. కానీ ఈ పాఠంలోని నాలుగు విషయాలు — మూడు పద రకాలు, నిర్దిష్టత, సంఖ్య, రెండు వాక్య రకాలు — తెలిస్తే మీరు అనువాదాన్ని అరబిక్‌తో సరిపోల్చుకోగలరు. అది పెద్ద మార్పు.",
          en: "None at all to follow a translation. But the four things in this lesson, the three word kinds, definiteness, number, and the two sentence shapes, let you line the translation up against the Arabic. That is a large step.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'ఫీ' (లో) ఏ రకమైన పదం?", en: "What kind of word is fi, meaning in?" },
        options: [
          { te: "హర్ఫ్ (అవ్యయం)", en: "A harf, a particle" },
          { te: "ఇస్మ్ (నామవాచకం)", en: "An ism, a noun" },
          { te: "ఫిఅల్ (క్రియ)", en: "A fi'l, a verb" },
        ],
        answer: 0,
      },
      {
        question: { te: "'ముస్లిమాన్' ఎంతమందిని సూచిస్తుంది?", en: "How many does muslimaan refer to?" },
        options: [
          { te: "సరిగ్గా ఇద్దరు", en: "Exactly two" },
          { te: "ఒకరు", en: "One" },
          { te: "చాలామంది", en: "Many" },
        ],
        answer: 0,
      },
      {
        question: { te: "'అల్లాహు అక్బర్' ఏ రకమైన వాక్యం?", en: "What kind of sentence is Allahu akbar?" },
        options: [
          { te: "నామ వాక్యం — క్రియ లేదు", en: "A nominal sentence, with no verb" },
          { te: "క్రియా వాక్యం", en: "A verbal sentence" },
          { te: "అది వాక్యం కాదు", en: "It is not a sentence" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఇస్మ్ · ఫిఅల్ · హర్ఫ్ — ఇంతే.", en: "Ism, fi'l, harf, and nothing else." },
      { te: "తన్వీన్ అనిర్దిష్టం; 'అల్' నిర్దిష్టం; రెండూ కలిసి రావు.", en: "Tanween indefinite, al definite, never both." },
      { te: "ఏక · ద్వి · బహు వచనాలు.", en: "Singular, dual, plural." },
    ],
    summary: {
      te: "అరబిక్ వ్యాకరణ పునాది చిన్నది: ప్రతి పదం ఇస్మ్, ఫిఅల్ లేదా హర్ఫ్; తన్వీన్ అనిర్దిష్టతను, 'అల్' నిర్దిష్టతను సూచిస్తాయి; సంఖ్యలు మూడు; వాక్యాలు నామ లేదా క్రియా రకం. ఇంతే తెలిస్తే ఖురాన్ నిర్మాణం చాలావరకు కనిపిస్తుంది.",
      en: "The foundation is small: every word is an ism, fi'l or harf; tanween marks indefinite and al marks definite; there are three numbers; and sentences are either nominal or verbal. That much makes most of the Quran's structure visible.",
    },
    apply: {
      te: "ఆచరణ: సూరా అల్-ఇఖ్లాస్ తీసుకుని, ప్రతి పదాన్ని ఇస్మ్, ఫిఅల్, హర్ఫ్‌గా గుర్తించండి.",
      en: "Apply it: take Surah al-Ikhlas and label each word as ism, fi'l or harf.",
    },
    reading: [
      { label: "Roots and vocabulary", url: "/knowledge-center/learn-arabic/vocabulary" },
      { label: "Quranic Arabic", url: "/knowledge-center/learn-arabic/quranic" },
    ],
  },

  {
    slug: "quranic",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 5 — ఖురానిక్ అరబిక్",
      en: "Level 5 — Quranic Arabic",
    },
    intro: {
      te: "ఖురాన్ అర్థం చేసుకోవడానికి అరబిక్ భాషలో ప్రావీణ్యం అవసరం లేదు. ఖురాన్ పదాల్లో అత్యధిక భాగం చాలా చిన్న పదాల సముదాయం నుండే వస్తుంది. ఆ సముదాయాన్ని నేర్చుకోవడమే ఇక్కడ లక్ష్యం.",
      en: "Understanding the Quran does not require fluency in Arabic. A very large share of its words comes from a surprisingly small set. Learning that set is the aim here.",
    },
    sections: [
      {
        heading: { te: "కొన్ని పదాలే చాలాసార్లు", en: "A few words, again and again" },
        body: {
          te: "ఖురాన్‌లో సుమారు 77,000 పదాలు ఉన్నాయి, కానీ వేర్వేరు మూలాలు రెండు వేలలోపే. ఇంకా ముఖ్యమైనది: అత్యధికంగా వచ్చే కొన్ని వందల పదాలు మొత్తం పాఠంలో సగానికిపైగా ఆక్రమిస్తాయి. అంటే మీరు ఐదు వందల పదాలు నేర్చుకుంటే, ఏ పేజీ తెరిచినా అందులో సగానికిపైగా పదాలు మీకు తెలిసినవే. ఇది సాధించదగిన లక్ష్యం — రోజుకు ఐదు పదాలు, నాలుగు నెలలు.",
          en: "The Quran has roughly 77,000 words but well under two thousand distinct roots. More useful still: a few hundred of the most frequent words account for over half the text. Learn five hundred words and more than half of any page you open is already familiar. That is a reachable target: five words a day for four months.",
        },
        check: {
          question: { te: "కొన్ని వందల పదాలు ఖురాన్‌లో ఎంత భాగాన్ని ఆక్రమిస్తాయి?", en: "A few hundred words account for how much of the Quran?" },
          options: [
            { te: "సగానికిపైగా", en: "More than half" },
            { te: "పదో వంతు", en: "About a tenth" },
            { te: "ఇరవయ్యో వంతు", en: "About a twentieth" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ముందుగా చిన్న పదాలు", en: "Start with the small words" },
        body: {
          te: "అత్యధికంగా వచ్చేవి అవ్యయాలు, సర్వనామాలు — నామవాచకాలు కాదు. 'మిన్' (నుండి), 'ఇలా' (వైపు), 'ఫీ' (లో), 'అలా' (పై), 'అన్' (గురించి), 'మా' (ఏమి, కాదు), 'లా' (కాదు), 'ఇన్న' (నిశ్చయంగా), 'అల్లజీ' (ఎవరైతే), 'కుల్' (చెప్పు). ఇవి కేవలం పది పదాలు, కానీ ప్రతి పేజీలోనూ డజన్ల సార్లు వస్తాయి. వీటిని ముందుగా నేర్చుకోవడం అత్యంత లాభదాయకం.",
          en: "The most frequent words are particles and pronouns rather than nouns: min from, ilaa towards, fi in, alaa on, an about, maa what or not, laa no, inna indeed, alladhee the one who, qul say. Ten words, appearing dozens of times on every page. Learning these first pays back faster than anything else.",
        },
        check: {
          question: { te: "'కుల్' అంటే ఏమిటి?", en: "What does qul mean?" },
          options: [
            { te: "చెప్పు", en: "Say" },
            { te: "చదువు", en: "Read" },
            { te: "విను", en: "Listen" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఫుస్‌హా — ఒకే ప్రామాణిక అరబిక్", en: "Fus-ha, the one standard Arabic" },
        body: {
          te: "అరబ్ దేశాల్లో మాట్లాడే మాండలికాలు చాలా వేర్వేరుగా ఉంటాయి — మొరాకో అరబిక్, ఈజిప్షియన్ అరబిక్ ఒకరికొకరు అర్థం కాకపోవచ్చు. కానీ ఫుస్‌హా — ప్రామాణిక అరబిక్ — అందరికీ ఉమ్మడి. ఖురాన్ ఫుస్‌హాలోనే ఉంది, మరియు దాని కారణంగానే ఈ భాష పద్నాలుగు శతాబ్దాలుగా దాదాపు మారకుండా నిలిచింది. మీరు ఖురానిక్ అరబిక్ నేర్చుకుంటే, ఏ అరబ్ దేశపు వార్తాపత్రికనైనా చదవగలరు.",
          en: "Spoken Arabic dialects differ widely; a Moroccan and an Egyptian may struggle with each other. But fus-ha, the standard register, is common to all. The Quran is in fus-ha, and largely because of the Quran the language has stayed close to unchanged for fourteen centuries. Learn Quranic Arabic and you can read a newspaper anywhere in the Arab world.",
        },
      },
      {
        heading: { te: "అనువాదంతో పాటు చదవడం", en: "Reading with the translation alongside" },
        body: {
          te: "ఆచరణాత్మక పద్ధతి: ఒక చిన్న సూరా ఎంచుకోండి. మొదట అరబిక్ చదవండి. తర్వాత అనువాదం చదవండి. తర్వాత మళ్ళీ అరబిక్ చదువుతూ, ప్రతి పదానికి అర్థాన్ని జోడించడానికి ప్రయత్నించండి. మీకు తెలిసిన పదాలు వచ్చినప్పుడు ఆగండి. ఒకే సూరాను ఒక వారం పాటు ఇలా చేస్తే, ఆ సూరాలోని ప్రతి పదం మీకు తెలుస్తుంది — మరియు ఆ పదాలు ఇతర సూరాల్లోనూ వస్తాయి.",
          en: "A practical method: pick a short surah. Read the Arabic. Read the translation. Read the Arabic again, trying to attach a meaning to each word, and pause where you recognise one. Do this with one surah for a week and you will know every word in it, and those words will turn up elsewhere.",
        },
      },
    ],
    takeaways: [
      { te: "కొన్ని వందల పదాలే ఖురాన్‌లో సగానికిపైగా ఆక్రమిస్తాయి.", en: "A few hundred words make up more than half the Quran." },
      { te: "ముందుగా చిన్న పదాలు: మిన్, ఫీ, అలా, మా, లా, ఇన్న, కుల్.", en: "Start with the small words: min, fi, alaa, maa, laa, inna, qul." },
      { te: "ఖురాన్ ఫుస్‌హాలో — ప్రామాణిక అరబిక్, అన్ని అరబ్ దేశాలకూ ఉమ్మడి.", en: "The Quran is in fus-ha, the standard Arabic common to the whole Arab world." },
    ],
    didYouKnow: [
      { te: "ఖురాన్‌లో సుమారు 77,000 పదాలు ఉన్నా, వేర్వేరు మూలాలు రెండు వేలలోపే.", en: "The Quran has around 77,000 words but fewer than two thousand distinct roots." },
      { te: "'కుల్' (చెప్పు) అనే ఒక్క పదం ఖురాన్‌లో మూడు వందలకుపైగా సార్లు వస్తుంది.", en: "The single word qul, say, occurs over three hundred times in the Quran." },
    ],
    reflect: [
      { te: "మీరు రోజుకు ఐదు పదాలు నేర్చుకుంటే నాలుగు నెలల్లో ఆరు వందల పదాలు. ఈ రోజు ఐదు ఎంచుకోగలరా?", en: "Five words a day is six hundred in four months. Could you choose five today?" },
    ],
    mistakes: [
      { te: "పెద్ద పదాలతో మొదలుపెట్టడం — చిన్న అవ్యయాలే అత్యధికంగా వస్తాయి.", en: "Starting with long words, when the small particles are what recur." },
      { te: "అనువాదం చదవడం మానేయడం — పదాలు నేర్చుకుంటున్నప్పుడు కూడా అనువాదం అవసరం.", en: "Giving up the translation while learning words, when you still need it." },
      { te: "మాండలిక అరబిక్ నేర్చుకుని ఖురాన్ అర్థమవుతుందని ఆశించడం.", en: "Learning a spoken dialect and expecting it to unlock the Quran." },
    ],
    faqs: [
      {
        question: { te: "ఏ అనువాదం మంచిది?", en: "Which translation should I use?" },
        answer: {
          te: "తెలుగులో మంచి అనువాదాలు అందుబాటులో ఉన్నాయి; మీ స్థానిక మస్జిద్‌లో అడగండి. ఏదైనా అనువాదం అర్థాన్ని దగ్గరగా చేరుస్తుందే తప్ప ఖురాన్ కాదు — అందుకే వాటిని 'అర్థ వివరణ' అంటారు. వీలైతే రెండు అనువాదాలు పోల్చి చూడండి.",
          en: "Good Telugu translations exist; ask at your local mosque. Any translation approaches the meaning rather than being the Quran itself, which is why they are usually called interpretations. Where you can, compare two.",
        },
      },
      {
        question: { te: "పదాలు నేర్చుకోవడానికి ఏ క్రమం మంచిది?", en: "In what order should I learn words?" },
        answer: {
          te: "అత్యధిక పౌనఃపున్యం ఉన్నవి ముందు — అవ్యయాలు, సర్వనామాలు, తర్వాత సాధారణ క్రియలు, తర్వాత నామవాచకాలు. అక్షరక్రమంలో కాకుండా పౌనఃపున్యం క్రమంలో నేర్చుకోవడం చాలా వేగవంతం.",
          en: "By frequency: particles and pronouns first, then common verbs, then nouns. Learning in frequency order rather than alphabetical order is far faster.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఫుస్‌హా అంటే ఏమిటి?", en: "What is fus-ha?" },
        options: [
          { te: "ప్రామాణిక అరబిక్, అన్ని అరబ్ దేశాలకూ ఉమ్మడి", en: "Standard Arabic, common across the Arab world" },
          { te: "ఈజిప్షియన్ మాండలికం", en: "The Egyptian dialect" },
          { te: "ఒక పఠన శైలి", en: "A style of recitation" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఏ పదాలను ముందుగా నేర్చుకోవాలి?", en: "Which words should be learned first?" },
        options: [
          { te: "అత్యధికంగా వచ్చే చిన్న పదాలు", en: "The small, most frequent words" },
          { te: "పొడవాటి నామవాచకాలు", en: "Long nouns" },
          { te: "అరుదైన పదాలు", en: "Rare words" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్‌లో వేర్వేరు మూలాలు ఎన్ని?", en: "How many distinct roots does the Quran use?" },
        options: [
          { te: "రెండు వేలలోపే", en: "Fewer than two thousand" },
          { te: "యాభై వేలు", en: "Fifty thousand" },
          { te: "ఒక లక్ష", en: "A hundred thousand" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "కొన్ని వందల పదాలు = సగానికిపైగా పాఠం.", en: "A few hundred words cover more than half the text." },
      { te: "ముందుగా: మిన్, ఇలా, ఫీ, అలా, మా, లా, ఇన్న, కుల్.", en: "First: min, ilaa, fi, alaa, maa, laa, inna, qul." },
      { te: "ఖురాన్ ఫుస్‌హాలో; మాండలికాలు వేరు.", en: "The Quran is fus-ha; dialects are separate." },
    ],
    summary: {
      te: "ఖురానిక్ అరబిక్ నేర్చుకోవడం అంటే భాషలో ప్రావీణ్యం కాదు. అత్యధికంగా వచ్చే కొన్ని వందల పదాలు — ముఖ్యంగా చిన్న అవ్యయాలు — నేర్చుకుంటే ఏ పేజీలోనైనా సగానికిపైగా అర్థమవుతుంది. ఖురాన్ ఫుస్‌హాలో ఉంది, అది అన్ని అరబ్ దేశాలకూ ఉమ్మడి.",
      en: "Learning Quranic Arabic is not about fluency. Learn the few hundred most frequent words, the small particles above all, and more than half of any page becomes legible. The Quran is in fus-ha, which is common to the whole Arab world.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం 'మిన్', 'ఫీ', 'అలా', 'మా', 'కుల్' — ఐదు పదాలను సూరా అల్-ఫాతిహా, అల్-ఇఖ్లాస్‌లో వెతకండి.",
      en: "Apply it: this week, hunt for min, fi, alaa, maa and qul in Surah al-Fatihah and al-Ikhlas.",
    },
    reading: [
      { label: "Roots and vocabulary", url: "/knowledge-center/learn-arabic/vocabulary" },
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
    ],
  },

  {
    slug: "daily",
    portal: "learn-arabic",
    title: {
      te: "స్థాయి 6 — రోజువారీ అరబిక్",
      en: "Level 6 — Everyday Arabic",
    },
    intro: {
      te: "ఈ పాఠం చదవడం గురించి కాదు, మాట్లాడటం గురించి. ముస్లింలు రోజూ ఉపయోగించే పదబంధాలు — పలకరింపులు, కృతజ్ఞత, అల్లాహ్ ఇష్టాన్ని ప్రస్తావించడం — వాటి అర్థం, ఎప్పుడు ఏది చెప్పాలో ఇక్కడ ఉంది.",
      en: "This lesson is about speaking rather than reading: the phrases Muslims use daily, what they actually mean, and when each one is said.",
    },
    sections: [
      {
        heading: { te: "పలకరింపు, దాని సమాధానం", en: "The greeting and its answer" },
        body: {
          te: "'అస్-సలాము అలైకుమ్' అంటే 'మీపై శాంతి కురియుగాక'. సమాధానం 'వ అలైకుముస్ సలామ్' — 'మీపై కూడా శాంతి'. పూర్తి రూపం: 'అస్-సలాము అలైకుమ్ వ రహ్మతుల్లాహి వ బరకాతుహ్' — 'మీపై శాంతి, అల్లాహ్ కారుణ్యం, ఆయన శుభాలు'. ఖురాన్ చెబుతుంది: 'మీకు పలకరింపుతో అభివాదం చేస్తే, దానికంటే మెరుగ్గా సమాధానం ఇవ్వండి, లేదా కనీసం అలాగే తిరిగి ఇవ్వండి' (అన్-నిసా 4:86). అంటే చిన్న రూపంతో పలకరిస్తే, పెద్ద రూపంతో సమాధానం ఇవ్వడం మంచిది.",
          en: "As-salaamu alaykum means peace be upon you. The reply is wa alaykum us-salaam, and upon you peace. The full form adds wa rahmatullahi wa barakaatuh: and Allah's mercy and blessings. The Quran says: 'When you are greeted with a greeting, answer with something better, or at least return it' (An-Nisa 4:86). So if someone gives the short form, answering with the longer one is better.",
        },
        check: {
          question: { te: "'అస్-సలాము అలైకుమ్' అంటే ఏమిటి?", en: "What does as-salaamu alaykum mean?" },
          options: [
            { te: "మీపై శాంతి కురియుగాక", en: "Peace be upon you" },
            { te: "శుభోదయం", en: "Good morning" },
            { te: "వీడ్కోలు", en: "Goodbye" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కృతజ్ఞత, ప్రశంస", en: "Thanks and praise" },
        body: {
          te: "'షుక్రన్' — ధన్యవాదాలు. దానికి సమాధానం 'అఫ్వన్' — పర్వాలేదు. 'జజాకల్లాహు ఖైరన్' — 'అల్లాహ్ మీకు మేలు ప్రసాదించుగాక'; ఇది ముస్లింల మధ్య ఎక్కువగా వాడే కృతజ్ఞత, ఎందుకంటే ఇది ప్రతిఫలాన్ని అల్లాహ్‌కు వదిలేస్తుంది. 'అల్‌హమ్దులిల్లాహ్' — 'సర్వ స్తుతి అల్లాహ్‌కే'; ఇది మంచి జరిగినప్పుడు, మరియు 'ఎలా ఉన్నారు?' అనే ప్రశ్నకు సమాధానంగా కూడా వాడతారు.",
          en: "Shukran is thank you, answered with afwan, you are welcome. Jazaak Allahu khayran means may Allah reward you with good, and is the thanks Muslims more often use, because it leaves the repaying to Allah. Alhamdulillah, all praise is for Allah, is said when something good happens and also as the answer to how are you.",
        },
      },
      {
        heading: { te: "అల్లాహ్ ఇష్టాన్ని ప్రస్తావించే పదబంధాలు", en: "The phrases that name Allah's will" },
        body: {
          te: "'ఇన్‌షా అల్లాహ్' — 'అల్లాహ్ కోరితే'; భవిష్యత్తు గురించి మాట్లాడేటప్పుడు చెప్పాలి. ఖురాన్ దీన్ని ప్రత్యేకంగా ఆదేశిస్తుంది: 'ఏ విషయం గురించీ నేను రేపు దీన్ని చేస్తాను అని అనకండి — అల్లాహ్ కోరితే అని తప్ప' (అల్-కహ్ఫ్ 18:23-24). 'మాషా అల్లాహ్' — 'అల్లాహ్ కోరినదే'; మంచిదాన్ని చూసినప్పుడు, మెచ్చుకున్నప్పుడు. 'బారకల్లాహు ఫీక్' — 'అల్లాహ్ మీలో బరకత్ ఇచ్చుగాక'. 'బిస్మిల్లాహ్' — ఏ పని మొదలుపెట్టేటప్పుడైనా.",
          en: "In shaa Allah, if Allah wills, is said when speaking of the future. The Quran instructs it directly: 'Never say of anything, I will do that tomorrow, without adding, if Allah wills' (Al-Kahf 18:23-24). Maa shaa Allah, what Allah has willed, is said on seeing something good. Baarak Allahu feek is may Allah bless you. Bismillah opens any task.",
        },
        check: {
          question: { te: "భవిష్యత్తు గురించి మాట్లాడేటప్పుడు ఏ పదబంధం చెప్పాలి?", en: "Which phrase is said when speaking about the future?" },
          options: [
            { te: "ఇన్‌షా అల్లాహ్", en: "In shaa Allah" },
            { te: "అల్‌హమ్దులిల్లాహ్", en: "Alhamdulillah" },
            { te: "షుక్రన్", en: "Shukran" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కష్టం, మరణం, క్షమాపణ", en: "Hardship, loss and forgiveness" },
        body: {
          te: "'ఇన్నా లిల్లాహి వ ఇన్నా ఇలైహి రాజిఊన్' — 'నిశ్చయంగా మేము అల్లాహ్‌కు చెందినవాళ్ళం, ఆయన వైపే మా మరలింపు'; మరణ వార్త విన్నప్పుడు, లేదా ఏదైనా కోల్పోయినప్పుడు. 'అస్తగ్‌ఫిరుల్లాహ్' — 'అల్లాహ్‌ను క్షమాపణ కోరుతున్నాను'; తప్పు చేసినప్పుడు, లేదా అనుచితమైనది విన్నప్పుడు. 'సుబ్‌హానల్లాహ్' — 'అల్లాహ్ పరిశుద్ధుడు'; ఆశ్చర్యం, గొప్పతనం చూసినప్పుడు. 'లా హౌల వలా ఖువ్వత ఇల్లా బిల్లాహ్' — 'అల్లాహ్ తప్ప శక్తి, బలం ఎవరికీ లేదు'; కష్టం ఎదురైనప్పుడు.",
          en: "Innaa lillaahi wa innaa ilayhi raaji'oon, we belong to Allah and to Him we return, is said on hearing of a death or any loss. Astaghfirullah, I seek Allah's forgiveness, is said after a fault or on hearing something improper. Subhanallah, glory be to Allah, is said at wonder. Laa hawla wa laa quwwata illa billah, there is no power or strength except with Allah, is said when facing difficulty.",
        },
      },
    ],
    takeaways: [
      { te: "పలకరింపుకు మెరుగైన సమాధానం ఇవ్వడం ఖురాన్ ఆదేశం (4:86).", en: "Answering a greeting with something better is a Quranic instruction (4:86)." },
      { te: "'ఇన్‌షా అల్లాహ్' భవిష్యత్తు గురించి; ఇది ఖురాన్ 18:23-24 ఆదేశం.", en: "In shaa Allah belongs to talk of the future, on the instruction of Quran 18:23-24." },
      { te: "'జజాకల్లాహు ఖైరన్' ప్రతిఫలాన్ని అల్లాహ్‌కు వదిలేస్తుంది.", en: "Jazaak Allahu khayran leaves the repaying to Allah." },
    ],
    didYouKnow: [
      { te: "'సలామ్' అల్లాహ్ పేర్లలో ఒకటి — 'అస్-సలామ్', శాంతికి మూలం. అంటే పలకరింపులో ఆయన పేరుతోనే శాంతిని కోరుతున్నాం.", en: "As-Salam, the source of peace, is one of Allah's names, so the greeting asks for peace by His own name." },
      { te: "ప్రవక్త ﷺ చెప్పారు: మీరు విశ్వసించేవరకు స్వర్గంలో ప్రవేశించరు, మీరు ఒకరినొకరు ప్రేమించేవరకు విశ్వసించరు — మరియు దానికి మార్గం సలామ్ వ్యాపింపజేయడం (ముస్లిం).", en: "The Prophet ﷺ said you will not enter Paradise until you believe, nor believe until you love one another, and the way to that is to spread the salam (Muslim)." },
    ],
    reflect: [
      { te: "మీరు రోజూ ఎన్నిసార్లు ఈ పదబంధాలు అంటారు? వాటిలో ఎన్నింటి అర్థం మీకు నిజంగా తెలుసు?", en: "How many times a day do you say these phrases, and how many of them do you actually know the meaning of?" },
    ],
    mistakes: [
      { te: "సలామ్‌కు సమాధానం ఇవ్వకపోవడం — దానికి సమాధానం ఇవ్వడం విధి.", en: "Not returning a salam, when answering it is an obligation." },
      { te: "'ఇన్‌షా అల్లాహ్'ను 'బహుశా, నాకు ఆసక్తి లేదు' అనే అర్థంలో వాడటం — ఇది పదబంధం అర్థాన్ని బోలుగా చేస్తుంది.", en: "Using in shaa Allah to mean probably not, which hollows the phrase out." },
      { te: "ముస్లిమేతరులకు సలామ్ చెప్పకూడదని అనుకోవడం — వారికి మర్యాదపూర్వక పలకరింపు చెప్పడంలో ఇబ్బంది లేదు.", en: "Thinking a courteous greeting cannot be given to a non-Muslim, when there is no difficulty in greeting them politely." },
    ],
    faqs: [
      {
        question: { te: "సలామ్ చెప్పడం ఎవరు మొదలుపెట్టాలి?", en: "Who should give the salam first?" },
        answer: {
          te: "ప్రవక్త ﷺ మార్గదర్శనం: నడిచేవాడు కూర్చున్నవాడికి, వాహనంలో ఉన్నవాడు నడిచేవాడికి, చిన్నవాడు పెద్దవాడికి, తక్కువ మంది ఎక్కువ మందికి (బుఖారీ). కానీ ఇది పోటీ కాదు — ముందు చెప్పినవాడే మెరుగు.",
          en: "The Prophet ﷺ guided that the one walking greets the one seated, the rider greets the walker, the younger greets the older, and the smaller group greets the larger (Bukhari). It is not a contest, though: whoever gives it first has the better of it.",
        },
      },
      {
        question: { te: "అరబిక్ పలకరింపు రాకపోతే తెలుగులో చెప్పవచ్చా?", en: "If I do not know the Arabic, may I greet in Telugu?" },
        answer: {
          te: "సలామ్ చెప్పడం సులభం, నేర్చుకోవడం విలువైనది — ఇది ముస్లింల ఉమ్మడి పలకరింపు. అయితే మీ మాతృభాషలో మర్యాదపూర్వకంగా పలకరించడంలో తప్పు లేదు. రెండూ చేయవచ్చు.",
          en: "The salam is short and worth learning, and it is the greeting Muslims share. But there is nothing wrong with a courteous greeting in your own language; you can do both.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'జజాకల్లాహు ఖైరన్' అంటే ఏమిటి?", en: "What does jazaak Allahu khayran mean?" },
        options: [
          { te: "అల్లాహ్ మీకు మేలు ప్రసాదించుగాక", en: "May Allah reward you with good" },
          { te: "అల్లాహ్ కోరితే", en: "If Allah wills" },
          { te: "సర్వ స్తుతి అల్లాహ్‌కే", en: "All praise is for Allah" },
        ],
        answer: 0,
      },
      {
        question: { te: "మరణ వార్త విన్నప్పుడు ఏమి చెబుతారు?", en: "What is said on hearing of a death?" },
        options: [
          { te: "ఇన్నా లిల్లాహి వ ఇన్నా ఇలైహి రాజిఊన్", en: "Innaa lillaahi wa innaa ilayhi raaji'oon" },
          { te: "మాషా అల్లాహ్", en: "Maa shaa Allah" },
          { te: "బారకల్లాహు ఫీక్", en: "Baarak Allahu feek" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్ 4:86 పలకరింపు గురించి ఏమి చెబుతుంది?", en: "What does Quran 4:86 say about greetings?" },
        options: [
          { te: "మెరుగ్గా సమాధానం ఇవ్వండి, లేదా కనీసం అలాగే", en: "Answer with better, or at least the same" },
          { te: "సమాధానం అవసరం లేదు", en: "No answer is needed" },
          { te: "అరబిక్‌లోనే చెప్పాలి", en: "It must be in Arabic" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "సలామ్ · వ అలైకుముస్ సలామ్ · జజాకల్లాహు ఖైరన్.", en: "Salaam, wa alaykum us-salaam, jazaak Allahu khayran." },
      { te: "ఇన్‌షా అల్లాహ్ భవిష్యత్తు · మాషా అల్లాహ్ మెచ్చుకోలు.", en: "In shaa Allah for the future, maa shaa Allah for admiration." },
      { te: "ఇన్నా లిల్లాహి... నష్టం · అస్తగ్‌ఫిరుల్లాహ్ క్షమాపణ.", en: "Innaa lillaahi for loss, astaghfirullah for forgiveness." },
    ],
    summary: {
      te: "రోజువారీ అరబిక్ పదబంధాలు కేవలం మర్యాద కాదు — ప్రతిదానికీ ఒక అర్థం, ఒక సందర్భం ఉన్నాయి. సలామ్‌కు మెరుగైన సమాధానం ఇవ్వడం, భవిష్యత్తుకు 'ఇన్‌షా అల్లాహ్' చేర్చడం ఖురాన్ ఆదేశాలు.",
      en: "These everyday phrases are not mere politeness; each carries a meaning and an occasion. Answering a greeting with better, and adding in shaa Allah to talk of the future, are both Quranic instructions.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం ప్రతి పలకరింపుకు పూర్తి రూపంతో సమాధానం ఇవ్వండి — 'వ అలైకుముస్ సలామ్ వ రహ్మతుల్లాహి వ బరకాతుహ్'.",
      en: "Apply it: this week answer every greeting with the full form, wa alaykum us-salaam wa rahmatullahi wa barakaatuh.",
    },
    reading: [
      { label: "Learn Arabic portal", url: "/knowledge-center/learn-arabic" },
      { label: "Everyday duas", url: "/knowledge-center/kids-islam/daily-duas" },
    ],
  },
];
