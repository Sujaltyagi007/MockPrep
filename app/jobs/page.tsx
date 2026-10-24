import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import { getJobGuides } from "@/lib/data/catalog";
import { getFeaturedTests } from "@/lib/data/tests";
import { MobileNav } from "@/components/layout/mobile-nav";
import { JobsPortal } from "@/components/jobs/jobs-portal";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ActivityTicker } from "@/components/layout/activity-ticker";

export const metadata: Metadata = {
  title: "Verified Job Radar & Application Guides · MockPrep",
  description: "Zero clickbait, zero fake circulars. Every government and public sector employment notification is verified with official commission portals and paired with step-by-step application walkthroughs.",
};

export default async function JobsPage() {
  const [tests, guides] = await Promise.all([getFeaturedTests(), getJobGuides()]);

  return (
    <Fragment>
      <ActivityTicker tests={tests} guides={guides} />
      <SiteHeader />
      <main className="flex-1 bg-white pb-16 md:pb-0">
        <JobsPortal />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
