import { useRef, useState } from "react";
import { Copy, Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionField = "area" | "hallazgo" | "evidencia" | "objetivo" | "meta" | "indicador" | "actividades" | "responsables" | "plazos" | "seguimiento";
type PmiAction = Record<ActionField, string> & { id: number };

const fields: { key: ActionField; label: string; hint: string }[] = [
  { key: "area", label: "Área de gestión", hint: "Directiva, académica, administrativa y financiera, o comunidad." },
  { key: "hallazgo", label: "Hallazgo priorizado", hint: "Describe la situación y su alcance, sin anticipar causas no comprobadas." },
  { key: "evidencia", label: "Evidencias y línea de base", hint: "Indica fuentes, datos disponibles, fecha y límites de la información." },
  { key: "objetivo", label: "Objetivo de mejoramiento", hint: "Formula el cambio que se espera respecto del hallazgo." },
  { key: "meta", label: "Meta", hint: "Precisa el resultado esperado, la cantidad o calidad y el horizonte de tiempo." },
  { key: "indicador", label: "Indicador y medio de verificación", hint: "Explica cómo se observará el avance y con qué evidencia." },
  { key: "actividades", label: "Actividades y recursos", hint: "Ordena acciones concretas y señala los recursos necesarios." },
  { key: "responsables", label: "Responsables y participantes", hint: "Define quién coordina, quién participa y qué corresponde a cada uno." },
  { key: "plazos", label: "Plazos", hint: "Incluye inicio, hitos y fecha prevista de cierre." },
  { key: "seguimiento", label: "Seguimiento y ajustes", hint: "Establece cuándo revisar, con qué evidencia y cómo se acordarán cambios." },
];

const emptyAction = (id: number): PmiAction => ({ id, area: "", hallazgo: "", evidencia: "", objetivo: "", meta: "", indicador: "", actividades: "", responsables: "", plazos: "", seguimiento: "" });

export function PmiWorkshop() {
  const [actions, setActions] = useState<PmiAction[]>([emptyAction(1)]);
  const [status, setStatus] = useState("");
  const nextId = useRef(2);

  function update(id: number, key: ActionField, value: string) {
    setActions(current => current.map(action => action.id === id ? { ...action, [key]: value } : action));
    setStatus("");
  }

  async function copyMatrix() {
    const text = [
      "MATRIZ PMI — TALLER EDUCALEX",
      "Herramienta pedagógica sin validez normativa ni condición de formato oficial.",
      ...actions.flatMap((action, index) => [
        `\nACCIÓN ${index + 1}`,
        ...fields.map(field => `${field.label}: ${action[field.key] || "Sin diligenciar"}`),
      ]),
    ].join("\n");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("Matriz copiada. Puedes pegarla en tu documento de trabajo.");
    } catch {
      setStatus("No fue posible copiar automáticamente. Usa la opción Imprimir para guardar una copia en PDF.");
    }
  }

  return <section className="course-section pmi-workshop" aria-labelledby="pmi-workshop-title">
    <div className="course-section-heading no-print"><div><span className="course-kicker">APLICACIÓN PRÁCTICA</span><h2 id="pmi-workshop-title">Taller de matriz PMI</h2></div><span className="course-tag">Editable en esta página</span></div>
    <p className="course-lead no-print">Diligencia una o varias acciones de mejoramiento. Los datos solo permanecen en esta página mientras la uses: no se guardan, no se envían y se perderán al recargar.</p>
    <div className="mod-notice no-print"><p><strong>Importante:</strong> esta plantilla es una herramienta pedagógica creada por EDUCALEX. No es un formato oficial ni tiene validez normativa por sí misma. Antes de adoptar un PMI, revisa las orientaciones y los procedimientos aplicables a tu institución.</p></div>
    <div className="pmi-print">
      <div className="pmi-print-title"><h2>Matriz de Plan de Mejoramiento Institucional</h2><p>Taller EDUCALEX · Plantilla pedagógica no oficial</p></div>
      {actions.map((action, index) => <article className="pmi-action" key={action.id}>
        <div className="pmi-action-heading"><h3>Acción de mejoramiento {index + 1}</h3>{actions.length > 1 && <Button type="button" variant="ghost" size="sm" className="no-print" onClick={() => setActions(current => current.filter(item => item.id !== action.id))}><Trash2 /> Eliminar</Button>}</div>
        <div className="pmi-grid">{fields.map(field => <label className="pmi-field" key={field.key}>
          <span>{field.label}</span><small className="no-print">{field.hint}</small>
          <textarea rows={field.key === "area" ? 2 : 3} value={action[field.key]} onChange={event => update(action.id, field.key, event.target.value)} aria-label={`${field.label}, acción ${index + 1}`} />
        </label>)}</div>
      </article>)}
    </div>
    <div className="pmi-toolbar no-print">
      <Button type="button" variant="outline" onClick={() => setActions(current => [...current, emptyAction(nextId.current++)])}><Plus /> Añadir otra acción</Button>
      <Button type="button" variant="navy" onClick={copyMatrix}><Copy /> Copiar matriz</Button>
      <Button type="button" variant="hero" onClick={() => window.print()}><Printer /> Imprimir o guardar en PDF</Button>
    </div>
    <p className="pmi-status no-print" aria-live="polite">{status}</p>
  </section>;
}
