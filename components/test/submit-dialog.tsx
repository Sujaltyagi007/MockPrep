"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRunningAttempt } from "@/context/test-session-context";

export function SubmitDialog() {
  const { test, attempt, confirmingSubmit, cancelSubmit, submit } = useRunningAttempt();
  const ref = useRef<HTMLDialogElement>(null);
  const unanswered = test.questions.length - Object.keys(attempt.answers).length;
  const markedForReview = attempt.marked.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (confirmingSubmit && !dialog.open) dialog.showModal();
    if (!confirmingSubmit && dialog.open) dialog.close();
  }, [confirmingSubmit]);

  return (
    <dialog ref={ref} onClose={cancelSubmit} aria-labelledby="submit-title" className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/40">
      <h2 id="submit-title" className="text-lg font-semibold text-ink">Submit your test?</h2>
      <p className="mt-2 text-slate-600">
        {unanswered === 0 ? "You have answered every question." : `${unanswered} question${unanswered === 1 ? " is" : "s are"} still unanswered.`}{" "}
        You can’t change answers after submitting.
      </p>
      {markedForReview > 0 && (
        <p className="mt-2 text-sm font-medium text-violet-700">
          {markedForReview} question{markedForReview === 1 ? " is" : "s are"} marked for review.
        </p>
      )}
      <div className="mt-6 flex gap-2">
        <Button variant="outline" autoFocus onClick={cancelSubmit} className="flex-1">
          Keep going
        </Button>
        <Button variant="success" onClick={submit} className="flex-1">
          Submit
        </Button>
      </div>
    </dialog>
  );
}
