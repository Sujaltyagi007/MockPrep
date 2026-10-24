import { Faq } from "@/components/home/faq";
import { Fragment } from "react/jsx-runtime";
import { Hero } from "@/components/home/hero";
import { getJobGuides } from "@/lib/data/catalog";
import { getFeaturedTests } from "@/lib/data/tests";
import { JobRadar } from "@/components/home/job-radar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedTests } from "@/components/home/featured-tests";
import { DailyChallenge } from "@/components/home/daily-challenge";
import { FeaturePillars } from "@/components/home/feature-pillars";
import { ActivityTicker } from "@/components/layout/activity-ticker";
import { AccessibilityBar } from "@/components/home/accessibility-bar";
import { SelectionRoadmap } from "@/components/home/selection-roadmap";
import { QualificationPicker } from "@/components/home/qualification-picker";

export default async function HomePage() {
  const [tests, guides] = await Promise.all([getFeaturedTests(), getJobGuides()]);

  return (
    <Fragment>
      <ActivityTicker tests={tests} guides={guides} />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <section aria-label="Highlights" className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
          <FeaturePillars testCount={tests.length} guideCount={guides.length} />
          <DailyChallenge />
        </section>
        <QualificationPicker tests={tests} />
        <FeaturedTests tests={tests} />
        <JobRadar guides={guides} />
        <SelectionRoadmap guides={guides} />
        <Testimonials />
        <Faq />
        <AccessibilityBar />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
