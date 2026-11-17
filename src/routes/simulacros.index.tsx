import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/simulacros"];
export const Route = createFileRoute("/simulacros/")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros" showItems={false}><p>Disponibles: cuatro prácticas de 40 preguntas originales cada una, con tiempo configurable y resultados al entregar. Elige tu perfil.</p></ModulePage> });
