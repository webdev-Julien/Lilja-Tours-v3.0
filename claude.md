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

## When Writing Content

1. Check existing pages to avoid content duplication
2. Verify character counts before finalizing
3. Ensure keyword appears in title, h1, and intro
4. Keep meta descriptions concise and compelling
5. Structure visit descriptions with 2-3 clear paragraphs
6. Create comprehensive JSON-LD following existing page examples
