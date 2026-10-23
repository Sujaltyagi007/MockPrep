import "server-only";
import {
  type Admin,
  type AdminNotification,
  type AdminStats,
  type RecentAttempt,
  type AdminMockTest,
  type AdminQuestion,
  type AdminJobNotification,
  type AdminUserItem,
  DEFAULT_ADMIN,
} from "./types";
import { prisma } from "@/lib/prisma";

export { DEFAULT_ADMIN };

// Built-in mock data for immediate out-of-the-box experience
const MOCK_TESTS: AdminMockTest[] = [
  {
    id: "test-1",
    slug: "upsc-prelims-gs-1",
    title: "UPSC CSE Prelims General Studies (Paper I)",
    summary: "Comprehensive standard mock test covering Indian Polity, History, Economy, and Current Affairs.",
    category: "CIVIL",
    durationMinutes: 120,
    marksCorrect: 2.0,
    marksWrong: -0.66,
    questionCount: 100,
    featured: true,
    status: "PUBLISHED",
    publishedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "test-2",
    slug: "ssc-cgl-tier-1-all-india",
    title: "SSC CGL 2026 Tier 1 Full Length Mock",
    summary: "Complete simulation covering Quantitative Aptitude, Reasoning, English, and General Awareness.",
    category: "BANKING_SSC",
    durationMinutes: 60,
    marksCorrect: 2.0,
    marksWrong: -0.5,
    questionCount: 100,
    featured: true,
    status: "PUBLISHED",
    publishedAt: "2026-04-02T14:30:00Z",
  },
  {
    id: "test-3",
    slug: "rrb-ntpc-stage-1-cbt",
    title: "RRB NTPC Stage 1 CBT Practice Set",
    summary: "Railway Recruitment Board standard computer-based test pattern with timer and negative marking.",
    category: "RAILWAYS",
    durationMinutes: 90,
    marksCorrect: 1.0,
    marksWrong: -0.33,
    questionCount: 100,
    featured: true,
    status: "PUBLISHED",
    publishedAt: "2026-04-10T09:00:00Z",
  },
  {
    id: "test-4",
    slug: "ibps-po-prelims-sprint",
    title: "IBPS PO Prelims Speed Booster Mock",
    summary: "Section-timed mock test for Banking PO aspirants focusing on DI, Arithmetic & Puzzles.",
    category: "BANKING_SSC",
    durationMinutes: 60,
    marksCorrect: 1.0,
    marksWrong: -0.25,
    questionCount: 100,
    featured: false,
    status: "DRAFT",
    publishedAt: null,
  },
  {
    id: "test-5",
    slug: "nda-mathematics-mock",
    title: "NDA & NA Exam: Paper I Mathematics",
    summary: "Defense services entrance test with 120 questions on Algebra, Trigonometry, and Calculus.",
    category: "DEFENCE",
    durationMinutes: 150,
    marksCorrect: 2.5,
    marksWrong: -0.83,
    questionCount: 120,
    featured: false,
    status: "PUBLISHED",
    publishedAt: "2026-04-18T11:00:00Z",
  },
];

const MOCK_QUESTIONS: AdminQuestion[] = [
  {
    id: "q-1",
    topic: "Indian Polity",
    category: "CIVIL",
    difficulty: "HARD",
    prompt: "Which of the following constitutional provisions empowers the Parliament to establish new States in India?",
    options: ["Article 1", "Article 2", "Article 3", "Article 4"],
    correctIndex: 1,
    explanation: "Article 2 empowers Parliament to admit into the Union, or establish, new States on terms and conditions as it thinks fit.",
    languages: ["en", "hi"],
  },
  {
    id: "q-2",
    topic: "Quantitative Aptitude",
    category: "BANKING_SSC",
    difficulty: "MEDIUM",
    prompt: "A train running at 72 km/h crosses a 200m long bridge in 20 seconds. What is the length of the train?",
    options: ["180 meters", "200 meters", "220 meters", "250 meters"],
    correctIndex: 1,
    explanation: "Speed = 72 * 5/18 = 20 m/s. Total distance in 20s = 400m. Length of train = 400 - 200 = 200 meters.",
    languages: ["en", "hi"],
  },
  {
    id: "q-3",
    topic: "General Science",
    category: "RAILWAYS",
    difficulty: "EASY",
    prompt: "Which gas is primarily responsible for the greenhouse effect on Earth?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctIndex: 1,
    explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities.",
    languages: ["en", "hi"],
  },
  {
    id: "q-4",
    topic: "History of Modern India",
    category: "CIVIL",
    difficulty: "MEDIUM",
    prompt: "The Champaran Satyagraha of 1917 was related to the grievances of which class of farmers?",
    options: ["Cotton growers", "Indigo cultivators", "Tea estate workers", "Opium farmers"],
    correctIndex: 1,
    explanation: "Mahatma Gandhi's first Satyagraha in India was against the Tinkathia system imposed on Indigo farmers in Champaran, Bihar.",
    languages: ["en", "hi"],
  },
  {
    id: "q-5",
    topic: "Logical Reasoning",
    category: "BANKING_SSC",
    difficulty: "MEDIUM",
    prompt: "If 'A + B' means A is the brother of B, and 'A * B' means A is the father of B, what does 'P * Q + R' mean?",
    options: ["P is the father of R", "P is the uncle of R", "P is the brother of R", "P is the son of R"],
    correctIndex: 0,
    explanation: "P is the father of Q, and Q is the brother of R. Therefore, P is also the father of R.",
    languages: ["en", "hi"],
  },
];

