export type Lang = "te" | "en";

export const strings = {
  // Nav
  nav_home:       { te: "హోమ్", en: "Home" },
  nav_victory:    { te: "మా విజయం", en: "Our Victory" },
  nav_achievements:{ te: "సాధనలు", en: "Achievements" },
  nav_manifesto:  { te: "మానిఫెస్టో", en: "Manifesto" },
  nav_schemes:    { te: "సహాయ పథకం", en: "Aid Scheme" },
  nav_about:      { te: "గురించి", en: "About" },
  nav_contact:    { te: "సంప్రదించండి", en: "Contact" },
  nav_kc:         { te: "జ్ఞాన కేంద్రం", en: "Knowledge Center" },
  nav_sg:         { te: "విద్యార్థి మార్గదర్శి", en: "Student Guidance" },
  lang_toggle:    { te: "English", en: "తెలుగు" },

  // Hero
  hero_badge:     { te: "మంగళగిరి, ఆ.ప్ర.", en: "Mangalagiri, A.P." },
  hero_title:     { te: "ఇస్లామిక్ ఫ్రంట్", en: "Islamic Front" },
  hero_sub:       { te: "2011 నుండి మంగళగిరి ముస్లిం సమాజానికి సేవ చేస్తున్నాం", en: "Serving the Muslim community of Mangalagiri since 2011" },
  hero_cta:       { te: "మా సాధనలు చూడండి →", en: "Our Achievements →" },
  hero_seats:     { te: "7/9 సీట్లు గెలిచాం 2023", en: "7/9 Seats Won 2023" },
  hero_years:     { te: "15+ సేవా సంవత్సరాలు", en: "15+ Years of Service" },

  // Sections
  section_victory_tag:  { te: "ఎన్నికల ఫలితాలు · జూలై 2023", en: "Election Results · July 2023" },
  section_victory_title:{ te: "చారిత్రాత్మక విజయం", en: "A Historic Mandate" },
  section_victory_desc: { te: "ఇస్లామిక్ ఫ్రంట్ అంజుమన్ ఎన్నికలలో 9లో 7 సీట్లు గెలిచింది", en: "Islamic Front won 7 out of 9 seats in Anjuman elections" },

  section_achievements: { te: "ఈ పదవీకాలంలో మా సాధనలు", en: "Our Achievements in This Tenure" },
  section_manifesto:    { te: "ఇస్లామిక్ ఫ్రంట్ మానిఫెస్టో", en: "Islamic Front Manifesto" },
  section_schemes:      { te: "మా పథకాలు", en: "Our Schemes" },
  section_infra:        { te: "మా మౌలిక సదుపాయాలు", en: "Our Infrastructure" },
  section_about:        { te: "ఇస్లామిక్ ఫ్రంట్ గురించి", en: "About Islamic Front" },
  section_contact:      { te: "సంప్రదింపు మరియు చిరునామా", en: "Contact & Address" },
  section_stories:      { te: "విజయగాథలు", en: "Success Stories" },
  section_gallery:      { te: "సమాజ కార్యక్రమాలు", en: "Community Activities" },
  section_events:       { te: "రాబోయే కార్యక్రమాలు", en: "Upcoming Events" },
  section_volunteer:    { te: "వాలంటీర్ అవ్వండి", en: "Become a Volunteer" },
  section_kc_promo:     { te: "ఇస్లామిక్ జ్ఞాన కేంద్రం", en: "Islamic Knowledge Center" },

  // Scheme
  scheme_title:   { te: "అంజుమన్ అంత్యక్రియల సహాయ పథకం", en: "Anjuman Funeral Aid Programme" },
  scheme_amount:  { te: "₹10,000", en: "₹10,000" },
  scheme_sub:     { te: "కుటుంబానికి ఆర్థిక సహాయం", en: "Financial Aid per Family" },
  scheme_desc:    { te: "గౌరవప్రదమైన వీడ్కోలు కోసం దయగల చొరవ", en: "Compassionate initiative for dignified farewell" },

  // Manifesto status
  completed:  { te: "పూర్తయింది", en: "Completed" },
  in_progress:{ te: "జరుగుతోంది", en: "In Progress" },
  upcoming:   { te: "రాబోతోంది", en: "Upcoming" },

  // Buttons
  download_manifesto: { te: "మానిఫెస్టో డౌన్‌లోడ్ చేయండి (PDF)", en: "Download Manifesto (PDF)" },
  join_us:      { te: "మాతో చేరండి", en: "Join Us" },
  learn_more:   { te: "మరింత తెలుసుకోండి", en: "Learn More" },
  open_kc:      { te: "జ్ఞాన కేంద్రం తెరవండి", en: "Open Knowledge Center" },

  // Footer
  footer_since: { te: "2011 నుండి జనాబ్ షేక్ అక్రమ్ నేతృత్వంలో ముస్లిం సమాజానికి సేవ చేస్తున్నాం", en: "Serving Muslim community since 2011 under Janab Shaik Akram" },
  footer_copy:  { te: "© 2024 ఇస్లామిక్ ఫ్రంట్, మంగళగిరి. అన్ని హక్కులు రక్షించబడ్డాయి.", en: "© 2024 Islamic Front, Mangalagiri. All rights reserved." },
  footer_addr:  { te: "మంగళగిరి, గుంటూరు జిల్లా, ఆంధ్ర ప్రదేశ్ 522503", en: "Mangalagiri, Guntur District, Andhra Pradesh 522503" },
} satisfies Record<string, Record<Lang, string>>;

export type StringKey = keyof typeof strings;
