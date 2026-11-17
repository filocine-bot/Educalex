import { simulationBank, type PracticeQuestion, type SimulationProfile } from "@/lib/simulation-bank";

export const durationOptions = [0, 5, 10, 15, 20, 30, 45, 60, 90] as const;
export type PracticeResult = {
  profile: SimulationProfile;
  answers: (number | null)[];
  elapsedSeconds: number;
  timedOut: boolean;
};

export function scorePractice(questions: PracticeQuestion[], answers: (number | null)[]) {
  const competencies: Record<string, { correct: number; total: number }> = {};
  let correct = 0;
  let answered = 0;
  questions.forEach((question, i) => {
    const answer = answers[i];
    const valid = typeof answer === "number" && Number.isInteger(answer) && answer >= 0 && answer < 4;
    if (valid) answered++;
    const hit = valid && answer === question.correct;
    if (hit) correct++;
    const group = competencies[question.competency] ?? { correct: 0, total: 0 };
    group.total++;
    if (hit) group.correct++;
    competencies[question.competency] = group;
  });
  return { correct, answered, unanswered: questions.length - answered, incorrect: answered - correct, total: questions.length, percentage: questions.length ? Math.round(correct / questions.length * 100) : 0, competencies };
}

export function remainingSeconds(deadline: number | null, now: number) {
  return deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function resultScore(result: PracticeResult) {
  return scorePractice(simulationBank[result.profile].questions, result.answers);
}