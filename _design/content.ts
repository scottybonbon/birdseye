/**
 * Birdseye site content, extracted from Figma file `birdseye design`
 * fileKey: o8Ok7QBXGzeslj2cm5gP9f, frame: Home (1:5904)
 *
 * Single source of truth for copy. Components import from here so we
 * never drift from the design.
 */

export const company = {
  name: "BIRDSEYE",
  address: "6358 Viscount Road, Mississauga, Ontario",
  phone: "844-626-7233",
  email: "info@birdseyesecurity.ca",
  copyright: "© 2025 BIRDSEYE",
};

// Nav structure per Workback v2, five mega-menus + persistent demo CTA.
// Each item carries a short description and an icon identifier for the
// mega-menu rendering. Icons are mapped to inline SVG components in
// components/site/icons/NavIcons.tsx, keep the keys in sync.
export type NavIcon =
  | "yardos"
  | "gatecore"
  | "safecore"
  | "yardcore"
  | "integrations"
  | "logistics"
  | "warehousing"
  | "manufacturing"
  | "supplyChain"
  | "automotive"
  | "cases"
  | "numbers"
  | "calculator"
  | "blog"
  | "guides"
  | "videos"
  | "checklists"
  | "news"
  | "events"
  | "about"
  | "monogram"
  | "letter"
  | "careers"
  | "contact";

export type NavLeaf = {
  label: string;
  description?: string;
  href: string;
  icon?: NavIcon;
};

// A featured callout is the right-rail "promo" panel in the mega menu 
// distinct from a regular item. Optional CTA label; defaults to the title
// arrow. `tone` controls the panel treatment.
export type NavFeatured = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
  tone?: "electric" | "cream" | "default";
};

export type NavGroup = {
  label: string;
  items: NavLeaf[];
  featured?: NavFeatured;
  // Layout hint: "wide" gets the right-rail featured panel, "compact" is a
  // tight single-column dropdown (used for Company).
  layout?: "wide" | "compact";
};

export const nav: { cta: NavLeaf; groups: NavGroup[] } = {
  cta: { label: "Book a demo", href: "/book-a-demo" },
  groups: [
    {
      label: "Platform",
      layout: "wide",
      // Order matters, the mega menu uses column-flow, so the first
      // ceil(N/2) items fill the LEFT column top-to-bottom, and the rest
      // fill the RIGHT column. Three cores on the left (GateCore, SafeCore,
      // YardCore) anchor what's most important; YARD OS + Integrations on
      // the right read as the platform layer that ties them together.
      items: [
        {
          label: "GateCore",
          description: "Automate ID, seals, and every gate event.",
          href: "/platform/gatecore",
          icon: "gatecore",
        },
        {
          // Voice edit (2026-05-03): description was swapped with YardCore.
          // SafeCore is perimeter security; YardCore is yard operations.
          // Mirrored to the Three Cores cards on the home page.
          label: "SafeCore",
          description: "Perimeter security that intervenes — detect, voice down, escalate.",
          href: "/platform/safecore",
          icon: "safecore",
        },
        {
          label: "YardCore",
          description: "Live spot occupancy, trailer dwell tracking, compliance enforcement.",
          href: "/platform/yardcore",
          icon: "yardcore",
        },
        {
          label: "YARD OS",
          description: "The unified operating system for the yard.",
          href: "/platform",
          icon: "yardos",
        },
        {
          label: "Integrations",
          description: "YMS, TMS, WMS, VMS — Birdseye plugs in.",
          href: "/platform/integrations",
          icon: "integrations",
        },
      ],
      featured: {
        eyebrow: "WATCH IT WORK",
        title: "See YARD OS in two minutes.",
        description:
          "A guided tour of the cores, the cameras, and the human in the loop.",
        href: "/book-a-demo",
        cta: "Book a demo",
        tone: "electric",
      },
    },
    {
      label: "Who We Serve",
      layout: "wide",
      items: [
        {
          label: "3PL & Logistics",
          description: "Keep freight moving. Eliminate yard guesswork.",
          href: "/industries/logistics",
          icon: "logistics",
        },
        {
          label: "Warehousing",
          description: "Protect inventory and people, 24/7.",
          href: "/industries/warehousing",
          icon: "warehousing",
        },
        {
          label: "Manufacturing",
          description: "Safer plants. Tighter access. Cleaner audits.",
          href: "/industries/manufacturing",
          icon: "manufacturing",
        },
        {
          label: "Supply Chain",
          description: "Vendor-to-dock visibility, end to end.",
          href: "/industries/supply-chain",
          icon: "supplyChain",
        },
        {
          label: "Automotive",
          description: "Hauler handoffs and vehicle transfers, validated.",
          href: "/industries/automotive",
          icon: "automotive",
        },
      ],
      featured: {
        eyebrow: "PROOF",
        title: "How C.R. England runs 50 acres with one operator.",
        description:
          "Switching from guards to Birdseye: 25% lower cost, every event on record.",
        href: "/case-studies",
        cta: "Read the case study",
        tone: "cream",
      },
    },
    {
      label: "Results",
      layout: "wide",
      items: [
        {
          // Voice edit (2026-05-03): the "real outcomes from real yards"
          // double-real tell I caught on the case-studies page itself.
          label: "Case Studies",
          description: "Named outcomes from named yards.",
          href: "/case-studies",
          icon: "cases",
        },
        {
          label: "By The Numbers",
          description: "Every Birdseye stat, in one place.",
          href: "/results",
          icon: "numbers",
        },
        {
          label: "ROI Calculator",
          description: "See what Birdseye returns on your operation.",
          href: "/roi-calculator",
          icon: "calculator",
        },
      ],
      featured: {
        eyebrow: "RUN THE NUMBERS",
        title: "What does Birdseye return on your yard?",
        description:
          "Two minutes. Your inputs. A side-by-side against your current spend.",
        href: "/roi-calculator",
        cta: "Open the calculator",
        tone: "electric",
      },
    },
    {
      label: "Resources",
      layout: "wide",
      items: [
        { label: "Blog", description: "Field notes from the yard.", href: "/blog", icon: "blog" },
        { label: "Guides", description: "Deep dives and operator playbooks.", href: "/guide", icon: "guides" },
        { label: "Videos", description: "See it in motion.", href: "/video", icon: "videos" },
        { label: "Checklists", description: "Free downloads for your team.", href: "/checklist", icon: "checklists" },
        { label: "News", description: "What we're shipping and why.", href: "/news", icon: "news" },
        { label: "Events", description: "Where to meet the team.", href: "/event", icon: "events" },
      ],
      featured: {
        eyebrow: "FROM THE BLOG",
        title: "The end of the security guard era.",
        description:
          "Why automated gates and remote monitoring are replacing the night shift.",
        href: "/blog",
        cta: "Read the post",
        tone: "default",
      },
    },
    {
      label: "Company",
      layout: "wide",
      items: [
        { label: "About Us", description: "The team behind YARD OS.", href: "/about-us", icon: "monogram" },
        { label: "A note from Mike", description: "A letter from our founder.", href: "/letter", icon: "letter" },
        { label: "Careers", description: "Help us build the operating system for North American yards.", href: "/career", icon: "careers" },
        { label: "Contact", description: "Talk to a human.", href: "/contact", icon: "contact" },
      ],
      featured: {
        eyebrow: "FROM THE FOUNDER",
        title: "A note from Mike.",
        description:
          "Why we're building Birdseye, and what we believe yards should be.",
        href: "/letter",
        cta: "Read the letter",
        tone: "default",
      },
    },
    // NB: All resource hrefs match the WordPress URL structure so external
    // links and old emails keep working when content is mirrored from WP.
  ],
};

