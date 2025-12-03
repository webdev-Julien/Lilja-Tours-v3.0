import { defineCollection, z } from "astro:content";

const toursEN = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    visits: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.object({
          srcPC: z.string(),
          srcMobile: z.string(),
          alt: z.string(),
        }),
      })
    ),
    priceMercedes: z.number().optional(),
    priceLandCruiser: z.number().optional(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    bookingLinkMercedes: z.string().optional(),
    bookingLinkLandCruiser: z.string().optional(),
    bookingLinkMeetOnLocation: z.string().optional(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    price: z.number(),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const multidayToursEN = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    itinerary: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        description: z.string(),
        image: z.object({
          srcPC: z.string(),
          srcMobile: z.string(),
          alt: z.string(),
        }),
      })
    ),
    activities: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        day: z.number(),
        image: z.string(),
        alt: z.string(),
      })
    ),
    pricePerDay: z.number(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    price: z.number(),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const partnerExperiencesEN = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    category: z.string(),
    isExclusive: z.boolean(),
    season: z.string(),
    duration: z.string(),
    location: z.string(),
    shortDescription: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    provider: z.object({
      name: z.string(),
      website: z.string().optional(),
      description: z.string().optional(),
    }),
    price: z.number(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    bookingLink: z.string(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const blogArticlesEN = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string().optional(),
    canonicalUrl: z.string(),
    hreflangAlternates: z
      .array(
        z.object({
          lang: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    author: z.string(),
    publishDate: z.string(),
    categories: z.array(
      z.enum([
        "Itineraries",
        "Tops",
        "Info",
        "Photographies",
        "Hotels",
        "Excursions",
        "Tours",
        "News",
        "Travel Guides",
        "Luxury",
        "Wellness",
      ])
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    readingTime: z.string(),
    excerpt: z.string(),
    jsonLD: z.object({}).passthrough(),
    slug: z.string().optional(),
  }),
});

// French Collections (identical schemas to EN, just for French content)
const toursFR = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    visits: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.object({
          srcPC: z.string(),
          srcMobile: z.string(),
          alt: z.string(),
        }),
      })
    ),
    priceMercedes: z.number().optional(),
    priceLandCruiser: z.number().optional(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    bookingLinkMercedes: z.string().optional(),
    bookingLinkLandCruiser: z.string().optional(),
    bookingLinkMeetOnLocation: z.string().optional(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    price: z.number(),
    linkEn: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const multidayToursFR = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    itinerary: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        description: z.string(),
        image: z.object({
          srcPC: z.string(),
          srcMobile: z.string(),
          alt: z.string(),
        }),
      })
    ),
    activities: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        day: z.number(),
        image: z.string(),
        alt: z.string(),
      })
    ),
    pricePerDay: z.number(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    price: z.number(),
    linkEn: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const partnerExperiencesFR = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string(),
    canonicalUrl: z.string(),
    hreflangAlternates: z.array(
      z.object({
        lang: z.string(),
        url: z.string(),
      })
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    category: z.string(),
    isExclusive: z.boolean(),
    season: z.string(),
    duration: z.string(),
    location: z.string(),
    shortDescription: z.string(),
    introductoryText: z.string(),
    highlights: z.array(z.string()),
    provider: z.object({
      name: z.string(),
      website: z.string().optional(),
      description: z.string().optional(),
    }),
    price: z.number(),
    maxPeople: z.number(),
    difficultyLevel: z.string(),
    bookingLink: z.string(),
    jsonLD: z.object({}).passthrough(),
    gallery: z.array(
      z.object({
        srcPC: z.string(),
        srcMobile: z.string(),
        alt: z.string(),
      })
    ),
    linkEn: z.string(),
    url: z.string(),
    slug: z.string().optional(),
  }),
});

const blogArticlesFR = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    pageTitle: z.string(),
    language: z.string(),
    urlOtherLang: z.string().optional(),
    canonicalUrl: z.string(),
    hreflangAlternates: z
      .array(
        z.object({
          lang: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    author: z.string(),
    publishDate: z.string(),
    categories: z.array(
      z.enum([
        "Itineraries",
        "Tops",
        "Info",
        "Photographies",
        "Hotels",
        "Excursions",
        "Tours",
        "News",
        "Travel Guides",
        "Luxury",
        "Wellness",
      ])
    ),
    featuredImage: z.string(),
    headerImage: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
    }),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    readingTime: z.string(),
    excerpt: z.string(),
    jsonLD: z.object({}).passthrough(),
    slug: z.string().optional(),
  }),
});

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
