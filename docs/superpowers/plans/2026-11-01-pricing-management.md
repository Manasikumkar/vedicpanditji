# Pricing Management (Supabase + Vercel) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the owner edit all website pricing (English, Hindi, Marathi text) in a login-protected `/admin` editor backed by Supabase, with instant display on the live site and a background Vercel rebuild.

**Architecture:** One JSONB document in a Supabase `pricing` table, guarded by row-level security and a Postgres validate/derive trigger, with a history table for revert. The Vite site loads a bundled `pricing.json` (refreshed at build time) and swaps in the live document from Supabase at runtime. A Supabase webhook calls a Vercel deploy hook after every change.

**Tech Stack:** Supabase (Postgres, Auth, RLS, `psql` tests), Vercel, React 19 + Vite, `@supabase/supabase-js` (admin chunk only), Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-01-pricing-backend-design.md`

**Conventions used below**
- `REPO` = `/Users/abhishek/vedicpanditji/vedicpanditji` (git root). `frontend/` and `supabase/` are inside it.
- Every commit ends with: `-m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"`.
- SQL tests run against your Supabase project inside a transaction that is always rolled back. `SUPABASE_DB_URL` is the project's Postgres connection string.

## File structure

| Path | Responsibility |
|---|---|
| `supabase/migrations/20261101000001_pricing_tables.sql` | Tables, RLS, grants, `is_pricing_admin()` |
| `supabase/migrations/20261101000002_pricing_validation.sql` | `validate_pricing()` and its helpers |
| `supabase/migrations/20261101000003_pricing_triggers.sql` | `pricing_inr()`, `pricing_derive()`, validate and history triggers |
| `supabase/migrations/20261101000004_seed_pricing.sql` | Generated seed from `pricing.json` (Task 7) |
| `supabase/tests/_fixture.sql` | Shared test helpers (`pgtest.fixture()`, `pgtest.expect_error()`) |
| `supabase/tests/01_rls.test.sql`, `02_validation.test.sql`, `03_triggers.test.sql` | SQL tests |
| `frontend/src/utils/localize.js` (+ test) | Resolve `{en,hi,mr}` text with English fallback |
| `frontend/src/data/pricing.json` | Bundled pricing document (generated once, then refreshed at build) |
| `frontend/src/data/pujaPricing.js` | Constants and lookup functions, now data-driven |
| `frontend/src/data/pujaPackagesData.js` | Re-exports |
| `frontend/src/services/pricingService.js` | Fetch live pricing from Supabase |
| `frontend/scripts/fetch-pricing.mjs` | `prebuild`: refresh `pricing.json` from Supabase |
| `frontend/src/admin/*` | Admin helpers (`pricingDoc.js` + test), components, `admin.css` |
| `frontend/src/pages/AdminPage.jsx` | Admin page (session, load, save, revert) |
| `frontend/vercel.json` | Vercel config |

One-time scripts (deleted in Task 15): `frontend/scripts/legacy/`, `export-legacy-pricing.mjs`, `make-seed-sql.mjs`, `check-pricing-equivalence.mjs`.

---

### Task 1: Sync the spec with decisions made while planning

**Files:**
- Modify: `docs/superpowers/specs/2026-11-01-pricing-backend-design.md`

- [ ] **Step 1: Apply three edits**

In the "Access and security" section replace
`- Only the admin user, identified by user ID in the policy, can update \`pricing\`. Nobody can insert or delete rows through the API.`
with
`- Only an admin can update \`pricing\`. Admins are the user IDs listed in an \`admin_users\` table that clients cannot read or write; the policies call a \`security definer\` function \`is_pricing_admin()\`. Column-level grants let an admin change only the \`data\` column. Nobody can insert or delete rows through the API.`

In the "Validation (Postgres)" section replace
`A \`BEFORE UPDATE\` trigger on \`pricing\` calls it and also recomputes the display strings.`
with
`A \`BEFORE INSERT OR UPDATE\` trigger on \`pricing\` calls it, so the seed is validated too, and also recomputes the display strings. Prices must be whole numbers.`

In the "Admin editor" section replace
`- Postgres validation errors are shown against the failing field.`
with
`- Postgres validation errors appear in a banner that names the failing path, and the editor jumps to the service or tab that contains it.`

- [ ] **Step 2: Commit**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add docs/superpowers/specs/2026-11-01-pricing-backend-design.md
git commit -m "docs: sync pricing spec with plan decisions" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Supabase project setup (manual, user)

**Files:**
- Create: `supabase/config.toml` (generated)

- [ ] **Step 1: Create the project**

In the Supabase dashboard create a project (any name, region closest to Pune, for example Mumbai). Save the database password.

- [ ] **Step 2: Collect credentials**

From **Project Settings → API** copy the Project URL and the `anon` public key (or publishable key). From **Connect → Session pooler** copy the Postgres connection string and put your database password in it. Then:

```bash
export SUPABASE_DB_URL='postgresql://postgres.<ref>:<password>@<host>:5432/postgres'
psql "$SUPABASE_DB_URL" -c 'select 1'
```

Expected: a one-row result containing `1`.

- [ ] **Step 3: Init and link the CLI**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
supabase init
supabase login
supabase link --project-ref <PROJECT_REF>
```

Answer `n` to any editor-settings prompts. Expected: `supabase/config.toml` exists and `link` prints `Finished supabase link`.

- [ ] **Step 4: Ignore generated CLI files and commit**

```bash
git add supabase/config.toml supabase/.gitignore
git commit -m "chore: init supabase project" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Tables, row-level security and grants (TDD)

**Files:**
- Create: `supabase/tests/_fixture.sql`
- Create: `supabase/tests/01_rls.test.sql`
- Create: `supabase/migrations/20261101000001_pricing_tables.sql`

- [ ] **Step 1: Write the shared test helpers**

