import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Principles, Birdseye",
  description:
    "Six principles that govern how the Birdseye website and the Yard Operating System are built. Restraint, signal, motion, and the receipt as the product.",
};

/**
 * /principles, six craft principles for the website and the platform.
 *
 * The third leg of the editorial layer alongside /manifesto (the WHY)
 * and /colophon (the MATERIALS). Where /manifesto is the brand thesis
 * (six theses about response, the receipt, verification, and the last
 * inch), /principles is the rules-of-engagement for HOW the website
 * and the product get made, the load-bearing constraints that make
 * the work feel like itself.
 *
 * Editorial register matches /manifesto + /colophon: PageMasthead at
 * the top, single article column, generous vertical rhythm, italic-
 * serif accent on a single word per principle title.
 *
 * Linked from the "For the careful reader" footer row + CommandPalette
 * + /colophon's footer cross-link.
 */
export default function PrinciplesPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[760px]">
            {/* Header */}
            <header className="mb-16 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Principles
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream text-balance">
                Six rules we&rsquo;ve{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  earned
                </span>
                .
              </h1>
              <p className="mt-7 text-body text-birdseye-cream/65 max-w-[580px]">
                The constraints that make the website and the platform
                feel like themselves. We don&rsquo;t treat these as taste.
                We treat them as load-bearing. Removing one quietly
                degrades the rest.
              </p>
            </header>

            {/* Principles list */}
            <ol className="space-y-16 md:space-y-20">
              {PRINCIPLES.map((p, i) => (
                <Principle key={i} index={i + 1} principle={p} />
              ))}
            </ol>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <Link
                  href="/manifesto"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Manifesto →
                </Link>
                <Link
                  href="/colophon"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Colophon →
                </Link>
                <Link
                  href="/changelog"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Changelog →
                </Link>
                <Link
                  href="/about-us"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  About →
                </Link>
              </div>
            </footer>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/* ─────────── Principle entry ─────────── */

type PrincipleEntry = {
  /** Title with one italic-accent token. The italic part lands the
   *  brand register move; everything around it is sans-bold. */
  titlePre: string;
  titleItalic: string;
  titleTail: string;
  /** 2-3 short paragraphs of body. Editorial register, not marketing. */
  body: string[];
};

function Principle({
  index,
  principle,
}: {
  index: number;
  principle: PrincipleEntry;
}) {
  return (
    <li className="grid md:grid-cols-[88px_1fr] gap-4 md:gap-12 items-start">
      <div className="font-mono text-[11px] tracking-[0.22em] text-birdseye-electric uppercase pt-2 tabular-nums">
        Principle 0{index}
      </div>
      <div>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream text-balance">
          {principle.titlePre}{" "}
          <span className="font-serif italic font-normal text-birdseye-electric">
            {principle.titleItalic}
          </span>{" "}
          {principle.titleTail}
        </h2>
        <div className="mt-5 space-y-4 text-[16.5px] md:text-[17px] leading-[1.7] text-birdseye-cream/70 max-w-[640px]">
          {principle.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </li>
  );
}

/* ─────────── The six ─────────── */

const PRINCIPLES: PrincipleEntry[] = [
  {
    titlePre: "The receipt is the",
    titleItalic: "product",
    titleTail: ".",
    body: [
      "We don't sell cameras. We don't sell agents. We don't sell software. We sell a verifiable record of every event that crossed your gate, your perimeter, or your yard. The cameras detect. The agents verify. The system seals. The thing that survives the lawsuit, the audit, and the customer call. That's what the customer paid for.",
      "Every product decision and every page on this site is in service of that artifact. If a feature, a section, or a sentence doesn't help produce or surface the verified record, it gets cut.",
    ],
  },
  {
    titlePre: "Restraint",
    titleItalic: "over",
    titleTail: "flourish.",
    body: [
      "The site has more electric blue than it shows. The motion vocabulary is four durations and a single easing. The palette is four tokens. Every one of those constraints is deliberate. Restraint is what makes the few moments we do punch (the italic accent, the camera-eye iris, the BrandEntry calibration) actually land.",
      "We resist adding until the absence is doing harm. New components have to argue for their existence against the silence they'd replace.",
    ],
  },
  {
    titlePre: "Mono carries the signal.",
    titleItalic: "Sans",
    titleTail: "carries the prose.",
    body: [
      "IBM Plex Mono shows up in datelines, telemetry overlays, system labels, status pills, kbd hints, and case-file captions. Inter shows up in everything else. The reader learns the contract in the first ten seconds: when you see mono on a Birdseye surface, you're looking at operational data. When you see sans, you're reading editorial copy.",
      "Once that contract holds, the reader can skim the rest of the site faster. They always know which token they're looking at.",
    ],
  },
  {
    titlePre: "One italic accent per",
    titleItalic: "headline",
    titleTail: ".",
    body: [
      "Every H1 and H2 across the site carries one (and only one) italic-serif word. Instrument Serif. Brand electric. It's the register that says &ldquo;this is the moment.&rdquo;",
      "If a headline carries two italic accents, neither one lands. We treat the italic the way a copy editor treats an em-dash: you get one per sentence, you make it count, and you don't apologize for it.",
    ],
  },
  {
    titlePre: "Reduce-motion is a",
    titleItalic: "first-class",
    titleTail: "user.",
    body: [
      "Every motion treatment on this site has a reduce-motion fallback. CameraEye drops to a single static frame. BrandEntry collapses to a 700ms fade. SectionInterlude becomes a quiet still composition. The Hero's telemetry strip stops pinging. The MaxTelepresence triptych still plays the event but without the cross-pane sweep.",
      "We don't ask vestibular-disorder users to put up with a degraded experience. We ask them to put up with a different experience, designed with the same care.",
    ],
  },
  {
    titlePre: "Documentation lives in the",
    titleItalic: "source",
    titleTail: ".",
    body: [
      "Every Birdseye component carries a top-of-file comment that explains what it is, why it exists, and how to use it. The comment is the spec. There is no separate doc site that drifts out of sync with the code; the code reads like prose, and the prose ages with the file.",
      "The colophon and this principles page are the editorial expression of the same conviction. If the rules can't be written down, they're not rules, they're moods, and moods don't survive a team handover.",
    ],
  },
];
