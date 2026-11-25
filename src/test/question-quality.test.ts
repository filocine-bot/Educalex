import { describe, expect, it } from "vitest";
import { getLibraryDoc, getPage } from "@/lib/educalex-sitemap";
import { ingresoDocenteV3 } from "@/lib/bank-v3/ingreso-docente";
import { ascensoReubicacionV3 } from "@/lib/bank-v3/ascenso-reubicacion";
import { rectorV3 } from "@/lib/bank-v3/rector";
import { coordinadorV3 } from "@/lib/bank-v3/coordinador";
import { nucleoComunV3 } from "@/lib/bank-v3/nucleo-comun";
import { levelsFor, questionsFor } from "@/lib/game-engine";
import { ingresoDocenteAmpliacion } from "@/lib/bank-v3/ampliacion-ingreso-docente";
import { coordinadorAmpliacion } from "@/lib/bank-v3/ampliacion-coordinador";
import { rectorAmpliacion } from "@/lib/bank-v3/ampliacion-rector";
import { ascensoReubicacionAmpliacion } from "@/lib/bank-v3/ampliacion-ascenso-reubicacion";

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

// Niveles del modo juego: los perfiles tienen 10 · 40 · 50 preguntas; el núcleo común, 10 · 15 · 15.
const SIZES: Record<string, number[]> = { "ingreso-docente": [10, 40, 50], coordinador: [10, 40, 50], rector: [10, 40, 50], "ascenso-reubicacion": [10, 40, 50], "nucleo-comun": [10, 15, 15] };
it.each(["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador", "nucleo-comun"] as const)("el juego arma cada nivel de %s con su complejidad", profile => {
  const levels = levelsFor(profile);
  expect(levels).toHaveLength(3);
  const sizes = SIZES[profile]!;
  levels.forEach((l, i) => { expect(l.questions).toHaveLength(sizes[i]!); });
  // El Básico reúne las preguntas de complejidad 1 y la dificultad nunca baja de un nivel al siguiente.
  expect(levels[0]!.questions.every(q => q.level === 1)).toBe(true);
  for (let i = 1; i < levels.length; i++) expect(Math.min(...levels[i]!.questions.map(q => q.level ?? 0))).toBeGreaterThanOrEqual(Math.max(...levels[i - 1]!.questions.map(q => q.level ?? 0)));
});

describe.each([["ingreso-docente", ingresoDocenteAmpliacion], ["coordinador", coordinadorAmpliacion], ["rector", rectorAmpliacion], ["ascenso-reubicacion", ascensoReubicacionAmpliacion]] as const)("ampliación de %s", (profile, extra) => {
  const all = questionsFor(profile);
  it("no repite códigos ni enunciados", () => {
    expect(new Set(all.map(q => q.id)).size).toBe(all.length);
    expect(new Set(all.map(q => q.prompt)).size).toBe(all.length);
  });
  it("cada pregunta nueva cumple la estructura tipo ICFES y cita una norma verificada", () => {
    for (const q of extra) {
      expect(q.context!.length, q.id).toBeGreaterThan(120);
      expect(q.prompt.trim().endsWith("?"), q.id).toBe(true);
      expect(new Set(q.options).size, q.id).toBe(4);
      expect(getPage(q.course), q.id).toBeDefined();
      expect(getLibraryDoc(q.documentId)?.fuenteConsultada, q.id).toBe(true);
    }
  });
  it("la correcta no se delata por su longitud en el banco completo", () => {
    let longest = 0;
    for (const q of all) {
      const lens = q.options.map(o => o.length); const others = lens.filter((_, i) => i !== q.correct);
      const ratio = lens[q.correct]! / avg(others);
      expect(ratio, q.id).toBeLessThanOrEqual(1.35); expect(ratio, q.id).toBeGreaterThanOrEqual(0.65);
      if (others.every(l => lens[q.correct]! > l)) longest++;
    }
    expect(longest / all.length).toBeLessThanOrEqual(0.4);
    for (const k of [0, 1, 2, 3]) expect(all.filter(q => q.correct === k).length).toBeGreaterThanOrEqual(all.length / 5);
  });
  it("los contextos se vuelven más exigentes al subir de nivel", () => {
    const byLevel = [1, 2, 3, 4].map(l => avg(all.filter(q => q.level === l).map(q => q.context!.length)));
    for (let i = 1; i < 4; i++) expect(byLevel[i]!).toBeGreaterThanOrEqual(byLevel[i - 1]! * 0.97);
  });
});
