import { Link } from '@tanstack/react-router';
import { CheckCircle2, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { preparationLevels } from '@/lib/preparation-levels';
import { useAccount } from './account-session';

export function PreparationPlans() {
  const { user } = useAccount();
  return <div className="space-y-8">
    <div className="border-b border-border pb-6"><h2 className="text-2xl font-semibold">Explorador · gratuito</h2><p className="mt-2">{user ? 'Tu nivel actual' : 'Nivel inicial para todos'} · Sin pagos habilitados</p><p className="mt-3 text-muted-foreground">Biblioteca, cinco cursos de autoestudio y cuatro prácticas originales de ocho preguntas por perfil. Repetición libre; con cuenta, progreso e historial personal.</p></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{preparationLevels.map(level => <article key={level.code} className="rounded-lg border border-border bg-card p-5 space-y-4">
      {level.available ? <CheckCircle2 className="text-primary" aria-hidden="true"/> : <Clock3 className="text-muted-foreground" aria-hidden="true"/>}
      <h2 className="text-xl font-semibold">{level.label}</h2><p className="font-medium">{level.available ? 'Gratuito · disponible' : 'Próximamente · futuro premium'}</p><p className="text-sm text-muted-foreground">{level.focus}</p>
      <dl className="space-y-3 text-sm"><div><dt className="font-semibold">Contenido actual</dt><dd>Todo gratuito, sin restricciones</dd></div><div><dt className="font-semibold">Prácticas actuales</dt><dd>4 perfiles × 8 preguntas · repetición libre</dd></div><div><dt className="font-semibold">Beneficios adicionales</dt><dd>{level.available ? 'Progreso e historial con cuenta' : 'Por definir; no disponibles'}</dd></div><div><dt className="font-semibold">Contratación</dt><dd>{level.available ? 'No requiere compra' : 'No habilitada'}</dd></div></dl>
    </article>)}</div>
    <p className="text-muted-foreground">Los niveles futuros no están disponibles para contratar. Sus beneficios y reglas se definirán antes de su activación; no hay simulacros adicionales disponibles ni ascensos automáticos por progreso.</p>
    <div className="flex flex-wrap gap-3"><Button asChild><Link to="/formacion">Estudiar gratis</Link></Button><Button asChild variant="outline"><Link to="/simulacros">Practicar gratis</Link></Button><Button asChild variant="outline"><Link to={user ? '/mi-cuenta' : '/registro'}>{user ? 'Mi cuenta' : 'Crear cuenta gratuita'}</Link></Button></div>
  </div>;
}