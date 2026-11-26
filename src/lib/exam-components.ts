import { levelsFor } from "@/lib/game-engine";
import type { PracticeQuestion, SimulationProfile } from "@/lib/simulation-bank";
import { rectorPropias2026 } from "@/lib/bank-v3/rector-propias-2026";

export type ComponentId = string;
export type ExamComponent = { id: ComponentId; group: "comunes" | "pedagogicas"; title: string; what: string; questions: PracticeQuestion[] };
export type Block = { id: string; label: string; from: number; to: number; questions: PracticeQuestion[] };

const all = (bank: Parameters<typeof levelsFor>[0]) => levelsFor(bank).flatMap(l => l.questions);
const byLevel = (qs: PracticeQuestion[]) => [...qs].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));

export const GROUP_LABEL: Record<SimulationProfile, { comunes: string; propio: string; intro: string }> = {
  "ingreso-docente": { comunes: "Componentes comunes", propio: "Componente pedagógico del cargo", intro: "Prueba de aptitudes y competencias básicas (CNSC): componentes comunes y componente pedagógico del docente." },
  coordinador: { comunes: "Componentes comunes", propio: "Componente propio del cargo: coordinador", intro: "Prueba de aptitudes y competencias básicas (CNSC): componentes comunes y funciones del coordinador." },
  rector: { comunes: "Componentes comunes", propio: "Componente propio del cargo: rector", intro: "Prueba de aptitudes y competencias básicas (CNSC): componentes comunes y funciones del rector." },
  "ascenso-reubicacion": { comunes: "", propio: "Prueba pedagógica escrita", intro: "Evaluación para ascenso y reubicación (MEN, Decreto Ley 1278): prueba pedagógica escrita sobre tu práctica." },
};

