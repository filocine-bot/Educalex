import { createFileRoute } from "@tanstack/react-router";
// En el artefacto no hay servidor: EducatIA usa la capacidad `sample` directamente desde la página.
export const Route = createFileRoute("/api/docente-ia")({});
