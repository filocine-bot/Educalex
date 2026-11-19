-- Simulacros tipo ICFES (versión practice-v3, 19 nov 2026): 40 preguntas por perfil, reordenadas por nivel.
-- Las entregas practice-v1 y practice-v2 se conservan y se revisan con el banco anterior.
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_exam_version_check;
ALTER TABLE public.exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_version_shape;
ALTER TABLE public.exam_attempts ALTER COLUMN exam_version SET DEFAULT 'practice-v3';
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_exam_version_check CHECK (exam_version IN ('practice-v1','practice-v2','practice-v3'));
ALTER TABLE public.exam_attempts ADD CONSTRAINT exam_attempts_version_shape CHECK (
  (exam_version='practice-v1' AND jsonb_array_length(answers)=8 AND correct<=8 AND percentage=round(correct*100.0/8))
  OR (exam_version IN ('practice-v2','practice-v3') AND jsonb_array_length(answers)=40 AND correct<=40 AND percentage=round(correct*100.0/40))
);
