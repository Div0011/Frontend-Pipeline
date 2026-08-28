# Dedup + Preliminary Filter

Reject candidates that fail explicit ICP negative criteria BEFORE any crawling:

  * hard-negative brand names (franchises/chains in the blocklist)
  * duplicate businesses (same name or same website domain)
  * no legitimate website (when require_website)
  * too few reviews / low rating when require_local_presence (likely inactive)

Keep everything else as a CandidateLead. Record every rejection reason. Do NOT
rely on a guess about whether a business is a chain — that is the classifier's
job using the Places location-count signal.
