create table public.pricing (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

create table public.pricing_history (
  id bigserial primary key,
  data jsonb not null,
  saved_at timestamptz not null,
  saved_by uuid
);

create table public.admin_users (
  user_id uuid primary key
);

alter table public.pricing enable row level security;
alter table public.pricing_history enable row level security;
alter table public.admin_users enable row level security;

create function public.is_pricing_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_pricing_admin() from public;
grant execute on function public.is_pricing_admin() to anon, authenticated;

revoke all on public.pricing, public.pricing_history, public.admin_users from anon, authenticated;
grant select on public.pricing to anon, authenticated;
grant update (data) on public.pricing to authenticated;
grant select on public.pricing_history to authenticated;

create policy pricing_public_read on public.pricing
  for select to anon, authenticated using (true);

create policy pricing_admin_update on public.pricing
  for update to authenticated
  using (public.is_pricing_admin()) with check (public.is_pricing_admin());

create policy pricing_history_admin_read on public.pricing_history
  for select to authenticated using (public.is_pricing_admin());
