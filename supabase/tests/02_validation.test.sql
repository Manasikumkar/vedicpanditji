\set ON_ERROR_STOP on
begin;
\i supabase/tests/_fixture.sql

-- The fixture is valid. It reuses package id "a" in two services, which must be allowed.
select public.validate_pricing(pgtest.fixture());

-- Hindi and Marathi text may be filled in.
select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,serviceName,hi}', '"सेवा"'));

-- top level
select pgtest.expect_error($$select public.validate_pricing('{"rateCards":[]}')$$, 'must have rateCards');

-- rate card fields
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,serviceId}', '"other"'))$$, 'must equal the rateCards key');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,model}', '"weird"'))$$, 'rateCards.svc-pkg.model');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,approvalStatus}', '"weird"'))$$, 'rateCards.svc-pkg.approvalStatus');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,isBusinessApproved}', '"yes"'))$$, 'rateCards.svc-pkg.isBusinessApproved');

-- prices
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,minPrice}', '-5'))$$, 'rateCards.svc-pkg.minPrice: must be a non-negative whole number');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,minPrice}', '3500.5'))$$, 'rateCards.svc-pkg.minPrice: must be a non-negative whole number');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,minPrice}', '"cheap"'))$$, 'rateCards.svc-pkg.minPrice: must be a non-negative whole number');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,minPrice}', '9000'))$$, 'must not exceed maxPrice');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{samagriOptions,0,price}', '-1'))$$, 'samagriOptions[0].price');

-- text fields
select pgtest.expect_error($$select public.validate_pricing(pgtest.fixture() #- '{rateCards,svc-pkg,serviceName,hi}')$$, 'rateCards.svc-pkg.serviceName: must be an object with exactly');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,serviceName,fr}', '"x"'))$$, 'rateCards.svc-pkg.serviceName: must be an object with exactly');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,serviceName,en}', '"  "'))$$, 'rateCards.svc-pkg.serviceName.en: English text is required');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,packages,0,name,en}', '""'))$$, 'packages[0].name.en: English text is required');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,packages,0,inclusions,0}', '"plain string"'))$$, 'packages[0].inclusions[0]');

-- ids and references
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,packages,1,id}', '"a"'))$$, 'duplicate package id');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{samagriOptions,1,id}', '"opt-one"'))$$, 'duplicate id');
select pgtest.expect_error($$select public.validate_pricing(jsonb_set(pgtest.fixture(), '{rateCards,svc-pkg,packages,1,includedSamagriIds}', '["nope"]'))$$, 'unknown samagri id');

rollback;
select 'validation tests passed' as result;
