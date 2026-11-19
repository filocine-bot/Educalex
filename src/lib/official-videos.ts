// Videos oficiales verificados (canal de YouTube @mineducacion del Ministerio de Educación Nacional).
// Inserción permitida comprobada con el servicio oEmbed de YouTube el 19 de noviembre de 2026.
// No se descargan ni se copian: se muestran con el reproductor oficial, con crédito y enlace a la transcripción del MEN.
import type { TrainingPath } from "@/lib/training-courses";

export type OfficialVideo = {
  id: string;
  title: string;
  date: string;
  author: string;
  transcript: string;
  lsc?: boolean;
};

const MEN = "Ministerio de Educación Nacional";
const MEN_TXT = "https://www.mineducacion.gov.co/1780/";

export const officialVideos = {
  "/formacion/inclusion-dua-piar": [
    { id: "ZbKDhdQMuy8", title: "La educación como herramienta para la inclusión", date: "28 de marzo de 2023", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_615.pdf` },
    { id: "8fziAUXlFA0", title: "La diversidad y la discapacidad como parte de la vida", date: "28 de marzo de 2023", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_618.pdf` },
    { id: "a3NZ7QfKwv4", title: "¿Cómo interactuar con una persona ciega?", date: "28 de marzo de 2023", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_616.pdf` },
    { id: "SJ8HkWCBTLA", title: "Inspirando desde la inclusión y la diversidad", date: "7 de marzo de 2023", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_597.pdf` },
    { id: "xvk6hqTsgb8", title: "Qué es la identidad educativa. El director del INSOR nos cuenta", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: `${MEN_TXT}articles-413462_txt_video_586.pdf`, lsc: true },
    { id: "4pjlju190JI", title: "¿Sabes qué es la cultura sorda y cuáles son sus características?", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: `${MEN_TXT}articles-413462_txt_video_587.pdf`, lsc: true },
    { id: "FWi9tfgSY7Y", title: "La lengua de señas vs. el español", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: `${MEN_TXT}articles-413462_txt_video_585.pdf`, lsc: true },
    { id: "7neOq1w4ZXE", title: "Aprende a saludar en lengua de señas", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: `${MEN_TXT}articles-413462_txt_video_588.pdf`, lsc: true },
  ],
  "/formacion/convivencia-escolar": [
    { id: "vwWMySEObIo", title: "Sistema de Información Unificado de Convivencia Escolar (SIUCE)", date: "13 de mayo de 2022", author: MEN, transcript: "https://www.mineducacion.gov.co/1780/articles-409228_txt_video_24.pdf" },
    { id: "_QLSs8dViVk", title: "Intervención del ministro de Educación sobre el Sistema Nacional de Convivencia Escolar", date: "22 de noviembre de 2022", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_657.pdf` },
    { id: "xi_sQBwm6-g", title: "Día contra el Acoso Escolar", date: "3 de mayo de 2023", author: MEN, transcript: `${MEN_TXT}articles-413462_txt_video_633.pdf` },
  ],
  "/formacion/educacion-rural": [
    { id: "4XDckyQSflQ", title: "Sistema Educativo Indígena Propio – SEIP: una educación para la vida", date: "14 de julio de 2025", author: MEN, transcript: `${MEN_TXT}articles-420357_txt_video_906.pdf` },
    { id: "etu0uecmcmE", title: "Día Internacional de la Lengua Materna y Día Nacional de las Lenguas Nativas", date: "21 de febrero de 2025", author: MEN, transcript: `${MEN_TXT}articles-420357_txt_video_936.pdf` },
  ],
} satisfies Partial<Record<TrainingPath, OfficialVideo[]>>;

export function videosFor(path: TrainingPath): OfficialVideo[] {
  return (officialVideos as Partial<Record<TrainingPath, OfficialVideo[]>>)[path] ?? [];
}

export type VideoTheme = { id: string; title: string; description: string; course?: TrainingPath; videos: OfficialVideo[] };

const inclusion = officialVideos["/formacion/inclusion-dua-piar"] as OfficialVideo[];

/** Videos agrupados por temática para la videoteca general (acceso libre). */
export const videoThemes: VideoTheme[] = [
  { id: "inclusion", title: "Educación inclusiva y discapacidad", description: "Inclusión, diversidad y atención a estudiantes con discapacidad (marco del Decreto 1421 de 2017).", course: "/formacion/inclusion-dua-piar", videos: inclusion.filter(v => !v.lsc) },
  { id: "lsc", title: "Lengua de Señas Colombiana y cultura sorda", description: "Serie «Educación para la vida» con el director del INSOR, en Lengua de Señas Colombiana.", course: "/formacion/inclusion-dua-piar", videos: inclusion.filter(v => v.lsc) },
  { id: "convivencia", title: "Convivencia escolar", description: "Sistema Nacional de Convivencia Escolar (Ley 1620 de 2013), SIUCE y prevención del acoso escolar.", course: "/formacion/convivencia-escolar", videos: officialVideos["/formacion/convivencia-escolar"] },
  { id: "etnoeducacion", title: "Etnoeducación y lenguas nativas", description: "Sistema Educativo Indígena Propio y diversidad lingüística del país.", course: "/formacion/educacion-rural", videos: officialVideos["/formacion/educacion-rural"] },
];
