import os

brand_configs = {
    # 🇮🇳 Bangalore Brands
    'beyondburg-inc': {
        'name': 'Beyondburg Inc.',
        'short_name': 'BEYONDBURG INC.',
        'tagline': 'CULT SMASH BURGER CO. · ST. MARKS RD · BENGALURU',
        'sub': '450°F STEEL CAST-IRON SMASH',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'archetype': 'haute',
        'specialty': 'Smashed Prime Cuts & Lotus Biscoff Malts',
        'steps': [
            ("01", "COLD COARSE GROUND SPHERES", "We roll 80/20 fresh prime cuts into chilled spheres immediately before hitting the searing 450°F flat-top."),
            ("02", "200 LBS DIRECT LEVERAGE", "Custom heavy-gauge stainless steel press creates razor-thin lace edges with maximum Maillard caramelization."),
            ("03", "BUTTER-STEAMED POTATO BUNS", "Plush potato buns griddled directly in meat drippings and sweet cream butter to absorb rich savory juices.")
        ],
        'ticker': [
            "THE OG DOUBLE SMASH", "NASHVILLE HOT FRIED CHICKEN", "SMASHED TRUFFLE SHROOM",
            "ANIMAL STYLE CRINKLE FRIES", "LOTUS BISCOFF MALT SHAKE", "ST. MARKS ROAD · BANGALORE"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'truffles-bangalore': {
        'name': 'Truffles',
        'short_name': 'TRUFFLES',
        'tagline': 'SINCE 2004 · BANGALORE\'S ICONIC BURGERS & SHAKES',
        'sub': 'SIGNATURE AMERICAN CHEESE MELT',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#F5A623',
        'text_on_primary': '#000000',
        'archetype': 'fast_casual',
        'spice_default': 'Classic All-American',
        'steps': [
            ("01", "20+ YEARS OF CULT BURGERS", "Serving generations of Bangalore foodies since 2004 with unmatched flavor, consistency, and love."),
            ("02", "SIGNATURE DOUBLE CHEESE MELT", "Patties packed with premium minced cuts, secret steakhouse spices, and molten American cheese."),
            ("03", "LEGENDARY THICK MILKSHAKES", "Famous thickshakes blended with whole Ferrero Rochers, Belgian chocolate fudge, and fresh cream.")
        ],
        'ticker': [
            "THE ALL AMERICAN CHEESE BURGER", "FERRERO ROCHER ULTRA THICKSHAKE", "TRUFFLES ST. MARKS RD SINCE 2004",
            "CRISPY PERI-PERI CHICKEN BURGER", "KORAMANGALA & INDIRANAGAR", "BANGALORE'S #1 ICONIC BURGER"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'burger-seigneur': {
        'name': 'Burger Seigneur',
        'short_name': 'BURGER SEIGNEUR',
        'tagline': 'ARTISANAL EUROPEAN GOURMET ATELIER · INDIRANAGAR',
        'sub': 'HAUTE BRIOCHE & TRUFFLE MELT',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#C8A96E',
        'text_on_primary': '#000000',
        'archetype': 'haute',
        'specialty': 'Truffled Forest Mushrooms & French Brioche',
        'steps': [
            ("01", "FRENCH ARTISANAL BRIOCHE", "Baked fresh every morning using cultured Normandy butter for an airy, pillowy crumb."),
            ("02", "WILD FOREST TRUFFLE SAUCE", "Sauteed cremini and porcini mushrooms simmered in French black winter truffle cream."),
            ("03", "PREMIUM PRIME TENDERLOIN", "Prime grain-fed beef seared to medium-juicy perfection with melted Gruyère cheese.")
        ],
        'ticker': [
            "THE LUCIEN TRUFFLE BURGER", "TRAILBLAZER PRIME BEEF", "DYNAMITE FRIED CHICKEN",
            "FRENCH FOREST MUSHROOM MELT", "BELGIAN SPECULOOS BISCOFF SHAKE", "HAUTE INDIRANAGAR ATELIER"
        ],
        'particles': True,
        'dot_opacity': 0.08
    },
    'sankys-burger-house': {
        'name': 'Sanky\'s Burger House',
        'short_name': 'SANKY\'S BURGER HOUSE',
        'tagline': 'THE LATE-NIGHT CULT BURGER GARAGE · HENNUR',
        'sub': 'UNDERGROUND MONSTER SMASH CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#FFE500',
        'text_on_primary': '#000000',
        'archetype': 'garage',
        'open_till': '3:00 AM',
        'location': 'Hennur Garage',
        'steps': [
            ("01", "THE HEAVY GARAGE SMASH", "Giant hand-seasoned patties smashed onto screaming cast iron until thick and juicy with char edges."),
            ("02", "MONSTER CHEESE CASCADE", "Loaded with double American cheese, caramelized onions, and secret garage monster sauce."),
            ("03", "HENNUR LATE-NIGHT MECCA", "Serving Bangalore night owls till the early morning hours with monster thickshakes and fries.")
        ],
        'ticker': [
            "THE MONSTER GARAGE DOUBLE CHEESE", "HENNUR LATE-NIGHT CULT SPOT", "SIZZLING CAST-IRON MONSTER SMASH",
            "LOADED CHILI CHEESE FRIES", "FERRERO CHOCOLATE MONSTER SHAKE", "OPEN TILL 3:00 AM"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'biggies-burger': {
        'name': 'Biggies Burger',
        'short_name': 'BIGGIES BURGER',
        'tagline': 'ORIGINAL GRILLED BURGERS · BANGALORE',
        'sub': 'AUTHENTIC BEHEMOTH CHARBROIL',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#F26522',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Smoky Charbroil',
        'steps': [
            ("01", "HIGH-HEAT OPEN CHARBROIL", "Flames sear the patty surface instantly, locking in juices while infusing authentic smoky char flavor."),
            ("02", "DOUBLE-MELTED MONSTER CHEESE", "Dual thick patties layered with American cheddar and Swiss cheese, melted under heavy stainless cloches."),
            ("03", "SIGNATURE SECRET SAUCE", "Drizzled with our proprietary spiced burger dressing and crisp iceberg lettuce on toasted sesame rolls.")
        ],
        'ticker': [
            "THE BEHEMOTH DOUBLE CHEESE", "FLAME-GRILLED TENDERLOIN", "SMOKY BBQ CHICKEN TOWER",
            "PERI PERI LOADED WEDGES", "BLUEBERRY CHEESECAKE SHAKE", "BANGALORE FLAME GRILL"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'leons-burgers': {
        'name': 'Leon\'s Burgers & Wings',
        'short_name': 'LEON\'S BURGERS & WINGS',
        'tagline': '24-HR BUTTERMILK FRIED CHICKEN & BURGERS · INDIRANAGAR',
        'sub': '24-HR BUTTERMILK PERI-PERI CRUNCH',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#B12727',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Nashville Hot',
        'steps': [
            ("01", "24-HOUR HERB BUTTERMILK BRINE", "Whole chicken thighs marinated in cultured buttermilk and African bird's eye peri-peri chilies."),
            ("02", "DOUBLE-DIPPED FLAKY CRUST", "Dredged in seasoned flour and flash-fried to golden, ultra-crispy crunch perfection."),
            ("03", "HOUSE PERI-PERI GLAZE", "Tossed in fiery signature peri-peri garlic oil and topped with crunchy pickled slaw.")
        ],
        'ticker': [
            "THE PERI-PERI CRUNCH BURGER", "24-HR BUTTERMILK FRIED WINGS", "SMOKED BBQ BACON CHEESEBURGER",
            "GUNPOWDER CRISPY CRINKLE FRIES", "INDIRANAGAR FLAGSHIP SPOT", "AUTHENTIC PERI-PERI SPICE"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'louis-burger': {
        'name': 'Louis Burger',
        'short_name': 'LOUIS BURGER',
        'tagline': 'CHEF ZORAWAR KALRA · CRAFT GOURMET BURGERS',
        'sub': '24K GOLD WAGYU & TRUFFLE MELT',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#D4AF37',
        'text_on_primary': '#000000',
        'archetype': 'haute',
        'specialty': '24K Edible Gold Leaf & Japanese Wagyu',
        'steps': [
            ("01", "IMPORTED AKAUSHI WAGYU", "Ultra-marbled Japanese breed beef seared to preserve rich, buttery umami fats."),
            ("02", "24K EDIBLE GOLD & TRUFFLE", "Finished with delicate edible gold leaf flakes, French truffle butter, and aged Gouda melt."),
            ("03", "GOLDEN GRILLED BRIOCHE", "Custom-baked artisanal brioche rolls infused with sweet cream butter and toasted to perfection.")
        ],
        'ticker': [
            "THE 24K GOLD WAGYU BURGER", "BLACK WINTER TRUFFLE SHROOM", "CHEF ZORAWAR KALRA SIGNATURE",
            "CRISPY KOREAN FRIED CHICKEN", "BELGIAN TRUFFLE PARMESAN FRIES", "HAUTE BENGALURU BURGER LAB"
        ],
        'particles': True,
        'dot_opacity': 0.08
    },
    'original-burger-co': {
        'name': 'Original Burger Co. (OBC)',
        'short_name': 'ORIGINAL BURGER CO.',
        'tagline': 'DOUBLE SMASH & BACON JAM DINER · BANGALORE',
        'sub': 'DOUBLE SMASHED BACON JAM CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Bacon Jam Melt',
        'steps': [
            ("01", "HOUSE BACON MARMALADE", "Slow-simmered smoked bacon with caramelized sweet shallots, maple syrup, and balsamic glaze."),
            ("02", "ULTRA-THIN MAILLARD LACE", "High-pressure flat-top smash generating maximum crispy crust on dual beef patties."),
            ("03", "LIQUID AMERICAN CHEDDAR", "Molten sharp cheddar cascading over hot patties inside griddled Martin's potato rolls.")
        ],
        'ticker': [
            "THE OBC DOUBLE SMASH BACON JAM", "TRIPLE CHEESE MELT BURGER", "CARAMELIZED LACE EDGE CRUST",
            "TRUFFLE BUTTER LOADED FRIES", "PEANUT BUTTER BROWNIE SHAKE", "BANGALORE SMASH DINER"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'backyard-burgers': {
        'name': 'Backyard Burgers & Grill',
        'short_name': 'BACKYARD BURGERS',
        'tagline': 'OPEN-AIR SMOKEHOUSE & GRILL · KORAMANGALA',
        'sub': 'SMOKEHOUSE BARK & CHARCOAL SMASH',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#E67E22',
        'text_on_primary': '#000000',
        'archetype': 'garage',
        'open_till': '1:00 AM',
        'location': 'Koramangala',
        'steps': [
            ("01", "HICKORY & POST OAK WOOD", "We smoke our meats over seasoned hickory logs in open-air pits to develop a deep smoky bark before finishing on sizzling cast iron."),
            ("02", "COARSE GROUND BRISKET", "Custom blend of prime chuck and smoked brisket, hand-pattied and smashed ultra-crisp with sweet caramelised onions."),
            ("03", "HOUSE PEPPER BARBECUE", "Finished with scratch-made smoky chipotle BBQ sauce and molten sharp cheddar on toasted buttered brioche.")
        ],
        'ticker': [
            "SMOKED HICKORY BRISKET BURGER", "KORAMANGALA OPEN-AIR SMOKEHOUSE", "CRISPY BACON SMASH",
            "LOADED PULLED CHICKEN FRIES", "CHARRED JALAPEÑO POPPERS", "HOUSE CHIPOTLE BBQ GLAZE"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'burger-elite': {
        'name': 'BURGER ELITE',
        'short_name': 'BURGER ELITE',
        'tagline': 'STREET SMASH ROYALE · INDIRANAGAR',
        'sub': 'DOUBLE SMASH ROYALE CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#7C3AED',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Street Royale',
        'steps': [
            ("01", "DOUBLE CRUNCH SEAR", "Dual patties pressed against screaming steel until the edges shatter with crunchy caramelized flavor."),
            ("02", "HOUSE ROYALE GLAZE", "Infused with our signature spiced umami glaze, caramelized onions, and aged melted Monterey Jack."),
            ("03", "ARTISAN TOASTED BRIOCHE", "Cushioned inside golden French brioche, griddled with garlic herb butter.")
        ],
        'ticker': [
            "THE ELITE ROYALE SMASH", "INDIRANAGAR DOUBLE CRUNCH", "TRUFFLE PARMESAN WEDGES",
            "BELGIAN CHOCOLATE THICKSHAKE", "SMOKED BACON JAM SPECIAL", "LATE-NIGHT ROYALE KITCHEN"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'burgerman': {
        'name': 'BurgerMan',
        'short_name': 'BURGERMAN',
        'tagline': '100% FLAME-GRILLED WHOLE WHEAT BURGERS',
        'sub': 'GUILT-FREE FLAME GRILLED CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#15803D',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Flame Herb',
        'steps': [
            ("01", "100% FLAME GRILLED · ZERO OIL", "Patties are grilled directly over high-heat ceramic flames without oil frying, locking in pure flavor."),
            ("02", "FRESH WHOLE WHEAT BUNS", "Handcrafted whole wheat and multigrain buns baked daily with zero trans fats or chemical preservatives."),
            ("03", "HOUSE FERMENTED SAUCES", "Paired with fresh garden herbs, probiotic sauces, and crisp farm-fresh hydroponic greens.")
        ],
        'ticker': [
            "FLAME-GRILLED MUSHROOM BURGER", "100% WHOLE WHEAT ARTISAN BUNS", "GRILLED CHICKEN STEAK BURGER",
            "GUILT-FREE HERB WEDGES", "SALTED CARAMEL PROTEIN SHAKE", "CLEAN FLAME-GRILL LAB"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'good-flippin-burgers': {
        'name': 'Good Flippin\' Burgers',
        'short_name': 'GOOD FLIPPIN\' BURGERS',
        'tagline': 'FRESH SMASHED JUICY BURGERS · BANGALORE',
        'sub': 'FRESH SMASHED BRIOCHE PERFECTION',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#BE123C',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Peri-Peri Crunch',
        'steps': [
            ("01", "FRESH NEVER-FROZEN CUTS", "Ground fresh daily in small batches to guarantee the juiciest, most flavorful smashed bite."),
            ("02", "MOLTEN CHEESE BLEND", "Layered with English cheddar and Swiss Gruyère, melted directly over searing flat-top patties."),
            ("03", "SQUISHY STEAMED ROLLS", "Served on ultra-soft potato brioche rolls toasted in pure sweet butter.")
        ],
        'ticker': [
            "THE GRINCH SMASH BURGER", "CHEESE BOMB HOT SMASH", "PERI PERI CRUNCHY WINGS",
            "CRUSHED OREO THICKSHAKE", "BANGALORE FRESH JUICY BURGERS", "HOUSE TRUFFLE DIPS"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'simon-burgers': {
        'name': 'Simon Burgers',
        'short_name': 'SIMON BURGERS',
        'tagline': 'LATE-NIGHT SMASH BURGERS & FRIES · KAMMANAHALLI',
        'sub': 'KAMMANAHALLI MONSTER DOUBLE CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'archetype': 'garage',
        'open_till': '2:30 AM',
        'location': 'Kammanahalli',
        'steps': [
            ("01", "PRIME DOUBLE STACK", "Dual juicy patties seasoned with house smoked paprika, smashed hot on searing steel."),
            ("02", "MELTED SHARP CHEDDAR", "Thick slices of Wisconsin cheddar melted over sizzling meat on the flat top."),
            ("03", "BUTTERY TOASTED BUNS", "Sandwiched inside butter-griddled brioche with Simon's signature spicy burger spread.")
        ],
        'ticker': [
            "THE SIMON SPECIAL DOUBLE SMASH", "KAMMANAHALLI LATE-NIGHT MECCA", "SPICY CHIPOTLE CHICKEN BURGER",
            "CRUNCHY CHEESY POTATO WEDGES", "THICK NUTELLA MALT SHAKE", "BANGALORE STREET SMASH"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'smash-guys': {
        'name': 'Smash Guys',
        'short_name': 'SMASH GUYS',
        'tagline': '450°F CAST-IRON SMASHED BURGERS · BANGALORE',
        'sub': 'MAXIMUM CRUNCH MAILLARD CRUST',
        'city': 'Bangalore',
        'currency': '₹',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'archetype': 'fast_casual',
        'spice_default': 'Maillard Original',
        'steps': [
            ("01", "PREMIUM 80/20 COARSE GRIND", "Rolled fresh daily and chilled right before hitting the searing steel for maximum crust."),
            ("02", "CAST-IRON WEIGHT LEVERAGE", "Heavy presses create paper-thin crispy lace edges with deep caramelized Maillard browning."),
            ("03", "PENNSYLVANIA POTATO ROLLS", "Butter-griddled potato buns that cushion molten cheese and savory dripping juices.")
        ],
        'ticker': [
            "THE SMASH GUYS ORIGINAL DOUBLE", "450°F CAST-IRON SMASH LAB", "CRISPY MAILLARD LACE EDGES",
            "ANIMAL STYLE CRINKLE FRIES", "HAND-SPUN LOTUS BISCOFF SHAKE", "INDIRANAGAR & BELLANDUR"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },

    # 🇺🇸 Austin Brands
    'dans-burgers': {
        'name': 'Dan\'s Hamburgers',
        'short_name': 'DAN\'S HAMBURGERS',
        'tagline': 'SINCE 1973 · AN AUSTIN ORIGINAL',
        'sub': 'FLAT-TOP SIZZLE & TEXAS TOAST',
        'city': 'Austin',
        'currency': '$',
        'primary': '#D97706',
        'text_on_primary': '#FFFFFF',
        'archetype': 'heritage',
        'year': '1973',
        'landmark': 'Manchaca Rd & Lamar Blvd, Austin',
        'steps': [
            ("01", "THE LEGENDARY $50 RECIPE", "Dan and Frances Junk bought the secret seasoning recipe for $50 in 1973 and never changed a single spice."),
            ("02", "BUTTER-GRIDDLED TEXAS TOAST", "Thick-cut Texas toast sizzled in real butter until crispy and golden on the historic flat-top."),
            ("03", "CRIMPED JALAPEÑO SMASH", "Fresh beef patties smashed with grilled onions, pickled jalapeños, and melted American cheese.")
        ],
        'ticker': [
            "DAN'S DOUBLE CHEESE ON TEXAS TOAST", "1973 AUSTIN ORIGINAL DINER", "HOMEMADE ONION RINGS",
            "FRESH JALAPEÑO FLAT-TOP SMASH", "SOUTH AUSTIN MANCHACA PRIDE", "AUTHENTIC THICK MALT SHAKES"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'dirty-martins': {
        'name': 'Dirty Martin\'s Kum-Bak',
        'short_name': 'DIRTY MARTIN\'S KUM-BAK',
        'tagline': 'SINCE 1926 · 100 YEARS ON THE DRAG · AUSTIN',
        'sub': 'CENTENNIAL KUM-BAK CHILI CRUST',
        'city': 'Austin',
        'currency': '$',
        'primary': '#BF5700',
        'text_on_primary': '#FFFFFF',
        'archetype': 'heritage',
        'year': '1926',
        'landmark': '2808 Guadalupe St, Austin',
        'steps': [
            ("01", "A CENTURY OF SIZZLE", "Serving UT students and Austin locals since 1926 on the very same historic seasoned cast-iron griddle."),
            ("02", "THE KUM-BAK CHILI SECRET", "Smothered in our 100-year-old family chili recipe with grilled onions and sharp American cheese."),
            ("03", "CRISPY TATER TOTS & MALTS", "Paired with golden fried tots and hand-dipped chocolate malt thickshakes in frosty glasses.")
        ],
        'ticker': [
            "THE KUM-BAK SPECIAL CHEESEBURGER", "100 YEARS ON THE DRAG (1926-2026)", "DIRTY'S FAMOUS CHILI CHEESE TOTS",
            "HAND-DIPPED CHOCOLATE MALT", "LONGHORN HISTORIC TRADITION", "2808 GUADALUPE ST · AUSTIN"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'casino-el-camino': {
        'name': 'Casino El Camino',
        'short_name': 'CASINO EL CAMINO',
        'tagline': '6TH STREET CULT ROCK BURGERS · AUSTIN',
        'sub': 'CHARBROILED VERDE CHILI SEAR',
        'city': 'Austin',
        'currency': '$',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'archetype': 'garage',
        'open_till': '2:00 AM',
        'location': '6th Street Austin',
        'steps': [
            ("01", "3/4 LB CHARBROILED BEASTS", "Massive hand-formed 12-ounce beef patties seared over screaming lava rocks for authentic smoke flavor."),
            ("02", "FIRE-ROASTED VERDE CHILIES", "Stacked with fresh roasted serranos, poblanos, and melted habanero jack cheese."),
            ("03", "6TH STREET LATE-NIGHT SOUL", "Served on crusty griddled Texas sourdough buns with spicy verde mayo and bloody marys.")
        ],
        'ticker': [
            "THE FAMOUS AMARILLO BURGER", "BUFFALO BURGER WITH SERRANOS", "6TH STREET CULT ROCK INSTITUTION",
            "LATE-NIGHT CHARBROILED MONSTERS", "VERDE CHILI CHEESE FRIES", "AUSTIN TEXAS MUSIC FOLKLORE"
        ],
        'particles': True,
        'dot_opacity': 0.14
    },
    'jewboy-burgers': {
        'name': 'JewBoy Burgers',
        'short_name': 'JEWBOY BURGERS',
        'tagline': 'EL PASO BORDER MEETS DINER · AUSTIN',
        'sub': 'GRILLED ONION STEAMED SMASH',
        'city': 'Austin',
        'currency': '$',
        'primary': '#06B6D4',
        'text_on_primary': '#000000',
        'archetype': 'heritage',
        'year': '2016',
        'landmark': 'Airport Blvd, Austin',
        'steps': [
            ("01", "STEAM-GRIDDLED ONIONS", "Fresh beef smashed directly over a heap of sweet onions on the flat-top, locking moisture into the meat."),
            ("02", "ROASTED HATCH GREEN CHILE", "Smothered in authentic roasted New Mexico Hatch green chiles and melted Wisconsin cheddar."),
            ("03", "HOME-STYLE LATKES & QUESO", "Served on pillowy Martin's potato rolls with crispy potato latkes and house green chile queso.")
        ],
        'ticker': [
            "THE OY VEY HATCH GREEN CHILE BURGER", "CRISPY HOME-STYLE POTATO LATKES", "EL PASO BORDER MEETS DELI",
            "BURGER SMASHED WITH SWEET ONIONS", "HOUSE GREEN CHILE QUESO", "AUSTIN TEXAS COMFORT SOUL"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'pedrosos-pizza': {
        'name': 'Pedroso\'s Pizza',
        'short_name': 'PEDROSO\'S PIZZA',
        'tagline': 'GRANDMA SQUARES & ROMAN STYLE PIZZA · AUSTIN',
        'sub': 'SLOW-FERMENTED ROMAN CRISP CRUST',
        'city': 'Austin',
        'currency': '$',
        'primary': '#B91C1C',
        'text_on_primary': '#FFFFFF',
        'archetype': 'ferment',
        'hours': '72 Hours',
        'temp': '650°F',
        'steps': [
            ("01", "72-HOUR COLD DOUGH FERMENT", "Long slow fermentation breaks down complex starches, resulting in an airy, crispy, ultra-digestible crust."),
            ("02", "CUP-AND-CHAR PEPPERONI", "Ezzo natural casing pepperoni that curls into crispy little grease chalices when baked at high heat."),
            ("03", "SAN MARZANO D.O.P. & HOT HONEY", "Finished with crushed Campania plum tomatoes, whole milk mozzarella, and Mike's Hot Honey drizzle.")
        ],
        'ticker': [
            "GRANDMA HOT HONEY PEPPERONI SQUARE", "72-HR SLOW FERMENTED DOUGH", "CRISPY BOTTOM ROMAN CRUST",
            "SAN MARZANO D.O.P. PIZZA PIES", "AIRPORT BLVD & JUSTIN LN · AUSTIN", "ARTISANAL ITALIAN SLICES"
        ],
        'particles': True,
        'dot_opacity': 0.12
    },
    'little-deli-pizzeria': {
        'name': 'Little Deli & Pizzeria',
        'short_name': 'LITTLE DELI & PIZZERIA',
        'tagline': 'NJ STONE-BAKED PIES & PASTRAMI SUBS · CRESTVIEW',
        'sub': 'ARTISAN STONE-BAKED NJ CRUST',
        'city': 'Austin',
        'currency': '$',
        'primary': '#166534',
        'text_on_primary': '#FFFFFF',
        'archetype': 'ferment',
        'hours': '48 Hours',
        'temp': '650°F',
        'steps': [
            ("01", "SLOW-FERMENTED PIZZA DOUGH", "Aged 48 hours in cold fermentation to develop a crisp, airy crust with blistered leopard spotting."),
            ("02", "STONE-DECK BAKED AT 650°F", "Baked directly on massive refractory stones for that unmistakable New Jersey pizzeria bottom crunch."),
            ("03", "HOUSE-SMOKED NYC PASTRAMI", "Whole brisket brined for 10 days, heavily peppered, and smoked over hardwoods for our legendary subs.")
        ],
        'ticker': [
            "JERSEY STONE-BAKED PEPPERONI PIE", "HOUSE-SMOKED PASTRAMI REUBEN", "CRESTVIEW AUSTIN DELI LANDMARK",
            "CRISPY SICILIAN PAN SQUARES", "HOMEMADE NEW YORK CANNOLI", "ARTISAN ITALIAN COLD CUTS"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'pool-burger': {
        'name': 'Pool Burger',
        'short_name': 'POOL BURGER',
        'tagline': '1968 AIRSTREAM TIKI SMASH BURGERS · DEEP EDDY',
        'sub': 'AIRSTREAM TIKI DOUBLE SMASH',
        'city': 'Austin',
        'currency': '$',
        'primary': '#F43F5E',
        'text_on_primary': '#FFFFFF',
        'archetype': 'fast_casual',
        'spice_default': 'Island Jalapeño',
        'steps': [
            ("01", "IN-HOUSE GROUND WAGYU", "All-natural Wagyu beef ground fresh inside our vintage 1968 Airstream trailer daily."),
            ("02", "TIKI COCKTAIL FLAVOR PROFILE", "Patties paired with grilled pineapple, pickled jalapeños, and Polynesian island spices."),
            ("03", "DEEP EDDY POOL VIBES", "Served under palm trees with tropical Mai Tais, crinkle fries, and soft serve vanilla cones.")
        ],
        'ticker': [
            "THE LOCO POOL DOUBLE WAGYU", "1968 VINTAGE AIRSTREAM TIKI", "CRISPY CRINKLE CUT FRIES",
            "FROZEN TROPICAL MAI TAIS", "DEEP EDDY AUSTIN TEXAS", "HAND-SPUN TIKI MILKSHAKES"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'sour-duck-market': {
        'name': 'Sour Duck Market',
        'short_name': 'SOUR DUCK MARKET',
        'tagline': 'SOURDOUGH BAKERY & SMOKEHOUSE · EAST AUSTIN',
        'sub': 'NATURALLY FERMENTED SOURDOUGH BAKE',
        'city': 'Austin',
        'currency': '$',
        'primary': '#EA580C',
        'text_on_primary': '#FFFFFF',
        'archetype': 'ferment',
        'hours': '36 Hours',
        'temp': 'Live Post Oak',
        'steps': [
            ("01", "36-HR WILD YEAST SOURDOUGH", "Locally milled organic Texas grains naturally fermented for 36 hours for complex flavor and blistered crust."),
            ("02", "POST OAK CENTRAL TEXAS SMOKE", "Whole briskets and heritage pork smoked low and slow over live post oak coals in our East Austin yard."),
            ("03", "LOCAL FARM-TO-TABLE COMFORT", "Everything from scratch: seasonal pickles, cultured churned butter, and Texas draft beers.")
        ],
        'ticker': [
            "NATURALLY FERMENTED SOURDOUGH BURGER", "CENTRAL TEXAS POST OAK SMOKEHOUSE", "CARDAMOM LAMINATED MORNING BUN",
            "EAST AUSTIN OUTDOOR BEER GARDEN", "FARM-TO-TABLE SEASONAL KITCHEN", "LOCAL TEXAS CRAFT CIDERS"
        ],
        'particles': True,
        'dot_opacity': 0.10
    },
    'burger-bar-austin': {
        'name': 'Burger Bar on Congress',
        'short_name': 'BURGER BAR ON CONGRESS',
        'tagline': 'DOWNTOWN AUSTIN WALK-UP FLAT TOP',
        'sub': 'CONGRESS AVENUE STREET SMASH',
        'city': 'Austin',
        'currency': '$',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'archetype': 'heritage',
        'year': '1953',
        'landmark': 'Congress Ave, Austin',
        'steps': [
            ("01", "FRESH DAILY GROUND ANGUS", "Sourced from Texas ranches and ground fresh every morning for the ultimate juicy, beef-forward bite."),
            ("02", "HOT FLAT-TOP SCORCH", "Smashed fast at intense heat with grilled sweet onions to create crispy caramelized lace borders."),
            ("03", "AUSTIN WALK-UP TRADITION", "Served fast, piping hot, and wrapped in foil with crinkle fries and hand-spun shakes on Congress Ave.")
        ],
        'ticker': [
            "CONGRESS AVENUE DOUBLE SMASH", "TEXAS CHILI CHEESE BURGER", "HAND-SPUN PEANUT BUTTER SHAKE",
            "CRISPY TALLOW CRINKLE FRIES", "AUSTIN WALK-UP WINDOW", "LOCAL TEXAS DRAFT BEERS"
        ],
        'particles': False,
        'dot_opacity': 0.10
    },
    'nadc-burger': {
        'name': 'NADC Burger',
        'short_name': 'NADC BURGER',
        'tagline': '100% TEXAS WAGYU & DUCK FAT TALLOW FRIES · RAINEY ST',
        'sub': 'AKAUSHI CARAMELIZED MAILLARD CRUST',
        'city': 'Austin',
        'currency': '$',
        'primary': '#FFFFFF',
        'text_on_primary': '#000000',
        'archetype': 'haute',
        'specialty': '100% Texas Akaushi Wagyu & Duck Fat Tallow',
        'steps': [
            ("01", "100% TEXAS AKAUSHI WAGYU", "Michelin-starred chef crafted using pure Texas Wagyu beef with no filler, lean, or trimmings."),
            ("02", "DUCK FAT TALLOW FRIES", "Idaho potatoes fried three times in pure beef tallow and duck fat for extreme glass-like crispiness."),
            ("03", "SECRET SECRET SAUCE", "Layered with American cheese, pickles, and chef's proprietary savory sauce on a steamed potato bun.")
        ],
        'ticker': [
            "100% TEXAS AKAUSHI WAGYU", "DUCK FAT TALLOW FRIES", "CHEF PHILLIP FRANKLAND LEE",
            "NOT A DAMN CHANCE BURGER", "AUSTIN TEXAS RAINEY STREET", "PURE MICHELIN STAR CRAFT"
        ],
        'particles': True,
        'dot_opacity': 0.06
    },
}

layout_template = """import InteractiveBackground from "@/components/ui/InteractiveBackground";
import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "__BRAND_NAME__ | __BRAND_TAGLINE__",
  description: "__BRAND_NAME__ — __BRAND_SUB__. Serving __BRAND_CITY__.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070709] text-[#FAF8F2] overflow-x-hidden">
        <LenisProvider>
          <InteractiveBackground />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
"""

page_template = """"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/marketing/Preloader";
import Nav from "@/components/marketing/Nav";
import CinematicHero from "@/components/marketing/CinematicHero";
import BrandManifesto from "@/components/marketing/BrandManifesto";
import ScrollytellingText from "@/components/marketing/ScrollytellingText";
import CulinaryAccordionGallery from "@/components/marketing/CulinaryAccordionGallery";
import AtelierAssembly from "@/components/marketing/AtelierAssembly";
import CinematicSmoothie from "@/components/marketing/CinematicSmoothie";
import ArchetypeShowcase from "@/components/marketing/ArchetypeShowcase";
import SignatureMenu from "@/components/marketing/SignatureMenu";
import HowWeSmash from "@/components/marketing/HowWeSmash";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";
import ReservationCTA from "@/components/marketing/ReservationCTA";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="relative z-10">
        <Nav />
        <CinematicHero />
        <BrandManifesto />
        <ScrollytellingText />
        <CulinaryAccordionGallery />
        <AtelierAssembly />
        <CinematicSmoothie />
        <ArchetypeShowcase />
        <SignatureMenu />
        <HowWeSmash />
        <RestaurantLocations />
        <ReservationCTA />
        <Footer />
      </main>
    </>
  );
}
"""

nav_template = """"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = Math.max(0, currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out select-none ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-[#0a0a0c]/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-4"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Brand Logo / Pure Typographic Wordmark (Borderless, Zero Box/Rectangles) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-72 sm:w-96 h-10">
            <Image
              src="/logo.svg"
              alt="__BRAND_NAME__"
              fill
              unoptimized
              className="object-contain object-left group-hover:opacity-90 transition-opacity duration-200"
              priority
            />
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-stone-400">
          <Link href="/menu" className="hover:text-white transition-colors">
            Menu
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            Our Story
          </Link>
          <Link href="/locations" className="hover:text-white transition-colors">
            Locations
          </Link>
          <Link href="/films" className="hover:text-white transition-colors">
            Films
          </Link>
        </nav>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="px-5 py-2 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{
              backgroundColor: "__PRIMARY__",
              color: "__TEXT_ON_PRIMARY__",
            }}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </header>
  );
}
"""

logo_svg_template = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 54" fill="none">
  <text x="0" y="30" fill="__PRIMARY__" font-family="'Space Grotesk', 'Impact', sans-serif" font-size="28" font-weight="900" letter-spacing="2">__SHORT_NAME__</text>
  <text x="0" y="48" fill="#A8A29E" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" letter-spacing="2">__TAGLINE__</text>
</svg>
"""

preloader_template = """"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080a] text-[#f5f5f5] overflow-hidden select-none">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 animate-pulse"
        style={{ backgroundColor: "__PRIMARY__" }}
      />

      {/* Concentric Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{
              scale: [0.2, 3.8],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.9,
            }}
            className="absolute rounded-full border"
            style={{
              borderColor: "__PRIMARY__",
              width: "300px",
              height: "300px",
            }}
          />
        ))}
      </div>

      {/* Centered Brand Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl px-6 text-center">
        {/* Loading Counter */}
        <div
          className="w-24 h-24 rounded-full bg-[#121214] border flex items-center justify-center relative shadow-2xl"
          style={{ borderColor: "__PRIMARY__40" }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: "__PRIMARY__" }}
          />
          <span className="font-mono text-xl font-bold" style={{ color: "__PRIMARY__" }}>
            {progress}%
          </span>
        </div>

        {/* Brand Identity & Craft Subtitle */}
        <div className="space-y-2">
          <h2 className="type-display text-4xl sm:text-5xl text-white tracking-wider font-extrabold">
            __SHORT_NAME__
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
            __SUB__
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "__PRIMARY__" }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 pt-2">
          __TAGLINE__
        </p>
      </div>
    </div>
  );
}
"""

interactive_bg_template = """"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!__PARTICLES__) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      maxAlpha: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.005 + 0.002,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.alpha += p.fadeSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "__PRIMARY__";
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * 0.4));
        ctx.shadowBlur = 8;
        ctx.shadowColor = "__PRIMARY__";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[#070709]" />

      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-15 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: "__PRIMARY__",
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      {/* Ambient Radial Highlights */}
      <div
        className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 pointer-events-none"
        style={{ backgroundColor: "__PRIMARY__" }}
      />
      <div
        className="absolute bottom-0 left-10 w-[700px] h-[700px] rounded-full blur-[200px] opacity-08 pointer-events-none"
        style={{ backgroundColor: "__PRIMARY__" }}
      />

      {/* Micro-Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[__DOT_OPACITY__]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, __PRIMARY__ 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Film Grain Noise */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Embers Canvas */}
      {__PARTICLES__ && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
}
"""

signature_menu_template = """"use client";

import React, { useState } from "react";
import { menuItems } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer, { CartItem } from "@/components/marketing/CartDrawer";

const categories = [
  "Full Menu",
  "Signature Lineup",
  "Beverages & Shakes",
  "Sides & Extras",
  "Secret Reserve"
];

export default function SignatureMenu() {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1, description: item.description }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0);
    });
  };

  const filteredItems = menuItems.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    if (selectedCatIndex === 0) return true;
    if (selectedCatIndex === 1) return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCatIndex === 2) return cat.includes("shake") || cat.includes("drink") || cat.includes("sweet") || cat.includes("dessert");
    if (selectedCatIndex === 3) return cat.includes("side") || cat.includes("fry") || cat.includes("wing") || cat.includes("salad");
    return true;
  });

  return (
    <section id="menu-section" className="py-24 px-6 sm:px-12 md:px-20 bg-[#0a0a0d] text-[#FAF8F2] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: "__PRIMARY__" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
                HANDCRAFTED CULINARY LINEUP
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-bold tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="font-mono text-xs text-stone-400">
              Showing <span className="font-bold text-white">{filteredItems.length}</span> Items
            </div>

            {/* Cart Quick Access */}
            {cartItems.length > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="px-4 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border"
                style={{
                  backgroundColor: "__PRIMARY__",
                  color: "__TEXT_ON_PRIMARY__",
                  borderColor: "__PRIMARY__",
                }}
              >
                <span>🛒</span>
                <span>Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Buttery smooth, classic style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => {
            const isSelected = selectedCatIndex === idx;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCatIndex(idx)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "font-bold shadow-lg scale-105"
                    : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
                style={{
                  backgroundColor: isSelected ? "__PRIMARY__" : undefined,
                  color: isSelected ? "__TEXT_ON_PRIMARY__" : undefined,
                  borderColor: isSelected ? "__PRIMARY__" : undefined,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="type-display text-xl sm:text-2xl text-white group-hover:opacity-90 transition-opacity">
                      {item.name}
                    </h3>
                    <span
                      className="font-mono text-sm font-bold px-2.5 py-1 rounded-sm border whitespace-nowrap"
                      style={{
                        backgroundColor: "__PRIMARY__15",
                        color: "__PRIMARY__",
                        borderColor: "__PRIMARY__40",
                      }}
                    >
                      __CURRENCY__{item.price}
                    </span>
                  </div>

                  <p className="type-serif text-xs text-stone-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.isArray(item.tags) && item.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow"
                    style={{
                      backgroundColor: "__PRIMARY__",
                      color: "__TEXT_ON_PRIMARY__",
                    }}
                  >
                    Add +
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        currency="__CURRENCY__"
        primaryColor="__PRIMARY__"
        textOnPrimary="__TEXT_ON_PRIMARY__"
      />
    </section>
  );
}
"""

for slug, cfg in brand_configs.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. layout.tsx
    layout_c = layout_template.replace('__BRAND_NAME__', cfg['name']).replace('__BRAND_TAGLINE__', cfg['tagline']).replace('__BRAND_SUB__', cfg['sub']).replace('__BRAND_CITY__', cfg['city'])
    with open(os.path.join(p_path, 'app', 'layout.tsx'), 'w') as f:
        f.write(layout_c)

    # 2. page.tsx
    with open(os.path.join(p_path, 'app', 'page.tsx'), 'w') as f:
        f.write(page_template)

    # 3. Nav.tsx
    nav_c = nav_template.replace('__BRAND_NAME__', cfg['name']).replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary'])
    with open(os.path.join(p_path, 'components', 'marketing', 'Nav.tsx'), 'w') as f:
        f.write(nav_c)

    # 4. logo.svg
    os.makedirs(os.path.join(p_path, 'public'), exist_ok=True)
    logo_c = logo_svg_template.replace('__PRIMARY__', cfg['primary']).replace('__SHORT_NAME__', cfg['short_name']).replace('__TAGLINE__', cfg['tagline'])
    with open(os.path.join(p_path, 'public', 'logo.svg'), 'w') as f:
        f.write(logo_c)

    # 5. Preloader.tsx
    pre_c = preloader_template.replace('__PRIMARY__', cfg['primary']).replace('__SHORT_NAME__', cfg['short_name']).replace('__SUB__', cfg['sub']).replace('__TAGLINE__', cfg['tagline'])
    with open(os.path.join(p_path, 'components', 'marketing', 'Preloader.tsx'), 'w') as f:
        f.write(pre_c)

    # 6. InteractiveBackground.tsx
    os.makedirs(os.path.join(p_path, 'components', 'ui'), exist_ok=True)
    bg_c = interactive_bg_template.replace('__PRIMARY__', cfg['primary']).replace('__PARTICLES__', 'true' if cfg['particles'] else 'false').replace('__DOT_OPACITY__', str(cfg['dot_opacity']))
    with open(os.path.join(p_path, 'components', 'ui', 'InteractiveBackground.tsx'), 'w') as f:
        f.write(bg_c)

    # 7. SignatureMenu.tsx
    menu_c = signature_menu_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__CURRENCY__', cfg['currency'])
    with open(os.path.join(p_path, 'components', 'marketing', 'SignatureMenu.tsx'), 'w') as f:
        f.write(menu_c)

    print(f"✓ Master audit & clean implementation applied to {slug}")

print("\n🎉 Master audit & clean implementation completed across all 24 projects!")
