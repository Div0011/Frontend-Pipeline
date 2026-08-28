# Business Classifier (chain detection)

PRIMARY SIGNAL = Google Places location count (how many distinct locations share
this brand name). This is the source of truth. Do NOT decide "is this a franchise"
from the name alone — regional chains with cute names will fool you.

Rules (in order):
  1. Hard-negative brand name (blocklist)            -> chain, REJECT
  2. location_count >= national_chain_threshold      -> chain, REJECT
  3. 1 < location_count < threshold                  -> regional_chain, REJECT
     (our ICP targets INDEPENDENT restaurants only)
  4. location_count <= 1                             -> independent_restaurant, KEEP

The LLM's job here is ONLY a second opinion: when the location count is in the
ambiguous middle band, you may nudge chain_confidence, but you must NOT override
the places-based is_chain decision.
