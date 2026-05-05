import { FooterCta } from "@/components/site/FooterCta";
import { Footer } from "@/components/site/Footer";

/**
 * Composes the layered FooterCta + Footer into one unit.
 *
 * The CTA card sits in its own container with z-10 and a deep
 * negative bottom margin; the Footer below has a matching pull-up
 * top padding so the card visually overlaps the dark footer canvas.
 *
 * This is the default footer for the site, use <Footer /> directly
 * only on pages that already render their own CTA above the footer
 * (we don't want to double-stack two CTAs).
 */
export function FooterStack({
  preTitle,
  italicTitle,
  postTitle,
  description,
  primaryCta,
  secondaryCta,
  meta,
}: {
  preTitle?: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  meta?: string;
}) {
  return (
    <div className="relative bg-black">
      {/* The CTA card, pulls down into the footer below */}
      <div className="relative z-10 pt-16 md:pt-24 -mb-[8rem] md:-mb-[10rem]">
        <FooterCta
          preTitle={preTitle}
          italicTitle={italicTitle}
          postTitle={postTitle}
          description={description}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          meta={meta}
        />
      </div>

      {/* Footer pulls itself up underneath the CTA */}
      <Footer pullUp />
    </div>
  );
}
