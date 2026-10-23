import { Faq } from "@/components/home/faq";
import { Fragment } from "react/jsx-runtime";
import { Hero } from "@/components/home/hero";
import { getFeaturedTests } from "@/lib/data/tests";
import { PlanTabs } from "@/components/home/plan-tabs";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getBooks, getExamsForMatcher, getJobGuides } from "@/lib/data/catalog";

export default async function HomePage() {
  const [tests, exams, guides, books] = await Promise.all([
    getFeaturedTests(),
    getExamsForMatcher(),
    getJobGuides(),
    getBooks(),
  ]);

  return (
    <Fragment>
      <SiteHeader />
      {/* Bottom padding keeps content clear of the mobile nav bar. */}
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <PlanTabs exams={exams} tests={tests} guides={guides} books={books} />
        <Faq />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
