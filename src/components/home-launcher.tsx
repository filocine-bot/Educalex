import { Link, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";

/** Botón flotante para volver al inicio, visible en todas las páginas excepto en el inicio. */
export function HomeLauncher() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/" || path.startsWith("/admin")) return null;
  return <Link to="/" className="home-launcher" aria-label="Volver al inicio de EDUCALEX"><Home aria-hidden="true" /><span>Inicio</span></Link>;
}
