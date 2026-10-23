import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { TestEditor } from "@/components/admin/test-builder/editor";
import { getDraft, getExamOptions } from "@/lib/admin/test-drafts";

export const metadata: Metadata = { title: "Check test - MockPrep Admin" };

export default function DraftPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <DraftLoader params={props.params} />
    </Suspense>
  );
}

async function DraftLoader({ params }: { params: Promise<{ id: string }> }) {
  await connection(); // always the latest save
  const { id } = await params;
  const [draft, exams] = await Promise.all([getDraft(id), getExamOptions()]);
  if (!draft) notFound();
  return <TestEditor key={draft.id} draftId={draft.id} initial={draft.data} liveSlug={draft.liveSlug} exams={exams} />;
}

function EditorSkeleton() {
  return (
    <div aria-hidden className="space-y-3">
      <div className="skeleton h-10 w-96 max-w-full rounded-xl" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton h-64 rounded-2xl" />
      ))}
    </div>
  );
}
