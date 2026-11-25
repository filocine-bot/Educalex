import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLookupAccount, adminResetAccount } from "@/lib/devices.functions";
import { adminSettleTransaction } from "@/lib/payments.functions";

type Info = Awaited<ReturnType<typeof adminLookupAccount>>;
const fmt = (iso: string) => new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });

/** Consultar una cuenta por correo y liberar sus dispositivos o reiniciar sus intentos. */
export function AdminAccountTools() {
  const lookup = useServerFn(adminLookupAccount);
  const reset = useServerFn(adminResetAccount);
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState<Info | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  async function search(e?: FormEvent) {
    e?.preventDefault(); setBusy(true); setMsg("");
    try { setInfo(await lookup({ data: { email } })); } catch (err) { setInfo(null); setMsg((err as Error).message); } finally { setBusy(false); }
  }
  async function doReset(what: "devices" | "attempts") {
    const label = what === "devices" ? "liberar todos los dispositivos" : "reiniciar los intentos de los niveles pagados";
    if (!window.confirm(`¿Seguro que quieres ${label} de ${email}?`)) return;
    setBusy(true); setMsg("");
    try { await reset({ data: { email, what } }); setMsg(what === "devices" ? "Dispositivos liberados. La persona puede entrar desde un equipo nuevo." : "Intentos reiniciados."); await search(); }
    catch (err) { setMsg((err as Error).message); } finally { setBusy(false); }
  }
  return <section className="admin-tools space-y-4" aria-labelledby="admin-tools-title">
    <h2 id="admin-tools-title" className="text-xl font-bold">Dispositivos e intentos de una cuenta</h2>
    <form onSubmit={search} className="flex flex-wrap gap-2">
      <label htmlFor="admin-email" className="sr-only">Correo de la cuenta</label>
      <Input id="admin-email" type="email" required placeholder="correo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} className="max-w-sm" />
      <Button type="submit" disabled={busy}>{busy ? "Buscando…" : "Buscar"}</Button>
    </form>
    {msg && <p role="status">{msg}</p>}
    {info && <div className="space-y-3">
      <p><strong>{info.email}</strong></p>
      <div>
        <h3 className="font-semibold">Dispositivos ({info.devices.length} de 3)</h3>
        {info.devices.length ? <ul className="list-disc pl-5">{info.devices.map(d => <li key={d.id}>{d.label} · desde {fmt(d.first)} · último uso {fmt(d.last)}</li>)}</ul> : <p>Ninguno registrado.</p>}
        <Button variant="outline" disabled={busy || !info.devices.length} onClick={() => void doReset("devices")}>Liberar dispositivos</Button>
      </div>
      <div>
        <h3 className="font-semibold">Intentos de niveles pagados</h3>
        {Object.keys(info.attempts).length ? <ul className="list-disc pl-5">{Object.entries(info.attempts).map(([k, v]) => { const [bank, lvl] = k.split(":"); return <li key={k}>{bank} · nivel {lvl === "2" ? "Intermedio" : "Avanzado"}: {v} de 3</li>; })}</ul> : <p>No ha usado intentos.</p>}
        <Button variant="outline" disabled={busy || !Object.keys(info.attempts).length} onClick={() => void doReset("attempts")}>Reiniciar intentos</Button>
      </div>
    </div>}
  </section>;
}

/** Revisar y activar un pago de Wompi por su ID. */
export function AdminPaymentFix() {
  const settle = useServerFn(adminSettleTransaction);
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  async function run(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMsg("");
    try {
      const r = await settle({ data: { id } });
      setMsg(r.status === "APPROVED" ? `Pago aprobado y acceso activo (${r.product ?? "producto"}) para ${r.email ?? "el correo del pago"}. Se le envió el enlace de acceso.` : `Wompi reporta el pago como ${r.wompiStatus}. Resultado: ${r.status}.`);
    } catch (err) { setMsg((err as Error).message); } finally { setBusy(false); }
  }
  return <section className="admin-tools space-y-3" aria-labelledby="admin-pay-title">
    <h2 id="admin-pay-title" className="text-xl font-bold">Activar un pago de Wompi</h2>
    <p className="text-sm">Si alguien pagó y no se le activó el acceso, pega aquí el ID de la transacción (está en el comprobante de Wompi, por ejemplo 12345-1795…-67890).</p>
    <form onSubmit={run} className="flex flex-wrap gap-2">
      <label htmlFor="admin-tx" className="sr-only">ID de la transacción</label>
      <Input id="admin-tx" required placeholder="ID de la transacción" value={id} onChange={e => setId(e.target.value)} className="max-w-sm" />
      <Button type="submit" disabled={busy}>{busy ? "Revisando…" : "Revisar y activar"}</Button>
    </form>
    {msg && <p role="status">{msg}</p>}
  </section>;
}
