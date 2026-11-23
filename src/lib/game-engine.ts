// Modo juego de los simulacros: niveles, puntos, rachas e insignias.
// Lógica pura (sin interfaz) para poder probarla.
import { simulationBank, type PracticeQuestion, type SimulationProfile } from "@/lib/simulation-bank";
import { nucleoComunV3 } from "@/lib/bank-v3/nucleo-comun";
import { ingresoDocenteAmpliacion } from "@/lib/bank-v3/ampliacion-ingreso-docente";

/** Banco del modo juego: el específico de cada perfil o el núcleo común (lectura, razonamiento, blandas, pedagógicas). */
export type GameBankKey = SimulationProfile | "nucleo-comun";
const byLevel = (qs: PracticeQuestion[]) => [...qs].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
const NUCLEO = byLevel(nucleoComunV3);
/**
 * Preguntas adicionales del modo juego por perfil (niveles de 10 · 20 · 30 · 40).
 * No entran al simulacro completo con tiempo, que conserva sus 40 preguntas originales.
 */
const AMPLIACION: Partial<Record<SimulationProfile, PracticeQuestion[]>> = { "ingreso-docente": ingresoDocenteAmpliacion };
const GAME_BANK = new Map<GameBankKey, PracticeQuestion[]>();

export function questionsFor(bank: GameBankKey): PracticeQuestion[] {
  if (bank === "nucleo-comun") return NUCLEO;
  let qs = GAME_BANK.get(bank);
  if (!qs) { qs = byLevel([...simulationBank[bank].questions, ...(AMPLIACION[bank] ?? [])]); GAME_BANK.set(bank, qs); }
  return qs;
}

export const QUESTIONS_PER_LEVEL = 10;
export const PASS_RATIO = 0.7;
export const BASE_POINTS = 10;

/**
 * Niveles premium. Mientras la pasarela de pagos no esté aprobada, PREMIUM_LOCKED es false
 * y todos los niveles se pueden jugar ("gratis durante el lanzamiento").
 * Para cobrar: cambiar a true cuando exista la compra de créditos.
 */
export const PREMIUM_FROM_LEVEL = 2;
export const PREMIUM_LOCKED = true;

export const LEVEL_NAMES = ["Básico", "Intermedio", "Avanzado", "Experto"] as const;

export type GameLevel = { number: number; name: string; questions: PracticeQuestion[]; premium: boolean };

export function levelsFor(profile: GameBankKey): GameLevel[] {
  const qs = questionsFor(profile);
  const levels: GameLevel[] = [];
  // Si el banco declara niveles de complejidad, cada nivel reúne sus propias preguntas; si no, se reparte en bloques.
  const leveled = qs.length > 0 && qs.every(q => q.level !== undefined);
  const count = leveled ? Math.max(...qs.map(q => q.level ?? 1)) : Math.ceil(qs.length / QUESTIONS_PER_LEVEL);
  for (let i = 0; i < count; i++) {
    levels.push({
      number: i + 1,
      name: LEVEL_NAMES[i] ?? `Nivel ${i + 1}`,
      questions: leveled ? qs.filter(q => q.level === i + 1) : qs.slice(i * QUESTIONS_PER_LEVEL, (i + 1) * QUESTIONS_PER_LEVEL),
      premium: i + 1 >= PREMIUM_FROM_LEVEL,
    });
  }
  return levels;
}

export type ProfileProgress = {
  /** Nivel más alto desbloqueado (1 = solo el básico). */
  unlocked: number;
  /** Mejor porcentaje (0–100) por número de nivel. */
  best: Record<number, number>;
  points: number;
  bestStreak: number;
  /** Preguntas acertadas al menos una vez. */
  correctIds: string[];
  badges: string[];
};

export type GameProgress = Partial<Record<GameBankKey, ProfileProgress>>;

export const emptyProfile = (): ProfileProgress => ({ unlocked: 1, best: {}, points: 0, bestStreak: 0, correctIds: [], badges: [] });

/** Puntos de una respuesta correcta: base + bono por racha (máximo +10). */
export function pointsFor(correct: boolean, streak: number): number {
  return correct ? BASE_POINTS + Math.min(10, Math.max(0, streak - 1) * 2) : 0;
}

export function passed(correct: number, total: number): boolean {
  return total > 0 && correct / total >= PASS_RATIO;
}

export function isLevelPlayable(level: GameLevel, progress: ProfileProgress, premiumLocked = PREMIUM_LOCKED): { playable: boolean; reason?: "progress" | "premium" } {
  if (level.number > progress.unlocked) return { playable: false, reason: "progress" };
  if (level.premium && premiumLocked) return { playable: false, reason: "premium" };
  return { playable: true };
}

export type Badge = { id: string; title: string; description: string };