const MOCK_JOBS: AdminJobNotification[] = [
  {
    id: "job-1",
    slug: "ssc-cgl-2026",
    title: "Combined Graduate Level (CGL) 2026",
    organization: "Staff Selection Commission (SSC)",
    vacancies: 14500,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-05-31",
    status: "PUBLISHED",
    officialUrl: "https://ssc.gov.in",
  },
  {
    id: "job-2",
    slug: "upsc-civil-services-2026",
    title: "Civil Services Examination (CSE) 2026",
    organization: "Union Public Service Commission",
    vacancies: 1105,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-06-15",
    status: "PUBLISHED",
    officialUrl: "https://upsc.gov.in",
  },
  {
    id: "job-3",
    slug: "rrb-assistant-loco-pilot-2026",
    title: "Assistant Loco Pilot (ALP) & Technicians",
    organization: "Railway Recruitment Boards",
    vacancies: 18799,
    eligibleQuals: ["CLASS_10", "CLASS_12", "DIPLOMA", "BTECH"],
    applicationEnd: "2026-06-30",
    status: "PUBLISHED",
    officialUrl: "https://indianrailways.gov.in",
  },
  {
    id: "job-4",
    slug: "ibps-probationary-officer-xiv",
    title: "Probationary Officers / Management Trainees (CRP PO/MT-XIV)",
    organization: "Institute of Banking Personnel Selection",
    vacancies: 3955,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-07-21",
    status: "DRAFT",
    officialUrl: "https://ibps.in",
  },
];

const MOCK_RECENT_ATTEMPTS: RecentAttempt[] = [
  {
    id: "att-1",
    studentName: "Aarav Sharma",
    testTitle: "UPSC CSE Prelims General Studies (Paper I)",
    category: "CIVIL",
    score: 134.66,
    maxMarks: 200,
    correct: 74,
    wrong: 19,
    submittedAt: "2026-04-23T09:42:00Z",
  },
  {
    id: "att-2",
    studentName: "Priya Patel",
    testTitle: "SSC CGL 2026 Tier 1 Full Length Mock",
    category: "BANKING_SSC",
    score: 162.0,
    maxMarks: 200,
    correct: 84,
    wrong: 12,
    submittedAt: "2026-04-23T08:15:00Z",
  },
  {
    id: "att-3",
    studentName: "Vikramaditya Rao",
    testTitle: "RRB NTPC Stage 1 CBT Practice Set",
    category: "RAILWAYS",
    score: 81.33,
    maxMarks: 100,
    correct: 86,
    wrong: 14,
    submittedAt: "2026-04-22T19:30:00Z",
  },
  {
    id: "att-4",
    studentName: "Ananya Mukherjee",
    testTitle: "NDA & NA Exam: Paper I Mathematics",
    category: "DEFENCE",
    score: 212.5,
    maxMarks: 300,
    correct: 92,
    wrong: 21,
    submittedAt: "2026-04-22T17:10:00Z",
  },
  {
    id: "att-5",
    studentName: "Rohan Verma",
    testTitle: "SSC CGL 2026 Tier 1 Full Length Mock",
    category: "BANKING_SSC",
    score: 148.5,
    maxMarks: 200,
    correct: 78,
    wrong: 15,
    submittedAt: "2026-04-22T15:05:00Z",
  },
];

