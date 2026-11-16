import { z } from 'zod';
import { freeCoursePaths, unitCount } from './learning-policy';

const rules = z.record(z.string(), z.union([z.string().max(500), z.number().finite(), z.boolean()]));
export const levelDraftSchema = z.object({
  code: z.enum(['explorador', 'avanza', 'experto', 'elite']),
  label: z.string().trim().min(1).max(80),
  content_rules: rules.default({}),
  simulation_rules: rules.default({}),
});
export const preparationLevels = [
  { code: 'explorador', label: 'Explorador', available: true, focus: 'Autoestudio y práctica con todos los materiales actuales.' },
  { code: 'avanza', label: 'Avanza', available: false, focus: 'Propuesta de profundización guiada; beneficios por definir.' },
  { code: 'experto', label: 'Experto', available: false, focus: 'Propuesta de preparación especializada; beneficios por definir.' },
  { code: 'elite', label: 'Élite', available: false, focus: 'Propuesta de preparación integral; beneficios por definir.' },
] as const;
// Future admin drafts never grant access or change the effective launch level.
export function currentPreparationLevel() {
  return { code: 'explorador', label: 'Explorador', paymentsEnabled: false, premiumEnabled: false, allExistingContentFree: true } as const;
}
export function learningSummary(progress: { course_path: string; unit_number: number }[], attempts: unknown[]) {
  const total = freeCoursePaths.reduce((sum, path) => sum + unitCount(path), 0);
  const completed = new Set(progress.filter(p => freeCoursePaths.some(path => path === p.course_path) && p.unit_number >= 1 && p.unit_number <= unitCount(p.course_path)).map(p => `${p.course_path}:${p.unit_number}`)).size;
  return { total, completed, percentage: Math.round(completed / total * 100), attempts: attempts.length };
}