export function competencyBadgeId(competency: string) {
  return `especialista:${competency}`;
}

/** Catálogo legible de una insignia a partir de su id. */
export function describeBadge(id: string): Badge {
  if (id.startsWith("nivel:")) { const n = Number(id.slice(6)); return { id, title: `Nivel ${LEVEL_NAMES[n - 1] ?? n} superado`, description: `Lograste al menos el ${PASS_RATIO * 100} % en el nivel ${n}.` }; }
  if (id.startsWith("perfecto:")) { const n = Number(id.slice(9)); return { id, title: `Perfecto en nivel ${LEVEL_NAMES[n - 1] ?? n}`, description: "Todas las respuestas correctas en el nivel." }; }
  if (id === "racha:5") return { id, title: "Racha de 5", description: "Cinco respuestas correctas seguidas." };
  if (id === "racha:10") return { id, title: "Racha de 10", description: "Diez respuestas correctas seguidas." };
  if (id === "perfil-completo") return { id, title: "Ruta completa", description: "Superaste todos los niveles del perfil." };
  if (id.startsWith("especialista:")) { const c = id.slice(13); return { id, title: `Especialista en ${c}`, description: `Acertaste todas las preguntas de ${c} del perfil.` }; }
  return { id, title: id, description: "" };
}

export type LevelOutcome = { level: number; answers: { id: string; correct: boolean }[]; pointsEarned: number; bestStreak: number };

/** Aplica el resultado de un nivel al progreso y devuelve el nuevo progreso y las insignias ganadas. */
export function applyOutcome(profile: GameBankKey, current: ProfileProgress, outcome: LevelOutcome): { progress: ProfileProgress; newBadges: string[] } {
  const levels = levelsFor(profile);
  const total = outcome.answers.length;
  const right = outcome.answers.filter(a => a.correct).length;
  const pct = total ? Math.round((right / total) * 100) : 0;
  const correctIds = Array.from(new Set([...current.correctIds, ...outcome.answers.filter(a => a.correct).map(a => a.id)]));
  const ok = passed(right, total);
  const next: ProfileProgress = {
    unlocked: ok ? Math.max(current.unlocked, Math.min(levels.length, outcome.level + 1)) : current.unlocked,
    best: { ...current.best, [outcome.level]: Math.max(current.best[outcome.level] ?? 0, pct) },
    points: current.points + outcome.pointsEarned,
    bestStreak: Math.max(current.bestStreak, outcome.bestStreak),
    correctIds,
    badges: [...current.badges],
  };
  const earned: string[] = [];
  const add = (id: string) => { if (!next.badges.includes(id)) { next.badges.push(id); earned.push(id); } };
  if (ok) add(`nivel:${outcome.level}`);
  if (total > 0 && right === total) add(`perfecto:${outcome.level}`);
  if (outcome.bestStreak >= 5) add("racha:5");
  if (outcome.bestStreak >= 10) add("racha:10");
  if (levels.every(l => next.badges.includes(`nivel:${l.number}`))) add("perfil-completo");
  const all = questionsFor(profile);
  for (const c of new Set(all.map(q => q.competency))) {
    const ids = all.filter(q => q.competency === c).map(q => q.id);
    if (ids.length >= 3 && ids.every(id => correctIds.includes(id))) add(competencyBadgeId(c));
  }
  return { progress: next, newBadges: earned };
}

/** Une dos progresos (por ejemplo, el del navegador y el de la cuenta) quedándose con lo mejor de cada uno. */
export function mergeProgress(a: GameProgress, b: GameProgress): GameProgress {
  const out: GameProgress = {};
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)]) as Set<GameBankKey>) {
    const x = a[key], y = b[key];
    if (!x || !y) { out[key] = (x ?? y)!; continue; }
    const best: Record<number, number> = { ...x.best };
    for (const [k, v] of Object.entries(y.best)) best[Number(k)] = Math.max(best[Number(k)] ?? 0, v);
    out[key] = {
      unlocked: Math.max(x.unlocked, y.unlocked),
      best,
      points: Math.max(x.points, y.points),
      bestStreak: Math.max(x.bestStreak, y.bestStreak),
      correctIds: Array.from(new Set([...x.correctIds, ...y.correctIds])),
      badges: Array.from(new Set([...x.badges, ...y.badges])),
    };
  }
  return out;
}

/** Errores agrupados por competencia, para el mapa de errores. */
export function errorMap(questions: PracticeQuestion[], wrongIds: string[]) {
  const map = new Map<string, PracticeQuestion[]>();
  for (const q of questions) if (wrongIds.includes(q.id)) map.set(q.competency, [...(map.get(q.competency) ?? []), q]);
  return Array.from(map, ([competency, items]) => ({ competency, items }));
}
