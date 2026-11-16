import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { headerNavigation, institutionalLinks } from '@/lib/header-navigation';

// Hard navigation remains usable when the router or account provider is failing.
export function RecoveryNavigation() {
  const links = [...headerNavigation.flatMap(item => [item, ...(item.children ?? [])]), ...institutionalLinks,
    { label: 'Ingresar', to: '/ingresar' }, { label: 'Registrarse', to: '/registro' }];
  return <nav aria-label="Navegación de recuperación" className="fixed right-4 bottom-4 z-50 flex items-center gap-2">
    <Button asChild variant="outline" className="min-h-11"><a href="/">Inicio</a></Button>
    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="min-h-11"><Menu aria-hidden="true" />Menú</Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-72">{links.map(link => <DropdownMenuItem asChild key={link.to} className="min-h-11"><a href={link.to}>{link.label}</a></DropdownMenuItem>)}</DropdownMenuContent>
    </DropdownMenu>
  </nav>;
}