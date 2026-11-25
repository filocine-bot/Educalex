import { Link } from "@tanstack/react-router";
import { Home, ArrowRight, CheckCircle2, Clock3, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { getPage, type PagePath } from "@/lib/educalex-sitemap";

export function ModulePage({ path, children, showItems = true, compact = false, tight = false, childFilter, childNote, noticeAtEnd = false }: { path: PagePath; noticeAtEnd?: boolean; children?: ReactNode; showItems?: boolean; compact?: boolean; tight?: boolean; childFilter?: (child: string) => boolean; childNote?: ReactNode }) {
  const page = getPage(path);
  if (!page) return null;
  const parent = page.parent ? getPage(page.parent) : undefined;
  const content = <>
    <div className="subpage-header"><div className="site-container">
      <nav className="crumbs" aria-label="Ruta de navegación"><Link to="/"><Home aria-hidden="true" /> Inicio</Link>{parent && page.parent && <> / <Link to={page.parent as PagePath}>{parent.title}</Link></>}</nav>
      <div className="eyebrow text-gold">{page.section.toUpperCase()}</div>
      <h1>{page.title}</h1>
      <p className="section-description">{page.description}</p>
    </div></div>
    <section className="section site-container mod-body">
      {page.notice && !noticeAtEnd && <div className="mod-notice" role="status">{page.restricted ? <Lock /> : <Clock3 />}<p>{page.notice}</p></div>}
      {children}
      {showItems && page.items && <div><h2 className="mod-h2">{page.itemsTitle}</h2><ol className="mod-items">{page.items.map((it, i) => <li key={it}><span>{String(i + 1).padStart(2, "0")}</span>{it}</li>)}</ol></div>}
      {page.children && <div><h2 className="mod-h2">Explora</h2>{childNote}<div className="mod-cards">{page.children.filter(c => !childFilter || childFilter(c)).map(c => { const p = getPage(c); if (!p) return null; return <Link key={c} to={c as PagePath} className="mod-card"><strong>{p.title}</strong><small>{p.description}</small><span className="pathway-link">Ver <ArrowRight /></span></Link>; })}</div></div>}
      {page.notice && noticeAtEnd && <div className="mod-notice mod-notice-end" role="note">{page.restricted ? <Lock /> : <Clock3 />}<p>{page.notice}</p></div>}
      {page.related && <div><h2 className="mod-h2">Módulos relacionados</h2><div className={compact ? 'academic-related' : 'mod-related'}>{page.related.map(r => { const p = getPage(r); return <Link key={r} to={r as PagePath} className={compact ? undefined : 'mod-chip'}>{!compact && <CheckCircle2 />}{p?.title ?? (r === "/docente-ia" ? "EducatIA" : "Nosotros")}</Link>; })}</div></div>}
    </section>
  </>;
  return compact ? <div className="academic-route">{content}</div> : tight ? <div className="tight-route">{content}</div> : content;
}
