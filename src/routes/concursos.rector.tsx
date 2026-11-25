import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { ProfileStart } from "@/components/direct-pay";
import { ExamStructure } from "@/components/exam-structure";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";
import { Link } from "@tanstack/react-router";

const page = pages["/concursos/rector"];
export const Route = createFileRoute("/concursos/rector")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/rector" compact><ProfileStart profile="rector" /><Link to="/biblioteca" className="academic-library-link">Consultar normativa y convocatorias en Biblioteca General</Link><ExamStructure /><CompetitionReferences profile="rector" /></ModulePage> });
