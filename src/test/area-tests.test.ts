import { describe, expect, it } from "vitest";
import { AREA_TESTS, blocksOf, examComponents } from "@/lib/exam-components";

const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

describe.each(AREA_TESTS["ingreso-docente"].map(a => [a.title, a] as const))("prueba por área %s (ingreso)", (_, area) => {
  it("tiene 30 preguntas, 3 bloques de 10 y estructura completa", () => {
    expect(area.questions).toHaveLength(30);
    expect(blocksOf(area).map(b => b.questions.length)).toEqual([10, 10, 10]);
    expect(new Set(area.questions.map(q => q.id)).size).toBe(30);
    for (const q of area.questions) {
      expect(q.context?.length ?? 0, q.id).toBeGreaterThan(120);
      expect(q.prompt.trim().endsWith("?"), q.id).toBe(true);
      expect(new Set(q.options).size, q.id).toBe(4);
    }
  });
  it("claves balanceadas y sin pista de extensión en opciones de texto", () => {
    for (const k of [0, 1, 2, 3]) expect(area.questions.filter(q => q.correct === k).length).toBeGreaterThanOrEqual(6);
    for (const q of area.questions) {
      const lens = q.options.map(o => o.length);
      if (lens[q.correct]! <= 20) continue; // respuestas numéricas cortas
      const others = lens.filter((_, i) => i !== q.correct);
      expect(Math.min(...others) / lens[q.correct]!, q.id).toBeGreaterThanOrEqual(0.75);
      expect(lens[q.correct]! / Math.max(...others), q.id).toBeLessThanOrEqual(1.15);
    }
  });
  it("la dificultad no baja de un bloque al siguiente y aparece en el simulacro", () => {
    const b = blocksOf(area).map(x => avg(x.questions.map(q => q.level ?? 0)));
    for (let i = 1; i < b.length; i++) expect(b[i]!).toBeGreaterThanOrEqual(b[i - 1]!);
    expect(examComponents("ingreso-docente").some(c => c.id === area.id && c.group === "areas")).toBe(true);
  });
});
