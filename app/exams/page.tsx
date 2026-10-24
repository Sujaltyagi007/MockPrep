import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import { getFeaturedTests } from "@/lib/data/tests";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ExamDirectory } from "@/components/exams/exam-directory";
import { getExamDirectory, getJobGuides } from "@/lib/data/catalog";
import { ActivityTicker } from "@/components/layout/activity-ticker";
import { PreparationLifecycle } from "@/components/exams/preparation-lifecycle";

export const metadata: Metadata = {
  title: "Exams Directory",
  description: "Central and State competitive exams in one place: who conducts them, who can apply, free mock tests and official websites for the latest notification and syllabus.",
};

export default async function ExamsPage() {
  const [exams, tests, guides] = await Promise.all([getExamDirectory(), getFeaturedTests(), getJobGuides()]);

  return (
    <Fragment>
      <ActivityTicker tests={tests} guides={guides} />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">
        <ExamDirectory exams={exams} />
        <PreparationLifecycle />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
