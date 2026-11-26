export const GUIA34_INDEX_URL = "https://www.mineducacion.gov.co/portal/Preescolar-basica-y-media/Referentes-de-calidad/";
export const GUIA34_UPDATE_URL = "https://www.mineducacion.gov.co/portal/anos/2026/430002:Ruta-de-Mejoramiento-Institucional-para-una-Educacion-de-Calidad-Actualizacion-de-la-Guia-N-34";
export const PLAN_DECENAL_URL = "https://www.mineducacion.gov.co/portal/micrositios-institucionales/Plan-Decenal-de-Educacion-2026-2035/";

export type CourseUnit = {
  /** Idea clave en una línea, visible junto a la infografía. */
  key?: string;
  title: string;
  objective: string;
  explanation: string[];
  application: string;
};

export const guia34Units: CourseUnit[] = [
  {
    title: "La ruta de mejoramiento en tres etapas",
    objective: "Distinguir una guía metodológica de una disposición normativa y reconocer el mejoramiento como un ciclo continuo.",
    explanation: [
      "La Guía 34 del Ministerio de Educación Nacional es una orientación metodológica para que la comunidad educativa se autoevalúe, decida prioridades y organice su mejoramiento. No es una ley ni un decreto y, por sí sola, no crea requisitos administrativos.",
      "La ruta de trabajo conecta autoevaluación, priorización, formulación del Plan de Mejoramiento Institucional (PMI), ejecución, seguimiento y ajustes. La actualización de 2026 organiza la ruta en tres etapas: autoevaluación institucional, elaboración anual del Plan de Mejoramiento Institucional (PMI) y seguimiento de sus avances y resultados, que retroalimenta el siguiente ciclo. El PMI debe responder a los hallazgos y articularse con el PEI.",
    ],
    application: "Escribe qué decisión concreta de tu institución necesita mejorar y qué fuente consultarías para fundamentarla. Separa la orientación metodológica de la norma aplicable.",
  },
  {
    title: "Gestión directiva y estratégica",
    objective: "Analizar cómo la dirección, el PEI y los acuerdos institucionales orientan el mejoramiento.",
    explanation: [
      "En la actualización de 2026 esta área se llama gestión directiva y estratégica e incluye cinco procesos: direccionamiento y gestión estratégica; gobierno escolar, instancias y otros mecanismos de participación; cultura institucional; ambiente y clima escolar, y estrategias para el bienestar y la permanencia de estudiantes. Da sentido y coordinación al trabajo institucional. Al autoevaluarla conviene revisar si el PEI se conoce y se usa, cómo se distribuyen responsabilidades, cómo participan los estamentos y de qué manera el gobierno escolar toma y comunica decisiones.",
      "No basta con tener documentos: las evidencias deben mostrar su apropiación y uso. Actas, acuerdos, planes de trabajo y mecanismos de participación permiten contrastar lo que está escrito con lo que efectivamente ocurre.",
    ],
    application: "Compara una decisión reciente del consejo directivo con el PEI: identifica su propósito, los participantes, el acuerdo adoptado y la evidencia de seguimiento.",
  },
  {
    title: "Gestión académica y pedagógica",
    objective: "Examinar las prácticas pedagógicas y el apoyo a las trayectorias educativas a partir de evidencias.",
    explanation: [
      "En la actualización de 2026 se llama gestión académica y pedagógica y tiene tres procesos: diseño pedagógico; prácticas pedagógicas y gestión de aula, y acompañamiento y seguimiento académico. Comprende la planeación, el currículo, la enseñanza y la evaluación. La autoevaluación debe mirar tanto resultados como procesos, evitando reducir la calidad a una sola cifra.",
      "Planeaciones, trabajos de estudiantes, rúbricas, registros de acompañamiento y análisis de resultados pueden dialogar entre sí. Una misma evidencia no sirve para todas las preguntas: una planeación, por ejemplo, no demuestra por sí sola el aprendizaje.",
    ],
    application: "Selecciona un resultado de aprendizaje y contrástalo con dos evidencias distintas: producciones estudiantiles y observación o valoración de la práctica de aula.",
  },
  {
    title: "Gestión administrativa y financiera",
    objective: "Valorar si los recursos, procesos y condiciones de operación responden a las necesidades educativas.",
    explanation: [
      "En la actualización de 2026 sus procesos son: apoyo al proceso de gestión de la cobertura educativa; administración de la planta física y de los recursos; talento humano, y apoyo financiero y contable. El propósito formativo es determinar si estas decisiones facilitan el servicio educativo y se gestionan con claridad.",
      "Un hallazgo útil relaciona la condición administrativa con su efecto. En lugar de anotar «falta mantenimiento», conviene precisar qué espacio o equipo está afectado, qué evidencia lo demuestra, a quiénes impacta y qué actuación es viable.",
    ],
    application: "Elige un recurso prioritario y registra su estado, la evidencia disponible, el efecto sobre las actividades educativas y la dependencia responsable de la gestión.",
  },
  {
    title: "Gestión de la comunidad",
    objective: "Reconocer la participación de familias, estudiantes y aliados como parte del mejoramiento institucional.",
    explanation: [
      "En la actualización de 2026 sus procesos son: accesibilidad; proyección a la comunidad, y participación y convivencia. La comunidad no es únicamente destinataria de información. Puede aportar al diagnóstico, priorizar necesidades, participar en acciones y valorar avances. Las estrategias deben considerar los horarios, medios de comunicación y condiciones del territorio.",
      "Las evidencias pueden incluir acuerdos de encuentros, acciones conjuntas, percepciones recogidas con criterios transparentes y alianzas documentadas. El número de asistentes a una reunión, por sí solo, no demuestra participación significativa.",
    ],
    application: "Formula una pregunta breve para familias y otra para estudiantes sobre un mismo hallazgo; compara sus respuestas sin convertir opiniones aisladas en hechos generales.",
  },
  {
    title: "Autoevaluación y análisis de evidencias",
    objective: "Construir hallazgos comprensibles, pertinentes y respaldados por información contrastada.",
    explanation: [
      "Una autoevaluación útil parte de preguntas concretas por área. El equipo recoge información cuantitativa y cualitativa, verifica su procedencia y compara fuentes antes de concluir. Si falta información, se registra la limitación en vez de completar el vacío con suposiciones.",
      "Un hallazgo describe una situación, su evidencia y su alcance. Conviene diferenciar hechos, interpretaciones y causas posibles: «tres de cinco actas no registran acuerdos de seguimiento» es observable; «no hay compromiso directivo» sería una conclusión que exige más evidencia.",
    ],
    application: "Redacta un hallazgo con cuatro partes: situación observada, evidencia, población o proceso afectado y límite de la información disponible.",
  },
  {
    title: "Priorización de hallazgos",
    objective: "Elegir pocas prioridades mediante criterios explícitos, participativos y revisables.",
    explanation: [
      "No todos los hallazgos pueden convertirse en acciones simultáneas. La institución puede dialogar criterios como incidencia en aprendizajes y bienestar, riesgo o urgencia, equidad, magnitud del efecto y viabilidad. Estos criterios orientan el análisis; no constituyen una fórmula oficial.",
      "Priorizar exige explicar por qué se atiende una necesidad y qué otras quedan en observación o se remiten a otra instancia. Una puntuación numérica nunca reemplaza la deliberación ni las responsabilidades que correspondan a cada actor.",
    ],
    application: "Compara dos hallazgos con los mismos criterios y documenta la decisión. Incluye qué evidencia podría hacer cambiar esa prioridad en la próxima revisión.",
  },
  {
    title: "Formulación y seguimiento del PMI",
    objective: "Transformar una prioridad en un plan coherente con metas, indicadores, responsables, plazos y revisiones.",
    explanation: [
      "Cada acción del PMI debe conservar la cadena hallazgo → objetivo → meta → indicador → actividades → responsables y recursos → plazos. La meta precisa el cambio esperado y su horizonte; el indicador permite observarlo. Si existe una línea de base, se registra con su fuente y fecha.",
      "El seguimiento compara avances con lo previsto, recoge evidencias y acuerda ajustes. Un porcentaje de actividades ejecutadas no basta para afirmar que se logró el resultado: hay que revisar también el cambio en estudiantes, prácticas o condiciones institucionales.",
    ],
    application: "Usa la matriz del taller y verifica que la meta responda al hallazgo, que el indicador realmente mida la meta y que cada actividad tenga responsable y fecha de revisión.",
  },
];
