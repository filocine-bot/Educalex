import { createMiddleware } from '@tanstack/react-start';
import { supabase, supabaseConfigured } from '@/integrations/supabase/client';
export const learningBearer = createMiddleware({type:'function'}).client(async ({next})=>{
 if(!supabaseConfigured)return next({headers:{}});
 const {data}=await supabase.auth.getSession();
 return next({headers:data.session?{Authorization:`Bearer ${data.session.access_token}`}:{}});
});
