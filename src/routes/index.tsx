import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookMarked, Bot, ChartNoAxesCombined, CheckCircle2, ClipboardCheck, Compass, FileText, GraduationCap, Library, Mail, Play, Scale, Settings, ShieldCheck, Trophy, Users, Video } from "lucide-react";
import { pageHead } from "@/lib/educalex-content";
import fotoIngreso from "@/assets/perfil-ingreso-docente.webp";
import fotoAscenso from "@/assets/perfil-ascenso-reubicacion.webp";
import fotoCoordinador from "@/assets/perfil-coordinador.webp";
import fotoRector from "@/assets/perfil-rector.webp";
import robot from "@/assets/educalex-robot.webp";
import { FounderSpotlight } from "@/components/founder-card";
import { ShareQr } from "@/components/share-qr";
import { WHATSAPP_NUMBER } from "@/components/whatsapp-launcher";
import { SOCIAL } from "@/lib/social";

export const Route = createFileRoute("/")({ head: () => pageHead("Preparación para el concurso docente 2026 en Colombia", "Simulacros tipo ICFES por niveles, normas verificadas en fuentes oficiales y cursos para docentes, coordinadores y rectores. Concurso CNSC, ascenso y reubicación. Empieza gratis."), component: Index });


const programs = [
  { profile: "ingreso-docente", icon: Trophy, tone: "blue", photo: fotoIngreso, alt: "Docente con su cuaderno, sonriendo", name: "Ingreso a la carrera docente", desc: "Para licenciados y profesionales que aspiran a ser docentes.", to: "/concursos/ingreso-docente", sim: "/simulacros/ingreso-docente" },
  { profile: "ascenso-reubicacion", icon: ChartNoAxesCombined, tone: "green", photo: fotoAscenso, alt: "Docente con su maletín frente a la institución educativa", name: "Ascenso y reubicación", desc: "Para docentes que buscan avanzar en su carrera.", to: "/concursos/ascenso-reubicacion", sim: "/simulacros/ascenso-reubicacion" },
  { profile: "coordinador", icon: Settings, tone: "red", photo: fotoCoordinador, alt: "Coordinadora con los brazos cruzados frente al colegio", name: "Concurso para coordinador", desc: "Liderazgo pedagógico, convivencia y gestión académica.", to: "/concursos/coordinador", sim: "/simulacros/coordinador" },
  { profile: "rector", icon: Users, tone: "navy", photo: fotoRector, alt: "Rector con su carpeta frente a la institución, junto a la bandera de Colombia", name: "Concurso para rector", desc: "Dirección, gestión institucional y liderazgo educativo.", to: "/concursos/rector", sim: "/simulacros/rector" },
] as const;

const ejes = [
  { icon: Scale, text: "Legislación y normatividad educativa colombiana" },
  { icon: GraduationCap, text: "Competencias pedagógicas" },
  { icon: FileText, text: "Gestión académica y administrativa" },
  { icon: Users, text: "Liderazgo y gestión institucional" },
  { icon: Compass, text: "Análisis de situaciones y casos educativos" },
  { icon: ClipboardCheck, text: "Simulacros y evaluación del desempeño" },
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
    <section className="h2-hero h2-hero-plain" aria-labelledby="h2-hero-title">
      <div className="site-container h2-hero-inner">
        <p className="h2-kicker">EDUCALEX</p>
        <h1 id="h2-hero-title">Preparación para Concursos Docentes y Directivos en Colombia</h1>
        <p className="h2-hero-text">Simulacros, legislación educativa, competencias pedagógicas y formación especializada para ingresar, ascender y convertirte en coordinador o rector.</p>
        <div className="h2-hero-actions">
          <a href="#perfiles" className="h2-btn h2-btn-gold h2-hero-cta">Comienza tu preparación gratis</a>
        </div>
      </div>
    </section>

    <section id="perfiles" className="h2-profiles-band" aria-labelledby="h2-prof-title">
      <div className="site-container h2-section">
        <h2 id="h2-prof-title">¿Cuál es tu objetivo profesional?</h2>
        <div className="h2-profiles">{programs.map(p => <article key={p.profile} className={`h2-prof h2-prof-${p.tone}`}>
          <div className="h2-prof-media"><span className="h2-prof-portrait"><img src={p.photo} alt={p.alt} width={320} height={320} loading="lazy" /></span><span className="h2-prof-badge" aria-hidden="true"><p.icon /></span></div>
          <div className="h2-prof-body">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="h2-prof-actions">
              <Link to={p.to} search={{ empezar: 1 }} className="h2-btn h2-btn-gold h2-prof-start"><Play aria-hidden="true" /> Prueba gratis</Link>
            </div>
          </div>
        </article>)}</div>
        <p className="h2-note">¿Primera vez? <Link to="/guia-de-uso">Mira cómo funciona en 6 pasos</Link> · Compara precios en <Link to="/planes">Planes</Link>.</p>
      </div>
    </section>

    <section className="site-container h2-section h2-ejes" aria-labelledby="h2-ejes-title">
      <h2 id="h2-ejes-title">Prepárate con conocimiento, estrategia y práctica</h2>
      <ul>{ejes.map(e => <li key={e.text}><span><e.icon aria-hidden="true" /></span>{e.text}</li>)}</ul>
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
