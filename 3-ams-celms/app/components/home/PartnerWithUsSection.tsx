// File: app/components/home/PartnerWithUsSection.tsx
// Purpose: Present a call-to-action encouraging partners to engage with AMS-CELMS, linking to contact page.

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PartnerWithUsSection() {
  return (
    <section className="w-full bg-[var(--color-background)] py-20 flex justify-center relative">
      {/* Centered container */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center px-6 md:px-12 gap-6">
        {/* Animated heading */}
        <motion.h2
          className="text-4xl font-bold text-[var(--color-primary)]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Partner With Us
        </motion.h2>

        {/* Animated subtitle */}
        <motion.p
          className="text-lg md:text-xl text-[var(--color-secondary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover how collaboration can drive aviation excellence in West
          Africa.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="./contact"
            className="inline-block mt-4 px-8 py-3 bg-[var(--color-primary)] text-[var(--color-background)] font-semibold rounded-lg shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors"
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
- Centered layout emphasizes the CTA, making it clear and approachable.
- Motion animations draw attention subtly without overwhelming the user.
- Button uses brand colors for consistency and hover effect for interactivity.

Structure:
- Section wraps centered max-width container.
- Heading, subtitle, and CTA button vertically stacked with spacing.
- Motion applied to heading, subtitle, and button for progressive entrance.

Implementation guidance:
- Link leads to ./contact route; adjust href if the contact page path changes.
- Container max-width (max-w-4xl) ensures content is focused and readable.
- Button styles follow brand colors; hover effect provides feedback.

Scalability insight:
- Can add optional background visuals (video/image) behind container for enhanced aesthetics.
- Multiple CTA sections can be reused with different titles or links.
- Motion variants can be centralized for consistent animation patterns across the site.
*/
