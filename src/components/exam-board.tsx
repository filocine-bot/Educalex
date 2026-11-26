import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, BookOpen, Brain, Calculator, CheckCircle2, Clock3, GraduationCap, HeartHandshake, Lock, PenLine, RotateCcw, ScrollText, Scale, Users, XCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/components/account-session";
import { useMyPremium } from "@/components/premium-purchase";
import { ProfilePayButton } from "@/components/direct-pay";
import { PsychoPractice } from "@/components/psycho-practice";
import { getLibraryDoc } from "@/lib/educalex-sitemap";
import { errorMap, PREMIUM_LOCKED } from "@/lib/game-engine";
import { blocksOf, examComponents, type Block, type ExamComponent } from "@/lib/exam-components";
import { getPaidAttempts, startBlockAttempt } from "@/lib/paid-attempts.functions";
import { MAX_PAID_ATTEMPTS, type PaidAttempts } from "@/lib/paid-attempts";
import { PROFILE_LABEL } from "@/lib/payments";
import type { PracticeQuestion, SimulationProfile } from "@/lib/simulation-bank";

const LETTERS = ["A", "B", "C", "D"] as const;
const ICONS: Record<string, LucideIcon> = { lectura: BookOpen, cuantitativo: Calculator, blandas: Users, ensenar: GraduationCap, evaluar: PenLine, incluir: HeartHandshake, convivencia: Scale };
const BEST_KEY = "educalex-mejor-bloque";
const readBest = (): Record<string, number> => { try { return JSON.parse(localStorage.getItem(BEST_KEY) ?? "{}") as Record<string, number>; } catch { return {}; } };
const saveBest = (k: string, v: number) => { try { const b = readBest(); if ((b[k] ?? -1) < v) { b[k] = v; localStorage.setItem(BEST_KEY, JSON.stringify(b)); } } catch { /* sin almacenamiento */ } };

type View = { kind: "board" } | { kind: "component"; c: ExamComponent } | { kind: "quiz"; c: ExamComponent; b: Block; review?: PracticeQuestion[] } | { kind: "timed" } | { kind: "psico" };

