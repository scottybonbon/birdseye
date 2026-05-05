"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

export type Resource = {
  title: string;
  description?: string;
  meta: string; // e.g. "Article · 5 min read" or "Guide · PDF"
  href: string;
  date?: string;
  /** Raw ISO date (from WP) — used for sort + year-filter when present. */
  dateIso?: string;
  /**
   * External attribution (DEEP-2, news posts). When present, the card
   * routes to the external URL in a new tab and the read-more line
   * reads "Read on {publication} ↗" instead of "Read →". When absent,
   * the card behaves as an internal link (default).
   */
  externalUrl?: string;
  /** Publication name for the "Read on X ↗" affordance. */
  publication?: string;
  /**
   * Taxonomy / topic tags from WP (DEEP-5). Used to power the topic
   * filter chips alongside the existing year filter. Empty array
   * collapses the topic-filter UI entirely — same gentle-degradation
   * pattern as the year filter (auto-hides when only one year exists).
   */
  topics?: string[];
};

/** Sort key union, kept narrow so the URL param stays predictable. */
type SortKey = "newest" | "oldest" | "az";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Newest first" },
  { key: "oldest", label: "Oldest first" },
  { key: "az", label: "A → Z" },
];

const DEFAULT_PAGE_SIZE = 9;

/**
 * Editorial card grid for resource hubs (Blog, Guides, Videos, Careers, etc).
 *
 * Two layers:
 *
 *  1. The card grid itself — mono meta line, headline, optional
 *     description, hover affordance to underline link.
 *
 *  2. Listing controls bar (sort, year filter, load-more pagination),
 *     baked in by default. Caller can opt out via `controls={false}`
 *     for places where filter/sort/pagination would be over-engineered
 *     (a sub-list of related items, a hand-curated set of three, etc).
 *
 * Listing-control state is mirrored to URL params so deep links survive
 * (`?sort=oldest&year=2025&page=2`). Pages are restored from the URL on
 * mount, so refreshing keeps the visitor's place.
 *
 * Year filter is auto-derived from `dateIso` on each resource. If fewer
 * than two distinct years exist, the year filter is hidden — no point
 * showing a single-option chip set.
 */
export function ResourceGrid({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
  resources,
  controls = true,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  resources: Resource[];
  /** Show the sort + filter + pagination bar. Default true. */
  controls?: boolean;
  /** How many cards per "page" of the load-more flow. Default 9 (3 rows). */
  pageSize?: number;
}) {
  return (
    <section className="section-dark relative py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            {eyebrow && (
              <span className="system-label text-birdseye-electric">{eyebrow}</span>
            )}
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              {preTitle}
              {italicTitle && (
                <>
                  {" "}
                  <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                    {italicTitle}
                  </span>
                </>
              )}
              {postTitle && <> {postTitle}</>}
            </h2>
          </motion.div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
              className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3"
            >
              {description}
            </motion.p>
          )}
        </div>

        {controls ? (
          <ListingBody resources={resources} pageSize={pageSize} />
        ) : (
          <CardsGrid resources={resources} />
        )}
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ListingBody — the controls + filtered/sorted/paginated grid.
   Split out so the no-controls fallback above stays a clean pass-through.
   ──────────────────────────────────────────────────────────────────── */

