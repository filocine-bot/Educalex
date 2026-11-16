/* Versión artefacto de las funciones de aprendizaje: guarda el perfil, los cursos y los simulacros
   en el almacenamiento privado de cada persona (data/users/<id>/educalex). */
import { useCapability } from '@/lib/claude-runtime';
import { artifactUser } from './supabase-stub';
import { freeCoursePaths, unitCount } from '@/lib/learning-policy';
import { resultScore } from '@/lib/simulation-scoring';
import { currentPreparationLevel } from '@/lib/preparation-levels';

type DocRef = { get(): Promise<{ exists: boolean; data(): Record<string, unknown> | undefined }>; set(d: Record<string, unknown>): Promise<void> };
type DB = { doc(path: string): DocRef };
type UserCap = { isOwner(): boolean };

type Profile = { id: string; display_name: string; teacher_type: string; preparation_path: string; created_at: string };
type Enrollment = { user_id: string; course_path: string; created_at: string };
type Progress = { user_id: string; course_path: string; unit_number: number; completed_at: string };
type Attempt = { id: string; user_id: string; profile: string; exam_version: string; answers: (number | null)[]; elapsed_seconds: number; timed_out: boolean; correct: number; percentage: number; competencies: unknown; created_at: string };
type State = { profile: Profile; enrollments: Enrollment[]; progress: Progress[]; attempts: Attempt[] };

const PROFILES = ['', 'ingreso-docente', 'ascenso-reubicacion', 'coordinador', 'rector', 'directivo'];
const TYPES = ['', 'aspirante', 'docente', 'coordinador', 'rector', 'directivo'];
const MAX_ATTEMPTS = 150;

async function ref(): Promise<{ doc: DocRef; uid: string }> {
  const [db, user] = await Promise.all([useCapability<DB>('db'), artifactUser()]);
  if (!db || !user) throw new Error('Ingresa con tu cuenta de Claude para guardar tu avance.');
  return { doc: db.doc(`data/users/${user.id}/educalex`), uid: user.id };
}

async function load(): Promise<{ state: State; doc: DocRef; uid: string }> {
  const { doc, uid } = await ref();
  const snap = await doc.get();
  const raw = (snap.exists ? snap.data() : undefined) as Partial<State> | undefined;
  const state: State = {
    profile: raw?.profile ?? { id: uid, display_name: '', teacher_type: '', preparation_path: '', created_at: new Date().toISOString() },
    enrollments: raw?.enrollments ?? [], progress: raw?.progress ?? [], attempts: raw?.attempts ?? [],
  };
  return { state, doc, uid };
}

let writing: Promise<unknown> = Promise.resolve();
async function save(doc: DocRef, state: State) {
  const run = writing.then(() => doc.set(state as unknown as Record<string, unknown>));
  writing = run.catch(() => undefined);
  try { await run; } catch { throw new Error('No se pudo guardar. Comprueba que tienes permiso de colaboración en esta página.'); }
}

export async function getLearning() {
  const { state } = await load();
  const user = await useCapability<UserCap>('user');
  const attempts = [...state.attempts].sort((a, b) => b.created_at.localeCompare(a.created_at));
  return { profile: state.profile, enrollments: state.enrollments, progress: state.progress, attempts, isAdmin: !!user?.isOwner(), level: currentPreparationLevel() };
}

export async function updateProfile({ data }: { data: { display_name: unknown; teacher_type: unknown; preparation_path: unknown } }) {
  const name = String(data.display_name ?? '').slice(0, 80);
  const type = String(data.teacher_type ?? ''); const path = String(data.preparation_path ?? '');
  if (!TYPES.includes(type) || !PROFILES.includes(path)) throw new Error('Perfil no válido.');
  const { state, doc } = await load();
  state.profile = { ...state.profile, display_name: name, teacher_type: type, preparation_path: path };
  await save(doc, state); return true;
}

export async function saveUnit({ data }: { data: { path: string; unit: number; completed: boolean } }) {
  if (!(freeCoursePaths as readonly string[]).includes(data.path)) throw new Error('Curso no válido.');
  const path = data.path as (typeof freeCoursePaths)[number];
  if (!Number.isInteger(data.unit) || data.unit < 0 || data.unit > unitCount(path)) throw new Error('Unidad no válida.');
  const { state, doc, uid } = await load();
  const now = new Date().toISOString();
  if (!state.enrollments.some(e => e.course_path === path)) state.enrollments.push({ user_id: uid, course_path: path, created_at: now });
  if (data.unit > 0) {
    state.progress = state.progress.filter(p => !(p.course_path === path && p.unit_number === data.unit));
    if (data.completed) state.progress.push({ user_id: uid, course_path: path, unit_number: data.unit, completed_at: now });
  }
  await save(doc, state); return true;
}

export async function saveAttempt({ data }: { data: { id: string; profile: string; answers: (number | null)[]; elapsedSeconds: number; timedOut: boolean } }) {
  const { state, doc, uid } = await load();
  if (!state.attempts.some(a => a.id === data.id)) {
    const score = resultScore(data as Parameters<typeof resultScore>[0]);
    state.attempts.push({ id: data.id, user_id: uid, profile: data.profile, exam_version: 'practice-v1', answers: data.answers, elapsed_seconds: data.elapsedSeconds, timed_out: data.timedOut, correct: score.correct, percentage: score.percentage, competencies: score.competencies, created_at: new Date().toISOString() });
    state.attempts = state.attempts.slice(-MAX_ATTEMPTS);
    await save(doc, state);
  }
  return true;
}

export async function checkAdmin() { const user = await useCapability<UserCap>('user'); return !!user?.isOwner(); }
