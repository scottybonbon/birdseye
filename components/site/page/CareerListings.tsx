"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * CareerListings — open-roles archive with department filters and
 * per-card metadata. Replaces the generic ResourceGrid usage on /career
 * (DEEP-3).
 *
 * Two layers:
 *
 *  1. Department filter chips at the top — derived from the unique
 *     `department` values across the dataset. Multi-select via URL
 *     param (?dept=engineering,operations). When all chips are off,
 *     all roles render. When any chips are on, the role's department
 *     must match one of them.
 *
 *  2. Cards with a richer meta block: department + location +
 *     employment type, all rendered as small mono-caps chips in the
 *     card header. Title is the role name. Description is the WP
 *     excerpt. CTA is "Apply →" (or "View role →" when there's no
 *     apply_url surfaced from WP yet).
 *
 * Same URL-state pattern as ResourceGrid: filter selections survive
 * page refresh and deep-linking.
 *
 * No load-more pagination yet — careers archives are typically small
 * enough (< 30 roles) that everything fits in one screen. If the
 * roster ever grows past that we can mirror ResourceGrid's pageSize +
 * load-more pattern.
 */

export type CareerCard = {
  title: string;
  description: string;
  href: string;
  dateIso: string;
  department?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  apply_url?: string;
};

export function CareerListings({ roles }: { roles: CareerCard[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Distinct departments across the dataset, sorted alphabetically.
  // Falls back to a default set when WP hasn't surfaced any yet so the
  // UI doesn't read as broken — the filters just become decorative
  // until real department metadata lands.
  const departments = useMemo(() => {
    const set = new Set<string>();
    for (const r of roles) {
      if (r.department) set.add(r.department);
    }
    return Array.from(set).sort();
  }, [roles]);

  const showFilters = departments.length >= 2;

  // Read initial selection from URL. Format: ?dept=engineering,operations
  // Comma-separated, lowercase-matched against department names so a
  // visitor sharing a filtered link sees the same view.
  const initialSelected = useMemo(() => {
    const raw = searchParams.get("dept");
    if (!raw) return new Set<string>();
    const wanted = raw.split(",").map((s) => s.trim().toLowerCase());
    const match = new Set<string>();
    for (const d of departments) {
      if (wanted.includes(d.toLowerCase())) match.add(d);
    }
    return match;
  }, [departments, searchParams]);

  const [selected, setSelected] = useState<Set<string>>(initialSelected);

  const syncUrl = useCallback(
    (next: Set<string>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.size === 0) params.delete("dept");
      else
        params.set(
          "dept",
          Array.from(next).map((d) => d.toLowerCase()).join(","),
        );
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggleDept = (dept: string) => {
    const next = new Set(selected);
    if (next.has(dept)) next.delete(dept);
    else next.add(dept);
    setSelected(next);
    syncUrl(next);
  };

  const clearAll = () => {
    setSelected(new Set());
    syncUrl(new Set());
  };

  const visible = useMemo(() => {
    if (selected.size === 0) return roles;
    return roles.filter((r) => r.department && selected.has(r.department));
  }, [roles, selected]);

  return (
    <section className="section-dark relative py-24 md:py-section" id="open-roles">
      <Container className="max-w-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-14"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              OPEN ROLES · {roles.length} LISTED
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              Browse{" "}
              <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
                every
              </span>{" "}
              opening.
            </h2>
          </div>
          <p className="text-body text-birdseye-cream/55 max-w-copy lg:pb-3">
            Filter by team if you know what you&apos;re looking for. Don&apos;t see
            it? Send a note anyway — we hire ahead of the work.
          </p>
        </motion.div>

        {/* Department filter chips */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-8 md:mb-10"
            role="group"
            aria-label="Filter open roles by department"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-birdseye-cream/45 mr-2">
              DEPARTMENT
            </span>
            {departments.map((d) => {
              const active = selected.has(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDept(d)}
                  aria-pressed={active}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                    active
                      ? "bg-birdseye-electric text-birdseye-cream border border-birdseye-electric"
                      : "border border-birdseye-cream/20 text-birdseye-cream/65 hover:border-birdseye-cream/40 hover:text-birdseye-cream"
                  }`}
                >
                  {d}
                </button>
              );
            })}
            {selected.size > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-1 font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/45 hover:text-birdseye-electric transition-colors"
              >
                Clear
              </button>
            )}
          </motion.div>
        )}

        {/* Cards */}
        {visible.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px border-t border-birdseye-cream/[0.10] bg-birdseye-cream/[0.08]">
            {visible.map((r, i) => (
              <motion.div
                key={r.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: DUR.smooth,
                  ease: EASE_OUT,
                  delay: Math.min(i, 8) * 0.04,
                }}
                className="bg-birdseye-surface border-b border-birdseye-cream/[0.10]"
              >
                <CareerCardLink role={r} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-birdseye-cream/[0.10] rounded-lg p-12 text-center">
            <p className="system-label text-birdseye-cream/55 mb-3">
              EMPTY · NO MATCHES
            </p>
            <p className="text-body text-birdseye-cream/70">
              No open roles match the current filters.{" "}
              <button
                type="button"
                onClick={clearAll}
                className="text-birdseye-electric hover:underline"
              >
                Show all roles
              </button>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * One role card. Header line carries the meta chips (department,
 * location, employment type) when present. Title is the role name.
 * Body is the WP excerpt. CTA jumps to the apply URL if present, or
 * to the role's own /career/[slug] page otherwise.
 */
function CareerCardLink({ role }: { role: CareerCard }) {
  const hasApplyUrl = Boolean(role.apply_url);
  const inner = (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5">
        {role.department && (
          <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-birdseye-electric">
            {role.department}
          </span>
        )}
        {role.location && (
          <>
            {role.department && (
              <span aria-hidden className="text-birdseye-cream/15">·</span>
            )}
            <span className="font-mono text-[10.5px] tracking-[0.10em] text-birdseye-cream/55">
              {role.location}
            </span>
          </>
        )}
        {role.employment_type && (
          <>
            <span aria-hidden className="text-birdseye-cream/15">·</span>
            <span className="font-mono text-[10.5px] tracking-[0.10em] text-birdseye-cream/45">
              {role.employment_type}
            </span>
          </>
        )}
      </div>
      <h3 className="text-[clamp(1.25rem,1.6vw,1.625rem)] leading-[1.2] tracking-[-0.012em] font-bold text-birdseye-cream group-hover:text-birdseye-cream">
        {role.title}
      </h3>
      {role.description && (
        <p className="mt-3 text-[14.5px] leading-[1.6] text-birdseye-cream/55 line-clamp-3">
          {role.description}
        </p>
      )}
      {role.experience_level && (
        <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-cream/35">
          LEVEL · {role.experience_level}
        </p>
      )}
      <div className="mt-7 inline-flex items-center gap-2 text-[13px] text-birdseye-cream/70 group-hover:text-birdseye-electric transition-colors">
        {hasApplyUrl ? (
          <>
            Apply
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </>
        ) : (
          <>
            View role
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </>
        )}
      </div>
    </>
  );

  if (hasApplyUrl && role.apply_url) {
    return (
      <a
        href={role.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-7 md:p-8 h-full hover:bg-[#15151A] transition-colors"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={role.href}
      className="group block p-7 md:p-8 h-full hover:bg-[#15151A] transition-colors"
    >
      {inner}
    </Link>
  );
}
