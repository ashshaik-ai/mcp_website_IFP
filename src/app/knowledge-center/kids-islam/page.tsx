"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n/context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const sections = [
  { num: 1, emoji: "🌟", title: { te: "ఇస్లాం విశ్వాసాలు", en: "Islamic Beliefs" }, arabic: "أركان الإيمان", age: "5+", color: "bg-yellow-500", desc: { te: "అల్లాహ్, ఫరిష్తలు, కిత్తాబులు, రసూళ్ళు, ఆఖిరత్ — ఈమాన్‌లో ఆరు స్తంభాలు", en: "Allah, Angels, Books, Messengers, Hereafter — six pillars of Iman" }, topics: ["Who is Allah?", "Angels around us", "Our Holy Books", "Prophets & Messengers", "The Day of Judgement", "Qadar — Destiny"] },
  { num: 2, emoji: "🤝", title: { te: "మర్యాదలు & అలవాట్లు", en: "Manners & Habits" }, arabic: "الأخلاق والآداب", age: "6+", color: "bg-green-500", desc: { te: "ఇస్లామిక్ మర్యాదలు — భోజనం, నిద్ర, తల్లిదండ్రుల పట్ల, స్నేహితుల పట్ల", en: "Islamic etiquette — eating, sleeping, with parents, with friends" }, topics: ["Saying Bismillah", "Adab with parents", "Being kind to others", "Honesty & Trust", "Islamic greetings", "Cleanliness in Islam"] },
  { num: 3, emoji: "🤲", title: { te: "దైనందిన దువాలు", en: "Daily Duas" }, arabic: "الأدعية اليومية", age: "5+", color: "bg-blue-500", desc: { te: "నిద్రపోయే ముందు, లేచినప్పుడు, తినే ముందు — ప్రతి సంఘటనకు దువా", en: "Before sleeping, waking up, eating — a dua for every moment" }, topics: ["Dua before sleeping", "Dua on waking", "Dua before eating", "Dua leaving home", "Dua entering masjid", "Dua for parents"] },
  { num: 4, emoji: "📖", title: { te: "ప్రవక్త కథలు", en: "Prophet Stories" }, arabic: "قصص الأنبياء", age: "7+", color: "bg-purple-500", desc: { te: "ప్రవక్తల జీవిత కథలు — సహనం, విశ్వాసం మరియు ధైర్యం నేర్చుకోండి", en: "Stories of the Prophets — learn patience, faith and courage" }, topics: ["Prophet Ibrahim AS & fire", "Prophet Yusuf AS in the well", "Prophet Musa AS & Pharaoh", "Prophet Isa AS miracles", "Prophet Muhammad ﷺ childhood", "Prophet Nuh AS & the ark"] },
  { num: 5, emoji: "🕌", title: { te: "నమాజ్ & ఖురాన్", en: "Salah & Quran" }, arabic: "الصلاة والقرآن", age: "7+", color: "bg-teal-500", desc: { te: "నమాజ్ ఎలా చేయాలి · చిన్న సూరాలు · ఖురాన్ అక్షరాలు నేర్చుకోవడం", en: "How to pray Salah · Short Surahs · Learning Quran letters" }, topics: ["How to make Wudu", "Steps of Salah", "Surah Al-Fatiha", "Surah Al-Ikhlas", "Surah Al-Falaq & An-Nas", "Arabic letters"] },
  { num: 6, emoji: "🏆", title: { te: "ఇస్లామిక్ నాయకత్వం", en: "Islamic Leadership" }, arabic: "القيادة الإسلامية", age: "10+", color: "bg-orange-500", desc: { te: "ముస్లిం యువతగా నాయకత్వం, ధైర్యం మరియు సమాజ సేవ", en: "As young Muslims — leadership, courage and community service" }, topics: ["Young Sahabah stories", "Being responsible", "Helping the community", "Speaking the truth", "Standing up for justice", "Making a difference"] },
];

