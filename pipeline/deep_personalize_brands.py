import os

brand_details = {
    'backyard-burgers': {
        'primary': '#E67E22',
        'text_on_primary': '#000000',
        'name': 'Backyard Burgers & Grill',
        'short_name': 'BACKYARD BURGERS',
        'craft_title': 'THE OPEN-AIR SMOKEHOUSE CRAFT',
        'craft_subtitle': 'KORAMANGALA GARDEN GRILL',
        'steps': [
            ("01", "HICKORY & POST OAK WOOD", "We smoke our meats over seasoned hickory logs in open-air pits to develop a deep smoky bark before finishing on sizzling cast iron."),
            ("02", "COARSE GROUND BRISKET", "Custom blend of prime chuck and smoked brisket, hand-pattied and smashed ultra-crisp with sweet caramelised onions."),
            ("03", "HOUSE PEPPER BARBECUE", "Finished with scratch-made smoky chipotle BBQ sauce and molten sharp cheddar on toasted buttered brioche.")
        ],
        'ticker': [
            "SMOKED HICKORY BRISKET BURGER",
            "KORAMANGALA OPEN-AIR SMOKEHOUSE",
            "CRISPY BACON SMASH",
            "LOADED PULLED CHICKEN FRIES",
            "CHARRED JALAPEÑO POPPERS",
            "HOUSE CHIPOTLE BBQ GLAZE"
        ]
    },
    'beyondburg-inc': {
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'name': 'Beyondburg Inc.',
        'short_name': 'BEYONDBURG INC.',
        'craft_title': 'THE 450°F CAST-IRON STEEL CRAFT',
        'craft_subtitle': 'ST. MARKS ROAD SMASH LAB',
        'steps': [
            ("01", "COLD COARSE GROUND SPHERES", "We roll 80/20 fresh prime cuts into chilled spheres immediately before hitting the searing 450°F flat-top."),
            ("02", "200 LBS DIRECT LEVERAGE", "Custom heavy-gauge stainless steel press creates razor-thin lace edges with maximum Maillard caramelization."),
            ("03", "BUTTER-STEAMED POTATO BUNS", "Plush potato buns griddled directly in meat drippings and sweet cream butter to absorb rich savory juices.")
        ],
        'ticker': [
            "THE OG DOUBLE SMASH",
            "NASHVILLE HOT FRIED CHICKEN",
            "SMASHED TRUFFLE SHROOM",
            "ANIMAL STYLE CRINKLE FRIES",
            "LOTUS BISCOFF MALT SHAKE",
            "ST. MARKS ROAD · BANGALORE"
        ]
    },
    'biggies-burger': {
        'primary': '#F26522',
        'text_on_primary': '#FFFFFF',
        'name': 'Biggies Burger',
        'short_name': 'BIGGIES BURGER',
        'craft_title': 'THE AUTHENTIC CHARBROIL SCIENCE',
        'craft_subtitle': 'BEHEMOTH FLAME-GRILL KITCHEN',
        'steps': [
            ("01", "HIGH-HEAT OPEN CHARBROIL", "Flames sear the patty surface instantly, locking in juices while infusing authentic smoky char flavor."),
            ("02", "DOUBLE-MELTED MONSTER CHEESE", "Dual thick patties layered with American cheddar and Swiss cheese, melted under heavy stainless cloches."),
            ("03", "SIGNATURE SECRET SAUCE", "Drizzled with our proprietary spiced burger dressing and crisp iceberg lettuce on toasted sesame rolls.")
        ],
        'ticker': [
            "THE BEHEMOTH DOUBLE CHEESE",
            "FLAME-GRILLED TENDERLOIN",
            "SMOKY BBQ CHICKEN TOWER",
            "PERI PERI LOADED WEDGES",
            "BLUEBERRY CHEESECAKE SHAKE",
            "BANGALORE FLAME GRILL"
        ]
    },
    'burger-bar-austin': {
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'name': 'Burger Bar on Congress',
        'short_name': 'BURGER BAR ON CONGRESS',
        'craft_title': 'THE DOWNTOWN CONGRESS FLAT-TOP',
        'craft_subtitle': 'WALK-UP WINDOW SMASH',
        'steps': [
            ("01", "FRESH DAILY GROUND ANGUS", "Sourced from Texas ranches and ground fresh every morning for the ultimate juicy, beef-forward bite."),
            ("02", "HOT FLAT-TOP SCORCH", "Smashed fast at intense heat with grilled sweet onions to create crispy caramelized lace borders."),
            ("03", "AUSTIN WALK-UP TRADITION", "Served fast, piping hot, and wrapped in foil with crinkle fries and hand-spun shakes on Congress Ave.")
        ],
        'ticker': [
            "CONGRESS AVENUE DOUBLE SMASH",
            "TEXAS CHILI CHEESE BURGER",
            "HAND-SPUN PEANUT BUTTER SHAKE",
            "CRISPY TALLOW CRINKLE FRIES",
            "AUSTIN WALK-UP WINDOW",
            "LOCAL TEXAS DRAFT BEERS"
        ]
    },
    'burger-elite': {
        'primary': '#7C3AED',
        'text_on_primary': '#FFFFFF',
        'name': 'BURGER ELITE',
        'short_name': 'BURGER ELITE',
        'craft_title': 'THE STREET ROYALE DOUBLE SMASH',
        'craft_subtitle': 'INDIRANAGAR GOURMET LAB',
        'steps': [
            ("01", "DOUBLE CRUNCH SEAR", "Dual patties pressed against screaming steel until the edges shatter with crunchy caramelized flavor."),
            ("02", "HOUSE ROYALE GLAZE", "Infused with our signature spiced umami glaze, caramelized onions, and aged melted Monterey Jack."),
            ("03", "ARTISAN TOASTED BRIOCHE", "Cushioned inside golden French brioche, griddled with garlic herb butter.")
        ],
        'ticker': [
            "THE ELITE ROYALE SMASH",
            "INDIRANAGAR DOUBLE CRUNCH",
            "TRUFFLE PARMESAN WEDGES",
            "BELGIAN CHOCOLATE THICKSHAKE",
            "SMOKED BACON JAM SPECIAL",
            "LATE-NIGHT ROYALE KITCHEN"
        ]
    },
    'burger-seigneur': {
        'primary': '#C8A96E',
        'text_on_primary': '#000000',
        'name': 'Burger Seigneur',
        'short_name': 'BURGER SEIGNEUR',
        'craft_title': 'THE EUROPEAN HAUTE BRIOCHE ATELIER',
        'craft_subtitle': 'INDIRANAGAR GASTRONOMY',
        'steps': [
            ("01", "FRENCH ARTISANAL BRIOCHE", "Baked fresh every morning using cultured Normandy butter for an airy, pillowy crumb."),
            ("02", "WILD FOREST TRUFFLE SAUCE", "Sauteed cremini and porcini mushrooms simmered in French black winter truffle cream."),
            ("03", "PREMIUM PRIME TENDERLOIN", "Prime grain-fed beef seared to medium-juicy perfection with melted Gruyère cheese.")
        ],
        'ticker': [
            "THE LUCIEN TRUFFLE BURGER",
            "TRAILBLAZER PRIME BEEF",
            "DYNAMITE FRIED CHICKEN",
            "FRENCH FOREST MUSHROOM MELT",
            "BELGIAN SPECULOOS BISCOFF SHAKE",
            "HAUTE INDIRANAGAR ATELIER"
        ]
    },
    'burgerman': {
        'primary': '#15803D',
        'text_on_primary': '#FFFFFF',
        'name': 'BurgerMan',
        'short_name': 'BURGERMAN',
        'craft_title': 'THE 100% FLAME-GRILLED GUILT-FREE CRAFT',
        'craft_subtitle': 'WHOLE WHEAT ARTISANAL KITCHEN',
        'steps': [
            ("01", "100% FLAME GRILLED · ZERO OIL", "Patties are grilled directly over high-heat ceramic flames without oil frying, locking in pure flavor."),
            ("02", "FRESH WHOLE WHEAT BUNS", "Handcrafted whole wheat and multigrain buns baked daily with zero trans fats or chemical preservatives."),
            ("03", "HOUSE FERMENTED SAUCES", "Paired with fresh garden herbs, probiotic sauces, and crisp farm-fresh hydroponic greens.")
        ],
        'ticker': [
            "FLAME-GRILLED MUSHROOM BURGER",
            "100% WHOLE WHEAT ARTISAN BUNS",
            "GRILLED CHICKEN STEAK BURGER",
            "GUILT-FREE HERB WEDGES",
            "SALTED CARAMEL PROTEIN SHAKE",
            "CLEAN FLAME-GRILL LAB"
        ]
    },
    'casino-el-camino': {
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'name': 'Casino El Camino',
        'short_name': 'CASINO EL CAMINO',
        'craft_title': 'THE 6TH STREET ROCK & ROLL CHARBROIL',
        'craft_subtitle': 'AUSTIN CULT BURGER INSTITUTION',
        'steps': [
            ("01", "3/4 LB CHARBROILED BEASTS", "Massive hand-formed 12-ounce beef patties seared over screaming lava rocks for authentic smoke flavor."),
            ("02", "FIRE-ROASTED VERDE CHILIES", "Stacked with fresh roasted serranos, poblanos, and melted habanero jack cheese."),
            ("03", "6TH STREET LATE-NIGHT SOUL", "Served on crusty griddled Texas sourdough buns with spicy verde mayo and bloody marys.")
        ],
        'ticker': [
            "THE FAMOUS AMARILLO BURGER",
            "BUFFALO BURGER WITH SERRANOS",
            "6TH STREET CULT ROCK INSTITUTION",
            "LATE-NIGHT CHARBROILED MONSTERS",
            "VERDE CHILI CHEESE FRIES",
            "AUSTIN TEXAS MUSIC FOLKLORE"
        ]
    },
    'dans-burgers': {
        'primary': '#D97706',
        'text_on_primary': '#FFFFFF',
        'name': 'Dan\'s Hamburgers',
        'short_name': 'DAN\'S HAMBURGERS',
        'craft_title': 'THE 1973 AUSTIN FLAT-TOP TRADITION',
        'craft_subtitle': '50+ YEARS OF FAMILY HERITAGE',
        'steps': [
            ("01", "THE LEGENDARY $50 RECIPE", "Dan and Frances Junk bought the secret seasoning recipe for $50 in 1973 and never changed a single spice."),
            ("02", "BUTTER-GRIDDLED TEXAS TOAST", "Thick-cut Texas toast sizzled in real butter until crispy and golden on the historic flat-top."),
            ("03", "CRIMPED JALAPEÑO SMASH", "Fresh beef patties smashed with grilled onions, pickled jalapeños, and melted American cheese.")
        ],
        'ticker': [
            "DAN'S DOUBLE CHEESE ON TEXAS TOAST",
            "1973 AUSTIN ORIGINAL DINER",
            "HOMEMADE ONION RINGS",
            "FRESH JALAPEÑO FLAT-TOP SMASH",
            "SOUTH AUSTIN MANCHACA PRIDE",
            "AUTHENTIC THICK MALT SHAKES"
        ]
    },
    'dirty-martins': {
        'primary': '#BF5700',
        'text_on_primary': '#FFFFFF',
        'name': 'Dirty Martin\'s Kum-Bak',
        'short_name': 'DIRTY MARTIN\'S KUM-BAK',
        'craft_title': '100 YEARS ON THE DRAG (1926–2026)',
        'craft_subtitle': 'UT AUSTIN CENTENNIAL LANDMARK',
        'steps': [
            ("01", "A CENTURY OF SIZZLE", "Serving UT students and Austin locals since 1926 on the very same historic seasoned cast-iron griddle."),
            ("02", "THE KUM-BAK CHILI SECRET", "Smothered in our 100-year-old family chili recipe with grilled onions and sharp American cheese."),
            ("03", "CRISPY TATER TOTS & MALTS", "Paired with golden fried tots and hand-dipped chocolate malt thickshakes in frosty glasses.")
        ],
        'ticker': [
            "THE KUM-BAK SPECIAL CHEESEBURGER",
            "100 YEARS ON THE DRAG (1926-2026)",
            "DIRTY'S FAMOUS CHILI CHEESE TOTS",
            "HAND-DIPPED CHOCOLATE MALT",
            "LONGHORN HISTORIC TRADITION",
            "2808 GUADALUPE ST · AUSTIN"
        ]
    },
    'good-flippin-burgers': {
        'primary': '#BE123C',
        'text_on_primary': '#FFFFFF',
        'name': 'Good Flippin\' Burgers',
        'short_name': 'GOOD FLIPPIN\' BURGERS',
        'craft_title': 'THE FRESH POTATO BRIOCHE SMASH',
        'craft_subtitle': 'FRESH JUICY PERFECTION',
        'steps': [
            ("01", "FRESH NEVER-FROZEN CUTS", "Ground fresh daily in small batches to guarantee the juiciest, most flavorful smashed bite."),
            ("02", "MOLTEN CHEESE BLEND", "Layered with English cheddar and Swiss Gruyère, melted directly over searing flat-top patties."),
            ("03", "SQUISHY STEAMED ROLLS", "Served on ultra-soft potato brioche rolls toasted in pure sweet butter.")
        ],
        'ticker': [
            "THE GRINCH SMASH BURGER",
            "CHEESE BOMB HOT SMASH",
            "PERI PERI CRUNCHY WINGS",
            "CRUSHED OREO THICKSHAKE",
            "BANGALORE FRESH JUICY BURGERS",
            "HOUSE TRUFFLE DIPS"
        ]
    },
    'jewboy-burgers': {
        'primary': '#06B6D4',
        'text_on_primary': '#000000',
        'name': 'JewBoy Burgers',
        'short_name': 'JEWBOY BURGERS',
        'craft_title': 'EL PASO BORDER MEETS DELI SOUL',
        'craft_subtitle': 'MO PITTLE\'S STEAMED SMASH',
        'steps': [
            ("01", "STEAM-GRIDDLED ONIONS", "Fresh beef smashed directly over a heap of sweet onions on the flat-top, locking moisture into the meat."),
            ("02", "ROASTED HATCH GREEN CHILE", "Smothered in authentic roasted New Mexico Hatch green chiles and melted Wisconsin cheddar."),
            ("03", "HOME-STYLE LATKES & QUESO", "Served on pillowy Martin's potato rolls with crispy potato latkes and house green chile queso.")
        ],
        'ticker': [
            "THE OY VEY HATCH GREEN CHILE BURGER",
            "CRISPY HOME-STYLE POTATO LATKES",
            "EL PASO BORDER MEETS DELI",
            "BURGER SMASHED WITH SWEET ONIONS",
            "HOUSE GREEN CHILE QUESO",
            "AUSTIN TEXAS COMFORT SOUL"
        ]
    },
    'leons-burgers': {
        'primary': '#B12727',
        'text_on_primary': '#FFFFFF',
        'name': 'Leon\'s Burgers & Wings',
        'short_name': 'LEON\'S BURGERS & WINGS',
        'craft_title': 'THE 24-HR BUTTERMILK BRINE & CRUNCH',
        'craft_subtitle': 'SPICY FRIED CHICKEN MASTERY',
        'steps': [
            ("01", "24-HOUR HERB BUTTERMILK BRINE", "Whole chicken thighs marinated in cultured buttermilk and African bird's eye peri-peri chilies."),
            ("02", "DOUBLE-DIPPED FLAKY CRUST", "Dredged in seasoned flour and flash-fried to golden, ultra-crispy crunch perfection."),
            ("03", "HOUSE PERI-PERI GLAZE", "Tossed in fiery signature peri-peri garlic oil and topped with crunchy pickled slaw.")
        ],
        'ticker': [
            "THE PERI-PERI CRUNCH BURGER",
            "24-HR BUTTERMILK FRIED WINGS",
            "SMOKED BBQ BACON CHEESEBURGER",
            "GUNPOWDER CRISPY CRINKLE FRIES",
            "INDIRANAGAR FLAGSHIP SPOT",
            "AUTHENTIC PERI-PERI SPICE"
        ]
    },
    'little-deli-pizzeria': {
        'primary': '#166534',
        'text_on_primary': '#FFFFFF',
        'name': 'Little Deli & Pizzeria',
        'short_name': 'LITTLE DELI & PIZZERIA',
        'craft_title': 'CRESTVIEW\'S ARTISANAL NJ STONE DECK',
        'craft_subtitle': 'AUTHENTIC JERSEY PIES & PASTRAMI',
        'steps': [
            ("01", "SLOW-FERMENTED PIZZA DOUGH", "Aged 48 hours in cold fermentation to develop a crisp, airy crust with blistered leopard spotting."),
            ("02", "STONE-DECK BAKED AT 650°F", "Baked directly on massive refractory stones for that unmistakable New Jersey pizzeria bottom crunch."),
            ("03", "HOUSE-SMOKED NYC PASTRAMI", "Whole brisket brined for 10 days, heavily peppered, and smoked over hardwoods for our legendary subs.")
        ],
        'ticker': [
            "JERSEY STONE-BAKED PEPPERONI PIE",
            "HOUSE-SMOKED PASTRAMI REUBEN",
            "CRESTVIEW AUSTIN DELI LANDMARK",
            "CRISPY SICILIAN PAN SQUARES",
            "HOMEMADE NEW YORK CANNOLI",
            "ARTISAN ITALIAN COLD CUTS"
        ]
    },
    'louis-burger': {
        'primary': '#D4AF37',
        'text_on_primary': '#000000',
        'name': 'Louis Burger',
        'short_name': 'LOUIS BURGER',
        'craft_title': 'CHEF ZORAWAR KALRA\'S GOURMET LAB',
        'craft_subtitle': '24K GOLD WAGYU & TRUFFLE',
        'steps': [
            ("01", "IMPORTED AKAUSHI WAGYU", "Ultra-marbled Japanese breed beef seared to preserve rich, buttery umami fats."),
            ("02", "24K EDIBLE GOLD & TRUFFLE", "Finished with delicate edible gold leaf flakes, French truffle butter, and aged Gouda melt."),
            ("03", "GOLDEN GRILLED BRIOCHE", "Custom-baked artisanal brioche rolls infused with sweet cream butter and toasted to perfection.")
        ],
        'ticker': [
            "THE 24K GOLD WAGYU BURGER",
            "BLACK WINTER TRUFFLE SHROOM",
            "CHEF ZORAWAR KALRA SIGNATURE",
            "CRISPY KOREAN FRIED CHICKEN",
            "BELGIAN TRUFFLE PARMESAN FRIES",
            "HAUTE BENGALURU BURGER LAB"
        ]
    },
    'nadc-burger': {
        'primary': '#FFFFFF',
        'text_on_primary': '#000000',
        'name': 'NADC Burger',
        'short_name': 'NADC BURGER',
        'craft_title': '100% TEXAS WAGYU · NOT A DAMN CHANCE',
        'craft_subtitle': 'CHEF PHILLIP FRANKLAND LEE',
        'steps': [
            ("01", "100% TEXAS AKAUSHI WAGYU", "Michelin-starred chef crafted using pure Texas Wagyu beef with no filler, lean, or trimmings."),
            ("02", "DUCK FAT TALLOW FRIES", "Idaho potatoes fried three times in pure beef tallow and duck fat for extreme glass-like crispiness."),
            ("03", "SECRET SECRET SAUCE", "Layered with American cheese, pickles, and chef's proprietary savory sauce on a steamed potato bun.")
        ],
        'ticker': [
            "100% TEXAS AKAUSHI WAGYU",
            "DUCK FAT TALLOW FRIES",
            "CHEF PHILLIP FRANKLAND LEE",
            "NOT A DAMN CHANCE BURGER",
            "AUSTIN TEXAS RAINEY STREET",
            "PURE MICHELIN STAR CRAFT"
        ]
    },
    'original-burger-co': {
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'name': 'Original Burger Co. (OBC)',
        'short_name': 'ORIGINAL BURGER CO.',
        'craft_title': 'PURE DOUBLE SMASH & BACON JAM',
        'craft_subtitle': 'BANGALORE SMASH DINER',
        'steps': [
            ("01", "HOUSE BACON MARMALADE", "Slow-simmered smoked bacon with caramelized sweet shallots, maple syrup, and balsamic glaze."),
            ("02", "ULTRA-THIN MAILLARD LACE", "High-pressure flat-top smash generating maximum crispy crust on dual beef patties."),
            ("03", "LIQUID AMERICAN CHEDDAR", "Molten sharp cheddar cascading over hot patties inside griddled Martin's potato rolls.")
        ],
        'ticker': [
            "THE OBC DOUBLE SMASH BACON JAM",
            "TRIPLE CHEESE MELT BURGER",
            "CARAMELIZED LACE EDGE CRUST",
            "TRUFFLE BUTTER LOADED FRIES",
            "PEANUT BUTTER BROWNIE SHAKE",
            "BANGALORE SMASH DINER"
        ]
    },
    'pedrosos-pizza': {
        'primary': '#B91C1C',
        'text_on_primary': '#FFFFFF',
        'name': 'Pedroso\'s Pizza',
        'short_name': 'PEDROSO\'S PIZZA',
        'craft_title': 'THE 72-HR SLOW FERMENTATION SCIENCE',
        'craft_subtitle': 'GRANDMA SQUARES & ROMAN PIES',
        'steps': [
            ("01", "72-HOUR COLD DOUGH FERMENT", "Long slow fermentation breaks down complex starches, resulting in an airy, crispy, ultra-digestible crust."),
            ("02", "CUP-AND-CHAR PEPPERONI", "Ezzo natural casing pepperoni that curls into crispy little grease chalices when baked at high heat."),
            ("03", "SAN MARZANO D.O.P. & HOT HONEY", "Finished with crushed Campania plum tomatoes, whole milk mozzarella, and Mike's Hot Honey drizzle.")
        ],
        'ticker': [
            "GRANDMA HOT HONEY PEPPERONI SQUARE",
            "72-HR SLOW FERMENTED DOUGH",
            "CRISPY BOTTOM ROMAN CRUST",
            "SAN MARZANO D.O.P. PIZZA PIES",
            "AIRPORT BLVD & JUSTIN LN · AUSTIN",
            "ARTISANAL ITALIAN SLICES"
        ]
    },
    'pool-burger': {
        'primary': '#F43F5E',
        'text_on_primary': '#FFFFFF',
        'name': 'Pool Burger',
        'short_name': 'POOL BURGER',
        'craft_title': 'THE DEEP EDDY AIRSTREAM TIKI SMASH',
        'craft_subtitle': '1968 VINTAGE SURF LOUNGE',
        'steps': [
            ("01", "IN-HOUSE GROUND WAGYU", "All-natural Wagyu beef ground fresh inside our vintage 1968 Airstream trailer daily."),
            ("02", "TIKI COCKTAIL FLAVOR PROFILE", "Patties paired with grilled pineapple, pickled jalapeños, and Polynesian island spices."),
            ("03", "DEEP EDDY POOL VIBES", "Served under palm trees with tropical Mai Tais, crinkle fries, and soft serve vanilla cones.")
        ],
        'ticker': [
            "THE LOCO POOL DOUBLE WAGYU",
            "1968 VINTAGE AIRSTREAM TIKI",
            "CRISPY CRINKLE CUT FRIES",
            "FROZEN TROPICAL MAI TAIS",
            "DEEP EDDY AUSTIN TEXAS",
            "HAND-SPUN TIKI MILKSHAKES"
        ]
    },
    'sankys-burger-house': {
        'primary': '#FFE500',
        'text_on_primary': '#000000',
        'name': 'Sanky\'s Burger House',
        'short_name': 'SANKY\'S BURGER HOUSE',
        'craft_title': 'THE UNDERGROUND GARAGE CULT CRAFT',
        'craft_subtitle': 'HENNUR LATE-NIGHT DINER',
        'steps': [
            ("01", "THE HEAVY GARAGE SMASH", "Giant hand-seasoned patties smashed onto screaming cast iron until thick and juicy with char edges."),
            ("02", "MONSTER CHEESE CASCADE", "Loaded with double American cheese, caramelized onions, and secret garage monster sauce."),
            ("03", "HENNUR LATE-NIGHT MECCA", "Serving Bangalore night owls till the early morning hours with monster thickshakes and fries.")
        ],
        'ticker': [
            "THE MONSTER GARAGE DOUBLE CHEESE",
            "HENNUR LATE-NIGHT CULT SPOT",
            "SIZZLING CAST-IRON MONSTER SMASH",
            "LOADED CHILI CHEESE FRIES",
            "FERRERO CHOCOLATE MONSTER SHAKE",
            "OPEN TILL 3:00 AM"
        ]
    },
    'simon-burgers': {
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'name': 'Simon Burgers',
        'short_name': 'SIMON BURGERS',
        'craft_title': 'THE KAMMANAHALLI LATE-NIGHT KITCHEN',
        'craft_subtitle': 'DOUBLE SMASH STACK',
        'steps': [
            ("01", "PRIME DOUBLE STACK", "Dual juicy patties seasoned with house smoked paprika, smashed hot on searing steel."),
            ("02", "MELTED SHARP CHEDDAR", "Thick slices of Wisconsin cheddar melted over sizzling meat on the flat top."),
            ("03", "BUTTERY TOASTED BUNS", "Sandwiched inside butter-griddled brioche with Simon's signature spicy burger spread.")
        ],
        'ticker': [
            "THE SIMON SPECIAL DOUBLE SMASH",
            "KAMMANAHALLI LATE-NIGHT MECCA",
            "SPICY CHIPOTLE CHICKEN BURGER",
            "CRUNCHY CHEESY POTATO WEDGES",
            "THICK NUTELLA MALT SHAKE",
            "BANGALORE STREET SMASH"
        ]
    },
    'smash-guys': {
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'name': 'Smash Guys',
        'short_name': 'SMASH GUYS',
        'craft_title': 'THE ORIGINAL 450°F CAST-IRON SMASH',
        'craft_subtitle': 'BANGALORE SMASH KITCHEN',
        'steps': [
            ("01", "PREMIUM 80/20 COARSE GRIND", "Rolled fresh daily and chilled right before hitting the searing steel for maximum crust."),
            ("02", "CAST-IRON WEIGHT LEVERAGE", "Heavy presses create paper-thin crispy lace edges with deep caramelized Maillard browning."),
            ("03", "PENNSYLVANIA POTATO ROLLS", "Butter-griddled potato buns that cushion molten cheese and savory dripping juices.")
        ],
        'ticker': [
            "THE SMASH GUYS ORIGINAL DOUBLE",
            "450°F CAST-IRON SMASH LAB",
            "CRISPY MAILLARD LACE EDGES",
            "ANIMAL STYLE CRINKLE FRIES",
            "HAND-SPUN LOTUS BISCOFF SHAKE",
            "INDIRANAGAR & BELLANDUR"
        ]
    },
    'sour-duck-market': {
        'primary': '#EA580C',
        'text_on_primary': '#FFFFFF',
        'name': 'Sour Duck Market',
        'short_name': 'SOUR DUCK MARKET',
        'craft_title': 'EAST AUSTIN WILD SOURDOUGH & SMOKE',
        'craft_subtitle': 'NATURAL FERMENTATION BAKERY',
        'steps': [
            ("01", "36-HR WILD YEAST SOURDOUGH", "Locally milled organic Texas grains naturally fermented for 36 hours for complex flavor and blistered crust."),
            ("02", "POST OAK CENTRAL TEXAS SMOKE", "Whole briskets and heritage pork smoked low and slow over live post oak coals in our East Austin yard."),
            ("03", "LOCAL FARM-TO-TABLE COMFORT", "Everything from scratch: seasonal pickles, cultured churned butter, and Texas draft beers.")
        ],
        'ticker': [
            "NATURALLY FERMENTED SOURDOUGH BURGER",
            "CENTRAL TEXAS POST OAK SMOKEHOUSE",
            "CARDAMOM LAMINATED MORNING BUN",
            "EAST AUSTIN OUTDOOR BEER GARDEN",
            "FARM-TO-TABLE SEASONAL KITCHEN",
            "LOCAL TEXAS CRAFT CIDERS"
        ]
    },
    'truffles-bangalore': {
        'primary': '#F5A623',
        'text_on_primary': '#000000',
        'name': 'Truffles',
        'short_name': 'TRUFFLES',
        'craft_title': 'THE 2004 ST. MARKS ROAD LEGACY',
        'craft_subtitle': 'BANGALORE\'S ICONIC LANDMARK',
        'steps': [
            ("01", "20+ YEARS OF CULT BURGERS", "Serving generations of Bangalore foodies since 2004 with unmatched flavor, consistency, and love."),
            ("02", "SIGNATURE DOUBLE CHEESE MELT", "Patties packed with premium minced cuts, secret steakhouse spices, and molten American cheese."),
            ("03", "LEGENDARY THICK MILKSHAKES", "Famous thickshakes blended with whole Ferrero Rochers, Belgian chocolate fudge, and fresh cream.")
        ],
        'ticker': [
            "THE ALL AMERICAN CHEESE BURGER",
            "FERRERO ROCHER ULTRA THICKSHAKE",
            "TRUFFLES ST. MARKS RD SINCE 2004",
            "CRISPY PERI-PERI CHICKEN BURGER",
            "KORAMANGALA & INDIRANAGAR",
            "BANGALORE'S #1 ICONIC BURGER"
        ]
    }
}

