import { Info } from "lucide-react";

type Row = { label: string; docente: string; directivo: string; note?: string };
const ROWS: Row[] = [
  { label: "Quiénes", docente: "Docente de aula (cada área o nivel) y docente orientador.", directivo: "Rector, coordinador y director rural." },
  { label: "Prueba escrita principal", docente: "Prueba de aptitudes y competencias básicas. Eliminatoria.", directivo: "Prueba de aptitudes y competencias básicas. Eliminatoria." },
  { label: "Puntaje mínimo para seguir", docente: "60 sobre 100", directivo: "70 sobre 100", note: "Decreto 2038 de 2016 y Anexo Técnico 2026" },
  { label: "Componentes comunes", docente: "Lectura crítica · Razonamiento cuantitativo · Competencias blandas (liderazgo, ética, trabajo en equipo y ciudadanía)", directivo: "Lectura crítica · Razonamiento cuantitativo · Competencias blandas (liderazgo, ética, trabajo en equipo y ciudadanía)", note: "Anexo Técnico 2026, numeral 2.1" },
  { label: "Componente propio del cargo", docente: "Conocimientos disciplinares del área del empleo y competencias pedagógicas: enseñar, evaluar e incluir.", directivo: "Funciones del cargo directivo: gestión directiva, administrativa y financiera, y gestión académica.", note: "Para directivos, división usada en el concurso 2022; confírmala en la guía 2026" },
  { label: "Cómo son las situaciones", docente: "Casos de aula: planear una clase, evaluar, ajustar para un estudiante, enseñar un contenido del área.", directivo: "Casos de institución: PEI, gobierno escolar, presupuesto y Fondo de Servicios Educativos, acompañamiento a docentes, convivencia y mejoramiento institucional.", note: "Orientación EDUCALEX, no texto oficial" },
  { label: "Prueba psicotécnica", docente: "Clasificatoria. Se aplica el mismo día y en la misma sesión.", directivo: "Clasificatoria. Se aplica el mismo día y en la misma sesión.", note: "Anexo Técnico 2026" },
  { label: "Etapas posteriores", docente: "Valoración de antecedentes y entrevista, solo para quienes superan la prueba eliminatoria.", directivo: "Valoración de antecedentes y entrevista, solo para quienes superan la prueba eliminatoria." },
];

/** Estructura de la prueba del concurso CNSC: diferencias entre docentes y directivos docentes. */
export function ExamStructure() {
  return <section className="exam-structure" aria-labelledby="exam-structure-title">
    <h2 id="exam-structure-title">Estructura de la prueba: docentes y directivos docentes</h2>
    <p>Los dos cargos presentan la misma prueba eliminatoria con una base común, pero cambian el componente propio del cargo y el puntaje mínimo.</p>
    <div className="exam-table-wrap"><table className="exam-table">
      <thead><tr><th scope="col">Aspecto</th><th scope="col">Docentes</th><th scope="col">Directivos docentes</th></tr></thead>
      <tbody>{ROWS.map(r => <tr key={r.label}><th scope="row">{r.label}{r.note && <small>{r.note}</small>}</th><td>{r.docente}</td><td>{r.directivo}</td></tr>)}</tbody>
    </table></div>
    <div className="exam-pending">
      <h3>Lo que todavía no es oficial</h3>
      <ul>
        <li><strong>Número de preguntas y tiempo.</strong> El Anexo Técnico 2026 los remite a la Guía de orientación al aspirante, que la CNSC publica antes de la prueba. Las cifras que circulan en internet (por ejemplo, 100 o 120 preguntas) corresponden a concursos anteriores o a cálculos de terceros.</li>
        <li><strong>Peso de cada componente.</strong> En 2022 la CNSC publicó pesos por componente para algunos cargos; por ejemplo, para directivos en zonas rurales: lectura crítica 20 %, razonamiento cuantitativo 20 %, gestión directiva 30 % y gestión académica 30 %. Para 2026 aún no se han publicado.</li>
        <li><strong>Peso de cada prueba en el puntaje final.</strong> Lo fija el Acuerdo de tu convocatoria. Revísalo en la OPEC a la que te inscribiste.</li>
      </ul>
    </div>
    <p className="competency-caution"><Info aria-hidden="true" /> Información revisada el 22 de noviembre de 2026. Confírmala en www.cnsc.gov.co, en el Acuerdo y en la Guía de orientación de tu proceso, antes de presentarte.</p>
    <p className="competency-sources"><strong>Fuentes:</strong> Decreto 2038 de 2016 · Anexo Técnico del concurso docente 2026 (CNSC), numerales 2 y 2.1 · Guía de orientación al aspirante, concurso 2022 (CNSC).</p>
  </section>;
}
