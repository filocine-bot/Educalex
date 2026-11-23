import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

/**
 * Espacio para el píxel de Meta (Facebook/Instagram).
 * No hace nada hasta que se configure VITE_META_PIXEL_ID en Vercel.
 * Cuando está configurado, solo se carga si la persona acepta las cookies de medición.
 */
const PIXEL_ID = (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined)?.trim() ?? "";
const KEY = "educalex-cookies-medicion";

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void; push?: unknown };
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

function loadPixel(id: string) {
  if (typeof window === "undefined" || window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) { fbq.callMethod ? fbq.callMethod(...args) : fbq.queue!.push(args); } as Fbq;
  fbq.queue = []; fbq.loaded = true; fbq.version = "2.0"; fbq.push = fbq;
  window.fbq = fbq; window._fbq = fbq;
  const s = document.createElement("script"); s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", id);
}

export function MetaPixel() {
  const path = useRouterState({ select: s => s.location.pathname });
  const [choice, setChoice] = useState<"si" | "no" | null | "pending">("pending");
  useEffect(() => { try { const v = localStorage.getItem(KEY); setChoice(v === "si" || v === "no" ? v : null); } catch { setChoice(null); } }, []);
  useEffect(() => { if (PIXEL_ID && choice === "si") { loadPixel(PIXEL_ID); window.fbq?.("track", "PageView"); } }, [choice, path]);
  if (!PIXEL_ID || choice !== null) return null;
  const decide = (v: "si" | "no") => { try { localStorage.setItem(KEY, v); } catch { /* sin almacenamiento */ } setChoice(v); };
  return <div className="cookie-banner" role="dialog" aria-label="Preferencias de cookies">
    <p>Usamos cookies de medición de Meta para saber cómo llegan las personas a EDUCALEX y mejorar nuestros anuncios. Puedes aceptarlas o rechazarlas. <Link to="/privacidad">Política de privacidad</Link>.</p>
    <div><button type="button" onClick={() => decide("no")}>Rechazar</button><button type="button" className="is-accept" onClick={() => decide("si")}>Aceptar</button></div>
  </div>;
}
