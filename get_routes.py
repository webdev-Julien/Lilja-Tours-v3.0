import os
from pathlib import Path
import json

dist_dir = Path('dist')
routes = set()

for root, dirs, files in os.walk(dist_dir):
    for f in files:
        if f == 'index.html':
            path = Path(root).relative_to(dist_dir)
            path_str = str(path).replace('\\', '/')
            if path_str == '.':
                route = '/'
            else:
                route = '/' + path_str + '/'
            routes.add(route)

# Also add 404.html as valid
routes.add('/404/')

sorted_routes = sorted(routes)
print(f"Found {len(sorted_routes)} valid routes")

with open('valid_routes.json', 'w') as f:
    json.dump(sorted_routes, f, indent=2)

for r in sorted_routes:
    print(r)
