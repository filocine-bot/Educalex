import type { PagePath } from './educalex-sitemap';
export const educationalProfiles = [
 {code:'ingreso-docente',label:'Ingreso a la carrera docente',teacher:'aspirante'},
 {code:'ascenso-reubicacion',label:'Ascenso y reubicación',teacher:'docente'},
 {code:'coordinador',label:'Aspirante a coordinador',teacher:'coordinador'},
 {code:'rector',label:'Aspirante a rector',teacher:'rector'},
 {code:'directivo',label:'Directivo en ejercicio',teacher:'directivo'},
] as const;
export type EducationalProfile = typeof educationalProfiles[number]['code'];
export function resolveEducationalProfile(value:unknown):EducationalProfile|null {return educationalProfiles.find(p=>p.code===value)?.code??null;}
export type ProfileLink={label:string;to:PagePath};
export type ProfileGroup={label:string;links:ProfileLink[]};
const link=(label:string,to:PagePath):ProfileLink=>({label,to});
export function profileGroups(profile:EducationalProfile):ProfileGroup[]{
 const route=profile==='directivo'?'/formacion/guia-34-pmi':`/concursos/${profile}` as PagePath;
 const topics=profile==='ingreso-docente'?['Competencias pedagógicas','Competencias comportamentales','Competencias básicas y específicas']:profile==='ascenso-reubicacion'?['Evaluación de competencias','Práctica pedagógica','Competencias funcionales','Competencias comportamentales']:profile==='coordinador'?['Funciones y competencias','Gestión académica','Acompañamiento pedagógico','Liderazgo y trabajo en equipo']:['Gestión directiva','Gestión académica','Gestión administrativa y financiera','Gestión comunitaria'];
 const courses=profile==='ingreso-docente'||profile==='ascenso-reubicacion'?[link('Inclusión, DUA y PIAR','/formacion/inclusion-dua-piar'),link('Educación rural','/formacion/educacion-rural'),link('STEAM y robótica','/formacion/steam-robotica')]:[link('Guía 34 y autoevaluación','/formacion/guia-34-pmi'),link('PMI y talleres','/formacion/talleres-pmi'),link('Convivencia escolar','/formacion/convivencia-escolar'),link('Inclusión, DUA y PIAR','/formacion/inclusion-dua-piar')];
 const groups:ProfileGroup[]=[{label:'Ruta y competencias',links:[link(profile==='directivo'?'Gestión institucional':'Ruta de preparación',route),...topics.map(t=>link(t,route))]},{label:'Cursos y herramientas',links:[...courses,link('PEI · en preparación','/formacion/pei'),link('Liderazgo · en preparación','/formacion/liderazgo-pedagogico')]},{label:'Material de estudio',links:[link(profile==='ascenso-reubicacion'?'Decreto Ley 1278 de 2002':'Legislación educativa','/biblioteca/legislacion'),link('Guías del MEN','/biblioteca/guias-men'),link('Recursos institucionales','/biblioteca/recursos')]}];
 if(profile!=='directivo')groups.push({label:'Simulacros',links:[link('Práctica del perfil',`/simulacros/${profile}` as PagePath),link('Resultados y retroalimentación','/mis-resultados')]});
 return groups;
}
/** Simulacros que corresponden a cada perfil educativo. El directivo en ejercicio practica los dos cargos directivos. */
export const SIMULATION_PROFILES = ['ingreso-docente', 'ascenso-reubicacion', 'rector', 'coordinador'] as const;
export function simulacrosFor(profile: EducationalProfile | null): readonly (typeof SIMULATION_PROFILES)[number][] {
 if (!profile) return SIMULATION_PROFILES;
 return profile === 'directivo' ? ['rector', 'coordinador'] : [profile];
}
