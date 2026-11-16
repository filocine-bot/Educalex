import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flag, Send, Timer, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { simulationBank, type SimulationProfile } from "@/lib/simulation-bank";
import { durationOptions, remainingSeconds, type PracticeResult } from "@/lib/simulation-scoring";
import { usePracticeSession } from "@/components/practice-session";
import { practiceProvenance } from "@/lib/competition-references";
import { ResultDetail } from "@/components/practice-results";

export function PracticeExam({ profile }: { profile: SimulationProfile }) {
  const bank = simulationBank[profile];
  const { addResult } = usePracticeSession();
  const [phase, setPhase] = useState<"ready" | "active" | "done">("ready");
  const [minutes, setMinutes] = useState(15);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => bank.questions.map(() => null));
  const [marked, setMarked] = useState<number[]>([]);
  const [clock, setClock] = useState<{ started: number; deadline: number | null }>({ started: 0, deadline: null });
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState<PracticeResult | null>(null);
  const submitted = useRef(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const hasFocusedQuestion = useRef(false);
  const latestAnswers = useRef(answers);
  latestAnswers.current = answers;

  const complete = useCallback((timedOut: boolean) => {
    if (submitted.current) return;
    submitted.current = true;
    const finishedAt = timedOut && clock.deadline !== null ? clock.deadline : Date.now();
    const delivery: PracticeResult = { profile, answers: [...latestAnswers.current], elapsedSeconds: Math.max(0, Math.floor((finishedAt - clock.started) / 1000)), timedOut };
    addResult(delivery);
    setResult(delivery);
    setConfirm(false);
    setPhase("done");
  }, [addResult, clock, profile]);

  useEffect(() => {
    if (phase !== "active" || clock.deadline === null) return;
    const tick = () => {
      const remaining = remainingSeconds(clock.deadline, Date.now());
      setSecondsLeft(remaining);
      if (remaining === 0) complete(true);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [phase, clock.deadline, complete]);

  useEffect(() => {
    if (phase === "active") {
      questionHeading.current?.focus();
      if (hasFocusedQuestion.current) questionHeading.current?.scrollIntoView({ block: "center" });
      hasFocusedQuestion.current = true;
    }
    if (phase === "done") document.querySelector<HTMLElement>("[data-result-heading]")?.focus();
  }, [index, phase]);

  useEffect(() => {
    if (phase !== "active") return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  const start = () => {
    const now = Date.now();
    submitted.current = false;
    hasFocusedQuestion.current = false;
    setAnswers(bank.questions.map(() => null));
    setMarked([]);
    setIndex(0);
    setResult(null);
    setClock({ started: now, deadline: minutes === 0 ? null : now + minutes * 60_000 });
    setSecondsLeft(minutes === 0 ? null : minutes * 60);
    setPhase("active");
  };
  const answered = answers.filter(answer => answer !== null).length;
  const question = bank.questions[index];
  if (phase === "done" && result) return <ResultDetail result={result} onRepeat={() => { setPhase("ready"); setResult(null); }} />;
  if (phase === "ready") return <section className="practice-setup" aria-label="Preparar práctica">
    <p className="course-kicker">{practiceProvenance.label}</p><p className="academic-pending">{practiceProvenance.review}</p><h2>{bank.title}: 8 situaciones pedagógicas</h2>
    <ul className="practice-instructions"><li>Una respuesta por pregunta, con opciones A–D. Cada acierto suma un punto, sin penalización por error.</li><li>Puedes cambiar tus respuestas y marcar preguntas para revisar antes de entregar.</li><li>La calificación y las explicaciones aparecen únicamente después de entregar. Al agotarse el tiempo se entregan las respuestas registradas.</li><li>No es una prueba oficial CNSC/ICFES ni reproduce su formato, requisitos o claves.</li><li>El intento en curso se pierde al salir de esta página; si ingresas, las entregas se guardan en tu cuenta. Sin cuenta, son temporales y se pierden al recargar.</li></ul>
    <label className="practice-duration">Tiempo de práctica<select value={minutes} onChange={event => setMinutes(Number(event.target.value))}>{durationOptions.map(duration => <option key={duration} value={duration}>{duration === 0 ? "Sin límite" : `${duration} minutos`}</option>)}</select></label>
    <Button size="lg" onClick={start}><Play /> Comenzar práctica</Button>
  </section>;
  if (!question) return null;
  return <section className="practice-exam" aria-label="Simulacro en curso">
    <p className="course-kicker">{practiceProvenance.label} · Correspondencia documental pendiente</p>
    <div className="practice-toolbar"><span><strong>{answered}/8</strong> respondidas · {marked.length} por revisar</span><span role="timer" aria-label="Tiempo restante"><Timer /> {secondsLeft === null ? "Sin límite" : `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`}</span></div>
    <progress value={answered} max={8} aria-label="Preguntas respondidas" />
    {secondsLeft !== null && secondsLeft <= 60 && <p role="status" className="text-destructive">Queda un minuto o menos. Al terminar el tiempo se entregará la práctica automáticamente.</p>}
    <nav className="practice-question-nav" aria-label="Elegir pregunta">{bank.questions.map((q, i) => <Button key={q.id} variant={index === i ? "navy" : "outline"} aria-current={index === i ? "step" : undefined} aria-label={`Pregunta ${i + 1}${answers[i] !== null ? ", respondida" : ", sin responder"}${marked.includes(i) ? ", marcada para revisar" : ""}`} onClick={() => setIndex(i)} className="practice-question-jump"><span>{i + 1}</span>{marked.includes(i) ? <Flag aria-hidden /> : answers[i] !== null ? <span aria-hidden>●</span> : <span aria-hidden>○</span>}</Button>)}</nav>
    <div className="practice-question"><div className="practice-question-meta"><p className="course-kicker">PREGUNTA {index + 1} DE 8 · {question.competency.toUpperCase()}</p><Button variant={marked.includes(index) ? "secondary" : "outline"} aria-pressed={marked.includes(index)} onClick={() => setMarked(previous => previous.includes(index) ? previous.filter(i => i !== index) : [...previous, index])}><Flag /> {marked.includes(index) ? "Marcada para revisar" : "Marcar para revisar"}</Button></div>
      <h2 ref={questionHeading} tabIndex={-1} id={`question-${question.id}`}>{question.prompt}</h2>
      <fieldset className="practice-options" aria-labelledby={`question-${question.id}`}><legend className="sr-only">Selecciona una respuesta</legend>{question.options.map((option, choice) => <label key={option} className="practice-option" data-selected={answers[index] === choice}><input type="radio" name={question.id} value={choice} checked={answers[index] === choice} onChange={() => {
        if (clock.deadline !== null && Date.now() >= clock.deadline) { complete(true); return; }
        setAnswers(previous => previous.map((answer, i) => i === index ? choice : answer));
      }} /><strong>{"ABCD"[choice]}</strong><span>{option}</span></label>)}</fieldset>
    </div>
    <div className="practice-actions"><Button variant="outline" disabled={index === 0} onClick={() => setIndex(previous => previous - 1)}><ArrowLeft /> Anterior</Button><Button variant="outline" disabled={index === 7} onClick={() => setIndex(previous => previous + 1)}>Siguiente <ArrowRight /></Button><Button onClick={() => setConfirm(true)}><Send /> Entregar práctica</Button></div>
    <AlertDialog open={confirm} onOpenChange={setConfirm}><AlertDialogContent><AlertDialogTitle>¿Entregar la práctica?</AlertDialogTitle><AlertDialogDescription>Has respondido {answered} de 8 preguntas. Quedan {8 - answered} sin responder y {marked.length} marcadas para revisar. Después de entregar no podrás cambiar respuestas. El cronómetro sigue corriendo mientras revisas este aviso.</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>Seguir revisando</AlertDialogCancel><AlertDialogAction onClick={() => complete(clock.deadline !== null && Date.now() >= clock.deadline)}>Confirmar entrega</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </section>;
}