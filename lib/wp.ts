/**
 * WordPress REST API integration.
 *
 * The marketing team continues authoring in WordPress at
 * birdseyesecurity.com. This Next.js site reads from that WP REST API
 * so every post, guide, video, news item, etc. flows through the new
 * design without anyone having to migrate content. We render the WP
 * HTML inside our shell — no double-source-of-truth, no broken links.
 */

const WP_BASE = process.env.NEXT_PUBLIC_WP_API_URL ?? "https://birdseyesecurity.com/wp-json/wp/v2";

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
    author?: { name: string }[];
    /**
     * Taxonomy terms attached to the post (DEEP-5). Each inner array is
     * one taxonomy (category, post_tag, etc.) and contains the term
     * objects with `name` and `slug`. Surfaced when the WP REST API is
     * called with `_embed=1` (already the case in listResources).
     *
     * Used to power topic-filter chips on /blog, /news, /guide,
     * /checklist, /event, /case-studies — alongside the existing year
     * filter that ResourceGrid already provides.
     */
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
  /**
   * WP custom fields. Surfaced for News posts (DEEP-2):
   *   • `external_url`   — full URL of the external publication, when
   *                        the news entry is an attribution rather than
   *                        an in-house article. Click goes to the
   *                        publication, not our /news/[slug].
   *   • `publication`    — display name (e.g. "Supply Chain Dive").
   *                        Surfaced as "Read on {publication} ↗".
   *
   * Marketing convention: in WP, register these as exposed meta fields
   * on the `news` CPT (rest=true). When absent, the news card behaves
   * like an internal post (links to /news/[slug]).
   */
  meta?: {
    external_url?: string;
    publication?: string;
  } & Record<string, unknown>;
};

/**
 * For a news WpPost, return the external attribution if present.
 * Returns null when the post is in-house and should route internally.
 */
export function getNewsExternal(
  p: WpPost,
): { url: string; publication: string } | null {
  const url = p.meta?.external_url;
  const publication = p.meta?.publication;
  if (typeof url === "string" && url.length > 0) {
    return {
      url,
      publication:
        typeof publication === "string" && publication.length > 0
          ? publication
          : "external",
    };
  }
  return null;
}

/**
 * Career CPT metadata (DEEP-3). All fields optional — the listing and
 * detail page both fall back gracefully when WP doesn't surface them.
 *
 * Marketing convention (documented in _placeholders.md):
 *   • department         — "Engineering", "Operations", "Security",
 *                          "Growth", "Design", "People", etc.
 *   • location           — "Mississauga, ON" / "Dallas, TX" /
 *                          "Belgrade" / "Bogotá" / "Remote"
 *   • employment_type    — "Full-time" / "Part-time" / "Contract"
 *   • experience_level   — "Junior" / "Mid" / "Senior" / "Staff"
 *   • apply_url          — full URL of the application form (Lever,
 *                          Greenhouse, Workable, etc.)
 *
 * Register each as exposed REST meta on the `career` CPT
 * (register_meta with show_in_rest=true).
 */
export type CareerMeta = {
  department?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  apply_url?: string;
};

/**
 * Extract human-readable topic names from a post's embedded taxonomy
 * terms (DEEP-5). Returns the deduped list of category + tag names
 * across every taxonomy attached to the post.
 *
 * `category` and `post_tag` are the two default WP taxonomies. Custom
 * taxonomies registered on a CPT (e.g. `industry`, `topic`) will also
 * surface here as long as they're set to `show_in_rest=true`.
 *
 * The returned list is what's used to derive the topic-filter chips on
 * the resource archives. Empty when WP hasn't tagged the post — the
 * filter chips hide entirely in that case (see ResourceGrid).
 */
export function getPostTopics(p: WpPost): string[] {
  const groups = p._embedded?.["wp:term"] ?? [];
  const topics = new Set<string>();
  for (const group of groups) {
    if (!Array.isArray(group)) continue;
    for (const term of group) {
      // Skip the WP default "Uncategorized" — it's marketing noise, not
      // a real taxonomy choice.
      if (term?.slug === "uncategorized") continue;
      if (term?.name) topics.add(term.name);
    }
  }
  return Array.from(topics);
}

export function getCareerMeta(p: WpPost): CareerMeta {
  const m = p.meta ?? {};
  return {
    department: typeof m.department === "string" ? m.department : undefined,
    location: typeof m.location === "string" ? m.location : undefined,
    employment_type:
      typeof m.employment_type === "string" ? m.employment_type : undefined,
    experience_level:
      typeof m.experience_level === "string" ? m.experience_level : undefined,
    apply_url: typeof m.apply_url === "string" ? m.apply_url : undefined,
  };
}

/**
 * Map our route slugs to WP custom post type slugs.
 * Some are reused (post = blog), most are 1:1.
 */
export const WP_TYPES = {
  blog: "posts",
  news: "news",
  video: "video",
  guide: "guide",
  "case-studies": "case-study",
  checklist: "checklist",
  event: "event",
  career: "career",
} as const;

export type ResourceType = keyof typeof WP_TYPES;

/**
 * Fetch a paginated list of items for one custom post type.
 * Server-side only; ISR-cached for an hour.
 *
 * Returns an error flag to distinguish between "genuinely empty"
 * and "WP fetch failed". Components can render different UX.
 */
export async function listResources(
  type: ResourceType,
  opts: { perPage?: number; page?: number } = {},
): Promise<{ items: WpPost[]; total: number; totalPages: number; error?: boolean }> {
  const wpType = WP_TYPES[type];
  const perPage = opts.perPage ?? 24;
  const page = opts.page ?? 1;
  const url = `${WP_BASE}/${wpType}?per_page=${perPage}&page=${page}&_embed=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return { items: [], total: 0, totalPages: 0, error: true };
    }
    const items: WpPost[] = await res.json();
    const total = parseInt(res.headers.get("x-wp-total") ?? "0", 10);
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") ?? "0", 10);
    return { items, total, totalPages };
  } catch (err) {
    console.error("[wp] fetch failed:", err);
    return { items: [], total: 0, totalPages: 0, error: true };
  }
}

/**
 * Fetch one item by slug. Returns null if not found so the calling
 * route can show a 404.
 */
export async function getResource(
  type: ResourceType,
  slug: string,
): Promise<WpPost | null> {
  const wpType = WP_TYPES[type];
  const url = `${WP_BASE}/${wpType}?slug=${encodeURIComponent(slug)}&_embed=1`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const items: WpPost[] = await res.json();
    return items[0] ?? null;
  } catch (err) {
    console.error("[wp] fetch failed:", err);
    return null;
  }
}

/**
 * Strip HTML tags and decode common entities so excerpts render cleanly
 * inside our typography system. Keep it minimal — for body content we
 * still inject the WP HTML via dangerouslySetInnerHTML.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "--")
    .replace(/&hellip;/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Friendly meta line: e.g. "Article · Mar 12, 2026"
 */
export function formatMeta(type: ResourceType, dateIso: string): string {
  const labels: Record<ResourceType, string> = {
    blog: "Article",
    news: "News",
    video: "Video",
    guide: "Guide",
    "case-studies": "Case Study",
    checklist: "Checklist",
    event: "Event",
    career: "Career",
  };
  const date = new Date(dateIso);
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${labels[type]} · ${formatted}`;
}
