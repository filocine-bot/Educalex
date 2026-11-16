# Navigation access sweep

## Rule
Every page must offer visible, actionable navigation in a narrow preview. When a modal is open, its accessible close control must return the user to that navigation.

## Reviewed surfaces
| Surface | Source reviewed | Result |
| --- | --- | --- |
| Home and institutional pages | All public route files, root layout, site shell | Follow the shared always-visible Menú rule. |
| Concursos: index and four profiles | Route files, ModulePage, sitemap | Shared header remains outside page content. |
| Formación: catalog, available courses, workshops and pending modules | Route files, training reader, Guía 34 reader, ModulePage | Readers and local controls do not replace the header; content overflow is scoped below it. |
| Simulacros: index, four exams, submission and results | Route files, practice exam, session and results | No full-screen overlay removes navigation. Confirmation is inline; timer and save callbacks do not set header visibility. |
| Biblioteca: index, three shelves and document detail | Route files, library catalog, CSS | Header retained; Radix detail temporarily traps focus, with close/Escape returning to the trigger. |
| DOCENTE IA and resources | Route files, chat and resource presentation | Shared header retained; streamed responses do not affect its layout. |
| Login, signup and recovery | Routes, auth form, account subscriber | Shared header retained across loading, errors and identity transitions. |
| Account, panel, courses, progress, history and certificates | All private routes, learning account, profile selector/dashboard | Shared header precedes the protected Outlet; query/error states replace only page content. Signed-out redirects checked; real sessions remain unverified. |
| Admin and eight children | Admin gate, route files, offer editor | Role gate changes only the child body, not header. No authorization changes. Real admin access remains unverified. |
| Root errors and not found | Root error/not-found components | Previously could replace the normal shell with only a home link. Fixed with provider-independent Menú and hard links. |
| Footer and breadcrumbs | Site shell, ModulePage | Additional navigation remains available; not the sole narrow-screen entry point. |
| Server functions and background flows | learning functions, access draft functions, bearer middleware, account subscriber, practice session, IA route | No CSS or visibility decisions; data/auth operations do not implement navigation layout. Unchanged. |
| Database functions and permissions | Existing function callers/schema contract | No navigation rendering or visibility rules. Database changes unnecessary and not performed; this sweep is not a new RLS audit. |
| Unused UI primitives | Import search across application routes/components | Sidebar/navigation-menu templates are not active application navigation and do not override the shared header. |

## Evidence and limits
Browser sweep checked 64 distinct paths at 800 CSS pixels, including redirects and a not-found resource, for visible general or recovery navigation. The 404 recovery menu opened and navigated to Biblioteca. The prior 24 page/width regression matrix still covers home and three modules at six widths. All 99 automated tests passed; latest compilation succeeded.

The root exception fallback was inspected in source but a production exception was not deliberately triggered. Real signed-in and admin sessions were not created or modified. No payments, records, settings, roles or permissions changed.