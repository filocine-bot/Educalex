import { useEffect } from 'react';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocInfographic } from '@/components/doc-infographic';
import { getLibraryDoc } from '@/lib/educalex-sitemap';
import { pageHead } from '@/lib/educalex-content';
import { librarySource, libraryStudyNotes } from '@/lib/library-view';

export const Route = createFileRoute('/biblioteca/ficha/$id')({
  loader: ({ params }) => { const doc = getLibraryDoc(params.id); if (!doc) throw notFound(); return doc; },
  head: ({ loaderData }) => pageHead(loaderData ? `Ficha: ${loaderData.title}` : 'Ficha', loaderData?.descripcion ?? 'Ficha de la biblioteca EDUCALEX.'),
  validateSearch: (s: Record<string, unknown>) => ({ imprimir: s['imprimir'] === 1 || s['imprimir'] === '1' }),
  component: Ficha,
});

function Ficha() {
  const doc = Route.useLoaderData();
  const { imprimir } = Route.useSearch();
  const source = librarySource(doc);
  const notes = libraryStudyNotes(doc);
  useEffect(() => { if (!imprimir) return undefined; const t = setTimeout(() => window.print(), 600); return () => clearTimeout(t); }, [imprimir]);
  return <section className="section site-container ficha-page">
    <div className="ficha-actions no-print">
      <Button asChild variant="ghost"><Link to={doc.shelf} hash={doc.id}><ArrowLeft aria-hidden="true" /> Volver a la biblioteca</Link></Button>
      <Button variant="navy" onClick={() => window.print()}><Download aria-hidden="true" /> Descargar ficha en PDF</Button>
      {source && <Button asChild variant="outline"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.kind === 'pdf' ? <FileText aria-hidden="true" /> : <ExternalLink aria-hidden="true" />}{source.kind === 'pdf' ? 'Descargar norma oficial (PDF)' : 'Texto oficial'}</a></Button>}
    </div>
    <p className="no-print section-description">Para guardar la ficha, pulsa «Descargar ficha en PDF» y en la ventana de impresión elige <strong>«Guardar como PDF»</strong>.</p>
    <header className="ficha-header"><p className="course-kicker">EDUCALEX · Biblioteca normativa · {doc.categoria}</p><h1>{doc.title}</h1><p>{doc.nombreOficial}</p></header>
    <DocInfographic doc={doc} />
    <section className="ficha-body">
      <h2>Ficha de estudio</h2>
      <dl className="library-metadata"><dt>Tipo</dt><dd>{doc.tipo}</dd><dt>Entidad</dt><dd>{doc.entidad}</dd><dt>Año</dt><dd>{doc.anio ?? 'Por verificar'}</dd><dt>Tema</dt><dd>{doc.categoria}</dd>{source && <><dt>Fuente oficial</dt><dd>{source.url}</dd></>}</dl>
      <h3>Puntos clave</h3><ul>{notes.points.map(p => <li key={p}>{p}</li>)}</ul>
      <h3>Aplicación pedagógica</h3><p>{notes.application}</p>
      <h3>Notas de verificación</h3><p>{doc.notas}</p>
      <p className="info-small">Ficha elaborada por EDUCALEX con fines de estudio. No es un documento oficial ni asesoría jurídica. Fecha de descarga: {new Date().toLocaleDateString('es-CO')}. www.educalex.co</p>
    </section>
  </section>;
}
