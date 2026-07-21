import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Social Media Engagement Specialist, Birdseye",
  description:
    "Birdseye is hiring a Mississauga-based Social Media Engagement Specialist to be the voice of the brand across our industry. A note from Mary, and the full picture of the role we're handing them.",
};

/**
 * /role/social-media-engagement-specialist, the marketing recruiting page.
 *
 * Mirrors the /role/vp-engineering template one-for-one: same PageShell,
 * same Spline Sans Mono Bold accent, same § chaptered structure and helper
 * components. The only thing that changes is the voice.
 *
 * Voice is Mary's: warm, familial, a little playful, direct when it counts.
 * The nurture-then-push register a good manager runs. Still house style,
 * so: em-dash free, no soft hedging, no preamble.
 */
export default function SocialMediaEngagementSpecialistPage() {
  return (
    <PageShell bareFooter>
      <article className="section-dark py-24 md:py-32">
        <Container className="max-w-site">
          <div className="mx-auto max-w-[680px]">
            {/* Heading block */}
            <header className="mb-14 md:mb-20">
              <div className="font-mono text-[11px] tracking-[0.2em] text-birdseye-electric uppercase mb-6">
                Open role · Mississauga · July 2026
              </div>
              <h1 className="font-spline font-bold uppercase text-[clamp(2.25rem,5.8vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-birdseye-cream text-balance">
                Social Media Engagement Specialist.
              </h1>
              <p className="mt-8 font-spline font-normal uppercase text-[14px] md:text-[15px] leading-[1.65] tracking-[0.06em] text-birdseye-cream/55 max-w-[560px]">
                A note from Mary on the person we&apos;re hiring to be the
                voice of Birdseye out in the world.
              </p>
            </header>

            {/* Manager letter */}
            <div className="text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p className="first-letter:font-spline first-letter:font-bold first-letter:text-[4em] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-birdseye-electric">
                Birdseye watches over some of the busiest yards in North
                America. About four hundred of us, across operations floors
                in Mississauga, Dallas, Belgrade, and Bogotá. We are very
                good at the work. We are also, if I am honest, almost
                invisible in the one place our whole industry spends its
                day, which is online.
              </p>
              <p>
                Drivers, yard managers, fleet operators, the associations,
                the trade shows. They are all out there talking, arguing,
                swapping stories, and Birdseye barely says a word. I want to
                change that, and I want to hand the whole thing to one
                person to make it{" "}
                <span className="font-spline font-bold uppercase text-birdseye-cream">
                  yours
                </span>
                .
              </p>
              <p>
                I am writing this myself because I do not want you to meet
                Birdseye through a job board template. I want you to meet it
                through me. If this works out, I am the person you will build
                it with, so you should get a feel for me before you send a
                single thing.
              </p>
              <p>
                The role is simple to say and large to do. Be the voice and
                the face of Birdseye out in the world. LinkedIn. The groups
                where drivers actually talk. The associations, the
                trade-show feeds, the comment sections nobody from a company
                like ours ever bothers to join. Not posting at this industry.
                Getting into it, and staying there.
              </p>
              <p>
                Here is what I can promise you, and I mean every word. You
                will have room. This is your patch to build. I will not
                hover, and I will not hand you a color-by-numbers calendar
                and call it a career. You set the direction. You make the
                calls. Some of them will not work, and that is allowed.
              </p>
              <p>
                You will also have me. All the support you want. I will teach
                you what I know, hand you my contacts, sit with you when a
                week goes sideways, and celebrate loudly when it goes right.
                And every so often I will do the harder half of my job, which
                is to nudge you off the branch, because that is the moment you
                find out you could fly the whole time. We are called
                Birdseye. I get to say things like that.
              </p>
            </div>

            {/* Three beliefs */}
            <div className="mt-14 md:mt-16 space-y-10">
              <Belief
                titlePre="Be"
                titleAccent="generous"
                titleTail=", not pushy."
              >
                <p>
                  The best engagement never reads like marketing. It reads
                  like a person who actually cares whether the load arrived
                  and the day got better. If your instinct in a thread is to
                  help first and pitch almost never, you and I are going to
                  get along.
                </p>
              </Belief>

              <Belief
                titlePre="Chase"
                titleAccent="relationships"
                titleTail=", not reach."
              >
                <p>
                  I would trade ten thousand hollow impressions for fifty
                  people in this industry who light up when Birdseye shows up
                  in their notifications. Reach is a vanity number.
                  Relationships are the job. One real conversation beats a
                  hundred likes.
                </p>
              </Belief>

              <Belief
                titlePre="Sound like a"
                titleAccent="person"
                titleTail=", not a logo."
              >
                <p>
                  No stiff corporate voice that makes everyone scroll. I want
                  warmth, a quick wit, a little mischief, and the judgment to
                  know the line between playful and unprofessional. You will
                  talk to a VP and a yard crew in the same afternoon, and both
                  should feel like they reached someone{" "}
                  <span className="font-spline font-bold uppercase text-birdseye-cream">
                    real
                  </span>
                  .
                </p>
              </Belief>
            </div>

            {/* Closing of letter */}
            <div className="mt-14 md:mt-16 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-6">
              <p>
                You would be based with us in Mississauga. Most of the
                marketing team is here, and so am I, which means the good
                part of the work, the whiteboard afternoons and the terrible
                jokes, happens in the room with you in it.
              </p>
              <p className="font-spline font-normal uppercase text-[15px] md:text-[16px] leading-[1.65] tracking-[0.05em] text-birdseye-cream/85 max-w-[560px]">
                If you light up when a stranger writes back, and you have been
                waiting for someone to hand you the keys and say go make this
                yours, we should talk.
              </p>
            </div>

            {/* Sign-off */}
            <footer className="mt-20 md:mt-24 pt-10 border-t border-birdseye-cream/[0.10]">
              <div className="grid sm:grid-cols-[auto_1fr] items-end gap-4 sm:gap-10">
                <div>
                  <div className="font-spline font-bold uppercase text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.05] tracking-[-0.015em] text-birdseye-cream">
                    Mary Koburi
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/45">
                    Director of Marketing · Birdseye
                  </div>
                </div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-birdseye-cream/35 sm:text-right">
                  Mississauga, Ontario · July 2026
                </div>
              </div>
            </footer>

            {/* ─── The role in detail ─────────────────────────── */}
            <SectionBreak number="01" label="The role in detail." />

            <Thesis number="01" title="Be the voice.">
              <p>
                You are Birdseye in public, across our channels and your own
                professional presence. Warm, sharp, positive, and
                unmistakably a real person. When someone in this industry
                pictures Birdseye, we want them picturing you.
              </p>
            </Thesis>

            <Thesis number="02" title="Engage every day, for real.">
              <p>
                Comment, reply, share, congratulate, commiserate. Seventy-five
                to a hundred genuine interactions a day across the accounts
                that matter. Not a queue of scheduled posts. Real presence,
                the kind people notice and remember.
              </p>
            </Thesis>

            <Thesis number="03" title="Build the relationships.">
              <p>
                Get to know our five to ten thousand customers and prospects
                as people. Learn the decision-makers and the regulars. Show
                up before, during, and long after anything that looks like a
                sale.
              </p>
            </Thesis>

            <Thesis number="04" title="Own the industry rooms.">
              <p>
                Follow and join the associations, trade groups, event
                hashtags, and webinars. Wherever drivers, yards, and fleets
                are talking, Birdseye is there and glad to be.
              </p>
            </Thesis>

            <Thesis number="05" title="Grow communities worth joining.">
              <p>
                Build and moderate driver and yard focused groups on LinkedIn
                and Facebook that people actually want to be part of. Organic,
                useful, and unmistakably ours.
              </p>
            </Thesis>

            <Thesis number="06" title="Carry the good news.">
              <p>
                Company milestones, customer wins, product updates, industry
                stories. Do not just post them. Start the conversations that
                make them travel.
              </p>
            </Thesis>

            <Thesis number="07" title="Bring back what you learn.">
              <p>
                Track what lands. Watch the numbers that matter, real
                interactions and real responses and real relationships, and
                feed what you see back so the whole team gets sharper.
              </p>
            </Thesis>

            {/* ─── What "great" looks like ─────────────────────── */}
            <SectionBreak number="02" label="What great looks like." />

            <IntroBlock>
              <p>
                A month in, a great hire is already answering these, in their
                own voice, with a point of view they will defend.
              </p>
            </IntroBlock>

            <QuestionList
              questions={[
                "Where should Birdseye show up that a security company never does, and why there?",
                "What turns a cold industry contact into someone genuinely glad to see us in their feed?",
                "How do you stay warm and human at a hundred interactions a day without going on autopilot?",
                "What makes a driver or yard community worth joining, and, harder, worth staying in?",
                "How do you tell the difference between reach that flatters us and engagement that grows us?",
                "When is a relationship ready to hand to sales, and when would handing it over ruin it?",
              ]}
            />

            {/* ─── The bar ───────────────────────────────────── */}
            <SectionBreak number="03" label="The bar." />

            <IntroBlock>
              <p>
                Each line is a real requirement with the reason attached. The
                reason matters as much as the rule.
              </p>
            </IntroBlock>

            <Requirements
              items={[
                {
                  rule: "Two-plus years in social media, community, or customer engagement.",
                  reason:
                    "Done daily, at volume, for something real. This role moves too fast to learn the basics on the job, and we would rather grow you than teach you to start.",
                },
                {
                  rule: "You know this world, or you are hungry to.",
                  reason:
                    "Familiarity with trucking, freight, or logistics is a real head start. Genuine curiosity is not optional. You cannot fake caring about an industry, and this one can always tell.",
                },
                {
                  rule: "An exceptional writer.",
                  reason:
                    "Almost everything here is writing. Short, warm, clear, on-brand, and clean, at speed, dozens of times a day, in a voice that sounds like a person.",
                },
                {
                  rule: "Fluent across the platforms.",
                  reason:
                    "LinkedIn, Facebook, Instagram, and wherever the industry drifts next. You know the unwritten rules of each room and do not paste the same thing into all of them.",
                },
                {
                  rule: "At ease with a VP and a yard crew in the same afternoon.",
                  reason:
                    "Range. Professional without going stiff, easy without going sloppy, and never a different, faker person for either one.",
                },
                {
                  rule: "Organized enough to hold a lot at once.",
                  reason:
                    "Hundreds of touches and dozens of relationships in the air at any moment, and you drop none of the people.",
                },
                {
                  rule: "A self-starter.",
                  reason:
                    "Nobody will hand you every move. You find the opening, take it, and tell us what you learned so we can do it again.",
                },
                {
                  rule: "Handy with the tools, or quick to be.",
                  reason:
                    "CRM and social management platforms for scheduling, listening, and tracking. Not required on day one. A real advantage by day thirty.",
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
                  title: "Roots in trucking, freight, or logistics.",
                  body: "You already speak the language and know some of the players by name.",
                },
                {
                  title: "A real network in the industry.",
                  body: "Relationships or a following you built honestly, and can bring with you.",
                },
                {
                  title: "A community you have grown.",
                  body: "You have built and moderated a group people were sorry to ever leave.",
                },
                {
                  title: "Content instincts.",
                  body: "You can spot a story and shape it, not just repost the ones handed to you.",
                },
                {
                  title: "Event and association experience.",
                  body: "Trade shows, webinars, associations. You know how the online side of them actually moves.",
                },
                {
                  title: "Light design or video hands.",
                  body: "Canva, quick clips, simple graphics to make a moment land. A bonus, never a bar.",
                },
              ]}
            />

            {/* ─── Who this isn't for ─────────────────────────── */}
            <SectionBreak number="05" label="Who this isn’t for." />

            <IntroBlock>
              <p>
                Said plainly so nobody spends weeks chasing a role that was
                never their fit.
              </p>
            </IntroBlock>

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Not for someone who wants to hide behind a scheduling tool and
                call a queue of posts engagement.
              </p>
              <p>
                Not for a broadcaster who loves the sound of their own posting
                and forgets to listen.
              </p>
              <p>
                Not for someone who needs a finished calendar handed to them
                and stalls without one. You will have direction and real
                support, not a script.
              </p>
              <p>
                Not for anyone who measures success in follower counts and
                viral hits instead of relationships.
              </p>
              <p>
                Not for the brilliant-for-a-week, gone-for-a-month type.
                Consistency is not a nice-to-have here. It is the whole job.
              </p>
            </div>

            {/* ─── Logistics ──────────────────────────────────── */}
            <SectionBreak number="06" label="Logistics." />

            <div className="mt-10 md:mt-12 grid md:grid-cols-[200px_1fr] gap-y-8 gap-x-10 text-[16px] md:text-[17px] leading-[1.6] text-birdseye-cream/80">
              <LogisticsRow label="Location">
                <p>
                  Mississauga HQ. Most of the marketing team is here, and so
                  is Mary. This role lives better in the room.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Reports to">
                <p>
                  Mary Koburi, Director of Marketing. Works closely with
                  Sales, Customer Success, and the executive team.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Compensation">
                <p>
                  [Competitive base plus full benefits. Drop the range here.]
                  We will talk real numbers on the first call. No games at the
                  offer stage.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Hiring process">
                <p>
                  [Adjust to taste.] A first call with Mary, a real
                  conversation and not a screening script. A short working
                  session on a few live threads, so you can show how you would
                  do the job. A meet-the-team round. A final chat. About two to
                  three weeks, and a human reads every application.
                </p>
              </LogisticsRow>

              <LogisticsRow label="Start date">
                <p>Flexible, and sooner is lovely.</p>
              </LogisticsRow>
            </div>

            {/* ─── Apply ──────────────────────────────────────── */}
            <SectionBreak number="07" label="Apply." />

            <div className="mt-10 md:mt-12 text-[17px] md:text-[18px] leading-[1.7] text-birdseye-cream/80 space-y-5">
              <p>
                Send your résumé, and instead of a cover letter, show me one
                comment, post, or conversation you are proud of. Not the one
                with the most likes. The one where you helped someone, or
                changed how they felt about something.
              </p>
              <p>Two routes. Both reach the same inbox.</p>
            </div>

            <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@birdseyesecurity.ca?subject=Social%20Media%20Engagement%20Specialist%20application"
                className="inline-flex items-center gap-2 rounded-full bg-birdseye-electric text-birdseye-cream px-6 h-12 font-medium text-[14px] hover:bg-birdseye-electric/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-[transform,colors,box-shadow] duration-150"
              >
                Write to Mary directly
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
 * Six "what great looks like" questions. Inter Semibold sentence case so
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
