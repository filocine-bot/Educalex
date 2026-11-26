import { OfficialVideos } from "@/components/official-videos";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { COURSES_IN_CONSTRUCTION, pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/evaluacion-formativa"];
export const Route = createFileRoute("/formacion/evaluacion-formativa")({ beforeLoad: () => { const to = COURSES_IN_CONSTRUCTION["/formacion/evaluacion-formativa"]; if (to) throw redirect({ to, replace: true }); }, head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/evaluacion-formativa"><OfficialVideos path="/formacion/evaluacion-formativa" /></ModulePage> });
