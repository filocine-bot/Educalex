import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { LegalDocument } from "@/components/legal-document";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { privacyIntro, privacySections } from "@/lib/legal-content";

const page = pages["/privacidad"];
export const Route = createFileRoute("/privacidad")({
  head: () => pageHead(page.title, page.description),
  component: () => <ModulePage path="/privacidad"><LegalDocument intro={privacyIntro} sections={privacySections} /></ModulePage>,
});
