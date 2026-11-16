# EDUCALEX · Academia Inteligente de Educación

Plataforma web para la preparación y formación de docentes, coordinadores y rectores en Colombia: concursos de ingreso (CNSC), ascenso y reubicación (MEN), biblioteca normativa con fuentes oficiales verificadas, cursos de autoestudio, simulacros y el asistente Docente IA.

- **Publicar el sitio:** ver [GUIA-PUBLICACION.md](GUIA-PUBLICACION.md).
- **Base de datos:** `supabase/educalex-esquema.sql` (ejecutar una vez en Supabase).
- **Variables de entorno:** `.env.example`.

## Tecnología

TanStack Start (React 19), TypeScript, Tailwind CSS 4, Supabase (autenticación y datos con RLS), Claude de Anthropic para Docente IA, Nitro para publicar en Vercel (por defecto) o Cloudflare (`NITRO_PRESET=cloudflare-module`).

## Comandos

```sh
bun install
bun run dev     # desarrollo local
bun run test    # pruebas automáticas
bun run build   # compilación para Vercel
```

## Dónde está el contenido

| Contenido | Archivo |
| --- | --- |
| Páginas, menús y biblioteca (34 fichas) | `src/lib/educalex-sitemap.ts` |
| Banco de preguntas de los simulacros | `src/lib/simulation-bank.ts` |
| Referentes oficiales de los concursos | `src/lib/competition-references.ts` |
| Cursos de autoestudio | `src/lib/training-courses.ts` |
| Novedades de la portada | `src/routes/index.tsx` |
| Instrucciones de Docente IA | `src/lib/docente-ia-context.ts` |

Regla del proyecto: ninguna ficha lleva enlace si la fuente oficial no fue verificada; las pruebas automáticas impiden enlaces a dominios no gubernamentales.
