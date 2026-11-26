import {describe,it,expect} from 'vitest';
import {preparationLevels,currentPreparationLevel,levelDraftSchema,learningSummary} from '@/lib/preparation-levels';
import {currentPracticeAccess} from '@/lib/practice-access';
describe('Preparation levels without active monetization',()=>{
  it('defines exactly Explorador, Avanza, Experto and Élite',()=>expect(preparationLevels.map(l=>l.label)).toEqual(['Explorador','Avanza','Experto','Élite']));
  it('only Explorador is currently available',()=>expect(preparationLevels.filter(l=>l.available).map(l=>l.code)).toEqual(['explorador']));
  it('current level is free with no premium or payments',()=>expect(currentPreparationLevel()).toEqual({code:'explorador',label:'Explorador',paymentsEnabled:false,premiumEnabled:false,allExistingContentFree:true}));
  it('all four existing profiles remain freely repeatable without quota',()=>{for(const p of ['ingreso-docente','ascenso-reubicacion','rector','coordinador'])expect(currentPracticeAccess(p)).toMatchObject({allowed:true,requiresAccount:false,consumesQuota:false});});
  it('admin can configure content and simulation rules independently',()=>expect(levelDraftSchema.parse({code:'avanza',label:'Avanza',content_rules:{focus:'inclusión'},simulation_rules:{review:true}})).toMatchObject({content_rules:{focus:'inclusión'},simulation_rules:{review:true}}));
  it('legacy package quantities cannot enter the level configuration',()=>expect(levelDraftSchema.parse({code:'avanza',label:'Avanza',extra_attempts:15})).not.toHaveProperty('extra_attempts'));
  it('drafts cannot enable premium or payment fields',()=>expect(levelDraftSchema.parse({code:'elite',label:'Élite',paymentsEnabled:true,premiumEnabled:true})).toEqual({code:'elite',label:'Élite',content_rules:{},simulation_rules:{}}));
  it('progress counts valid unique completions across 33 current units',()=>expect(learningSummary([{course_path:'/formacion/guia-34-pmi',unit_number:1},{course_path:'/formacion/guia-34-pmi',unit_number:1},{course_path:'/formacion/guia-34-pmi',unit_number:9}],['attempt'])).toEqual({completed:1,total:33,percentage:3,attempts:1}));
});