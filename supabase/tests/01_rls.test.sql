\set ON_ERROR_STOP on
begin;
\i supabase/tests/_fixture.sql

-- Fixture rows are written as the table owner (bypasses RLS).
delete from public.pricing;
insert into public.pricing (id, data) values (1, pgtest.fixture());
insert into public.admin_users values ('00000000-0000-0000-0000-0000000000a1');

-- anon: read only
set local role anon;
do $$ begin
  assert (select count(*) from public.pricing) = 1, 'anon must be able to read pricing';
end $$;
select pgtest.expect_error($$update public.pricing set data = data$$, 'permission denied');
select pgtest.expect_error($$delete from public.pricing$$, 'permission denied');
select pgtest.expect_error($$insert into public.pricing (id, data) values (2, '{}')$$, 'permission denied');
select pgtest.expect_error($$select * from public.pricing_history$$, 'permission denied');
select pgtest.expect_error($$select * from public.admin_users$$, 'permission denied');
reset role;

-- authenticated but not an admin: RLS hides history and blocks updates
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', true);
set local role authenticated;
do $$
declare n int;
begin
  update public.pricing set data = data;
  get diagnostics n = row_count;
  assert n = 0, 'non-admin update must affect 0 rows, got ' || n;
  assert (select count(*) from public.pricing_history) = 0, 'non-admin must see no history';
end $$;
select pgtest.expect_error($$select * from public.admin_users$$, 'permission denied');
reset role;

-- admin: may update data, nothing else
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', true);
set local role authenticated;
do $$
declare n int;
begin
  update public.pricing set data = data;
  get diagnostics n = row_count;
  assert n = 1, 'admin update must affect 1 row, got ' || n;
end $$;
select pgtest.expect_error($$delete from public.pricing$$, 'permission denied');
select pgtest.expect_error($$update public.pricing set updated_by = null$$, 'permission denied');
reset role;

rollback;
select 'rls tests passed' as result;
