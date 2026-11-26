import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bot, ChartNoAxesCombined, CheckCircle2, Compass, Play, Scale, Settings, Sparkles, Trophy, Users } from "lucide-react";
import { ProfilePayButton, useDirectPay } from "@/components/direct-pay";
import { PracticeGame } from "@/components/practice-game";
import { useMyPremium } from "@/components/premium-purchase";
import { dilemmas } from "@/lib/dilemmas";
import { getProduct, PROFILE_LABEL } from "@/lib/payments";
import type { SimulationProfile } from "@/lib/simulation-bank";

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export const PROFILE_CARDS = [
  { profile: "ingreso-docente", title: "Ingreso a la Carrera Docente", icon: Trophy, tone: "blue", sim: "/simulacros/ingreso-docente" },
  { profile: "ascenso-reubicacion", title: "Ascenso y Reubicación Salarial", icon: ChartNoAxesCombined, tone: "green", sim: "/simulacros/ascenso-reubicacion" },
  { profile: "rector", title: "Concurso para Rector", icon: Users, tone: "gold", sim: "/simulacros/rector" },
  { profile: "coordinador", title: "Concurso para Coordinador", icon: Settings, tone: "red", sim: "/simulacros/coordinador" },
] as const;
type Card = (typeof PROFILE_CARDS)[number];
const SIM_PATH: Record<SimulationProfile, "/simulacros/ingreso-docente" | "/simulacros/ascenso-reubicacion" | "/simulacros/coordinador" | "/simulacros/rector"> = { "ingreso-docente": "/simulacros/ingreso-docente", "ascenso-reubicacion": "/simulacros/ascenso-reubicacion", coordinador: "/simulacros/coordinador", rector: "/simulacros/rector" };
const priceOf = (p: SimulationProfile) => getProduct(`completo-${p}`)?.priceCOP ?? 0;

/**
 * «Arma tu preparación»: 1) perfil, 2) cómo empezar (gratis o acceso completo) y una barra con el total
 * y un botón que lleva al simulacro gratis o abre Wompi. Con `profile` fijo se omite el paso 1.
 */
export function PrepConfigurator({ profile: fixed, title }: { profile?: SimulationProfile; title?: string }) {
  const [profile, setProfile] = useState<SimulationProfile>(fixed ?? "ingreso-docente");
  const [mode, setMode] = useState<"gratis" | "completo">("completo");
  const { level } = useMyPremium();
  const { pay, busy, error } = useDirectPay();
  const navigate = useNavigate();
  const card = PROFILE_CARDS.find(c => c.profile === profile) as Card;
  const owned = level(profile) >= 3;
  const total = mode === "gratis" || owned ? 0 : priceOf(profile);
  const step = fixed ? 1 : 2;

  function go() {
    if (mode === "gratis" || owned) { void navigate({ to: card.sim }); return; }
    void pay(`completo-${profile}`, card.sim);
  }

  return <div className="cfg">
    {title && <p className="cfg-title"><Sparkles aria-hidden="true" /> {title}</p>}
    {!fixed && <fieldset className="cfg-group">
      <legend className="cfg-step"><span>1</span> Elige tu perfil</legend>
      <div className="cfg-profiles">{PROFILE_CARDS.map(c => <label key={c.profile} className={`cfg-profile hx-tone-${c.tone} ${profile === c.profile ? "is-on" : ""}`}>
        <input type="radio" name="cfg-profile" value={c.profile} checked={profile === c.profile} onChange={() => setProfile(c.profile)} />
        <span className="cfg-profile-icon"><c.icon aria-hidden="true" /></span>
        <span className="cfg-profile-name">{c.title}</span>
        <span className="cfg-profile-price">{level(c.profile) >= 3 ? "Ya es tuyo" : cop(priceOf(c.profile))}</span>
      </label>)}</div>
    </fieldset>}
    <fieldset className="cfg-group">
      <legend className="cfg-step"><span>{step}</span> ¿Cómo quieres empezar?</legend>
      <div className="cfg-modes">
        <label className={`cfg-mode ${mode === "gratis" ? "is-on" : ""}`}>
          <input type="radio" name={`cfg-mode-${fixed ?? "home"}`} value="gratis" checked={mode === "gratis"} onChange={() => setMode("gratis")} />
          <strong>Prueba gratis</strong><span>10 preguntas del nivel Básico, sin tarjeta</span><em>$0</em>
        </label>
        <label className={`cfg-mode ${mode === "completo" ? "is-on" : ""}`}>
          <input type="radio" name={`cfg-mode-${fixed ?? "home"}`} value="completo" checked={mode === "completo"} onChange={() => setMode("completo")} />
          <strong>Acceso completo</strong><span>100 preguntas por niveles y núcleo común</span><em>{owned ? "Ya es tuyo" : cop(priceOf(profile))}</em>
        </label>
      </div>
    </fieldset>
    {fixed && <ul className="cfg-includes">
      <li><CheckCircle2 aria-hidden="true" /> Explicación y norma en cada respuesta</li>
      <li><CheckCircle2 aria-hidden="true" /> Pago único con Wompi, sin suscripción</li>
    </ul>}
    <button type="button" className="cfg-total" onClick={go} disabled={busy !== null}>
      <span className="cfg-total-amount"><small>Tu preparación · {PROFILE_LABEL[profile]}</small><strong>{total ? cop(total) : "Gratis"}</strong></span>
      <span className="cfg-total-cta">{busy ? "Abriendo Wompi…" : mode === "gratis" || owned ? "Empezar ahora" : "Quiero empezar mi preparación"} <ArrowRight aria-hidden="true" /></span>
    </button>
    {error && <p role="alert" className="text-destructive">{error}</p>}
  </div>;
}

