/* Kids Islam, levels 4 to 8. Split from ./kids.ts to keep the files readable;
   both arrays are spread into authoredLessons together. Same seven-section
   shape and the same plain register. */
import type { Lesson } from "../lessons.ts";

export const kidsLessonsTwo: Lesson[] = [
  {
    slug: "stories-of-the-prophets",
    portal: "kids-islam",
    title: { te: "స్థాయి 4 — ప్రవక్తల కథలు", en: "Level 4 — Stories of the prophets" },
    intro: {
      te: "అల్లాహ్ చాలామంది ప్రవక్తలను పంపాడు. వారి కథలు కేవలం కథలు కాదు — ప్రతిదానిలో ఒక పాఠం ఉంది.",
      en: "Allah sent many prophets. Their stories are not just stories; each one carries a lesson.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "ఖురాన్‌లో ఇరవై ఐదు మంది ప్రవక్తల పేర్లు ఉన్నాయి, కానీ ప్రవక్తలు అంతకంటే చాలా ఎక్కువమంది ఉన్నారు. వారందరూ ఒకే సందేశాన్ని తెచ్చారు: అల్లాహ్ ఒక్కడే, ఆయననే ఆరాధించండి. ఆదమ్ (అ) మొదటివారు, ముహమ్మద్ ﷺ చివరివారు. మధ్యలో నూహ్, ఇబ్రాహీమ్, మూసా, ఈసా (అ) — వీరందరూ ముస్లింలే, ఎందుకంటే 'ముస్లిం' అంటే అల్లాహ్‌కు లొంగిపోయినవాడు. ఒక ముస్లిం ప్రవక్తలందరినీ గౌరవించాలి, ఎవరినీ తక్కువ చేయకూడదు.",
          en: "The Quran names twenty-five prophets, though there were far more. They all brought one message: Allah is One, worship only Him. Adam was the first and Muhammad ﷺ the last. Between them came Nuh, Ibrahim, Musa and Isa, and all of them were Muslims, because Muslim means one who submits to Allah. A Muslim honours every prophet and belittles none.",
        },
        check: {
          question: { te: "ప్రవక్తలందరూ ఏ సందేశాన్ని తెచ్చారు?", en: "What message did all the prophets bring?" },
          options: [
            { te: "అల్లాహ్ ఒక్కడే, ఆయననే ఆరాధించండి", en: "Allah is One, worship only Him" },
            { te: "వేర్వేరు సందేశాలు", en: "Different messages" },
            { te: "ఏ సందేశమూ లేదు", en: "No message at all" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "ఇబ్రాహీమ్ (అ) విగ్రహాలను ఆరాధించే ఊళ్ళో పెరిగారు. ఒక రోజు అందరూ బయటికి వెళ్ళినప్పుడు ఆయన విగ్రహాలన్నిటినీ పగలగొట్టి, గొడ్డలిని అతిపెద్ద విగ్రహం మెడలో వేలాడదీశారు. ప్రజలు తిరిగి వచ్చి 'నీవేనా ఇది చేసింది?' అని అడిగారు. ఆయన అన్నారు: 'ఆ పెద్దదాన్ని అడగండి — అది మాట్లాడగలిగితే'. వారు తలదించుకుని 'ఇవి మాట్లాడలేవని నీకు తెలుసు' అన్నారు. ఆయన అన్నారు: 'మరి మీకు ఏ లాభమూ, హానీ చేయలేనివాటిని ఎందుకు ఆరాధిస్తారు?' (సూరా అల్-అంబియా). ఆయన వాదన గెలిచింది — ఎందుకంటే వారే సమాధానం చెప్పారు.",
          en: "Ibrahim grew up in a town that worshipped idols. One day when everyone had gone out he broke all the idols and hung the axe on the neck of the biggest one. The people came back and asked whether he had done it. He said, ask the big one, if it can speak. They looked down and said, you know these cannot speak. He said, then why do you worship what can neither help nor harm you? (Surah al-Anbiya). His argument won, because they gave the answer themselves.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక 'ప్రవక్తల కాలరేఖ' గీయండి. ఒక పొడవాటి గీత గీసి, దానిపై ఆదమ్ (అ) నుండి ముహమ్మద్ ﷺ వరకు మీకు తెలిసిన ప్రవక్తల పేర్లను వరుసగా రాయండి. ప్రతి పేరు పక్కన ఆ ప్రవక్త ఒక్క మాటలో దేనికి ప్రసిద్ధో రాయండి — నూహ్ (అ): ఓడ. ఇబ్రాహీమ్ (అ): విగ్రహాలు పగలగొట్టడం. మూసా (అ): సముద్రం విడిపోవడం. యూనుస్ (అ): చేప.",
          en: "Draw a timeline of the prophets. Make one long line and write along it, in order, the prophets you know from Adam to Muhammad ﷺ. Next to each name write in one word what they are known for: Nuh, the ark. Ibrahim, breaking the idols. Musa, the parting of the sea. Yunus, the fish.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "ఒక ప్రవక్త పేరు చెప్పినప్పుడు 'అలైహిస్సలామ్' (ఆయనపై శాంతి) అనండి, మరియు ముహమ్మద్ ﷺ పేరు చెప్పినప్పుడు 'సల్లల్లాహు అలైహి వసల్లమ్' అనండి. ఈ రోజు కనీసం ఒకసారి దీన్ని పూర్తిగా, తొందరపడకుండా చెప్పండి.",
          en: "When you say a prophet's name, say alayhis-salam, peace be upon him, and when you say the name of Muhammad ﷺ say sallallahu alayhi wa sallam. Say it once today in full, without rushing it.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ఖురాన్‌లో ఏ ప్రవక్త పేరు అత్యధికంగా వస్తుందో తెలుసా? ముహమ్మద్ ﷺ కాదు — మూసా (అ). ఆయన పేరు నూటికి పైగా సార్లు వస్తుంది. మరో విషయం: మర్యమ్ (అ) — ఈసా (అ) తల్లి — పేరు మీద ఒక పూర్తి సూరా ఉంది. ఖురాన్‌లో పేరుపెట్టి ప్రస్తావించబడిన ఏకైక మహిళ ఆమే.",
          en: "Which prophet's name appears most in the Quran? Not Muhammad ﷺ, but Musa, whose name comes more than a hundred times. And there is a whole surah named after Maryam, the mother of Isa. She is the only woman named in the Quran.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "ఒక ప్రవక్త కథను చదివిన తర్వాత పిల్లవాడిని 'ఈ కథలో ఆ ప్రవక్త ఏమి చేశారు, మనం అలా ఎక్కడ చేయగలం?' అని అడగండి. కథను పాఠంగా మార్చే ప్రశ్న ఇదే. ఉదాహరణకు యూసుఫ్ (అ) కథలో ఆయన తనకు అన్యాయం చేసిన సోదరులను క్షమించారు.",
          en: "After reading a prophet's story, ask the child what that prophet did and where we could do the same. That is the question that turns a story into a lesson. In the story of Yusuf, for example, he forgave the brothers who wronged him.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: మూడు ప్రవక్తల పేర్లు, వారి ఒక్కో కథ. 8-11 ఏళ్ళు: ఖురాన్‌లోని ఇరవై ఐదు పేర్లు, ప్రతిదాని ఒక్క వాక్య కథ. 12-15 ఏళ్ళు: ఐదుగురు 'ఉలుల్ అజ్మ్' ప్రవక్తలు (నూహ్, ఇబ్రాహీమ్, మూసా, ఈసా, ముహమ్మద్ ﷺ) మరియు వారికి ఇవ్వబడిన గ్రంథాలు.",
          en: "Ages 5 to 7: three prophets' names and one story each. Ages 8 to 11: the twenty-five names in the Quran with a one-sentence story for each. Ages 12 to 15: the five prophets of firm resolve, Nuh, Ibrahim, Musa, Isa and Muhammad ﷺ, and the scriptures given to them.",
        },
      },
    ],
    takeaways: [
      { te: "ప్రవక్తలందరూ ఒకే సందేశాన్ని తెచ్చారు.", en: "Every prophet brought the same message." },
      { te: "ఖురాన్‌లో ఇరవై ఐదు పేర్లు; ప్రవక్తలు అంతకంటే ఎక్కువ.", en: "Twenty-five are named in the Quran, and there were more." },
      { te: "ఒక ముస్లిం ప్రవక్తలందరినీ గౌరవిస్తాడు.", en: "A Muslim honours every prophet." },
    ],
    didYouKnow: [
      { te: "ఖురాన్‌లో అత్యధికంగా వచ్చే ప్రవక్త పేరు మూసా (అ).", en: "The prophet named most often in the Quran is Musa." },
    ],
    reflect: [
      { te: "మీకు నచ్చిన ప్రవక్త కథ ఏది? అందులో మీరు నేర్చుకున్నది ఏమిటి?", en: "Which prophet's story do you like most, and what did you learn from it?" },
    ],
    mistakes: [
      { te: "ఒక ప్రవక్తను మరొకరి కంటే తక్కువ చేయడం — ఇస్లాంలో అది సరికాదు.", en: "Ranking one prophet below another in a belittling way, which is not correct in Islam." },
    ],
    faqs: [
      {
        question: { te: "ఈసా (అ) ముస్లిమా?", en: "Was Isa a Muslim?" },
        answer: {
          te: "అవును — 'ముస్లిం' అంటే అల్లాహ్‌కు లొంగిపోయినవాడు, మరియు ప్రవక్తలందరూ అలాంటివారే. ఈసా (అ) అల్లాహ్ ప్రవక్త, ఆయన కుమారుడు కాదు. ముస్లింలు ఈసా (అ)ను ప్రేమిస్తారు, గౌరవిస్తారు, మరియు ఆయన మళ్ళీ వస్తారని విశ్వసిస్తారు.",
          en: "Yes, in the sense that Muslim means one who submits to Allah, and every prophet did. Isa is a prophet of Allah, not His son. Muslims love and honour Isa and believe he will return.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఖురాన్‌లో ఎంతమంది ప్రవక్తల పేర్లు ఉన్నాయి?", en: "How many prophets are named in the Quran?" },
        options: [
          { te: "ఇరవై ఐదు", en: "Twenty-five" },
          { te: "ఐదు", en: "Five" },
          { te: "వంద", en: "A hundred" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఇబ్రాహీమ్ (అ) విగ్రహాలు పగలగొట్టిన తర్వాత గొడ్డలిని ఎక్కడ ఉంచారు?", en: "Where did Ibrahim leave the axe?" },
        options: [
          { te: "అతిపెద్ద విగ్రహం మెడలో", en: "On the neck of the biggest idol" },
          { te: "నేలపై", en: "On the ground" },
          { te: "ఇంట్లో", en: "At home" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్‌లో పేరుపెట్టి ప్రస్తావించబడిన ఏకైక మహిళ ఎవరు?", en: "Who is the only woman named in the Quran?" },
        options: [
          { te: "మర్యమ్ (అ)", en: "Maryam" },
          { te: "ఖదీజా (ర/అ)", en: "Khadijah (RA)" },
          { te: "ఆయిషా (ర/అ)", en: "Aisha (RA)" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఆదమ్ (అ) మొదటివారు · ముహమ్మద్ ﷺ చివరివారు.", en: "Adam first, Muhammad ﷺ last." },
      { te: "ఒకే సందేశం: అల్లాహ్ ఒక్కడే.", en: "One message: Allah is One." },
      { te: "ప్రవక్త పేరుతో 'అలైహిస్సలామ్'.", en: "Say alayhis-salam with a prophet's name." },
    ],
    summary: {
      te: "ప్రవక్తలందరూ ఒకే సందేశాన్ని తెచ్చారు — అల్లాహ్ ఒక్కడే. ఖురాన్‌లో ఇరవై ఐదు పేర్లు ఉన్నాయి, ఆదమ్ (అ) నుండి ముహమ్మద్ ﷺ వరకు. ఒక ముస్లిం అందరినీ గౌరవిస్తాడు.",
      en: "Every prophet brought the same message, that Allah is One. Twenty-five are named in the Quran, from Adam to Muhammad ﷺ, and a Muslim honours them all.",
    },
    apply: {
      te: "ఆచరణ: ఒక ప్రవక్త కథను చదివి, అందులోని పాఠాన్ని ఒక వాక్యంలో చెప్పండి.",
      en: "Apply it: read one prophet's story and say its lesson in one sentence.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Salah and Quran basics", url: "/knowledge-center/kids-islam/salah-and-quran-basics" },
    ],
  },

  {
    slug: "salah-and-quran-basics",
    portal: "kids-islam",
    title: { te: "స్థాయి 5 — నమాజ్, ఖురాన్ ప్రాథమికాలు", en: "Level 5 — Prayer and Quran basics" },
    intro: {
      te: "నమాజ్ మనం అల్లాహ్‌తో మాట్లాడే విధానం. ఖురాన్ అల్లాహ్ మనతో మాట్లాడే విధానం. రెండూ కలిసి ఒక సంభాషణ.",
      en: "Prayer is how we talk to Allah. The Quran is how Allah talks to us. Together they make a conversation.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "రోజుకు ఐదు నమాజులు: ఫజ్ర్ (సూర్యోదయానికి ముందు), జుహ్ర్ (మధ్యాహ్నం), అస్ర్ (సాయంత్రం), మఘ్రిబ్ (సూర్యాస్తమయం తర్వాత), ఇషా (రాత్రి). నమాజ్ చేయడానికి ముందు వుజూ చేయాలి — శుభ్రత. నమాజ్‌లో మనం నిలబడతాం, వంగుతాం, సజ్దా చేస్తాం. సజ్దాలో మన నుదురు నేలను తాకుతుంది — అదే మనం అల్లాహ్‌కు అత్యంత దగ్గరగా ఉండే క్షణం, అని ప్రవక్త ﷺ చెప్పారు.",
          en: "Five prayers a day: Fajr before sunrise, Zuhr at midday, Asr in the afternoon, Maghrib after sunset and Isha at night. Before praying we make wudu, which is washing. In the prayer we stand, we bow, and we prostrate. In prostration our forehead touches the ground, and the Prophet ﷺ said that is the moment we are closest to Allah.",
        },
        check: {
          question: { te: "రోజుకు ఎన్ని నమాజులు?", en: "How many prayers are there in a day?" },
          options: [
            { te: "ఐదు", en: "Five" },
            { te: "మూడు", en: "Three" },
            { te: "పది", en: "Ten" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "ప్రవక్త ﷺ మనవళ్ళు హసన్, హుసైన్ (ర/అ) చిన్నపిల్లలుగా ఉన్నప్పుడు, ఆయన సజ్దాలో ఉండగా వారు ఆయన వీపుపై ఎక్కేవారు. ఆయన వారిని దింపేవారు కాదు — వారు తామే దిగేవరకు సజ్దాలోనే ఉండేవారు. సహచరులు 'మీరు చాలాసేపు సజ్దాలో ఉన్నారు' అంటే ఆయన 'నా మనవడు నా వీపుపై ఎక్కాడు, అతన్ని తొందరపెట్టడం నాకు ఇష్టం లేదు' అన్నారు (నసాయీ). నమాజ్‌లో కూడా ఆయన పిల్లల పట్ల మృదువుగా ఉండేవారు.",
          en: "When the Prophet's grandsons Hasan and Husayn (RA) were small, they would climb on his back while he was prostrating. He did not lift them off; he stayed in prostration until they climbed down themselves. When the companions said his prostration had been long, he said his grandson had climbed on his back and he did not want to hurry him (Nasa'i). Even in prayer he was gentle with children.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక 'నమాజ్ పట్టిక' తయారుచేయండి. ఐదు నిలువు వరుసలు (ఐదు నమాజులు), ఏడు అడ్డు వరుసలు (ఏడు రోజులు). ప్రతి నమాజ్ చేసినప్పుడు ఒక గడిలో గుర్తు పెట్టండి. కానీ ఒక నియమం: ఇది పోటీ కాదు, శిక్ష కాదు. ఖాళీ గడులు ఉంటే రేపు మళ్ళీ మొదలుపెట్టడమే.",
          en: "Make a prayer chart with five columns for the five prayers and seven rows for the week. Mark a box each time you pray. One rule though: this is not a competition and not a punishment. If there are empty boxes, you simply begin again tomorrow.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "సూరా అల్-ఫాతిహా అర్థాన్ని నేర్చుకోండి — మీరు ప్రతి నమాజ్‌లో దాన్ని చదువుతారు. మొదటి వాక్యం: 'అల్‌హమ్దులిల్లాహి రబ్బిల్ ఆలమీన్' — 'సర్వ లోకాల ప్రభువైన అల్లాహ్‌కే సర్వ స్తుతి'. ఈ రోజు నమాజ్‌లో ఆ ఒక్క వాక్యాన్ని చెప్పేటప్పుడు దాని అర్థాన్ని గుర్తుంచుకోండి.",
          en: "Learn what Surah al-Fatihah means, since you say it in every prayer. The first line is alhamdulillahi rabbil alameen, all praise is for Allah, the Lord of all the worlds. Today, when you say that one line in prayer, hold its meaning in mind.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "మీరు రోజుకు కనీసం పదిహేడు సార్లు సూరా అల్-ఫాతిహాను చదువుతారు — ప్రతి రక్అత్‌లో ఒకసారి. ఒక హదీసులో అల్లాహ్ చెప్పాడు: 'నేను నమాజును నా దాసుడికీ నాకూ మధ్య రెండు భాగాలుగా విభజించాను' — మీరు ఫాతిహాలోని ఒక్కో వాక్యం చెప్పినప్పుడు ఆయన సమాధానం ఇస్తాడు (ముస్లిం). అంటే నమాజ్ నిజంగా ఒక సంభాషణ.",
          en: "You say Surah al-Fatihah at least seventeen times a day, once in every unit of prayer. In a hadith Allah says He has divided the prayer between Himself and His servant, and answers each line of the Fatihah as it is said (Muslim). So the prayer really is a conversation.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "పిల్లలతో కలిసి ఒక నమాజ్ చేయండి — వారి పక్కన నిలబడి. పిల్లలు నమాజ్‌ను ఒక ఆదేశంగా కాక కుటుంబం కలిసి చేసే విషయంగా చూడాలి. ప్రవక్త ﷺ ఏడేళ్ళప్పుడు నమాజ్ నేర్పమని, పదేళ్ళప్పుడు దృఢంగా అలవాటు చేయమని చెప్పారు — అంటే మూడేళ్ళ ఓర్పు.",
          en: "Pray one prayer together, standing beside them. Children should see prayer as something the family does together rather than an order. The Prophet ﷺ said to teach the prayer at seven and to be firm about it at ten, which allows three years of patience.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: పెద్దలతో కలిసి నిలబడి కదలికలు నేర్చుకోవడం. 8-11 ఏళ్ళు: వుజూ సొంతంగా చేయడం, సూరా అల్-ఫాతిహా, రెండు మూడు చిన్న సూరాలు కంఠస్థం. 12-15 ఏళ్ళు: ఐదు నమాజులూ సొంతంగా, సమయానికి; ఫాతిహా అర్థం.",
          en: "Ages 5 to 7: standing with the grown-ups and learning the movements. Ages 8 to 11: doing wudu independently and memorising al-Fatihah and two or three short surahs. Ages 12 to 15: all five prayers independently and on time, and the meaning of al-Fatihah.",
        },
      },
    ],
    takeaways: [
      { te: "ఐదు నమాజులు; సజ్దాలో మనం అల్లాహ్‌కు అత్యంత దగ్గర.", en: "Five prayers, and we are closest to Allah in prostration." },
      { te: "ఫాతిహా రోజుకు కనీసం పదిహేడు సార్లు.", en: "Al-Fatihah at least seventeen times a day." },
      { te: "నమాజ్ ఒక సంభాషణ — అల్లాహ్ సమాధానం ఇస్తాడు.", en: "The prayer is a conversation, and Allah answers." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ మనవడు వీపుపై ఎక్కినప్పుడు సజ్దాను పొడిగించారు.", en: "The Prophet ﷺ lengthened his prostration when his grandson climbed on his back." },
    ],
    reflect: [
      { te: "మీ నమాజ్‌లో మీకు అత్యంత నచ్చే భాగం ఏది? ఎందుకు?", en: "Which part of the prayer do you like most, and why?" },
    ],
    mistakes: [
      { te: "వేగంగా నమాజ్ ముగించడం — ప్రతి స్థానంలో కొంచెం ఆగాలి.", en: "Rushing through the prayer instead of pausing in each position." },
    ],
    faqs: [
      {
        question: { te: "నమాజ్ మధ్యలో మర్చిపోతే?", en: "What if I forget in the middle of the prayer?" },
        answer: {
          te: "పర్వాలేదు — పెద్దవారికి కూడా జరుగుతుంది. మీకు గుర్తున్నదాన్ని కొనసాగించండి. మర్చిపోవడం వల్ల నమాజ్ చెడిపోదు; అల్లాహ్‌కు మీరు నేర్చుకుంటున్నారని తెలుసు.",
          en: "That is fine, and it happens to grown-ups too. Carry on with what you remember. Forgetting does not spoil the prayer, and Allah knows you are still learning.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సజ్దాలో ఏమవుతుంది?", en: "What happens in prostration?" },
        options: [
          { te: "మనం అల్లాహ్‌కు అత్యంత దగ్గరగా ఉంటాం", en: "We are closest to Allah" },
          { te: "నమాజ్ ముగుస్తుంది", en: "The prayer ends" },
          { te: "మనం మాట్లాడతాం", en: "We speak to each other" },
        ],
        answer: 0,
      },
      {
        question: { te: "'అల్‌హమ్దులిల్లాహి రబ్బిల్ ఆలమీన్' అంటే ఏమిటి?", en: "What does alhamdulillahi rabbil alameen mean?" },
        options: [
          { te: "సర్వ లోకాల ప్రభువైన అల్లాహ్‌కే సర్వ స్తుతి", en: "All praise is for Allah, Lord of all the worlds" },
          { te: "అల్లాహ్ గొప్పవాడు", en: "Allah is great" },
          { te: "అల్లాహ్ ఒక్కడే", en: "Allah is One" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రవక్త ﷺ ప్రకారం ఏ వయసులో నమాజ్ నేర్పాలి?", en: "At what age did the Prophet ﷺ say to teach the prayer?" },
        options: [
          { te: "ఏడేళ్ళప్పుడు", en: "At seven" },
          { te: "పన్నెండేళ్ళప్పుడు", en: "At twelve" },
          { te: "మూడేళ్ళప్పుడు", en: "At three" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఫజ్ర్ · జుహ్ర్ · అస్ర్ · మఘ్రిబ్ · ఇషా.", en: "Fajr, Zuhr, Asr, Maghrib, Isha." },
      { te: "వుజూ → నిలబడటం → రుకూ → సజ్దా.", en: "Wudu, standing, bowing, prostration." },
      { te: "ఫాతిహా = రోజుకు 17+ సార్లు.", en: "Al-Fatihah, seventeen times a day or more." },
    ],
    summary: {
      te: "ఐదు నమాజులు మనం అల్లాహ్‌తో మాట్లాడే విధానం; ఖురాన్ ఆయన మనతో మాట్లాడే విధానం. సజ్దాలో మనం ఆయనకు అత్యంత దగ్గర. సూరా అల్-ఫాతిహా అర్థం తెలుసుకోవడంతో మొదలుపెట్టండి.",
      en: "The five prayers are how we speak to Allah and the Quran is how He speaks to us. We are closest to Him in prostration. Start by learning what Surah al-Fatihah means.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఒక నమాజ్‌ను కుటుంబంతో కలిసి చేయండి.",
      en: "Apply it: pray one prayer together with your family today.",
    },
    reading: [
      { label: "Learn Salah portal", url: "/knowledge-center/learn-salah" },
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
    ],
  },

  {
    slug: "young-muslim-leadership",
    portal: "kids-islam",
    title: { te: "స్థాయి 6 — యువ ముస్లిం నాయకత్వం", en: "Level 6 — Young Muslim leadership" },
    intro: {
      te: "నాయకుడు అంటే ఆజ్ఞలు ఇచ్చేవాడు కాదు. ఇస్లాంలో నాయకుడు అంటే బాధ్యత తీసుకునేవాడు — మరియు మీరు ఇప్పుడే మొదలుపెట్టవచ్చు.",
      en: "A leader is not someone who gives orders. In Islam a leader is someone who takes responsibility, and you can start now.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "ప్రవక్త ﷺ చెప్పారు: 'మీలో ప్రతి ఒక్కరూ కాపరులే, మరియు ప్రతి ఒక్కరూ తమ మందకు జవాబుదారులు' (బుఖారీ). అంటే మీరు కూడా ఒక కాపరి. మీ తమ్ముడు, చెల్లెలు మీ బాధ్యత. మీ తరగతిలో ఒంటరిగా ఉన్న పిల్లవాడు మీ బాధ్యత. నాయకత్వం ఒక పదవి కాదు — అది ఒక ప్రవర్తన. మరో మాట ఆయనది: 'నాయకుడు తన ప్రజలకు సేవకుడు'.",
          en: "The Prophet ﷺ said each of you is a shepherd and each of you is answerable for his flock (Bukhari). So you are a shepherd too. Your younger brother or sister is your responsibility. The child sitting alone in your class is your responsibility. Leadership is not a position but a way of behaving. He also said the leader of a people is their servant.",
        },
        check: {
          question: { te: "ప్రవక్త ﷺ ప్రకారం ఎవరు కాపరులు?", en: "According to the Prophet ﷺ, who is a shepherd?" },
          options: [
            { te: "మనలో ప్రతి ఒక్కరూ", en: "Each of us" },
            { te: "పెద్దలు మాత్రమే", en: "Only grown-ups" },
            { te: "నాయకులు మాత్రమే", en: "Only leaders" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "ఉసామా బిన్ జైద్ (ర/అ) ఒక సైన్యానికి సేనాధిపతిగా నియమించబడినప్పుడు ఆయన వయసు పద్దెనిమిదేళ్ళే. ఆ సైన్యంలో అబూ బక్ర్ (ర/అ), ఉమర్ (ర/అ) వంటి పెద్ద సహచరులు కూడా ఉన్నారు. కొందరు ప్రశ్నించారు — ఇంత చిన్నవాడా? ప్రవక్త ﷺ ఆ నిర్ణయాన్ని సమర్థించారు. వయసు కాదు సామర్థ్యం ముఖ్యం. మరో ఉదాహరణ: ముఆజ్ బిన్ జబల్ (ర/అ) చాలా చిన్నవయసులోనే యెమెన్‌కు బోధకుడిగా, న్యాయమూర్తిగా పంపబడ్డారు.",
          en: "Usamah ibn Zayd (RA) was made commander of an army at eighteen, and that army included senior companions such as Abu Bakr (RA) and Umar (RA). Some questioned it: so young? The Prophet ﷺ upheld the appointment. Capability mattered, not age. Another: Mu'adh ibn Jabal (RA) was sent to Yemen as a teacher and judge while still very young.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక 'బాధ్యత జాబితా' రాయండి. మీ చుట్టూ ఉన్నవారిని రాయండి: తమ్ముడు, చెల్లెలు, స్నేహితులు, పొరుగువారు, తరగతిలోని పిల్లలు. ప్రతి పేరు పక్కన 'నేను వీరి కోసం ఒక పని చేయగలను' అని ఒక ఆలోచన రాయండి. తర్వాత ఈ వారంలో వాటిలో ఒకటి చేయండి.",
          en: "Write a responsibility list. Put down the people around you: brother, sister, friends, neighbours, children in your class. Next to each name write one thing you could do for them. Then do one of them this week.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "ఒంటరిగా ఉన్న ఒక వ్యక్తిని కనుగొని వారితో మాట్లాడండి — తరగతిలో, ఆట స్థలంలో, లేదా మీ వీధిలో. వారిని మీ ఆటలోకి ఆహ్వానించండి. ఇది చిన్న పని అనిపిస్తుంది, కానీ ఒక వ్యక్తికి ఇది వారి రోజంతటినీ మార్చవచ్చు. ఇదే నాయకత్వం.",
          en: "Find someone who is on their own and talk to them, in class, in the playground or on your street, and invite them into your game. It feels like a small thing, and for that person it can change the whole day. That is leadership.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "అలీ (ర/అ) ఇస్లాం స్వీకరించినప్పుడు ఆయన వయసు సుమారు పదేళ్ళు. ముస్అబ్ బిన్ ఉమైర్ (ర/అ) మదీనాకు మొదటి ఉపాధ్యాయుడిగా పంపబడినప్పుడు యువకుడే. ఇస్లాం మొదటి తరంలో యువకులు అంచున లేరు — వారు మధ్యలో ఉన్నారు.",
          en: "Ali (RA) was about ten when he accepted Islam. Mus'ab ibn Umayr (RA) was a young man when he was sent to Madinah as its first teacher. In the first generation of Islam young people were not at the edges; they were in the middle of it.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "పిల్లవాడికి ఒక నిజమైన బాధ్యతను ఇవ్వండి — ఒక పని, ఒక ఇష్టం, ఒక చిన్న నిర్ణయం. బాధ్యత తీసుకోవడం అభ్యాసంతోనే వస్తుంది. మరియు వారు తప్పు చేసినప్పుడు బాధ్యతను తీసేయకండి; సరిదిద్దండి. తీసేయడం 'నీవు సమర్థుడివి కాదు' అని నేర్పుతుంది.",
          en: "Give the child a real responsibility: a job, a choice, a small decision. Taking responsibility only comes with practice. And when they get it wrong, do not take the responsibility away; correct it. Taking it away teaches them that they are not capable.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: మీ బొమ్మలు మీరే సర్దుకోవడం, చిన్నవారితో పంచుకోవడం. 8-11 ఏళ్ళు: ఒక చిన్న ఇంటి బాధ్యత తీసుకోవడం, తమ్ముడికి/చెల్లెలికి సహాయం చేయడం. 12-15 ఏళ్ళు: మస్జిద్ లేదా సమాజ కార్యక్రమంలో స్వచ్ఛందంగా పాల్గొనడం; చిన్నవారికి ఏదైనా నేర్పడం.",
          en: "Ages 5 to 7: tidying your own things and sharing with younger children. Ages 8 to 11: taking one household responsibility and helping a younger sibling. Ages 12 to 15: volunteering at the mosque or a community event, and teaching something to someone younger.",
        },
      },
    ],
    takeaways: [
      { te: "'మీలో ప్రతి ఒక్కరూ కాపరులే' — నాయకత్వం అందరికీ.", en: "Each of you is a shepherd; leadership belongs to everyone." },
      { te: "నాయకుడు తన ప్రజలకు సేవకుడు.", en: "The leader of a people is their servant." },
      { te: "ఉసామా (ర/అ) పద్దెనిమిదేళ్ళకే సేనాధిపతి.", en: "Usamah (RA) commanded an army at eighteen." },
    ],
    didYouKnow: [
      { te: "అలీ (ర/అ) సుమారు పదేళ్ళ వయసులో ఇస్లాం స్వీకరించారు.", en: "Ali (RA) accepted Islam at around ten years old." },
    ],
    reflect: [
      { te: "మీ చుట్టూ ఎవరికి మీ సహాయం అవసరమో ఆలోచించండి.", en: "Think of one person near you who could use your help." },
    ],
    mistakes: [
      { te: "'నేను చిన్నవాడిని, నేనేమీ చేయలేను' అనుకోవడం.", en: "Thinking I am too young to do anything." },
    ],
    faqs: [
      {
        question: { te: "నేను నాయకుడిని కాకపోతే?", en: "What if I am not a leader?" },
        answer: {
          te: "ప్రవక్త ﷺ మాట ప్రకారం మీరు ఇప్పటికే ఒక కాపరి — ఎవరి కోసమో మీరు బాధ్యులు. అది ఒక పదవి కాదు, ఒక స్థితి. ప్రశ్న 'నేను నాయకుడినా?' కాదు — 'నేను ఏ బాధ్యతను నిర్వహిస్తున్నాను?'",
          en: "By the Prophet's words you already are a shepherd; you are answerable for someone. It is not a post but a state. The question is not am I a leader but which responsibility am I carrying?",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఉసామా (ర/అ) ఎన్నేళ్ళకు సేనాధిపతి అయ్యారు?", en: "At what age did Usamah (RA) command an army?" },
        options: [
          { te: "పద్దెనిమిది", en: "Eighteen" },
          { te: "నలభై", en: "Forty" },
          { te: "ముప్ఫై", en: "Thirty" },
        ],
        answer: 0,
      },
      {
        question: { te: "'నాయకుడు తన ప్రజలకు...' — ఏమిటి?", en: "The leader of a people is their what?" },
        options: [
          { te: "సేవకుడు", en: "Servant" },
          { te: "యజమాని", en: "Master" },
          { te: "న్యాయమూర్తి", en: "Judge" },
        ],
        answer: 0,
      },
      {
        question: { te: "మదీనాకు మొదటి ఉపాధ్యాయుడిగా ఎవరు వెళ్ళారు?", en: "Who was sent as Madinah's first teacher?" },
        options: [
          { te: "ముస్అబ్ బిన్ ఉమైర్ (ర/అ)", en: "Mus'ab ibn Umayr (RA)" },
          { te: "బిలాల్ (ర/అ)", en: "Bilal (RA)" },
          { te: "ఉమర్ (ర/అ)", en: "Umar (RA)" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ప్రతి ఒక్కరూ కాపరులే; ప్రతి ఒక్కరూ జవాబుదారులే.", en: "Each is a shepherd; each is answerable." },
      { te: "నాయకుడు = సేవకుడు.", en: "The leader is the servant." },
      { te: "వయసు కాదు, సామర్థ్యం.", en: "Capability, not age." },
    ],
    summary: {
      te: "నాయకత్వం ఒక పదవి కాదు, ఒక ప్రవర్తన. ప్రవక్త ﷺ ప్రకారం మనలో ప్రతి ఒక్కరూ కాపరులే. ఉసామా (ర/అ), అలీ (ర/అ), ముస్అబ్ (ర/అ) అందరూ యువకులుగానే బాధ్యతలు తీసుకున్నారు.",
      en: "Leadership is a way of behaving rather than a post. By the Prophet's words each of us is a shepherd. Usamah, Ali and Mus'ab all took responsibility while young.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఒంటరిగా ఉన్న ఒకరితో మాట్లాడండి.",
      en: "Apply it: talk to someone who is on their own today.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Honesty and courage", url: "/knowledge-center/kids-islam/honesty-and-courage" },
    ],
  },

  {
    slug: "ramadan-and-eid",
    portal: "kids-islam",
    title: { te: "స్థాయి 7 — రమదాన్, ఈద్", en: "Level 7 — Ramadan and Eid" },
    intro: {
      te: "రమదాన్ సంవత్సరంలో అత్యంత ప్రత్యేకమైన నెల. దాని చివర ఈద్ — ఒక పండుగ, కానీ కేవలం తినడం, బట్టల కోసం కాదు.",
      en: "Ramadan is the most special month of the year, and Eid comes at the end of it. Eid is a celebration, though not only about food and new clothes.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "రమదాన్‌లో ముస్లింలు తెల్లవారు నుండి సూర్యాస్తమయం వరకు తినరు, తాగరు. కానీ ఉపవాసం కేవలం ఆకలి కాదు. ప్రవక్త ﷺ చెప్పారు: 'ఎవరైతే అబద్ధాలు, చెడు పనులు మానరో, వారి ఆహారం, పానీయం వదలడం అల్లాహ్‌కు అవసరం లేదు' (బుఖారీ). అంటే నోరు తినకుండా ఉండటమే కాదు — నోరు చెడు మాటలు కూడా మానాలి. ఖురాన్ ఉపవాసం దేనికో చెబుతుంది: 'మీరు తఖ్వా పొందడానికి' (అల్-బఖరా 2:183) — అంటే అల్లాహ్ గురించిన స్పృహ.",
          en: "In Ramadan Muslims do not eat or drink from dawn until sunset. But fasting is not only hunger. The Prophet ﷺ said that whoever does not give up false speech and bad conduct, Allah has no need of him giving up his food and drink (Bukhari). So it is not only the mouth not eating; it is the mouth not saying unkind things either. The Quran says what fasting is for: so that you may attain taqwa (Al-Baqarah 2:183), an awareness of Allah.",
        },
        check: {
          question: { te: "ఉపవాసం దేని కోసం?", en: "What is fasting for?" },
          options: [
            { te: "తఖ్వా — అల్లాహ్ గురించిన స్పృహ", en: "Taqwa, awareness of Allah" },
            { te: "బరువు తగ్గడం", en: "Losing weight" },
            { te: "డబ్బు ఆదా చేయడం", en: "Saving money" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "ప్రవక్త ﷺ సాధారణంగానే ఉదారంగా ఉండేవారు, కానీ రమదాన్‌లో ఆయన ఇంకా ఎక్కువ ఉదారంగా అయ్యేవారు. ఇబ్న్ అబ్బాస్ (ర/అ) ఆయనను 'వీచే గాలి కంటే ఉదారుడు' అని వర్ణించారు (బుఖారీ). ఆలోచించండి: గాలి ఎవరినీ అడగదు, ఎవరినీ వదలదు, ప్రతిఫలం ఆశించదు — అది కేవలం వీస్తుంది. రమదాన్‌లో ఇవ్వడం అలా ఉండాలి.",
          en: "The Prophet ﷺ was generous anyway, and in Ramadan he became more so. Ibn Abbas (RA) described him as more generous than the blowing wind (Bukhari). Think about that: the wind asks no one, passes no one by, and expects nothing back. It simply blows. Giving in Ramadan should be like that.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక 'రమదాన్ మంచి పనుల డబ్బా' తయారుచేయండి. ప్రతి రోజూ మీరు ఒక మంచి పని చేస్తే ఒక చిన్న కాగితంపై రాసి డబ్బాలో వేయండి — 'అమ్మకు సహాయం చేశాను', 'ఒక సూరా నేర్చుకున్నాను', 'నా బొమ్మ పంచుకున్నాను'. ఈద్ రోజున డబ్బా తెరిచి అన్నీ చదవండి. అది మీ నెల ఎలా గడిచిందో చూపిస్తుంది.",
          en: "Make a Ramadan good deeds jar. Each day you do something good, write it on a slip and put it in: helped my mother, learned a surah, shared my toy. On the day of Eid, open the jar and read them all. It shows you how your month went.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "మీరు ఇంకా ఉపవాసం ఉండేంత పెద్దవారు కాకపోతే, వేరే విధంగా పాల్గొనవచ్చు: ఇఫ్తార్ సిద్ధం చేయడంలో సహాయం చేయండి, ఒక దుఆ నేర్చుకోండి, లేదా మీ డబ్బులో కొంత దానం చేయండి. ఉపవాసం ఉంటే: ఈ రోజు ఒక్కసారి కూడా కోపంగా మాట్లాడకూడదని ప్రయత్నించండి. అదే నిజమైన ఉపవాసం.",
          en: "If you are not old enough to fast yet you can still take part: help get iftar ready, learn a du'a, or give some of your own money away. If you are fasting, try not to speak in anger even once today. That is the real fast.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ఈద్ రోజున నమాజ్‌కు ముందు 'జకాతుల్ ఫిత్ర్' అనే దానం ఇవ్వాలి — ప్రతి కుటుంబ సభ్యుడి తరపున, పిల్లలతో సహా. దీని ఉద్దేశం స్పష్టం: ఈద్ రోజున ఏ ఇంటిలోనూ ఆకలి ఉండకూడదు. ఈద్ ఆనందం కొందరికి మాత్రమే కాదు, అందరికీ.",
          en: "On the day of Eid, before the prayer, a charity called zakat al-fitr is given on behalf of every member of the family, children included. The purpose is plain: no household should be hungry on Eid. The joy of Eid is not for some people but for everyone.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "పిల్లలు ఉపవాసం ఉండేంత పెద్దవారు కాకముందే వారిని రమదాన్‌లో భాగం చేయండి — సహూర్‌కు లేపడం, ఇఫ్తార్ సిద్ధం చేయడం, తరావీహ్‌కు తీసుకువెళ్ళడం. కొందరు పిల్లలు సగం రోజు ఉపవాసం ఉండాలనుకుంటారు; అది మంచి ఆరంభం. బలవంతం చేయవద్దు — వారు రమదాన్‌ను ఇష్టపడాలి, భయపడకూడదు.",
          en: "Bring children into Ramadan before they are old enough to fast: waking for suhoor, helping with iftar, coming to Tarawih. Some children want to fast half a day, which is a good start. Do not force it. They should come to love Ramadan rather than dread it.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: ఇఫ్తార్‌లో పాల్గొనడం, రమదాన్ అంటే ఏమిటో తెలుసుకోవడం. 8-11 ఏళ్ళు: సగం రోజు లేదా కొన్ని పూర్తి రోజులు ఉపవాసం, ఖురాన్ ఎక్కువ చదవడం. 12-15 ఏళ్ళు: పూర్తి నెల ఉపవాసం, తరావీహ్, మరియు ఉపవాసం నాలుకకు కూడా వర్తిస్తుందని అర్థం చేసుకోవడం.",
          en: "Ages 5 to 7: joining in at iftar and learning what Ramadan is. Ages 8 to 11: half days or some full days of fasting, and reading more Quran. Ages 12 to 15: the full month, Tarawih, and understanding that the fast applies to the tongue too.",
        },
      },
    ],
    takeaways: [
      { te: "ఉపవాసం ఆకలి మాత్రమే కాదు — నాలుక కూడా ఉపవాసం ఉండాలి.", en: "Fasting is not only hunger; the tongue fasts too." },
      { te: "ఉపవాసం లక్ష్యం తఖ్వా (2:183).", en: "The aim of fasting is taqwa (2:183)." },
      { te: "జకాతుల్ ఫిత్ర్: ఈద్ రోజున ఎవరూ ఆకలితో ఉండకూడదు.", en: "Zakat al-fitr: no one should be hungry on Eid." },
    ],
    didYouKnow: [
      { te: "ఇబ్న్ అబ్బాస్ (ర/అ) రమదాన్‌లో ప్రవక్త ﷺను 'వీచే గాలి కంటే ఉదారుడు' అని వర్ణించారు.", en: "Ibn Abbas (RA) described the Prophet ﷺ in Ramadan as more generous than the blowing wind." },
    ],
    reflect: [
      { te: "రమదాన్‌లో మీరు మార్చుకోవాలనుకునే ఒక అలవాటు ఏమిటి?", en: "What is one habit you would like to change in Ramadan?" },
    ],
    mistakes: [
      { te: "ఉపవాసం ఉండి కోపంగా, కఠినంగా మాట్లాడటం.", en: "Fasting while speaking with anger or harshness." },
      { te: "ఈద్‌ను కేవలం బట్టలు, తినడం అనుకోవడం.", en: "Thinking Eid is only about clothes and food." },
    ],
    faqs: [
      {
        question: { te: "పిల్లలు ఉపవాసం ఉండాలా?", en: "Do children have to fast?" },
        answer: {
          te: "ఉపవాసం యుక్తవయసు వచ్చిన తర్వాతే విధి. అంతకుముందు పిల్లలు అభ్యాసంగా, తమకు వీలైనంత ఉండవచ్చు — సగం రోజు, లేదా వారానికి ఒక రోజు. సహాబా తమ పిల్లలను ఇలాగే అలవాటు చేసేవారని ఉల్లేఖనలు చెబుతాయి, మరియు పిల్లలు ఆకలిగా ఉంటే వారికి ఒక బొమ్మ ఇచ్చి మళ్ళించేవారు.",
          en: "Fasting becomes obligatory at puberty. Before that children may fast for practice as much as they can manage, half a day or one day a week. Narrations describe the companions doing exactly this with their children, giving them a toy to distract them when they grew hungry.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ప్రవక్త ﷺ ప్రకారం ఏమి మానకపోతే ఉపవాసానికి అర్థం లేదు?", en: "What did the Prophet ﷺ say must also be given up?" },
        options: [
          { te: "అబద్ధాలు, చెడు పనులు", en: "False speech and bad conduct" },
          { te: "నిద్ర", en: "Sleep" },
          { te: "ఆట", en: "Play" },
        ],
        answer: 0,
      },
      {
        question: { te: "'జకాతుల్ ఫిత్ర్' ఎప్పుడు ఇవ్వాలి?", en: "When is zakat al-fitr given?" },
        options: [
          { te: "ఈద్ నమాజ్‌కు ముందు", en: "Before the Eid prayer" },
          { te: "ఈద్ తర్వాత", en: "After Eid" },
          { te: "రమదాన్ మొదట్లో", en: "At the start of Ramadan" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఉపవాసం ఎప్పుడు విధి అవుతుంది?", en: "When does fasting become obligatory?" },
        options: [
          { te: "యుక్తవయసు వచ్చిన తర్వాత", en: "At puberty" },
          { te: "ఐదేళ్ళప్పుడు", en: "At five" },
          { te: "ఎప్పుడూ కాదు", en: "Never" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "తెల్లవారు నుండి సూర్యాస్తమయం వరకు.", en: "From dawn until sunset." },
      { te: "నోరు తినకపోవడం + నోరు చెడు మాట్లాడకపోవడం.", en: "The mouth not eating and not speaking badly." },
      { te: "జకాతుల్ ఫిత్ర్ ఈద్ నమాజ్‌కు ముందు.", en: "Zakat al-fitr before the Eid prayer." },
    ],
    summary: {
      te: "రమదాన్ ఉపవాసం ఆకలి గురించి కాదు — తఖ్వా గురించి. నాలుక కూడా ఉపవాసం ఉండాలి. ఈద్ రోజున జకాతుల్ ఫిత్ర్ ఇవ్వడం వల్ల ఆనందం అందరికీ చేరుతుంది.",
      en: "Ramadan is not about hunger but about taqwa, and the tongue fasts alongside the stomach. Zakat al-fitr on the day of Eid makes sure the joy reaches everyone.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఒక్కసారి కూడా కోపంగా మాట్లాడకూడదని ప్రయత్నించండి.",
      en: "Apply it: try not to speak in anger even once today.",
    },
    reading: [
      { label: "Islamic calendar", url: "/knowledge-center/islamic-calendar" },
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
    ],
  },

  {
    slug: "honesty-and-courage",
    portal: "kids-islam",
    title: { te: "స్థాయి 8 — నిజాయితీ, ధైర్యం", en: "Level 8 — Honesty and courage" },
    intro: {
      te: "నిజం చెప్పడానికి కొన్నిసార్లు ధైర్యం కావాలి. అందుకే ఈ రెండూ కలిసి ఉంటాయి.",
      en: "Telling the truth sometimes takes courage. That is why these two belong together.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "ప్రవక్త ﷺ చెప్పారు: 'నిజాయితీని పట్టుకోండి, ఎందుకంటే నిజాయితీ మంచితనానికి దారితీస్తుంది, మంచితనం స్వర్గానికి దారితీస్తుంది. ఒక వ్యక్తి నిజం చెబుతూ ఉంటే అల్లాహ్ వద్ద అతను సత్యవంతుడిగా రాయబడతాడు' (బుఖారీ). తర్వాత ఆయన అదే మాటను తలకిందులుగా చెప్పారు: అబద్ధం చెడుకు, చెడు నరకానికి దారితీస్తుంది. అంటే ఒక్క అబద్ధం ఒక అలవాటుగా మారుతుంది, మరియు అలవాటు ఒక వ్యక్తిత్వంగా మారుతుంది.",
          en: "The Prophet ﷺ said hold on to truthfulness, for truthfulness leads to goodness and goodness leads to Paradise, and a person keeps telling the truth until he is written with Allah as truthful (Bukhari). Then he said the same in reverse: lying leads to wrongdoing and wrongdoing to the Fire. One lie becomes a habit, and a habit becomes a character.",
        },
        check: {
          question: { te: "నిజాయితీ దేనికి దారితీస్తుంది?", en: "What does truthfulness lead to?" },
          options: [
            { te: "మంచితనానికి, తర్వాత స్వర్గానికి", en: "Goodness, and then to Paradise" },
            { te: "సంపదకు", en: "Wealth" },
            { te: "ఏమీ కాదు", en: "Nothing" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "కఅబ్ బిన్ మాలిక్ (ర/అ) ఒక యుద్ధానికి వెళ్ళలేదు — ఏ నిజమైన కారణమూ లేకుండా, కేవలం ఆలస్యం చేస్తూ. తిరిగి వచ్చినవారిలో చాలామంది సాకులు చెప్పారు, మరియు ప్రవక్త ﷺ వాటిని అంగీకరించారు. కఅబ్ (ర/అ) వంతు వచ్చినప్పుడు ఆయన ఒక సాకు చెప్పగలిగేవారు. కానీ ఆయన అన్నారు: 'నాకు ఏ కారణమూ లేదు'. యాభై రోజులు ఎవరూ ఆయనతో మాట్లాడలేదు — అది కఠినమైన శిక్ష. తర్వాత అల్లాహ్ ఆయనను క్షమిస్తూ ఖురాన్‌లో ఆయతులు అవతరించాయి (అత్-తౌబా 9:118). ఆయన తర్వాత చెప్పారు: ఆ నిజం చెప్పడమే తన జీవితంలో అల్లాహ్ ఇచ్చిన అతిపెద్ద అనుగ్రహం.",
          en: "Ka'b ibn Malik (RA) did not go on a campaign, with no real reason, simply putting it off. When the army returned many gave excuses and the Prophet ﷺ accepted them. When Ka'b's turn came he could have given one too. He said instead: I have no excuse. For fifty days no one spoke to him, which was a hard punishment. Then verses came in the Quran declaring Allah's forgiveness of him (At-Tawbah 9:118). He said afterwards that telling that truth was the greatest blessing Allah ever gave him.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక కాగితంపై రెండు నిలువు వరుసలు గీయండి. మొదటి వరుసలో: 'అబద్ధం చెబితే ఇప్పుడు ఏమి జరుగుతుంది?' రెండో వరుసలో: 'ఒక వారం తర్వాత ఏమి జరుగుతుంది?' కొన్ని పరిస్థితుల గురించి రెండూ రాయండి. అబద్ధం ఇప్పుడు సులభం చేస్తుంది, తర్వాత కష్టం చేస్తుంది — ఇది కాగితంపై చూస్తే స్పష్టమవుతుంది.",
          en: "Draw two columns on a page. In the first: what happens now if I lie? In the second: what happens a week later? Fill both in for a few situations. A lie makes now easier and later harder, and seeing it written down makes that obvious.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "ఈ రోజు మీరు ఒక పొరపాటు చేస్తే — ఏదైనా పగలగొట్టినా, మర్చిపోయినా, తప్పు చేసినా — ఎవరూ అడగకముందే మీరే చెప్పండి. అడిగిన తర్వాత ఒప్పుకోవడం కంటే ముందే చెప్పడం చాలా కష్టం, మరియు అదే నిజమైన ధైర్యం.",
          en: "If you make a mistake today, breaking something, forgetting something, getting something wrong, say so before anyone asks. Owning up before being asked is much harder than admitting it after, and that is what courage actually is.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ధైర్యం అంటే భయం లేకపోవడం కాదు. ప్రవక్త ﷺ చెప్పారు: 'బలవంతుడు అంటే కుస్తీలో గెలిచేవాడు కాదు; బలవంతుడు అంటే కోపంలో తనను తాను నిగ్రహించుకునేవాడు' (బుఖారీ). అంటే అసలు ధైర్యం లోపల ఉంటుంది, కండరాల్లో కాదు.",
          en: "Courage is not the absence of fear. The Prophet ﷺ said the strong person is not the one who wins at wrestling; the strong one is the one who controls himself when angry (Bukhari). Real strength is on the inside rather than in the muscles.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "ఇది పెద్దలకు ముఖ్యమైనది: పిల్లవాడు నిజం చెప్పినప్పుడు — అది చెడు వార్త అయినా — ముందు నిజం చెప్పినందుకు ప్రశంసించండి, తర్వాత పొరపాటు గురించి మాట్లాడండి. నిజం చెప్పినందుకు శిక్ష పడితే, పిల్లవాడు తర్వాతిసారి అబద్ధం చెప్పడం నేర్చుకుంటాడు. కఅబ్ (ర/అ) కథలో కూడా చివరకు క్షమాపణ వచ్చింది.",
          en: "This one is for the grown-ups. When a child tells the truth, even bad news, praise the truth first and then talk about the mistake. If telling the truth is punished, the child learns to lie next time. In Ka'b's story, forgiveness came in the end too.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: పొరపాటు జరిగినప్పుడు ఒప్పుకోవడం. 8-11 ఏళ్ళు: స్నేహితులు ఒత్తిడి చేసినా నిజం చెప్పడం. 12-15 ఏళ్ళు: ఎవరైనా అన్యాయానికి గురైనప్పుడు మాట్లాడటం — ఇది అత్యంత కష్టమైన ధైర్యం.",
          en: "Ages 5 to 7: owning up when you make a mistake. Ages 8 to 11: telling the truth even when friends push you not to. Ages 12 to 15: speaking up when someone is being treated unfairly, which is the hardest courage of all.",
        },
      },
    ],
    takeaways: [
      { te: "నిజాయితీ మంచితనానికి, మంచితనం స్వర్గానికి.", en: "Truthfulness leads to goodness, and goodness to Paradise." },
      { te: "బలవంతుడు అంటే కోపంలో తనను నిగ్రహించుకునేవాడు.", en: "The strong one controls himself when angry." },
      { te: "అడగకముందే ఒప్పుకోవడం నిజమైన ధైర్యం.", en: "Owning up before being asked is real courage." },
    ],
    didYouKnow: [
      { te: "కఅబ్ (ర/అ) క్షమాపణ ఖురాన్‌లోనే ప్రకటించబడింది (అత్-తౌబా 9:118).", en: "Ka'b's (RA) forgiveness was announced in the Quran itself (At-Tawbah 9:118)." },
    ],
    reflect: [
      { te: "నిజం చెప్పడం కష్టమైన ఒక సందర్భం మీకు గుర్తుందా? అప్పుడు మీరు ఏమి చేశారు?", en: "Can you remember a time when telling the truth was hard? What did you do?" },
    ],
    mistakes: [
      { te: "'చిన్న అబద్ధం పర్వాలేదు' అనుకోవడం — అదే అలవాటుగా మారుతుంది.", en: "Thinking a small lie does not matter, when that is exactly what becomes a habit." },
    ],
    faqs: [
      {
        question: { te: "ఎవరినైనా సంతోషపెట్టడానికి అబద్ధం చెప్పవచ్చా?", en: "Can I lie to make someone happy?" },
        answer: {
          te: "సాధారణంగా కాదు. కానీ ఇస్లాంలో కొన్ని ఇరుకైన మినహాయింపులు ఉన్నాయి — ఇద్దరి మధ్య సయోధ్య కుదర్చడం, యుద్ధంలో, మరియు భార్యాభర్తల మధ్య మంచి మాటలు. ఇవి చాలా పరిమితమైనవి. మిగతా అన్నిటిలో నిజమే. మరియు ఎప్పుడూ ఒక మార్గం ఉంది: నిజాన్ని దయగా చెప్పడం.",
          en: "Generally not. Islam allows a few narrow exceptions, such as reconciling two people, in war, and kind words between a husband and wife. They are very limited. Everywhere else it is the truth. And there is always another way: say the truth kindly.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ప్రవక్త ﷺ ప్రకారం బలవంతుడు ఎవరు?", en: "According to the Prophet ﷺ, who is strong?" },
        options: [
          { te: "కోపంలో తనను నిగ్రహించుకునేవాడు", en: "One who controls himself when angry" },
          { te: "కుస్తీలో గెలిచేవాడు", en: "One who wins at wrestling" },
          { te: "వేగంగా పరుగెత్తేవాడు", en: "One who runs fastest" },
        ],
        answer: 0,
      },
      {
        question: { te: "కఅబ్ (ర/అ) ఏమి చెప్పారు?", en: "What did Ka'b (RA) say?" },
        options: [
          { te: "'నాకు ఏ కారణమూ లేదు'", en: "I have no excuse" },
          { te: "'నేను అనారోగ్యంగా ఉన్నాను'", en: "I was ill" },
          { te: "ఏమీ చెప్పలేదు", en: "Nothing" },
        ],
        answer: 0,
      },
      {
        question: { te: "అబద్ధం దేనికి దారితీస్తుంది?", en: "What does lying lead to?" },
        options: [
          { te: "చెడుకు, తర్వాత నరకానికి", en: "Wrongdoing, and then to the Fire" },
          { te: "ఏమీ కాదు", en: "Nothing" },
          { te: "సంతోషానికి", en: "Happiness" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "నిజాయితీ → మంచితనం → స్వర్గం.", en: "Truthfulness, goodness, Paradise." },
      { te: "బలం = ఆత్మ నిగ్రహం.", en: "Strength is self-control." },
      { te: "అడగకముందే ఒప్పుకోండి.", en: "Own up before being asked." },
    ],
    summary: {
      te: "నిజాయితీ మంచితనానికి దారితీస్తుంది, అబద్ధం దానికి వ్యతిరేకంగా. కఅబ్ (ర/అ) కథ చూపుతుంది: నిజం చెప్పడం కష్టమే, కానీ చివరకు అదే మేలు. మరియు నిజమైన బలం కోపంలో తనను నిగ్రహించుకోవడం.",
      en: "Truthfulness leads to goodness and lying to the opposite. Ka'b's (RA) story shows that telling the truth is hard and turns out best in the end. And real strength is controlling yourself when angry.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ఒక పొరపాటు జరిగితే, ఎవరూ అడగకముందే మీరే చెప్పండి.",
      en: "Apply it: if you make a mistake today, say so before anyone asks.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Good manners", url: "/knowledge-center/kids-islam/good-manners" },
    ],
  },
];
