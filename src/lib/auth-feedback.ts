export function authErrorMessage(error: unknown): string {
 const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
 if (code === 'email_not_confirmed') return 'Confirma tu correo con el enlace recibido antes de ingresar.';
 if (code === 'invalid_credentials') return 'Correo o contraseña incorrectos. Revisa tus datos.';
 if (code === 'weak_password') return 'Elige una contraseña más segura, de al menos ocho caracteres.';
 if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit') return 'Demasiados intentos. Espera unos minutos antes de volver a intentar.';
 return 'No se pudo completar la solicitud. Comprueba tu conexión e intenta de nuevo.';
}

export function recoveryRequested(hash: string, search: string): boolean {
 return new URLSearchParams(hash.replace(/^#/, '')).get('type') === 'recovery' || new URLSearchParams(search).get('type') === 'recovery';
}