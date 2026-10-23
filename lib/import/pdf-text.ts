import "server-only";
import { extractTextItems, getDocumentProxy } from "unpdf";

export const MAX_PDF_BYTES = 15 * 1024 * 1024;

export class PdfReadError extends Error {}

/** Shown where the PDF's font gives no text for a glyph; the review step flags it. */
export const UNREADABLE = "�";

/** Devanagari vowel signs and other combining marks never take a space before them. */
const COMBINING = /^[ऀ-ःऺ-ॏ॑-ॗॢॣ]/;

/**
 * Plain text of a PDF with its line breaks rebuilt, since the question parser
 * relies on them. pdf.js hands back positioned text runs; a run starts a new
 * line when it moves vertically or the previous run ended a line.
 */
export async function pdfToText(bytes: Uint8Array): Promise<{ text: string; pages: number }> {
  let doc;
  try {
    doc = await getDocumentProxy(bytes);
  } catch {
    throw new PdfReadError("This file couldn't be opened as a PDF. It may be damaged or password-protected.");
  }

  const { totalPages, items } = await extractTextItems(doc);
  const pages = items.map((pageItems) => {
    let out = "";
    let lastY: number | null = null;
    let lastEnd = 0;
    for (const item of pageItems) {
      const str = item.str.replace(/\u0000/g, UNREADABLE);
      const lineHeight = Math.max(item.height, item.fontSize, 1);
      // 0.7: Hindi and Latin runs on one line can sit at noticeably different baselines.
      if (lastY !== null && Math.abs(item.y - lastY) > lineHeight * 0.7 && !out.endsWith("\n")) out += "\n";
      else if (out && !out.endsWith("\n") && !out.endsWith(" ") && !COMBINING.test(str) && item.x - lastEnd > lineHeight * 0.15) out += " ";
      out += str;
      if (item.hasEOL) out += "\n";
      lastY = item.y;
      lastEnd = item.x + item.width;
    }
    return out;
  });

  const text = pages.join("\n").trim();
  // Scanned PDFs have no text layer at all; a short answer key can legitimately be tiny.
  if (text.replace(/\s/g, "").length < 3) {
    throw new PdfReadError(
      "We couldn't find any text in this PDF. It's probably a scanned image — try a text-based PDF, or copy the questions and paste them instead.",
    );
  }
  return { text, pages: totalPages };
}
