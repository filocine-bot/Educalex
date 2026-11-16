import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/actualizacion-normativa"];
export const Route = createFileRoute("/formacion/actualizacion-normativa")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/actualizacion-normativa" /> });
