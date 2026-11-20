import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { checkoutUrl, integritySignature, offersFor, products, purchasable, unlockedLevel, verifyEvent, wompiApiBase } from "@/lib/payments";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

describe("pagos Wompi", () => {
  it("firma de integridad = SHA256(referencia+monto+moneda+secreto)", async () => {
    expect(await integritySignature("EDX-123", 2500000, "COP", "test_integrity_x")).toBe(sha("EDX-1232500000COPtest_integrity_x"));
  });
  it("verifica el checksum de eventos y rechaza alteraciones", async () => {
    const data = { transaction: { id: "1234-1610641025-49201", status: "APPROVED", amount_in_cents: 2500000, reference: "EDX-abc" } };
    const props = ["transaction.id", "transaction.status", "transaction.amount_in_cents"];
    const timestamp = 1530291411;
    const checksum = sha(`1234-1610641025-49201APPROVED2500000${timestamp}test_events_secret`);
    const ev = { event: "transaction.updated", data, signature: { properties: props, checksum }, timestamp };
    expect(await verifyEvent(ev, "test_events_secret")).toBe(true);
    expect(await verifyEvent(ev, "otro")).toBe(false);
    expect(await verifyEvent({ ...ev, data: { transaction: { ...data.transaction, amount_in_cents: 100 } } }, "test_events_secret")).toBe(false);
    expect(await verifyEvent({ event: ev.event, data, timestamp }, "test_events_secret")).toBe(false);
  });
  it("arma la URL del checkout", () => {
    const u = new URL(checkoutUrl({ publicKey: "pub_test_x", reference: "EDX-1", amountInCents: 1000000, signature: "abc", redirectUrl: "https://e.app/r", email: "a@b.co" }));
    expect(u.origin).toBe("https://checkout.wompi.co");
    expect(u.searchParams.get("signature:integrity")).toBe("abc");
    expect(u.searchParams.get("amount-in-cents")).toBe("1000000");
  });
  it("elige el ambiente según la llave", () => {
    expect(wompiApiBase("pub_test_x")).toContain("sandbox");
    expect(wompiApiBase("pub_prod_x")).toContain("production");
  });
  it("precios de lanzamiento: Intermedio $29.900, Completo $49.900 y mejora por la diferencia", () => {
    const forSale = products.filter(purchasable);
    expect(forSale).toHaveLength(13);
    expect(products.find(p => p.id === "directivo-completo")?.priceCOP).toBe(79900);
    expect(products.find(p => p.id === "intermedio-rector")?.priceCOP).toBe(29900);
    expect(products.find(p => p.id === "completo-rector")?.priceCOP).toBe(49900);
    expect(products.find(p => p.id === "mejora-rector")?.priceCOP).toBe(20000);
    expect(purchasable(products.find(p => p.id === "premium-todos")!)).toBe(false);
  });
  it("cada plan desbloquea hasta su nivel y conserva compras anteriores", () => {
    expect(unlockedLevel([], "rector")).toBe(1);
    expect(unlockedLevel(["intermedio-rector"], "rector")).toBe(2);
    expect(unlockedLevel(["intermedio-rector"], "coordinador")).toBe(1);
    expect(unlockedLevel(["completo-rector"], "rector")).toBe(4);
    expect(unlockedLevel(["premium-todos"], "coordinador")).toBe(4);
    expect(unlockedLevel(["premium-rector"], "rector")).toBe(4);
  });
  it("ofrece solo lo que tiene sentido comprar", () => {
    expect(offersFor([], "rector").map(p => p.id)).toEqual(["intermedio-rector", "completo-rector", "directivo-completo"]);
    expect(offersFor([], "ingreso-docente").map(p => p.id)).toEqual(["intermedio-ingreso-docente", "completo-ingreso-docente"]);
    expect(offersFor(["completo-coordinador"], "rector").map(p => p.id)).toEqual(["intermedio-rector", "completo-rector"]);
    expect(unlockedLevel(["directivo-completo"], "coordinador")).toBe(4);
    expect(offersFor(["intermedio-rector"], "rector").map(p => p.id)).toEqual(["mejora-rector"]);
    expect(offersFor(["completo-rector"], "rector")).toEqual([]);
  });
});
