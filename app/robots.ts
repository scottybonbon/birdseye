import type { MetadataRoute } from "next";

/**
 * robots.txt generator.
 *
 * On staging / preview deployments (NEXT_PUBLIC_STAGING=true) we
 * disallow ALL crawling — colleagues reviewing the preview shouldn't
 * have search engines indexing the deployment URL. On production this
 * returns the normal allow-most-of-the-site rules with the standard
 * /api and /portal exclusions.
 */
export default function robots(): MetadataRoute.Robots {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";

  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/portal"],
    },
    sitemap: "https://birdseyesecurity.ca/sitemap.xml",
  };
}
