import { useState, type FormEvent } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage } from "@/lib/auth-feedback";

/** Opcional tras pagar sin cuenta: crear una contraseña para entrar luego desde otro dispositivo. */
export function GuestPassword() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMsg(authErrorMessage(error)); return; }
    setPassword(""); setDone(true);
  }
  if (done) return <p role="status" className="guest-pass-ok">Contraseña guardada. Desde otro celular o computador entras con tu correo y esa contraseña.</p>;
  return <form className="guest-pass" onSubmit={submit}>
    <p><KeyRound aria-hidden="true" className="inline h-4 w-4 mr-1" /><strong>Recomendado:</strong> en este equipo ya quedas con la sesión abierta. Para entrar desde otro dispositivo, crea una contraseña.</p>
    <label htmlFor="guest-pass" className="sr-only">Nueva contraseña</label>
    <Input id="guest-pass" type="password" minLength={8} required autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
    <Button type="submit" disabled={busy}>{busy ? "Guardando…" : "Guardar contraseña"}</Button>
    {msg && <p role="alert">{msg}</p>}
  </form>;
}
