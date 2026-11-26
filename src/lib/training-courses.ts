import type { PagePath } from "@/lib/educalex-sitemap";

export type TrainingPath = "/formacion/actualizacion-normativa" | "/formacion/inclusion-dua-piar" | "/formacion/convivencia-escolar" | "/formacion/educacion-rural" | "/formacion/steam-robotica";
export type TrainingUnit = { title: string; objective: string; explanation: string[]; example: string; activity: string; readings: { docId: string; focus: string }[] };
export type WorkshopField = { key: string; label: string; hint: string; example: string };
export type TrainingCourse = { purpose: string; audience: string; units: TrainingUnit[]; workshop: { title: string; scenario: string; fields: WorkshopField[]; review: string[] }; related: PagePath[] };

export const trainingCourses: Record<TrainingPath, TrainingCourse> = {
  "/formacion/actualizacion-normativa": {
    purpose: "Ubicar las normas que rigen la educación oficial en Colombia, leerlas en su orden y aplicarlas a situaciones de la institución. El curso explica qué dice cada norma, dónde se encuentra y cómo comprobar si sigue vigente; no reemplaza la lectura del texto oficial ni la asesoría jurídica.",
    audience: "Aspirantes a la carrera docente, docentes que preparan el ascenso, coordinadores y rectores que necesitan actualizar su conocimiento de la normativa educativa.",
    related: ["/biblioteca/legislacion", "/concursos/ingreso-docente", "/concursos/rector", "/simulacros/ingreso-docente", "/simulacros/rector"],
    units: [
      {
        title: "El orden de las normas: de la Constitución al Decreto 1075",
        objective: "Reconocer el lugar de cada tipo de norma y comprobar si un artículo sigue vigente antes de aplicarlo.",
        explanation: [
          "La Constitución de 1991 define la educación como un derecho de la persona y un servicio público con función social (art. 67). Exige que la enseñanza esté a cargo de personas de reconocida idoneidad ética y pedagógica (art. 68) y establece que los empleos del Estado son de carrera, con ingreso y ascenso por mérito (art. 125). Los derechos de los niños prevalecen sobre los de los demás (art. 44).",
          "Las leyes desarrollan esos mandatos: la Ley 115 de 1994 es la Ley General de Educación y la Ley 715 de 2001 organiza competencias y recursos del sector. Los decretos reglamentan las leyes. Desde 2015, la mayoría de los decretos del sector está compilada en el Decreto 1075 de 2015, el Decreto Único Reglamentario del Sector Educación.",
          "Un decreto puede modificar artículos del Decreto 1075. Por ejemplo, el Decreto 277 de 2025 modificó tres artículos sobre jornada escolar, asignación académica y jornada laboral. Por eso, antes de citar una norma, conviene revisar su versión vigente en una fuente oficial, como el gestor normativo de Función Pública o la página del Ministerio de Educación.",
        ],
        example: "Caso ficticio en una institución de Montería: un docente cita en una reunión el horario de la jornada escolar con base en una fotocopia antigua del Decreto 1850 de 2002. La coordinadora revisa el Decreto 1075 de 2015 en la fuente oficial y encuentra que el artículo correspondiente fue modificado por el Decreto 277 de 2025. El equipo actualiza su referencia antes de tomar decisiones.",
        activity: "Elige una decisión de tu institución, como un horario, la promoción de un estudiante o la elección del personero. Escribe qué norma la regula, en qué tipo de norma está (ley, decreto o resolución) y cómo comprobarías que el artículo sigue vigente.",
        readings: [{ docId: "constitucion-1991", focus: "Lee los artículos 44, 67, 68 y 125 y relaciónalos con tu cargo." }, { docId: "decreto-1075-2015", focus: "Ubica cómo se organiza por libros, partes y títulos." }, { docId: "decreto-277-2025", focus: "Observa cómo un decreto nuevo modifica artículos del Decreto 1075." }],
      },
      {
        title: "La institución educativa: PEI, gobierno escolar y funciones del rector",
        objective: "Identificar quién decide cada asunto institucional y qué documento lo respalda.",
        explanation: [
          "La Ley 115 exige que cada establecimiento tenga un Proyecto Educativo Institucional que responda a las necesidades de los educandos, la comunidad local, la región y el país (art. 73). El Decreto 1860 de 1994 fija sus contenidos mínimos, entre ellos principios, objetivos, plan de estudios, manual de convivencia y gobierno escolar (art. 14), y dispone que lo adopta el consejo directivo, previa consulta al consejo académico (art. 15).",
          "En los establecimientos estatales, el gobierno escolar lo forman el rector, el consejo directivo y el consejo académico (Ley 115, arts. 142 a 145). El consejo directivo, presidido por el rector, adopta el manual de convivencia y fija los criterios para asignar cupos. El consejo académico, con un docente por área, organiza el plan de estudios. El personero y el consejo de estudiantes son instancias de participación, no órganos del gobierno escolar.",
          "La Ley 715 de 2001 asigna al rector, entre otras funciones, dirigir la preparación del PEI, formular planes de mejoramiento, distribuir las asignaciones académicas, administrar el Fondo de Servicios Educativos y publicar cada semestre los docentes, horarios y carga académica (art. 10). El MEN actualizó en 2026 la Guía 34, que orienta la autoevaluación y el plan de mejoramiento institucional.",
        ],
        example: "Caso ficticio en una institución de Cereté: un grupo de docentes propone cambiar el uniforme y lo anuncia por circular firmada solo por el coordinador. El rector explica que una modificación del manual de convivencia debe construirse con la comunidad y adoptarse en el consejo directivo. Convoca la discusión y lleva la propuesta a esa instancia.",
        activity: "Haz una tabla con tres decisiones institucionales (adoptar el PEI, organizar el plan de estudios y fijar criterios de cupos). Para cada una escribe la instancia que decide y el artículo que lo establece.",
        readings: [{ docId: "ley-115-1994", focus: "Artículos 73, 77, 87 y 142 a 145." }, { docId: "decreto-1860-1994", focus: "Artículos 14, 15, 21, 28 y 29." }, { docId: "ley-715-2001", focus: "Artículos 9 y 10: institución, centro educativo y funciones del rector." }, { docId: "guia-34-actualizacion-2026", focus: "Presentación de la actualización de la Guía 34 (MEN, 2026)." }],
      },
      {
        title: "Tiempo escolar y trabajo docente: lo que cambió en 2025",
        objective: "Distinguir jornada escolar, asignación académica, jornada laboral y Jornada Única.",
        explanation: [
          "El Decreto 277 de 2025 modificó el Decreto 1075 de 2015 en tres temas. La jornada escolar es el tiempo de los estudiantes: como mínimo, 20 horas semanales en preescolar, 25 en primaria, 30 en secundaria y media académica, y 37 en media técnica. Al menos el 80 % de esas horas se dedica a las áreas obligatorias y fundamentales, y el descanso pedagógico hace parte de la jornada.",
          "La asignación académica es el tiempo que el docente dedica a las clases: 20 horas semanales en preescolar, 25 en primaria y 22 en secundaria y media. La jornada laboral del docente es de ocho horas: seis en el establecimiento y dos fuera de él. Confundir estos tres conceptos es un error frecuente en las preguntas de los concursos.",
          "La Jornada Única es distinta: el Decreto 2105 de 2017 la define como el tiempo diario que el colegio oficial dedica a actividades académicas, descanso y alimentación, cinco días a la semana. La reconoce la entidad territorial certificada a cada institución que cumple las condiciones, y fija 25 horas semanales en preescolar, 30 en primaria y 35 en secundaria y media académica.",
        ],
        example: "Caso ficticio en una sede rural de San Pelayo: un padre reclama porque su hijo de primaria sale una hora antes que el de secundaria. La coordinadora le explica que la norma fija mínimos distintos por nivel y que la institución no está en Jornada Única, que requiere reconocimiento de la entidad territorial.",
        activity: "Para un docente de primaria y uno de secundaria inventados, escribe su asignación académica semanal, su jornada laboral y la jornada escolar mínima de sus estudiantes. Indica en qué artículo encontraste cada dato.",
        readings: [{ docId: "decreto-277-2025", focus: "Artículos que modifican jornada escolar, asignación académica y jornada laboral." }, { docId: "decreto-2105-2017", focus: "Definición, reconocimiento y duración de la Jornada Única." }],
      },
      {
        title: "Carrera docente: ingreso, evaluación y ascenso",
        objective: "Diferenciar el concurso de ingreso, las evaluaciones del Decreto 1278 y el proceso de ascenso o reubicación.",
        explanation: [
          "El Decreto Ley 1278 de 2002 rige a quienes ingresaron por concurso desde 2002; el Decreto 2277 de 1979 rige a quienes ya estaban en el escalafón anterior. El Decreto 1278 define la función docente, que incluye actividades curriculares no lectivas (art. 5), y señala como directivos docentes al director rural, al rector y al coordinador (art. 6). El escalafón tiene tres grados con niveles salariales de la A a la D (arts. 19 a 21).",
          "El ingreso es por concurso de méritos. Según el Decreto 2038 de 2016, la prueba de aptitudes y competencias básicas es la única eliminatoria, con un mínimo de 60/100 para docentes y 70/100 para directivos docentes; la psicotécnica es clasificatoria. Tras el nombramiento viene el período de prueba, que se aprueba con 60 % o más (arts. 12 y 31).",
          "El Decreto 1278 prevé evaluaciones de período de prueba, de desempeño anual y de competencias (arts. 27 y 35). La Resolución 018987 de 2025 del MEN reglamenta el proceso de ascenso y reubicación: exige, entre otros requisitos, tres años de servicio desde la primera posesión en período de prueba y 60 % en cada una de las dos últimas evaluaciones de desempeño (art. 7), e incluye una prueba pedagógica escrita de 0 a 45 puntos (art. 10).",
        ],
        example: "Caso ficticio en Sincelejo: una docente nombrada en 2022 por el Decreto 1278 obtuvo 55 % y 78 % en sus dos últimas evaluaciones de desempeño y quiere inscribirse al proceso de ascenso. Al revisar la Resolución 018987 de 2025, comprueba que no cumple el requisito, porque las evaluaciones no se promedian y una de ellas está por debajo de 60 %.",
        activity: "Elabora una línea de tiempo de la carrera de un docente inventado: concurso, nombramiento, período de prueba, evaluaciones anuales y ascenso. Indica en cada paso la norma y el artículo que lo regula.",
        readings: [{ docId: "decreto-1278-2002", focus: "Artículos 5, 6, 12, 19 a 21, 27, 31, 35 y 36." }, { docId: "decreto-2038-2016", focus: "Carácter eliminatorio de la prueba y puntajes mínimos." }, { docId: "resolucion-018987-2025", focus: "Requisitos e instrumentos del proceso de ascenso y reubicación." }, { docId: "guia-31", focus: "Evaluación anual de desempeño." }],
      },
      {
        title: "Evaluación, convivencia, inclusión y protección de derechos",
        objective: "Aplicar las normas que orientan la evaluación de los estudiantes, la convivencia escolar y la inclusión.",
        explanation: [
          "El Decreto 1290 de 2009 reglamenta la evaluación en el ámbito institucional. Cada institución define su Sistema Institucional de Evaluación de los Estudiantes (SIEE), con criterios, estrategias de apoyo, periodicidad de informes y mecanismos de reclamación, y lo aprueba el consejo directivo (arts. 4 y 8). La escala propia debe tener equivalencia con la nacional: Superior, Alto, Básico y Bajo (art. 5).",
          "La Ley 1620 de 2013 crea el sistema de convivencia escolar y la Ruta de Atención Integral, con componentes de promoción, prevención, atención y seguimiento (arts. 29 y 30). El Decreto 1965 de 2013 clasifica las situaciones en tipo I, II y III según los hechos, y fija protocolos para cada una (arts. 40 a 44). Ante un caso con menores, la Ley 1098 de 2006 ordena atender el interés superior de niños, niñas y adolescentes (art. 8) y prohíbe sanciones que afecten su dignidad (art. 45).",
          "El Decreto 1421 de 2017 reglamenta la atención educativa a la población con discapacidad: el Diseño Universal para el Aprendizaje orienta la planeación para todos, y el Plan Individual de Ajustes Razonables (PIAR) organiza los apoyos individuales; se elabora con la valoración pedagógica y con la participación de docentes, docente de apoyo, familia y estudiante.",
        ],
        example: "Caso ficticio en Lorica: dos estudiantes de séptimo se empujan en el descanso sin causar lesiones y es la primera vez. El docente lo maneja como situación tipo I: media entre ellos, deja registro y hace seguimiento. Si se hubiera tratado de agresiones reiteradas o de ciberacoso, el caso sería tipo II y tendría que ir al comité de convivencia.",
        activity: "Escribe tres situaciones escolares inventadas, una por tipo. Para cada una indica el tipo según el Decreto 1965, el primer paso del protocolo y quién debe actuar.",
        readings: [{ docId: "decreto-1290-2009", focus: "Artículos 3 a 8: propósitos, SIEE, escala y promoción." }, { docId: "ley-1620-2013", focus: "Comité escolar, responsabilidades y Ruta de Atención Integral." }, { docId: "decreto-1965-2013", focus: "Clasificación de situaciones y protocolos." }, { docId: "decreto-1421-2017", focus: "DUA, ajustes razonables y PIAR." }, { docId: "ley-1098-2006", focus: "Interés superior y obligaciones de las instituciones educativas." }],
      },
    ],
    workshop: {
      title: "Ficha de análisis normativo — caso ficticio",
      scenario: "Elige o inventa una situación de una institución educativa oficial. Úsala para practicar cómo se busca, se lee y se aplica una norma. No incluyas nombres ni datos reales de estudiantes, docentes o familias.",
      fields: [
        { key: "situacion", label: "Situación", hint: "Describe el hecho en dos o tres frases, sin nombres.", example: "Un padre pide que su hijo sea promovido aunque perdió tres áreas en el año." },
        { key: "pregunta", label: "Pregunta que debes resolver", hint: "Formúlala de modo que una norma pueda responderla.", example: "¿Quién define los criterios de promoción y qué recurso tiene el padre?" },
        { key: "norma", label: "Norma y artículo", hint: "Cita la norma, el artículo y el tipo de norma.", example: "Decreto 1290 de 2009, artículos 6 y 8, compilado en el Decreto 1075 de 2015." },
        { key: "contenido", label: "Qué dice la norma, en tus palabras", hint: "Parafrasea; no copies el texto completo.", example: "La promoción la define el SIEE de cada institución, que aprueba el consejo directivo." },
        { key: "instancia", label: "Quién decide o actúa", hint: "Persona u órgano responsable.", example: "La comisión de evaluación aplica el SIEE; la reclamación sigue el procedimiento del SIEE." },
        { key: "accion", label: "Acción en la institución", hint: "Qué harías y cómo lo comunicarías.", example: "Explicar al padre los criterios del SIEE y orientarlo en el procedimiento de reclamación." },
        { key: "vigencia", label: "Cómo comprobaste la vigencia", hint: "Fuente oficial consultada y fecha.", example: "Gestor normativo de Función Pública, consultado el 26 de noviembre de 2026." },
      ],
      review: ["La pregunta se puede responder con una norma concreta.", "Cité el artículo y el tipo de norma.", "Parafraseé sin cambiar el sentido de la norma.", "Identifiqué la instancia que decide.", "Comprobé la vigencia en una fuente oficial."],
    },
  },
  "/formacion/inclusion-dua-piar": {
    purpose: "Reconocer barreras del entorno, diseñar opciones de aprendizaje para el grupo y proponer apoyos individualizados sin confundir DUA con PIAR. La inclusión se trabaja con expectativas de aprendizaje, participación y cuidado de la información, no con etiquetas que sustituyan la comprensión pedagógica.",
    audience: "Docentes de aula y de apoyo, aspirantes a la carrera, coordinadores y rectores que acompañan prácticas inclusivas.",
    related: ["/concursos/ingreso-docente", "/concursos/coordinador", "/simulacros/ingreso-docente", "/simulacros/coordinador", "/simulacros/ascenso-reubicacion"],
    units: [
      {
        title: "Accesibilidad y barreras: observar el entorno",
        objective: "Distinguir una barrera de acceso o participación de una característica individual y proponer cambios observables en una actividad.",
        explanation: [
          "Una barrera surge de la relación entre las personas y las condiciones de aprendizaje. Un texto con letra muy pequeña, una consigna que solo se comunica oralmente o una actividad que exige subir escaleras pueden excluir sin que el propósito de aprendizaje lo requiera. Describir la barrera como ‘el material no permite ampliar la letra’ orienta una intervención; describirla como ‘el estudiante no puede’ puede ocultar lo que la escuela sí puede transformar.",
          "La accesibilidad incluye espacios, comunicación, materiales, tecnologías y relaciones. Antes de elegir un apoyo, precisa qué se quiere aprender, observa en qué momento se interrumpe la participación y escucha las preferencias de la persona. Cambia una condición, observa si mejora el acceso y revisa su efecto. La misma alternativa no sirve a todas las personas: un audio puede apoyar a algunas y no ser accesible para otras. No se requiere divulgar un diagnóstico para ofrecer materiales legibles o consignas claras.",
          "El Decreto 1421 de 2017 reglamenta la atención educativa a la población con discapacidad dentro de la educación inclusiva; no convierte toda dificultad escolar en discapacidad. Esta lectura pedagógica no sustituye su texto ni los procedimientos institucionales. Para tomar decisiones formales se deben revisar la norma, su articulación con el Decreto 1075 y las orientaciones aplicables. La observación del aula no es un diagnóstico clínico."
        ],
        example: "Caso completamente ficticio en una sede de Sincelejo: el grupo debe interpretar un gráfico impreso borroso. La docente conserva el objetivo de comparar cantidades, entrega una versión ampliada y ofrece piezas con relieve y explicación verbal. Comprueba con cada participante qué opción permite identificar los datos; no presume necesidades a partir de una etiqueta.",
        activity: "Elige una actividad inventada. Escribe su objetivo, dos barreras del material o del ambiente y una modificación para cada una. Describe qué evidencia de participación recogerías sin registrar nombres ni diagnósticos.",
        readings: [{ docId: "decreto-1421-2017", focus: "Contrasta el ámbito de atención educativa a población con discapacidad con las barreras que describiste." }, { docId: "decreto-1075-2015", focus: "Revisa la articulación reglamentaria del sector; no uses esta lectura como una revisión de vigencia." }]
      },
      {
        title: "DUA: anticipar opciones para todo el grupo",
        objective: "Diseñar opciones de implicación, representación y acción o expresión que mantengan un propósito de aprendizaje común.",
        explanation: [
          "El Diseño Universal para el Aprendizaje es un enfoque de planeación que anticipa variabilidad. Permite ofrecer diversas maneras de interesarse y sostener el esfuerzo, acceder a la información y expresar lo aprendido. No consiste en dividir permanentemente a estudiantes por supuestos estilos de aprendizaje ni en preparar una tarea más fácil para un grupo etiquetado. Las opciones deben responder a barreras concretas y estar disponibles sin estigmatizar.",
          "Parte del propósito y distingue el aprendizaje central del medio usado para demostrarlo. Si se busca explicar un ciclo natural, pueden servir un relato oral, un diagrama comentado o un texto, con criterios comunes de exactitud y relaciones causales. Si se busca escribir un argumento, la escritura sí forma parte del objetivo: los apoyos pueden ser un organizador o tiempo adicional sin eliminar ese aprendizaje. Opciones sin criterios claros pueden parecer inclusivas y, sin embargo, ocultar lo que se evalúa.",
          "Una planeación DUA no elimina la necesidad de apoyos individualizados ni reemplaza el PIAR. Primero examina las barreras previsibles del diseño general y luego identifica cuáles persisten para una persona. Evalúa las opciones con participación y evidencias; ofrecer veinte recursos no garantiza acceso. La ficha DUA de la biblioteca sigue pendiente de una publicación precisa: aquí se desarrolla una explicación original, no una transcripción de un documento oficial confirmado."
        ],
        example: "Caso ficticio en una escuela de Pereira: para explicar el ciclo del agua, el grupo elige entre un esquema comentado y un relato acompañado de dibujos. Todas las producciones deben relacionar evaporación, condensación y precipitación. La docente proporciona un glosario visual y permite ensayar antes de presentar.",
        activity: "Rediseña la actividad anterior con una opción de participación, dos formas de acceder al contenido y dos medios de expresión. Justifica qué criterio común mantienes y qué apoyo necesitaría revisión individual.",
        readings: [{ docId: "decreto-1421-2017", focus: "Examina el contexto reglamentario de diseño universal y apoyos." }, { docId: "dua", focus: "La publicación específica de DUA está pendiente; consulta el estado de la categoría Inclusión." }]
      },
      {
        title: "PIAR y ajustes razonables individualizados",
        objective: "Relacionar valoración pedagógica, barrera, ajuste y seguimiento, diferenciando un ejercicio de aula de un PIAR institucional.",
        explanation: [
          "El Plan Individual de Ajustes Razonables organiza apoyos individualizados para estudiantes con discapacidad, a partir de la valoración pedagógica y social y de las barreras identificadas. DUA y PIAR no son sinónimos: el primero anticipa alternativas para el diseño general; el segundo permite precisar ajustes y acuerdos individualizados que ese diseño no resuelve por sí solo. El PIAR no es una lista de diagnósticos ni un currículo automáticamente reducido.",
          "Un ajuste se justifica por la relación entre una barrera y un aprendizaje. Debe especificar qué cambia, en qué actividad, con qué apoyo y cómo se revisará su efecto. Por ejemplo, disponer de un sistema de comunicación y más tiempo para organizar una respuesta puede permitir demostrar comprensión sin cambiar el criterio conceptual. Los acuerdos requieren participación del estudiante y su familia y coordinación de quienes intervienen según el marco institucional; la persona docente no debe inventar competencias clínicas ni condicionar apoyos a conseguir una etiqueta.",
          "La matriz de este curso permite practicar el razonamiento, pero no es el formato oficial del PIAR ni lo reemplaza. Una decisión institucional necesita los procedimientos, participantes y documentación aplicables. Formula el ajuste como una hipótesis pedagógica revisable: si no mejora acceso o aprendizaje, pregunta por la barrera que persiste. No declares éxito solo porque el formulario quedó completo."
        ],
        example: "Caso ficticio en Manizales, sin identidad ni diagnóstico real: una persona del grupo comprende una secuencia, pero la actividad exige responder muy rápido en voz alta. El equipo ensaya tarjetas de comunicación, anticipación de la consigna y tiempo de preparación. Conserva el criterio de ordenar y justificar la secuencia y revisa el apoyo en dos actividades distintas.",
        activity: "Usa el taller para relacionar una barrera inventada con un ajuste. Escribe por qué las opciones generales no bastan, cómo consultarías la preferencia del estudiante y qué evidencia permitiría mantener o cambiar el apoyo.",
        readings: [{ docId: "decreto-1421-2017", focus: "Consulta el texto oficial y sus apartados sobre PIAR, valoración y responsabilidades antes de cualquier uso institucional." }, { docId: "piar", focus: "La orientación o formato específico de PIAR aún está pendiente de cotejo en la biblioteca." }]
      },
      {
        title: "Evaluación accesible y expectativas de aprendizaje",
        objective: "Proponer criterios de evaluación coherentes con el aprendizaje y apoyos que no confundan rapidez o formato con comprensión.",
        explanation: [
          "Una evaluación accesible conserva claridad sobre qué aprendizaje se observa y reconoce que un instrumento puede introducir barreras ajenas a ese aprendizaje. Si se evalúa comprensión científica, la calidad de la caligrafía no debería convertirse sin justificación en la principal evidencia. Explica criterios antes de la tarea, ofrece retroalimentación durante el proceso y recoge más de una evidencia. Un único resultado no describe toda la capacidad de una persona.",
          "Hay que distinguir apoyos de acceso, cambios en el medio de respuesta y decisiones individualizadas sobre objetivos. Tiempo adicional, lectura accesible de una consigna o un organizador no equivalen necesariamente a reducir expectativas. Cuando se acuerdan objetivos individualizados, se debe documentar su fundamento y evaluar de modo coherente con ellos y con el sistema institucional aplicable; no se puede inventar una regla universal de promoción para este taller. Evita premiar solo obediencia o participación cuando el criterio era argumentar.",
          "La retroalimentación señala lo logrado, una dificultad concreta y el siguiente paso. Puede invitar a comparar dos respuestas, corregir una relación causal o elegir un apoyo que facilite revisión. Examina si el ajuste permitió mostrar conocimiento y si la persona pudo usarlo con autonomía creciente, sin retirar apoyos que siguen siendo necesarios. Contrasta decisiones de evaluación con el marco reglamentario y los acuerdos de la institución."
        ],
        example: "Caso ficticio en Cali: el objetivo es justificar por qué un objeto flota. La docente acepta un audio acompañado de un dibujo y un texto breve con el mismo criterio: relacionar una observación con una explicación. Una rúbrica distingue ‘describe’ de ‘justifica’; no otorga puntos extra por usar tecnología.",
        activity: "Construye tres criterios observables y dos medios de respuesta para una tarea ficticia. Anota qué aspecto no evaluarías porque es una barrera del formato y cómo darías una oportunidad de revisión.",
        readings: [{ docId: "decreto-1075-2015", focus: "Ubica la reglamentación de evaluación y contrástala con el sistema institucional correspondiente." }, { docId: "decreto-1421-2017", focus: "Relaciona evaluación y ajustes sin deducir reglas automáticas de promoción." }]
      },
      {
        title: "Confidencialidad, participación y seguimiento",
        objective: "Diseñar un seguimiento mínimo que cuide datos sensibles y permita revisar apoyos con las personas implicadas.",
        explanation: [
          "La información sobre discapacidad, salud o situaciones familiares puede ser sensible. No debe circular en grupos públicos, exposiciones de aula ni herramientas digitales ajenas a los procedimientos autorizados. Para estudiar una práctica basta un escenario inventado: elimina nombres, edades exactas, fotografías, diagnósticos y detalles que permitan reconocer a alguien. Quitar solo el nombre no vuelve anónima una historia si conserva una combinación identificable de circunstancias.",
          "Participar no significa que todo el mundo acceda a todo el expediente. Comparte únicamente lo necesario para la función de cada persona, mediante los canales institucionales definidos. Escucha al estudiante de forma accesible, comunica a la familia propósitos y apoyos sin culpabilizar y acuerda cómo revisar avances. En este curso no se recopilan expedientes ni se emiten decisiones institucionales; copiar o imprimir deja una copia bajo responsabilidad de quien la genera.",
          "El seguimiento compara evidencias antes y después del apoyo y registra también barreras pendientes. Evita atribuir causalidad definitiva a una observación aislada. Una reunión puede revisar qué permitió participar, qué aprendizaje se observó y qué debe cambiar en materiales o interacción. La inclusión se sostiene en decisiones cotidianas y condiciones institucionales, no en completar un documento una sola vez. Para el tratamiento formal de datos se requiere revisar además la normativa de protección de datos y los protocolos autorizados, no verificados aquí de manera integral."
        ],
        example: "Caso ficticio en Bucaramanga: un equipo comenta una actividad usando únicamente el código didáctico ‘Escenario A’, sin asociarlo a una persona real. Compara dos producciones inventadas y acuerda revisar la legibilidad de la consigna. El acta de práctica no contiene datos de menores y no se sube a un asistente de IA.",
        activity: "Revisa tu matriz: elimina cualquier detalle identificable, precisa una fecha relativa de revisión y una evidencia de aprendizaje. Explica qué información no compartirías y qué decisión exige el procedimiento institucional.",
        readings: [{ docId: "decreto-1421-2017", focus: "Revisa participación y seguimiento en el marco de atención educativa." }, { docId: "orientaciones-inclusion", focus: "Las orientaciones concretas aún están pendientes; no se atribuyen protocolos de datos a esta ficha." }]
      }
    ],
    workshop: {
      title: "Matriz de barreras y ajustes — práctica no identificable",
      scenario: "Diseña apoyos para una tarea de secuencias inventada. Esta matriz no es un PIAR oficial. No ingreses nombres, diagnósticos ni información de personas reales.",
      fields: [
        { key: "goal", label: "Aprendizaje y criterio", hint: "Define qué se espera demostrar, no un diagnóstico.", example: "Ordenar tres etapas de un proceso y justificar la relación entre ellas." },
        { key: "barrier", label: "Barrera del entorno", hint: "Ubica el obstáculo en material, comunicación o interacción.", example: "La consigna solo es oral y exige respuesta inmediata." },
        { key: "dua", label: "Opciones DUA para el grupo", hint: "Anticipa alternativas para todas las personas.", example: "Consigna escrita e ilustrada; ensayo en parejas y tarjetas de secuencia." },
        { key: "adjustment", label: "Ajuste individualizado propuesto", hint: "Explica la barrera que persiste y el apoyo a ensayar.", example: "Sistema de tarjetas para comunicar la justificación y tiempo de organización, si las opciones generales no bastan." },
        { key: "participation", label: "Participación y acuerdos ficticios", hint: "Describe cómo escuchar preferencias sin datos personales.", example: "Consultar qué apoyo permite expresarse; acordar con el equipo pedagógico un ensayo en dos tareas." },
        { key: "evidence", label: "Evidencia de aprendizaje", hint: "Mantén el criterio central y distingue acceso de comprensión.", example: "Orden y justificación de la secuencia, en el medio de respuesta elegido." },
        { key: "followup", label: "Revisión del apoyo", hint: "Señala cuándo observar y qué haría cambiar la propuesta.", example: "Después de dos actividades: revisar participación, justificación y barreras pendientes." },
        { key: "privacy", label: "Cuidado de la información", hint: "No describas a personas reales.", example: "Solo escenario inventado; no adjuntar expedientes ni divulgar datos sensibles." }
      ],
      review: ["La barrera se describe en el entorno, no como etiqueta personal.", "Distinguí opciones DUA de ajustes individualizados.", "El criterio de aprendizaje y la revisión están definidos.", "No incluí información que identifique a personas reales."]
    }
  },
  "/formacion/convivencia-escolar": {
    purpose: "Fortalecer la prevención y el análisis responsable de situaciones de convivencia, distinguiendo el acompañamiento pedagógico de las actuaciones de protección y de las competencias de autoridades externas. La práctica no reemplaza el manual institucional ni la Ruta de Atención Integral.",
    audience: "Docentes, coordinadores, rectores y aspirantes que estudian convivencia escolar y protección de derechos.",
    related: ["/concursos/coordinador", "/concursos/rector", "/simulacros/coordinador", "/simulacros/rector"],
    units: [
      {
        title: "Marco de convivencia y responsabilidades",
        objective: "Relacionar Ley 1620, Decreto 1965 y Decreto 1075 sin tratar el taller como una actualización jurídica completa.",
        explanation: [
          "La Ley 1620 de 2013 crea el Sistema Nacional de Convivencia Escolar y vincula la convivencia con derechos humanos, educación para la sexualidad y prevención de violencia. La escuela no solo reacciona a incidentes: construye condiciones de participación y aprendizaje. Conflicto, agresión y acoso no son equivalentes. Un desacuerdo puede tramitarse de forma constructiva; una agresión puede vulnerar derechos; el acoso involucra patrones que requieren examen cuidadoso, no una etiqueta aplicada por una única frase.",
          "El Decreto 1965 de 2013 desarrolla la reglamentación de la ley. Su contenido debe leerse articulado con la compilación del Decreto 1075 de 2015 y las modificaciones aplicables. Las páginas de biblioteca fueron consultadas, pero eso no constituye una verificación jurídica exhaustiva de vigencia. Antes de una actuación institucional se debe cotejar el texto pertinente, el manual de convivencia y los protocolos territoriales; no se cita un artículo aislado como si resolviera cualquier caso.",
          "La responsabilidad pedagógica comprende prevenir, observar, proteger y activar los procedimientos que correspondan al rol. La institución no reemplaza a salud, protección de infancia ni autoridades judiciales. Tampoco puede usar un acuerdo de aula para dejar sin atención un riesgo. La escucha debe separar hechos observados, relatos y suposiciones, sin convertir al docente en investigador penal ni pedir a estudiantes que confronten a quien pudo agredirlos."
        ],
        example: "Caso ficticio en una institución de Ibagué: durante un trabajo grupal hay un desacuerdo por materiales. La docente registra lo que observó y facilita turnos. Cuando un relato posterior menciona amenazas, no asume que el acuerdo del grupo basta; informa por el canal institucional y verifica el procedimiento de protección aplicable.",
        activity: "Elabora dos columnas: acciones pedagógicas propias del aula y actuaciones que requieren verificar competencias y activar canales institucionales. Explica por qué una amenaza no se resuelve únicamente con un cartel de acuerdos.",
        readings: [{ docId: "ley-1620-2013", focus: "Estudia el objeto del sistema y las responsabilidades sin extrapolar atribuciones." }, { docId: "decreto-1965-2013", focus: "Relaciona la reglamentación original con la compilación y sus modificaciones." }, { docId: "decreto-1075-2015", focus: "Contrasta el marco reglamentario aplicable; no se afirma revisión integral de vigencia." }]
      },
      {
        title: "Comité escolar y participación responsable",
        objective: "Diferenciar las funciones de promoción, análisis y seguimiento del comité de las competencias de autoridades externas.",
        explanation: [
          "El comité escolar de convivencia es una instancia institucional prevista en la Ley 1620. Su composición y funciones deben consultarse en la norma y en los procedimientos del establecimiento; no se definen libremente en este curso. Acompaña la promoción de convivencia, analiza situaciones y apoya la activación y seguimiento de la ruta dentro de sus funciones. No es un tribunal penal ni una reunión en la que toda la comunidad tenga derecho a conocer expedientes sensibles.",
          "La participación estudiantil y familiar puede aportar diagnóstico de clima, revisión de acuerdos y propuestas preventivas. Esto no significa exponer casos personales ante una asamblea. Separa espacios de participación general de actuaciones sobre situaciones específicas. Las actas y canales de información requieren cuidado, acceso acorde con responsabilidades y trazabilidad de decisiones, sin divulgar detalles innecesarios. Un ejemplo de aula no determina quién debe ser integrante ni cómo se adopta una decisión formal.",
          "Para que la participación tenga efecto, una propuesta debe indicar el problema colectivo, la acción, responsables según su competencia y una manera de revisar resultados. Encuestas de clima anónimas pueden orientar prevención, pero no sustituyen la atención de reportes ni deben solicitar relatos identificables. Antes de aplicar un instrumento real se revisan autorizaciones, protección de datos y procedimientos institucionales."
        ],
        example: "Caso ficticio en Neiva: una consulta inventada de clima muestra que varias personas sienten que no tienen turno para hablar. El comité estudia una propuesta de círculos de conversación en su ámbito institucional. El ejercicio usa datos simulados y no presenta historias de violencia ante todo el grupo.",
        activity: "Redacta una propuesta colectiva con objetivo, acción y evidencia de revisión. Señala qué información se discutiría públicamente y cuál debe permanecer en los canales autorizados. No inventes decisiones disciplinarias del comité.",
        readings: [{ docId: "ley-1620-2013", focus: "Consulta composición y funciones del comité escolar de convivencia." }, { docId: "decreto-1075-2015", focus: "Coteja los procedimientos reglamentarios aplicables." }]
      },
      {
        title: "Ruta de Atención Integral y análisis inicial",
        objective: "Reconocer promoción, prevención, atención y seguimiento y evitar que una clasificación apresurada retrase la protección.",
        explanation: [
          "La Ruta de Atención Integral organiza promoción, prevención, atención y seguimiento. Promover implica desarrollar capacidades y condiciones de convivencia; prevenir supone reconocer riesgos y reducirlos; atender exige actuar ante situaciones reportadas; seguir permite revisar protección y cumplimiento de medidas. No son cuatro casillas que se llenan una vez: un plan preventivo puede ajustarse con lo aprendido en atención, cuidando siempre la confidencialidad.",
          "La reglamentación diferencia situaciones tipo I, II y III. En términos de estudio, el tipo I contempla conflictos manejados inadecuadamente y situaciones esporádicas que afectan el clima sin daño al cuerpo o salud; el tipo II abarca agresión, acoso o ciberacoso que no reviste características de delito y cumple condiciones reglamentarias como repetición o daño sin incapacidad; el tipo III corresponde a agresiones que constituyen presuntos delitos. La tipificación requiere consultar los criterios y protocolos exactos: la docente no declara responsabilidad penal ni decide sola una categoría a partir de datos incompletos.",
          "Ante riesgo, la protección y la atención necesaria no deben esperar a que termine un debate sobre el tipo. Activa los canales institucionales y externos que correspondan conforme al protocolo; documenta hechos mínimos y evita interrogatorios repetidos, exposición o promesas de secreto absoluto. Si hay una urgencia, se solicita atención inmediata a las instancias competentes. El taller no provee teléfonos ni una ruta territorial verificada y no debe utilizarse como protocolo operativo."
        ],
        example: "Caso ficticio en Pasto: alguien informa agresiones repetidas y temor de asistir. El equipo no lo reduce a ‘problemas entre amigos’ ni organiza una confrontación. Prioriza seguridad y cuidado, comunica por el canal definido y consulta el protocolo aplicable, sin declarar culpabilidades en la actividad formativa.",
        activity: "En el taller, separa hechos, información que falta y necesidades inmediatas de protección. Escribe qué procedimiento consultarías, sin asignar automáticamente un tipo ni inventar una autoridad responsable.",
        readings: [{ docId: "decreto-1965-2013", focus: "Revisa criterios de tipos de situaciones y protocolos, no solo este resumen." }, { docId: "decreto-1075-2015", focus: "Contrasta la articulación reglamentaria actual del sector." }, { docId: "protocolos-convivencia", focus: "Los protocolos específicos pendientes no se presentan como una ruta oficial universal." }]
      },
      {
        title: "Prevención y manejo pedagógico sin revictimización",
        objective: "Diseñar una acción preventiva y reconocer cuándo la mediación no es una respuesta segura o suficiente.",
        explanation: [
          "La prevención combina acuerdos comprensibles, prácticas de escucha, habilidades para tramitar desacuerdos y canales seguros de reporte. Un mural no cambia por sí solo una relación de exclusión: requiere acompañamiento en situaciones cotidianas, revisión de prácticas adultas y participación. Observa si el grupo conoce a quién acudir, si los reportes se toman en serio y si hay barreras de acceso al canal, como dificultades de comunicación o temor a represalias.",
          "La mediación puede ser útil en conflictos cuando hay condiciones de voluntariedad, seguridad y equilibrio; no debe imponerse para situaciones de violencia, coerción o presuntos delitos. Obligar a pedir perdón o a encontrarse con quien pudo agredir puede revictimizar. Las prácticas restaurativas no sustituyen protección, atención ni procedimientos exigidos por la normativa. Un compromiso firmado tampoco prueba que el riesgo desapareció.",
          "La persona adulta escucha sin culpabilizar ni prometer resultados que no controla. Evita preguntas sugestivas y búsqueda de pruebas por estudiantes. Para prevenir, pueden trabajarse historias ficticias sobre cuidado digital, consentimiento en el uso de imágenes y respeto por diferencias. No se reproduce un caso real en dramatizaciones. El éxito se observa en acceso a apoyo, trato respetuoso y cambios sostenidos, no solo en ausencia de reportes, que también puede reflejar miedo a comunicar."
        ],
        example: "Caso ficticio en Cartagena: el curso analiza un chat inventado donde se comparte una imagen sin permiso. No usa capturas reales ni señala a estudiantes. Practica una respuesta segura de no difundir, pedir apoyo adulto y utilizar el canal institucional; cualquier caso real se tramitaría según la ruta correspondiente.",
        activity: "Diseña una actividad preventiva de veinte minutos, una adaptación accesible del canal de reporte y una medida para evitar exposición. Explica una situación en la que no ofrecerías mediación como única respuesta.",
        readings: [{ docId: "ley-1620-2013", focus: "Relaciona promoción de derechos y prevención con responsabilidades escolares." }, { docId: "protocolos-convivencia", focus: "Las orientaciones específicas de intervención permanecen pendientes de verificación." }]
      },
      {
        title: "Seguimiento, confidencialidad y mejora institucional",
        objective: "Construir un seguimiento centrado en protección y aprendizaje institucional sin recopilar expedientes reales.",
        explanation: [
          "Cerrar una reunión no equivale a cerrar una situación. El seguimiento verifica las medidas acordadas según los procedimientos, escucha de forma segura y revisa si persisten riesgos. Cada actor actúa dentro de sus competencias; la escuela no certifica resultados clínicos ni judiciales. No se puede asumir que una ausencia de nuevos reportes significa bienestar. Pregunta por condiciones de seguridad, acceso a apoyos y posibles represalias sin exponer a las personas.",
          "El registro distingue fecha, hechos conocidos, actuaciones y pendientes, evitando juicios y datos innecesarios. Los expedientes reales se gestionan por canales institucionales autorizados con acceso restringido. En una actividad de formación utiliza casos completamente inventados: no cambies solo el nombre de una historia real ni copies relatos de menores en el taller o una IA. Una copia local puede seguir siendo sensible si quien la escribe incluye datos reales, por eso este ejercicio lo prohíbe.",
          "La mejora institucional utiliza información agregada con cautela. Puede identificar necesidad de formación adulta, accesibilidad del canal o cambios de supervisión, sin divulgar casos. Compara periodos y reconoce límites: más reportes podrían indicar confianza creciente y no necesariamente más violencia. Una propuesta preventiva puede articularse con el PMI, pero no convierte la matriz de este curso en documento oficial ni reemplaza la ruta."
        ],
        example: "Caso ficticio en Villavicencio: el equipo usa un registro didáctico sin personas reales para recordar revisar una medida de acompañamiento. En una reunión general comparte solo la necesidad de mejorar el canal de ayuda, no detalles del escenario. Define una revisión y reconoce que el ejercicio no permite afirmar que un riesgo real terminó.",
        activity: "Completa el protocolo de práctica con una revisión, una evidencia de cuidado y una condición para volver a activar el canal. Revisa si alguna frase atribuye competencias que debes cotejar con el manual o la normativa.",
        readings: [{ docId: "decreto-1075-2015", focus: "Consulta requisitos de seguimiento y responsabilidades en el texto pertinente." }, { docId: "guia-34", focus: "El índice MEN puede orientar mejora institucional; no es un protocolo de atención ni el PDF de la guía." }]
      }
    ],
    workshop: {
      title: "Borrador de análisis de convivencia — caso ficticio",
      scenario: "Un reporte inventado menciona exclusión reiterada y temor a participar. Este borrador no clasifica oficialmente casos ni sustituye la Ruta de Atención Integral. No ingreses historias, nombres o información de menores reales.",
      fields: [
        { key: "facts", label: "Hechos del escenario inventado", hint: "Separa observaciones de interpretaciones.", example: "En el relato ficticio se describe exclusión repetida; no hay personas reales involucradas." },
        { key: "unknown", label: "Información que falta", hint: "No completes vacíos con suposiciones ni interrogatorios.", example: "No se conocen condiciones de seguridad ni actuaciones previas del escenario." },
        { key: "care", label: "Necesidades de protección", hint: "La atención necesaria no debe esperar a la tipificación.", example: "Priorizar cuidado, escucha segura y acceso al canal institucional definido; urgencias se atenderían de inmediato." },
        { key: "protocol", label: "Procedimiento a consultar", hint: "No inventes competencias ni declares responsabilidad penal.", example: "Cotejar manual y protocolo aplicable con Ley 1620 y reglamentación compilada; verificar canales territoriales." },
        { key: "roles", label: "Roles y límites por verificar", hint: "Distingue acompañamiento escolar de autoridades externas.", example: "Verificar quién activa cada canal; el comité no reemplaza salud, protección ni justicia." },
        { key: "prevention", label: "Acción preventiva del grupo", hint: "No expongas el caso ni fuerces mediación.", example: "Trabajar una historia inventada sobre exclusión y un canal accesible de ayuda, sin confrontaciones." },
        { key: "followup", label: "Seguimiento de práctica", hint: "Indica revisión y barreras pendientes sin afirmar cierre real.", example: "Revisar medidas, acceso a apoyo y seguridad según procedimiento; ausencia de reportes no prueba resolución." },
        { key: "privacy", label: "Confidencialidad", hint: "Usa solo situaciones inventadas.", example: "No copiar expedientes, imágenes, nombres ni relatos reales; información mínima por canales autorizados." }
      ],
      review: ["Separé hechos, vacíos e interpretaciones.", "La protección no depende de terminar una clasificación.", "No atribuí competencias clínicas, penales o institucionales sin cotejo.", "No impuse mediación ni incluí datos reales."]
    }
  },
  "/formacion/educacion-rural": {
    purpose: "Planear experiencias multigrado que reconozcan territorio, tiempos, diversidad cultural y participación comunitaria, sin reducir la ruralidad a carencias ni tratar a los pueblos como una cultura uniforme.",
    audience: "Docentes rurales, aspirantes y equipos pedagógicos que acompañan aulas multigrado y propuestas culturalmente pertinentes.",
    related: ["/concursos/ingreso-docente", "/concursos/ascenso-reubicacion", "/simulacros/ingreso-docente", "/simulacros/ascenso-reubicacion"],
    units: [
      {
        title: "Territorialidad y lectura pedagógica del contexto",
        objective: "Construir una lectura del territorio que relacione recursos, trayectos y tiempos con decisiones de planeación sin estereotipos.",
        explanation: [
          "La ruralidad no es un contexto único ni una lista de carencias. La distancia, las actividades productivas, las condiciones ambientales y la conectividad varían entre territorios y dentro de ellos. Una lectura pedagógica identifica condiciones de acceso, recursos y saberes, sin deducir capacidades a partir de la residencia. Pregunta qué materiales están disponibles, qué tiempos son viables y qué situaciones del entorno permiten formular preguntas genuinas de aprendizaje.",
          "Contextualizar no significa limitar el currículo a actividades locales ni romantizar trabajos que pueden implicar riesgos o desigualdades. Un tema del territorio puede abrir relaciones con conocimientos científicos, matemáticos, artísticos y ciudadanos. Las decisiones deben considerar el PEI y el currículo, y escuchar distintas voces sin asumir que una persona representa a toda la comunidad. El mapa de contexto para autoestudio no registra domicilios, trayectos de menores ni información de seguridad real.",
          "La Ley 115 ofrece un marco general para estudiar educación y atención a diversidad de contextos; el Decreto 1075 reúne reglamentación sectorial. La biblioteca mantiene pendientes publicaciones específicas sobre ruralidad. Por eso las estrategias de este curso son propuestas pedagógicas originales, no orientaciones oficiales atribuidas a un documento desconocido. Antes de un trabajo fuera de aula, revisa permisos, accesibilidad y condiciones de seguridad institucionales."
        ],
        example: "Caso ficticio de una sede en el sur de Bolívar: el grupo trabaja registros inventados de lluvia para comparar cantidades. El equipo dispone de cartón, lápices y una radio, pero no presupone internet diario. Usa el problema local para aprender representación de datos y no solicita recorridos reales a lugares inseguros.",
        activity: "Dibuja un mapa didáctico inventado con recursos, tiempos y tres preguntas de aprendizaje. Añade una alternativa sin conectividad y una decisión de seguridad; no incluyas ubicaciones ni rutas de estudiantes reales.",
        readings: [{ docId: "ley-115-1994", focus: "Revisa el marco general de educación en contextos rurales y diversidad." }, { docId: "educacion-rural", focus: "La publicación específica está pendiente; consulta la categoría Políticas educativas." }]
      },
      {
        title: "Multigrado: propósito común y progresiones diferenciadas",
        objective: "Diseñar una secuencia común con tareas de distinta complejidad, trabajo autónomo y acompañamiento docente planificado.",
        explanation: [
          "En un aula multigrado se comparten espacio y tiempos, pero no necesariamente los mismos objetivos de grado. Un eje común permite organizar materiales y conversación; las tareas diferenciadas permiten avanzar según los aprendizajes previstos y las evidencias disponibles. Evita convertir a quienes avanzan más en docentes permanentes de sus compañeros o dar al grupo menor actividades de relleno. La cooperación no reemplaza la responsabilidad de enseñar y acompañar.",
          "Una secuencia puede iniciar con una situación compartida, seguir con estaciones y cerrar con socialización. Mientras la docente acompaña un grupo, los otros necesitan consignas accesibles, recursos y una tarea que puedan realizar con autonomía real. Planifica qué observar, cuánto tiempo dedicar y qué hacer si una estación no puede continuar. Las agrupaciones son flexibles: responder a necesidades observadas no significa fijar una etiqueta de capacidad para todo el año.",
          "Los productos y criterios deben mostrar progresión. En un mismo proyecto de datos, un grupo puede clasificar y contar, otro representar y comparar y otro argumentar tendencias con sus límites. No se evalúa a todos con la misma exigencia por comodidad ni se rebaja una expectativa solo por ser rural. Si la institución utiliza un modelo educativo específico, su implementación requiere estudiar sus materiales y orientaciones: este curso no afirma reproducir oficialmente Escuela Nueva ni otro modelo."
        ],
        example: "Caso ficticio en Boyacá: con tarjetas de semillas ilustradas, un grupo clasifica y cuenta, otro organiza una tabla y otro explica diferencias entre cantidades inventadas. Las semillas no se manipulan ni se ingieren. La docente prevé acompañamiento por turnos y una tarea de extensión que no depende de electricidad.",
        activity: "Planea tres tareas sobre un eje común con criterio propio y duración. Describe el acompañamiento de cada grupo y una consigna que pueda realizarse sin ayuda mientras la docente atiende otra estación.",
        readings: [{ docId: "ley-115-1994", focus: "Relaciona fines y organización de la educación con una propuesta curricular pertinente." }, { docId: "educacion-rural", focus: "Los materiales oficiales de un modelo multigrado concreto aún no están verificados aquí." }]
      },
      {
        title: "Etnoeducación, diálogo y pertinencia cultural",
        objective: "Reconocer participación y diversidad interna al proponer una actividad contextualizada sin apropiación de saberes culturales.",
        explanation: [
          "La etnoeducación se relaciona con identidad, lengua, territorio y procesos educativos de grupos étnicos, dentro del marco normativo correspondiente. No se reduce a celebrar una fecha o agregar una artesanía al currículo. La pertinencia exige diálogo con quienes tienen participación legítima en el contexto y reconocimiento de diversidad interna. No toda escuela rural es etnoeducativa ni todas las personas de un pueblo comparten las mismas prácticas, lenguas o decisiones.",
          "Una actividad no debe presentar saberes comunitarios como material gratuito disponible para copiar, traducir o publicar. Consulta qué puede compartirse, cómo reconocer autoría y qué no corresponde usar; considera acuerdos del proyecto educativo y la autoridad o participación pertinente sin inventar quién representa a una comunidad real. La lengua de enseñanza y los recursos se trabajan con las personas involucradas, no a partir de una traducción improvisada por una herramienta de IA.",
          "La Ley 115 y la reglamentación compilada permiten estudiar el marco general; la ficha específica de etnoeducación sigue pendiente de una fuente precisa. El siguiente escenario Zenú es una invención para analizar decisiones docentes, no una descripción etnográfica ni una representación autorizada. No atribuye técnicas, significados o conocimientos reservados al pueblo Zenú. Para implementar una propuesta real habría que dialogar y cotejar el marco y los acuerdos aplicables."
        ],
        example: "Caso ficticio situado en Córdoba: una sede cercana a una comunidad Zenú imagina una actividad de patrones geométricos hechos con tiras de papel. El equipo no los llama diseños tradicionales ni imita motivos culturales. Propone consultar, en un contexto real, si se desea vincular saberes locales y bajo qué acuerdos; nadie es presentado como portavoz de todo el pueblo.",
        activity: "Reformula una actividad cultural para separar geometría escolar de atribuciones sobre un pueblo. Escribe tres preguntas de diálogo y una decisión de no publicar un saber sin acuerdo. No inventes respuestas comunitarias.",
        readings: [{ docId: "ley-115-1994", focus: "Estudia el marco general de educación para grupos étnicos." }, { docId: "decreto-1075-2015", focus: "Consulta las disposiciones pertinentes y sus modificaciones antes de una aplicación institucional." }, { docId: "etnoeducacion", focus: "La orientación específica sigue pendiente de verificación." }]
      },
      {
        title: "Participación comunitaria y recursos accesibles",
        objective: "Organizar una colaboración voluntaria y una alternativa sin conectividad, evitando cargas injustas y generalizaciones culturales.",
        explanation: [
          "La participación comunitaria puede ayudar a formular preguntas, revisar pertinencia y aportar relatos o recursos, pero no debe exigir trabajo gratuito ni trasladar la enseñanza a las familias. Ofrece alternativas cuando alguien no puede participar y no evalúes al estudiante por los materiales que su hogar puede aportar. La escuela define propósitos pedagógicos y condiciones de protección; una invitación no reemplaza autorizaciones ni protocolos de actividades reales.",
          "La conectividad intermitente requiere materiales que funcionen sin acceso constante: fichas legibles, instrucciones autónomas, registros en papel y momentos de retroalimentación. Lo impreso también puede tener barreras de visión, lenguaje o costo; anticipa opciones de representación y expresión. Planifica devolución de trabajos y acompañamiento sin asumir que toda familia tiene teléfono, tiempo disponible o conocimiento del idioma de la consigna.",
          "Una propuesta en un contexto afrocolombiano no supone que todas las comunidades se relacionan igual con ríos, oficios o expresiones artísticas. Reconoce trayectorias y decisiones diversas. Las experiencias compartidas requieren consentimiento y no deben usarse para exotizar. El caso siguiente es enteramente ficticio: su problema de lectura de mapas no se atribuye como una práctica representativa de poblaciones afrocolombianas."
        ],
        example: "Caso ficticio en el Chocó: una escuela con estudiantes de diversas pertenencias, incluidas afrocolombianas, trabaja un mapa inventado de servicios comunitarios. La participación familiar es voluntaria y tiene alternativa en clase. No registra viviendas ni relatos personales; el equipo no presume que todas las familias usan el mismo transporte o practican los mismos oficios.",
        activity: "Escribe una invitación voluntaria a colaborar en una pregunta curricular, con alternativa en aula. Añade un recurso de bajo costo accesible y un mecanismo de devolución que no dependa de internet ni de datos personales.",
        readings: [{ docId: "ley-115-1994", focus: "Relaciona comunidad educativa, participación y diversidad con límites de la actividad." }, { docId: "etnoeducacion", focus: "Las fuentes concretas para propuestas culturales no han sido verificadas en esta ficha." }]
      },
      {
        title: "Evaluación contextualizada y planeación sostenible",
        objective: "Revisar una secuencia multigrado con evidencias diferenciadas, respeto lingüístico y ajustes de seguridad y recursos.",
        explanation: [
          "Una evaluación contextualizada observa el aprendizaje, no la disponibilidad de recursos del hogar ni la conformidad con un estereotipo cultural. Usa criterios por tarea y evidencias como explicaciones, registros, esquemas o productos. Compara avances de una persona con el propósito y las evidencias previas, evitando clasificaciones permanentes. El contexto ayuda a construir sentido, pero no basta para afirmar que una actividad produjo aprendizaje.",
          "La pertinencia lingüística no se resuelve pidiendo traducir a un estudiante para todo el grupo. Los apoyos deben planearse con las personas y los acuerdos pertinentes; no inventes términos en lenguas indígenas ni utilices una IA como autoridad cultural. En contextos Wayúu hay diversidad de experiencias y uso lingüístico: no todos viven en condiciones idénticas ni comparten una única relación con el agua. El escenario siguiente no ofrece una descripción cultural validada.",
          "Para sostener una planeación, revisa carga docente, materiales, clima, seguridad y continuidad. Un proyecto de agua no implica manipular sustancias, beber muestras ni desplazarse a fuentes reales. Si la actividad no permite alcanzar el criterio, modifica consigna o acompañamiento y documenta límites. Las decisiones de promoción y evaluación formal requieren el sistema institucional y la reglamentación aplicable; la matriz de autoestudio no otorga certificaciones."
        ],
        example: "Caso ficticio en La Guajira: un aula con diversidad de pertenencias, incluida Wayúu, compara volúmenes mediante recipientes vacíos y tarjetas de datos simulados. No representa rituales ni traduce palabras al wayuunaiki. Para una implementación real, se dialogaría sobre lengua y pertinencia; la evaluación distingue medir, representar y justificar según cada tarea.",
        activity: "Completa la planeación con criterios diferenciados y un cierre compartido. Revisa una barrera lingüística sin inventar traducciones, un riesgo que eliminarás y un ajuste si el recurso previsto no está disponible.",
        readings: [{ docId: "decreto-1075-2015", focus: "Contrasta evaluación y marco educativo pertinente con los acuerdos institucionales." }, { docId: "educacion-rural", focus: "La publicación específica de ruralidad permanece pendiente; no se afirma validación oficial de los ejemplos." }]
      }
    ],
    workshop: {
      title: "Planeación multigrado — territorio inventado",
      scenario: "Organiza una secuencia con tarjetas de lluvia simulada para tres grupos. No registres nombres, viviendas, rutas de menores ni saberes culturales no autorizados. No es un formato institucional oficial.",
      fields: [
        { key: "context", label: "Contexto didáctico ficticio", hint: "Recursos y tiempos sin información territorial sensible.", example: "Aula inventada con tres grupos, papel y lápices; conectividad no disponible durante la sesión." },
        { key: "goal", label: "Eje y propósito compartido", hint: "Conecta contexto y currículo, no solo una actividad.", example: "Usar cantidades de lluvia simuladas para representar y comparar datos." },
        { key: "group1", label: "Tarea y criterio del grupo 1", hint: "Una progresión concreta, sin etiquetas de capacidad.", example: "Clasificar tarjetas y contar registros; criterio: correspondencia entre tarjeta y conteo." },
        { key: "group2", label: "Tarea y criterio del grupo 2", hint: "Diferencia complejidad y aprendizaje esperado.", example: "Construir una tabla y comparar cantidades; criterio: registros consistentes y comparación explicada." },
        { key: "group3", label: "Tarea y criterio del grupo 3", hint: "No conviertas el grupo en docentes permanentes.", example: "Representar datos y justificar una conclusión; criterio: argumento basado en datos y sus límites." },
        { key: "sequence", label: "Tiempos y acompañamiento", hint: "Incluye trabajo autónomo mientras atiendes otro grupo.", example: "Inicio común 10 minutos; tres estaciones de 12 minutos con consigna impresa; cierre de 10 minutos." },
        { key: "community", label: "Participación y pertinencia", hint: "Alternativa voluntaria; no atribuyas costumbres a un pueblo.", example: "Revisión opcional de la pregunta por la comunidad; toda la tarea puede completarse en aula." },
        { key: "safety", label: "Seguridad, accesibilidad y revisión", hint: "Prepara una alternativa sin conectividad ni salidas.", example: "Solo datos simulados, sin recorridos; tarjetas ampliadas y respuesta oral; revisar evidencias de cada grupo." }
      ],
      review: ["El eje común tiene tareas y criterios diferenciados.", "Cada grupo puede trabajar mientras acompaño a otro.", "La participación es voluntaria y no generalicé culturas.", "La secuencia tiene una alternativa accesible y segura sin internet."]
    }
  },
  "/formacion/steam-robotica": {
    purpose: "Diseñar proyectos interdisciplinarios de bajo costo que integren ciencia, tecnología, ingeniería, arte y matemáticas con preguntas, pruebas y revisión. La robótica y el pensamiento computacional pueden trabajarse sin comprar equipos ni activar un servicio de IA.",
    audience: "Docentes y aspirantes interesados en innovación pedagógica, proyectos sostenibles y robótica inclusiva.",
    related: ["/concursos/ingreso-docente", "/concursos/coordinador", "/simulacros/ingreso-docente", "/simulacros/coordinador", "/simulacros/ascenso-reubicacion"],
    units: [
      {
        title: "STEAM: problema compartido y aportes disciplinares",
        objective: "Formular una pregunta de proyecto y explicar qué aporta cada disciplina al aprendizaje y al producto.",
        explanation: [
          "STEAM integra ciencia, tecnología, ingeniería, arte y matemáticas alrededor de problemas que requieren distintas perspectivas. No basta con nombrar cinco asignaturas en una ficha o decorar un experimento. La ciencia aporta preguntas y explicación; la tecnología examina herramientas y sus usos; la ingeniería diseña y prueba soluciones; el arte puede aportar representación, experiencia y comunicación; las matemáticas permiten medir, modelar y argumentar. La integración se justifica por el problema y los aprendizajes, no por una sigla.",
          "Empieza con una pregunta abordable, identifica lo que ya se sabe y acuerda restricciones. Un proyecto sobre uso de materiales puede estudiar resistencia, comparar cantidades y diseñar un objeto reutilizable. El producto final no debe ocultar el proceso: dibujos, predicciones, mediciones y revisiones son evidencias. Distribuye funciones sin asignarlas por género o supuesta capacidad y garantiza que todas las personas participen en decisiones significativas.",
          "La biblioteca no dispone aún de una publicación oficial STEAM precisa verificada. Estos proyectos son propuestas originales de EDUCALEX, no estándares oficiales ni un programa certificado. La Ley 115 permite una lectura del marco educativo general, pero no se presenta como un manual de STEAM. Vincula la propuesta con objetivos curriculares y condiciones institucionales antes de usarla en una clase real."
        ],
        example: "Caso ficticio en Armenia: un grupo diseña un organizador reutilizable de cartón para materiales de aula. Compara estabilidad, mide dimensiones, dibuja alternativas y explica por qué eligió una estructura. El arte interviene en claridad de uso y comunicación, no solo en pintar el producto al final.",
        activity: "Formula una pregunta y cinco aportes disciplinares concretos. Define dos aprendizajes y una restricción de materiales. Explica qué evidencia del proceso importa aunque el prototipo no funcione al primer intento.",
        readings: [{ docId: "ley-115-1994", focus: "Relaciona fines educativos y formación con tu propósito, sin atribuir a la ley un método STEAM." }, { docId: "steam", focus: "La publicación oficial específica está pendiente; consulta la categoría Políticas educativas." }]
      },
      {
        title: "Pensamiento computacional sin pantallas",
        objective: "Descomponer una tarea, expresar un algoritmo y revisar errores mediante actividades desenchufadas accesibles.",
        explanation: [
          "El pensamiento computacional incluye descomponer problemas, reconocer patrones, abstraer información relevante y formular procedimientos que puedan revisarse. Un algoritmo es una secuencia precisa para una tarea, no cualquier lista de deseos. Trabajar sin pantallas permite examinar instrucciones y decisiones sin depender de conectividad. No equivale a afirmar que toda resolución de problemas sea programación ni que usar una aplicación produzca automáticamente pensamiento computacional.",
          "Una actividad con tarjetas puede representar avanzar, girar y repetir. Define primero el estado inicial, qué significa cada instrucción y la meta. Ejecuta paso a paso y compara resultado esperado con resultado observado. Depurar consiste en localizar y corregir una instrucción o supuesto, no culpar a quien ejecuta. Los bucles requieren especificar cuántas veces o bajo qué condición se repite, y las decisiones necesitan condiciones que puedan observarse.",
          "Haz la actividad accesible: símbolos acompañados de palabras, contrastes legibles, tarjetas táctiles si se dispone de ellas y opciones de narrar o señalar. No obligues a una persona a moverse por un suelo con obstáculos para representar un robot. Un tablero de mesa permite participar sin depender de movilidad. Evalúa claridad del procedimiento y justificación de la corrección, no rapidez o uso de términos en inglés."
        ],
        example: "Caso ficticio en Tunja: en una cuadrícula de papel, una ficha debe recorrer tres casillas y girar. El equipo detecta que ‘girar’ no especifica dirección. Cambia la tarjeta por ‘girar a la derecha’ y registra por qué el algoritmo anterior era ambiguo; nadie recorre físicamente un circuito.",
        activity: "Escribe un algoritmo de seis instrucciones para una ficha en papel, con estado inicial y meta. Introduce un error y muestra cómo lo localizarías. Añade una opción de representación accesible sin pantallas.",
        readings: [{ docId: "steam", focus: "No hay aún enlace oficial preciso de pensamiento computacional en esta ficha; permanece pendiente." }, { docId: "decreto-1421-2017", focus: "Estudia el marco de inclusión al planear opciones de acceso, no como manual de programación." }]
      },
      {
        title: "Robótica inclusiva y prototipos de bajo costo",
        objective: "Distinguir un modelo mecánico de un robot y diseñar roles, pruebas y condiciones seguras de participación.",
        explanation: [
          "La robótica educativa puede estudiar relaciones entre entradas, procesamiento y acciones. Un robot puede captar información, seguir instrucciones y actuar; un modelo de cartón accionado manualmente ayuda a comprender mecanismos, pero no se debe describir como robot autónomo. Distinguir ambos evita confundir una maqueta con un sistema programado. No es necesario comprar un kit para iniciar preguntas sobre movimiento, control y decisiones.",
          "Un prototipo de pinza de cartón permite explorar palancas, uniones y agarre con objetos muy ligeros. Dibuja alternativas, predice qué cambiará y prueba una condición a la vez. Ofrece distintos roles: diseño, observación, registro, accionamiento o comunicación, con rotación y ajustes; no reserves armado o programación para un grupo. Evalúa razones del diseño y revisión, no destreza motriz como sustituto de conocimiento.",
          "Los materiales requieren supervisión y selección adecuada al grupo. En este autoestudio usa piezas pre-cortadas, cinta y papel; no se proponen redes eléctricas, soldadura, herramientas calientes, piezas ingeribles ni baterías sueltas. Para cualquier equipo real se deben revisar instrucciones del fabricante, edad, accesibilidad, riesgos y protocolos institucionales. Si una tarea no puede hacerse con seguridad, se cambia por un esquema o simulación en papel."
        ],
        example: "Caso ficticio en Medellín: el equipo diseña una pinza manual de cartón pre-cortado que mueve una bola de papel grande. La llama ‘modelo mecánico’, no robot con sensores. Una persona explica el mecanismo señalando un diagrama y otra registra pruebas; se revisa el diseño sin exigir a todos la misma acción manual.",
        activity: "Dibuja el modelo, indica entrada y acción y aclara qué necesitaría para ser un sistema robotizado. Define roles rotativos, una adaptación de participación y dos riesgos que eliminarás antes de la prueba.",
        readings: [{ docId: "decreto-1421-2017", focus: "Relaciona participación y apoyos con la experiencia inclusiva." }, { docId: "steam", focus: "La guía institucional concreta de robótica aún no está verificada en biblioteca." }]
      },
      {
        title: "Proyectos sostenibles: probar sin prometer soluciones",
        objective: "Diseñar una prueba comparativa sencilla, registrar resultados y reconocer límites ambientales y de seguridad.",
        explanation: [
          "Un proyecto sostenible considera uso de recursos, duración, reparación y disposición de materiales. Reutilizar no garantiza que un objeto tenga menor impacto: hay que examinar qué material se usa, para qué, cuánto dura y qué residuos produce. Formula un problema acotado y criterios que puedas observar. No atribuyas beneficios ambientales medidos si no recogiste evidencia ni conviertas una maqueta en solución validada para una comunidad.",
          "Una comparación necesita mantener condiciones similares y cambiar una variable. Por ejemplo, dos diseños de soporte pueden probarse con las mismas hojas de papel, dimensiones y carga ligera. Registra predicción, prueba y resultado, repite cuando sea viable y reconoce que una muestra pequeña no permite generalizar. Un fallo puede revelar qué condición mejorar. Vincula el diseño con medición, análisis y comunicación de límites, no solo con la estética del objeto.",
          "No se proponen filtros para beber agua, sustancias peligrosas, excavaciones ni instalaciones eléctricas. Los proyectos de agua pueden usar datos simulados o modelos secos: observar filtración no demuestra potabilidad. La participación comunitaria exige acuerdos y procedimientos reales, no una promesa de solucionar necesidades con un taller. Las fuentes de política educativa enlazadas aportan contexto; no certifican la eficacia ambiental de los prototipos."
        ],
        example: "Caso ficticio en Barranquilla: el grupo compara dos soportes de cartón reutilizado con igual cantidad de material y la misma carga ligera de papel. Registra cuál mantiene estabilidad en tres ensayos y explica límites. No afirma haber calculado huella de carbono ni seguridad para sostener personas u objetos pesados.",
        activity: "Define dos diseños, una variable a cambiar, dos condiciones constantes y un criterio de comparación. Incluye una manera de reducir residuos y una afirmación que no harías porque tus pruebas no la sostienen.",
        readings: [{ docId: "plan-decenal-2026-2035", focus: "Consulta el micrositio como contexto de política, no como validación del proyecto ni guía técnica." }, { docId: "steam", focus: "Los documentos técnicos específicos de sostenibilidad y STEAM siguen pendientes." }]
      },
      {
        title: "IA ética, autoría y evaluación del proceso",
        objective: "Proponer límites para un uso hipotético de IA y evaluar evidencia propia del proyecto sin exponer datos personales.",
        explanation: [
          "Una herramienta de IA puede producir propuestas, errores, sesgos y referencias inventadas. No es autoridad pedagógica, científica ni cultural. Si se usa en una actividad autorizada, verifica afirmaciones en fuentes fiables, reconoce la intervención de la herramienta y conserva responsabilidad sobre decisiones. Este curso no activa ni requiere IA: el análisis puede hacerse con una respuesta ficticia creada para discutir cómo verificarla.",
          "No cargues fotografías, expedientes, nombres, relatos de menores ni información comunitaria reservada. Revisa condiciones de uso, edad, autorizaciones y protección de datos antes de emplear cualquier servicio real. Una sugerencia de IA no justifica una práctica insegura ni una traducción cultural improvisada. Examina qué voces omite, qué supuestos hace sobre recursos y cómo distinguir una hipótesis de una afirmación comprobada. Puede ser preferible no usarla si no existen condiciones adecuadas.",
          "Evalúa el proceso con criterios de pregunta, diseño, prueba, interpretación y revisión. Un prototipo vistoso no demuestra por sí solo aprendizaje. Pide justificar cambios con registros, identificar límites y reconocer autoría de imágenes, datos y propuestas. La autoevaluación de este curso es reflexiva y no genera calificación ni certificado. El taller ayuda a reunir decisiones, pero no prueba que un proyecto real sea seguro, eficaz o aprobado por una entidad oficial."
        ],
        example: "Caso ficticio en Bogotá: el equipo recibe una respuesta inventada que recomienda un ‘filtro que vuelve potable cualquier agua’. La descarta porque no hay prueba ni fuente técnica y reemplaza la actividad por un modelo seco. Anota la corrección y evalúa la calidad de la verificación, sin consultar ningún servicio de IA real.",
        activity: "Redacta una respuesta ficticia de tres frases con una afirmación dudosa. Señala cómo la verificarías, qué información nunca enviarías a una IA y qué evidencia propia usarás para evaluar aprendizaje y autoría.",
        readings: [{ docId: "steam", focus: "No hay una orientación oficial específica de IA verificada en esta ficha; el enlace lleva a la categoría pendiente." }, { docId: "ley-115-1994", focus: "Contrasta propósitos formativos; esta norma no se presenta como regulación específica de IA." }]
      }
    ],
    workshop: {
      title: "Diseño de proyecto STEAM — prototipo en papel",
      scenario: "Compara soportes de cartón reutilizado con carga ligera de papel. No es una solución técnica certificada. No uses sustancias, electricidad, datos de menores ni servicios de IA para completar este taller.",
      fields: [
        { key: "question", label: "Pregunta y aprendizajes", hint: "Un problema acotado y dos aprendizajes observables.", example: "¿Qué soporte de cartón mantiene una carga ligera de papel? Medir dimensiones y justificar decisiones con pruebas." },
        { key: "disciplines", label: "Aportes de las disciplinas", hint: "La integración no es solo decorar un producto.", example: "Ciencia: estabilidad; tecnología: uso del material; ingeniería: diseños; arte: comunicación; matemáticas: medidas y tabla." },
        { key: "algorithm", label: "Procedimiento o algoritmo", hint: "Define instrucciones precisas y condiciones iniciales.", example: "Preparar dos modelos del mismo tamaño; colocar igual carga; observar y registrar; repetir tres veces." },
        { key: "materials", label: "Materiales y restricciones", hint: "Bajo costo no significa ausencia de riesgos.", example: "Cartón pre-cortado, papel y cinta; sin calor, electricidad, sustancias ni cargas pesadas." },
        { key: "access", label: "Roles y accesibilidad", hint: "Ofrece decisiones y representación para todas las personas.", example: "Rotar diseño, registro y explicación; instrucciones ilustradas y posibilidad de señalar o narrar." },
        { key: "test", label: "Prueba y evidencia", hint: "Cambia una variable y reconoce límites.", example: "Cambiar forma del soporte; mantener material y carga; registrar estabilidad en tres ensayos sin generalizar." },
        { key: "sustainability", label: "Sostenibilidad y riesgos", hint: "No prometas beneficios ambientales no medidos.", example: "Reutilizar piezas y reducir recortes; prueba de mesa supervisada; no atribuir reducción de huella de carbono." },
        { key: "ethics", label: "Autoría, IA y revisión", hint: "No se requiere IA; nunca incluyas datos personales.", example: "Diseño original de práctica sin IA; reconocer recursos; revisar afirmaciones y explicar un cambio con evidencias." }
      ],
      review: ["Las disciplinas aportan al problema y a los aprendizajes.", "La prueba tiene variable, condiciones y evidencia.", "El prototipo es accesible y eliminé los riesgos descritos.", "Reconocí límites y autoría sin datos reales ni IA obligatoria."]
    }
  }
};

export function isTrainingPath(path: string): path is TrainingPath {
  return Object.prototype.hasOwnProperty.call(trainingCourses, path);
}

export function serializeWorkshop(title: string, fields: WorkshopField[], values: Record<string, string>): string {
  return [title, "EDUCALEX · Ejercicio ficticio de autoestudio. No es un formato oficial ni una certificación. No incluir datos reales de menores.", ...fields.map(field => `${field.label}: ${values[field.key]?.trim() || "Sin diligenciar"}`)].join("\n\n");
}
