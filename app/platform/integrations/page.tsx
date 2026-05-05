import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Integrations, Birdseye",
  description:
    "Birdseye plugs into your YMS, TMS, WMS, and VMS. No rip and replace. Data flows match your existing operational workflows.",
};

export default function IntegrationsPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="PLATFORM · INTEGRATIONS"
        preTitle="Plugs into the systems you"
        italicTitle="already"
        postTitle="run."
        tagline="YMS, TMS, WMS, VMS — Birdseye becomes the verified data source for all of them."
        description="No rip-and-replace. No new dashboards to learn. Birdseye sends the right event to the right system, in the right format, in real time."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "Talk to engineering", href: "/contact" }}
      />

      {/* Integration grid */}
      <FeatureGrid
        eyebrow="WHAT BIRDSEYE TALKS TO"
        preTitle="Operational"
        italicTitle="systems"
        postTitle="."
        description="The systems already on your stack — Birdseye sends them verified events from every gate, yard, and perimeter."
        features={[
          {
            title: "YMS · Yard Management",
            body: "Live spot-by-spot occupancy, dwell time, and trailer status piped straight into your YMS of record.",
          },
          {
            title: "TMS · Transportation Management",
            body: "Driver and BOL verification, gate-arrival timestamps, detention tracking, all flowing into your TMS.",
          },
          {
            title: "WMS · Warehouse Management",
            body: "Dock door arrivals, trailer-to-door assignments, and load-out events sync with your WMS.",
          },
          {
            title: "VMS · Visitor Management",
            body: "Visitor and vendor entries verified at the gate, with credentials checked against your VMS list.",
          },
          {
            title: "ERP & accounting",
            body: "Verified gate timestamps feed detention claims, billing reconciliation, and cost-center reporting.",
          },
          {
            title: "SIEM & SOC tools",
            body: "Security events stream to Splunk, Datadog, or your SIEM of choice for unified threat monitoring.",
          },
        ]}
      />

      {/* Integration approaches */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="system-label text-birdseye-electric">HOW WE CONNECT</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
                Three ways in,{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  zero
                </span>{" "}
                friction.
              </h2>
            </div>
            <div className="space-y-8 text-body text-birdseye-cream/65 max-w-[560px]">
              <div>
                <h3 className="text-birdseye-cream font-bold text-[18px] mb-2">
                  Direct API
                </h3>
                <p>
                  REST and webhook endpoints documented for developers. Most
                  integrations live in days, not quarters.
                </p>
              </div>
              <div>
                <h3 className="text-birdseye-cream font-bold text-[18px] mb-2">
                  Pre-built connectors
                </h3>
                <p>
                  Native connectors for the most common YMS, TMS, and WMS
                  platforms in North America. We handle versioning and
                  maintenance.
                </p>
              </div>
              <div>
                <h3 className="text-birdseye-cream font-bold text-[18px] mb-2">
                  Custom partner work
                </h3>
                <p>
                  For bespoke or legacy systems, our solutions team builds the
                  bridge, typically inside the standard 14-day deployment.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        preTitle="Have a system you want"
        italicTitle="connected"
        postTitle="?"
        description="Tell us what you run, we'll have a path for it."
        primaryCta={{ label: "Talk to the team", href: "/contact" }}
        secondaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
      />
    </PageShell>
  );
}
