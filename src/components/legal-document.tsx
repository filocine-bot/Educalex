import type { LegalSection } from "@/lib/legal-content";
import { LEGAL_VERSION_LABEL, legalPending } from "@/lib/legal-content";

export function LegalDocument({ intro, sections }: { intro: string; sections: LegalSection[] }) {
  return (
    <article className="max-w-3xl space-y-6">
      <p className="text-sm text-muted-foreground">Vigente desde el {LEGAL_VERSION_LABEL}.</p>
      {legalPending && (
        <p role="note" className="mod-notice">Borrador en revisión: algunos datos de contacto están pendientes de confirmación.</p>
      )}
      <p>{intro}</p>
      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="mod-h2">{section.title}</h2>
          {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
          {section.items && (
            <ul className="list-disc pl-6 space-y-1">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {section.closing && <p>{section.closing}</p>}
        </section>
      ))}
    </article>
  );
}
