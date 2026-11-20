import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, BookOpenCheck, ClipboardList, FileSearch, Mail, MessageCircle, Mic, Target, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { LEGAL_OWNER } from "@/lib/legal-content";

const page = pages["/asesoria-investigacion"];
export const Route = createFileRoute("/asesoria-investigacion")({ head: () => pageHead(page.title, page.description), component: Asesoria });

const services: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: "Problema, pregunta y objetivos", text: "Delimitar el problema y lograr coherencia entre la pregunta, los objetivos y la justificación." },
  { icon: ClipboardList, title: "Diseño metodológico", text: "Enfoque cualitativo, cuantitativo o mixto; paradigma, método, participantes y consideraciones éticas." },
  { icon: FileSearch, title: "Antecedentes y marco teórico", text: "Búsqueda en bases de datos académicas, síntesis crítica de la literatura y normas APA 7." },
  { icon: BookOpenCheck, title: "Instrumentos", text: "Guías de entrevista, grupos focales, observación y cuestionarios, con su validación." },
  { icon: BarChart3, title: "Análisis e interpretación", text: "Codificación, categorías, triangulación y redacción de hallazgos, discusión y conclusiones." },
  { icon: Mic, title: "Sustentación y publicación", text: "Preparación de la defensa ante jurados y adaptación del trabajo a artículo científico." },
];
const levels = ["Pregrado", "Especialización", "Maestría", "Doctorado", "Proyecto de aula o institucional", "Otro"];
const steps = ["Escríbenos con el nivel y el tipo de apoyo que necesitas.", "Hacemos un diagnóstico inicial de tu proyecto.", "Recibes una propuesta con sesiones y valor.", "Trabajamos por etapas en sesiones virtuales."];
const digits = LEGAL_OWNER.phone.replace(/\D/g, "");

function Asesoria() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(levels[2]);
  const [topic, setTopic] = useState("");
  const [need, setNeed] = useState("Problema, pregunta y objetivos");
  const message = `Hola, Dra. Enadis. Soy ${name.trim() || "[tu nombre]"}. Quiero una asesoría en investigación.\nNivel: ${level}\nApoyo que necesito: ${need}\nTema o proyecto: ${topic.trim() || "[describe brevemente]"}`;
  const ready = name.trim().length > 1 && topic.trim().length > 5;
  const send = (e: FormEvent) => { e.preventDefault(); if (ready) window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`, "_blank", "noopener"); };

  return <ModulePage path="/asesoria-investigacion" showItems={false} tight>
    <p className="adv-lead">La Dra. Enadis Ester Vargas Hernández, doctora en Ciencias de la Educación y especialista en Investigación Aplicada a la Educación, acompaña a estudiantes, docentes e instituciones en todas las etapas de un proyecto de investigación.</p>
    <div className="adv-grid">{services.map(s => <article key={s.title} className="adv-card"><span className="adv-icon"><s.icon aria-hidden="true" /></span><h2>{s.title}</h2><p>{s.text}</p></article>)}</div>

    <section className="adv-steps" aria-labelledby="adv-steps-title">
      <h2 id="adv-steps-title">Cómo funciona</h2>
      <ol>{steps.map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}</ol>
    </section>

    <p className="adv-integrity"><strong>Compromiso ético:</strong> la asesoría orienta, revisa y fortalece tu trabajo. No se redactan tesis ni trabajos para que los presentes como propios: la autoría y las decisiones de la investigación son tuyas.</p>

    <form className="adv-form" onSubmit={send} aria-labelledby="adv-form-title">
      <h2 id="adv-form-title">Solicita tu asesoría</h2>
      <label>Tu nombre<input value={name} onChange={e => setName(e.target.value)} autoComplete="name" required /></label>
      <label>Nivel<select value={level} onChange={e => setLevel(e.target.value)}>{levels.map(l => <option key={l}>{l}</option>)}</select></label>
      <label>¿En qué necesitas apoyo?<select value={need} onChange={e => setNeed(e.target.value)}>{services.map(s => <option key={s.title}>{s.title}</option>)}</select></label>
      <label className="adv-wide">Tema o proyecto<textarea rows={3} value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ejemplo: tesis de maestría sobre convivencia escolar en una institución rural" required /></label>
      <p className="adv-privacy adv-wide">No incluyas datos personales de participantes ni información confidencial de tu investigación en este primer mensaje.</p>
      <div className="adv-actions adv-wide">
        <Button type="submit" variant="hero" disabled={!ready}><MessageCircle aria-hidden="true" /> Enviar por WhatsApp</Button>
        <Button variant="outline" asChild><a href={`mailto:${LEGAL_OWNER.email}?subject=${encodeURIComponent("Asesoría en investigación")}&body=${encodeURIComponent(message)}`}><Mail aria-hidden="true" /> Enviar por correo</a></Button>
      </div>
    </form>
  </ModulePage>;
}
