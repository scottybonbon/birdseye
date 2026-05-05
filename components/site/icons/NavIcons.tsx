/**
 * Nav icon set, outlined, 1.5px stroke, 24px viewBox.
 *
 * Visual language: each icon is a single concept rendered as a confident
 * line drawing. They sit inside small (32–36px) tinted tiles in the mega
 * menu so they read as utility marks, not illustrations. Avoid filled
 * shapes except for the rare accent dot, it keeps the row of icons
 * uniform in weight.
 *
 * To add a new icon: add a key to NavIcon in _design/content.ts, then
 * register the component in the iconMap below.
 */

import type { NavIcon } from "@/_design/content";

type Props = { className?: string };

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/* ─── PLATFORM ─── */

// Three stacked rectangles + a connecting bracket, the "operating system"
// composed of multiple cores.
function YardOsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="4" rx="1" {...stroke} />
      <rect x="3" y="10" width="18" height="4" rx="1" {...stroke} />
      <rect x="3" y="16" width="18" height="4" rx="1" {...stroke} />
      <circle cx="6" cy="6" r="0.6" fill="currentColor" />
      <circle cx="6" cy="12" r="0.6" fill="currentColor" />
      <circle cx="6" cy="18" r="0.6" fill="currentColor" />
    </svg>
  );
}

// Gate barrier, boom arm angled up, pivot post on the left.
function GateCoreIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 20V5" {...stroke} />
      <path d="M5 8l14-3" {...stroke} />
      <circle cx="5" cy="8" r="1.4" {...stroke} />
      <path d="M3 20h18" {...stroke} />
      <path d="M9 7.2l-.4 2M13 6.4l-.4 2M17 5.6l-.4 2" {...stroke} />
    </svg>
  );
}

// Shield with a check, perimeter security.
function SafeCoreIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" {...stroke} />
      <path d="M9 12.5l2 2 4-4.5" {...stroke} />
    </svg>
  );
}

// Aerial yard grid, overhead view of bays with a marker.
function YardCoreIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" {...stroke} />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" {...stroke} />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Plug + connector lines, integrations.
function IntegrationsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M9 3v4M15 3v4" {...stroke} />
      <rect x="7" y="7" width="10" height="6" rx="1.5" {...stroke} />
      <path d="M12 13v3a3 3 0 0 1-3 3H6" {...stroke} />
      <path d="M12 13v3a3 3 0 0 0 3 3h3" {...stroke} />
    </svg>
  );
}

/* ─── INDUSTRIES ─── */

// Tractor + trailer, logistics.
function LogisticsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2" y="8" width="11" height="8" rx="1" {...stroke} />
      <path d="M13 10h4l3 3v3h-7" {...stroke} />
      <circle cx="7" cy="18" r="1.6" {...stroke} />
      <circle cx="17" cy="18" r="1.6" {...stroke} />
    </svg>
  );
}

// Warehouse, pitched roof with bay door.
function WarehousingIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 11l9-6 9 6v9H3z" {...stroke} />
      <rect x="9" y="13" width="6" height="7" {...stroke} />
      <path d="M9 16h6" {...stroke} />
    </svg>
  );
}

// Factory with smokestacks, manufacturing.
function ManufacturingIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 20V11l5 3V11l5 3V8l8 4v8z" {...stroke} />
      <path d="M7 20v-3M12 20v-3M17 20v-3" {...stroke} />
    </svg>
  );
}

// Network nodes, supply chain visibility.
function SupplyChainIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="5" cy="6" r="2" {...stroke} />
      <circle cx="19" cy="6" r="2" {...stroke} />
      <circle cx="12" cy="13" r="2" {...stroke} />
      <circle cx="5" cy="19" r="2" {...stroke} />
      <circle cx="19" cy="19" r="2" {...stroke} />
      <path d="M6.5 7.4L10.5 11.6M17.5 7.4l-4 4.2M10.5 14.4L6.5 17.6M13.5 14.4l4 3.2" {...stroke} />
    </svg>
  );
}

// Car silhouette, automotive.
function AutomotiveIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 16v-3l2-5h12l2 5v3" {...stroke} />
      <path d="M2 16h20" {...stroke} />
      <circle cx="7" cy="17.5" r="1.6" {...stroke} />
      <circle cx="17" cy="17.5" r="1.6" {...stroke} />
      <path d="M7 11h10" {...stroke} />
    </svg>
  );
}

/* ─── RESULTS ─── */

// Document with a star, case study.
function CasesIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 3h9l4 4v14H6z" {...stroke} />
      <path d="M15 3v4h4" {...stroke} />
      <path d="M12 11l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 17l-2.4 1.2.5-2.6L8.2 13.8l2.6-.4z" {...stroke} />
    </svg>
  );
}

// Bar chart, by the numbers.
function NumbersIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 20V4M4 20h16" {...stroke} />
      <rect x="7" y="13" width="3" height="5" {...stroke} />
      <rect x="12" y="9" width="3" height="9" {...stroke} />
      <rect x="17" y="6" width="3" height="12" {...stroke} />
    </svg>
  );
}

