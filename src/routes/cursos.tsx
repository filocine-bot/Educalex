import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/cursos")({ beforeLoad: () => { throw redirect({ to: "/formacion", statusCode: 301 }); } });
