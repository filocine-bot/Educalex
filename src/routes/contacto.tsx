import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { LEGAL_OWNER } from "@/lib/legal-content";

const page = pages["/contacto"];
const digits = LEGAL_OWNER.phone.replace(/\D/g, "");

function Contacto() {
  return <div className="contact-channels">
    <ul>
      <li><Mail aria-hidden="true" /> <span><strong>Correo:</strong> <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a></span></li>
      <li><MessageCircle aria-hidden="true" /> <span><strong>WhatsApp:</strong> <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer">{LEGAL_OWNER.phone}</a></span></li>
      <li><Phone aria-hidden="true" /> <span><strong>Teléfono:</strong> <a href={`tel:+${digits}`}>{LEGAL_OWNER.phone}</a></span></li>
    </ul>
    <p className="section-description">Para consultas o reclamos sobre tus datos personales, escribe al correo desde la dirección registrada en tu cuenta. Más información en la <Link to="/privacidad">política de tratamiento de datos</Link>.</p>
  </div>;
}

export const Route = createFileRoute("/contacto")({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/contacto"><Contacto /></ModulePage> });
