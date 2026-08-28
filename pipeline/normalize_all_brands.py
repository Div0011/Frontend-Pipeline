import os, re

brand_details = {
    'backyard-burgers': {
        'name': 'Backyard Burgers & Grill',
        'short': 'BACKYARD BURGERS',
        'domain': 'backyardburgers.in',
        'email': 'hello@backyardburgers.in',
        'city': 'Bangalore',
        'sub': "Indiranagar's open-air American craft burger and smokehouse grill.",
        'locations_text': '100ft Road Defence Colony Indiranagar',
    },
    'beyondburg-inc': {
        'name': 'Beyondburg Inc.',
        'short': 'BEYONDBURG INC.',
        'domain': 'beyondburg.com',
        'email': 'hello@beyondburg.com',
        'city': 'Bangalore',
        'sub': "Bangalore's premier craft smashed tenderloin and gourmet burger atelier.",
        'locations_text': 'Indiranagar 100ft Road',
    },
    'biggies-burger': {
        'name': 'Biggies Burger',
        'short': 'BIGGIES BURGER',
        'domain': 'biggiesburger.com',
        'email': 'contact@biggiesburger.com',
        'city': 'Bangalore',
        'sub': "India's pioneer in flame-grilled behemoth burgers and loaded fries.",
        'locations_text': 'Marathahalli, Electronic City, Koramangala & HSR',
    },
    'burger-bar-austin': {
        'name': 'Burger Bar on Congress',
        'short': 'BURGER BAR',
        'domain': 'burgerbaraustin.com',
        'email': 'hello@burgerbaraustin.com',
        'city': 'Austin',
        'sub': "Downtown Austin's iconic walk-up window for flat-top smashed Angus burgers.",
        'locations_text': 'Congress Ave Downtown Austin',
    },
    'burger-elite': {
        'name': 'BURGER ELITE',
        'short': 'BURGER ELITE',
        'domain': 'burgerelite.in',
        'email': 'orders@burgerelite.in',
        'city': 'Bangalore',
        'sub': "Mahalakshmi Layout's premier street smash burger and loaded fries hub.",
        'locations_text': 'Mahalakshmi Layout West of Chord Road',
    },
    'burger-seigneur': {
        'name': 'Burger Seigneur',
        'short': 'BURGER SEIGNEUR',
        'domain': 'burgerseigneur.com',
        'email': 'bonjour@burgerseigneur.com',
        'city': 'Bangalore',
        'sub': "European gourmet brioche burger atelier and luxury dining lounge.",
        'locations_text': 'Indiranagar 100ft Road',
    },
    'burgerman': {
        'name': 'BurgerMan',
        'short': 'BURGERMAN',
        'domain': 'burgerman.in',
        'email': 'hello@burgerman.in',
        'city': 'Bangalore',
        'sub': "India's guilt-free 100% flame-grilled whole-wheat burger bistro since 2006.",
        'locations_text': '12th Main HAL 2nd Stage Indiranagar',
    },
    'casino-el-camino': {
        'name': 'Casino El Camino',
        'short': 'CASINO EL CAMINO',
        'domain': 'casinoelcamino.net',
        'email': 'bar@casinoelcamino.net',
        'city': 'Austin',
        'sub': "Austin's legendary 6th Street rock 'n' roll burger bar and chili grill.",
        'locations_text': '517 E 6th St Downtown Austin',
    },
    'dans-burgers': {
        'name': "Dan's Hamburgers",
        'short': "DAN'S BURGERS",
        'domain': 'danshamburgers.com',
        'email': 'info@danshamburgers.com',
        'city': 'Austin',
        'sub': "Austin's original 1973 family-owned diner, flat-top burgers, and Texas toast.",
        'locations_text': 'Manchaca, Airport Blvd, Buda & North Lamar',
    },
    'dirty-martins': {
        'name': "Dirty Martin's Kum-Bak",
        'short': "DIRTY MARTIN'S",
        'domain': 'dirtymartins.com',
        'email': 'info@dirtymartins.com',
        'city': 'Austin',
        'sub': "Serving Austin on The Drag since 1926. Historic flat-top griddled burgers and shakes.",
        'locations_text': '2808 Guadalupe St UT Austin Drag',
    },
    'good-flippin-burgers': {
        'name': "Good Flippin' Burgers",
        'short': "GOOD FLIPPIN'",
        'domain': 'goodflippin.com',
        'email': 'hello@goodflippin.com',
        'city': 'Bangalore',
        'sub': "Fresh, juicy smashed burgers, potato brioche buns, and hand-spun shakes.",
        'locations_text': 'Church Street off Brigade Rd & Whitefield',
    },
    'jewboy-burgers': {
        'name': 'JewBoy Burgers',
        'short': 'JEWBOY BURGERS',
        'domain': 'jewboyburgers.com',
        'email': 'hello@jewboyburgers.com',
        'city': 'Austin',
        'sub': "El Paso border meets Jewish deli culture. Grilled onion smash burgers and latkes.",
        'locations_text': '5111 Airport Blvd Central Austin',
    },
    'leons-burgers': {
        'name': "Leon's Burgers & Wings",
        'short': "LEON'S BURGERS",
        'domain': 'leonsburgers.in',
        'email': 'contact@leonsburgers.in',
        'city': 'Bangalore',
        'sub': "Bangalore's spicy buttermilk crispy chicken burgers, peri-peri wings, and loaded fries.",
        'locations_text': 'Koramangala, Indiranagar, HSR, JP Nagar & Whitefield',
    },
    'little-deli-pizzeria': {
        'name': 'Little Deli & Pizzeria',
        'short': 'LITTLE DELI',
        'domain': 'littledeliandpizza.com',
        'email': 'info@littledeliandpizza.com',
        'city': 'Austin',
        'sub': "Crestview's artisan New Jersey-style pizzeria and handcrafted hot pastrami deli.",
        'locations_text': '7101 Woodrow Ave Crestview Austin',
    },
    'louis-burger': {
        'name': 'Louis Burger',
        'short': 'LOUIS BURGER',
        'domain': 'louisburger.in',
        'email': 'concierge@louisburger.in',
        'city': 'Bangalore',
        'sub': "Chef Zorawar Kalra's luxury gourmet smash burger atelier and artisanal sides.",
        'locations_text': 'Lavelle Road, Indiranagar & Koramangala',
    },
    'nadc-burger': {
        'name': 'NADC Burger',
        'short': 'NADC BURGER',
        'domain': 'nadcburger.com',
        'email': 'hello@nadcburger.com',
        'city': 'Austin',
        'sub': "Philip Speer & Neen Williams' 100% Texas Wagyu smash burgers and beef tallow fries.",
        'locations_text': '1007 E 6th St East Austin',
    },
    'original-burger-co': {
        'name': 'Original Burger Co. (OBC)',
        'short': 'ORIGINAL BURGER CO.',
        'domain': 'originalburgerco.in',
        'email': 'hello@originalburgerco.in',
        'city': 'Bangalore',
        'sub': "Bangalore's pure smash diner: double patties, bacon jam, and milkshakes.",
        'locations_text': 'Koramangala, Kalyan Nagar, JP Nagar, Race Course & Whitefield',
    },
    'pedrosos-pizza': {
        'name': "Pedroso's Pizza",
        'short': "PEDROSO'S PIZZA",
        'domain': 'pedrosospizza.com',
        'email': 'ciao@pedrosospizza.com',
        'city': 'Austin',
        'sub': "Grandma square pies, crispy NY thin crust, and slow-fermented Roman sourdough pizza.",
        'locations_text': 'Burnet Rd North Austin',
    },
    'pool-burger': {
        'name': 'Pool Burger',
        'short': 'POOL BURGER',
        'domain': 'poolburgeraustin.com',
        'email': 'aloha@poolburgeraustin.com',
        'city': 'Austin',
        'sub': "1968 Airstream burger trailer & tiki lounge perched above historic Deep Eddy Pool.",
        'locations_text': '2315 Lake Austin Blvd Deep Eddy',
    },
    'sankys-burger-house': {
        'name': "Sanky's Burger House",
        'short': "SANKY'S BURGERS",
        'domain': 'sankysburgerhouse.in',
        'email': 'grill@sankysburgerhouse.in',
        'city': 'Bangalore',
        'sub': "Underground garage diner serving monster smashed beef burgers and loaded fries.",
        'locations_text': 'Hennur Bande & Kammanahalli',
    },
    'simon-burgers': {
        'name': 'Simon Burgers',
        'short': 'SIMON BURGERS',
        'domain': 'simonburgers.in',
        'email': 'orders@simonburgers.in',
        'city': 'Bangalore',
        'sub': "Kammanahalli's neighborhood favorite late-night burger and thickshake kitchen.",
        'locations_text': '3rd Cross Kammanahalli',
    },
    'sour-duck-market': {
        'name': 'Sour Duck Market',
        'short': 'SOUR DUCK',
        'domain': 'sourduckmarket.com',
        'email': 'info@sourduckmarket.com',
        'city': 'Austin',
        'sub': "East Austin craft smokehouse, sourdough bakery, and Wagyu smash burgers.",
        'locations_text': '1814 E Martin Luther King Jr Blvd East Austin',
    },
    'truffles-bangalore': {
        'name': 'Truffles',
        'short': 'TRUFFLES',
        'domain': 'truffles.co.in',
        'email': 'hello@truffles.co.in',
        'city': 'Bangalore',
        'sub': "Bangalore's landmark cafe and burger institution since 2004.",
        'locations_text': 'Koramangala, St. Marks Road, Indiranagar & New BEL Rd',
    },
}

