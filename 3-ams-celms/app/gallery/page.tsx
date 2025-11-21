// File: app/gallery/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Clifford Martey Korley",
    role: "Managing Director / Accountable Manager",
    description: "Overall strategic oversight and leadership.",
    imageSrc: "/Clifford.webp",
  },
  {
    name: "Jane Smith",
    role: "Engineering Manager",
    description: "Technical supervision and maintenance planning.",
    imageSrc: "/images/team-2.jpg",
  },
  {
    name: "Mark Johnson",
    role: "Safety Manager",
    description: "Ensures compliance with aviation safety standards.",
    imageSrc: "/images/team-3.jpg",
  },
  {
    name: "Lisa Brown",
    role: "Quality Assurance Manager",
    description: "Audits, documentation, and regulatory conformity.",
    imageSrc: "/images/team-4.jpg",
  },
];

export default function GalleryPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* OUR STRUCTURE */}
        <section className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold"
          >
            OUR STRUCTURE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center"
          >
            <Image
              src="/structure.webp"
              alt="Company Structure"
              width={900}
              height={600}
              className="rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </section>

        {/* OUR TEAM */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-[var(--color-primary)]"
          >
            OUR TEAM
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[var(--color-primary)]"
          >
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/5 rounded-lg shadow flex flex-col items-center text-center"
              >
                <div className="w-32 h-32 relative mb-3 rounded-full overflow-hidden">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold text-lg">{member.role}</p>
                <p className="text-sm mt-1">{member.description}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SOME WORKS REALIZED */}
        <section className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-[var(--color-primary)]"
          >
            SOME WORKS REALIZED
          </motion.h2>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {[1, 2, 3, 4].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="min-w-[280px] snap-center"
              >
                <Image
                  src={`/work-${num}.webp`}
                  alt={`Realized work ${num}`}
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
