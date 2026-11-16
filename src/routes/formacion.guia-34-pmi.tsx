import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { Guia34Course } from "@/components/guia-34-course";

const page = pages["/formacion/guia-34-pmi"];
export const Route = createFileRoute("/formacion/guia-34-pmi")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/guia-34-pmi" showItems={false}><Guia34Course /></ModulePage> });
