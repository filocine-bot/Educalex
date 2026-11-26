import {describe,it,expect} from 'vitest';
import {launchAccess,freeCoursePaths,unitCount} from '@/lib/learning-policy';
describe('Lanzamiento gratuito',()=>{
 it('todos los usuarios tienen acceso gratuito',()=>expect(launchAccess.freeForEveryone).toBe(true));
 it('no hay pagos activos',()=>expect(launchAccess.paymentsEnabled).toBe(false));
 it('no hay premium activo',()=>expect(launchAccess.premiumEnabled).toBe(false));
 it('los siete cursos existentes conservan acceso y unidades',()=>{expect(freeCoursePaths).toHaveLength(7);expect(unitCount('/formacion/guia-34-pmi')).toBe(8);for(const path of freeCoursePaths.slice(1))expect(unitCount(path)).toBe(5);expect(unitCount('/formacion/no-existe')).toBe(0);});
});
