import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText, Calculator, Clock3, GraduationCap, HeartHandshake, School, UserCheck } from "lucide-react";

/** Infografía resumen de la prueba del concurso para la página de inicio. */
export function ExamInfographic() {
  return <div className="exi" aria-labelledby="exi-title">
    <h3 id="exi-title">Así es la prueba del concurso, en resumen</h3>
    <p className="exi-sub">Prueba de aptitudes y competencias básicas · <strong>eliminatoria</strong> · misma sesión que la psicotécnica</p>
    <div className="exi-common">
      <span className="exi-common-label">Base común para todos</span>
      <ul>
        <li><BookOpenText aria-hidden="true" /> Lectura crítica</li>
        <li><Calculator aria-hidden="true" /> Razonamiento cuantitativo</li>
        <li><HeartHandshake aria-hidden="true" /> Competencias blandas</li>
      </ul>
    </div>
    <div className="exi-cols">
      <section className="exi-col is-doc">
        <header><GraduationCap aria-hidden="true" /><strong>Docentes</strong><small>de aula y orientador</small></header>
        <p className="exi-score"><span>60</span>/100 para seguir</p>
        <p className="exi-own"><strong>Componente propio:</strong> conocimientos del área y competencias pedagógicas</p>
        <p className="exi-case">Casos de aula: planear, evaluar, incluir</p>
      </section>
      <section className="exi-col is-dir">
        <header><School aria-hidden="true" /><strong>Directivos docentes</strong><small>rector, coordinador, director rural</small></header>
        <p className="exi-score"><span>70</span>/100 para seguir</p>
        <p className="exi-own"><strong>Componente propio:</strong> gestión directiva, administrativa y financiera, y gestión académica</p>
        <p className="exi-case">Casos de institución: PEI, gobierno escolar, presupuesto</p>
      </section>
    </div>
    <div className="exi-foot">
      <p><UserCheck aria-hidden="true" /><span>Después: psicotécnica, antecedentes y entrevista (clasificatorias)</span></p>
      <p><Clock3 aria-hidden="true" /><span>Número de preguntas y tiempo: <strong>aún no oficiales</strong>; los fijará la Guía de orientación de la CNSC</span></p>
    </div>
    <Link to="/concursos" className="exi-more">Ver la estructura completa <ArrowRight aria-hidden="true" /></Link>
  </div>;
}
