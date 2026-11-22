import { describe, expect, it } from "vitest";
import { whatsappMessage, WHATSAPP_NUMBER } from "@/components/whatsapp-launcher";
describe("WhatsApp", () => {
  it("usa el número de Educalex con indicativo de Colombia", () => { expect(WHATSAPP_NUMBER).toBe("573018747379"); });
  it("adapta el mensaje a la sección", () => {
    expect(whatsappMessage("/planes")).toContain("planes");
    expect(whatsappMessage("/simulacros/rector")).toContain("simulacro de rector");
    expect(whatsappMessage("/asesoria-investigacion")).toContain("asesoría");
    expect(whatsappMessage("/")).toContain("información sobre Educalex");
  });
});
