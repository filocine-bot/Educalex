import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Bot, ClipboardCheck, GraduationCap, Star, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/guia-de-uso"];
export const Route = createFileRoute("/guia-de-uso")({ head: () => pageHead(page.title, page.description), component: Guide });

const steps: { icon: typeof BookOpen; title: string; body: ReactNode }[] = [
  { icon: UserRound, title: "Crea tu cuenta gratuita y elige tu perfil", body: <>Regístrate en <Link to="/registro">Registrarse</Link> y, en la barra azul, elige tu perfil: ingreso docente, ascenso, coordinador, rector o directivo en ejercicio. El menú y los simulacros se ajustan a tu perfil y tu progreso se guarda en cualquier dispositivo.</> },
  { icon: BookOpen, title: "Estudia la norma con su infografía", body: <>En las pestañas <strong>Legislación educativa</strong>, <strong>Guías del MEN</strong> y <strong>Bibliografía</strong> haz clic en una norma: verás su organizador gráfico con ideas clave y lo que más se pregunta en el concurso. Descárgalo en PDF o abre el texto oficial.</> },
  { icon: GraduationCap, title: "Profundiza con cursos, videos y dilemas", body: <>Los <Link to="/formacion">cursos de autoestudio</Link>, los <Link to="/biblioteca/videos">videos del MEN</Link> por temática y los <Link to="/formacion/dilemas-educativos">dilemas educativos</Link> te ayudan a llevar la norma a casos reales.</> },
  { icon: ClipboardCheck, title: "Practica con los simulacros", body: <>En <Link to="/simulacros">Simulacros</Link> encuentras el modo juego por niveles (Básico gratis), el núcleo común de lectura crítica y razonamiento, el simulacro completo con tiempo, la psicotécnica y las competencias que evalúa la prueba. Revisa la explicación y el fundamento de cada respuesta.</> },
  { icon: Bot, title: "Pregunta a EducatIA", body: <>Si tienes dudas sobre una norma o un caso, abre <Link to="/docente-ia">EducatIA</Link>: responde con voz y cita la fuente. Contrasta siempre con el texto oficial.</> },
  { icon: Star, title: "Avanza a Premium y descarga tu constancia", body: <>Los niveles Intermedio (40 preguntas) y Avanzado (50 preguntas) se habilitan con un <Link to="/planes">pago único</Link>. Al superar el nivel Básico puedes descargar tu constancia de participación (no oficial).</> },
];

function Guide() {
  return <ModulePage path="/guia-de-uso" showItems={false} tight>
    <ol className="guide-steps">{steps.map((s, i) => <li key={s.title}><span className="guide-num">{i + 1}</span><div><h2><s.icon aria-hidden="true" /> {s.title}</h2><p>{s.body}</p></div></li>)}</ol>
    <p className="competency-sources">EDUCALEX es una plataforma de preparación con material original y fuentes oficiales enlazadas. No reemplaza las convocatorias ni los textos oficiales de la CNSC y del MEN.</p>
  </ModulePage>;
}
