import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { CheckCircle2, ExternalLink, Search, Clock3, ChevronLeft, ChevronRight, X, BookOpen, Download, Network } from 'lucide-react';
import { DocInfographic } from './doc-infographic';
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
  return <Dialog><DialogTrigger asChild><button type="button" className="library-doc-card" aria-label={`Ver resumen en infografía: ${doc.title}`}><Network aria-hidden="true" /><span>{doc.title}</span></button></DialogTrigger>
    <DialogPortal><DialogOverlay /><DialogPrimitive.Content className="library-detail" aria-describedby={`library-description-${doc.id}`}>
      <DialogClose asChild><Button variant="ghost" size="icon" className="library-close" aria-label="Cerrar ficha"><X aria-hidden="true" /></Button></DialogClose>
      <p className="library-detail-kicker">Resumen en organizador gráfico</p><DialogTitle className="library-detail-title">{doc.title}</DialogTitle>
      <DialogDescription id={`library-description-${doc.id}`} className="sr-only">Resumen en organizador gráfico de {doc.title}</DialogDescription>
      <DocInfographic doc={doc} />
      <div className="library-detail-actions"><Button asChild variant="navy"><Link to="/biblioteca/ficha/$id" params={{ id: doc.id }} search={{ imprimir: true }} target="_blank"><Download aria-hidden="true" />Descargar resumen en PDF</Link></Button>{source && <Button asChild variant="outline"><a href={source.url} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" />{source.kind === 'pdf' ? 'Descargar norma oficial (PDF)' : 'Ver norma en el sitio oficial'}</a></Button>}</div>
      <details className="library-more"><summary>Más información para estudiar</summary>
        <section><h3>Puntos clave</h3><ul>{notes.points.map(point => <li key={point}>{point}</li>)}</ul></section>
        <section><h3>Aplicación pedagógica</h3><p>{notes.application}</p></section>
        <section><h3>Estudio relacionado</h3><div className="library-related">{doc.related.map(to => <Button asChild variant="outline" key={to}><Link to={to}><BookOpen aria-hidden="true" />{getPage(to)?.title ?? to}</Link></Button>)}</div></section>
        <section className="library-verification"><h3>Fuente</h3><Verification doc={doc} /><p>{doc.notas}</p></section>
      </details>
      <DialogClose asChild><Button variant="outline">Cerrar ficha</Button></DialogClose>
    </DialogPrimitive.Content></DialogPortal>
  </Dialog>;
}

export function LibraryCatalog({ shelf }: { shelf?: LibraryDoc['shelf'] }) {
  const base = useMemo(() => shelf ? libraryDocs.filter(doc => doc.shelf === shelf) : libraryDocs, [shelf]);
  const cats = [...new Set(base.map(doc => doc.categoria))];
  const [q, setQ] = useState(''); const [cat, setCat] = useState(''); const verification = ''; const [page, setPage] = useState(1);
  const list = useMemo(() => filterLibrary(base, q, cat, verification), [base, q, cat, verification]);
  const pages = Math.max(1, Math.ceil(list.length / LIBRARY_PAGE_SIZE)); const current = Math.min(page, pages);
  const visible = list.slice((current - 1) * LIBRARY_PAGE_SIZE, current * LIBRARY_PAGE_SIZE);
  return <div className="library-catalog">
    <div className="library-heading"><h2 className="mod-h2">Biblioteca digital</h2></div>
    <div className="library-filters">
      <label className="cat-filter cat-search"><span>Buscar norma o documento</span><div><Search aria-hidden="true" /><input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Ley 115, convivencia, Ministerio…" /></div></label>
      <label className="cat-filter"><span>Categoría</span><select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }}><option value="">Todas</option>{cats.map(c => <option key={c}>{c}</option>)}</select></label>

    </div>
    <p className="library-count" role="status">{list.length ? `${list.length} documentos · haz clic en uno para ver su resumen en infografía` : 'No encontramos documentos con esa búsqueda.'}</p>
    {list.length > 0 && <><ul className="library-doc-grid" aria-label="Normas y documentos">{visible.map(doc => <li key={doc.id} id={doc.id}><DocumentDetail doc={doc} /></li>)}</ul>
      <nav className="library-pagination" aria-label="Páginas de documentos"><Button variant="outline" size="icon" aria-label="Página anterior" disabled={current === 1} onClick={() => setPage(current - 1)}><ChevronLeft aria-hidden="true" /></Button><span>Página {current} de {pages}</span><Button variant="outline" size="icon" aria-label="Página siguiente" disabled={current === pages} onClick={() => setPage(current + 1)}><ChevronRight aria-hidden="true" /></Button></nav></>}
  </div>;
}