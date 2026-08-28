import os

projects_data = {
    'backyard-burgers': {
        'brand': 'Backyard Burgers & Grill',
        'short_brand': 'BACKYARD BURGERS',
        'tagline': "INDIRANAGAR'S OPEN-AIR AMERICAN GRILL",
        'highlight_tag': 'CHARBROILED BEEF & SMOKED BRISKET',
        'badge': 'SINCE 2018 · 100FT ROAD INDIRANAGAR',
        'hero_title_1': 'OPEN-AIR FLAME',
        'hero_title_2': 'SMOKED SMASHES',
        'hero_desc': 'Prime charbroiled beef, 12-hour smoked brisket, grilled jalapeños, and house bourbon barbecue glaze on Indiranagar 100 Feet Road.',
        'footer_quadrants': 'DEFENCE COLONY · 100FT ROAD · INDIRANAGAR',
        'desc': "Backyard Burgers And Grill — Charbroiled beef patties, slow-smoked Texas brisket melts, loaded grill fries, and craft milkshakes on 100 Feet Road Indiranagar.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "FRY.", "color": "text-yolk"}, {"text": "WE CHARBROIL.", "color": "text-bone"}],
        'tags': ["100 FEET RD INDIRANAGAR", "HARDWOOD CHARCOAL", "SMOKED BRISKET MELT", "CRAFT BBQ GLAZE", "ZERO SHORTCUTS"],
        'comic_words': ["GRILL!", "SMOKE!", "BRISKET!", "BBQ!", "CHARCOAL!", "BURGER!", "★"],
        'how_title': 'THE BACKYARD GRILL CODE',
        'how_caption': 'Hardwood Flame Artistry',
        'steps': [
            {'num': '01', 'title': 'THE HARDWOOD SEAR', 'subtitle': 'Lump Charcoal Heat', 'body': 'Natural hardwood embers at 260°C seal in juices while perfuming the beef with rich oak smoke.', 'stat': '260°C', 'statLabel': 'Charcoal Flame', 'detail': 'Intense flame creates signature diamond grill marks.'},
            {'num': '02', 'title': 'THE 12-HR SMOKE', 'subtitle': 'Low & Slow Brisket', 'body': 'Tender brisket rubbed with cracked black pepper and smoked low and slow before stacking.', 'stat': '12 Hours', 'statLabel': 'Oak Smoke', 'detail': 'Melt-in-your-mouth tenderness.'},
            {'num': '03', 'title': 'THE BRIOCHE GLAZE', 'subtitle': 'Bourbon BBQ Layer', 'body': 'Buttered brioche toasted on the grill grates, brushed with house bourbon barbecue reduction.', 'stat': 'Craft', 'statLabel': 'Glaze Recipe', 'detail': 'Perfect sweet and smoky balance.'}
        ],
        'locations': [
            {'id': 'indiranagar-100ft', 'name': 'Backyard Burgers Indiranagar 100ft', 'address': 'Ground Floor, No. 57, 100 Feet Rd, Defence Colony, Indiranagar, Bengaluru 560038', 'city': 'Bangalore', 'hours': '12:00 PM – 11:30 PM', 'phone': '088614 80534', 'image': '/hero-burger.png', 'featured': True}
        ],
        'loc_metrics': {'indiranagar-100ft': {'busy': 'High Demand', 'pct': 85, 'wait': '15 mins', 'quadrant': '100ft Rd High Street', 'cx': '65%', 'cy': '50%'}},
        'footer_locs': [{'name': 'Indiranagar 100ft Rd', 'address': 'No. 57, 100ft Rd, Defence Colony', 'hours': '12pm – 11:30pm', 'phone': '088614 80534'}],
        'footer_brand': 'BACKYARD BURGERS & GRILL',
        'footer_desc': 'Indiranagar 100 Feet Road open-air craft burger and smokehouse grill.',
        'footer_cta_title': 'HUNGRY FOR REAL SMOKE & CHAR?',
        'footer_cta_sub': 'Visit us on 100 Feet Road Indiranagar or order direct takeaway.',
        'copyright': 'Backyard Hospitality Pvt Ltd · Bangalore, India',
        'email': 'hello@backyardburgers.in',
        'menu_items': [
            {'id': 'backyard-smokehouse-stack', 'name': 'The Backyard Smokehouse Stack', 'description': 'Charbroiled prime beef patty, slow-smoked shredded brisket, melted sharp cheddar, crispy fried onion strings, and house bourbon BBQ sauce on grilled brioche', 'price': 395, 'category': 'burgers', 'tags': ['signature', 'smoked', 'bestseller'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'texas-jalapeno-char', 'name': 'Texas Charred Jalapeño Burger', 'description': 'Double grilled beef patties, roasted fresh jalapeños, smoked pepper jack cheese, chipotle mayo, and dill pickles', 'price': 365, 'category': 'burgers', 'tags': ['spicy', 'charbroiled'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'hickory-bacon-melt', 'name': 'Hickory Smoked Bacon Melt', 'description': 'Double smashed beef, thick-cut wood-smoked bacon, Monterey Jack cheese, caramelized onions, and garlic herb aioli', 'price': 385, 'category': 'burgers', 'tags': ['classic', 'bacon'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'loaded-backyard-fries', 'name': 'Loaded Backyard Pitmaster Fries', 'description': 'Skin-on hand-cut fries smothered in smoked brisket bits, molten cheddar cheese sauce, jalapeño slices, and ranch drizzle', 'price': 225, 'category': 'sides', 'tags': ['loaded', 'sides'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'smoked-vanilla-malt', 'name': 'Smoked Bourbon Vanilla Malt Shake', 'description': 'Handcrafted vanilla bean ice cream, smoked caramel swirl, malted milk, and toasted pecan crumble', 'price': 245, 'category': 'shakes', 'tags': ['thickshake', 'signature'], 'image': '/matcha-special.png', 'featured': True}
        ]
    },

    'burger-elite': {
        'brand': 'BURGER ELITE',
        'short_brand': 'BURGER ELITE',
        'tagline': "MAHALAKSHMI LAYOUT'S PREMIER STREET SMASH",
        'highlight_tag': 'DOUBLE SMASH & CHEESE WATERFALL',
        'badge': 'WEST OF CHORD RD · BANGALORE',
        'hero_title_1': 'ELITE STREET CRAFT',
        'hero_title_2': 'DOUBLE SMASH ROYALE',
        'hero_desc': 'Freshly griddled smash patties, signature loaded cheese waterfalls, and crispy sliders in Mahalakshmi Layout.',
        'footer_quadrants': 'MAHALAKSHMI LAYOUT · WEST OF CHORD RD · RAJAJINAGAR',
        'desc': "BURGER ELITE — Ultra-crispy double smash patties, molten cheese loaded sliders, peri-peri wedges, and signature thickshakes in Mahalakshmi Layout Bangalore.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "SETTLE.", "color": "text-yolk"}, {"text": "WE SMASH ELITE.", "color": "text-bone"}],
        'tags': ["MAHALAKSHMI LAYOUT", "DOUBLE SMASH", "CHEESE WATERFALL", "PERI-PERI LOADED", "FRESH EVERY ORDER"],
        'comic_words': ["ELITE!", "SMASH!", "CRISP!", "CHEESE!", "BURGER!", "ROYALE!", "★"],
        'how_title': 'THE ELITE BURGER STANDARD',
        'how_caption': 'Precision Street Craft',
        'steps': [
            {'num': '01', 'title': 'THE 15-SECOND SMASH', 'subtitle': 'Maximum Contact', 'body': 'Chilled beef smashed firmly onto 240°C polished griddle to initiate immediate Maillard reaction.', 'stat': '240°C', 'statLabel': 'Griddle Heat', 'detail': 'Locks in natural juices.'},
            {'num': '02', 'title': 'THE CHEESE MELT', 'subtitle': 'Red Leicester & Cheddar', 'body': 'Double cheese slices melted directly on the hot patty under a steam dome for velvet texture.', 'stat': '100%', 'statLabel': 'Real Cheese', 'detail': 'Zero processed cheese oils.'},
            {'num': '03', 'title': 'THE ELITE DRIZZLE', 'subtitle': 'Secret Burger Sauce', 'body': 'House-made tangy relish and smoked paprika elite sauce spooned generously over toasted buns.', 'stat': 'Secret', 'statLabel': 'Sauce Formula', 'detail': 'Signature flavor profile.'}
        ],
        'locations': [
            {'id': 'mahalakshmi-layout', 'name': 'BURGER ELITE Mahalakshmi Layout', 'address': '34, 9th B Cross Rd, West of Chord Road 2nd Stage, Mahalakshmi Layout, Bengaluru 560086', 'city': 'Bangalore', 'hours': '12:00 PM – 11:00 PM', 'phone': '099454 83345', 'image': '/hero-burger.png', 'featured': True}
        ],
        'loc_metrics': {'mahalakshmi-layout': {'busy': 'Active Neighborhood Hub', 'pct': 75, 'wait': '10 mins', 'quadrant': 'West Bangalore / Chord Rd', 'cx': '35%', 'cy': '35%'}},
        'footer_locs': [{'name': 'Mahalakshmi Layout', 'address': '34, 9th B Cross Rd, West of Chord Rd 2nd Stage', 'hours': '12pm – 11pm', 'phone': '099454 83345'}],
        'footer_brand': 'BURGER ELITE',
        'footer_desc': 'Mahalakshmi Layout premier street smash burgers and loaded fries.',
        'footer_cta_title': 'READY FOR THE ELITE SMASH?',
        'footer_cta_sub': 'Order direct via click-to-WhatsApp or visit our kitchen in Mahalakshmi Layout.',
        'copyright': 'Burger Elite Hospitality · Bangalore, India',
        'email': 'orders@burgerelite.in',
        'menu_items': [
            {'id': 'elite-double-smash', 'name': 'The Elite Double Smash Royale', 'description': 'Two 90g fresh smashed patties, double melted cheddar, grilled diced onions, house elite burger sauce on toasted brioche', 'price': 310, 'category': 'burgers', 'tags': ['signature', 'bestseller'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'crispy-elite-chicken', 'name': 'Crispy Elite Zinger Burger', 'description': 'Crunchy double-dredged chicken fillet, spicy peri-peri dust, garlic mayo, and crunchy iceberg lettuce', 'price': 270, 'category': 'burgers', 'tags': ['crispy', 'spicy'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'peri-peri-cheese-wedges', 'name': 'Peri-Peri Loaded Cheese Wedges', 'description': 'Crispy potato wedges tossed with fiery peri-peri spices, topped with molten cheese and spring onions', 'price': 160, 'category': 'sides', 'tags': ['sides', 'vegetarian'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'belgian-chocolate-thickshake', 'name': 'Belgian Dark Chocolate Thickshake', 'description': 'Rich blended dark chocolate ice cream, chocolate fudge swirl, cocoa wafer crunch', 'price': 195, 'category': 'shakes', 'tags': ['shakes'], 'image': '/matcha-special.png', 'featured': True}
        ]
    },

    'burgerman': {
        'brand': 'BurgerMan',
        'short_brand': 'BURGERMAN',
        'tagline': "INDIA'S GUILT-FREE FLAME-GRILLED BISTRO",
        'highlight_tag': '100% FLAME GRILLED · WHOLE WHEAT BUNS',
        'badge': 'SINCE 2006 · 12TH MAIN INDIRANAGAR',
        'hero_title_1': 'GUILT-FREE FLAME',
        'hero_title_2': 'GRILLED BURGER BISTRO',
        'hero_desc': 'Grilled not fried. Whole wheat buns, fresh garden ingredients, and homemade zero-preservative sauces crafted since 2006 on 12th Main Indiranagar.',
        'footer_quadrants': '12TH MAIN · HAL 2ND STAGE · INDIRANAGAR',
        'desc': "BurgerMan — 100% flame-grilled burgers, whole-wheat high-fiber toasted buns, zero-preservative sauces, and artisanal iced teas in Indiranagar Bangalore.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "DEEP FRY.", "color": "text-yolk"}, {"text": "WE FLAME GRILL.", "color": "text-bone"}],
        'tags': ["SINCE 2006", "100% FLAME GRILLED", "WHOLE WHEAT BUNS", "INDIRANAGAR 12TH MAIN", "ZERO OIL FRYING"],
        'comic_words': ["GRILL!", "FRESH!", "HEALTHY!", "SMOKY!", "BURGERMAN!", "GUILT-FREE!", "★"],
        'how_title': 'THE BURGERMAN HEALTH CODE',
        'how_caption': 'Guilt-Free Culinary Science',
        'steps': [
            {'num': '01', 'title': 'THE OPEN FLAME SEAR', 'subtitle': 'Zero Oil Cooking', 'body': 'Patties hit open radiant grills, developing intense char lines without immersing in deep-fryer grease.', 'stat': '0% Oil', 'statLabel': 'Deep Frying', 'detail': 'Pure radiant grill heat.'},
            {'num': '02', 'title': 'WHOLE-WHEAT BRIOCHE', 'subtitle': 'High Fiber Buns', 'body': 'Baked fresh daily using 100% stoneground whole wheat with natural flax seeds for digestive wellness.', 'stat': '100%', 'statLabel': 'Whole Wheat', 'detail': 'Zero refined white flour.'},
            {'num': '03', 'title': 'THE HERB INFUSION', 'subtitle': 'Zero Preservatives', 'body': 'Sauces crafted from scratch with fresh basil, greek yogurt, garlic, and sun-ripened tomatoes.', 'stat': 'Clean', 'statLabel': 'Sauce Recipe', 'detail': 'No MSG or artificial colors.'}
        ],
        'locations': [
            {'id': 'indiranagar-12th-main', 'name': 'BurgerMan Indiranagar Bistro', 'address': 'No 3282, 1, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008', 'city': 'Bangalore', 'hours': '11:00 AM – 11:30 PM', 'phone': '081971 46681', 'image': '/hero-burger.png', 'featured': True}
        ],
        'loc_metrics': {'indiranagar-12th-main': {'busy': 'Healthy Lunch Rush', 'pct': 70, 'wait': '10 mins', 'quadrant': 'Indiranagar 12th Main', 'cx': '65%', 'cy': '45%'}},
        'footer_locs': [{'name': 'Indiranagar 12th Main', 'address': 'No 3282, 1, 12th Main Rd, HAL 2nd Stage', 'hours': '11am – 11:30pm', 'phone': '081971 46681'}],
        'footer_brand': 'BURGERMAN',
        'footer_desc': 'India premier guilt-free flame-grilled burger bistro since 2006.',
        'footer_cta_title': 'CRAVING A HEALTHY GRILLED BURGER?',
        'footer_cta_sub': 'Visit our 12th Main Indiranagar bistro or order direct delivery.',
        'copyright': 'BurgerMan Hospitality Pvt Ltd · Bangalore, India',
        'email': 'hello@burgerman.in',
        'menu_items': [
            {'id': 'teriyaki-grilled-chicken', 'name': 'Teriyaki Glazed Grilled Chicken Burger', 'description': 'Flame-grilled chicken breast basted in house teriyaki ginger glaze, toasted whole wheat bun, crisp lettuce, grilled pineapple', 'price': 279, 'category': 'burgers', 'tags': ['signature', 'flame-grilled', 'bestseller'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'smoke-house-grilled-paneer', 'name': 'Smoked BBQ Grilled Paneer Burger', 'description': 'Cottage cheese steak marinated in smoked paprika and grilled over flame, caramelized onions, zero-fat herb mayo', 'price': 259, 'category': 'burgers', 'tags': ['vegetarian', 'flame-grilled'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'baked-herb-wedges', 'name': 'Oven-Baked Rosemary Potato Wedges', 'description': 'Thick-cut skin-on potato wedges seasoned with fresh rosemary and sea salt, baked golden crisp without deep frying', 'price': 149, 'category': 'sides', 'tags': ['healthy', 'baked'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'pink-guava-cooler', 'name': 'Artisanal Pink Guava Chilli Cooler', 'description': 'Fresh pink guava pulp, crushed mint, sparkling water, light dusting of red chili salt', 'price': 139, 'category': 'shakes', 'tags': ['iced-tea', 'signature'], 'image': '/matcha-special.png', 'featured': True}
        ]
    },

    'good-flippin-burgers': {
        'brand': "Good Flippin' Burgers",
        'short_brand': "GOOD FLIPPIN' BURGERS",
        'tagline': "MUMBAI'S CULT SMASH BURGER CHAIN",
        'highlight_tag': 'THE CLUCKINATOR & FRESH POTATO BRIOCHE',
        'badge': 'CHURCH STREET & WHITEFIELD · BANGALORE',
        'hero_title_1': "GOOD FLIPPIN'",
        'hero_title_2': 'FRESH SMASH BURGERS',
        'hero_desc': 'Fresh juicy smash patties, pillowy potato brioche buns, and house-blended sauces served hot across Bangalore.',
        'footer_quadrants': 'CHURCH STREET · BRIGADE ROAD · WHITEFIELD',
        'desc': "Good Flippin' Burgers — The Cluckinator, The Grilla, The Standard Beef Smash, Cheese Boom, and handcrafted shakes in Church Street and Whitefield Bangalore.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "MAKE AVERAGE.", "color": "text-yolk"}, {"text": "WE MAKE GOOD FLIPPIN' BURGERS.", "color": "text-bone"}],
        'tags': ["CHURCH STREET BANGALORE", "WHITEFIELD", "THE CLUCKINATOR", "FRESH POTATO BRIOCHE", "100% JUICY"],
        'comic_words': ["FLIPPIN'!", "CLUCK!", "SMASH!", "CHEESE BOOM!", "GRILLA!", "JUICY!", "★"],
        'how_title': "THE GOOD FLIPPIN' STANDARD",
        'how_caption': "The Art of Flippin' Good Food",
        'steps': [
            {'num': '01', 'title': 'THE HEAVY PRESS', 'subtitle': '15-Second Smash', 'body': 'Prime beef pressed flat on cast iron to trigger explosive Maillard browning.', 'stat': '235°C', 'statLabel': 'Griddle Heat', 'detail': 'Immediate caramelization.'},
            {'num': '02', 'title': 'THE CLUCKER BRINE', 'subtitle': '24-hr Marinated Thigh', 'body': 'Crispy chicken breasts brined in secret spice blends and double dredged.', 'stat': '24 Hours', 'statLabel': 'Spice Brine', 'detail': 'Ultra-tender crunch.'},
            {'num': '03', 'title': 'POTATO BRIOCHE', 'subtitle': 'Toasted Butter Crown', 'body': 'Custom baked soft potato buns toasted in pure butter to hold every juicy drip.', 'stat': 'Artisan', 'statLabel': 'Bun Texture', 'detail': 'Pillowy and light.'}
        ],
        'locations': [
            {'id': 'church-street', 'name': "Good Flippin' Burgers Church Street", 'address': 'Church St, off Brigade Road, Shanthala Nagar, Ashok Nagar, Bengaluru 560001', 'city': 'Bangalore', 'hours': '11:00 AM – 12:00 AM', 'phone': '1800 202 3312', 'image': '/hero-burger.png', 'featured': True},
            {'id': 'whitefield', 'name': "Good Flippin' Burgers Whitefield", 'address': 'Whitefield Main Rd, Pattandur Agrahara, Bengaluru 560066', 'city': 'Bangalore', 'hours': '11:00 AM – 11:30 PM', 'phone': '1800 202 3312', 'image': '/truffle-fries.png'}
        ],
        'loc_metrics': {
            'church-street': {'busy': 'High Footfall', 'pct': 85, 'wait': '12 mins', 'quadrant': 'Central Brigade Hub', 'cx': '50%', 'cy': '50%'},
            'whitefield': {'busy': 'Moderate', 'pct': 60, 'wait': '10 mins', 'quadrant': 'East Tech Corridor', 'cx': '85%', 'cy': '45%'}
        },
        'footer_locs': [
            {'name': 'Church Street (Brigade)', 'address': 'Church St, off Brigade Rd, Ashok Nagar', 'hours': '11am – 12am', 'phone': '1800 202 3312'},
            {'name': 'Whitefield', 'address': 'Whitefield Main Rd, Pattandur Agrahara', 'hours': '11am – 11:30pm', 'phone': '1800 202 3312'}
        ],
        'footer_brand': "GOOD FLIPPIN' BURGERS",
        'footer_desc': 'Mumbai cult smash burger kitchen serving fresh, juicy burgers across Bangalore.',
        'footer_cta_title': "READY FOR FLIPPIN' GOOD BURGERS?",
        'footer_cta_sub': 'Visit our Church Street or Whitefield diners or order online.',
        'copyright': 'Good Flippin Hospitality Pvt Ltd · Bangalore, India',
        'email': 'hello@goodflippin.com',
        'menu_items': [
            {'id': 'the-cluckinator', 'name': 'The Cluckinator', 'description': 'Crispy deep-fried chicken thigh tossed in house spice blend, honey mustard slaw, cheese, and pickles on potato brioche', 'price': 345, 'category': 'burgers', 'tags': ['signature', 'crispy', 'bestseller'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'the-standard-double', 'name': 'The Standard Double Smash', 'description': 'Two smashed beef patties, double melted cheddar, diced red onions, house Flippin sauce on toasted potato bun', 'price': 375, 'category': 'burgers', 'tags': ['double-smash', 'classic'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'cheese-boom', 'name': 'The Cheese Boom Burger', 'description': 'Crispy molten cheese patty with jalapeño filling, lettuce, tomato, spicy garlic mayo', 'price': 325, 'category': 'burgers', 'tags': ['vegetarian', 'cheese-boom'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'salted-caramel-thickshake', 'name': 'Salted Butter Caramel Thickshake', 'description': 'Handcrafted vanilla gelato, rich salted caramel drizzle, crushed butter wafer', 'price': 225, 'category': 'shakes', 'tags': ['shakes'], 'image': '/matcha-special.png', 'featured': True}
        ]
    },

    'simon-burgers': {
        'brand': 'Simon Burgers',
        'short_brand': 'SIMON BURGERS',
        'tagline': "KAMMANAHALLI'S LATE-NIGHT BURGER SPOT",
        'highlight_tag': 'MONSTER DOUBLE & CRISPY CHICKEN ZINGER',
        'badge': '3RD CROSS KAMMANAHALLI · OPEN TILL 12:30 AM',
        'hero_title_1': "KAMMANAHALLI'S",
        'hero_title_2': 'LATE-NIGHT SMASHES',
        'hero_desc': 'Freshly grilled beef and crispy fried chicken burgers served hot till late night in Kammanahalli.',
        'footer_quadrants': '3RD CROSS · VIVEKANANDA SWAMY · KAMMANAHALLI',
        'desc': "Simon Burgers — The Simon Monster Double, fiery crispy zinger burgers, cheesy loaded melts, and Nutella shakes in Kammanahalli Bangalore.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "SLEEP EARLY.", "color": "text-yolk"}, {"text": "WE SERVE LATE.", "color": "text-bone"}],
        'tags': ["KAMMANAHALLI 3RD CROSS", "OPEN TILL LATE", "MONSTER DOUBLE STACK", "FIERY CHICKEN ZINGER", "LOCAL LEGEND"],
        'comic_words': ["SIMON!", "MONSTER!", "CRUNCH!", "ZINGER!", "CHEESE!", "BURGER!", "★"],
        'how_title': 'THE SIMON BURGER CODE',
        'how_caption': 'Neighborhood Late-Night Craft',
        'steps': [
            {'num': '01', 'title': 'FRESH PATTY PRESS', 'subtitle': 'Daily Hand Mince', 'body': 'Fresh meat seasoned with garlic, black pepper, and sea salt pressed on hot cast iron.', 'stat': '100% Fresh', 'statLabel': 'Local Meat', 'detail': 'Zero frozen processed patties.'},
            {'num': '02', 'title': 'CRISPY ZINGER DREDGE', 'subtitle': 'Spicy Buttermilk Coat', 'body': 'Chicken fillets marinated in paprika and cayenne before double tossing in seasoned flour.', 'stat': 'Double Crunch', 'statLabel': 'Crispy Coat', 'detail': 'Extra crispy crust.'},
            {'num': '03', 'title': 'THE HOUSE SAUCE', 'subtitle': 'Simon Signature Drizzle', 'body': 'Secret garlic mayo and smoked chili relish loaded onto every toasted bun.', 'stat': 'Signature', 'statLabel': 'Sauce Recipe', 'detail': 'Kammanahalli favorite flavor.'}
        ],
        'locations': [
            {'id': 'kammanahalli-3rd-cross', 'name': 'Simon Burgers Kammanahalli', 'address': 'Unit 6, Vivekananda Swamy, 38, 3rd Cross Rd, Kammanahalli, Bengaluru, Karnataka 560084', 'city': 'Bangalore', 'hours': '1:00 PM – 12:30 AM (Late Night Hub)', 'phone': '095911 84263', 'image': '/hero-burger.png', 'featured': True}
        ],
        'loc_metrics': {'kammanahalli-3rd-cross': {'busy': 'Late Night Peak', 'pct': 85, 'wait': '10 mins', 'quadrant': 'North-East Kammanahalli', 'cx': '65%', 'cy': '30%'}},
        'footer_locs': [{'name': 'Kammanahalli 3rd Cross', 'address': 'Unit 6, Vivekananda Swamy, 38, 3rd Cross Rd', 'hours': '1pm – 12:30am', 'phone': '095911 84263'}],
        'footer_brand': 'SIMON BURGERS',
        'footer_desc': 'Kammanahalli neighborhood favorite late-night burger and shake hub.',
        'footer_cta_title': 'CRAVING A LATE-NIGHT BURGER?',
        'footer_cta_sub': 'Order direct via WhatsApp or visit our Kammanahalli kitchen.',
        'copyright': 'Simon Burgers Hospitality · Bangalore, India',
        'email': 'orders@simonburgers.in',
        'menu_items': [
            {'id': 'simon-monster-double', 'name': 'The Simon Monster Double', 'description': 'Two juicy seasoned beef patties, double melted cheddar, sautéed sweet onions, and Simon signature sauce on toasted sesame bun', 'price': 290, 'category': 'burgers', 'tags': ['signature', 'monster-stack', 'bestseller'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'fiery-crispy-zinger', 'name': 'Fiery Crispy Chicken Zinger', 'description': 'Double-crunch marinated chicken breast, habanero dust, spicy garlic mayo, and shredded iceberg lettuce', 'price': 250, 'category': 'burgers', 'tags': ['spicy', 'crispy'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'cheesy-chilli-fries', 'name': 'Cheesy Chilli Loaded Fries', 'description': 'Golden crinkle fries topped with homemade minced meat chilli, molten cheese, and sliced jalapeños', 'price': 160, 'category': 'sides', 'tags': ['sides', 'loaded'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'nutella-fudge-shake', 'name': 'Nutella Fudge Thickshake', 'description': 'Pure Italian Nutella blended with rich vanilla bean cream, chocolate fudge rim, hazelnut crunch', 'price': 180, 'category': 'shakes', 'tags': ['thickshake', 'bestseller'], 'image': '/matcha-special.png', 'featured': True}
        ]
    },

    'smash-guys': {
        'brand': 'Smash Guys',
        'short_brand': 'SMASH GUYS',
        'tagline': "BANGALORE'S ORIGINAL CAST-IRON SMASH KITCHEN",
        'highlight_tag': '230°C CAST IRON SEAR · DOUBLE SMASH PATTIES',
        'badge': 'INDIRANAGAR & RMZ ECOWORLD BELLANDUR',
        'hero_title_1': "BANGALORE'S ORIGINAL",
        'hero_title_2': 'CAST-IRON SMASHES',
        'hero_desc': 'Double-smashed patties, 230°C bare cast-iron sear, house American cheese melts, and artisan drinks across Indiranagar & Bellandur.',
        'footer_quadrants': '12TH MAIN INDIRANAGAR · RMZ ECOWORLD BELLANDUR',
        'desc': "Smash Guys — Double-smashed patties, 230°C cast-iron caramelized crust, house smash sauce, and artisan drinks in Indiranagar and RMZ Ecoworld Bellandur.",
        'manifesto_words': [{"text": "WE DON'T", "color": "text-bone"}, {"text": "COOK.", "color": "text-yolk"}, {"text": "WE SMASH.", "color": "text-bone"}],
        'tags': ["230°C CAST IRON", "DOUBLE SMASH", "BANGALORE BORN", "HAND-FORMED PATTIES", "ZERO COMPROMISES"],
        'comic_words': ["SMASH!", "SEAR!", "CRUST!", "UMAMI!", "BOOM!", "230°C!", "★"],
        'how_title': 'HOW WE SMASH',
        'how_caption': 'The Science of Smash',
        'steps': [
            {'num': '01', 'title': 'THE PRESS', 'subtitle': 'Weight & Heat', 'body': 'A 90g hand-formed ball of 80/20 beef hits 230°C bare cast-iron. A heavy press flattens it in one decisive motion within the first 30 seconds.', 'stat': '230°C', 'statLabel': 'Cast Iron Temp', 'detail': 'Preserves fat dispersion while locking in a rich outer skin.'},
            {'num': '02', 'title': 'THE SEAR', 'subtitle': 'Crust Formation', 'body': 'No parchment, no steam. Dry contact with raw iron creates the signature lacquered crust — deeply caramelized and packed with umami.', 'stat': '30 sec', 'statLabel': 'Smash Window', 'detail': 'Ensures Maillard browning occurs before meat dries.'},
            {'num': '03', 'title': 'THE BUILD', 'subtitle': 'Stack & Serve', 'body': 'American cheese melted between two patties while still on the griddle. House sauce, dill pickles, brioche assembled in precision.', 'stat': '2×90g', 'statLabel': 'Double Stack', 'detail': 'Optimal cheese-to-meat ratio for juiciness.'}
        ],
        'locations': [
            {'id': 'indiranagar', 'name': 'Smash Guys Indiranagar (Flagship)', 'address': '948, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038', 'city': 'Bangalore', 'hours': '11:00 AM – 11:30 PM', 'phone': '080 4736 2227', 'image': '/hero-burger.png', 'featured': True},
            {'id': 'bellandur', 'name': 'Smash Guys RMZ Ecoworld', 'address': 'Ground Floor, RMZ Ecoworld Rd, Bellandur, Bengaluru, Karnataka 560103', 'city': 'Bangalore', 'hours': '11:00 AM – 11:00 PM', 'phone': '080 4736 2228', 'image': '/truffle-fries.png'}
        ],
        'loc_metrics': {
            'indiranagar': {'busy': 'High Energy', 'pct': 80, 'wait': '12 mins', 'quadrant': 'East Bangalore / 12th Main', 'cx': '65%', 'cy': '50%'},
            'bellandur': {'busy': 'Tech Park Rush', 'pct': 85, 'wait': '15 mins', 'quadrant': 'South-East Ecoworld', 'cx': '75%', 'cy': '75%'}
        },
        'footer_locs': [
            {'name': 'Indiranagar (Flagship)', 'address': '948, 12th Main Rd, HAL 2nd Stage', 'hours': '11am – 11:30pm', 'phone': '080 4736 2227'},
            {'name': 'RMZ Ecoworld Bellandur', 'address': 'Ground Floor, RMZ Ecoworld Rd', 'hours': '11am – 11pm', 'phone': '080 4736 2228'}
        ],
        'footer_brand': 'SMASH GUYS',
        'footer_desc': 'Bangalore original smash burger kitchen. Double-smashed patties and cast-iron caramelized crust.',
        'footer_cta_title': 'CRAVING REAL SMASH BURGERS?',
        'footer_cta_sub': 'Visit Indiranagar or Ecoworld Bellandur, or order online.',
        'copyright': 'Smash Guys · Popo Ventures Pvt Ltd · Bangalore, India',
        'email': 'hello@smashguys.in',
        'menu_items': [
            {'id': 'classic-smash-double', 'name': 'The Classic Double Smash', 'description': 'Two 90g fresh beef patties smashed thin on 230°C cast iron, double American cheese, dill pickles, diced onions, and signature smash sauce on toasted brioche', 'price': 349, 'category': 'burgers', 'tags': ['signature', 'bestseller', 'double-smash'], 'image': '/hero-burger.png', 'featured': True},
            {'id': 'truffle-smash-special', 'name': 'Black Truffle Garlic Smash', 'description': 'Double smashed beef patties, house-made truffle garlic aioli, caramelized shallots, aged Swiss melt, butter brioche', 'price': 399, 'category': 'burgers', 'tags': ['truffle', 'gourmet'], 'image': '/truffle-fries.png', 'featured': True},
            {'id': 'truffle-parmesan-fries', 'name': 'Truffle & Parmesan Fries', 'description': 'Hand-cut skin-on fries tossed with white truffle oil, shaved Grana Padano, and chives', 'price': 199, 'category': 'sides', 'tags': ['sides', 'vegetarian'], 'image': '/old-monk-mousse.png', 'featured': True},
            {'id': 'old-monk-mousse-shake', 'name': 'Old Monk Mousse Craft Shake', 'description': 'Hand-spun dark chocolate mousse shake infused with caramelized spice essence and whipped cream', 'price': 229, 'category': 'shakes', 'tags': ['shakes', 'signature'], 'image': '/matcha-special.png', 'featured': True}
        ]
    }
}

import json

for slug, data in projects_data.items():
    proj_dir = os.path.join('projects', slug)
    if not os.path.exists(proj_dir):
        print("Skipping", slug)
        continue
    
    # 1. lib/data/index.ts
    data_content = """export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "burgers" | "sides" | "shakes" | "specials";
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  image: string;
  featured?: boolean;
}

export interface FilmCredit {
  id: string;
  title: string;
  director: string;
  year: string;
  category: string;
  image: string;
}

export const menuItems: MenuItem[] = """ + json.dumps(data['menu_items'], indent=2) + """;

export const locations: Location[] = """ + json.dumps(data['locations'], indent=2) + """;

export const filmCredits: FilmCredit[] = [
  {
    id: "craft-series",
    title: \"""" + data['brand'] + """: The Culinary Craft",
    director: "Bangalore Food Lab",
    year: "2025",
    category: "Kitchen Documentary",
    image: "/hero-burger.png",
  },
];
"""
    with open(os.path.join(proj_dir, 'lib', 'data', 'index.ts'), 'w') as f:
        f.write(data_content)
    
    # 2. app/layout.tsx
    layout_content = """import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/marketing/CustomCursor";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: \"""" + data['brand'] + " | " + data['tagline'] + """\",
  description: \"""" + data['desc'] + """\",
  keywords: [
    \"""" + slug + """\", \"""" + data['brand'].lower() + """\", "bangalore burgers",
    "best burgers bangalore", "gourmet burgers",
  ],
  authors: [{ name: \"""" + data['brand'] + """\" }],
  openGraph: {
    title: \"""" + data['brand'] + " | " + data['tagline'] + """\",
    description: \"""" + data['desc'] + """\",
    url: \"https://preview.wishgranters.com/bangalore/""" + slug + """\",
    siteName: \"""" + data['brand'] + """\",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-char text-bone overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
"""
    with open(os.path.join(proj_dir, 'app', 'layout.tsx'), 'w') as f:
        f.write(layout_content)
    
    # 3. components/marketing/Nav.tsx
    nav_path = os.path.join(proj_dir, 'components', 'marketing', 'Nav.tsx')
    with open(nav_path) as f:
        nav_code = f.read()
    nav_code = nav_code.replace('Smash Guys', data['short_brand'])
    with open(nav_path, 'w') as f:
        f.write(nav_code)
    
    # 4. components/marketing/CinematicHero.tsx
    hero_code = """\"use client\";

import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  { length: 248 },
  (_, i) => `/frames/burger/frame_${String(i).padStart(6, "0")}.webp`
);

export default function CinematicHero() {
  return (
    <CanvasScrubber frames={frames} scrollDistance="+=350%">
      <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-20 relative pointer-events-none">
        <div className="flex justify-between text-[11px] font-mono tracking-widest text-smoke uppercase">
          <span className="text-yolk font-bold">""" + data['tagline'] + """</span>
          <span className="text-ember font-bold">""" + data['highlight_tag'] + """</span>
        </div>

        <div className="my-auto max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-char-mute/80 backdrop-blur-md rounded-full text-yolk font-mono text-[10px] tracking-wider uppercase border border-yolk/30 inline-block">
            """ + data['badge'] + """
          </span>
          <h1 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-bone leading-none">
            """ + data['hero_title_1'] + """ <br />
            <span className="text-yolk">""" + data['hero_title_2'] + """</span>
          </h1>
          <p className="text-stone font-body text-base sm:text-lg max-w-xl leading-relaxed">
            """ + data['hero_desc'] + """
          </p>
          <div className="pt-4 pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="px-8 py-4 bg-yolk text-char font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-2xl"
            >
              Explore Full Menu
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-char/80 backdrop-blur-md border border-char-mute text-bone font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-yolk transition-colors"
            >
              Find Outlets
            </Link>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-smoke uppercase">
          <span>""" + data['footer_quadrants'] + """</span>
          <span className="text-yolk">SCROLL TO INSPECT PATTIES</span>
        </div>
      </div>
    </CanvasScrubber>
  );
}
"""
    with open(os.path.join(proj_dir, 'components', 'marketing', 'CinematicHero.tsx'), 'w') as f:
        f.write(hero_code)

    # 5. components/marketing/BrandManifesto.tsx
    manifesto_code = """\"use client\";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WORDS = """ + json.dumps(data['manifesto_words'], indent=2) + """;

const TAGS = """ + json.dumps(data['tags'], indent=2) + """;

const COMIC_WORDS = """ + json.dumps(data['comic_words'], indent=2) + """;

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
  angle: number;
  dist: number;
}

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [particleId, setParticleId] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wordsRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBurst = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const colors = ["#F5C418", "#E67E22", "#FFFFFF", "#F5A623"];
    const count = 5 + Math.floor(Math.random() * 3);
    const newP: ClickParticle[] = Array.from({ length: count }).map((_, i) => ({
      id: particleId + i + 1,
      x,
      y,
      word: COMIC_WORDS[Math.floor(Math.random() * COMIC_WORDS.length)],
      color: colors[i % colors.length],
      angle: (i / count) * 360 + (Math.random() * 30 - 15),
      dist: 55 + Math.random() * 75,
    }));
    setParticleId((p) => p + count);
    setParticles((prev) => [...prev.slice(-20), ...newP]);
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleBurst}
      className="relative bg-char section-cinematic overflow-hidden border-b border-char-mute cursor-pointer select-none"
    >
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div ref={wordsRef} className="space-y-2 sm:space-y-4 mb-16 lg:mb-24">
          {WORDS.map((w, idx) => (
            <div key={idx} className="manifesto-word overflow-hidden">
              <span
                className={`type-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] leading-[0.88] block tracking-tight ${w.color}`}
              >
                {w.text}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-char-mute flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="type-caption text-smoke text-[9px] sm:text-[10px] tracking-widest border border-char-mute px-3 py-1.5 hover:border-yolk hover:text-yolk transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="type-label text-smoke text-[9px] tracking-widest font-mono">
            EST. BANGALORE · INDIA
          </span>
        </div>
      </div>
    </section>
  );
}
"""
    with open(os.path.join(proj_dir, 'components', 'marketing', 'BrandManifesto.tsx'), 'w') as f:
        f.write(manifesto_code)

    # 6. components/marketing/HowWeSmash.tsx
    how_code = """\"use client\";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = """ + json.dumps(data['steps'], indent=2) + """;

export default function HowWeSmash() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".smash-step",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-yolk section-cinematic overflow-hidden border-b border-char/10">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="type-caption text-char/60 mb-3">""" + data['how_caption'] + """</p>
          <h2 className="type-display text-6xl sm:text-8xl lg:text-[8rem] text-char leading-[0.9]">
            """ + data['how_title'] + """
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-char/15">
          {STEPS.map((step: any, idx: number) => (
            <div
              key={step.num}
              className={`smash-step group p-8 lg:p-12 border-b md:border-b-0 md:border-r border-char/15 last:border-r-0 transition-colors duration-500 ${
                hoveredIdx === idx ? "bg-char text-bone" : "bg-transparent text-char"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="type-caption text-smoke text-[9px] font-mono">{step.num}</span>
                <span className={`type-label text-xs font-mono ${
                  hoveredIdx === idx ? "text-yolk" : "text-char/60"
                }`}>
                  {step.stat}
                </span>
              </div>
              <h3 className="type-display text-3xl lg:text-4xl leading-[0.9] mb-2">
                {step.title}
              </h3>
              <p className={`type-label text-xs mb-6 ${
                hoveredIdx === idx ? "text-yolk" : "text-smoke"
              }`}>
                {step.subtitle}
              </p>
              <p className="type-serif text-sm leading-relaxed mb-6 opacity-80">
                {step.body}
              </p>
              <div className={`pt-4 border-t border-char/10 text-[10px] font-mono ${
                hoveredIdx === idx ? "text-stone" : "text-smoke"
              }`}>
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"""
    with open(os.path.join(proj_dir, 'components', 'marketing', 'HowWeSmash.tsx'), 'w') as f:
        f.write(how_code)

    # 7. components/marketing/RestaurantLocations.tsx
    loc_comp_code = """\"use client\";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations, Location } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LOCATION_METRICS: Record<string, { busy: string; pct: number; wait: string; quadrant: string; cx: string; cy: string }> = """ + json.dumps(data['loc_metrics'], indent=2) + """;

export default function RestaurantLocations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".location-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-char-mute/40 section-cinematic overflow-hidden border-b border-char-mute"
    >
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="type-caption text-yolk text-[9px] mb-3">Bangalore Dine-In & Takeout</p>
            <h2 className="type-display text-5xl sm:text-7xl lg:text-8xl text-bone leading-[0.9]">
              OUR OUTLETS
            </h2>
          </div>
          <p className="type-serif text-stone text-base lg:text-lg max-w-md leading-relaxed">
            Walk in for hot, fresh burgers or order direct pickup across Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc: Location) => {
            const metric = LOCATION_METRICS[loc.id] || { busy: "Open", pct: 60, wait: "10 mins", quadrant: "Bangalore", cx: "50%", cy: "50%" };
            return (
              <div
                key={loc.id}
                className="location-card bg-char border border-char-mute p-8 flex flex-col justify-between hover:border-yolk transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-caption text-smoke text-[9px]">{metric.quadrant}</span>
                    <span className="type-label text-[9px] bg-char-mute text-yolk px-2 py-1">
                      {metric.busy}
                    </span>
                  </div>
                  <h3 className="type-display text-2xl sm:text-3xl text-bone mb-2">
                    {loc.name}
                  </h3>
                  <p className="type-body text-stone text-xs leading-relaxed mb-4">
                    {loc.address}
                  </p>
                  <p className="type-label text-smoke text-[9px] mb-2">
                    Hours: {loc.hours}
                  </p>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-yolk text-xs hover:underline font-bold block mb-4"
                  >
                    {loc.phone}
                  </a>
                </div>
                <div className="pt-4 border-t border-char-mute flex justify-between items-center">
                  <span className="type-caption text-smoke text-[9px]">Wait: {metric.wait}</span>
                  <Link
                    href="/menu"
                    className="type-caption text-[10px] text-yolk hover:underline font-bold"
                  >
                    Order Takeaway →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"""
    with open(os.path.join(proj_dir, 'components', 'marketing', 'RestaurantLocations.tsx'), 'w') as f:
        f.write(loc_comp_code)

    # 8. components/marketing/Footer.tsx
    footer_code = """import Link from "next/link";

const LOCATIONS = """ + json.dumps(data['footer_locs'], indent=2) + """;

const NAV = [
  { href: "/menu", label: "Craft Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/locations", label: "Bangalore Outlets" },
  { href: "/reservations", label: "Party Orders & Catering" },
  { href: "/films", label: "Kitchen Series" },
];

const SOCIAL = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: \"mailto:""" + data['email'] + """\", label: "Email Us" },
  { href: "https://swiggy.com", label: "Swiggy" },
  { href: "https://zomato.com", label: "Zomato" },
];

export default function Footer() {
  return (
    <footer className="bg-char border-t border-char-mute">
      {/* Top CTA band */}
      <div className="bg-yolk text-char px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-full">
        <div className="flex items-center gap-4">
          <span className="type-display text-3xl text-char">""" + data['footer_cta_title'] + """</span>
          <span className="type-serif text-char/80 italic text-lg hidden sm:block">""" + data['footer_cta_sub'] + """</span>
        </div>
        <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
          <Link href="/locations" className="bg-char text-yolk hover:bg-white hover:text-char transition-all px-6 py-3 type-caption text-[10px]">
            Find Outlet →
          </Link>
          <a
            href="https://zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-char text-char px-6 py-3 type-caption text-[10px] hover:bg-char hover:text-yolk transition-all duration-300"
          >
            Order on Zomato ↗
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[88rem] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 bg-yolk rounded-sm flex-shrink-0" />
              <span className="type-display text-2xl text-bone">""" + data['footer_brand'] + """</span>
            </div>
            <p className="type-serif text-stone text-lg leading-relaxed mb-6 max-w-sm">
              """ + data['footer_desc'] + """
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300 border border-char-mute px-3 py-2"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="type-caption text-yolk text-[10px] mb-5">Navigate</h3>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="type-body text-stone text-sm hover:text-bone transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-5">
            <h3 className="type-caption text-yolk text-[10px] mb-5">Bangalore Outlets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {LOCATIONS.map((loc: any) => (
                <div key={loc.name}>
                  <h4 className="type-display text-xl text-bone mb-1">{loc.name.toUpperCase()}</h4>
                  <p className="type-body text-smoke text-xs leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yolk" />
                    <span className="type-label text-smoke text-[9px]">{loc.hours}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300 mt-1 block"
                  >
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-char-mute flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="type-label text-smoke text-[9px]">
            © {new Date().getFullYear()} """ + data['copyright'] + """
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              Terms
            </Link>
            <a href=\"mailto:""" + data['email'] + """\" className="type-label text-smoke text-[9px] hover:text-yolk transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
"""
    with open(os.path.join(proj_dir, 'components', 'marketing', 'Footer.tsx'), 'w') as f:
        f.write(footer_code)

    print(f"Wrote customized files for {slug} successfully!")
