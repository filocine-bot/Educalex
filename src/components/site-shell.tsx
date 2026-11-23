import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Menu, ChevronDown, UserRound, LogOut, Home } from 'lucide-react';
import { useAccount } from './account-session';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from './ui/dropdown-menu';
import { ProfileSelector } from './profile-selector';
import { QuickTabs } from './quick-tabs';
import { getLearning } from '@/lib/learning.functions';
import { supabase } from '@/integrations/supabase/client';
import { isArtifact } from '@/lib/runtime-mode';
import { profileGroups, resolveEducationalProfile, simulacrosFor } from '@/lib/profile-navigation';
import { headerNavigation, institutionalLinks, type HeaderItem, type HeaderLink } from '@/lib/header-navigation';
import logo from '@/assets/educalex-logo-horizontal.webp';
import { HeaderQuick } from './header-quick';
import { InstagramIcon, FacebookIcon, WhatsappIcon } from './brand-icons';
import { WHATSAPP_NUMBER } from './whatsapp-launcher';
import { SOCIAL } from '@/lib/social';

function MenuLink({ item }: { item: HeaderLink }) {
  return <DropdownMenuItem asChild className="min-h-11"><Link to={item.to} activeOptions={{ exact: item.to === '/' }}>{item.label}</Link></DropdownMenuItem>;
}
function MenuSection({ item }: { item: HeaderItem }) {
  if (!item.children) return <MenuLink item={item} />;
  return <DropdownMenuSub><DropdownMenuSubTrigger className="min-h-11">{item.label}</DropdownMenuSubTrigger><DropdownMenuSubContent className="header-submenu"><MenuLink item={{ label: `Ver ${item.label.toLowerCase()}`, to: item.to }} /><DropdownMenuSeparator />{item.children.map(child => <MenuLink key={child.to} item={child} />)}</DropdownMenuSubContent></DropdownMenuSub>;
}
function NavGroup({ group, active = false }: { group: { label: string; links: HeaderLink[] }; active?: boolean }) {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="profile-menu-trigger" data-active={active}>{group.label}<ChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="start" className="header-menu-content">{group.links.map(item => <MenuLink key={item.label} item={item} />)}</DropdownMenuContent></DropdownMenu>;
}