`supabase/tests/_fixture.sql` (included inside each test's transaction):

```sql
-- Test helpers. Included with \i inside a transaction, so everything rolls back.
create schema pgtest;
grant usage on schema pgtest to anon, authenticated;

create function pgtest.fixture() returns jsonb language sql immutable as $f$
  select replace($raw$
  {
    "rateCards": {
      "svc-pkg": {
        "serviceId": "svc-pkg", "serviceName": @T, "category": "pujas",
        "model": "package-pricing", "approvalStatus": "proposed", "isBusinessApproved": false,
        "minPrice": 3500, "maxPrice": 5500, "startingPriceDisplay": "",
        "pricingNote": @T, "pricingRationale": @T,
        "researchBasis": "r", "missingBusinessInfo": "m",
        "packages": [
          {"id": "a", "name": @T, "tier": "standard", "badge": @T, "indicativePrice": 3500,
           "priceDisplay": "", "priceNote": @T, "inclusions": [@T], "exclusions": [@T],
           "includedSamagriIds": []},
          {"id": "b", "name": @T, "tier": "popular", "badge": @T, "indicativePrice": 5500,
           "priceDisplay": "", "priceNote": @T, "inclusions": [@T], "exclusions": [@T],
           "includedSamagriIds": ["opt-one"]}
        ]
      },
      "svc-fixed": {
        "serviceId": "svc-fixed", "serviceName": @T, "category": "pujas",
        "model": "fixed-price", "approvalStatus": "local-project-data", "isBusinessApproved": false,
        "minPrice": 1100, "maxPrice": 1100, "startingPriceDisplay": "",
        "pricingNote": @T, "pricingRationale": @T,
        "researchBasis": "r", "missingBusinessInfo": "m",
        "packages": [
          {"id": "a", "name": @T, "tier": "standard", "badge": @T, "indicativePrice": 1100,
           "priceDisplay": "", "priceNote": @T, "inclusions": [@T], "exclusions": [],
           "includedSamagriIds": []}
        ]
      },
      "svc-custom": {
        "serviceId": "svc-custom", "serviceName": @T, "category": "pujas",
        "model": "custom-quote", "approvalStatus": "needs-business-confirmation", "isBusinessApproved": false,
        "minPrice": null, "maxPrice": null, "startingPriceDisplay": "",
        "pricingNote": @T, "pricingRationale": @T,
        "researchBasis": "r", "missingBusinessInfo": "m",
        "packages": []
      }
    },
    "samagriOptions": [
      {"id": "opt-one", "name": @T, "description": @T, "price": 950, "priceDisplay": "",
       "category": "havan", "isPriceVerified": true, "includedInTiers": ["popular"]},
      {"id": "opt-two", "name": @T, "description": @T, "price": null, "priceDisplay": "",
       "category": "fresh", "isPriceVerified": false, "includedInTiers": []}
    ]
  }
  $raw$, '@T', '{"en":"x","hi":"","mr":""}')::jsonb
$f$;

-- Runs stmt as the current role and checks it fails with a message containing fragment.
create function pgtest.expect_error(stmt text, fragment text) returns void language plpgsql as $f$
begin
  begin
    execute stmt;
  exception when others then
    if strpos(sqlerrm, fragment) > 0 then
      return;
    end if;
    raise exception 'wrong error "%" (expected it to contain "%") for: %', sqlerrm, fragment, stmt;
  end;
  raise exception 'expected an error containing "%" but the statement succeeded: %', fragment, stmt;
end $f$;
```

- [ ] **Step 2: Write the failing RLS test**

`supabase/tests/01_rls.test.sql`:

```sql
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
```

- [ ] **Step 3: Run it and confirm it fails**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/01_rls.test.sql
```

Expected: FAIL with `relation "public.pricing" does not exist` (or `public.admin_users`).

- [ ] **Step 4: Write the migration**

`supabase/migrations/20261101000001_pricing_tables.sql`:

```sql
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
```

- [ ] **Step 5: Apply and re-run**

```bash
supabase db push
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/01_rls.test.sql
```

Expected: `db push` lists `20261101000001_pricing_tables.sql`, and the test prints `rls tests passed`.

- [ ] **Step 6: Commit**

```bash
git add supabase/tests supabase/migrations
git commit -m "feat(db): pricing tables with row-level security" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: `validate_pricing()` (TDD)

**Files:**
- Create: `supabase/tests/02_validation.test.sql`
- Create: `supabase/migrations/20261101000002_pricing_validation.sql`

- [ ] **Step 1: Write the failing test**

`supabase/tests/02_validation.test.sql`:

```sql
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
```

- [ ] **Step 2: Run it and confirm it fails**

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/02_validation.test.sql
```

Expected: FAIL with `function public.validate_pricing(jsonb) does not exist`.

- [ ] **Step 3: Write the migration**

`supabase/migrations/20261101000002_pricing_validation.sql`:

```sql
create function public.pricing_check_type(v jsonb, expected text, path text) returns void
language plpgsql immutable as $$
begin
  if coalesce(jsonb_typeof(v), 'missing') <> expected then
    raise exception 'pricing %: must be %', path, expected;
  end if;
end $$;

create function public.pricing_check_text(v jsonb, path text) returns void
language plpgsql immutable as $$
begin
  if jsonb_typeof(v) is distinct from 'object' then
    raise exception 'pricing %: must be an object with exactly the string keys en, hi and mr', path;
  end if;
  if (select array_agg(k order by k) from jsonb_object_keys(v) as k) is distinct from array['en', 'hi', 'mr']
     or jsonb_typeof(v->'en') is distinct from 'string'
     or jsonb_typeof(v->'hi') is distinct from 'string'
     or jsonb_typeof(v->'mr') is distinct from 'string' then
    raise exception 'pricing %: must be an object with exactly the string keys en, hi and mr', path;
  end if;
  if btrim(v->>'en') = '' then
    raise exception 'pricing %.en: English text is required', path;
  end if;
end $$;

create function public.pricing_check_price(v jsonb, path text, nullable boolean) returns void
language plpgsql immutable as $$
declare
  suffix text := case when nullable then ' (or null)' else '' end;
begin
  if v is null then
    raise exception 'pricing %: is required', path;
  end if;
  if jsonb_typeof(v) = 'null' then
    if nullable then
      return;
    end if;
    raise exception 'pricing %: must be a non-negative whole number%', path, suffix;
  end if;
  if jsonb_typeof(v) <> 'number' then
    raise exception 'pricing %: must be a non-negative whole number%', path, suffix;
  end if;
  if (v #>> '{}')::numeric < 0 or (v #>> '{}')::numeric <> trunc((v #>> '{}')::numeric) then
    raise exception 'pricing %: must be a non-negative whole number%', path, suffix;
  end if;
end $$;

create function public.validate_pricing(data jsonb) returns void
language plpgsql immutable as $$
declare
  card_id text;
  card jsonb;
  pkg jsonb;
  opt jsonb;
  item jsonb;
  ref jsonb;
  p text;
  pp text;
  i int;
  j int;
  samagri_ids text[] := '{}';
  pkg_ids text[];
begin
  if coalesce(jsonb_typeof(data), '') <> 'object'
     or coalesce(jsonb_typeof(data->'rateCards'), '') <> 'object'
     or coalesce(jsonb_typeof(data->'samagriOptions'), '') <> 'array' then
    raise exception 'pricing: must have rateCards (object) and samagriOptions (array)';
  end if;

  for opt, i in
    select t.value, (t.ord - 1)::int
    from jsonb_array_elements(data->'samagriOptions') with ordinality as t(value, ord)
  loop
    p := format('samagriOptions[%s]', i);
    perform public.pricing_check_type(opt, 'object', p);
    perform public.pricing_check_type(opt->'id', 'string', p || '.id');
    if (opt->>'id') = any (samagri_ids) then
      raise exception 'pricing %.id: duplicate id "%"', p, opt->>'id';
    end if;
    samagri_ids := samagri_ids || (opt->>'id');
    perform public.pricing_check_text(opt->'name', p || '.name');
    perform public.pricing_check_text(opt->'description', p || '.description');
    perform public.pricing_check_price(opt->'price', p || '.price', true);
    perform public.pricing_check_type(opt->'category', 'string', p || '.category');
    perform public.pricing_check_type(opt->'isPriceVerified', 'boolean', p || '.isPriceVerified');
    perform public.pricing_check_type(opt->'includedInTiers', 'array', p || '.includedInTiers');
  end loop;

  for card_id, card in select key, value from jsonb_each(data->'rateCards') loop
    p := 'rateCards.' || card_id;
    perform public.pricing_check_type(card, 'object', p);
    if card->>'serviceId' is distinct from card_id then
      raise exception 'pricing %.serviceId: must equal the rateCards key', p;
    end if;
    if card->>'model' is null
       or card->>'model' <> all (array['fixed-price', 'package-pricing', 'custom-quote']) then
      raise exception 'pricing %.model: must be fixed-price, package-pricing or custom-quote', p;
    end if;
    if card->>'approvalStatus' is null
       or card->>'approvalStatus' <> all (array['approved', 'local-project-data', 'proposed', 'needs-business-confirmation']) then
      raise exception 'pricing %.approvalStatus: must be approved, local-project-data, proposed or needs-business-confirmation', p;
    end if;
    perform public.pricing_check_type(card->'isBusinessApproved', 'boolean', p || '.isBusinessApproved');
    perform public.pricing_check_type(card->'category', 'string', p || '.category');
    perform public.pricing_check_price(card->'minPrice', p || '.minPrice', true);
    perform public.pricing_check_price(card->'maxPrice', p || '.maxPrice', true);
    if jsonb_typeof(card->'minPrice') = 'number' and jsonb_typeof(card->'maxPrice') = 'number'
       and (card->>'minPrice')::numeric > (card->>'maxPrice')::numeric then
      raise exception 'pricing %.minPrice: must not exceed maxPrice', p;
    end if;
    perform public.pricing_check_text(card->'serviceName', p || '.serviceName');
    perform public.pricing_check_text(card->'pricingNote', p || '.pricingNote');
    perform public.pricing_check_text(card->'pricingRationale', p || '.pricingRationale');
    perform public.pricing_check_type(card->'researchBasis', 'string', p || '.researchBasis');
    perform public.pricing_check_type(card->'missingBusinessInfo', 'string', p || '.missingBusinessInfo');
    perform public.pricing_check_type(card->'packages', 'array', p || '.packages');

    pkg_ids := '{}';
    for pkg, i in
      select t.value, (t.ord - 1)::int
      from jsonb_array_elements(card->'packages') with ordinality as t(value, ord)
    loop
      pp := format('%s.packages[%s]', p, i);
      perform public.pricing_check_type(pkg, 'object', pp);
      perform public.pricing_check_type(pkg->'id', 'string', pp || '.id');
      if (pkg->>'id') = any (pkg_ids) then
        raise exception 'pricing %.id: duplicate package id "%"', pp, pkg->>'id';
      end if;
      pkg_ids := pkg_ids || (pkg->>'id');
      perform public.pricing_check_text(pkg->'name', pp || '.name');
      perform public.pricing_check_type(pkg->'tier', 'string', pp || '.tier');
      perform public.pricing_check_text(pkg->'badge', pp || '.badge');
      perform public.pricing_check_price(pkg->'indicativePrice', pp || '.indicativePrice', true);
      perform public.pricing_check_text(pkg->'priceNote', pp || '.priceNote');

      perform public.pricing_check_type(pkg->'inclusions', 'array', pp || '.inclusions');
      for item, j in
        select t.value, (t.ord - 1)::int
        from jsonb_array_elements(pkg->'inclusions') with ordinality as t(value, ord)
      loop
        perform public.pricing_check_text(item, format('%s.inclusions[%s]', pp, j));
      end loop;

      perform public.pricing_check_type(pkg->'exclusions', 'array', pp || '.exclusions');
      for item, j in
        select t.value, (t.ord - 1)::int
        from jsonb_array_elements(pkg->'exclusions') with ordinality as t(value, ord)
      loop
        perform public.pricing_check_text(item, format('%s.exclusions[%s]', pp, j));
      end loop;

      perform public.pricing_check_type(pkg->'includedSamagriIds', 'array', pp || '.includedSamagriIds');
      for ref in select value from jsonb_array_elements(pkg->'includedSamagriIds') loop
        if jsonb_typeof(ref) <> 'string' or (ref #>> '{}') <> all (samagri_ids) then
          raise exception 'pricing %.includedSamagriIds: unknown samagri id %', pp, ref;
        end if;
      end loop;
    end loop;
  end loop;
end $$;
```

- [ ] **Step 4: Apply and re-run**

```bash
supabase db push
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/02_validation.test.sql
```

Expected: `db push` applies `20261101000002_pricing_validation.sql`, and the test prints `validation tests passed`. If an `expect_error` reports `wrong error`, the message names the path that was actually raised; fix the function, not the test.

- [ ] **Step 5: Commit**

```bash
git add supabase/tests/02_validation.test.sql supabase/migrations/20261101000002_pricing_validation.sql
git commit -m "feat(db): validate_pricing function" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Derived display strings and triggers (TDD)

**Files:**
- Create: `supabase/tests/03_triggers.test.sql`
- Create: `supabase/migrations/20261101000003_pricing_triggers.sql`

- [ ] **Step 1: Write the failing test**

`supabase/tests/03_triggers.test.sql`:

```sql
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
```

- [ ] **Step 2: Run it and confirm it fails**

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f supabase/tests/03_triggers.test.sql
```

Expected: FAIL with `function public.pricing_inr(unknown) does not exist`.

- [ ] **Step 3: Write the migration**

`supabase/migrations/20261101000003_pricing_triggers.sql`:

```sql
-- Whole rupees with Indian digit grouping: 1234567 -> ₹12,34,567
create function public.pricing_inr(v jsonb) returns text
language plpgsql immutable as $$
declare
  digits text := trunc((v #>> '{}')::numeric)::text;
begin
  if length(digits) <= 3 then
    return '₹' || digits;
  end if;
  return '₹' || regexp_replace(left(digits, -3), '(\d)(?=(\d{2})+$)', '\1,', 'g') || ',' || right(digits, 3);
end $$;

create function public.pricing_derive_card(card jsonb) returns jsonb
language plpgsql immutable as $$
declare
  fixed boolean := card->>'model' = 'fixed-price';
begin
  card := jsonb_set(card, '{startingPriceDisplay}', to_jsonb(
    case when jsonb_typeof(card->'minPrice') = 'null' then 'Custom Quote'
         when fixed then public.pricing_inr(card->'minPrice')
         else 'From ' || public.pricing_inr(card->'minPrice') || '*' end));
  return jsonb_set(card, '{packages}', coalesce((
    select jsonb_agg(jsonb_set(t.value, '{priceDisplay}', to_jsonb(
      case when jsonb_typeof(t.value->'indicativePrice') = 'null' then 'Custom Quote'
           when fixed then public.pricing_inr(t.value->'indicativePrice')
           else public.pricing_inr(t.value->'indicativePrice') || '*' end)) order by t.ord)
    from jsonb_array_elements(card->'packages') with ordinality as t(value, ord)
  ), '[]'::jsonb));
end $$;

create function public.pricing_derive(data jsonb) returns jsonb
language sql immutable as $$
  select data || jsonb_build_object(
    'rateCards', coalesce((
      select jsonb_object_agg(key, public.pricing_derive_card(value))
      from jsonb_each(data->'rateCards')
    ), '{}'::jsonb),
    'samagriOptions', coalesce((
      select jsonb_agg(jsonb_set(t.value, '{priceDisplay}', to_jsonb(
        case when jsonb_typeof(t.value->'price') = 'null' then 'Price to be confirmed'
             else public.pricing_inr(t.value->'price') end)) order by t.ord)
      from jsonb_array_elements(data->'samagriOptions') with ordinality as t(value, ord)
    ), '[]'::jsonb)
  );
$$;

create function public.pricing_before_write() returns trigger
language plpgsql as $$
begin
  perform public.validate_pricing(new.data);
  new.data := public.pricing_derive(new.data);
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;

create trigger pricing_before_write
  before insert or update on public.pricing
  for each row execute function public.pricing_before_write();

-- Runs as the table owner so clients never need insert rights on the history table.
create function public.pricing_archive() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.pricing_history (data, saved_at, saved_by)
  values (old.data, old.updated_at, old.updated_by);
  return new;
end $$;

create trigger pricing_archive
  after update on public.pricing
  for each row execute function public.pricing_archive();
```

- [ ] **Step 4: Apply and run all three SQL test files**

```bash
supabase db push
for f in supabase/tests/0*.test.sql; do psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f "$f" || break; done
```

Expected: `rls tests passed`, `validation tests passed`, `trigger tests passed`.

- [ ] **Step 5: Commit**

```bash
git add supabase/tests/03_triggers.test.sql supabase/migrations/20261101000003_pricing_triggers.sql
git commit -m "feat(db): derive display strings and archive history on save" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: `localize` utility (TDD)

**Files:**
- Create: `frontend/src/utils/localize.test.js`
- Create: `frontend/src/utils/localize.js`
- Modify: `frontend/package.json` (add `test` script)

- [ ] **Step 1: Add the test script**

In `frontend/package.json` `scripts`, add after `"lint": "oxlint",`:

```json
    "test": "node --test \"src/**/*.test.js\"",
```

- [ ] **Step 2: Write the failing test**

`frontend/src/utils/localize.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { isText, localize } from './localize.js';

const text = (en, hi = '', mr = '') => ({ en, hi, mr });

test('isText accepts only objects with exactly en, hi and mr strings', () => {
  assert.equal(isText(text('a')), true);
  assert.equal(isText({ en: 'a', hi: '' }), false);
  assert.equal(isText({ en: 'a', hi: '', mr: '', fr: '' }), false);
  assert.equal(isText({ en: 1, hi: '', mr: '' }), false);
  assert.equal(isText(null), false);
  assert.equal(isText(['a']), false);
  assert.equal(isText('a'), false);
});

test('localize returns the requested language', () => {
  assert.equal(localize(text('Puja', 'पूजा', 'पूजा-मr'), 'hi'), 'पूजा');
  assert.equal(localize(text('Puja', 'पूजा', 'पूजा-मr'), 'mr'), 'पूजा-मr');
});

test('localize falls back to English when the translation is empty', () => {
  assert.equal(localize(text('Puja', '', 'मराठी'), 'hi'), 'Puja');
  assert.equal(localize(text('Puja'), 'mr'), 'Puja');
});

test('localize defaults to English', () => {
  assert.equal(localize(text('Puja', 'पूजा')), 'Puja');
});

test('localize walks nested objects and arrays and keeps other values', () => {
  const input = {
    id: 'x',
    price: 3500,
    approved: false,
    missing: null,
    name: text('Name', 'नाम'),
    items: [text('One', 'एक'), text('Two')],
    nested: { badge: text('Badge', 'बैज') }
  };
  assert.deepEqual(localize(input, 'hi'), {
    id: 'x',
    price: 3500,
    approved: false,
    missing: null,
    name: 'नाम',
    items: ['एक', 'Two'],
    nested: { badge: 'बैज' }
  });
});
```

- [ ] **Step 3: Run it and confirm it fails**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
npm test
```

Expected: FAIL with `Cannot find module` for `./localize.js`.

- [ ] **Step 4: Implement**

`frontend/src/utils/localize.js`:

```js
const LANGS = ['en', 'hi', 'mr'];

// A translatable text value is an object with exactly the string keys en, hi and mr.
export function isText(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === LANGS.length && LANGS.every((k) => typeof value[k] === 'string');
}

// Replaces every text value in a structure with its string in `lang`, falling back to English.
export function localize(value, lang = 'en') {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (isText(value)) return value[lang] || value.en;
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, lang)]));
  }
  return value;
}
```

- [ ] **Step 5: Run and commit**

```bash
npm test
```

Expected: 5 tests pass.

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/package.json frontend/src/utils/localize.js frontend/src/utils/localize.test.js
git commit -m "feat: localize helper with English fallback" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Export legacy data to `pricing.json` and generate the seed

**Files:**
- Create (temporary): `frontend/scripts/legacy/pujaPricing.legacy.js`
- Create (temporary): `frontend/scripts/export-legacy-pricing.mjs`
- Create (temporary): `frontend/scripts/make-seed-sql.mjs`
- Create: `frontend/src/data/pricing.json` (generated)
- Create: `supabase/migrations/20261101000004_seed_pricing.sql` (generated)

- [ ] **Step 1: Snapshot the legacy module**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
mkdir -p scripts/legacy
cp src/data/pujaPricing.js scripts/legacy/pujaPricing.legacy.js
```

