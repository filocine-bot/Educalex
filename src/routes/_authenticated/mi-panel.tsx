import {createFileRoute} from '@tanstack/react-router';
import {ModulePage} from '@/components/module-page';
import {ProfileDashboard} from '@/components/profile-dashboard';
import {pageHead} from '@/lib/educalex-content';
export const Route=createFileRoute('/_authenticated/mi-panel')({head:()=>pageHead('Mi panel de preparación','Ruta de estudio personalizada según tu perfil educativo en EDUCALEX.'),component:()=> <ModulePage path="/mi-panel" showItems={false}><ProfileDashboard/></ModulePage>});