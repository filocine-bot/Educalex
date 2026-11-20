import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, Scale } from "lucide-react";
import { ModulePage } from "@/components/module-page";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { classifyCases, otherEntities, routeComponents, situationTypes, type SituationType } from "@/lib/ruta-atencion";

const page = pages["/formacion/ruta-atencion-integral"];
export const Route = createFileRoute("/formacion/ruta-atencion-integral")({ head: () => pageHead(page.title, page.description), component: RutaPage });

const TYPES: SituationType[] = ["I", "II", "III"];

function RutaPage() {
  const [tab, setTab] = useState<SituationType>("I");
  const [answers, setAnswers] = useState<Record<string, SituationType | undefined>>({});
  const current = situationTypes.find(t => t.type === tab)!;
  const answered = classifyCases.filter(c => answers[c.id]).length;
  const right = classifyCases.filter(c => answers[c.id] === c.answer).length;
  return <ModulePage path="/formacion/ruta-atencion-integral" showItems={false} tight>
    <section className="ruta-block" aria-labelledby="ruta-componentes">
      <h2 id="ruta-componentes">1. Los cuatro componentes de la Ruta</h2>
      <ol className="ruta-components">{routeComponents.map((c, i) => <li key={c.id}><span className="ruta-step">{i + 1}</span><div><strong>{c.title}</strong><p>{c.text}</p><small>{c.source}</small></div></li>)}</ol>
    </section>

    <section className="ruta-block" aria-labelledby="ruta-protocolos">
      <h2 id="ruta-protocolos">2. Clasificación de situaciones y protocolos</h2>
      <div className="ruta-tabs" role="tablist" aria-label="Tipo de situación">{TYPES.map(t => <button key={t} type="button" role="tab" aria-selected={tab === t} className={`ruta-tab ruta-tab-${t}`} onClick={() => setTab(t)}>Tipo {t}</button>)}</div>
      <article className={`ruta-type ruta-type-${tab}`} role="tabpanel" aria-label={current.title}>
        <h3>{current.title}</h3>
        <p><strong>Cuándo es:</strong> {current.criterion}</p>
        <p className="info-small"><strong>Ejemplos:</strong> {current.examples}</p>
        <h4>Protocolo</h4>
        <ol className="ruta-protocol">{current.protocol.map(step => <li key={step}>{step}</li>)}</ol>
        <p className="competency-sources">Fuente: {current.source}</p>
      </article>
      <p className="ruta-entities"><Scale aria-hidden="true" /> <span><strong>Activación de otras entidades:</strong> {otherEntities.text} <small>({otherEntities.source})</small></span></p>
    </section>

    <section className="ruta-block" aria-labelledby="ruta-practica">
      <h2 id="ruta-practica">3. Practica: ¿qué tipo de situación es?</h2>
      <p className="game-hint">{answered} de {classifyCases.length} casos clasificados{answered ? ` · ${right} correctos` : ""}. Clasifica por los hechos (daño, reiteración, posible delito), no por la gravedad aparente.</p>
      <div className="ruta-cases">{classifyCases.map((c, i) => {
        const a = answers[c.id];
        return <article key={c.id} className="ruta-case">
          <p><strong>Caso {i + 1}.</strong> {c.text}</p>
          <div className="ruta-case-options" role="group" aria-label={`Tipo para el caso ${i + 1}`}>{TYPES.map(t => <button key={t} type="button" disabled={!!a} aria-pressed={a === t} className={a ? (t === c.answer ? "is-right" : a === t ? "is-wrong" : "") : ""} onClick={() => setAnswers(prev => ({ ...prev, [c.id]: t }))}>Tipo {t}</button>)}</div>
          {a && <p className="ruta-why" role="status"><strong>{a === c.answer ? "Correcto." : `Es tipo ${c.answer}.`}</strong> {c.why}</p>}
        </article>;
      })}</div>
      {answered > 0 && <div className="practice-actions"><Button variant="outline" onClick={() => setAnswers({})}><RotateCcw aria-hidden="true" /> Reiniciar casos</Button></div>}
    </section>

    <p className="competency-sources">Fuentes: Ley 1620 de 2013 (arts. 29 a 31); Decreto 1965 de 2013 (arts. 36 a 45), compilado en el Decreto 1075 de 2015 (arts. 2.3.5.4.2.2 a 2.3.5.4.2.11); Guía 49 del MEN. Consulta las fichas: <Link to="/biblioteca/ficha/$id" params={{ id: "ley-1620-2013" }} search={{ imprimir: false }}>Ley 1620</Link> · <Link to="/biblioteca/ficha/$id" params={{ id: "decreto-1965-2013" }} search={{ imprimir: false }}>Decreto 1965</Link> · <Link to="/biblioteca/ficha/$id" params={{ id: "protocolos-convivencia" }} search={{ imprimir: false }}>Guía 49</Link>. Casos ficticios con fines formativos.</p>
  </ModulePage>;
}
