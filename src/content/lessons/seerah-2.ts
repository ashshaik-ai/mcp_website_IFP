/* Seerah, levels 5 to 8. Split from ./seerah.ts to keep the files readable;
   both arrays are spread into authoredLessons together. */
import type { Lesson } from "../lessons.ts";

export const seerahLessonsTwo: Lesson[] = [
  {
    slug: "major-events-and-battles",
    portal: "seerah",
    title: {
      te: "స్థాయి 5 — ప్రధాన సంఘటనలు",
      en: "Level 5 — The major events",
    },
    intro: {
      te: "మదీనా కాలంలోని యుద్ధాలు, ఒప్పందాలు ప్రతిదీ ఒక పాఠాన్ని మోస్తుంది — విజయం, ఓటమి, సంధి, క్షమాభిక్ష. వాటిని సంఘటనలుగా కాక పాఠాలుగా చదవడం ఇక్కడ లక్ష్యం.",
      en: "Each of the battles and treaties of the Madinan years carries a lesson: victory, setback, truce, amnesty. The aim here is to read them as lessons rather than as events.",
    },
    sections: [
      {
        heading: { te: "బద్ర్ (624) — సంఖ్య నిర్ణయించదు", en: "Badr, 624: numbers do not decide" },
        body: {
          te: "మూడు వందల పదముగ్గురు ముస్లింలు, వెయ్యి మంది ఖురైష్. ముస్లింల వద్ద కొన్ని గుర్రాలు, కొన్ని ఒంటెలు మాత్రమే. ఫలితం స్పష్టమైన విజయం. కానీ యుద్ధం కంటే దాని తర్వాతిది ఎక్కువ చెబుతుంది: ఖైదీలతో ఎలా వ్యవహరించాలనే విషయంలో ఖురాన్ ప్రవక్త ﷺను సరిదిద్దింది (అల్-అన్ఫాల్ 8:67-68). ఒక గ్రంథం తన సందేశహరుడినే బహిరంగంగా సరిదిద్దడం — ఇది ఆ గ్రంథం మనిషి రచన కాదని చెప్పే వాదనలలో ఒకటి. మరో వివరం: చదవగలిగే ఖైదీలను పది మంది ముస్లింలకు చదవడం నేర్పితే విడుదల చేశారు.",
          en: "Three hundred and thirteen Muslims against a thousand of Quraysh, with only a few horses and camels between them. The result was a clear victory. But what followed says more than the battle: the Quran corrected the Prophet ﷺ over how the prisoners were handled (Al-Anfal 8:67-68). A book publicly correcting its own messenger is among the arguments that it is not his composition. And a detail: literate prisoners were freed on condition they taught ten Muslims to read.",
        },
        check: {
          question: { te: "బద్ర్ తర్వాత ఖురాన్ ఏమి చేసింది?", en: "What did the Quran do after Badr?" },
          options: [
            { te: "ఖైదీల విషయంలో ప్రవక్త ﷺను సరిదిద్దింది", en: "It corrected the Prophet ﷺ over the prisoners" },
            { te: "విజయాన్ని మాత్రమే ప్రశంసించింది", en: "It only praised the victory" },
            { te: "ఏమీ చెప్పలేదు", en: "It said nothing" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఉహుద్ (625) — క్రమశిక్షణ పాఠం", en: "Uhud, 625: the lesson in discipline" },
        body: {
          te: "ప్రవక్త ﷺ యాభై మంది విలుకాళ్ళను ఒక కొండపై ఉంచి 'మనం గెలుస్తున్నా, ఓడిపోతున్నా ఈ స్థానం వదలవద్దు' అని స్పష్టంగా ఆదేశించారు. ముస్లింలు ముందంజ వేస్తుండగా, యుద్ధ సామగ్రి సేకరించడానికి చాలామంది విలుకాళ్ళు స్థానం వదిలారు. ఖాలిద్ బిన్ వలీద్ (అప్పటికి ఇంకా ముస్లిం కాదు) ఆ ఖాళీ ద్వారా వెనుక నుండి దాడి చేశారు, మరియు విజయం నష్టంగా మారింది. హమ్జా (ర/అ) సహా డెబ్భై మంది అమరులయ్యారు; ప్రవక్త ﷺ స్వయంగా గాయపడ్డారు. ఖురాన్ ఈ ఓటమిని దాచలేదు — సూరా ఆల్-ఇమ్రాన్‌లో దీన్ని వివరంగా చర్చిస్తుంది.",
          en: "The Prophet ﷺ placed fifty archers on a hill with a clear instruction: do not leave this position whether we are winning or losing. As the Muslims advanced, most of the archers left to collect the spoils. Khalid ibn al-Walid, not yet a Muslim, came round through the gap and struck from behind, and victory turned into loss. Seventy were killed including Hamzah (RA), and the Prophet ﷺ was wounded. The Quran does not hide the defeat; Surah Al-Imran discusses it at length.",
        },
        check: {
          question: { te: "ఉహుద్‌లో ఏమి తప్పు జరిగింది?", en: "What went wrong at Uhud?" },
          options: [
            { te: "విలుకాళ్ళు ఆదేశాన్ని పాటించక స్థానం వదిలారు", en: "The archers left their position against orders" },
            { te: "ముస్లింల సంఖ్య తక్కువ", en: "The Muslims were outnumbered" },
            { te: "వాతావరణం ప్రతికూలం", en: "The weather turned" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఖందఖ్ (627) — వేరే ఆలోచనను స్వీకరించడం", en: "Khandaq, 627: taking an idea from elsewhere" },
        body: {
          te: "పదివేల మంది సంయుక్త సైన్యం మదీనాను చుట్టుముట్టడానికి వచ్చింది. సల్మాన్ ఫారిసీ (ర/అ) — పర్షియా నుండి వచ్చిన, గతంలో బానిసగా ఉన్న వ్యక్తి — 'మా దేశంలో ఇలాంటప్పుడు కందకం తవ్వుతాం' అని సూచించారు. అరేబియా యుద్ధ సంప్రదాయంలో ఇది తెలియదు. ప్రవక్త ﷺ దాన్ని అంగీకరించి, స్వయంగా తవ్వడంలో పాల్గొన్నారు. కందకం పనిచేసింది; ముట్టడి విఫలమై సైన్యం వెనుదిరిగింది. పాఠం స్పష్టం: మంచి ఆలోచన ఎక్కడి నుండి వచ్చినా — వేరే సంస్కృతి, వేరే దేశం — దాన్ని స్వీకరించడంలో తప్పు లేదు.",
          en: "A confederate army of ten thousand came to besiege Madinah. Salman al-Farisi (RA), a Persian who had once been enslaved, suggested that in his country they dug a trench in such a situation. It was unknown in Arabian warfare. The Prophet ﷺ accepted it and dug alongside everyone else. The trench worked, the siege failed and the army withdrew. The lesson is plain: a good idea is worth taking wherever it comes from, including another culture.",
        },
      },
      {
        heading: { te: "హుదైబియా (628) — ఓటమిలా కనిపించిన విజయం", en: "Hudaybiyyah, 628: the victory that looked like a defeat" },
        body: {
          te: "షరతులు ముస్లింలకు అవమానకరంగా కనిపించాయి: ఆ సంవత్సరం ఉమ్రహ్ లేకుండా తిరిగి వెళ్ళాలి; మక్కా నుండి మదీనాకు వచ్చే వ్యక్తిని తిరిగి పంపాలి, కానీ మదీనా నుండి మక్కాకు వెళ్ళేవారిని కాదు. ఒప్పంద పత్రంలో 'అల్లాహ్ ప్రవక్త ముహమ్మద్' అనే పదాలను తొలగించి 'అబ్దుల్లాహ్ కుమారుడు ముహమ్మద్' అని రాయాలని ఖురైష్ పట్టుబట్టింది, మరియు ఆయన అంగీకరించారు. ఉమర్ (ర/అ) సహా చాలామంది సహచరులు కలత చెందారు. కానీ ఖురాన్ దాన్ని 'స్పష్టమైన విజయం' అంది (అల్-ఫత్హ్ 48:1). ఎందుకంటే శాంతి వచ్చింది, మరియు ఆ శాంతిలో ప్రజలు స్వేచ్ఛగా ఇస్లాం గురించి తెలుసుకున్నారు — తర్వాతి రెండేళ్ళలో అంతకుముందు పంతొమ్మిదేళ్ళ కంటే ఎక్కువమంది ఇస్లాం స్వీకరించారు.",
          en: "The terms looked humiliating: return that year without performing Umrah; anyone coming from Makkah to Madinah to be sent back, but not the reverse. Quraysh insisted that the words Muhammad the Messenger of Allah be struck from the document and replaced with Muhammad son of Abdullah, and he agreed. Many companions, Umar (RA) among them, were distressed. Yet the Quran called it a clear victory (Al-Fath 48:1), because peace came, and in that peace people learned about Islam freely. More entered it in the following two years than in the previous nineteen.",
        },
      },
      {
        heading: { te: "మక్కా విజయం (630) — క్షమాభిక్ష", en: "The conquest of Makkah, 630: the amnesty" },
        body: {
          te: "పది వేల మందితో ఆయన మక్కాలోకి ప్రవేశించారు — దాదాపు ప్రతిఘటన లేకుండా. ఇరవై ఒక్క సంవత్సరాలుగా ఆయనను హింసించిన, ఆయన సహచరులను చంపిన, ఆయనను చంపడానికి పథకం వేసిన నగరం అది. ఆయన అధికారం పూర్తిగా ఆయన చేతిలో ఉంది. ఆయన అడిగారు: 'నేను మీతో ఏమి చేస్తాననుకుంటున్నారు?' వారు అన్నారు: 'నీవు గొప్పవాడివి, గొప్పవాడి కుమారుడివి'. ఆయన అన్నారు: 'వెళ్ళండి, మీరు స్వేచ్ఛ పొందారు'. హింద్ — హమ్జా (ర/అ) శరీరాన్ని వికృతం చేసినామె — కూడా క్షమించబడ్డారు. కాబా నుండి విగ్రహాలు తొలగించబడ్డాయి; ఒక్క ఇల్లూ కొల్లగొట్టబడలేదు.",
          en: "He entered Makkah with ten thousand against almost no resistance. This was the city that had persecuted him for twenty-one years, killed his companions and plotted his death, and now power was entirely his. He asked what they thought he would do with them. They said you are noble, the son of one noble. He said go, you are free. Hind, who had mutilated Hamzah's body, was pardoned too. The idols were cleared from the Kaaba, and not one house was looted.",
        },
        check: {
          question: { te: "మక్కా విజయం తర్వాత ఆయన ఏమి చేశారు?", en: "What did he do after taking Makkah?" },
          options: [
            { te: "సాధారణ క్షమాభిక్ష ప్రకటించారు", en: "Declared a general amnesty" },
            { te: "నాయకులను శిక్షించారు", en: "Punished the leaders" },
            { te: "నగరాన్ని కొల్లగొట్టారు", en: "Had the city looted" },
          ],
          answer: 0,
        },
      },
    ],
    takeaways: [
      { te: "బద్ర్: సంఖ్య నిర్ణయించదు; ఖురాన్ ప్రవక్త ﷺనే సరిదిద్దింది.", en: "Badr: numbers do not decide, and the Quran corrected the Prophet ﷺ." },
      { te: "ఉహుద్: ఆదేశాన్ని పాటించకపోవడం విజయాన్ని నష్టంగా మార్చింది.", en: "Uhud: disobeying an order turned victory into loss." },
      { te: "హుదైబియా: ఓటమిలా కనిపించినది స్పష్టమైన విజయం.", en: "Hudaybiyyah: what looked like defeat was a clear victory." },
    ],
    didYouKnow: [
      { te: "ఖాలిద్ బిన్ వలీద్ ఉహుద్‌లో ముస్లింలకు వ్యతిరేకంగా పోరాడారు; తర్వాత ఇస్లాం స్వీకరించి ఇస్లాం చరిత్రలో గొప్ప సేనాధిపతులలో ఒకరయ్యారు.", en: "Khalid ibn al-Walid fought against the Muslims at Uhud and later became one of the great commanders in Islamic history." },
      { te: "మక్కా విజయం రోజున బిలాల్ (ర/అ) — ఒకప్పుడు ఆ నగరంలో హింసించబడిన బానిస — కాబాపై నిలబడి అజాన్ ఇచ్చారు.", en: "On the day Makkah was taken, Bilal (RA), once tortured as a slave in that city, gave the call to prayer from atop the Kaaba." },
    ],
    reflect: [
      { te: "అధికారం మీ చేతిలో ఉన్నప్పుడు క్షమించడం — మీ జీవితంలో అలాంటి అవకాశం ఎప్పుడైనా వచ్చిందా?", en: "Forgiving when the power is yours: has that opportunity ever come to you?" },
    ],
    mistakes: [
      { te: "ఉహుద్ ఓటమిని దాచడం — ఖురాన్ దాన్ని దాచలేదు.", en: "Hiding the setback at Uhud, when the Quran does not." },
      { te: "హుదైబియా షరతులను ఓటమిగా చదవడం.", en: "Reading the terms at Hudaybiyyah as a defeat." },
    ],
    faqs: [
      {
        question: { te: "ఈ యుద్ధాలు దాడులా, రక్షణా?", en: "Were these battles offensive or defensive?" },
        answer: {
          te: "బద్ర్, ఉహుద్, ఖందఖ్ మూడూ మదీనాపై వచ్చిన సైన్యాలకు ప్రతిస్పందన. ఖందఖ్ పూర్తిగా ముట్టడి రక్షణ. యుద్ధానికి అనుమతి ఇచ్చిన ఆయత్ కూడా ఈ చట్రాన్నే చూపుతుంది: 'వారిపై యుద్ధం చేయబడుతున్నందున అనుమతి ఇవ్వబడింది, ఎందుకంటే వారు అన్యాయానికి గురయ్యారు' (అల్-హజ్ 22:39).",
          en: "Badr, Uhud and Khandaq were all responses to armies coming against Madinah, and Khandaq was purely a defence against siege. The verse permitting fighting frames it the same way: 'Permission is given to those who are fought, because they were wronged' (Al-Hajj 22:39).",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఖందఖ్‌లో కందకం ఎవరి సూచన?", en: "Whose idea was the trench at Khandaq?" },
        options: [
          { te: "సల్మాన్ ఫారిసీ (ర/అ)", en: "Salman al-Farisi (RA)" },
          { te: "ఉమర్ (ర/అ)", en: "Umar (RA)" },
          { te: "ఖాలిద్ బిన్ వలీద్", en: "Khalid ibn al-Walid" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్ హుదైబియాను ఏమని పిలిచింది?", en: "What did the Quran call Hudaybiyyah?" },
        options: [
          { te: "స్పష్టమైన విజయం", en: "A clear victory" },
          { te: "ఒక పరీక్ష", en: "A trial" },
          { te: "ఒక ఓటమి", en: "A defeat" },
        ],
        answer: 0,
      },
      {
        question: { te: "మక్కా విజయం రోజున కాబాపై అజాన్ ఎవరు ఇచ్చారు?", en: "Who gave the call to prayer from the Kaaba that day?" },
        options: [
          { te: "బిలాల్ (ర/అ)", en: "Bilal (RA)" },
          { te: "అబూ బక్ర్ (ర/అ)", en: "Abu Bakr (RA)" },
          { te: "అలీ (ర/అ)", en: "Ali (RA)" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "బద్ర్ 624 · ఉహుద్ 625 · ఖందఖ్ 627 · హుదైబియా 628 · మక్కా 630.", en: "Badr 624, Uhud 625, Khandaq 627, Hudaybiyyah 628, Makkah 630." },
      { te: "ఉహుద్ పాఠం: క్రమశిక్షణ.", en: "The lesson of Uhud is discipline." },
      { te: "మక్కా విజయం: సాధారణ క్షమాభిక్ష.", en: "The conquest of Makkah: a general amnesty." },
    ],
    summary: {
      te: "బద్ర్ సంఖ్య నిర్ణయించదని చూపింది; ఉహుద్ క్రమశిక్షణ పాఠం; ఖందఖ్ వేరే సంస్కృతి ఆలోచనను స్వీకరించడం; హుదైబియా ఓటమిలా కనిపించిన విజయం; మక్కా విజయం అధికారం చేతిలో ఉన్నప్పుడు క్షమించడం.",
      en: "Badr showed that numbers do not decide. Uhud was a lesson in discipline, Khandaq in taking a good idea from another culture, Hudaybiyyah in a victory that looked like defeat, and the conquest of Makkah in forgiving when the power is yours.",
    },
    apply: {
      te: "ఆచరణ: ఈ ఐదు సంఘటనలలో ప్రతిదాని పాఠాన్ని ఒక్కొక్క వాక్యంలో రాయండి.",
      en: "Apply it: write the lesson of each of these five events in one sentence.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "Character and legacy", url: "/knowledge-center/seerah/character-and-legacy" },
    ],
  },

  {
    slug: "character-and-legacy",
    portal: "seerah",
    title: {
      te: "స్థాయి 6 — స్వభావం",
      en: "Level 6 — His character",
    },
    intro: {
      te: "ఖురాన్ ఆయన గురించి చెప్పిన అత్యున్నత ప్రశంస ఆయన అద్భుతాల గురించి కాదు: 'నిశ్చయంగా నీవు గొప్ప స్వభావంపై ఉన్నావు' (అల్-ఖలమ్ 68:4). ఈ పాఠం ఆ స్వభావాన్ని నిర్దిష్ట సంఘటనల ద్వారా చూపుతుంది.",
      en: "The highest praise the Quran gives him is not about miracles: 'Indeed, you are of a great character' (Al-Qalam 68:4). This lesson shows that character through specific incidents.",
    },
    sections: [
      {
        heading: { te: "ఇంట్లో ఎలా ఉండేవారు", en: "How he was at home" },
        body: {
          te: "ఆయిషా (ర/అ)ను 'ఆయన ఇంట్లో ఏమి చేసేవారు?' అని అడిగినప్పుడు ఆమె అన్నారు: 'ఆయన తన కుటుంబానికి సేవ చేసేవారు, మరియు నమాజ్ సమయం వచ్చినప్పుడు బయటికి వెళ్ళేవారు' (బుఖారీ). మరో ఉల్లేఖనలో ఆయన తన బట్టలు కుట్టుకునేవారు, చెప్పులు బాగుచేసుకునేవారు, ఇంటి పనుల్లో సహాయపడేవారు. ఇది ఒక సమాజంలో ఇవ్వబడిన ఉదాహరణ — అక్కడ పురుషులు ఇంటి పనిని అవమానంగా భావించేవారు. ఆయన ఎప్పుడూ ఏ భోజనాన్నీ విమర్శించలేదు; నచ్చితే తినేవారు, నచ్చకపోతే వదిలేసేవారు (బుఖారీ).",
          en: "Asked what he did at home, Aisha (RA) said he served his family, and when the time for prayer came he went out (Bukhari). Other narrations describe him mending his own clothes, repairing his sandals and helping with the housework. That was an example set in a society where men considered such work beneath them. He never criticised food: if he liked it he ate, and if not he left it (Bukhari).",
        },
        check: {
          question: { te: "ఆయిషా (ర/అ) ఆయన ఇంటి జీవితాన్ని ఎలా వర్ణించారు?", en: "How did Aisha (RA) describe his life at home?" },
          options: [
            { te: "ఆయన తన కుటుంబానికి సేవ చేసేవారు", en: "He served his family" },
            { te: "ఆయన ఎప్పుడూ ఇంట్లో ఉండేవారు కాదు", en: "He was never at home" },
            { te: "ఆయన ఎప్పుడూ మౌనంగా ఉండేవారు", en: "He was always silent" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కోపం ఎప్పుడు వచ్చేది", en: "When he did get angry" },
        body: {
          te: "వ్యక్తిగత అవమానానికి ఆయన ఎప్పుడూ కోపగించలేదు. ఒక బెడోయిన్ ఆయన దుప్పటిని గట్టిగా లాగి మెడపై గుర్తు పడేంతగా చేసి 'నీ వద్ద ఉన్న అల్లాహ్ సంపద నుండి నాకు ఇవ్వు' అని కఠినంగా అడిగినప్పుడు, ఆయన నవ్వి అతనికి ఇవ్వమని ఆదేశించారు (బుఖారీ). కానీ అల్లాహ్ హక్కులు ఉల్లంఘించబడినప్పుడు ఆయన కోపగించేవారు. ఒక ధనవంతురాలు దొంగతనం చేసినప్పుడు కొందరు శిక్షను తప్పించమని కోరితే ఆయన అన్నారు: 'మీకు ముందున్నవారు నాశనమైనది ఇందుకే — పేదవాడు దొంగిలిస్తే శిక్షించేవారు, ధనవంతుడు దొంగిలిస్తే వదిలేసేవారు' (బుఖారీ). ఇది స్వభావం గురించి ఒక ముఖ్యమైన విషయం: మృదుత్వం మరియు దృఢత్వం రెండూ, సరైన చోట.",
          en: "He never grew angry at a personal slight. When a bedouin tugged his cloak so hard it marked his neck and demanded roughly that he be given from Allah's wealth, he laughed and ordered that the man be given something (Bukhari). But he did grow angry when Allah's rights were violated. When some interceded for a woman of rank who had stolen, he said: those before you were destroyed by exactly this, punishing the poor thief and letting the noble one go (Bukhari). That is the shape of the character: gentleness and firmness, each in its place.",
        },
        check: {
          question: { te: "ఆయనకు ఎప్పుడు కోపం వచ్చేది?", en: "When did he become angry?" },
          options: [
            { te: "అల్లాహ్ హక్కులు ఉల్లంఘించబడినప్పుడు", en: "When Allah's rights were violated" },
            { te: "ఎవరైనా ఆయనను అవమానించినప్పుడు", en: "When someone insulted him" },
            { te: "ఆయనకు ఎప్పుడూ కోపం రాలేదు", en: "He never became angry" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "బలహీనులతో", en: "With the weak" },
        body: {
          te: "ఒక నల్ల స్త్రీ (కొన్ని ఉల్లేఖనల ప్రకారం మానసిక ఇబ్బంది ఉన్నామె) మస్జిద్ శుభ్రం చేసేవారు. ఆమె మరణించినప్పుడు సహచరులు ఆయనకు చెప్పకుండా ఖననం చేశారు. ఆయన తెలుసుకుని 'మీరు నాకు ఎందుకు చెప్పలేదు?' అని అడిగి, ఆమె సమాధి వద్దకు వెళ్ళి నమాజ్ చేశారు (బుఖారీ). మరో సంఘటన: ఒక మనిషి ఆయనతో మాట్లాడాలని వస్తే ఆయన ఆ వ్యక్తి మాట పూర్తయ్యేవరకు తన చేతిని వదిలేవారు కాదు, మరియు మొదట తన ముఖాన్ని తిప్పేవారు కాదు. పిల్లలకు సలామ్ చెప్పేవారు. ఒంటెలు, పిల్లులు కూడా ఆయన శ్రద్ధలో ఉండేవి — ఒక ఒంటె ఆయనను చూసి ఏడ్చినప్పుడు దాని యజమానిని పిలిచి అతిగా పని చేయిస్తున్నందుకు మందలించారు (అబూ దావూద్).",
          en: "A black woman, in some narrations one with a mental illness, used to clean the mosque. When she died the companions buried her without telling him. He asked why he had not been told, went to her grave and prayed over her (Bukhari). Another: when a man came to speak with him he would not withdraw his hand first, nor turn his face away first. He greeted children. Animals were in his care too, and when a camel wept at the sight of him he called its owner and rebuked him for overworking it (Abu Dawud).",
        },
      },
      {
        heading: { te: "శత్రువులతో", en: "With enemies" },
        body: {
          te: "అబూ జహల్ మరణం తర్వాత ఆయన కుమారుడు ఇక్రిమా ఇస్లాం స్వీకరించడానికి వచ్చినప్పుడు, ప్రవక్త ﷺ సహచరులతో 'అతని తండ్రిని దూషించవద్దు — మృతులను దూషించడం జీవించి ఉన్నవారిని బాధపెడుతుంది' అన్నారు. వహ్షీ — హమ్జా (ర/అ)ను చంపినవాడు — ఇస్లాం స్వీకరించినప్పుడు ఆయన అతన్ని అంగీకరించారు, కేవలం 'నీ ముఖాన్ని నా నుండి దాచు' అని అడిగారు, ఎందుకంటే అతన్ని చూసినప్పుడల్లా ఆయనకు తన మామ గుర్తు వచ్చేవారు. ఇది గమనించదగినది: ఆయన మనిషిగా బాధపడ్డారు, కానీ న్యాయాన్ని బాధతో కలపలేదు.",
          en: "When Ikrimah, the son of Abu Jahl, came to accept Islam, the Prophet ﷺ told the companions not to insult his father, since insulting the dead hurts the living. When Wahshi, who had killed Hamzah (RA), accepted Islam, he accepted him and only asked him to keep his face from him, because seeing him brought his uncle back to mind. That is worth noticing: he felt the grief as a man and did not let it displace justice.",
        },
      },
      {
        heading: { te: "ఆయన వదిలివెళ్ళినది", en: "What he left behind" },
        body: {
          te: "ఆయన మరణించినప్పుడు ఆయన కవచం ఒక యూదు వ్యక్తి వద్ద తన కుటుంబం కోసం ధాన్యం తీసుకున్నందుకు తాకట్టులో ఉంది (బుఖారీ). ఒక సామ్రాజ్యానికి నాయకుడు, అరేబియా మొత్తం ఆయన మాట వినేది, మరియు ఆయన ఇల్లు ఖాళీగా ఉంది. ఆయిషా (ర/అ) చెప్పారు: ఆయన ఇంట్లో వరుసగా రెండు నెలలు పొయ్యి వెలిగేది కాదు; వారు ఖర్జూరాలు, నీటితో బతికేవారు (బుఖారీ). ఆయన వదిలివెళ్ళినది సంపద కాదు, రాజ్యం కాదు — ఖురాన్, సున్నత్, మరియు ఒక ఉదాహరణ.",
          en: "When he died, his shield was pledged with a Jewish man for grain taken for his family (Bukhari). The leader of a polity that all Arabia listened to, and his house was bare. Aisha (RA) said two months could pass without a fire being lit in his house; they lived on dates and water (Bukhari). What he left was not wealth or a kingdom, but the Quran, the Sunnah and an example.",
        },
      },
    ],
    takeaways: [
      { te: "ఖురాన్ ప్రశంస అద్భుతాలకు కాదు, స్వభావానికి (68:4).", en: "The Quran's praise is for his character rather than for miracles (68:4)." },
      { te: "వ్యక్తిగత అవమానానికి కోపం లేదు; అన్యాయానికి ఉంది.", en: "No anger at personal slight; anger at injustice." },
      { te: "ఆయన మరణించినప్పుడు ఆయన కవచం తాకట్టులో ఉంది.", en: "When he died his shield was in pledge." },
    ],
    didYouKnow: [
      { te: "ఆయన ఎప్పుడూ ఏ భోజనాన్నీ విమర్శించలేదు — నచ్చితే తినేవారు, నచ్చకపోతే వదిలేసేవారు (బుఖారీ).", en: "He never criticised food: if he liked it he ate it, and if not he simply left it (Bukhari)." },
      { te: "ఒక వ్యక్తితో కరచాలనం చేసినప్పుడు ఆ వ్యక్తి చేయి వదిలేవరకు ఆయన తన చేతిని వెనక్కి తీసుకునేవారు కాదు.", en: "When shaking someone's hand he would not be the first to withdraw his own." },
    ],
    reflect: [
      { te: "'ఆయన స్వభావం ఖురాన్' — ఈ పాఠంలోని ఏ ఒక్క అలవాటును మీరు ఈ వారం అనుకరించగలరు?", en: "His character was the Quran. Which single habit from this lesson could you copy this week?" },
    ],
    mistakes: [
      { te: "ఆయన స్వభావాన్ని కేవలం మృదుత్వంగా చూడటం — దృఢత్వం కూడా అందులో భాగం.", en: "Reducing his character to gentleness, when firmness was part of it." },
      { te: "సీరత్‌ను చదివి అనుకరించకపోవడం — అదే దాని ఉద్దేశం.", en: "Reading the seerah without imitating it, which is what it is for." },
    ],
    faqs: [
      {
        question: { te: "ఆయన ఎప్పుడైనా నవ్వేవారా?", en: "Did he laugh?" },
        answer: {
          te: "అవును, తరచూ చిరునవ్వు నవ్వేవారు — 'మీ సోదరుడి ముఖం చూసి చిరునవ్వడం ఒక సదఖా' అన్నారు (తిర్మిజీ). ఆయన హాస్యం కూడా చేసేవారు, కానీ ఎప్పుడూ అబద్ధం చెప్పకుండా. ఒక వృద్ధురాలితో 'వృద్ధులు స్వర్గంలో ప్రవేశించరు' అని చెప్పి, ఆమె కలత చెందితే 'వారు యువతిగా ప్రవేశిస్తారు' అని వివరించారు.",
          en: "Yes, and he smiled often: he said smiling at your brother's face is a charity (Tirmidhi). He joked too, but never with a falsehood in it. He told an old woman that the elderly do not enter Paradise, and when she was upset explained that they enter it young.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఖురాన్ 68:4 ఆయన గురించి ఏమి చెబుతుంది?", en: "What does Quran 68:4 say about him?" },
        options: [
          { te: "'నీవు గొప్ప స్వభావంపై ఉన్నావు'", en: "You are of a great character" },
          { te: "'నీవు బలవంతుడివి'", en: "You are strong" },
          { te: "'నీవు ధనవంతుడివి'", en: "You are wealthy" },
        ],
        answer: 0,
      },
      {
        question: { te: "మస్జిద్ శుభ్రం చేసిన స్త్రీ విషయంలో ఆయన ఏమి చేశారు?", en: "What did he do about the woman who cleaned the mosque?" },
        options: [
          { te: "ఆమె సమాధి వద్దకు వెళ్ళి నమాజ్ చేశారు", en: "He went to her grave and prayed over her" },
          { te: "ఏమీ చేయలేదు", en: "Nothing" },
          { te: "సహచరులను మందలించారు", en: "He rebuked the companions" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఆయన మరణించినప్పుడు ఆయన కవచం ఎక్కడ ఉంది?", en: "Where was his shield when he died?" },
        options: [
          { te: "ధాన్యం కోసం తాకట్టులో", en: "In pledge for grain" },
          { te: "మస్జిద్‌లో", en: "In the mosque" },
          { te: "ఆయన ఇంట్లో", en: "In his house" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "68:4 — గొప్ప స్వభావం.", en: "68:4, a great character." },
      { te: "వ్యక్తిగత అవమానం: క్షమ. అన్యాయం: దృఢత్వం.", en: "Personal slight: pardon. Injustice: firmness." },
      { te: "కవచం తాకట్టులో — సంపద వదిలివెళ్ళలేదు.", en: "The shield in pledge; he left no wealth." },
    ],
    summary: {
      te: "ఖురాన్ ఆయనకు ఇచ్చిన అత్యున్నత ప్రశంస ఆయన స్వభావానికి. ఇంట్లో సేవ చేసేవారు, వ్యక్తిగత అవమానానికి కోపగించలేదు కానీ అన్యాయానికి దృఢంగా ఉండేవారు, బలహీనులను గుర్తుంచుకునేవారు, శత్రువులను క్షమించేవారు, మరియు ఏమీ వదిలివెళ్ళలేదు.",
      en: "The Quran's highest praise for him is for his character. He served at home, never took offence personally but stood firm against injustice, remembered the weakest, pardoned enemies, and left nothing behind.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం ఒక వ్యక్తితో కరచాలనం చేసినప్పుడు మీరు మొదట చేయి వెనక్కి తీసుకోకండి.",
      en: "Apply it: this week, do not be the first to withdraw your hand from a handshake.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "The companions", url: "/knowledge-center/seerah/the-companions" },
    ],
  },

  {
    slug: "the-companions",
    portal: "seerah",
    title: {
      te: "స్థాయి 7 — సహాబా",
      en: "Level 7 — The companions",
    },
    intro: {
      te: "సహాబా ఒక ఏకరూప సమూహం కాదు. వారిలో ధనవంతులు, బానిసలు, అరబ్బులు, పర్షియన్లు, అబిసీనియన్లు, రోమన్లు, పురుషులు, మహిళలు ఉన్నారు. ఆ వైవిధ్యమే ఇస్లాం సందేశం గురించి ఒక విషయాన్ని చెబుతుంది.",
      en: "The companions were not one kind of person. Among them were the wealthy and the enslaved, Arabs, Persians, Abyssinians and Romans, men and women. That range says something about the message itself.",
    },
    sections: [
      {
        heading: { te: "నలుగురు ఖలీఫాలు — నాలుగు వేర్వేరు స్వభావాలు", en: "The four caliphs, four different temperaments" },
        body: {
          te: "అబూ బక్ర్ (ర/అ): మృదువైనవారు, కంటినీరు తేలికగా వచ్చేవారు, కానీ రిద్దా సంక్షోభంలో అందరికంటే దృఢంగా నిలిచారు. ఉమర్ (ర/అ): కఠినులు, భయపెట్టేవారు — కానీ ఖురాన్ చదవడం విని ఇస్లాం స్వీకరించారు, మరియు ఖలీఫాగా ఒక కంచర గాడిద గురించి కూడా జవాబుదారీ అనుభూతి చెందారు. ఉస్మాన్ (ర/అ): అత్యంత సిగ్గరి, ఉదారుడు — తబూక్ సైన్యంలో మూడో వంతును స్వయంగా సమకూర్చారు. అలీ (ర/అ): జ్ఞాని, ధైర్యవంతుడు, వాక్చాతుర్యం ఉన్నవారు. ఒకే వ్యక్తిత్వ నమూనా లేదు — ఇది ముఖ్యం.",
          en: "Abu Bakr (RA): soft, quick to tears, and yet the firmest of them all in the Ridda crisis. Umar (RA): stern and formidable, who came to Islam on hearing the Quran recited, and as caliph felt answerable even for a stumbling mule. Uthman (RA): the most reticent and the most generous, who equipped a third of the army at Tabuk himself. Ali (RA): learned, courageous, eloquent. There is no single personality type here, and that matters.",
        },
        check: {
          question: { te: "నలుగురు ఖలీఫాల గురించి ఏది సరైనది?", en: "Which is true of the four caliphs?" },
          options: [
            { te: "వారి స్వభావాలు నాలుగూ వేర్వేరు", en: "Their temperaments were quite different" },
            { te: "వారందరూ ఒకేలా ఉండేవారు", en: "They were all alike" },
            { te: "వారందరూ ధనవంతులు", en: "They were all wealthy" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "బయటివారు లోపలివారయ్యారు", en: "Outsiders who became central" },
        body: {
          te: "బిలాల్ (ర/అ) — అబిసీనియా మూలానికి చెందిన బానిస — ఇస్లాం మొదటి ముఅజ్జిన్ అయ్యారు. సల్మాన్ (ర/అ) — పర్షియా నుండి వచ్చి బానిసగా అమ్మబడ్డారు — ఖందఖ్ వ్యూహాన్ని ఇచ్చారు, మరియు ప్రవక్త ﷺ 'సల్మాన్ మా ఇంటివారిలోని ఒకరు' అన్నారు. సుహైబ్ (ర/అ)ను 'అర్-రూమీ' — రోమన్ — అని పిలిచేవారు. అబ్దుల్లాహ్ బిన్ ఉమ్మ్ మక్తూమ్ (ర/అ) అంధులు, మరియు ఆయన కోసమే సూరా అబస అవతరించింది — ప్రవక్త ﷺనే సరిదిద్దుతూ. గోత్రం, జాతి, స్థితి ఏవీ ప్రవేశానికి అడ్డు కాలేదు.",
          en: "Bilal (RA), a slave of Abyssinian origin, became the first to call the prayer. Salman (RA), a Persian who had been sold into slavery, gave the strategy at Khandaq, and the Prophet ﷺ said Salman is one of us, the people of the house. Suhayb (RA) was known as ar-Rumi, the Roman. Abdullah ibn Umm Maktum (RA) was blind, and Surah Abasa was revealed on his account, correcting the Prophet ﷺ himself. Neither tribe, race nor status barred the door.",
        },
        check: {
          question: { te: "సల్మాన్ ఫారిసీ (ర/అ) గురించి ప్రవక్త ﷺ ఏమన్నారు?", en: "What did the Prophet ﷺ say about Salman al-Farisi (RA)?" },
          options: [
            { te: "'సల్మాన్ మా ఇంటివారిలోని ఒకరు'", en: "Salman is one of us, the people of the house" },
            { te: "'సల్మాన్ ఒక అతిథి'", en: "Salman is a guest" },
            { te: "ఏమీ అనలేదు", en: "Nothing" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సహాబియ్యాత్ — మహిళా సహచరులు", en: "The women among them" },
        body: {
          te: "ఖదీజా (ర/అ): మొదటి ముస్లిం, మొదటి మద్దతుదారు. ఆయిషా (ర/అ): రెండు వేలకు పైగా హదీసులు ఉల్లేఖించారు, ఫిఖ్హ్‌లో ప్రామాణిక వ్యక్తి; సహచరులు ఆమెను ప్రశ్నలు అడిగేవారు. ఉమ్మ్ సలమా (ర/అ): హుదైబియా వద్ద పరిస్థితి ఉద్రిక్తంగా ఉన్నప్పుడు ప్రవక్త ﷺకు వ్యూహాత్మక సలహా ఇచ్చారు, మరియు ఆమె సలహా పనిచేసింది. నుసైబా బింత్ కఅబ్ (ర/అ): ఉహుద్‌లో ప్రవక్త ﷺను రక్షిస్తూ పోరాడారు. అస్మా బింత్ అబీ బక్ర్ (ర/అ): హిజ్రత్ సమయంలో సౌర్ గుహకు ఆహారం తీసుకువెళ్ళారు. వీరు అంచున ఉన్నవారు కాదు — వీరు ఆ కథలో భాగం.",
          en: "Khadijah (RA): the first Muslim and the first support. Aisha (RA): narrated over two thousand hadith and was an authority in fiqh whom the companions came to with questions. Umm Salamah (RA): gave the Prophet ﷺ strategic advice at a tense moment at Hudaybiyyah, and it worked. Nusaybah bint Ka'b (RA): fought defending him at Uhud. Asma bint Abi Bakr (RA): carried food to the cave of Thawr during the Hijrah. These are not figures at the edge of the story; they are in it.",
        },
      },
      {
        heading: { te: "వారు పరిపూర్ణులు కాదు", en: "They were not flawless" },
        body: {
          te: "ఇది నిజాయితీగా చెప్పాలి. సహాబా పొరపాట్లు చేశారు — ఉహుద్‌లో విలుకాళ్ళు ఆదేశం పాటించలేదు; హునైన్‌లో కొందరు మొదట పారిపోయారు; తర్వాత వారి మధ్య తీవ్రమైన రాజకీయ విభేదాలు, యుద్ధాలు జరిగాయి. ఖురాన్ ఈ పొరపాట్లను దాచలేదు. వారి గొప్పతనం లోపరహితత్వం కాదు — అది వారి త్యాగం, వారి నిజాయితీ, మరియు వారు ఈ దీన్‌ను తర్వాతి తరానికి అందించడం. వారిని ఆరాధ్య వ్యక్తులుగా కాక అనుసరించదగిన మనుషులుగా చూడటమే సరైనది.",
          en: "This should be said honestly. The companions made mistakes: the archers disobeyed at Uhud, some fled at first at Hunayn, and later there were severe political disputes and wars among them. The Quran does not hide these. Their greatness is not flawlessness but their sacrifice, their honesty, and their carrying this religion to the next generation. Seeing them as people to follow rather than figures to venerate is the sound way to read them.",
        },
      },
    ],
    takeaways: [
      { te: "సహాబా ఏకరూప సమూహం కాదు — స్వభావాలు, జాతులు, స్థితులు వేర్వేరు.", en: "The companions were not one kind of person, in temperament, race or status." },
      { te: "బానిసలు, విదేశీయులు, అంధులు, మహిళలు — అందరూ కేంద్రంలో ఉన్నారు.", en: "The enslaved, foreigners, the blind and women were all central." },
      { te: "వారు పరిపూర్ణులు కాదు; ఖురాన్ వారి పొరపాట్లను దాచలేదు.", en: "They were not flawless, and the Quran does not hide their errors." },
    ],
    didYouKnow: [
      { te: "ఆయిషా (ర/అ) రెండు వేలకు పైగా హదీసులు ఉల్లేఖించారు, మరియు సహచరులు ఫిఖ్హ్ ప్రశ్నలకు ఆమెను ఆశ్రయించేవారు.", en: "Aisha (RA) narrated over two thousand hadith, and companions turned to her with questions of fiqh." },
      { te: "సూరా అబస ఒక అంధ సహచరుడి విషయంలో ప్రవక్త ﷺనే సరిదిద్దుతూ అవతరించింది.", en: "Surah Abasa was revealed correcting the Prophet ﷺ himself over a blind companion." },
    ],
    reflect: [
      { te: "ఈ సహచరులలో ఎవరి కథ మీకు అత్యంత దగ్గరగా అనిపిస్తుంది? ఎందుకు?", en: "Whose story among them feels closest to your own, and why?" },
    ],
    mistakes: [
      { te: "సహాబాను దోషరహితులుగా చిత్రించడం — ఖురాన్ అలా చేయలేదు.", en: "Portraying the companions as infallible, which the Quran does not." },
      { te: "మహిళా సహచరులను కథ అంచుకు నెట్టడం.", en: "Pushing the women among them to the edge of the story." },
    ],
    faqs: [
      {
        question: { te: "'సహాబీ' అంటే ఎవరు?", en: "Who counts as a companion?" },
        answer: {
          te: "ప్రవక్త ﷺను విశ్వాసిగా కలిసి, విశ్వాసిగానే మరణించిన ఎవరైనా — ఇది ఎక్కువగా అంగీకరించబడిన నిర్వచనం. దీని ప్రకారం లక్షకు పైగా సహాబా ఉన్నారు; వీడ్కోలు హజ్‌లోనే లక్షకు పైగా హాజరయ్యారు.",
          en: "Anyone who met the Prophet ﷺ as a believer and died as one, on the most widely accepted definition. By that reckoning there were over a hundred thousand, and more than that attended the farewell Hajj alone.",
        },
      },
      {
        question: { te: "వారి మధ్య వివాదాల గురించి మనం ఏమి చేయాలి?", en: "What should we do about the disputes among them?" },
        answer: {
          te: "అహ్లుస్-సున్నహ్ సాంప్రదాయ స్థానం: వారి మధ్య జరిగినదానిపై పక్షం వహించకుండా, ఇద్దరి పట్లా గౌరవం ఉంచడం, మరియు వాటిని నేటి ముస్లింల మధ్య విభజనకు కారణంగా మార్చకపోవడం. ఖురాన్ 59:10 దీనికి ఒక దుఆను ఇస్తుంది: 'మా ముందు విశ్వసించిన మా సోదరులను క్షమించు, మా హృదయాలలో విశ్వాసుల పట్ల ద్వేషం ఉంచవద్దు'.",
          en: "The traditional Sunni position is to withhold from taking sides, hold both in respect, and not let those events become a source of division among Muslims now. Quran 59:10 gives a supplication for exactly this: forgive our brothers who preceded us in faith, and put no rancour in our hearts towards the believers.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఇస్లాం మొదటి ముఅజ్జిన్ ఎవరు?", en: "Who was the first to call the prayer in Islam?" },
        options: [
          { te: "బిలాల్ (ర/అ)", en: "Bilal (RA)" },
          { te: "సల్మాన్ (ర/అ)", en: "Salman (RA)" },
          { te: "సుహైబ్ (ర/అ)", en: "Suhayb (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "హుదైబియా వద్ద వ్యూహాత్మక సలహా ఎవరు ఇచ్చారు?", en: "Who gave strategic advice at Hudaybiyyah?" },
        options: [
          { te: "ఉమ్మ్ సలమా (ర/అ)", en: "Umm Salamah (RA)" },
          { te: "ఉమర్ (ర/అ)", en: "Umar (RA)" },
          { te: "అబూ బక్ర్ (ర/అ)", en: "Abu Bakr (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "సూరా అబస ఎవరి విషయంలో అవతరించింది?", en: "Surah Abasa was revealed concerning whom?" },
        options: [
          { te: "ఒక అంధ సహచరుడు", en: "A blind companion" },
          { te: "ఒక ఖురైష్ నాయకుడు", en: "A leader of Quraysh" },
          { te: "ఒక యూదు పండితుడు", en: "A Jewish scholar" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అబూ బక్ర్ · ఉమర్ · ఉస్మాన్ · అలీ — నాలుగు వేర్వేరు స్వభావాలు.", en: "Abu Bakr, Umar, Uthman, Ali: four different temperaments." },
      { te: "బిలాల్, సల్మాన్, సుహైబ్, ఇబ్న్ ఉమ్మ్ మక్తూమ్.", en: "Bilal, Salman, Suhayb, Ibn Umm Maktum." },
      { te: "ఖురాన్ 59:10 — సహాబా కోసం దుఆ.", en: "Quran 59:10, the supplication for them." },
    ],
    summary: {
      te: "సహాబా వైవిధ్యభరితమైన సమూహం — నాలుగు వేర్వేరు స్వభావాల ఖలీఫాలు, బానిసలు, విదేశీయులు, అంధులు, మరియు కేంద్ర స్థానంలో ఉన్న మహిళలు. వారు పరిపూర్ణులు కాదు, మరియు ఖురాన్ వారి పొరపాట్లను దాచలేదు. వారి గొప్పతనం త్యాగం, నిజాయితీ, మరియు ఈ దీన్‌ను అందించడం.",
      en: "The companions were a varied group: four caliphs of quite different temperaments, the enslaved, foreigners, the blind, and women who were central rather than peripheral. They were not flawless and the Quran does not hide it. Their greatness lies in sacrifice, honesty, and carrying this religion forward.",
    },
    apply: {
      te: "ఆచరణ: ఒక సహచరుడి జీవితాన్ని ఈ వారం చదివి, వారి ఒక లక్షణాన్ని గుర్తించండి.",
      en: "Apply it: read the life of one companion this week and name one quality of theirs.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "The Rashidun Caliphate", url: "/knowledge-center/islamic-history/rashidun" },
    ],
  },

  {
    slug: "applying-the-seerah-today",
    portal: "seerah",
    title: {
      te: "స్థాయి 8 — సీరత్‌ను నేటికి తీసుకురావడం",
      en: "Level 8 — Bringing the seerah into now",
    },
    intro: {
      te: "సీరత్ చదవడం ఒక చారిత్రక వ్యాయామం కాదు. ఖురాన్ చెబుతుంది: 'నిశ్చయంగా అల్లాహ్ ప్రవక్తలో మీకు ఒక ఉత్తమ ఆదర్శం ఉంది' (అల్-అహ్‌జాబ్ 33:21). ఆదర్శం అంటే అనుసరించదగినది — ప్రశంసించదగినది మాత్రమే కాదు.",
      en: "Reading the seerah is not a historical exercise. The Quran says: 'There is for you in the Messenger of Allah an excellent example' (Al-Ahzab 33:21). An example is something to follow, not only to admire.",
    },
    sections: [
      {
        heading: { te: "కుటుంబంలో", en: "In the family" },
        body: {
          te: "నిర్దిష్టంగా చేయగలిగినవి: ఇంటి పనుల్లో సహాయపడండి — ఆయిషా (ర/అ) ఆయన అలా చేసేవారని చెప్పారు. భోజనాన్ని విమర్శించవద్దు. పిల్లలకు సలామ్ చెప్పండి, వారితో ఆడుకోండి — ఆయన మనవళ్ళను భుజాలపై ఎక్కించుకుని నమాజ్ చేసేవారు, సజ్దాలో వారు వీపుపై ఎక్కితే వారు దిగేవరకు ఆగేవారు. కుటుంబంలో నిర్ణయాలు సంప్రదింపుతో తీసుకోండి — ఉమ్మ్ సలమా (ర/అ) సలహాను ఆయన స్వీకరించడం దీనికి ఉదాహరణ.",
          en: "Concrete things to do: help with the housework, which Aisha (RA) said he did. Do not criticise food. Greet children and play with them; he carried his grandchildren on his shoulders in prayer and, when they climbed on his back in prostration, waited until they came down. Make family decisions by consultation, as when he took Umm Salamah's (RA) advice.",
        },
        check: {
          question: { te: "ఖురాన్ 33:21 ప్రవక్త ﷺను ఏమని వర్ణిస్తుంది?", en: "How does Quran 33:21 describe the Prophet ﷺ?" },
          options: [
            { te: "ఒక ఉత్తమ ఆదర్శం", en: "An excellent example" },
            { te: "ఒక రాజు", en: "A king" },
            { te: "ఒక చరిత్రకారుడు", en: "A historian" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "పనిలో, వ్యాపారంలో", en: "At work and in business" },
        body: {
          te: "ఆయన ఖ్యాతి 'అల్-అమీన్' — వ్యాపారంలో సంపాదించినది. లోపాన్ని దాచడం గురించి ఆయన స్పష్టంగా చెప్పారు: ధాన్యపు కుప్పలో చేయి పెట్టి కింద తడిగా ఉండటం చూసి 'ఇది ఏమిటి?' అని అడిగి, 'ఎవరైతే మమ్మల్ని మోసం చేస్తారో వారు మాలోని వారు కాదు' అన్నారు (ముస్లిం). ఇతర ఆచరణీయ అంశాలు: కూలీ ఇచ్చే విషయం — 'కూలివాడి చెమట ఆరకముందే అతని కూలి ఇవ్వండి' (ఇబ్న్ మాజా). ఒప్పందాలను రాతపూర్వకంగా చేయడం — ఖురాన్‌లోని అత్యంత పొడవైన ఆయత్ అప్పు లావాదేవీలను రాయడం గురించే (అల్-బఖరా 2:282).",
          en: "His standing as al-Ameen was earned in trade. On concealing a defect he was direct: putting his hand into a heap of grain and finding it wet underneath, he asked what this was and said whoever deceives us is not one of us (Muslim). Other practical points: pay a worker before his sweat dries (Ibn Majah); and put agreements in writing, since the longest verse in the Quran is about recording debts (Al-Baqarah 2:282).",
        },
      },
      {
        heading: { te: "విభేదాలలో", en: "In disagreement" },
        body: {
          te: "సీరత్‌లో దీనికి పుష్కలమైన ఉదాహరణలు ఉన్నాయి, మరియు అవి నేటి సమాజాలకు నేరుగా వర్తిస్తాయి. కాబా రాయి వివాదంలో ఆయన అన్ని పక్షాలూ గెలిచే పరిష్కారాన్ని కనుగొన్నారు. హుదైబియాలో తక్షణ గౌరవం కంటే దీర్ఘకాలిక ప్రయోజనాన్ని ఎంచుకున్నారు — తన పేరు నుండి 'అల్లాహ్ ప్రవక్త' అనే మాటను తొలగించడానికి కూడా అంగీకరించారు. మక్కా విజయంలో అధికారం ఉన్నప్పుడు క్షమించారు. ఖందఖ్‌లో ఒక విదేశీయుడి ఆలోచనను స్వీకరించారు. ఈ నాలుగూ నేటి ముస్లిం సమాజాల విభేదాలకు నేరుగా వర్తిస్తాయి.",
          en: "The seerah is full of these and they apply directly to communities now. In the dispute over the black stone he found a solution in which every party won. At Hudaybiyyah he chose the long-term gain over immediate dignity, agreeing even to have Messenger of Allah struck from his own name. At the conquest he pardoned when he held the power. At Khandaq he took a foreigner's idea. All four bear directly on how Muslim communities argue today.",
        },
        check: {
          question: { te: "హుదైబియాలో ఆయన దేన్ని ఎంచుకున్నారు?", en: "What did he choose at Hudaybiyyah?" },
          options: [
            { te: "తక్షణ గౌరవం కంటే దీర్ఘకాలిక ప్రయోజనం", en: "Long-term gain over immediate dignity" },
            { te: "వెంటనే యుద్ధం", en: "Immediate battle" },
            { te: "పూర్తి తిరస్కరణ", en: "Total refusal" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "కష్టకాలంలో", en: "In hard times" },
        body: {
          te: "సీరత్ ఇక్కడ అత్యంత ఉపయోగకరం, ఎందుకంటే అందులో కష్టం పుష్కలం. వహీ ఆగినప్పుడు ఆయన దుఃఖించారు — మరియు అల్లాహ్ ఆయనను వదిలివేయలేదు. బహిష్కరణలో మూడేళ్ళు ఆకలితో ఉన్నారు — అది ముగిసింది. ఒకే సంవత్సరంలో భార్యను, మామను కోల్పోయారు — తర్వాత మదీనా వచ్చింది. తాయిఫ్‌లో రక్తం కారుతూ తిరిగి వచ్చారు — తర్వాత మేరాజ్ వచ్చింది. ఈ నమూనా చెప్పేది: కష్టం ముగుస్తుంది, మరియు తరచూ దాని వెంటనే ఏదో వస్తుంది. ఇది ఖాళీ ఆశావాదం కాదు — ఇది ఒక జీవితంలో నమోదైన నమూనా.",
          en: "The seerah is most useful here, because it is full of hardship. When revelation paused he grieved, and he was not abandoned. Three years of hunger in the boycott, and it ended. Losing his wife and his uncle in one year, and then Madinah came. Returning from Taif bleeding, and then the Mi'raj. The pattern says that hardship ends, and that something often comes directly after it. That is not empty optimism but a pattern recorded across one life.",
        },
      },
      {
        heading: { te: "ఎలా చదవాలి", en: "How to read it" },
        body: {
          te: "ఒక ఆచరణాత్మక పద్ధతి: ప్రతి సంఘటన తర్వాత ఒక ప్రశ్న అడగండి — 'ఇది నా జీవితంలో ఎక్కడ ఉంది?' తాయిఫ్ చదివి, మిమ్మల్ని అన్యాయంగా చూసిన వ్యక్తిని గుర్తుచేసుకోండి. ఖందఖ్ చదివి, మీరు తిరస్కరించిన ఒక సలహాను గుర్తుచేసుకోండి. ఇంటి పనుల ఉల్లేఖన చదివి, ఈ రాత్రి ఒక పని చేయండి. సీరత్‌ను ఒక కథగా చదవడం సులభం; దాన్ని ఒక అద్దంగా చదవడం కష్టం, మరియు అదే దాని ఉద్దేశం.",
          en: "A practical method: after each episode ask one question, where is this in my life? Read Taif and think of someone who wronged you. Read Khandaq and think of advice you refused. Read the narration about housework and do one job tonight. Reading the seerah as a story is easy; reading it as a mirror is hard, and that is what it is for.",
        },
      },
    ],
    takeaways: [
      { te: "ఖురాన్ 33:21 — ఆదర్శం అంటే అనుసరించదగినది.", en: "Quran 33:21: an example is for following." },
      { te: "కుటుంబం, పని, విభేదం, కష్టం — నాలుగింటికీ సీరత్‌లో ఉదాహరణలు ఉన్నాయి.", en: "Family, work, disagreement and hardship all have examples in it." },
      { te: "ప్రతి సంఘటన తర్వాత అడగండి: 'ఇది నా జీవితంలో ఎక్కడ?'", en: "After each episode ask where this is in your own life." },
    ],
    didYouKnow: [
      { te: "ఖురాన్‌లోని అత్యంత పొడవైన ఆయత్ (2:282) అప్పు లావాదేవీలను రాతపూర్వకంగా నమోదు చేయడం గురించి.", en: "The longest verse in the Quran, 2:282, is about recording debts in writing." },
      { te: "ప్రవక్త ﷺ సజ్దాలో ఉండగా మనవడు వీపుపై ఎక్కితే, అతను దిగేవరకు ఆయన సజ్దాను పొడిగించారు (నసాయీ).", en: "When a grandson climbed on his back in prostration he lengthened it until the child got down (Nasa'i)." },
    ],
    reflect: [
      { te: "ఈ ఎనిమిది పాఠాల్లో మీ జీవితాన్ని అత్యంత నేరుగా తాకినది ఏది?", en: "Across these eight lessons, which touched your own life most directly?" },
    ],
    mistakes: [
      { te: "సీరత్‌ను ప్రశంసించడం, అనుసరించకపోవడం.", en: "Admiring the seerah without following it." },
      { te: "ఆయన ఉదాహరణను 'అది వేరే కాలం' అని కొట్టిపారేయడం.", en: "Dismissing his example as belonging to another age." },
    ],
    faqs: [
      {
        question: { te: "సీరత్ చదవడం ఎక్కడ మొదలుపెట్టాలి?", en: "Where should I start reading the seerah?" },
        answer: {
          te: "కొత్తవారికి ఒక సంక్షిప్త ఆధునిక సీరత్ మంచి ఆరంభం — 'అర్-రహీఖ్ అల్-మఖ్తూమ్' (ద సీల్డ్ నెక్టార్) ఉర్దూ, ఇంగ్లిష్, తెలుగులో దొరుకుతుంది. తర్వాత ఇబ్న్ హిషామ్ వంటి సాంప్రదాయ రచనలకు వెళ్ళవచ్చు. మీ స్థానిక మస్జిద్ గ్రంథాలయంలో అడగండి.",
          en: "A concise modern seerah is a good start, and Ar-Raheeq Al-Makhtum, The Sealed Nectar, is available in Urdu, English and Telugu. Classical works such as Ibn Hisham come after. Ask at your local mosque library.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'ఎవరైతే మమ్మల్ని మోసం చేస్తారో...' — ఏ సందర్భంలో?", en: "Whoever deceives us is not one of us was said in what context?" },
        options: [
          { te: "తడి ధాన్యాన్ని దాచిన వ్యాపారి", en: "A trader hiding wet grain" },
          { te: "ఒక యుద్ధంలో", en: "During a battle" },
          { te: "ఒక ఖుత్బాలో", en: "In a sermon" },
        ],
        answer: 0,
      },
      {
        question: { te: "కూలి గురించి ఆయన ఏమన్నారు?", en: "What did he say about a worker's wage?" },
        options: [
          { te: "చెమట ఆరకముందే ఇవ్వండి", en: "Pay it before his sweat dries" },
          { te: "నెలాఖరున ఇవ్వండి", en: "Pay at the end of the month" },
          { te: "పని పూర్తయ్యాక ఒక వారంలో", en: "Within a week of the work" },
        ],
        answer: 0,
      },
      {
        question: { te: "సీరత్‌ను ఎలా చదవాలని ఈ పాఠం సూచిస్తుంది?", en: "How does this lesson suggest reading the seerah?" },
        options: [
          { te: "ఒక అద్దంలా — 'ఇది నా జీవితంలో ఎక్కడ?'", en: "As a mirror: where is this in my life?" },
          { te: "ఒక కథలా", en: "As a story" },
          { te: "కేవలం తేదీల జాబితాలా", en: "As a list of dates" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "33:21 — ఉత్తమ ఆదర్శం.", en: "33:21, an excellent example." },
      { te: "కుటుంబం · పని · విభేదం · కష్టం.", en: "Family, work, disagreement, hardship." },
      { te: "ప్రతి సంఘటన తర్వాత: 'ఇది నా జీవితంలో ఎక్కడ?'", en: "After each episode: where is this in my life?" },
    ],
    summary: {
      te: "సీరత్ ఒక ఆదర్శం, అంటే అనుసరించదగినది. కుటుంబంలో, పనిలో, విభేదాలలో, కష్టకాలంలో — నాలుగింటికీ నిర్దిష్ట ఉదాహరణలు ఉన్నాయి. దాన్ని కథగా కాక అద్దంగా చదవడమే దాని ఉద్దేశం.",
      en: "The seerah is an example, which means something to follow. Family, work, disagreement and hardship each have concrete instances in it. Reading it as a mirror rather than a story is what it is for.",
    },
    apply: {
      te: "ఆచరణ: ఈ రాత్రి ఇంట్లో ఒక పని చేయండి — ఆయిషా (ర/అ) వర్ణన ప్రకారం.",
      en: "Apply it: do one job at home tonight, as Aisha (RA) described him doing.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "His character", url: "/knowledge-center/seerah/character-and-legacy" },
    ],
  },
];
