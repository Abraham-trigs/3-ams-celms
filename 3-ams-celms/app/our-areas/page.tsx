// File: app/components/our-area/OurAreaPage.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Technical Support",
    description:
      "Our team delivers specialized technical assistance, including diagnostics, troubleshooting, ramp operations, and operational readiness. Services cater to both civil and military aviation platforms, ensuring every aircraft is mission-ready and compliant with industry standards.",
    imageSrc: "/technical-support.jpg",
  },
  {
    title: "Component & Engine Support",
    description:
      "We manage component and engine removal, installation, functional testing, and technical liaison with OEM-approved repair stations. All work adheres to strict airworthiness requirements, guaranteeing reliable performance and safety.",
    imageSrc: "/engine-repair.jpg",
  },
  {
    title: "Surface Restoration",
    description:
      "Our workshop handles aircraft striping, corrosion treatment, panel repair, and surface refinishing. We maintain exterior integrity while meeting aviation coating specifications and ensuring a professional finish.",
    imageSrc: "/painting-restoration.webp",
  },
  {
    title: "Aeroplane Maintenance",
    description:
      "We provide structured maintenance programs, spare parts coordination, system inspections, and reliability tracking, supported by an IT-based Maintenance Management System. This ensures aircraft readiness, operational efficiency, and compliance.",
    imageSrc: "/maintence.jpg",
  },
  {
    title: "Aircraft Maintenance (MRO)",
    description:
      "With our expanding facilities at Kotoka International Airport, we offer end-to-end maintenance, repair, and overhaul (MRO) services for narrow-body, special-mission, and private aircraft. Our focus is on safety, operational efficiency, and minimizing downtime.",
    imageSrc: "/maintence.webp",
  },
];

export default function OurAreaPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedService = services[selectedIndex];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSwipe = (offset: number) => {
    if (offset > 50 && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (offset < -50 && selectedIndex < services.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <main className="w-full bg-[var(--color-background)] text-[var(--color-primary)] py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
          Technical Support
        </h1>
        <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)] mx-auto"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Desktop menu */}
        <nav className="hidden lg:block lg:w-1/4 bg-[var(--color-surface)] rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            {services.map((service, idx) => (
              <li
                key={service.title}
                onClick={() => setSelectedIndex(idx)}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                  selectedIndex === idx
                    ? "bg-[var(--color-primary)] text-white font-semibold"
                    : "hover:bg-[var(--color-primary)]/10"
                }`}
              >
                {service.title}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile dropdown */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-[var(--color-surface)] p-3 rounded-md flex justify-between items-center shadow-md"
          >
            <span className="font-semibold">{selectedService.title}</span>
            <span>{mobileMenuOpen ? "▲" : "▼"}</span>
          </button>
          {mobileMenuOpen && (
            <ul className="mt-2 bg-[var(--color-surface)] rounded-md shadow-md overflow-hidden">
              {services.map((service, idx) => (
                <li
                  key={service.title}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 border-b last:border-b-0 transition-colors ${
                    selectedIndex === idx
                      ? "bg-[var(--color-primary)] text-white font-semibold"
                      : "hover:bg-[var(--color-primary)]/10"
                  }`}
                >
                  {service.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right panel */}
        <section className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => handleSwipe(info.offset.x)}
            >
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <Image
                  src={selectedService.imageSrc}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedService.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
                  {selectedService.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile swipe indicators */}
          <div className="flex justify-center mt-4 lg:hidden space-x-2">
            {services.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === selectedIndex
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-primary)]/30"
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
