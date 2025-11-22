# French Translation Implementation Plan
**Lilja Tours Website - Comprehensive Bilingual Structure**

*Analysis Date: 2025-11-22*

---

## 📁 RECOMMENDED FOLDER STRUCTURE

### Content Collections Structure
```
src/content/
├── blog_articles_EN/        (existing - 2 files)
├── blog_articles_FR/        ✨ NEW - French blog articles
├── multiday_tours_EN/       (existing - 6 files)
├── multiday_tours_FR/       ✨ NEW - French multiday tours
├── partner_experiences_EN/  (existing - 36 files)
├── partner_experiences_FR/  ✨ NEW - French partner experiences
├── tours_EN/                (existing - 11 files)
├── tours_FR/                ✨ NEW - French day tours
└── config.ts                (update with FR collection definitions)
```

### Pages Structure
```
src/pages/
├── index.astro                                    (existing EN homepage)
├── blog/
├── private-day-tours-iceland/
├── multiday-tours-iceland/
├── partner-experiences-iceland/
├── api/
└── fr/                                            ✨ NEW French section
    ├── index.astro                                (French homepage)
    ├── blog/
    │   ├── index.astro
    │   ├── [category].astro
    │   └── [...slug].astro
    ├── circuits-prives-islande/                   (Day tours)
    │   ├── index.astro
    │   └── [...slug].astro
    ├── circuits-multi-jours-islande/              (Multiday tours)
    │   ├── index.astro
    │   └── [...slug].astro
    └── experiences-partenaires-islande/           (Partner experiences)
        ├── index.astro
        ├── [category].astro
        ├── exclusive.astro
        └── [...slug].astro
```

---

## 🎯 KEY FINDINGS

### What's Already Prepared:
1. ✅ All collections use `_EN` suffix (tours_EN, multiday_tours_EN, etc.)
2. ✅ Content schemas include bilingual fields: `language`, `urlOtherLang`, `hreflangAlternates`, `linkFr`
3. ✅ **Many French URLs are already mapped** in existing content files
4. ✅ Components accept `currentLang` prop ('en' | 'fr')
5. ✅ Language switcher infrastructure exists in Topbar/Footer
6. ✅ Hreflang tags partially implemented

**Conclusion:** The codebase is already ~70% ready for French translation!

### URL Pattern (Already Defined):
```
English (current)             →  French (mapped but not built)
/                             →  /fr/
/private-day-tours-iceland/   →  /fr/circuits-prives-islande/
/multiday-tours-iceland/      →  /fr/circuits-multi-jours-islande/
/partner-experiences-iceland/ →  /fr/experiences-partenaires-islande/
/blog/                        →  /fr/blog/
```

---

## 📋 CONTENT FILES PAIRING APPROACH

Each English file gets a French counterpart with mirrored structure:

**Example:**
```
tours_EN/golden-circle-complete.mdx → tours_FR/golden-circle-complete.mdx
```

**English version frontmatter:**
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

**French version frontmatter:**
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

---

## 🔧 COMPONENT TRANSLATION STRATEGIES

### Option A: Translation Object (RECOMMENDED)

Create a centralized translation file for easy maintenance.

**Create:** `src/i18n/translations.ts`
```typescript
export const translations = {
  en: {
    nav: {
      dayTours: "Day tours",
      multidayTours: "Multiday tours",
      experiences: "Experiences",
      stories: "Stories",
      about: "About",
      contact: "Contact"
    },
    footer: {
      explore: "Explore",
      connect: "Connect With Us",
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions"
    },
    cta: {
      bookNow: "Book Now",
      sendQuote: "Send Quote Request",
      bookThisTour: "Book This Tour"
    },
    form: {
      name: "Name",
      email: "Email Address",
      people: "Number of People",
      activities: "Select Activities",
      date: "Departure Date",
      accommodation: "Accommodation"
    }
    // ... add all text content
  },
  fr: {
    nav: {
      dayTours: "Circuits journée",
      multidayTours: "Circuits multi-jours",
      experiences: "Expériences",
      stories: "Histoires",
      about: "À propos",
      contact: "Contact"
    },
    footer: {
      explore: "Explorer",
      connect: "Nous contacter",
      rights: "Tous droits réservés",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales"
    },
    cta: {
      bookNow: "Réserver",
      sendQuote: "Demander un devis",
      bookThisTour: "Réserver ce circuit"
    },
    form: {
      name: "Nom",
      email: "Adresse e-mail",
      people: "Nombre de personnes",
      activities: "Sélectionner les activités",
      date: "Date de départ",
      accommodation: "Hébergement"
    }
    // ... French translations
  }
};

// Helper function
export function t(lang: 'en' | 'fr', key: string) {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value[k];
  }
  return value;
}
```

