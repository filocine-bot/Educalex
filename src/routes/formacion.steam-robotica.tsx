import { createFileRoute } from "@tanstack/react-router";
import { TrainingCourseReader } from "@/components/training-course";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/steam-robotica"];
export const Route = createFileRoute("/formacion/steam-robotica")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/steam-robotica" showItems={false}><TrainingCourseReader key="/formacion/steam-robotica" path="/formacion/steam-robotica" /></ModulePage> });
