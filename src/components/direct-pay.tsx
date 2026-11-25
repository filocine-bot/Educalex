import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account-session";
import { useMyPremium } from "@/components/premium-purchase";
import { startCheckout } from "@/lib/payments.functions";
import { getProduct, LAUNCH_BUYERS, offersFor, PROFILE_LABEL, PROFILES, purchasable } from "@/lib/payments";
import type { SimulationProfile } from "@/lib/simulation-bank";

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const LEVELS = ["Básico", "Intermedio", "Avanzado", "Experto"];
const PENDING_KEY = "educalex-compra-pendiente";
const PENDING_MAX_MS = 30 * 60 * 1000;

type Pending = { product: string; returnPath: string; at: number };

function savePending(p: Omit<Pending, "at">) {
  try { sessionStorage.setItem(PENDING_KEY, JSON.stringify({ ...p, at: Date.now() })); } catch { /* sin almacenamiento */ }
}
function takePending(): Pending | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    sessionStorage.removeItem(PENDING_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Pending;
    if (!p || typeof p.product !== "string" || Date.now() - p.at > PENDING_MAX_MS || !getProduct(p.product)) return null;
    return p;
  } catch { return null; }
}

/** Inicia el pago en Wompi. Sin sesión, guarda la compra y lleva a ingresar; al entrar, el pago se abre solo. */
export function useDirectPay() {
  const { user } = useAccount();
  const checkout = useServerFn(startCheckout);
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  async function pay(product: string, returnPath: string, to: "/ingresar" | "/registro" = "/ingresar") {
    setError("");
    if (!user) { savePending({ product, returnPath }); await navigate({ to }); return; }
    setBusy(product);
    try { const { url } = await checkout({ data: { product, returnPath } }); window.location.href = url; }
    catch (e) { setError((e as Error).message || "No se pudo abrir el pago."); setBusy(null); }
  }
  return { pay, busy, error, signedIn: !!user };
}

/** Retoma la compra que alguien eligió antes de iniciar sesión (montado en todo el sitio). */
export function PendingPurchaseResume() {
  const { user, loading } = useAccount();
  const checkout = useServerFn(startCheckout);
  const done = useRef(false);
  const [state, setState] = useState<"idle" | "opening" | "error">("idle");
  useEffect(() => {
    if (loading || !user || done.current) return;
    done.current = true;
    const p = takePending();
    if (!p) return;
    setState("opening");
    checkout({ data: { product: p.product, returnPath: p.returnPath } })
      .then(({ url }) => { window.location.href = url; })
      .catch(() => setState("error"));
  }, [user, loading, checkout]);
  if (state === "opening") return <p role="status" className="pending-pay">Abriendo el pago seguro de Wompi…</p>;
  if (state === "error") return <p role="alert" className="pending-pay is-error">No se pudo abrir el pago. Vuelve al simulacro y pulsa «Pagar ahora».</p>;
  return null;
}

/** Columna de pago al lado del simulacro: planes del perfil con pago directo en Wompi. */
export function PaySidebar({ profile }: { profile: SimulationProfile }) {
  const { owned, level } = useMyPremium();
  const { pay, busy, error, signedIn } = useDirectPay();
  const mine = level(profile);
  const offers = offersFor(owned, profile);
  const returnPath = `/simulacros/${profile}`;
  return <aside className="pay-side" aria-labelledby="pay-side-title">
    <h2 id="pay-side-title"><CreditCard aria-hidden="true" /> Desbloquea {PROFILE_LABEL[profile]}</h2>
    <p className="pay-side-status">Tienes: <strong>{mine >= 4 ? "todos los niveles" : `nivel ${LEVELS[mine - 1]}${mine === 1 ? " (gratis)" : ""}`}</strong></p>
    {mine >= 4
      ? <p className="pay-side-done"><CheckCircle2 aria-hidden="true" /> Ya tienes acceso completo a este perfil.</p>
      : <ul className="pay-side-list">{offers.map(o => <li key={o.id}>
          <strong>{o.title.replace(` · ${PROFILE_LABEL[profile]}`, "")}</strong>
          <span className="pay-side-price">{cop(o.priceCOP!)}</span>
          <small>{o.description}</small>
          <Button disabled={busy !== null} onClick={() => pay(o.id, returnPath)}>{busy === o.id ? "Abriendo Wompi…" : "Pagar ahora"}</Button>
        </li>)}</ul>}
    {error && <p role="alert" className="text-destructive">{error}</p>}
    {!signedIn && mine < 4 && <p className="pay-side-note">Te pediremos ingresar para asociar el pago a tu cuenta; luego se abre Wompi. ¿No tienes cuenta? <Link to="/registro">Créala gratis</Link>.</p>}
    <p className="pay-side-note"><ShieldCheck aria-hidden="true" /> Pago único y seguro con Wompi: tarjeta, PSE, Nequi y más. Precios de lanzamiento para las primeras {LAUNCH_BUYERS} compras. <Link to="/terminos">Términos</Link>.</p>
  </aside>;
}

/** Pago directo desde la página de Planes: la persona elige el perfil y paga. */
export function PlanPayButton({ tier }: { tier: "intermedio" | "completo" | "directivo" }) {
  const { pay, busy, error } = useDirectPay();
  const [profile, setProfile] = useState<SimulationProfile>("ingreso-docente");
  const id = tier === "directivo" ? "directivo-completo" : `${tier}-${profile}`;
  const product = getProduct(id);
  if (!product || !purchasable(product)) return null;
  return <div className="plan-pay">
    {tier !== "directivo" && <label>Perfil
      <select value={profile} onChange={e => setProfile(e.target.value as SimulationProfile)}>
        {PROFILES.map(p => <option key={p} value={p}>{PROFILE_LABEL[p]}</option>)}
      </select></label>}
    <Button disabled={busy !== null} onClick={() => pay(id, "/planes")}><CreditCard aria-hidden="true" /> {busy === id ? "Abriendo Wompi…" : `Pagar ahora · ${cop(product.priceCOP!)}`}</Button>
    {error && <p role="alert" className="text-destructive">{error}</p>}
  </div>;
}
