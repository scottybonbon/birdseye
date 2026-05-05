import Image from "next/image";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { FeatureGrid } from "@/components/site/page/FeatureGrid";
import { LeadershipGrid } from "@/components/site/page/LeadershipGrid";
import { MetricStrip } from "@/components/site/page/MetricStrip";
import { CtaBanner } from "@/components/site/page/CtaBanner";
import { NewsroomStrip } from "@/components/site/NewsroomStrip";
import { Container } from "@/components/ui/Container";
import { images } from "@/_design/images";

export const metadata = {
  title: "About, Birdseye",
  description:
    "Birdseye is building the operating system for North American yards. Learn about our mission, our team, and how the Maximum Telepresence Approach™ keeps every gate event verifiable.",
};

export default function AboutUsPage() {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow="ABOUT BIRDSEYE"
        preTitle="The Birdseye view"
        italicTitle="on AI"
        postTitle="."
        // Restored from the live birdseyesecurity.com/about-us page, the
        // brand's own one-line thesis for what Birdseye is. Equity line;
        // do not retire without a deliberate replacement that's clearly
        // better.
        tagline="AI-driven eyes in the sky. Human precision on the ground."
        description="Birdseye protects some of North America's most complex and high-risk operations with the Maximum Telepresence Approach™ — agentic AI on every camera, trained operators on every triggered event, and audit-grade records on every outcome. Operators run more securely, more efficiently, and at lower cost."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
        secondaryCta={{ label: "See open roles", href: "/career" }}
      />

      {/* Origin story */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            <div>
              <span className="system-label text-birdseye-electric">OUR BEGINNINGS</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.022em] font-bold text-birdseye-cream">
                Built to fix what guards{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  couldn&apos;t
                </span>
                .
              </h2>
            </div>
            <div className="space-y-5 text-body text-birdseye-cream/65 max-w-[560px]">
              <p>
                Birdseye Security Solutions is one of the leading providers of
                remote monitoring and operations management solutions in North
                America. We were founded to address the gaps left by
                traditional guard-based security.
              </p>
              <p>
                Our Maximum Telepresence Approach™ integrates high-resolution
                cameras, smart sensors, AI analytics, and professionally trained
                remote agents to safeguard gates, yards, perimeters, and entire
                facilities, 24/7/365.
              </p>
              <p>
                Today, our solutions don&apos;t just reduce risk. They improve
                operational efficiency and lower costs, typically cutting
                client spend by{" "}
                <span className="text-birdseye-cream font-semibold">
                  60%+ compared to guard-based models
                </span>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Image trio, three frames from the operations archive. Each
          carries a mono caption and fires the cursor's HUD readout when
          hovered, reinforcing that every photo on the site is real
          captured footage from a real install or shift. */}
      <section className="section-dark pb-12">
        <Container className="max-w-site">
          <div className="grid md:grid-cols-3 gap-x-4 gap-y-6">
            <ArchiveFrame
              src={images.about.cameraInstall}
              alt="Camera installation"
              caption="ARCHIVE · CAMERA INSTALL · 2023"
              priority
            />
            <ArchiveFrame
              src={images.about.operatorAtMonitors}
              alt="Operator at monitors"
              caption="ARCHIVE · MISSISSAUGA OPS · 2024"
            />
            <ArchiveFrame
              src={images.about.operatorAtWork}
              alt="Operator at workstation"
              caption="ARCHIVE · NIGHT-SHIFT CONSOLE · 2024"
            />
          </div>
        </Container>
      </section>

      {/* AI-powered teams beat (FIGMA-5). Lands between the origin
          story and the metric strip — argues that Birdseye's own ops
          scale is AI-multiplied, not just headcount-driven. The team
          is the system; the system is the team. */}
      <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.06]">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end">
            <div>
              <span className="system-label text-birdseye-electric">
                AI-AUGMENTED · BY DESIGN
              </span>
              <h2 className="mt-5 text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.018em] font-bold text-birdseye-cream">
                Four hundred professionals,{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  multiplied
                </span>{" "}
                by the system.
              </h2>
            </div>
            <p className="text-body text-birdseye-cream/65 max-w-copy lg:pb-3">
              Our operators don&apos;t sit in front of static monitors. They
              run an AI-augmented console where computer vision pre-flags
              every event, the relevant context loads automatically, and the
              same person can hold attention on a hundred cameras at once.
              We sell the methodology because we run it ourselves — every
              shift, every yard, every gate event we cover.
            </p>
          </div>
        </Container>
      </section>

      <MetricStrip
        eyebrow="THE COMPANY"
        preTitle="By the"
        italicTitle="numbers"
        postTitle="."
        description="A record we update — not a story we tell once."
        metrics={[
          {
            value: "400",
            label: "Professionals across the team",
          },
          {
            value: "4",
            label: "Countries we operate from",
          },
          {
            value: "2011",
            label: "The year Birdseye was founded",
          },
          {
            value: "150%",
            label: "Year-over-year growth",
          },
        ]}
      />

      <LeadershipGrid
        eyebrow="LEADERSHIP"
        preTitle="The team"
        italicTitle="behind"
        postTitle=" YARD OS."
        description="Five operators with deep credentials across trucking, technology, finance, and customer-facing scale. Headshots are placeholders until real photographs land."
        members={[
          {
            name: "Mike Grabovica",
            role: "CEO",
            bio: "Founder of Birdseye and an experienced tech entrepreneur focused on scaling operational businesses.",
          },
          {
            name: "Roe Sharma",
            role: "Head of Account Management",
            bio: "Over 15 years in trucking and facility management, including eight years leading customer success at Birdseye.",
          },
          {
            name: "Milan Luketic",
            role: "CTO",
            bio: "15+ years in product development and former CTO at multiple mid-sized tech firms.",
          },
          {
            name: "Maruf Mahmood",
            role: "CFO",
            bio: "Global finance leader with extensive experience supporting fast-growing technology companies.",
          },
          {
            name: "Vy Duong",
            role: "Director of Sales",
            bio: "20+ years in logistics and five years at Birdseye building high-impact customer partnerships.",
          },
        ]}
      />

      {/* "Birdseye Difference" six-point grid relocated 2026-05-04
          (Scotty call) — competitive differentiation belongs on the
          /platform page where the buyer is asking "why this and not
          a competitor," not on /about-us where the buyer is asking
          "who are these people." Component lives at
          components/site/BirdseyeDifference.tsx and now mounts on
          /platform. About-us page now flows team grid → values grid
          directly with no intervening pitch interruption. */}

      <FeatureGrid
        eyebrow="THE ICARE PHILOSOPHY"
        preTitle="The five values that show up"
        italicTitle="every day"
        postTitle="."
        description="Behaviors that earn their keep on every install, every shift, every customer relationship."
        columns={5}
        features={[
          {
            title: "Integrity",
            body: "We do what's right, even when no one is watching. Integrity shapes our decisions, our interactions, and the trust our customers place in us.",
          },
          {
            title: "Commitment",
            body: "We commit to outcomes, not just service-level agreements. If we say we'll catch it, we'll catch it.",
          },
          {
            title: "Adaptation",
            body: "Every yard is different. Our platform and our people meet operations where they are.",
          },
          {
            title: "Respect",
            body: "Respect for our customers, our agents, our drivers, and the work the industry does every day.",
          },
          {
            title: "Excellence",
            body: "We build, install, and operate as if our own freight depended on it. Because it always does.",
          },
        ]}
      />

      {/* Pull quote */}
      <section className="section-dark py-24 md:py-32">
        <Container>
          <div className="max-w-[820px] mx-auto text-center">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream">
              Every event makes our system{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                smarter
              </span>
              . Every yard makes your network{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                stronger
              </span>
              .
            </h2>
          </div>
        </Container>
      </section>

      {/* Team photo */}
      <section className="section-dark pb-24">
        <Container className="max-w-site">
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{ aspectRatio: "2/1" }}
            data-cursor-caption="ARCHIVE · THE BIRDSEYE TEAM · MISSISSAUGA"
          >
            <Image
              src={images.about.teamGroup}
              alt="The Birdseye team"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-center system-label text-birdseye-cream/45">
            THE BIRDSEYE TEAM · MISSISSAUGA, ONTARIO
          </p>
        </Container>
      </section>

      {/* Today on the yard — recently published across releases, field
          notes, and news. Mounted on /about per Scotty (2026-05-04):
          /about is where "what's the company up to" content lives, and
          this is where prospective hires + journalists + visitors come
          to read the recent signal. Sat at the home page top
          previously but pulled — was making the home page feel like a
          publication first and a product second. Better fit here. */}
      <NewsroomStrip />

      <CtaBanner
        preTitle="Ready to see it"
        italicTitle="live"
        postTitle="?"
        description="Book a 20-minute walkthrough on your own yard."
        secondaryCta={{ label: "Read the blog", href: "/blog" }}
      />
    </PageShell>
  );
}

/**
 * One archived photo from the operations archive, image + mono caption
 * underneath. Hovering the image triggers the cursor HUD with the same
 * caption, so the metaphor reads from both directions: the site labels
 * its own footage AND the cursor's surveillance UI labels what it sees.
 */
function ArchiveFrame({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <div>
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "4/5" }}
        data-cursor-caption={caption}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={priority}
        />
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/40">
        <span
          aria-hidden
          className="grid place-items-center h-3 w-3 rounded-full bg-birdseye-electric/15 text-birdseye-electric/80 text-[9px] leading-none font-medium"
        >
          +
        </span>
        <span>{caption}</span>
      </div>
    </div>
  );
}
