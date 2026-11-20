// Genera public/sitemap.xml a partir del mapa del sitio y del catálogo de la biblioteca.
// Se ejecuta antes de cada build (package.json → "build"), así nunca queda desactualizado.
import { writeFileSync } from "node:fs";
import { libraryDocs, pages } from "../src/lib/educalex-sitemap";

const SITE = "https://www.educalex.co";
// Páginas personales, de administración o de acceso: no se indexan.
const PRIVATE = /^\/(mi-|mis-|admin|ingresar|registro|certificado|pago|reset-password)/;

export function sitemapPaths(): string[] {
  const sections = ["/", "/nosotros", "/docente-ia", ...Object.keys(pages)].filter(p => !PRIVATE.test(p));
  const fichas = libraryDocs.map(d => `/biblioteca/ficha/${d.id}`);
  return [...new Set([...sections, ...fichas])];
}

export function sitemapXml(today = new Date().toISOString().slice(0, 10)): string {
  const urls = sitemapPaths().map(p => `  <url><loc>${SITE}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

if (import.meta.main) {
  writeFileSync(new URL("../public/sitemap.xml", import.meta.url), sitemapXml());
  console.log(`sitemap.xml: ${sitemapPaths().length} direcciones`);
}
