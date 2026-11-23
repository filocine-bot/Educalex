import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Award, BookOpen, Brain, ListChecks, CheckCircle2, Flame, Lock, Medal, RotateCcw, Star, Trophy, XCircle } from "lucide-react";
import { CompetencyGuide } from "@/components/competency-guide";
import { PsychoPractice } from "@/components/psycho-practice";
import { Button } from "@/components/ui/button";
import type { PracticeQuestion, SimulationProfile } from "@/lib/simulation-bank";
import { getLibraryDoc } from "@/lib/educalex-sitemap";
import { applyOutcome, describeBadge, emptyProfile, errorMap, isLevelPlayable, levelsFor, PASS_RATIO, type GameBankKey, pointsFor, PREMIUM_LOCKED, type GameLevel } from "@/lib/game-engine";
import { useGameProgress } from "@/lib/game-progress";
import { BuyPremium, useMyPremium } from "@/components/premium-purchase";
import { useAccount } from "@/components/account-session";

const LETTERS = ["A", "B", "C", "D"];

type Answer = { id: string; chosen: number; correct: boolean };
type Run = { level: GameLevel; review: boolean; questions: PracticeQuestion[]; index: number; answers: Answer[]; streak: number; bestStreak: number; points: number };

export function PracticeGame({ profile, bank = profile }: { profile: SimulationProfile; bank?: GameBankKey }) {
  const levels = useMemo(() => levelsFor(bank), [bank]);
  const { progress, save, ready, signedIn } = useGameProgress();
  const premium = useMyPremium();
  const { isAdmin } = useAccount();
  const myLevel = premium.level(profile);
  const lockedAt = (n: number) => PREMIUM_LOCKED && n > myLevel;
  const locked = lockedAt(4);
  const mine = progress[bank] ?? emptyProfile();
  const [run, setRun] = useState<Run | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [summary, setSummary] = useState<{ run: Run; newBadges: string[]; passed: boolean } | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (run && chosen === null) questionRef.current?.focus(); }, [run?.index, run?.level.number, run?.review]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (chosen !== null) feedbackRef.current?.focus(); }, [chosen]);

  function start(level: GameLevel, review = false, questions = level.questions) {
    setSummary(null); setChosen(null);
    setRun({ level, review, questions, index: 0, answers: [], streak: 0, bestStreak: 0, points: 0 });
  }

  function answer(option: number) {
    if (!run || chosen !== null) return;
    const q = run.questions[run.index]!;
    const correct = option === q.correct;
    const streak = correct ? run.streak + 1 : 0;
    const pts = run.review ? 0 : pointsFor(correct, streak);
    setChosen(option);
    setRun({ ...run, answers: [...run.answers, { id: q.id, chosen: option, correct }], streak, bestStreak: Math.max(run.bestStreak, streak), points: run.points + pts });
  }

  function next() {
    if (!run) return;
    if (run.index + 1 < run.questions.length) { setChosen(null); setRun({ ...run, index: run.index + 1 }); return; }
    finish(run);
  }

  function finish(r: Run) {
    setChosen(null); setRun(null);
    const right = r.answers.filter(a => a.correct).length;
    const ok = right / r.answers.length >= PASS_RATIO;
    if (r.review) { setSummary({ run: r, newBadges: [], passed: ok }); return; }
    const { progress: updated, newBadges } = applyOutcome(bank, mine, { level: r.level.number, answers: r.answers, pointsEarned: r.points, bestStreak: r.bestStreak });
    save({ ...progress, [bank]: updated });
    setSummary({ run: r, newBadges, passed: ok });
  }

  if (!ready) return <p className="section-description">Cargando tu progreso…</p>;

  // ---- Pregunta en juego ----
  if (run) {
    const q = run.questions[run.index]!;
    const doc = getLibraryDoc(q.documentId);
    const isRight = chosen !== null && chosen === q.correct;
    return <section className="game" aria-labelledby="game-question">
      <div className="game-hud" aria-label="Marcador">
        <span><strong>{run.review ? "Repaso de errores" : `Nivel ${run.level.number} · ${run.level.name}`}</strong></span>
        <span>Pregunta {run.index + 1} de {run.questions.length}</span>
        {!run.review && <span><Star aria-hidden="true" /> {run.points} puntos</span>}
        <span><Flame aria-hidden="true" /> Racha {run.streak}</span>
      </div>
      <div className="game-progress" role="progressbar" aria-label="Avance del nivel" aria-valuemin={0} aria-valuemax={run.questions.length} aria-valuenow={run.answers.length}>
        <span style={{ width: `${(run.answers.length / run.questions.length) * 100}%` }} />
      </div>
      <span className="course-kicker">{q.competency}</span>
      {q.context && <p className="question-context"><strong>Situación:</strong> {q.context}</p>}
      <h2 id="game-question" ref={questionRef} tabIndex={-1} className="game-prompt">{q.prompt}</h2>
      <div className="game-options">
        {q.options.map((text, i) => {
          const state = chosen === null ? "" : i === q.correct ? "is-correct" : i === chosen ? "is-wrong" : "is-dim";
          return <button key={i} type="button" className={`game-option ${state}`} onClick={() => answer(i)} disabled={chosen !== null} aria-pressed={chosen === i}>
            <span className="game-letter" aria-hidden="true">{LETTERS[i]}</span>
            <span>{text}</span>
            {chosen !== null && i === q.correct && <CheckCircle2 aria-label="Respuesta correcta" />}
            {chosen !== null && i === chosen && i !== q.correct && <XCircle aria-label="Tu respuesta, incorrecta" />}
          </button>;
        })}
      </div>
      {chosen !== null && <div ref={feedbackRef} tabIndex={-1} role="status" className={`game-feedback ${isRight ? "ok" : "bad"}`}>
        <h3>{isRight ? <><CheckCircle2 aria-hidden="true" /> ¡Correcto!{!run.review && <> +{pointsFor(true, run.streak)} puntos</>}</> : <><XCircle aria-hidden="true" /> No es correcta</>}</h3>
        {!isRight && <p><strong>Elegiste {LETTERS[chosen]}:</strong> {q.options[chosen]}<br /><strong>La respuesta correcta es {LETTERS[q.correct]}:</strong> {q.options[q.correct]}</p>}
        <p><strong>Por qué:</strong> {q.explanation}</p>
        <p className="game-reference"><BookOpen aria-hidden="true" /> <span><strong>Fundamento:</strong> {q.reference}</span></p>
        <p className="game-links">
          {doc && <Link to={doc.shelf}>Ver la norma en la biblioteca</Link>}
          <Link to={q.course}>Estudiar el tema</Link>
        </p>
        <Button variant="navy" onClick={next}>{run.index + 1 < run.questions.length ? "Siguiente pregunta" : "Ver resultados"}</Button>
      </div>}
    </section>;
  }

  // ---- Resumen del nivel ----
  if (summary) {
    const r = summary.run;
    const right = r.answers.filter(a => a.correct).length;
    const wrongIds = r.answers.filter(a => !a.correct).map(a => a.id);
    const map = errorMap(r.questions, wrongIds);
    const nextLevel = levels.find(l => l.number === r.level.number + 1);
    const nextPlayable = nextLevel ? isLevelPlayable(nextLevel, (progress[bank] ?? mine), lockedAt(nextLevel.number)) : null;
    return <section className="game game-summary" aria-labelledby="game-summary-title">
      <div className={`game-result ${summary.passed ? "ok" : "bad"}`}>
        {summary.passed ? <Trophy aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
        <h2 id="game-summary-title" tabIndex={-1} ref={el => el?.focus()}>
          {r.review ? "Repaso terminado" : summary.passed ? `¡Superaste el nivel ${r.level.name}!` : `Casi: necesitas ${Math.round(PASS_RATIO * 100)} % para pasar`}
        </h2>
        <p>{right} de {r.answers.length} correctas{!r.review && <> · {r.points} puntos · mejor racha {r.bestStreak}</>}</p>
      </div>
      {summary.newBadges.length > 0 && <div className="game-badges-new" role="status">
        <h3><Medal aria-hidden="true" /> Nuevas insignias</h3>
        <ul>{summary.newBadges.map(id => { const b = describeBadge(id); return <li key={id}><Award aria-hidden="true" /> <strong>{b.title}</strong> <small>{b.description}</small></li>; })}</ul>
      </div>}
      {map.length > 0 && <div className="game-errors">
        <h3>Mapa de errores</h3>
        <p className="section-description">Estos son los temas donde fallaste. Repásalos antes de volver a intentarlo.</p>
        <ul>{map.map(g => <li key={g.competency}><strong>{g.competency}</strong> ({g.items.length})<ul>{g.items.map(q => <li key={q.id}>{q.reference}</li>)}</ul></li>)}</ul>
      </div>}
      <div className="practice-actions">
        {wrongIds.length > 0 && <Button variant="navy" onClick={() => start(r.level, true, r.questions.filter(q => wrongIds.includes(q.id)))}><RotateCcw /> Repasar mis {wrongIds.length} errores</Button>}
        {!r.review && <Button variant="outline" onClick={() => start(r.level)}>Repetir el nivel</Button>}
        {nextLevel && nextPlayable?.playable && !r.review && summary.passed && <Button variant="navy" onClick={() => start(nextLevel)}>Ir al nivel {nextLevel.name}</Button>}
        <Button variant="ghost" onClick={() => setSummary(null)}>Volver a los niveles</Button>
      </div>
    </section>;
  }

  // ---- Mapa de niveles ----
  return <section className="game game-map" aria-labelledby="game-levels-title">
    <div className="game-intro">
      <div className="game-intro-row"><h2 id="game-levels-title">Elige tu nivel</h2><p className="game-stats"><span><Star aria-hidden="true" /> {mine.points} puntos</span><span><Flame aria-hidden="true" /> Mejor racha {mine.bestStreak}</span><span><Medal aria-hidden="true" /> {mine.badges.length} insignias</span></p></div>
      <p className="game-hint">Explicación inmediata en cada respuesta. Supera un nivel con {Math.round(PASS_RATIO * 100)} % para desbloquear el siguiente.{!signedIn && <> <Link to="/registro">Crea una cuenta</Link> para guardar tu progreso.</>}</p>
      {PREMIUM_LOCKED && myLevel > 1 && <p className="game-launch">Tienes desbloqueado hasta el nivel {["Básico", "Intermedio", "Avanzado", "Experto"].at(myLevel - 1)} en este perfil. ¡Gracias por apoyar EDUCALEX!</p>}
      {!PREMIUM_LOCKED && <p className="game-launch">Lanzamiento: todos los niveles están abiertos gratis por tiempo limitado.</p>}
    </div>
    <ol className="game-levels">
      {levels.map(level => {
        const status = isLevelPlayable(level, mine, lockedAt(level.number));
        const best = mine.best[level.number];
        const done = mine.badges.includes(`nivel:${level.number}`);
        return <li key={level.number} className={`game-level ${status.playable ? "" : "is-locked"} ${done ? "is-done" : ""}`}>
          <div>
            <span className="course-kicker">Nivel {level.number}{level.premium ? " · Premium" : " · Gratis"}</span>
            <h3>{level.name}</h3>
            <p>{level.questions.length} preguntas{best !== undefined && <> · tu mejor resultado: {best} %</>}</p>
          </div>
          {status.playable
            ? <Button variant={done ? "outline" : "navy"} onClick={() => start(level)}>{done ? "Jugar de nuevo" : best !== undefined ? "Reintentar" : "Jugar"}</Button>
            : <span className="game-lock"><Lock aria-hidden="true" /> {status.reason === "premium" ? "Requiere plan" : `Supera el nivel ${level.number - 1}`}</span>}
        </li>;
      })}
    </ol>
    {(locked || (isAdmin && myLevel < 4)) && <>{!locked && <p className="game-launch">Vista de administración: compra de prueba (los demás usuarios aún no ven este recuadro).</p>}<BuyPremium profile={profile} returnPath={`/simulacros/${profile}`} /></>}
    {mine.badges.includes("nivel:1") && <p className="game-certificate"><Award aria-hidden="true" /> Ya superaste el nivel Básico. <Link to="/certificado" search={{ perfil: bank }}>Descarga tu constancia de participación</Link></p>}
    {mine.badges.length > 0 && <div className="game-badges">
      <h3><Medal aria-hidden="true" /> Mis insignias</h3>
      <ul>{mine.badges.map(id => { const b = describeBadge(id); return <li key={id} title={b.description}><Award aria-hidden="true" /> {b.title}</li>; })}</ul>
    </div>}
  </section>;
}

