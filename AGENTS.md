## Plataforma

El proyecto ya no depende de Lovable. Se publica con Nitro (Vercel por defecto; Cloudflare con `NITRO_PRESET=cloudflare-module`). El esquema de base de datos completo está en `supabase/educalex-esquema.sql`. Docente IA usa la API de Anthropic con `ANTHROPIC_API_KEY` solo en el servidor. Los secretos nunca van en el repositorio.
- Las páginas públicas no deben depender de Supabase: usar `supabaseConfigured` antes de llamar a la autenticación.
- Toda ficha de biblioteca con `fuenteUrl` debe apuntar a un dominio oficial verificado (lo comprueba `src/test/library-view.test.ts`).

## Application architecture
- Keep the shared sticky header in a compact institutional grid row plus an educational-profile bar; reserve independent grid columns for visible Home and Menu controls and adapt using container-width queries, so narrower embeds never remove navigation access. Typed menus and Radix disclosures preserve keyboard dismissal. Read profiles from the user-scoped learning query; personalization never changes authorization or free access.
- Root error and not-found screens use provider-independent recovery navigation with hard links, because the normal account/router shell may not be available after a failure.
- Reuse the existing preparation_path and teacher_type for educational navigation, including directivo, and whitelist signup metadata in the profile trigger; administrator roles remain exclusively in protected user_roles.
- Keep brand styling in global semantic tokens and share the site header/footer across content routes, so identity remains consistent without duplicating layouts.
- Keep library metadata in the static catalog and apply client-side filtering/pagination with Radix details; official PDF actions require a separately verified direct PDF resource, never an HTML-source conversion.
- Keep unavailable services clearly labeled; practice simulations are original client-side exercises, not official assessments, accounts or certification.
- Define every section page (title, outline, children, related links) in src/lib/educalex-sitemap.ts and render it with ModulePage, so menus and cross-links stay consistent and testable.
- Compact academic routes opt in to ModulePage styling and render typed academicModules from the sitemap through Radix Accordion; this keeps other routes unchanged and resource availability explicit.
- Keep verified competition provenance in a typed reference catalog, separating page-only evidence from read annexes and historical CNSC selection from MEN advancement; original practice items remain unverified against these sources until individually reviewed.
- Keep original practice questions in a typed bank and scoring in a pure module; one reusable exam serves all profiles so evaluation rules remain consistent and testable.
- Persist authenticated practice deliveries through user-scoped server functions and RLS; anonymous results stay in root context and clear on identity changes, preventing cross-account leakage.
- Grade only after manual confirmation or deadline expiry; client-held answer keys are inspectable and must never be described as secure.
- Keep expanded self-study course units and workshop definitions in a typed training bank, rendered through the shared ModulePage reader, so content and navigation can be validated without duplicating course UI.
- Keep self-study workshop drafts in component state only and print text representations scoped to their own print area, so no personal records are persisted and existing PMI printing stays unchanged.

- Keep existing course content static; persist only minimal profiles, enrollments, unit completions and versioned original practice results to avoid duplicated catalogs.
- Gate all personal routes under _authenticated and admin children with a server role check; never expose role writes to browser clients.
- Attach bearer tokens through learningBearer while preserving CSRF middleware; use one root auth subscriber for identity/cache refresh.
- Track recovery intent in the root auth subscriber and validate the user before password updates; URL fragments can be consumed during session initialization.
- Clear query caches on every identity transition and key the shared child tree by user identity; ignore stale practice-save callbacks to prevent cross-account state leaks.
- Reuse internal offer drafts for inactive preparation-level content/simulation rules with revisioned trigger audit; preserve deprecated package columns/rights without app use, and derive the current free level on the server rather than from drafts or browser input to prevent accidental restrictions or escalation.
