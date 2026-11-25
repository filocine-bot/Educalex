import { ExamInfographic } from "@/components/exam-infographic";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy, ChartNoAxesCombined, Users, Settings, GraduationCap, FileText, CheckCircle2, BookOpen, ClipboardCheck, Scale, Rocket, Video, CalendarClock, ExternalLink, Play, Bot, Compass, UserPlus, Award, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import hero from "@/assets/educalex-hero-docentes.webp";
import robot from "@/assets/educalex-robot.webp";
import { libraryDocs } from "@/lib/educalex-sitemap";
import { questionsFor } from "@/lib/game-engine";
import { videoThemes } from "@/lib/official-videos";
import { trainingCourses } from "@/lib/training-courses";
import { LAUNCH_BUYERS, PRICES } from "@/lib/payments";
import { FounderCard } from "@/components/founder-card";
import { ShareQr } from "@/components/share-qr";
import { FaqList } from "@/components/faq-list";
import { faqs } from "@/lib/faq";
import { SampleQuestion } from "@/components/sample-question";
import { PresentationVideo } from "@/components/presentation-video";
import { dilemmas } from "@/lib/dilemmas";

export const Route = createFileRoute("/")({ head: () => pageHead("Preparación para el concurso docente 2026 en Colombia", "Simulacros tipo ICFES por niveles, normas verificadas en fuentes oficiales y cursos para docentes, coordinadores y rectores. Concurso CNSC, ascenso y reubicación. Empieza gratis."), component: Index });

