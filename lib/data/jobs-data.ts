import { Landmark, Cloud, Building2, Shield, Rocket, Users, Briefcase } from "lucide-react";

export interface VerifiedJob {
  id: string;
  slug: string;
  title: string;
  organization: string;
  shortOrg: string;
  category: "CENTRAL" | "BANKING" | "TECH" | "DEFENCE" | "COMMISSION";
  categoryLabel: string;
  badges: { text: string; tone: "emerald" | "amber" | "rose" | "sky" | "indigo" }[];
  salary: string;
  salaryNum: number; // for sorting
  vacancies: number;
  vacanciesDisplay: string;
  eligibleQual: "GRADUATE" | "BTECH" | "CLASS_12" | "POSTGRADUATE" | "DIPLOMA";
  eligibleQualDisplay: string;
  stream: string;
  location: string;
  scope: "CENTRAL" | "PAN_INDIA" | "STATE";
  deadlineDate: string; // ISO format for sorting
  deadlineDisplay: string;
  daysRemaining: number;
  isClosingSoon: boolean;
  officialNoticeUrl: string;
  officialApplyUrl: string;
  roadmapId?: string;
  syllabusVaultId?: string;
  mockTestId?: string;
  steps: {
    stepNum: number;
    title: string;
    instructions: string;
    tips?: string;
  }[];
  specifications: {
    photoSpec: string;
    signatureSpec: string;
    feeGeneral: string;
    feeReserved: string;
  };
}

