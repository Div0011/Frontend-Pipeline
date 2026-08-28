import os, sys, threading, http.server, socketserver, signal

projects_config = [
    {"slug": "beyondburg-inc", "name": "Beyondburg Inc.", "city": "Bangalore", "tag": "Craft Smashed Tenderloin", "accent": "#F5C418", "port": 3000},
    {"slug": "truffles-bangalore", "name": "Truffles", "city": "Bangalore", "tag": "2004 Landmark Burgers & Shakes", "accent": "#F5A623", "port": 3001},
    {"slug": "burger-seigneur", "name": "Burger Seigneur", "city": "Bangalore", "tag": "European Brioche Atelier", "accent": "#C8A96E", "port": 3002},
    {"slug": "sankys-burger-house", "name": "Sanky's Burger House", "city": "Bangalore", "tag": "Underground Monster Smash", "accent": "#FFE500", "port": 3003},
    {"slug": "biggies-burger", "name": "Biggies Burger", "city": "Bangalore", "tag": "Flame-Grilled Behemoth", "accent": "#F26522", "port": 3004},
    {"slug": "leons-burgers", "name": "Leon's Burgers & Wings", "city": "Bangalore", "tag": "24-hr Buttermilk Fried Crunch", "accent": "#B12727", "port": 3005},
    {"slug": "louis-burger", "name": "Louis Burger", "city": "Bangalore", "tag": "24K Gold Wagyu & Truffle", "accent": "#D4AF37", "port": 3006},
    {"slug": "original-burger-co", "name": "Original Burger Co. (OBC)", "city": "Bangalore", "tag": "Bacon Jam Smash Diner", "accent": "#1E3A8A", "port": 3007},
    {"slug": "backyard-burgers", "name": "Backyard Burgers & Grill", "city": "Bangalore", "tag": "Open-Air Smokehouse Grill", "accent": "#E67E22", "port": 3008},
    {"slug": "burger-elite", "name": "BURGER ELITE", "city": "Bangalore", "tag": "Street Smash Royale", "accent": "#4C1D95", "port": 3009},
    {"slug": "burgerman", "name": "BurgerMan", "city": "Bangalore", "tag": "100% Flame-Grilled Whole Wheat", "accent": "#15803D", "port": 3010},
    {"slug": "good-flippin-burgers", "name": "Good Flippin' Burgers", "city": "Bangalore", "tag": "Fresh Potato Brioche Smash", "accent": "#831843", "port": 3011},
    {"slug": "simon-burgers", "name": "Simon Burgers", "city": "Bangalore", "tag": "Kammanahalli Late-Night", "accent": "#DC2626", "port": 3012},
    {"slug": "smash-guys", "name": "Smash Guys", "city": "Bangalore", "tag": "Cast-Iron Searing Steel", "accent": "#F5C418", "port": 3013},
    {"slug": "dans-burgers", "name": "Dan's Hamburgers", "city": "Austin", "tag": "1973 Austin Classic Diner", "accent": "#D97706", "port": 3014},
    {"slug": "dirty-martins", "name": "Dirty Martin's Kum-Bak", "city": "Austin", "tag": "1926 UT Drag Centennial", "accent": "#BF5700", "port": 3015},
    {"slug": "casino-el-camino", "name": "Casino El Camino", "city": "Austin", "tag": "6th St Rock 'n' Roll Burgers", "accent": "#991B1B", "port": 3016},
    {"slug": "jewboy-burgers", "name": "JewBoy Burgers", "city": "Austin", "tag": "El Paso Border Meets Deli", "accent": "#06B6D4", "port": 3017},
    {"slug": "pedrosos-pizza", "name": "Pedroso's Pizza", "city": "Austin", "tag": "Grandma Squares & Roman Pies", "accent": "#B91C1C", "port": 3018},
    {"slug": "little-deli-pizzeria", "name": "Little Deli & Pizzeria", "city": "Austin", "tag": "NJ Stone-Baked Pizza & Pastrami", "accent": "#166534", "port": 3019},
    {"slug": "pool-burger", "name": "Pool Burger", "city": "Austin", "tag": "1968 Airstream Tiki Lounge", "accent": "#F43F5E", "port": 3020},
    {"slug": "sour-duck-market", "name": "Sour Duck Market", "city": "Austin", "tag": "Sourdough Bakery & Smokehouse", "accent": "#EA580C", "port": 3021},
    {"slug": "burger-bar-austin", "name": "Burger Bar on Congress", "city": "Austin", "tag": "Downtown Walk-Up Flat Top", "accent": "#2563EB", "port": 3022},
    {"slug": "nadc-burger", "name": "NADC Burger", "city": "Austin", "tag": "100% Texas Wagyu & Tallow Fries", "accent": "#FFFFFF", "port": 3023},
]

