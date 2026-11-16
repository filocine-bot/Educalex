import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLibraryDoc } from "@/lib/educalex-sitemap";
import { trainingCourses, type TrainingPath } from "@/lib/training-courses";
import { UnitCompletion } from "./learning-account";
import { TrainingWorkshop } from "@/components/training-workshop";

export function TrainingCourseReader({ path }: { path: TrainingPath }) {
  const course = trainingCourses[path];
  const [active, setActive] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const unit = course.units[active];
  if (!unit) return null;
  function select(index: number) {
    setActive(index);
    requestAnimationFrame(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: "start", behavior: "instant" }); });
  }
  return <div className="course-content training-course">
    <section className="course-intro"><span className="course-kicker">AUTOESTUDIO ABIERTO · CINCO UNIDADES</span><h2>Propósito del curso</h2><p className="course-lead">{course.purpose}</p><div className="course-audience"><Users /><span><strong>Dirigido a:</strong> {course.audience}</span></div></section>
    <div className="training-layout">
      <nav className="training-index no-print" aria-label="Índice de unidades"><h2>Unidades</h2>{course.units.map((item, index) => <Button key={item.title} variant={active === index ? "navy" : "ghost"} aria-current={active === index ? "step" : undefined} onClick={() => select(index)}><span>{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span></Button>)}</nav>
      <article className="training-reading" aria-labelledby="training-unit-title">
        <span className="course-kicker">UNIDAD {active + 1} DE {course.units.length}</span>
        <h2 id="training-unit-title" tabIndex={-1} ref={heading}>{unit.title}</h2>
        <p className="training-objective"><strong>Objetivo:</strong> {unit.objective}</p>
        {unit.explanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <section className="training-example"><h3>Ejemplo colombiano completamente ficticio</h3><p>{unit.example}</p><small>No describe personas, instituciones o resultados reales ni representa a toda una comunidad.</small></section>
        <section className="course-application"><h3>Actividad de la unidad</h3><p>{unit.activity}</p></section>
        <section className="training-readings"><h3><BookOpen /> Lecturas relacionadas de biblioteca</h3>{unit.readings.map(reading => {
          const doc = getLibraryDoc(reading.docId);
          if (!doc) return null;
          return <div className="training-source" key={doc.id}><strong>{doc.title}</strong><p>{reading.focus}</p><div className="doc-actions-inline"><Button asChild variant="outline"><Link to={doc.shelf}>Ver en biblioteca</Link></Button>{doc.fuenteConsultada && doc.fuenteUrl ? <Button asChild variant="navy"><a href={doc.fuenteUrl} target="_blank" rel="noopener noreferrer"><ExternalLink /> Consultar fuente oficial</a></Button> : <span className="doc-source-pending">Fuente precisa pendiente de verificación · categoría de biblioteca</span>}</div>{doc.fuenteConsultada && <small>{doc.notas}</small>}</div>;
        })}</section>
        <UnitCompletion path={path} unit={active + 1} />
        <nav className="training-unit-nav no-print" aria-label="Navegación entre unidades"><Button variant="outline" disabled={active === 0} onClick={() => select(active - 1)}><ArrowLeft /> Anterior</Button><span>{active + 1} / {course.units.length}</span><Button variant="navy" disabled={active === course.units.length - 1} onClick={() => select(active + 1)}>Siguiente <ArrowRight /></Button></nav>
      </article>
    </div>
    <TrainingWorkshop workshop={course.workshop} />
  </div>;
}
