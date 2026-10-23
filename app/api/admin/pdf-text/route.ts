import { MAX_PDF_BYTES, PdfReadError, pdfToText } from "@/lib/import/pdf-text";

// PDF → plain text for the test builder. A Route Handler rather than a Server
// Action because Server Action bodies are capped at 1MB and question papers
// are often bigger. Parsing the text into questions happens in the browser so
// the reviewer can re-run it instantly.
//
// TODO(auth): /admin has no sign-in yet; protect this with the same check once it does.

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a PDF file to upload." }, { status: 400 });
  }
  if (file.size > MAX_PDF_BYTES) {
    return Response.json({ error: "This PDF is larger than 15 MB. Split it into smaller files." }, { status: 413 });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!(bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46)) {
    return Response.json({ error: "This file isn't a PDF." }, { status: 415 });
  }

  try {
    const { text, pages } = await pdfToText(bytes);
    return Response.json({ text, pages });
  } catch (error) {
    if (error instanceof PdfReadError) return Response.json({ error: error.message }, { status: 422 });
    console.error("pdf-text failed", error);
    return Response.json({ error: "Something went wrong reading this PDF. Try again, or paste the text instead." }, { status: 500 });
  }
}
