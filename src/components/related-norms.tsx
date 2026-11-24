import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { libraryDocs } from "@/lib/educalex-sitemap";

/** Normas y documentos de la biblioteca enlazados a un curso, del más reciente al más antiguo. */
export function RelatedNorms({ path, title = "Marco normativo" }: { path: string; title?: string }) {
  const docs = libraryDocs
    .filter(d => (d.related as string[]).includes(path))
    .sort((a, b) => (b.anio ?? 0) - (a.anio ?? 0));
  if (!docs.length) return null;
  return (
    <section className="related-norms" aria-labelledby="related-norms-title">
      <h2 id="related-norms-title" className="mod-h2">{title}</h2>
      <p className="related-norms-intro">Cada ficha trae un resumen en organizador gráfico y el enlace a la fuente oficial. Verifica siempre el texto vigente.</p>
      <ul className="related-norms-list">
        {docs.map(d => (
          <li key={d.id}>
            <Link to="/biblioteca/ficha/$id" params={{ id: d.id }} search={{ imprimir: false }} className="related-norm">
              <FileText aria-hidden="true" />
              <span><strong>{d.title}</strong><small>{d.tipo}{d.anio ? ` · ${d.anio}` : ""}</small><span>{d.descripcion}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
