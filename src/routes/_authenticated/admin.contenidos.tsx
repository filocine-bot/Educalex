import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/admin/contenidos"];
export const Route = createFileRoute("/_authenticated/admin/contenidos")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/admin/contenidos" /> });
