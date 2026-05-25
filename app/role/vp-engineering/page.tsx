import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Director / VP of Engineering, Birdseye",
  description:
    "Birdseye is hiring a Toronto-based Director or VP of Engineering to own the platform end-to-end. A founder letter from Mike Grabovica, and the full picture of the role we're handing them.",
};

/**
 * /role/vp-engineering, the leadership recruiting page.
 *
 * Typography note (2026-05-25): on builder-audience pages we swap the
 * italic-serif (Instrument Serif) accent for Spline Sans Mono Bold.
 * Reads in-register for engineering candidates without losing the
 * "headline-tier accent" function the italic-serif played elsewhere.
 *
 * Voice is Mike's, authenticated against /letter + his Dec 2025
 * Supply Chain Xchange piece + Check Call / FreightWaves appearances.
 * Em-dash free, no soft hedging, no preamble.
 */
export default function VpEngineeringPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[680px]">
            {/* Heading block */}
            <header className="mb-14 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Open role · Toronto · May 2026
              </div>
              <h1 className="font-spline font-bold uppercase text-[clamp(2.25rem,5.8vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-birdseye-cream text-balance">
                Director or VP of Engineering.
              </h1>
              <p className="mt-8 font-spline font-normal uppercase text-[14px] md:text-[15px] leading-[1.65] tracking-[0.06em] text-birdseye-cream/55 max-w-[560px]">
                A note from Mike on the engineering leader we&apos;re
                hiring, and the platform we&apos;re handing them.
              </p>
            </header>

            {/* Founder letter */}
            <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p className="first-letter:font-spline first-letter:font-bold first-letter:text-[4em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-birdseye-electric">
                Birdseye runs the gates on some of the busiest yards in
                North America. Bison Transport. C.R. England. About
                four hundred of us, across four operations floors in
                Mississauga, Dallas, Belgrade, and Bogotá. Twelve
                million gate events a month.
              </p>
              <p>
                The platform underneath this is the operating system
                for the yard. Cameras, sensors, AI on every stream,
                TMS and WMS integrations, agentic decisioning, an
                operator console, and an audit trail that holds up in
                court. It is a real product, and it is at the point
                where the next chapter has to be designed by someone
                who has done it before.
              </p>
              <p>
                I&apos;m writing this myself because I want the right
                person to read it from me. We are hiring a Director
                or VP of Engineering to own this platform end-to-end.
                Not to manage it. To{" "}
                <span className="font-spline font-bold uppercase text-birdseye-cream">
                  own
                </span>
                {" "}it. To come in with a clear point of view of what
                visionary work looks like in this category, and to
                push hard against me, against the team, against the
                inertia of operating at scale, to bring that vision
                to life.
              </p>
              <p>
                I want autonomy, control, and intention. Autonomy,
                because the platform is theirs to set the direction
                for. Control, because they will own the system and
                the team that builds it. Intention, because every
                architectural decision in the next twelve months will
                compound for a decade.
              </p>
              <p>
                The career arc I want: developer first, engineering
                manager second, director or VP third. Technical
                credibility before management credibility. The hand
                still needs to know where the code lives.
              </p>
              <p>
                AI-native, not AI-curious. We use AI inside the
                product and inside how we build the product. The
                difference between a leader who has changed how a
                team writes, reviews, and ships code, and one who has
                experimented personally with Copilot, is the
                difference between us hiring and us not hiring.
              </p>
            </div>

            {/* Three beliefs */}
            <div className="mt-14 md:mt-16 space-y-10">
              <Belief
                titlePre="Built a"
                titleAccent="product"
                titleTail=", not delivered a project."
              >
                <p>
                  We are not running a delivery shop. The leader I
                  want has lived inside a product business. Recurring
                  revenue. Customers who can leave. A platform that
                  has to keep earning the right to exist every
                  quarter.
                </p>
              </Belief>

              <Belief
                titlePre="AI is a"
                titleAccent="multiplier"
                titleTail=", not a substitute."
              >
                <p>
                  A sloppy team with AI ships sloppier code, faster.
                  A rigorous team with AI does the work of three.
                  Tell us what changed in your team&apos;s workflow,
                  what you measured, what you kept. Not slides.
                  Receipts.
                </p>
              </Belief>

              <Belief
                titlePre="The bar is hands-on"
                titleAccent="credibility"
                titleTail="."
              >
                <p>
                  Not a role for someone who has not opened a pull
                  request in five years. If the senior engineers
                  don&apos;t walk out of the first architecture
                  review thinking{" "}
                  <span className="font-spline font-bold uppercase text-birdseye-cream">
                    finally
                  </span>
                  , we picked wrong.
                </p>
              </Belief>
            </div>

            {/* Closing of letter */}
            <div className="mt-14 md:mt-16 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p>
                We&apos;re a Mississauga company. Most of the
                platform team and most of the leadership is here. We
                strongly prefer this leader to be in the Greater
                Toronto Area.
              </p>
              <p className="font-spline font-normal uppercase text-[15px] md:text-[16px] leading-[1.65] tracking-[0.05em] text-birdseye-cream/85 max-w-[560px]">
                If you have built and operated a real platform, and
                you want the next decade of yard infrastructure to
                have your fingerprints on it, we should talk.
              </p>
            </div>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="grid sm:grid-cols-[auto_1fr] items-end gap-4 sm:gap-10">
                <div>
                  <div className="font-spline font-bold uppercase text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.05] tracking-[-0.015em] text-birdseye-cream">
                    Mike Grabovica
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/45">
                    Founder &amp; CEO · Birdseye
                  </div>
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/35 sm:text-right">
                  Mississauga, Ontario · May 2026
                </div>
              </div>
            </footer>

            {/* ─── The role in detail ─────────────────────────── */}
            <SectionBreak number="01" label="The role in detail." />

            <Thesis number="01" title="Platform architecture.">
              <p>
                Own the technical direction for the entire stack.
                Gate automation, site configuration, customer
                workflows, integrations, the data layer, the operator
                console, the AI pipeline that pre-processes every
                stream. Make the decisions the company will still be
                glad we made in 2030.
              </p>
            </Thesis>

            <Thesis number="02" title="Engineering execution.">
              <p>
                Build a predictable delivery system. Clear ownership.
                Real planning. Real risk management. Move us off
                heroes and onto a process that scales without
                sacrificing the speed that got us here.
              </p>
            </Thesis>

            <Thesis number="03" title="Team leadership.">
              <p>
                Manage and upgrade the engineering team. Coach
                managers and senior engineers. Create accountability
                without destabilizing the people who have carried the
                platform this far. Hire the next wave.
              </p>
            </Thesis>

            <Thesis number="04" title="An AI-native development system.">
              <p>
                Make AI-native coding part of the engineering
                operating model. Not a side experiment. Define the
                tools, the practices, the review standards, the
                guardrails. Measure the lift. Push the team somewhere
                the rest of the industry will catch up to in two
                years.
              </p>
            </Thesis>

            <Thesis number="05" title="Production reliability.">
              <p>
                Own reliability, observability, incident review, and
                operational readiness for a platform where the
                customer&apos;s freight depends on us being right.
                Reliability is a culture. The leader sets it.
              </p>
            </Thesis>

            <Thesis number="06" title="Scaling the platform.">
              <p>
                Support a much larger customer base, many more sites,
                higher event volume, more complex integrations, and
                the hybrid cloud and data-center reality of operating
                on customer-owned infrastructure. The next 10x is not
                optional.
              </p>
            </Thesis>

            <Thesis number="07" title="Business alignment.">
              <p>
                Connect engineering decisions to adoption, gross
                margin, implementation velocity, customer
                reliability, and long-term product leverage.
                Engineering is a profit center if it is led like one.
              </p>
            </Thesis>

            {/* ─── What "great" looks like ─────────────────────── */}
            <SectionBreak number="02" label="What great looks like." />

            <IntroBlock>
              <p>
                A great candidate walks into a working session in
                month two and answers these without notes. With a
                point of view specific to this platform that they
                will defend.
              </p>
            </IntroBlock>

            <QuestionList
              questions={[
                "How should our platform scale technically over the next twelve months?",
                "Where are the hidden risks in reliability, integrations, data flow, and team structure?",
                "How do we make engineering measurably faster using AI-native coding?",
                "How do we reduce the platform’s dependency on individual heroes?",
                "How do we make the team more predictable without making it slower?",
                "How do we connect architecture to adoption, margin, and customer success?",
              ]}
            />

            {/* ─── The bar ───────────────────────────────────── */}
            <SectionBreak number="03" label="The bar." />

            <IntroBlock>
              <p>
                Each line is a hard requirement with the reason
                attached. The reason matters as much as the rule.
              </p>
            </IntroBlock>

            <Requirements
              items={[
                {
                  rule: "Ten-plus years in software engineering.",
                  reason:
                    "The platform has architectural decisions in it that pre-date most of the team. We need a leader who recognizes the patterns and the smells without needing them explained.",
                },
                {
                  rule: "Five-plus years in engineering management.",
                  reason:
                    "Run managers, not just engineers. Coaching the layer below you is a different muscle than being individually productive.",
                },
                {
                  rule: "Developer to Engineering Manager to Director or VP.",
                  reason:
                    "The hand still needs to know where the code lives. We don’t hire people whose first technical job was managing technical people.",
                },
                {
                  rule: "Built and operated a recurring-revenue product platform.",
                  reason:
                    "B2B SaaS or subscription. A business where the customer can leave. We need the discipline that comes from earning the renewal.",
                },
                {
                  rule: "Hands-on cloud-native architecture experience.",
                  reason:
                    "AWS, GCP, or Oracle Cloud (Azure acceptable). Scalability, observability, deployment patterns, cost tradeoffs, operational risk. We will ask you to whiteboard a real piece of our infrastructure on day one of the loop.",
                },
                {
                  rule: "Web-scale client/server, distributed systems, microservices.",
                  reason:
                    "High-availability production. You don’t need to be a streaming-video specialist, but you need to have shipped at scale.",
                },
                {
                  rule: "AI-native coding, implemented with a team.",
                  reason:
                    "Implemented. With a team. Not a personal Copilot subscription. Tell us what changed in your team’s workflow, what you measured, what broke, what you kept.",
                },
                {
                  rule: "Operated production systems where uptime and reliability mattered.",
                  reason:
                    "We’re not asking if your dashboard had four nines. We’re asking what happened the night it didn’t.",
                },
                {
                  rule: "Turned a founder-led or hero-driven team into a scalable organization.",
                  reason:
                    "We are mid-transition. We need a leader who has lived the same transition before and knows its timing.",
                },
              ]}
            />

            {/* ─── Strong preferences ─────────────────────────── */}
            <SectionBreak number="04" label="Strong preferences." />

            <IntroBlock>
              <p>
                Not required. A real advantage. The kind of
                background that earns a longer conversation on day
                one.
              </p>
            </IntroBlock>

            <Preferences
              items={[
                {
                  title: "Toronto / GTA presence.",
                  body: "Strongly preferred. Most of the platform team and most of the leadership is here.",
                },
                {
                  title: "Big Tech plus startup operating experience.",
                  body: "Big Tech standards, startup velocity. People who have lived both sides of that calibration consistently outperform people who have lived only one.",
                },
                {
                  title: "Online video streaming infrastructure.",
                  body: "Camera-to-cloud video, WebRTC, RTSP, HLS, low-latency delivery, multi-tenant video platforms, edge-to-cloud pipelines, observability at scale.",
                },
                {
                  title: "Computer vision in production.",
                  body: "Video analytics, object detection and tracking, edge or cloud-based CV systems. Especially CV taken from prototype to production with paying customers.",
                },
                {
                  title: "Hybrid cloud and data center experience.",
                  body: "Cloud and on-prem at the same time. Cloud-to-DC connectivity, networking, latency, secure connectivity. We operate on customer-owned infrastructure.",
                },
                {
                  title: "Adjacent domain experience.",
                  body: "Logistics, IoT, security, infrastructure, workflow automation, multi-site operations. The pattern recognition transfers.",
                },
              ]}
            />

            {/* ─── Who this isn't for ─────────────────────────── */}
            <SectionBreak number="05" label="Who this isn’t for." />

            <IntroBlock>
              <p>
                Said plainly so nobody spends a month in a loop they
                were never going to win.
              </p>
            </IntroBlock>

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Not for a leader whose primary career has been inside
                a bank, a government agency, or a large institution
                where operating tempo is set by an org chart rather
                than by customers.
              </p>
              <p>
                Not for a consulting or agency leader whose success
                has been measured by delivery against a contract
                rather than the long-term health of a platform.
              </p>
              <p>
                Not for a pure people manager, no matter how senior.
                We need a leader who can still go deep technically
                when the team needs it.
              </p>
              <p>
                Not for an AI tourist. We will ask, in detail, and we
                will know the difference.
              </p>
            </div>

            {/* ─── Logistics ──────────────────────────────────── */}
            <SectionBreak number="06" label="Logistics." />

            <div className="mt-10 md:mt-12 grid md:grid-cols-[200px_1fr] gap-y-8 gap-x-10 text-[16px] md:text-[17px] leading-[1.6] text-birdseye-cream/80">
              <LogisticsRow label="Location">
                <p>
                  Greater Toronto Area strongly preferred. Hybrid,
                  with regular time in our Mississauga office.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Reports to">
                <p>
                  Mike Grabovica, Founder &amp; CEO. Partners closely
                  with the CTO and operations leadership.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Compensation">
                <p>
                  Competitive for a Toronto-based senior engineering
                  leader. Cash, meaningful equity, full benefits.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Hiring process">
                <p>
                  Four conversations over two to three weeks. A
                  first call with Mike. A working session with
                  platform leadership on a real architectural
                  problem from our roadmap. A team-fit set. A final
                  conversation with the executive team.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Start date">
                <p>Flexible. Preference for Q3 2026.</p>
              </LogisticsRow>
            </div>

            {/* ─── Apply ──────────────────────────────────────── */}
            <SectionBreak number="07" label="Apply." />

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Send your résumé and a short note on the most
                consequential platform decision you have made in the
                last five years. Not the most successful. The most
                consequential.
              </p>
              <p>Two routes. Both reach the same inbox.</p>
            </div>

            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@birdseyesecurity.ca?subject=Director%20%2F%20VP%20Engineering%20application"
                className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Write to Mike directly
                <span aria-hidden>→</span>
              </a>
              <a
                href="https://birdseyeaccount.bamboohr.com/careers"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-birdseye-cream/15 text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-cream/[0.04] hover:border-birdseye-cream/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Apply via ATS
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/40">
              HELLO@BIRDSEYESECURITY.CA · REFERENCES OPTIONAL
            </div>

            {/* Breadcrumb */}
            <div className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-birdseye-cream/35 uppercase">
                <Link
                  href="/career"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  All open roles →
                </Link>
                <Link
                  href="/about-us"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  About Birdseye →
                </Link>
                <Link
                  href="/letter"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  A note from Mike →
                </Link>
                <Link
                  href="/manifesto"
                  className="hover:text-birdseye-cream transition-colors"
                >
                  Manifesto →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </PageShell>
  );
}

