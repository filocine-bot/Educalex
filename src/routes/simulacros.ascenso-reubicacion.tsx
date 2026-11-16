import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";

const page = pages["/simulacros/ascenso-reubicacion"];
export const Route = createFileRoute("/simulacros/ascenso-reubicacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/ascenso-reubicacion" showItems={false}><PracticeExam key="ascenso-reubicacion" profile="ascenso-reubicacion" /></ModulePage> });
