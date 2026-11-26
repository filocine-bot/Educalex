import { createFileRoute } from "@tanstack/react-router";
import { TrainingCourseReader } from "@/components/training-course";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/evaluacion-formativa"];
export const Route = createFileRoute("/formacion/evaluacion-formativa")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/evaluacion-formativa" showItems={false}><TrainingCourseReader key="/formacion/evaluacion-formativa" path="/formacion/evaluacion-formativa" /></ModulePage> });
