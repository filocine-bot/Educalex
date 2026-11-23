import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { AdminQuestionReview } from "@/components/admin-question-review";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/admin/preguntas"];
export const Route = createFileRoute("/_authenticated/admin/preguntas")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/admin/preguntas" showItems={false} tight><AdminQuestionReview /></ModulePage> });
