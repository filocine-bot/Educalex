import { useEffect, useState } from "react";
import { CalendarClock, ExternalLink } from "lucide-react";

// Inscripción SIMO de vacantes reservadas (Resolución 11673 de 2026, CNSC).
const SIMO_OPEN = Date.UTC(2026, 10, 23, 5), SIMO_CLOSE = Date.UTC(2027, 0, 16, 5);
function useSimoNotice() {
  const [text, setText] = useState("Inscripciones en SIMO del 23 de noviembre de 2026 al 15 de enero de 2027");
  useEffect(() => {
    const now = Date.now(), day = 86_400_000;
    if (now < SIMO_OPEN) { const n = Math.ceil((SIMO_OPEN - now) / day); setText(`Inscripciones en SIMO abren el 23 de noviembre · ${n === 1 ? "falta 1 día" : `faltan ${n} días`}`); }
    else if (now < SIMO_CLOSE) setText(`Inscripciones abiertas en SIMO hasta el 15 de enero de 2027 (quedan ${Math.ceil((SIMO_CLOSE - now) / day)} días). Población general: febrero de 2027, fecha preliminar`);
    else setText("Consulta en SIMO el estado de las inscripciones del concurso 2026");
  }, []);
  return text;
}

// Novedades verificadas en fuentes oficiales (CNSC y MEN). Actualizar cuando cambie el proceso.
const news = [
  { date: "19 nov. 2026", source: "CNSC", title: "La oferta definitiva sube a 31.211 vacantes", text: "El Acuerdo 325 del 19 de noviembre de 2026 modifica el Acuerdo 303 del 21 de octubre, a solicitud de Riohacha y Malambo. La oferta pasa de 31.163 a 31.211 vacantes. Consulta la OPEC de tu entidad en SIMO.", href: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" },
  { date: "6 nov. 2026", source: "CNSC", title: "Inscripciones para vacantes reservadas a personas con discapacidad", text: "Resolución 11673: 2.255 vacantes de los Procesos de Selección 2917 a 3006 de 2026. Inscripción gratuita en SIMO, con certificado de discapacidad, del 23 de noviembre de 2026 al 15 de enero de 2027. Las demás vacantes se abren después (febrero de 2027, fecha preliminar).", href: "https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" },
  { date: "Vigente", source: "Decreto 2038/2016", title: "Puntaje mínimo de la prueba eliminatoria", text: "La prueba de aptitudes y competencias básicas es la única eliminatoria: 60/100 para docentes y 70/100 para directivos docentes.", href: "https://normograma.icfes.gov.co/docs/pdf/decreto_2038_2016.pdf" },
] as const;

/** Novedades verificadas del concurso 2026 (antes en la portada; ahora en Concursos). */
export function ConcursoNews() {
  const simo = useSimoNotice();
  return <>
    <a className="hx-simo concurso-simo" href="https://www.cnsc.gov.co/convocatorias/docentes-y-directivos-docentes-2026" target="_blank" rel="noopener noreferrer"><CalendarClock aria-hidden="true" /><span><strong>Concurso docente 2026 · vacantes reservadas para personas con discapacidad.</strong> {simo}</span></a>
    <section className="hx-news concurso-news" aria-labelledby="hx-news-title">
      <div className="hx-news-head"><CalendarClock className="text-gold" /><div><h2 id="hx-news-title">Novedades verificadas del concurso 2026</h2><p>Actualizadas el 23 de noviembre de 2026. Confirma siempre en SIMO y en el micrositio de la CNSC.</p></div></div>
      <div className="hx-news-grid">{news.map(n => <a key={n.title} href={n.href} target="_blank" rel="noopener noreferrer" className="hx-news-item"><span className="hx-news-meta">{n.source} · {n.date}</span><strong>{n.title}</strong><span>{n.text}</span><span className="hx-news-link">Ver fuente oficial <ExternalLink className="size-3.5" /></span></a>)}</div>
    </section>
  </>;
}