/**
 * Belief. Spline Mono Bold accent on a single word in the heading,
 * generous body underneath. The italic-serif accent on /letter
 * becomes a chunky bold-mono accent here.
 */
function Belief({
  titlePre,
  titleAccent,
  titleTail,
  children,
}: {
  titlePre: string;
  titleAccent: string;
  titleTail: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.018em] font-bold text-birdseye-cream text-balance">
        {titlePre}{" "}
        <span className="font-spline font-bold uppercase text-birdseye-electric">
          {titleAccent}
        </span>
        {titleTail}
      </h2>
      <div className="mt-4 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-4">
        {children}
      </div>
    </section>
  );
}

/**
 * Chapter break inside the appendix. Was a small eyebrow; promoted
 * (2026-05-25) to a real section headline so the document reads as
 * chaptered rather than as a long scroll. Tiny numbered eyebrow above,
 * Spline Mono Bold UC at h2 size, heavy top margin to give each chapter
 * room to breathe.
 */
function SectionBreak({ label, number }: { label: string; number: string }) {
  return (
    <div className="mt-28 md:mt-36 pt-12 border-t border-birdseye-cream/[0.10]">
      <div className="font-mono text-[11px] tracking-[0.22em] text-birdseye-electric uppercase mb-5">
        § {number}
      </div>
      <h2 className="font-spline font-bold uppercase text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-birdseye-cream text-balance">
        {label}
      </h2>
    </div>
  );
}