export const VERIFIED_JOBS_CATALOG: VerifiedJob[] = [
  {
    id: "lic-aao-2026",
    slug: "lic-aao",
    title: "Assistant Administrative Officer (AAO) - Generalist & Specialist",
    organization: "Life Insurance Corporation of India (LIC)",
    shortOrg: "LIC India",
    category: "CENTRAL",
    categoryLabel: "Central Govt Alert",
    badges: [
      { text: "Central Govt Alert", tone: "emerald" },
      { text: "Closing in 4 days!", tone: "rose" },
    ],
    salary: "₹53,600 – ₹1,02,090 / month + DA & HRA",
    salaryNum: 102090,
    vacancies: 300,
    vacanciesDisplay: "300 Vacancies",
    eligibleQual: "GRADUATE",
    eligibleQualDisplay: "Any Graduate / Bachelor's Degree",
    stream: "General / Any Stream",
    location: "All India Postings",
    scope: "CENTRAL",
    deadlineDate: "2026-10-28",
    deadlineDisplay: "Closes in 4 days: 28 Oct",
    daysRemaining: 4,
    isClosingSoon: true,
    officialNoticeUrl: "https://licindia.in/Bottom-Links/Careers",
    officialApplyUrl: "https://ibpsonline.ibps.in/licaaofeb26",
    roadmapId: "lic-aao",
    mockTestId: "upsc-prelims-gs1",
    steps: [
      {
        stepNum: 1,
        title: "Registration & OTR Details",
        instructions: "Visit the IBPS Online portal for LIC AAO, click 'New Registration' and enter your primary phone number and active email ID.",
        tips: "Ensure full name matches your 10th matriculation certificate exactly.",
      },
      {
        stepNum: 2,
        title: "Document & Photo Upload",
        instructions: "Upload your color photograph (20KB - 50KB) and signature in black ink (10KB - 20KB). Also attach left thumb impression scan.",
      },
      {
        stepNum: 3,
        title: "Fee Payment & E-Receipt",
        instructions: "Pay ₹700 + GST (SC/ST/PwBD pay intimation charges of ₹85). Download the payment confirmation receipt and completed application PDF.",
      },
    ],
    specifications: {
      photoSpec: "3.5cm x 4.5cm, 200x230 pixels, 20KB-50KB, plain white background",
      signatureSpec: "Black ink on white paper, 140x60 pixels, 10KB-20KB (No capital letter signatures)",
      feeGeneral: "₹700 + GST",
      feeReserved: "₹85 (Intimation charges only for SC/ST/PwBD)",
    },
  },
  {
    id: "nic-scientist-b",
    slug: "nic-scientist-b",
    title: "Scientist 'B' & Associate Cloud Systems Engineer",
    organization: "National Informatics Centre (NIC) / Ministry of Electronics & IT",
    shortOrg: "NIC / MeitY",
    category: "TECH",
    categoryLabel: "Engineering & IT",
    badges: [
      { text: "Central Public Sector", tone: "emerald" },
      { text: "Direct Online Application", tone: "sky" },
    ],
    salary: "₹56,100 – ₹1,77,500 / month (Level 10 Pay Matrix)",
    salaryNum: 177500,
    vacancies: 461,
    vacanciesDisplay: "461 Vacancies",
    eligibleQual: "BTECH",
    eligibleQualDisplay: "B.E. / B.Tech / MCA (CS / IT / ECE)",
    stream: "Computer Science / IT",
    location: "New Delhi / Pan-India with Remote Allowance",
    scope: "CENTRAL",
    deadlineDate: "2026-11-14",
    deadlineDisplay: "14 Nov 2026",
    daysRemaining: 21,
    isClosingSoon: false,
    officialNoticeUrl: "https://www.calicut.nielit.in/nic26/",
    officialApplyUrl: "https://recruitment.nic.in",
    syllabusVaultId: "tech-algorithms",
    mockTestId: "gate-cs-mock",
    steps: [
      {
        stepNum: 1,
        title: "NIELIT Portal Enrollment",
        instructions: "Log on to the NIELIT recruitment portal for NIC positions. Register using your Aadhaar or DigiLocker authentication.",
      },
      {
        stepNum: 2,
        title: "Degree Verification & Gate Score (Optional)",
        instructions: "Input engineering stream details and aggregate percentage (minimum 60% or equivalent CGPA).",
      },
      {
        stepNum: 3,
        title: "Application Submission",
        instructions: "Verify uploaded degree certificate and photo specs. Pay application fee of ₹800 (SC/ST/Women/PwD exempted).",
      },
    ],
    specifications: {
      photoSpec: "White background, JPEG format, 50KB - 100KB",
      signatureSpec: "Black or dark blue ink, 20KB - 50KB",
      feeGeneral: "₹800",
      feeReserved: "NIL (100% Fee Exemption for Women, SC, ST, PwD)",
    },
  },
  {
    id: "ibps-po-2026",
    slug: "ibps-po",
    title: "Probationary Officer (PO) / Management Trainee Batch 2026-27",
    organization: "Institute of Banking Personnel Selection (IBPS) & 11 PSBs",
    shortOrg: "IBPS",
    category: "BANKING",
    categoryLabel: "Banking & PSU",
    badges: [
      { text: "Public Sector Bank", tone: "emerald" },
      { text: "Prelims in 45 Days", tone: "amber" },
    ],
    salary: "₹48,480 Initial Basic + Special Allowance & Perks",
    salaryNum: 82000,
    vacancies: 4455,
    vacanciesDisplay: "4,455 Vacancies",
    eligibleQual: "GRADUATE",
    eligibleQualDisplay: "Graduate in any discipline",
    stream: "General / Any Stream",
    location: "All India Branches",
    scope: "PAN_INDIA",
    deadlineDate: "2026-11-03",
    deadlineDisplay: "3 Nov 2026",
    daysRemaining: 10,
    isClosingSoon: false,
    officialNoticeUrl: "https://www.ibps.in",
    officialApplyUrl: "https://ibps.in/crp-po-mt-xvi",
    roadmapId: "ibps-po",
    mockTestId: "sbi-po-mock",
    steps: [
      {
        stepNum: 1,
        title: "CRP PO/MT Online Registration",
        instructions: "Navigate to CRP PO/MT section on ibps.in and generate provisional registration number and password.",
      },
      {
        stepNum: 2,
        title: "Bank Preferences Selection",
        instructions: "Order your preferred Participating Banks (PNB, BoB, Canara, Union Bank, etc.) before saving.",
      },
      {
        stepNum: 3,
        title: "Handwritten Declaration & Biometrics",
        instructions: "Write the prescribed declaration in English on white paper with black ink and scan thumb impression.",
      },
    ],
    specifications: {
      photoSpec: "Recent passport style color picture, 20KB - 50KB",
      signatureSpec: "Black ink scan, 10KB - 20KB; Left thumb impression: 20KB - 50KB",
      feeGeneral: "₹850 (General / EWS / OBC)",
      feeReserved: "₹175 (SC / ST / PwBD)",
    },
  },
  {
    id: "ssc-selection-post-xii",
    slug: "ssc-selection-post",
    title: "Technical Assistant, Statistical Assistant & Sub-Post Officers",
    organization: "Staff Selection Commission (SSC Selection Post XII)",
    shortOrg: "SSC",
    category: "COMMISSION",
    categoryLabel: "Staff Selection",
    badges: [
      { text: "Commission Notice", tone: "emerald" },
      { text: "Permanent Govt Role", tone: "indigo" },
      { text: "Tier-1 in Dec", tone: "amber" },
    ],
    salary: "₹35,400 – ₹1,12,400 (Level 6 - 7 Matrix)",
    salaryNum: 112400,
    vacancies: 2049,
    vacanciesDisplay: "2,049 Posts",
    eligibleQual: "CLASS_12",
    eligibleQualDisplay: "10+2 / Diploma / Any Degree",
    stream: "General & Technical Streams",
    location: "State Cadres & Central Depts",
    scope: "CENTRAL",
    deadlineDate: "2026-11-02",
    deadlineDisplay: "Closes in 9 days: 2 Nov",
    daysRemaining: 9,
    isClosingSoon: true,
    officialNoticeUrl: "https://ssc.gov.in",
    officialApplyUrl: "https://ssc.gov.in/portal/login",
    roadmapId: "ssc-cgl",
    mockTestId: "ssc-cgl-tier1",
    steps: [
      {
        stepNum: 1,
        title: "SSC One-Time Registration (OTR)",
        instructions: "Login with your OTR credentials on ssc.gov.in (new portal). Verify live capture photo specs.",
      },
      {
        stepNum: 2,
        title: "Select Post Code & Level",
        instructions: "Choose relevant Post Category codes corresponding to your education (Matric, Higher Secondary, or Graduate).",
      },
      {
        stepNum: 3,
        title: "Live Camera Capture",
        instructions: "Use the SSC official app or desktop webcam in a well-lit room without spectacles or caps.",
      },
    ],
    specifications: {
      photoSpec: "Live webcam capture on new SSC portal (Plain white wall behind, face centered)",
      signatureSpec: "10KB - 20KB, black ink on white paper, clearly visible",
      feeGeneral: "₹100",
      feeReserved: "NIL (Exempted for Women, SC, ST, PwD, and ESM candidates)",
    },
  },
  {
    id: "isro-scientist-sc",
    slug: "isro-scientist-sc",
    title: "Scientist / Engineer 'SC' (Computer Science, Electronics, Mechanical)",
    organization: "Indian Space Research Organisation (ISRO) & DOS Centres",
    shortOrg: "ISRO / DOS",
    category: "TECH",
    categoryLabel: "Defence & Aerospace",
    badges: [
      { text: "Defence R&D", tone: "emerald" },
      { text: "Direct Interview / GATE", tone: "sky" },
    ],
    salary: "₹56,100 + DA + Special Performance Allowance",
    salaryNum: 95000,
    vacancies: 303,
    vacanciesDisplay: "303 Openings",
    eligibleQual: "BTECH",
    eligibleQualDisplay: "B.Tech / M.Tech in relevant discipline (Min 65% / CGPA 6.84)",
    stream: "Computer Science / IT",
    location: "ISRO Centres (BLR, VSSC, SAC)",
    scope: "CENTRAL",
    deadlineDate: "2026-11-18",
    deadlineDisplay: "18 Nov 2026",
    daysRemaining: 25,
    isClosingSoon: false,
    officialNoticeUrl: "https://www.isro.gov.in/Careers.html",
    officialApplyUrl: "https://apps.isac.gov.in/job-portal",
    mockTestId: "gate-cs-mock",
    steps: [
      {
        stepNum: 1,
        title: "ISRO ICRB Central Registration",
        instructions: "Access the ISRO Centralised Recruitment Board portal, select the advertisement number and branch.",
      },
      {
        stepNum: 2,
        title: "Academic Scorecard Verification",
        instructions: "Input semester-wise engineering marks. Aggregate must not be rounded off below 65.0%.",
      },
      {
        stepNum: 3,
        title: "Fee Payment & Application Slip",
        instructions: "Pay ₹250 application fee via SBI Collect. Retain printed application copy with barcode.",
      },
    ],
    specifications: {
      photoSpec: "Passport size color photograph, JPG format, 15KB - 40KB",
      signatureSpec: "10KB - 30KB on white paper with dark pen",
      feeGeneral: "₹250 (Refundable upon attending written test)",
      feeReserved: "₹250 (Full refund on appearing in written exam for SC/ST/Women/PwD)",
    },
  },
  {
    id: "ssc-capf-si",
    slug: "ssc-capf-si",
    title: "Sub-Inspector in Delhi Police & Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB)",
    organization: "Staff Selection Commission (SSC)",
    shortOrg: "SSC / MHA",
    category: "DEFENCE",
    categoryLabel: "Defence & Police",
    badges: [
      { text: "Central Armed Police Forces", tone: "emerald" },
      { text: "Physical + Written Exam", tone: "amber" },
    ],
    salary: "₹35,400 – ₹1,12,400 (Level 6 Pay Matrix)",
    salaryNum: 112400,
    vacancies: 4187,
    vacanciesDisplay: "4,187 Vacancies",
    eligibleQual: "GRADUATE",
    eligibleQualDisplay: "Bachelor's degree in any stream",
    stream: "General / Any Stream",
    location: "Pan-India Posting",
    scope: "PAN_INDIA",
    deadlineDate: "2026-11-10",
    deadlineDisplay: "10 Nov 2026",
    daysRemaining: 17,
    isClosingSoon: false,
    officialNoticeUrl: "https://ssc.gov.in",
    officialApplyUrl: "https://ssc.gov.in",
    roadmapId: "ssc-cgl",
    mockTestId: "ssc-cgl-tier1",
    steps: [
      {
        stepNum: 1,
        title: "SSC OTR Portal Login",
        instructions: "Verify physical standards eligibility (Height: 170cm for males, 157cm for females before proceeding).",
      },
      {
        stepNum: 2,
        title: "Driving License Upload (Delhi Police)",
        instructions: "Male candidates opting for Delhi Police SI must possess a valid LMV driving license on physical test date.",
      },
      {
        stepNum: 3,
        title: "Exam Centre & Submission",
        instructions: "Choose three regional exam centres within the same SSC sub-region. Pay ₹100 fee online.",
      },
    ],
    specifications: {
      photoSpec: "Live webcam capture on SSC portal with neutral expression and good lighting",
      signatureSpec: "10KB - 20KB, black ink signature",
      feeGeneral: "₹100",
      feeReserved: "NIL for Women, SC, ST, and Ex-Servicemen",
    },
  },
];

