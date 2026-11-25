import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy, ChartNoAxesCombined, Users, Settings, GraduationCap, FileText, CheckCircle2, BookOpen, ClipboardCheck, Scale, Rocket, Video, CalendarClock, ExternalLink, Play, Bot, Compass, UserPlus, Award, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import hero from "@/assets/educalex-hero-docentes.webp";
import robot from "@/assets/educalex-robot.webp";
import { ProfilePayButton } from "@/components/direct-pay";
import { FounderCard } from "@/components/founder-card";
import { ShareQr } from "@/components/share-qr";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/faq";
import { PresentationVideo } from "@/components/presentation-video";
import { dilemmas } from "@/lib/dilemmas";

export const Route = createFileRoute("/")({ head: () => pageHead("Preparación para el concurso docente 2026 en Colombia", "Simulacros tipo ICFES por niveles, normas verificadas en fuentes oficiales y cursos para docentes, coordinadores y rectores. Concurso CNSC, ascenso y reubicación. Empieza gratis."), component: Index });

const routes = [
  { to: "/concursos/ingreso-docente", profile: "ingreso-docente" as const, sim: "/simulacros/ingreso-docente", icon: Trophy, title: "Ingreso a la Carrera Docente", text: "Prepárate y alcanza tu meta", tone: "blue", perks: ["Ruta de estudio por competencias", "Simulacro tipo ICFES en 3 niveles", "Núcleo común y prueba psicotécnica"] },
  { to: "/concursos/ascenso-reubicacion", profile: "ascenso-reubicacion" as const, sim: "/simulacros/ascenso-reubicacion", icon: ChartNoAxesCombined, title: "Ascenso y Reubicación Salarial", text: "Mejora tu perfil profesional", tone: "green", perks: ["Decreto Ley 1278 y evaluación", "Simulacro tipo ICFES en 3 niveles", "Guía 31 y desempeño docente"] },
  { to: "/concursos/rector", profile: "rector" as const, sim: "/simulacros/rector", icon: Users, title: "Concurso para Rector", text: "Lidera con excelencia", tone: "gold", perks: ["Gestión directiva y Guía 34", "Simulacro tipo ICFES en 3 niveles", "Dilemas de liderazgo escolar"] },
  { to: "/concursos/coordinador", profile: "coordinador" as const, sim: "/simulacros/coordinador", icon: Settings, title: "Concurso para Coordinador", text: "Gestiona y acompaña", tone: "red", perks: ["Convivencia y Ruta de Atención", "Simulacro tipo ICFES en 3 niveles", "Evaluación y SIEE"] },
] as const;
const tryNow = [
  { to: "/simulacros", icon: Play, tag: "10 preguntas", title: "Simulacro nivel Básico", text: "Mide tu punto de partida con preguntas tipo ICFES.", tone: "blue" },
  { to: "/formacion/ruta-atencion-integral", icon: Scale, tag: "6 casos", title: "Ruta de Atención Integral", text: "Clasifica situaciones tipo I, II y III.", tone: "red" },
  { to: "/formacion/dilemas-educativos", icon: Compass, tag: `${dilemmas.length} dilemas`, title: "Dilemas educativos", text: "Decide y mira las consecuencias de cada opción.", tone: "green" },
  { to: "/docente-ia", icon: Bot, tag: "Con voz", title: "Pregúntale a EducatIA", text: "Resuelve dudas de normas y pedagogía.", tone: "gold" },
] as const;
const steps = [
  { icon: UserPlus, title: "Elige tu perfil", text: "Docente, ascenso, coordinador o rector: la plataforma se organiza según tu meta." },
  { icon: BookOpen, title: "Estudia", text: "Biblioteca normativa con infografías, cursos de autoestudio y videos oficiales." },
  { icon: ClipboardCheck, title: "Practica", text: "Simulacros por niveles de dificultad, con la explicación y la norma de cada respuesta." },
  { icon: Award, title: "Recibe tu constancia", text: "Al superar el nivel Básico descarga tu constancia de participación." },
] as const;
// Inscripción SIMO de vacantes reservadas (Resolución 11673 de 2026, CNSC).
const SIMO_OPEN = Date.UTC(2026, 10, 23, 5), SIMO_CLOSE = Date.UTC(2027, 0, 16, 5);
function useSimoNotice() {
  const [text, setText] = useState("Inscripciones en SIMO del 23 de noviembre de 2026 al 15 de enero de 2027");
  useEffect(() => {
    const now = Date.now(), day = 86_400_000;
    if (now < SIMO_OPEN) { const n = Math.ceil((SIMO_OPEN - now) / day); setText(`Inscripciones en SIMO abren el 23 de noviembre · ${n === 1 ? "falta 1 día" : `faltan ${n} días`}`); }
    else if (now < SIMO_CLOSE) setText(`Inscripciones abiertas en SIMO hasta el 15 de enero de 2027 (quedan ${Math.ceil((SIMO_CLOSE - now) / day)} días). Población general: febrero de 2027, fecha preliminar`);
    else setText("Consulta en SIMO el estado de las inscripciones del concurso 2026");
  }, []);
  return text;
}
const school = [{ t: "Guía 34 y autoevaluación institucional", to: "/formacion/guia-34-pmi" }, { t: "Educación inclusiva y DUA", to: "/formacion/inclusion-dua-piar" }, { t: "Convivencia y educación emocional", to: "/formacion/convivencia-escolar" }, { t: "STEAM e innovación educativa", to: "/formacion/steam-robotica" }, { t: "Liderazgo y gestión escolar", to: "/formacion/liderazgo-directivo" }] as const;
// Novedades verificadas en fuentes oficiales (CNSC y MEN). Actualizar cuando cambie el proceso.
const news = [
  { date: "19 nov. 2026", source: "CNSC", title: "La oferta definitiva sube a 31.211 vacantes", text: "El Acuerdo 325 del 19 de noviembre de 2026 modifica el Acuerdo 303 del 21 de octubre, a solicitud de Riohacha y Malambo. La oferta pasa de 31.163 a 31.211 vacantes. Consulta la OPEC de tu entidad en SIMO.", href: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" },
  { date: "6 nov. 2026", source: "CNSC", title: "Inscripciones para vacantes reservadas a personas con discapacidad", text: "Resolución 11673: 2.255 vacantes de los Procesos de Selección 2917 a 3006 de 2026. Inscripción gratuita en SIMO, con certificado de discapacidad, del 23 de noviembre de 2026 al 15 de enero de 2027. Las demás vacantes se abren después (febrero de 2027, fecha preliminar).", href: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" },
  { date: "Vigente", source: "Decreto 2038/2016", title: "Puntaje mínimo de la prueba eliminatoria", text: "La prueba de aptitudes y competencias básicas es la única eliminatoria: 60/100 para docentes y 70/100 para directivos docentes.", href: "https://normograma.icfes.gov.co/docs/pdf/decreto_2038_2016.pdf" },
] as const;

function Index() {
  const simo = useSimoNotice();
  return <>
    <section className="hx-hero hx-hero-v2">
      <img className="hx-hero-img" src={hero} width={1920} height={768} alt="Docentes colombianos sonrientes frente a una institución educativa, junto a la bandera de Colombia" fetchPriority="high" />
      <div className="site-container hx-hero-content">
        <p className="hx-hero-brand">EDUCALEX · Academia Inteligente de Educación</p>
        <h1 className="hx-hero-title">Prepárate para el <span className="text-gold">concurso docente</span> con simulacros que te explican cada respuesta</h1>
        <nav className="hx-profiles" aria-labelledby="hx-profiles-title">
          <p id="hx-profiles-title" className="hx-profiles-title">Elige tu perfil · las primeras 10 preguntas son gratis</p>
          <ul>{routes.map(r => <li key={r.title} className={`hx-profile hx-tone-${r.tone}`}>
            <Link to={r.sim} className="hx-profile-name"><span className="hx-profile-icon"><r.icon aria-hidden="true" /></span>{r.title}</Link>
            <div className="hx-profile-actions">
              <Link to={r.sim} className="hx-profile-free">Prueba gratis</Link>
              <ProfilePayButton profile={r.profile} className="hx-profile-pay" />
            </div>
          </li>)}</ul>
        </nav>
        <a className="hx-simo" href="https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" target="_blank" rel="noopener noreferrer"><CalendarClock aria-hidden="true" /><span><strong>Concurso docente 2026 · vacantes reservadas para personas con discapacidad.</strong> {simo}</span></a>
      </div>
    </section>

    <PresentationVideo />

    <div className="site-container"><FounderCard compact /></div>

    <section className="site-container hx-try" aria-labelledby="hx-try-title">
      <div className="hx-section-head"><Sparkles className="text-gold" aria-hidden="true" /><div><h2 id="hx-try-title">Empieza hoy, sin pagar</h2><p>Herramientas interactivas abiertas para todos los perfiles.</p></div></div>
      <div className="hx-try-grid">{tryNow.map(t => <Link key={t.title} to={t.to} className={`hx-try-item hx-tone-${t.tone}`}><span className="hx-try-icon"><t.icon aria-hidden="true" /></span><span className="hx-try-tag">{t.tag}</span><strong>{t.title}</strong><span>{t.text}</span><span className="hx-try-go">Empezar <ArrowRight aria-hidden="true" /></span></Link>)}</div>
    </section>

    <section className="site-container hx-cards">
      <article className="hx-card hx-card-light">
        <div className="hx-card-head"><GraduationCap className="hx-card-icon" /><div><h2>Escuela de Formación Docente</h2><p>Cursos y talleres para tu desarrollo profesional</p></div></div>
        <ul className="hx-checks">{school.map(s => <li key={s.t}><CheckCircle2 className="text-gold" /><Link to={s.to} className="hover:underline">{s.t}</Link></li>)}</ul>
        <Button variant="navy" asChild><Link to="/formacion">Explorar cursos <ArrowRight /></Link></Button>
      </article>
      <article className="hx-card hx-card-dark">
        <div className="hx-card-head"><FileText className="hx-card-icon text-gold" /><div><h2>Guía 34 y Plan de Mejoramiento</h2><p>Gestiona con calidad y mejora continuamente</p></div></div>
        <ul className="hx-checks">{["Autoevaluación institucional", "Diseño del PMI", "Seguimiento y evaluación"].map(s => <li key={s}><CheckCircle2 className="text-gold" />{s}</li>)}</ul>
        <Button variant="hero" asChild><Link to="/formacion/guia-34-pmi">Acceder al módulo <ArrowRight /></Link></Button>
        <ClipboardCheck className="hx-card-deco" />
      </article>
      <article className="hx-card hx-card-ia">
        <img src={robot} width={400} height={400} loading="lazy" alt="EducatIA, robot asistente de EDUCALEX con birrete" className="hx-robot" />
        <div className="hx-ia-body">
          <h2 className="hx-ia-title">EducatIA</h2>
          <p className="hx-ia-sub">Tu asistente pedagógico y normativo</p>
          <ul className="hx-checks">{["Resuelve tus dudas", "Consulta normatividad", "Te responde en voz alta"].map(s => <li key={s}><CheckCircle2 className="text-brand-blue" />{s}</li>)}</ul>
          <Button variant="navy" asChild><Link to="/docente-ia">Preguntar ahora <ArrowRight /></Link></Button>
        </div>
      </article>
    </section>

    <section className="site-container hx-news" aria-labelledby="hx-news-title">
      <div className="hx-news-head"><CalendarClock className="text-gold" /><div><h2 id="hx-news-title">Novedades verificadas del concurso 2026</h2><p>Actualizadas el 23 de noviembre de 2026. Confirma siempre en SIMO y en el micrositio de la CNSC.</p></div></div>
      <div className="hx-news-grid">{news.map(n => <a key={n.title} href={n.href} target="_blank" rel="noopener noreferrer" className="hx-news-item"><span className="hx-news-meta">{n.source} · {n.date}</span><strong>{n.title}</strong><span>{n.text}</span><span className="hx-news-link">Ver fuente oficial <ExternalLink className="size-3.5" /></span></a>)}</div>
    </section>

    <section className="site-container hx-steps" aria-labelledby="hx-steps-title">
      <div className="hx-section-head"><Rocket className="text-gold" aria-hidden="true" /><div><h2 id="hx-steps-title">Cómo funciona</h2><p>Cuatro pasos para prepararte con orden. <Link to="/guia-de-uso" className="hx-inline-link">Ver la guía de uso</Link></p></div></div>
      <ol className="hx-steps-list">{steps.map((st, i) => <li key={st.title}><span className="hx-step-num">{i + 1}</span><st.icon aria-hidden="true" className="hx-step-icon" /><strong>{st.title}</strong><span>{st.text}</span></li>)}</ol>
    </section>

    <ShareQr />
    <section className="site-container hx-faq" aria-labelledby="hx-faq-title">
      <div className="hx-section-head"><HelpCircle className="text-gold" aria-hidden="true" /><div><h2 id="hx-faq-title">Preguntas frecuentes</h2><p>Lo que más nos preguntan antes de empezar.</p></div></div>
      <FaqList items={faqs.filter(f => f.home)} />
      <Link to="/preguntas-frecuentes" className="hx-faq-more">Ver todas las preguntas <ArrowRight aria-hidden="true" /></Link>
    </section>
    <section className="hx-banner"><div className="site-container hx-banner-inner"><p>En EDUCALEX, tu vocación se potencia con <span className="text-gold">conocimiento</span></p><Button variant="hero" asChild><Link to="/registro"><Rocket /> Transforma tu futuro y el de la educación en Colombia</Link></Button></div></section>
  </>;
}
