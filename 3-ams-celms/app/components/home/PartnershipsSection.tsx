// File: app/components/home/PartnershipsSection.tsx
// Purpose: Auto-scrolling partnerships carousel, responsive for desktop and mobile using Zustand for infinite loop logic.

"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePartnershipsStore } from "@/app/store/partnershipsStore";

// Partner type
interface Partner {
  name: string;
  logoSrc: string;
  quote?: string;
}

// Partners content
const partners: Partner[] = [
  {
    name: "GCAA",
    logoSrc: "/logos/gcaa.png",
    quote: "Ensuring top-tier aviation standards.",
  },
  {
    name: "Africa World Airlines",
    logoSrc: "/logos/awa.png",
    quote: "Collaboration with 3AMS-CELMS is invaluable.",
  },
  {
    name: "Ghana Air Force",
    logoSrc: "/logos/ghana-air-force.png",
    quote: "They provide unmatched reliability in MRO services.",
  },
  {
    name: "GACL",
    logoSrc: "/logos/gacl.png",
    quote: "Their expertise enhances operational capabilities.",
  },
  {
    name: "PassionAir",
    logoSrc: "/logos/passionair.png",
    quote: "3AMS-CELMS is a key ally in our operations.",
  },
  {
    name: "OEMs",
    logoSrc: "/logos/oems.png",
    quote: "Working together leads to innovation and growth.",
  },
];

export default function PartnershipsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollX, setMaxScroll, startAutoScroll, pause, resume } =
    usePartnershipsStore();

  // Duplicate partners array to enable infinite scrolling
  const loopedPartners = [...partners, ...partners];

  // Initialize maxScroll and start auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      const maxScroll = containerRef.current.scrollWidth / 2; // half because array is duplicated
      setMaxScroll(maxScroll);
    }
    startAutoScroll();
  }, [setMaxScroll, startAutoScroll]);

  // Sync scrollLeft with store
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  return (
    <section className="w-full bg-[var(--color-background)] py-16 relative text-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Heading with underline */}
        <div className="mb-12 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Our Partnerships
          </h2>
          <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
        </div>

        {/* Scrollable partners container */}
        <div
          ref={containerRef}
          className="flex gap-6 sm:gap-8 overflow-hidden py-4"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {loopedPartners.map((partner, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center text-center w-28 sm:w-40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (idx % partners.length) * 0.1,
              }}
            >
              <div className="w-24 h-16 sm:w-32 sm:h-20 relative mb-2 sm:mb-3">
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              {partner.quote && (
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  {partner.quote}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
Design reasoning:
- Infinite scrolling handled entirely in the store; component simply renders duplicated partners array.
- Duplicated array ensures smooth seamless looping without jump or pause.
- Auto-scroll pauses on hover for desktop UX, mobile scroll continues.

Structure:
- Heading with underline
- Scrollable flex container bound to store.scrollX
- Loop-mapped partner items (logos + quotes) with responsive sizes

Implementation guidance:
- Ensure containerRef.current.scrollWidth / 2 is passed as maxScroll to store
- Hover events call pause/resume
- For new partners, add to original partners array only

Scalability insight:
- Easy to add new partner logos dynamically from API
- Multiple carousels can be managed by namespacing store or adding separate slices
- Supports adjustable scroll speed, direction, and pause/resume globally
*/
