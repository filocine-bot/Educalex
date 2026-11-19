import { describe, expect, it } from "vitest";
import { bankForVersion, legacyBankV2, PRACTICE_EXAM_VERSION, simulationBank } from "@/lib/simulation-bank";
import { resultScore } from "@/lib/simulation-scoring";

// Las entregas guardadas antes del 19 nov 2026 (practice-v2) deben revisarse con el banco con que se respondieron.
const v2Keys = {
  "ingreso-docente": [1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 2, 0, 3, 1, 2, 0, 1, 3, 1, 2, 1, 3, 2, 0, 0, 0, 2, 3, 1, 1, 2, 2, 0, 0, 3, 3],
  "ascenso-reubicacion": [2, 0, 3, 1, 2, 0, 3, 1, 2, 0, 3, 1, 3, 0, 2, 1, 3, 0, 2, 1, 1, 3, 0, 2, 1, 3, 2, 1, 0, 0, 3, 2, 0, 1, 3, 3, 1, 0, 2, 2],
  rector: [0, 3, 1, 2, 0, 3, 1, 2, 0, 2, 3, 1, 0, 2, 3, 1, 0, 2, 3, 1, 0, 2, 0, 3, 0, 2, 3, 1, 1, 1, 3, 2, 0, 0, 3, 3, 1, 1, 2, 2],
  coordinador: [3, 1, 2, 0, 3, 1, 2, 0, 1, 3, 0, 2, 3, 1, 0, 2, 3, 1, 2, 0, 1, 2, 1, 3, 1, 2, 3, 0, 0, 0, 3, 2, 1, 1, 3, 3, 0, 0, 2, 2],
} as const;

describe("versiones del banco de práctica", () => {
  it("las entregas nuevas se guardan como practice-v3", () => expect(PRACTICE_EXAM_VERSION).toBe("practice-v3"));
  it.each(Object.entries(v2Keys))("el banco anterior de %s conserva sus claves y orden", (profile, keys) => {
    expect(legacyBankV2[profile as keyof typeof v2Keys].questions.map(q => q.correct)).toEqual(keys);
  });
  it("una entrega v2 perfecta sigue valiendo 40/40 con el banco anterior", () => {
    const answers = [...v2Keys.rector];
    expect(resultScore({ profile: "rector", answers, elapsedSeconds: 1, timedOut: false, version: "practice-v2" }).correct).toBe(40);
    expect(resultScore({ profile: "rector", answers, elapsedSeconds: 1, timedOut: false }).correct).toBeLessThan(40);
  });
  it("cada versión usa su banco", () => {
    expect(bankForVersion("coordinador", "practice-v2")).toBe(legacyBankV2.coordinador);
    expect(bankForVersion("coordinador", "practice-v3")).toBe(simulationBank.coordinador);
    expect(bankForVersion("coordinador", "practice-v1").questions).toHaveLength(8);
  });
});
