import { Fold } from "@/components/fold";
import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { ProfileHome } from "@/components/prep-configurator";
import { StudyTopics } from "@/components/study-topics";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { CompetitionReferences } from "@/components/competition-references";

const page = pages["/concursos/rector"];
export const Route = createFileRoute("/concursos/rector")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/concursos/rector" compact showItems={false} noticeAtEnd><ProfileHome profile="rector" /><Fold title="Temas de estudio"><StudyTopics path="/concursos/rector" /></Fold><Fold title="Referentes y fuentes oficiales"><CompetitionReferences profile="rector" /></Fold></ModulePage> });
