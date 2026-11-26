import { createFileRoute, redirect } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { COURSES_IN_CONSTRUCTION, pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/gestion-institucional"];
export const Route = createFileRoute("/formacion/gestion-institucional")({ beforeLoad: () => { const to = COURSES_IN_CONSTRUCTION["/formacion/gestion-institucional"]; if (to) throw redirect({ to, replace: true }); }, head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/gestion-institucional" /> });
