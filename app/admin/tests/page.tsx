import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { listDrafts } from "@/lib/admin/test-drafts";
import { getAdminTests } from "@/lib/admin/admin-service";
import { TestsBoard } from "@/components/admin/test-builder/tests-board";

export const metadata: Metadata = { title: "Mock tests - MockPrep Admin" };

export default function TestsAdminPage() {
  return (
    <Suspense fallback={<div aria-hidden className="skeleton h-96 rounded-2xl" />}>
      <TestsData />
    </Suspense>
  );
}

async function TestsData() {
  await connection();
  const [tests, drafts] = await Promise.all([getAdminTests(), listDrafts().catch(() => [])]);
  return <TestsBoard tests={tests} drafts={drafts} />;
}
