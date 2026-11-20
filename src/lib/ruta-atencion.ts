// Ruta de Atención Integral para la Convivencia Escolar.
// Síntesis EDUCALEX de la Ley 1620 de 2013 (arts. 29 a 31) y del Decreto 1965 de 2013
// (arts. 36 a 45, compilados en el Decreto 1075 de 2015, arts. 2.3.5.4.2.2 a 2.3.5.4.2.11).
// Texto parafraseado con fines de estudio: antes de citar, verifica el texto vigente.

export type SituationType = "I" | "II" | "III";

export const routeComponents = [
  { id: "promocion", title: "Promoción", text: "Políticas institucionales que fomentan la convivencia y mejoran el clima escolar: manual de convivencia, proyectos pedagógicos y formación en competencias ciudadanas.", source: "Ley 1620, art. 30 · Decreto 1965, art. 36" },
  { id: "prevencion", title: "Prevención", text: "Intervención oportuna sobre comportamientos que pueden afectar los derechos: identificar riesgos, fortalecer acciones que los mitiguen y diseñar los protocolos de atención.", source: "Ley 1620, art. 30 · Decreto 1965, art. 37" },
  { id: "atencion", title: "Atención", text: "Asistir de forma inmediata y pertinente a quienes viven una situación que afecta la convivencia, con los protocolos internos del colegio y, si hace falta, activando los de otras entidades.", source: "Ley 1620, art. 30 · Decreto 1965, art. 38" },
  { id: "seguimiento", title: "Seguimiento", text: "Reporte oportuno al Sistema de Información Unificado de Convivencia Escolar y verificación del estado de cada caso atendido.", source: "Ley 1620, art. 30" },
] as const;

export const situationTypes: { type: SituationType; title: string; criterion: string; examples: string; protocol: string[]; source: string }[] = [
  {
    type: "I",
    title: "Situación tipo I",
    criterion: "Conflictos manejados inadecuadamente y situaciones esporádicas que afectan el clima escolar, sin daño al cuerpo ni a la salud.",
    examples: "Discusiones, empujones sin lesión o burlas aisladas.",
    protocol: [
      "Reunir de inmediato a las partes y mediar de manera pedagógica para que expongan sus puntos de vista.",
      "Acordar una solución imparcial, equitativa y justa, orientada a reparar el daño y a la reconciliación, y dejar constancia.",
      "Hacer seguimiento para verificar si la solución funcionó o si hay que acudir al protocolo tipo II o tipo III.",
      "Pueden participar estudiantes mediadores capacitados.",
    ],
    source: "Decreto 1965, arts. 40 y 42 (Decreto 1075, arts. 2.3.5.4.2.6 y 2.3.5.4.2.8)",
  },
  {
    type: "II",
    title: "Situación tipo II",
    criterion: "Agresión escolar, acoso escolar o ciberacoso que no es delito y que es repetida o sistemática, o que causa daño al cuerpo o a la salud sin generar incapacidad.",
    examples: "Burlas reiteradas en un grupo de mensajería o una pelea que deja una lesión leve sin incapacidad.",
    protocol: [
      "Garantizar atención inmediata en salud cuando haya daño al cuerpo o a la salud, y dejar constancia.",
      "Remitir a las autoridades administrativas cuando se requiera restablecer derechos.",
      "Adoptar medidas para proteger a los involucrados de posibles retaliaciones.",
      "Informar de inmediato a las familias o acudientes.",
      "Generar espacios para exponer lo ocurrido, preservando la intimidad y la confidencialidad.",
      "Definir acciones restaurativas y las consecuencias para quienes promovieron la situación.",
      "El presidente del comité escolar de convivencia informa al comité, que analiza el caso, hace seguimiento y deja acta.",
      "Reportar el caso en el Sistema de Información Unificado de Convivencia Escolar.",
    ],
    source: "Decreto 1965, arts. 40 y 43 (Decreto 1075, arts. 2.3.5.4.2.6 y 2.3.5.4.2.9)",
  },
  {
    type: "III",
    title: "Situación tipo III",
    criterion: "Agresión escolar que constituye un presunto delito contra la libertad, integridad y formación sexual, o cualquier otro delito de la ley penal.",
    examples: "Presunto abuso sexual o una agresión que causa lesiones con incapacidad.",
    protocol: [
      "Garantizar atención inmediata en salud y dejar constancia.",
      "Informar de inmediato a las familias o acudientes.",
      "El presidente del comité pone la situación en conocimiento de la Policía Nacional, y deja constancia.",
      "Citar a los integrantes del comité escolar de convivencia e informarles los hechos, guardando reserva.",
      "Adoptar medidas propias del colegio para proteger a la víctima, a quien se le atribuye la agresión y a quienes informaron.",
      "Reportar el caso en el Sistema de Información Unificado y hacer seguimiento junto con la autoridad que asumió el conocimiento.",
    ],
    source: "Decreto 1965, arts. 40 y 44 (Decreto 1075, arts. 2.3.5.4.2.6 y 2.3.5.4.2.10)",
  },
];

export const otherEntities = {
  text: "Las autoridades que reciben el caso (Policía de Infancia y Adolescencia, ICBF, defensor o comisario de familia, sector salud) actúan de inmediato y hacen seguimiento hasta restablecer los derechos. Donde no haya defensor de familia actúa el comisario de familia y, a falta de este, el inspector de policía.",
  source: "Decreto 1965, art. 45 (Decreto 1075, art. 2.3.5.4.2.11)",
};

export const classifyCases: { id: string; text: string; answer: SituationType; why: string }[] = [
  { id: "c1", text: "En el descanso, dos estudiantes de séptimo discuten por un balón y se empujan. Ninguno resulta lastimado y es la primera vez que ocurre.", answer: "I", why: "Conflicto manejado inadecuadamente, esporádico y sin daño al cuerpo ni a la salud." },
  { id: "c2", text: "Durante tres semanas, un grupo publica memes sobre una compañera en el chat del curso y la excluye de los trabajos.", answer: "II", why: "Ciberacoso y agresión relacional repetida y sistemática que no constituye delito." },
  { id: "c3", text: "Una pelea en el aula deja a un estudiante con un raspón que se atiende en enfermería; no requiere incapacidad.", answer: "II", why: "Hay daño al cuerpo sin incapacidad, uno de los criterios del tipo II." },
  { id: "c4", text: "Una estudiante le cuenta a su orientadora que un adulto del barrio la tocó de manera sexual camino al colegio.", answer: "III", why: "Presunto delito contra la libertad, integridad y formación sexual. La Ruta también aplica a situaciones en los alrededores del colegio." },
  { id: "c5", text: "En clase, un estudiante insulta una vez a otro por un comentario. Se disculpan cuando el docente interviene.", answer: "I", why: "Situación aislada que afecta el clima de aula, sin reiteración ni daño." },
  { id: "c6", text: "Un estudiante agrede a otro con un objeto cortopunzante y la víctima recibe incapacidad médica.", answer: "III", why: "La lesión con incapacidad puede constituir un delito de la ley penal, así que se informa a la Policía Nacional." },
];