**Usage in components:**
```astro
---
import { translations } from '../i18n/translations';
interface Props {
  currentLang: 'en' | 'fr';
}
const { currentLang } = Astro.props;
const t = translations[currentLang];
---

<nav>
  <a href={currentLang === 'en' ? '/private-day-tours-iceland/' : '/fr/circuits-prives-islande/'}>
    {t.nav.dayTours}
  </a>
</nav>
```

**Pros:**
- ✅ Single source of truth for all translations
- ✅ Easy to maintain and update
- ✅ Consistent across entire site
- ✅ Can be extended for more languages later
- ✅ IDE autocomplete support

**Cons:**
- ❌ Requires initial setup
- ❌ Large translation file (can be split by domain)

---

### Option B: Duplicate Components

Create separate components for each language.

**Structure:**
```
src/components/
├── Topbar.astro       (English version)
├── TopbarFR.astro     (French version)
├── Footer.astro       (English version)
├── FooterFR.astro     (French version)
└── ...
```

**Usage:**
```astro
---
// English page
import Topbar from '../components/Topbar.astro';

// French page
import Topbar from '../components/TopbarFR.astro';
---
```

**Pros:**
- ✅ Very simple to implement
- ✅ No logic needed in components
- ✅ Clear separation of languages

**Cons:**
- ❌ Doubles the number of component files
- ❌ Harder to maintain (changes must be made twice)
- ❌ Structure changes require updating both versions
- ❌ Easy to forget updating one version

---

### Option C: Conditional Rendering

Keep single components with inline conditionals.

**Usage:**
```astro
---
interface Props {
  currentLang: 'en' | 'fr';
}
const { currentLang } = Astro.props;
---

<nav>
  <a href={currentLang === 'en' ? '/private-day-tours-iceland/' : '/fr/circuits-prives-islande/'}>
    {currentLang === 'en' ? 'Day tours' : 'Circuits journée'}
  </a>
  <a href={currentLang === 'en' ? '/multiday-tours-iceland/' : '/fr/circuits-multi-jours-islande/'}>
    {currentLang === 'en' ? 'Multiday tours' : 'Circuits multi-jours'}
  </a>
</nav>
```

**Pros:**
- ✅ No external files needed
- ✅ Single component to maintain

**Cons:**
- ❌ Components become cluttered with ternaries
- ❌ Hard to read with lots of text
- ❌ Not scalable for long content
- ❌ Difficult to manage complex translations

---

### 🏆 RECOMMENDATION: Option A (Translation Object)

For a professional website with substantial content and potential for growth, **Option A provides the best balance** of maintainability, scalability, and developer experience.

---

## 🧩 COMPONENTS REQUIRING TRANSLATION

### High Priority (User-facing text):
- ✏️ **Topbar.astro** - Navigation menu items, language switcher
- ✏️ **Footer.astro** - Section headings, legal text, navigation
- ✏️ **CTAButton.astro** - Button text "Send Quote Request"
- ✏️ **FloatingBookButton.astro** - "Book Now" button
- ✏️ **TourBookingModal.astro** - Form labels, placeholders, messages
- ✏️ **ItineraryCard.astro** - "From", "Duration", "Season" labels
- ✏️ **MultidayItineraryCard.astro** - Similar to ItineraryCard
- ✏️ **BlogCard.astro** - "Read more", date formatting
- ✏️ **ActivityFlipCard.astro** - Action text

### Medium Priority (SEO/Meta):
- All page layouts for meta descriptions
- Structured data (JSON-LD) translations

### Low Priority:
- HomeHeader.astro (minimal text)
- Image alt text (handled in content files)

---

## 📊 TRANSLATION WORKLOAD SUMMARY

