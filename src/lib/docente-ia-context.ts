import { libraryDocs } from "@/lib/educalex-sitemap";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export const MAX_TURNS = 12;
export const MAX_CHARS = 4000;

/** Valida y recorta el historial recibido del navegador. */
export function sanitizeTurns(input: unknown): ChatTurn[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const turns: ChatTurn[] = [];
  for (const raw of input.slice(-MAX_TURNS)) {
    if (typeof raw !== "object" || raw === null) return null;
    const { role, content } = raw as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_CHARS : MAX_CHARS * 3);
    if (!text) continue;
    turns.push({ role, content: text });
  }
  while (turns.length && turns[0]?.role !== "user") turns.shift();
  const last = turns.at(-1);
  if (!last || last.role !== "user" || last.content.length < 5) return null;
  return turns;
}

/** Catálogo verificado de la biblioteca, para que el asistente cite solo fuentes comprobadas. */
export function libraryContext(): string {
  const verified = libraryDocs.filter((d) => d.fuenteConsultada && d.fuenteUrl);
  const pending = libraryDocs.filter((d) => !d.fuenteConsultada);
  const lines = verified.map(
    (d) => `- ${d.nombreOficial} (${d.tipo}; ${d.entidad}). ${d.descripcion} Enlace oficial verificado: ${d.fuenteUrl}`,
  );
  return [
    "FUENTES VERIFICADAS DE LA BIBLIOTECA EDUCALEX (puedes enlazarlas tal cual):",
    ...lines,
    "",
    `TEMAS CON FUENTE AÚN NO VERIFICADA EN LA BIBLIOTECA: ${pending.map((d) => d.title).join("; ")}.`,
    "Para estos temas no des enlaces; indica que la fuente debe consultarse en el MEN, Función Pública o SUIN-Juriscol.",
  ].join("\n");
}

export const SYSTEM_PROMPT = `Eres DOCENTE IA, asistente pedagógico de EDUCALEX para docentes, coordinadores y rectores en Colombia, y para aspirantes a los concursos de ingreso, ascenso y reubicación.

Forma de responder:
- Español claro, tono profesional y cercano. Títulos breves y listas cuando ayuden.
- Orientaciones prácticas y aplicables al aula o a la institución: planeación, didáctica, evaluación formativa, inclusión (DUA, PIAR), convivencia, gestión institucional, Guía 34 y PMI, educación rural y etnoeducación.
- Cuando pregunten por concursos, distingue ingreso a la carrera (CNSC), ascenso y reubicación (MEN y entidades territoriales) y cargos directivos. Recomienda siempre revisar la convocatoria y los acuerdos vigentes.
- Si la consulta implica datos de estudiantes, recuerda proteger su identidad y no pedir datos personales ni diagnósticos.

Sobre normas y fuentes (obligatorio):
- Cita la norma (nombre, número, año y, si estás seguro, artículo) para cada afirmación normativa.
- Solo incluye enlaces que aparezcan en el listado de fuentes verificadas. No construyas ni adivines direcciones.
- Si no estás seguro de un artículo, una fecha o la vigencia, dilo expresamente.
- Nunca inventes números de norma, artículos, fechas, versiones de guías, resultados de convocatorias ni preguntas oficiales.
- No representas al MEN, la CNSC ni el ICFES.

`;
