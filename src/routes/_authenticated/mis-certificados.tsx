import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/mis-certificados"];
export const Route = createFileRoute("/_authenticated/mis-certificados")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/mis-certificados" /> });
