# Lilja Tours Website

## Project Overview

New website for Lilja Tours (https://www.lilja-tours.com), an Iceland-based tour operator specializing in private tours - both ready-to-book day tours and customized multiday tours. Project is ~50% complete.

## Core Principles

- **Maintain design consistency** with existing patterns and components
- **Never duplicate content** between pages - each page must have unique text
- All copywriting follows SEO best practices

## Copywriting & SEO Rules

### The 3 Kings Rule

Every page MUST have the primary keyword in:

1. `<title>` tag
2. `<h1>` heading
3. Introductory text (first paragraph)

### Character Limits (STRICT)

- **Meta descriptions**: 160 characters maximum
- **Header introductory texts**: 350 characters maximum
- **Visit/tour descriptions**: 2,000 characters maximum, formatted in 2-3 paragraphs

### Content Guidelines

- Write as an SEO copywriter specializing in travel/tourism
- Use natural, engaging language that appeals to travelers
- Include relevant keywords organically without keyword stuffing
- Focus on benefits and unique selling points
- Each page needs completely unique content - no copy-pasting between pages
- For the partners-experiences-iceland collection: Use pictures from /pictures/excursions/, and only the .webp. Do not use .avif. If you do not find a picture, use placeholder.
- For blog articles, adapt the style to something concise and efficient. Do not overuse meliorative adjectives.
- For blog articles, you are in charge of all the datas in the frontmatter. You must consistently always use the same schema for the frontmatter across articles. **All blog articles must include `urlOtherLang` field in frontmatter for future French translation** (e.g., `urlOtherLang: "/fr/blog/article-slug/"`). Regarding the body, I will first write the article myself, and you will use this as a base to rewrite the article yourself, while preserving its structure as much as possible and do not use H1 in the body. You will also have to add links to other pages of the website according to the body content (look in all collections and generated pages), and add pictures too.
- Pictures to use for blog articles will be found in /pictures/blog/articles. There will be pictures with the -card suffix, to use for the article card, with the -header-pc and -header-mobile suffix to use as header pictures (use responsiveness). Other pictures with no suffix must be used within the article. Their name should help you place them in the correct spot.
- **For blog articles in the Photographies category**: These are picture-centered articles showcasing visual experiences. Sections should have minimal text with maximum pictures. Focus on visual storytelling rather than descriptive writing.

## JSON-LD Structured Data (CRITICAL)

**Every page must include extended, highly detailed JSON-LD structured data.**

Requirements:

- Include as much detail as possible in the schema
- Reference existing JSON-LD implementations in the project for inspiration and structure
- Use appropriate schema.org types (TourPackage, Product, TouristAttraction, LocalBusiness, etc.)
- Include all relevant properties: name, description, offers, provider, location, aggregateRating, review, etc.
- Make it as comprehensive as existing examples - don't skimp on detail

## Technical Notes

- Project language: English (owner is French, website targets international travelers)
- Target audience: Travelers interested in private, customized Iceland tours
- Geographic focus: Iceland tourism
- Each time a new page is created, Google Analytics tag must be added:
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-48C94854K2"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-48C94854K2');
  </script>

- All future pages must have this code (Only once) inside of the head tag: <script type="text/javascript" defer async src="https://cdn.trustindex.io/assets/js/richsnippet.js?505b36156145g5ee"></script>

## When Writing Content

1. Check existing pages to avoid content duplication
2. Verify character counts before finalizing
3. Ensure keyword appears in title, h1, and intro
4. Keep meta descriptions concise and compelling
5. Structure visit descriptions with 2-3 clear paragraphs
6. Create comprehensive JSON-LD following existing page examples

---

## French Translation System

### Overview

The website is bilingual (English/French) with a structured translation system. French content follows the same patterns as English but lives in separate collections and page routes.

### Folder Structure

**Content Collections:**
```
src/content/
├── blog_articles_EN/        (existing)
├── blog_articles_FR/        (French blog articles)
├── multiday_tours_EN/       (existing)
├── multiday_tours_FR/       (French multiday tours)
├── partner_experiences_EN/  (existing)
├── partner_experiences_FR/  (French partner experiences)
├── tours_EN/                (existing)
├── tours_FR/                (French day tours)
└── config.ts                (defines all EN/FR collections)
```

**Page Routes:**
```
src/pages/
├── [English pages at root]
└── fr/                                    (French section)
    ├── index.astro                        (French homepage)
    ├── blog/
    ├── circuits-prives-islande/           (Day tours)
    ├── circuits-multi-jours-islande/      (Multiday tours)
    └── experiences-partenaires-islande/   (Partner experiences)
```

### URL Mapping Reference

| English URL | French URL |
|-------------|------------|
| `/` | `/fr/` |
| `/private-day-tours-iceland/` | `/fr/circuits-prives-islande/` |
| `/multiday-tours-iceland/` | `/fr/circuits-multi-jours-islande/` |
| `/partner-experiences-iceland/` | `/fr/experiences-partenaires-islande/` |
| `/blog/` | `/fr/blog/` |
| `/contact/` | `/fr/contact/` |

**Example tour mappings:**
- `/private-day-tours-iceland/golden-circle-complete-farm-to-table/` → `/fr/circuits-prives-islande/cercle-or-complet-ferme-table/`
- `/multiday-tours-iceland/ring-road-essentials-7-days/` → `/fr/circuits-multi-jours-islande/route-1-essentiel-7-jours/`

### Link Replacement Rule (CRITICAL)

**IMPORTANT:** When translating content to French, ALL links must be replaced with their French counterparts:

- **Frontmatter links** (url, urlOtherLang, canonicalUrl, hreflangAlternates)
- **HTML links** (`<a href="">`, `<link>` tags)
- **Body content links** (markdown links `[text](url)`)

**This means:**
- ❌ Do NOT just translate the link text while keeping the English URL
- ❌ Do NOT keep links pointing to English pages
- ✅ Replace the entire URL with the corresponding French page URL
- ✅ Update internal links to point to `/fr/` routes
- ✅ Maintain external links (but translate link text if needed)

**Example:**

English content:
```markdown
Learn more about our [Golden Circle tour](/private-day-tours-iceland/golden-circle-complete-farm-to-table/)
```

French content (CORRECT):
```markdown
En savoir plus sur notre [circuit du Cercle d'Or](/fr/circuits-prives-islande/cercle-or-complet-ferme-table/)
```

French content (WRONG):
```markdown
En savoir plus sur notre [circuit du Cercle d'Or](/private-day-tours-iceland/golden-circle-complete-farm-to-table/)
```

### Content File Pairing

Each English file has a French counterpart with mirrored filename:

```
tours_EN/golden-circle-complete.mdx → tours_FR/golden-circle-complete.mdx
```

**Frontmatter structure (bidirectional):**

English version:
```yaml
language: "en"
slug: "golden-circle-complete-farm-to-table"
url: "/private-day-tours-iceland/golden-circle-complete-farm-to-table/"
urlOtherLang: "/fr/circuits-prives-islande/cercle-or-complet-ferme-table/"
canonicalUrl: "https://www.lilja-tours.com/private-day-tours-iceland/golden-circle-complete-farm-to-table/"
hreflangAlternates:
  - lang: "en"
    url: "https://www.lilja-tours.com/private-day-tours-iceland/golden-circle-complete-farm-to-table/"
  - lang: "fr"
    url: "https://www.lilja-tours.com/fr/circuits-prives-islande/cercle-or-complet-ferme-table/"
```

French version:
```yaml
language: "fr"
slug: "cercle-or-complet-ferme-table"
url: "/fr/circuits-prives-islande/cercle-or-complet-ferme-table/"
urlOtherLang: "/private-day-tours-iceland/golden-circle-complete-farm-to-table/"
canonicalUrl: "https://www.lilja-tours.com/fr/circuits-prives-islande/cercle-or-complet-ferme-table/"
hreflangAlternates:
  - lang: "en"
    url: "https://www.lilja-tours.com/private-day-tours-iceland/golden-circle-complete-farm-to-table/"
  - lang: "fr"
    url: "https://www.lilja-tours.com/fr/circuits-prives-islande/cercle-or-complet-ferme-table/"
```

### Component Translation Strategy

**Use centralized translation object** (`src/i18n/translations.ts`):

```typescript
export const translations = {
  en: {
    nav: { dayTours: "Day tours", ... },
    footer: { explore: "Explore", ... },
    cta: { bookNow: "Book Now", ... }
  },
  fr: {
    nav: { dayTours: "Circuits journée", ... },
    footer: { explore: "Explorer", ... },
    cta: { bookNow: "Réserver", ... }
  }
};
```

**Usage in components:**
```astro
---
import { translations } from '../i18n/translations';
const { currentLang } = Astro.props;
const t = translations[currentLang];
---
<a href={currentLang === 'en' ? '/private-day-tours-iceland/' : '/fr/circuits-prives-islande/'}>
  {t.nav.dayTours}
</a>
```

### French Translation Character Count Rule (CRITICAL FOR DESIGN)

To preserve design integrity and prevent text overflow, French translations for the following elements **MUST be equal to or shorter** than their English counterparts:

- **Texts in cards** (ItineraryCard, MultidayItineraryCard, BlogCard, ActivityCard)
- **`<meta>` tags** (titles, descriptions, Open Graph properties)
- **Titles** (`<h1>`, `<h2>`, `<h3>`, page titles in `<title>` tags)
- **Texts in headers** (HomeHeader, section headers, navigation items)
- **Texts in activity cards** (ActivityFlipCard labels and descriptions)

**Why this matters:** These elements have fixed layouts. French text exceeding English length will cause text overflow, broken card layouts, misaligned UI elements, poor mobile responsiveness, and unprofessional appearance.

**Implementation:** Prioritize conciseness. Use shorter French equivalents, abbreviations where appropriate, or rephrase to convey the same meaning in fewer characters. Test translations in actual UI components to verify they fit properly.

### French SEO Requirements

French pages follow the same SEO rules as English pages:

**The 3 Kings Rule (MANDATORY):**
Every French page must have the primary French keyword in:
1. `<title>` tag
2. `<h1>` heading
3. Introductory text (first paragraph)

**Character Limits (STRICT):**
- Meta descriptions: 160 characters maximum
- Header introductory texts: 350 characters maximum
- Visit/tour descriptions: 2,000 characters maximum (2-3 paragraphs)

**Content Guidelines:**
- Write as SEO copywriter specializing in travel/tourism
- Natural, engaging French for travelers
- Include relevant French keywords organically (may differ from literal translations)
- Focus on benefits and unique selling points
- Each page must have completely unique content

### Technical Requirements for French Pages

**Every French page must include:**

1. **Google Analytics tag** (same as English)
2. **TrustIndex script** (same as English)
3. **Correct HTML lang attribute:**
   ```html
   <html lang="fr">
   ```
4. **Hreflang tags:**
   ```html
   <link rel="alternate" hreflang="en" href="https://www.lilja-tours.com/[en-url]/" />
   <link rel="alternate" hreflang="fr" href="https://www.lilja-tours.com/fr/[fr-url]/" />
   <link rel="canonical" href="https://www.lilja-tours.com/fr/[fr-url]/" />
   ```

### Content Translation Checklist

For each French content file, ensure:

**Frontmatter:**
- [ ] `language: "fr"`
- [ ] `slug` is French (e.g., "cercle-or-complet")
- [ ] `url` points to correct FR path
- [ ] `urlOtherLang` points to EN version
- [ ] `canonicalUrl` is full FR URL
- [ ] `hreflangAlternates` includes both EN and FR
- [ ] All SEO fields translated (title, metaDescription)
- [ ] All array fields translated (highlights, included, etc.)
- [ ] **ALL links replaced with French counterparts**
- [ ] **`category` field: Keep in English** (do NOT translate - used for filtering/grouping)

**Content Body:**
- [ ] All headings translated
- [ ] All paragraphs translated
- [ ] **Body text approximately 50% shorter than English version** (concise, direct style)
- [ ] Maintain proper markdown structure
- [ ] **ALL internal links replaced with French URLs**
- [ ] External links kept (translate link text only)
- [ ] Check character limits (meta: 160, **introductoryText: 280 max**, descriptions: 2000)
- [ ] Ensure "3 Kings Rule" compliance

**Images:**
- [ ] `cardImg.alt` translated
- [ ] All image alt texts in body translated
- [ ] Image files are language-neutral (reused for both EN/FR)

**Structured Data:**
- [ ] JSON-LD translated (descriptions, names)
- [ ] Correct `inLanguage: "fr"` property
- [ ] **URLs in schema point to FR version**

### JSON-LD Translation Guidelines (CRITICAL)

**French JSON-LD must match the richness and structure of English JSON-LD.** Every French tour/experience must include the complete JSON-LD schema with all properties.

**Required JSON-LD Structure for French Tours:**

```yaml
jsonLD:
  "@context": "https://schema.org"
  "@type": "TouristTrip"
  "name": "[French page title]"
  "alternateName": "[French short name]"
  "description": "[French meta description]"
  "url": "[Full French canonical URL]"
  "image":
    - "[Featured image URL]"
    - "[Visit image URLs...]"
  "provider":
    "@type": "TravelAgency"
    "name": "Lilja Tours"
    "alternateName": "Lilja Tours Iceland"
    "url": "https://www.lilja-tours.com"
    "logo": "https://www.lilja-tours.com/Lilja-Tours-Logo.jpg"
    "sameAs":
      - "https://www.instagram.com/lilja_tours"
      - "https://www.facebook.com/LiljaTours"
    "address":
      "@type": "PostalAddress"
      "addressCountry": "IS"
      "addressLocality": "Reykjavik"
      "addressRegion": "Capital Region"  # Keep in English
    "telephone": "+354 764 3715"
    "email": "info@lilja-tours.com"
    "foundingDate": "2021"
    "aggregateRating":
      "@type": "AggregateRating"
      "ratingValue": "5.0"
      "reviewCount": "150"
      "bestRating": "5"
      "worstRating": "1"
  "offers":
    - "@type": "Offer"
      "name": "[French offer name]"
      "description": "[French offer description]"
      "price": "[Price in ISK]"
      "priceCurrency": "ISK"
      "availability": "https://schema.org/InStock"
      "validFrom": "[Start date]"
      "validThrough": "[End date]"
      "url": "[French page URL]"
      "category": "[French category]"
      "eligibleQuantity":
        "@type": "QuantitativeValue"
        "minValue": 1
        "maxValue": [max passengers]
        "unitText": "passagers"  # French
  "duration": "[ISO 8601 format, e.g., PT6H]"
  "touristType": "[French tour type]"
  "startLocation":
    "@type": "Place"
    "name": "Reykjavik"
    "address":
      "@type": "PostalAddress"
      "addressLocality": "Reykjavik"
      "addressCountry": "IS"
    "geo":
      "@type": "GeoCoordinates"
      "latitude": 64.1466
      "longitude": -21.9426
  "location":
    "@type": "Place"
    "name": "[French location name]"
    "address":
      "@type": "PostalAddress"
      "addressLocality": "[Location name]"
      "addressRegion": "[French region, e.g., 'Sud de l'Islande']"
      "addressCountry": "IS"
    "geo":
      "@type": "GeoCoordinates"
      "latitude": [coordinates]
      "longitude": [coordinates]
  "itinerary":
    - "@type": "TouristDestination"
      "name": "[French visit name]"
      "description": "[French visit description]"
      "geo":
        "@type": "GeoCoordinates"
        "latitude": [coordinates]
        "longitude": [coordinates]
      "touristType": "[French type, e.g., 'Cascade', 'Site Géothermique']"
      "image": "[Visit image URL]"
  "audience":
    "@type": "PeopleAudience"
    "audienceType": "[French audience, e.g., 'Touristes Aventuriers']"
    "geographicArea":
      "@type": "Place"
      "name": "Monde entier"  # French
  "inLanguage": "fr"  # CRITICAL - Must be "fr" for French pages
  "isAccessibleForFree": false
  "keywords":
    - "[French keywords relevant to SEO]"
  "mainEntityOfPage":
    "@type": "WebPage"
    "@id": "[Full French canonical URL]"
  "datePublished": "[YYYY-MM-DD]"
  "dateModified": "[YYYY-MM-DD]"
  "publisher":
    "@type": "Organization"
    "name": "Lilja Tours"
    "logo":
      "@type": "ImageObject"
      "url": "https://www.lilja-tours.com/Lilja-Tours-Logo.jpg"
  "breadcrumb":
    "@type": "BreadcrumbList"
    "itemListElement":
      - "@type": "ListItem"
        "position": 1
        "name": "Accueil"  # French
        "item": "https://www.lilja-tours.com/fr/"
      - "@type": "ListItem"
        "position": 2
        "name": "Circuits Privés en Islande"  # French section name
        "item": "https://www.lilja-tours.com/fr/circuits-prives-islande/"
      - "@type": "ListItem"
        "position": 3
        "name": "[French tour name]"
        "item": "[Full French canonical URL]"
```

**JSON-LD Translation Checklist:**
- [ ] `name` and `alternateName` translated to French
- [ ] `description` matches French metaDescription
- [ ] `url` points to French page (full URL with https://www.lilja-tours.com/fr/...)
- [ ] `provider` section stays mostly in English (company info) except `addressRegion` if translating
- [ ] `offers.name` and `offers.description` translated
- [ ] `offers.url` points to French page
- [ ] `offers.eligibleQuantity.unitText` = "passagers" (French)
- [ ] `touristType` translated to French category
- [ ] `location.addressRegion` translated (e.g., "Sud de l'Islande")
- [ ] `itinerary[].name` and `itinerary[].description` translated
- [ ] `itinerary[].touristType` translated
- [ ] `audience.audienceType` translated to French
- [ ] `audience.geographicArea.name` = "Monde entier" (French)
- [ ] `inLanguage` = "fr" (CRITICAL)
- [ ] `keywords` are French SEO keywords (not just literal translations)
- [ ] `mainEntityOfPage.@id` is French URL
- [ ] `breadcrumb` items have French names and French URLs

**Common French Translations for JSON-LD:**
| English | French |
|---------|--------|
| Adventure Tour | Circuit Aventure |
| Cultural Tour | Circuit Culturel |
| Private Tour | Circuit Privé |
| Highland Adventure | Aventure Hautes Terres |
| Island Adventure | Aventure Insulaire |
| Northern Lights Tour | Circuit Aurores Boréales |
| passengers | passagers |
| Worldwide | Monde entier |
| Home | Accueil |
| Private Day Tours Iceland | Circuits Privés en Islande |
| Waterfall | Cascade |
| Geothermal Site | Site Géothermique |
| Volcano | Volcan |
| Glacier | Glacier |
| National Park | Parc National |
| Wildlife | Faune |
| South Iceland | Sud de l'Islande |
| West Iceland | Ouest de l'Islande |
| Highlands | Hautes Terres d'Islande |
| Capital Region | Région Capitale |

### Translation Workflow

1. **Create FR collection file** with same filename as EN version
2. **Copy frontmatter structure** from EN file
3. **Update all URLs** to French equivalents
4. **Translate all content** while respecting character limits
5. **Replace all internal links** with French URLs
6. **Translate JSON-LD** structured data
7. **Verify hreflang** tags are bidirectional
8. **Test page** renders correctly with French content

### Best Practices

1. **Maintain Consistency:**
   - Use same file naming in both EN and FR folders
   - Keep frontmatter structure identical between languages
   - Use consistent translation terminology

2. **SEO Optimization:**
   - Research French keywords (may differ from literal translations)
   - Adapt meta descriptions for French market
   - Ensure natural, native-sounding French copy

3. **Quality Control:**
   - Have native French speaker review translations
   - Test all links and navigation
   - Verify forms and interactive elements work correctly
   - Test language switcher on all page types

4. **Maintenance:**
   - When updating EN content, remember to update FR version
   - Keep translation file organized and well-commented
   - Document language-specific features or exceptions
