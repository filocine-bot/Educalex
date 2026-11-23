import { describe, expect, it } from "vitest";
import { applyOutcome, emptyProfile, errorMap, isLevelPlayable, levelsFor, mergeProgress, pointsFor } from "@/lib/game-engine";
import { simulationBank } from "@/lib/simulation-bank";

describe("modo juego", () => {
  it("divide cada perfil en cuatro niveles (ingreso ampliado a 10 · 20 · 30 · 40)", () => {
    const sizes: Record<string, number[]> = { "ingreso-docente": [10, 20, 30, 40] };
    for (const p of ["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador"] as const) {
      const levels = levelsFor(p);
      expect(levels.map(l => l.questions.length)).toEqual(sizes[p] ?? [10, 10, 10, 10]);
      expect(levels[0]!.premium).toBe(false);
      expect(levels[1]!.premium).toBe(true);
    }
  });
  it("da bono por racha con tope", () => {
    expect(pointsFor(false, 0)).toBe(0);
    expect(pointsFor(true, 1)).toBe(10);
    expect(pointsFor(true, 3)).toBe(14);
    expect(pointsFor(true, 20)).toBe(20);
  });
  it("desbloquea el siguiente nivel con 70 % y otorga insignias", () => {
    const qs = levelsFor("rector")[0]!.questions;
    const answers = qs.map((q, i) => ({ id: q.id, correct: i < 7 }));
    const { progress, newBadges } = applyOutcome("rector", emptyProfile(), { level: 1, answers, pointsEarned: 90, bestStreak: 7 });
    expect(progress.unlocked).toBe(2);
    expect(progress.best[1]).toBe(70);
    expect(newBadges).toContain("nivel:1");
    expect(newBadges).toContain("racha:5");
    expect(newBadges).not.toContain("perfecto:1");
  });
  it("no desbloquea con menos de 70 %", () => {
    const qs = levelsFor("rector")[0]!.questions;
    const { progress } = applyOutcome("rector", emptyProfile(), { level: 1, answers: qs.map((q, i) => ({ id: q.id, correct: i < 6 })), pointsEarned: 0, bestStreak: 6 });
    expect(progress.unlocked).toBe(1);
  });
  it("bloquea niveles premium solo si se activa el cobro", () => {
    const l2 = levelsFor("coordinador")[1]!;
    const p = { ...emptyProfile(), unlocked: 2 };
    expect(isLevelPlayable(l2, p, false).playable).toBe(true);
    expect(isLevelPlayable(l2, p, true)).toEqual({ playable: false, reason: "premium" });
    expect(isLevelPlayable(l2, emptyProfile(), false)).toEqual({ playable: false, reason: "progress" });
  });
  it("une el progreso del navegador y de la cuenta", () => {
    const a = { rector: { ...emptyProfile(), unlocked: 3, points: 50, best: { 1: 80 }, badges: ["nivel:1"] } };
    const b = { rector: { ...emptyProfile(), unlocked: 2, points: 90, best: { 1: 90, 2: 70 }, badges: ["nivel:2"] } };
    const m = mergeProgress(a, b).rector!;
    expect(m.unlocked).toBe(3); expect(m.points).toBe(90); expect(m.best).toEqual({ 1: 90, 2: 70 });
    expect(m.badges.sort()).toEqual(["nivel:1", "nivel:2"]);
  });
  it("agrupa errores por competencia", () => {
    const qs = simulationBank["ingreso-docente"].questions.slice(0, 10);
    const map = errorMap(qs, [qs[0]!.id, qs[1]!.id]);
    expect(map.reduce((n, g) => n + g.items.length, 0)).toBe(2);
  });
});
