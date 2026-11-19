// Dilemas educativos originales de EDUCALEX. No tienen una única respuesta «correcta»: cada decisión prioriza
// valores distintos y trae consecuencias. La orientación final señala lo que exige o sugiere la norma citada.

export type DilemmaOption = { text: string; prioritizes: string; consequence: string };
export type Dilemma = {
  id: string; title: string; area: string; situation: string; question: string;
  options: DilemmaOption[]; orientation: string; norms: string[]; reflection: string[];
};

export const dilemmas: Dilemma[] = [
  {
    id: "dl-evaluacion", title: "Nota justa o nota compasiva", area: "Evaluación",
    situation: "Camila, de noveno, siempre ha sido responsable. Este período su madre estuvo hospitalizada y ella cuidó a sus hermanos menores. No entregó tres trabajos y su valoración en sociales es Bajo. Faltan dos días para cerrar el período y sus compañeros saben lo que pasó.",
    question: "¿Qué haces con la valoración de Camila?",
    options: [
      { text: "Le subo la nota a Básico: su situación lo justifica y no quiero afectarla más.", prioritizes: "La compasión y el bienestar inmediato de la estudiante.", consequence: "Camila no pierde el período, pero la nota no refleja lo que aprendió y otros estudiantes en situaciones difíciles podrían reclamar el mismo trato sin un criterio claro." },
      { text: "Mantengo el Bajo: las reglas son iguales para todos.", prioritizes: "La igualdad formal y la coherencia de la evaluación.", consequence: "La valoración es consistente, pero ignora una causa externa y temporal; Camila puede desmotivarse y la evaluación pierde su sentido formativo." },
      { text: "Aplico las estrategias de apoyo del SIEE: un plan con plazos para que demuestre lo aprendido, y lo dejo documentado.", prioritizes: "La equidad dentro de las reglas y el sentido formativo de la evaluación.", consequence: "Camila tiene una oportunidad real de mostrar su aprendizaje; la decisión es transparente y aplicable a cualquier estudiante en una situación similar." },
    ],
    orientation: "El SIEE debe prever estrategias de apoyo para resolver situaciones pedagógicas pendientes, y el estudiante tiene derecho a recibir acompañamiento para superar sus debilidades. La equidad no exige notas iguales ni regaladas, sino oportunidades reales con criterios conocidos.",
    norms: ["Decreto 1290 de 2009, artículo 4: estrategias de apoyo en el SIEE.", "Decreto 1290 de 2009, artículo 12: derecho del estudiante a asesoría y acompañamiento."],
    reflection: ["¿Qué diferencia hay entre igualdad y equidad en la evaluación?", "¿Tu SIEE tiene previstas estrategias para situaciones como la de Camila?"],
  },
  {
    id: "dl-confidencia", title: "Guardar un secreto o proteger", area: "Convivencia y protección",
    situation: "Andrés, de once años, le cuenta a su directora de grupo que desde hace semanas sus padres viajan a trabajar y lo dejan solo con su hermano de siete años varios días. Le pide por favor que no le cuente a nadie, porque teme que «se lleven» a su hermano.",
    question: "¿Qué haces con lo que te contó Andrés?",
    options: [
      { text: "Respeto su confianza y no le cuento a nadie; lo acompaño de cerca en clase.", prioritizes: "La confianza del estudiante y su deseo de privacidad.", consequence: "Andrés se siente escuchado, pero los dos niños siguen en riesgo sin que ningún adulto responsable pueda actuar." },
      { text: "Llamo a los padres para pedirles que no dejen solos a los niños.", prioritizes: "Resolver rápido y de manera directa con la familia.", consequence: "Puede funcionar, pero también puede exponer a Andrés ante sus padres y dejar el caso sin seguimiento ni apoyo institucional." },
      { text: "Le explico con cuidado que necesito pedir ayuda para protegerlos, e informo a la institución para activar la ruta.", prioritizes: "La protección de los niños y la responsabilidad profesional, con un manejo cuidadoso de la confianza.", consequence: "Se activan el acompañamiento y, si es necesario, la remisión a la autoridad competente; Andrés sabe por qué se actúa y no se siente traicionado." },
    ],
    orientation: "Ante una posible vulneración de derechos de un niño, el docente no puede guardar el secreto: debe informar para que la institución active la ruta y, cuando se requiera restablecimiento de derechos, remita a las autoridades administrativas. Explicarle al estudiante por qué se actúa protege también el vínculo de confianza.",
    norms: ["Ley 1620 de 2013, artículo 19: responsabilidades de los docentes.", "Decreto 1965 de 2013, artículo 43: remisión para el restablecimiento de derechos."],
    reflection: ["¿Cómo explicarías a un niño que vas a contar lo que te confió?", "¿Quién activa la ruta en tu institución y cómo se registra?"],
  },
  {
    id: "dl-inclusion", title: "La presión del curso", area: "Inclusión",
    situation: "Mateo, estudiante con autismo, a veces grita o se levanta durante las clases de cuarto grado. Un grupo de familias firma una carta pidiendo que lo cambien de curso o de colegio porque «está afectando el aprendizaje de los demás». El PIAR de Mateo se elaboró hace dos meses.",
    question: "Como docente de aula, ¿qué propones a la institución?",
    options: [
      { text: "Apoyar el cambio de curso para calmar a las familias y que Mateo tenga un grupo más pequeño.", prioritizes: "La tranquilidad del grupo y la respuesta a la presión de las familias.", consequence: "Se reduce la tensión inmediata, pero se traslada el problema sin revisar los apoyos y se envía el mensaje de que la exclusión resuelve las diferencias." },
      { text: "Mantenerlo en el curso sin cambios: las familias deben aceptar la inclusión.", prioritizes: "El derecho de Mateo a la educación inclusiva.", consequence: "Se protege su derecho, pero sin revisar los ajustes las dificultades continúan y el conflicto con las familias crece." },
      { text: "Revisar el PIAR con el equipo y la familia de Mateo, ajustar los apoyos y dialogar con las familias sobre la inclusión.", prioritizes: "El derecho de Mateo y el aprendizaje de todos, con ajustes basados en evidencia.", consequence: "Los apoyos se ajustan a lo que pasa en el aula y las familias reciben información y participación; la inclusión se sostiene con acciones concretas." },
    ],
    orientation: "La educación inclusiva implica ajustes razonables y un PIAR que se revisa con el equipo, la familia y el estudiante. La presión de terceros no justifica la exclusión; sí obliga a revisar si los apoyos están funcionando y a trabajar con la comunidad.",
    norms: ["Decreto 1421 de 2017: educación inclusiva, ajustes razonables y PIAR."],
    reflection: ["¿Qué información necesitarían las familias para entender la inclusión?", "¿Qué apoyos concretos podrían reducir las situaciones que preocupan al grupo?"],
  },
  {
    id: "dl-colega", title: "Lealtad con un colega", area: "Ética profesional",
    situation: "Un colega con quien tienes una buena amistad humilla con frecuencia a algunos estudiantes de octavo: los llama «brutos» frente al grupo y ridiculiza sus errores. Varios estudiantes te lo han contado y uno dejó de asistir a esa clase. Tu colega dice que «así se forma el carácter».",
    question: "¿Qué haces?",
    options: [
      { text: "No intervengo: es su clase y su forma de enseñar, y no quiero dañar la amistad.", prioritizes: "La lealtad personal y la autonomía del colega.", consequence: "La amistad se mantiene, pero los estudiantes siguen expuestos a humillaciones y el silencio de los adultos las normaliza." },
      { text: "Hablo con mi colega en privado y le pido que cambie su trato, sin informar a nadie más.", prioritizes: "La lealtad y la posibilidad de que el colega corrija por sí mismo.", consequence: "Puede funcionar, pero si la conducta continúa los estudiantes quedan sin protección y sin seguimiento institucional." },
      { text: "Hablo con mi colega y, como la situación afecta a los estudiantes, la informo por el canal institucional.", prioritizes: "La protección de los estudiantes y la responsabilidad profesional, sin renunciar al diálogo.", consequence: "Se protege a los estudiantes y la institución puede acompañar al docente; la amistad puede resentirse, pero la decisión es defendible." },
    ],
    orientation: "La Ley 1620 reconoce que el acoso escolar también puede darse de docentes hacia estudiantes y asigna a los docentes el deber de identificar, reportar y hacer seguimiento. El diálogo con el colega es valioso, pero no reemplaza el reporte cuando hay estudiantes afectados.",
    norms: ["Ley 1620 de 2013, artículo 2: definición de acoso escolar.", "Ley 1620 de 2013, artículo 19: responsabilidades de los docentes."],
    reflection: ["¿Dónde termina la lealtad con un colega y empieza la responsabilidad con los estudiantes?", "¿Cómo puede la institución acompañar al docente y no solo sancionarlo?"],
  },
  {
    id: "dl-recursos", title: "Tabletas o restaurante escolar", area: "Gestión directiva",
    situation: "Eres rector de una institución rural. Este año el Fondo de Servicios Educativos permite una sola inversión importante. Los docentes piden tabletas para un proyecto de lectura digital; las familias piden mejorar la cocina del restaurante escolar, que tiene fallas que han obligado a suspender el servicio varios días. El diagnóstico muestra baja asistencia en los días sin restaurante.",
    question: "¿Cómo decides la inversión?",
    options: [
      { text: "Compro las tabletas: la innovación pedagógica es la prioridad de un colegio.", prioritizes: "La innovación y el aprendizaje en el aula.", consequence: "El proyecto avanza, pero los días sin restaurante siguen afectando la asistencia, y sin estudiantes en el aula las tabletas pierden impacto." },
      { text: "Arreglo la cocina: sin alimentación no hay aprendizaje posible.", prioritizes: "Las condiciones básicas de bienestar y permanencia.", consequence: "Mejora la asistencia, pero si la decisión se toma sin participación los docentes pueden sentir que su propuesta no se valoró." },
      { text: "Presento el diagnóstico al consejo directivo, comparo el impacto de cada opción y decido con criterios explícitos, buscando fuentes alternas para la propuesta que no se elija.", prioritizes: "La decisión basada en evidencia, la participación y la transparencia.", consequence: "La decisión se sustenta en datos y en el órgano competente; la comunidad entiende por qué se priorizó y la otra propuesta no se abandona." },
    ],
    orientation: "El rector administra el Fondo de Servicios Educativos en articulación con el consejo directivo. La Guía 34 orienta a priorizar a partir de la autoevaluación y de las condiciones que afectan el aprendizaje y la permanencia. Ninguna opción es ilegítima; lo exigible es decidir con evidencia, transparencia y por las instancias competentes.",
    norms: ["Ley 715 de 2001, artículo 10: el rector administra el Fondo de Servicios Educativos.", "Ley 115 de 1994, artículo 144: funciones del consejo directivo.", "Guía 34 del MEN: gestión administrativa y financiera."],
    reflection: ["¿Qué datos necesitarías para comparar el impacto de las dos inversiones?", "¿Cómo comunicarías la decisión a quienes no fueron priorizados?"],
  },
  {
    id: "dl-lengua", title: "Lengua propia o resultados en las pruebas", area: "Etnoeducación",
    situation: "En una sede de La Guajira, la mayoría de los estudiantes de primaria son wayuu. La comunidad pide que los primeros grados se enseñen principalmente en wayuunaiki. Un funcionario recuerda que las pruebas Saber se presentan en español y teme que los resultados bajen.",
    question: "Como coordinadora, ¿qué propones?",
    options: [
      { text: "Enseñar solo en español desde el primer grado para que les vaya mejor en las pruebas.", prioritizes: "Los resultados en pruebas estandarizadas.", consequence: "Puede facilitar la familiaridad con el español, pero desconoce la lengua materna, dificulta el aprendizaje inicial y debilita la identidad cultural." },
      { text: "Enseñar solo en wayuunaiki en toda la primaria, como pide la comunidad.", prioritizes: "La identidad cultural y la autonomía de la comunidad.", consequence: "Se fortalece la lengua propia, pero los estudiantes pueden llegar a la secundaria sin las herramientas en español que también necesitan." },
      { text: "Construir con la comunidad una propuesta bilingüe que parta de la lengua materna y desarrolle progresivamente el español.", prioritizes: "El derecho a la educación propia y la preparación para otros contextos.", consequence: "Los estudiantes aprenden desde su lengua y avanzan en español; la propuesta es concertada y coherente con el marco de etnoeducación." },
    ],
    orientation: "La Ley 115 dispone que la educación de los grupos étnicos con tradición lingüística propia sea bilingüe, tomando como fundamento la lengua materna, y que se construya con participación de las comunidades. La disyuntiva entre lengua propia y español es falsa: la norma orienta hacia el bilingüismo.",
    norms: ["Ley 115 de 1994, artículos 55 a 57: etnoeducación y enseñanza bilingüe.", "Decreto 804 de 1995: atención educativa para grupos étnicos."],
    reflection: ["¿Cómo participaría la comunidad en el diseño de la propuesta bilingüe?", "¿Qué evidencias mostrarían que los estudiantes avanzan en ambas lenguas?"],
  },
];
