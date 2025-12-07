import json
from pathlib import Path

# Load extracted links
with open('links_extracted.json', 'r', encoding='utf-8') as f:
    extracted = json.load(f)

# Load valid routes
with open('valid_routes.json', 'r', encoding='utf-8') as f:
    valid_routes = set(json.load(f))

# Also add routes without trailing slashes
valid_routes_normalized = set()
for route in valid_routes:
    valid_routes_normalized.add(route)
    valid_routes_normalized.add(route.rstrip('/'))
    if not route.endswith('/'):
        valid_routes_normalized.add(route + '/')

# Add static files that exist
static_files = [
    '/css/gdpr-consent.css',
    '/favicon.ico',
    '/logos/topbar-logo.webp',
    '/Lilja-Tours-Logo.jpg',
]

# Check pictures directory exists
pictures_dir = Path('public/pictures')
if pictures_dir.exists():
    for p in pictures_dir.rglob('*'):
        if p.is_file():
            rel_path = '/' + str(p.relative_to('public')).replace('\\', '/')
            valid_routes_normalized.add(rel_path)

# Also add public directory files
public_dir = Path('public')
if public_dir.exists():
    for p in public_dir.rglob('*'):
        if p.is_file():
            rel_path = '/' + str(p.relative_to('public')).replace('\\', '/')
            valid_routes_normalized.add(rel_path)

for sf in static_files:
    valid_routes_normalized.add(sf)

# Find broken links
broken_links = {}
url_sources = extracted['by_url']

for url, sources in url_sources.items():
    # Skip external URLs (should have been filtered, but double-check)
    if url.startswith('http://') or url.startswith('https://'):
        if 'lilja-tours.com' not in url:
            continue

    # Skip anchors and special URLs
    if url.startswith('#') or url.startswith('javascript:') or url.startswith('mailto:') or url.startswith('tel:'):
        continue

    # Skip picture/image references (they're handled separately)
    if url.startswith('/pictures/'):
        continue

    # Normalize URL for comparison
    url_normalized = url.rstrip('/')
    url_with_slash = url_normalized + '/'

    # Check if URL exists
    if url not in valid_routes_normalized and url_normalized not in valid_routes_normalized and url_with_slash not in valid_routes_normalized:
        broken_links[url] = sources

# Sort by URL
broken_sorted = dict(sorted(broken_links.items()))

print(f"\n{'='*80}")
print(f"BROKEN LINKS REPORT")
print(f"{'='*80}")
print(f"Total unique broken links found: {len(broken_sorted)}")
print(f"{'='*80}\n")

# Create detailed report
report_lines = []
report_lines.append("# BROKEN LINKS REPORT")
report_lines.append("")
report_lines.append(f"Total broken links: {len(broken_sorted)}")
report_lines.append("")
report_lines.append("## How to use this file:")
report_lines.append("1. For each broken link, either:")
report_lines.append("   - Replace the URL with the correct one")
report_lines.append("   - Mark as 'DELETE' to remove the link entirely")
report_lines.append("2. Save the file")
report_lines.append("3. Ask Claude to implement the changes")
report_lines.append("")
report_lines.append("---")
report_lines.append("")

for url, sources in broken_sorted.items():
    report_lines.append(f"## Broken URL: `{url}`")
    report_lines.append("")
    report_lines.append(f"**Action:** <!-- REPLACE_WITH: /correct/url/ OR DELETE -->")
    report_lines.append("")
    report_lines.append("**Found in:**")
    for source in sources:
        report_lines.append(f"- `{source['file']}` (line {source['line']})")
    report_lines.append("")
    report_lines.append("---")
    report_lines.append("")

# Write report
with open('broken_links_report.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(report_lines))

print("Report saved to: broken_links_report.md")
print("\nBroken links summary:")
for url in broken_sorted.keys():
    print(f"  - {url}")
