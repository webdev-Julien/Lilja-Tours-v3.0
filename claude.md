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

- **Page titles (`pageTitle`)**: 60 characters maximum
- **Meta descriptions (`metaDescription`)**: 130-155 characters target range (minimum 120, maximum 160)
- **Header introductory texts**: 350 characters maximum
- **Visit/tour descriptions**: 2,000 characters maximum, formatted in 2-3 paragraphs
- **Partner experiences `introductoryText`**: 230 characters maximum
- **Partner experiences `Good to Know` paragraph**: Keep concise (approximately 350-500 characters). Focus on essential practical information only: operation schedule, location, duration, group size, cancellation policy, key requirements, and booking notes.

### Title Standards (STRICT)

Every `pageTitle` (and `<title>` tag in static .astro pages) MUST follow these rules:

1. **Brand suffix**: Always end with ` | Lilja Tours` (exactly this format, with spaces around the pipe)
2. **Max 60 characters** including the brand suffix
3. **Front-load the primary keyword** before the pipe — put the most important terms first
4. **No redundant words**: Avoid filler like "Discover", "Explore", "Experience" when they eat into the 60-char limit
5. **For evergreen blog guides**: Include the current year in the title (e.g., "Golden Circle Guide 2026 | Lilja Tours"). Do NOT add year to trip reports, photo articles, or news articles.
6. **`og:title`** must always match `pageTitle` exactly

**Examples:**
- `"Golden Circle Private Tour | Lilja Tours"` (40 chars)
- `"Keflavík to Reykjavík Transfer | Lilja Tours"` (47 chars)
- `"Best Hotels in Reykjavík 2026 | Lilja Tours"` (46 chars)

### Meta Description Standards (STRICT)

Every `metaDescription` (and `<meta name="description">` in static .astro pages) MUST follow these rules:

1. **Target 130-155 characters** — long enough to be informative, short enough to avoid truncation
2. **End with a natural CTA** — every description must close with a call to action (e.g., "Book your private tour today!", "Plan your Iceland trip now!", "Reserve your spot!", "Explore our tours!")
3. **Vary opening words** — never start multiple pages in the same category with the same opening word. Avoid formulaic patterns like always starting with "Discover..." or "Explore..."
4. **Be specific and compelling** — mention concrete details (destinations, unique features, duration) rather than generic travel language
5. **`og:description`** must always match `metaDescription` exactly

**Examples of varied openings across day tours:**
- "Journey through Iceland's Golden Circle with a private guide..."
- "Hike Sólheimajökull glacier on this private south coast tour..."
- "Witness the raw beauty of Reykjanes Peninsula with your own driver..."

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

    // Set linker before the config command
    gtag('set', 'linker', {
      'domains': ['bokun.io']
    });

    gtag('js', new Date());
    gtag('config', 'G-48C94854K2');
  </script>

- All future pages must have this code (Only once) inside of the head tag: <script type="text/javascript" defer async src="https://cdn.trustindex.io/assets/js/richsnippet.js?505b36156145g5ee"></script>

## Images in MDX Content (Cloudflare Transformations)

### How It Works

Images in MDX blog articles automatically use Cloudflare Image Transformations for optimized delivery. This is handled via MDX component mapping - **no special syntax required**.

**Standard markdown image syntax works automatically:**
```markdown
![Alt text for the image](/pictures/blog/articles/article-name/image-name.jpg)
```

This will be transformed at build time to include:
- Responsive `srcset` with breakpoints: 640w, 1280w, 1920w, 2400w
- Cloudflare transformation URL: `/cdn-cgi/image/width=X,format=auto,quality=85,fit=scale-down,metadata=none/...`
- Lazy loading (`loading="lazy"`)
- Async decoding (`decoding="async"`)

### Transformation Parameters

All MDX images use these Cloudflare parameters:
- `format=auto` - Automatic format selection (WebP/AVIF where supported)
- `quality=85` - Good balance of quality and file size
- `fit=scale-down` - Never upscale, only downscale
- `metadata=none` - Strip EXIF data for smaller files

### File Locations

