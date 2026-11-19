// Pagos con Wompi: catálogo y utilidades puras (sin acceso a red ni a base de datos).
import type { SimulationProfile } from "@/lib/simulation-bank";

export const WOMPI_PUBLIC_KEY = "pub_prod_4A8Op11I2dUFiwGesOZ8Mdx4HtDrLjFI";

export type ProductId = "premium-todos" | `premium-${SimulationProfile}`;
export type Product = { id: ProductId; title: string; description: string; profiles: SimulationProfile[]; priceCOP: number | null };

export const PROFILES: SimulationProfile[] = ["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador"];
const PROFILE_LABEL: Record<SimulationProfile, string> = { "ingreso-docente": "Ingreso docente", "ascenso-reubicacion": "Ascenso y reubicación", rector: "Rector", coordinador: "Coordinador" };

/**
 * Precios en pesos colombianos. null = aún sin definir (no se puede comprar).
 * Los define Enadis; cambiar aquí y publicar.
 */
export const PRICES: Record<ProductId, number | null> = {
  "premium-todos": null,
  "premium-ingreso-docente": null,
  "premium-ascenso-reubicacion": null,
  "premium-rector": null,
  "premium-coordinador": null,
};

export const products: Product[] = [
  { id: "premium-todos", title: "Acceso Premium completo", description: "Niveles Intermedio, Avanzado y Experto de los cuatro perfiles.", profiles: PROFILES, priceCOP: PRICES["premium-todos"] },
  ...PROFILES.map(p => ({ id: `premium-${p}` as ProductId, title: `Premium · ${PROFILE_LABEL[p]}`, description: `Niveles Intermedio, Avanzado y Experto del perfil ${PROFILE_LABEL[p]}.`, profiles: [p], priceCOP: PRICES[`premium-${p}` as ProductId] })),
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const purchasable = (p: Product) => typeof p.priceCOP === "number" && p.priceCOP >= 1000;

/** Productos que dan acceso premium a un perfil. */
export function productsCovering(profile: SimulationProfile): ProductId[] {
  return ["premium-todos", `premium-${profile}` as ProductId];
}

export function wompiApiBase(publicKey: string) {
  return publicKey.startsWith("pub_test_") ? "https://sandbox.wompi.co/v1" : "https://production.wompi.co/v1";
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, "0")).join("");
}

/** Firma de integridad del Web Checkout: SHA256(referencia + monto en centavos + moneda + secreto de integridad). */
export function integritySignature(reference: string, amountInCents: number, currency: string, integritySecret: string) {
  return sha256Hex(`${reference}${amountInCents}${currency}${integritySecret}`);
}

export function checkoutUrl(o: { publicKey: string; reference: string; amountInCents: number; signature: string; redirectUrl: string; email?: string | undefined }) {
  const q = new URLSearchParams({
    "public-key": o.publicKey,
    currency: "COP",
    "amount-in-cents": String(o.amountInCents),
    reference: o.reference,
    "signature:integrity": o.signature,
    "redirect-url": o.redirectUrl,
  });
  if (o.email) q.set("customer-data:email", o.email);
  return `https://checkout.wompi.co/p/?${q.toString()}`;
}

type WompiEvent = { event?: string; data?: Record<string, unknown>; signature?: { properties?: string[]; checksum?: string }; timestamp?: number | string };

function pick(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), obj);
}

/** Verifica el checksum de un evento de Wompi: SHA256(valores de signature.properties + timestamp + secreto de eventos). */
export async function verifyEvent(ev: WompiEvent, eventsSecret: string): Promise<boolean> {
  const props = ev.signature?.properties, checksum = ev.signature?.checksum;
  if (!Array.isArray(props) || typeof checksum !== "string" || ev.timestamp === undefined || !ev.data) return false;
  const values = props.map(p => pick(ev.data, p));
  if (values.some(v => v === undefined || v === null)) return false;
  const expected = await sha256Hex(`${values.map(String).join("")}${ev.timestamp}${eventsSecret}`);
  return expected.toLowerCase() === checksum.toLowerCase();
}

export const newReference = () => `EDX-${crypto.randomUUID()}`;
