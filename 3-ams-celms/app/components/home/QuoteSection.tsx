"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="w-full bg-[var(--color-primary)] py-20 flex justify-center">
      {/* Centered container */}
      <motion.div
        className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.3 }, // staggered effect
          },
        }}
      >
        {/* Quote text */}
        <motion.div
          className="md:w-1/2 flex flex-col justify-center"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          <p className=" md:text-2xl  italic text-[var(--color-background)] mb-4">
            “In flying, I have learned that carelessness and overconfidence are
            usually far more dangerous than deliberately accepted risks.”
          </p>
          <p className="text-lg md:text-xl font-medium text-[var(--color-background)]">
            — Wilbur Wright, Aviation Pioneer & Pilot
          </p>
        </motion.div>

        {/* Quote image */}
        <motion.div
          className="md:w-1/2 relative w-full h-64 md:h-96"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/quote.webp"
            alt="Aviation quote visual"
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/*
Design reasoning:
- Background set to `--color-primary` to make the quote section stand out.
- Text color changed to `--color-background` for high contrast and readability.
- Staggered animation keeps entrance dynamic and professional.

Structure:
- Full-width section with vertical padding.
- Inner motion.div handles staggered animation.
- Flex layout keeps text and image responsive and aligned.

Implementation guidance:
- Adjust `staggerChildren` or `duration` for faster/slower effect.
- Text remains readable on different screen sizes.

Scalability insight:
- Staggered animation and container pattern reusable for other sections.
- Background color can be easily changed via CSS variable.
*/