- **Component:** `src/components/MdxImage.astro`
- **MDX config:** `src/components/mdx/index.ts`
- **Image utils:** `src/utils/images.ts`

### Usage Examples

**Basic image (recommended):**
```markdown
![Þingvellir National Park with continental rift](/pictures/blog/articles/ultimate-golden-circle-guide/ultimate-golden-circle-guide-Thingvellir.jpg)
```

**Image with title attribute:**
```markdown
![Alt text](/pictures/path/image.jpg "Optional title")
```

### Development vs Production

- **Development:** Images serve directly without transformations
- **Production:** Images automatically get Cloudflare CDN URLs with transformations

### Important Notes

1. **Use relative paths** starting with `/pictures/...`
2. **Alt text is required** for accessibility
3. **No need to import** the MdxImage component - it's applied automatically
4. **Works for both EN and FR** blog articles

## When Writing Content

1. Check existing pages to avoid content duplication
2. Verify `pageTitle` is ≤60 chars and ends with `| Lilja Tours`
3. Verify `metaDescription` is 130-155 chars and ends with a natural CTA
4. Ensure `og:title` matches `pageTitle` and `og:description` matches `metaDescription`
5. Ensure keyword appears in title, h1, and intro (3 Kings Rule)
6. Vary meta description opening words — check existing pages in the same category to avoid repetition
7. For evergreen blog guides, include the current year in the title
8. Structure visit descriptions with 2-3 clear paragraphs
9. Create comprehensive JSON-LD following existing page examples
10. For French pages: verify `pageTitle` length is ≤ English counterpart

---

## Transfers Collection (Private Chauffeur Services)

### Overview

The Transfers section provides private chauffeuring services between destinations in Iceland. This is for discerning travelers who want to reach far-away destinations with private transportation without joining a tour.

**Navigation Link Text:** "Journeys" (in both Topbar and Footer)

### URL Structure

| English URL | French URL |
|-------------|------------|
| `/transfers-iceland/` | `/fr/transferts-islande/` |
| `/transfers-iceland/[slug]/` | `/fr/transferts-islande/[slug]/` |

### Folder Structure

**Content Collections:**
```
src/content/
├── transfers_EN/            (English transfers)
├── transfers_FR/            (French transfers)
└── config.ts                (update to include transfer collections)
```

**Page Routes:**
```
src/pages/
├── transfers-iceland/
│   ├── index.astro          (List page with tabs)
│   └── [...slug].astro      (Individual transfer pages)
└── fr/
    └── transferts-islande/
        ├── index.astro      (French list page)
        └── [...slug].astro  (French individual pages)
```

### Transfer Categories

Transfers are divided into two categories (displayed as tabs on list page):
1. **Airport/Harbour Transfers** - category includes `"airport-harbour"`
2. **Hotel Transfers** - category includes `"hotel"`

**Note:** A transfer can belong to multiple categories (e.g., airport-to-hotel transfer appears in both tabs).

---

### List Page Structure (`/transfers-iceland/`)

#### Header Section
- **Style:** Same as `/private-day-tours-iceland/` or `/multiday-tours-iceland/` (short video background, overlay title, small text)
- **Messaging:** Convey that this page is for discerning travelers looking to reach far-away destinations with private transportation without going on a tour
- **CTA Button:** "Request a Transfer" - internal anchor link to the form section (`#transfer-request-form`)

#### Services Section (After Header)
- **h2** introducing the services
- **Text** detailing services:
  - Child seats available on request
  - Premium vehicles
  - Professional luggage handling
  - Experienced English-speaking drivers
  - Door-to-door service

#### Tabs Section
Two tabs to switch between transfer types:
1. **Airport/Harbour Transfers**
2. **Hotel Transfers**

#### Transfer Cards (In Each Tab)
Simple cards displaying:
- **Picture** (from `/pictures/transfers/`)
- **Title**
- **Duration**
- **Concise text** (e.g., "Hassle-free transfer to Rangá Hotel")
- **Price**
- **Two buttons:**
  - "Learn More" → links to collection item page
  - "Book Now" → links to `bookingLink` in frontmatter

