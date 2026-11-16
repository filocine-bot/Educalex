import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { isTrainingPath } from "@/lib/training-courses";
import { courses, getPage, type Perfil } from "@/lib/educalex-sitemap";

const perfiles: Perfil[] = ["Aspirante a docente", "Docente en ejercicio", "Docente que busca ascender", "Aspirante a coordinador", "Aspirante a rector"];
const temas = [...new Set(courses.map(c => c.tema))];
const niveles = ["Fundamentación", "Profundización", "Especialización"];

export function CourseCatalog() {
  const [perfil, setPerfil] = useState(""); const [tema, setTema] = useState(""); const [nivel, setNivel] = useState("");
  const list = useMemo(() => [...courses].sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado)).filter(c => (!perfil || c.perfiles.includes(perfil as Perfil)) && (!tema || c.tema === tema) && (!nivel || c.nivel === nivel)), [perfil, tema, nivel]);
  const sel = (label: string, value: string, set: (v: string) => void, opts: string[]) => <label className="cat-filter"><span>{label}</span><select value={value} onChange={e => set(e.target.value)}><option value="">Todos</option>{opts.map(o => <option key={o}>{o}</option>)}</select></label>;
  return <div>
    <h2 className="mod-h2">Catálogo de cursos</h2>
    <div className="cat-filters">{sel("Perfil profesional", perfil, setPerfil, perfiles)}{sel("Temática", tema, setTema, temas)}{sel("Nivel", nivel, setNivel, niveles)}</div>
    <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? "curso" : "cursos"}</p>
    {list.length === 0 ? <div className="mod-notice"><p>No hay cursos con esa combinación de filtros. Prueba con otra opción.</p></div> :
    <div className="mod-cards">{list.map(c => { const p = getPage(c.path); if (!p) return null; const available = c.path === "/formacion/guia-34-pmi" || isTrainingPath(c.path); return <Link key={c.path} to={c.path} className={`mod-card${c.destacado ? " mod-card-featured" : ""}`}>{c.destacado && <span className="mod-badge"><Star /> Módulo destacado</span>}<strong>{p.title}</strong><small>{p.description}</small><span className="cat-tags"><em>{c.tema}</em><em>{c.nivel}</em></span><small className="font-semibold text-brand-blue">{available ? "Autoestudio disponible" : "En preparación"}</small><span className="pathway-link">{available ? "Leer curso" : "Ver programa"} <ArrowRight /></span></Link>; })}</div>}
  </div>;
}
