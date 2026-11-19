import { createFileRoute } from "@tanstack/react-router";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { SYSTEM_PROMPT, libraryContext, sanitizeTurns } from "@/lib/docente-ia-context";

// Límite sencillo por instancia para evitar abusos y gastos inesperados.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();
function tooMany(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const SYSTEM = SYSTEM_PROMPT + libraryContext();

export const Route = createFileRoute("/api/docente-ia")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as { messages?: unknown; category?: unknown } | null;
        const category = typeof body?.category === "string" ? body.category.slice(0, 80) : "";
        const turns = sanitizeTurns(body?.messages);
        if (!turns)
          return Response.json({ error: "Escribe una consulta de entre 5 y 4000 caracteres." }, { status: 400 });
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
        if (tooMany(ip))
          return Response.json({ error: "Hay muchas consultas en este momento. Intenta de nuevo en un minuto." }, { status: 429 });
        const apiKey = process.env["ANTHROPIC_API_KEY"];
        if (!apiKey) return Response.json({ error: "El asistente no está configurado todavía." }, { status: 503 });

        const anthropic = createAnthropic({ apiKey });
        const result = streamText({
          model: anthropic(process.env["ANTHROPIC_MODEL"] || "claude-sonnet-5-5"),
          system: category ? `${SYSTEM}\n\nCategoría elegida por la persona usuaria: ${category}.` : SYSTEM,
          messages: turns,
          abortSignal: request.signal,
          maxRetries: 1,
          maxOutputTokens: 2000,
        });
        const enc = new TextEncoder();
        const stream = new ReadableStream({
          async start(c) {
            try {
              for await (const part of result.fullStream) {
                if (part.type === "text-delta") c.enqueue(enc.encode(JSON.stringify({ t: part.text }) + "\n"));
                else if (part.type === "error") {
                  const e = part.error as { statusCode?: number; message?: string };
                  const s = e?.statusCode;
                  const msg = s === 429 ? "Hay muchas consultas en este momento. Intenta de nuevo en un minuto."
                    : s === 401 || s === 402 || s === 403 ? `El asistente no está disponible por ahora (código ${s}).`
                    : `No fue posible generar la respuesta. Intenta de nuevo.${s ? ` (código ${s}${/credit/i.test(e?.message ?? "") ? ": sin créditos" : /model/i.test(e?.message ?? "") ? ": modelo no disponible" : ""})` : ""}`;
                  console.error("docente-ia error", s, e?.message);
                  c.enqueue(enc.encode(JSON.stringify({ error: msg }) + "\n"));
                }
              }
            } catch (err) {
              if (!request.signal.aborted) c.enqueue(enc.encode(JSON.stringify({ error: "Se interrumpió la respuesta." }) + "\n"));
            }
            c.close();
          },
        });
        return new Response(stream, { headers: { "Content-Type": "application/x-ndjson", "Cache-Control": "no-cache, no-transform" } });
      },
    },
  },
});
