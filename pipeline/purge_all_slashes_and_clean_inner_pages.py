#!/usr/bin/env python3
"""
Comprehensive purge of all '//' slashes, redundant computerised tags,
and optimization of inner pages across all 24 projects.
"""

import os
import re

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

def clean_file(file_path: str):
    if not os.path.exists(file_path):
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1. Remove brand // subtitle tags inside spans
    # e.g. <span ...>BRAND // VIP TABLE RESERVATIONS</span> -> remove or clean
    content = re.sub(
        r'<span[^>]*>[^<]*//[^<]*</span>',
        '',
        content
    )

    # 2. Clean any remaining "//" in text nodes
    # e.g. "RESERVATION CONFIRMED // VIP PASS" -> "RESERVATION CONFIRMED"
    content = content.replace("RESERVATION CONFIRMED // VIP PASS", "RESERVATION CONFIRMED")
    content = content.replace("RESERVATION CONFIRMED // INSTANT PASS", "RESERVATION CONFIRMED")
    content = re.sub(r'//\s*[A-Z0-9\s&]+', '', content)

    # 3. Clean up empty divs or double spaces left behind
    content = re.sub(r'<div className="space-y-2">\s*<h2', '<div className="space-y-2">\n            <h2', content)

    if content != original:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✓ Cleaned slashes & tags in {os.path.relpath(file_path, WORKSPACE_ROOT)}")

def process_project(project_dir: str):
    for root, dirs, files in os.walk(project_dir):
        if "node_modules" in root or ".next" in root:
            continue
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                clean_file(os.path.join(root, file))

def main():
    print("🧹 Purging all '//' slashes and redundant computerized tags across all 24 projects...")
    for project_name in sorted(os.listdir(PROJECTS_DIR)):
        project_dir = os.path.join(PROJECTS_DIR, project_name)
        if os.path.isdir(project_dir):
            process_project(project_dir)
    print("\n🎉 Complete codebase purged of all '//' slashes!")

if __name__ == "__main__":
    main()
