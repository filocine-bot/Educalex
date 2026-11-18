import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, ChartNoAxesCombined, Users, Settings, GraduationCap, FileText, CheckCircle2, BookOpen, ClipboardCheck, TrendingUp, Scale, Rocket, ShieldCheck, CalendarClock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import hero from "@/assets/educalex-hero-docentes.jpg";
import robot from "@/assets/educalex-robot.png";

export const Route = createFileRoute("/")({ head: () => pageHead("Inicio · Academia Inteligente de Educación", "Tu aliado en la preparación y formación docente en Colombia. Prepárate para los concursos y fortalece tus competencias con EDUCALEX."), component: Index });

const routes = [
  { to: "/concursos/ingreso-docente", icon: Trophy, title: "Ingreso a la Carrera Docente", text: "Prepárate y alcanza tu meta" },
  { to: "/concursos/ascenso-reubicacion", icon: ChartNoAxesCombined, title: "Ascenso y Reubicación Salarial", text: "Mejora tu perfil profesional" },
  { to: "/concursos/rector", icon: Users, title: "Concurso para Rector", text: "Lidera con excelencia" },
  { to: "/concursos/coordinador", icon: Settings, title: "Concurso para Coordinador", text: "Gestiona y acompaña" },
] as const;
const school = [{ t: "Guía 34 y autoevaluación institucional", to: "/formacion/guia-34-pmi" }, { t: "Educación inclusiva y DUA", to: "/formacion/inclusion-dua-piar" }, { t: "Convivencia y educación emocional", to: "/formacion/convivencia-escolar" }, { t: "STEAM e innovación educativa", to: "/formacion/steam-robotica" }, { t: "Liderazgo y gestión escolar", to: "/formacion/liderazgo-directivo" }] as const;
// Novedades verificadas en fuentes oficiales (CNSC y MEN). Actualizar cuando cambie el proceso.
const news = [
  { date: "6 nov. 2026", source: "CNSC", title: "Inscripciones para vacantes reservadas a personas con discapacidad", text: "Resolución 11673: 2.255 vacantes de los Procesos de Selección 2917 a 3006 de 2026. Inscripción en SIMO del 23 de noviembre de 2026 al 15 de enero de 2027.", href: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" },
  { date: "19 jun. 2026", source: "MEN", title: "Cómo se prepara el concurso docente", text: "MEN y CNSC trabajan en la prueba de aptitudes y competencias básicas, la valoración de antecedentes con arraigo territorial y la entrevista. Se actualiza el Manual de Funciones.", href: "https://www.mineducacion.gov.co/1780/w3-article-429273.html" },
  { date: "Vigente", source: "Decreto 2038/2016", title: "Puntaje mínimo de la prueba eliminatoria", text: "La prueba de aptitudes y competencias básicas es la única eliminatoria: 60/100 para docentes y 70/100 para directivos docentes.", href: "https://normograma.icfes.gov.co/docs/pdf/decreto_2038_2016.pdf" },
] as const;
const bottom = [
  { icon: BookOpen, title: "Biblioteca Normativa", to: "/biblioteca" },
  { icon: ClipboardCheck, title: "Simulacros y Banco de Preguntas", to: "/simulacros" },
  { icon: TrendingUp, title: "Seguimiento de tu progreso", to: "/mi-progreso" },
  { icon: ShieldCheck, title: "Fuentes oficiales verificadas", to: "/biblioteca/recursos" },
  { icon: Scale, title: "Basado en la normativa educativa colombiana", to: "/biblioteca/legislacion" },
] as const;

function Index() {
  return <>
    <section className="hx-hero">
      <img className="hx-hero-img" src={hero} width={1920} height={768} alt="Docentes colombianos sonrientes frente a una institución educativa, junto a la bandera de Colombia" fetchPriority="high" />
      <div className="site-container hx-hero-content">
        <h1>EDUCALEX</h1>
        <p className="hx-hero-title">Tu aliado en la preparación y <span className="text-gold">formación docente</span> en Colombia</p>
        <p className="hx-hero-text">Prepárate para los concursos, fortalece tus competencias y lidera la transformación educativa.</p>
        <Button variant="hero" size="lg" asChild><Link to="/concursos">Comenzar mi preparación <ArrowRight /></Link></Button>
      </div>
    </section>

    <div className="site-container"><div className="hx-routes">{routes.map(r => <Link to={r.to} key={r.title} className="hx-route"><span className="hx-route-icon"><r.icon /></span><span><strong>{r.title}</strong><small>{r.text}</small></span></Link>)}</div></div>

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
        <img src={robot} width={816} height={816} loading="lazy" alt="EducatIA, robot asistente de EDUCALEX con birrete" className="hx-robot" />
        <div className="hx-ia-body">
          <h2 className="hx-ia-title">EducatIA</h2>
          <p className="hx-ia-sub">Tu asistente pedagógico y normativo</p>
          <ul className="hx-checks">{["Resuelve tus dudas", "Consulta normatividad", "Te responde en voz alta"].map(s => <li key={s}><CheckCircle2 className="text-brand-blue" />{s}</li>)}</ul>
          <Button variant="navy" asChild><Link to="/docente-ia">Preguntar ahora <ArrowRight /></Link></Button>
        </div>
      </article>
    </section>

    <section className="site-container hx-news" aria-labelledby="hx-news-title">
      <div className="hx-news-head"><CalendarClock className="text-gold" /><div><h2 id="hx-news-title">Novedades verificadas del concurso 2026</h2><p>Revisadas en fuentes oficiales el 14 de noviembre de 2026. Confirma siempre en SIMO y en el micrositio de la CNSC.</p></div></div>
      <div className="hx-news-grid">{news.map(n => <a key={n.title} href={n.href} target="_blank" rel="noopener noreferrer" className="hx-news-item"><span className="hx-news-meta">{n.source} · {n.date}</span><strong>{n.title}</strong><span>{n.text}</span><span className="hx-news-link">Ver fuente oficial <ExternalLink className="size-3.5" /></span></a>)}</div>
    </section>

    <div className="site-container"><div className="hx-strip">{bottom.map(b => <Link key={b.title} to={b.to} className="hx-strip-item"><b.icon />{b.title}</Link>)}</div></div>

    <section className="hx-banner"><div className="site-container hx-banner-inner"><p>En EDUCALEX, tu vocación se potencia con <span className="text-gold">conocimiento</span></p><Button variant="hero" asChild><Link to="/registro"><Rocket /> Transforma tu futuro y el de la educación en Colombia</Link></Button></div></section>
  </>;
}
