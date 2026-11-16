import { Link } from '@tanstack/react-router';
import { ArrowRight, Library } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import type { AcademicModule, PagePath } from '@/lib/educalex-sitemap';

export function AcademicRouteModules({ modules }: { modules: AcademicModule[] }) {
  return <>
    <Link to="/biblioteca" className="academic-library-link"><Library aria-hidden="true" />Consultar normativa y convocatorias en Biblioteca General<ArrowRight aria-hidden="true" /></Link>
    <div className="academic-modules">
      <h2>Módulos de preparación</h2>
      <Accordion type="single" collapsible>
        {modules.map((module, index) => <AccordionItem key={module.title} value={`module-${index}`}>
          <AccordionTrigger className="academic-module-trigger"><span className="academic-module-number">{String(index + 1).padStart(2, '0')}</span><span className="academic-module-title">{module.title}</span></AccordionTrigger>
          <AccordionContent className="academic-module-content">
            <p><strong>Objetivo:</strong> {module.objective}</p>
            <p>{module.summary}</p>
            {module.pending && <p className="academic-pending">{module.pending}</p>}
            <ul className="academic-module-links">{module.links.map(link => <li key={link.to}><Link to={link.to as PagePath}>{link.label}<ArrowRight aria-hidden="true" /></Link></li>)}</ul>
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  </>;
}