import type { PagePath } from "@/lib/educalex-sitemap";
import { simulationBankAmpliacion } from "@/lib/simulation-bank-ampliacion";
import { simulationBankAmpliacion2 } from "@/lib/simulation-bank-ampliacion-2";
import { ingresoDocenteV3 } from "@/lib/bank-v3/ingreso-docente";
import { ascensoReubicacionV3 } from "@/lib/bank-v3/ascenso-reubicacion";
import { rectorV3 } from "@/lib/bank-v3/rector";
import { coordinadorV3 } from "@/lib/bank-v3/coordinador";

export type SimulationProfile = "ingreso-docente" | "ascenso-reubicacion" | "rector" | "coordinador";
export type PracticeQuestion = {
  id: string;
  /** Nivel de complejidad: 1 identificar · 2 aplicar · 3 analizar · 4 evaluar y decidir. */
  level?: 1 | 2 | 3 | 4;
  competency: string;
  /** Situación o caso (estructura tipo ICFES): se muestra antes de la tarea. */
  context?: string;
  /** Tarea de evaluación: lo que se pide resolver. */
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  explanation: string;
  reference: string;
  documentId: string;
  course: PagePath;
};
export type PracticeBank = { title: string; questions: PracticeQuestion[] };

// Original EDUCALEX situations. Conceptual references are not official question sources.
const baseBank: Record<SimulationProfile, PracticeBank> = {
  "ingreso-docente": {
    title: "Ingreso docente",
    questions: [
      {
        id: "ing-1", competency: "Didáctica",
        prompt: "En un aula multigrado de Boyacá, varios estudiantes comparan fracciones por el tamaño de sus denominadores y creen que 1/8 es mayor que 1/4. ¿Qué intervención permite comprender mejor el error?",
        options: ["Repetir la regla de comparación y pedir que la memoricen.", "Representar ambas fracciones con tiras del mismo tamaño y pedir que expliquen la comparación.", "Usar tiras de tamaños diferentes para cada fracción y comparar sus longitudes.", "Pasar a suma de fracciones y revisar el concepto al terminar la unidad."], correct: 1,
        explanation: "Las tiras del mismo tamaño mantienen la unidad de referencia y hacen visible que un cuarto ocupa más que un octavo. Pedir explicaciones permite reconocer y reconstruir la idea equivocada. Memorizar no muestra comprensión; cambiar la unidad invalida la comparación y posponerla conserva el error.",
        reference: "Ley 115 de 1994: formación y desarrollo de capacidades. Aplicación didáctica original, no procedimiento prescrito por la ley.", documentId: "ley-115-1994", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "ing-2", competency: "Didáctica",
        prompt: "Una docente de ciencias en el Chocó quiere que el grupo argumente sobre el cuidado del agua. Hay registros de consumo y testimonios de la comunidad. ¿Qué actividad aporta la evidencia más directa del aprendizaje esperado?",
        options: ["Copiar diez definiciones de contaminación.", "Diseñar un cartel cuya nota dependa solo de su presentación.", "Escuchar una exposición sin producir una respuesta propia.", "Proponer una medida, sustentarla con los registros y contrastarla con otra propuesta."], correct: 3,
        explanation: "La tarea exige formular una posición, usar evidencia y contrastar alternativas: las tres acciones permiten observar argumentación. Copiar, decorar o escuchar pueden acompañar la unidad, pero no demuestran por sí mismos el aprendizaje esperado.",
        reference: "Ley 115 de 1994: formación integral y conocimiento del entorno. Alineación pedagógica de objetivos, actividad y evidencia.", documentId: "ley-115-1994", course: "/formacion/educacion-rural",
      },
      {
        id: "ing-3", competency: "Inclusión",
        prompt: "Una estudiante con discapacidad visual participa en una clase de geografía en Pasto. El objetivo es interpretar relaciones entre lugares, no medir la visión. ¿Cuál decisión reduce la barrera y mantiene el objetivo?",
        options: ["Ofrecer un mapa táctil y descripciones accesibles, y permitir que explique las relaciones oralmente.", "Eximirla de geografía y asignarle una actividad de coloreado.", "Aplicar el mismo mapa impreso pequeño porque todos deben recibir idéntico material.", "Pedir a un compañero que resuelva por ella la actividad completa."], correct: 0,
        explanation: "Se adapta el acceso a la información y la forma de expresar el aprendizaje sin sustituir la participación ni abandonar el objetivo. Igualdad no significa material idéntico ante barreras diferentes; la exención y la resolución por terceros impiden conocer lo que aprende.",
        reference: "Decreto 1421 de 2017: accesibilidad, participación y ajustes razonables en educación inclusiva.", documentId: "decreto-1421-2017", course: "/formacion/inclusion-dua-piar",
      },
      {
        id: "ing-4", competency: "Inclusión",
        prompt: "En una escuela de Cundinamarca, un docente recibe un PIAR que contiene ajustes para la comunicación de un estudiante. ¿Cuál es la mejor acción pedagógica inicial?",
        options: ["Archivarlo porque corresponde exclusivamente al docente de apoyo.", "Bajar todas las metas sin revisar las barreras específicas.", "Dialogar con estudiante, familia y equipo pertinente, aplicar los ajustes y recoger evidencias para revisarlos.", "Publicar el diagnóstico en el grupo de familias para que todos sepan cómo tratarlo."], correct: 2,
        explanation: "El PIAR orienta ajustes individualizados que se construyen y revisan con información del estudiante y su contexto. El docente participa en su aplicación y seguimiento; no es un archivo del apoyo ni una reducción automática de metas. Difundir diagnósticos vulnera la privacidad.",
        reference: "Decreto 1421 de 2017: PIAR y ajustes razonables; participación de la familia y articulación pedagógica.", documentId: "decreto-1421-2017", course: "/formacion/inclusion-dua-piar",
      },
      {
        id: "ing-5", competency: "Evaluación",
        prompt: "En una clase de lenguaje en Cali, los borradores muestran que el grupo afirma opiniones sin evidencia. ¿Qué uso de la evaluación es más formativo?",
        options: ["Registrar una nota definitiva y comenzar otro tema.", "Dar retroalimentación específica sobre evidencia, modelar una revisión y permitir reescribir el texto.", "Subir todas las notas para motivar sin analizar los borradores.", "Comparar públicamente a cada estudiante con el mejor texto del curso."], correct: 1,
        explanation: "La evidencia identifica una necesidad concreta; la retroalimentación y la reescritura convierten esa información en una oportunidad de mejora. La nota sola no proporciona una ruta de aprendizaje. Inflar notas o comparar públicamente no atiende la dificultad detectada.",
        reference: "Decreto 1290 de 2009 (compilado en el Decreto 1075 de 2015): propósitos de la evaluación institucional de los estudiantes y estrategias de apoyo. La evaluación formativa es el principio pedagógico aplicado.", documentId: "decreto-1290-2009", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "ing-6", competency: "Evaluación",
        prompt: "Un proyecto de ciencias en Santander busca explicar cambios en las plantas. Antes de iniciarlo, ¿qué decisión mejora la coherencia de su evaluación?",
        options: ["Calificar solo la cantidad de páginas del informe.", "Asignar criterios distintos a cada grupo al terminar.", "Evaluar únicamente la compra de materiales costosos.", "Compartir criterios sobre observación, uso de datos y explicación, con ejemplos de distintos niveles de desempeño."], correct: 3,
        explanation: "Los criterios anticipados se relacionan con el aprendizaje y ayudan a orientar el trabajo y la autoevaluación. Extensión, costo o criterios improvisados no ofrecen evidencia válida de explicación científica y pueden introducir barreras ajenas al objetivo.",
        reference: "Decreto 1290 de 2009: criterios de evaluación definidos en el Sistema Institucional de Evaluación de los Estudiantes (SIEE). La rúbrica es una propuesta pedagógica, no un formato obligatorio.", documentId: "decreto-1290-2009", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "ing-7", competency: "Convivencia",
        prompt: "En un colegio de Medellín, dos estudiantes tienen una discusión aislada por un turno de juego, sin agresión física ni daño a la salud. ¿Cuál respuesta es más adecuada para este caso?",
        options: ["Facilitar un diálogo seguro, acordar reparación del trato y hacer seguimiento conforme al manual y al protocolo aplicable.", "Excluir a ambos por un mes sin escucharlos.", "Tratar la discusión como un presunto delito sin analizar los hechos.", "Ignorarla porque no hubo lesiones."], correct: 0,
        explanation: "Una diferencia sin lesión exige una respuesta pedagógica proporcionada: escuchar, construir acuerdos y revisar su cumplimiento. La clasificación y actuación se confirman con los hechos y el protocolo institucional. Ignorar o escalar sin fundamento no atiende el conflicto ni respeta el debido proceso.",
        reference: "Ley 1620 de 2013 y Decreto 1965 de 2013: los conflictos manejados inadecuadamente sin daño al cuerpo o a la salud se atienden con estrategias pedagógicas según el manual de convivencia. La clasificación depende de los hechos concretos.", documentId: "decreto-1965-2013", course: "/formacion/convivencia-escolar",
      },
      {
        id: "ing-8", competency: "Convivencia",
        prompt: "Una estudiante de Barranquilla informa humillaciones reiteradas y amenazas por parte de un grupo. Tiene miedo de asistir. ¿Qué debe priorizar la docente?",
        options: ["Convocar inmediatamente una confrontación pública entre ella y el grupo.", "Pedirle que deje de usar redes para resolver sola el problema.", "Protegerla, escuchar sin revictimizar, registrar confidencialmente y activar la ruta institucional según los hechos.", "Esperar a que haya una lesión para informar a la institución."], correct: 2,
        explanation: "La reiteración y el miedo requieren protección y valoración de la situación, no tratarla como una diferencia simétrica. La ruta orienta responsabilidades y posibles remisiones según gravedad; no se obliga a una mediación que exponga a la estudiante ni se espera a un daño mayor.",
        reference: "Ley 1620 de 2013: Ruta de Atención Integral para la Convivencia Escolar y atención del acoso escolar; protocolos reglamentados en el Decreto 1965 de 2013 y orientados en la Guía 49 del MEN.", documentId: "ley-1620-2013", course: "/formacion/convivencia-escolar",
      },
    ],
  },
  "ascenso-reubicacion": {
    title: "Ascenso y reubicación",
    questions: [
      {
        id: "asc-1", competency: "Práctica pedagógica",
        prompt: "Un docente en ejercicio en Nariño prepara evidencias de su práctica. ¿Cuál conjunto muestra mejor cómo sus decisiones responden a necesidades de aprendizaje?",
        options: ["Fotos del aula decorada sin información del aprendizaje.", "Una lista de asistencia usada como única evidencia.", "Planeación, producciones iniciales y finales, ajustes realizados y análisis de los resultados.", "Diplomas de cursos sin relación con el trabajo del grupo."], correct: 2,
        explanation: "La relación entre diagnóstico, intervención y resultados permite analizar la práctica, sus límites y mejoras. Fotos, asistencia y diplomas pueden aportar contexto, pero por sí solos no muestran el efecto de las decisiones de enseñanza. Este es un criterio formativo, no un requisito oficial de evaluación.",
        reference: "Decreto Ley 1278 de 2002: desarrollo profesional y evaluación docente. Evidencias propuestas por EDUCALEX, no listado oficial de convocatoria.", documentId: "decreto-1278-2002", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "asc-2", competency: "Práctica pedagógica",
        prompt: "En una escuela rural del Cauca, un proyecto de lectura no progresa porque varios estudiantes no tienen acceso a los textos digitales en casa. ¿Qué ajuste atiende directamente la barrera detectada?",
        options: ["Organizar préstamo de materiales impresos y espacios de lectura en la escuela, manteniendo los objetivos.", "Calificar negativamente a quienes no envían capturas de pantalla.", "Cambiar el objetivo a manejo de plataformas sin ofrecer conectividad.", "Mantener la actividad y pedir a las familias comprar internet de inmediato."], correct: 0,
        explanation: "Los soportes impresos y el tiempo escolar ofrecen acceso efectivo al trabajo lector. El ajuste se deriva del diagnóstico y conserva el propósito; penalizar condiciones de acceso o exigir recursos inexistentes no resuelve la barrera.",
        reference: "Ley 115 de 1994: pertinencia de la educación y atención al contexto. Ajuste didáctico original para educación rural.", documentId: "ley-115-1994", course: "/formacion/educacion-rural",
      },
      {
        id: "asc-3", competency: "Evaluación formativa",
        prompt: "En Tolima, una docente observa que los resultados de una prueba de matemáticas mejoraron, pero las explicaciones siguen siendo mecánicas. ¿Qué decisión aporta mejor información para ajustar la enseñanza?",
        options: ["Concluir que ya hay comprensión porque subió el promedio.", "Repetir la misma prueba cada día sin analizar las respuestas.", "Eliminar la explicación de los criterios de evaluación.", "Proponer un problema nuevo, pedir justificar el procedimiento y analizar las estrategias utilizadas."], correct: 3,
        explanation: "La transferencia a un problema nuevo y la justificación permiten distinguir comprensión de repetición. El promedio es una señal útil pero insuficiente; analizar estrategias ofrece evidencia para ajustar la enseñanza y dar apoyos específicos.",
        reference: "Decreto 1290 de 2009: seguimiento del desempeño de los estudiantes y estrategias de apoyo. Transferencia y justificación son criterios pedagógicos de esta práctica.", documentId: "decreto-1290-2009", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "asc-4", competency: "Evaluación formativa",
        prompt: "Un profesor de Sucre quiere usar autoevaluación en un proyecto. ¿Qué alternativa tiene mayor valor formativo?",
        options: ["Pedir que cada estudiante se ponga una nota sin criterios.", "Usar criterios compartidos, señalar evidencias y definir un siguiente paso que el profesor acompaña.", "Aceptar toda nota propuesta sin contrastarla con evidencias.", "Usar la autoevaluación solo para reemplazar la retroalimentación docente."], correct: 1,
        explanation: "La autoevaluación exige contrastar el trabajo con criterios y fundamentar juicios en evidencias; un siguiente paso la conecta con el aprendizaje. No equivale a asignarse una cifra ni elimina la responsabilidad del docente de acompañar y retroalimentar.",
        reference: "Decreto 1290 de 2009: el SIEE incluye los procesos de autoevaluación de los estudiantes.", documentId: "decreto-1290-2009", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "asc-5", competency: "Reflexión docente",
        prompt: "Una docente de Bogotá recibe observaciones de un colega sobre la escasa participación durante su clase. ¿Qué respuesta expresa reflexión profesional basada en evidencia?",
        options: ["Desestimar la observación porque el colega no conoce toda su trayectoria.", "Cambiar todo el curso sin identificar el problema.", "Contrastar la observación con registros, ensayar preguntas y agrupamientos nuevos, y revisar su efecto.", "Seleccionar únicamente las intervenciones que confirman que la clase funcionó."], correct: 2,
        explanation: "Reflexionar implica analizar evidencias, formular una hipótesis de mejora y comprobarla. No es aceptar cualquier comentario sin análisis, ni defender la práctica seleccionando solo información favorable. La revisión del efecto permite aprender del ajuste.",
        reference: "Decreto Ley 1278 de 2002: profesionalización y mejoramiento docente; reflexión entre pares como propuesta formativa.", documentId: "decreto-1278-2002", course: "/formacion/liderazgo-pedagogico",
      },
      {
        id: "asc-6", competency: "Reflexión docente",
        prompt: "En Huila, un profesor afirma que una nueva estrategia causó la mejora de resultados porque el promedio aumentó una semana después. ¿Qué revisión hace más sólido su análisis?",
        options: ["Comparar tareas de dificultad semejante, analizar producciones y considerar cambios de asistencia u otros factores.", "Afirmar causalidad definitiva con un solo promedio.", "Omitir los casos que no mejoraron.", "Tomar la satisfacción del docente como única prueba."], correct: 0,
        explanation: "Comparar evidencia pertinente y reconocer otros factores evita atribuir causalidad sin sustento. La mejora observada es una señal que requiere análisis, no una garantía de efecto. También se estudian los estudiantes que no progresan para identificar apoyos.",
        reference: "Guía 34 del MEN: análisis de evidencias y seguimiento del mejoramiento; aplicación reflexiva a la práctica docente.", documentId: "guia-34", course: "/formacion/guia-34-pmi",
      },
      {
        id: "asc-7", competency: "Carrera y proceso",
        prompt: "Una docente ya vinculada bajo el régimen del Decreto Ley 1278 pregunta si practicar para ascenso o reubicación equivale a presentarse al concurso de ingreso. ¿Cuál orientación es correcta?",
        options: ["Sí, ambos procesos tienen necesariamente las mismas pruebas y requisitos.", "El ingreso solo cambia el salario de quien ya está vinculado.", "Cualquier práctica privada permite obtener automáticamente un ascenso.", "Son procesos distintos: el ingreso busca la vinculación; ascenso y reubicación se refieren a la carrera de docentes ya vinculados y exigen revisar las reglas aplicables."], correct: 3,
        explanation: "Se distingue el acceso a la carrera de la progresión de quienes ya pertenecen al servicio bajo su régimen. No se trasladan pruebas ni requisitos de un proceso al otro y esta práctica no genera derechos salariales ni acreditación oficial.",
        reference: "Decreto Ley 1278 de 2002 (artículos 35 y 36) y Resolución MEN 018987 de 2025: el ascenso y la reubicación son para educadores ya vinculados; el ingreso se rige por el concurso de la CNSC (Decreto 915 de 2016).", documentId: "resolucion-018987-2025", course: "/formacion/actualizacion-normativa",
      },
      {
        id: "asc-8", competency: "Carrera y proceso",
        prompt: "Un docente de Meta encuentra una guía privada que promete requisitos universales de ascenso para todos los regímenes y años. ¿Cuál decisión es más prudente?",
        options: ["Usarla como norma porque contiene muchos ejemplos.", "Identificar su régimen y contrastar los requisitos con las disposiciones y orientaciones oficiales del proceso vigente.", "Asumir que las reglas del concurso de ingreso reemplazan las de ascenso.", "Concluir que la antigüedad garantiza por sí sola cualquier cambio de grado o nivel."], correct: 1,
        explanation: "Régimen, normas y proceso aplicable determinan las condiciones; una guía privada no reemplaza esas fuentes. No se garantizan ascensos por práctica o antigüedad aislada ni se extrapolan reglas del ingreso. Se deben verificar modificaciones y vigencia.",
        reference: "Decreto Ley 1278 de 2002 y resolución anual del MEN: cada proceso de ascenso tiene reglas propias; los docentes del Decreto 2277 de 1979 tienen otro régimen. Verificar en la fuente oficial.", documentId: "decreto-1278-2002", course: "/formacion/actualizacion-normativa",
      },
    ],
  },
  rector: {
    title: "Rector",
    questions: [
      {
        id: "rec-1", competency: "Gestión institucional",
        prompt: "Una institución de Córdoba realiza autoevaluación. El equipo tiene encuestas de familias, resultados académicos y registros de asistencia. ¿Cuál es el mejor punto de partida para decidir prioridades?",
        options: ["Triangular las evidencias por áreas de gestión, contrastar interpretaciones y acordar hallazgos sustentados.", "Elegir el problema mencionado por la persona con mayor autoridad.", "Usar solo los resultados académicos y descartar el contexto.", "Copiar las prioridades de un colegio urbano de otra región."], correct: 0,
        explanation: "La triangulación relaciona distintas fuentes y permite comprender problemas y fortalezas antes de decidir. La Guía 34 orienta una autoevaluación participativa; no basta la autoridad, un indicador aislado ni una lista ajena al contexto.",
        reference: "Guía 34 del MEN (2008): autoevaluación institucional por áreas de gestión directiva, académica, administrativa y financiera, y de la comunidad. Verifica su tratamiento en la actualización de 2026.", documentId: "guia-34", course: "/formacion/guia-34-pmi",
      },
      {
        id: "rec-2", competency: "Gestión institucional",
        prompt: "En una sede rural de Caquetá, se identifica ausentismo relacionado con dificultades de transporte. ¿Qué decisión integra mejor la gestión institucional?",
        options: ["Modificar notas para que las ausencias no se vean.", "Trasladar toda la responsabilidad al docente de aula.", "Eliminar el registro de asistencia para evitar conflictos.", "Articular análisis con familias y autoridades competentes, apoyos pedagógicos y seguimiento de asistencia."], correct: 3,
        explanation: "La dificultad requiere coordinación entre gestión, comunidad y apoyos al aprendizaje, sin prometer recursos fuera de las competencias institucionales. Ocultar información o responsabilizar a una sola persona impide abordar las causas y evaluar mejoras.",
        reference: "Guía 34 del MEN: articulación de áreas de gestión y relación con el entorno para el mejoramiento.", documentId: "guia-34", course: "/formacion/guia-34-pmi",
      },
      {
        id: "rec-3", competency: "PEI y gobierno escolar",
        prompt: "Una rectora de La Guajira propone actualizar el PEI para atender cambios del contexto. ¿Qué procedimiento respeta mejor su carácter institucional?",
        options: ["Comprar un PEI estándar y cambiar únicamente el nombre.", "Abrir un diagnóstico participativo y tramitar los acuerdos con las instancias competentes de gobierno escolar.", "Redactarlo sola y excluir a docentes, estudiantes y familias.", "Sustituirlo por el calendario de actividades del año."], correct: 1,
        explanation: "El PEI expresa una propuesta educativa contextualizada y construida con participación. Su revisión debe seguir las competencias de los órganos institucionales y los procedimientos aplicables. Un documento estándar, unilateral o reducido a un calendario no cumple ese sentido.",
        reference: "Ley 115 de 1994 (artículo 73) y Decreto 1860 de 1994: el PEI se construye y ajusta con participación de la comunidad educativa y los órganos del gobierno escolar.", documentId: "decreto-1860-1994", course: "/formacion/pei",
      },
      {
        id: "rec-4", competency: "PEI y gobierno escolar",
        prompt: "En una institución de Risaralda, una propuesta pedagógica genera desacuerdo entre familias y docentes. ¿Cómo debería liderar el rector su análisis?",
        options: ["Cancelar toda participación hasta que desaparezca el desacuerdo.", "Someter los derechos de estudiantes a una votación informal.", "Presentar evidencias, escuchar a los sectores y llevar la decisión a la instancia competente, respetando los derechos y las normas.", "Dejar que un grupo decida por mensajes privados sin registro de acuerdos."], correct: 2,
        explanation: "Participación no significa que cualquier mayoría pueda desconocer derechos o competencias. El liderazgo institucional escucha, fundamenta y formaliza decisiones en los órganos correspondientes; evita tanto imposición como acuerdos informales sin responsabilidad.",
        reference: "Ley 115 de 1994 (artículos 142 a 145) y Decreto 1860 de 1994: gobierno escolar y participación de la comunidad educativa.", documentId: "gobierno-escolar", course: "/formacion/liderazgo-directivo",
      },
      {
        id: "rec-5", competency: "Guía 34 y PMI",
        prompt: "Un PMI en una escuela de Cesar busca mejorar asistencia. La línea base ficticia es 80 % de días asistidos. ¿Cuál meta permite seguimiento más claro?",
        options: ["Aumentar del 80 % al 90 % la proporción de días asistidos del grupo focalizado al cierre del año, usando el mismo registro y criterio de cálculo.", "Mejorar mucho la asistencia cuando sea posible.", "Realizar tres reuniones, sin revisar asistencia.", "Lograr satisfacción de todos sin definir cómo medirla."], correct: 0,
        explanation: "La meta especifica valor inicial, valor esperado, población, plazo y consistencia de medición. Las reuniones son actividades, no evidencia suficiente del resultado de asistencia. La cifra es un ejemplo ficticio y no una exigencia normativa.",
        reference: "Ruta de Mejoramiento Institucional (actualización de la Guía 34, 2026): formulación de metas, indicadores y seguimiento del PMI. Valores originales de práctica.", documentId: "guia-34-actualizacion-2026", course: "/formacion/guia-34-pmi",
      },
      {
        id: "rec-6", competency: "Guía 34 y PMI",
        prompt: "A mitad de año, un PMI en Caldas muestra que se hicieron los talleres previstos, pero no mejoró la comprensión lectora. ¿Qué acción corresponde a un seguimiento útil?",
        options: ["Declarar éxito porque se cumplieron todas las actividades.", "Cambiar el indicador para que el informe muestre mejora.", "Suspender el seguimiento hasta el final del año.", "Revisar evidencias y barreras, ajustar estrategias y responsables, y mantener trazabilidad de las decisiones."], correct: 3,
        explanation: "El seguimiento distingue ejecución de actividades y logro de metas. Si el resultado no mejora, se analizan causas y se ajusta la intervención con registro de las decisiones; no se alteran indicadores para aparentar cumplimiento.",
        reference: "Ruta de Mejoramiento Institucional (actualización de la Guía 34, 2026): seguimiento y evaluación del PMI; orientación metodológica, no ley.", documentId: "guia-34-actualizacion-2026", course: "/formacion/guia-34-pmi",
      },
      {
        id: "rec-7", competency: "Liderazgo",
        prompt: "En un colegio de Antioquia, el equipo docente identifica necesidades de acompañamiento en evaluación. ¿Qué actuación del rector fortalece el liderazgo pedagógico?",
        options: ["Usar las dificultades para clasificar públicamente a los docentes.", "Acordar un plan de aprendizaje entre pares, tiempos de trabajo y evidencias de cambio en las prácticas.", "Enviar una circular sin tiempo de trabajo ni seguimiento.", "Delegar toda mejora a un proveedor sin participación del equipo."], correct: 1,
        explanation: "El liderazgo crea condiciones para aprender y revisar prácticas: acuerdos, tiempo, colaboración y evidencia. No se limita a ordenar ni a exponer dificultades; tampoco entrega la responsabilidad pedagógica completa a un agente externo.",
        reference: "Guía 34 del MEN: gestión directiva y académica, trabajo en equipo y desarrollo institucional.", documentId: "guia-34", course: "/formacion/liderazgo-pedagogico",
      },
      {
        id: "rec-8", competency: "Liderazgo",
        prompt: "En una institución de Bolívar hay recursos limitados para mejorar acceso a materiales. ¿Qué criterio orienta mejor la priorización del rector?",
        options: ["La preferencia personal por equipos vistosos.", "La propuesta de quien ofrece un beneficio particular.", "Necesidades sustentadas, impacto en acceso y aprendizaje, equidad y procedimientos de la instancia competente.", "El orden de llegada de solicitudes sin revisar el diagnóstico."], correct: 2,
        explanation: "La priorización debe relacionar recursos con necesidades y propósitos institucionales, respetando competencias, transparencia y procedimientos. Esta pregunta no define una modalidad de contratación: las reglas concretas de gasto requieren consulta de la normativa aplicable.",
        reference: "Guía 34 del MEN: gestión administrativa y financiera articulada con el mejoramiento institucional.", documentId: "guia-34", course: "/formacion/gestion-institucional",
      },
    ],
  },
  coordinador: {
    title: "Coordinador",
    questions: [
      {
        id: "coo-1", competency: "Gestión académica",
        prompt: "En un colegio de Bucaramanga, dos áreas enseñan contenidos relacionados sin conexión y sobrecargan al grupo con entregas simultáneas. ¿Qué debe promover el coordinador?",
        options: ["Imponer que un área deje de enseñar sus contenidos.", "Mantener todas las fechas y pedir más esfuerzo a los estudiantes.", "Evaluar solo una de las áreas durante el año.", "Reunir a los equipos para articular aprendizajes, evidencias y calendario, conservando los propósitos de cada área."], correct: 3,
        explanation: "La articulación curricular permite integrar sin borrar propósitos y organizar cargas de trabajo. Requiere acuerdos entre docentes y revisión del plan; cancelar un área o trasladar la sobrecarga al alumnado no resuelve la falta de coordinación.",
        reference: "Guía 34 del MEN: gestión académica, diseño pedagógico y planeación curricular.", documentId: "guia-34", course: "/formacion/gestion-institucional",
      },
      {
        id: "coo-2", competency: "Gestión académica",
        prompt: "En una institución de Arauca, varios grupos presentan dificultades en inferencia lectora. ¿Qué plan de acompañamiento académico está mejor sustentado?",
        options: ["Repetir una prueba cada semana sin apoyos.", "Analizar producciones, acordar estrategias por necesidad y verificar progresos con nuevas evidencias.", "Aplicar una misma sanción a todos los grupos.", "Eliminar inferencia de los aprendizajes esperados."], correct: 1,
        explanation: "El diagnóstico de producciones orienta apoyos específicos y una nueva comprobación del aprendizaje. Medir sin intervenir no es acompañar; sancionar o quitar el objetivo tampoco atiende la dificultad. Se adapta la enseñanza y se revisa el progreso.",
        reference: "Decreto 1290 de 2009: acciones de seguimiento y estrategias de apoyo para el mejoramiento de los desempeños; gestión académica orientada al aprendizaje.", documentId: "decreto-1290-2009", course: "/formacion/evaluacion-formativa",
      },
      {
        id: "coo-3", competency: "Acompañamiento docente",
        prompt: "Un coordinador de Pereira observará una clase para acompañar a una docente. ¿Qué secuencia favorece mejor una mejora profesional colaborativa?",
        options: ["Observar sin propósito y emitir un juicio global de calidad.", "Publicar los errores en una reunión general.", "Acordar un foco, registrar evidencias de aula, dialogar y definir una acción de mejora con seguimiento.", "Limitarse a verificar si el tablero tiene fecha."], correct: 2,
        explanation: "Un foco compartido y registros específicos permiten un diálogo sobre decisiones y aprendizaje, no sobre impresiones personales. El acuerdo de mejora y su seguimiento completan el acompañamiento; exponer errores o revisar solo aspectos formales no lo sustituye.",
        reference: "Guía 34 del MEN: gestión académica y seguimiento de prácticas pedagógicas. Secuencia de acompañamiento original.", documentId: "guia-34", course: "/formacion/liderazgo-pedagogico",
      },
      {
        id: "coo-4", competency: "Acompañamiento docente",
        prompt: "En una sede de Putumayo, docentes nuevos piden apoyo para trabajar con grupos multigrado. ¿Qué organización resulta más pertinente?",
        options: ["Crear espacios entre pares para planear actividades diferenciadas, observar su aplicación y revisar trabajos de estudiantes.", "Entregar un manual y dar por terminada la inducción.", "Asignar la misma ficha a todos los grados durante el año.", "Exigir resultados inmediatos sin tiempo de planeación."], correct: 0,
        explanation: "La colaboración situada conecta planeación diferenciada, práctica y revisión de evidencia. El acompañamiento debe sostenerse en el contexto real; una entrega aislada de materiales o una actividad idéntica para todos no atiende diferencias de aprendizaje.",
        reference: "Guía 34 del MEN: trabajo colaborativo y gestión académica; pertinencia contextual en educación rural.", documentId: "guia-34", course: "/formacion/educacion-rural",
      },
      {
        id: "coo-5", competency: "Convivencia y mediación",
        prompt: "En un colegio de Tunja, dos estudiantes aceptan dialogar por un desacuerdo aislado sin lesiones, amenazas ni desequilibrio de poder. ¿Qué mediación es más adecuada?",
        options: ["El mediador decide quién es culpable sin escuchar.", "Se obliga a uno a pedir perdón para cerrar rápido.", "Se divulga el conflicto a toda la comunidad.", "Se establecen condiciones de respeto, se escuchan perspectivas y se acuerdan compromisos verificables con seguimiento."], correct: 3,
        explanation: "La mediación en un conflicto susceptible de diálogo requiere escucha, voluntariedad, acuerdos y seguimiento. No es una sentencia ni una disculpa impuesta. Si aparecen riesgos o violencia, se valora la ruta aplicable y la protección, no se insiste mecánicamente en mediar.",
        reference: "Decreto 1965 de 2013 y Guía 49 del MEN: los conflictos sin daño al cuerpo o a la salud admiten estrategias pedagógicas como la mediación, conforme al manual de convivencia.", documentId: "decreto-1965-2013", course: "/formacion/convivencia-escolar",
      },
      {
        id: "coo-6", competency: "Convivencia y mediación",
        prompt: "En un colegio de Cartagena, una estudiante informa un hecho que podría constituir violencia sexual. ¿Cuál respuesta inicial debe orientar el coordinador?",
        options: ["Intentar conciliación privada con la persona señalada.", "Priorizar protección y atención, evitar revictimización y activar la ruta y remisiones a las autoridades competentes según el protocolo.", "Interrogarla repetidamente frente al curso para confirmar su relato.", "Esperar la siguiente reunión ordinaria para valorar si se actúa."], correct: 1,
        explanation: "Un posible hecho de violencia sexual no se resuelve mediante mediación escolar. Deben garantizarse protección y atención sin revictimizar, y activarse las responsabilidades y remisiones aplicables. La institución no sustituye a las autoridades competentes ni debe aplazar la atención.",
        reference: "Ley 1620 de 2013 y Decreto 1965 de 2013: situaciones que pueden constituir delitos contra la libertad, integridad y formación sexuales requieren protección, atención y remisión a las autoridades competentes según el protocolo; no son mediables.", documentId: "decreto-1965-2013", course: "/formacion/convivencia-escolar",
      },
      {
        id: "coo-7", competency: "Inclusión y PIAR",
        prompt: "En un colegio de Villavicencio, cada docente interpreta de manera diferente los ajustes del PIAR de un estudiante. ¿Qué debe hacer el coordinador?",
        options: ["Eliminar los ajustes para unificar criterios.", "Dejar toda decisión a la familia sin participación escolar.", "Articular al equipo con estudiante y familia, precisar los ajustes por área y acordar seguimiento de su aplicación.", "Convertir el PIAR en un currículo separado automático para todos los estudiantes con discapacidad."], correct: 2,
        explanation: "La coordinación favorece acuerdos pertinentes, aplicación consistente y seguimiento individualizado. El PIAR no implica separación automática ni retiro de ajustes; se articula con la planeación de aula y la participación del estudiante y su familia.",
        reference: "Decreto 1421 de 2017: construcción, aplicación y seguimiento de los ajustes razonables y el PIAR.", documentId: "decreto-1421-2017", course: "/formacion/inclusion-dua-piar",
      },
      {
        id: "coo-8", competency: "Inclusión y PIAR",
        prompt: "Un estudiante con discapacidad motora en una escuela de Ibagué comprende los problemas, pero escribir a mano le demanda mucho tiempo. El objetivo es razonar matemáticamente. ¿Cuál ajuste es más pertinente para valorar ese objetivo?",
        options: ["Permitir respuesta oral o herramienta accesible y tiempo ajustado, usando los mismos criterios de razonamiento y documentando el ajuste.", "Calificar principalmente velocidad de escritura.", "Excluirlo de la actividad de matemáticas.", "Aceptar que otra persona resuelva los problemas por él."], correct: 0,
        explanation: "Se modifica el medio de respuesta y el tiempo para retirar una barrera motora, manteniendo el criterio de razonamiento. El ajuste permite observar su propio aprendizaje; sustituirlo o evaluar una habilidad ajena al objetivo produce una valoración inadecuada.",
        reference: "Decreto 1421 de 2017: ajustes razonables para acceso, participación y aprendizaje; evaluación pedagógica individualizada.", documentId: "decreto-1421-2017", course: "/formacion/inclusion-dua-piar",
      },
    ],
  },
};

