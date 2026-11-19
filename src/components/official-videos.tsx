import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, FileText, Hand, PlayCircle } from "lucide-react";
import { themesFor, videoThemes, type OfficialVideo, type VideoTheme } from "@/lib/official-videos";

export const VIDEO_NOTE = "Videos públicos del canal oficial del Ministerio de Educación Nacional, mostrados con su reproductor y sin modificaciones; los derechos pertenecen a sus autores. EDUCALEX no los descarga ni los aloja. El video se carga solo cuando pulsas «Reproducir».";

export function VideoCard({ v }: { v: OfficialVideo }) {
  const [play, setPlay] = useState(false);
  return <figure className="official-video">
    <div className="official-video-frame">
      {play
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&cc_load_policy=1&hl=es`} title={`${v.title} (video del ${v.author})`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        : <button type="button" className="official-video-poster" onClick={() => setPlay(true)} aria-label={`Reproducir el video «${v.title}»`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span><PlayCircle aria-hidden="true" /> Reproducir</span>
          </button>}
    </div>
    <figcaption>
      <strong>{v.title}</strong>
      {v.lsc && <span className="official-video-lsc"><Hand aria-hidden="true" /> En Lengua de Señas Colombiana</span>}
      <small>Video: {v.author} · {v.date}</small>
      <span className="official-video-links">
        <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> Ver en el canal oficial</a>
        {v.transcript && <a href={v.transcript} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" /> Transcripción del MEN</a>}
        {!v.transcript && v.page && <a href={v.page} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" /> Página del MEN</a>}
      </span>
    </figcaption>
  </figure>;
}

function ThemeBlock({ t, level, showCourse }: { t: VideoTheme; level: "h2" | "h3"; showCourse: boolean }) {
  const H = level;
  return <section id={t.id} aria-labelledby={`${t.id}-title`} className="video-theme">
    <H id={`${t.id}-title`}>{t.title}</H>
    <p className="official-videos-note">{t.description}{showCourse && t.course && <> · <Link to={t.course as "/"}>Ir al módulo relacionado</Link></>}</p>
    <div className="official-video-grid">{t.videos.map(v => <VideoCard key={v.id} v={v} />)}</div>
    {t.links && <ul className="video-theme-links">{t.links.map(l => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> {l.label}</a></li>)}</ul>}
  </section>;
}

/** Videos de apoyo dentro de una página de curso o módulo. */
export function OfficialVideos({ path }: { path: string }) {
  const themes = themesFor(path);
  if (!themes.length) return null;
  return <section className="official-videos" aria-labelledby="official-videos-title">
    <h2 id="official-videos-title">Videos de apoyo del Ministerio de Educación</h2>
    <p className="official-videos-note">{VIDEO_NOTE} <Link to="/biblioteca/videos">Ver toda la videoteca por temáticas</Link>.</p>
    {themes.map(t => <ThemeBlock key={t.id} t={t} level="h3" showCourse={false} />)}
  </section>;
}

/** Videoteca general por temáticas (acceso libre). */
export function VideoLibrary() {
  const total = videoThemes.reduce((n, t) => n + t.videos.length, 0);
  return <div className="official-videos">
    <p className="official-videos-note">{total} videos oficiales en {videoThemes.length} temáticas. {VIDEO_NOTE}</p>
    <nav aria-label="Temáticas de la videoteca" className="video-theme-index">
      {videoThemes.map(t => <a key={t.id} href={`#${t.id}`}>{t.title} ({t.videos.length})</a>)}
    </nav>
    {videoThemes.map(t => <ThemeBlock key={t.id} t={t} level="h2" showCourse />)}
    <p className="official-videos-note">Próximamente: Guía 34 y PMI, Estatuto Docente y concurso CNSC, una vez verificados en canales oficiales.</p>
  </div>;
}
