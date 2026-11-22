import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { CERT_BANK_NAMES, isGameBankKey, passedLevels } from "@/lib/certificate";
import type { GameProgress } from "@/lib/game-engine";

/** Firma la constancia con el progreso guardado en la cuenta (no con lo que envía el navegador). */
export const issueCertificate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ perfil: z.string().refine(isGameBankKey), name: z.string().trim().min(5).max(90) }).parse(input))
  .handler(async ({ data, context }) => {
    const { signCertificate, codeFromToken } = await import("@/lib/certificate-token");
    const { data: u, error } = await context.supabase.auth.getUser();
    if (error || !u.user) throw new Error("Inicia sesión para generar la constancia verificable.");
    const progress = (u.user.user_metadata?.["game_progress"] ?? {}) as GameProgress;
    const perfil = data.perfil as keyof typeof CERT_BANK_NAMES;
    const levels = passedLevels(progress[perfil]);
    if (levels.length === 0) throw new Error("Aún no has superado el nivel Básico de este perfil.");
    const d = new Date().toISOString().slice(0, 10);
    const token = signCertificate({ v: 1, n: data.name, p: perfil, l: levels.map(l => ({ n: l.number, b: l.best })), d });
    return { token, code: codeFromToken(token) };
  });

/** Comprueba una constancia a partir del enlace del código QR. Es pública. */
export const checkCertificate = createServerFn({ method: "POST" })
  .inputValidator(input => z.object({ t: z.string().max(2000) }).parse(input))
  .handler(async ({ data }) => {
    const { verifyCertificate, codeFromToken } = await import("@/lib/certificate-token");
    const p = verifyCertificate(data.t);
    return p ? { valid: true as const, payload: p, code: codeFromToken(data.t) } : { valid: false as const };
  });
