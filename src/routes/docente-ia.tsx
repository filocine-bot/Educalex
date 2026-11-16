import { createFileRoute } from "@tanstack/react-router";
import { DocenteIaChat } from "@/components/docente-ia-chat";
import { pageHead } from "@/lib/educalex-content";
export const Route = createFileRoute("/docente-ia")({ head: () => pageHead("DOCENTE IA", "Asistente pedagógico de EDUCALEX: haz tu consulta educativa y recibe orientaciones prácticas."), component: Page });
function Page() { return <><div className="subpage-header"><div className="site-container"><h1>DOCENTE <span>IA</span></h1><p className="section-description">Asistente pedagógico con inteligencia artificial que responde apoyado en la biblioteca de fuentes oficiales verificadas de EDUCALEX.</p></div></div><DocenteIaChat /></>; }
