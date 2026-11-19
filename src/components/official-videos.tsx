import { useState } from "react";
import { ExternalLink, FileText, Hand, PlayCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { videosFor, videoThemes, type OfficialVideo } from "@/lib/official-videos";
import type { TrainingPath } from "@/lib/training-courses";

export function VideoCard({ v }: { v: OfficialVideo }) {
  const [play, setPlay] = useState(false);
  return <figure className="official-video">
    <div className="official-video-frame">
      {play
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&cc_load_policy=1&hl=es`} title={`${v.title} (video del ${v.author})`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
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
        <a href={v.transcript} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" /> Transcripción del MEN</a>
      </span>
    </figcaption>
  </figure>;
}

export function OfficialVideos({ path }: { path: TrainingPath }) {
  const videos = videosFor(path);
  if (!videos.length) return null;
  const general = videos.filter(v => !v.lsc), lsc = videos.filter(v => v.lsc);
  return <section className="official-videos" aria-labelledby="official-videos-title">
    <h2 id="official-videos-title">Videos de apoyo del Ministerio de Educación</h2>
    <p className="official-videos-note">{VIDEO_NOTE}</p>
    {general.length > 0 && <div className="official-video-grid">{general.map(v => <VideoCard key={v.id} v={v} />)}</div>}
    {lsc.length > 0 && <>
      <h3>En Lengua de Señas Colombiana (INSOR)</h3>
      <div className="official-video-grid">{lsc.map(v => <VideoCard key={v.id} v={v} />)}</div>
    </>}
  </section>;
}

export const VIDEO_NOTE = "Videos públicos del canal oficial del Ministerio de Educación Nacional, mostrados con su reproductor y sin modificaciones; los derechos pertenecen a sus autores. EDUCALEX no los descarga ni los aloja. El video se carga solo cuando pulsas «Reproducir».";

export function VideoLibrary() {
  return <div className="official-videos">
    <p className="official-videos-note">{VIDEO_NOTE}</p>
    <nav aria-label="Temáticas de la videoteca" className="video-theme-index">
      {videoThemes.map(t => <a key={t.id} href={`#${t.id}`}>{t.title} ({t.videos.length})</a>)}
    </nav>
    {videoThemes.map(t => <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="video-theme">
      <h2 id={`${t.id}-title`}>{t.title}</h2>
      <p className="official-videos-note">{t.description}{t.course && <> · <Link to={t.course}>Ir al curso relacionado</Link></>}</p>
      <div className="official-video-grid">{t.videos.map(v => <VideoCard key={v.id} v={v} />)}</div>
    </section>)}
    <p className="official-videos-note">Próximamente: videos sobre evaluación (Decreto 1290), Guía 34, Estatuto Docente y concurso CNSC, una vez verificados en canales oficiales.</p>
  </div>;
}
