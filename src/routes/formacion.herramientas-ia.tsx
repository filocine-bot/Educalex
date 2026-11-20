import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Bot, Brain, ExternalLink, GraduationCap, Layers, Lightbulb, MessageSquare, MousePointerClick, Palette, Presentation, Puzzle, ShieldAlert, Sparkles, WandSparkles, type LucideIcon } from "lucide-react";
import { ModulePage } from "@/components/module-page";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { aiCategories, aiCautions, aiTools, promptFormula, type AiCategory, type AiIcon, type AiTool } from "@/lib/ai-tools";

const page = pages["/formacion/herramientas-ia"];
export const Route = createFileRoute("/formacion/herramientas-ia")({ head: () => pageHead(page.title, page.description), component: AiToolsPage });

const ICONS: Record<AiIcon, LucideIcon> = { bot: Bot, sparkles: Sparkles, message: MessageSquare, brain: Brain, book: BookOpen, wand: WandSparkles, graduation: GraduationCap, puzzle: Puzzle, palette: Palette, presentation: Presentation, layers: Layers, mouse: MousePointerClick };

function AiToolsPage() {
  const [cat, setCat] = useState<AiCategory | null>(null);
  const [open, setOpen] = useState<AiTool | null>(null);
  const shown = cat ? aiTools.filter(t => t.category === cat) : aiTools;
  return <ModulePage path="/formacion/herramientas-ia" showItems={false} tight>
    <div className="ai-filters" role="group" aria-label="Filtrar por uso">
      <button type="button" aria-pressed={cat === null} onClick={() => setCat(null)}>Todas ({aiTools.length})</button>
      {aiCategories.map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</button>)}
    </div>
    <p className="ai-hint">Toca un ícono para ver para qué sirve la herramienta, cuánto cuesta e ideas para usarla.</p>
    <ul className="ai-icons">{shown.map(t => {
      const Icon = ICONS[t.icon];
      return <li key={t.id}><button type="button" className="ai-icon-btn" style={{ ["--ai" as string]: t.color }} onClick={() => setOpen(t)} aria-haspopup="dialog">
        <span className="ai-icon"><Icon aria-hidden="true" /></span><span className="ai-icon-name">{t.name}</span>
      </button></li>;
    })}</ul>

    <Dialog open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
      {open && <DialogContent className="ai-dialog" style={{ ["--ai" as string]: open.color }}>
        <ToolDetail tool={open} />
      </DialogContent>}
    </Dialog>

    <section className="ai-prompt" aria-labelledby="ai-prompt-title">
      <h2 id="ai-prompt-title"><Lightbulb aria-hidden="true" /> Cómo pedirle a la IA lo que necesitas</h2>
      <p>Una buena instrucción tiene cuatro partes. Mientras más contexto des, más útil será la respuesta.</p>
      <ol>{promptFormula.map(p => <li key={p.step}><strong>{p.step}:</strong> {p.text}</li>)}</ol>
    </section>

    <section className="ai-cautions" aria-labelledby="ai-cautions-title">
      <h2 id="ai-cautions-title"><ShieldAlert aria-hidden="true" /> Úsala con responsabilidad</h2>
      <ul>{aiCautions.map(c => <li key={c}>{c}</li>)}</ul>
    </section>
  </ModulePage>;
}

function ToolDetail({ tool: t }: { tool: AiTool }) {
  const Icon = ICONS[t.icon];
  return <>
    <div className="ai-card-head"><span className="ai-icon"><Icon aria-hidden="true" /></span><div><DialogTitle className="ai-dialog-title">{t.name}</DialogTitle><span className="ai-cat">{t.category}</span></div></div>
    <DialogDescription className="ai-dialog-text">{t.purpose}</DialogDescription>
    <p className="ai-cost">{t.cost}</p>
    <div><p className="ai-ideas-title">Ideas para usarla</p><ul className="ai-ideas">{t.ideas.map(i => <li key={i}>{i}</li>)}</ul></div>
    {t.internal
      ? <Link to="/docente-ia" className="ai-go">Abrir EducatIA <ArrowRight aria-hidden="true" /></Link>
      : <a href={t.url} target="_blank" rel="noopener noreferrer" className="ai-go">Ir al sitio oficial <ExternalLink aria-hidden="true" /></a>}
  </>;
}
