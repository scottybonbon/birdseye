"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { explore } from "@/_design/content";
import { DUR, EASE_OUT } from "@/_design/motion";


const icons = ["✦", "◯", "→"];

export function Explore() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.smooth, ease: EASE_OUT }}
          className="text-center text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.025em] font-bold text-birdseye-cream"
        >
          Explore{" "}
          <span className="font-serif italic font-normal text-birdseye-electric tracking-[-0.015em]">
            Birdseye
          </span>
        </motion.h2>

        <div className="mt-14 grid md:grid-cols-3 gap-px rounded-card overflow-hidden bg-birdseye-border">
          {explore.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DUR.smooth, ease: EASE_OUT, delay: i * 0.07 }}
              className="bg-birdseye-navy p-8 md:p-10 group hover:bg-birdseye-surface transition-colors"
            >
              <div className="system-label text-birdseye-electric mb-5">
                0{i + 1} · {card.title.toUpperCase()}
              </div>
              <h3 className="text-h3 text-birdseye-cream font-bold">
                {card.title}
              </h3>
              <p className="mt-4 text-body text-birdseye-cream/55">
                {card.body}
              </p>
              <Link
                href={card.cta.href}
                className="mt-6 inline-flex items-center gap-1.5 text-body text-birdseye-cream font-semibold underline-offset-4 underline decoration-birdseye-electric hover:decoration-birdseye-electric/80 transition-colors"
              >
                {card.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