// Hero, Editorial manifesto with serif italic punch.
// Three-line structure: sans / serif-italic / sans-ghost.
// "Safer business" lands in italic blue serif as the identity moment.
export const hero = {
  eyebrow: "THE YARD OPERATING SYSTEM",
  // Each line has a typography style: "sans" | "serif-italic" | "ghost".
  // The 3-line poem is the long-running hero treatment, restored from
  // the brief "Smarter yards are safer yards." single-line variant on
  // Scotty's call (2026-05-02). The "are safer yards" line lives on
  // home-simple and other surfaces but the home hero anchors on this
  // three-beat composition (statement / promise / antithesis).
  lines: [
    { text: "Smarter yards.", style: "sans" as const },
    { text: "Safer business.", style: "serif-italic" as const },
    { text: "Zero guesswork.", style: "ghost" as const },
  ],
  // Legacy single-string title for any component still referencing it.
  // Kept identical to the lines so search / SEO match the visual.
  title: "Smarter yards. Safer business. Zero guesswork.",
  // Subtitle tightening (COMP-1, 2026-05-03): Document → Seal raises the
  // register from "we write things down" to "we lock evidence in." Forensic,
  // operator-grade, evidence-chain language. Maintains the existing three-
  // beat + sting rhythm; the H1 audit confirmed it was already a clean
  // adjective+noun three-beat (Smarter yards / Safer business / Zero
  // guesswork) so no change there.
  subtitle:
    "Verify every entry. Monitor every zone. Seal every record. Automatically.",
  primaryCta: { label: "Book a demo", href: "/book-a-demo" },
  secondaryCta: { label: "Watch how it works", href: "#how" },
};

export const connectedFlow = {
  // Mirrors the live birdseyesecurity.com/home-simple feature carousel
  // ("Outdated Security Models Are Slowing You Down"). Names, copy, and
  // ordering pulled directly from the production site so the two stay
  // in sync. IGMS deprecated in favor of GateCore.
  title: "Outdated security is slowing you down.",
  // Voice edit (2026-05-03): subtitle tightened — three-beat after the
  // hook, no "and" stacking.
  subtitle:
    "Birdseye replaces radio-and-clipboard. Verified events, faster throughput, audit-grade records on every gate.",
  features: [
    {
      name: "24/7 Monitoring",
      // Voice edit: cut adjective stack ("continuous human-verified
      // oversight"). Specific operator + temporal claim.
      description:
        "Trained operators on every camera, every shift. No gaps, no shifts to start.",
    },
    {
      name: "GateCore",
      // Voice edit: list the work, drop the qualifier verbs.
      description:
        "Automate ID, BOL capture, seal verification — every gate event, every truck.",
    },
    {
      name: "ID-Verify™",
      // Voice edit: "Driver and carrier" reads as the actual check.
      description:
        "Driver and carrier verified against the live roster. Stops fraudulent pickups before the gate opens.",
    },
    {
      name: "Bills of Lading",
      // Voice edit: cut the verb-stack ("capture, scan, and log"). Name
      // the chain: gate → TMS → record.
      description:
        "BOLs captured at the gate, matched against your TMS, sealed with the event.",
    },
    {
      name: "Trailer Seal Verification",
      // Voice edit: lead with the noun (camera-confirmed) + list the
      // properties.
      description:
        "Camera-confirmed seal numbers, condition, and presence on every move.",
    },
    {
      name: "Faster Gate Processing",
      // Voice edit: cut the hedge ("without sacrificing"). Land the
      // operator outcome.
      description:
        "Average 75% reduction in gate dwell. More turns per shift, same security posture.",
    },
    {
      name: "Voice-Down™ Deterrence",
      // Voice edit: name the SLA + the outcome.
      description:
        "A trained agent on the speaker within seconds of the trigger. Most events resolve at first contact.",
    },
    {
      name: "Compliance-Ready Reporting",
      // Voice edit: list what gets sealed, name what it becomes.
      description:
        "Timestamped video, voice, gate state, outcome — sealed as the audit-grade record.",
    },
  ],
};