#### Transfer Request Form Section
**Form ID:** `transfer-request-form` (for CTA anchor link)

**Required Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Departure Place | Text | Yes | |
| Arrival Place | Text | Yes | |
| Number of People | Number | Yes | |
| Date | Date | Yes | |
| Time | Time | No | |
| Number of Children | Number | Yes | Default: 0 |
| Age of Children | Text | No | Only show if children > 0 |
| Luggage Information | Long Text | No | Placeholder: "We have a large trunk, but sometimes a trailer might be needed. Please describe your luggage (large, medium, small suitcases, special equipment, etc.)" |

**Airport Transfer Subsection:**
Header: "If this is an airport transfer, please fill the following fields"
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Flight Number | Text | No | |
| Flight Time | Time | No | |

#### Footer
Standard website footer

---

### Individual Transfer Page Structure (`/transfers-iceland/[slug]/`)

#### Header Section
- **Style:** Classic header with picture background (similar to `/private-day-tours-iceland/[slug].astro` or `/multiday-tours-iceland/[slug].astro`)
- **h1:** Transfer title
- **Introductory text:** Very short description

#### Main Content Section
- **h2:** Service details heading
- **Short text:** A few sentences about the transfer
- **Inclusions list:** What's included
- **Exclusions list:** What's not included
- **"BOOK NOW" CTA button** → links to `bookingLink`
- **Booking Disclaimer:** Discrete text stating:
  > "Please note: Bookings are not instant and must be confirmed by our services. Confirmation usually takes 24 hours but can in some cases take up to 72 hours."

#### Related Day Tours Section (OPTIONAL)
- **When to include:** Only if specific tours are provided when creating the transfer entry
- **When to skip:** If no tours are specified, omit this section entirely
- **Display:** Same card components as found on `/private-day-tours-iceland/`
- **Content:** Tours specified during transfer creation

#### Other Transfers Suggestions Section
- **h2:** "Other Journeys You Might Like" (or similar)
- **Display:** 3 transfer cards
- **Selection:** Randomly generated at build time from other transfers in the collection

#### Footer
Standard website footer

---

### Content Frontmatter Schema

```yaml
# Required fields
language: "en"  # or "fr"
slug: "keflavik-to-reykjavik"
url: "/transfers-iceland/keflavik-to-reykjavik/"
urlOtherLang: "/fr/transferts-islande/keflavik-vers-reykjavik/"
canonicalUrl: "https://www.lilja-tours.com/transfers-iceland/keflavik-to-reykjavik/"
hreflangAlternates:
  - lang: "en"
    url: "https://www.lilja-tours.com/transfers-iceland/keflavik-to-reykjavik/"
  - lang: "fr"
    url: "https://www.lilja-tours.com/fr/transferts-islande/keflavik-vers-reykjavik/"

# SEO (pageTitle ≤60 chars, metaDescription 130-155 chars with CTA, og:title = pageTitle, og:description = metaDescription)
pageTitle: "Keflavík to Reykjavík Transfer | Lilja Tours"
metaDescription: "Private transfer from Keflavík Airport to your Reykjavík hotel. Premium vehicle, professional driver, luggage handling. Book now!"
ogImage: "/pictures/transfers/keflavik-reykjavik.webp"

# Content
title: "Keflavik Airport to Reykjavik"
introductoryText: "Start your Iceland adventure with a comfortable private transfer from Keflavik International Airport to your Reykjavik accommodation."
cardText: "Hassle-free private transfer from the airport to your hotel"

# Category (for tab filtering) - can belong to multiple categories
category:
  - "airport-harbour"  # and/or "hotel" - DO NOT TRANSLATE

# Pricing & Booking
price: 35000  # in ISK
bookingLink: "https://..."
duration: "PT45M"  # ISO 8601 format

# Images
cardImg:
  src: "/pictures/transfers/keflavik-reykjavik-card.webp"
  alt: "Private transfer vehicle at Keflavik Airport"
headerImg:
  src: "/pictures/transfers/keflavik-reykjavik-header.webp"
  alt: "Scenic drive from Keflavik to Reykjavik"

# Service Details
included:
  - "Private premium vehicle"
  - "Professional English-speaking driver"
  - "Luggage handling"
  - "Door-to-door service"
  - "Child seat on request"
excluded:
  - "Sightseeing stops (Driving service only)"
  # Add specific exclusions if applicable (e.g., "Blue Lagoon entrance tickets")

# Related Content (OPTIONAL - omit if not specified)
relatedTours:
  - "golden-circle-complete"
  - "blue-lagoon-reykjanes"

# JSON-LD (see schema below)
jsonLD:
  # ... (complete schema)
```

