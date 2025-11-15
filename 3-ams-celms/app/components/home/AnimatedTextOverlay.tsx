// File: app/components/home/AnimatedTextOverlay.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useVideoStore } from "@/app/store/videoStore";

export default function AnimatedTextOverlay() {
  const { videos, currentIndex } = useVideoStore();
  if (!videos || videos.length === 0) return null;

  const { headline, subtext, ctaText } = videos[currentIndex];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex-col items-center justify-center text-center px-4">
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-white"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {headline}
      </motion.h1>
      <motion.p
        className="mt-4 text-lg md:text-xl text-white max-w-3xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {subtext}
      </motion.p>
      {ctaText && (
        <motion.button
          className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {ctaText}
        </motion.button>
      )}
    </div>
  );
}
