import { ArrowDown, ArrowRight, BookOpenCheck, Building2, ClipboardList, Flag, GraduationCap, Handshake, Layers, LineChart, Megaphone, PiggyBank, Repeat, Scale, Search, Target, Users, Wallet, type LucideIcon } from "lucide-react";

/** Infografías del curso Guía 34 (actualización 2026). Nombres de etapas, pasos, áreas, procesos y escala tomados del documento del MEN. */

const STAGES: { n: number; title: string; tone: string; icon: LucideIcon; steps: string[] }[] = [
  { n: 1, title: "Autoevaluación institucional", tone: "a", icon: Search, steps: ["Lectura de contexto", "Evaluación de las áreas de gestión", "Perfil institucional", "Fortalezas y oportunidades de mejoramiento"] },
  { n: 2, title: "Plan de Mejoramiento Institucional (anual)", tone: "b", icon: ClipboardList, steps: ["Objetivo a partir de factores críticos", "Metas", "Indicadores de resultados", "Acciones y responsabilidades", "Programación anual", "Gestión de recursos", "Socialización y apropiación comunitaria"] },
  { n: 3, title: "Seguimiento de avances y resultados", tone: "c", icon: LineChart, steps: ["¿Cómo podemos hacer seguimiento?", "¿Qué aprendimos y cómo lo comprendemos juntos?", "¿Qué cambiaremos a partir de esos aprendizajes?"] },
];

export function RutaInfographic() {
  return <figure className="g34-info" aria-label="Ruta de mejoramiento institucional en tres etapas">
    <div className="g34-ruta">{STAGES.map((s, i) => <div key={s.n} className="g34-stage-wrap">
      <section className={`g34-stage tone-${s.tone}`}>
        <header><span className="g34-num">{s.n}</span><s.icon aria-hidden="true" /><strong>{s.title}</strong></header>
        <ol>{s.steps.map(st => <li key={st}>{st}</li>)}</ol>
      </section>
      {i < STAGES.length - 1 && <ArrowRight className="g34-arrow" aria-hidden="true" />}
    </div>)}</div>
    <p className="g34-loop"><Repeat aria-hidden="true" /> El seguimiento retroalimenta la gestión y abre un nuevo ciclo de mejoramiento.</p>
  </figure>;
}

type Area = { title: string; tone: string; icon: LucideIcon; processes: { name: string; icon: LucideIcon }[] };
export const AREAS: Record<"directiva" | "academica" | "administrativa" | "comunidad", Area> = {
  directiva: { title: "Gestión directiva y estratégica", tone: "a", icon: Flag, processes: [
    { name: "Direccionamiento y gestión estratégica", icon: Target },
    { name: "Gobierno escolar, instancias y otros mecanismos de participación", icon: Users },
    { name: "Cultura institucional", icon: Building2 },
    { name: "Ambiente y clima escolar", icon: Handshake },
    { name: "Estrategias para el bienestar y la permanencia de estudiantes", icon: GraduationCap },
  ] },
  academica: { title: "Gestión académica y pedagógica", tone: "b", icon: GraduationCap, processes: [
    { name: "Diseño pedagógico", icon: Layers },
    { name: "Prácticas pedagógicas y gestión de aula", icon: BookOpenCheck },
    { name: "Acompañamiento y seguimiento académico", icon: LineChart },
  ] },
  administrativa: { title: "Gestión administrativa y financiera", tone: "c", icon: Wallet, processes: [
    { name: "Apoyo al proceso de gestión de la cobertura educativa", icon: Users },
    { name: "Administración de la planta física y de los recursos", icon: Building2 },
    { name: "Talento humano", icon: Handshake },
    { name: "Apoyo financiero y contable", icon: PiggyBank },
  ] },
  comunidad: { title: "Gestión de la comunidad", tone: "d", icon: Users, processes: [
    { name: "Accesibilidad", icon: Handshake },
    { name: "Proyección a la comunidad", icon: Megaphone },
    { name: "Participación y convivencia", icon: Scale },
  ] },
};

