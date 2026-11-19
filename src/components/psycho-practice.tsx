import { useState } from "react";
import { Brain, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DIMENSIONS, psychoItems, psychoProfile } from "@/lib/psicotecnica";

/** Ejercicio para conocer la prueba psicotécnica: sin respuestas correctas ni puntaje, con un perfil de reflexión. */
export function PsychoPractice() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => psychoItems.map(() => null));
  const [done, setDone] = useState(false);
  const answered = answers.filter(a => a !== null).length;
  if (done) {
    const profile = psychoProfile(answers);
    const max = Math.max(1, ...profile.map(p => p.count));
    return <section className="psycho" aria-labelledby="psycho-result">
      <h2 id="psycho-result"><Brain aria-hidden="true" /> Tu perfil de tendencias</h2>
      <p className="game-hint">No es un puntaje ni una predicción del resultado oficial: muestra hacia dónde tendieron tus decisiones en estas {psychoItems.length} situaciones.</p>
      <ul className="psycho-bars">{profile.map(p => <li key={p.dimension}><div className="psycho-bar-head"><strong>{DIMENSIONS[p.dimension].name}</strong><span>{p.count}</span></div><div className="psycho-bar"><span style={{ width: `${(p.count / max) * 100}%` }} /></div>{p.count > 0 && <p>{DIMENSIONS[p.dimension].description}</p>}</li>)}</ul>
      <div className="psycho-tips"><h3>Para reflexionar</h3><ul>
        <li>Un buen desempeño docente combina todas estas tendencias; ninguna es «la correcta» por sí sola.</li>
        <li>Si alguna dimensión quedó en cero o muy baja, piensa en situaciones reales en las que te haría falta.</li>
        <li>En la prueba real responde con sinceridad y coherencia: busca conocer cómo actúas, no lo que crees que quieren leer.</li>
      </ul></div>
      <Button variant="outline" onClick={() => { setAnswers(psychoItems.map(() => null)); setDone(false); }}><RotateCcw aria-hidden="true" /> Hacer el ejercicio de nuevo</Button>
    </section>;
  }
  return <section className="psycho" aria-labelledby="psycho-title">
    <h2 id="psycho-title"><Brain aria-hidden="true" /> Conoce la prueba psicotécnica</h2>
    <div className="psycho-intro">
      <p><strong>Qué es:</strong> en el concurso de la CNSC es una prueba <strong>clasificatoria</strong> (suma puntaje, no elimina) que valora actitudes, habilidades, motivaciones e intereses profesionales relacionados con el cargo.</p>
      <p><strong>Este ejercicio:</strong> {psychoItems.length} situaciones con cuatro actuaciones razonables. <strong>No hay respuestas correctas</strong>: elige la que más se parece a lo que harías. Al final verás tus tendencias, sin puntaje.</p>
      <p className="competency-sources">Ejercicio original de familiarización. El formato y la calificación oficiales los define el Anexo Técnico de cada convocatoria.</p>
    </div>
    <ol className="psycho-items">{psychoItems.map((item, i) => <li key={item.id}><fieldset><legend><span className="course-kicker">Situación {i + 1}</span> {item.situation}</legend>
      {item.options.map((o, j) => <label key={j} className="practice-option" data-selected={answers[i] === j}><input type="radio" name={item.id} checked={answers[i] === j} onChange={() => setAnswers(prev => prev.map((a, k) => k === i ? j : a))} /><span>{o.text}</span></label>)}
    </fieldset></li>)}</ol>
    <p className="game-hint">{answered} de {psychoItems.length} situaciones respondidas.</p>
    <Button variant="navy" disabled={answered < psychoItems.length} onClick={() => setDone(true)}>Ver mi perfil</Button>
  </section>;
}
