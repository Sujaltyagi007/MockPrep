import { Landmark, Compass, Cloud, Globe, BookOpen, Leaf, Shield, Cpu, Calculator, FileText, CheckCircle2 } from "lucide-react";

export interface VaultVolume {
  id: string;
  title: string;
  author: string;
  pageCount: string;
  category: "POLITY" | "MATH" | "TECH" | "CURRENT_AFFAIRS" | "HISTORY" | "SCIENCE";
  categoryLabel: string;
  badge: string;
  subBadges: string[];
  fileSize: string;
  description: string;
  downloadUrl: string;
  previewUrl: string;
  tableOfContents: string[];
  sampleNotes: string[];
}

export interface CheatSheet {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  points: string[];
  fileSize: string;
  downloadUrl: string;
}

export interface NcertBookSummary {
  id: string;
  classTier: "6-8" | "9-10" | "11-12";
  classLabel: string;
  title: string;
  subject: string;
  description: string;
  chaptersCount: number;
  pagesCount: number;
  fileSize: string;
  keyTopics: string[];
  downloadUrl: string;
}

export const VAULT_STATS = [
  { value: "250+", label: "Curated Vault Volumes", sub: "100% Free Public Archive" },
  { value: "40+", label: "NCERT Gist Summaries", sub: "Classes 6th to 12th" },
  { value: "10k+", label: "Downloaded Flashcards", sub: "Verified Explanations" },
  { value: "50+", label: "1-Page Cheat Sheets", sub: "Laminated High-Yield Grids" },
];

export const VAULT_CATEGORIES = [
  { id: "ALL", label: "All Vault Volumes (250)" },
  { id: "POLITY", label: "Polity & Constitution" },
  { id: "MATH", label: "Quantitative Math & Logic" },
  { id: "SCIENCE", label: "General Science & Tech" },
  { id: "HISTORY", label: "Current Affairs & History" },
  { id: "TECH", label: "System Design & IT" },
];