export function AreaInfographic({ area }: { area: keyof typeof AREAS }) {
  const a = AREAS[area];
  return <figure className={`g34-info g34-area tone-${a.tone}`} aria-label={`${a.title}: procesos`}>
    <header><a.icon aria-hidden="true" /><strong>{a.title}</strong><small>{a.processes.length} procesos</small></header>
    <ul>{a.processes.map(p => <li key={p.name}><p.icon aria-hidden="true" /><span>{p.name}</span></li>)}</ul>
  </figure>;
}

const LEVELS = [
  { name: "Existencia", text: "Lo hay, pero es parcial y poco conectado con la vida institucional." },
  { name: "Pertinencia", text: "Se construye con participación y responde al contexto y a los estudiantes." },
  { name: "Apropiación", text: "La comunidad lo conoce y lo usa en la práctica diaria." },
  { name: "Mejoramiento continuo", text: "Se evalúa y se ajusta de manera periódica con evidencias." },
];

export function EscalaInfographic() {
  return <figure className="g34-info" aria-label="Escala de valoración de la autoevaluación">
    <div className="g34-stairs">{LEVELS.map((l, i) => <div key={l.name} className={`g34-step lvl-${i + 1}`} style={{ marginTop: `${(LEVELS.length - 1 - i) * 1.6}rem` }}>
      <span className="g34-num">{i + 1}</span><strong>{l.name}</strong><small>{l.text}</small>
    </div>)}</div>
    <figcaption>Los cuatro niveles son los de la escala de la actualización 2026 (Anexo 1). Las descripciones breves son una síntesis de EDUCALEX; consulta los descriptores completos en el documento del MEN.</figcaption>
  </figure>;
}

export function HallazgoInfographic() {
  const parts = [
    { t: "Situación observada", e: "Tres de cinco actas no registran acuerdos de seguimiento." },
    { t: "Evidencia", e: "Revisión de las actas del primer semestre." },
    { t: "Proceso o población afectada", e: "Gobierno escolar y participación." },
    { t: "Límite de la información", e: "No se revisaron los correos ni las circulares." },
  ];
  return <figure className="g34-info" aria-label="Partes de un hallazgo">
    <div className="g34-build">{parts.map((p, i) => <div key={p.t} className="g34-piece"><span className="g34-num">{i + 1}</span><strong>{p.t}</strong><small>Ej.: {p.e}</small></div>)}</div>
    <figcaption><strong>Hecho, no conclusión:</strong> «no hay compromiso directivo» sería una interpretación que exige más evidencia.</figcaption>
  </figure>;
}

export function PriorizacionInfographic() {
  const criteria = ["Incidencia en aprendizajes y bienestar", "Riesgo o urgencia", "Equidad", "Magnitud del efecto", "Viabilidad"];
  return <figure className="g34-info" aria-label="De los hallazgos a las prioridades">
    <div className="g34-funnel">
      <div className="g34-funnel-row w1"><strong>Fortalezas y oportunidades de mejoramiento</strong><small>Paso 4 de la autoevaluación</small></div>
      <ArrowDown aria-hidden="true" />
      <div className="g34-funnel-row w2"><strong>Criterios de priorización</strong><span className="g34-chips">{criteria.map(c => <em key={c}>{c}</em>)}</span></div>
      <ArrowDown aria-hidden="true" />
      <div className="g34-funnel-row w3"><strong>Pocas prioridades → factores críticos</strong><small>Base del objetivo del PMI</small></div>
    </div>
    <figcaption>Los criterios son una orientación de EDUCALEX para deliberar, no una fórmula oficial.</figcaption>
  </figure>;
}

export function PmiInfographic() {
  const chain = ["Objetivo", "Metas", "Indicadores", "Acciones y responsables", "Programación anual", "Recursos", "Socialización"];
  return <figure className="g34-info" aria-label="Cadena del Plan de Mejoramiento Institucional">
    <ol className="g34-chain">{chain.map((c, i) => <li key={c}><span className="g34-num">{i + 1}</span>{c}</li>)}</ol>
    <figcaption><strong>Regla de coherencia:</strong> la meta responde al hallazgo, el indicador mide la meta y cada acción tiene responsable y fecha. Un porcentaje de actividades cumplidas no prueba que se logró el resultado.</figcaption>
  </figure>;
}
