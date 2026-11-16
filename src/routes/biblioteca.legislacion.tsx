import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { LibraryCatalog } from "@/components/library-catalog";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/biblioteca/legislacion"];
export const Route = createFileRoute("/biblioteca/legislacion")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/biblioteca/legislacion"><LibraryCatalog shelf="/biblioteca/legislacion" /></ModulePage> });
