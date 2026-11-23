import { pages, libraryDocs, type PageDef } from "@/lib/educalex-sitemap";
import { faqs } from "@/lib/faq";
import { aiTools } from "@/lib/ai-tools";

export type SearchHit = { kind: string; title: string; text: string; to: string; params?: Record<string, string> };

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

let INDEX: (SearchHit & { hay: string })[] | null = null;
function index() {
  if (INDEX) return INDEX;
  const items: SearchHit[] = [
    ...Object.entries(pages as Record<string, PageDef>).filter(([path, p]) => !p.restricted && !path.includes("$")).map(([path, p]) => ({ kind: p.section, title: p.title, text: p.description, to: path })),
    ...libraryDocs.map(d => ({ kind: "Biblioteca", title: d.title, text: `${d.nombreOficial}. ${d.descripcion}`, to: "/biblioteca/ficha/$id", params: { id: d.id } })),
    ...faqs.map(f => ({ kind: "Pregunta frecuente", title: f.q, text: f.a, to: "/preguntas-frecuentes" })),
    ...aiTools.map(t => ({ kind: "Herramienta de IA", title: t.name, text: t.purpose, to: "/formacion/herramientas-ia" })),
  ];
  INDEX = items.map(i => ({ ...i, hay: norm(`${i.title} ${i.text} ${i.kind}`) }));
  return INDEX;
}

/** Búsqueda rápida en páginas, normas, preguntas frecuentes y herramientas. Todas las palabras deben aparecer; el título pesa más. */
export function searchSite(query: string, limit = 12): SearchHit[] {
  const words = norm(query).split(/\s+/).filter(w => w.length > 1);
  if (!words.length) return [];
  return index()
    .filter(i => words.every(w => i.hay.includes(w)))
    .map(i => ({ i, score: words.reduce((s, w) => s + (norm(i.title).includes(w) ? 3 : 1), 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ i: { hay: _h, ...hit } }) => hit);
}
