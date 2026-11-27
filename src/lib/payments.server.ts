import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getProduct, parseGuestReference, purchasable } from "@/lib/payments";

type Tx = { id: string; status: string; reference: string; amount_in_cents: number; currency: string; customer_email?: string | null };
const STATUSES = new Set(["APPROVED", "DECLINED", "VOIDED", "ERROR", "PENDING"]);
const SITE = "https://www.educalex.co";

/** Registro permanente de cada aviso de Wompi (tabla wompi_event_log). Nunca interrumpe el pago si falla. */
export async function logWompiEvent(row: { event?: string; reference?: string; transaction_id?: string; wompi_status?: string; http_status: number; outcome: string; detail?: string }) {
  try { await supabaseAdmin.from("wompi_event_log" as never).insert(row as never); } catch (e) { console.error("wompi log", (e as Error).message); }
}

/** Envía (o reenvía) el enlace de acceso al correo del pago, directo al simulacro comprado. */
export async function sendAccessEmail(email: string, profile: string): Promise<string> {
  const { error } = await supabaseAdmin.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: `${SITE}/simulacros/${profile}` } });
  if (error) { console.error("correo de acceso no enviado", error.message); return `correo no enviado: ${error.message}`; }
  return "correo enviado";
}

/** Actualiza la orden con el estado real de Wompi y otorga el acceso si el pago fue aprobado y el monto coincide. */
export async function grantIfApproved(tx: Tx): Promise<{ status: string; product?: string }> {
  const { data: order, error } = await supabaseAdmin.from("payment_orders").select("reference,user_id,product,amount_in_cents,currency,status").eq("reference", tx.reference).maybeSingle();
  if (error || !order) return { status: "UNKNOWN" };
  if (tx.amount_in_cents !== order.amount_in_cents || tx.currency !== order.currency) {
    console.error("wompi: monto o moneda no coinciden", tx.reference);
    await supabaseAdmin.from("payment_orders").update({ status: "ERROR", transaction_id: tx.id, updated_at: new Date().toISOString() }).eq("reference", tx.reference);
    return { status: "ERROR" };
  }
  const status = STATUSES.has(tx.status) ? tx.status : "ERROR";
  if (order.status !== "APPROVED") await supabaseAdmin.from("payment_orders").update({ status, transaction_id: tx.id, updated_at: new Date().toISOString() }).eq("reference", tx.reference);
  if (status === "APPROVED") {
    await supabaseAdmin.from("premium_access").upsert({ user_id: order.user_id, product: order.product, reference: order.reference }, { onConflict: "user_id,product", ignoreDuplicates: true });
  }
  return { status: order.status === "APPROVED" ? "APPROVED" : status, product: order.product };
}

/**
 * Pago hecho sin sesión: la persona escribió su correo en Wompi. Cuando el pago se aprueba,
 * se crea (o se reutiliza) la cuenta con ese correo, se registra la orden y se otorga el acceso.
 * A una cuenta nueva se le envía un enlace para entrar (requiere el correo SMTP configurado en Supabase).
 */
export async function settlePayment(tx: Tx): Promise<{ status: string; product?: string; mail?: string; detail?: string }> {
  const { data: existing } = await supabaseAdmin.from("payment_orders").select("reference").eq("reference", tx.reference).maybeSingle();
  if (existing) return grantIfApproved(tx);
  const productId = parseGuestReference(tx.reference);
  if (!productId) return { status: "UNKNOWN", detail: "referencia sin producto" };
  if (tx.status !== "APPROVED") return { status: STATUSES.has(tx.status) ? tx.status : "ERROR", detail: "pago no aprobado aún" };
  const product = getProduct(productId);
  const email = tx.customer_email?.trim().toLowerCase();
  if (!product || !purchasable(product) || tx.currency !== "COP" || tx.amount_in_cents !== Math.round(product.priceCOP! * 100) || !email) {
    console.error("wompi: pago sin sesión no válido", tx.reference, { status: tx.status, amount: tx.amount_in_cents, hasEmail: Boolean(email), product: productId });
    return { status: "ERROR", detail: `pago no válido (producto ${productId}, monto ${tx.amount_in_cents}, correo ${email ? "sí" : "no"})` };
  }
  const { LEGAL_VERSION } = await import("@/lib/legal-content");
  const created = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    app_metadata: { guest_checkout: true },
    user_metadata: { preparation_path: product.profiles.length === 1 ? product.profiles[0] : "", privacy_policy_version: LEGAL_VERSION, privacy_accepted_at: new Date().toISOString(), privacy_accepted_via: "pago" },
  });
  let userId = created.data.user?.id;
  if (!userId) {
    const link = await supabaseAdmin.auth.admin.generateLink({ type: "magiclink", email });
    userId = link.data.user?.id;
  }
  if (!userId) { console.error("wompi: no se pudo preparar la cuenta", tx.reference, created.error?.message); throw new Error("no se pudo preparar la cuenta"); }
  const { error } = await supabaseAdmin.from("payment_orders").insert({ reference: tx.reference, user_id: userId, product: product.id, amount_in_cents: tx.amount_in_cents });
  if (error && error.code !== "23505") { console.error("wompi: orden no registrada", tx.reference, error.message); throw new Error("no se pudo registrar la orden"); }
  const result = await grantIfApproved(tx);
  // Enlace de acceso al correo del pago (cuenta nueva o existente). Si falla, no afecta el acceso ya otorgado.
  const mail = await sendAccessEmail(email, product.profiles[0] ?? "");
  return { ...result, mail, detail: created.data.user ? "cuenta nueva" : "cuenta existente" };
}
