import { describe, it, expect } from 'vitest';
import { libraryDocs } from '@/lib/educalex-sitemap';
import { filterLibrary, librarySource, LIBRARY_PAGE_SIZE } from '@/lib/library-view';

describe('Biblioteca compacta', () => {
  it('conserva las 38 fichas y las alcanza sin duplicar entre páginas', () => {
    expect(libraryDocs).toHaveLength(38);
    const ids = Array.from({ length: Math.ceil(libraryDocs.length / LIBRARY_PAGE_SIZE) }, (_, page) => libraryDocs.slice(page * LIBRARY_PAGE_SIZE, (page + 1) * LIBRARY_PAGE_SIZE).map(d => d.id)).flat();
    expect(new Set(ids).size).toBe(38);
  });
  it('busca por año y entidad y combina categoría y estado', () => {
    expect(filterLibrary(libraryDocs, '1994', '', '').map(d => d.id)).toEqual(expect.arrayContaining(['ley-115-1994', 'decreto-1860-1994']));
    expect(filterLibrary(libraryDocs, 'ministerio', 'Inclusión', 'consultada').map(d => d.id)).toEqual(['decreto-1421-2017', 'dua', 'piar', 'orientaciones-inclusion']);
    expect(filterLibrary(libraryDocs, '', '', 'pendiente').map(d => d.id)).toEqual(['normativa-ingreso-ascenso', 'reglamentacion-complementaria']);
  });
  it('no habilita fuente pendiente aunque tenga una dirección', () => {
    const doc = libraryDocs[0]; if (!doc) throw new Error('Missing catalog');
    expect(librarySource({ ...doc, fuenteConsultada: false })).toBeNull();
  });
  it('distingue PDF oficiales de páginas HTML sin convertir unas en otras', () => {
    const sources = libraryDocs.map(librarySource).filter(Boolean);
    expect(sources.length).toBe(36);
    for (const source of sources) {
      const isPdf = /\.pdf($|[?#])|norma_pdf\.php/i.test(source!.url);
      expect(source!.kind).toBe(isPdf ? 'pdf' : 'html');
    }
    expect(sources.filter(s => s!.kind === 'pdf').length).toBeGreaterThan(0);
  });
});
describe('Biblioteca: dominios oficiales', () => {
  it('solo enlaza dominios gubernamentales verificados', () => {
    const allowed = /^https:\/\/(www1?\.)?(funcionpublica\.gov\.co|mineducacion\.gov\.co|contenidos\.mineducacion\.gov\.co|cnsc\.gov\.co|normograma\.icfes\.gov\.co)\//;
    for (const doc of libraryDocs.filter(d => d.fuenteUrl)) expect(doc.fuenteUrl, doc.id).toMatch(allowed);
  });
});
