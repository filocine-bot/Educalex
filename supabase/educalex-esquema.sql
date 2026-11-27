-- =====================================================================
-- EDUCALEX · Esquema completo de base de datos para Supabase
-- Ejecutar UNA sola vez en un proyecto Supabase nuevo:
--   supabase.com → tu proyecto → SQL Editor → New query → pegar → Run
-- Reúne las migraciones 0000–0004 exportadas de Lovable y reconstruye la
-- 0005 (perfil «directivo» y lectura segura del perfil elegido al registrarse),
-- que llegó vacía en la exportación.
-- =====================================================================

-- ---- 0000_free_learning_accounts.sql ----
CREATE TABLE IF NOT EXISTS public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text NOT NULL DEFAULT '' CHECK (length(display_name)<=80), teacher_type text NOT NULL DEFAULT '' CHECK (teacher_type IN ('','aspirante','docente','coordinador','rector')), preparation_path text NOT NULL DEFAULT '' CHECK (preparation_path IN ('','ingreso-docente','ascenso-reubicacion','coordinador','rector')), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.profiles TO authenticated; GRANT UPDATE(display_name,teacher_type,preparation_path) ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_read_own ON public.profiles FOR SELECT TO authenticated USING(id=auth.uid());
CREATE POLICY profiles_update_own ON public.profiles FOR UPDATE TO authenticated USING(id=auth.uid()) WITH CHECK(id=auth.uid());
CREATE TABLE IF NOT EXISTS public.user_roles (user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, role text NOT NULL CHECK(role IN ('admin','member')), PRIMARY KEY(user_id,role));
GRANT SELECT ON public.user_roles TO authenticated; GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY roles_read_own ON public.user_roles FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid,_role text) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) AND _user_id=auth.uid() $$;
REVOKE ALL ON FUNCTION public.has_role(uuid,text) FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.has_role(uuid,text) TO authenticated;
CREATE OR REPLACE FUNCTION public.create_learning_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN INSERT INTO public.profiles(id) VALUES(NEW.id) ON CONFLICT DO NOTHING; INSERT INTO public.user_roles(user_id,role) VALUES(NEW.id,'member') ON CONFLICT DO NOTHING; RETURN NEW; END $$;
REVOKE ALL ON FUNCTION public.create_learning_profile() FROM PUBLIC;
CREATE TRIGGER educalex_profile_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_learning_profile();
INSERT INTO public.profiles(id) SELECT id FROM auth.users ON CONFLICT DO NOTHING;
INSERT INTO public.user_roles(user_id,role) SELECT id,'member' FROM auth.users ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS public.course_enrollments(user_id uuid NOT NULL, course_path text NOT NULL CHECK(course_path IN ('/formacion/guia-34-pmi','/formacion/inclusion-dua-piar','/formacion/convivencia-escolar','/formacion/educacion-rural','/formacion/steam-robotica','/formacion/actualizacion-normativa','/formacion/evaluacion-formativa')), created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,course_path));
GRANT SELECT,INSERT ON public.course_enrollments TO authenticated; GRANT ALL ON public.course_enrollments TO service_role;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY enrollments_read_own ON public.course_enrollments FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE POLICY enrollments_insert_own ON public.course_enrollments FOR INSERT TO authenticated WITH CHECK(user_id=auth.uid());
CREATE TABLE IF NOT EXISTS public.unit_progress(user_id uuid NOT NULL, course_path text NOT NULL, unit_number integer NOT NULL CHECK(unit_number>=1 AND unit_number<=CASE WHEN course_path='/formacion/guia-34-pmi' THEN 8 ELSE 5 END), completed_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,course_path,unit_number), FOREIGN KEY(user_id,course_path) REFERENCES public.course_enrollments(user_id,course_path) ON DELETE CASCADE);
GRANT SELECT,INSERT,DELETE ON public.unit_progress TO authenticated; GRANT ALL ON public.unit_progress TO service_role;
ALTER TABLE public.unit_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY progress_read_own ON public.unit_progress FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE POLICY progress_insert_own ON public.unit_progress FOR INSERT TO authenticated WITH CHECK(user_id=auth.uid());
CREATE POLICY progress_delete_own ON public.unit_progress FOR DELETE TO authenticated USING(user_id=auth.uid());
CREATE TABLE IF NOT EXISTS public.exam_attempts(id uuid PRIMARY KEY, user_id uuid NOT NULL, profile text NOT NULL CHECK(profile IN ('ingreso-docente','ascenso-reubicacion','rector','coordinador')), exam_version text NOT NULL DEFAULT 'practice-v3' CHECK(exam_version IN ('practice-v1','practice-v2','practice-v3')), answers jsonb NOT NULL CHECK(jsonb_typeof(answers)='array'), elapsed_seconds integer NOT NULL CHECK(elapsed_seconds>=0 AND elapsed_seconds<=86400), timed_out boolean NOT NULL DEFAULT false, correct integer NOT NULL CHECK(correct>=0), percentage integer NOT NULL CHECK(percentage BETWEEN 0 AND 100), competencies jsonb NOT NULL CHECK(jsonb_typeof(competencies)='object'), created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT exam_attempts_version_shape CHECK((exam_version='practice-v1' AND jsonb_array_length(answers)=8 AND correct<=8 AND percentage=round(correct*100.0/8)) OR (exam_version IN ('practice-v2','practice-v3') AND jsonb_array_length(answers)=40 AND correct<=40 AND percentage=round(correct*100.0/40))));
GRANT SELECT,INSERT ON public.exam_attempts TO authenticated; GRANT ALL ON public.exam_attempts TO service_role;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY attempts_read_own ON public.exam_attempts FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE POLICY attempts_insert_own ON public.exam_attempts FOR INSERT TO authenticated WITH CHECK(user_id=auth.uid());
CREATE INDEX IF NOT EXISTS attempts_owner_date ON public.exam_attempts(user_id,created_at DESC);
COMMENT ON TABLE public.exam_attempts IS 'Self-reported original client-side practice, not protected or official assessment. No payment entitlements.';

