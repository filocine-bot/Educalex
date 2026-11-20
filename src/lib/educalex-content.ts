export const pathways = [
  { title: "Ingreso a la carrera docente", description: "Da el primer paso hacia tu vocación. Prepárate para el concurso de mérito docente.", icon: "graduation" },
  { title: "Ascenso y reubicación salarial", description: "Fortalece tus competencias y avanza en tu desarrollo profesional.", icon: "trending" },
  { title: "Concurso para rector", description: "Potencia tu liderazgo y la gestión estratégica de tu institución.", icon: "building" },
  { title: "Concurso para coordinador", description: "Desarrolla habilidades para acompañar y liderar equipos educativos.", icon: "users" },
];
export const topics = ["Actualización docente", "Gestión institucional", "Inclusión educativa", "DUA y PIAR", "Educación rural", "Etnoeducación", "Convivencia escolar", "STEAM", "Inteligencia artificial", "Competencias directivas"];
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | EDUCALEX` }, { name: "description", content: description }, { property: "og:title", content: `${title} | EDUCALEX` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:image", content: "https://www.educalex.co/og-educalex.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { property: "og:image:alt", content: "EDUCALEX: prepárate para el concurso docente en Colombia" }, { property: "og:locale", content: "es_CO" }, { property: "og:site_name", content: "EDUCALEX" }, { name: "twitter:image", content: "https://www.educalex.co/og-educalex.jpg" }] };
}