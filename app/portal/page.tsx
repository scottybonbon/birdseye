import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PortalDemo } from "@/components/site/page/PortalDemo";
import { CtaBanner } from "@/components/site/page/CtaBanner";

export const metadata = {
  title: "Portal, Birdseye",
  description:
    "Sign in to the Birdseye operations portal — or get a peek at what your operators see every shift.",
};

/**
 * /portal — two audiences:
 *
 *   1. Active customers and partners signing in.
 *   2. Prospects who navigated here to "see what the product actually
 *      looks like" before booking a demo.
 *
 * Both get served. The sign-in panel sits at the top (compact, primary
 * for the audience who came here for it). Below that is the
 * `PortalDemo` — a real-feeling product UI mock of the operator
 * dashboard so prospects can see the surface a Birdseye operator works
 * on, not a marketing illustration of one. (FIGMA-4)
 */
export default function PortalPage() {
  return (
    <PageShell bareFooter>
      {/* Sign-in panel — compact, top-left of the eventual dashboard
          peek. Active customers can land + click in 3 seconds; prospects
          scroll right past it to the product peek below. */}
      <section className="section-dark pt-20 md:pt-28 pb-12 md:pb-16">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end">
            <div>
              <span className="system-label text-birdseye-electric">
                PORTAL · OPERATOR SIGN-IN
              </span>
              <h1 className="mt-5 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.025em] font-bold text-birdseye-cream">
                Sign in to the{" "}
                <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                  operator
                </span>{" "}
                surface.
              </h1>
            </div>
            <div className="lg:pb-3">
              <p className="text-body text-birdseye-cream/65 max-w-copy">
                The portal is for active customers and partners. If you&apos;re new,
                scroll down to see what your operators would see — or book a demo.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md">
                  Sign in
                </Button>
                <Button variant="secondary" size="md">
                  Book a demo
                </Button>
                <a
                  href="#what-operators-see"
                  className="ml-1 system-label text-birdseye-cream/55 hover:text-birdseye-electric transition-colors"
                >
                  What operators see ↓
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product peek — the live operator surface, mocked from real
          data shapes. No screenshots, no hand-drawn product fiction —
          this IS the product, rendered in HTML so it scales perfectly
          and stays in sync with the design system. */}
      <PortalDemo />

      <CtaBanner
        preTitle="Want this view on your"
        italicTitle="yard"
        postTitle="?"
        description="A 20-minute walkthrough on a live Birdseye console, with your gates and your trailers."
        secondaryCta={{ label: "Read the platform tour", href: "/platform" }}
      />
    </PageShell>
  );
}
