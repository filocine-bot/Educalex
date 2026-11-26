import { Link } from '@tanstack/react-router';
import { CheckCircle2, Crown, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PREMIUM_LOCKED } from '@/lib/game-engine';
import { LAUNCH_BUYERS, PRICES } from '@/lib/payments';
import { PlanPayButton } from '@/components/direct-pay';

const cop = (n: number) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) + ' COP';

const plans = [
  { icon: CheckCircle2, name: 'Gratuito', price: 'Sin costo', items: ['Prueba gratis de 10 preguntas por perfil, con tu resultado y los temas a reforzar', 'Normas resumidas, su aplicación en contextos educativos y fichas descargables en PDF', 'Estudio de casos: Ruta de Atención Integral y dilemas educativos', 'Cursos de autoestudio y videos del MEN', 'EducatIA con voz', 'Constancia de participación al superar la prueba gratis'] },
  { icon: Star, tier: 'docente' as const, name: 'Acceso docente', price: `${cop(PRICES.docente)} · pago único por perfil`, items: ['Para Ingreso a la carrera docente o Ascenso y reubicación', 'Simulacro completo por componentes de la prueba, en bloques de 10 preguntas (3 intentos por bloque)', 'Simulacro con tiempo de 40 preguntas', 'Retroalimentación con explicación y norma en cada respuesta', 'Refuerzo de los temas que debes reforzar, con repaso de tus errores', 'Videos explicativos, que se suman a tu acceso a medida que se publican', 'Sin suscripción ni renovación automática'] },
  { icon: Crown, tier: 'directivo' as const, name: 'Acceso directivo', price: `${cop(PRICES.directivo)} · pago único por perfil`, items: ['Para Rector o Coordinador', 'Simulacro completo por componentes de la prueba, en bloques de 10 preguntas (3 intentos por bloque)', 'Simulacro con tiempo de 40 preguntas', 'Retroalimentación con explicación y norma en cada respuesta', 'Refuerzo de los temas que debes reforzar, con repaso de tus errores', 'Videos explicativos, que se suman a tu acceso a medida que se publican', 'Sin suscripción ni renovación automática'] },
];

export function PreparationPlans() {
  return <div className="space-y-8">
    {!PREMIUM_LOCKED && <p className="game-launch">Lanzamiento: por tiempo limitado, todos los niveles están abiertos gratis.</p>}
    <p className="game-launch">Precios de lanzamiento en pesos colombianos (COP) para las primeras {LAUNCH_BUYERS} compras. Después se actualizarán; quien ya compró conserva su acceso.</p>
    <div className="grid gap-5 md:grid-cols-3">{plans.map(p => <article key={p.name} className="rounded-lg border border-border bg-card p-5 space-y-3">
      <p.icon className="text-primary" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{p.name}</h2>
      <p className="font-semibold">{p.price}</p>
      <ul className="list-disc pl-5 space-y-1 text-sm">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
      {'tier' in p && p.tier && PREMIUM_LOCKED && <PlanPayButton tier={p.tier} />}
    </article>)}</div>
    <p>Paga aquí mismo eligiendo tu perfil, o desde la columna de pago de cada simulacro, con pago seguro por Wompi (tarjetas, PSE, Nequi). Derecho de retracto de 5 días hábiles; consulta los <Link to="/terminos" className="underline">términos</Link>.</p>
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="navy"><Link to="/simulacros">Ir a los simulacros</Link></Button>
      <Button asChild variant="outline"><Link to="/registro">Crear cuenta gratis</Link></Button>
    </div>
  </div>;
}
