import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage } from "@/components/resource-page";
import { pageHead } from "@/lib/educalex-content";
export const Route = createFileRoute("/nosotros")({ head: () => pageHead("Nosotros", "EDUCALEX, creada por la Dra. Enadis Ester Vargas Hernández, docente investigadora con más de 30 años de experiencia en educación en Colombia."), component: Page });
function Page() { return <ResourcePage title="Somos EDUCALEX" description="Tu aliado en la preparación y formación docente en Colombia." kind="about" />; }