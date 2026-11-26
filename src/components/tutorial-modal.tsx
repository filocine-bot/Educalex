import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ListOrdered, PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { GuidedTour } from "@/components/guided-tour";

/** Evento para abrir el tutorial desde cualquier botón de la página. */
export const TUTORIAL_EVENT = "educalex:tutorial";
export const openTutorial = () => window.dispatchEvent(new Event(TUTORIAL_EVENT));

/**
 * Ventana emergente con el tutorial de seis pasos que ya existe (video y recorrido guiado de /guia-de-uso).
 * Se abre con el botón de la portada, con «¿Cómo funciona?» del menú y con cualquier enlace a /guia-de-uso,
 * sin salir de la página en la que está la persona. La página /guia-de-uso sigue disponible por dirección directa.
 */
export function TutorialModal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"video" | "pasos">("video");
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const show = () => { setTab("video"); setOpen(true); };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href !== "/guia-de-uso" || window.location.pathname === "/guia-de-uso") return;
      e.preventDefault();
      show();
    };
    window.addEventListener(TUTORIAL_EVENT, show);
    document.addEventListener("click", onClick, true);
    if (window.location.hash === "#como-funciona") show();
    return () => { window.removeEventListener(TUTORIAL_EVENT, show); document.removeEventListener("click", onClick, true); };
  }, []);

  // Si un paso del recorrido lleva a otra página, la ventana se cierra.
  useEffect(() => { setOpen(false); }, [pathname]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="tutorial-modal">
      <DialogTitle className="tutorial-title">Cómo funciona EDUCALEX en 6 pasos</DialogTitle>
      <DialogDescription className="tutorial-sub">Elige tu simulacro, haz tu compra y empieza tu preparación.</DialogDescription>
      <div className="tutorial-tabs" role="tablist" aria-label="Formato del tutorial">
        <button type="button" role="tab" aria-selected={tab === "video"} className={tab === "video" ? "active" : ""} onClick={() => setTab("video")}><PlayCircle aria-hidden="true" /> Video (1 min)</button>
        <button type="button" role="tab" aria-selected={tab === "pasos"} className={tab === "pasos" ? "active" : ""} onClick={() => setTab("pasos")}><ListOrdered aria-hidden="true" /> Paso a paso</button>
      </div>
      <div role="tabpanel" className="tutorial-body">
        {tab === "video"
          ? <video className="tutorial-video" controls autoPlay playsInline preload="metadata" poster="/videos/educalex-como-usar.jpg" aria-label="Video: cómo usar EDUCALEX en 6 pasos"><source src="/videos/educalex-como-usar.mp4" type="video/mp4" /></video>
          : <GuidedTour />}
      </div>
    </DialogContent>
  </Dialog>;
}
