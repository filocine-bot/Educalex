import { createFileRoute, redirect } from "@tanstack/react-router";

// Dirección corta y fácil de recordar: /educatia lleva a la página del asistente.
export const Route = createFileRoute("/educatia")({ beforeLoad: () => { throw redirect({ to: "/docente-ia" }); } });
