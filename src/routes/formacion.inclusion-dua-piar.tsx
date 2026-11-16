import { createFileRoute } from "@tanstack/react-router";
import { TrainingCourseReader } from "@/components/training-course";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/inclusion-dua-piar"];
export const Route = createFileRoute("/formacion/inclusion-dua-piar")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/inclusion-dua-piar" showItems={false}><TrainingCourseReader key="/formacion/inclusion-dua-piar" path="/formacion/inclusion-dua-piar" /></ModulePage> });
