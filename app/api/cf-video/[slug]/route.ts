/**
 * ConnectedFlow video proxy.
 *
 * Streams ConnectedFlow `.webm` clips from birdseyesecurity.com through our
 * own origin so the browser never has to deal with WordPress's
 * `Cross-Origin-Resource-Policy: same-site` header (which silently blocks the
 * cross-origin <video> from ever advancing past readyState 0).
 *
 * Slugs are explicitly allowlisted, a typo in our component can't turn this
 * into an open URL relay. Range requests are forwarded so the browser can
 * seek and the AbortController plumbing means a paused/skipped video doesn't
 * leak a hanging fetch on the server.
 */
import { NextRequest } from "next/server";

const CDN = "https://birdseyesecurity.com/wp-content/uploads";

const SOURCES: Record<string, string> = {
  monitoring: `${CDN}/2025/11/AI-Human.webm`,
  gatecore: `${CDN}/2025/11/truck-at-the-gate.webm`,
  "id-verify": `${CDN}/2025/11/Driver_ID_Scan_and_Face_Verification.webm`,
  "bills-of-lading": `${CDN}/2025/11/BOL-Scan-gate.webm`,
  "seal-verification": `${CDN}/2025/11/seal-verification-.webm`,
  "faster-gate": `${CDN}/2025/07/website-video-faster-compressed.webm`,
  "voice-down": `${CDN}/2025/11/Incident-Prevention.webm`,
  "compliance-reporting": `${CDN}/2025/11/animated-dashboard.webm`,
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const upstream = SOURCES[slug];
  if (!upstream) {
    return new Response("Unknown video slug", { status: 404 });
  }

  // Forward Range so the browser can seek; everything else is fine to drop.
  const range = req.headers.get("range");
  const upstreamRes = await fetch(upstream, {
    headers: range ? { Range: range } : {},
    signal: req.signal,
  });

  // Pass through the upstream status (200 or 206 for ranged requests) and
  // the bytes that matter for media playback. Cache aggressively, these
  // assets change infrequently, and the proxy round-trip should not
  // dominate page load.
  const headers = new Headers();
  // NOTE: WordPress serves these clips as `application/octet-stream`, which
  // makes the browser refuse to decode them as video. Always pin to
  // `video/webm` regardless of what upstream says.
  headers.set("content-type", "video/webm");
  const passthrough = [
    "content-length",
    "content-range",
    "accept-ranges",
    "last-modified",
    "etag",
  ];
  for (const h of passthrough) {
    const v = upstreamRes.headers.get(h);
    if (v) headers.set(h, v);
  }
  if (!headers.has("accept-ranges")) headers.set("accept-ranges", "bytes");
  // Short cache so dev tweaks (slug rename, upstream swap) don't get stuck
  // behind a stale browser cache. Production CDN can still cache aggressively
  // because the slug → upstream mapping is stable.
  headers.set("cache-control", "public, max-age=600");

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers,
  });
}
