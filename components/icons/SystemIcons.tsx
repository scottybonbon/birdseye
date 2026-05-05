/**
 * Hand-crafted SVG icons for the Birdseye system. Built specifically for
 * Birdseye's story (DETECT → VERIFY → DOCUMENT) — no icon library imports.
 * Each icon is monoline, 1.4px stroke, 32×32 viewBox, designed to read on
 * pure black at small AND large sizes.
 *
 * Style notes:
 * - currentColor stroke so they pick up text color (cream / electric / etc.)
 * - Optical refinements at corner joins
 * - One semantic mark per icon — not generic abstractions
 */

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function I({ size = 32, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/**
 * DETECT — A scanning eye over a gridded yard. Reads as
 * computer-vision-watching-everything.
 */
export function IconDetect(props: IconProps) {
  return (
    <I {...props}>
      {/* Yard grid baseline */}
      <path d="M3 24h26" opacity="0.4" />
      <path d="M3 28h26" opacity="0.4" />
      <path d="M9 24v4M16 24v4M23 24v4" opacity="0.4" />
      {/* Scanning eye */}
      <ellipse cx="16" cy="13" rx="9" ry="5.5" />
      <circle cx="16" cy="13" r="2.5" />
      {/* Active detection point */}
      <circle cx="16" cy="13" r="0.6" fill="currentColor" stroke="none" />
      {/* Detection beam */}
      <path d="M16 18.5l-3 5.5M16 18.5l3 5.5" opacity="0.6" />
    </I>
  );
}

/**
 * VERIFY — A check mark inside a hexagonal validation badge. Reads as
 * verified-by-a-human, not just AI. The hex implies a credential / seal.
 */
export function IconVerify(props: IconProps) {
  return (
    <I {...props}>
      {/* Hex badge */}
      <path d="M16 3l11 6.5v13L16 29 5 22.5v-13L16 3z" />
      {/* Inner check */}
      <path d="M11 16l3.5 3.5L21 13" />
      {/* Confidence dot */}
      <circle cx="24" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </I>
  );
}

/**
 * DOCUMENT — A timestamped record with audit lines. Reads as
 * audit-ready-documentation, automatic.
 */
export function IconDocument(props: IconProps) {
  return (
    <I {...props}>
      {/* Document body */}
      <path d="M7 4h13l5 5v19H7z" />
      {/* Folded corner */}
      <path d="M20 4v5h5" />
      {/* Timestamp lines */}
      <path d="M11 14h10" opacity="0.6" />
      <path d="M11 18h10" opacity="0.6" />
      <path d="M11 22h6" opacity="0.6" />
      {/* Verified-mark */}
      <circle cx="22" cy="22" r="2.5" />
      <path d="M20.8 22l1 1 1.5-1.5" />
    </I>
  );
}

/**
 * Arrow used as a directional marker (CTAs, nav, "scroll" indicator).
 */
export function IconArrowRight({ size = 16, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function IconArrowDown({ size = 16, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M8 3v10M4 9l4 4 4-4" />
    </svg>
  );
}

/**
 * Pulse — animated dot used for "operational" indicators.
 */
export function IconPulse(props: IconProps) {
  return (
    <span
      className="relative inline-flex h-2 w-2"
      style={{ verticalAlign: "middle" }}
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
    </span>
  );
}
