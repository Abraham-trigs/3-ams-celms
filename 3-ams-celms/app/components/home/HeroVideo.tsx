// File: app/components/home/HeroVideo.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function HeroVideo() {
  const { videos, currentIndex, nextIndex, advanceVideo, setCurrentIndex } =
    useVideoStore();
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0); // which video layer is visible
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  if (!videos.length) return null;

  // Random start
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentIndex(randomIndex);
  }, [videos.length, setCurrentIndex]);

  // Initialize video layers
  useEffect(() => {
    videoRefs.forEach((ref, idx) => {
      if (!ref.current) return;
      ref.current.muted = true;
      ref.current.autoplay = true;
      ref.current.playsInline = true;
      ref.current.preload = "auto";
      ref.current.style.opacity = idx === activeLayer ? "1" : "0";
      ref.current.play().catch(() => {});
    });
  }, [activeLayer]);

  // Crossfade & seamless loop
  useEffect(() => {
    const crossfadeDuration = 0.7; // seconds
    let rafId: number;

    const tick = () => {
      const topRef = videoRefs[activeLayer ? 1 : 0].current;
      const hiddenRef = videoRefs[activeLayer ? 0 : 1].current;
      if (!topRef || !hiddenRef || !topRef.duration) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const timeLeft = topRef.duration - topRef.currentTime;

      // Start crossfade slightly before video ends
      if (timeLeft <= crossfadeDuration) {
        topRef.style.opacity = `${timeLeft / crossfadeDuration}`;
        hiddenRef.style.opacity = `${1 - timeLeft / crossfadeDuration}`;
      }

      // When current video ends, swap layers
      if (topRef.currentTime >= topRef.duration) {
        setActiveLayer(activeLayer ? 0 : 1); // swap layer
        advanceVideo(); // store updates currentIndex & nextIndex

        // Prepare hidden layer with next video
        hiddenRef.src = videos[nextIndex].src;
        hiddenRef.currentTime = 0;
        hiddenRef.play().catch(() => {});
      }

      rafId = requestAnimationFrame(tick);
    };

    // Prepare initial sources
    videoRefs[activeLayer ? 1 : 0].current!.src = videos[currentIndex].src;
    videoRefs[activeLayer ? 0 : 1].current!.src = videos[nextIndex].src;

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeLayer, currentIndex, nextIndex, advanceVideo, videos]);

  const topIndex = activeLayer ? 1 : 0;
  const bottomIndex = activeLayer ? 0 : 1;

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Bottom Layer */}
      <video
        ref={videoRefs[bottomIndex]}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 opacity-0"
      />
      {/* Top Layer */}
      <video
        ref={videoRefs[topIndex]}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 opacity-100"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          {videos[currentIndex].headline}
        </h1>
        {videos[currentIndex].subtext && (
          <p className="mt-4 text-lg md:text-xl text-white max-w-3xl">
            {videos[currentIndex].subtext}
          </p>
        )}
        {videos[currentIndex].ctaText && (
          <button className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]">
            {videos[currentIndex].ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
