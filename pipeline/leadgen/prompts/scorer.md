# Scorer / Qualifier

Combine the audit and business classification into a single decision-ready record.

WEBSITE QUALITY (is the site bad?)  = mean of the 7 audit dimensions.
COMMERCIAL VALUE (is it worth approaching?) = weighted composite of:
  business_quality, website_quality, redesign_opportunity, seo_opportunity,
  brand_potential, commercial_fit, contactability  (weights from ICP).

REJECT a lead when ANY of:
  * it was already rejected (chain, no website, inactive, duplicate)
  * overall website score >= 8.5 (already exceptionally strong — no upside)
  * composite tier == "Reject"

Produce a LeadCandidate with every dimension, the final 0-100 score, the tier, the
decision (QUALIFY/REJECT), the rejection reasons, and recommended_services.