/**
 * Brief framing paragraph that follows a SectionBreak headline.
 * Inter regular, muted, narrow measure so the eye lands on the
 * section title first, then the framing, then the meat of the chapter.
 */
function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 text-[17px] md:text-[18px] leading-[1.65] text-birdseye-cream/65 max-w-[600px]">
      {children}
    </div>
  );
}

/**
 * Numbered chapter inside the appendix. Hairline rule above, mono
 * number, Spline Mono Bold title (was italic-serif), prose body.
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
    <section className="mt-14 md:mt-16 pt-10 md:pt-12 border-t border-birdseye-cream/[0.10]">
      <div className="grid md:grid-cols-[80px_1fr] gap-3 md:gap-8">
        <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase pt-1.5">
          {number}
        </div>
        <div>
          <h2 className="font-spline font-bold uppercase text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.12] tracking-[-0.018em] text-birdseye-cream mb-5 text-balance">
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

/**
 * Six "what great looks like" questions. Originally Spline Mono Bold UC
 * for every question — reads as a wall when six stack. Revised
 * (2026-05-25) to Inter Semibold sentence case so each question scans
 * as a single line of reading instead of a billboard.
 */
function QuestionList({ questions }: { questions: string[] }) {
  return (
    <ol className="mt-10 md:mt-12 divide-y divide-birdseye-cream/[0.08]">
      {questions.map((q, i) => (
        <li
          key={i}
          className="py-7 md:py-8 grid md:grid-cols-[60px_1fr] gap-3 md:gap-8"
        >
          <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase pt-2.5">
            {String(i + 1).padStart(2, "0")}
          </div>
          <p className="text-[clamp(1.125rem,1.7vw,1.375rem)] leading-[1.4] tracking-[-0.012em] font-semibold text-birdseye-cream text-balance">
            {q}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Each must-have requirement is rule + reason. The reason gets the
 * same visual weight as the rule, not a fineprint treatment.
 */
function Requirements({
  items,
}: {
  items: { rule: string; reason: string }[];
}) {
  return (
    <ul className="mt-10 md:mt-12 divide-y divide-birdseye-cream/[0.08]">
      {items.map((item, i) => (
        <li
          key={i}
          className="py-7 md:py-8 grid md:grid-cols-[60px_1fr] gap-3 md:gap-8"
        >
          <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase pt-2">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="space-y-3">
            <p className="text-[17px] md:text-[18px] leading-[1.4] font-semibold text-birdseye-cream text-balance">
              {item.rule}
            </p>
            <p className="text-[16px] md:text-[17px] leading-[1.65] text-birdseye-cream/65">
              {item.reason}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Strong preferences. Softer cousin of Requirements: mono caps label
 * on the left, prose body on the right.
 */
function Preferences({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ul className="mt-10 md:mt-12 space-y-8">
      {items.map((item, i) => (
        <li key={i} className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-10">
          <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-cream/55 uppercase pt-1.5">
            {item.title.replace(/\.$/, "")}
          </div>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-birdseye-cream/75">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * One row in the logistics block. Caps label on the left, prose on
 * the right.
 */
function LogisticsRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="font-mono text-[11px] tracking-[0.22em] text-birdseye-cream/55 uppercase pt-1.5">
        {label}
      </div>
      <div>{children}</div>
    </>
  );
}
