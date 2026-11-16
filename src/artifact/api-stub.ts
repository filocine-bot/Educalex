import { createFileRoute } from "@tanstack/react-router";
// En el artefacto no hay servidor: Docente IA usa la capacidad `sample` directamente desde la página.
export const Route = createFileRoute("/api/docente-ia")({});
