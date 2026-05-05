import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/page/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/_design/content";

/**
 * Shared shell for policy / legal pages, Privacy, Terms, Cookies, etc.
 *
 * Each page supplies its own headline copy and a list of sections. The
 * shell renders a hero, a left-rail "last updated" + table of contents,
 * and a single-column body that takes plain text or arrays of paragraphs.
 *
 * Stubs for now, legal team will swap the body copy in later. Reachable
 * routes mean no more 404s from the Footer legal row.
 */

export type LegalSection = {
  id: string;
  title: string;
  body: string | string[];
};

export function LegalPage({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
  lastUpdated,
  sections,
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell bareFooter>
      <PageHero
        eyebrow={eyebrow ?? "POLICY"}
        preTitle={preTitle}
        italicTitle={italicTitle}
        postTitle={postTitle}
        description={description}
      />

      <section className="section-dark py-20 md:py-28">
        <Container className="max-w-site">
          <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">
            {/* Left rail, last updated + jump-to */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/40 mb-3">
                Last updated
              </div>
              <div className="text-[15px] text-birdseye-cream mb-10">
                {lastUpdated}
              </div>

              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/40 mb-4">
                On this page
              </div>
              <ul className="space-y-2.5 border-l border-birdseye-cream/[0.10] pl-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13.5px] text-birdseye-cream/65 hover:text-birdseye-cream transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-10 border-t border-birdseye-cream/[0.10]">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-birdseye-cream/40 mb-3">
                  Questions?
                </div>
                <Link
                  href={`mailto:${company.email}`}
                  className="text-[14px] text-birdseye-cream hover:text-birdseye-electric transition-colors"
                >
                  {company.email}
                </Link>
              </div>
            </aside>

            {/* Body, sections */}
            <div className="max-w-[680px]">
              {sections.map((section, idx) => {
                const paragraphs = Array.isArray(section.body)
                  ? section.body
                  : [section.body];
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    className={
                      "scroll-mt-24 " +
                      (idx > 0
                        ? "pt-12 mt-12 border-t border-birdseye-cream/[0.10]"
                        : "")
                    }
                  >
                    <h2 className="text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.2] tracking-[-0.012em] font-semibold text-birdseye-cream">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-body text-birdseye-cream/70 leading-[1.65]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Stub note, quietly signals this is placeholder content */}
              <div className="mt-16 pt-8 border-t border-birdseye-cream/[0.10] font-mono text-[11px] tracking-[0.10em] uppercase text-birdseye-cream/35">
                Document under final legal review · contact{" "}
                <Link
                  href={`mailto:${company.email}`}
                  className="text-birdseye-cream/65 hover:text-birdseye-cream transition-colors"
                >
                  {company.email}
                </Link>{" "}
                for the controlling version.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
