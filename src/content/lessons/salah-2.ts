/* Learn Salah, levels 5 to 8. Split from ./salah.ts to keep the files
   readable; both arrays are spread into authoredLessons together. */
import type { Lesson } from "../lessons.ts";

export const salahLessonsTwo: Lesson[] = [
  {
    slug: "fiveprayers",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 5 — ఐదు నమాజులు, వాటి సమయాలు",
      en: "Level 5 — The five prayers and their times",
    },
    intro: {
      te: "ప్రతి నమాజుకు ఒక సమయ కిటికీ ఉంది — అది సూర్యుని స్థానం ద్వారా నిర్ణయించబడుతుంది, గడియారం ద్వారా కాదు. అందుకే నమాజ్ సమయాలు ప్రతి రోజూ, ప్రతి ఊళ్ళోనూ కొంచెం మారతాయి.",
      en: "Each prayer has a window, and it is set by the position of the sun rather than by the clock. That is why prayer times shift a little every day and differ from town to town.",
    },
    sections: [
      {
        heading: { te: "ఐదు కిటికీలు", en: "The five windows" },
        body: {
          te: "ఫజ్ర్: నిజమైన ఉదయకాంతి కనిపించినప్పటి నుండి సూర్యోదయం వరకు. జుహ్ర్: సూర్యుడు నడినెత్తిని దాటిన తర్వాత నుండి ప్రతి వస్తువు నీడ దాని పొడవుకు సమానమయ్యేవరకు. అస్ర్: అక్కడి నుండి సూర్యాస్తమయం వరకు. మఘ్రిబ్: సూర్యాస్తమయం నుండి పశ్చిమాన ఎర్రదనం మాయమయ్యేవరకు. ఇషా: అక్కడి నుండి అర్ధరాత్రి వరకు (అవసరమైతే ఫజ్ర్ వరకు). గమనించండి: ఇవన్నీ ఖగోళ సంఘటనలు, గడియారపు సమయాలు కాదు. అందుకే ఒక క్యాలెండర్ మీ ఊరికి సరిపోతుంది, పక్క రాష్ట్రానికి కాదు.",
          en: "Fajr: from true dawn until sunrise. Zuhr: from just after the sun passes its zenith until an object's shadow equals its own length. Asr: from there until sunset. Maghrib: from sunset until the redness leaves the western sky. Isha: from there until midnight, and in need until dawn. Notice that these are all astronomical events rather than clock times, which is why a timetable fits your town and not the next state.",
        },
        check: {
          question: { te: "నమాజ్ సమయాలను ఏది నిర్ణయిస్తుంది?", en: "What determines the prayer times?" },
          options: [
            { te: "సూర్యుని స్థానం", en: "The position of the sun" },
            { te: "గడియారం", en: "The clock" },
            { te: "స్థానిక ఆచారం", en: "Local custom" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఎన్ని రక్అత్‌లు", en: "How many units" },
        body: {
          te: "ఫర్జ్: ఫజ్ర్ 2, జుహ్ర్ 4, అస్ర్ 4, మఘ్రిబ్ 3, ఇషా 4 — మొత్తం 17. వీటితో పాటు సున్నత్ ముఅక్కదా (గట్టిగా సిఫార్సు చేయబడినవి): ఫజ్ర్‌కు ముందు 2, జుహ్ర్‌కు ముందు 4 తర్వాత 2, మఘ్రిబ్ తర్వాత 2, ఇషా తర్వాత 2. హనఫీ మజ్‌హబ్‌లో ఇషా తర్వాత విత్ర్ 3 వాజిబ్. కొత్తవారికి సలహా: ముందు 17 ఫర్జ్ రక్అత్‌లను స్థిరపరచుకోండి. అవి క్రమమయ్యాక సున్నత్‌లు చేర్చండి — ఒకేసారి అన్నీ మొదలుపెట్టి రెండు వారాల్లో ఆగిపోవడం కంటే ఇది మేలు.",
          en: "The obligatory units are two at Fajr, four at Zuhr, four at Asr, three at Maghrib and four at Isha, seventeen in all. Alongside them are the emphasised sunnah units: two before Fajr, four before and two after Zuhr, two after Maghrib and two after Isha, with three of Witr after Isha being wajib in the Hanafi school. Advice for a beginner: fix the seventeen obligatory units first and add the sunnah once those are steady, rather than starting everything at once and stopping in a fortnight.",
        },
        check: {
          question: { te: "రోజుకు ఎన్ని ఫర్జ్ రక్అత్‌లు?", en: "How many obligatory units are there in a day?" },
          options: [
            { te: "17", en: "17" },
            { te: "12", en: "12" },
            { te: "20", en: "20" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "వెంటనే చేయడం ఎందుకు మేలు", en: "Why praying early is better" },
        body: {
          te: "ప్రవక్త ﷺను 'ఏ కర్మ అల్లాహ్‌కు అత్యంత ప్రియమైనది?' అని అడిగినప్పుడు ఆయన 'దాని సమయంలో నమాజ్' అన్నారు (బుఖారీ). సమయం మొదట్లోనే చేయడం ఉత్తమమని పండితులు అంటారు — ఒక్క మినహాయింపుతో: తీవ్రమైన వేడిలో జుహ్ర్‌ను కొంచెం చల్లబడేవరకు వాయిదా వేయడం సున్నత్ (బుఖారీ). ఆచరణాత్మక కారణం కూడా ఉంది: వాయిదా వేసిన నమాజ్ తప్పిపోయే నమాజ్. 'తర్వాత చేస్తాను' అనేది చాలా నమాజులు పోవడానికి కారణం.",
          en: "Asked which deed is most beloved to Allah, the Prophet ﷺ said the prayer in its time (Bukhari). Scholars hold that praying at the start of the window is best, with one exception: delaying Zuhr until the heat eases is sunnah in severe heat (Bukhari). There is a practical reason too. A delayed prayer is a prayer at risk, and I will do it later is how most missed prayers begin.",
        },
      },
      {
        heading: { te: "ప్రయాణం, ఇబ్బంది — వెసులుబాట్లు", en: "Travel and difficulty: the concessions" },
        body: {
          te: "ఇస్లాం ఇక్కడ గణనీయమైన వెసులుబాటు ఇస్తుంది, మరియు చాలామందికి తెలియదు. ఖస్ర్: ప్రయాణంలో నాలుగు రక్అత్‌ల ఫర్జ్ నమాజులు (జుహ్ర్, అస్ర్, ఇషా) రెండుగా కుదిస్తారు. ఫజ్ర్, మఘ్రిబ్ మారవు. జమ్అ: ప్రయాణంలో జుహ్ర్-అస్ర్‌ను, మఘ్రిబ్-ఇషాను కలిపి చేయవచ్చు. ఖురాన్ దీన్ని అనుమతిస్తుంది: 'మీరు భూమిలో ప్రయాణించినప్పుడు నమాజును కుదించడంలో మీపై దోషం లేదు' (అన్-నిసా 4:101). ఇది ఐచ్ఛికం కాదని కొందరు అంటారు, సున్నత్ అని చాలామంది అంటారు — ఏమైనా, ప్రయాణంలో పూర్తి నమాజ్ చేయాలని ఒత్తిడి పడనవసరం లేదు.",
          en: "Islam grants substantial concessions here that many people do not know about. Qasr: on a journey the four-unit obligatory prayers, Zuhr, Asr and Isha, are shortened to two, while Fajr and Maghrib stay as they are. Jam': on a journey Zuhr may be joined with Asr and Maghrib with Isha. The Quran permits it: 'When you travel through the land there is no blame on you for shortening the prayer' (An-Nisa 4:101). Some hold it is not optional and most hold it sunnah; either way, no one need feel obliged to pray in full while travelling.",
        },
      },
      {
        heading: { te: "నమాజ్ చేయకూడని సమయాలు", en: "The times when prayer is avoided" },
        body: {
          te: "మూడు చిన్న కాలాల్లో నఫిల్ నమాజ్ చేయకూడదు: సూర్యోదయ సమయంలో, సూర్యుడు సరిగ్గా నడినెత్తిన ఉన్నప్పుడు, సూర్యాస్తమయ సమయంలో. కారణం సూర్యుని ఆరాధించేవారి పోలికను తప్పించడం. ముఖ్యమైన స్పష్టత: ఇది నఫిల్ నమాజులకు మాత్రమే. తప్పిపోయిన ఫర్జ్ నమాజ్ గుర్తు వచ్చినప్పుడు ఏ సమయంలోనైనా చేయాలి — ప్రవక్త ﷺ 'ఎవరైనా నమాజ్ మరచిపోతే గుర్తు వచ్చినప్పుడే చేయాలి' అన్నారు (బుఖారీ).",
          en: "Voluntary prayer is avoided in three short periods: as the sun rises, when it is exactly at its zenith, and as it sets, so as not to resemble those who worshipped the sun. One important clarification: this applies to voluntary prayer. A missed obligatory prayer is prayed whenever it is remembered, since the Prophet ﷺ said whoever forgets a prayer should pray it when they remember (Bukhari).",
        },
      },
    ],
    takeaways: [
      { te: "సమయాలు సూర్యుని స్థానంతో ముడిపడినవి, గడియారంతో కాదు.", en: "The times track the sun, not the clock." },
      { te: "17 ఫర్జ్ రక్అత్‌లు; ముందు వాటిని స్థిరపరచుకోండి.", en: "Seventeen obligatory units; fix those first." },
      { te: "ప్రయాణంలో ఖస్ర్, జమ్అ — ఇది వెసులుబాటు, భారం కాదు.", en: "Shortening and joining on a journey is a concession, not a burden." },
    ],
    didYouKnow: [
      { te: "అస్ర్ నమాజును ఖురాన్ ప్రత్యేకంగా 'మధ్య నమాజ్' అని పేర్కొంటుందని చాలామంది పండితులు భావిస్తారు (అల్-బఖరా 2:238).", en: "Many scholars hold that Asr is the middle prayer singled out in Quran 2:238." },
      { te: "ధ్రువ ప్రాంతాల్లో సూర్యుడు నెలల తరబడి అస్తమించని చోట, సమీప సాధారణ ప్రాంతపు సమయాలను అనుసరించాలని పండితులు తీర్పు ఇచ్చారు.", en: "Where the sun does not set for months in polar regions, scholars have ruled that the timings of the nearest normal latitude are followed." },
    ],
    reflect: [
      { te: "మీరు ఏ నమాజ్‌ను ఎక్కువగా వాయిదా వేస్తారు? ఎందుకు? దాన్ని దేనికి జతచేయగలరు?", en: "Which prayer do you most often delay, and why? What could you attach it to?" },
    ],
    mistakes: [
      { te: "'తర్వాత చేస్తాను' — ఇదే చాలా నమాజులు పోవడానికి కారణం.", en: "I will do it later, which is how most missed prayers begin." },
      { te: "ప్రయాణంలో వెసులుబాట్లు ఉన్నాయని తెలియకపోవడం.", en: "Not knowing the travel concessions exist." },
      { te: "నిషిద్ధ సమయాల నియమాన్ని ఫర్జ్ నమాజులకూ వర్తింపజేయడం.", en: "Applying the avoided-times rule to obligatory prayers as well." },
    ],
    faqs: [
      {
        question: { te: "ఎంత దూరం వెళ్తే 'ప్రయాణి' అవుతారు?", en: "How far must one go to count as travelling?" },
        answer: {
          te: "మజ్‌హబ్‌ల మధ్య భేదం ఉంది. సాంప్రదాయ కొలత సుమారు 48 కిలోమీటర్లు (కొన్ని లెక్కల్లో 80 వరకు). ఆధునిక ప్రయాణ వేగాన్ని బట్టి కొందరు సమకాలీన పండితులు వేరుగా భావిస్తారు. మీ మజ్‌హబ్ ప్రకారం స్థానిక ఆలిమ్‌ను అడగండి.",
          en: "The schools differ. The traditional measure is roughly forty-eight kilometres, and up to eighty on some reckonings. Given modern travel speeds, some contemporary scholars assess it differently. Ask a local scholar for the position in your school.",
        },
      },
      {
        question: { te: "ఉద్యోగంలో నమాజ్ సమయం ఇవ్వకపోతే?", en: "What if work does not allow time to pray?" },
        answer: {
          te: "చాలా నమాజులకు కిటికీ కొన్ని గంటలు ఉంటుంది కాబట్టి విరామంలో సర్దుబాటు చేయవచ్చు. నమాజ్ ఐదు నిమిషాలే. చాలా చోట్ల అడిగితే అనుమతి దొరుకుతుంది — చాలామంది అడగనే అడగరు. అవసరమైతే జుహ్ర్-అస్ర్ కలపడం గురించి ఆలిమ్‌ను అడగండి; నిజమైన ఇబ్బంది ఉన్నప్పుడు కొందరు పండితులు దీన్ని అనుమతిస్తారు.",
          en: "Most prayers have a window of hours, so a break can usually be arranged, and the prayer itself takes five minutes. Permission is often given where people ask, and most never ask. If there is genuine difficulty, ask a scholar about joining Zuhr and Asr, which some permit in real need.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "మఘ్రిబ్ ఎప్పుడు మొదలవుతుంది?", en: "When does Maghrib begin?" },
        options: [
          { te: "సూర్యాస్తమయంతో", en: "At sunset" },
          { te: "ఎర్రదనం మాయమయ్యాక", en: "After the redness fades" },
          { te: "అర్ధరాత్రి", en: "At midnight" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రయాణంలో నాలుగు రక్అత్‌ల నమాజులు ఎన్నిగా కుదిస్తారు?", en: "On a journey, four-unit prayers are shortened to how many?" },
        options: [
          { te: "రెండు", en: "Two" },
          { te: "మూడు", en: "Three" },
          { te: "ఒకటి", en: "One" },
        ],
        answer: 0,
      },
      {
        question: { te: "తప్పిపోయిన ఫర్జ్ నమాజ్‌ను ఎప్పుడు చేయాలి?", en: "When should a missed obligatory prayer be prayed?" },
        options: [
          { te: "గుర్తు వచ్చినప్పుడే", en: "As soon as it is remembered" },
          { te: "మరుసటి రోజు అదే సమయంలో", en: "At the same time the next day" },
          { te: "అది చేయకూడదు", en: "It should not be prayed" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఫజ్ర్ 2 · జుహ్ర్ 4 · అస్ర్ 4 · మఘ్రిబ్ 3 · ఇషా 4 = 17.", en: "Fajr 2, Zuhr 4, Asr 4, Maghrib 3, Isha 4, seventeen in all." },
      { te: "ఖస్ర్: 4 → 2 · జమ్అ: జుహ్ర్+అస్ర్, మఘ్రిబ్+ఇషా.", en: "Qasr shortens four to two; jam' joins Zuhr with Asr and Maghrib with Isha." },
      { te: "నిషిద్ధ సమయాలు నఫిల్‌కు మాత్రమే.", en: "The avoided times apply to voluntary prayer only." },
    ],
    summary: {
      te: "ఐదు నమాజుల సమయాలు సూర్యుని స్థానంతో ముడిపడినవి. రోజుకు 17 ఫర్జ్ రక్అత్‌లు; కొత్తవారు ముందు వాటినే స్థిరపరచుకోవాలి. వెంటనే చేయడం ఉత్తమం. ప్రయాణంలో ఖస్ర్, జమ్అ వెసులుబాట్లు ఉన్నాయి. తప్పిపోయిన ఫర్జ్ నమాజ్ ఏ సమయంలోనైనా చేయాలి.",
      en: "The five windows track the sun. There are seventeen obligatory units a day, and a beginner should fix those first. Praying early is better. Travel brings the concessions of shortening and joining. A missed obligatory prayer is prayed whenever it is remembered.",
    },
    apply: {
      te: "ఆచరణ: మీ ఊరి నమాజ్ సమయాల పట్టికను ఈ రోజు మీ ఫోన్‌లో పెట్టుకోండి.",
      en: "Apply it: put your own town's prayer timetable on your phone today.",
    },
    reading: [
      { label: "Prayer times tool", url: "/knowledge-center" },
      { label: "How to pray", url: "/knowledge-center/learn-salah/howtopray" },
    ],
  },

  {
    slug: "khushu",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 6 — ఖుషూ: హృదయం హాజరుగా",
      en: "Level 6 — Khushu: presence of heart",
    },
    intro: {
      te: "మీరు నమాజ్‌లో నిలబడి, ఐదు నిమిషాల తర్వాత సలామ్ చెప్పి, మీరు ఏమి చదివారో గుర్తు లేకపోవడం — ఇది అందరికీ జరుగుతుంది. ఖుషూ అంటే ఆ సమస్యకు పరిష్కారం, మరియు దానికి పద్ధతులు ఉన్నాయి.",
      en: "Standing in prayer, giving the salam five minutes later, and not remembering a word of what you recited: this happens to everyone. Khushu is the answer to that, and there are methods for it.",
    },
    sections: [
      {
        heading: { te: "ఖురాన్ దీన్ని విజయంతో ముడిపెడుతుంది", en: "The Quran ties it to success" },
        body: {
          te: "'విశ్వాసులు విజయం సాధించారు — వారు తమ నమాజులో ఖుషూతో ఉంటారు' (అల్-ముఅమినూన్ 23:1-2). గమనించండి: 'వారు నమాజ్ చేస్తారు' అని కాదు — 'వారు తమ నమాజులో ఖుషూతో ఉంటారు'. నమాజ్ చేయడం మరియు నమాజ్‌లో హాజరుగా ఉండటం రెండు వేర్వేరు విషయాలు, మరియు ఖురాన్ రెండోదాన్ని విజయంతో ముడిపెడుతుంది. ఇది భయపెట్టడానికి కాదు — ఇది లక్ష్యాన్ని స్పష్టం చేయడానికి.",
          en: "'The believers have succeeded: those who are humbly submissive in their prayer' (Al-Mu'minun 23:1-2). Note what it does not say. Not those who pray, but those who are present in their prayer. Performing the prayer and being in it are two different things, and the Quran ties success to the second. That is not said to frighten but to make the target clear.",
        },
        check: {
          question: { te: "ఖురాన్ 23:1-2 దేన్ని విజయంతో ముడిపెడుతుంది?", en: "What does Quran 23:1-2 tie success to?" },
          options: [
            { te: "నమాజులో ఖుషూతో ఉండటం", en: "Being humbly present in prayer" },
            { te: "నమాజ్ చేయడం మాత్రమే", en: "Merely performing the prayer" },
            { te: "ఎక్కువ నమాజులు చేయడం", en: "Praying more often" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మొదటి పరిష్కారం: అర్థం తెలుసుకోవడం", en: "The first remedy: knowing the meaning" },
        body: {
          te: "మీ మనసు నమాజ్‌లో తిరుగుతుంది ఎందుకంటే అది ఖాళీగా ఉంది. మీరు అర్థం తెలియని శబ్దాలను ఉచ్చరిస్తుంటే మనసుకు పట్టుకోవడానికి ఏమీ లేదు, కాబట్టి అది వేరే చోటికి వెళుతుంది. సూరా అల్-ఫాతిహా అర్థం తెలిస్తే — 'నీవే మేము ఆరాధించేది, నీ సహాయమే మేము కోరేది' — ఆ వాక్యం మిమ్మల్ని అక్కడే నిలబెడుతుంది. ఇది ఖుషూకు అత్యంత శక్తివంతమైన ఒకే ఒక పరిష్కారం, మరియు దీనికి ఇరవై ఐదు పదాలు నేర్చుకుంటే చాలు.",
          en: "Your mind wanders in prayer because it is idle. If you are producing sounds whose meaning you do not know, there is nothing for the mind to hold, so it goes elsewhere. Know what al-Fatihah says, that You alone we worship and Your help alone we seek, and the sentence holds you in place. This is the single most powerful remedy for khushu, and it takes about twenty-five words to begin.",
        },
        check: {
          question: { te: "మనసు నమాజ్‌లో ఎందుకు తిరుగుతుంది?", en: "Why does the mind wander in prayer?" },
          options: [
            { te: "అర్థం తెలియకపోతే దానికి పట్టుకోవడానికి ఏమీ లేదు", en: "Without meaning there is nothing for it to hold on to" },
            { te: "నమాజ్ చాలా పొడవు కాబట్టి", en: "The prayer is too long" },
            { te: "అది సహజం, పరిష్కారం లేదు", en: "It is natural and cannot be helped" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఆచరణాత్మక అడ్డంకులను తొలగించడం", en: "Removing the practical obstacles" },
        body: {
          te: "ప్రవక్త ﷺ దీన్ని ఆచరణాత్మకంగా చూశారు. ఆకలిగా ఉన్నప్పుడు, భోజనం సిద్ధంగా ఉన్నప్పుడు నమాజ్ చేయవద్దని ఆయన చెప్పారు; మలమూత్ర విసర్జన ఆపుకుని నమాజ్ చేయవద్దని కూడా (ముస్లిం). అంటే: శరీరం అసౌకర్యంగా ఉంటే హృదయం హాజరు కాదు. ఇతర అడ్డంకులు: ఫోన్ (దాన్ని వేరే గదిలో పెట్టండి), దృష్టిని మళ్ళించే స్థలం (గోడ వైపు తిరగండి), తొందర (ఐదు నిమిషాలు ముందుగా వుజూ చేయండి). ఆయిషా (ర/అ) ఇంట్లో నమూనాలున్న తెరను ప్రవక్త ﷺ తీసేయమన్నారు — అది ఆయన దృష్టిని మళ్ళిస్తోందని (బుఖారీ).",
          en: "The Prophet ﷺ treated this practically. He said not to pray when food is served and you are hungry, nor while holding back the need to relieve yourself (Muslim). The point is that an uncomfortable body will not leave the heart present. Other obstacles: the phone, which belongs in another room; a distracting spot, so face a wall; and rushing, so make wudu five minutes earlier. He asked Aisha (RA) to remove a patterned curtain because it had distracted him in prayer (Bukhari).",
        },
      },
      {
        heading: { te: "నమాజ్ లోపల ఏమి చేయాలి", en: "What to do inside the prayer" },
        body: {
          te: "మూడు పద్ధతులు. ఒకటి: దృష్టిని సజ్దా స్థానంపై ఉంచండి. ఇది కేవలం సలహా కాదు — ప్రవక్త ﷺ నమాజ్‌లో పైకి చూడటాన్ని తీవ్రంగా హెచ్చరించారు (బుఖారీ). రెండు: 'ఇది నా చివరి నమాజ్' అని అనుకోండి. ప్రవక్త ﷺ ఒక వ్యక్తికి ఇచ్చిన సలహా ఇదే — 'వీడ్కోలు చెప్పే వ్యక్తిలా నమాజ్ చేయి' (ఇబ్న్ మాజా). మూడు: మనసు తిరిగినప్పుడు దానితో పోరాడకండి, గమనించి తిరిగి పదాలకు రండి. తిరగడం జరుగుతుంది; ముఖ్యమైనది తిరిగి రావడం.",
          en: "Three methods. Keep your gaze at the place of prostration; this is more than advice, since the Prophet ﷺ warned sharply against looking upward in prayer (Bukhari). Pray as though it were your last: he advised a man to pray like someone bidding farewell (Ibn Majah). And when the mind wanders, do not fight it; notice it and come back to the words. The wandering will happen, and what matters is the returning.",
        },
      },
      {
        heading: { te: "నెమ్మదిగా చేయడం", en: "Slowing down" },
        body: {
          te: "ఖుషూకు ఇది సరళమైన, అత్యంత విస్మరించబడిన పరిష్కారం. మీరు నమాజ్‌ను రెండు నిమిషాల్లో ముగిస్తే హృదయం హాజరు కావడానికి సమయమే లేదు. ప్రతి స్థానంలో ఒకసారికి బదులు మూడుసార్లు తస్బీహ్ చెప్పండి. ఫాతిహాలో ప్రతి ఆయత్ తర్వాత ఆగండి — ప్రవక్త ﷺ అలాగే చేసేవారని ఉమ్మ్ సలమా (ర/అ) వర్ణించారు. ఒక హదీసు ఖుద్సీలో అల్లాహ్ ఫాతిహాలోని ప్రతి ఆయతుకు సమాధానం ఇస్తానని చెప్పాడు (ముస్లిం) — ఆగకపోతే ఆ సమాధానానికి చోటే ఉండదు.",
          en: "This is the simplest and most overlooked remedy. Finish the prayer in two minutes and the heart has no time to arrive. Say the tasbih three times in each position rather than once. Pause after each verse of al-Fatihah, which is how Umm Salamah (RA) described the Prophet's recitation. In a hadith qudsi Allah says He answers each verse of al-Fatihah as it is recited (Muslim), and without the pause there is no room for that answer.",
        },
      },
    ],
    takeaways: [
      { te: "ఖురాన్ 23:1-2 విజయాన్ని నమాజ్‌లో ఖుషూతో ముడిపెడుతుంది.", en: "Quran 23:1-2 ties success to presence in prayer." },
      { te: "అత్యంత శక్తివంతమైన పరిష్కారం: మీరు చెప్పేదాని అర్థం తెలుసుకోవడం.", en: "The most powerful remedy is knowing what you are saying." },
      { te: "మనసు తిరుగుతుంది; ముఖ్యమైనది తిరిగి రావడం.", en: "The mind will wander; what matters is returning." },
    ],
    didYouKnow: [
      { te: "హదీసు ఖుద్సీలో అల్లాహ్ చెప్పాడు: 'నేను నమాజును నా దాసుడికీ నాకూ మధ్య రెండు భాగాలుగా విభజించాను' — ఫాతిహాలోని ప్రతి ఆయతుకు ఆయన సమాధానం ఇస్తాడు (ముస్లిం).", en: "In a hadith qudsi Allah says He has divided the prayer between Himself and His servant, answering each verse of al-Fatihah (Muslim)." },
    ],
    reflect: [
      { te: "మీ చివరి నమాజ్‌లో మీరు ఏమి చదివారో గుర్తుందా? లేకపోతే, ఈ పాఠంలోని ఏ పరిష్కారం మొదట ప్రయత్నిస్తారు?", en: "Do you remember what you recited in your last prayer? If not, which remedy here will you try first?" },
    ],
    mistakes: [
      { te: "ఖుషూ ఒక భావన అని, దానికి పద్ధతులు లేవని అనుకోవడం.", en: "Treating khushu as a mood rather than something with methods." },
      { te: "మనసు తిరిగినందుకు అపరాధ భావనలో మునిగి, తిరిగి రాకపోవడం.", en: "Sinking into guilt over a wandering mind instead of simply returning." },
      { te: "వేగంగా నమాజ్ ముగించి, ఖుషూ ఎందుకు రావడం లేదని ఆశ్చర్యపడటం.", en: "Rushing the prayer and then wondering why presence does not come." },
    ],
    faqs: [
      {
        question: { te: "నమాజ్‌లో ఆలోచనలు వస్తే నమాజ్ చెల్లదా?", en: "Do wandering thoughts invalidate the prayer?" },
        answer: {
          te: "లేదు. నమాజ్ చెల్లుతుంది. ప్రవక్త ﷺ స్వయంగా చెప్పారు: షైతాన్ నమాజ్‌లో వచ్చి 'ఇది గుర్తుందా, అది గుర్తుందా' అని మనసును మళ్ళిస్తాడు (బుఖారీ). అంటే ఇది సార్వత్రిక అనుభవం, లోపం కాదు. ప్రతిఫలం తగ్గవచ్చు, కానీ నమాజ్ చెల్లుతుంది. తిరిగి రండి, మళ్ళీ మొదలుపెట్టనవసరం లేదు.",
          en: "No, the prayer is valid. The Prophet ﷺ himself described Shaytan coming in prayer to remind a person of this and that (Bukhari), so it is a universal experience rather than a defect. The reward may be reduced, but the prayer stands. Come back to it; you do not start over.",
        },
      },
      {
        question: { te: "ఖుషూ ఒక్కసారిగా వస్తుందా?", en: "Does khushu arrive all at once?" },
        answer: {
          te: "రాదు. ఇది ఒక నైపుణ్యం లాంటిది — క్రమంగా పెరుగుతుంది. ఒక్క నమాజ్‌లో ఒక్క ఆయతుపై పూర్తిగా దృష్టి పెట్టడంతో మొదలుపెట్టండి. ఒక నమాజ్‌లో మీరు హాజరుగా ఉన్న క్షణాలు కొన్ని ఉంటే, అది పురోగతి. పరిపూర్ణతను ఆశించి ప్రయత్నం మానేయవద్దు.",
          en: "No. It behaves like a skill and grows gradually. Start by giving one verse in one prayer your full attention. If a prayer contains a few moments where you were genuinely present, that is progress. Do not abandon the effort because it is not yet perfect.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నమాజ్‌లో దృష్టి ఎక్కడ ఉంచాలి?", en: "Where should the gaze rest in prayer?" },
        options: [
          { te: "సజ్దా స్థానంపై", en: "At the place of prostration" },
          { te: "పైకి ఆకాశం వైపు", en: "Upward at the sky" },
          { te: "చుట్టూ", en: "Around the room" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రవక్త ﷺ ఏ పరిస్థితిలో నమాజ్ చేయవద్దన్నారు?", en: "In which state did the Prophet ﷺ say not to pray?" },
        options: [
          { te: "భోజనం సిద్ధంగా ఉండి ఆకలిగా ఉన్నప్పుడు", en: "When hungry with food served" },
          { te: "అలసిపోయినప్పుడు", en: "When tired" },
          { te: "చలిగా ఉన్నప్పుడు", en: "When cold" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖుషూకు అత్యంత శక్తివంతమైన పరిష్కారం ఏమిటి?", en: "What is the most powerful remedy for khushu?" },
        options: [
          { te: "మీరు చెప్పేదాని అర్థం తెలుసుకోవడం", en: "Knowing what you are saying" },
          { te: "ఎక్కువ నమాజులు చేయడం", en: "Praying more often" },
          { te: "వేగంగా చేయడం", en: "Praying faster" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "23:1-2 — ఖుషూ విజయంతో ముడిపడినది.", en: "23:1-2 ties khushu to success." },
      { te: "అర్థం · అడ్డంకులు తొలగించడం · నెమ్మదిగా · తిరిగి రావడం.", en: "Meaning, remove obstacles, slow down, keep returning." },
      { te: "ఆలోచనలు నమాజ్‌ను చెల్లనిదిగా చేయవు.", en: "Wandering thoughts do not invalidate the prayer." },
    ],
    summary: {
      te: "ఖుషూ ఒక భావన కాదు, పద్ధతుల ఫలితం. మీరు చెప్పేదాని అర్థం తెలుసుకోండి — ఇదే అత్యంత శక్తివంతమైనది. శరీర అసౌకర్యం, ఫోన్, తొందర వంటి అడ్డంకులను తొలగించండి. నెమ్మదిగా చేయండి. మనసు తిరిగినప్పుడు తిరిగి రండి; అది నమాజ్‌ను చెల్లనిదిగా చేయదు.",
      en: "Khushu is not a mood but the result of methods. Know what you are saying, which is the most powerful of them. Remove the obstacles: bodily discomfort, the phone, rushing. Slow down. And when the mind wanders, return, because it does not invalidate the prayer.",
    },
    apply: {
      te: "ఆచరణ: తర్వాతి నమాజ్‌లో ఫాతిహాలోని ప్రతి ఆయత్ తర్వాత ఒక్క క్షణం ఆగండి.",
      en: "Apply it: in your next prayer, pause for a moment after each verse of al-Fatihah.",
    },
    reading: [
      { label: "Understanding Quranic words", url: "/knowledge-center/learn-quran/words" },
      { label: "Fixing common mistakes", url: "/knowledge-center/learn-salah/fixing-salah" },
    ],
  },

  {
    slug: "sunnah-salah",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 7 — సున్నత్, నఫిల్ నమాజులు",
      en: "Level 7 — Sunnah and voluntary prayers",
    },
    intro: {
      te: "ఫర్జ్ నమాజులకు మించి ప్రవక్త ﷺ చేసిన అదనపు నమాజులు ఉన్నాయి. ఇవి కేవలం అదనపు ప్రతిఫలం కోసం కాదు — వాటికి ఒక ప్రత్యేకమైన, ఆచరణాత్మకమైన పని ఉంది.",
      en: "Beyond the obligatory prayers there are the additional ones the Prophet ﷺ kept. They are not only extra reward; they do a specific and practical job.",
    },
    sections: [
      {
        heading: { te: "అవి ఫర్జ్ నమాజులను కాపాడతాయి", en: "They protect the obligatory prayers" },
        body: {
          te: "ఇది చాలామందికి తెలియని ముఖ్యమైన విషయం. ఒక హదీసులో: పునరుత్థాన దినాన దాసుడి ఫర్జ్ నమాజులలో లోపం కనిపిస్తే, అల్లాహ్ 'నా దాసుడికి నఫిల్ నమాజులు ఏమైనా ఉన్నాయా చూడండి' అని చెబుతాడు, మరియు వాటితో ఫర్జ్ లోపాన్ని పూరిస్తారు (అబూ దావూద్, తిర్మిజీ). అంటే సున్నత్ నమాజులు ఒక భద్రతా వలయం. మన ఫర్జ్ నమాజులు పరిపూర్ణమైనవి కావు — దృష్టి తప్పుతుంది, తొందరపడతాం. ఈ అదనపు నమాజులు ఆ ఖాళీని పూరిస్తాయి.",
          en: "This is the part most people do not know. In a hadith, if a shortfall is found in a servant's obligatory prayers on the Day of Judgement, Allah says to look for voluntary prayers, and the shortfall is made up from them (Abu Dawud, Tirmidhi). So the sunnah prayers act as a margin. Our obligatory prayers are not perfect; attention slips and we hurry. These make up the difference.",
        },
        check: {
          question: { te: "నఫిల్ నమాజుల ప్రత్యేక పని ఏమిటి?", en: "What particular job do voluntary prayers do?" },
          options: [
            { te: "ఫర్జ్ నమాజుల లోపాన్ని పూరిస్తాయి", en: "They make up shortfalls in the obligatory prayers" },
            { te: "అవి ఫర్జ్ స్థానంలో వస్తాయి", en: "They replace the obligatory ones" },
            { te: "వాటికి ప్రత్యేక పని లేదు", en: "They have no particular job" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "రవాతిబ్ — పన్నెండు రక్అత్‌లు", en: "The rawatib: twelve units" },
        body: {
          te: "ఉమ్మ్ హబీబా (ర/అ) ఉల్లేఖించారు: ప్రవక్త ﷺ అన్నారు — 'ఎవరైతే రోజూ పన్నెండు రక్అత్‌లు నఫిల్ నమాజ్ చేస్తారో, వారికి స్వర్గంలో ఒక ఇల్లు నిర్మించబడుతుంది' (ముస్లిం). ఆ పన్నెండు: ఫజ్ర్‌కు ముందు 2, జుహ్ర్‌కు ముందు 4 తర్వాత 2, మఘ్రిబ్ తర్వాత 2, ఇషా తర్వాత 2. వీటిలో ఫజ్ర్‌కు ముందు రెండు అత్యంత బలమైనవి — ప్రవక్త ﷺ వాటి గురించి 'అవి ప్రపంచం, అందులోని అన్నిటికంటే మేలైనవి' అన్నారు (ముస్లిం). రోజుకు రెండు రక్అత్‌లు, మూడు నిమిషాలు.",
          en: "Umm Habibah (RA) narrated that the Prophet ﷺ said whoever prays twelve voluntary units in a day will have a house built for them in Paradise (Muslim). The twelve are two before Fajr, four before and two after Zuhr, two after Maghrib and two after Isha. Of these the two before Fajr are the strongest; the Prophet ﷺ said they are better than the world and everything in it (Muslim). Two units, three minutes.",
        },
        check: {
          question: { te: "రవాతిబ్‌లో ఎన్ని రక్అత్‌లు?", en: "How many units are in the rawatib?" },
          options: [
            { te: "పన్నెండు", en: "Twelve" },
            { te: "పదిహేడు", en: "Seventeen" },
            { te: "ఎనిమిది", en: "Eight" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "దుహా — ఉదయపు నమాజ్", en: "Duha, the mid-morning prayer" },
        body: {
          te: "సూర్యోదయం తర్వాత సుమారు ఇరవై నిమిషాలకు మొదలై జుహ్ర్‌కు కొద్దిసేపటి ముందు వరకు — రెండు నుండి ఎనిమిది రక్అత్‌లు. ఒక హదీసులో ప్రవక్త ﷺ చెప్పారు: మనిషి శరీరంలోని ప్రతి కీలుకు రోజూ ఒక సదఖా ఇవ్వాలి, మరియు దుహా రెండు రక్అత్‌లు వాటన్నిటికీ సరిపోతాయి (ముస్లిం). ఇది ఉద్యోగానికి వెళ్ళేవారికి కష్టం కావచ్చు — వారానికి రెండు రోజులతో మొదలుపెట్టండి, లేదా వారాంతంలో. ఏమీ చేయకపోవడం కంటే వారానికి రెండుసార్లు మేలు.",
          en: "From about twenty minutes after sunrise until shortly before Zuhr, two to eight units. In a hadith the Prophet ﷺ said that a charity is due each day on every joint of the body, and that two units of Duha suffice for all of them (Muslim). It can be awkward for someone at work, so start with two days a week or with weekends. Twice a week beats not at all.",
        },
      },
      {
        heading: { te: "తహజ్జుద్ — రాత్రి నమాజ్", en: "Tahajjud, the night prayer" },
        body: {
          te: "ఖురాన్ దీన్ని ప్రవక్త ﷺకు ఒక 'అదనపు' (నాఫిలా)గా వర్ణిస్తుంది (అల్-ఇస్రా 17:79). ఇది నిద్ర తర్వాత లేచి చేసేది, రెండేసి రక్అత్‌లుగా. రాత్రి చివరి మూడో భాగం ఉత్తమ సమయం. ఆచరణాత్మక సలహా: ప్రతిరోజూ లేవాలని లక్ష్యం పెట్టుకోవద్దు — అది రెండు వారాల్లో ఆగిపోతుంది. వారానికి ఒక రాత్రితో మొదలుపెట్టండి, రెండు రక్అత్‌లు. అది నిలిచాక పెంచండి. తహజ్జుద్ గురించి పూర్తి వివరాలు రాత్రి నమాజ్ పాఠంలో ఉన్నాయి.",
          en: "The Quran describes it as an additional prayer for the Prophet ﷺ (Al-Isra 17:79). It is prayed after sleeping, in pairs of two, and the last third of the night is best. Practical advice: do not aim at every night, which stops within a fortnight. Start with one night a week and two units. Build once that holds. The night prayer lesson covers it in full.",
        },
      },
      {
        heading: { te: "ఎక్కడ మొదలుపెట్టాలి", en: "Where to start" },
        body: {
          te: "అన్నీ ఒకేసారి కాదు. ఒక క్రమం సూచన: ముందు ఫజ్ర్‌కు ముందు రెండు రక్అత్‌లు — ఇవి బలమైనవి, మరియు మీరు ఇప్పటికే ఫజ్ర్‌కు లేచి ఉంటారు. అది ఒక నెల నిలిచాక మఘ్రిబ్ తర్వాత రెండు చేర్చండి. తర్వాత ఇషా తర్వాత రెండు. తర్వాత జుహ్ర్. ఒక సంవత్సరంలో మీరు పన్నెండు రవాతిబ్ చేరుకోగలరు, మరియు అవి నిలుస్తాయి. ప్రవక్త ﷺ మాట ఇక్కడ నేరుగా వర్తిస్తుంది: 'అల్లాహ్‌కు అత్యంత ప్రియమైన ఆచరణ తక్కువైనా నిరంతరం చేసేది' (బుఖారీ).",
          en: "Not all at once. A suggested order: begin with the two before Fajr, which are the strongest and which you are already awake for. Once that has held for a month, add two after Maghrib. Then two after Isha. Then Zuhr. Within a year you can reach all twelve, and they will hold. The Prophet's words apply directly here: the deeds most beloved to Allah are the constant ones, however small (Bukhari).",
        },
      },
    ],
    takeaways: [
      { te: "నఫిల్ నమాజులు ఫర్జ్ నమాజుల లోపాన్ని పూరిస్తాయి.", en: "Voluntary prayers make up shortfalls in the obligatory ones." },
      { te: "రవాతిబ్ పన్నెండు రక్అత్‌లు — స్వర్గంలో ఒక ఇల్లు (ముస్లిం).", en: "The twelve rawatib units: a house in Paradise (Muslim)." },
      { te: "ఒకేసారి అన్నీ కాదు — ఫజ్ర్‌కు ముందు రెండింటితో మొదలుపెట్టండి.", en: "Not all at once; start with the two before Fajr." },
    ],
    didYouKnow: [
      { te: "ఫజ్ర్‌కు ముందు రెండు రక్అత్‌ల గురించి ప్రవక్త ﷺ 'అవి ప్రపంచం, అందులోని అన్నిటికంటే మేలైనవి' అన్నారు (ముస్లిం).", en: "Of the two units before Fajr the Prophet ﷺ said they are better than the world and all it contains (Muslim)." },
      { te: "ప్రవక్త ﷺ నఫిల్ నమాజులను ఇంట్లో చేయమని ప్రోత్సహించారు — 'మీ ఇళ్ళను సమాధులుగా చేయవద్దు' (ముస్లిం).", en: "The Prophet ﷺ encouraged praying voluntary prayers at home: do not make your houses graves (Muslim)." },
    ],
    reflect: [
      { te: "మీరు ఇప్పటికే ఫజ్ర్‌కు లేస్తున్నారు. దానికి ముందు మూడు నిమిషాలు చేర్చగలరా?", en: "You already wake for Fajr. Could you add three minutes before it?" },
    ],
    mistakes: [
      { te: "అన్ని సున్నత్‌లను ఒకేసారి మొదలుపెట్టి రెండు వారాల్లో ఆగిపోవడం.", en: "Starting every sunnah at once and stopping within a fortnight." },
      { te: "సున్నత్‌లు చేస్తూ ఫర్జ్ నమాజులను నిర్లక్ష్యం చేయడం — క్రమం తలకిందులు.", en: "Keeping the sunnah while neglecting the obligatory, which is the order reversed." },
      { te: "నఫిల్ నమాజులన్నీ మస్జిద్‌లోనే చేయాలని అనుకోవడం — ఇంట్లో ఉత్తమం.", en: "Assuming voluntary prayers belong in the mosque, when home is better for them." },
    ],
    faqs: [
      {
        question: { te: "సున్నత్ నమాజ్ తప్పితే తర్వాత చేయవచ్చా?", en: "Can a missed sunnah prayer be made up?" },
        answer: {
          te: "అవును. ప్రవక్త ﷺ కొన్ని సందర్భాల్లో జుహ్ర్ తర్వాతి సున్నత్‌ను అస్ర్ తర్వాత చేశారని ఉల్లేఖనలు ఉన్నాయి. ఫజ్ర్‌కు ముందు రెండు రక్అత్‌లు తప్పితే సూర్యోదయం తర్వాత చేయవచ్చని చాలామంది పండితులు అంటారు. అయితే వాటిని వాటి సమయంలోనే చేయడం ఉత్తమం.",
          en: "Yes. Narrations report the Prophet ﷺ praying the sunnah of Zuhr after Asr on occasion, and many scholars hold that the two before Fajr may be prayed after sunrise if missed. Praying them in their own time remains better.",
        },
      },
      {
        question: { te: "నఫిల్ నమాజ్‌లో ఏ సూరాలు చదవాలి?", en: "Which surahs should be recited in voluntary prayer?" },
        answer: {
          te: "మీకు తెలిసినవి ఏవైనా. నిర్దిష్ట నియమం లేదు. అయితే కొన్ని సున్నత్‌లు ఉన్నాయి: ఫజ్ర్‌కు ముందు రెండు రక్అత్‌లలో సూరా అల్-కాఫిరూన్, అల్-ఇఖ్లాస్ చదవడం ప్రవక్త ﷺ నుండి ఉల్లేఖించబడింది (ముస్లిం).",
          en: "Whatever you know; there is no fixed rule. Some practices are narrated though: reciting Surah al-Kafirun and al-Ikhlas in the two units before Fajr is reported from the Prophet ﷺ (Muslim).",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఫజ్ర్‌కు ముందు ఎన్ని సున్నత్ రక్అత్‌లు?", en: "How many sunnah units come before Fajr?" },
        options: [
          { te: "రెండు", en: "Two" },
          { te: "నాలుగు", en: "Four" },
          { te: "ఆరు", en: "Six" },
        ],
        answer: 0,
      },
      {
        question: { te: "దుహా నమాజ్ ఎప్పుడు?", en: "When is Duha prayed?" },
        options: [
          { te: "సూర్యోదయం తర్వాత జుహ్ర్‌కు ముందు", en: "After sunrise and before Zuhr" },
          { te: "మఘ్రిబ్ తర్వాత", en: "After Maghrib" },
          { te: "అర్ధరాత్రి", en: "At midnight" },
        ],
        answer: 0,
      },
      {
        question: { te: "నఫిల్ నమాజులు ఎక్కడ చేయడం ఉత్తమం?", en: "Where is it better to pray voluntary prayers?" },
        options: [
          { te: "ఇంట్లో", en: "At home" },
          { te: "మస్జిద్‌లో మాత్రమే", en: "Only in the mosque" },
          { te: "బహిరంగ ప్రదేశంలో", en: "Outdoors" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "రవాతిబ్ 12: ఫజ్ర్ 2 · జుహ్ర్ 4+2 · మఘ్రిబ్ 2 · ఇషా 2.", en: "Twelve rawatib: Fajr 2, Zuhr 4 and 2, Maghrib 2, Isha 2." },
      { te: "నఫిల్ ఫర్జ్ లోపాన్ని పూరిస్తుంది.", en: "Voluntary prayers cover shortfalls in the obligatory." },
      { te: "ఒకదానితో మొదలు; నిలిచాక పెంచండి.", en: "Start with one and build once it holds." },
    ],
    summary: {
      te: "సున్నత్, నఫిల్ నమాజులు అదనపు ప్రతిఫలం మాత్రమే కాదు — అవి ఫర్జ్ నమాజుల లోపాలను పూరిస్తాయి. రవాతిబ్ పన్నెండు రక్అత్‌లు స్వర్గంలో ఇల్లు వాగ్దానం చేస్తాయి. దుహా, తహజ్జుద్ కూడా ఉన్నాయి. కీలకం: అన్నీ ఒకేసారి కాదు — ఫజ్ర్‌కు ముందు రెండింటితో మొదలుపెట్టండి.",
      en: "The sunnah and voluntary prayers are not only extra reward; they cover shortfalls in the obligatory ones. The twelve rawatib carry the promise of a house in Paradise, and there are Duha and Tahajjud besides. The key is not to start everything at once but with the two before Fajr.",
    },
    apply: {
      te: "ఆచరణ: రేపటి ఫజ్ర్‌కు ముందు రెండు రక్అత్‌లు చేయండి — మూడు నిమిషాలు.",
      en: "Apply it: pray two units before Fajr tomorrow. Three minutes.",
    },
    reading: [
      { label: "The night prayer", url: "/knowledge-center/special-prayers/night-prayer" },
      { label: "Special Prayers portal", url: "/knowledge-center/special-prayers" },
    ],
  },

  {
    slug: "fixing-salah",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 8 — సాధారణ పొరపాట్లను సరిదిద్దడం",
      en: "Level 8 — Fixing common mistakes",
    },
    intro: {
      te: "చాలామంది ఏళ్ళ తరబడి అదే పొరపాట్లతో నమాజ్ చేస్తారు, ఎందుకంటే ఎవరూ చెప్పరు. ఈ పాఠం ఆ పొరపాట్లను వరుసగా చూపుతుంది — నమాజును చెల్లనిదిగా చేసేవి, కేవలం నాణ్యతను తగ్గించేవి వేరుగా.",
      en: "Many people pray with the same errors for years because no one tells them. This lesson lists them, separating the ones that invalidate a prayer from the ones that only reduce its quality.",
    },
    sections: [
      {
        heading: { te: "నమాజును చెల్లనిదిగా చేసేవి", en: "The ones that invalidate" },
        body: {
          te: "ఇవి తీవ్రమైనవి, ముందు వీటిని సరిచేసుకోండి. ఒకటి: తుమానీనా లేకపోవడం — స్థానాల మధ్య ఆగకుండా ప్రవహించడం. ప్రవక్త ﷺ ఒక వ్యక్తికి 'తిరిగి వెళ్ళి నమాజ్ చేయి, నీవు నమాజ్ చేయలేదు' అని చెప్పింది ఇందుకే. రెండు: ఒక ఫర్జ్ చర్యను వదిలేయడం — ఉదాహరణకు ఒక సజ్దా, లేదా అల్-ఫాతిహా (దాన్ని ఫర్జ్‌గా భావించే మజ్‌హబ్‌లలో). మూడు: ఉద్దేశపూర్వకంగా మాట్లాడటం. నాలుగు: వుజూ భంగమవడం. ఐదు: ఖిబ్లా నుండి ఛాతీని పూర్తిగా తిప్పడం.",
          en: "These are the serious ones and should be fixed first. Lack of stillness, flowing from one position into the next without settling, which is why the Prophet ﷺ told a man to go back and pray because he had not prayed. Leaving out an obligatory act, such as a prostration, or al-Fatihah in the schools that make it obligatory. Speaking deliberately. Wudu breaking. And turning the chest fully away from the qiblah.",
        },
        check: {
          question: { te: "వీటిలో నమాజును చెల్లనిదిగా చేసేది ఏది?", en: "Which of these invalidates the prayer?" },
          options: [
            { te: "స్థానాల మధ్య ఆగకపోవడం", en: "Not settling between positions" },
            { te: "ఆలోచనలు రావడం", en: "Wandering thoughts" },
            { te: "కళ్ళు మూసుకోవడం", en: "Closing the eyes" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "శరీర భంగిమ పొరపాట్లు", en: "Errors of posture" },
        body: {
          te: "రుకూ: వీపు నేలకు సమాంతరంగా ఉండాలి — సగం వంగడం సరిపోదు. ఒక ప్రమాణం: వీపుపై ఒక గ్లాసు నీరు పెడితే అది ఒరగకూడదు. సజ్దా: ఏడు అవయవాలూ నేలను తాకాలి — నుదురు మరియు ముక్కు, రెండు అరచేతులు, రెండు మోకాళ్ళు, రెండు పాదాల వేళ్ళు. పాదాలను నేల నుండి ఎత్తడం సాధారణ పొరపాటు. మోచేతులను నేలపై పెట్టడం మరొకటి — ప్రవక్త ﷺ దీన్ని కుక్క కూర్చునే విధానంతో పోల్చి వారించారు (బుఖారీ). పురుషులు సజ్దాలో చేతులను శరీరం నుండి దూరంగా ఉంచాలి.",
          en: "Bowing: the back should be level, and half-bending is not enough. One test is that a glass of water on the back should not tip. Prostration: all seven limbs touch, forehead with the nose, two palms, two knees, the toes of both feet. Lifting the feet off the ground is a common error, and resting the forearms on the ground is another, which the Prophet ﷺ forbade, comparing it to the way a dog sits (Bukhari). Men should keep the arms away from the body in prostration.",
        },
        check: {
          question: { te: "రుకూలో వీపు ఎలా ఉండాలి?", en: "How should the back be in bowing?" },
          options: [
            { te: "నేలకు సమాంతరంగా", en: "Level with the ground" },
            { te: "సగం వంగి", en: "Half bent" },
            { te: "పూర్తిగా నిటారుగా", en: "Fully upright" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "పఠన పొరపాట్లు", en: "Errors of recitation" },
        body: {
          te: "అత్యంత సాధారణమైనది: ఫాతిహాను ఒక్క శ్వాసలో పరుగెత్తించడం. ప్రతి ఆయత్ తర్వాత ఆగడం సున్నత్, మరియు అది అర్థం చేసుకోవడానికి అవకాశం ఇస్తుంది. రెండోది: అక్షరాలను తప్పుగా పలకడం — ముఖ్యంగా 'సిరాత్' లోని 'స', 'అల్-ఆలమీన్' లోని 'ఐన్'. మూడోది: 'ఆమీన్'ను వినిపించకుండా చెప్పడం (షాఫయీ మజ్‌హబ్‌లో బిగ్గరగా సున్నత్; హనఫీలో మౌనంగా — మీ మజ్‌హబ్‌ను అనుసరించండి). నాలుగోది: రుకూ, సజ్దా తస్బీహ్‌ను ఒక్కసారి కంటే తక్కువగా పూర్తి చేయడం.",
          en: "The commonest is racing through al-Fatihah in one breath. Pausing after each verse is sunnah and gives room to take the meaning in. Then mispronouncing letters, particularly the sad in sirat and the ayn in al-alameen. Then saying ameen inaudibly, though which is correct depends on your school, aloud for the Shafi'is and silently for the Hanafis. And cutting the tasbih of bowing and prostration short of even one full repetition.",
        },
      },
      {
        heading: { te: "అనవసర కదలికలు", en: "Unnecessary movement" },
        body: {
          te: "గీరుకోవడం, దుస్తులు సర్దుకోవడం, గడియారం చూడటం, జేబులో ఫోన్ తడుముకోవడం — ఇవి నమాజును చెల్లనిదిగా చేయవు (అవి తక్కువగా, అవసరమైనవి అయితే), కానీ అవి ఖుషూను నాశనం చేస్తాయి. ప్రవక్త ﷺ నమాజ్‌లో అనవసరంగా చుట్టూ చూడటాన్ని 'షైతాన్ దాసుడి నమాజ్ నుండి దొంగిలించేది' అని వర్ణించారు (బుఖారీ). ఆచరణాత్మక పరిష్కారం: నమాజ్‌కు ముందు దుస్తులు సర్దుకోండి, ఫోన్ వేరే చోట పెట్టండి, గోడ వైపు తిరగండి.",
          en: "Scratching, adjusting clothes, glancing at a watch, feeling for the phone in a pocket. None of these invalidate the prayer if they are slight and needed, but they destroy presence. The Prophet ﷺ described looking about in prayer as something Shaytan snatches from a servant's prayer (Bukhari). The practical fix is to sort your clothes before starting, leave the phone elsewhere, and face a wall.",
        },
      },
      {
        heading: { te: "మిమ్మల్ని మీరు ఎలా తనిఖీ చేసుకోవాలి", en: "How to check yourself" },
        body: {
          te: "మూడు మార్గాలు. ఒకటి: మీ నమాజ్‌ను ఒకసారి రికార్డ్ చేసి వినండి — మీరు ఎంత వేగంగా చదువుతున్నారో, ఎక్కడ ఆగడం లేదో వెంటనే తెలుస్తుంది. చాలామందికి ఇది ఆశ్చర్యకరంగా ఉంటుంది. రెండు: మీ నమాజుకు సమయం చూడండి — నాలుగు రక్అత్‌ల నమాజ్ మూడు నిమిషాల కంటే తక్కువ ఉంటే మీరు తొందరపడుతున్నారు. మూడు: ఒకరిని మీ నమాజ్ చూసి చెప్పమని అడగండి. ఇది సంకోచంగా అనిపిస్తుంది, కానీ ఇరవై ఏళ్ళు ఒకే పొరపాటు చేయడం కంటే మేలు.",
          en: "Three ways. Record one prayer and listen back; how fast you recite and where you fail to pause becomes obvious immediately, and it surprises most people. Time yourself: a four-unit prayer taking under three minutes means you are rushing. And ask someone to watch you pray and tell you. It feels awkward, and it beats twenty years of the same mistake.",
        },
      },
    ],
    takeaways: [
      { te: "తుమానీనా లేకపోవడం నమాజును చెల్లనిదిగా చేస్తుంది — ఇది మొదటి ప్రాధాన్యత.", en: "Lack of stillness invalidates the prayer, so it is the first priority." },
      { te: "సజ్దాలో ఏడు అవయవాలూ నేలను తాకాలి; పాదాలు ఎత్తకూడదు.", en: "All seven limbs touch in prostration and the feet stay down." },
      { te: "మీ నమాజ్‌ను రికార్డ్ చేసి వినండి — పొరపాట్లు వెంటనే తెలుస్తాయి.", en: "Record a prayer and listen back; the errors show up at once." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ నమాజ్‌లో చుట్టూ చూడటాన్ని 'షైతాన్ దొంగతనం' అని వర్ణించారు (బుఖారీ).", en: "The Prophet ﷺ called looking about in prayer a theft by Shaytan (Bukhari)." },
      { te: "సజ్దాలో మోచేతులను నేలపై పెట్టడాన్ని ప్రవక్త ﷺ ప్రత్యేకంగా వారించారు.", en: "Resting the forearms on the ground in prostration was specifically forbidden." },
    ],
    reflect: [
      { te: "మీ నాలుగు రక్అత్‌ల నమాజ్ ఎంత సమయం తీసుకుంటుంది? ఈ రోజు గమనించండి.", en: "How long does your four-unit prayer take? Notice it today." },
    ],
    mistakes: [
      { te: "పొరపాటు తెలిసినా 'ఇన్నేళ్ళు ఇలాగే చేశాను' అని మార్చుకోకపోవడం.", en: "Knowing about an error and not changing it because this is how I have always prayed." },
      { te: "ఇతరుల నమాజ్‌లో పొరపాట్లను బహిరంగంగా విమర్శించడం — ప్రైవేట్‌గా, మృదువుగా చెప్పండి.", en: "Correcting someone's prayer publicly rather than privately and gently." },
    ],
    faqs: [
      {
        question: { te: "ఏళ్ళ తరబడి తప్పుగా చేసిన నమాజులను తిరిగి చేయాలా?", en: "Must I repeat years of prayers performed incorrectly?" },
        answer: {
          te: "అది ఏ రకమైన పొరపాటు అనేదానిపై ఆధారపడుతుంది. నాణ్యతను తగ్గించే పొరపాట్లు (వేగం, దృష్టి) — తిరిగి చేయనవసరం లేదు. చెల్లనిదిగా చేసే పొరపాట్లు (ఫర్జ్ చర్య వదిలేయడం) గురించి పండితులు తెలియకపోవడాన్ని పరిగణనలోకి తీసుకుంటారు. మీ నిర్దిష్ట పరిస్థితిని ఒక ఆలిమ్‌కు వివరించి అడగండి — ఊహించవద్దు.",
          en: "It depends which kind of error. Those that only reduce quality, such as speed or attention, do not require repetition. For errors that invalidate, such as omitting an obligatory act, scholars take ignorance into account. Describe your particular situation to a scholar and ask rather than guessing.",
        },
      },
      {
        question: { te: "ఇమామ్ పొరపాటు చేస్తే ఏమి చేయాలి?", en: "What if the imam makes a mistake?" },
        answer: {
          te: "పురుషులు 'సుబ్‌హానల్లాహ్' అని చెప్పి సూచిస్తారు; మహిళలు చప్పట్లు కొడతారు — ఇది ప్రవక్త ﷺ నేర్పిన పద్ధతి (బుఖారీ). ఇమామ్ పఠనంలో తప్పితే వెనుక ఉన్నవారు సరిదిద్దవచ్చు. ఇమామ్ రక్అత్ సంఖ్యలో పొరపాటు చేసి సజ్దా సహ్వ్ చేస్తే, వెనుక ఉన్నవారు ఆయనను అనుసరిస్తారు.",
          en: "Men say subhanallah to signal it and women clap, which is the method the Prophet ﷺ taught (Bukhari). If the imam slips in recitation, those behind may correct him. If he miscounts the units and makes the sajdah of forgetfulness, those behind follow him in it.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సజ్దాలో మోచేతులను నేలపై పెట్టడం గురించి?", en: "What about resting the forearms on the ground in prostration?" },
        options: [
          { te: "ప్రవక్త ﷺ దీన్ని వారించారు", en: "The Prophet ﷺ forbade it" },
          { te: "అది సున్నత్", en: "It is sunnah" },
          { te: "అది తప్పనిసరి", en: "It is required" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఇమామ్ పొరపాటు చేస్తే పురుషులు ఏమి చెబుతారు?", en: "What do men say when the imam errs?" },
        options: [
          { te: "సుబ్‌హానల్లాహ్", en: "Subhanallah" },
          { te: "అల్లాహు అక్బర్", en: "Allahu akbar" },
          { te: "ఏమీ చెప్పరు", en: "Nothing" },
        ],
        answer: 0,
      },
      {
        question: { te: "నాలుగు రక్అత్‌ల నమాజ్ ఎంత కంటే తక్కువ ఉంటే తొందర?", en: "A four-unit prayer under how long suggests rushing?" },
        options: [
          { te: "మూడు నిమిషాలు", en: "Three minutes" },
          { te: "పది నిమిషాలు", en: "Ten minutes" },
          { te: "ఇరవై నిమిషాలు", en: "Twenty minutes" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "చెల్లనివి: తుమానీనా లేకపోవడం, ఫర్జ్ వదిలేయడం, మాట్లాడటం.", en: "Invalidating: no stillness, omitting an obligatory act, speaking." },
      { te: "రుకూ సమాంతరం; సజ్దా ఏడు అవయవాలు; పాదాలు నేలపై.", en: "Level back in bowing; seven limbs in prostration; feet down." },
      { te: "రికార్డ్ చేసి వినండి; సమయం చూడండి; ఎవరినైనా అడగండి.", en: "Record and listen, time yourself, ask someone." },
    ],
    summary: {
      te: "పొరపాట్లు రెండు రకాలు: నమాజును చెల్లనిదిగా చేసేవి (తుమానీనా లేకపోవడం, ఫర్జ్ వదిలేయడం) మరియు నాణ్యతను తగ్గించేవి (వేగం, అనవసర కదలికలు). మొదటివి ముందు సరిచేసుకోండి. మీ నమాజ్‌ను రికార్డ్ చేసి వినడం అత్యంత వేగవంతమైన తనిఖీ.",
      en: "Errors come in two kinds: those that invalidate, such as lack of stillness or omitting an obligatory act, and those that only reduce quality, such as speed and fidgeting. Fix the first kind first. Recording a prayer and listening back is the fastest check there is.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఒక నమాజ్‌ను రికార్డ్ చేసి వినండి.",
      en: "Apply it: record one prayer today and listen back to it.",
    },
    reading: [
      { label: "How to pray", url: "/knowledge-center/learn-salah/howtopray" },
      { label: "Khushu", url: "/knowledge-center/learn-salah/khushu" },
    ],
  },
];