- [ ] **Step 2: Write the export script**

`frontend/scripts/export-legacy-pricing.mjs`:

```js
import fs from 'node:fs';
import { COMPLETE_59_PUJA_RATE_CARDS, OPTIONAL_SAMAGRI_OPTIONS } from './legacy/pujaPricing.legacy.js';

const t = (en) => ({ en, hi: '', mr: '' });

const rateCards = {};
for (const [id, card] of Object.entries(COMPLETE_59_PUJA_RATE_CARDS)) {
  rateCards[id] = {
    ...card,
    serviceName: t(card.serviceName),
    pricingNote: t(card.pricingNote),
    pricingRationale: t(card.pricingRationale),
    packages: card.packages.map((pkg) => ({
      ...pkg,
      name: t(pkg.name),
      badge: t(pkg.badge),
      priceNote: t(pkg.priceNote),
      inclusions: pkg.inclusions.map((s) => t(s)),
      exclusions: pkg.exclusions.map((s) => t(s))
    }))
  };
}

const samagriOptions = OPTIONAL_SAMAGRI_OPTIONS.map((o) => ({
  ...o,
  name: t(o.name),
  description: t(o.description)
}));

const target = new URL('../src/data/pricing.json', import.meta.url);
fs.writeFileSync(target, JSON.stringify({ rateCards, samagriOptions }, null, 2) + '\n');
console.log(`pricing.json written: ${Object.keys(rateCards).length} rate cards, ${samagriOptions.length} samagri options`);
```

- [ ] **Step 3: Write the seed generator**

