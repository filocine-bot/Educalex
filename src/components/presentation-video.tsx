import { PRESENTATION_VIDEO_ID } from "@/lib/site-config";

/**
 * Espacio para el video de presentación, justo debajo de la portada.
 * No se muestra nada hasta que se configure PRESENTATION_VIDEO_ID en src/lib/site-config.ts.
 */
export function PresentationVideo() {
  if (!PRESENTATION_VIDEO_ID) return null;
  return <section className="site-container hx-video" aria-labelledby="hx-video-title">
    <h2 id="hx-video-title">Conoce EDUCALEX en un minuto</h2>
    <div className="hx-video-frame">
      <iframe src={`https://www.youtube-nocookie.com/embed/${PRESENTATION_VIDEO_ID}?rel=0`} title="Video de presentación de EDUCALEX" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  </section>;
}
