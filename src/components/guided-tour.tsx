import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bot, ClipboardCheck, CreditCard, KeyRound, Mail, Trophy, type LucideIcon } from "lucide-react";

type Step = { icon: LucideIcon; tone: string; title: string; body: ReactNode; demo: ReactNode; action?: { to: string; label: string } };

const steps: Step[] = [
  {
    icon: Mail, tone: "blue", title: "Crea tu cuenta solo con tu correo",
    body: <>En <strong>Registro</strong> escribe tu correo, elige tu perfil y acepta la política de datos. <strong>No hay contraseñas.</strong></>,
    demo: <div className="tour-mock"><span className="tour-field">tucorreo@gmail.com</span><span className="tour-field">Ingreso a la carrera docente ▾</span><span className="tour-btn">Crear cuenta y recibir enlace</span></div>,
    action: { to: "/registro", label: "Crear mi cuenta" },
  },
  {
    icon: KeyRound, tone: "gold", title: "Toca el botón del correo y listo",
    body: <>Abre el correo de <strong>EDUCALEX</strong> y toca <strong>«Entrar a mi cuenta»</strong>: vuelves a la página con tu sesión abierta y tu simulacro listo. Para volver otro día: <strong>Ingresar</strong> → tu correo → toca el nuevo enlace.</>,
    demo: <div className="tour-mock tour-mail"><small>De: EDUCALEX &lt;acceso@educalex.co&gt;</small><strong>Tu acceso a EDUCALEX</strong><span className="tour-btn">Entrar a mi cuenta</span></div>,
    action: { to: "/ingresar", label: "Ir a Ingresar" },
  },
  {
    icon: ClipboardCheck, tone: "green", title: "Haz el simulacro gratis",
    body: <>En <strong>Simulacros</strong> elige tu perfil y juega el nivel <strong>Básico (10 preguntas)</strong>. Cada respuesta trae su explicación y la norma que la sustenta.</>,
    demo: <div className="tour-mock"><span className="tour-level ok">Nivel 1 · Básico · Gratis <b>Jugar</b></span><span className="tour-level lock">Nivel 2 · Intermedio · 40 🔒</span><span className="tour-level lock">Nivel 3 · Avanzado · 50 🔒</span></div>,
    action: { to: "/simulacros", label: "Ver simulacros" },
  },
  {
    icon: CreditCard, tone: "red", title: "Desbloquea todo con un solo pago",
    body: <>Pulsa <strong>«Pagar ahora»</strong>. En <strong>Wompi</strong> (tarjeta, PSE o Nequi) escribe tu nombre, <strong>tu correo</strong> y tu celular. Docentes $59.900 · Directivos $79.900. Pago único.</>,
    demo: <div className="tour-mock"><strong>Acceso completo · Coordinador</strong><span className="tour-price">$79.900</span><span className="tour-btn">Pagar ahora</span><small>Tarjeta · PSE · Nequi</small></div>,
    action: { to: "/planes", label: "Ver planes" },
  },
  {
    icon: Trophy, tone: "purple", title: "Practica los niveles pagados",
    body: <>Al aprobarse el pago vuelves con <strong>Intermedio (40)</strong> y <strong>Avanzado (50)</strong> abiertos. Cada nivel pagado se puede presentar <strong>3 veces</strong>. Tu cuenta es personal y funciona en <strong>3 dispositivos</strong>.</>,
    demo: <div className="tour-mock"><span className="tour-level ok">Nivel 2 · Intermedio <b>Jugar</b></span><small>Intentos usados: 0 de 3</small><span className="tour-level ok">Nivel 3 · Avanzado <b>Jugar</b></span></div>,
  },
  {
    icon: Bot, tone: "teal", title: "Estudia y pregunta a EducatIA",
    body: <>En <strong>Recursos</strong> tienes las normas con infografía, guías del MEN y videos. Si tienes una duda, pregúntale a <strong>EducatIA</strong>: responde con voz y cita la fuente.</>,
    demo: <div className="tour-mock tour-chat"><span className="tour-q">¿Qué dice el Decreto 1278 sobre la evaluación?</span><span className="tour-a">El Decreto 1278 de 2002 establece… (Fuente: art. 26)</span></div>,
    action: { to: "/docente-ia", label: "Abrir EducatIA" },
  },
];

/** Recorrido guiado paso a paso (uno a la vez), con opción de ver todos. */
export function GuidedTour() {
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);
  const s = steps[i]!;
  if (all) return <div className="tour">
    <ol className="tour-all">{steps.map((st, n) => <li key={st.title}><span className={`tour-ico tone-${st.tone}`}><st.icon aria-hidden="true" /></span><div><h2>{n + 1}. {st.title}</h2><p>{st.body}</p></div></li>)}</ol>
    <button type="button" className="tour-link" onClick={() => setAll(false)}>Ver como recorrido guiado</button>
  </div>;
  return <section className="tour" aria-roledescription="recorrido" aria-label="Cómo usar EDUCALEX">
    <div className="tour-head">
      <span className="tour-count">Paso {i + 1} de {steps.length}</span>
      <div className="tour-dots" role="tablist" aria-label="Pasos">{steps.map((st, n) => <button key={st.title} type="button" role="tab" aria-selected={n === i} aria-label={`Paso ${n + 1}: ${st.title}`} className={n === i ? "on" : n < i ? "done" : ""} onClick={() => setI(n)} />)}</div>
    </div>
    <div className="tour-card" key={i}>
      <div className="tour-text">
        <span className={`tour-ico tone-${s.tone}`}><s.icon aria-hidden="true" /></span>
        <h2 aria-live="polite">{s.title}</h2>
        <p>{s.body}</p>
        {s.action && <Link to={s.action.to} className="tour-action">{s.action.label} <ArrowRight aria-hidden="true" /></Link>}
      </div>
      <div className="tour-demo" aria-hidden="true">{s.demo}</div>
    </div>
    <div className="tour-nav">
      <button type="button" className="tour-prev" onClick={() => setI(i - 1)} disabled={i === 0}><ArrowLeft aria-hidden="true" /> Anterior</button>
      {i < steps.length - 1
        ? <button type="button" className="tour-next" onClick={() => setI(i + 1)}>Siguiente <ArrowRight aria-hidden="true" /></button>
        : <Link to="/registro" className="tour-next">¡Empezar ahora! <ArrowRight aria-hidden="true" /></Link>}
    </div>
    <button type="button" className="tour-link" onClick={() => setAll(true)}>Ver todos los pasos en una lista</button>
  </section>;
}