/** Componentes de la prueba por cargo (Anexo Técnico 2026, numeral 2.1; ascenso: Resolución MEN 018987 de 2025). */
export function examComponents(profile: SimulationProfile): ExamComponent[] {
  // Rector suma sus preguntas propias de contexto directivo a los componentes comunes y a gestión académica.
  const extra = profile === "rector" ? rectorPropias2026 : [];
  const nucleo = [...extra.filter(q => /^(Lectura crítica|Razonamiento cuantitativo)$/.test(q.competency)), ...extra.filter(q => q.competency === "Competencias blandas").map(q => ({ ...q, competency: "Blandas · liderazgo directivo" })), ...all("nucleo-comun")];
  const own = [...all(profile), ...extra.filter(q => q.competency === "Gestión académica")];
  const pick = (qs: PracticeQuestion[], re: RegExp) => byLevel(qs.filter(q => re.test(q.competency)));
  const comunes: ExamComponent[] = [
    { id: "lectura", group: "comunes", title: "Lectura crítica", what: "Comprender, interpretar y evaluar textos.", questions: pick(nucleo, /^Lectura crítica$/) },
    { id: "cuantitativo", group: "comunes", title: "Razonamiento cuantitativo", what: "Datos, porcentajes y problemas escolares.", questions: pick(nucleo, /^Razonamiento cuantitativo$/) },
    { id: "blandas", group: "comunes", title: "Competencias blandas", what: "Liderazgo, ética, trabajo en equipo y ciudadanía.", questions: pick(nucleo, /^Blandas/) },
  ];
  const propio: Record<SimulationProfile, ExamComponent[]> = {
    "ingreso-docente": [
      { id: "ensenar", group: "pedagogicas", title: "Pedagógica: enseñar", what: "Planear, enseñar y orientar el aprendizaje.", questions: [...pick(nucleo, /enseñar/), ...pick(own, /^Didáctica$/)] },
      { id: "evaluar", group: "pedagogicas", title: "Pedagógica: evaluar", what: "Evaluación formativa, SIEE y retroalimentación.", questions: [...pick(nucleo, /evaluar/), ...pick(own, /^Evaluación$/)] },
      { id: "incluir", group: "pedagogicas", title: "Pedagógica: incluir", what: "Inclusión, DUA y PIAR.", questions: pick(own, /^Inclusión$/) },
      { id: "convivencia", group: "pedagogicas", title: "Convivencia y contexto escolar", what: "Convivencia, participación y marco de la carrera docente.", questions: pick(own, /^(Convivencia|Participación escolar|Fundamentos normativos|Carrera docente)$/) },
    ],
    coordinador: [
      { id: "academica", group: "pedagogicas", title: "Gestión académica", what: "Currículo, evaluación y SIEE, planeación y resultados.", questions: pick(own, /^Gestión académica$/) },
      { id: "acompanamiento", group: "pedagogicas", title: "Acompañamiento e inclusión", what: "Acompañamiento docente, inclusión y PIAR.", questions: pick(own, /^(Acompañamiento docente|Inclusión y PIAR)$/) },
      { id: "directiva", group: "pedagogicas", title: "Gestión directiva y administrativa", what: "Gobierno escolar, planeación y procesos administrativos.", questions: pick(own, /^Gestión directiva y administrativa$/) },
      { id: "convivencia", group: "pedagogicas", title: "Convivencia y mediación", what: "Ruta de Atención Integral, comité y mediación.", questions: pick(own, /^Convivencia y mediación$/) },
    ],
    rector: [
      { id: "directiva", group: "pedagogicas", title: "Gestión directiva", what: "PEI, gobierno escolar, liderazgo, Guía 34 y PMI.", questions: pick(own, /^(PEI y gobierno escolar|Liderazgo|Guía 34 y PMI)$/) },
      { id: "administrativa", group: "pedagogicas", title: "Gestión administrativa y financiera", what: "Fondo de Servicios Educativos, presupuesto y talento humano.", questions: pick(own, /^(Gestión financiera y talento humano|Gestión institucional)$/) },
      { id: "convivencia", group: "pedagogicas", title: "Gestión académica y convivencia", what: "Gestión académica, evaluación, convivencia escolar y acompañamiento institucional.", questions: pick(own, /^(Gestión académica|Convivencia escolar)$/) },
    ],
    "ascenso-reubicacion": [
      { id: "practica", group: "pedagogicas", title: "Práctica pedagógica", what: "Planeación, praxis y ambiente de aula.", questions: pick(own, /^Práctica pedagógica$/) },
      { id: "evaluar", group: "pedagogicas", title: "Evaluación formativa", what: "Evaluación de los aprendizajes y retroalimentación.", questions: pick(own, /^Evaluación formativa$/) },
      { id: "reflexion", group: "pedagogicas", title: "Reflexión docente", what: "Contexto de la práctica y reflexión sobre el desempeño.", questions: pick(own, /^Reflexión docente$/) },
      { id: "incluir", group: "pedagogicas", title: "Inclusión y diversidad", what: "Atención a la diversidad en el aula.", questions: pick(own, /^Inclusión y diversidad$/) },
      { id: "carrera", group: "pedagogicas", title: "Carrera y proceso", what: "Escalafón, requisitos e instrumentos del proceso.", questions: pick(own, /^Carrera y proceso$/) },
    ],
  };
  return [...(profile === "ascenso-reubicacion" ? [] : comunes), ...propio[profile]].filter(c => c.questions.length > 0);
}

/** Bloques de 10 preguntas, de menor a mayor dificultad; un resto menor de 5 se suma al último bloque. */
export function blocksOf(c: ExamComponent): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < c.questions.length; i += 10) out.push({ id: `${c.id}-${out.length + 1}`, label: `Bloque ${out.length + 1}`, from: i + 1, to: Math.min(i + 10, c.questions.length), questions: c.questions.slice(i, i + 10) });
  const last = out[out.length - 1], prev = out[out.length - 2];
  if (last && prev && last.questions.length < 5) { prev.questions.push(...last.questions); prev.to = last.to; out.pop(); }
  return out;
}
