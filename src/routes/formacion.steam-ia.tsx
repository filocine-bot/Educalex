import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/formacion/steam-ia")({ beforeLoad: () => { throw redirect({ to: "/formacion/steam-robotica", statusCode: 301 }); } });
