import { useRouterState } from "@tanstack/react-router";
import { LEGAL_OWNER } from "@/lib/legal-content";

const PROFILE_NAMES: Record<string, string> = { "ingreso-docente": "ingreso docente", "ascenso-reubicacion": "ascenso y reubicación", rector: "rector", coordinador: "coordinador" };

/** Mensaje que llega escrito según la sección desde donde escribe la persona. */
export function whatsappMessage(path: string): string {
  const profile = Object.keys(PROFILE_NAMES).find(p => path.includes(p));
  if (path.startsWith("/planes") || path.startsWith("/pago")) return "Hola, quiero información sobre los planes de Educalex.";
  if (path.startsWith("/asesoria-investigacion")) return "Hola, Dra. Enadis. Quiero información sobre la asesoría en investigación.";
  if (path.startsWith("/simulacros")) return profile ? `Hola, tengo una pregunta sobre el simulacro de ${PROFILE_NAMES[profile]} en Educalex.` : "Hola, tengo una pregunta sobre los simulacros de Educalex.";
  if (path.startsWith("/concursos")) return profile ? `Hola, quiero prepararme para el concurso de ${PROFILE_NAMES[profile]} con Educalex.` : "Hola, quiero prepararme para el concurso docente con Educalex.";
  if (path.startsWith("/mi-") || path.startsWith("/ingresar") || path.startsWith("/registro")) return "Hola, necesito ayuda con mi cuenta de Educalex.";
  return "Hola, quiero información sobre Educalex.";
}

export const WHATSAPP_NUMBER = LEGAL_OWNER.phone.replace(/\D/g, "");

/** Botón flotante de WhatsApp, sobre el de EducatIA. */
export function WhatsappLauncher() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/admin")) return null;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(path))}`;
  return <a href={href} target="_blank" rel="noopener noreferrer" className="whatsapp-launcher" aria-label="Escribir a Educalex por WhatsApp (se abre en una pestaña nueva)">
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.9 1 3.9.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4Z"/></svg>
    <span>WhatsApp</span>
  </a>;
}