---

### Character Limits for Transfers

| Element | Max Characters |
|---------|----------------|
| Page title (`pageTitle`) | 60 (including `\| Lilja Tours`) |
| Meta description | 130-155 (with CTA) |
| Header introductory text | 350 |
| Card text | 100 |
| Main content text | 1,000 |

---

### Standard Exclusions for Transfers

**All transfers use this standard exclusion:**
- English: `"Sightseeing stops (Driving service only)"`
- French: `"Arrets pour visites (service de transport uniquement)"`

**Additional exclusions when applicable:**
- For Blue Lagoon transfers:
  - English: `"Blue Lagoon entrance tickets (must be booked separately)"`
  - French: `"Billets d'entree au Blue Lagoon (a reserver separement)"`

**Do NOT include these as exclusions:**
- ~~Meals and refreshments~~ / ~~Repas et rafraichissements~~
- ~~Gratuities~~ / ~~Pourboires~~

---

### JSON-LD Schema for Transfers

Use `@type: "Service"` with `serviceType: "TransportService"`:

```yaml
jsonLD:
  "@context": "https://schema.org"
  "@type": "Service"
  "serviceType": "TransportService"
  "name": "[Transfer title]"
  "description": "[Meta description]"
  "url": "[Full canonical URL]"
  "image": "[Header image URL]"
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
      "addressRegion": "Capital Region"
    "telephone": "+354 764 3715"
    "email": "info@lilja-tours.com"
    "aggregateRating":
      "@type": "AggregateRating"
      "ratingValue": "5.0"
      "reviewCount": "150"
      "bestRating": "5"
      "worstRating": "1"
  "areaServed":
    "@type": "Country"
    "name": "Iceland"
  "offers":
    "@type": "Offer"
    "price": "[Price in ISK]"
    "priceCurrency": "ISK"
    "availability": "https://schema.org/InStock"
    "url": "[Page URL]"
    "validFrom": "[Start date]"
    "validThrough": "[End date]"
  "termsOfService": "Bookings require confirmation within 24-72 hours"
  "providerMobility": "dynamic"  # Service comes to customer
  "serviceOutput":
    "@type": "TransferAction"
    "fromLocation":
      "@type": "Place"
      "name": "[Departure location]"
      "address":
        "@type": "PostalAddress"
        "addressLocality": "[City/Location]"
        "addressCountry": "IS"
    "toLocation":
      "@type": "Place"
      "name": "[Arrival location]"
      "address":
        "@type": "PostalAddress"
        "addressLocality": "[City/Location]"
        "addressCountry": "IS"
  "duration": "[ISO 8601 format]"
  "inLanguage": "en"  # or "fr" for French
  "hasOfferCatalog":
    "@type": "OfferCatalog"
    "name": "Included Services"
    "itemListElement":
      - "@type": "Offer"
        "itemOffered":
          "@type": "Service"
          "name": "Private premium vehicle"
      - "@type": "Offer"
        "itemOffered":
          "@type": "Service"
          "name": "Professional driver"
      - "@type": "Offer"
        "itemOffered":
          "@type": "Service"
          "name": "Luggage handling"
  "audience":
    "@type": "PeopleAudience"
    "audienceType": "Travelers"
    "geographicArea":
      "@type": "Place"
      "name": "Worldwide"
  "mainEntityOfPage":
    "@type": "WebPage"
    "@id": "[Full canonical URL]"
  "breadcrumb":
    "@type": "BreadcrumbList"
    "itemListElement":
      - "@type": "ListItem"
        "position": 1
        "name": "Home"
        "item": "https://www.lilja-tours.com/"
      - "@type": "ListItem"
        "position": 2
        "name": "Journeys"
        "item": "https://www.lilja-tours.com/transfers-iceland/"
      - "@type": "ListItem"
        "position": 3
        "name": "[Transfer title]"
        "item": "[Full canonical URL]"
```