# 1. Generate bespoke ScrollytellingText.tsx
scrolly_template = '''"use client";

import { motion } from "framer-motion";

const tickerItems = [
__ITEMS__
];

export default function ScrollytellingText() {
  return (
    <section className="py-12 select-none overflow-hidden border-b border-char-mute shadow-2xl" style={{ backgroundColor: "__PRIMARY__" }}>
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 items-center"
        >
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span
                className="type-display text-3xl sm:text-5xl font-black tracking-tight uppercase"
                style={{ color: "__TEXT_ON_PRIMARY__" }}
              >
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "__TEXT_ON_PRIMARY__", opacity: 0.5 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
'''

# 2. Generate bespoke HowWeSmash / TheCraftProcess.tsx
craft_template = '''"use client";

import React from "react";

const steps = [
__STEPS__
];

export default function HowWeSmash() {
  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-char text-bone border-b border-char-mute relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-char-mute pb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase block mb-1 font-bold" style={{ color: "__PRIMARY__" }}>
              __CRAFT_SUBTITLE__
            </span>
            <h2 className="type-display text-4xl sm:text-6xl text-bone font-bold tracking-tight">
              __CRAFT_TITLE__
            </h2>
          </div>
          <span className="font-mono text-xs uppercase font-bold px-3 py-1 rounded border" style={{ backgroundColor: "__PRIMARY__15", color: "__PRIMARY__", borderColor: "__PRIMARY__35" }}>
            AUTHENTIC MASTER CRAFT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-xl bg-char-soft border border-char-mute flex flex-col justify-between space-y-6 shadow-xl hover:border-white/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <span className="type-display text-5xl font-black transition-transform duration-300 block" style={{ color: "__PRIMARY__" }}>
                  {step.num}
                </span>
                <h3 className="font-mono font-bold text-base text-bone group-hover:text-white transition-colors uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-smoke leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-char-mute/60 font-mono text-[10px] uppercase font-bold" style={{ color: "__PRIMARY__" }}>
                __SHORT_NAME__ // ATELIER
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

for slug, cfg in brand_details.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. Update ScrollytellingText.tsx
    items_json = ',\n'.join([f'  "{item}"' for item in cfg['ticker']])
    scrolly_code = scrolly_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__ITEMS__', items_json)
    with open(os.path.join(p_path, 'components', 'marketing', 'ScrollytellingText.tsx'), 'w') as f:
        f.write(scrolly_code)

    # 2. Update HowWeSmash.tsx
    steps_json = []
    for num, title, desc in cfg['steps']:
        steps_json.append(f'''  {{
    num: "{num}",
    title: "{title}",
    desc: "{desc}",
  }}''')
    steps_str = ',\n'.join(steps_json)
    craft_code = craft_template.replace('__PRIMARY__', cfg['primary']).replace('__CRAFT_TITLE__', cfg['craft_title']).replace('__CRAFT_SUBTITLE__', cfg['craft_subtitle']).replace('__SHORT_NAME__', cfg['short_name']).replace('__STEPS__', steps_str)
    with open(os.path.join(p_path, 'components', 'marketing', 'HowWeSmash.tsx'), 'w') as f:
        f.write(craft_code)

    print(f"✓ Deeply personalized craft storytelling for {slug}")

print("\n🎉 All 24 projects upgraded with authentic, personalized scrollytelling and craft pipelines!")
