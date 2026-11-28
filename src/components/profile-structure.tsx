import { ArrowDown, BadgeCheck, BookOpenText, Brain, Calculator, CalendarClock, ClipboardList, Clock3, GraduationCap, HeartHandshake, Info, Landmark, MessagesSquare, PenLine, Scale, School, Users, type LucideIcon } from "lucide-react";
import type { SimulationProfile } from "@/lib/simulation-bank";

type Chip = { icon: LucideIcon; text: string };

const COMMON: Chip[] = [
  { icon: BookOpenText, text: "Lectura crítica" },
  { icon: Calculator, text: "Razonamiento cuantitativo" },
  { icon: HeartHandshake, text: "Competencias blandas: liderazgo, ética, trabajo en equipo y ciudadanía" },
];

const CNSC: Record<"ingreso-docente" | "coordinador" | "rector", { cargo: string; min: number; own: Chip[]; ownNote?: string; cases: string }> = {
  "ingreso-docente": {
    cargo: "Docente de aula y docente orientador", min: 60,
    own: [{ icon: GraduationCap, text: "Conocimientos disciplinares del área del empleo" }, { icon: PenLine, text: "Competencias pedagógicas: enseñar, evaluar e incluir" }],
    cases: "Casos de aula: planear una clase, evaluar, ajustar para un estudiante, enseñar un contenido del área.",
  },
  coordinador: {
    cargo: "Coordinador (directivo docente)", min: 70,
    own: [{ icon: Users, text: "Gestión directiva" }, { icon: Landmark, text: "Gestión administrativa y financiera" }, { icon: GraduationCap, text: "Gestión académica" }],
    ownNote: "División usada en el concurso 2022; confírmala en la guía 2026.",
    cases: "Casos de institución: acompañamiento a docentes, convivencia, gobierno escolar y mejoramiento institucional.",
  },
  rector: {
    cargo: "Rector (directivo docente)", min: 70,
    own: [{ icon: Users, text: "Gestión directiva" }, { icon: Landmark, text: "Gestión administrativa y financiera" }, { icon: GraduationCap, text: "Gestión académica" }],
    ownNote: "División usada en el concurso 2022; confírmala en la guía 2026.",
    cases: "Casos de institución: PEI, gobierno escolar, presupuesto y Fondo de Servicios Educativos, convivencia y mejoramiento institucional.",
  },
};

/** Infografía de la estructura de la prueba según el cargo. */
export function ProfileStructure({ profile }: { profile: SimulationProfile }) {
  return profile === "ascenso-reubicacion" ? <AscensoStructure /> : <CnscStructure profile={profile} />;
}

function CnscStructure({ profile }: { profile: "ingreso-docente" | "coordinador" | "rector" }) {
  const d = CNSC[profile];
  return <section className="pst" aria-labelledby="pst-title">
    <header className="pst-head">
      <span className="pst-kicker">Concurso CNSC · {d.cargo}</span>
      <h2 id="pst-title">Estructura de la prueba</h2>
    </header>

    <ol className="pst-flow">
      <li className="pst-step is-main">
        <span className="pst-num">1</span>
        <div className="pst-step-body">
          <div className="pst-step-top"><strong>Prueba de aptitudes y competencias básicas</strong><span className="pst-tag is-elim">Eliminatoria</span></div>
          <p className="pst-score"><span>{d.min}</span>/100 es el puntaje mínimo para seguir</p>
          <div className="pst-parts">
            <div className="pst-part">
              <h3>Componentes comunes</h3>
              <ul>{COMMON.map(c => <li key={c.text}><c.icon aria-hidden="true" />{c.text}</li>)}</ul>
            </div>
            <div className="pst-part is-own">
              <h3>Conocimientos disciplinares y competencias pedagógicas</h3>
              <ul>{d.own.map(c => <li key={c.text}><c.icon aria-hidden="true" />{c.text}</li>)}</ul>
              {d.ownNote && <small>{d.ownNote}</small>}
            </div>
          </div>
          <p className="pst-cases"><School aria-hidden="true" /> {d.cases}</p>
        </div>
      </li>
      <li className="pst-arrow" aria-hidden="true"><ArrowDown /></li>
      <li className="pst-step">
        <span className="pst-num">2</span>
        <div className="pst-step-body">
          <div className="pst-step-top"><strong><Brain aria-hidden="true" /> Prueba psicotécnica</strong><span className="pst-tag">Clasificatoria</span></div>
          <p>Se aplica el mismo día y en la misma sesión que la prueba escrita.</p>
        </div>
      </li>
      <li className="pst-arrow" aria-hidden="true"><ArrowDown /></li>
      <li className="pst-step">
        <span className="pst-num">3</span>
        <div className="pst-step-body">
          <div className="pst-step-top"><strong><MessagesSquare aria-hidden="true" /> Valoración de antecedentes y entrevista</strong><span className="pst-tag">Clasificatoria</span></div>
          <p>Solo para quienes superan la prueba eliminatoria.</p>
        </div>
      </li>
    </ol>

    <div className="pst-pending">
      <h3><Clock3 aria-hidden="true" /> Todavía no es oficial</h3>
      <ul>
        <li><strong>Número de preguntas y tiempo:</strong> los fijará la Guía de orientación al aspirante que publica la CNSC antes de la prueba.</li>
        <li><strong>Peso de cada componente y de cada prueba:</strong> lo define el Acuerdo de tu convocatoria.</li>
      </ul>
    </div>
    <p className="pst-source"><Info aria-hidden="true" /> Fuentes: Decreto 2038 de 2016 y Anexo Técnico del concurso docente 2026 (CNSC), numerales 2 y 2.1. Revisado el 22 de noviembre de 2026; confírmalo en www.cnsc.gov.co.</p>
  </section>;
}

