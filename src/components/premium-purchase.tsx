import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account-session";
import { getMyPurchases, startCheckout } from "@/lib/payments.functions";
import { LAUNCH_BUYERS, offerForLevel, offersFor, unlockedLevel } from "@/lib/payments";
import type { SimulationProfile } from "@/lib/simulation-bank";

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/** Productos premium comprados por la persona (vacío si no hay sesión). */
export function useMyPremium() {
  const { user } = useAccount();
  const fetchPurchases = useServerFn(getMyPurchases);
  const [owned, setOwned] = useState<string[]>([]);
  useEffect(() => {
    if (!user) { setOwned([]); return; }
    let alive = true;
    fetchPurchases().then(r => { if (alive) setOwned(r.products); }).catch(() => { /* sin compras o pagos no configurados */ });
    return () => { alive = false; };
  }, [user, fetchPurchases]);
  return { owned, level: (profile: SimulationProfile) => unlockedLevel(owned, profile) };
}

/** Botón de pago de un nivel: abre Wompi con el plan más económico que desbloquea ese nivel. */
export function BuyLevelButton({ profile, level, owned, returnPath }: { profile: SimulationProfile; level: number; owned: readonly string[]; returnPath: string }) {
  const { user } = useAccount();
  const checkout = useServerFn(startCheckout);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const offer = offerForLevel(owned, profile, level);
  if (!offer) return null;
  if (!user) return <div className="level-buy">
    <Button asChild><Link to="/ingresar"><CreditCard aria-hidden="true" /> Pagar {cop(offer.priceCOP!)}</Link></Button>
    <small>Inicia sesión o <Link to="/registro">crea tu cuenta</Link> para pagar.</small>
  </div>;
  async function buy() {
    setBusy(true); setError("");
    try { const { url } = await checkout({ data: { product: offer!.id, returnPath } }); window.location.href = url; }
    catch (e) { setError((e as Error).message || "No se pudo iniciar el pago."); setBusy(false); }
  }
  return <div className="level-buy">
    <Button disabled={busy} onClick={buy} aria-label={`Comprar ${offer.title} por ${cop(offer.priceCOP!)} con Wompi`}>
      <CreditCard aria-hidden="true" /> {busy ? "Abriendo Wompi…" : `Pagar ${cop(offer.priceCOP!)}`}
    </Button>
    <small>{offer.title.replace(/ · .*/, "")}{offer.level > level ? ` (hasta el nivel ${["Básico", "Intermedio", "Avanzado"][offer.level - 1]})` : ""}</small>
    {error && <span role="alert" className="text-destructive">{error}</span>}
  </div>;
}

/** Opciones de compra para desbloquear los niveles premium de un perfil. */
export function BuyPremium({ profile, returnPath }: { profile: SimulationProfile; returnPath: string }) {
  const { user } = useAccount();
  const checkout = useServerFn(startCheckout);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { owned } = useMyPremium();
  const forSale = offersFor(owned, profile);

  if (!forSale.length) return null;
  if (!user) return <div className="premium-box"><p><Lock aria-hidden="true" /> Para comprar el acceso premium, <Link to="/ingresar">inicia sesión</Link> o <Link to="/registro">crea una cuenta</Link>.</p></div>;

  async function buy(id: string) {
    setBusy(id); setError("");
    try { const { url } = await checkout({ data: { product: id, returnPath } }); window.location.href = url; }
    catch (e) { setError((e as Error).message || "No se pudo iniciar el pago."); setBusy(null); }
  }

  return <div className="premium-box">
    <h3><CreditCard aria-hidden="true" /> Desbloquea más niveles</h3>
    <p className="section-description">Precios de lanzamiento para las primeras {LAUNCH_BUYERS} compras. Cada plan incluye los niveles anteriores.</p>
    <ul>{forSale.map(p => <li key={p.id}>
      <div><strong>{p.title}</strong><small>{p.description}</small></div>
      <Button variant="navy" disabled={busy !== null} onClick={() => buy(p.id)}>{busy === p.id ? "Abriendo Wompi…" : `Comprar · ${cop(p.priceCOP!)}`}</Button>
    </li>)}</ul>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    <p className="section-description">Pago seguro con Wompi (tarjetas, PSE, Nequi y más). Pago único, sin renovación automática. Consulta los <Link to="/terminos">términos</Link>.</p>
  </div>;
}
