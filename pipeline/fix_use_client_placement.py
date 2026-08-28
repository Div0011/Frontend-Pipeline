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
    # 1. Fix app/page.tsx
    page_path = os.path.join('projects', p, 'app', 'page.tsx')
    if os.path.exists(page_path):
        with open(page_path, 'r') as f:
            c = f.read()
        lines = [l for l in c.splitlines() if l.strip() != '"use client";']
        new_c = '"use client";\n\n' + '\n'.join(lines) + '\n'
        with open(page_path, 'w') as f:
            f.write(new_c)

    # 2. Fix components/marketing/SignatureMenu.tsx
    menu_path = os.path.join('projects', p, 'components', 'marketing', 'SignatureMenu.tsx')
    if os.path.exists(menu_path):
        with open(menu_path, 'r') as f:
            c = f.read()
        lines = [l for l in c.splitlines() if l.strip() != '"use client";']
        new_c = '"use client";\n\n' + '\n'.join(lines) + '\n'
        with open(menu_path, 'w') as f:
            f.write(new_c)

    # 3. Fix components/marketing/CartDrawer.tsx
    cart_path = os.path.join('projects', p, 'components', 'marketing', 'CartDrawer.tsx')
    if os.path.exists(cart_path):
        with open(cart_path, 'r') as f:
            c = f.read()
        lines = [l for l in c.splitlines() if l.strip() != '"use client";']
        new_c = '"use client";\n\n' + '\n'.join(lines) + '\n'
        with open(cart_path, 'w') as f:
            f.write(new_c)

    # 4. Fix components/marketing/ArchetypeShowcase.tsx
    arch_path = os.path.join('projects', p, 'components', 'marketing', 'ArchetypeShowcase.tsx')
    if os.path.exists(arch_path):
        with open(arch_path, 'r') as f:
            c = f.read()
        lines = [l for l in c.splitlines() if l.strip() != '"use client";']
        new_c = '"use client";\n\n' + '\n'.join(lines) + '\n'
        with open(arch_path, 'w') as f:
            f.write(new_c)

print("✓ Fixed 'use client' directives at line 1 across all 24 projects.")
