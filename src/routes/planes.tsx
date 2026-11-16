import { createFileRoute } from '@tanstack/react-router';
import { ModulePage } from '@/components/module-page';
import { PreparationPlans } from '@/components/preparation-plans';
import { pageHead } from '@/lib/educalex-content';
import { pages } from '@/lib/educalex-sitemap';
const page = pages['/planes'];
export const Route = createFileRoute('/planes')({ head: () => pageHead(page.title, page.description), component: () => <ModulePage path="/planes" showItems={false}><PreparationPlans/></ModulePage> });