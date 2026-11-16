import { createFileRoute,Outlet,redirect } from '@tanstack/react-router';
import { supabase, supabaseConfigured } from '@/integrations/supabase/client';
export const Route=createFileRoute('/_authenticated')({ssr:false,beforeLoad:async()=>{if(!supabaseConfigured)throw redirect({to:'/auth'});const {data,error}=await supabase.auth.getUser();if(error||!data.user)throw redirect({to:'/auth'});},component:()=> <Outlet/>});
