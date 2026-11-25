import { useDirectPay } from "@/components/direct-pay";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account-session";
import { getMyPurchases } from "@/lib/payments.functions";
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

/** Botón de pago de un nivel: abre Wompi de inmediato (sin sesión, el correo se escribe en Wompi). */
export function BuyLevelButton({ profile, level, owned, returnPath }: { profile: SimulationProfile; level: number; owned: readonly string[]; returnPath: string }) {
  const { pay, busy, error } = useDirectPay();
  const offer = offerForLevel(owned, profile, level);
  if (!offer) return null;
  return <div className="level-buy">
    <Button disabled={busy !== null} onClick={() => pay(offer.id, returnPath)} aria-label={`Comprar ${offer.title} por ${cop(offer.priceCOP!)} con Wompi`}>
      <CreditCard aria-hidden="true" /> {busy ? "Abriendo Wompi…" : `Pagar ${cop(offer.priceCOP!)}`}
    </Button>
    <small>Acceso completo: todos los niveles</small>
    {error && <span role="alert" className="text-destructive">{error}</span>}
  </div>;
}

/** Opciones de compra para desbloquear los niveles premium de un perfil. */
export function BuyPremium({ profile, returnPath }: { profile: SimulationProfile; returnPath: string }) {
  const { pay, busy, error } = useDirectPay();
  const { owned } = useMyPremium();
  const forSale = offersFor(owned, profile);

  if (!forSale.length) return null;
  const buy = (id: string) => pay(id, returnPath);

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
