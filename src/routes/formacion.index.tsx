import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { CourseCatalog } from "@/components/course-catalog";
import { pages } from "@/lib/educalex-sitemap";
import { TrainingHighlights } from "@/components/training-highlights";

const page = pages["/formacion"];
export const Route = createFileRoute("/formacion/")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion"><TrainingHighlights /><CourseCatalog /></ModulePage> });
