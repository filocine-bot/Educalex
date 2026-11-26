import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";
import { ExamBoard } from "@/components/exam-board";

const page = pages["/simulacros/ascenso-reubicacion"];
export const Route = createFileRoute("/simulacros/ascenso-reubicacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/ascenso-reubicacion" showItems={false} tight noticeAtEnd><ExamBoard key="ascenso-reubicacion" profile="ascenso-reubicacion" timed={<PracticeExam key="ascenso-reubicacion" profile="ascenso-reubicacion" />} /></ModulePage> });
