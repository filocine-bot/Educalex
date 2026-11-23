import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardCopy, Flag, Search } from "lucide-react";
import { questionsFor, LEVEL_NAMES, type GameBankKey } from "@/lib/game-engine";
import { competencyGuides } from "@/lib/competency-guide";
import { CERT_BANK_NAMES } from "@/lib/certificate";
import type { PracticeQuestion } from "@/lib/simulation-bank";

const BANKS: { key: GameBankKey; label: string }[] = [
  { key: "ingreso-docente", label: "Ingreso docente" },
  { key: "ascenso-reubicacion", label: "Ascenso y reubicación" },
  { key: "rector", label: "Rector" },
  { key: "coordinador", label: "Coordinador" },
  { key: "nucleo-comun", label: "Núcleo común" },
];
const L = "ABCD";
const KEY = "educalex-revision-preguntas";
type Review = Record<string, { status: "ok" | "ajustar"; note: string }>;

function load(): Review { try { return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Review; } catch { return {}; } }

/** Herramienta de revisión del banco de preguntas para la administradora. Las notas se guardan en este navegador. */
export function AdminQuestionReview() {
  const [bank, setBank] = useState<GameBankKey | "todos">("todos");
  const [level, setLevel] = useState<number | 0>(0);
  const [q, setQ] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);
  const [review, setReview] = useState<Review>({});
  const [copied, setCopied] = useState(false);
  useEffect(() => setReview(load()), []);
  const save = (next: Review) => { setReview(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sin almacenamiento */ } };

  const all = bank === "todos" ? BANKS.flatMap(b => questionsFor(b.key)) : questionsFor(bank);
  const comps = useMemo(() => { const m: Record<string, number> = {}; all.forEach(x => { m[x.competency] = (m[x.competency] ?? 0) + 1; }); return m; }, [all]);
  const shown = all.filter(x => (!level || x.level === level)
    && (!onlyPending || review[x.id]?.status !== "ok")
    && (!q.trim() || `${x.context ?? ""} ${x.prompt} ${x.options.join(" ")} ${x.reference}`.toLowerCase().includes(q.trim().toLowerCase())));
  const done = all.filter(x => review[x.id]?.status === "ok").length;
  const flagged = Object.entries(review).filter(([, r]) => r.status === "ajustar");
  const guide = bank !== "nucleo-comun" && bank !== "todos" ? competencyGuides[bank] : null;

  function mark(x: PracticeQuestion, status: "ok" | "ajustar") { save({ ...review, [x.id]: { status, note: review[x.id]?.note ?? "" } }); }
  function note(x: PracticeQuestion, text: string) { save({ ...review, [x.id]: { status: review[x.id]?.status ?? "ajustar", note: text } }); }
  async function copyFlagged() {
    const all5 = BANKS.flatMap(b => questionsFor(b.key).map(x => ({ b: b.label, x })));
    const text = flagged.map(([id, r]) => { const f = all5.find(e => e.x.id === id); return f ? `${f.b} · ${id} (nivel ${f.x.level})\n${f.x.prompt}\nCorrección: ${r.note || "(sin nota)"}` : `${id}: ${r.note}`; }).join("\n\n");
    try { await navigator.clipboard.writeText(text || "No hay preguntas marcadas para ajustar."); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* sin portapapeles */ }
  }

  return <div className="aqr">
    <p className="aqr-intro">Revisa cada pregunta y márcala como <strong>Aprobada</strong> o <strong>Ajustar</strong> con tu corrección. Las marcas se guardan en este navegador. Cuando termines, usa <strong>Copiar ajustes</strong> y pégalos en el chat para aplicarlos en la página.</p>

    <div className="aqr-tabs" role="tablist" aria-label="Perfil"><button role="tab" aria-selected={bank === "todos"} onClick={() => { setBank("todos"); setLevel(0); }}>Todos los perfiles</button>{BANKS.map(b => <button key={b.key} role="tab" aria-selected={bank === b.key} onClick={() => { setBank(b.key); setLevel(0); }}>{b.label}</button>)}</div>

    <section className="aqr-structure" aria-label="Estructura del perfil">
      <h2>{bank === "todos" ? "Todos los perfiles" : CERT_BANK_NAMES[bank]}</h2>
      {bank === "todos" && <p>{BANKS.map(b => `${b.label}: ${questionsFor(b.key).length}`).join(" · ")}</p>}
      <p><strong>{all.length} preguntas</strong> · {[1, 2, 3, 4].map(n => `${LEVEL_NAMES[n - 1]}: ${all.filter(x => x.level === n).length}`).join(" · ")} · Revisadas: <strong>{done}/{all.length}</strong></p>
      <p><strong>Competencias:</strong> {Object.entries(comps).map(([c, n]) => `${c} (${n})`).join(" · ")}</p>
      {guide && <details><summary>Qué evalúa el concurso y cómo lo cubre EDUCALEX</summary>
        <p className="aqr-muted">{guide.process}</p>
        {guide.blocks.map(bk => <div key={bk.name}><p><strong>{bk.name}</strong> — {bk.character}</p><ul>{bk.areas.map(a => <li key={a.name}><strong>{a.name}</strong> ({a.status}): {a.inEducalex}</li>)}</ul></div>)}
      </details>}
      <p className="aqr-muted">Para ver la experiencia como usuaria: <Link to={bank === "nucleo-comun" || bank === "todos" ? "/simulacros" : `/simulacros/${bank}`}>abrir el simulacro</Link>.</p>
    </section>

    <div className="aqr-filters">
      <div role="group" aria-label="Nivel">{[0, 1, 2, 3, 4].map(n => <button key={n} aria-pressed={level === n} onClick={() => setLevel(n)}>{n ? LEVEL_NAMES[n - 1] : "Todos"}</button>)}</div>
      <label className="aqr-search"><Search aria-hidden="true" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar en preguntas y normas" aria-label="Buscar" /></label>
      <label className="aqr-check"><input type="checkbox" checked={onlyPending} onChange={e => setOnlyPending(e.target.checked)} /> Solo sin aprobar</label>
      <button className="aqr-copy" onClick={copyFlagged}><ClipboardCopy aria-hidden="true" /> {copied ? "¡Copiado!" : `Copiar ajustes (${flagged.length})`}</button>
    </div>

    <ol className="aqr-list">{shown.map(x => {
      const r = review[x.id];
      return <li key={x.id} className={`aqr-item ${r?.status === "ok" ? "is-ok" : r?.status === "ajustar" ? "is-fix" : ""}`}>
        <p className="aqr-meta">{bank === "todos" && `${BANKS.find(b => questionsFor(b.key).some(y => y.id === x.id))?.label ?? ""} · `}{x.id} · Nivel {LEVEL_NAMES[(x.level ?? 1) - 1]} · {x.competency}</p>
        {x.context && <p className="aqr-context">{x.context}</p>}
        <p className="aqr-prompt">{x.prompt}</p>
        <ul className="aqr-options">{x.options.map((o, i) => <li key={i} className={i === x.correct ? "is-correct" : ""}><strong>{L[i]})</strong> {o}{i === x.correct && " ✓"}</li>)}</ul>
        <p className="aqr-exp"><strong>Explicación:</strong> {x.explanation}</p>
        <p className="aqr-ref"><strong>Norma:</strong> {x.reference}</p>
        <div className="aqr-actions">
          <button className={r?.status === "ok" ? "on ok" : ""} onClick={() => mark(x, "ok")}><CheckCircle2 aria-hidden="true" /> Aprobada</button>
          <button className={r?.status === "ajustar" ? "on fix" : ""} onClick={() => mark(x, "ajustar")}><Flag aria-hidden="true" /> Ajustar</button>
        </div>
        {r?.status === "ajustar" && <label className="aqr-note">Corrección<textarea rows={3} value={r.note} onChange={e => note(x, e.target.value)} placeholder="Escribe qué cambiar: enunciado, opción, respuesta correcta o norma" /></label>}
      </li>;
    })}</ol>
    {shown.length === 0 && <p>No hay preguntas con esos filtros.</p>}
  </div>;
}
