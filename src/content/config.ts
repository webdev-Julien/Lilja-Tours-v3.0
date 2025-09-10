import { defineCollection, z } from 'astro:content';

const toursEN = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    cardImg: z.object({
      srcPC: z.string(),
      srcMobile: z.string(),
      alt: z.string(),
      title: z.string()
    }),
    season: z.string(),
    duration: z.string(),
    cardSentence: z.string(),
    highlights: z.array(z.string()),
    price: z.number(),
    linkFr: z.string(),
    url: z.string(),
    slug: z.string().optional()
  })
});

export const collections = {
  'tours_EN': toursEN,
};