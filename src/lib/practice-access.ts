import { z } from 'zod';
export const offerDraftSchema = z.object({
 code:z.enum(['explorador','avanza','experto','elite']),label:z.string().trim().min(1).max(80),
 extra_attempts:z.number().int().min(0).max(100000).nullable(),integral_access:z.boolean(),
 level_rules:z.record(z.string(),z.union([z.string(),z.number(),z.boolean()])).default({})
}).refine(data=>data.integral_access?data.extra_attempts===null:data.extra_attempts!==null,{message:'Valor de compatibilidad legado no válido.'});
// DEPRECATED legacy package proposals retained for historical compatibility tests only.
// Never imported by admin or end-user level interfaces, nor any access decision.
export const initialOfferDrafts = [
 {code:'explorador',label:'Explorador',extra_attempts:0,integral_access:false,level_rules:{}},
 {code:'avanza',label:'Avanza',extra_attempts:5,integral_access:false,level_rules:{}},
 {code:'experto',label:'Experto',extra_attempts:15,integral_access:false,level_rules:{}},
 {code:'elite',label:'Élite',extra_attempts:null,integral_access:true,level_rules:{}}
] satisfies z.infer<typeof offerDraftSchema>[];
export function currentPracticeAccess(_profile:string){
 return {allowed:true,requiresAccount:false,consumesQuota:false,reason:'existing-free-practice'} as const;
}
export function futureConsumptionDesign({balance,integral,existingFree,previousAttempt}:{balance:number;integral:boolean;existingFree:boolean;previousAttempt:boolean}){
  // DEPRECATED package consumption design; never called by any app flow.
 if(existingFree)return {allowed:true,delta:0,reason:'existing-free'};
 if(previousAttempt)return {allowed:true,delta:0,reason:'idempotent-retry'};
 if(integral)return {allowed:true,delta:0,reason:'integral-right'};
 return balance>=1?{allowed:true,delta:-1,reason:'one-attempt'}:{allowed:false,delta:0,reason:'no-quota'};
}
