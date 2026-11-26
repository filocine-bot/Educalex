import { ClipboardCheck, CreditCard, GraduationCap, Play, Trophy } from "lucide-react";
import { openTutorial } from "@/components/tutorial-modal";

/** Sección de bienvenida de la portada: invita a ver el tutorial de seis pasos en una ventana emergente. */
export function HowItWorks() {
  const steps = [
    { icon: ClipboardCheck, text: "Elige tu simulacro" },
    { icon: CreditCard, text: "Haz tu compra" },
    { icon: Trophy, text: "Empieza a entrenar" },
  ];
  return <section className="hiw" aria-labelledby="hiw-title">
    <div className="site-container hiw-inner">
      <span className="hiw-badge" aria-hidden="true"><GraduationCap /></span>
      <div className="hiw-text">
        <h2 id="hiw-title">¡Tu camino al éxito docente comienza aquí!</h2>
        <p>Descubre cómo prepararte con EDUCALEX. Aprende a elegir tu simulacro, realizar tu compra y acceder a tu entrenamiento en solo 6 pasos.</p>
        <ul className="hiw-steps">{steps.map(s => <li key={s.text}><s.icon aria-hidden="true" />{s.text}</li>)}</ul>
      </div>
      <button type="button" className="h2-btn h2-btn-gold hiw-cta" onClick={openTutorial}><Play aria-hidden="true" /> Descubre cómo funciona</button>
    </div>
  </section>;
}
