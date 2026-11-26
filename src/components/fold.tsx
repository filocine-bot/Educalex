import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Sección plegable: se abre al tocar el título, para no alargar la página. */
export function Fold({ title, children }: { title: string; children: ReactNode }) {
  return <details className="fold">
    <summary><span>{title}</span><ChevronDown aria-hidden="true" /></summary>
    <div className="fold-body">{children}</div>
  </details>;
}
