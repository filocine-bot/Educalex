import { levelsFor } from "@/lib/game-engine";
import type { PracticeQuestion, SimulationProfile } from "@/lib/simulation-bank";

export type ComponentId = "lectura" | "cuantitativo" | "blandas" | "ensenar" | "evaluar" | "incluir" | "convivencia";
export type ExamComponent = { id: ComponentId; group: "comunes" | "pedagogicas"; title: string; what: string; questions: PracticeQuestion[] };
export type Block = { id: string; label: string; from: number; to: number; questions: PracticeQuestion[] };

const all = (bank: Parameters<typeof levelsFor>[0]) => levelsFor(bank).flatMap(l => l.questions);
const byLevel = (qs: PracticeQuestion[]) => [...qs].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));

/** Componentes de la prueba de aptitudes y competencias básicas (Anexo Técnico 2026, numeral 2.1) para docentes. */
export function examComponents(profile: SimulationProfile): ExamComponent[] {
  const nucleo = all("nucleo-comun");
  const own = all(profile);
  const pick = (qs: PracticeQuestion[], re: RegExp) => byLevel(qs.filter(q => re.test(q.competency)));
  return [
    { id: "lectura", group: "comunes", title: "Lectura crítica", what: "Comprender, interpretar y evaluar textos.", questions: pick(nucleo, /^Lectura crítica$/) },
    { id: "cuantitativo", group: "comunes", title: "Razonamiento cuantitativo", what: "Datos, porcentajes y problemas escolares.", questions: pick(nucleo, /^Razonamiento cuantitativo$/) },
    { id: "blandas", group: "comunes", title: "Competencias blandas", what: "Liderazgo, ética, trabajo en equipo y ciudadanía.", questions: pick(nucleo, /^Blandas/) },
    { id: "ensenar", group: "pedagogicas", title: "Pedagógica: enseñar", what: "Planear, enseñar y orientar el aprendizaje.", questions: [...pick(nucleo, /enseñar/), ...pick(own, /^Didáctica$/)] },
    { id: "evaluar", group: "pedagogicas", title: "Pedagógica: evaluar", what: "Evaluación formativa, SIEE y retroalimentación.", questions: [...pick(nucleo, /evaluar/), ...pick(own, /^Evaluación$/)] },
    { id: "incluir", group: "pedagogicas", title: "Pedagógica: incluir", what: "Inclusión, DUA y PIAR.", questions: pick(own, /^Inclusión$/) },
    { id: "convivencia", group: "pedagogicas", title: "Convivencia y contexto escolar", what: "Convivencia, participación y marco de la carrera docente.", questions: pick(own, /^(Convivencia|Participación escolar|Fundamentos normativos|Carrera docente)$/) },
  ].filter(c => c.questions.length > 0) as ExamComponent[];
}

/** Bloques de 10 preguntas, de menor a mayor dificultad; un resto menor de 5 se suma al último bloque. */
export function blocksOf(c: ExamComponent): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < c.questions.length; i += 10) out.push({ id: `${c.id}-${out.length + 1}`, label: `Bloque ${out.length + 1}`, from: i + 1, to: Math.min(i + 10, c.questions.length), questions: c.questions.slice(i, i + 10) });
  const last = out[out.length - 1], prev = out[out.length - 2];
  if (last && prev && last.questions.length < 5) { prev.questions.push(...last.questions); prev.to = last.to; out.pop(); }
  return out;
}
