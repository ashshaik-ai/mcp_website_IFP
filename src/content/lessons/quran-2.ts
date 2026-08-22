/* Learn Quran, levels 5 to 8. Split from ./quran.ts to keep the files
   readable; both arrays are spread into authoredLessons together. */
import type { Lesson } from "../lessons.ts";

export const quranLessonsTwo: Lesson[] = [
  {
    slug: "tafseer",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 5 — తఫ్సీర్: అర్థం చేసుకోవడం",
      en: "Level 5 — Tafsir: understanding",
    },
    intro: {
      te: "చదవడం మొదటి మెట్టు; అర్థం చేసుకోవడం లక్ష్యం. కానీ 'నాకు అనిపించింది ఇదే' అనేది తఫ్సీర్ కాదు. ఈ పాఠం తఫ్సీర్ ఏ ఆధారాలపై నిలబడుతుందో, మీరు దాన్ని ఎలా చదవాలో చెబుతుంది.",
      en: "Reading is the first step and understanding is the goal. But what a verse seems to say to me is not tafsir. This lesson covers what tafsir actually rests on and how to read it.",
    },
    sections: [
      {
        heading: { te: "ఖురాన్ మొదట ఖురాన్‌ను వివరిస్తుంది", en: "The Quran explains itself first" },
        body: {
          te: "తఫ్సీర్ మూలాలకు ఒక క్రమం ఉంది. మొదటిది: ఖురాన్ స్వయంగా. ఒక చోట సంక్షిప్తంగా చెప్పినది మరో చోట వివరంగా వస్తుంది. సూరా అల్-ఫాతిహాలో 'నీవు అనుగ్రహించినవారి మార్గం' అని ఉంది; వారు ఎవరో సూరా అన్-నిసా 4:69 వివరిస్తుంది — ప్రవక్తలు, సత్యవంతులు, అమరవీరులు, సజ్జనులు. రెండోది: సున్నత్ — ప్రవక్త ﷺ స్వయంగా ఇచ్చిన వివరణ. మూడోది: సహచరుల అవగాహన, ఎందుకంటే వారు అవతరణ సందర్భాన్ని ప్రత్యక్షంగా చూశారు.",
          en: "The sources of tafsir come in an order. First the Quran itself: what is stated briefly in one place is expanded in another. Al-Fatihah speaks of the path of those You have favoured, and An-Nisa 4:69 says who they are, the prophets, the truthful, the martyrs and the righteous. Second the Sunnah, the Prophet's own explanation. Third the understanding of the companions, who saw the circumstances of revelation directly.",
        },
        check: {
          question: { te: "తఫ్సీర్‌కు మొదటి మూలం ఏది?", en: "What is the first source of tafsir?" },
          options: [
            { te: "ఖురాన్ స్వయంగా", en: "The Quran itself" },
            { te: "పండితుల అభిప్రాయం", en: "Scholarly opinion" },
            { te: "చరిత్ర గ్రంథాలు", en: "History books" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అస్బాబ్ అన్-నుజూల్ — ఎందుకు అవతరించింది", en: "Asbab al-nuzul: why a verse came" },
        body: {
          te: "కొన్ని ఆయతులు నిర్దిష్ట సంఘటనలకు స్పందనగా అవతరించాయి, మరియు ఆ సందర్భం తెలియకపోతే అర్థం వక్రమవుతుంది. ఒక ప్రసిద్ధ ఉదాహరణ: 'నమాజ్ దగ్గరకు వెళ్ళకండి' — ఇది ఒంటరిగా చదివితే భయంకరంగా అనిపిస్తుంది. పూర్తి ఆయత్ 'మత్తులో ఉన్నప్పుడు నమాజ్ దగ్గరకు వెళ్ళకండి' (అన్-నిసా 4:43), మరియు అది మద్యపాన నిషేధానికి ఒక దశ. సందర్భం లేకుండా ఖురాన్‌లోని పదబంధాలను తీసుకోవడం — ముస్లింలు, ముస్లిమేతరులు ఇద్దరూ చేసే పొరపాటు — ఇలాంటి వక్రీకరణలకు దారితీస్తుంది.",
          en: "Some verses came in response to particular events, and without that setting the meaning bends. A well-known example: do not approach the prayer sounds alarming on its own. The full verse is do not approach the prayer while intoxicated (An-Nisa 4:43), and it is one stage in the prohibition of intoxicants. Lifting phrases out of context, a mistake made by Muslims and non-Muslims alike, produces exactly this kind of distortion.",
        },
        check: {
          question: { te: "సందర్భం లేకుండా ఆయతును చదవడం వల్ల ఏమవుతుంది?", en: "What happens when a verse is read without its context?" },
          options: [
            { te: "అర్థం వక్రమవుతుంది", en: "The meaning bends" },
            { te: "ఏమీ మారదు", en: "Nothing changes" },
            { te: "అది మరింత స్పష్టమవుతుంది", en: "It becomes clearer" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "రెండు రకాల తఫ్సీర్", en: "Two kinds of tafsir" },
        body: {
          te: "'తఫ్సీర్ బిల్-మఅథూర్' అంటే ఉల్లేఖనల ఆధారంగా — ఖురాన్, హదీసు, సహచరుల మాటలు. 'తఫ్సీర్ బిర్-రఅయ్' అంటే వివేచన ఆధారంగా — భాష, సందర్భం, తర్కాన్ని ఉపయోగించి. రెండోది పూర్తిగా నిషిద్ధం కాదు; కానీ దానికి షరతులు ఉన్నాయి: అరబిక్ భాషలో ప్రావీణ్యం, ఖురాన్, సున్నత్ జ్ఞానం, మరియు ఉల్లేఖనలకు విరుద్ధంగా వెళ్ళకపోవడం. ఈ షరతులు లేకుండా 'నా అభిప్రాయం' చెప్పడాన్ని ప్రవక్త ﷺ తీవ్రంగా హెచ్చరించారు.",
          en: "Tafsir bil-ma'thur works from transmission: the Quran, hadith and the statements of the companions. Tafsir bil-ra'y works from reasoning, using language, context and inference. The second is not forbidden outright, but it carries conditions: command of Arabic, knowledge of the Quran and Sunnah, and not contradicting what has been transmitted. Offering an opinion without those conditions is something the Prophet ﷺ warned about sharply.",
        },
      },
      {
        heading: { te: "ఎక్కడ మొదలుపెట్టాలి", en: "Where to begin" },
        body: {
          te: "సాంప్రదాయ ప్రధాన గ్రంథాలు: అత్-తబరీ (అతి పురాతనమైన, విస్తృతమైనది), ఇబ్న్ కథీర్ (ఉల్లేఖనలపై ఆధారపడినది, అనువాదాలలో సులభంగా దొరుకుతుంది), అల్-ఖుర్తుబీ (చట్ట పరమైన అంశాలపై). కానీ కొత్తవారు వీటితో మొదలుపెట్టవద్దు — అవి పెద్దవి, భారీవి. మెరుగైన ఆరంభం: వివరణలతో ఉన్న ఒక అనువాదం. ఒక చిన్న సూరా తీసుకుని, అనువాదం చదివి, వివరణలు చదివి, ఒక ప్రశ్న రాసుకుని, దాన్ని ఆలిమ్‌ను అడగండి.",
          en: "The main classical works are al-Tabari, the oldest and most comprehensive; Ibn Kathir, which leans on transmission and is easy to find in translation; and al-Qurtubi, strong on legal questions. But do not start there; they are large and heavy going. A better start is a translation with footnotes. Take one short surah, read the translation, read the notes, write down one question, and put it to a scholar.",
        },
      },
      {
        heading: { te: "తదబ్బుర్ — ఇది వేరే విషయం", en: "Tadabbur is a different thing" },
        body: {
          te: "తఫ్సీర్ శాస్త్రం; తదబ్బుర్ ఆచరణ. ఖురాన్ చెబుతుంది: 'వారు ఖురాన్ గురించి ఆలోచించరా, లేక వారి హృదయాలపై తాళాలు ఉన్నాయా?' (ముహమ్మద్ 47:24). తదబ్బుర్ అంటే ఒక ఆయతును చదివి ఆగి, 'ఇది నా నుండి ఏమి కోరుతోంది?' అని అడగడం. దీనికి పండితుడు కానవసరం లేదు. తఫ్సీర్ మీకు ఆయత్ అర్థం చెబుతుంది; తదబ్బుర్ దాన్ని మీ జీవితంలోకి తెస్తుంది. రెండూ అవసరం, కానీ అవి ఒకటి కాదు.",
          en: "Tafsir is a discipline; tadabbur is a practice. The Quran asks: 'Do they not reflect upon the Quran, or are there locks upon their hearts?' (Muhammad 47:24). Tadabbur means reading a verse, stopping, and asking what it is asking of you. That requires no scholarship. Tafsir tells you what a verse means; tadabbur brings it into your life. Both are needed, and they are not the same thing.",
        },
      },
    ],
    takeaways: [
      { te: "మూలాల క్రమం: ఖురాన్, సున్నత్, సహచరులు.", en: "The order of sources: the Quran, the Sunnah, the companions." },
      { te: "సందర్భం లేకుండా ఆయతును తీసుకోవడం అర్థాన్ని వక్రీకరిస్తుంది.", en: "Lifting a verse out of context distorts it." },
      { te: "తఫ్సీర్ శాస్త్రం; తదబ్బుర్ ప్రతి ఒక్కరి ఆచరణ.", en: "Tafsir is a discipline; tadabbur is everyone's practice." },
    ],
    didYouKnow: [
      { te: "అత్-తబరీ తఫ్సీర్ ముద్రిత రూపంలో ఇరవైకి పైగా సంపుటాలు.", en: "Al-Tabari's tafsir runs past twenty volumes in print." },
      { te: "ఇబ్న్ అబ్బాస్ (ర/అ)ను 'తర్జుమానుల్ ఖురాన్' — ఖురాన్ వ్యాఖ్యాత — అని పిలిచేవారు; ప్రవక్త ﷺ ఆయన కోసం అర్థ జ్ఞానాన్ని దుఆ చేశారు.", en: "Ibn Abbas (RA) was called the interpreter of the Quran, and the Prophet ﷺ prayed that he be given understanding of it." },
    ],
    reflect: [
      { te: "మీరు ఈ వారం చదివిన ఒక ఆయత్ మీ నుండి ఏమి కోరుతోంది?", en: "What is one verse you read this week asking of you?" },
    ],
    mistakes: [
      { te: "ఒక ఆయతును సందర్భం లేకుండా ఉదహరించడం.", en: "Quoting a verse without its context." },
      { te: "అర్హత లేకుండా 'ఈ ఆయత్ అర్థం ఇదే' అని ప్రకటించడం.", en: "Declaring what a verse means without the qualifications to do so." },
      { te: "తఫ్సీర్ చదవడం మొదలుపెట్టి పెద్ద గ్రంథాలతో ఆరంభించి వదిలేయడం.", en: "Starting with the largest classical works and giving up." },
    ],
    faqs: [
      {
        question: { te: "నేను స్వయంగా ఖురాన్ అర్థం చేసుకోవచ్చా?", en: "Can I understand the Quran on my own?" },
        answer: {
          te: "అనువాదం చదివి పాఠాలు తీసుకోవడం, ఆలోచించడం — ఇది ప్రతి ముస్లిం చేయాలి, మరియు ఖురాన్ దాన్నే ఆదేశిస్తుంది. కానీ ఒక ఆయత్ నుండి కొత్త ఆదేశాన్ని లేదా ఫత్వాను తీయడం వేరే విషయం; దానికి శిక్షణ అవసరం. తేడా: మీ కోసం పాఠం తీసుకోవడం vs ఇతరులకు నియమం ప్రకటించడం.",
          en: "Reading a translation, taking lessons from it and reflecting is something every Muslim should do, and the Quran instructs it. Deriving a ruling or a fatwa from a verse is another matter and requires training. The line is between drawing a lesson for yourself and declaring a rule for others.",
        },
      },
      {
        question: { te: "వేర్వేరు తఫ్సీర్‌లు వేర్వేరుగా చెబితే?", en: "What if different tafsirs disagree?" },
        answer: {
          te: "ఇది సాధారణం, మరియు ఆందోళనకరం కాదు. ఖురాన్‌లోని కొన్ని ఆయతులు ఒకటి కంటే ఎక్కువ సరైన అర్థాలను మోస్తాయి; ప్రాచీన పండితులు తరచూ 'ఈ ఆయతుపై రెండు అభిప్రాయాలు ఉన్నాయి' అని రాశారు. ఆందోళనకరమైనది భేదం కాదు — ఆధారం లేని అభిప్రాయం.",
          en: "That is common and not alarming. Some verses genuinely carry more than one sound meaning, and classical scholars often wrote that there are two views on a verse. What should concern you is not disagreement but an opinion with no basis.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'అస్బాబ్ అన్-నుజూల్' అంటే ఏమిటి?", en: "What is asbab al-nuzul?" },
        options: [
          { te: "ఆయతులు అవతరించిన సందర్భాలు", en: "The circumstances in which verses were revealed" },
          { te: "ఆయతుల సంఖ్య", en: "The number of verses" },
          { te: "పఠన నియమాలు", en: "The rules of recitation" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తఫ్సీర్ బిల్-మఅథూర్' దేనిపై ఆధారపడుతుంది?", en: "What does tafsir bil-ma'thur rest on?" },
        options: [
          { te: "ఉల్లేఖనలు — ఖురాన్, హదీసు, సహచరులు", en: "Transmission: Quran, hadith, the companions" },
          { te: "వ్యక్తిగత అభిప్రాయం", en: "Personal opinion" },
          { te: "కలలు", en: "Dreams" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తదబ్బుర్' అంటే ఏమిటి?", en: "What is tadabbur?" },
        options: [
          { te: "ఆగి ఆలోచించడం — 'ఇది నా నుండి ఏమి కోరుతోంది?'", en: "Stopping to reflect on what a verse asks of you" },
          { te: "వేగంగా చదవడం", en: "Reading quickly" },
          { te: "కంఠస్థం చేయడం", en: "Memorising" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "మూలాలు: ఖురాన్ → సున్నత్ → సహచరులు.", en: "Sources: Quran, then Sunnah, then the companions." },
      { te: "తబరీ · ఇబ్న్ కథీర్ · ఖుర్తుబీ.", en: "Al-Tabari, Ibn Kathir, al-Qurtubi." },
      { te: "తఫ్సీర్ = అర్థం; తదబ్బుర్ = ఆచరణ.", en: "Tafsir is meaning; tadabbur is practice." },
    ],
    summary: {
      te: "తఫ్సీర్ ఒక క్రమాన్ని అనుసరిస్తుంది: ఖురాన్, సున్నత్, సహచరులు. అవతరణ సందర్భం తెలియకపోతే అర్థం వక్రమవుతుంది. కొత్తవారు వివరణలతో ఉన్న అనువాదంతో మొదలుపెట్టాలి. తఫ్సీర్ శాస్త్రం, కానీ తదబ్బుర్ — ఆగి ఆలోచించడం — ప్రతి ఒక్కరిదీ.",
      en: "Tafsir follows an order: the Quran, the Sunnah, the companions. Without the circumstances of revelation the meaning bends. Beginners should start from an annotated translation. Tafsir is a discipline, but tadabbur, stopping to reflect, belongs to everyone.",
    },
    apply: {
      te: "ఆచరణ: ఒక చిన్న సూరా అనువాదం చదివి, ఒక ప్రశ్న రాసుకుని, ఈ వారం ఒక ఆలిమ్‌ను అడగండి.",
      en: "Apply it: read one short surah in translation, write down one question, and ask a scholar this week.",
    },
    reading: [
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
      { label: "Understanding Quranic words", url: "/knowledge-center/learn-quran/words" },
    ],
  },

  {
    slug: "adab",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 6 — ఖురాన్‌తో జీవించడం",
      en: "Level 6 — Living with the Quran",
    },
    intro: {
      te: "ఖురాన్‌ను ఎలా పట్టుకోవాలి, ఎలా చదవాలి, దానితో ఎలా ఉండాలి — ఈ మర్యాదలు (అదబ్) కేవలం ఆచారాలు కాదు. అవి పఠనాన్ని అలవాటు నుండి సంభాషణగా మారుస్తాయి.",
      en: "How to hold the Quran, how to read it, how to be with it. These manners are not mere formality; they turn recitation from a habit into a conversation.",
    },
    sections: [
      {
        heading: { te: "ఆరంభం: తఅవ్వుజ్, బిస్మిల్లాహ్", en: "Beginning: seeking refuge, then bismillah" },
        body: {
          te: "ఖురాన్ ఆదేశిస్తుంది: 'నీవు ఖురాన్ చదివేటప్పుడు, శపించబడిన షైతాన్ నుండి అల్లాహ్ శరణు కోరు' (అన్-నహ్ల్ 16:98). కాబట్టి 'అఊజు బిల్లాహి మినష్ షైతానిర్ రజీమ్' అని మొదలుపెట్టి, తర్వాత 'బిస్మిల్లాహిర్ రహ్మానిర్ రహీమ్'. ఒక చిన్న వివరం: సూరా అత్-తౌబా మొదట బిస్మిల్లాహ్ ఉండదు — ఆ ఒక్క సూరా మాత్రమే. మధ్యలో ఎక్కడైనా మొదలుపెడితే తఅవ్వుజ్ చాలు.",
          en: "The Quran instructs: 'When you recite the Quran, seek refuge in Allah from the accursed Shaytan' (An-Nahl 16:98). So begin with a'udhu billahi min ash-shaytan ir-rajeem, then bismillah ir-Rahman ir-Raheem. One small detail: Surah at-Tawbah has no bismillah at its head, and it is the only one. If you begin mid-surah, the ta'awwudh alone is enough.",
        },
        check: {
          question: { te: "ఏ సూరా ముందు బిస్మిల్లాహ్ ఉండదు?", en: "Which surah has no bismillah at its head?" },
          options: [
            { te: "అత్-తౌబా", en: "At-Tawbah" },
            { te: "అల్-ఫాతిహా", en: "Al-Fatihah" },
            { te: "అల్-ఇఖ్లాస్", en: "Al-Ikhlas" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "తర్తీల్ — నెమ్మదిగా, స్పష్టంగా", en: "Tartil: slowly and clearly" },
        body: {
          te: "అల్లాహ్ ఆదేశం: 'ఖురాన్‌ను తర్తీల్‌తో చదువు' (అల్-ముజ్జమ్మిల్ 73:4) — నెమ్మదిగా, స్పష్టంగా, కొలిచినట్లు. ఆయిషా (ర/అ) ప్రవక్త ﷺ పఠనాన్ని వర్ణిస్తూ, ఆయన ఎంత నెమ్మదిగా చదివేవారంటే చిన్న సూరా కూడా చాలా సమయం తీసుకునేదని చెప్పారు. ఇబ్న్ మస్ఊద్ (ర/అ) అన్నారు: 'ఖురాన్‌ను కవిత్వంలా చెల్లాచెదురు చేయవద్దు, చెడిపోయిన ఖర్జూరాలలా రాల్చవద్దు; దాని ఆశ్చర్యాల వద్ద ఆగండి, దానితో హృదయాలను కదిలించండి'. వేగం లక్ష్యం కాదు.",
          en: "Allah commands: 'Recite the Quran with tartil' (Al-Muzzammil 73:4), meaning slowly, clearly, measured. Aisha (RA) described the Prophet's recitation as so unhurried that a short surah took a long time. Ibn Mas'ud (RA) said: do not scatter the Quran like poetry or shed it like bad dates; stop at its wonders and move hearts with it. Speed is not the aim.",
        },
        check: {
          question: { te: "'తర్తీల్' అంటే ఏమిటి?", en: "What does tartil mean?" },
          options: [
            { te: "నెమ్మదిగా, స్పష్టంగా, కొలిచినట్లు", en: "Slowly, clearly, measured" },
            { te: "వీలైనంత వేగంగా", en: "As fast as possible" },
            { te: "మౌనంగా", en: "Silently" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ముస్‌హఫ్‌ను తాకడం", en: "Touching the mushaf" },
        body: {
          te: "నాలుగు మజ్‌హబ్‌లూ అరబిక్ ముస్‌హఫ్‌ను తాకడానికి వుజూ ఉండాలని అంటాయి, 'పరిశుద్ధులు తప్ప దాన్ని తాకరు' (అల్-వాఖిఅ 56:79) అనే ఆయత్ ఆధారంగా. కొందరు ఆధునిక పండితులు ఆ ఆయత్ దైవదూతల గురించి అని వాదిస్తారు, కానీ మెజారిటీ స్థానం స్పష్టం. ఒక ఆచరణాత్మక విషయం: వుజూ లేకుండా కంఠస్థం నుండి చదవడం అనుమతించబడింది, మరియు ఫోన్ లేదా యాప్‌లో చదవడం గురించి చాలామంది సమకాలీన పండితులు అనుమతిస్తారు — ఎందుకంటే అది ముస్‌హఫ్ కాదు, తెరపై కనిపించే చిత్రం.",
          en: "All four schools hold that wudu is required to touch an Arabic mushaf, on the basis of 'none touch it except the purified' (Al-Waqi'ah 56:79). Some contemporary scholars argue that verse describes the angels, but the majority position is clear. Two practical points: reciting from memory without wudu is permitted, and most contemporary scholars allow reading from a phone or app, since that is an image on a screen rather than a mushaf.",
        },
      },
      {
        heading: { te: "సజ్దా అత్-తిలావా", en: "The prostration of recitation" },
        body: {
          te: "ఖురాన్‌లో పదిహేను ప్రదేశాలలో (కొన్ని మజ్‌హబ్‌ల ప్రకారం పద్నాలుగు) సజ్దా చిహ్నం ఉంటుంది. ఆ ఆయత్ చదివినప్పుడు లేదా విన్నప్పుడు ఒక సజ్దా చేయడం సున్నత్ (హనఫీ మజ్‌హబ్‌లో వాజిబ్). ఇది నమాజ్ కాదు — వుజూతో, ఖిబ్లా వైపు తిరిగి, 'అల్లాహు అక్బర్' అని సజ్దాలోకి వెళ్ళి, సజ్దా తస్బీహ్ చెప్పి లేవడం. మీ ముస్‌హఫ్ అంచున ఈ చిహ్నాలు గుర్తించండి; చాలామంది వాటిని చూడకుండానే దాటిపోతారు.",
          en: "There are fifteen places in the Quran marked for prostration, fourteen in some schools. On reciting or hearing such a verse, a single prostration is sunnah, and wajib in the Hanafi school. It is not a prayer: with wudu, facing the qiblah, say Allahu akbar, prostrate, say the prostration tasbih and rise. Look for the marks in the margin of your mushaf; most people pass them without noticing.",
        },
      },
      {
        heading: { te: "అసలు మర్యాద ఆచరణ", en: "The manner that matters most is acting on it" },
        body: {
          te: "ఆయిషా (ర/అ)ను ప్రవక్త ﷺ స్వభావం గురించి అడిగినప్పుడు ఆమె అన్నారు: 'ఆయన స్వభావం ఖురాన్ ఆయె' (ముస్లిం). అంటే ఖురాన్ ఒక వ్యక్తిలో నడిచినట్లు. ఇదే అత్యున్నత అదబ్: మీరు చదివేదాన్ని జీవించడం. ముస్‌హఫ్‌ను ఎత్తైన అరలో ఉంచడం, పరిశుభ్రంగా ఉంచడం — ఇవన్నీ మంచివి. కానీ ఖురాన్‌ను గౌరవంగా అరలో పెట్టి, అది చెప్పేదాన్ని విస్మరించడం అసలు అగౌరవం.",
          en: "Asked about the Prophet's character, Aisha (RA) said his character was the Quran (Muslim): the Quran walking in a person. That is the highest adab, living what you read. Keeping the mushaf on a high shelf and keeping it clean are all good. But shelving the Quran respectfully while ignoring what it says is the real disrespect.",
        },
      },
    ],
    takeaways: [
      { te: "తఅవ్వుజ్, తర్వాత బిస్మిల్లాహ్ (అత్-తౌబా తప్ప).", en: "Ta'awwudh, then bismillah, except at at-Tawbah." },
      { te: "తర్తీల్: నెమ్మదిగా, స్పష్టంగా — వేగం లక్ష్యం కాదు.", en: "Tartil: slow and clear; speed is not the aim." },
      { te: "ముస్‌హఫ్‌ను తాకడానికి వుజూ; కంఠస్థం నుండి చదవడానికి అవసరం లేదు.", en: "Wudu to touch the mushaf; not needed to recite from memory." },
    ],
    didYouKnow: [
      { te: "ఖురాన్‌లో పదిహేను సజ్దా స్థానాలు ఉన్నాయి, మరియు అవి మీ ముస్‌హఫ్ అంచున గుర్తించబడి ఉంటాయి.", en: "There are fifteen prostration points, marked in the margin of your mushaf." },
      { te: "ప్రవక్త ﷺ ఇతరుల నుండి ఖురాన్ వినడాన్ని ఇష్టపడేవారు; ఇబ్న్ మస్ఊద్ (ర/అ) చదువుతుంటే ఆయన కంటినీరు పెట్టారు.", en: "The Prophet ﷺ liked to hear the Quran from others, and wept while Ibn Mas'ud (RA) recited to him." },
    ],
    reflect: [
      { te: "'ఆయన స్వభావం ఖురాన్' — మీ ప్రవర్తనలో ఏ ఒక్క భాగాన్ని ఖురాన్‌కు దగ్గరగా తీసుకురాగలరు?", en: "His character was the Quran. Which one part of your conduct could you bring closer to it?" },
    ],
    mistakes: [
      { te: "వేగంగా చదివి ఎన్ని పేజీలు పూర్తయ్యాయో లెక్కపెట్టడం.", en: "Racing through and counting pages completed." },
      { te: "సజ్దా ఆయతులను గమనించకుండా దాటిపోవడం.", en: "Passing the prostration verses without noticing them." },
      { te: "ముస్‌హఫ్‌ను గౌరవంగా ఉంచి, అది చెప్పేదాన్ని పట్టించుకోకపోవడం.", en: "Honouring the mushaf on a shelf while ignoring what it says." },
    ],
    faqs: [
      {
        question: { te: "ఋతుస్రావ సమయంలో స్త్రీ ఖురాన్ చదవవచ్చా?", en: "May a woman recite the Quran during menstruation?" },
        answer: {
          te: "ఇక్కడ మజ్‌హబ్‌ల మధ్య భేదం ఉంది. మెజారిటీ ముస్‌హఫ్‌ను తాకడాన్ని, పఠనాన్ని అనుమతించరు. అయితే జికర్, దుఆ, తస్బీహ్‌గా ఆయతులు చెప్పడం, మరియు అనువాదం చదవడం అనుమతించబడతాయి. మాలికీ మజ్‌హబ్ ఉపాధ్యాయినులకు, విద్యార్థినులకు మరింత వెసులుబాటు ఇస్తుంది. మీ పరిస్థితికి స్థానిక ఆలిమ్‌ను అడగండి.",
            en: "The schools differ. The majority do not permit touching the mushaf or reciting. Saying verses as dhikr or supplication, and reading a translation, are permitted. The Maliki school allows more latitude for teachers and students. Ask a local scholar about your own situation.",
        },
      },
      {
        question: { te: "పాత లేదా చిరిగిన ముస్‌హఫ్‌ను ఏమి చేయాలి?", en: "What should be done with a worn-out mushaf?" },
        answer: {
          te: "చెత్తలో వేయకూడదు. సాంప్రదాయ మార్గాలు: పరిశుభ్రమైన స్థలంలో పాతిపెట్టడం, లేదా కాల్చడం (ఉస్మాన్ (ర/అ) ప్రామాణీకరణ తర్వాత ఇలా చేశారని ఉల్లేఖనలు ఉన్నాయి). చాలా మస్జిద్‌లు పాత ప్రతులను స్వీకరించి సరైన రీతిలో పరిష్కరిస్తాయి — మీ మస్జిద్‌లో అడగండి.",
          en: "It should not go in the rubbish. The traditional options are burial in a clean place or burning, which is reported of Uthman (RA) after the standardisation. Many mosques accept worn copies and handle them properly; ask at yours.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "ఖురాన్ 73:4 ఏమి ఆదేశిస్తుంది?", en: "What does Quran 73:4 instruct?" },
        options: [
          { te: "తర్తీల్‌తో చదవమని", en: "To recite with tartil" },
          { te: "వేగంగా చదవమని", en: "To recite quickly" },
          { te: "మౌనంగా చదవమని", en: "To recite silently" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖురాన్‌లో ఎన్ని సజ్దా స్థానాలు?", en: "How many prostration points are in the Quran?" },
        options: [
          { te: "పదిహేను", en: "Fifteen" },
          { te: "ఐదు", en: "Five" },
          { te: "ముప్ఫై", en: "Thirty" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఆయిషా (ర/అ) ప్రవక్త ﷺ స్వభావాన్ని ఎలా వర్ణించారు?", en: "How did Aisha (RA) describe the Prophet's character?" },
        options: [
          { te: "'ఆయన స్వభావం ఖురాన్'", en: "His character was the Quran" },
          { te: "'ఆయన మౌనంగా ఉండేవారు'", en: "He was silent" },
          { te: "'ఆయన కఠినంగా ఉండేవారు'", en: "He was severe" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "తఅవ్వుజ్ → బిస్మిల్లాహ్ → తర్తీల్.", en: "Ta'awwudh, bismillah, tartil." },
      { te: "వుజూ: ముస్‌హఫ్ తాకడానికి; కంఠస్థానికి కాదు.", en: "Wudu for touching the mushaf, not for memory." },
      { te: "15 సజ్దా స్థానాలు; 'ఆయన స్వభావం ఖురాన్'.", en: "Fifteen prostration points; his character was the Quran." },
    ],
    summary: {
      te: "తఅవ్వుజ్‌తో మొదలుపెట్టి, బిస్మిల్లాహ్ చెప్పి, తర్తీల్‌తో నెమ్మదిగా చదవండి. ముస్‌హఫ్ తాకడానికి వుజూ, కంఠస్థం నుండి చదవడానికి అవసరం లేదు. పదిహేను సజ్దా స్థానాలను గమనించండి. కానీ అత్యున్నత మర్యాద: మీరు చదివేదాన్ని జీవించడం.",
      en: "Begin with the ta'awwudh and bismillah and read with tartil. Wudu is needed to touch the mushaf but not to recite from memory. Watch for the fifteen prostration points. But the highest manner is to live what you read.",
    },
    apply: {
      te: "ఆచరణ: మీ ముస్‌హఫ్‌లో ఒక సజ్దా చిహ్నాన్ని కనుగొని, ఆ ఆయత్ ఏమి చెబుతుందో చూడండి.",
      en: "Apply it: find one prostration mark in your mushaf and read what that verse says.",
    },
    reading: [
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
      { label: "Learn Salah portal", url: "/knowledge-center/learn-salah" },
    ],
  },

  {
    slug: "words",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 7 — ఖురాన్ పదాలను అర్థం చేసుకోవడం",
      en: "Level 7 — Understanding Quranic words",
    },
    intro: {
      te: "ఖురాన్‌లో అత్యధికంగా వచ్చే కొన్ని వందల పదాలు మొత్తం పాఠంలో సగానికిపైగా ఆక్రమిస్తాయి. వాటిని నేర్చుకోవడం అంటే అరబిక్ భాషలో ప్రావీణ్యం కాదు — అది పఠనాన్ని వినడం నుండి అర్థం చేసుకోవడంగా మార్చడం.",
      en: "A few hundred of the most frequent words make up over half the text of the Quran. Learning them is not the same as fluency; it is the difference between hearing recitation and following it.",
    },
    sections: [
      {
        heading: { te: "పౌనఃపున్యం క్రమంలో నేర్చుకోండి", en: "Learn in order of frequency" },
        body: {
          te: "చాలామంది అక్షరక్రమంలో ఉన్న పద జాబితాలతో మొదలుపెడతారు — ఇది అసమర్థం. బదులుగా ఖురాన్‌లో ఎన్నిసార్లు వస్తుందో దాని ప్రకారం నేర్చుకోండి. అత్యధికంగా వచ్చేవి పెద్ద పేర్లు కాదు, చిన్న పదాలు: 'మిన్' (నుండి), 'ఫీ' (లో), 'అలా' (పై), 'ఇలా' (వైపు), 'మా' (ఏమి / కాదు), 'లా' (కాదు), 'ఇన్న' (నిశ్చయంగా), 'అల్లజీ' (ఎవరైతే), 'కుల్' (చెప్పు), 'కాన' (అయ్యాడు). ఈ పది పదాలు ప్రతి పేజీలో డజన్ల సార్లు వస్తాయి.",
          en: "Most people start from an alphabetical word list, which is inefficient. Learn instead in order of how often a word occurs. The most frequent are not the grand nouns but the small words: min from, fi in, alaa on, ilaa towards, maa what or not, laa no, inna indeed, alladhee the one who, qul say, kaana was. Those ten appear dozens of times on every page.",
        },
        check: {
          question: { te: "ఏ పదాలను ముందుగా నేర్చుకోవాలి?", en: "Which words should be learned first?" },
          options: [
            { te: "అత్యధిక పౌనఃపున్యం ఉన్న చిన్న పదాలు", en: "The small, most frequent words" },
            { te: "అక్షరక్రమంలో మొదటివి", en: "Whatever comes first alphabetically" },
            { te: "పొడవాటి పదాలు", en: "The longest words" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మూలం ఒక పదాన్ని పదిగా మారుస్తుంది", en: "A root turns one word into ten" },
        body: {
          te: "అరబిక్ పదాలు మూడు హల్లుల మూలాల నుండి పుడతాయి. ఒక మూలం తెలిస్తే దాని కుటుంబం మొత్తం వస్తుంది. ఉదాహరణకు ఎ-ల-మ్ (జ్ఞానం): 'ఇల్మ్' (జ్ఞానం), 'ఆలిమ్' (తెలిసినవాడు), 'అలీమ్' (సర్వజ్ఞుడు — అల్లాహ్ పేరు), 'ముఅల్లిమ్' (ఉపాధ్యాయుడు), 'తఅలీమ్' (బోధన), 'మఅలూమ్' (తెలిసినది). ఆరు పదాలు, ఒకే మూలం. ఇలా కేవలం యాభై మూలాలు నేర్చుకుంటే వందల పదాలు మీకు అర్థమవుతాయి.",
          en: "Arabic words grow from three-consonant roots, and knowing one root gives you its whole family. Take a-l-m, which carries knowing: ilm knowledge, aalim one who knows, Aleem the All-Knowing which is a name of Allah, mu'allim a teacher, ta'leem teaching, ma'loom something known. Six words from one root. Learn fifty roots this way and hundreds of words open up.",
        },
        check: {
          question: { te: "'ఆలిమ్', 'అలీమ్', 'ముఅల్లిమ్' — వీటిని ఏది కలుపుతుంది?", en: "What connects aalim, Aleem and mu'allim?" },
          options: [
            { te: "ఒకే మూలం ఎ-ల-మ్", en: "The shared root a-l-m" },
            { te: "అవి ఒకే పదం", en: "They are the same word" },
            { te: "ఏమీ కలపదు", en: "Nothing" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "నమాజ్‌లో చదివేదాని నుండే మొదలుపెట్టండి", en: "Start from what you already say in prayer" },
        body: {
          te: "ఇది అత్యంత ఆచరణాత్మక సలహా. మీరు ప్రతిరోజూ సూరా అల్-ఫాతిహాను కనీసం పదిహేడు సార్లు చదువుతారు. దాని ఏడు ఆయతుల్లోని ప్రతి పదానికి అర్థం నేర్చుకోండి — అది సుమారు ఇరవై ఐదు పదాలు. తర్వాత మీరు నమాజ్‌లో చదివే చిన్న సూరాలు. తర్వాత రుకూ, సజ్దా తస్బీహ్‌లు, తషహ్హుద్. ఇది పూర్తయ్యేసరికి మీకు అత్యంత తరచుగా వచ్చే పదాలు చాలావరకు తెలుస్తాయి — మరియు మీ నమాజ్ పూర్తిగా మారిపోతుంది.",
          en: "This is the most practical advice in the lesson. You recite Surah al-Fatihah at least seventeen times a day. Learn what every word in its seven verses means, which is about twenty-five words. Then the short surahs you use in prayer. Then the tasbih of bowing and prostration, and the tashahhud. By the end you will know most of the highest-frequency words, and your prayer will have changed completely.",
        },
      },
      {
        heading: { te: "వాస్తవిక లక్ష్యం", en: "A realistic target" },
        body: {
          te: "రోజుకు ఐదు పదాలు. ఇది చిన్నగా అనిపిస్తుంది, కానీ ఏడాదికి పద్దెనిమిది వందల పదాలు — ఖురాన్ అర్థం చేసుకోవడానికి అవసరమైనదానికి మించి. కీలకం రోజువారీ క్రమం, పరిమాణం కాదు. ఒక చిన్న నోట్‌బుక్‌లో పదం, దాని అర్థం, అది వచ్చిన ఆయత్ రాయండి — సందర్భంతో ఉన్న పదం ఒంటరి పదం కంటే చాలా బాగా గుర్తుంటుంది.",
          en: "Five words a day. It sounds small and comes to eighteen hundred in a year, more than enough for following the Quran. The key is the daily rhythm rather than the quantity. Keep a small notebook with the word, its meaning and the verse it came from, since a word with its context sticks far better than a word alone.",
        },
      },
    ],
    takeaways: [
      { te: "పౌనఃపున్యం క్రమంలో నేర్చుకోండి — చిన్న పదాలు ముందు.", en: "Learn in frequency order, small words first." },
      { te: "ఒక మూలం ఒక పద కుటుంబాన్ని ఇస్తుంది.", en: "One root gives a family of words." },
      { te: "సూరా అల్-ఫాతిహా నుండి మొదలుపెట్టండి — రోజుకు పదిహేడు సార్లు.", en: "Start with al-Fatihah, which you say seventeen times a day." },
    ],
    didYouKnow: [
      { te: "'కుల్' (చెప్పు) అనే ఒక్క పదం ఖురాన్‌లో మూడు వందలకుపైగా సార్లు వస్తుంది.", en: "The single word qul, say, occurs over three hundred times." },
      { te: "ఖురాన్‌లో సుమారు 77,000 పదాలు ఉన్నా, వేర్వేరు మూలాలు రెండు వేలలోపే.", en: "The Quran has around 77,000 words but fewer than two thousand distinct roots." },
    ],
    reflect: [
      { te: "మీరు రోజుకు పదిహేడు సార్లు చదివే సూరా అల్-ఫాతిహాలో ఎన్ని పదాల అర్థం మీకు తెలుసు?", en: "Of the words in al-Fatihah, which you say seventeen times a day, how many do you know the meaning of?" },
    ],
    mistakes: [
      { te: "అక్షరక్రమ నిఘంటువుతో మొదలుపెట్టడం.", en: "Starting from an alphabetical dictionary." },
      { te: "పదాలను సందర్భం లేకుండా బట్టీ పట్టడం.", en: "Memorising words without their context." },
      { te: "వ్యాకరణం మొత్తం ముందు నేర్చుకోవాలని అనుకోవడం.", en: "Waiting until you have learned all the grammar first." },
    ],
    faqs: [
      {
        question: { te: "ఇది నేర్చుకుంటే అరబిక్ మాట్లాడగలనా?", en: "Will this let me speak Arabic?" },
        answer: {
          te: "లేదు, మరియు అది లక్ష్యం కాదు. ఖురానిక్ పదజాలం ఖురాన్ అర్థం చేసుకోవడానికి; మాట్లాడటం వేరే నైపుణ్యం, వేరే పదజాలం. ఒకటి మరొకదానికి సహాయపడుతుంది, కానీ అవి ఒకటి కాదు.",
          en: "No, and that is not the aim. Quranic vocabulary is for following the Quran; speaking is a separate skill with a different vocabulary. One helps the other, but they are not the same thing.",
        },
      },
      {
        question: { te: "ఏ వనరు వాడాలి?", en: "What resource should I use?" },
        answer: {
          te: "పద-పద అనువాదం ఉన్న ముస్‌హఫ్ అత్యంత ఉపయోగకరం — ప్రతి అరబిక్ పదం కింద దాని అర్థం ఉంటుంది. ఇవి ఉర్దూలో, ఇంగ్లిష్‌లో సులభంగా దొరుకుతాయి. Quran.com వంటి సైట్‌లు కూడా పద-పద అర్థాన్ని చూపిస్తాయి.",
          en: "A word-by-word mushaf is the most useful thing, with the meaning printed under each Arabic word. These are easy to find in Urdu and English, and sites such as Quran.com show word-by-word meanings too.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "'ఇల్మ్' ఏ మూలం నుండి?", en: "Which root does ilm come from?" },
        options: [
          { te: "ఎ-ల-మ్", en: "a-l-m" },
          { te: "ఎ-మ్-ల్", en: "a-m-l" },
          { te: "ఎ-ల-య్", en: "a-l-y" },
        ],
        answer: 0,
      },
      {
        question: { te: "రోజుకు ఐదు పదాలు అంటే ఏడాదికి ఎంత?", en: "Five words a day comes to how many in a year?" },
        options: [
          { te: "సుమారు 1,800", en: "About 1,800" },
          { te: "సుమారు 150", en: "About 150" },
          { te: "సుమారు 10,000", en: "About 10,000" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఎక్కడ నుండి మొదలుపెట్టమని సూచించారు?", en: "Where does the lesson suggest starting?" },
        options: [
          { te: "సూరా అల్-ఫాతిహా", en: "Surah al-Fatihah" },
          { te: "సూరా అల్-బఖరా", en: "Surah al-Baqarah" },
          { te: "నిఘంటువు మొదటి పేజీ", en: "Page one of a dictionary" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "పౌనఃపున్యం క్రమం · మూల కుటుంబాలు · ఫాతిహా నుండి ఆరంభం.", en: "Frequency order, root families, start from al-Fatihah." },
      { te: "రోజుకు 5 పదాలు = ఏడాదికి 1,800.", en: "Five a day is eighteen hundred a year." },
      { te: "సందర్భంతో రాయండి, ఒంటరిగా కాదు.", en: "Write words with their context, not alone." },
    ],
    summary: {
      te: "కొన్ని వందల పదాలు ఖురాన్‌లో సగానికిపైగా ఆక్రమిస్తాయి. వాటిని పౌనఃపున్యం క్రమంలో, మూల కుటుంబాలుగా, సందర్భంతో నేర్చుకోండి. మీరు ప్రతిరోజూ నమాజ్‌లో చదివే సూరా అల్-ఫాతిహా నుండే మొదలుపెట్టండి.",
      en: "A few hundred words cover over half the Quran. Learn them in frequency order, as root families, and with their context. Start with al-Fatihah, which you already recite every day.",
    },
    apply: {
      te: "ఆచరణ: సూరా అల్-ఫాతిహాలోని ప్రతి పదానికి అర్థాన్ని ఈ వారం రాసుకోండి.",
      en: "Apply it: write out the meaning of every word in Surah al-Fatihah this week.",
    },
    reading: [
      { label: "Roots and vocabulary", url: "/knowledge-center/learn-arabic/vocabulary" },
      { label: "Quranic Arabic", url: "/knowledge-center/learn-arabic/quranic" },
    ],
  },

  {
    slug: "daily-quran",
    portal: "learn-quran",
    title: {
      te: "స్థాయి 8 — రోజువారీ అలవాటు",
      en: "Level 8 — A daily habit",
    },
    intro: {
      te: "ఖురాన్‌తో సంబంధం ఒక పెద్ద నిర్ణయంతో ఏర్పడదు — చిన్న, పునరావృత అలవాటుతో ఏర్పడుతుంది. ఈ పాఠం ఆ అలవాటును ఎలా నిర్మించాలో, ఎందుకు చాలామందిది విఫలమవుతుందో చెబుతుంది.",
      en: "A relationship with the Quran is not built by one large decision but by a small, repeated habit. This lesson is about how to build it and why most attempts fail.",
    },
    sections: [
      {
        heading: { te: "ఎందుకు రమజాన్ తర్వాత ఆగిపోతుంది", en: "Why it stops after Ramadan" },
        body: {
          te: "ఇది తెలిసిన నమూనా: రమజాన్‌లో రోజుకు ఒక జుజ్, షవ్వాల్‌లో ఏమీ లేదు. కారణం లక్ష్యం చాలా పెద్దది కావడం. రోజుకు ఇరవై పేజీలు రమజాన్ లయలో సాధ్యం; సాధారణ ఉద్యోగ రోజులో కాదు. మొదటి రోజు తప్పిపోతుంది, తర్వాత అపరాధ భావన వస్తుంది, తర్వాత పూర్తిగా వదిలేస్తారు. పరిష్కారం: మీరు అత్యంత బిజీగా ఉన్న రోజున కూడా చేయగలిగే లక్ష్యం పెట్టుకోండి. ఒక పేజీ. లేదా ఐదు ఆయతులు. చిన్నది మరియు నిలిచేది, పెద్దది మరియు ఆగిపోయేదాని కంటే మేలు.",
          en: "It is a familiar pattern: a juz a day in Ramadan and nothing in Shawwal. The cause is a target set too high. Twenty pages a day works in the rhythm of Ramadan and not on an ordinary working day. One day gets missed, then guilt follows, then it stops entirely. The remedy is to set a target you could meet on your busiest day. One page. Or five verses. Small and sustained beats large and abandoned.",
        },
        check: {
          question: { te: "రమజాన్ తర్వాత అలవాటు ఎందుకు ఆగిపోతుంది?", en: "Why does the habit stop after Ramadan?" },
          options: [
            { te: "లక్ష్యం సాధారణ రోజుకు చాలా పెద్దది", en: "The target is too large for an ordinary day" },
            { te: "ఖురాన్ కష్టం కాబట్టి", en: "Because the Quran is difficult" },
            { te: "షవ్వాల్‌లో నిషేధం ఉంది", en: "Because it is discouraged in Shawwal" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఉన్న అలవాటుకు జతచేయండి", en: "Attach it to a habit you already have" },
        body: {
          te: "కొత్త అలవాటు దానంతట అది నిలవదు; అది ఇప్పటికే ఉన్న దానికి అతుక్కోవాలి. మీకు ఇప్పటికే రోజుకు ఐదు స్థిరమైన క్షణాలు ఉన్నాయి — ఐదు నమాజులు. ఫజ్ర్ తర్వాత కూర్చుని ఒక పేజీ. లేదా మఘ్రిబ్ తర్వాత. లేదా పడుకునే ముందు సూరా అల్-ముల్క్. 'ఎప్పుడైనా' అనేది 'ఎప్పుడూ కాదు' అవుతుంది; 'ఫజ్ర్ తర్వాత, ముస్‌హఫ్ ఇక్కడే ఉంటుంది' అనేది జరుగుతుంది. ముస్‌హఫ్‌ను మీరు కూర్చునే చోటే ఉంచండి — దాన్ని వెతకవలసి వస్తే మీరు వెతకరు.",
          en: "A new habit does not stand on its own; it has to attach to one that already exists. You already have five fixed points in the day. Sit after Fajr and read a page. Or after Maghrib. Or Surah al-Mulk before sleeping. Sometime becomes never, while after Fajr, with the mushaf already there actually happens. Keep the mushaf where you sit, because if you have to go and find it you will not.",
        },
      },
      {
        heading: { te: "రెండు భాషలు కలిపి", en: "Both languages together" },
        body: {
          te: "ఒక ఆచరణాత్మక పద్ధతి: ఒక ఆయత్ అరబిక్‌లో చదవండి, తర్వాత వెంటనే దాని అనువాదం. తర్వాతి ఆయత్. ఇది రెండు పనులను ఒకేసారి చేస్తుంది — పఠనం, అర్థం. ఇది నెమ్మదిగా అనిపిస్తుంది, మరియు అదే ఉద్దేశం. అనువాదం మాత్రమే చదివితే అరబిక్‌తో సంబంధం ఏర్పడదు; అరబిక్ మాత్రమే చదివితే మీరు ఏమి చదువుతున్నారో తెలియదు. రెండూ కలిపి చదవడం రెండింటినీ నిర్మిస్తుంది.",
          en: "A practical method: read one verse in Arabic, then its translation immediately, then the next verse. This does two things at once, recitation and meaning. It feels slow, which is the point. Reading only the translation builds no connection to the Arabic; reading only the Arabic leaves you not knowing what you read. Doing both together builds both.",
        },
        check: {
          question: { te: "సూచించబడిన పద్ధతి ఏమిటి?", en: "What method does the lesson suggest?" },
          options: [
            { te: "ఒక ఆయత్ అరబిక్, తర్వాత దాని అనువాదం", en: "One verse in Arabic, then its translation" },
            { te: "మొత్తం అరబిక్, తర్వాత మొత్తం అనువాదం", en: "All the Arabic, then all the translation" },
            { te: "అనువాదం మాత్రమే", en: "The translation only" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అరవై సెకన్ల తదబ్బుర్", en: "Sixty seconds of reflection" },
        body: {
          te: "చదవడం పూర్తయిన తర్వాత ముస్‌హఫ్ మూసివేసి ఒక నిమిషం ఆగండి. ఒకే ప్రశ్న అడగండి: 'ఈ రోజు అల్లాహ్ నా నుండి ఏమి కోరుతున్నాడు?' ఇదే తదబ్బుర్. ఖురాన్ దీన్నే ఆదేశిస్తుంది: 'ఒక ఆశీర్వదించబడిన గ్రంథం, దీన్ని మేము నీపై అవతరింపజేశాము — వారు దీని ఆయతులపై ఆలోచించడానికి' (సాద్ 38:29). ఇది ఒక్క నిమిషమే, కానీ ఇదే చదవడాన్ని ఆచరణగా మార్చే మెట్టు. దీన్ని దాటవేస్తే మీరు పేజీలు తిప్పుతున్నారు, ఖురాన్ చదవడం లేదు.",
          en: "When you finish, close the mushaf and sit for a minute with one question: what is Allah asking of me today? That is tadabbur, and the Quran commands it: 'A blessed Book which We have revealed to you, that they might reflect upon its verses' (Sad 38:29). It takes a minute, and it is the step that turns reading into practice. Skip it and you are turning pages rather than reading the Quran.",
        },
      },
      {
        heading: { te: "అలవాటు తెగిపోతే", en: "When the habit breaks" },
        body: {
          te: "అది తెగిపోతుంది. ప్రయాణం, అనారోగ్యం, పరీక్షలు, ఒత్తిడి — ఏదో ఒకటి. ముఖ్యమైనది ఏమి జరిగిందో కాదు, తర్వాత ఏమి చేస్తారో. చాలామంది ఒక వారం తప్పితే మొత్తం వదిలేస్తారు — 'నేను ఎలాగూ నిలబెట్టుకోలేను' అని. అది తప్పు ముగింపు. తెగిన అలవాటును తిరిగి మొదలుపెట్టడం, కొత్తగా మొదలుపెట్టడం కంటే సులభం. ఒక్క ఆయత్ చదవండి. అది సరిపోతుంది; అలవాటు తిరిగి బతికింది.",
          en: "It will break. Travel, illness, exams, pressure, something. What matters is not that it broke but what you do next. Most people miss a week and abandon it entirely, concluding they cannot keep it up. That is the wrong conclusion. Restarting a broken habit is easier than starting a new one. Read one verse. That is enough; the habit is alive again.",
        },
      },
    ],
    takeaways: [
      { te: "మీ అత్యంత బిజీ రోజున కూడా చేయగలిగే లక్ష్యం పెట్టుకోండి.", en: "Set a target you could meet on your busiest day." },
      { te: "ఇప్పటికే ఉన్న అలవాటుకు జతచేయండి — ఒక నమాజ్ తర్వాత.", en: "Attach it to a habit you already have, such as after one prayer." },
      { te: "ఒక ఆయత్ అరబిక్, తర్వాత అనువాదం; చివర ఒక నిమిషం ఆలోచన.", en: "One verse in Arabic then its translation, and a minute of reflection at the end." },
    ],
    didYouKnow: [
      { te: "రోజుకు నాలుగు పేజీలు చదివితే ఏడాదిలో ఖురాన్ ఒకసారి పూర్తవుతుంది.", en: "Four pages a day completes the Quran once in a year." },
      { te: "ప్రవక్త ﷺ చెప్పారు: ఖురాన్‌లోని ఒక్క అక్షరానికి ఒక మంచి పని ప్రతిఫలం, మరియు ప్రతి మంచి పని పదింతలు (తిర్మిజీ).", en: "The Prophet ﷺ said one letter of the Quran earns a good deed, and each good deed is multiplied tenfold (Tirmidhi)." },
    ],
    reflect: [
      { te: "మీరు రేపు ఏ నమాజ్ తర్వాత ఐదు నిమిషాలు కూర్చోగలరు? ముస్‌హఫ్ ఇప్పుడే అక్కడ పెట్టండి.", en: "After which prayer could you sit for five minutes tomorrow? Put the mushaf there now." },
    ],
    mistakes: [
      { te: "రమజాన్ లయను సాధారణ రోజుల్లో కొనసాగించాలని అనుకోవడం.", en: "Expecting the Ramadan rhythm to continue on ordinary days." },
      { te: "ఒక వారం తప్పితే పూర్తిగా వదిలేయడం.", en: "Abandoning it entirely after missing a week." },
      { te: "ఎన్ని పేజీలు పూర్తయ్యాయో లెక్కపెట్టడం, ఏమి అర్థమైందో కాదు.", en: "Counting pages completed rather than what was understood." },
    ],
    faqs: [
      {
        question: { te: "అరబిక్ చదవడం రాకపోతే?", en: "What if I cannot read Arabic yet?" },
        answer: {
          te: "అనువాదం చదవడంతో మొదలుపెట్టండి — ఇది విలువైనది, వాయిదా వేయవద్దు. సమాంతరంగా ఖాయిదా మొదలుపెట్టండి. రెండు పనులు ఒకేసారి: ఈ రోజు నుండి అర్థం, కొన్ని నెలల్లో పఠనం.",
          en: "Start with the translation; that is valuable in itself and should not wait. Begin a qaida alongside it. Two things at once: meaning from today, recitation within a few months.",
        },
      },
      {
        question: { te: "ఏ సమయం ఉత్తమం?", en: "Which time is best?" },
        answer: {
          te: "ఫజ్ర్ తర్వాతి సమయాన్ని ఖురాన్ ప్రత్యేకంగా ప్రస్తావిస్తుంది: 'ఫజ్ర్ ఖురాన్ — నిశ్చయంగా ఫజ్ర్ ఖురాన్ సాక్ష్యం చెప్పబడేది' (అల్-ఇస్రా 17:78). కానీ మీరు నిజంగా నిలబెట్టుకోగలిగే సమయమే మీకు ఉత్తమం. ఉత్తమ సమయంలో చేయని అలవాటు కంటే, సాధారణ సమయంలో చేసే అలవాటు మేలు.",
          en: "The Quran singles out the time after Fajr: 'and the recitation at dawn, for the recitation at dawn is witnessed' (Al-Isra 17:78). But the best time is the one you will actually keep. A habit kept at an ordinary hour beats one abandoned at the best hour.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "రోజుకు ఎన్ని పేజీలు చదివితే ఏడాదిలో పూర్తవుతుంది?", en: "How many pages a day completes the Quran in a year?" },
        options: [
          { te: "నాలుగు", en: "Four" },
          { te: "ఇరవై", en: "Twenty" },
          { te: "ఒకటి", en: "One" },
        ],
        answer: 0,
      },
      {
        question: { te: "అలవాటు తెగిపోతే ఏమి చేయాలి?", en: "What should you do when the habit breaks?" },
        options: [
          { te: "ఒక్క ఆయత్ చదివి తిరిగి మొదలుపెట్టాలి", en: "Read one verse and start again" },
          { te: "వచ్చే రమజాన్ వరకు ఆగాలి", en: "Wait until next Ramadan" },
          { te: "పూర్తిగా వదిలేయాలి", en: "Give it up" },
        ],
        answer: 0,
      },
      {
        question: { te: "'తదబ్బుర్' ఎప్పుడు చేయాలి?", en: "When is tadabbur done?" },
        options: [
          { te: "చదవడం పూర్తయిన తర్వాత ఒక నిమిషం", en: "For a minute after finishing" },
          { te: "చదవడానికి ముందు మాత్రమే", en: "Only before reading" },
          { te: "ఎప్పుడూ అవసరం లేదు", en: "It is never needed" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "చిన్నది + నిలిచేది > పెద్దది + ఆగిపోయేది.", en: "Small and sustained beats large and abandoned." },
      { te: "ఒక నమాజ్‌కు జతచేయండి; ముస్‌హఫ్ అక్కడే ఉంచండి.", en: "Attach it to a prayer and keep the mushaf there." },
      { te: "ఆయత్ → అనువాదం → ఒక నిమిషం ఆలోచన.", en: "Verse, translation, one minute of reflection." },
    ],
    summary: {
      te: "అలవాటు విఫలమవుతుంది ఎందుకంటే లక్ష్యం చాలా పెద్దది. మీ బిజీ రోజున కూడా చేయగలిగేది ఎంచుకుని, దాన్ని ఒక నమాజ్‌కు జతచేయండి. ఒక ఆయత్ అరబిక్, తర్వాత అనువాదం, చివర ఒక నిమిషం ఆలోచన. తెగిపోతే ఒక్క ఆయతుతో తిరిగి మొదలుపెట్టండి.",
      en: "The habit fails because the target is too large. Choose something you could do on your busiest day and attach it to a prayer. One verse in Arabic, then its translation, then a minute of reflection. If it breaks, restart with a single verse.",
    },
    apply: {
      te: "ఆచరణ: ఇప్పుడే ముస్‌హఫ్‌ను మీరు నమాజ్ తర్వాత కూర్చునే చోట పెట్టండి.",
      en: "Apply it: put the mushaf now where you sit after prayer.",
    },
    reading: [
      { label: "Learn Quran portal", url: "/knowledge-center/learn-quran" },
      { label: "Living with the Quran", url: "/knowledge-center/learn-quran/adab" },
    ],
  },
];