`frontend/scripts/make-seed-sql.mjs`:

```js
import fs from 'node:fs';

const json = fs.readFileSync(new URL('../src/data/pricing.json', import.meta.url), 'utf8');
if (json.includes('$seed$')) throw new Error('pricing.json contains the dollar-quote tag');

const target = new URL('../../supabase/migrations/20261101000004_seed_pricing.sql', import.meta.url);
fs.writeFileSync(
  target,
  `-- Generated from frontend/src/data/pricing.json. Validated by the pricing_before_write trigger.\n` +
    `insert into public.pricing (id, data) values (1, $seed$${json}$seed$::jsonb)\n` +
    `on conflict (id) do nothing;\n`
);
console.log('seed migration written');
```

- [ ] **Step 4: Generate both files**

```bash
node scripts/export-legacy-pricing.mjs
node scripts/make-seed-sql.mjs
```

Expected: `pricing.json written: 59 rate cards, 6 samagri options` and `seed migration written`.

- [ ] **Step 5: Commit the generated data**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/src/data/pricing.json supabase/migrations/20261101000004_seed_pricing.sql
git commit -m "feat: export legacy pricing to pricing.json and seed migration" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

The scripts and the `scripts/legacy` copy stay uncommitted until Task 9 uses them, then are deleted in Task 15.

---

### Task 8: Load the seed into Supabase

**Files:** none (applies the migration from Task 7)

- [ ] **Step 1: Push the seed**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
supabase db push
```

Expected: `20261101000004_seed_pricing.sql` applies without error. A validation failure here prints `pricing <path>: <message>`; fix `export-legacy-pricing.mjs`, regenerate, and push again.

- [ ] **Step 2: Check the stored document**

```bash
psql "$SUPABASE_DB_URL" -At -c "select count(*) from jsonb_object_keys((select data->'rateCards' from public.pricing)); select data #>> '{rateCards,new-vehicle-puja,startingPriceDisplay}', data #>> '{rateCards,griha-pravesh,startingPriceDisplay}' from public.pricing;"
```

Expected: `59`, then `₹1,100|From ₹3,500*`.

- [ ] **Step 3: Re-run the SQL tests**

```bash
for f in supabase/tests/0*.test.sql; do psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -q -f "$f" || break; done
```

Expected: all three pass (they work on their own fixture inside rolled-back transactions, so the seed row is unaffected).

---

### Task 9: Make `pujaPricing.js` data-driven (equivalence-checked)

**Files:**
- Create (temporary): `frontend/scripts/check-pricing-equivalence.mjs`
- Modify: `frontend/src/data/pujaPricing.js`
- Modify: `frontend/src/data/pujaPackagesData.js`
- Modify: `frontend/src/components/common/BookingModal.jsx`
- Modify: `frontend/src/components/pricing/PricingPackagesSection.jsx`
- Modify: `frontend/vite.config.js`

- [ ] **Step 1: Write the equivalence check (fails until the rewrite is done)**

`frontend/scripts/check-pricing-equivalence.mjs`:

```js
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import * as legacy from './legacy/pujaPricing.legacy.js';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const plain = (v) => JSON.parse(JSON.stringify(v));

try {
  const next = await vite.ssrLoadModule('./src/data/pujaPricing.js');
  const ids = [...Object.keys(legacy.COMPLETE_59_PUJA_RATE_CARDS), 'unknown-service'];
  let checks = 0;

  for (const id of ids) {
    assert.deepEqual(plain(next.getPricingDisplay(id)), plain(legacy.getPricingDisplay(id)), `getPricingDisplay ${id}`);
    assert.deepEqual(plain(next.getPricingDisplay(id, 'hi')), plain(legacy.getPricingDisplay(id)), `hi fallback ${id}`);
    checks += 2;
    for (const city of ['Pune', 'Mumbai', 'Online']) {
      assert.deepEqual(plain(next.getPujaPricing(id, city)), plain(legacy.getPujaPricing(id, city)), `getPujaPricing ${id} ${city}`);
      assert.deepEqual(plain(next.getPackagesForService(id, city)), plain(legacy.getPackagesForService(id, city)), `getPackagesForService ${id} ${city}`);
      checks += 2;
    }
  }

  assert.deepEqual(plain(next.getOptionalSamagriOptions()), plain(legacy.OPTIONAL_SAMAGRI_OPTIONS), 'samagri options');

  const pkg = legacy.COMPLETE_59_PUJA_RATE_CARDS['bhoomi-puja'].packages[1];
  const extras = ['opt-flowers', 'opt-havan-samagri', 'opt-cow-ghee'];
  assert.deepEqual(next.calculateBookingTotal(pkg, extras), legacy.calculateBookingTotal(pkg, extras), 'calculateBookingTotal');
  checks += 2;

  console.log(`OK: ${checks} comparisons identical`);
} finally {
  await vite.close();
}
```

Run it now to confirm it fails:

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
node scripts/check-pricing-equivalence.mjs
```

Expected: FAIL with `next.getOptionalSamagriOptions is not a function` (or a `getPricingDisplay` mismatch), because `pujaPricing.js` is still the old file.

- [ ] **Step 2: Strip the inline data out of `pujaPricing.js`**

```bash
START=$(grep -n "4. HELPER FUNCTIONS" src/data/pujaPricing.js | cut -d: -f1)
echo "helpers title at line $START"
sed -i '' "25,$((START-2))d" src/data/pujaPricing.js
sed -n '18,40p' src/data/pujaPricing.js
```

Expected: the printout shows the `PUBLISH_PROPOSED_PRICES_TO_CUSTOMER` line, then a `// ====` line, `// 4. HELPER FUNCTIONS`, another `// ====` line and `export function getServiceId`. The 2,800 lines of data are gone.

- [ ] **Step 3: Replace the file header and add the data layer**

Edit `frontend/src/data/pujaPricing.js`. Replace the first two lines

```js
// Centralized Static Puja Pricing Architecture & Rate Card for VedicPanditji
// Strictly adheres to static React/Vite architecture (NO database, NO backend, NO CMS)
```

with

```js
// Puja pricing lookups for VedicPanditji.
// Rate cards and samagri add-ons live in pricing.json (managed in Supabase through /admin);
// this file only adds lookup, localization and booking-total logic on top.
import pricingSeed from './pricing.json';
import { localize } from '../utils/localize.js';
```

Then replace the single line `export const PUBLISH_PROPOSED_PRICES_TO_CUSTOMER = true;` with:

```js
export const PUBLISH_PROPOSED_PRICES_TO_CUSTOMER = true;

// ============================================================================
// DATA LAYER
// pricing.json is the bundled copy; setPricingData swaps in the live Supabase copy.
// ============================================================================
let pricingData = pricingSeed;
let views = new Map();

export function setPricingData(next) {
  pricingData = next;
  views = new Map();
}

// Localized, cached view of the pricing data for one language.
function viewFor(lang) {
  if (!views.has(lang)) {
    views.set(lang, {
      rateCards: localize(pricingData.rateCards, lang),
      samagri: localize(pricingData.samagriOptions, lang)
    });
  }
  return views.get(lang);
}

export function getOptionalSamagriOptions(lang = 'en') {
  return viewFor(lang).samagri;
}
```

- [ ] **Step 4: Point the helpers at the data layer**

```bash
sed -i '' 's/COMPLETE_59_PUJA_RATE_CARDS\[serviceId\]/viewFor(lang).rateCards[serviceId]/g' src/data/pujaPricing.js
sed -i '' 's/return COMPLETE_59_PUJA_RATE_CARDS;/return viewFor(lang).rateCards;/' src/data/pujaPricing.js
sed -i '' 's/^export function getPujaRateCard(serviceOrId) {/export function getPujaRateCard(serviceOrId, lang = '"'"'en'"'"') {/' src/data/pujaPricing.js
sed -i '' 's/^export function getAllPujaRateCards() {/export function getAllPujaRateCards(lang = '"'"'en'"'"') {/' src/data/pujaPricing.js
sed -i '' "s/^export function getPujaPricing(serviceOrId, city = 'Pune') {/export function getPujaPricing(serviceOrId, city = 'Pune', lang = 'en') {/" src/data/pujaPricing.js
sed -i '' "s/^export function getPackagesForService(serviceOrId, city = 'Pune') {/export function getPackagesForService(serviceOrId, city = 'Pune', lang = 'en') {/" src/data/pujaPricing.js
sed -i '' 's/const pricing = getPujaPricing(serviceOrId, city);/const pricing = getPujaPricing(serviceOrId, city, lang);/' src/data/pujaPricing.js
sed -i '' 's/^export function getPricingDisplay(serviceOrId) {/export function getPricingDisplay(serviceOrId, lang = '"'"'en'"'"') {/' src/data/pujaPricing.js
sed -i '' 's/const item = OPTIONAL_SAMAGRI_OPTIONS.find(opt => opt.id === id);/const item = getOptionalSamagriOptions().find(opt => opt.id === id);/' src/data/pujaPricing.js
grep -n "COMPLETE_59\|OPTIONAL_SAMAGRI_OPTIONS\|PRESERVED_LOCAL" src/data/pujaPricing.js; grep -n "lang" src/data/pujaPricing.js
```

Expected: the first `grep` prints nothing. The second shows `lang` in the data layer, in `getPujaRateCard`, `getAllPujaRateCards`, `getPujaPricing`, `getPackagesForService` (signature and its inner call) and `getPricingDisplay`, each with its `viewFor(lang)` use.