export const FEATURED_VAULT_VOLUMES: VaultVolume[] = [
  {
    id: "indian-polity-handbook",
    title: "Indian Polity & Constitutional Framework",
    author: "By M. Laxmikanth Digest",
    pageCount: "196 Pages",
    category: "POLITY",
    categoryLabel: "Civil & State PSC",
    badge: "CIVIL & STATE PSC",
    subBadges: ["CIVIL SERVICES", "BILINGUAL READY", "PDF 18.4 MB"],
    fileSize: "18.4 MB",
    description: "Comprehensive summary of all 395 Articles, 12 Schedules, landmark Supreme Court rulings, and constitutional bodies in crisp tabular notes.",
    downloadUrl: "#download-polity",
    previewUrl: "#preview-polity",
    tableOfContents: [
      "Historical Background & Constituent Assembly",
      "Preamble & Salient Features of the Constitution",
      "Fundamental Rights (Articles 12 to 35) & Writs",
      "Directive Principles & Fundamental Duties",
      "Parliament, President & Prime Minister Cabinet",
      "Judiciary: Supreme Court, High Courts & Judicial Review",
      "Constitutional & Non-Constitutional Bodies (Election Commission, CAG, UPSC)",
    ],
    sampleNotes: [
      "Article 32 is termed the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar.",
      "73rd & 74th Amendments created constitutional status for Panchayats and Municipalities.",
      "Kesavananda Bharati Case (1973) established the inviolable Basic Structure Doctrine.",
    ],
  },
  {
    id: "quantitative-aptitude-speed-hacks",
    title: "Quantitative Aptitude Speed Hacks & Vedic Shortcuts",
    author: "By R.S. Aggarwal & Vedic Methods",
    pageCount: "142 Pages",
    category: "MATH",
    categoryLabel: "Banking & SSC CGL",
    badge: "BANKING & SSC CGL",
    subBadges: ["FORMULA VAULT", "SPEED DRILLS", "PDF 12.2 MB"],
    fileSize: "12.2 MB",
    description: "450+ visual formula cards, mental arithmetic shortcuts for data interpretation, percentage tricks, and ratio balance methods.",
    downloadUrl: "#download-quant",
    previewUrl: "#preview-quant",
    tableOfContents: [
      "Vedic Arithmetic & Cross-Multiplication Rules",
      "Percentages, Fractions Equivalents & Chain Rules",
      "Profit, Loss, Discount & False Weight Problems",
      "Time, Speed, Distance, Trains & Relative Speed",
      "Time & Work, Pipes & Cisterns Efficiency Ratios",
      "Data Interpretation: Pie Charts, Radar & Table Tricks",
    ],
    sampleNotes: [
      "Convert common fractions instantly: 1/7 = 14.28%, 1/8 = 12.5%, 1/14 = 7.14%.",
      "Unit digit calculation using 4-cycle periodicity method for competitive tests.",
      "Alligation formula shortcut reduces weighted average steps from 2 minutes to 15 seconds.",
    ],
  },
  {
    id: "system-design-backend-vault",
    title: "System Design & Backend Architecture Interview Vault",
    author: "By Tech Engineering Faculty",
    pageCount: "178 Pages",
    category: "TECH",
    categoryLabel: "Tech & PSU Coding",
    badge: "TECH & PSU CODING",
    subBadges: ["SYSTEM DESIGN", "LEETCODE 250+", "PDF 15.8 MB"],
    fileSize: "15.8 MB",
    description: "Scalable distributed systems, caching patterns, database sharding, microservices architecture, and 250+ LeetCode / DSA core topic summaries.",
    downloadUrl: "#download-system-design",
    previewUrl: "#preview-system-design",
    tableOfContents: [
      "CAP Theorem, PACELC & Consistency Models",
      "Load Balancing (Round Robin, Consistent Hashing)",
      "Database Sharding, Replication & Write-Ahead Logs",
      "Distributed Caching: Redis, Memcached, Eviction Rules",
      "Message Queues (Kafka, RabbitMQ) & Event Sourcing",
      "Rate Limiting Algorithms (Token Bucket, Leaky Bucket)",
    ],
    sampleNotes: [
      "Consistent Hashing minimizes key remapping during cluster node resizing.",
      "Read-Through vs Write-Back caching trade-offs in low-latency systems.",
      "Database index B+ trees maintain sequential I/O efficiency for range scans.",
    ],
  },
  {
    id: "current-affairs-q1-2026",
    title: "Current Affairs Q1 2026 Master Digest & 300 MCQs",
    author: "By Editorial Team",
    pageCount: "110 Pages",
    category: "CURRENT_AFFAIRS",
    categoryLabel: "All Competitive Exams",
    badge: "ALL COMPETITIVE EXAMS",
    subBadges: ["JAN - MAR 2026", "300 MCQS", "PDF 9.1 MB"],
    fileSize: "9.1 MB",
    description: "Concise timeline of national policies, international summits, budget highlights, science missions, and 300 curated practice MCQs.",
    downloadUrl: "#download-current-affairs",
    previewUrl: "#preview-current-affairs",
    tableOfContents: [
      "Union Budget 2026-27 & Key Sectoral Allocations",
      "Space & Defence: ISRO Missions & DRDO Inductions",
      "Government Schemes & Welfare Portal Launches",
      "International Summits: G20, ASEAN & Bilateral MoUs",
      "Environmental Treaties & COP Resolutions",
      "300 Topic-Wise Practice Questions with Explanations",
    ],
    sampleNotes: [
      "PM Surya Ghar Scheme targets 1 crore rooftop solar installations across India.",
      "ISRO Gaganyaan unmanned orbital orbital test flight parameters summary.",
      "Key Reserve Bank of India policy repo rate revisions and liquidity mechanisms.",
    ],
  },
  {
    id: "modern-indian-history-timeline",
    title: "Modern Indian History & Freedom Struggle Timeline Notes",
    author: "By Spectrum & Bipan Chandra Gist",
    pageCount: "158 Pages",
    category: "HISTORY",
    categoryLabel: "UPSC & State PSC",
    badge: "UPSC & STATE PSC",
    subBadges: ["HISTORICAL TIMELINE", "BILINGUAL", "PDF 14.6 MB"],
    fileSize: "14.6 MB",
    description: "1757 to 1947 chronological timeline notes, Governor Generals' acts, tribal/peasant movements, and revolutionary phase summaries.",
    downloadUrl: "#download-history",
    previewUrl: "#preview-history",
    tableOfContents: [
      "Decline of Mughals & Rise of Regional States (1707–1764)",
      "Battle of Plassey (1757) & Buxar (1764) Consequences",
      "Revolt of 1857: Causes, Centers, Leaders & Suppression",
      "Socio-Religious Reform Movements (Brahmo, Arya Samaj)",
      "Moderate & Extremist Phases of Indian National Congress",
      "Gandhian Mass Movements: NCM, CDM & Quit India (1942)",
      "Cabinet Mission, Mountbatten Plan & Indian Independence Act",
    ],
    sampleNotes: [
      "Charter Acts of 1813, 1833, and 1853 centralized British legislative administration.",
      "Champaran Satyagraha (1917) was Gandhi's first civil disobedience action in India.",
      "Poona Pact (1932) between Ambedkar and Gandhi guaranteed reserved provincial seats.",
    ],
  },
  {
    id: "environmental-ecology-handbook",
    title: "Environmental Ecology, Biodiversity & Climate Policy",
    author: "By Shankar IAS Digest & UNEP",
    pageCount: "132 Pages",
    category: "SCIENCE",
    categoryLabel: "Civil Services",
    badge: "CIVIL SERVICES",
    subBadges: ["ECOLOGY & CONSERVATION", "MAPS INCLUDED", "PDF 11.4 MB"],
    fileSize: "11.4 MB",
    description: "Biosphere reserves, IUCN Red List status, national parks map, COP treaties, pollution laws, and environmental conventions in bullet format.",
    downloadUrl: "#download-ecology",
    previewUrl: "#preview-ecology",
    tableOfContents: [
      "Ecosystem Dynamics: Food Chains, Trophic Levels, Ecological Pyramids",
      "Terrestrial & Aquatic Biomes (Wetlands, Mangroves, Coral Reefs)",
      "Biodiversity Conservation: In-Situ vs Ex-Situ Mechanisms",
      "IUCN Critically Endangered Flora & Fauna in India",
      "Wildlife Protection Act (1972) & Schedules",
      "International Conventions: Ramsar, CITES, CMS, UNFCCC",
    ],
    sampleNotes: [
      "Project Tiger (1973) expanded to over 54 tiger reserves across 18 Indian states.",
      "Montreux Record flags Ramsar wetlands facing technological and human ecological shifts.",
      "Bio-magnification concentrates toxic persistent organic pollutants in apex predators.",
    ],
  },
];

