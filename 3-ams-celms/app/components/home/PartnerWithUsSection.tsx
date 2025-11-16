"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PartnerWithUsSection() {
  return (
    <section className="w-full bg-[var(--color-background)] py-20 flex justify-center">
      {/* Centered container */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-12">
        {/* Left: Heading */}
        <motion.div
          className="md:w-1/2 flex flex-col items-end"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[var(--color-primary)]">
            Partner With Us
          </h2>
        </motion.div>

        {/* Right: Subtitle + Button */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start gap-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-[var(--color-secondary)]">
            Discover how collaboration can drive aviation excellence in West
            Africa.
          </p>
          <Link
            href="./contact"
            className="inline-block mt-2 px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] font-semibold rounded-lg shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/*
Design reasoning:
- Reduced horizontal gap between left heading and right content to create a tighter, balanced layout.
- Two-column layout maintains readability while making the CTA feel connected to the heading.
- Motion transitions still apply for subtle entrance emphasis.

Structure:
- Outer section: full-width background with vertical padding.
- Inner container: flex row on md+, stacked on mobile, smaller gap between columns.
- Left: heading.
- Right: subtitle + button.

Implementation guidance:
- Adjust `gap-6` for overall spacing between columns.
- Motion variants remain consistent for entrance animations.
- Button href can be updated as needed.

Scalability insight:
- Layout easily supports additional content or iconography alongside subtitle without losing balance.
- Gap adjustments provide flexibility for different screen sizes and content lengths.
*/
