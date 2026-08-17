"""Tool registry — single import surface for agents and tests."""

from redesign.tools.crawl import CrawlResult, SiteCrawl, crawl_website, crawl_site
from redesign.tools.lighthouse import run_lighthouse
from redesign.tools.screenshot import capture_screenshot
from redesign.tools.search import SearchResult, web_search
from redesign.tools.vision import analyze_image

__all__ = [
    "crawl_website",
    "crawl_site",
    "CrawlResult",
    "SiteCrawl",
    "capture_screenshot",
    "web_search",
    "SearchResult",
    "run_lighthouse",
    "analyze_image",
]
