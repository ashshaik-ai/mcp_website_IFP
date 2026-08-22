/* Kids Islam — replacements for the eight extracted lessons.

   These keep the seven-section shape of the originals (simple lesson, story,
   activity, task, fun fact, parent discussion, age guidance), because it is a
   good format for children and the portal is built around it. What changes is
   the substance: the extracted versions averaged about twenty-seven words a
   section, which is a heading with a sentence under it.

   Written for a child to read or be read to, so the sentences stay short and
   the vocabulary plain, without talking down. */
import type { Lesson } from "../lessons.ts";

export const kidsLessons: Lesson[] = [
  {
    slug: "my-first-islam",
    portal: "kids-islam",
    title: { te: "స్థాయి 1 — నా మొదటి ఇస్లాం", en: "Level 1 — My first Islam" },
    intro: {
      te: "ఇస్లాం అంటే శాంతి. అది అల్లాహ్‌ను తెలుసుకోవడంతో, ఆయనను ప్రేమించడంతో మొదలవుతుంది — ఆయనే అన్నిటినీ సృష్టించాడు.",
      en: "Islam means peace, and it starts with knowing Allah and loving Him. He is the One who made everything.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "అల్లాహ్ ఒక్కడే. ఆయనకు తల్లిదండ్రులు లేరు, పిల్లలు లేరు, ఆయనలాంటివారు ఎవరూ లేరు. ఆయన ఆకాశాన్ని, సముద్రాన్ని, ప్రతి జంతువును, మిమ్మల్ని కూడా సృష్టించాడు. మనం ఆయనను చూడలేము, కానీ ఆయన చేసినవాటిని చూస్తాం — గాలిని చూడలేనట్లే, కానీ చెట్లు కదలడం చూస్తాం. ముహమ్మద్ ﷺ అల్లాహ్ చివరి ప్రవక్త. ఆయన మనకు ఎలా జీవించాలో చూపించారు — ఏమి చెప్పాలో మాత్రమే కాదు, ఎలా ఉండాలో కూడా.",
          en: "Allah is One. He has no parents, no children, and there is nobody like Him. He made the sky, the sea, every animal, and you. We cannot see Him, but we see what He has made, just as we cannot see the wind but we see the trees move. Muhammad ﷺ is Allah's last prophet. He showed us how to live, not only what to say but how to be.",
        },
        check: {
          question: { te: "అల్లాహ్ ఎంతమంది?", en: "How many is Allah?" },
          options: [
            { te: "ఒక్కడే", en: "One" },
            { te: "ఇద్దరు", en: "Two" },
            { te: "చాలామంది", en: "Many" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "ఇబ్రాహీమ్ (అ) చిన్నప్పుడు ఒక ప్రశ్న అడిగారు: 'నా ప్రభువు ఎవరు?' ఆయన నక్షత్రాన్ని చూసి 'ఇదేనా?' అనుకున్నారు — కానీ అది మాయమైపోయింది. చంద్రుడిని చూశారు — అదీ మాయమైంది. సూర్యుడిని చూశారు — అదీ అస్తమించింది. అప్పుడు ఆయన అన్నారు: 'నేను మాయమైపోయేవాటిని ప్రేమించను. నేను ఆకాశాలను, భూమిని సృష్టించినవాడి వైపు తిరుగుతాను'. ఇది ఖురాన్‌లో ఉంది (సూరా అల్-అన్ఆమ్). ఇబ్రాహీమ్ (అ) ఆలోచించారు, ప్రశ్నించారు, మరియు సరైన సమాధానం కనుగొన్నారు.",
          en: "When Ibrahim was young he asked a question: who is my Lord? He looked at a star and thought, is it this? But it disappeared. He looked at the moon, and it disappeared too. He looked at the sun, and it set. Then he said: I do not love things that fade. I turn to the One who made the heavens and the earth. This is in the Quran, in Surah al-An'am. Ibrahim thought, he asked, and he found the right answer.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక కాగితం తీసుకుని దాన్ని రెండు భాగాలుగా విభజించండి. ఒక వైపు: అల్లాహ్ సృష్టించినవి — సూర్యుడు, చెట్టు, పిల్లి, మీ చేయి. మరో వైపు: మనుషులు తయారుచేసినవి — కుర్చీ, ఫోన్, బొమ్మ. తర్వాత ఒక ప్రశ్న అడగండి: ఒక కుర్చీని తయారుచేయడానికి ఒక మనిషి కావాలి. మరి చెట్టును ఎవరు తయారుచేశారు?",
          en: "Take a sheet of paper and split it in two. On one side draw things Allah made: the sun, a tree, a cat, your own hand. On the other draw things people made: a chair, a phone, a toy. Then ask one question. A chair needs a person to make it. So who made the tree?",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "తినడానికి ముందు 'బిస్మిల్లాహ్' అనండి — అంటే 'అల్లాహ్ పేరుతో'. తినడం అయ్యాక 'అల్‌హమ్దులిల్లాహ్' అనండి — అంటే 'అల్లాహ్‌కే సర్వ స్తుతి'. ఈ రెండు పదాలు చాలా చిన్నవి, కానీ అవి ఒక అలవాటుగా మారితే మీరు రోజంతా అల్లాహ్‌ను గుర్తుంచుకుంటారు.",
          en: "Before you eat, say bismillah, which means in the name of Allah. When you finish, say alhamdulillah, which means all praise is for Allah. They are very short, and if they become a habit you will remember Allah all through the day.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ఇస్లాంకు ఐదు స్తంభాలు ఉన్నాయి — ఒక ఇంటిని నిలబెట్టే ఐదు గట్టి స్తంభాల్లా. అవి: షహాదా (అల్లాహ్ ఒక్కడేనని, ముహమ్మద్ ﷺ ఆయన ప్రవక్త అని చెప్పడం), నమాజ్, జకాత్ (దానం), రమదాన్ ఉపవాసం, హజ్ (మక్కా యాత్ర). ఒక స్తంభం లేకపోతే ఇల్లు బలహీనమవుతుంది.",
          en: "Islam has five pillars, like five strong posts holding up a house. They are the shahadah, saying that Allah is One and Muhammad ﷺ is His messenger; the prayer; zakat, which is giving; fasting in Ramadan; and Hajj, the journey to Makkah. If one post is missing the house is weaker.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "పిల్లవాడిని అడగండి: 'అల్లాహ్ సృష్టించిన ఒక వస్తువును చెప్పు, దాని గురించి నీకు ఎందుకు కృతజ్ఞత?' తర్వాత మీరూ ఒకటి చెప్పండి. పిల్లలు తాము చూసినదాన్నే నేర్చుకుంటారు — మీరు కృతజ్ఞత చెప్పడం వారు వింటే వారూ చెబుతారు.",
          en: "Ask the child to name one thing Allah made and why they are thankful for it. Then name one yourself. Children learn what they see, so if they hear you being thankful they will be too.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: అల్లాహ్ అన్నిటినీ సృష్టించాడు, ఆయన మనల్ని ప్రేమిస్తాడు. 8-11 ఏళ్ళు: ఐదు స్తంభాల పేర్లు నేర్చుకోండి, ఒక్కొక్కటి ఏమిటో చెప్పగలగండి. 12-15 ఏళ్ళు: విశ్వాసపు ఆరు మూలాంశాలు (అల్లాహ్, దైవదూతలు, గ్రంథాలు, ప్రవక్తలు, పరలోకం, తఖ్దీర్) మరియు వాటి అర్థం.",
          en: "Ages 5 to 7: Allah made everything and He loves us. Ages 8 to 11: learn the names of the five pillars and be able to say what each one is. Ages 12 to 15: the six articles of faith, meaning Allah, the angels, the books, the prophets, the hereafter and divine decree, and what each means.",
        },
      },
    ],
    takeaways: [
      { te: "అల్లాహ్ ఒక్కడే; ఆయన అన్నిటినీ సృష్టించాడు.", en: "Allah is One, and He made everything." },
      { te: "ముహమ్మద్ ﷺ చివరి ప్రవక్త.", en: "Muhammad ﷺ is the last prophet." },
      { te: "ఐదు స్తంభాలు ఇస్లాంను నిలబెడతాయి.", en: "The five pillars hold Islam up." },
    ],
    didYouKnow: [
      { te: "ఖురాన్‌లో ఇబ్రాహీమ్ (అ) చిన్నప్పుడు ఆలోచించి అల్లాహ్‌ను కనుగొన్న కథ ఉంది.", en: "The Quran tells how Ibrahim, when young, thought it through and found Allah." },
    ],
    reflect: [
      { te: "ఈ రోజు మీరు చూసిన అల్లాహ్ సృష్టిలో అత్యంత అందమైనది ఏమిటి?", en: "What was the most beautiful thing Allah made that you saw today?" },
    ],
    mistakes: [
      { te: "అల్లాహ్ ఎలా ఉంటాడో ఊహించడానికి ప్రయత్నించడం — ఆయనలాంటివారు ఎవరూ లేరు.", en: "Trying to picture what Allah looks like, when there is nothing like Him." },
    ],
    faqs: [
      {
        question: { te: "అల్లాహ్ ఎక్కడ ఉన్నాడు?", en: "Where is Allah?" },
        answer: {
          te: "అల్లాహ్ మనలాగా ఒక చోట ఉండడు — ఆయన సృష్టిలాంటివాడు కాదు. ఆయన మనం చేసేదంతా చూస్తాడు, మనం చెప్పేదంతా వింటాడు. ఖురాన్ చెబుతుంది ఆయన మనకు మన మెడలోని నరం కంటే దగ్గరగా ఉన్నాడని (సూరా ఖాఫ్). పెద్దయ్యాక మీరు దీని గురించి ఇంకా నేర్చుకుంటారు.",
          en: "Allah is not in a place the way we are, because He is not like His creation. He sees everything we do and hears everything we say. The Quran says He is nearer to us than our own jugular vein, in Surah Qaf. You will learn more about this as you grow.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'బిస్మిల్లాహ్' అంటే ఏమిటి?", en: "What does bismillah mean?" },
        options: [
          { te: "అల్లాహ్ పేరుతో", en: "In the name of Allah" },
          { te: "ధన్యవాదాలు", en: "Thank you" },
          { te: "వీడ్కోలు", en: "Goodbye" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఇస్లాంకు ఎన్ని స్తంభాలు?", en: "How many pillars does Islam have?" },
        options: [
          { te: "ఐదు", en: "Five" },
          { te: "మూడు", en: "Three" },
          { te: "పది", en: "Ten" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఇబ్రాహీమ్ (అ) చివరకు ఎవరి వైపు తిరిగారు?", en: "Whom did Ibrahim finally turn to?" },
        options: [
          { te: "ఆకాశాలను, భూమిని సృష్టించినవాడి వైపు", en: "The One who made the heavens and the earth" },
          { te: "సూర్యుడి వైపు", en: "The sun" },
          { te: "చంద్రుడి వైపు", en: "The moon" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అల్లాహ్ ఒక్కడే · ముహమ్మద్ ﷺ చివరి ప్రవక్త.", en: "Allah is One; Muhammad ﷺ is the last prophet." },
      { te: "ఐదు స్తంభాలు: షహాదా, నమాజ్, జకాత్, ఉపవాసం, హజ్.", en: "Five pillars: shahadah, prayer, zakat, fasting, Hajj." },
      { te: "బిస్మిల్లాహ్ ముందు · అల్‌హమ్దులిల్లాహ్ తర్వాత.", en: "Bismillah before, alhamdulillah after." },
    ],
    summary: {
      te: "అల్లాహ్ ఒక్కడే, ఆయన అన్నిటినీ సృష్టించాడు, మరియు ఆయనలాంటివారు ఎవరూ లేరు. ముహమ్మద్ ﷺ ఆయన చివరి ప్రవక్త. ఇస్లాంకు ఐదు స్తంభాలు ఉన్నాయి. తినే ముందు బిస్మిల్లాహ్, తర్వాత అల్‌హమ్దులిల్లాహ్ — ఇక్కడి నుండి మొదలుపెట్టండి.",
      en: "Allah is One, He made everything, and there is nothing like Him. Muhammad ﷺ is His last prophet. Islam has five pillars. Say bismillah before eating and alhamdulillah after, and start from there.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు ప్రతి భోజనానికి ముందు, తర్వాత ఆ రెండు పదాలు చెప్పండి.",
      en: "Apply it: say those two words before and after every meal today.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Good manners", url: "/knowledge-center/kids-islam/good-manners" },
    ],
  },

  {
    slug: "good-manners",
    portal: "kids-islam",
    title: { te: "స్థాయి 2 — మంచి నడవడిక", en: "Level 2 — Good manners" },
    intro: {
      te: "మంచి నడవడిక ఒక శక్తి. దయ, నిజాయితీ, గౌరవం — ఇవి అల్లాహ్‌కు ఇష్టం, మరియు మీ చుట్టూ ఉన్నవారిని సంతోషపెడతాయి.",
      en: "Good manners are a kind of strength. Kindness, honesty and respect please Allah and make the people around you glad.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "ప్రవక్త ﷺ చెప్పారు: 'మీలో ఉత్తములు ఎవరంటే, ఎవరి నడవడిక ఉత్తమమో వారే' (బుఖారీ). ఆలోచించండి: 'ఎవరు ఎక్కువ నమాజ్ చేస్తారో' అని కాదు, 'ఎవరు ఎక్కువ చదువుకున్నారో' అని కాదు — నడవడిక. మరో చోట ఆయన చెప్పారు: పునరుత్థాన దినాన త్రాసులో అత్యంత బరువైనది మంచి నడవడికే (తిర్మిజీ). అంటే మంచిగా ఉండటం అనేది ఇస్లాంకు అదనం కాదు — అదే ఇస్లాంలో పెద్ద భాగం.",
          en: "The Prophet ﷺ said the best of you are those with the best manners (Bukhari). Think about that. Not whoever prays the most, not whoever has studied the most, but manners. He also said that nothing is heavier on the scales on the Day of Judgement than good character (Tirmidhi). Being good is not an extra on top of Islam; it is a large part of Islam.",
        },
        check: {
          question: { te: "ప్రవక్త ﷺ ప్రకారం ఉత్తములు ఎవరు?", en: "According to the Prophet ﷺ, who are the best people?" },
          options: [
            { te: "ఎవరి నడవడిక ఉత్తమమో వారు", en: "Those with the best manners" },
            { te: "ఎవరు ధనవంతులో వారు", en: "Those who are richest" },
            { te: "ఎవరు బలవంతులో వారు", en: "Those who are strongest" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "మదీనాలో ఒక వ్యక్తి ప్రవక్త ﷺను రోజూ దూషించేవాడు, ఆయన నడిచే దారిలో చెత్త వేసేవాడు. ఒక రోజు చెత్త లేదు. ప్రవక్త ﷺ అడిగారు — ఆ వ్యక్తి అనారోగ్యంతో ఉన్నాడని తెలిసింది. ఆయన అతన్ని చూడటానికి వెళ్ళారు. ఆ వ్యక్తి ఆశ్చర్యపోయాడు: తనను ద్వేషించడానికి కారణం ఉన్న వ్యక్తి తనను చూడటానికి వచ్చాడు. అతను ఇస్లాం స్వీకరించాడు. దయ కొన్నిసార్లు వాదన కంటే బలమైనది.",
          en: "In Madinah there was a man who insulted the Prophet ﷺ every day and threw rubbish where he walked. One day there was no rubbish. The Prophet ﷺ asked after him and learned he was ill, so he went to visit him. The man was astonished: the person with every reason to dislike him had come to see him. He accepted Islam. Kindness is sometimes stronger than an argument.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "ఒక 'దయ పట్టిక' తయారుచేయండి. ఏడు రోజులకు ఏడు గడులు. ప్రతి రోజూ మీరు ఒకరికి సహాయం చేస్తే, ఏదైనా పంచుకుంటే, లేదా మంచి మాట చెబితే ఆ గడిలో ఒక నక్షత్రం గీయండి. వారం చివర్లో చూడండి. ఖాళీ గడులు ఉంటే ఫర్వాలేదు — తర్వాతి వారం మళ్ళీ మొదలుపెట్టండి.",
          en: "Make a kindness chart with seven boxes, one for each day. Each day you help someone, share something, or say something kind, draw a star in that day's box. Look at it at the end of the week. If some boxes are empty that is all right; start again next week.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "రెండు పనులు. ఒకటి: మీ అమ్మ లేదా నాన్నకు అడగకుండానే ఒక పనిలో సహాయం చేయండి. రెండు: ఈ రోజు మీరు కలిసే ప్రతి ఒక్కరికీ చిరునవ్వు నవ్వండి. ప్రవక్త ﷺ చెప్పారు: మీ సోదరుడి ముఖం చూసి చిరునవ్వడం ఒక సదఖా (తిర్మిజీ) — అంటే అది దానం చేసినంత మంచిది.",
          en: "Two things. Help your mother or father with one job without being asked. And smile at everyone you meet today. The Prophet ﷺ said smiling at your brother's face is a charity (Tirmidhi), which means it counts as if you had given something away.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ప్రవక్త ﷺ ఎప్పుడూ ఒక వ్యక్తితో కరచాలనం చేసినప్పుడు ఆ వ్యక్తి చేయి వదిలేవరకు తన చేతిని వెనక్కి తీసుకునేవారు కాదు. ఆయన ఎప్పుడూ ఎవరి మాటనూ మధ్యలో ఆపేవారు కాదు. మరియు ఆయన పిల్లలకు కూడా సలామ్ చెప్పేవారు — వారు చిన్నవారు కదా అని కాదు.",
          en: "The Prophet ﷺ never took his hand back first from a handshake. He never cut anyone off while they were speaking. And he greeted children with salam too, not skipping them because they were small.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "పిల్లవాడు దయ చూపిన ఒక సందర్భాన్ని గుర్తుచేసుకుని, దాన్ని పేరుపెట్టి ప్రశంసించండి — 'నీవు మంచివాడివి' అని కాకుండా 'నీవు నీ తమ్ముడితో బొమ్మ పంచుకున్నావు, అది దయ'. నిర్దిష్టమైన ప్రశంస మళ్ళీ అలా చేయడానికి ప్రోత్సహిస్తుంది.",
          en: "Recall a time the child was kind and praise it by name: not you are good, but you shared your toy with your brother, and that was kind. Praise that names the thing makes it more likely to happen again.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: 'దయచేసి', 'ధన్యవాదాలు' చెప్పడం, పంచుకోవడం. 8-11 ఏళ్ళు: నిజం చెప్పడం కష్టమైనప్పుడు కూడా, పెద్దలను గౌరవించడం. 12-15 ఏళ్ళు: మీరు కోపంగా ఉన్నప్పుడు కూడా నడవడికను నిలబెట్టుకోవడం; చిన్నవారికి ఆదర్శంగా ఉండటం.",
          en: "Ages 5 to 7: saying please and thank you, and sharing. Ages 8 to 11: telling the truth even when it is hard, and respecting elders. Ages 12 to 15: keeping your manners even when angry, and being an example for younger children.",
        },
      },
    ],
    takeaways: [
      { te: "ఉత్తములు ఎవరంటే నడవడిక ఉత్తమంగా ఉన్నవారు.", en: "The best people are those with the best manners." },
      { te: "త్రాసులో అత్యంత బరువైనది మంచి నడవడిక.", en: "Nothing is heavier on the scales than good character." },
      { te: "చిరునవ్వు ఒక సదఖా.", en: "A smile is a charity." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ కరచాలనంలో ఎప్పుడూ మొదట చేయి వెనక్కి తీసుకునేవారు కాదు.", en: "The Prophet ﷺ was never the first to withdraw his hand from a handshake." },
    ],
    reflect: [
      { te: "ఈ రోజు ఎవరైనా మీ పట్ల దయగా ఉన్నారా? మీరు ఎవరి పట్ల దయగా ఉన్నారు?", en: "Was anyone kind to you today? Who were you kind to?" },
    ],
    mistakes: [
      { te: "ఇంటి బయట మంచిగా, ఇంట్లో కఠినంగా ఉండటం — నిజమైన నడవడిక ఇంట్లోనే మొదలవుతుంది.", en: "Being good outside and harsh at home, when real manners start at home." },
    ],
    faqs: [
      {
        question: { te: "ఎవరైనా నా పట్ల చెడుగా ఉంటే నేను కూడా చెడుగా ఉండవచ్చా?", en: "If someone is unkind to me, can I be unkind back?" },
        answer: {
          te: "ఖురాన్ చెబుతుంది: 'చెడును మంచితో తిప్పికొట్టు; అప్పుడు నీకూ, అతనికీ మధ్య శత్రుత్వం ఉన్నవాడు సన్నిహిత మిత్రుడిలా అవుతాడు' (ఫుస్సిలత్ 41:34). ఇది కష్టం — ఖురాన్ కూడా అది కష్టమని ఒప్పుకుంటుంది. కానీ చెత్త వేసిన వ్యక్తి కథ గుర్తుందా? అలా జరుగుతుంది.",
          en: "The Quran says repel evil with what is better, and then the one you had enmity with becomes like a close friend (Fussilat 41:34). It is hard, and the Quran admits it is hard. But remember the man who threw the rubbish. That is what can happen.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "త్రాసులో అత్యంత బరువైనది ఏమిటి?", en: "What is heaviest on the scales?" },
        options: [
          { te: "మంచి నడవడిక", en: "Good character" },
          { te: "బంగారం", en: "Gold" },
          { te: "పుస్తకాలు", en: "Books" },
        ],
        answer: 0,
      },
      {
        question: { te: "చిరునవ్వు ఏమిటని ప్రవక్త ﷺ చెప్పారు?", en: "What did the Prophet ﷺ say a smile is?" },
        options: [
          { te: "ఒక సదఖా", en: "A charity" },
          { te: "ఒక అలవాటు", en: "A habit" },
          { te: "ఒక నియమం", en: "A rule" },
        ],
        answer: 0,
      },
      {
        question: { te: "చెత్త వేసిన వ్యక్తి అనారోగ్యంతో ఉన్నప్పుడు ప్రవక్త ﷺ ఏమి చేశారు?", en: "What did the Prophet ﷺ do when the man who threw rubbish fell ill?" },
        options: [
          { te: "అతన్ని చూడటానికి వెళ్ళారు", en: "He went to visit him" },
          { te: "సంతోషపడ్డారు", en: "He was pleased" },
          { te: "ఏమీ చేయలేదు", en: "He did nothing" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఉత్తములు = ఉత్తమ నడవడిక ఉన్నవారు.", en: "The best are those with the best manners." },
      { te: "చిరునవ్వు = సదఖా.", en: "A smile is a charity." },
      { te: "ఖురాన్ 41:34 — చెడును మంచితో తిప్పికొట్టు.", en: "Quran 41:34: repel evil with what is better." },
    ],
    summary: {
      te: "ఇస్లాంలో మంచి నడవడిక అదనం కాదు — అది కేంద్రం. ఉత్తములు ఎవరంటే నడవడిక ఉత్తమంగా ఉన్నవారు, మరియు త్రాసులో అత్యంత బరువైనది అదే. చిరునవ్వు కూడా ఒక దానం.",
      en: "Good manners are not an extra in Islam but central to it. The best people are those with the best manners, and nothing weighs heavier on the scales. Even a smile counts as giving.",
    },
    apply: {
      te: "ఆచరణ: ఈ రోజు అడగకుండానే ఇంట్లో ఒక పని చేయండి.",
      en: "Apply it: do one job at home today without being asked.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Daily duas", url: "/knowledge-center/kids-islam/daily-duas" },
    ],
  },

  {
    slug: "daily-duas",
    portal: "kids-islam",
    title: { te: "స్థాయి 3 — రోజువారీ దుఆలు", en: "Level 3 — Everyday duas" },
    intro: {
      te: "దుఆ అంటే అల్లాహ్‌తో మాట్లాడటం. దానికి ప్రత్యేక సమయం అవసరం లేదు, ప్రత్యేక చోటు అవసరం లేదు — రోజంతా ఎప్పుడైనా.",
      en: "A du'a is talking to Allah. It needs no special time and no special place; you can do it at any point in the day.",
    },
    sections: [
      {
        heading: { te: "📖 సులభమైన పాఠం", en: "📖 The simple lesson" },
        body: {
          te: "దుఆ ఒక ప్రార్థన కాదు — అది ఒక సంభాషణ. నమాజుకు సమయాలు, నియమాలు ఉన్నాయి; దుఆకు లేవు. మీరు నడుస్తూ, ఆడుకుంటూ, పడుకునే ముందు — ఎప్పుడైనా అడగవచ్చు, మరియు మీ సొంత భాషలో అడగవచ్చు. తెలుగులో అడిగినా అల్లాహ్ వింటాడు. ప్రవక్త ﷺ చెప్పారు: 'దుఆయే ఆరాధన' (తిర్మిజీ). అంటే అడగడం అనేది బలహీనత కాదు — అదే ఆరాధన.",
          en: "A du'a is not a ritual, it is a conversation. The prayer has fixed times and rules; du'a has neither. You can ask while walking, while playing, before sleeping, and you can ask in your own language. Allah hears you in Telugu. The Prophet ﷺ said that du'a is worship itself (Tirmidhi), so asking is not weakness; it is the worship.",
        },
        check: {
          question: { te: "దుఆ ఏ భాషలో చేయవచ్చు?", en: "In which language can you make du'a?" },
          options: [
            { te: "ఏ భాషలోనైనా", en: "Any language" },
            { te: "అరబిక్‌లో మాత్రమే", en: "Arabic only" },
            { te: "ఉర్దూలో మాత్రమే", en: "Urdu only" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "🌙 కథ", en: "🌙 Story time" },
        body: {
          te: "యూనుస్ (అ) ఒక పెద్ద చేప కడుపులో చిక్కుకున్నారు — చీకటిలో, సముద్రం లోతులో, బయటపడే మార్గం లేకుండా. అక్కడ ఆయన అన్నారు: 'లా ఇలాహ ఇల్లా అంత సుబ్‌హానక ఇన్నీ కుంతు మినజ్ జాలిమీన్' — 'నీవు తప్ప ఆరాధ్యుడు లేడు, నీవు పరిశుద్ధుడివి, నిశ్చయంగా నేను తప్పు చేశాను'. అల్లాహ్ ఆయనను రక్షించాడు. ఖురాన్ తర్వాత చెబుతుంది: 'ఇలాగే మేము విశ్వాసులను రక్షిస్తాం' (అల్-అంబియా 21:88). అంటే ఆ దుఆ యూనుస్ (అ)కు మాత్రమే కాదు — మనందరికీ.",
          en: "Yunus was trapped inside a great fish: in the dark, deep in the sea, with no way out. There he said, there is no god but You, glory be to You, I have indeed been of the wrongdoers. Allah rescued him. Then the Quran says: thus do We save the believers (Al-Anbiya 21:88). So that du'a was not only for Yunus; it is for all of us.",
        },
      },
      {
        heading: { te: "🎨 చేసి చూడండి", en: "🎨 Try this" },
        body: {
          te: "దుఆ కార్డులు తయారుచేయండి. చిన్న కాగితాలపై ఒక్కో దుఆ రాసి, అది ఎక్కడ చెప్పాలో అక్కడ అతికించండి — భోజన బల్ల దగ్గర తినే దుఆ, మంచం దగ్గర నిద్ర దుఆ, తలుపు దగ్గర బయటికి వెళ్ళే దుఆ, స్నానాల గది తలుపుపై దాని దుఆ. ఒక వారంలో మీరు వాటిని చూడకుండానే చెప్పగలరు.",
          en: "Make du'a cards. Write one du'a on each small card and stick it where you say it: the eating du'a by the table, the sleeping du'a by the bed, the leaving-the-house du'a by the door, the bathroom du'a on that door. Within a week you will be saying them without looking.",
        },
      },
      {
        heading: { te: "✅ ఈ రోజు చేయవలసినది", en: "✅ Do this today" },
        body: {
          te: "నిద్ర దుఆను నేర్చుకుని ఈ రాత్రి చెప్పండి: 'బిస్మిక అల్లాహుమ్మ అమూతు వ అహ్‌యా' — 'ఓ అల్లాహ్, నీ పేరుతో నేను మరణిస్తాను, జీవిస్తాను'. లేచినప్పుడు: 'అల్‌హమ్దులిల్లాహిల్లజీ అహ్‌యానా బఅద మా అమాతనా' — 'మనల్ని మరణింపజేసిన తర్వాత మళ్ళీ జీవింపజేసిన అల్లాహ్‌కే స్తుతి'. నిద్ర ఒక చిన్న మరణం లాంటిదని ఇస్లాం చెబుతుంది.",
          en: "Learn the sleeping du'a and say it tonight: bismika Allahumma amootu wa ahya, in Your name O Allah I die and I live. And on waking: alhamdulillahi alladhee ahyana ba'da ma amatana, praise be to Allah who gave us life after He caused us to die. Islam describes sleep as a small death.",
        },
      },
      {
        heading: { te: "✨ తెలుసా?", en: "✨ Did you know?" },
        body: {
          te: "ప్రవక్త ﷺ చెప్పారు: మీరు దుఆ చేసినప్పుడు మూడింటిలో ఒకటి జరుగుతుంది — అల్లాహ్ మీరు అడిగినది ఇస్తాడు, లేదా దాన్ని తర్వాత కోసం ఉంచుతాడు, లేదా దానికి బదులుగా ఏదైనా చెడును తప్పిస్తాడు (అహ్మద్). అంటే ఏ దుఆ కూడా వృథా కాదు — మీకు 'లేదు' అనిపించినా.",
          en: "The Prophet ﷺ said that when you make du'a one of three things happens: Allah gives you what you asked for, or He keeps it for you for later, or He turns away some harm instead (Ahmad). So no du'a is ever wasted, even when it feels like a no.",
        },
      },
      {
        heading: { te: "👨‍👩‍👧 అమ్మానాన్నలతో మాట్లాడండి", en: "👨‍👩‍👧 Talk with a grown-up" },
        body: {
          te: "ఈ వారం కుటుంబం మొత్తం ఒకే దుఆను నేర్చుకోండి. భోజన సమయంలో అందరూ కలిసి చెప్పండి. పిల్లలకు దుఆ ఒక పనిలా కాక కుటుంబం కలిసి చేసే విషయంలా అనిపించాలి. అలాగే పిల్లవాడిని 'ఈ రోజు నీవు అల్లాహ్‌ను ఏమి అడగాలనుకుంటున్నావు?' అని అడగండి.",
          en: "Learn one du'a together as a family this week and say it together at a meal. Du'a should feel to a child like something the family does together rather than a chore. And ask the child what they would like to ask Allah for today.",
        },
      },
      {
        heading: { te: "🎯 ప్రతి వయసుకూ", en: "🎯 For each age" },
        body: {
          te: "5-7 ఏళ్ళు: బిస్మిల్లాహ్, అల్‌హమ్దులిల్లాహ్. 8-11 ఏళ్ళు: తినే, నిద్రించే, ప్రయాణ దుఆలు. 12-15 ఏళ్ళు: ఉదయ, సాయంత్ర అజ్కార్, మరియు దుఆ మర్యాదలు — అల్లాహ్‌ను స్తుతించడంతో మొదలుపెట్టడం, ప్రవక్త ﷺపై దురూద్ చేర్చడం.",
          en: "Ages 5 to 7: bismillah and alhamdulillah. Ages 8 to 11: the duas for eating, sleeping and travelling. Ages 12 to 15: the morning and evening adhkar, and the manners of du'a, beginning with praise of Allah and including salawat on the Prophet ﷺ.",
        },
      },
    ],
    takeaways: [
      { te: "దుఆ ఏ భాషలోనైనా, ఏ సమయంలోనైనా.", en: "Du'a can be in any language and at any time." },
      { te: "'దుఆయే ఆరాధన' (తిర్మిజీ).", en: "Du'a is worship itself (Tirmidhi)." },
      { te: "ఏ దుఆ వృథా కాదు — మూడు రకాల సమాధానాలు ఉన్నాయి.", en: "No du'a is wasted; there are three kinds of answer." },
    ],
    didYouKnow: [
      { te: "యూనుస్ (అ) దుఆ ఖురాన్‌లో ఉంది, మరియు అది మనందరికీ అని ఖురాన్ స్వయంగా చెబుతుంది.", en: "The du'a of Yunus is in the Quran, and the Quran itself says it is for all of us." },
    ],
    reflect: [
      { te: "ఈ రోజు మీరు అల్లాహ్‌ను ఏమి అడగాలనుకుంటున్నారు?", en: "What would you like to ask Allah for today?" },
    ],
    mistakes: [
      { te: "అరబిక్ రాదని దుఆ చేయకపోవడం — మీ భాషలో అడగండి.", en: "Not making du'a because you do not know Arabic; ask in your own language." },
    ],
    faqs: [
      {
        question: { te: "అల్లాహ్ నా దుఆకు సమాధానం ఇవ్వకపోతే?", en: "What if Allah does not answer my du'a?" },
        answer: {
          te: "సమాధానం ఎప్పుడూ వస్తుంది, కానీ మూడు రూపాల్లో ఒకటిగా: మీరు అడిగినది ఇప్పుడు, లేదా తర్వాత, లేదా దానికి బదులుగా ఏదైనా చెడు తొలగింపు. కొన్నిసార్లు మనం మనకు మంచిది కానిదాన్ని అడుగుతాం, మరియు అల్లాహ్‌కు మనకంటే బాగా తెలుసు.",
          en: "An answer always comes, in one of three forms: what you asked for now, or later, or some harm turned away instead. Sometimes we ask for what is not good for us, and Allah knows better than we do.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నిద్రించే ముందు ఏమి చెబుతారు?", en: "What is said before sleeping?" },
        options: [
          { te: "బిస్మిక అల్లాహుమ్మ అమూతు వ అహ్‌యా", en: "Bismika Allahumma amootu wa ahya" },
          { te: "అల్లాహు అక్బర్", en: "Allahu akbar" },
          { te: "జజాకల్లాహు ఖైరన్", en: "Jazaak Allahu khayran" },
        ],
        answer: 0,
      },
      {
        question: { te: "యూనుస్ (అ) దుఆ ఎక్కడ చేశారు?", en: "Where did Yunus make his du'a?" },
        options: [
          { te: "ఒక పెద్ద చేప కడుపులో", en: "Inside a great fish" },
          { te: "ఒక కొండపై", en: "On a mountain" },
          { te: "ఒక మస్జిద్‌లో", en: "In a mosque" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రవక్త ﷺ దుఆ గురించి ఏమన్నారు?", en: "What did the Prophet ﷺ say about du'a?" },
        options: [
          { te: "'దుఆయే ఆరాధన'", en: "Du'a is worship" },
          { te: "'దుఆ ఐచ్ఛికం'", en: "Du'a is optional" },
          { te: "'దుఆ కష్టం'", en: "Du'a is difficult" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఏ భాషలోనైనా · ఏ సమయంలోనైనా · ఏ చోటైనా.", en: "Any language, any time, any place." },
      { te: "మూడు సమాధానాలు: ఇప్పుడు · తర్వాత · చెడు తొలగింపు.", en: "Three answers: now, later, or harm turned away." },
      { te: "యూనుస్ (అ) దుఆ మనందరికీ.", en: "The du'a of Yunus is for all of us." },
    ],
    summary: {
      te: "దుఆ అల్లాహ్‌తో మాట్లాడటం — ఏ భాషలోనైనా, ఎప్పుడైనా. అది ఆరాధనలో భాగం, అదనం కాదు. ఏ దుఆ వృథా కాదు; సమాధానం మూడు రూపాల్లో ఒకటిగా వస్తుంది.",
      en: "Du'a is talking to Allah, in any language and at any time. It is part of worship rather than an extra. No du'a is wasted; the answer comes in one of three forms.",
    },
    apply: {
      te: "ఆచరణ: నిద్ర దుఆను ఈ రాత్రి చెప్పండి, ఉదయ దుఆను రేపు చెప్పండి.",
      en: "Apply it: say the sleeping du'a tonight and the waking one tomorrow.",
    },
    reading: [
      { label: "Kids Islam portal", url: "/knowledge-center/kids-islam" },
      { label: "Prophet stories", url: "/knowledge-center/kids-islam/stories-of-the-prophets" },
    ],
  },
];
