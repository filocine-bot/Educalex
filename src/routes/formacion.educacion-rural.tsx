import { createFileRoute } from "@tanstack/react-router";
import { TrainingCourseReader } from "@/components/training-course";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/educacion-rural"];
export const Route = createFileRoute("/formacion/educacion-rural")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/educacion-rural" showItems={false}><TrainingCourseReader key="/formacion/educacion-rural" path="/formacion/educacion-rural" /></ModulePage> });
