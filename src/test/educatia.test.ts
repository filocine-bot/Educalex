import { describe, expect, it } from "vitest";
import { textForSpeech } from "@/lib/educatia-voice";
import { guidedAnswer, guidedSearch } from "@/lib/educatia-guided";

describe("EducatIA: lectura en voz alta", () => {
  it("quita el formato Markdown y los enlaces largos", () => {
    expect(textForSpeech("**Decreto 1421.** Ver [fuente oficial](https://www.mineducacion.gov.co/x) y https://ejemplo.gov.co")).toBe("Decreto 1421. Ver fuente oficial y enlace");
  });
  it("convierte listas en pausas", () => {
    expect(textForSpeech("Pasos:\n- Uno\n- Dos")).toBe("Pasos: . Uno . Dos");
  });
});

describe("EducatIA: modo guiado", () => {
  it("encuentra el Decreto 1421 al preguntar por el PIAR", () => {
    const r = guidedSearch("¿Cómo elaborar un PIAR para un estudiante con discapacidad?");
    expect(r.docs.some(d => d.id === "decreto-1421-2017" || d.id === "piar")).toBe(true);
  });
  it("encuentra la Ley 1620 al preguntar por convivencia escolar", () => {
    expect(guidedSearch("comité de convivencia escolar y acoso").docs.some(d => d.id === "ley-1620-2013" || d.id === "decreto-1965-2013")).toBe(true);
  });
  it("solo enlaza fuentes verificadas y nunca páginas de administración", () => {
    const text = guidedAnswer("decreto 1278 ascenso escalafón administración usuarios");
    expect(text).toContain("Modo guiado");
    expect(text).not.toContain("/admin");
  });
  it("orienta cuando no encuentra nada", () => {
    expect(guidedAnswer("xyzw qwerty")).toContain("No encontré una ficha");
  });
});

import { voiceScore } from "@/lib/educatia-voice";
describe("voz de EducatIA", () => {
  it("prefiere voces femeninas y naturales en español latinoamericano", () => {
    const salome = { name: "Microsoft Salome Online (Natural) - Spanish (Colombia)", lang: "es-CO" };
    const gonzalo = { name: "Microsoft Gonzalo Online (Natural) - Spanish (Colombia)", lang: "es-CO" };
    const googleUs = { name: "Google español de Estados Unidos", lang: "es-US" };
    const generic = { name: "Spanish", lang: "es-ES" };
    expect(voiceScore(salome)).toBeGreaterThan(voiceScore(gonzalo));
    expect(voiceScore(salome)).toBeGreaterThan(voiceScore(googleUs));
    expect(voiceScore(googleUs)).toBeGreaterThan(voiceScore(generic));
  });
});
