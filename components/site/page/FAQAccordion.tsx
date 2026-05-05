"use client";

export type FAQAccordionProps = {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  items: Array<{ question: string; answer: string }>;
};

export function FAQAccordion({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
  items,
}: FAQAccordionProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-12 md:mb-16">
        {eyebrow && (
          <span className="system-label text-birdseye-electric">{eyebrow}</span>
        )}
        <h2 className="mt-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.05] tracking-[-0.02em] font-bold text-birdseye-cream">
          {preTitle}
          {italicTitle && (
            <>
              {" "}
              <span className="font-serif italic font-normal text-birdseye-electric">
                {italicTitle}
              </span>
            </>
          )}
          {postTitle && <> {postTitle}</>}
        </h2>
        {description && (
          <p className="mt-5 text-body text-birdseye-cream/65 max-w-[640px]">
            {description}
          </p>
        )}
      </div>

      {/* FAQ items */}
      <div className="space-y-3 md:space-y-4">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group bg-birdseye-surface border border-birdseye-cream/[0.10] rounded-xl p-6 md:p-7 cursor-pointer transition-colors hover:border-birdseye-cream/[0.15]"
          >
            <summary className="flex items-start justify-between gap-4 list-none">
              <span className="text-[15px] md:text-[16px] font-semibold text-birdseye-cream leading-[1.5] flex-1 text-left">
                {item.question}
              </span>
              <svg
                aria-hidden
                className="w-5 h-5 text-birdseye-cream/60 flex-shrink-0 mt-0.5 transition-transform duration-300 group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="mt-5 text-body text-birdseye-cream/65 leading-[1.6] pt-5 border-t border-birdseye-cream/[0.05]">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