export const REVISION_CHEAT_SHEETS: CheatSheet[] = [
  {
    id: "constitution-articles-sheet",
    title: "Constitution Articles Cheat Sheet",
    category: "Polity",
    badge: "1-Page PDF",
    description: "Fundamental Rights, DPSP, Writs, Emergency provisions on a single laminated sheet.",
    points: ["All 6 Fundamental Rights (Arts 14-32)", "Writs Comparison Table (Habeas Corpus to Quo-Warranto)", "Emergency Articles 352, 356, 360", "Constitutional Amendments Summary"],
    fileSize: "1.2 MB",
    downloadUrl: "#download-sheet-1",
  },
  {
    id: "trig-geometry-formulas",
    title: "Trigonometry & Geometry Formulas",
    category: "Quantitative",
    badge: "Formula Grid",
    description: "Coordinate geometry, mensuration, height & distance, standard triangles cheat sheet.",
    points: ["All Trigonometric Identities & Quad Values", "Circle Theorems & Tangent Properties", "Mensuration 2D & 3D Volume Formulas", "Centroid, Incenter & Orthocenter Rules"],
    fileSize: "1.6 MB",
    downloadUrl: "#download-sheet-2",
  },
  {
    id: "data-structures-complexity-grid",
    title: "Data Structures Complexity Grid",
    category: "Computer Science",
    badge: "Cheat Sheet",
    description: "Array, Linked List, Stack, Tree, Heap, Graph, Hash Table - best/worst time and space complexity table.",
    points: ["Sorting Algorithms Time & Space Matrix", "Graph Algorithms (Dijkstra, Bellman-Ford)", "Binary Search Tree vs AVL vs Red-Black", "Bitwise Hacks & Dynamic Programming Recipes"],
    fileSize: "1.4 MB",
    downloadUrl: "#download-sheet-3",
  },
  {
    id: "physics-si-units-laws",
    title: "Physics: SI Units & Core Laws",
    category: "General Science",
    badge: "Quick Sheet",
    description: "Standard units, dimensional analysis, electromagnetism laws, mechanics formulas summary.",
    points: ["Derived SI Units & Dimensional Formulas", "Newton's Laws & Gravitational Constants", "Optics: Lens & Mirror Equation Table", "Electromagnetism: Faraday & Fleming Rules"],
    fileSize: "1.1 MB",
    downloadUrl: "#download-sheet-4",
  },
];

