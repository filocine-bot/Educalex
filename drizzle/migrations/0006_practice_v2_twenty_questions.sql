-- Simulacros ampliados: 40 preguntas por perfil (versión practice-v2).
-- Las entregas anteriores (practice-v1, 8 respuestas) siguen siendo válidas.
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_exam_version_check;
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_answers_check;
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_correct_check;
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_percentage_check;
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_check; -- regla anterior: porcentaje calculado sobre 8
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_version_shape;
ALTER TABLE public.exam_attempts ALTER COLUMN exam_version SET DEFAULT 'practice-v2';
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_exam_version_check CHECK (exam_version IN ('practice-v1','practice-v2'));
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_answers_check CHECK (jsonb_typeof(answers)='array');
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_correct_check CHECK (correct>=0);
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_percentage_check CHECK (percentage BETWEEN 0 AND 100);
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_version_shape CHECK (
  (exam_version='practice-v1' AND jsonb_array_length(answers)=8 AND correct<=8 AND percentage=round(correct*100.0/8))
  OR (exam_version='practice-v2' AND jsonb_array_length(answers)=40 AND correct<=40 AND percentage=round(correct*100.0/40))
);
