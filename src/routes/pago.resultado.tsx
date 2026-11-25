import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useAccount } from "@/components/account-session";
import { confirmGuestTransaction, confirmTransaction } from "@/lib/payments.functions";
import { supabase } from "@/integrations/supabase/client";
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
  const confirmGuest = useServerFn(confirmGuestTransaction);
  const [state, setState] = useState<{ status: string; message?: string; needsLogin?: boolean; guestLogin?: boolean } | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (loading || !id || started) return;
    setStarted(true);
    const fail = (e: unknown) => setState({ status: "ERROR", message: (e as Error).message });
    if (user) { confirm({ data: { id } }).then(r => setState({ status: r.status })).catch(fail); return; }
    // Sin sesión: pago hecho solo con el correo. Si la cuenta nació con este pago, se entra sin contraseña.
    confirmGuest({ data: { id } }).then(async r => {
      if ("tokenHash" in r && r.tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: r.tokenHash, type: "magiclink" });
        setState(error ? { status: "APPROVED", needsLogin: true } : { status: "APPROVED", guestLogin: true });
      } else setState({ status: r.status, needsLogin: "needsLogin" in r && r.needsLogin });
    }).catch(fail);
  }, [id, user, loading, started, confirm, confirmGuest]);

  const view = !id ? { icon: <XCircle />, title: "No recibimos datos del pago", text: "Si pagaste, escríbenos a educalexcolombia@gmail.com con el comprobante." }
    : !state ? { icon: <Clock />, title: "Confirmando tu pago…", text: "Esto toma unos segundos." }
    : state.status === "APPROVED" && state.needsLogin ? { icon: <CheckCircle2 />, title: "¡Pago aprobado!", text: "Tu acceso quedó activo en la cuenta de ese correo. Ve a «Ingresar», escribe ese correo y te enviaremos un enlace para entrar." }
    : state.status === "APPROVED" ? { icon: <CheckCircle2 />, title: "¡Pago aprobado!", text: "Tu acceso ya está activo y ya ingresaste a EDUCALEX. ¡Gracias por apoyar EDUCALEX!" }
    : state.status === "PENDING" ? { icon: <Clock />, title: "Pago en proceso", text: "Wompi aún está confirmando tu pago. Cuando se apruebe, el acceso se activará solo; vuelve en unos minutos." }
    : { icon: <XCircle />, title: "El pago no se completó", text: state.message || "La transacción fue rechazada o anulada. No se hizo ningún cobro aprobado; puedes intentarlo de nuevo." };

  return <section className="section site-container pay-result" aria-live="polite">
    <div className={`pay-result-card ${state?.status === "APPROVED" ? "ok" : ""}`}>
      {view.icon}
      <h1>{view.title}</h1>
      <p>{view.text}</p>
      {id && <p className="section-description">Referencia de la transacción en Wompi: {id}</p>}
      {state?.status === "APPROVED" && <p className="guest-pass-ok">Para volver a entrar otro día, ve a «Ingresar», escribe este mismo correo y te llegará un enlace de acceso. No necesitas contraseña.</p>}
      <p className="game-links"><Link to={volver}>{state?.status === "APPROVED" ? "Ir a mis simulacros" : "Volver a la práctica"}</Link>{!user && <Link to="/ingresar">Iniciar sesión</Link>}<Link to="/contacto">Contacto</Link></p>
    </div>
  </section>;
}
