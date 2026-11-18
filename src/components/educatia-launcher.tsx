import { Link, useRouterState } from "@tanstack/react-router";
import robotMini from "@/assets/educatia-robot-mini.webp";

/** Botón flotante con el robot EducatIA, visible en todas las páginas excepto en la propia página del asistente. */
export function EducatiaLauncher() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/docente-ia") || path.startsWith("/admin")) return null;
  return (
    <Link to="/docente-ia" className="educatia-launcher" aria-label="Abrir EducatIA, el asistente con voz de EDUCALEX">
      <img src={robotMini} width={56} height={56} alt="" aria-hidden="true" />
      <span>Pregúntale a EducatIA</span>
    </Link>
  );
}
