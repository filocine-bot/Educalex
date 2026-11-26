import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account-session";
import { useMyPremium } from "@/components/premium-purchase";
import { startCheckout, startDirectCheckout } from "@/lib/payments.functions";
import { DIRECTIVE_PROFILES, getProduct, LAUNCH_BUYERS, offersFor, PROFILE_LABEL, purchasable, TEACHER_PROFILES } from "@/lib/payments";
import type { SimulationProfile } from "@/lib/simulation-bank";

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
export const PAY_NOTE = "No necesitas registrarte: paga en Wompi y escribe allí tu correo. Con ese correo se crea tu acceso y entras al volver. Al pagar aceptas la política de datos y los términos.";
const PENDING_KEY = "educalex-compra-pendiente";
const PENDING_MAX_MS = 30 * 60 * 1000;

type Pending = { product: string; returnPath: string; at: number };

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

/** Abre Wompi de inmediato. Sin sesión, el correo se escribe en Wompi y la cuenta se crea al aprobarse el pago. */
export function useDirectPay() {
  const { user } = useAccount();
  const checkout = useServerFn(startCheckout);
  const direct = useServerFn(startDirectCheckout);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  async function pay(product: string, returnPath: string) {
    setError("");
    setBusy(product);
    try { const { url } = await (user ? checkout : direct)({ data: { product, returnPath } }); window.location.href = url; }
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
    <p className="pay-side-status">Tienes: <strong>{mine >= 3 ? "el simulacro completo" : "la prueba gratis (10 preguntas)"}</strong></p>
    {mine >= 3
      ? <p className="pay-side-done"><CheckCircle2 aria-hidden="true" /> Ya tienes acceso completo a este perfil.</p>
      : <ul className="pay-side-list">{offers.map(o => <li key={o.id}>
          <strong>Acceso completo</strong>
          <span className="pay-side-price">{cop(o.priceCOP!)}</span>
          <small>{o.description}</small>
          <Button disabled={busy !== null} onClick={() => pay(o.id, returnPath)}>{busy === o.id ? "Abriendo Wompi…" : "Pagar ahora"}</Button>
        </li>)}</ul>}
    {error && <p role="alert" className="text-destructive">{error}</p>}
    {!signedIn && mine < 3 && <p className="pay-side-note">{PAY_NOTE}</p>}
    <p className="pay-side-note"><ShieldCheck aria-hidden="true" /> Pago único y seguro con Wompi: tarjeta, PSE, Nequi y más. Precios de lanzamiento para las primeras {LAUNCH_BUYERS} compras. <Link to="/terminos">Términos</Link>.</p>
  </aside>;
}

/** Pago directo desde la página de Planes: la persona elige el perfil y paga. */
export function PlanPayButton({ tier }: { tier: "docente" | "directivo" }) {
  const { pay, busy, error } = useDirectPay();
  const options = tier === "directivo" ? DIRECTIVE_PROFILES : TEACHER_PROFILES;
  const [profile, setProfile] = useState<SimulationProfile>(options[0]!);
  const id = `completo-${profile}`;
  const product = getProduct(id);
  if (!product || !purchasable(product)) return null;
  return <div className="plan-pay">
    <label>Perfil
      <select value={profile} onChange={e => setProfile(e.target.value as SimulationProfile)}>
        {options.map(p => <option key={p} value={p}>{PROFILE_LABEL[p]}</option>)}
      </select></label>
    <Button disabled={busy !== null} onClick={() => pay(id, "/planes")}><CreditCard aria-hidden="true" /> {busy === id ? "Abriendo Wompi…" : `Pagar ahora · ${cop(product.priceCOP!)}`}</Button>
    {error && <p role="alert" className="text-destructive">{error}</p>}
  </div>;
}

const SIM_PATH = { "ingreso-docente": "/simulacros/ingreso-docente", "ascenso-reubicacion": "/simulacros/ascenso-reubicacion", rector: "/simulacros/rector", coordinador: "/simulacros/coordinador" } as const;

/** Botón «Pagar» del acceso completo de un perfil (o «Ir al simulacro» si ya lo tiene). */
export function ProfilePayButton({ profile, className }: { profile: SimulationProfile; className?: string }) {
  const { level } = useMyPremium();
  const { pay, busy, error } = useDirectPay();
  const id = `completo-${profile}`;
  const product = getProduct(id);
  if (level(profile) >= 3) return <Link to={SIM_PATH[profile]} className={className}>Simulacro completo <CheckCircle2 aria-hidden="true" /></Link>;
  if (!product || !purchasable(product)) return null;
  return <>
    <button type="button" className={className} disabled={busy !== null} onClick={() => pay(id, SIM_PATH[profile])}>
      <CreditCard aria-hidden="true" /> {busy ? "Abriendo Wompi…" : `Pagar ${cop(product.priceCOP!)}`}
    </button>
    {error && <span role="alert" className="text-destructive">{error}</span>}
  </>;
}

/** Inicio de cada perfil en Concursos: prueba gratis y pago, antes de cualquier otra información. */
export function ProfileStart({ profile }: { profile: SimulationProfile }) {
  return <section className="profile-start" aria-labelledby="profile-start-title">
    <div>
      <h2 id="profile-start-title">Empieza tu preparación · {PROFILE_LABEL[profile]}</h2>
      <p>Haz gratis las primeras 10 preguntas. Con un solo pago abres el simulacro completo por componentes, el simulacro con tiempo y el refuerzo de tus temas.</p>
    </div>
    <div className="profile-start-actions">
      <Link to={SIM_PATH[profile]} className="ps-free">Prueba gratis · 10 preguntas</Link>
      <ProfilePayButton profile={profile} className="ps-pay" />
    </div>
  </section>;
}
