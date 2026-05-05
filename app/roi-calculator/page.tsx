import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";
import { RoiCalculator } from "@/components/site/RoiCalculator";

export const metadata = {
  title: "ROI Calculator, Birdseye",
  description:
    "Estimate your gate-automation ROI. Most yards see 75% reduction in gate processing time. Use the calculator to see what that's worth on your operation.",
};

export default function RoiCalculatorPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="RESULTS · ROI CALCULATOR"
        preTitle="What it costs you"
        italicTitle="not"
        postTitle="to."
        tagline="Most yards see a 75% reduction in gate processing time. Here's what that's worth on yours."
        description="Plug in your gate volume, your current security spend, and your average detention rate. The calculator estimates annual return based on real Birdseye customer benchmarks."
      />

      <section className="section-dark py-16 md:py-24 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <RoiCalculator />
        </Container>
      </section>

      <CtaBanner
        preTitle="Want a"
        italicTitle="custom"
        postTitle="model?"
        description="Our team will build one specific to your operation, no commitment."
        primaryCta={{ label: "Book a 20-min walkthrough", href: "/book-a-demo" }}
        secondaryCta={{ label: "Read case studies", href: "/case-studies" }}
      />
    </PageShell>
  );
}
