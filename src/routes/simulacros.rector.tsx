import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";
import { SimulationModes } from "@/components/practice-game";

const page = pages["/simulacros/rector"];
export const Route = createFileRoute("/simulacros/rector")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/rector" showItems={false}><SimulationModes key="rector" profile="rector"><PracticeExam key="rector" profile="rector" /></SimulationModes></ModulePage> });