const PARTS = [
  { label: "Prueba pedagógica escrita", range: "0 a 45", max: 45, tone: "a" },
  { label: "Experiencia", range: "14 a 20", max: 20, tone: "b" },
  { label: "Zona de desempeño", range: "12 a 15", max: 15, tone: "c" },
  { label: "Movimientos en el escalafón", range: "7 a 15", max: 15, tone: "d" },
  { label: "Autoevaluación", range: "0 a 5", max: 5, tone: "e" },
];

function AscensoStructure() {
  return <section className="pst" aria-labelledby="pst-title">
    <header className="pst-head">
      <span className="pst-kicker">MEN · Resolución 018987 de 2025 · Decreto Ley 1278 de 2002</span>
      <h2 id="pst-title">Estructura de la evaluación para ascenso o reubicación</h2>
      <p>Es diagnóstica formativa y voluntaria. No es el concurso de ingreso de la CNSC.</p>
    </header>

    <div className="pst-block">
      <h3><ClipboardList aria-hidden="true" /> Requisitos para participar <small>(art. 7)</small></h3>
      <ol className="pst-req">
        <li><BadgeCheck aria-hidden="true" /><span>Estar inscrito en el escalafón con derechos de carrera.</span></li>
        <li><CalendarClock aria-hidden="true" /><span>Tres años de servicio desde la primera posesión en período de prueba. Los contratos de prestación de servicios no cuentan.</span></li>
        <li><Scale aria-hidden="true" /><span>60 % o más en <strong>cada una</strong> de las dos últimas evaluaciones de desempeño. No se promedian.</span></li>
      </ol>
    </div>

    <div className="pst-block">
      <h3><PenLine aria-hidden="true" /> Instrumentos y puntajes <small>(arts. 9 a 15)</small></h3>
      <div className="pst-bar" role="img" aria-label="Distribución de puntos: prueba pedagógica hasta 45, experiencia hasta 20, zona de desempeño hasta 15, movimientos en el escalafón hasta 15 y autoevaluación hasta 5">
        {PARTS.map(p => <span key={p.label} className={`pst-seg tone-${p.tone}`} style={{ flexGrow: p.max }}>{p.max}</span>)}
      </div>
      <ul className="pst-legend">{PARTS.map(p => <li key={p.label}><span className={`pst-dot tone-${p.tone}`} aria-hidden="true" /><strong>{p.label}</strong><em>{p.range} puntos</em></li>)}</ul>
    </div>

    <div className="pst-block pst-two">
      <div>
        <h3><GraduationCap aria-hidden="true" /> La prueba pedagógica <small>(art. 10)</small></h3>
        <p>Es escrita. La diseña, aplica y califica una universidad pública acreditada, contratada por el Ministerio.</p>
      </div>
      <div>
        <h3><School aria-hidden="true" /> Marco para docentes <small>(art. 10)</small></h3>
        <ul className="pst-chips"><li>Contexto de la práctica</li><li>Reflexión y planeación</li><li>Praxis pedagógica</li><li>Ambiente en el aula</li></ul>
        <small>Rectores, directivos rurales y coordinadores tienen marcos propios de dirección o coordinación y ambiente institucional.</small>
      </div>
    </div>

    <p className="pst-source"><Info aria-hidden="true" /> Fuente: Resolución MEN 018987 del 17 de septiembre de 2025. Verifica si hay modificaciones y revisa la convocatoria que te aplica.</p>
  </section>;
}
