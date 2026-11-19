import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { VideoLibrary } from "@/components/official-videos";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/biblioteca/videos"];
export const Route = createFileRoute("/biblioteca/videos")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/biblioteca/videos"><VideoLibrary /></ModulePage> });