### Content Files to Translate:
| Collection | Files | Notes |
|------------|-------|-------|
| tours_FR | 11 | Day tour experiences |
| multiday_tours_FR | 6 | Multi-day packages |
| partner_experiences_FR | 36 | Partner activities |
| blog_articles_FR | 2+ | Blog content (growing) |
| **Total Content Files** | **55+** | |

### Page Files to Create:
| Section | Pages | Notes |
|---------|-------|-------|
| /fr/ root | 1 | Homepage |
| /fr/blog/ | 3 | Index, category, slug pages |
| /fr/circuits-prives-islande/ | 2 | Index, slug pages |
| /fr/circuits-multi-jours-islande/ | 2 | Index, slug pages |
| /fr/experiences-partenaires-islande/ | 4 | Index, category, exclusive, slug |
| **Total Page Files** | **12** | |

### Components:
- **~10** components with translatable text
- **1** i18n translation file (if using Option A)

**Grand Total:** ~80 files to create/translate

---

## 🚀 IMPLEMENTATION PHASES

### Phase 1: Infrastructure Setup
**Objective:** Prepare the foundation for bilingual support

**Tasks:**
- [ ] Update `src/content/config.ts` with all FR collection definitions
- [ ] Create empty FR content folders (tours_FR, multiday_tours_FR, etc.)
- [ ] Set up translation system (create `src/i18n/translations.ts` if using Option A)
- [ ] Test that collections are recognized by Astro

**Estimated Effort:** 2-3 hours

---

### Phase 2: French Page Structure
**Objective:** Create all French page routes

**Tasks:**
- [ ] Create `/fr/` directory in `src/pages/`
- [ ] Create `/fr/index.astro` (French homepage)
- [ ] Create `/fr/blog/` pages (index, category, slug)
- [ ] Create `/fr/circuits-prives-islande/` pages (index, slug)
- [ ] Create `/fr/circuits-multi-jours-islande/` pages (index, slug)
- [ ] Create `/fr/experiences-partenaires-islande/` pages (index, category, exclusive, slug)
- [ ] Update all pages with correct `currentLang="fr"` prop
- [ ] Ensure all pages have Google Analytics tag
- [ ] Ensure all pages have TrustIndex rich snippet script

**Estimated Effort:** 4-6 hours

---

### Phase 3: Component Translation
**Objective:** Make all components bilingual-ready

**Tasks:**
- [ ] Implement chosen translation strategy (recommended: Option A)
- [ ] Update Topbar.astro with translations
- [ ] Update Footer.astro with translations
- [ ] Update CTAButton.astro with translation support
- [ ] Update FloatingBookButton.astro with translation support
- [ ] Update TourBookingModal.astro with all form translations
- [ ] Update ItineraryCard.astro with label translations
- [ ] Update MultidayItineraryCard.astro with label translations
- [ ] Update BlogCard.astro with translation support
- [ ] Update ActivityFlipCard.astro (if needed)
- [ ] Test all components in both EN and FR contexts

**Estimated Effort:** 6-8 hours

---

### Phase 4: Content Translation
**Objective:** Translate all content files

**Sub-phase 4A: Day Tours (Priority 1)**
- [ ] Translate all 11 tours in `tours_FR/`
- [ ] Verify French slugs match URL pattern
- [ ] Ensure hreflang alternates are correct
- [ ] Test all tour detail pages render correctly

**Sub-phase 4B: Multiday Tours (Priority 2)**
- [ ] Translate all 6 multiday tours in `multiday_tours_FR/`
- [ ] Verify French slugs and URLs
- [ ] Test all multiday tour pages

**Sub-phase 4C: Partner Experiences (Priority 3)**
- [ ] Translate all 36 experiences in `partner_experiences_FR/`
- [ ] Organize by categories
- [ ] Test category pages and detail pages

**Sub-phase 4D: Blog Articles (Priority 4)**
- [ ] Translate existing 2 blog articles in `blog_articles_FR/`
- [ ] Set up process for future blog translations
- [ ] Test blog listing and detail pages

**Estimated Effort:** 30-40 hours (content translation is time-intensive)

---

### Phase 5: SEO & Technical Verification
**Objective:** Ensure SEO best practices and technical correctness

