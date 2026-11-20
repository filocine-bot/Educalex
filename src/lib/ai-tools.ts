// Herramientas de IA para docentes. Información revisada el 20 nov 2026 en páginas oficiales
// y reseñas de 2026; los planes cambian, por eso cada ficha invita a confirmar en el sitio oficial.

export type AiCategory = "Asistentes" | "Planear clases" | "Estudiar documentos" | "Materiales y presentaciones" | "Adaptar y diferenciar";
export type AiIcon = "bot" | "sparkles" | "message" | "brain" | "book" | "wand" | "graduation" | "puzzle" | "palette" | "presentation" | "layers" | "mouse";
export type AiTool = { id: string; name: string; category: AiCategory; icon: AiIcon; color: string; url: string; cost: string; purpose: string; ideas: string[]; internal?: boolean };

export const aiCategories: AiCategory[] = ["Asistentes", "Planear clases", "Estudiar documentos", "Materiales y presentaciones", "Adaptar y diferenciar"];

export const aiTools: AiTool[] = [
  { id: "educatia", name: "EducatIA", category: "Asistentes", icon: "bot", color: "#1b4983", url: "/docente-ia", internal: true, cost: "Gratis en EDUCALEX", purpose: "Asistente con voz de EDUCALEX para dudas de normas educativas colombianas, concursos y pedagogía, con fuentes oficiales verificadas.", ideas: ["Pregunta qué dice la Ley 1620 sobre el comité de convivencia", "Pide un ejemplo de PIAR para un caso ficticio", "Repasa una norma escuchando la respuesta"] },
  { id: "chatgpt", name: "ChatGPT", category: "Asistentes", icon: "message", color: "#10a37f", url: "https://chatgpt.com", cost: "Versión gratuita con límites; planes de pago", purpose: "Asistente general para redactar, planear y explicar temas. Útil como punto de partida que luego tú ajustas.", ideas: ["Borrador de secuencia didáctica de 4 clases", "Rúbrica con 4 niveles de desempeño", "Preguntas de discusión para un texto"] },
  { id: "gemini", name: "Gemini", category: "Asistentes", icon: "sparkles", color: "#4285f4", url: "https://gemini.google.com", cost: "Versión gratuita con cuenta de Google", purpose: "Asistente de Google que se conecta con Documentos, Gmail y Drive. Práctico si tu colegio usa Google.", ideas: ["Resumir un documento de Drive", "Proponer actividades a partir de un estándar", "Redactar una circular a familias"] },
  { id: "claude", name: "Claude", category: "Asistentes", icon: "brain", color: "#c15f3c", url: "https://claude.ai", cost: "Versión gratuita con límites; planes de pago", purpose: "Asistente que trabaja bien con textos largos: analiza documentos completos y redacta con un tono cuidadoso.", ideas: ["Analizar el PEI y sugerir mejoras", "Convertir una norma en preguntas de estudio", "Revisar la redacción de un proyecto"] },
  { id: "copilot", name: "Microsoft Copilot", category: "Asistentes", icon: "sparkles", color: "#0078d4", url: "https://copilot.microsoft.com", cost: "Versión gratuita con cuenta Microsoft", purpose: "Asistente de Microsoft integrado con Word y PowerPoint, y que también genera imágenes.", ideas: ["Ilustraciones para una guía", "Esquema de una presentación", "Ideas para una salida pedagógica"] },
  { id: "notebooklm", name: "NotebookLM", category: "Estudiar documentos", icon: "book", color: "#5f6368", url: "https://notebooklm.google.com", cost: "Gratis con cuenta de Google (Google lo llama ahora Gemini Notebook)", purpose: "Subes tus documentos (leyes, guías, lecturas) y responde solo con base en ellos. Crea resúmenes, cuestionarios y audios tipo pódcast.", ideas: ["Sube la Ley 115 y el Decreto 1278 para estudiar el concurso", "Genera un resumen en audio para escuchar en el camino", "Crea tarjetas de repaso de la Guía 34"] },
  { id: "magicschool", name: "MagicSchool", category: "Planear clases", icon: "wand", color: "#7c3aed", url: "https://www.magicschool.ai", cost: "Plan gratuito para docentes", purpose: "Más de 80 herramientas pensadas para docentes: planes de clase, rúbricas, preguntas, retroalimentación y más.", ideas: ["Plan de clase con objetivos y evaluación", "Banco de preguntas de selección múltiple", "Retroalimentación para un escrito"] },
  { id: "khanmigo", name: "Khanmigo para docentes", category: "Planear clases", icon: "graduation", color: "#14bf96", url: "https://www.khanmigo.ai/teachers", cost: "Gratis para docentes en los países habilitados (verifica si incluye Colombia)", purpose: "Asistente de Khan Academy, organización sin ánimo de lucro, para planear clases, crear rúbricas y actividades de inicio.", ideas: ["Actividad de enganche para iniciar un tema", "Rúbrica alineada a un objetivo", "Ticket de salida de 3 preguntas"] },
  { id: "brisk", name: "Brisk Teaching", category: "Adaptar y diferenciar", icon: "puzzle", color: "#ff5a36", url: "https://www.briskteaching.com", cost: "Extensión gratuita para Chrome y Edge", purpose: "Trabaja dentro de Google Docs, PDF, páginas web y YouTube: crea cuestionarios, ajusta el nivel de lectura y da retroalimentación.", ideas: ["Quiz a partir de un video de YouTube", "Adaptar una lectura a otro grado", "Comentarios sobre trabajos en Docs"] },
  { id: "diffit", name: "Diffit", category: "Adaptar y diferenciar", icon: "layers", color: "#2563eb", url: "https://diffit.me", cost: "Plan gratuito con límites", purpose: "Adapta textos al nivel de lectura de tus estudiantes y crea guías con vocabulario y preguntas.", ideas: ["Misma lectura en tres niveles", "Glosario y preguntas de comprensión", "Material para estudiantes con DUA"] },
  { id: "canva", name: "Canva Educación", category: "Materiales y presentaciones", icon: "palette", color: "#00c4cc", url: "https://www.canva.com/education/", cost: "Gratis para docentes de preescolar a grado 11 verificados", purpose: "Diseño de presentaciones, carteles, guías e infografías, con herramientas de IA (Magic Studio) y miles de plantillas.", ideas: ["Infografía de una norma", "Presentación a partir de un texto", "Carteles para el aula"] },
  { id: "gamma", name: "Gamma", category: "Materiales y presentaciones", icon: "presentation", color: "#8b5cf6", url: "https://gamma.app", cost: "Gratis con 400 créditos iniciales (no se renuevan) y marca de agua", purpose: "Crea presentaciones, documentos y páginas a partir de una idea o de un texto que pegues.", ideas: ["Presentación de una clase en minutos", "Página web de un proyecto de aula", "Resumen visual de un tema"] },
  { id: "curipod", name: "Curipod", category: "Materiales y presentaciones", icon: "mouse", color: "#ff7a00", url: "https://curipod.com", cost: "Plan gratuito con límites", purpose: "Lecciones interactivas con encuestas, nubes de palabras y preguntas abiertas para que los estudiantes participen.", ideas: ["Clase interactiva con votaciones", "Lluvia de ideas en tiempo real", "Cierre de clase con reflexión"] },
];

export const promptFormula = [
  { step: "Rol", text: "Actúa como docente de ciencias sociales de grado 9 en Colombia." },
  { step: "Contexto", text: "Mis estudiantes están en zona rural, tienen poca conectividad y trabajamos en grupos." },
  { step: "Tarea", text: "Diseña una clase de 50 minutos sobre los derechos humanos." },
  { step: "Formato", text: "Entrégala en una tabla con inicio, desarrollo, cierre y evaluación." },
] as const;

export const aiCautions = [
  "No escribas nombres, documentos ni datos personales de estudiantes (Ley 1581 de 2012).",
  "Revisa siempre lo que produce la IA: puede inventar datos, normas o citas.",
  "Confirma la norma y su vigencia en la fuente oficial antes de usarla en clase o en el concurso.",
  "Respeta la edad mínima de cada plataforma antes de pedir que la usen tus estudiantes.",
  "Usa la IA para apoyar tu criterio pedagógico, no para reemplazarlo.",
];
