// Single source of truth for EDUCALEX navigation: every page, its content outline and its related links.
export type AcademicModule = {
  title: string;
  objective: string;
  summary: string;
  pending?: string;
  links: { label: string; to: string }[];
};

export type PageDef = {
  title: string;
  description: string;
  section: string;
  parent?: string;
  itemsTitle?: string;
  items?: string[];
  children?: string[];
  related?: string[];
  notice?: string;
  restricted?: "user" | "admin";
  academicModules?: AcademicModule[];
};

const VERIFY = "Los requisitos, pruebas y fechas de cada convocatoria deben confirmarse en las fuentes oficiales vigentes antes de tomar decisiones.";
const PRACTICE_SIM = "40 preguntas tipo ICFES por perfil: modo juego por niveles o simulacro completo con tiempo.";
const DOCS = "Las fichas distinguen enlaces institucionales consultados de fuentes pendientes. Consultar un enlace no equivale a confirmar la vigencia ni a haber leído el documento completo; revisa siempre el texto oficial y sus modificaciones.";
const COURSE = ["Objetivos de aprendizaje", "Unidades", "Lecciones", "Videos", "Documentos", "Recursos descargables", "Talleres", "Actividades", "Evaluaciones", "Seguimiento del aprendizaje", "Certificado, al cumplir las condiciones de aprobación"];
const SIM_PARTS = ["Instrucciones", "Número de preguntas", "Tiempo disponible", "Preguntas de selección múltiple con opciones A, B, C y D", "Temporizador", "Navegación entre preguntas", "Marcación para revisión", "Finalización y calificación", "Retroalimentación argumentada", "Resultados y recomendaciones"];
const SIM_NOTE = " Práctica original; no es prueba oficial del ICFES ni de la CNSC.";
const SELF_STUDY = "Autoestudio disponible: cinco unidades originales y un taller ficticio editable. Inscripción y progreso gratuitos con cuenta; sin calificación ni certificación oficial. No ingreses información de menores reales.";
const COURSE_NOTE = "Curso en preparación. Aún no hay inscripciones, lecciones ni evaluaciones habilitadas.";
const ACCOUNT = "Espacio personal protegido. Biblioteca, cursos y nivel Básico de los simulacros son gratuitos; los niveles Premium requieren pago único.";
const ADMIN = "Área reservada a administradores autorizados. La edición de contenidos permanece en preparación.";

