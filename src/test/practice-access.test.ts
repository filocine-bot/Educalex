import {describe,it,expect} from 'vitest';
import {initialOfferDrafts,offerDraftSchema,currentPracticeAccess,futureConsumptionDesign} from '@/lib/practice-access';
import {simulationBank} from '@/lib/simulation-bank';
describe('Modelo individual futuro sin monetización',()=>{
 it('Explorador empieza sin adicionales y gratis',()=>expect(initialOfferDrafts.find(o=>o.code==='explorador')?.extra_attempts).toBe(0));
 it('Avanza propone 5 adicionales',()=>expect(initialOfferDrafts.find(o=>o.code==='avanza')?.extra_attempts).toBe(5));
 it('Experto propone 15 adicionales',()=>expect(initialOfferDrafts.find(o=>o.code==='experto')?.extra_attempts).toBe(15));
 it('Élite propone acceso integral',()=>expect(initialOfferDrafts.find(o=>o.code==='elite')?.integral_access).toBe(true));
 it('las cantidades son editables, no fijadas al nombre',()=>expect(offerDraftSchema.parse({code:'avanza',label:'Avanza',extra_attempts:7,integral_access:false}).extra_attempts).toBe(7));
 it('no permite cantidades negativas',()=>expect(offerDraftSchema.safeParse({code:'avanza',label:'Avanza',extra_attempts:-1,integral_access:false}).success).toBe(false));
 it('existen exactamente cuatro prácticas con veinte preguntas',()=>{expect(Object.keys(simulationBank)).toHaveLength(4);for(const bank of Object.values(simulationBank))expect(bank.questions).toHaveLength(20);});
 for(const profile of ['ingreso-docente','ascenso-reubicacion','rector','coordinador'])it(`${profile} permanece libre y sin consumo`,()=>expect(currentPracticeAccess(profile)).toMatchObject({allowed:true,requiresAccount:false,consumesQuota:false}));
 it('diseño: prácticas existentes no consumen aunque no haya saldo',()=>expect(futureConsumptionDesign({balance:0,integral:false,existingFree:true,previousAttempt:false})).toMatchObject({allowed:true,delta:0}));
 it('diseño: un intento adicional consumiría un cupo',()=>expect(futureConsumptionDesign({balance:5,integral:false,existingFree:false,previousAttempt:false})).toMatchObject({allowed:true,delta:-1}));
 it('diseño: reintento de la misma operación no duplica consumo',()=>expect(futureConsumptionDesign({balance:0,integral:false,existingFree:false,previousAttempt:true})).toMatchObject({allowed:true,delta:0}));
 it('diseño: sin cupo no autoriza intento adicional',()=>expect(futureConsumptionDesign({balance:0,integral:false,existingFree:false,previousAttempt:false})).toMatchObject({allowed:false,delta:0}));
});
