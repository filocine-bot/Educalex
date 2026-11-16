import { describe, expect, it } from 'vitest';
import { getPage, pages } from '@/lib/educalex-sitemap';

describe('Ingreso docente academic resources', () => {
  it('resolves every module and related destination to an existing page', () => {
    const page = pages['/concursos/ingreso-docente'];
    for (const link of page.academicModules.flatMap(module => module.links)) expect(getPage(link.to)).toBeDefined();
    for (const path of page.related) expect(getPage(path)).toBeDefined();
  });
  it('does not remove the existing outlines of other concurso routes', () => {
    expect(pages['/concursos/rector'].items).toContain('Guía 34');
    expect(pages['/concursos/coordinador'].items).toContain('Mediación de conflictos');
    expect(pages['/concursos/ascenso-reubicacion'].items).toContain('Escalafón docente');
  });
});