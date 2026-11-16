import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";


import { LearningAccount } from "@/components/learning-account";

const page = pages["/mis-resultados"];
export const Route = createFileRoute("/_authenticated/mis-resultados")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/mis-resultados" showItems={false}><LearningAccount view="results" /></ModulePage> });