const MOCK_USERS: AdminUserItem[] = [
  {
    id: "u-1",
    name: "MockPrep Administrator",
    email: "admin@mockprep.org",
    role: "SUPER_ADMIN",
    joinedAt: "2026-01-01T00:00:00Z",
    attemptsCount: 0,
    status: "ACTIVE",
  },
  {
    id: "u-2",
    name: "Dr. K. Swaminathan",
    email: "swami.educator@mockprep.org",
    role: "EDITOR",
    joinedAt: "2026-01-15T12:00:00Z",
    attemptsCount: 0,
    status: "ACTIVE",
  },
  {
    id: "u-3",
    name: "Aarav Sharma",
    email: "aarav.sharma22@gmail.com",
    role: "STUDENT",
    phone: "+91 98765 43210",
    qualification: "GRADUATE",
    joinedAt: "2026-02-10T14:30:00Z",
    attemptsCount: 14,
    status: "ACTIVE",
  },
  {
    id: "u-4",
    name: "Priya Patel",
    email: "priya.p@outlook.com",
    role: "STUDENT",
    phone: "+91 97123 45678",
    qualification: "BTECH",
    joinedAt: "2026-02-18T10:15:00Z",
    attemptsCount: 22,
    status: "ACTIVE",
  },
  {
    id: "u-5",
    name: "Vikramaditya Rao",
    email: "vikram.rao@gmail.com",
    role: "STUDENT",
    phone: "+91 94455 66778",
    qualification: "CLASS_12",
    joinedAt: "2026-03-05T16:45:00Z",
    attemptsCount: 8,
    status: "ACTIVE",
  },
];

const MOCK_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "High Score Alert",
    message: "Aarav Sharma scored 134.66 / 200 in UPSC CSE Prelims GS-1 (Top 1% percentile).",
    createdAt: "2026-04-23T09:45:00Z",
    read: false,
    urgent: false,
    type: "TEST_SUBMISSION",
  },
  {
    id: "notif-2",
    title: "Job Application Deadline Nearing",
    message: "SSC CGL 2026 applications close in 7 days. Ensure notification guides are updated.",
    createdAt: "2026-04-23T07:00:00Z",
    read: false,
    urgent: true,
    type: "JOB_EXPIRING",
  },
  {
    id: "notif-3",
    title: "New Questions Awaiting Verification",
    message: "4 new bilingual questions submitted for Indian Polity topic.",
    createdAt: "2026-04-22T14:20:00Z",
    read: true,
    urgent: false,
    type: "SYSTEM",
  },
];

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [testCount, questionCount, jobCount, userCount] = await Promise.all([
      prisma.test.count(),
      prisma.question.count(),
      prisma.jobPosting.count(),
      prisma.user.count(),
    ]);

    return {
      totalTests: testCount > 0 ? testCount : MOCK_TESTS.length,
      totalQuestions: questionCount > 0 ? questionCount : 450,
      totalJobs: jobCount > 0 ? jobCount : MOCK_JOBS.length,
      totalStudents: userCount > 0 ? userCount : 1248,
    };
  } catch {
    return {
      totalTests: MOCK_TESTS.length,
      totalQuestions: 450,
      totalJobs: MOCK_JOBS.length,
      totalStudents: 1248,
    };
  }
}

export async function getRecentAttempts(): Promise<RecentAttempt[]> {
  try {
    const attempts = await prisma.attempt.findMany({
      take: 5,
      orderBy: { startedAt: "desc" },
      include: {
        test: { select: { title: true, category: true, marksCorrect: true, _count: { select: { questions: true } } } },
        user: { select: { name: true } },
      },
    });

    if (attempts.length === 0) return MOCK_RECENT_ATTEMPTS;

    return attempts.map((a) => ({
      id: a.id,
      studentName: a.user?.name || "Aspirant",
      testTitle: a.test.title,
      category: a.test.category,
      score: a.score ?? 0,
      maxMarks: (a.test._count.questions || 100) * a.test.marksCorrect,
      correct: a.correct ?? 0,
      wrong: a.wrong ?? 0,
      submittedAt: a.submittedAt?.toISOString() || a.startedAt.toISOString(),
    }));
  } catch {
    return MOCK_RECENT_ATTEMPTS;
  }
}

export async function getAdminTests(): Promise<AdminMockTest[]> {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { publishedAt: "desc" },
      include: { _count: { select: { questions: true } } },
    });

    if (tests.length === 0) return MOCK_TESTS;

    return tests.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      summary: t.summary,
      category: t.category,
      durationMinutes: t.durationMinutes,
      marksCorrect: t.marksCorrect,
      marksWrong: t.marksWrong,
      questionCount: t._count.questions,
      featured: t.featured,
      status: t.status,
      publishedAt: t.publishedAt?.toISOString() ?? null,
    }));
  } catch {
    return MOCK_TESTS;
  }
}

export async function getAdminQuestions(): Promise<AdminQuestion[]> {
  return MOCK_QUESTIONS;
}

export async function getAdminJobs(): Promise<AdminJobNotification[]> {
  return MOCK_JOBS;
}

export async function getAdminUsers(): Promise<AdminUserItem[]> {
  return MOCK_USERS;
}

export async function getAdminNotifications(): Promise<AdminNotification[]> {
  return MOCK_NOTIFICATIONS;
}