const quiz = [
  { q: { te: "ఇస్లాంలో ఐదు స్తంభాలు ఏమిటి?", en: "What are the Five Pillars of Islam?" }, options: ["Shahada, Salah, Zakat, Sawm, Hajj", "Prayer, Fasting, Zakat, Hajj, Jihad", "Iman, Prayer, Charity, Fasting, Hajj"], correct: 0 },
  { q: { te: "ఖురాన్ ఏ భాషలో అవతరించింది?", en: "In which language was the Quran revealed?" }, options: ["Urdu", "Arabic", "Persian"], correct: 1 },
  { q: { te: "ముహమ్మద్ ﷺ ఏ నగరంలో జన్మించారు?", en: "In which city was Prophet Muhammad ﷺ born?" }, options: ["Madinah", "Jerusalem", "Makkah"], correct: 2 },
];

function KidsIslamPage() {
  const { lang } = useI18n();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quiz[quizIdx].correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (quizIdx < quiz.length - 1) { setQuizIdx(q => q + 1); setSelected(null); }
    else setDone(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero — bright kid palette */}
      <section className="bg-gradient-to-br from-orange-700 via-amber-700 to-[var(--if-green)] text-white py-20 px-4">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <BlurFade delay={0.05}>
            <Link href="/knowledge-center" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" /> {lang === "te" ? "జ్ఞాన కేంద్రం" : "Knowledge Center"}
            </Link>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="text-5xl mb-1">🌙⭐📖</div>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-yellow-300">
              {lang === "te" ? "పిల్లల ఇస్లాం" : "Kids Islam"}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-white/80 max-w-md text-lg">
              {lang === "te"
                ? "వయస్సు 5–15 · ఆటాడుతూ నేర్చుకోండి · ఇస్లాం అన్వేషణ ప్రారంభించండి!"
                : "Ages 5–15 · Learn through play · Start your Islam adventure!"}
            </p>
          </BlurFade>
          <BlurFade delay={0.25} className="flex gap-3 flex-wrap justify-center">
            {["🌟 6 Sections", "📚 36+ Topics", "🎯 Quizzes", "✅ Free"].map(item => (
              <span key={item} className="px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-semibold">{item}</span>
            ))}
          </BlurFade>
        </div>
      </section>

      {/* Learning Sections */}
      <section className="py-16 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-10">
              {lang === "te" ? "నా ఇస్లాం అన్వేషణ" : "My Islam Adventure"}
            </h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((sec, i) => (
              <BlurFade key={sec.num} delay={0.06 * i}>
                <button
                  onClick={() => setActiveSection(activeSection === sec.num ? null : sec.num)}
                  className={`relative overflow-hidden w-full text-left rounded-2xl border transition-all ${
                    activeSection === sec.num
                      ? "border-[var(--if-gold)]/50 shadow-lg shadow-[var(--if-gold)]/10"
                      : "border-[var(--if-gold)]/15 hover:border-[var(--if-gold)]/40"
                  } bg-white`}
                >
                  <BorderBeam size={100} duration={6} colorFrom="#c8922a" colorTo="#e8b84b" className={activeSection === sec.num ? "opacity-100" : "opacity-0"} />
                  <div className={`${sec.color} p-4 flex items-center justify-between`}>
                    <span className="text-3xl">{sec.emoji}</span>
                    <span className="text-xs font-bold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                      {sec.age} · {lang === "te" ? "స్థాయి" : "Level"} {sec.num}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-bold text-[var(--if-green)]">{sec.title[lang]}</h3>
                      <span className="font-arabic text-sm text-[var(--if-gold)]/70">{sec.arabic}</span>
                    </div>
                    <p className="text-sm text-[var(--if-text-muted)] leading-relaxed">{sec.desc[lang]}</p>

                    {activeSection === sec.num && (
                      <ul className="mt-4 space-y-2">
                        {sec.topics.map((t, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-[var(--if-text)]">
                            <Star className="h-3 w-3 text-[var(--if-gold)] flex-shrink-0" fill="currentColor" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </button>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Quiz */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-xl">
          <BlurFade delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-[var(--if-green)] text-center mb-8">
              {lang === "te" ? "🎯 ఇస్లాం క్విజ్" : "🎯 Islam Quiz"}
            </h2>
            <div className="relative overflow-hidden bg-[var(--if-green)] rounded-2xl p-8">
              <BorderBeam size={250} duration={10} colorFrom="#c8922a" colorTo="#e8b84b" />
              {!done ? (
                <>
                  <div className="flex justify-between text-xs text-[var(--if-gold-pale)]/60 mb-4">
                    <span>{lang === "te" ? "ప్రశ్న" : "Question"} {quizIdx + 1}/{quiz.length}</span>
                    <span>{lang === "te" ? "స్కోర్:" : "Score:"} {score}</span>
                  </div>
                  <p className="text-[var(--if-gold-pale)] font-semibold text-lg mb-6 leading-snug">
                    {quiz[quizIdx].q[lang]}
                  </p>
                  <div className="space-y-3">
                    {quiz[quizIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          selected === null
                            ? "border-[var(--if-gold)]/20 text-[var(--if-gold-pale)] hover:bg-white/10"
                            : i === quiz[quizIdx].correct
                              ? "border-emerald-400 bg-emerald-900/50 text-emerald-300"
                              : i === selected
                                ? "border-red-400 bg-red-900/50 text-red-300"
                                : "border-[var(--if-gold)]/10 text-[var(--if-gold-pale)]/40"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    ))}
                  </div>
                  {selected !== null && (
                    <button onClick={nextQ} className="mt-5 w-full py-3 rounded-xl bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm">
                      {quizIdx < quiz.length - 1 ? (lang === "te" ? "తదుపరి ప్రశ్న →" : "Next Question →") : (lang === "te" ? "ఫలితం చూడండి →" : "See Result →")}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-6xl mb-4">{score === quiz.length ? "🏆" : score >= 2 ? "⭐" : "📚"}</div>
                  <h3 className="font-display text-2xl font-bold text-[var(--if-gold-light)] mb-2">
                    {score}/{quiz.length} {lang === "te" ? "సరైనవి!" : "Correct!"}
                  </h3>
                  <p className="text-[var(--if-gold-pale)]/70 text-sm mb-5">
                    {score === quiz.length
                      ? (lang === "te" ? "అద్భుతం! మీరు ఇస్లాం జ్ఞానవంతులు!" : "Excellent! You're an Islam knowledge champion!")
                      : (lang === "te" ? "బాగుంది! మరింత నేర్చుకోండి!" : "Good effort! Keep learning!")}
                  </p>
                  <button
                    onClick={() => { setQuizIdx(0); setSelected(null); setScore(0); setDone(false); }}
                    className="px-6 py-2.5 rounded-full bg-[var(--if-gold)] text-[var(--if-green)] font-bold hover:bg-[var(--if-gold-light)] transition-colors text-sm"
                  >
                    {lang === "te" ? "మళ్ళీ ప్రయత్నించండి" : "Try Again"}
                  </button>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Parent corner */}
      <section className="py-12 px-4 bg-[var(--if-cream-light)]">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.1}>
            <div className="bg-white rounded-2xl border border-[var(--if-gold)]/20 p-6 flex gap-5 items-start flex-wrap">
              <div className="text-4xl flex-shrink-0">👨‍👩‍👧</div>
              <div>
                <h3 className="font-semibold text-[var(--if-green)] mb-1">
                  {lang === "te" ? "తల్లిదండ్రుల మూల" : "Parent Corner"}
                </h3>
                <p className="text-sm text-[var(--if-text-muted)] leading-relaxed">
                  {lang === "te"
                    ? "పిల్లలతో కలిసి నేర్చుకోండి. ప్రతి పాఠం తల్లిదండ్రులు కూడా చదవవచ్చు — చర్చ ప్రశ్నలు, కార్యకలాపాలు మరియు ఇంట్లో ఇస్లాం సంస్కృతి నిర్మించడానికి చిట్కాలు అందుబాటులో ఉంటాయి."
                    : "Learn alongside your children. Each lesson includes parent notes — discussion questions, activities, and tips for building Islamic culture at home."}
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function KidsIslam() {
  return <I18nProvider><KidsIslamPage /></I18nProvider>;
}
