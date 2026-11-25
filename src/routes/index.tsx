import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Bot, ChartNoAxesCombined, CheckCircle2, ClipboardCheck, Compass, FileText, GraduationCap, Library, Mail, Play, Scale, Settings, ShieldCheck, Trophy, Users, Video } from "lucide-react";
import { pageHead } from "@/lib/educalex-content";
import hero from "@/assets/educalex-hero-docentes.webp";
import robot from "@/assets/educalex-robot.webp";
import { FounderSpotlight } from "@/components/founder-card";
import { ShareQr } from "@/components/share-qr";
import { ProfilePayButton } from "@/components/direct-pay";
import { WHATSAPP_NUMBER } from "@/components/whatsapp-launcher";
import { dilemmas } from "@/lib/dilemmas";
import { getProduct } from "@/lib/payments";
import { SOCIAL } from "@/lib/social";
import type { SimulationProfile } from "@/lib/simulation-bank";

export const Route = createFileRoute("/")({ head: () => pageHead("Preparación para el concurso docente 2026 en Colombia", "Simulacros tipo ICFES por niveles, normas verificadas en fuentes oficiales y cursos para docentes, coordinadores y rectores. Concurso CNSC, ascenso y reubicación. Empieza gratis."), component: Index });

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const priceOf = (p: SimulationProfile) => getProduct(`completo-${p}`)?.priceCOP ?? 0;

const freeTools = [
  { to: "/simulacros", icon: Play, tag: "10 preguntas", title: "Simulacro nivel Básico", text: "Mide tu punto de partida con preguntas tipo ICFES.", tone: "blue" },
  { to: "/formacion/ruta-atencion-integral", icon: Scale, tag: "6 casos", title: "Ruta de Atención Integral", text: "Clasifica situaciones tipo I, II y III.", tone: "red" },
  { to: "/formacion/dilemas-educativos", icon: Compass, tag: `${dilemmas.length} dilemas`, title: "Dilemas educativos", text: "Decide y mira las consecuencias de cada opción.", tone: "green" },
  { to: "/docente-ia", icon: Bot, tag: "Con voz", title: "Pregúntale a EducatIA", text: "Resuelve dudas de normas y pedagogía.", tone: "gold" },
] as const;

const programs = [
  { profile: "ingreso-docente", icon: Trophy, name: "Ingreso a la Carrera Docente", desc: "Para el concurso de méritos de la CNSC como docente de aula u orientador.", to: "/concursos/ingreso-docente", sim: "/simulacros/ingreso-docente" },
  { profile: "ascenso-reubicacion", icon: ChartNoAxesCombined, name: "Ascenso y Reubicación Salarial", desc: "Para docentes del Decreto Ley 1278 que suben de grado o de nivel salarial.", to: "/concursos/ascenso-reubicacion", sim: "/simulacros/ascenso-reubicacion" },
  { profile: "rector", icon: Users, name: "Concurso para Rector", desc: "Liderazgo y gestión directiva, administrativa, académica y comunitaria.", to: "/concursos/rector", sim: "/simulacros/rector" },
  { profile: "coordinador", icon: Settings, name: "Concurso para Coordinador", desc: "Convivencia, Ruta de Atención Integral, evaluación y acompañamiento.", to: "/concursos/coordinador", sim: "/simulacros/coordinador" },
] as const;

const sections = [
  { icon: GraduationCap, title: "Escuela de Formación Docente", text: "Cursos de autoestudio: inclusión, convivencia, evaluación, STEAM y más.", to: "/formacion", tone: "blue" },
  { icon: FileText, title: "Guía 34 y Plan de Mejoramiento", text: "Autoevaluación institucional, diseño y seguimiento del PMI.", to: "/formacion/guia-34-pmi", tone: "gold" },
  { icon: Scale, title: "Legislación educativa", text: "Normas con infografía y enlace a la fuente oficial.", to: "/biblioteca/legislacion", tone: "red" },
  { icon: BookMarked, title: "Guías del MEN", text: "Guías y orientaciones del Ministerio de Educación Nacional.", to: "/biblioteca/guias-men", tone: "green" },
  { icon: Library, title: "Bibliografía y recursos", text: "Políticas, lineamientos y documentos de consulta.", to: "/biblioteca/recursos", tone: "purple" },
  { icon: Video, title: "Videos educativos", text: "Videos oficiales del MEN por temática, con Lengua de Señas Colombiana.", to: "/biblioteca/videos", tone: "teal" },
  { icon: ClipboardCheck, title: "Simulacros", text: "Modo juego por niveles y simulacro completo con tiempo.", to: "/simulacros", tone: "navy" },
] as const;

