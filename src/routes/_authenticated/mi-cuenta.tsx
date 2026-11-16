import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

import { LearningAccount } from "@/components/learning-account";

const page = pages["/mi-cuenta"];
export const Route = createFileRoute("/_authenticated/mi-cuenta")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/mi-cuenta" showItems={false}><LearningAccount view="account" /></ModulePage> });
