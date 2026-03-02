import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const articles = await getCollection("blog_articles_EN");

  const sortedArticles = articles.sort(
    (a, b) =>
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: "Lilja Tours | Private Tours in Iceland — Blog",
    description:
      "Travel tips, detailed guides, and stories about exploring Iceland through private luxury tours.",
    site: context.site!.toString(),
    language: "en",
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      pubDate: new Date(article.data.publishDate),
      description: article.data.excerpt,
      link: `/blog/${article.data.slug || article.slug}/`,
    })),
  });
}