export function SiteHeader() {
  const { user, isAdmin } = useAccount();
  const query = useQuery({ queryKey: ['learning-account'], queryFn: () => getLearning(), enabled: !!user });
  const pathname = useRouterState({ select: state => state.location.pathname });
  const profile = resolveEducationalProfile(query.data?.profile?.preparation_path);
  const groups = profile ? profileGroups(profile) : [];
  const mySims = simulacrosFor(profile);
  const navItems = headerNavigation.map(item => item.to === '/simulacros' && item.children ? { ...item, children: item.children.filter(c => mySims.some(m => c.to === `/simulacros/${m}`)) } : item);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const active = (path: string) => path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
  async function signOut() {
    setBusy(true); setMessage('');
    try { const { error } = await supabase.auth.signOut(); if (error) throw error; }
    catch { setMessage('No se pudo cerrar la sesión. Intenta de nuevo.'); }
    finally { setBusy(false); }
  }
  const sessionItems = <>{user ? <><MenuLink item={{ label: 'Mi cuenta', to: '/mi-cuenta' }} />{isAdmin && <MenuLink item={{ label: 'Administración', to: '/admin' }} />}{!isArtifact && <DropdownMenuItem className="min-h-11" disabled={busy} onSelect={() => void signOut()}><LogOut aria-hidden="true" />Salir</DropdownMenuItem>}</> : <><MenuLink item={{ label: 'Ingresar', to: '/ingresar' }} /><MenuLink item={{ label: 'Registrarse', to: '/registro' }} /></>}</>;
  return <header className="site-header profile-header">
    <div className="institutional-bar"><div className="site-container header-inner">
      <Link className="header-brand" to="/" aria-label="EDUCALEX, inicio"><img src={logo} className="brand-logo" width={480} height={104} alt="EDUCALEX – Academia Inteligente de Educación" /></Link>
      <nav className="desktop-nav" aria-label="Navegación institucional">
        {navItems.filter(item => item.to !== '/').map(item => <div key={item.to} className={item.compact ? 'header-secondary-link' : 'header-core-link'}>{item.children ? <NavGroup active={active(item.to)} group={{ label: item.label, links: [{ label: `Ver ${item.label.toLowerCase()}`, to: item.to }, ...item.children] }} /> : <Link className="nav-item" to={item.to} activeOptions={{ exact: item.to === '/' }}>{item.label}</Link>}</div>)}
        <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="profile-menu-trigger" data-active={headerNavigation.some(item => item.compact && active(item.to)) || institutionalLinks.some(item => active(item.to))}>Más<ChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="header-menu-content"><div className="header-overflow-links">{headerNavigation.filter(item => item.compact).map(item => <MenuLink key={item.to} item={item} />)}<DropdownMenuSeparator /></div>{institutionalLinks.map(item => <MenuLink key={item.to} item={item} />)}</DropdownMenuContent></DropdownMenu>
      </nav>
      <div className="header-actions">{user ? <DropdownMenu><DropdownMenuTrigger asChild><Button variant="hero" aria-label="Opciones de Mi cuenta"><UserRound aria-hidden="true" /><span>Mi cuenta</span><ChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="header-menu-content"><DropdownMenuLabel className="max-w-60 break-words">{query.data?.profile?.display_name || 'Mi cuenta'}</DropdownMenuLabel>{sessionItems}</DropdownMenuContent></DropdownMenu> : <><Button asChild variant="ghost" className="header-login"><Link to="/ingresar">Ingresar</Link></Button><Button asChild variant="hero"><Link to="/registro">Registrarse</Link></Button></>}</div>
      <HeaderQuick />
      <Link className="nav-item header-home-link" to="/" activeOptions={{ exact: true }}><Home aria-hidden="true" className="header-home-icon" />Inicio</Link>
      <DropdownMenu><DropdownMenuTrigger asChild><Button className="mobile-menu-button" variant="heroOutline" aria-label="Abrir menú general"><Menu aria-hidden="true" /><span>Menú</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="header-menu-content mobile-header-menu"><DropdownMenuLabel>EDUCALEX</DropdownMenuLabel>{navItems.map(item => <MenuSection key={item.to} item={item} />)}{institutionalLinks.map(item => <MenuLink key={item.to} item={item} />)}<DropdownMenuSeparator />{sessionItems}</DropdownMenuContent></DropdownMenu>
    </div></div>
    <div className="profile-bar"><div className="site-container profile-bar-inner">
      {user ? <ProfileSelector /> : <span className="preparation-label">Aprende. Avanza. Transforma.</span>}
      <nav className="profile-desktop-nav" aria-label="Navegación de preparación">{user ? <><Link className="nav-item" to="/mi-panel">Mi panel</Link>{groups.map(group => <NavGroup key={group.label} group={group} />)}<Link className="nav-item" to="/mi-progreso">Mi progreso</Link></> : <>{institutionalLinks.map(item => <Link key={item.to} className="nav-item" to={item.to}>{item.label}</Link>)}</>}</nav>
      <DropdownMenu><DropdownMenuTrigger asChild><Button className="profile-mobile-button" variant="ghost">Mi preparación<ChevronDown aria-hidden="true" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="header-menu-content mobile-header-menu">{user ? <><MenuLink item={{ label: 'Mi panel', to: '/mi-panel' }} />{groups.map(group => <MenuSection key={group.label} item={{ label: group.label, to: '/mi-panel', children: group.links }} />)}<MenuLink item={{ label: 'Mi progreso', to: '/mi-progreso' }} /></> : <>{navItems.filter(item => item.children).map(item => <MenuSection key={item.to} item={item} />)}</>}</DropdownMenuContent></DropdownMenu>
    </div></div>
    <QuickTabs />{message && <p role="alert" className="header-error">{message}</p>}
  </header>;
}



export function SiteFooter() {
  return <footer className="site-footer"><div className="site-container footer-inner"><div><Link to="/" className="footer-name">EDUCA<span>LEX</span></Link><p className="footer-note">ACADEMIA INTELIGENTE DE EDUCACIÓN</p></div><p>Aprende. Avanza. Transforma.</p><nav className="footer-links" aria-label="Enlaces del sitio"><Link to="/guia-de-uso">Cómo usar</Link><Link to="/planes">Planes</Link><Link to="/nosotros">Nosotros</Link><Link to="/asesoria-investigacion">Asesoría en investigación</Link><Link to="/contacto">Contacto</Link><Link to="/privacidad">Privacidad</Link><Link to="/terminos">Términos</Link><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></nav><div className="footer-social-wrap"><p className="footer-social-title">Síguenos y escríbenos</p><div className="footer-social" aria-label="Contacto y redes sociales de EDUCALEX"><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +57 301 874 7379 (se abre en una pestaña nueva)"><WhatsappIcon /><span>WhatsApp</span></a><a href={SOCIAL.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${SOCIAL.instagram.handle} (se abre en una pestaña nueva)`}><InstagramIcon /><span>{SOCIAL.instagram.handle}</span></a><a href={SOCIAL.facebook.url} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ${SOCIAL.facebook.handle} (se abre en una pestaña nueva)`}><FacebookIcon /><span>{SOCIAL.facebook.handle}</span></a></div></div></div></footer>;
}