import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Library, ShieldAlert } from "lucide-react";
import { getLibraryDoc, type LibraryDoc } from "@/lib/educalex-sitemap";

export function StudyDocuments({ ids }: { ids: string[] }) {
  const docs = ids.map(getLibraryDoc).filter((doc): doc is LibraryDoc => Boolean(doc));
  return <section className="study-documents" aria-labelledby="study-documents-title">
    <div className="course-section-heading"><div><span className="course-kicker">CONSULTA EN FUENTES INSTITUCIONALES</span><h2 id="study-documents-title">Documentos para estudiar</h2></div><Library /></div>
    <p className="course-lead">Estas fichas orientan el estudio, pero no definen el contenido de una prueba. Los requisitos, las pruebas, los referentes y las fechas dependen de la convocatoria y deben confirmarse siempre en sus documentos oficiales.</p>
    <div className="study-doc-grid">{docs.map(doc => <article className="study-doc" key={doc.id}>
      <span>{doc.tipo}</span><h3>{doc.title}</h3><p>{doc.descripcion}</p>
      <div className="study-doc-actions">
        {doc.fuenteConsultada && doc.fuenteUrl ? <a href={doc.fuenteUrl} target="_blank" rel="noopener noreferrer" className="doc-action doc-action-primary"><ExternalLink /> Fuente oficial</a> : <span className="doc-source-pending"><ShieldAlert /> Fuente pendiente de verificación</span>}
        <Link to={doc.shelf} className="doc-related-link">Ver ficha en biblioteca</Link>
      </div>
    </article>)}</div>
    <Link to="/biblioteca" className="doc-action study-library-link"><BookOpen /> Explorar toda la biblioteca</Link>
  </section>;
}
