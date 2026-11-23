import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Play, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { questionsFor } from "@/lib/game-engine";

const LETTERS = "ABCD";
// Una pregunta real del nivel Básico (Ingreso docente) para probar el formato sin registrarse.
const SAMPLE = questionsFor("ingreso-docente").find(q => q.level === 1)!;

/** Botón «Haz una pregunta de prueba»: abre una pregunta tipo ICFES con su explicación. */
export function SampleQuestion() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  const right = picked === SAMPLE.correct;
  return <>
    <button type="button" className="hx-hero-ghost" onClick={() => { setPicked(null); setOpen(true); }} aria-haspopup="dialog"><Play aria-hidden="true" /> Prueba una pregunta gratis</button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sample-q">
        <p className="sample-q-tag">Pregunta de prueba · Nivel Básico · {SAMPLE.competency}</p>
        {SAMPLE.context && <DialogDescription className="sample-q-context">{SAMPLE.context}</DialogDescription>}
        <DialogTitle className="sample-q-title">{SAMPLE.prompt}</DialogTitle>
        {!SAMPLE.context && <DialogDescription className="sr-only">Elige una opción para ver la explicación.</DialogDescription>}
        <div className="sample-q-options" role="group" aria-label="Opciones de respuesta">
          {SAMPLE.options.map((o, i) => {
            const state = !done ? "" : i === SAMPLE.correct ? "is-right" : i === picked ? "is-wrong" : "is-dim";
            return <button key={o} type="button" className={`sample-q-option ${state}`} disabled={done} aria-pressed={picked === i} onClick={() => setPicked(i)}>
              <span className="sample-q-letter">{LETTERS[i]}</span><span>{o}</span>
            </button>;
          })}
        </div>
        {done && <div className={`sample-q-result ${right ? "ok" : "bad"}`} role="status">
          <p className="sample-q-verdict">{right ? <><CheckCircle2 aria-hidden="true" /> ¡Correcto!</> : <><XCircle aria-hidden="true" /> La respuesta correcta es la {LETTERS[SAMPLE.correct]}</>}</p>
          <p>{SAMPLE.explanation}</p>
          <p className="sample-q-ref">Norma: {SAMPLE.reference}</p>
          <div className="sample-q-actions">
            <Button variant="hero" asChild><Link to="/simulacros/ingreso-docente" onClick={() => setOpen(false)}>Seguir practicando gratis <ArrowRight aria-hidden="true" /></Link></Button>
            <Button variant="outline" asChild><Link to="/simulacros" onClick={() => setOpen(false)}>Elegir otro perfil</Link></Button>
          </div>
        </div>}
      </DialogContent>
    </Dialog>
  </>;
}
