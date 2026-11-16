import { createFileRoute } from "@tanstack/react-router";
import { TrainingCourseReader } from "@/components/training-course";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/convivencia-escolar"];
export const Route = createFileRoute("/formacion/convivencia-escolar")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/convivencia-escolar" showItems={false}><TrainingCourseReader key="/formacion/convivencia-escolar" path="/formacion/convivencia-escolar" /></ModulePage> });
