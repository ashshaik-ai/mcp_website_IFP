/* Islamic History — replacements for the ten extracted lessons.

   The extracted versions had two sections each and a median of 95 English
   words, which is a caption rather than a lesson. Same slugs, so
   all-lessons.ts substitutes them in place.

   Dates are given as commonly accepted; where historians differ or a figure is
   disputed, the lesson says so rather than presenting one number as settled. */
import type { Lesson } from "../lessons.ts";

export const historyLessons: Lesson[] = [
  {
    slug: "prearabia",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 1 — ఇస్లాంకు ముందటి అరేబియా",
      en: "Level 1 — Arabia before Islam",
    },
    intro: {
      te: "ఇస్లాం ఏ శూన్యంలోనూ రాలేదు. అది ఒక నిర్దిష్ట సమాజంలోకి వచ్చింది — గోత్రాలుగా విడిపోయిన, రాజ్యం లేని, కానీ గర్వం, కవిత్వం, వాణిజ్యం నిండిన అరేబియా. ఆ ప్రపంచాన్ని అర్థం చేసుకోకుండా ఇస్లాం తెచ్చిన మార్పు ఎంత గొప్పదో తెలియదు.",
      en: "Islam did not arrive into a vacuum. It arrived into a particular society: an Arabia divided into tribes, with no state, but full of pride, poetry and trade. Without understanding that world you cannot see how large a change Islam was.",
    },
    sections: [
      {
        heading: { te: "రాజ్యం లేని భూమి", en: "A land without a state" },
        body: {
          te: "ఆరవ శతాబ్దపు అరేబియాలో రాజు లేడు, సైన్యం లేదు, న్యాయస్థానాలు లేవు. ఉన్నది గోత్రం మాత్రమే. ఒక వ్యక్తి భద్రత పూర్తిగా అతని గోత్రంపైనే ఆధారపడేది — గోత్రం లేని వ్యక్తికి రక్షణ లేదు. దీనివల్ల న్యాయం 'ఎవరు సరైనవారు' అనేదానిపై కాక 'ఎవరు బలవంతులు' అనేదానిపై ఆధారపడేది. తరతరాలుగా కొనసాగిన రక్త వైరాలు సాధారణం. ఉత్తరాన బైజాంటైన్, తూర్పున పర్షియన్ సామ్రాజ్యాలు ఉండేవి, కానీ ఎడారి లోపలికి అవి చొరబడలేదు.",
          en: "Sixth-century Arabia had no king, no army and no courts. It had the tribe. A person's safety rested entirely on their tribe, and someone without one had no protection at all. Justice therefore turned on who was strong rather than who was right, and blood feuds ran across generations. The Byzantine empire lay to the north and the Persian to the east, but neither reached far into the desert.",
        },
        check: {
          question: { te: "ఇస్లాంకు ముందు అరేబియాలో ఒక వ్యక్తి భద్రత దేనిపై ఆధారపడేది?", en: "Before Islam, what did a person's safety in Arabia rest on?" },
          options: [
            { te: "అతని గోత్రంపై", en: "Their tribe" },
            { te: "రాజుపై", en: "The king" },
            { te: "న్యాయస్థానాలపై", en: "The courts" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మక్కా — వాణిజ్యం, కాబా", en: "Makkah, trade and the Kaaba" },
        body: {
          te: "మక్కా ఎడారి మధ్యలో ఉన్నా ముఖ్యమైనది, ఎందుకంటే అక్కడ కాబా ఉంది. ఇబ్రాహీమ్ (అ) మరియు ఇస్మాయీల్ (అ) నిర్మించిన ఆ గృహం ఏకైక దైవారాధన కోసం. కానీ శతాబ్దాల తరబడి అది విగ్రహాలతో నిండిపోయింది — సంప్రదాయం మూడు వందల అరవై విగ్రహాలు ఉండేవని చెబుతుంది. యాత్రికులు వచ్చేవారు కాబట్టి మక్కా వాణిజ్య కేంద్రంగా మారింది. ఖురైష్ గోత్రం కాబా సంరక్షకులుగా ఉండేది, మరియు శీతాకాలంలో యెమెన్‌కు, వేసవిలో సిరియాకు వాణిజ్య కారవాన్‌లు నడిపేది.",
          en: "Makkah mattered despite sitting in the desert, because the Kaaba was there: the house built by Ibrahim and Ismail for the worship of one God. Over the centuries it had filled with idols, and tradition puts the number at three hundred and sixty. Pilgrims came, and so Makkah became a centre of trade. The Quraysh were the custodians of the Kaaba and ran the caravans, south to Yemen in winter and north to Syria in summer.",
        },
        check: {
          question: { te: "కాబాను ఎవరు నిర్మించారు?", en: "Who built the Kaaba?" },
          options: [
            { te: "ఇబ్రాహీమ్ (అ) మరియు ఇస్మాయీల్ (అ)", en: "Ibrahim and Ismail" },
            { te: "ఖురైష్ గోత్రం", en: "The Quraysh" },
            { te: "బైజాంటైన్లు", en: "The Byzantines" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "జాహిలియ్యా — దాని నిజమైన అర్థం", en: "Jahiliyyah, and what it really means" },
        body: {
          te: "ఆ కాలాన్ని 'జాహిలియ్యా' అంటారు. దీన్ని తరచూ 'అజ్ఞాన యుగం' అని అనువదిస్తారు, కానీ అది సరిపోదు. ఆ అరబ్బులు అజ్ఞానులు కారు — వారి కవిత్వం, భాషా నైపుణ్యం, వంశావళి జ్ఞాపకశక్తి అసాధారణం. 'జహ్ల్' అనే పదం 'హిల్మ్' (సహనం, ఆత్మనిగ్రహం) కు వ్యతిరేకం. అంటే జాహిలియ్యా అంటే జ్ఞానం లేకపోవడం కాదు, ఆత్మనిగ్రహం లేకపోవడం — అహంకారం, ఆవేశం, ప్రతీకారం. ఇస్లాం ఎదుర్కొన్నది ఇదే.",
          en: "That era is called the jahiliyyah, usually translated as the age of ignorance, which does not quite fit. Those Arabs were not ignorant; their poetry, command of language and memory for genealogy were remarkable. The word jahl is the opposite of hilm, forbearance and self-restraint. So jahiliyyah means not an absence of knowledge but an absence of restraint: pride, hot temper and vengeance. That is what Islam confronted.",
        },
      },
      {
        heading: { te: "స్త్రీలు, బానిసలు, బలహీనులు", en: "Women, slaves and the weak" },
        body: {
          te: "ఆ సమాజంలో స్త్రీకి వారసత్వ హక్కు లేదు; కొన్ని గోత్రాల్లో ఆమె స్వయంగా వారసత్వ ఆస్తిగా పరిగణించబడేది. ఆడపిల్లలను సజీవంగా పాతిపెట్టే ఆచారం కొన్ని చోట్ల ఉండేది — ఖురాన్ దీన్ని నేరుగా ఖండిస్తుంది: 'సజీవంగా పాతిపెట్టబడిన ఆడపిల్లను ఏ పాపానికి చంపారని అడిగినప్పుడు' (అత్-తక్వీర్ 81:8-9). బానిసత్వం విస్తృతం, వడ్డీ వ్యాపారం సాధారణం, పేదవారికి ఆశ్రయం లేదు. ఇస్లాం మొదట మార్చినవి ఇవే — విశ్వాసం తర్వాత వెంటనే.",
          en: "In that society a woman had no right of inheritance, and in some tribes was herself treated as part of an inheritance. The burial of infant girls was practised in places, and the Quran confronts it directly: 'when the girl buried alive is asked for what sin she was killed' (At-Takwir 81:8-9). Slavery was widespread, usury normal, and the poor had no recourse. These were among the first things Islam changed, immediately after belief itself.",
        },
      },
      {
        heading: { te: "ఏకదైవారాధన పూర్తిగా పోలేదు", en: "Monotheism had not vanished" },
        body: {
          te: "అరేబియా మొత్తం విగ్రహారాధనలో మునిగిపోలేదు. యెమెన్, నజ్రాన్‌లలో క్రైస్తవులు, యథ్రిబ్ (తర్వాత మదీనా) లో బలమైన యూదు సమాజాలు ఉండేవి. మరియు 'హునఫా' అనే కొందరు — ఇబ్రాహీమ్ (అ) మార్గాన్ని అనుసరిస్తూ విగ్రహాలను తిరస్కరించినవారు — ఉండేవారు. వరఖా బిన్ నౌఫల్, జైద్ బిన్ అమ్ర్ వీరిలో ప్రసిద్ధులు. అంటే మక్కాలో కూడా 'ఇది తప్పు' అని భావించినవారు ఉన్నారు; ఇస్లాం సందేశం పూర్తిగా అపరిచితం కాదు.",
          en: "Arabia was not uniformly idolatrous. There were Christians in Yemen and Najran and strong Jewish communities in Yathrib, later Madinah. And there were the hunafa, individuals who followed the way of Ibrahim and rejected the idols, of whom Waraqah ibn Nawfal and Zayd ibn Amr are the best known. So even in Makkah there were people who already felt this was wrong, and the message of Islam was not wholly unfamiliar.",
        },
      },
    ],
    takeaways: [
      { te: "అరేబియాకు రాజ్యం లేదు; గోత్రమే భద్రత, న్యాయం.", en: "Arabia had no state; the tribe supplied both safety and justice." },
      { te: "'జాహిలియ్యా' అంటే అజ్ఞానం కాదు — ఆత్మనిగ్రహం లేకపోవడం.", en: "Jahiliyyah means not ignorance but the absence of restraint." },
      { te: "స్త్రీలకు వారసత్వం లేదు; ఇస్లాం మార్చిన మొదటి విషయాల్లో ఇది ఒకటి.", en: "Women had no inheritance, and that was among the first things Islam changed." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ జన్మించిన సంవత్సరాన్ని 'ఏనుగుల సంవత్సరం' అంటారు — అబ్రహా ఏనుగుల సైన్యంతో కాబాను ధ్వంసం చేయడానికి వచ్చి విఫలమైన సంవత్సరం.", en: "The year of the Prophet's birth is called the Year of the Elephant, after Abraha's failed march on the Kaaba with elephants." },
      { te: "ఇస్లాంకు ముందు అరబ్బులు అత్యుత్తమ కవితలను కాబా గోడలపై వేలాడదీసేవారని చెబుతారు — వాటిని 'ముఅల్లఖాత్' (వేలాడదీయబడినవి) అంటారు.", en: "The finest pre-Islamic poems were said to be hung on the Kaaba, which is why they are called the Mu'allaqat, the hanging ones." },
    ],
    reflect: [
      { te: "'జాహిలియ్యా' అంటే ఆత్మనిగ్రహం లేకపోవడం అయితే, ఆ లక్షణం నేటి సమాజంలో ఎక్కడ కనిపిస్తుంది?", en: "If jahiliyyah is the absence of restraint, where do you see that quality in society today?" },
    ],
    mistakes: [
      { te: "ఇస్లాంకు ముందటి అరబ్బులను మూర్ఖులుగా చిత్రించడం — వారి భాషా, కవితా నైపుణ్యం అసాధారణం.", en: "Painting pre-Islamic Arabs as simpletons, when their command of language and poetry was remarkable." },
      { te: "అరేబియా మొత్తం విగ్రహారాధనలో ఉండేదని అనుకోవడం — క్రైస్తవులు, యూదులు, హునఫా ఉన్నారు.", en: "Assuming all of Arabia was idolatrous, when there were Christians, Jews and the hunafa." },
    ],
    faqs: [
      {
        question: { te: "కాబా ఇబ్రాహీమ్ (అ) నిర్మించినదైతే విగ్రహాలు ఎలా వచ్చాయి?", en: "If Ibrahim built the Kaaba, how did the idols get there?" },
        answer: {
          te: "శతాబ్దాల తరబడి క్రమంగా. సంప్రదాయం ప్రకారం అమ్ర్ బిన్ లుహయ్ అనే వ్యక్తి సిరియా నుండి మొదటి విగ్రహాన్ని తెచ్చాడు, తర్వాత ప్రతి గోత్రం తన సొంత విగ్రహాన్ని చేర్చింది. ఏకదైవారాధన నుండి విగ్రహారాధనకు మార్పు ఒక్కసారిగా కాదు, తరతరాలుగా జరిగింది.",
          en: "Gradually, over centuries. Tradition holds that Amr ibn Luhayy brought the first idol from Syria, after which each tribe added its own. The drift from monotheism to idolatry happened across generations rather than at once.",
        },
      },
      {
        question: { te: "ఆడపిల్లలను పాతిపెట్టడం అందరూ చేసేవారా?", en: "Was the burial of infant girls universal?" },
        answer: {
          te: "కాదు — ఇది అన్ని గోత్రాల్లో, అన్ని కుటుంబాల్లో లేదు. కానీ అది ఉనికిలో ఉండేది, ఖురాన్ దాన్ని ప్రత్యేకంగా ఖండించేంతగా. ఒక ఆచారం అరుదైనదైనా, దాన్ని అనుమతించే సమాజం గురించి అది చాలా చెబుతుంది.",
          en: "No; it was not practised by every tribe or family. But it existed, and pointedly enough for the Quran to condemn it by name. Even where a practice is rare, a society that permits it is telling you something about itself.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'జాహిలియ్యా' అనే పదం దేనికి వ్యతిరేకం?", en: "The word jahiliyyah is the opposite of what?" },
        options: [
          { te: "హిల్మ్ — సహనం, ఆత్మనిగ్రహం", en: "Hilm, forbearance and restraint" },
          { te: "ఇల్మ్ — జ్ఞానం మాత్రమే", en: "Ilm, knowledge alone" },
          { te: "అమల్ — ఆచరణ", en: "Amal, action" },
        ],
        answer: 0,
      },
      {
        question: { te: "మక్కాలో కాబా సంరక్షకులు ఎవరు?", en: "Who were the custodians of the Kaaba in Makkah?" },
        options: [
          { te: "ఖురైష్", en: "The Quraysh" },
          { te: "బనూ ఇస్రాయీల్", en: "The Banu Israil" },
          { te: "బైజాంటైన్లు", en: "The Byzantines" },
        ],
        answer: 0,
      },
      {
        question: { te: "'హునఫా' ఎవరు?", en: "Who were the hunafa?" },
        options: [
          { te: "విగ్రహాలను తిరస్కరించి ఇబ్రాహీమ్ (అ) మార్గాన్ని అనుసరించినవారు", en: "Those who rejected idols and followed the way of Ibrahim" },
          { te: "ఖురైష్ నాయకులు", en: "The leaders of Quraysh" },
          { te: "కవులు", en: "The poets" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "రాజ్యం లేదు; గోత్రమే అన్నీ.", en: "No state; the tribe was everything." },
      { te: "కాబా ఇబ్రాహీమ్ (అ) నిర్మించినది; తర్వాత విగ్రహాలతో నిండింది.", en: "Ibrahim built the Kaaba; idols filled it later." },
      { te: "జాహిలియ్యా = ఆత్మనిగ్రహ లోపం, అజ్ఞానం కాదు.", en: "Jahiliyyah is a lack of restraint, not of knowledge." },
    ],
    summary: {
      te: "ఆరవ శతాబ్దపు అరేబియా రాజ్యం లేని, గోత్రాలపై ఆధారపడిన సమాజం. మక్కా కాబా వల్ల వాణిజ్య, యాత్రా కేంద్రం. 'జాహిలియ్యా' అంటే ఆత్మనిగ్రహ లోపం. స్త్రీలకు, బలహీనులకు హక్కులు లేవు — ఇస్లాం మార్చిన మొదటివి ఇవే.",
      en: "Sixth-century Arabia was a society without a state, resting on the tribe. Makkah was a centre of trade and pilgrimage because of the Kaaba. Jahiliyyah names a lack of restraint. Women and the weak had no rights, and those were the first things Islam changed.",
    },
    apply: {
      te: "ఆచరణ: గోత్రం స్థానంలో ఇస్లాం ఏమి పెట్టిందో ఒక వాక్యంలో రాయండి.",
      en: "Apply it: write one sentence on what Islam put in the place of the tribe.",
    },
    reading: [
      { label: "Islamic History portal", url: "/knowledge-center/islamic-history" },
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
    ],
  },

  {
    slug: "prophet",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 2 — ప్రవక్త ﷺ జీవితం: ఇరవై మూడు సంవత్సరాలు",
      en: "Level 2 — The Prophet ﷺ: twenty-three years",
    },
    intro: {
      te: "ఇరవై మూడు సంవత్సరాలు — ఒక మనిషి జీవితంలో చిన్న భాగం. ఆ కాలంలో అరేబియా గోత్రాల నుండి ఒక సమాజంగా, విగ్రహారాధన నుండి ఏకదైవారాధనగా మారింది. ఈ పాఠం ఆ కాలరేఖను వరుసగా చూపుతుంది.",
      en: "Twenty-three years, a small part of one man's life. In that time Arabia went from tribes to a community and from idols to the worship of one God. This lesson lays out that timeline in order.",
    },
    sections: [
      {
        heading: { te: "వహీకి ముందు నలభై సంవత్సరాలు", en: "Forty years before the revelation" },
        body: {
          te: "570లో మక్కాలో జననం. తండ్రి అబ్దుల్లాహ్ పుట్టుకకు ముందే మరణించారు; తల్లి ఆమినా ఆరేళ్ళప్పుడు; తాత అబ్దుల్-ముత్తలిబ్ ఎనిమిదేళ్ళప్పుడు. తర్వాత మామ అబూ తాలిబ్ సంరక్షణ. యువకుడిగా వాణిజ్యంలో పనిచేశారు, మరియు మక్కా అంతా ఆయనను 'అల్-అమీన్' — విశ్వసనీయుడు — అని పిలిచేది. ఇరవై ఐదవ ఏట ఖదీజా (ర/అ)ను వివాహం చేసుకున్నారు. ఈ నలభై సంవత్సరాలు ముఖ్యం: ఆయన నిజాయితీ గురించి ఎవరికీ సందేహం లేదు, మరియు ఆయన ఎప్పుడూ ఏదీ బోధించలేదు.",
          en: "Born in Makkah in 570. His father Abdullah died before his birth, his mother Aminah when he was six, his grandfather Abd al-Muttalib when he was eight, after which his uncle Abu Talib raised him. As a young man he worked in trade, and all Makkah called him al-Ameen, the trustworthy. At twenty-five he married Khadijah (RA). These forty years matter: no one doubted his honesty, and he had never preached anything.",
        },
        check: {
          question: { te: "మక్కావాసులు ప్రవక్త ﷺ ను ఏమని పిలిచేవారు?", en: "What did the people of Makkah call the Prophet ﷺ?" },
          options: [
            { te: "అల్-అమీన్ — విశ్వసనీయుడు", en: "Al-Ameen, the trustworthy" },
            { te: "అల్-మలిక్ — రాజు", en: "Al-Malik, the king" },
            { te: "అల్-ఆలిమ్ — పండితుడు", en: "Al-Alim, the scholar" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మక్కా కాలం — పదమూడు సంవత్సరాల ఓర్పు", en: "The Makkan years: thirteen years of patience" },
        body: {
          te: "610లో హిరా గుహలో మొదటి వహీ — 'ఇఖ్రా' (చదువు). మూడేళ్ళు రహస్య దావత్, తర్వాత బహిరంగం. ప్రతిస్పందన హింస: బిలాల్ (ర/అ)ను ఎండలో రాళ్ళ కింద పడేశారు, సుమయ్యా (ర/అ) ఇస్లాం మొదటి అమరవీరురాలయ్యారు. 615లో కొందరు అబిసీనియాకు వలస వెళ్ళారు. 617-619లో బనూ హాషిం గోత్రంపై మూడేళ్ళ పూర్తి బహిష్కరణ. 619లో ఖదీజా (ర/అ), అబూ తాలిబ్ ఇద్దరూ మరణించారు — దాన్ని 'దుఃఖ సంవత్సరం' అంటారు. ఈ పదమూడేళ్ళలో ఒక్క యుద్ధం లేదు; ఉన్నది ఓర్పు మాత్రమే.",
          en: "In 610 came the first revelation in the cave of Hira: iqra, read. Three years of quiet invitation, then open preaching. The response was persecution: Bilal (RA) was pinned under rocks in the sun and Sumayyah (RA) became Islam's first martyr. In 615 a group migrated to Abyssinia. From 617 to 619 the Banu Hashim endured a total boycott. In 619 both Khadijah (RA) and Abu Talib died, in what is called the Year of Sorrow. In these thirteen years there was not one battle, only endurance.",
        },
        check: {
          question: { te: "మక్కా కాలంలో ఎన్ని యుద్ధాలు జరిగాయి?", en: "How many battles took place during the Makkan period?" },
          options: [
            { te: "ఒక్కటీ లేదు", en: "None" },
            { te: "మూడు", en: "Three" },
            { te: "ఏడు", en: "Seven" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "622 — హిజ్రత్, మలుపు", en: "622, the Hijrah and the turn" },
        body: {
          te: "యథ్రిబ్ నుండి వచ్చిన ప్రతినిధులు ప్రవక్త ﷺ ను ఆహ్వానించారు. 622లో ముస్లింలు అక్కడికి వలస వెళ్ళారు; నగరం 'మదీనతున్ నబీ' — ప్రవక్త నగరం — అయింది. ఇక్కడే ఇస్లాం సమాజం రూపుదిద్దుకుంది: మస్జిద్ నిర్మాణం, ముహాజిర్-అన్సార్ సోదరత్వం (వలస వచ్చినవారికి, స్థానికులకు జతలు కట్టడం), మరియు మదీనా ఒడంబడిక — ముస్లింలు, యూదులు, ఇతరుల హక్కులు, బాధ్యతలు నిర్వచించిన లిఖిత పత్రం. ఇస్లామిక్ క్యాలెండర్ ఈ సంఘటన నుండే లెక్కిస్తుంది.",
          en: "Delegations from Yathrib invited the Prophet ﷺ, and in 622 the Muslims migrated there. The city became Madinat an-Nabi, the city of the Prophet. Here the community took shape: the mosque was built, the Muhajirun and Ansar were paired as brothers, and the Constitution of Madinah set out in writing the rights and duties of Muslims, Jews and others. The Islamic calendar counts from this event.",
        },
      },
      {
        heading: { te: "మదీనా కాలం — సమాజం, పరీక్షలు", en: "The Madinan years: community and trial" },
        body: {
          te: "624 బద్ర్: మూడు వందల మంది ముస్లింలు వెయ్యి మందిపై విజయం. 625 ఉహుద్: విలుకాళ్ళు స్థానం విడిచిపెట్టడం వల్ల నష్టం — క్రమశిక్షణ పాఠం. 627 ఖందఖ్: సల్మాన్ ఫారిసీ (ర/అ) సూచనతో కందకం తవ్వి మదీనాను కాపాడారు. 628 హుదైబియా: పైకి ప్రతికూలంగా కనిపించిన సంధి, కానీ ఖురాన్ దాన్ని 'స్పష్టమైన విజయం' అంది — శాంతి కాలంలో ఇస్లాం వేగంగా వ్యాపించింది. 630 మక్కా విజయం: పది వేల మందితో శాంతియుత ప్రవేశం, సాధారణ క్షమాభిక్ష.",
          en: "624, Badr: three hundred Muslims prevailed over a thousand. 625, Uhud: a loss caused by archers leaving their position, and a lesson in discipline. 627, Khandaq: a trench dug on the advice of Salman al-Farisi (RA) saved Madinah. 628, Hudaybiyyah: a treaty that looked like a setback, which the Quran called a clear victory, because Islam spread quickly in the peace that followed. 630, the conquest of Makkah: a peaceful entry with ten thousand, and a general amnesty.",
        },
      },
      {
        heading: { te: "632 — వీడ్కోలు, ముగింపు", en: "632, the farewell and the end" },
        body: {
          te: "632లో వీడ్కోలు హజ్. అరఫాత్‌లో లక్షకుపైగా సహచరుల ముందు చివరి ఖుత్బా: 'అరబ్‌కు అరబ్బేతరుడిపై ఆధిక్యత లేదు, తెల్లవాడికి నల్లవాడిపై లేదు — తఖ్వా తప్ప'. స్త్రీల హక్కులు, వడ్డీ రద్దు, రక్త వైరాల ముగింపు ప్రకటించారు. కొన్ని నెలల తర్వాత మదీనాలో మరణించారు. ఆయన వదిలివెళ్ళినది సంపద కాదు, సైన్యం కాదు — ఖురాన్, సున్నత్, మరియు ఒక సమాజం.",
          en: "In 632 came the farewell Hajj. At Arafat, before over a hundred thousand companions, the final sermon: no Arab has superiority over a non-Arab, nor a white man over a black man, except by taqwa. He declared the rights of women, cancelled usury and ended the blood feuds. He died in Madinah months later, leaving neither wealth nor an army, but the Quran, the Sunnah and a community.",
        },
      },
    ],
    takeaways: [
      { te: "610 మొదటి వహీ · 622 హిజ్రత్ · 630 మక్కా విజయం · 632 వీడ్కోలు.", en: "610 first revelation, 622 Hijrah, 630 conquest of Makkah, 632 farewell." },
      { te: "మక్కా పదమూడేళ్ళలో ఒక్క యుద్ధమూ లేదు — ఓర్పు మాత్రమే.", en: "In thirteen Makkan years there was no battle at all, only patience." },
      { te: "వీడ్కోలు ఖుత్బా: తఖ్వా తప్ప ఎవరికీ ఆధిక్యత లేదు.", en: "The farewell sermon: no superiority except by taqwa." },
    ],
    didYouKnow: [
      { te: "బద్ర్ యుద్ధంలో పట్టుబడిన కొందరు ఖైదీలు పది మంది ముస్లింలకు చదవడం నేర్పితే విడుదల చేయబడ్డారు — విద్యను విమోచన మూల్యంగా తీసుకున్న అరుదైన ఉదాహరణ.", en: "Some prisoners taken at Badr were freed on condition they taught ten Muslims to read, a rare case of literacy as a ransom." },
      { te: "మదీనా ఒడంబడికను చాలామంది చరిత్రకారులు ప్రపంచపు తొలి లిఖిత రాజ్యాంగాలలో ఒకటిగా భావిస్తారు.", en: "Many historians regard the Constitution of Madinah as among the earliest written constitutions." },
    ],
    reflect: [
      { te: "పదమూడేళ్ళ హింసను ఓర్పుతో ఎదుర్కొన్న తర్వాత, విజయం వచ్చినప్పుడు ఆయన క్షమించారు. ఇది మీకు ఏమి చెబుతుంది?", en: "After thirteen years of persecution met with patience, he forgave when victory came. What does that say to you?" },
    ],
    mistakes: [
      { te: "ఇస్లాం చరిత్రను యుద్ధాల జాబితాగా చూడటం — పదమూడేళ్ళు యుద్ధమే లేదు.", en: "Reading Islamic history as a list of battles, when thirteen years had none." },
      { te: "హిజ్రత్‌ను పలాయనంగా భావించడం — అది ప్రణాళికాబద్ధమైన, ఆహ్వానంపై జరిగిన వలస.", en: "Treating the Hijrah as flight, when it was a planned migration on invitation." },
    ],
    faqs: [
      {
        question: { te: "హుదైబియా సంధి ఎందుకు విజయం?", en: "Why was Hudaybiyyah a victory?" },
        answer: {
          te: "షరతులు అన్యాయంగా కనిపించాయి, చాలామంది సహచరులు కలత చెందారు. కానీ అది పదేళ్ళ శాంతిని ఇచ్చింది, మరియు ఆ శాంతిలో ప్రజలు ఇస్లాం గురించి స్వేచ్ఛగా తెలుసుకోగలిగారు. ఆ రెండేళ్ళలో అంతకు ముందు పంతొమ్మిదేళ్ళ కంటే ఎక్కువమంది ఇస్లాం స్వీకరించారు.",
          en: "The terms looked unfair and many companions were distressed. But it brought ten years of peace, and in that peace people could learn about Islam freely. More entered Islam in the following two years than in the previous nineteen.",
        },
      },
      {
        question: { te: "మక్కా విజయంలో ఎంతమంది చనిపోయారు?", en: "How many died in the conquest of Makkah?" },
        answer: {
          te: "దాదాపు ఎవరూ లేరు. పది వేల మంది సైన్యం నగరంలోకి ప్రవేశించినా ప్రతిఘటన దాదాపు లేదు, మరియు ప్రవక్త ﷺ సాధారణ క్షమాభిక్ష ప్రకటించారు — తనను ఏళ్ళ తరబడి హింసించినవారితో సహా.",
          en: "Almost no one. Ten thousand entered the city against nearly no resistance, and the Prophet ﷺ declared a general amnesty, including for those who had persecuted him for years.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "మొదటి వహీ ఎప్పుడు?", en: "When did the first revelation come?" },
        options: [
          { te: "610 CE", en: "610 CE" },
          { te: "570 CE", en: "570 CE" },
          { te: "622 CE", en: "622 CE" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖందఖ్ యుద్ధంలో కందకం ఎవరి సూచన?", en: "Whose suggestion was the trench at Khandaq?" },
        options: [
          { te: "సల్మాన్ ఫారిసీ (ర/అ)", en: "Salman al-Farisi (RA)" },
          { te: "అబూ బక్ర్ (ర/అ)", en: "Abu Bakr (RA)" },
          { te: "ఖాలిద్ బిన్ వలీద్ (ర/అ)", en: "Khalid ibn al-Walid (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "వీడ్కోలు ఖుత్బా ప్రకారం ఆధిక్యతకు ఏకైక ప్రమాణం ఏమిటి?", en: "By the farewell sermon, what is the only measure of superiority?" },
        options: [
          { te: "తఖ్వా", en: "Taqwa" },
          { te: "వంశం", en: "Lineage" },
          { te: "సంపద", en: "Wealth" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "570 జననం · 610 వహీ · 622 హిజ్రత్ · 630 మక్కా · 632 మరణం.", en: "570 birth, 610 revelation, 622 Hijrah, 630 Makkah, 632 death." },
      { te: "బద్ర్ 624 · ఉహుద్ 625 · ఖందఖ్ 627 · హుదైబియా 628.", en: "Badr 624, Uhud 625, Khandaq 627, Hudaybiyyah 628." },
      { te: "మదీనా ఒడంబడిక: ముస్లింలు, యూదులు, ఇతరుల హక్కులు.", en: "The Constitution of Madinah set rights for Muslims, Jews and others." },
    ],
    summary: {
      te: "ఇరవై మూడేళ్ళలో: పదమూడేళ్ళ మక్కా ఓర్పు, హిజ్రత్ తర్వాత పదేళ్ళ సమాజ నిర్మాణం. బద్ర్, ఉహుద్, ఖందఖ్ పరీక్షలు; హుదైబియా శాంతి; మక్కా విజయంలో క్షమాభిక్ష; వీడ్కోలు ఖుత్బాలో సమానత్వ ప్రకటన.",
      en: "Twenty-three years: thirteen of patience in Makkah, then ten of building a community after the Hijrah. Badr, Uhud and Khandaq were the trials, Hudaybiyyah the peace, the conquest of Makkah an amnesty, and the farewell sermon a declaration of equality.",
    },
    apply: {
      te: "ఆచరణ: ఐదు ప్రధాన తేదీలను చూడకుండా వరుసగా రాయగలిగే వరకు సాధన చేయండి.",
      en: "Apply it: practise writing the five key dates in order without looking.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "The Rashidun Caliphate", url: "/knowledge-center/islamic-history/rashidun" },
    ],
  },

  {
    slug: "rashidun",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 3 — రాషిదూన్ ఖిలాఫత్",
      en: "Level 3 — The Rashidun Caliphate",
    },
    intro: {
      te: "ప్రవక్త ﷺ మరణం తర్వాత ముప్ఫై సంవత్సరాలు (632-661) నలుగురు ఖలీఫాల పాలన. వీరిని 'రాషిదూన్' — సన్మార్గంలో నడిచినవారు — అంటారు. ఈ కాలంలో ఖురాన్ ఒకే పాఠంగా స్థిరపడింది, రాజ్య పరిపాలన రూపుదిద్దుకుంది, మరియు మొదటి అంతర్యుద్ధం కూడా జరిగింది.",
      en: "The thirty years after the Prophet's death, 632 to 661, under four caliphs called the Rashidun, the rightly guided. In this period the Quran was fixed as one text, the machinery of a state took shape, and the first civil war also happened.",
    },
    sections: [
      {
        heading: { te: "అబూ బక్ర్ (ర/అ) — రెండు సంవత్సరాలు", en: "Abu Bakr (RA), two years" },
        body: {
          te: "632-634. ఆయన ఎదుర్కొన్న మొదటి సంక్షోభం: ప్రవక్త ﷺ మరణం తర్వాత కొన్ని గోత్రాలు జకాత్ ఇవ్వడం ఆపేశాయి, కొందరు ప్రవక్తలమని ప్రకటించుకున్నారు. 'రిద్దా యుద్ధాలు' ద్వారా ఆయన అరేబియా ఐక్యతను నిలబెట్టారు. రెండో కీలక పని: యమామా యుద్ధంలో చాలామంది హాఫిజ్‌లు మరణించడంతో ఉమర్ (ర/అ) సూచన మేరకు ఖురాన్‌ను ఒక చోట లిఖిత రూపంలో సేకరించడం మొదలుపెట్టారు. ఆయన మరణించినప్పుడు వ్యక్తిగత ఆస్తి దాదాపు ఏమీ లేదు.",
          en: "632 to 634. His first crisis came at once: after the Prophet's death some tribes stopped paying zakat and several men claimed prophethood. Through the Ridda wars he held Arabia together. His second decisive act followed the battle of Yamama, where many who had memorised the Quran were killed: on Umar's suggestion he began gathering the Quran into a single written collection. He died owning almost nothing.",
        },
        check: {
          question: { te: "ఖురాన్ సేకరణ ఎందుకు మొదలైంది?", en: "Why did the collection of the Quran begin?" },
          options: [
            { te: "యమామా యుద్ధంలో చాలామంది హాఫిజ్‌లు మరణించడంతో", en: "Because many who had memorised it died at Yamama" },
            { te: "ఖురాన్ మరచిపోయినందున", en: "Because it had been forgotten" },
            { te: "కొత్త ఆయతులు వచ్చినందున", en: "Because new verses had come" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఉమర్ (ర/అ) — పది సంవత్సరాలు", en: "Umar (RA), ten years" },
        body: {
          te: "634-644. అతిపెద్ద విస్తరణ ఈ కాలంలోనే: సిరియా, ఈజిప్ట్, పర్షియా. కానీ ఆయన నిజమైన వారసత్వం పరిపాలన. 'దీవాన్' అనే ప్రభుత్వ రిజిస్టర్ వ్యవస్థ, న్యాయమూర్తుల నియామకం, ప్రజా ఖజానా (బైతుల్ మాల్), హిజ్రీ క్యాలెండర్ స్థాపన, రాత్రి గస్తీ — అన్నీ ఆయనవే. జెరూసలేం లొంగిపోయినప్పుడు ఆయన స్వయంగా వెళ్ళి, చర్చిలో నమాజ్ చేయమన్న ఆహ్వానాన్ని తిరస్కరించారు — తర్వాత ముస్లింలు దాన్ని మస్జిద్‌గా మార్చకుండా ఉండటానికి.",
          en: "634 to 644. The largest expansion happened here: Syria, Egypt, Persia. But his real legacy is administration. The diwan, a state register; the appointment of judges; the public treasury; the establishment of the Hijri calendar; night patrols. All his. When Jerusalem surrendered he came himself and declined an invitation to pray inside the church, so that Muslims afterwards would not turn it into a mosque.",
        },
        check: {
          question: { te: "ఉమర్ (ర/అ) జెరూసలేంలో చర్చిలో నమాజ్ ఎందుకు చేయలేదు?", en: "Why did Umar (RA) decline to pray inside the church in Jerusalem?" },
          options: [
            { te: "తర్వాత ముస్లింలు దాన్ని మస్జిద్‌గా మార్చకుండా ఉండటానికి", en: "So that Muslims would not later turn it into a mosque" },
            { te: "ఆయనకు సమయం లేదు", en: "He had no time" },
            { te: "అది నిషిద్ధం కాబట్టి", en: "Because it was forbidden" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఉస్మాన్ (ర/అ) — పన్నెండు సంవత్సరాలు", en: "Uthman (RA), twelve years" },
        body: {
          te: "644-656. ఆయన అతిపెద్ద కృషి: ఖురాన్‌ను ఒకే ప్రామాణిక పాఠంగా స్థిరపరచడం. సామ్రాజ్యం విస్తరించేకొద్దీ వేర్వేరు ప్రాంతాల్లో వేర్వేరు పఠన శైలుల గురించి వివాదాలు మొదలయ్యాయి. ఉస్మాన్ (ర/అ) అబూ బక్ర్ (ర/అ) సేకరించిన ప్రతిని ఆధారంగా తీసుకుని ప్రామాణిక ప్రతులు తయారు చేయించి ప్రధాన నగరాలకు పంపారు. నేడు ప్రపంచవ్యాప్తంగా ఉన్న ప్రతి అరబిక్ ఖురాన్ ఆ పాఠమే. ఆయన పాలన చివరిలో అసంతృప్తి పెరిగి, ఆయన హత్యతో ముగిసింది.",
          en: "644 to 656. His largest work was fixing the Quran as one standard text. As the empire spread, disputes arose between regions over differing recitations. Taking the collection made under Abu Bakr as his basis, Uthman had standard copies made and sent to the main cities. Every Arabic Quran in the world today carries that text. Discontent grew late in his rule and it ended in his murder.",
        },
      },
      {
        heading: { te: "అలీ (ర/అ) — ఐదు సంవత్సరాలు", en: "Ali (RA), five years" },
        body: {
          te: "656-661. ఆయన పాలన మొత్తం అంతర్గత సంఘర్షణలో గడిచింది — ముస్లిం చరిత్రలో మొదటి 'ఫిత్నా'. ఉస్మాన్ (ర/అ) హత్యకు ప్రతీకారం ఎప్పుడు, ఎలా తీసుకోవాలనే విషయంలో భేదాలు జమల్ యుద్ధానికి, తర్వాత సిఫ్ఫీన్ యుద్ధానికి దారితీశాయి. ఇవి ముస్లింల మధ్య జరిగిన యుద్ధాలు, మరియు ఇది గుర్తుంచుకోవలసిన బాధాకరమైన నిజం. అలీ (ర/అ) తన న్యాయం, జ్ఞానం, వాక్చాతుర్యానికి ప్రసిద్ధులు; 661లో కూఫాలో హత్య చేయబడ్డారు.",
          en: "656 to 661. His entire rule was consumed by internal conflict, the first fitna in Muslim history. Disagreement over when and how to answer Uthman's murder led to the Battle of the Camel and then to Siffin. These were wars between Muslims, and that is a painful fact worth stating plainly. Ali (RA) was known for his justice, learning and eloquence, and was assassinated at Kufa in 661.",
        },
      },
      {
        heading: { te: "వారి పాలన నుండి ఏమి నేర్చుకోవాలి", en: "What their rule teaches" },
        body: {
          te: "నలుగురూ ఎన్నికయ్యారు, వారసత్వంగా రాలేదు — విధానం ఒక్కొక్కసారి వేరుగా ఉన్నా, సూత్రం సంప్రదింపు. నలుగురిలో ముగ్గురు హత్య చేయబడ్డారు; ఇది అధికారం ఎంత ప్రమాదకరమో చూపుతుంది. ఉమర్ (ర/అ) 'నైలు నది ఒడ్డున ఒక కంచర గాడిద పడిపోయినా అల్లాహ్ నన్ను జవాబు అడుగుతాడేమో' అన్నారని ఉల్లేఖించబడింది. అధికారం బాధ్యత అనే ఈ భావనే రాషిదూన్ కాలానికి ప్రత్యేకత.",
          en: "All four were chosen rather than inheriting, and though the method differed each time, the principle was consultation. Three of the four were murdered, which says something about how dangerous authority is. Umar (RA) is reported to have said that if a mule stumbled on the bank of the Nile he feared Allah would question him about it. That sense of power as accountability is what marks the period.",
        },
      },
    ],
    takeaways: [
      { te: "అబూ బక్ర్: అరేబియా ఐక్యత, ఖురాన్ సేకరణ ఆరంభం.", en: "Abu Bakr: held Arabia together and began the collection of the Quran." },
      { te: "ఉమర్: విస్తరణ, మరియు ముఖ్యంగా పరిపాలనా వ్యవస్థ.", en: "Umar: expansion, and above all the machinery of administration." },
      { te: "ఉస్మాన్: ప్రామాణిక ఖురాన్ పాఠం — నేటికీ అదే.", en: "Uthman: the standard text of the Quran, still in use today." },
    ],
    didYouKnow: [
      { te: "ఉమర్ (ర/అ) కరువు కాలంలో హద్ శిక్షలను తాత్కాలికంగా నిలిపివేశారు — పరిస్థితి దొంగతనానికి కారణమైనప్పుడు శిక్ష న్యాయం కాదని.", en: "During a famine Umar (RA) suspended the hadd punishment for theft, holding that punishment is not just when circumstances drive the crime." },
      { te: "అబూ బక్ర్ (ర/అ) ఖలీఫా అయిన తర్వాత తన వ్యాపారాన్ని కొనసాగించాలనుకున్నారు; సహచరులు ఖజానా నుండి కనీస జీతం తీసుకోమని ఒప్పించారు.", en: "Abu Bakr (RA) intended to keep trading after becoming caliph; the companions persuaded him to take a minimal stipend from the treasury instead." },
    ],
    reflect: [
      { te: "అధికారంలో ఉన్నవారు జవాబుదారీగా ఉండాలనే భావన నేటి పాలనలో ఎంతవరకు ఉంది?", en: "How much of that sense of accountability in power survives in governance today?" },
    ],
    mistakes: [
      { te: "మొదటి ఫిత్నాను దాచడం లేదా తేలికపరచడం — అది జరిగింది, దాని నుండి నేర్చుకోవాలి.", en: "Hiding or minimising the first fitna, when it happened and there is something to learn from it." },
      { te: "రాషిదూన్ కాలాన్ని పూర్తిగా సమస్యలు లేని స్వర్ణయుగంగా చిత్రించడం.", en: "Painting the Rashidun period as a golden age without problems." },
    ],
    faqs: [
      {
        question: { te: "ఖలీఫాను ఎలా ఎంచుకునేవారు?", en: "How was a caliph chosen?" },
        answer: {
          te: "ఒకే పద్ధతి లేదు. అబూ బక్ర్ (ర/అ) సఖీఫాలో సంప్రదింపు తర్వాత; ఉమర్ (ర/అ) అబూ బక్ర్ నామినేషన్ ద్వారా; ఉస్మాన్ (ర/అ) ఆరుగురి సభ ద్వారా; అలీ (ర/అ) మదీనావాసుల బైఅత్ ద్వారా. ఉమ్మడి అంశం: వారసత్వం కాదు, ఏదో ఒక రూపంలో సంప్రదింపు.",
          en: "There was no single method. Abu Bakr (RA) after consultation at Saqifah; Umar (RA) by Abu Bakr's nomination; Uthman (RA) through a council of six; Ali (RA) by the pledge of the people of Madinah. The common thread is consultation in some form rather than inheritance.",
        },
      },
      {
        question: { te: "సహచరుల మధ్య యుద్ధాలు జరిగినప్పుడు మనం ఎవరి పక్షం వహించాలి?", en: "When companions fought each other, whose side should we take?" },
        answer: {
          te: "అహ్లుస్-సున్నహ్ సాంప్రదాయ స్థానం: వారి మధ్య జరిగిన వివాదాల్లో పక్షం వహించకుండా, ఇద్దరి పట్లా గౌరవం ఉంచడం. వారు ఇజ్తిహాద్ చేశారు; తప్పు చేసినవారికి కూడా ఒక ప్రతిఫలం, సరైనవారికి రెండు అని పండితులు అంటారు. ఈ చర్చలు నేటి ముస్లింల ఐక్యతను దెబ్బతీయకూడదు.",
          en: "The traditional Sunni position is to withhold from taking sides in their disputes while holding both in respect. They exercised their judgement, and scholars hold that one who judged and erred still has a reward while one who judged rightly has two. These arguments should not be allowed to damage Muslim unity now.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ప్రామాణిక ఖురాన్ పాఠాన్ని ఎవరు స్థిరపరిచారు?", en: "Who fixed the standard text of the Quran?" },
        options: [
          { te: "ఉస్మాన్ (ర/అ)", en: "Uthman (RA)" },
          { te: "ఉమర్ (ర/అ)", en: "Umar (RA)" },
          { te: "అలీ (ర/అ)", en: "Ali (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "హిజ్రీ క్యాలెండర్‌ను ఎవరు స్థాపించారు?", en: "Who established the Hijri calendar?" },
        options: [
          { te: "ఉమర్ (ర/అ)", en: "Umar (RA)" },
          { te: "అబూ బక్ర్ (ర/అ)", en: "Abu Bakr (RA)" },
          { te: "ఉస్మాన్ (ర/అ)", en: "Uthman (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "రాషిదూన్ ఖిలాఫత్ ఎన్ని సంవత్సరాలు?", en: "How long did the Rashidun Caliphate last?" },
        options: [
          { te: "సుమారు ముప్ఫై (632-661)", en: "About thirty years, 632 to 661" },
          { te: "వంద", en: "A hundred" },
          { te: "పది", en: "Ten" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అబూ బక్ర్ 632-634 · ఉమర్ 634-644 · ఉస్మాన్ 644-656 · అలీ 656-661.", en: "Abu Bakr 632-634, Umar 634-644, Uthman 644-656, Ali 656-661." },
      { te: "సేకరణ అబూ బక్ర్; ప్రామాణీకరణ ఉస్మాన్.", en: "Collection under Abu Bakr; standardisation under Uthman." },
      { te: "మొదటి ఫిత్నా అలీ (ర/అ) కాలంలో.", en: "The first fitna fell in Ali's (RA) time." },
    ],
    summary: {
      te: "ముప్ఫై సంవత్సరాలు, నలుగురు ఖలీఫాలు. అబూ బక్ర్ అరేబియాను ఐక్యంగా ఉంచారు, ఖురాన్ సేకరణ మొదలుపెట్టారు. ఉమర్ పరిపాలనా వ్యవస్థను నిర్మించారు. ఉస్మాన్ ఖురాన్‌ను ప్రామాణీకరించారు. అలీ మొదటి అంతర్యుద్ధాన్ని ఎదుర్కొన్నారు.",
      en: "Thirty years and four caliphs. Abu Bakr held Arabia together and began collecting the Quran, Umar built the administration, Uthman standardised the text, and Ali faced the first civil war.",
    },
    apply: {
      te: "ఆచరణ: నలుగురు ఖలీఫాలను, ఒక్కొక్కరి ప్రధాన కృషిని ఒక వరుసలో రాయండి.",
      en: "Apply it: write the four caliphs in order with the one thing each is most remembered for.",
    },
    reading: [
      { label: "Islamic History portal", url: "/knowledge-center/islamic-history" },
      { label: "The Umayyad Caliphate", url: "/knowledge-center/islamic-history/umayyad" },
    ],
  },

  {
    slug: "umayyad",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 4 — ఉమయ్యద్ ఖిలాఫత్",
      en: "Level 4 — The Umayyad Caliphate",
    },
    intro: {
      te: "661 నుండి 750 వరకు, డమాస్కస్ నుండి పాలించిన ఉమయ్యద్‌లు ఇస్లామిక్ రాజ్యాన్ని ఆనాటి ప్రపంచపు అతిపెద్ద సామ్రాజ్యంగా మార్చారు — స్పెయిన్ నుండి సింధు వరకు. వారి కాలం విస్తరణదే కాదు, ఒక ముఖ్యమైన మార్పుదీ: ఎన్నిక నుండి వారసత్వానికి.",
      en: "From 661 to 750, ruling from Damascus, the Umayyads turned the Islamic state into the largest empire of its day, from Spain to the Indus. Their period is one of expansion and also of a decisive change: from election to inheritance.",
    },
    sections: [
      {
        heading: { te: "డమాస్కస్‌కు మార్పు", en: "The move to Damascus" },
        body: {
          te: "అలీ (ర/అ) మరణం తర్వాత ముఆవియా (ర/అ) ఖలీఫా అయ్యారు, మరియు రాజధానిని మదీనా నుండి డమాస్కస్‌కు మార్చారు. ఇది కేవలం భౌగోళిక మార్పు కాదు. మదీనా ఒక మతపరమైన నగరం; డమాస్కస్ బైజాంటైన్ పరిపాలనా సంప్రదాయం ఉన్న సామ్రాజ్య నగరం. ఖిలాఫత్ స్వభావం కూడా మారింది — ముఆవియా తన కుమారుడు యజీద్‌ను వారసుడిగా నియమించడంతో వారసత్వ పాలన మొదలైంది. ఇది అప్పట్లోనే వివాదాస్పదం, మరియు కర్బలా విషాదానికి దారితీసింది.",
          en: "After Ali (RA) died, Mu'awiyah (RA) became caliph and moved the capital from Madinah to Damascus. This was more than a change of geography. Madinah was a religious city; Damascus was an imperial one with a Byzantine administrative tradition behind it. The nature of the caliphate changed with it: by naming his son Yazid as successor, Mu'awiyah began hereditary rule. It was contested at the time, and it led to the tragedy at Karbala.",
        },
        check: {
          question: { te: "ఉమయ్యద్ రాజధాని ఏది?", en: "What was the Umayyad capital?" },
          options: [
            { te: "డమాస్కస్", en: "Damascus" },
            { te: "బాగ్దాద్", en: "Baghdad" },
            { te: "మదీనా", en: "Madinah" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "రెండు దిశల్లో విస్తరణ", en: "Expansion in two directions" },
        body: {
          te: "పశ్చిమాన: ఉత్తర ఆఫ్రికా మీదుగా 711లో తారిఖ్ బిన్ జియాద్ స్పెయిన్‌లోకి ప్రవేశించారు — 'జబల్ తారిఖ్' (తారిఖ్ పర్వతం) నుండే 'జిబ్రాల్టర్' అనే పేరు వచ్చింది. 732లో ఫ్రాన్స్‌లోని టూర్స్ వద్ద ముందుకు సాగడం ఆగిపోయింది. తూర్పున: 711-712లో ముహమ్మద్ బిన్ ఖాసిం సింధ్‌లోకి ప్రవేశించారు — ఉపఖండంలో ఇస్లాం ప్రవేశానికి ఇది ఒక ముఖ్య మార్గం. ఒక్క శతాబ్దంలో అట్లాంటిక్ నుండి సింధు వరకు.",
          en: "Westward: across North Africa, and in 711 Tariq ibn Ziyad crossed into Spain. The name Gibraltar comes from Jabal Tariq, Tariq's mountain. The advance halted at Tours in France in 732. Eastward: in 711 and 712 Muhammad bin Qasim entered Sindh, one of the important routes by which Islam came to the subcontinent. Within a single century, from the Atlantic to the Indus.",
        },
        check: {
          question: { te: "'జిబ్రాల్టర్' పేరు దేని నుండి వచ్చింది?", en: "Where does the name Gibraltar come from?" },
          options: [
            { te: "జబల్ తారిఖ్ — తారిఖ్ పర్వతం", en: "Jabal Tariq, Tariq's mountain" },
            { te: "ఒక స్పానిష్ రాజు పేరు", en: "A Spanish king" },
            { te: "ఒక నది పేరు", en: "A river" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అబ్దుల్ మలిక్ సంస్కరణలు", en: "The reforms of Abd al-Malik" },
        body: {
          te: "ఖలీఫా అబ్దుల్ మలిక్ (685-705) పాలన మలుపు. అప్పటివరకు పరిపాలన స్థానిక భాషల్లో — సిరియాలో గ్రీక్, ఈజిప్టులో కాప్టిక్, పర్షియాలో పహ్లవి — జరిగేది. ఆయన అరబిక్‌ను ఏకైక పరిపాలనా భాషగా చేశారు. అప్పటివరకు బైజాంటైన్, పర్షియన్ నాణేలను వాడేవారు; ఆయన మొదటి ఇస్లామిక్ నాణేలను — చిత్రాలు లేకుండా, ఖురాన్ వాక్యాలతో — ముద్రించారు. మరియు 691లో జెరూసలేంలో 'ఖుబ్బతుస్ సఖ్రా' (డోమ్ ఆఫ్ ద రాక్) నిర్మించారు — ఇస్లామిక్ వాస్తుశిల్పంలో నిలిచి ఉన్న అత్యంత పురాతన కట్టడం.",
          en: "The reign of Abd al-Malik (685-705) was the turning point. Until then administration ran in local languages: Greek in Syria, Coptic in Egypt, Pahlavi in Persia. He made Arabic the single language of state. Until then Byzantine and Persian coins circulated; he minted the first Islamic coinage, without images and carrying Quranic text. And in 691 he built the Dome of the Rock in Jerusalem, the oldest surviving monument of Islamic architecture.",
        },
      },
      {
        heading: { te: "బలహీనతలు, పతనం", en: "The weaknesses, and the fall" },
        body: {
          te: "ఉమయ్యద్ పాలనలో ఒక తీవ్రమైన సమస్య: అరబ్బేతర ముస్లింలను ('మవాలీ') రెండో తరగతి పౌరులుగా చూడటం. ఇస్లాం స్వీకరించినా వారిపై కొన్ని పన్నులు కొనసాగేవి, ఉన్నత పదవులు దక్కేవి కావు. ఇది వీడ్కోలు ఖుత్బాలోని సమానత్వ సూత్రానికి నేరుగా విరుద్ధం, మరియు ఇదే వారి పతనానికి ప్రధాన కారణమైంది. ఉమర్ బిన్ అబ్దుల్ అజీజ్ (717-720) ఈ అన్యాయాలను సరిదిద్దడానికి ప్రయత్నించారు — అందుకే ఆయనను తరచూ 'ఐదవ రాషిద్ ఖలీఫా' అంటారు — కానీ ఆయన పాలన రెండేళ్ళే. 750లో అబ్బాసీయులు ఉమయ్యద్‌లను పడగొట్టారు.",
          en: "One serious flaw ran through Umayyad rule: non-Arab Muslims, the mawali, were treated as second class. Converts often still paid certain taxes and were kept out of high office. This ran directly against the equality declared in the farewell sermon, and it became the main cause of their fall. Umar ibn Abd al-Aziz (717-720) tried to correct these injustices, which is why he is often called the fifth rightly guided caliph, but he ruled only two years. In 750 the Abbasids overthrew them.",
        },
      },
    ],
    takeaways: [
      { te: "661-750, డమాస్కస్; ఎన్నిక నుండి వారసత్వానికి మార్పు.", en: "661 to 750 from Damascus, and the change from election to inheritance." },
      { te: "అబ్దుల్ మలిక్: అరబిక్ పరిపాలనా భాష, ఇస్లామిక్ నాణేలు, డోమ్ ఆఫ్ ద రాక్.", en: "Abd al-Malik: Arabic as the language of state, Islamic coinage, the Dome of the Rock." },
      { te: "మవాలీ పట్ల అసమానతే వారి పతనానికి ప్రధాన కారణం.", en: "The unequal treatment of the mawali was the main cause of their fall." },
    ],
    didYouKnow: [
      { te: "డోమ్ ఆఫ్ ద రాక్ (691) నేటికీ నిలిచి ఉన్న అత్యంత పురాతన ఇస్లామిక్ కట్టడం.", en: "The Dome of the Rock, built in 691, is the oldest Islamic monument still standing." },
      { te: "ఉమర్ బిన్ అబ్దుల్ అజీజ్ పాలనలో జకాత్ తీసుకోవడానికి పేదవారు దొరకని పరిస్థితి వచ్చిందని ఉల్లేఖనలు చెబుతాయి.", en: "Narrations report that under Umar ibn Abd al-Aziz it became hard to find anyone poor enough to receive zakat." },
    ],
    reflect: [
      { te: "సమానత్వ సూత్రాన్ని వదిలిపెట్టడం ఒక సామ్రాజ్యాన్ని కూల్చగలదా? ఉమయ్యద్ చరిత్ర ఏమి చెబుతుంది?", en: "Can abandoning a principle of equality bring down an empire? What does the Umayyad story suggest?" },
    ],
    mistakes: [
      { te: "ఉమయ్యద్ కాలాన్ని కేవలం విస్తరణ కథగా చదవడం — అంతర్గత అసమానత అంతే ముఖ్యం.", en: "Reading the period only as a story of expansion, when the internal inequality matters as much." },
      { te: "ఉమర్ బిన్ అబ్దుల్ అజీజ్‌ను రాషిదూన్ నలుగురిలో ఒకరిగా లెక్కించడం — ఆయన ఉమయ్యద్ ఖలీఫా.", en: "Counting Umar ibn Abd al-Aziz among the four Rashidun, when he was an Umayyad caliph." },
    ],
    faqs: [
      {
        question: { te: "కర్బలా ఏమిటి?", en: "What was Karbala?" },
        answer: {
          te: "680లో ప్రవక్త ﷺ మనవడు హుసైన్ (ర/అ) యజీద్‌కు బైఅత్ ఇవ్వడానికి నిరాకరించి కూఫా వైపు వెళుతుండగా కర్బలా వద్ద ఆయనను, ఆయన కుటుంబాన్ని చుట్టుముట్టి చంపారు. ఇది ఇస్లామిక్ చరిత్రలో అత్యంత విషాదకరమైన సంఘటనలలో ఒకటి, మరియు ముస్లింలందరూ దీన్ని దుఃఖంగానే చూస్తారు.",
          en: "In 680 Husayn (RA), the Prophet's grandson, refused to pledge to Yazid and was travelling towards Kufa when he and his family were surrounded and killed at Karbala. It is among the most tragic events in Islamic history, and Muslims across the board regard it with grief.",
        },
      },
      {
        question: { te: "ఉమయ్యద్‌లు స్పెయిన్‌లో ఎలా కొనసాగారు?", en: "How did the Umayyads continue in Spain?" },
        answer: {
          te: "750లో అబ్బాసీయులు ఉమయ్యద్ కుటుంబాన్ని దాదాపు పూర్తిగా అంతం చేశారు. అబ్దుర్ రహ్మాన్ అనే ఒక యువరాజు తప్పించుకుని స్పెయిన్‌కు చేరుకుని అక్కడ కొత్త ఉమయ్యద్ పాలనను స్థాపించారు. అదే తర్వాత అల్-అందలుస్ స్వర్ణయుగానికి పునాది.",
          en: "In 750 the Abbasids destroyed almost the whole Umayyad family. One prince, Abd al-Rahman, escaped, reached Spain, and founded a new Umayyad rule there. That became the foundation of the golden age of al-Andalus.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "అరబిక్‌ను పరిపాలనా భాషగా చేసినది ఎవరు?", en: "Who made Arabic the language of administration?" },
        options: [
          { te: "అబ్దుల్ మలిక్", en: "Abd al-Malik" },
          { te: "ముఆవియా", en: "Mu'awiyah" },
          { te: "యజీద్", en: "Yazid" },
        ],
        answer: 0,
      },
      {
        question: { te: "711లో స్పెయిన్‌లోకి ప్రవేశించినది ఎవరు?", en: "Who crossed into Spain in 711?" },
        options: [
          { te: "తారిఖ్ బిన్ జియాద్", en: "Tariq ibn Ziyad" },
          { te: "ముహమ్మద్ బిన్ ఖాసిం", en: "Muhammad bin Qasim" },
          { te: "ఖాలిద్ బిన్ వలీద్", en: "Khalid ibn al-Walid" },
        ],
        answer: 0,
      },
      {
        question: { te: "'మవాలీ' ఎవరు?", en: "Who were the mawali?" },
        options: [
          { te: "అరబ్బేతర ముస్లింలు", en: "Non-Arab Muslims" },
          { te: "ఖలీఫా సలహాదారులు", en: "Advisors to the caliph" },
          { te: "సైనిక అధికారులు", en: "Military commanders" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "661-750, డమాస్కస్, వారసత్వ పాలన ఆరంభం.", en: "661 to 750, Damascus, the beginning of hereditary rule." },
      { te: "711 స్పెయిన్ (తారిఖ్) · 711-712 సింధ్ (ముహమ్మద్ బిన్ ఖాసిం).", en: "711 Spain under Tariq; 711-712 Sindh under Muhammad bin Qasim." },
      { te: "అబ్దుల్ మలిక్: అరబిక్, నాణేలు, డోమ్ ఆఫ్ ద రాక్ (691).", en: "Abd al-Malik: Arabic, coinage, the Dome of the Rock in 691." },
    ],
    summary: {
      te: "ఉమయ్యద్‌లు డమాస్కస్ నుండి పాలిస్తూ ఇస్లామిక్ రాజ్యాన్ని స్పెయిన్ నుండి సింధు వరకు విస్తరించారు. అబ్దుల్ మలిక్ అరబిక్‌ను పరిపాలనా భాషగా చేసి ఇస్లామిక్ నాణేలను ముద్రించారు. కానీ అరబ్బేతర ముస్లింల పట్ల అసమానత వారి పతనానికి కారణమైంది.",
      en: "Ruling from Damascus, the Umayyads carried the state from Spain to the Indus. Abd al-Malik made Arabic the language of administration and minted Islamic coinage. But the unequal treatment of non-Arab Muslims brought them down.",
    },
    apply: {
      te: "ఆచరణ: ఉమయ్యద్ విస్తరణ పశ్చిమ, తూర్పు దిశల్లో ఎక్కడివరకు వెళ్ళిందో ఒక వాక్యంలో రాయండి.",
      en: "Apply it: write one sentence on how far the Umayyad expansion reached west and east.",
    },
    reading: [
      { label: "The Rashidun Caliphate", url: "/knowledge-center/islamic-history/rashidun" },
      { label: "The Abbasid Golden Age", url: "/knowledge-center/islamic-history/wisdom" },
    ],
  },

  {
    slug: "wisdom",
    portal: "islamic-history",
    title: {
      te: "స్థాయి 5 — అబ్బాసీ స్వర్ణయుగం",
      en: "Level 5 — The Abbasid Golden Age",
    },
    intro: {
      te: "750లో అబ్బాసీయులు అధికారంలోకి వచ్చి బాగ్దాద్‌ను నిర్మించారు. తర్వాతి కొన్ని శతాబ్దాలు ఇస్లామిక్ నాగరికత జ్ఞానంలో ప్రపంచంలో ముందుంది. ఆ కాలానికి కేంద్రం 'బైతుల్ హిక్మా' — జ్ఞాన గృహం.",
      en: "In 750 the Abbasids took power and built Baghdad. For the centuries that followed, Islamic civilisation led the world in learning, and at the centre of it stood the Bayt al-Hikma, the House of Wisdom.",
    },
    sections: [
      {
        heading: { te: "బాగ్దాద్ — ప్రణాళికాబద్ధ నగరం", en: "Baghdad, a planned city" },
        body: {
          te: "762లో ఖలీఫా అల్-మన్సూర్ టైగ్రిస్ నది ఒడ్డున కొత్త రాజధానిని నిర్మించారు. అది వృత్తాకారంగా ప్రణాళిక చేయబడింది — 'మదీనతుస్ సలామ్', శాంతి నగరం. కొన్ని దశాబ్దాల్లోనే అది ప్రపంచంలోని అతిపెద్ద నగరాలలో ఒకటిగా, బహుశా అతిపెద్దదిగా మారింది. డమాస్కస్ కంటే బాగ్దాద్ తూర్పున ఉండటం ముఖ్యం: అబ్బాసీయుల అధికారం పర్షియన్ ప్రభావంతో నిండి ఉంది, మరియు ఉమయ్యద్ కాలంలో అణచబడిన అరబ్బేతరులు ఇప్పుడు ఉన్నత స్థానాలకు చేరారు.",
          en: "In 762 the caliph al-Mansur built a new capital on the Tigris, laid out as a circle and named Madinat as-Salam, the city of peace. Within decades it was among the largest cities in the world and probably the largest. Its position east of Damascus matters: Abbasid power carried a strong Persian influence, and the non-Arabs held down under the Umayyads now reached high office.",
        },
        check: {
          question: { te: "బాగ్దాద్‌ను ఎవరు, ఎప్పుడు నిర్మించారు?", en: "Who built Baghdad, and when?" },
          options: [
            { te: "అల్-మన్సూర్, 762లో", en: "Al-Mansur, in 762" },
            { te: "హారూన్ అర్-రషీద్, 800లో", en: "Harun al-Rashid, in 800" },
            { te: "ముఆవియా, 661లో", en: "Mu'awiyah, in 661" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "బైతుల్ హిక్మా — అనువాద ఉద్యమం", en: "The House of Wisdom and the translation movement" },
        body: {
          te: "హారూన్ అర్-రషీద్, ఆయన కుమారుడు అల్-మామూన్ కాలంలో బాగ్దాద్‌లో ఒక గొప్ప గ్రంథాలయం, పరిశోధనా కేంద్రం ఏర్పడింది. అక్కడ జరిగినది కేవలం సేకరణ కాదు — ఒక వ్యవస్థీకృత అనువాద ఉద్యమం. గ్రీక్, పర్షియన్, సంస్కృత, సిరియాక్ గ్రంథాలను అరబిక్‌లోకి అనువదించారు: అరిస్టాటిల్, యూక్లిడ్, గాలెన్, టాలెమి, భారతీయ గణితం. ముఖ్యమైనది: అనువాదకులు ముస్లింలు మాత్రమే కాదు — క్రైస్తవులు, యూదులు, సబియన్లు కలిసి పనిచేశారు. హునైన్ బిన్ ఇస్‌హాఖ్ అనే క్రైస్తవ వైద్యుడు అత్యంత ప్రసిద్ధ అనువాదకులలో ఒకరు.",
          en: "Under Harun al-Rashid and his son al-Ma'mun, Baghdad acquired a great library and research centre. What happened there was not merely collecting but an organised translation movement: Greek, Persian, Sanskrit and Syriac works rendered into Arabic, including Aristotle, Euclid, Galen, Ptolemy and Indian mathematics. Importantly the translators were not only Muslims. Christians, Jews and Sabians worked alongside them, and Hunayn ibn Ishaq, a Christian physician, was among the most celebrated of all.",
        },
        check: {
          question: { te: "బైతుల్ హిక్మాలో అనువాదకులు ఎవరు?", en: "Who worked as translators at the House of Wisdom?" },
          options: [
            { te: "ముస్లింలు, క్రైస్తవులు, యూదులు కలిసి", en: "Muslims, Christians and Jews together" },
            { te: "ముస్లింలు మాత్రమే", en: "Muslims only" },
            { te: "గ్రీకులు మాత్రమే", en: "Greeks only" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కాగితం — అన్నిటినీ మార్చిన సాంకేతికత", en: "Paper, the technology that changed everything" },
        body: {
          te: "751లో తలాస్ యుద్ధం తర్వాత చైనీస్ ఖైదీల ద్వారా కాగితం తయారీ ముస్లిం ప్రపంచానికి చేరిందని చెబుతారు. దీని ప్రభావం అపారం. అప్పటివరకు రాయడానికి పాపిరస్ లేదా చర్మం (పార్చ్‌మెంట్) వాడేవారు — రెండూ ఖరీదైనవి, పరిమితమైనవి. కాగితం చౌక. 794 నాటికి బాగ్దాద్‌లో కాగితపు మిల్లు ఉంది. దీనివల్ల పుస్తకాలు సాధారణమయ్యాయి, గ్రంథాలయాలు పెరిగాయి, పుస్తక దుకాణాలు వచ్చాయి. యూరప్‌కు కాగితం మరో నాలుగు వందల సంవత్సరాల తర్వాతే చేరింది.",
          en: "Papermaking is said to have reached the Muslim world through Chinese prisoners after the battle of Talas in 751, and the effect was enormous. Until then writing meant papyrus or parchment, both expensive and limited. Paper was cheap. Baghdad had a paper mill by 794. Books became ordinary, libraries multiplied and bookshops appeared. Paper would not reach Europe for another four centuries.",
        },
      },
      {
        heading: { te: "'స్వర్ణయుగం' అనే మాట గురించి", en: "A word about the phrase golden age" },
        body: {
          te: "ఈ కాలాన్ని స్వర్ణయుగం అనడం సరైనదే, కానీ రెండు జాగ్రత్తలు. ఒకటి: ఇది ఒక్క నగరానికి, ఒక్క రాజవంశానికి పరిమితం కాదు — కైరో, కార్డోబా, బుఖారా, సమర్‌ఖండ్‌లలోనూ ఇదే జరిగింది, కొన్నిసార్లు అబ్బాసీ ప్రభావం లేకుండా. రెండు: ఇది సాఫీగా సాగలేదు — రాజకీయ సంఘర్షణలు, మతపరమైన వివాదాలు, హింస కూడా ఉన్నాయి. 1258లో మంగోలులు బాగ్దాద్‌ను ధ్వంసం చేసి గ్రంథాలయాలను నాశనం చేశారు; టైగ్రిస్ నీరు సిరాతో నల్లబడిందని చెబుతారు.",
          en: "Calling it a golden age is fair, with two cautions. First, it was not confined to one city or dynasty: the same flowering happened in Cairo, Cordoba, Bukhara and Samarkand, sometimes independently of Abbasid influence. Second, it was not smooth; there was political conflict, religious dispute and violence too. In 1258 the Mongols destroyed Baghdad and its libraries, and it is said the Tigris ran black with ink.",
        },
      },
    ],
    takeaways: [
      { te: "బాగ్దాద్ 762లో ప్రణాళికాబద్ధంగా నిర్మించబడింది.", en: "Baghdad was built to a plan in 762." },
      { te: "బైతుల్ హిక్మా: గ్రీక్, పర్షియన్, సంస్కృత జ్ఞానాన్ని అరబిక్‌లోకి అనువదించారు.", en: "The House of Wisdom translated Greek, Persian and Sanskrit learning into Arabic." },
      { te: "కాగితం (751 తర్వాత) పుస్తకాలను సాధారణం చేసింది.", en: "Paper, after 751, made books ordinary." },
    ],
    didYouKnow: [
      { te: "అల్-మామూన్ అనువదించిన గ్రంథం బరువుకు సమానమైన బంగారాన్ని అనువాదకులకు ఇచ్చేవారని చెబుతారు.", en: "Al-Ma'mun is said to have paid translators the weight of the finished book in gold." },
      { te: "కాగితం యూరప్‌కు చేరడానికి ముస్లిం ప్రపంచం కంటే దాదాపు నాలుగు వందల సంవత్సరాలు ఎక్కువ పట్టింది.", en: "Paper took roughly four hundred years longer to reach Europe than the Muslim world." },
    ],
    reflect: [
      { te: "ఇతర నాగరికతల జ్ఞానాన్ని అనువదించడం ముస్లిం పండితులకు ఇబ్బంది కాలేదు. ఇది జ్ఞానం పట్ల ఎలాంటి దృక్పథాన్ని చూపుతుంది?", en: "Muslim scholars had no difficulty translating the learning of other civilisations. What attitude to knowledge does that show?" },
    ],
    mistakes: [
      { te: "స్వర్ణయుగాన్ని బాగ్దాద్‌కు మాత్రమే పరిమితం చేయడం — కార్డోబా, కైరో, బుఖారా కూడా ఉన్నాయి.", en: "Confining the golden age to Baghdad, when Cordoba, Cairo and Bukhara were also part of it." },
      { te: "అనువాద ఉద్యమం ముస్లింలు మాత్రమే చేశారని అనుకోవడం.", en: "Assuming the translation movement was the work of Muslims alone." },
    ],
    faqs: [
      {
        question: { te: "బైతుల్ హిక్మా నిజంగా ఒక భవనమా?", en: "Was the House of Wisdom really a single building?" },
        answer: {
          te: "చరిత్రకారుల మధ్య దీనిపై చర్చ ఉంది. కొందరు దాన్ని ఒక పెద్ద గ్రంథాలయ-అకాడమీగా వర్ణిస్తారు; మరికొందరు అది ప్రధానంగా ఖలీఫా గ్రంథాలయమని, అనువాద కృషి దానికి బయటా విస్తృతంగా జరిగిందని అంటారు. అనువాద ఉద్యమం జరిగిందనేది నిస్సందేహం; దాని సంస్థాగత రూపం గురించే భేదం.",
          en: "Historians debate it. Some describe a large library and academy; others hold it was mainly the caliph's library, with the translation work spread far beyond it. That the translation movement happened is not in doubt; the disagreement is about its institutional shape.",
        },
      },
      {
        question: { te: "మంగోల దాడితో ఇస్లామిక్ జ్ఞానం ముగిసిందా?", en: "Did the Mongol destruction end Islamic learning?" },
        answer: {
          te: "లేదు. బాగ్దాద్ పతనం భయంకరమైన నష్టం, కానీ జ్ఞాన కేంద్రాలు అనేకం — కైరో, డమాస్కస్, స్పెయిన్, మధ్య ఆసియా, తర్వాత ఒట్టోమన్, సఫవీ, మొఘల్ సామ్రాజ్యాలు. ఇబ్న్ ఖల్దూన్ వంటి గొప్ప పండితులు మంగోల దాడి తర్వాతివారే.",
          en: "No. The fall of Baghdad was a terrible loss, but centres of learning were many: Cairo, Damascus, Spain, Central Asia, and later the Ottoman, Safavid and Mughal empires. Scholars as great as Ibn Khaldun came after the Mongols, not before.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "బాగ్దాద్ అసలు పేరు ఏమిటి?", en: "What was Baghdad's formal name?" },
        options: [
          { te: "మదీనతుస్ సలామ్ — శాంతి నగరం", en: "Madinat as-Salam, the city of peace" },
          { te: "మదీనతున్ నబీ", en: "Madinat an-Nabi" },
          { te: "దారుల్ హిక్మా", en: "Dar al-Hikma" },
        ],
        answer: 0,
      },
      {
        question: { te: "కాగితం ముస్లిం ప్రపంచానికి ఎప్పుడు చేరింది?", en: "When did paper reach the Muslim world?" },
        options: [
          { te: "751 తలాస్ యుద్ధం తర్వాత", en: "After the battle of Talas in 751" },
          { te: "622 హిజ్రత్ సమయంలో", en: "At the Hijrah in 622" },
          { te: "1258 మంగోల దాడి తర్వాత", en: "After the Mongols in 1258" },
        ],
        answer: 0,
      },
      {
        question: { te: "బాగ్దాద్ ఎప్పుడు ధ్వంసమైంది?", en: "When was Baghdad destroyed?" },
        options: [
          { te: "1258లో మంగోలుల చేతిలో", en: "In 1258, by the Mongols" },
          { te: "750లో అబ్బాసీయుల చేతిలో", en: "In 750, by the Abbasids" },
          { te: "1492లో", en: "In 1492" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "762 బాగ్దాద్ · బైతుల్ హిక్మా · 751 కాగితం · 1258 మంగోలులు.", en: "762 Baghdad, the House of Wisdom, paper from 751, the Mongols in 1258." },
      { te: "అనువాదకులు: ముస్లింలు, క్రైస్తవులు, యూదులు.", en: "The translators were Muslims, Christians and Jews." },
      { te: "స్వర్ణయుగం బాగ్దాద్‌కే పరిమితం కాదు.", en: "The golden age was not Baghdad alone." },
    ],
    summary: {
      te: "అబ్బాసీయులు 762లో బాగ్దాద్‌ను నిర్మించి, అనువాద ఉద్యమం ద్వారా గ్రీక్, పర్షియన్, భారతీయ జ్ఞానాన్ని అరబిక్‌లోకి తెచ్చారు. కాగితం రాక పుస్తకాలను సాధారణం చేసింది. ఈ కాలం బాగ్దాద్‌కే పరిమితం కాదు, మరియు 1258 మంగోల దాడితో అది ముగియలేదు.",
      en: "The Abbasids built Baghdad in 762 and, through the translation movement, brought Greek, Persian and Indian learning into Arabic. The arrival of paper made books ordinary. The period was not confined to Baghdad, and it did not end with the Mongols in 1258.",
    },
    apply: {
      te: "ఆచరణ: కాగితం రాక పుస్తకాలను ఎలా మార్చిందో రెండు వాక్యాల్లో రాయండి.",
      en: "Apply it: write two sentences on how the arrival of paper changed books.",
    },
    reading: [
      { label: "Great Muslim scholars", url: "/knowledge-center/islamic-history/scholars" },
      { label: "Islamic Spain", url: "/knowledge-center/islamic-history/andalus" },
    ],
  },
];
