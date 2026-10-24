import type { Metadata } from "next";
import { Faq } from "@/components/home/faq";
import { Fragment } from "react/jsx-runtime";
import { mockTestFaqs } from "@/lib/site-content";
import { getJobGuides } from "@/lib/data/catalog";
import { getPublishedTests } from "@/lib/data/tests";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ReadyBand } from "@/components/mock-tests/ready-band";
import { MockCatalog } from "@/components/mock-tests/mock-catalog";
import { WhyMockPrep } from "@/components/mock-tests/why-mockprep";
import { DrillSection } from "@/components/mock-tests/drill-section";
import { ActivityTicker } from "@/components/layout/activity-ticker";

export const metadata: Metadata = {
  title: "Mock Tests & Speed Drills",
  description: "Free full-length mock tests and topic drills in the real exam pattern, with negative marking, bilingual papers and instant section-wise results.",
};

export default async function MockTestsPage() {
  const [tests, guides] = await Promise.all([getPublishedTests(), getJobGuides()]);
  const mocks = tests.filter((t) => t.kind === "MOCK");
  const drills = tests.filter((t) => t.kind === "DRILL");

  return (
    <Fragment>
      <ActivityTicker tests={mocks} guides={guides} />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">
        <MockCatalog mocks={mocks} drillCount={drills.length} />
        <DrillSection drills={drills} />
        <WhyMockPrep />
        <Faq items={mockTestFaqs} description="Everything you need to know about MockPrep's mock tests." />
        <ReadyBand testCount={mocks.length} />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
