"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";

export type LeadershipMember = {
  name: string;
  role: string;
  bio: string;
  /** Optional headshot path. When omitted, the card uses the gradient
   *  + initials placeholder pattern from /press and /career empty
   *  states. Mike's swap path: drop a JPEG/PNG into /public/team/ and
   *  pass the path here. */
  photo?: string;
};

/**
 * LeadershipGrid — 5-up team grid for /about-us.
 *
 * FIGMA-1 (2026-05-03): the Figma /about-us has a 5-person leadership
 * grid that wasn't present on the new site. B2B SaaS trust gap —
 * buyers want to see who runs the company. This component closes
 * that gap.
 *
 * Layout: 1-col on mobile, 2-col on md (2+2+1 tail), 5-col on lg.
 * Cards: square avatar (gradient + initials placeholder, real photo
 * when available) + name (sans bold) + role (mono caps eyebrow) +
 * tight bio (~25 words).
 *
 * Headshots: ship with the placeholder pattern. When real headshots
 * land, drop them into /public/team/ and pass `photo` in the
 * `members` array. Pattern documented in /_placeholders.md.
 */
export function LeadershipGrid({
  eyebrow = "LEADERSHIP",
  preTitle,
  italicTitle,
  postTitle,
  description,
  members,
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  members: LeadershipMember[];
}) {
  return (
    <section className="section-dark py-24 md:py-section border-t border-birdseye-cream/[0.06]">
      <Container className="max-w-site">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-12 md:mb-16"
        >
          <div>
            <span className="system-label text-birdseye-electric">
              {eyebrow}
            </span>
            <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
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
          </div>
          {description && (
            <p className="text-body text-birdseye-cream/65 max-w-copy lg:pb-3">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {members.map((m, i) => (
            <LeaderCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function LeaderCard({
  member,
  index,
}: {
  member: LeadershipMember;
  index: number;
}) {
  const initials = member.name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: index * 0.06 }}
      className="rounded-2xl border border-birdseye-cream/10 bg-birdseye-cream/[0.02] p-5 md:p-6"
    >
      {/* Avatar — gradient + initials placeholder until real headshot
          lands. The gradient is electric-tinted so the placeholder
          carries brand register; initials use Inter Black caps. */}
      <div
        className="aspect-square rounded-xl mb-5 grid place-items-center overflow-hidden bg-gradient-to-br from-birdseye-electric/35 via-birdseye-surface to-birdseye-cream/[0.04] border border-birdseye-cream/[0.06]"
        aria-hidden={member.photo ? undefined : true}
      >
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-black text-[clamp(1.5rem,2.4vw,2.25rem)] tracking-[-0.025em] text-birdseye-cream/45">
            {initials}
          </span>
        )}
      </div>

      <p className="font-bold text-birdseye-cream text-[16px] leading-[1.25]">
        {member.name}
      </p>
      <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-birdseye-electric/85">
        {member.role}
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-birdseye-cream/65">
        {member.bio}
      </p>
    </motion.article>
  );
}
