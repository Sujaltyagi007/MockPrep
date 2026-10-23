-- CreateTable
CREATE TABLE "test_drafts" (
    "id" UUID NOT NULL,
    "testId" UUID,
    "title" TEXT NOT NULL DEFAULT '',
    "questionCount" SMALLINT NOT NULL DEFAULT 0,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_drafts_testId_key" ON "test_drafts"("testId");

-- CreateIndex
CREATE INDEX "test_drafts_updatedAt_idx" ON "test_drafts"("updatedAt" DESC);

-- AddForeignKey
ALTER TABLE "test_drafts" ADD CONSTRAINT "test_drafts_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

