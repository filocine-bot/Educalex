import { Link } from '@tanstack/react-router';
import { CheckCircle2, Crown, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PREMIUM_LOCKED } from '@/lib/game-engine';
import { LAUNCH_BUYERS, PRICES, UPGRADE_PRICE } from '@/lib/payments';
import { PriceExplainer } from '@/components/price-explainer';
import { PlanPayButton } from '@/components/direct-pay';

const cop = (n: number) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) + ' COP';

const plans = [
  { icon: CheckCircle2, name: 'Gratuito', price: 'Sin costo', items: ['Biblioteca normativa y videoteca del MEN', 'Cursos de autoestudio', 'EducatIA con voz', 'Simulacro completo con tiempo (40 preguntas por perfil)', 'Modo juego: nivel Básico de cada perfil y del núcleo común', 'Psicotécnica, competencias evaluadas y dilemas educativos', 'Constancia de participación al superar el nivel Básico'] },
  { icon: Star, tier: 'intermedio' as const, name: 'Plan Intermedio', price: `${cop(PRICES.intermedio)} · pago único por perfil`, items: ['Todo lo gratuito', 'Nivel Intermedio (40 preguntas) del perfil que elijas y del núcleo común', 'Insignias, rachas y mapa de errores', 'Sin suscripción ni renovación automática'] },
  { icon: Crown, tier: 'completo' as const, name: 'Plan Avanzado', price: `${cop(PRICES.avanzado)} · pago único por perfil`, items: ['Todo lo gratuito', 'Niveles Intermedio (40) y Avanzado (50 preguntas) del perfil que elijas y del núcleo común', `¿Ya tienes el Intermedio? Pasa al Avanzado pagando solo ${cop(UPGRADE_PRICE)} más`, 'Sin suscripción ni renovación automática'] },
  { icon: Users, tier: 'directivo' as const, name: 'Paquete directivo', price: `${cop(PRICES.directivo)} · Rector + Coordinador`, items: ['Plan Avanzado de los perfiles Rector y Coordinador y del núcleo común', `Ahorras ${cop(2 * PRICES.avanzado - PRICES.directivo)} frente a comprarlos por separado`, 'Pago único, sin suscripción ni renovación automática'] },
];

export function PreparationPlans() {
  return <div className="space-y-8">
    {!PREMIUM_LOCKED && <p className="game-launch">Lanzamiento: por tiempo limitado, todos los niveles están abiertos gratis.</p>}
    <p className="game-launch">Precios de lanzamiento en pesos colombianos (COP) para las primeras {LAUNCH_BUYERS} compras. Después se actualizarán; quien ya compró conserva su acceso.</p>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map(p => <article key={p.name} className="rounded-lg border border-border bg-card p-5 space-y-3">
      <p.icon className="text-primary" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{p.name}</h2>
      <p className="font-semibold">{p.price}</p>
      <ul className="list-disc pl-5 space-y-1 text-sm">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
      {'tier' in p && p.tier && PREMIUM_LOCKED && <PlanPayButton tier={p.tier} />}
    </article>)}</div>
    <PriceExplainer />
    <p>Paga aquí mismo eligiendo tu perfil, o desde la columna de pago de cada simulacro, con pago seguro por Wompi (tarjetas, PSE, Nequi). Derecho de retracto de 5 días hábiles; consulta los <Link to="/terminos" className="underline">términos</Link>.</p>
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="navy"><Link to="/simulacros">Ir a los simulacros</Link></Button>
      <Button asChild variant="outline"><Link to="/registro">Crear cuenta gratis</Link></Button>
    </div>
  </div>;
}
