import os

brand_configs = {
    # 🇮🇳 Bangalore Brands
    'beyondburg-inc': {
        'name': 'Beyondburg Inc.',
        'short_name': 'BEYONDBURG INC.',
        'tagline': 'CULT SMASH BURGER CO. · ST. MARKS RD · BENGALURU',
        'sub': '450°F STEEL CAST-IRON SMASH',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'theme_base': '#071009',
        'food_type': 'burger',
        'outposts': [
            {"id": "st-marks", "name": "St. Mark's Road Flagship", "badge": "ORIGINAL SMASH ATELIER", "address": "Opp. Bowring Institute, St. Mark's Rd", "city": "Bengaluru 560001", "hours": "11:30 AM – 11:30 PM", "phone": "+91 90729 64242", "status": "Kitchen Active · 10 min table wait", "seating": "Chef's Sizzle Counter & Shaded Patio", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Beyondburg+Inc+Bangalore"},
            {"id": "indiranagar", "name": "Indiranagar Craft Kitchen", "badge": "100FT ROAD OUTPOST", "address": "100 Feet Rd, HAL 2nd Stage", "city": "Bengaluru 560038", "hours": "12:00 PM – 1:00 AM", "phone": "+91 90729 64243", "status": "Kitchen Active · Open till 1:00 AM", "seating": "Neon Lounge & Outdoor Deck", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80", "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Beyondburg+Inc+Indiranagar"}
        ]
    },
    'truffles-bangalore': {
        'name': 'Truffles',
        'short_name': 'TRUFFLES',
        'tagline': 'SINCE 2004 · BANGALORE\'S ICONIC BURGERS & SHAKES',
        'sub': 'SIGNATURE AMERICAN CHEESE MELT',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#F5A623',
        'text_on_primary': '#000000',
        'theme_base': '#100a06',
        'food_type': 'burger',
        'outposts': [
            {"id": "st-marks", "name": "St. Mark's Road Landmark", "badge": "LEGENDARY 2004 FLAGSHIP", "address": "Apex Building, St. Mark's Road", "city": "Bengaluru 560001", "hours": "11:00 AM – 11:00 PM", "phone": "+91 80 4112 0189", "status": "Active · Landmark Diners", "seating": "Iconic Diner Booths & Counter", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Truffles+St+Marks+Road+Bangalore"},
            {"id": "koramangala", "name": "Koramangala 5th Block", "badge": "CAMPUS CULT OUTPOST", "address": "28, 4th B Cross, 5th Block", "city": "Bengaluru 560095", "hours": "11:00 AM – 11:30 PM", "phone": "+91 80 4146 6565", "status": "Active · Fast Service", "seating": "Vibrant Casual Dining", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80", "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Truffles+Koramangala"}
        ]
    },
    'burger-seigneur': {
        'name': 'Burger Seigneur',
        'short_name': 'BURGER SEIGNEUR',
        'tagline': 'ARTISANAL EUROPEAN GOURMET ATELIER · INDIRANAGAR',
        'sub': 'HAUTE BRIOCHE & TRUFFLE MELT',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#C8A96E',
        'text_on_primary': '#000000',
        'theme_base': '#0d0b07',
        'food_type': 'burger',
        'outposts': [
            {"id": "indiranagar", "name": "Indiranagar Flagship Atelier", "badge": "HAUTE GOURMET LAB", "address": "8th Main Rd, HAL 2nd Stage", "city": "Bengaluru 560038", "hours": "12:00 PM – 11:30 PM", "phone": "+91 80 4965 2828", "status": "Active · European Terrace", "seating": "Courtyard Botanical Garden", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Burger+Seigneur+Indiranagar"}
        ]
    },
    'sankys-burger-house': {
        'name': 'Sanky\'s Burger House',
        'short_name': 'SANKY\'S BURGER HOUSE',
        'tagline': 'THE LATE-NIGHT CULT BURGER GARAGE · HENNUR',
        'sub': 'UNDERGROUND MONSTER SMASH CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#FFE500',
        'text_on_primary': '#000000',
        'theme_base': '#08080a',
        'food_type': 'burger',
        'outposts': [
            {"id": "hennur", "name": "Hennur Garage Flagship", "badge": "OPEN TILL 3:00 AM", "address": "Hennur Main Rd, HRBR Layout", "city": "Bengaluru 560043", "hours": "5:00 PM – 3:00 AM (Late Night)", "phone": "+91 98450 12345", "status": "Active · Sizzling Now", "seating": "Underground Garage Counter", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Sankys+Burger+House+Hennur"}
        ]
    },
    'biggies-burger': {
        'name': 'Biggies Burger',
        'short_name': 'BIGGIES BURGER',
        'tagline': 'ORIGINAL GRILLED BURGERS · BANGALORE',
        'sub': 'AUTHENTIC BEHEMOTH CHARBROIL',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#F26522',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#100804',
        'food_type': 'burger',
        'outposts': [
            {"id": "koramangala", "name": "Koramangala Flame Grill", "badge": "BEHEMOTH HQ", "address": "1st Main, 7th Block", "city": "Bengaluru 560095", "hours": "11:00 AM – 1:00 AM", "phone": "+91 80 4122 3344", "status": "Active · Flame Broil", "seating": "Casual Fast Broil Bar", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Biggies+Burger+Bangalore"}
        ]
    },
    'leons-burgers': {
        'name': 'Leon\'s Burgers & Wings',
        'short_name': 'LEON\'S BURGERS & WINGS',
        'tagline': '24-HR BUTTERMILK FRIED CHICKEN & BURGERS · INDIRANAGAR',
        'sub': '24-HR BUTTERMILK PERI-PERI CRUNCH',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#B12727',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#0e0606',
        'food_type': 'burger',
        'outposts': [
            {"id": "indiranagar", "name": "Indiranagar Flagship", "badge": "PERI-PERI CRUNCH HQ", "address": "12th Main, HAL 2nd Stage", "city": "Bengaluru 560038", "hours": "11:00 AM – 1:00 AM", "phone": "+91 80 4371 1999", "status": "Active · 24-Hr Brine", "seating": "Lively Indoor & Balcony Deck", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Leons+Burgers+Wings+Indiranagar"}
        ]
    },
    'louis-burger': {
        'name': 'Louis Burger',
        'short_name': 'LOUIS BURGER',
        'tagline': 'CHEF ZORAWAR KALRA · CRAFT GOURMET BURGERS',
        'sub': '24K GOLD WAGYU & TRUFFLE MELT',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#D4AF37',
        'text_on_primary': '#000000',
        'theme_base': '#0d0b06',
        'food_type': 'burger',
        'outposts': [
            {"id": "lavelle", "name": "Lavelle Road Atelier", "badge": "24K GOLD WAGYU LAB", "address": "Lavelle Rd, Shanthala Nagar", "city": "Bengaluru 560001", "hours": "12:00 PM – 11:30 PM", "phone": "+91 80 4567 8900", "status": "Active · Chef Curated", "seating": "Luxury Haute Lounge", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Louis+Burger+Bangalore"}
        ]
    },
    'original-burger-co': {
        'name': 'Original Burger Co. (OBC)',
        'short_name': 'ORIGINAL BURGER CO.',
        'tagline': 'DOUBLE SMASH & BACON JAM DINER · BANGALORE',
        'sub': 'DOUBLE SMASHED BACON JAM CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#2563EB',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#060a12',
        'food_type': 'burger',
        'outposts': [
            {"id": "koramangala", "name": "Koramangala Diner", "badge": "BACON JAM SMASH HQ", "address": "80ft Road, 4th Block", "city": "Bengaluru 560034", "hours": "12:00 PM – 12:00 AM", "phone": "+91 80 4890 1122", "status": "Active · Flat-Top Sizzle", "seating": "Classic American Booths", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Original+Burger+Co+Bangalore"}
        ]
    },
    'backyard-burgers': {
        'name': 'Backyard Burgers & Grill',
        'short_name': 'BACKYARD BURGERS',
        'tagline': 'OPEN-AIR SMOKEHOUSE & GRILL · KORAMANGALA',
        'sub': 'SMOKEHOUSE BARK & CHARCOAL SMASH',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#E67E22',
        'text_on_primary': '#000000',
        'theme_base': '#100904',
        'food_type': 'burger',
        'outposts': [
            {"id": "koramangala", "name": "Koramangala Open-Air Yard", "badge": "HICKORY SMOKEHOUSE", "address": "5th Block, Jyoti Nivas College Rd", "city": "Bengaluru 560095", "hours": "4:00 PM – 1:00 AM", "phone": "+91 98455 66778", "status": "Active · Open-Air Pits", "seating": "Garden Yard & Beer Benches", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Backyard+Burgers+Bangalore"}
        ]
    },
    'burger-elite': {
        'name': 'BURGER ELITE',
        'short_name': 'BURGER ELITE',
        'tagline': 'STREET SMASH ROYALE · INDIRANAGAR',
        'sub': 'DOUBLE SMASH ROYALE CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#7C3AED',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#0b0614',
        'food_type': 'burger',
        'outposts': [
            {"id": "indiranagar", "name": "Indiranagar Royale Lounge", "badge": "ROYALE SMASH LAB", "address": "100 Feet Road, HAL 2nd Stage", "city": "Bengaluru 560038", "hours": "12:00 PM – 12:30 AM", "phone": "+91 80 4399 8811", "status": "Active · Royale Kitchen", "seating": "Neon Velvet Lounge", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Burger+Elite+Bangalore"}
        ]
    },
    'burgerman': {
        'name': 'BurgerMan',
        'short_name': 'BURGERMAN',
        'tagline': '100% FLAME-GRILLED WHOLE WHEAT BURGERS',
        'sub': 'GUILT-FREE FLAME GRILLED CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#15803D',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#051007',
        'food_type': 'burger',
        'outposts': [
            {"id": "indiranagar", "name": "Indiranagar Healthy Bistro", "badge": "100% FLAME GRILLED", "address": "12th Main Rd, Indiranagar", "city": "Bengaluru 560038", "hours": "11:00 AM – 11:00 PM", "phone": "+91 80 4115 5678", "status": "Active · Zero Oil Frying", "seating": "Clean Minimalist Bistro", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=BurgerMan+Bangalore"}
        ]
    },
    'good-flippin-burgers': {
        'name': 'Good Flippin\' Burgers',
        'short_name': 'GOOD FLIPPIN\' BURGERS',
        'tagline': 'FRESH SMASHED JUICY BURGERS · BANGALORE',
        'sub': 'FRESH SMASHED BRIOCHE PERFECTION',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#BE123C',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#0e0509',
        'food_type': 'burger',
        'outposts': [
            {"id": "koramangala", "name": "Koramangala 4th Block", "badge": "FRESH JUICY SMASH", "address": "80 Feet Rd, 4th Block", "city": "Bengaluru 560034", "hours": "11:30 AM – 12:30 AM", "phone": "+91 80 4511 2233", "status": "Active · Flippin Fresh", "seating": "High-Energy Diner", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Good+Flippin+Burgers+Bangalore"}
        ]
    },
    'simon-burgers': {
        'name': 'Simon Burgers',
        'short_name': 'SIMON BURGERS',
        'tagline': 'LATE-NIGHT SMASH BURGERS & FRIES · KAMMANAHALLI',
        'sub': 'KAMMANAHALLI MONSTER DOUBLE CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#DC2626',
        'text_on_primary': '#FFFFFF',
        'theme_base': '#0e0606',
        'food_type': 'burger',
        'outposts': [
            {"id": "kammanahalli", "name": "Kammanahalli Main Rd", "badge": "OPEN TILL 2:30 AM", "address": "Nehru Main Rd, Kammanahalli", "city": "Bengaluru 560084", "hours": "4:00 PM – 2:30 AM", "phone": "+91 98450 99881", "status": "Active · Late-Night Grill", "seating": "Street Smash Counter", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Simon+Burgers+Bangalore"}
        ]
    },
    'smash-guys': {
        'name': 'Smash Guys',
        'short_name': 'SMASH GUYS',
        'tagline': '450°F CAST-IRON SMASHED BURGERS · BANGALORE',
        'sub': 'MAXIMUM CRUNCH MAILLARD CRUST',
        'city': 'Bengaluru',
        'currency': '₹',
        'primary': '#F5C418',
        'text_on_primary': '#000000',
        'theme_base': '#071009',
        'food_type': 'burger',
        'outposts': [
            {"id": "indiranagar", "name": "Indiranagar Smash Lab", "badge": "450°F STEEL SMASH HQ", "address": "100 Feet Rd, Indiranagar", "city": "Bengaluru 560038", "hours": "11:30 AM – 11:30 PM", "phone": "+91 80 4911 2244", "status": "Active · Maillard Sizzle", "seating": "Industrial Smash Bar", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Smash+Guys+Bangalore"}
        ]
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
        'theme_base': '#100a05',
        'food_type': 'burger',
        'outposts': [
            {"id": "manchaca", "name": "South Austin Manchaca", "badge": "1973 ORIGINAL DINER", "address": "5602 Manchaca Rd", "city": "Austin, TX 78745", "hours": "6:00 AM – 10:00 PM", "phone": "(512) 448-3800", "status": "Active · Legendary Flat-Top", "seating": "Vintage Texas Diner Booths", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Dans+Hamburgers+Manchaca"}
        ]
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
        'theme_base': '#100804',
        'food_type': 'burger',
        'outposts': [
            {"id": "guadalupe", "name": "The Drag Historic Landmark", "badge": "100 YEARS (1926-2026)", "address": "2808 Guadalupe St", "city": "Austin, TX 78705", "hours": "11:00 AM – 11:00 PM", "phone": "(512) 477-3173", "status": "Active · 100-Yr Cast Iron", "seating": "Historic UT Longhorns Counter", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Dirty+Martins+Austin"}
        ]
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
        'theme_base': '#0e0505',
        'food_type': 'burger',
        'outposts': [
            {"id": "sixth", "name": "6th Street Cult Tavern", "badge": "OPEN TILL 2:00 AM", "address": "517 E 6th St", "city": "Austin, TX 78701", "hours": "11:30 AM – 2:00 AM", "phone": "(512) 469-9330", "status": "Active · Lava Rock Broil", "seating": "Cult Rock Bar & Patio", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Casino+El+Camino+Austin"}
        ]
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
        'theme_base': '#050c10',
        'food_type': 'burger',
        'outposts': [
            {"id": "airport", "name": "Airport Blvd Diner", "badge": "EL PASO BORDER SOUL", "address": "5111 Airport Blvd", "city": "Austin, TX 78751", "hours": "11:00 AM – 10:00 PM", "phone": "(512) 291-3358", "status": "Active · Onions Steaming", "seating": "Lively Diner & Patio", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=JewBoy+Burgers+Austin"}
        ]
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
        'theme_base': '#0e0505',
        'food_type': 'pizza',
        'outposts': [
            {"id": "justin", "name": "North Austin Justin Ln", "badge": "72-HR FERMENTATION LAB", "address": "8315 Justin Ln", "city": "Austin, TX 78757", "hours": "4:00 PM – 10:00 PM", "phone": "(512) 861-5589", "status": "Active · 650°F Stone Deck", "seating": "Artisan Pizza Counter", "heroImage": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Pedrosos+Pizza+Austin"}
        ]
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
        'theme_base': '#051007',
        'food_type': 'pizza',
        'outposts': [
            {"id": "crestview", "name": "Crestview Neighborhood Deli", "badge": "JERSEY STONE-BAKED HQ", "address": "7101 Woodrow Ave", "city": "Austin, TX 78757", "hours": "11:00 AM – 9:00 PM", "phone": "(512) 467-7402", "status": "Active · Sub Smoker Fired", "seating": "Shaded Crestview Tree Patio", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Little+Deli+Austin"}
        ]
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
        'theme_base': '#0f0509',
        'food_type': 'burger',
        'outposts': [
            {"id": "deep-eddy", "name": "Deep Eddy Pool Airstream", "badge": "1968 VINTAGE TIKI", "address": "2315 Lake Austin Blvd", "city": "Austin, TX 78703", "hours": "11:00 AM – 11:00 PM", "phone": "(512) 334-9747", "status": "Active · Tiki Bar Shaking", "seating": "Tropical Palm Tree Deck", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Pool+Burger+Austin"}
        ]
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
        'theme_base': '#100804',
        'food_type': 'burger',
        'outposts': [
            {"id": "east-austin", "name": "East Austin Smokehouse Yard", "badge": "LIVE POST OAK PIT", "address": "1814 E Martin Luther King Jr Blvd", "city": "Austin, TX 78702", "hours": "9:00 AM – 9:00 PM", "phone": "(512) 394-5776", "status": "Active · Smoker Rolling", "seating": "Massive Oak Beer Garden", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Sour+Duck+Market+Austin"}
        ]
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
        'theme_base': '#060a12',
        'food_type': 'burger',
        'outposts': [
            {"id": "congress", "name": "Downtown Congress Walk-Up", "badge": "AUSTIN WALK-UP WINDOW", "address": "208 Congress Ave", "city": "Austin, TX 78701", "hours": "11:00 AM – 10:00 PM", "phone": "(512) 476-4800", "status": "Active · Walk-Up Ready", "seating": "Congress Street Benches", "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=Burger+Bar+on+Congress+Austin"}
        ]
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
        'theme_base': '#080808',
        'food_type': 'burger',
        'outposts': [
            {"id": "rainey", "name": "Rainey Street Michelin Lab", "badge": "100% TEXAS AKAUSHI WAGYU", "address": "1007 Rainey St", "city": "Austin, TX 78701", "hours": "12:00 PM – 2:00 AM", "phone": "(512) 890-1122", "status": "Active · Wagyu Sizzle", "seating": "Rainey Street Patio", "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", "gallery": ["https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"], "mapUrl": "https://maps.google.com/?q=NADC+Burger+Austin"}
        ]
    },
}

interactive_bg_template = """"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface InteractiveBackgroundProps {
  primaryColor?: string;
  themeBase?: string;
}

export default function InteractiveBackground({
  primaryColor = "__PRIMARY__",
  themeBase = "__THEME_BASE__",
}: InteractiveBackgroundProps) {
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

    const doodleTypes = ["burger", "spatula", "flame", "star", "sparkle", "steam", "swirl"];
    const doodleCount = 22;

    const doodles = Array.from({ length: doodleCount }, (_, i) => ({
      type: doodleTypes[i % doodleTypes.length],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 22 + 18,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.3 + 0.1),
      alpha: Math.random() * 0.35 + 0.15,
      maxAlpha: Math.random() * 0.45 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
    }));

    const emberCount = 35;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.5 + 0.2),
      vx: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.006 + 0.003,
    }));

    const drawBurger = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.arc(0, -s * 0.3, s, Math.PI, 0, false);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(-s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.arc(0, -s * 0.7, 1.2, 0, Math.PI * 2);
      c.arc(s * 0.4, -s * 0.6, 1.2, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.moveTo(-s * 1.1, 0);
      c.quadraticCurveTo(0, s * 0.3, s * 1.1, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s, s * 0.1);
      c.lineTo(-s * 0.3, s * 0.5);
      c.lineTo(0, s * 0.1);
      c.lineTo(s * 0.4, s * 0.6);
      c.lineTo(s, s * 0.1);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.9, s * 0.7);
      c.quadraticCurveTo(0, s * 0.9, s * 0.9, s * 0.7);
      c.stroke();
    };

    const drawSpatula = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      c.beginPath();
      c.moveTo(0, s);
      c.lineTo(0, 0);
      c.stroke();
      c.strokeRect(-s * 0.5, -s, s, s);
      c.beginPath();
      c.moveTo(-s * 0.25, -s * 0.8);
      c.lineTo(-s * 0.25, -s * 0.2);
      c.moveTo(0, -s * 0.8);
      c.lineTo(0, -s * 0.2);
      c.moveTo(s * 0.25, -s * 0.8);
      c.lineTo(s * 0.25, -s * 0.2);
      c.stroke();
    };

    const drawFlame = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      c.beginPath();
      c.moveTo(0, -s);
      c.bezierCurveTo(s * 0.8, -s * 0.2, s * 0.8, s * 0.8, 0, s);
      c.bezierCurveTo(-s * 0.8, s * 0.8, -s * 0.8, -s * 0.2, 0, -s);
      c.stroke();
      c.beginPath();
      c.moveTo(0, -s * 0.4);
      c.bezierCurveTo(s * 0.4, 0, s * 0.4, s * 0.6, 0, s * 0.7);
      c.bezierCurveTo(-s * 0.4, s * 0.6, -s * 0.4, 0, 0, -s * 0.4);
      c.stroke();
    };

    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(0, 0, s, 0);
      c.quadraticCurveTo(0, 0, 0, s);
      c.quadraticCurveTo(0, 0, -s, 0);
      c.quadraticCurveTo(0, 0, 0, -s);
      c.closePath();
      c.stroke();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s, 0);
      c.lineTo(s, 0);
      c.stroke();
      c.beginPath();
      c.moveTo(-s * 0.4, -s * 0.4);
      c.lineTo(s * 0.4, s * 0.4);
      c.moveTo(-s * 0.4, s * 0.4);
      c.lineTo(s * 0.4, -s * 0.4);
      c.stroke();
    };

    const drawSteam = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.5;
      c.beginPath();
      c.moveTo(-s * 0.3, s);
      c.bezierCurveTo(-s * 0.6, s * 0.3, 0, -s * 0.3, -s * 0.3, -s);
      c.stroke();
      c.beginPath();
      c.moveTo(s * 0.3, s);
      c.bezierCurveTo(0, s * 0.3, s * 0.6, -s * 0.3, s * 0.3, -s);
      c.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      doodles.forEach((d) => {
        d.y += d.vy;
        d.x += d.vx;
        d.rotation += d.rotSpeed;
        d.alpha += d.fadeSpeed;

        if (d.alpha > d.maxAlpha || d.alpha < 0.08) {
          d.fadeSpeed = -d.fadeSpeed;
        }

        if (d.y < -50) {
          d.y = height + 40;
          d.x = Math.random() * width;
          d.alpha = 0.08;
        }

        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.strokeStyle = primaryColor;
        ctx.fillStyle = primaryColor;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = Math.max(0.04, Math.min(0.45, d.alpha));
        ctx.shadowBlur = 6;
        ctx.shadowColor = primaryColor;

        if (d.type === "burger") drawBurger(ctx, d.size);
        else if (d.type === "spatula") drawSpatula(ctx, d.size);
        else if (d.type === "flame") drawFlame(ctx, d.size);
        else if (d.type === "star") drawStar(ctx, d.size);
        else if (d.type === "sparkle") drawSparkle(ctx, d.size);
        else if (d.type === "steam") drawSteam(ctx, d.size);
        else drawStar(ctx, d.size);

        ctx.restore();
      });

      embers.forEach((e) => {
        e.y += e.vy;
        e.x += e.vx;
        e.alpha += e.fadeSpeed;

        if (e.alpha > 0.6 || e.alpha < 0.05) {
          e.fadeSpeed = -e.fadeSpeed;
        }

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
          e.alpha = 0.05;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, e.alpha * 0.5));
        ctx.shadowBlur = 8;
        ctx.shadowColor = primaryColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${themeBase} 0%, #050806 100%)`,
        }}
      />

      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor: primaryColor,
          left: springX ? `${springX.get() * 100}%` : "50%",
          top: springY ? `${springY.get() * 100}%` : "30%",
        }}
      />

      <div
        className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-0 left-10 w-[800px] h-[800px] rounded-full blur-[220px] opacity-12 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${primaryColor} 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
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
  { id: "all", label: "Full Lineup" },
  { id: "smash", label: "Signature Smashes" },
  { id: "chicken", label: "Crispy Fried Chicken" },
  { id: "sides", label: "Loaded Sides & Fries" },
  { id: "shakes", label: "Hand-Spun Malts" },
];

export default function SignatureMenu() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activePreviewItem, setActivePreviewItem] = useState<any | null>(null);

  const handleAddToCart = (item: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          name: item.name,
          price: item.price,
          quantity: 1,
          description: item.description,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (name: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0);
    });
  };

  const filteredItems = menuItems.filter((item) => {
    const cat = String(item.category || "").toLowerCase();
    const name = String(item.name || "").toLowerCase();
    const desc = String(item.description || "").toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || name.includes(q) || desc.includes(q);

    if (!matchesSearch) return false;
    if (selectedCat === "all") return true;
    if (selectedCat === "smash") return cat.includes("burger") || cat.includes("pizza") || cat.includes("special") || cat === "mains";
    if (selectedCat === "chicken") return cat.includes("chicken") || cat.includes("wing") || cat.includes("tender");
    if (selectedCat === "sides") return cat.includes("side") || cat.includes("fry") || cat.includes("salad");
    if (selectedCat === "shakes") return cat.includes("shake") || cat.includes("drink") || cat.includes("dessert");
    return true;
  });

  return (
    <section
      id="menu-section"
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: "__PRIMARY__" }} />
              <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
                __SHORT_NAME__ // CULINARY BOARD
              </span>
            </div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
            <p className="font-mono text-xs text-stone-400 max-w-xl">
              Handcrafted with fresh premium cuts, signature seasonings, and bespoke artisanal buns.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="px-4 py-2 pl-9 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors w-56 sm:w-64"
                style={{ borderColor: searchQuery ? "__PRIMARY__" : undefined }}
              />
              <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-stone-400 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl"
              style={{
                backgroundColor: "__PRIMARY__",
                color: "__TEXT_ON_PRIMARY__",
              }}
            >
              <span>🛒</span>
              <span>Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap border font-bold ${
                  isSelected
                    ? "shadow-lg scale-105"
                    : "bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white border-white/10"
                }`}
                style={{
                  backgroundColor: isSelected ? "__PRIMARY__" : undefined,
                  color: isSelected ? "__TEXT_ON_PRIMARY__" : undefined,
                  borderColor: isSelected ? "__PRIMARY__" : undefined,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid with Interactive 3D Hover Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name || idx}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setActivePreviewItem(item)}
                className="group relative p-7 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 transition-all duration-300 flex flex-col justify-between shadow-2xl cursor-pointer hover:-translate-y-1.5"
                style={{
                  borderColor: undefined,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest font-bold" style={{ color: "__PRIMARY__" }}>
                        __SHORT_NAME__ // #0{idx + 1}
                      </span>
                      <h3 className="type-display text-2xl sm:text-3xl text-white transition-colors leading-tight font-extrabold">
                        {item.name}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-sm font-extrabold px-3 py-1 rounded-md border whitespace-nowrap shadow"
                      style={{
                        backgroundColor: "__PRIMARY__15",
                        color: "__PRIMARY__",
                        borderColor: "__PRIMARY__40",
                      }}
                    >
                      __CURRENCY__{item.price}
                    </span>
                  </div>

                  <p className="type-serif text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-white/5">
                      🔥 Fresh Sizzle
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-stone-400 border border-white/5">
                      ⚡ Quick View
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.isArray(item.tags) &&
                      item.tags.slice(0, 2).map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-stone-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-4 py-2 rounded-md font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                    style={{
                      backgroundColor: "__PRIMARY__",
                      color: "__TEXT_ON_PRIMARY__",
                    }}
                  >
                    <span>Add</span>
                    <span className="text-base leading-none">+</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Dish Quick-View Modal */}
      <AnimatePresence>
        {activePreviewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePreviewItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-[#0e0e12] border rounded-2xl p-8 text-white shadow-2xl space-y-6 overflow-hidden"
              style={{ borderColor: "__PRIMARY__60" }}
            >
              <button
                onClick={() => setActivePreviewItem(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-mono transition-colors"
              >
                ✕
              </button>

              <div className="space-y-3">
                <span className="font-mono text-xs tracking-widest uppercase font-bold" style={{ color: "__PRIMARY__" }}>
                  CULINARY PROFILE
                </span>
                <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                  {activePreviewItem.name}
                </h3>
                <p className="type-serif text-sm text-stone-300 leading-relaxed">
                  {activePreviewItem.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="font-mono text-xs text-stone-400 block">Single Portion</span>
                  <span className="font-mono text-2xl font-black" style={{ color: "__PRIMARY__" }}>
                    __CURRENCY__{activePreviewItem.price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(activePreviewItem);
                    setActivePreviewItem(null);
                  }}
                  className="px-6 py-3 rounded-lg font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xl flex items-center gap-2"
                  style={{
                    backgroundColor: "__PRIMARY__",
                    color: "__TEXT_ON_PRIMARY__",
                  }}
                >
                  <span>Add to Bag</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

how_we_smash_template = """"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowWeSmash() {
  const [tempValue, setTempValue] = useState(450);
  const crustPercent = Math.min(100, Math.max(10, Math.round(((tempValue - 200) / 300) * 100)));

  return (
    <section className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest uppercase block font-bold" style={{ color: "__PRIMARY__" }}>
              __SHORT_NAME__ // CRAFT LAB &amp; SCIENCE
            </span>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              THE ARTISANAL SIZZLE CRAFT
            </h2>
          </div>
          <span
            className="font-mono text-xs uppercase font-bold px-4 py-1.5 rounded-full border shadow"
            style={{
              backgroundColor: "__PRIMARY__15",
              color: "__PRIMARY__",
              borderColor: "__PRIMARY__40",
            }}
          >
            100% MASTER CRAFT
          </span>
        </div>

        {/* Interactive Temperature & Sear Simulator Card */}
        <div className="p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold" style={{ color: "__PRIMARY__" }}>
                INTERACTIVE FLAT-TOP SIMULATOR
              </span>
              <h3 className="type-display text-2xl sm:text-3xl text-white font-bold">
                FLAT-TOP TEMPERATURE &amp; MAILLARD CRUST GAUGE
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-black" style={{ color: "__PRIMARY__" }}>
                {tempValue}°F
              </span>
              <span
                className="font-mono text-xs px-2.5 py-1 rounded border uppercase font-bold"
                style={{
                  backgroundColor: "__PRIMARY__20",
                  color: "__PRIMARY__",
                  borderColor: "__PRIMARY__40",
                }}
              >
                {tempValue >= 450 ? "⚡ Optimal Crisp" : tempValue >= 350 ? "Standard Sear" : "Slow Temp"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min={250}
              max={500}
              step={10}
              value={tempValue}
              onChange={(e) => setTempValue(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg cursor-pointer"
              style={{ accentColor: "__PRIMARY__" }}
            />
            <div className="flex justify-between text-[10px] font-mono text-stone-400">
              <span>250°F (Slow Steam)</span>
              <span className="font-bold" style={{ color: "__PRIMARY__" }}>450°F (Optimal Crisp Sear)</span>
              <span>500°F (Maximum Char)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5 p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-300">Crispy Caramelized Sear</span>
                <span className="font-bold" style={{ color: "__PRIMARY__" }}>{crustPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ width: `${crustPercent}%`, backgroundColor: "__PRIMARY__" }}
                />
              </div>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-black/40 border border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-300">Flavor &amp; Juice Retention</span>
                <span className="font-bold" style={{ color: "__PRIMARY__" }}>
                  {tempValue >= 440 ? "98% (Sealed In)" : "75% (Slow Cook)"}
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ width: `${tempValue >= 440 ? 98 : 75}%`, backgroundColor: "__PRIMARY__" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"""

restaurant_locations_template = """"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const outposts = __OUTPOSTS_JSON__;

export default function RestaurantLocations() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentLoc = outposts[selectedLocation] || outposts[0];
  const allImages = currentLoc ? [currentLoc.heroImage, ...(currentLoc.gallery || [])] : [];

  return (
    <section
      id="locations-section"
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest uppercase block font-bold" style={{ color: "__PRIMARY__" }}>
              __SHORT_NAME__ // PHYSICAL OUTPOSTS
            </span>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              __CITY__ KITCHENS
            </h2>
          </div>

          {outposts.length > 1 && (
            <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10">
              {outposts.map((loc: any, idx: number) => (
                <button
                  key={loc.id || idx}
                  onClick={() => {
                    setSelectedLocation(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all font-bold ${
                    selectedLocation === idx
                      ? "shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: selectedLocation === idx ? "__PRIMARY__" : undefined,
                    color: selectedLocation === idx ? "__TEXT_ON_PRIMARY__" : undefined,
                  }}
                >
                  {loc.name.split(" ")[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {currentLoc && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 relative min-h-[420px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedLocation}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={allImages[activeImageIndex] || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"}
                    alt={currentLoc.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-6 left-6 z-10">
                <span
                  className="px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
                  style={{
                    backgroundColor: "__PRIMARY__",
                    color: "__TEXT_ON_PRIMARY__",
                  }}
                >
                  {currentLoc.badge || "FEATURED OUTPOST"}
                </span>
              </div>

              {allImages.length > 1 && (
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {allImages.map((img: string, iIdx: number) => (
                      <button
                        key={iIdx}
                        onClick={() => setActiveImageIndex(iIdx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shadow ${
                          activeImageIndex === iIdx
                            ? "scale-110"
                            : "border-white/30 opacity-70 hover:opacity-100"
                        }`}
                        style={{
                          borderColor: activeImageIndex === iIdx ? "__PRIMARY__" : undefined,
                        }}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>

                  <span className="font-mono text-xs text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    View {activeImageIndex + 1} of {allImages.length}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 flex flex-col justify-between shadow-2xl space-y-6">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold block" style={{ color: "__PRIMARY__" }}>
                    OUTPOST DETAILS
                  </span>
                  <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold">
                    {currentLoc.name}
                  </h3>
                  <p className="font-mono text-xs text-stone-300">
                    {currentLoc.address}
                  </p>
                  <p className="font-mono text-xs font-bold" style={{ color: "__PRIMARY__" }}>
                    {currentLoc.city}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <span className="font-mono text-xs text-white font-bold block">
                      {currentLoc.status || "Kitchen Active"}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      Hours: {currentLoc.hours}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-stone-300 pt-2 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Atmosphere:</span>
                    <span className="text-white font-bold">{currentLoc.seating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Direct Line:</span>
                    <span className="font-bold" style={{ color: "__PRIMARY__" }}>{currentLoc.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a
                  href={currentLoc.mapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-3 rounded-lg font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-xl"
                  style={{
                    backgroundColor: "__PRIMARY__",
                    color: "__TEXT_ON_PRIMARY__",
                  }}
                >
                  Directions ↗
                </a>
                <a
                  href={`tel:${String(currentLoc.phone || "").replace(/\\D/g, "")}`}
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
"""

reservation_cta_template = """"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const timeSlots = [
  { time: "12:30 PM", status: "Available" },
  { time: "1:45 PM", status: "Few Tables" },
  { time: "7:00 PM", status: "Peak Dinner" },
  { time: "8:30 PM", status: "Filling Fast" },
  { time: "9:45 PM", status: "Available" },
  { time: "11:00 PM", status: "Late Night" },
];

const seatingZones = [
  { id: "counter", name: "Chef's Sizzle Counter", note: "Front-row sizzling view" },
  { id: "booth", name: "Cozy Dining Booth", note: "Spacious group seating" },
  { id: "patio", name: "Open-Air Patio Deck", note: "Outdoor dining" },
];

export default function ReservationCTA() {
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedZone, setSelectedZone] = useState("counter");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <section
      id="reservation-section"
      className="py-28 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="font-mono text-xs tracking-widest uppercase font-bold block" style={{ color: "__PRIMARY__" }}>
            __SHORT_NAME__ // TABLE RESERVATIONS
          </span>
          <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
          <p className="text-stone-300 text-sm max-w-xl mx-auto font-body">
            Reserve front-row seats for fresh sizzling craft dining in __CITY__.
          </p>
        </div>

        {confirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl bg-white/[0.06] backdrop-blur-xl border-2 max-w-xl mx-auto shadow-2xl space-y-6 text-center"
            style={{ borderColor: "__PRIMARY__" }}
          >
            <div
              className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto text-2xl"
              style={{
                backgroundColor: "__PRIMARY__20",
                borderColor: "__PRIMARY__",
                color: "__PRIMARY__",
              }}
            >
              ✓
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "__PRIMARY__" }}>
                RESERVATION CONFIRMED // VIP PASS
              </span>
              <h3 className="type-display text-3xl font-extrabold text-white">
                SEE YOU SOON, {name.toUpperCase()}!
              </h3>
              <p className="font-mono text-xs text-stone-300">
                Booking Reference: <span className="font-bold" style={{ color: "__PRIMARY__" }}>{bookingRef}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-left font-mono text-xs space-y-2 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Timing:</span>
                <span className="text-white font-bold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guests:</span>
                <span className="text-white font-bold">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Seating Zone:</span>
                <span className="font-bold" style={{ color: "__PRIMARY__" }}>
                  {seatingZones.find((z) => z.id === selectedZone)?.name}
                </span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(false)}
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-colors"
            >
              Modify Reservation
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleBook}
            className="p-8 sm:p-10 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 shadow-2xl space-y-8"
          >
            <div className="space-y-3">
              <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                1. Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "font-black shadow-md"
                          : "bg-white/5 border-white/10 text-stone-300 hover:border-white/20"
                      }`}
                      style={{
                        backgroundColor: isSelected ? "__PRIMARY__" : undefined,
                        color: isSelected ? "__TEXT_ON_PRIMARY__" : undefined,
                        borderColor: isSelected ? "__PRIMARY__" : undefined,
                      }}
                    >
                      <span className="font-mono text-xs block">{slot.time}</span>
                      <span className={`text-[9px] font-mono block ${isSelected ? "opacity-90" : "text-stone-400"}`}>
                        {slot.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  2. Party Size
                </label>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 justify-between">
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-lg font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center font-mono">
                    <span className="text-2xl font-bold" style={{ color: "__PRIMARY__" }}>{guestCount}</span>
                    <span className="text-xs text-stone-400 block">
                      {guestCount === 1 ? "Solo Diner" : `${guestCount} Guests`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.min(12, g + 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-lg font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold block">
                  3. Preferred Seating Zone
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none transition-colors"
                >
                  {seatingZones.map((z) => (
                    <option key={z.id} value={z.id} className="bg-[#0e0e12] text-white">
                      {z.name} — {z.note}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-stone-400 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-98 transition-all shadow-2xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: "__PRIMARY__",
                color: "__TEXT_ON_PRIMARY__",
              }}
            >
              <span>Confirm Table Reservation</span>
              <span>→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
"""

import json

for slug, cfg in brand_configs.items():
    p_path = os.path.join('projects', slug)
    if not os.path.exists(p_path):
        continue

    # 1. InteractiveBackground.tsx
    bg_c = interactive_bg_template.replace('__PRIMARY__', cfg['primary']).replace('__THEME_BASE__', cfg['theme_base'])
    with open(os.path.join(p_path, 'components', 'ui', 'InteractiveBackground.tsx'), 'w') as f:
        f.write(bg_c)

    # 2. SignatureMenu.tsx
    menu_c = signature_menu_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__SHORT_NAME__', cfg['short_name']).replace('__CURRENCY__', cfg['currency'])
    with open(os.path.join(p_path, 'components', 'marketing', 'SignatureMenu.tsx'), 'w') as f:
        f.write(menu_c)

    # 3. HowWeSmash.tsx
    how_c = how_we_smash_template.replace('__PRIMARY__', cfg['primary']).replace('__SHORT_NAME__', cfg['short_name'])
    with open(os.path.join(p_path, 'components', 'marketing', 'HowWeSmash.tsx'), 'w') as f:
        f.write(how_c)

    # 4. RestaurantLocations.tsx
    outposts_json = json.dumps(cfg['outposts'])
    loc_c = restaurant_locations_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__SHORT_NAME__', cfg['short_name']).replace('__CITY__', cfg['city'].upper()).replace('__OUTPOSTS_JSON__', outposts_json)
    with open(os.path.join(p_path, 'components', 'marketing', 'RestaurantLocations.tsx'), 'w') as f:
        f.write(loc_c)

    # 5. ReservationCTA.tsx
    res_c = reservation_cta_template.replace('__PRIMARY__', cfg['primary']).replace('__TEXT_ON_PRIMARY__', cfg['text_on_primary']).replace('__SHORT_NAME__', cfg['short_name']).replace('__CITY__', cfg['city'])
    with open(os.path.join(p_path, 'components', 'marketing', 'ReservationCTA.tsx'), 'w') as f:
        f.write(res_c)

    # 6. app/reservations/page.tsx
    os.makedirs(os.path.join(p_path, 'app', 'reservations'), exist_ok=True)
    with open(os.path.join(p_path, 'app', 'reservations', 'page.tsx'), 'w') as f:
        f.write(f'''"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import ReservationCTA from "@/components/marketing/ReservationCTA";

export default function ReservationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        <section className="py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{cfg['primary']}" }}}}>
              {cfg['short_name']} // VIP TABLE RESERVATIONS
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              RESERVE YOUR TABLE
            </h1>
            <p className="font-mono text-xs text-stone-300 max-w-xl">
              Secure front-row seating and craft dining in {cfg['city']}.
            </p>
          </div>
        </section>

        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}}
''')

    # 7. app/locations/page.tsx
    os.makedirs(os.path.join(p_path, 'app', 'locations'), exist_ok=True)
    with open(os.path.join(p_path, 'app', 'locations', 'page.tsx'), 'w') as f:
        f.write(f'''"use client";

import Nav from "@/components/marketing/Nav";
import Footer from "@/components/marketing/Footer";
import RestaurantLocations from "@/components/marketing/RestaurantLocations";

export default function LocationsPage() {{
  return (
    <>
      <Nav />
      <main className="pt-24 min-h-screen bg-transparent text-[#FAF8F2] relative z-10">
        <section className="py-20 bg-transparent text-white border-b border-white/10 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest font-bold block" style={{{{ color: "{cfg['primary']}" }}}}>
              {cfg['short_name']} // PHYSICAL OUTPOSTS
            </span>
            <h1 className="type-display text-5xl md:text-7xl font-extrabold text-white">
              OUR OUTPOSTS
            </h1>
            <p className="font-mono text-xs text-stone-300 max-w-xl">
              Find our physical kitchen spaces in {cfg['city']}.
            </p>
          </div>
        </section>

        <RestaurantLocations />
      </main>
      <Footer />
    </>
  );
}}
''')

    print(f"✓ Rolled out interactive doodles & components to {slug}")

print("\n🎉 Master rollout of interactive motion doodles & rich sections completed across all 24 projects!")
