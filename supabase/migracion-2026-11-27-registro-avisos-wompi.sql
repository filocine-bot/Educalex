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
