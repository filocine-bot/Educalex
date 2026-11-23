import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, ClipboardCopy, Flag, Search } from "lucide-react";
import { libraryDocs } from "@/lib/educalex-sitemap";
import { keyPointsFor } from "@/lib/doc-key-points";
import { trainingCourses } from "@/lib/training-courses";
import { dilemmas } from "@/lib/dilemmas";
import { psychoItems, DIMENSIONS } from "@/lib/psicotecnica";
import { faqs } from "@/lib/faq";
import { aiTools } from "@/lib/ai-tools";
import { videoThemes } from "@/lib/official-videos";

type Item = { id: string; title: string; meta: string; text: string; body: ReactNode };
const KEY = "educalex-revision-contenidos";
type Review = Record<string, { status: "ok" | "ajustar"; note: string }>;

const P = ({ k, children }: { k: string; children: ReactNode }) => <p className="acr-row"><strong>{k}:</strong> {children}</p>;

function sections(): { key: string; label: string; items: Item[] }[] {
  return [
    { key: "biblioteca", label: `Biblioteca (${libraryDocs.length})`, items: libraryDocs.map(d => { const kp = keyPointsFor(d.id); return {
      id: `bib:${d.id}`, title: d.title, meta: `${d.tipo} · ${d.entidad} · ${d.anio ?? "s. f."} · ${d.categoria}`, text: `${d.nombreOficial} ${d.descripcion} ${d.notas}`,
      body: <>
        <P k="Nombre oficial">{d.nombreOficial}</P>
        <P k="Descripción">{d.descripcion}</P>
        <P k="Fuente">{d.fuenteUrl ? <a href={d.fuenteUrl} target="_blank" rel="noopener noreferrer">{d.fuenteUrl}</a> : "sin enlace"} {d.fuenteConsultada ? "· consultada" : "· pendiente de verificación"}</P>
        <P k="Nota">{d.notas}</P>
        {kp && <><p className="acr-row"><strong>Ideas clave:</strong></p><ul>{kp.points.map(p => <li key={p.label}><strong>{p.label}</strong> — {p.text} ({p.source})</li>)}</ul><P k="Para el examen">{kp.forExam.join(" ")}</P></>}
      </> }; }) },
    { key: "cursos", label: "Cursos de formación", items: Object.entries(trainingCourses).flatMap(([path, c]) => [
      { id: `cur:${path}:proposito`, title: `${path.replace("/formacion/", "")} — propósito y público`, meta: "Curso", text: c.purpose + c.audience, body: <><P k="Propósito">{c.purpose}</P><P k="Público">{c.audience}</P></> },
      ...c.units.map((u, i) => ({ id: `cur:${path}:u${i + 1}`, title: `${path.replace("/formacion/", "")} · Unidad ${i + 1}: ${u.title}`, meta: "Unidad", text: `${u.objective} ${u.explanation.join(" ")} ${u.example} ${u.activity}`,
        body: <><P k="Objetivo">{u.objective}</P>{u.explanation.map((e, j) => <p key={j} className="acr-row">{e}</p>)}<P k="Ejemplo">{u.example}</P><P k="Actividad">{u.activity}</P><P k="Lecturas">{u.readings.map(r => `${r.docId}: ${r.focus}`).join(" · ")}</P></> })),
      { id: `cur:${path}:taller`, title: `${path.replace("/formacion/", "")} · Taller: ${c.workshop.title}`, meta: "Taller", text: c.workshop.scenario, body: <><P k="Escenario">{c.workshop.scenario}</P><ul>{c.workshop.fields.map(f => <li key={f.key}><strong>{f.label}</strong> — {f.hint}</li>)}</ul><P k="Revisión">{c.workshop.review.join(" · ")}</P></> },
    ]) },
    { key: "dilemas", label: `Dilemas (${dilemmas.length})`, items: dilemmas.map(d => ({ id: `dil:${d.id}`, title: d.title, meta: d.area, text: `${d.situation} ${d.question}`,
      body: <><P k="Situación">{d.situation}</P><P k="Pregunta">{d.question}</P><ul>{d.options.map((o, i) => <li key={i}>{o.text} <em>— prioriza: {o.prioritizes}. {o.consequence}</em></li>)}</ul><P k="Orientación">{d.orientation}</P><P k="Normas">{d.norms.join(" · ")}</P></> })) },
    { key: "psico", label: `Psicotécnica (${psychoItems.length})`, items: psychoItems.map(p => ({ id: `psi:${p.id}`, title: p.situation, meta: "Situación", text: p.situation,
      body: <ul>{p.options.map((o, i) => <li key={i}>{o.text} <em>— {DIMENSIONS[o.dimension].name}</em></li>)}</ul> })) },
    { key: "faq", label: `Preguntas frecuentes (${faqs.length})`, items: faqs.map((f, i) => ({ id: `faq:${i}`, title: f.q, meta: `${f.group}${f.home ? " · aparece en inicio" : ""}`, text: f.a, body: <p className="acr-row">{f.a}</p> })) },
    { key: "ia", label: `Herramientas IA (${aiTools.length})`, items: aiTools.map(t => ({ id: `ia:${t.id}`, title: t.name, meta: `${t.category} · ${t.cost}`, text: t.purpose,
      body: <><P k="Para qué sirve">{t.purpose}</P><ul>{t.ideas.map(x => <li key={x}>{x}</li>)}</ul><P k="Enlace"><a href={t.url} target="_blank" rel="noopener noreferrer">{t.url}</a></P></> })) },
    { key: "videos", label: "Videos MEN", items: videoThemes.map(v => ({ id: `vid:${v.id}`, title: v.title, meta: `${v.videos.length} videos`, text: v.description,
      body: <><P k="Descripción">{v.description}</P><ul>{v.videos.map(x => <li key={x.id}>{x.title} · {x.author} · {x.date}</li>)}</ul></> })) },
  ];
}

