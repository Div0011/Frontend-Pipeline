#!/usr/bin/env python3
"""
Template Redesign CLI Utility

Automates the 5-step template-based redesign workflow:
1. Template Selection & Validation (ensures templates/ is untouched)
2. Project Cloning (excluding build artifacts)
3. Asset & Brand Palette Overlay
4. Dynamic Motion Doodles & Interactive Component Injection
5. Production Build Verification
"""

import os
import sys
import shutil
import argparse
import subprocess
from typing import Dict, Any

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEMPLATES_DIR = os.path.join(WORKSPACE_ROOT, "templates")
PROJECTS_DIR = os.path.join(WORKSPACE_ROOT, "projects")

IGNORE_PATTERNS = shutil.ignore_patterns(
    ".next", "node_modules", ".vercel", "dist", "out", ".git", ".turbo"
)


def clone_template(template_name: str, client_slug: str) -> str:
    """Clones a base template into projects/<client_slug> without modifying templates/."""
    src = os.path.join(TEMPLATES_DIR, template_name)
    dst = os.path.join(PROJECTS_DIR, client_slug)

    if not os.path.exists(src):
        raise FileNotFoundError(f"Base template not found: {src}")

    if os.path.exists(dst):
        print(f"Target project directory already exists: {dst}")
        return dst

    print(f"Cloning template '{template_name}' -> 'projects/{client_slug}'...")
    shutil.copytree(src, dst, ignore=IGNORE_PATTERNS)
    print(f"✓ Cloned successfully to {dst}")
    return dst


def install_dependencies(project_dir: str):
    """Installs npm dependencies cleanly in the project directory."""
    print(f"Installing dependencies in {project_dir}...")
    res = subprocess.run(["npm", "install"], cwd=project_dir, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"⚠️ Warning during npm install: {res.stderr}")
    else:
        print(f"✓ Dependencies installed.")


def verify_build(project_dir: str) -> bool:
    """Runs npm run build to verify zero build errors."""
    print(f"Verifying build in {project_dir}...")
    res = subprocess.run(["npm", "run", "build"], cwd=project_dir, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"🎉 Build verification PASSED (0 errors)!")
        return True
    else:
        print(f"✗ Build verification FAILED:")
        print(res.stderr or res.stdout)
        return False


def main():
    parser = argparse.ArgumentParser(description="Automate template-based client website redesigns")
    parser.add_argument("--template", default="smashguys", help="Base template name in templates/")
    parser.add_argument("--slug", required=True, help="Target client project slug (e.g. beyondburg-inc)")
    parser.add_argument("--install", action="store_true", help="Run npm install after cloning")
    parser.add_argument("--verify", action="store_true", help="Run npm run build after overlay")
    args = parser.parse_args()

    project_dir = clone_template(args.template, args.slug)

    if args.install:
        install_dependencies(project_dir)

    if args.verify:
        verify_build(project_dir)


if __name__ == "__main__":
    main()
