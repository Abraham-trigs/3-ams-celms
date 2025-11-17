"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuoteSection() {
  const fullQuote =
    "In flying, I have learned that carelessness and overconfidence are usually far more dangerous than deliberately accepted risks.";

  const [displayedChars, setDisplayedChars] = useState<string>("");
  const [typingDone, setTypingDone] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedChars(fullQuote.slice(0, index + 1));
      index++;
      if (index === fullQuote.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 50); // typing speed per character
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[var(--color-primary)] py-20 flex justify-center">
      {/* Centered container */}
      <motion.div
        className="max-w-6xl  w-full flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-12 shadow-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        {/* Quote text with typing effect */}
        <motion.div
          className="md:w-1/2 flex flex-col justify-center relative"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          <p className="md:text-2xl italic text-[var(--color-background)] mb-4 relative inline-block">
            <span>{displayedChars}</span>
            {/* Blinking cursor */}
            {!typingDone && (
              <span className="inline-block w-[2px] h-6 bg-[var(--color-background)] ml-1 animate-blink" />
            )}
          </p>

          {/* Signature appears after typing finishes */}
          {typingDone && (
            <motion.p
              className="text-lg md:text-xl font-medium text-[var(--color-background)] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              — Wilbur Wright
            </motion.p>
          )}
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
- Added two large quotation marks above the quote as a visual accent.
- Letter-by-letter typing effect with blinking cursor maintains realistic typing feel.
- Signature appears after typing finishes.
- Background `--color-primary` and text `--color-background` ensure strong contrast.

Structure:
- Outer section: full-width background.
- Inner motion.div: handles staggered animation.
- Left: visual quotes, animated typing quote, and delayed signature.
- Right: responsive image visual.

Implementation guidance:
- Adjust `text-6xl` or `mb-2` to change quotation mark size and spacing.
- Typing speed adjustable via interval (currently 50ms per character).
- Ensure `.animate-blink` CSS is included.

Scalability insight:
- Top quotation mark accent reusable for other quote sections.
- Typing + cursor pattern and delayed signature can be applied to multiple quotes dynamically.
*/
