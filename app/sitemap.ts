import type { MetadataRoute } from "next";
import { listResources } from "@/lib/wp";

const SITE = "https://birdseyesecurity.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes = [
    "",
    "/platform",
    "/platform/gatecore",
    "/platform/safecore",
    "/platform/yardcore",
    "/platform/integrations",
    "/about-us",
    "/contact",
    "/book-a-demo",
    "/career",
    "/results",
    "/case-studies",
    "/roi-calculator",
    "/industries/logistics",
    "/industries/warehousing",
    "/industries/manufacturing",
    "/industries/supply-chain",
    "/industries/automotive",
    "/blog",
    "/news",
    "/video",
    "/guide",
    "/checklist",
    "/event",
    "/security",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((p) => ({
    url: `${SITE}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1.0 : 0.7,
  }));

  // Dynamic WP routes
  const types = [
    "blog",
    "news",
    "video",
    "guide",
    "checklist",
    "event",
    "case-studies",
    "career",
  ] as const;
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  for (const type of types) {
    try {
      const { items } = await listResources(type, { perPage: 100 });
      for (const item of items) {
        dynamicRoutes.push({
          url: `${SITE}/${type}/${item.slug}`,
          lastModified: new Date(item.date),
          changeFrequency: "monthly" as const,
          priority: 0.5,
        });
      }
    } catch (e) {
      console.error(`[sitemap] failed to fetch ${type}`, e);
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
