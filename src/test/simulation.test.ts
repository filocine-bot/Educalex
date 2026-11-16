import { describe, expect, it } from "vitest";
import { simulationBank } from "@/lib/simulation-bank";
import { getLibraryDoc, getPage } from "@/lib/educalex-sitemap";
import { remainingSeconds, scorePractice } from "@/lib/simulation-scoring";

describe("Banco original de práctica", () => {
  it("contiene cuatro perfiles y exactamente 32 preguntas", () => {
    expect(Object.keys(simulationBank)).toHaveLength(4);
    expect(Object.values(simulationBank).flatMap(bank => bank.questions)).toHaveLength(32);
  });
  it.each(Object.entries(simulationBank))("%s contiene ocho preguntas A–D con una única clave válida", (_, bank) => {
    expect(bank.questions).toHaveLength(8);
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
    expect(new Set(questions.map(q => q.id)).size).toBe(32);
    expect(new Set(questions.map(q => q.prompt)).size).toBe(32);
  });
  it.each([
    ["ingreso-docente", [1, 3, 0, 2, 1, 3, 0, 2]],
    ["ascenso-reubicacion", [2, 0, 3, 1, 2, 0, 3, 1]],
    ["rector", [0, 3, 1, 2, 0, 3, 1, 2]],
    ["coordinador", [3, 1, 2, 0, 3, 1, 2, 0]],
  ] as const)("%s conserva las claves revisadas de las ocho situaciones", (profile, keys) => {
    expect(simulationBank[profile].questions.map(q => q.correct)).toEqual(keys);
  });
});

describe("Calificación de una entrega", () => {
  const questions = simulationBank["ingreso-docente"].questions;
  it("ocho aciertos valen ocho puntos y 100 %", () => {
    expect(scorePractice(questions, [1, 3, 0, 2, 1, 3, 0, 2])).toMatchObject({ correct: 8, total: 8, percentage: 100, incorrect: 0, unanswered: 0 });
  });
  it("errores y omisiones valen cero, sin penalización adicional", () => {
    expect(scorePractice(questions, [1, 0, null, 2, null, null, null, null])).toMatchObject({ correct: 2, incorrect: 1, unanswered: 5, percentage: 25 });
  });
  it("desglosa aciertos y total por competencia", () => {
    expect(scorePractice(questions, [1, null, 0, 2, null, null, null, 2]).competencies).toEqual({ Didáctica: { correct: 1, total: 2 }, Inclusión: { correct: 2, total: 2 }, Evaluación: { correct: 0, total: 2 }, Convivencia: { correct: 1, total: 2 } });
  });
  it("las respuestas fuera de A–D no se cuentan como respondidas", () => {
    expect(scorePractice(questions, [-1, 4, 0.5, null, null, null, null, null])).toMatchObject({ correct: 0, answered: 0, unanswered: 8 });
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