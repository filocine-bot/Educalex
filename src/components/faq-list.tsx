import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faq";

export function FaqList({ items }: { items: Faq[] }) {
  return <div className="faq-list">{items.map(f => <details key={f.q} className="faq-item">
    <summary><span>{f.q}</span><ChevronDown aria-hidden="true" /></summary>
    <p>{f.a}</p>
  </details>)}</div>;
}
