"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlane, FaTools, FaCog } from "react-icons/fa";

// WHO ARE WE? content
const whoAreWeText = `
Since its establishment under Ghanaian law, AMS-CELMS (operating as AeroTech) has grown into a dedicated aircraft maintenance and engineering company based at Kotoka International Airport in Accra. With leadership bringing decades of aviation experience, the company is progressing through the final stages of GCAA certification to operate as a full-scale MRO facility.

Our expertise spans core aviation engineering disciplines, enabling operators across West Africa to access reliable, local high-standard maintenance services.

We support commercial airlines, private operators, and military aviation entities—delivering both long-term maintenance plans and rapid response support. All operations follow strict safety and quality standards aligned with international aviation regulations.
`;

const mainOperationalAreas = [
  "Technical Support – On-ground diagnostics, troubleshooting, and aircraft readiness support.",
  "Line Maintenance – Daily checks, transit inspections, and A-checks.",
  "Engineering & Technical Monitoring – Reliability programs, technical records, and airworthiness support.",
  "Scheduled Maintenance – Component servicing, system checks, and preventive maintenance programs.",
  "Aeronautical Expertise – Specialized advisory, engineering oversight, and compliance-focused guidance.",
];

const ourAreas = [
  {
    title: "Technical Support",
    description:
      "Our team provides specialized technical assistance including diagnostics, troubleshooting, ramp support, and operational readiness. Services cover both civil and military aviation platforms.",
    icon: "/images/technical-support.png",
  },
  {
    title: "Component & Engine Support",
    description:
      "We manage removal, installation, functional testing, and technical liaison with OEM-approved repair stations — ensuring components and engines meet strict airworthiness standards.",
    icon: "/images/component-engine.png",
  },
  {
    title: "Painting & Surface Restoration",
    description:
      "Our workshop supports striping, corrosion treatment, panel repair, and surface refinishing. We maintain aircraft exterior integrity while ensuring compliance with aviation coating specifications.",
    icon: "/images/painting-restoration.png",
  },
  {
    title: "Aeroplane Maintenance",
    description:
      "We deliver structured maintenance programs, spare parts coordination, system inspections, and reliability tracking — all supported by an IT-based Maintenance Management System.",
    icon: "/images/aeroplane-maintenance.png",
  },
  {
    title: "Aircraft Maintenance (MRO)",
    description:
      "With expanding facilities at KIA, we provide end-to-end maintenance, repair, and overhaul services for narrow-body, special-mission, and private aircraft, ensuring safety, efficiency, and minimized downtime.",
    icon: "/images/mro.png",
  },
];

export default function WhoWeAreSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* WHO ARE WE */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col py-16 px-6 gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading + underline */}
        <div className="mb-8">
          <h2
            className="text-4xl font-bold mb-2 text-left"
            style={{ color: "var(--color-primary)" }}
          >
            Who Are We?
          </h2>
          <div className="h-[2px] w-full bg-[var(--color-primary)]"></div>
        </div>

        {/* Content: Image + Paragraph + Bullets */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/images/who-we-are.jpg"
              alt="Who We Are"
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover w-full max-w-sm"
            />
          </div>

          {/* Paragraph + bullets */}
          <div className="md:w-1/2 flex flex-col">
            <p className="text-gray-700 mb-6">{whoAreWeText}</p>

            <ul className="space-y-3">
              {mainOperationalAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-[var(--color-primary)]">
                    {index % 3 === 0 ? (
                      <FaPlane />
                    ) : index % 3 === 1 ? (
                      <FaTools />
                    ) : (
                      <FaCog />
                    )}
                  </span>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* OUR AREAS */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="mb-10">
          <h2
            className="text-4xl font-bold text-left mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Our Areas
          </h2>
          <div className="h-[2px] w-full bg-[var(--color-primary)]"></div>
        </div>

        {/* Flex container for cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          {ourAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="
        bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center
        hover:shadow-2xl transition-shadow
        flex-[1_1_calc(50%-1rem)] min-w-[220px] 
        lg:flex-[1_1_calc(20%-1rem)]
      "
            >
              <Image
                src={area.icon}
                alt={area.title}
                width={80}
                height={80}
                className="mb-4"
              />
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-secondary)" }}
              >
                {area.title}
              </h3>
              <p className="text-gray-600">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
