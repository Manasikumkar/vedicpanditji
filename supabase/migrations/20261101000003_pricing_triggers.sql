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
