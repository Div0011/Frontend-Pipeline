#!/usr/bin/env python3
"""Generate PDF and presentations from PROPOSAL.md"""

import os
from pathlib import Path
from weasyprint import HTML, CSS

def generate_pdf():
    """Generate PDF from HTML presentation"""
    docs_dir = Path(__file__).parent.parent / "docs"
    html_file = docs_dir / "PRESENTATION.html"
    pdf_file = docs_dir / "Frontend_Pipeline_Proposal.pdf"
    
    if not html_file.exists():
        print(f"Error: {html_file} not found")
        return False
    
    try:
        # Convert HTML to PDF using WeasyPrint
        HTML(str(html_file)).write_pdf(str(pdf_file))
        print(f"✓ PDF created: {pdf_file}")
        print(f"  Size: {pdf_file.stat().st_size / 1024:.1f} KB")
        return True
    except Exception as e:
        print(f"Error creating PDF: {e}")
        return False

if __name__ == "__main__":
    generate_pdf()
