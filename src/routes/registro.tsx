import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth-form";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/registro"];
export const Route = createFileRoute("/registro")({ head: () => pageHead(page.title, page.description), component: () => <AuthForm mode="register" /> });
