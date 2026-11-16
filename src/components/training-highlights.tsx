import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, ExternalLink, Landmark } from "lucide-react";
import { getLibraryDoc } from "@/lib/educalex-sitemap";

export function TrainingHighlights() {
  const plan = getLibraryDoc("plan-decenal-2026-2035");
  return <section className="training-highlights" aria-labelledby="training-highlights-title">
    <h2 className="mod-h2" id="training-highlights-title">Accesos destacados</h2>
    <div className="training-highlight-grid">
      <article className="training-highlight training-highlight-course"><BookOpenCheck /><div><span>Curso con contenido disponible</span><h3>Guía 34 y Plan de Mejoramiento Institucional</h3><p>Ocho unidades, un ejemplo rural ficticio y una matriz editable para organizar hallazgos, metas, indicadores, responsables y seguimiento.</p></div><Link to="/formacion/guia-34-pmi" className="doc-action doc-action-primary">Entrar al curso <ArrowRight /></Link></article>
      <article className="training-highlight"><Landmark /><div><span>Fuente oficial consultada</span><h3>IV Plan Nacional Decenal de Educación 2026–2035</h3><p>Consulta el micrositio del Ministerio de Educación Nacional y conoce su ficha documental en EDUCALEX.</p></div><div className="doc-actions-inline">{plan?.fuenteUrl && <a href={plan.fuenteUrl} target="_blank" rel="noopener noreferrer" className="doc-action doc-action-primary"><ExternalLink /> Consultar micrositio oficial</a>}<Link to="/biblioteca/recursos" className="doc-action">Ver ficha en biblioteca</Link></div></article>
    </div>
  </section>;
}
