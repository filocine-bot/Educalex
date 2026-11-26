import { Link } from "@tanstack/react-router";
import { getPage, type PagePath } from "@/lib/educalex-sitemap";

/** Temas de estudio del perfil, ubicados igual en los cuatro perfiles (después de la prueba gratis). */
export function StudyTopics({ path }: { path: PagePath }) {
  const page = getPage(path);
  if (!page?.items?.length) return null;
  return <section className="study-topics" aria-labelledby="study-topics-title">
    <h2 id="study-topics-title" className="mod-h2">{page.itemsTitle ?? "Temas de estudio"}</h2>
    <ol className="mod-items">{page.items.map((it, i) => <li key={it}><span>{String(i + 1).padStart(2, "0")}</span>{it}</li>)}</ol>
    <Link to="/biblioteca" className="academic-library-link">Consultar normativa y convocatorias en Biblioteca General</Link>
  </section>;
}
