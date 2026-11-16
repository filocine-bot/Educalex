import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PmiWorkshop } from "@/components/pmi-workshop";

const page = pages["/formacion/talleres-pmi"];
export const Route = createFileRoute("/formacion/talleres-pmi")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/talleres-pmi"><PmiWorkshop /></ModulePage> });
