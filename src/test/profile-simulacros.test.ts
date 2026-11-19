import { expect, it } from "vitest";
import { simulacrosFor } from "@/lib/profile-navigation";

it("cada perfil ve solo sus simulacros", () => {
  expect(simulacrosFor("ingreso-docente")).toEqual(["ingreso-docente"]);
  expect(simulacrosFor("ascenso-reubicacion")).toEqual(["ascenso-reubicacion"]);
  expect(simulacrosFor("rector")).toEqual(["rector"]);
  expect(simulacrosFor("coordinador")).toEqual(["coordinador"]);
  expect(simulacrosFor("directivo")).toEqual(["rector", "coordinador"]);
  expect(simulacrosFor(null)).toHaveLength(4);
});