-- ---- 0001_restrict_learning_function_execution.sql ----
REVOKE EXECUTE ON FUNCTION public.create_learning_profile() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid,text) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid,text) TO authenticated;

-- ---- 0002_enforce_learning_minimum_grants.sql ----
REVOKE ALL ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts FROM anon,authenticated;
GRANT SELECT ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts TO authenticated;
GRANT UPDATE(display_name,teacher_type,preparation_path) ON public.profiles TO authenticated;
GRANT INSERT ON public.course_enrollments,public.unit_progress,public.exam_attempts TO authenticated;
GRANT DELETE ON public.unit_progress TO authenticated;
GRANT ALL ON public.profiles,public.user_roles,public.course_enrollments,public.unit_progress,public.exam_attempts TO service_role;

-- ---- 0003_future_practice_access_drafts.sql ----
CREATE TABLE public.practice_offer_drafts (code text PRIMARY KEY CHECK (code IN ('explorador','avanza','experto','elite')), label text NOT NULL CHECK(length(label) BETWEEN 1 AND 80), extra_attempts integer CHECK(extra_attempts>=0), integral_access boolean NOT NULL DEFAULT false, level_rules jsonb NOT NULL DEFAULT '{}'::jsonb CHECK(jsonb_typeof(level_rules)='object'), revision integer NOT NULL DEFAULT 1 CHECK(revision>0), updated_at timestamptz NOT NULL DEFAULT now(), CHECK((integral_access AND extra_attempts IS NULL) OR (NOT integral_access AND extra_attempts IS NOT NULL)));
REVOKE ALL ON public.practice_offer_drafts FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.practice_offer_drafts TO authenticated; GRANT ALL ON public.practice_offer_drafts TO service_role;
ALTER TABLE public.practice_offer_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY offer_drafts_admin ON public.practice_offer_drafts FOR ALL TO authenticated USING(public.has_role(auth.uid(),'admin')) WITH CHECK(public.has_role(auth.uid(),'admin'));
CREATE TABLE public.practice_access_rights(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL,profile text NOT NULL CHECK(profile IN ('ingreso-docente','ascenso-reubicacion','rector','coordinador')),offer_code text NOT NULL REFERENCES public.practice_offer_drafts(code),offer_revision integer NOT NULL CHECK(offer_revision>0),quantity integer CHECK(quantity>=0),integral_access boolean NOT NULL DEFAULT false,status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','revoked')),reason text NOT NULL CHECK(length(reason)>0),created_at timestamptz NOT NULL DEFAULT now(),CHECK((integral_access AND quantity IS NULL) OR (NOT integral_access AND quantity IS NOT NULL)));
REVOKE ALL ON public.practice_access_rights FROM anon,authenticated;
GRANT SELECT ON public.practice_access_rights TO authenticated;GRANT ALL ON public.practice_access_rights TO service_role;
ALTER TABLE public.practice_access_rights ENABLE ROW LEVEL SECURITY;
CREATE POLICY rights_read ON public.practice_access_rights FOR SELECT TO authenticated USING(user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE INDEX rights_owner_profile ON public.practice_access_rights(user_id,profile);
CREATE TABLE public.practice_access_ledger(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid,profile text CHECK(profile IN ('ingreso-docente','ascenso-reubicacion','rector','coordinador')),right_id uuid REFERENCES public.practice_access_rights(id),attempt_id uuid REFERENCES public.exam_attempts(id),offer_code text REFERENCES public.practice_offer_drafts(code),event_type text NOT NULL CHECK(event_type IN ('offer_draft_created','offer_draft_updated','right_draft_created','right_revoked','level_draft_changed')),delta integer NOT NULL DEFAULT 0 CHECK(delta=0),actor_id uuid,reason text NOT NULL,details jsonb NOT NULL DEFAULT '{}'::jsonb,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(attempt_id));
REVOKE ALL ON public.practice_access_ledger FROM anon,authenticated;
GRANT SELECT ON public.practice_access_ledger TO authenticated;GRANT SELECT,INSERT ON public.practice_access_ledger TO service_role;
ALTER TABLE public.practice_access_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY ledger_read ON public.practice_access_ledger FOR SELECT TO authenticated USING(user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE INDEX ledger_owner_date ON public.practice_access_ledger(user_id,created_at DESC);
CREATE TABLE public.practice_level_drafts(user_id uuid NOT NULL,profile text NOT NULL CHECK(profile IN ('ingreso-docente','ascenso-reubicacion','rector','coordinador')),level_code text NOT NULL REFERENCES public.practice_offer_drafts(code),reason text NOT NULL CHECK(length(reason)>0),updated_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(user_id,profile));
REVOKE ALL ON public.practice_level_drafts FROM anon,authenticated;
GRANT SELECT ON public.practice_level_drafts TO authenticated;GRANT ALL ON public.practice_level_drafts TO service_role;
ALTER TABLE public.practice_level_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY levels_read ON public.practice_level_drafts FOR SELECT TO authenticated USING(user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE FUNCTION public.audit_practice_offer_draft() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN NEW.revision:=CASE WHEN TG_OP='UPDATE' THEN OLD.revision+1 ELSE 1 END; NEW.updated_at:=now(); INSERT INTO public.practice_access_ledger(offer_code,event_type,actor_id,reason,details) VALUES(NEW.code,CASE WHEN TG_OP='UPDATE' THEN 'offer_draft_updated' ELSE 'offer_draft_created' END,auth.uid(),'Configuración futura sin activación',jsonb_build_object('before',CASE WHEN TG_OP='UPDATE' THEN to_jsonb(OLD) ELSE NULL END,'after',to_jsonb(NEW))); RETURN NEW; END $$;
REVOKE ALL ON FUNCTION public.audit_practice_offer_draft() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER practice_offer_audit BEFORE INSERT OR UPDATE ON public.practice_offer_drafts FOR EACH ROW EXECUTE FUNCTION public.audit_practice_offer_draft();
COMMENT ON TABLE public.practice_offer_drafts IS 'Inactive future offer configuration; no pricing, purchases, activation or limits on existing practice-v1.';
COMMENT ON TABLE public.practice_access_ledger IS 'Append-only audit preparation. Consumption and nonzero deltas intentionally forbidden until separately authorized activation.';

-- ---- 0004_preparation_level_drafts.sql ----
ALTER TABLE public.practice_offer_drafts ADD COLUMN IF NOT EXISTS content_rules jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.practice_offer_drafts ADD COLUMN IF NOT EXISTS simulation_rules jsonb NOT NULL DEFAULT '{}'::jsonb;
COMMENT ON TABLE public.practice_offer_drafts IS 'Internal preparation-level drafts only. Never individual simulation packages. No active premium restrictions or billing.';
COMMENT ON COLUMN public.practice_offer_drafts.extra_attempts IS 'DEPRECATED: legacy package quantity; not used by preparation-level UI or access checks.';
COMMENT ON COLUMN public.practice_offer_drafts.integral_access IS 'DEPRECATED: legacy package flag; not used by preparation-level UI or access checks.';
COMMENT ON COLUMN public.practice_offer_drafts.level_rules IS 'DEPRECATED: retained historical package rules; replaced by content_rules and simulation_rules.';
COMMENT ON COLUMN public.practice_offer_drafts.content_rules IS 'Inactive administrator-configurable future content rules; existing content remains free.';
COMMENT ON COLUMN public.practice_offer_drafts.simulation_rules IS 'Inactive administrator-configurable future practice rules; current four practice-v1 simulations remain free.';
COMMENT ON TABLE public.practice_access_rights IS 'DEPRECATED: legacy package rights; preserved without active use, activation or consumption.';
COMMENT ON TABLE public.practice_level_drafts IS 'Legacy inactive user/profile drafts. Never determine the current level or restrict access.';
COMMENT ON TABLE public.practice_access_ledger IS 'Append-only audit history for internal drafts. Legacy package events retained; no consumption or nonzero delta.';

-- ---- 0005_educational_profile_navigation (reconstruida) ----
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

-- =====================================================================
-- DESPUÉS de registrarte y confirmar tu correo en el sitio, para volverte
-- administradora ejecuta (cambiando el correo por el tuyo):
--
-- INSERT INTO public.user_roles(user_id, role)
--   SELECT id, 'admin' FROM auth.users WHERE email = 'TU-CORREO@ejemplo.com'
--   ON CONFLICT DO NOTHING;
-- =====================================================================

-- ---- 0007_wompi_payments.sql ----
-- Pagos con Wompi: órdenes y accesos premium.
-- Las filas solo las escribe el servidor (service_role) después de verificar el pago con Wompi.
CREATE TABLE IF NOT EXISTS public.payment_orders (
  reference text PRIMARY KEY CHECK (reference ~ '^EDX-[A-Za-z0-9-]{8,64}$'),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product text NOT NULL CHECK (length(product) BETWEEN 1 AND 60),
  amount_in_cents bigint NOT NULL CHECK (amount_in_cents > 0),
  currency text NOT NULL DEFAULT 'COP' CHECK (currency = 'COP'),
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','DECLINED','VOIDED','ERROR')),
  transaction_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON public.payment_orders FROM anon, authenticated;
GRANT SELECT ON public.payment_orders TO authenticated;
GRANT ALL ON public.payment_orders TO service_role;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS payment_orders_read ON public.payment_orders;
CREATE POLICY payment_orders_read ON public.payment_orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE INDEX IF NOT EXISTS payment_orders_owner ON public.payment_orders(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.premium_access (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product text NOT NULL CHECK (length(product) BETWEEN 1 AND 60),
  reference text NOT NULL REFERENCES public.payment_orders(reference),
  granted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product)
);
REVOKE ALL ON public.premium_access FROM anon, authenticated;
GRANT SELECT ON public.premium_access TO authenticated;
GRANT ALL ON public.premium_access TO service_role;
ALTER TABLE public.premium_access ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS premium_access_read ON public.premium_access;
CREATE POLICY premium_access_read ON public.premium_access FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
COMMENT ON TABLE public.payment_orders IS 'Órdenes de pago Wompi. Escritura solo desde el servidor tras verificar firma y monto.';
COMMENT ON TABLE public.premium_access IS 'Accesos premium otorgados por pagos aprobados en Wompi.';
-- Registro permanente de los avisos de pago que envía Wompi (27 nov. 2026).
-- Pegar y ejecutar una sola vez en Supabase → SQL Editor.
create table if not exists public.wompi_event_log (
  id bigserial primary key,
  received_at timestamptz not null default now(),
  event text,
  reference text,
  transaction_id text,
  wompi_status text,
  http_status integer not null,
  outcome text not null,
  detail text
);
alter table public.wompi_event_log enable row level security;
-- Sin políticas: solo el servidor (clave de servicio) puede leer y escribir.
create index if not exists wompi_event_log_received_idx on public.wompi_event_log (received_at desc);
