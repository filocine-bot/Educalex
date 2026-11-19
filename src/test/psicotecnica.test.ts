import { expect, it } from "vitest";
import { psychoItems, psychoProfile } from "@/lib/psicotecnica";

it("cada situación ofrece cuatro actuaciones de tendencias distintas", () => {
  for (const item of psychoItems) {
    expect(item.options).toHaveLength(4);
    expect(new Set(item.options.map(o => o.dimension)).size).toBe(4);
  }
});
it("el perfil suma una tendencia por respuesta y no puntúa", () => {
  const profile = psychoProfile(psychoItems.map(() => 0));
  expect(profile.reduce((a, p) => a + p.count, 0)).toBe(psychoItems.length);
});
