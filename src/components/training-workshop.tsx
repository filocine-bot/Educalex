import { useState } from "react";
import { ClipboardCheck, Copy, Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serializeWorkshop, type TrainingCourse } from "@/lib/training-courses";

export function TrainingWorkshop({ workshop }: { workshop: TrainingCourse["workshop"] }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [status, setStatus] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(serializeWorkshop(workshop.title, workshop.fields, values));
      setStatus("Taller copiado. La copia queda bajo tu responsabilidad y no se guarda en EDUCALEX.");
    } catch {
      setStatus("No fue posible copiar. Puedes seleccionar el texto de los campos o imprimir una copia.");
    }
  }
  return <section className="course-section training-workshop" aria-labelledby="training-workshop-title">
    <div className="course-section-heading"><div><span className="course-kicker">PRÁCTICA ORIGINAL</span><h2 id="training-workshop-title">{workshop.title}</h2></div></div>
    <p className="course-lead">{workshop.scenario}</p>
    <div className="mod-notice"><p>Los datos no se guardan ni se envían. Se pierden al recargar o salir de este curso. Solo utiliza situaciones completamente inventadas, sin información de personas reales. Material de autoestudio, sin certificación oficial.</p></div>
    <div className="pmi-toolbar no-print">
      <Button variant="outline" onClick={() => { setValues(Object.fromEntries(workshop.fields.map(f => [f.key, f.example]))); setStatus("Ejemplo completamente ficticio cargado para editar."); setConfirmClear(false); }}><ClipboardCheck /> Cargar ejemplo ficticio</Button>
      <Button variant="ghost" onClick={() => setConfirmClear(true)}><RotateCcw /> Vaciar taller</Button>
    </div>
    {confirmClear && <div className="training-clear no-print" role="group" aria-label="Confirmar vaciado"><p>¿Vaciar todos los campos? No se puede recuperar el texto.</p><Button variant="outline" onClick={() => setConfirmClear(false)}>Cancelar</Button><Button variant="destructive" onClick={() => { setValues({}); setChecks({}); setConfirmClear(false); setStatus("Taller vacío."); }}>Confirmar vaciado</Button></div>}
    <div className="training-fields pmi-grid">{workshop.fields.map(field => <label className="pmi-field" key={field.key}><span>{field.label}</span><small>{field.hint}</small><textarea aria-label={field.label} rows={4} value={values[field.key] ?? ""} onChange={event => { setValues(current => ({ ...current, [field.key]: event.target.value })); setStatus(""); }} /></label>)}</div>
    <fieldset className="training-review no-print"><legend>Revisión personal — sin calificación</legend>{workshop.review.map((item, index) => <label key={item}><input type="checkbox" checked={checks[index] ?? false} onChange={event => setChecks(current => ({ ...current, [index]: event.target.checked }))} /><span>{item}</span></label>)}</fieldset>
    <div className="pmi-toolbar no-print"><Button variant="navy" onClick={copy}><Copy /> Copiar taller</Button><Button variant="hero" onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</Button></div>
    <p aria-live="polite" className="pmi-status no-print">{status}</p>
    <div className="training-print"><h2>{workshop.title}</h2><p>EDUCALEX · Ejercicio ficticio de autoestudio · No es un formato oficial ni una certificación.</p><p>{workshop.scenario}</p>{workshop.fields.map(field => <div key={field.key}><h3>{field.label}</h3><p>{values[field.key]?.trim() || "Sin diligenciar"}</p></div>)}</div>
  </section>;
}
