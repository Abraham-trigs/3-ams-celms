// File: app/components/about/AboutPage.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useVideoStore } from "@/app/store/videoStore";

export default function AboutPage() {
  const videos = useVideoStore((state) => state.videos);
  const aboutVideoIndex = videos.findIndex((v) => v.src === "/video2.mp4");
  const aboutVideo = aboutVideoIndex !== -1 ? videos[aboutVideoIndex] : null;

  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  // Autoplay and crossfade the about video
  useEffect(() => {
    if (!aboutVideo) return;

    const topRef = videoRefs[activeLayer ? 1 : 0].current;
    const bottomRef = videoRefs[activeLayer ? 0 : 1].current;

    if (topRef && bottomRef) {
      bottomRef.src = aboutVideo.src;
      bottomRef.currentTime = 0;
      bottomRef.play().catch(() => {});

      bottomRef.style.opacity = "1";
      topRef.style.opacity = "0";
    }
  }, [aboutVideo, activeLayer]);

  // Loop video indefinitely with smooth transition
  useEffect(() => {
    if (!aboutVideo) return;

    const timer = setInterval(() => {
      setActiveLayer(activeLayer ? 0 : 1);
    }, 7000);

    return () => clearInterval(timer);
  }, [activeLayer, aboutVideo]);

  if (!aboutVideo) return null;

  return (
    <main className="w-full bg-[var(--color-background)] text-[var(--color-primary)]">
      {/* Hero Video Section */}
      <section className="relative w-full h-96 sm:h-[32rem] lg:h-[36rem] overflow-hidden">
        <video
          ref={videoRefs[0]}
          src={aboutVideo.src}
          autoPlay
          muted
          loop={false}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 opacity-1"
        />
        <video
          ref={videoRefs[1]}
          src={aboutVideo.src}
          autoPlay
          muted
          loop={false}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {aboutVideo.headline}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {aboutVideo.subtext}
          </motion.p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative bg-[var(--color-background)] py-16 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full rotate-45 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
          </div>

          <motion.p
            className="text-[var(--color-primary)] text-lg sm:text-xl transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            To be the leading MRO provider in West Africa, delivering reliable,
            high-quality aircraft maintenance solutions that reduce downtime and
            operational costs, while ensuring safety, compliance, and technical
            excellence for all aviation operators in the region.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-48 sm:h-48 opacity-10">
          <Image
            src="/images/aircraft-outline.svg"
            alt="Aircraft Illustration"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-8 items-center">
        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-2">About 3AMS-CELMS</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
          </div>

          <p className="text-[var(--color-text-secondary)]">
            Welcome to the world of aeronautics. 3AMS-CELMS Limited, operating
            as AeroTech, is a premier aircraft maintenance, repair, and overhaul
            (MRO) company based at Kotoka International Airport in Accra, Ghana.
            With certification from the Ghana Civil Aviation Authority (GCAA) in
            progress, our company brings together highly qualified aircraft
            technicians and engineers, trained on a wide range of aircraft types
            including narrow-body commercial jets, military aircraft, and light
            aviation planes.
          </p>
          <p className="text-[var(--color-text-secondary)]">
            We provide comprehensive ground handling and maintenance services,
            including line checks, component and engine support, logistics
            management, and engineering consultancy, all conducted according to
            international aviation standards and airline-specific procedures.
          </p>
          <p className="text-[var(--color-text-secondary)]">
            With decades of combined experience, our ambition is to be a trusted
            MRO provider across West Africa, offering operators reliable,
            high-quality maintenance solutions that reduce operational downtime
            and costs while ensuring safety, compliance, and technical
            excellence.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 relative w-full h-64 sm:h-80 lg:h-96"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/aircraft-outline.jpg"
            alt="3AMS-CELMS Hangar"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Vision & Core Values */}
      <section className="bg-[var(--color-background)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Vision</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--color-text-secondary)] text-lg sm:text-xl">
              To establish Ghana as the leading aviation maintenance hub in West
              Africa by delivering trusted MRO solutions, developing local
              expertise, and advancing a culture of safety, innovation, and
              operational excellence across the region.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">Our Core Values</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--color-text-secondary)] text-lg sm:text-xl">
              To provide world-class maintenance, repair, and overhaul (MRO)
              services in West Africa, ensuring safety, reliability, and
              technical excellence while empowering local talent, reducing
              operational downtime for our clients, and advancing Ghana as a
              regional aviation hub.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-[var(--color-surface)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-2">Our Core Services</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Line Maintenance",
                description:
                  "Routine daily checks, transit inspections, and A-checks to ensure aircraft readiness and compliance.",
              },
              {
                title: "Component & Engine Support",
                description:
                  "Troubleshooting, removal, installation, and liaison with OEM-approved repair stations.",
              },
              {
                title: "Logistics & Spares Management",
                description:
                  "Management of parts, logistics, and inventory for MRO operations.",
              },
              {
                title: "Engineering Consultancy",
                description:
                  "Reliability programs, technical records management, and continued airworthiness support.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering & Facility */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-8">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex flex-col items-start">
            <h2 className="text-3xl font-bold mb-2">Engineering & Facility</h2>
            <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
          </div>

          <p className="text-[var(--color-text-secondary)] mb-2">
            Our facility is designed to accommodate multiple narrow-body
            aircraft simultaneously and is equipped with advanced NDT and
            calibration labs, along with an IT-based Maintenance Management
            System to ensure efficiency, compliance, and high-quality service
            delivery.
          </p>
          <p className="text-[var(--color-text-secondary)]">
            Our highly trained team ensures technical excellence, adhering to
            global standards while empowering local talent through training and
            capacity-building initiatives.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 relative w-full h-64 sm:h-80 lg:h-96"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/Engineering.webp"
            alt="Hangar & Labs"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Safety, Compliance & Local Impact */}
      <section className="bg-[var(--color-surface)] py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2">
            Safety, Compliance & Local Impact
          </h2>
          <div className="h-[2px] w-24 sm:w-32 bg-[var(--color-primary)]"></div>
        </div>
        <motion.div
          className="space-y-4 text-[var(--color-text-secondary)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p>
            Our commitment to exceeding industry standards ensures safety and
            compliance across all operations. Rigorous quality assurance
            protocols and environmental stewardship safeguard both our clients
            and the community.
          </p>
          <p>
            Engagement in local talent development fosters the next generation
            through training partnerships, STEM initiatives, and sustainable
            practices, contributing to national development and job creation.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
