import {createFileRoute} from '@tanstack/react-router';
import {AuthForm} from '@/components/auth-form';
import {pageHead} from '@/lib/educalex-content';
export const Route=createFileRoute('/reset-password')({head:()=>pageHead('Recuperar contraseña','Establece una nueva contraseña para tu cuenta EDUCALEX.'),component:()=> <AuthForm mode="reset"/>});