---

### Website Integration Requirements

#### Navigation (Topbar)
- Add "Journeys" link in main navigation
- Link to `/transfers-iceland/` (EN) or `/fr/transferts-islande/` (FR)

#### Footer
- Add "Journeys" link in footer navigation
- Same URL pattern as topbar

#### Search Functionality
- Include `transfers_EN` and `transfers_FR` collections in search index
- Display transfer results with same efficiency as other collection types
- Search result cards should show: title, category badge, duration, price

---

### Pictures for Transfers

**Location:** `/pictures/transfers/`
**Format:** `.webp` only (do not use `.avif`)
**Naming Convention:**
- Card image: `[slug]-card.webp`
- Header image: `[slug]-header.webp`

---

### Creating a New Transfer Entry Checklist

1. [ ] Create EN file in `src/content/transfers_EN/[slug].mdx`
2. [ ] Create FR file in `src/content/transfers_FR/[slug].mdx`
3. [ ] Add images to `/pictures/transfers/`
4. [ ] Verify category array is correct (includes `airport-harbour` and/or `hotel`)
5. [ ] Ensure all URLs are correct in frontmatter
6. [ ] Complete JSON-LD schema
7. [ ] If related tours specified, verify slugs exist
8. [ ] If no related tours specified, ensure `relatedTours` field is omitted
9. [ ] Test both EN and FR pages render correctly
10. [ ] Verify search includes the new transfer

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
├── transfers_EN/            (English transfers)
├── transfers_FR/            (French transfers)
└── config.ts                (defines all EN/FR collections)
```

**Page Routes:**
```
src/pages/
├── [English pages at root]
├── transfers-iceland/                     (Transfers - EN)
│   ├── index.astro
│   └── [...slug].astro
└── fr/                                    (French section)
    ├── index.astro                        (French homepage)
    ├── blog/
    ├── circuits-prives-islande/           (Day tours)
    ├── circuits-multi-jours-islande/      (Multiday tours)
    ├── experiences-partenaires-islande/   (Partner experiences)
    └── transferts-islande/                (Transfers - FR)
        ├── index.astro
        └── [...slug].astro
