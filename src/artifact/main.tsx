/* Punto de entrada de la versión publicada como artefacto de Claude (una sola página, sin servidor). */
import css from "../styles.css?inline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { Route as RootRoute } from "../routes/__root";

// El paquete declara "sideEffects": false, así que la hoja de estilos se inserta a mano.
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// La raíz del sitio completo dibuja <html>; aquí la página ya existe.
RootRoute.update({ shellComponent: undefined } as never);

/** "/concursos/ingreso-docente" ⇄ "#concursos--ingreso-docente" (las anclas del visor solo admiten #nombre). */
export const toHash = (path: string) => (path.split(/[?#]/)[0] ?? "/").replace(/^\/+|\/+$/g, "").replace(/\//g, "--");
export const fromHash = (hash: string) => "/" + decodeURIComponent(hash.replace(/^#/, "")).replace(/--/g, "/");

const history = createMemoryHistory({ initialEntries: [fromHash(window.location.hash)] });
(history as { createHref: (p: string) => string }).createHref = (p: string) => "#" + toHash(p);

const queryClient = new QueryClient();
const router = createRouter({ routeTree, history, context: { queryClient }, defaultPreloadStaleTime: 0 });

let syncing = false;
router.subscribe("onResolved", ({ toLocation }) => {
  const target = toHash(toLocation.pathname);
  if (("#" + target) !== window.location.hash && !(target === "" && window.location.hash === "")) {
    syncing = true;
    try { history.length; window.location.hash = target; } catch { /* el visor puede bloquear el cambio */ }
    setTimeout(() => { syncing = false; }, 0);
  }
  window.scrollTo({ top: 0 });
  const title = document.querySelector("main h1")?.textContent?.trim();
  document.title = title && title !== "EDUCALEX" ? `${title} · EDUCALEX` : "EDUCALEX – Academia Inteligente de Educación";
});
window.addEventListener("hashchange", () => {
  if (syncing) return;
  const path = fromHash(window.location.hash);
  if (path !== router.state.location.pathname) void router.navigate({ to: path });
});

// Enlaces internos escritos como <a href="/ruta"> (páginas de error, menús de recuperación).
document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = (event.target as Element | null)?.closest?.("a");
  const href = anchor?.getAttribute("href");
  if (!anchor || !href || anchor.target === "_blank") return;
  if (href.startsWith("/") && !href.startsWith("//")) { event.preventDefault(); void router.navigate({ to: href.split(/[?#]/)[0] ?? "/" }); }
  else if (href.startsWith("#") && href.length > 1 && !document.getElementById(href.slice(1))) { event.preventDefault(); void router.navigate({ to: fromHash(href) }); }
}, true);

declare module "@tanstack/react-router" { interface Register { router: typeof router } }

createRoot(document.getElementById("root")!).render(<StrictMode><RouterProvider router={router} /></StrictMode>);
