import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { CustomerStoryPanel } from "@/components/site/page/CustomerStoryPanel";
import { ReviewBlock } from "@/components/site/page/ReviewBlock";
import { FAQAccordion } from "@/components/site/page/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { BookDemoForm } from "@/components/site/BookDemoForm";
import { images } from "@/_design/images";

export const metadata = {
  title: "Book a demo, Birdseye",
  description:
    "See Birdseye in action. Book a 30-minute demo with our team.",
};

export default function BookDemoPage() {
  return (
    <PageShell>
      {/* Hero */}
      <PageHero
        eyebrow="DEMO · ON YOUR OWN FOOTAGE"
        preTitle="Book a demo"
        italicTitle="today."
        description="Tell us about your operation. We'll show you Birdseye live on your own footage — not a slide deck."
      />

      {/* Form section, extracted to a client component so we can run a
          safe submit handler. The previous inline <form> had no onSubmit
          and was leaking email into the URL bar on default GET (#95). */}
      <section className="section-dark py-24 md:py-32">
        <Container>
          <div className="max-w-[600px] mx-auto">
            <BookDemoForm />
          </div>
        </Container>
      </section>

      {/* What happens after you submit, three-step timeline that
          eliminates submission anxiety and signals process maturity.
          Borrowed move from Stripe / Ramp's "what to expect" patterns
          on enterprise demo flows. Each step carries a mono dateline
          + a one-line outcome so the reader knows the cadence. */}
      <section className="section-dark py-24 md:py-32 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-12 md:mb-14 text-center">
              <span className="system-label text-birdseye-electric">
                AFTER YOU SUBMIT · 7-DAY PATH
              </span>
              <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.018em] font-bold text-birdseye-cream text-balance">
                What happens{" "}
                <span className="font-serif italic font-normal text-birdseye-electric">
                  next
                </span>
                .
              </h2>
            </div>

            <ol className="grid md:grid-cols-3 gap-px bg-birdseye-cream/[0.08] rounded-card overflow-hidden border border-birdseye-cream/[0.08]">
              {[
                {
                  when: "DAY 01",
                  label: "Discovery call",
                  body: "30-minute intro. We learn your yards, your current setup, your integration stack, the outcome you're trying to hit.",
                },
                {
                  when: "DAY 03",
                  label: "Demo walkthrough",
                  body: "We show you GateCore, SafeCore, and YardCore against your specific operation, with real intervention footage, not a slide deck.",
                },
                {
                  when: "DAY 07",
                  label: "Pilot scope",
                  body: "If it fits, we send a written scope: sites, timeline, integrations, cost. Average install is 14 days from signed scope to operational.",
                },
              ].map((s, i) => (
                <li
                  key={s.when}
                  className="bg-birdseye-surface/60 px-6 py-7 md:px-8 md:py-9 flex flex-col"
                >
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                    <span className="text-birdseye-electric tabular-nums">
                      {s.when}
                    </span>
                    <span aria-hidden className="text-birdseye-cream/15">
                      ·
                    </span>
                    <span className="text-birdseye-cream/40 tabular-nums">
                      0{i + 1} / 03
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
                    {s.label}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.55] text-birdseye-cream/65 flex-1">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-center font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
              No commitments at any step. Pilot only ships if you sign one.
            </p>
          </div>
        </Container>
      </section>

      {/* Customer story panel */}
      <section className="section-dark py-24 md:py-32 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <CustomerStoryPanel
            stat={{
              value: "95%",
              eyebrow: "GENERAL STATS",
              label: "of customers scale Birdseye beyond their first yard.",
            }}
            story={{
              eyebrow: "CUSTOMER STORIES",
              quote:
                "I was the biggest skeptic there was, and I'm convinced that they are doing a much better job than manned security.",
              name: "Norm Sneyd",
              role: "Vice President, Bison Transport",
            }}
          />
        </Container>
      </section>

      {/* Review block */}
      <section className="section-dark py-24 md:py-32 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <ReviewBlock
            eyebrow="REVIEW"
            quote="With Birdseye, any accidents or safety violations are all reported immediately to our safety and compliance department."
            name="Stephen Merrion"
            role="Regional Facilities Manager at C.R. England"
            image={images.about.cameraInstall}
            imageAlt="Camera installation"
          />
        </Container>
      </section>

      {/* FAQ accordion */}
      <section className="section-dark py-24 md:py-32 border-t border-birdseye-cream/[0.10]">
        <Container className="max-w-site">
          <FAQAccordion
            eyebrow="FAQ"
            preTitle="Frequently asked"
            italicTitle="questions."
            items={[
              {
                question: "What will I learn during a demo?",
                answer:
                  "We'll walk through the cores most relevant to your operation, show real intervention footage, answer your questions, and outline what implementation would look like for your facility.",
              },
              {
                question: "How long will a demo take?",
                answer:
                  "Most demos take 20–30 minutes and focus on the areas that matter most to your operation: gate speed, safety, perimeter risk, and integration workflows.",
              },
              {
                question: "What information do I need to provide before the demo?",
                answer:
                  "Just enough for us to tailor the conversation: number of yards, current security setup, and what you're trying to fix. The rest we can cover live.",
              },
              {
                question:
                  "Will the demo show how Birdseye integrates with our TMS/YMS/WMS?",
                answer:
                  "Yes. We'll cover supported integrations and walk through how Birdseye plugs into your existing workflow without rip-and-replace.",
              },
              {
                question: "How much does Birdseye cost?",
                answer:
                  "Pricing depends on the size of your operation and the cores you need. Most customers see 25–50% reduction in security spend versus guard-based models. We'll share specifics on the demo.",
              },
              {
                question:
                  "How long does installation and onboarding take?",
                answer:
                  "Average 14 days from signed contract to operational. We work with the cameras and infrastructure you already have.",
              },
              {
                question: "Can I start with one solution and expand later?",
                answer:
                  "Yes. Start with GateCore, SafeCore, or YardCore on its own. Add the others as your operation grows.",
              },
            ]}
          />
        </Container>
      </section>
    </PageShell>
  );
}
