"""
Resend email tool for the lead-gen outreach layer.

Only invoked when:
  - LEADGEN_ENABLE_EMAIL=true
  - RESEND_API_KEY is set
  - The outreach package has status="approved"
  - The per-campaign send limit has not been exceeded

Uses the Resend /emails endpoint (single send).
Does NOT use bulk sending — each email is personalized and sent individually.

Resend API docs: https://resend.com/docs/api-reference/emails/send-email

Anti-spam compliance:
  - Only sends to publicly listed business contact emails.
  - Email body includes a clear identity ("Wishgranters") and
    a low-pressure, non-solicitation-at-scale approach.
  - No purchased lists, no personal inference.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

import httpx

from pipeline.leadgen.config import get_leadgen_settings

logger = logging.getLogger("pipeline.leadgen.tools.email")

_RESEND_URL = "https://api.resend.com/emails"


@dataclass
class SendResult:
    success: bool
    message_id: Optional[str] = None
    error: Optional[str] = None
    sent_at: Optional[str] = None


def _can_send() -> bool:
    s = get_leadgen_settings()
    return s.enable_email and s.has_resend


def send(
    to_email: str,
    subject: str,
    body_text: str,
    from_address: Optional[str] = None,
    reply_to: Optional[str] = None,
) -> SendResult:
    """Send a plain-text email via Resend.

    Returns a SendResult with message_id on success.
    Always returns a result (never raises) so the pipeline continues.
    """
    s = get_leadgen_settings()

    if not _can_send():
        reason = "LEADGEN_ENABLE_EMAIL=false" if not s.enable_email else "RESEND_API_KEY missing"
        logger.info("Email send skipped (%s): to=%s subject=%s", reason, to_email, subject)
        return SendResult(success=False, error=f"Email disabled: {reason}")

    if not to_email or "@" not in to_email:
        return SendResult(success=False, error=f"Invalid recipient: {to_email!r}")

    from_addr = from_address or getattr(s, "email_from_address", "outreach@wishgranters.com")
    headers = {
        "Authorization": f"Bearer {s.resend_api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "from": from_addr,
        "to": [to_email],
        "subject": subject,
        "text": body_text,
    }
    if reply_to:
        payload["reply_to"] = reply_to

    try:
        resp = httpx.post(_RESEND_URL, json=payload, headers=headers, timeout=20)
        resp.raise_for_status()
        data = resp.json()
        msg_id = data.get("id")
        sent_at = datetime.now(timezone.utc).isoformat()
        logger.info("Email sent via Resend: id=%s to=%s", msg_id, to_email)
        return SendResult(success=True, message_id=msg_id, sent_at=sent_at)
    except httpx.HTTPStatusError as exc:
        err = f"HTTP {exc.response.status_code}: {exc.response.text[:200]}"
        logger.warning("Resend send failed: %s", err)
        return SendResult(success=False, error=err)
    except Exception as exc:
        logger.warning("Resend unexpected error: %s", exc)
        return SendResult(success=False, error=str(exc))
