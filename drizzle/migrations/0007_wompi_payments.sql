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
