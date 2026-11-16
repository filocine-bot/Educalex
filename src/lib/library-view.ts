import type { LibraryDoc } from './educalex-sitemap';

export const LIBRARY_PAGE_SIZE = 8;
export const normalizeLibrarySearch = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function filterLibrary(docs: LibraryDoc[], search: string, category: string, verification: string) {
  const needle = normalizeLibrarySearch(search);
  return docs.filter(doc => (!category || doc.categoria === category)
    && (!verification || doc.fuenteConsultada === (verification === 'consultada'))
    && normalizeLibrarySearch(`${doc.title} ${doc.nombreOficial} ${doc.entidad} ${doc.categoria} ${doc.anio ?? ''}`).includes(needle));
}
export function librarySource(doc: LibraryDoc) {
  if (!doc.fuenteConsultada || !doc.fuenteUrl) return null;
  const kind: 'pdf' | 'html' = /\.pdf($|[?#])|norma_pdf\.php/i.test(doc.fuenteUrl) ? 'pdf' : 'html';
  return { url: doc.fuenteUrl, kind };
}
export function libraryStudyNotes(doc: LibraryDoc) {
  const applications: Record<string, string> = {
    'Carrera docente': 'Organiza una comparación de los procesos de ingreso y desarrollo profesional. Contrasta requisitos y régimen aplicable con la convocatoria y el texto oficial antes de tomar decisiones.',
    'Legislación educativa': 'Relaciona el tema con una situación ficticia de organización escolar e identifica qué disposiciones y modificaciones necesitas consultar antes de proponer una actuación.',
    'Gestión institucional': 'Usa el tema para analizar evidencias de autoevaluación, participación y mejoramiento. Las orientaciones metodológicas no deben presentarse como obligaciones legales nuevas.',
    'Inclusión': 'Analiza barreras de aprendizaje en un caso ficticio y plantea apoyos pedagógicos. Coteja los procedimientos y responsabilidades con las orientaciones y normas aplicables.',
    'Convivencia': 'Estudia un caso ficticio de convivencia y distingue acciones preventivas, acompañamiento y procedimientos que requieren revisar el marco oficial actualizado.',
    'Políticas educativas': 'Relaciona el tema con las necesidades del territorio y la planeación pedagógica; no deduzcas obligaciones o plazos legales de una ficha temática.',
    'Concursos y convocatorias': 'Construye una lista de documentos que debes revisar en el proceso concreto; esta ficha no confirma fechas, requisitos ni estructura de pruebas.',
  };
  return {
    points: [doc.descripcion, doc.fuenteConsultada
      ? 'El enlace institucional fue consultado; ello no acredita vigencia integral, lectura completa ni aplicabilidad a todos los casos. Coteja texto, modificaciones y ámbito de aplicación.'
      : 'La fuente exacta está pendiente de comprobación. Esta entrada orienta el estudio y no debe citarse como una norma o publicación oficial verificada.'],
    application: applications[doc.categoria] ?? 'Relaciona el tema con un caso pedagógico ficticio y comprueba las fuentes pertinentes antes de aplicarlo.',
  };
}