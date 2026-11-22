import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, XCircle } from "lucide-react";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { checkCertificate } from "@/lib/certificate.functions";
import { CERT_BANK_NAMES } from "@/lib/certificate";
import { LEVEL_NAMES } from "@/lib/game-engine";

const page = pages["/verificar"];
export const Route = createFileRoute("/verificar")({
  head: () => pageHead(page.title, page.description),
  validateSearch: (s: Record<string, unknown>) => ({ t: typeof s["t"] === "string" ? (s["t"] as string).slice(0, 2000) : "" }),
  component: Verify,
});

type Result = Awaited<ReturnType<typeof checkCertificate>>;

function Verify() {
  const { t } = Route.useSearch();
  const check = useServerFn(checkCertificate);
  const [r, setR] = useState<Result | null>(null);
  useEffect(() => { if (t) void check({ data: { t } }).then(setR).catch(() => setR({ valid: false })); }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return <ModulePage path="/verificar" showItems={false} tight>
    {!t && <p>Escanea el código QR de una constancia de EDUCALEX para comprobar que es auténtica.</p>}
    {t && !r && <p>Verificando la constancia…</p>}
    {r && r.valid && <div className="verify-card verify-ok" role="status">
      <h2><CheckCircle2 aria-hidden="true" /> Constancia auténtica</h2>
      <dl>
        <dt>Participante</dt><dd>{r.payload.n}</dd>
        <dt>Práctica</dt><dd>{CERT_BANK_NAMES[r.payload.p]}</dd>
        <dt>Niveles superados</dt><dd><ul>{r.payload.l.map(l => <li key={l.n}>{LEVEL_NAMES[l.n - 1]} · mejor resultado {l.b} %</li>)}</ul></dd>
        <dt>Expedida</dt><dd>{new Date(`${r.payload.d}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })}</dd>
        <dt>Código</dt><dd>{r.code}</dd>
      </dl>
      <p className="section-description" style={{ marginTop: 14 }}>Si los datos impresos en la constancia no coinciden con estos, la constancia fue alterada. Es una constancia de participación en prácticas no oficiales; no acredita títulos ni competencias ante la CNSC, el MEN o el ICFES.</p>
    </div>}
    {r && !r.valid && <div className="verify-card verify-bad" role="alert">
      <h2><XCircle aria-hidden="true" /> No pudimos verificar esta constancia</h2>
      <p>El código no corresponde a una constancia expedida por EDUCALEX o sus datos fueron modificados. Si crees que es un error, escríbenos.</p>
    </div>}
  </ModulePage>;
}
