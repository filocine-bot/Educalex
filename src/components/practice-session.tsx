import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import type { PracticeResult } from "@/lib/simulation-scoring";
import { saveAttempt } from "@/lib/learning.functions";
import { useAccount } from "./account-session";
import { useQueryClient } from "@tanstack/react-query";
const PracticeSessionContext = createContext<{ results: PracticeResult[]; addResult: (result: PracticeResult) => void; clearResults: () => void; saveMessage: string } | null>(null);
export function PracticeSessionProvider({ children }: { children: ReactNode }) {
 const [results,setResults]=useState<PracticeResult[]>([]);const [saveMessage,setMessage]=useState("");const {user}=useAccount();const client=useQueryClient();
 const generation=useRef(0);
 useEffect(()=>{generation.current++;setResults([]);setMessage("");return()=>{generation.current++;};},[user?.id]);
 return <PracticeSessionContext.Provider value={{results,saveMessage,clearResults:()=>{generation.current++;setResults([]);setMessage('');},addResult:result=>{const run=++generation.current;setResults(previous=>[result,...previous]);if(user){setMessage("Guardando resultado…");void saveAttempt({data:{...result,id:crypto.randomUUID()}}).then(()=>{if(run!==generation.current)return;setMessage("Resultado guardado en tu cuenta.");void client.invalidateQueries({queryKey:['learning-account']});}).catch(()=>{if(run===generation.current)setMessage("No se pudo guardar. Este resultado solo permanece en esta sesión; revisa la conexión antes de otro intento.");});}else setMessage("Práctica anónima: resultado temporal; no se guarda historial.");}}}>{children}</PracticeSessionContext.Provider>;
}
export function usePracticeSession(){const session=useContext(PracticeSessionContext);if(!session)throw new Error("La sesión de práctica no está disponible.");return session;}
