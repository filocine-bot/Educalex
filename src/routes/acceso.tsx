import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/acceso")({ beforeLoad: () => { throw redirect({ to: "/ingresar", statusCode: 301 }); } });
