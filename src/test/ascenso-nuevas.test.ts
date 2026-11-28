import { describe, expect, it } from "vitest";
import { examComponents, blocksOf } from "@/lib/exam-components";
import { ascensoNuevas2026 } from "@/lib/bank-v3/ascenso-nuevas-2026";

describe("ascenso y reubicación: preguntas del 27 nov. 2026", () => {
  const comps = examComponents("ascenso-reubicacion");
  it("Inclusión y Reflexión quedan con 20 preguntas en 2 bloques", () => {
    for (const id of ["incluir", "reflexion"]) {
      const c = comps.find(x => x.id === id)!;
      expect(c.questions).toHaveLength(20);
      expect(blocksOf(c)).toHaveLength(2);
    }
  });
  it("ids únicos en todo el perfil", () => {
    const ids = comps.flatMap(c => c.questions.map(q => q.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("cumplen la regla de longitud y no citan letras de opciones", () => {
    for (const q of ascensoNuevas2026) {
      const key = q.options[q.correct]!, others = q.options.filter((_, i) => i !== q.correct);
      expect(Math.min(...others.map(o => o.length))).toBeGreaterThanOrEqual(0.75 * key.length);
      expect(key.length).toBeLessThanOrEqual(1.15 * Math.max(...others.map(o => o.length)));
      expect(q.explanation).not.toMatch(/\b(opción|literal) [ABCD]\b/);
    }
  });
});

describe.each(["matematicas", "lengua", "naturales", "ingles", "sociales"])("ascenso y reubicación: casos de %s", id => {
  const area = examComponents("ascenso-reubicacion").find(c => c.group === "areas" && c.id === id)!;
  it("20 casos en 2 bloques, 5 claves por letra y regla de longitud", () => {
    expect(area.questions).toHaveLength(20);
    expect(blocksOf(area).map(b => b.questions.length)).toEqual([10, 10]);
    for (const k of [0, 1, 2, 3]) expect(area.questions.filter(q => q.correct === k)).toHaveLength(5);
    for (const q of area.questions) {
      const key = q.options[q.correct]!, others = q.options.filter((_, i) => i !== q.correct);
      expect(Math.min(...others.map(o => o.length)) / key.length, q.id).toBeGreaterThanOrEqual(0.75);
      expect(key.length / Math.max(...others.map(o => o.length)), q.id).toBeLessThanOrEqual(1.15);
    }
  });
  it("el bloque 1 son los casos 1 a 10", () => {
    expect(blocksOf(area)[0]!.questions.map(q => q.id).sort()).toEqual(Array.from({ length: 10 }, (_, i) => `${area.questions[0]!.id.split("-").slice(0, 2).join("-")}-${i + 1}`).sort());
  });
});

describe("rector: banco nuevo del concurso (bloques aprobados)", () => {
  it("cada pregunta nueva aparece una sola vez en los componentes de Rector", async () => {
    const { rectorBanco2026 } = await import("@/lib/bank-v3/rector-banco-2026");
    const ids = examComponents("rector").flatMap(c => c.questions.map(q => q.id));
    for (const q of rectorBanco2026) expect(ids.filter(id => id === q.id), q.id).toHaveLength(1);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
