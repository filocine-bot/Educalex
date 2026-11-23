import { useRouterState } from "@tanstack/react-router";
import { LEGAL_OWNER } from "@/lib/legal-content";
import { WhatsappIcon } from "@/components/brand-icons";

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

export const whatsappHref = (path: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(path))}`;
export const WHATSAPP_NUMBER = LEGAL_OWNER.phone.replace(/\D/g, "");

/** Botón flotante de WhatsApp, sobre el de EducatIA. */
export function WhatsappLauncher() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/admin")) return null;
  const href = whatsappHref(path);
  return <a href={href} target="_blank" rel="noopener noreferrer" className="whatsapp-launcher" aria-label="Escribir a Educalex por WhatsApp (se abre en una pestaña nueva)">
    <WhatsappIcon className="whatsapp-launcher-icon" />
    <span>WhatsApp</span>
  </a>;
}