export const NCERT_SUMMARIES: NcertBookSummary[] = [
  {
    id: "ncert-class-6-history",
    classTier: "6-8",
    classLabel: "Class 6th History",
    title: "Ancient India: Early Societies to Empires",
    subject: "History",
    description: "From hunter-gatherers to Harappa, Vedic era, and Ashoka's Dhamma. Complete concept map & timeline notes in simplified English.",
    chaptersCount: 11,
    pagesCount: 42,
    fileSize: "4.8 MB",
    keyTopics: ["Paleolithic to Neolithic tools", "Indus Valley city planning & seals", "Janapadas & Mahajanapadas", "Mauryan administrative system"],
    downloadUrl: "#download-ncert-6",
  },
  {
    id: "ncert-class-7-history",
    classTier: "6-8",
    classLabel: "Class 7th History",
    title: "Medieval Crafts, Towns & Mughal State",
    subject: "History",
    description: "Delhi Sultanate, architectural monuments, regional kingdoms, Akbar's administration, and Mansabdari system summaries.",
    chaptersCount: 10,
    pagesCount: 38,
    fileSize: "5.1 MB",
    keyTopics: ["Delhi Sultanate dynasties", "Mughal Empire administration", "Tribes, Nomads & Settled Communities", "Devotional Paths to the Divine"],
    downloadUrl: "#download-ncert-7",
  },
  {
    id: "ncert-class-9-history",
    classTier: "9-10",
    classLabel: "Class 9th History",
    title: "Themes in World History & Revolutions",
    subject: "History",
    description: "French Revolution, Russian Revolution, Rise of Nazism, Forest Society, Pastoralists in Modern World key pointers.",
    chaptersCount: 8,
    pagesCount: 36,
    fileSize: "4.4 MB",
    keyTopics: ["French Revolution (Estates General to Bastille)", "Socialism in Europe & Russian Revolution", "Nazism & Rise of Hitler", "Colonial Forest Laws in India & Java"],
    downloadUrl: "#download-ncert-9",
  },
  {
    id: "ncert-class-12-history",
    classTier: "11-12",
    classLabel: "Class 12th History",
    title: "Modern Indian History: Themes in History III",
    subject: "History",
    description: "Colonialism and Countryside, 1857 Revolt, Mahatma Gandhi & Nationalist Movement, Framing of the Constitution deep dive.",
    chaptersCount: 6,
    pagesCount: 48,
    fileSize: "6.2 MB",
    keyTopics: ["Permanent Settlement & Santhal Rebellion", "1857 Revolt representations", "Gandhi's mass mobilizations", "Constituent Assembly debates"],
    downloadUrl: "#download-ncert-12",
  },
];
