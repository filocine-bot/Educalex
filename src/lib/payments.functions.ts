import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { checkoutUrl, getProduct, integritySignature, newReference, purchasable, WOMPI_PUBLIC_KEY, wompiApiBase } from "@/lib/payments";

const SITE = "https://www.educalex.co";

/** Crea una orden y devuelve la URL del checkout de Wompi. */
export const startCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ product: z.string().max(60), returnPath: z.string().regex(/^\/[a-z0-9/-]{0,80}$/).default("/simulacros") }).parse(input))
  .handler(async ({ data, context }) => {
    const product = getProduct(data.product);
    if (!product || !purchasable(product)) throw new Error("Este producto todavía no está a la venta.");
    if (product.requires) {
      const { data: own } = await context.supabase.from("premium_access").select("product").eq("user_id", context.userId).eq("product", product.requires).maybeSingle();
      if (!own) throw new Error("Este producto ya no está a la venta.");
    }
    const secret = process.env["WOMPI_INTEGRITY_SECRET"]?.trim();
    if (!secret) throw new Error("Los pagos aún no están configurados.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const amountInCents = Math.round(product.priceCOP! * 100);
    const reference = newReference();
    const { error } = await supabaseAdmin.from("payment_orders").insert({ reference, user_id: context.userId, product: product.id, amount_in_cents: amountInCents });
    if (error) throw new Error("No se pudo crear la orden de pago.");
    const { data: u } = await context.supabase.auth.getUser();
    const signature = await integritySignature(reference, amountInCents, "COP", secret);
    return { url: checkoutUrl({ publicKey: WOMPI_PUBLIC_KEY, reference, amountInCents, signature, redirectUrl: `${SITE}/pago/resultado?volver=${encodeURIComponent(data.returnPath)}`, email: u.user?.email ?? undefined }) };
  });

/** Al volver de Wompi: consulta la transacción en Wompi y, si está aprobada, otorga el acceso. */
export const confirmTransaction = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ id: z.string().regex(/^[A-Za-z0-9_-]{5,80}$/) }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { grantIfApproved } = await import("@/lib/payments.server");
    const res = await fetch(`${wompiApiBase(WOMPI_PUBLIC_KEY)}/transactions/${data.id}`);
    if (!res.ok) throw new Error("No se pudo consultar el pago en Wompi.");
    const tx = ((await res.json()) as { data?: { id: string; status: string; reference: string; amount_in_cents: number; currency: string } }).data;
    if (!tx) throw new Error("Transacción no encontrada.");
    const { data: order } = await supabaseAdmin.from("payment_orders").select("user_id").eq("reference", tx.reference).maybeSingle();
    if (!order || order.user_id !== context.userId) throw new Error("Este pago no corresponde a tu cuenta.");
    return grantIfApproved(tx);
  });

/** Accesos premium y compras de la persona. */
export const getMyPurchases = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [access, orders] = await Promise.all([
      context.supabase.from("premium_access").select("product,granted_at").eq("user_id", context.userId),
      context.supabase.from("payment_orders").select("reference,product,amount_in_cents,status,created_at").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(20),
    ]);
    return { products: (access.data ?? []).map(a => a.product), orders: orders.data ?? [] };
  });

const RETURN_PATH = z.string().regex(/^\/[a-z0-9/-]{0,80}$/).default("/simulacros");

/** Pago sin cuenta previa: con solo el correo se crea (o reutiliza) la cuenta y se abre Wompi. */
export const startGuestCheckout = createServerFn({ method: "POST" })
  .inputValidator(input => z.object({
    email: z.string().trim().toLowerCase().email().max(120),
    product: z.string().max(60),
    returnPath: RETURN_PATH,
    consent: z.literal(true),
    adult: z.literal(true),
  }).parse(input))
  .handler(async ({ data }) => {
    const product = getProduct(data.product);
    if (!product || !purchasable(product) || product.requires) throw new Error("Este producto todavía no está a la venta.");
    const secret = process.env["WOMPI_INTEGRITY_SECRET"]?.trim();
    if (!secret) throw new Error("Los pagos aún no están configurados.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { LEGAL_VERSION } = await import("@/lib/legal-content");
    const preparation = product.profiles.length === 1 ? product.profiles[0] : "";
    const created = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      email_confirm: true,
      app_metadata: { guest_checkout: true },
      user_metadata: { preparation_path: preparation, privacy_policy_version: LEGAL_VERSION, privacy_accepted_at: new Date().toISOString(), declared_adult: true },
    });
    let userId = created.data.user?.id;
    if (!userId) {
      // El correo ya tiene cuenta: el acceso se suma a esa cuenta (sin iniciar sesión por la persona).
      const link = await supabaseAdmin.auth.admin.generateLink({ type: "magiclink", email: data.email });
      userId = link.data.user?.id;
    }
    if (!userId) throw new Error("No se pudo preparar tu acceso. Intenta de nuevo o escríbenos.");
    const amountInCents = Math.round(product.priceCOP! * 100);
    const reference = newReference();
    const { error } = await supabaseAdmin.from("payment_orders").insert({ reference, user_id: userId, product: product.id, amount_in_cents: amountInCents });
    if (error) throw new Error("No se pudo crear la orden de pago.");
    const signature = await integritySignature(reference, amountInCents, "COP", secret);
    return { url: checkoutUrl({ publicKey: WOMPI_PUBLIC_KEY, reference, amountInCents, signature, redirectUrl: `${SITE}/pago/resultado?volver=${encodeURIComponent(data.returnPath)}`, email: data.email }) };
  });

const GUEST_LOGIN_WINDOW_MS = 48 * 60 * 60 * 1000;

/**
 * Al volver de Wompi sin sesión: confirma el pago y, si la cuenta se creó con ese pago
 * y nunca se ha usado, entrega un acceso de un solo uso para entrar sin contraseña.
 */
export const confirmGuestTransaction = createServerFn({ method: "POST" })
  .inputValidator(input => z.object({ id: z.string().regex(/^[A-Za-z0-9_-]{5,80}$/) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { grantIfApproved } = await import("@/lib/payments.server");
    const res = await fetch(`${wompiApiBase(WOMPI_PUBLIC_KEY)}/transactions/${data.id}`);
    if (!res.ok) throw new Error("No se pudo consultar el pago en Wompi.");
    const tx = ((await res.json()) as { data?: { id: string; status: string; reference: string; amount_in_cents: number; currency: string } }).data;
    if (!tx) throw new Error("Transacción no encontrada.");
    const { data: order } = await supabaseAdmin.from("payment_orders").select("user_id,created_at").eq("reference", tx.reference).maybeSingle();
    if (!order) throw new Error("Este pago no corresponde a EDUCALEX.");
    const result = await grantIfApproved(tx);
    if (result.status !== "APPROVED") return { status: result.status };
    const { data: u } = await supabaseAdmin.auth.admin.getUserById(order.user_id);
    const user = u.user;
    const fresh = Date.now() - new Date(order.created_at).getTime() < GUEST_LOGIN_WINDOW_MS;
    if (!user?.email || user.app_metadata?.["guest_checkout"] !== true || user.last_sign_in_at || !fresh) {
      return { status: "APPROVED", needsLogin: true as const };
    }
    const link = await supabaseAdmin.auth.admin.generateLink({ type: "magiclink", email: user.email });
    const tokenHash = link.data.properties?.hashed_token;
    if (!tokenHash) return { status: "APPROVED", needsLogin: true as const };
    return { status: "APPROVED", tokenHash, email: user.email };
  });
