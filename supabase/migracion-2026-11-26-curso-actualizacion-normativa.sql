-- Habilita la inscripción y el progreso del curso «Actualización normativa educativa» (26 nov. 2026).
-- Pegar y ejecutar una sola vez en Supabase → SQL Editor.
ALTER TABLE public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_course_path_check;
ALTER TABLE public.course_enrollments ADD CONSTRAINT course_enrollments_course_path_check
  CHECK (course_path IN ('/formacion/guia-34-pmi','/formacion/inclusion-dua-piar','/formacion/convivencia-escolar','/formacion/educacion-rural','/formacion/steam-robotica','/formacion/actualizacion-normativa'));
