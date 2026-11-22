import { describe, expect, it } from "vitest";
import { codeFromToken, signCertificate, verifyCertificate } from "@/lib/certificate-token";
const k = Buffer.from("clave-de-prueba");
const p = { v: 1 as const, n: "Ana María Pérez", p: "rector" as const, l: [{ n: 1, b: 90 }], d: "2026-11-22" };
describe("constancias verificables", () => {
  it("verifica una constancia firmada", () => { expect(verifyCertificate(signCertificate(p, k), k)).toEqual(p); });
  it("rechaza datos alterados", () => {
    const [, sig] = signCertificate(p, k).split(".");
    const forged = Buffer.from("1~Ana María Pérez~r~1:90,4:100~20261122").toString("base64url") + "." + sig;
    expect(verifyCertificate(forged, k)).toBeNull();
  });
  it("rechaza otra clave", () => { expect(verifyCertificate(signCertificate(p, k), Buffer.from("otra"))).toBeNull(); });
  it("el código depende de la firma", () => { expect(codeFromToken(signCertificate(p, k))).toMatch(/^EDX-[0-9A-F]{10}$/); });
});
describe("tamaño del QR", () => {
  it("el enlace es corto", () => {
    const t = signCertificate({ ...p, n: "María Fernanda Rodríguez Castañeda", l: [{ n: 1, b: 90 }, { n: 2, b: 85 }, { n: 3, b: 80 }, { n: 4, b: 70 }] }, k);
    expect(("https://www.educalex.co/verificar?t=" + t).length).toBeLessThan(160);
  });
});
