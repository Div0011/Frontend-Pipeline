#!/usr/bin/env python3
"""
Refines Dirty Martin's to have 100% Pure White Background (#FFFFFF) & Dark Mustard (#C68A14) accents.
Ensures ZERO black colors in the background anywhere across the website.
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DM_DIR = ROOT / "projects" / "dirty-martins"

def refine_interactive_background():
    ib_file = DM_DIR / "components" / "ui" / "InteractiveBackground.tsx"
    if not ib_file.exists():
        return
    
    content = ib_file.read_text()
    
    # Replace any black/dark gradient with pure white & cream
    content = re.sub(
        r'background:\s*isDarkMode\s*\?[^;]+;\s*',
        'background: "radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FAF8F2 100%)",\n',
        content
    )
    content = re.sub(r'#050806|#100804|#0A0A0A|#080808|#141413', '#FFFFFF', content)
    
    ib_file.write_text(content)
    print("  ✓ InteractiveBackground.tsx updated to 100% White & Mustard.")

def refine_canvas_scrubber():
    cs_file = DM_DIR / "components" / "marketing" / "CanvasScrubber.tsx"
    if not cs_file.exists():
        return
    
    content = cs_file.read_text()
    # Replace from-black gradients with from-white
    content = content.replace("from-black/60 via-transparent to-black/30", "from-white/80 via-transparent to-white/30")
    content = content.replace("from-black/40 via-transparent to-transparent", "from-white/70 via-transparent to-transparent")
    content = content.replace("from-black/50 via-transparent to-black/20", "from-white/70 via-transparent to-white/20")
    
    cs_file.write_text(content)
    print("  ✓ CanvasScrubber.tsx updated with white text-legibility gradients.")

def refine_smoothie():
    sm_file = DM_DIR / "components" / "marketing" / "CinematicSmoothie.tsx"
    if not sm_file.exists():
        return
    
    content = sm_file.read_text()
    content = content.replace("text-white", "text-black")
    content = content.replace("bg-black/60", "bg-white/90")
    content = content.replace("border-white/10", "border-[#C68A14]/30")
    content = content.replace("border-white/20", "border-[#C68A14]/40")
    content = content.replace("text-stone-200", "text-stone-800")
    content = content.replace("text-stone-300", "text-stone-700")
    content = content.replace("text-stone-400", "text-stone-600")
    
    sm_file.write_text(content)
    print("  ✓ CinematicSmoothie.tsx updated for white background & mustard accents.")

def refine_other_sections():
    sections = [
        "BrandManifesto.tsx", "HowWeSmash.tsx", "RestaurantLocations.tsx",
        "ReservationCTA.tsx", "CulinaryAccordionGallery.tsx", "ArchetypeShowcase.tsx"
    ]
    for s in sections:
        fp = DM_DIR / "components" / "marketing" / s
        if fp.exists():
            txt = fp.read_text()
            txt = txt.replace("bg-[#0A0A0A]", "bg-white")
            txt = txt.replace("bg-black/60", "bg-white/90")
            txt = txt.replace("bg-black/40", "bg-[#FAF8F2]")
            txt = txt.replace("text-white", "text-black")
            txt = txt.replace("text-stone-300", "text-stone-800")
            txt = txt.replace("text-stone-400", "text-stone-700")
            txt = txt.replace("border-white/10", "border-[#C68A14]/25")
            txt = txt.replace("border-white/20", "border-[#C68A14]/35")
            fp.write_text(txt)

    print("  ✓ All marketing sections in Dirty Martin's updated.")

def main():
    print("👉 Rebuilding Dirty Martin's with 100% White Background & Mustard Accents (Zero Black)...")
    refine_interactive_background()
    refine_canvas_scrubber()
    refine_smoothie()
    refine_other_sections()
    print("🎉 Done! Dirty Martin's is now completely White & Mustard.")

if __name__ == "__main__":
    main()
