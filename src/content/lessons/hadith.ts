/* Hadith — a new portal, so these are written rather than replacements.

   The subject is easy to get wrong in a way that matters: people forward
   narrations they have never checked. So these lessons spend as much time on
   how a hadith is verified, and on what a fabrication looks like, as on the
   content of any particular narration. */
import type { Lesson } from "../lessons.ts";

export const hadithLessons: Lesson[] = [
  {
    slug: "what-is-hadith",
    portal: "hadith",
    title: {
      te: "స్థాయి 1 — హదీసు అంటే ఏమిటి",
      en: "Level 1 — What a hadith is",
    },
    intro: {
      te: "ఖురాన్ అల్లాహ్ వాక్కు. హదీసు ప్రవక్త ﷺ మాట, ఆచరణ, లేదా ఆమోదం. రెండూ వేరు, మరియు ఆ తేడా తెలియడం ముఖ్యం.",
      en: "The Quran is the word of Allah. A hadith is what the Prophet ﷺ said, did, or approved of. They are different things, and the difference matters.",
    },
    sections: [
      {
        heading: { te: "మూడు రకాలు", en: "Three kinds" },
        body: {
          te: "హదీసు మూడింటిలో ఒకటి కావచ్చు. మాట: ఆయన చెప్పినది — 'కర్మలు ఉద్దేశాలపైనే'. ఆచరణ: ఆయన చేసినది — ఆయన నమాజ్ ఎలా చేశారో సహచరులు గమనించి ఉల్లేఖించారు. ఆమోదం: ఆయన ముందు ఎవరైనా ఏదైనా చేసినప్పుడు ఆయన దాన్ని వారించకపోవడం — ఆ మౌనం అనుమతిగా పరిగణించబడుతుంది. ఉదాహరణకు కొందరు సహచరులు ఒక జంతువును తినడం ఆయన చూసి ఏమీ అనలేదు; అది అనుమతికి ఆధారమైంది.",
          en: "A hadith is one of three things. A statement, something he said, such as actions are but by intentions. An action, something he did, as when the companions watched how he prayed and passed it on. Or an approval, where something was done in his presence and he did not forbid it, and that silence counts as permission. On one occasion companions ate a certain animal in front of him and he said nothing, and that became the basis for its being allowed.",
        },
        check: {
          question: { te: "ప్రవక్త ﷺ ముందు ఏదైనా జరిగి ఆయన వారించకపోతే?", en: "If something happened before the Prophet ﷺ and he did not forbid it?" },
          options: [
            { te: "ఆ మౌనం అనుమతిగా పరిగణించబడుతుంది", en: "That silence counts as approval" },
            { te: "అది నిషేధం", en: "It is a prohibition" },
            { te: "దానికి అర్థం లేదు", en: "It carries no meaning" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇస్నాద్, మత్న్ — శృంఖల, పాఠం", en: "Isnad and matn: the chain and the text" },
        body: {
          te: "ప్రతి హదీసుకు రెండు భాగాలు. 'ఇస్నాద్' అంటే ఉల్లేఖకుల శృంఖల — 'ఫలానా వ్యక్తి ఫలానా వ్యక్తి నుండి విన్నారు, అతను ఫలానా నుండి, అతను ప్రవక్త ﷺ నుండి'. 'మత్న్' అంటే అసలు పాఠం — చెప్పబడిన మాట. హదీసు పండితులు మొదట శృంఖలను పరిశీలిస్తారు, తర్వాత పాఠాన్ని. ఇది గమనించదగినది: మాట ఎంత అందంగా ఉన్నా, శృంఖల బలహీనమైతే ఆ ఉల్లేఖన బలహీనమే.",
          en: "Every hadith has two parts. The isnad is the chain of narrators: so-and-so heard it from so-and-so, who heard it from so-and-so, who heard it from the Prophet ﷺ. The matn is the text itself, what was actually said. Scholars examine the chain first and the text second. This is worth noticing: however fine the wording, if the chain is weak the narration is weak.",
        },
        check: {
          question: { te: "'ఇస్నాద్' అంటే ఏమిటి?", en: "What is the isnad?" },
          options: [
            { te: "ఉల్లేఖకుల శృంఖల", en: "The chain of narrators" },
            { te: "హదీసు పాఠం", en: "The text of the hadith" },
            { te: "గ్రంథం పేరు", en: "The name of the book" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "హదీసు ఎందుకు అవసరం", en: "Why hadith is needed at all" },
        body: {
          te: "ఖురాన్ 'నమాజ్ స్థాపించండి' అని ఆదేశిస్తుంది, కానీ ఎన్ని రక్అత్‌లు, ఏ సమయాల్లో, ఏమి చదవాలో చెప్పదు. 'జకాత్ ఇవ్వండి' అని చెబుతుంది, కానీ ఎంత శాతమో చెప్పదు. ఆ వివరాలు హదీసు నుండే వస్తాయి. ఖురాన్ స్వయంగా దీన్ని సూచిస్తుంది: 'ప్రజలకు అవతరించినదాన్ని నీవు స్పష్టం చేయడానికి మేము నీపై ఈ స్మరణను అవతరింపజేశాము' (అన్-నహ్ల్ 16:44). అంటే వివరణ ఇవ్వడం ప్రవక్త ﷺ పనిలో భాగం.",
          en: "The Quran commands establishing the prayer but does not say how many units, at what times, or what to recite. It commands giving zakat but does not give the rate. Those details come from hadith. The Quran itself points to this: 'We revealed to you the message so that you may make clear to people what was sent down to them' (An-Nahl 16:44). Explaining is part of the Prophet's task.",
        },
      },
      {
        heading: { te: "ఖురాన్, హదీసు ఒకటి కాదు", en: "Quran and hadith are not the same thing" },
        body: {
          te: "కొన్ని తేడాలు స్పష్టంగా తెలియాలి. ఖురాన్ పదాలు అల్లాహ్‌వి; హదీసు పదాలు సాధారణంగా ప్రవక్త ﷺవి. ఖురాన్ మొత్తం ప్రామాణికం — ఒక్క పదంపైనా సందేహం లేదు; హదీసులు స్థాయిలలో ఉంటాయి — సహీహ్ నుండి కల్పితం వరకు. ఖురాన్‌ను నమాజ్‌లో పఠిస్తారు; హదీసును కాదు. ఖురాన్‌ను వుజూ లేకుండా తాకరు (మెజారిటీ అభిప్రాయం); హదీసు గ్రంథాలకు ఆ నియమం లేదు. ఒక ప్రత్యేక వర్గం ఉంది — 'హదీసు ఖుద్సీ' — అందులో అర్థం అల్లాహ్ నుండి, పదాలు ప్రవక్త ﷺవి.",
          en: "Some distinctions should be clear. The Quran's words are Allah's; a hadith's words are generally the Prophet's. The Quran is authentic throughout, with no doubt over a single word; hadith come in grades, from sahih down to fabricated. The Quran is recited in prayer; hadith is not. The Quran is not touched without wudu in the majority view, while that rule does not apply to books of hadith. There is one special category, hadith qudsi, where the meaning is from Allah and the wording is the Prophet's.",
        },
      },
    ],
    takeaways: [
      { te: "హదీసు = మాట, ఆచరణ, లేదా ఆమోదం.", en: "A hadith is a statement, an action, or an approval." },
      { te: "ఇస్నాద్ (శృంఖల) + మత్న్ (పాఠం) — రెండూ పరిశీలించబడతాయి.", en: "Isnad and matn, the chain and the text, are both examined." },
      { te: "నమాజ్ ఎలా చేయాలో ఖురాన్ చెప్పదు; హదీసు చెబుతుంది.", en: "The Quran does not say how to pray; hadith does." },
    ],
    didYouKnow: [
      { te: "'హదీసు' అనే అరబిక్ పదానికి అర్థం 'కొత్త విషయం' లేదా 'చెప్పబడినది' — వార్త అనే భావనకు దగ్గరగా.", en: "The Arabic word hadith means something new or something related, close to the idea of a report." },
      { te: "ఇస్నాద్ వ్యవస్థ ప్రపంచ చరిత్రలో ఒక అసాధారణ విషయం — ఏ ఇతర సంప్రదాయమూ ఇంత వివరమైన ఉల్లేఖకుల నమోదును అభివృద్ధి చేయలేదు.", en: "The isnad system is unusual in world history; no other tradition developed so detailed a record of who passed on what." },
    ],
    reflect: [
      { te: "మీరు చివరిసారి ఒక ఇస్లామిక్ సందేశాన్ని ఫార్వర్డ్ చేసినప్పుడు దాని మూలం చూశారా?", en: "The last time you forwarded an Islamic message, did you check its source?" },
    ],
    mistakes: [
      { te: "ఖురాన్‌లోని ఆయతును హదీసుగా, హదీసును ఆయతుగా చెప్పడం.", en: "Quoting a Quranic verse as a hadith, or a hadith as a verse." },
      { te: "శృంఖలను చూడకుండా పాఠం అందంగా ఉందని స్వీకరించడం.", en: "Accepting a text because it reads well, without looking at the chain." },
    ],
    faqs: [
      {
        question: { te: "హదీసు లేకుండా ఖురాన్ మాత్రమే సరిపోతుందా?", en: "Is the Quran alone enough, without hadith?" },
        answer: {
          te: "ఆచరణాత్మకంగా కాదు, మరియు ఖురాన్ స్వయంగా అలా చెప్పదు. ఖురాన్ పదేపదే 'అల్లాహ్‌కు, ఆయన ప్రవక్తకు విధేయత చూపండి' అని ఆదేశిస్తుంది. మరియు నమాజ్ ఎలా చేయాలో ఖురాన్‌లో లేదు — హదీసు లేకుండా ఏ ముస్లిమూ నమాజ్ చేయలేరు. ఇది సైద్ధాంతిక వాదన కాదు; ఇది ఆచరణాత్మక వాస్తవం.",
          en: "Not in practice, and the Quran does not say so of itself. It repeatedly commands obeying Allah and obeying His Messenger. And how to pray is not in the Quran, so without hadith no Muslim could perform the prayer at all. That is not a theoretical argument but a practical fact.",
        },
      },
      {
        question: { te: "'హదీసు ఖుద్సీ' అంటే ఏమిటి?", en: "What is a hadith qudsi?" },
        answer: {
          te: "ప్రవక్త ﷺ 'అల్లాహ్ చెప్పాడు...' అని ఉల్లేఖించే ఒక ప్రత్యేక వర్గం. అందులో అర్థం అల్లాహ్ నుండి, కానీ పదాలు ప్రవక్త ﷺవి. ఇది ఖురాన్ కాదు — నమాజ్‌లో పఠించరు, మరియు ఖురాన్‌కు ఉన్న అదే స్థాయి లేదు. ఉదాహరణ: 'నా కారుణ్యం నా ఆగ్రహాన్ని అధిగమిస్తుంది' (బుఖారీ).",
          en: "A category in which the Prophet ﷺ relates that Allah said something. The meaning is from Allah while the wording is the Prophet's. It is not the Quran: it is not recited in prayer and does not carry the same standing. An example is 'My mercy prevails over My wrath' (Bukhari).",
        },
      },
    ],
    quiz: [
      {
        question: { te: "హదీసులో 'మత్న్' అంటే ఏమిటి?", en: "What is the matn of a hadith?" },
        options: [
          { te: "అసలు పాఠం", en: "The text itself" },
          { te: "ఉల్లేఖకుల శృంఖల", en: "The chain of narrators" },
          { te: "గ్రంథ రచయిత", en: "The compiler" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్ 16:44 ప్రవక్త ﷺ పని ఏమని చెబుతుంది?", en: "What does Quran 16:44 say the Prophet's task includes?" },
        options: [
          { te: "అవతరించినదాన్ని ప్రజలకు స్పష్టం చేయడం", en: "Making clear to people what was sent down" },
          { te: "కొత్త గ్రంథం రాయడం", en: "Writing a new book" },
          { te: "ఖురాన్‌ను మార్చడం", en: "Changing the Quran" },
        ],
        answer: 0,
      },
      {
        question: { te: "'హదీసు ఖుద్సీ'లో పదాలు ఎవరివి?", en: "In a hadith qudsi, whose are the words?" },
        options: [
          { te: "ప్రవక్త ﷺవి; అర్థం అల్లాహ్ నుండి", en: "The Prophet's, with the meaning from Allah" },
          { te: "పూర్తిగా అల్లాహ్‌వి, ఖురాన్ లాగే", en: "Entirely Allah's, as in the Quran" },
          { te: "ఉల్లేఖకుడివి", en: "The narrator's" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "మాట · ఆచరణ · ఆమోదం.", en: "Statement, action, approval." },
      { te: "ఇస్నాద్ = శృంఖల; మత్న్ = పాఠం.", en: "Isnad is the chain; matn is the text." },
      { te: "హదీసు ఖుద్సీ: అర్థం అల్లాహ్ నుండి, పదాలు ప్రవక్త ﷺవి.", en: "Hadith qudsi: meaning from Allah, wording from the Prophet." },
    ],
    summary: {
      te: "హదీసు ప్రవక్త ﷺ మాట, ఆచరణ, లేదా ఆమోదం. ప్రతిదానికీ శృంఖల (ఇస్నాద్), పాఠం (మత్న్) ఉన్నాయి, మరియు రెండూ పరిశీలించబడతాయి. ఖురాన్ ఆదేశాలను ఆచరించడానికి కావలసిన వివరాలు హదీసు నుండే వస్తాయి.",
      en: "A hadith is what the Prophet ﷺ said, did or approved. Each has a chain and a text, and both are examined. The detail needed to act on the Quran's commands comes from hadith.",
    },
    apply: {
      te: "ఆచరణ: ఈ పోర్టల్‌లోని ఒక హదీసును ఎంచుకుని, దాని మూలాన్ని, స్థాయిని గమనించండి.",
      en: "Apply it: pick one hadith on this portal and note both its source and its grade.",
    },
    reading: [
      { label: "Hadith portal", url: "/knowledge-center/hadith" },
      { label: "How hadith was checked", url: "/knowledge-center/hadith/how-it-was-checked" },
    ],
  },

  {
    slug: "how-it-was-checked",
    portal: "hadith",
    title: {
      te: "స్థాయి 2 — ఉల్లేఖనలు ఎలా పరిశీలించబడ్డాయి",
      en: "Level 2 — How narrations were checked",
    },
    intro: {
      te: "ఒక మాట నిజంగా ప్రవక్త ﷺది అని ఎలా నిర్ధారిస్తారు? దీనికోసం ముస్లిం పండితులు ఒక పూర్తి శాస్త్రాన్ని అభివృద్ధి చేశారు — మరియు అది చాలా కఠినమైనది.",
      en: "How do you establish that a saying really is the Prophet's? Muslim scholars built a whole discipline for it, and it is a demanding one.",
    },
    sections: [
      {
        heading: { te: "అది ఎప్పుడు, ఎందుకు మొదలైంది", en: "When and why it began" },
        body: {
          te: "ప్రవక్త ﷺ కాలంలో ఉల్లేఖనలను పరిశీలించే అవసరం లేదు — ఎవరైనా అబద్ధం చెబితే ఆయనను నేరుగా అడగవచ్చు. కానీ మొదటి ఫిత్నా తర్వాత, రాజకీయ వర్గాలు ఏర్పడిన తర్వాత, తమ పక్షాన్ని బలపరచడానికి ఉల్లేఖనలు కల్పించడం మొదలైంది. అప్పుడు పండితులు ఒక కొత్త ప్రశ్న అడగడం మొదలుపెట్టారు, అది ఇబ్న్ సీరీన్ (మ. 110 హి) మాటల్లో ఉంది: 'ఇంతకుముందు మేము ఇస్నాద్ గురించి అడిగేవాళ్ళం కాదు. ఫిత్నా వచ్చిన తర్వాత మేము అనడం మొదలుపెట్టాం — మీ ఉల్లేఖకులను పేర్కొనండి' (ముస్లిం, పరిచయంలో).",
          en: "In the Prophet's lifetime there was no need to check a narration; if someone misreported, you could ask him directly. After the first fitna, once political factions had formed, narrations began to be invented to support one side. Scholars then started asking a new question, put by Ibn Sirin, who died in 110 AH: we did not used to ask about the isnad, but when the fitna came we said, name us your narrators (Muslim, in his introduction).",
        },
        check: {
          question: { te: "ఇస్నాద్ గురించి అడగడం ఎప్పుడు మొదలైంది?", en: "When did asking about the isnad begin?" },
          options: [
            { te: "మొదటి ఫిత్నా తర్వాత", en: "After the first fitna" },
            { te: "ప్రవక్త ﷺ కాలంలో", en: "In the Prophet's lifetime" },
            { te: "ఇరవయ్యో శతాబ్దంలో", en: "In the twentieth century" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఉల్లేఖకుడిని పరిశీలించడం", en: "Examining the narrator" },
        body: {
          te: "ఒక ఉల్లేఖకుడిని అంగీకరించడానికి రెండు విషయాలు అవసరం. 'అదాలహ్' — నైతిక సమగ్రత: ఆ వ్యక్తి నిజాయితీపరుడా, పెద్ద పాపాలకు పాల్పడేవాడా, అబద్ధం చెప్పినట్లు తెలిసిందా? 'దబ్త్' — ఖచ్చితత్వం: ఆ వ్యక్తి జ్ఞాపకశక్తి బలమైనదా, ఆయన ఉల్లేఖనలు ఇతరులవాటితో సరిపోతున్నాయా, వృద్ధాప్యంలో గందరగోళపడ్డాడా? ఒక వ్యక్తి పరమ భక్తుడైనా జ్ఞాపకశక్తి బలహీనమైతే ఆయన ఉల్లేఖనలు అంగీకరించబడవు. ఇది ముఖ్యమైన విషయం: భక్తి సరిపోదు, ఖచ్చితత్వం కూడా కావాలి.",
          en: "Accepting a narrator required two things. Adalah, moral integrity: is this person honest, do they commit major sins, are they known to have lied? And dabt, precision: is the memory sound, do their narrations agree with others', did they become confused in old age? A deeply pious person with a weak memory has their narrations set aside. That point matters: piety is not sufficient, accuracy is also required.",
        },
        check: {
          question: { te: "ఒక భక్తుడైన వ్యక్తి జ్ఞాపకశక్తి బలహీనమైతే?", en: "If a pious person has a weak memory?" },
          options: [
            { te: "ఆయన ఉల్లేఖనలు అంగీకరించబడవు", en: "Their narrations are not accepted" },
            { te: "భక్తి సరిపోతుంది", en: "Piety is enough" },
            { te: "అది పట్టించుకోరు", en: "It is not considered" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇల్మ్ అర్-రిజాల్ — ఉల్లేఖకుల శాస్త్రం", en: "Ilm ar-rijal, the science of the narrators" },
        body: {
          te: "దీనికోసం పండితులు ఒక అపారమైన పని చేపట్టారు: ప్రతి ఉల్లేఖకుడి గురించి జీవిత వివరాలు సేకరించడం. వారు ఎప్పుడు పుట్టారు, ఎక్కడ నివసించారు, ఎవరి నుండి విన్నారు, ఎవరు వారి నుండి విన్నారు, వారి నైతిక స్థితి, జ్ఞాపకశక్తి ఎలా ఉండేది. ఈ జీవిత చరిత్ర నిఘంటువులు వేలాది వ్యక్తులను కవర్ చేస్తాయి; ఇబ్న్ హజర్ 'తహ్‌జీబ్ అత్-తహ్‌జీబ్' పన్నెండు సంపుటాలు. ఒక శృంఖలలోని రెండు వ్యక్తులు ఎప్పుడూ కలవలేదని — ఒకరు మరొకరు పుట్టకముందే మరణించారని — నిరూపించగలిగితే ఆ శృంఖల తెగిపోయినట్లే.",
          en: "For this, scholars undertook an enormous task: compiling biographical detail on every narrator. When they were born, where they lived, whom they heard from, who heard from them, their moral standing and the state of their memory. These biographical dictionaries cover thousands of people; Ibn Hajar's Tahdhib at-Tahdhib runs to twelve volumes. If two people in a chain could be shown never to have met, one having died before the other was born, the chain is broken.",
        },
      },
      {
        heading: { te: "పాఠాన్ని కూడా పరిశీలిస్తారు", en: "The text is examined too" },
        body: {
          te: "శృంఖల బాగున్నా, పాఠంలో సమస్య ఉంటే పండితులు దాన్ని తిరస్కరించారు. వారు అడిగిన ప్రశ్నలు: ఇది ఖురాన్‌కు స్పష్టంగా విరుద్ధమా? ఇది తెలిసిన చరిత్రకు విరుద్ధమా? ఇది స్పష్టమైన హేతువుకు విరుద్ధమా? చిన్న పనికి అపారమైన ప్రతిఫలం, లేదా చిన్న తప్పుకు అపారమైన శిక్ష వాగ్దానం చేస్తోందా? ప్రవక్త ﷺ మాటల శైలికి ఇది సరిపోతుందా? ఈ చివరిది ముఖ్యం — ఆయన మాటలు సంక్షిప్తంగా, స్పష్టంగా, గంభీరంగా ఉండేవి. అతిశయోక్తులతో నిండిన పొడవాటి పాఠాలు అనుమానాస్పదం.",
          en: "Even with a sound chain, scholars rejected a text with a problem in it. The questions they asked: does it plainly contradict the Quran? Does it contradict known history? Does it contradict clear reason? Does it promise an enormous reward for a trivial act, or an enormous punishment for a trivial fault? Does it match the way the Prophet ﷺ spoke? That last one matters, because his speech was concise, clear and weighty. Long passages full of extravagant claims are suspect.",
        },
      },
      {
        heading: { te: "కల్పితాలను ఎలా గుర్తించాలి", en: "How to spot a fabrication" },
        body: {
          te: "నేటికీ ఉపయోగపడే కొన్ని సూచనలు. మూలం లేదు — 'ప్రవక్త ﷺ చెప్పారు' అని ఉంటుంది కానీ ఏ గ్రంథమో లేదు. అసమాన వాగ్దానం — 'ఈ దుఆను ఏడుసార్లు చదివితే ఏడు వందల పాపాలు క్షమించబడతాయి'. ఫార్వర్డ్ చేయమని ఒత్తిడి — 'పది మందికి పంపండి, లేకపోతే...'. ఖురాన్‌కు విరుద్ధం. మరియు ఒక ముఖ్యమైన హెచ్చరిక: ప్రవక్త ﷺ చెప్పారు — 'ఎవరైతే నాపై ఉద్దేశపూర్వకంగా అబద్ధం చెబుతారో, వారు నరకంలో తమ స్థానాన్ని సిద్ధం చేసుకోవాలి' (బుఖారీ, ముస్లిం). పరిశీలించని సందేశాన్ని ఫార్వర్డ్ చేయడం చిన్న విషయం కాదు.",
          en: "Some signs still useful today. No source: it says the Prophet ﷺ said, with no book named. A disproportionate promise: read this du'a seven times and seven hundred sins are forgiven. Pressure to forward: send this to ten people or else. Contradicting the Quran. And one serious warning: the Prophet ﷺ said whoever lies about me deliberately should take his seat in the Fire (Bukhari and Muslim). Forwarding an unchecked message is not a small matter.",
        },
      },
    ],
    takeaways: [
      { te: "ఇస్నాద్ పరిశీలన మొదటి ఫిత్నా తర్వాత మొదలైంది.", en: "Checking the isnad began after the first fitna." },
      { te: "ఉల్లేఖకుడికి నైతిక సమగ్రత, ఖచ్చితత్వం రెండూ కావాలి.", en: "A narrator needs both moral integrity and precision." },
      { te: "శృంఖల బాగున్నా పాఠంలో సమస్య ఉంటే తిరస్కరిస్తారు.", en: "A sound chain does not save a text with a problem in it." },
    ],
    didYouKnow: [
      { te: "ఇబ్న్ హజర్ 'తహ్‌జీబ్ అత్-తహ్‌జీబ్' ఉల్లేఖకుల జీవిత వివరాలతో పన్నెండు సంపుటాలు.", en: "Ibn Hajar's biographical dictionary of narrators runs to twelve volumes." },
      { te: "ఒక ఉల్లేఖకుడి గురించి 'అతను వృద్ధాప్యంలో గందరగోళపడ్డాడు' అని నమోదైతే, ఆ కాలం తర్వాతి ఆయన ఉల్లేఖనలను వేరుగా పరిగణిస్తారు.", en: "If a narrator is recorded as having become confused in old age, what he narrated after that point is treated separately." },
    ],
    reflect: [
      { te: "ఈ శాస్త్రం ఎంత కఠినంగా ఉందో చూశారు. మీరు ఒక సందేశాన్ని ఫార్వర్డ్ చేసే ముందు ఎంత పరిశీలిస్తారు?", en: "You have seen how demanding this discipline was. How much do you check before forwarding a message?" },
    ],
    mistakes: [
      { te: "'ఇది మంచి విషయమే కదా, ఫార్వర్డ్ చేస్తే ఏమవుతుంది?' అనుకోవడం.", en: "Thinking it is a good message anyway, so what harm can forwarding it do." },
      { te: "శృంఖల బాగుంటే పాఠం ఏదైనా సరే అని అనుకోవడం.", en: "Assuming that a good chain settles the matter whatever the text says." },
    ],
    faqs: [
      {
        question: { te: "బలహీనమైన హదీసును పూర్తిగా వదిలేయాలా?", en: "Should a weak hadith be discarded entirely?" },
        answer: {
          te: "పండితుల మధ్య భేదం ఉంది. ధర్మ నియమాలను (హలాల్, హరామ్, ఆచరణ విధులు) బలహీనమైన ఉల్లేఖనలపై నిర్ధారించరాదని అందరూ అంగీకరిస్తారు. ప్రోత్సాహక విషయాల్లో (ఫదాయిల్ అల్-అమాల్) షరతులతో వాడవచ్చని కొందరు అంటారు; మరికొందరు అది కూడా వద్దంటారు. కల్పితమైనదాన్ని (మౌదూఅ) మాత్రం ఎవరూ అనుమతించరు.",
          en: "Scholars differ. All agree that rulings on what is permitted or forbidden are not established on weak narrations. Some allow their use with conditions for encouragement in virtuous deeds, and others do not allow even that. Nobody permits the use of a fabrication.",
        },
      },
      {
        question: { te: "నేను ఒక హదీసును ఎలా తనిఖీ చేయగలను?", en: "How can I check a hadith myself?" },
        answer: {
          te: "మొదట మూలాన్ని అడగండి — ఏ గ్రంథం, ఏ సంఖ్య. ఆ వివరం లేకపోతే అది ఇప్పటికే ఒక హెచ్చరిక. తర్వాత sunnah.com వంటి విశ్వసనీయ వనరులో వెతకండి; అవి మూలాన్ని, స్థాయిని చూపిస్తాయి. సందేహం ఉంటే మీ స్థానిక ఆలిమ్‌ను అడగండి. మరియు ఖచ్చితంగా తెలియనిదాన్ని ఫార్వర్డ్ చేయవద్దు.",
          en: "First ask for the source: which book and which number. If that detail is missing, that is already a warning. Then look it up on a reliable resource such as sunnah.com, which gives the source and the grade. If unsure, ask a local scholar. And do not forward what you are not sure of.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'దబ్త్' అంటే ఏమిటి?", en: "What is dabt?" },
        options: [
          { te: "ఉల్లేఖకుడి ఖచ్చితత్వం, జ్ఞాపకశక్తి", en: "A narrator's precision and memory" },
          { te: "గ్రంథ పరిమాణం", en: "The size of a book" },
          { te: "హదీసు పాఠం", en: "The text of a hadith" },
        ],
        answer: 0,
      },
      {
        question: { te: "పాఠాన్ని పరిశీలించేటప్పుడు ఏది అనుమానాస్పదం?", en: "When examining a text, what is suspect?" },
        options: [
          { te: "చిన్న పనికి అపారమైన ప్రతిఫల వాగ్దానం", en: "An enormous reward promised for a trivial act" },
          { te: "సంక్షిప్తమైన మాట", en: "Concise wording" },
          { te: "ఖురాన్‌తో సరిపోవడం", en: "Agreement with the Quran" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రవక్త ﷺపై ఉద్దేశపూర్వకంగా అబద్ధం చెప్పడం గురించి?", en: "About deliberately lying concerning the Prophet ﷺ?" },
        options: [
          { te: "అతను నరకంలో తన స్థానం సిద్ధం చేసుకోవాలి", en: "He should take his seat in the Fire" },
          { te: "అది చిన్న విషయం", en: "It is a minor matter" },
          { te: "అది అనుమతించబడింది", en: "It is permitted" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అదాలహ్ (సమగ్రత) + దబ్త్ (ఖచ్చితత్వం).", en: "Adalah, integrity, plus dabt, precision." },
      { te: "శృంఖల, పాఠం రెండూ పరిశీలించబడతాయి.", en: "Both the chain and the text are examined." },
      { te: "మూలం లేని సందేశాన్ని ఫార్వర్డ్ చేయవద్దు.", en: "Do not forward a message with no source." },
    ],
    summary: {
      te: "ఉల్లేఖనలను పరిశీలించే శాస్త్రం మొదటి ఫిత్నా తర్వాత మొదలైంది. ఉల్లేఖకుడికి నైతిక సమగ్రత, ఖచ్చితత్వం రెండూ కావాలి; వేలాది ఉల్లేఖకుల జీవిత వివరాలు నమోదు చేయబడ్డాయి. శృంఖల బాగున్నా పాఠంలో సమస్య ఉంటే తిరస్కరిస్తారు.",
      en: "The discipline of checking narrations began after the first fitna. A narrator needed both integrity and precision, and biographical detail on thousands of them was recorded. Even a sound chain does not save a text with a problem in it.",
    },
    apply: {
      te: "ఆచరణ: మీ ఫోన్‌లో వచ్చిన తర్వాతి ఇస్లామిక్ ఫార్వర్డ్‌కు మూలం ఉందో లేదో చూడండి.",
      en: "Apply it: on the next Islamic forward that reaches your phone, look for whether it names a source.",
    },
    reading: [
      { label: "Hadith portal", url: "/knowledge-center/hadith" },
      { label: "The six collections", url: "/knowledge-center/hadith/the-six-books" },
    ],
  },

  {
    slug: "the-six-books",
    portal: "hadith",
    title: {
      te: "స్థాయి 3 — ఆరు గ్రంథాలు",
      en: "Level 3 — The six collections",
    },
    intro: {
      te: "సున్నీ సంప్రదాయంలో ఆరు ప్రధాన సంకలనాలు ఉన్నాయి. అవన్నీ ఒకే స్థాయివి కావు, మరియు ఏది ఏమిటో తెలియడం ఒక ఉల్లేఖనను ఎలా తీసుకోవాలో నిర్ణయిస్తుంది.",
      en: "The Sunni tradition has six principal collections. They do not all carry the same standing, and knowing which is which decides how you take a narration.",
    },
    sections: [
      {
        heading: { te: "రెండు సహీహ్‌లు", en: "The two Sahihs" },
        body: {
          te: "అల్-బుఖారీ (మ. 256 హి), ముస్లిం (మ. 261 హి) — ఇద్దరూ తమ సంకలనాల్లో సహీహ్ ఉల్లేఖనలను మాత్రమే చేర్చాలని నిర్ణయించుకున్నారు. ఇది కొత్త ఆలోచన: అంతకుముందు సంకలనాలు అన్ని రకాల ఉల్లేఖనలను కూర్చేవి. బుఖారీ ఒక అదనపు షరతు పెట్టారు — శృంఖలలోని ఇద్దరు వరుస ఉల్లేఖకులు నిజంగా కలిశారని నిరూపణ ఉండాలి; ముస్లిం వారు కలిసే అవకాశం ఉంటే చాలని భావించారు. అందుకే బుఖారీని కొంచెం కఠినంగా భావిస్తారు. రెండింటిలోనూ ఉన్న ఉల్లేఖనను 'ముత్తఫఖున్ అలైహి' అంటారు — అది అత్యున్నత స్థాయి.",
          en: "Al-Bukhari, who died in 256 AH, and Muslim, who died in 261, each set out to include only authentic narrations. That was a new idea; earlier collections gathered narrations of every kind. Bukhari added one extra condition, that two consecutive narrators be shown actually to have met, where Muslim held it enough that they could have met. This is why Bukhari is considered slightly stricter. A hadith in both is called muttafaqun alayh, and that is the highest standing there is.",
        },
        check: {
          question: { te: "'ముత్తఫఖున్ అలైహి' అంటే ఏమిటి?", en: "What does muttafaqun alayh mean?" },
          options: [
            { te: "బుఖారీ, ముస్లిం రెండింటిలోనూ ఉన్నది", en: "Found in both Bukhari and Muslim" },
            { te: "అన్ని గ్రంథాల్లోనూ ఉన్నది", en: "Found in all the books" },
            { te: "బలహీనమైనది", en: "Weak" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నాలుగు సునన్‌లు", en: "The four Sunan" },
        body: {
          te: "అబూ దావూద్, అత్-తిర్మిజీ, అన్-నసాయీ, ఇబ్న్ మాజా — ఈ నాలుగింటిని 'సునన్' అంటారు, ఎందుకంటే అవి ప్రధానంగా ఆచరణ నియమాల ప్రకారం అమర్చబడ్డాయి. ముఖ్యమైన తేడా: ఇవి సహీహ్ ఉల్లేఖనలను మాత్రమే చేర్చుతాయని చెప్పలేదు. వాటిలో సహీహ్, హసన్, జయీఫ్ అన్నీ ఉన్నాయి. అంటే 'ఇది అబూ దావూద్‌లో ఉంది' అనేది 'ఇది ప్రామాణికం' అని అర్థం కాదు — స్థాయిని విడిగా చూడాలి. ఇది చాలామందికి తెలియని ముఖ్యమైన విషయం.",
          en: "Abu Dawud, at-Tirmidhi, an-Nasa'i and Ibn Majah are called the Sunan, because they are arranged chiefly by the rules of practice. One important difference: they did not claim to include only authentic narrations. They contain sahih, hasan and weak material together. So it is in Abu Dawud does not mean it is authentic; the grade has to be checked separately. Many people do not know this.",
        },
        check: {
          question: { te: "'ఇది సునన్ గ్రంథంలో ఉంది' అంటే?", en: "If something is in one of the Sunan?" },
          options: [
            { te: "స్థాయిని విడిగా చూడాలి", en: "The grade still has to be checked" },
            { te: "అది ఖచ్చితంగా సహీహ్", en: "It is certainly sahih" },
            { te: "అది ఖచ్చితంగా బలహీనం", en: "It is certainly weak" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఇతర ముఖ్యమైన సంకలనాలు", en: "Other important collections" },
        body: {
          te: "ఆరు గ్రంథాలు మాత్రమే ఉన్నాయని అనుకోవడం పొరపాటు. ఇమామ్ మాలిక్ 'అల్-మువత్తా' ఆరింటికంటే పాతది (మ. 179 హి), మరియు కొందరు దాన్ని ఇబ్న్ మాజా స్థానంలో లెక్కిస్తారు. 'ముస్నద్ అహ్మద్' లో ముప్ఫై వేలకు పైగా ఉల్లేఖనలు ఉన్నాయి, సహచరుల పేర్ల ప్రకారం అమర్చబడ్డాయి. ఇంకా 'సునన్ అల్-బైహఖీ', 'ముస్తద్రక్ అల్-హాకిమ్', 'సహీహ్ ఇబ్న్ ఖుజైమా' వంటివి. దక్షిణాసియాలో 'మిష్కాత్ అల్-మసాబీహ్' అనే సంకలనం మదరసాలలో విస్తృతంగా బోధించబడుతుంది.",
          en: "It would be a mistake to think only six exist. Imam Malik's Muwatta is older than all of them, he having died in 179 AH, and some count it in place of Ibn Majah. The Musnad of Ahmad holds over thirty thousand narrations arranged by companion. There are also the Sunan of al-Bayhaqi, the Mustadrak of al-Hakim and the Sahih of Ibn Khuzaymah. In South Asia the Mishkat al-Masabih is widely taught in madrasas.",
        },
      },
      {
        heading: { te: "నలభై హదీసు సంకలనాలు", en: "The forty-hadith collections" },
        body: {
          te: "కొత్తవారికి ఒక ఆచరణాత్మక ప్రవేశ మార్గం. ఇమామ్ అన్-నవవీ (మ. 676 హి) నలభై రెండు హదీసులను ఎంచుకుని ఒక చిన్న సంకలనం చేశారు — 'అల్-అర్బఈన్ అన్-నవవియ్యా'. ఆయన ఎంపిక ప్రమాణం: ప్రతిదీ ఇస్లాం ఒక ప్రధాన సూత్రాన్ని కలిగి ఉండాలి. ఇది శతాబ్దాలుగా ప్రపంచవ్యాప్తంగా బోధించబడుతోంది, తెలుగుతో సహా అనేక భాషల్లో దొరుకుతుంది. మొత్తం హదీసు సాహిత్యం అపారమైనది; నవవీ నలభై దానిలోకి ఒక తలుపు.",
          en: "A practical way in for a beginner. Imam an-Nawawi, who died in 676 AH, selected forty-two hadith into a short collection, al-Arba'in an-Nawawiyyah. His criterion was that each should carry a major principle of Islam. It has been taught around the world for centuries and is available in many languages including Telugu. The whole hadith literature is vast; Nawawi's forty is a door into it.",
        },
      },
    ],
    takeaways: [
      { te: "బుఖారీ, ముస్లిం సహీహ్ మాత్రమే చేర్చాలని నిర్ణయించుకున్నారు.", en: "Bukhari and Muslim set out to include only what is authentic." },
      { te: "నాలుగు సునన్‌లలో అన్ని స్థాయిలూ ఉన్నాయి — స్థాయిని విడిగా చూడాలి.", en: "The four Sunan contain all grades; the grade must be checked separately." },
      { te: "ఆరు మాత్రమే కాదు — మువత్తా, ముస్నద్ అహ్మద్ మొదలైనవీ ఉన్నాయి.", en: "There are not only six; the Muwatta and Musnad Ahmad exist too." },
    ],
    didYouKnow: [
      { te: "ఇమామ్ మాలిక్ 'మువత్తా' ఆరు గ్రంథాలన్నిటికంటే పాతది.", en: "Imam Malik's Muwatta is older than all six." },
      { te: "తిర్మిజీ దాదాపు ప్రతి ఉల్లేఖన తర్వాత దాని స్థాయిని స్వయంగా చెప్పారు — ఇది ఆ కాలంలో అసాధారణం.", en: "Tirmidhi states the grade of nearly every narration himself, which was unusual for his time." },
    ],
    reflect: [
      { te: "'ఇది హదీసు గ్రంథంలో ఉంది' అనే మాట సరిపోదని ఇప్పుడు మీకు తెలుసు. ఇది మీ అలవాటును ఎలా మారుస్తుంది?", en: "You now know that it is in a hadith book is not enough. How does that change your habit?" },
    ],
    mistakes: [
      { te: "'ఏదైనా హదీసు గ్రంథంలో ఉంటే అది ప్రామాణికం' అనుకోవడం.", en: "Assuming anything in a hadith book is authentic." },
      { te: "ఆరు గ్రంథాలు మాత్రమే ఉన్నాయని అనుకోవడం.", en: "Assuming there are only six collections." },
    ],
    faqs: [
      {
        question: { te: "బుఖారీలో ఉన్నదంతా ప్రామాణికమేనా?", en: "Is everything in Bukhari authentic?" },
        answer: {
          te: "ఆయన ప్రవక్త ﷺకు ఆపాదించి, పూర్తి శృంఖలతో చేర్చిన ఉల్లేఖనలు సహీహ్ అని సున్నీ పండితుల ఏకాభిప్రాయం. అయితే గ్రంథంలో అధ్యాయ శీర్షికల్లో, వ్యాఖ్యానాల్లో ఆయన శృంఖల లేకుండా ప్రస్తావించిన కొన్ని విషయాలు ('ముఅల్లఖ్') ఉన్నాయి; అవి వేరుగా పరిగణించబడతాయి. సాధారణ పాఠకుడికి: బుఖారీలోని ఉల్లేఖనలు నమ్మదగినవి.",
          en: "Sunni scholars agree that the narrations he attributes to the Prophet ﷺ with a full chain are sahih. The book also contains some remarks in chapter headings without chains, called mu'allaq, and those are treated separately. For an ordinary reader: what is narrated in Bukhari can be relied on.",
        },
      },
      {
        question: { te: "షియా సంప్రదాయంలో ఏ గ్రంథాలు?", en: "Which collections does the Shia tradition use?" },
        answer: {
          te: "షియా సంప్రదాయంలో వేరే ప్రధాన సంకలనాలు ఉన్నాయి — 'అల్-కాఫీ', 'మన్ లా యహ్‌దురుహుల్ ఫఖీహ్', 'తహ్‌జీబ్ అల్-అహ్‌కామ్', 'అల్-ఇస్తిబ్సార్'. వారి ఉల్లేఖకుల మూల్యాంకన పద్ధతులు కూడా వేరు. ఈ పోర్టల్ సున్నీ సంప్రదాయాన్ని అనుసరిస్తుంది, ఇది ఈ ప్రాంతంలోని అత్యధిక ముస్లింలది.",
          en: "The Shia tradition has its own principal collections: al-Kafi, Man la yahduruhu al-faqih, Tahdhib al-ahkam and al-Istibsar, along with different methods of assessing narrators. This portal follows the Sunni tradition, which is that of most Muslims in this region.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "బుఖారీ అదనపు షరతు ఏమిటి?", en: "What extra condition did Bukhari require?" },
        options: [
          { te: "వరుస ఉల్లేఖకులు నిజంగా కలిశారని నిరూపణ", en: "Proof that consecutive narrators actually met" },
          { te: "ఉల్లేఖన పొడవుగా ఉండాలి", en: "That the narration be long" },
          { te: "అది మదీనాలో వినబడాలి", en: "That it be heard in Madinah" },
        ],
        answer: 0,
      },
      {
        question: { te: "నవవీ నలభై హదీసుల ఎంపిక ప్రమాణం ఏమిటి?", en: "What was Nawawi's criterion for his forty?" },
        options: [
          { te: "ప్రతిదీ ఇస్లాం ఒక ప్రధాన సూత్రాన్ని కలిగి ఉండాలి", en: "Each should carry a major principle of Islam" },
          { te: "ప్రతిదీ చిన్నదిగా ఉండాలి", en: "Each should be short" },
          { te: "ప్రతిదీ బుఖారీ నుండే ఉండాలి", en: "Each should be from Bukhari" },
        ],
        answer: 0,
      },
      {
        question: { te: "ముస్నద్ అహ్మద్ ఎలా అమర్చబడింది?", en: "How is the Musnad of Ahmad arranged?" },
        options: [
          { te: "సహచరుల పేర్ల ప్రకారం", en: "By companion" },
          { te: "అంశాల ప్రకారం", en: "By topic" },
          { te: "అక్షరక్రమంలో", en: "Alphabetically" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "రెండు సహీహ్‌లు: బుఖారీ, ముస్లిం.", en: "The two Sahihs: Bukhari and Muslim." },
      { te: "నాలుగు సునన్: అబూ దావూద్, తిర్మిజీ, నసాయీ, ఇబ్న్ మాజా.", en: "The four Sunan: Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah." },
      { te: "సునన్‌లలో అన్ని స్థాయిలూ ఉన్నాయి.", en: "The Sunan contain all grades." },
    ],
    summary: {
      te: "ఆరు గ్రంథాలలో బుఖారీ, ముస్లిం సహీహ్ మాత్రమే చేర్చాలని నిర్ణయించుకున్నాయి; నాలుగు సునన్‌లలో అన్ని స్థాయిలూ ఉన్నాయి. అంటే ఒక గ్రంథంలో ఉండటమే ప్రామాణికతకు సాక్ష్యం కాదు. ఆరు మాత్రమే కాదు — మువత్తా, ముస్నద్ అహ్మద్ వంటివీ ముఖ్యమైనవి.",
      en: "Of the six, Bukhari and Muslim set out to include only the authentic, while the four Sunan hold all grades. Being in a book is therefore not evidence of authenticity by itself. And there are not only six; the Muwatta and Musnad Ahmad matter too.",
    },
    apply: {
      te: "ఆచరణ: నవవీ నలభై హదీసుల తెలుగు అనువాదం మీ స్థానిక మస్జిద్‌లో ఉందేమో అడగండి.",
      en: "Apply it: ask at your local mosque whether they have Nawawi's forty hadith in Telugu.",
    },
    reading: [
      { label: "Hadith portal", url: "/knowledge-center/hadith" },
      { label: "Living by hadith", url: "/knowledge-center/hadith/living-by-it" },
    ],
  },

  {
    slug: "living-by-it",
    portal: "hadith",
    title: {
      te: "స్థాయి 4 — హదీసుతో జీవించడం",
      en: "Level 4 — Living by hadith",
    },
    intro: {
      te: "హదీసు తెలుసుకోవడం ఒక విషయం; దాని ప్రకారం జీవించడం మరొకటి. మరియు దాన్ని బాధ్యతగా వాడటం ఇంకొకటి — ఇక్కడే చాలామంది తప్పు చేస్తారు.",
      en: "Knowing a hadith is one thing, living by it another, and using it responsibly a third. That last is where most people go wrong.",
    },
    sections: [
      {
        heading: { te: "ఒక్క హదీసుతో నియమం తీయడం ప్రమాదకరం", en: "Deriving a rule from one hadith alone is risky" },
        body: {
          te: "ఒక ఉల్లేఖన ఒక విషయం చెబుతుంది; మరో ఉల్లేఖన దాన్ని పరిమితం చేస్తుంది; ఒక ఖురాన్ ఆయత్ దాన్ని మరో వెలుగులో చూపుతుంది. ఫఖీహ్ (ఫిఖ్హ్ పండితుడు) చేసే పని అన్ని ఆధారాలను కలిపి చూడటం. ఒక ఉదాహరణ: ప్రవక్త ﷺ ఒక సందర్భంలో ఖననాలను సందర్శించడాన్ని నిషేధించారు, తర్వాత 'ఇప్పుడు సందర్శించండి, అది మరణాన్ని గుర్తుచేస్తుంది' అన్నారు (ముస్లిం). మొదటిదాన్ని మాత్రమే చూసినవాడు తప్పు నిర్ణయానికి వస్తాడు. అందుకే 'నేను ఒక హదీసు చదివాను, కాబట్టి...' అనే వాక్యం జాగ్రత్తగా వాడాలి.",
          en: "One narration says something; another restricts it; a Quranic verse casts it differently. The work of a faqih is to hold all the evidence together. An example: the Prophet ﷺ at one point forbade visiting graves, and later said now visit them, for they remind you of death (Muslim). Anyone who sees only the first reaches the wrong conclusion. This is why the sentence I read a hadith, therefore should be used carefully.",
        },
        check: {
          question: { te: "ఖననాల సందర్శన ఉదాహరణ ఏమి చూపుతుంది?", en: "What does the example about visiting graves show?" },
          options: [
            { te: "ఒక ఉల్లేఖనను మరొకటి మార్చవచ్చు — అన్నిటినీ కలిపి చూడాలి", en: "One narration can change another, so all must be read together" },
            { te: "ఖననాలకు వెళ్ళకూడదు", en: "That graves should not be visited" },
            { te: "హదీసులు నమ్మదగినవి కావు", en: "That hadith are unreliable" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సున్నత్ అంటే కేవలం ఆచారాలు కాదు", en: "The Sunnah is more than rituals" },
        body: {
          te: "'సున్నత్ అనుసరించడం' అంటే చాలామందికి మిస్‌వాక్, వస్త్ర పొడవు, గడ్డం లాంటివి గుర్తుకువస్తాయి. అవి సున్నత్‌లో భాగమే. కానీ సున్నత్‌లో ఇవి కూడా ఉన్నాయి: మాట ఇచ్చినది నిలబెట్టుకోవడం, ఇంటి పనుల్లో సహాయం చేయడం, కూలివాడి కూలిని వెంటనే ఇవ్వడం, పొరుగువాడిని బాధపెట్టకపోవడం, జంతువుల పట్ల దయ, కోపంలో నిగ్రహం. బాహ్య సున్నత్‌లను పాటిస్తూ ఈ ఆంతరిక సున్నత్‌లను విస్మరించడం ఒక అసమతుల్యత. ప్రవక్త ﷺ స్వభావాన్ని ఆయిషా (ర/అ) 'ఖురాన్' అని వర్ణించారు — వస్త్రధారణ అని కాదు.",
          en: "Following the Sunnah brings to mind the miswak, the length of a garment, the beard. Those are part of it. But the Sunnah also includes keeping your word, helping with the housework, paying a worker promptly, not harming a neighbour, kindness to animals, restraint in anger. Keeping the outward sunnahs while neglecting these inward ones is an imbalance. Aisha (RA) described his character as the Quran, not as a manner of dress.",
        },
        check: {
          question: { te: "ఆయిషా (ర/అ) ప్రవక్త ﷺ స్వభావాన్ని ఎలా వర్ణించారు?", en: "How did Aisha (RA) describe his character?" },
          options: [
            { te: "'ఆయన స్వభావం ఖురాన్'", en: "His character was the Quran" },
            { te: "ఆయన వస్త్రధారణ ద్వారా", en: "By his manner of dress" },
            { te: "ఆయన మౌనం ద్వారా", en: "By his silence" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఒక ఆచరణాత్మక పద్ధతి", en: "A practical method" },
        body: {
          te: "మొత్తం హదీసు సాహిత్యాన్ని చదవడం లక్ష్యంగా పెట్టుకోవడం వాస్తవికం కాదు, మరియు అవసరమూ లేదు. బదులుగా: వారానికి ఒక హదీసు తీసుకోండి. దాన్ని కంఠస్థం చేయండి — అరబిక్ లేదా కనీసం అర్థం. దాని మూలాన్ని, స్థాయిని గమనించండి. ఆ వారమంతా దాన్ని ఒక్క విషయంలో ఆచరించండి. వారానికి ఒకటి అంటే ఏడాదికి యాభై రెండు, మరియు అవి మీ ఆచరణలో భాగమయ్యాయి. యాభై రెండు హదీసులు తెలిసి, జీవించి ఉండటం ఐదు వందలు చదివి మరచిపోవడం కంటే మేలు.",
          en: "Setting out to read the whole hadith literature is neither realistic nor necessary. Instead: take one hadith a week. Memorise it, in Arabic or at least the meaning. Note its source and its grade. Then act on it in one specific way through that week. One a week is fifty-two a year, and they will have entered your practice. Fifty-two known and lived beats five hundred read and forgotten.",
        },
      },
      {
        heading: { te: "ఫార్వర్డ్ చేసే ముందు", en: "Before you forward it" },
        body: {
          te: "ఇది ఈ పోర్టల్ నుండి తీసుకోవలసిన అత్యంత ఆచరణాత్మక అలవాటు. ఒక ఇస్లామిక్ సందేశం మీకు వచ్చినప్పుడు మూడు ప్రశ్నలు అడగండి. ఒకటి: దీనికి మూలం ఉందా — ఏ గ్రంథం, ఏ సంఖ్య? రెండు: నేను దాన్ని తనిఖీ చేశానా, లేక 'బాగుంది కదా' అని అనుకున్నానా? మూడు: ఇందులో 'పంపండి లేకపోతే...' అనే ఒత్తిడి ఉందా? ఒక కల్పిత ఉల్లేఖనను ఫార్వర్డ్ చేయడం ద్వారా మీరు దాన్ని వ్యాప్తి చేసినవారవుతారు — మరియు ప్రవక్త ﷺ ఆయనపై అబద్ధం చెప్పడం గురించి ఇచ్చిన హెచ్చరిక తీవ్రమైనది. తెలియనప్పుడు పంపకపోవడమే సురక్షితం.",
          en: "This is the most practical habit to take from this portal. When an Islamic message reaches you, ask three questions. Does it name a source, a book and a number? Did I check it, or did I just think it sounded good? And is there pressure in it to forward or else? By forwarding a fabrication you become one of the people who spread it, and the Prophet's warning about lying concerning him is severe. When you do not know, not sending it is the safe course.",
        },
      },
    ],
    takeaways: [
      { te: "ఒక్క హదీసుతో నియమం తీయవద్దు — అన్ని ఆధారాలను కలిపి చూడాలి.", en: "Do not derive a rule from one hadith; the evidence is read together." },
      { te: "సున్నత్‌లో ఆంతరిక అంశాలు ఉన్నాయి — మాట నిలబెట్టుకోవడం, కూలి ఇవ్వడం, కోప నిగ్రహం.", en: "The Sunnah includes keeping your word, paying wages, restraining anger." },
      { te: "వారానికి ఒక హదీసు = ఏడాదికి యాభై రెండు, జీవించినవి.", en: "One a week is fifty-two a year, and lived." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ మొదట ఖననాల సందర్శనను నిషేధించి తర్వాత అనుమతించారు — ఒక ఉల్లేఖన మరొకదాన్ని మార్చగలదని ఇది చూపుతుంది.", en: "The Prophet ﷺ first forbade visiting graves and later permitted it, which shows how one narration can change another." },
    ],
    reflect: [
      { te: "మీరు పాటించే బాహ్య సున్నత్‌లు ఎన్ని? ఆంతరిక సున్నత్‌లు ఎన్ని?", en: "How many outward sunnahs do you keep, and how many inward ones?" },
    ],
    mistakes: [
      { te: "'నేను ఒక హదీసు చదివాను, కాబట్టి ఇది హరామ్' అని ప్రకటించడం.", en: "Declaring something forbidden because you read one hadith." },
      { te: "బాహ్య సున్నత్‌లను పాటిస్తూ ఆంతరిక సున్నత్‌లను విస్మరించడం.", en: "Keeping the outward sunnahs while neglecting the inward ones." },
      { te: "తనిఖీ చేయని సందేశాన్ని ఫార్వర్డ్ చేయడం.", en: "Forwarding a message you have not checked." },
    ],
    faqs: [
      {
        question: { te: "నేను హదీసు చదవవచ్చా, లేక పండితుల ద్వారానే వెళ్ళాలా?", en: "Can I read hadith myself, or must I go through scholars?" },
        answer: {
          te: "చదవండి — అది ప్రోత్సహించదగినది, మరియు నవవీ నలభై వంటివి ఇందుకే రూపొందించబడ్డాయి. తేడా ఇది: చదవడం, పాఠం తీసుకోవడం, ఆచరించడం — ఇవి ప్రతి ముస్లిమూ చేయాలి. కొత్త ధర్మ నియమాలను తీయడం, ఫత్వా ఇవ్వడం — వీటికి శిక్షణ అవసరం. మీ కోసం పాఠం తీసుకోవడం vs ఇతరులకు నియమం ప్రకటించడం — ఇదే గీత.",
          en: "Read them; it is encouraged, and collections like Nawawi's forty exist for exactly this. The distinction is that reading, taking a lesson and acting on it are for every Muslim, while deriving new rulings and giving fatwa require training. The line runs between taking a lesson for yourself and declaring a rule for others.",
        },
      },
      {
        question: { te: "రెండు హదీసులు విరుద్ధంగా కనిపిస్తే?", en: "What if two hadith seem to contradict?" },
        answer: {
          te: "పండితులకు దీనికి ఒక పద్ధతి ఉంది: ముందు వాటిని సమన్వయం చేయడానికి ప్రయత్నించడం (రెండూ వేర్వేరు పరిస్థితులకు కావచ్చు); అది సాధ్యం కాకపోతే ఏది తర్వాతిదో చూడటం (నాసిఖ్-మన్సూఖ్); అదీ తెలియకపోతే ఏది బలమైనదో చూడటం. చాలా 'వైరుధ్యాలు' వాస్తవానికి వేర్వేరు సందర్భాలు. మీకు వైరుధ్యం కనిపిస్తే అది సాధారణంగా సందర్భం తెలియకపోవడమే.",
          en: "Scholars have a method: first try to reconcile them, since the two may address different situations; if not, establish which came later; and failing that, weigh which is stronger. Most apparent contradictions turn out to be different circumstances. If you see a contradiction, it is usually missing context.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఒక ఇస్లామిక్ ఫార్వర్డ్ వచ్చినప్పుడు మొదటి ప్రశ్న?", en: "On receiving an Islamic forward, the first question is?" },
        options: [
          { te: "దీనికి మూలం ఉందా?", en: "Does it name a source?" },
          { te: "ఇది ఎవరు పంపారు?", en: "Who sent it?" },
          { te: "ఇది ఎంత పొడవు?", en: "How long is it?" },
        ],
        answer: 0,
      },
      {
        question: { te: "సూచించబడిన ఆచరణాత్మక పద్ధతి ఏమిటి?", en: "What practical method is suggested?" },
        options: [
          { te: "వారానికి ఒక హదీసు, ఆచరణతో సహా", en: "One hadith a week, acted upon" },
          { te: "రోజుకు యాభై చదవడం", en: "Reading fifty a day" },
          { te: "మొత్తం బుఖారీ కంఠస్థం", en: "Memorising all of Bukhari" },
        ],
        answer: 0,
      },
      {
        question: { te: "రెండు హదీసులు విరుద్ధంగా కనిపిస్తే మొదట ఏమి చేస్తారు?", en: "When two hadith seem to contradict, what is done first?" },
        options: [
          { te: "వాటిని సమన్వయం చేయడానికి ప్రయత్నించడం", en: "Try to reconcile them" },
          { te: "రెండింటినీ వదిలేయడం", en: "Discard both" },
          { te: "పొడవైనదాన్ని తీసుకోవడం", en: "Take the longer one" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఒక్క ఉల్లేఖనతో నియమం తీయవద్దు.", en: "Do not build a rule on one narration." },
      { te: "సున్నత్ = బాహ్యం + ఆంతరికం.", en: "The Sunnah is outward and inward together." },
      { te: "ఫార్వర్డ్‌కు ముందు: మూలం? తనిఖీ? ఒత్తిడి?", en: "Before forwarding: source, checked, pressure?" },
    ],
    summary: {
      te: "హదీసును బాధ్యతగా వాడటం అంటే ఒక్క ఉల్లేఖనతో నియమాలు తీయకపోవడం, సున్నత్‌లోని ఆంతరిక అంశాలను విస్మరించకపోవడం, మరియు తనిఖీ చేయని సందేశాలను ఫార్వర్డ్ చేయకపోవడం. వారానికి ఒక హదీసు — నేర్చుకుని, ఆచరించి — ఒక వాస్తవిక మార్గం.",
      en: "Using hadith responsibly means not building rules on a single narration, not neglecting the inward parts of the Sunnah, and not forwarding what you have not checked. One hadith a week, learned and acted on, is a realistic path.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం ఒక హదీసును ఎంచుకుని, దాని మూలంతో సహా కంఠస్థం చేసి, ఒక్క విషయంలో ఆచరించండి.",
      en: "Apply it: choose one hadith this week, memorise it with its source, and act on it in one specific way.",
    },
    reading: [
      { label: "Hadith portal", url: "/knowledge-center/hadith" },
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
    ],
  },
];
