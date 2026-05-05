import { redirect } from "next/navigation";

/**
 * Legacy /about → canonical /about-us.
 *
 * The PRIMARY redirect lives in next.config.mjs as a 308 (permanent) so it
 * fires at the edge before the route tree is even consulted, better SEO
 * signal, lower latency, no React render. This Server Component remains as
 * a defensive fallback in case the config rule is removed: any direct hit
 * to /about will still bounce to /about-us via the framework's runtime
 * redirect (307 in this path). Two-layer safety, zero behavior change.
 *
 * Canonical decision: /about-us was kept as canonical because it matches
 * the legacy WordPress URL, preserves inbound link equity.
 */
export default function AboutLegacy() {
  redirect("/about-us");
}
