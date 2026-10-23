import type { SeedBook, SeedExam, SeedJob } from "./types";

const ALL_GRADUATES = ["GRADUATE", "BTECH", "POSTGRADUATE"] as const;

export const exams: SeedExam[] = [
  {
    slug: "upsc-cse",
    name: { en: "UPSC Civil Services", hi: "यूपीएससी सिविल सेवा" },
    conductingBody: "Union Public Service Commission",
    category: "CIVIL",
    eligibleQuals: [...ALL_GRADUATES],
    officialUrl: "https://upsc.gov.in",
    summary: { en: "IAS, IPS, IFS and allied services" },
  },
  {
    slug: "ssc-cgl",
    name: { en: "SSC CGL", hi: "एसएससी सीजीएल" },
    conductingBody: "Staff Selection Commission",
    category: "BANKING_SSC",
    eligibleQuals: [...ALL_GRADUATES],
    officialUrl: "https://ssc.gov.in",
    summary: { en: "Group B and C central government posts" },
  },
  {
    slug: "ibps-po",
    name: { en: "IBPS PO", hi: "आईबीपीएस पीओ" },
    conductingBody: "Institute of Banking Personnel Selection",
    category: "BANKING_SSC",
    eligibleQuals: [...ALL_GRADUATES],
    officialUrl: "https://www.ibps.in",
    summary: { en: "Public sector bank officer" },
  },
  {
    slug: "ssc-chsl",
    name: { en: "SSC CHSL", hi: "एसएससी सीएचएसएल" },
    conductingBody: "Staff Selection Commission",
    category: "BANKING_SSC",
    eligibleQuals: ["CLASS_12", ...ALL_GRADUATES],
    officialUrl: "https://ssc.gov.in",
    summary: { en: "LDC, JSA and data entry operator posts" },
  },
  {
    slug: "nda",
    name: { en: "NDA & NA", hi: "एनडीए और एनए" },
    conductingBody: "Union Public Service Commission",
    category: "DEFENCE",
    eligibleQuals: ["CLASS_12"],
    officialUrl: "https://upsc.gov.in",
    summary: { en: "Army, Navy and Air Force officer entry after 12th" },
  },
  {
    slug: "ssc-mts",
    name: { en: "SSC MTS", hi: "एसएससी एमटीएस" },
    conductingBody: "Staff Selection Commission",
    category: "BANKING_SSC",
    eligibleQuals: ["CLASS_10", "CLASS_12", "DIPLOMA", ...ALL_GRADUATES],
    officialUrl: "https://ssc.gov.in",
    summary: { en: "Multi-tasking staff posts after 10th" },
  },
  {
    slug: "gate",
    name: { en: "GATE", hi: "गेट" },
    conductingBody: "IISc and IITs (organising institute rotates yearly)",
    category: "TECH",
    eligibleQuals: ["BTECH", "POSTGRADUATE"],
    summary: { en: "M.Tech admissions and PSU recruitment" },
  },
];

// Recurring exams described without cycle-specific dates, fees or vacancies —
// those change every year and must come from the official notification.
export const jobs: SeedJob[] = [
  {
    slug: "ssc-cgl",
    examSlug: "ssc-cgl",
    title: { en: "SSC Combined Graduate Level (CGL)" },
    organization: "Staff Selection Commission",
    eligibleQuals: [...ALL_GRADUATES],
    ageLimit: { en: "18–32 years (varies by post; relaxation for reserved categories)" },
    officialUrl: "https://ssc.gov.in",
    steps: [
      { en: "Complete one-time registration (OTR) on ssc.gov.in." },
      { en: "Open the CGL notification, check post-wise eligibility and fill the application form." },
      { en: "Upload a recent photo and signature in the stated format, then pay the fee online." },
      { en: "Download and keep the submitted form; admit cards appear on the same portal." },
    ],
    documents: [
      { en: "Graduation certificate or final-year marksheet" },
      { en: "Aadhaar or other photo ID" },
      { en: "Category certificate (if applicable)" },
      { en: "Recent passport photo and signature scan" },
    ],
  },
  {
    slug: "ibps-po",
    examSlug: "ibps-po",
    title: { en: "IBPS Probationary Officer (PO)" },
    organization: "Institute of Banking Personnel Selection",
    eligibleQuals: [...ALL_GRADUATES],
    ageLimit: { en: "20–30 years (relaxation for reserved categories)" },
    officialUrl: "https://www.ibps.in",
    steps: [
      { en: "Open the CRP PO/MT notification on ibps.in and read eligibility." },
      { en: "Register with email and mobile, then fill personal and education details." },
      { en: "Upload photo, signature, left thumb impression and the handwritten declaration." },
      { en: "Pay the fee online and save the e-receipt and application printout." },
    ],
    documents: [
      { en: "Graduation degree or provisional certificate" },
      { en: "Photo ID" },
      { en: "Category / PwBD certificate (if applicable)" },
      { en: "Scanned thumb impression and handwritten declaration" },
    ],
  },
  {
    slug: "upsc-cse",
    examSlug: "upsc-cse",
    title: { en: "UPSC Civil Services (Prelims)" },
    organization: "Union Public Service Commission",
    eligibleQuals: [...ALL_GRADUATES],
    ageLimit: { en: "21–32 years for General category (relaxation for reserved categories)" },
    officialUrl: "https://upsconline.gov.in",
    steps: [
      { en: "Create your one-time registration (OTR) profile on upsconline.gov.in." },
      { en: "Fill the CSE application and choose your exam centre." },
      { en: "Upload photo, signature and photo ID, then pay the fee." },
      { en: "Withdraw or correct only within the window given in the notification." },
    ],
    documents: [
      { en: "Graduation degree (final-year students may apply)" },
      { en: "Photo ID used in OTR" },
      { en: "Category / EWS / PwBD certificate (if applicable)" },
      { en: "Recent photo and signature" },
    ],
  },
];

export const books: SeedBook[] = [
  { title: "Indian Polity", author: "M. Laxmikanth", useFor: "UPSC & State PSC polity", category: "CIVIL", examSlugs: ["upsc-cse"] },
  { title: "A Brief History of Modern India", author: "Rajiv Ahir (Spectrum)", useFor: "Modern history, 1757–1947", category: "CIVIL", examSlugs: ["upsc-cse"] },
  { title: "Quantitative Aptitude for Competitive Examinations", author: "R. S. Aggarwal", useFor: "SSC, banking and railway maths", category: "BANKING_SSC", examSlugs: ["ssc-cgl", "ibps-po", "ssc-chsl"] },
  { title: "A Modern Approach to Verbal & Non-Verbal Reasoning", author: "R. S. Aggarwal", useFor: "Reasoning sections", category: "BANKING_SSC", examSlugs: ["ssc-cgl", "ibps-po", "ssc-chsl"] },
  { title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest, Stein", useFor: "DSA depth for tech interviews", category: "TECH", examSlugs: ["gate"] },
  { title: "Database System Concepts", author: "Silberschatz, Korth, Sudarshan", useFor: "SQL and DBMS fundamentals", category: "TECH", examSlugs: ["gate"] },
];
