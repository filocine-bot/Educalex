import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { AuthForm } from '@/components/auth-form';
const mocks=vi.hoisted(()=>({navigate:vi.fn(),account:{user:null as null|{id:string},loading:false,recoveryReady:false},auth:{signInWithOtp:vi.fn(),updateUser:vi.fn()}}));
vi.mock('@tanstack/react-router',()=>({useNavigate:()=>mocks.navigate,Link:({children,to,...props}:any)=><a href={to} {...props}>{children}</a>}));
vi.mock('@/components/account-session',()=>({useAccount:()=>mocks.account}));
vi.mock('@/integrations/supabase/client',()=>({supabase:{auth:mocks.auth},supabaseConfigured:true}));
beforeEach(()=>{cleanup();vi.clearAllMocks();mocks.account.user=null;mocks.account.loading=false;mocks.account.recoveryReady=false;});
describe('Acceso seguro por correo (servicio simulado, sin crear usuarios)',()=>{
 it('el registro solo pide correo, envía enlace y no navega a la cuenta',async()=>{
  mocks.auth.signInWithOtp.mockResolvedValue({data:{},error:null});render(<AuthForm mode="register"/>);
  expect(screen.queryByLabelText('Contraseña')).toBeNull();
  fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.click(screen.getByLabelText(/Autorizo el tratamiento/));fireEvent.click(screen.getByLabelText(/mayor de 18/));fireEvent.click(screen.getByRole('button',{name:'Crear cuenta y recibir enlace'}));
  await waitFor(()=>expect(mocks.auth.signInWithOtp).toHaveBeenCalledWith({email:'owner@example.test',options:{shouldCreateUser:true,emailRedirectTo:`${window.location.origin}/simulacros/ingreso-docente`,data:expect.objectContaining({preparation_path:'ingreso-docente',privacy_policy_version:'2026-11-19',declared_adult:true})}}));expect(mocks.navigate).not.toHaveBeenCalled();
 });
 it('la recuperación sin sesión validada no llama al cambio de contraseña',()=>{render(<AuthForm mode="reset"/>);expect(screen.getByRole('button',{name:'Guardar contraseña'})).toBeDisabled();expect(mocks.auth.updateUser).not.toHaveBeenCalled();});
 it('el evento de recuperación permite actualizar sin current_password ni fragmento',async()=>{
  mocks.account.user={id:'local-only'};mocks.account.recoveryReady=true;mocks.auth.updateUser.mockResolvedValue({error:null});render(<AuthForm mode="reset"/>);
  fireEvent.change(screen.getByLabelText('Nueva contraseña'),{target:{value:'new-local-test-only'}});fireEvent.click(screen.getByRole('button',{name:'Guardar contraseña'}));
  await waitFor(()=>expect(mocks.auth.updateUser).toHaveBeenCalledWith({password:'new-local-test-only'}));
 });
 it('ingresar solo pide correo y envía un enlace sin crear cuentas nuevas',async()=>{
  mocks.auth.signInWithOtp.mockResolvedValue({data:{},error:null});render(<AuthForm mode="login"/>);
  expect(screen.queryByLabelText('Contraseña')).toBeNull();
  fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.click(screen.getByRole('button',{name:'Enviar enlace de acceso'}));
  await waitFor(()=>expect(mocks.auth.signInWithOtp).toHaveBeenCalledWith({email:'owner@example.test',options:{shouldCreateUser:false,emailRedirectTo:`${window.location.origin}/simulacros`}}));expect(mocks.navigate).not.toHaveBeenCalled();
 });
 it('un fallo de red libera el botón y permite reintentar',async()=>{
  mocks.auth.signInWithOtp.mockRejectedValue(new Error('network'));render(<AuthForm mode="login"/>);fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.click(screen.getByRole('button',{name:'Enviar enlace de acceso'}));
  await waitFor(()=>expect(screen.getByRole('button',{name:'Enviar enlace de acceso'})).toBeEnabled());expect(mocks.navigate).not.toHaveBeenCalled();
 });
 it('sin autorización de datos no se crea la cuenta',async()=>{
  render(<AuthForm mode="register"/>);fireEvent.change(screen.getByLabelText('Correo'),{target:{value:'owner@example.test'}});fireEvent.submit(screen.getByRole('button',{name:'Crear cuenta y recibir enlace'}).closest('form')!);
  await waitFor(()=>expect(screen.getByRole('status')).toHaveTextContent('debes aceptar la política'));expect(mocks.auth.signInWithOtp).not.toHaveBeenCalled();
 });
});
