import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useAccount } from "@/components/account-session";
import { confirmTransaction } from "@/lib/payments.functions";
import { pageHead } from "@/lib/educalex-content";

export const Route = createFileRoute("/pago/resultado")({
  head: () => pageHead("Resultado del pago", "Confirmación de tu pago en EDUCALEX."),
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s["id"] === "string" ? s["id"] : "", volver: typeof s["volver"] === "string" && /^\/[a-z0-9/-]{0,80}$/.test(s["volver"]) ? s["volver"] : "/simulacros" }),
  component: Resultado,
});

function Resultado() {
  const { id, volver } = Route.useSearch();
  const { user, loading } = useAccount();
  const confirm = useServerFn(confirmTransaction);
  const [state, setState] = useState<{ status: string; message?: string } | null>(null);

  useEffect(() => {
    if (loading || !user || !id) return;
    let alive = true;
    confirm({ data: { id } }).then(r => { if (alive) setState({ status: r.status }); }).catch(e => { if (alive) setState({ status: "ERROR", message: (e as Error).message }); });
    return () => { alive = false; };
  }, [id, user, loading, confirm]);

  const view = !id ? { icon: <XCircle />, title: "No recibimos datos del pago", text: "Si pagaste, escríbenos a educalexcolombia@gmail.com con el comprobante." }
    : !loading && !user ? { icon: <Clock />, title: "Inicia sesión para confirmar tu pago", text: "Ingresa con la misma cuenta con la que compraste." }
    : !state ? { icon: <Clock />, title: "Confirmando tu pago…", text: "Esto toma unos segundos." }
    : state.status === "APPROVED" ? { icon: <CheckCircle2 />, title: "¡Pago aprobado!", text: "Tu acceso premium ya está activo. ¡Gracias por apoyar EDUCALEX!" }
    : state.status === "PENDING" ? { icon: <Clock />, title: "Pago en proceso", text: "Wompi aún está confirmando tu pago. Cuando se apruebe, el acceso se activará solo; vuelve en unos minutos." }
    : { icon: <XCircle />, title: "El pago no se completó", text: state.message || "La transacción fue rechazada o anulada. No se hizo ningún cobro aprobado; puedes intentarlo de nuevo." };

  return <section className="section site-container pay-result" aria-live="polite">
    <div className={`pay-result-card ${state?.status === "APPROVED" ? "ok" : ""}`}>
      {view.icon}
      <h1>{view.title}</h1>
      <p>{view.text}</p>
      {id && <p className="section-description">Referencia de la transacción en Wompi: {id}</p>}
      <p className="game-links"><Link to={volver}>Volver a la práctica</Link>{!user && <Link to="/ingresar">Iniciar sesión</Link>}<Link to="/contacto">Contacto</Link></p>
    </div>
  </section>;
}