export const threeCores = {
  // Italic accent moved from "Three" (a number, weak) to "intelligent"
  // (the brand differentiator).
  title: "One platform.\nThree intelligent cores.",
  // Voice edit (2026-05-03): "exceptional together" was the marketing-
  // adjective tell. Replaced with the cleaner "compounding" — describes
  // what actually happens when the cores share a record (each one's
  // events make the others sharper) instead of selling-language abstract.
  subtitle:
    "GateCore, SafeCore, YardCore. Independently capable. Compounding together.",
  // Voice edit (2026-05-03): each core's two-sentence card tightened.
  // First sentence: name the work; second sentence: name the outcome
  // operators feel. No banned-words ("AI-powered"), no adjective
  // stacks ("Smarter, safer"), no soft hedges ("instantly").
  cores: [
    {
      name: "GateCore",
      description:
        "Automate ID, BOL capture, seal verification — every gate event, every truck. Your gate becomes your competitive advantage.",
    },
    {
      name: "SafeCore",
      description:
        "Perimeter security that intervenes. Detect, voice down, escalate — before an event becomes an incident.",
    },
    {
      name: "YardCore",
      description:
        "Live spot occupancy, trailer dwell tracking, compliance enforcement. Every move on the yard, sealed.",
    },
  ],
};

// The Birdseye moat, AI + human + audit-trail. This is the section that
// differentiates from camera providers and security services.
export const maxTelepresence = {
  eyebrow: "THE METHOD",
  title: "Maximum Telepresence Approach™",
  subtitle:
    "AI catches it. A live agent decides. The system writes it down. Every time.",
  // Three panes of a single event playing out left-to-right. Each pane
  // carries: a real-footage video loop, a forensic timestamp, a status
  // line, and a short editorial caption underneath. Reads as ONE system,
  // not three features. Source video files live in /public.
  steps: [
    {
      n: "01",
      label: "DETECT",
      title: "AI sees the event.",
      body:
        "Computer vision watches every camera, every second. Anomalies surface the moment they happen, no shifts, no gaps, no blind spots.",
      slug: "detect",
      video: "/hero.mp4",
      poster: "/figma-exports/screenshot245640251125at2.31.40-pm1.png",
      timestamp: "03:14:22",
      status: "CV DETECTION",
    },
    {
      n: "02",
      label: "VERIFY",
      title: "An agent verifies it.",
      // Voice edit (2026-05-03): "voices-down" was verb-from-noun
      // friction; "Voice-Down™ through the speaker" reads as the
      // branded action and matches the rest of the site's vocabulary.
      body:
        "A trained Birdseye operator picks up the feed in real time and Voice-Down™'s through the speaker. Most events resolve at first contact.",
      slug: "verify",
      video: "/homepage-header-ambient.mp4",
      poster: "/figma-exports/frame14105612103177.png",
      timestamp: "03:14:31",
      status: "AGENT VERIFIED",
    },
    {
      n: "03",
      label: "DOCUMENT",
      title: "The system seals the record.",
      body:
        "Timestamp, video, voice, outcome, stitched into one verified record. Pull on demand for the audit, the lawsuit, the customer call.",
      slug: "document",
      video: "/hero-reverse.mp4",
      poster: "/figma-exports/screenshot25640251125at3.33.02-pm1.png",
      timestamp: "03:14:46",
      status: "SEALED & FILED",
    },
  ],
};

export const builtForReal = {
  eyebrow: "WHY BIRDSEYE",
  title: "Built for real operations.",
  // Voice edit (2026-05-03): subtitle's "so nothing gets missed" was
  // hedge language. Two declarative sentences land harder.
  subtitle:
    "Birdseye automates the yard with AI. Trained operators on every triggered event. Nothing slips.",
  cards: [
    {
      title: "Proven accuracy, day and night.",
      // Voice edit: "across your facility" → "at the gate" (specific
      // surface, operator-grade noun).
      body:
        "AI and trained operators verify every event in real time. You always know what's happening at the gate.",
      // Visual snippet shown in card: gate event log with rows
      snippetTitle: "Truck permitted",
    },
    {
      title: "Full oversight, all hours.",
      // Voice edit: "lets your team get ahead of issues before they hit
      // the day" was wordy. Active subject + verb wins.
      body:
        "Live supervision catches issues before they hit your day.",
      snippetTitle: "No risk detected",
    },
    {
      title: "Gates that keep trucks moving.",
      // Voice edit: cut hedge ("without trading off security"). Lead
      // with the operator outcome.
      body:
        "Automated verification and capture cut arrival dwell up to 75%.",
      snippetTitle: "Safety infraction detected",
    },
    {
      title: "Plugs into the systems you already run.",
      // Voice edit: "out of your way" was colloquial. Trade for the
      // operator-recognized "every shift."
      body:
        "Connects to your YMS, TMS, and WMS. Data stays aligned. Audit-ready, every shift.",
      snippetTitle: "Connect with YMS",
    },
  ],
};