```

### URL Mapping Reference

| English URL | French URL |
|-------------|------------|
| `/` | `/fr/` |
| `/private-day-tours-iceland/` | `/fr/circuits-prives-islande/` |
| `/multiday-tours-iceland/` | `/fr/circuits-multi-jours-islande/` |
| `/partner-experiences-iceland/` | `/fr/experiences-partenaires-islande/` |
| `/transfers-iceland/` | `/fr/transferts-islande/` |
| `/blog/` | `/fr/blog/` |
| `/contact/` | `/fr/contact/` |

**Example tour mappings:**
- `/private-day-tours-iceland/golden-circle-complete-farm-to-table/` → `/fr/circuits-prives-islande/cercle-or-complet-ferme-table/`
- `/multiday-tours-iceland/ring-road-essentials-7-days/` → `/fr/circuits-multi-jours-islande/route-1-essentiel-7-jours/`

**Example transfer mappings:**
- `/transfers-iceland/keflavik-to-reykjavik/` → `/fr/transferts-islande/keflavik-vers-reykjavik/`
- `/transfers-iceland/reykjavik-to-hotel-ranga/` → `/fr/transferts-islande/reykjavik-vers-hotel-ranga/`

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
transfers_EN/keflavik-to-reykjavik.mdx → transfers_FR/keflavik-to-reykjavik.mdx
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
- Page titles: 60 characters maximum (including `| Lilja Tours`), must be ≤ English counterpart length
- Meta descriptions: 130-155 characters target (max 160), must end with a natural CTA
- Header introductory texts: 350 characters maximum
- Visit/tour descriptions: 2,000 characters maximum (2-3 paragraphs)

**Title & Meta Description Rules (same as English):**
- Every `pageTitle` ends with ` | Lilja Tours`
- Every `metaDescription` ends with a natural French CTA (e.g., "Réservez dès maintenant !", "Planifiez votre voyage !")
- `og:title` = `pageTitle`, `og:description` = `metaDescription`
- Vary opening words across same-category pages

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
- [ ] `pageTitle` translated, ≤60 chars, ends with `| Lilja Tours`, ≤ EN counterpart length
- [ ] `metaDescription` translated, 130-155 chars, ends with French CTA, varied opening word
- [ ] `og:title` matches `pageTitle`, `og:description` matches `metaDescription`
- [ ] All array fields translated (highlights, included, etc.)
- [ ] **ALL links replaced with French counterparts**
- [ ] **`category` field: Keep in English** (do NOT translate - used for filtering/grouping)

**Content Body:**
- [ ] All headings translated
- [ ] All paragraphs translated
- [ ] **For partner experiences ONLY: Body text approximately 50% shorter than English version** (concise, direct style)
- [ ] **For blog articles: Translate fully, maintaining similar length to English version**
- [ ] Maintain proper markdown structure
- [ ] **ALL internal links replaced with French URLs**
- [ ] External links kept (translate link text only)
- [ ] Check character limits (title: 60, meta: 130-155 with CTA, **introductoryText: 280 max for experiences**, descriptions: 2000)
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
| Journeys | Trajets |
| Private Transfer | Transfert Privé |
| Airport Transfer | Transfert Aéroport |
| Hotel Transfer | Transfert Hôtel |
| Harbour Transfer | Transfert Port |
| Luggage handling | Prise en charge des bagages |
| Door-to-door service | Service porte à porte |
| Child seat | Siège enfant |
| Premium vehicle | Véhicule premium |
| Professional driver | Chauffeur professionnel |
| Book Now | Réserver |
| Learn More | En savoir plus |
| Request a Transfer | Demander un transfert |
| Other Journeys You Might Like | Autres trajets qui pourraient vous plaire |

### French Transfer Form Field Translations

When creating the French transfer request form, use these translations:

| English | French |
|---------|--------|
| Request a Transfer | Demander un transfert |
| Departure Place | Lieu de départ |
| Arrival Place | Lieu d'arrivée |
| Number of People | Nombre de personnes |
| Date | Date |
| Time | Heure |
| Number of Children | Nombre d'enfants |
| Age of Children | Âge des enfants |
| Luggage Information | Informations bagages |
| (Luggage placeholder) | "Nous avons un grand coffre, mais parfois une remorque peut être nécessaire. Décrivez vos bagages (grandes, moyennes, petites valises, équipement spécial, etc.)" |
| If this is an airport transfer, please fill the following fields | Si c'est un transfert aéroport, veuillez remplir les champs suivants |
| Flight Number | Numéro de vol |
| Flight Time | Heure du vol |
| Submit | Envoyer |

### French Transfer Page Specifics

**List Page Header Message (French):**
Convey that this page is for discerning travelers ("voyageurs exigeants") looking for private transportation to reach destinations without joining a tour.

**Booking Disclaimer (French):**
> "Veuillez noter : Les réservations ne sont pas instantanées et doivent être confirmées par nos services. La confirmation prend généralement 24 heures mais peut dans certains cas aller jusqu'à 72 heures."

**French Breadcrumb for Transfers:**
```yaml
breadcrumb:
  itemListElement:
    - "@type": "ListItem"
      "position": 1
      "name": "Accueil"
      "item": "https://www.lilja-tours.com/fr/"
    - "@type": "ListItem"
      "position": 2
      "name": "Trajets"
      "item": "https://www.lilja-tours.com/fr/transferts-islande/"
    - "@type": "ListItem"
      "position": 3
      "name": "[French transfer title]"
      "item": "[Full French canonical URL]"
```

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
