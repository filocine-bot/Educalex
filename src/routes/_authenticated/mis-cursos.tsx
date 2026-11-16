import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

import { LearningAccount } from "@/components/learning-account";

const page = pages["/mis-cursos"];
export const Route = createFileRoute("/_authenticated/mis-cursos")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/mis-cursos" showItems={false}><LearningAccount view="courses" /></ModulePage> });
