import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Manifesto, Birdseye",
  description:
    "A note on yards. Why we built an operating system for the unglamorous part of the supply chain.",
};

/**
 * /manifesto, the brand essay. Pure typography, single column, no CTAs.
 *
 * This page exists for one reason: to give the careful reader a place to
 * understand what we believe before they ever look at a price page. It
 * should read like a letter from the founders, not a marketing page.
 *
 * Composition:
 *   - PageMasthead, issue plate at the top
 *   - Editorial heading block, issue label, italic-serif title, standfirst
 *   - Numbered theses, six of them, each preceded by a hairline rule
 *   - Sign-off, place + month, restrained
 *
 * No images. No videos. No animation beyond what reduce-motion permits.
 * The page is the argument.
 */
export default function ManifestoPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[680px]">
            {/* Heading block */}
            <header className="mb-14 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Issue 01 · February 2026
              </div>
              <h1 className="font-serif italic font-normal text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-birdseye-cream text-balance">
                A note on yards.
              </h1>
              <p className="mt-7 font-serif italic text-[20px] md:text-[22px] leading-[1.45] text-birdseye-cream/55 text-balance">
                Or: why we built an operating system for the unglamorous part
                of the supply chain.
              </p>
            </header>

            {/* Opening, drop-cap paragraph */}
            <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p className="first-letter:font-serif first-letter:italic first-letter:font-normal first-letter:text-[5.5em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-birdseye-electric">
                The yard has been quiet about its problems for forty years. It
                operates in the gap between what the trucking system measures
                and what the warehouse system measures. The yard is the
                airlock, the place where the road becomes the building, and
                almost every metric the industry tracks ignores it.
              </p>
              <p>
                We started Birdseye to fix that. Not by being louder. By being
                a system of record.
              </p>
            </div>

            {/* Theses */}
            <Thesis number="01" title="The gate is an accounting problem.">
              <p>
                Every truck that arrives or leaves is a transaction. Every seal
                that shifts is a liability event. Every minute a driver spends
                idle at the gate is margin lost. We treated those events like
                security events for forty years, and staffed them with humans
                whose job was mostly to watch and to write things down later.
              </p>
              <p>
                Watching and writing things down later is a form of accounting
                that is too slow and too imprecise to be defensible in court,
                in audit, or in the conversation with the customer who lost a
                load. We replaced it with verified events, time-stamped,
                camera-confirmed, tied to the BOL, the seal number, the driver
                ID, and the customer&apos;s TMS. The gate is no longer a soft
                layer between the road and the yard. It&apos;s a system that
                produces receipts.
              </p>
            </Thesis>

            <Thesis number="02" title="Surveillance is not a deterrent.">
              <p>
                A camera nobody is watching is a sticker on a wall. We
                don&apos;t sell deterrent. We sell{" "}
                <em className="font-serif italic text-birdseye-cream">
                  response
                </em>
                . Agents who see the event when it happens, Voice-Down™
                through the speaker, document the resolution before it
                becomes an incident. The footage is the receipt, not
                the product.
              </p>
            </Thesis>

            <Thesis number="03" title="The event is the truth.">
              <p>
                Reports lie. Memory blurs. Affidavits are written by the person
                who needs the affidavit to read a certain way. A timestamped
                video of a sealed trailer leaving Yard 4 at 03:14 is the only
                artifact that survives the lawsuit, the audit, the insurance
                claim, and the conversation with the customer. Everything we
                build is in service of producing that artifact, and producing
                it instantly.
              </p>
            </Thesis>

            <Thesis number="04" title="Verify everything. Estimate nothing.">
              <p>
                Most yard operations live on estimates: estimated dwell time,
                estimated security spend, estimated incident rate. We replace
                each estimate with a verified event. ID-Verify™. Seal-Verify™.
                Compliance-Verify™. The system holds the receipts; the operator
                gets the report; the auditor gets the truth.
              </p>
            </Thesis>

            <Thesis number="05" title="Humans do the last inch.">
              <p>
                There is no algorithm we trust to fire a contractor or call a
                police dispatch on its own. AI gets us 99% of the way to
                confidence. The last 1% is a person, a trained agent,
                contractually accountable, on shift in front of a console,
                watching this yard and not someone else&apos;s.
              </p>
              <p>
                The cost of being wrong is paid in lawsuits, lost cargo, and
                lost lives. That cost should not be socialized to a model.
              </p>
            </Thesis>

            <Thesis number="06" title="The yard is infrastructure.">
              <p>
                Roads, ports, terminals, distribution centers, intermodal
                nodes — these are the tendons of the supply chain. They
                have been treated like janitorial expense. We treat them
                like infrastructure. Software, sensors, a system of
                record. Capable of running the operation, not merely
                watching it.
              </p>
              <p className="font-serif italic text-[19px] md:text-[20px] leading-[1.55] text-birdseye-cream/70">
                This is what we mean when we say{" "}
                <span className="text-birdseye-electric">
                  operating system for the yard
                </span>
                .
              </p>
            </Thesis>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-cream/40 uppercase space-y-2">
                <p>The Birdseye Team</p>
                <p>Mississauga, Ontario</p>
                <p>February, 2026</p>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <Link
                  href="/about-us"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  About →
                </Link>
                <Link
                  href="/colophon"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Colophon →
                </Link>
                <Link
                  href="/book-a-demo"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Book a demo →
                </Link>
              </div>
            </footer>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/**
 * One numbered thesis. Hairline rule above, mono number, italic-serif
 * title, prose body. Reads like a section in a printed essay.
 */
function Thesis({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-birdseye-cream/[0.10]">
      <div className="grid md:grid-cols-[80px_1fr] gap-3 md:gap-8">
        <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase pt-1.5">
          {number}
        </div>
        <div>
          <h2 className="font-serif italic font-normal text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.015em] text-birdseye-cream mb-6 text-balance">
            {title}
          </h2>
          <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/75 space-y-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
