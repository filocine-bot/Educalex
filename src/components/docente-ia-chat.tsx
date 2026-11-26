import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Square, Info, Copy, Check, RotateCcw, Send, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getPage, type PagePath, isInConstruction } from "@/lib/educalex-sitemap";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { isArtifact } from "@/lib/runtime-mode";
import { useCapability } from "@/lib/claude-runtime";
import { SYSTEM_PROMPT, libraryContext, MAX_TURNS } from "@/lib/docente-ia-context";
import { listen, listeningSupported, saveVoiceName, savedVoiceName, speak, spanishVoices, speechSupported, stopSpeaking, voiceScore } from "@/lib/educatia-voice";
import { guidedAnswer } from "@/lib/educatia-guided";

type SampleFn = ((input: { role: "user" | "assistant"; content: string }[], opts?: { onText?: (e: { text: string }) => void; signal?: AbortSignal; cache?: boolean }) => Promise<{ text: string }>);

/** En el artefacto: pregunta a Claude desde la página (capacidad `sample`), sin servidor ni clave propia. */
async function askInArtifact(history: { role: "user" | "assistant"; content: string }[], category: string | null, signal: AbortSignal, onText: (t: string) => void) {
  const sample = await useCapability<SampleFn>("sample");
  if (!sample) throw Object.assign(new Error("unavailable"), { code: "not_granted" });
  const turns = history.slice(-MAX_TURNS);
  const instructions = SYSTEM_PROMPT + libraryContext() + (category ? `\n\nCategoría elegida por la persona usuaria: ${category}.` : "") + "\n\n---\nResponde ahora a la conversación siguiente.\n\n";
  const input = turns.map((t, i) => i === 0 ? { ...t, content: instructions + t.content } : t);
  const res = await sample(input, { signal, cache: false, onText: e => onText(e.text) });
  return res.text;
}

const categories: { name: string; related: PagePath[] }[] = [
  { name: "Carrera docente", related: ["/concursos", "/biblioteca/legislacion"] },
  { name: "Derechos y deberes", related: ["/biblioteca/legislacion", "/formacion/actualizacion-normativa"] },
  { name: "Ingreso y ascenso", related: ["/concursos/ingreso-docente", "/concursos/ascenso-reubicacion"] },
  { name: "Funciones de rector y coordinador", related: ["/concursos/rector", "/concursos/coordinador", "/formacion/liderazgo-directivo"] },
  { name: "Guía 34 y PMI", related: ["/formacion/guia-34-pmi", "/formacion/pmi", "/biblioteca/guias-men"] },
  { name: "PEI y gestión institucional", related: ["/formacion/pei", "/formacion/gestion-institucional"] },
  { name: "Inclusión, DUA y PIAR", related: ["/formacion/inclusion-dua-piar", "/biblioteca/legislacion"] },
  { name: "Convivencia escolar", related: ["/formacion/convivencia-escolar", "/biblioteca/legislacion"] },
  { name: "Educación emocional", related: ["/formacion/educacion-emocional"] },
  { name: "Educación rural y etnoeducación", related: ["/formacion/educacion-rural", "/biblioteca/recursos"] },
  { name: "STEAM y robótica", related: ["/formacion/steam-robotica", "/formacion/inteligencia-artificial"] },
  { name: "Planeación curricular y evaluación", related: ["/formacion/evaluacion-formativa"] },
];
const examples = ["¿Cómo aplicar el DUA en una clase de matemáticas de grado 5?", "Dame una actividad de convivencia escolar para grado 8.", "¿Cómo elaborar un PIAR para un estudiante con TDAH?"];

type Turn = { role: "user" | "assistant"; content: string };

