import { useState } from "react";
import { Download, QrCode, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const URL = "https://www.educalex.co";
const TEXT = "Prepárate para el concurso docente con EDUCALEX: normas explicadas, simulacros tipo ICFES y asistente con IA. Empieza gratis:";

/** Código QR de la página para compartirla sin escribir la dirección. */
export function ShareQr() {
  const [copied, setCopied] = useState(false);
  async function share() {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav?.share) { try { await nav.share({ title: "EDUCALEX", text: TEXT, url: URL }); return; } catch { /* la persona canceló */ } }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${TEXT} ${URL}`)}`, "_blank", "noopener");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(URL); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* sin portapapeles */ }
  }
  return <section className="site-container share-qr" aria-labelledby="share-qr-title">
    <img src="/qr-educalex.svg" width={220} height={220} alt="Código QR que abre www.educalex.co" className="share-qr-img" />
    <div>
      <p className="hx-kicker"><QrCode aria-hidden="true" /> Comparte EDUCALEX</p>
      <h2 id="share-qr-title">Escanea y abre la página desde cualquier celular</h2>
      <p>Muéstrale este código a un colega o imprímelo en una cartelera: con la cámara del celular entra directo a <strong>www.educalex.co</strong>, sin escribir la dirección.</p>
      <div className="share-qr-actions">
        <Button variant="hero" onClick={share}><Share2 aria-hidden="true" /> Compartir</Button>
        <Button variant="outline" asChild><a href="/qr-educalex.png" download="qr-educalex.png"><Download aria-hidden="true" /> Descargar el QR</a></Button>
        <Button variant="ghost" onClick={copy}>{copied ? "¡Enlace copiado!" : "Copiar enlace"}</Button>
      </div>
    </div>
  </section>;
}
