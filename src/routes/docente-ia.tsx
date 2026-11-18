import { createFileRoute } from "@tanstack/react-router";
import { DocenteIaChat } from "@/components/docente-ia-chat";
import { pageHead } from "@/lib/educalex-content";
export const Route = createFileRoute("/docente-ia")({ head: () => pageHead("EducatIA", "EducatIA, asistente pedagógico de EDUCALEX: pregunta por escrito o con tu voz y escucha la respuesta."), component: Page });
function Page() { return <><div className="subpage-header"><div className="site-container"><h1>Educat<span>IA</span></h1><p className="section-description">Tu asistente pedagógico. Pregunta por escrito o con tu voz y escucha la respuesta en voz alta. Responde apoyado en la biblioteca de fuentes oficiales verificadas de EDUCALEX.</p></div></div><DocenteIaChat /></>; }
