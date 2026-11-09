\set ON_ERROR_STOP on
begin;
\i supabase/tests/_fixture.sql

-- Indian digit grouping
do $$ begin
  assert public.pricing_inr('100') = '₹100', 'inr 100';
  assert public.pricing_inr('1000') = '₹1,000', 'inr 1000';
  assert public.pricing_inr('99999') = '₹99,999', 'inr 99999';
  assert public.pricing_inr('100000') = '₹1,00,000', 'inr 100000';
  assert public.pricing_inr('1234567') = '₹12,34,567', 'inr 1234567';
end $$;

-- Insert validates and derives display strings
delete from public.pricing;
insert into public.pricing (id, data) values (1, pgtest.fixture());
insert into public.admin_users values ('00000000-0000-0000-0000-0000000000a1');

do $$
declare d jsonb := (select data from public.pricing where id = 1);
begin
  assert d #>> '{rateCards,svc-pkg,startingPriceDisplay}' = 'From ₹3,500*', 'package starting price';
  assert d #>> '{rateCards,svc-pkg,packages,0,priceDisplay}' = '₹3,500*', 'package price';
  assert d #>> '{rateCards,svc-fixed,startingPriceDisplay}' = '₹1,100', 'fixed starting price';
  assert d #>> '{rateCards,svc-fixed,packages,0,priceDisplay}' = '₹1,100', 'fixed package price';
  assert d #>> '{rateCards,svc-custom,startingPriceDisplay}' = 'Custom Quote', 'custom quote';
  assert d #>> '{samagriOptions,0,priceDisplay}' = '₹950', 'samagri price';
  assert d #>> '{samagriOptions,1,priceDisplay}' = 'Price to be confirmed', 'samagri unconfirmed';
end $$;

-- An invalid insert is rejected
delete from public.pricing;
select pgtest.expect_error($$insert into public.pricing (id, data) values (1, '{}')$$, 'must have rateCards');
insert into public.pricing (id, data) values (1, pgtest.fixture());

-- Admin edit: derives again, archives the old version, records who saved
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', true);
set local role authenticated;
update public.pricing set data = jsonb_set(data, '{rateCards,svc-pkg,minPrice}', '4000');
reset role;

do $$
declare d jsonb := (select data from public.pricing where id = 1);
begin
  assert d #>> '{rateCards,svc-pkg,startingPriceDisplay}' = 'From ₹4,000*', 'derived after edit';
  assert (select updated_by from public.pricing where id = 1) = '00000000-0000-0000-0000-0000000000a1', 'updated_by';
  assert (select count(*) from public.pricing_history) = 1, 'one history row';
  assert (select data #>> '{rateCards,svc-pkg,minPrice}' from public.pricing_history) = '3500', 'history holds the old value';
end $$;

-- An invalid admin edit is rejected and leaves no extra history
set local role authenticated;
select pgtest.expect_error($$update public.pricing set data = jsonb_set(data, '{rateCards,svc-pkg,minPrice}', '-5')$$, 'rateCards.svc-pkg.minPrice');
reset role;
do $$ begin
  assert (select count(*) from public.pricing_history) = 1, 'failed edit must not archive';
end $$;

rollback;
select 'trigger tests passed' as result;