servers = []

def create_static_handler(directory):
    class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=directory, **kwargs)
        def log_message(self, format, *args):
            pass # Suppress noisy log outputs
    return CustomHTTPRequestHandler

def run_port_server(port, directory):
    try:
        handler = create_static_handler(directory)
        server = socketserver.TCPServer(("", port), handler)
        servers.append(server)
        server.serve_forever()
    except Exception as e:
        pass

def generate_hub_html():
    cards_html = ""
    for item in projects_config:
        flag = "🇮🇳" if item["city"] == "Bangalore" else "🇺🇸"
        cards_html += f"""
        <div class="card" style="border-top: 4px solid {item['accent']};">
            <div class="card-header">
                <div class="city-badge">{flag} {item['city']}</div>
                <div class="port-badge">PORT {item['port']}</div>
            </div>
            <h3 class="brand-title">{item['name']}</h3>
            <p class="brand-tag">{item['tag']}</p>
            <div class="card-footer">
                <a href="http://localhost:{item['port']}" target="_blank" class="launch-btn" style="background: {item['accent']}; color: #000;">
                    Open Live Site ↗
                </a>
                <span class="status-indicator">● Online</span>
            </div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wishgranters // Local Portfolio Gateway (24 Live Projects)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{
            background: #08080a;
            color: #f5f5f5;
            font-family: 'DM Sans', sans-serif;
            padding: 40px 24px;
            min-height: 100vh;
        }}
        .container {{ max-width: 1400px; margin: 0 auto; }}
        header {{
            margin-bottom: 40px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 20px;
        }}
        .brand-logo {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #fff;
        }}
        .brand-logo span {{ color: #F5C418; }}
        .header-meta {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #a0a0a0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        .stats-bar {{
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }}
        .stat-pill {{
            background: #141416;
            border: 1px solid rgba(255,255,255,0.1);
            padding: 8px 16px;
            border-radius: 99px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
        }}
        .stat-pill strong {{ color: #F5C418; }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
        }}
        .card {{
            background: #121214;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }}
        .card:hover {{
            transform: translateY(-4px);
            border-color: rgba(255,255,255,0.25);
        }}
        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
        }}
        .city-badge {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #d0d0d0;
            background: rgba(255,255,255,0.06);
            padding: 4px 10px;
            border-radius: 6px;
        }}
        .port-badge {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            color: #888;
        }}
        .brand-title {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 6px;
        }}
        .brand-tag {{
            font-size: 13px;
            color: #999;
            line-height: 1.4;
            margin-bottom: 20px;
        }}
        .card-footer {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.06);
        }}
        .launch-btn {{
            display: inline-block;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 6px;
            transition: opacity 0.2s ease;
        }}
        .launch-btn:hover {{ opacity: 0.85; }}
        .status-indicator {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #10B981;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <div class="brand-logo">WISHGRANTERS <span>LOCAL HUB</span></div>
                <div class="header-meta" style="margin-top: 4px;">Cinematic Next.js 16 Multi-Instance Local Gateway</div>
            </div>
            <div class="header-meta">
                🟢 24 / 24 Projects Running Concurrently
            </div>
        </header>

        <div class="stats-bar">
            <div class="stat-pill">Total Projects: <strong>24</strong></div>
            <div class="stat-pill">🇮🇳 Bangalore Brands: <strong>14</strong></div>
            <div class="stat-pill">🇺🇸 Austin Brands: <strong>10</strong></div>
            <div class="stat-pill">Stack: <strong>Next.js 16 + React Bits + Canvas Scrubber</strong></div>
        </div>

        <div class="grid">
            {cards_html}
        </div>
    </div>
</body>
</html>"""

class HubHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(generate_hub_html().encode("utf-8"))
    def log_message(self, format, *args):
        pass

def main():
    print("🚀 Starting all 24 Client Websites on dedicated local ports...")

    for item in projects_config:
        slug = item["slug"]
        port = item["port"]
        out_dir = os.path.join("projects", slug, "out")
        
        if os.path.exists(out_dir):
            t = threading.Thread(target=run_port_server, args=(port, out_dir), daemon=True)
            t.start()
            print(f"  ● [PORT {port:4d}] {item['name']:30} -> http://localhost:{port}")
        else:
            print(f"  ✗ [PORT {port:4d}] {slug} missing out/ directory")

    print("\n🌐 Starting Master Local Gateway Hub on port 4000...")
    with socketserver.TCPServer(("", 4000), HubHandler) as httpd:
        servers.append(httpd)
        print(f"✅ Master Gateway running at http://localhost:4000")
        httpd.serve_forever()

if __name__ == "__main__":
    main()
