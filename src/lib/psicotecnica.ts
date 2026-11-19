// Ejercicio de familiarización con la prueba psicotécnica del concurso docente.
// La prueba real (CNSC) es clasificatoria y valora actitudes, habilidades, motivaciones e intereses profesionales;
// su formato y su calificación los define el Anexo Técnico de cada convocatoria. Este ejercicio NO la reproduce ni
// la califica: muestra situaciones típicas y devuelve un perfil de reflexión, sin respuestas correctas.

export type Dimension = "estudiantes" | "colaboracion" | "etica" | "adaptacion" | "iniciativa";

export const DIMENSIONS: Record<Dimension, { name: string; description: string }> = {
  estudiantes: { name: "Orientación al aprendizaje de los estudiantes", description: "Tiendes a poner en el centro el aprendizaje y el bienestar de los estudiantes al decidir." },
  colaboracion: { name: "Trabajo colaborativo", description: "Tiendes a buscar a colegas, familias y equipos para resolver y decidir juntos." },
  etica: { name: "Apego a la norma y a la ética", description: "Tiendes a actuar según los procedimientos, los acuerdos y los canales institucionales." },
  adaptacion: { name: "Adaptación y manejo de la presión", description: "Tiendes a mantener la calma, ajustar planes y sostenerte ante la incertidumbre." },
  iniciativa: { name: "Iniciativa y liderazgo", description: "Tiendes a proponer, tomar la iniciativa y movilizar a otros hacia una meta." },
};

export type PsychoItem = { id: string; situation: string; options: { text: string; dimension: Dimension }[] };

