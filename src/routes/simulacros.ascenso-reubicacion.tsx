import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";
import { SimulationModes } from "@/components/practice-game";

const page = pages["/simulacros/ascenso-reubicacion"];
export const Route = createFileRoute("/simulacros/ascenso-reubicacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/ascenso-reubicacion" showItems={false}><SimulationModes key="ascenso-reubicacion" profile="ascenso-reubicacion"><PracticeExam key="ascenso-reubicacion" profile="ascenso-reubicacion" /></SimulationModes></ModulePage> });
