import { OfficialVideos } from "@/components/official-videos";
import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/evaluacion-formativa"];
export const Route = createFileRoute("/formacion/evaluacion-formativa")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/evaluacion-formativa"><OfficialVideos path="/formacion/evaluacion-formativa" /></ModulePage> });