function ListingBody({
  resources,
  pageSize,
}: {
  resources: Resource[];
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Distinct years across the dataset, descending. If we don't have
  // enough variety to make a year filter meaningful, we'll hide it
  // entirely below.
  const years = useMemo(() => {
    const set = new Set<number>();
    for (const r of resources) {
      if (!r.dateIso) continue;
      const y = new Date(r.dateIso).getFullYear();
      if (!Number.isNaN(y)) set.add(y);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, [resources]);
  const showYearFilter = years.length >= 2;

  // Distinct topics across the dataset (DEEP-5). Same gentle-degradation
  // pattern as the year filter — topic chips hide entirely when fewer
  // than 2 distinct topics exist (a single-option chip set has no
  // information value). Sorted alphabetically so the chip order is
  // deterministic across renders.
  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const r of resources) {
      for (const t of r.topics ?? []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [resources]);
  const showTopicFilter = topics.length >= 2;

  // Read initial state from URL params so deep-links restore correctly.
  // We trust the sort param to be one of our known keys; anything else
  // falls back to "newest". Year is parsed as int and validated against
  // the actual set we found in the data.
  const initialSort = (() => {
    const s = searchParams.get("sort") as SortKey | null;
    return s && SORT_OPTIONS.some((o) => o.key === s) ? s : "newest";
  })();
  const initialYear = (() => {
    const raw = searchParams.get("year");
    if (!raw) return null;
    const y = parseInt(raw, 10);
    return years.includes(y) ? y : null;
  })();
  const initialPage = (() => {
    const p = parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isFinite(p) && p > 0 ? p : 1;
  })();
  // Topic state is multi-select via URL `?topic=field-notes,industry`.
  // Each token is matched case-insensitively against the discovered
  // topic names — a slug-tokenized version of each name is compared,
  // so URLs stay short while topic display labels keep their casing.
  const initialTopics = (() => {
    const raw = searchParams.get("topic");
    if (!raw) return new Set<string>();
    const wanted = raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const match = new Set<string>();
    for (const t of topics) {
      const slug = t.toLowerCase().replace(/\s+/g, "-");
      if (wanted.includes(t.toLowerCase()) || wanted.includes(slug)) {
        match.add(t);
      }
    }
    return match;
  })();

  const [sort, setSort] = useState<SortKey>(initialSort);
  const [year, setYear] = useState<number | null>(initialYear);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(initialTopics);
  const [page, setPage] = useState<number>(initialPage);

  // Sync state → URL. Replace (no scroll, no history clutter) so the
  // back button still pops out of the page rather than walking through
  // every filter tweak.
  const syncUrl = useCallback(
    (
      nextSort: SortKey,
      nextYear: number | null,
      nextTopics: Set<string>,
      nextPage: number,
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextSort === "newest") params.delete("sort");
      else params.set("sort", nextSort);
      if (nextYear == null) params.delete("year");
      else params.set("year", String(nextYear));
      if (nextTopics.size === 0) params.delete("topic");
      else
        params.set(
          "topic",
          Array.from(nextTopics)
            .map((t) => t.toLowerCase().replace(/\s+/g, "-"))
            .join(","),
        );
      if (nextPage <= 1) params.delete("page");
      else params.set("page", String(nextPage));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // Apply year filter → topic filter → sort → slice. Wrapped in useMemo
  // so the heavy work only runs when inputs change, not on every parent
  // rerender. Topic filter uses OR logic (match if the post has any of
  // the selected topics) — matches typical filter UX expectations and
  // keeps the result set from collapsing to zero when many topics are
  // selected.
  const visible = useMemo(() => {
    let out = resources;
    if (year != null) {
      out = out.filter(
        (r) =>
          r.dateIso != null &&
          new Date(r.dateIso).getFullYear() === year,
      );
    }
    if (selectedTopics.size > 0) {
      out = out.filter((r) =>
        (r.topics ?? []).some((t) => selectedTopics.has(t)),
      );
    }
    out = [...out].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const ad = a.dateIso ? Date.parse(a.dateIso) : 0;
      const bd = b.dateIso ? Date.parse(b.dateIso) : 0;
      return sort === "oldest" ? ad - bd : bd - ad;
    });
    return out;
  }, [resources, year, selectedTopics, sort]);

  const totalCount = visible.length;
  const visibleCount = Math.min(page * pageSize, totalCount);
  const remaining = totalCount - visibleCount;
  const sliced = visible.slice(0, visibleCount);

  // Update URL whenever a control changes. Wrapped handlers reset to
  // page 1 on filter/sort change (otherwise you can land on a deep
  // page that no longer has results).
  const onSortChange = (next: SortKey) => {
    setSort(next);
    setPage(1);
    syncUrl(next, year, selectedTopics, 1);
  };
  const onYearChange = (next: number | null) => {
    setYear(next);
    setPage(1);
    syncUrl(sort, next, selectedTopics, 1);
  };
  const onTopicToggle = (topic: string) => {
    const next = new Set(selectedTopics);
    if (next.has(topic)) next.delete(topic);
    else next.add(topic);
    setSelectedTopics(next);
    setPage(1);
    syncUrl(sort, year, next, 1);
  };
  const onTopicsClear = () => {
    setSelectedTopics(new Set());
    setPage(1);
    syncUrl(sort, year, new Set(), 1);
  };
  const onLoadMore = () => {
    const next = page + 1;
    setPage(next);
    syncUrl(sort, year, selectedTopics, next);
  };

  // Re-clamp the page if it points past the end after a filter change
  // (e.g. visitor lands at ?page=5 but only 12 items match the filter).
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(totalCount / pageSize));
    if (page > maxPage) {
      setPage(maxPage);
      syncUrl(sort, year, selectedTopics, maxPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, pageSize]);

  return (
    <>
      {/* Topic filter (DEEP-5, 2026-05-04 redesign): blog has 60+
          tags so an inline open chip row was visually overwhelming on
          load. Now collapsed into a dropdown trigger by default —
          click reveals a searchable, scrollable panel. Currently-
          selected topics surface as small chips next to the trigger
          so visitors who land via a deep-linked filtered URL can see
          their state without opening the panel. Multi-select +
          URL-state behaviour unchanged. */}
      {showTopicFilter && (
        <TopicFilter
          topics={topics}
          selected={selectedTopics}
          onToggle={onTopicToggle}
          onClear={onTopicsClear}
        />
      )}

      {/* Controls bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        {/* LEFT — year filter chips (or just a results count if year
            filtering wouldn't add anything useful) */}
        <div className="flex flex-wrap items-center gap-2">
          {showYearFilter ? (
            <>
              <button
                type="button"
                onClick={() => onYearChange(null)}
                aria-pressed={year == null}
                className={`font-mono text-[10.5px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  year == null
                    ? "border-birdseye-electric bg-birdseye-electric/10 text-birdseye-electric"
                    : "border-birdseye-cream/15 text-birdseye-cream/55 hover:text-birdseye-cream hover:border-birdseye-cream/35"
                }`}
              >
                All years
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => onYearChange(y)}
                  aria-pressed={year === y}
                  className={`font-mono text-[10.5px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    year === y
                      ? "border-birdseye-electric bg-birdseye-electric/10 text-birdseye-electric"
                      : "border-birdseye-cream/15 text-birdseye-cream/55 hover:text-birdseye-cream hover:border-birdseye-cream/35"
                  }`}
                >
                  {y}
                </button>
              ))}
            </>
          ) : (
            <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-birdseye-cream/45">
              {totalCount} {totalCount === 1 ? "ENTRY" : "ENTRIES"}
            </span>
          )}
        </div>

        {/* RIGHT — sort dropdown */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="resource-sort"
            className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-birdseye-cream/45"
          >
            Sort
          </label>
          <div className="relative">
            <select
              id="resource-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="appearance-none font-mono text-[11px] tracking-[0.16em] uppercase text-birdseye-cream bg-birdseye-surface border border-birdseye-cream/15 rounded-full pl-4 pr-10 py-1.5 hover:border-birdseye-cream/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-birdseye-cream/55 text-[10px]"
            >
              ▾
            </span>
          </div>
        </div>
      </div>

      {/* Results count strip — sits between the controls and the grid
          so the filter state always reads as "showing X of Y for {filter}". */}
      {(showYearFilter || showTopicFilter) && (
        <div className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/35">
            {visibleCount === 0
              ? "NO ENTRIES"
              : `SHOWING ${visibleCount} OF ${totalCount}`}
            {year != null && (
              <>
                {" · "}
                {year}
              </>
            )}
            {selectedTopics.size > 0 && (
              <>
                {" · "}
                {Array.from(selectedTopics).join(" + ").toUpperCase()}
              </>
            )}
          </span>
        </div>
      )}

      {sliced.length > 0 ? (
        <CardsGrid resources={sliced} />
      ) : (
        <div className="border border-birdseye-cream/[0.10] rounded-lg p-12 text-center">
          <p className="system-label text-birdseye-cream/55 mb-3">
            EMPTY · NO MATCHES
          </p>
          <p className="text-body text-birdseye-cream/70">
            Nothing here for the current filters.{" "}
            <button
              type="button"
              onClick={() => {
                onYearChange(null);
                onTopicsClear();
              }}
              className="text-birdseye-electric hover:underline"
            >
              Clear filters
            </button>
          </p>
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-12 md:mt-14 flex items-center justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="group inline-flex items-center gap-3 rounded-full border border-birdseye-cream/20 hover:border-birdseye-cream/40 hover:bg-birdseye-cream/[0.04] px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-birdseye-cream">
              Load {Math.min(remaining, pageSize)} more
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/45">
              {remaining} remaining
            </span>
          </button>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TopicFilter — collapsed dropdown + searchable scrollable panel.
   Avoids the open chip row that was overwhelming on /blog (60+ topics).
   ──────────────────────────────────────────────────────────────────── */

function TopicFilter({
  topics,
  selected,
  onToggle,
  onClear,
}: {
  topics: string[];
  selected: Set<string>;
  onToggle: (t: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Click-outside / ESC closes the panel.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Reset the search field when the panel closes so opening it again
  // shows the full list — visitors who toggled a few then closed
  // shouldn't have to re-clear the search to find a new topic.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter((t) => t.toLowerCase().includes(q));
  }, [topics, query]);

  return (
    <div ref={panelRef} className="relative mb-4 md:mb-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/45 mr-1">
          TOPIC
        </span>

        {/* Trigger button — shows total count + selected count when any */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
            selected.size > 0
              ? "border-birdseye-electric text-birdseye-electric"
              : "border-birdseye-cream/15 text-birdseye-cream/65 hover:text-birdseye-cream hover:border-birdseye-cream/35"
          }`}
        >
          {selected.size === 0
            ? `Filter by topic · ${topics.length}`
            : `${selected.size} selected`}
          <span aria-hidden className="text-[9px] opacity-70">
            {open ? "▴" : "▾"}
          </span>
        </button>

        {/* Inline chips for selected topics — visible without opening
            the panel so deep-linked filtered URLs read correctly at a
            glance. Each chip is a click-to-remove. */}
        {Array.from(selected).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(t)}
            aria-label={`Remove ${t} filter`}
            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-birdseye-electric bg-birdseye-electric text-birdseye-cream hover:bg-birdseye-electric/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-birdseye-electric focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t}
            <span aria-hidden className="text-[10px] opacity-80">
              ×
            </span>
          </button>
        ))}

        {selected.size > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="ml-1 font-mono text-[10.5px] tracking-[0.18em] uppercase text-birdseye-cream/45 hover:text-birdseye-electric transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Open panel — searchable, scrollable. */}
      {open && (
        <div
          role="listbox"
          aria-multiselectable
          aria-label="Topics"
          className="absolute z-30 mt-2 w-full max-w-xl rounded-xl border border-birdseye-cream/[0.12] bg-birdseye-surface shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Search input */}
          <div className="border-b border-birdseye-cream/[0.08] p-3">
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${topics.length} topics…`}
              className="w-full bg-transparent font-mono text-[12px] tracking-[0.04em] text-birdseye-cream placeholder:text-birdseye-cream/35 focus-visible:outline-none px-2 py-1"
            />
          </div>
          {/* Scrollable topic list */}
          <div className="max-h-[280px] overflow-y-auto py-1">
            {filteredTopics.length === 0 ? (
              <p className="px-4 py-6 text-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-birdseye-cream/45">
                No matches
              </p>
            ) : (
              filteredTopics.map((t) => {
                const active = selected.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => onToggle(t)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-mono text-[11px] tracking-[0.12em] uppercase transition-colors ${
                      active
                        ? "text-birdseye-electric bg-birdseye-electric/10"
                        : "text-birdseye-cream/75 hover:bg-birdseye-cream/[0.04] hover:text-birdseye-cream"
                    }`}
                  >
                    <span className="truncate">{t}</span>
                    {active && (
                      <span aria-hidden className="text-birdseye-electric">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CardsGrid — pure presentation, the original grid markup unchanged.
   ──────────────────────────────────────────────────────────────────── */

function CardsGrid({ resources }: { resources: Resource[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px border-t border-birdseye-cream/[0.10] bg-birdseye-cream/[0.08]">
      {resources.map((r, i) => (
        <motion.div
          key={r.href + (r.externalUrl ?? "")}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: Math.min(i, 8) * 0.04 }}
          className="bg-birdseye-surface border-b border-birdseye-cream/[0.10]"
        >
          <ResourceCardLink resource={r} />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * One resource card link. Two render modes:
 *
 *  • DEFAULT — internal Next.js Link to `r.href`. "Read →" affordance.
 *  • EXTERNAL — `<a target="_blank">` to `r.externalUrl` when present.
 *    Meta line gets a small ↗ glyph, and the read-more affordance
 *    reads "Read on {publication} ↗" so visitors know they're being
 *    bounced off-site to a third-party publication. (DEEP-2)
 *
 * Visually the cards stay the same shape — the only difference is the
 * subtle external-link glyph next to the meta and the changed CTA copy.
 * That's enough to set expectations without making the card feel like a
 * second-class citizen.
 */
function ResourceCardLink({ resource: r }: { resource: Resource }) {
  const isExternal = Boolean(r.externalUrl);
  const cardInner = (
    <>
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] tracking-[0.08em] text-birdseye-electric flex items-center gap-1.5">
          {r.meta}
          {isExternal && (
            <span
              aria-hidden
              className="text-birdseye-cream/35 group-hover:text-birdseye-electric transition-colors"
              title="External link"
            >
              ↗
            </span>
          )}
        </span>
        {r.date && (
          <span className="font-mono text-[11px] tracking-[0.08em] text-birdseye-cream/35">
            {r.date}
          </span>
        )}
      </div>
      <h3 className="text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream group-hover:text-birdseye-cream">
        {r.title}
      </h3>
      {r.description && (
        <p className="mt-3 text-[14.5px] leading-[1.6] text-birdseye-cream/55">
          {r.description}
        </p>
      )}
      <div className="mt-7 inline-flex items-center gap-2 text-[13px] text-birdseye-cream/70 group-hover:text-birdseye-electric transition-colors">
        {isExternal ? (
          <>
            Read on{" "}
            <span className="font-medium text-birdseye-cream/85 group-hover:text-birdseye-electric">
              {r.publication}
            </span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </>
        ) : (
          <>
            Read
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </>
        )}
      </div>
    </>
  );

  if (isExternal && r.externalUrl) {
    return (
      <a
        href={r.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-7 md:p-8 h-full hover:bg-[#15151A] transition-colors"
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link
      href={r.href}
      className="group block p-7 md:p-8 h-full hover:bg-[#15151A] transition-colors"
    >
      {cardInner}
    </Link>
  );
}
