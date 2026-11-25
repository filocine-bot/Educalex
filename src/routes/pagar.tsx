import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/components/account-session";
import { savePending } from "@/components/direct-pay";
import { startCheckout, startGuestCheckout } from "@/lib/payments.functions";
import { getProduct, purchasable } from "@/lib/payments";
import { pageHead } from "@/lib/educalex-content";

const PATH = /^\/[a-z0-9/-]{0,80}$/;
const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export const Route = createFileRoute("/pagar")({
  head: () => pageHead("Pagar acceso", "Paga con Wompi usando solo tu correo; tu acceso queda activo al instante."),
  validateSearch: (s: Record<string, unknown>) => ({
    producto: typeof s["producto"] === "string" ? s["producto"] : "",
    volver: typeof s["volver"] === "string" && PATH.test(s["volver"]) ? s["volver"] : "/simulacros",
  }),
  component: Pagar,
});

function Pagar() {
  const { producto, volver } = Route.useSearch();
  const { user, loading } = useAccount();
  const guest = useServerFn(startGuestCheckout);
  const signed = useServerFn(startCheckout);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [adult, setAdult] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const product = getProduct(producto);
  const valid = !!product && purchasable(product) && !product.requires;

  // Con sesión iniciada no hace falta el correo: se abre Wompi directamente.
  useEffect(() => {
    if (loading || !user || !valid) return;
    setBusy(true);
    signed({ data: { product: producto, returnPath: volver } })
      .then(({ url }) => { window.location.href = url; })
      .catch(e => { setError((e as Error).message || "No se pudo abrir el pago."); setBusy(false); });
  }, [user, loading, valid, producto, volver, signed]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!consent || !adult) { setError("Para continuar acepta la política y confirma que eres mayor de edad."); return; }
    setBusy(true);
    try {
      const { url } = await guest({ data: { email: email.trim(), product: producto, returnPath: volver, consent: true, adult: true } });
      window.location.href = url;
    } catch (err) {
      setError((err as Error).message?.includes("email") ? "Revisa que el correo esté bien escrito." : (err as Error).message || "No se pudo abrir el pago.");
      setBusy(false);
    }
  }

  if (!valid) return <section className="section site-container"><div className="max-w-md mx-auto space-y-4">
    <h1 className="text-2xl font-bold">Producto no disponible</h1>
    <p>Elige tu perfil en <Link className="text-brand-blue underline" to="/planes">Planes</Link> para pagar tu acceso.</p>
  </div></section>;

  return <section className="section site-container"><div className="max-w-md mx-auto space-y-5 guest-pay">
    <h1 className="text-2xl font-bold"><CreditCard aria-hidden="true" className="inline mr-2" />{product.title}</h1>
    <p className="guest-pay-price"><strong>{cop(product.priceCOP!)}</strong> · pago único</p>
    {user ? <p role="status">{error || "Abriendo el pago seguro de Wompi…"}</p> : <>
      <p>No necesitas crear cuenta ni contraseña. Escribe tu correo, paga en Wompi y al terminar entras directo a tus simulacros.</p>
      <form className="space-y-4" onSubmit={submit}>
        <label className="block space-y-1" htmlFor="guest-email"><span className="font-semibold"><Mail aria-hidden="true" className="inline mr-1 h-4 w-4" />Tu correo electrónico</span>
          <Input id="guest-email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@correo.com" />
        </label>
        <p className="text-sm text-muted-foreground">Con este correo queda guardado tu acceso. Escríbelo bien.</p>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> <span>Acepto la <Link className="text-brand-blue underline" to="/privacidad">política de tratamiento de datos</Link> y los <Link className="text-brand-blue underline" to="/terminos">términos</Link>.</span></label>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={adult} onChange={e => setAdult(e.target.checked)} /> <span>Soy mayor de edad.</span></label>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Abriendo Wompi…" : `Pagar ${cop(product.priceCOP!)} con Wompi`}</Button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </form>
      <p className="text-sm flex gap-2"><ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />El pago se hace en la plataforma segura de Wompi. EDUCALEX no ve ni guarda los datos de tu tarjeta.</p>
      <p className="text-sm">¿Ya tienes cuenta? <Link className="text-brand-blue underline" to="/ingresar" onClick={() => savePending({ product: producto, returnPath: volver })}>Ingresa</Link> y el pago se abre solo.</p>
    </>}
  </div></section>;
}
