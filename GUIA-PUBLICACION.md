# EDUCALEX · Guía para publicar el sitio sin Lovable

## Enlaces directos

| Para qué | Enlace |
| --- | --- |
| Crear cuenta de GitHub | <https://github.com/signup> |
| Crear el repositorio vacío `educalex` | <https://github.com/new> |
| Descargar GitHub Desktop | <https://desktop.github.com> |
| Crear cuenta y publicar en Vercel | <https://vercel.com/signup> · <https://vercel.com/new> |
| Planes de Vercel (gratis vs. Pro) | <https://vercel.com/pricing> |
| Crear la base de datos en Supabase | <https://supabase.com/dashboard/new> |
| Clave de Claude para Docente IA | <https://console.anthropic.com/settings/keys> |
| Publicar en Cloudflare (alternativa comercial) | <https://dash.cloudflare.com/sign-up> |
| Instalar Bun (trabajo local) | <https://bun.sh> |
| Conectar GitHub con Claude (para que Claude suba el código) | claude.ai → Configuración → Conectores → GitHub |

Esta guía está pensada para hacerse una sola vez, en unos 45 minutos. No necesitas programar: solo crear cuentas, copiar datos y pegarlos donde se indica.

El sitio funciona en tres piezas:

| Pieza | Para qué sirve | Costo |
| --- | --- | --- |
| **GitHub** | Guarda el código | Gratis |
| **Vercel** (o Cloudflare) | Publica la página en internet | Gratis mientras el sitio no tenga fines comerciales (ver nota) |
| **Supabase** | Cuentas de usuario y progreso | Plan gratuito |
| **Anthropic (Claude)** | Respuestas de Docente IA | Pago por uso; puedes fijar un límite mensual |

> **Nota sobre Vercel.** El plan gratuito (Hobby) es solo para uso personal y no comercial. Mientras EDUCALEX sea gratuito puedes empezar ahí. Cuando actives planes de pago, necesitarás el plan Pro de Vercel o publicar en Cloudflare (el proyecto ya está preparado: ver el paso 7).

Sin Supabase el sitio también funciona: la biblioteca, los cursos, los simulacros y Docente IA están abiertos a todos, y la página de registro muestra «Cuentas en preparación». Puedes publicar primero y conectar las cuentas después.

---

## Paso 1. Subir el código a GitHub

1. Crea una cuenta en <https://github.com> (si no la tienes).
2. Instala **GitHub Desktop**: <https://desktop.github.com>.
3. Descomprime `educalex.zip` en una carpeta de tu computador.
4. En GitHub Desktop: **File → Add local repository…**, elige esa carpeta. Si te pregunta, pulsa **create a repository**.
5. Pulsa **Publish repository**. Deja marcada la opción **Keep this code private**.

## Paso 2. Crear la base de datos en Supabase

1. Crea una cuenta en <https://supabase.com> y pulsa **New project**. Nombre sugerido: `educalex`. Región: la más cercana (por ejemplo, São Paulo). Guarda la contraseña de la base en un lugar seguro.
2. Cuando el proyecto esté listo, abre **SQL Editor → New query**.
3. Abre el archivo `supabase/educalex-esquema.sql` del proyecto, copia todo su contenido, pégalo y pulsa **Run**. Debe terminar sin errores. Esto crea las tablas, los permisos y la protección de datos de cada usuario.
4. Ve a **Project Settings → API Keys** y copia:
   - la **Project URL** (algo como `https://abcd1234.supabase.co`);
   - la **Publishable key** (empieza por `sb_publishable_`).
5. **No copies** la llave secreta (`service_role` o `sb_secret_`): el sitio no la necesita.

## Paso 3. Crear la clave de Docente IA (Claude)

1. Entra a <https://console.anthropic.com> y crea una cuenta.
2. En **Billing**, agrega un método de pago y fija un **límite de gasto mensual** (por ejemplo, el valor que estés dispuesta a invertir al mes).
3. En **API Keys → Create Key**, crea una clave llamada `educalex` y cópiala (empieza por `sk-ant-`). Solo se muestra una vez.

El sitio ya limita las consultas por persona (6 por minuto) y la longitud de las respuestas para controlar el gasto.

## Paso 4. Publicar en Vercel

1. Crea una cuenta en <https://vercel.com> usando **Continue with GitHub**.
2. Pulsa **Add New… → Project** e importa el repositorio `educalex`.
3. En la configuración:
   - **Framework Preset:** `Other`
   - **Build Command:** `bun run build`
   - **Install Command:** `bun install`
   - Deja vacío **Output Directory** (el proyecto genera su propia salida para Vercel).
4. Abre **Environment Variables** y agrega estas variables (los valores son los que copiaste):

