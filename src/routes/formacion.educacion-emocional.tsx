import { OfficialVideos } from "@/components/official-videos";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { COURSES_IN_CONSTRUCTION, pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/educacion-emocional"];
export const Route = createFileRoute("/formacion/educacion-emocional")({ beforeLoad: () => { const to = COURSES_IN_CONSTRUCTION["/formacion/educacion-emocional"]; if (to) throw redirect({ to, replace: true }); }, head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/educacion-emocional"><OfficialVideos path="/formacion/educacion-emocional" /></ModulePage> });
