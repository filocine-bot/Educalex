import { supabaseAdmin } from "@/integrations/supabase/client.server";

type Tx = { id: string; status: string; reference: string; amount_in_cents: number; currency: string };
const STATUSES = new Set(["APPROVED", "DECLINED", "VOIDED", "ERROR", "PENDING"]);

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
