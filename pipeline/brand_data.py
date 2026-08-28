#!/usr/bin/env python3
"""
Master Deep Personalization Engine for All 24 Restaurant Websites.
Customizes all content, images, typography, contact, locations, signature dishes,
pricing, and craft stories to each specific brand while keeping the exact
high-end Beyondburg interactive UI/UX standard (PixelText, cursor:none, theme vars,
data-image-overlay protection, live restaurant jazz audio, interactive menus,
and responsive inner pages).
"""

import os
import json
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

# Detailed Brand Knowledge Base for all 24 websites
BRANDS = {
    "beyondburg-inc": {
        "name": "BEYONDBURG INC.",
        "short_name": "Beyondburg",
        "tagline": "Craft Smash Atelier · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5C418",
        "dark_bg": "#070709",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F5C418",
        "footer_text": "#000000",
        "theme_base": "#071009",
        "signature_craving": ("LOTUS BISCOFF", "SPECULOOS MALT"),
        "craft_title": "THE ARTISANAL SIZZLE CRAFT",
        "craft_technique": "450°F STEEL SEAR",
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
            {"id": "animal-fries", "name": "Animal Crinkle Fries", "category": "Sides & Appetizers", "price": "210", "badge": "Must Try", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"},
            {"id": "bbq-bacon", "name": "Smoked Hickory Bacon", "category": "Smash Burgers", "price": "430", "badge": "Smoky", "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"}
        ]
    },
    "truffles-bangalore": {
        "name": "TRUFFLES",
        "short_name": "Truffles",
        "tagline": "Legendary Burger Bistro · Bengaluru",
        "city_badge": "BENGALURU KITCHENS",
        "city_footer": "BENGALURU OUTPOSTS",
        "currency": "₹",
        "primary_color": "#F5A623",
        "dark_bg": "#100a06",
        "light_bg": "#FAF7F2",
        "footer_bg": "#F5A623",
        "footer_text": "#000000",
        "theme_base": "#100a06",
        "signature_craving": ("DUTCH TRUFFLE", "CHOCOLATE MALT"),
        "craft_title": "ICONIC CHAR-GRILL CRAFT",
        "craft_technique": "GRIDDLED PERFECTION",
        "phone": "+91 80 4146 6565",
        "email": "hello@truffles.co.in",
        "hours": "11:00 AM – 11:00 PM",
        "address": "St. Mark's Road & Koramangala 5th Block, Bengaluru",
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
            {"id": "dutch-truffle", "name": "Dutch Truffle Cake Slice", "category": "Desserts & Cakes", "price": "220", "badge": "Iconic", "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"},
            {"id": "ferrero-shake", "name": "Ferrero Rocher Shake", "category": "Thick Shakes", "price": "260", "badge": "Bestseller", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"},
            {"id": "loaded-wedges", "name": "Cheesy Potato Wedges", "category": "Sides & Bites", "price": "190", "badge": "Crispy", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"}
        ]
    },
    "casino-el-camino": {
        "name": "CASINO EL CAMINO",
        "short_name": "Casino El Camino",
        "tagline": "Legendary 3/4 lb Burgers & Dive Bar · 6th St Austin",
        "city_badge": "AUSTIN SMOKEHOUSE",
        "city_footer": "DOWNTOWN AUSTIN",
        "currency": "$",
        "primary_color": "#DC2626",
        "dark_bg": "#0e0505",
        "light_bg": "#FAF7F2",
        "footer_bg": "#DC2626",
        "footer_text": "#000000",
        "theme_base": "#0e0505",
        "signature_craving": ("HABANERO BLOODY MARY", "& TEXAS CRAFT DRAFT"),
        "craft_title": "3/4 LB CHAR-BROILED CRAFT",
        "craft_technique": "FLAME-KISSED CHAR-GRILL",
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
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Casino+El+Camino+Austin"
            }
        ],
        "menu_items": [
            {"id": "amarillo-burger", "name": "Amarillo Burger (3/4 lb)", "category": "Famous Burgers", "price": "16.50", "badge": "Triple D Legend", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "buffalo-burger", "name": "Buffalo Blue Cheese Burger", "category": "Famous Burgers", "price": "16.00", "badge": "Hot & Bold", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "el-camino-chili", "name": "Texas Ghost Dog", "category": "Specialty Dogs", "price": "12.00", "badge": "Fire", "image": "https://images.unsplash.com/photo-1627054234598-a28585e50dcf?w=800&q=80"},
            {"id": "verde-fries", "name": "Hatch Green Chile Fries", "category": "Appetizers", "price": "9.50", "badge": "Cult Favorite", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"},
            {"id": "bloody-mary", "name": "World Famous Bloody Mary", "category": "Cocktails & Drafts", "price": "14.00", "badge": "Monster Garnish", "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"}
        ]
    },
    "dans-burgers": {
        "name": "DAN'S HAMBURGERS",
        "short_name": "Dan's",
        "tagline": "Austin's Best Family-Owned Burgers Since 1973",
        "city_badge": "AUSTIN KITCHENS",
        "city_footer": "SOUTH AUSTIN TRADITION",
        "currency": "$",
        "primary_color": "#D97706",
        "dark_bg": "#100a05",
        "light_bg": "#FAF7F2",
        "footer_bg": "#D97706",
        "footer_text": "#000000",
        "theme_base": "#100a05",
        "signature_craving": ("HAND-DIPPED", "MALTED MILKSHAKES"),
        "craft_title": "TIME-TESTED GRIDDLE CRAFT",
        "craft_technique": "OLD-FASHIONED SIZZLE",
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
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Dans+Hamburgers+Manchaca"
            },
            {
                "id": "ben-white",
                "name": "Ben White Flagship",
                "badge": "ORIGINAL LOCATION",
                "address": "4301 S Congress Ave",
                "city": "Austin, TX 78745",
                "hours": "6:00 AM – 9:00 PM",
                "phone": "+1 512-443-1883",
                "status": "Breakfast & Burgers Live",
                "seating": "Classic Texas Diner Counter",
                "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
                    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"
                ],
                "mapUrl": "https://maps.google.com/?q=Dans+Hamburgers+Ben+White"
            }
        ],
        "menu_items": [
            {"id": "double-cheese", "name": "Dan's Large Double Cheese", "category": "Burgers", "price": "9.25", "badge": "House Legend", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"},
            {"id": "jalapeno-bacon", "name": "Jalapeño Bacon Cheeseburger", "category": "Burgers", "price": "10.15", "badge": "Austin Favorite", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "curly-fries", "name": "Seasoned Curly Fries", "category": "Sides", "price": "4.10", "badge": "Crispy Gold", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"},
            {"id": "onion-rings", "name": "Hand-Battered Onion Rings", "category": "Sides", "price": "4.50", "badge": "Fresh Made", "image": "https://images.unsplash.com/photo-1639024471285-05e81d77d704?w=800&q=80"},
            {"id": "choc-malt", "name": "Hand-Spun Chocolate Malt", "category": "Shakes & Malts", "price": "5.50", "badge": "Real Ice Cream", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"}
        ]
    },
    "dirty-martins": {
        "name": "DIRTY MARTIN'S",
        "short_name": "Dirty Martin's",
        "tagline": "Austin's Kum-Bak Burger Legend Since 1926",
        "city_badge": "UT CAMPUS LEGEND",
        "city_footer": "THE DRAG · AUSTIN",
        "currency": "$",
        "primary_color": "#BF5700",
        "dark_bg": "#100804",
        "light_bg": "#FAF7F2",
        "footer_bg": "#BF5700",
        "footer_text": "#000000",
        "theme_base": "#100804",
        "signature_craving": ("1926 SPECIAL", "TEXAS CHOCOLATE SHAKE"),
        "craft_title": "CENTURY-OLD GRIDDLE SEAR",
        "craft_technique": "ORIGINAL 1926 CAST IRON",
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
            {"id": "ot-special", "name": "O.T. Special Double Burger", "category": "Historic Burgers", "price": "10.50", "badge": "Crowd Pick", "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80"},
            {"id": "chili-cheese-tots", "name": "Chili Cheese Tater Tots", "category": "Sides", "price": "6.25", "badge": "Secret Chili", "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80"},
            {"id": "kum-bak-shake", "name": "Classic Malted Vanilla Shake", "category": "Shakes", "price": "5.25", "badge": "Thick & Sweet", "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"}
        ]
    },
    "pedrosos-pizza": {
        "name": "PEDROSO'S PIZZA",
        "short_name": "Pedroso's",
        "tagline": "Austin's True Artisan Pizza & Grandma Pies",
        "city_badge": "BURNET RD AUSTIN",
        "city_footer": "NORTH AUSTIN PIZZERIA",
        "currency": "$",
        "primary_color": "#B91C1C",
        "dark_bg": "#0e0505",
        "light_bg": "#FAF7F2",
        "footer_bg": "#B91C1C",
        "footer_text": "#000000",
        "theme_base": "#0e0505",
        "signature_craving": ("HAND-PIPED CANNOLI", "& TUSCAN ESPRESSO"),
        "craft_title": "WOOD-FIRED PIZZA CRAFT",
        "craft_technique": "72-HR SLOW FERMENTED CRUST",
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
            {"id": "ny-pepperoni", "name": "NY Style Hot Honey Pepperoni", "category": "Round Pies", "price": "24.00", "badge": "Cup & Char", "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80"},
            {"id": "burrata-margherita", "name": "Fresh Burrata Margherita", "category": "Artisan Specials", "price": "25.00", "badge": "Chef Special", "image": "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80"},
            {"id": "sicilian-slice", "name": "Crispy Sicilian Slices", "category": "By The Slice", "price": "5.50", "badge": "Focaccia Crust", "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"}
        ]
    }
}

# Fallback generic generator for any project not explicitly in the dictionary
DEFAULT_DATA = {
    "currency": "₹",
    "hours": "11:30 AM – 11:30 PM",
    "locations_title": "OUR OUTPOSTS",
}

print("Loaded brand configurations.")
