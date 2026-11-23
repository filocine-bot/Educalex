import { ArrowRight, Info } from "lucide-react";
import { LAUNCH_BUYERS, PRICES, UPGRADE_PRICE } from "@/lib/payments";

const cop = (n: number) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/** Explica en lenguaje sencillo cómo funcionan los precios y la mejora al Plan Completo. */
export function PriceExplainer() {
  return <div className="price-explainer" role="note" aria-labelledby="price-explainer-title">
    <h3 id="price-explainer-title"><Info aria-hidden="true" /> Así funcionan los precios</h3>
    <ul>
      <li><strong>Cada plan es para un perfil:</strong> Ingreso docente, Ascenso, Rector o Coordinador. Siempre incluye el núcleo común (lectura crítica, razonamiento cuantitativo y competencias).</li>
      <li><strong>Pagas una sola vez.</strong> No es una suscripción y no se renueva.</li>
      <li><strong>Precio de lanzamiento</strong> para las primeras {LAUNCH_BUYERS} compras. Quien compra conserva su acceso aunque después cambie el precio.</li>
    </ul>
    <div className="price-upgrade">
      <p className="price-upgrade-title">¿Ya tienes el Plan Intermedio? Mejora al Completo pagando solo la diferencia</p>
      <div className="price-upgrade-steps" aria-label="Ejemplo de la mejora">
        <span>Plan Intermedio<br /><strong>{cop(PRICES.intermedio)}</strong></span>
        <ArrowRight aria-hidden="true" />
        <span>Mejora<br /><strong>+ {cop(UPGRADE_PRICE)}</strong></span>
        <ArrowRight aria-hidden="true" />
        <span>Plan Completo<br /><strong>{cop(PRICES.completo)} en total</strong></span>
      </div>
      <p className="price-upgrade-note">La mejora es para el mismo perfil y aparece sola en el simulacro de ese perfil.</p>
    </div>
  </div>;
}
