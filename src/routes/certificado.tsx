import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { useGameProgress } from "@/lib/game-progress";
import { CERT_BANK_NAMES, certificateCode, isGameBankKey, passedLevels } from "@/lib/certificate";
import { useAccount } from "@/components/account-session";
import logo from "@/assets/educalex-logo-horizontal.webp";
import firma from "@/assets/firma-enadis.png";

const page = pages["/certificado"];
export const Route = createFileRoute("/certificado")({
  head: () => pageHead(page.title, page.description),
  validateSearch: (s: Record<string, unknown>) => ({ perfil: isGameBankKey(s["perfil"]) ? s["perfil"] : "ingreso-docente" as const }),
  component: Certificate,
});

function Certificate() {
  const { perfil } = Route.useSearch();
  const { progress, ready } = useGameProgress();
  const { user } = useAccount();
  const [name, setName] = useState("");
  useEffect(() => { const n = (user?.user_metadata?.["display_name"] as string | undefined) ?? ""; if (n && !name) setName(n); }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
  const levels = passedLevels(progress[perfil]);
  const today = new Date();
  const date = today.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  const code = certificateCode(name, perfil, levels.map(l => l.number), today.toISOString().slice(0, 10));
  const back = perfil === "nucleo-comun" ? "/simulacros" : (`/simulacros/${perfil}` as const);

  if (!ready) return <section className="section site-container"><p>Cargando tu progreso…</p></section>;
  if (levels.length === 0) return <section className="section site-container">
    <h1 className="mod-h2">Constancia de participación</h1>
    <p>Para generar la constancia de <strong>{CERT_BANK_NAMES[perfil]}</strong> debes superar al menos el nivel Básico del modo juego (70 % o más).</p>
    <Button asChild variant="navy"><Link to={back}>Ir a practicar</Link></Button>
  </section>;

  return <section className="section site-container certificate-page">
    <div className="no-print certificate-tools">
      <Button asChild variant="ghost"><Link to={back}><ArrowLeft aria-hidden="true" /> Volver al simulacro</Link></Button>
      <label className="certificate-name-input">Nombre completo para la constancia
        <input value={name} onChange={e => setName(e.target.value)} maxLength={90} placeholder="Escribe tu nombre como quieres que aparezca" />
      </label>
      <Button variant="navy" disabled={name.trim().length < 5} onClick={() => window.print()}><Download aria-hidden="true" /> Descargar en PDF</Button>
      <p className="section-description">En la ventana de impresión elige <strong>«Guardar como PDF»</strong> y orientación <strong>horizontal</strong>.</p>
    </div>
    <article className="certificate" aria-label="Constancia de participación">
      <img src={logo} alt="EDUCALEX – Academia Inteligente de Educación" className="certificate-logo" width={1104} height={239} />
      <p className="certificate-kicker">Constancia de participación</p>
      <p>EDUCALEX hace constar que</p>
      <h1 className="certificate-name">{name.trim() || "Nombre del participante"}</h1>
      <p>participó en la práctica de preparación <strong>{CERT_BANK_NAMES[perfil]}</strong> y superó los siguientes niveles del modo juego:</p>
      <ul className="certificate-levels">{levels.map(l => <li key={l.number}><Award aria-hidden="true" /> {l.name} · mejor resultado {l.best} %</li>)}</ul>
      <p className="certificate-date">Expedida el {date}</p>
      <div className="certificate-footer">
        <div className="certificate-signer"><img src={firma} alt="Firma de la Dra. Enadis Ester Vargas Hernández" width={900} height={333} className="certificate-signature" /><span className="certificate-sign">Dra. Enadis Ester Vargas Hernández</span><small>Directora académica · EDUCALEX</small></div>
        <div><span className="certificate-code">{code}</span><small>Código de referencia</small></div>
      </div>
      <p className="certificate-note">Constancia de participación en prácticas originales no oficiales. No es un certificado académico ni acredita horas, títulos o competencias ante la CNSC, el MEN, el ICFES o las entidades territoriales.</p>
    </article>
  </section>;
}
