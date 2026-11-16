import {createFileRoute,Outlet} from '@tanstack/react-router';
import {checkAdmin} from '@/lib/learning.functions';
import {pageHead} from '@/lib/educalex-content';
export const Route=createFileRoute('/_authenticated/admin')({beforeLoad:async()=>({allowed:await checkAdmin()}),head:()=>pageHead('Administración protegida','Acceso exclusivo para administradores autorizados de EDUCALEX.'),component:AdminGate});
function AdminGate(){const {allowed}=Route.useRouteContext();return allowed?<Outlet/>:<section className="section site-container"><h1>Acceso restringido</h1><p>No tienes permisos administrativos.</p></section>;}