/** Selector entre el modo juego y el simulacro completo cronometrado. */
export function SimulationModes({ profile, children }: { profile: SimulationProfile; children: React.ReactNode }) {
  const [mode, setMode] = useState<"juego" | "nucleo" | "simulacro" | "psico" | "competencias">("juego");
  const tabsRef = useRef<HTMLDivElement>(null);
  return <div>
    <div ref={tabsRef} className="game-modes" role="tablist" aria-label="Forma de practicar">
      <button type="button" role="tab" aria-selected={mode === "juego"} className={mode === "juego" ? "active" : ""} onClick={() => setMode("juego")}><Trophy aria-hidden="true" /> Modo juego por niveles</button>
      <button type="button" role="tab" aria-selected={mode === "nucleo"} className={mode === "nucleo" ? "active" : ""} onClick={() => setMode("nucleo")}><BookOpen aria-hidden="true" /> Núcleo común</button>
      <button type="button" role="tab" aria-selected={mode === "simulacro"} className={mode === "simulacro" ? "active" : ""} onClick={() => setMode("simulacro")}>Simulacro completo con tiempo</button>
      <button type="button" role="tab" aria-selected={mode === "psico"} className={mode === "psico" ? "active" : ""} onClick={() => setMode("psico")}><Brain aria-hidden="true" /> Psicotécnica</button>
      <button type="button" role="tab" aria-selected={mode === "competencias"} className={mode === "competencias" ? "active" : ""} onClick={() => setMode("competencias")}><ListChecks aria-hidden="true" /> Competencias evaluadas</button>
    </div>
    <div role="tabpanel">{mode === "juego" ? <PracticeGame key="perfil" profile={profile} /> : mode === "nucleo" ? <><p className="game-hint nucleo-hint">Núcleo común para todos los cargos: lectura crítica, razonamiento cuantitativo, competencias blandas y pedagógicas (40 preguntas, 4 niveles).</p><PracticeGame key="nucleo" profile={profile} bank="nucleo-comun" /></> : mode === "competencias" ? <CompetencyGuide profile={profile} onPractice={t => { setMode(t); requestAnimationFrame(() => tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })); }} /> : mode === "psico" ? <PsychoPractice /> : children}</div>
  </div>;
}
