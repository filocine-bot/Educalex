// Constancias verificables: los datos de la constancia van firmados con HMAC-SHA256 en el enlace del código QR.
// No se guarda nada en la base de datos: la firma prueba que EDUCALEX expidió esa constancia con esos datos.
import { createHmac, hkdfSync, timingSafeEqual } from "node:crypto";
import type { GameBankKey } from "@/lib/game-engine";

export type CertPayload = { v: 1; n: string; p: GameBankKey; l: { n: number; b: number }[]; d: string };

const b64url = (b: Buffer) => b.toString("base64url");

function key(): Buffer {
  const own = process.env["CERT_SIGNING_SECRET"]?.trim();
  if (own) return Buffer.from(own, "utf8");
  const base = process.env["SUPABASE_SERVICE_ROLE_KEY"]?.trim();
  if (!base) throw new Error("La verificación de constancias no está configurada.");
  // Clave derivada solo para este uso (no se usa la clave original para firmar).
  return Buffer.from(hkdfSync("sha256", base, "educalex", "educalex-constancias-v1", 32));
}

export function signCertificate(payload: CertPayload, k: Buffer = key()): string {
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64url(createHmac("sha256", k).update(body).digest());
  return `${body}.${sig}`;
}

export function verifyCertificate(token: string, k: Buffer = key()): CertPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig || token.length > 2000) return null;
  const expected = createHmac("sha256", k).update(body).digest();
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as CertPayload;
    return p && p.v === 1 && typeof p.n === "string" && Array.isArray(p.l) ? p : null;
  } catch { return null; }
}

/** Código visible en la constancia: derivado de la firma, por eso cambia si se altera cualquier dato. */
export function codeFromToken(token: string): string {
  const sig = token.split(".")[1] ?? "";
  return "EDX-" + Buffer.from(sig, "base64url").toString("hex").slice(0, 10).toUpperCase();
}
