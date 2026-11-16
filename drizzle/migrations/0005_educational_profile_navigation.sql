ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_teacher_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_teacher_type_check
  CHECK (teacher_type IN ('','aspirante','docente','coordinador','rector','directivo'));
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_preparation_path_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_preparation_path_check
  CHECK (preparation_path IN ('','ingreso-docente','ascenso-reubicacion','coordinador','rector','directivo'));

-- Al registrarse, solo se acepta una ruta de la lista blanca; nunca se asigna «admin».
CREATE OR REPLACE FUNCTION public.create_learning_profile() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE
  _path text := coalesce(NEW.raw_user_meta_data->>'preparation_path','');
  _type text;
BEGIN
  IF _path NOT IN ('ingreso-docente','ascenso-reubicacion','coordinador','rector','directivo') THEN _path := ''; END IF;
  _type := CASE _path WHEN 'ingreso-docente' THEN 'aspirante' WHEN 'ascenso-reubicacion' THEN 'docente'
                      WHEN 'coordinador' THEN 'coordinador' WHEN 'rector' THEN 'rector'
                      WHEN 'directivo' THEN 'directivo' ELSE '' END;
  INSERT INTO public.profiles(id, teacher_type, preparation_path) VALUES (NEW.id, _type, _path) ON CONFLICT DO NOTHING;
  INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'member') ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.create_learning_profile() FROM PUBLIC, anon, authenticated;
