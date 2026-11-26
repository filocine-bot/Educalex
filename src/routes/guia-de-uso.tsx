import { createFileRoute } from "@tanstack/react-router";
import { GuidedTour } from "@/components/guided-tour";
import { ModulePage } from "@/components/module-page";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";

const page = pages["/guia-de-uso"];
export const Route = createFileRoute("/guia-de-uso")({ head: () => pageHead(page.title, page.description), component: Guide });

function Guide() {
  return <ModulePage path="/guia-de-uso" showItems={false} tight>
    <div className="guide-video-wrap">
      <div className="guide-video-text">
        <h2>Mira el recorrido en un minuto</h2>
        <p>Toca «Prueba gratis», mira tu resultado y los temas a reforzar, conoce la estructura de la prueba y activa tu simulacro con un solo pago: el enlace te llega al correo.</p>
        <p className="text-sm">También puedes seguirlo paso a paso abajo.</p>
      </div>
      <video className="guide-video" controls preload="none" playsInline poster="/videos/educalex-como-usar.jpg" aria-label="Video: cómo usar EDUCALEX en 6 pasos">
        <source src="/videos/educalex-como-usar.mp4" type="video/mp4" />
        Tu navegador no puede reproducir el video. <a href="/videos/educalex-como-usar.mp4">Descárgalo aquí</a>.
      </video>
    </div>
    <GuidedTour />
    <p className="competency-sources">¿Problemas para entrar o con un pago? Escríbenos por <a href="https://wa.me/573018747379">WhatsApp</a> o a educalexcolombia@gmail.com con el correo que usaste y, si pagaste, la referencia de Wompi.</p>
    <p className="competency-sources">EDUCALEX es una plataforma de preparación con material original y fuentes oficiales enlazadas. No reemplaza las convocatorias ni los textos oficiales de la CNSC y del MEN.</p>
  </ModulePage>;
}
