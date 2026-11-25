import { describe, expect, it } from "vitest";

import { offerForLevel } from "@/lib/payments";
describe("botón de pago por nivel", () => {
  it("sin compras: cada nivel ofrece el acceso completo del perfil", () => {
    expect(offerForLevel([], "rector", 2)?.id).toBe("completo-rector");
    expect(offerForLevel([], "rector", 3)?.id).toBe("completo-rector");
    expect(offerForLevel([], "rector", 4)).toBeNull();
  });
  it("con un plan anterior ofrece el acceso completo para lo que falta", () => {
    expect(offerForLevel(["intermedio-rector"], "rector", 2)).toBeNull();
    expect(offerForLevel(["intermedio-rector"], "rector", 3)?.id).toBe("completo-rector");
  });
  it("no ofrece nada si el nivel ya está desbloqueado o es el Básico", () => {
    expect(offerForLevel([], "coordinador", 1)).toBeNull();
    expect(offerForLevel(["completo-coordinador"], "coordinador", 3)).toBeNull();
  });
});
