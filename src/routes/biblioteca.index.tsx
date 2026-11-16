import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { LibraryCatalog } from "@/components/library-catalog";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/biblioteca"];
export const Route = createFileRoute("/biblioteca/")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/biblioteca"><LibraryCatalog /></ModulePage> });
