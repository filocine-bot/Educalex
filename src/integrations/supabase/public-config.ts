// Configuración pública de Supabase para EDUCALEX (proyecto en São Paulo).
// La publishable key es pública por diseño: Supabase indica que puede compartirse
// siempre que las tablas tengan RLS (todas lo tienen). Nunca poner aquí una llave secreta.
// Tiene prioridad sobre las variables de Vercel; en pruebas automáticas se ignora.
const isTest = import.meta.env.MODE === 'test';

export const PUBLIC_SUPABASE_URL = isTest ? undefined : 'https://eenjawqydcntuehkcsbm.supabase.co';
export const PUBLIC_SUPABASE_PUBLISHABLE_KEY = isTest ? undefined : 'sb_publishable_Smb9v6Dh9CAzlBEZj04rlA_46lzHn0T';
