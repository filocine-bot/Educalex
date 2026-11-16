import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";

const page = pages["/simulacros/coordinador"];
export const Route = createFileRoute("/simulacros/coordinador")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/coordinador" showItems={false}><PracticeExam key="coordinador" profile="coordinador" /></ModulePage> });
