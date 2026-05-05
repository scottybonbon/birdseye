"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { images } from "@/_design/images";
import { DUR, EASE_OUT } from "@/_design/motion";

/**
 * Career Culture, left col (copy + CTA), right col (team photo).
 * Stacks on mobile.
 */
export function CareerCulture() {
  return (
    <section className="section-dark relative py-24 md:py-section">
      <Container className="max-w-site">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left column: copy block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="max-w-[460px]"
          >
            <span className="system-label text-birdseye-electric">OUR CULTURE</span>
            
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.025em] font-bold text-birdseye-cream">
              Work hard.
              <br />
              Build together.
              <br />
              <span className="font-serif italic font-normal text-birdseye-electric">Grow</span> fast.
            </h2>

            <p className="mt-6 text-body text-birdseye-cream/55 max-w-copy">
              We're a supportive, inclusive team that values great work and the people behind it.
              Here, you'll collaborate with smart teammates, contribute to meaningful products,
              and grow your career in an environment that respects balance and celebrates progress.
            </p>

            <Link
              href="#open-roles"
              className="inline-block mt-8 text-body font-medium text-birdseye-cream hover:text-birdseye-electric transition-colors"
            >
              View open roles →
            </Link>
          </motion.div>

          {/* Right column: team photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.smooth, ease: EASE_OUT }}
            className="relative w-full h-full min-h-[300px] lg:min-h-[400px] rounded-card overflow-hidden"
          >
            <Image
              src={images.about.teamGroup}
              alt="Birdseye team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
