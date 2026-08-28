import os

all_24 = [
    'backyard-burgers', 'beyondburg-inc', 'biggies-burger', 'burger-bar-austin',
    'burger-elite', 'burger-seigneur', 'burgerman', 'casino-el-camino',
    'dans-burgers', 'dirty-martins', 'good-flippin-burgers', 'jewboy-burgers',
    'leons-burgers', 'little-deli-pizzeria', 'louis-burger', 'nadc-burger',
    'original-burger-co', 'pedrosos-pizza', 'pool-burger', 'sankys-burger-house',
    'simon-burgers', 'smash-guys', 'sour-duck-market', 'truffles-bangalore'
]

for p in all_24:
    p_path = os.path.join('projects', p)
    if not os.path.exists(p_path):
        continue

    # 1. Update app/globals.css
    css_path = os.path.join(p_path, 'app', 'globals.css')
    if os.path.exists(css_path):
        with open(css_path, 'r') as f:
            css_c = f.read()

        font_import = "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700;900&display=swap');\n"
        if '@import url' not in css_c:
            css_c = font_import + css_c

        # Ensure fallback font families in @theme or :root
        if '--font-display:' not in css_c or 'var(--font-display)' in css_c:
            css_c = css_c.replace(
                '--font-display: var(--font-display);',
                "--font-display: 'Bebas Neue', 'Space Grotesk', Impact, sans-serif;"
            )
            css_c = css_c.replace(
                '--font-body: var(--font-body);',
                "--font-body: 'DM Sans', system-ui, -apple-system, sans-serif;"
            )
            css_c = css_c.replace(
                '--font-mono: var(--font-mono);',
                "--font-mono: 'JetBrains Mono', monospace;"
            )

        with open(css_path, 'w') as f:
            f.write(css_c)

    # 2. Update app/layout.tsx (remove next/font/google dependencies)
    layout_path = os.path.join(p_path, 'app', 'layout.tsx')
    if os.path.exists(layout_path):
        with open(layout_path, 'r') as f:
            lines = f.readlines()

        new_lines = []
        skip_font_decl = False

        for line in lines:
            if 'from "next/font/google"' in line or "from 'next/font/google'" in line:
                continue
            if line.strip().startswith('const ') and ('= Bebas_Neue(' in line or '= DM_Sans(' in line or '= JetBrains_Mono(' in line or '= Lora(' in line or '= Space_Grotesk(' in line or '= Inter(' in line):
                skip_font_decl = True
                continue
            if skip_font_decl:
                if line.strip() == '});' or line.strip() == '})':
                    skip_font_decl = False
                continue
            
            # Clean className in <html>
            if '<html' in line:
                new_lines.append('    <html lang="en" className="dark">\n')
                continue

            new_lines.append(line)

        with open(layout_path, 'w') as f:
            f.write(''.join(new_lines))

print("✓ Successfully migrated all 24 projects to resilient, instant-building font declarations.")
