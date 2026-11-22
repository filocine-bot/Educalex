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

// Formato compacto para que el código QR sea legible al imprimirse pequeño.
const SHORT: Record<GameBankKey, string> = { "ingreso-docente": "i", "ascenso-reubicacion": "a", rector: "r", coordinador: "c", "nucleo-comun": "n" };
const LONG = Object.fromEntries(Object.entries(SHORT).map(([k, v]) => [v, k])) as Record<string, GameBankKey>;
const SIG_BYTES = 16; // HMAC-SHA256 truncado a 128 bits

function encode(p: CertPayload): string {
  return ["1", p.n.replace(/~/g, "-"), SHORT[p.p], p.l.map(l => `${l.n}:${l.b}`).join(","), p.d.replace(/-/g, "")].join("~");
}
function decode(text: string): CertPayload | null {
  const [v, n, p, l, d] = text.split("~");
  if (v !== "1" || !n || !p || !LONG[p] || !l || !d || !/^\d{8}$/.test(d)) return null;
  const levels = l.split(",").map(x => x.split(":").map(Number)).map(([a, b]) => ({ n: a!, b: b! }));
  if (levels.some(x => !Number.isInteger(x.n) || !Number.isFinite(x.b))) return null;
  return { v: 1, n, p: LONG[p], l: levels, d: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6)}` };
}
const mac = (k: Buffer, body: string) => createHmac("sha256", k).update(body).digest().subarray(0, SIG_BYTES);

export function signCertificate(payload: CertPayload, k: Buffer = key()): string {
  const body = b64url(Buffer.from(encode(payload), "utf8"));
  return `${body}.${b64url(mac(k, body))}`;
}

export function verifyCertificate(token: string, k: Buffer = key()): CertPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig || token.length > 2000) return null;
  const expected = mac(k, body);
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  return decode(Buffer.from(body, "base64url").toString("utf8"));
}

/** Código visible en la constancia: derivado de la firma, por eso cambia si se altera cualquier dato. */
export function codeFromToken(token: string): string {
  const sig = token.split(".")[1] ?? "";
  return "EDX-" + Buffer.from(sig, "base64url").toString("hex").slice(0, 10).toUpperCase();
}