| Nombre | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL de Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key de Supabase |
| `SUPABASE_URL` | La misma Project URL |
| `SUPABASE_PUBLISHABLE_KEY` | La misma Publishable key |
| `ANTHROPIC_API_KEY` | Tu clave `sk-ant-…` |

5. Pulsa **Deploy**. En unos minutos tendrás una dirección del tipo `https://educalex.vercel.app`.

> La clave de Anthropic nunca debe llevar el prefijo `VITE_`: si lo tuviera, quedaría visible en el navegador de cualquier visitante.

## Paso 5. Conectar Supabase con la dirección del sitio

1. En Supabase, abre **Authentication → URL Configuration**.
2. En **Site URL** escribe la dirección que te dio Vercel (por ejemplo, `https://educalex.vercel.app`).
3. En **Redirect URLs** agrega la misma dirección y también `https://educalex.vercel.app/reset-password`.
4. En **Authentication → Providers → Email**, deja activada la confirmación de correo.

## Paso 6. Volverte administradora

1. Entra al sitio publicado, regístrate con tu correo y confirma la cuenta desde el mensaje que te llega.
2. En Supabase, abre **SQL Editor → New query** y ejecuta (cambiando el correo por el tuyo):

```sql
INSERT INTO public.user_roles(user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'TU-CORREO@ejemplo.com'
ON CONFLICT DO NOTHING;
```

3. Cierra sesión y vuelve a entrar. Verás el acceso al panel de administración.

## Paso 7 (opcional). Publicar en Cloudflare en lugar de Vercel

Útil si vas a cobrar por los planes y no quieres pagar Vercel Pro.

1. Crea una cuenta en <https://dash.cloudflare.com> y entra a **Workers & Pages → Create → Import a repository** (conecta GitHub).
2. Build command: `NITRO_PRESET=cloudflare-module bun run build`
3. Deploy command: `npx wrangler deploy`
4. Agrega las mismas variables del paso 4 en **Settings → Variables and Secrets** (la de Anthropic como *Secret*).
5. Repite el paso 5 con la nueva dirección.

## Paso 8 (opcional). Dominio propio

En Vercel: **Project → Settings → Domains → Add** y sigue las instrucciones para apuntar tu dominio (por ejemplo, `educalex.co`). Después actualiza la **Site URL** de Supabase con el nuevo dominio.

---

## Cómo hacer cambios después

Cada vez que cambies archivos en la carpeta del proyecto, en GitHub Desktop escribe un resumen del cambio, pulsa **Commit to main** y luego **Push origin**. Vercel publica la nueva versión automáticamente en uno o dos minutos.

## Trabajar en tu computador (opcional)

Necesitas Node.js 20 o superior y Bun (<https://bun.sh>). En la carpeta del proyecto:

```sh
cp .env.example .env      # y completa los valores
bun install
bun run dev               # abre la dirección que muestre la terminal
bun run test              # 110 pruebas automáticas
```

## Qué revisar periódicamente

- **Novedades del concurso** en la portada (`src/routes/index.tsx`, lista `news`) y en la ficha `convocatorias-docentes-2026` de `src/lib/educalex-sitemap.ts`. Revísalas cada vez que la CNSC o el MEN publiquen avisos.
- **Manual de Funciones**: el MEN anunció su actualización en 2026. Cuando salga, actualiza la ficha `resolucion-3842-2022`.
- **Ascenso y reubicación 2026-2027**: cuando el MEN expida la resolución definitiva, agrégala a la biblioteca y a `/concursos/ascenso-reubicacion`.

---

## Versión publicada como artefacto de Claude

Además de la versión con servidor, EDUCALEX tiene una versión de página única que funciona como artefacto de Claude, sin Vercel, Supabase ni clave de Anthropic:

- **Cuentas:** cada persona usa su propia cuenta de Claude. Su perfil, sus cursos y sus simulacros se guardan de forma privada en la página (nadie más los ve, ni siquiera la dueña).
- **Docente IA:** responde con Claude desde la página; la primera vez pide permiso a quien la usa.
- **Navegación:** cada sección tiene su ancla, por ejemplo `#concursos--ingreso-docente` o `#biblioteca--legislacion`.
- **Para guardar avance**, quien visita necesita entrar con su cuenta de Claude y tener permiso de colaborador (Contributor) en la página. Con permiso de solo lectura puede usar todo, pero sus resultados son temporales.
- **Administración** de niveles de pago no está disponible en esta versión.

Para regenerarla después de cambiar contenido: `bun run build:artifact` (crea `dist-artifact/index.html`) y pídele a Claude que la vuelva a publicar en el mismo artefacto.