- [ ] **Step 5: Update the re-export file**

Replace the whole of `frontend/src/data/pujaPackagesData.js`:

```js
// Re-export from centralized canonical pricing source (pujaPricing.js)
// Retained for backward-compatibility across existing components and services.

export {
  PRICING_MODELS,
  VERIFICATION_STATUS,
  getOptionalSamagriOptions,
  getServiceId,
  getPujaPricing,
  getPackagesForService,
  getPricingDisplay,
  getCityNote,
  calculateBookingTotal
} from './pujaPricing.js';
```

- [ ] **Step 6: Update `BookingModal.jsx`**

```bash
sed -i '' 's/^  OPTIONAL_SAMAGRI_OPTIONS,$/  getOptionalSamagriOptions,/' src/components/common/BookingModal.jsx
sed -i '' 's/OPTIONAL_SAMAGRI_OPTIONS\.find/samagriOptions.find/; s/OPTIONAL_SAMAGRI_OPTIONS\.map/samagriOptions.map/' src/components/common/BookingModal.jsx
```

Then edit `frontend/src/components/common/BookingModal.jsx`: replace

```js
    user
  } = useApp();
```

with

```js
    user
  } = useApp();
  const samagriOptions = getOptionalSamagriOptions();
```

- [ ] **Step 7: Update `PricingPackagesSection.jsx`**

```bash
sed -i '' 's/^  OPTIONAL_SAMAGRI_OPTIONS,$/  getOptionalSamagriOptions,/' src/components/pricing/PricingPackagesSection.jsx
sed -i '' 's/OPTIONAL_SAMAGRI_OPTIONS\.map/samagriOptions.map/' src/components/pricing/PricingPackagesSection.jsx
```

Then edit it: replace `  const { model, packages, hasPackages } = pricing;` with

```js
  const { model, packages, hasPackages } = pricing;
  const samagriOptions = getOptionalSamagriOptions();
```

Confirm nothing references the old name:

```bash
grep -rn "OPTIONAL_SAMAGRI_OPTIONS\|LOCAL_PROJECT_PACKAGES\|VERIFIED_PUJA_PACKAGES" src
```

Expected: no output.

- [ ] **Step 8: Keep the pricing JSON in the pricing chunk**

Edit `frontend/vite.config.js`: replace

```js
          if (id.includes('src/data/allPoojaServices') || id.includes('src/data/pujaPricing')) {
```

with

```js
          if (id.includes('src/data/allPoojaServices') || id.includes('src/data/pujaPricing') || id.includes('src/data/pricing.json')) {
```

- [ ] **Step 9: Run the equivalence check and the lint**

```bash
node scripts/check-pricing-equivalence.mjs
npm run lint
```

Expected: `OK: 357 comparisons identical` (59 services plus one unknown, 2 plus 6 comparisons each, plus 2 more) and a clean lint. Any mismatch names the function and service; fix the data layer, not the check.

- [ ] **Step 10: Commit**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/src frontend/vite.config.js
git commit -m "refactor: drive pricing lookups from pricing.json with language fallback" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Live pricing fetch and build-time refresh

**Files:**
- Create: `frontend/src/services/pricingService.js`
- Create: `frontend/scripts/fetch-pricing.mjs`
- Create: `frontend/.env.example`
- Modify: `frontend/src/context/AppContext.jsx`
- Modify: `frontend/package.json`

- [ ] **Step 1: Write the live fetch**

`frontend/src/services/pricingService.js`:

```js
import { setPricingData } from '../data/pujaPricing';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fetches the live pricing document and swaps it in. Returns true when new data was applied.
// Any failure keeps the bundled copy, so pages never render empty.
export async function loadLivePricing() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pricing?id=eq.1&select=data`, {
      headers: { apikey: SUPABASE_ANON_KEY },
      cache: 'no-store',
      signal: controller.signal
    });
    if (!res.ok) return false;
    const [row] = await res.json();
    const data = row?.data;
    if (!data?.rateCards || !Array.isArray(data.samagriOptions)) return false;
    setPricingData(data);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
```

- [ ] **Step 2: Re-render pages when live data arrives**

Edit `frontend/src/context/AppContext.jsx`. Add the import after `import { Analytics } from '../utils/analytics';`:

```js
import { loadLivePricing } from '../services/pricingService';
```

Replace

```js
  // Toast System
  const [toast, setToast] = useState(null);
```

with

```js
  // Live pricing: bumping the version re-renders every useApp consumer with the new prices
  const [pricingVersion, setPricingVersion] = useState(0);
  useEffect(() => {
    loadLivePricing().then((applied) => {
      if (applied) setPricingVersion((v) => v + 1);
    });
  }, []);

  // Toast System
  const [toast, setToast] = useState(null);
