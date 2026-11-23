import { Link, useRouterState } from "@tanstack/react-router";
import { WhatsappIcon } from "@/components/brand-icons";
import { whatsappHref } from "@/components/whatsapp-launcher";
import robotMini from "@/assets/educatia-robot-mini.webp";

/** Accesos visibles en el encabezado: WhatsApp y EducatIA. */
export function HeaderQuick() {
  const path = useRouterState({ select: s => s.location.pathname });
  return <div className="header-quick">
    <a href={whatsappHref(path)} target="_blank" rel="noopener noreferrer" className="hq-whatsapp" aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"><WhatsappIcon /><span>Escríbenos</span></a>
    <Link to="/docente-ia" className="hq-educatia" aria-label="Abrir EducatIA, el asistente con voz"><img src={robotMini} width={56} height={56} alt="" aria-hidden="true" /><span>EducatIA</span></Link>
  </div>;
}
