import { expect, it } from "vitest";
import { certificateCode, isGameBankKey, passedLevels } from "@/lib/certificate";
import { dilemmas } from "@/lib/dilemmas";

it("el código de la constancia es estable y cambia con los datos", () => {
  const a = certificateCode("Ana Pérez", "rector", [1, 2], "2026-11-19");
  expect(a).toBe(certificateCode("ana pérez ", "rector", [1, 2], "2026-11-19"));
  expect(a).not.toBe(certificateCode("Ana Pérez", "rector", [1], "2026-11-19"));
  expect(a).toMatch(/^EDX-[0-9A-Z]{7}$/);
});
it("solo cuenta niveles superados y valida el perfil", () => {
  expect(passedLevels({ unlocked: 2, best: { 1: 80 }, points: 0, bestStreak: 0, correctIds: [], badges: ["nivel:1"] })).toEqual([{ number: 1, name: "Básico", best: 80 }]);
  expect(isGameBankKey("nucleo-comun")).toBe(true);
  expect(isGameBankKey("otro")).toBe(false);
});
it("cada dilema tiene tres decisiones con consecuencias y fundamento", () => {
  for (const d of dilemmas) { expect(d.options).toHaveLength(3); expect(d.norms.length).toBeGreaterThan(0); for (const o of d.options) expect(o.consequence.length).toBeGreaterThan(40); }
});
