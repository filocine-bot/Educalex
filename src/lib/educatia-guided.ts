// Modo guiado de EducatIA: responde sin inteligencia artificial, buscando en la biblioteca verificada y en las páginas del sitio.
// Se usa cuando el servicio de IA no está disponible.
import { libraryDocs, pages, type PagePath } from "@/lib/educalex-sitemap";

const STOP = new Set("a al ante como con contra cual cuales cuando de del desde donde el ella en entre era es esa ese eso esta este esto fue la las le les lo los mas me mi muy no nos o para pero por que quien se segun ser si sin sobre su sus te tu un una uno unos y ya yo hay hace hacer puedo debo cómo qué cuál cuáles dónde".split(" "));

export function normalize(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function terms(text: string): string[] {
  return normalize(text).split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t));
}

function score(haystack: string, words: string[]): number {
  const h = normalize(haystack);
  return words.reduce((s, w) => s + (h.includes(w) ? (/\d/.test(w) ? 3 : 1) : 0), 0);
}

export type GuidedResult = { docs: typeof libraryDocs; pages: { path: PagePath; title: string; description: string }[] };

export function guidedSearch(question: string): GuidedResult {
  const words = terms(question);
  if (!words.length) return { docs: [], pages: [] };
  const docs = libraryDocs
    .map((d) => ({ d, s: score(`${d.title} ${d.nombreOficial} ${d.descripcion} ${d.categoria}`, words) * 2 + score(d.title, words) * 3 }))
    .filter((x) => x.s >= 2)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((x) => x.d);
  const pageList = (Object.entries(pages) as [PagePath, { title: string; description: string; restricted?: string }][])
    .filter(([path, p]) => !p.restricted && !path.startsWith("/admin"))
    .map(([path, p]) => ({ path, title: p.title, description: p.description, s: score(`${p.title} ${p.description}`, words) * 2 + score(p.title, words) * 2 }))
    .filter((x) => x.s >= 2)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map(({ path, title, description }) => ({ path, title, description }));
  return { docs, pages: pageList };
}

/** Respuesta en Markdown del modo guiado. */
export function guidedAnswer(question: string): string {
  const { docs, pages: found } = guidedSearch(question);
  const intro = "**Modo guiado.** En este momento respondo sin inteligencia artificial, con las fuentes verificadas de la biblioteca EDUCALEX.";
  if (!docs.length && !found.length) {
    return `${intro}\n\nNo encontré una ficha relacionada con tu pregunta. Prueba con palabras clave como «PIAR», «Decreto 1278», «convivencia escolar», «ascenso» o «Guía 34», o explora la [Biblioteca normativa](/biblioteca).`;
  }
  const parts = [intro];
  if (docs.length) {
    parts.push("**Documentos de la biblioteca:**");
    parts.push(docs.map((d) => `- **${d.nombreOficial}.** ${d.descripcion}${d.fuenteConsultada && d.fuenteUrl ? ` [Ver fuente oficial](${d.fuenteUrl})` : " (fuente pendiente de verificación)"}`).join("\n"));
  }
  if (found.length) {
    parts.push("**Secciones de EDUCALEX donde puedes profundizar:**");
    parts.push(found.map((p) => `- [${p.title}](${p.path}): ${p.description}`).join("\n"));
  }
  parts.push("Confirma siempre la norma y su vigencia en la fuente oficial.");
  return parts.join("\n\n");
}
