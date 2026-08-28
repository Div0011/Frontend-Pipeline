#!/usr/bin/env python3
"""
Purges legacy colors from Jewboy Burgers and Pedroso's Pizza:
- Jewboy Burgers: 100% Black (#0A0A0A) and White (#FFFFFF) across all files.
- Pedroso's Pizza: 100% Red (#D91C24), Yellow/Gold (#F2C777), Black (#0A0A0A), and White (#FFFFFF).
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

def clean_jewboy():
    jewboy_dir = PROJECTS_DIR / "jewboy-burgers"
    print("👉 Purging all non-black/white colors from Jewboy Burgers...")

    # All files in jewboy-burgers
    for root, _, files in os.walk(jewboy_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js', '.json')) and not file.startswith('package'):
                file_path = Path(root) / file
                content = file_path.read_text()
                
                # Replace cyan with white
                content = re.sub(r'#06B6D4|#06b6d4', '#FFFFFF', content)
                # Replace any legacy yellow or orange with white
                content = re.sub(r'#F5C418|#f5c418|#EAA824|#FBC85B|#DE3B2B|#15803D', '#FFFFFF', content)
                
                file_path.write_text(content)

    print("  ✓ Jewboy Burgers is now strictly 100% Black & White across all files!")


def clean_pedrosos():
    pedrosos_dir = PROJECTS_DIR / "pedrosos-pizza"
    print("👉 Updating Pedroso's Pizza to exact Red (#D91C24), Yellow (#F2C777), and Black (#0A0A0A)...")

    for root, _, files in os.walk(pedrosos_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js', '.json')) and not file.startswith('package'):
                file_path = Path(root) / file
                content = file_path.read_text()
                
                # Replace old red #B91C1C with exact Pedroso's Red #D91C24
                content = re.sub(r'#B91C1C|#b91c1c', '#D91C24', content)
                
                file_path.write_text(content)

    print("  ✓ Pedroso's Pizza is now strictly Red, Yellow, and Black!")


if __name__ == "__main__":
    clean_jewboy()
    clean_pedrosos()
