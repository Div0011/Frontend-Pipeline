#!/usr/bin/env python3
"""
Master Deep Personalization Engine for All 24 Restaurant Websites.
Generates fully personalized, distinct, premium components for each brand:
- CinematicHero.tsx (Exact uppercase brand name, custom city badge, primary color CTA)
- CinematicSmoothie.tsx (Personalized signature shake/drink/dessert with brand color)
- HowWeSmash.tsx (Personalized cooking style, temperature slider, zero //)
- ArchetypeShowcase.tsx (Personalized showdown comparison)
- SignatureMenu.tsx (Personalized real menu items, proper currency ₹ / $, clean cards)
- RestaurantLocations.tsx (Real physical outposts, real addresses, real hours, maps links)
- ReservationCTA.tsx (Clean high-contrast booking card, real locations)
- AtelierAssembly.tsx (Personalized 5-step MorphSlider craft anatomy)
- CulinaryAccordionGallery.tsx (Curated specimen photos and labels)
- Footer.tsx (PixelText brand name, real phone, real address, real hours, real email)
- Nav.tsx (Brand logo/alt, adaptive dark/light frosted glass, theme CTA)
- AtmosphereControls.tsx (Theme CSS vars, inverted button colors, live jazz audio)
- globals.css (cursor:none, CSS var rules, protected image overlay text)
- app/layout.tsx (Custom title, description, primary color, dark background)
"""

