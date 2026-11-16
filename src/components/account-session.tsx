import { createContext,useContext,useEffect,useState,Fragment,type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '@/integrations/supabase/client';
import { getLearning } from '@/lib/learning.functions';
import { recoveryRequested } from '@/lib/auth-feedback';
const AccountContext=createContext<{user:User|null;isAdmin:boolean;loading:boolean;recoveryReady:boolean}>({user:null,isAdmin:false,loading:true,recoveryReady:false});
export function AccountProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [isAdmin,setAdmin]=useState(false);const [recoveryReady,setRecoveryReady]=useState(false);const router=useRouter();const queryClient=useQueryClient();
 useEffect(()=>{if(!supabaseConfigured){setLoading(false);return;}let alive=true;let generation=0;let identity:string|null=null;
 const requested=recoveryRequested(window.location.hash,window.location.search);
 async function refresh(){const run=++generation;try{const {data}=await supabase.auth.getUser();if(!alive||run!==generation)return;setUser(data.user);setLoading(false);setAdmin(false);if(data.user){if(requested)setRecoveryReady(true);try{const info=await getLearning();if(alive&&run===generation)setAdmin(info.isAdmin);}catch{/* Fail closed; account pages expose retry. */}}else setRecoveryReady(false);}catch{if(alive&&run===generation){setUser(null);setAdmin(false);setRecoveryReady(false);setLoading(false);}}}
 const {data}=supabase.auth.onAuthStateChange((event,session)=>{if(!['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT','USER_UPDATED','PASSWORD_RECOVERY'].includes(event))return;const nextIdentity=session?.user.id??null;if(identity!==nextIdentity||event==='SIGNED_OUT'){identity=nextIdentity;generation++;setUser(null);setAdmin(false);setRecoveryReady(false);void queryClient.cancelQueries();queryClient.clear();}if(event==='PASSWORD_RECOVERY')setRecoveryReady(true);if(event==='INITIAL_SESSION')return;setTimeout(()=>{if(!alive)return;void refresh();void router.invalidate();if(event!=='SIGNED_OUT')void queryClient.invalidateQueries();},0);});
 void refresh();
 return()=>{alive=false;data.subscription.unsubscribe();};},[router,queryClient]);
 return <AccountContext.Provider value={{user,isAdmin,loading,recoveryReady}}><Fragment key={user?.id??'anonymous'}>{children}</Fragment></AccountContext.Provider>;
}
export const useAccount=()=>useContext(AccountContext);
