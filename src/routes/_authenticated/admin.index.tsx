import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { OfferDraftAdmin } from "@/components/offer-draft-admin";

const page = pages["/admin"];
export const Route = createFileRoute("/_authenticated/admin/")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/admin"><OfferDraftAdmin /></ModulePage> });
