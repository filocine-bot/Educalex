// Videos oficiales verificados del canal de YouTube @mineducacion (Ministerio de Educación Nacional).
// Inserción permitida comprobada con el servicio oEmbed de YouTube el 19 de noviembre de 2026.
// No se descargan ni se copian: se muestran con el reproductor oficial, con crédito y enlace a la ficha o transcripción del MEN.

export type OfficialVideo = {
  id: string;
  title: string;
  date: string;
  author: string;
  /** Transcripción publicada por el MEN (PDF). */
  transcript?: string;
  /** Página del MEN donde se publica el video, cuando no hay transcripción localizada. */
  page?: string;
  lsc?: boolean;
};

export type VideoTheme = {
  id: string;
  title: string;
  description: string;
  course?: string;
  links?: { label: string; url: string }[];
  videos: OfficialVideo[];
};

const MEN = "Ministerio de Educación Nacional";
const SERIE = `${MEN} · serie «Educación para la vida»`;
const T = (n: string) => `https://www.mineducacion.gov.co/1780/articles-${n}.pdf`;
const CAP2 = "https://www.mineducacion.gov.co/portal/micrositios-institucionales/Educacion-para-la-vida/414118:Capitulo-2-Las-emociones-y-el-pensamiento-critico";

/** Videoteca general por temáticas (acceso libre). */
export const videoThemes: VideoTheme[] = [
  { id: "inclusion", title: "Educación inclusiva y discapacidad", description: "Inclusión, diversidad y atención a estudiantes con discapacidad (marco del Decreto 1421 de 2017).", course: "/formacion/inclusion-dua-piar", videos: [
    { id: "ZbKDhdQMuy8", title: "La educación como herramienta para la inclusión", date: "28 de marzo de 2023", author: MEN, transcript: T("413462_txt_video_615") },
    { id: "8fziAUXlFA0", title: "La diversidad y la discapacidad como parte de la vida", date: "28 de marzo de 2023", author: MEN, transcript: T("413462_txt_video_618") },
    { id: "a3NZ7QfKwv4", title: "¿Cómo interactuar con una persona ciega?", date: "28 de marzo de 2023", author: MEN, transcript: T("413462_txt_video_616") },
    { id: "SJ8HkWCBTLA", title: "Inspirando desde la inclusión y la diversidad", date: "7 de marzo de 2023", author: MEN, transcript: T("413462_txt_video_597") },
  ] },
  { id: "lsc", title: "Lengua de Señas Colombiana y cultura sorda", description: "Serie «Educación para la vida» con el director del INSOR, en Lengua de Señas Colombiana.", course: "/formacion/inclusion-dua-piar", links: [{ label: "INSOR Educativo: más de 600 recursos en LSC (Colombia Aprende)", url: "https://colombiaaprende.edu.co/contenidos/plataforma/recursos-educativos-accesibles-para-comunidades-sordas" }], videos: [
    { id: "xvk6hqTsgb8", title: "Qué es la identidad educativa. El director del INSOR nos cuenta", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: T("413462_txt_video_586"), lsc: true },
    { id: "4pjlju190JI", title: "¿Sabes qué es la cultura sorda y cuáles son sus características?", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: T("413462_txt_video_587"), lsc: true },
    { id: "FWi9tfgSY7Y", title: "La lengua de señas vs. el español", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: T("413462_txt_video_585"), lsc: true },
    { id: "7neOq1w4ZXE", title: "Aprende a saludar en lengua de señas", date: "21 de febrero de 2023", author: `${MEN} e INSOR`, transcript: T("413462_txt_video_588"), lsc: true },
  ] },
  { id: "convivencia", title: "Convivencia escolar y Ruta de Atención Integral (Ley 1620 de 2013)", description: "Sistema Nacional de Convivencia Escolar, Ruta de Atención Integral (promoción, prevención, atención y seguimiento), SIUCE y prevención del acoso escolar.", course: "/formacion/convivencia-escolar", links: [
    { label: "Ruta de Atención Integral: infografía y video explicativo (Colombia Aprende)", url: "https://colombiaaprende.edu.co/recurso-coleccion/ruta-de-atencion-integral-para-la-convivencia-escolar" },
    { label: "Videos para la acción y el seguimiento: Ruta y SIUCE (Colombia Aprende)", url: "https://colombiaaprende.edu.co/recurso-coleccion/videos-para-la-accion-y-el-seguimiento" },
  ], videos: [
    { id: "vwWMySEObIo", title: "Sistema de Información Unificado de Convivencia Escolar (SIUCE)", date: "13 de mayo de 2022", author: MEN, transcript: T("409228_txt_video_24") },
    { id: "_QLSs8dViVk", title: "Intervención del ministro de Educación sobre el Sistema Nacional de Convivencia Escolar", date: "22 de noviembre de 2022", author: MEN, transcript: T("413462_txt_video_657") },
    { id: "xi_sQBwm6-g", title: "Día contra el Acoso Escolar", date: "3 de mayo de 2023", author: MEN, transcript: T("413462_txt_video_633") },
    { id: "DtDpeNbF_Yc", title: "Desde Piedecuesta una nueva generación aprende a vivir en paz", date: "9 de diciembre de 2025", author: MEN, transcript: T("420357_txt_video_992") },
  ] },
  { id: "socioemocional", title: "Educación socioemocional", description: "Emociones, aprendizaje y acompañamiento socioemocional en la escuela.", course: "/formacion/educacion-emocional", videos: [
    { id: "qsNCdrlHVpY", title: "Las emociones están en todo, en toda la vida humana y en la escuela", date: "14 de febrero de 2023", author: SERIE, transcript: T("413462_txt_video_584") },
    { id: "zR7J4DrC4nI", title: "Cómo las emociones modulan nuestras decisiones", date: "14 de febrero de 2023", author: SERIE, transcript: T("413462_recurso_580") },
    { id: "Pbc8wIj1PUI", title: "Ministra envía un mensaje a los docentes orientadores", date: "26 de febrero de 2024", author: MEN, transcript: T("413462_txt_video_756") },
  ] },
  { id: "evaluacion", title: "Evaluación de los aprendizajes", description: "Propósitos de la evaluación y lugar de las pruebas estandarizadas.", course: "/formacion/evaluacion-formativa", videos: [
    { id: "YgS0Gs9m-hU", title: "Para qué nos sirve evaluar y cuál es su propósito", date: "2023", author: SERIE, page: CAP2 },
    { id: "CtBKQRqmRuo", title: "Pruebas estandarizadas y los momentos de evaluación", date: "2023", author: SERIE, page: CAP2 },
  ] },
  { id: "integral", title: "Educación integral y centros de interés", description: "Formación integral, ampliación del tiempo escolar y centros de interés.", course: "/formacion/educacion-integral", videos: [
    { id: "yG90mPOCwWM", title: "Entramos a un «centro de interés»… y esto fue lo que pasó", date: "31 de marzo de 2026", author: MEN, transcript: T("427073_txt_video_1023") },
    { id: "qySPvZ6MANs", title: "La revolución de la educación integral en Barú", date: "24 de marzo de 2026", author: MEN, transcript: T("427073_txt_video_1022") },
    { id: "o_a7Ejyah8w", title: "La biblioteca de Olga Villa, un espacio donde nace la formación integral", date: "5 de noviembre de 2025", author: MEN, transcript: T("420357_txt_video_983") },
  ] },
  { id: "steam", title: "STEAM, ciencia e innovación", description: "Ciencia, tecnología, ingeniería, artes y matemáticas en proyectos escolares.", course: "/formacion/steam-robotica", videos: [
    { id: "PySxmADhMzI", title: "Presentación Olimpiadas STEM+", date: "10 de octubre de 2025", author: MEN, transcript: T("427073_txt_video_974") },
    { id: "lJoGIhcNlrI", title: "¿Cómo motivar a las niñas a descubrir el camino en las TIC y las áreas STEM?", date: "7 de marzo de 2023", author: MEN, transcript: T("413462_txt_video_594") },
    { id: "exxmd65aBbI", title: "De Macondo para el mundo: el proyecto estudiantil que convierte neblina en agua", date: "5 de diciembre de 2025", author: MEN, transcript: T("420357_txt_video_991") },
    { id: "fQmAmOipthg", title: "De un barrio de Villavicencio… ¡al cosmos! Estudiantes crean un planetario", date: "12 de mayo de 2025", author: MEN, transcript: T("420357_txt_video_885") },
  ] },
  { id: "rural", title: "Educación rural", description: "Educación inicial rural itinerante y acceso a la media en instituciones rurales.", course: "/formacion/educacion-rural", videos: [
    { id: "OLBuLSQxM8g", title: "La escuela viaja en moto, a pie y a caballo con la profe Erminda", date: "8 de julio de 2025", author: MEN, transcript: T("420357_txt_video_905") },
    { id: "ABrx7d2bvXo", title: "¡La escuela viaja al corazón del territorio! Educación que camina por nuestros niños", date: "4 de agosto de 2025", author: MEN, transcript: T("420357_txt_video_946") },
    { id: "hMxHpblVP1c", title: "Antes, 1.400 colegios en todo el país no llegaban hasta grado 11. Con SIMES eso está cambiando", date: "22 de noviembre de 2025", author: MEN, transcript: T("427073_txt_video_1017") },
  ] },
  { id: "etnoeducacion", title: "Etnoeducación y lenguas nativas", description: "Sistema Educativo Indígena Propio y diversidad lingüística del país.", course: "/formacion/educacion-rural", videos: [
    { id: "4XDckyQSflQ", title: "Sistema Educativo Indígena Propio – SEIP: una educación para la vida", date: "14 de julio de 2025", author: MEN, transcript: T("420357_txt_video_906") },
    { id: "etu0uecmcmE", title: "Día Internacional de la Lengua Materna y Día Nacional de las Lenguas Nativas", date: "21 de febrero de 2025", author: MEN, transcript: T("420357_txt_video_936") },
  ] },
];

/** Temáticas que se muestran dentro de una página de curso. */
export function themesFor(path: string): VideoTheme[] {
  return videoThemes.filter(t => t.course === path);
}
