"use client";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

const formatSize = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`);

export function FileDrop({ label, hint, file, onChange, }: { label: string; hint: string; file: File | null; onChange: (file: File | null) => void; }) {
  const id = useId();
  const [over, setOver] = useState(false);

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-forest/25 bg-forest-tint/60 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-forest">
          <FileText className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
          <p className="text-xs text-body">
            {label} · {formatSize(file.size)}
          </p>
        </div>
        <button type="button" onClick={() => onChange(null)} aria-label={`Remove ${file.name}`} className="grid size-9 place-items-center rounded-lg text-body hover:bg-white hover:text-ink">
          <X className="size-4" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <label htmlFor={id} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); const dropped = e.dataTransfer.files[0]; if (dropped) onChange(dropped); }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition",
        over ? "border-forest bg-forest-tint/60" : "border-black/15 bg-white hover:border-forest/50 hover:bg-sand/60",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest",
      )}
    >
      <UploadCloud className="size-8 text-forest" aria-hidden />
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="text-xs text-body">{hint}</span>
      <span className="mt-1 rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-white">Choose file</span>
      <input id={id} type="file" accept="application/pdf,.pdf,text/plain,.txt" className="sr-only" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
    </label>
  );
}
