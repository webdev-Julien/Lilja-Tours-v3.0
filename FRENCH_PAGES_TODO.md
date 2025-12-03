# French Pages Creation Status

## ✅ Completed
1. Directory structure created: `/fr/`, `/fr/blog/`, `/fr/circuits-prives-islande/`, `/fr/circuits-multi-jours-islande/`, `/fr/experiences-partenaires-islande/`
2. `src/pages/fr/index.astro` - French homepage (infrastructure ready, content marked for translation)

## 📋 Remaining Pages to Create

### Blog Pages (4 files)
- `src/pages/fr/blog/index.astro` - Blog listing page
- `src/pages/fr/blog/all-articles.astro` - All articles page
- `src/pages/fr/blog/[category].astro` - Blog category pages
- `src/pages/fr/blog/[...slug].astro` - Individual blog post pages

### Day Tours Pages (2 files)
- `src/pages/fr/circuits-prives-islande/index.astro` - Day tours listing
- `src/pages/fr/circuits-prives-islande/[...slug].astro` - Individual day tour pages

### Multiday Tours Pages (2 files)
- `src/pages/fr/circuits-multi-jours-islande/index.astro` - Multiday tours listing
- `src/pages/fr/circuits-multi-jours-islande/[...slug].astro` - Individual multiday tour pages

### Partner Experiences Pages (4 files)
- `src/pages/fr/experiences-partenaires-islande/index.astro` - Experiences listing
- `src/pages/fr/experiences-partenaires-islande/[category].astro` - Experiences by category
- `src/pages/fr/experiences-partenaires-islande/exclusive.astro` - Exclusive experiences
- `src/pages/fr/experiences-partenaires-islande/[...slug].astro` - Individual experience pages

## 🔑 Key Changes for Each French Page

1. **Language attribute**: `<html lang="fr">`
2. **Collections**: Use `_FR` instead of `_EN` (e.g., `getCollection('tours_FR')`)
3. **Props**: Pass `currentLang="fr"` to all components
4. **Hreflang tags**: Update to point to French URLs
5. **Canonical URLs**: Update to French URLs (e.g., `https://www.lilja-tours.com/fr/...`)
6. **Meta tags**: Update og:locale to `fr_FR` (primary) and `en_US` (alternate)
7. **Links**: All internal links must point to `/fr/` routes
8. **Content**: Mark with `[FR TRANSLATION NEEDED]` placeholder

## 📝 Template Pattern

```astro
---
// Import French collections
const data = await getCollection('collection_FR');
---

<html lang="fr">
  <head>
    <meta name="description" content="[FR TRANSLATION NEEDED]...">
    <link rel="alternate" hreflang="fr" href="https://www.lilja-tours.com/fr/..." />
    <link rel="alternate" hreflang="en" href="https://www.lilja-tours.com/..." />
    <link rel="canonical" href="https://www.lilja-tours.com/fr/..." />

    <meta property="og:locale" content="fr_FR">
    <meta property="og:locale:alternate" content="en_US">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-48C94854K2"></script>
    ...

    <!-- TrustIndex -->
    <script type="text/javascript" defer async src="https://cdn.trustindex.io/assets/js/richsnippet.js?505b36156145g5ee"></script>
  </head>
  <body>
    <Topbar frenchUrl="[EN_URL]" currentLang="fr" />
    <main>
      <!-- Content with [FR TRANSLATION NEEDED] markers -->
    </main>
    <Footer currentLang="fr" />
  </body>
</html>
```

## ⚠️ Important Notes

- All content text is marked with `[FR TRANSLATION NEEDED]` - actual translation comes later
- Infrastructure is set up correctly (collections, props, URLs)
- Internal links must point to `/fr/` routes
- Images and assets remain the same (language-neutral)
- Only alt texts need translation (handled in content files)

## 🔄 Next Steps

**Option A - Create all remaining pages now** (12 files)
- Time-intensive but complete
- Ready for content translation immediately

**Option B - Create as needed** (gradual approach)
- Start with most important pages first
- Day tours and multiday tours are priority
- Blog and experiences can come later

**Option C - Use a script/template** (efficient)
- Create a template generator script
- Automatically creates all French pages from English equivalents
- Faster and less error-prone
