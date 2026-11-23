import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { searchSite } from "@/lib/site-search";

const SUGGESTIONS = ["Ley 115", "Decreto 1278", "convivencia", "PIAR", "simulacro rector", "Guía 34"];

/** Lupa de búsqueda rápida de la barra azul del encabezado. */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const hits = searchSite(q);
  return <Dialog open={open} onOpenChange={o => { setOpen(o); if (!o) setQ(""); }}>
    <DialogTrigger asChild><button className="site-search-btn" aria-label="Buscar en EDUCALEX"><Search aria-hidden="true" /><span>Buscar</span></button></DialogTrigger>
    <DialogContent className="site-search-dialog">
      <DialogTitle>Buscar en EDUCALEX</DialogTitle>
      <DialogDescription>Normas, cursos, simulacros, preguntas frecuentes y herramientas.</DialogDescription>
      <label className="site-search-field"><Search aria-hidden="true" /><input autoFocus type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Ej.: Decreto 1278, convivencia, PIAR" aria-label="Escribe lo que buscas" /></label>
      {!q.trim() && <div className="site-search-sugg"><span>Prueba con:</span>{SUGGESTIONS.map(s => <button key={s} onClick={() => setQ(s)}>{s}</button>)}</div>}
      {q.trim() && <p className="site-search-count" aria-live="polite">{hits.length ? `${hits.length} resultado${hits.length === 1 ? "" : "s"}` : "No encontramos resultados. Prueba con otra palabra."}</p>}
      <ul className="site-search-results">{hits.map(h => <li key={`${h.to}${h.params?.['id'] ?? ""}${h.title}`}>
        <Link to={h.to as "/"} params={h.params as never} onClick={() => setOpen(false)}><small>{h.kind}</small><strong>{h.title}</strong><span>{h.text.length > 140 ? `${h.text.slice(0, 140)}…` : h.text}</span></Link>
      </li>)}</ul>
    </DialogContent>
  </Dialog>;
}
