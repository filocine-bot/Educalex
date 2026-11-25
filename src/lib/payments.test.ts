import { describe, expect, it } from "vitest";

import { offerForLevel } from "@/lib/payments";
describe("botón de pago por nivel", () => {
  it("sin compras: Intermedio ofrece el plan Intermedio y Avanzado el Plan Avanzado", () => {
    expect(offerForLevel([], "rector", 2)?.id).toBe("intermedio-rector");
    expect(offerForLevel([], "rector", 3)?.id).toBe("completo-rector");
    expect(offerForLevel([], "rector", 4)).toBeNull();
  });
  it("con el plan Intermedio ofrece pasar a Completo pagando la diferencia", () => {
    expect(offerForLevel(["intermedio-rector"], "rector", 2)).toBeNull();
    expect(offerForLevel(["intermedio-rector"], "rector", 3)?.id).toBe("mejora-rector");
  });
  it("no ofrece nada si el nivel ya está desbloqueado o es el Básico", () => {
    expect(offerForLevel([], "coordinador", 1)).toBeNull();
    expect(offerForLevel(["completo-coordinador"], "coordinador", 3)).toBeNull();
  });
});
