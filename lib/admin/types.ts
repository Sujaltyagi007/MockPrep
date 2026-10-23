export type AdminRole = "SUPER_ADMIN" | "EDITOR";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export const DEFAULT_ADMIN: Admin = {
  id: "admin-1",
  name: "MockPrep Administrator",
  email: "admin@mockprep.org",
  role: "SUPER_ADMIN",
};

export interface AdminStats {
  totalTests: number;
  totalQuestions: number;
  totalJobs: number;
  totalStudents: number;
}

export interface RecentAttempt {
  id: string;
  studentName: string;
  testTitle: string;
  category: string;
  score: number;
  maxMarks: number;
  correct: number;
  wrong: number;
  submittedAt: string;
}

export interface AdminMockTest {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  durationMinutes: number;
  marksCorrect: number;
  marksWrong: number;
  questionCount: number;
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "IN_REVIEW" | "ARCHIVED";
  publishedAt?: string | null;
}

export interface AdminQuestion {
  id: string;
  topic: string;
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  languages: string[];
}

export interface AdminJobNotification {
  id: string;
  slug: string;
  title: string;
  organization: string;
  vacancies: number;
  eligibleQuals: string[];
  applicationEnd: string;
  status: "PUBLISHED" | "DRAFT";
  officialUrl: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR" | "STUDENT";
  phone?: string;
  qualification?: string;
  joinedAt: string;
  attemptsCount: number;
  status: "ACTIVE" | "PENDING";
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  urgent?: boolean;
  type: "TEST_SUBMISSION" | "NEW_STUDENT" | "JOB_EXPIRING" | "SYSTEM";
}
