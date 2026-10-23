-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('en', 'hi');

-- CreateEnum
CREATE TYPE "Qualification" AS ENUM ('CLASS_10', 'CLASS_12', 'DIPLOMA', 'GRADUATE', 'BTECH', 'POSTGRADUATE');

-- CreateEnum
CREATE TYPE "ExamCategory" AS ENUM ('CIVIL', 'BANKING_SSC', 'RAILWAYS', 'DEFENCE', 'STATE_PSC', 'TECH', 'TEACHING');

-- CreateEnum
CREATE TYPE "LifecycleStage" AS ENUM ('DISCOVER', 'PREPARE', 'PRACTICE', 'APPLY', 'JOIN');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SAVED', 'APPLIED', 'ADMIT_CARD', 'APPEARED', 'RESULT', 'SELECTED', 'JOINED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'EDITOR', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "name" TEXT,
    "preferredLang" "Lang" NOT NULL DEFAULT 'en',
    "qualification" "Qualification",
    "stateCode" TEXT,
    "birthDate" DATE,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "conductingBody" TEXT NOT NULL,
    "category" "ExamCategory" NOT NULL,
    "eligibleQuals" "Qualification"[],
    "officialUrl" TEXT,
    "summary" JSONB,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT,
    "difficulty" SMALLINT,
    "answerIndex" SMALLINT NOT NULL,
    "source" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_translations" (
    "questionId" UUID NOT NULL,
    "lang" "Lang" NOT NULL,
    "prompt" TEXT NOT NULL,
    "options" TEXT[],
    "explanation" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "question_translations_pkey" PRIMARY KEY ("questionId","lang")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "examId" UUID,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" "ExamCategory" NOT NULL,
    "durationMinutes" SMALLINT NOT NULL,
    "marksCorrect" DOUBLE PRECISION NOT NULL,
    "marksWrong" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "languages" "Lang"[] DEFAULT ARRAY['en']::"Lang"[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_sections" (
    "id" UUID NOT NULL,
    "testId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "position" SMALLINT NOT NULL,
    "name" JSONB NOT NULL,

    CONSTRAINT "test_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_questions" (
    "testId" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,

    CONSTRAINT "test_questions_pkey" PRIMARY KEY ("testId","questionId")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "testId" UUID NOT NULL,
    "lang" "Lang" NOT NULL DEFAULT 'en',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadlineAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "score" DOUBLE PRECISION,
    "correct" SMALLINT,
    "wrong" SMALLINT,
    "skipped" SMALLINT,
    "sectionScores" JSONB,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempt_answers" (
    "attemptId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "chosenIndex" SMALLINT,
    "markedReview" BOOLEAN NOT NULL DEFAULT false,
    "timeSpentMs" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "attempt_answers_pkey" PRIMARY KEY ("attemptId","questionId")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "examId" UUID,
    "title" JSONB NOT NULL,
    "organization" TEXT NOT NULL,
    "eligibleQuals" "Qualification"[],
    "ageLimit" JSONB NOT NULL,
    "vacancies" INTEGER,
    "applicationStart" DATE,
    "applicationEnd" DATE,
    "officialUrl" TEXT NOT NULL,
    "notificationUrl" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "verifiedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_steps" (
    "id" UUID NOT NULL,
    "jobPostingId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,
    "body" JSONB NOT NULL,
    "linkUrl" TEXT,

    CONSTRAINT "application_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "required_documents" (
    "id" UUID NOT NULL,
    "jobPostingId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "required_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmaps" (
    "id" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "title" JSONB NOT NULL,
    "totalWeeks" SMALLINT,

    CONSTRAINT "roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_steps" (
    "id" UUID NOT NULL,
    "roadmapId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,
    "title" JSONB NOT NULL,
    "body" JSONB,
    "weeks" SMALLINT,
    "testSlug" TEXT,

    CONSTRAINT "roadmap_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "useFor" TEXT NOT NULL,
    "category" "ExamCategory" NOT NULL,
    "isbn" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_books" (
    "examId" UUID NOT NULL,
    "bookId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,
    "note" JSONB,

    CONSTRAINT "exam_books_pkey" PRIMARY KEY ("examId","bookId")
);

-- CreateTable
CREATE TABLE "user_goals" (
    "userId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "stage" "LifecycleStage" NOT NULL DEFAULT 'DISCOVER',
    "roadmapStepId" UUID,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_goals_pkey" PRIMARY KEY ("userId","examId")
);

-- CreateTable
CREATE TABLE "user_applications" (
    "userId" UUID NOT NULL,
    "jobPostingId" UUID NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SAVED',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_applications_pkey" PRIMARY KEY ("userId","jobPostingId")
);

-- CreateTable
CREATE TABLE "alert_subscriptions" (
    "userId" UUID NOT NULL,
    "categories" "ExamCategory"[],
    "channels" TEXT[] DEFAULT ARRAY['web_push']::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alert_subscriptions_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "exams_slug_key" ON "exams"("slug");

-- CreateIndex
CREATE INDEX "questions_subject_topic_idx" ON "questions"("subject", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "tests_slug_key" ON "tests"("slug");

-- CreateIndex
CREATE INDEX "tests_status_category_idx" ON "tests"("status", "category");

-- CreateIndex
CREATE UNIQUE INDEX "test_sections_testId_position_key" ON "test_sections"("testId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "test_sections_testId_key_key" ON "test_sections"("testId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "test_questions_testId_position_key" ON "test_questions"("testId", "position");

-- CreateIndex
CREATE INDEX "attempts_userId_startedAt_idx" ON "attempts"("userId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "attempts_testId_score_idx" ON "attempts"("testId", "score" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "job_postings_slug_key" ON "job_postings"("slug");

-- CreateIndex
CREATE INDEX "job_postings_status_applicationEnd_idx" ON "job_postings"("status", "applicationEnd");

-- CreateIndex
CREATE UNIQUE INDEX "application_steps_jobPostingId_position_key" ON "application_steps"("jobPostingId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "required_documents_jobPostingId_position_key" ON "required_documents"("jobPostingId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_steps_roadmapId_position_key" ON "roadmap_steps"("roadmapId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "books_title_author_key" ON "books"("title", "author");

-- AddForeignKey
ALTER TABLE "question_translations" ADD CONSTRAINT "question_translations_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_sections" ADD CONSTRAINT "test_sections_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "test_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_steps" ADD CONSTRAINT "application_steps_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_documents" ADD CONSTRAINT "required_documents_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_steps" ADD CONSTRAINT "roadmap_steps_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_books" ADD CONSTRAINT "exam_books_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_books" ADD CONSTRAINT "exam_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_roadmapStepId_fkey" FOREIGN KEY ("roadmapStepId") REFERENCES "roadmap_steps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_applications" ADD CONSTRAINT "user_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_applications" ADD CONSTRAINT "user_applications_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "job_postings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_subscriptions" ADD CONSTRAINT "alert_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
