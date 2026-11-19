import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { LegalDocument } from "@/components/legal-document";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { termsIntro, termsSections } from "@/lib/legal-content";

const page = pages["/terminos"];
export const Route = createFileRoute("/terminos")({
  head: () => pageHead(page.title, page.description),
  component: () => <ModulePage path="/terminos"><LegalDocument intro={termsIntro} sections={termsSections} /></ModulePage>,
});
