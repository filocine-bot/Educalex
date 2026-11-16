import {describe,it,expect} from 'vitest';
import {authErrorMessage,recoveryRequested} from '@/lib/auth-feedback';
describe('Errores seguros y enlaces de recuperación',()=>{
 it('solo reconoce el valor exacto recovery',()=>{expect(recoveryRequested('#type=recovery','')).toBe(true);expect(recoveryRequested('','?type=recovery')).toBe(true);expect(recoveryRequested('#type=recovery-false','')).toBe(false);});
 it('no expone mensajes del proveedor ni secretos en errores desconocidos',()=>{const privateText='private-provider-detail';expect(authErrorMessage({message:privateText})).not.toContain(privateText);});
});