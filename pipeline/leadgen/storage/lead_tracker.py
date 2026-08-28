"""
Lead Storage & Sample Website Tracker
=====================================
Manages persistence, search, and sample website linkage for business leads.

Whenever an autonomous redesign or sample website is generated, this module
updates the specific business record and the master registry.json index.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

_WORKSPACE_ROOT = Path(__file__).resolve().parent.parent.parent.parent
_LEADS_DIR = _WORKSPACE_ROOT / "leads"
_REGISTRY_FILE = _LEADS_DIR / "registry.json"


def slugify(text: str) -> str:
    """Creates a filesystem-safe slug from a business name."""
    s = text.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return s.strip("-")


def load_registry() -> Dict[str, Any]:
    """Loads the master registry index."""
    if not _REGISTRY_FILE.exists():
        return {
            "last_updated": datetime.now(timezone.utc).isoformat(),
            "total_leads": 0,
            "categories": [],
            "leads": []
        }
    with open(_REGISTRY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_registry(registry: Dict[str, Any]) -> None:
    """Saves the master registry index atomically."""
    _REGISTRY_FILE.parent.mkdir(parents=True, exist_ok=True)
    registry["last_updated"] = datetime.now(timezone.utc).isoformat()
    registry["total_leads"] = len(registry.get("leads", []))
    with open(_REGISTRY_FILE, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2)


def save_lead(
    business_name: str,
    category: str,
    search_date: str,
    geography: str,
    live_url: str,
    contact: Dict[str, Any],
    audit_factors: Dict[str, Any],
    verdict: Dict[str, Any],
    campaign_name: str = "austin_restaurants",
    sample_website: Optional[Dict[str, Any]] = None,
) -> Path:
    """
    Saves or updates a lead in its category/campaign directory and registers it
    in the master registry.json.
    """
    category_slug = slugify(category.split("/")[0])
    folder_name = f"{search_date}_{slugify(campaign_name)}"
    campaign_dir = _LEADS_DIR / category_slug / folder_name
    campaign_dir.mkdir(parents=True, exist_ok=True)

    file_slug = slugify(business_name).replace("-", "_")
    file_path = campaign_dir / f"{file_slug}.json"
    rel_path = str(file_path.relative_to(_WORKSPACE_ROOT))

    lead_id = slugify(business_name)

    lead_data = {
        "business_name": business_name,
        "category": category,
        "search_date": search_date,
        "geography": geography,
        "live_url": live_url,
        "contact": contact,
        "audit_factors": audit_factors,
        "verdict": verdict,
        "sample_website": sample_website or {
            "status": "pending",
            "sample_url": None,
            "demo_url": None,
            "project_id": None,
            "repo_path": None,
            "generated_at": None,
            "notes": None,
        }
    }

    # Write individual lead JSON
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(lead_data, f, indent=2)

    # Update master registry
    registry = load_registry()
    existing_entry = next((item for item in registry.get("leads", []) if item.get("id") == lead_id), None)

    reg_entry = {
        "id": lead_id,
        "business_name": business_name,
        "category": category,
        "search_date": search_date,
        "geography": geography,
        "live_url": live_url,
        "contact_email": contact.get("email"),
        "contact_phone": contact.get("phone"),
        "owner": contact.get("owner"),
        "outreach_priority": verdict.get("outreach_priority", "Medium"),
        "grade": verdict.get("grade", "C"),
        "file_path": rel_path,
        "sample_website": {
            "status": lead_data["sample_website"].get("status", "pending"),
            "sample_url": lead_data["sample_website"].get("sample_url"),
            "demo_url": lead_data["sample_website"].get("demo_url"),
            "project_id": lead_data["sample_website"].get("project_id"),
            "updated_at": lead_data["sample_website"].get("generated_at"),
        }
    }

    if existing_entry:
        idx = registry["leads"].index(existing_entry)
        registry["leads"][idx] = reg_entry
    else:
        registry["leads"].append(reg_entry)

    if category not in registry.get("categories", []):
        registry.setdefault("categories", []).append(category)

    save_registry(registry)
    return file_path


def update_lead_sample_website(
    business_name: str,
    sample_url: Optional[str] = None,
    demo_url: Optional[str] = None,
    project_id: Optional[str] = None,
    repo_path: Optional[str] = None,
    notes: Optional[str] = None,
    status: str = "generated"
) -> bool:
    """
    Updates the sample website status, URLs, and demo links against a specific
    business in its file and in the master registry.
    """
    lead_id = slugify(business_name)
    registry = load_registry()

    target_entry = None
    for entry in registry.get("leads", []):
        if entry.get("id") == lead_id or slugify(entry.get("business_name", "")) == lead_id:
            target_entry = entry
            break

    if not target_entry:
        return False

    file_rel_path = target_entry.get("file_path")
    if not file_rel_path:
        return False

    lead_file = _WORKSPACE_ROOT / file_rel_path
    if not lead_file.exists():
        return False

    # Read existing lead JSON
    with open(lead_file, "r", encoding="utf-8") as f:
        lead_data = json.load(f)

    # Update sample website fields
    now_iso = datetime.now(timezone.utc).isoformat()
    sw = lead_data.get("sample_website", {})
    sw["status"] = status
    if sample_url:
        sw["sample_url"] = sample_url
    if demo_url:
        sw["demo_url"] = demo_url
    if project_id:
        sw["project_id"] = project_id
    if repo_path:
        sw["repo_path"] = repo_path
    if notes:
        sw["notes"] = notes
    sw["generated_at"] = now_iso

    lead_data["sample_website"] = sw

    # Write back individual JSON
    with open(lead_file, "w", encoding="utf-8") as f:
        json.dump(lead_data, f, indent=2)

    # Update registry
    target_entry["sample_website"] = {
        "status": status,
        "sample_url": sw.get("sample_url"),
        "demo_url": sw.get("demo_url"),
        "project_id": sw.get("project_id"),
        "updated_at": now_iso
    }
    save_registry(registry)
    return True
