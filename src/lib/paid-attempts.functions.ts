import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { attemptKey, MAX_PAID_ATTEMPTS, type PaidAttempts } from "@/lib/paid-attempts";

const BANKS = ["ingreso-docente", "ascenso-reubicacion", "rector", "coordinador", "nucleo-comun"] as const;

// Los intentos se guardan en app_metadata: solo el servidor puede cambiarlos (la persona no puede reiniciarlos).
async function readAttempts(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.auth.admin.getUserById(userId);
  const meta = (data.user?.app_metadata ?? {}) as Record<string, unknown>;
  return { supabaseAdmin, meta, used: ((meta["paid_attempts"] as PaidAttempts | undefined) ?? {}) };
}

export const getPaidAttempts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    const { used } = await readAttempts(context.userId);
    return { used, unlimited: admin === true };
  });

/** Registra el inicio de un intento en un nivel pagado. Falla si ya se usaron los tres. */
export const startPaidAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ bank: z.enum(BANKS), level: z.number().int().min(2).max(3) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    const { supabaseAdmin, meta, used } = await readAttempts(context.userId);
    if (admin === true) return { used, unlimited: true };
    const key = attemptKey(data.bank, data.level);
    const count = used[key] ?? 0;
    if (count >= MAX_PAID_ATTEMPTS) throw new Error("Ya usaste tus 3 intentos de este nivel.");
    const next = { ...used, [key]: count + 1 };
    const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, { app_metadata: { ...meta, paid_attempts: next } });
    if (error) throw new Error("No se pudo registrar el intento. Intenta de nuevo.");
    return { used: next, unlimited: false };
  });