/** Preparación completa organizada como la prueba: componentes comunes y pedagógicos, en bloques de 10 preguntas. */
export function ExamBoard({ profile, timed }: { profile: SimulationProfile; timed: ReactNode }) {
  const comps = useMemo(() => examComponents(profile), [profile]);
  const premium = useMyPremium();
  const { user } = useAccount();
  const unlocked = !PREMIUM_LOCKED || premium.level(profile) >= 3;
  const [view, setView] = useState<View>({ kind: "board" });
  const [best, setBest] = useState<Record<string, number>>({});
  const [attempts, setAttempts] = useState<PaidAttempts>({});
  const [unlimited, setUnlimited] = useState(false);
  const [err, setErr] = useState("");
  const load = useServerFn(getPaidAttempts);
  const begin = useServerFn(startBlockAttempt);
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setBest(readBest()); }, [view]);
  useEffect(() => { if (!user) return; load().then(r => { setAttempts(r.used); setUnlimited(r.unlimited); }).catch(() => {}); }, [user, load]);
  const go = (v: View) => { setErr(""); setView(v); requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const keyOf = (b: Block) => `${profile}:${b.id}`;
  const used = (b: Block) => attempts[keyOf(b)] ?? 0;

  async function startBlock(c: ExamComponent, b: Block) {
    if (!unlimited && used(b) >= MAX_PAID_ATTEMPTS) return;
    if (!unlimited && !window.confirm(`Vas a iniciar ${c.title} · ${b.label}. Cada bloque se puede presentar ${MAX_PAID_ATTEMPTS} veces; este será tu intento ${used(b) + 1} de ${MAX_PAID_ATTEMPTS}. ¿Empezar?`)) return;
    if (!unlimited) {
      try { const r = await begin({ data: { key: keyOf(b) } }); setAttempts(r.used); setUnlimited(r.unlimited); }
      catch (e) { setErr((e as Error).message || "No se pudo iniciar el bloque."); return; }
    }
    go({ kind: "quiz", c, b });
  }

  const payBox = <div className="trial-paybar"><p><strong>Preparación completa de {PROFILE_LABEL[profile]}</strong><span>Desbloquea todos los componentes de la prueba. Pago único; el enlace de acceso llega a tu correo.</span></p><ProfilePayButton profile={profile} className="h2-btn h2-btn-gold" /></div>;

  return <div ref={topRef} className="exam-board">
    {err && <p role="alert" className="exam-err">{err}</p>}
    {view.kind === "board" && <>
      <div className="exam-board-head">
        <h2>Prepárate por componentes de la prueba</h2>
        <p>Prueba de aptitudes y competencias básicas: elige un componente y practica en bloques de 10 preguntas.</p>
      </div>
      {!unlocked && payBox}
      <h3 className="exam-group">Componentes comunes</h3>
      <div className="exam-grid">{comps.filter(c => c.group === "comunes").map(c => <Tile key={c.id} c={c} locked={!unlocked} onOpen={() => go({ kind: "component", c })} />)}</div>
      <h3 className="exam-group">Componente pedagógico del cargo</h3>
      <div className="exam-grid">{comps.filter(c => c.group === "pedagogicas").map(c => <Tile key={c.id} c={c} locked={!unlocked} onOpen={() => go({ kind: "component", c })} />)}</div>
      <h3 className="exam-group">Prueba completa y complementos</h3>
      <div className="exam-grid">
        <button type="button" className={`exam-tile tone-timed${unlocked ? "" : " is-locked"}`} onClick={() => go({ kind: "timed" })}><Clock3 aria-hidden="true" /><strong>Simulacro con tiempo</strong><small>40 preguntas, como el examen</small>{!unlocked && <Lock className="exam-lock" aria-label="Requiere la preparación completa" />}</button>
        <button type="button" className="exam-tile tone-psico" onClick={() => go({ kind: "psico" })}><Brain aria-hidden="true" /><strong>Prueba psicotécnica</strong><small>Clasificatoria · 12 situaciones</small></button>
        <div className="exam-tile tone-soon" aria-disabled="true"><ScrollText aria-hidden="true" /><strong>Conocimientos disciplinares</strong><small>Por área · en preparación</small></div>
      </div>
    </>}

    {view.kind !== "board" && <button type="button" className="exam-back" onClick={() => go(view.kind === "quiz" ? { kind: "component", c: view.c } : { kind: "board" })}><ArrowLeft aria-hidden="true" /> {view.kind === "quiz" ? `Volver a ${view.c.title}` : "Volver a los componentes"}</button>}

    {view.kind === "component" && <section aria-labelledby="comp-title">
      <h2 id="comp-title" className="exam-comp-title">{view.c.title}</h2>
      <p className="exam-comp-what">{view.c.what} {view.c.questions.length} preguntas, de menor a mayor dificultad.</p>
      {!unlocked ? payBox : <ol className="exam-blocks">{blocksOf(view.c).map(b => { const k = keyOf(b); const left = MAX_PAID_ATTEMPTS - used(b); const done = !unlimited && left <= 0; return <li key={b.id}>
        <div><strong>{b.label}</strong><small>Preguntas {b.from} a {b.to}{best[k] !== undefined && <> · mejor resultado {best[k]}/{b.questions.length}</>}{!unlimited && <> · intentos {used(b)} de {MAX_PAID_ATTEMPTS}</>}</small></div>
        {done ? <span className="game-lock"><Lock aria-hidden="true" /> Sin intentos</span> : <Button variant="navy" onClick={() => void startBlock(view.c, b)}>{best[k] !== undefined ? "Repetir" : "Empezar"}</Button>}
      </li>; })}</ol>}
    </section>}

    {view.kind === "quiz" && <BlockQuiz key={`${view.b.id}-${view.review ? "r" : "n"}`} title={`${view.c.title} · ${view.b.label}`} questions={view.review ?? view.b.questions} review={!!view.review}
      onFinish={right => { if (!view.review) saveBest(keyOf(view.b), right); }}
      onReview={wrong => go({ kind: "quiz", c: view.c, b: view.b, review: wrong })}
      onRepeat={!unlimited && used(view.b) >= MAX_PAID_ATTEMPTS ? undefined : () => void startBlock(view.c, view.b)}
      onNext={(() => { const bl = blocksOf(view.c); const i = bl.findIndex(x => x.id === view.b.id); const n = bl[i + 1]; return n ? () => void startBlock(view.c, n) : undefined; })()}
      onExit={() => go({ kind: "component", c: view.c })} />}

    {view.kind === "timed" && (unlocked ? timed : payBox)}
    {view.kind === "psico" && <PsychoPractice />}
  </div>;
}

function Tile({ c, locked, onOpen }: { c: ExamComponent; locked: boolean; onOpen: () => void }) {
  const Icon = ICONS[c.id] ?? BookOpen;
  const n = blocksOf(c).length;
  return <button type="button" className={`exam-tile tone-${c.group}${locked ? " is-locked" : ""}`} onClick={onOpen}>
    <Icon aria-hidden="true" /><strong>{c.title}</strong><small>{c.questions.length} preguntas · {n} {n === 1 ? "bloque" : "bloques"}</small>
    {locked && <Lock className="exam-lock" aria-label="Requiere la preparación completa" />}
  </button>;
}

