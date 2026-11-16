import { describe, expect, it } from 'vitest';
import { competitionReferences, referencesFor, historicalInterviewCompetencies } from '@/lib/competition-references';
import { simulationBank } from '@/lib/simulation-bank';

describe('Verified competition provenance', () => {
  it('separates MEN advancement from historical CNSC selection', () => {
    expect(referencesFor('ascenso-reubicacion').map(r => r.entity)).toEqual(['MEN', 'MEN']);
    for (const profile of ['ingreso-docente', 'rector', 'coordinador'] as const) {
      const refs = referencesFor(profile);
      expect(refs.length).toBe(7);
      expect(refs.filter(r => !r.historical).map(r => r.id)).toEqual(['cnsc-2026', 'men-2026']);
      expect(refs.filter(r => r.historical).every(r => r.entity === 'CNSC')).toBe(true);
    }
  });
  it('does not treat unread written-test annexes as verified', () => {
    expect(competitionReferences.find(r => r.id === 'written')?.status).toBe('page-only');
    expect(competitionReferences.find(r => r.id === 'men-2025')?.status).toBe('read');
  });
  it('distinguishes the historical interview competencies by job', () => {
    expect(historicalInterviewCompetencies.rector).toEqual(['Liderazgo', 'Trabajo en equipo', 'Iniciativa']);
    expect(historicalInterviewCompetencies.coordinador).toEqual(['Liderazgo', 'Trabajo en equipo', 'Negociación y mediación']);
    expect(historicalInterviewCompetencies['ingreso-docente']).toEqual(['Trabajo en equipo', 'Comunicación y relaciones interpersonales', 'Compromiso social e institucional']);
  });
  it('preserves four banks of twenty original practice items', () => {
    expect(Object.values(simulationBank).map(bank => bank.questions.length)).toEqual([20, 20, 20, 20]);
  });
});