import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { CheckCircle2, ExternalLink, Search, Clock3, ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from './ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { getPage, libraryDocs, type LibraryDoc } from '@/lib/educalex-sitemap';
import { filterLibrary, librarySource, libraryStudyNotes, LIBRARY_PAGE_SIZE } from '@/lib/library-view';

function Verification({ doc }: { doc: LibraryDoc }) {
  return <span className={`library-status ${doc.fuenteConsultada ? 'library-consulted' : ''}`}>{doc.fuenteConsultada ? <CheckCircle2 aria-hidden="true" /> : <Clock3 aria-hidden="true" />}{doc.fuenteConsultada ? 'Fuente consultada' : 'Por verificar'}</span>;
}
function DocumentDetail({ doc }: { doc: LibraryDoc }) {
  const notes = libraryStudyNotes(doc); const source = librarySource(doc);
  return <Dialog><DialogTrigger asChild><Button variant="ghost" className="library-title-button" aria-label={`Leer resumen: ${doc.title}`}>{doc.title}</Button></DialogTrigger>
    <DialogPortal><DialogOverlay /><DialogPrimitive.Content className="library-detail" aria-describedby={`library-description-${doc.id}`}>
      <DialogClose asChild><Button variant="ghost" size="icon" className="library-close" aria-label="Cerrar ficha"><X aria-hidden="true" /></Button></DialogClose>
      <p className="library-detail-kicker">Resumen EDUCALEX · {doc.tipo}</p><DialogTitle className="library-detail-title">{doc.title}</DialogTitle>
      <DialogDescription id={`library-description-${doc.id}`}>{doc.descripcion}</DialogDescription>
      <dl className="library-metadata"><dt>Nombre oficial</dt><dd>{doc.nombreOficial}</dd><dt>Entidad</dt><dd>{doc.entidad}</dd><dt>Año</dt><dd>{doc.anio ?? 'Por verificar'}</dd><dt>Tema</dt><dd>{doc.categoria}</dd></dl>
      <section><h3>Puntos clave para estudiar</h3><ul>{notes.points.map(point => <li key={point}>{point}</li>)}</ul></section>
      <section><h3>Aplicación pedagógica</h3><p>{notes.application}</p></section>
      <section className="library-verification"><h3>Estado de verificación</h3><Verification doc={doc} /><p>{doc.notas}</p></section>
      <div className="library-detail-actions">{source ? <Button asChild><a href={source.url} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" />{source.kind === 'pdf' ? 'Abrir PDF oficial' : 'Consultar fuente oficial'}</a></Button> : <Button disabled variant="outline">Enlace pendiente</Button>}<p className="text-sm text-muted-foreground">{source?.kind === 'pdf' ? 'Documento PDF en el sitio oficial; se abre en una pestaña nueva.' : source ? 'Página oficial; desde allí se accede al documento completo cuando está disponible.' : 'Fuente oficial pendiente de comprobación.'}</p></div>
      <section><h3>Estudio relacionado</h3><div className="library-related">{doc.related.map(to => <Button asChild variant="outline" key={to}><Link to={to}><BookOpen aria-hidden="true" />{getPage(to)?.title ?? to}</Link></Button>)}</div></section>
      <DialogClose asChild><Button variant="outline">Cerrar ficha</Button></DialogClose>
    </DialogPrimitive.Content></DialogPortal>
  </Dialog>;
}

export function LibraryCatalog({ shelf }: { shelf?: LibraryDoc['shelf'] }) {
  const base = useMemo(() => shelf ? libraryDocs.filter(doc => doc.shelf === shelf) : libraryDocs, [shelf]);
  const cats = [...new Set(base.map(doc => doc.categoria))];
  const [q, setQ] = useState(''); const [cat, setCat] = useState(''); const [verification, setVerification] = useState(''); const [page, setPage] = useState(1);
  const list = useMemo(() => filterLibrary(base, q, cat, verification), [base, q, cat, verification]);
  const pages = Math.max(1, Math.ceil(list.length / LIBRARY_PAGE_SIZE)); const current = Math.min(page, pages);
  const visible = list.slice((current - 1) * LIBRARY_PAGE_SIZE, current * LIBRARY_PAGE_SIZE);
  return <div className="library-catalog">
    <div className="library-heading"><h2 className="mod-h2">Biblioteca digital</h2><span>{base.length} documentos y temas</span></div>
    <div className="library-filters">
      <label className="cat-filter cat-search"><span>Buscar documento, año o entidad</span><div><Search aria-hidden="true" /><input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Ley 115, convivencia, Ministerio…" /></div></label>
      <label className="cat-filter"><span>Categoría</span><select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }}><option value="">Todas</option>{cats.map(c => <option key={c}>{c}</option>)}</select></label>
      <label className="cat-filter"><span>Verificación</span><select value={verification} onChange={e => { setVerification(e.target.value); setPage(1); }}><option value="">Todos los estados</option><option value="consultada">Fuente consultada</option><option value="pendiente">Por verificar</option></select></label>
    </div>
    <p className="library-count" role="status">{list.length ? `${(current - 1) * LIBRARY_PAGE_SIZE + 1}–${Math.min(current * LIBRARY_PAGE_SIZE, list.length)} de ${list.length} fichas` : 'No encontramos documentos con esa búsqueda.'}</p>
    {list.length > 0 && <><table className="library-table"><caption className="sr-only">Documentos de la Biblioteca General</caption><thead><tr><th scope="col">Norma o documento</th><th scope="col">Año</th><th scope="col">Entidad</th><th scope="col">Tema</th><th scope="col">Verificación</th></tr></thead><tbody>{visible.map(doc => <tr key={doc.id} id={doc.id}><td><DocumentDetail doc={doc} /></td><td data-label="Año">{doc.anio ?? '—'}</td><td data-label="Entidad">{doc.entidad}</td><td data-label="Tema">{doc.categoria}</td><td><Verification doc={doc} /></td></tr>)}</tbody></table>
      <nav className="library-pagination" aria-label="Páginas de documentos"><Button variant="outline" size="icon" aria-label="Página anterior" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft aria-hidden="true" /></Button><span>Página {current} de {pages}</span><Button variant="outline" size="icon" aria-label="Página siguiente" disabled={current === pages} onClick={() => setPage(current + 1)}><ChevronRight aria-hidden="true" /></Button></nav></>}
  </div>;
}