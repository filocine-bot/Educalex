import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ModulePage } from "@/components/module-page";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { simulacrosFor } from "@/lib/profile-navigation";
import { useMyEducationalProfile } from "@/lib/use-my-profile";

const page = pages["/simulacros"];
export const Route = createFileRoute("/simulacros/")({ head: () => pageHead(page.title, page.description), component: SimulacrosIndex });

function SimulacrosIndex() {
  const { profile, label } = useMyEducationalProfile();
  const [showAll, setShowAll] = useState(false);
  const mine = simulacrosFor(profile);
  const filtering = profile !== null && !showAll;
  const note = profile && <p className="profile-filter-note" role="status">
    {filtering ? <>Ves {mine.length === 1 ? "el simulacro" : "los simulacros"} de tu perfil: <strong>{label}</strong>. Puedes cambiar tu perfil en el selector de la barra azul.</> : <>Estás viendo los simulacros de todos los perfiles.</>}
    {" "}<Button variant="link" className="px-1" onClick={() => setShowAll(v => !v)}>{filtering ? "Ver todos los perfiles" : "Ver solo mi perfil"}</Button>
  </p>;
  return <ModulePage path="/simulacros" showItems={false} childNote={note} childFilter={c => !filtering || mine.some(m => c === `/simulacros/${m}`)}>
    <p>Cuatro prácticas de 40 preguntas originales, con modo juego por niveles y simulacro completo con tiempo. {profile ? "Abajo encuentras la de tu perfil." : "Elige tu perfil."}</p>
  </ModulePage>;
}