type Ans = { q: PracticeQuestion; chosen: number; ok: boolean };
function BlockQuiz({ title, questions, review, onFinish, onReview, onRepeat, onNext, onExit }: { title: string; questions: PracticeQuestion[]; review: boolean; onFinish: (right: number) => void; onReview: (wrong: PracticeQuestion[]) => void; onRepeat?: (() => void) | undefined; onNext?: (() => void) | undefined; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Ans[]>([]);
  const [done, setDone] = useState(false);
  const q = questions[i]!;
  function pick(o: number) { if (chosen !== null) return; setChosen(o); setAnswers(a => [...a, { q, chosen: o, ok: o === q.correct }]); }
  function next() { if (i + 1 < questions.length) { setI(i + 1); setChosen(null); return; } setDone(true); onFinish(answers.filter(a => a.ok).length); }
  if (done) {
    const right = answers.filter(a => a.ok).length;
    const wrong = answers.filter(a => !a.ok).map(a => a.q);
    const map = errorMap(questions, wrong.map(w => w.id));
    return <section className="game game-summary" aria-labelledby="bq-res">
      <div className={`game-result is-trial ${right / answers.length >= 0.7 ? "ok" : "bad"}`}>{right / answers.length >= 0.7 ? <CheckCircle2 aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}<h2 id="bq-res" tabIndex={-1} ref={el => el?.focus()}>{review ? "Repaso terminado" : `Tu resultado: ${right} de ${answers.length}`}</h2><p>{title}</p></div>
      {map.length > 0 && <div className="trial-topics"><h3>Temas que debes reforzar</h3><div className="trial-topic-list">{map.map(g => <Link key={g.competency} to={g.items[0]!.course} className="trial-topic">{g.competency} <span>({g.items.length})</span></Link>)}</div></div>}
      <div className="practice-actions">
        {wrong.length > 0 && <Button variant="navy" onClick={() => onReview(wrong)}><RotateCcw /> Repasar mis {wrong.length} errores</Button>}
        {onRepeat && !review && <Button variant="outline" onClick={onRepeat}>Repetir el bloque</Button>}
        {onNext && <Button variant="navy" onClick={onNext}>Siguiente bloque</Button>}
        <Button variant="ghost" onClick={onExit}>Volver a los bloques</Button>
      </div>
    </section>;
  }
  const doc = getLibraryDoc(q.documentId);
  const isRight = chosen !== null && chosen === q.correct;
  return <section className="game" aria-labelledby="bq-q">
    <div className="game-hud"><span><strong>{review ? "Repaso de errores" : title}</strong></span><span>Pregunta {i + 1} de {questions.length}</span></div>
    <div className="game-progress" role="progressbar" aria-label="Avance del bloque" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answers.length}><span style={{ width: `${(answers.length / questions.length) * 100}%` }} /></div>
    <span className="course-kicker">{q.competency}</span>
    {q.context && <p className="question-context"><strong>Situación:</strong> {q.context}</p>}
    <h2 id="bq-q" className="game-prompt">{q.prompt}</h2>
    <div className="game-options">{q.options.map((t, k) => { const st = chosen === null ? "" : k === q.correct ? "is-correct" : k === chosen ? "is-wrong" : "is-dim"; return <button key={k} type="button" className={`game-option ${st}`} onClick={() => pick(k)} disabled={chosen !== null}><span className="game-letter" aria-hidden="true">{LETTERS[k]}</span><span>{t}</span>{chosen !== null && k === q.correct && <CheckCircle2 aria-label="Respuesta correcta" />}{chosen !== null && k === chosen && k !== q.correct && <XCircle aria-label="Tu respuesta, incorrecta" />}</button>; })}</div>
    {chosen !== null && <div role="status" className={`game-feedback ${isRight ? "ok" : "bad"}`}>
      <h3>{isRight ? <><CheckCircle2 aria-hidden="true" /> ¡Correcto!</> : <><XCircle aria-hidden="true" /> No es correcta</>}</h3>
      {!isRight && <p><strong>La respuesta correcta es {LETTERS[q.correct]}:</strong> {q.options[q.correct]}</p>}
      <p><strong>Por qué:</strong> {q.explanation}</p>
      <p className="game-reference"><BookOpen aria-hidden="true" /> <span><strong>Fundamento:</strong> {q.reference}</span></p>
      <p className="game-links">{doc && <Link to={doc.shelf}>Ver la norma</Link>}<Link to={q.course}>Estudiar el tema</Link></p>
      <Button variant="navy" onClick={next}>{i + 1 < questions.length ? "Siguiente pregunta" : "Ver resultados"}</Button>
    </div>}
  </section>;
}
