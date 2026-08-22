/* Learn Urdu — replacements for the six extracted lessons.

   The extracted versions ran to a median of 87 English words. Same slugs, so
   all-lessons.ts substitutes them in place.

   Urdu matters here beyond language: most Islamic teaching in South Asia
   happens in it, so these lessons keep one eye on that throughout. */
import type { Lesson } from "../lessons.ts";

export const urduLessons: Lesson[] = [
  {
    slug: "alphabet",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 1 — ఉర్దూ అక్షరమాల",
      en: "Level 1 — The Urdu alphabet",
    },
    intro: {
      te: "ఉర్దూ 39 అక్షరాలతో, కుడి నుండి ఎడమకు రాయబడుతుంది. దాని లిపి అరబిక్ నుండి వచ్చినా, దక్షిణాసియా శబ్దాల కోసం అదనపు అక్షరాలు చేర్చుకుంది. మీకు అరబిక్ తెలిస్తే సగం పని అయిపోయినట్లే.",
      en: "Urdu is written with 39 letters, right to left. Its script comes from Arabic but adds letters for sounds South Asian languages need. If you already read Arabic, half the work is done.",
    },
    sections: [
      {
        heading: { te: "అరబిక్ మీద నిర్మించినది", en: "Built on top of Arabic" },
        body: {
          te: "ఉర్దూ లిపి పర్షియన్ ద్వారా అరబిక్ నుండి వచ్చింది. అరబిక్‌లోని 28 అక్షరాలూ ఉర్దూలో ఉన్నాయి, అవే ఆకారాలతో. పర్షియన్ నాలుగు కొత్త అక్షరాలు చేర్చింది — 'పే', 'చే', 'జే', 'గాఫ్' — ఎందుకంటే అరబిక్‌లో ప, చ, జ (zh), గ శబ్దాలు లేవు. ఉర్దూ మరికొన్ని చేర్చింది. అందుకే మీరు ఖురాన్ చదవగలిగితే ఉర్దూ అక్షరాలు దాదాపు అన్నీ ఇప్పటికే తెలుసు.",
          en: "The Urdu script came from Arabic by way of Persian. All 28 Arabic letters are there with the same shapes. Persian added four that Arabic lacks the sounds for: pe, che, zhe and gaf, giving p, ch, zh and g. Urdu added more on top. So if you can read the Quran you already know most of the Urdu letters.",
        },
        check: {
          question: { te: "ఉర్దూ లిపి ఏ లిపి నుండి వచ్చింది?", en: "Where does the Urdu script come from?" },
          options: [
            { te: "పర్షియన్ ద్వారా అరబిక్ నుండి", en: "From Arabic, by way of Persian" },
            { te: "సంస్కృతం నుండి", en: "From Sanskrit" },
            { te: "స్వతంత్రంగా అభివృద్ధి చెందింది", en: "It developed independently" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "దక్షిణాసియా శబ్దాల కోసం అక్షరాలు", en: "Letters for South Asian sounds" },
        body: {
          te: "ఉర్దూ చేర్చిన ముఖ్యమైనవి రెండు వర్గాలు. మొదటిది 'రెట్రోఫ్లెక్స్' అక్షరాలు — 'టే', 'డాల్', 'రే' యొక్క గట్టి రూపాలు; వాటిపై చిన్న 'తోయ్' గుర్తు పెడతారు. తెలుగులో 'ట', 'డ' లాంటి శబ్దాలు ఇవి. రెండోది 'దో-చష్మీ హే' — రెండు కళ్ళ ఆకారంలో ఉండే ప్రత్యేక అక్షరం; ఇది ఇతర అక్షరాలతో కలిసి 'భ', 'ఫ', 'ఖ', 'ధ' వంటి ఊపిరి శబ్దాలను చేస్తుంది. ఇవి తెలుగు మాట్లాడేవారికి సహజం, కానీ అరబ్బులకు కష్టం.",
          en: "Urdu's own additions fall into two groups. First the retroflex letters, hard versions of te, dal and re, marked with a small toe above. These are the sounds Telugu writes with its own hard consonants. Second the do-chashmi he, a letter shaped like two eyes, which pairs with other letters to make the aspirated sounds bh, ph, kh and dh. Telugu speakers produce these naturally; Arabs find them hard.",
        },
        check: {
          question: { te: "'దో-చష్మీ హే' దేనికి ఉపయోగపడుతుంది?", en: "What is the do-chashmi he used for?" },
          options: [
            { te: "ఊపిరి శబ్దాలు — భ, ఫ, ఖ, ధ", en: "Aspirated sounds: bh, ph, kh, dh" },
            { te: "పొడవాటి స్వరాలు", en: "Long vowels" },
            { te: "సంఖ్యలు", en: "Numbers" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నస్తలీక్ — వాలుగా ప్రవహించే శైలి", en: "Nastaliq, the sloping style" },
        body: {
          te: "అరబిక్ సాధారణంగా 'నస్ఖ్' శైలిలో రాస్తారు — అక్షరాలు ఒకే గీతపై సమంగా ఉంటాయి. ఉర్దూ 'నస్తలీక్' శైలిలో రాస్తారు — ప్రతి పదం కుడి పై నుండి ఎడమ కిందికి వాలుతూ ఉంటుంది. అందుకే ఉర్దూ పాఠం మెట్ల వరుసలా కనిపిస్తుంది. ఇది కేవలం అలంకారం కాదు: పదం ఎక్కడ మొదలై ఎక్కడ ముగుస్తుందో ఈ వాలు స్పష్టం చేస్తుంది. మొదట కంటికి కష్టమనిపిస్తుంది, అలవాటైతే చదవడం సులభమవుతుంది.",
          en: "Arabic is usually set in naskh, where letters sit level on one line. Urdu is set in nastaliq, where each word slopes down from upper right to lower left, which is why a page of Urdu looks like a run of steps. This is not only decorative: the slope makes clear where one word starts and ends. It is hard on the eye at first and makes reading easier once you are used to it.",
        },
      },
      {
        heading: { te: "39 అక్షరాలు అనే సంఖ్య", en: "About that number, 39" },
        body: {
          te: "ఉర్దూ అక్షరాల సంఖ్యపై పుస్తకాలు ఏకీభవించవు — 37, 38, 39, 40 అని వేర్వేరుగా చెబుతాయి. కారణం: కొన్ని అక్షరాలను వేరుగా లెక్కించాలా లేదా అని భేదం. ఉదాహరణకు రెట్రోఫ్లెక్స్ రూపాలను వేరు అక్షరాలుగా లెక్కిస్తారా, లేక అదే అక్షరం రూపాంతరాలుగానా? ఈ సంఖ్యపై ఆందోళన అనవసరం. ముఖ్యమైనది ఆకారాలను గుర్తుపట్టడం, సంఖ్యను బట్టీ పట్టడం కాదు.",
          en: "Books disagree on how many letters Urdu has, giving 37, 38, 39 or 40. The disagreement is about what to count separately: are the retroflex forms distinct letters, or variants of the same one? The number is not worth worrying about. Recognising the shapes is what matters, not memorising a count.",
        },
      },
    ],
    takeaways: [
      { te: "ఉర్దూ లిపి అరబిక్ మీద నిర్మితం — అరబిక్ 28 అక్షరాలూ అందులో ఉన్నాయి.", en: "The Urdu script is built on Arabic; all 28 Arabic letters are in it." },
      { te: "అదనపు అక్షరాలు దక్షిణాసియా శబ్దాల కోసం — రెట్రోఫ్లెక్స్, ఊపిరి శబ్దాలు.", en: "The extra letters exist for South Asian sounds: retroflex and aspirated." },
      { te: "నస్తలీక్ శైలిలో ప్రతి పదం వాలుగా దిగుతుంది.", en: "In nastaliq each word slopes downward." },
    ],
    didYouKnow: [
      { te: "నస్తలీక్ కారణంగా ఉర్దూ వార్తాపత్రికలు దశాబ్దాల పాటు చేతిరాతతోనే ముద్రించబడేవి — కంప్యూటర్ ఫాంట్‌లు ఆ వాలును సరిగ్గా చేయలేకపోయేవి.", en: "Because of nastaliq, Urdu newspapers were printed from handwriting for decades; computer fonts could not manage the slope." },
      { te: "'ఉర్దూ' అనే పదానికి మూలం తుర్కీ 'ఓర్దు' — శిబిరం, సైన్యం. ఇంగ్లిష్ 'horde' కూడా అదే మూలం.", en: "The word Urdu comes from the Turkish ordu, a camp or army, the same root that gives English horde." },
    ],
    reflect: [
      { te: "మీకు అరబిక్ అక్షరాలు తెలిస్తే, ఉర్దూలో మీకు కొత్తవి ఎన్ని ఉంటాయో ఆలోచించండి — చాలా తక్కువ.", en: "If you know the Arabic letters, consider how few would actually be new to you in Urdu." },
    ],
    mistakes: [
      { te: "ఉర్దూ అరబిక్‌కు పూర్తిగా వేరే లిపి అనుకోవడం — అది అరబిక్ లిపి విస్తరణ.", en: "Treating Urdu as a wholly separate script, when it is an extension of the Arabic one." },
      { te: "నస్తలీక్ వాలును చూసి పదాలు వేరుగా ఉన్నాయని పొరపడటం.", en: "Reading the nastaliq slope as though it separates words that belong together." },
      { te: "అక్షరాల సంఖ్యపై ఆందోళన పడటం — ఆకారాలను నేర్చుకోవడమే ముఖ్యం.", en: "Worrying about the letter count instead of learning the shapes." },
    ],
    faqs: [
      {
        question: { te: "అరబిక్ వచ్చిన వారికి ఉర్దూ ఎంత సులభం?", en: "How much easier is Urdu for someone who reads Arabic?" },
        answer: {
          te: "లిపి పరంగా చాలా సులభం — అక్షరాలు దాదాపు అన్నీ తెలుసు, కొత్తవి పది లోపే. కానీ భాష వేరు: ఉర్దూ వ్యాకరణం, పదక్రమం భారతీయ భాషలకు దగ్గర, అరబిక్‌కు కాదు. లిపి తెలిసినా భాష విడిగా నేర్చుకోవాలి.",
          en: "Very much easier for the script: nearly all the letters are familiar and fewer than ten are new. The language is another matter, since Urdu grammar and word order sit closer to Indian languages than to Arabic. The script transfers; the language must still be learned.",
        },
      },
      {
        question: { te: "ఉర్దూ, హిందీ ఒకటేనా?", en: "Are Urdu and Hindi the same language?" },
        answer: {
          te: "మాట్లాడేటప్పుడు రోజువారీ ఉర్దూ, హిందీ దాదాపు ఒకటే — ఇద్దరూ ఒకరినొకరు అర్థం చేసుకుంటారు. తేడాలు రెండు: లిపి (ఉర్దూ నస్తలీక్, హిందీ దేవనాగరి) మరియు ఉన్నత పదజాలం (ఉర్దూ అరబిక్, పర్షియన్ నుండి; హిందీ సంస్కృతం నుండి).",
          en: "In everyday speech they are close enough that speakers understand each other. The differences are the script, nastaliq against devanagari, and the higher vocabulary, which Urdu draws from Arabic and Persian and Hindi from Sanskrit.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "పర్షియన్ చేర్చిన అక్షరాలు ఏ శబ్దాల కోసం?", en: "The letters Persian added cover which sounds?" },
        options: [
          { te: "ప, చ, జ, గ", en: "p, ch, zh, g" },
          { te: "ఐన్, హా", en: "ayn and ha" },
          { te: "పొడవాటి స్వరాలు", en: "long vowels" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఉర్దూ ఏ కాలిగ్రఫీ శైలిలో రాస్తారు?", en: "Which calligraphic style is Urdu written in?" },
        options: [
          { te: "నస్తలీక్", en: "Nastaliq" },
          { te: "నస్ఖ్", en: "Naskh" },
          { te: "కూఫీ", en: "Kufic" },
        ],
        answer: 0,
      },
      {
        question: { te: "అరబిక్ 28 అక్షరాలలో ఉర్దూలో ఎన్ని ఉన్నాయి?", en: "How many of Arabic's 28 letters appear in Urdu?" },
        options: [
          { te: "అన్నీ 28", en: "All 28" },
          { te: "సగం", en: "About half" },
          { te: "ఏవీ లేవు", en: "None" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అరబిక్ 28 + పర్షియన్ 4 + ఉర్దూ అదనపువి.", en: "Arabic's 28, plus Persian's four, plus Urdu's own." },
      { te: "రెట్రోఫ్లెక్స్ (తోయ్ గుర్తు) + దో-చష్మీ హే (ఊపిరి శబ్దాలు).", en: "Retroflex letters marked with a toe, plus do-chashmi he for aspirates." },
      { te: "నస్తలీక్ = వాలుగా దిగే శైలి.", en: "Nastaliq is the downward-sloping style." },
    ],
    summary: {
      te: "ఉర్దూ లిపి అరబిక్ మీద పర్షియన్ ద్వారా నిర్మితమైంది, దక్షిణాసియా శబ్దాల కోసం అదనపు అక్షరాలతో. అరబిక్ చదవగలిగినవారికి ఇది చాలా సులభం. నస్తలీక్ శైలి ప్రతి పదాన్ని వాలుగా దించుతుంది.",
      en: "The Urdu script is Arabic by way of Persian, with extra letters for South Asian sounds. Anyone who reads Arabic has most of it already. The nastaliq style slopes each word downward.",
    },
    apply: {
      te: "ఆచరణ: ఉర్దూ అక్షరమాల పేజీలో, అరబిక్‌లో లేని అక్షరాలను గుర్తించండి.",
      en: "Apply it: on the Urdu alphabet page, pick out the letters Arabic does not have.",
    },
    reading: [
      { label: "Urdu alphabet with audio", url: "/knowledge-center/learn-urdu" },
      { label: "Reading basics", url: "/knowledge-center/learn-urdu/reading" },
    ],
  },

  {
    slug: "reading",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 2 — చదవడం ప్రాథమికాలు",
      en: "Level 2 — Reading basics",
    },
    intro: {
      te: "అక్షరాలు తెలిసిన తర్వాత అసలు పని మొదలవుతుంది: వాటిని కలిపి పదాలుగా చదవడం. ఉర్దూలో ఇబ్బంది ఏమిటంటే ముద్రిత పాఠంలో స్వర గుర్తులు ఉండవు — వాటిని మీరే ఊహించాలి.",
      en: "Once you know the letters the real work starts: joining them into words. The difficulty in Urdu is that printed text carries no vowel marks, so you have to supply them yourself.",
    },
    sections: [
      {
        heading: { te: "ఏవి కలుస్తాయి, ఏవి కలవవు", en: "What joins and what does not" },
        body: {
          te: "అరబిక్‌లో లాగే ఉర్దూలోనూ చాలా అక్షరాలు తర్వాతి అక్షరంతో కలుస్తాయి. కలవనివి: అలిఫ్, దాల్ (దాని రెట్రోఫ్లెక్స్ రూపంతో సహా), ధాల్, రే (దాని రెట్రోఫ్లెక్స్ రూపంతో సహా), జే, జే (పర్షియన్), వావ్. ఇవి ముందున్న అక్షరంతో కలుస్తాయి కానీ తర్వాతిదానితో కాదు. నస్తలీక్‌లో ఈ విరుపు మరింత స్పష్టంగా కనిపిస్తుంది — పదం అక్కడ 'మెట్టు' దిగుతుంది.",
          en: "As in Arabic, most Urdu letters join to the one after. The exceptions are alif, dal and its retroflex form, dhal, re and its retroflex form, ze, zhe and waw. They join to the letter before but not the letter after. In nastaliq that break is more visible, because the word takes a step down there.",
        },
        check: {
          question: { te: "కలవని అక్షరాలు ఏ దిశలో కలుస్తాయి?", en: "The non-joining letters connect in which direction?" },
          options: [
            { te: "ముందున్న అక్షరంతో మాత్రమే", en: "Only to the letter before" },
            { te: "తర్వాతి అక్షరంతో మాత్రమే", en: "Only to the letter after" },
            { te: "ఏ దిశలోనూ కలవవు", en: "In neither direction" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అఅరాబ్ — స్వర గుర్తులు", en: "Aerab, the vowel marks" },
        body: {
          te: "ఉర్దూలో స్వర గుర్తులను 'అఅరాబ్' అంటారు. జబర్ (అక్షరం పైన గీత) 'అ', జేర్ (కింద గీత) 'ఇ', పేష్ (పైన చిన్న ఉంగరం) 'ఉ'. ఇవి అరబిక్ ఫత్‌హా, కస్రా, దమ్మాకు ఉర్దూ పేర్లే — గుర్తులు ఒకటే, పేర్లు వేరు. జజ్మ్ (సుకూన్) స్వరం లేదని, తష్దీద్ (షద్దా) అక్షరం రెట్టింపని చెబుతాయి.",
          en: "Urdu calls the vowel marks aerab. Zabar, a stroke above, gives a. Zer, a stroke below, gives i. Pesh, a small loop above, gives u. These are the Urdu names for Arabic's fatha, kasra and damma; the marks are identical and only the names differ. Jazm is sukun, no vowel, and tashdeed is shadda, a doubled letter.",
        },
        check: {
          question: { te: "'జేర్' ఏ శబ్దం ఇస్తుంది?", en: "What sound does zer give?" },
          options: [
            { te: "ఇ", en: "i" },
            { te: "అ", en: "a" },
            { te: "ఉ", en: "u" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అసలు కష్టం: గుర్తులు ఉండవు", en: "The real difficulty: the marks are absent" },
        body: {
          te: "ఇక్కడే ఉర్దూ, ఖురానిక్ అరబిక్ వేరవుతాయి. ఖురాన్ ప్రతుల్లో ప్రతి స్వర గుర్తూ ఉంటుంది. ఉర్దూ వార్తాపత్రికలు, పుస్తకాలు, సైన్‌బోర్డులలో ఏవీ ఉండవు. అంటే ఒక పదాన్ని చూసి, సందర్భం నుండి దాని స్వరాలను మీరే ఊహించాలి. దీనికి ఒకే మార్గం: పదజాలం. మీకు పదం తెలిస్తే స్వరాలు తెలుస్తాయి. కాబట్టి ఉర్దూ చదవడం నేర్చుకోవడం అంటే పదాలు నేర్చుకోవడమే.",
          en: "This is where Urdu parts from Quranic Arabic. A Quran marks every vowel. Urdu newspapers, books and signboards mark none. So you look at a word and supply its vowels from context. There is only one route to that: vocabulary. If you know the word, you know the vowels. Learning to read Urdu is therefore mostly learning words.",
        },
      },
      {
        heading: { te: "ఎలా సాధన చేయాలి", en: "How to practise" },
        body: {
          te: "అఅరాబ్ ఉన్న పాఠంతో మొదలుపెట్టండి — పిల్లల పుస్తకాలు, ప్రాథమిక ఖాయిదా, లేదా ఉర్దూ దుఆల పుస్తకాలు సాధారణంగా గుర్తులతో ఉంటాయి. మీకు ఇప్పటికే అర్థం తెలిసిన పాఠాన్ని చదవండి — దుఆలు, కలిమాలు మంచి ఎంపిక, ఎందుకంటే మీకు అవి కంఠస్థం. తర్వాత గుర్తులు లేని సరళ పాఠానికి మారండి. బిగ్గరగా చదవండి; ఉర్దూలో పొరపాటు వినిపిస్తుంది.",
          en: "Start with marked text: children's books, a beginner's qaida, or Urdu du'a books usually carry the marks. Read material whose meaning you already know, and duas and the kalimas are good choices because you have them by heart. Then move to simple unmarked text. Read aloud; in Urdu a mistake is audible.",
        },
      },
    ],
    takeaways: [
      { te: "కలవని అక్షరాలు: అలిఫ్, దాల్, ధాల్, రే, జే, జే, వావ్.", en: "Non-joiners: alif, dal, dhal, re, ze, zhe, waw." },
      { te: "జబర్ అ · జేర్ ఇ · పేష్ ఉ — అరబిక్ గుర్తులకే ఉర్దూ పేర్లు.", en: "Zabar a, zer i, pesh u: Urdu names for the Arabic marks." },
      { te: "ముద్రిత ఉర్దూలో గుర్తులు ఉండవు — పదజాలమే వాటి స్థానం.", en: "Printed Urdu has no marks, and vocabulary takes their place." },
    ],
    didYouKnow: [
      { te: "ఉర్దూ పాఠశాల పుస్తకాల్లో మొదటి తరగతి వరకే అఅరాబ్ ఉంటాయి — తర్వాత పిల్లలు వాటి లేకుండా చదవాలి.", en: "Urdu school books carry the aerab only for the earliest classes; after that children read without them." },
    ],
    reflect: [
      { te: "మీకు కంఠస్థం ఉన్న ఒక దుఆను ఉర్దూలో చదవడానికి ప్రయత్నించండి — తెలిసిన అర్థం చదవడాన్ని ఎంత సులభం చేస్తుందో గమనించండి.", en: "Try reading a du'a you know by heart in Urdu, and notice how much knowing the meaning helps." },
    ],
    mistakes: [
      { te: "గుర్తులు లేని పాఠంతో మొదలుపెట్టడం — నిరాశ ఖాయం.", en: "Starting with unmarked text, which reliably leads to giving up." },
      { te: "మౌనంగా చదవడం — బిగ్గరగా చదివితేనే స్వరాల పొరపాట్లు తెలుస్తాయి.", en: "Reading silently, when only reading aloud reveals vowel errors." },
      { te: "అర్థం తెలియని పాఠాన్ని ఎంచుకోవడం — తెలిసిన పాఠమే వేగంగా నేర్పుతుంది.", en: "Choosing text whose meaning you do not know, when familiar text teaches faster." },
    ],
    faqs: [
      {
        question: { te: "గుర్తులు లేకుండా ఎప్పుడు చదవగలను?", en: "When will I read without the marks?" },
        answer: {
          te: "ఇది సమయం కాదు, పదాల సంఖ్య. మీకు ఒక వెయ్యి పదాలు తెలిస్తే సాధారణ పాఠం చదవగలరు. రోజుకు ఐదు పదాలు నేర్చుకుంటే ఏడాదిలో అక్కడికి చేరతారు.",
          en: "It is not a matter of time but of word count. With about a thousand words you can read ordinary text. Five words a day gets you there inside a year.",
        },
      },
      {
        question: { te: "ఉర్దూ చదవడానికి ఏ పుస్తకంతో మొదలుపెట్టాలి?", en: "Which book should I start with?" },
        answer: {
          te: "'ఉర్దూ ఖాయిదా' అనే ప్రాథమిక పుస్తకం దీనికే రూపొందించబడింది; స్థానిక మదరసాలో దొరుకుతుంది. దానితో పాటు మీకు కంఠస్థమైన దుఆల పుస్తకం ఉపయోగించండి.",
          en: "An Urdu qaida, the beginner's primer, is made for exactly this and is available at any local madrasa. Alongside it use a du'a book whose contents you already know by heart.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ముద్రిత ఉర్దూ వార్తాపత్రికలో అఅరాబ్ ఉంటాయా?", en: "Does a printed Urdu newspaper carry the aerab?" },
        options: [
          { te: "ఉండవు", en: "No" },
          { te: "ఎప్పుడూ ఉంటాయి", en: "Always" },
          { te: "మొదటి పేజీలో మాత్రమే", en: "Only on the front page" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తష్దీద్' దేన్ని సూచిస్తుంది?", en: "What does tashdeed indicate?" },
        options: [
          { te: "అక్షరం రెట్టింపు", en: "A doubled letter" },
          { te: "స్వరం లేదు", en: "No vowel" },
          { te: "పదాంతం", en: "The end of a word" },
        ],
        answer: 0,
      },
      {
        question: { te: "గుర్తులు లేని ఉర్దూ చదవడానికి ఏమి అవసరం?", en: "What does reading unmarked Urdu require?" },
        options: [
          { te: "పదజాలం", en: "Vocabulary" },
          { te: "వేగం", en: "Speed" },
          { te: "అరబిక్ వ్యాకరణం", en: "Arabic grammar" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "జబర్ అ · జేర్ ఇ · పేష్ ఉ · జజ్మ్ ఆపు · తష్దీద్ రెట్టింపు.", en: "Zabar a, zer i, pesh u, jazm stop, tashdeed double." },
      { te: "ముద్రిత ఉర్దూ = గుర్తులు లేవు.", en: "Printed Urdu carries no marks." },
      { te: "తెలిసిన పాఠంతో, బిగ్గరగా సాధన.", en: "Practise aloud, on text you already know." },
    ],
    summary: {
      te: "ఉర్దూ చదవడం అంటే అక్షరాలను కలపడం, స్వరాలను ఊహించడం. జబర్, జేర్, పేష్ గుర్తులు ప్రాథమిక పుస్తకాల్లోనే ఉంటాయి; సాధారణ పాఠంలో ఉండవు. అందుకే చదవడం నేర్చుకోవడం అంటే పదాలు నేర్చుకోవడమే.",
      en: "Reading Urdu means joining letters and supplying the vowels. Zabar, zer and pesh appear in primers but not in ordinary text, which is why learning to read is largely learning words.",
    },
    apply: {
      te: "ఆచరణ: మీకు కంఠస్థమైన కలిమాను ఉర్దూ లిపిలో చదవడానికి ప్రయత్నించండి.",
      en: "Apply it: try reading a kalima you know by heart in the Urdu script.",
    },
    reading: [
      { label: "The Urdu alphabet", url: "/knowledge-center/learn-urdu/alphabet" },
      { label: "Writing skills", url: "/knowledge-center/learn-urdu/writing" },
    ],
  },

  {
    slug: "writing",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 3 — రాయడం నేర్చుకోవడం",
      en: "Level 3 — Learning to write",
    },
    intro: {
      te: "ఉర్దూ రాయడం అరబిక్ రాయడం కంటే వేరు, ఎందుకంటే నస్తలీక్ శైలిలో పదం సమతలంగా ఉండదు — అది వాలుతుంది. ఈ పాఠం అక్షర క్రమం, వాలు, చుక్కలు ఎప్పుడు పెట్టాలి అనేవి వివరిస్తుంది.",
      en: "Writing Urdu differs from writing Arabic because in nastaliq a word does not sit level, it slopes. This lesson covers stroke order, the slope, and when to add the dots.",
    },
    sections: [
      {
        heading: { te: "వాలు — నస్తలీక్ కేంద్ర నియమం", en: "The slope, which is the whole of nastaliq" },
        body: {
          te: "ప్రతి పదం కుడి పైన మొదలై ఎడమ కిందికి దిగుతుంది. ఒక పదంలోని అక్షరాలు ఒకే గీతపై ఉండవు; ప్రతి అక్షరం ముందుదాని కంటే కొంచెం కింద ఉంటుంది. పదం ముగిసిన తర్వాత తర్వాతి పదం మళ్ళీ పైనుండి మొదలవుతుంది. అందుకే ఉర్దూ పంక్తి మెట్ల వరుసలా కనిపిస్తుంది. కొత్తవారు చేసే అతిపెద్ద పొరపాటు అరబిక్ లాగా సమతలంగా రాయడం — అప్పుడు అది ఉర్దూలా కనిపించదు.",
          en: "Every word begins at the upper right and descends to the lower left. The letters within a word do not share a baseline; each sits a little below the last. When the word ends, the next starts high again. That is why a line of Urdu looks like a flight of steps. The commonest beginner error is writing level, as in Arabic, which simply does not look like Urdu.",
        },
        check: {
          question: { te: "నస్తలీక్‌లో పదం ఏ దిశలో వాలుతుంది?", en: "In nastaliq, which way does a word slope?" },
          options: [
            { te: "కుడి పైనుండి ఎడమ కిందికి", en: "From upper right to lower left" },
            { te: "ఎడమ కిందినుండి కుడి పైకి", en: "From lower left to upper right" },
            { te: "అది వాలదు", en: "It does not slope" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "చుక్కలు చివరిలో", en: "Dots last" },
        body: {
          te: "ఒక పదాన్ని రాసేటప్పుడు ముందు అక్షరాల అస్థిపంజరాన్ని పూర్తిగా రాయండి — కలంను ఎత్తకుండా వీలైనంత వరకు. తర్వాత చుక్కలు, గుర్తులు పెట్టండి. ఇదే సాంప్రదాయ క్రమం, మరియు దీనికి కారణం ఉంది: చుక్కలు మధ్యలో పెడితే అస్థిపంజరం ప్రవాహం విరిగిపోతుంది, రాత అసమానంగా కనిపిస్తుంది. మొదట ఆకారం, తర్వాత గుర్తులు.",
          en: "Write the skeleton of the whole word first, lifting the pen as little as possible, then add the dots and marks. This is the traditional order and there is a reason for it: stopping mid-word to place dots breaks the flow of the skeleton and the writing comes out uneven. Shape first, marks after.",
        },
        check: {
          question: { te: "చుక్కలను ఎప్పుడు పెట్టాలి?", en: "When should the dots be added?" },
          options: [
            { te: "పదం ఆకారం పూర్తయిన తర్వాత", en: "After the word's shape is complete" },
            { te: "ప్రతి అక్షరం తర్వాత వెంటనే", en: "Immediately after each letter" },
            { te: "పదం రాయడానికి ముందు", en: "Before writing the word" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అక్షరాలు ఎలా మొదలవుతాయి", en: "How a letter is formed" },
        body: {
          te: "ప్రతి అక్షరం కుడివైపు నుండి మొదలవుతుంది — ఇది కుడి నుండి ఎడమకు రాసే లిపి కాబట్టి సహజం. చాలా అక్షరాలు ఒకే స్ట్రోక్‌లో పూర్తవుతాయి. కలంను నిలువుగా కాకుండా కొంచెం వాలుగా పట్టుకోవడం నస్తలీక్‌కు కీలకం — దాని వల్లే మందపాటి, సన్నని గీతలు సహజంగా వస్తాయి. సాంప్రదాయకంగా 'ఖత్' అనే చెక్క కలంతో రాసేవారు; సాధారణ కలంతో కూడా వాలుగా పట్టుకుంటే మంచి ఫలితం వస్తుంది.",
          en: "Every letter starts from its right side, which follows from the script running right to left. Most are completed in a single stroke. Holding the pen at a slight angle rather than upright is central to nastaliq: that angle is what produces the thick and thin strokes naturally. Traditionally a cut reed pen was used, but an ordinary pen held at an angle gives good results.",
        },
      },
      {
        heading: { te: "మంచి చేతిరాత అలవాటు", en: "Building a legible hand" },
        body: {
          te: "మూడు అలవాట్లు సరిపోతాయి. ఒకటి: పదాల మధ్య స్పష్టమైన ఖాళీ — నస్తలీక్‌లో ఇది చాలా ముఖ్యం, లేకపోతే రెండు పదాలు ఒకటిగా కనిపిస్తాయి. రెండు: ఒకే పరిమాణంలో అక్షరాలు — కొన్ని పెద్దగా కొన్ని చిన్నగా రాస్తే చదవడం కష్టం. మూడు: చుక్కలను అస్థిపంజరానికి దగ్గరగా, స్పష్టంగా. రోజుకు ఐదు నిమిషాలు — ఒకే పదం పదిసార్లు — నెలలో తేడా కనిపిస్తుంది.",
          en: "Three habits are enough. First, a clear space between words, which matters more in nastaliq than elsewhere or two words merge into one. Second, consistent letter size, since mixed sizes are hard to read. Third, dots placed close to the skeleton and clearly separated. Five minutes a day writing one word ten times shows a difference within a month.",
        },
      },
    ],
    takeaways: [
      { te: "నస్తలీక్‌లో ప్రతి పదం కుడి పైనుండి ఎడమ కిందికి వాలుతుంది.", en: "In nastaliq every word slopes from upper right to lower left." },
      { te: "ముందు అస్థిపంజరం, తర్వాత చుక్కలు.", en: "Skeleton first, dots after." },
      { te: "కలంను వాలుగా పట్టుకోవడమే మందపాటి, సన్నని గీతలకు కారణం.", en: "Holding the pen at an angle is what gives the thick and thin strokes." },
    ],
    didYouKnow: [
      { te: "నస్తలీక్ శైలిని పద్నాలుగో శతాబ్దంలో మీర్ అలీ తబ్రీజీ అభివృద్ధి చేశారని చెబుతారు — 'నస్ఖ్' మరియు 'తాలీక్' శైలుల కలయిక నుండి పేరు వచ్చింది.", en: "Nastaliq is credited to Mir Ali Tabrizi in the fourteenth century, and its name comes from combining naskh and taliq." },
    ],
    reflect: [
      { te: "మీ పేరును ఉర్దూలో రాయడానికి ప్రయత్నించండి — వాలును గమనించండి.", en: "Try writing your own name in Urdu and watch the slope." },
    ],
    mistakes: [
      { te: "అరబిక్ లాగా సమతలంగా రాయడం — అది నస్తలీక్ కాదు.", en: "Writing level as in Arabic, which is not nastaliq." },
      { te: "ప్రతి అక్షరం తర్వాత చుక్కలు పెట్టడం — ప్రవాహం విరిగిపోతుంది.", en: "Adding dots after each letter, which breaks the flow." },
      { te: "పదాల మధ్య ఖాళీ వదలకపోవడం.", en: "Leaving no space between words." },
    ],
    faqs: [
      {
        question: { te: "కంప్యూటర్‌లో ఉర్దూ ఎలా టైప్ చేయాలి?", en: "How do I type Urdu on a computer?" },
        answer: {
          te: "ఫోన్‌లో, కంప్యూటర్‌లో ఉర్దూ కీబోర్డ్ ఉచితంగా చేర్చుకోవచ్చు. 'నోటో నస్తలీక్ ఉర్దూ' వంటి ఫాంట్‌లు నస్తలీక్ వాలును సరిగ్గా చూపిస్తాయి — ఈ వెబ్‌సైట్ ఉర్దూ పాఠానికి అదే వాడుతుంది.",
          en: "Urdu keyboards can be added free on both phones and computers. Fonts such as Noto Nastaliq Urdu render the slope properly; this site uses that one for its Urdu text.",
        },
      },
      {
        question: { te: "చేతిరాత నేర్చుకోవడం ఇంకా అవసరమా?", en: "Is handwriting still worth learning?" },
        answer: {
          te: "చదవడం మాత్రమే లక్ష్యమైతే తప్పనిసరి కాదు. కానీ రాయడం అక్షర ఆకారాలను జ్ఞాపకంలో స్థిరపరుస్తుంది — చేతితో రాసిన అక్షరాన్ని మరచిపోవడం కష్టం. కొత్తవారికి ఇది వేగవంతమైన మార్గం.",
          en: "Not strictly, if reading is the only goal. But writing fixes letter shapes in memory in a way reading does not, and for a beginner it is the faster route.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నస్తలీక్‌లో అక్షరాలు ఒకే గీతపై ఉంటాయా?", en: "Do letters in nastaliq sit on one baseline?" },
        options: [
          { te: "ఉండవు — ప్రతి అక్షరం కొంచెం కింద", en: "No, each sits a little lower" },
          { te: "అవును, ఎప్పుడూ", en: "Yes, always" },
          { te: "పదం మధ్యలో మాత్రమే", en: "Only in the middle of a word" },
        ],
        answer: 0,
      },
      {
        question: { te: "మంచి నస్తలీక్‌కు కలంను ఎలా పట్టుకోవాలి?", en: "How should the pen be held for good nastaliq?" },
        options: [
          { te: "కొంచెం వాలుగా", en: "At a slight angle" },
          { te: "నిటారుగా", en: "Upright" },
          { te: "ఎడమ చేతితో", en: "In the left hand" },
        ],
        answer: 0,
      },
      {
        question: { te: "'నస్తలీక్' పేరు దేని కలయిక నుండి వచ్చింది?", en: "The name nastaliq comes from combining what?" },
        options: [
          { te: "నస్ఖ్ మరియు తాలీక్", en: "Naskh and taliq" },
          { te: "కూఫీ మరియు దీవానీ", en: "Kufic and diwani" },
          { te: "ఉర్దూ మరియు పర్షియన్", en: "Urdu and Persian" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "వాలు: కుడి పై → ఎడమ కింద.", en: "Slope: upper right to lower left." },
      { te: "అస్థిపంజరం ముందు, చుక్కలు తర్వాత.", en: "Skeleton first, dots after." },
      { te: "పదాల మధ్య స్పష్టమైన ఖాళీ.", en: "Clear space between words." },
    ],
    summary: {
      te: "నస్తలీక్ రాయడంలో వాలే ప్రధానం — ప్రతి పదం కుడి పైనుండి ఎడమ కిందికి దిగుతుంది. అస్థిపంజరాన్ని ముందు పూర్తి చేసి, చుక్కలను తర్వాత పెట్టాలి. కలంను వాలుగా పట్టుకోవడం, పదాల మధ్య ఖాళీ వదలడం మంచి చేతిరాతకు కీలకం.",
      en: "The slope is the heart of writing nastaliq: each word descends from upper right to lower left. Complete the skeleton first and add dots after. Holding the pen at an angle and leaving clear spaces between words are what make the hand legible.",
    },
    apply: {
      te: "ఆచరణ: 'బిస్మిల్లాహ్' అనే పదాన్ని ఉర్దూలో పదిసార్లు రాయండి — ప్రతిసారీ వాలును గమనిస్తూ.",
      en: "Apply it: write the word bismillah in Urdu ten times, watching the slope each time.",
    },
    reading: [
      { label: "Reading basics", url: "/knowledge-center/learn-urdu/reading" },
      { label: "Everyday Urdu", url: "/knowledge-center/learn-urdu/daily" },
    ],
  },

  {
    slug: "daily",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 4 — రోజువారీ ఉర్దూ",
      en: "Level 4 — Everyday Urdu",
    },
    intro: {
      te: "ఉర్దూ వ్యాకరణం తెలుగు మాట్లాడేవారికి ఆశ్చర్యకరంగా సులభం — పదక్రమం దాదాపు ఒకటే. ఈ పాఠం రోజువారీ పదబంధాలతో పాటు ఆ నిర్మాణాన్ని కూడా చూపుతుంది.",
      en: "Urdu grammar is unexpectedly easy for a Telugu speaker, because the word order is nearly the same. This lesson gives the everyday phrases and shows that structure alongside them.",
    },
    sections: [
      {
        heading: { te: "పదక్రమం తెలుగులాగే", en: "The word order matches Telugu" },
        body: {
          te: "ఇంగ్లిష్ 'I book read' అనదు, 'I read a book' అంటుంది — క్రియ మధ్యలో. తెలుగు 'నేను పుస్తకం చదువుతాను' — క్రియ చివర. ఉర్దూ కూడా అంతే: 'మై కితాబ్ పఢ్‌తా హూఁ' — 'నేను పుస్తకం చదువుతాను'. కర్త, కర్మ, క్రియ ఈ క్రమంలో. అందుకే తెలుగు మాట్లాడేవారికి ఉర్దూ వాక్యాలు సహజంగా అనిపిస్తాయి — ఇంగ్లిష్ మాట్లాడేవారికి కంటే చాలా సులభం.",
          en: "English says I read a book, with the verb in the middle. Telugu puts the verb at the end. Urdu does the same: main kitaab parhta hoon, I book read. Subject, object, verb in that order. This is why Urdu sentences feel natural to a Telugu speaker and are considerably easier than they are for an English speaker.",
        },
        check: {
          question: { te: "ఉర్దూ వాక్యంలో క్రియ ఎక్కడ వస్తుంది?", en: "Where does the verb come in an Urdu sentence?" },
          options: [
            { te: "చివర, తెలుగులాగే", en: "At the end, as in Telugu" },
            { te: "మొదట", en: "At the beginning" },
            { te: "మధ్యలో, ఇంగ్లిష్‌లాగే", en: "In the middle, as in English" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "పలకరింపులు, మర్యాద", en: "Greetings and courtesy" },
        body: {
          te: "'అస్సలాము అలైకుమ్' ముస్లింల మధ్య పలకరింపు. 'ఆదాబ్' అనేది మతంతో సంబంధం లేని మర్యాదపూర్వక పలకరింపు. 'షుక్రియా' ధన్యవాదాలు; 'బహుత్ షుక్రియా' చాలా ధన్యవాదాలు. 'మెహర్‌బానీ' దయచేసి. 'ఖుదా హాఫిజ్' లేదా 'అల్లాహ్ హాఫిజ్' వీడ్కోలు — 'అల్లాహ్ మిమ్మల్ని కాపాడుగాక'. 'జీ' అనేది గౌరవ సూచిక — 'జీ హాఁ' (అవును), 'జీ నహీఁ' (కాదు); 'జీ' లేకుండా చెబితే కొంచెం మొరటుగా అనిపిస్తుంది.",
          en: "As-salaamu alaykum is the greeting between Muslims. Aadaab is a courteous greeting without religious content. Shukriya is thank you and bahut shukriya is thank you very much. Meherbani is please. Khuda hafiz or Allah hafiz is the farewell, may Allah protect you. Jee marks respect: jee haan for yes and jee nahin for no, and leaving the jee off sounds a little blunt.",
        },
      },
      {
        heading: { te: "గౌరవ స్థాయిలు", en: "Levels of respect" },
        body: {
          te: "ఉర్దూలో 'మీరు' అనడానికి మూడు మాటలు ఉన్నాయి, గౌరవ స్థాయిని బట్టి. 'ఆప్' అత్యంత గౌరవప్రదం — పెద్దలు, అపరిచితులు, ఉపాధ్యాయులకు. 'తుమ్' మధ్యస్థం — స్నేహితులు, సమవయస్కులు. 'తూ' అత్యంత సన్నిహితం — చాలా దగ్గరివారికి, లేదా దుఆలో అల్లాహ్‌ను సంబోధించేటప్పుడు. తెలుగులో 'మీరు', 'నువ్వు' తేడా ఉన్నట్లే, కానీ ఇక్కడ మూడు స్థాయిలు. సందేహం ఉంటే 'ఆప్' వాడండి — అది ఎప్పుడూ సురక్షితం.",
          en: "Urdu has three words for you, by level of respect. Aap is the most respectful, for elders, strangers and teachers. Tum is the middle, for friends and peers. Tu is the most intimate, for those very close, and it is also how Allah is addressed in supplication. Telugu makes a similar distinction; Urdu makes three. When unsure use aap, which is never wrong.",
        },
        check: {
          question: { te: "అపరిచితుడితో మాట్లాడేటప్పుడు ఏది వాడాలి?", en: "Which should be used with a stranger?" },
          options: [
            { te: "ఆప్", en: "Aap" },
            { te: "తుమ్", en: "Tum" },
            { te: "తూ", en: "Tu" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మొదటి పది వాక్యాలు", en: "The first ten sentences" },
        body: {
          te: "'ఆప్ కైసే హైఁ?' — మీరు ఎలా ఉన్నారు? (పురుషుడితో). 'ఆప్ కైసీ హైఁ?' — స్త్రీతో. 'మై ఠీక్ హూఁ' — నేను బాగున్నాను. 'ఆప్ కా నామ్ క్యా హై?' — మీ పేరు ఏమిటి? 'మేరా నామ్ ... హై' — నా పేరు ... . 'యే క్యా హై?' — ఇది ఏమిటి? 'కితనా హై?' — ఎంత? 'ముఝే సమఝ్ నహీఁ ఆయా' — నాకు అర్థం కాలేదు. 'ఫిర్ సే కహియే' — మళ్ళీ చెప్పండి. 'ముఝే ఉర్దూ సీఖ్‌నీ హై' — నాకు ఉర్దూ నేర్చుకోవాలని ఉంది.",
          en: "Aap kaise hain, how are you, to a man; aap kaisi hain to a woman. Main theek hoon, I am fine. Aap ka naam kya hai, what is your name. Mera naam ... hai, my name is ... . Ye kya hai, what is this. Kitna hai, how much. Mujhe samajh nahin aaya, I did not understand. Phir se kahiye, please say that again. Mujhe Urdu seekhni hai, I want to learn Urdu.",
        },
      },
    ],
    takeaways: [
      { te: "ఉర్దూ పదక్రమం తెలుగులాగే — కర్త, కర్మ, క్రియ.", en: "Urdu word order matches Telugu: subject, object, verb." },
      { te: "'ఆప్', 'తుమ్', 'తూ' — మూడు గౌరవ స్థాయిలు; సందేహం ఉంటే 'ఆప్'.", en: "Aap, tum and tu are three levels of respect; when unsure, aap." },
      { te: "'జీ' గౌరవాన్ని చేరుస్తుంది — 'జీ హాఁ', 'జీ నహీఁ'.", en: "Jee adds respect: jee haan, jee nahin." },
    ],
    didYouKnow: [
      { te: "క్రియ కర్త లింగాన్ని బట్టి మారుతుంది — పురుషుడు 'కర్‌తా హూఁ', స్త్రీ 'కర్‌తీ హూఁ' అంటారు.", en: "The verb changes with the speaker's gender: a man says karta hoon and a woman karti hoon." },
      { te: "ఉర్దూ, హిందీ రోజువారీ మాటల్లో దాదాపు ఒకటే — తేడా ఎక్కువగా లిపిలో, ఉన్నత పదజాలంలో.", en: "Everyday Urdu and Hindi are nearly the same; the difference lies mostly in script and higher vocabulary." },
    ],
    reflect: [
      { te: "మీ ఇంట్లో పెద్దవారు ఉర్దూ మాట్లాడతారా? వారితో ఒక వాక్యం ఉర్దూలో మాట్లాడి చూడండి.", en: "Do elders in your family speak Urdu? Try one sentence with them." },
    ],
    mistakes: [
      { te: "పెద్దవారితో 'తుమ్' వాడటం — ఇది అమర్యాదగా తీసుకోబడుతుంది.", en: "Using tum with an elder, which is taken as disrespectful." },
      { te: "క్రియ లింగాన్ని మార్చకపోవడం — స్త్రీ 'కర్‌తా హూఁ' అంటే తప్పు.", en: "Not changing the verb for gender, so a woman saying karta hoon is wrong." },
      { te: "ఇంగ్లిష్ పదక్రమంలో ఉర్దూ వాక్యం కూర్చడం.", en: "Building an Urdu sentence on English word order." },
    ],
    faqs: [
      {
        question: { te: "ఉర్దూ మాట్లాడటం నేర్చుకోవడానికి లిపి అవసరమా?", en: "Do I need the script to learn to speak Urdu?" },
        answer: {
          te: "అవసరం లేదు — మాట్లాడటం, చదవడం వేర్వేరు నైపుణ్యాలు. కానీ లిపి తెలిస్తే ఇస్లామిక్ పుస్తకాలు, దుఆలు, ఖుత్బాలు చదవగలరు; అదే ఈ ప్రాంతంలో ఉర్దూ నేర్చుకోవడానికి ప్రధాన కారణం.",
          en: "No; speaking and reading are separate skills. But the script opens Islamic books, duas and sermons, which is the main reason to learn Urdu in this region.",
        },
      },
      {
        question: { te: "తెలుగు మాట్లాడేవారికి ఉర్దూ ఎంత కష్టం?", en: "How hard is Urdu for a Telugu speaker?" },
        answer: {
          te: "వ్యాకరణం సులభం — పదక్రమం ఒకటే, చాలా భావనలు పోలికగా ఉంటాయి. ఈ ప్రాంతంలో చాలామంది తెలుగు మాట్లాడేవారికి ఇప్పటికే వందల ఉర్దూ పదాలు తెలుసు, వాటిని ఉర్దూ అని గుర్తించకపోయినా. కష్టమైనది లిపి, అదీ కొన్ని వారాల పని.",
          en: "The grammar is easy: the word order is shared and many concepts line up. Most Telugu speakers here already know hundreds of Urdu words without thinking of them as Urdu. The script is the harder part, and that is a matter of weeks.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'జీ నహీఁ' అంటే ఏమిటి?", en: "What does jee nahin mean?" },
        options: [
          { te: "కాదు (గౌరవపూర్వకంగా)", en: "No, respectfully" },
          { te: "అవును", en: "Yes" },
          { te: "ధన్యవాదాలు", en: "Thank you" },
        ],
        answer: 0,
      },
      {
        question: { te: "'ముఝే సమఝ్ నహీఁ ఆయా' అంటే ఏమిటి?", en: "What does mujhe samajh nahin aaya mean?" },
        options: [
          { te: "నాకు అర్థం కాలేదు", en: "I did not understand" },
          { te: "నేను బాగున్నాను", en: "I am fine" },
          { te: "మీ పేరు ఏమిటి?", en: "What is your name?" },
        ],
        answer: 0,
      },
      {
        question: { te: "దుఆలో అల్లాహ్‌ను ఏ సర్వనామంతో సంబోధిస్తారు?", en: "Which pronoun is used for Allah in supplication?" },
        options: [
          { te: "తూ", en: "Tu" },
          { te: "ఆప్", en: "Aap" },
          { te: "తుమ్", en: "Tum" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "కర్త + కర్మ + క్రియ (తెలుగులాగే).", en: "Subject, object, verb, as in Telugu." },
      { te: "ఆప్ > తుమ్ > తూ (గౌరవ స్థాయి).", en: "Aap, then tum, then tu, by level of respect." },
      { te: "క్రియ లింగాన్ని బట్టి మారుతుంది.", en: "The verb changes with gender." },
    ],
    summary: {
      te: "ఉర్దూ పదక్రమం తెలుగుకు దాదాపు ఒకటే కాబట్టి వాక్య నిర్మాణం సహజంగా వస్తుంది. మూడు గౌరవ స్థాయిలు — ఆప్, తుమ్, తూ — తెలుసుకోవడం ముఖ్యం; సందేహం ఉంటే ఆప్. క్రియ మాట్లాడేవారి లింగాన్ని బట్టి మారుతుంది.",
      en: "Urdu word order is close enough to Telugu that sentence building comes naturally. The three levels of respect, aap, tum and tu, matter; when unsure use aap. The verb changes with the speaker's gender.",
    },
    apply: {
      te: "ఆచరణ: 'ఆప్ కైసే హైఁ?' మరియు 'మేరా నామ్ ... హై' — ఈ రెండు వాక్యాలను ఈ వారం వాడండి.",
      en: "Apply it: use the two sentences aap kaise hain and mera naam ... hai this week.",
    },
    reading: [
      { label: "Learn Urdu portal", url: "/knowledge-center/learn-urdu" },
      { label: "Islamic Urdu", url: "/knowledge-center/learn-urdu/islamic" },
    ],
  },

  {
    slug: "islamic",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 5 — ఇస్లామిక్ ఉర్దూ",
      en: "Level 5 — Islamic Urdu",
    },
    intro: {
      te: "దక్షిణాసియాలో ఇస్లామిక్ జ్ఞానం చాలావరకు ఉర్దూలోనే బోధించబడుతుంది. ఖుత్బాలు, మదరసా పాఠాలు, ఫత్వాలు, తఫ్సీర్ గ్రంథాలు — అన్నీ ఉర్దూలో. అందుకే ఈ పరిభాష తెలియడం ఆచరణాత్మకంగా విలువైనది.",
      en: "Most Islamic teaching in South Asia happens in Urdu: sermons, madrasa lessons, fatwas and works of tafsir. Knowing this vocabulary has practical value here.",
    },
    sections: [
      {
        heading: { te: "ఉర్దూ పేర్లు, అరబిక్ మూలాలు", en: "Urdu names for Arabic things" },
        body: {
          te: "ఒక విషయాన్ని ఉర్దూలో ఒక పేరుతో, అరబిక్‌లో మరో పేరుతో పిలుస్తారు — రెండూ తెలియడం ముఖ్యం. 'నమాజ్' అంటే అరబిక్ 'సలాహ్'. 'రోజా' అంటే 'సౌమ్'. 'ఖుదా' అంటే 'అల్లాహ్' (పర్షియన్ నుండి). 'ఫరిష్తా' అంటే 'మలక్' (దైవదూత). 'పైగంబర్' అంటే 'నబీ' (ప్రవక్త). 'దోజఖ్' అంటే 'జహన్నమ్'. 'బెహిష్త్' అంటే 'జన్నత్'. చాలామంది ఈ ఉర్దూ పదాలనే వాడతారు, కానీ ఖురాన్‌లో అరబిక్ పదాలే ఉంటాయి.",
          en: "The same thing often has an Urdu name and an Arabic one, and both are worth knowing. Namaz is Arabic salah. Roza is sawm. Khuda, from Persian, is Allah. Farishta is malak, an angel. Paighambar is nabi, a prophet. Dozakh is jahannam and behisht is jannah. Most people here use the Urdu words, while the Quran uses the Arabic.",
        },
        check: {
          question: { te: "'నమాజ్' అనే ఉర్దూ పదానికి అరబిక్ పదం ఏమిటి?", en: "What is the Arabic word for the Urdu namaz?" },
          options: [
            { te: "సలాహ్", en: "Salah" },
            { te: "సౌమ్", en: "Sawm" },
            { te: "జకాత్", en: "Zakat" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మదరసాలో వినిపించే పదాలు", en: "The words you hear in a madrasa" },
        body: {
          te: "'దీన్' (ధర్మం), 'ఈమాన్' (విశ్వాసం), 'అమల్' (ఆచరణ), 'నియ్యత్' (ఉద్దేశం), 'ఇబాదత్' (ఆరాధన), 'తౌబా' (పశ్చాత్తాపం), 'సబర్' (ఓర్పు), 'షుక్ర్' (కృతజ్ఞత), 'తఖ్వా' (దైవభీతి), 'ఇఖ్లాస్' (నిష్కపటత్వం). ఈ పది పదాలు ప్రతి ఖుత్బాలోనూ వస్తాయి. వీటిని తెలుసుకుంటే ఖుత్బా విషయం చాలావరకు అర్థమవుతుంది — ప్రతి పదం అర్థం కాకపోయినా.",
          en: "Deen for religion, imaan for faith, amal for action, niyyat for intention, ibaadat for worship, tawba for repentance, sabr for patience, shukr for gratitude, taqwa for consciousness of Allah, ikhlas for sincerity. These ten come up in every sermon. Knowing them means following most of a khutbah even when individual words escape you.",
        },
      },
      {
        heading: { te: "ఫిఖ్హ్ పరిభాష", en: "The vocabulary of rulings" },
        body: {
          te: "చర్చల్లో తరచూ వచ్చే ఐదు స్థాయిలు: 'ఫర్జ్' (తప్పనిసరి; వదిలితే పాపం), 'వాజిబ్' (దాదాపు తప్పనిసరి — హనఫీ మజ్‌హబ్‌లో ప్రత్యేక వర్గం), 'సున్నత్' (ప్రవక్త ﷺ ఆచరణ; చేస్తే ప్రతిఫలం, వదిలితే పాపం కాదు), 'ముస్తహబ్' (మంచిది, సిఫార్సు), 'ముబాహ్' (అనుమతించబడినది, తటస్థం). మరో రెండు: 'మక్రూహ్' (ఇష్టపడనిది), 'హరామ్' (నిషిద్ధం). ఒక విషయం ఏ వర్గంలోకి వస్తుందో తెలియడం, దాన్ని 'తప్పనిసరి' అనుకోవడం కంటే ఖచ్చితం.",
          en: "Five levels recur constantly: fard, obligatory and sinful to leave; wajib, near-obligatory and a distinct category in the Hanafi school; sunnah, the Prophet's practice, rewarded if done and not sinful if left; mustahabb, recommended; and mubah, permitted and neutral. Two more: makruh, disliked, and haram, forbidden. Knowing which category something falls in is more precise than calling everything compulsory.",
        },
        check: {
          question: { te: "'సున్నత్' వదిలితే ఏమవుతుంది?", en: "What happens if a sunnah is left?" },
          options: [
            { te: "పాపం కాదు, కానీ ప్రతిఫలం కోల్పోతారు", en: "No sin, but the reward is missed" },
            { te: "అది పాపం", en: "It is a sin" },
            { te: "నమాజ్ చెల్లదు", en: "The prayer becomes invalid" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఖుత్బా వినడం ఎలా మెరుగుపరచుకోవాలి", en: "Getting more from a khutbah" },
        body: {
          te: "ఒక ఆచరణాత్మక పద్ధతి: శుక్రవారం ఖుత్బాలో మీకు తెలియని పదాలను గుర్తుంచుకోండి — రెండు మూడు చాలు. ఇంటికి వచ్చి వాటి అర్థం అడగండి లేదా చూడండి. వారానికి మూడు పదాలు అంటే ఏడాదికి నూట యాభై. కొన్ని నెలల్లోనే ఖుత్బా అర్థమయ్యే స్థాయికి చేరతారు. చాలామంది ఏళ్ళ తరబడి ఖుత్బా వింటూ ఏమీ అర్థం కాకుండా ఉంటారు — ఇది కేవలం ఎవరూ ఈ పద్ధతి చెప్పకపోవడం వల్ల.",
          en: "A practical method: during the Friday khutbah, note two or three words you did not know. Look them up or ask afterwards. Three words a week is a hundred and fifty a year, and within months the sermon becomes intelligible. Many people sit through sermons for years understanding little, simply because no one suggested this.",
        },
      },
    ],
    takeaways: [
      { te: "ఉర్దూ, అరబిక్ రెండు పేర్లూ తెలుసుకోండి — నమాజ్/సలాహ్, రోజా/సౌమ్.", en: "Learn both names: namaz and salah, roza and sawm." },
      { te: "ఫర్జ్, వాజిబ్, సున్నత్, ముస్తహబ్, ముబాహ్, మక్రూహ్, హరామ్ — ఏడు స్థాయిలు.", en: "Fard, wajib, sunnah, mustahabb, mubah, makruh, haram: seven levels." },
      { te: "వారానికి మూడు కొత్త పదాలు ఖుత్బాను అర్థమయ్యేలా చేస్తాయి.", en: "Three new words a week makes the khutbah intelligible." },
    ],
    didYouKnow: [
      { te: "'ఖుదా హాఫిజ్' లోని 'ఖుదా' పర్షియన్ పదం. కొందరు 'అల్లాహ్ హాఫిజ్' అనడాన్ని ఇష్టపడతారు; రెండూ ఆమోదయోగ్యమని చాలామంది పండితులు అంటారు.", en: "The khuda in khuda hafiz is a Persian word. Some prefer Allah hafiz, and most scholars hold both acceptable." },
      { te: "దక్షిణాసియాలో ముద్రించబడిన ఖురాన్ అనువాదాలు, తఫ్సీర్ గ్రంథాలలో అత్యధికం ఉర్దూలోనే.", en: "The majority of Quran translations and tafsir works printed in South Asia are in Urdu." },
    ],
    reflect: [
      { te: "గత శుక్రవారం ఖుత్బాలో మీకు అర్థం కాని ఒక పదం గుర్తుందా? ఈ శుక్రవారం రెండు గుర్తుంచుకోండి.", en: "Can you recall one word from last Friday's khutbah you did not follow? This Friday, note two." },
    ],
    mistakes: [
      { te: "ప్రతిదాన్నీ 'ఫర్జ్' అనడం — వర్గాల మధ్య తేడా ముఖ్యం.", en: "Calling everything fard, when the categories genuinely differ." },
      { te: "'సున్నత్' అంటే 'ఐచ్ఛికం, పట్టించుకోనవసరం లేదు' అనుకోవడం.", en: "Reading sunnah as optional and therefore unimportant." },
      { te: "ఉర్దూ పదాలే ఖురాన్‌లో ఉన్నాయని అనుకోవడం — ఖురాన్ అరబిక్‌లోనే.", en: "Assuming the Urdu words appear in the Quran, when the Quran is in Arabic." },
    ],
    faqs: [
      {
        question: { te: "ఖుత్బా అరబిక్‌లో ఉండాలా, ఉర్దూలోనా?", en: "Should the khutbah be in Arabic or Urdu?" },
        answer: {
          te: "మజ్‌హబ్‌ల మధ్య భేదం ఉంది. హనఫీ మజ్‌హబ్‌లో ఖుత్బాలోని నిర్దిష్ట భాగాలు అరబిక్‌లో ఉండాలి; ఉపదేశం స్థానిక భాషలో ఉండవచ్చు. అందుకే చాలా మస్జిద్‌లలో ఉర్దూ ఉపదేశం తర్వాత అరబిక్ ఖుత్బా వస్తుంది. మీ మస్జిద్ ఆచరణ గురించి ఇమామ్‌ను అడగండి.",
          en: "The schools differ. In the Hanafi school certain parts must be in Arabic while the exhortation may be in the local language, which is why many mosques give an Urdu talk followed by the Arabic khutbah. Ask your imam about your mosque's practice.",
        },
      },
      {
        question: { te: "ఉర్దూ ఇస్లామిక్ పుస్తకాలు ఎక్కడ దొరుకుతాయి?", en: "Where can I find Islamic books in Urdu?" },
        answer: {
          te: "స్థానిక మస్జిద్ లేదా మదరసా గ్రంథాలయంలో అడగండి — చాలా చోట్ల ఉచితంగా ఇస్తారు లేదా చదవడానికి ఇస్తారు. కొత్తవారికి ఉర్దూ దుఆల పుస్తకం, సరళ సీరత్ పుస్తకం మంచి ఆరంభం.",
          en: "Ask at a local mosque or madrasa library, where books are often given free or lent. For a beginner an Urdu du'a book and a simple seerah are good starting points.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'ఫరిష్తా' అంటే ఏమిటి?", en: "What does farishta mean?" },
        options: [
          { te: "దైవదూత", en: "An angel" },
          { te: "ప్రవక్త", en: "A prophet" },
          { te: "పండితుడు", en: "A scholar" },
        ],
        answer: 0,
      },
      {
        question: { te: "'మక్రూహ్' అంటే ఏమిటి?", en: "What does makruh mean?" },
        options: [
          { te: "ఇష్టపడనిది", en: "Disliked" },
          { te: "నిషిద్ధం", en: "Forbidden" },
          { te: "తప్పనిసరి", en: "Obligatory" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తఖ్వా' అంటే ఏమిటి?", en: "What does taqwa mean?" },
        options: [
          { te: "దైవభీతి, అల్లాహ్ గురించిన స్పృహ", en: "Consciousness of Allah" },
          { te: "ఓర్పు", en: "Patience" },
          { te: "కృతజ్ఞత", en: "Gratitude" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "నమాజ్=సలాహ్ · రోజా=సౌమ్ · ఫరిష్తా=మలక్ · పైగంబర్=నబీ.", en: "Namaz is salah, roza is sawm, farishta is malak, paighambar is nabi." },
      { te: "ఫర్జ్ > వాజిబ్ > సున్నత్ > ముస్తహబ్ > ముబాహ్ > మక్రూహ్ > హరామ్.", en: "Fard, wajib, sunnah, mustahabb, mubah, makruh, haram." },
      { te: "వారానికి మూడు పదాలు = ఏడాదికి 150.", en: "Three words a week is a hundred and fifty a year." },
    ],
    summary: {
      te: "దక్షిణాసియా ఇస్లామిక్ బోధన ఉర్దూలోనే జరుగుతుంది కాబట్టి ఈ పరిభాష ఆచరణాత్మకంగా విలువైనది. ఉర్దూ, అరబిక్ రెండు పేర్లూ తెలుసుకోండి; ఫిఖ్హ్ ఏడు స్థాయిలను గుర్తుంచుకోండి; ప్రతి ఖుత్బా నుండి మూడు కొత్త పదాలు నేర్చుకోండి.",
      en: "Islamic teaching in South Asia happens in Urdu, so this vocabulary has practical value. Learn both the Urdu and Arabic names, hold the seven categories of ruling in mind, and take three new words from every sermon.",
    },
    apply: {
      te: "ఆచరణ: ఈ శుక్రవారం ఖుత్బాలో మీకు తెలియని మూడు పదాలను రాసుకుని, వాటి అర్థం కనుక్కోండి.",
      en: "Apply it: write down three words you do not know from this Friday's khutbah and find out what they mean.",
    },
    reading: [
      { label: "Learn Urdu portal", url: "/knowledge-center/learn-urdu" },
      { label: "Everyday Urdu", url: "/knowledge-center/learn-urdu/daily" },
    ],
  },

  {
    slug: "advanced",
    portal: "learn-urdu",
    title: {
      te: "స్థాయి 6 — ఉన్నత ఉర్దూ",
      en: "Level 6 — Advanced Urdu",
    },
    intro: {
      te: "ఈ దశలో మీరు గుర్తులు లేని పాఠాన్ని చదవగలరు. ఇక్కడి నుండి ఉర్దూ సాహిత్యం తెరుచుకుంటుంది — ముఖ్యంగా కవిత్వం, ఇది ఈ భాష అత్యంత గొప్ప సంపద.",
      en: "By this stage you can read unmarked text. From here Urdu literature opens up, and above all its poetry, which is the language's greatest wealth.",
    },
    sections: [
      {
        heading: { te: "గజల్ నిర్మాణం", en: "How a ghazal is built" },
        body: {
          te: "గజల్ ఉర్దూ కవిత్వానికి ప్రధాన రూపం. ఇది జంట పంక్తుల (షేర్) సమాహారం; ప్రతి షేర్ తనంతట తానే పూర్తి భావాన్ని మోస్తుంది — ఒక షేర్‌కు మరో షేర్‌తో కథా సంబంధం అవసరం లేదు. మొదటి షేర్ (మత్‌లా) రెండు పంక్తుల్లోనూ ఒకే ప్రాస. తర్వాతి షేర్‌లలో రెండో పంక్తిలో మాత్రమే ఆ ప్రాస. చివరి షేర్ (మఖ్‌తా) లో కవి తన కలం పేరు (తఖల్లుస్) చేరుస్తారు — అందుకే గజల్ చివరన 'గాలిబ్', 'ఇఖ్బాల్' అనే పేర్లు కనిపిస్తాయి.",
          en: "The ghazal is the main form of Urdu poetry: a set of couplets, each complete in itself, with no requirement that one couplet continue the story of the last. The opening couplet, the matla, rhymes in both lines. In later couplets only the second line carries the rhyme. In the closing couplet, the maqta, the poet works in their pen name, which is why a ghazal often ends with Ghalib or Iqbal appearing inside the verse.",
        },
        check: {
          question: { te: "గజల్‌లో ప్రతి షేర్ ఎలా ఉంటుంది?", en: "In a ghazal, how does each couplet work?" },
          options: [
            { te: "తనంతట తానే పూర్తి భావం", en: "Complete in itself" },
            { te: "ముందు షేర్ కథను కొనసాగిస్తుంది", en: "It continues the previous couplet's story" },
            { te: "ప్రాస ఉండదు", en: "It carries no rhyme" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇఖ్బాల్ — ఈ ప్రాంతానికి ప్రత్యేకం", en: "Iqbal, who matters particularly here" },
        body: {
          te: "అల్లామా ముహమ్మద్ ఇఖ్బాల్ (1877-1938) ఉర్దూ, పర్షియన్ రెండింటిలోనూ రాశారు. ఆయన కవిత్వం ఇస్లామిక్ ఆలోచనతో నిండి ఉంటుంది — 'ఖుదీ' (ఆత్మగౌరవం, స్వీయ నిర్మాణం), ముస్లిం సమాజం మేల్కొనడం, జ్ఞానం, కృషి. 'షికవా' మరియు 'జవాబ్-ఎ-షికవా' ఆయన ప్రసిద్ధ రచనలు — మొదటిది అల్లాహ్‌కు ముస్లింల ఫిర్యాదు, రెండోది దానికి సమాధానం. ఇఖ్బాల్‌ను చదవడం ఉర్దూ నేర్చుకోవడానికి బలమైన కారణం.",
          en: "Allama Muhammad Iqbal (1877-1938) wrote in both Urdu and Persian, and his poetry is saturated with Islamic thought: khudi, meaning selfhood and self-building, the awakening of the Muslim community, knowledge and effort. Shikwa and Jawab-e-Shikwa, a complaint to Allah and its answer, are among his best known works. Reading Iqbal is on its own a strong reason to learn Urdu.",
        },
      },
      {
        heading: { te: "గద్యం — నస్ర్", en: "Prose" },
        body: {
          te: "కవిత్వం కాకుండా ఉర్దూలో గొప్ప గద్య సంపద ఉంది: 'అఫ్‌సానా' (చిన్న కథ), 'నావిల్' (నవల), 'ఇన్‌షాయియా' (వ్యాసం), మరియు విస్తృతమైన మతపరమైన గద్యం. ఇస్లామిక్ విద్యార్థికి ముఖ్యమైనవి తఫ్సీర్ గ్రంథాలు, సీరత్ రచనలు, ఫిఖ్హ్ పుస్తకాలు — ఇవన్నీ ఉర్దూలో పుష్కలంగా ఉన్నాయి. కవిత్వం కంటే గద్యం చదవడం సులభం, ఎందుకంటే అందులో ప్రాచీన పదాలు, సంక్లిష్ట రూపకాలు తక్కువ.",
          en: "Beyond poetry Urdu has substantial prose: the afsana or short story, the novel, the essay, and a large body of religious writing. For a student of Islam the important part is the tafsir works, the seerah writing and the books of fiqh, all abundant in Urdu. Prose is easier than poetry, carrying fewer archaic words and dense metaphors.",
        },
      },
      {
        heading: { te: "ఇక్కడి నుండి ఎలా ముందుకు", en: "How to keep going from here" },
        body: {
          te: "మూడు అలవాట్లు. ఒకటి: రోజూ కొంచెం చదవండి — పది నిమిషాలు చాలు, కానీ ప్రతిరోజూ. రెండు: కొత్త పదాలను ఒక నోట్‌బుక్‌లో రాయండి, వాక్యంతో సహా — పదం ఒంటరిగా కంటే సందర్భంలో బాగా గుర్తుంటుంది. మూడు: బిగ్గరగా చదవండి, ముఖ్యంగా కవిత్వం — ఉర్దూ కవిత్వం వినడానికి రాయబడింది, చూడటానికి కాదు. 'ముషాయిరా' అనే కవితా సభలు ఈ కారణంగానే ఉన్నాయి.",
          en: "Three habits. Read a little every day; ten minutes is enough if it is daily. Keep new words in a notebook with the sentence they came in, since a word in context sticks better than a word alone. And read aloud, poetry especially: Urdu poetry was made to be heard rather than seen, which is what the mushaira, the poetry gathering, exists for.",
        },
      },
    ],
    takeaways: [
      { te: "గజల్ = స్వతంత్ర జంట పంక్తుల సమాహారం; చివర కవి కలం పేరు.", en: "A ghazal is a set of independent couplets, closing with the poet's pen name." },
      { te: "ఇఖ్బాల్ కవిత్వం ఇస్లామిక్ ఆలోచనతో నిండినది — ఖుదీ, మేల్కొలుపు.", en: "Iqbal's poetry is steeped in Islamic thought: khudi and awakening." },
      { te: "కవిత్వం కంటే గద్యం సులభం; తఫ్సీర్, సీరత్ ఉర్దూలో పుష్కలం.", en: "Prose is easier than poetry, and tafsir and seerah are abundant in Urdu." },
    ],
    didYouKnow: [
      { te: "మిర్జా గాలిబ్ తన పర్షియన్ కవిత్వాన్నే గొప్పదిగా భావించారు, కానీ ప్రపంచం ఆయన్ను ఉర్దూ కవిగానే గుర్తుపెట్టుకుంది.", en: "Mirza Ghalib considered his Persian verse the greater achievement, yet the world remembers him for his Urdu." },
      { te: "'ముషాయిరా' లలో శ్రోతలు మంచి షేర్‌కు 'వాహ్ వాహ్' అని ప్రతిస్పందించడం సంప్రదాయం.", en: "At a mushaira the audience traditionally answers a fine couplet with wah wah." },
    ],
    reflect: [
      { te: "మీకు తెలిసిన ఒక ఉర్దూ షేర్ ఉందా? దాని అర్థాన్ని మీ మాటల్లో చెప్పగలరా?", en: "Is there an Urdu couplet you know? Could you put its meaning in your own words?" },
    ],
    mistakes: [
      { te: "గజల్‌లోని షేర్‌లను ఒకే కథగా చదవడానికి ప్రయత్నించడం — అవి స్వతంత్రం.", en: "Trying to read a ghazal's couplets as one continuous story, when they are independent." },
      { te: "నిఘంటువు లేకుండా ప్రాచీన కవిత్వంతో మొదలుపెట్టడం.", en: "Starting with older poetry without a dictionary." },
      { te: "మౌనంగా కవిత్వం చదవడం — అది వినడానికి రాయబడింది.", en: "Reading poetry silently, when it was written to be heard." },
    ],
    faqs: [
      {
        question: { te: "కవిత్వం చదవడం ఇస్లామికంగా అనుమతించబడిందా?", en: "Is reading poetry permitted in Islam?" },
        answer: {
          te: "అవును. ప్రవక్త ﷺ కవిత్వాన్ని విన్నారు, హస్సాన్ బిన్ థాబిత్ (ర/అ) ఆయన కవిగా ఉండేవారు. ఖురాన్ విమర్శించినది కవిత్వాన్ని కాదు, అసత్యాన్ని, అశ్లీలతను ప్రచారం చేసేవారిని. మంచి కవిత్వంలో 'హిక్మత్' — వివేకం — ఉంటుందని ప్రవక్త ﷺ చెప్పారు (బుఖారీ).",
          en: "Yes. The Prophet ﷺ listened to poetry and Hassan ibn Thabit (RA) was his poet. What the Quran criticised was not poetry but those who spread falsehood and indecency through it. The Prophet ﷺ said that some poetry contains wisdom (Bukhari).",
        },
      },
      {
        question: { te: "ఉర్దూ నిఘంటువు ఏది వాడాలి?", en: "Which Urdu dictionary should I use?" },
        answer: {
          te: "ఆన్‌లైన్‌లో ఉచిత ఉర్దూ నిఘంటువులు అందుబాటులో ఉన్నాయి, చాలావాటిలో ఉచ్చారణ కూడా ఉంటుంది. కవిత్వం కోసం ప్రాచీన పదాలను వివరించే వనరు అవసరం — సాధారణ నిఘంటువులో అవి ఉండకపోవచ్చు.",
          en: "Free Urdu dictionaries are available online, many with pronunciation. For poetry you will want a resource that explains older words, since a general dictionary may not carry them.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "గజల్ చివరి షేర్‌ను ఏమంటారు?", en: "What is the closing couplet of a ghazal called?" },
        options: [
          { te: "మఖ్‌తా", en: "Maqta" },
          { te: "మత్‌లా", en: "Matla" },
          { te: "నజ్మ్", en: "Nazm" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఇఖ్బాల్ కవిత్వంలో 'ఖుదీ' అంటే ఏమిటి?", en: "What does khudi mean in Iqbal's poetry?" },
        options: [
          { te: "ఆత్మగౌరవం, స్వీయ నిర్మాణం", en: "Selfhood and self-building" },
          { te: "ఏకాంతం", en: "Solitude" },
          { te: "ప్రయాణం", en: "Travel" },
        ],
        answer: 0,
      },
      {
        question: { te: "కవిత్వం గురించి ప్రవక్త ﷺ ఏమన్నారు?", en: "What did the Prophet ﷺ say about poetry?" },
        options: [
          { te: "కొంత కవిత్వంలో వివేకం ఉంటుంది", en: "Some poetry contains wisdom" },
          { te: "అదంతా నిషిద్ధం", en: "All of it is forbidden" },
          { te: "అది తప్పనిసరి", en: "It is obligatory" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "గజల్: మత్‌లా (మొదటి), మఖ్‌తా (చివరి, కలం పేరుతో).", en: "Ghazal: matla opens, maqta closes with the pen name." },
      { te: "ఇఖ్బాల్: ఖుదీ, మేల్కొలుపు, జ్ఞానం.", en: "Iqbal: khudi, awakening, knowledge." },
      { te: "రోజూ కొంచెం · సందర్భంతో పదాలు · బిగ్గరగా.", en: "Daily, in context, aloud." },
    ],
    summary: {
      te: "ఉన్నత ఉర్దూ సాహిత్యానికి తలుపు తెరుస్తుంది. గజల్ స్వతంత్ర జంట పంక్తుల రూపం; ఇఖ్బాల్ కవిత్వం ఇస్లామిక్ ఆలోచనతో నిండినది; గద్యంలో తఫ్సీర్, సీరత్ గ్రంథాలు పుష్కలం. రోజూ కొంచెం, సందర్భంతో, బిగ్గరగా చదవడమే మార్గం.",
      en: "Advanced Urdu opens the literature. The ghazal is a form of independent couplets, Iqbal's poetry is steeped in Islamic thought, and the prose holds abundant tafsir and seerah. The way forward is a little every day, in context, and aloud.",
    },
    apply: {
      te: "ఆచరణ: ఇఖ్బాల్ కవితలోని ఒక షేర్‌ను కనుగొని, దాన్ని బిగ్గరగా చదివి, అర్థాన్ని తెలుగులో రాయండి.",
      en: "Apply it: find one couplet by Iqbal, read it aloud, and write its meaning in Telugu.",
    },
    reading: [
      { label: "Learn Urdu portal", url: "/knowledge-center/learn-urdu" },
      { label: "Islamic Urdu", url: "/knowledge-center/learn-urdu/islamic" },
    ],
  },
];
