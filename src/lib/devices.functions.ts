import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const MAX_DEVICES = 3;
type Device = { id: string; label: string; first: string; last: string };

/**
 * Registra el dispositivo con el que se abre la cuenta. Máximo tres por cuenta (las administradoras no tienen límite).
 * La lista se guarda en app_metadata: solo el servidor puede cambiarla.
 */
export const registerDevice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ id: z.string().regex(/^[a-f0-9-]{36}$/), label: z.string().max(60) }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    const meta = (u.user?.app_metadata ?? {}) as Record<string, unknown>;
    const devices = Array.isArray(meta["devices"]) ? (meta["devices"] as Device[]) : [];
    const now = new Date().toISOString();
    const known = devices.find(d => d.id === data.id);
    if (!known) {
      const { data: admin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
      if (admin !== true && devices.length >= MAX_DEVICES) return { ok: false as const, count: devices.length };
    }
    // Se actualiza la fecha de último uso como máximo una vez al día para no escribir en cada visita.
    if (known && now.slice(0, 10) === known.last.slice(0, 10)) return { ok: true as const, count: devices.length };
    const next = known ? devices.map(d => (d.id === data.id ? { ...d, last: now } : d)) : [...devices, { id: data.id, label: data.label, first: now, last: now }];
    await supabaseAdmin.auth.admin.updateUserById(context.userId, { app_metadata: { ...meta, devices: next } });
    return { ok: true as const, count: next.length };
  });

async function requireAdmin(context: { supabase: { rpc: (fn: string, args: Record<string, unknown>) => PromiseLike<{ data: unknown }> }; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (data !== true) throw new Error("Solo administradoras.");
}

async function findUserByEmail(email: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // Se recorre la lista de cuentas (no se crean cuentas ni se envían correos).
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error("No se pudo consultar las cuentas.");
    const user = data.users.find(u => u.email?.toLowerCase() === email);
    if (user) return { supabaseAdmin, user };
    if (data.users.length < 1000) break;
  }
  throw new Error("No existe una cuenta con ese correo.");
}

/** Administración: consultar dispositivos e intentos de una cuenta. */
export const adminLookupAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ email: z.string().trim().toLowerCase().email() }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { user } = await findUserByEmail(data.email);
    const meta = (user.app_metadata ?? {}) as Record<string, unknown>;
    return { email: user.email ?? data.email, devices: (Array.isArray(meta["devices"]) ? meta["devices"] : []) as Device[], attempts: (meta["paid_attempts"] ?? {}) as Record<string, number> };
  });

/** Administración: liberar dispositivos o reiniciar intentos de una cuenta. */
export const adminResetAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ email: z.string().trim().toLowerCase().email(), what: z.enum(["devices", "attempts"]) }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context as never);
    const { supabaseAdmin, user } = await findUserByEmail(data.email);
    const meta = { ...((user.app_metadata ?? {}) as Record<string, unknown>) };
    if (data.what === "devices") meta["devices"] = []; else meta["paid_attempts"] = {};
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, { app_metadata: meta });
    if (error) throw new Error("No se pudo guardar el cambio.");
    return { ok: true };
  });
