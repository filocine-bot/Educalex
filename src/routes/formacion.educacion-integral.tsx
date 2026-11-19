import { OfficialVideos } from "@/components/official-videos";
import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/formacion/educacion-integral"];
export const Route = createFileRoute("/formacion/educacion-integral")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/formacion/educacion-integral"><OfficialVideos path="/formacion/educacion-integral" /></ModulePage> });