export const APPLICATION_WALKTHROUGH_STEPS = [
  {
    number: "01",
    title: "Photo & Signature Resizing",
    tagline: "Avoid 80% of instant portal rejects",
    description: "Ensure photo background is plain white (20KB - 50KB, JPG/JPEG). Signature must be on white paper with black ink (10KB - 20KB). Avoid selfies, spectacles, caps, or blurry mobile scans.",
    badge: "Specs Checklist & Pixel Guide",
    highlights: ["White Background", "200x230 px standard", "No glasses/hats", "Black ink only"],
  },
  {
    number: "02",
    title: "One-Time Registration (OTR)",
    tagline: "Single profile for all commission exams",
    description: "Register once on SSC, UPSC, or State PSC portals. Generate lifetime OTR credentials, verify Aadhaar or 10th marksheet roll number. OTR saves 90% of effort for all future cycle applications.",
    badge: "Step-by-Step OTR Portal Walkthrough",
    highlights: ["Aadhaar linked", "Single roll number", "Permanent ID", "Fast 1-click apply"],
  },
  {
    number: "03",
    title: "Fee Payment & Exemptions",
    tagline: "Claim 100% legitimate concessions",
    description: "Female candidates, SC/ST, and PwD categories enjoy 100% fee exemption on union commission tests. Use net banking, debit cards, or UPI. Always download the fee acknowledgment slip immediately.",
    badge: "Exemption Matrix & Challan Helper",
    highlights: ["UPI / NetBanking", "SC/ST/Female Free", "E-Receipt backup", "Challan offline"],
  },
  {
    number: "04",
    title: "PDF Submission Slip & Print",
    tagline: "Vital proof for Document Verification",
    description: "Always download the final confirmation PDF with application number. Store a digital copy in Google Drive and print two hard copies for Document Verification (DV) stages.",
    badge: "Submission Checklist & Backup Guide",
    highlights: ["Application Number", "2 Printed copies", "DigiLocker backup", "DV mandatory"],
  },
];

