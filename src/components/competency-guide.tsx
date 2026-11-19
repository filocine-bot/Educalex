import { CheckCircle2, CircleDashed, Clock3, Info } from "lucide-react";
import { competencyGuides } from "@/lib/competency-guide";
import { simulationBank, type SimulationProfile } from "@/lib/simulation-bank";

const STATUS = {
  cubierta: { label: "Practicas aquí", icon: CheckCircle2 },
  parcial: { label: "Parcial", icon: CircleDashed },
  "en-preparacion": { label: "En preparación", icon: Clock3 },
} as const;

/** Pestaña «Competencias evaluadas»: qué mide la prueba real del perfil y qué cubre EDUCALEX. */
export function CompetencyGuide({ profile }: { profile: SimulationProfile }) {
  const guide = competencyGuides[profile];
  const counts = Object.entries(simulationBank[profile].questions.reduce<Record<string, number>>((acc, q) => ({ ...acc, [q.competency]: (acc[q.competency] ?? 0) + 1 }), {}));
  return <section className="competency-guide" aria-labelledby="competency-title">
    <h2 id="competency-title">Competencias que se evalúan</h2>
    <p className="competency-process">{guide.process}</p>
    {guide.blocks.map(block => <div key={block.name} className="competency-block">
      <h3>{block.name}</h3>
      <p className="competency-character">{block.character}</p>
      <div className="competency-grid">{block.areas.map(area => { const s = STATUS[area.status]; return <article key={area.name} className={`competency-card is-${area.status}`}>
        <span className="competency-status"><s.icon aria-hidden="true" /> {s.label}</span>
        <h4>{area.name}</h4>
        <p>{area.what}</p>
        <p className="competency-here"><strong>En EDUCALEX:</strong> {area.inEducalex}</p>
      </article>; })}</div>
    </div>)}
    <div className="competency-block"><h3>Temas de este simulacro</h3><ul className="competency-counts">{counts.map(([name, n]) => <li key={name}><span>{name}</span><strong>{n}</strong></li>)}</ul></div>
    <p className="competency-caution"><Info aria-hidden="true" /> {guide.caution}</p>
    <p className="competency-sources"><strong>Fuentes:</strong> {guide.sources.join(" · ")}</p>
  </section>;
}
