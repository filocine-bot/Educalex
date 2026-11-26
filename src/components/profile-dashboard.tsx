import {Link} from '@tanstack/react-router';
import {useQuery} from '@tanstack/react-query';
import {getLearning} from '@/lib/learning.functions';
import {educationalProfiles,resolveEducationalProfile,profileGroups} from '@/lib/profile-navigation';
import {Button} from './ui/button';
export function ProfileDashboard(){
 const query=useQuery({queryKey:['learning-account'],queryFn:()=>getLearning()});
 if(query.isPending)return <p role="status">Cargando tu panel…</p>;
 if(query.isError)return <div><p role="alert">No se pudo leer tu perfil.</p><Button onClick={()=>query.refetch()}>Reintentar</Button></div>;
 const profile=resolveEducationalProfile(query.data.profile?.preparation_path);
 if(!profile)return <p>Selecciona tu perfil desde <Link className="underline" to="/mi-cuenta">Mi cuenta</Link> para ver tu ruta recomendada.</p>;
 return <div className="space-y-6"><h2 className="text-2xl font-semibold">{educationalProfiles.find(p=>p.code===profile)?.label}</h2><p>Plan gratuito · preparación completa disponible con pago único</p><div className="grid gap-6 md:grid-cols-2">{profileGroups(profile).map(group=><section key={group.label}><h3 className="font-semibold mb-3">{group.label}</h3><ul className="space-y-3">{group.links.map(item=><li key={item.label}><Link className="underline" to={item.to}>{item.label}</Link></li>)}</ul></section>)}</div><div className="flex gap-5"><Link to="/mi-progreso" className="underline">Mi progreso</Link><Link to="/docente-ia" className="underline">EducatIA</Link></div></div>;
}