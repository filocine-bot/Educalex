import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/liderazgo-pedagogico"];
export const Route = createFileRoute("/formacion/liderazgo-pedagogico")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/liderazgo-pedagogico" /> });
