// Ideas clave por norma para las infografías de la biblioteca.
// Solo contenido ya verificado en las fichas y en los bancos de preguntas revisados (19 nov 2026), con su artículo.
// Las normas que no aparecen aquí muestran el organizador gráfico general, sin ideas clave adicionales.

export type KeyPoint = { label: string; text: string; source: string };
export type DocKeyPoints = { points: KeyPoint[]; forExam: string[] };

export const docKeyPoints: Record<string, DocKeyPoints> = {
  "constitucion-1991": {
    points: [
      { label: "Derecho y servicio público", text: "La educación es un derecho de la persona y un servicio público con función social.", source: "Art. 67" },
      { label: "Idoneidad docente", text: "La enseñanza estará a cargo de personas de reconocida idoneidad ética y pedagógica.", source: "Art. 68" },
      { label: "Derechos de los niños", text: "Los derechos de los niños prevalecen sobre los derechos de los demás.", source: "Art. 44" },
      { label: "Carrera y mérito", text: "Los empleos del Estado son de carrera; el ingreso y el ascenso dependen del mérito.", source: "Art. 125" },
    ],
    forExam: ["Relacionar el concurso de méritos con el artículo 125 y la idoneidad del artículo 68."],
  },
  "ley-1098-2006": {
    points: [
      { label: "Interés superior", text: "Imperativo de garantizar la satisfacción integral y simultánea de todos los derechos de niños, niñas y adolescentes.", source: "Art. 8" },
      { label: "Corresponsabilidad", text: "Familia, sociedad y Estado concurren para garantizar los derechos.", source: "Art. 10" },
      { label: "Instituciones educativas", text: "Obligaciones especiales, éticas y complementarias, como proteger contra el maltrato y el acoso.", source: "Arts. 42 a 44" },
      { label: "Sin sanciones crueles", text: "Se prohíben sanciones que afecten la dignidad o la integridad física, psicológica o moral.", source: "Art. 45" },
    ],
    forExam: ["Ante un caso con menores, el interés superior orienta la decisión."],
  },
  "guia-31": {
    points: [
      { label: "Quiénes", text: "Docentes y directivos docentes regidos por el Decreto Ley 1278 de 2002.", source: "Guía 31" },
      { label: "Cómo", text: "Proceso continuo, sistemático y basado en evidencias durante todo el año escolar.", source: "Guía 31" },
      { label: "Contribuciones individuales", text: "Se pactan con el evaluado al iniciar el proceso.", source: "Guía 31, anexo 5" },
      { label: "Norma", text: "Reglamentada por el Decreto 3782 de 2007, compilado en el Decreto 1075 de 2015.", source: "MEN" },
    ],
    forExam: ["Distinguir evaluación anual de desempeño, periodo de prueba y evaluación para ascenso."],
  },
  "ley-115-1994": {
    points: [
      { label: "Fines", text: "Trece fines de la educación, entre ellos la conciencia para conservar, proteger y mejorar el medio ambiente.", source: "Art. 5" },
      { label: "Áreas obligatorias", text: "Nueve áreas obligatorias y fundamentales en la básica, que ocupan como mínimo el 80 % del plan de estudios.", source: "Art. 23" },
      { label: "PEI", text: "Debe responder a las necesidades de los educandos, la comunidad local, la región y el país, y ser concreto, factible y evaluable.", source: "Art. 73" },
      { label: "Autonomía escolar", text: "Permite asignaturas optativas y adaptar áreas a la región, dentro de la ley y los lineamientos del MEN.", source: "Art. 77" },
      { label: "Manual de convivencia", text: "Padres y estudiantes lo aceptan al firmar la matrícula.", source: "Art. 87" },
      { label: "Gobierno escolar", text: "En los establecimientos estatales: rector, consejo directivo y consejo académico.", source: "Arts. 142 a 145" },
    ],
    forExam: ["Diferenciar áreas obligatorias de asignaturas optativas.", "Saber qué adopta el consejo directivo y qué orienta el consejo académico."],
  },
  "ley-715-2001": {
    points: [
      { label: "Institución y centro", text: "Institución educativa: mínimo un año de preescolar y los nueve grados de la básica; si no, es centro educativo.", source: "Art. 9" },
      { label: "Funciones del rector", text: "Dirige la preparación del PEI, formula planes de mejoramiento, distribuye asignaciones académicas y representa al establecimiento.", source: "Art. 10" },
      { label: "Fondo de Servicios Educativos", text: "El rector lo administra conforme a su reglamentación.", source: "Art. 10, num. 10.16" },
      { label: "Transparencia", text: "Publicar cada semestre docentes, horarios y carga académica, e informar al consejo directivo.", source: "Art. 10, nums. 10.15 y 10.17" },
      { label: "Evaluación del rector", text: "Dos años consecutivos sin aprobar: retiro del cargo directivo y regreso a la docencia.", source: "Art. 10, par. 1" },
    ],
    forExam: ["Funciones del rector frente a las del consejo directivo.", "Consecuencias de la evaluación de desempeño de directivos."],
  },
  "decreto-1860-1994": {
    points: [
      { label: "Contenido del PEI", text: "Incluye principios, diagnóstico, objetivos, plan de estudios, manual de convivencia y gobierno escolar, entre otros.", source: "Art. 14" },
      { label: "Adopción del PEI", text: "La adopta el consejo directivo, previa consulta al consejo académico.", source: "Art. 15" },
      { label: "Comunidad educativa", text: "Estudiantes, padres, docentes, directivos y administradores, y egresados organizados.", source: "Art. 18" },
      { label: "Consejo directivo", text: "Lo preside el rector; sesiona una vez al mes; los representantes docentes se eligen en asamblea.", source: "Art. 21" },
      { label: "Personero", text: "Estudiante del último grado, elegido en los 30 días siguientes al inicio de clases; incompatible con la representación ante el consejo directivo.", source: "Art. 28" },
      { label: "Consejo de estudiantes", text: "Un vocero por grado; preescolar y los tres primeros grados eligen un vocero único de tercero.", source: "Art. 29" },
    ],
    forExam: ["Quién elige, quién adopta y quién convoca en cada órgano.", "Plazos y condiciones de las elecciones estudiantiles."],
  },
  "gobierno-escolar": {
    points: [
      { label: "Órganos", text: "Rector, consejo directivo y consejo académico (establecimientos estatales).", source: "Ley 115, art. 142; Decreto 1860, art. 20" },
      { label: "Consejo directivo", text: "Adopta el manual de convivencia y fija los criterios para asignar cupos.", source: "Ley 115, art. 144" },
      { label: "Consejo académico", text: "Rector, directivos y un docente por área; organiza el plan de estudios y participa en la evaluación institucional.", source: "Ley 115, art. 145; Decreto 1860, art. 24" },
      { label: "Períodos", text: "Los representantes de los órganos colegiados se eligen para períodos anuales.", source: "Decreto 1860, art. 20" },
    ],
    forExam: ["No confundir instancias de participación (personero, consejo de padres) con órganos del gobierno escolar."],
  },
  "decreto-1290-2009": {
    points: [
      { label: "Ámbitos", text: "Internacional, nacional e institucional; el decreto reglamenta el institucional.", source: "Art. 1" },
      { label: "Propósitos", text: "Identificar características y ritmos, reorientar procesos, apoyar, promover y aportar al plan de mejoramiento.", source: "Art. 3" },
      { label: "SIEE", text: "Incluye criterios, apoyos, periodicidad de informes y mecanismos de reclamación; lo aprueba el consejo directivo.", source: "Arts. 4 y 8" },
      { label: "Escala", text: "Cada institución define su escala con equivalencia a Superior, Alto, Básico y Bajo.", source: "Art. 5" },
      { label: "Promoción", text: "La define cada SIEE; al no promovido se le garantiza el cupo; promoción anticipada en el primer período.", source: "Arts. 6 y 7" },
      { label: "Derechos", text: "Estudiantes y padres conocen el SIEE desde el inicio y reciben acompañamiento.", source: "Arts. 12 a 15" },
    ],
    forExam: ["Qué decide la institución y qué no puede decidir.", "Diferencia entre desempeño básico y bajo."],
  },
  "decreto-1278-2002": {
    points: [
      { label: "Función docente", text: "Incluye actividades curriculares no lectivas: preparación, evaluación y atención a las familias.", source: "Art. 5" },
      { label: "Directivos", text: "Director rural, rector y coordinador.", source: "Art. 6" },
      { label: "Período de prueba", text: "Hasta terminar el año escolar si se laboraron al menos cuatro meses; aprueba con 60 % o más.", source: "Arts. 12 y 31" },
      { label: "Escalafón", text: "Tres grados, cada uno con niveles salariales A a D; el grado 3 exige maestría o doctorado.", source: "Arts. 19 a 21" },
      { label: "Evaluaciones", text: "Período de prueba, desempeño anual y competencias (esta, al menos cada seis años y voluntaria).", source: "Arts. 27 y 35" },
      { label: "Ascenso y reubicación", text: "Candidatos con más del 80 %, en orden de puntaje y según disponibilidad presupuestal.", source: "Art. 36" },
    ],
    forExam: ["Distinguir ascenso de grado y reubicación de nivel.", "Consecuencia de dos evaluaciones de desempeño insatisfactorias: exclusión del escalafón."],
  },
  "decreto-2038-2016": {
    points: [
      { label: "Prueba eliminatoria", text: "La prueba de aptitudes y competencias básicas es la única eliminatoria del concurso.", source: "Modifica el art. 2.4.1.1.11 del Decreto 1075 de 2015" },
      { label: "Puntaje mínimo", text: "60/100 para docentes y 70/100 para directivos docentes.", source: "Ídem" },
      { label: "Psicotécnica", text: "Clasificatoria: suma puntaje, pero no elimina.", source: "Ídem" },
    ],
    forExam: ["Las ponderaciones exactas se confirman en el acuerdo de cada convocatoria."],
  },
  "resolucion-018987-2025": {
    points: [
      { label: "Requisitos", text: "Escalafón con derechos de carrera, tres años de servicio desde la primera posesión en período de prueba y 60 % en cada una de las dos últimas evaluaciones de desempeño.", source: "Art. 7" },
      { label: "Prueba pedagógica", text: "Escrita, de 0 a 45 puntos; la diseña y califica una universidad pública acreditada contratada por el MEN.", source: "Art. 10" },
      { label: "Otros instrumentos", text: "Autoevaluación (0–5), experiencia (14–20), zona de desempeño (12–15) y movimientos en el escalafón (7–15).", source: "Arts. 9 a 15" },
      { label: "Carácter", text: "Diagnóstica formativa y voluntaria para quienes aspiran a ascender o reubicarse.", source: "Art. 1" },
    ],
    forExam: ["Los contratos de prestación de servicios no cuentan como servicio efectivo.", "Las evaluaciones de desempeño no se promedian."],
  },
  "decreto-1421-2017": {
    points: [
      { label: "DUA", text: "Diseñar desde el inicio para que todas las personas accedan, sin adaptaciones posteriores.", source: "Definiciones" },
      { label: "Ajustes razonables", text: "Respuestas individualizadas cuando la planeación universal no basta.", source: "Definiciones" },
      { label: "PIAR", text: "Se elabora en el primer trimestre con la valoración pedagógica; lo construyen docentes, docente de apoyo, familia y estudiante.", source: "PIAR" },
      { label: "Acta de acuerdo", text: "Formaliza los compromisos de la institución y la familia.", source: "PIAR" },
      { label: "Historia escolar", text: "El PIAR acompaña al estudiante si se traslada.", source: "PIAR" },
    ],
    forExam: ["El DUA no excluye las ayudas técnicas.", "Los ajustes no se condicionan a un diagnóstico clínico."],
  },
  "ley-1620-2013": {
    points: [
      { label: "Competencias ciudadanas", text: "Conocimientos y habilidades cognitivas, emocionales y comunicativas para actuar en democracia.", source: "Art. 2" },
      { label: "Acoso escolar", text: "Conducta intencional, sistemática y reiterada con poder asimétrico; incluye ciberacoso y puede involucrar docentes.", source: "Art. 2" },
      { label: "Comité escolar", text: "Rector (preside), personero, orientador, coordinador, presidentes de padres y estudiantes, y un docente líder.", source: "Art. 12" },
      { label: "Responsabilidades", text: "El rector lidera el comité y la revisión anual de PEI, manual y SIEE; los docentes identifican, reportan y hacen seguimiento.", source: "Arts. 18 y 19" },
      { label: "Ruta de Atención Integral", text: "Promoción, prevención, atención y seguimiento, también para casos en los alrededores del colegio.", source: "Arts. 29 y 30" },
    ],
    forExam: ["Qué acción corresponde a cada componente de la Ruta."],
  },
  "decreto-1965-2013": {
    points: [
      { label: "Tipo I", text: "Conflictos manejados inadecuadamente, sin daño al cuerpo o a la salud; admite mediación y estudiantes mediadores.", source: "Arts. 40 y 42" },
      { label: "Tipo II", text: "Acoso o ciberacoso, o daño al cuerpo o a la salud sin incapacidad; atención, familias, restauración, comité y reporte.", source: "Arts. 40 y 43" },
      { label: "Tipo III", text: "Presuntos delitos: atención, familias, aviso inmediato a la Policía y medidas de protección.", source: "Arts. 40 y 44" },
      { label: "Comité", text: "Sesiona al menos cada dos meses y no sin su presidente; actas con confidencialidad.", source: "Arts. 23 a 25" },
      { label: "Sin defensor de familia", text: "Actúa el comisario de familia y, a falta de este, el inspector de policía.", source: "Art. 45" },
    ],
    forExam: ["Clasificar por los hechos (daño, reiteración, posible delito), no por la gravedad aparente."],
  },
  "guia-34": {
    points: [
      { label: "Cuatro áreas", text: "Directiva, académica, administrativa y financiera, y de la comunidad.", source: "Guía 34 (2008)" },
      { label: "Gestión académica", text: "Diseño pedagógico, prácticas pedagógicas, gestión de aula y seguimiento académico.", source: "Guía 34" },
      { label: "Gestión de la comunidad", text: "Inclusión, proyección, participación y convivencia, y prevención de riesgos.", source: "Guía 34" },
      { label: "Ruta de mejoramiento", text: "Autoevaluación, plan de mejoramiento y seguimiento permanente.", source: "Guía 34" },
    ],
    forExam: ["Ubicar un proceso en su área de gestión.", "Distinguir actividades cumplidas de metas logradas en el PMI."],
  },
  pei: {
    points: [
      { label: "Pertinencia", text: "Responde a las necesidades de los educandos, la comunidad, la región y el país.", source: "Ley 115, art. 73" },
      { label: "Contenidos mínimos", text: "Principios, diagnóstico, objetivos, estrategia pedagógica, plan de estudios, manual y gobierno escolar.", source: "Decreto 1860, art. 14" },
      { label: "Construcción y adopción", text: "El rector dirige su preparación con la comunidad; lo adopta el consejo directivo previa consulta al académico.", source: "Ley 715, art. 10; Decreto 1860, art. 15" },
      { label: "El educador", text: "Lleva a la práctica el PEI y puede aportar a su mejoramiento.", source: "Ley 115, art. 104" },
    ],
    forExam: ["Un PEI copiado de otra institución no cumple la pertinencia exigida."],
  },
};

// Fichas que comparten el mismo marco normativo verificado.
const ALIASES: Record<string, string> = { dua: "decreto-1421-2017", piar: "decreto-1421-2017", pmi: "guia-34", "protocolos-convivencia": "decreto-1965-2013" };
export function keyPointsFor(docId: string): DocKeyPoints | undefined {
  return docKeyPoints[docId] ?? docKeyPoints[ALIASES[docId] ?? ""];
}