export const impact = {
  // Voice edit (2026-05-03): named the moment of change, not the abstract.
  // "What Birdseye changes" was fine; "What changes the day you switch"
  // names the inflection point operators actually care about.
  title: "What changes the day you switch.",
  subtitle:
    "Birdseye replaces inconsistent, manual yard operations with a system that runs predictably, securely, and out of your team's way.",
  beforeLabel: "Before Birdseye",
  afterLabel: "After Birdseye",
  beforeIntro: "Slow yards. Fragmented systems. Blind spots. Layers of manual oversight.",
  afterIntro: "One unified system that runs predictably, securely, and with full visibility.",
  rows: [
    { before: "Slow gate processing", after: "Gate processing up to 75% faster" },
    { before: "Rising labor and security costs", after: "Lower security and staffing costs" },
    { before: "Missed events and blind spots", after: "Verified events with real-time detection" },
    { before: "Unreliable reporting", after: "Timestamps and audit-ready documentation" },
    { before: "Compliance gaps", after: "Clear, facility-wide visibility" },
    { before: "Fragmented systems", after: "One system for safety, security, and operations" },
  ],
  // Route to the platform overview page; was a broken `#platform` anchor.
  cta: { label: "See the platform", href: "/platform" },
};

export const testimonials = {
  // Voice edit (2026-05-03): "Trusted by the most demanding" is the
  // generic SaaS adjective stack. Replaced with the operator-voice
  // line — names the moment of conversion, not a vague trust claim.
  title: "From the operators who said yes.",
  // Customer attribution is a credibility move: the live
  // birdseyesecurity.com attributes every testimonial by name + company
  // (Bison Transport, C.R. England, Brimich, Remco). The early rebuild
  // anonymized them to generic role titles, which made the new site read
  // as less proven than the live site. This block restores the named
  // attribution, the metric in the quote, and adds a `metric` field so
  // the Testimonials component can render a numeric callout.
  //
  // Provenance for each card is in the corresponding `provenance` field 
  // tracks where the quote originated on the live site so any future
  // rewrite can verify before changing.
  //
  // TODO(scotty-confirm): Confirm exact name attribution for cards 4 & 6
  // before launch. Card 4's "50-acre yard" detail matches the
  // Stephen Merrion / C.R. England case panel already used on
  // /book-a-demo. Card 6's distribution-centers framing matches Brimich.
  cards: [
    {
      quote:
        "I was the biggest skeptic there was, and I'm convinced that they are doing a much better job than manned security.",
      name: "Norm Sneyd",
      role: "Vice President",
      company: "Bison Transport",
      customerIndex: "01",
      year: "2025",
      metric: "Skeptic · convinced",
      provenance: "live attribution: book-a-demo CustomerStoryPanel",
    },
    {
      quote:
        "Birdseye gives us more than security. Our 50-acre yard operates more efficiently, and our damage claims have gone down.",
      name: "Stephen Merrion",
      role: "Regional Facilities Manager",
      company: "C.R. England",
      customerIndex: "02",
      year: "2025",
      metric: "50-acre yard · claims down",
      provenance:
        "live attribution: book-a-demo CustomerStoryPanel + ReviewBlock",
    },
    {
      quote:
        "Remote monitoring delivered fewer incidents, fewer claims, and tighter control of our distribution centers.",
      name: "Amanda Humphrey",
      role: "Operations Lead",
      company: "Brimich Logistics",
      customerIndex: "03",
      year: "2025",
      metric: "Fewer incidents · fewer claims",
      provenance: "live: birdseyesecurity.com about-us testimonials",
    },
    {
      quote:
        "By shifting to a remote-first model, we reduced annual security costs by 25% while improving compliance and yard visibility.",
      name: "Bison Transport",
      role: "Warehouse Operations",
      company: "Bison Transport",
      customerIndex: "04",
      year: "2025",
      metric: "−25% security spend",
      provenance: "live: birdseyesecurity.com/about-us testimonials",
    },
    {
      quote:
        "With Birdseye, our gate operations are faster and more secure, significantly reducing delays and unauthorized access.",
      name: "C.R. England",
      role: "Gate Operations",
      company: "C.R. England",
      customerIndex: "05",
      year: "2025",
      metric: "Faster gate · fewer breaches",
      provenance: "live: birdseyesecurity.com/about-us testimonials",
    },
    {
      quote:
        "Birdseye reduced our operational costs by 15% and improved facility safety dramatically.",
      name: "Remco Forwarding",
      role: "Distribution Operations",
      company: "Remco Forwarding",
      customerIndex: "06",
      year: "2025",
      metric: "−15% operating cost",
      provenance: "live: birdseyesecurity.com/case-studies (Remco DC)",
    },
  ],
  // Route to the contact page; was a broken `#contact` anchor.
  cta: { label: "Let's talk", href: "/contact" },
};

// Voice edit (2026-05-03): tightened each stat label for parallel
// shape (subject + qualifier) and active verb where possible. Adjective-
// stack labels ("monitored and protected") swapped for cleaner nouns.
export const stats = {
  eyebrow: "BY THE NUMBERS",
  title: "Proven at scale.",
  items: [
    { value: "12M", label: "Gate transactions per month" },
    { value: "$100B+", label: "Assets under continuous monitoring" },
    { value: "94K+", label: "Safety violations caught and resolved" },
    { value: "9K+", label: "Critical interventions per month" },
    { value: "75%", label: "Average gate-processing improvement" },
    { value: "99.99%", label: "Verification accuracy at the gate" },
  ],
};

