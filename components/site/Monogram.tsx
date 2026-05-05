/**
 * Monogram — the codified brand mark.
 *
 * Mirrors the favicon (electric dot + cream "B") so the in-tab and
 * in-site mark are the same atom. Two variants:
 *
 *   - "compact" (default): dot + "B" — used where a brief brand stamp
 *     is wanted (BrandEntry boot caption, OG card, social embeds).
 *   - "wordmark":  dot + "BIRDSEYE" — used for full chrome moments
 *     (sticky-Nav top-left, footer corner stamp).
 *
 * Subtlety rules:
 *   - The dot is the load-bearing element, not the type. The B/wordmark
 *     reinforces recognition; remove the dot and the mark loses its
 *     punctuation.
 *   - No drop shadow, no gradient, no glow. Brand discipline = hairline
 *     restraint. The dot is solid electric; the type is solid cream.
 *   - The mark scales by font-size, not by transform. Use `size` to set
 *     height tier; the dot scales proportionally via em.
 */

type MonogramSize = "sm" | "md" | "lg";

const SIZE_TOKENS: Record<MonogramSize, { height: string; gap: string }> = {
  sm: { height: "1rem", gap: "0.375em" }, // 16px
  md: { height: "1.5rem", gap: "0.4em" }, // 24px
  lg: { height: "2.25rem", gap: "0.4em" }, // 36px
};

export function Monogram({
  variant = "compact",
  size = "md",
  className = "",
  /** Override the default cream wordmark color (e.g. on light surfaces). */
  textColor,
  /** Override the default electric dot color. Almost never needed. */
  dotColor,
}: {
  variant?: "compact" | "wordmark";
  size?: MonogramSize;
  className?: string;
  textColor?: string;
  dotColor?: string;
}) {
  const tokens = SIZE_TOKENS[size];
  return (
    <span
      aria-label="Birdseye"
      className={`inline-flex items-center font-sans font-black leading-none tracking-[-0.04em] ${className}`}
      style={{
        fontSize: tokens.height,
        gap: tokens.gap,
        color: textColor ?? "var(--birdseye-cream, #F4EDE4)",
      }}
    >
      {/* The dot — sized in em so it scales with the font-size. */}
      <span
        aria-hidden
        className="inline-block rounded-full"
        style={{
          width: "0.32em",
          height: "0.32em",
          background: dotColor ?? "var(--birdseye-electric, #2E4BFF)",
        }}
      />
      <span aria-hidden>{variant === "wordmark" ? "BIRDSEYE" : "B"}</span>
    </span>
  );
}
