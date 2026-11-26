import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { ProfileHome } from "@/components/prep-configurator";
import { StudyTopics } from "@/components/study-topics";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";

const page = pages["/concursos/ascenso-reubicacion"];
export const Route = createFileRoute("/concursos/ascenso-reubicacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/ascenso-reubicacion" compact showItems={false} noticeAtEnd><ProfileHome profile="ascenso-reubicacion" /><StudyTopics path="/concursos/ascenso-reubicacion" /><CompetitionReferences profile="ascenso-reubicacion" /><div className="mod-notice mod-notice-end"><p><strong>No es el concurso de ingreso:</strong> esta ruta se dirige a docentes que ya pertenecen al servicio y buscan ascender o reubicarse según su régimen y las reglas aplicables. El concurso de ingreso está orientado a quienes aspiran a vincularse a la carrera docente.</p></div></ModulePage> });
