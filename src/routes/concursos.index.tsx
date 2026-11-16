import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/concursos"];
export const Route = createFileRoute("/concursos/")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos" /> });