export const pages = {
  "/mi-panel": { section: "Mi preparación", title: "Mi panel", description: "Tu ruta de estudio según el perfil educativo activo.", related: ["/mi-cuenta", "/mi-progreso", "/planes"], notice: "Las recomendaciones no limitan el acceso gratuito a los contenidos existentes." },
  "/guia-de-uso": { section: "EDUCALEX", title: "Cómo usar EDUCALEX", description: "Guía rápida en seis pasos para estudiar, practicar y prepararte con EDUCALEX.", related: ["/simulacros", "/biblioteca", "/planes"] },
  "/planes": { section: "Preparación", title: "Planes: Gratuito y Premium", description: "Qué es gratis en EDUCALEX y qué incluye el acceso Premium del modo juego.", related: ["/simulacros", "/formacion", "/mi-cuenta"] },
  "/concursos": { section: "Concursos", title: "Concursos docentes", description: "Rutas de preparación para los concursos de mérito del sector educativo en Colombia.", children: ["/concursos/ingreso-docente", "/concursos/ascenso-reubicacion", "/concursos/rector", "/concursos/coordinador"], related: ["/simulacros", "/formacion", "/biblioteca"], notice: VERIFY },
  "/concursos/ingreso-docente": {
    section: "Concursos", parent: "/concursos", title: "Ingreso a la carrera docente",
    description: "Organiza tu preparación con orientación, autoestudio y práctica pedagógica original.",
    itemsTitle: "Módulos de preparación",
    notice: "Esta es una ruta de estudio EDUCALEX, no un esquema oficial de pruebas. Las competencias evaluadas, requisitos y etapas dependen de cada convocatoria CNSC; verifica sus documentos oficiales.",
    related: ["/formacion", "/simulacros/ingreso-docente"],
    academicModules: [
      { title: "Concurso 2026: qué está confirmado", objective: "Distinguir lo que ya fijó la CNSC de lo que todavía depende de los acuerdos y la guía de pruebas.", summary: "La CNSC adelanta los Procesos de Selección 2917 a 3006 de 2026. Mediante la Resolución 11673 del 6 de noviembre de 2026 fijó las inscripciones para las 2.255 vacantes reservadas a personas con discapacidad: del 23 de noviembre de 2026 al 15 de enero de 2027, en SIMO. El MEN informó que trabaja con la CNSC en la prueba de aptitudes y competencias básicas, la valoración de antecedentes (con arraigo territorial) y la entrevista. Según el Decreto 2038 de 2016, la prueba de aptitudes y competencias básicas es la única eliminatoria: mínimo 60/100 para docentes y 70/100 para directivos docentes.", pending: "Fechas de inscripción general, fecha de pruebas, ponderaciones y guía de orientación: confirmar en el micrositio de la CNSC cuando se publiquen.", links: [{ label: "Ficha: concurso 2026 (CNSC)", to: "/biblioteca/recursos" }, { label: "Decretos 915 y 2038 de 2016", to: "/biblioteca/legislacion" }] },
      { title: "Requisitos del cargo: Manual de Funciones", objective: "Comprobar títulos habilitantes, funciones y competencias del cargo al que aspiras.", summary: "La Resolución 003842 de 2022 del MEN contiene el Manual de Funciones, Requisitos y Competencias para docentes y directivos docentes. En 2026 el MEN anunció su revisión para precisar perfiles y profesiones habilitantes: revisa si hay una versión modificada antes de inscribirte.", links: [{ label: "Ficha: Resolución 003842 de 2022", to: "/biblioteca/legislacion" }] },
      { title: "Estudio pedagógico: didáctica, currículo y evaluación", objective: "Relacionar didáctica, currículo y evaluación con decisiones de aula.", summary: "Parte de los objetivos de aprendizaje, propone actividades accesibles y reúne evidencias para ajustar la enseñanza. El curso de inclusión ofrece ejercicios de diseño pedagógico; el curso específico de evaluación formativa sigue en preparación.", links: [{ label: "Autoestudio: Inclusión, DUA y PIAR", to: "/formacion/inclusion-dua-piar" }, { label: "Evaluación formativa — en preparación", to: "/formacion/evaluacion-formativa" }] },
      { title: "Ética, comunicación y convivencia · estudio EDUCALEX", objective: "Analizar decisiones éticas, comunicación y convivencia en la comunidad educativa.", summary: "Reflexiona sobre el trato respetuoso, la confidencialidad y el diálogo con estudiantes, familias y colegas. Trabaja situaciones ficticias de convivencia sin sustituir los procedimientos institucionales.", links: [{ label: "Autoestudio: Convivencia escolar", to: "/formacion/convivencia-escolar" }] },
      { title: "Responsabilidades del cargo · estudio EDUCALEX", objective: "Reconocer las responsabilidades del cargo docente en su contexto institucional.", summary: "Relaciona planeación, seguimiento de aprendizajes y participación en el mejoramiento institucional. Contrasta las responsabilidades aplicables con la convocatoria y la normativa; Guía 34 aporta contexto de gestión, no un temario oficial del concurso.", pending: "Curso específico de responsabilidades del cargo en preparación.", links: [{ label: "Autoestudio: Guía 34 y PMI", to: "/formacion/guia-34-pmi" }] },
      { title: "Casos pedagógicos contextualizados", objective: "Argumentar alternativas de actuación teniendo en cuenta el contexto y las barreras de aprendizaje.", summary: "Estudia ejemplos ficticios de aulas rurales y de inclusión. Identifica el problema, compara alternativas y justifica una respuesta pedagógica sin usar datos de estudiantes reales.", links: [{ label: "Autoestudio: Educación rural", to: "/formacion/educacion-rural" }, { label: "Casos y taller de inclusión", to: "/formacion/inclusion-dua-piar" }] },
      { title: "Simulacros y retroalimentación", objective: "Practicar decisiones pedagógicas y revisar los argumentos después de entregar.", summary: "El simulacro de ingreso tiene preguntas originales y retroalimentación al finalizar. Es práctica EDUCALEX, no una prueba oficial CNSC/ICFES ni una reproducción de su formato. Úsala para identificar temas que conviene repasar.", links: [{ label: "Abrir simulacro de ingreso docente", to: "/simulacros/ingreso-docente" }] },
    ],
  },
  "/concursos/ascenso-reubicacion": { section: "Concursos", parent: "/concursos", title: "Ascenso y reubicación salarial", description: "Preparación para docentes y directivos del Decreto Ley 1278 de 2002 que buscan ascender de grado o reubicarse de nivel salarial.", itemsTitle: "Temas de estudio EDUCALEX · no son pruebas oficiales", items: ["Decreto Ley 1278 de 2002: artículos 35 y 36", "Escalafón docente", "Diferencia entre ascenso de grado y reubicación de nivel salarial", "Requisitos de participación según la resolución del MEN", "Instrumentos del proceso 2025-2026: prueba pedagógica, autoevaluación, experiencia, zona de desempeño y movimientos en el escalafón (Resolución 018987 de 2025)", "Reflexión sobre la práctica pedagógica", "Casos de práctica pedagógica", "Simulacros"], related: ["/biblioteca/legislacion", "/formacion/evaluacion-formativa", "/simulacros/ascenso-reubicacion"], notice: "Proceso distinto del ingreso CNSC, a cargo del MEN y las secretarías de educación. En el proceso 2025-2026 se inscribieron más de 34.800 educadores y más de 26.300 aprobaron, según el MEN. Para 2026-2027 el MEN publicó un proyecto de resolución; al 14 de noviembre de 2026 no verificamos una resolución definitiva, así que no tomes como oficiales las fechas del proyecto. La docencia del Decreto 2277 de 1979 no participa en este proceso." },
  "/concursos/rector": { section: "Concursos", parent: "/concursos", title: "Concurso para rector", description: "Preparación para el liderazgo y la gestión estratégica de una institución educativa.", itemsTitle: "Temas de estudio EDUCALEX · no son pruebas oficiales", items: ["Liderazgo y gestión directiva", "Gestión académica", "Gestión administrativa y financiera", "Gestión comunitaria", "PEI", "Guía 34", "Autoevaluación institucional", "Plan de Mejoramiento Institucional", "Gobierno escolar", "Legislación educativa", "Simulacros situacionales"], related: ["/formacion/guia-34-pmi", "/formacion/pmi", "/formacion/pei", "/formacion/liderazgo-pedagogico", "/formacion/gestion-institucional", "/biblioteca/guias-men", "/simulacros/rector"], notice: "Ruta de estudio EDUCALEX, no un temario oficial. El concurso 2026 (Procesos 2917 a 3006 de la CNSC) incluye cargos directivos; la prueba de aptitudes y competencias básicas exige 70/100 a directivos docentes (Decreto 2038 de 2016). Verifica funciones y requisitos en la Resolución 003842 de 2022 y sus modificaciones." },
  "/concursos/coordinador": { section: "Concursos", parent: "/concursos", title: "Concurso para coordinador", description: "Preparación para acompañar y liderar equipos docentes.", itemsTitle: "Temas de estudio EDUCALEX · no son pruebas oficiales", items: ["Liderazgo pedagógico", "Gestión académica", "Acompañamiento docente", "Planeación curricular", "Evaluación de aprendizajes y SIEE (Decreto 1290 de 2009)", "Convivencia escolar (Ley 1620 y Decreto 1965 de 2013)", "Mediación de conflictos", "Inclusión educativa (Decreto 1421 de 2017)", "Simulacros situacionales"], related: ["/formacion/gestion-institucional", "/formacion/convivencia-escolar", "/formacion/liderazgo-pedagogico", "/formacion/guia-34-pmi", "/biblioteca/legislacion", "/simulacros/coordinador"], notice: "Ruta de estudio EDUCALEX, no un temario oficial. El concurso 2026 (Procesos 2917 a 3006 de la CNSC) incluye el cargo de coordinador; la prueba de aptitudes y competencias básicas exige 70/100 a directivos docentes (Decreto 2038 de 2016). Verifica funciones y requisitos en la Resolución 003842 de 2022 y sus modificaciones." },

  "/formacion": { section: "Formación docente", title: "Escuela de Formación Docente", description: "Catálogo de cursos para el desarrollo profesional de la comunidad educativa.", related: ["/concursos", "/mis-cursos", "/biblioteca"], notice: "Autoestudio disponible: Guía 34/PMI, Inclusión DUA/PIAR, Convivencia escolar, Educación rural y STEAM/robótica. Los demás cursos siguen en preparación. Inscripción gratuita y progreso con cuenta; sin certificación oficial." },
  "/formacion/guia-34-pmi": { section: "Formación docente", parent: "/formacion", title: "Guía 34 y autoevaluación institucional", description: "Módulo destacado para comprender la autoevaluación institucional y construir el Plan de Mejoramiento Institucional.", itemsTitle: "Contenidos del módulo", items: ["Fundamentos de la Guía 34 del MEN", "Autoevaluación institucional", "Gestión directiva", "Gestión académica", "Gestión administrativa y financiera", "Gestión de la comunidad", "Identificación de fortalezas y oportunidades de mejoramiento", "Análisis de evidencias", "Formulación de objetivos y metas", "Indicadores", "Actividades, responsables y cronogramas", "Seguimiento y evaluación del PMI"], children: ["/formacion/talleres-pmi", "/formacion/pmi"], related: ["/concursos/rector", "/concursos/coordinador", "/biblioteca/guias-men", "/docente-ia", "/formacion/gestion-institucional"], notice: "Contenido formativo de EDUCALEX con enlaces al MEN. La Guía 34 es una orientación metodológica, no una ley o decreto. Se consultaron las páginas institucionales enlazadas, no se afirma haber leído completo el PDF ni se sustituye el documento oficial." },
  "/formacion/talleres-pmi": { section: "Formación docente", parent: "/formacion/guia-34-pmi", title: "Talleres y plantillas de autoevaluación y PMI", description: "Ejercicios prácticos para aplicar la autoevaluación institucional y formular un PMI.", itemsTitle: "El taller permite organizar", items: ["Área de gestión y hallazgo", "Evidencias de la autoevaluación", "Objetivo, meta e indicador", "Actividades, responsables y plazos", "Seguimiento del PMI"], related: ["/formacion/guia-34-pmi", "/formacion/pmi", "/biblioteca/guias-men"], notice: "La matriz editable es una herramienta pedagógica de EDUCALEX, no un formato oficial. Los datos permanecen solo en esta página mientras la usas: no se guardan ni se envían." },
  "/formacion/actualizacion-normativa": { section: "Formación docente", parent: "/formacion", title: "Actualización normativa educativa", description: "Panorama de la normativa educativa colombiana y su aplicación en la institución.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/biblioteca/legislacion", "/docente-ia"], notice: COURSE_NOTE },
  "/formacion/ruta-atencion-integral": { section: "Formación docente", parent: "/formacion", title: "Ruta de Atención Integral para la Convivencia Escolar", description: "Componentes, clasificación de situaciones tipo I, II y III y protocolos de atención según la Ley 1620 y el Decreto 1965 de 2013.", related: ["/formacion/convivencia-escolar", "/formacion/dilemas-educativos", "/biblioteca/legislacion", "/concursos/coordinador", "/concursos/rector"], notice: "Síntesis de estudio EDUCALEX. Ante un caso real, sigue el manual de convivencia de tu institución y verifica el texto vigente de la norma." },
  "/formacion/herramientas-ia": { section: "Formación docente", parent: "/formacion", title: "Herramientas de IA para docentes", description: "Qué hace cada herramienta de inteligencia artificial, cuánto cuesta y cómo usarla para preparar clases, materiales y estudio.", related: ["/docente-ia", "/formacion/inteligencia-artificial", "/formacion/dilemas-educativos"], notice: "Recomendaciones de EDUCALEX sin vínculo comercial con estas empresas. Planes y precios revisados el 20 de noviembre de 2026; confírmalos en cada sitio oficial." },
  "/formacion/dilemas-educativos": { section: "Formación docente", parent: "/formacion", title: "Dilemas educativos interactivos", description: "Casos reales de la vida escolar para decidir, ver consecuencias y reflexionar con fundamento ético y normativo.", related: ["/formacion/convivencia-escolar", "/formacion/liderazgo-pedagogico", "/simulacros"] },
  "/formacion/pmi": { section: "Formación docente", parent: "/formacion", title: "Plan de Mejoramiento Institucional (PMI)", description: "Formulación, ejecución y seguimiento del PMI.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/formacion/guia-34-pmi", "/formacion/talleres-pmi", "/concursos/rector"], notice: COURSE_NOTE },
  "/formacion/pei": { section: "Formación docente", parent: "/formacion", title: "Proyecto Educativo Institucional (PEI)", description: "Construcción y resignificación del PEI.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/formacion/guia-34-pmi", "/concursos/rector", "/biblioteca/guias-men"], notice: COURSE_NOTE },
  "/formacion/gestion-institucional": { section: "Formación docente", parent: "/formacion", title: "Gestión directiva, académica, administrativa y comunitaria", description: "Las cuatro áreas de gestión de la institución educativa.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/formacion/guia-34-pmi", "/concursos/rector", "/concursos/coordinador"], notice: COURSE_NOTE },
  "/formacion/inclusion-dua-piar": { section: "Formación docente", parent: "/formacion", title: "Educación inclusiva, DUA y PIAR", description: "Diseño Universal para el Aprendizaje y Planes Individuales de Ajustes Razonables.", related: ["/biblioteca/legislacion", "/concursos/ingreso-docente", "/concursos/coordinador", "/simulacros/ingreso-docente", "/simulacros/coordinador", "/simulacros/ascenso-reubicacion"], notice: SELF_STUDY },
  "/formacion/educacion-rural": { section: "Formación docente", parent: "/formacion", title: "Educación rural y etnoeducación", description: "Prácticas pedagógicas para contextos rurales y etnoeducativos.", related: ["/biblioteca/recursos", "/concursos/ingreso-docente", "/concursos/ascenso-reubicacion", "/simulacros/ingreso-docente", "/simulacros/ascenso-reubicacion"], notice: SELF_STUDY },
  "/formacion/convivencia-escolar": { section: "Formación docente", parent: "/formacion", title: "Convivencia escolar", description: "Herramientas para la convivencia, la mediación y la ruta de atención escolar.", related: ["/formacion/ruta-atencion-integral", "/biblioteca/legislacion", "/concursos/coordinador", "/concursos/rector", "/simulacros/coordinador", "/simulacros/rector"], notice: SELF_STUDY },
  "/formacion/educacion-emocional": { section: "Formación docente", parent: "/formacion", title: "Educación emocional y competencias socioemocionales", description: "Competencias socioemocionales para estudiantes y docentes.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/formacion/convivencia-escolar", "/formacion/educacion-integral"], notice: COURSE_NOTE },
  "/formacion/educacion-integral": { section: "Formación docente", parent: "/formacion", title: "Educación integral", description: "Formación integral del estudiante en todas sus dimensiones.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/formacion/educacion-emocional"], notice: COURSE_NOTE },
  "/formacion/steam-robotica": { section: "Formación docente", parent: "/formacion", title: "STEAM y robótica educativa", description: "Innovación educativa con enfoque STEAM y robótica.", related: ["/biblioteca/recursos", "/concursos/ingreso-docente", "/concursos/coordinador", "/simulacros/ingreso-docente", "/simulacros/coordinador", "/simulacros/ascenso-reubicacion"], notice: SELF_STUDY },
  "/formacion/inteligencia-artificial": { section: "Formación docente", parent: "/formacion", title: "Inteligencia artificial aplicada a la educación", description: "Uso pedagógico y responsable de la IA en el aula.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/docente-ia", "/formacion/steam-robotica"], notice: COURSE_NOTE },
  "/formacion/evaluacion-formativa": { section: "Formación docente", parent: "/formacion", title: "Evaluación formativa y curricular", description: "Evaluación de aprendizajes y planeación curricular.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/concursos/ingreso-docente", "/concursos/coordinador"], notice: COURSE_NOTE },
  "/formacion/liderazgo-pedagogico": { section: "Formación docente", parent: "/formacion", title: "Liderazgo pedagógico", description: "Acompañamiento docente y liderazgo de procesos de aula.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/concursos/coordinador", "/concursos/rector"], notice: COURSE_NOTE },
  "/formacion/liderazgo-directivo": { section: "Formación docente", parent: "/formacion", title: "Gestión escolar para rectores y coordinadores", description: "Competencias directivas para la gestión escolar.", itemsTitle: "El curso incluirá", items: COURSE, related: ["/concursos/rector", "/concursos/coordinador", "/formacion/guia-34-pmi"], notice: COURSE_NOTE },

  "/simulacros": { section: "Simulacros", title: "Simulacros", description: "Práctica por tipo de concurso para fortalecer tu preparación.", itemsTitle: "Prácticas disponibles", items: SIM_PARTS, children: ["/simulacros/ingreso-docente", "/simulacros/ascenso-reubicacion", "/simulacros/rector", "/simulacros/coordinador"], related: ["/mis-resultados", "/concursos"], notice: PRACTICE_SIM + SIM_NOTE },
  "/simulacros/ingreso-docente": { section: "Simulacros", parent: "/simulacros", title: "Simulacros de ingreso docente", description: "Práctica para el concurso de ingreso a la carrera docente.", itemsTitle: "Estructura", items: SIM_PARTS, related: ["/concursos/ingreso-docente", "/formacion/evaluacion-formativa", "/mis-resultados"], notice: PRACTICE_SIM + SIM_NOTE },
  "/simulacros/ascenso-reubicacion": { section: "Simulacros", parent: "/simulacros", title: "Simulacros de ascenso y reubicación", description: "Práctica para ascenso y reubicación salarial.", itemsTitle: "Estructura", items: SIM_PARTS, related: ["/concursos/ascenso-reubicacion", "/biblioteca/legislacion", "/mis-resultados"], notice: PRACTICE_SIM + SIM_NOTE },
  "/simulacros/rector": { section: "Simulacros", parent: "/simulacros", title: "Simulacros para rector", description: "Práctica situacional para el concurso de rector.", itemsTitle: "Estructura", items: SIM_PARTS, related: ["/concursos/rector", "/formacion/guia-34-pmi", "/mis-resultados"], notice: PRACTICE_SIM + SIM_NOTE },
  "/simulacros/coordinador": { section: "Simulacros", parent: "/simulacros", title: "Simulacros para coordinador", description: "Práctica situacional para el concurso de coordinador.", itemsTitle: "Estructura", items: SIM_PARTS, related: ["/concursos/coordinador", "/formacion/convivencia-escolar", "/mis-resultados"], notice: PRACTICE_SIM + SIM_NOTE },

  "/biblioteca": { section: "Biblioteca normativa", title: "Biblioteca normativa", description: "Documentos de consulta organizados por categoría, con buscador y filtros.", children: ["/biblioteca/legislacion", "/biblioteca/guias-men", "/biblioteca/recursos", "/biblioteca/videos"], related: ["/docente-ia", "/formacion/actualizacion-normativa"], notice: DOCS },
  "/biblioteca/videos": { section: "Biblioteca normativa", parent: "/biblioteca", title: "Videos de apoyo por temática", description: "Videos públicos del Ministerio de Educación Nacional organizados por temática, con videos en Lengua de Señas Colombiana y transcripciones oficiales. Acceso libre.", related: ["/formacion/inclusion-dua-piar", "/formacion/convivencia-escolar", "/formacion/educacion-emocional", "/formacion/educacion-integral", "/formacion/steam-robotica", "/formacion/educacion-rural"] },
  "/biblioteca/legislacion": { section: "Biblioteca normativa", parent: "/biblioteca", title: "Legislación y carrera docente", description: "Leyes, decretos y normas de carrera docente, inclusión y convivencia.", related: ["/concursos", "/formacion/actualizacion-normativa"], notice: DOCS },
  "/biblioteca/guias-men": { section: "Biblioteca normativa", parent: "/biblioteca", title: "Gestión institucional y guías MEN", description: "Guía 34, PEI, PMI, gobierno escolar y evaluación institucional.", related: ["/formacion/guia-34-pmi", "/concursos/rector"], notice: DOCS },
  "/biblioteca/recursos": { section: "Biblioteca normativa", parent: "/biblioteca", title: "Políticas educativas", description: "Plan Decenal, educación integral, emocional, rural, etnoeducación y STEAM.", related: ["/formacion"], notice: DOCS },

  "/ingresar": { section: "Cuenta", title: "Ingresar", description: "Accede a tu espacio en EDUCALEX.", related: ["/registro"], notice: "Acceso gratuito por correo; Google pendiente de autorización." },
  "/registro": { section: "Cuenta", title: "Registro", description: "Crea tu cuenta y selecciona tu perfil profesional.", itemsTitle: "Perfiles disponibles al registrarte", items: ["Aspirante a docente", "Docente en ejercicio", "Docente que busca ascender", "Aspirante a coordinador", "Aspirante a rector"], related: ["/ingresar", "/privacidad"], notice: "Registro gratuito por correo y confirmación de cuenta." },
  "/mi-cuenta": { section: "Mi cuenta", title: "Mi cuenta", description: "Tu nivel de preparación y progreso personal en EDUCALEX.", restricted: "user", itemsTitle: "Tu espacio personal", items: ["Cursos inscritos", "Cursos completados", "Simulacros realizados", "Resultados", "Fortalezas", "Aspectos por mejorar", "Progreso general"], children: ["/mis-cursos", "/mis-simulacros", "/mis-resultados", "/mi-progreso", "/mis-certificados"], related: ["/planes"], notice: ACCOUNT },
  "/mis-cursos": { section: "Mi cuenta", parent: "/mi-cuenta", title: "Mis cursos", description: "Cursos en los que estás inscrito.", restricted: "user", related: ["/formacion"], notice: ACCOUNT },
  "/mis-simulacros": { section: "Mi cuenta", parent: "/mi-cuenta", title: "Mis simulacros", description: "Simulacros que has presentado o tienes en curso.", restricted: "user", related: ["/simulacros", "/mis-resultados"], notice: ACCOUNT },
  "/verificar": { section: "Simulacros", parent: "/simulacros", title: "Verificar constancia", description: "Comprueba si una constancia de participación de EDUCALEX es auténtica.", related: ["/simulacros"] },
  "/certificado": { section: "Simulacros", parent: "/simulacros", title: "Constancia de participación", description: "Constancia de participación en los simulacros de práctica EDUCALEX, descargable en PDF.", related: ["/simulacros", "/mis-resultados"] },
  "/mis-resultados": { section: "Simulacros", parent: "/simulacros", title: "Mis resultados", description: "Entregas de práctica con puntaje, competencias y retroalimentación formativa.", related: ["/simulacros", "/formacion"], notice: "Historial personal de prácticas originales. No representa una calificación oficial." },
  "/mi-progreso": { section: "Mi cuenta", parent: "/mi-cuenta", title: "Mi progreso", description: "Seguimiento de tu avance en cursos y simulacros.", restricted: "user", related: ["/mis-resultados", "/formacion"], notice: ACCOUNT },
  "/mis-certificados": { section: "Mi cuenta", parent: "/mi-cuenta", title: "Mis certificados", description: "Certificados de finalización emitidos por EDUCALEX.", restricted: "user", related: ["/formacion"], notice: ACCOUNT + " No hay certificados emitidos ni certificación habilitada." },

  "/admin": { section: "Administración", title: "Administración", description: "Panel de gestión de la plataforma.", restricted: "admin", children: ["/admin/usuarios", "/admin/cursos", "/admin/contenidos", "/admin/preguntas", "/admin/simulacros", "/admin/biblioteca", "/admin/certificados", "/admin/estadisticas"], notice: ADMIN },
  "/admin/usuarios": { section: "Administración", parent: "/admin", title: "Usuarios", description: "Gestión de usuarios y roles.", restricted: "admin", notice: ADMIN },
  "/admin/cursos": { section: "Administración", parent: "/admin", title: "Cursos", description: "Gestión del catálogo de cursos.", restricted: "admin", notice: ADMIN },
  "/admin/contenidos": { section: "Administración", parent: "/admin", title: "Contenidos y lecciones", description: "Gestión de unidades, lecciones, videos y recursos.", restricted: "admin", notice: ADMIN },
  "/admin/preguntas": { section: "Administración", parent: "/admin", title: "Banco de preguntas", description: "Gestión de preguntas y respuestas protegidas.", restricted: "admin", notice: ADMIN },
  "/admin/simulacros": { section: "Administración", parent: "/admin", title: "Simulacros", description: "Configuración de simulacros por concurso.", restricted: "admin", notice: ADMIN },
  "/admin/biblioteca": { section: "Administración", parent: "/admin", title: "Documentos", description: "Gestión y verificación de documentos de la biblioteca.", restricted: "admin", notice: ADMIN },
  "/admin/certificados": { section: "Administración", parent: "/admin", title: "Certificados", description: "Emisión y consulta de certificados.", restricted: "admin", notice: ADMIN },
  "/admin/estadisticas": { section: "Administración", parent: "/admin", title: "Estadísticas", description: "Indicadores de uso de la plataforma.", restricted: "admin", notice: ADMIN },

  "/asesoria-investigacion": { section: "EDUCALEX", title: "Asesoría en investigación", description: "Acompañamiento personalizado con la Dra. Enadis Vargas para proyectos de investigación, tesis y artículos, desde el problema hasta la sustentación.", related: ["/nosotros", "/contacto"], notice: "Servicio aparte de los planes de EDUCALEX. El valor se cotiza según el nivel, el alcance y el número de sesiones." },
  "/contacto": { section: "EDUCALEX", title: "Contacto", description: "Comunícate con el equipo de EDUCALEX.", related: ["/nosotros"], },
  "/privacidad": { section: "EDUCALEX", title: "Política de tratamiento de datos personales", description: "Cómo EDUCALEX trata tu información personal y cómo ejercer tus derechos (Ley 1581 de 2012).", related: ["/terminos"] },
  "/terminos": { section: "EDUCALEX", title: "Términos y condiciones", description: "Condiciones de uso de la plataforma EDUCALEX.", related: ["/privacidad"] },
} satisfies Record<string, PageDef>;

