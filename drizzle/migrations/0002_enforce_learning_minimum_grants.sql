REVOKE ALL ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts FROM anon,authenticated;
GRANT SELECT ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts TO authenticated;
GRANT UPDATE(display_name,teacher_type,preparation_path) ON public.profiles TO authenticated;
GRANT INSERT ON public.course_enrollments,public.unit_progress,public.exam_attempts TO authenticated;
GRANT DELETE ON public.unit_progress TO authenticated;
GRANT ALL ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts TO service_role;