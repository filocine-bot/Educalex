import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Bot, ClipboardCheck, CreditCard, GraduationCap, KeyRound, Star, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/guia-de-uso"];
export const Route = createFileRoute("/guia-de-uso")({ head: () => pageHead(page.title, page.description), component: Guide });

const steps: { icon: typeof BookOpen; title: string; body: ReactNode }[] = [
  { icon: UserRound, title: "Crea tu cuenta gratis, solo con tu correo", body: <>Entra a <Link to="/registro">Registro</Link>, escribe tu correo, elige tu perfil (ingreso docente, ascenso y reubicación, coordinador, rector o directivo en ejercicio) y acepta la política de datos. Pulsa <strong>«Crear cuenta y recibir enlace»</strong> y abre el correo de EDUCALEX: con un clic quedas dentro. <strong>No usamos contraseñas.</strong></> },
  { icon: KeyRound, title: "Vuelve a entrar cuando quieras", body: <>En <Link to="/ingresar">Ingresar</Link> escribe solo tu correo y pulsa <strong>«Enviar enlace de acceso»</strong>. Abre el mensaje (revisa también spam) y pulsa <strong>«Entrar a mi cuenta»</strong>. Cada enlace sirve una sola vez; cuando lo necesites, pide otro.</> },
  { icon: ClipboardCheck, title: "Haz el simulacro gratis", body: <>En <Link to="/simulacros">Simulacros</Link> elige tu perfil y juega el nivel <strong>Básico (10 preguntas)</strong>, con la explicación y el fundamento de cada respuesta. También encuentras el núcleo común, la psicotécnica y las competencias que evalúa la prueba.</> },
  { icon: CreditCard, title: "Desbloquea el simulacro completo con un solo pago", body: <>Pulsa <strong>«Pagar ahora»</strong> en el simulacro, en <Link to="/planes">Planes</Link> o en el inicio. Se abre <strong>Wompi</strong> (tarjeta, PSE o Nequi): escribe tu nombre, <strong>tu correo</strong> y tu celular, y paga. Docentes (ingreso, ascenso y reubicación): $59.900. Directivos (rector, coordinador): $79.900. Pago único, sin renovación automática. <strong>Cada nivel pagado se puede presentar hasta 3 veces</strong> (el intento cuenta desde que lo inicias).</> },
  { icon: Star, title: "Después de pagar", body: <>Al aprobarse el pago vuelves a EDUCALEX con los niveles <strong>Intermedio (40)</strong> y <strong>Avanzado (50)</strong> desbloqueados. Si no tenías cuenta, se crea con el correo que escribiste en Wompi. Te llegan dos correos: el comprobante de Wompi y «Tu acceso a EDUCALEX». Para entrar otro día, usa ese mismo correo en Ingresar. Si pagaste por PSE y el pago queda en proceso, el acceso se activa solo cuando Wompi lo apruebe.</> },
  { icon: BookOpen, title: "Estudia la norma con su infografía", body: <>En <strong>Recursos</strong> (Legislación, Guías del MEN, Bibliografía y Videos) haz clic en una norma: verás su organizador gráfico con ideas clave y lo que más se pregunta en el concurso. Descárgalo en PDF o abre el texto oficial.</> },
  { icon: GraduationCap, title: "Profundiza con cursos y dilemas", body: <>Los <Link to="/formacion">cursos de autoestudio</Link> y los <Link to="/formacion/dilemas-educativos">dilemas educativos</Link> te ayudan a llevar la norma a casos reales.</> },
  { icon: Bot, title: "Pregunta a EducatIA", body: <>Si tienes dudas sobre una norma o un caso, abre <Link to="/docente-ia">EducatIA</Link>: responde con voz y cita la fuente. Contrasta siempre con el texto oficial.</> },
];

function Guide() {
  return <ModulePage path="/guia-de-uso" showItems={false} tight>
    <ol className="guide-steps">{steps.map((s, i) => <li key={s.title}><span className="guide-num">{i + 1}</span><div><h2><s.icon aria-hidden="true" /> {s.title}</h2><p>{s.body}</p></div></li>)}</ol>
    <p className="competency-sources">¿Problemas para entrar o con un pago? Escríbenos por <a href="https://wa.me/573018747379">WhatsApp</a> o a educalexcolombia@gmail.com con el correo que usaste y, si pagaste, la referencia de Wompi.</p>
    <p className="competency-sources">EDUCALEX es una plataforma de preparación con material original y fuentes oficiales enlazadas. No reemplaza las convocatorias ni los textos oficiales de la CNSC y del MEN.</p>
  </ModulePage>;
}
