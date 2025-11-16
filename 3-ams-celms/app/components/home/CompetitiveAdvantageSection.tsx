// File: app/components/home/CompetitiveAdvantageSection.tsx
// Purpose: Present AMS-CELMS's competitive advantages with a background video, emphasizing the main statement on colored background.

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCogs,
  FaCertificate,
  FaHandsHelping,
  FaBolt,
} from "react-icons/fa";

// Advantage type
interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Advantages content
const advantages: Advantage[] = [
  {
    title: "Strategic Location",
    description:
      "Based at Kotoka International Airport, our facility provides fast regional access, minimizing aircraft downtime.",
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "Technical Expertise",
    description:
      "Engineers are type-rated across multiple aircraft models, skilled in civil and military maintenance.",
    icon: <FaCogs />,
  },
  {
    title: "Certification & Compliance",
    description:
      "Progressing through the final stages of GCAA approval, ensuring full regulatory compliance.",
    icon: <FaCertificate />,
  },
  {
    title: "End-to-End Solutions",
    description:
      "From line maintenance to heavy checks, AMS-CELMS provides comprehensive MRO services.",
    icon: <FaBolt />,
  },
  {
    title: "Local Empowerment",
    description:
      "We combine international standards with local capacity building, training, and employment generation.",
    icon: <FaHandsHelping />,
  },
];

export default function CompetitiveAdvantageSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ color: "var(--color-primary)" }}
    >
      {/* Background video with direct opacity */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/why-choose-us.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="relative z-20 max-w-6xl mx-auto py-16 px-6 flex flex-col md:flex-row gap-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Top line separator */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-[var(--color-primary)]"></div>

        {/* Left column: heading + intro */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Why Choose Us
          </h2>
          <div className="h-[2px] w-24 bg-[var(--color-primary)] mb-6"></div>

          {/* Main statement on colored background */}
          <div
            className="p-4 mb-6 rounded"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-background)",
            }}
          >
            AMS-CELMS combines technical expertise, regulatory compliance, and
            local empowerment to provide unmatched MRO services in West Africa.
          </div>
        </div>

        {/* Right column: advantages list */}
        <div className="md:w-1/2 flex flex-col justify-start space-y-6">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex items-start gap-4 hover:text-[var(--color-primary-hover)] transition-colors"
            >
              <div className="text-3xl mt-1 text-[var(--color-primary)]">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                  {adv.title}
                </h3>
                <p className="text-[var(--color-primary)]">{adv.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* 
Design reasoning:
- The main statement on a solid primary-colored background emphasizes the key message.
- Other advantages remain in brand primary color to maintain consistency and readability over video.
- Two-column layout preserves professional, aviation-oriented UX.

Structure:
- Left: heading + colored main statement.
- Right: mapped advantages list.
- Top line separator retained for section definition.
- Background video remains behind all content.

Implementation guidance:
- Adjust padding/margin for main statement as needed.
- Colors use global CSS variables for consistent theming.
- Video remains full-width; text readability handled via background block.

Scalability insight:
- Background color blocks can be reused for future highlighted statements in other sections.
- Right column can accommodate more advantages or small icons without layout changes.
*/
