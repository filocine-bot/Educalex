import { createFileRoute, redirect } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { COURSES_IN_CONSTRUCTION, pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/inteligencia-artificial"];
export const Route = createFileRoute("/formacion/inteligencia-artificial")({ beforeLoad: () => { const to = COURSES_IN_CONSTRUCTION["/formacion/inteligencia-artificial"]; if (to) throw redirect({ to, replace: true }); }, head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/inteligencia-artificial" /> });
