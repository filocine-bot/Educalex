import { Link } from "@tanstack/react-router";
import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulationBank } from "@/lib/simulation-bank";
import { getLibraryDoc, getPage } from "@/lib/educalex-sitemap";
import { resultScore, type PracticeResult } from "@/lib/simulation-scoring";
import { usePracticeSession } from "@/components/practice-session";

export function ResultDetail({ result, onRepeat }: { result: PracticeResult; onRepeat?: () => void }) {
  const { saveMessage } = usePracticeSession();
  const bank = simulationBank[result.profile];
  const score = resultScore(result);
  const courses = [...new Set(bank.questions.map(q => q.course))];
  return <section className="practice-results" aria-label="Resultado de práctica">
    <div className="practice-result-heading"><div><p className="course-kicker">PRÁCTICA ORIGINAL · {bank.title.toUpperCase()}</p><h2 tabIndex={-1} data-result-heading>Resultado de la práctica</h2></div>{onRepeat && <Button variant="outline" onClick={onRepeat}><RotateCcw /> Repetir práctica</Button>}</div>
    {result.timedOut && <p role="status" className="mod-notice">El tiempo terminó. Se entregaron las respuestas registradas hasta ese momento.</p>}
    <div className="practice-score"><strong>{score.correct}/{score.total}</strong><span>{score.percentage} % de aciertos</span><span>{score.incorrect} incorrectas · {score.unanswered} sin responder</span><span>Tiempo empleado: {Math.floor(result.elapsedSeconds / 60)} min {result.elapsedSeconds % 60} s</span></div>
    <p className="text-muted-foreground">Cada acierto vale un punto; errores y omisiones valen cero. No hay umbral oficial de aprobación ni equivalencia con una prueba de concurso.</p>
    {saveMessage && <p role="status">{saveMessage}</p>}<h3>Resumen por competencia</h3><ul className="practice-competencies">{Object.entries(score.competencies).map(([name, group]) => <li key={name}><span>{name}</span><strong>{group.correct}/{group.total} · {Math.round(group.correct / group.total * 100)} %</strong></li>)}</ul>
    <h3>Respuestas y retroalimentación</h3>
    <div className="practice-review">{bank.questions.map((q, i) => {
      const answer = result.answers[i];
      const hit = answer === q.correct;
      const doc = getLibraryDoc(q.documentId);
      return <article key={q.id} className="practice-review-item"><p className="course-kicker">PREGUNTA {i + 1} · {q.competency.toUpperCase()}</p><h4>{q.prompt}</h4><p className={hit ? "text-brand-blue font-semibold" : "text-destructive font-semibold"}>{hit ? "Correcta" : answer == null ? "Sin responder" : "Incorrecta"}</p>
        <ol className="practice-review-options">{q.options.map((option, index) => <li key={option}><strong>{"ABCD"[index]}.</strong> {option}{answer === index && <em>Tu respuesta</em>}{q.correct === index && <em>Respuesta correcta</em>}</li>)}</ol>
        <p><strong>Explicación formativa: </strong>{q.explanation}</p><p className="text-muted-foreground"><strong>Referencia conceptual: </strong>{q.reference}</p>
        <div className="practice-links"><Link to="/biblioteca">Consultar biblioteca</Link>{doc?.fuenteConsultada && doc.fuenteUrl && <a href={doc.fuenteUrl} target="_blank" rel="noopener noreferrer">{doc.title} · fuente institucional</a>}<Link to={q.course}>{getPage(q.course)?.title}{q.course === "/formacion/guia-34-pmi" ? " · contenido disponible" : " · curso en preparación"}</Link></div>
      </article>;
    })}</div>
    <p className="text-muted-foreground">Las referencias orientan el estudio conceptual; no son claves oficiales ni certifican vigencia. Revisa los documentos y sus modificaciones en la biblioteca.</p>
    <div className="practice-links">{courses.map(course => <Link key={course} to={course}>{getPage(course)?.title}</Link>)}<Link to="/mis-resultados">Ver mi historial (requiere cuenta)</Link><Link to="/simulacros">Otros perfiles</Link></div>
  </section>;
}

export function SessionResults() {
  const { results, clearResults } = usePracticeSession();
  return <div className="practice-results"><div className="practice-result-heading"><h2>Resultados de esta sesión</h2>{results.length > 0 && <Button variant="outline" onClick={clearResults}><Trash2 /> Borrar resultados</Button>}</div>
    {results.length === 0 ? <p>No hay entregas en esta sesión. <Link to="/simulacros" className="text-brand-blue underline">Elegir una práctica</Link></p> : results.map((result, i) => <details key={results.length - i} className="practice-session-result" open={i === 0}><summary>{simulationBank[result.profile].title} · {resultScore(result).correct}/8 · entrega {results.length - i}</summary><ResultDetail result={result} /></details>)}
  </div>;
}