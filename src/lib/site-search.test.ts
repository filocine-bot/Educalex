import { describe, expect, it } from "vitest";
import { searchSite } from "./site-search";

describe("searchSite", () => {
  it("encuentra normas sin importar tildes ni mayúsculas", () => {
    expect(searchSite("decreto 1278").some(h => h.kind === "Biblioteca")).toBe(true);
    expect(searchSite("CONVIVENCIA").length).toBeGreaterThan(0);
  });
  it("no muestra páginas de administración", () => {
    expect(searchSite("administración revisión").some(h => h.to.startsWith("/admin"))).toBe(false);
  });
  it("devuelve vacío con texto vacío", () => { expect(searchSite("  ")).toEqual([]); });
});
