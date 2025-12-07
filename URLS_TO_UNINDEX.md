# URLs to Unindex in Google Search Console

Use the "Remove all URLs with this prefix" option in Google Search Console for these URLs.

## Prefix-Based Removals (Most Efficient)

These prefixes will remove entire sections of the old website that no longer exist:

### English Old URL Prefixes

| Prefix URL | Reason |
|------------|--------|
| `https://www.lilja-tours.com/day-tours-iceland/` | Old day tours section - now `/private-day-tours-iceland/` |
| `https://www.lilja-tours.com/things-to-do-iceland/` | Old activities section - now `/partner-experiences-iceland/` |
| `https://www.lilja-tours.com/all-day-tours/` | Old page - now `/private-day-tours-iceland/` |
| `https://www.lilja-tours.com/multiday/` | Old page - now `/multiday-tours-iceland/` |

### French Old URL Prefixes

| Prefix URL | Reason |
|------------|--------|
| `https://www.lilja-tours.com/fr/guide-francophone-islande/` | Old French tours section - now `/fr/circuits-prives-islande/` |
| `https://www.lilja-tours.com/fr/a-faire-en-islande/` | Old French activities section - now `/fr/experiences-partenaires-islande/` |
| `https://www.lilja-tours.com/fr/activites-en-islande/` | Old page - now `/fr/experiences-partenaires-islande/` |
| `https://www.lilja-tours.com/fr/circuits/` | Old page - now `/fr/circuits-prives-islande/` |
| `https://www.lilja-tours.com/fr/toutes-nos-excursions/` | Old page - now `/fr/circuits-prives-islande/` |

---

## Individual URLs to Remove

These are specific old URLs that don't fall under the prefixes above:

### English Blog Posts (Old URLs)

| Old URL | New URL |
|---------|---------|
| `https://www.lilja-tours.com/blog/best-hotels-in-iceland-complete-guide/` | `/blog/top-10-favourite-hotels/` |
| `https://www.lilja-tours.com/blog/how-to-see-real-lava-in-iceland/` | `/blog/how-to-see-lava-in-iceland/` |
| `https://www.lilja-tours.com/blog/the-10-best-activities-to-do-in-reykjavik/` | `/blog/rainy-day-reykjavik/` |

### French Blog Posts (Old URLs)

| Old URL | New URL |
|---------|---------|
| `https://www.lilja-tours.com/fr/blog/les-10-meilleures-activites-a-reykjavik/` | `/fr/blog/jour-pluie-reykjavik/` |
| `https://www.lilja-tours.com/fr/blog/les-meilleurs-hotels-d-islande/` | `/fr/blog/top-10-hotels-favoris/` |
| `https://www.lilja-tours.com/fr/blog/voir-lave-en-fusion-en-islande/` | `/fr/blog/comment-voir-lave-islande/` |

### Other Old Pages

| Old URL | New URL |
|---------|---------|
| `https://www.lilja-tours.com/fr/about/` | `/fr/` (no separate about page in French) |

---

## Summary for Google Search Console

### Step 1: Remove these 9 prefixes first (covers 95% of old URLs)

1. `https://www.lilja-tours.com/day-tours-iceland/`
2. `https://www.lilja-tours.com/things-to-do-iceland/`
3. `https://www.lilja-tours.com/all-day-tours/`
4. `https://www.lilja-tours.com/multiday/`
5. `https://www.lilja-tours.com/fr/guide-francophone-islande/`
6. `https://www.lilja-tours.com/fr/a-faire-en-islande/`
7. `https://www.lilja-tours.com/fr/activites-en-islande/`
8. `https://www.lilja-tours.com/fr/circuits/`
9. `https://www.lilja-tours.com/fr/toutes-nos-excursions/`

### Step 2: Remove these 7 individual URLs

1. `https://www.lilja-tours.com/blog/best-hotels-in-iceland-complete-guide/`
2. `https://www.lilja-tours.com/blog/how-to-see-real-lava-in-iceland/`
3. `https://www.lilja-tours.com/blog/the-10-best-activities-to-do-in-reykjavik/`
4. `https://www.lilja-tours.com/fr/blog/les-10-meilleures-activites-a-reykjavik/`
5. `https://www.lilja-tours.com/fr/blog/les-meilleurs-hotels-d-islande/`
6. `https://www.lilja-tours.com/fr/blog/voir-lave-en-fusion-en-islande/`
7. `https://www.lilja-tours.com/fr/about/`

---

## Notes

- The `.htaccess` file already contains 301 redirects for all these old URLs, so Google will eventually discover the new URLs
- Removing from index speeds up the process and prevents duplicate content issues
- The prefix-based removal is the most efficient method - just 9 prefixes cover most old URLs
- Total: **9 prefix removals + 7 individual URL removals = 16 removal requests**