/** Herramientas gratuitas de cada perfil (antes estaban en la portada). */
export function FreeTools({ profile }: { profile: SimulationProfile }) {
  const card = PROFILE_CARDS.find(c => c.profile === profile) as Card;
  const tools = [
    { to: card.sim, icon: Play, tag: "10 preguntas", title: "Simulacro nivel Básico", text: "Mide tu punto de partida con preguntas tipo ICFES.", tone: "blue" },
    { to: "/formacion/ruta-atencion-integral", icon: Scale, tag: "6 casos", title: "Ruta de Atención Integral", text: "Clasifica situaciones tipo I, II y III.", tone: "red" },
    { to: "/formacion/dilemas-educativos", icon: Compass, tag: `${dilemmas.length} dilemas`, title: "Dilemas educativos", text: "Decide y mira las consecuencias de cada opción.", tone: "green" },
    { to: "/docente-ia", icon: Bot, tag: "Con voz", title: "Pregúntale a EducatIA", text: "Resuelve dudas de normas y pedagogía.", tone: "gold" },
  ];
  return <section className="hx-try free-tools" aria-labelledby="free-tools-title">
    <div className="hx-section-head"><Sparkles className="text-gold" aria-hidden="true" /><div><h2 id="free-tools-title">Empieza hoy, sin pagar</h2><p>Herramientas interactivas abiertas para este perfil.</p></div></div>
    <div className="hx-try-grid">{tools.map(t => <Link key={t.title} to={t.to} className={`hx-try-item hx-tone-${t.tone}`}><span className="hx-try-icon"><t.icon aria-hidden="true" /></span><span className="hx-try-tag">{t.tag}</span><strong>{t.title}</strong><span>{t.text}</span><span className="hx-try-go">Empezar <ArrowRight aria-hidden="true" /></span></Link>)}</div>
  </section>;
}

/** Inicio de cada perfil en Concursos: arma tu preparación y herramientas gratuitas. */
/** Página de perfil: solo la prueba gratis activa; al terminarla aparece el pago y, con el pago, la preparación completa. */
export function ProfileHome({ profile }: { profile: SimulationProfile }) {
  const { level } = useMyPremium();
  const owned = level(profile) >= 3;
  return <>
    <section className="trial-game" aria-label="Prueba gratis">
      <PracticeGame profile={profile} trialOnly intro={owned
      ? <Link to={SIM_PATH[profile]} className="h2-btn h2-btn-gold trial-owned">Ya tienes la preparación completa: ir a mis simulacros <ArrowRight aria-hidden="true" /></Link>
      : <div className="trial-paybar"><p><strong>Preparación completa · {cop(priceOf(profile))}</strong><span>Pago único. Al pagar te llega al correo el enlace que activa tu simulacro.</span></p><ProfilePayButton profile={profile} className="h2-btn h2-btn-gold" /></div>} />
    </section>
    <section className="trial-examples" aria-labelledby="trial-ex-title">
      <h2 id="trial-ex-title">Ejemplos de práctica</h2>
      <div className="trial-ex-grid">
        <Link to="/formacion/ruta-atencion-integral" className="trial-ex"><span><Scale aria-hidden="true" /></span><strong>Ruta de Atención Integral</strong><small>Clasifica situaciones tipo I, II y III con casos escolares.</small></Link>
        <Link to="/formacion/dilemas-educativos" className="trial-ex"><span><Compass aria-hidden="true" /></span><strong>Dilemas educativos</strong><small>{dilemmas.length} casos: decide y mira las consecuencias de cada opción.</small></Link>
      </div>
    </section>
  </>;
}