// Calculator with tape strip, ROI calculator.
function CalculatorIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2" {...stroke} />
      <rect x="8" y="6" width="8" height="3" {...stroke} />
      <circle cx="9" cy="13" r="0.6" fill="currentColor" />
      <circle cx="12" cy="13" r="0.6" fill="currentColor" />
      <circle cx="15" cy="13" r="0.6" fill="currentColor" />
      <circle cx="9" cy="16" r="0.6" fill="currentColor" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
      <circle cx="15" cy="16" r="0.6" fill="currentColor" />
    </svg>
  );
}

/* ─── RESOURCES ─── */

// Article with text lines, blog.
function BlogIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" {...stroke} />
      <path d="M8 9h8M8 13h8M8 17h5" {...stroke} />
    </svg>
  );
}

// Open book, guides.
function GuidesIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 5l9 2 9-2v13l-9 2-9-2z" {...stroke} />
      <path d="M12 7v13" {...stroke} />
    </svg>
  );
}

// Play arrow inside a frame, videos.
function VideosIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
      <path d="M10 9.5l5 2.5-5 2.5z" {...stroke} />
    </svg>
  );
}

// Clipboard with checks, checklists.
function ChecklistsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M9 4h6v2H9z" {...stroke} />
      <path d="M5 6h2v15h10V6h2" {...stroke} />
      <path d="M9 11l1.5 1.5L13 10M9 16l1.5 1.5L13 15" {...stroke} />
    </svg>
  );
}

// Newspaper, news.
function NewsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 6h13v14H4z" {...stroke} />
      <path d="M17 9h3v9a2 2 0 0 1-2 2h-1" {...stroke} />
      <path d="M7 10h7M7 13h7M7 16h5" {...stroke} />
    </svg>
  );
}

// Calendar, events.
function EventsIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="4" y="6" width="16" height="14" rx="2" {...stroke} />
      <path d="M4 10h16M9 4v4M15 4v4" {...stroke} />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* ─── COMPANY ─── */

// Bird in flight, about us (subtle nod to the brand).
function AboutIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 13c4-1 7-2 9-5 1 2 3 3 5 3-2 4-5 6-9 6H3z" {...stroke} />
      <circle cx="16" cy="9" r="0.7" fill="currentColor" />
    </svg>
  );
}

// Birdseye monogram "B", "About Us" — the brand mark itself. The
// waving-hand attempt didn't read at the 32–36px tile size; the
// monogram is unambiguous and reinforces the brand on hover. Single
// rounded "B" letterform: a left vertical stem with two rounded
// counter-bowls on the right, drawn as outlined paths so it sits
// next to the other line-icon nav glyphs in the same stroke
// register.
function MonogramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {/* Left vertical stem */}
      <path d="M6.5 4v16" {...stroke} />
      {/* Top bowl — half-circle to the right of the stem */}
      <path d="M6.5 4h7a4 4 0 0 1 0 8H6.5" {...stroke} />
      {/* Bottom bowl — slightly larger half-circle */}
      <path d="M6.5 12h8a4 4 0 0 1 0 8H6.5" {...stroke} />
    </svg>
  );
}

// Pen / fountain pen on a baseline, "A note from Mike" — handwritten
// letter mark. Diagonal pen body with nib pointing down-left,
// resting on a short underline that suggests a signed page.
function LetterIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {/* Pen body — diagonal stroke from upper-right to lower-left */}
      <path d="M17.5 4.5l2 2L8.5 17.5l-3 1 1-3z" {...stroke} />
      {/* Nib detail */}
      <path d="M14.5 7.5l2 2" {...stroke} />
      {/* Underline / signature baseline */}
      <path d="M5 21h14" {...stroke} />
      {/* Small accent dot at the end of the line, the "period" of the note */}
      <circle cx="19" cy="21" r="0.6" fill="currentColor" />
    </svg>
  );
}

// People, careers.
function CareersIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="9" cy="9" r="3" {...stroke} />
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" {...stroke} />
      <circle cx="17" cy="10" r="2.4" {...stroke} />
      <path d="M15 19c0-2.4 1.6-4.4 4-5" {...stroke} />
    </svg>
  );
}

// Speech bubble, contact.
function ContactIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" {...stroke} />
      <circle cx="9" cy="10.5" r="0.7" fill="currentColor" />
      <circle cx="12" cy="10.5" r="0.7" fill="currentColor" />
      <circle cx="15" cy="10.5" r="0.7" fill="currentColor" />
    </svg>
  );
}

const iconMap: Record<NavIcon, (p: Props) => React.JSX.Element> = {
  yardos: YardOsIcon,
  gatecore: GateCoreIcon,
  safecore: SafeCoreIcon,
  yardcore: YardCoreIcon,
  integrations: IntegrationsIcon,
  logistics: LogisticsIcon,
  warehousing: WarehousingIcon,
  manufacturing: ManufacturingIcon,
  supplyChain: SupplyChainIcon,
  automotive: AutomotiveIcon,
  cases: CasesIcon,
  numbers: NumbersIcon,
  calculator: CalculatorIcon,
  blog: BlogIcon,
  guides: GuidesIcon,
  videos: VideosIcon,
  checklists: ChecklistsIcon,
  news: NewsIcon,
  events: EventsIcon,
  about: AboutIcon,
  monogram: MonogramIcon,
  letter: LetterIcon,
  careers: CareersIcon,
  contact: ContactIcon,
};

export function NavIconGlyph({
  name,
  className,
}: {
  name?: NavIcon;
  className?: string;
}) {
  if (!name) return null;
  const Cmp = iconMap[name];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}
