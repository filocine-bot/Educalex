import { createServerFn } from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {levelDraftSchema} from './preparation-levels';
export const getOfferDrafts=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});
 if(role.error||role.data!==true)throw new Error('Acceso administrativo requerido.');
  const [offers,audit]=await Promise.all([context.supabase.from('practice_offer_drafts').select('code,label,content_rules,simulation_rules,revision,updated_at').order('code'),context.supabase.from('practice_access_ledger').select('id,offer_code,event_type,created_at').order('created_at',{ascending:false}).limit(50)]);
 if(offers.error||audit.error)throw new Error('No se pudo consultar la configuración.');
 return {offers:offers.data??[],audit:audit.data??[],activationEnabled:false};
});
export const saveOfferDraft=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>levelDraftSchema.parse(input)).handler(async({data,context})=>{
 const role=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'});
 if(role.error||role.data!==true)throw new Error('Acceso administrativo requerido.');
  const existing=await context.supabase.from('practice_offer_drafts').select('code').eq('code',data.code).maybeSingle();
  if(existing.error)throw new Error('No se pudo consultar el nivel.');
  // Retain historical package values on update; compatibility defaults only on new rows.
  const saved=existing.data
    ? await context.supabase.from('practice_offer_drafts').update(data).eq('code',data.code).select('code').single()
    : await context.supabase.from('practice_offer_drafts').insert({...data,extra_attempts:0,integral_access:false}).select('code').single();
  if(saved.error||!saved.data)throw new Error('No se pudo guardar el borrador.');
 return {saved:true,activated:false};
});