export type PagePath = keyof typeof pages;
export const getPage = (path: string): PageDef | undefined => (pages as Record<string, PageDef>)[path];

// Course catalog filters. Levels are an EDUCALEX catalog proposal, pending the user's confirmation.
export type Perfil = "Aspirante a docente" | "Docente en ejercicio" | "Docente que busca ascender" | "Aspirante a coordinador" | "Aspirante a rector";
export type Course = { path: PagePath; tema: string; nivel: "Fundamentación" | "Profundización" | "Especialización"; perfiles: Perfil[]; destacado?: boolean };
const ALL: Perfil[] = ["Aspirante a docente", "Docente en ejercicio", "Docente que busca ascender", "Aspirante a coordinador", "Aspirante a rector"];
const DIR: Perfil[] = ["Aspirante a coordinador", "Aspirante a rector"];
export const courses: Course[] = [
  { path: "/formacion/actualizacion-normativa", tema: "Normativa", nivel: "Fundamentación", perfiles: ALL },
  { path: "/formacion/guia-34-pmi", tema: "Gestión institucional", nivel: "Profundización", perfiles: [...DIR, "Docente en ejercicio"], destacado: true },
  { path: "/formacion/pmi", tema: "Gestión institucional", nivel: "Profundización", perfiles: [...DIR, "Docente en ejercicio"] },
  { path: "/formacion/pei", tema: "Gestión institucional", nivel: "Profundización", perfiles: DIR },
  { path: "/formacion/gestion-institucional", tema: "Gestión institucional", nivel: "Fundamentación", perfiles: DIR },
  { path: "/formacion/inclusion-dua-piar", tema: "Inclusión", nivel: "Fundamentación", perfiles: ALL },
  { path: "/formacion/educacion-rural", tema: "Inclusión", nivel: "Fundamentación", perfiles: ["Aspirante a docente", "Docente en ejercicio"] },
  { path: "/formacion/convivencia-escolar", tema: "Convivencia y bienestar", nivel: "Fundamentación", perfiles: ALL },
  { path: "/formacion/educacion-emocional", tema: "Convivencia y bienestar", nivel: "Fundamentación", perfiles: ["Aspirante a docente", "Docente en ejercicio", "Docente que busca ascender"] },
  { path: "/formacion/educacion-integral", tema: "Convivencia y bienestar", nivel: "Fundamentación", perfiles: ["Aspirante a docente", "Docente en ejercicio"] },
  { path: "/formacion/steam-robotica", tema: "Innovación", nivel: "Profundización", perfiles: ["Docente en ejercicio", "Docente que busca ascender"] },
  { path: "/formacion/inteligencia-artificial", tema: "Innovación", nivel: "Fundamentación", perfiles: ALL },
  { path: "/formacion/evaluacion-formativa", tema: "Pedagogía y currículo", nivel: "Profundización", perfiles: ["Aspirante a docente", "Docente en ejercicio", "Docente que busca ascender", "Aspirante a coordinador"] },
  { path: "/formacion/liderazgo-pedagogico", tema: "Liderazgo", nivel: "Especialización", perfiles: DIR },
  { path: "/formacion/liderazgo-directivo", tema: "Liderazgo", nivel: "Especialización", perfiles: DIR },
];

