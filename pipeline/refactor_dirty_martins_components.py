#!/usr/bin/env python3
"""
Custom builder to ensure ALL text in Dirty Martin's is crisp black/dark stone
on its white/ivory background with dark mustard accents, and zero black in any background.
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DM_DIR = ROOT / "projects" / "dirty-martins"

def refactor_dirty_martins():
    print("👉 Auditing and styling all Dirty Martin's components for pure White + Mustard + Black Text...")

    for root, _, files in os.walk(DM_DIR):
        for file in files:
            if file.endswith(('.tsx', '.ts')) and not file.startswith('package'):
                file_path = Path(root) / file
                content = file_path.read_text()

                # Skip CanvasScrubber / non-UI files if needed, but UI components need black text
                if "CanvasScrubber" in file or "PixelText" in file:
                    continue

                # Invert text-white to text-black for non-button/badge elements
                # Replace section headers and titles
                content = re.sub(r'text-white', 'text-black', content)
                content = re.sub(r'text-stone-200|text-stone-300|text-stone-400', 'text-stone-700', content)
                content = re.sub(r'border-white/10|border-white/15|border-white/20', 'border-[#C68A14]/25', content)
                content = re.sub(r'bg-white/5|bg-white/10', 'bg-[#FAF8F2]', content)
                content = re.sub(r'bg-black/50|bg-black/60|bg-black/80|bg-black/90|bg-black', 'bg-white', content)
                content = re.sub(r'bg-\[#100804\]|bg-\[#0A0A0A\]|bg-\[#080808\]', 'bg-white', content)
                
                # Fix buttons: Mustard buttons have white text
                content = re.sub(r'bg-\[#C68A14\]\s+text-black', 'bg-[#C68A14] text-white', content)
                content = re.sub(r'style=\{\{\s*backgroundColor:\s*["\']#C68A14["\'],\s*color:\s*["\']#000000["\']\s*\}\}', 'style={{ backgroundColor: "#C68A14", color: "#FFFFFF" }}', content)
                content = re.sub(r'style=\{\{\s*backgroundColor:\s*["\']#C68A14["\'],\s*color:\s*["\']#0A0A0A["\']\s*\}\}', 'style={{ backgroundColor: "#C68A14", color: "#FFFFFF" }}', content)

                file_path.write_text(content)

    print("  ✓ All Dirty Martin's pages & components tailored for White + Mustard + Black Text!")

if __name__ == "__main__":
    refactor_dirty_martins()
