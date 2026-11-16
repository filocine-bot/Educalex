import {useState} from 'react';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {useAccount} from './account-session';
import {getLearning,updateProfile} from '@/lib/learning.functions';
import {educationalProfiles,resolveEducationalProfile} from '@/lib/profile-navigation';
export function ProfileSelector(){
 const {user}=useAccount();const client=useQueryClient();const query=useQuery({queryKey:['learning-account'],queryFn:()=>getLearning(),enabled:!!user});const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 if(!user)return null;
 return <div className="profile-selector"><label htmlFor="active-educational-profile">Perfil activo</label><select id="active-educational-profile" value={query.data?.profile?.preparation_path??''} disabled={busy||query.isPending||query.isError} onChange={async e=>{const code=resolveEducationalProfile(e.target.value);const profile=query.data?.profile;if(!code||!profile)return;setBusy(true);setMessage('');try{await updateProfile({data:{display_name:profile.display_name,teacher_type:educationalProfiles.find(p=>p.code===code)?.teacher??'',preparation_path:code}});await client.invalidateQueries({queryKey:['learning-account']});setMessage('Perfil actualizado.');}catch{setMessage('No se pudo cambiar el perfil. Intenta desde Mi cuenta.');}finally{setBusy(false);}}}><option value="">Seleccionar perfil</option>{educationalProfiles.map(p=><option key={p.code} value={p.code}>{p.label}</option>)}</select>{message&&<span role="status">{message}</span>}{query.isError&&<span role="status">Perfil no disponible. Abre Mi cuenta para reintentar.</span>}</div>;
}