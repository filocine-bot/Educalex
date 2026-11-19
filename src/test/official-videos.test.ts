import { describe, expect, it } from "vitest";
import { themesFor, videoThemes } from "@/lib/official-videos";

describe("videoteca oficial", () => {
  const all = videoThemes.flatMap(t => t.videos);
  it("tiene identificadores de YouTube válidos y únicos", () => {
    for (const v of all) expect(v.id).toMatch(/^[A-Za-z0-9_-]{11}$/);
    expect(new Set(all.map(v => v.id)).size).toBe(all.length);
  });
  it("cada video enlaza una ficha o transcripción oficial del MEN", () => {
    for (const v of all) expect(v.transcript ?? v.page).toMatch(/^https:\/\/www\.mineducacion\.gov\.co\//);
  });
  it("incluye videos en Lengua de Señas Colombiana y la Ruta de Atención Integral", () => {
    expect(all.filter(v => v.lsc).length).toBe(4);
    expect(videoThemes.find(t => t.id === "convivencia")?.title).toMatch(/Ruta de Atención Integral/);
  });
  it("asocia temáticas a los cursos", () => {
    expect(themesFor("/formacion/educacion-rural").map(t => t.id)).toEqual(["rural", "etnoeducacion"]);
    expect(themesFor("/formacion/steam-robotica")).toHaveLength(1);
  });
});
