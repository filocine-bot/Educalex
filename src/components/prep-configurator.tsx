import { Fold } from "@/components/fold";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Bot, Calculator, ChartNoAxesCombined, CheckCircle2, Clock3, Compass, GraduationCap, HeartHandshake, LayoutList, Lock, PenLine, Play, Scale, Settings, Sparkles, Trophy, Users, type LucideIcon } from "lucide-react";
import { ProfilePayButton, useDirectPay } from "@/components/direct-pay";
import { PracticeGame } from "@/components/practice-game";
import { ProfileStructure } from "@/components/profile-structure";
import { AREA_GROUP_LABEL, AREA_TESTS, blocksOf, examComponents, GROUP_LABEL } from "@/lib/exam-components";
import { BlockQuiz } from "@/components/exam-board";
import { useMyPremium } from "@/components/premium-purchase";
import { dilemmas } from "@/lib/dilemmas";
import { getProduct, PROFILE_LABEL } from "@/lib/payments";
import type { PracticeQuestion, SimulationProfile } from "@/lib/simulation-bank";

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
          <strong>Acceso completo</strong><span>Simulacro por componentes y con tiempo</span><em>{owned ? "Ya es tuyo" : cop(priceOf(profile))}</em>
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

/** Página de perfil: pestañas «Prueba gratis» y «Estructura de la prueba»; al final, las competencias con candado y el pago. */
export function ProfileHome({ profile }: { profile: SimulationProfile }) {
  const [tab, setTab] = useState<"prueba" | "estructura" | "areas">("prueba");
  const hasAreas = AREA_TESTS[profile].length > 0;
  const show = (t: "prueba" | "estructura" | "areas") => { setTab(t); requestAnimationFrame(() => document.getElementById("perfil-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  return <>
    <div id="perfil-tabs" className="prof-tabs" role="tablist" aria-label="Contenido del perfil">
      <button type="button" role="tab" aria-selected={tab === "prueba"} className={tab === "prueba" ? "active" : ""} onClick={() => show("prueba")}><Play aria-hidden="true" /> Prueba gratis</button>
      <button type="button" role="tab" aria-selected={tab === "estructura"} className={tab === "estructura" ? "active" : ""} onClick={() => show("estructura")}><LayoutList aria-hidden="true" /> Estructura de la prueba</button>
      {hasAreas && <button type="button" role="tab" aria-selected={tab === "areas"} className={tab === "areas" ? "active" : ""} onClick={() => show("areas")}><Calculator aria-hidden="true" /> Pruebas por área</button>}
    </div>
    <div role="tabpanel">
      {tab === "areas" ? <AreaTests profile={profile} /> : tab === "prueba"
        ? <section className="trial-game" aria-label="Prueba gratis"><PracticeGame profile={profile} trialOnly /></section>
        : <><ProfileStructure profile={profile} /><button type="button" className="h2-btn h2-btn-gold pst-back" onClick={() => show("prueba")}><Play aria-hidden="true" /> Iniciar prueba gratis</button></>}
    </div>
    <CompetencyLocks profile={profile} />
    <Fold title="Ejemplos de práctica"><section className="trial-examples" aria-labelledby="trial-ex-title">
      <h2 id="trial-ex-title">Ejemplos de práctica</h2>
      <div className="trial-ex-grid">
        <Link to="/formacion/ruta-atencion-integral" className="trial-ex"><span><Scale aria-hidden="true" /></span><strong>Ruta de Atención Integral</strong><small>Clasifica situaciones tipo I, II y III con casos escolares.</small></Link>
        <Link to="/formacion/dilemas-educativos" className="trial-ex"><span><Compass aria-hidden="true" /></span><strong>Dilemas educativos</strong><small>{dilemmas.length} casos: decide y mira las consecuencias de cada opción.</small></Link>
      </div>
    </section></Fold>
  </>;
}

const TILE_ICON: Record<string, LucideIcon> = { matematicas: Calculator, lectura: BookOpen, cuantitativo: Calculator, blandas: Users, ensenar: GraduationCap, evaluar: PenLine, incluir: HeartHandshake, convivencia: Scale, academica: GraduationCap, acompanamiento: HeartHandshake, directiva: Users, administrativa: Calculator, practica: GraduationCap, reflexion: PenLine, carrera: Scale };

/** Competencias que evalúa la preparación completa: con candado hasta pagar; con el pago, enlazan al simulacro. */
function CompetencyLocks({ profile }: { profile: SimulationProfile }) {
  const { level } = useMyPremium();
  const owned = level(profile) >= 3;
  const comps = examComponents(profile);
  const labels = GROUP_LABEL[profile];
  const groups = [
    { label: labels.comunes, items: comps.filter(c => c.group === "comunes") },
    { label: labels.propio, items: comps.filter(c => c.group === "pedagogicas") },
    { label: AREA_GROUP_LABEL, items: comps.filter(c => c.group === "areas") },
  ].filter(g => g.items.length > 0);
  const tile = (key: string, Icon: LucideIcon, title: string, sub: string, tone: string) => {
    const inner = <><Icon aria-hidden="true" /><strong>{title}</strong><small>{sub}</small>{!owned && <Lock className="exam-lock" aria-label="Se habilita con el pago" />}</>;
    return owned
      ? <Link key={key} to={SIM_PATH[profile]} className={`exam-tile tone-${tone}`}>{inner}</Link>
      : <div key={key} className={`exam-tile tone-${tone} is-locked`}>{inner}</div>;
  };
  return <section className="comp-locks" aria-labelledby="comp-locks-title">
    <h2 id="comp-locks-title">{owned ? "Tu preparación completa" : "Pasa al siguiente nivel: competencias que se evaluarán"}</h2>
    <p>{owned ? "Elige un componente y practica en bloques de 10 preguntas." : "Organizadas como la prueba, en bloques de 10 preguntas. Se habilitan cuando pagas."}</p>
    {groups.map(g => <div key={g.label}>
      <h3 className="exam-group">{g.label}</h3>
      <div className="exam-grid">{g.items.map(c => { const n = blocksOf(c).length; return tile(c.id, TILE_ICON[c.id] ?? BookOpen, c.title, `${c.questions.length} preguntas · ${n} ${n === 1 ? "bloque" : "bloques"}`, c.group); })}</div>
    </div>)}
    <h3 className="exam-group">Prueba completa</h3>
    <div className="exam-grid">{tile("timed", Clock3, "Simulacro con tiempo", "40 preguntas, como el examen", "timed")}</div>
    {owned
      ? <Link to={SIM_PATH[profile]} className="h2-btn h2-btn-gold comp-locks-go">Ir a mi simulacro <ArrowRight aria-hidden="true" /></Link>
      : <div className="trial-paybar comp-locks-pay"><p><strong>Preparación completa · {cop(priceOf(profile))}</strong><span>Pago único. Al pagar te llega al correo el enlace que activa tu simulacro.</span></p><ProfilePayButton profile={profile} className="h2-btn h2-btn-gold" /></div>}
  </section>;
}

/** Pruebas por área: una pestaña por área lista; al pulsarla se abre el primer bloque (gratis). Los demás bloques van con la preparación completa. */
function AreaTests({ profile }: { profile: SimulationProfile }) {
  const areas = AREA_TESTS[profile];
  const [sel, setSel] = useState(areas[0]!.id);
  const [round, setRound] = useState(0);
  const [review, setReview] = useState<PracticeQuestion[] | null>(null);
  const { level } = useMyPremium();
  const owned = level(profile) >= 3;
  const area = areas.find(a => a.id === sel) ?? areas[0]!;
  const blocks = blocksOf(area);
  const rest = area.questions.length - blocks[0]!.questions.length;
  const restart = () => { setReview(null); setRound(r => r + 1); };
  const open = (id: string) => { setSel(id); restart(); };
  return <section className="area-tests" aria-label="Pruebas por área">
    <div className="area-tabs" role="tablist" aria-label="Áreas disciplinares">
      {areas.map(a => <button key={a.id} type="button" role="tab" aria-selected={a.id === sel} className={a.id === sel ? "active" : ""} onClick={() => open(a.id)}>{a.title}</button>)}
    </div>
    <p className="area-note"><strong>{area.title}:</strong> {area.questions.length} preguntas en {blocks.length} bloques. El bloque 1 es gratis. Referencia: ejes de la guía CNSC–ICFES anterior y Estándares del MEN, mientras el ICFES publica los ejes 2026.</p>
    <BlockQuiz key={`${sel}-${round}-${review ? "r" : "n"}`} title={`${area.title} · Bloque 1 (gratis)`} questions={review ?? blocks[0]!.questions} review={!!review}
      onFinish={() => {}} onReview={wrong => setReview(wrong)} onRepeat={restart} onExit={restart} />
    {rest > 0 && <div className="area-more">
      <Lock aria-hidden="true" /><p><strong>{rest} preguntas más de {area.title}</strong><span>{owned ? "Están en tu simulacro, en «Pruebas por área disciplinar»." : "Se habilitan con la preparación completa, junto con las demás competencias."}</span></p>
      {owned && <Link to={SIM_PATH[profile]} className="h2-btn h2-btn-gold">Continuar <ArrowRight aria-hidden="true" /></Link>}
    </div>}
  </section>;
}
