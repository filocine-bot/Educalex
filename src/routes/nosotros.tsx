import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/resource-page";
import { pageHead } from "@/lib/educalex-content";
export const Route = createFileRoute("/nosotros")({ head: () => pageHead("Nosotros", "Conoce el propósito de EDUCALEX – Academia Inteligente de Educación en Colombia."), component: Page });
function Page() { return <ResourcePage title="Somos EDUCALEX" description="Tu aliado en la preparación y formación docente en Colombia." kind="about" />; }