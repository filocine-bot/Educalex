import { describe, expect, it } from "vitest";
import { classifyCases, routeComponents, situationTypes } from "@/lib/ruta-atencion";
import { pages, libraryDocs } from "@/lib/educalex-sitemap";
import { headerNavigation } from "@/lib/header-navigation";

describe("Ruta de Atención Integral", () => {
  it("tiene los cuatro componentes y los tres tipos con fuente", () => {
    expect(routeComponents.map(c => c.id)).toEqual(["promocion", "prevencion", "atencion", "seguimiento"]);
    expect(situationTypes.map(t => t.type)).toEqual(["I", "II", "III"]);
    for (const t of situationTypes) { expect(t.protocol.length).toBeGreaterThan(2); expect(t.source).toMatch(/Decreto 1965/); }
  });
  it("los casos de práctica cubren los tres tipos", () => {
    expect(new Set(classifyCases.map(c => c.answer))).toEqual(new Set(["I", "II", "III"]));
  });
  it("está enlazada desde el menú y desde las fichas de convivencia", () => {
    expect(pages["/formacion/ruta-atencion-integral"]).toBeDefined();
    const formacion = headerNavigation.find(i => i.to === "/formacion");
    expect(formacion?.children?.some(c => c.to === "/formacion/ruta-atencion-integral")).toBe(true);
    for (const id of ["ley-1620-2013", "decreto-1965-2013", "protocolos-convivencia"]) {
      expect(libraryDocs.find(d => d.id === id)?.related).toContain("/formacion/ruta-atencion-integral");
    }
  });
});