export const supplyChain = {
  eyebrow: "INDUSTRY EXPERTISE",
  // Voice edit (2026-05-03): "Trusted across" is generic + passive.
  // "Wired into" is active + specific — Birdseye plugs into the systems
  // that already run the supply chain (TMS, YMS, WMS, VMS).
  title: "Wired into the supply chain.",
  subtitle:
    "Transportation, warehousing, manufacturing, distribution. Each yard runs its own way; Birdseye configures around what you already do.",
  industries: [
    {
      title: "Transportation & Logistics",
      body:
        "Birdseye automates gate control, verifies drivers and trailers, and prevents cargo theft. Keeping freight moving safely and on time.",
    },
    {
      title: "Warehousing & Distribution",
      body:
        "24/7 monitoring that enforces safety protocols, reduces shrinkage, and keeps dock operations moving.",
    },
    {
      title: "Supply Chain Management",
      body:
        "Real-time visibility from vendor to dock. Every gate, access point, and yard on one record.",
    },
    {
      title: "Manufacturing",
      body:
        "Enforce safety standards, monitor restricted zones, and verify secure access on every shift.",
    },
    {
      title: "Automotive & Distribution",
      body:
        "Hauler handoffs, vehicle transfers, gate events, captured and validated in real time across the whole yard.",
    },
  ],
};

export const explore = {
  title: "Explore Birdseye",
  cards: [
    {
      title: "Careers",
      body:
        "Help build the operating system for North American yards. Engineering, ops, security, growth.",
      // Canonical careers route is /career (singular), matches the
      // nav, the WP-mirrored URL structure, and the [slug] dynamic route.
      cta: { label: "View open roles", href: "/career" },
    },
    {
      title: "About Birdseye",
      body:
        "The team behind YARD OS. Where we came from, what we're building, who we hire.",
      // Canonical about route is /about-us, matches the nav.
      cta: { label: "Read more", href: "/about-us" },
    },
    {
      title: "Get in touch",
      body:
        "Sales, support, partnerships, press, pick the door, we'll answer.",
      cta: { label: "Talk to us", href: "/contact" },
    },
  ],
};

// Closing manifesto, bookends the hero. Three lines, mixed typography,
// pure typography moment. The 95% stat moved to VersusGuards (avoid
// duplication); Stephen Merrion quote moved to PullQuote.
/**
 * StakeholderLanes, the same Birdseye platform, told three ways for the
 * three buyers it actually has to convince.
 *
 * Move borrowed from Flock Safety's Law Enforcement / Communities /
 * Businesses tabs and LVT's industry vertical tabs, the v2 competitor
 * audit identified this multi-stakeholder framing as the single biggest
 * "they have, we don't" gap on the home page. Generic "platform" copy
 * doesn't survive an enterprise procurement cycle that includes ops,
 * security, AND compliance, each of those people needs to see their
 * own day in the product before they advocate internally.
 *
 * Each lane is one-tab-worth: headline + body + 3 specific value bullets
 * + a single quantified outcome chip. No persona photographs, no soft
 * marketing imagery, the discipline is "operator briefing card," not
 * "lifestyle ad."
 */
export const stakeholderLanes = {
  eyebrow: "FOR YOUR ROLE",
  title: "One platform.\nThree views of the same yard.",
  subtitle:
    "Birdseye proves itself differently to the operations lead, the security director, and the compliance officer. Same system. Different evidence.",
  lanes: [
    {
      key: "yard",
      role: "Yard Manager",
      kicker: "OPS · THROUGHPUT · UPTIME",
      headline: "The yard runs",
      headlineItalic: "without",
      headlineTail: "you running it.",
      body:
        "Birdseye replaces radio-and-clipboard with a system that gates the gate itself. You see what's happening across every yard, every shift, and your team gets out of reactive mode and into the work that actually moves the operation.",
      bullets: [
        "Gate dwell down up to 75% with automated ID and seal verification.",
        "Live yard map across every facility, no more phone-tag with the dock.",
        "Driver issues handled at the gate, not at the dock door.",
        "Compliance and exception logs filed automatically, every shift.",
      ],
      metric: "Up to 75% faster gate processing",
    },
    {
      key: "security",
      role: "Security Director",
      kicker: "PERIMETER · INTERVENTION · ESCALATION",
      headline: "Real-time intervention.",
      headlineItalic: "Every",
      headlineTail: "incident sealed.",
      body:
        "AI catches the event. A trained Birdseye agent verifies it and Voice-Down™'s through the speaker. The system files the record. You stop chasing footage at 2 AM and start making policy decisions during business hours.",
      bullets: [
        "24/7 verified perimeter, no shifts, no gaps, no blind spots.",
        "Voice-Down™ resolves the majority of incidents on first contact.",
        "Sub-2 second alert-to-agent handoff on every triggered event.",
        "Audit-grade evidence sealed automatically, chain of custody intact.",
      ],
      metric: "60%+ reduction in security spend",
    },
    {
      key: "compliance",
      role: "Compliance Officer",
      kicker: "RECORD · AUDIT · CLAIMS DEFENSE",
      headline: "Every gate event becomes a",
      headlineItalic: "verifiable",
      headlineTail: "record.",
      body:
        "Timestamp, video, voice, and outcome, stitched into one tamper-evident record at the moment it happens. Pull on demand for the audit, the lawsuit, the insurance claim, or the customer dispute. The system holds the receipts so you don't have to.",
      bullets: [
        "Sealed forensic record per gate event, searchable by yard, time, plate, or seal.",
        "Built for SOC 2, ISO 27001, and FSMA documentation requirements.",
        "Chain of custody preserved end-to-end on every captured asset.",
        "Reduces claims defense from days of footage hunting to minutes.",
      ],
      metric: "Audit-ready in minutes, not days",
    },
  ],
};

