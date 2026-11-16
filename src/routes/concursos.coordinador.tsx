import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";
import { Link } from "@tanstack/react-router";

const page = pages["/concursos/coordinador"];
export const Route = createFileRoute("/concursos/coordinador")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/coordinador" compact><Link to="/biblioteca" className="academic-library-link">Consultar normativa y convocatorias en Biblioteca General</Link><CompetitionReferences profile="coordinador" /></ModulePage> });
