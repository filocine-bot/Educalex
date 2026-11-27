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
