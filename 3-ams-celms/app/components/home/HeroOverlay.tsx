"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroOverlayProps {
  headline: string;
  subtext: string;
  ctaText?: string;
}

export default function HeroOverlay({
  headline,
  subtext,
  ctaText,
}: HeroOverlayProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-white"
      >
        {headline}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 text-lg md:text-xl text-white max-w-3xl"
      >
        {subtext}
      </motion.p>

      {ctaText && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]"
        >
          {ctaText}
        </motion.button>
      )}
    </div>
  );
}
