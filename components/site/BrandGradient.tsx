/**
 * Reusable brand-gradient surface.
 *
 * A moody composition: a deep near-black navy base, electric-blue radial
 * blooms anchored in the corners, and an SVG noise grain on top. Designed
 * to sit behind a UI surface where a flat brand color would feel inert 
 * mega menus, hero accents, the Footer CTA card, callouts inside the dark
 * sections, etc.
 *
 * Usage:
 *   <div className="relative ...">
 *     <BrandGradient variant="panel" />
 *     <div className="relative">{children}</div>
 *   </div>
 *
 * The component is `absolute inset-0` and `pointer-events-none`, so links
 * underneath stay clickable. The wrapper must be `position: relative`.
 *
 * Variants:
 *   panel   , deep navy, strong blue bloom from upper-left, secondary
 *              bloom from lower-right. The flagship preset, designed for
 *              the mega menu and overlay panels on dark sections.
 *   card    , saturated electric blue with depth + a darker bottom-right
 *              corner. For "full color blue" CTA cards (FooterCta, etc).
 *   ambient , low-energy soft halo from the top, almost subliminal. For
 *              section backgrounds where you want a hint of brand presence
 *              without a hard surface.
 */

type Variant = "panel" | "card" | "ambient";

// SVG noise as a base64-free data URL. baseFrequency controls grain
// density; the feColorMatrix outputs white-on-transparent so we can mix
// it onto any color base via mix-blend-overlay.
const NOISE_DATA_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const presets: Record<
  Variant,
  { base: string; glows: string; noiseOpacity: number }
> = {
  panel: {
    base: "#020417",
    glows: `
      radial-gradient(ellipse 70% 90% at 0% 0%, rgba(46,75,255,0.55), transparent 62%),
      radial-gradient(ellipse 55% 70% at 100% 100%, rgba(46,75,255,0.32), transparent 65%),
      radial-gradient(ellipse 40% 35% at 50% 50%, rgba(20,30,90,0.35), transparent 60%)
    `,
    noiseOpacity: 0.18,
  },
  card: {
    base: "#1F2F7A",
    glows: `
      radial-gradient(ellipse 80% 90% at 0% 0%, rgba(82,108,255,0.65), transparent 60%),
      radial-gradient(ellipse 70% 80% at 100% 100%, rgba(8,15,55,0.65), transparent 65%)
    `,
    noiseOpacity: 0.12,
  },
  ambient: {
    base: "#020417",
    glows: `
      radial-gradient(ellipse 90% 60% at 50% 0%, rgba(46,75,255,0.22), transparent 60%),
      radial-gradient(ellipse 60% 40% at 50% 100%, rgba(46,75,255,0.10), transparent 60%)
    `,
    noiseOpacity: 0.10,
  },
};

export function BrandGradient({
  variant = "panel",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const preset = presets[variant];

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Base color */}
      <div
        className="absolute inset-0"
        style={{ background: preset.base }}
      />
      {/* Radial brand blooms */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: preset.glows }}
      />
      {/* Noise grain, overlay blend for tactile texture without
          shifting the underlying hue too far */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: NOISE_DATA_URL,
          backgroundSize: "256px 256px",
          opacity: preset.noiseOpacity,
        }}
      />
    </div>
  );
}
