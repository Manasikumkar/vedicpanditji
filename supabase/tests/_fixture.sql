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