/** Revisión de los contenidos de la página para la administradora. Las marcas se guardan en este navegador. */
export function AdminContentReview() {
  const all = sections();
  const [tab, setTab] = useState(all[0]!.key);
  const [q, setQ] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);
  const [review, setReview] = useState<Review>({});
  const [copied, setCopied] = useState(false);
  useEffect(() => { try { setReview(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Review); } catch { /* vacío */ } }, []);
  const save = (n: Review) => { setReview(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* sin almacenamiento */ } };
  const sec = all.find(s => s.key === tab) ?? all[0]!;
  const shown = sec.items.filter(x => (!onlyPending || review[x.id]?.status !== "ok") && (!q.trim() || `${x.title} ${x.text}`.toLowerCase().includes(q.trim().toLowerCase())));
  const done = sec.items.filter(x => review[x.id]?.status === "ok").length;
  const flagged = Object.entries(review).filter(([, r]) => r.status === "ajustar");
  const byId = new Map(all.flatMap(s => s.items.map(i => [i.id, i] as const)));
  async function copy() {
    const t = flagged.map(([id, r]) => `${id} — ${byId.get(id)?.title ?? ""}\nCorrección: ${r.note || "(sin nota)"}`).join("\n\n");
    try { await navigator.clipboard.writeText(t || "No hay contenidos marcados para ajustar."); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* sin portapapeles */ }
  }
  return <div className="aqr">
    <p className="aqr-intro">Aquí está el contenido de la página: biblioteca, cursos, dilemas, psicotécnica, preguntas frecuentes, herramientas de IA y videos. Marca cada elemento como <strong>Aprobado</strong> o <strong>Ajustar</strong> con tu corrección, y al final usa <strong>Copiar ajustes</strong> y pégalos en el chat.</p>
    <div className="aqr-tabs" role="tablist" aria-label="Sección">{all.map(s => <button key={s.key} role="tab" aria-selected={tab === s.key} onClick={() => setTab(s.key)}>{s.label}</button>)}</div>
    <p className="aqr-muted">Revisados en esta sección: <strong>{done}/{sec.items.length}</strong></p>
    <div className="aqr-filters">
      <label className="aqr-search"><Search aria-hidden="true" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" aria-label="Buscar" /></label>
      <label className="aqr-check"><input type="checkbox" checked={onlyPending} onChange={e => setOnlyPending(e.target.checked)} /> Solo sin aprobar</label>
      <button className="aqr-copy" onClick={copy}><ClipboardCopy aria-hidden="true" /> {copied ? "¡Copiado!" : `Copiar ajustes (${flagged.length})`}</button>
    </div>
    <ol className="aqr-list">{shown.map(x => { const r = review[x.id]; return <li key={x.id} className={`aqr-item ${r?.status === "ok" ? "is-ok" : r?.status === "ajustar" ? "is-fix" : ""}`}>
      <p className="aqr-meta">{x.meta}</p>
      <p className="aqr-prompt">{x.title}</p>
      <div className="acr-body">{x.body}</div>
      <div className="aqr-actions">
        <button className={r?.status === "ok" ? "on ok" : ""} onClick={() => save({ ...review, [x.id]: { status: "ok", note: r?.note ?? "" } })}><CheckCircle2 aria-hidden="true" /> Aprobado</button>
        <button className={r?.status === "ajustar" ? "on fix" : ""} onClick={() => save({ ...review, [x.id]: { status: "ajustar", note: r?.note ?? "" } })}><Flag aria-hidden="true" /> Ajustar</button>
      </div>
      {r?.status === "ajustar" && <label className="aqr-note">Corrección<textarea rows={3} value={r.note} onChange={e => save({ ...review, [x.id]: { status: "ajustar", note: e.target.value } })} placeholder="Escribe qué cambiar" /></label>}
    </li>; })}</ol>
    {shown.length === 0 && <p>No hay elementos con esos filtros.</p>}
  </div>;
}
