import { describe, expect, it } from "vitest";
import { getLibraryDoc, libraryDocs } from "@/lib/educalex-sitemap";
import { guia34Units, GUIA34_INDEX_URL, GUIA34_UPDATE_URL, PLAN_DECENAL_URL } from "@/lib/guia-34-content";

describe("Fuentes de la biblioteca", () => {
  it.each([
    ["decreto-1278-2002", "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5353"],
    ["decreto-1421-2017", "https://www.mineducacion.gov.co/portal/normativa/Decretos/381928:Decreto-1421-de-agosto-29-de-2017"],
    ["guia-34", GUIA34_INDEX_URL],
    ["plan-decenal-2026-2035", PLAN_DECENAL_URL],
    ["convocatorias-docentes-2026", "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026"],
  ])("%s conserva el enlace institucional comprobado", (id, url) => {
    expect(getLibraryDoc(id)?.fuenteConsultada).toBe(true);
    expect(getLibraryDoc(id)?.fuenteUrl).toBe(url);
  });

  it("usa el periodo oficial 2026–2035 y no conserva el registro 2026–2036", () => {
    expect(getLibraryDoc("plan-decenal-2026-2035")?.title).toBe("IV Plan Nacional Decenal de Educación 2026–2035");
    expect(libraryDocs.some(doc => doc.title.includes("2026-2036") || doc.title.includes("2026–2036"))).toBe(false);
  });

  it("distingue el índice de la Guía 34 de la página oficial de actualización", () => {
    expect(getLibraryDoc("guia-34")?.fuenteUrl).toBe(GUIA34_INDEX_URL);
    expect(getLibraryDoc("guia-34")?.descripcion).toContain("no es el PDF");
    expect(getLibraryDoc("guia-34-actualizacion-2026")?.fuenteUrl).toBe(GUIA34_UPDATE_URL);
  });

  it("no incorpora botones potenciales ni URL en fichas pendientes", () => {
    for (const doc of libraryDocs.filter(doc => !doc.fuenteConsultada)) {
      expect(doc.fuenteUrl, doc.id).toBeUndefined();
      expect(doc.notas, doc.id).toMatch(/Fuente pendiente de verificación|Ficha de orientación sin enlace propio/);
    }
  });

  it("completa los campos documentales sin afirmar lectura completa", () => {
    for (const doc of libraryDocs) {
      expect(doc.nombreOficial.trim().length, doc.id).toBeGreaterThan(0);
      expect(doc.tipo.trim().length, doc.id).toBeGreaterThan(0);
      expect(doc.entidad.trim().length, doc.id).toBeGreaterThan(0);
      expect(doc.descripcion.length, doc.id).toBeGreaterThan(40);
      expect(doc.notas, doc.id).not.toContain("documento leído completo");
    }
  });
});

describe("Curso Guía 34/PMI", () => {
  it("contiene exactamente ocho unidades pedagógicas desarrolladas", () => {
    expect(guia34Units).toHaveLength(8);
    for (const unit of guia34Units) {
      expect(unit.objective.length).toBeGreaterThan(40);
      expect(unit.explanation).toHaveLength(2);
      expect(unit.application.length).toBeGreaterThan(40);
    }
  });

  it("diferencia expresamente la guía metodológica de una norma", () => {
    expect(guia34Units[0]?.explanation[0]).toContain("No es una ley ni un decreto");
  });
});
