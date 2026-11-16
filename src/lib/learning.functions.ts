import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { freeCoursePaths, unitCount } from './learning-policy';
import { resultScore } from './simulation-scoring';
import { currentPreparationLevel } from './preparation-levels';
const profileInput = z.object({display_name:z.string().max(80),teacher_type:z.enum(['','aspirante','docente','coordinador','rector','directivo']),preparation_path:z.enum(['','ingreso-docente','ascenso-reubicacion','coordinador','rector','directivo'])});
export const getLearning = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
 const [profile,enrollments,progress,attempts,role] = await Promise.all([
 context.supabase.from('profiles').select('*').eq('id',context.userId).single(),
 context.supabase.from('course_enrollments').select('*').eq('user_id',context.userId),
 context.supabase.from('unit_progress').select('*').eq('user_id',context.userId),
 context.supabase.from('exam_attempts').select('*').eq('user_id',context.userId).order('created_at',{ascending:false}),
 context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'})]);
 for (const r of [profile,enrollments,progress,attempts,role]) if(r.error) throw new Error('No se pudieron leer tus registros. Intenta de nuevo.');
  return {profile:profile.data,enrollments:enrollments.data??[],progress:progress.data??[],attempts:attempts.data??[],isAdmin:role.data===true,level:currentPreparationLevel()};
});
export const updateProfile = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>profileInput.parse(input)).handler(async ({data,context})=>{
 const {data:profile,error}=await context.supabase.from('profiles').update(data).eq('id',context.userId).select('id').single(); if(error||!profile) throw new Error('No se pudo guardar el perfil.'); return true;
});
export const saveUnit = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({path:z.enum(freeCoursePaths),unit:z.number().int().min(0).max(8),completed:z.boolean()}).parse(input)).handler(async ({data,context})=>{
 if(data.unit>unitCount(data.path)) throw new Error('Unidad no válida.');
 const enrollment=await context.supabase.from('course_enrollments').select('course_path').eq('user_id',context.userId).eq('course_path',data.path).maybeSingle();
 if(enrollment.error) throw new Error('No se pudo leer tu inscripción.');
 if(!enrollment.data){const {error}=await context.supabase.from('course_enrollments').insert({user_id:context.userId,course_path:data.path});if(error)throw new Error('No se pudo guardar la inscripción.');}
 if(data.unit>0){
 if(data.completed){const {error}=await context.supabase.from('unit_progress').upsert({user_id:context.userId,course_path:data.path,unit_number:data.unit},{onConflict:'user_id,course_path,unit_number',ignoreDuplicates:true});if(error)throw new Error('No se pudo guardar la unidad.');}
 else {const {error}=await context.supabase.from('unit_progress').delete().eq('user_id',context.userId).eq('course_path',data.path).eq('unit_number',data.unit);if(error)throw new Error('No se pudo actualizar la unidad.');}
 }return true;
});
export const saveAttempt = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid(),profile:z.enum(['ingreso-docente','ascenso-reubicacion','rector','coordinador']),answers:z.array(z.number().int().min(0).max(3).nullable()).length(8),elapsedSeconds:z.number().int().min(0).max(86400),timedOut:z.boolean()}).parse(input)).handler(async ({data,context})=>{
 const score=resultScore(data); const {error}=await context.supabase.from('exam_attempts').upsert({id:data.id,user_id:context.userId,profile:data.profile,answers:data.answers,elapsed_seconds:data.elapsedSeconds,timed_out:data.timedOut,correct:score.correct,percentage:score.percentage,competencies:score.competencies,exam_version:'practice-v1'},{onConflict:'id',ignoreDuplicates:true});if(error)throw new Error('No se pudo guardar tu práctica.');const saved=await context.supabase.from('exam_attempts').select('id').eq('id',data.id).eq('user_id',context.userId).single();if(saved.error||!saved.data)throw new Error('No se pudo comprobar el guardado de tu práctica.');return true;
});
export const checkAdmin = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async ({context})=>{
 const {data,error}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); if(error||data!==true) return false; return true;
});
