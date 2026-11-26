import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bot, ClipboardCheck, CreditCard, KeyRound, ListChecks, Trophy, type LucideIcon } from "lucide-react";

type Step = { icon: LucideIcon; tone: string; title: string; body: ReactNode; demo: ReactNode; action?: { to: string; label: string } };

const steps: Step[] = [
  {
    icon: ClipboardCheck, tone: "blue", title: "Elige tu perfil y toca «Prueba gratis»",
    body: <>En la portada elige tu perfil y toca <strong>«Prueba gratis»</strong>. El test empieza de inmediato: <strong>10 preguntas</strong> con su explicación y la norma que la sustenta. No necesitas cuenta.</>,
    demo: <div className="tour-mock"><strong>Ingreso a la carrera docente</strong><span className="tour-btn">▶ Prueba gratis</span></div>,
    action: { to: "/", label: "Ir a la portada" },
  },
  {
    icon: Trophy, tone: "green", title: "Mira tu resultado y qué reforzar",
    body: <>Al terminar ves <strong>tu resultado</strong> y los <strong>temas que debes reforzar</strong>. Puedes repasar tus errores o repetir la prueba.</>,
    demo: <div className="tour-mock"><strong>Tu resultado: 7 de 10</strong><small>Temas que debes reforzar</small><span className="tour-level">Inclusión (1)</span><span className="tour-level">Evaluación (1)</span></div>,
  },
  {
    icon: ListChecks, tone: "gold", title: "Conoce la estructura de la prueba",
    body: <>En tu perfil toca <strong>«Estructura de la prueba»</strong>: verás las etapas, los componentes que se evalúan y el puntaje mínimo de tu cargo.</>,
    demo: <div className="tour-mock"><span className="tour-level ok">1 · Prueba de aptitudes y competencias</span><span className="tour-level">2 · Psicotécnica</span><span className="tour-level">3 · Antecedentes y entrevista</span></div>,
  },
  {
    icon: CreditCard, tone: "red", title: "Pasa al siguiente nivel con un solo pago",
    body: <>Debajo de la prueba ves las competencias con candado. Toca <strong>«Pagar»</strong>: en <strong>Wompi</strong> escribe <strong>tu correo</strong> y te llega un enlace que activa tu simulacro. Sin contraseñas. Docentes $59.900 · Directivos $79.900. Pago único.</>,
    demo: <div className="tour-mock"><strong>Preparación completa · Coordinador</strong><span className="tour-price">$79.900</span><span className="tour-btn">Pagar</span></div>,
    action: { to: "/planes", label: "Ver qué incluye" },
  },
  {
    icon: KeyRound, tone: "purple", title: "Practica por componentes",
    body: <>Con el pago se abren el <strong>simulacro por componentes</strong> de la prueba, en <strong>bloques de 10 preguntas</strong> (3 intentos por bloque), y el <strong>simulacro con tiempo</strong> de 40 preguntas, con retroalimentación y refuerzo de tus temas. Para volver otro día: <strong>Ingresar</strong> → tu correo → toca el enlace.</>,
    demo: <div className="tour-mock"><span className="tour-level ok">Lectura crítica · Bloque 1 <b>Empezar</b></span><small>Intentos 0 de 3</small><span className="tour-level ok">Simulacro con tiempo · 40</span></div>,
  },
  {
    icon: Bot, tone: "teal", title: "Estudia gratis y pregunta a EducatIA",
    body: <>En <strong>Normatividad</strong> cada norma está resumida, con su aplicación en contextos educativos y la ficha para descargar en PDF. Practica con <strong>estudios de caso</strong> (Ruta de Atención Integral y dilemas) y pregúntale a <strong>EducatIA</strong>, que responde con voz.</>,
    demo: <div className="tour-mock tour-chat"><span className="tour-q">¿Qué dice el Decreto 1278 sobre la evaluación?</span><span className="tour-a">El Decreto 1278 de 2002 establece… (Fuente: art. 26)</span></div>,
    action: { to: "/biblioteca", label: "Ir a Normatividad" },
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
        : <Link to="/" className="tour-next">¡Empezar ahora! <ArrowRight aria-hidden="true" /></Link>}
    </div>
    <button type="button" className="tour-link" onClick={() => setAll(true)}>Ver todos los pasos en una lista</button>
  </section>;
}
