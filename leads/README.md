# 📁 Leads & Prospective Client Storage System

This directory houses all qualified business leads discovered by the autonomous Lead Discovery & Qualification Pipeline.

## 🗂 Directory Structure

```
leads/
├── registry.json             # Master index of all leads across all campaigns
├── README.md                 # System overview and updating protocol
└── <category>/               # e.g., restaurants, salons, dental, fitness
    └── <YYYY-MM-DD>_<geography>_<campaign>/
        ├── summary.md        # Human-readable campaign report & matrix
        ├── <business_slug_1>.json
        ├── <business_slug_2>.json
        └── ...
```

---

## 📋 Lead Data Schema

Every lead JSON file contains:
1. **`business_name`**: Commercial name of the business.
2. **`category`**: Industry vertical and sub-category (e.g. `Restaurants / Burger & Diner`).
3. **`search_date`**: ISO date of initial discovery and audit (`YYYY-MM-DD`).
4. **`geography`**: Target city / metropolitan area.
5. **`live_url`**: Current live website URL.
6. **`contact`**: Phone numbers, public emails, verified owners/founders, physical addresses, and social links.
7. **`audit_factors`**: Detailed 5-factor scoring (1–5) and diagnostic notes:
   - `colour_palette` (Hex tokens, CSS variables, aesthetic coherence)
   - `logo` (SVG vector status, favicon, Retina scaling)
   - `typography` (Web fonts, font stacks, hierarchy)
   - `contact` (Direct reachability)
   - `online_presence` (Tech stack, performance, schema markup, mobile UX)
8. **`verdict`**: Final letter grade (`A` through `F`), `outreach_priority`, and commercial ROI pitch rationale.
9. **`sample_website`**: **Live Redesign Tracking Record**
   - `status`: `"pending"` | `"generated"` | `"deployed"` | `"excluded"`
   - `sample_url`: Public preview / staging URL of the generated sample website.
   - `demo_url`: Hosted interactive prototype URL.
   - `project_id`: Internal redesign project UUID.
   - `repo_path`: Path to the generated Next.js/HTML codebase.
   - `generated_at`: Timestamp of sample site completion.
   - `notes`: Custom styling directives or conversion highlights.

---

## 🔄 Programmatic Sample Website Updating

Whenever the redesign pipeline (`pipeline/redesign` or `pipeline/leadgen/agents/redesign_trigger.py`) builds a demonstration site for a lead, it calls:

```python
from pipeline.leadgen.storage.lead_tracker import update_lead_sample_website

update_lead_sample_website(
    business_name="Dan's Hamburgers",
    sample_url="https://preview.wishgranters.com/dans-hamburgers",
    demo_url="https://demo.wishgranters.com/dans-hamburgers",
    project_id="proj-dans-001",
    repo_path="projects/dans_hamburgers",
    notes="High-performance smash burger scrollytelling demo with mobile Toast ordering handoff."
)
```

This automatically updates both the individual business JSON file and the master `registry.json` index.
