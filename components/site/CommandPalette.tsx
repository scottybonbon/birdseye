"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DUR,
  EASE_OUT,
  EASE_SNAP,
  usePrefersReducedMotion,
} from "@/_design/motion";

/**
 * CommandPalette, Cmd+K / Ctrl+K operational shortcut.
 *
 * Pairs with SystemConsole as the sister surface: the console is
 * always-on telemetry, the palette is on-demand instrumentation. Both
 * read as "this site is a control surface, not a brochure", Linear /
 * Vercel / Raycast vocabulary applied to a marketing site.
 *
 * Behavior:
 *   • Cmd+K (mac) or Ctrl+K (Win/Linux) → opens. Same shortcut while
 *     open → closes (toggle).
 *   • ⌘K can also be triggered by the `data-cmdk-open` attribute on
 *     any element, used by the affordance pill in SystemConsole.
 *   • Esc → close. Click on backdrop → close. Enter → execute focused.
 *   • Arrow keys / Tab → move focus. Wraps at top/bottom.
 *   • Recent commands (last 3 navigations) stored in localStorage so
 *     repeated jumps stay one keystroke away across sessions.
 *
 * Accessibility:
 *   • role="dialog" aria-modal aria-label set on panel.
 *   • Each command row has role="option" and an `id` so the input's
 *     aria-activedescendant points at the focused row, the screen
 *     reader announces the focused command on every arrow key without
 *     stealing focus from the input.
 *   • The whole list has role="listbox".
 *   • Body scroll is locked while open so background scroll doesn't
 *     compete with keyboard nav.
 *
 * Visual restraint:
 *   • Black panel on translucent black backdrop. No card shadow, the
 *     Birdseye brand discipline avoids drop shadows in favor of hairline
 *     borders. A single 1px cream/12% border defines the card edge.
 *   • Mono input echo, mono group headers, mono right-side hints 
 *     reinforces the operational language.
 *   • Group headers are uppercase mono in cream/40, tracking 0.18em.
 */

// ─── Command catalog ───────────────────────────────────────────────

type CommandGroup = "Navigate" | "Core" | "Industry" | "Resource" | "Action";

type Command = {
  id: string;
  label: string;
  /** Right-side hint shown after the label, typically the route or a
   *  category tag in mono caps. */
  hint?: string;
  /** Additional substrings to match against the search input. Lets a
   *  user find "GateCore" by typing "id verify" or "dock". */
  keywords?: string[];
  group: CommandGroup;
  /** Set for navigation commands. The router pushes here on execute. */
  href?: string;
  /** Set for action commands. Called on execute. The runtime wraps it
   *  to also close the palette. */
  action?: (ctx: CommandActionContext) => void | Promise<void>;
  /** When true, executing this command WON'T be tracked as "recent" 
   *  used for ephemeral actions (scroll, copy). */
  ephemeral?: boolean;
};

type CommandActionContext = {
  router: ReturnType<typeof useRouter>;
};

const POSTAL_ADDRESS = "Birdseye, 6358 Viscount Rd, Mississauga ON L4V 1H3";