// Todas las opciones son actuaciones razonables: cada una expresa una tendencia distinta.
export const psychoItems: PsychoItem[] = [
  { id: "ps-1", situation: "A mitad de período le asignan un curso nuevo con un plan de estudios que no conoce y debe empezar el lunes.", options: [
    { text: "Reviso el plan, priorizo lo esencial y ajusto mi planeación sobre la marcha.", dimension: "adaptacion" },
    { text: "Busco al docente anterior y al área para conocer cómo iba el grupo.", dimension: "colaboracion" },
    { text: "Hago un diagnóstico rápido para saber qué necesitan los estudiantes.", dimension: "estudiantes" },
    { text: "Verifico con coordinación el alcance de la asignación y lo que se espera.", dimension: "etica" },
  ] },
  { id: "ps-2", situation: "En una reunión de área nadie quiere liderar el proyecto transversal del año y el plazo vence pronto.", options: [
    { text: "Me ofrezco a coordinarlo y propongo un cronograma.", dimension: "iniciativa" },
    { text: "Propongo repartir el liderazgo por etapas entre todos.", dimension: "colaboracion" },
    { text: "Sugiero que el proyecto parta de lo que más necesitan los estudiantes.", dimension: "estudiantes" },
    { text: "Recuerdo lo que establece el PEI sobre el proyecto y sus responsables.", dimension: "etica" },
  ] },
  { id: "ps-3", situation: "Una actividad que preparó con mucho cuidado no funciona: el grupo se distrae y no comprende.", options: [
    { text: "Cambio de estrategia en el momento y retomo después con otro enfoque.", dimension: "adaptacion" },
    { text: "Pregunto a los estudiantes qué les dificultó y ajusto con sus respuestas.", dimension: "estudiantes" },
    { text: "Comento la experiencia con un colega para analizarla juntos.", dimension: "colaboracion" },
    { text: "Diseño una nueva propuesta y la pruebo en la siguiente clase.", dimension: "iniciativa" },
  ] },
  { id: "ps-4", situation: "Un acudiente le pide que cambie la fecha de una evaluación solo para su hijo, por un viaje familiar.", options: [
    { text: "Le explico el procedimiento del SIEE para casos especiales y lo aplico.", dimension: "etica" },
    { text: "Busco una alternativa que no afecte el aprendizaje del estudiante.", dimension: "estudiantes" },
    { text: "Lo consulto con coordinación para dar una respuesta institucional.", dimension: "colaboracion" },
    { text: "Le propongo una fecha alterna y me organizo para atenderlo.", dimension: "adaptacion" },
  ] },
  { id: "ps-5", situation: "Le proponen participar en un semillero de investigación fuera de su jornada, sin reconocimiento adicional.", options: [
    { text: "Acepto, porque me motiva crear algo nuevo con los estudiantes.", dimension: "iniciativa" },
    { text: "Acepto si puedo vincular a otros docentes y repartir el trabajo.", dimension: "colaboracion" },
    { text: "Acepto si el proyecto responde a intereses reales de los estudiantes.", dimension: "estudiantes" },
    { text: "Reviso primero mis compromisos para no descuidar mis funciones.", dimension: "etica" },
  ] },
  { id: "ps-6", situation: "Se anuncia un cambio en el sistema de evaluación institucional que modifica su forma de trabajar.", options: [
    { text: "Me actualizo rápido y adapto mis instrumentos al nuevo sistema.", dimension: "adaptacion" },
    { text: "Participo en las mesas para aportar a su implementación.", dimension: "iniciativa" },
    { text: "Me aseguro de entender bien la norma y los acuerdos aprobados.", dimension: "etica" },
    { text: "Pienso en cómo explicar el cambio a mis estudiantes y sus familias.", dimension: "estudiantes" },
  ] },
  { id: "ps-7", situation: "Un estudiante le cuenta, preocupado, que no ha entendido nada de la unidad y teme reprobar.", options: [
    { text: "Le dedico un espacio para identificar sus dificultades y apoyarlo.", dimension: "estudiantes" },
    { text: "Le propongo un plan de trabajo con metas cortas y seguimiento.", dimension: "iniciativa" },
    { text: "Activo las estrategias de apoyo previstas en el SIEE.", dimension: "etica" },
    { text: "Organizo un grupo de estudio con compañeros que le puedan ayudar.", dimension: "colaboracion" },
  ] },
  { id: "ps-8", situation: "En la misma semana coinciden la entrega de notas, un evento institucional y una visita de la secretaría.", options: [
    { text: "Organizo prioridades y tiempos para cumplir con todo.", dimension: "adaptacion" },
    { text: "Acuerdo con el equipo cómo distribuir las tareas.", dimension: "colaboracion" },
    { text: "Cumplo primero lo que tiene plazos y efectos formales.", dimension: "etica" },
    { text: "Cuido que los estudiantes no se vean afectados por la carga.", dimension: "estudiantes" },
  ] },
  { id: "ps-9", situation: "Observa que el grupo de docentes trabaja de forma aislada y casi no comparte experiencias.", options: [
    { text: "Propongo un espacio periódico para compartir prácticas de aula.", dimension: "iniciativa" },
    { text: "Empiezo invitando a un colega a planear juntos una actividad.", dimension: "colaboracion" },
    { text: "Sugiero que compartamos lo que funciona con nuestros estudiantes.", dimension: "estudiantes" },
    { text: "Me adapto al estilo del equipo mientras encuentro el momento.", dimension: "adaptacion" },
  ] },
  { id: "ps-10", situation: "Un colega le pide que lo reemplace en una comisión porque tiene una cita médica el mismo día.", options: [
    { text: "Acepto y me organizo para cubrir esa responsabilidad.", dimension: "adaptacion" },
    { text: "Acepto y le pido que me comparta la información necesaria.", dimension: "colaboracion" },
    { text: "Verifico con coordinación que el reemplazo sea procedente.", dimension: "etica" },
    { text: "Acepto y aprovecho para aportar ideas en la comisión.", dimension: "iniciativa" },
  ] },
  { id: "ps-11", situation: "Los resultados de su grupo en una prueba externa fueron más bajos de lo esperado.", options: [
    { text: "Analizo los resultados para identificar qué necesitan aprender.", dimension: "estudiantes" },
    { text: "Los reviso con el área para buscar causas comunes.", dimension: "colaboracion" },
    { text: "Diseño un plan de mejora y lo pongo en marcha de inmediato.", dimension: "iniciativa" },
    { text: "Tomo el resultado con calma y ajusto lo que esté a mi alcance.", dimension: "adaptacion" },
  ] },
  { id: "ps-12", situation: "Le ofrecen material de apoyo gratuito de una editorial a cambio de recomendar sus textos a las familias.", options: [
    { text: "Lo rechazo, porque comprometería mi imparcialidad.", dimension: "etica" },
    { text: "Lo consulto con el consejo académico antes de responder.", dimension: "colaboracion" },
    { text: "Evalúo si el material realmente sirve a mis estudiantes, sin compromisos.", dimension: "estudiantes" },
    { text: "Propongo a la institución buscar material abierto y gratuito.", dimension: "iniciativa" },
  ] },
];

export function psychoProfile(answers: (number | null)[]): { dimension: Dimension; count: number }[] {
  const counts: Record<Dimension, number> = { estudiantes: 0, colaboracion: 0, etica: 0, adaptacion: 0, iniciativa: 0 };
  answers.forEach((a, i) => { const item = psychoItems[i]; if (item && a !== null && item.options[a]) counts[item.options[a]!.dimension]++; });
  return (Object.keys(counts) as Dimension[]).map(dimension => ({ dimension, count: counts[dimension] })).sort((x, y) => y.count - x.count);
}
