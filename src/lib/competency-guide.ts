import type { SimulationProfile } from "@/lib/simulation-bank";

export type CompetencyArea = { name: string; what: string; inEducalex: string; status: "cubierta" | "parcial" | "en-preparacion" };
export type TestBlock = { name: string; character: string; areas: CompetencyArea[] };
export type CompetencyGuide = { process: string; blocks: TestBlock[]; sources: string[]; caution: string };

// Información verificada el 19 nov 2026. Concurso de ingreso: Decreto 2038 de 2016 (prueba eliminatoria 60/70) y
// proyecto de Anexo Técnico / proyecto de decreto 2026 publicados para comentarios (componentes mínimos).
// Ascenso: Resolución MEN 018987 de 2025 (instrumentos y puntajes).
const PEDAGOGIA_NORMAS = "Las 40 situaciones de este simulacro (legislación educativa, evaluación, inclusión, convivencia, gestión), en 4 niveles.";
const concurso = (cargo: "docente" | "directivo"): CompetencyGuide => ({
  process: `Concurso de méritos de la CNSC para ${cargo === "docente" ? "docentes de aula" : "directivos docentes (rector y coordinador)"}`,
  blocks: [
    {
      name: "Prueba de aptitudes y competencias básicas",
      character: `Eliminatoria: mínimo ${cargo === "docente" ? "60" : "70"} sobre 100. Es la única prueba eliminatoria del concurso.`,
      areas: [
        { name: "Lectura crítica", what: "Comprender, interpretar y evaluar textos, y tomar posición argumentada frente a ellos.", inEducalex: "Pestaña «Núcleo común»: 10 preguntas con textos originales, en 4 niveles.", status: "cubierta" },
        { name: "Razonamiento cuantitativo", what: "Usar conocimientos matemáticos para interpretar datos y resolver problemas de la vida cotidiana y escolar.", inEducalex: "Pestaña «Núcleo común»: 10 problemas de porcentajes, proporciones, conteo e interpretación de datos.", status: "cubierta" },
        { name: "Competencias blandas", what: "Liderazgo, ética, trabajo en equipo y ciudadanía.", inEducalex: "Pestaña «Núcleo común»: 10 situaciones de liderazgo, ética, trabajo en equipo y ciudadanía, más las de este simulacro.", status: "cubierta" },
        { name: cargo === "docente" ? "Conocimientos disciplinares y competencias pedagógicas" : "Conocimientos requeridos para el cargo directivo", what: cargo === "docente" ? "Saberes del área del empleo y capacidad para enseñar, evaluar e incluir." : "Saberes de gestión escolar, gobierno escolar, normativa y liderazgo pedagógico.", inEducalex: PEDAGOGIA_NORMAS, status: "cubierta" },
      ],
    },
    {
      name: "Prueba psicotécnica (comportamental)",
      character: "Clasificatoria: suma puntaje, pero no elimina.",
      areas: [{ name: "Competencias comportamentales", what: "Actitudes, habilidades, motivaciones e intereses profesionales relacionados con las funciones del empleo.", inEducalex: "Pestaña «Psicotécnica»: 12 situaciones para conocer el formato, con un perfil de tendencias y sin puntaje.", status: "parcial" }],
    },
    {
      name: "Valoración de antecedentes y entrevista",
      character: "Clasificatorias, en una etapa posterior para quienes superan la prueba eliminatoria.",
      areas: [{ name: "Formación, experiencia y entrevista", what: "Títulos, experiencia certificada y desempeño en la entrevista, según el acuerdo de la convocatoria.", inEducalex: "Orientación en la ruta del concurso de tu perfil.", status: "parcial" }],
    },
  ],
  sources: ["Decreto 2038 de 2016 (modifica el artículo 2.4.1.1.11 del Decreto 1075 de 2015).", "Proyecto de Acuerdo y Anexo Técnico del concurso docente 2026 (CNSC) y proyecto de decreto del MEN, publicados para comentarios."],
  caution: "Los componentes y pesos definitivos los fijan el Acuerdo y el Anexo Técnico de cada convocatoria de la CNSC. Confírmalos en www.cnsc.gov.co antes de presentarte.",
});

const ascenso: CompetencyGuide = {
  process: "Evaluación para ascenso de grado o reubicación de nivel salarial (Decreto Ley 1278 de 2002), convocada por el MEN",
  blocks: [{
    name: "Instrumentos de la evaluación",
    character: "Son candidatos quienes obtienen más del 80 %, en orden de puntaje y según la disponibilidad presupuestal.",
    areas: [
      { name: "Prueba pedagógica escrita (0 a 45 puntos)", what: "Saberes pedagógicos, didácticos, evaluativos y normativos aplicados a la práctica. Es el instrumento de mayor peso.", inEducalex: PEDAGOGIA_NORMAS, status: "cubierta" },
      { name: "Autoevaluación del desempeño (0 a 5 puntos)", what: "Reflexión del docente sobre su propia práctica.", inEducalex: "Parcial: situaciones de reflexión docente de este simulacro.", status: "parcial" },
      { name: "Valoración de la experiencia (14 a 20 puntos)", what: "Tiempo de servicio acreditado.", inEducalex: "No requiere práctica: se valora con tu historia laboral.", status: "parcial" },
      { name: "Zona de desempeño (12 a 15 puntos)", what: "Condiciones del lugar donde ejerces.", inEducalex: "No requiere práctica: depende de tu sede.", status: "parcial" },
      { name: "Movimientos en el escalafón (7 a 15 puntos)", what: "Trayectoria previa en grados y niveles.", inEducalex: "No requiere práctica: depende de tu escalafón.", status: "parcial" },
    ],
  }],
  sources: ["Decreto Ley 1278 de 2002, artículos 35 y 36.", "Resolución MEN 018987 de 2025, artículos 7 a 15 (instrumentos, requisitos y puntajes de ese proceso)."],
  caution: "Cada proceso de ascenso tiene su propia resolución. Verifica la del año en que te presentes.",
};

export const competencyGuides: Record<SimulationProfile, CompetencyGuide> = {
  "ingreso-docente": concurso("docente"),
  "ascenso-reubicacion": ascenso,
  rector: concurso("directivo"),
  coordinador: concurso("directivo"),
};
