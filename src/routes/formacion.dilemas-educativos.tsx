import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, RotateCcw, Scale } from "lucide-react";
import { ModulePage } from "@/components/module-page";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { dilemmas } from "@/lib/dilemmas";

const page = pages["/formacion/dilemas-educativos"];
export const Route = createFileRoute("/formacion/dilemas-educativos")({ head: () => pageHead(page.title, page.description), component: DilemmasPage });

function DilemmasPage() {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<(number | null)[]>(() => dilemmas.map(() => null));
  const d = dilemmas[index]!;
  const chosen = choices[index] ?? null;
  const done = choices.filter(c => c !== null).length;
  const choose = (i: number) => setChoices(prev => prev.map((c, k) => (k === index ? i : c)));
  return <ModulePage path="/formacion/dilemas-educativos" showItems={false} tight>
    <nav className="dilemma-nav" aria-label="Dilemas">{dilemmas.map((x, i) => <button key={x.id} type="button" className={i === index ? "active" : choices[i] !== null ? "done" : ""} aria-current={i === index ? "step" : undefined} onClick={() => setIndex(i)}><span>{i + 1}</span>{x.title}</button>)}</nav>
    <p className="game-hint">{done} de {dilemmas.length} dilemas resueltos. No hay una única respuesta correcta: cada decisión prioriza valores distintos. Al decidir verás sus consecuencias y lo que orienta la norma.</p>
    <article className="dilemma" aria-labelledby="dilemma-title">
      <span className="course-kicker">{d.area}</span>
      <h2 id="dilemma-title">{d.title}</h2>
      <p className="question-context"><strong>Situación:</strong> {d.situation}</p>
      <h3 className="dilemma-question">{d.question}</h3>
      <div className="dilemma-options">{d.options.map((o, i) => <button key={i} type="button" className={`dilemma-option ${chosen === null ? "" : chosen === i ? "is-chosen" : "is-other"}`} onClick={() => choose(i)} aria-pressed={chosen === i}><strong>{"ABC"[i]}</strong><span>{o.text}</span></button>)}</div>
      {chosen !== null && <div className="dilemma-result" role="status">
        <section className="dilemma-card"><h4><Compass aria-hidden="true" /> Tu decisión</h4><p><strong>Prioriza:</strong> {d.options[chosen]!.prioritizes}</p><p><strong>Consecuencias posibles:</strong> {d.options[chosen]!.consequence}</p></section>
        <details className="dilemma-others"><summary>Ver las otras decisiones y sus consecuencias</summary>{d.options.map((o, i) => i === chosen ? null : <div key={i}><p><strong>{"ABC"[i]}.</strong> {o.text}</p><p><em>Prioriza:</em> {o.prioritizes}</p><p><em>Consecuencias:</em> {o.consequence}</p></div>)}</details>
        <section className="dilemma-card dilemma-norm"><h4><Scale aria-hidden="true" /> Lo que orienta la norma</h4><p>{d.orientation}</p><ul>{d.norms.map(n => <li key={n}>{n}</li>)}</ul></section>
        <section className="dilemma-card"><h4>Para reflexionar</h4><ul>{d.reflection.map(r => <li key={r}>{r}</li>)}</ul></section>
        <div className="practice-actions">
          <Button variant="outline" onClick={() => setChoices(prev => prev.map((c, k) => (k === index ? null : c)))}><RotateCcw aria-hidden="true" /> Decidir de nuevo</Button>
          {index + 1 < dilemmas.length && <Button variant="navy" onClick={() => setIndex(index + 1)}>Siguiente dilema <ArrowRight aria-hidden="true" /></Button>}
        </div>
      </div>}
    </article>
    <p className="competency-sources">Dilemas originales EDUCALEX con fines formativos. Las orientaciones citan normas de la biblioteca; ante un caso real, sigue los protocolos de tu institución.</p>
  </ModulePage>;
}
