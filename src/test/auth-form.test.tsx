import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { AuthForm } from '@/components/auth-form';
const mocks=vi.hoisted(()=>({navigate:vi.fn(),account:{user:null as null|{id:string},loading:false,recoveryReady:false},auth:{signUp:vi.fn(),signInWithPassword:vi.fn(),resetPasswordForEmail:vi.fn(),updateUser:vi.fn()}}));
vi.mock('@tanstack/react-router',()=>({useNavigate:()=>mocks.navigate,Link:({children,to,...props}:any)=><a href={to} {...props}>{children}</a>}));
vi.mock('@/components/account-session',()=>({useAccount:()=>mocks.account}));
vi.mock('@/integrations/supabase/client',()=>({supabase:{auth:mocks.auth},supabaseConfigured:true}));
beforeEach(()=>{cleanup();vi.clearAllMocks();mocks.account.user=null;mocks.account.loading=false;mocks.account.recoveryReady=false;});
describe('Acceso seguro por correo (servicio simulado, sin crear usuarios)',()=>{
 it('un registro sin sesión espera confirmación y no navega a la cuenta',async()=>{
  mocks.auth.signUp.mockResolvedValue({data:{session:null},error:null});render(<AuthForm mode="register"/>);
  fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.change(screen.getByLabelText('Contraseña'),{target:{value:'local-test-only'}});fireEvent.click(screen.getByRole('button',{name:'Crear cuenta'}));
  await waitFor(()=>expect(mocks.auth.signUp).toHaveBeenCalledWith({email:'owner@example.test',password:'local-test-only',options:{emailRedirectTo:window.location.origin,data:{preparation_path:'ingreso-docente'}}}));expect(mocks.navigate).not.toHaveBeenCalled();
 });
 it('la recuperación sin sesión validada no llama al cambio de contraseña',()=>{render(<AuthForm mode="reset"/>);expect(screen.getByRole('button',{name:'Guardar contraseña'})).toBeDisabled();expect(mocks.auth.updateUser).not.toHaveBeenCalled();});
 it('el evento de recuperación permite actualizar sin current_password ni fragmento',async()=>{
  mocks.account.user={id:'local-only'};mocks.account.recoveryReady=true;mocks.auth.updateUser.mockResolvedValue({error:null});render(<AuthForm mode="reset"/>);
  fireEvent.change(screen.getByLabelText('Nueva contraseña'),{target:{value:'new-local-test-only'}});fireEvent.click(screen.getByRole('button',{name:'Guardar contraseña'}));
  await waitFor(()=>expect(mocks.auth.updateUser).toHaveBeenCalledWith({password:'new-local-test-only'}));
 });
 it('un fallo de red al solicitar recuperación libera el botón y permite reintentar',async()=>{
  mocks.auth.resetPasswordForEmail.mockRejectedValue(new Error('network'));render(<AuthForm mode="login"/>);fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.click(screen.getByRole('button',{name:'Recuperar contraseña'}));
  await waitFor(()=>expect(screen.getByRole('button',{name:'Recuperar contraseña'})).toBeEnabled());expect(mocks.auth.resetPasswordForEmail).toHaveBeenCalledWith('owner@example.test',{redirectTo:`${window.location.origin}/reset-password`});
 });
 it('un correo no confirmado nunca navega como si hubiera ingresado',async()=>{
  mocks.auth.signInWithPassword.mockResolvedValue({error:{code:'email_not_confirmed'}});render(<AuthForm mode="login"/>);fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.change(screen.getByLabelText('Contraseña'),{target:{value:'local-test-only'}});fireEvent.click(screen.getByRole('button',{name:'Ingresar'}));
  await waitFor(()=>expect(mocks.auth.signInWithPassword).toHaveBeenCalled());expect(mocks.navigate).not.toHaveBeenCalled();
 });
});