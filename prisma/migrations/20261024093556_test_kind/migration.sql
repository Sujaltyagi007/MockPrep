-- CreateEnum
CREATE TYPE "TestKind" AS ENUM ('MOCK', 'DRILL');

-- CreateEnum
CREATE TYPE "DrillSubject" AS ENUM ('QUANT', 'REASONING', 'GK', 'COMPUTER', 'ENGLISH');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MODERATE', 'HARD');

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "difficulty" "Difficulty",
ADD COLUMN     "drillSubject" "DrillSubject",
ADD COLUMN     "kind" "TestKind" NOT NULL DEFAULT 'MOCK';

-- CreateIndex
CREATE INDEX "tests_status_kind_idx" ON "tests"("status", "kind");
