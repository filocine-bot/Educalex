/* Sustituto de Supabase para la versión artefacto: la cuenta es la cuenta de Claude de quien visita. */
import { useCapability } from '@/lib/claude-runtime';

type ArtifactUser = { id: string; email: string; app_metadata: Record<string, unknown>; user_metadata: Record<string, unknown>; aud: string; created_at: string };
type UserCap = { id(): Promise<string | null>; isOwner(): boolean };

let userPromise: Promise<ArtifactUser | null> | null = null;
export function artifactUser(): Promise<ArtifactUser | null> {
  if (!userPromise) userPromise = (async () => {
    const [user, db] = await Promise.all([useCapability<UserCap>('user'), useCapability('db')]);
    if (!user || !db) return null;
    let id: string | null = null;
    try { id = await user.id(); } catch { id = null; }
    if (!id) return null;
    return { id, email: '', app_metadata: {}, user_metadata: {}, aud: 'authenticated', created_at: new Date(0).toISOString() };
  })();
  return userPromise;
}

export const supabaseConfigured = true;

const noSub = { data: { subscription: { unsubscribe() {} } } };
const unsupported = async () => ({ data: { user: null, session: null }, error: new Error('No disponible en esta versión.') });

export const supabase = {
  auth: {
    async getUser() { return { data: { user: await artifactUser() }, error: null }; },
    async getSession() { const u = await artifactUser(); return { data: { session: u ? { user: u, access_token: '' } : null }, error: null }; },
    onAuthStateChange() { return noSub; },
    async signOut() { return { error: null }; },
    signInWithPassword: unsupported, signUp: unsupported, updateUser: unsupported,
    async resetPasswordForEmail() { return { data: {}, error: new Error('No disponible en esta versión.') }; },
  },
} as const;
