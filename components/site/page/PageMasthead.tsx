import { Container } from "@/components/ui/Container";

/**
 * PageMasthead, the magazine "issue plate" that sits between the nav
 * and the hero on secondary pages. Reads as a small editorial filing
 * mark: which issue, which section of the publication, what category,
 * what year. Mono, tiny, low-contrast, never competes with the H1
 * but tells the careful reader they're inside a coherent body of work.
 *
 * Format:   BIRDSEYE_OS  /  ISSUE, 04  /  GATECORE          INFRASTRUCTURE  ·  VOL. I, 2026
 *
 * Used on platform / industry / about / career / manifesto / colophon
 * pages. NOT used on the home page (the home is the cover, not an
 * issue) and NOT used on the book-a-demo page (it's a transactional
 * surface, not editorial).
 */
export function PageMasthead({
  issue,
  section,
  category,
  year = "2026",
}: {
  /** Issue number, lossy, just a vibe. e.g. "04" */
  issue: string;
  /** Section name, uppercase, short. e.g. "GATECORE" */
  section: string;
  /** Category / theme, uppercase, short. e.g. "INFRASTRUCTURE" */
  category: string;
  /** Publication year, defaults to current ops year. */
  year?: string;
}) {
  return (
    <div className="section-dark border-b border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <div className="flex items-center justify-between h-9 font-mono text-[10px] tracking-[0.22em] text-birdseye-cream/40 uppercase whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0">BIRDSEYE_OS</span>
            <span aria-hidden className="text-birdseye-cream/15 shrink-0">
              /
            </span>
            <span className="shrink-0">ISSUE, {issue}</span>
            <span aria-hidden className="text-birdseye-cream/15 shrink-0">
              /
            </span>
            <span className="text-birdseye-cream/65 truncate">{section}</span>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span>{category}</span>
            <span aria-hidden className="text-birdseye-cream/15">·</span>
            <span>VOL. I, {year}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