**Tasks:**
- [ ] Verify all hreflang tags are bidirectional (EN↔FR)
- [ ] Test language switcher on all page types
- [ ] Verify canonical URLs are correct for all pages
- [ ] Update/regenerate sitemap to include FR pages
- [ ] Verify Google Analytics tracking on FR pages
- [ ] Verify TrustIndex widget works on FR pages
- [ ] Test all internal links point to correct language version
- [ ] Verify JSON-LD structured data in French has correct language
- [ ] Check that all FR pages follow "3 Kings Rule" (keyword in title, h1, intro)
- [ ] Verify character limits (meta: 160, intro: 350, descriptions: 2000)
- [ ] Test mobile navigation in French
- [ ] Test all forms work in French

**Estimated Effort:** 4-6 hours

---

### Phase 6: Quality Assurance
**Objective:** Final review and testing

**Tasks:**
- [ ] Test all FR page routes load correctly
- [ ] Verify EN→FR and FR→EN navigation works
- [ ] Check all images have French alt text
- [ ] Proofread all translations for accuracy
- [ ] Test booking forms in French
- [ ] Verify email notifications work with French form submissions
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] User acceptance testing (if applicable)

**Estimated Effort:** 3-5 hours

---

## 📝 CONTENT TRANSLATION CHECKLIST

For each content file, ensure:

### Frontmatter:
- [ ] `language: "fr"`
- [ ] `slug` is French (e.g., "cercle-or-complet")
- [ ] `url` points to correct FR path
- [ ] `urlOtherLang` points to EN version
- [ ] `canonicalUrl` is full FR URL
- [ ] `hreflangAlternates` includes both EN and FR
- [ ] All SEO fields translated (title, metaDescription)
- [ ] `cardSentence` translated
- [ ] All array fields translated (highlights, included, etc.)

### Content Body:
- [ ] All headings translated
- [ ] All paragraphs translated
- [ ] Maintain proper markdown structure
- [ ] Check character limits per CLAUDE.md guidelines
- [ ] Ensure "3 Kings Rule" compliance

### Images:
- [ ] `cardImg.alt` translated
- [ ] All image alt texts in body translated

### Structured Data:
- [ ] JSON-LD translated (descriptions, names)
- [ ] Correct `@language` or `inLanguage` property
- [ ] URLs in schema point to FR version

---

## 🎯 SEO REQUIREMENTS (Per CLAUDE.md)

### The 3 Kings Rule (MANDATORY)
Every French page must have the primary keyword in:
1. `<title>` tag
2. `<h1>` heading
3. Introductory text (first paragraph)

### Character Limits (STRICT)
- **Meta descriptions:** 160 characters maximum
- **Header introductory texts:** 350 characters maximum
- **Visit/tour descriptions:** 2,000 characters maximum (formatted in 2-3 paragraphs)

### Content Guidelines
- Write as SEO copywriter specializing in travel/tourism
- Natural, engaging language for travelers
- Include relevant French keywords organically
- Focus on benefits and unique selling points
- Each page must have completely unique content

---

## 🔍 TECHNICAL REQUIREMENTS

### Every French Page Must Include:

**1. Google Analytics Tag**
```html
<!-- Google tag (gtag.js) -->
<script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-48C94854K2"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-48C94854K2');
</script>
```

**2. TrustIndex Rich Snippet Script**
```html
<script type="text/javascript" defer async src="https://cdn.trustindex.io/assets/js/richsnippet.js?505b36156145g5ee"></script>
```

**3. Correct HTML Lang Attribute**
```html
<html lang="fr">
```

**4. Hreflang Tags**
```html
<link rel="alternate" hreflang="en" href="https://www.lilja-tours.com/[en-url]/" />
<link rel="alternate" hreflang="fr" href="https://www.lilja-tours.com/fr/[fr-url]/" />
<link rel="canonical" href="https://www.lilja-tours.com/fr/[fr-url]/" />
```

---

## 🌐 URL MAPPING REFERENCE

### Main Sections

| English URL | French URL |
|-------------|------------|
| `/` | `/fr/` |
| `/private-day-tours-iceland/` | `/fr/circuits-prives-islande/` |
| `/multiday-tours-iceland/` | `/fr/circuits-multi-jours-islande/` |
| `/partner-experiences-iceland/` | `/fr/experiences-partenaires-islande/` |
| `/blog/` | `/fr/blog/` |

