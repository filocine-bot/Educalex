import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/module-page";
import { FaqList } from "@/components/faq-list";
import { pageHead } from "@/lib/educalex-content";
import { pages } from "@/lib/educalex-sitemap";
import { faqs } from "@/lib/faq";

const page = pages["/preguntas-frecuentes"];
const groups = [...new Set(faqs.map(f => f.group))];
const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () => ({ ...pageHead(page.title, page.description), scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] }),
  component: () => <ModulePage path="/preguntas-frecuentes" showItems={false} tight>
    {groups.map(g => <section key={g} className="faq-group" aria-labelledby={`faq-${g}`}>
      <h2 id={`faq-${g}`} className="mod-h2">{g}</h2>
      <FaqList items={faqs.filter(f => f.group === g)} />
    </section>)}
  </ModulePage>,
});
