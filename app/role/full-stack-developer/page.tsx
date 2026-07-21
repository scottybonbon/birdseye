import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Full Stack Developer, Birdseye",
  description:
    "Birdseye is hiring an AI-native Full Stack Developer, React and Redux on the front end, Java and Spring Boot on the back, to own production capabilities end to end. A note from CTO Milan Luketic, and the full picture of the role.",
};

/**
 * /role/full-stack-developer, the platform-engineering recruiting page.
 *
 * Mirrors the /role/vp-engineering template one-for-one: same PageShell,
 * same Spline Sans Mono Bold accent, same § chaptered structure and helper
 * components. The only thing that changes is the voice.
 *
 * Voice is Milan's (CTO): exacting, craft-first, AI-native to the bone,
 * relentless about ownership and judgment. Distinct beliefs from Mike's,
 * no verbatim reuse. Still house style, so: em-dash free, no soft hedging,
 * no preamble.
 */
export default function FullStackDeveloperPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[680px]">
            {/* Heading block */}
            <header className="mb-14 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Open role · Toronto · July 2026
              </div>
              <h1 className="font-spline font-bold uppercase text-[clamp(2.25rem,5.8vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-birdseye-cream text-balance">
                Full Stack Developer.
              </h1>
              <p className="mt-8 font-spline font-normal uppercase text-[14px] md:text-[15px] leading-[1.65] tracking-[0.06em] text-birdseye-cream/55 max-w-[560px]">
                A note from Milan on the developer we&apos;re hiring to build
                the platform with us, and the standard we hold AI-native work
                to.
              </p>
            </header>

            {/* CTO letter */}
            <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p className="first-letter:font-spline first-letter:font-bold first-letter:text-[4em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-birdseye-electric">
                I&apos;m the CTO at Birdseye, and the platform is mine to
                answer for. Platform engineering, the computer vision running
                on every camera stream, edge ingest, the API surface, and the
                YMS, TMS, and WMS integrations that tie us into how freight
                actually moves. It is the operating system for the yard. About
                four hundred of us run it, across floors in Mississauga,
                Dallas, Belgrade, and Bogotá, roughly twelve million gate
                events a month.
              </p>
              <p>
                It&apos;s a real product with real users, and it has to keep
                earning its place every quarter. I&apos;m hiring a full-stack
                developer to build it with me. React and Redux where the
                operator works, Java and Spring Boot behind it, Node or Python
                for the tooling around both. Not one half of the stack with
                the other half thrown over a wall. The{" "}
                <span className="font-spline font-bold uppercase text-birdseye-cream">
                  whole
                </span>
                {" "}thing.
              </p>
              <p>
                I&apos;m writing this myself because the person I want is
                specific, and I&apos;d rather be plain than dress it up. This
                is an AI-native role, and I mean it literally. Not someone who
                tried Copilot once. Someone who has rebuilt how they work
                around agents and can show me the receipts. If Claude Code or
                Cursor is already part of how you think, not a toy you opened
                for an afternoon, keep reading.
              </p>
              <p>
                Here is what most people get backwards. Agents don&apos;t
                lower the bar on judgment. They raise it. When the agent
                writes the code, you&apos;re still the one accountable for it,
                and the fact that it compiled is not how you know it&apos;s
                right. I want someone who verifies, who owns the output, and
                who can tell me exactly how they knew a change was safe before
                it reached production.
              </p>
              <p>
                The craft I care about now includes things that weren&apos;t
                on a résumé three years ago. Breaking a large piece of work
                into bounded tasks for subagents. Running investigations in
                parallel without losing the thread. Managing a context window
                on purpose, and knowing when it has gone stale. Reconciling
                several agent outputs into one implementation that actually
                holds together. If you&apos;ve felt the difference between
                doing that well and doing it badly, we&apos;ll have plenty to
                talk about.
              </p>
              <p>
                And you&apos;d own the capability, not the commit. Written is
                not done. Done is integrated, released, verified in
                production, and still standing the next morning. That is the
                job I&apos;m hiring for.
              </p>
            </div>

            {/* Three beliefs */}
            <div className="mt-14 md:mt-16 space-y-10">
              <Belief
                titlePre="Own the whole"
                titleAccent="stack"
                titleTail=", not your half."
              >
                <p>
                  Full-stack here isn&apos;t a title, it&apos;s a promise. The
                  operator interface in React and Redux, the service behind it
                  in Spring Boot, the tests around both. Nobody on this team
                  gets to call the other layer someone else&apos;s problem.
                </p>
              </Belief>

              <Belief
                titlePre="AI is an"
                titleAccent="amplifier"
                titleTail=", not an alibi."
              >
                <p>
                  A careful engineer with agents does the work of several. A
                  careless one ships more mistakes, faster. You are
                  accountable for everything the agent produces. Tell me how
                  you check it, what you measure, and what you throw away. Not
                  the demo. The discipline.
                </p>
              </Belief>

              <Belief
                titlePre="Ship the"
                titleAccent="capability"
                titleTail=", not the commit."
              >
                <p>
                  I&apos;m not counting lines merged. I&apos;m counting what
                  works in production and keeps working. You stay with a
                  capability through integration, release, and the first bug
                  at 2 a.m. Ownership doesn&apos;t end at the{" "}
                  <span className="font-spline font-bold uppercase text-birdseye-cream">
                    pull request
                  </span>
                  .
                </p>
              </Belief>
            </div>

            {/* Closing of letter */}
            <div className="mt-14 md:mt-16 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p>
                We&apos;re a Mississauga company. Most of the platform team
                and most of engineering leadership is here, and I strongly
                prefer this developer to be in the Greater Toronto Area.
              </p>
              <p className="font-spline font-normal uppercase text-[15px] md:text-[16px] leading-[1.65] tracking-[0.05em] text-birdseye-cream/85 max-w-[560px]">
                If you&apos;ve taken real capabilities all the way to
                production, and you&apos;ve made agents a true part of how you
                build, we should talk.
              </p>
            </div>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="grid sm:grid-cols-[auto_1fr] items-end gap-4 sm:gap-10">
                <div>
                  <div className="font-spline font-bold uppercase text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.05] tracking-[-0.015em] text-birdseye-cream">
                    Milan Luketic
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/45">
                    Chief Technology Officer · Birdseye
                  </div>
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/35 sm:text-right">
                  Mississauga, Ontario · July 2026
                </div>
              </div>
            </footer>

            {/* ─── The role in detail ─────────────────────────── */}
            <SectionBreak number="01" label="The role in detail." />

            <Thesis number="01" title="Front-end implementation.">
              <p>
                Build clear, responsive React and Redux interfaces for complex
                operational workflows. The operator console is where the yard
                actually gets run. State stays sane as it grows, or the whole
                thing rots. That part is yours.
              </p>
            </Thesis>

            <Thesis number="02" title="Back-end implementation.">
              <p>
                Build the APIs, integrations, and business logic in Java and
                Spring Boot. Clean service boundaries, real data modeling,
                authentication and authorization that hold. Node or Python
                when a supporting service, a tool, or a test suite is the
                right reach.
              </p>
            </Thesis>

            <Thesis number="03" title="AI-native execution.">
              <p>
                Use agents across the whole lifecycle. Specs, exploration,
                implementation, review, tests, QA, debugging, docs, releases.
                IDE autocomplete is the floor, not the ceiling. Command line,
                repo-level instructions, browser and test automation, all of
                it.
              </p>
            </Thesis>

            <Thesis number="04" title="Automated quality.">
              <p>
                Write the tests that matter. Unit, integration, API, and
                front-end. Coverage that catches real regressions, not a
                number that looks good in a report.
              </p>
            </Thesis>

            <Thesis number="05" title="Production readiness.">
              <p>
                Think about failure handling, observability, security,
                performance, and maintainability before a release, not after
                the incident. Freight depends on us being right.
              </p>
            </Thesis>

            <Thesis number="06" title="End-to-end delivery.">
              <p>
                Stay responsible for the capability after the first code
                lands. Integration, release, production verification, and the
                defects that surface once real users touch it. Written is not
                done.
              </p>
            </Thesis>

            {/* ─── What "great" looks like ─────────────────────── */}
            <SectionBreak number="02" label="What great looks like." />

            <IntroBlock>
              <p>
                A great candidate answers these from experience, not theory,
                and can show you the work behind every one.
              </p>
            </IntroBlock>

            <QuestionList
              questions={[
                "How has AI changed the way you move from a requirement to production?",
                "How do you use subagents without fragmenting the implementation?",
                "How do you manage context across a large repository or a multi-day task?",
                "How do you verify AI-generated code before it reaches production?",
                "How do you structure a React and Redux application so it stays maintainable as it grows?",
                "How do you design and test a production Spring Boot service?",
                "What went wrong in one of your AI-assisted projects, and what did you change afterward?",
              ]}
            />

            {/* ─── The bar ───────────────────────────────────── */}
            <SectionBreak number="03" label="The bar." />

            <IntroBlock>
              <p>
                Each line is a hard requirement with the reason attached. The
                reason matters as much as the rule.
              </p>
            </IntroBlock>

            <Requirements
              items={[
                {
                  rule: "Seven-plus years building production software.",
                  reason:
                    "Enough shipping behind you to have real opinions and a few scars. This is not where you learn what production means.",
                },
                {
                  rule: "Mastery of an agentic development tool such as Claude Code or Cursor.",
                  reason:
                    "Mastery, not a trial. This is how the team builds every day, and we will go deep on it in the room.",
                },
                {
                  rule: "AI used across the whole lifecycle.",
                  reason:
                    "Specs, exploration, implementation, review, tests, QA, debugging, docs, releases. If AI only lives in your autocomplete, this is the wrong role.",
                },
                {
                  rule: "You orchestrate subagents and parallel AI work.",
                  reason:
                    "Bounded tasks, the right context per agent, dependencies managed, and several outputs reconciled into one implementation that holds together. Tell us how you keep it from fragmenting.",
                },
                {
                  rule: "You manage the context window on purpose.",
                  reason:
                    "You know when context has gone stale or overloaded, and you summarize long-running work without dropping the decisions that mattered.",
                },
                {
                  rule: "The judgment to verify and own AI output.",
                  reason:
                    "You remain accountable for everything the agent produces. Compilation is not verification, and QA is not your safety net.",
                },
                {
                  rule: "Strong production React and Redux.",
                  reason:
                    "The operator interface is complex and long-lived. Redux depth is not optional. You know how to keep state, components, and workflows maintainable as the app grows.",
                },
                {
                  rule: "Strong production Java and Spring Boot.",
                  reason:
                    "REST APIs, service and business-logic design, relational data, authentication, integration and automated testing, and the troubleshooting for when it breaks under real load.",
                },
                {
                  rule: "Productive in Node.js or Python.",
                  reason:
                    "For the supporting services, automation, developer tooling, tests, and integrations around the core. Java and Spring Boot stay the primary back end.",
                },
              ]}
            />

            {/* ─── Strong preferences ─────────────────────────── */}
            <SectionBreak number="04" label="Strong preferences." />

            <IntroBlock>
              <p>
                Not required. A real advantage. The kind of background that
                earns a longer conversation on day one.
              </p>
            </IntroBlock>

            <Preferences
              items={[
                {
                  title: "Redux Toolkit or Redux-Saga.",
                  body: "Deep front-end experience with complex operational interfaces, and a real point of view on side effects and async flows at scale.",
                },
                {
                  title: "Material UI, DevExpress, or similar.",
                  body: "Production time inside a real component framework, not hand-rolling every control.",
                },
                {
                  title: "B2B SaaS or recurring revenue.",
                  body: "You have built where the customer can leave and the renewal has to be earned.",
                },
                {
                  title: "Cloud-native, distributed, event-driven.",
                  body: "Services that scale, event-driven workflows, and the operational reality that comes with them.",
                },
                {
                  title: "Testing depth.",
                  body: "Automated browser, API, integration, and contract testing. You trust systems you can prove.",
                },
                {
                  title: "Observability and incident response.",
                  body: "You have carried a pager, shipped the fix, and written the follow-up.",
                },
                {
                  title: "Adjacent domains.",
                  body: "Logistics, security, IoT, video, computer vision, or workflow automation. The pattern recognition transfers.",
                },
                {
                  title: "You have built AI guardrails.",
                  body: "Reusable agent instructions, repo-level workflows, development guardrails, or evaluation methods that made a whole team better.",
                },
                {
                  title: "Big Tech plus startup exits.",
                  body: "Big Tech rigor and startup velocity, ideally with a successful exit in the mix. People who have lived both calibrations tend to outperform people who have lived one.",
                },
              ]}
            />

            {/* ─── Who this isn't for ─────────────────────────── */}
            <SectionBreak number="05" label="Who this isn’t for." />

            <IntroBlock>
              <p>
                Said plainly so nobody spends a month in a loop they were
                never going to win.
              </p>
            </IntroBlock>

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Not for a front-end developer who touches an API only when
                forced, or a back-end developer who treats the interface as
                someone else&apos;s problem. This role is the whole stack.
              </p>
              <p>
                Not for anyone who cannot explain, in detail, how they
                validate AI-generated code. If a clean compile is your bar for
                correctness, we are not a fit.
              </p>
              <p>
                Not for someone who cannot describe how they manage context on
                a large or long-running task, or who runs several agents with
                no boundaries, no integration discipline, and no personal
                accountability for the result.
              </p>
              <p>
                Not for a developer who leans on QA to catch what should have
                been handled during development.
              </p>
              <p>
                Not for someone whose primary career has been inside a bank, a
                government agency, an educational institution, or a large
                non-technical organization where tempo is set by an org chart
                rather than by customers.
              </p>
              <p>
                Not for a consulting, agency, or custom-delivery background
                where success was measured by finishing a project rather than
                owning a product that has to keep working.
              </p>
            </div>

            {/* ─── Logistics ──────────────────────────────────── */}
            <SectionBreak number="06" label="Logistics." />

            <div className="mt-10 md:mt-12 grid md:grid-cols-[200px_1fr] gap-y-8 gap-x-10 text-[16px] md:text-[17px] leading-[1.6] text-birdseye-cream/80">
              <LogisticsRow label="Location">
                <p>
                  Greater Toronto Area strongly preferred. Hybrid, with
                  regular time in our Mississauga office.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Reports to">
                <p>
                  Milan Luketic, Chief Technology Officer. Works closely with
                  the platform and product teams.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Compensation">
                <p>
                  [Competitive for a senior full-stack developer in the GTA.
                  Drop the range here.] Cash, meaningful equity, full
                  benefits. We talk real numbers on the first call, no games
                  at the offer stage.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Hiring process">
                <p>
                  [Adjust to taste.] Four conversations over two to three
                  weeks. A first call with Milan. A working session on a real
                  problem from our roadmap, where we look at how you actually
                  build, agents included. A team-fit set. A final conversation
                  with engineering leadership.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Start date">
                <p>Flexible. Sooner is better.</p>
              </LogisticsRow>
            </div>

            {/* ─── Apply ──────────────────────────────────────── */}
            <SectionBreak number="07" label="Apply." />

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Send your résumé and a short note on one capability you took
                from requirement to production with agents in the loop. Tell
                me what the agents did, what you did, and how you knew it was
                right before it shipped.
              </p>
              <p>Two routes. Both reach the same inbox.</p>
            </div>

            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@birdseyesecurity.ca?subject=Full%20Stack%20Developer%20application"
                className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Write to Milan directly
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
 * generous body underneath. Same accent device the VP page uses.
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
 * Chapter break. Tiny numbered eyebrow above, Spline Mono Bold UC at h2
 * size, heavy top margin so each chapter gets room to breathe.
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
 * Brief framing paragraph that follows a SectionBreak headline. Inter
 * regular, muted, narrow measure so the eye lands on the section title
 * first, then the framing, then the meat of the chapter.
 */
function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 text-[17px] md:text-[18px] leading-[1.65] text-birdseye-cream/65 max-w-[600px]">
      {children}
    </div>
  );
}

/**
 * Numbered chapter. Hairline rule above, mono number, Spline Mono Bold
 * title, prose body.
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
 * Seven "what great looks like" questions. Inter Semibold sentence case so
 * each question scans as a single line of reading instead of a billboard.
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
 * Each must-have requirement is rule + reason. The reason gets the same
 * visual weight as the rule, not a fineprint treatment.
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
 * Strong preferences. Softer cousin of Requirements: mono caps label on
 * the left, prose body on the right.
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
 * One row in the logistics block. Caps label on the left, prose on the
 * right.
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
