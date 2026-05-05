import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/_design/content";

export const metadata = {
  title: "Contact, Birdseye",
  description: "Talk to a human at Birdseye. Sales, support, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CONTACT · DIRECT LINES"
        preTitle="Talk to a"
        italicTitle="human"
        postTitle="."
        tagline="Sales, support, press, partnerships — pick the door, we'll answer."
        description="Most replies inside one business day. Urgent operational issues route straight to a Birdseye agent."
        primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
      />

      {/* Contact methods grid */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px border-t border-birdseye-cream/[0.10] bg-birdseye-cream/[0.08]">
            <ContactCard
              index="01"
              title="Sales"
              body="See Birdseye on your yard. We'll set up a 20-minute walkthrough."
              ctaLabel="Book a demo"
              ctaHref="/book-a-demo"
            />
            <ContactCard
              index="02"
              title="Support"
              body="Already a customer? Our 24/7 operations team is one call away."
              ctaLabel={company.phone}
              ctaHref={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
            />
            <ContactCard
              index="03"
              title="Press & general"
              body="Media inquiries, partnerships, or anything else."
              ctaLabel={company.email}
              ctaHref={`mailto:${company.email}`}
            />
          </div>
        </Container>
      </section>

      {/* HQ */}
      <section className="section-dark py-20 md:py-24 border-t border-birdseye-cream/[0.08]">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <span className="system-label text-birdseye-electric">HEADQUARTERS</span>
              <h2 className="mt-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
                Mississauga,{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  Ontario
                </span>
                .
              </h2>
            </div>
            <div className="space-y-2 text-body text-birdseye-cream/65">
              <p className="text-birdseye-cream">{company.address}</p>
              <p>
                <Link
                  href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-birdseye-cream/85 hover:text-birdseye-electric transition-colors"
                >
                  {company.phone}
                </Link>
              </p>
              <p>
                <Link
                  href={`mailto:${company.email}`}
                  className="text-birdseye-cream/85 hover:text-birdseye-electric transition-colors"
                >
                  {company.email}
                </Link>
              </p>
              <p className="pt-4 system-label text-birdseye-cream/45">
                MON–FRI · 08:00–18:00 ET · OPS COVERAGE 24/7
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

function ContactCard({
  index,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  index: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="bg-birdseye-surface p-7 md:p-9 border-b border-birdseye-cream/[0.10]">
      <div className="font-mono text-[12px] tracking-[0.08em] text-birdseye-electric mb-5">
        {index}
      </div>
      <h3 className="text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream">
        {title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-birdseye-cream/65">
        {body}
      </p>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex items-center gap-2 text-[14px] text-birdseye-cream hover:text-birdseye-electric transition-colors"
      >
        {ctaLabel} <span>→</span>
      </Link>
    </div>
  );
}
