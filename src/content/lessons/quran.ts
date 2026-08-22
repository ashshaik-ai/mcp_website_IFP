/* Learn Quran — replacements for levels 1 to 4 of the extracted lessons.

   The extracted versions had three sections each and a median of 130 English
   words. Same slugs, so all-lessons.ts substitutes them in place. */
import type { Lesson } from "../lessons.ts";

export const quranLessons: Lesson[] = [
  {
    slug: "whatis",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 1 — ఖురాన్ అంటే ఏమిటి",
      en: "Level 1 — What the Quran is",
    },
    intro: {
      te: "ఖురాన్ అల్లాహ్ వాక్కు, ఇరవై మూడు సంవత్సరాలలో ప్రవక్త ﷺకు అవతరించింది. ఈ పాఠం అది ఎలా అవతరించిందో, ఎలా అమర్చబడిందో, ఎలా మార్పు లేకుండా భద్రపరచబడిందో వివరిస్తుంది.",
      en: "The Quran is the word of Allah, revealed to the Prophet ﷺ across twenty-three years. This lesson covers how it came, how it is arranged, and how it was preserved without change.",
    },
    sections: [
      {
        heading: { te: "ఒకేసారి కాదు — ఇరవై మూడు సంవత్సరాలు", en: "Not at once, but over twenty-three years" },
        body: {
          te: "ఖురాన్ ఒక పుస్తకంగా ఒకేసారి ఇవ్వబడలేదు. అది సంఘటనలకు, ప్రశ్నలకు, పరిస్థితులకు స్పందిస్తూ దశలవారీగా అవతరించింది. ఖురాన్ స్వయంగా దీన్ని వివరిస్తుంది: 'మేము దీన్ని విభాగాలుగా విడదీశాము, నీవు ప్రజలకు నెమ్మదిగా చదివి వినిపించడానికి' (అల్-ఇస్రా 17:106). దీని ప్రయోజనం స్పష్టం: ఒక సమాజాన్ని క్రమంగా మార్చడం. మద్యపానంపై నిషేధం మూడు దశల్లో వచ్చింది — ఒక్క ఆదేశంతో కాదు.",
          en: "The Quran was not handed down as a finished book. It came in stages, responding to events, questions and circumstances. It says so itself: 'We have divided it into parts, so that you may recite it to people slowly' (Al-Isra 17:106). The purpose is plain: to change a society gradually. The prohibition of intoxicants came in three stages rather than one command.",
        },
        check: {
          question: { te: "ఖురాన్ ఎంతకాలంలో అవతరించింది?", en: "Over what period was the Quran revealed?" },
          options: [
            { te: "ఇరవై మూడు సంవత్సరాలు", en: "Twenty-three years" },
            { te: "ఒక్క రాత్రిలో", en: "In a single night" },
            { te: "వంద సంవత్సరాలు", en: "A hundred years" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మక్కీ, మదనీ — రెండు స్వరాలు", en: "Makkan and Madinan: two registers" },
        body: {
          te: "హిజ్రత్‌కు ముందు అవతరించినవి మక్కీ, తర్వాతివి మదనీ. వాటి స్వరం స్పష్టంగా వేరు. మక్కీ సూరాలు సాధారణంగా చిన్నవి, శక్తివంతమైన లయతో, తౌహీద్, పరలోకం, ప్రవక్తల కథలపై దృష్టి — ఎందుకంటే అప్పుడు విశ్వాసాన్ని స్థాపించడమే పని. మదనీ సూరాలు పొడవైనవి, వివరమైనవి, చట్టం, సమాజ నిర్వహణ, ఒప్పందాలు, కుటుంబ విషయాలపై — ఎందుకంటే అప్పటికి ఒక సమాజం ఏర్పడి ఉంది. ఒక సూరా ఏ రకమో తెలిస్తే దాన్ని చదివేటప్పుడు ఏమి ఆశించాలో తెలుస్తుంది.",
          en: "What came before the Hijrah is Makkan and what came after is Madinan, and their register differs noticeably. Makkan surahs tend to be short, with a powerful rhythm, concentrating on the oneness of Allah, the hereafter and the stories of earlier prophets, because establishing belief was the work at hand. Madinan surahs are longer and more detailed, dealing with law, running a community, treaties and family matters, because by then there was a community. Knowing which a surah is tells you what to expect from it.",
        },
        check: {
          question: { te: "మదనీ సూరాలు దేనిపై ఎక్కువగా దృష్టి పెడతాయి?", en: "What do Madinan surahs concentrate on?" },
          options: [
            { te: "చట్టం, సమాజ నిర్వహణ", en: "Law and running a community" },
            { te: "కేవలం పరలోకం", en: "The hereafter alone" },
            { te: "కేవలం కవిత్వం", en: "Poetry alone" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నిర్మాణం — సూరా, ఆయత్, జుజ్", en: "The structure: surah, ayah, juz" },
        body: {
          te: "114 సూరాలు (అధ్యాయాలు). ఆయతుల సంఖ్య సాధారణంగా 6,236 అని చెబుతారు — ఇది ముద్రిత మసాహిఫ్‌లో వాడే కూఫీ లెక్కింపు. కొన్ని ప్రాచీన సంప్రదాయాల్లో ఆయత విభజన కొద్దిగా వేరుగా ఉండేది కాబట్టి మొత్తం సంఖ్యలో చిన్న తేడాలు ఉన్నాయి; పాఠంలో ఒక్క పదం కూడా తేడా లేదు, కేవలం విరామ గుర్తులు ఎక్కడ పెట్టాలనేదే. 30 జుజ్‌లుగా విభజన అవతరణలో భాగం కాదు — అది రమజాన్ ముప్ఫై రాత్రుల్లో పూర్తి చేయడానికి తర్వాత చేసిన ఆచరణాత్మక ఏర్పాటు.",
          en: "There are 114 surahs. The verse count is usually given as 6,236, which is the Kufan numbering used in printed copies. Some older traditions divided the verses slightly differently, so the total varies a little between them; not one word of the text differs, only where the stops were placed. The division into 30 juz is not part of the revelation but a later practical arrangement, so that the whole can be completed across the thirty nights of Ramadan.",
        },
      },
      {
        heading: { te: "క్రమం అవతరణ క్రమం కాదు", en: "The order is not the order of revelation" },
        body: {
          te: "ఇది చాలామందికి ఆశ్చర్యం కలిగిస్తుంది: ఖురాన్‌లోని సూరాల క్రమం అవి అవతరించిన క్రమం కాదు. మొదట అవతరించినది సూరా అల్-అలఖ్ మొదటి ఐదు ఆయతులు, కానీ అది ముస్‌హఫ్‌లో 96వ సూరా. చివరిగా అవతరించిన ఆయతులలో ఒకటి సూరా అల్-బఖరాలో ఉంది, అది రెండో సూరా. ఈ ప్రస్తుత క్రమాన్ని ప్రవక్త ﷺ స్వయంగా జిబ్రయీల్ (అ) మార్గదర్శనంతో నిర్ణయించారని పండితులు అంటారు — ఇది సహచరుల ఎంపిక కాదు.",
          en: "This surprises many people: the order of the surahs is not the order in which they were revealed. The first revelation was the opening five verses of Surah al-Alaq, which sits at number 96. Among the last verses revealed are some in Surah al-Baqarah, which is the second. Scholars hold that the present arrangement was set by the Prophet ﷺ himself under the guidance of Jibreel, rather than being a choice made by the companions.",
        },
      },
      {
        heading: { te: "ఎలా భద్రపరచబడింది", en: "How it was preserved" },
        body: {
          te: "రెండు మార్గాలు, సమాంతరంగా. ఒకటి: కంఠస్థం. ప్రవక్త ﷺ కాలంలోనే వందలాది సహచరులు దాన్ని కంఠస్థం చేశారు, మరియు ఈ శృంఖల నేటివరకు తెగలేదు — ప్రతి హాఫిజ్ మరో హాఫిజ్ నుండి నేరుగా విని నేర్చుకుంటారు. రెండు: లిఖిత రూపం. ప్రవక్త ﷺ వహీ వచ్చిన వెంటనే రాయించేవారు. అబూ బక్ర్ (ర/అ) కాలంలో సేకరణ, ఉస్మాన్ (ర/అ) కాలంలో ప్రామాణీకరణ జరిగాయి. నేడు ఇస్తాంబుల్, తాష్కెంట్‌లో ఉన్న ప్రాచీన ప్రతులు, బర్మింగ్‌హామ్‌లో దొరికిన తొలి శతాబ్దపు పత్రాలు — అన్నీ నేటి పాఠంతో సరిపోతాయి.",
          en: "Two routes, running in parallel. Memorisation: hundreds of companions had it by heart in the Prophet's own lifetime, and that chain has never broken, since every hafiz learns by hearing directly from another hafiz. And writing: the Prophet ﷺ had revelation written down as it came. Collection followed under Abu Bakr (RA) and standardisation under Uthman (RA). The early manuscripts held in Istanbul and Tashkent, and the first-century folios found in Birmingham, all match the text in use today.",
        },
      },
    ],
    takeaways: [
      { te: "ఇరవై మూడు సంవత్సరాలలో, సంఘటనలకు స్పందిస్తూ దశలవారీగా.", en: "Over twenty-three years, in stages, responding to events." },
      { te: "మక్కీ: విశ్వాసం, పరలోకం. మదనీ: చట్టం, సమాజం.", en: "Makkan: belief and the hereafter. Madinan: law and community." },
      { te: "సూరాల క్రమం అవతరణ క్రమం కాదు.", en: "The order of the surahs is not the order of revelation." },
    ],
    didYouKnow: [
      { te: "సూరా అల్-ఫాతిహా ముస్‌హఫ్‌లో మొదటిది, కానీ అవతరణలో ఐదో దాని దగ్గర.", en: "Surah al-Fatihah is first in the book but roughly fifth in order of revelation." },
      { te: "'ఖురాన్' అనే పదానికి అర్థం 'పఠించబడేది' — అది మొదట, ప్రధానంగా వినడానికి ఉద్దేశించినది.", en: "The word Quran means that which is recited; it was meant first and foremost to be heard." },
    ],
    reflect: [
      { te: "ఒక సమాజాన్ని ఒక్క ఆదేశంతో కాక క్రమంగా మార్చడం గురించి ఇది ఏమి చెబుతుంది?", en: "What does changing a society in stages, rather than by one command, suggest about how change works?" },
    ],
    mistakes: [
      { te: "సూరాల క్రమాన్ని కాలక్రమంగా భావించి, ముందున్నది ముందు అవతరించిందనుకోవడం.", en: "Reading the order of surahs as a chronology, as though earlier means earlier revealed." },
      { te: "ఒక ఆయతును దాని సందర్భం లేకుండా చదవడం — మక్కీయా మదనీయా అనేది అర్థాన్ని మారుస్తుంది.", en: "Reading a verse without its setting, when Makkan or Madinan changes what it is doing." },
    ],
    faqs: [
      {
        question: { te: "అనువాదాన్ని 'ఖురాన్' అనవచ్చా?", en: "Can a translation be called the Quran?" },
        answer: {
          te: "పండితులు అనలేదు. ఖురాన్ అనేది అరబిక్ పాఠం; అనువాదం ఒక మనిషి అర్థం చేసుకున్నదాని ప్రతిబింబం. అందుకే చాలా అనువాదాలకు 'అర్థ వివరణ' అని పేరు పెడతారు. అనువాదం చదవడం అత్యంత విలువైనది — కానీ అది అసలుకు ప్రత్యామ్నాయం కాదు, ద్వారం.",
          en: "Scholars say not. The Quran is the Arabic text; a translation reflects one person's understanding of it, which is why most are titled as an interpretation of the meaning. Reading a translation is extremely valuable, but it is a door to the original rather than a substitute for it.",
        },
      },
      {
        question: { te: "ఆయతుల సంఖ్యలో తేడాలు ఎందుకు?", en: "Why do verse counts differ?" },
        answer: {
          te: "ఇది పాఠంలో తేడా కాదు, విభజనలో తేడా. ఒక పొడవాటి వాక్యాన్ని ఒక ఆయతుగా లెక్కించాలా, రెండుగా లెక్కించాలా అనేదానిపై తొలి పఠన సంప్రదాయాలు కొద్దిగా భేదించాయి. పదాలు, అక్షరాలు ఒకటే. ముద్రిత మసాహిఫ్‌లో సాధారణంగా కూఫీ లెక్కింపు (6,236) వాడతారు.",
          en: "It is a difference of division rather than of text. Early reciting traditions differed slightly over whether a long passage counted as one verse or two. The words and letters are identical. Printed copies generally use the Kufan count of 6,236.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఖురాన్‌లో ఎన్ని సూరాలు?", en: "How many surahs are in the Quran?" },
        options: [
          { te: "114", en: "114" },
          { te: "30", en: "30" },
          { te: "99", en: "99" },
        ],
        answer: 0,
      },
      {
        question: { te: "30 జుజ్‌లుగా విభజన ఏమిటి?", en: "What is the division into 30 juz?" },
        options: [
          { te: "తర్వాత చేసిన ఆచరణాత్మక ఏర్పాటు", en: "A later practical arrangement" },
          { te: "అవతరణలో భాగం", en: "Part of the revelation" },
          { te: "ఉస్మాన్ (ర/అ) ఆదేశం", en: "An instruction of Uthman (RA)" },
        ],
        answer: 0,
      },
      {
        question: { te: "మొదట అవతరించిన సూరా ఏది?", en: "Which surah was revealed first?" },
        options: [
          { te: "అల్-అలఖ్ (96వది)", en: "Al-Alaq, number 96" },
          { te: "అల్-ఫాతిహా (1వది)", en: "Al-Fatihah, number 1" },
          { te: "అల్-బఖరా (2వది)", en: "Al-Baqarah, number 2" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "23 సంవత్సరాలు · 114 సూరాలు · 6,236 ఆయతులు (కూఫీ) · 30 జుజ్.", en: "23 years, 114 surahs, 6,236 verses in the Kufan count, 30 juz." },
      { te: "మక్కీ = విశ్వాసం; మదనీ = చట్టం.", en: "Makkan is belief; Madinan is law." },
      { te: "భద్రత: కంఠస్థం + లేఖనం, సమాంతరంగా.", en: "Preserved by memorisation and writing together." },
    ],
    summary: {
      te: "ఖురాన్ ఇరవై మూడేళ్ళలో దశలవారీగా అవతరించింది. మక్కీ సూరాలు విశ్వాసంపై, మదనీవి చట్టంపై. 114 సూరాలు, 30 జుజ్ — కానీ సూరాల క్రమం అవతరణ క్రమం కాదు. కంఠస్థం, లేఖనం రెండూ కలిసి దాన్ని మార్పు లేకుండా భద్రపరిచాయి.",
      en: "The Quran came in stages across twenty-three years. Makkan surahs deal with belief and Madinan with law. There are 114 surahs and 30 juz, though the order of the book is not the order of revelation. Memorisation and writing together preserved it unchanged.",
    },
    apply: {
      te: "ఆచరణ: మీ ఖురాన్ ప్రతిలో ఒక సూరా తెరిచి, అది మక్కీయా మదనీయా చూడండి — శీర్షిక కింద రాసి ఉంటుంది.",
      en: "Apply it: open one surah in your copy and check whether it is Makkan or Madinan; it is noted under the title.",
    },
    reading: [
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
      { label: "How to begin reading", url: "/knowledge-center/learn-quran/begin" },
    ],
  },

  {
    slug: "begin",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 2 — చదవడం ఎలా మొదలుపెట్టాలి",
      en: "Level 2 — How to begin reading",
    },
    intro: {
      te: "ఏ వయసులోనైనా ఖురాన్ చదవడం నేర్చుకోవచ్చు. ముఖ్యమైనది క్రమం: అక్షరాలు, స్వరాలు, కలపడం, తర్వాత చిన్న సూరాలు. దీన్ని దాటవేయడానికి ప్రయత్నించడమే చాలామంది ఆగిపోవడానికి కారణం.",
      en: "Anyone can learn to read the Quran at any age. What matters is the order: letters, vowels, joining, then the short surahs. Trying to skip that order is why most people stop.",
    },
    sections: [
      {
        heading: { te: "ఖాయిదా — దాటవేయకూడని మెట్టు", en: "The qaida, the step not to skip" },
        body: {
          te: "'ఖాయిదా' అనేది ఖురాన్ చదవడం నేర్చుకోవడానికి రూపొందించిన ప్రాథమిక పుస్తకం — నూరానీ ఖాయిదా, బగ్దాదీ ఖాయిదా వంటివి. ఇది అక్షరాలను ఒక్కొక్కటిగా, తర్వాత జతలుగా, తర్వాత పదాలుగా క్రమంగా పరిచయం చేస్తుంది. పెద్దవారు తరచూ 'ఇది పిల్లల పుస్తకం' అని దాటవేయాలనుకుంటారు, తర్వాత ఖురాన్ ముందు కూర్చుని ఆగిపోతారు. ఖాయిదా కొన్ని వారాల పని; అది లేకుండా నేర్చుకోవడం కొన్ని సంవత్సరాలు.",
          en: "A qaida is the primer built for exactly this, such as the Noorani or Baghdadi qaida. It introduces the letters one at a time, then in pairs, then in words. Adults often want to skip it as a children's book and then stall in front of a mushaf. The qaida is a few weeks of work; going without it costs years.",
        },
        check: {
          question: { te: "'ఖాయిదా' అంటే ఏమిటి?", en: "What is a qaida?" },
          options: [
            { te: "ఖురాన్ చదవడం నేర్చుకునే ప్రాథమిక పుస్తకం", en: "The primer for learning to read the Quran" },
            { te: "ఒక తఫ్సీర్ గ్రంథం", en: "A work of tafsir" },
            { te: "ఒక దుఆల సంకలనం", en: "A collection of supplications" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "తలఖ్ఖీ — గురువు ముందు చదవడం", en: "Talaqqi: reciting in front of a teacher" },
        body: {
          te: "ఖురాన్ పఠనం పుస్తకం నుండి కాక, వ్యక్తి నుండి వ్యక్తికి బదిలీ అవుతుంది. దీన్ని 'తలఖ్ఖీ' అంటారు — గురువు ముందు బిగ్గరగా చదవడం, గురువు సరిదిద్దడం. ఇది ఎందుకు అవసరం: మీరు ఒక అక్షరాన్ని తప్పుగా పలుకుతున్నారని మీకు తెలియదు; వినేవారికే తెలుస్తుంది. వీడియోలు, యాప్‌లు సహాయపడతాయి కానీ అవి మిమ్మల్ని వినలేవు. వారానికి ఒక్కసారైనా ఎవరైనా ముందు చదవండి — మస్జిద్ ఇమామ్, మదరసా ఉపాధ్యాయుడు, లేదా కుటుంబంలో హాఫిజ్.",
          en: "Recitation transfers from person to person rather than from a book, which is called talaqqi: you read aloud to a teacher and are corrected. The reason it is needed is simple. You cannot hear that you are mispronouncing a letter; only a listener can. Videos and apps help but they cannot hear you. Read to someone at least once a week, whether the mosque imam, a madrasa teacher or a hafiz in the family.",
        },
        check: {
          question: { te: "గురువు ముందు చదవడం ఎందుకు అవసరం?", en: "Why is reciting to a teacher necessary?" },
          options: [
            { te: "మీ పొరపాట్లు మీకు వినిపించవు; వినేవారికే తెలుస్తాయి", en: "You cannot hear your own errors; a listener can" },
            { te: "అది సంప్రదాయం మాత్రమే", en: "It is only tradition" },
            { te: "పుస్తకాలు నమ్మదగినవి కావు", en: "Books are unreliable" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "జుజ్ అమ్మ నుండి మొదలు", en: "Start from Juz Amma" },
        body: {
          te: "ఖురాన్ మొదటి పేజీ నుండి మొదలుపెట్టడం సహజంగా అనిపిస్తుంది, కానీ సూరా అల్-బఖరా 286 ఆయతుల పొడవైన సూరా — కొత్తవారికి కష్టం. బదులుగా చివరి భాగం, జుజ్ అమ్మ (సూరా 78 నుండి 114) నుండి మొదలుపెట్టండి. ఆ సూరాలు చిన్నవి, లయబద్ధమైనవి, మరియు మీరు వాటిని ఇప్పటికే నమాజ్‌లో వినే ఉంటారు — తెలిసిన శబ్దం చదవడాన్ని సులభం చేస్తుంది. అంతేకాక అవి నమాజ్‌లో నేరుగా ఉపయోగపడతాయి.",
          en: "Starting at page one feels natural, but Surah al-Baqarah runs to 286 verses and is hard going for a beginner. Start instead at the far end, with Juz Amma, surahs 78 to 114. Those surahs are short and rhythmic, and you have almost certainly heard them in prayer already, which makes reading them easier. They are also immediately useful in your own prayer.",
        },
      },
      {
        heading: { te: "వాస్తవిక ప్రణాళిక", en: "A realistic plan" },
        body: {
          te: "రోజుకు పదిహేను నిమిషాలు, ప్రతిరోజూ. వారానికి ఒకసారి రెండు గంటలు కూర్చోవడం కంటే ఇది చాలా మెరుగు — ప్రవక్త ﷺ చెప్పారు: 'అల్లాహ్‌కు అత్యంత ప్రియమైన ఆచరణ తక్కువైనా నిరంతరం చేసేది' (బుఖారీ). వాస్తవిక కాలరేఖ: అక్షరాలు రెండు వారాలు, హరకాత్‌తో కలపడం నాలుగు వారాలు, జుజ్ అమ్మ నెమ్మదిగా చదవడం మూడు నెలలు. ఆరు నెలల్లో మీరు ఖురాన్ తెరిచి చదవగలరు — వేగంగా కాదు, కానీ సరిగ్గా.",
          en: "Fifteen minutes a day, every day. That beats a two-hour session once a week by a wide margin; the Prophet ﷺ said the deeds most beloved to Allah are the constant ones, however small (Bukhari). A realistic timeline: the letters in two weeks, joining them with the vowel marks in four, reading Juz Amma slowly in three months. Within six months you can open a mushaf and read, not quickly, but correctly.",
        },
      },
    ],
    takeaways: [
      { te: "ఖాయిదాను దాటవేయవద్దు — అది కొన్ని వారాలు ఆదా చేయదు, కొన్ని సంవత్సరాలు ఖర్చు చేస్తుంది.", en: "Do not skip the qaida; skipping it does not save weeks, it costs years." },
      { te: "వారానికి ఒకసారైనా ఎవరైనా ముందు బిగ్గరగా చదవండి.", en: "Read aloud to someone at least once a week." },
      { te: "జుజ్ అమ్మ నుండి మొదలుపెట్టండి, మొదటి పేజీ నుండి కాదు.", en: "Begin at Juz Amma rather than page one." },
    ],
    didYouKnow: [
      { te: "ప్రతి హాఫిజ్ తన పఠనాన్ని మరో హాఫిజ్ నుండి విని నేర్చుకుంటారు — ఈ శృంఖల ప్రవక్త ﷺ వరకు చేరుతుంది.", en: "Every hafiz learns by hearing another hafiz, and that chain reaches back to the Prophet ﷺ." },
      { te: "పెద్దవారు నేర్చుకోవడం ఆలస్యం కాదు — చాలామంది యాభై, అరవై ఏళ్ళ వయసులో మొదలుపెట్టి పూర్తి చేశారు.", en: "It is not too late for an adult; many have begun in their fifties and sixties and finished." },
    ],
    reflect: [
      { te: "మీరు రోజుకు పదిహేను నిమిషాలు దేనికి ఖర్చు చేస్తున్నారు? దానికి బదులుగా ఇది వీలవుతుందా?", en: "What do you already spend fifteen minutes a day on? Could this take its place?" },
    ],
    mistakes: [
      { te: "ఖాయిదా దాటవేసి నేరుగా ఖురాన్ తెరవడం.", en: "Skipping the qaida and opening a mushaf directly." },
      { te: "వేగంగా చదవడానికి ప్రయత్నించడం — కొత్తవారికి వేగం లక్ష్యం కాదు.", en: "Trying to read quickly, when speed is not the beginner's goal." },
      { te: "సిగ్గుపడి ఎవరి ముందూ చదవకపోవడం — పొరపాట్లు అలాగే స్థిరపడతాయి.", en: "Being too embarrassed to read to anyone, which lets errors set." },
    ],
    faqs: [
      {
        question: { te: "నా వయసు ఎక్కువ, ఇప్పుడు నేర్చుకోగలనా?", en: "I am older; can I still learn?" },
        answer: {
          te: "అవును. పెద్దవారికి ఒక ప్రయోజనం ఉంది: క్రమశిక్షణ, ఎందుకు నేర్చుకుంటున్నారో స్పష్టత. పిల్లలు వేగంగా నేర్చుకుంటారు, పెద్దలు స్థిరంగా. ప్రవక్త ﷺ చెప్పారు: ఖురాన్ కష్టంగా, తడబడుతూ చదివేవారికి రెండు ప్రతిఫలాలు (బుఖారీ, ముస్లిం).",
          en: "Yes. Adults have an advantage in discipline and in knowing why they are doing it. Children learn faster; adults learn steadily. The Prophet ﷺ said that one who reads the Quran haltingly, finding it difficult, has two rewards (Bukhari and Muslim).",
        },
      },
      {
        question: { te: "గురువు దొరకకపోతే?", en: "What if I cannot find a teacher?" },
        answer: {
          te: "ఆన్‌లైన్ తలఖ్ఖీ ఇప్పుడు సాధారణం — వీడియో కాల్‌లో గురువు మీ పఠనాన్ని విని సరిదిద్దగలరు. మీ స్థానిక మస్జిద్‌లో అడగండి; చాలా మదరసాలు పెద్దవారికి కూడా తరగతులు నడుపుతాయి. అది కూడా లేకపోతే, కుటుంబంలో లేదా పొరుగున ఖురాన్ బాగా చదివేవారిని అడగండి.",
          en: "Talaqqi over video call is now common, and a teacher can hear and correct you that way. Ask at your local mosque, since many madrasas run classes for adults too. Failing that, ask someone in the family or street who reads well.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "కొత్తవారు ఎక్కడ నుండి మొదలుపెట్టాలి?", en: "Where should a beginner start?" },
        options: [
          { te: "జుజ్ అమ్మ — చివరి భాగం", en: "Juz Amma, the last part" },
          { te: "సూరా అల్-బఖరా", en: "Surah al-Baqarah" },
          { te: "మధ్య నుండి", en: "From the middle" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తలఖ్ఖీ' అంటే ఏమిటి?", en: "What is talaqqi?" },
        options: [
          { te: "గురువు ముందు చదివి సరిదిద్దబడటం", en: "Reciting to a teacher and being corrected" },
          { te: "మౌనంగా చదవడం", en: "Reading silently" },
          { te: "కంఠస్థం చేయడం", en: "Memorising" },
        ],
        answer: 0,
      },
      {
        question: { te: "తడబడుతూ చదివేవారికి ప్రవక్త ﷺ ఏమి చెప్పారు?", en: "What did the Prophet ﷺ say about one who reads haltingly?" },
        options: [
          { te: "వారికి రెండు ప్రతిఫలాలు", en: "They have two rewards" },
          { te: "వారు చదవకూడదు", en: "They should not read" },
          { te: "ప్రతిఫలం లేదు", en: "There is no reward" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "ఖాయిదా → కలపడం → జుజ్ అమ్మ.", en: "Qaida, then joining, then Juz Amma." },
      { te: "వారానికి ఒకసారైనా తలఖ్ఖీ.", en: "Talaqqi at least once a week." },
      { te: "రోజుకు 15 నిమిషాలు > వారానికి 2 గంటలు.", en: "Fifteen minutes daily beats two hours weekly." },
    ],
    summary: {
      te: "ఖాయిదాతో మొదలుపెట్టండి, దాన్ని దాటవేయవద్దు. వారానికి ఒకసారైనా గురువు ముందు బిగ్గరగా చదవండి — పొరపాట్లు మీకు వినిపించవు. జుజ్ అమ్మ నుండి ఆరంభించండి. రోజుకు పదిహేను నిమిషాలు ఆరు నెలల్లో మిమ్మల్ని అక్కడికి చేరుస్తాయి.",
      en: "Start with the qaida and do not skip it. Read aloud to a teacher at least weekly, because you cannot hear your own errors. Begin at Juz Amma. Fifteen minutes a day will get you there in six months.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం మీ స్థానిక మస్జిద్‌లో పెద్దవారి ఖురాన్ తరగతి ఉందా అని అడగండి.",
      en: "Apply it: ask at your local mosque this week whether they run a Quran class for adults.",
    },
    reading: [
      { label: "Arabic alphabet", url: "/knowledge-center/learn-arabic/alphabet" },
      { label: "Tajweed", url: "/knowledge-center/learn-quran/tajweed" },
    ],
  },

  {
    slug: "tajweed",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 3 — తజ్వీద్",
      en: "Level 3 — Tajweed",
    },
    intro: {
      te: "తజ్వీద్ అంటే ప్రతి అక్షరానికి దాని హక్కు ఇవ్వడం — సరైన స్థానం నుండి, సరైన లక్షణాలతో పలకడం. ఇది అలంకారం కాదు; అర్థాన్ని కాపాడేది.",
      en: "Tajweed means giving every letter its due: producing it from the right place with its proper qualities. It is not ornament but the thing that protects the meaning.",
    },
    sections: [
      {
        heading: { te: "ఎందుకు ఇది ముఖ్యం", en: "Why it matters" },
        body: {
          te: "అరబిక్‌లో ఒకేలా అనిపించే అక్షరాలు వేర్వేరు అర్థాలు ఇస్తాయి. 'ఖల్బ్' (قلب, ఖాఫ్‌తో) అంటే హృదయం; 'కల్బ్' (كلب, కాఫ్‌తో) అంటే కుక్క. 'సద్ర్' అంటే ఛాతీ, కానీ వేరే 'స' వాడితే వేరే పదం. తెలుగు మాట్లాడేవారికి కష్టమైనవి: ع (ఐన్), ح (హా), ق (ఖాఫ్), ض (దాద్), ط (తా), ص (సాద్) — వీటికి తెలుగులో సమానమైనవి లేవు. తజ్వీద్ లేకుండా చదవడం అంటే ఈ తేడాలను చెరిపేయడం.",
          en: "Letters that sound alike to an untrained ear carry different meanings in Arabic. Qalb with qaf means heart; kalb with kaf means dog. The letters Telugu speakers find hardest are ayn, ha, qaf, dad, ta and sad, none of which have a Telugu equivalent. Reading without tajweed means flattening those distinctions away.",
        },
        check: {
          question: { te: "'ఖల్బ్' మరియు 'కల్బ్' మధ్య తేడా దేనివల్ల?", en: "What distinguishes qalb from kalb?" },
          options: [
            { te: "ఖాఫ్, కాఫ్ అనే రెండు వేర్వేరు అక్షరాలు", en: "Two different letters, qaf and kaf" },
            { te: "స్వరం", en: "The vowel" },
            { te: "పొడవు", en: "The length" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మఖారిజ్ — అక్షరాలు ఎక్కడి నుండి వస్తాయి", en: "Makharij: where the letters come from" },
        body: {
          te: "ప్రతి అక్షరానికి నోటిలో ఒక నిర్దిష్ట ఉత్పత్తి స్థానం ఉంది. పండితులు వీటిని పెద్దగా ఐదు ప్రాంతాలుగా విభజిస్తారు: గొంతు (హల్ఖ్), నాలుక (లిసాన్), పెదవులు (షఫతాన్), ముక్కు (ఖైషూమ్), మరియు నోటి ఖాళీ (జౌఫ్) — పొడవాటి స్వరాలకు. గొంతు నుండి ఆరు అక్షరాలు వస్తాయి: లోతైన భాగం నుండి ء, هـ; మధ్య నుండి ع, ح; పై భాగం నుండి غ, خ. ఈ ఆరింటిని సరిగ్గా పలకడం నేర్చుకుంటే మీ పఠనం గణనీయంగా మారుతుంది.",
          en: "Every letter has a precise point of production in the mouth. Scholars group these into five broad regions: the throat, the tongue, the lips, the nose, and the empty space of the mouth for long vowels. Six letters come from the throat: hamza and ha from its deepest part, ayn and ha from the middle, ghayn and kha from the top. Learning to produce those six correctly changes a recitation noticeably.",
        },
        check: {
          question: { te: "గొంతు నుండి ఎన్ని అక్షరాలు వస్తాయి?", en: "How many letters come from the throat?" },
          options: [
            { te: "ఆరు", en: "Six" },
            { te: "రెండు", en: "Two" },
            { te: "పన్నెండు", en: "Twelve" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నూన్ సాకినా — నాలుగు నియమాలు", en: "Noon sakinah: the four rules" },
        body: {
          te: "తజ్వీద్‌లో అత్యంత తరచుగా వచ్చే నియమాల సముదాయం ఇది. స్వరం లేని 'నూన్' (نْ) లేదా తన్వీన్ తర్వాత ఏ అక్షరం వస్తుందో దాన్ని బట్టి నాలుగు రకాలు. ఇజ్‌హార్ (స్పష్టంగా పలకడం): గొంతు అక్షరాలు ఆరు తర్వాత. ఇద్‌గామ్ (కలిపేయడం): ي ر م ل و ن అనే ఆరు తర్వాత. ఇఖ్లాబ్ (మార్చడం): ب తర్వాత నూన్ 'మ్'గా మారుతుంది. ఇఖ్‌ఫా (దాచడం): మిగిలిన పదిహేను అక్షరాల తర్వాత, నూన్ శబ్దం మృదువుగా ముక్కులోకి వెళుతుంది. ఈ నాలుగు తెలిస్తే తజ్వీద్‌లో సగం వచ్చినట్లే.",
          en: "This is the most frequently applied set of rules in tajweed. What happens to a vowel-less noon, or to tanween, depends on the letter that follows, and there are four cases. Izhar, clear pronunciation, before the six throat letters. Idgham, merging, before the six letters of ya, ra, meem, lam, waw and noon. Iqlab, conversion, before ba, where the noon turns into a meem. And ikhfa, concealment, before the remaining fifteen, where the noon softens into the nose. Knowing these four is half of tajweed.",
        },
      },
      {
        heading: { te: "ఖల్‌ఖలా, మద్ద్", en: "Qalqalah and madd" },
        body: {
          te: "ఖల్‌ఖలా అంటే ప్రతిధ్వని. ఐదు అక్షరాలకు — ق ط ب ج د — స్వరం లేనప్పుడు చిన్న ఎగిరే శబ్దం వస్తుంది. వీటిని గుర్తుంచుకోవడానికి 'ఖుత్బ్ జద్' అనే పదబంధం వాడతారు. సూరా అల్-ఇఖ్లాస్ చివరన 'అహద్' లోని దాల్ దీనికి ఉదాహరణ. మద్ద్ అంటే పొడిగింపు. సాధారణ మద్ద్ రెండు కౌంట్‌లు. కానీ పొడవాటి స్వరం తర్వాత హమ్జా లేదా సుకూన్ వస్తే అది నాలుగు లేదా ఆరు కౌంట్‌లకు పెరుగుతుంది. నిడివిని కచ్చితంగా పాటించడం తజ్వీద్ ప్రధాన భాగం.",
          en: "Qalqalah is an echo. Five letters, qaf, ta, ba, jeem and dal, produce a small bouncing sound when they carry no vowel, and they are remembered by the phrase qutb jad. The dal at the end of ahad in Surah al-Ikhlas is the familiar example. Madd is elongation: the ordinary madd is two counts, but when a long vowel is followed by a hamza or a sukun it stretches to four or six. Holding these lengths exactly is a central part of tajweed.",
        },
      },
      {
        heading: { te: "ఇది విధియా?", en: "Is it obligatory?" },
        body: {
          te: "పండితులు ఇక్కడ ఒక తేడా చేస్తారు. తజ్వీద్ నియమాలను శాస్త్రంగా నేర్చుకోవడం ఫర్జ్ కిఫాయా — సమాజంలో కొందరు నేర్చుకుంటే సరిపోతుంది. కానీ అర్థాన్ని మార్చే స్థాయిలో పొరపాట్లు లేకుండా చదవడం ప్రతి వ్యక్తిపైనా విధి. అంటే: మీరు ప్రతి నియమానికి పేరు చెప్పగలగాలని అవసరం లేదు, కానీ 'ఖల్బ్'ను 'కల్బ్'గా చదవకూడదు. ఇది ఆచరణాత్మకంగా ఉపశమనం: శాస్త్రం కాకుండా ఉచ్చారణ నేర్చుకోవడంపై దృష్టి పెట్టండి.",
          en: "Scholars draw a distinction here. Learning the rules as a discipline is fard kifayah, sufficient if some in the community do it. But reading without errors that change meaning is an obligation on each person. So you do not need to be able to name every rule, but you must not read qalb as kalb. That is practically a relief: concentrate on pronunciation rather than on terminology.",
        },
      },
    ],
    takeaways: [
      { te: "తజ్వీద్ అలంకారం కాదు — అది అర్థాన్ని కాపాడుతుంది.", en: "Tajweed is not ornament; it protects the meaning." },
      { te: "నూన్ సాకినా నాలుగు నియమాలు: ఇజ్‌హార్, ఇద్‌గామ్, ఇఖ్లాబ్, ఇఖ్‌ఫా.", en: "The four noon sakinah rules: izhar, idgham, iqlab, ikhfa." },
      { te: "ఖల్‌ఖలా ఐదు అక్షరాలు: ఖుత్బ్ జద్.", en: "Five qalqalah letters, remembered as qutb jad." },
    ],
    didYouKnow: [
      { te: "అరబిక్‌లో ض (దాద్) అక్షరం చాలా అరుదైనది కాబట్టి అరబిక్‌ను 'లుగతుద్ దాద్' — దాద్ భాష — అని పిలుస్తారు.", en: "The letter dad is rare enough across languages that Arabic is called lughat al-dad, the language of the dad." },
      { te: "తజ్వీద్ నియమాలు కొత్తగా కనిపెట్టినవి కాదు — అవి ప్రవక్త ﷺ పఠనాన్ని వర్ణించి, వ్యవస్థీకరించినవి.", en: "The rules of tajweed were not invented; they describe and systematise how the Prophet ﷺ recited." },
    ],
    reflect: [
      { te: "మీరు రోజూ చదివే సూరా అల్-ఫాతిహాలో ఎన్ని ఖల్‌ఖలా అక్షరాలు ఉన్నాయో గుర్తించగలరా?", en: "In Surah al-Fatihah, which you read daily, can you spot the qalqalah letters?" },
    ],
    mistakes: [
      { te: "నియమాల పేర్లు నేర్చుకుని ఉచ్చారణ సాధన చేయకపోవడం.", en: "Learning the names of the rules without practising the sounds." },
      { te: "ق ను క గా, ع ను అ గా పలకడం — ఇవి తెలుగు మాట్లాడేవారి సాధారణ పొరపాట్లు.", en: "Producing qaf as k and ayn as a plain vowel, the two commonest errors for Telugu speakers." },
      { te: "మద్ద్ నిడివిని కుదించడం.", en: "Shortening the madd." },
    ],
    faqs: [
      {
        question: { te: "తజ్వీద్ లేకుండా చదివితే నమాజ్ చెల్లుతుందా?", en: "Is prayer valid if I read without tajweed?" },
        answer: {
          te: "అర్థాన్ని మార్చని చిన్న పొరపాట్లు (లహ్న్ ఖఫీ) ఉంటే నమాజ్ చెల్లుతుంది, మరియు నేర్చుకుంటున్నవారు కొనసాగించాలి. అర్థాన్ని మార్చే పొరపాట్లు (లహ్న్ జలీ) — ఉదాహరణకు ఒక అక్షరాన్ని పూర్తిగా వేరే అక్షరంగా పలకడం — గురించి పండితులు మరింత జాగ్రత్త చెబుతారు. మీ కేసు గురించి ఇమామ్‌ను అడగండి, కానీ నేర్చుకోవడం ఆపవద్దు.",
          en: "Minor errors that do not change meaning do not invalidate the prayer, and someone still learning should carry on. Scholars are more cautious about errors that do change meaning, such as substituting one letter entirely for another. Ask your imam about your own case, and keep learning either way.",
        },
      },
      {
        question: { te: "ప్రసిద్ధ ఖారీలను అనుకరించడం సరైనదేనా?", en: "Should I imitate famous reciters?" },
        answer: {
          te: "వినడం చాలా సహాయపడుతుంది — తజ్వీద్ చెవి ద్వారానే నేర్చుకుంటారు. కానీ వారి స్వర శైలిని (నగ్మా) అనుకరించడానికి ప్రయత్నించి నియమాలను వక్రీకరించవద్దు. ముందు నియమాలు, తర్వాత అందం.",
          en: "Listening helps a great deal, since tajweed is learned through the ear. But do not distort the rules trying to copy a reciter's melodic style. Rules first, beauty after.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "నూన్ సాకినా తర్వాత ب వస్తే ఏ నియమం?", en: "Which rule applies when a ba follows noon sakinah?" },
        options: [
          { te: "ఇఖ్లాబ్ — నూన్ 'మ్'గా మారుతుంది", en: "Iqlab: the noon becomes a meem" },
          { te: "ఇజ్‌హార్", en: "Izhar" },
          { te: "ఖల్‌ఖలా", en: "Qalqalah" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖల్‌ఖలా అక్షరాలను గుర్తుంచుకునే పదబంధం ఏది?", en: "Which phrase remembers the qalqalah letters?" },
        options: [
          { te: "ఖుత్బ్ జద్", en: "Qutb jad" },
          { te: "యర్మలూన్", en: "Yarmaloon" },
          { te: "అల్‌హమ్దు", en: "Alhamdu" },
        ],
        answer: 0,
      },
      {
        question: { te: "తజ్వీద్ శాస్త్రాన్ని నేర్చుకోవడం ఏ వర్గం?", en: "Learning tajweed as a discipline falls into which category?" },
        options: [
          { te: "ఫర్జ్ కిఫాయా", en: "Fard kifayah" },
          { te: "ప్రతి వ్యక్తిపై ఫర్జ్ ఐన్", en: "Fard ayn on every person" },
          { te: "మక్రూహ్", en: "Makruh" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "మఖారిజ్: గొంతు, నాలుక, పెదవులు, ముక్కు, జౌఫ్.", en: "Makharij: throat, tongue, lips, nose, the mouth cavity." },
      { te: "నూన్ సాకినా: ఇజ్‌హార్ · ఇద్‌గామ్ · ఇఖ్లాబ్ · ఇఖ్‌ఫా.", en: "Noon sakinah: izhar, idgham, iqlab, ikhfa." },
      { te: "ఖల్‌ఖలా: ق ط ب ج د · మద్ద్: 2, 4 లేదా 6 కౌంట్‌లు.", en: "Qalqalah: qaf ta ba jeem dal. Madd: two, four or six counts." },
    ],
    summary: {
      te: "తజ్వీద్ అర్థాన్ని కాపాడుతుంది — ఒకేలా అనిపించే అక్షరాలు వేర్వేరు పదాలు. మఖారిజ్ అక్షరాల ఉత్పత్తి స్థానాలు; నూన్ సాకినా నాలుగు నియమాలు అత్యంత తరచుగా వస్తాయి; ఖల్‌ఖలా, మద్ద్ ధ్వనిని ఆకృతి చేస్తాయి. శాస్త్రం కాదు, ఉచ్చారణే ప్రతి వ్యక్తిపై బాధ్యత.",
      en: "Tajweed protects meaning, because letters that sound alike are different words. Makharij are the points of production, the four noon sakinah rules come up most often, and qalqalah and madd shape the sound. What falls on each person is the pronunciation rather than the terminology.",
    },
    apply: {
      te: "ఆచరణ: గొంతు నుండి వచ్చే ఆరు అక్షరాలను ఒక్కొక్కటిగా పలికి, తేడాను వినండి.",
      en: "Apply it: produce the six throat letters one by one and listen for the difference between them.",
    },
    reading: [
      { label: "Tajweed Academy", url: "/knowledge-center/learn-quran" },
      { label: "Harakat and vowels", url: "/knowledge-center/learn-arabic/harakat" },
    ],
  },

  {
    slug: "hifz",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 4 — హిఫ్జ్: కంఠస్థం",
      en: "Level 4 — Hifz: memorising",
    },
    intro: {
      te: "ఖురాన్ చరిత్రలో అత్యధికంగా కంఠస్థం చేయబడిన గ్రంథం. హిఫ్జ్ ప్రత్యేక ప్రతిభ కాదు — అది ఒక పద్ధతి, మరియు దాని అసలు రహస్యం కంఠస్థం కాదు, పునరావృత్తి.",
      en: "The Quran is the most memorised book in history. Hifz is not a special talent but a method, and its real secret is not memorising but revision.",
    },
    sections: [
      {
        heading: { te: "అసలు పని పునరావృత్తి", en: "The real work is revision" },
        body: {
          te: "కొత్తవారు అనుకుంటారు: కష్టమైనది కొత్తది నేర్చుకోవడం. వాస్తవం వేరు: కొత్తది సులభం, పాతది నిలుపుకోవడం కష్టం. అనుభవజ్ఞులైన ఉపాధ్యాయులు సాధారణంగా ఈ నిష్పత్తిని సూచిస్తారు — కొత్తదానికి ఒక భాగం సమయమైతే, పాతదాన్ని పునరావృత్తి చేయడానికి మూడు నుండి నాలుగు భాగాలు. ఈ నిష్పత్తిని పాటించని విద్యార్థి ఒక సంవత్సరం తర్వాత చాలా కంఠస్థం చేసి, ఏమీ నిలుపుకోకుండా ఉంటారు.",
          en: "Beginners assume the hard part is learning new material. It is the reverse: new pages come easily and holding the old ones is the difficulty. Experienced teachers usually suggest a ratio of one part time on the new to three or four parts on revision. A student who ignores that ratio arrives a year later having memorised a great deal and retained little.",
        },
        check: {
          question: { te: "హిఫ్జ్‌లో కష్టమైన భాగం ఏది?", en: "Which is the hard part of hifz?" },
          options: [
            { te: "పాతదాన్ని నిలుపుకోవడం", en: "Retaining what is already memorised" },
            { te: "కొత్తది నేర్చుకోవడం", en: "Learning new material" },
            { te: "అరబిక్ నేర్చుకోవడం", en: "Learning Arabic" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మరచిపోవడం గురించి తీవ్రమైన హెచ్చరిక", en: "A serious warning about forgetting" },
        body: {
          te: "ప్రవక్త ﷺ అన్నారు: 'ఖురాన్‌ను జాగ్రత్తగా కాపాడుకోండి; నా ప్రాణం ఎవరి చేతిలో ఉందో ఆయన సాక్షి, అది కట్టివేయబడిన ఒంటె కంటే వేగంగా తప్పించుకుంటుంది' (బుఖారీ, ముస్లిం). ఇది భయపెట్టడానికి కాదు, వాస్తవాన్ని చెప్పడానికి. ఇందులో ఒక ఆచరణాత్మక పాఠం ఉంది: నిలుపుకోగలిగినదాన్ని మాత్రమే కంఠస్థం చేయండి. పది జుజ్‌లు చక్కగా నిలుపుకోవడం, ముప్ఫై కంఠస్థం చేసి మరచిపోవడం కంటే మేలు.",
          en: "The Prophet ﷺ said: 'Keep refreshing your knowledge of the Quran, for by the One in whose hand my soul is, it slips away faster than a camel from its tether' (Bukhari and Muslim). That is not said to frighten but to state a fact, and it carries a practical lesson: memorise only what you can hold. Ten juz kept well is better than thirty memorised and lost.",
        },
        check: {
          question: { te: "ప్రవక్త ﷺ ఖురాన్ మరచిపోవడాన్ని దేనితో పోల్చారు?", en: "What did the Prophet ﷺ compare forgetting the Quran to?" },
          options: [
            { te: "కట్టివేయబడిన ఒంటె తప్పించుకోవడంతో", en: "A camel slipping its tether" },
            { te: "నీరు ఇంకిపోవడంతో", en: "Water evaporating" },
            { te: "పక్షి ఎగిరిపోవడంతో", en: "A bird flying away" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఏమి పనిచేస్తుంది", en: "What actually works" },
        body: {
          te: "నాలుగు విషయాలు, అనుభవం నుండి. ఒకటి: ఒకే ముస్‌హఫ్ వాడండి — పేజీలో ఆయత్ ఎక్కడ ఉందో అనే దృశ్య జ్ఞాపకం నిజంగా పనిచేస్తుంది; ప్రతి మార్చడం దాన్ని నాశనం చేస్తుంది. రెండు: ముందు వినండి, తర్వాత చదవండి — శబ్దం ముందుగా చెవిలో స్థిరపడాలి. మూడు: కంఠస్థం చేసినదాన్ని నమాజ్‌లో చదవండి; ఇది ఉచిత పునరావృత్తి, మరియు అది మీకు గుర్తుందో లేదో వెంటనే తెలుస్తుంది. నాలుగు: అర్థం తెలుసుకోండి — అర్థం తెలిసిన పాఠం అర్థం లేని శబ్దాల కంటే చాలా ఎక్కువ కాలం నిలుస్తుంది.",
          en: "Four things, from experience. Use one mushaf: the visual memory of where a verse sits on the page genuinely works, and changing copies destroys it. Listen before you read, so the sound settles in the ear first. Recite what you have memorised inside your prayers, which is free revision and tells you immediately whether it is holding. And learn the meaning, because text you understand stays far longer than sounds you do not.",
        },
      },
      {
        heading: { te: "వాస్తవిక అంచనాలు", en: "Realistic expectations" },
        body: {
          te: "పూర్తి హిఫ్జ్ సాధారణంగా మూడు నుండి ఐదు సంవత్సరాలు పడుతుంది — పూర్తి సమయం చదివే విద్యార్థికి. ఉద్యోగం చేస్తూ, కుటుంబం చూసుకుంటూ చేసేవారికి ఎక్కువ. ఇది నిరుత్సాహపరిచేది కాదు, నిజాయితీగా చెప్పేది: 'ఆరు నెలల్లో హిఫ్జ్' అనే వాగ్దానాలు వాస్తవికం కావు. మరో ముఖ్యమైన విషయం: పూర్తి హిఫ్జ్ అందరిపైనా విధి కాదు. జుజ్ అమ్మ కంఠస్థం చేసి, దాన్ని బాగా నిలుపుకుని, అర్థం తెలుసుకోవడం ఒక గొప్ప లక్ష్యం.",
          en: "A complete hifz usually takes three to five years for a full-time student, and longer for someone with a job and a family. That is not discouragement but honesty: promises of hifz in six months are not realistic. And one more thing worth saying: a complete hifz is not an obligation on everyone. Memorising Juz Amma, holding it well and understanding it is a fine goal in itself.",
        },
      },
    ],
    takeaways: [
      { te: "కొత్తదానికి ఒక భాగమైతే పునరావృత్తికి మూడు నుండి నాలుగు భాగాలు.", en: "One part new material to three or four parts revision." },
      { te: "ఒకే ముస్‌హఫ్ వాడండి — దృశ్య జ్ఞాపకం నిజంగా పనిచేస్తుంది.", en: "Use one mushaf; the visual memory genuinely works." },
      { te: "నిలుపుకోగలిగినదాన్ని మాత్రమే కంఠస్థం చేయండి.", en: "Memorise only what you can hold." },
    ],
    didYouKnow: [
      { te: "ప్రపంచవ్యాప్తంగా లక్షలాది మంది ఖురాన్‌ను పూర్తిగా కంఠస్థం చేశారు, మరియు వారిలో చాలామంది అరబిక్ మాతృభాషగా మాట్లాడేవారు కాదు.", en: "Millions have the whole Quran by heart, and most of them are not native Arabic speakers." },
      { te: "ప్రవక్త ﷺ ప్రతి రమజాన్‌లో జిబ్రయీల్ (అ)తో ఖురాన్‌ను పునరావృత్తి చేసేవారు — పునరావృత్తి ఎంత ముఖ్యమో ఇది చూపుతుంది.", en: "The Prophet ﷺ revised the Quran with Jibreel every Ramadan, which says something about how central revision is." },
    ],
    reflect: [
      { te: "మీకు ఇప్పటికే కంఠస్థమైన సూరాలను చివరిసారి ఎప్పుడు పునరావృత్తి చేశారు?", en: "When did you last revise the surahs you already know by heart?" },
    ],
    mistakes: [
      { te: "పునరావృత్తి లేకుండా కొత్తది కంఠస్థం చేస్తూ పోవడం.", en: "Pushing on with new material without revising." },
      { te: "ముస్‌హఫ్ మార్చడం — దృశ్య జ్ఞాపకం పోతుంది.", en: "Changing mushaf, which loses the visual memory." },
      { te: "అర్థం తెలుసుకోకుండా కేవలం శబ్దాలను కంఠస్థం చేయడం.", en: "Memorising sounds without learning what they mean." },
    ],
    faqs: [
      {
        question: { te: "కంఠస్థం చేసినది మరచిపోతే పాపమా?", en: "Is it a sin to forget what I memorised?" },
        answer: {
          te: "నిర్లక్ష్యం వల్ల వదిలేయడం గురించి పండితులు హెచ్చరిస్తారు. కానీ వయసు, అనారోగ్యం, పరిస్థితుల వల్ల సహజంగా మరచిపోవడం వేరు — అల్లాహ్ ఎవరిపైనా వారి శక్తికి మించి భారం మోపడు (అల్-బఖరా 2:286). ముఖ్యమైనది కంఠస్థంతో సంబంధాన్ని పూర్తిగా వదిలేయకపోవడం; కొంచెమైనా పునరావృత్తి చేస్తూ ఉండండి.",
          en: "Scholars warn against abandoning it through neglect. Forgetting naturally through age, illness or circumstance is another matter, and Allah does not burden a soul beyond its capacity (Al-Baqarah 2:286). What matters is not cutting the connection off entirely; keep revising something, however little.",
        },
      },
      {
        question: { te: "పిల్లలను ఏ వయసులో మొదలుపెట్టించాలి?", en: "At what age should children start?" },
        answer: {
          te: "ఐదు నుండి ఏడు సంవత్సరాల మధ్య పిల్లలు వేగంగా కంఠస్థం చేస్తారు. కానీ బలవంతం చేయవద్దు — ఖురాన్‌తో సంబంధం ప్రేమతో మొదలవ్వాలి, ఒత్తిడితో కాదు. ఒక పిల్లవాడు ఖురాన్‌ను ద్వేషించేలా చేసే హిఫ్జ్ కార్యక్రమం విజయం కాదు.",
          en: "Children between five and seven memorise quickly. But do not force it; the relationship with the Quran should begin in affection rather than pressure. A hifz programme that leaves a child resenting the Quran has not succeeded.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సూచించబడిన పునరావృత్తి నిష్పత్తి ఏమిటి?", en: "What revision ratio is suggested?" },
        options: [
          { te: "కొత్తదానికి 1, పాతదానికి 3-4", en: "One part new to three or four parts old" },
          { te: "కొత్తదానికి 4, పాతదానికి 1", en: "Four parts new to one part old" },
          { te: "పునరావృత్తి అవసరం లేదు", en: "No revision needed" },
        ],
        answer: 0,
      },
      {
        question: { te: "పూర్తి హిఫ్జ్ సాధారణంగా ఎంత కాలం?", en: "How long does a complete hifz usually take?" },
        options: [
          { te: "మూడు నుండి ఐదు సంవత్సరాలు", en: "Three to five years" },
          { te: "ఆరు నెలలు", en: "Six months" },
          { te: "ఇరవై సంవత్సరాలు", en: "Twenty years" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఒకే ముస్‌హఫ్ ఎందుకు వాడాలి?", en: "Why use one mushaf?" },
        options: [
          { te: "పేజీ దృశ్య జ్ఞాపకం సహాయపడుతుంది", en: "The visual memory of the page helps" },
          { te: "ఇతర ప్రతులు తప్పుగా ఉంటాయి", en: "Other copies are inaccurate" },
          { te: "అది చౌక", en: "It is cheaper" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "పునరావృత్తి > కంఠస్థం.", en: "Revision outweighs memorisation." },
      { te: "ఒకే ముస్‌హఫ్ · వినండి తర్వాత చదవండి · నమాజ్‌లో చదవండి.", en: "One mushaf, listen then read, recite in prayer." },
      { te: "నిలుపుకోగలిగినదే కంఠస్థం చేయండి.", en: "Memorise what you can hold." },
    ],
    summary: {
      te: "హిఫ్జ్ ప్రతిభ కాదు, పద్ధతి. అసలు పని పునరావృత్తి — కొత్తదానికి ఒక భాగమైతే పాతదానికి మూడు నుండి నాలుగు. ఒకే ముస్‌హఫ్ వాడండి, వినండి, నమాజ్‌లో చదవండి, అర్థం తెలుసుకోండి. పూర్తి హిఫ్జ్ అందరిపైనా విధి కాదు.",
      en: "Hifz is method rather than talent. The real work is revision, one part new to three or four parts old. Use one mushaf, listen first, recite in prayer and learn the meaning. A complete hifz is not an obligation on everyone.",
    },
    apply: {
      te: "ఆచరణ: ఈ వారం కొత్తది ఏమీ కంఠస్థం చేయకుండా, మీకు ఇప్పటికే తెలిసినదంతా పునరావృత్తి చేయండి.",
      en: "Apply it: memorise nothing new this week and revise everything you already know.",
    },
    reading: [
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
      { label: "Tajweed", url: "/knowledge-center/learn-quran/tajweed" },
    ],
  },
];
