import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestRunner } from "@/components/test/test-runner";
import { getPublishedTestSlugs, getTestBySlug } from "@/lib/data/tests";

export async function generateStaticParams() {
  const slugs = await getPublishedTestSlugs();
  return slugs.map((testId) => ({ testId }));
}

export async function generateMetadata(props: PageProps<"/test/[testId]">): Promise<Metadata> {
  const { testId } = await props.params;
  const test = await getTestBySlug(testId);
  return { title: test?.title ?? "Mock test" };
}

export default async function TestPage(props: PageProps<"/test/[testId]">) {
  const { testId } = await props.params;
  const test = await getTestBySlug(testId);
  if (!test) notFound();

  return <TestRunner test={test} />;
}
