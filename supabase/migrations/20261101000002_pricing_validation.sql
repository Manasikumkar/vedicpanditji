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
