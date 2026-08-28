#!/usr/bin/env python3
"""
Launcher for 10 Local Restaurant Websites (5 Bengaluru + 5 Austin).
Spawns Next.js servers with independent ports from 3000 to 3009.
"""

import os
import sys
import subprocess
import signal
import time
from pathlib import Path

ROOT = Path(__file__).parent.parent
PROJECTS_DIR = ROOT / "projects"

SERVERS = [
    # 5 Bangalore Websites
    {"city": "Bengaluru 🇮🇳", "slug": "beyondburg-inc", "name": "Beyondburg Inc.", "port": 3000},
    {"city": "Bengaluru 🇮🇳", "slug": "truffles-bangalore", "name": "Truffles", "port": 3001},
    {"city": "Bengaluru 🇮🇳", "slug": "burger-seigneur", "name": "Burger Seigneur", "port": 3002},
    {"city": "Bengaluru 🇮🇳", "slug": "smash-guys", "name": "Smash Guys", "port": 3003},
    {"city": "Bengaluru 🇮🇳", "slug": "louis-burger", "name": "Louis Burger", "port": 3004},

    # 5 Austin Websites
    {"city": "Austin 🇺🇸", "slug": "casino-el-camino", "name": "Casino El Camino", "port": 3005},
    {"city": "Austin 🇺🇸", "slug": "dans-burgers", "name": "Dan's Hamburgers", "port": 3006},
    {"city": "Austin 🇺🇸", "slug": "dirty-martins", "name": "Dirty Martin's Kum-Bak", "port": 3007},
    {"city": "Austin 🇺🇸", "slug": "pedrosos-pizza", "name": "Pedroso's Pizza", "port": 3008},
    {"city": "Austin 🇺🇸", "slug": "jewboy-burgers", "name": "JewBoy Burgers", "port": 3009},
]

processes = []

def start_servers():
    print("=" * 70)
    print("🚀 Launching 10 Local Restaurant Websites (5 Bengaluru + 5 Austin)")
    print("=" * 70)

    for item in SERVERS:
        project_path = PROJECTS_DIR / item["slug"]
        port = item["port"]

        cmd = ["npx", "next", "dev", "-p", str(port)]
        
        proc = subprocess.Popen(
            cmd,
            cwd=str(project_path),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            preexec_fn=os.setsid
        )
        processes.append(proc)
        print(f"  [{item['city']}] {item['name']:<25} ➔ http://localhost:{port}")

    print("=" * 70)
    print("✨ All 10 servers launched in background!")
    print("Press Ctrl+C to terminate all servers.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping all servers...")
        for p in processes:
            try:
                os.killpg(os.getpgid(p.pid), signal.SIGTERM)
            except Exception:
                pass
        print("All servers stopped.")

if __name__ == "__main__":
    start_servers()
