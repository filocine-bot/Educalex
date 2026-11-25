import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { AdminAccountTools, AdminPaymentFix } from "@/components/admin-account-tools";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/admin/usuarios"];
export const Route = createFileRoute("/_authenticated/admin/usuarios")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/admin/usuarios"><AdminPaymentFix /><AdminAccountTools /></ModulePage> });
