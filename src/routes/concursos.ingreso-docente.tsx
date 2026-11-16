import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { AcademicRouteModules } from "@/components/academic-route-modules";

import { CompetitionReferences } from "@/components/competition-references";

const page = pages["/concursos/ingreso-docente"];
export const Route = createFileRoute("/concursos/ingreso-docente")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/ingreso-docente" compact showItems={false}><AcademicRouteModules modules={page.academicModules} /><CompetitionReferences profile="ingreso-docente" /></ModulePage> });
