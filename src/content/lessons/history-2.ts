/* Islamic History, levels 6 to 10.

   Split from ./history.ts only because ten full lessons in one file is
   unwieldy; both arrays are spread into authoredLessons together. */
import type { Lesson } from "../lessons.ts";

export const historyLessonsTwo: Lesson[] = [
  {
    slug: "andalus",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 6 — అల్-అందలుస్: ముస్లిం స్పెయిన్",
      en: "Level 6 — Al-Andalus: Muslim Spain",
    },
    intro: {
      te: "711 నుండి 1492 వరకు — దాదాపు ఎనిమిది వందల సంవత్సరాలు — స్పెయిన్‌లో ముస్లిం పాలన కొనసాగింది. కార్డోబా ఆనాటి యూరప్‌లో అత్యంత అభివృద్ధి చెందిన నగరం. కానీ ఈ కథను శృంగారీకరించకుండా, ఉన్నదున్నట్లు చూడటం ముఖ్యం.",
      en: "From 711 to 1492, almost eight hundred years of Muslim rule in Spain, with Cordoba the most advanced city in Europe of its day. But the story is worth telling as it was, without romanticising it.",
    },
    sections: [
      {
        heading: { te: "కార్డోబా — పదో శతాబ్దపు మహానగరం", en: "Cordoba, a tenth-century metropolis" },
        body: {
          te: "929లో అబ్దుర్ రహ్మాన్ III తనను ఖలీఫాగా ప్రకటించుకున్నారు, మరియు కార్డోబా ఉచ్ఛస్థితికి చేరింది. ఆ సమయంలో యూరప్‌లోని చాలా నగరాల్లో మురికి వీధులు, చీకటి ఉండేవి. కార్డోబాలో రాళ్ళు పరచిన వీధులు, రాత్రి దీపాలు, ప్రజా స్నానశాలలు, పారుదల వ్యవస్థ, ఆసుపత్రులు ఉండేవి. అల్-హకమ్ II గ్రంథాలయంలో నాలుగు లక్షల గ్రంథాలు ఉండేవని ఉల్లేఖనలు చెబుతాయి — ఈ సంఖ్యపై చరిత్రకారుల మధ్య భేదం ఉంది, కానీ అది అపారమైనదని అందరూ అంగీకరిస్తారు.",
          en: "In 929 Abd al-Rahman III declared himself caliph and Cordoba reached its height. At a time when most European cities had unpaved streets and no lighting, Cordoba had paved roads, lamps at night, public baths, drainage and hospitals. The library of al-Hakam II is reported to have held four hundred thousand volumes; historians dispute the figure, but all agree it was vast.",
        },
        check: {
          question: { te: "కార్డోబా ఖిలాఫత్ ఎప్పుడు ప్రకటించబడింది?", en: "When was the caliphate of Cordoba declared?" },
          options: [
            { te: "929లో అబ్దుర్ రహ్మాన్ III చేత", en: "In 929, by Abd al-Rahman III" },
            { te: "711లో తారిఖ్ చేత", en: "In 711, by Tariq" },
            { te: "1492లో", en: "In 1492" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కలిసి జీవించడం — నిజం, దాని పరిమితులు", en: "Living together, and its limits" },
        body: {
          te: "అల్-అందలుస్‌ను తరచూ ముస్లింలు, క్రైస్తవులు, యూదులు కలిసి జీవించిన ఆదర్శ సమాజంగా చిత్రిస్తారు. ఇందులో నిజం ఉంది: యూదు సమాజం అక్కడ ఐరోపాలో మరెక్కడా లేనంతగా వికసించింది — హస్‌దాయ్ ఇబ్న్ షాప్రుత్ ఖలీఫా మంత్రిగా, మైమోనిడీస్ గొప్ప తత్వవేత్తగా. అనువాదాలు, వైద్యం, తత్వశాస్త్రంలో మూడు సమాజాలూ కలిసి పనిచేశాయి. కానీ ఇది ఆధునిక అర్థంలో సమానత్వం కాదు: క్రైస్తవులు, యూదులు 'జిమ్మీ' హోదాలో ఉండేవారు, జిజ్యా చెల్లించేవారు, మరియు కొన్ని కాలాల్లో — ముఖ్యంగా అల్మొహద్ పాలనలో — తీవ్రమైన అణచివేత జరిగింది. నిజాయితీగా చెప్పాలంటే: ఆనాటి యూరప్ ప్రమాణాల ప్రకారం అసాధారణంగా సహనశీలం, కానీ నేటి ప్రమాణాల ప్రకారం సమానత్వం కాదు.",
          en: "Al-Andalus is often painted as an ideal of Muslims, Christians and Jews living side by side. There is truth in it: the Jewish community flourished there as nowhere else in Europe, with Hasdai ibn Shaprut serving as a caliph's minister and Maimonides emerging as a great philosopher. All three communities worked together in translation, medicine and philosophy. But this was not equality in the modern sense. Christians and Jews held dhimmi status and paid the jizya, and in some periods, under the Almohads in particular, there was severe persecution. Stated honestly: remarkably tolerant by the standards of contemporary Europe, and not equality by ours.",
        },
        check: {
          question: { te: "అల్-అందలుస్‌లో యూదు సమాజం గురించి ఏది సరైనది?", en: "Which is accurate about the Jewish community in al-Andalus?" },
          options: [
            { te: "ఐరోపాలో మరెక్కడా లేనంతగా వికసించింది, కానీ జిమ్మీ హోదాలో", en: "It flourished as nowhere else in Europe, though under dhimmi status" },
            { te: "వారికి పూర్తి సమానత్వం ఉండేది", en: "It had full equality" },
            { te: "అక్కడ యూదులు లేరు", en: "There were no Jews there" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అక్కడి పండితులు", en: "The scholars it produced" },
        body: {
          te: "ఇబ్న్ రుష్ద్ (అవెరోస్, 1126-1198) కార్డోబాలో న్యాయమూర్తి, వైద్యుడు, తత్వవేత్త. అరిస్టాటిల్‌పై ఆయన వ్యాఖ్యానాలు లాటిన్‌లోకి అనువదించబడి యూరోపియన్ విశ్వవిద్యాలయాలలో శతాబ్దాల పాటు బోధించబడ్డాయి — యూరప్‌కు అరిస్టాటిల్ తిరిగి వచ్చినది ఈ మార్గం ద్వారానే. అల్-జహ్రావీ (అబుల్‌కాసిస్) శస్త్రచికిత్సపై ముప్ఫై సంపుటాల గ్రంథం రాశారు, రెండు వందలకు పైగా శస్త్ర పరికరాలను వర్ణించారు; అది ఐదు వందల సంవత్సరాలు యూరప్‌లో ప్రామాణిక పాఠ్యగ్రంథం. ఇబ్న్ హజ్మ్ ఫిఖ్హ్, తత్వశాస్త్రంతో పాటు 'తౌఖుల్ హమామా' అనే ప్రేమపై గ్రంథం రాశారు.",
          en: "Ibn Rushd (Averroes, 1126-1198) was a judge, physician and philosopher in Cordoba. His commentaries on Aristotle were translated into Latin and taught in European universities for centuries; this is the route by which Aristotle returned to Europe. Al-Zahrawi, known as Abulcasis, wrote a thirty-volume work on surgery describing over two hundred instruments, and it remained the standard European text for five hundred years. Ibn Hazm wrote on fiqh and philosophy and also composed a treatise on love, the Ring of the Dove.",
        },
      },
      {
        heading: { te: "పతనం", en: "The ending" },
        body: {
          te: "కార్డోబా ఖిలాఫత్ 1031లో విచ్ఛిన్నమై చిన్న రాజ్యాలుగా ('తాయిఫా') విడిపోయింది. అంతర్గత విభజన, ఒకరిపై ఒకరు క్రైస్తవ రాజ్యాల సహాయం కోరడం — ఇవి క్రమంగా భూభాగాన్ని కోల్పోవడానికి దారితీశాయి. 1492లో గ్రనాడా పతనంతో ఎనిమిది వందల సంవత్సరాల పాలన ముగిసింది. తర్వాత ముస్లింలు, యూదులు మతం మార్చుకోవడం లేదా బహిష్కరణ మధ్య ఎంచుకోవలసి వచ్చింది. అల్-అందలుస్ పతనం నుండి ఒక పాఠం స్పష్టం: బయటి శత్రువు కంటే అంతర్గత విభజన ప్రమాదకరం.",
          en: "The caliphate of Cordoba broke apart in 1031 into small kingdoms, the taifas. Internal division, and rulers seeking help from Christian kingdoms against one another, led to steady loss of territory. Granada fell in 1492, ending eight centuries of rule, after which Muslims and Jews faced conversion or expulsion. One lesson from the fall is plain enough: internal division proved more dangerous than any external enemy.",
        },
      },
    ],
    takeaways: [
      { te: "711-1492: దాదాపు ఎనిమిది వందల సంవత్సరాలు.", en: "711 to 1492: almost eight hundred years." },
      { te: "కార్డోబా ఆనాటి యూరప్‌లో అత్యంత అభివృద్ధి చెందిన నగరం.", en: "Cordoba was the most advanced city in the Europe of its time." },
      { te: "సహనం నిజమే, కానీ ఆధునిక అర్థంలో సమానత్వం కాదు.", en: "The tolerance was real, but it was not equality in the modern sense." },
    ],
    didYouKnow: [
      { te: "ఇబ్న్ రుష్ద్ వ్యాఖ్యానాల ద్వారానే యూరప్ అరిస్టాటిల్‌ను తిరిగి కనుగొంది; లాటిన్ గ్రంథాలలో ఆయనను కేవలం 'ద కామెంటేటర్' అని పిలిచేవారు.", en: "Europe rediscovered Aristotle through Ibn Rushd's commentaries; Latin texts called him simply The Commentator." },
      { te: "అల్-జహ్రావీ వర్ణించిన కొన్ని శస్త్ర పరికరాలు నేటికీ ఆకారంలో దాదాపు అలాగే ఉన్నాయి.", en: "Some surgical instruments al-Zahrawi described are still close to their modern shape." },
    ],
    reflect: [
      { te: "అంతర్గత విభజన ఒక నాగరికతను కూల్చిన ఈ కథ నేటి ముస్లిం సమాజాలకు ఏమి చెబుతుంది?", en: "What does this story of internal division felling a civilisation say to Muslim communities now?" },
    ],
    mistakes: [
      { te: "అల్-అందలుస్‌ను పూర్తిగా ఆదర్శ సమాజంగా చిత్రించడం — అణచివేత కాలాలూ ఉన్నాయి.", en: "Painting al-Andalus as a flawless ideal, when there were periods of persecution too." },
      { te: "దాన్ని పూర్తిగా అణచివేత చరిత్రగా చిత్రించడం — ఇది కూడా అంతే తప్పు.", en: "Painting it as nothing but oppression, which is equally wrong." },
    ],
    faqs: [
      {
        question: { te: "'జిమ్మీ' హోదా అంటే ఏమిటి?", en: "What did dhimmi status mean?" },
        answer: {
          te: "ఇస్లామిక్ పాలనలో ముస్లిమేతర ప్రజలకు రక్షణ, మతస్వేచ్ఛ, సొంత న్యాయస్థానాలు ఇచ్చే హోదా; బదులుగా వారు 'జిజ్యా' అనే పన్ను చెల్లించేవారు (ముస్లింలు జకాత్ చెల్లించినట్లు) మరియు సైనిక సేవ నుండి మినహాయింపు పొందేవారు. ఆనాటి ప్రపంచంతో పోలిస్తే ఇది గణనీయమైన రక్షణ, కానీ ఇది సమాన పౌరసత్వం కాదు.",
          en: "It was a status under Islamic rule giving non-Muslims protection, freedom of religion and their own courts, in exchange for the jizya tax, as Muslims paid zakat, and exemption from military service. Measured against the world of the time it was substantial protection, but it was not equal citizenship.",
        },
      },
      {
        question: { te: "అల్-అందలుస్ యూరప్‌పై ఎంత ప్రభావం చూపింది?", en: "How much did al-Andalus shape Europe?" },
        answer: {
          te: "చాలా. టోలెడో అనువాద పాఠశాల ద్వారా అరబిక్ శాస్త్ర, తత్వ గ్రంథాలు లాటిన్‌లోకి వెళ్ళాయి. అంకెలు, ఆల్జీబ్రా, వైద్యం, ఖగోళశాస్త్రం, కాగితం — ఇవన్నీ ఈ మార్గంలో వచ్చాయి. స్పానిష్ భాషలో దాదాపు నాలుగు వేల అరబిక్ మూలం ఉన్న పదాలు ఉన్నాయి.",
          en: "Considerably. Through the translation school at Toledo, Arabic works of science and philosophy passed into Latin. Numerals, algebra, medicine, astronomy and paper all came this way, and Spanish carries around four thousand words of Arabic origin.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "గ్రనాడా ఎప్పుడు పతనమైంది?", en: "When did Granada fall?" },
        options: [
          { te: "1492", en: "1492" },
          { te: "1031", en: "1031" },
          { te: "711", en: "711" },
        ],
        answer: 0,
      },
      {
        question: { te: "యూరప్ అరిస్టాటిల్‌ను ఎవరి వ్యాఖ్యానాల ద్వారా తిరిగి కనుగొంది?", en: "Through whose commentaries did Europe rediscover Aristotle?" },
        options: [
          { te: "ఇబ్న్ రుష్ద్", en: "Ibn Rushd" },
          { te: "అల్-జహ్రావీ", en: "Al-Zahrawi" },
          { te: "ఇబ్న్ హజ్మ్", en: "Ibn Hazm" },
        ],
        answer: 0,
      },
      {
        question: { te: "కార్డోబా ఖిలాఫత్ పతనం తర్వాత ఏర్పడిన చిన్న రాజ్యాలను ఏమంటారు?", en: "What were the small kingdoms after the caliphate of Cordoba called?" },
        options: [
          { te: "తాయిఫా", en: "Taifas" },
          { te: "ఎమిరేట్", en: "Emirates" },
          { te: "మిల్లెత్", en: "Millets" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "711 ప్రవేశం · 929 ఖిలాఫత్ · 1031 విభజన · 1492 గ్రనాడా.", en: "711 arrival, 929 caliphate, 1031 fragmentation, 1492 Granada." },
      { te: "ఇబ్న్ రుష్ద్ · అల్-జహ్రావీ · ఇబ్న్ హజ్మ్.", en: "Ibn Rushd, al-Zahrawi, Ibn Hazm." },
      { te: "సహనం నిజం; సమానత్వం కాదు.", en: "The tolerance was real; equality it was not." },
    ],
    summary: {
      te: "ఎనిమిది వందల సంవత్సరాల ముస్లిం స్పెయిన్‌లో కార్డోబా యూరప్‌లోనే అత్యంత అభివృద్ధి చెందిన నగరం. మూడు మతాల పండితులు కలిసి పనిచేశారు, కానీ అది ఆధునిక సమానత్వం కాదు. ఇబ్న్ రుష్ద్, అల్-జహ్రావీ యూరప్‌ను శతాబ్దాల పాటు ప్రభావితం చేశారు. అంతర్గత విభజనే పతనానికి కారణం.",
      en: "In eight centuries of Muslim Spain, Cordoba was the most advanced city in Europe. Scholars of three faiths worked together, though not as equals in the modern sense. Ibn Rushd and al-Zahrawi shaped Europe for centuries after. Internal division is what brought it down.",
    },
    apply: {
      te: "ఆచరణ: అల్-అందలుస్ నుండి యూరప్‌కు వెళ్ళిన మూడు విషయాలను రాయండి.",
      en: "Apply it: name three things that passed from al-Andalus into Europe.",
    },
    reading: [
      { label: "The Abbasid Golden Age", url: "/knowledge-center/islamic-history/wisdom" },
      { label: "Great Muslim scholars", url: "/knowledge-center/islamic-history/scholars" },
    ],
  },

  {
    slug: "ottoman",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 7 — ఉస్మానీయ సామ్రాజ్యం",
      en: "Level 7 — The Ottoman Empire",
    },
    intro: {
      te: "1299లో ఒక చిన్న అనటోలియన్ రాజ్యంగా మొదలై, ఆరు వందల సంవత్సరాలు మూడు ఖండాలలో విస్తరించిన సామ్రాజ్యం. చరిత్రలో అత్యంత సుదీర్ఘ కాలం నిలిచిన ముస్లిం రాజవంశాలలో ఇది ఒకటి.",
      en: "Beginning in 1299 as a small Anatolian principality and lasting six centuries across three continents, the Ottomans were among the longest-lived Muslim dynasties in history.",
    },
    sections: [
      {
        heading: { te: "1453 — కాన్‌స్టాంటినోపుల్", en: "1453, Constantinople" },
        body: {
          te: "ఇరవై ఒక్క ఏళ్ళ సుల్తాన్ మెహ్మద్ II 1453లో కాన్‌స్టాంటినోపుల్‌ను జయించారు. ఆ నగరం వెయ్యి సంవత్సరాలు బైజాంటైన్ రాజధానిగా ఉంది, మరియు దాని గోడలు అభేద్యమని పేరు. మెహ్మద్ భారీ ఫిరంగులను వాడారు, మరియు ఓడలను భూమి మీదుగా లాగించి గోల్డెన్ హార్న్‌లోకి చేర్చారు — సైనిక చరిత్రలో ప్రసిద్ధ ఎత్తుగడ. ఈ విజయంతో బైజాంటైన్ సామ్రాజ్యం ముగిసింది, మరియు చాలామంది చరిత్రకారులు దీన్ని మధ్యయుగం ముగింపుగా గుర్తిస్తారు. నగరం ఇస్తాంబుల్ అయింది.",
          en: "Sultan Mehmed II took Constantinople in 1453 at the age of twenty-one. The city had been the Byzantine capital for a thousand years and its walls had a reputation for being impregnable. Mehmed used massive cannon and had ships dragged overland into the Golden Horn, a manoeuvre still famous in military history. The conquest ended the Byzantine empire, and many historians mark it as the close of the Middle Ages. The city became Istanbul.",
        },
        check: {
          question: { te: "కాన్‌స్టాంటినోపుల్‌ను ఎవరు, ఎప్పుడు జయించారు?", en: "Who took Constantinople, and when?" },
          options: [
            { te: "మెహ్మద్ II, 1453లో", en: "Mehmed II, in 1453" },
            { te: "సులేమాన్, 1520లో", en: "Suleiman, in 1520" },
            { te: "ఉస్మాన్, 1299లో", en: "Osman, in 1299" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సులేమాన్ — శాసనకర్త", en: "Suleiman the Lawgiver" },
        body: {
          te: "సులేమాన్ (1520-1566) పాలనలో సామ్రాజ్యం ఉచ్ఛస్థితికి చేరింది. యూరప్‌లో ఆయనను 'ద మాగ్నిఫిసెంట్' అంటారు; ఉస్మానీయలు ఆయనను 'ఖానూనీ' — శాసనకర్త — అనేవారు. ఈ రెండో పేరు ఎక్కువ చెబుతుంది: ఆయన ప్రధాన కృషి పరిపాలనా చట్టాల వ్యవస్థీకరణ. షరీఅత్ కవర్ చేయని పరిపాలనా విషయాలకు 'ఖానూన్' అనే చట్ట సంహితను రూపొందించారు. ఆయన కాలంలోనే మిమార్ సినాన్ అనే ప్రధాన వాస్తుశిల్పి సులేమానియె మస్జిద్ సహా మూడు వందలకు పైగా కట్టడాలను నిర్మించారు.",
          en: "Under Suleiman (1520-1566) the empire reached its height. Europe called him the Magnificent; the Ottomans called him Kanuni, the Lawgiver, and the second name says more. His main work was codifying administrative law, the kanun, covering matters the Shariah left to the ruler's discretion. In his reign the chief architect Mimar Sinan built over three hundred structures, the Suleymaniye mosque among them.",
        },
        check: {
          question: { te: "ఉస్మానీయలు సులేమాన్‌ను ఏమని పిలిచేవారు?", en: "What did the Ottomans call Suleiman?" },
          options: [
            { te: "ఖానూనీ — శాసనకర్త", en: "Kanuni, the Lawgiver" },
            { te: "ద మాగ్నిఫిసెంట్", en: "The Magnificent" },
            { te: "అల్-ఫాతిహ్ — విజేత", en: "Al-Fatih, the Conqueror" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మిల్లెత్ వ్యవస్థ", en: "The millet system" },
        body: {
          te: "ఉస్మానీయ సామ్రాజ్యంలో అనేక మతాలు, భాషలు, జాతులు ఉండేవి. వాటిని పాలించడానికి 'మిల్లెత్' వ్యవస్థను వాడారు: ప్రతి మత సమాజం — ఆర్థోడాక్స్ క్రైస్తవులు, అర్మేనియన్లు, యూదులు — తమ సొంత మత నాయకుడి కింద, తమ సొంత చట్టాల ప్రకారం వివాహం, వారసత్వం, అంతర్గత వివాదాలను నిర్వహించుకునేవారు. 1492లో స్పెయిన్ నుండి బహిష్కరించబడిన యూదులను సుల్తాన్ బాయజీద్ II స్వాగతించారు, మరియు వారి వారసులు శతాబ్దాల పాటు ఇస్తాంబుల్, సలోనికాలో నివసించారు.",
          en: "The empire held many religions, languages and peoples, and governed them through the millet system: each religious community, the Orthodox Christians, the Armenians, the Jews, ran its own marriage, inheritance and internal disputes under its own leader and its own law. When Spain expelled its Jews in 1492, Sultan Bayezid II welcomed them, and their descendants lived in Istanbul and Salonica for centuries after.",
        },
      },
      {
        heading: { te: "క్షీణత, ముగింపు", en: "Decline and end" },
        body: {
          te: "పదిహేడో శతాబ్దం నుండి క్షీణత మొదలైంది. కారణాలు అనేకం: యూరప్‌లో సాంకేతిక, సైనిక పురోగతి; అట్లాంటిక్ వాణిజ్య మార్గాలు తెరుచుకుని మధ్యధరా ప్రాముఖ్యత తగ్గడం; అంతర్గత పరిపాలనా బలహీనతలు. పంతొమ్మిదో శతాబ్దంలో 'తన్జీమాత్' సంస్కరణలతో ఆధునికీకరణకు ప్రయత్నించారు. మొదటి ప్రపంచ యుద్ధంలో ఓటమి తర్వాత సామ్రాజ్యం విభజించబడింది. 1922లో సుల్తానేట్, 1924 మార్చిలో ఖిలాఫత్ రద్దు చేయబడ్డాయి — పదమూడు శతాబ్దాల ఒక సంస్థ ముగిసింది.",
          en: "Decline set in from the seventeenth century, for many reasons: European technical and military advance, the opening of Atlantic trade routes which reduced the importance of the Mediterranean, and internal administrative weakness. In the nineteenth century the Tanzimat reforms attempted modernisation. After defeat in the First World War the empire was partitioned. The sultanate was abolished in 1922 and the caliphate in March 1924, ending an institution thirteen centuries old.",
        },
      },
    ],
    takeaways: [
      { te: "1299-1924, ఆరు శతాబ్దాలు, మూడు ఖండాలు.", en: "1299 to 1924: six centuries across three continents." },
      { te: "1453 కాన్‌స్టాంటినోపుల్ — బైజాంటైన్ సామ్రాజ్యం ముగింపు.", en: "1453, Constantinople, and the end of the Byzantine empire." },
      { te: "మిల్లెత్ వ్యవస్థ: ప్రతి మత సమాజం తన సొంత చట్టాల కింద.", en: "The millet system let each religious community live under its own law." },
    ],
    didYouKnow: [
      { te: "మిమార్ సినాన్ తొంభైకి పైగా ఏళ్ళు జీవించి మూడు వందలకు పైగా కట్టడాలు నిర్మించారు; ఆయనను ఉస్మానీయ వాస్తుశిల్పానికి ప్రతీకగా భావిస్తారు.", en: "Mimar Sinan lived past ninety and built over three hundred structures; he is taken as the emblem of Ottoman architecture." },
      { te: "1492లో స్పెయిన్ యూదులను బహిష్కరించినప్పుడు సుల్తాన్ బాయజీద్ II ఓడలను పంపి వారిని తీసుకువచ్చారు.", en: "When Spain expelled its Jews in 1492, Sultan Bayezid II sent ships to bring them." },
    ],
    reflect: [
      { te: "1924లో ఖిలాఫత్ రద్దు ముస్లిం ప్రపంచంపై ఎలాంటి ప్రభావం చూపి ఉండవచ్చు?", en: "What effect might the abolition of the caliphate in 1924 have had on the Muslim world?" },
    ],
    mistakes: [
      { te: "ఉస్మానీయ చరిత్రను కేవలం క్షీణత కథగా చదవడం — ఆరు శతాబ్దాలలో ఎక్కువ భాగం బలమైన పాలన.", en: "Reading Ottoman history as a story of decline, when most of six centuries was strong rule." },
      { te: "సులేమాన్‌ను కేవలం విజేతగా చూడటం — ఆయన ప్రధాన కృషి చట్ట వ్యవస్థీకరణ.", en: "Seeing Suleiman only as a conqueror, when his main work was codifying law." },
    ],
    faqs: [
      {
        question: { te: "ఖిలాఫత్ రద్దు తర్వాత ఏమైంది?", en: "What happened after the caliphate was abolished?" },
        answer: {
          te: "ముస్లిం ప్రపంచంలో దాన్ని పునరుద్ధరించే ప్రయత్నాలు జరిగాయి — 1926లో కైరో సదస్సు వంటివి — కానీ ఏకాభిప్రాయం కుదరలేదు. అప్పటినుండి ముస్లిం ప్రపంచం జాతీయ రాజ్యాలుగా ఉంది. ఇది నేటికీ చర్చనీయాంశం, మరియు దానిపై ముస్లిం పండితుల మధ్య వేర్వేరు అభిప్రాయాలు ఉన్నాయి.",
          en: "There were attempts to revive it, such as the Cairo conference of 1926, but no consensus emerged. The Muslim world has been organised as nation states since. It remains a subject of discussion, and Muslim scholars hold a range of views on it.",
        },
      },
      {
        question: { te: "హగియా సోఫియా విషయం ఏమిటి?", en: "What about the Hagia Sophia?" },
        answer: {
          te: "అది వెయ్యి సంవత్సరాలు బైజాంటైన్ చర్చిగా ఉండేది. 1453 తర్వాత మెహ్మద్ II దాన్ని మస్జిద్‌గా మార్చారు (సంప్రదాయిక ఉల్లేఖనల ప్రకారం దాన్ని కొనుగోలు చేసి). 1935లో అది మ్యూజియంగా మారింది, 2020లో మళ్ళీ మస్జిద్‌గా మార్చబడింది. దీనిపై అభిప్రాయాలు వేర్వేరు.",
          en: "It was a Byzantine church for a thousand years. After 1453 Mehmed II converted it to a mosque, by traditional accounts having purchased it. It became a museum in 1935 and was returned to use as a mosque in 2020. Views on this differ.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఉస్మానీయ సామ్రాజ్యం ఎప్పుడు మొదలైంది?", en: "When did the Ottoman Empire begin?" },
        options: [
          { te: "1299", en: "1299" },
          { te: "1453", en: "1453" },
          { te: "1520", en: "1520" },
        ],
        answer: 0,
      },
      {
        question: { te: "'మిల్లెత్' వ్యవస్థ ఏమి చేసింది?", en: "What did the millet system do?" },
        options: [
          { te: "ప్రతి మత సమాజం తన సొంత చట్టాల కింద ఉండేలా చేసింది", en: "It let each religious community live under its own law" },
          { te: "సైన్యాన్ని నిర్వహించింది", en: "It organised the army" },
          { te: "పన్నులను రద్దు చేసింది", en: "It abolished taxes" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖిలాఫత్ ఎప్పుడు రద్దు చేయబడింది?", en: "When was the caliphate abolished?" },
        options: [
          { te: "1924", en: "1924" },
          { te: "1922", en: "1922" },
          { te: "1918", en: "1918" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "1299 ఆరంభం · 1453 ఇస్తాంబుల్ · 1520-66 సులేమాన్ · 1924 ముగింపు.", en: "1299 founding, 1453 Istanbul, 1520-66 Suleiman, 1924 the end." },
      { te: "ఖానూనీ = శాసనకర్త; మిమార్ సినాన్ = వాస్తుశిల్పి.", en: "Kanuni the Lawgiver; Mimar Sinan the architect." },
      { te: "మిల్లెత్: మత సమాజాల స్వయం పాలన.", en: "Millet: self-governance for religious communities." },
    ],
    summary: {
      te: "ఉస్మానీయలు 1299 నుండి 1924 వరకు మూడు ఖండాలలో పాలించారు. 1453లో కాన్‌స్టాంటినోపుల్ విజయం ఒక యుగాన్ని ముగించింది. సులేమాన్ కాలంలో చట్ట వ్యవస్థీకరణ, వాస్తుశిల్పం ఉచ్ఛస్థితికి చేరాయి. మిల్లెత్ వ్యవస్థ బహుళ మత సమాజాలను నిర్వహించింది.",
      en: "The Ottomans ruled across three continents from 1299 to 1924. The taking of Constantinople in 1453 closed an era. Under Suleiman, law and architecture reached their height, and the millet system governed a plural society.",
    },
    apply: {
      te: "ఆచరణ: మిల్లెత్ వ్యవస్థ, ఆధునిక బహుళత్వం మధ్య ఒక పోలిక, ఒక తేడా రాయండి.",
      en: "Apply it: write one similarity and one difference between the millet system and modern pluralism.",
    },
    reading: [
      { label: "Islamic History portal", url: "/knowledge-center/islamic-history" },
      { label: "The Colonial Era", url: "/knowledge-center/islamic-history/colonial" },
    ],
  },

  {
    slug: "scholars",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 8 — పండితులు, శాస్త్రవేత్తలు",
      en: "Level 8 — The scholars and scientists",
    },
    intro: {
      te: "ముస్లిం నాగరికత ప్రపంచానికి ఇచ్చినవి కేవలం భవనాలు, సామ్రాజ్యాలు కాదు. ఆల్జీబ్రా, ఆల్గరిథమ్, ఆధునిక వైద్యం, ప్రయోగాత్మక పద్ధతి — ఈ పదాల వెనుక నిర్దిష్ట వ్యక్తులు ఉన్నారు.",
      en: "What Muslim civilisation gave the world was not only buildings and empires. Algebra, the algorithm, modern medicine, the experimental method: there are specific people behind these words.",
    },
    sections: [
      {
        heading: { te: "అల్-ఖ్వారిజ్మీ — ఆల్జీబ్రా, ఆల్గరిథమ్", en: "Al-Khwarizmi: algebra and the algorithm" },
        body: {
          te: "తొమ్మిదో శతాబ్దంలో బాగ్దాద్‌లో పనిచేసిన అల్-ఖ్వారిజ్మీ 'కితాబ్ అల్-జబ్ర్ వల్-ముఖాబలా' రాశారు. ఆ పేరులోని 'అల్-జబ్ర్' నుండే 'ఆల్జీబ్రా' అనే పదం వచ్చింది. ఆయన పేరు లాటిన్‌లో 'ఆల్గోరిత్మీ' అయి, దాని నుండి 'ఆల్గరిథమ్' వచ్చింది — నేటి కంప్యూటర్ యుగంలో అత్యంత ప్రాథమిక పదం. ఆయన భారతీయ దశాంశ అంకె వ్యవస్థను, సున్నాను ముస్లిం ప్రపంచానికి పరిచయం చేశారు; అక్కడి నుండి అవి యూరప్‌కు వెళ్ళాయి. అందుకే వాటిని ఇంగ్లిష్‌లో 'అరబిక్ న్యూమరల్స్' అంటారు.",
          en: "Working in ninth-century Baghdad, al-Khwarizmi wrote the Book of Restoration and Balancing. The al-jabr in its title is where the word algebra comes from. His own name became Algoritmi in Latin, giving us algorithm, about as basic a word as the computer age has. He introduced the Indian decimal numerals and zero into the Muslim world, from where they passed into Europe, which is why English calls them Arabic numerals.",
        },
        check: {
          question: { te: "'ఆల్గరిథమ్' అనే పదం ఎక్కడి నుండి వచ్చింది?", en: "Where does the word algorithm come from?" },
          options: [
            { te: "అల్-ఖ్వారిజ్మీ పేరు నుండి", en: "From the name al-Khwarizmi" },
            { te: "గ్రీక్ నుండి", en: "From Greek" },
            { te: "లాటిన్ 'ఆల్గస్' నుండి", en: "From the Latin algus" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇబ్న్ అల్-హైథమ్ — ప్రయోగాత్మక పద్ధతి", en: "Ibn al-Haytham and the experimental method" },
        body: {
          te: "ఇబ్న్ అల్-హైథమ్ (965-1040) 'కితాబ్ అల్-మనాజిర్' (దృష్టి శాస్త్ర గ్రంథం) రాశారు. ఆయనకు ముందు గ్రీకులు కంటి నుండి కిరణాలు బయటకు వెళ్ళి చూడటం జరుగుతుందని భావించేవారు. ఆయన ప్రయోగాల ద్వారా కాంతి వస్తువుల నుండి కంటిలోకి వస్తుందని నిరూపించారు. కానీ ఆయన అసలు కృషి పద్ధతి: ఒక సిద్ధాంతాన్ని ప్రయోగం ద్వారా పరీక్షించి, ఫలితం సిద్ధాంతానికి విరుద్ధమైతే సిద్ధాంతాన్ని వదిలేయడం. చాలామంది శాస్త్ర చరిత్రకారులు ఆయనను ఆధునిక శాస్త్రీయ పద్ధతి తొలి రూపకర్తగా పరిగణిస్తారు.",
          en: "Ibn al-Haytham (965-1040) wrote the Book of Optics. Before him the Greeks held that seeing happened by rays leaving the eye. Through experiment he showed that light travels from objects into the eye. But his real contribution was the method: test a hypothesis by experiment, and if the result contradicts it, abandon the hypothesis. Many historians of science regard him as an early formulator of the modern scientific method.",
        },
        check: {
          question: { te: "ఇబ్న్ అల్-హైథమ్ ప్రధాన కృషి ఏమిటి?", en: "What was Ibn al-Haytham's main contribution?" },
          options: [
            { te: "ప్రయోగం ద్వారా సిద్ధాంతాన్ని పరీక్షించే పద్ధతి", en: "The method of testing a hypothesis by experiment" },
            { te: "టెలిస్కోప్ ఆవిష్కరణ", en: "Inventing the telescope" },
            { te: "ఆల్జీబ్రా", en: "Algebra" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "వైద్యం — ఇబ్న్ సీనా, అల్-రాజీ", en: "Medicine: Ibn Sina and al-Razi" },
        body: {
          te: "ఇబ్న్ సీనా (అవిసెన్నా, 980-1037) రాసిన 'అల్-ఖానూన్ ఫిత్-తిబ్' (వైద్య శాస్త్ర సూత్రం) ఐదు సంపుటాల విజ్ఞాన సర్వస్వం. అది లాటిన్‌లోకి అనువదించబడి యూరోపియన్ వైద్య కళాశాలలలో ఆరు వందల సంవత్సరాలు ప్రామాణిక పాఠ్యగ్రంథంగా ఉంది. అల్-రాజీ (రేజెస్, 854-925) మశూచి, తట్టు (మీజిల్స్) మధ్య తేడాను మొదటిసారి వైద్యపరంగా వర్ణించారు, మరియు ఆసుపత్రి స్థానాన్ని ఎంచుకోవడానికి వేర్వేరు చోట్ల మాంసం వేలాడదీసి ఏది ఆలస్యంగా చెడిపోతుందో చూశారని చెబుతారు — ఒక ప్రయోగాత్మక ఆలోచన.",
          en: "Ibn Sina (Avicenna, 980-1037) wrote the Canon of Medicine, a five-volume encyclopaedia. Translated into Latin, it was a standard text in European medical schools for six hundred years. Al-Razi (Rhazes, 854-925) gave the first clinical description distinguishing smallpox from measles, and is said to have chosen a hospital site by hanging meat in different places to see where it spoiled slowest, which is an experimental instinct.",
        },
      },
      {
        heading: { te: "ఇబ్న్ ఖల్దూన్ — సమాజ శాస్త్రం", en: "Ibn Khaldun and the study of society" },
        body: {
          te: "ఇబ్న్ ఖల్దూన్ (1332-1406) 'ముఖద్దిమా' రాశారు — చరిత్ర గ్రంథానికి పరిచయంగా ఉద్దేశించినది, కానీ అది స్వతంత్రంగా ఒక కొత్త శాస్త్రాన్ని సృష్టించింది. ఆయన ప్రశ్న: నాగరికతలు ఎందుకు లేస్తాయి, ఎందుకు పడతాయి? ఆయన సమాధానం 'అసబియ్యా' — సామాజిక సమన్వయ శక్తి. ఒక సమూహం బలమైన సమన్వయంతో అధికారం సాధిస్తుంది; సౌకర్యం పెరిగేకొద్దీ ఆ సమన్వయం బలహీనపడి, కొత్త సమూహం స్థానంలోకి వస్తుంది. ఆధునిక సామాజిక శాస్త్రవేత్తలు ఆయనను ఆ రంగానికి పూర్వగామిగా గుర్తిస్తారు.",
          en: "Ibn Khaldun (1332-1406) wrote the Muqaddimah, meant as an introduction to a history and which founded a new discipline in its own right. His question was why civilisations rise and fall, and his answer was asabiyyah, social cohesion. A group with strong cohesion takes power; as comfort grows the cohesion weakens and another group replaces it. Modern social scientists recognise him as a forerunner of their field.",
        },
      },
      {
        heading: { te: "ఫాతిమా అల్-ఫిహ్రీ — తొలి విశ్వవిద్యాలయం", en: "Fatima al-Fihri and the first university" },
        body: {
          te: "859లో మొరాకోలోని ఫెజ్ నగరంలో ఫాతిమా అల్-ఫిహ్రీ అనే మహిళ తన వారసత్వ ధనంతో అల్-ఖరవియ్యీన్ మస్జిద్, విద్యాసంస్థను స్థాపించారు. యునెస్కో మరియు గిన్నిస్ దాన్ని ప్రపంచంలో నిరంతరంగా నడుస్తున్న అత్యంత పురాతన డిగ్రీ ఇచ్చే సంస్థగా గుర్తిస్తాయి — ఐరోపాలోని ఏ విశ్వవిద్యాలయం కంటే రెండు వందల సంవత్సరాలు ముందు. ఇది గుర్తుంచుకోవలసిన విషయం: ప్రపంచపు తొలి విశ్వవిద్యాలయాన్ని స్థాపించినది ఒక ముస్లిం మహిళ.",
          en: "In 859, in Fez in Morocco, a woman named Fatima al-Fihri used her inheritance to found the mosque and teaching institution of al-Qarawiyyin. UNESCO and the Guinness records recognise it as the oldest continuously operating degree-granting institution in the world, two centuries older than any European university. It is worth holding on to: the world's first university was founded by a Muslim woman.",
        },
      },
    ],
    takeaways: [
      { te: "'ఆల్జీబ్రా', 'ఆల్గరిథమ్' రెండూ అల్-ఖ్వారిజ్మీ నుండి.", en: "Both algebra and algorithm come from al-Khwarizmi." },
      { te: "ఇబ్న్ అల్-హైథమ్ ప్రయోగాత్మక పద్ధతిని రూపొందించారు.", en: "Ibn al-Haytham formulated the experimental method." },
      { te: "ప్రపంచపు తొలి విశ్వవిద్యాలయాన్ని ఫాతిమా అల్-ఫిహ్రీ స్థాపించారు (859).", en: "The world's first university was founded by Fatima al-Fihri in 859." },
    ],
    didYouKnow: [
      { te: "ఇబ్న్ సీనా 'ఖానూన్' యూరోపియన్ వైద్య కళాశాలలలో పదిహేడో శతాబ్దం వరకు బోధించబడింది.", en: "Ibn Sina's Canon was still being taught in European medical schools into the seventeenth century." },
      { te: "'కెమిస్ట్రీ' అనే పదం అరబిక్ 'అల్-కీమియా' నుండి; 'ఆల్కహాల్' 'అల్-కుహ్ల్' నుండి.", en: "The word chemistry comes from the Arabic al-kimiya, and alcohol from al-kuhl." },
    ],
    reflect: [
      { te: "ఈ పండితులు విశ్వాసానికి, పరిశోధనకు మధ్య వైరుధ్యాన్ని చూడలేదు. ఆ దృక్పథం ఎలా ఉండేది?", en: "These scholars saw no conflict between faith and inquiry. What sort of outlook was that?" },
    ],
    mistakes: [
      { te: "ముస్లిం పండితులు గ్రీకు జ్ఞానాన్ని కేవలం భద్రపరిచారని అనుకోవడం — వారు దాన్ని సరిదిద్ది, ముందుకు తీసుకెళ్ళారు.", en: "Assuming Muslim scholars only preserved Greek learning, when they corrected and advanced it." },
      { te: "ఈ కృషిని ఒక్క శతాబ్దానికి, ఒక్క ప్రాంతానికి పరిమితం చేయడం.", en: "Confining this work to one century or one region." },
    ],
    faqs: [
      {
        question: { te: "ఈ పండితులు మతపరమైన విద్యను కూడా అభ్యసించారా?", en: "Did these scholars also study religious knowledge?" },
        answer: {
          te: "దాదాపు అందరూ. ఇబ్న్ రుష్ద్ న్యాయమూర్తి, ఫిఖ్హ్‌పై గ్రంథాలు రాశారు. ఇబ్న్ సీనా పదేళ్ళప్పుడే ఖురాన్ కంఠస్థం చేశారు. ఆ కాలంలో 'మతపరమైన' మరియు 'ప్రాపంచిక' విద్య అనే విభజన ఇప్పటిలా ఉండేది కాదు; జ్ఞానం జ్ఞానమే.",
          en: "Nearly all of them. Ibn Rushd was a judge who wrote on fiqh. Ibn Sina had memorised the Quran by the age of ten. The split between religious and worldly knowledge was not drawn then as it is now; knowledge was knowledge.",
        },
      },
      {
        question: { te: "ఈ పురోగతి ఎందుకు ఆగిపోయింది?", en: "Why did this advance slow down?" },
        answer: {
          te: "చరిత్రకారుల మధ్య దీనిపై చర్చ ఉంది, ఒకే సమాధానం లేదు. మంగోల దాడులు, రాజకీయ విచ్ఛిన్నత, వాణిజ్య మార్గాల మార్పు, పోషణ తగ్గడం, తర్వాత వలసవాదం — అనేక కారణాలు చెప్పబడతాయి. ఏ ఒక్క కారణాన్నీ ఖచ్చితమైనదిగా చెప్పడం సరికాదు.",
          en: "Historians debate it and there is no single answer. The Mongol invasions, political fragmentation, shifting trade routes, declining patronage and later colonisation are all cited. Presenting any one of them as the settled cause would be overstating it.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'ముఖద్దిమా' ఎవరు రాశారు?", en: "Who wrote the Muqaddimah?" },
        options: [
          { te: "ఇబ్న్ ఖల్దూన్", en: "Ibn Khaldun" },
          { te: "ఇబ్న్ సీనా", en: "Ibn Sina" },
          { te: "అల్-రాజీ", en: "Al-Razi" },
        ],
        answer: 0,
      },
      {
        question: { te: "అల్-ఖరవియ్యీన్‌ను ఎవరు స్థాపించారు?", en: "Who founded al-Qarawiyyin?" },
        options: [
          { te: "ఫాతిమా అల్-ఫిహ్రీ", en: "Fatima al-Fihri" },
          { te: "అల్-మామూన్", en: "Al-Ma'mun" },
          { te: "ఇబ్న్ రుష్ద్", en: "Ibn Rushd" },
        ],
        answer: 0,
      },
      {
        question: { te: "'అసబియ్యా' అంటే ఏమిటి?", en: "What is asabiyyah?" },
        options: [
          { te: "సామాజిక సమన్వయ శక్తి", en: "Social cohesion" },
          { te: "ఒక వైద్య పద్ధతి", en: "A medical method" },
          { te: "ఒక గణిత సూత్రం", en: "A mathematical formula" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అల్-ఖ్వారిజ్మీ: ఆల్జీబ్రా, ఆల్గరిథమ్, అంకెలు.", en: "Al-Khwarizmi: algebra, algorithm, numerals." },
      { te: "ఇబ్న్ అల్-హైథమ్: దృష్టి శాస్త్రం, ప్రయోగాత్మక పద్ధతి.", en: "Ibn al-Haytham: optics and the experimental method." },
      { te: "ఇబ్న్ సీనా: ఖానూన్ · ఇబ్న్ ఖల్దూన్: ముఖద్దిమా · ఫాతిమా: 859.", en: "Ibn Sina the Canon, Ibn Khaldun the Muqaddimah, Fatima 859." },
    ],
    summary: {
      te: "ఆల్జీబ్రా, ఆల్గరిథమ్, ప్రయోగాత్మక పద్ధతి, ఆధునిక వైద్య పాఠ్యగ్రంథం, సామాజిక శాస్త్రం, ప్రపంచపు తొలి విశ్వవిద్యాలయం — వీటి వెనుక నిర్దిష్ట ముస్లిం పండితులు ఉన్నారు. వారు విశ్వాసానికి, పరిశోధనకు మధ్య వైరుధ్యం చూడలేదు.",
      en: "Algebra, the algorithm, the experimental method, the standard medical text, the study of society and the world's first university all have particular Muslim scholars behind them. None of them saw a conflict between faith and inquiry.",
    },
    apply: {
      te: "ఆచరణ: ఈ పాఠంలోని ఒక పండితుడిని ఎంచుకుని, వారి కృషి నేటికీ ఎలా ఉపయోగపడుతుందో ఒక వాక్యంలో రాయండి.",
      en: "Apply it: pick one scholar from this lesson and write one sentence on how their work still serves us." },
    reading: [
      { label: "The Abbasid Golden Age", url: "/knowledge-center/islamic-history/wisdom" },
      { label: "Islamic Spain", url: "/knowledge-center/islamic-history/andalus" },
    ],
  },

  {
    slug: "colonial",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 9 — వలస యుగం",
      en: "Level 9 — The colonial era",
    },
    intro: {
      te: "పద్దెనిమిదో శతాబ్దం నుండి ఇరవయ్యో శతాబ్దం వరకు ముస్లిం ప్రపంచంలో అత్యధిక భాగం యూరోపియన్ పాలనలోకి వెళ్ళింది. ఇది కేవలం రాజకీయ మార్పు కాదు — విద్య, చట్టం, ఆర్థిక వ్యవస్థ, ఆత్మవిశ్వాసం అన్నీ ప్రభావితమయ్యాయి.",
      en: "From the eighteenth to the twentieth century most of the Muslim world came under European rule. This was not only a political change; education, law, economies and self-confidence were all affected.",
    },
    sections: [
      {
        heading: { te: "ఎలా జరిగింది", en: "How it happened" },
        body: {
          te: "1757లో ప్లాసీ యుద్ధం తర్వాత బ్రిటిష్ ఈస్ట్ ఇండియా కంపెనీ బెంగాల్‌ను నియంత్రించింది; 1857 తిరుగుబాటు తర్వాత భారతదేశం నేరుగా బ్రిటిష్ పాలనలోకి వెళ్ళింది, చివరి మొఘల్ చక్రవర్తి బహదూర్ షా జఫర్ బర్మాకు బహిష్కరించబడ్డారు. 1798లో నెపోలియన్ ఈజిప్టుపై దండయాత్ర చేశారు. ఫ్రాన్స్ 1830లో అల్జీరియాను, తర్వాత ఉత్తర ఆఫ్రికాలో ఎక్కువ భాగాన్ని ఆక్రమించింది. డచ్ ఇండోనేషియాలో, రష్యా మధ్య ఆసియాలో. మొదటి ప్రపంచ యుద్ధం తర్వాత సైక్స్-పికో ఒప్పందం ప్రకారం అరబ్ భూములు బ్రిటన్, ఫ్రాన్స్ మధ్య విభజించబడ్డాయి.",
          en: "After Plassey in 1757 the British East India Company controlled Bengal; after the uprising of 1857 India came under direct Crown rule and the last Mughal emperor, Bahadur Shah Zafar, was exiled to Burma. Napoleon invaded Egypt in 1798. France took Algeria in 1830 and later much of North Africa. The Dutch held Indonesia and Russia took Central Asia. After the First World War the Sykes-Picot agreement divided the Arab lands between Britain and France.",
        },
        check: {
          question: { te: "చివరి మొఘల్ చక్రవర్తి ఎవరు?", en: "Who was the last Mughal emperor?" },
          options: [
            { te: "బహదూర్ షా జఫర్", en: "Bahadur Shah Zafar" },
            { te: "ఔరంగజేబ్", en: "Aurangzeb" },
            { te: "అక్బర్", en: "Akbar" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సరిహద్దులు ఎలా గీయబడ్డాయి", en: "How the borders were drawn" },
        body: {
          te: "నేటి మధ్యప్రాచ్య పటాన్ని చూస్తే కొన్ని సరిహద్దులు గీత గీసినట్లు నేరుగా ఉంటాయి. అవి భౌగోళిక లేదా జాతిపరమైన సరిహద్దులు కాదు — అవి యూరోపియన్ దౌత్యవేత్తలు పటంపై గీసిన రేఖలు. సైక్స్-పికో (1916) బ్రిటన్, ఫ్రాన్స్ మధ్య ప్రభావ మండలాలను నిర్ణయించింది. దీని ఫలితంగా ఒకే గోత్రం, ఒకే భాష మాట్లాడే ప్రజలు వేర్వేరు దేశాల్లోకి విభజించబడ్డారు, మరియు కొన్ని దేశాల్లో పరస్పర విరుద్ధ సమూహాలు ఒకే సరిహద్దుల్లోకి వచ్చాయి. ఈ నిర్ణయాల పర్యవసానాలు నేటికీ కొనసాగుతున్నాయి.",
          en: "Look at a map of the modern Middle East and some borders run dead straight. Those are not geographic or ethnic boundaries; they are lines European diplomats drew on a map. Sykes-Picot in 1916 set out spheres of influence between Britain and France. People of one tribe and one language were split between states, and in other places groups at odds with each other were enclosed within one. The consequences of those decisions are still running.",
        },
      },
      {
        heading: { te: "విద్య, చట్టంలో మార్పు", en: "The change in education and law" },
        body: {
          te: "వలస పాలన అత్యంత దీర్ఘకాలిక ప్రభావం చూపినది ఇక్కడే. సాంప్రదాయ మదరసా వ్యవస్థ ప్రభుత్వ మద్దతును కోల్పోయి, దాని స్థానంలో యూరోపియన్ నమూనా పాఠశాలలు వచ్చాయి. షరీఅత్ న్యాయస్థానాల పరిధి కుటుంబ చట్టానికి పరిమితం చేయబడింది; వాణిజ్య, నేర చట్టాలు యూరోపియన్ సంహితల ఆధారంగా మారాయి. దీనివల్ల 'మతపరమైన విద్య' మరియు 'ఆధునిక విద్య' అనే రెండు వేర్వేరు ధారలు ఏర్పడ్డాయి — ఈ విభజన ఇబ్న్ సీనా కాలంలో లేదు, మరియు ఇది నేటికీ ముస్లిం సమాజాలలో కొనసాగుతోంది.",
          en: "This is where colonial rule left the longest mark. The traditional madrasa system lost state support and European-model schools took its place. The reach of the Shariah courts was narrowed to family law, while commercial and criminal law were rebuilt on European codes. Out of this came two separate streams, religious education and modern education, a split that did not exist in Ibn Sina's day and that persists in Muslim societies now.",
        },
        check: {
          question: { te: "వలస పాలన కాలంలో షరీఅత్ న్యాయస్థానాల పరిధి ఏమైంది?", en: "What happened to the reach of Shariah courts under colonial rule?" },
          options: [
            { te: "కుటుంబ చట్టానికి పరిమితం చేయబడింది", en: "It was narrowed to family law" },
            { te: "విస్తరించబడింది", en: "It was expanded" },
            { te: "మారలేదు", en: "It was unchanged" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ప్రతిస్పందనలు", en: "The responses" },
        body: {
          te: "ముస్లింలు నిష్క్రియంగా ఉండలేదు. ప్రతిస్పందనలు వేర్వేరుగా ఉన్నాయి. సాయుధ ప్రతిఘటన: అల్జీరియాలో అమీర్ అబ్దుల్ ఖాదిర్, సూడాన్‌లో మహ్దీ ఉద్యమం, భారతదేశంలో 1857. విద్యా సంస్కరణ: సర్ సయ్యద్ అహ్మద్ ఖాన్ అలీగఢ్ స్థాపించారు — ఆధునిక విద్యను స్వీకరించి ముందుకు వెళ్ళాలని; దారుల్ ఉలూమ్ దేవబంద్ సాంప్రదాయ ఇస్లామిక్ విద్యను కాపాడాలని. మేధో పునరుజ్జీవనం: జమాలుద్దీన్ అఫ్ఘానీ, ముహమ్మద్ అబ్దుహ్ ముస్లిం ప్రపంచం ఆలోచనాపరంగా మేల్కొనాలని వాదించారు. ఈ చర్చలు — సాంప్రదాయం, ఆధునికత మధ్య సమతుల్యత — నేటికీ కొనసాగుతున్నాయి.",
          en: "Muslims did not stand still, and the responses differed. Armed resistance: Amir Abd al-Qadir in Algeria, the Mahdist movement in Sudan, 1857 in India. Educational reform: Sir Sayyid Ahmad Khan founded Aligarh, arguing that modern education had to be taken up, while Darul Uloom Deoband set out to preserve traditional Islamic learning. Intellectual revival: Jamal al-Din al-Afghani and Muhammad Abduh argued for an awakening of thought. Those arguments, about how to hold tradition and modernity together, are still going on.",
        },
      },
    ],
    takeaways: [
      { te: "1757 ప్లాసీ నుండి 1924 ఖిలాఫత్ రద్దు వరకు — క్రమంగా వలసీకరణ.", en: "From Plassey in 1757 to the abolition of the caliphate in 1924: colonisation by degrees." },
      { te: "నేటి సరిహద్దులు చాలావరకు యూరోపియన్ దౌత్యవేత్తలు గీసినవి.", en: "Many of today's borders were drawn by European diplomats." },
      { te: "'మతపరమైన' vs 'ఆధునిక' విద్య అనే విభజన ఈ కాలంలోనే పుట్టింది.", en: "The split between religious and modern education was born in this period." },
    ],
    didYouKnow: [
      { te: "బహదూర్ షా జఫర్ కవి కూడా; బర్మాలో బహిష్కరణలో ఆయన రాసిన ఉర్దూ షేర్‌లు నేటికీ చదవబడతాయి.", en: "Bahadur Shah Zafar was also a poet, and the Urdu couplets he wrote in exile in Burma are still read." },
      { te: "అలీగఢ్, దేవబంద్ రెండూ 1857 తర్వాత కొన్ని దశాబ్దాల్లోనే స్థాపించబడ్డాయి — ఒకే సంక్షోభానికి రెండు వేర్వేరు సమాధానాలు.", en: "Aligarh and Deoband were both founded within decades of 1857: two different answers to the same crisis." },
    ],
    reflect: [
      { te: "సర్ సయ్యద్ ఆధునిక విద్యను, దేవబంద్ సాంప్రదాయ విద్యను ఎంచుకున్నారు. రెండూ అవసరమేనా?", en: "Sir Sayyid chose modern education and Deoband chose traditional. Were both needed?" },
    ],
    mistakes: [
      { te: "వలస కాలాన్ని కేవలం బాధిత కథగా చదవడం — గణనీయమైన ప్రతిఘటన, సంస్కరణ కూడా ఉన్నాయి.", en: "Reading the period only as victimhood, when there was substantial resistance and reform too." },
      { te: "ముస్లిం ప్రపంచం సమస్యలన్నిటికీ వలసవాదమే కారణమని అనుకోవడం — అంతర్గత కారణాలూ ఉన్నాయి.", en: "Attributing every problem in the Muslim world to colonialism, when there were internal causes as well." },
    ],
    faqs: [
      {
        question: { te: "ఖిలాఫత్ ఉద్యమం ఏమిటి?", en: "What was the Khilafat Movement?" },
        answer: {
          te: "1919-1924లో భారతీయ ముస్లింలు ఉస్మానీయ ఖిలాఫత్‌ను కాపాడాలని చేసిన ఉద్యమం. గాంధీ దీనికి మద్దతు ఇచ్చారు, మరియు ఇది భారత స్వాతంత్ర్య పోరాటంలో హిందూ-ముస్లిం ఐక్యతకు ఒక ముఖ్యమైన క్షణం. 1924లో టర్కీ స్వయంగా ఖిలాఫత్‌ను రద్దు చేయడంతో ఉద్యమం ముగిసింది.",
          en: "A movement among Indian Muslims from 1919 to 1924 to preserve the Ottoman caliphate. Gandhi supported it, and it was an important moment of Hindu-Muslim unity in the Indian freedom struggle. It ended when Turkey itself abolished the caliphate in 1924.",
        },
      },
      {
        question: { te: "వలస పాలన ముగిసినా దాని ప్రభావం ఎందుకు కొనసాగుతోంది?", en: "Why do the effects persist after colonial rule ended?" },
        answer: {
          te: "సరిహద్దులు, చట్ట వ్యవస్థలు, విద్యా నిర్మాణాలు, ఆర్థిక సంబంధాలు — ఇవన్నీ ఆ కాలంలో ఏర్పడినవి, మరియు స్వాతంత్ర్యంతో వాటంతట అవి మారవు. ఒక సంస్థను నిర్మించడానికి తరాలు పడుతుంది; దాన్ని మార్చడానికి కూడా.",
          en: "Borders, legal systems, educational structures and economic relationships were all set in that period, and independence does not undo them by itself. Institutions take generations to build, and as long to change.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సైక్స్-పికో ఒప్పందం ఏ సంవత్సరం?", en: "In what year was the Sykes-Picot agreement?" },
        options: [
          { te: "1916", en: "1916" },
          { te: "1857", en: "1857" },
          { te: "1924", en: "1924" },
        ],
        answer: 0,
      },
      {
        question: { te: "అలీగఢ్‌ను ఎవరు స్థాపించారు?", en: "Who founded Aligarh?" },
        options: [
          { te: "సర్ సయ్యద్ అహ్మద్ ఖాన్", en: "Sir Sayyid Ahmad Khan" },
          { te: "ముహమ్మద్ అబ్దుహ్", en: "Muhammad Abduh" },
          { te: "అమీర్ అబ్దుల్ ఖాదిర్", en: "Amir Abd al-Qadir" },
        ],
        answer: 0,
      },
      {
        question: { te: "నెపోలియన్ ఈజిప్టుపై ఎప్పుడు దండయాత్ర చేశారు?", en: "When did Napoleon invade Egypt?" },
        options: [
          { te: "1798", en: "1798" },
          { te: "1830", en: "1830" },
          { te: "1757", en: "1757" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "1757 ప్లాసీ · 1798 ఈజిప్ట్ · 1830 అల్జీరియా · 1857 భారత్ · 1916 సైక్స్-పికో · 1924 ఖిలాఫత్.", en: "1757 Plassey, 1798 Egypt, 1830 Algeria, 1857 India, 1916 Sykes-Picot, 1924 the caliphate." },
      { te: "ప్రతిస్పందనలు: ప్రతిఘటన, విద్యా సంస్కరణ, మేధో పునరుజ్జీవనం.", en: "Responses: resistance, educational reform, intellectual revival." },
      { te: "అలీగఢ్, దేవబంద్ — ఒకే సంక్షోభానికి రెండు సమాధానాలు.", en: "Aligarh and Deoband: two answers to one crisis." },
    ],
    summary: {
      te: "పద్దెనిమిదో శతాబ్దం నుండి ముస్లిం ప్రపంచం క్రమంగా వలస పాలనలోకి వెళ్ళింది. నేటి సరిహద్దులు, విద్యా విభజన, చట్ట వ్యవస్థలు అప్పటివే. ముస్లింల ప్రతిస్పందనలు వేర్వేరు — సాయుధ ప్రతిఘటన, విద్యా సంస్కరణ, మేధో పునరుజ్జీవనం.",
      en: "From the eighteenth century the Muslim world came under colonial rule by degrees. Today's borders, educational split and legal systems date from it. Muslim responses varied: armed resistance, educational reform and intellectual revival.",
    },
    apply: {
      te: "ఆచరణ: 'మతపరమైన విద్య', 'ఆధునిక విద్య' విభజన మీ చుట్టూ ఎక్కడ కనిపిస్తుందో గమనించండి.",
      en: "Apply it: notice where the split between religious and modern education shows up around you.",
    },
    reading: [
      { label: "The Ottoman Empire", url: "/knowledge-center/islamic-history/ottoman" },
      { label: "The modern Muslim world", url: "/knowledge-center/islamic-history/modern" },
    ],
  },

  {
    slug: "modern",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 10 — నేటి ముస్లిం ప్రపంచం",
      en: "Level 10 — The Muslim world today",
    },
    intro: {
      te: "నేడు ప్రపంచంలో దాదాపు రెండు వందల కోట్ల ముస్లింలు ఉన్నారు — ప్రతి నలుగురిలో ఒకరు. కానీ మనం ఊహించే ముస్లిం ప్రపంచం, వాస్తవంలో ఉన్నది వేరు.",
      en: "There are close to two billion Muslims in the world today, roughly one person in four. But the Muslim world we picture and the one that exists are not the same.",
    },
    sections: [
      {
        heading: { te: "ముస్లిం ప్రపంచం ఎక్కడ ఉంది", en: "Where the Muslim world actually is" },
        body: {
          te: "చాలామంది 'ముస్లిం ప్రపంచం' అంటే మధ్యప్రాచ్యం అనుకుంటారు. వాస్తవం వేరు: ప్రపంచంలో అత్యధిక ముస్లిం జనాభా ఉన్న దేశం ఇండోనేషియా, తర్వాత పాకిస్తాన్, భారతదేశం, బంగ్లాదేశ్. మొత్తం ముస్లింలలో సుమారు అరవై శాతం ఆసియా-పసిఫిక్ ప్రాంతంలో ఉన్నారు; అరబ్బులు ముస్లింలలో ఇరవై శాతం కంటే తక్కువ. అంటే సగటు ముస్లిం అరబ్ కాదు, మధ్యప్రాచ్యంలో లేరు, మరియు అరబిక్ మాతృభాషగా మాట్లాడరు.",
          en: "Many people equate the Muslim world with the Middle East. The reality is otherwise: the largest Muslim population is Indonesia, then Pakistan, India and Bangladesh. Around sixty per cent of Muslims live in the Asia-Pacific region, and Arabs make up under a fifth of the total. The average Muslim is therefore not an Arab, does not live in the Middle East, and does not speak Arabic as a first language.",
        },
        check: {
          question: { te: "అత్యధిక ముస్లిం జనాభా ఉన్న దేశం ఏది?", en: "Which country has the largest Muslim population?" },
          options: [
            { te: "ఇండోనేషియా", en: "Indonesia" },
            { te: "సౌదీ అరేబియా", en: "Saudi Arabia" },
            { te: "ఈజిప్ట్", en: "Egypt" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "భారతదేశపు ముస్లింలు", en: "Muslims in India" },
        body: {
          te: "భారతదేశంలో సుమారు ఇరవై కోట్ల ముస్లింలు ఉన్నారు — ప్రపంచంలో మూడో అతిపెద్ద ముస్లిం జనాభా, మరియు ఏ ముస్లిమేతర దేశంలోనైనా అతిపెద్దది. ఇక్కడి ముస్లిం సమాజం ఏకశిలా సదృశం కాదు: భాషలు, సంస్కృతులు, ఫిఖ్హ్ సంప్రదాయాలు వేర్వేరు. ఆంధ్రప్రదేశ్, తెలంగాణలోని ముస్లింలు తెలుగు, ఉర్దూ, దఖ్నీ మాట్లాడతారు, మరియు వారి సంప్రదాయాలు కేరళ లేదా కాశ్మీర్ ముస్లింల నుండి భిన్నం. విద్య, ఉపాధి, ప్రాతినిధ్యంలో సవాళ్ళు వాస్తవం, మరియు వాటిని పరిష్కరించడంలో సమాజ సంస్థల పాత్ర కీలకం.",
          en: "India has around two hundred million Muslims: the third largest Muslim population in the world and the largest in any country where Muslims are a minority. That community is not one thing. Languages, cultures and schools of fiqh differ across it. Muslims in Andhra Pradesh and Telangana speak Telugu, Urdu and Dakhni, and their traditions differ from those in Kerala or Kashmir. Challenges in education, employment and representation are real, and community institutions matter in addressing them.",
        },
      },
      {
        heading: { te: "నిజమైన సవాళ్ళు", en: "The real challenges" },
        body: {
          te: "నిజాయితీగా చెప్పాలంటే: విద్యా స్థాయిలు అనేక ముస్లిం సమాజాలలో జాతీయ సగటు కంటే తక్కువ. ఇది ప్రతిభ లోపం కాదు — వనరులు, అవకాశాలు, చారిత్రక కారణాల ఫలితం. ఇతర సవాళ్ళు: అంతర్గత విభజనలు (మజ్‌హబ్, తెగ, భాష ఆధారంగా), కొన్ని చోట్ల మహిళల విద్యపై పరిమితులు, ఆర్థిక అసమానత. ఇవి బయటివారి సమస్యలు కాదు — ఇవి మనం పరిష్కరించవలసినవి. అల్-అందలుస్ పాఠం ఇక్కడ వర్తిస్తుంది: బయటి ఒత్తిడి కంటే అంతర్గత విభజన ఎక్కువ నష్టం చేస్తుంది.",
          en: "Stated honestly: educational attainment in many Muslim communities sits below the national average. That is not a deficit of ability but a result of resources, opportunity and history. Other challenges: internal divisions along school, sect and language lines; restrictions on girls' education in places; economic inequality. These are not other people's problems to solve. The lesson of al-Andalus applies: internal division does more damage than external pressure.",
        },
        check: {
          question: { te: "అల్-అందలుస్ నుండి నేటికి వర్తించే పాఠం ఏమిటి?", en: "What lesson from al-Andalus applies today?" },
          options: [
            { te: "అంతర్గత విభజన బయటి ఒత్తిడి కంటే ఎక్కువ నష్టం చేస్తుంది", en: "Internal division does more damage than external pressure" },
            { te: "సైనిక బలమే ముఖ్యం", en: "Military strength is what matters" },
            { te: "వలస వెళ్ళడమే పరిష్కారం", en: "Migration is the answer" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "చరిత్ర నుండి ఏమి తీసుకోవాలి", en: "What to take from the history" },
        body: {
          te: "ఈ పది పాఠాలలో ఒక నమూనా కనిపిస్తుంది. ముస్లిం నాగరికత జ్ఞానాన్ని విలువైనదిగా భావించినప్పుడు, ఇతరుల నుండి నేర్చుకోవడానికి సిద్ధంగా ఉన్నప్పుడు, అంతర్గతంగా న్యాయంగా ఉన్నప్పుడు — అది వికసించింది. జ్ఞానాన్ని నిర్లక్ష్యం చేసినప్పుడు, విభజనలో పడినప్పుడు, తన సొంత ప్రజలతో అన్యాయంగా ఉన్నప్పుడు — అది క్షీణించింది. ఇది స్వర్ణయుగం గురించి వ్యామోహపడటం గురించి కాదు; అది ఎందుకు జరిగిందో అర్థం చేసుకోవడం గురించి. ఫాతిమా అల్-ఫిహ్రీ ఒక విశ్వవిద్యాలయాన్ని స్థాపించారు. ఇబ్న్ అల్-హైథమ్ ప్రశ్నలు అడిగారు. ఆ పని ఇంకా మిగిలి ఉంది.",
          en: "A pattern runs through these ten lessons. When Muslim civilisation valued knowledge, was willing to learn from others, and was just internally, it flourished. When it neglected learning, fell into division, and was unjust to its own, it declined. This is not about nostalgia for a golden age but about understanding why it happened. Fatima al-Fihri founded a university. Ibn al-Haytham asked questions. That work is still available to be done.",
        },
      },
    ],
    takeaways: [
      { te: "దాదాపు రెండు వందల కోట్ల ముస్లింలు; అత్యధికం ఆసియాలో, ఇండోనేషియా మొదటి స్థానం.", en: "Close to two billion Muslims, most in Asia, with Indonesia first." },
      { te: "భారతదేశంలో సుమారు ఇరవై కోట్లు — మైనారిటీగా ఉన్న అతిపెద్ద ముస్లిం జనాభా.", en: "Around two hundred million in India, the largest Muslim minority anywhere." },
      { te: "జ్ఞానం, న్యాయం, ఐక్యత — చరిత్ర చూపే మూడు కీలకాలు.", en: "Knowledge, justice and unity: the three the history keeps pointing to." },
    ],
    didYouKnow: [
      { te: "అరబ్బులు ప్రపంచ ముస్లింలలో ఇరవై శాతం కంటే తక్కువ.", en: "Arabs make up less than a fifth of the world's Muslims." },
      { te: "భారతదేశంలోని ముస్లిం జనాభా చాలా అరబ్ దేశాల మొత్తం జనాభా కంటే ఎక్కువ.", en: "India's Muslim population is larger than the total population of most Arab countries." },
    ],
    reflect: [
      { te: "ఈ పది పాఠాల్లో మీకు అత్యంత ఆశ్చర్యం కలిగించినది ఏది? అది మీ ఆలోచనను ఎలా మార్చింది?", en: "What surprised you most across these ten lessons, and how did it change your thinking?" },
    ],
    mistakes: [
      { te: "'ముస్లిం ప్రపంచం' అంటే మధ్యప్రాచ్యం అనుకోవడం.", en: "Equating the Muslim world with the Middle East." },
      { te: "గత స్వర్ణయుగంపై వ్యామోహపడి ప్రస్తుత పనిని వాయిదా వేయడం.", en: "Taking refuge in nostalgia for a past golden age instead of doing the present work." },
      { te: "అన్ని సమస్యలకూ బయటివారే కారణమని భావించడం.", en: "Holding outsiders responsible for every problem." },
    ],
    faqs: [
      {
        question: { te: "ముస్లిం సమాజం విద్యలో ఎలా ముందుకు వెళ్ళగలదు?", en: "How can the Muslim community advance in education?" },
        answer: {
          te: "చరిత్ర ఒక సూచన ఇస్తుంది: సంస్థలు. అల్-ఖరవియ్యీన్, బైతుల్ హిక్మా, అలీగఢ్, దేవబంద్ — అన్నీ ఒక వ్యక్తి లేదా సమూహం ఒక సంస్థను స్థాపించడం నుండి మొదలయ్యాయి. వ్యక్తిగత ప్రయత్నం విలువైనది, కానీ తరాల పాటు నిలిచేది సంస్థ. స్థానికంగా ఒక గ్రంథాలయం, ఒక ట్యూషన్ కేంద్రం, ఒక స్కాలర్‌షిప్ నిధి — ఇవి చిన్నగా అనిపించినా అవే మార్గం.",
          en: "History suggests one answer: institutions. Al-Qarawiyyin, the House of Wisdom, Aligarh, Deoband, each began with a person or group founding something. Individual effort is worth a great deal, but what lasts across generations is an institution. Locally a library, a tuition centre, a scholarship fund may look small, and that is the route.",
        },
      },
      {
        question: { te: "నేటి ముస్లింలు చరిత్ర ఎందుకు చదవాలి?", en: "Why should Muslims today study this history?" },
        answer: {
          te: "రెండు కారణాలు. ఒకటి: మీరు ఏమిటో తెలుసుకోవడానికి — మీ సమాజం జ్ఞానంలో ప్రపంచానికి నాయకత్వం వహించిన కాలం ఉంది, మరియు అది మళ్ళీ సాధ్యమే. రెండు: పొరపాట్లను గుర్తించడానికి — అంతర్గత విభజన, అసమానత, జ్ఞాన నిర్లక్ష్యం ఎప్పుడూ ఒకే ఫలితాన్ని ఇచ్చాయి. చరిత్ర గర్వం కోసం కాదు, దిశ కోసం.",
          en: "Two reasons. To know what you belong to: your community once led the world in learning, and that is not beyond reach again. And to recognise the failures: internal division, inequality and neglect of knowledge produced the same result every time. History is for direction rather than for pride.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ప్రపంచ ముస్లింలలో ఎంత శాతం ఆసియా-పసిఫిక్‌లో ఉన్నారు?", en: "What share of the world's Muslims live in the Asia-Pacific?" },
        options: [
          { te: "సుమారు అరవై శాతం", en: "About sixty per cent" },
          { te: "సుమారు పది శాతం", en: "About ten per cent" },
          { te: "సుమారు తొంభై శాతం", en: "About ninety per cent" },
        ],
        answer: 0,
      },
      {
        question: { te: "భారతదేశపు ముస్లిం జనాభా ప్రపంచంలో ఎన్నవ స్థానం?", en: "Where does India's Muslim population rank in the world?" },
        options: [
          { te: "మూడవది", en: "Third" },
          { te: "మొదటిది", en: "First" },
          { te: "పదవది", en: "Tenth" },
        ],
        answer: 0,
      },
      {
        question: { te: "చరిత్ర నుండి తీసుకోవలసిన మూడు కీలకాలు ఏవి?", en: "What three things does the history keep pointing to?" },
        options: [
          { te: "జ్ఞానం, న్యాయం, ఐక్యత", en: "Knowledge, justice and unity" },
          { te: "సంపద, సైన్యం, భూమి", en: "Wealth, armies and land" },
          { te: "వాణిజ్యం, వలస, విస్తరణ", en: "Trade, migration and expansion" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఇండోనేషియా · పాకిస్తాన్ · భారత్ · బంగ్లాదేశ్ — అతిపెద్ద నాలుగు.", en: "Indonesia, Pakistan, India, Bangladesh: the largest four." },
      { te: "అరబ్బులు ముస్లింలలో ఇరవై శాతం కంటే తక్కువ.", en: "Arabs are under a fifth of Muslims." },
      { te: "వికాసానికి: జ్ఞానం, న్యాయం, ఐక్యత. క్షీణతకు: వాటి లోపం.", en: "Flourishing: knowledge, justice, unity. Decline: their absence." },
    ],
    summary: {
      te: "నేటి ముస్లిం ప్రపంచం ఎక్కువగా ఆసియాలో ఉంది, మధ్యప్రాచ్యంలో కాదు; భారతదేశంలో సుమారు ఇరవై కోట్లు. సవాళ్ళు వాస్తవం — విద్య, అంతర్గత విభజన. చరిత్ర ఒకే నమూనాను చూపుతుంది: జ్ఞానం, న్యాయం, ఐక్యత ఉన్నప్పుడు వికాసం; లేనప్పుడు క్షీణత.",
      en: "The Muslim world today is mostly in Asia rather than the Middle East, with around two hundred million in India. The challenges are real, in education and in internal division. The history shows one pattern: knowledge, justice and unity bring flourishing, and their absence brings decline.",
    },
    apply: {
      te: "ఆచరణ: మీ ప్రాంతంలో విద్యకు సహాయపడే ఒక పని — ట్యూషన్, పుస్తకాలు, ప్రోత్సాహం — ఈ నెలలో చేయండి.",
      en: "Apply it: do one thing for education in your area this month, whether tutoring, books or encouragement.",
    },
    reading: [
      { label: "The Colonial Era", url: "/knowledge-center/islamic-history/colonial" },
      { label: "Islamic History portal", url: "/knowledge-center/islamic-history" },
    ],
  },
];