const topics = ["Ley 115 de 1994", "Decreto 1278", "Ley 1620 y convivencia", "PIAR e inclusión", "Guía 34 y PMI", "Evaluación y SIEE"];

function Index() {
  return <div className="home2">
    <section className="h2-hero" aria-labelledby="h2-hero-title">
      <img className="h2-hero-img" src={hero} width={1920} height={768} alt="Docentes colombianos frente a una institución educativa, junto a la bandera de Colombia" fetchPriority="high" />
      <div className="h2-hero-fade" aria-hidden="true" />
      <div className="site-container h2-hero-inner">
        <p className="h2-kicker">EDUCALEX · Academia Inteligente de Educación</p>
        <h1 id="h2-hero-title">Tu próximo logro profesional comienza con una <span>buena preparación</span></h1>
        <p className="h2-hero-text">Prepárate para los concursos docentes, asciende en el escalafón y fortalece tu desarrollo profesional con simulacros explicados, formación especializada e inteligencia artificial.</p>
        <div className="h2-hero-actions">
          <a href="#gratis" className="h2-btn h2-btn-gold">Comenzar gratis <ArrowRight aria-hidden="true" /></a>
          <a href="#programas" className="h2-btn h2-btn-ghost">Conocer nuestros programas</a>
        </div>
        <Link to="/guia-de-uso" className="h2-hero-guide">¿Primera vez? Mira cómo funciona en 6 pasos <ArrowRight aria-hidden="true" /></Link>
        <ul className="h2-trust"><li><CheckCircle2 aria-hidden="true" /> Normas con fuente oficial</li><li><CheckCircle2 aria-hidden="true" /> Explicación en cada respuesta</li><li><CheckCircle2 aria-hidden="true" /> Pago único con Wompi</li></ul>
      </div>
    </section>

    <section id="gratis" className="site-container h2-section" aria-labelledby="h2-free-title">
      <p className="h2-eyebrow">Sin tarjeta, sin compromiso</p>
      <h2 id="h2-free-title">Empieza hoy, sin pagar</h2>
      <p className="h2-lead">Herramientas interactivas abiertas para todos los perfiles.</p>
      <div className="h2-tools">{freeTools.map(t => <article key={t.title} className={`h2-tool h2-tone-${t.tone}`}>
        <div className="h2-tool-top"><span className="h2-tool-icon"><t.icon aria-hidden="true" /></span><span className="h2-tool-tag">{t.tag}</span></div>
        <h3>{t.title}</h3>
        <p>{t.text}</p>
        <Link to={t.to} className="h2-tool-go">Empezar <ArrowRight aria-hidden="true" /></Link>
      </article>)}</div>
    </section>

    <section id="programas" className="h2-band" aria-labelledby="h2-prog-title">
      <div className="site-container h2-section">
        <p className="h2-eyebrow">Programas de preparación</p>
        <h2 id="h2-prog-title">Elige tu camino profesional</h2>
        <p className="h2-lead">Empieza gratis con 10 preguntas. Con un solo pago abres el simulacro completo del perfil: 100 preguntas por niveles y el núcleo común.</p>
        <div className="h2-programs">{programs.map(p => <article key={p.profile} className="h2-program">
          <div className="h2-program-head"><span><p.icon aria-hidden="true" /></span><h3><Link to={p.to}>{p.name}</Link></h3></div>
          <div className="h2-program-body">
            <p>{p.desc}</p>
            <ul><li><CheckCircle2 aria-hidden="true" /> Simulacro tipo ICFES por niveles</li><li><CheckCircle2 aria-hidden="true" /> Explicación y norma en cada respuesta</li><li><CheckCircle2 aria-hidden="true" /> Núcleo común y psicotécnica</li></ul>
            <div className="h2-program-price">
              <small>Acceso completo · pago único</small>
              <strong>{cop(priceOf(p.profile))} <span>COP</span></strong>
              <ProfilePayButton profile={p.profile} className="h2-btn h2-btn-gold h2-btn-block" />
              <Link to={p.sim} className="h2-btn h2-btn-outline h2-btn-block">Prueba gratis</Link>
            </div>
          </div>
        </article>)}</div>
        <p className="h2-note">También ofrecemos <Link to="/formacion">cursos de autoestudio gratuitos</Link> y <Link to="/asesoria-investigacion">asesoría en investigación</Link> (servicio aparte). Detalles de cada plan en <Link to="/planes">Planes</Link>.</p>
      </div>
    </section>

    <section className="h2-ia" aria-labelledby="h2-ia-title">
      <div className="site-container h2-ia-inner">
        <div className="h2-ia-robot"><img src={robot} width={400} height={400} loading="lazy" alt="EducatIA, robot asistente de EDUCALEX con birrete" /></div>
        <div className="h2-ia-body">
          <p className="h2-eyebrow h2-eyebrow-gold">EducatIA · con voz</p>
          <h2 id="h2-ia-title">Tu asistente inteligente para la educación</h2>
          <p className="h2-ia-text">Consulta, aprende y resuelve tus dudas sobre legislación educativa, pedagogía, normativa y desarrollo institucional con el acompañamiento de EducatIA.</p>
          <ul className="h2-ia-benefits"><li><CheckCircle2 aria-hidden="true" /> Pregunta escribiendo o con tu voz</li><li><CheckCircle2 aria-hidden="true" /> Escucha la respuesta en voz alta</li><li><CheckCircle2 aria-hidden="true" /> Responde con la biblioteca de fuentes verificadas</li></ul>
          <ul className="h2-ia-topics" aria-label="Temas que puedes consultar">{topics.map(t => <li key={t}>{t}</li>)}</ul>
          <Link to="/docente-ia" className="h2-btn h2-btn-gold">Pregúntale a EducatIA <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="site-container h2-section" aria-labelledby="h2-sec-title">
      <h2 id="h2-sec-title">Todo para tu desarrollo profesional</h2>
      <p className="h2-lead">Formación, normas y recursos verificados, en un solo lugar.</p>
      <div className="h2-tiles">{sections.map(s => <Link key={s.title} to={s.to} className={`h2-tile h2-tile-${s.tone}`}>
        <span className="h2-tile-icon"><s.icon aria-hidden="true" /></span>
        <span className="h2-tile-text"><strong>{s.title}</strong><span>{s.text}</span></span>
        <ArrowRight aria-hidden="true" className="h2-tile-arrow" />
      </Link>)}</div>
    </section>

    <FounderSpotlight />

    <section id="contacto" className="h2-band" aria-labelledby="h2-contact-title">
      <div className="site-container h2-section h2-contact">
        <div className="h2-contact-text">
          <h2 id="h2-contact-title">Contacto institucional</h2>
          <p className="h2-lead">EDUCALEX · San Pelayo, Córdoba. Te respondemos por WhatsApp y correo.</p>
          <div className="h2-contact-links">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="h2-btn h2-btn-wa">WhatsApp +57 301 874 7379</a>
            <a href="mailto:educalexcolombia@gmail.com" className="h2-btn h2-btn-light"><Mail aria-hidden="true" /> educalexcolombia@gmail.com</a>
            <a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" className="h2-btn h2-btn-light">Instagram {SOCIAL.instagram.handle}</a>
            <a href={SOCIAL.facebook.url} target="_blank" rel="noopener noreferrer" className="h2-btn h2-btn-light">Facebook {SOCIAL.facebook.handle}</a>
            <Link to="/contacto" className="h2-btn h2-btn-light"><ShieldCheck aria-hidden="true" /> Formulario de contacto</Link>
          </div>
        </div>
        <ShareQr />
      </div>
    </section>
  </div>;
}