const COMMANDS: Command[] = [
  // ─── Core pages ──────────────────────────────────────────────────
  {
    id: "platform",
    label: "Platform overview",
    hint: "/platform",
    group: "Navigate",
    href: "/platform",
  },
  {
    id: "gatecore",
    label: "GateCore",
    hint: "CORE",
    keywords: ["gate", "id", "verify", "driver", "kiosk", "throughput"],
    group: "Core",
    href: "/platform/gatecore",
  },
  {
    id: "safecore",
    label: "SafeCore",
    hint: "CORE",
    keywords: ["safe", "perimeter", "intrusion", "monitoring"],
    group: "Core",
    href: "/platform/safecore",
  },
  {
    id: "yardcore",
    label: "YardCore",
    hint: "CORE",
    keywords: ["yard", "ops", "dock", "trailer"],
    group: "Core",
    href: "/platform/yardcore",
  },
  {
    id: "integrations",
    label: "Integrations",
    hint: "PLATFORM",
    keywords: ["yms", "tms", "wms"],
    group: "Core",
    href: "/platform/integrations",
  },
  // ─── Industries ──────────────────────────────────────────────────
  {
    id: "ind-logistics",
    label: "Logistics",
    hint: "INDUSTRY",
    group: "Industry",
    href: "/industries/logistics",
  },
  {
    id: "ind-warehousing",
    label: "Warehousing",
    hint: "INDUSTRY",
    group: "Industry",
    href: "/industries/warehousing",
  },
  {
    id: "ind-supply",
    label: "Supply chain",
    hint: "INDUSTRY",
    keywords: ["3pl", "freight"],
    group: "Industry",
    href: "/industries/supply-chain",
  },
  {
    id: "ind-manuf",
    label: "Manufacturing",
    hint: "INDUSTRY",
    group: "Industry",
    href: "/industries/manufacturing",
  },
  {
    id: "ind-auto",
    label: "Automotive",
    hint: "INDUSTRY",
    keywords: ["oem", "automotive"],
    group: "Industry",
    href: "/industries/automotive",
  },
  // ─── Company / reading ───────────────────────────────────────────
  {
    id: "home",
    label: "Home",
    hint: "/",
    group: "Navigate",
    href: "/",
  },
  {
    id: "about",
    label: "About",
    hint: "COMPANY",
    keywords: ["team", "story"],
    group: "Navigate",
    href: "/about-us",
  },
  {
    id: "manifesto",
    label: "Manifesto",
    hint: "READING",
    keywords: ["thesis", "brand"],
    group: "Navigate",
    href: "/manifesto",
  },
  {
    id: "principles",
    label: "Principles",
    hint: "CRAFT",
    keywords: ["rules", "design", "build", "constraints"],
    group: "Navigate",
    href: "/principles",
  },
  {
    id: "careers",
    label: "Careers",
    hint: "COMPANY",
    keywords: ["jobs", "hiring"],
    group: "Navigate",
    href: "/careers",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "COMPANY",
    group: "Navigate",
    href: "/contact",
  },
  {
    id: "results",
    label: "Results",
    hint: "PROOF",
    keywords: ["stats", "numbers"],
    group: "Navigate",
    href: "/results",
  },
  // ─── Resources ───────────────────────────────────────────────────
  {
    id: "case-studies",
    label: "Case studies",
    hint: "RESOURCES",
    group: "Resource",
    href: "/case-studies",
  },
  {
    id: "blog",
    label: "Blog",
    hint: "RESOURCES",
    group: "Resource",
    href: "/blog",
  },
  {
    id: "news",
    label: "News",
    hint: "RESOURCES",
    group: "Resource",
    href: "/news",
  },
  {
    id: "security",
    label: "Security & compliance",
    hint: "TRUST",
    keywords: ["soc2", "compliance", "audit"],
    group: "Resource",
    href: "/security",
  },
  {
    id: "changelog",
    label: "Open changelog",
    hint: "RELEASE NOTES",
    keywords: ["release", "shipped", "version", "v1"],
    group: "Resource",
    href: "/changelog",
  },
  {
    id: "press",
    label: "Press kit",
    hint: "NEWSROOM",
    keywords: ["media", "logo", "newsroom", "journalist", "brand assets"],
    group: "Resource",
    href: "/press",
  },
  {
    id: "status",
    label: "System status",
    hint: "OPERATIONAL",
    keywords: ["uptime", "incident", "operational", "subsystem", "yos"],
    group: "Resource",
    href: "/status",
  },
  // ─── Actions ─────────────────────────────────────────────────────
  {
    id: "book-demo",
    label: "Book a demo",
    hint: "PRIMARY",
    keywords: ["sales", "call", "schedule"],
    group: "Action",
    href: "/book-a-demo",
  },
  {
    id: "roi",
    label: "ROI calculator",
    hint: "TOOL",
    keywords: ["calc", "numbers", "savings"],
    group: "Action",
    href: "/roi-calculator",
  },
  {
    id: "copy-address",
    label: "Copy postal address",
    hint: "MISSISSAUGA",
    keywords: ["6358", "viscount", "mailing"],
    group: "Action",
    ephemeral: true,
    action: async () => {
      try {
        await navigator.clipboard.writeText(POSTAL_ADDRESS);
      } catch {
        /* clipboard unavailable, silent no-op */
      }
    },
  },
  {
    id: "scroll-top",
    label: "Scroll to top",
    hint: "ACTION",
    group: "Action",
    ephemeral: true,
    action: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
];

const RECENT_KEY = "birdseye:cmdk-recent:v1";
const MAX_RECENT = 3;

// ─── Search helpers ────────────────────────────────────────────────

function matches(cmd: Command, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  if (!q) return true;
  if (cmd.label.toLowerCase().includes(q)) return true;
  if (cmd.hint && cmd.hint.toLowerCase().includes(q)) return true;
  if (cmd.group.toLowerCase().includes(q)) return true;
  if (cmd.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
}

const GROUP_ORDER: CommandGroup[] = [
  "Core",
  "Industry",
  "Navigate",
  "Resource",
  "Action",
];

// ─── Animation ─────────────────────────────────────────────────────

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Default open/close: y(8) + scale(0.985) with EASE_SNAP. Tight, not floaty.
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Reduce-motion variant: same opacity story, no y travel, no scale punch.
// The dialog still appears/disappears (information must change), but the
// motion pattern is collapsed to a single quiet fade.
const panelVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// ─── Component ─────────────────────────────────────────────────────

export function CommandPalette() {
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // ── Open / close keybindings ────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      // Cmd/Ctrl + K toggles
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      // / opens (when not typing in another input). Convention from
      // GitHub / Linear, quick to reach.
      if (!isMod && e.key === "/") {
        const t = e.target as HTMLElement | null;
        const inField =
          t &&
          (t.tagName === "INPUT" ||
            t.tagName === "TEXTAREA" ||
            t.isContentEditable);
        if (!inField) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Custom event from SystemConsole pill ────────────────────────
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("birdseye:cmdk-open", onOpen);
    return () => window.removeEventListener("birdseye:cmdk-open", onOpen);
  }, []);

  // ── Load recent ids from localStorage on mount ──────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (!raw) return;
      const ids = JSON.parse(raw);
      if (Array.isArray(ids)) setRecentIds(ids.slice(0, MAX_RECENT));
    } catch {
      /* localStorage may throw in private mode, silently no-op */
    }
  }, []);

  // ── Body scroll lock + autofocus on open ────────────────────────
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // ── Reset query + focus on every open ───────────────────────────
  useEffect(() => {
    if (open) {
      setQuery("");
      setFocused(0);
    }
  }, [open]);

  // ── Filter + group ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    return COMMANDS.filter((c) => matches(c, query));
  }, [query]);

  // Build the visible flat list. When there's no query, we surface
  // recents at the top in their own pseudo-group so the user can re-jump
  // with one keystroke. Once they start typing, recents collapse out so
  // they don't poison the search ranking.
  const sections = useMemo(() => {
    const recentCmds = !query
      ? recentIds
          .map((id) => COMMANDS.find((c) => c.id === id))
          .filter((c): c is Command => Boolean(c))
      : [];

    const recentSet = new Set(recentCmds.map((c) => c.id));
    const grouped: Record<CommandGroup, Command[]> = {
      Core: [],
      Industry: [],
      Navigate: [],
      Resource: [],
      Action: [],
    };
    for (const cmd of filtered) {
      // Skip recents from main groups so they don't render twice.
      if (recentSet.has(cmd.id)) continue;
      grouped[cmd.group].push(cmd);
    }

    const out: { label: string; items: Command[] }[] = [];
    if (recentCmds.length) out.push({ label: "Recent", items: recentCmds });
    for (const g of GROUP_ORDER) {
      if (grouped[g].length) out.push({ label: g, items: grouped[g] });
    }
    return out;
  }, [filtered, recentIds, query]);

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  // Clamp focused index to current flat list length.
  useEffect(() => {
    if (focused >= flat.length) setFocused(0);
  }, [flat.length, focused]);

  // ── Execute a command ───────────────────────────────────────────
  const execute = useCallback(
    (cmd: Command) => {
      if (!cmd.ephemeral) {
        // Track in recent, most-recent first, deduped, capped.
        setRecentIds((prev) => {
          const next = [cmd.id, ...prev.filter((id) => id !== cmd.id)].slice(
            0,
            MAX_RECENT,
          );
          try {
            localStorage.setItem(RECENT_KEY, JSON.stringify(next));
          } catch {
            /* noop */
          }
          return next;
        });
      }
      setOpen(false);
      // Defer router push so the close animation has a frame to start.
      window.setTimeout(() => {
        if (cmd.href) {
          router.push(cmd.href);
        } else if (cmd.action) {
          cmd.action({ router });
        }
      }, 60);
    },
    [router],
  );

  // ── Keyboard nav inside the palette ─────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      setFocused((i) => (i + 1) % Math.max(flat.length, 1));
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      setFocused((i) => (i - 1 + flat.length) % Math.max(flat.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = flat[focused];
      if (cmd) execute(cmd);
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocused(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setFocused(Math.max(0, flat.length - 1));
    }
  };

  // Scroll the focused row into view.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector(
      `[data-cmd-index="${focused}"]`,
    );
    if (el && "scrollIntoView" in el) {
      (el as HTMLElement).scrollIntoView({ block: "nearest" });
    }
  }, [focused, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: DUR.base, ease: EASE_OUT }}
          className="fixed inset-0 z-[60] grid place-items-start pt-[12vh] px-4 bg-black/65 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          role="presentation"
        >
          <motion.div
            variants={reduceMotion ? panelVariantsReduced : panelVariants}
            transition={{
              duration: reduceMotion ? DUR.base : 0.22,
              ease: reduceMotion ? EASE_OUT : EASE_SNAP,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-[560px] rounded-2xl bg-black border border-birdseye-cream/[0.12] overflow-hidden"
            onKeyDown={onKeyDown}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 h-14 border-b border-birdseye-cream/[0.08]">
              <SearchGlyph />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search commands"
                aria-controls="cmdk-listbox"
                aria-activedescendant={
                  flat[focused] ? `cmdk-row-${flat[focused].id}` : undefined
                }
                className="flex-1 bg-transparent border-0 outline-none placeholder:text-birdseye-cream/35 text-birdseye-cream font-mono text-[14px] tracking-[0.01em]"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <kbd className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35 border border-birdseye-cream/[0.10] rounded px-2 h-6 grid place-items-center select-none">
                ESC
              </kbd>
            </div>

            {/* List */}
            <div
              ref={listRef}
              id="cmdk-listbox"
              role="listbox"
              aria-label="Commands"
              className="max-h-[55vh] overflow-y-auto py-2"
            >
              {sections.length === 0 && (
                <div className="px-5 py-8 text-center system-label text-birdseye-cream/40">
                  NO MATCH · TRY A DIFFERENT TERM
                </div>
              )}
              {sections.map((sec, sIdx) => {
                // Compute the starting flat index for this section so each
                // row knows its global position (drives focus).
                const startIdx = sections
                  .slice(0, sIdx)
                  .reduce((sum, s) => sum + s.items.length, 0);
                return (
                  <div key={sec.label} className="mb-1.5 last:mb-0">
                    <div className="system-label text-birdseye-cream/35 px-5 pt-3 pb-1.5">
                      {sec.label}
                    </div>
                    <div>
                      {sec.items.map((cmd, i) => {
                        const idx = startIdx + i;
                        const isFocused = idx === focused;
                        return (
                          <button
                            key={cmd.id}
                            type="button"
                            id={`cmdk-row-${cmd.id}`}
                            data-cmd-index={idx}
                            role="option"
                            aria-selected={isFocused}
                            onMouseEnter={() => setFocused(idx)}
                            onClick={() => execute(cmd)}
                            className={[
                              "group w-full flex items-center justify-between gap-4 px-5 h-10 text-left transition-colors",
                              isFocused
                                ? "bg-birdseye-cream/[0.06]"
                                : "bg-transparent",
                            ].join(" ")}
                          >
                            <span className="flex items-center gap-3 min-w-0">
                              <span
                                aria-hidden
                                className={[
                                  "h-1.5 w-1.5 rounded-full transition-colors",
                                  isFocused
                                    ? "bg-birdseye-electric"
                                    : "bg-birdseye-cream/15",
                                ].join(" ")}
                              />
                              <span className="text-[14px] text-birdseye-cream truncate">
                                {cmd.label}
                              </span>
                            </span>
                            {cmd.hint && (
                              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/40 shrink-0">
                                {cmd.hint}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between gap-4 px-5 h-10 border-t border-birdseye-cream/[0.08] font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <KbdInline>↑</KbdInline>
                  <KbdInline>↓</KbdInline>
                  Move
                </span>
                <span className="flex items-center gap-1.5">
                  <KbdInline>↵</KbdInline>
                  Open
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-birdseye-electric">⌘K</span>
                Toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0 text-birdseye-cream/45"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11 11l3.2 3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KbdInline({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border border-birdseye-cream/[0.10] rounded px-1.5 h-5 grid place-items-center select-none font-mono text-[9px] tracking-[0.16em] text-birdseye-cream/60">
      {children}
    </kbd>
  );
}
