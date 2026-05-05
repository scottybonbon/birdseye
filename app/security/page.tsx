import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { Container } from "@/components/ui/Container";
import { security, company } from "@/_design/content";

export const metadata = {
  title: "Security & Compliance, Birdseye",
  description:
    "How Birdseye encrypts, retains, and audits every gate event. Built for the procurement, IT, and security review.",
};

/**
 * /security, long-form expansion of the homepage Security section.
 * Linked as "Read the security overview" from the Security pillar block,
 * and reachable directly for procurement / IT / risk reviewers who need
 * something they can forward.
 *
 * Uses the existing `security` content object as the spine so any future
 * copy edit in `_design/content.ts` flows here automatically. Adds a
 * deeper pass on certifications, data handling, sub-processors, and how
 * to file a vulnerability disclosure.
 */
export default function SecurityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="SECURITY · COMPLIANCE"
        preTitle="Built for the way operations are"
        italicTitle="audited"
        postTitle="."
        description={security.subtitle}
        primaryCta={{ label: "Talk to the security team", href: "/contact" }}
      />

      {/* Certifications strip */}
      <section className="section-dark border-t border-birdseye-cream/[0.10] py-14 md:py-16">
        <Container className="max-w-site">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-birdseye-cream/[0.10]">
            {security.certifications.map((c) => (
              <div
                key={c.label}
                className="bg-black px-6 py-7 flex items-center justify-center text-center"
              >
                <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-birdseye-cream">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillars, same shape as homepage but with deeper body copy */}
      <section className="section-dark py-24 md:py-section">
        <Container className="max-w-site">
          <div className="max-w-[640px] mb-14 md:mb-20">
            <span className="system-label text-birdseye-electric">THE FOUR PILLARS</span>
            <h2 className="mt-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
              Encryption, retention, personnel,{" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                sovereignty
              </span>
              .
            </h2>
            <p className="mt-5 text-body text-birdseye-cream/65">
              Each pillar is a contractual commitment in your master service
              agreement, not a marketing claim. Procurement teams can request
              the full security package below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-birdseye-cream/[0.10]">
            {security.pillars.map((p) => (
              <div
                key={p.label}
                className="bg-black p-8 md:p-10 flex flex-col gap-4"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-electric">
                  {p.label}
                </span>
                <h3 className="text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
                  {p.title}
                </h3>
                <p className="text-body text-birdseye-cream/65 leading-[1.6]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Data handling specifics */}
      <section className="section-dark border-t border-birdseye-cream/[0.10] py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-28 self-start">
              <span className="system-label text-birdseye-electric">
                DATA HANDLING
              </span>
              <h2 className="mt-5 text-[clamp(1.75rem,2.5vw,2.25rem)] leading-[1.1] tracking-[-0.018em] font-bold text-birdseye-cream">
                What happens to your footage from camera to audit log.
              </h2>
            </div>

            <ol className="space-y-10">
              {[
                {
                  n: "01",
                  title: "Capture.",
                  body: "Camera streams are pulled directly from your existing infrastructure over your private network. We never re-encode at the edge — what you record is what we receive.",
                },
                {
                  n: "02",
                  title: "Transit.",
                  body: "Streams travel encrypted in flight via TLS 1.3. Site-to-cloud connections terminate at a region-pinned ingest cluster matched to your MSA.",
                },
                {
                  n: "03",
                  title: "Processing.",
                  body: "Computer-vision inference and event detection run inside an isolated tenant environment. AI model weights are never trained on customer footage without explicit, written opt-in.",
                },
                {
                  n: "04",
                  title: "Storage.",
                  body: "Event payloads (video, audio, gate metadata, voice channel, operator notes) are encrypted at rest with AES-256. Keys are rotated continuously and customer-scoped.",
                },
                {
                  n: "05",
                  title: "Access.",
                  body: "All operator and engineering access is brokered through SSO + hardware-token MFA, scoped to the minimum required, and logged to an immutable audit trail you can review on request.",
                },
                {
                  n: "06",
                  title: "Disposal.",
                  body: "Data is deleted on the schedule defined in your retention policy, verifiably, with cryptographic erasure of encryption keys.",
                },
              ].map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-[64px_1fr] gap-6 items-start border-t border-birdseye-cream/[0.10] pt-8 first:border-t-0 first:pt-0"
                >
                  <span className="font-mono text-[12px] tracking-[0.10em] text-birdseye-electric pt-1">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-[1.25rem] leading-[1.25] font-semibold text-birdseye-cream">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-body text-birdseye-cream/65">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Subprocessors + vuln disclosure */}
      <section className="section-dark border-t border-birdseye-cream/[0.10] py-24 md:py-section">
        <Container className="max-w-site">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="system-label text-birdseye-electric">SUB-PROCESSORS</span>
              <h2 className="mt-5 text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.15] tracking-[-0.012em] font-bold text-birdseye-cream">
                A short list, by design.
              </h2>
              <p className="mt-5 text-body text-birdseye-cream/65">
                We keep our sub-processor footprint deliberately small. The
                current list is available on request, typically a primary
                cloud provider, a regional CDN, and a transactional email
                service. We provide 30 days&apos; notice before adding any new
                sub-processor that touches customer data.
              </p>
              <Link
                href={`mailto:${company.email}?subject=Sub-processor%20list%20request`}
                className="mt-6 inline-flex items-center gap-2 text-[14px] text-birdseye-cream hover:text-birdseye-electric transition-colors"
              >
                Request the list <span aria-hidden>→</span>
              </Link>
            </div>

            <div>
              <span className="system-label text-birdseye-electric">
                VULNERABILITY DISCLOSURE
              </span>
              <h2 className="mt-5 text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.15] tracking-[-0.012em] font-bold text-birdseye-cream">
                Found something? Tell us.
              </h2>
              <p className="mt-5 text-body text-birdseye-cream/65">
                We welcome reports from security researchers. Submit findings
                to the address below with reproduction steps and any proof of
                concept. We acknowledge within two business days, triage
                within five, and credit researchers in our disclosure log
                with permission.
              </p>
              <Link
                href={`mailto:${company.email}?subject=Security%20disclosure`}
                className="mt-6 inline-flex items-center gap-2 text-[14px] text-birdseye-cream hover:text-birdseye-electric transition-colors"
              >
                {company.email} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
