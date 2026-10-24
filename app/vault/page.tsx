import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import { getJobGuides } from "@/lib/data/catalog";
import { getFeaturedTests } from "@/lib/data/tests";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { VaultPortal } from "@/components/vault/vault-portal";
import { ActivityTicker } from "@/components/layout/activity-ticker";

export const metadata: Metadata = {
  title: "Curated Study Vault, Handbooks & Free Digital Books · MockPrep",
  description:
    "Bilingual subject digests, NCERT mind maps, tabulated formula sheets, and standard reference handbooks for competitive aspirants. 100% free downloads, zero paywalls.",
};

export default async function VaultPage() {
  const [tests, guides] = await Promise.all([getFeaturedTests(), getJobGuides()]);

  return (
    <Fragment>
      <ActivityTicker tests={tests} guides={guides} />
      <SiteHeader />
      <main className="flex-1 bg-white pb-16 md:pb-0">
        <VaultPortal />
      </main>
      <SiteFooter />
      <MobileNav />
    </Fragment>
  );
}
