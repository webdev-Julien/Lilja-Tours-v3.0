import os
import re
import json
from pathlib import Path

base_dir = Path(r"D:\JULIEN\09 - WEBSITES\Lilja Tours v3.0")
src_dir = base_dir / "src"

# Patterns to find internal links
patterns = {
    'href_html': r'href\s*=\s*["\']([^"\']+)["\']',
    'href_jsx': r'href\s*=\s*\{["\']([^"\']+)["\']\}',
    'markdown_link': r'\[([^\]]*)\]\(([^)]+)\)',
    'url_frontmatter': r'^url:\s*["\']?([^"\']+)["\']?',
    'urlOtherLang': r'^urlOtherLang:\s*["\']?([^"\']+)["\']?',
    'item_url': r'item:\s*["\']?([^"\']+)["\']?',
    'link_canonical': r'<link[^>]*href=["\']([^"\']+)["\']',
}

def is_internal_link(url):
    """Check if link is internal (starts with / or contains lilja-tours.com)"""
    if not url:
        return False
    # Skip anchors, javascript, mailto, tel
    if url.startswith('#') or url.startswith('javascript:') or url.startswith('mailto:') or url.startswith('tel:'):
        return False
    # Skip external links that are not lilja-tours
    if url.startswith('http://') or url.startswith('https://'):
        if 'lilja-tours.com' not in url:
            return False
        return True
    # Internal paths starting with /
    if url.startswith('/'):
        return True
    return False

def extract_path_from_url(url):
    """Extract path from URL (remove domain if present)"""
    if 'lilja-tours.com' in url:
        # Extract path after domain
        match = re.search(r'lilja-tours\.com(/[^"\'\s]*)', url)
        if match:
            return match.group(1)
    return url

def find_links_in_file(filepath):
    """Find all internal links in a file"""
    links = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')

            for line_num, line in enumerate(lines, 1):
                # Find all href attributes
                for pattern_name, pattern in patterns.items():
                    matches = re.finditer(pattern, line, re.IGNORECASE)
                    for match in matches:
                        if pattern_name == 'markdown_link':
                            url = match.group(2)
                        else:
                            url = match.group(1)

                        if is_internal_link(url):
                            path = extract_path_from_url(url)
                            links.append({
                                'line': line_num,
                                'url': path,
                                'original_url': url,
                                'pattern': pattern_name,
                                'context': line.strip()[:100]
                            })
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

    return links

def collect_all_links():
    """Collect all internal links from the project"""
    all_links = {}

    # Directories to scan
    scan_dirs = [
        src_dir / "pages",
        src_dir / "components",
        src_dir / "content",
    ]

    extensions = ['.astro', '.mdx', '.tsx', '.ts', '.jsx', '.js']

    for scan_dir in scan_dirs:
        if not scan_dir.exists():
            continue

        for root, dirs, files in os.walk(scan_dir):
            for filename in files:
                ext = os.path.splitext(filename)[1]
                if ext in extensions:
                    filepath = Path(root) / filename
                    rel_path = filepath.relative_to(base_dir)
                    links = find_links_in_file(filepath)
                    if links:
                        all_links[str(rel_path)] = links

    return all_links

def get_unique_urls(all_links):
    """Get unique URLs and their sources"""
    url_sources = {}

    for filepath, links in all_links.items():
        for link in links:
            url = link['url']
            if url not in url_sources:
                url_sources[url] = []
            url_sources[url].append({
                'file': filepath,
                'line': link['line'],
                'pattern': link['pattern']
            })

    return url_sources

if __name__ == '__main__':
    print("Extracting all internal links...")
    all_links = collect_all_links()

    print(f"\nFound links in {len(all_links)} files")

    url_sources = get_unique_urls(all_links)
    print(f"Found {len(url_sources)} unique internal URLs")

    # Save detailed results
    with open(base_dir / 'links_extracted.json', 'w', encoding='utf-8') as f:
        json.dump({
            'by_file': all_links,
            'by_url': url_sources
        }, f, indent=2)

    print("\nResults saved to links_extracted.json")

    # Print unique URLs
    print("\n=== Unique Internal URLs ===")
    for url in sorted(url_sources.keys()):
        print(f"  {url}")
