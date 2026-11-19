import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { PracticeExam } from "@/components/practice-exam";
import { SimulationModes } from "@/components/practice-game";

const page = pages["/simulacros/ingreso-docente"];
export const Route = createFileRoute("/simulacros/ingreso-docente")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/simulacros/ingreso-docente" showItems={false} tight><SimulationModes key="ingreso-docente" profile="ingreso-docente"><PracticeExam key="ingreso-docente" profile="ingreso-docente" /></SimulationModes></ModulePage> });