```

Replace

```js
      value={{
        BRAND_INFO,
```

with

```js
      value={{
        pricingVersion,
        BRAND_INFO,
```

- [ ] **Step 3: Write the build-time refresh**

`frontend/scripts/fetch-pricing.mjs`:

```js
import fs from 'node:fs';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;
const target = new URL('../src/data/pricing.json', import.meta.url);

async function main() {
  if (!url || !key) {
    console.log('fetch-pricing: no Supabase env vars, keeping committed pricing.json');
    return;
  }
  const res = await fetch(`${url}/rest/v1/pricing?id=eq.1&select=data`, {
    headers: { apikey: key },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [row] = await res.json();
  if (!row?.data?.rateCards || !Array.isArray(row.data.samagriOptions)) {
    throw new Error('unexpected response shape');
  }
  fs.writeFileSync(target, JSON.stringify(row.data, null, 2) + '\n');
  console.log('fetch-pricing: pricing.json updated from Supabase');
}

// A failed refresh must never fail the build: the committed copy is still valid.
main().catch((e) => console.warn(`fetch-pricing: ${e.message}, keeping committed pricing.json`));
```

In `frontend/package.json` `scripts`, add before `"build"`:

```json
    "prebuild": "node scripts/fetch-pricing.mjs",
```

- [ ] **Step 4: Add the env template**

`frontend/.env.example`:

```
# Supabase project (Project Settings -> API). The anon/publishable key is safe to expose;
# row-level security is what protects the data.
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-or-publishable-key>
```

Create `frontend/.env.local` with the real values (it is git-ignored by `.env.*`).

- [ ] **Step 5: Verify**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
node scripts/fetch-pricing.mjs
git diff --stat src/data/pricing.json
```

With `.env.local` values exported (`set -a; source .env.local; set +a`), expected: `fetch-pricing: pricing.json updated from Supabase`, and the diff shows only key-order changes (jsonb reorders keys), no value changes. Without the variables: `no Supabase env vars, keeping committed pricing.json`. Then restore the committed copy:

```bash
git checkout src/data/pricing.json
npm run build
```

Expected: build completes (prerender writes the pages). Then:

```bash
npm run dev
```

Open a service page, then in the Supabase SQL editor run `update public.pricing set data = jsonb_set(data, '{rateCards,griha-pravesh,minPrice}', '3600');` is blocked for the postgres role? It is not: the SQL editor bypasses RLS, so it works. Reload the page: the starting price shows `From ₹3,600*` with no rebuild. Revert with `... '3500'`.

- [ ] **Step 6: Commit**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/src/services/pricingService.js frontend/scripts/fetch-pricing.mjs frontend/.env.example frontend/src/context/AppContext.jsx frontend/package.json
git commit -m "feat: live pricing from Supabase with build-time refresh" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Admin document helpers (TDD)

**Files:**
- Create: `frontend/src/admin/pricingDoc.test.js`
- Create: `frontend/src/admin/pricingDoc.js`

- [ ] **Step 1: Write the failing test**

`frontend/src/admin/pricingDoc.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyText,
  setIn,
  moveItem,
  nextPackageId,
  newPackage,
  countMissingTranslations,
  errorTarget
} from './pricingDoc.js';

test('setIn updates a nested value without mutating the original', () => {
  const doc = { a: { b: [1, 2, 3] }, c: 1 };
  const next = setIn(doc, ['a', 'b', 1], 9);
  assert.deepEqual(next, { a: { b: [1, 9, 3] }, c: 1 });
  assert.deepEqual(doc, { a: { b: [1, 2, 3] }, c: 1 });
  assert.equal(next.c, doc.c);
});

test('moveItem reorders and ignores out-of-range moves', () => {
  assert.deepEqual(moveItem(['a', 'b', 'c'], 0, 1), ['b', 'a', 'c']);
  assert.deepEqual(moveItem(['a', 'b', 'c'], 2, 1), ['a', 'c', 'b']);
  const list = ['a', 'b'];
  assert.equal(moveItem(list, 0, -1), list);
  assert.equal(moveItem(list, 1, 2), list);
});

test('nextPackageId picks an unused id within the card', () => {
  const card = { serviceId: 'bhoomi-puja', packages: [{ id: 'bhoomi-puja-pkg-2' }, { id: 'x' }] };
  assert.equal(nextPackageId(card), 'bhoomi-puja-pkg-3');
});

test('newPackage has every field the database requires', () => {
  const pkg = newPackage({ serviceId: 's', packages: [] });
  assert.deepEqual(Object.keys(pkg).sort(), [
    'badge', 'exclusions', 'id', 'includedSamagriIds', 'inclusions',
    'indicativePrice', 'name', 'priceDisplay', 'priceNote', 'tier'
  ]);
  assert.equal(pkg.id, 's-pkg-1');
  assert.deepEqual(pkg.name, emptyText());
});

test('countMissingTranslations counts empty Hindi and Marathi values', () => {
  const doc = {
    name: { en: 'A', hi: 'अ', mr: '' },
    items: [{ en: 'B', hi: '', mr: '' }, { en: 'C', hi: 'स', mr: 'क' }],
    price: 5
  };
  assert.deepEqual(countMissingTranslations(doc), { hi: 1, mr: 2 });
});

test('errorTarget finds the service or tab named in a database error', () => {
  assert.deepEqual(
    errorTarget('pricing rateCards.bhoomi-puja.packages[0].name.en: English text is required'),
    { tab: 'services', serviceId: 'bhoomi-puja' }
  );
  assert.deepEqual(errorTarget('pricing samagriOptions[2].price: must be a non-negative whole number'), { tab: 'samagri' });
  assert.equal(errorTarget('permission denied'), null);
  assert.equal(errorTarget(undefined), null);
});
```

- [ ] **Step 2: Run it and confirm it fails**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
npm test
```

Expected: FAIL with `Cannot find module './pricingDoc.js'`.

- [ ] **Step 3: Implement**

`frontend/src/admin/pricingDoc.js`:

```js
import { isText } from '../utils/localize.js';

export const emptyText = () => ({ en: '', hi: '', mr: '' });

// Immutable deep set: returns a copy of obj with the value at path replaced.
export function setIn(obj, path, value) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[head] = setIn(obj[head], rest, value);
  return copy;
}

export function moveItem(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

export function nextPackageId(card) {
  const taken = new Set(card.packages.map((p) => p.id));
  let n = card.packages.length + 1;
  while (taken.has(`${card.serviceId}-pkg-${n}`)) n += 1;
  return `${card.serviceId}-pkg-${n}`;
}

// priceDisplay is recomputed by the database trigger, so it starts empty.
export function newPackage(card) {
  return {
    id: nextPackageId(card),
    name: emptyText(),
    tier: 'standard',
    badge: emptyText(),
    indicativePrice: null,
    priceDisplay: '',
    priceNote: emptyText(),
    inclusions: [],
    exclusions: [],
    includedSamagriIds: []
  };
}

export function countMissingTranslations(value, counts = { hi: 0, mr: 0 }) {
  if (Array.isArray(value)) {
    value.forEach((v) => countMissingTranslations(v, counts));
  } else if (isText(value)) {
    if (!value.hi) counts.hi += 1;
    if (!value.mr) counts.mr += 1;
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => countMissingTranslations(v, counts));
  }
  return counts;
}

// Database errors look like "pricing rateCards.<id>.packages[0].name.en: ..."
export function errorTarget(message = '') {
  const card = message.match(/rateCards\.([^.\s[]+)/);
  if (card) return { tab: 'services', serviceId: card[1] };
  if (/samagriOptions\[/.test(message)) return { tab: 'samagri' };
  return null;
}
```

- [ ] **Step 4: Run and commit**

```bash
npm test
```

Expected: all localize and pricingDoc tests pass.

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/src/admin
git commit -m "feat(admin): document helpers" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Admin editor UI and `/admin` route

**Files:**
- Modify: `frontend/package.json` (dependency, via npm)
- Create: `frontend/src/admin/supabaseClient.js`, `LoginForm.jsx`, `Fields.jsx`, `ServiceEditor.jsx`, `SamagriEditor.jsx`, `admin.css`
- Create: `frontend/src/pages/AdminPage.jsx`
- Modify: `frontend/src/context/AppContext.jsx`
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Install the client**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
npm install @supabase/supabase-js
```

Expected: `package.json` lists `@supabase/supabase-js` under `dependencies`.

- [ ] **Step 2: Supabase client and login form**

`frontend/src/admin/supabaseClient.js`:

```js
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
```

`frontend/src/admin/LoginForm.jsx`:

```jsx
import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const message = await onLogin(email, password);
    if (message) setError(message);
    setBusy(false);
  };

  return (
    <form className="admin-login" onSubmit={submit}>
      <h1>Admin login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
```

- [ ] **Step 3: Field components**

`frontend/src/admin/Fields.jsx`:

```jsx
import React from 'react';
import { emptyText, moveItem } from './pricingDoc';

const LANGS = ['en', 'hi', 'mr'];

// One translatable text value: an input per visible language. Empty hi/mr are highlighted.
export function TextField({ label, value, onChange, lang, multiline }) {
  const visible = lang === 'all' ? LANGS : [lang];
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {visible.map((l) => (
        <div className="lang-row" key={l}>
          <span className={`lang-tag${l !== 'en' && !value[l] ? ' missing' : ''}`}>{l.toUpperCase()}</span>
          <Tag value={value[l]} rows={multiline ? 2 : undefined} onChange={(e) => onChange({ ...value, [l]: e.target.value })} />
        </div>
      ))}
    </div>
  );
}

// An ordered list of translatable text values (inclusions, exclusions).
export function TextList({ label, items, onChange, lang }) {
  return (
    <div className="field">
      <label>{label}</label>
      {items.map((item, i) => (
        <div className="list-item" key={i}>
          <TextField value={item} lang={lang} onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))} />
          <div className="row-actions">
            <button type="button" disabled={i === 0} onClick={() => onChange(moveItem(items, i, i - 1))}>↑</button>
            <button type="button" disabled={i === items.length - 1} onClick={() => onChange(moveItem(items, i, i + 1))}>↓</button>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, emptyText()])}>+ Add</button>
    </div>
  );
}

export function NumberField({ label, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        step="1"
        value={value ?? ''}
        placeholder="empty = custom quote"
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
      />
    </div>
  );
}

export function PlainField({ label, value, onChange, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="field">
      <label>{label}</label>
      <Tag value={value} rows={multiline ? 2 : undefined} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
```

- [ ] **Step 4: Service and samagri editors**

`frontend/src/admin/ServiceEditor.jsx`:

```jsx
import React from 'react';
import { TextField, TextList, NumberField, PlainField } from './Fields';
import { setIn, moveItem, newPackage } from './pricingDoc';

const MODELS = ['fixed-price', 'package-pricing', 'custom-quote'];
const STATUSES = ['approved', 'local-project-data', 'proposed', 'needs-business-confirmation'];
const TIERS = ['standard', 'popular', 'premium'];

function Select({ label, value, options, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function ServiceEditor({ card, samagri, lang, onChange }) {
  const set = (path, value) => onChange(setIn(card, path, value));
  const setPkg = (i, key, value) => set(['packages', i, key], value);

  return (
    <div>
      <h2>{card.serviceName.en}</h2>
      <p className="muted">{card.serviceId}</p>

      <TextField label="Service name" value={card.serviceName} lang={lang} onChange={(v) => set(['serviceName'], v)} />
      <Select label="Pricing model" value={card.model} options={MODELS} onChange={(v) => set(['model'], v)} />
      <Select label="Approval status" value={card.approvalStatus} options={STATUSES} onChange={(v) => set(['approvalStatus'], v)} />
      <label className="check">
        <input type="checkbox" checked={card.isBusinessApproved} onChange={(e) => set(['isBusinessApproved'], e.target.checked)} />
        Business approved
      </label>
      <NumberField label="Minimum price (₹)" value={card.minPrice} onChange={(v) => set(['minPrice'], v)} />
      <NumberField label="Maximum price (₹)" value={card.maxPrice} onChange={(v) => set(['maxPrice'], v)} />
      <TextField label="Pricing note" multiline value={card.pricingNote} lang={lang} onChange={(v) => set(['pricingNote'], v)} />
      <TextField label="Pricing rationale" multiline value={card.pricingRationale} lang={lang} onChange={(v) => set(['pricingRationale'], v)} />
      <PlainField label="Research basis (internal, English only)" multiline value={card.researchBasis} onChange={(v) => set(['researchBasis'], v)} />
      <PlainField label="Missing business info (internal, English only)" multiline value={card.missingBusinessInfo} onChange={(v) => set(['missingBusinessInfo'], v)} />

      <h3>Packages</h3>
      {card.packages.map((pkg, i) => (
        <fieldset className="package" key={pkg.id}>
          <legend>{pkg.name.en || '(unnamed package)'} <code>{pkg.id}</code></legend>
          <TextField label="Package name" value={pkg.name} lang={lang} onChange={(v) => setPkg(i, 'name', v)} />
          <Select label="Tier" value={pkg.tier} options={TIERS} onChange={(v) => setPkg(i, 'tier', v)} />
          <TextField label="Badge" value={pkg.badge} lang={lang} onChange={(v) => setPkg(i, 'badge', v)} />
          <NumberField label="Price (₹)" value={pkg.indicativePrice} onChange={(v) => setPkg(i, 'indicativePrice', v)} />
          <TextField label="Price note" value={pkg.priceNote} lang={lang} onChange={(v) => setPkg(i, 'priceNote', v)} />
          <TextList label="Inclusions" items={pkg.inclusions} lang={lang} onChange={(v) => setPkg(i, 'inclusions', v)} />
          <TextList label="Exclusions" items={pkg.exclusions} lang={lang} onChange={(v) => setPkg(i, 'exclusions', v)} />
          <div className="field">
            <label>Samagri included in this package</label>
            {samagri.map((s) => (
              <label className="check" key={s.id}>
                <input
                  type="checkbox"
                  checked={pkg.includedSamagriIds.includes(s.id)}
                  onChange={(e) => setPkg(i, 'includedSamagriIds', e.target.checked
                    ? [...pkg.includedSamagriIds, s.id]
                    : pkg.includedSamagriIds.filter((x) => x !== s.id))}
                />
                {s.name.en}
              </label>
            ))}
          </div>
          <div className="row-actions">
            <button type="button" disabled={i === 0} onClick={() => set(['packages'], moveItem(card.packages, i, i - 1))}>Move up</button>
            <button type="button" disabled={i === card.packages.length - 1} onClick={() => set(['packages'], moveItem(card.packages, i, i + 1))}>Move down</button>
            <button type="button" onClick={() => set(['packages'], card.packages.filter((_, j) => j !== i))}>Remove package</button>
          </div>
        </fieldset>
      ))}
      <button type="button" onClick={() => set(['packages'], [...card.packages, newPackage(card)])}>+ Add package</button>
    </div>
  );
}
```

`frontend/src/admin/SamagriEditor.jsx`:

```jsx
import React from 'react';
import { TextField, NumberField, PlainField } from './Fields';
import { setIn } from './pricingDoc';

const TIERS = ['standard', 'popular', 'premium'];

export default function SamagriEditor({ items, lang, onChange }) {
  const set = (i, key, value) => onChange(items.map((item, j) => (j === i ? setIn(item, [key], value) : item)));

  return (
    <div>
      <h2>Samagri add-ons</h2>
      {items.map((item, i) => (
        <fieldset className="package" key={item.id}>
          <legend>{item.name.en || '(unnamed)'} <code>{item.id}</code></legend>
          <TextField label="Name" value={item.name} lang={lang} onChange={(v) => set(i, 'name', v)} />
          <TextField label="Description" multiline value={item.description} lang={lang} onChange={(v) => set(i, 'description', v)} />
          <NumberField label="Price (₹)" value={item.price} onChange={(v) => set(i, 'price', v)} />
          <PlainField label="Category" value={item.category} onChange={(v) => set(i, 'category', v)} />
          <label className="check">
            <input type="checkbox" checked={item.isPriceVerified} onChange={(e) => set(i, 'isPriceVerified', e.target.checked)} />
            Price verified
          </label>
          <div className="field">
            <label>Included in tiers</label>
            {TIERS.map((tier) => (
              <label className="check" key={tier}>
                <input
                  type="checkbox"
                  checked={item.includedInTiers.includes(tier)}
                  onChange={(e) => set(i, 'includedInTiers', e.target.checked
                    ? [...item.includedInTiers, tier]
                    : item.includedInTiers.filter((x) => x !== tier))}
                />
                {tier}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: The admin page**

`frontend/src/pages/AdminPage.jsx`:

```jsx
import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '../admin/supabaseClient';
import LoginForm from '../admin/LoginForm';
import ServiceEditor from '../admin/ServiceEditor';
import SamagriEditor from '../admin/SamagriEditor';
import { setIn, countMissingTranslations, errorTarget } from '../admin/pricingDoc';
import '../admin/admin.css';

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [doc, setDoc] = useState(null);
  const [saved, setSaved] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'ok' | 'error', text }
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState('all');
  const [tab, setTab] = useState('services');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return undefined;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('pricing').select('data').eq('id', 1).single();
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    setDoc(data.data);
    setSaved(data.data);
    setSelectedId((id) => id || Object.keys(data.data.rateCards)[0]);
  }, []);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : '';
  };

  const save = async () => {
    setBusy(true);
    setMessage(null);
    const { data, error } = await supabase.from('pricing').update({ data: doc }).eq('id', 1).select('data').single();
    setBusy(false);
    if (error) {
      // PGRST116: the update matched no row, which row-level security does for non-admins.
      const text = error.code === 'PGRST116' ? 'Not saved: this account is not an admin.' : error.message;
      setMessage({ type: 'error', text });
      const target = errorTarget(error.message);
      if (target) {
        setTab(target.tab);
        if (target.serviceId) setSelectedId(target.serviceId);
      }
      return;
    }
    setDoc(data.data);
    setSaved(data.data);
    setMessage({ type: 'ok', text: 'Saved. The live site shows it now; the rebuild finishes in a few minutes.' });
  };

  const revert = async () => {
    const { data, error } = await supabase
      .from('pricing_history')
      .select('data')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) {
      setMessage({ type: 'error', text: error ? error.message : 'No earlier version exists yet.' });
      return;
    }
    setDoc(data.data);
    setMessage({ type: 'ok', text: 'Previous version loaded. Review it, then click Save to apply.' });
  };

  if (!ready) return <p className="admin-note">Loading…</p>;
  if (!supabase) return <p className="admin-note">Supabase is not configured (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).</p>;
  if (!session) return <LoginForm onLogin={login} />;
  if (!doc) return <p className="admin-note">{message ? message.text : 'Loading pricing…'}</p>;

  const dirty = JSON.stringify(doc) !== JSON.stringify(saved);
  const missing = countMissingTranslations(doc);
  const q = query.trim().toLowerCase();
  const ids = Object.keys(doc.rateCards).filter(
    (id) => !q || id.includes(q) || doc.rateCards[id].serviceName.en.toLowerCase().includes(q)
  );
  const card = doc.rateCards[selectedId];

  return (
    <div className="admin">
      <header className="admin-bar">
        <strong>Pricing admin</strong>
        <span className="muted">{session.user.email}</span>
        <label>
          Language{' '}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="all">All</option>
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
        </label>
        <span className="muted">Missing: HI {missing.hi}, MR {missing.mr}</span>
        <span className="spacer" />
        <button type="button" onClick={revert} disabled={busy}>Load previous version</button>
        <button type="button" className="primary" onClick={save} disabled={busy || !dirty}>
          {busy ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
        </button>
        <button type="button" onClick={() => supabase.auth.signOut()}>Log out</button>
      </header>

      {message && <p className={message.type === 'error' ? 'admin-error' : 'admin-ok'}>{message.text}</p>}

      <nav className="admin-tabs">
        <button type="button" className={tab === 'services' ? 'active' : ''} onClick={() => setTab('services')}>Services</button>
        <button type="button" className={tab === 'samagri' ? 'active' : ''} onClick={() => setTab('samagri')}>Samagri add-ons</button>
      </nav>

      {tab === 'services' ? (
        <div className="admin-body">
          <aside className="admin-list">
            <input placeholder="Search services" value={query} onChange={(e) => setQuery(e.target.value)} />
            {ids.map((id) => (
              <button type="button" key={id} className={id === selectedId ? 'active' : ''} onClick={() => setSelectedId(id)}>
                {doc.rateCards[id].serviceName.en}
              </button>
            ))}
          </aside>
          <section className="admin-form">
            {card && (
              <ServiceEditor
                card={card}
                samagri={doc.samagriOptions}
                lang={lang}
                onChange={(next) => setDoc(setIn(doc, ['rateCards', selectedId], next))}
              />
            )}
          </section>
        </div>
      ) : (
        <section className="admin-form">
          <SamagriEditor items={doc.samagriOptions} lang={lang} onChange={(items) => setDoc({ ...doc, samagriOptions: items })} />
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Styles**

`frontend/src/admin/admin.css`:

```css
.admin { max-width: 1200px; margin: 0 auto; padding: 16px; font-family: system-ui, sans-serif; }
.admin-bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid #eae5d9; }
.admin-bar .spacer { flex: 1; }
.admin button { padding: 6px 12px; border: 1px solid #c9c2b0; border-radius: 6px; background: #fff; cursor: pointer; }
.admin button:disabled { opacity: 0.5; cursor: default; }
.admin button.primary { background: #bd4b23; border-color: #bd4b23; color: #fff; }
.admin-tabs { display: flex; gap: 8px; margin: 12px 0; }
.admin-tabs .active, .admin-list .active { background: #fdf3e7; border-color: #bd4b23; }
.admin-body { display: grid; grid-template-columns: 260px 1fr; gap: 16px; align-items: start; }
.admin-list { display: flex; flex-direction: column; gap: 4px; max-height: 80vh; overflow: auto; }
.admin-list button { text-align: left; }
.admin-list input, .admin-login input, .admin .field input, .admin .field textarea, .admin .field select { padding: 6px 8px; border: 1px solid #c9c2b0; border-radius: 6px; font: inherit; }
.admin .field { display: flex; flex-direction: column; gap: 4px; margin: 10px 0; }
.admin .field label { font-weight: 600; font-size: 13px; }
.admin .lang-row { display: flex; gap: 6px; align-items: flex-start; }
.admin .lang-row input, .admin .lang-row textarea { flex: 1; }
.admin .lang-tag { min-width: 28px; font-size: 11px; font-weight: 700; padding-top: 8px; color: #6b6558; }
.admin .lang-tag.missing { color: #bd4b23; }
.admin .check { display: flex; gap: 6px; align-items: center; margin: 4px 0; }
.admin .list-item { border-left: 3px solid #eae5d9; padding-left: 8px; margin: 6px 0; }
.admin .row-actions { display: flex; gap: 6px; margin: 4px 0; }
.admin .package { border: 1px solid #eae5d9; border-radius: 8px; margin: 12px 0; padding: 8px 12px; }
.admin .muted { color: #6b6558; font-size: 13px; }
.admin-error { background: #fdecea; color: #8a1c10; padding: 8px 12px; border-radius: 6px; }
.admin-ok { background: #eaf6ea; color: #1d5c1d; padding: 8px 12px; border-radius: 6px; }
.admin-note { padding: 40px 16px; text-align: center; }
.admin-login { display: flex; flex-direction: column; gap: 10px; max-width: 320px; margin: 80px auto; padding: 0 16px; }
.admin-login button { padding: 8px 12px; }
@media (max-width: 800px) { .admin-body { grid-template-columns: 1fr; } .admin-list { max-height: 200px; } }
```

- [ ] **Step 7: Route `/admin`**

Edit `frontend/src/context/AppContext.jsx`: replace

```js
    if (path === '/sitemap' || path === '/sitemap.html') return { route: 'sitemap', params: {} };
```

with

```js
    if (path === '/sitemap' || path === '/sitemap.html') return { route: 'sitemap', params: {} };
    if (path === '/admin') return { route: 'admin', params: {} };
```

Edit `frontend/src/App.jsx`:

Replace `const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));` with

```js
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
```

Replace `  const { currentRoute } = useApp();` with

```js
  const { currentRoute } = useApp();
  const isAdmin = currentRoute === 'admin';
```

Replace

```js
      case 'not-found':
        return <NotFoundPage />;
```

with

```js
      case 'admin':
        return <AdminPage />;
      case 'not-found':
        return <NotFoundPage />;
```

Replace `<Navbar />` with `{!isAdmin && <Navbar />}`, `<Footer />` with `{!isAdmin && <Footer />}`, and `<BookingModal />` with `{!isAdmin && <BookingModal />}`.

The route already gets `noindex, nofollow` from `getSeoMetadata`'s default branch, `public/robots.txt` already disallows `/admin`, and `scripts/prerender.js` has no admin entry, so the page is never prerendered or listed in `sitemap.xml`.

- [ ] **Step 8: Verify the build and the admin chunk**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
npm run lint
npm test
npm run build
ls dist/assets | grep -i admin
grep -c "supabase" dist/index.html
ls dist/admin 2>&1 | head -1
```

Expected: lint clean, tests pass, build completes, an `AdminPage-*.js` chunk exists, `grep -c` prints `0` (the entry HTML does not load Supabase), and `ls dist/admin` reports no such file (not prerendered).

- [ ] **Step 9: Commit**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/package.json frontend/package-lock.json frontend/src
git commit -m "feat(admin): login-protected pricing editor at /admin" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Admin account and end-to-end editor check (manual, user)

**Files:** none

- [ ] **Step 1: Lock down signups**

Supabase dashboard → **Authentication → Sign In / Providers**: turn **Allow new users to sign up** off.

- [ ] **Step 2: Create the admin user**

**Authentication → Users → Add user → Create new user**: enter your email and a strong password, tick **Auto Confirm User**.

- [ ] **Step 3: Register it as admin**

In the **SQL editor** (replace the email):

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'YOUR_EMAIL';
select count(*) from public.admin_users;
```

Expected: `1`.

- [ ] **Step 4: Exercise the editor locally**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji/frontend
npm run dev
```

Open `http://localhost:5173/admin` and check each of these:

1. Wrong password shows an error; the right one opens the editor with 59 services.
2. Change Griha Pravesh minimum price to `3600`, click **Save changes**. The banner says Saved. Reload the Griha Pravesh service page: it shows `From ₹3,600*`. The editor's preview of the saved doc also shows the regenerated display string.
3. Click **Load previous version**, check the price is back to `3500`, and click **Save changes**.
4. Clear the English service name and save: a red banner names `rateCards.griha-pravesh.serviceName.en`, and the editor stays on that service. Restore the name.
5. Type a Hindi service name, save, and confirm the **Missing: HI** counter drops by one.
6. Add a package, leave its name empty, save: the banner names `packages[...].name.en`. Remove the package again.
7. Log out, then in a private window open `/admin` and confirm you only see the login form.

---

### Task 14: Deploy to Vercel and wire the rebuild webhook (manual, user)

**Files:**
- Create: `frontend/vercel.json`

- [ ] **Step 1: Add the Vercel config**

`frontend/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [{ "source": "/admin", "destination": "/index.html" }]
}
```

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add frontend/vercel.json
git commit -m "chore: vercel config" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
git push origin main
```

(Push only when you are ready for the connected hosting to rebuild. The old GitHub Action also runs on push until Task 15.)

- [ ] **Step 2: Create the Vercel project**

In Vercel: **Add New → Project → import `badboybackagain/vedicpanditji`**. Set **Root Directory** to `frontend`, keep the Vite preset, and add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production and Preview. Deploy.

- [ ] **Step 3: Verify the preview deployment**

On the `*.vercel.app` URL check:

1. `/`, `/services`, `/services/griha-pravesh-puja` (use any real service slug) and `/about-us` load as prerendered pages (View Source shows real content, not an empty root).
2. A nonsense URL such as `/zzz` shows your NotFoundPage. If Vercel's own 404 appears instead, add `"rewrites": [..., { "source": "/(.*)", "destination": "/404/index.html" }]` after the admin rewrite and redeploy.
3. `/admin` shows the login page and works end to end as in Task 13.
4. The build log contains `fetch-pricing: pricing.json updated from Supabase`.

- [ ] **Step 4: Create the deploy hook and the webhook**

Vercel project → **Settings → Git → Deploy Hooks**: create one named `pricing-change` for branch `main` and copy its URL.

Supabase → **Database → Webhooks → Create a new hook**: name `pricing-rebuild`, table `pricing`, events **Update** only, type **HTTP Request**, method `POST`, URL = the deploy hook URL. Create it.

- [ ] **Step 5: Verify the rebuild**

In `/admin` change a price and save. Within seconds a new deployment named by the deploy hook appears in Vercel. When it finishes, View Source on that service page shows the new price in the prerendered HTML and in the schema.org JSON-LD. Revert the price afterwards.

- [ ] **Step 6: Move the domain**

Only after the checks above pass: in Vercel **Settings → Domains** add `vedicpanditji.com` and `www.vedicpanditji.com`, and change DNS as Vercel shows. Then re-run the Task 13 admin check and the rebuild check on the real domain.

---

### Task 15: Retire the old setup and clean up

Do this only after Task 14 Step 6 is verified on the real domain.

**Files:**
- Delete: `frontend/scripts/legacy/`, `frontend/scripts/export-legacy-pricing.mjs`, `frontend/scripts/make-seed-sql.mjs`, `frontend/scripts/check-pricing-equivalence.mjs`
- Delete: `backend/` (the Node probe)
- Delete: `.github/workflows/` file that publishes the `deploy` branch

- [ ] **Step 1: Remove the one-time scripts**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
rm -rf frontend/scripts/legacy frontend/scripts/export-legacy-pricing.mjs frontend/scripts/make-seed-sql.mjs frontend/scripts/check-pricing-equivalence.mjs
```

- [ ] **Step 2: Remove the probe and the old workflow**

```bash
rm -rf backend
git rm -r .github/workflows
git status --short
```

Expected: only deletions, plus nothing else unexpected.

- [ ] **Step 3: Final verification**

```bash
cd frontend
npm run lint && npm test && npm run build
```

Expected: lint clean, all tests pass, build completes.

- [ ] **Step 4: Commit**

```bash
cd /Users/abhishek/vedicpanditji/vedicpanditji
git add -A
git commit -m "chore: retire Enhance deploy workflow, node probe and one-time migration scripts" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Manual cleanup**

In Enhance, delete the `/probe` worker and the website once the domain no longer points to it. Delete the `deploy` branch on GitHub if nothing else uses it.

---

## Self-review against the spec

- **Tables, history, RLS, `admin_users`, column grants:** Task 3.
- **Validation rules (models, statuses, prices, min ≤ max, text shape, empty `en`, duplicate and unknown samagri IDs, per-card package IDs, `serviceId` key):** Task 4.
- **Generated display strings, history trigger, `updated_by`, insert-time validation of the seed:** Task 5 and Task 8.
- **Language-ready text, English fallback, `lang` argument:** Tasks 6, 9.
- **Frontend data layer, `setPricingData`, `getOptionalSamagriOptions`, dropped dead exports, consumers updated:** Tasks 9, 10.
- **Live fetch and re-render, build-time refresh with fallback:** Task 10.
- **Admin editor scope, EN/HI/MR inputs with a language switch and missing counter, add/remove/reorder packages and lists, revert, error banner that jumps to the service, noindex and no prerender or sitemap entry:** Tasks 11, 12.
- **Vercel root `frontend`, env vars, deploy hook plus Supabase webhook, retiring Enhance, the Action and the probe:** Tasks 14, 15.
- **Migration with before/after equivalence check across all services and cities:** Tasks 7, 9.
- **Tests:** SQL (Tasks 3 to 5, including anonymous and non-admin write blocks), Node (Tasks 6, 11), equivalence and build (Tasks 9, 12), manual end to end (Tasks 13, 14).

Names used across tasks match: `pgtest.fixture`, `pgtest.expect_error`, `validate_pricing`, `pricing_derive`, `pricing_inr`, `is_pricing_admin`, `setPricingData`, `getOptionalSamagriOptions`, `loadLivePricing`, `setIn`, `moveItem`, `newPackage`, `nextPackageId`, `countMissingTranslations`, `errorTarget`, `emptyText`.