export const APPLICATION_FAQS = [
  {
    question: "How does MockPrep verify vacancies against fake employment circulars?",
    answer: "Every notification featured on MockPrep is cross-checked directly with the official Gazette of India, PIB Fact Check, and official commission domains (.gov.in / .nic.in). We never publish unverified WhatsApp forwards, coaching center rumors, or unofficial exam circulars.",
  },
  {
    question: "What happens if I make a typo in my OTR registration?",
    answer: "Most commissions (SSC, UPSC, IBPS) offer a dedicated 2 to 3-day correction window immediately after application closures. You can edit personal and academic details with a nominal correction fee (typically ₹200). However, your primary mobile number and email ID cannot usually be altered.",
  },
  {
    question: "Are final-year graduating students eligible to apply for IBPS or NIC?",
    answer: "Eligibility strictly depends on the cut-off declaration date specified in the official notification. If your final year degree result is officially published on or before the commission's cut-off date (e.g. 1st August or application closing date), you are eligible to appear.",
  },
  {
    question: "Is there any cost for downloading PDFs or viewing MockPrep guides?",
    answer: "No. MockPrep is a 100% free public preparation launchpad. All syllabus breakdowns, job application checklists, previous year question vaults, and timed mock tests are completely free forever without paywalls or subscriptions.",
  },
];

export const DEADLINE_CALENDAR = [
  {
    day: "Monday",
    date: "28 Oct",
    title: "LIC AAO (300 Posts)",
    status: "Last Day to Apply",
    tone: "rose" as const,
    href: "#lic-aao-2026",
  },
  {
    day: "Thursday",
    date: "31 Oct",
    title: "SSC Selection Post XII",
    status: "4 Days Left",
    tone: "amber" as const,
    href: "#ssc-selection-post-xii",
  },
  {
    day: "Friday",
    date: "14 Nov",
    title: "NIC Cloud Engineer (461 Posts)",
    status: "Closing This Friday",
    tone: "emerald" as const,
    href: "#nic-scientist-b",
  },
  {
    day: "Sunday",
    date: "18 Nov",
    title: "ISRO Scientist 'SC'",
    status: "Exam Center Allocation",
    tone: "indigo" as const,
    href: "#isro-scientist-sc",
  },
];
