import type { PagePath } from './educalex-sitemap';

export type HeaderLink = { label: string; to: PagePath | '/' | '/docente-ia' | '/nosotros' };
export type HeaderItem = HeaderLink & { children?: HeaderLink[]; compact?: boolean };
const profiles = [
  { code: 'ingreso-docente', label: 'Ingreso docente' },
  { code: 'ascenso-reubicacion', label: 'Ascenso y reubicación' },
  { code: 'coordinador', label: 'Aspirante a coordinador' },
  { code: 'rector', label: 'Aspirante a rector' },
] as const;
const profileLinks = (section: 'concursos' | 'simulacros'): HeaderLink[] =>
  profiles.map(p => ({ label: p.label, to: `/${section}/${p.code}` as PagePath }));

export const headerNavigation: HeaderItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Concursos', to: '/concursos', children: profileLinks('concursos') },
  { label: 'Formación', to: '/formacion', children: [
    { label: 'Guía 34 y PMI', to: '/formacion/guia-34-pmi' },
    { label: 'Inclusión, DUA y PIAR', to: '/formacion/inclusion-dua-piar' },
    { label: 'Convivencia escolar', to: '/formacion/convivencia-escolar' },
    { label: 'Ruta de Atención Integral', to: '/formacion/ruta-atencion-integral' },
    { label: 'Educación rural', to: '/formacion/educacion-rural' },
    { label: 'STEAM y robótica', to: '/formacion/steam-robotica' },
    { label: 'Dilemas educativos', to: '/formacion/dilemas-educativos' },
    { label: 'Herramientas de IA', to: '/formacion/herramientas-ia' },
  ] },
  { label: 'Simulacros', to: '/simulacros', children: profileLinks('simulacros') },
  { label: 'Biblioteca', to: '/biblioteca', compact: true },
  { label: 'Planes', to: '/planes', compact: true },
  { label: 'EducatIA', to: '/docente-ia', compact: true },
  { label: 'Mi cuenta', to: '/mi-cuenta', compact: true },
];
export const institutionalLinks: HeaderLink[] = [
  { label: 'Cómo usar EDUCALEX', to: '/guia-de-uso' },
  { label: 'Nuestra Academia', to: '/nosotros' },
  { label: 'Asesoría en investigación', to: '/asesoria-investigacion' },
  { label: 'Preguntas frecuentes', to: '/preguntas-frecuentes' },
  { label: 'Contacto', to: '/contacto' },
];