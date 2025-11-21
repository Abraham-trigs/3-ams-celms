"use client";

import React from "react";
import { motion, Variants, Transition, Easing } from "framer-motion";

interface AnimatedTextOverlayProps {
  headline: string;
  subtext: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function AnimatedTextOverlay({
  headline,
  subtext,
  ctaText,
  onCtaClick,
}: AnimatedTextOverlayProps) {
  // Parent container variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.6, // wait for video to appear first
        staggerChildren: 0.25, // spacing between headline → subtext → button
      },
    },
  };

  // Define easing properly
  const ease: Easing = "easeOut";

  // Children animate individually
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease }, // use properly typed easing
    },
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-white"
        variants={itemVariants}
      >
        {headline}
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-white max-w-3xl"
        variants={itemVariants}
      >
        {subtext}
      </motion.p>

      {ctaText && (
        <motion.button
          className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]"
          variants={itemVariants}
          onClick={onCtaClick}
        >
          {ctaText}
        </motion.button>
      )}
    </motion.div>
  );
}
