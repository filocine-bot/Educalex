import { describe, expect, it } from "vitest";
import { ingresoDocenteV3 } from "@/lib/bank-v3/ingreso-docente";
import { ascensoReubicacionV3 } from "@/lib/bank-v3/ascenso-reubicacion";
import { rectorV3 } from "@/lib/bank-v3/rector";
import { coordinadorV3 } from "@/lib/bank-v3/coordinador";
import { nucleoComunV3 } from "@/lib/bank-v3/nucleo-comun";
import { levelsFor } from "@/lib/game-engine";

// Control de calidad tipo ICFES: contexto + tarea + cuatro opciones homogéneas; complejidad creciente por nivel.
const banks = { "ingreso-docente": ingresoDocenteV3, "ascenso-reubicacion": ascensoReubicacionV3, rector: rectorV3, coordinador: coordinadorV3, "nucleo-comun": nucleoComunV3 };
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

describe.each(Object.entries(banks))("calidad del banco %s", (_, qs) => {
  it("cada pregunta tiene contexto, tarea, nivel y opciones distintas", () => {
    for (const q of qs) {
      expect(q.context?.length ?? 0, q.id).toBeGreaterThan(120);
      expect(q.prompt.trim().endsWith("?"), q.id).toBe(true);
      expect(q.level, q.id).toBeDefined();
      expect(new Set(q.options).size, q.id).toBe(4);
    }
  });
  it("tiene 10 preguntas por nivel y claves balanceadas", () => {
    for (const l of [1, 2, 3, 4]) expect(qs.filter(q => q.level === l)).toHaveLength(10);
    for (const k of [0, 1, 2, 3]) expect(qs.filter(q => q.correct === k).length).toBeGreaterThanOrEqual(5);
  });
  it("la correcta no se delata por ser la más larga", () => {
    let longest = 0;
    for (const q of qs) {
      const lens = q.options.map(o => o.length);
      const others = lens.filter((_, i) => i !== q.correct);
      const ratio = lens[q.correct]! / avg(others);
      expect(ratio, `${q.id}: la correcta mide ${ratio.toFixed(2)} veces el promedio`).toBeLessThanOrEqual(1.35);
      expect(ratio, q.id).toBeGreaterThanOrEqual(0.65);
      if (others.every(l => lens[q.correct]! > l)) longest++; // estrictamente la más larga (los empates no delatan)
    }
    expect(longest / qs.length).toBeLessThanOrEqual(0.4);
  });
  it("los contextos se vuelven más exigentes al subir de nivel", () => {
    const byLevel = [1, 2, 3, 4].map(l => avg(qs.filter(q => q.level === l).map(q => q.context!.length)));
    for (let i = 1; i < 4; i++) expect(byLevel[i]!).toBeGreaterThanOrEqual(byLevel[i - 1]! * 0.97);
  });
});

it.each(["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador", "nucleo-comun"] as const)("el juego arma cada nivel de %s con su complejidad", profile => {
  const levels = levelsFor(profile);
  expect(levels).toHaveLength(4);
  levels.forEach(l => { expect(l.questions).toHaveLength(10); expect(l.questions.every(q => q.level === l.number)).toBe(true); });
});
