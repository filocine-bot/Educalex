import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/terminos"];
export const Route = createFileRoute("/terminos")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/terminos" /> });
