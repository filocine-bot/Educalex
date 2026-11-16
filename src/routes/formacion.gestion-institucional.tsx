import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/gestion-institucional"];
export const Route = createFileRoute("/formacion/gestion-institucional")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/gestion-institucional" /> });