const routes = [
  { to: "/concursos/ingreso-docente", sim: "/simulacros/ingreso-docente", icon: Trophy, title: "Ingreso a la Carrera Docente", text: "Prepárate y alcanza tu meta", tone: "blue", perks: ["Ruta de estudio por competencias", "Simulacro tipo ICFES en 3 niveles", "Núcleo común y prueba psicotécnica"] },
  { to: "/concursos/ascenso-reubicacion", sim: "/simulacros/ascenso-reubicacion", icon: ChartNoAxesCombined, title: "Ascenso y Reubicación Salarial", text: "Mejora tu perfil profesional", tone: "green", perks: ["Decreto Ley 1278 y evaluación", "Simulacro tipo ICFES en 3 niveles", "Guía 31 y desempeño docente"] },
  { to: "/concursos/rector", sim: "/simulacros/rector", icon: Users, title: "Concurso para Rector", text: "Lidera con excelencia", tone: "gold", perks: ["Gestión directiva y Guía 34", "Simulacro tipo ICFES en 3 niveles", "Dilemas de liderazgo escolar"] },
  { to: "/concursos/coordinador", sim: "/simulacros/coordinador", icon: Settings, title: "Concurso para Coordinador", text: "Gestiona y acompaña", tone: "red", perks: ["Convivencia y Ruta de Atención", "Simulacro tipo ICFES en 3 niveles", "Evaluación y SIEE"] },
] as const;
const totalQuestions = (["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador", "nucleo-comun"] as const).reduce((n, b) => n + questionsFor(b).length, 0);
const totalVideos = videoThemes.reduce((n, t) => n + t.videos.length, 0);
const stats = [
  { icon: Scale, value: libraryDocs.length, label: "normas y guías con infografía" },
  { icon: ClipboardCheck, value: totalQuestions, label: "preguntas tipo ICFES con explicación" },
  { icon: GraduationCap, value: Object.keys(trainingCourses).length + 1, label: "cursos de autoestudio" }, // + Guía 34 y PMI
  { icon: Video, value: totalVideos, label: "videos oficiales por temática" },
  { icon: Compass, value: dilemmas.length, label: "dilemas educativos interactivos" },
] as const;
const tryNow = [
  { to: "/simulacros", icon: Play, tag: "10 preguntas", title: "Simulacro nivel Básico", text: "Mide tu punto de partida con preguntas tipo ICFES.", tone: "blue" },
  { to: "/formacion/ruta-atencion-integral", icon: Scale, tag: "6 casos", title: "Ruta de Atención Integral", text: "Clasifica situaciones tipo I, II y III.", tone: "red" },
  { to: "/formacion/dilemas-educativos", icon: Compass, tag: `${dilemmas.length} dilemas`, title: "Dilemas educativos", text: "Decide y mira las consecuencias de cada opción.", tone: "green" },
  { to: "/docente-ia", icon: Bot, tag: "Con voz", title: "Pregúntale a EducatIA", text: "Resuelve dudas de normas y pedagogía.", tone: "gold" },
] as const;
const cop = (n: number) => `${n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })} COP`;
const priceCards = [
  { name: "Gratis", price: "$0 COP", note: "Para empezar hoy", items: ["Nivel Básico de todos los perfiles", "Simulacro completo con tiempo", "Biblioteca, cursos, videos y dilemas", "Constancia de participación"], cta: "Empieza gratis", to: "/registro", featured: false },
  { name: "Acceso docente", price: cop(PRICES.docente), note: "Pago único por perfil", items: ["Ingreso docente o Ascenso y reubicación", "Simulacro completo: 100 preguntas por niveles", "Núcleo común completo y mapa de errores"], cta: "Pagar ahora", to: "/planes", featured: true },
  { name: "Acceso directivo", price: cop(PRICES.directivo), note: "Pago único por perfil", items: ["Rector o Coordinador", "Simulacro completo: 100 preguntas por niveles", "Núcleo común completo y mapa de errores"], cta: "Pagar ahora", to: "/planes", featured: true },
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
    <section className="hx-hero">
      <img className="hx-hero-img" src={hero} width={1920} height={768} alt="Docentes colombianos sonrientes frente a una institución educativa, junto a la bandera de Colombia" fetchPriority="high" />
      <div className="site-container hx-hero-content">
        <p className="hx-hero-brand">EDUCALEX · Academia Inteligente de Educación</p>
        <h1 className="hx-hero-title">Prepárate para el <span className="text-gold">concurso docente</span> con normas verificadas y simulacros que te explican cada respuesta</h1>
        <p className="hx-hero-text">Biblioteca con infografías, {totalQuestions} preguntas tipo ICFES por niveles y cursos para docentes, coordinadores y rectores de Colombia. Empieza gratis.</p>
        <div className="hx-hero-actions">
          <Button variant="hero" size="lg" asChild><Link to="/registro">Empieza gratis <ArrowRight /></Link></Button>
          <SampleQuestion />
        </div>
        <a className="hx-simo" href="https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" target="_blank" rel="noopener noreferrer"><CalendarClock aria-hidden="true" /><span><strong>Concurso docente 2026 · vacantes reservadas para personas con discapacidad.</strong> {simo}</span></a>
      </div>
    </section>

    <PresentationVideo />

    <section className="site-container hx-goals" aria-labelledby="hx-goals-title">
      <h2 id="hx-goals-title" className="sr-only">Elige tu preparación</h2>
      <p className="hx-goals-free"><Sparkles aria-hidden="true" /> El nivel Básico de los cuatro perfiles es gratis. Elige el tuyo:</p>
      {routes.map(r => <article key={r.title} className={`hx-goal hx-tone-${r.tone}`}>
        <div className="hx-goal-band"><span className="hx-goal-icon"><r.icon aria-hidden="true" /></span></div>
        <div className="hx-goal-body">
          <h3><Link to={r.to}>{r.title}</Link></h3>
          <p>{r.text}</p>
          <ul>{r.perks.map(p => <li key={p}><CheckCircle2 aria-hidden="true" />{p}</li>)}</ul>
          <div className="hx-goal-actions"><Button variant="navy" asChild><Link to={r.to}>Ver preparación</Link></Button><Link to={r.sim} className="hx-goal-link">Hacer simulacro <ArrowRight aria-hidden="true" /></Link></div>
        </div>
      </article>)}
    </section>

    <section className="site-container hx-stats" aria-label="EDUCALEX en cifras">{stats.map(st => <div key={st.label} className="hx-stat"><st.icon aria-hidden="true" /><span><strong>{st.value}</strong>{st.label}</span></div>)}</section>

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

    <section className="site-container hx-prices" aria-labelledby="hx-prices-title">
      <div className="hx-section-head"><Award className="text-gold" aria-hidden="true" /><div><h2 id="hx-prices-title">Planes y precios</h2><p>Precios de lanzamiento en pesos colombianos (COP), válidos para las primeras {LAUNCH_BUYERS} compras. Pago único con Wompi, sin suscripción.</p></div></div>
      <div className="hx-price-grid">{priceCards.map(c => <article key={c.name} className={`hx-price ${c.featured ? "is-featured" : ""}`}>
        {c.featured && <span className="hx-price-flag">Todos los niveles</span>}
        <h3>{c.name}</h3>
        <p className="hx-price-value">{c.price}</p>
        <p className="hx-price-note">{c.note}</p>
        <ul>{c.items.map(i => <li key={i}><CheckCircle2 aria-hidden="true" />{i}</li>)}</ul>
        <Button variant={c.featured ? "hero" : "outline"} asChild><Link to={c.to}>{c.cta}</Link></Button>
      </article>)}</div>
    </section>

    <section className="site-container hx-news" aria-labelledby="hx-news-title">
      <div className="hx-news-head"><CalendarClock className="text-gold" /><div><h2 id="hx-news-title">Novedades verificadas del concurso 2026</h2><p>Actualizadas el 23 de noviembre de 2026. Confirma siempre en SIMO y en el micrositio de la CNSC.</p></div></div>
      <ExamInfographic />
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
