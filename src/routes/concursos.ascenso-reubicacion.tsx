import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";
import { Link } from "@tanstack/react-router";

const page = pages["/concursos/ascenso-reubicacion"];
export const Route = createFileRoute("/concursos/ascenso-reubicacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/ascenso-reubicacion" compact><Link to="/biblioteca" className="academic-library-link">Consultar normativa y convocatorias en Biblioteca General</Link><CompetitionReferences profile="ascenso-reubicacion" /><div className="mod-notice"><p><strong>No es el concurso de ingreso:</strong> esta ruta se dirige a docentes que ya pertenecen al servicio y buscan ascender o reubicarse según su régimen y las reglas aplicables. El concurso de ingreso está orientado a quienes aspiran a vincularse a la carrera docente.</p></div></ModulePage> });