for slug, info in brand_details.items():
    proj_dir = os.path.join('projects', slug)
    if not os.path.exists(proj_dir):
        continue
    
    # Process all tsx/ts files in app/ and components/
    for folder in ['app', 'components']:
        f_dir = os.path.join(proj_dir, folder)
        if not os.path.exists(f_dir):
            continue
        for root, _, files in os.walk(f_dir):
            for fname in files:
                if fname.endswith(('.tsx', '.ts')):
                    fpath = os.path.join(root, fname)
                    with open(fpath, 'r', encoding='utf-8') as fh:
                        content = fh.read()
                    
                    original = content
                    # Replacements
                    content = content.replace('Smash Guys', info['short'])
                    content = content.replace('smashguys.in', info['domain'])
                    content = content.replace('hello@smashguys.in', info['email'])
                    content = content.replace('Popo Ventures Pvt Ltd', f"{info['name']} Hospitality")
                    content = content.replace('Bangalore favourite burger kitchen', f"{info['city']} favourite culinary destination")
                    content = content.replace("Bangalore's favourite burger kitchen", f"{info['city']} favourite culinary destination")
                    
                    if content != original:
                        with open(fpath, 'w', encoding='utf-8') as fh:
                            fh.write(content)
                        print(f"Normalized {slug}: {os.path.relpath(fpath, proj_dir)}")

print("\nFinished normalizing branding across all 23 non-smash-guys projects!")
