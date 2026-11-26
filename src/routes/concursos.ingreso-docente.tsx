import { Fold } from "@/components/fold";
import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { ProfileHome } from "@/components/prep-configurator";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { AcademicRouteModules } from "@/components/academic-route-modules";

import { CompetitionReferences } from "@/components/competition-references";

const page = pages["/concursos/ingreso-docente"];
export const Route = createFileRoute("/concursos/ingreso-docente")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/ingreso-docente" compact showItems={false} noticeAtEnd><ProfileHome profile="ingreso-docente" /><Fold title="Módulos de preparación"><AcademicRouteModules modules={page.academicModules} /></Fold><Fold title="Referentes y fuentes oficiales"><CompetitionReferences profile="ingreso-docente" /></Fold></ModulePage> });
