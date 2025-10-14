import { defineCollection, z } from 'astro:content';

const toursEN = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(z.object({
      lang: z.string(),
      url: z.string()
    })),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string()
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string()
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    visits: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string()
      })
    })),
    priceMercedes: z.number().optional(),
    priceLandCruiser: z.number().optional(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    bookingLinkMercedes: z.string().optional(),
    bookingLinkLandCruiser: z.string().optional(),
    bookingLinkMeetOnLocation: z.string().optional(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string()
    })),
    price: z.number(),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional()
  })
});

const multidayToursEN = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(z.object({
      lang: z.string(),
      url: z.string()
    })),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string()
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string()
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    itinerary: z.array(z.object({
      day: z.number(),
      title: z.string(),
      description: z.string(),
      image: z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string()
      })
    })),
    activities: z.array(z.object({
      name: z.string(),
      description: z.string(),
      day: z.number(),
      image: z.string(),
      alt: z.string()
    })),
    pricePerDay: z.number(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string()
    })),
    price: z.number(),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional()
  })
});

export const collections = {
  'tours_EN': toursEN,
  'multiday_tours_EN': multidayToursEN,
};