import { createFileRoute, redirect } from "@tanstack/react-router";
// Old resource links now live in dedicated modules.
export const Route = createFileRoute("/recursos/$recurso")({ beforeLoad: ({ params }) => {
  const map = { "guia-34": "/formacion/guia-34-pmi", "banco-de-preguntas": "/simulacros", progreso: "/mi-progreso", certificaciones: "/mis-certificados" } as const;
  throw redirect({ to: map[params.recurso as keyof typeof map] ?? "/", statusCode: 301 });
} });
