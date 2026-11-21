import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, Cpu, GraduationCap, Microscope } from "lucide-react";
import photo from "@/assets/enadis-vargas.webp";

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
    <img src={photo} width={600} height={757} loading="lazy" alt="Dra. Enadis Ester Vargas Hernández, fundadora de EDUCALEX" className="founder-photo" />
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