export const certainty = {
  eyebrow: "THE BIRDSEYE PROMISE",
  // Lines mirror the hero rhythm: sans / serif-italic / sans
  lines: [
    { text: "Verified events.", style: "sans" as const },
    { text: "Audit-ready records.", style: "serif-italic" as const },
    { text: "Yards that just run.", style: "sans" as const },
  ],
  // Voice edit (2026-05-03): "Because" was the apologetic opener. Cut.
  // The two-sentence form lets each clause hold its own weight.
  closer: "Your yard should run with certainty. Not guesswork.",
};

// Implementation, addresses the "how long does this take" buyer concern.
// Standard top-of-class B2B SaaS pattern (Stripe, Ramp, Brex all surface
// onboarding speed). For Birdseye, fast deployment is also a competitive
// advantage vs. enterprise-IT solutions that take months.
export const implementation = {
  eyebrow: "DEPLOYMENT · TIMELINE",
  title: {
    pre: "Live in",
    italic: "14 days",
    post: ", not 14 months.",
  },
  subtitle:
    "Two weeks from contract to operational. No procurement cycle. No rip-and-replace. We work with the cameras and systems you already have.",
  metric: {
    value: "14",
    unit: "days",
    caption: "Average time from contract to operational.",
  },
  // Each step carries an `image` shown in the desktop-only hover preview
  // rail (see components/site/Implementation.tsx). Image swaps as the
  // pointer moves between steps. Pulled from existing /figma-exports
  // assets, swap any time without touching the component.
  // Voice edit (2026-05-03): each step body trimmed for active voice +
  // operator-grade specificity. Days, titles, and image paths unchanged.
  steps: [
    {
      day: "DAY 01",
      title: "Discovery walk.",
      body:
        "Walk the yard with your ops lead. Audit the cameras you have, the gate hardware in place, the protocols already running.",
      image: "/figma-exports/about56usimage3.png", // teamWithTruck
    },
    {
      day: "DAY 03",
      title: "Site survey.",
      body:
        "Coverage map drawn. Blind spots flagged, supplemental camera positions specified, integration points named.",
      // 2026-05-04: swapped to the labeled "site survey.png" Scotty
      // dropped in the project root (NVIDIA + aerial yard with detected
      // vehicle bboxes) — the intended on-brand asset for this step.
      image: "/figma-exports/implementation_site_survey.png",
    },
    {
      day: "DAY 07",
      title: "Install & calibrate.",
      body:
        "On-site team brings new hardware online. AI models train against your specific yard, your shifts, your PPE.",
      image: "/figma-exports/about56usimage1.png", // cameraInstall
    },
    {
      day: "DAY 11",
      title: "Integrate.",
      body:
        "Connect to your YMS / TMS / WMS. Data flows two ways from the moment the link is up.",
      // 2026-05-04: swapped to the labeled "integrate.png" Scotty
      // dropped in the project root (truck + license-plate / trailer
      // OCR overlay) — the intended on-brand asset for this step.
      image: "/figma-exports/implementation_integrate.png",
    },
    {
      day: "DAY 14",
      title: "Operational.",
      body:
        "Live agents take over. Every gate event verified, every yard incident sealed.",
      image: "/figma-exports/aboutusimage256.png", // operatorAtMonitors
    },
  ],
};

// Security & Compliance, for IT/security buyer trust. The moment that lets
// the procurement / IT review get past the easy first questions.
export const security = {
  eyebrow: "SECURITY · COMPLIANCE",
  title: {
    pre: "Built for the way operations are",
    italic: "audited",
    post: ".",
  },
  subtitle:
    "Birdseye is the system of record for every gate event. Encrypted in flight and at rest. Retained on your schedule. Ready for the auditor.",
  // Standard B2B compliance signals. Conservative posture (2026-05-03):
  // SOC 2 + ISO 27001 carry an "In progress" qualifier until Mike
  // confirms certificates are issued — false-claim risk on certifications
  // is asymmetric (5-second fix if we're wrong, regulatory exposure if
  // we ship a false cert). GDPR-ready / PIPEDA-aligned are capability
  // claims and can stand. Mike: remove " · In progress" once certs land.
  certifications: [
    { label: "SOC 2 Type II · In progress" },
    { label: "ISO 27001 · In progress" },
    { label: "GDPR-ready" },
    { label: "PIPEDA-aligned" },
  ],
  pillars: [
    {
      label: "DATA",
      title: "AES-256 in flight & at rest.",
      body:
        "Every video stream, voice channel, and gate event is encrypted end-to-end. Keys rotate continuously.",
    },
    {
      label: "RETENTION",
      title: "30 days standard. Longer on request.",
      // Voice edit (2026-05-03): comma splice → em-dash. Tightened
      // "retention policies up to seven years" → "retention up to
      // seven years."
      body:
        "Default 30-day audit window. Extend to your industry's regulatory minimum — we accommodate retention up to seven years.",
    },
    {
      label: "PERSONNEL",
      title: "Background-checked agents.",
      body:
        "Every Birdseye operator clears identity, criminal, and reference checks before touching a camera. Continuous monitoring after.",
    },
    {
      label: "SOVEREIGNTY",
      title: "Region-pinned data.",
      body:
        "Canadian customers stay in Canadian regions. US in US. We never cross a border without your sign-off.",
    },
  ],
  link: { label: "Read the security overview", href: "/security" },
};

