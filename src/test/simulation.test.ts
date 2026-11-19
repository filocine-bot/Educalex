import { describe, expect, it } from "vitest";
import { simulationBank } from "@/lib/simulation-bank";
import { getLibraryDoc, getPage } from "@/lib/educalex-sitemap";
import { remainingSeconds, scorePractice } from "@/lib/simulation-scoring";

describe("Banco original de práctica", () => {
  it("contiene cuatro perfiles y exactamente 160 preguntas", () => {
    expect(Object.keys(simulationBank)).toHaveLength(4);
    expect(Object.values(simulationBank).flatMap(bank => bank.questions)).toHaveLength(160);
  });
  it.each(Object.entries(simulationBank))("%s contiene cuarenta preguntas A–D con una única clave válida", (_, bank) => {
    expect(bank.questions).toHaveLength(40);
    for (const question of bank.questions) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options).size).toBe(4);
      expect(Number.isInteger(question.correct)).toBe(true);
      expect(question.correct).toBeGreaterThanOrEqual(0);
      expect(question.correct).toBeLessThan(4);
      expect(getPage(question.course)).toBeDefined();
      expect(getLibraryDoc(question.documentId)?.fuenteConsultada).toBe(true);
    }
  });
  it("no reutiliza situaciones entre perfiles", () => {
    const questions = Object.values(simulationBank).flatMap(bank => bank.questions);
    expect(new Set(questions.map(q => q.id)).size).toBe(160);
    expect(new Set(questions.map(q => q.prompt)).size).toBe(160);
  });
  it.each([
    // Bancos v3: reordenados por nivel de complejidad y con opciones reequilibradas (tipo ICFES).
    ["ingreso-docente", [3, 2, 0, 2, 1, 1, 0, 3, 1, 1, 1, 2, 3, 2, 0, 3, 0, 3, 3, 0, 0, 1, 0, 3, 2, 0, 1, 0, 3, 2, 2, 1, 3, 3, 1, 0, 1, 1, 2, 2]],
    ["ascenso-reubicacion", [1, 0, 3, 3, 0, 1, 2, 1, 1, 3, 2, 0, 1, 2, 0, 3, 2, 3, 0, 1, 2, 0, 2, 1, 3, 2, 3, 0, 1, 0, 2, 0, 2, 1, 3, 0, 3, 1, 2, 3]],
    ["rector", [0, 2, 1, 3, 0, 2, 2, 2, 1, 3, 2, 1, 0, 2, 3, 3, 1, 3, 0, 1, 0, 1, 0, 2, 1, 0, 3, 3, 0, 1, 3, 2, 3, 1, 0, 0, 2, 2, 1, 3]],
    ["coordinador", [3, 2, 3, 3, 0, 2, 0, 1, 3, 3, 1, 0, 2, 0, 0, 1, 2, 0, 3, 2, 1, 2, 1, 3, 1, 2, 0, 3, 2, 3, 0, 1, 1, 1, 0, 2, 3, 0, 2, 1]],
  ] as const)("%s conserva las claves revisadas de las cuarenta situaciones", (profile, keys) => {
    expect(simulationBank[profile].questions.map(q => q.correct)).toEqual(keys);
  });
});

describe("Calificación de una entrega", () => {
  const questions = simulationBank["ingreso-docente"].questions;
  it("cuarenta aciertos valen cuarenta puntos y 100 %", () => {
    expect(scorePractice(questions, simulationBank["ingreso-docente"].questions.map(q => q.correct))).toMatchObject({ correct: 40, total: 40, percentage: 100, incorrect: 0, unanswered: 0 });
  });
  it("errores y omisiones valen cero, sin penalización adicional", () => {
    const wrong = (i: number) => (questions[i]!.correct + 1) % 4;
    expect(scorePractice(questions, [questions[0]!.correct, wrong(1), null, questions[3]!.correct, ...Array(36).fill(null)])).toMatchObject({ correct: 2, incorrect: 1, unanswered: 37, percentage: 5 });
  });
  it("desglosa aciertos y total por competencia", () => {
    const answers = questions.map((q, i) => (i % 3 === 0 ? q.correct : null));
    const expected: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => { const e = (expected[q.competency] ??= { correct: 0, total: 0 }); e.total++; if (i % 3 === 0) e.correct++; });
    expect(scorePractice(questions, answers).competencies).toEqual(expected);
  });
  it("las respuestas fuera de A–D no se cuentan como respondidas", () => {
    expect(scorePractice(questions, [-1, 4, 0.5, ...Array(37).fill(null)])).toMatchObject({ correct: 0, answered: 0, unanswered: 40 });
  });
});

describe("Cronómetro por plazo real", () => {
  it("sin límite no tiene vencimiento", () => expect(remainingSeconds(null, 999999)).toBeNull());
  it("15 minutos son 900 segundos y el tiempo no depende de contar intervalos", () => {
    expect(remainingSeconds(900000, 0)).toBe(900);
    expect(remainingSeconds(900000, 120000)).toBe(780);
  });
  it("al alcanzar o superar el plazo devuelve cero", () => {
    expect(remainingSeconds(900000, 900000)).toBe(0);
    expect(remainingSeconds(900000, 950000)).toBe(0);
  });
});