// Bancos reestructurados al formato tipo ICFES (contexto + tarea + opciones homogéneas), ordenados por nivel de complejidad.
const byLevel = (qs: PracticeQuestion[]) => [...qs].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
const v3Banks: Partial<Record<SimulationProfile, PracticeQuestion[]>> = {
  "ingreso-docente": byLevel(ingresoDocenteV3),
  "ascenso-reubicacion": byLevel(ascensoReubicacionV3),
  rector: byLevel(rectorV3),
  coordinador: byLevel(coordinadorV3),
};

// Banco anterior: 8 situaciones originales + 12 + 20 de las ampliaciones verificadas (40 por perfil).
// practice-v3 (19 nov 2026): bancos tipo ICFES por niveles. Las entregas v2 se interpretan con el banco anterior (legacyBankV2).
export const PRACTICE_EXAM_VERSION = "practice-v3" as const;
export type PracticeExamVersion = "practice-v1" | "practice-v2" | "practice-v3";
export const PRACTICE_QUESTION_COUNT = 40;
/** Banco anterior (practice-v2): mismo orden y opciones con que se guardaron las entregas previas al 19 nov 2026. */
export const legacyBankV2: Record<SimulationProfile, PracticeBank> = Object.fromEntries(
  (Object.keys(baseBank) as SimulationProfile[]).map(profile => [
    profile,
    { title: baseBank[profile].title, questions: [...baseBank[profile].questions, ...simulationBankAmpliacion[profile], ...simulationBankAmpliacion2[profile]] },
  ]),
) as Record<SimulationProfile, PracticeBank>;
export const simulationBank: Record<SimulationProfile, PracticeBank> = Object.fromEntries(
  (Object.keys(baseBank) as SimulationProfile[]).map(profile => [
    profile,
    { title: baseBank[profile].title, questions: v3Banks[profile] ?? legacyBankV2[profile].questions },
  ]),
) as Record<SimulationProfile, PracticeBank>;

/** Banco con el que se debe leer una entrega según su versión. Las entregas v1 (8 preguntas) usan las primeras 8 del banco anterior. */
export function bankForVersion(profile: SimulationProfile, version: string | undefined): PracticeBank {
  if (version === "practice-v2") return legacyBankV2[profile];
  if (version === "practice-v1") return { ...legacyBankV2[profile], questions: legacyBankV2[profile].questions.slice(0, 8) };
  return simulationBank[profile];
}