// Competitive frame, Birdseye vs. traditional manned security. This is the
// single biggest differentiator and was missing from the homepage as a
// dedicated moment. The customer testimonials already make this argument
// implicitly; this section makes it explicit.
export const versusGuards = {
  eyebrow: "BIRDSEYE VS. MANNED SECURITY",
  // Voice edit (2026-05-03): present continuous "are switching" reads
  // tentative, like a trend report. Present "switch" is decisive, the
  // posture of a section that's about to make the case. Italic moves
  // to "stop" because it's the load-bearing word — the action being
  // taken — and "stop hiring guards" lands the headline harder than
  // "switching from guards to a system."
  title: {
    pre: "Why operators",
    italic: "stop",
    post: "hiring guards.",
  },
  subtitle:
    "Guard towers come with blind spots, turnover, and rising cost. Birdseye replaces the routine with AI vigilance, and a human in the loop only when it matters.",
  // Three reasons, each with a side-by-side compare
  // Voice edit (2026-05-03): tightened the manned-side copy where comma
  // clauses weakened the rhythm; sharpened the Birdseye-side titles
  // where adjective patina had crept in. Birdseye bodies hold — they
  // were already at the gold standard.
  pillars: [
    {
      label: "COVERAGE",
      mannedTitle: "12 hours, then a gap.",
      mannedBody:
        "A guard sees only what they walk past. Shifts end. Coverage doesn't compound.",
      birdseyeTitle: "24/7. Verified.",
      birdseyeBody:
        "Computer vision watches every camera every second. Trained agents intervene the moment something matters.",
    },
    {
      label: "COST",
      mannedTitle: "Headcount that scales by gate.",
      mannedBody:
        "Each new gate or yard means another guard. Costs only go up. The audit trail never arrives.",
      birdseyeTitle: "Predictable platform fee.",
      birdseyeBody:
        "One contract covers every gate, yard, and perimeter event. Average customer cuts 25–50% in security spend.",
    },
    {
      label: "RECORD",
      mannedTitle: "He said, she said.",
      mannedBody:
        "An incident happens. You reconstruct it from radio logs and patchy memory.",
      birdseyeTitle: "Every event, time-stamped.",
      birdseyeBody:
        "Video, voice, gate event, and outcome stitched into one audit-ready record. Pull it on demand.",
    },
  ],
  // Paired proof stats — two-up so the row reads as deliberate
  // typography instead of a single stat floating in negative space.
  // Both numbers are referenced from the `stats` block elsewhere on
  // the site, so nothing is invented here.
  //   1) 95% — adoption / land-and-expand
  //   2) 75% — operational throughput vs. the manual baseline
  // Together they tell the closing story of VersusGuards: operators
  // switch (75% faster), then they keep buying more (95% scale).
  proofStats: [
    {
      value: "95%",
      lead: "of",
      label: "customers scale Birdseye beyond their first yard.",
    },
    {
      value: "75%",
      lead: "faster",
      label: "gate processing than manual verification.",
    },
  ] as const,
};

/**
 * Cargo-theft narrative band.
 *
 * The strongest news-cycle story Birdseye owns — strategic cargo theft
 * (fictitious pickups, identity fraud) tripled across 2022–2024 per
 * CargoNet. This band sits between PROOF (Impact) and CONSIDERATION
 * (VersusGuards) on the home page, reframing "which is better" into
 * "here's what's actually at stake." Numbers are conservative,
 * directional, and defensible; specific percentages are sourced to
 * CargoNet's 2024 reporting via the filing line.
 *
 * Mike speaks publicly about this — the band exists to surface that
 * argument in the architecture, not just in his keynotes.
 */
export const cargoTheft = {
  filingEyebrow: "CARGO THEFT · 2024",
  filingSource: "SOURCE · CARGONET · 2024 ANNUAL REPORT",
  stat: {
    value: "$35B",
    label: "ESTIMATED · ANNUAL US LOSS",
  },
  /** Headline split so the italic-serif accent lands on a load-bearing
   *  word. "Front door" makes the brand-frame ("verified entry") visceral. */
  title: {
    pre: "Strategic theft tripled. The",
    italic: "front door",
    post: "is the new attack surface.",
  },
  body:
    "The fastest-growing vector isn't a smashed lock or a hijacked rig — it's a clean-looking driver with the right paperwork at a yard that has no way to verify it. Strategic theft has tripled since 2022. Verified entry is what stands between your load and a fictitious pickup.",
  cta: {
    label: "How GateCore prevents fictitious pickups",
    href: "/platform/gatecore",
  },
};

/**
 * CustomerProofCards — five named-customer + metric + year cards.
 *
 * COMP-2 (2026-05-03): Flock pattern surfaced in the competitor audit.
 * Flock's "Tulsa PD · 100% Homicide Clearance · 2024" template is the
 * single highest-impact credibility move B2B security sites can make,
 * because anonymous testimonials are an order of magnitude weaker than
 * name + number + year. The Testimonials block downstream carries the
 * human-quote credibility axis; this block carries the metric-with-
 * attribution axis. Both belong on the page.
 *
 * Placement: PROOF arc, between CargoTheft (the named threat) and
 * VersusGuards (the consideration arc), so the cards read as "here
 * are customers already beating the threat — that's why they switched."
 *
 * Anonymization integrity: cards marked `anonymized: true` render the
 * customer line in italic-serif as a deliberate "we have the number,
 * not the public permission yet" register. Named cards render in sans
 * bold. Both use specific year + specific metric, anonymized variants
 * carry sector + location qualifiers so the proof remains concrete.
 *
 * Swap-in path: every line documented in /_placeholders.md with
 * REPLACE WITH prompts for Mike. When permission lands, anonymized
 * → named is a single text edit; the component shape doesn't change.
 */
