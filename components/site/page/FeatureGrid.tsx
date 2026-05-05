"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DUR, EASE_OUT } from "@/_design/motion";


/**
 * Editorial three- or four-up feature grid. Each item gets an indexed
 * mono ticker, headline, body. Used on platform module pages, industry
 * pages, and anywhere we need to enumerate capabilities.
 */
export function FeatureGrid({
  eyebrow,
  preTitle,
  italicTitle,
  postTitle,
  description,
  features,
  columns = 3,
  variant = "dark",
}: {
  eyebrow?: string;
  preTitle: string;
  italicTitle?: string;
  postTitle?: string;
  description?: string;
  features: { title: string; body: string }[];
  columns?: 2 | 3 | 4 | 5;
  variant?: "dark" | "light";
}) {
  const sectionClass =
    variant === "dark"
      ? "section-dark"
      : "bg-birdseye-cream text-[#0A0A0F]";
  const headingColor = variant === "dark" ? "text-birdseye-cream" : "text-[#0A0A0F]";
  const bodyColor =
    variant === "dark" ? "text-birdseye-cream/65" : "text-[#0A0A0F]/65";
  const dividerColor =
    variant === "dark" ? "border-birdseye-cream/[0.10]" : "border-[#0A0A0F]/[0.10]";
  const tickerColor = "text-birdseye-electric";

  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : columns === 5
          ? "md:grid-cols-2 lg:grid-cols-5"
          : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`${sectionClass} relative py-24 md:py-section`}>
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          >
            {eyebrow && (
              <span className={`system-label ${tickerColor}`}>{eyebrow}</span>
            )}
            <h2
              className={`mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold ${headingColor}`}
            >
              {preTitle}
              {italicTitle && (
                <>
                  {" "}
                  <span
                    className={`font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]`}
                  >
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
              className={`text-body ${bodyColor} max-w-copy lg:pb-3`}
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className={`grid ${colsClass} gap-px border-t ${dividerColor} bg-current/[0.08]`}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.04 }}
              className={`p-7 md:p-9 ${variant === "dark" ? "bg-birdseye-surface" : "bg-birdseye-cream"} border-b ${dividerColor}`}
            >
              <div className={`font-mono text-[12px] tracking-[0.08em] ${tickerColor} mb-5`}>
                0{i + 1}
              </div>
              <h3
                className={`text-[clamp(1.375rem,2vw,1.625rem)] leading-[1.2] tracking-[-0.012em] font-bold ${headingColor}`}
              >
                {f.title}
              </h3>
              <p className={`mt-3.5 text-[14.5px] leading-[1.6] ${bodyColor}`}>
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
