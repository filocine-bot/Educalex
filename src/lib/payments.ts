// Pagos con Wompi: catálogo y utilidades puras (sin acceso a red ni a base de datos).
import type { SimulationProfile } from "@/lib/simulation-bank";

export const WOMPI_PUBLIC_KEY = "pub_prod_4A8Op11I2dUFiwGesOZ8Mdx4HtDrLjFI";

export type PlanTier = "intermedio" | "completo" | "mejora";
export type ProductId = "premium-todos" | "directivo-completo" | `premium-${SimulationProfile}` | `${PlanTier}-${SimulationProfile}`;
/** level = nivel más alto que desbloquea (1 Básico, 2 Intermedio, 3 Avanzado). Los productos «completo-*» son el Plan Avanzado. */
export type Product = { id: ProductId; title: string; description: string; profiles: SimulationProfile[]; priceCOP: number | null; level: number; requires?: ProductId };

export const PROFILES: SimulationProfile[] = ["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador"];
export const PROFILE_LABEL: Record<SimulationProfile, string> = { "ingreso-docente": "Ingreso docente", "ascenso-reubicacion": "Ascenso y reubicación", rector: "Rector", coordinador: "Coordinador" };

/**
 * Precio único por perfil (decisión de Enadis, 24 nov 2026): el nivel Básico es gratis y un solo pago
 * abre todos los niveles del perfil. Docentes (Ingreso o Ascenso): $59.900. Directivos (Rector o Coordinador): $79.900.
 * Aplican a las primeras 100 compras; después se actualizan aquí y en Planes y Términos.
 */
export const PRICES = { docente: 59900, directivo: 79900 } as const;
export const DIRECTIVE_PROFILES: SimulationProfile[] = ["rector", "coordinador"];
export const TEACHER_PROFILES: SimulationProfile[] = ["ingreso-docente", "ascenso-reubicacion"];
export const priceFor = (p: SimulationProfile) => (DIRECTIVE_PROFILES.includes(p) ? PRICES.directivo : PRICES.docente);
/** Nivel más alto del modo juego (Básico, Intermedio, Avanzado). */
export const MAX_LEVEL = 3;
export const LAUNCH_BUYERS = 100;

export const products: Product[] = [
  // A la venta: acceso completo de un perfil (todos los niveles). Se conserva el identificador «completo-*».
  ...PROFILES.map(p => ({ id: `completo-${p}` as ProductId, title: `Acceso completo · ${PROFILE_LABEL[p]}`, description: `Simulacro completo del perfil ${PROFILE_LABEL[p]}: las 100 preguntas por niveles (10 gratis + 90 con el pago) y el núcleo común completo.`, profiles: [p], priceCOP: priceFor(p), level: MAX_LEVEL })),
  // Productos anteriores: ya no se venden, pero conservan el acceso de quienes los compraron.
  ...PROFILES.flatMap(p => [
    { id: `intermedio-${p}` as ProductId, title: `Plan Intermedio · ${PROFILE_LABEL[p]} (anterior)`, description: `Nivel Intermedio del perfil ${PROFILE_LABEL[p]}.`, profiles: [p], priceCOP: null, level: 2 },
    { id: `mejora-${p}` as ProductId, title: `Mejora · ${PROFILE_LABEL[p]} (anterior)`, description: `Todos los niveles del perfil ${PROFILE_LABEL[p]}.`, profiles: [p], priceCOP: null, level: MAX_LEVEL },
  ]),
  { id: "directivo-completo", title: "Paquete directivo (anterior)", description: "Todos los niveles de Rector y Coordinador.", profiles: ["rector", "coordinador"], priceCOP: null, level: MAX_LEVEL },
  { id: "premium-todos", title: "Acceso Premium completo (anterior)", description: "Todos los niveles de los cuatro perfiles.", profiles: PROFILES, priceCOP: null, level: MAX_LEVEL },
  ...PROFILES.map(p => ({ id: `premium-${p}` as ProductId, title: `Premium · ${PROFILE_LABEL[p]} (anterior)`, description: `Todos los niveles del perfil ${PROFILE_LABEL[p]}.`, profiles: [p], priceCOP: null, level: MAX_LEVEL })),
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
  return products.filter(p => purchasable(p) && p.profiles.includes(profile) && p.level > level);
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