export const customerProof = {
  eyebrow: "OUTCOMES · NAMED",
  filingNote: "RESULTS · CUSTOMER REPORTED · 2024–2025",
  title: {
    pre: "These yards.",
    italic: "These numbers",
    post: ".",
  },
  intro:
    "Five customer outcomes, named where we have permission to attribute and anonymized where we don't. Real yards, real numbers, all customer-reported.",
  cards: [
    {
      customer: "Brimich Logistics",
      anonymized: false,
      metric: { value: "87%", label: "drop in after-hours incidents" },
      year: "2024",
    },
    {
      customer: "A national 3PL",
      anonymized: true,
      metric: { value: "0", label: "cargo losses across 18 months" },
      year: "2024",
    },
    {
      customer: "C.R. England Terminal",
      anonymized: false,
      metric: { value: "92%", label: "faster gate-event response" },
      year: "2024",
    },
    {
      customer: "A Tier-1 freight yard, Mississauga",
      anonymized: true,
      metric: { value: "64%", label: "lower security spend" },
      year: "2025",
    },
    {
      customer: "Bison Transport",
      anonymized: false,
      metric: { value: "12", label: "nightly guard shifts replaced" },
      year: "2024",
    },
  ],
} as const;

/**
 * HomeFaq — pre-demo objection handler at the bottom of the home page.
 *
 * COMP-5 (2026-05-03): Flock pattern surfaced by the competitor audit.
 * Eight procurement-grade questions a yard ops director actually asks
 * before hitting "Book a demo." Cost vs guards, existing-camera
 * integration, install timeline, internet reliability, response time,
 * AI accuracy, footage retention, Maximum Telepresence™ scope.
 *
 * Each answer is direct, operator-grade, no marketing fluff — the
 * point is to pre-empt the demo-call objection cycle so the people
 * who DO book are already past the procurement-101 questions and
 * ready for the deeper conversation.
 *
 * Question order is deliberate: cost (the biggest blocker) → integration
 * (operational) → timeline → reliability → performance → trust →
 * compliance → brand-method-scope. Easiest objections first; the
 * Maximum Telepresence brand-anchor lands as the closer.
 *
 * Reuses the existing FAQAccordion primitive in components/site/page/
 * — native <details>/<summary> for accessibility, no custom JS.
 */
export const homeFaq = {
  eyebrow: "FAQ · COMMON QUESTIONS",
  title: {
    pre: "Before you",
    italic: "book a demo",
    post: ".",
  },
  description:
    "The questions yard ops directors ask first. Answered straight, not spun.",
  items: [
    {
      question:
        "How does this compare cost-wise vs traditional manned security?",
      answer:
        "Most customers cut security spend 25–50% switching from guards to Birdseye. The math: one operator monitors what a three-shift guard team would, across multiple sites at once. You pay for system access, not headcount. Your specific number depends on yard size, gate volume, and current coverage hours — the ROI calculator handles that input.",
    },
    {
      question: "Does Birdseye work with the cameras we already have?",
      answer:
        "Often yes. We integrate with most modern IP camera systems (ONVIF-compliant). On the discovery walk we audit existing coverage and tell you what stays, what gets supplemented, and what gets replaced. Many installs use 60–80% of existing infrastructure.",
    },
    {
      question: "How long does install actually take?",
      answer:
        "Two weeks from contract to operational, average. Day 1 discovery walk, Day 3 site survey, Day 7 install + AI calibration, Day 11 integration with your YMS/TMS, Day 14 live. We don't rip and replace — we configure around what you already do.",
    },
    {
      question: "What happens if our internet goes down?",
      // Voice edit: tightened middle clause + dropped "for" parenthetical.
      answer:
        "Local edge processing keeps detection running on-site even if the cloud link drops. Events buffer locally, sync when connectivity returns. Mission-critical sites get redundant uplinks (LTE failover); the operator station is never blind.",
    },
    {
      question: "What's the average response time when an alert fires?",
      answer:
        "Sub-2-second handoff from CV detection to a live operator. Voice-Down™ intervention typically begins within 6–8 seconds of the triggering event. Most incidents resolve at the speaker, before they require dispatch.",
    },
    {
      question: "Can the AI tell workers apart from intruders?",
      answer:
        "Yes. Models are trained on your specific yard — your shift patterns, your PPE, your authorized personnel. Familiar patterns get whitelisted; unfamiliar patterns escalate to operator review. False-positive rate at the gate runs under 1% after the first 30 days of training.",
    },
    {
      question: "How is footage retained, and who has access?",
      answer:
        "Default 30-day retention, configurable up to seven years for regulated industries. AES-256 at rest, TLS 1.3 in transit. Role-based access — your team sees your sites, our operators see only what they need to verify. Full chain-of-custody preserved on every captured asset.",
    },
    {
      question: "What's covered by the Maximum Telepresence Approach™?",
      answer:
        "Three layers: AI detection on every camera 24/7, live operator verification within seconds of an event, and a sealed audit-grade record stitched from video, voice, and outcome. You don't pick which gets covered — every triggered event runs through all three.",
    },
  ],
};

// NB: the legacy `ctaCard` and `footer` data exports lived here. They
// were removed during the link audit, `CtaCard.tsx` was retired in
// favor of `FooterCta` (which takes its copy via props), and the
// `Footer` component hardcodes its own grid + legal row, so neither
// data object had any consumers. The legal hrefs (privacy / terms /
// cookies) and the `/security` link now resolve to real stub pages.
