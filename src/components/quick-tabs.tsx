import { Link, useRouterState } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { Scale, BookMarked, Library, Video, ClipboardCheck, GraduationCap, Bot, Star, ChevronDown, ArrowRight, type LucideIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { libraryDocs, type PagePath } from '@/lib/educalex-sitemap';
import { videoThemes } from '@/lib/official-videos';
import { headerNavigation } from '@/lib/header-navigation';
import { simulacrosFor } from '@/lib/profile-navigation';
import { useMyEducationalProfile } from '@/lib/use-my-profile';

type Entry = { label: string; to: string; params?: Record<string, string>; hash?: string; hint?: string };
type Tab = { label: string; to: PagePath | '/docente-ia'; icon: LucideIcon; summary: string; entries: Entry[]; more?: string };

const SIM_LABELS: Record<string, string> = { 'ingreso-docente': 'Ingreso docente', 'ascenso-reubicacion': 'Ascenso y reubicación', rector: 'Rector', coordinador: 'Coordinador' };
const shelf = (s: string, n = 8): Entry[] => libraryDocs.filter(d => d.shelf === s).slice(0, n).map(d => ({ label: d.title, to: '/biblioteca/ficha/$id', params: { id: d.id }, hint: d.categoria }));
const KEY_LAWS = ['constitucion-1991', 'ley-115-1994', 'ley-1620-2013', 'decreto-1965-2013', 'decreto-1278-2002', 'ley-715-2001', 'decreto-1290-2009', 'decreto-1421-2017', 'ley-1098-2006', 'ley-1952-2019'];
const keyLaws = (): Entry[] => [
  ...KEY_LAWS.flatMap(id => libraryDocs.filter(d => d.id === id)).map(d => ({ label: d.title, to: '/biblioteca/ficha/$id', params: { id: d.id }, hint: d.categoria })),
  { label: 'Ruta de Atención Integral (interactiva)', to: '/formacion/ruta-atencion-integral', hint: 'Convivencia' },
];
const count = (s: string) => libraryDocs.filter(d => d.shelf === s).length;

function tabsFor(sims: readonly string[]): Tab[] {
  return [
    { label: 'Legislación educativa', to: '/biblioteca/legislacion', icon: Scale, summary: 'Leyes, decretos y resoluciones del sector, con ficha, infografía y descarga en PDF.', entries: keyLaws(), more: `Ver las ${count('/biblioteca/legislacion')} normas` },
    { label: 'Guías del MEN', to: '/biblioteca/guias-men', icon: BookMarked, summary: 'Guías y orientaciones del Ministerio de Educación Nacional.', entries: shelf('/biblioteca/guias-men'), more: `Ver las ${count('/biblioteca/guias-men')} guías` },
    { label: 'Bibliografía y recursos', to: '/biblioteca/recursos', icon: Library, summary: 'Documentos y recursos institucionales de consulta.', entries: shelf('/biblioteca/recursos'), more: `Ver los ${count('/biblioteca/recursos')} recursos` },
    { label: 'Videos educativos', to: '/biblioteca/videos', icon: Video, summary: 'Videos públicos del Ministerio de Educación, organizados por temática.', entries: videoThemes.map(t => ({ label: t.title, to: '/biblioteca/videos', hash: t.id, hint: `${t.videos.length} videos` })), more: 'Ver toda la videoteca' },
    { label: 'Simulacros', to: '/simulacros', icon: ClipboardCheck, summary: 'Preguntas tipo ICFES con contexto, en modo juego por niveles o simulacro completo.', entries: [...sims.map(s => ({ label: `Simulacro: ${SIM_LABELS[s]}`, to: `/simulacros/${s}`, hint: '40 preguntas · 4 niveles' })), { label: 'Mis resultados', to: '/mis-resultados' }], more: 'Ir a simulacros' },
    { label: 'Cursos', to: '/formacion', icon: GraduationCap, summary: 'Cursos de autoestudio para el desarrollo profesional docente y directivo.', entries: (headerNavigation.find(i => i.to === '/formacion')?.children ?? []).map(c => ({ label: c.label, to: c.to })), more: 'Ver el catálogo de cursos' },
    { label: 'EducatIA', to: '/docente-ia', icon: Bot, summary: 'Asistente con voz que explica normas, guías y casos pedagógicos, citando la fuente.', entries: [{ label: 'Hacer una pregunta a EducatIA', to: '/docente-ia' }], more: 'Abrir EducatIA' },
    { label: 'Planes', to: '/planes', icon: Star, summary: 'Qué es gratis y qué incluye el acceso Premium.', entries: [{ label: 'Gratuito: biblioteca, videos, cursos, simulacro completo y nivel Básico', to: '/planes' }, { label: 'Plan Intermedio por perfil: $29.900, pago único', to: '/planes' }, { label: 'Plan Completo por perfil: $49.900, pago único', to: '/planes' }, { label: 'Paquete directivo (Rector + Coordinador): $79.900', to: '/planes' }], more: 'Ver planes' },
  ];
}

export function QuickTabs() {
  const { profile } = useMyEducationalProfile();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const tabs = tabsFor(simulacrosFor(profile));
  return <nav className="quick-tabs" aria-label="Accesos rápidos"><div className="quick-tabs-inner">{tabs.map(t => {
    const active = pathname === t.to || pathname.startsWith(`${t.to}/`);
    return <QuickTab key={t.to} tab={t} active={active} />;
  })}</div></nav>;
}

// Se despliega al pasar el mouse (y al hacer clic o con el teclado), para ver qué contiene cada pestaña sin salir de la página.
function QuickTab({ tab: t, active }: { tab: Tab; active: boolean }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hoverIn = (e: React.PointerEvent) => { if (e.pointerType !== 'mouse') return; clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), 120); };
  const hoverOut = (e: React.PointerEvent) => { if (e.pointerType !== 'mouse') return; clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 220); };
  return <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="quick-tab-trigger" data-active={active} onPointerEnter={hoverIn} onPointerLeave={hoverOut} onPointerDown={e => { if (e.pointerType === 'mouse' && open) e.preventDefault(); }}><t.icon aria-hidden="true" />{t.label}<ChevronDown aria-hidden="true" className="quick-tab-chevron" /></DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4} className="quick-panel" onPointerEnter={hoverIn} onPointerLeave={hoverOut} onCloseAutoFocus={e => e.preventDefault()}>
        <p className="quick-panel-title"><t.icon aria-hidden="true" />{t.label}</p>
        <p className="quick-panel-summary">{t.summary}</p>
        <div className="quick-panel-list">{t.entries.map(e => <DropdownMenuItem key={e.label} asChild><Link to={e.to as never} params={e.params as never} {...(e.hash ? { hash: e.hash } : {})}><span>{e.label}</span>{e.hint && <small>{e.hint}</small>}</Link></DropdownMenuItem>)}</div>
        <DropdownMenuItem asChild className="quick-panel-more"><Link to={t.to}>{t.more ?? 'Ver todo'}<ArrowRight aria-hidden="true" /></Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}
