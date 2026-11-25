import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getProduct } from "@/lib/payments";
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
  const [state, setState] = useState<{ status: string; message?: string; needsLogin?: boolean; guestLogin?: boolean; product?: string | null } | null>(null);
  const [started, setStarted] = useState(false);
  const [tries, setTries] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !id || started) return;
    setStarted(true);
    const fail = (e: unknown) => setState({ status: "ERROR", message: (e as Error).message });
    if (user) { confirm({ data: { id } }).then(r => setState({ status: r.status, product: r.product ?? null })).catch(fail); return; }
    // Sin sesión: pago hecho solo con el correo. Si la cuenta nació con este pago, se entra sin contraseña.
    confirmGuest({ data: { id } }).then(async r => {
      const product = "product" in r ? (r.product as string | null) : null;
      if ("tokenHash" in r && r.tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: r.tokenHash, type: "magiclink" });
        setState(error ? { status: "APPROVED", needsLogin: true, product } : { status: "APPROVED", guestLogin: true, product });
      } else setState({ status: r.status, needsLogin: "needsLogin" in r && r.needsLogin, product });
    }).catch(fail);
  }, [id, user, loading, started, confirm, confirmGuest]);

  // Pago en proceso (PSE, Nequi): se vuelve a consultar cada 6 segundos durante unos 3 minutos.
  useEffect(() => {
    if (state?.status !== "PENDING" || tries >= 30) return;
    const t = setTimeout(() => { setTries(n => n + 1); setStarted(false); setState(null); }, 6000);
    return () => clearTimeout(t);
  }, [state?.status, tries]);

  const profile = state?.product ? getProduct(state.product)?.profiles[0] : undefined;
  const simPath = profile ? `/simulacros/${profile}` : volver;
  const canPlay = state?.status === "APPROVED" && !state.needsLogin && (!!user || state.guestLogin);

  // Con el acceso activo y la sesión abierta, se lleva a la persona directo a su simulacro.
  useEffect(() => {
    if (!canPlay) return;
    const t = setTimeout(() => { void navigate({ to: simPath }); }, 5000);
    return () => clearTimeout(t);
  }, [canPlay, simPath, navigate]);

  const view = !id ? { icon: <XCircle />, title: "No recibimos datos del pago", text: "Si pagaste, escríbenos a educalexcolombia@gmail.com con el comprobante." }
    : !state ? { icon: <Clock />, title: "Confirmando tu pago…", text: "Esto toma unos segundos." }
    : state.status === "APPROVED" && state.needsLogin ? { icon: <CheckCircle2 />, title: "¡Pago aprobado!", text: "Tu acceso quedó activo en la cuenta de ese correo. Ve a «Ingresar», escribe ese correo y te enviaremos un enlace para entrar." }
    : state.status === "APPROVED" ? { icon: <CheckCircle2 />, title: "¡Pago aprobado! Tu simulacro está listo", text: "Tu acceso ya está activo y ya ingresaste a EDUCALEX. En unos segundos te llevamos a tu simulacro." }
    : state.status === "PENDING" ? { icon: <Clock />, title: "Pago en proceso", text: tries >= 30 ? "Wompi todavía no confirma tu pago. Cuando se apruebe, te llegará un correo con el enlace para entrar a tu simulacro." : "Wompi está confirmando tu pago (con PSE o Nequi puede tardar unos minutos). No cierres esta página: se actualiza sola." }
    : { icon: <XCircle />, title: "El pago no se completó", text: state.message || "La transacción fue rechazada o anulada. No se hizo ningún cobro aprobado; puedes intentarlo de nuevo." };

  return <section className="section site-container pay-result" aria-live="polite">
    <div className={`pay-result-card ${state?.status === "APPROVED" ? "ok" : ""}`}>
      {view.icon}
      <h1>{view.title}</h1>
      <p>{view.text}</p>
      {id && <p className="section-description">Referencia de la transacción en Wompi: {id}</p>}
      {canPlay && <Link to={simPath} className="h2-btn h2-btn-gold pay-start">Iniciar mi simulacro <ArrowRight aria-hidden="true" /></Link>}
      {state?.status === "APPROVED" && state.needsLogin && <Link to="/ingresar" className="h2-btn h2-btn-gold pay-start">Entrar con mi correo <ArrowRight aria-hidden="true" /></Link>}
      {state?.status === "APPROVED" && <p className="guest-pass-ok">También te enviamos un correo con el enlace de acceso. Para volver otro día, ve a «Ingresar», escribe el correo con el que pagaste y te llegará un enlace o código. No necesitas contraseña.</p>}
      <p className="game-links">{!canPlay && <Link to={simPath}>Volver al simulacro</Link>}<Link to="/contacto">Contacto</Link></p>
    </div>
  </section>;
}
