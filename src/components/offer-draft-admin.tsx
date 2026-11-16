import {useState} from 'react';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {getOfferDrafts,saveOfferDraft} from '@/lib/practice-access.functions';
import {preparationLevels,type levelDraftSchema} from '@/lib/preparation-levels';
import type {z} from 'zod';
function OfferEditor({offer}:{offer:z.infer<typeof levelDraftSchema>}){
 const [label,setLabel]=useState(offer.label);const [content,setContent]=useState(JSON.stringify(offer.content_rules,null,2));const [simulations,setSimulations]=useState(JSON.stringify(offer.simulation_rules,null,2));const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const client=useQueryClient();
 return <form className="space-y-3 border-b border-border py-5" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await saveOfferDraft({data:{code:offer.code,label,content_rules:JSON.parse(content),simulation_rules:JSON.parse(simulations)}});await client.invalidateQueries({queryKey:['offer-drafts']});setMessage('Borrador guardado y auditado. No se activaron beneficios ni restricciones.');}catch{setMessage('No se pudo guardar: revisa los valores y reglas.');}finally{setBusy(false);}}}>
 <h3 className="font-semibold">{offer.label} · borrador futuro</h3><label className="block">Nombre<Input value={label} maxLength={80} required onChange={e=>setLabel(e.target.value)}/></label><label className="block">Reglas futuras de contenido (JSON)<textarea className="block w-full rounded-md border border-input bg-background p-3" rows={4} value={content} onChange={e=>setContent(e.target.value)}/></label><label className="block">Reglas futuras de simulacros (JSON)<textarea className="block w-full rounded-md border border-input bg-background p-3" rows={4} value={simulations} onChange={e=>setSimulations(e.target.value)}/></label><Button variant="outline" disabled={busy} type="submit">{busy?'Guardando…':'Guardar borrador'}</Button>{message&&<p role="status">{message}</p>}</form>;
}
export function OfferDraftAdmin(){
 const query=useQuery({queryKey:['offer-drafts'],queryFn:()=>getOfferDrafts()});
 if(query.isPending)return <p>Cargando borradores…</p>;
 if(query.isError)return <div><p>No se pudieron leer los borradores.</p><Button onClick={()=>query.refetch()}>Reintentar</Button></div>;
 return <section className="max-w-2xl space-y-4"><h2 className="text-xl font-semibold">Niveles de preparación · sin activación</h2><p>Explorador es gratuito. Avanza, Experto y Élite: próximamente. Todos los contenidos actuales y las cuatro prácticas de ocho preguntas siguen gratuitos. Sin pagos habilitados.</p>{preparationLevels.map(defaults=>{const saved=query.data.offers.find(o=>o.code===defaults.code);const offer={code:defaults.code,label:saved?.label??defaults.label,content_rules:(saved?.content_rules??{}) as z.infer<typeof levelDraftSchema>['content_rules'],simulation_rules:(saved?.simulation_rules??{}) as z.infer<typeof levelDraftSchema>['simulation_rules']};return <OfferEditor key={offer.code} offer={offer}/>;})}<h3 className="font-semibold">Últimos cambios auditados</h3>{query.data.audit.length===0?<p>Aún no hay cambios guardados.</p>:<ul className="space-y-2">{query.data.audit.map(item=><li key={item.id}>{new Date(item.created_at).toLocaleString('es-CO')} · {item.offer_code} · {item.event_type.includes('created')?'Borrador creado':'Borrador actualizado'}</li>)}</ul>}</section>;
}
