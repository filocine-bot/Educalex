import { describe, expect, it } from "vitest";
import { sitemapPaths, sitemapXml } from "../../scripts/generate-sitemap";

describe("sitemap.xml", () => {
  it("incluye páginas públicas y fichas, y excluye las personales", () => {
    const paths = sitemapPaths();
    expect(paths).toContain("/");
    expect(paths).toContain("/formacion/ruta-atencion-integral");
    expect(paths).toContain("/biblioteca/ficha/ley-1620-2013");
    expect(paths.some(p => /^\/(mi-|mis-|admin|ingresar|registro)/.test(p))).toBe(false);
    expect(sitemapXml("2026-11-20")).toContain("<loc>https://www.educalex.co/planes</loc>");
  });
});
