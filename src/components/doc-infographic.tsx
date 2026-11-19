import { Link } from '@tanstack/react-router';
import { BookOpen, Building2, CheckCircle2, Clock3, Compass, Lightbulb, ListChecks, PlayCircle, ShieldCheck, Target } from 'lucide-react';
import { getPage, type LibraryDoc } from '@/lib/educalex-sitemap';
import { librarySource, libraryStudyNotes } from '@/lib/library-view';
import { videoThemes } from '@/lib/official-videos';
import { keyPointsFor } from '@/lib/doc-key-points';

/** Temáticas de la videoteca relacionadas con cada categoría de la biblioteca. */
const videoThemeByCategory: Record<string, string[]> = {
  'Inclusión': ['inclusion', 'lsc'],
  'Convivencia': ['convivencia', 'socioemocional'],
  'Gestión institucional': ['integral', 'evaluacion'],
  'Políticas educativas': ['rural', 'etnoeducacion', 'integral'],
  'Legislación educativa': ['evaluacion'],
};

export function relatedVideoThemes(doc: LibraryDoc) {
  const ids = videoThemeByCategory[doc.categoria] ?? [];
  return videoThemes.filter(t => ids.includes(t.id));
}

/**
 * Organizador gráfico de una ficha de la biblioteca. Usa solo los datos verificados de la ficha
 * (tipo, entidad, año, descripción, notas y rutas de estudio): no agrega contenido normativo nuevo.
 */
export function DocInfographic({ doc }: { doc: LibraryDoc }) {
  const notes = libraryStudyNotes(doc);
  const source = librarySource(doc);
  const themes = relatedVideoThemes(doc);
  const key = keyPointsFor(doc.id);
  return <figure className="doc-infographic" aria-labelledby={`info-title-${doc.id}`}>
    <div className="info-center">
      <span className="info-kicker">{doc.categoria}</span>
      <strong id={`info-title-${doc.id}`}>{doc.title}</strong>
      <span className="info-meta">{doc.tipo}{doc.anio ? ` · ${doc.anio}` : ''}</span>
    </div>
    <div className="info-branches">
      <section className="info-branch b1"><h4><Building2 aria-hidden="true" /> ¿Qué es?</h4><p>{doc.nombreOficial}</p><p className="info-small">Expide o publica: {doc.entidad}</p></section>
      <section className="info-branch b2"><h4><Lightbulb aria-hidden="true" /> ¿De qué trata?</h4><p>{doc.descripcion}</p></section>
      {key && <section className="info-branch info-keys"><h4><ListChecks aria-hidden="true" /> Ideas clave</h4>
        <ol className="info-keylist">{key.points.map(p => <li key={p.label}><strong>{p.label}</strong><span>{p.text}</span><small>{p.source}</small></li>)}</ol></section>}
      {key && <section className="info-branch info-exam"><h4><Target aria-hidden="true" /> Para el concurso</h4><ul>{key.forExam.map(t => <li key={t}>{t}</li>)}</ul></section>}
      <section className="info-branch b3"><h4><Compass aria-hidden="true" /> ¿Cómo usarlo en la práctica?</h4><p>{notes.application}</p></section>
      <section className="info-branch b4"><h4><BookOpen aria-hidden="true" /> ¿Dónde estudiarlo en EDUCALEX?</h4>
        <ul>{doc.related.map(to => <li key={to}><Link to={to}>{getPage(to)?.title ?? to}</Link></li>)}
          {themes.map(t => <li key={t.id}><Link to="/biblioteca/videos" hash={t.id}><PlayCircle aria-hidden="true" /> Videos: {t.title}</Link></li>)}</ul></section>
      <section className="info-branch b5"><h4><ShieldCheck aria-hidden="true" /> Fuente y vigencia</h4>
        <p className={doc.fuenteConsultada ? 'info-ok' : 'info-pending'}>{doc.fuenteConsultada ? <><CheckCircle2 aria-hidden="true" /> Fuente oficial consultada</> : <><Clock3 aria-hidden="true" /> Fuente por verificar</>}</p>
        {source && <p className="info-small"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.kind === 'pdf' ? 'Abrir el PDF oficial' : 'Abrir el texto oficial'}</a></p>}
        <p className="info-small">Confirma siempre la vigencia y las modificaciones en el texto oficial.</p></section>
    </div>
    <figcaption className="info-small">Organizador gráfico EDUCALEX elaborado con los datos de la ficha. No reemplaza la lectura del texto oficial.</figcaption>
  </figure>;
}