export function DocenteIaChat() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [autoRead, setAutoRead] = useState(true);
  const [voices, setVoices] = useState<{ name: string; label: string }[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [voice, setVoice] = useState({ speak: false, listen: false });
  const stopListen = useRef<(() => void) | null>(null);
  useEffect(() => { setVoice({ speak: speechSupported(), listen: listeningSupported() }); return () => { stopSpeaking(); stopListen.current?.(); }; }, []);
  useEffect(() => {
    try { const v = window.localStorage.getItem("educatia-leer"); if (v === "0") setAutoRead(false); } catch { /* sin almacenamiento */ }
    if (!speechSupported()) return;
    // Las voces se cargan de forma asíncrona en algunos navegadores.
    const load = () => {
      const list = [...spanishVoices()].sort((a, b) => voiceScore(b) - voiceScore(a));
      setVoices(list.map(v => ({ name: v.name, label: `${v.name.replace(/^Microsoft |^Google /, "").replace(/ Online \(Natural\)/, " (natural)")} · ${v.lang}` })));
      setVoiceName(savedVoiceName() ?? list[0]?.name ?? "");
    };
    load();
    window.speechSynthesis.addEventListener?.("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", load);
  }, []);

  function readAloud(i: number, text: string) {
    if (speakingIndex === i) { stopSpeaking(); setSpeakingIndex(null); return; }
    if (speak(text, { onEnd: () => setSpeakingIndex(cur => (cur === i ? null : cur)) })) setSpeakingIndex(i);
  }

  function toggleListen() {
    if (listening) { stopListen.current?.(); return; }
    stopSpeaking(); setSpeakingIndex(null);
    const stop = listen({
      onText: (text) => setQuestion(text),
      onError: (m) => setVoiceStatus(m),
      onEnd: () => { setListening(false); stopListen.current = null; setVoiceStatus(v => (v.startsWith("Escuchando") ? "Pregunta lista. Revísala y pulsa Enviar." : v)); },
    });
    if (!stop) { setVoiceStatus("Tu navegador no permite dictar por voz. Prueba con Chrome o Edge."); return; }
    stopListen.current = stop; setListening(true); setVoiceStatus("Escuchando… haz tu pregunta.");
  }

  function finishAnswer(index: number, text: string) {
    if (autoRead && text) { if (speak(text, { onEnd: () => setSpeakingIndex(cur => (cur === index ? null : cur)) })) setSpeakingIndex(index); }
  }

  function answerGuided(history: Turn[], q: string) {
    const text = guidedAnswer(q);
    setTurns([...history, { role: "assistant", content: text }]);
    setError("");
    finishAnswer(history.length, text);
  }
  const related = (categories.find(c => c.name === category)?.related ?? []).filter(r => !isInConstruction(r));
  const ctrl = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  async function ask() {
    const q = question.trim();
    if (q.length < 5 || loading) return;
    const history: Turn[] = [...turns, { role: "user", content: q }];
    setTurns([...history, { role: "assistant", content: "" }]);
    setQuestion(""); setError(""); setLoading(true); setVoiceStatus(""); stopSpeaking(); setSpeakingIndex(null);
    const ac = new AbortController(); ctrl.current = ac;
    const append = (t: string) => setTurns(ts => { const copy = ts.slice(); const last = copy[copy.length - 1]; if (!last) return ts; copy[copy.length - 1] = { role: last.role, content: last.content + t }; return copy; });
    try {
      if (isArtifact) {
        try {
          const text = await askInArtifact(history, category, ac.signal, t => setTurns(ts => { const copy = ts.slice(); copy[copy.length - 1] = { role: "assistant", content: t }; return copy; }));
          setTurns(ts => { const copy = ts.slice(); copy[copy.length - 1] = { role: "assistant", content: text }; return copy; });
          finishAnswer(history.length, text);
        } catch (e) {
          const code = (e as { code?: string }).code;
          if ((e as Error).name === "AbortError") return;
          setError(code === "rate_limited" ? "Hay muchas consultas en este momento. Intenta de nuevo en un minuto." : code === "not_granted" ? "Para usar EducatIA, abre esta página en Claude y acepta el permiso de consulta." : "No fue posible generar la respuesta. Intenta de nuevo.");
          setTurns(history.slice(0, -1)); setQuestion(q);
        }
        return;
      }
      const res = await fetch("/api/docente-ia", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history, category }), signal: ac.signal });
      if (!res.ok || !res.body) { const j = await res.json().catch(() => ({})); if (res.status === 503 || res.status >= 500) { answerGuided(history, q); return; } setError(j.error ?? "No fue posible generar la respuesta."); setTurns(history.slice(0, -1)); setQuestion(q); return; }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = ""; let full = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n"); buf = lines.pop() ?? "";
        for (const l of lines) { if (!l) continue; const m = JSON.parse(l); if (m.t) { full += m.t; append(m.t); } if (m.error) setError(m.error); }
      }
      if (full) finishAnswer(history.length, full);
    } catch (e) { if ((e as Error).name !== "AbortError") answerGuided(history, q); }
    finally {
      setLoading(false); ctrl.current = null;
      setTurns(ts => (ts.at(-1)?.role === "assistant" && !ts.at(-1)?.content ? ts.slice(0, -1) : ts));
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  }

  async function copy(i: number, text: string) {
    try { await navigator.clipboard.writeText(text); setCopied(i); setTimeout(() => setCopied(null), 1800); } catch { /* el navegador no permitió copiar */ }
  }

  const started = turns.length > 0;
  const composer = <>
    <div className="ia-composer">
      {(voice.speak || voice.listen) && <div className="ia-voicebar" role="group" aria-label="Opciones de voz">
        {voice.listen && <Button type="button" size="lg" variant={listening ? "destructive" : "navy"} className="ia-mic" aria-pressed={listening} onClick={toggleListen}>{listening ? <><MicOff /> Dejar de escuchar</> : <><Mic /> Preguntar con mi voz</>}</Button>}
        {voice.speak && <label className="ia-toggle" htmlFor="educatia-autoread"><input id="educatia-autoread" type="checkbox" className="size-5" checked={autoRead} onChange={e => { setAutoRead(e.target.checked); try { window.localStorage.setItem("educatia-leer", e.target.checked ? "1" : "0"); } catch { /* sin almacenamiento */ } if (!e.target.checked) { stopSpeaking(); setSpeakingIndex(null); } }} /> <Volume2 className="size-4" aria-hidden="true" /> Leer respuestas en voz alta</label>}
        {voice.speak && voices.length > 1 && <label className="ia-voice-select" htmlFor="educatia-voice">Voz <select id="educatia-voice" value={voiceName} onChange={e => { setVoiceName(e.target.value); saveVoiceName(e.target.value); speak("Hola, soy EducatIA. Así sonará mi voz."); }}>{voices.map(v => <option key={v.name} value={v.name}>{v.label}</option>)}</select></label>}
      </div>}
      <p className="sr-only" role="status" aria-live="assertive">{voiceStatus}</p>
      {voiceStatus && <p className="mt-2 text-sm text-muted-foreground" aria-hidden="true">{voiceStatus}</p>}
      <Textarea className="mt-3 min-h-24" value={question} maxLength={4000} onChange={e => setQuestion(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); ask(); } }} placeholder={started ? "Haz una pregunta de seguimiento…" : "Escribe o dicta tu consulta: planeación, evaluación, inclusión, convivencia, concursos…"} aria-label="Consulta educativa" />
      <div className="mt-3 flex flex-wrap gap-3">
        {loading ? <Button variant="outline" onClick={() => ctrl.current?.abort()}><Square /> Detener</Button>
          : <Button onClick={ask} disabled={question.trim().length < 5}>{started ? <><Send /> Enviar</> : <><Sparkles /> Generar respuesta</>}</Button>}
        {started && !loading && <Button variant="outline" onClick={() => { setTurns([]); setError(""); }}><RotateCcw /> Nueva conversación</Button>}
      </div>
      {error && <p className="mt-3 text-sm text-destructive" role="alert">{error}</p>}
    </div>
  </>;
  return <section className="section site-container"><div className="ia-panel">
    <div className="eyebrow">EDUCATIA · ASISTENTE PEDAGÓGICO</div><h2>{started ? "Conversación" : "¿En qué te puedo ayudar hoy?"}</h2>
    {!started && composer}
    {!started && <>
      <div className="mt-3 flex flex-wrap gap-2">{examples.map(x => <button key={x} type="button" className="feature-tag" onClick={() => setQuestion(x)}>{x}</button>)}</div>
      <p className="mt-4 text-sm text-muted-foreground">Elige una categoría (opcional) para orientar tu consulta.</p>
      <div className="ia-cats" role="group" aria-label="Categorías de consulta">{categories.map(c => <button key={c.name} type="button" className="ia-cat" aria-pressed={category === c.name} onClick={() => setCategory(category === c.name ? null : c.name)}>{c.name}</button>)}</div>
    </>}
    {started && <div className="ia-thread" aria-live="polite">
      {turns.map((t, i) => t.role === "user"
        ? <div key={i} className="ia-msg ia-msg-user"><p>{t.content}</p></div>
        : <div key={i} className="ia-msg ia-msg-bot">
            {t.content ? <div className="ia-markdown"><ReactMarkdown components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}>{t.content}</ReactMarkdown></div> : <p className="section-description">Preparando la respuesta…</p>}
            {t.content && !(loading && i === turns.length - 1) && <div className="flex flex-wrap gap-2">
              {voice.speak && <button type="button" className="ia-copy min-h-11" aria-pressed={speakingIndex === i} onClick={() => readAloud(i, t.content)}>{speakingIndex === i ? <><VolumeX className="size-4" /> Detener lectura</> : <><Volume2 className="size-4" /> Escuchar respuesta</>}</button>}
              <button type="button" className="ia-copy min-h-11" onClick={() => copy(i, t.content)}>{copied === i ? <><Check className="size-4" /> Copiado</> : <><Copy className="size-4" /> Copiar</>}</button>
            </div>}
          </div>)}
      <div ref={endRef} />
    </div>}
    {started && composer}
    {related.length > 0 && <div className="mt-6"><p className="mb-2 text-sm font-semibold text-brand-blue">Cursos y documentos relacionados con «{category}»</p><div className="mod-related">{related.map(r => <Link key={r} to={r} className="mod-chip">{getPage(r)?.title}</Link>)}</div></div>}
    <p className="mt-5 flex gap-2 text-xs text-muted-foreground"><Info className="size-4 shrink-0" /> EducatIA responde con inteligencia artificial (Claude) como apoyo pedagógico; si el servicio no está disponible, responde en modo guiado con la biblioteca. La voz la producen tu navegador y su servicio de voz; EDUCALEX no graba audio. El asistente solo enlaza fuentes verificadas de la biblioteca EDUCALEX, pero puede equivocarse: confirma siempre la norma y su vigencia en la fuente oficial. No escribas datos personales de estudiantes.</p>
  </div></section>;
}