// Library catalog. A consulted link is not a claim of current validity or full-document review.
export type LibraryDoc = {
  id: string;
  title: string;
  nombreOficial: string;
  tipo: string;
  entidad: string;
  anio: number | null;
  fuenteUrl?: string;
  fuenteConsultada: boolean;
  descripcion: string;
  notas: string;
  categoria: string;
  shelf: "/biblioteca/legislacion" | "/biblioteca/guias-men" | "/biblioteca/recursos";
  related: PagePath[];
};
const L = "/biblioteca/legislacion", G = "/biblioteca/guias-men", R = "/biblioteca/recursos";
const FP_NOTE = "Enlace oficial consultado el 14 de noviembre de 2026. Función Pública advierte que su contenido es informativo y no garantiza la vigencia; revisa el texto, las modificaciones y las normas aplicables antes de usarlo.";
const MEN_NOTE = "Página institucional consultada el 14 de noviembre de 2026. La consulta del enlace no confirma por sí sola la vigencia ni implica lectura completa de los documentos allí enlazados.";
const OFFICIAL_NOTE = "Fuente oficial localizada y verificada el 14 de noviembre de 2026. Verificar la dirección no confirma por sí sola la vigencia integral; revisa el texto y sus modificaciones antes de citarlo.";
const PENDING = "Fuente pendiente de verificación. No se ha incorporado un enlace porque todavía no se ha identificado y comprobado la dirección oficial exacta.";
export const libraryDocs: LibraryDoc[] = [
  {
    id: "constitucion-1991", title: "Constitución Política de 1991", nombreOficial: "Constitución Política de Colombia de 1991", tipo: "Constitución", entidad: "Asamblea Nacional Constituyente / Función Pública", anio: 1991,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4125", fuenteConsultada: true,
    descripcion: "Norma de normas. Consagra la educación como derecho de la persona y servicio público con función social, la idoneidad ética y pedagógica de los educadores, la prevalencia de los derechos de los niños y la carrera administrativa basada en el mérito.", notas: FP_NOTE + " Ha sido reformada por actos legislativos; consulta el texto vigente antes de citar.", categoria: "Fundamentos constitucionales", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/formacion/actualizacion-normativa"],
  },
  {
    id: "decreto-1278-2002", title: "Decreto Ley 1278 de 2002", nombreOficial: "Decreto 1278 de 2002 — Estatuto de Profesionalización Docente", tipo: "Decreto ley", entidad: "Presidencia de la República / Función Pública", anio: 2002,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5353", fuenteConsultada: true,
    descripcion: "Regula relaciones del Estado con los educadores a su servicio y aborda ingreso, permanencia, ascenso, evaluación y retiro dentro de su ámbito de aplicación.",
    notas: FP_NOTE + " La ficha resume la presentación y algunos apartes visibles; no reemplaza el análisis integral del estatuto.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/ascenso-reubicacion", "/formacion/actualizacion-normativa"],
  },
  {
    id: "decreto-2277-1979", title: "Decreto 2277 de 1979", nombreOficial: "Decreto 2277 de 1979 — por el cual se adoptan normas sobre el ejercicio de la profesión docente", tipo: "Decreto", entidad: "Presidencia de la República / Ministerio de Educación Nacional", anio: 1979,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/normativa/Decretos/103879:Decreto-2277-de-Septiembre-14-de-1979", fuenteConsultada: true,
    descripcion: "Estatuto docente anterior al Decreto Ley 1278 de 2002. Regula el ejercicio de la profesión, el escalafón, la estabilidad, el ascenso y el retiro de los educadores vinculados bajo ese régimen.", notas: MEN_NOTE + "Expedido el 14 de septiembre de 1979. Los docentes de este régimen no participan en la evaluación de ascenso y reubicación del Decreto Ley 1278 de 2002; confirma qué régimen aplica a cada vinculación. El texto también está en el Gestor Normativo de Función Pública.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ascenso-reubicacion"],
  },
  {
    id: "normativa-ingreso-ascenso", title: "Normativa de ingreso, ascenso y reubicación", nombreOficial: "Conjunto temático; no corresponde a un documento único", tipo: "Tema normativo", entidad: "CNSC, Ministerio de Educación Nacional y entidades territoriales certificadas", anio: null,
    fuenteConsultada: false,
    descripcion: "Ruta de lectura: el ingreso a la carrera se rige por el Decreto Ley 1278 de 2002, el Decreto 915 de 2016 (compilado en el Decreto 1075 de 2015) y los acuerdos de convocatoria de la CNSC; el ascenso y la reubicación salarial, por los artículos 35 y 36 del Decreto Ley 1278 y la resolución anual del MEN. Consulta cada ficha enlazada.", notas: "Ficha de orientación sin enlace propio: cada norma citada tiene su ficha verificada en esta biblioteca. Las reglas concretas de cada proceso están en sus acuerdos o resoluciones.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/ascenso-reubicacion"],
  },
  {
    id: "decreto-915-2016", title: "Decreto 915 de 2016", nombreOficial: "Decreto 915 de 2016 — reglamenta el Decreto Ley 1278 de 2002 en materia de concursos de ingreso al sistema especial de carrera docente", tipo: "Decreto reglamentario", entidad: "Presidencia de la República / Ministerio de Educación Nacional", anio: 2016,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=70453", fuenteConsultada: true,
    descripcion: "Subroga el capítulo del Decreto 1075 de 2015 sobre el concurso de ingreso: principios, etapas (desde la determinación de vacantes definitivas), convocatoria a cargo de la CNSC y pruebas. El MEN lo cita como marco del concurso de 2026.", notas: FP_NOTE + "Expedido el 1 de junio de 2016. Su artículo sobre la prueba de aptitudes y competencias básicas fue modificado por el Decreto 2038 de 2016.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "decreto-2038-2016", title: "Decreto 2038 de 2016", nombreOficial: "Decreto 2038 de 2016 — modifica el artículo 2.4.1.1.11 del Decreto 1075 de 2015", tipo: "Decreto reglamentario", entidad: "Presidencia de la República / Ministerio de Educación Nacional", anio: 2016,
    fuenteUrl: "https://normograma.icfes.gov.co/docs/pdf/decreto_2038_2016.pdf", fuenteConsultada: true,
    descripcion: "Define la prueba de aptitudes y competencias básicas como la única eliminatoria del concurso, con puntaje mínimo aprobatorio de 60/100 para docentes y 70/100 para directivos docentes.", notas: OFFICIAL_NOTE + "Texto consultado en el normograma del ICFES (compilación actualizada al 27 de marzo de 2024). Confirma en el acuerdo de cada convocatoria cómo se aplican estos puntajes.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador", "/simulacros"],
  },
  {
    id: "resolucion-3842-2022", title: "Resolución 003842 de 2022", nombreOficial: "Resolución 003842 del 18 de marzo de 2022 — Manual de Funciones, Requisitos y Competencias para los cargos de directivos docentes y docentes", tipo: "Resolución", entidad: "Ministerio de Educación Nacional", anio: 2022,
    fuenteUrl: "https://www.mineducacion.gov.co/1780/articles-409868_pdf.pdf", fuenteConsultada: true,
    descripcion: "Manual que define funciones, requisitos (títulos habilitantes y experiencia) y competencias de rector, director rural, coordinador, docente orientador y docentes de aula. Derogó la Resolución 15683 de 2016.", notas: OFFICIAL_NOTE + "Enlace al PDF citado por el propio MEN en sus respuestas oficiales. En junio de 2026 el MEN anunció su revisión y actualización para el nuevo concurso, y publicó proyectos de modificación; verifica si ya hay una versión modificada antes de consultar requisitos.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "resolucion-018987-2025", title: "Resolución 018987 de 2025", nombreOficial: "Resolución 018987 del 17 de septiembre de 2025 — reglas del proceso de evaluación para ascenso de grado o reubicación de nivel salarial (Decreto Ley 1278 de 2002)", tipo: "Resolución", entidad: "Ministerio de Educación Nacional", anio: 2025,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/anos/2025/425821:Resolucion-018987-del-17-de-Septiembre-de-2025", fuenteConsultada: true,
    descripcion: "Rigió el proceso 2025-2026: prueba pedagógica escrita, autoevaluación del desempeño, valoración de experiencia, zona de desempeño y movimientos en el escalafón. Según el MEN, más de 26.300 educadores aprobaron esa evaluación.", notas: MEN_NOTE + "Referente del proceso anterior. Para 2026-2027 el MEN publicó un proyecto de resolución; a la fecha de consulta no se había verificado una resolución definitiva. No uses fechas del proyecto como si fueran oficiales.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ascenso-reubicacion", "/simulacros/ascenso-reubicacion"],
  },
  {
    id: "ley-1952-2019", title: "Ley 1952 de 2019", nombreOficial: "Ley 1952 de 2019 — Código General Disciplinario", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2019,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=90324", fuenteConsultada: true,
    descripcion: "Régimen disciplinario de los servidores públicos, incluidos docentes y directivos docentes oficiales. Derogó la Ley 734 de 2002 y fue reformado por la Ley 2094 de 2021.", notas: FP_NOTE + " Función Pública registra su entrada en vigencia el 9 de diciembre de 2021 y la reforma de la Ley 2094 de 2021.", categoria: "Carrera docente", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "ley-115-1994", title: "Ley 115 de 1994", nombreOficial: "Ley 115 de 1994 — Ley General de Educación", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 1994,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=292", fuenteConsultada: true,
    descripcion: "Expone la regulación general del servicio educativo, sus fines, niveles, organización, comunidad educativa e instituciones.", notas: FP_NOTE, categoria: "Legislación educativa", shelf: L, related: ["/formacion/actualizacion-normativa", "/concursos/ingreso-docente", "/concursos/rector"],
  },
  {
    id: "ley-715-2001", title: "Ley 715 de 2001", nombreOficial: "Ley 715 de 2001 — competencias y recursos del sector educativo", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2001,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4452", fuenteConsultada: true,
    descripcion: "Desarrolla competencias de la Nación y las entidades territoriales y regla aspectos de recursos, administración y prestación del servicio educativo.", notas: FP_NOTE, categoria: "Legislación educativa", shelf: L, related: ["/formacion/actualizacion-normativa", "/concursos/rector"],
  },
  {
    id: "decreto-1075-2015", title: "Decreto 1075 de 2015", nombreOficial: "Decreto 1075 de 2015 — Decreto Único Reglamentario del Sector Educación", tipo: "Decreto único reglamentario", entidad: "Presidencia de la República / Función Pública", anio: 2015,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=77913", fuenteConsultada: true,
    descripcion: "Compila disposiciones reglamentarias del sector educación y reúne numerosas modificaciones posteriores en el Gestor Normativo.", notas: FP_NOTE + " La página consultada muestra una fecha de actualización de 29 de abril de 2024; no se afirma que sea la revisión más reciente.", categoria: "Legislación educativa", shelf: L, related: ["/formacion/actualizacion-normativa", "/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "reglamentacion-complementaria", title: "Reglamentación complementaria vigente", nombreOficial: "Conjunto temático; documento único no identificado", tipo: "Tema normativo", entidad: "Varias entidades", anio: null,
    fuenteConsultada: false,
    descripcion: "La mayor parte de la reglamentación del sector está compilada en el Decreto 1075 de 2015. Consulta allí los decretos compilados (1860 de 1994, 1290 de 2009, 1421 de 2017, 1965 de 2013, 804 de 1995, 915 de 2016) que tienen ficha propia en esta biblioteca.", notas: "Ficha de orientación sin enlace propio. Antes de citar un artículo, verifica su número en el Decreto 1075 de 2015 y sus modificaciones.", categoria: "Legislación educativa", shelf: L, related: ["/formacion/actualizacion-normativa"],
  },
  {
    id: "decreto-1860-1994", title: "Decreto 1860 de 1994", nombreOficial: "Decreto 1860 de 1994 — reglamenta parcialmente la Ley 115 de 1994 en los aspectos pedagógicos y organizativos generales", tipo: "Decreto reglamentario", entidad: "Presidencia de la República / Ministerio de Educación Nacional", anio: 1994,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/ejes-tematicos/Normas-sobre-Educacion-Preescolar-Basica-y-Media/86240:Decreto-1860-de-Agosto-3-de-1994", fuenteConsultada: true,
    descripcion: "Reglamenta la prestación del servicio, la organización de la educación formal, el proyecto educativo institucional, la comunidad educativa, el gobierno escolar y el currículo.", notas: MEN_NOTE + "Expedido el 3 de agosto de 1994. Está compilado en el Decreto 1075 de 2015 y algunos artículos fueron modificados (por ejemplo, el artículo 16 por el Decreto 180 de 1997).", categoria: "Legislación educativa", shelf: L, related: ["/formacion/pei", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "decreto-1290-2009", title: "Decreto 1290 de 2009", nombreOficial: "Decreto 1290 de 2009 — reglamenta la evaluación del aprendizaje y promoción de los estudiantes de básica y media", tipo: "Decreto reglamentario", entidad: "Ministerio de Educación Nacional / Función Pública", anio: 2009,
    fuenteUrl: "https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=35954", fuenteConsultada: true,
    descripcion: "Establece los ámbitos y propósitos de la evaluación de estudiantes, la escala de valoración nacional y el Sistema Institucional de Evaluación de los Estudiantes (SIEE), que cada establecimiento construye con su comunidad.", notas: FP_NOTE + "Expedido el 16 de abril de 2009 y compilado en el Decreto 1075 de 2015. Derogó el Decreto 230 de 2002.", categoria: "Legislación educativa", shelf: L, related: ["/formacion/evaluacion-formativa", "/concursos/ingreso-docente", "/concursos/coordinador"],
  },
  {
    id: "guia-31", title: "Guía 31: evaluación anual de desempeño", nombreOficial: "Guía N.° 31 — Guía metodológica de evaluación anual de desempeño laboral de docentes y directivos docentes (Decreto Ley 1278 de 2002)", tipo: "Guía institucional", entidad: "Ministerio de Educación Nacional", anio: 2008,
    fuenteUrl: "https://www.mineducacion.gov.co/1780/w3-article-397376.html", fuenteConsultada: true,
    descripcion: "Orienta la evaluación anual de desempeño de los educadores del Decreto Ley 1278 de 2002, reglamentada por el Decreto 3782 de 2007 (compilado en el Decreto 1075 de 2015): proceso continuo, sistemático y basado en evidencias, con contribuciones individuales pactadas al inicio del año.", notas: MEN_NOTE + " La página del MEN reúne la Guía 31, los instrumentos y las directrices vigentes (actualizada en julio de 2026).", categoria: "Evaluación docente", shelf: G, related: ["/concursos/ascenso-reubicacion", "/concursos/ingreso-docente", "/concursos/rector"],
  },
  {
    id: "guia-34", title: "Guía 34 y Ruta de Mejoramiento Institucional", nombreOficial: "Referentes de calidad — índice institucional del MEN", tipo: "Índice de guías y orientaciones", entidad: "Ministerio de Educación Nacional", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/Preescolar-basica-y-media/Referentes-de-calidad/", fuenteConsultada: true,
    descripcion: "Página de acceso a referentes de calidad. Desde este índice se enlaza la Ruta de Mejoramiento Institucional y su actualización; este enlace no es el PDF de la guía.", notas: MEN_NOTE + " No se presenta el índice como si fuera el contenido íntegro de la Guía 34 histórica.", categoria: "Gestión institucional", shelf: G, related: ["/formacion/guia-34-pmi", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "guia-34-actualizacion-2026", title: "Actualización de la Guía N.° 34", nombreOficial: "Ruta de Mejoramiento Institucional para una Educación de Calidad. Actualización de la Guía N.° 34", tipo: "Guía metodológica — página de presentación", entidad: "Ministerio de Educación Nacional", anio: 2026,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/anos/2026/430002:Ruta-de-Mejoramiento-Institucional-para-una-Educacion-de-Calidad-Actualizacion-de-la-Guia-N-34", fuenteConsultada: true,
    descripcion: "Página oficial de la actualización, con acceso al PDF. Su presentación destaca formación integral, liderazgo distribuido, evaluación formativa, inclusión, bienestar, participación y otros ejes.", notas: MEN_NOTE + " La página indica actualización el 5 de agosto de 2026. Se verificó la página, no se afirma lectura completa del PDF ni se denomina «normativa nueva» a esta guía.", categoria: "Gestión institucional", shelf: G, related: ["/formacion/guia-34-pmi", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "pei", title: "PEI", nombreOficial: "Proyecto Educativo Institucional", tipo: "Tema de gestión institucional", entidad: "Cada institución educativa, según la Ley 115 de 1994 y el Decreto 1860 de 1994", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/ejes-tematicos/Normas-sobre-Educacion-Preescolar-Basica-y-Media/86240:Decreto-1860-de-Agosto-3-de-1994", fuenteConsultada: true,
    descripcion: "La Ley 115 de 1994 (artículo 73) exige a cada establecimiento elaborar y poner en práctica un PEI con su comunidad educativa; el Decreto 1860 de 1994 reglamenta su contenido. La Ley 2491 de 2025 ordena incorporarle el componente de competencias socioemocionales.", notas: MEN_NOTE + "El enlace lleva al Decreto 1860 de 1994, que reglamenta el PEI. Revisa también la Ley 115 de 1994 en su ficha.", categoria: "Gestión institucional", shelf: G, related: ["/formacion/pei"],
  },
  {
    id: "pmi", title: "PMI", nombreOficial: "Plan de Mejoramiento Institucional", tipo: "Tema de gestión institucional", entidad: "Cada institución educativa; orientación metodológica del MEN", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/anos/2026/430002:Ruta-de-Mejoramiento-Institucional-para-una-Educacion-de-Calidad-Actualizacion-de-la-Guia-N-34", fuenteConsultada: true,
    descripcion: "Plan que organiza acciones de mejoramiento a partir de la autoevaluación institucional. Su referente metodológico es la Ruta de Mejoramiento Institucional, actualización de la Guía N.° 34 (2026).", notas: MEN_NOTE + "La Guía 34 es una orientación metodológica, no una norma. El PMI se formula y se le hace seguimiento en cada institución.", categoria: "Gestión institucional", shelf: G, related: ["/formacion/pmi", "/formacion/guia-34-pmi"],
  },
  {
    id: "gobierno-escolar", title: "Gobierno escolar", nombreOficial: "Gobierno escolar — Ley 115 de 1994 y Decreto 1860 de 1994", tipo: "Tema de gestión institucional", entidad: "Congreso de la República / Ministerio de Educación Nacional", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/ejes-tematicos/Normas-sobre-Educacion-Preescolar-Basica-y-Media/86240:Decreto-1860-de-Agosto-3-de-1994", fuenteConsultada: true,
    descripcion: "La Ley 115 de 1994 (artículos 142 a 145) dispone que cada establecimiento tenga un gobierno escolar con rector, consejo directivo y consejo académico; el Decreto 1860 de 1994 reglamenta sus funciones y la participación de los estamentos.", notas: MEN_NOTE + "Para citar funciones concretas, consulta los artículos del Decreto 1860 de 1994 compilados en el Decreto 1075 de 2015.", categoria: "Gestión institucional", shelf: G, related: ["/concursos/rector", "/formacion/gestion-institucional"],
  },
  {
    id: "evaluacion-institucional", title: "Evaluación institucional", nombreOficial: "Evaluación institucional — Ley 115 de 1994 y Guía 34", tipo: "Tema de gestión institucional", entidad: "Congreso de la República / Ministerio de Educación Nacional", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/anos/2026/430002:Ruta-de-Mejoramiento-Institucional-para-una-Educacion-de-Calidad-Actualizacion-de-la-Guia-N-34", fuenteConsultada: true,
    descripcion: "La Ley 115 de 1994 (artículo 84) ordena una evaluación institucional anual. La Ruta de Mejoramiento Institucional del MEN orienta la autoevaluación por áreas de gestión y su uso para formular el PMI.", notas: MEN_NOTE + "No confundir con el Sistema Institucional de Evaluación de los Estudiantes (Decreto 1290 de 2009), que tiene ficha propia.", categoria: "Gestión institucional", shelf: G, related: ["/formacion/guia-34-pmi"],
  },
  {
    id: "decreto-1421-2017", title: "Decreto 1421 de 2017", nombreOficial: "Decreto 1421 de agosto 29 de 2017", tipo: "Decreto", entidad: "Ministerio de Educación Nacional", anio: 2017,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/normativa/Decretos/381928:Decreto-1421-de-agosto-29-de-2017", fuenteConsultada: true,
    descripcion: "La presentación oficial indica que reglamenta, en el marco de la educación inclusiva, la atención educativa a la población con discapacidad.", notas: MEN_NOTE + " La ficha usa la página de presentación del MEN; no se afirma haber leído el texto completo en SUIN-Juriscol.", categoria: "Inclusión", shelf: L, related: ["/formacion/inclusion-dua-piar", "/concursos/coordinador"],
  },
  {
    id: "dua", title: "DUA", nombreOficial: "Diseño Universal para el Aprendizaje (DUA) — definido en el Decreto 1421 de 2017", tipo: "Tema pedagógico con base normativa", entidad: "Ministerio de Educación Nacional", anio: 2017,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/normativa/Decretos/381928:Decreto-1421-de-agosto-29-de-2017", fuenteConsultada: true,
    descripcion: "El Decreto 1421 de 2017 incluye el DUA entre sus definiciones como diseño de productos, entornos, programas y servicios que todas las personas puedan usar, sin excluir ayudas técnicas cuando se requieran. Orienta la planeación anticipando barreras.", notas: MEN_NOTE + "Verifica el texto exacto de la definición en el Decreto 1421 de 2017 (compilado en el Decreto 1075 de 2015) antes de citarlo literalmente.", categoria: "Inclusión", shelf: L, related: ["/formacion/inclusion-dua-piar"],
  },
  {
    id: "piar", title: "PIAR", nombreOficial: "Plan Individual de Ajustes Razonables (PIAR) — Decreto 1421 de 2017", tipo: "Tema de inclusión con base normativa", entidad: "Ministerio de Educación Nacional", anio: 2017,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/normativa/Decretos/381928:Decreto-1421-de-agosto-29-de-2017", fuenteConsultada: true,
    descripcion: "Herramienta definida en el Decreto 1421 de 2017 para planear los apoyos y ajustes razonables de cada estudiante con discapacidad, con base en su valoración pedagógica y social. Lo elaboran docentes y docente de apoyo con la familia y el estudiante.", notas: MEN_NOTE + "El MEN ofrece orientaciones y un formato de referencia en el documento de orientaciones técnicas, administrativas y pedagógicas (ficha propia).", categoria: "Inclusión", shelf: L, related: ["/formacion/inclusion-dua-piar"],
  },
  {
    id: "orientaciones-inclusion", title: "Orientaciones del MEN sobre inclusión", nombreOficial: "Documento de orientaciones técnicas, administrativas y pedagógicas para la atención educativa a estudiantes con discapacidad en el marco de la educación inclusiva", tipo: "Guía institucional", entidad: "Ministerio de Educación Nacional", anio: 2017,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/360293:Documento-de-orientaciones-tecnicas-administrativas-y-pedagogicas-para-la-atencion-educativa-a-estudiantes-con-discapacidad-en-el-marco-de-la-educacion-inclusiva", fuenteConsultada: true,
    descripcion: "Documento del MEN que desarrolla el esquema de atención educativa para estudiantes con discapacidad: fundamentos normativos, caracterización, ajustes razonables y apoyos.", notas: MEN_NOTE + "El propio documento sugiere citarlo como Ministerio de Educación Nacional (2017).", categoria: "Inclusión", shelf: L, related: ["/formacion/inclusion-dua-piar"],
  },
  {
    id: "ley-1098-2006", title: "Ley 1098 de 2006", nombreOficial: "Ley 1098 de 2006 — Código de la Infancia y la Adolescencia", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2006,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=22106", fuenteConsultada: true,
    descripcion: "Establece la protección integral de niños, niñas y adolescentes: interés superior, corresponsabilidad de familia, sociedad y Estado, y obligaciones de las instituciones educativas.", notas: FP_NOTE + " Ha tenido modificaciones posteriores; revisa el texto actualizado antes de citar artículos.", categoria: "Convivencia", shelf: L, related: ["/formacion/ruta-atencion-integral", "/formacion/convivencia-escolar", "/concursos/coordinador"],
  },
  {
    id: "ley-1620-2013", title: "Ley 1620 de 2013", nombreOficial: "Ley 1620 de 2013 — Sistema Nacional de Convivencia Escolar", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2013,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=52287", fuenteConsultada: true,
    descripcion: "Crea el Sistema Nacional de Convivencia Escolar y Formación para el Ejercicio de los Derechos Humanos, la Educación para la Sexualidad y la Prevención y Mitigación de la Violencia Escolar.", notas: FP_NOTE + " La ficha consultada registra adiciones posteriores; revisa el texto actualizado antes de citar artículos.", categoria: "Convivencia", shelf: L, related: ["/formacion/ruta-atencion-integral", "/formacion/convivencia-escolar", "/concursos/coordinador"],
  },
  {
    id: "decreto-1965-2013", title: "Decreto 1965 de 2013", nombreOficial: "Decreto 1965 de 2013 — reglamentación de convivencia escolar", tipo: "Decreto", entidad: "Presidencia de la República / Función Pública", anio: 2013,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=54537", fuenteConsultada: true,
    descripcion: "Reglamenta aspectos del Sistema Nacional de Convivencia Escolar y lineamientos relacionados con manuales de convivencia y participación institucional.", notas: FP_NOTE, categoria: "Convivencia", shelf: L, related: ["/formacion/ruta-atencion-integral", "/formacion/convivencia-escolar", "/concursos/coordinador"],
  },
  {
    id: "protocolos-convivencia", title: "Guía 49: guías pedagógicas para la convivencia escolar", nombreOficial: "Guía N.° 49 — Guías pedagógicas para la convivencia escolar (Ley 1620 de 2013 – Decreto 1965 de 2013)", tipo: "Guía institucional", entidad: "Ministerio de Educación Nacional", anio: null,
    fuenteUrl: "https://contenidos.mineducacion.gov.co/ntg/men/pdf/Guia%20No.%2049.pdf", fuenteConsultada: true,
    descripcion: "Reúne las guías sobre manual de convivencia, Ruta de Atención Integral para la Convivencia Escolar y estrategias para fortalecer la convivencia, en desarrollo de la Ley 1620 y el Decreto 1965 de 2013.", notas: OFFICIAL_NOTE + "PDF publicado en el portal de contenidos del MEN. Los protocolos de cada institución deben quedar en su manual de convivencia.", categoria: "Convivencia", shelf: L, related: ["/formacion/ruta-atencion-integral", "/formacion/convivencia-escolar", "/concursos/coordinador"],
  },
  {
    id: "plan-decenal-2026-2035", title: "IV Plan Nacional Decenal de Educación 2026–2035", nombreOficial: "IV Plan Nacional Decenal de Educación 2026–2035", tipo: "Política pública — micrositio institucional", entidad: "Ministerio de Educación Nacional", anio: 2026,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/micrositios-institucionales/Plan-Decenal-de-Educacion-2026-2035/", fuenteConsultada: true,
    descripcion: "Micrositio oficial de la hoja de ruta decenal de política educativa, con antecedentes, proceso participativo, ejes y acceso al documento institucional.", notas: MEN_NOTE + " El título y periodo 2026–2035 se comprobaron en el micrositio; se corrigió el registro anterior que decía 2026–2036. No se afirma lectura completa del documento.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/actualizacion-normativa", "/formacion/guia-34-pmi"],
  },
  {
    id: "convocatorias-docentes-2026", title: "Concurso de docentes y directivos docentes 2026", nombreOficial: "Procesos de Selección Nos. 2917 a 3006 de 2026 — Docentes y Directivos Docentes", tipo: "Micrositio de convocatoria", entidad: "Comisión Nacional del Servicio Civil", anio: 2026,
    fuenteUrl: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026", fuenteConsultada: true,
    descripcion: "Micrositio oficial del concurso de ingreso 2026. La CNSC fijó (Resolución 11673 del 6 de noviembre de 2026) inscripciones para 2.255 vacantes reservadas a personas con discapacidad en 89 entidades territoriales, del 23 de noviembre de 2026 al 15 de enero de 2027.", notas: "Consultado el 14 de noviembre de 2026. Las fechas de inscripción general y de pruebas, y la oferta total de vacantes, deben confirmarse en este micrositio y en SIMO: el MEN informó 26.741 vacantes al cierre de la planeación (julio de 2026) y la cifra definitiva depende de la OPEC. No inferimos requisitos ni ponderaciones distintos a los de los acuerdos.", categoria: "Concursos y convocatorias", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "men-concurso-2026", title: "MEN y CNSC: preparación del concurso 2026", nombreOficial: "Comunicados del MEN del 19 de junio y 17 de julio de 2026 sobre el concurso docente", tipo: "Comunicado institucional", entidad: "Ministerio de Educación Nacional", anio: 2026,
    fuenteUrl: "https://www.mineducacion.gov.co/1780/w3-article-429273.html", fuenteConsultada: true,
    descripcion: "El MEN informó que trabaja con la CNSC en tres frentes: prueba de aptitudes y competencias básicas, valoración de antecedentes (con arraigo territorial) y protocolo de entrevista (competencias comportamentales, vocación de servicio y liderazgo pedagógico). También anunció la actualización del Manual de Funciones.", notas: MEN_NOTE + "Comunicado del 19 de junio de 2026; el del 17 de julio anunció el cierre de la planeación con 26.741 vacantes. Los comunicados no sustituyen los acuerdos de convocatoria.", categoria: "Concursos y convocatorias", shelf: L, related: ["/concursos/ingreso-docente", "/concursos/rector", "/concursos/coordinador"],
  },
  {
    id: "educacion-integral", title: "Formación integral", nombreOficial: "Formación integral y Jornadas Escolares Complementarias — página institucional del MEN", tipo: "Política educativa — página institucional", entidad: "Ministerio de Educación Nacional", anio: null,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/Preescolar-basica-y-media/Proyectos-Cobertura/235125:Formacion-Integral", fuenteConsultada: true,
    descripcion: "Estrategia del MEN para resignificar la jornada escolar con centros de interés en artes, cultura, deporte, ciencia y educación CRESE (ciudadana, para la reconciliación, antirracista, socioemocional y para el cambio climático).", notas: MEN_NOTE + "Es una estrategia de política, no una norma; sus programas pueden cambiar entre gobiernos.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-integral"],
  },
  {
    id: "educacion-emocional", title: "Ley 2491 de 2025", nombreOficial: "Ley 2491 de 2025 — incorpora a los Proyectos Educativos Institucionales el componente de competencias socioemocionales", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2025,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=261636", fuenteConsultada: true,
    descripcion: "Ordena al MEN garantizar la incorporación del componente socioemocional a los PEI y reconoce el derecho de niñas, niños y jóvenes a una educación integral que incluya competencias socioemocionales, de manera gradual en todos los niveles.", notas: FP_NOTE + "Expedida el 23 de julio de 2025. Revisa su reglamentación y las orientaciones del MEN antes de aplicarla en el PEI.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-emocional", "/formacion/pei"],
  },
  {
    id: "ley-2383-2024", title: "Ley 2383 de 2024", nombreOficial: "Ley 2383 de 2024 — promueve la educación socioemocional de los niños, niñas y adolescentes en las instituciones educativas de preescolar, primaria, básica y media", tipo: "Ley", entidad: "Congreso de la República / Función Pública", anio: 2024,
    fuenteUrl: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=261956", fuenteConsultada: true,
    descripcion: "Promueve de manera transversal la educación socioemocional en preescolar, básica y media. Fija cuatro líneas (estudiantes, formación de educadores, relaciones institucionales y escuela para familias), un diagnóstico previo en cada institución y tres etapas de diseño, implementación y evaluación.", notas: "Enlace oficial consultado el 21 de noviembre de 2026. Expedida el 19 de julio de 2024 (Diario Oficial 52.822). Función Pública advierte que su contenido es informativo; revisa la reglamentación del MEN antes de aplicarla.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-emocional", "/formacion/convivencia-escolar", "/concursos/coordinador"],
  },
  {
    id: "conpes-4188-2026", title: "CONPES 4188 de 2026 · Formación Integral", nombreOficial: "Documento CONPES 4188 — declara de importancia estratégica el Plan Nacional de Formación Integral", tipo: "Documento CONPES — política pública", entidad: "Consejo Nacional de Política Económica y Social / Ministerio de Educación Nacional", anio: 2026,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/428370:Gobierno-del-Cambio-lanza-CONPES-de-Formacion-Integral-para-transformar-la-educacion", fuenteConsultada: true,
    descripcion: "Convierte la formación integral en política de Estado para 2026–2036, con una inversión de $2,04 billones. Sus líneas: centros de interés, acompañamiento pedagógico situado (PTAFI 3.0), formación docente, resignificación del tiempo escolar y fortalecimiento institucional. Meta: 5.500 colegios, 3,65 millones de estudiantes y 82.000 docentes.", notas: "Comunicado oficial del MEN del 6 de abril de 2026, consultado el 21 de noviembre de 2026. No se afirma lectura completa del documento CONPES; consulta el texto en el portal del DNP.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-integral"],
  },
  {
    id: "educacion-rural", title: "Plan Especial de Educación Rural (PEER)", nombreOficial: "Plan Especial de Educación Rural — proyecto de resolución, memoria y anexos", tipo: "Plan de política pública", entidad: "Ministerio de Educación Nacional", anio: 2020,
    fuenteUrl: "https://www.mineducacion.gov.co/1759/w3-article-404773.html", fuenteConsultada: true,
    descripcion: "Plan derivado del punto 1.3.2.2 del Acuerdo Final de Paz para mejorar la cobertura, la calidad y la permanencia en las zonas rurales, con horizonte hasta 2031.", notas: MEN_NOTE + "La página reúne el proyecto de resolución de adopción, su memoria justificativa y el documento del plan (diciembre de 2020). El número de la resolución definitiva está pendiente de cotejo.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-rural"],
  },
  {
    id: "etnoeducacion", title: "Decreto 804 de 1995", nombreOficial: "Decreto 804 de 1995 — reglamenta la atención educativa para grupos étnicos", tipo: "Decreto reglamentario", entidad: "Presidencia de la República / Función Pública", anio: 1995,
    fuenteUrl: "https://funcionpublica.gov.co/eva/gestornormativo/norma.php?i=1377", fuenteConsultada: true,
    descripcion: "Define la etnoeducación y sus principios (integralidad, diversidad lingüística, autonomía, participación comunitaria, interculturalidad, flexibilidad, progresividad y solidaridad), la formación y selección de etnoeducadores y el currículo propio.", notas: FP_NOTE + "Expedido el 18 de mayo de 1995 y compilado en el Decreto 1075 de 2015. Hay un proyecto de ley de estatuto para etnoeducadores en trámite; no lo cites como vigente.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/educacion-rural"],
  },
  {
    id: "steam", title: "STEM+ en Colombia", nombreOficial: "Olimpiadas STEM+ Colombia — estrategia de innovación educativa del MEN", tipo: "Estrategia institucional — comunicado", entidad: "Ministerio de Educación Nacional", anio: 2025,
    fuenteUrl: "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/424923:Mineducacion-lanza-las-Olimpiadas-STEM+-Colombia-para-promover-la-innovacion-educativa-y-formar-a-las-nuevas-generaciones-de-talentos-cientificos", fuenteConsultada: true,
    descripcion: "El MEN impulsa el enfoque STEM+ (ciencia, tecnología, ingeniería y matemáticas, integradas con otras áreas) mediante las Olimpiadas STEM+ Colombia, desarrolladas con UNIMINUTO; en 2026 se realizó su segunda edición.", notas: MEN_NOTE + "Es una estrategia institucional, no una norma. No existe una norma nacional que defina un currículo STEAM obligatorio.", categoria: "Políticas educativas", shelf: R, related: ["/formacion/steam-robotica"],
  },
];

export const getLibraryDoc = (id: string) => libraryDocs.find(doc => doc.id === id);
