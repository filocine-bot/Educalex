import { createFileRoute } from "@tanstack/react-router";
import { GuidedTour } from "@/components/guided-tour";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/guia-de-uso"];
export const Route = createFileRoute("/guia-de-uso")({ head: () => pageHead(page.title, page.description), component: Guide });

function Guide() {
  return <ModulePage path="/guia-de-uso" showItems={false} tight>
    <GuidedTour />
    <p className="competency-sources">¿Problemas para entrar o con un pago? Escríbenos por <a href="https://wa.me/573018747379">WhatsApp</a> o a educalexcolombia@gmail.com con el correo que usaste y, si pagaste, la referencia de Wompi.</p>
    <p className="competency-sources">EDUCALEX es una plataforma de preparación con material original y fuentes oficiales enlazadas. No reemplaza las convocatorias ni los textos oficiales de la CNSC y del MEN.</p>
  </ModulePage>;
}
