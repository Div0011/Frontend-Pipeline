#!/usr/bin/env python3
"""
Surgically remove all JSX text containing '//' across all 24 projects without touching any code comments.
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

def clean_file_exact(file_path: str):
    if not os.path.exists(file_path):
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1. Remove entire span tags containing '//'
    content = re.sub(r'<span[^>]*>[^<]*//[^<]*</span>\n?', '', content)

    # 2. Clean specific known strings
    content = content.replace("RESERVATION CONFIRMED // VIP PASS", "RESERVATION CONFIRMED")
    content = content.replace("RESERVATION CONFIRMED // INSTANT PASS", "RESERVATION CONFIRMED")
    content = re.sub(r'>\s*[A-Z0-9\s\.\']+\s*//\s*[A-Z0-9\s\.\'&]+\s*<', '><', content)

    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ Surgically cleaned JSX text in {os.path.relpath(file_path, WORKSPACE_ROOT)}")

def main():
    print("🧹 Surgically cleaning all JSX slashes across all 24 projects...")
    for project_name in sorted(os.listdir(PROJECTS_DIR)):
        project_dir = os.path.join(PROJECTS_DIR, project_name)
        if not os.path.isdir(project_dir):
            continue

        target_files = [
            os.path.join(project_dir, "app", "reservations", "page.tsx"),
            os.path.join(project_dir, "app", "locations", "page.tsx"),
            os.path.join(project_dir, "components", "marketing", "RestaurantLocations.tsx"),
            os.path.join(project_dir, "components", "marketing", "HowWeSmash.tsx"),
            os.path.join(project_dir, "components", "marketing", "ReservationCTA.tsx"),
            os.path.join(project_dir, "components", "marketing", "SignatureMenu.tsx"),
        ]

        for tf in target_files:
            clean_file_exact(tf)

    print("\n🎉 Surgical clean complete!")

if __name__ == "__main__":
    main()
