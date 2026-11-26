export const freeCoursePaths = ['/formacion/guia-34-pmi','/formacion/inclusion-dua-piar','/formacion/convivencia-escolar','/formacion/educacion-rural','/formacion/steam-robotica','/formacion/actualizacion-normativa','/formacion/evaluacion-formativa'] as const;
export const launchAccess = { freeForEveryone: true, paymentsEnabled: false, premiumEnabled: false } as const;
export function unitCount(path: string) { return path === freeCoursePaths[0] ? 8 : freeCoursePaths.includes(path as typeof freeCoursePaths[number]) ? 5 : 0; }
