/* Learn Salah — replacements for levels 1 to 4 of the extracted lessons.

   The extracted versions had three sections each and a median of 131 English
   words. Same slugs, so all-lessons.ts substitutes them in place.

   This is the most practically used portal on the site, so where the four
   schools differ on how something is done -- and on wudu and prayer they differ
   often -- the lessons say so and name which school holds what, rather than
   presenting one practice as the only one. */
import type { Lesson } from "../lessons.ts";

export const salahLessons: Lesson[] = [
  {
    slug: "why",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 1 — మనం ఎందుకు నమాజ్ చేస్తాం",
      en: "Level 1 — Why we pray",
    },
    intro: {
      te: "నమాజ్ ఇస్లాం రెండో స్తంభం, మరియు షహాదా తర్వాత మొదటి ఆచరణ. ఇది ఎందుకు అంత కేంద్ర స్థానంలో ఉందో, రోజుకు ఐదుసార్లు ఎందుకో ఈ పాఠం చెబుతుంది.",
      en: "Prayer is the second pillar of Islam and the first practical one after the testimony of faith. This lesson is about why it sits so central, and why five times a day.",
    },
    sections: [
      {
        heading: { te: "మొదట లెక్కించబడేది", en: "The first thing accounted for" },
        body: {
          te: "ప్రవక్త ﷺ అన్నారు: 'పునరుత్థాన దినాన దాసుడి కర్మలలో మొదట లెక్కించబడేది నమాజ్. అది సరిగ్గా ఉంటే మిగిలినవన్నీ సరిగ్గా ఉంటాయి; అది చెడిపోతే మిగిలినవన్నీ చెడిపోతాయి' (తిర్మిజీ). ఇది నమాజ్‌ను ఒక ప్రమాణంగా చూపుతుంది — మిగిలిన జీవితం ఎలా ఉందో దాన్ని సూచించే కొలత. ఎవరైతే అల్లాహ్ కోసం రోజుకు ఐదుసార్లు తన పనిని ఆపగలరో, వారు ఇతర విషయాల్లోనూ ఆయనను గుర్తుంచుకుంటారు.",
          en: "The Prophet ﷺ said: 'The first of a servant's deeds to be accounted for on the Day of Judgement is the prayer. If it is sound, the rest will be sound; if it is corrupt, the rest will be corrupt' (Tirmidhi). That frames prayer as a measure, an indicator of how the rest of a life is going. Someone who can stop what they are doing five times a day for Allah will tend to remember Him in other things too.",
        },
        check: {
          question: { te: "పునరుత్థాన దినాన మొదట దేని గురించి లెక్క అడుగుతారు?", en: "What is the first deed accounted for on the Day of Judgement?" },
          options: [
            { te: "నమాజ్", en: "The prayer" },
            { te: "జకాత్", en: "Zakat" },
            { te: "ఉపవాసం", en: "Fasting" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అది ఎక్కడ నుండి వచ్చింది", en: "Where it came from" },
        body: {
          te: "ఇస్లాంలోని దాదాపు ప్రతి ఆదేశం జిబ్రయీల్ (అ) ద్వారా భూమిపై అవతరించింది. నమాజ్ వేరు: అది మేరాజ్ రాత్రిన, ప్రవక్త ﷺ ఏడు ఆకాశాలకు తీసుకువెళ్ళబడినప్పుడు నేరుగా ఇవ్వబడింది. మరో వివరం ముఖ్యం: ఆ ఆదేశం 'దుఃఖ సంవత్సరం' తర్వాత వచ్చింది — ఖదీజా (ర/అ), అబూ తాలిబ్ ఇద్దరూ మరణించి, తాయిఫ్‌లో తిరస్కరణ ఎదురైన తర్వాత. అత్యంత కష్టమైన సమయంలో ఇవ్వబడిన బహుమతి నమాజ్. ఇది యాదృచ్ఛికం కాదు.",
          en: "Almost every command in Islam came down to earth through Jibreel. Prayer is different: it was given directly on the night of the Mi'raj, when the Prophet ﷺ was taken through the seven heavens. And the timing matters. It came after the Year of Sorrow, when Khadijah (RA) and Abu Talib had both died and he had been turned away at Taif. Prayer was the gift given at the hardest point. That is not incidental.",
        },
        check: {
          question: { te: "నమాజ్ ఆదేశం ఎప్పుడు ఇవ్వబడింది?", en: "When was the command to pray given?" },
          options: [
            { te: "మేరాజ్ రాత్రిన, నేరుగా", en: "On the night of the Mi'raj, directly" },
            { te: "హిజ్రత్ తర్వాత మదీనాలో", en: "In Madinah after the Hijrah" },
            { te: "బద్ర్ యుద్ధం తర్వాత", en: "After the battle of Badr" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇది ఏమి చేస్తుందో ఖురాన్ చెబుతుంది", en: "What the Quran says it does" },
        body: {
          te: "'నమాజ్ స్థాపించు. నిశ్చయంగా నమాజ్ అశ్లీలత నుండి, చెడు నుండి ఆపుతుంది' (అల్-అన్‌కబూత్ 29:45). ఇది ఒక వాగ్దానం మరియు ఒక పరీక్ష. మీ నమాజ్ మీ ప్రవర్తనను మార్చకపోతే, నమాజ్ లోపం కాదు — దాన్ని మీరు చేసే విధానంలో ఏదో లోపం. మరో ఆయత్: 'నిశ్చయంగా నమాజ్ విశ్వాసులపై నిర్ణీత సమయాల్లో విధిగా నిర్ణయించబడింది' (అన్-నిసా 4:103). నిర్ణీత సమయాలు అనేది ముఖ్యం: మీకు అనుకూలమైనప్పుడు కాదు, నిర్ణయించబడినప్పుడు.",
          en: "'Establish the prayer. Indeed, prayer restrains from immorality and wrongdoing' (Al-Ankabut 29:45). That is both a promise and a test. If your prayer is not changing your conduct, the fault is not in the prayer but in how it is being performed. And: 'Indeed, prayer has been decreed upon the believers at specified times' (An-Nisa 4:103). Specified is the operative word: not when it suits you, but when it falls due.",
        },
      },
      {
        heading: { te: "ఐదుసార్లు ఎందుకు", en: "Why five times" },
        body: {
          te: "మేరాజ్ ఉల్లేఖనలో మొదట యాభై నమాజులు నిర్ణయించబడ్డాయి, మరియు మూసా (అ) సలహాతో ప్రవక్త ﷺ పదేపదే తిరిగి వెళ్ళగా అది ఐదుకు తగ్గించబడింది — కానీ ప్రతిఫలం యాభైదిగానే ఉంచబడింది (బుఖారీ). ఇందులో రెండు విషయాలు ఉన్నాయి. ఒకటి: ఐదు అనేది ఇప్పటికే తగ్గించబడిన సంఖ్య — అది భారం కాదు, ఉపశమనం. రెండు: రోజంతటిలో వాటి అమరిక. ఉదయం, మధ్యాహ్నం, సాయంత్రం, సూర్యాస్తమయం, రాత్రి — ఏ నాలుగైదు గంటలూ అల్లాహ్ స్మరణ లేకుండా గడవవు.",
          en: "In the narration of the Mi'raj, fifty prayers were first prescribed, and on Musa's advice the Prophet ﷺ returned repeatedly until they were reduced to five, with the reward of fifty kept intact (Bukhari). Two things sit in that. Five is already the reduced number, a relief rather than a burden. And their spacing across the day matters: morning, midday, afternoon, sunset, night, so that no stretch of four or five hours passes without the remembrance of Allah.",
        },
      },
      {
        heading: { te: "మానేసినవారికి ఏమిటి", en: "What about someone who has left it" },
        body: {
          te: "ఇది నిజాయితీగా చెప్పవలసిన విషయం. చాలామంది నమాజ్ మానేసి, తిరిగి మొదలుపెట్టడానికి సిగ్గుపడతారు — 'నేను ఏళ్ళ తరబడి చేయలేదు, ఇప్పుడు ఏమిటి?' ఖురాన్ దీనికి నేరుగా సమాధానం ఇస్తుంది: 'తమపై తామే హద్దు మీరిన నా దాసులారా, అల్లాహ్ కారుణ్యం నుండి నిరాశ చెందకండి. నిశ్చయంగా అల్లాహ్ అన్ని పాపాలను క్షమిస్తాడు' (అజ్-జుమర్ 39:53). నేటి నమాజ్ ఈ రోజే మొదలుపెట్టండి. గత సంవత్సరాల గురించి ఆలిమ్‌ను అడగండి, కానీ దానికోసం ఈ రోజు నమాజ్‌ను వాయిదా వేయవద్దు.",
          en: "This deserves to be said plainly. Many people who have left the prayer are ashamed to start again: I have not prayed for years, what is the point now. The Quran answers directly: 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins' (Az-Zumar 39:53). Start today's prayer today. Ask a scholar about the years behind you, but do not delay today's prayer while you work that out.",
        },
      },
    ],
    takeaways: [
      { te: "నమాజ్ మొదట లెక్కించబడేది; అది మిగిలిన కర్మలకు కొలత.", en: "Prayer is accounted for first and measures the rest." },
      { te: "అది మేరాజ్ రాత్రిన నేరుగా ఇవ్వబడింది, అత్యంత కష్ట సమయంలో.", en: "It was given directly on the night of the Mi'raj, at the hardest point." },
      { te: "ఖురాన్ 29:45 — నమాజ్ చెడు నుండి ఆపుతుంది; ఇది ఒక పరీక్ష కూడా.", en: "Quran 29:45: prayer restrains from wrong, which is also a test." },
    ],
    didYouKnow: [
      { te: "ఐదు నమాజులకు యాభై నమాజుల ప్రతిఫలం ఇవ్వబడుతుందని మేరాజ్ ఉల్లేఖన చెబుతుంది.", en: "The Mi'raj narration says the five carry the reward of fifty." },
      { te: "ప్రవక్త ﷺ చివరి మాటలలో ఒకటి: 'నమాజ్, నమాజ్, మరియు మీ చేతుల కింద ఉన్నవారు' (అబూ దావూద్).", en: "Among the Prophet's last words: 'The prayer, the prayer, and those under your authority' (Abu Dawud)." },
    ],
    reflect: [
      { te: "మీ నమాజ్ మీ ప్రవర్తనలో ఏదైనా ఒక దాన్ని మార్చిందా? లేకపోతే ఎందుకు?", en: "Has your prayer changed any one thing in your conduct? If not, why not?" },
    ],
    mistakes: [
      { te: "నమాజ్‌ను భారంగా చూడటం — అది ఇప్పటికే తగ్గించబడిన సంఖ్య.", en: "Treating prayer as a burden, when five is already the reduced number." },
      { te: "గత నమాజుల గురించి సిగ్గుపడి ఈ రోజు నమాజ్‌ను కూడా వాయిదా వేయడం.", en: "Being ashamed of missed prayers and so delaying today's as well." },
    ],
    faqs: [
      {
        question: { te: "నమాజ్ ఉద్దేశపూర్వకంగా మానేయడం గురించి పండితులు ఏమంటారు?", en: "What do scholars say about deliberately leaving the prayer?" },
        answer: {
          te: "ఇది తీవ్రమైన విషయమని అందరూ అంగీకరిస్తారు, కానీ దాని ఖచ్చితమైన హోదాపై భేదం ఉంది. కొందరు దాన్ని కుఫ్ర్‌గా భావిస్తారు; మెజారిటీ దాన్ని పెద్ద పాపంగా భావిస్తారు, కానీ విశ్వాసం నుండి బయటకు తీసుకుపోదని అంటారు. ఈ చర్చ ఒక వ్యక్తిని నిరాశపరచడానికి కాదు — ఏ అభిప్రాయం ప్రకారమైనా పరిష్కారం ఒకటే: ఈ రోజు నుండి మొదలుపెట్టడం.",
          en: "All agree it is grave, though they differ on its exact status. Some hold it disbelief; the majority hold it a major sin that does not take a person out of Islam. The discussion is not meant to crush anyone, and under either view the remedy is the same: start today.",
        },
      },
      {
        question: { te: "తప్పిపోయిన నమాజులను తిరిగి చేయాలా?", en: "Should missed prayers be made up?" },
        answer: {
          te: "నిద్ర లేదా మరపు వల్ల తప్పిన నమాజును గుర్తు వచ్చినప్పుడు చేయాలని ప్రవక్త ﷺ చెప్పారు (బుఖారీ). ఏళ్ళ తరబడి ఉద్దేశపూర్వకంగా వదిలేసిన వాటి గురించి పండితుల మధ్య భేదం ఉంది — కొందరు వాటన్నిటినీ ఖజా చేయమని, కొందరు తౌబా చేసి నఫిల్ ఎక్కువ చేయమని అంటారు. మీ పరిస్థితికి స్థానిక ఆలిమ్‌ను అడగండి.",
          en: "The Prophet ﷺ said a prayer missed through sleep or forgetfulness should be prayed on remembering (Bukhari). For years abandoned deliberately, scholars differ: some require making them all up, others hold that repentance with increased voluntary prayer is the way. Ask a local scholar about your own case.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నమాజ్ ఇస్లాంలో ఎన్నవ స్తంభం?", en: "Which pillar of Islam is prayer?" },
        options: [
          { te: "రెండవది", en: "The second" },
          { te: "మొదటిది", en: "The first" },
          { te: "ఐదవది", en: "The fifth" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్ 29:45 ప్రకారం నమాజ్ ఏమి చేస్తుంది?", en: "According to Quran 29:45, what does prayer do?" },
        options: [
          { te: "అశ్లీలత, చెడు నుండి ఆపుతుంది", en: "Restrains from immorality and wrongdoing" },
          { te: "సంపదను పెంచుతుంది", en: "Increases wealth" },
          { te: "నిద్రను తగ్గిస్తుంది", en: "Reduces the need for sleep" },
        ],
        answer: 0,
      },
      {
        question: { te: "మేరాజ్‌లో మొదట ఎన్ని నమాజులు నిర్ణయించబడ్డాయి?", en: "How many prayers were first prescribed at the Mi'raj?" },
        options: [
          { te: "యాభై", en: "Fifty" },
          { te: "ఐదు", en: "Five" },
          { te: "పది", en: "Ten" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "మొదట లెక్కించబడేది నమాజ్ (తిర్మిజీ).", en: "Prayer is accounted for first (Tirmidhi)." },
      { te: "మేరాజ్‌లో నేరుగా; 50 → 5, ప్రతిఫలం 50.", en: "Given directly at the Mi'raj; fifty reduced to five, reward of fifty." },
      { te: "ఖురాన్ 4:103 — నిర్ణీత సమయాల్లో.", en: "Quran 4:103: at specified times." },
    ],
    summary: {
      te: "నమాజ్ రెండో స్తంభం, మేరాజ్ రాత్రిన నేరుగా ఇవ్వబడినది, మరియు పునరుత్థాన దినాన మొదట లెక్కించబడేది. ఇది చెడు నుండి ఆపాలి — అది జరగకపోతే మనం చేసే విధానంలో లోపం. మానేసినవారికి ద్వారం తెరిచే ఉంది.",
      en: "Prayer is the second pillar, given directly on the night of the Mi'raj, and the first thing accounted for. It is meant to restrain from wrong, and where it does not, the fault lies in how it is performed. For anyone who has left it, the door is open.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఐదు నమాజుల సమయాలను మీ ఫోన్‌లో అలారంగా పెట్టుకోండి.",
      en: "Apply it: set the five prayer times as alarms on your phone today.",
    },
    reading: [
      { label: "Learn Salah portal", url: "/knowledge-center/learn-salah" },
      { label: "Purity and wudu", url: "/knowledge-center/learn-salah/wudu" },
    ],
  },

  {
    slug: "wudu",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 2 — వుజూ",
      en: "Level 2 — Wudu",
    },
    intro: {
      te: "వుజూ నమాజ్‌కు షరతు. ఖురాన్ దాన్ని నేరుగా వివరిస్తుంది, మరియు మిగిలిన వివరాలు సున్నత్ నుండి వస్తాయి. ఈ పాఠం విధులు ఏవి, సున్నత్‌లు ఏవి, దాన్ని ఏవి భంగపరుస్తాయో వేరు చేస్తుంది.",
      en: "Wudu is a condition for prayer. The Quran describes it directly and the remaining detail comes from the Sunnah. This lesson separates what is obligatory from what is sunnah, and what breaks it.",
    },
    sections: [
      {
        heading: { te: "ఖురాన్ నాలుగు చెబుతుంది", en: "The Quran names four" },
        body: {
          te: "'ఓ విశ్వాసులారా, మీరు నమాజ్ కోసం నిలబడినప్పుడు మీ ముఖాలను, మోచేతుల వరకు మీ చేతులను కడగండి, మీ తలలను తుడవండి, మరియు చీలమండల వరకు మీ పాదాలను కడగండి' (అల్-మాయిదా 5:6). ఈ నాలుగు ప్రతి మజ్‌హబ్‌లోనూ ఫర్జ్. మజ్‌హబ్‌లు అదనపు షరతులను చేర్చుతాయి: హనఫీ ఈ నాలుగే అంటుంది; షాఫయీ నియ్యత్, క్రమాన్ని చేర్చి ఆరు అంటుంది; మాలికీ రుద్దడాన్ని, వెంటవెంటనే చేయడాన్ని చేర్చి ఏడు అంటుంది. ఇది వైరుధ్యం కాదు — ఖురాన్ చెప్పినవాటికి సున్నత్ నుండి ఏమి చేర్చాలనేదానిపై భేదం.",
          en: "'O you who believe, when you rise for prayer, wash your faces and your arms to the elbows, wipe your heads, and wash your feet to the ankles' (Al-Ma'idah 5:6). Those four are obligatory in every school. The schools add further conditions: the Hanafis hold to these four; the Shafi'is count six, adding intention and sequence; the Malikis count seven, adding rubbing and doing it without long pauses. This is not a contradiction but a difference over what the Sunnah adds to what the Quran states.",
        },
        check: {
          question: { te: "ఖురాన్ 5:6 ఎన్ని చర్యలను పేర్కొంటుంది?", en: "How many actions does Quran 5:6 name?" },
          options: [
            { te: "నాలుగు", en: "Four" },
            { te: "ఏడు", en: "Seven" },
            { te: "రెండు", en: "Two" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "పూర్తి క్రమం", en: "The full sequence" },
        body: {
          te: "నియ్యత్ (హృదయంలో), తర్వాత బిస్మిల్లాహ్. మణికట్టు వరకు చేతులు మూడుసార్లు. నోరు పుక్కిలించడం మూడుసార్లు. ముక్కులోకి నీరు పీల్చి వదలడం మూడుసార్లు. ముఖం మూడుసార్లు — నుదురు జుట్టు మొదలు నుండి గడ్డం కింది వరకు, చెవి నుండి చెవి వరకు. కుడి చేయి మోచేతితో సహా మూడుసార్లు, తర్వాత ఎడమ. తలను తడి చేతులతో ఒకసారి తుడవడం, చెవులతో సహా. కుడి పాదం చీలమండతో సహా మూడుసార్లు, తర్వాత ఎడమ. ముగింపు: 'అష్‌హదు అల్లా ఇలాహ ఇల్లల్లాహ్...'",
          en: "The intention, held in the heart, then bismillah. Hands to the wrists three times. Rinse the mouth three times. Draw water into the nose and blow it out three times. The face three times, from the hairline to below the chin and ear to ear. The right arm including the elbow three times, then the left. Wipe the head once with wet hands, including the ears. The right foot including the ankle three times, then the left. Then the closing testimony, ashhadu an laa ilaaha illallah.",
        },
        check: {
          question: { te: "తలను ఎన్నిసార్లు తుడవాలి?", en: "How many times is the head wiped?" },
          options: [
            { te: "ఒకసారి", en: "Once" },
            { te: "మూడుసార్లు", en: "Three times" },
            { te: "ఏడుసార్లు", en: "Seven times" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "వుజూను భంగపరిచేవి", en: "What breaks it" },
        body: {
          te: "అన్ని మజ్‌హబ్‌లూ అంగీకరించేవి: మల, మూత్ర విసర్జన; వాయువు; గాఢ నిద్ర; స్పృహ కోల్పోవడం. మజ్‌హబ్‌ల మధ్య భేదం ఉన్నవి: వ్యతిరేక లింగాన్ని తాకడం (షాఫయీ మజ్‌హబ్‌లో భంగపరుస్తుంది; హనఫీలో కాదు, కామేచ్ఛ లేకపోతే); ఒంటెల మాంసం తినడం (హంబలీలో భంగపరుస్తుంది); రక్తం కారడం (హనఫీలో ప్రవహిస్తే భంగపరుస్తుంది; షాఫయీలో కాదు). మీ కుటుంబం అనుసరించే మజ్‌హబ్ ప్రకారం ఏవి వర్తిస్తాయో స్థానిక ఆలిమ్‌ను అడగండి.",
          en: "Agreed across the schools: relieving oneself, passing wind, deep sleep, and losing consciousness. Where the schools differ: touching the opposite sex, which breaks it in the Shafi'i school but not the Hanafi absent desire; eating camel meat, which breaks it in the Hanbali school; and flowing blood, which breaks it in the Hanafi school but not the Shafi'i. Ask a local scholar which apply in the school your family follows.",
        },
      },
      {
        heading: { te: "మేజోళ్ళపై తుడవడం", en: "Wiping over socks" },
        body: {
          te: "ఇది చాలామందికి తెలియని వెసులుబాటు. వుజూ ఉన్న స్థితిలో మేజోళ్ళు (ఖుఫ్ఫైన్) ధరిస్తే, తర్వాతి వుజూలలో వాటిని తీయకుండా పైన తడి చేయి తుడిస్తే సరిపోతుంది. కాలపరిమితి: నివాసిగా ఉంటే ఒక పగలు ఒక రాత్రి (24 గంటలు); ప్రయాణంలో మూడు పగళ్ళు మూడు రాత్రులు. ఇది ప్రవక్త ﷺ నుండి ప్రామాణికంగా స్థిరపడినది. చర్మపు మేజోళ్ళపై అందరూ అంగీకరిస్తారు; మందపాటి గుడ్డ మేజోళ్ళపై చాలామంది సమకాలీన పండితులు అనుమతిస్తారు.",
          en: "This is a concession many people do not know about. If you put socks on while in a state of wudu, then for later wudu you may wipe over them with a wet hand instead of removing them. The limits are a day and a night, twenty-four hours, when resident, and three days and nights when travelling. It is firmly established from the Prophet ﷺ. All agree on leather socks, and most contemporary scholars permit it on thick cloth socks too.",
        },
      },
    ],
    takeaways: [
      { te: "ఖురాన్ నాలుగు చెబుతుంది: ముఖం, చేతులు, తల, పాదాలు.", en: "The Quran names four: face, arms, head, feet." },
      { te: "మజ్‌హబ్‌లు అదనపు షరతులను చేర్చుతాయి — ఇది వైరుధ్యం కాదు.", en: "The schools add further conditions, which is not a contradiction." },
      { te: "వుజూతో మేజోళ్ళు ధరిస్తే 24 గంటలు వాటిపై తుడవవచ్చు.", en: "Socks put on in wudu may be wiped over for twenty-four hours." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ చెప్పారు: వుజూ చేసినప్పుడు కడిగిన అవయవాల నుండి పాపాలు నీటితో పాటు రాలిపోతాయి (ముస్లిం).", en: "The Prophet ﷺ said that when a person makes wudu, sins fall away from the washed limbs with the water (Muslim)." },
      { te: "వుజూలో నీరు వృథా చేయడాన్ని ప్రవక్త ﷺ ఇష్టపడలేదు — ప్రవహించే నదిలో ఉన్నా సరే (ఇబ్న్ మాజా).", en: "The Prophet ﷺ disapproved of wasting water in wudu even beside a flowing river (Ibn Majah)." },
    ],
    reflect: [
      { te: "మీరు వుజూ చేసేటప్పుడు ఎంత నీరు వాడుతున్నారు? నల్లా తెరిచే ఉంచుతున్నారా?", en: "How much water do you use for wudu? Do you leave the tap running?" },
    ],
    mistakes: [
      { te: "మోచేతిని, చీలమండను వదిలేయడం — అవి కడగవలసిన భాగంలోనే ఉన్నాయి.", en: "Leaving out the elbow or the ankle, when both are included in what must be washed." },
      { te: "నీటిని వృథా చేయడం.", en: "Wasting water." },
      { te: "నియ్యత్‌ను నోటితో బిగ్గరగా చెప్పాలని అనుకోవడం — అది హృదయంలోనే.", en: "Believing the intention must be said aloud, when it is held in the heart." },
    ],
    faqs: [
      {
        question: { te: "కాలిగోళ్ళ పాలిష్ ఉంటే వుజూ చెల్లుతుందా?", en: "Is wudu valid with nail polish on?" },
        answer: {
          te: "సాధారణ నెయిల్ పాలిష్ నీటిని అడ్డుకుంటుంది కాబట్టి దాని కింది గోరుకు నీరు చేరదు — అందుకే మెజారిటీ పండితులు వుజూకు ముందు దాన్ని తీసేయాలని అంటారు. మెహందీ వంటి రంగు మాత్రమే వదిలేవి (పొర ఏర్పరచనివి) అడ్డు కావు.",
          en: "Ordinary nail polish forms a barrier so water does not reach the nail, which is why the majority hold it must be removed before wudu. Things that only stain, such as henna, do not form a layer and are not a barrier.",
        },
      },
      {
        question: { te: "గాయం లేదా కట్టు ఉంటే?", en: "What if I have a wound or a dressing?" },
        answer: {
          te: "గాయంపై నీరు హాని చేస్తే, కట్టుపై తడి చేయి తుడవడం (మస్‌హ్) సరిపోతుంది. అది కూడా సాధ్యం కాకపోతే ఆ భాగాన్ని వదిలేయవచ్చు. ఇస్లాంలో ఒక సాధారణ సూత్రం: కష్టం సౌలభ్యాన్ని తెస్తుంది.",
          en: "If water would harm the wound, wiping over the dressing with a wet hand suffices, and if even that is not possible the part may be left. A general principle in Islam applies here: hardship brings ease.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నివాసిగా మేజోళ్ళపై ఎంతకాలం తుడవవచ్చు?", en: "For how long may a resident wipe over socks?" },
        options: [
          { te: "ఒక పగలు ఒక రాత్రి", en: "A day and a night" },
          { te: "ఒక వారం", en: "A week" },
          { te: "మూడు రోజులు", en: "Three days" },
        ],
        answer: 0,
      },
      {
        question: { te: "అన్ని మజ్‌హబ్‌లూ దేన్ని వుజూ భంగపరిచేదిగా అంగీకరిస్తాయి?", en: "Which do all schools agree breaks wudu?" },
        options: [
          { te: "గాఢ నిద్ర", en: "Deep sleep" },
          { te: "ఒంటె మాంసం", en: "Camel meat" },
          { te: "వ్యతిరేక లింగాన్ని తాకడం", en: "Touching the opposite sex" },
        ],
        answer: 0,
      },
      {
        question: { te: "నియ్యత్ ఎక్కడ చేయాలి?", en: "Where is the intention made?" },
        options: [
          { te: "హృదయంలో", en: "In the heart" },
          { te: "బిగ్గరగా నోటితో", en: "Aloud" },
          { te: "రాతపూర్వకంగా", en: "In writing" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఫర్జ్: ముఖం, మోచేతుల వరకు చేతులు, తల తుడవడం, చీలమండల వరకు పాదాలు.", en: "Obligatory: face, arms to elbows, wipe the head, feet to ankles." },
      { te: "తల ఒకసారి; మిగిలినవి మూడుసార్లు.", en: "Head once; the rest three times." },
      { te: "మేజోళ్ళపై మస్‌హ్: 24 గంటలు నివాసి, 3 రోజులు ప్రయాణి.", en: "Wiping socks: 24 hours resident, three days travelling." },
    ],
    summary: {
      te: "ఖురాన్ 5:6 నాలుగు ఫర్జ్ చర్యలను చెబుతుంది; మజ్‌హబ్‌లు సున్నత్ నుండి కొన్ని చేర్చుతాయి. క్రమం: నియ్యత్, బిస్మిల్లాహ్, చేతులు, నోరు, ముక్కు, ముఖం, చేతులు, తల, పాదాలు. వుజూతో ధరించిన మేజోళ్ళపై 24 గంటలు తుడవవచ్చు.",
      en: "Quran 5:6 names four obligatory acts and the schools add some from the Sunnah. The order is intention, bismillah, hands, mouth, nose, face, arms, head, feet. Socks put on in wudu may be wiped for twenty-four hours.",
    },
    apply: {
      te: "ఆచరణ: తర్వాతి వుజూలో మోచేయి, చీలమండ రెండూ పూర్తిగా తడిశాయో లేదో గమనించండి.",
      en: "Apply it: at your next wudu, check that both the elbow and the ankle were fully covered.",
    },
    reading: [
      { label: "Learn Salah portal", url: "/knowledge-center/learn-salah" },
      { label: "Ghusl", url: "/knowledge-center/learn-salah/ghusl" },
    ],
  },

  {
    slug: "ghusl",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 3 — ఘుస్ల్",
      en: "Level 3 — Ghusl",
    },
    intro: {
      te: "ఘుస్ల్ అంటే శరీరమంతటినీ కడగడం. ఇది ఎప్పుడు విధి అవుతుందో, ఎలా చేయాలో స్పష్టంగా తెలియడం ముఖ్యం — ఎందుకంటే ఘుస్ల్ లేకుండా నమాజ్ చెల్లదు, మరియు ఈ విషయాన్ని అడగడానికి చాలామంది సంకోచిస్తారు.",
      en: "Ghusl is washing the whole body. Knowing clearly when it becomes obligatory and how to do it matters, because prayer is not valid without it and many people hesitate to ask about it.",
    },
    sections: [
      {
        heading: { te: "ఎప్పుడు విధి", en: "When it is obligatory" },
        body: {
          te: "నాలుగు పరిస్థితులు. ఒకటి: భార్యాభర్తల సంబంధం — స్ఖలనం జరిగినా జరగకపోయినా. రెండు: స్ఖలనం (నిద్రలో అయినా, మెలకువలో అయినా). మూడు: ఋతుస్రావం ముగింపు. నాలుగు: నిఫాస్ (ప్రసవానంతర రక్తస్రావం) ముగింపు. ఐదోది: ఒక వ్యక్తి ఇస్లాం స్వీకరించినప్పుడు. ఇది స్పష్టంగా తెలియడం ముఖ్యం, ఎందుకంటే జనాబత్ స్థితిలో చేసిన నమాజ్ చెల్లదు, మరియు ఈ ప్రశ్న అడగడానికి సిగ్గుపడి చాలామంది తప్పుగా చేస్తారు.",
          en: "Four situations. Marital relations, whether or not there is emission. Emission itself, whether asleep or awake. The end of menstruation. And the end of post-natal bleeding. A fifth is on entering Islam. It is worth knowing clearly, because prayer performed in a state of janabah is not valid, and embarrassment at asking leaves many people getting it wrong.",
        },
        check: {
          question: { te: "భార్యాభర్తల సంబంధం తర్వాత ఘుస్ల్ ఎప్పుడు విధి?", en: "After marital relations, when is ghusl obligatory?" },
          options: [
            { te: "స్ఖలనం జరిగినా జరగకపోయినా", en: "Whether or not there is emission" },
            { te: "స్ఖలనం జరిగితేనే", en: "Only if there is emission" },
            { te: "అది విధి కాదు", en: "It is not obligatory" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఫర్జ్ ఏమిటి — నిజంగా అవసరమైనది", en: "What is actually required" },
        body: {
          te: "ఇక్కడ ఒక ఉపశమనం ఉంది: ఫర్జ్ చాలా తక్కువ. హనఫీ మజ్‌హబ్‌లో మూడు: నోరు పుక్కిలించడం, ముక్కులోకి నీరు పీల్చడం, శరీరమంతటినీ నీటితో తడపడం. షాఫయీ మజ్‌హబ్‌లో రెండు: నియ్యత్, శరీరమంతటినీ తడపడం. అంటే: శరీరంలో ఒక్క వెంట్రుక కూడా పొడిగా మిగలకుండా నీరు చేరితే ఘుస్ల్ చెల్లుతుంది. మిగిలిన దశలన్నీ సున్నత్ — అవి ఉత్తమం, కానీ వాటిని తప్పితే ఘుస్ల్ చెల్లదని కాదు.",
          en: "There is a relief here: very little is actually obligatory. In the Hanafi school three things: rinsing the mouth, drawing water into the nose, and water reaching the whole body. In the Shafi'i school two: the intention and water reaching the whole body. So if water reaches every part, leaving not a single hair dry, the ghusl is valid. Everything else is sunnah, better to do but not what validity turns on.",
        },
        check: {
          question: { te: "ఘుస్ల్ చెల్లడానికి ప్రధానంగా ఏమి కావాలి?", en: "What does the validity of ghusl chiefly turn on?" },
          options: [
            { te: "శరీరమంతటికీ నీరు చేరడం", en: "Water reaching the whole body" },
            { te: "ఒక నిర్దిష్ట క్రమం", en: "A particular sequence" },
            { te: "ప్రత్యేక దుఆలు", en: "Special supplications" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సున్నత్ పద్ధతి", en: "The sunnah method" },
        body: {
          te: "ఆయిషా (ర/అ), మైమూనా (ర/అ) ఉల్లేఖనల నుండి: నియ్యత్, తర్వాత చేతులు కడగడం. తర్వాత మర్మాంగాలను, శరీరంపై ఉన్న అపరిశుభ్రతను శుభ్రం చేయడం. తర్వాత పూర్తి వుజూ (కొన్ని ఉల్లేఖనల్లో పాదాలు చివరికి వదిలివేసి). తర్వాత తలపై మూడుసార్లు నీరు పోసి, వేళ్ళతో జుట్టు మూలాలకు నీరు చేరేలా చేయడం. తర్వాత కుడి వైపు, ఎడమ వైపు శరీరంపై నీరు పోయడం, చర్మాన్ని రుద్దుతూ. చివరన పాదాలు.",
          en: "From the narrations of Aisha (RA) and Maymunah (RA): the intention, then washing the hands. Then cleaning the private parts and any impurity on the body. Then a complete wudu, in some narrations leaving the feet until the end. Then pouring water over the head three times, working the fingers so it reaches the roots of the hair. Then pouring over the right side and the left, rubbing the skin. The feet last.",
        },
      },
      {
        heading: { te: "సాధారణ ప్రశ్నలు, ఆందోళనలు", en: "Common questions and worries" },
        body: {
          te: "జుట్టు: మహిళలు జడను విప్పవలసిన అవసరం లేదు — ఉమ్మ్ సలమా (ర/అ) అడిగినప్పుడు ప్రవక్త ﷺ మూడుసార్లు నీరు పోస్తే సరిపోతుందని చెప్పారు (ముస్లిం). నిఫాస్, ఋతుస్రావం తర్వాత మాత్రం చాలామంది పండితులు విప్పమని అంటారు. షవర్: షవర్ కింద నిలబడి శరీరమంతటికీ నీరు చేరితే ఘుస్ల్ చెల్లుతుంది — ప్రత్యేక పాత్ర అవసరం లేదు. వస్వసా (అనుమానాలు): 'నీరు అన్ని చోట్లకూ చేరిందా?' అని పదేపదే అనుమానపడి మళ్ళీ మళ్ళీ చేయడం ఒక వ్యాధి — పండితులు దాన్ని నిర్లక్ష్యం చేసి ముందుకు సాగమని సలహా ఇస్తారు.",
          en: "Hair: a woman need not undo her braid, and when Umm Salamah (RA) asked, the Prophet ﷺ said pouring water three times suffices (Muslim). After menstruation and post-natal bleeding many scholars do advise undoing it. A shower: standing under a shower so that water reaches the whole body is a valid ghusl; no special vessel is needed. And waswasa: repeatedly doubting whether the water reached everywhere and starting over is a recognised affliction, and scholars advise ignoring the doubt and moving on.",
        },
      },
    ],
    takeaways: [
      { te: "నాలుగు ప్రధాన సందర్భాలు: సంబంధం, స్ఖలనం, ఋతుస్రావం ముగింపు, నిఫాస్ ముగింపు.", en: "Four main occasions: relations, emission, the end of menstruation, the end of nifas." },
      { te: "ఫర్జ్ చాలా తక్కువ — శరీరమంతటికీ నీరు చేరడమే ప్రధానం.", en: "Very little is obligatory; water reaching the whole body is the substance of it." },
      { te: "షవర్ కింద చేసినా చెల్లుతుంది.", en: "A ghusl under a shower is valid." },
    ],
    didYouKnow: [
      { te: "శుక్రవారం ఘుస్ల్ చేయడం గట్టిగా సిఫార్సు చేయబడినది; కొందరు పండితులు దాన్ని జుమాకు హాజరయ్యే వారిపై వాజిబ్‌గా భావిస్తారు.", en: "The Friday ghusl is strongly recommended, and some scholars hold it obligatory on those attending Jumu'ah." },
      { te: "ప్రవక్త ﷺ ఘుస్ల్‌కు ఒక 'సాఅ' (సుమారు రెండున్నర లీటర్లు) నీరు మాత్రమే వాడేవారని ఉల్లేఖనలు చెబుతాయి.", en: "Narrations report the Prophet ﷺ using about one sa', roughly two and a half litres, for a full ghusl." },
    ],
    reflect: [
      { te: "ఈ విషయాలు అడగడానికి సంకోచించడం వల్ల ఎంతమంది తప్పుగా చేస్తున్నారు? మీరు ఎవరికైనా సహాయపడగలరా?", en: "How many people get this wrong because they hesitate to ask? Could you help someone with it?" },
    ],
    mistakes: [
      { te: "జుట్టు మూలాలకు నీరు చేరకపోవడం.", en: "Water not reaching the roots of the hair." },
      { te: "వస్వసా వల్ల పదేపదే ఘుస్ల్ చేయడం.", en: "Repeating the ghusl over and over because of waswasa." },
      { te: "ఘుస్ల్ అవసరమని తెలియక జనాబత్ స్థితిలో నమాజ్ చేయడం.", en: "Praying in a state of janabah because the requirement was not known." },
    ],
    faqs: [
      {
        question: { te: "ఘుస్ల్ చేస్తే వుజూ కూడా అయినట్లేనా?", en: "Does ghusl also count as wudu?" },
        answer: {
          te: "మెజారిటీ పండితుల ప్రకారం అవును — ఘుస్ల్ తర్వాత వుజూ భంగపరిచేది ఏమీ జరగకపోతే వేరుగా వుజూ చేయనవసరం లేదు, నేరుగా నమాజ్ చేయవచ్చు. ఇది ఒక ఆచరణాత్మక వెసులుబాటు, చాలామందికి తెలియదు.",
          en: "In the majority view yes: if nothing that breaks wudu happens after the ghusl, no separate wudu is needed and you may pray directly. It is a practical concession many people do not know.",
        },
      },
      {
        question: { te: "నీరు లేకపోతే లేదా అనారోగ్యం వల్ల వాడలేకపోతే?", en: "What if there is no water, or illness prevents using it?" },
        answer: {
          te: "అప్పుడు 'తయమ్ముమ్' — శుభ్రమైన మట్టి లేదా ధూళితో చేతులు, ముఖం తుడవడం. ఖురాన్ దీన్ని అనుమతిస్తుంది: 'మీకు నీరు దొరకకపోతే శుభ్రమైన మట్టిని ఆశ్రయించండి' (అల్-మాయిదా 5:6). ఇది ఘుస్ల్‌కు, వుజూకు రెండింటికీ వర్తిస్తుంది.",
          en: "Then tayammum: wiping the hands and face with clean earth or dust. The Quran permits it: 'and if you find no water, then turn to clean earth' (Al-Ma'idah 5:6). It stands in for both ghusl and wudu.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఘుస్ల్ చెల్లడానికి ప్రధాన షరతు ఏమిటి?", en: "What is the main condition for a valid ghusl?" },
        options: [
          { te: "శరీరమంతటికీ నీరు చేరడం", en: "Water reaching the whole body" },
          { te: "ఒక ప్రత్యేక పాత్ర వాడటం", en: "Using a particular vessel" },
          { te: "మూడుసార్లు స్నానం", en: "Bathing three times" },
        ],
        answer: 0,
      },
      {
        question: { te: "మహిళలు ఘుస్ల్‌కు జడ విప్పాలా?", en: "Must a woman undo her braid for ghusl?" },
        options: [
          { te: "జనాబత్‌కు అవసరం లేదు — మూడుసార్లు నీరు పోస్తే సరిపోతుంది", en: "Not for janabah; pouring water three times suffices" },
          { te: "ఎప్పుడూ విప్పాలి", en: "Always" },
          { te: "ఎప్పుడూ విప్పకూడదు", en: "Never" },
        ],
        answer: 0,
      },
      {
        question: { te: "నీరు లేకపోతే ఏమి చేయాలి?", en: "What is done if there is no water?" },
        options: [
          { te: "తయమ్ముమ్", en: "Tayammum" },
          { te: "నమాజ్ వదిలేయాలి", en: "Skip the prayer" },
          { te: "నీరు దొరికేవరకు వేచి ఉండాలి", en: "Wait until water is available" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "సందర్భాలు: సంబంధం · స్ఖలనం · ఋతుస్రావం · నిఫాస్.", en: "Occasions: relations, emission, menstruation, nifas." },
      { te: "ఫర్జ్: శరీరమంతటికీ నీరు (+ హనఫీలో నోరు, ముక్కు).", en: "Obligatory: water over the whole body, plus mouth and nose in the Hanafi school." },
      { te: "ఘుస్ల్ వుజూ స్థానంలో సరిపోతుంది.", en: "Ghusl suffices in place of wudu." },
    ],
    summary: {
      te: "ఘుస్ల్ నాలుగు ప్రధాన సందర్భాల్లో విధి. ఫర్జ్ చాలా తక్కువ — శరీరమంతటికీ నీరు చేరడమే ప్రధానం; షవర్ కింద చేసినా చెల్లుతుంది. సున్నత్ పద్ధతి ఉత్తమం కానీ దాన్ని తప్పితే ఘుస్ల్ చెల్లదని కాదు. నీరు లేకపోతే తయమ్ముమ్.",
      en: "Ghusl is obligatory on four main occasions. Very little of it is required: water reaching the whole body is the substance, and a shower is valid. The sunnah method is better but validity does not hang on it. Without water, tayammum takes its place.",
    },
    apply: {
      te: "ఆచరణ: ఘుస్ల్ ఎప్పుడు విధి అవుతుందో నాలుగు సందర్భాలను గుర్తుంచుకోండి.",
      en: "Apply it: commit the four occasions requiring ghusl to memory.",
    },
    reading: [
      { label: "Purity and wudu", url: "/knowledge-center/learn-salah/wudu" },
      { label: "Women's guidance", url: "/knowledge-center/womens-guidance" },
    ],
  },

  {
    slug: "howtopray",
    portal: "learn-salah",
    title: {
      te: "స్థాయి 4 — నమాజ్ ఎలా చేయాలి",
      en: "Level 4 — How to pray",
    },
    intro: {
      te: "ఒక రక్అత్ మొత్తం క్రమం ఇక్కడ ఉంది — తక్బీర్ నుండి సలామ్ వరకు, ప్రతి స్థానంలో ఏమి చెప్పాలో సహా. మజ్‌హబ్‌ల మధ్య భేదం ఉన్న చోట అది కూడా చెప్పబడింది.",
      en: "The full sequence of a unit of prayer, from the opening takbir to the closing salam, with what is said in each position. Where the schools differ, that is stated too.",
    },
    sections: [
      {
        heading: { te: "నమాజ్‌కు ముందు షరతులు", en: "Conditions before you begin" },
        body: {
          te: "ఆరు షరతులు: వుజూ (లేదా అవసరమైతే ఘుస్ల్); శరీరం, దుస్తులు, నమాజ్ చేసే చోటు శుభ్రంగా ఉండటం; సత్ర్ (శరీరాన్ని కప్పడం — పురుషులకు నాభి నుండి మోకాలి వరకు; మహిళలకు ముఖం, చేతులు తప్ప అంతా); ఖిబ్లా వైపు తిరగడం; నమాజ్ సమయం రావడం; నియ్యత్. ఈ ఆరింటిలో ఏదైనా లేకపోతే నమాజ్ చెల్లదు. అందుకే ప్రారంభించే ముందు ఒక్క క్షణం ఆగి వీటిని తనిఖీ చేసుకోవడం అలవాటు చేసుకోండి.",
          en: "Six conditions: wudu, or ghusl where needed; the body, clothing and place being clean; covering, which for men is navel to knee and for women all but the face and hands; facing the qiblah; the time having entered; and the intention. If any is missing the prayer is not valid, so it is worth pausing for a moment before starting to check them.",
        },
        check: {
          question: { te: "నమాజ్‌కు ముందు ఎన్ని షరతులు?", en: "How many conditions apply before prayer?" },
          options: [
            { te: "ఆరు", en: "Six" },
            { te: "రెండు", en: "Two" },
            { te: "పది", en: "Ten" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఒక రక్అత్ — పూర్తి క్రమం", en: "One unit, in full" },
        body: {
          te: "చేతులు భుజాల (లేదా చెవుల) వరకు ఎత్తి 'అల్లాహు అక్బర్' — ఇది తక్బీరతుల్ ఇహ్రామ్; దీనితో నమాజ్ మొదలవుతుంది, ఇక మాట్లాడకూడదు. చేతులు కట్టుకుని నిలబడి: సనా, తర్వాత తఅవ్వుజ్, బిస్మిల్లాహ్, సూరా అల్-ఫాతిహా, తర్వాత మరో సూరా (మొదటి రెండు రక్అత్‌లలో). 'అల్లాహు అక్బర్' అని రుకూ — వీపు నేలకు సమాంతరంగా, 'సుబ్‌హాన రబ్బియల్ అజీమ్' మూడుసార్లు. 'సమిఅల్లాహు లిమన్ హమిదహ్' అని లేచి, 'రబ్బనా లకల్ హమ్ద్'. 'అల్లాహు అక్బర్' అని సజ్దా — ఏడు అవయవాలు నేలపై, 'సుబ్‌హాన రబ్బియల్ ఆలా' మూడుసార్లు. లేచి కూర్చుని, మళ్ళీ సజ్దా. ఇది ఒక రక్అత్.",
          en: "Raise the hands to the shoulders, or the ears, and say Allahu akbar. This is the opening takbir and from here nothing else may be said. Standing with the hands folded: the opening praise, then seeking refuge, bismillah, Surah al-Fatihah, then another surah in the first two units. Say Allahu akbar and bow, with the back level, saying subhana rabbiy al-azeem three times. Rise saying sami'a Allahu liman hamidah, then rabbana lakal hamd. Say Allahu akbar and prostrate on seven limbs, saying subhana rabbiy al-a'la three times. Sit, then prostrate again. That is one unit.",
        },
        check: {
          question: { te: "సజ్దాలో ఎన్ని అవయవాలు నేలను తాకాలి?", en: "How many limbs touch the ground in prostration?" },
          options: [
            { te: "ఏడు", en: "Seven" },
            { te: "మూడు", en: "Three" },
            { te: "ఐదు", en: "Five" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "తుమానీనా — స్థిరత్వం", en: "Tumaninah: stillness" },
        body: {
          te: "ఇది కేవలం సలహా కాదు, నమాజ్ చెల్లుబాటుకు షరతు. ఒక వ్యక్తి తొందరగా నమాజ్ చేయడం చూసి ప్రవక్త ﷺ అతన్ని పిలిచి 'తిరిగి వెళ్ళి నమాజ్ చేయి, నీవు నమాజ్ చేయలేదు' అని మూడుసార్లు చెప్పారు. తర్వాత ప్రతి స్థానంలో శరీరం స్థిరపడేవరకు ఆగమని నేర్పారు (బుఖారీ, ముస్లిం). ఆచరణాత్మక కొలత: ప్రతి స్థానంలో కనీసం ఒకసారి 'సుబ్‌హాన రబ్బియల్ అజీమ్' పూర్తిగా చెప్పగలిగేంత సమయం ఆగాలి. ఎముకలు స్థిరపడకుండా తర్వాతి స్థానానికి వెళ్ళడం నమాజ్‌ను చెల్లనిదిగా చేస్తుంది.",
          en: "This is not advice but a condition of validity. Seeing a man pray hurriedly, the Prophet ﷺ called him back and said three times: go and pray, for you have not prayed. He then taught him to settle in every position (Bukhari and Muslim). A practical measure: pause long enough in each position to say subhana rabbiy al-azeem once completely. Moving on before the bones have settled invalidates the prayer.",
        },
      },
      {
        heading: { te: "ముగింపు: తషహ్హుద్, సలామ్", en: "Ending: tashahhud and salam" },
        body: {
          te: "రెండో రక్అత్ తర్వాత కూర్చుని తషహ్హుద్ ('అత్తహియ్యాతు లిల్లాహి...'). రెండు రక్అత్‌ల నమాజైతే ఇక్కడే దురూద్ ఇబ్రాహీమీ చేర్చి, ఒక దుఆ చేసి, కుడివైపు 'అస్సలాము అలైకుమ్ వ రహ్మతుల్లాహ్', తర్వాత ఎడమవైపు అదే. మూడు లేదా నాలుగు రక్అత్‌లైతే మొదటి తషహ్హుద్ తర్వాత లేచి మిగిలినవి పూర్తి చేయాలి — ఆ రక్అత్‌లలో అల్-ఫాతిహా మాత్రమే. మజ్‌హబ్‌ల మధ్య భేదాలు: హనఫీ మజ్‌హబ్‌లో చేతులు తక్బీరతుల్ ఇహ్రామ్‌కు మాత్రమే ఎత్తుతారు; మిగిలిన మజ్‌హబ్‌ల్లో రుకూకు ముందు, తర్వాత కూడా. 'ఆమీన్' హనఫీలో మౌనంగా, షాఫయీలో బిగ్గరగా.",
          en: "After the second unit, sit for the tashahhud. In a two-unit prayer, add the salawat and a supplication, then say as-salaamu alaykum wa rahmatullah to the right and then to the left. In a three or four unit prayer, rise after the first tashahhud and complete the rest, reciting only al-Fatihah in those units. Two differences worth knowing: Hanafis raise the hands only at the opening takbir while the others also raise them before and after bowing, and ameen is said silently in the Hanafi school and aloud in the Shafi'i.",
        },
      },
      {
        heading: { te: "పొరపాటు జరిగితే — సజ్దా సహ్వ్", en: "If you make a mistake: the prostration of forgetfulness" },
        body: {
          te: "ఒక రక్అత్ ఎక్కువ చేశారా? ఒక సజ్దా తక్కువ చేశారా? తషహ్హుద్ మరచిపోయారా? నమాజ్‌ను తిరిగి మొదలుపెట్టనవసరం లేదు. చివరన సలామ్‌కు ముందు (లేదా తర్వాత, మజ్‌హబ్‌ను బట్టి) రెండు అదనపు సజ్దాలు చేసి, తర్వాత సలామ్ చెప్పాలి. దీన్ని 'సజ్దా సహ్వ్' అంటారు. సందేహం వస్తే — 'మూడు చేశానా నాలుగా?' — తక్కువ సంఖ్యను తీసుకుని, మిగిలినది పూర్తి చేసి, సజ్దా సహ్వ్ చేయండి. ఇది ఒక ఉపశమనం: మరపు నమాజ్‌ను నాశనం చేయదు.",
          en: "Prayed an extra unit? Left out a prostration? Forgot the first tashahhud? You do not start over. At the end, before the salam or after it depending on the school, make two extra prostrations and then give the salam. This is the sajdah of forgetfulness. If you are unsure whether you prayed three units or four, take the lower number, complete the rest and make the sajdah. It is a mercy: forgetfulness does not destroy the prayer.",
        },
      },
    ],
    takeaways: [
      { te: "ఆరు షరతులు నమాజ్‌కు ముందు — ఏదైనా లేకపోతే నమాజ్ చెల్లదు.", en: "Six conditions before prayer; without any of them it is not valid." },
      { te: "తుమానీనా షరతు, సలహా కాదు — ప్రతి స్థానంలో స్థిరపడాలి.", en: "Stillness is a condition, not advice; settle in every position." },
      { te: "పొరపాటుకు సజ్దా సహ్వ్; నమాజ్ తిరిగి మొదలుపెట్టనవసరం లేదు.", en: "A mistake calls for the sajdah of forgetfulness, not starting over." },
    ],
    didYouKnow: [
      { te: "సజ్దాలో నేలను తాకవలసిన ఏడు అవయవాలు: నుదురు (ముక్కుతో సహా), రెండు అరచేతులు, రెండు మోకాళ్ళు, రెండు పాదాల వేళ్ళు.", en: "The seven limbs of prostration: the forehead with the nose, the two palms, the two knees, and the toes of both feet." },
      { te: "ప్రవక్త ﷺ చెప్పారు: దాసుడు తన ప్రభువుకు అత్యంత దగ్గరగా ఉండేది సజ్దాలోనే (ముస్లిం).", en: "The Prophet ﷺ said a servant is closest to their Lord in prostration (Muslim)." },
    ],
    reflect: [
      { te: "మీ నమాజ్‌లో ప్రతి స్థానంలో నిజంగా ఆగుతున్నారా, లేక ఒక కదలిక నుండి మరొకదానికి ప్రవహిస్తున్నారా?", en: "Do you actually pause in each position, or flow from one movement into the next?" },
    ],
    mistakes: [
      { te: "స్థానాల మధ్య ఆగకుండా వేగంగా కదలడం — ఇది నమాజ్‌ను చెల్లనిదిగా చేయగలదు.", en: "Moving between positions without pausing, which can invalidate the prayer." },
      { te: "సజ్దాలో ముక్కును నేలకు తాకించకపోవడం.", en: "Not letting the nose touch the ground in prostration." },
      { te: "పొరపాటు జరిగినప్పుడు నమాజ్ మొత్తం తిరిగి మొదలుపెట్టడం.", en: "Starting the whole prayer again after a mistake." },
    ],
    faqs: [
      {
        question: { te: "అరబిక్ రాకపోతే నమాజ్ ఎలా?", en: "How do I pray if I do not know Arabic?" },
        answer: {
          te: "సూరా అల్-ఫాతిహా, కొన్ని చిన్న సూరాలు, రుకూ-సజ్దా తస్బీహ్‌లు, తషహ్హుద్ — ఇవి కంఠస్థం చేయవలసినవి, మొత్తం కలిపి కొన్ని వందల పదాలే. అవి నేర్చుకునేవరకు మీకు వచ్చినదానితో నమాజ్ చేయండి, మానవద్దు. ప్రవక్త ﷺ ఏమీ రాని ఒక వ్యక్తికి 'సుబ్‌హానల్లాహ్, అల్‌హమ్దులిల్లాహ్, లా ఇలాహ ఇల్లల్లాహ్, అల్లాహు అక్బర్' చెప్పమని నేర్పారు (అబూ దావూద్).",
          en: "What has to be memorised is al-Fatihah, a few short surahs, the tasbih of bowing and prostration, and the tashahhud, a few hundred words in all. Until you have them, pray with what you know rather than not praying. The Prophet ﷺ taught a man who knew nothing to say subhanallah, alhamdulillah, laa ilaaha illallah and Allahu akbar (Abu Dawud).",
        },
      },
      {
        question: { te: "అనారోగ్యం వల్ల నిలబడలేకపోతే?", en: "What if illness prevents me standing?" },
        answer: {
          te: "కూర్చుని చేయండి. కూర్చోలేకపోతే పడుకుని, సైగలతో. ప్రవక్త ﷺ ఇమ్రాన్ బిన్ హుసైన్ (ర/అ)కు చెప్పారు: 'నిలబడి నమాజ్ చేయి; సాధ్యం కాకపోతే కూర్చుని; అదీ సాధ్యం కాకపోతే పక్కకు పడుకుని' (బుఖారీ). ఏ స్థితిలోనూ నమాజ్ వదలకూడదు.",
          en: "Pray sitting. If you cannot sit, lying down with gestures. The Prophet ﷺ told Imran ibn Husayn (RA): pray standing; if you cannot, then sitting; if you cannot, then on your side (Bukhari). The prayer is not dropped in any state.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నమాజ్‌ను ఏది ప్రారంభిస్తుంది?", en: "What begins the prayer?" },
        options: [
          { te: "తక్బీరతుల్ ఇహ్రామ్", en: "The opening takbir" },
          { te: "నియ్యత్ బిగ్గరగా చెప్పడం", en: "Saying the intention aloud" },
          { te: "సూరా అల్-ఫాతిహా", en: "Surah al-Fatihah" },
        ],
        answer: 0,
      },
      {
        question: { te: "రుకూలో ఏమి చెబుతారు?", en: "What is said in the bowing?" },
        options: [
          { te: "సుబ్‌హాన రబ్బియల్ అజీమ్", en: "Subhana rabbiy al-azeem" },
          { te: "సుబ్‌హాన రబ్బియల్ ఆలా", en: "Subhana rabbiy al-a'la" },
          { te: "అల్‌హమ్దులిల్లాహ్", en: "Alhamdulillah" },
        ],
        answer: 0,
      },
      {
        question: { te: "రక్అత్‌ల సంఖ్యపై సందేహం వస్తే?", en: "If you are unsure how many units you have prayed?" },
        options: [
          { te: "తక్కువ సంఖ్య తీసుకుని సజ్దా సహ్వ్ చేయాలి", en: "Take the lower number and make the sajdah of forgetfulness" },
          { te: "నమాజ్ తిరిగి మొదలుపెట్టాలి", en: "Start the prayer again" },
          { te: "ఎక్కువ సంఖ్య తీసుకోవాలి", en: "Take the higher number" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "తక్బీర్ → ఫాతిహా + సూరా → రుకూ → నిలబడటం → సజ్దా → కూర్చోవడం → సజ్దా.", en: "Takbir, Fatihah plus a surah, bowing, standing, prostration, sitting, prostration." },
      { te: "ఏడు అవయవాలు; తుమానీనా షరతు.", en: "Seven limbs; stillness is a condition." },
      { te: "పొరపాటుకు సజ్దా సహ్వ్.", en: "A mistake calls for the sajdah of forgetfulness." },
    ],
    summary: {
      te: "ఆరు షరతులతో మొదలుపెట్టి, తక్బీర్ నుండి సలామ్ వరకు ప్రతి స్థానంలో స్థిరపడుతూ నమాజ్ చేయాలి. తుమానీనా చెల్లుబాటుకు షరతు. పొరపాటు జరిగితే సజ్దా సహ్వ్ సరిపోతుంది. మజ్‌హబ్‌ల మధ్య చేతులు ఎత్తడం, ఆమీన్ వంటి వివరాల్లో భేదాలు ఉన్నాయి.",
      en: "Begin with the six conditions and move from the opening takbir to the salam, settling in each position. Stillness is a condition of validity. A mistake is covered by the sajdah of forgetfulness. The schools differ on details such as raising the hands and saying ameen.",
    },
    apply: {
      te: "ఆచరణ: తర్వాతి నమాజ్‌లో ప్రతి స్థానంలో పూర్తిగా ఆగి, తస్బీహ్ నెమ్మదిగా చెప్పండి.",
      en: "Apply it: in your next prayer, stop fully in each position and say the tasbih unhurried.",
    },
    reading: [
      { label: "Salah simulator", url: "/knowledge-center/learn-salah" },
      { label: "The five daily prayers", url: "/knowledge-center/learn-salah/fiveprayers" },
    ],
  },
];
