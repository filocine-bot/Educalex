import type { GameBankKey, ProfileProgress } from "@/lib/game-engine";
import { LEVEL_NAMES } from "@/lib/game-engine";

export const CERT_BANK_NAMES: Record<GameBankKey, string> = {
  "ingreso-docente": "Ingreso a la carrera docente",
  "ascenso-reubicacion": "Ascenso y reubicación salarial",
  rector: "Concurso para rector",
  coordinador: "Concurso para coordinador",
  "nucleo-comun": "Núcleo común (lectura crítica, razonamiento cuantitativo, competencias blandas y pedagógicas)",
};

export function isGameBankKey(v: unknown): v is GameBankKey {
  return typeof v === "string" && v in CERT_BANK_NAMES;
}

/** Niveles superados (insignia nivel:N) con su mejor porcentaje. */
export function passedLevels(p: ProfileProgress | undefined): { number: number; name: string; best: number }[] {
  if (!p) return [];
  return [1, 2, 3, 4].filter(n => p.badges.includes(`nivel:${n}`)).map(n => ({ number: n, name: LEVEL_NAMES[n - 1] ?? `Nivel ${n}`, best: p.best[n] ?? 0 }));
}

/** Código de referencia corto y estable (no es una firma criptográfica ni un registro oficial). */
export function certificateCode(name: string, bank: string, levels: number[], date: string): string {
  const text = `${name.trim().toLowerCase()}|${bank}|${levels.join(",")}|${date}`;
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return `EDX-${(h >>> 0).toString(36).toUpperCase().padStart(7, "0")}`;
}
