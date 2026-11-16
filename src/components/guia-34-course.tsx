import { ExternalLink, FileText, Users } from "lucide-react";
import { GUIA34_INDEX_URL, GUIA34_UPDATE_URL, guia34Units } from "@/lib/guia-34-content";
import { UnitCompletion } from "./learning-account";
import { PmiWorkshop } from "@/components/pmi-workshop";

export function Guia34Course() {
  return <div className="course-content">
    <section className="course-intro" aria-labelledby="course-purpose">
      <div><span className="course-kicker">CURSO ABIERTO DE ESTUDIO</span><h2 id="course-purpose">De la autoevaluación a un PMI que se pueda seguir</h2></div>
      <p className="course-lead">El propósito es que docentes, coordinadores y rectores comprendan la ruta de mejoramiento, analicen evidencias y conviertan un hallazgo prioritario en acciones coherentes. La inscripción y el progreso personal son gratuitos al ingresar; no hay evaluación certificable.</p>
      <div className="course-audience"><Users /><span><strong>Perfil destinatario:</strong> docentes que participan en la autoevaluación, coordinadores que acompañan procesos pedagógicos y rectores que orientan la gestión institucional.</span></div>
    </section>

    <section className="course-source-box" aria-labelledby="source-distinction">
      <FileText />
      <div><h2 id="source-distinction">Guía metodológica, no disposición normativa</h2>
        <p>La Guía 34 histórica orientó procesos de autoevaluación y mejoramiento. El MEN también publica una página denominada <strong>«Ruta de Mejoramiento Institucional para una Educación de Calidad. Actualización de la Guía N.° 34»</strong>, actualizada el 5 de agosto de 2026 y con acceso a un PDF.</p>
        <p>EDUCALEX comprobó ambas páginas institucionales, pero no afirma haber leído completo el PDF. Este curso es una explicación pedagógica propia: no reproduce la guía, no atribuye validez normativa a sus ejercicios y no presenta la actualización como «normativa nueva».</p>
        <div className="doc-actions-inline">
          <a className="doc-action" href={GUIA34_INDEX_URL} target="_blank" rel="noopener noreferrer"><ExternalLink /> Índice de Referentes de calidad</a>
          <a className="doc-action doc-action-primary" href={GUIA34_UPDATE_URL} target="_blank" rel="noopener noreferrer"><ExternalLink /> Página oficial de la actualización</a>
        </div>
      </div>
    </section>

    <section className="course-section" aria-labelledby="units-title">
      <div className="course-section-heading"><div><span className="course-kicker">RUTA DE APRENDIZAJE</span><h2 id="units-title">Ocho unidades para comprender y aplicar</h2></div><span className="course-tag">Lectura y ejercicio por unidad</span></div>
      <div className="course-units">{guia34Units.map((unit, index) => <article className="course-unit" key={unit.title}>
        <div className="course-unit-number">{String(index + 1).padStart(2, "0")}</div>
        <div><h3>{unit.title}</h3><p className="course-objective"><strong>Objetivo:</strong> {unit.objective}</p>
          {unit.explanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="course-application"><strong>Ponlo en práctica</strong><p>{unit.application}</p></div><UnitCompletion path="/formacion/guia-34-pmi" unit={index + 1} />
        </div>
      </article>)}</div>
    </section>

    <section className="course-section" aria-labelledby="example-title">
      <div className="course-section-heading"><div><span className="course-kicker">EJEMPLO COMPLETAMENTE FICTICIO</span><h2 id="example-title">Institución Educativa Rural El Arrayán</h2></div></div>
      <div className="mod-notice"><p>La institución, el municipio, las personas y todos los datos de este ejemplo son inventados con fines didácticos. No describen una escuela real ni constituyen resultados oficiales.</p></div>
      <div className="example-grid">
        <article><h3>Contexto</h3><p>Escuela rural ficticia con 84 estudiantes, seis docentes, aulas multigrado e internet intermitente. El equipo quiere fortalecer la comprensión lectora sin convertir el PMI en una lista de actividades desconectadas.</p></article>
        <article><h3>Hallazgo y evidencia</h3><p>En una aplicación institucional ficticia de febrero, 12 de 30 estudiantes de los grados tercero a quinto alcanzaron el desempeño esperado en una rúbrica de lectura creada para el ejemplo. El equipo también revisó 30 producciones y registró dificultades para explicar ideas implícitas. La muestra y la rúbrica solo sirven para este caso inventado.</p></article>
        <article><h3>Prioridad razonada</h3><p>El equipo ficticio priorizó este hallazgo por su incidencia en varios grados y porque podía actuar con materiales disponibles y lecturas del entorno. Dejó documentado que necesitaba otra medición antes de atribuir causas.</p></article>
      </div>
      <div className="example-plan">
        <h3>Una acción coherente del PMI ficticio</h3>
        <dl>
          <dt>Objetivo</dt><dd>Fortalecer la comprensión de ideas explícitas e implícitas mediante lectura dialogada y producción de textos breves.</dd>
          <dt>Meta</dt><dd>Que al cierre de julio 22 de los mismos 30 estudiantes alcancen el desempeño esperado en una segunda aplicación de la rúbrica ficticia.</dd>
          <dt>Indicador</dt><dd>Porcentaje de estudiantes que alcanza el desempeño esperado: número que lo alcanza ÷ 30 × 100. Línea de base ficticia: 40 %; meta ficticia: 73,3 %.</dd>
          <dt>Actividades</dt><dd>Tres sesiones semanales de lectura dialogada, una producción escrita quincenal y revisión mensual de trabajos con una pauta común.</dd>
          <dt>Responsables y plazo</dt><dd>Docentes de los tres grupos y coordinación académica ficticios, de febrero a julio; las familias reciben lecturas impresas cuando no hay conectividad.</dd>
          <dt>Seguimiento</dt><dd>Revisión mensual de participación y producciones; comparación en julio con la misma rúbrica. El equipo ajustará apoyos sin afirmar que el número de sesiones, por sí solo, demuestra aprendizaje.</dd>
        </dl>
      </div>
    </section>

    <PmiWorkshop />
  </div>;
}