### Example Tour Mappings (Already Defined in Content)

| English | French |
|---------|--------|
| `/private-day-tours-iceland/golden-circle-complete-farm-to-table/` | `/fr/circuits-prives-islande/cercle-or-complet-ferme-table/` |
| `/private-day-tours-iceland/northern-lights/` | `/fr/circuits-prives-islande/aurores-boreales/` |
| `/multiday-tours-iceland/ring-road-essentials-7-days/` | `/fr/circuits-multi-jours-islande/route-1-essentiel-7-jours/` |

*Note: All French URLs are already mapped in existing EN content files under `urlOtherLang` and `linkFr` fields.*

---

## 📦 EXAMPLE: config.ts Update

```typescript
import { defineCollection, z } from 'astro:content';

// Existing EN collection schemas
const toursEN = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('en'),
    // ... rest of schema
  }),
});

const multidayToursEN = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('en'),
    // ... rest of schema
  }),
});

const partnerExperiencesEN = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('en'),
    // ... rest of schema
  }),
});

const blogArticlesEN = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('en'),
    // ... rest of schema
  }),
});

// NEW: FR collections with identical schemas (change default language)
const toursFR = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('fr'),
    // ... same schema as toursEN
  }),
});

const multidayToursFR = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('fr'),
    // ... same schema as multidayToursEN
  }),
});

const partnerExperiencesFR = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('fr'),
    // ... same schema as partnerExperiencesEN
  }),
});

const blogArticlesFR = defineCollection({
  type: 'content',
  schema: z.object({
    language: z.string().default('fr'),
    // ... same schema as blogArticlesEN
  }),
});

// Export all collections
export const collections = {
  tours_EN: toursEN,
  tours_FR: toursFR,
  multiday_tours_EN: multidayToursEN,
  multiday_tours_FR: multidayToursFR,
  partner_experiences_EN: partnerExperiencesEN,
  partner_experiences_FR: partnerExperiencesFR,
  blog_articles_EN: blogArticlesEN,
  blog_articles_FR: blogArticlesFR,
};
```

---

## 🎓 BEST PRACTICES

### 1. Maintain Consistency
- Use the same file naming (e.g., `golden-circle-complete.mdx` in both EN and FR folders)
- Keep frontmatter structure identical between languages
- Use consistent translation terminology across all content

### 2. SEO Optimization
- Research French keywords (may differ from literal translations)
- Adapt meta descriptions for French market
- Ensure natural, native-sounding French copy

### 3. Quality Control
- Have native French speaker review all translations
- Test all links and navigation
- Verify forms and interactive elements work correctly

### 4. Maintenance
- When updating EN content, remember to update FR version
- Keep translation file organized and well-commented
- Document any language-specific features or exceptions

---

## 📌 NOTES & CONSIDERATIONS

### Assets
- Images in `/public/pictures/` are language-neutral (reused for both EN/FR)
- Only image alt texts need translation (handled in content frontmatter)

### Forms & APIs
- Form submissions from `/api/contact-tour.ts` should identify language
- Email notifications should match form submission language
- Consider adding language field to form data

### Future Languages
- Structure supports easy addition of more languages
- Simply add `_ES`, `_DE`, etc. collections and `/es/`, `/de/` page routes
- Translation object can be extended with new language keys

### Astro i18n Routing (Optional)
Currently using manual approach. Could consider Astro's built-in i18n routing:
```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
```

However, the current manual approach provides more control and is already well-established in the codebase.

---

## ✅ READY TO START CHECKLIST

Before beginning implementation:
- [ ] Finalize component translation strategy (Option A/B/C)
- [ ] Determine who will provide French translations (copywriter, translation service, etc.)
- [ ] Set up translation workflow (how will content be reviewed?)
- [ ] Decide on French SEO keyword strategy
- [ ] Prepare development environment for testing
- [ ] Back up current codebase
- [ ] Create feature branch for French implementation

---

## 📞 WHEN READY TO PROCEED

To activate this plan:
1. Review this document thoroughly
2. Decide on component translation strategy
3. Prepare French content or identify translation resources
4. Say: **"Let's start French translation Phase 1"**

The implementation will follow the phases outlined above, with careful testing at each stage.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-22
**Status:** Planning Phase - Ready for Implementation
