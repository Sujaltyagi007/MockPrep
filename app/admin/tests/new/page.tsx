import type { Metadata } from "next";
import { TestImporter } from "@/components/admin/test-builder/importer";

export const metadata: Metadata = { title: "Create a test - MockPrep Admin" };

export default function NewTestPage() {
  return <TestImporter />;
}
