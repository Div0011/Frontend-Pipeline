import os, re

brand_palettes = {
    'backyard-burgers': {'primary': '#E67E22', 'text': '#000000', 'name': 'Backyard Burgers & Grill'},
    'beyondburg-inc': {'primary': '#F5C418', 'text': '#000000', 'name': 'Beyondburg Inc.'},
    'biggies-burger': {'primary': '#F26522', 'text': '#FFFFFF', 'name': 'Biggies Burger'},
    'burger-bar-austin': {'primary': '#2563EB', 'text': '#FFFFFF', 'name': 'Burger Bar on Congress'},
    'burger-elite': {'primary': '#7C3AED', 'text': '#FFFFFF', 'name': 'BURGER ELITE'},
    'burger-seigneur': {'primary': '#C8A96E', 'text': '#000000', 'name': 'Burger Seigneur'},
    'burgerman': {'primary': '#15803D', 'text': '#FFFFFF', 'name': 'BurgerMan'},
    'casino-el-camino': {'primary': '#DC2626', 'text': '#FFFFFF', 'name': 'Casino El Camino'},
    'dans-burgers': {'primary': '#D97706', 'text': '#FFFFFF', 'name': 'Dan\'s Hamburgers'},
    'dirty-martins': {'primary': '#BF5700', 'text': '#FFFFFF', 'name': 'Dirty Martin\'s Kum-Bak'},
    'good-flippin-burgers': {'primary': '#BE123C', 'text': '#FFFFFF', 'name': 'Good Flippin\' Burgers'},
    'jewboy-burgers': {'primary': '#06B6D4', 'text': '#000000', 'name': 'JewBoy Burgers'},
    'leons-burgers': {'primary': '#B12727', 'text': '#FFFFFF', 'name': 'Leon\'s Burgers & Wings'},
    'little-deli-pizzeria': {'primary': '#166534', 'text': '#FFFFFF', 'name': 'Little Deli & Pizzeria'},
    'louis-burger': {'primary': '#D4AF37', 'text': '#000000', 'name': 'Louis Burger'},
    'nadc-burger': {'primary': '#FFFFFF', 'text': '#000000', 'name': 'NADC Burger'},
    'original-burger-co': {'primary': '#2563EB', 'text': '#FFFFFF', 'name': 'Original Burger Co.'},
    'pedrosos-pizza': {'primary': '#B91C1C', 'text': '#FFFFFF', 'name': 'Pedroso\'s Pizza'},
    'pool-burger': {'primary': '#F43F5E', 'text': '#FFFFFF', 'name': 'Pool Burger'},
    'sankys-burger-house': {'primary': '#FFE500', 'text': '#000000', 'name': 'Sanky\'s Burger House'},
    'simon-burgers': {'primary': '#DC2626', 'text': '#FFFFFF', 'name': 'Simon Burgers'},
    'smash-guys': {'primary': '#F5C418', 'text': '#000000', 'name': 'Smash Guys'},
    'sour-duck-market': {'primary': '#EA580C', 'text': '#FFFFFF', 'name': 'Sour Duck Market'},
    'truffles-bangalore': {'primary': '#F5A623', 'text': '#000000', 'name': 'Truffles'},
}

for p, cfg in brand_palettes.items():
    p_path = os.path.join('projects', p)
    if not os.path.exists(p_path):
        continue

    primary = cfg['primary']
    txt = cfg['text']

    # Update app/globals.css or theme colors if needed
    for root, dirs, files in os.walk(p_path):
        if any(x in root for x in ['node_modules', '.next', 'out', '.git']):
            continue
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                fpath = os.path.join(root, file)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()

                orig = content
                
                # Replace legacy yolk tokens for non-yellow brands
                if primary.upper() not in ['#F5C418', '#FFE500', '#F5A623']:
                    content = content.replace('bg-yolk', f'bg-[{primary}]')
                    content = content.replace('text-yolk', f'text-[{primary}]')
                    content = content.replace('border-yolk', f'border-[{primary}]')
                
                if content != orig:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write(content)

    print(f"✓ Harmonized colors for {p} -> Primary: {primary}")

print("\nAll 24 projects color themes synchronized!")