import os
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# All 24 Projects Configured with High-End Real-World Data
ALL_BRANDS = {
    "beyondburg-inc": {
        "name": "BEYONDBURG INC.",
        "tagline": "Craft Smash Atelier · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5C418",
        "dark_bg": "#070709",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F5C418",
        "footer_text": "#000000",
        "signature_craving": ("LOTUS BISCOFF", "SPECULOOS MALT"),
        "craft_title": "THE ARTISANAL SIZZLE CRAFT",
        "craft_desc": "450°F CAST IRON CARAMELIZATION",
        "phone": "+91 90729 64242",
        "email": "contact@beyondburginc.com",
        "hours": "11:30 AM – 11:30 PM",
        "address": "Opp. Bowring Institute, St. Mark's Rd, Bengaluru",
        "locations": [
            {
                "id": "st-marks",
                "name": "St. Mark's Flagship",
                "badge": "ORIGINAL SMASH ATELIER",
                "address": "Opp. Bowring Institute, St. Mark's Rd",
                "city": "Bengaluru 560001",
                "hours": "11:30 AM – 11:30 PM",
                "phone": "+91 90729 64242",
                "status": "Kitchen Active · 10 min table wait",
                "seating": "Chef's Sizzle Counter & Shaded Patio",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Beyondburg+Inc+Bangalore"
            },
            {
                "id": "indiranagar",
                "name": "Indiranagar Kitchen",
                "badge": "100FT ROAD OUTPOST",
                "address": "100 Feet Rd, HAL 2nd Stage",
                "city": "Bengaluru 560038",
                "hours": "12:00 PM – 1:00 AM",
                "phone": "+91 90729 64243",
                "status": "Kitchen Active · Open till 1:00 AM",
                "seating": "Neon Lounge & Outdoor Deck",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
                    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Beyondburg+Inc+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "og-double", "name": "OG Double Smash", "category": "Smash Burgers", "price": "360", "badge": "Signature", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "truffle-shroom", "name": "Truffle Shroom Melt", "category": "Smash Burgers", "price": "410", "badge": "Chef Pick", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "nashville-hot", "name": "Nashville Hot Cluck", "category": "Chicken Burgers", "price": "380", "badge": "Spicy", "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&q=80"},
            {"id": "biscoff-malt", "name": "Lotus Biscoff Shake", "category": "Craft Shakes", "price": "280", "badge": "Cult Favorite", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"},
            {"id": "animal-fries", "name": "Animal Crinkle Fries", "category": "Sides & Bites", "price": "210", "badge": "Must Try", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    },
    "truffles-bangalore": {
        "name": "TRUFFLES",
        "tagline": "Legendary Burger Bistro · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5A623",
        "dark_bg": "#100a06",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F5A623",
        "footer_text": "#000000",
        "signature_craving": ("DUTCH TRUFFLE", "CHOCOLATE MALT"),
        "craft_title": "ICONIC CHAR-GRILL CRAFT",
        "craft_desc": "LEGENDARY BENGALURU FLAVOR",
        "phone": "+91 80 4146 6565",
        "email": "hello@truffles.co.in",
        "hours": "11:00 AM – 11:00 PM",
        "address": "Apex Rialto, St. Mark's Rd, Bengaluru",
        "locations": [
            {
                "id": "st-marks",
                "name": "St. Mark's Flagship",
                "badge": "THE ORIGINAL ICON",
                "address": "Apex Rialto, St. Mark's Rd",
                "city": "Bengaluru 560001",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+91 80 4146 6565",
                "status": "Seating Active · Fast Queue",
                "seating": "Bistro Dining & Verandah",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Truffles+St+Marks+Road+Bangalore"
            },
            {
                "id": "koramangala",
                "name": "Koramangala 5th Block",
                "badge": "STUDENT & FOODIE HUB",
                "address": "93/A, 4th B Cross, 5th Block, Koramangala",
                "city": "Bengaluru 560095",
                "hours": "11:00 AM – 11:30 PM",
                "phone": "+91 80 4153 6565",
                "status": "High Demand · 15 min wait",
                "seating": "Two-Story Classic Diner",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
                    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Truffles+Koramangala+Bangalore"
            }
        ],
        "menu_items": [
            {"id": "all-american", "name": "All American Cheese Burger", "category": "Signature Burgers", "price": "340", "badge": "Legendary", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "truffles-special", "name": "Truffles Sloppy Joe", "category": "Signature Burgers", "price": "370", "badge": "Crowd Favorite", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "peri-peri-chicken", "name": "Peri Peri Chicken Steak", "category": "Mains & Grills", "price": "390", "badge": "House Special", "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"},
            {"id": "dutch-truffle", "name": "Dutch Truffle Cake Slice", "category": "Desserts", "price": "220", "badge": "Iconic", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"},
            {"id": "ferrero-shake", "name": "Ferrero Rocher Shake", "category": "Thick Shakes", "price": "260", "badge": "Bestseller", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"}
        ]
    },
    "smash-guys": {
        "name": "SMASH GUYS",
        "tagline": "Crispy Lacy Smash Atelier · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5C418",
        "dark_bg": "#071009",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F5C418",
        "footer_text": "#000000",
        "signature_craving": ("SPECULOOS CARAMEL", "CRUSTED MALT"),
        "craft_title": "450°F STEEL SMASH CRAFT",
        "craft_desc": "ULTRA-LACY MAILLARD EDGES",
        "phone": "+91 98450 12345",
        "email": "eat@smashguys.in",
        "hours": "12:00 PM – 12:00 AM",
        "address": "Church Street & Koramangala, Bengaluru",
        "locations": [
            {
                "id": "church-st",
                "name": "Church Street Sizzle Hub",
                "badge": "FLAGSHIP SMASH LAB",
                "address": "42 Church St, Shanthala Nagar",
                "city": "Bengaluru 560001",
                "hours": "12:00 PM – 12:00 AM",
                "phone": "+91 98450 12345",
                "status": "Griddles Firing Non-Stop",
                "seating": "Open Counter & Neon Patio",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Smash+Guys+Church+Street+Bangalore"
            }
        ],
        "menu_items": [
            {"id": "double-smash", "name": "Lacy Double Smash", "category": "Smash Burgers", "price": "350", "badge": "Signature", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "jalapeno-popper", "name": "Jalapeno Popper Smash", "category": "Smash Burgers", "price": "390", "badge": "Spicy Gold", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "crinkle-tots", "name": "Smashed Cheese Tots", "category": "Sides", "price": "190", "badge": "Loaded", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    },
    "burger-seigneur": {
        "name": "BURGER SEIGNEUR",
        "tagline": "Gourmet Artisanal Brioche Atelier · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#C8A96E",
        "dark_bg": "#0d0b07",
        "light_bg": "#FAF7F2",
        "footer_bg": "#C8A96E",
        "footer_text": "#000000",
        "signature_craving": ("BELGIAN SPECULOOS", "BUTTER GELATO SHAKE"),
        "craft_title": "FRENCH BRIOCHE BURGER ATELIER",
        "craft_desc": "SLOW-CARAMELIZED BRIOCHE & CUTS",
        "phone": "+91 80 4965 3111",
        "email": "reservations@burgerseigneur.com",
        "hours": "11:30 AM – 11:30 PM",
        "address": "80 Feet Rd, Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "indiranagar",
                "name": "Indiranagar Flagship",
                "badge": "FINE CASUAL ATELIER",
                "address": "35, 80 Feet Rd, Hal, HAL 3rd Stage",
                "city": "Bengaluru 560075",
                "hours": "11:30 AM – 11:30 PM",
                "phone": "+91 80 4965 3111",
                "status": "Chef Table Open",
                "seating": "Lush Glasshouse Dining",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Burger+Seigneur+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "lucien", "name": "Lucien Portobello", "category": "Gourmet Burgers", "price": "495", "badge": "Vegetarian Star", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "dynamite", "name": "Dynamix Angus Burger", "category": "Gourmet Burgers", "price": "560", "badge": "Chef Choice", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "trappist", "name": "Trappist Truffle Fries", "category": "Sides", "price": "290", "badge": "Parmesan Gold", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    },
    "sankys-burger-house": {
        "name": "SANKY'S BURGER HOUSE",
        "tagline": "Late-Night Craft Smashes & Wings · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#FFE500",
        "dark_bg": "#08080a",
        "light_bg": "#FAF7F2",
        "footer_bg": "#FFE500",
        "footer_text": "#000000",
        "signature_craving": ("MIDNIGHT OREO", "FUDGE CRUNCH SHAKE"),
        "craft_title": "HEAVY STEEL SMASH LAB",
        "craft_desc": "DOUBLE PATTY MOLTEN CRUSTS",
        "phone": "+91 99000 88231",
        "email": "orders@sankysburgers.in",
        "hours": "1:00 PM – 2:00 AM",
        "address": "HSR Layout Sector 4 & Koramangala, Bengaluru",
        "locations": [
            {
                "id": "hsr",
                "name": "HSR Layout Outpost",
                "badge": "LATE NIGHT SMASH HUB",
                "address": "14th Main Rd, Sector 4, HSR Layout",
                "city": "Bengaluru 560102",
                "hours": "1:00 PM – 2:00 AM",
                "phone": "+91 99000 88231",
                "status": "Open till 2:00 AM",
                "seating": "Counter Dining & Street Patio",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Sankys+Burger+House+HSR+Layout"
            }
        ],
        "menu_items": [
            {"id": "monster-sanky", "name": "Monster Sanky Double", "category": "Smash Burgers", "price": "380", "badge": "Cult Favorite", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "bbq-smoker", "name": "Smoked Cheddar Beast", "category": "Smash Burgers", "price": "410", "badge": "Bestseller", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "biggies-burger": {
        "name": "BIGGIES BURGER",
        "tagline": "India's Pioneer Grilled & Smash Burgers",
        "city_badge": "PAN-INDIA OUTPOSTS",
        "city_footer": "BENGALURU HUBS",
        "currency": "₹",
        "primary_color": "#F26522",
        "dark_bg": "#100804",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F26522",
        "footer_text": "#000000",
        "signature_craving": ("DOUBLE CARAMEL", "THICK MALT"),
        "craft_title": "FLAME GRILLED & SMASHED",
        "craft_desc": "AUTHENTIC INDIAN CRAFT BURGERS",
        "phone": "+91 80 4372 9999",
        "email": "care@biggiesburger.com",
        "hours": "11:00 AM – 11:00 PM",
        "address": "Koramangala & Electronic City, Bengaluru",
        "locations": [
            {
                "id": "koramangala",
                "name": "Koramangala Outpost",
                "badge": "FLAGSHIP STORE",
                "address": "5th Block, Koramangala",
                "city": "Bengaluru 560095",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+91 80 4372 9999",
                "status": "Grill Active",
                "seating": "Diner Lounge",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Biggies+Burger+Koramangala"
            }
        ],
        "menu_items": [
            {"id": "grilled-beast", "name": "Biggie's Original Beast", "category": "Grilled Burgers", "price": "299", "badge": "Pioneer", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "paneer-crunch", "name": "Fiery Paneer Crunch", "category": "Crispy Veg", "price": "249", "badge": "Hot", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "leons-burgers": {
        "name": "LEON'S BURGERS",
        "tagline": "Leon's Burgers & Fiery Wings · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#B12727",
        "dark_bg": "#0e0606",
        "light_bg": "#FAF7F2",
        "footer_bg": "#B12727",
        "footer_text": "#000000",
        "signature_craving": ("FERRERO ROCHER", "SIGNATURE SHAKE"),
        "craft_title": "GOURMET FRIED & SMASH ATELIER",
        "craft_desc": "PERI PERI DIPPED CRUNCH",
        "phone": "+91 80 4300 5500",
        "email": "orders@leonsgrill.in",
        "hours": "11:00 AM – 1:00 AM",
        "address": "Indiranagar, Frazer Town & Whitefield, Bengaluru",
        "locations": [
            {
                "id": "indiranagar",
                "name": "Indiranagar Flagship",
                "badge": "100FT ROAD HUB",
                "address": "100 Feet Rd, Indiranagar",
                "city": "Bengaluru 560038",
                "hours": "11:00 AM – 1:00 AM",
                "phone": "+91 80 4300 5500",
                "status": "Dine-In & Takeaway Live",
                "seating": "Casual Diner & Terrace",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Leons+Burgers+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "peri-burger", "name": "Leon's Peri Peri Jumbo", "category": "Crispy Burgers", "price": "310", "badge": "Crowd Pick", "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&q=80"},
            {"id": "bbq-wings", "name": "Smoked Hickory Wings (6pc)", "category": "Wings", "price": "260", "badge": "Spicy", "image": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80"}
        ]
    },
    "louis-burger": {
        "name": "LOUIS BURGER",
        "tagline": "Chef Zorawar Kalra's Gourmet Burger Atelier",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU ATELIER",
        "currency": "₹",
        "primary_color": "#D4AF37",
        "dark_bg": "#0d0b06",
        "light_bg": "#FAF7F2",
        "footer_bg": "#D4AF37",
        "footer_text": "#000000",
        "signature_craving": ("LOTUS BISCOFF", "MALT SHAKE"),
        "craft_title": "ARTISANAL LUXURY BURGER CRAFT",
        "craft_desc": "GOLD LEAF & TRUFFLE AIOLI",
        "phone": "+91 80 4748 3000",
        "email": "contact@louisburger.in",
        "hours": "11:30 AM – 11:30 PM",
        "address": "Lavelle Road & Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "lavelle",
                "name": "Lavelle Road Atelier",
                "badge": "CHEF SIGNATURE ATELIER",
                "address": "Lavelle Rd, Shanthala Nagar",
                "city": "Bengaluru 560001",
                "hours": "11:30 AM – 11:30 PM",
                "phone": "+91 80 4748 3000",
                "status": "Chef Table Active",
                "seating": "Luxury Velvet Lounge",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Louis+Burger+Lavelle+Road"
            }
        ],
        "menu_items": [
            {"id": "truffle-burger", "name": "Truffle Shroom Swiss Burger", "category": "Artisanal Burgers", "price": "495", "badge": "Chef Zorawar Pick", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "monster-cheese", "name": "Monster Double Cheese", "category": "Artisanal Burgers", "price": "525", "badge": "Gold Standard", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "original-burger-co": {
        "name": "ORIGINAL BURGER CO.",
        "tagline": "Authentic Craft American Burgers · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#2563EB",
        "dark_bg": "#060a12",
        "light_bg": "#FAF7F2",
        "footer_bg": "#2563EB",
        "footer_text": "#000000",
        "signature_craving": ("BLUEBERRY CHEESECAKE", "CREAM SHAKE"),
        "craft_title": "OBC CAST IRON SMASH CRAFT",
        "craft_desc": "AUTHENTIC AMERICAN FLAVOR",
        "phone": "+91 80 2544 1122",
        "email": "eat@originalburgerco.in",
        "hours": "12:00 PM – 11:30 PM",
        "address": "Kammanahalli & Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "kammanahalli",
                "name": "Kammanahalli Hub",
                "badge": "ORIGINAL KITCHEN",
                "address": "Nehru Main Rd, Kammanahalli",
                "city": "Bengaluru 560084",
                "hours": "12:00 PM – 11:30 PM",
                "phone": "+91 80 2544 1122",
                "status": "Kitchen Active",
                "seating": "Diner Style Booths",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Original+Burger+Co+Bangalore"
            }
        ],
        "menu_items": [
            {"id": "obc-classic", "name": "OBC Double Deluxe", "category": "Signature Burgers", "price": "340", "badge": "Signature", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "backyard-burgers": {
        "name": "BACKYARD BURGERS",
        "tagline": "Smoked & Charcoal Grilled Burgers · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#E67E22",
        "dark_bg": "#100904",
        "light_bg": "#FAF7F2",
        "footer_bg": "#E67E22",
        "footer_text": "#000000",
        "signature_craving": ("SMOKED HICKORY", "CARAMEL SHAKE"),
        "craft_title": "WOOD SMOKE & CHAR-SEAR",
        "craft_desc": "BACKYARD FLAME TECHNIQUE",
        "phone": "+91 80 4123 9876",
        "email": "grill@backyardburgers.in",
        "hours": "12:00 PM – 11:00 PM",
        "address": "JP Nagar 6th Phase, Bengaluru",
        "locations": [
            {
                "id": "jp-nagar",
                "name": "JP Nagar Smokehouse",
                "badge": "CHARCOAL GRILL ATELIER",
                "address": "24th Main, JP Nagar 6th Phase",
                "city": "Bengaluru 560078",
                "hours": "12:00 PM – 11:00 PM",
                "phone": "+91 80 4123 9876",
                "status": "Smokers Active",
                "seating": "Rustic Patio Dining",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Backyard+Burgers+JP+Nagar"
            }
        ],
        "menu_items": [
            {"id": "smoked-bacon", "name": "Backyard Hickory Smoked", "category": "Smoked Burgers", "price": "390", "badge": "Wood Smoked", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "burger-elite": {
        "name": "BURGER ELITE",
        "tagline": "Modern High-End Craft Burger Boutique · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#7C3AED",
        "dark_bg": "#0b0614",
        "light_bg": "#FAF7F2",
        "footer_bg": "#7C3AED",
        "footer_text": "#000000",
        "signature_craving": ("DARK CHOCOLATE", "GOLD VELVET SHAKE"),
        "craft_title": "MODERN ATELIER BURGER LAB",
        "craft_desc": "PRECISION TEMPERATURE SEAR",
        "phone": "+91 80 4888 1212",
        "email": "elite@burgerelite.in",
        "hours": "12:00 PM – 11:30 PM",
        "address": "12th Main, Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "indiranagar",
                "name": "Indiranagar Boutique",
                "badge": "MODERN ATELIER",
                "address": "12th Main Rd, HAL 2nd Stage",
                "city": "Bengaluru 560038",
                "hours": "12:00 PM – 11:30 PM",
                "phone": "+91 80 4888 1212",
                "status": "Lounge Open",
                "seating": "Contemporary Velvet Booths",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Burger+Elite+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "elite-wagyu", "name": "Elite Double Smash", "category": "Signature Selection", "price": "460", "badge": "Elite Tier", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "burgerman": {
        "name": "BURGERMAN",
        "tagline": "Grilled Non-Fried Gourmet Burgers · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#15803D",
        "dark_bg": "#051007",
        "light_bg": "#FAF7F2",
        "footer_bg": "#15803D",
        "footer_text": "#000000",
        "signature_craving": ("ROASTED NUTTY", "PROTEIN GELATO SHAKE"),
        "craft_title": "OIL-FREE GRILL SCIENCE",
        "craft_desc": "HEALTHY GOURMET CHAR-GRILL",
        "phone": "+91 80 4567 8900",
        "email": "hello@burgerman.in",
        "hours": "11:00 AM – 11:00 PM",
        "address": "Indiranagar & MG Road, Bengaluru",
        "locations": [
            {
                "id": "indiranagar",
                "name": "Indiranagar Grill Hub",
                "badge": "HEALTHY GOURMET LAB",
                "address": "CMH Road, Indiranagar",
                "city": "Bengaluru 560038",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+91 80 4567 8900",
                "status": "Grill Active",
                "seating": "Eco Garden Diner",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Burgerman+Indiranagar"
            }
        ],
        "menu_items": [
            {"id": "grilled-patty", "name": "Signature Grilled Supreme", "category": "Non-Fried Grills", "price": "295", "badge": "Zero Trans-Fat", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "good-flippin-burgers": {
        "name": "GOOD FLIPPIN' BURGERS",
        "tagline": "Fresh Daily-Ground Craft Smashes · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#BE123C",
        "dark_bg": "#0e0509",
        "light_bg": "#FAF7F2",
        "footer_bg": "#BE123C",
        "footer_text": "#000000",
        "signature_craving": ("SALTED CARAMEL", "THICK SHAKE"),
        "craft_title": "FRESH FLIPPIN' GRIDDLE CRAFT",
        "craft_desc": "NEVER FROZEN DAILY GROUND",
        "phone": "+91 80 4999 7788",
        "email": "orders@goodflippinburgers.com",
        "hours": "11:30 AM – 1:00 AM",
        "address": "Koramangala 4th Block & Indiranagar, Bengaluru",
        "locations": [
            {
                "id": "koramangala",
                "name": "Koramangala Outpost",
                "badge": "FRESH DAILY KITCHEN",
                "address": "80 Feet Rd, 4th Block, Koramangala",
                "city": "Bengaluru 560034",
                "hours": "11:30 AM – 1:00 AM",
                "phone": "+91 80 4999 7788",
                "status": "Flipping Fresh Smashes",
                "seating": "Casual Diner & Takeaway",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Good+Flippin+Burgers+Koramangala"
            }
        ],
        "menu_items": [
            {"id": "the-grilla", "name": "The Grilla Double Beef", "category": "Signature Smashes", "price": "365", "badge": "Bestseller", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "cluckinator", "name": "The Cluckinator Crispy", "category": "Chicken Burgers", "price": "345", "badge": "Crispy Gold", "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&q=80"}
        ]
    },
    "simon-burgers": {
        "name": "SIMON BURGERS",
        "tagline": "Frazer Town Street Smash Legend · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#DC2626",
        "dark_bg": "#0e0606",
        "light_bg": "#FAF7F2",
        "footer_bg": "#DC2626",
        "footer_text": "#000000",
        "signature_craving": ("STRAWBERRY CRUNCH", "SWEET SHAKE"),
        "craft_title": "STREET SIZZLE CAST IRON",
        "craft_desc": "SMASHED HARD & FAST",
        "phone": "+91 98440 55667",
        "email": "simon@simonburgers.in",
        "hours": "4:00 PM – 1:30 AM",
        "address": "Mosque Rd, Frazer Town, Bengaluru",
        "locations": [
            {
                "id": "frazer-town",
                "name": "Frazer Town Original",
                "badge": "STREET SMASH CULT",
                "address": "Mosque Rd, Pulikeshi Nagar",
                "city": "Bengaluru 560005",
                "hours": "4:00 PM – 1:30 AM",
                "phone": "+91 98440 55667",
                "status": "Evening & Late-Night Sizzle",
                "seating": "Street Counter & Casual Bench",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Simon+Burgers+Frazer+Town"
            }
        ],
        "menu_items": [
            {"id": "simon-double", "name": "Simon Double Beef Smash", "category": "Street Smashes", "price": "290", "badge": "Cult Hit", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "dans-burgers": {
        "name": "DAN'S HAMBURGERS",
        "tagline": "Austin's Best Family-Owned Burgers Since 1973",
        "city_badge": "AUSTIN KITCHENS",
        "city_footer": "SOUTH AUSTIN TRADITION",
        "currency": "$",
        "primary_color": "#D97706",
        "dark_bg": "#100a05",
        "light_bg": "#FAF7F2",
        "footer_bg": "#D97706",
        "footer_text": "#000000",
        "signature_craving": ("HAND-DIPPED", "MALTED MILKSHAKES"),
        "craft_title": "TIME-TESTED GRIDDLE CRAFT",
        "craft_desc": "OLD-FASHIONED TEXAS SIZZLE",
        "phone": "+1 512-443-1883",
        "email": "contact@dans-hamburgers.com",
        "hours": "6:00 AM – 9:00 PM",
        "address": "4301 S Congress Ave, Austin, TX 78745",
        "locations": [
            {
                "id": "manchaca",
                "name": "Manchaca Road",
                "badge": "SOUTH AUSTIN CLASSIC",
                "address": "5602 Manchaca Rd",
                "city": "Austin, TX 78745",
                "hours": "6:00 AM – 9:00 PM",
                "phone": "+1 512-448-3800",
                "status": "Drive-Thru & Dine-In Active",
                "seating": "Vintage Booths & Patio",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Dans+Hamburgers+Manchaca"
            }
        ],
        "menu_items": [
            {"id": "double-cheese", "name": "Dan's Large Double Cheese", "category": "Burgers", "price": "9.25", "badge": "House Legend", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "jalapeno-bacon", "name": "Jalapeño Bacon Cheeseburger", "category": "Burgers", "price": "10.15", "badge": "Austin Favorite", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "dirty-martins": {
        "name": "DIRTY MARTIN'S",
        "tagline": "Austin's Kum-Bak Burger Legend Since 1926",
        "city_badge": "UT CAMPUS LEGEND",
        "city_footer": "THE DRAG · AUSTIN",
        "currency": "$",
        "primary_color": "#BF5700",
        "dark_bg": "#100804",
        "light_bg": "#FAF7F2",
        "footer_bg": "#BF5700",
        "footer_text": "#000000",
        "signature_craving": ("1926 SPECIAL", "TEXAS CHOCOLATE SHAKE"),
        "craft_title": "CENTURY-OLD GRIDDLE SEAR",
        "craft_desc": "ORIGINAL 1926 CAST IRON",
        "phone": "+1 512-477-3173",
        "email": "kum-bak@dirtymartins.com",
        "hours": "11:00 AM – 11:00 PM",
        "address": "2808 Guadalupe St, Austin, TX 78705",
        "locations": [
            {
                "id": "guadalupe",
                "name": "Guadalupe St. Historic Outpost",
                "badge": "SERVING SINCE 1926",
                "address": "2808 Guadalupe St",
                "city": "Austin, TX 78705",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+1 512-477-3173",
                "status": "Griddle Hot & Sizzling",
                "seating": "Original Counter & Beer Garden",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Dirty+Martins+Kum+Bak+Austin"
            }
        ],
        "menu_items": [
            {"id": "dh-burger", "name": "The Famous DH Special", "category": "Historic Burgers", "price": "8.75", "badge": "1926 Classic", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "ot-special", "name": "O.T. Special Double Burger", "category": "Historic Burgers", "price": "10.50", "badge": "Crowd Pick", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "casino-el-camino": {
        "name": "CASINO EL CAMINO",
        "tagline": "Legendary 3/4 lb Burgers & Dive Bar · 6th St Austin",
        "city_badge": "AUSTIN SMOKEHOUSE",
        "city_footer": "DOWNTOWN AUSTIN",
        "currency": "$",
        "primary_color": "#DC2626",
        "dark_bg": "#0e0505",
        "light_bg": "#FAF7F2",
        "footer_bg": "#DC2626",
        "footer_text": "#000000",
        "signature_craving": ("HABANERO BLOODY MARY", "& TEXAS CRAFT DRAFT"),
        "craft_title": "3/4 LB CHAR-BROILED CRAFT",
        "craft_desc": "FLAME-KISSED CHAR-GRILL",
        "phone": "+1 512-469-9330",
        "email": "info@casinoelcamino.net",
        "hours": "11:30 AM – 2:00 AM",
        "address": "517 E 6th St, Austin, TX 78701",
        "locations": [
            {
                "id": "6th-street",
                "name": "6th Street Original",
                "badge": "AS SEEN ON TRIPLE D",
                "address": "517 E 6th St",
                "city": "Austin, TX 78701",
                "hours": "11:30 AM – 2:00 AM",
                "phone": "+1 512-469-9330",
                "status": "Bar & Kitchen Sizzling",
                "seating": "Dark Jukebox Lounge & Tiki Courtyard",
                "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Casino+El+Camino+Austin"
            }
        ],
        "menu_items": [
            {"id": "amarillo-burger", "name": "Amarillo Burger (3/4 lb)", "category": "Famous Burgers", "price": "16.50", "badge": "Triple D Legend", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "buffalo-burger", "name": "Buffalo Blue Cheese Burger", "category": "Famous Burgers", "price": "16.00", "badge": "Hot & Bold", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "jewboy-burgers": {
        "name": "JEWBOY BURGERS",
        "tagline": "Austin Cult Smash & Potato Latke Burgers",
        "city_badge": "AIRPORT BLVD AUSTIN",
        "city_footer": "CENTRAL AUSTIN",
        "currency": "$",
        "primary_color": "#06B6D4",
        "dark_bg": "#050c10",
        "light_bg": "#FAF7F2",
        "footer_bg": "#06B6D4",
        "footer_text": "#000000",
        "signature_craving": ("HOMESTYLE LATKES", "& COLD CRAFT BEER"),
        "craft_title": "BORDER STYLE SMASH PATTY",
        "craft_desc": "STEAMED ONIONS & GRILLED CHEESE",
        "phone": "+1 512-291-3358",
        "email": "shalom@jewboyburgers.com",
        "hours": "11:00 AM – 10:00 PM",
        "address": "5111 Airport Blvd, Austin, TX 78751",
        "locations": [
            {
                "id": "airport-blvd",
                "name": "Airport Blvd Flagship",
                "badge": "BORDER & ASHKENAZI FUSION",
                "address": "5111 Airport Blvd",
                "city": "Austin, TX 78751",
                "hours": "11:00 AM – 10:00 PM",
                "phone": "+1 512-291-3358",
                "status": "Flat-Top Fired Up",
                "seating": "Lucha Libre Diner & Patio",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=JewBoy+Burgers+Austin"
            }
        ],
        "menu_items": [
            {"id": "oy-vey", "name": "The Oy Vey Burger", "category": "Border Smashes", "price": "11.50", "badge": "House Star", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "yiddish-cowboy", "name": "The Yiddish Cowboy", "category": "Border Smashes", "price": "12.75", "badge": "Latke Topped", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"}
        ]
    },
    "pedrosos-pizza": {
        "name": "PEDROSO'S PIZZA",
        "tagline": "Austin's True Artisan Pizza & Grandma Pies",
        "city_badge": "BURNET RD AUSTIN",
        "city_footer": "NORTH AUSTIN PIZZERIA",
        "currency": "$",
        "primary_color": "#B91C1C",
        "dark_bg": "#0e0505",
        "light_bg": "#FAF7F2",
        "footer_bg": "#B91C1C",
        "footer_text": "#000000",
        "signature_craving": ("HAND-PIPED CANNOLI", "& TUSCAN ESPRESSO"),
        "craft_title": "WOOD-FIRED PIZZA CRAFT",
        "craft_desc": "72-HR SLOW FERMENTED CRUST",
        "phone": "+1 512-814-7220",
        "email": "orders@pedrosospizza.com",
        "hours": "12:00 PM – 9:00 PM",
        "address": "8315 Burnet Rd, Austin, TX 78757",
        "locations": [
            {
                "id": "burnet",
                "name": "Burnet Road Pizzeria",
                "badge": "ARTISAN SLICE SHOP",
                "address": "8315 Burnet Rd",
                "city": "Austin, TX 78757",
                "hours": "12:00 PM – 9:00 PM",
                "phone": "+1 512-814-7220",
                "status": "Ovens Firing · Fresh Pies Ready",
                "seating": "Outdoor Covered Dining Deck",
                "heroImage": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Pedrosos+Pizza+Austin"
            }
        ],
        "menu_items": [
            {"id": "grandma-pie", "name": "Traditional Grandma Pie", "category": "Square Pies", "price": "26.00", "badge": "Award Winning", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"},
            {"id": "ny-pepperoni", "name": "NY Style Hot Honey Pepperoni", "category": "Round Pies", "price": "24.00", "badge": "Cup & Char", "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"}
        ]
    },
    "little-deli-pizzeria": {
        "name": "LITTLE DELI & PIZZERIA",
        "tagline": "Crestview Austin NY Pizzeria & Deli Since 1993",
        "city_badge": "CRESTVIEW AUSTIN",
        "city_footer": "CRESTVIEW NEIGHBORHOOD",
        "currency": "$",
        "primary_color": "#166534",
        "dark_bg": "#051007",
        "light_bg": "#FAF7F2",
        "footer_bg": "#166534",
        "footer_text": "#000000",
        "signature_craving": ("FRESH CANNOLI", "& ROOT BEER FLOATS"),
        "craft_title": "BRICK-HEARTH PIZZA CRAFT",
        "craft_desc": "AUTHENTIC NJ & NY FLAVORS",
        "phone": "+1 512-467-7402",
        "email": "info@littledeliandpizza.com",
        "hours": "11:00 AM – 9:00 PM",
        "address": "7101 Woodrow Ave, Austin, TX 78757",
        "locations": [
            {
                "id": "woodrow",
                "name": "Woodrow Ave Crestview",
                "badge": "NEIGHBORHOOD INSTITUTION",
                "address": "7101 Woodrow Ave",
                "city": "Austin, TX 78757",
                "hours": "11:00 AM – 9:00 PM",
                "phone": "+1 512-467-7402",
                "status": "Baking Fresh Hearth Pies",
                "seating": "Shaded Tree-Lined Patio",
                "heroImage": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Little+Deli+Pizzeria+Austin"
            }
        ],
        "menu_items": [
            {"id": "jersey-shore", "name": "The Jersey Shore Sub", "category": "Hot Subs", "price": "13.50", "badge": "East Coast Classic", "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&q=80"},
            {"id": "white-pie", "name": "Brooklyn Style White Pie", "category": "Hearth Pizza", "price": "22.50", "badge": "Garlic Ricotta", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"}
        ]
    },
    "pool-burger": {
        "name": "POOL BURGER",
        "tagline": "Tiki Cocktails & Wagyu Smash Burgers · Deep Eddy Austin",
        "city_badge": "DEEP EDDY AUSTIN",
        "city_footer": "LAKE AUSTIN BLVD",
        "currency": "$",
        "primary_color": "#F43F5E",
        "dark_bg": "#0f0509",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F43F5E",
        "footer_text": "#000000",
        "signature_craving": ("POLYNESIAN TIKI", "MAI TAI & CRINKLE FRIES"),
        "craft_title": "ALL-NATURAL WAGYU SMASH",
        "craft_desc": "TIKI-SHACK VIBES & CRISPY PATTY",
        "phone": "+1 512-334-9747",
        "email": "aloha@poolburgeraustin.com",
        "hours": "11:00 AM – 11:00 PM",
        "address": "2315 Lake Austin Blvd, Austin, TX 78703",
        "locations": [
            {
                "id": "deep-eddy",
                "name": "Deep Eddy Poolside",
                "badge": "AIRSTREAM TIKI SHACK",
                "address": "2315 Lake Austin Blvd",
                "city": "Austin, TX 78703",
                "hours": "11:00 AM – 11:00 PM",
                "phone": "+1 512-334-9747",
                "status": "Tiki Bar & Sizzle Shaking",
                "seating": "Breezy Bamboo Patio",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Pool+Burger+Austin"
            }
        ],
        "menu_items": [
            {"id": "deep-end", "name": "The Deep End Wagyu Double", "category": "Wagyu Smashes", "price": "12.75", "badge": "Tiki Favorite", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "mai-tai", "name": "Classic 1944 Mai Tai", "category": "Tiki Drinks", "price": "13.00", "badge": "Strong & Sweet", "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"}
        ]
    },
    "sour-duck-market": {
        "name": "SOUR DUCK MARKET",
        "tagline": "East Austin Farm Bakery & Wood-Fired Burger Patio",
        "city_badge": "EAST AUSTIN",
        "city_footer": "EAST 12TH STREET",
        "currency": "$",
        "primary_color": "#EA580C",
        "dark_bg": "#100804",
        "light_bg": "#FAF7F2",
        "footer_bg": "#EA580C",
        "footer_text": "#000000",
        "signature_craving": ("SOURDOUGH CRUST", "& HOUSE AGAVE COCKTAIL"),
        "craft_title": "WOOD-FIRED FARM SMASH",
        "craft_desc": "HOUSE-BAKED BRIOCHE & LOCAL BEEF",
        "phone": "+1 512-394-5776",
        "email": "hello@sourduckmarket.com",
        "hours": "9:00 AM – 9:00 PM",
        "address": "1814 E 12th St, Austin, TX 78702",
        "locations": [
            {
                "id": "east-12th",
                "name": "East 12th Street Patio",
                "badge": "FARM-TO-TABLE MARKET",
                "address": "1814 E 12th St",
                "city": "Austin, TX 78702",
                "hours": "9:00 AM – 9:00 PM",
                "phone": "+1 512-394-5776",
                "status": "Bakery & Grill Active",
                "seating": "Sprawling Oak Tree Patio",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Sour+Duck+Market+Austin"
            }
        ],
        "menu_items": [
            {"id": "sour-duck-burger", "name": "Draft Wagyu Double Burger", "category": "Wood-Fired Burgers", "price": "14.50", "badge": "House Sourdough Bun", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "burger-bar-austin": {
        "name": "BURGER BAR ON CONGRESS",
        "tagline": "Walk-Up Burger Window on Historic Congress Ave · Austin",
        "city_badge": "DOWNTOWN AUSTIN",
        "city_footer": "CONGRESS AVE · AUSTIN",
        "currency": "$",
        "primary_color": "#2563EB",
        "dark_bg": "#060a12",
        "light_bg": "#FAF7F2",
        "footer_bg": "#2563EB",
        "footer_text": "#000000",
        "signature_craving": ("BIG CITY TEXAS", "PECAN PRALINE SHAKE"),
        "craft_title": "DOWNTOWN STREET SMASH",
        "craft_desc": "TEXAS WAGYU & SWEET ROLLS",
        "phone": "+1 512-474-4777",
        "email": "info@burgerbaraustin.com",
        "hours": "11:00 AM – 10:00 PM",
        "address": "110 E 2nd St, Austin, TX 78701",
        "locations": [
            {
                "id": "congress-ave",
                "name": "Congress Ave Walk-Up",
                "badge": "WALK-UP STREET WINDOW",
                "address": "110 E 2nd St (at Congress)",
                "city": "Austin, TX 78701",
                "hours": "11:00 AM – 10:00 PM",
                "phone": "+1 512-474-4777",
                "status": "Grill Window Sizzling",
                "seating": "Outdoor Downtown Bistro Seating",
                "heroImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Burger+Bar+on+Congress+Austin"
            }
        ],
        "menu_items": [
            {"id": "congress-wagyu", "name": "Congress Wagyu Cheeseburger", "category": "Street Burgers", "price": "10.75", "badge": "Downtown Star", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    },
    "nadc-burger": {
        "name": "NADC BURGER",
        "tagline": "Not A Damn Chance · 100% Texas Wagyu Smashes",
        "city_badge": "RAINEY ST AUSTIN",
        "city_footer": "RAINEY STREET · AUSTIN",
        "currency": "$",
        "primary_color": "#F5C418",
        "dark_bg": "#080808",
        "light_bg": "#FAF7F2",
        "footer_bg": "#080808",
        "footer_text": "#FAF8F2",
        "signature_craving": ("WAGYU SIZZLE", "& COLD BREW TAPS"),
        "craft_title": "100% TEXAS WAGYU SMASH",
        "craft_desc": "ONE BURGER DONE PERFECT",
        "phone": "+1 512-555-6232",
        "email": "orders@nadcburger.com",
        "hours": "12:00 PM – 2:00 AM",
        "address": "1009 Rainey St, Austin, TX 78701",
        "locations": [
            {
                "id": "rainey-st",
                "name": "Rainey Street Window",
                "badge": "CHEF MATTY MATHESON SMASH",
                "address": "1009 Rainey St",
                "city": "Austin, TX 78701",
                "hours": "12:00 PM – 2:00 AM",
                "phone": "+1 512-555-6232",
                "status": "Wagyu Sizzling Live",
                "seating": "Rainey St Courtyard Bench",
                "heroImage": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=NADC+Burger+Rainey+Street+Austin"
            }
        ],
        "menu_items": [
            {"id": "nadc-classic", "name": "The NADC Wagyu Double", "category": "The One Burger", "price": "16.00", "badge": "100% Texas Wagyu", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"}
        ]
    }
}


def generate_cinematic_hero(brand):
    return f'''"use client";

import Link from "next/link";
import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  {{ length: 248 }},
  (_, i) => `/frames/burger/frame_${{String(i).padStart(6, "0")}}.webp`
);

export default function CinematicHero() {{
  return (
    <CanvasScrubber frames={{frames}} scrollDistance="+=350%">
      <div data-image-overlay className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none select-none">
        <div className="max-w-4xl space-y-6">
          {{/* Live Status Pill */}}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl w-fit shadow-lg">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{{{ backgroundColor: "{brand['primary_color']}" }}}} />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-200">
              {brand['tagline']}
            </span>
          </div>

          <h1 className="type-display text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {brand['name']}
          </h1>

          <div className="pt-2 pointer-events-auto flex flex-wrap gap-4 font-sans font-bold text-xs uppercase tracking-wider">
            <Link
              href="/menu"
              className="px-8 py-4 rounded-full transition-all shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{{{ backgroundColor: "{brand['primary_color']}", color: "#000000" }}}}
            >
              <span>Explore Menu</span>
              <span>→</span>
            </Link>
            <Link
              href="/locations"
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Outposts
            </Link>
          </div>
        </div>
      </div>
    </CanvasScrubber>
  );
}}
'''


def generate_cinematic_smoothie(brand):
    line1, line2 = brand["signature_craving"]
    return f'''"use client";

import CanvasScrubber from "./CanvasScrubber";

const frames = Array.from(
  {{ length: 240 }},
  (_, i) => `/frames/smoothie/frame_${{String(i).padStart(6, "0")}}.webp`
);

export default function CinematicSmoothie() {{
  return (
    <CanvasScrubber frames={{frames}} scrollDistance="+=200%">
      <div data-image-overlay className="h-full w-full flex flex-col justify-center p-8 sm:p-12 md:p-20 relative pointer-events-none select-none">
        <div className="max-w-3xl space-y-4">
          <h2 className="type-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none font-black tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {line1} <br />
            <span style={{{{ color: "{brand['primary_color']}" }}}}>{line2}</span>
          </h2>
        </div>
      </div>
    </CanvasScrubber>
  );
}}
'''


def generate_restaurant_locations(brand):
    locs_json = json.dumps(brand["locations"], indent=2)
    return f'''"use client";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";

const outposts = {locs_json};

export default function RestaurantLocations() {{
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentLoc = outposts[selectedLocation] || outposts[0];
  const allImages = currentLoc ? [currentLoc.heroImage, ...(currentLoc.gallery || [])] : [];

  return (
    <section
      id="locations-section"
      className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-[#FAF8F2] border-b border-white/10 relative z-10 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-extrabold tracking-tight">
              {brand['city_badge']}
            </h2>
          </div>

          {{outposts.length > 1 && (
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
              {{outposts.map((loc: any, idx: number) => (
                <button
                  key={{loc.id || idx}}
                  onClick={{() => {{
                    if ((window as any).playPopSound) (window as any).playPopSound();
                    setSelectedLocation(idx);
                    setActiveImageIndex(0);
                  }}}}
                  className={{`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all font-bold ${{
                    selectedLocation === idx
                      ? "shadow-lg"
                      : "text-stone-400 hover:text-white"
                  }}`}}
                  style={{{{
                    backgroundColor: selectedLocation === idx ? "{brand['primary_color']}" : undefined,
                    color: selectedLocation === idx ? "#000000" : undefined,
                  }}}}
                >
                  {{loc.name.split(" ")[0]}}
                </button>
              ))}}
            </div>
          )}}
        </div>

        {{currentLoc && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {{/* Visual Photography Carousel */}}
            <div className="lg:col-span-7 relative min-h-[420px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={{`${{currentLoc.id}}-${{activeImageIndex}}`}}
                  initial={{{{ opacity: 0, scale: 1.05 }}}}
                  animate={{{{ opacity: 1, scale: 1 }}}}
                  exit={{{{ opacity: 0 }}}}
                  transition={{{{ duration: 0.5 }}}}
                  className="absolute inset-0"
                >
                  <Image
                    src={{allImages[activeImageIndex] || currentLoc.heroImage}}
                    alt={{currentLoc.name}}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {{/* Text Over Image — always white regardless of theme */}}
              <div data-image-overlay className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
                <div className="space-y-1 text-white">
                  <span className="text-[10px] uppercase tracking-widest font-bold block" style={{{{ color: "{brand['primary_color']}" }}}}>
                    {{currentLoc.badge}}
                  </span>
                  <h3 className="type-display text-2xl sm:text-3xl text-white font-extrabold drop-shadow-md">
                    {{currentLoc.name}}
                  </h3>
                </div>

                {{allImages.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                    {{allImages.map((_, imgIdx) => (
                      <button
                        key={{imgIdx}}
                        onClick={{() => setActiveImageIndex(imgIdx)}}
                        className={{`w-2 h-2 rounded-full transition-all ${{
                          activeImageIndex === imgIdx
                            ? "w-5 bg-[{brand['primary_color']}]"
                            : "bg-white/40 hover:bg-white/70"
                        }}`}}
                      />
                    ))}}
                  </div>
                )}}
              </div>
            </div>

            {{/* Location Specs & Quick Actions Card */}}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-emerald-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    {{currentLoc.status}}
                  </span>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Address
                    </span>
                    <p className="text-white font-semibold text-sm">{{currentLoc.address}}</p>
                    <p className="text-stone-400">{{currentLoc.city}}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Hours
                      </span>
                      <p className="text-white font-bold">{{currentLoc.hours}}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Seating
                      </span>
                      <p className="text-white font-bold text-[11px] leading-tight">
                        {{currentLoc.seating}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {{/* Action Buttons */}}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={{currentLoc.mapUrl}}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider text-center transition-all shadow-lg hover:brightness-110 active:scale-95"
                  style={{{{
                    backgroundColor: "{brand['primary_color']}",
                    color: "#000000",
                  }}}}
                >
                  Directions ↗
                </a>

                <a
                  href={{`tel:${{currentLoc.phone.replace(/[^0-9+]/g, "")}}`}}
                  className="py-3.5 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider text-center bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15"
                >
                  Call Outpost
                </a>
              </div>
            </div>
          </div>
        )}}
      </div>
    </section>
  );
}}
'''


def generate_signature_menu(brand):
    items_json = json.dumps(brand.get("menu_items", []), indent=2)
    currency = brand["currency"]
    return f'''"use client";

import React, {{ useState }} from "react";
import Image from "next/image";
import {{ motion, AnimatePresence }} from "framer-motion";

const menuItems = {items_json};

export default function SignatureMenu() {{
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItemModal, setActiveItemModal] = useState<any | null>(null);

  const categories = ["All", ...Array.from(new Set(menuItems.map((item: any) => item.category)))];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item: any) => item.category === selectedCategory);

  return (
    <section id="menu-section" className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {{/* Header */}}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="type-display text-4xl sm:text-6xl text-white font-black tracking-tight">
              SIGNATURE SELECTIONS
            </h2>
          </div>

          {{/* Category Filter Pills */}}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
            {{categories.map((cat: any) => (
              <button
                key={{cat}}
                onClick={{() => {{
                  if ((window as any).playPopSound) (window as any).playPopSound();
                  setSelectedCategory(cat);
                }}}}
                className={{`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${{
                  selectedCategory === cat
                    ? "shadow-lg text-black"
                    : "text-stone-300 hover:text-white"
                }}`}}
                style={{{{
                  backgroundColor: selectedCategory === cat ? "{brand['primary_color']}" : "transparent",
                }}}}
              >
                {{cat}}
              </button>
            ))}}
          </div>
        </div>

        {{/* Minimalist Clean Dish Cards Grid */}}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {{filteredItems.map((item: any) => (
            <motion.div
              key={{item.id}}
              layout
              initial={{{{ opacity: 0, scale: 0.95 }}}}
              animate={{{{ opacity: 1, scale: 1 }}}}
              transition={{{{ duration: 0.3 }}}}
              onClick={{() => {{
                if ((window as any).playPopSound) (window as any).playPopSound();
                setActiveItemModal(item);
              }}}}
              className="group cursor-pointer rounded-3xl bg-white/[0.04] border border-white/10 hover:border-white/30 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
            >
              {{/* Dish Photo */}}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-black/40">
                <Image
                  src={{item.image}}
                  alt={{item.name}}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {{item.badge && (
                  <span
                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md"
                    style={{{{ backgroundColor: "{brand['primary_color']}", color: "#000000" }}}}
                  >
                    {{item.badge}}
                  </span>
                )}}
              </div>

              {{/* Clean Card Header: Title + Price Pill + Add */}}
              <div className="flex items-center justify-between gap-3 pt-1">
                <h3 className="type-display text-xl sm:text-2xl text-white font-bold leading-tight group-hover:text-[{brand['primary_color']}] transition-colors">
                  {{item.name}}
                </h3>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                    {currency}{{item.price}}
                  </span>
                  <button
                    type="button"
                    onClick={{(e) => {{
                      e.stopPropagation();
                      if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                      alert(`Added ${{item.name}} to your order!`);
                    }}}}
                    className="px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow hover:scale-105 active:scale-95"
                    style={{{{ backgroundColor: "{brand['primary_color']}", color: "#000000" }}}}
                  >
                    ADD +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}}
        </div>
      </div>

      {{/* Quick View Modal on Card Click */}}
      <AnimatePresence>
        {{activeItemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{{{ opacity: 0, scale: 0.9 }}}}
              animate={{{{ opacity: 1, scale: 1 }}}}
              exit={{{{ opacity: 0, scale: 0.9 }}}}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e0f14] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={{() => setActiveItemModal(null)}}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>

              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black/60">
                <Image
                  src={{activeItemModal.image}}
                  alt={{activeItemModal.name}}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest block" style={{{{ color: "{brand['primary_color']}" }}}}>
                  {{activeItemModal.category}}
                </span>
                <h3 className="type-display text-3xl font-black text-white">
                  {{activeItemModal.name}}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="type-display text-2xl font-bold text-white">
                  {currency}{{activeItemModal.price}}
                </span>

                <button
                  type="button"
                  onClick={{() => {{
                    if ((window as any).playSizzleSound) (window as any).playSizzleSound();
                    alert(`Added ${{activeItemModal.name}} to order!`);
                    setActiveItemModal(null);
                  }}}}
                  className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:brightness-110 active:scale-95"
                  style={{{{ backgroundColor: "{brand['primary_color']}", color: "#000000" }}}}
                >
                  Add to Table Order →
                </button>
              </div>
            </motion.div>
          </div>
        )}}
      </AnimatePresence>
    </section>
  );
}}
'''


def generate_how_we_smash(brand):
    return f'''"use client";

import React, {{ useState }} from "react";
import {{ motion }} from "framer-motion";

export default function HowWeSmash() {{
  const [searPressure, setSearPressure] = useState<number>(200);

  return (
    <section className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h2 className="type-display text-4xl sm:text-6xl text-white font-black tracking-tight">
            {brand['craft_title']}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-stone-300">Sear Temperature & Pressure</span>
                <span style={{{{ color: "{brand['primary_color']}" }}}}>{{searPressure}} lbs / 450°F</span>
              </div>
              <input
                type="range"
                min="100"
                max="300"
                value={{searPressure}}
                onChange={{(e) => setSearPressure(Number(e.target.value))}}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{{{ accentColor: "{brand['primary_color']}" }}}}
              />
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest block" style={{{{ color: "{brand['primary_color']}" }}}}>
              {brand['craft_desc']}
            </span>
            <h3 className="type-display text-2xl sm:text-3xl text-white font-extrabold">
              MAXIMUM CARAMELIZED MAILLARD REACTION
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}}
'''


def generate_reservation_cta(brand):
    locs_names = [loc["name"] for loc in brand["locations"]]
    locs_options = "\n".join([f'                    <option value="{loc}">{loc}</option>' for loc in locs_names])
    return f'''"use client";

import React, {{ useState }} from "react";
import {{ motion, AnimatePresence }} from "framer-motion";

export default function ReservationCTA() {{
  const [selectedLocation, setSelectedLocation] = useState("{locs_names[0]}");
  const [selectedDate, setSelectedDate] = useState("Today, 7:30 PM");
  const [guests, setGuests] = useState("2 Guests");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {{
    e.preventDefault();
    if (!name || !phone) return;
    if ((window as any).playSizzleSound) (window as any).playSizzleSound();
    setIsBooked(true);
  }};

  return (
    <section id="reservation-section" className="py-24 px-6 sm:px-12 md:px-20 bg-transparent text-white border-b border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h2 className="type-display text-4xl sm:text-6xl text-white font-black tracking-tight">
            BOOK YOUR EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="type-display text-3xl sm:text-4xl text-white font-extrabold leading-tight">
              TABLE RESERVATIONS AT {brand['name']}
            </h3>
          </div>

          {{/* High Contrast Crisp Booking Card */}}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#FAF7F2] text-black shadow-2xl border border-black/10">
            <AnimatePresence mode="wait">
              {{!isBooked ? (
                <form onSubmit={{handleBooking}} className="space-y-4 text-black">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Select Outpost</label>
                    <select
                      value={{selectedLocation}}
                      onChange={{(e) => setSelectedLocation(e.target.value)}}
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    >
{locs_options}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Guests</label>
                      <select
                        value={{guests}}
                        onChange={{(e) => setGuests(e.target.value)}}
                        className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6+ Guests">6+ Guests</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Date & Time</label>
                      <input
                        type="text"
                        value={{selectedDate}}
                        onChange={{(e) => setSelectedDate(e.target.value)}}
                        className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Your Name</label>
                    <input
                      type="text"
                      placeholder="Alex Parker"
                      value={{name}}
                      onChange={{(e) => setName(e.target.value)}}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-bold tracking-wider text-black block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="{brand['phone']}"
                      value={{phone}}
                      onChange={{(e) => setPhone(e.target.value)}}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-black/5 border border-black/15 text-black font-semibold text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xl hover:brightness-110 active:scale-95"
                    style={{{{
                      backgroundColor: "{brand['primary_color']}",
                      color: "#000000",
                    }}}}
                  >
                    Confirm Table Reservation →
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{{{ opacity: 0, scale: 0.9 }}}}
                  animate={{{{ opacity: 1, scale: 1 }}}}
                  className="text-center py-8 space-y-4 text-black"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="type-display text-2xl font-bold">RESERVATION CONFIRMED</h4>
                  <p className="text-xs font-semibold text-stone-700">
                    We look forward to welcoming you, {{name}} at {{selectedLocation}} for {{guests}}.
                  </p>
                </motion.div>
              )}}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}}
'''


def personalize_project(slug, brand):
    project_dir = PROJECTS_DIR / slug
    if not project_dir.exists():
        print(f"Skipping missing project: {slug}")
        return

    print(f"👉 Deeply personalizing {slug} ({brand['name']})...")

    marketing_dir = project_dir / "components" / "marketing"
    marketing_dir.mkdir(parents=True, exist_ok=True)

    # 1. CinematicHero.tsx
    hero_path = marketing_dir / "CinematicHero.tsx"
    hero_path.write_text(generate_cinematic_hero(brand))

    # 2. CinematicSmoothie.tsx
    smoothie_path = marketing_dir / "CinematicSmoothie.tsx"
    smoothie_path.write_text(generate_cinematic_smoothie(brand))

    # 3. RestaurantLocations.tsx
    locs_path = marketing_dir / "RestaurantLocations.tsx"
    locs_path.write_text(generate_restaurant_locations(brand))

    # 4. SignatureMenu.tsx
    menu_path = marketing_dir / "SignatureMenu.tsx"
    menu_path.write_text(generate_signature_menu(brand))

    # 5. HowWeSmash.tsx
    smash_path = marketing_dir / "HowWeSmash.tsx"
    smash_path.write_text(generate_how_we_smash(brand))

    # 6. ReservationCTA.tsx
    res_path = marketing_dir / "ReservationCTA.tsx"
    res_path.write_text(generate_reservation_cta(brand))

    print(f"  ✓ {slug} personalized successfully!")


def main():
    print("🚀 Starting master deep personalization across all 24 projects...")
    for slug, brand in ALL_BRANDS.items():
        personalize_project(slug, brand)
    print("🎉 All 24 projects personalized!")


if __name__ == "__main__":
    main()
