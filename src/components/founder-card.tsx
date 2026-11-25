import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, Cpu, GraduationCap, Microscope } from "lucide-react";
import photo from "@/assets/enadis-vargas.webp";
import spotlightPhoto from "@/assets/enadis-fundadora.webp";

// Perfil redactado por Enadis (20 nov 2026). ORCID verificado en orcid.org el 20 nov 2026.
const ORCID = "https://orcid.org/0000-0002-2025-9429";
// Foto autorizada por ella; fondo cambiado al azul de la marca.
const highlights = [
  { icon: GraduationCap, text: "Doctora en Ciencias de la Educación" },
  { icon: Cpu, text: "Coordina proyectos de robótica educativa" },
  { icon: Clapperboard, text: "Filocine: el cine para enseñar filosofía" },
  { icon: Microscope, text: "Investigadora y asesora de investigación" },
] as const;

export function FounderCard({ compact = false }: { compact?: boolean }) {
  return <section className={`founder ${compact ? "founder-compact" : ""}`} aria-labelledby="founder-title">
    <img src={photo} width={600} height={869} loading="lazy" alt="Dra. Enadis Ester Vargas Hernández, fundadora de EDUCALEX" className="founder-photo" />
    <div className="founder-body">
      <p className="founder-kicker">Quién crea EDUCALEX</p>
      <h2 id="founder-title">Dra. Enadis Ester Vargas Hernández</h2>
      <p className="founder-role">Fundadora de EDUCALEX · Docente investigadora</p>
      <p>Licenciada en Ciencias Sociales, especialista en Investigación Aplicada a la Educación y doctora en Ciencias de la Educación. Tiene más de 30 años de experiencia en primaria, secundaria y educación superior, en contextos urbanos y rurales de Colombia.</p>
      {!compact && <p>Coordina proyectos de robótica y de Filocine, el cine como estrategia para enseñar filosofía. Es investigadora y asesora proyectos de investigación en diferentes áreas del conocimiento. EDUCALEX reúne esa experiencia de aula y de investigación para acompañar a quienes se preparan para la carrera docente y directiva.</p>}
      <a className="founder-orcid" href={ORCID} target="_blank" rel="noopener noreferrer" aria-label="Perfil ORCID de Enadis Vargas (se abre en una pestaña nueva)">
        <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#A6CE39" /><text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">iD</text></svg>
        <span>{ORCID}</span>
      </a>
      <ul className="founder-list">{highlights.map(h => <li key={h.text}><h.icon aria-hidden="true" />{h.text}</li>)}</ul>
      <Link to="/asesoria-investigacion" className="founder-advice">Solicitar asesoría en investigación <ArrowRight aria-hidden="true" /></Link>
      {compact && <Link to="/nosotros" className="hx-inline-link founder-more">Conoce más sobre EDUCALEX <ArrowRight aria-hidden="true" /></Link>}
    </div>
  </section>;
}

/** Sección de la portada «Conoce a la fundadora de Educalex»: textos completos del perfil, sin resumir. */
export function FounderSpotlight() {
  return <section className="h2-founder" aria-labelledby="h2-founder-title">
    <div className="site-container h2-founder-inner">
      <div className="h2-founder-photo">
        <img src={spotlightPhoto} width={900} height={1202} loading="lazy" alt="Dra. Enadis Ester Vargas Hernández, fundadora de EDUCALEX" />
      </div>
      <div className="h2-founder-body">
        <p className="h2-eyebrow h2-eyebrow-gold">Conoce a la fundadora de Educalex</p>
        <h2 id="h2-founder-title">Dra. Enadis Ester Vargas Hernández</h2>
        <p className="h2-founder-role">Fundadora de EDUCALEX · Docente investigadora</p>
        <p>Licenciada en Ciencias Sociales, especialista en Investigación Aplicada a la Educación y doctora en Ciencias de la Educación. Tiene más de 30 años de experiencia en primaria, secundaria y educación superior, en contextos urbanos y rurales de Colombia.</p>
        <p>Coordina proyectos de robótica y de Filocine, el cine como estrategia para enseñar filosofía. Es investigadora y asesora proyectos de investigación en diferentes áreas del conocimiento. EDUCALEX reúne esa experiencia de aula y de investigación para acompañar a quienes se preparan para la carrera docente y directiva.</p>
        <ul className="h2-founder-list">{highlights.map(h => <li key={h.text}><h.icon aria-hidden="true" />{h.text}</li>)}</ul>
        <div className="h2-founder-links">
          <Link to="/asesoria-investigacion" className="h2-btn h2-btn-gold">Solicitar asesoría en investigación <ArrowRight aria-hidden="true" /></Link>
          <a className="h2-founder-orcid" href={ORCID} target="_blank" rel="noopener noreferrer" aria-label="Perfil ORCID de Enadis Vargas (se abre en una pestaña nueva)">
            <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#A6CE39" /><text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">iD</text></svg>
            <span>ORCID 0000-0002-2025-9429</span>
          </a>
          <Link to="/nosotros" className="h2-founder-more">Conoce más sobre EDUCALEX <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  </section>;
}
