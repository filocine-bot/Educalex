/** Cada nivel pagado (Intermedio y Avanzado) se puede presentar este número de veces por perfil. */
export const MAX_PAID_ATTEMPTS = 3;
export type PaidAttempts = Record<string, number>;
export const attemptKey = (bank: string, level: number) => `${bank}:${level}`;
export function remainingAttempts(used: PaidAttempts, bank: string, level: number) {
  return Math.max(0, MAX_PAID_ATTEMPTS - (used[attemptKey(bank, level)] ?? 0));
}
