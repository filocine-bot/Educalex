// Pagos con Wompi: catálogo y utilidades puras (sin acceso a red ni a base de datos).
import type { SimulationProfile } from "@/lib/simulation-bank";

export const WOMPI_PUBLIC_KEY = "pub_prod_4A8Op11I2dUFiwGesOZ8Mdx4HtDrLjFI";

export type PlanTier = "intermedio" | "completo" | "mejora";
export type ProductId = "premium-todos" | "directivo-completo" | `premium-${SimulationProfile}` | `${PlanTier}-${SimulationProfile}`;
/** level = nivel más alto que desbloquea (1 Básico, 2 Intermedio, 3 Avanzado, 4 Experto). */
export type Product = { id: ProductId; title: string; description: string; profiles: SimulationProfile[]; priceCOP: number | null; level: number; requires?: ProductId };

export const PROFILES: SimulationProfile[] = ["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador"];
export const PROFILE_LABEL: Record<SimulationProfile, string> = { "ingreso-docente": "Ingreso docente", "ascenso-reubicacion": "Ascenso y reubicación", rector: "Rector", coordinador: "Coordinador" };

/**
 * Precios de lanzamiento en pesos colombianos (decisión de Enadis, 19 nov 2026).
 * Aplican a las primeras 100 compras; después se actualizan aquí y en Planes y Términos.
 * El nivel Básico es gratis. Cada plan incluye los niveles anteriores.
 */
export const PRICES = { intermedio: 29900, completo: 49900, directivo: 79900 } as const;
export const UPGRADE_PRICE = PRICES.completo - PRICES.intermedio;
export const LAUNCH_BUYERS = 100;

export const products: Product[] = [
  ...PROFILES.flatMap(p => [
    { id: `intermedio-${p}` as ProductId, title: `Plan Intermedio · ${PROFILE_LABEL[p]}`, description: `Nivel Intermedio del perfil ${PROFILE_LABEL[p]} y del núcleo común (el Básico es gratis).`, profiles: [p], priceCOP: PRICES.intermedio, level: 2 },
    { id: `completo-${p}` as ProductId, title: `Plan Completo · ${PROFILE_LABEL[p]}`, description: `Niveles Intermedio, Avanzado y Experto del perfil ${PROFILE_LABEL[p]} y del núcleo común.`, profiles: [p], priceCOP: PRICES.completo, level: 4 },
    { id: `mejora-${p}` as ProductId, title: `Pasar a Completo · ${PROFILE_LABEL[p]}`, description: `Si ya tienes el Plan Intermedio: suma los niveles Avanzado y Experto pagando solo la diferencia.`, profiles: [p], priceCOP: UPGRADE_PRICE, level: 4, requires: `intermedio-${p}` as ProductId },
  ]),
  { id: "directivo-completo", title: "Paquete directivo · Rector + Coordinador", description: "Plan Completo de los perfiles Rector y Coordinador y del núcleo común.", profiles: ["rector", "coordinador"], priceCOP: PRICES.directivo, level: 4 },
  // Productos anteriores: ya no se venden, pero conservan el acceso de quienes los compraron.
  { id: "premium-todos", title: "Acceso Premium completo (anterior)", description: "Todos los niveles de los cuatro perfiles.", profiles: PROFILES, priceCOP: null, level: 4 },
  ...PROFILES.map(p => ({ id: `premium-${p}` as ProductId, title: `Premium · ${PROFILE_LABEL[p]} (anterior)`, description: `Todos los niveles del perfil ${PROFILE_LABEL[p]}.`, profiles: [p], priceCOP: null, level: 4 })),
];

export const getProduct = (id: string) => products.find(p => p.id === id);
export const purchasable = (p: Product) => typeof p.priceCOP === "number" && p.priceCOP >= 1000;

/** Nivel más alto que la persona puede jugar en un perfil según sus compras (1 = solo el Básico gratis). */
export function unlockedLevel(owned: readonly string[], profile: SimulationProfile): number {
  return products.filter(p => p.profiles.includes(profile) && owned.includes(p.id)).reduce((max, p) => Math.max(max, p.level), 1);
}

/** Opciones de compra que tienen sentido para alguien con este nivel desbloqueado. */
export function offersFor(owned: readonly string[], profile: SimulationProfile): Product[] {
  const level = unlockedLevel(owned, profile);
  return products.filter(p => {
    if (!purchasable(p) || !p.profiles.includes(profile) || p.level <= level) return false;
    // Paquete de varios perfiles: solo si aún no tiene ningún plan en esos perfiles (si no, le sale más barato comprar por separado).
    if (p.profiles.length > 1) return p.profiles.every(q => unlockedLevel(owned, q) === 1);
    if (p.requires) return owned.includes(p.requires);
    return !(level >= 2 && p.id.startsWith("completo-"));
  });
}

/**
 * Compra más económica que desbloquea un nivel concreto de un perfil (para el botón de cada nivel).
 * Solo planes de un perfil; null si el nivel ya está desbloqueado o no hay plan a la venta.
 */
export function offerForLevel(owned: readonly string[], profile: SimulationProfile, level: number): Product | null {
  if (level <= unlockedLevel(owned, profile)) return null;
  const options = offersFor(owned, profile).filter(p => p.profiles.length === 1 && p.level >= level);
  return options.sort((a, b) => (a.priceCOP ?? 0) - (b.priceCOP ?? 0))[0] ?? null;
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
