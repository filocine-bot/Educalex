import {createFileRoute} from '@tanstack/react-router';
import {AuthForm} from '@/components/auth-form';
import {pageHead} from '@/lib/educalex-content';
export const Route=createFileRoute('/auth')({head:()=>pageHead('Acceso gratuito','Ingresa para guardar tu progreso personal gratuito en EDUCALEX.'),component:()=> <AuthForm mode="login"/>});
