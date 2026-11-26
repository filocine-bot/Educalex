import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { ProfileHome } from "@/components/prep-configurator";
import { StudyTopics } from "@/components/study-topics";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";

const page = pages["/concursos/coordinador"];
export const Route = createFileRoute("/concursos/coordinador")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/coordinador" compact showItems={false} noticeAtEnd><ProfileHome profile="coordinador" /><StudyTopics path="/concursos/coordinador" /><CompetitionReferences profile="coordinador" /></ModulePage> });
