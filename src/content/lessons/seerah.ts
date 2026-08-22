/* Seerah — replacements for levels 1 to 4 of the extracted lessons.

   The extracted versions had a median of 179 English words. Same slugs, so
   all-lessons.ts substitutes them in place.

   These lean on the human detail and the lesson rather than the bare
   chronology, which islamic-history/prophet already covers. */
import type { Lesson } from "../lessons.ts";

export const seerahLessons: Lesson[] = [
  {
    slug: "before-prophethood",
    portal: "seerah",
    title: {
      te: "స్థాయి 1 — ప్రవక్తత్వానికి ముందు",
      en: "Level 1 — Before prophethood",
    },
    intro: {
      te: "నలభై సంవత్సరాలు — ఒక అనాథ బాలుడు, ఒక గొర్రెల కాపరి, ఒక వ్యాపారి. వహీ రావడానికి ముందు ఆ జీవితం ఎలా ఉందో తెలుసుకోవడం ముఖ్యం, ఎందుకంటే ఆ నలభై ఏళ్ళే ఆయన సందేశానికి బలమైన సాక్ష్యం.",
      en: "Forty years: an orphaned boy, a shepherd, a trader. Knowing what that life was like before the revelation matters, because those forty years are the strongest evidence for the message that followed.",
    },
    sections: [
      {
        heading: { te: "అనాథత్వం అనుకోకుండా జరిగినది కాదు", en: "The orphanhood was not incidental" },
        body: {
          te: "తండ్రి అబ్దుల్లాహ్ పుట్టుకకు ముందే మరణించారు. తల్లి ఆమినా ఆరేళ్ళప్పుడు. తాత అబ్దుల్-ముత్తలిబ్ ఎనిమిదేళ్ళప్పుడు. ఎనిమిదేళ్ళలో మూడు నష్టాలు. ఖురాన్ దీన్ని ప్రత్యేకంగా ప్రస్తావిస్తుంది: 'ఆయన నిన్ను అనాథగా చూసి ఆశ్రయం ఇవ్వలేదా?' (అద్-దుహా 93:6). తర్వాత అదే సూరాలో ఆదేశం వస్తుంది: 'కాబట్టి అనాథను కఠినంగా చూడవద్దు' (93:9). ఆయన అనుభవం ఆయన బోధనకు నేరుగా ముడిపడింది. అనాథల పట్ల ఇస్లాం చూపే శ్రద్ధ సిద్ధాంతం కాదు — అది జీవించబడినది.",
          en: "His father Abdullah died before his birth, his mother Aminah when he was six, his grandfather Abd al-Muttalib when he was eight. Three losses in eight years. The Quran names it: 'Did He not find you an orphan and give you shelter?' (Ad-Duha 93:6). Then, in the same surah, the instruction: 'So do not treat the orphan harshly' (93:9). His experience is tied directly to his teaching. Islam's care for orphans is not theory but something lived.",
        },
        check: {
          question: { te: "ఖురాన్ 93:6 దేన్ని ప్రస్తావిస్తుంది?", en: "What does Quran 93:6 refer to?" },
          options: [
            { te: "ఆయన అనాథత్వాన్ని", en: "His orphanhood" },
            { te: "ఆయన వ్యాపారాన్ని", en: "His trade" },
            { te: "ఆయన వివాహాన్ని", en: "His marriage" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "గొర్రెల కాపరి — అందరు ప్రవక్తల లాగే", en: "A shepherd, as every prophet was" },
        body: {
          te: "ప్రవక్త ﷺ అన్నారు: 'అల్లాహ్ పంపిన ప్రతి ప్రవక్తా గొర్రెలను కాశారు'. సహచరులు 'మీరు కూడానా?' అని అడిగితే ఆయన 'అవును, నేను కొన్ని ఖీరాత్‌లకు మక్కావాసుల గొర్రెలను కాశాను' అన్నారు (బుఖారీ). ఇది యాదృచ్ఛికం కాదని పండితులు అంటారు. గొర్రెల మంద నాయకత్వాన్ని నేర్పుతుంది — ఓర్పు, నిరంతర శ్రద్ధ, బలహీనమైనదాన్ని వెతకడం, మంద చెదిరిపోకుండా చూడటం, మరియు మీ శ్రమకు కృతజ్ఞత చెప్పని జీవులను చూసుకోవడం. ఒక సమాజాన్ని నడపడానికి ముందు ఒక మందను నడపడం.",
          en: "The Prophet ﷺ said that every prophet Allah sent had herded sheep. Asked whether he had too, he said yes, he had herded the sheep of the people of Makkah for a few qirat (Bukhari). Scholars hold this is not incidental. A flock teaches leadership: patience, unbroken attention, going after the weak one, keeping the group from scattering, and caring for creatures that will never thank you. Running a flock before running a community.",
        },
      },
      {
        heading: { te: "అల్-అమీన్ — శత్రువులు కూడా ఒప్పుకున్నది", en: "Al-Ameen, which even his enemies granted" },
        body: {
          te: "మక్కా మొత్తం ఆయనను 'అల్-అమీన్' — విశ్వసనీయుడు — అని పిలిచేది. ఇది ముఖ్యం, ఎందుకంటే తర్వాత ఆయనను వ్యతిరేకించినవారు ఆయనను అబద్ధాలకోరు అని ఎప్పుడూ ఆరోపించలేకపోయారు. ఒక సందర్భం దీన్ని చూపుతుంది: ఆయన సఫా కొండపై నిలబడి 'ఈ కొండ వెనుక సైన్యం ఉందని చెబితే నమ్ముతారా?' అని అడిగితే వారు 'అవును, నీవు ఎప్పుడూ అబద్ధం చెప్పలేదు' అన్నారు (బుఖారీ). వారు సందేశాన్ని తిరస్కరించారు, కానీ సందేశహరుడి నిజాయితీని కాదు. మరో వివరం: మక్కా వదిలి వెళ్ళేటప్పుడు ఆయన అలీ (ర/అ)ను వదిలివెళ్ళారు — ఎందుకంటే ఆయన శత్రువుల అమానతులు ఆయన వద్ద ఉన్నాయి, వాటిని తిరిగి ఇవ్వడానికి.",
          en: "All Makkah called him al-Ameen, the trustworthy. That matters because those who later opposed him could never accuse him of lying. One moment shows it: standing on Safa he asked whether they would believe him if he said an army lay behind the hill, and they answered yes, you have never lied to us (Bukhari). They rejected the message, not the honesty of the messenger. And a detail worth holding: when he left Makkah he left Ali (RA) behind, because his enemies' deposits were still in his keeping and had to be returned.",
        },
        check: {
          question: { te: "మక్కా వదిలేటప్పుడు అలీ (ర/అ)ను ఎందుకు వదిలివెళ్ళారు?", en: "Why was Ali (RA) left behind when he departed Makkah?" },
          options: [
            { te: "శత్రువుల అమానతులను తిరిగి ఇవ్వడానికి", en: "To return his enemies' deposits" },
            { te: "మక్కాను పాలించడానికి", en: "To govern Makkah" },
            { te: "కాబాను కాపాడటానికి", en: "To guard the Kaaba" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఖదీజా (ర/అ) — ప్రతిపాదన ఆమె నుండి", en: "Khadijah (RA), and who proposed to whom" },
        body: {
          te: "ఖదీజా (ర/అ) ఒక విజయవంతమైన వ్యాపారి — స్వతంత్రంగా వాణిజ్య కారవాన్‌లను నడిపేవారు. ఆమె ఆయనను వ్యాపార పనిలో నియమించి, ఆయన నిజాయితీ, స్వభావం చూసి, స్వయంగా వివాహ ప్రతిపాదన పంపారు. ఆమెకు అప్పుడు నలభై, ఆయనకు ఇరవై ఐదు. ఇది ఇస్లాంకు ముందటి అరేబియా గురించి ఒక వాస్తవాన్ని చూపుతుంది, మరియు ఒక ముఖ్యమైన విషయాన్ని కూడా: ఆమె జీవించి ఉన్నంతకాలం ఆయన మరో వివాహం చేసుకోలేదు — ఇరవై ఐదు సంవత్సరాలు. ఆమె మరణించిన ఏళ్ళ తర్వాత కూడా ఆమె స్నేహితులకు ఆయన బహుమతులు పంపేవారు.",
          en: "Khadijah (RA) was a successful merchant running her own caravans. She employed him, observed his honesty and character, and sent the proposal of marriage herself. She was forty and he twenty-five. That says something about pre-Islamic Arabia, and something else worth noting: he took no other wife while she lived, for twenty-five years. Years after her death he was still sending gifts to her friends.",
        },
      },
    ],
    takeaways: [
      { te: "ఎనిమిదేళ్ళలో మూడు నష్టాలు; ఖురాన్ దాన్ని అనాథల పట్ల ఆదేశంతో ముడిపెడుతుంది.", en: "Three losses in eight years, which the Quran ties to its instruction about orphans." },
      { te: "శత్రువులు కూడా ఆయన నిజాయితీని ఎప్పుడూ ప్రశ్నించలేదు.", en: "Even his opponents never questioned his honesty." },
      { te: "ఖదీజా (ర/అ) స్వయంగా వివాహ ప్రతిపాదన పంపారు.", en: "Khadijah (RA) sent the proposal herself." },
    ],
    didYouKnow: [
      { te: "కాబా పునర్నిర్మాణ సమయంలో నల్లరాయిని ఎవరు పెట్టాలనే వివాదాన్ని ఆయన ఒక వస్త్రంపై రాయిని ఉంచి, అన్ని గోత్రాల నాయకులు కలిసి ఎత్తేలా చేసి పరిష్కరించారు.", en: "When the tribes disputed who would place the black stone during the Kaaba's rebuilding, he settled it by laying it on a cloth and having every chief lift it together." },
      { te: "'హిల్ఫ్ అల్-ఫుదూల్' అనే అణచివేయబడినవారి కోసం ఏర్పడిన ఒప్పందంలో ఆయన యువకుడిగా పాల్గొన్నారు, మరియు ఇస్లాం తర్వాత కూడా దాన్ని ప్రశంసించారు.", en: "As a young man he joined the Hilf al-Fudul, a pact to defend the wronged, and praised it even after Islam." },
    ],
    reflect: [
      { te: "శత్రువులు కూడా మిమ్మల్ని నిజాయితీపరుడని చెప్పగలరా? అదే ఆయన ప్రచారానికి పునాది.", en: "Could your opponents call you honest? That was the foundation his message stood on." },
    ],
    mistakes: [
      { te: "వహీకి ముందటి నలభై ఏళ్ళను అప్రధానంగా భావించడం — అవే ఆయన సందేశానికి సాక్ష్యం.", en: "Treating the forty years before revelation as unimportant, when they are the evidence for the message." },
      { te: "ఆ కాలంలో ఆయన ఏదో బోధిస్తున్నారని అనుకోవడం — ఆయన ఏమీ చెప్పలేదు.", en: "Assuming he was teaching something in that period, when he said nothing at all." },
    ],
    faqs: [
      {
        question: { te: "ప్రవక్త ﷺ చదవడం, రాయడం నేర్చుకున్నారా?", en: "Could the Prophet ﷺ read and write?" },
        answer: {
          te: "లేదు — ఖురాన్ ఆయనను 'ఉమ్మీ' అని వర్ణిస్తుంది (అల్-ఆరాఫ్ 7:157). ఇది ఒక వాదనలో భాగం: చదవని, రాయని వ్యక్తి నుండి ఇలాంటి గ్రంథం రావడం ఆయన స్వయంగా రచించలేదని చూపుతుంది. అందుకే మొదటి వహీ 'ఇఖ్రా' — చదువు — అనే మాటతో మొదలవడం మరింత అర్థవంతం.",
          en: "No; the Quran describes him as ummi (Al-A'raf 7:157). That is part of an argument: a text of this kind coming from someone who neither read nor wrote points away from his having composed it. Which makes it all the more striking that the first revelation was iqra, read.",
        },
      },
      {
        question: { te: "ఆయన విగ్రహాలను ఎప్పుడైనా ఆరాధించారా?", en: "Did he ever worship idols?" },
        answer: {
          te: "లేదు. ఉల్లేఖనలు స్పష్టం: ఆయన జీవితంలో ఎప్పుడూ విగ్రహారాధనలో పాల్గొనలేదు, ఆ ఉత్సవాలకు వెళ్ళలేదు. విగ్రహాలతో నిండిన సమాజంలో పెరిగినా ఆయన వాటి నుండి దూరంగా ఉండటం ఆయన సమకాలీనులకు తెలిసిన విషయం.",
          en: "No. The narrations are clear that he never took part in idol worship or its festivals. Growing up in a society full of idols and keeping away from them was something his contemporaries knew about him.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "మక్కావాసులు ఆయనను ఏమని పిలిచేవారు?", en: "What did the people of Makkah call him?" },
        options: [
          { te: "అల్-అమీన్", en: "Al-Ameen" },
          { te: "అల్-ఖాతిబ్", en: "Al-Katib" },
          { te: "అల్-మలిక్", en: "Al-Malik" },
        ],
        answer: 0,
      },
      {
        question: { te: "ఖదీజా (ర/అ)తో వివాహ ప్రతిపాదన ఎవరు పంపారు?", en: "Who sent the proposal of marriage?" },
        options: [
          { te: "ఖదీజా (ర/అ) స్వయంగా", en: "Khadijah (RA) herself" },
          { te: "అబూ తాలిబ్", en: "Abu Talib" },
          { te: "ఖురైష్ నాయకులు", en: "The leaders of Quraysh" },
        ],
        answer: 0,
      },
      {
        question: { te: "ప్రవక్తలందరూ ఏమి చేశారని ప్రవక్త ﷺ చెప్పారు?", en: "What did the Prophet ﷺ say every prophet had done?" },
        options: [
          { te: "గొర్రెలను కాశారు", en: "Herded sheep" },
          { te: "వ్యాపారం చేశారు", en: "Traded" },
          { te: "రాజ్యాలను పాలించారు", en: "Ruled kingdoms" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "570 జననం · 6 ఏళ్ళకు తల్లి · 8 ఏళ్ళకు తాత · 25 ఏళ్ళకు వివాహం.", en: "Born 570, mother at six, grandfather at eight, married at twenty-five." },
      { te: "అల్-అమీన్ — శత్రువులు కూడా ఒప్పుకున్నది.", en: "Al-Ameen, granted even by opponents." },
      { te: "ఖురాన్ 93:6 మరియు 93:9 — అనుభవం, ఆదేశం.", en: "Quran 93:6 and 93:9: the experience and the instruction." },
    ],
    summary: {
      te: "వహీకి ముందటి నలభై ఏళ్ళు ఆయనను సిద్ధం చేశాయి: అనాథత్వం, గొర్రెల కాపరి పని, వ్యాపారంలో నిజాయితీ. మక్కా మొత్తం ఆయనను అల్-అమీన్ అని పిలిచేది, మరియు ఆయన శత్రువులు కూడా ఆ నిజాయితీని ప్రశ్నించలేదు.",
      en: "The forty years before revelation prepared him: orphanhood, herding, honesty in trade. All Makkah called him al-Ameen, and even his opponents never questioned it.",
    },
    apply: {
      te: "ఆచరణ: సూరా అద్-దుహా చదివి, అందులో ఆయన జీవితం ఎలా ప్రతిబింబిస్తుందో గమనించండి.",
      en: "Apply it: read Surah ad-Duha and notice how his own life is reflected in it.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "Beginning of revelation", url: "/knowledge-center/seerah/beginning-of-revelation" },
    ],
  },

  {
    slug: "beginning-of-revelation",
    portal: "seerah",
    title: {
      te: "స్థాయి 2 — వహీ ఆరంభం",
      en: "Level 2 — The beginning of revelation",
    },
    intro: {
      te: "హిరా గుహలో జరిగినది ఒక ఉన్నత అనుభవం కాదు — అది భయపెట్టేది. ఆ ప్రతిస్పందన, ఆ తర్వాత జరిగినది ఆ సంఘటన నిజమని చెప్పే బలమైన సాక్ష్యాలలో ఒకటి.",
      en: "What happened in the cave of Hira was not an exalted experience but a terrifying one. That reaction, and what followed it, is among the strongest indications that the event was real.",
    },
    sections: [
      {
        heading: { te: "'ఇఖ్రా' — మొదటి పదం", en: "Iqra, the first word" },
        body: {
          te: "నలభైవ ఏట, రమదాన్‌లో, హిరా గుహలో ఏకాంతంగా ఉన్నప్పుడు జిబ్రయీల్ (అ) వచ్చి 'ఇఖ్రా' — చదువు — అన్నారు. ఆయన 'నాకు చదవడం రాదు' అన్నారు. దూత ఆయనను గట్టిగా కౌగిలించుకుని వదిలి మళ్ళీ అడిగారు. ఇది మూడుసార్లు జరిగింది. తర్వాత మొదటి ఐదు ఆయతులు వచ్చాయి: 'చదువు, సృష్టించిన నీ ప్రభువు పేరుతో...' (అల్-అలఖ్ 96:1-5). ఒక మతం మొదలయ్యే మొదటి పదం 'చదువు' కావడం, మరియు ఆ మతం సందేశహరుడు చదవలేకపోవడం — ఇది గమనించదగినది.",
          en: "In his fortieth year, in Ramadan, alone in the cave of Hira, Jibreel came and said iqra, read. He answered that he could not read. The angel pressed him hard, released him and asked again. Three times. Then came the first five verses: 'Read, in the name of your Lord who created' (Al-Alaq 96:1-5). That a faith begins with the word read, and that its messenger could not, is worth stopping on.",
        },
        check: {
          question: { te: "మొదటి వహీలో మొదటి పదం ఏమిటి?", en: "What was the first word of the revelation?" },
          options: [
            { te: "ఇఖ్రా — చదువు", en: "Iqra, read" },
            { te: "ఖుల్ — చెప్పు", en: "Qul, say" },
            { te: "బిస్మిల్లాహ్", en: "Bismillah" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఆయన ప్రతిస్పందన — వణుకు", en: "His reaction was to tremble" },
        body: {
          te: "ఆయన సంతోషంగా కిందికి పరుగెత్తలేదు. వణుకుతూ ఇంటికి వచ్చి 'నన్ను కప్పండి, నన్ను కప్పండి' అన్నారు, మరియు 'నా ప్రాణానికి భయపడ్డాను' అన్నారు (బుఖారీ). ఇది ముఖ్యమైన వివరం. ఎవరైనా ప్రవక్తత్వాన్ని కల్పించాలనుకుంటే, తమను తాము ధైర్యంగా, స్థిరంగా చిత్రించుకుంటారు — వణుకుతూ, భయపడుతూ, భార్య వద్దకు పరుగెత్తుతున్నట్లు కాదు. ఈ కథలోని బలహీనతే దాని విశ్వసనీయతకు కారణం.",
          en: "He did not run down the mountain elated. He came home trembling, saying cover me, cover me, and saying he had feared for himself (Bukhari). That detail matters. Someone inventing a claim to prophethood portrays himself as brave and composed, not shaking and running to his wife. The vulnerability in the account is what makes it credible.",
        },
        check: {
          question: { te: "మొదటి వహీ తర్వాత ఆయన ప్రతిస్పందన ఏమిటి?", en: "What was his reaction after the first revelation?" },
          options: [
            { te: "వణుకుతూ ఇంటికి వచ్చారు", en: "He came home trembling" },
            { te: "వెంటనే బహిరంగంగా ప్రకటించారు", en: "He announced it publicly at once" },
            { te: "ఏమీ చెప్పలేదు", en: "He said nothing to anyone" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "ఖదీజా (ర/అ) సమాధానం", en: "What Khadijah (RA) said" },
        body: {
          te: "ఆమె ఆయనను ప్రశ్నించలేదు, పరీక్షించలేదు. ఆమె అన్నారు: 'ఎప్పటికీ కాదు! అల్లాహ్ నిన్ను ఎప్పుడూ అవమానించడు. నీవు బంధువులతో సంబంధాలు కలుపుతావు, భారాన్ని మోస్తావు, పేదవారికి సంపాదించి పెడతావు, అతిథులను గౌరవిస్తావు, ఆపదలో ఉన్నవారికి సహాయపడతావు' (బుఖారీ). ఆమె వాదన గమనించండి: ఆయన స్వభావమే ఆయన సాక్ష్యం. ఇలాంటి జీవితం గడిపిన వ్యక్తిని అల్లాహ్ వదిలివేయడు. తర్వాత ఆమె ఆయనను వరఖా బిన్ నౌఫల్ వద్దకు తీసుకువెళ్ళారు — ఆయన మునుపటి గ్రంథాలు తెలిసిన వృద్ధుడు — మరియు వరఖా అది మూసా (అ)కు వచ్చిన అదే దూత అని చెప్పారు.",
          en: "She did not question him or test him. She said: never, Allah will never disgrace you. You keep ties of kinship, you carry the burdened, you earn for the poor, you honour the guest and you help those struck by calamity (Bukhari). Notice the shape of her argument: his character is the evidence. Allah does not abandon a man who has lived like that. She then took him to Waraqah ibn Nawfal, an old man who knew the earlier scriptures, and Waraqah said it was the same angel who came to Musa.",
        },
      },
      {
        heading: { te: "విరామం — వహీ ఆగిపోయినప్పుడు", en: "The pause, when revelation stopped" },
        body: {
          te: "మొదటి వహీ తర్వాత వహీ కొంతకాలం ఆగిపోయింది. దీన్ని 'ఫత్రతుల్ వహీ' అంటారు. ఆ కాలంలో ఆయన తీవ్రమైన దుఃఖంలో ఉన్నారని ఉల్లేఖనలు చెబుతాయి — తాను తిరస్కరించబడ్డానేమో అని. ఆ విరామం ముగిసిన తర్వాత వచ్చిన సూరాలలో ఒకటి అద్-దుహా: 'నీ ప్రభువు నిన్ను వదిలివేయలేదు, ద్వేషించలేదు' (93:3). ఇది ఒక పాఠాన్ని ఇస్తుంది: అల్లాహ్ నుండి దూరమైనట్లు అనిపించే కాలాలు ప్రవక్త ﷺ జీవితంలోనూ ఉన్నాయి. ఆ అనుభూతి తిరస్కరణకు సాక్ష్యం కాదు.",
          en: "After the first revelation it stopped for a time, a period called the fatrah. Narrations describe him in deep distress during it, fearing he had been rejected. Among the surahs that came when it resumed is ad-Duha: 'Your Lord has not forsaken you, nor is He displeased' (93:3). There is a lesson in that. Periods that feel like distance from Allah occurred in the Prophet's own life, and the feeling is not evidence of rejection.",
        },
      },
    ],
    takeaways: [
      { te: "మొదటి పదం 'చదువు' — చదవలేని వ్యక్తికి.", en: "The first word was read, to a man who could not." },
      { te: "ఆయన ప్రతిస్పందన భయం — ఇదే ఆ కథ విశ్వసనీయతకు కారణం.", en: "His reaction was fear, which is what makes the account credible." },
      { te: "ఖదీజా (ర/అ) వాదన: ఆయన స్వభావమే సాక్ష్యం.", en: "Khadijah's (RA) argument was that his character was the evidence." },
    ],
    didYouKnow: [
      { te: "వరఖా బిన్ నౌఫల్ 'నేను ఆ రోజు వరకు బతికి ఉంటే నీకు సహాయం చేస్తాను' అన్నారు, కానీ కొద్దికాలంలోనే మరణించారు.", en: "Waraqah said he would help him if he lived to see that day, and died soon after." },
      { te: "హిరా గుహ చాలా చిన్నది — దానికి చేరుకోవడానికి కొండ ఎక్కడం నేటికీ కష్టం.", en: "The cave of Hira is very small, and climbing to it is still hard going today." },
    ],
    reflect: [
      { te: "ఖదీజా (ర/అ) ఆయన స్వభావాన్ని ఐదు విషయాలతో వర్ణించారు. వాటిలో ఎన్ని మీ గురించి ఎవరైనా చెప్పగలరు?", en: "Khadijah (RA) named five things about his character. How many could someone say of you?" },
    ],
    mistakes: [
      { te: "ఫత్రతుల్ వహీని విస్మరించడం — అది కష్ట కాలాల గురించి ఒక ముఖ్యమైన పాఠం.", en: "Skipping the fatrah, which carries an important lesson about difficult periods." },
    ],
    faqs: [
      {
        question: { te: "ఆయన మొదట తనకు జరిగినది వహీ అని ఎలా నిర్ధారించుకున్నారు?", en: "How did he come to be certain it was revelation?" },
        answer: {
          te: "వెంటనే కాదు. మొదట ఆయన భయపడ్డారు. ఖదీజా (ర/అ) ఓదార్పు, వరఖా ధృవీకరణ, తర్వాత వహీ కొనసాగడం — ఇవన్నీ కలిసి నిశ్చయాన్ని ఇచ్చాయి. ఈ క్రమం ముఖ్యం: సందేహం నుండి నిశ్చయానికి, ఒక్కసారిగా కాదు.",
          en: "Not immediately. At first he was afraid. Khadijah's reassurance, Waraqah's confirmation and then the continuation of revelation together brought certainty. That sequence matters: from doubt to certainty, rather than all at once.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "మొదటి వహీ ఏ సూరాలోనిది?", en: "The first revelation was from which surah?" },
        options: [
          { te: "అల్-అలఖ్", en: "Al-Alaq" },
          { te: "అల్-ఫాతిహా", en: "Al-Fatihah" },
          { te: "అద్-దుహా", en: "Ad-Duha" },
        ],
        answer: 0,
      },
      {
        question: { te: "వరఖా బిన్ నౌఫల్ ఏమి చెప్పారు?", en: "What did Waraqah ibn Nawfal say?" },
        options: [
          { te: "అది మూసా (అ)కు వచ్చిన అదే దూత", en: "It was the same angel who came to Musa" },
          { te: "అది ఒక కల", en: "It was a dream" },
          { te: "ఆయన అనారోగ్యంతో ఉన్నారు", en: "He was unwell" },
        ],
        answer: 0,
      },
      {
        question: { te: "'ఫత్రతుల్ వహీ' అంటే ఏమిటి?", en: "What was the fatrah?" },
        options: [
          { te: "వహీ ఆగిపోయిన కాలం", en: "The period when revelation paused" },
          { te: "మొదటి యుద్ధం", en: "The first battle" },
          { te: "మక్కా బహిష్కరణ", en: "The Makkan boycott" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "హిరా · 'ఇఖ్రా' · అల్-అలఖ్ 96:1-5.", en: "Hira, iqra, Al-Alaq 96:1-5." },
      { te: "వణుకు → ఖదీజా → వరఖా → నిశ్చయం.", en: "Trembling, then Khadijah, then Waraqah, then certainty." },
      { te: "ఫత్రతుల్ వహీ తర్వాత అద్-దుహా.", en: "Ad-Duha came after the fatrah." },
    ],
    summary: {
      te: "నలభైవ ఏట హిరా గుహలో 'ఇఖ్రా' అనే మొదటి పదంతో వహీ మొదలైంది. ఆయన ప్రతిస్పందన భయం — ఇదే కథ విశ్వసనీయతకు సాక్ష్యం. ఖదీజా (ర/అ) ఆయన స్వభావాన్నే సాక్ష్యంగా చూపారు. తర్వాత వహీ ఆగిన కాలం ఉంది, మరియు అద్-దుహా దానికి సమాధానం.",
      en: "Revelation began in the cave of Hira in his fortieth year with the word iqra. His reaction was fear, which is itself evidence for the account. Khadijah (RA) pointed to his character as the proof. A pause in revelation followed, and Surah ad-Duha was its answer.",
    },
    apply: {
      te: "ఆచరణ: సూరా అల్-అలఖ్ మొదటి ఐదు ఆయతులను అనువాదంతో చదవండి.",
      en: "Apply it: read the first five verses of Surah al-Alaq with the translation.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "The Makkah period", url: "/knowledge-center/seerah/the-makkah-period" },
    ],
  },

  {
    slug: "the-makkah-period",
    portal: "seerah",
    title: {
      te: "స్థాయి 3 — మక్కా కాలం",
      en: "Level 3 — The Makkan period",
    },
    intro: {
      te: "పదమూడు సంవత్సరాలు, ఒక్క యుద్ధమూ లేదు. ఈ కాలంలో ముస్లింలు హింసను ఎదుర్కొన్నారు కానీ ప్రతీకారం తీర్చుకోలేదు — ఇది ఇస్లాం చరిత్రలో అత్యంత విస్మరించబడిన భాగం.",
      en: "Thirteen years, and not one battle. In this period the Muslims endured persecution without retaliating, and it is the most overlooked stretch of Islamic history.",
    },
    sections: [
      {
        heading: { te: "మొదట అణచివేయబడినది బలహీనులే", en: "It was the weak who were crushed first" },
        body: {
          te: "గోత్రం ఉన్నవారికి కొంత రక్షణ ఉండేది. ప్రవక్త ﷺను బనూ హాషిం కాపాడింది. కానీ బానిసలకు, పేదవారికి, గోత్ర రక్షణ లేని విదేశీయులకు ఏమీ లేదు. బిలాల్ (ర/అ)ను ఎండలో వేడి ఇసుకపై పడుకోబెట్టి ఛాతీపై బండరాయి పెట్టేవారు; ఆయన 'అహద్, అహద్' — ఒక్కడే, ఒక్కడే — అంటూనే ఉండేవారు. సుమయ్యా (ర/అ), ఆమె భర్త యాసిర్ (ర/అ) ఇద్దరూ చంపబడ్డారు; సుమయ్యా (ర/అ) ఇస్లాం మొదటి అమరవీరురాలు. ఇది గమనించదగినది: మొదటి రక్తం ఒక వృద్ధ బానిస స్త్రీది.",
          en: "Those with a tribe had some protection; the Banu Hashim shielded the Prophet ﷺ. Slaves, the poor and foreigners without tribal backing had none. Bilal (RA) was laid on burning sand with a boulder on his chest and kept saying ahad, ahad, one, one. Sumayyah (RA) and her husband Yasir (RA) were both killed, and she was the first martyr in Islam. That is worth noticing: the first blood was that of an elderly enslaved woman.",
        },
        check: {
          question: { te: "ఇస్లాం మొదటి అమరవీరురాలు ఎవరు?", en: "Who was the first martyr in Islam?" },
          options: [
            { te: "సుమయ్యా (ర/అ)", en: "Sumayyah (RA)" },
            { te: "ఖదీజా (ర/అ)", en: "Khadijah (RA)" },
            { te: "బిలాల్ (ర/అ)", en: "Bilal (RA)" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "అబిసీనియా — క్రైస్తవ రాజు వద్ద ఆశ్రయం", en: "Abyssinia: refuge with a Christian king" },
        body: {
          te: "615లో ప్రవక్త ﷺ కొందరు ముస్లింలను అబిసీనియాకు పంపారు, అక్కడి క్రైస్తవ రాజు నజాషీ న్యాయవంతుడని చెప్పి. ఖురైష్ వారిని వెనక్కి పంపమని రాయబారులను పంపింది. జఅఫర్ బిన్ అబీ తాలిబ్ (ర/అ) రాజు ముందు నిలబడి ఇస్లాంను వివరించి, సూరా మర్యమ్ నుండి ఈసా (అ), మర్యమ్ (అ) గురించిన ఆయతులు చదివారు. రాజు కంటినీరు పెట్టి వారిని అప్పగించడానికి నిరాకరించారు. ఈ సంఘటన ముఖ్యం: ముస్లింలు తమ మొదటి ఆశ్రయాన్ని ఒక క్రైస్తవ పాలకుడి వద్ద పొందారు, మరియు వారిని కాపాడినది సమాన విశ్వాసం కాదు — న్యాయం.",
          en: "In 615 the Prophet ﷺ sent a group to Abyssinia, saying its Christian king was just. Quraysh sent envoys demanding their return. Ja'far ibn Abi Talib (RA) stood before the king, explained Islam, and recited verses from Surah Maryam about Isa and Maryam. The king wept and refused to hand them over. The episode matters: the first refuge Muslims found was with a Christian ruler, and what protected them was not shared belief but justice.",
        },
        check: {
          question: { te: "అబిసీనియాలో ముస్లింలను ఎవరు కాపాడారు?", en: "Who protected the Muslims in Abyssinia?" },
          options: [
            { te: "నజాషీ — క్రైస్తవ రాజు", en: "The Negus, a Christian king" },
            { te: "ఖురైష్ రాయబారులు", en: "The envoys of Quraysh" },
            { te: "ఒక ముస్లిం గవర్నర్", en: "A Muslim governor" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "బహిష్కరణ, దుఃఖ సంవత్సరం", en: "The boycott and the Year of Sorrow" },
        body: {
          te: "ఖురైష్ బనూ హాషిం మొత్తంపై పూర్తి బహిష్కరణ విధించింది — వ్యాపారం లేదు, వివాహాలు లేవు, ఆహారం లేదు. ముస్లిమేతర బంధువులతో సహా ఆ గోత్రం మొత్తం ఒక లోయలో మూడు సంవత్సరాలు గడిపింది; పిల్లల ఆకలి ఏడుపులు బయటికి వినిపించేవని ఉల్లేఖనలు చెబుతాయి. బహిష్కరణ ముగిసిన కొద్దికాలానికే — 619లో — ఖదీజా (ర/అ), అబూ తాలిబ్ ఇద్దరూ మరణించారు. ఒకరు ఆయన భావోద్వేగ ఆధారం, మరొకరు ఆయన భౌతిక రక్షణ. దాన్ని 'ఆముల్ హుజ్న్' — దుఃఖ సంవత్సరం — అంటారు.",
          en: "Quraysh imposed a total boycott on the whole of Banu Hashim: no trade, no marriage, no food. The clan, including its non-Muslim members, spent three years in a valley, and narrations report that the crying of hungry children could be heard outside. Shortly after it ended, in 619, both Khadijah (RA) and Abu Talib died: one his emotional support, the other his physical protection. It is called Am al-Huzn, the Year of Sorrow.",
        },
      },
      {
        heading: { te: "తాయిఫ్ — అత్యంత కష్టమైన రోజు", en: "Taif, the hardest day" },
        body: {
          te: "అబూ తాలిబ్ రక్షణ పోయిన తర్వాత ఆయన తాయిఫ్‌కు వెళ్ళి అక్కడి నాయకులకు సందేశాన్ని అందించారు. వారు తిరస్కరించడమే కాక, పిల్లలను, బానిసలను ఆయనపై రాళ్ళు వేయడానికి పంపారు — ఆయన పాదాల నుండి రక్తం కారేంతవరకు. ఒక దూత వచ్చి ఆ నగరాన్ని రెండు కొండల మధ్య నలిపివేయాలా అని అడిగినప్పుడు ఆయన 'లేదు, వారి సంతానం నుండి అల్లాహ్‌ను ఆరాధించేవారు వస్తారని నేను ఆశిస్తున్నాను' అన్నారు (బుఖారీ). తనను రక్తం కారేలా కొట్టినవారి కోసం ఆయన చేసిన దుఆ ఇది.",
          en: "With Abu Talib's protection gone he went to Taif to put the message to its leaders. They refused, and set children and slaves to stone him until his feet bled. When an angel came and offered to crush the town between two mountains, he said no, and that he hoped Allah would bring from their descendants people who would worship Him (Bukhari). That was his supplication for the people who had left him bleeding.",
        },
      },
      {
        heading: { te: "ఈ కాలం ఏమి బోధిస్తుంది", en: "What this period teaches" },
        body: {
          te: "పదమూడేళ్ళలో ఒక్క ప్రతీకార చర్యా లేదు. ముస్లింలు హింసించబడ్డారు, చంపబడ్డారు, ఆకలితో ఉన్నారు, బహిష్కరించబడ్డారు — మరియు వారికి 'చేతులు ఆపండి, నమాజ్ స్థాపించండి' అని ఆదేశించబడింది (అన్-నిసా 4:77). యుద్ధానికి అనుమతి మదీనాలోనే వచ్చింది. ఇది ముఖ్యమైన పాఠం: ఇస్లాం మొదటి పదమూడేళ్ళు పూర్తిగా ఓర్పు, బోధన, స్థిరత్వంతో గడిచింది. ఈ కాలాన్ని విస్మరించి ఇస్లాం చరిత్రను యుద్ధాల జాబితాగా చదవడం తప్పు.",
          en: "Thirteen years without a single act of retaliation. The Muslims were tortured, killed, starved and boycotted, and were instructed to restrain their hands and establish the prayer (An-Nisa 4:77). Permission to fight came only in Madinah. That is the lesson: Islam's first thirteen years were entirely patience, teaching and endurance. Reading Islamic history as a list of battles means skipping this period.",
        },
      },
    ],
    takeaways: [
      { te: "పదమూడేళ్ళు, ఒక్క ప్రతీకార చర్యా లేదు.", en: "Thirteen years without a single act of retaliation." },
      { te: "మొదటి ఆశ్రయం ఒక క్రైస్తవ రాజు వద్ద — న్యాయం వల్ల, విశ్వాసం వల్ల కాదు.", en: "The first refuge was with a Christian king, on justice rather than shared belief." },
      { te: "తాయిఫ్‌లో ఆయన తనను కొట్టినవారి కోసం దుఆ చేశారు.", en: "At Taif he prayed for the people who had stoned him." },
    ],
    didYouKnow: [
      { te: "బహిష్కరణ సమయంలో బనూ హాషింలోని ముస్లిమేతరులు కూడా ప్రవక్త ﷺతో పాటు లోయలో ఉన్నారు — గోత్ర విధేయత కారణంగా.", en: "During the boycott the non-Muslims of Banu Hashim stayed in the valley with him too, out of clan loyalty." },
      { te: "బిలాల్ (ర/అ)ను అబూ బక్ర్ (ర/అ) కొనుగోలు చేసి విడిపించారు.", en: "Bilal (RA) was bought and freed by Abu Bakr (RA)." },
    ],
    reflect: [
      { te: "మీకు అన్యాయం చేసినవారి కోసం మీరు దుఆ చేయగలరా?", en: "Could you make du'a for someone who has wronged you?" },
    ],
    mistakes: [
      { te: "ఇస్లాం చరిత్రను యుద్ధాలతో మొదలుపెట్టడం — మొదటి పదమూడేళ్ళు ఓర్పే.", en: "Beginning Islamic history at the battles, when the first thirteen years were patience." },
    ],
    faqs: [
      {
        question: { te: "ముస్లింలు ఎందుకు ప్రతిఘటించలేదు?", en: "Why did the Muslims not fight back?" },
        answer: {
          te: "వారికి అనుమతి లేదు. ఖురాన్ ఆ కాలంలో స్పష్టంగా 'చేతులు ఆపండి' అని ఆదేశించింది (4:77). కొందరు సహచరులు అనుమతి కోరారు, కానీ ఇవ్వబడలేదు. యుద్ధానికి అనుమతి హిజ్రత్ తర్వాత, ఒక సమాజం, రాజ్యం ఏర్పడిన తర్వాతే వచ్చింది — వ్యక్తిగత ప్రతీకారంగా కాదు.",
          en: "They were not permitted to. The Quran in that period explicitly told them to restrain their hands (4:77). Some companions asked for permission and were not given it. It came only after the Hijrah, once there was a community and a polity, and not as private revenge.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "మక్కా కాలంలో ఎన్ని యుద్ధాలు జరిగాయి?", en: "How many battles took place in the Makkan period?" },
        options: [
          { te: "ఒక్కటీ లేదు", en: "None" },
          { te: "మూడు", en: "Three" },
          { te: "ఒకటి", en: "One" },
        ],
        answer: 0,
      },
      {
        question: { te: "బహిష్కరణ ఎంతకాలం కొనసాగింది?", en: "How long did the boycott last?" },
        options: [
          { te: "సుమారు మూడు సంవత్సరాలు", en: "About three years" },
          { te: "ఆరు నెలలు", en: "Six months" },
          { te: "పది సంవత్సరాలు", en: "Ten years" },
        ],
        answer: 0,
      },
      {
        question: { te: "తాయిఫ్‌లో దూత ఏమి ప్రతిపాదించారు?", en: "What did the angel offer at Taif?" },
        options: [
          { te: "నగరాన్ని రెండు కొండల మధ్య నలిపివేయడం", en: "To crush the town between two mountains" },
          { te: "ఒక సైన్యాన్ని పంపడం", en: "To send an army" },
          { te: "ఆయనను మక్కాకు తీసుకువెళ్ళడం", en: "To carry him back to Makkah" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "615 అబిసీనియా · 617-619 బహిష్కరణ · 619 దుఃఖ సంవత్సరం · తాయిఫ్.", en: "615 Abyssinia, 617-619 boycott, 619 Year of Sorrow, then Taif." },
      { te: "ఖురాన్ 4:77 — 'చేతులు ఆపండి'.", en: "Quran 4:77: restrain your hands." },
      { te: "మొదటి అమరవీరురాలు సుమయ్యా (ర/అ).", en: "The first martyr was Sumayyah (RA)." },
    ],
    summary: {
      te: "మక్కా పదమూడేళ్ళు హింస, బహిష్కరణ, నష్టం — మరియు ఒక్క ప్రతీకార చర్యా లేకుండా. మొదటి ఆశ్రయం ఒక క్రైస్తవ రాజు వద్ద న్యాయం కారణంగా దొరికింది. తాయిఫ్‌లో తనను కొట్టినవారి కోసం ఆయన దుఆ చేశారు.",
      en: "Thirteen Makkan years of persecution, boycott and loss, without a single act of retaliation. The first refuge came from a Christian king on the strength of his justice. At Taif he prayed for those who had stoned him.",
    },
    apply: {
      te: "ఆచరణ: తాయిఫ్ దుఆను చదివి, మీ జీవితంలో ఒక వ్యక్తి కోసం అలాంటి దుఆ చేయండి.",
      en: "Apply it: read the supplication at Taif and make a similar one for someone in your own life.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "Hijrah and Madinah", url: "/knowledge-center/seerah/hijrah-and-madinah" },
    ],
  },

  {
    slug: "hijrah-and-madinah",
    portal: "seerah",
    title: {
      te: "స్థాయి 4 — హిజ్రత్, మదీనా",
      en: "Level 4 — The Hijrah and Madinah",
    },
    intro: {
      te: "హిజ్రత్ ఒక పలాయనం కాదు — అది ఒక ఆహ్వానానికి సమాధానం, ఒక ప్రణాళిక. మదీనాలో జరిగినది ఇంకా ముఖ్యం: ముస్లింలు మొదటిసారి ఒక సమాజాన్ని నిర్మించారు.",
      en: "The Hijrah was not flight but the answer to an invitation, and a planned one. What happened in Madinah matters more: for the first time the Muslims built a society.",
    },
    sections: [
      {
        heading: { te: "ఆహ్వానం యథ్రిబ్ నుండి వచ్చింది", en: "The invitation came from Yathrib" },
        body: {
          te: "యథ్రిబ్‌లో ఔస్, ఖజ్రజ్ అనే రెండు గోత్రాలు దశాబ్దాలుగా రక్త వైరంలో ఉండేవి. హజ్ కాలంలో వారిలో కొందరు ప్రవక్త ﷺను కలిసి ఇస్లాం స్వీకరించారు. తర్వాతి రెండు సంవత్సరాలలో అఖబా వద్ద రెండు ప్రతిజ్ఞలు జరిగాయి; రెండోదానిలో డెబ్భై మందికి పైగా ఆయనను తమ నగరానికి ఆహ్వానించి, తమ కుటుంబాలను కాపాడినట్లే ఆయనను కాపాడతామని ప్రతిజ్ఞ చేశారు. అంటే హిజ్రత్ ఒక తప్పించుకోవడం కాదు — ఒక ఆహ్వానం, ఒక ఒప్పందం, ఒక ప్రణాళిక.",
          en: "In Yathrib the tribes of Aws and Khazraj had been locked in a blood feud for decades. During the pilgrimage season some of them met the Prophet ﷺ and accepted Islam. Over the next two years came the two pledges at Aqabah, and in the second more than seventy invited him to their city and pledged to protect him as they protected their own families. So the Hijrah was not an escape but an invitation, an agreement and a plan.",
        },
        check: {
          question: { te: "హిజ్రత్ ఎలా జరిగింది?", en: "How did the Hijrah come about?" },
          options: [
            { te: "యథ్రిబ్ నుండి వచ్చిన ఆహ్వానం, ప్రతిజ్ఞల ద్వారా", en: "By invitation and pledges from Yathrib" },
            { te: "అకస్మాత్తుగా పలాయనం", en: "As a sudden flight" },
            { te: "ఖురైష్ బహిష్కరించడం వల్ల", en: "Because Quraysh expelled them" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "సౌర్ గుహ", en: "The cave of Thawr" },
        body: {
          te: "ఖురైష్ ప్రతి గోత్రం నుండి ఒక యువకుడిని ఎంచుకుని ఆయనను కలిసి చంపాలని పథకం వేసింది — ఏ ఒక్క గోత్రంపైనా బనూ హాషిం ప్రతీకారం తీర్చుకోలేకుండా. ఆ రాత్రి అలీ (ర/అ) ఆయన పడకపై పడుకున్నారు. ప్రవక్త ﷺ, అబూ బక్ర్ (ర/అ) దక్షిణం వైపు — మదీనాకు వ్యతిరేక దిశలో — వెళ్ళి సౌర్ గుహలో మూడు రాత్రులు దాక్కున్నారు. వెతికేవారు గుహ ముఖద్వారం వరకు వచ్చినప్పుడు అబూ బక్ర్ (ర/అ) భయపడితే ఆయన అన్నారు: 'దుఃఖించవద్దు, అల్లాహ్ మనతో ఉన్నాడు' — ఈ మాట ఖురాన్‌లో నమోదైంది (అత్-తౌబా 9:40).",
          en: "Quraysh planned to take one young man from each clan to strike him together, so that Banu Hashim could not avenge him against any single clan. That night Ali (RA) lay in his bed. The Prophet ﷺ and Abu Bakr (RA) went south, away from Madinah, and hid three nights in the cave of Thawr. When the search party reached the mouth of the cave and Abu Bakr grew afraid, he said do not grieve, Allah is with us, words the Quran records (At-Tawbah 9:40).",
        },
      },
      {
        heading: { te: "మొదటి పని: మస్జిద్, తర్వాత సోదరత్వం", en: "First the mosque, then the brotherhood" },
        body: {
          te: "మదీనాకు చేరిన వెంటనే ఆయన చేసిన మొదటి పని మస్జిద్ నిర్మాణం — ఆయన స్వయంగా రాళ్ళు మోశారు. అది కేవలం నమాజ్ స్థలం కాదు: పాఠశాల, న్యాయస్థానం, సభా మందిరం, నిరాశ్రయులకు ఆశ్రయం. రెండో పని ఇంకా అసాధారణమైనది: ముహాజిరీన్ (మక్కా నుండి వచ్చినవారు, సర్వస్వం కోల్పోయినవారు) ప్రతి ఒక్కరినీ అన్సార్ (మదీనావాసులు) ఒక్కొక్కరితో సోదరులుగా జతపరిచారు. అన్సార్ తమ ఇళ్ళను, సంపదను పంచుకున్నారు. ప్రపంచ చరిత్రలో ఇలాంటి శరణార్థుల పునరావాసం అరుదు.",
          en: "On arriving, the first thing he did was build the mosque, carrying stones himself. It was not only a place of prayer: it was school, court, assembly hall and shelter for the homeless. The second thing was more unusual still. Each of the Muhajirun, who had come from Makkah having lost everything, was paired as a brother with one of the Ansar of Madinah, and the Ansar shared their homes and wealth. Resettlement of refugees on those terms is rare in any history.",
        },
        check: {
          question: { te: "మదీనాలో ఆయన చేసిన మొదటి పని ఏమిటి?", en: "What was the first thing he did in Madinah?" },
          options: [
            { te: "మస్జిద్ నిర్మాణం", en: "Building the mosque" },
            { te: "సైన్యం ఏర్పాటు", en: "Raising an army" },
            { te: "పన్నులు విధించడం", en: "Levying taxes" },
          ],
          answer: 0,
        },
      },
      {
        heading: { te: "మదీనా ఒడంబడిక", en: "The Constitution of Madinah" },
        body: {
          te: "ఆయన ఒక లిఖిత పత్రాన్ని రూపొందించారు, అది నగరంలోని అన్ని వర్గాల హక్కులు, బాధ్యతలను నిర్వచించింది — ముహాజిరీన్, అన్సార్, మరియు యూదు గోత్రాలు. దానిలోని ముఖ్యాంశాలు: యూదులకు తమ మతం, ముస్లింలకు తమ మతం; బయటి దాడి వస్తే అందరూ కలిసి నగరాన్ని కాపాడాలి; వివాదాలు ప్రవక్త ﷺ వద్దకు వెళ్ళాలి; ఒక వ్యక్తి నేరానికి అతని గోత్రం మొత్తం బాధ్యత కాదు. ఇది గోత్ర వ్యవస్థ నుండి పౌర వ్యవస్థకు మార్పు. చాలామంది చరిత్రకారులు దీన్ని ప్రపంచపు తొలి లిఖిత రాజ్యాంగాలలో ఒకటిగా భావిస్తారు.",
          en: "He drew up a written document setting out the rights and duties of every group in the city: the Muhajirun, the Ansar and the Jewish tribes. Its terms included the Jews having their religion and the Muslims theirs; a common defence of the city against outside attack; disputes referred to the Prophet ﷺ; and a man's crime not making his whole clan liable. That is a shift from tribal order to civic order, and many historians count it among the earliest written constitutions.",
        },
      },
    ],
    takeaways: [
      { te: "హిజ్రత్ ఒక ఆహ్వానం, ఒక ప్రణాళిక — పలాయనం కాదు.", en: "The Hijrah was an invitation and a plan, not a flight." },
      { te: "మొదట మస్జిద్, తర్వాత సోదరత్వ జతలు.", en: "First the mosque, then the pairing of brothers." },
      { te: "మదీనా ఒడంబడిక గోత్రం నుండి పౌర వ్యవస్థకు మార్పు.", en: "The Constitution moved the city from tribal order to civic order." },
    ],
    didYouKnow: [
      { te: "ప్రవక్త ﷺ మదీనాలో తన ఇల్లు ఎక్కడ కట్టాలో నిర్ణయించడానికి ఒంటెను స్వేచ్ఛగా వదిలారు — అది ఎక్కడ కూర్చుంటే అక్కడ మస్జిద్ కట్టారు.", en: "He let his camel walk free to decide where he would settle, and built the mosque where it stopped." },
      { te: "'మదీనా' అంటే నగరం; పూర్తి పేరు 'మదీనతున్ నబీ' — ప్రవక్త నగరం.", en: "Madinah simply means the city; its full name is Madinat an-Nabi, the city of the Prophet." },
    ],
    reflect: [
      { te: "అన్సార్ తమ ఇళ్ళను శరణార్థులతో పంచుకున్నారు. మీ సమాజంలో ఇది ఎలా కనిపిస్తుంది?", en: "The Ansar shared their homes with refugees. What would that look like in your community?" },
    ],
    mistakes: [
      { te: "హిజ్రత్‌ను భయంతో పారిపోవడంగా చిత్రించడం.", en: "Portraying the Hijrah as fleeing in fear." },
      { te: "మదీనా ఒడంబడికను విస్మరించడం — అది ఆ కాలపు అత్యంత ముఖ్యమైన పత్రాలలో ఒకటి.", en: "Skipping the Constitution of Madinah, one of the most significant documents of the period." },
    ],
    faqs: [
      {
        question: { te: "హిజ్రీ క్యాలెండర్ హిజ్రత్ నుండే ఎందుకు?", en: "Why does the Hijri calendar start from the Hijrah?" },
        answer: {
          te: "ఉమర్ (ర/అ) సహచరులతో సంప్రదించి ఈ నిర్ణయం తీసుకున్నారు. ప్రవక్త ﷺ జననం లేదా మొదటి వహీ కాకుండా హిజ్రత్‌ను ఎంచుకోవడం అర్థవంతం: అది ఒక వ్యక్తి జీవితంలోని క్షణం కాదు, ముస్లింలు ఒక సమాజంగా ఏర్పడిన క్షణం.",
          en: "Umar (RA) settled it after consulting the companions. Choosing the Hijrah rather than the birth or the first revelation is telling: it marks not a moment in one man's life but the moment the Muslims became a community.",
        },
      },
    ],
    quiz: [
      {
        question: { te: "సౌర్ గుహలో ప్రవక్త ﷺ ఏమన్నారు?", en: "What did the Prophet ﷺ say in the cave of Thawr?" },
        options: [
          { te: "'దుఃఖించవద్దు, అల్లాహ్ మనతో ఉన్నాడు'", en: "Do not grieve, Allah is with us" },
          { te: "'మనం తిరిగి వెళదాం'", en: "Let us go back" },
          { te: "ఏమీ అనలేదు", en: "Nothing" },
        ],
        answer: 0,
      },
      {
        question: { te: "అఖబా ప్రతిజ్ఞలు ఎక్కడి ప్రజలవి?", en: "The pledges at Aqabah were made by people of where?" },
        options: [
          { te: "యథ్రిబ్ (మదీనా)", en: "Yathrib, later Madinah" },
          { te: "తాయిఫ్", en: "Taif" },
          { te: "అబిసీనియా", en: "Abyssinia" },
        ],
        answer: 0,
      },
      {
        question: { te: "మదీనా ఒడంబడిక ఎవరిని కలిపింది?", en: "Whom did the Constitution of Madinah bind together?" },
        options: [
          { te: "ముహాజిరీన్, అన్సార్, యూదు గోత్రాలు", en: "The Muhajirun, the Ansar and the Jewish tribes" },
          { te: "ముస్లింలను మాత్రమే", en: "Muslims only" },
          { te: "ఖురైష్‌ను మాత్రమే", en: "Quraysh only" },
        ],
        answer: 0,
      },
    ],
    revision: [
      { te: "అఖబా ప్రతిజ్ఞలు → 622 హిజ్రత్ → సౌర్ గుహ → మదీనా.", en: "The Aqabah pledges, then 622, the cave of Thawr, then Madinah." },
      { te: "మస్జిద్ → సోదరత్వం → ఒడంబడిక.", en: "Mosque, brotherhood, constitution." },
      { te: "ఖురాన్ 9:40 — 'అల్లాహ్ మనతో ఉన్నాడు'.", en: "Quran 9:40: Allah is with us." },
    ],
    summary: {
      te: "హిజ్రత్ యథ్రిబ్ ఆహ్వానం, అఖబా ప్రతిజ్ఞల ఫలితం. సౌర్ గుహలో మూడు రాత్రుల తర్వాత మదీనా చేరి, మస్జిద్ నిర్మించి, ముహాజిరీన్-అన్సార్ సోదరత్వాన్ని ఏర్పరచి, మదీనా ఒడంబడికతో ఒక పౌర వ్యవస్థను స్థాపించారు.",
      en: "The Hijrah followed an invitation from Yathrib and the pledges at Aqabah. After three nights in the cave of Thawr he reached Madinah, built the mosque, paired the Muhajirun with the Ansar, and established a civic order through the Constitution of Madinah.",
    },
    apply: {
      te: "ఆచరణ: మదీనా ఒడంబడికలోని ఒక నిబంధనను ఎంచుకుని, అది నేటికీ ఎలా వర్తిస్తుందో రాయండి.",
      en: "Apply it: pick one clause of the Constitution of Madinah and write how it still applies.",
    },
    reading: [
      { label: "Seerah portal", url: "/knowledge-center/seerah" },
      { label: "Major events and battles", url: "/knowledge-center/seerah/major-events-and-battles" },
    ],
  },
];
